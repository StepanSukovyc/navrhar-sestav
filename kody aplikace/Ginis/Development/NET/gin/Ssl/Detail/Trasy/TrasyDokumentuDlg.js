(function ($) {
    "use strict";
    namespace("Gordic.Ssl.TRAD", {

        onContentReady: function () {
            var that = this;

            var form = new Gordic.Forms
                 .Form({ name: "FormTRAD", layoutDescriptor: "L1M1S1, L-12-0-0, M-12-0-0, S-12-0-0, breaks-500-1000" })
                   .addSection()
                       .addRow(this.VlastnikLabel)
                   .addSection();
               

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            this.LoadGrid();
        },
        LoadGrid: function () {
            var that = this;

            var gridColumnsDefinition = new Gordic.Data.GridFormat()
                .addIconColumn({
                    name: "priz_real", caption: "",
                    customClass: "center cursor_help",
                    width: 30,
                    fixedWidth: true,
                    iconTemplate: function (row) {
                        if (row.priz_real !== 0) {
                            return { icon: "gi-tick", tooltip: "jres:26256322" }; //RC 26256322 : Tento krok trasy je odsouhlasen.
                        } else {
                            return null;
                        }
                    }
                })
            /*    .addHtmlColumn({
                    name: "priz_pov",
                    caption: "jres:26255475", //RC 26255475 : Pov.
                    //   tooltip: "jres:26256286", //RC 26256286 : Povinnost
                    width: 25,
                    fixedWidth: true,
                    customClass: "center",
                    cellTemplate: function (row) {
                        var checked = row.priz_pov === 1 ? "checked" : "";
                        return $("<input name='TRADVyberRadkuPovKrok' type='checkbox' value='' " + checked + " disabled >");
                    }
                })
                .addHtmlColumn({
                    name: "priz_pov_porad",
                    caption: "jres:26256288", //RC 26256288 : Pov. poř.
                    width: 25,
                    fixedWidth: true,
                    customClass: "center",
                    cellTemplate: function (row) {
                        var checked = row.priz_pov_porad === 1 ? "checked" : "";
                        return $("<input name='TRADVyberRadkuPovPor' type='checkbox' value='' " + checked + " disabled >");
                    }
                })
                .addHtmlColumn({
                    name: "priz_edit",
                    caption: "jres:26256305", //RC 26256305 : Edit.
                    width: 25,
                    fixedWidth: true,
                    customClass: "center",
                    cellTemplate: function (row) {
                        var checked = row.priz_edit === 1 ? "checked" : "";
                        return $("<input name='TRADVyberRadkuEdit' type='checkbox' value='' " + checked + " disabled >");
                    }
                }) */
                .addIconColumn({
                    name: "priz_pov",
                  //  caption: "jres:26255475", //RC 26255475 : Pov.
                    caption: "jres:26256286", //RC 26256286 : Povinnost
                 //   description: "jres:26256286", //RC 26256286 : Povinnost
                    width: 30,
                    //customClass: "center",
                    //fixedWidth: true,
                    iconTemplate: function (row) {
                        if (row.priz_pov_porad === 1) {
                            return { icon: "fa-check-square-o" };
                        } else {
                            return { icon: "fa-square-o" };
                        }
                    }
                })
                .addIconColumn({
                    name: "priz_pov_porad",
                   // caption: "jres:26256288", //RC 26256288 : Pov. poř.
                    caption: "jres:26256287", //RC 26256287 : Povinnost pořadí
                  //  description: "jres:26256287", //RC 26256287 : Povinnost pořadí
                    width: 30,
                    //customClass: "center",
                    //fixedWidth: true,
                    iconTemplate: function (row) {
                        if (row.priz_pov_porad === 1) {
                            return { icon: "fa-check-square-o" };
                        } else {
                            return { icon: "fa-square-o" };
                        }
                    }
                })
                .addIconColumn({
                    name: "priz_edit",
                  //  caption: "jres:26256305", //RC 26256305 : Edit.
                    caption: "jres:26256304", //RC 26256304 : Editovatelnost
                 //   description: "jres:26256304", //RC 26256304 : Editovatelnost
                    width: 30,
                    //customClass: "center",
                    //fixedWidth: true,
                    iconTemplate: function (row) {
                        if (row.priz_edit === 1) {
                            return { icon: "fa-check-square-o" };
                        } else {
                            return { icon: "fa-square-o" };
                        }
                    }
                })
                .addTextColumn({
                    name: "ixp",
                    caption: "Identifikátor",
                    width: 110,
                 //   fixedWidth: true,
          //          customClass: "ui-disabled"
                })
                .addNumberColumn({
                    name: "poradi",
                    caption: "jres:26255472", //RC 26255472 : Pořadí
                    width: 40,
                })
                .addTextColumn({
                    name: "nazev_fun_ref",
                    caption: "jres:26255474", //RC 26255474 : Referent, funkce
                    width: 300,
                })
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26255451", //RC 26255451 : Název
                    width: 250,
                })
                .addTextColumn({
                    name: "nazev_trasy",
                    caption: "jres:26255477", //RC 26255477 : Název trasy
                    width: 250,
                })
                .addTextColumn({
                    name: "poznamka",
                    caption: "jres:26255397", //RC 26255397 : Poznámka
                    width: 250,
                })
                .addDateColumn({
                    name: "dat_termin",
                    caption: "jres:26255478" //RC 26255478 : Termín
                })
                .addDateColumn({
                    name: "dat_zadani",
                    caption: "jres:26255479" //RC 26255479 : Datum zadání
                })
                .addDateColumn({
                    name: "dat_realizace",
                    caption: "jres:26255480" //RC 26255480 : Datum realizace
                })
                .addDateColumn({
                    name: "dat_zmena",
                    caption: "jres:26255404" //RC 26255404 : Datum změny
                })
                .addTextColumn({
                    name: "nazev_zmenu_prov",
                    caption: "jres:26255429", //RC 26255429 : Změnu provedl
                    width: 200,
                });


            that.gridTrasy = $("<div>").appendTo(this.element)
                .css("height", "calc(100% - " + this.defaultForm.height() + "px)")
             //   .height(400)
                .ggrid({
                    name: "GridTrasy",
                    //    data: that.ViewTabulkaSubjektu,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "full",  // fit (defaultne by melo byt toto), full
                    customClass: "js-gridKartoteka",
                    navigationMode: "row", // row, cell
                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            if(that.SelectRowEnabled) {
                                var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                                that.CloseWithSelectedRow(rowData);
                            }
                        }
                    }),
                    selection: function (ev, selectionInfo) {
                        if(selectionInfo.count === 1) { // u single modu vzdy 1 ale pro jistotu testuji
                            var rowData = that.gridTrasy.ggrid("getSelection");
                            that.VyberRadkuClick(rowData[0]);
                        }
                    },
                    rowsClass: function (dataRow) {
                        if (dataRow && dataRow.data && dataRow.data.aktivita !== 100) {
                            //return " ui-disabled data-deleted ";
                            return "g-state-text g-state-inactive";
                        } else return "  ";
                    },
                    // multi: true,

                    //     scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                    searchColumns: ["ixp", "poradi", "nazev_fun_ref", "nazev", "nazev_trasy", "poznamka", "dat_termin", "dat_zadani", "dat_realizace", "dat_zmena", "nazev_zmenu_prov"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: gridColumnsDefinition,
                });

            //sluzba pro pristup k datum ze serveru //{className:"", params: {}

            this.LoadData();

        },
        LoadData: function () {
            var that = this;

            //nacteni dat do gridu
            // this.srv.call("GetSeznamTras", { typPohledu: 0, ixsMas: "" })
            this.call("GetSeznamTras", { typPohledu: 0, ixsMas: "" })
                .done(function (data) {
                    var view = new Gordic.Data.View(data, { key: "ixp" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                    that.gridTrasy.ggrid("setData", view, true);           //true = prekresleni gridu
            });
        },
        Reload: function () {
            this.LoadData();
        },
        NovaTrasa: function () {
            var that = this;
            var options = {
                Ixp: this.Ixp,
            };
            Gordic.Ssl.Dialogs.NovaTrasaDlg(this, options).on("closed", function (ev, retVal) {
                if(retVal) {
                    that.Reload();
                }
            });
        },
        NovyKrok: function () {
            var that = this;
            var options = {
                Ixp: this.Ixp
            };
            Gordic.Ssl.Dialogs.NovyKrokDlg(this, options).on("closed", function (ev, retVal) {
                if(retVal) {
                    that.Reload();
                }
            });
        },
        Editace: function () {
            var that = this;

            var l_sSelectedRows = this.gridTrasy.ggrid("getSelection", true);

            if(l_sSelectedRows.length === 1) {
                var rowData = l_sSelectedRows[0].data;

                var options = {
                    Ixp: rowData.ixp,
                    PorCislo: rowData.por_cislo
                };
                Gordic.Ssl.Dialogs.NovyKrokDlg(that, options).on("closed", function (ev, retVal) {
                    if(retVal) {
                        that.Reload();
                    }
                });
            } else {
                GDlg.alert("jres:26256687"); //RC 26256687 : Vyberte řádek.
            }
        },
        ZmenitAktivituTrasy: function () {
            var that = this;
            var l_sSelectedRows = this.gridTrasy.ggrid("getSelection", true);

            if(l_sSelectedRows.length === 1) {
                var rowData = l_sSelectedRows[0].data;

                var l_oJSONPars = { "Ixp": rowData.ixp, "PorCislo": rowData.por_cislo, "Aktivita": rowData.aktivita };

                this.call(["ZmenitAktivitu", l_oJSONPars]).done(
                    function (data, content) {
                        that.Reload();
                    }
                );
            } else {
                GDlg.alert("jres:26256687"); //RC 26256687 : Vyberte řádek.
            }
        },
        Odstranit: function () {
            var that = this;
            var l_sSelectedRows = this.gridTrasy.ggrid("getSelection", true);

            if(l_sSelectedRows.length === 1) {
                GDlg.confirm("jres:26256688", this.OdstranitRequestText).on("closed", function (ev, retVal) { //RC 26256688 : Varování
                    if(retVal) {
                        if(retVal === "yes") {
                            var rowData = l_sSelectedRows[0].data;

                            var l_oJSONPars = { "Ixp": rowData.ixp, "PorCislo": rowData.por_cislo, "Aktivita": rowData.aktivita };

                            that.call(["Odstranit", l_oJSONPars]).done(
                                function(data, content) {
                                    that.Reload();
                                }
                            );
                        }
                    }
                });
            } else {
                GDlg.alert("jres:26256687"); //RC 26256687 : Vyberte řádek.
            }
        },
        ZmenitVyrizeniTrasy: function () {
            var that = this;
            var l_sSelectedRows = this.gridTrasy.ggrid("getSelection", true);

            if(l_sSelectedRows.length === 1) {
                var rowData = l_sSelectedRows[0].data;
                var l_sIxsFunKrokuTrasy = rowData.ixs_fun;

                // tato kontrola by zde jiz nemusela byt. Plnohodnotna kontrola se dela pri kliku oznaceni radku, ale pro jistotu zatim ponechavam
                if(l_sIxsFunKrokuTrasy == this.IxsFunUsr) { // opravneni ma pouze stejna funkce
                    var rowData = l_sSelectedRows[0].data;

                    var l_oJSONPars = { "Ixp": rowData.ixp, "PorCislo": rowData.por_cislo, "PrizVyriz": rowData.priz_real };

                    that.call(["ZmenitVyrizeni", l_oJSONPars]).done(
                        function (data, content) {
                            that.Reload();
                        }
                    );
                } else {
                    GDlg.alert(this.OpravneniOdsouhlasitErrText);
                }
            } else {
                GDlg.alert("jres:26256687"); //RC 26256687 : Vyberte řádek.
            }
        },
        VyberRadkuClick: function (rowData) {
            var that = this;

            // akce Editovat, Aktivita a Odstranit
            var l_bNeniVyrizenRadek = rowData.priz_real == 0;

            var l_bActivityButtonEnabled = rowData.priz_edit !== 0 && l_bNeniVyrizenRadek;
            var l_bEditaceButtonEnabled = rowData.priz_edit !== 0 && this.LzeTrasuEditovat && l_bNeniVyrizenRadek; // v negaci l_bNeniVyrizenRadek je podle me chyba
            var l_bRemoveButtonEnabled = rowData.priz_real === 0 && ((rowData.priz_edit !== 0 && this.LzeTrasuOdstranit) || (rowData.priz_edit === 0 && this.LzeTrasuOdstranit && this.IsSameFun(null, rowData.ixs_fun_vytvoril)));

            this.actions.actAktivita.enabled(l_bActivityButtonEnabled);
            this.actions.actEditace.enabled(l_bEditaceButtonEnabled);
            this.actions.actOdstranit.enabled(l_bRemoveButtonEnabled);

            // akce Vyrizeni
            if(this.WflTrasyrvyrPar == 1 && !this.FlagPredani) {
                var l_nPorCislo = rowData.por_cislo;
                var l_sIxsFunKroku = rowData.ixs_fun;
                var l_nPoradi = rowData.poradi;
                var l_bIsSouhlas = false;

                if(rowData.priz_real === 1) {
                    this.actions.actSouhlasim.caption = this.RusimSouhlasButtonText;
                    l_bIsSouhlas = false;
                } else {
                    this.actions.actSouhlasim.caption = this.SouhlasimButtonText;

                    l_bIsSouhlas = true;
                }

                if(l_sIxsFunKroku === null) {
                    l_sIxsFunKroku = "";
                }

                var l_oJSONPars = { "IsSouhlas": l_bIsSouhlas, "PorCislo": l_nPorCislo, "IxsFunKroku": l_sIxsFunKroku, "Poradi": l_nPoradi };

                that.call(["TrasyCanAllowSouhlas", l_oJSONPars]).done(
                    function (retVal, content) {
                        if(retVal === true) {
                            that.actions.actSouhlasim.enabled(true);
                        } else {
                            that.actions.actSouhlasim.enabled(false);
                        }
                    }
                );
            }
        },
        IsSameFun: function (ixsSu, ixsFun) {
            if(ixsFun == null) { //ixsFun neni zadany kontroluji aspon proti SU
                if(ixsSu != null && ixsSu == this.IxsSuUsr) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if(ixsFun != null && ixsFun == this.IxsFunUsr) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        CloseWithSelectedRow: function (rowData) {

            this.retValue = { ixsSu: rowData.ixs_su, nazevSu: rowData.nazev_su, ixsFun: rowData.ixs_fun, nazevFun: rowData.nazev_fun, ixsRef: rowData.ixs_ref, nazevRef: rowData.nazev_ref };
            this.tryClose();
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