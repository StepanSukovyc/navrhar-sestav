(function ($) {
    "use strict";
    namespace("Gordic.Ssl.Lists.PracovniStul", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26256153"; //RC 26256153 : Pracovní stůl

            this.printRestrictionALF = "pra_stu";
            this.loadGridImmediately = this.SslCtiSezPar === 1;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_pprst01",
                ["dateIntervalRow", "filterStavDoc", "filterNeaktivniStavyDoc", "filterStavuProPracovniStul", "filterSubjekt", "filterTypSpis"], // Pozor filterStavDoc je podmineny - proverit chovani, propadne opodminkovat
                "FilterPanel"
            )

            this.actions.addRange({
                noact: { run: $.noop },
                /*   act2: { icon: "fa-bookmark", run: $.noop },
                   act3: { icon: "fa-book", run: $.noop },*/
            });

            $("<div>").appendTo(this.element)

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
            var filtrVcetneOdeslanychVisible = false;
            var filtrElektronickeVisible = false;
            var filtrZnackaVisible = false;
  
            dateFactors = [
                { caption: "jres:26255459", factor: "DP" }, //RC 26255459 : Datum podání
                { caption: "jres:26255404", factor: "DZ" } //RC 26255404 : Datum změny
            ];

            var filterForm = new Gordic.Forms.Form({ name: "FormPracovniStulList", tabLabel: "jres:26256764", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" }) //RC 26256764 : Kompletní filtr
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
                       // daysRange: that.predplneniPocetDni
                    },
                    change: function (ev, obj) {

                    }
                });

            if(!this.IsStaraMetodikaSsl) {
                filterForm.addSection(Gordic.Ssl.Prefabs.FilterDleStavu({
                    name: "filterStavDoc",
                    model: "model.ZobrazitDokumentyFilter=value.id",
                    modelSpZn: "FiltrSpZn",
                    label: "jres:26257005", //RC 26257005 : Filtr
                    FiltrVcetneOdeslanychVisible: filtrVcetneOdeslanychVisible,
                    FiltrElektronickeVisible: filtrElektronickeVisible,
                    FiltrZnackaVisible: filtrZnackaVisible,
                    initialValue: this.model.ZobrazitDokumentyFilter
                }));
            }

            filterForm.addSection(Gordic.Ssl.Prefabs.FilterDleNeaktivnichStavu({
                name: "filterNeaktivniStavyDoc",
                model: "model.ZobrazitNeaktivniFilter=value.id",
                label: "jres:26256868", //RC 26256868 : Zobrazit i
                multi: true,
                FiltrPreruseneVisible: true,
                FiltrPriorovaneVisible: true,
                FiltrUlozeneVisible: true,
                FiltrArchivovaneVisible: true,
                FiltrSkartovaneVisible: true,
                ginN23VeddPar: this.ginN23VeddPar,
                initialValue: this.model.ZobrazitNeaktivniFilter
            })); //RC 26256868 : Zobrazit i

            filterForm.addSection(Gordic.Ssl.Prefabs.FilterStavuProPracovniStul({
                name: "filterStavuProPracovniStul",
                model: "model.StavProPracovniStulFilter=value.id",
                label: "jres:26257046", //RC 26257046 : Zobrazit
                multi: true,
                FiltrVRedistribuciVisible: true,
                FiltrVeSpisuVisible: true,
                initialValue: this.model.ZobrazitNeaktivniFilter
            })); //RC 26256868 : Zobrazit i

            //if(this.UsuShowSuPar == 1) {
            //    filterForm.addSection(Gordic.Ssl.Prefabs.FilterPohledZa({ name: "filterPohledZa", model: "model.PohledZaFilter=value.id", label: "jres:26255855" })); //RC 26255855 : Vlastnictví
            //}

            filterForm.addSection(Gordic.Wfl.Prefabs.FilterSubjekt({
                name: "filterSubjekt",
                model: "model.SelectedSubject.Ixs=value.Ixs;model.SelectedSubject.Name=value.Name;model.SelectedSubject.TypeIxs=value.TypeIxs;model.SelectedSubject.SubjectStructOrg=value.SubjectStructOrg;model.SelectedSubject.pIxs=value.pIxs",
                label: "jres:26255855",
                initialValue: this.model.SelectedSubject
            }, this)); //RC 26255855 : Vlastnictví

            if(this.ginN23VeddPar != 0) {
                filterForm.addSection(Gordic.Ssl.Prefabs.FilterTypSpis({
                    name: "filterTypSpis",
                    model: "model.ZobrazitTypSpisFilter=value.id",
                    label: "jres:26257380", //RC 26257380 : Typ entity
                    multi: true,
                    initialValue: this.model.ZobrazitTypSpisFilter
                }));
            }

            return [filterForm];
        },
        LoadGrid: function () {
            var that = this;
            var gridColumnsDefinition = new Gordic.Data.GridFormat();

            gridColumnsDefinition.addIconColumn(this.VysledekOperaceIcoColumn());

            Gordic.Wfl.GWflCommonDlg.AddDokumentyColumnsDlg(gridColumnsDefinition, {}); // extendObj nepovinné

            if(!this.IsStaraMetodikaSsl) {
                gridColumnsDefinition.addTextColumn(Gordic.Wfl.Globals.ListSupport.PrizCjColumn());
            }

            if(this.StavUkonuEpkVisible) {
                gridColumnsDefinition.addTextColumn(Gordic.Wfl.Globals.ListSupport.StavUkonuEpkColumn());
            } 

            gridColumnsDefinition
                .addTextColumn(Gordic.Wfl.Globals.ListSupport.PrizKopColumn())
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
                    //    fixedWidth: false,
                    sortOrder: Gordic.Ssl.Utils.SortSpzn,
                })
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26255640", //RC 26255640 : Věc-obsah
                    width: 250,
                })
                .addTextColumn({
                    name: "ixs_typ_txt",
                    caption: this.gin_n23_vecsk == 0 ? "jres:31937228" : "jres:26257355", //RC 31937228 : Typ dokumentu RC 26257355 : Druh dokumentu
                    width: 150,
                })
                .addTextColumn({
                    name: "misto_vzniku",
                    caption: "jres:26255430", //RC 26255430 : Odesílatel
                    width: 200,
                })
                .addTextColumn({
                    name: "vlastnik",
                    caption: "jres:26257165", //RC 26257165 : Vlastník
                    width: 200,
                })
                .addDateTimeColumn({
                    name: "dat_pod",
                    caption: "jres:26257387", //RC 26257387 : Datum podání / založení
                });

            if(this.gin_n23_vecsk == 0 || !this.TestMinDbVersionProVecneSkupiny) {
                gridColumnsDefinition
                    .addTextColumn({
                        name: "spis_pl",
                        caption: "jres:26256979", //RC 26256979 : Spis. plán
                    })
                    .addTextColumn({
                        name: "spis_znak",
                        caption: "jres:26255613", //RC 26255613 : Spis. znak
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

            gridColumnsDefinition
                .addTextColumn({
                    name: "zkr_ag",
                    caption: "jres:26257056", //RC 26257056 : Typ agendy
                    width: 70,
                });
                
            if (!this.IsStaraMetodikaSsl) {
                gridColumnsDefinition.addDateColumn({
                    name: "dat_vyriz_do",
                    caption: "jres:26255641", //RC 26255641 : Termín dokumentu
                    width: 100,
                    // fixedWidth: true,
                })
            }
            if (this.PouzivatDilciTerminy) {
                gridColumnsDefinition.addDateColumn({
                    name: "dat_dtermin",
                    caption: "jres:31937317", //RC 31937317 : Dílčí termín
                    width: 100,
                    // fixedWidth: true,
                });
            }
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
                name: "GridPracovniStul",
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
                searchColumns: ["dat_zmena", "ixp", "zmena_txt", "poznamka", "dat_zmena", "misto_vzniku", "nazev", "ixs_typ_txt"], //sloupce, podle kterych se vyhledava v searchboxu
                columns: gridColumnsDefinition,
            });

            this.LoadData();
        },
        VyberRadkuClick: function (rowData) {
            var that = this;


        },

        //#region Menu

        CreateMenu: function () {
            this.ZaregistrujHromadneAkce();

            var lokalniAkceBefore = [
                { action: "actDetailWfl", favorite: true },
                { action: "actOtevriDokumentDoNoveZalozkyVeStejneFazi", favorite: true },
                { type: "separator", id: "sep1" },
            ];
            var lokalniAkceAfter = [
                { type: "separator", id: "sep2" },
                { action: "actObcerstvitWfl" },
            ];
            var spolecneAkce = this.VratMenuHromadneAkce();
            var kompletniAkce = lokalniAkceBefore.concat(spolecneAkce).concat(lokalniAkceAfter);

            this.CreateMenuBar(kompletniAkce);
        },

        getVisibleHromadneAkceDto: function () {
            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto();

            var visible = true;

            //tato sekce je specifická pro každá content. vybereš si které chceš a které ne
            // Defaultně jsou všechny true.

            defaultDto.PrevzitVRedistribuciHromadne = false;

            defaultDto.PridatSpisyZDokumentuHromadne = false;
            defaultDto.PridatDokumentyVlozeneDoSpisuHromadne = false;

            // konec specifické sekce

            return defaultDto;
        },

        getEnableHromadneAkceDto: function () {
            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto();

            // Defaultně jsou všechny true.

            defaultDto.PredatPrimo = this.usu_predani === 1;
            defaultDto.PrevzitVRedistribuciHromadne = false;

            return defaultDto;
        },

        getFavoriteHromadneAkceDto: function () {
            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto(false);

            // Defaultně jsou všechny true.

            defaultDto.PredatPrimo = true;
            defaultDto.PridelitHromadne = true;
            defaultDto.VlozitDokEpkHromadne = true;

            return defaultDto;
        },

        //#endregion

    }, { extendIntellisense: GContent });
})(jQuery);
