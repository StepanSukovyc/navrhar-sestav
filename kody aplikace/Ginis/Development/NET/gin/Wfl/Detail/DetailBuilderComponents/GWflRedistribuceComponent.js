(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DetailBuilderComponents.WflRedistribuce", {
        /**
         * Creates redistribuce component for detail builder.
         *
         * @param {GContent} content Current GContent, where this component will be used.
         * @param {Object} inputDto DTO with input data for this component. Currently is used only Ixp.
         * @param {Object} componentDto DTO with data for WflRedistribuceComponent.
         * @param {String} callbackContent GContent to call callbacks on or String with class for callbacks.
         */
        create: function (inputDto, componentDto) {

            var wflOps = Gordic.Wfl.WebClient.WflOps;
            var ucelRedistribuce = Gordic.Wfl.Globals.Enums.UcelRedistribuce;
            var result = { contentExtensions: {}, actions: [], menuBar: [], onBuild: [] };

            result.contentExtensions.wflRedistribuce_callbackContent = null; //toto tu musí být, aby se s reloadem zajistil výmaz starého contentu
            result.contentExtensions.wflRedistribuce_initData = null;
            result.contentExtensions.getWflRedistribuce_callbackContent = function () {
                if (this.wflRedistribuce_callbackContent !== null) {
                    return this.wflRedistribuce_callbackContent;
                }

                var callbackContent = this.className === "Gordic.Wfl.WebClient.GWflRedistribuceComponent" ? this : componentDto.RedistribuceTargetCallbackClass;

                if (callbackContent instanceof GContent) { // pokud je předán přímo GContent, volat metody na předaném GContentu

                    return this.wflRedistribuce_callbackContent = callbackContent;

                } else if (typeof callbackContent === "string" && callbackContent.length > 0) {
                    //pokud je předán namespace string, vytvořit GContent podle stringu a volat metody na něm.
                    return this.wflRedistribuce_callbackContent = this.createServiceContent(callbackContent);
                }

                // jinak vytvořit gcontent s defaultním namespace a volat metody tam.
                return this.wflRedistribuce_callbackContent = this.createServiceContent("Gordic.Wfl.WebClient.GWflRedistribuceComponent");
            };


            result.contentExtensions.showVRedistribuciFlashMesage = function () {
                this.showFlash({
                    label: "jres:31926346" + " | "  +//RC 31926346 : V REDISTRIBUCI
                        componentDto.FlashMessageText,
                    state: "warning",
                    noClose: true,
                    id:"idFlashVRedistribuci"
                    //icon:"",
                    //customClass: "g-state-warning"
                });

            };

            result.contentExtensions.hideVRedistribuciFlashMesage = function () {
                this.hideFlash("idFlashVRedistribuci")

            };

            result.contentExtensions.kontrolaDostupnostiDokumentuPoPredaniPrideleni = function () {
                var that = this;
                var opt = {
                    Ixp: inputDto.ixp
                };
                var srv = that.createServiceContent("Gordic.Wfl.WebClient.GWflDetailUtils");  //servisni sluzba/content
                srv.call("TestZdaJeOpravneniNaDokument", opt)
                    .done(function (retVal) {
                        if (retVal.StavBool) {
                            that.element.trigger(wflOps.eventName, {
                                operation: wflOps.WflOpsEnum.predani,
                                flashMessage: "jres:31926156", //RC 31926156 : Předání dopadlo úspěšně.
                                flashMessageClass: "g-state-success",
                            });
                        } else {
                            var text = "jres:31926580" + " " +  retVal.StavTxt; //RC 31926580 : Akce byla úspěšně dokončena.
                            that.notification("showToast", {
                                icon: "fa-check",
                                content: text, 
                                state: "success"
                            }, { delay: 6 });
                            that.tryClose();

                        }
                    }).always(function () { srv.close(); });

               

            };

            var defaultOptions = {
                ListIxp: inputDto.ixp,
                StopRedis: false,
                HromadnaAkce: false,
            };

            result.actions.push({
                name: "actWflRedistribucePredaniSsl",
                icon: componentDto.isPrevzit ? "gi-prevzit" : "gi-predat",
                run: function () {
                    var content = $.content(this);
                    if (componentDto.isPrevzit) {
                        content.dialogs.messageBox("jres:31926151", "jres:31926152", GDlg.mbbYesNo).createDialogPromise('yes') //RC 31926152 : Opravdu chcete převzít tento dokument?
                            .done(function () {
                                console.log("yes");
                                content.getWflRedistribuce_callbackContent().call("Prevzit", { Ixp: inputDto.ixp }).done(function (retVal) {
                                    if (retVal) {
                                        content.element.trigger(wflOps.eventName, {
                                            operation: wflOps.WflOpsEnum.prevzeti,
                                            flashMessage: "jres:31926154", //RC 31926154 : Převzetí dopadlo úspěšně.
                                            flashMessageClass: "g-state-success",
                                        });
                                        //content.load().done(function () {
                                        //    content.showFlash("Převzetí dopadlo úspěšně.", "g-state-success");
                                        //});
                                    }
                                });
                            }).fail(function () {
                                content.showFlash("jres:31926159", "g-state-info"); //RC 31926159 : Převzetí bylo přerušeno uživatelem.
                            });
                    } else {
                        if (content.SimpleMode) {
                            var TypPredani = 1; //"Dokument";

                            if (componentDto.PrizSpis == 1) { // TODO
                                TypPredani = 2;//"Spis";
                            }

                            var opt = {
                                IXPs: inputDto.ixp,
                                TypPredani: TypPredani
                            };

                            Gordic.Wfl.Dialogs.GPrimePredaniDokumentuDlg(content, opt, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                .done(function (retVal) {
                                    if (retVal && retVal.ulozeno) {
                                        content.kontrolaDostupnostiDokumentuPoPredaniPrideleni();
                                        //content.element.trigger(wflOps.eventName, {
                                        //    operation: wflOps.WflOpsEnum.predani,
                                        //    flashMessage: "jres:31926156", //RC 31926156 : Předání dopadlo úspěšně.
                                        //    flashMessageClass: "g-state-success",
                                        //});
                                    }
                                });
                        } else {
                            var options = $.extend({}, defaultOptions, {
                                Ucel: ucelRedistribuce.PREDANI,
                            });

                            Gordic.Wfl.Dialogs.PredaniPrideleniSsl($.content(this), options)

                                .done(function (retVal, cnt) {
                                    content.kontrolaDostupnostiDokumentuPoPredaniPrideleni();
                                    //content.element.trigger(wflOps.eventName, {
                                    //    operation: wflOps.WflOpsEnum.predani,
                                    //    flashMessage: "jres:31926156", //RC 31926156 : Předání dopadlo úspěšně.
                                    //    flashMessageClass: "g-state-success",
                                    //});
                            });
                        }
                    }
                },
                enabled: componentDto.isPredaniOrPrevzetiEnabled,
                visible: !componentDto.IsTS_S_D,
                caption: componentDto.isPrevzit ?
                    "jres:26225203" //RC 26225203 : Převzít
                    : "jres:31926161" //RC 31926161 : Přímo předat
            });

            result.actions.push(
                {
                    name: "actWflRedistribucePrideleniSsl",
                    icon: "gi-pridelit",
                    run: function () {
                        var content = $.content(this);
                        var options = $.extend({}, defaultOptions, {
                            Ucel: ucelRedistribuce.PRIDELENI,
                        });

                        Gordic.Wfl.Dialogs.PredaniPrideleniSsl(content, options).done(function (retVal, cnt) {
                            content.element.trigger(wflOps.eventName, {
                                operation: wflOps.WflOpsEnum.prideleni,
                                flashMessage: "jres:31926402", //RC 31926402 : Přidělení dopadlo úspěšně
                                flashMessageClass: "g-state-success",
                            });
                        });
                    },
                    enabled: componentDto.isPrideleniEnabled,
                    visible: !componentDto.IsTS_S_D,
                    caption: "jres:26225198" //RC 26225198 : Přidělit
                },
                {
                    name: "actWflRedistribuceZrusitPrideleni",
                    run: function () {
                        var content = $.content(this);
                        content.dialogs.messageBox("jres:31926163", "jres:31926164", GDlg.mbbYesNo).createDialogPromise('yes') //RC 31926164 : Opravdu chcete zrušit přidělení?
                            .done(function () {
                                content.getWflRedistribuce_callbackContent().call("ZrusitPrideleni", { Ixp: inputDto.ixp }).done(function (retVal) {
                                    switch (retVal) {
                                        case "0": {
                                            content.showFlash("jres:31926165", "g-state-error"); //RC 31926165 : Zrušení přidělení selhalo.
                                            break;
                                        }
                                        case "1": {
                                            content.element.trigger(wflOps.eventName, {
                                                operation: wflOps.WflOpsEnum.prideleni,
                                                flashMessage: "jres:31926166", //RC 31926166 : Přidělení bylo úspěšně zrušeno.
                                                flashMessageClass: "g-state-success"
                                            });
                                            break;
                                        }
                                        default: {
                                            content.showFlash(retVal, "g-state-warning");
                                        }
                                    }
                                });
                            }).fail(function () {
                                content.showFlash("jres:31926167", "g-state-info"); //RC 31926167 : Zrušení přidělení bylo přerušeno uživatelem.
                            });
                    },
                    icon: ["gi-pridelit", "gi-window-close g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw"],
                    enabled: componentDto.isZrusitPrideleniEnabled,
                    visible: !componentDto.IsTS_S_D,
                    caption: "jres:26225201" //RC 26225201 : Zrušit přidělení
                }
            );

            // Menu
            result.menuBar = [
                Gordic.Wfl.Globals.MenuDefinitions.detailRedistribuce(),
                //{ action: componentDto.isEKO ? "actWflRedistribucePredaniEko" : "actWflRedistribucePredaniSsl", parent: "menuWflRedistribuce", favorite: true },
                { action:  "actWflRedistribucePredaniSsl", parent: "menuWflRedistribuce", favorite: true },
                { action: "actWflRedistribucePrideleniSsl", parent: "menuWflRedistribuce", favorite: true },
                { action: "actWflRedistribuceZrusitPrideleni", parent: "menuWflRedistribuce" }
            ];
          
            // TAB
            result.onBuild.push(function () {
                this.hideVRedistribuciFlashMesage();
            });

            if (componentDto.isPredatniPrideleniTabVisible) {
                //result.statusBar = [
                //    {
                //        name: "actWflRedistribuceStatus",
                //        caption: "jres:31926346", //RC 31926346 : V REDISTRIBUCI
                //        type: "static",
                //        //customClass: "g-state-info g-state-text",
                //        after: "statusDoplnujiciInformaceStatus"
                //    }
                //];
                result.onBuild.push(function () {
                    this.nasetujRedistribuci(this.WflRedistribuce_Dto);
                    this.showVRedistribuciFlashMesage();

                });

                /**
                   var divik = $("<div>").gflashpanel({ icon: "fa-plane", label: label, noClose: true, customClass: undefined });; //g-state-warning
                   this.element.find(".header-form").before(divik);
                 */

                result.contentExtensions.nasetujRedistribuci = function (dto) {
                    var form = this.findForms("formSslRedistribuce");

                    if (form.length <= 0) { // lazy load
                        this.wflRedistribuce_initData = dto;
                        return;
                    }

                    var fields = form.findFields();

                    fields.gfield("model", "apply", dto);
                    //fields.gfield("model", "validators", componentDto.Validators);

                };

                result.tabs = {
                    SslRedistribuce: {
                        tabParams: {
                            title: "jres:26226820", //RC 26226820 : Redistribuce
                            group: Gordic.Prefabs.TabGroups.Redistribuce()
                        },

                        init: function (tab) {
                            //#region definice tab dokumentu
                            var that = $.content(tab);
                            tab.one('gtabopen', function () {
                                var redistribuceForm = new Gordic.Forms
                                    .Form({ name: "formSslRedistribuce" })
                                    .addSection();
                                //1
                                redistribuceForm

                                    .addRow("jres:31926168") //RC 31926168 : Start
                                    .addField("gstringbox", "w-5", {
                                        name: "StartSU",
                                        disabled: true
                                    })
                                    .addField("gstringbox", "w-7", {
                                        name: "StartFunRef",
                                        disabled: true
                                    })

                                    .addRow("jres:31926169") //RC 31926169 : Aktuálně
                                    .addField("gstringbox", "w-5", {
                                        name: "AktSU",
                                        disabled: true
                                    })
                                    .addField("gstringbox", "w-7", {
                                        name: "AktFunRef",
                                        disabled: true
                                    })


                                    .addRow("jres:31926170") //RC 31926170 : Další cíl
                                    .addField("gstringbox", {
                                        name: "DalCilSU",
                                        disabled: true
                                    })

                                    .addRow("jres:31926171") //RC 31926171 : Konečný cíl
                                    .addField("gstringbox", "w-5", {
                                        name: "KonCilSU",
                                        disabled: true
                                    })
                                    .addField("gstringbox", "w-7", {
                                        name: "KonCilFunRef",
                                        disabled: true
                                    })

                                    .addRow("jres:31926172") //RC 31926172 : Účel distribuce
                                    .addField("gstringbox", {
                                        name: "UcelDistribuce",
                                        disabled: true
                                    })

                                    .addRow("jres:26225619") //RC 26225619 : Stav
                                    .addField("gstringbox", {
                                        name: "Stav",
                                        disabled: true
                                    })
                                    ;

                                $("<div>").appendTo(tab)
                                    .gform("createFrom", redistribuceForm);

                                if (componentDto.GridDataTable && componentDto.GridDataTable.length > 0) {
                                    //grid
                                    var gridKolonky = new Gordic.Data.GridFormat()

                                        .addDateTimeColumn({
                                            name: "dat_zmena",
                                            caption: "jres:26225280", //RC 26225280 : Datum změny
                                        })

                                        .addTextColumn({
                                            name: "nazev_su_od",
                                            caption: "jres:26226962", //RC 26226962 : Od uzlu
                                        })
                                        .addTextColumn({
                                            name: "nazev_rf_od",
                                            caption: "jres:26226963", //RC 26226963 : Od referenta
                                        })
                                        .addTextColumn({
                                            name: "nazev_su_do",
                                            caption: "jres:26226964", //RC 26226964 : Uzlu
                                        })
                                        .addTextColumn({
                                            name: "nazev_rf_do",
                                            caption: "jres:26226965", //RC 26226965 : Referentovi
                                        });

                                    var redistribuceFormSekce = new Gordic.Forms
                                        .Form({ name: "formSslRedistribuceSekce" })
                                        .addSection("jres:31926173"); //RC 31926173 : Historie redistribuce

                                    $("<div>").appendTo(tab)
                                        .gform("createFrom", redistribuceFormSekce);

                                    var viewRedistribuce = new Gordic.Data.View(componentDto.GridDataTable);
                                    $("<div>").appendTo(tab)
                                        .gautofit()
                                        .ggrid({
                                            name: "GridRedistribuce",
                                            data: viewRedistribuce,
                                            renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                                            columnMode: "fit",  // fit, full
                                            navigationMode: "row", // row, cell

                                            columns: gridKolonky,
                                        });
                                }

                                // lazy load on open
                                if (that.wflRedistribuce_initData !== null) {
                                    that.nasetujRedistribuci(that.wflRedistribuce_initData);
                                    that.wflRedistribuce_initData = null;
                                }
                            });
                            //#endregion
                        }
                    }
                }
            } // end if componentDto.isPredatniPrideleniTabVisible

            return result;
        },
    }, { pure: true, extendIntellisense: GContent });
})(jQuery);