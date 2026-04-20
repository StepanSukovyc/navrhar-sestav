(function ($) {
    "use strict";
    namespace("Gordic.Ssl.Lists.TypoveSpisy", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26256961"; //RC 26256961 : Typové spisy, součásti, díly

            this.loadGridImmediately = this.SslCtiSezPar === 1;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_stspi01",
                ["dateIntervalRow", "filterTypSpisSoucastDil", "filterSubjekt"],
                "FilterPanel"
            )

            this.actions.addRange({
                noact: { run: $.noop },
             /*   act2: { icon: "fa-bookmark", run: $.noop },
                act3: { icon: "fa-book", run: $.noop },*/
            });

            this.menuBar(
                this.actions.createBar(["actDetailWfl*", "actOtevriDokumentDoNoveZalozkyVeStejneFazi*", "-", "actPoznamkovyBlokPridatSsl*", "-", "actUzivatelskeSloupceVlastnostiWfl", "-", "actObcerstvitWfl"]) //RC 26255317 : Další
            );

            this.contextMenu = [
                {
                    action: this.actions.actUzivatelskeSloupceVlastnostiWfl,
                },
                {
                    action: this.actions.actObcerstvitWfl,
                },
            ];

            // samotná definice gfilterpanelu
            this.filterForm = $("<div>")
                .appendTo(this.element)
                .on("gfilterpanelapply", function (event, obj) {         // eventa která je vyvolána při vyhledávání. obj.filter -> hledaný seznam podmínek
                    that.Reload(obj.filter);
                // 02.08.2022 - TFeik
                // Zrušení duplicitního vytváření filterpanelu.
                //}).gfilterpanel({
                //    forms: null, // poleFormu ktere budou pouzity pro podminky
                //    simpleMode: true,
                //    favoriteLayoutDescriptor: "L5M2S1",
                });

            this.PrepareSubtask();
        },
        CreateFilterForms: function( ) {
            var that = this;
            var dateFactors = null;

            if(this.model.ZobrazitTypoveSpisyFilter.length == 0) {
                this.model.ZobrazitTypoveSpisyFilter = [1]; // default hodnota - zaskrtni Typove spisy
            }

            dateFactors = [
                { caption: "jres:26255459", factor: "DP" }, //RC 26255459 : Datum podání
                { caption: "jres:26255404", factor: "DZ" } //RC 26255404 : Datum změny
            ];

            this.FilterFavoriteLayoutDescriptor = "L2M2S1";
            
            var filterForm = new Gordic.Forms.Form({ name: "FormDocsList", tabLabel: "jres:26256764", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" }) //RC 26256764 : Kompletní filtr
                    .addSection()
                        .addRow({ label: "jres:26256714", name: "dateIntervalRow" }) //RC 26256714 : Od-do
                            .addField("gdatecombobox", {
                                name: "dateIntervalField",
                                defaultInitialValue: this.model.DateInterval,
                                model: "model.DateInterval=value; model.DatumAplikovatNa=factor",
                                factors: dateFactors,
                                daysRangeMax: that.DaysRangeMax,
                                userSettings: that.userSettings,
                                contextMenu: {
                                  //  daysRange: that.predplneniPocetDni
                                },
                                change: function (ev, obj) {

                                }
                            });


            filterForm.addSection(Gordic.Ssl.Prefabs.FilterTypovychSpisuSoucastiDilu({ name: "filterTypSpisSoucastDil", model: "model.ZobrazitTypoveSpisyFilter=value.id", label: "jres:26255267", initialValue: this.model.ZobrazitTypoveSpisyFilter })); //RC 26255267 : Zobrazit

            filterForm.addSection(Gordic.Wfl.Prefabs.FilterSubjekt({
                name: "filterSubjekt",
                model: "model.SelectedSubject.Ixs=value.Ixs;model.SelectedSubject.Name=value.Name;model.SelectedSubject.TypeIxs=value.TypeIxs;model.SelectedSubject.SubjectStructOrg=value.SubjectStructOrg;model.SelectedSubject.pIxs=value.pIxs",
                label: "jres:26255855",
               // typSubjektuFilter: Gordic.Ssl.Globals.Enums.TypSubjektuFilter.JEN_FUN,
                initialValue: this.model.SelectedSubject
            }, this)); //RC 26255855 : Vlastnictví

            return [filterForm]; 
        },
        LoadGrid: function () {
            var that = this;
            var gridColumnsDefinition = new Gordic.Data.GridFormat();

            gridColumnsDefinition
                .addIconColumn(this.VysledekOperaceIcoColumn())
                .addIconColumn(Gordic.Wfl.Globals.ListSupport.TypEntityColumnDlg({}))
                .addIconColumn(Gordic.Wfl.Globals.ListSupport.TechnickeVlastnostiColumnDlg({}))
                .addIconColumn(Gordic.Wfl.Globals.ListSupport.StavZpracovaniColumnDlg({}))
                .addTextColumn(Gordic.Wfl.Globals.ListSupport.UzoColumn(
                    null,
                    function (row) {
                        if(that.ssl_uzooznacfun == 0) {
                            return row.ixs_su_akt != that.IxsSuAkt;
                        } 

                        return row.ixs_fun_akt != that.IxsFunAkt;
                    },
                    this.globalSettings
                ))
                .addTextColumn({
                    name: "ixp",
                    caption: "jres:26255367", //RC 26255367 : PID
                    width: 120,
                    //  fixedWidth: true,
                })
                .addTextColumn({
                    name: "akt_znacka",
                    caption: this.ZnackaText,
                    width: 150,
                    fixedWidth: false,
                    sortOrder: Gordic.Ssl.Utils.SortSpzn,
                })
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26257344", //RC 26257344 : Název - obsah
                    width: 250,
                })
                .addDateColumn({
                    name: "dat_pod",
                    caption: "jres:26257385", //RC 26257385 : Datum založení
                })
                .addTextColumn({
                    name: "vlastnik",
                    caption: "jres:26255398", //RC 26255398 : Vlastník
                    width: 200,
                })
                .addDateColumn({
                    name: "dat_vyriz_do",
                    caption: "jres:26256994", //RC 26256994 : Termín
                });

            if(this.gin_n23_vecsk == 0 || !this.TestMinDbVersionProVecneSkupiny) {
                gridColumnsDefinition
                    .addTextColumn({
                        name: "spis_znak",
                        caption: "jres:26255613", //RC 26255613 : Spis. znak
                        groupings: {
                            default: {
                                _presetCaption: "jres:26255613", //RC 26255613 : Spis. znak
                                grouping: {
                                    //hash: function (meta, rows) {
                                    //    var d = meta.data;
                                    //    return d.spis_znak;
                                    //  //  return d.nazev && d.nazev.length > 0 ? d.nazev.charAt(0).toUpperCase() : null;
                                    //},
                                    sort: "spis_znak,spis_pl,ixp",
                                    hideColumn: false
                                }
                            }
                        },
                        filter: [new Gordic.Wfl.Utils.GTextFilterFullTextStartsWithAndUseCommaForDot("spis_znak"), new Gordic.Data.Filters.GSelectionFilterVariant("spis_znak", { columnName: "spis_znak", columnType: "text" })]
                    })
                    .addTextColumn({
                        name: "skar_znak",
                        caption: "jres:26256976", //RC 26256976 : Skar. znak (dle spis. plánu, znaku)
                        width: 30,
                    })
                    .addNumberColumn({
                        name: "skar_lhuta",
                        caption: "jres:26256977", //RC 26256977 : Skar. lhůta (dle spis. plánu, znaku)
                        width: 30,
                    })
                    .addTextColumn({
                        name: "skar_znak2",
                        caption: "jres:26255614", //RC 26255614 : Skar. znak
                        width: 30,
                    })
                    .addNumberColumn({
                        name: "skar_lhuta2",
                        caption: "jres:26255615", //RC 26255615 : Skar. lhůta
                        width: 30,
                    });
            }

            if(this.gin_n23_vecsk != 0 && this.TestMinDbVersionProVecneSkupiny == true) {
                gridColumnsDefinition
                    .addTextColumn({
                        name: "vsk_nazev",
                        caption: "jres:26257222", //RC 26257222 : Věcná skupina - Název
                    })
                    .addTextColumn({
                        name: "vsk_spis_znak",
                        caption: "jres:26257223", //RC 26257223 : Věcná skupina - Spis. znak
                        tooltipTemplate: (value) => {
                            return value.vsk_spis_znak;
                        },
                    })
            }

            gridColumnsDefinition
                .addTextColumn({
                    name: "typ_spis_nazev",
                    caption: "jres:26257345", //RC 26257345 : Typový spis (název)
                    width: 150,
                });

            gridColumnsDefinition
                .addTextColumn({
                    name: "uziv_sl_1",
                    caption: this.UzivSlA,
                })
                .addTextColumn({
                    name: "uziv_sl_2",
                    caption: this.UzivSlB,
                })
                .addTextColumn({
                    name: "uziv_sl_3",
                    caption: this.UzivSlA2,
                })
                .addTextColumn({
                    name: "uziv_sl_4",
                    caption: this.UzivSlB2,
                })
                .addTextColumn({
                    name: "uziv_sl_5",
                    caption: this.UzivSlA3,
                })
                .addTextColumn({
                    name: "uziv_sl_6",
                    caption: this.UzivSlB3,
                });

            this.AddUserColumnsToGridFormat(gridColumnsDefinition); // zvazit presun do funkce onGetGridData

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
                        var retPromis = Gordic.Wfl.MainApp.ShowDetail(that, options);
                        if (retPromis) {
                            retPromis.done(function (cntDialogDiv) {
                                if (cntDialogDiv) {
                                    cntDialogDiv.on("closed", function (ev, dlgRet) {
                                        if (dlgRet && dlgRet.naDetailuDosloKeZmene) {
                                            //refresh řádku rowData.ixp
                                            that.Reload();
                                        }
                                    });
                                }
                            });
                        }
                    }
                }),
                /*
                selection: function (ev, selectionInfo) {
                    var activeRow = that.GetActiveRow();

                    that.aktualizujNahled(activeRow);
                },
                */
                selection: function (ev, ctx) {
                    if (that.SelectionForPreviewController) {
                        var opt = {
                            ggrid: $(this)
                        };
                        that.SelectionForPreviewController(opt);
                    }
                },
                rowsClass: function (dataRow) {
                    return that.GetRowClass(dataRow);
                },
                contextMenu: function (cellContext) {
                    return that.contextMenu;
                },
                multi: true,

                //     scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                searchColumns: ["ixp", "akt_znacka", "nazev", "dat_zmena", "vlastnik", "dat_pod", "dat_vyriz_do", "spis_znak", "ixs_typ_txt", "uziv_sl_1", "uziv_sl_2", "uziv_sl_3", "uziv_sl_4"], //sloupce, podle kterych se vyhledava v searchboxu
                columns: gridColumnsDefinition,
            });

            this.LoadData();
        },
        VyberRadkuClick: function (rowData) {
            var that = this;

      
        },

    }, { extendIntellisense: GContent });
})(jQuery);
