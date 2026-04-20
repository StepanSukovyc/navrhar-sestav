(function ($) {
    "use strict";
    namespace("Gordic.Ssl.Lists.IrpSeznam", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26257191"; //RC 26257191 : IRP oprávnění

            this.printRestrictionALF = "pra_stu";
            this.loadGridImmediately = this.SslCtiSezPar === 1;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_pirps01",
                ["dateIntervalRow", "filterStavDoc", "filterNeaktivniStavyDoc"], // Pozor filterStavDoc je podmineny - proverit chovani, propadne opodminkovat
                "FilterPanel"
            )

            this.actions.addRange({
                noact: { run: $.noop },
                actPrevzitIRP: {
                    name: "actPrevzitIRP",
                    icon: "gi-doc_vlastni gi-stack-bg|gi-tick g-state-text g-state-success gi-stack-fw gi-stack-pos--rb gi-bgw",
                    caption: "jres:26257226", //RC 26257226 : Převzít IRP
                    //  enabled: (wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false,
                    visible: false,
                    run: function (ev, ctx) {
                        that.PrevzitZamitnoutClick(false);
                    }
                },
                actZamitnoutIRP: {
                    name: "actZamitnoutIRP",
                    icon: "gi-doc_vlastni gi-stack-bg|fa-times g-state-text g-state-error gi-stack-fw gi-stack-pos--rb gi-bgw",
                    caption: "jres:26257227", //RC 26257227 : Zamítnout IRP
                    //  enabled: (wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false,
                    visible: false,
                    run: function (ev, ctx) {
                        that.PrevzitZamitnoutClick(true);
                    }
                },
            });

            $("<div>").appendTo(this.element)
                .gsubtasks({
                    params: [
                        { caption: "jres:26257015", action: this.actions.actVlastni }, //RC 26257015 : Vlastní
                        { caption: "jres:26257016", action: this.actions.actPodrizena }, //RC 26257016 : Přidělená podřízeným
                        { caption: "jres:26257018", action: this.actions.actPrihlasenouFunkci }, //RC 26257018 : Přidělená přihlášenou funkcí
                        { caption: "jres:26257188", action: this.actions.actMemuSpisovemuUzlu }, //RC 26257188 : Přidělená mému spis. uzlu
                        { caption: "jres:26257224", action: this.actions.actMeSkupineFunkci }, //RC 26257224 : Přidělená mé pracovní skupině
                        { caption: "jres:26257189", action: this.actions.actKPrevzetiAZamitnuta }, //RC 26257189 : K převzetí a zamítnutá
                    ]
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

            var filterForm = new Gordic.Forms.Form({ name: "FormIRPSeznamList", tabLabel: "jres:26256764", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" }) //RC 26256764 : Kompletní filtr
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

            if (!this.IsStaraMetodikaSsl) {
                filterForm.addSection(Gordic.Ssl.Prefabs.FilterDleStavu({
                    name: "filterStavDoc",
                    model: "model.ZobrazitDokumentyFilter=value.id",
                    modelSpZn: "FiltrSpZn",
                    label: "jres:26257005", //RC 26257005 : Filtr
                    FiltrVcetneOdeslanychVisible: filtrVcetneOdeslanychVisible,
                    FiltrElektronickeVisible: filtrElektronickeVisible,
                    FiltrZnackaVisible: filtrZnackaVisible,
                    FiltrDokumentyMimoSpis: true,
                    FiltrDokumentyVeSpisu: true,
                    FiltrSpisy: true,
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
                ginN23VeddPar: this.ginN23VeddPar,
                initialValue: this.model.ZobrazitNeaktivniFilter
            })); //RC 26256868 : Zobrazit i

            return [filterForm];
        },
        LoadGrid: function () {
            var that = this;
            var gridColumnsDefinition = new Gordic.Data.GridFormat();

            gridColumnsDefinition.addIconColumn(this.VysledekOperaceIcoColumn());

            Gordic.Wfl.GWflCommonDlg.AddDokumentyColumnsDlg(gridColumnsDefinition, {}); // extendObj nepovinné

            if (!this.IsStaraMetodikaSsl) {
                gridColumnsDefinition.addTextColumn(Gordic.Wfl.Globals.ListSupport.PrizCjColumn());
            }

            gridColumnsDefinition
                .addTextColumn(Gordic.Wfl.Globals.ListSupport.PrizKopColumn())
                // sloupec UZO - požaduje Vojta Rychtecky, ale nemám schváleno od Aleše (ne všichni zákazníci by funkčnost uvítali)
                //   .addIconColumn(Gordic.Wfl.Globals.ListSupport.UzoColumn(
                //           null,
                //           function (row) {
                //               return row.ixs_fun_akt != that.IxsFunAkt;
                //               return false;
                //           },
                //           this.globalSettings
                //       ))
                .addTextColumn({
                    name: "ixp",
                    caption: "jres:26255367", //RC 26255367 : PID
                    width: 120,
                    //   fixedWidth: true,
                })
                .addTextColumn({
                    name: "akt_znacka",
                    caption: this.ZnackaShortText,
                    width: 150,
                    fixedWidth: false,
                    sortOrder: Gordic.Ssl.Utils.SortSpzn,
                });

            if(/*this.kPrevzetiAZamitnutaEnabled == true && */(this.model.SubTask == this.IrpSubTask.PridelenaPrihlasenouFunkci || this.model.SubTask == this.IrpSubTask.PridelenaKPrevzetiAZamitnuta)) {
                gridColumnsDefinition
                    .addTextColumn({
                            name: "aktivita_irp_txt",
                            caption: "jres:26257225", //RC 26257225 : IRP aktivita
                            width: 100,
                        })
            }

            gridColumnsDefinition
                .addTextColumn({
                    name: "duvod_txt",
                    caption: "jres:26256999", //RC 26256999 : Důvod přístupu IRP
                    width: 200,
                })
                .addTextColumn({
                    name: "ixs_nazev_rf",
                  //  caption: "jres:26257017", //RC 26257017 : Práva IRP přidělena FUN
                    caption: "jres:26257430", //RC 26257430 : Práva přidělená subjektu
                    width: 200,
                })
                .addTextColumn({
                    name: "zmenu_prov_irp_rf",
                    caption: "jres:26257060", //RC 26257060 : Práva přidělil/změnil
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
                    width: 150,
                })
                .addTextColumn({
                    name: "misto_vzniku",
                    caption: "jres:26255430", //RC 26255430 : Odesílatel
                    width: 200,
                })
                .addDateTimeColumn({
                    name: "dat_pod",
                    caption: "jres:26257387", //RC 26257387 : Datum podání / založení
                })

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
                    })
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
                    name: "cj_spis",
                    caption: this.SpZnackaShortText,
                    width: 150,
                    fixedWidth: false,
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
                name: "GridIrpSeznam",
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
                searchColumns: ["dat_zmena", "ixp", "zmena_txt", "poznamka", "misto_vzniku", "duvod_txt", "nazev", "ixs_typ_txt"], //sloupce, podle kterych se vyhledava v searchboxu
                columns: gridColumnsDefinition,
            });

            this.LoadData();
        },
        VyberRadkuClick: function (rowData) {
            var that = this;


        },

        VlastniClick: function () {
            this.model.SubTask = this.IrpSubTask.Vlastni;

            this.actions.actPrevzitIRP.update({ visible: false });
            this.actions.actZamitnoutIRP.update({ visible: false });

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_pirps01",
                ["dateIntervalRow", "filterStavDoc", "filterNeaktivniStavyDoc"], // Pozor filterStavDoc je podmineny - proverit chovani, propadne opodminkovat
                "FilterPanel"
            )

            this.PrepareSubtask();
        },
        PodrizenaClick: function () {
            this.model.SubTask = this.IrpSubTask.Podrizena;

            this.actions.actPrevzitIRP.update({ visible: false });
            this.actions.actZamitnoutIRP.update({ visible: false });

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_pirps02",
                ["dateIntervalRow", "filterStavDoc", "filterNeaktivniStavyDoc"], // Pozor filterStavDoc je podmineny - proverit chovani, propadne opodminkovat
                "FilterPanel"
            )

            this.PrepareSubtask();
        },

        PrihlasenouFunkciClick: function () {
            this.model.SubTask = this.IrpSubTask.PridelenaPrihlasenouFunkci;

            this.actions.actPrevzitIRP.update({ visible: false });
            this.actions.actZamitnoutIRP.update({ visible: false });

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_pirps03",
                ["dateIntervalRow", "filterStavDoc", "filterNeaktivniStavyDoc"], // Pozor filterStavDoc je podmineny - proverit chovani, propadne opodminkovat
                "FilterPanel"
            )

            this.PrepareSubtask();
        },

        MemuSUClick: function () {
            this.model.SubTask = this.IrpSubTask.PridelenaMemuSpisovemuUzlu;

            this.actions.actPrevzitIRP.update({ visible: false });
            this.actions.actZamitnoutIRP.update({ visible: false });

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_pirps04", // TODO zalozit tema
                ["dateIntervalRow", "filterStavDoc", "filterNeaktivniStavyDoc"], // Pozor filterStavDoc je podmineny - proverit chovani, propadne opodminkovat
                "FilterPanel"
            )

            this.PrepareSubtask();
        },

        MeSfuClick: function () {
            this.model.SubTask = this.IrpSubTask.PridelenaMeSkupineFunkci;

            this.actions.actPrevzitIRP.update({ visible: false });
            this.actions.actZamitnoutIRP.update({ visible: false });

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_pirps05", // TODO zalozit tema
                ["dateIntervalRow", "filterStavDoc", "filterNeaktivniStavyDoc"], // Pozor filterStavDoc je podmineny - proverit chovani, propadne opodminkovat
                "FilterPanel"
            )

            this.PrepareSubtask();
        },

        KPrevzetiAZamitnutaClick: function () {
            this.model.SubTask = this.IrpSubTask.PridelenaKPrevzetiAZamitnuta;

            this.actions.actPrevzitIRP.update({ visible: this.kPrevzetiAZamitnutaEnabled });
            this.actions.actZamitnoutIRP.update({ visible: this.kPrevzetiAZamitnutaEnabled });

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_pirps06", // TODO zalozit tema
                ["dateIntervalRow", "filterStavDoc", "filterNeaktivniStavyDoc"], // Pozor filterStavDoc je podmineny - proverit chovani, propadne opodminkovat
                "FilterPanel"
            )

            this.PrepareSubtask();
        },

        PrevzitZamitnoutClick: function (flagZamitnuti) {
            var that = this;
            var selectedRowsInfo = this.GetSelectedRowsInfoFromIRPPrideleneList();

            var opt = {
                model: this.model,
                selectedRowsInfo: selectedRowsInfo,
                flagZamitnuti: flagZamitnuti
            };
            this.call(["PrevzitZamitnout", opt])
                .done(
                    function (retVal, content) {
                        if(retVal != null) {
                            if(retVal.GroupResult) {
                                that.GroupResult = retVal.GroupResult;
                            } else {
                                that.GroupResult = undefined;
                            }
                        }
                    }
                )
                .always(
                    function (retVal) {
                        that.Reload();
                    }
                );
        },

        GetSelectedRowsInfoFromIRPPrideleneList:function() {
            var l_asSelectedRows = [];

            if(this.GridCreated()) {
                var l_aoSelections = this.mainGrid.ggrid("getSelection", true);

                if (l_aoSelections.length > 0) {
                    l_aoSelections.forEach(function (entry) {
                        var rowData = entry.data;

                        l_asSelectedRows.push({ Ixp: rowData.ixp, DatZmena: rowData.dat_zmena, PrizSpis: rowData.priz_spis, TypSpis: rowData.aktivita_irp }); // neuctivě využiji propertu TypSpis pro aktivita_irp. Budiž mi odpuštěno :-)
                    });
                }
            }

            if (l_asSelectedRows.length == 0) {
                this.showFlash("jres:26257231", "g-state-error", this.flashPanelTimer); //RC 26257231 : Není vybrán žádný záznam.
            }

            return l_asSelectedRows;
        },

        IrpSubTask: {
            Neurceno: 0,
            Vlastni: 1,
            Podrizena: 2,
            PridelenaPrihlasenouFunkci: 3,
            PridelenaMemuSpisovemuUzlu: 4,
            PridelenaMeSkupineFunkci: 5,
            PridelenaKPrevzetiAZamitnuta: 6,
        },

        //#region Menu

        CreateMenu: function () {
            this.ZaregistrujHromadneAkce();

            var lokalniAkceBefore = [
                { action: "actDetailWfl", favorite: true },
                { action: "actOtevriDokumentDoNoveZalozkyVeStejneFazi", favorite: true },
                { action: "actPrevzitIRP", favorite: true },
                { action: "actZamitnoutIRP", favorite: true },
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
