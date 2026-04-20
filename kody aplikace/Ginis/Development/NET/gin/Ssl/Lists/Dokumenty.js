(function ($) {
    "use strict";
    namespace("Gordic.Ssl.Lists.Dokumenty", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26256698"; //RC 26256698 : Dokumenty

            this.loadGridImmediately = this.SslCtiSezPar === 1;
            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_sdoku01",
                ["dateIntervalRow", "filterSubjekt", "filterPuvodDokumentu", "filterStavDoc"],
                "FilterPanelNevyrizene"
            )
            var wflDBParams = Gordic.Wfl.WebClient.GetGWflDBParams();
            var podaniCiziEnabled = wflDBParams && wflDBParams.gin_rad_konao === 1 && wflDBParams.usu_pod_cizi === 1;

            this.actions.addRange({
                noact: { run: $.noop },
                actPodaniVlastni: {
                    name: "actPodaniVlastni",
                    icon: "gi-doc_vlastni gi-stack-bg|fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
                    caption: "jres:26256986", //RC 26256986 : Vlastní dokument
                    enabled: (wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false,
                    run: function (ev, ctx) {
                        Gordic.Ssl.MainApp.NovyVlastniDokument(that);
                    }
                },
                actPodaniCizi: {
                    name: "actPodaniCizi",
                    icon: "gi-doc_ciz gi-stack-bg|fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
                    caption: "jres:26256987", //RC 26256987 : Doručený dokument
                    enabled: podaniCiziEnabled,
                    run: function (ev, ctx) {
                        Gordic.Ssl.MainApp.NovyCiziDokument(that);
                    }
                },
                actNovyFormular: {
                    name: "actNovyFormular",
                    icon: "gi-index gi-stack-bg|fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
                    caption: "jres:26256988", //RC 26256988 : Formulář
                    visible: this.AkcePodaniFormularEnabled,
                    enabled: (wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false,
                    run: function (ev, ctx) {
                        Gordic.Ssl.Utils.novyFormularCiDuplikat(that, false);
                    }
                },
                actVytvoritDuplikatZeSablony: {
                    name: "actVytvoritDuplikatZeSablony",
                    icon: "gi-copy gi-stack-bg|fa-plus g-state-text g-state-info gi-stack-fw gi-stack-pos--rb gi-bgw",
                    caption: "jres:26256989", //RC 26256989 : Duplikát ze šablony
                    visible: this.AkcePodaniFormularEnabled,
                    enabled: (wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false,
                    run: function (ev, ctx) {
                        Gordic.Ssl.Utils.novyFormularCiDuplikat(that, true);
                    }
                },
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
                //    favoriteLayoutDescriptor: "L5M2S1",
                });

            this.PrepareSubtask();
        },
        CreateFilterForms: function( ) {
            var that = this;
            var dateFactors = null;
            var filtrCjVisible = !this.IsStaraMetodikaSsl;
            var filtrIDokumentyVeSpisech = false; // jen stará metodika!!!
            var filtrDokumentyMimoSpis = !this.IsStaraMetodikaSsl; // jen nová metodika!!!
            var filtrDokumentyVeSpisu = !this.IsStaraMetodikaSsl; // jen nová metodika!!!
            var filtrVcetneOdeslanychVisible = false;
            var filtrElektronickeVisible = false;
            var filtrZnackaVisible = false;
 
            if(this.model.TypFiltruPuvod.length == 0) {
                this.model.TypFiltruPuvod = [0, 1]; // default hodnota - zaskrtni vlastni i dorucene
            }

            if (this.model.SubTask == this.DokumentySubTask.Nevyrizene) {
                dateFactors = [
                    { caption: "jres:26255459", factor: "DP" }, //RC 26255459 : Datum podání
                    { caption: "jres:26255404", factor: "DZ" } //RC 26255404 : Datum změny
                ];

                this.printRestrictionALF = "dok_nev";

                filtrIDokumentyVeSpisech = this.IsStaraMetodikaSsl;
                filtrElektronickeVisible = true;
                filtrZnackaVisible = false;

            } else if (this.model.SubTask == this.DokumentySubTask.Vyrizene) {
                dateFactors = [
                    { caption: "jres:26255660", factor: "DV" }, //RC 26255660 : Datum vyřízení
                    { caption: "jres:26255404", factor: "DZ" } //RC 26255404 : Datum změny
                ];

                this.printRestrictionALF = "dok_vyr";

                filtrVcetneOdeslanychVisible = true;
            } else if (this.model.SubTask == this.DokumentySubTask.Neaktivni) {
                dateFactors = [
                    { caption: "jres:26255404", factor: "DZ" } //RC 26255404 : Datum změny
                ];

                filtrDokumentyMimoSpis = false;
                filtrDokumentyVeSpisu = false;
            }
             
            this.FilterFavoriteLayoutDescriptor = "L2M2S1";
            
            var filterForm = new Gordic.Forms.Form({ name: "FormDocsList", tabLabel: "jres:26256764", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" }) //RC 26256764 : Kompletní filtr
                    .addSection()
                        .addRow({ label: "jres:26256714", name: "dateIntervalRow" }) //RC 26256714 : Od-do
                            .addField(
                                "gdatecombobox",
                                {
                                    name: "dateIntervalField",
                                    defaultInitialValue: this.model.DateInterval,
                                    model: "model.DateInterval=value; model.DatumAplikovatNa=factor",
                                    factors: dateFactors,
                                    daysRangeMax: that.DaysRangeMax,
                                    userSettings: that.userSettings,
                                    contextMenu: {
                                        // daysRange: that.predplneniPocetDni
                                    },
                                    change: function (ev, obj) {

                                    }
                                },
                                // 19.07.2023 - TFeik
                                // Přidány definice typů datumů bez časové složky.
                                // Pokud by se jednalo o TypeScript, tak je vhodné použít funkci createFilterFieldOptions místo as any.
                                //Gordic.Widget.createFilterFieldOptions(
                                    {
                                        filterTypeDefinitions: [
                                            {
                                                Key: 'DateInterval.date.start',
                                                // V JavaScriptu bohužel enum nejede.
                                                //Type: Gordic.Gin.Interface.GMaskaValueType.GDate
                                                Type: 7
                                            },
                                            {
                                                Key: 'DateInterval.date.end',
                                                // V JavaScriptu bohužel enum nejede.
                                                //Type: Gordic.Gin.Interface.GMaskaValueType.GDate
                                                Type: 7
                                            }
                                        ]
                                    }
                                //)
                            );

          //  if(this.UsuShowSuPar == 1) { // jeste zvazit zda nekoliduje s novym polickem
          //      filterForm.addSection(Gordic.Ssl.Prefabs.FilterPohledZa({ name: "filterPohledZa", model: "model.PohledZaFilter=value.id", label: "jres:26255855" })); //RC 26255855 : Vlastnictví
          //  }
            filterForm.addSection(Gordic.Wfl.Prefabs.FilterSubjekt({ name: "filterSubjekt", model: "model.SelectedSubject.Ixs=value.Ixs;model.SelectedSubject.Name=value.Name;model.SelectedSubject.TypeIxs=value.TypeIxs;model.SelectedSubject.SubjectStructOrg=value.SubjectStructOrg;model.SelectedSubject.pIxs=value.pIxs", initialValue: this.model.SelectedSubject, label: "jres:26255855" }, this)); //RC 26255855 : Vlastnictví
            
            if(this.model.SubTask == this.DokumentySubTask.Neaktivni) {
                filterForm.addSection(Gordic.Ssl.Prefabs.FilterDleNeaktivnichStavu({ name: "filterNeaktivniStavyDoc", model: "model.ZobrazitNeaktivniFilter=value.id", label: "jres:26257004", initialValue: this.model.ZobrazitNeaktivniFilter, FiltrPreruseneVisible: true, FiltrPreevidovaneVisible: this.ginN23VeddPar === 1, ginN23VeddPar: this.ginN23VeddPar })); //RC 26257004 : Zobrazit
            }
            if(this.model.SubTask == this.DokumentySubTask.Nevyrizene) {
                filterForm.addPrefab(Gordic.Ssl.Prefabs.FilterPuvodDokumentu({
                    name: "filterPuvodDokumentu",
                    model: "model.TypFiltruPuvod=value.id",
                    initialValue: this.model.TypFiltruPuvod
                }));
            }

            filterForm.addSection(Gordic.Ssl.Prefabs.FilterDleStavu({ name: "filterStavDoc", model: "model.ZobrazitDokumentyFilter=value.id", modelSpZn: "FiltrSpZn", label: "jres:26257005", FiltrCjVisible: filtrCjVisible, FiltrVcetneOdeslanychVisible: filtrVcetneOdeslanychVisible, FiltrElektronickeVisible: filtrElektronickeVisible, FiltrZnackaVisible: filtrZnackaVisible, FiltrIDokumentyVeSpisech: filtrIDokumentyVeSpisech, FiltrDokumentyMimoSpis: filtrDokumentyMimoSpis, FiltrDokumentyVeSpisu: filtrDokumentyVeSpisu, initialValue: this.model.ZobrazitDokumentyFilter })); //RC 26257005 : Filtr

            return [filterForm]; 
        },
        LoadGrid: function () {
            var that = this;
            this.gridColumnsDefinition = new Gordic.Data.GridFormat();

            this.gridColumnsDefinition.addIconColumn(this.VysledekOperaceIcoColumn());

            if(this.IsStaraMetodikaSsl) {
                Gordic.Wfl.GWflCommonDlg.AddDokumentySimpleColumnsDlg(this.gridColumnsDefinition, {}); // pro starou metodiku
                this.gridColumnsDefinition.addIconColumn(Gordic.Wfl.Globals.ListSupport.PoziceSpisColumnDlg({}));
            } else {
                Gordic.Wfl.GWflCommonDlg.AddDokumentyColumnsDlg(this.gridColumnsDefinition, {}); // pro novou metodiku
            }

            this.gridColumnsDefinition.addTextColumn(Gordic.Wfl.Globals.ListSupport.PrizKopieColumn());

            if (this.model.SubTask == this.DokumentySubTask.Nevyrizene) {

                if (!this.IsStaraMetodikaSsl) {
                    this.gridColumnsDefinition.addTextColumn(Gordic.Wfl.Globals.ListSupport.PrizCjColumn());
                }
                if (this.StavUkonuEpkVisible) {
                    this.gridColumnsDefinition.addTextColumn(Gordic.Wfl.Globals.ListSupport.StavUkonuEpkColumn());
                }
                this.gridColumnsDefinition
                    .addIconColumn(Gordic.Wfl.Globals.ListSupport.UzoColumn(
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
                        // fixedWidth: true,
                    })
                    .addTextColumn({
                        name: "akt_znacka",
                        caption: this.ZnackaShortText,
                        width: 150,
                        fixedWidth: false,
                        sortOrder: Gordic.Ssl.Utils.SortSpzn
                    })
                    .addTextColumn({
                        name: "znacka_odes",
                        caption: "jres:26257428", //RC 26257428 : Značka odesílatele
                        width: 150,
                        fixedWidth: false,
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
                    .addDateTimeColumn({
                        name: "dat_zmena",
                        caption: "jres:26255404", //RC 26255404 : Datum změny
                    })
                    .addTextColumn({
                        name: "vlastnik",
                        caption: "jres:26255398", //RC 26255398 : Vlastník
                        width: 200,
                    })
                    .addDateTimeColumn({
                        name: "dat_pod",
                        caption: "jres:26255459", //RC 26255459 : Datum podání
                    })
                    .addTextColumn({
                        name: "cj_spis",
                        caption: this.SpZnackaShortText,
                        width: 150,
                        fixedWidth: false,
                        sortOrder: Gordic.Ssl.Utils.SortSpzn
                    });

                if (!this.IsStaraMetodikaSsl) {
                    this.gridColumnsDefinition.addDateColumn({
                        name: "dat_vyriz_do",
                        caption: "jres:26255641", //RC 26255641 : Termín dokumentu
                        width: 100,
                        // fixedWidth: true,
                    })
                }

                if (this.PouzivatDilciTerminy) {
                    this.gridColumnsDefinition.addDateColumn({
                        name: "dat_dtermin",
                        caption: "jres:31937317", //RC 31937317 : Dílčí termín
                        width: 100,
                        // fixedWidth: true,
                    });
                }

                if(this.gin_n23_vecsk == 0 || !this.TestMinDbVersionProVecneSkupiny) {
                    this.gridColumnsDefinition
                        .addTextColumn({
                            name: "spis_znak",
                            caption: "jres:26255613", //RC 26255613 : Spis. znak
                            //  aggregate: Gordic.Data.Aggregates.first("ac"),
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
                            //filter: [new Gordic.Data.Filters.GTextFilterFullTextStartsWith("spis_znak")]
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
                    .addTextColumn({
                        name: "ixs_typ_txt",
                        caption: this.gin_n23_vecsk == 0 ? "jres:31937228" : "jres:26257355", //RC 31937228 : Typ dokumentu RC 26257355 : Druh dokumentu
                    })
                    .addTextColumn({
                        name: "zkr_ag",
                        caption: "jres:26257056", //RC 26257056 : Typ agendy
                        width: 70,
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

            } else if (this.model.SubTask == this.DokumentySubTask.Vyrizene) {

                if (!this.IsStaraMetodikaSsl) {
                    this.gridColumnsDefinition.addTextColumn(Gordic.Wfl.Globals.ListSupport.PrizCjColumn());
                }

                this.gridColumnsDefinition
                    /*  .addIconColumn(Gordic.Wfl.Globals.ListSupport.TypDokumentuColumn()) // stare ikony
                      .addIconColumn(Gordic.Wfl.Globals.ListSupport.EleColumn()) // stare ikony
                      .addIconColumn(Gordic.Wfl.Globals.ListSupport.StavDokColumn()) // stare ikony
                      .addIconColumn(Gordic.Wfl.Globals.ListSupport.SchvalenoColumn()) // stare ikony
                      .addIconColumn(Gordic.Wfl.Globals.ListSupport.PuvodColumn()) // stare ikony*/
                    .addIconColumn(Gordic.Wfl.Globals.ListSupport.PrizBalikColumn())
                    .addTextColumn({
                        name: "ixp",
                        caption: "jres:26255367", //RC 26255367 : PID
                        width: 120,
                        //  fixedWidth: true,
                    })
                    .addTextColumn({
                        name: "akt_znacka",
                        caption: this.ZnackaShortText,
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
                        name: "ixs_typ_txt",
                        caption: this.gin_n23_vecsk == 0 ? "jres:31937228" : "jres:26257355", //RC 31937228 : Typ dokumentu RC 26257355 : Druh dokumentu
                    });

                if(this.gin_n23_vecsk == 0 || !this.TestMinDbVersionProVecneSkupiny) {
                    this.gridColumnsDefinition
                        .addTextColumn({
                            name: "spis_znak",
                            caption: "jres:26255613", //RC 26255613 : Spis. znak
                            //  aggregate: Gordic.Data.Aggregates.first("ac"),
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
                        });
                }

                this.gridColumnsDefinition
                    .addDateTimeColumn({
                        name: "dat_pod",
                        caption: "jres:26255459", //RC 26255459 : Datum podání
                    });

                if(this.PouzivatDilciTerminy) {
                    this.gridColumnsDefinition.addDateColumn({
                        name: "dat_dtermin",
                        caption: "jres:31937317", //RC 31937317 : Dílčí termín
                        width: 100,
                        // fixedWidth: true,
                    });
                }

                this.gridColumnsDefinition
                    .addTextColumn({
                        name: "vlastnik",
                        caption: "jres:26255398", //RC 26255398 : Vlastník
                        width: 200,
                    })
                    .addDateColumn({
                        name: "dat_vyriz",
                        caption: "jres:26257142", //RC 26257142 : Datum vyřízení
                        width: 120,
                    })
                    .addTextColumn({
                        name: "zp_vyriz_txt",
                        caption: "jres:26256494", //RC 26256494 : Zp. vyřízení ČJ
                    })
                    .addTextColumn({
                        name: "cj_spis",
                        caption: this.SpZnackaShortText,
                        width: 150,
                        fixedWidth: false,
                        sortOrder: Gordic.Ssl.Utils.SortSpzn
                    })
                    .addTextColumn({
                        name: "zkr_ag",
                        caption: "jres:26257056", //RC 26257056 : Typ agendy
                        width: 70,
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
            } else if (this.model.SubTask == this.DokumentySubTask.Neaktivni) {
                //var l_bUseTypPisemnostiEnum = this.model.ZobrazitNeaktivniFilter === Gordic.Ssl.Globals.Enums.SeznamNeaktivnich.ODESLANE; // u techto seznamu jina logika na ikony

                this.NastavPrintRestrictionALFProNeaktivniFiltry(this.model.ZobrazitNeaktivniFilter);

                this.gridColumnsDefinition
                    /* .addIconColumn(Gordic.Wfl.Globals.ListSupport.TypDokumentuColumn()) // stare ikony
                     .addIconColumn(Gordic.Wfl.Globals.ListSupport.EleColumn()) // stare ikony*/
                    .addTextColumn({
                        name: "ixp",
                        caption: "jres:26255367", //RC 26255367 : PID
                        width: 120,
                        //  fixedWidth: true,
                    })
                    .addTextColumn({
                        name: "akt_znacka",
                        caption: this.ZnackaShortText,
                        width: 150,
                        fixedWidth: false,
                        sortOrder: Gordic.Ssl.Utils.SortSpzn
                    })
                    .addTextColumn({
                        name: "nazev",
                        caption: "jres:26255640", //RC 26255640 : Věc-obsah
                        width: 250,
                    })
                    .addTextColumn({
                        name: "ixs_typ_txt",
                        caption: this.gin_n23_vecsk == 0 ? "jres:31937228" : "jres:26257355", //RC 31937228 : Typ dokumentu RC 26257355 : Druh dokumentu
                    })
                    .addTextColumn({
                        name: "misto_vzniku",
                        caption: "jres:26255430", //RC 26255430 : Odesílatel
                    });

                if(this.DuvodStornaVisible) {
                    this.gridColumnsDefinition.addTextColumn({
                        name: "duvod_storna",
                        caption: "jres:26257217", //RC 26257217 : Důvod storna/přeevidence
                        width: 100,
                    });
                }

                this.gridColumnsDefinition
                   .addTextColumn({
                       name: "nazev_fun",
                       caption: "jres:26255767", //RC 26255767 : Poslední aktuální vlastník(funkce)
                   });
                if (this.PouzivatDilciTerminy) {
                    this.gridColumnsDefinition.addDateColumn({
                        name: "dat_dtermin",
                        caption: "jres:31937317", //RC 31937317 : Dílčí termín
                        width: 100,
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
                            grid: that.mainGrid,
                            TypSpis: rowData.typ_spis
                        };
                        var retPromis = Gordic.Wfl.MainApp.ShowDetail(that, options);
                        if (retPromis) {
                            retPromis.done(function (cntDialogDiv) {
                                cntDialogDiv.on("closed", function (ev, dlgRet) {
                                    if (dlgRet && dlgRet.naDetailuDosloKeZmene) {
                                        //refresh řádku rowData.ixp
                                        that.Reload();
                                    }
                                 });
                            });
                            
                        }
                    }
                }),
                selection: function (ev, ctx) {
                     if(that.SelectionForPreviewController) {
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
                searchColumns: ["ixp", "akt_znacka", "znacka_odes", "misto_vzniku", "nazev", "dat_zmena", "vlastnik", "dat_pod", "cj_spis", "dat_vyriz_do", "spis_znak", "ixs_typ_txt", "uziv_sl_1", "uziv_sl_2", "uziv_sl_3", "uziv_sl_4"], //sloupce, podle kterych se vyhledava v searchboxu
                columns: this.gridColumnsDefinition,
            });



            this.LoadData();
        },
        VyberRadkuClick: function (rowData) {
            var that = this;

      
        },
        NevyrizeneClick: function () {
            this.model.SubTask = this.DokumentySubTask.Nevyrizene;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_sdoku01",
                ["dateIntervalRow", "filterSubjekt", "filterPuvodDokumentu", "filterStavDoc"],
                "FilterPanelNevyrizene"
            )

            if(!this.IsStaraMetodikaSsl) {
                this.model.ZobrazitDokumentyFilter = [7];
            }

            this.PrepareSubtask();
        },
        VyrizeneClick: function () {
            this.model.SubTask = this.DokumentySubTask.Vyrizene;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_sdoku02",
                ["dateIntervalRow", "filterSubjekt", "filterStavDoc"],
                "FilterPanelVyrizene"
            )

            if(!this.IsStaraMetodikaSsl) {
                this.model.ZobrazitDokumentyFilter = [7];
            }

            this.PrepareSubtask();
        },
        NeaktivniClick: function () {
            this.model.SubTask = this.DokumentySubTask.Neaktivni;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_sdoku03",
                ["dateIntervalRow", "filterSubjekt", "filterNeaktivniStavyDoc", "filterStavDoc"],
                "FilterPanelNeaktivni"
            )

          //  if(!this.IsStaraMetodikaSsl) {
                this.model.ZobrazitDokumentyFilter = [];
          //  }

            this.PrepareSubtask();
        },

        DokumentySubTask: {
            Neurceno: 0,
            Nevyrizene: 1,
            Vyrizene: 2,
            Neaktivni: 3
        },


        //#region Menu

        CreateMenu: function () {
            this.ZaregistrujHromadneAkce();
            // this.enableHromadneAkce(); // TODO
            var lokalniAkceBefore = [
                { action: "actDetailWfl", favorite: true },
                { action: "actOtevriDokumentDoNoveZalozkyVeStejneFazi", favorite: true },
                { type: "separator", id: "sep1" },
                {
                    type: "static",
                    caption: "jres:26256985", //RC 26256985 : Podání
                    icon: "fa-plus-circle",
                    children: [
                        { action: this.actions.actPodaniVlastni, favorite: false },
                        { action: this.actions.actPodaniCizi, favorite: false },
                        { action: this.actions.actNovyFormular, favorite: false },
                        { action: this.actions.actVytvoritDuplikatZeSablony, favorite: false },
                    ],
                    favorite: true
                },
                { type: "separator", id: "sep2" },
            ];
            var lokalniAkceAfter = [
                { type: "separator", id: "sep4" },
                { action: "actObcerstvitWfl" },
            ];
            var spolecneAkce = this.VratMenuHromadneAkce();
    
            var kompletniAkce = lokalniAkceBefore.concat(spolecneAkce).concat(lokalniAkceAfter);
           this.CreateMenuBar(kompletniAkce);
        },

        getVisibleHromadneAkceDto: function () {
            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto();

            var visible = this.model.SubTask != this.DokumentySubTask.Neaktivni;

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
            defaultDto.ZmenitPocetUlozenoListu = this.model.SubTask == this.DokumentySubTask.Vyrizene;
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
            defaultDto.VlozitDokEpkHromadne = visible;
            defaultDto.VlozitSpisEpkHromadne = false;
            defaultDto.VyriditAdActaHromadne = visible;
            defaultDto.VyriditDokumentyHromadne = visible;
            defaultDto.VyriditDokumentyVeSpisuHromadne = visible;
            defaultDto.VyriditSpisyHromadne = visible;
            defaultDto.ZrusitVyrizeniDokumentuHromadne = visible;
            defaultDto.ZrusitVyrizeniSpisuHromadne = visible;
            defaultDto.ZrusitUzavreniSpisuHromadne = visible;
            defaultDto.PrerusitHromadne = visible;
            defaultDto.PriorovatHromadne = visible;
            defaultDto.PredatDokumentyExtAgHromadne = visible;
            defaultDto.PredatSpisyExtAgHromadne = false;
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
            defaultDto.TiskSpisObalky = false;
            defaultDto.TiskSbernyArch = false;
            defaultDto.Obcerstvit = visible;

            // konec specifické sekce

            return defaultDto;
        },

        getEnableHromadneAkceDto: function () {
            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto();

            var vyrizeneView = this.model.SubTask == this.DokumentySubTask.Vyrizene;
            var neaktivniView = this.model.SubTask == this.DokumentySubTask.Neaktivni;

            // Defaultně jsou všechny true.

            defaultDto.PredatPrimo = this.usu_predani === 1;
            defaultDto.PrevzitHromadne = false;
            defaultDto.PrevzitVRedistribuciHromadne = false;
            defaultDto.VyriditAdActaHromadne = !vyrizeneView;
            defaultDto.VyriditDokumentyHromadne = !vyrizeneView;
            defaultDto.VyriditDokumentyVeSpisuHromadne = !vyrizeneView;
            defaultDto.VyriditSpisyHromadne = false;
            defaultDto.ZrusitVyrizeniDokumentuHromadne = vyrizeneView;
            defaultDto.ZrusitVyrizeniSpisuHromadne = false;
            defaultDto.ZrusitUzavreniSpisuHromadne = false;
            defaultDto.ZmenitTerminSpisuHromadne = false;
            defaultDto.PriorovatHromadne = false;
            defaultDto.ZtvarneniMetadatSpisuHromadne = false;
            defaultDto.ZmenitPocetUlozenoListu = vyrizeneView && this.zmenitPocetUlozenoListuEnabled;
            defaultDto.HromadneOdeslatDotcenymSubjektum = !neaktivniView;
            defaultDto.HromadneNastavitPrvniPrilohuJakoElObraz = !neaktivniView;
            defaultDto.HromadnyImport = !neaktivniView;

            return defaultDto;
        },

        getFavoriteHromadneAkceDto: function () {
            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto(false);

            // Defaultně jsou všechny true.

            defaultDto.PredatPrimo = true;
            defaultDto.PridelitHromadne = true;
            defaultDto.VlozitDokEpkHromadne = true;
            defaultDto.VlozitDoSpisuSslHromadne = true;
            defaultDto.VyjmoutZeSpisuHromadne = true;
            defaultDto.PoznamkovyBlokPridatHromadne = true;
            defaultDto.StornoHromadne = true;

            return defaultDto;
        }

        //#endregion

    }, { extendIntellisense: GContent });
})(jQuery);
