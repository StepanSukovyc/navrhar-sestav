(function ($) {
    "use strict";
    namespace("Gordic.Wfl.SUProHromadnePredani", {
        filterProcessor: null,
        dataView: null,
        dataViewKey: "ixs_su",
        printData: [],
        predaniRow: null,
        ixsFunPredat: null,
        komuPredatUserSettingsPrefix: "KomuPredat_",
        GroupResult: null,
        implicitneTisknoutPredProt: false,
        dotazTiskZvlast: false,
        dotazanoNaTisk: false,

        onContentReady: function () {
            var that = this;
            this.title = "jres:26227544"; //RC 26227544 : Spisové uzly pro hromadné předání

            this.implicitneTisknoutPredProt = this.globalSettings.getDef(Gordic.Wfl.AppSettings.ImplicitneTisknoutPredProtSettingsKey, false);

            var printPreProChecked = this.userSettings.get("PrintPreProChecked");
            var pouzeKPredaniChecked = this.userSettings.get("PouzeKPredaniChecked");
            var markNonZeroChecked = this.userSettings.get("MarkNonZeroChecked");

            if(printPreProChecked && this.implicitneTisknoutPredProt === true) {
                this.model.PrintPreProChecked = printPreProChecked;
            }
            if(pouzeKPredaniChecked) {
                this.model.PouzeKPredaniChecked = pouzeKPredaniChecked;
            }
            if(markNonZeroChecked) {
                this.model.MarkNonZeroChecked = markNonZeroChecked;
            }

            this.filterProcessor = new Gordic.Data.FilterProcessor(function (value) {
                var data = value.data;
                var pocet = data.pocet;

                if(that.model.PouzeKPredaniChecked === true) {
                    if(pocet == null) {
                        return true;
                    } else if(pocet > 0) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            });

            this.actions.addRange({
                actPredat: {
                    icon: "gi-predat",
                    caption: "jres:26227545", //RC 26227545 : Předat
                    tooltip: "jres:26227545", //RC 26227545 : Předat
                    enabled: false,
                    run: function (ev, ctx) {
                        that.Predat();
                    }
                },
                actZmenitKomuPredat: {
                    icon: "gi-user",
                    caption: "jres:26227546", //RC 26227546 : Změnit komu předat
                    enabled: false,
                    run: function (ev, ctx) {
                        that.ZmenitKomuPredat();
                    }
                },
                actPredavaciProtokol: {
                    icon: "gi-copy",
                    caption: "jres:26227547", //RC 26227547 : Předávací protokol
                    enabled: false,
                 //   enabled: that.GinSslPduplPar !== 0,
                    run: function (ev, ctx) {
                        that.TiskPredavacihoProtokolu();
                    }
                },
                //actPrilohyTest: {
                //    icon: "gi-user",
                //    caption: "Prilohy", //RC 26227546 : Změnit komu předat
                //    run: function (ev, ctx) {
                //        that.PrilohyTest();
                //    }
                //},
                actCancel: {
                    icon: undefined,
                    caption: "jres:26227555", //RC 26227555 : Zavřít
                    run: function (ev, ctx) {
                        that.close();
                    }
                },
            });

            this.menuBar([
                { action: this.actions.actPredat, favorite: true },
                { action: this.actions.actZmenitKomuPredat, favorite: true },
                { action: this.actions.actPredavaciProtokol, favorite: true },

              //  { action: this.actions.actPrilohyTest, favorite: true },
            ]);

            var form = new Gordic.Forms
                .Form({ name: "FormSU", layoutDescriptor: "L2M2S2" })
                .addSection()
                .addRow("jres:26227548").addField("gselectbox", "w-4", //RC 26227548 : Přebírající
                    Gordic.Gin.Fields.ginspodSSU(
                        {
                            name: "suField",
                            model: "IxsSu = ixs_su",
                            serverFilters: {
                                aktivita: [100],
                            },
                            change: function (ev, data) {
                              //  _this.SpisUzelChange(data.value);
                            }
                        }, true)
                )
                .addField("gselectbox", "w-8",
                    Gordic.Gin.Fields.ginsfunSSU(
                        {
                            name: "funField",
                            model: "IxsFun = ixs_fun",
                            serverFilters: {
                                aktivita: [100],
                                VazbaNaSpisovyDenik: this.SslPripreomezPar == 1,
                                ixs_su: new Gordic.Forms.Dependency("suField", "ixs_su", false)
                            },
                            change: function (ev, data) {
                                var rowsCount = that.dataView.getCount();
                                var actEnabled = data.value != null && rowsCount > 0 && that.usu_predanir === 1;

                                that.actions.actPredat.enabled(actEnabled);
                                that.actions.actZmenitKomuPredat.enabled(actEnabled);
                                that.actions.actPredavaciProtokol.enabled(actEnabled);
                             },
                            validators: [
                                {
                                    "message": "jres:26227470", //RC 26227470 : Zadejte funkční místo.
                                    "validate": function (value, changeObj) {

                                        //if (_this.Ucel == Gordic.Wfl.Globals.Enums.UcelRedistribuce.PREDANI && value == null) {
                                        //    return false;
                                        //}

                                        return true;
                                    },
                                    "group": "customValidation"
                                }
                            ],
                        }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.BEZNE, "suField"))

            form.addField("gcheck", {
                name: 'printPreProCheck',
                label: "jres:26227556", //RC 26227556 : Před předáním vytisknout předávací protokol
                initialValue: this.model.PrintPreProChecked,
                model: "PrintPreProChecked",
                change: function (ev, data) {
                    that.userSettings.set("PrintPreProChecked", data.value);
                }
            })

            form.addField("gcheck", {
                name: 'pouzeKPredaniCheck',
                label: "jres:26227549", //RC 26227549 : Zobrazit pouze spis. uzly s dokumenty k předání
                initialValue: this.model.PouzeKPredaniChecked,
                model: "PouzeKPredaniChecked",
                change: function (ev, data) {
                    that.userSettings.set("PouzeKPredaniChecked", data.value);
                    that.Reload();
                }
            })

            form.addField("gcheck", {
                name: 'markNonZeroCheck',
                label: "jres:26227557", //RC 26227557 : Automaticky označit řádky s nenulovými počty
                initialValue: this.model.MarkNonZeroChecked,
                model: "MarkNonZeroChecked",
                change: function (ev, data) {
                    that.userSettings.set("MarkNonZeroChecked", data.value);

                    if(data.value === true) {
                        var checkedRows = that.gridSU.ggrid("getView").getDataRows(true, "data");

                        checkedRows = checkedRows.filter(function (meta) {
                            var data = meta.data;
                            if(data.pocet > 0) {
                                meta.checked = true;
                                return true;
                            }
                            return false;
                        });

                        that.gridSU.ggrid("refreshRows");
                    }
                }
            })

            form.addSection();

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

           // this.findFields().gfield("model", "apply", this.model);

            if(this.implicitneTisknoutPredProt !== true) { // pokud nema uzivatel povoleny tisky protokolu, zakazu checkbox
                this.findFields("printPreProCheck").gfield("option", { disabled: true });
            }
          
            this.LoadGrid();
        },
        LoadGrid: function () {
            var that = this;

            var gridColumnsDefinition = new Gordic.Data.GridFormat()
                .addIconColumn({
                    name: "ico_status",
                    caption: "jres:26226691", //RC 26226691 : Výsledek operace
                    width: 30,
                    customClass: "center",
                    fixedWidth: true,
                    iconTemplate: function (row) {
                        var icon = undefined;

                        if(that.GroupResult != null) {
                            var obj = that.GroupResult.find(function (obj) { return obj.Key === row.ixs_su; });

                            if(obj != null) {
                                if (obj.IsError === true) {
                                    icon = { icon: Gordic.Gin.Icons.StavEnum.neprovedeno, tooltip: obj.Error };
                                } else {
                                    icon = { icon: Gordic.Gin.Icons.StavEnum.provedeno };
                                }
                            }
                        }

                        return icon;
                    }
                })
                .addNumberColumn({
                    name: "pocet",
                    caption: "jres:26227550", //RC 26227550 : Počet
                    width: 40,
                })
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26227551", //RC 26227551 : Spisový uzel
                    width: 200,
                    fixedWidth: true,
                })
                .addTextColumn({
                    name: "ofic_nazev",
                    caption: "jres:26227552", //RC 26227552 : Spisový uzel oficiálně
                    width: 200,
                })
                .addTextColumn({
                    name: "nazev_predat",
                    caption: "jres:26227553", //RC 26227553 : Předat osobně
                    width: 250,
                })
                .addTextColumn({
                    name: "nazev_rf",
                    caption: "jres:26227554", //RC 26227554 : Zodpovědná osoba
                    width: 250,
                });


            this.gridSU = $("<div>").appendTo(this.element)
                .gautofit()
                .ggrid({
                    name: "GridSU",
                    //    data: that.ViewTabulkaSubjektu,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "full",  // fit (defaultne by melo byt toto), full
                    customClass: "js-gridKartoteka",
                    navigationMode: "row", // row, cell
                    //defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                    //    name: "gridRowSelectedAct",
                    //    run: function (ev, ctx) {
                    //        var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                    //        var options = {
                    //            ixp: rowData.ixp_kop,
                    //            grid: that.gridKopie
                    //        };
                    //        Gordic.Ssl.MainApp.ShowDetail(that, options);
                    //    }
                    //}),
                    selection: function (ev, selectionInfo) {
                        if(that.gridSU != null) {
                            var dataRow = that.gridSU.ggrid("activeRow");

                            // if(selectionInfo.count === 1) { // tady je multi, takze to musim delat jinak...
                            if(dataRow != null) {
                                // var dataRow = selectionInfo.getSelection()[0];
                                that.model.IxsSu = dataRow.ixs_su;

                                if(dataRow.ixs_fun_predat != that.NulakIxsFunZodpovedneOsoby) {
                                    that.model.IxsFun = dataRow.ixs_fun_predat;
                                } else {
                                    that.model.IxsFun = null;
                                }

                                that.findFields("suField, funField").gfield("model", "apply", that.model);
                            }
                        }
                    },
                    multi: true,
                    rowsClass: function (dataRow) {
                        return that.GetRowClass(dataRow);
                    },
                    //     scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                    searchColumns: ["pocet", "nazev", "ofic_nazev", "nazev_predat", "nazev_rf"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: gridColumnsDefinition,
                });

            this.LoadData();
        },
        LoadData: function () {
            var that = this;

            this.findFields().gfield("model", "collect", this.model);

            //nacteni dat do gridu
            this.call("GetSeznamSU", { model: this.model })
                .done(function (data) {
                    var view = new Gordic.Data.View(data, {
                        key: that.dataViewKey,
                        startEmpty: false,
                        processors: {
                            filter: that.filterProcessor
                        }
                    });  //key je dulezity kvuli pripadnemu vyhledavani radku

                    if (that.model.MarkNonZeroChecked) {
                        view.getDataRows(true, "data").forEach(function (meta) { if ((meta.data).pocet > 0) meta.checked = true; });
                    }

                    that.dataView = view;

                    that.NactiZmenyZUserSettings(); // toto nepřesouvat, spoléhá to na nastaveni that.dataView

                    that.gridSU.ggrid("setData", view, true);           //true = prekresleni gridu
                });
        },
        Reload: function () {
            this.LoadData();
        },
        GetRowClass: function (dataRow) {
            var cssClass = "  ";
            if(dataRow && dataRow.data && !this.model.PouzeKPredaniChecked && dataRow.data.pocet > 0) {
                cssClass += " grid-wfl-redi-marked-bold ";
            }

            if(dataRow && dataRow.data && dataRow.data.ixs_fun !== dataRow.data.ixs_fun_predat) {
                cssClass += " grid-wfl-redi-marked-blue ";
            }

            return cssClass;
        },
        NactiZmenyZUserSettings: function () {
            var that = this;
            var listUS = [];

            var data = this.dataView.getRows(false, 0, this.dataView.getCount());

            data.forEach(function (row) {
                var ixsFun = that.userSettings.get(that.komuPredatUserSettingsPrefix + row.ixs_su);

                if(ixsFun && ixsFun != "") {
                    listUS.push({ "IxsSu": row.ixs_su, "IxsFun": ixsFun });
                } else {
                    that.userSettings.set(that.komuPredatUserSettingsPrefix + row.ixs_su, "");
                }
            });

            if(listUS.length > 0) {
                that.call("UpdateRow2", { rows: listUS })
                    .done(function (updatedRows) {
                        updatedRows.forEach(function (updatedRow) {
                            var aktivita = updatedRow.Aktivita;

                            if(aktivita === 100) {
                                var dataViewItem = that.dataView.findByKey(updatedRow.IxsSu);

                                if(dataViewItem.ixs_fun_predat) { // pozor, když nenajde nevrátí null, ale jen dto s klíčem, proto testuji existenci sloupce (v tom případě se vrátil celý row)
                                    dataViewItem.ixs_fun_predat = updatedRow.IxsFunPredat;
                                    dataViewItem.ixs_ref_predat = updatedRow.IxsRefPredat;
                                    dataViewItem.nazev_predat = updatedRow.NazevPredat;

                                    that.dataView.updateData(dataViewItem, "update");
                                }
                            } else {
                                that.userSettings.set(that.komuPredatUserSettingsPrefix + updatedRow.IxsSu, "");
                            }
                        });
                    });
            }
        },
        ZmenitKomuPredat: function () {
            var that = this;
            this.findFields().gfield("model", "collect", this.model);

            this.GroupResult = [];

            if(this.model.IxsFun && this.model.IxsFun != "") {
                var selection = this.gridSU.ggrid("getSelection");

                if(selection.length > 0) {
                    selection.forEach(function (row) {
                        //ixpArray.push(entry.ixp);

                        if(row.ixs_su == that.model.IxsSu) {
                            that.call("UpdateRow", { model: that.model, row: row })
                                .done(function (updatedRow) {
                                    that.dataView.updateData(updatedRow, "update");

                                    var gr = that.CreateGroupResult("", false, row.ixs_su, 0);
                                    that.GroupResult.push(gr);

                                    that.userSettings.set(that.komuPredatUserSettingsPrefix + updatedRow.ixs_su, that.model.IxsFun);
                                });


                        } else {
                            var gr = that.CreateGroupResult("jres:26227574", true, row.ixs_su, 0); //RC 26227574 : Nesouhlasí spisové uzly.
                            that.GroupResult.push(gr);
                        }
                    });
                }

                this.gridSU.ggrid("refreshRows");
            } else {
                this.dialogs.error("jres:26227559"); //RC 26227559 : Zadejte pole Přebírající
            }
        },

        TiskPredavacihoProtokolu: function () {
            var that = this;
            this.HromadneVytisknouPredProt(false);
        },
        CreateGroupResult: function (error, isError, key, rowState) {
        //CreateGroupResult: function (Error: string, IsError: boolean, Key: string, RowState: number }) {
            return { Error: error, IsError: isError, Key: key, RowState: rowState }
        },
        HromadneVytisknouPredProt: function (poAkci) {
            var that = this;
            this.findFields().gfield("model", "collect", this.model);

            this.GroupResult = [];
            this.printData = [];

          //  if(this.model.IxsFun && this.model.IxsFun != "") {
                var selection = this.gridSU.ggrid("getSelection");

                if(selection.length > 0) {
                    //selection.forEach(function (row) {
                    //    if(row.ixs_fun_predat == null || row.ixs_fun_predat == "" || row.ixs_fun_predat == that.NulakIxsFunZodpovedneOsoby) {
                    //        // TODO pridat do resultu chybu "jres:26227572" //RC 26227572 : Není vyplněna funkce přebírajícího
                    //    }
                    //});

                    var selectionView = new Gordic.Data.View(selection, { key: this.dataViewKey }); // <SeznamSUProPredaniDto>
                    var selectionRows = selectionView.getDataRows(true, "data");
                    selectionRows = selectionRows.filter(function (row) {
                        var rowData = row.data;
                        if(rowData.ixs_fun_predat == null || rowData.ixs_fun_predat == "" || rowData.ixs_fun_predat == that.NulakIxsFunZodpovedneOsoby) {
                            // TODO pridat do resultu chybu 
                            var gr = that.CreateGroupResult("jres:26227573", true, rowData.ixs_su, 0); //RC 26227573 : Není vyplněna funkce přebírajícího
                            that.GroupResult.push(gr);
                            return false;
                        }
                        return true;
                    });

                    this.printData = selectionRows;

                    this.PrintRow();
                }
            //} else {
            //    this.dialogs.error("jres:26227559"); //RC 26227559 : Zadejte pole Přebírající
            //}
        },
        PrintRow: function () {
            var that = this;

            if(this.printData.length > 0) { // tisknu, dokud je co
                var printRow = this.printData.shift();
                this.ixsFunPredat = printRow.data.ixs_fun_predat;// ulozim pro pouziti v TiskProtokoluReportRetreive 

                that.CallPrint(this.SUHromPrePrintProtokolTask.BezPredani, printRow.data);
            } else {
                // konec tisku - zde odstranit cover, pokud ho budu zobrazovat
                this.gridSU.ggrid("refreshRows");
                this.GroupResult = null;
            }
        },


        Predat: function () {
            var that = this;
            this.findFields().gfield("model", "collect", this.model);

            this.GroupResult = [];
            this.printData = [];

            this.dotazTiskZvlast = false;

            var selection = this.gridSU.ggrid("getSelection");

            if(selection.length > 0) {
                if(selection.length > 1 && this.model.PrintPreProChecked !== true) {
                    var dotaz = "jres:26227580"; //RC 26227580 : Dotaz
                    this.dialogs.confirm(dotaz, "jres:26227579").on("closed", function (ev, retVal) { //RC 26227579 : Dotazovat se jednotlivě na tisk předávacího protokolu?
                        if(retVal) {
                            that.dotazTiskZvlast = retVal === "yes";
                        }

                        that.PredatInternal(selection);
                    });
                } else {
                    that.PredatInternal(selection);
                }
            }
        },
        PredatInternal: function (selection) {
            var that = this;
            var selectionView = new Gordic.Data.View(selection, { key: this.dataViewKey }); // <SeznamSUProPredaniDto>
            var selectionRows = selectionView.getDataRows(true, "data");
            selectionRows = selectionRows.filter(function (row) {
                var rowData = row.data;
                if (rowData.ixs_fun_predat == null || rowData.ixs_fun_predat == "" || rowData.ixs_fun_predat == that.NulakIxsFunZodpovedneOsoby) {
                    // TODO pridat do resultu chybu 
                    var gr = that.CreateGroupResult("jres:26227573", true, rowData.ixs_su, 0); //RC 26227573 : Není vyplněna funkce přebírajícího
                    that.GroupResult.push(gr);
                    return false;
                }
                return true;
            });

            this.printData = selectionRows;

            this.PredatRow();
        },
        PredatRow: function () {
            var that = this;

            if(this.printData.length > 0) { // tisknu, dokud je co
                this.predaniRow = this.printData.shift();
                this.ixsFunPredat = this.predaniRow.data.ixs_fun_predat;// ulozim pro pouziti v TiskProtokoluReportRetreive 

                if(this.model.PrintPreProChecked) {
                    this.CallPrint(this.SUHromPrePrintProtokolTask.PredPredanim, this.predaniRow.data);
                } else {
                    this.HromadnePredat(this.model, this.predaniRow.data);
                }
            } else {
                // konec tisku - zde odstranit cover, pokud ho budu zobrazovat
                this.gridSU.ggrid("refreshRows"); 
                this.GroupResult = null;
            }
        },
        PredatRowAfterPrint: function () {
            var that = this;

            this.HromadnePredat(this.model, this.predaniRow.data);
        },
        HromadnePredat: function (data, row) {
            var that = this;

            this.call("HromadnePredat", { model: that.model, row: row })
                .done(function (rv) {
                    var gr = that.CreateGroupResult("", false, row.ixs_su, 0);
                    that.GroupResult.push(gr);

                    var tiskloSePredPredanim = that.model.PrintPreProChecked;

                    if(rv === true && !tiskloSePredPredanim) {
                        if(that.implicitneTisknoutPredProt === true) {
                            if(!that.dotazanoNaTisk || that.dotazTiskZvlast) {
                                var dotaz = "jres:26227582"; //RC 26227582 : Dotaz
                                that.dialogs.confirm(dotaz, "jres:26227581").on("closed", function (ev, retVal) { //RC 26227581 : Přejete si vytisknout předávací protokol?
                                    that.dotazanoNaTisk = true;

                                    if(retVal === "yes") {
                                        that.CallPrint(that.SUHromPrePrintProtokolTask.PoPredani, that.predaniRow.data);
                                    } else {
                                        that.PredatRow();
                                    }
                                });
                            } else {
                                that.CallPrint(that.SUHromPrePrintProtokolTask.PoPredani, that.predaniRow.data);
                            }
                        } else {
                            that.PredatRow();
                        }
                    } else {
                        that.PredatRow();
                    }
                })
                .fail(function (err) {
                    //if(err && err.responseText != null) {
                    //    err = err.responseText;
                    //}
                    var gr = that.CreateGroupResult(err, true, row.ixs_su, 0);
                    that.GroupResult.push(gr);
                }).always(function () {

                });
        },
        CallPrint: function (printProtokolTask, row, printDataPrepared) {
            var that = this;

            var act = that.actions.actTiskPredavaciProtokol;

            if(printProtokolTask === that.SUHromPrePrintProtokolTask.BezPredani) {
                /*act.reportFinished = act.reportCancelled =*/ act.dialogClosed = function (event, repInfo) { return $.content(this).PrintRow(); }
            } else if (printProtokolTask === that.SUHromPrePrintProtokolTask.PredPredanim) {
                /*act.reportFinished = act.reportCancelled =*/ act.dialogClosed = function (event, repInfo) { return $.content(this).PredatRowAfterPrint(); }
            } else if (printProtokolTask === that.SUHromPrePrintProtokolTask.PoPredani) {
                /*act.reportFinished = act.reportCancelled =*/ act.dialogClosed = function (event, repInfo) { return $.content(this).PredatRow(); }
            }

            var printDataPrepared = printProtokolTask === that.SUHromPrePrintProtokolTask.PoPredani;

            if(printDataPrepared) {
                act.run(); // jen pokud je po predani a data jsou pripravena v tmp
            } else {
                this.call("PreparePrintData", { model: this.model, row: row })
                    .done(function (rv) {
                        var gr = that.CreateGroupResult("", false, row.ixs_su, 0);
                        that.GroupResult.push(gr);

                        if (rv === true) {
                            act.run();
                        } else {
                            that.HromadnePredat(rv.data, printRow.data);
                        }
                    })
                    .fail(function (err) {
                        var gr = that.CreateGroupResult(err, true, rowData.ixs_su, 0);
                        that.GroupResult.push(gr);
                    }).always(function () {

                    });
            }
        },
        TiskProtokoluReportRetreive: function (rep) {
            rep.params.X0000 = this.LogPorCislo;
            rep.params.X0001 = this.IxsFunAkt;
            rep.params.X0002 = this.ixsFunPredat;

            rep.params.Preselect = false;
        }, 

        //PrilohyTest: function () {
        //    var that = this;

        //    Gordic.Wfl.Dialogs.GPrilohyDlg(this.cnt, { Ixp: "DEMOX001LX4B", PublishingMode: true }, Gordic.Gin.Globals.Enums.ModOtevreni.showModalWindow)
        //        .then(function(rv) {
        //            console.log(rv);
        //        })
        //        .fail(function(err) {

        //        })
        //}, 

        SUHromPrePrintProtokolTask: {
            BezPredani: 0,
            PredPredanim: 1,
            PoPredani: 2,
        }
    }, { pure: true });
})(jQuery);