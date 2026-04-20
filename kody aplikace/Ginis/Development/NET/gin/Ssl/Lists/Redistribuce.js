(function ($) {
    "use strict";
    namespace("Gordic.Ssl.Lists.Redistribuce", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26255162"; //RC 26255162 : Redistribuce

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_sredi04", // pozor, poradí subtasku se v prubehu zmenilo  lisi se od cislovani temat
                ["filterSubjekt", "filterRedistribuceVariant"],
                "FilterPanelPrehledKPrevzeti"
            )

            this.loadGridImmediately = false; // zakazu prvotni nacteni gridu

            this.SelectedSubjectDefault = this.model.SelectedSubject;

            this.actions.addRange({
                noact: { run: $.noop },
                actPredat: {
                    name: "actPredat",
                    icon: "gi-predat",
                    caption: "jres:26257050", //RC 26257050 : Předat
                    run: function (ev, ctx) {

                        var l_fPredat = function () {
                            // that.beginOperation("jres:26257052"); //RC 26257052 : Předání ...

                            var selectedRowsInfo = that.GetSelectedRowsInfoFromList();

                            if(selectedRowsInfo.length > 0) {
                                that.call("Predat", { selectedRowsInfo: selectedRowsInfo, model: that.model })
                                    .done(function (rv) {
                                        if(rv.PrintProtocol === true) {
                                            that.PredavaciProtokolInfo = { ixsFunPredavajici: that.IxsFunAkt, ixsFunPrebirajici: that.model.IxsFun };
                                            that.TiskPredavacihoProtokolu();
                                        }
                                        that.Reload();
                                    })
                                    .always(function () {
                                        // that.endOperation();
                                    });
                            }
                        }

                        if(that.SslAutPrePar != "bez" && that.model.SubTask == that.RedistribuceSubTask.KPredani) { // autorizuje se v KPredani. V přehledu se neautorizuje (není jasné koho autorizovat)
                            if (that.model.IxsFun != null) {
                                var WinTitle = "jres:26257051"; //RC 26257051 : Zadejte identifikaci přebírající osoby
                                var options = {
                                    WinTitle: WinTitle,
                                    Behaviour: 1,
                                    IxsFun: that.model.IxsFun
                                };
                                var $div = Gordic.Wfl.Dialogs.OvereniPrebirajiciOsobyDlg(that, options);
                                // u prehledu prevzeti je ve stare aplikaci bez autorizace, ale priklanim se k jednotnemu chovani, zvlast, kdyz je to stejna uloha, byť v jiném subtasku

                                $div.on("close", function (ev, retVal) {
                                    if (retVal) {
                                        l_fPredat();
                                    }
                                });
                            } else {
                                that.dialogs.error("jres:26257181"); //RC 26257181 : Není vyplněna přebírající osoba.
                            }

 
                        } else {
                            l_fPredat();
                        }
                    }
                },
                actPrevzit: {
                    name: "actPrevzit",
                    icon: "gi-prevzit",
                    caption: "jres:26255321", //RC 26255321 : Převzít
                    run: function (ev, ctx) {

                        //var l_fPrevzit = function () {
                        //    var selectedRowsInfo = that.GetSelectedRowsInfoFromList();

                        //    // that.beginOperation("jres:26256709"); //RC 26256709 : Převzetí ...

                        //    if (selectedRowsInfo.length > 0) {
                        //        that.call("Prevzit", { selectedRowsInfo: selectedRowsInfo, model: that.model })
                        //            .always(function () {
                        //                // that.endOperation();
                        //            })
                        //            .done(function (rv) {
                        //                var l_oPredavaciProtokolInfo = null;

                        //                if(that.model.SubTask == that.RedistribuceSubTask.KPrevzeti) {
                        //                    l_oPredavaciProtokolInfo = { ixsFunPredavajici: that.model.IxsFun, ixsFunPrebirajici: that.ZaIxsFun };
                        //                } else if(that.model.SubTask == that.RedistribuceSubTask.PrehledKPrevzeti) {
                        //                    l_oPredavaciProtokolInfo = { ixsFunPredavajici: "", ixsFunPrebirajici: that.ZaIxsFun };
                        //                }

                        //                if(l_oPredavaciProtokolInfo) {
                        //                    that.PredavaciProtokolInfo = l_oPredavaciProtokolInfo;
                        //                    that.TiskPredavacihoProtokolu();
                        //                }

                        //                that.Reload(false);
                        //            });
                        //    }
                        //}

                        var l_fPrevzitWfl = function () {
                            var selectedRowsInfo = that.GetSelectedRowsWflInfoFromList();

                            // that.beginOperation("jres:26256709"); //RC 26256709 : Převzetí ...

                            if (selectedRowsInfo.length > 0) {
                                that.call("PrevzitWfl", { selectedRowsInfo: selectedRowsInfo, model: that.model })
                                    .always(function () {
                                        // that.endOperation();
                                    })
                                    .done(function (rv) {
                                        var l_oPredavaciProtokolInfo = null;

                                        if (that.model.SubTask == that.RedistribuceSubTask.KPrevzeti) {
                                            l_oPredavaciProtokolInfo = { ixsFunPredavajici: that.model.IxsFun, ixsFunPrebirajici: that.ZaIxsFun };
                                        } else if (that.model.SubTask == that.RedistribuceSubTask.PrehledKPrevzeti) {
                                            l_oPredavaciProtokolInfo = { ixsFunPredavajici: "", ixsFunPrebirajici: that.ZaIxsFun };
                                        }

                                        if (l_oPredavaciProtokolInfo) {
                                            that.PredavaciProtokolInfo = l_oPredavaciProtokolInfo;
                                            that.TiskPredavacihoProtokolu();
                                        }

                                        that.Reload(false);
                                    });
                            }
                        }

                        if(that.SslAutPrePar != "bez" && that.model.SubTask == that.RedistribuceSubTask.KPrevzeti) { // autorizuje se v KPrevzeti. V přehledu se neautorizuje (není jasné koho autorizovat)
                            if(that.model.IxsFun != null) {
                                var WinTitle = "jres:26255723"; //RC 26255723 : Zadejte identifikaci předávající osoby
                                var options = {
                                    WinTitle: WinTitle,
                                    Behaviour: 1,
                                    IxsFun: that.model.IxsFun
                                };
                                var $div = Gordic.Wfl.Dialogs.OvereniPrebirajiciOsobyDlg(that, options);
                                // u prehledu prevzeti je ve stare aplikaci bez autorizace, ale priklanim se k jednotnemu chovani, zvlast, kdyz je to stejna uloha, byť v jiném subtasku

                                $div.on("close", function (ev, retVal) {
                                    if (retVal) {
                                        l_fPrevzitWfl();
                                    }
                                });
                            } else {
                                that.dialogs.error("jres:26257182"); //RC 26257182 : Není vyplněna předávající osoba.
                            }
                        } else {
                            l_fPrevzitWfl();
                        }
                    }
                },
                actOdmitnout: {
                    name: "actOdmitnout",
                    icon: "fa-times-circle",
                    caption: "jres:26256947", //RC 26256947 : Odmítnout
                    run: function (ev, ctx) {
                        var dotaz = "jres:26256676"; //RC 26256676 : Dotaz

                        GDlg.prompt(dotaz, "jres:26256949") //RC 26256949 : Důvod zamítnutí převzetí
                            .on("ok", function (ev, duvod) {
                                if(duvod != null && duvod.trim() != "") {
                                    var selectedRowsInfo = that.GetSelectedRowsInfoFromList();

                                    if(selectedRowsInfo.length > 0) {
                                        that.call("OdmitnoutPrevzeti", { selectedRowsInfo: selectedRowsInfo, model: that.model, duvod: duvod })
                                            .always(function () {

                                            })
                                            .done(function (rv) {
                                                that.Reload(false);
                                            });
                                    }
                                } else {
                                    GDlg.alert("jres:26256950"); //RC 26256950 : Musíte uvést důvod zamítnutí převzetí.
                                }
                            })
                    }
                },
                actSuProPredani: {
                    name: "actSuProPredani",
                    icon: "gi-uzel",
                    caption: "jres:26257007", //RC 26257007 : SU pro předání
                    tooltip: "jres:26257008", //RC 26257008 : Spisové uzly pro předání
                    run: function (ev, ctx) {
                        that.findFields().gfield("model", "collect", that.model);

                        var options = {
                            Ixs: that.model.SelectedSubject.Ixs,
                            TypIxs: that.model.SelectedSubject.TypeIxs,
                            PredatOsobe: that.model.TypRedistribucnihoSubjektuFilter == 2
                        };

                        var $div = Gordic.Wfl.Dialogs.SUProHromadnePredaniDlg(that, options).on("close", function (ev, retVal) {
                            if(retVal) {
                             
                            }
                        });
                    }
                },
                actZrusitPrideleniRedi: new GAction(Gordic.Wfl.PreActions.ZrusitPrideleniHromadne({
                    inputData: function () {
                        return that.GetSelectedRowsInfoFromList();
                    },
                    done: function (retVal) {

                        if(retVal != null) {
                            if (retVal.GroupResult) {
                                that.GroupResult = retVal.GroupResult;
                            } else {
                                that.GroupResult = undefined;
                            }
                        }
                    },
                    always: function (retVal) {
                        that.Reload();
                    }
                })),
                actZmenitPrideleniRedi: new GAction(Gordic.Wfl.PreActions.ZmenitPrideleniHromadne({
                    inputData: function () {
                        var deferred = $.Deferred();

                        var ixpArr = that.GetIxpArrayFromSelection();
                        if(ixpArr.length > 0) {
                            return deferred.resolve({ opt: ixpArr }).promise();
                        } else {
                            that.dialogs.error("jres:26257034"); //RC 26257034 : Označte řádek pro provedení akce.
                            return deferred.reject();
                        }
                    },
                    done: function (retVal) {

                        if (retVal != null) {
                            if (retVal.GroupResult) {
                                that.GroupResult = retVal.GroupResult;
                            } else {
                                that.GroupResult = undefined;
                            }
                        }
                    },
                    always: function (retVal) {
                        that.Reload();
                    }
                })),
            });

            this.menuBar(
                this.actions.createBar(["actDetailWfl*", "actOtevriDokumentDoNoveZalozkyVeStejneFazi*", "actPredatWfl*", "actPredat*", "actPrevzit*", "actZrusitPrideleniRedi*", "actZmenitPrideleniRedi*", "actOdmitnout*", "actSuProPredani*", "-", "actVlozitDokEpkWfl", "actVlozitSpisEpkWfl", "actPoznamkovyBlokPridatSsl*", "-", "actUzivatelskeSloupceVlastnostiWfl", "-", "actTiskListWfl*", "-", "actObcerstvitWfl"])
            );
  
            this.contextMenu = [
                {
                    action: this.actions.actPredatWfl,
                },
                {
                    action: this.actions.actPredat,
                },
                {
                    action: this.actions.actPrevzit,
                },
                {
                    action: this.actions.actZrusitPrideleniRedi,
                },
                {
                    action: this.actions.actZmenitPrideleniRedi,
                },
                {
                    action: this.actions.actSuProPredani,
                },
                {
                    action: this.actions.actVlozitDokEpkWfl,
                },
                {
                    action: this.actions.actVlozitSpisEpkWfl,
                },
                {
                    action: this.actions.actPoznamkovyBlokPridatSsl,
                },
                {
                    action: this.actions.actUzivatelskeSloupceVlastnostiWfl,
                },
                {
                    action: this.actions.actObcerstvitWfl,
                },
            ];

            $("<div>").appendTo(this.element)
                .gsubtasks({
                    params: [
                        { caption: "jres:26256871", action: this.actions.actPrehledKPrevzeti }, //RC 26256871 : Přehled k převzetí
                        { caption: "jres:26256872", action: this.actions.actPrehledKPredani }, //RC 26256872 : Přehled k předání
                        { caption: "jres:26256145", action: this.actions.actKPrevzeti }, //RC 26256145 : K převzetí
                        { caption: "jres:26256129", action: this.actions.actKPredani }, //RC 26256129 : K předání
                    ]
                })
                .gsubtasks("setActive", this.model.SubTask);

            // samotná definice gfilterpanelu
            this.filterForm = $("<div>")
                .appendTo(this.element)
                .on("gfilterpanelapply", function (event, obj) {         // eventa která je vyvolána při vyhledávání. obj.filter -> hledaný seznam podmínek
                    //that.Reload(obj.filter);
                    that.NacistClick(obj.filter);
                // 02.08.2022 - TFeik
                // Zrušení duplicitního vytváření filterpanelu.
                //}).gfilterpanel({
                //    forms: null, // poleFormu ktere budou pouzity pro podminky
                //    simpleMode: true,
                //    favoriteLayoutDescriptor: "L3M2S1",
                });

            this.PrepareSubtask();
        },
        CreateFilterForms: function () {
            var that = this;

            var flagPrehled = this.IsPrehled();

            this.loadGridImmediately = flagPrehled; // zakazu prvotni nacteni gridu

            var l_sTypRedistribucnihoSubjektuLabel = "";
            var l_sSuFunRefLabel = "";
            var l_sVlastnictviLabel = "";
            var l_bVazbaNaSpisDenik = true;

            var subjektOnlyFun = Gordic.Ssl.Globals.Enums.TypSubjektuFilter.VSE;

            var l_bActPredatWflVisible = false;
            var l_bActPredatVisible = false;
            var l_bActPredatEnabled = false;
            var l_bActPrevzitVisible = false;
            var l_bActPrevzitEnabled = false;
            var l_bActOdmitnoutVisible = false;
            var l_bActOdmitnoutEnabled = false;
            var l_bActSuProPredaniVisible = false;
            var l_bZrusitPrideleniVisible = false;
            var l_bZmenitPrideleniVisible = false;

            if(this.model.SubTask == this.RedistribuceSubTask.KPredani) {
                l_sTypRedistribucnihoSubjektuLabel = "jres:26256705"; //RC 26256705 : Směrováno na
                l_sVlastnictviLabel = "jres:26255711"; //RC 26255711 : Předávající
                l_sSuFunRefLabel = "jres:26255693"; //RC 26255693 : Přebírající
                l_bVazbaNaSpisDenik = true && this.SslPripreomezPar == 1;

                this.printRestrictionALF = "red_pred";

                l_bActPredatVisible = true;
                l_bActSuProPredaniVisible = true;
                l_bZrusitPrideleniVisible = true;
                l_bZmenitPrideleniVisible = true;
            } else if(this.model.SubTask == this.RedistribuceSubTask.KPrevzeti) {
                l_sTypRedistribucnihoSubjektuLabel = "jres:26256706"; //RC 26256706 : Převzetí od
                l_sVlastnictviLabel = "jres:26255693"; //RC 26255693 : Přebírající
                l_sSuFunRefLabel = "jres:26255711"; //RC 26255711 : Předávající
                l_bVazbaNaSpisDenik = false;

                this.printRestrictionALF = "red_prev";

                l_bActPrevzitVisible = true;
                l_bActPrevzitEnabled = true; // zde je vzdy prevzeti povoleno
                l_bActOdmitnoutVisible = true;
                l_bActOdmitnoutEnabled = this.LzeZamitnoutPrideleniZeSeznamu;
            } else if(this.model.SubTask == this.RedistribuceSubTask.PrehledKPredani) {
                l_sTypRedistribucnihoSubjektuLabel = "jres:26256706"; //RC 26256706 : Převzetí od
                l_sVlastnictviLabel = "jres:26255711"; //RC 26255711 : Předávající
                subjektOnlyFun = Gordic.Ssl.Globals.Enums.TypSubjektuFilter.JEN_FUN_AKTSU;

                this.printRestrictionALF = "pre_pred";

            } else if(this.model.SubTask == this.RedistribuceSubTask.PrehledKPrevzeti) {
                l_sTypRedistribucnihoSubjektuLabel = "jres:26256705"; //RC 26256705 : Směrováno na
                l_sVlastnictviLabel = "jres:26255693"; //RC 26255693 : Přebírající
                subjektOnlyFun = Gordic.Ssl.Globals.Enums.TypSubjektuFilter.JEN_FUN_AKTSU;

                this.printRestrictionALF = "pre_prev";

                l_bActPrevzitVisible = true;
                l_bActPrevzitEnabled = true; // zde je vzdy prevzeti povoleno
                l_bActOdmitnoutVisible = true;
                l_bActOdmitnoutEnabled = this.LzeZamitnoutPrideleniZeSeznamu;
            }
 
            this.actions.actPredatWfl.enabled(false);
            this.actions.actPredat.enabled(l_bActPredatEnabled);
            this.actions.actPrevzit.enabled(l_bActPrevzitEnabled);
            this.actions.actOdmitnout.enabled(l_bActOdmitnoutEnabled);
            this.actions.actPredatWfl.visible(l_bActPredatWflVisible);
            this.actions.actPredat.visible(l_bActPredatVisible);
            this.actions.actPrevzit.visible(l_bActPrevzitVisible);
            this.actions.actOdmitnout.visible(l_bActOdmitnoutVisible);
            this.actions.actSuProPredani.visible(l_bActSuProPredaniVisible);
            this.actions.actZrusitPrideleniRedi.visible(l_bZrusitPrideleniVisible);
            this.actions.actZmenitPrideleniRedi.visible(l_bZmenitPrideleniVisible);

            var filterForm = new Gordic.Forms.Form({ name: "FormRediList", tabLabel: "jres:26256764", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" })

            filterForm.addSection(Gordic.Wfl.Prefabs.FilterSubjekt({
                name: "filterSubjekt",
                model: "model.SelectedSubject.Ixs=value.Ixs;model.SelectedSubject.Name=value.Name;model.SelectedSubject.TypeIxs=value.TypeIxs;model.SelectedSubject.SubjectStructOrg=value.SubjectStructOrg;model.SelectedSubject.pIxs=value.pIxs",
                typSubjektuFilter: subjektOnlyFun,
                label: l_sVlastnictviLabel,
                initialValue: this.model.SelectedSubject
            }, this));

            if(!flagPrehled) {
                var filtrUzelVisible = true;
                var ginsfunSSUValidators = undefined;

                if(this.model.SubTask == this.RedistribuceSubTask.KPrevzeti && this.GinRpPreSuPar == 0) {
                    filtrUzelVisible = false;
                    ginsfunSSUValidators = [new Gordic.Validators.Required()];
                }

                filterForm.addSection(Gordic.Ssl.Prefabs.FilterTypRedistribucnihoSubjektu({
                    name: "filterRedistribucniSubjekt",
                    model: "model.TypRedistribucnihoSubjektuFilter=value.id",
                    label: l_sTypRedistribucnihoSubjektuLabel,
                    initialValue: this.model.TypRedistribucnihoSubjektuFilter,
                    FiltrUzelVisible: filtrUzelVisible,
                }));
                filterForm
                    .addSection().addRow(l_sSuFunRefLabel).addField("gselectbox", "w-4",
                        Gordic.Gin.Fields.ginspodSSU(
                        {
                            name: "suField",
                            model: "IxsSu = ixs_su",
                            serverFilters: {
                                aktivita: [100],
                            },
                            initialValue: { ixs_su: this.model.IxsSu} ,
                            /*  change: function (ev, data) {
                                  that.AnableActions();
                              }*/
                            }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.BEZNE)).addField("gselectbox", "w-8",
                            Gordic.Gin.Fields.ginsfunSSU(
                            {
                                name: "funField",
                                model: "IxsFun = ixs_fun",
                                serverFilters: {
                                    aktivita: [100],
                                    VazbaNaSpisovyDenik: l_bVazbaNaSpisDenik,
                                    ixs_su: new Gordic.Forms.Dependency("suField", "ixs_su")
                                },
                                initialValue: { ixs_fun: this.model.IxsFun },
                                validators: ginsfunSSUValidators,
                                  /*  change: function (ev, data) {
                                      that.AnableActions();
                                  }*/
                                }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.BEZNE, "suField")
                        );
            } else {
                if(this.model.SubTask == this.RedistribuceSubTask.PrehledKPrevzeti) {
                    filterForm.addSection(Gordic.Ssl.Prefabs.FilterRedistribuceVariant({ name: "filterRedistribuceVariant", model: "model.RedistribuceVariantFilter=value.id", label: "jres:26255267", initialValue: this.model.RedistribuceVariantFilter })); //RC 26255267 : Zobrazit
                }
            }

            //if(flagPrehled) { // podminka docasne!!! Pole by mělo byt vsude, ale zatim nevim jak zkombinovat s polem FilterTypRedistribucnihoSubjektu v sekci redistribuce
                
            //}
            return [filterForm];
        }, 
        LoadGrid: function () {
            var that = this;
            var flagPrehled = this.IsPrehled();
            var gridColumnsDefinition = new Gordic.Data.GridFormat();
            var columnListDefaultProfil = [];

            gridColumnsDefinition.addIconColumn(this.VysledekOperaceIcoColumn());
            columnListDefaultProfil.push("ico_status");

            // nove ikonove sloupce
            Gordic.Wfl.GWflCommonDlg.AddDokumentyColumnsDlg(gridColumnsDefinition, {}); // extendObj nepovinné
            columnListDefaultProfil.push("typ_entity_ico");
            columnListDefaultProfil.push("technicke_vlastnosti_ico");
            columnListDefaultProfil.push("pozice_spis_ico");
            columnListDefaultProfil.push("stav_zpracovani_ico");
            columnListDefaultProfil.push("termin_ico");
            columnListDefaultProfil.push("dat_dtermin_ico");
            columnListDefaultProfil.push("doplnujici_informace_ico");

            gridColumnsDefinition
                .addTextColumn({
                    name: "akt_znacka",
                    caption: this.ZnackaShortText,
                    width: 150,
                    fixedWidth: false,
                    sortOrder: Gordic.Ssl.Utils.SortSpzn,
                })
                .addTextColumn({
                    name: "ixp",
                    caption: "jres:26255367", //RC 26255367 : PID
                    width: 120,
                 //   fixedWidth: true,
                })
                .addTextColumn({
                    name: "misto_vzniku",
                    caption: "jres:26255430", //RC 26255430 : Odesílatel
                    width: 200,
                })
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26255640", //RC 26255640 : Věc-obsah
                    width: 250,
                });

            columnListDefaultProfil.push("akt_znacka");
            columnListDefaultProfil.push("ixp");
            columnListDefaultProfil.push("misto_vzniku");
            columnListDefaultProfil.push("nazev");

            if (flagPrehled) {
                if (this.model.SubTask == this.RedistribuceSubTask.PrehledKPrevzeti) {
                    gridColumnsDefinition
                        .addTextColumn({
                            name: "nazev_su_od",
                            caption: "jres:26255706", //RC 26255706 : K převzetí od uzlu
                            width: 200,
                        });
                    columnListDefaultProfil.push("nazev_su_od");
                }

                gridColumnsDefinition
                    .addTextColumn({
                        name: "nazev_rf_cil",
                        caption: "jres:26255703", //RC 26255703 : Cílová osoba
                        width: 200,
                    })
                columnListDefaultProfil.push("nazev_rf_cil");
            }

            gridColumnsDefinition.addTextColumn({
                name: "ucel_dist_txt",
                caption: "jres:26255704", //RC 26255704 : Účel distribuce
                width: 200,
            });
            columnListDefaultProfil.push("ucel_dist_txt");

            if(flagPrehled) {
                gridColumnsDefinition
                    .addTextColumn({
                        name: "nazev_su_do",
                        caption: "jres:26255560", //RC 26255560 : Další cíl
                        width: 200,
                    })
                    .addTextColumn({
                        name: "nazev_su_cil",
                        caption: "jres:26255707", //RC 26255707 : Konečný cíl
                        width: 200,
                    });

               
                
                columnListDefaultProfil.push("nazev_su_do");
                columnListDefaultProfil.push("nazev_su_cil");
            }

            gridColumnsDefinition
                .addTextColumn({
                    name: "ixs_typ_txt",
                    caption: this.gin_n23_vecsk == 0 ? "jres:31937228" : "jres:26257355", //RC 31937228 : Typ dokumentu RC 26257355 : Druh dokumentu
                    width: 200,
                })
                .addDateTimeColumn({
                    name: "dat_zmena",
                    caption: "jres:26255404", //RC 26255404 : Datum změny
                });

            columnListDefaultProfil.push("ixs_typ_txt");
            columnListDefaultProfil.push("dat_zmena");

          //  if(!flagPrehled) {
                gridColumnsDefinition
                    .addDateTimeColumn({
                        name: "dat_pod",
                        caption: "jres:26257387", //RC 26257387 : Datum podání / založení
                    });

                columnListDefaultProfil.push("dat_pod");
          //  }

            gridColumnsDefinition.addTextColumn({
                name: "nazev_fun_akt",
                caption: "jres:26257036", //RC 26257036 : Aktuální vlastník
                width: 200,
            });
            columnListDefaultProfil.push("nazev_fun_akt");

            gridColumnsDefinition
                .addNumberColumn({
                    name: "s_fyz",
                    caption: "jres:26257135", //RC 26257135 : Příznak fyzické formy
                    width: 30,
                    visible: false,
                })
            // POZOR! Sloupec s_fyz nepřidávám do žádného profilu. Musí být pouze v GridFormat kvůli možnostem podmíněného formátování - T22735

            this.AddUserColumnsToGridFormat(gridColumnsDefinition); // zvazit presun do funkce onGetGridData

            const gridDefaultProfil = {
                name: "jres:26257134", //RC 26257134 : Výchozí pohled
                columnList: columnListDefaultProfil.toString()
            };

            this.mainGrid.ggrid({
                name: "GridDocs",
                //    data: that.ViewTabulkaSubjektu,
                renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                columnMode: "full",  // fit (defaultne by melo byt toto), full
                customClass: "js-gridKartoteka",
                navigationMode: "row", // row, cell
                defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                    name: "gridRowSelectedAct",
                    run: function (ev, ctx) {
                        var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                        var options = {
                            ixp: rowData.ixp,
                            grid: that.mainGrid
                        };
                        Gordic.Wfl.MainApp.ShowDetail(that, options);
                    }
                }),
                /*
                selection: function (ev, selectionInfo) {
                    if (selectionInfo.count === 1) { // u single modu vzdy 1 ale pro jistotu testuji
                        var rowData = that.mainGrid.ggrid("getSelection");
                        var row = rowData[0];

                        that.aktualizujNahled(row);
                    }
                },
                */
                /*   
                    rowsClass: function (dataRow) {
                        if (dataRow && dataRow.data && dataRow.data.aktivita !== 100) {
                            return " ui-disabled data-deleted ";
                        } else return "  ";
                    },*/
                selection: function (ev, ctx) {
                    if (that.SelectionForPreviewController) {
                        var opt = {
                            ggrid: $(this)
                        };
                        that.SelectionForPreviewController(opt);
                    }
                },
                contextMenu: function (cellContext) {
                    return that.contextMenu;
                },
                multiMenu: this.multiMenu,
                multi: true,

                //     scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                searchColumns: ["ixp", "akt_znacka", "misto_vzniku", "nazev", "ixs_typ_txt", "dat_zmena", "dat_pod"], //sloupce, podle kterych se vyhledava v searchboxu
                columns: gridColumnsDefinition,
                defaultProfile: gridDefaultProfil,
                profiles: [gridDefaultProfil]
            });



            this.LoadData();
        },
        onBeforeGridSetData: function (DataView) {
            // uprava dataView před nasetovanim do gridu
            var that = this;

            // automaticke oznaceni digitalnich dokumentu na zaklade nastaveni v moznostch aplikace
            // požadavek PJurik - označovat ve všech subtasks
     //       if(that.model.SubTask === that.RedistribuceSubTask.PrehledKPrevzeti || that.model.SubTask === that.RedistribuceSubTask.KPrevzeti) {
                if(that.globalSettings.get("Global.Wfl.AppSettings.PrideleniPredaniSettings.OznacovatDigitalni") === true) {
                    DataView.getDataRows(true, "data").forEach(function (meta) { if (meta.data.s_fyz == 0) meta.checked = true; }); // stejna logika je v WflListBase
                }
     //       }
        },
        VyberRadkuClick: function (rowData) {
            var that = this;


        },
        NacistClick: function (filter) {
            $.extend(this.model, filter);
            var that = this;
            //this.findFields().gfield("model", "collect", this.model);

            var isValid = false;
            var flagPrehled = this.IsPrehled();
            var zaFunkci = this.model.TypRedistribucnihoSubjektuFilter == 2;
          //  var typRedistribucnihoSubjektu = this.model.TypRedistribucnihoSubjektuFilter;

            if(!flagPrehled) {
                if (zaFunkci) {
                    if(this.model.IxsFun !== null) {
                        isValid = true;
                    } else {
                        GDlg.warning("jres:26256708"); //RC 26256708 : Není vybráno funkční místo.
                    }
                } else {
                    if(this.model.IxsSu !== null) {
                        isValid = true;
                    }
                    // SU se validuje samo o sobe na urovni Dto
                }
            } else {
                isValid = true;
            }

            if(isValid) {

                this.call("GetUzivatelskeSloupce", { "model": this.model })
                    .done(function (data) {
                        that.UserColumnsVlastnosti = data;
                    })
                    .always(function () {
                        that.LoadGrid();

                        if(!flagPrehled) {
                            // povoleni akce predani/prevzeti
                            if (that.model.IxsFun !== null) {
                                var isPrevzeti = that.model.SubTask === that.RedistribuceSubTask.KPrevzeti;
                                that.actions.actPrevzit.enabled(isPrevzeti);
                                that.actions.actPredat.enabled(!isPrevzeti && that.usu_predanir === 1);
                            } else {
                                that.actions.actPrevzit.enabled(false);
                                that.actions.actPredat.enabled(false);
                            }
                        }
                    });

                //this.LoadGrid();

                //if(!flagPrehled) {
                //    // povoleni akce predani/prevzeti
                //    if(this.model.IxsFun !== null) {
                //        var isPrevzeti = this.model.SubTask === this.RedistribuceSubTask.KPrevzeti;
                //        this.actions.actPrevzit.enabled(isPrevzeti);
                //        this.actions.actPredatWfl.enabled(!isPrevzeti);
                //    } else {
                //        this.actions.actPrevzit.enabled(false);
                //        this.actions.actPredatWfl.enabled(false);
                //    }
                //}
            }
        },
        ClearFilters: function () {
            this.model.IxsSu = null;
            this.model.IxsFun = null;
            this.model.TypRedistribucnihoSubjektuFilter = 1;
            this.model.SelectedSubject = this.SelectedSubjectDefault;
        },
        PrehledKPrevzetiClick: function () {
            this.model.SubTask = this.RedistribuceSubTask.PrehledKPrevzeti;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_sredi04", // pozor, poradí subtasku se v prubehu zmenilo  lisi se od cislovani temat
                ["filterSubjekt", "filterRedistribuceVariant"],
                "FilterPanelPrehledKPrevzeti"
            )

            this.ClearFilters();
            this.PrepareSubtask();
        },
        PrehledKPredaniClick: function () {
            this.model.SubTask = this.RedistribuceSubTask.PrehledKPredani;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_sredi03", // pozor, poradí subtasku se v prubehu zmenilo  lisi se od cislovani temat
                ["filterSubjekt"],
                "FilterPanelPrehledKPredani"
            )

            this.ClearFilters();
            this.PrepareSubtask();
        },
        KPrevzetiClick: function () {
            var that = this;
            this.model.SubTask = this.RedistribuceSubTask.KPrevzeti;
            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_sredi02", // pozor, poradí subtasku se v prubehu zmenilo  lisi se od cislovani temat
                ["filterSubjekt", "filterRedistribucniSubjekt", "suField", "funField"],
                "FilterPanelKPrevzeti"
            )

            this.ClearFilters();

            if(this.GinRpPreSuPar == 0) {
                that.model.TypRedistribucnihoSubjektuFilter = 2;
            }

            // Předplnit spisový uzel a osobu, která přidělila dokumenty aktuálnímu uživateli
            if(that.globalSettings.get("Global.Wfl.AppSettings.PrideleniPredaniSettings.PredplnitSuFun") === true) {
                this.call("KdoPridelilInfo", { IxsSu: this.ZaIxsSu, IxsFun: this.ZaIxsFun })
                    .done(function (rv) {
                        if(rv !== null) {
                            if(rv.IxsFun != "") {
                                that.model.IxsSu = rv.IxsSu;
                                that.model.IxsFun = rv.IxsFun;
                                that.model.TypRedistribucnihoSubjektuFilter = 2;
                            }
                        }

                        that.PrepareSubtask();
                    });
            } else {
                this.PrepareSubtask();
            }
        },
        KPredaniClick: function () {
            this.model.SubTask = this.RedistribuceSubTask.KPredani;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_sredi01", // pozor, poradí subtasku se v prubehu zmenilo  lisi se od cislovani temat
                ["filterSubjekt", "filterRedistribucniSubjekt", "suField", "funField"],
                "FilterPanelKPredani"
            )

            this.ClearFilters();
            this.PrepareSubtask();
        },
        IsPrehled: function () {
            return this.model.SubTask == this.RedistribuceSubTask.PrehledKPredani || this.model.SubTask == this.RedistribuceSubTask.PrehledKPrevzeti;
        },
        RedistribuceSubTask: { 
            KPredani: 3,
            KPrevzeti: 2,
            PrehledKPredani: 1,
            PrehledKPrevzeti: 0,
        }

    }, { extendIntellisense: GContent });
})(jQuery);