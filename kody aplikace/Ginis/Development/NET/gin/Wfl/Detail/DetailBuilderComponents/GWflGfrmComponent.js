(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflGfrm: {
            create: function (content, componentDto) {
                var result = {
                    onInit: [function (builder) {
                        var that = this;
                        var moveFunkce = function (arr, old_index, new_index) {
                            if (new_index >= arr.length) {
                                var k = new_index - arr.length + 1;
                                while (k--) {
                                    arr.push(undefined);
                                }
                            }
                            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
                            return arr; // for testing
                        };
                        if (builder.tabDefinitions != null && builder.tabDefinitions.length > 0) {
                            var tempStrAr = [];
                            for (var i = 0; i < builder.tabDefinitions.length; i++) {
                                if (builder.tabDefinitions[i].id && builder.tabDefinitions[i].id.indexOf("WflGfrmDalsi") > -1) {
                                    tempStrAr.push(builder.tabDefinitions[i].id);
                                }
                            }

                            for (var y = 0; y < tempStrAr.length; y++) {
                                var tgGfrmKybezObj = builder.getDefinition(tempStrAr[y], GDbd.DefinitionKind.Tab);
                                if (tgGfrmKybezObj && tgGfrmKybezObj.length > 0 && tgGfrmKybezObj[0].index >= 0) {
                                    var kybezObj = tgGfrmKybezObj[0];
                                    moveFunkce(kybezObj.array, kybezObj.index, kybezObj.array.length - 1);
                                }
                            }
                        }

                        this.element.off(".gfrm").on("gtabmanageropen.gfrm",
                            function (ev, ctx) {
                                if (ctx && ctx.id && ctx.id.includes("tgGfrm")) {
                                    that.zkusVyvolatRefreshVGfrm(ctx);
                                }
                            });
                    }],
                    onMenuBuild: [
                        function (builder, menus) {
                            this.enableGFRMActions();
                        },
                    ],

                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        enableGFRMActions: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }
                            this.actions.actPridavatAOdebiratFormulare.update({ visible: (l_bActionEnabled && componentDto.LzePridavatAOdebiratFormulare) });
                        },

                        zkusVyvolatRefreshVGfrm: function (ctx) {
                            var id = ctx.id;
                            var divs = this.element.find(".tab-group-{0}:not(.concealed)".format(id));
                            if (divs.length > 0) {
                                var div = divs.eq(0);
                                if (div.hasClass('gcontent')) {
                                    var $gfrmContent = div.gcontent();
                                    if ($gfrmContent.refresh) {
                                        $gfrmContent.refresh();
                                    }
                                } else {
                                    div.gtab('open');
                                }
                            }

                        },

                        zaregistrujReloadPoUlozeniNaGFRM: function (element) {
                            var that = this;
                            element.on("greportformcontrolsaved", function (ev, obj) {
                                //ev.reloadovat = false;
                                if (obj && obj.reloadovatPoUlozeni) {
                                    obj.reloadovatPoUlozeni = false;
                                }
                                that.element.trigger(Gordic.Wfl.WebClient.WflOps.eventName, {
                                    operation: Gordic.Wfl.WebClient.WflOps.WflOpsEnum.gfrmUlozeni,
                                    flashMessage: "jres:31926276",  //RC 31926276 : Proběhlo uložení formuláře.
                                    flashMessageClass: "g-state-success"
                                });
                            });
                        },

                        vytvorNoveMenuVGfrmTabu: function (gfrm) {
                            var gfrmContent = $.content(gfrm);
                            var _this = this;
                            if (gfrmContent.readyAwait) {
                                gfrmContent.readyAwait.then(function () {
                                    var acts = gfrmContent.actions;
                                    var actionPDFDoObrazu = new GAction({
                                        name: "actPdfobraz",
                                        enabled: componentDto.LzeVlozitElObraz,
                                        //icon: "gi-save",
                                        caption: "jres:31926693", //RC 31926693 : Uložit PDF do hlavní přílohy
                                        run: function () {
                                            content.beginOperation("jres:31926692"); //RC 31926692 : PDF se ukládá do hlavní přílohy
                                            gfrmContent.savepdf(true).then(
                                                function (ret) {
                                                    //ret.fileInfo
                                                    var opt = {
                                                        Ixp: componentDto.ixp,
                                                        FileInfo: ret.fileInfo
                                                    };
                                                    var srv = content.createServiceContent("Gordic.Wfl.WebClient.GWflDetailUtils");  //servisni sluzba/content
                                                    srv.call("UlozitDoObrazu", opt)
                                                        .done(function (retVal) {
                                                            if (retVal.StavBool) {
                                                                content.element.trigger(Gordic.Wfl.WebClient.WflOps.eventName, {
                                                                    operation: Gordic.Wfl.WebClient.WflOps.WflOpsEnum.gfrmUlozeni,
                                                                    flashMessage: "jres:31926691",  //RC 31926691 : Proběhlo uložení formuláře do obrazu.
                                                                    flashMessageClass: "g-state-success"
                                                                });
                                                            } 
                                                        }).always(function () {
                                                            content.endOperation();
                                                            if (ret.fileInfo != null && ret.fileInfo.guid) {
                                                                var file = new GFile();
                                                                file.removeFile(ret.fileInfo.guid);
                                                            }
                                                            srv.close();
                                                        });
                                                },
                                                function () {
                                                    content.endOperation();
                                                }
                                            );
                                        }
                                    });

                                    var actionPDFDoPrilohy = new GAction({
                                        name: "actPdfprilohy",
                                        enabled: componentDto.LzePridatElPrilohy,
                                        //icon: "gi-save",
                                        caption: "jres:31926697", //RC 31926697 : Uložit PDF jako přílohu
                                        run: function () {
                                            content.beginOperation("jres:31926698"); //RC 31926698 : PDF se ukládá jako příloha
                                            gfrmContent.savepdf(true).then(
                                                function (ret) {
                                                    //ret.fileInfo
                                                    var opt = {
                                                        Ixp: componentDto.ixp,
                                                        FileInfo: ret.fileInfo
                                                    };
                                                    var srv = content.createServiceContent("Gordic.Wfl.WebClient.GWflDetailUtils");  //servisni sluzba/content
                                                    srv.call("UlozitJakoPrilohu", opt)
                                                        .done(function (retVal) {
                                                            if (retVal.StavBool) {
                                                                content.element.trigger(Gordic.Wfl.WebClient.WflOps.eventName, {
                                                                    operation: Gordic.Wfl.WebClient.WflOps.WflOpsEnum.gfrmUlozeni,
                                                                    flashMessage: "jres:31926699",  //RC 31926699 : Proběhlo uložení formuláře do přílohy
                                                                    flashMessageClass: "g-state-success"
                                                                });
                                                            }
                                                        }).always(function () {
                                                            content.endOperation();
                                                            if (ret.fileInfo != null && ret.fileInfo.guid) {
                                                                var file = new GFile();
                                                                file.removeFile(ret.fileInfo.guid);
                                                            }
                                                            srv.close();
                                                        });
                                                },
                                                function () {
                                                    content.endOperation();
                                                }
                                            );
                                        }
                                    });

                                    acts.savePdfAct.update({ caption: "jres:31926720" }); //RC 31926720 : Stáhnout PDF
                                    acts.saveSignedPdfAct.update({ caption: "jres:31926721" }); //RC 31926721 : Stáhnout PDF s podpisem

                                    var noveMenu = [
                                        //{ action: this.actions.refreshAct, favorite: true },
                                        { action: acts.saveAct, favorite: true },
                                        { action: acts.checkAct, favorite: true },
                                        { action: acts.saveXmlAct, favorite: false },
                                        { action: actionPDFDoObrazu, favorite: true },
                                        { action: actionPDFDoPrilohy, favorite: true },
                                        { action: acts.savePdfAct, favorite: true },
                                        { action: acts.saveSignedPdfAct, favorite: true },
                                    ];
                                    if (_this.actions.actPridavatAOdebiratFormulare) {
                                        noveMenu.push({ action: _this.actions.actPridavatAOdebiratFormulare, favorite: true });
                                    }

                                    acts.saveAct.enabled(componentDto.LzeInterniFormularUlozitNovouVerzi);
                                    acts.savePdfAct.enabled(componentDto.LzeInterniFormularUlozitNovouVerzi);
                                    acts.saveSignedPdfAct.enabled(componentDto.LzeInterniFormularUlozitNovouVerzi);
                                    

                                    gfrmContent.menuBar(noveMenu);
                                });
                            }
                            else {
                                //NOTE (BM 2022-11-08): Po prechodu na readyAwait tento blok kodu smazat
                                var acts = gfrmContent.actions;
                                var noveMenu = [
                                    //{ action: this.actions.refreshAct, favorite: true },
                                    { action: acts.saveAct, favorite: true },
                                    { action: acts.checkAct, favorite: true },
                                    { action: acts.savePdfAct, favorite: true },
                                    { action: acts.saveSignedPdfAct, favorite: true },
                                    { action: acts.saveXmlAct, favorite: false }
                                ];
                                if (_this.actions.actPridavatAOdebiratFormulare) {
                                    noveMenu.push({ action: _this.actions.actPridavatAOdebiratFormulare, favorite: true });
                                }

                                acts.saveAct.enabled(componentDto.LzeInterniFormularUlozitNovouVerzi);
                                acts.savePdfAct.enabled(componentDto.LzeInterniFormularUlozitNovouVerzi);
                                acts.saveSignedPdfAct.enabled(componentDto.LzeInterniFormularUlozitNovouVerzi);

                                gfrmContent.menuBar(noveMenu);
                            }
                        },
                        pridavatAOdebiratFormulare: function () {
                            var that = this;
                            var opt = {
                                Ixp: componentDto.ixp
                            };

                            Gordic.Wfl.Dialogs.NastavFormulareKDokumentuDlg(this, opt, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                .done(function (retval) {
                                    if (retval && retval.isSaved) {
                                        that.tryReloadDetail();
                                    }
                                }
                                );

                        }
                    },
                    actions: {
                        actPridavatAOdebiratFormulare: {
                            caption: "jres:31926687",   //RC 31926687 : Přidat nebo odebrat formulář
                            icon: "gi-formular_plus",
                            run: function () {
                                $.content(this).pridavatAOdebiratFormulare();
                            }
                        }
                    },

                    menuBar: [
                        //#region Vazby

                        $.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailVazby(), { favorite: true }),
                        { action: "actPridavatAOdebiratFormulare", parent: "menuWflVazby" },

                    ],
                    tabs: {},
                };

                // hlavní
                // Form parametr pro GReportFormControl
                var formSelectorTemplate = "wfl-form:{0}|ixs-form:{1}|guid:{2}";
                var getFormSelector = function (ixp, ixsform, guid) { return formSelectorTemplate.format(ixp, ixsform, guid); };
                /* // původní řešení
                var formSelectorTemplate = "wfl-form:{0}|ixs-form:{1}";
                var getFormSelector = function (ixp, ixsform, guid) { return formSelectorTemplate.format(ixp, ixsform); };
                */
                if (componentDto.IxsFrmGform != null && componentDto.IxsFrmGform !== "") {
                    result.tabs.WflGfrm = {
                        tabParams: {
                            title: "jres:26226940",  //RC 26226940 : Formulář
                            group: Gordic.Prefabs.TabGroups.Gfrm(),
                            customLoad: function (loadParams) {
                                var cnt = $.content(this);
                                var gfrm = $(this).gcontent([Gordic.Report.WebClient.GReportFormControl, {
                                    autoLoadParams: {
                                        Form: getFormSelector(componentDto.ixp, componentDto.IxsFrmGform, componentDto.guid),
                                        server: 'Gordic.Wfl.WebClient.GWflReportFormControl'
                                    },
                                    parentContent: cnt
                                }]); //.load();
                                if (cnt && cnt.zaregistrujReloadPoUlozeniNaGFRM) {
                                    cnt.zaregistrujReloadPoUlozeniNaGFRM(gfrm);
                                    cnt.vytvorNoveMenuVGfrmTabu(gfrm);
                                } else {
                                    content.dialogs.messageBox("", "jres:31926545").on("closed", function (ev, retVal) { //RC 31926545 : Formulář se nepodařilo vykreslit
                                       
                                    });
                                }
                            }

                        },
                    };
                }
                
                // přiřazené k formuláři
                if (componentDto.SeznamVsechPrirazenychFormularukDokumentu != null && componentDto.SeznamVsechPrirazenychFormularukDokumentu.length > 0) {
                    var x = componentDto.SeznamVsechPrirazenychFormularukDokumentu;
                  
                    var tempfunction = function (index) {
                        var xItem = x[index];
                        var shortName = "jres:31926705"; //RC 31926705 : Bez názvu
                        if (xItem.nazev) { 
                            var shortName = xItem.nazev.substring(0, 10) + (xItem.nazev.length > 10 ? "…" : "");
                        }
                        //var txtTab = "{0} - {1}".format(index + 1, shortName);
                        var txtTab = "{0}: {1}".format(index + 1, shortName);
                        return {
                            tabParams: {
                                title: shortName,
                                group: $.extend(Gordic.Prefabs.TabGroups.Gfrm(index), { caption: txtTab, tooltip: xItem.nazev }),
                                indexRadku: index,
                                customLoad: function (loadParams, xxx) {
                                    var cnt = $.content(this);

                                    var gfrm = $(this).gcontent([Gordic.Report.WebClient.GReportFormControl, {
                                        autoLoadParams: {
                                            Form: getFormSelector(componentDto.ixp, xItem.ixs_frm_gform, componentDto.guid),
                                            server: 'Gordic.Wfl.WebClient.GWflReportFormControl'
                                        },
                                        parentContent: cnt
                                    }]);
                                    if (cnt && cnt.zaregistrujReloadPoUlozeniNaGFRM) {
                                        cnt.zaregistrujReloadPoUlozeniNaGFRM(gfrm);
                                        cnt.vytvorNoveMenuVGfrmTabu(gfrm);
                                    } else {
                                        content.dialogs.messageBox("", "jres:31926545").on("closed", function (ev, retVal) { //RC 31926545 : Formulář se nepodařilo vykreslit

                                        });
                                    }
                                }
                            }
                        };
                    };

                    for (var iy = 0; iy < x.length; iy++) {
                        result.tabs["WflGfrmDalsi" + iy] = tempfunction(iy);
                    }
                }
                /*
                // ODSTRANENA SPECIALNI ZALOZKA KYBEZ
                // potencionální
                if (componentDto.IxsFrmKybez != null) {
                    var kybezTitle = "jres:31926270";//RC 31926270 : KYBEZ
                    result.tabs.WflGfrmKybez = {
                        tabParams: {
                            title: kybezTitle,
                            group: $.extend(Gordic.Prefabs.TabGroups.Gfrm('Kybez'), { caption: kybezTitle }),
                            customLoad: function (loadParams) {
                                var cnt = $.content(this);

                                var gfrm = $(this).gcontent([Gordic.Report.WebClient.GReportFormControl, {
                                    autoLoadParams: {
                                        Form: getFormSelector(componentDto.ixp, componentDto.IxsFrmKybez, componentDto.guid),
                                        server: 'Gordic.Wfl.WebClient.GWflReportFormControl'
                                    },
                                    parentContent: cnt
                                }]);
                                if (cnt && cnt.zaregistrujReloadPoUlozeniNaGFRM) {
                                    cnt.zaregistrujReloadPoUlozeniNaGFRM(gfrm);
                                    cnt.vytvorNoveMenuVGfrmTabu(gfrm);
                                } else {
                                    content.dialogs.messageBox("", "jres:31926545").on("closed", function (ev, retVal) { //RC 31926545 : Formulář se nepodařilo vykreslit

                                    });
                                }
                            }
                        }
                    };
                    
                }
                */
                return result;
            }
        },
    }, { extendIntellisense: GContent, pure: true });
})(jQuery);