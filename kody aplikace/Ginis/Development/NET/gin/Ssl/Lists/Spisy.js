(function ($) {
    "use strict";
    namespace("Gordic.Ssl.Lists.Spisy", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26257098"; //RC 26257099 : Spisy

            this.loadGridImmediately = this.SslCtiSezPar === 1;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_sspis01",
                ["dateIntervalRow", "filterPuvodDokumentu", "filterSubjekt"],
                "FilterPanelNevyrizene"
            )

            this.actions.addRange({
                noact: { run: $.noop },
                /*   act2: { icon: "fa-bookmark", run: $.noop },
                   act3: { icon: "fa-book", run: $.noop },*/
            });

            $("<div>").appendTo(this.element)
                .gsubtasks({
                    params: [
                        { caption: "jres:26256131", action: this.actions.actNevyrizene }, //RC 26256131 : Nevyřízené
                        { caption: "jres:26256135", action: this.actions.actVyrizene }, //RC 26256135 : Vyřízené
                        { caption: "jres:26256138", action: this.actions.actNeaktivni } //RC 26256138 : Neaktivní
                    ]
                });

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
                //    favoriteLayoutDescriptor: "L3M2S1",
                });

            this.PrepareSubtask();
        },
        CreateFilterForms: function () {
            var that = this;
            var dateFactors = null;

            if(this.model.SubTask == this.SpisySubTask.Nevyrizene) {
                dateFactors = [
                    { caption: "jres:26255459", factor: "DP" }, //RC 26255459 : Datum podání
                    { caption: "jres:26255404", factor: "DZ" } //RC 26255404 : Datum změny
                ];

                this.printRestrictionALF = "spi_nev";

            } else if(this.model.SubTask == this.SpisySubTask.Vyrizene) {
                dateFactors = [
                    { caption: "jres:26255660", factor: "DV" }, //RC 26255660 : Datum vyřízení
                    { caption: "jres:26255404", factor: "DZ" } //RC 26255404 : Datum změny
                ];

                this.printRestrictionALF = "spi_vyr";

            } else if(this.model.SubTask == this.SpisySubTask.Neaktivni) {
                dateFactors = [
                    { caption: "jres:26255404", factor: "DZ" } //RC 26255404 : Datum změny
                ];
            }

            var filterForm = new Gordic.Forms.Form({ name: "FormDocsList", tabLabel: "jres:26256764", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" })
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

            if(this.model.SubTask == this.SpisySubTask.Nevyrizene) {
                filterForm.addPrefab(Gordic.Ssl.Prefabs.FilterPuvodDokumentu({
                    name: "filterPuvodDokumentu",
                    model: "model.TypFiltruPuvod=value.id",
                    FiltrVlastniVisible: false,
                    FiltrDorucenyVisible: false,
                    initialValue: this.model.TypFiltruPuvod
                }));
            }

            filterForm.addSection(Gordic.Wfl.Prefabs.FilterSubjekt({
                name: "filterSubjekt",
                model: "model.SelectedSubject.Ixs=value.Ixs;model.SelectedSubject.Name=value.Name;model.SelectedSubject.TypeIxs=value.TypeIxs;model.SelectedSubject.SubjectStructOrg=value.SubjectStructOrg;model.SelectedSubject.pIxs=value.pIxs",
                initialValue: this.model.SelectedSubject,
                label: "jres:26255855"
            }, this)); //RC 26255855 : Vlastnictví

            if(this.model.SubTask == this.SpisySubTask.Neaktivni) {
                filterForm.addSection(Gordic.Ssl.Prefabs.FilterDleNeaktivnichStavu({
                    name: "filterNeaktivniStavyDoc",
                    model: "model.ZobrazitNeaktivniFilter=value.id",
                    label: "jres:26257002", //RC 26257002 : Zobrazit
                    FiltrPreruseneVisible: true,
                    FiltrPriorovaneVisible: true,
                    ginN23VeddPar: this.ginN23VeddPar,
                    initialValue: this.model.ZobrazitNeaktivniFilter
                })); //RC 26255267 : Zobrazit
            }
            return [filterForm];
        },
        LoadGrid: function () {
            var that = this;
            this.gridColumnsDefinition = new Gordic.Data.GridFormat();

            this.gridColumnsDefinition.addIconColumn(this.VysledekOperaceIcoColumn());

            this.gridColumnsDefinition
                .addIconColumn(Gordic.Wfl.Globals.ListSupport.TypEntityColumnDlg({}))
                .addIconColumn(Gordic.Wfl.Globals.ListSupport.TechnickeVlastnostiColumnDlg({}))
                .addIconColumn(Gordic.Wfl.Globals.ListSupport.StavZpracovaniColumnDlg({}))

            if(this.model.SubTask == this.SpisySubTask.Nevyrizene) {
                if(this.StavUkonuEpkVisible) {
                    this.gridColumnsDefinition.addTextColumn(Gordic.Wfl.Globals.ListSupport.StavUkonuEpkColumn());
                }
                
                this.gridColumnsDefinition
                    // .addIconColumn(Gordic.Wfl.Globals.ListSupport.TypDokumentuColumn())// stare ikony
                    // .addIconColumn(Gordic.Wfl.Globals.ListSupport.EleColumn())// stare ikony
                    // .addIconColumn(Gordic.Wfl.Globals.ListSupport.StavDokColumn())// stare ikony
                    .addIconColumn(Gordic.Wfl.Globals.ListSupport.TerminIcoColumnDlg({}))
                    .addIconColumn(Gordic.Wfl.Globals.ListSupport.TerminDilciIcoColumnDlg({}))
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
                        caption: this.SpZnackaShortText,
                        width: 150,
                        fixedWidth: false,
                        sortOrder: Gordic.Ssl.Utils.SortSpzn 
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
                    })
                    .addDateColumn({
                        name: "dat_pod",       
                        caption: "jres:26257385", //RC 26257385 : Datum založení
                    })
                    .addDateColumn({
                        name: "dat_pod_init",
                        caption: "jres:26257426", //RC 26257426 : Datum podání iniciačního dokumentu
                    })
                    .addDateTimeColumn({
                        name: "dat_zmena",
                        caption: "jres:26255404", //RC 26255404 : Datum změny
                    })
                    .addTextColumn({
                        name: "vlastnik",
                        caption: "jres:26255398", //RC 26255398 : Vlastník
                        width: 200,
                    })
                    .addDateColumn({
                        name: "dat_vyriz_do",
                        caption: "jres:26256993", //RC 26256993 : Termín
                    });

                if(this.SslTermPouz != 0) {
                    this.gridColumnsDefinition.addDateColumn({
                        name: "dat_dtermin",
                        caption: "jres:26257035", //RC 26257035 : Dílčí termín
                    });
                }

                if(this.gin_n23_vecsk == 0 || !this.TestMinDbVersionProVecneSkupiny) {
                    this.gridColumnsDefinition
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
                            name: "spis_pl",
                            caption: "jres:26256979", //RC 26256979 : Spis. plán
                        });
                }

                if(this.gin_n23_vecsk != 0 && this.TestMinDbVersionProVecneSkupiny == true) {
                    this.gridColumnsDefinition
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

                this.gridColumnsDefinition
                    .addDateColumn({
                        name: "dat_pr_moc",
                        caption: "jres:26257176", //RC 26257176 : Datum právní moci
                    })
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

            } else if(this.model.SubTask == this.SpisySubTask.Vyrizene) {
                this.gridColumnsDefinition
                    // .addIconColumn(Gordic.Wfl.Globals.ListSupport.TypDokumentuColumn())// stare ikony
                    // .addIconColumn(Gordic.Wfl.Globals.ListSupport.EleColumn())// stare ikony
                    .addIconColumn(Gordic.Wfl.Globals.ListSupport.PrizBalikColumn())
                    // .addIconColumn(Gordic.Wfl.Globals.ListSupport.StavDokColumn())// stare ikony
                    .addTextColumn({
                        name: "ixp",
                        caption: "jres:26255367", //RC 26255367 : PID
                        width: 120,
                        //   fixedWidth: true,
                    })
                    .addTextColumn({
                        name: "akt_znacka",
                        caption: this.SpZnackaShortText,
                        width: 150,
                        fixedWidth: false,
                        sortOrder: Gordic.Ssl.Utils.SortSpzn
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
                    })
                    .addTextColumn({
                        name: "nazev_resitel",
                        caption: "jres:26255517", //RC 26255517 : Zpracovatel
                        width: 250,
                    })
                    .addTextColumn({
                        name: "zp_vyriz_txt",
                        caption: "jres:26255431", //RC 26255431 : Způsob vyřízení
                        width: 250,
                    })
                    .addTextColumn({
                        name: "ixs_typ1",
                        caption: this.gin_n23_vecsk == 0 ? "jres:26255663" : "jres:26257358", //RC 26255663 : Typ inic. dokumentu RC 26257358 : Druh inic. dokumentu
                        width: 250,
                    })
                    .addTextColumn({
                        name: "vlastnik",
                        caption: "jres:26255398", //RC 26255398 : Vlastník
                        width: 200,
                    })
                    .addDateColumn({
                        name: "dat_pod",
                        caption: "jres:26257385", //RC 26257385 : Datum založení
                    })
                    .addDateColumn({
                        name: "dat_vyriz",
                        caption: "jres:26257142", //RC 26257142 : Datum vyřízení
                        width: 120,
                    })
                    .addDateColumn({
                        name: "dat_uzav",
                        caption: "jres:26257143", //RC 26257143 : Datum uzavření
                        width: 120,
                    });

                if (this.gin_n23_vecsk == 0 || !this.TestMinDbVersionProVecneSkupiny) {
                    this.gridColumnsDefinition
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
                            name: "spis_pl",
                            caption: "jres:26256979", //RC 26256979 : Spis. plán
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
                    this.gridColumnsDefinition
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
                        .addTextColumn({
                            name: "vsk_skar_znak",
                            caption: "jres:26257234", //RC 26257234 : Skar. znak
                            width: 30,
                        })
                        .addNumberColumn({
                            name: "vsk_skar_lhuta",
                            caption: "jres:26257235", //RC 26257235 : Skar. lhůta
                            width: 30,
                        })
                        .addTextColumn({
                            name: "uzav_spis_skar_rezim",
                            caption: "jres:26257361", //RC 26257361 : Skartační režim (Uzavřený spis)
                            width: 250,
                        });
                }

                this.gridColumnsDefinition
                    .addNumberColumn({
                        name: "rok_skartace",
                        caption: "jres:26257174", //RC 26257174 : Rok skartace
                        width: 60,
                    })
                    .addNumberColumn({
                        name: "rok_spo_uda",
                        caption: "jres:26257175", //RC 26257175 : Rok spouštěcí události
                        width: 60,
                    })
                    .addDateTimeColumn({
                        name: "dat_zmena",
                        caption: "jres:26255404", //RC 26255404 : Datum změny
                    })
                    .addDateColumn({
                        name: "dat_pr_moc",
                        caption: "jres:26257176", //RC 26257176 : Datum právní moci
                    })
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

            } else if (this.model.SubTask == this.SpisySubTask.Neaktivni) {
                //var l_bUseTypPisemnostiEnum = this.model.ZobrazitNeaktivniFilter === Gordic.Ssl.Globals.Enums.SeznamNeaktivnich.PRERUSENE || this.model.ZobrazitNeaktivniFilter === Gordic.Ssl.Globals.Enums.SeznamNeaktivnich.ODESLANE; // u techto seznamu jina logika na ikony

                this.NastavPrintRestrictionALFProNeaktivniFiltry(this.model.ZobrazitNeaktivniFilter);

                this.gridColumnsDefinition
                  // .addIconColumn(Gordic.Wfl.Globals.ListSupport.TypDokumentuColumn()) // stare ikony
                  // .addIconColumn(Gordic.Wfl.Globals.ListSupport.EleColumn()) // stare ikony
                   .addTextColumn({
                       name: "ixp",
                       caption: "jres:26255367", //RC 26255367 : PID
                       width: 120,
                     //  fixedWidth: true,
                   })
                   .addTextColumn({
                       name: "akt_znacka",
                       caption: this.SpZnackaShortText,
                       width: 150,
                       fixedWidth: false,
                       sortOrder: Gordic.Ssl.Utils.SortSpzn 
                   })
                   .addTextColumn({
                       name: "nazev",
                       caption: "jres:26255640", //RC 26255640 : Věc-obsah
                       width: 250,
                   });

                if(this.model.ZobrazitNeaktivniFilter == Gordic.Ssl.Globals.Enums.SeznamNeaktivnich.PRERUSENE) { // prerusene
                    this.gridColumnsDefinition
                        .addTextColumn({
                            name: "ixs_typ_txt",
                            caption: this.gin_n23_vecsk == 0 ? "jres:31937228" : "jres:26257355", //RC 31937228 : Typ dokumentu RC 26257355 : Druh dokumentu
                        })
                        .addTextColumn({
                            name: "prerusen_do_txt",
                            caption: "jres:26255759", //RC 26255759 : Přerušen do
                        })
                        .addTextColumn({
                            name: "duvod_preruseni",
                            caption: "jres:26255760", //RC 26255760 : Důvod přerušení
                        });
                } else if(this.model.ZobrazitNeaktivniFilter == Gordic.Ssl.Globals.Enums.SeznamNeaktivnich.PRIOROVANE) { // priorovane
                    this.gridColumnsDefinition
                        .addTextColumn({
                            name: "priorovan_do_cj",
                            caption: "jres:26255763", //RC 26255763 : Priorován do
                        })
                        .addTextColumn({
                            name: "nazev_resitel",
                            caption: "jres:26255517", //RC 26255517 : Zpracovatel
                        })
                        .addTextColumn({
                            name: "ixs_typ1",
                            caption: this.gin_n23_vecsk == 0 ? "jres:26255663" : "jres:26257358", //RC 26255663 : Typ inic. dokumentu RC 26257358 : Druh inic. dokumentu
                        })
                        .addTextColumn({
                            name: "vlastnik",
                            caption: "jres:26255398", //RC 26255398 : Vlastník
                        });
                } else { // ostatni neaktivni maji stejne sloupce
                    this.gridColumnsDefinition
                        .addTextColumn({
                            name: "ixs_typ_txt",
                            caption: this.gin_n23_vecsk == 0 ? "jres:31937228" : "jres:26257355", //RC 31937228 : Typ dokumentu RC 26257355 : Druh dokumentu
                        })
                        .addTextColumn({
                            name: "misto_vzniku",
                            caption: "jres:26255430", //RC 26255430 : Odesílatel
                        })
                        .addTextColumn({
                            name: "nazev_fun",
                            caption: "jres:26255767", //RC 26255767 : Poslední aktuální vlastník(funkce)
                        });
                }
            }

            this.AddUserColumnsToGridFormat(this.gridColumnsDefinition); // zvazit presun do funkce onGetGridData

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
                    return that.GetFullContextMenu();
                },
                multiMenu: this.multiMenu,
                multi: true,

                //     scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                searchColumns: ["ixp", "akt_znacka", "misto_vzniku", "nazev", "dat_zmena", "vlastnik", "dat_pod", "dat_vyriz_do", "spis_znak", "ixs_typ_txt", "uziv_sl_1", "uziv_sl_2", "uziv_sl_3", "uziv_sl_4"], //sloupce, podle kterych se vyhledava v searchboxu
                columns: this.gridColumnsDefinition,
            })
            //.ggridcelleditor({
            //        beforeStart: function (data, info) {
            //            const row = info.cellInfo.data;
            //            //let field = info.cellInfo.column.field;
            //            //let isCategoryColumnAndFavorite = (field == "data.Category" || field == "PageCount") && row.IsFavorite;
            //            //let lzeEditovat = ((row.Permissions & Gordic.Wfl.WebClient.Attachment.GAttachmentPermissionsEnum.Edit) === Gordic.Wfl.WebClient.Attachment.GAttachmentPermissionsEnum.Edit && !isCategoryColumnAndFavorite);

            //            //if (!lzeEditovat) {
            //            //    data.preventDefault();
            //            //}
            //        },
            //        start: function (data, info) {
            //            const row = info.cellInfo.data;
            //        },
            //        change: function (data, info) {
            //            //  beforeStop: function (data, info) {
            //            const row = info.cellInfo.data;
            //            //that._updateRow(row);
            //        },
            //        stop: function (data, info) {

            //        }
            //    })
            ;

            this.LoadData();
        },
        NevyrizeneClick: function () {
            this.model.SubTask = this.SpisySubTask.Nevyrizene;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_sspis01",
                ["dateIntervalRow", "filterPuvodDokumentu", "filterSubjekt"],
                "FilterPanelNevyrizene"
            )

            this.PrepareSubtask();
        },
        VyrizeneClick: function () {
            this.model.SubTask = this.SpisySubTask.Vyrizene;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_sspis02",
                ["dateIntervalRow", "filterSubjekt"],
                "FilterPanelVyrizene"
            )

            this.PrepareSubtask();
        },
        NeaktivniClick: function () {
            this.model.SubTask = this.SpisySubTask.Neaktivni;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_sspis03",
                ["dateIntervalRow", "filterSubjekt", "filterNeaktivniStavyDoc"],
                "FilterPanelNeaktivní"
            )

            this.PrepareSubtask();
        },

        //#region Menu

        CreateMenu: function () {
            this.ZaregistrujHromadneAkce();

            var actVytvoritSpisSPRVisible = false; //20210105-JSir-Dočasně vyřazeno než bude možné funkcionalitu využít - "GWASPR05GWARLS05".indexOf(this.PrgFaze) != -1; // akci VytvoritSpisSPRV povoluji pouze vyjmenovanym fazim
            
            var lokalniAkceBefore = [
                { action: "actDetailWfl", favorite: true },
                { action: "actOtevriDokumentDoNoveZalozkyVeStejneFazi", favorite: true },
                { type: "separator", id: "sep1" },
            ];

            if(actVytvoritSpisSPRVisible) {
                lokalniAkceBefore.push({ action: "actVytvoritSpisSPR", favorite: true }), // presuneme do spolecnych ???
                lokalniAkceBefore.push({ type: "separator", id: "sep2" });
            }

            var lokalniAkceAfter = [
                { type: "separator", id: "sep3" },
                { action: "actObcerstvitWfl" },
            ];
            var spolecneAkce = this.VratMenuHromadneAkce();
            var kompletniAkce = lokalniAkceBefore.concat(spolecneAkce).concat(lokalniAkceAfter);

            this.CreateMenuBar(kompletniAkce);

            // toto visible az po CreateMenuBar, protoze do te doby neni mezi actions
            this.actions.actVytvoritSpisSPR.visible(actVytvoritSpisSPRVisible);
        },

        getVisibleHromadneAkceDto: function () {
            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto();

            var visible = this.model.SubTask != this.SpisySubTask.Neaktivni;

            //tato sekce je specifická pro každá content. vybereš si které chceš a které ne
            // Defaultně jsou všechny true.

            defaultDto.PredatPrimo = visible;
            defaultDto.PridelitHromadne = visible;
            defaultDto.PrevzitHromadne = visible;
            defaultDto.PrevzitVRedistribuciHromadne = false;
            defaultDto.ZrusitPrideleniHromadne = visible;
            defaultDto.ZmenitPrideleniHromadne = visible;
            defaultDto.EvidovatRozsirenyProfilHromadne = visible;
            defaultDto.EvidovatHromadne = visible;
            defaultDto.OdeslatHromadne = visible;
            defaultDto.VyjmoutZeSpisuHromadne = visible;
            defaultDto.VlozitDoSpisuSslHromadne = visible;
            defaultDto.SouboryNearchivniFormat = visible;
            defaultDto.SouboryRozpoznaniFormatu = visible;
            defaultDto.OpravaMetadatSeznamNew = visible;
            defaultDto.OpravitMetadataPoKontroleSeznam = visible;
            defaultDto.ZmenitFormuHromadne = visible;
            defaultDto.ZtvarneniMetadatSpisuHromadne = visible;
            defaultDto.ZmenitDilciDokTerminHromadne = visible;
            defaultDto.ZmenitDoplnekZnackyHromadne = visible;
            defaultDto.ZmenitPocetUlozenoListu = this.model.SubTask == this.SpisySubTask.Vyrizene;
            defaultDto.ZmenitPocetListu = visible;
            defaultDto.ZmenitPocetPriloh = visible;
            defaultDto.ZmenitPocetListuPriloh = visible;
            defaultDto.ZmenitPoznamkuHromadne = visible;
            defaultDto.ZmenitUzivatelskouPoznamkuHromadne = visible;
            defaultDto.ZmenitPristupHromadne = visible;
            defaultDto.ZmenitSpisZnakHromadne = visible;
            defaultDto.ZmenitTerminSpisuHromadne = visible;
            defaultDto.ZmenitTypDokHromadne = visible;
            defaultDto.ZmenitVecHromadne = visible;
            defaultDto.ZmenitUmisteniHromadne = visible;
            defaultDto.ZmenitZpusobDoruceniHromadne = visible;
            defaultDto.ZmenitSchvalovateleHromadne = visible;
            defaultDto.ZmenitZpracovateleHromadne = visible;
            defaultDto.VlozitDokEpkHromadne = false;
            defaultDto.VlozitSpisEpkHromadne = visible;
            defaultDto.VyriditAdActaHromadne = visible;
            defaultDto.VyriditDokumentyHromadne = visible;
            defaultDto.VyriditDokumentyVeSpisuHromadne = visible;
            defaultDto.VyriditSpisyHromadne = visible;
            defaultDto.ZrusitVyrizeniDokumentuHromadne = visible;
            defaultDto.ZrusitVyrizeniSpisuHromadne = visible;
            defaultDto.ZrusitUzavreniSpisuHromadne = visible;
            defaultDto.PrerusitHromadne = visible;
            defaultDto.PriorovatHromadne = visible;
            defaultDto.PredatDokumentyExtAgHromadne = false;
            defaultDto.PredatSpisyExtAgHromadne = visible;
            defaultDto.PrevzitExtAgHromadne = visible;
            defaultDto.PridatKlSlovaHromadne = visible;
            defaultDto.OdebratKlSlovaHromadne = visible;
            defaultDto.VlozitDokumentSpisDoBaliku = visible;
            defaultDto.VyjmoutDokumentSpisZBaliku = visible;
            defaultDto.VytvoritBalikAVlozitSeznam = visible;
            defaultDto.PridatSpisyZDokumentuHromadne = false;
            defaultDto.PridatDokumentyVlozeneDoSpisuHromadne = false;
            defaultDto.PoznamkovyBlokPridatHromadne = visible;
            defaultDto.UzivatelskeSloupceVlastnosti = visible;
            defaultDto.OznacitJakoPrecteneHromadne = visible;
            defaultDto.OznacitJakoNeprecteneHromadne = visible;
            defaultDto.TiskListWfl = visible;
            defaultDto.TiskPevny = visible;
            defaultDto.TiskDetailuDokumentu = false;
            defaultDto.Obcerstvit = visible;

            // konec specifické sekce

            return defaultDto;
        },

        getEnableHromadneAkceDto: function () {
            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto();

            var vyrizeneView = this.model.SubTask == this.SpisySubTask.Vyrizene;

            // Defaultně jsou všechny true.

            defaultDto.EvidovatRozsirenyProfilHromadne = false;
            defaultDto.PredatPrimo = this.usu_predani === 1;
            defaultDto.PrevzitHromadne = false;
            defaultDto.PrevzitVRedistribuciHromadne = false;
            defaultDto.ZmenitPocetUlozenoListu = vyrizeneView && this.zmenitPocetUlozenoListuEnabled;
            defaultDto.ZmenitPocetListu = false;
            defaultDto.ZmenitPocetPriloh = false;
            defaultDto.ZmenitPocetListuPriloh = false;
            defaultDto.VyriditAdActaHromadne = false;
            defaultDto.VyriditDokumentyHromadne = false;
            defaultDto.VyriditDokumentyVeSpisuHromadne = false;
            defaultDto.VyriditSpisyHromadne = !vyrizeneView;
            defaultDto.ZrusitVyrizeniDokumentuHromadne = false;
            defaultDto.ZrusitVyrizeniSpisuHromadne = vyrizeneView;
            defaultDto.ZrusitUzavreniSpisuHromadne = vyrizeneView;
            defaultDto.ZmenitTerminSpisuHromadne = !vyrizeneView;
            defaultDto.PriorovatHromadne = !vyrizeneView;
            defaultDto.TiskDetailuDokumentu = false;

            return defaultDto;
        },

        getFavoriteHromadneAkceDto: function () {
            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto(false);

            // Defaultně jsou všechny true.

            defaultDto.PredatPrimo = true;
            defaultDto.PridelitHromadne = true;
            defaultDto.ZrusitPrideleniHromadne = true;
            defaultDto.VlozitSpisEpkHromadne = true;
            defaultDto.VlozitDoSpisuSslHromadne = true;

            return defaultDto;
        },

        //#endregion

        SpisySubTask: {
            Neurceno: 0,
            Nevyrizene: 1,
            Vyrizene: 2,
            Neaktivni: 3
        },
    }, { pure: true });
})(jQuery);