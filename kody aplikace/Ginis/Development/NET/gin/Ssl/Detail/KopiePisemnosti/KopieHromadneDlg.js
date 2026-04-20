(function ($) {
    "use strict";
    namespace("Gordic.Ssl.KopieHromadneDlg", {
        subjektyList: null,
        newSubjektyList: null,
        selection: null,
      //  noveKopieArray: [],

        onContentReady: function () {
            var that = this;
            this.title = "jres:26255530"; //RC 26255530 : Vytvoření kopií dokumentů s předáním/přidělením

            this.actions.addRange({
                // Aktuální oprávnění k entitě
                actSkupiny: {
                    icon: "fa-group", 
                    caption: "jres:26255124", //RC 26255124 : Skupiny
                    tooltip: "jres:26256781", //RC 26256781 : Skupiny interních subjektů
                    run: function (ev, ctx) {
                        that.SkupinyInternichSubjektu();
                    }
                },
                actOdebrat: {
                    icon: "fa-remove",
                    caption: "jres:26255282", //RC 26255282 : Odebrat
                    tooltip: "jres:26256782", //RC 26256782 : Odebrat subjekt
                    run: function (ev, ctx) {
                        that.OdebratInterniSubjekt();
                    }
                },
                actVytezitRozdelovnik: {
                    icon: "fa-share",
                    caption: "jres:26257028", //RC 26257028 : Vytěžit rozdělovník
                    // enabled: that.PredatKopieEnabled,
                    run: function (ev, ctx) {
                        that.VytezitRozdelovnik();
                    }
                },
                actPridelit: {
                    icon: "fa-share",
                    caption: "jres:26255259", //RC 26255259 : Přidělit
                    run: function (ev, ctx) {
                        that.Pridelit();
                    }
                },
                actPredat: {
                    icon: "fa-share",
                    caption: "jres:26255157", //RC 26255157 : Předat
                    enabled: that.PredatKopieEnabled,
                    run: function (ev, ctx) {
                        that.Predat();
                    }
                },
                actCancel: {
                    icon: undefined,
                    caption: "jres:26256543", //RC 26256543 : Zavří­t
                    run: function (ev, ctx) {
                        that.tryClose();
                    }
                },
            });

            this.menuBar([
                { action: this.actions.actSkupiny, favorite: true },
                { action: this.actions.actOdebrat, favorite: true },
                { action: this.actions.actVytezitRozdelovnik, favorite: true },
                { action: this.actions.actPridelit, favorite: true },
                { action: this.actions.actPredat, favorite: true }
             ]);

            this.commandBar([
                { action: this.actions.actCancel },
            ]);

            var form = new Gordic.Forms
                .Form({ name: "FormKOPIE", layoutDescriptor: "L2M2S2" })
                .addSection()
                .addRow()
                .addField("gcheck", "w-12", {
                    name: 'copyElObrazCheck',
                    label: "jres:26256030", //RC 26256030 : Kopírovat el. obraz
                    model: "KopirovatElObrazChecked",
                })
                .addField("gcheck", {
                    name: 'copyElPrilohyCheck',
                    label: "jres:26256482", //RC 26256482 : Kopírovat el. přílohy
                    model: "KopirovatElPrilohyChecked",
                });

            if(this.PridelitPrimoVisible) {
                form
                    .addRow()
                    .addField("gcheck", {
                        name: 'pridelitPrimoCheck',
                        label: "jres:26256029", //RC 26256029 : Přidělit přímo
                        model: "PridelitPrimoChecked",
                    });
            }

            if(this.CjVisible) {
                form
                    .addRow()
                    .addField("gcheck", {
                        name: 'cjCheck',
                        label: "jres:26256485", //RC 26256485 : Vytvořit ČJ
                        model: "CjChecked",
                        //enabled: that.CjEnabled,
                    });
            }

            form.addSection()
                .addRow()
                .addField("gcheck", {
                    name: 'konvertovatCheck',
                    label: "jres:26257023", //RC 26257023 : Konvertovat po vytěžení rozdělovníku
                    model: "KonvertovatChecked",
                    disabled: this.model.KonvertovatDisabled,
                    change: function (ev, data) {
                        //var elObrazCheckbox = that.findFields("copyElObrazCheck");

                        //if(elObrazCheckbox) {
                        //    if(data.value === true) {
                        //        elObrazCheckbox.gfield("setValue", true);
                        //        elObrazCheckbox.gfield("option", "disabled", true);
                        //    } else {
                        //        elObrazCheckbox.gfield("setValue", that.model.KopirovatElObrazChecked);
                        //        elObrazCheckbox.gfield("option", "disabled", false);
                        //    }
                        //}
                    }
                })
                .addRow("jres:26257030") //RC 26257030 : Důvod
                    .addField("gstringbox", {
                        name: "duvodField",
                        model: "Duvod"
                    });
            
            form.addSection();

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

            if(this.CjVisible && this.CjEnabled !== true) {
                this.findFields("cjCheck").gfield("option", { disabled: true });
            }

            if (!this.model.KopirovatElObrazEnabled) {
                this.findFields("copyElObrazCheck").gfield("option", { disabled: true });
            }

            this.LoadGrid();
        },
        LoadGrid: function () {
            var that = this;

            var gridColumnsDefinition = new Gordic.Data.GridFormat()

                .addIconColumn({
                    name: "ix", caption: "",
                    customClass: "center cursor_help",
                    width: 30,
                    fixedWidth: true,
                    iconTemplate: function (row) {
                        return { icon: "fa-user" };
                    }
                })
                .addTextColumn({
                    name: "nazev_su",
                    caption: "jres:26255436", //RC 26255436 : Spisový uzel
                    width: 200,
                })
                .addTextColumn({
                    name: "nazev_fun",
                    caption: "jres:26255437", //RC 26255437 : Funkce
                    width: 400,
                });

            this.gridKopie = $("<div>").appendTo(this.element)
                .css("height", "calc(100% - " + this.defaultForm.height() + "px)")
                .ggrid({
                    name: "GridKopie",
                    rowsChecked: "checked",
                    //    data: that.ViewTabulkaSubjektu,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "full",  // fit (defaultne by melo byt toto), full
                    customClass: "js-gridKartoteka",
                    navigationMode: "row", // row, cell
                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                           /* var options = {
                                ixp: rowData.ixp_kop,
                                grid: that.gridKopie
                            };
                            Gordic.Wfl.MainApp.ShowDetail(that, options);*/
                        }
                    }),
                    /*selection: function (ev, selectionInfo) {
                        if (selectionInfo.count === 1) { // u single modu vzdy 1 ale pro jistotu testuji
                            var rowData = that.gridTrasy.ggrid("getSelection");
                            that.VyberRadkuClick(rowData[0]);
                        }
                    },*/
                    multi: true,
                    searchColumns: ["nazev_su", "nazev_fun"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: gridColumnsDefinition,
                });

            this.LoadData();
        },
        LoadData: function () {
            var that = this;

            //nacteni dat do gridu
            this.call("GetSeznamSubjektu", { isuRows: this.subjektyList, newIsuRows: this.newSubjektyList, model: this.model })
                .done(function (data) {
                    that.subjektyList = that.Table;
                    that.newSubjektyList = null;

                    var view = new Gordic.Data.View(that.subjektyList, { key: "ixs" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                    that.gridKopie.ggrid("setData", view, true);           //true = prekresleni gridu
                });
        },
        Reload: function () {
            this.LoadData();
        },

        SkupinyInternichSubjektu: function () {
            var that = this;

            Gordic.Gin.Dialogs.RozdelovnikISUDlg(this, { SkupinyWorkingMode: Gordic.Gin.Dialogs.ISUSkupinyWorkingMode.Select }).on("close", function (ev, retVal) {
                if(retVal) {
                    that.newSubjektyList = retVal.subjekty;

                    that.Reload();
                } else {
                    that.newSubjektyList = null;
                }
            });
        },
        OdebratInterniSubjekt: function () {
            var that = this;

            var selection = this.gridKopie.ggrid("getSelection");

            if(selection.length > 0) {
                selection.forEach(function (entry) {
                    that.subjektyList.splice($.inArray(entry, that.subjektyList), 1);

                  /*  var index = that.subjektyList.indexOf(entry);
                    if (index >= 0) {
                        that.subjektyList.splice(index, 1);
                    
                    }*/
                });

                if(this.subjektyList.length == 0) {
                    this.subjektyList = null;
                }

                that.Reload();
            } else {
                GDlg.alert("jres:26255114"); //RC 26255114 : Není vybrán žádný řádek.
            }
        },
        GetGridSelection: function () {
            //var selection = this.gridKopie.ggrid("getSelection");
            this.selection = this.gridKopie.ggrid("getSelection", false, true); // druhy parametr true ovlivnuje, ze se mi do selection nedostane nezaskrtnuty radek (Tomasuv automatismus na alespon jedne vybrany radek bez obhledu na data v rowsChecked)
        },
        Pridelit: function () {
            this.model.FlagPridelit = true;

            this.GetGridSelection();

            if(this.selection.length > 0) {
                this.PridelitPredatKopie();
            } else {
                GDlg.alert("jres:26255114"); //RC 26255114 : Není vybrán žádný řádek.
            } 
        },
        Predat: function () {
            var that = this;
            this.model.FlagPridelit = false;
          //  this.noveKopieArray = [];

            this.GetGridSelection();

            if(this.selection.length > 0) {
                var actEnabled = true;

                // kontrola predani na funkcni misto. U jinych subjektu odeberu oznaceni a zakazu zpracovani na serveru
                this.selection.forEach(function (entry) {
                    if (entry.ix != "SF") {
                        var index = that.subjektyList.indexOf(entry);
                        that.subjektyList[index].checked = false;
                      //  that.subjektyList[index].nazev_fun = "aaaaaaaaaaaaaaaaa";//

                        actEnabled = false;
                    }
                });

                if(actEnabled) {
                    this.PridelitPredatKopie();
                } else {
                    this.gridKopie.ggrid("refreshRows");
                    this.showFlash("jres:26256785", "g-state-error", 5000); //RC 26256785 : Předat lze pouze na funkční místo. Označení řádků u jiných subjektů bylo odebráno. Opakujte akci.
                }
                
            } else {
                GDlg.alert("jres:26255114"); //RC 26255114 : Není vybrán žádný řádek.
            } 
        },
        PridelitPredatKopie: function() {
            var that = this;
            this.findFields().gfield("model", "collect", this.model);
            this.GetGridSelection();

            if(this.selection.length > 0) {
                that.MakeCopyPoDotazu(this.PridelitCJ && this.model.CjChecked);

                // nově už nezobrazuji dotaz viz. T25594

                //if(this.PridelitCJ) {
                //    if(this.SslKopCjPridPar == 0) { // ne
                //        this.MakeCopyPoDotazu(false);
                //    } else if (this.SslKopCjPridPar == 1) {//vzdy
                //        this.MakeCopyPoDotazu(true);
                //    } else if (this.SslKopCjPridPar == 2 || this.SslKopCjPridPar == 3) {// dotaz
                //        var l_sQuestion = "jres:26255129"; //RC 26255129 : Přejete si u kopie vytvořit ČJ?

                //        GDlg.confirm("jres:26256676", l_sQuestion).on("close", function (ev, retVal) { //RC 26256676 : Dotaz
                //            if (retVal) {
                //                if (retVal === "yes") {
                //                    that.MakeCopyPoDotazu(true);
                //                } else {
                //                    that.MakeCopyPoDotazu(false);
                //                }
                //            }
                //        });
                //    }
                //} else {
                //    that.MakeCopyPoDotazu(false);
                //}
            }
        },
        MakeCopyPoDotazu: function (flagCjMake) {
            var that = this;

            this.model.FlagMakeCj = flagCjMake;

            if(flagCjMake && this.ShowVyberDeniku) {
                this.ShowWinVyberDeniku();
            } else {
                this.MakeKopie(flagCjMake);
            }
        },
        ShowWinVyberDeniku: function () {
            var that = this;

            Gordic.Ssl.Dialogs.VyberDenikuDlg(this, {}, 'showWindow').on("close", function (ev, retVal) {
                if(retVal) {
                    that.model.DenikCj.Denik = retVal.denik;
                    that.model.DenikCj.Poradi = retVal.poradi;
                    that.model.DenikCj.Rok = retVal.rok;
                    that.MakeKopie();
                }
            });
        },
        MakeKopie: function (FPridPred) {
            var that = this;

            if(this.GenerovatIxp) { // pokud se ma generovat, automaticky vygeneruji pid
                Gordic.Wfl.Utils.GenerateIxp(that).done(function (rv) {
                    that.MakeCopyServer(rv.Ixp);
                });
            } else {
                var options = {
                    TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                    TypId: Gordic.Wfl.Globals.Enums.TypId.Ixp
                };
                Gordic.Wfl.Dialogs.GenerovaniIxp(this, options, 'showWindow').done(function (rv, content) {
                    if(rv) {
                        if(rv.IxpExist === false) {
                            that.MakeCopyServer(rv.Ixp);
                        } else {
                            // ixp uz existuje - sem se to nesmi dostat, ale obcas se to sem dostane pri pouzivani ctecky a duvod neznam
                            //window.alert("chyba: ixp uz existuje");//
                        }
                    }
                });
            }
        },
        MakeCopyServer: function (ixp) {
            var that = this;

            if(ixp != "") {
                //var l_bPridelitPrimoChecked = true;

                if(this.model.DenikCj.Denik == null) {
                    this.model.DenikCj.Denik = this.DefaultDenik;
                }

                //ulozim nastaveni checkboxu
                this.globalSettings.set("Global.Wfl.KopieHromadne.KonvertovatChecked", this.model.KonvertovatChecked);
                this.globalSettings.set("Global.Wfl.KopieHromadne.KopirovatElObrazChecked", this.model.KopirovatElObrazChecked);
                this.globalSettings.set("Global.Wfl.KopieHromadne.KopirovatElPrilohyChecked", this.model.KopirovatElPrilohyChecked);

                if(this.PridelitPrimoVisible) { // ukladam, jen kdyz neni policko schovane a napevno prednastavene (schovane je v pripade, ze se nepouziva prideleni pres podatelnu)
                    this.globalSettings.set("Global.Wfl.KopieHromadne.PridelitPrimoChecked", this.model.PridelitPrimoChecked);
                }

                var row = that.selection[0];
                this.model.IxpNew = ixp;
                this.model.Row = { "ix": row.ix, "ixs": row.ixs, "ixs_su": row.ixs_su, "ixs_ssu": row.ixs_ssu };

                this.call("MakeCopyWithRedistribuce", { model: this.model })
                    .done(function (data) {
                        // odeberu zpracovany radek
                        that.subjektyList.splice($.inArray(row, that.subjektyList), 1);

                        if(that.subjektyList.length == 0) {
                            that.retValue = true;
                            that.tryClose();
                        } else {
                            // reloadnu grid
                            var view = new Gordic.Data.View(that.subjektyList, { key: "ixs" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                            that.gridKopie.ggrid("setData", view, true);
                            // a nasledne zpracuji dalsi radek
                            that.PridelitPredatKopie();
                        }
                    });
            }
        },
        VytezitRozdelovnik: function () {
            var that = this;
            var rows = this.gridKopie.ggrid("getView").getDataRows(false);

            if(rows != null && rows.length > 0) {
                this.findFields().gfield("model", "collect", this.model);

                that.call("VytezitRozdelovnik", { model: that.model })
                    .done(function (data) {
                        var favoriteRow = data;

                       // otevreni s moznosti podpisu
                        Gordic.Wfl.AttachmentUtils.OpenAttachment(that, favoriteRow, true, false, false).done(function (args) {
                            // console.log("doc.downloadCompleted", this, args);
                        });
                    });
            } else {
                GDlg.alert("jres:26257029"); //RC 26257029 : Není vybráno z rozdělovníku.
            }
        },

        closing: function () {
            var def = $.Deferred();

            if (this.retValue) {
                def.resolve(this.retValue);
            } else {
                def.resolve();
            }

            return def.promise();
        },
    }, { pure: true });
})(jQuery);