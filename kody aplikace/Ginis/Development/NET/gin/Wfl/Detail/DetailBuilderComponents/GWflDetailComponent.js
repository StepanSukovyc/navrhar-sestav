(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents", {
        WflDetail: {
            create: function (componentDto) {
                const dbProfile =$.content()?.prop("dbProfile");

                var result = {
                    onMenuBuild: [
                        function (builder, menus) {
                            this.enableWflDetail();
                        }
                    ],

                    onBuild: [
                        function () {
                            var that = this;
                            this.initWFlDetailAfterLoad();
                            this.initWFlDetailAfterReload();
                            
                            this.setBaseWflValue();
                            
                            if (componentDto.OznacitDokumentJakoPrectenyAfterLoad) {
                                this.oznacDokumentJakoPrecteny([componentDto.ixp]);
                            }
                            this.element.off('.wfldetailcomponent');
                            this.off(".wfldetailcomponent");

                            this.element.on("mainattachmentchange.wfldetailcomponent", function (ev, ctx) {
                                var flashParams = ctx;
                                var cnt = $.content(this);

                                if (ctx.stopRefresh === true) {
                                    that.indikaceZdaDosloKReloaduContentu = true;
                                    return; // Pokud už někdo před námi nastavil stopRefresh=true, tak nemá cenu dělat znova reload -> postaral se o něj někdo další
                                }

                                ctx.stopRefresh = true;
                                // tady je potřeba dát možnost browseru běh zpracování rozstřihnout,
                                // protože reload zruší toho kdo ten event vyvolal, tak aby to mělo šanci nějak dopadnout..
                                setTimeout(function () { cnt.reloadDetail(undefined, flashParams); }, 10);
                            });

                            //on wflCinnosti akce done -> reload
                            this.element.on('{0}.wfldetailcomponent'.format(Gordic.Wfl.WebClient.WflOps.eventName), function (ev, ctx) {
                                var flashParams = ctx;
                                var cnt = $.content(this);
                                setTimeout(function () { cnt.reloadDetail(undefined, flashParams); }, 10);
                            });

                            //při zavření detailu
                            this.on("close.wfldetailcomponent", function () {
                                that.element.off(".wfldetailcomponent");
                            });
                            //this.element.on("contentclose", );
                        },
                    ],
                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady
                        //#region společné funkce
                        //obnovení některých věci po reloadu detailu
                        ReadOnlyEko: (componentDto.ReadOnlyEko != null ? componentDto.ReadOnlyEko : false),
                        SSL: componentDto.SSL,
                        ReadOnlySSL: (componentDto.ReadOnlySSL != null ? componentDto.ReadOnlySSL : false),
                        JinaAgenda: (componentDto.JinaAgenda != null ? componentDto.JinaAgenda : false),
                        initWFlDetailAfterLoad: function () {
                            // otevření otevřeného panelu v momentě reloadu
                            
                            // zvoleního aktivního panelu
                            var prichoziIDDoDialogu;
                            if (this.IdZalozkyNeboPaneluKOtevreni) {
                                prichoziIDDoDialogu = this.IdZalozkyNeboPaneluKOtevreni;
                                this.IdZalozkyNeboPaneluKOtevreni = null;
                            }

                            //this.element.on("rememberinitialopen", function (ev, ctx) {
                            //    return false; // zakáže zapamatování si co bylo otevřeno naposled + otevření defaultních záložek&panelů
                            //});

                            this.element.on("initialopen", function (ev, ctx) {
                                ctx.tabGroup = prichoziIDDoDialogu || ""; // nastavit tabGroup k otevření
                                ctx.panel = prichoziIDDoDialogu || ""; // nastavit panel k otevření
                                // return false; // vypnout otevírání defaultní záložky&panelu
                            });
                        },
                        initWFlDetailAfterReload: function () {
                             //otevření otevřeného panelu v momentě reloadu
                            if (this.afterReloadData) {
                                this.flagEvidovat = false; // 6.11.2020 přidáno protože po podání cizíhodokumentu zustal vyset flag Evidovat a pokud uživatel znovu editoval, neuložili se změny. 
                                ;// begin tady udělat něco jen po reloadu

                                this.WithKontrolaMetadat = undefined;

                                // end tady udělat něco jen po reloadu

                                this.afterReloadData = null;
                            }
                        },
                        setBaseWflValue: function () {
                            this.datZmena = componentDto.DatZmena;
                        },
                        otevriNovyDetail: function (opt) {
                            var that = this;
                            Gordic.Ssl.Dialogs.Detail(this, opt)
                                .done(function (retPromis) {
                                    if (retPromis && retPromis.length > 0) {
                                        retPromis.createDialogPromise()
                                            .then(function (retVal) {
                                                if (retVal && retVal.naDetailuDosloKeZmene) {
                                                    if (that.EditMode === true || (that.RezimPodani != null && that.RezimPodani != 0)) {
                                                        that.showFlash(
                                                            "jres:31926440", //RC 31926440 : Nedošlo k automatockému občerstvení detailu, protože na detailu mohou být neuložené změny.
                                                            Gordic.Global.Enums.ColorStateClass.warning
                                                        );
                                                    } else {
                                                        that.tryReloadDetail();
                                                    }
                                                    
                                                }
                                            });
                                    }
                                });
                        },
                        tryReloadDetail: function (params, opt) {
                            //přtižitelná funkce pro  potřebné věci před reloadem
                            this.reloadDetail(params ? params : undefined, opt);
                        },
                        reloadDetail: function (params, opt) {
                            var that = this;
                            // pokusím se zavřít všechny okna
                            this.tryCloseAllSignificants().done(function (ret) {
                                // pokud se povede vyvolam v komponentach uložení dat pro inicializaci
                                that.beforeReloadDetail().done(function () {
                                    that.indikaceZdaDosloKReloaduContentu = true;
                                    var cont = that.load(params)
                                        .done(function () {
                                            // vše dobře dopadlo a nic nedělm
                                        })
                                        .fail(function (a, b, c) {
                                            // chyba o reloadu
                                            if (c && c.baseType === "Gordic.Wfl.Interface.GWflSecurityException") {
                                                that.zavritBezKontrolyZmen = true;
                                                that.tryClose(); // nevolá se tryClose, aby se nevyhodnocovali změny na detailu
                                            }
                                        })
                                        ;
                                    if (opt && opt.flashMessage) {
                                        cont.done(function () {
                                            that.showFlash(opt.flashMessage, opt.flashMessageClass, opt.flashID ? opt.flashID : "IDWflDetail");
                                        });
                                    }
                                });
                            });
                        },

                        beforeReloadDetail: function () {
                            // incializace komponent pžed uložením
                            var mainPromis = $.Deferred();
                            this.afterReloadData = {};
                            var arrOfPromise = [];

                            //wfl zaklad
                            if (this.predReloademWflDetail) {
                                var promisWflDetail = this.predReloademWflDetail();
                                promisWflDetail.done(function (retVal) {
                                    // asi nic
                                });
                                arrOfPromise.push(promisWflDetail);
                            }

                            this.element.trigger("wfldetailbeforereload", { promises: arrOfPromise });

                            //čekání na všchny;
                            if (arrOfPromise.length > 0) {
                                $.when.apply(null, arrOfPromise).done(function () {
                                    mainPromis.resolve();
                                }).fail(()=>mainPromis.reject());
                            } else {
                                mainPromis.resolve();
                            }
                            return mainPromis.promise();
                        },
                        predReloademWflDetail: function () {
                            var promis = $.Deferred();
                            //zapamatování otevřeného sidebaru
                            this.element.trigger('rememberinitialopen');
                            promis.resolve();
                            return promis;
                        },
                       

                        //#endregion

                        //#region Dokument
                        najdiDokument: function () {
                            var that = this;
                            this.hledatIdentDokSpi(
                                function (retVal) {
                                    that.otevriNovyDetail(
                                        {
                                            DetailDto: { ixp: retVal.ixp }
                                        });
                                }
                            );
                        },
                        hledatIdentDokSpi: function (funkceAfter,opt) {
                            var options = opt ? opt : {};
                            Gordic.Wfl.Dialogs.HledatIdentDokSpisDlg(this, options).on("closed", function (ev, retVal) {
                                if (retVal) {
                                    funkceAfter(retVal);
                                }
                            });
                        },
                        individualniPristup: function () {
                            var Ixp = componentDto.ixp;
                            var options = {
                                Ixp: Ixp,
                            };
                            Gordic.Wfl.Dialogs.GRizenyPristupDlg(this, options);
                        },
                        formaDokumentu: function () { 
                            var opt = {
                                Ixp: componentDto.ixp
                            };
                            Gordic.Wfl.WebClient.GWflDetailUtils.FormaDokumentu(this, opt);
                        },
                        oznacDokumentJakoPrecteny: function (ArrOfIxp) {
                            var that = this;
                            var l_oJSONPars = {
                                "SelectedIxp": ArrOfIxp,
                                "FlagPrecteni": true
                            };
                            var srv = that.createServiceContent({ className: 'Gordic.Wfl.WebClient.GWflDetailUtils', params: {} });
                            srv.call('OznacDokumentyJakoPrectene', l_oJSONPars)
                                .done(function (retVal) {
                                    if (retVal.StavBool) {
                                        that.naDetailuDosloKeZmene = true;
                                        // mozna relaodseznamu pod tím
                                    }
                                })
                                .always(function () {
                                    srv.close();
                                });
                        },
                        obcerstvit: function () {
                            var that = this;
                            this.tryReloadDetail(undefined, {
                                flashMessage: "jres:31926345", //RC 31926345 : Občerstveno
                                flashMessageClass: Gordic.Global.Enums.ColorStateClass.success
                            });
                        },
                        enableWflDetail: function () {
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }
                            var acts = this.actions;
                            acts.actObnovit.update({ enabled: l_bActionEnabled});
                            acts.actPristup.update({ visible: (this.RezimPodani === 0 && componentDto.IsPristupVisible) }); // enabled: l_bActionEnabled
                            acts.actFormaDokumentu.update({ enabled: l_bActionEnabled });
                            var wflDBParams = Gordic.Wfl.WebClient.GetGWflDBParams();
                            acts.actTiskUzivatelskePoznamky.update({ enabled: (wflDBParams && wflDBParams.gin_rad_konao === 1)? true : false });
                            acts.actTiskHistorie.update({ enabled: (wflDBParams && wflDBParams.gin_rad_konao === 1)? true : false });
                        },
                        //#endregion
                    },

                    actions: { //může být zadáno jako pole nebo jako objekt
                        //#region Dokument
                        actFindRecord: {
                            caption: "jres:26225865", //RC 26225865 : Hledat
                            icon: "gi-magglass",
                            tooltip:"jres:26226977", //RC 26226977 : Detail dokumentu/spisu se zadaným PID
                            run: function () {
                                $.content(this).najdiDokument();
                            }
                        },

                        actOtevriDokumentDoNoveZalozkyVeStejneFazi: Gordic.Wfl.PreActions.OtevriDokumentDoNoveZalozkyVeStejneFazi({
                            inputData: {
                                ixp: componentDto.ixp
                            },
                            done: function (retVal) {
                                var content = $.content(this);
                             
                            },
                            fail: function () {
                                $.content(this).showFlash(
                                    "jres:31926498", //RC 31926498 : Novou záložku se nepodařilo otevřít.
                                    Gordic.Global.Enums.ColorStateClass.error,
                                    undefined,
                                    "actOteveniNoveZalozky"
                                );
                            },
                            /*
                            actionParams: {
                                name: "actVytvoritBalik",
                                caption: "jres:26255568" //RC 26255568 : Vytvořit balík a vložit
                            }
                            */
                        }),

                        //actZavrit: {
                        //    caption: "jres:26225591", //RC 26225591 : Zavřít
                        //    icon: "gi-window-close",
                        //    tooltip: "jres:26225591", //RC 26225591 : Zavřít
                        //    run: function () {
                        //        $.content(this).closeDetail();
                        //    }
                        //},
                        //#endregion

                        //#region Zobrazit

                        actObnovit: {
                            caption: "jres:26226484", //RC 26226484 : Občerstvit
                            icon: "gi-refresh",
                            run: function () {
                                $.content(this).obcerstvit();
                            }
                        },
                        actPristup: {
                            caption: "jres:26226931", //RC 26226931 : Přístup
                            icon:"gi-universal-access_pencil",
                            run: function () {
                                $.content(this).individualniPristup();
                            }
                        },
                        actFormaDokumentu: {
                            caption: "jres:26226223", //RC 26226223 : Forma entity
                            icon:"gi-paper_question",
                            run: function () {
                                $.content(this).formaDokumentu();
                            }
                        },
                        actTiskUzivatelskePoznamky: GAction.createPrintAction({
                            name: "actTiskUzivatelskePoznamky",
                            tema: "ssl_ptm_uzvpozn", 
                            icon: "gi-print|gi-paper2 gi-bgw gi-stack-pos--rb g-state-text g-state-info",
                            caption: "jres:31926472", //RC 31926472 : Uživatelské poznámky
                            reportStarting: function (rep) {
                                rep.params.X0000 = componentDto.ixp;
                                rep.params.X0009 = componentDto.X0009;
                                rep.params.IXP = componentDto.ixp;
                               
                            },
                            //reportFinished: function (rep) {
                            //    $.content(this).tryReloadDetail();
                            //}
                        }),
                        actTiskHistorie: GAction.createPrintAction({
                            name: "actTiskHistorie",
                            tema: "usu_ptm_detpis1",
                            icon: "gi-print|gi-history gi-bgw gi-stack-pos--rb g-state-text g-state-info",
                            caption: "jres:31926473", //RC 31926473 : Historie
                            reportStarting: function (rep) {
                                rep.params.X0000 = componentDto.ixp;
                                rep.params.X0009 = componentDto.X0009;
                                rep.params.IXP = componentDto.ixp;

                            },
                            //reportFinished: function (rep) {
                            //    $.content(this).tryReloadDetail();
                            //}
                        }),
                        //#endregion
                    },

                    menuBar: [
                        Gordic.Wfl.Globals.MenuDefinitions.detailDokument(componentDto.TypSpis),
                        { action: "actFindRecord", parent: "menuDokument" },
                        { action: "actOtevriDokumentDoNoveZalozkyVeStejneFazi", parent: "menuDokument" },
                        { id: "menuDokumentSeparator44", type: "separator", parent: "menuDokument", after: "menuFindRecord" },
                        { action: "actFormaDokumentu", parent: "menuDokument", favorite: false },


                       // Gordic.Wfl.Globals.MenuDefinitions.detailZobrazit(),
                        { action: "actObnovit", favorite: true }, // after: "menuUlozitZmeny" 

                        $.extend({}, Gordic.Wfl.Globals.MenuDefinitions.detailTisk(), { favorite: true }),
                        { action: "actTiskUzivatelskePoznamky", parent: "menuTisk" },
                        { action: "actTiskHistorie", parent: "menuTisk" },

                        Gordic.Wfl.Globals.MenuDefinitions.detailCinnosti(),
                        { action: "actPristup", parent: "menuWflCinnosti", after: "menuWflCinnostiTrasy" },

                        // 12.06.2020 - TFeik
                        // Sdílení detailu přesunuto z ssl ddo wfl.
                        Gordic.Gin.Prefabs.MenuParams && Gordic.Gin.Prefabs.MenuParams.ShareCommandUrl
                            ? $.extend({}, Gordic.Gin.Prefabs.MenuParams.ShareCommandUrl({
                                commandUrl: Gordic.WebApp.Utility.createCommandUrl(null, 'OpenDetail', $.extend({
                                    ixx1: componentDto.ixp,
                                },  dbProfile != null ? {Profile: dbProfile} : {})),
                                vlozitDoKalendareOptions: {
                                    ixx: componentDto.ixp,
                                    ixs_fun: componentDto.IxsFunPrihlasenehoUzivatele
                                },
                                prehledUdalostiOptions: {
                                    ixp: componentDto.ixp
                                },
                                emailOptions: {
                                    subject: componentDto.Nazev
                                }
                            }), {favorite: true})
                            : undefined
                    ],
                  
                    //commandBar: [
                    //    "actZavrit"
                    //],
                      /*
                    statusBar: { //ukázka zadání jako objektu
                        statusMyComponentObjednano: {
                            "caption": "OBJEDNANO",
                            "type": "static",
                            "customClass": "g-state-warning g-state-text"
                        },

                        statusMyComponentSeparator1: {
                            "type": "separator"
                        },

                        statusMyComponentZaplaceno: {
                            "caption": "ZAPLACENO",
                            "type": "static",
                            "customClass": "g-state-info g-state-text"
                        },


                        statusMyComponentSeparator2: {
                            "type": "separator"
                        },

                        statusMyComponentVyrizeno: {
                            "caption": "VYRIZENO",
                            "type": "static",
                            "customClass": "g-state-success g-state-text"
                        }
                    },
                    */
                };
                return result;
            }
        }
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);