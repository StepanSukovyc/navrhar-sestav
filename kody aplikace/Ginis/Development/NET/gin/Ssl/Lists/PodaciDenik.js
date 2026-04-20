(function ($) {
    "use strict";
    namespace("Gordic.Ssl.Lists.PodaciDenik", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26255729"; //RC 26255729 : Podací deník

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_ppode01",
                ["dateIntervalRow", "filterSpisuDeniku"],
                "FilterPanelDleData"
            )

            this.actions.addRange({
                noact: { run: $.noop },
                /*   act2: { icon: "fa-bookmark", run: $.noop },
                   act3: { icon: "fa-book", run: $.noop },*/
            });

            $("<div>").appendTo(this.element)
                .gsubtasks({
                    params: [
                        { caption: "jres:26256753", action: this.actions.actDleData }, //RC 26256753 : Spisy dle data
                        { caption: "jres:26256754", action: this.actions.actDleSpZn }, //RC 26256754 : Dle sp. zn.
                        { caption: "jres:26256755", action: this.actions.actDleCj } //RC 26256755 : Dle ČJ
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
                //   // simpleMode: true,
                //    favoriteLayoutDescriptor: "L3M2S1",
                });

            this.PrepareSubtask();
        },
        CreateFilterForms: function () {
            var that = this;

            this.loadGridImmediately = this.model.SubTask == this.PodaciDenikSubTask.DleData && this.SslCtiSezPar === 1;
            var l_bFiltrDenikSuVisible = true;

            var dateFactors = [
                { caption: "jres:26255459", factor: "DP" }, //RC 26255459 : Datum podání
            ];

            var filterForm = new Gordic.Forms.Form({ name: "FormPodaciDenikList", tabLabel: "jres:26256764", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" })
                .addSection();

            if(this.model.SubTask == this.PodaciDenikSubTask.DleData) {
                // Dle data - datum prichodu, prevzeti (v ramci redistribuce) na spisovy uzel
                filterForm.addRow({ label: "jres:26256714", name: "dateIntervalRow" }) //RC 26256714 : Od-do
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

                l_bFiltrDenikSuVisible = false;
                this.model.TypFiltruSpisuDeniku = 0;

                this.printRestrictionALF = "den_obs";
            } else {
                var roky = [];
                var filtrPrizDenCj = [0, 3]; // pro SpZn

                for (var i = 1993; i <= this.RokMax; i++) {
                    roky.push(i);
                }

                if(this.model.SubTask == this.PodaciDenikSubTask.DleCj) {
                    filtrPrizDenCj = [1, 2]; // pro Cj

                    this.printRestrictionALF = "den_spzn"; // TODO - asi by mel byt jiny, ale hybrid to ma stejne spatne - proverit dle TK
                } else {
                    this.printRestrictionALF = "den_spzn";
                }
                filterForm.addRow("jres:26256762") //RC 26256762 : Denik
                    .addField("gselectbox",
                    {
                        name: "denikField",
                        model: "DenikSelected = sslden",
                        serverFilters: {
                            priz_den_cj: filtrPrizDenCj,
                            aktivita: [100, 500],
                        },
                    }, Gordic.Prefabs.Select.sslsden())
                    .addPrefab(Gordic.Gin.Prefabs.numIntervalRok({
                        type: "number", // zda se rok bude nastavovat stringem a nebo numbrem to samí vracet
                        label: "jres:26256763", //RC 26256763 : Od Do
                        name: "numIntervalRok", 
                        pathInModelInterval: "DenikInterval.CjInterval",
                        pathInModelRok: "DenikInterval.Rok",
                     /*   customOptionsStartDayMonthYear: { "label": "DMR Od" },
                        customOptionsEndDayMonthYear: { "label": "DMR Do" },*/
                        customOptField1: {
                            validators: [new Gordic.Validators.Required()],
                            initialValue:
                                this.model.DenikInterval &&
                                this.model.DenikInterval.CjInterval &&
                                !$.isEmptyObject(this.model.DenikInterval.CjInterval)
                                ? this.model.DenikInterval.CjInterval.start : undefined //$.isEmptyObject({});
                        },
                        customOptField2: {
                            validators: [new Gordic.Validators.Required()],
                            initialValue:
                                this.model.DenikInterval &&
                                    this.model.DenikInterval.CjInterval &&
                                    !$.isEmptyObject(this.model.DenikInterval.CjInterval)
                                    ? this.model.DenikInterval.CjInterval.end : undefined //$.isEmptyObject({});
                        },
                        customOptField3: {
                            validators: [new Gordic.Validators.Required()],
                            initialValue: this.model.DenikInterval ? this.model.DenikInterval.Rok : undefined
                        },
                        rozsahIntervalu: { // validator na interval
                            start: 0,
                            end: 10000
                        },
                        roky: roky
                    }));

                this.model.TypFiltruSpisuDeniku = 1;
            }

            filterForm.addPrefab(Gordic.Ssl.Prefabs.FilterSpisuDeniku({
                name: "filterSpisuDeniku",
                model: "model.TypFiltruSpisuDeniku=value.id",
                FiltrDenikSuVisible: l_bFiltrDenikSuVisible,
                initialValue: this.model.TypFiltruSpisuDeniku // drive obaleno v objektu id:xxx
            }));
           // filterForm.addSection(Gordic.Ssl.Prefabs.FilterSpisuDeniku({ name: "filterSpisuDeniku", model: "model.TypFiltruSpisuDeniku=value.id", FiltrDenikSuVisible: l_bFiltrDenikSuVisible }));

            return [filterForm];
        },
        LoadGrid: function () {
            var that = this;
            var gridColumnsDefinition = new Gordic.Data.GridFormat();

            gridColumnsDefinition.addIconColumn(this.VysledekOperaceIcoColumn());

            if(this.model.SubTask == this.PodaciDenikSubTask.DleCj) { // u dokumentu vsechny icon sloupce
                Gordic.Wfl.GWflCommonDlg.AddDokumentyColumnsDlg(gridColumnsDefinition, {}); // extendObj nepovinné
            } else { // u spisu jen zakladni icon sloupce
                gridColumnsDefinition
                    .addIconColumn(Gordic.Wfl.Globals.ListSupport.TypEntityColumnDlg({}))
                    .addIconColumn(Gordic.Wfl.Globals.ListSupport.StavZpracovaniColumnDlg({}));
            }

            gridColumnsDefinition
                .addTextColumn({
                    name: "cj",
                    caption: this.CjText,
                    width: 110,
                    // fixedWidth: true,
                    sortOrder: Gordic.Ssl.Utils.SortSpzn,
                })
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26255640", //RC 26255640 : Věc-obsah
                    width: 200,
                  //  fixedWidth: true,
                })
                .addTextColumn({
                    name: "misto_vzniku",
                    caption: "jres:26255730", //RC 26255730 : Místo vzniku
                    width: 200,
                })
                .addTextColumn({
                    name: "odeslano_kam",
                    caption: "jres:26255428", //RC 26255428 : Odesláno kam
                    width: 200,
                });

            if(this.model.SubTask == this.PodaciDenikSubTask.DleCj) {
                gridColumnsDefinition.addTextColumn({
                    name: "znacka_odes",
                    caption: "jres:26255731", //RC 26255731 : Značka odes.
                });
            }

            if(this.gin_n23_vecsk == 0 || !this.TestMinDbVersionProVecneSkupiny) {
                gridColumnsDefinition
                    .addTextColumn({
                        name: "spis_pl",
                        caption: "jres:26256979", //RC 26256979 : Spis. plán
                    })
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
                    name: "ixp",
                    caption: "jres:26255367", //RC 26255367 : PID
                    width: 120,
                  //  fixedWidth: true,
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
                        Gordic.Wfl.MainApp.ShowDetail(that, options);
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
                searchColumns: ["cj", "nazev", "misto_vzniku", "odeslano_kam", "znacka_odes", "spis_znak", "ixp"], //sloupce, podle kterych se vyhledava v searchboxu
                columns: gridColumnsDefinition,
            });


            this.LoadData();
        },
        VyberRadkuClick: function (rowData) {
            var that = this;


        },
        DleDataClick: function () {
            this.model.SubTask = this.PodaciDenikSubTask.DleData;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_ppode01",
                ["dateIntervalRow", "filterSpisuDeniku"],
                "FilterPanelDleData"
            )

            this.PrepareSubtask();
        },
        DleSpZnClick: function () {
            this.model.SubTask = this.PodaciDenikSubTask.DleSpZn;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_ppode02",
                ["denikField", "numIntervalRokIntervalStart", "filterSpisuDeniku"],
                "FilterPanelDleSpZn"
            )

            this.PrepareSubtask();
        },
        DleCjClick: function () {
            this.model.SubTask = this.PodaciDenikSubTask.DleCj;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_ppode03",
                ["denikField", "numIntervalRokIntervalStart", "filterSpisuDeniku"],
                "FilterPanelDleCJ"
            )

            this.PrepareSubtask();
        },

        //TiskPodacihoDenikuReportRetreive: function (rep) {
        //    var l_sPar0004 = ""; // Cely urad
        //    var typFiltruSpisuDenikuEnum = Gordic.Ssl.Globals.Enums.TypFiltruSpisuDeniku;

        //    switch(this.model.TypFiltruSpisuDeniku) {
        //        case typFiltruSpisuDenikuEnum.PODANE_UZLEM:
        //            l_sPar0004 = "0"; // Podané uzlem
        //            break;
        //        case typFiltruSpisuDenikuEnum.DENIK_SU:
        //            l_sPar0004 = "1"; // Deník SU
        //            break;
        //        case typFiltruSpisuDenikuEnum.VSECHNY:
        //            l_sPar0004 = ""; // Cely urad
        //            break;
        //    }

        //    rep.params.X0000 = this.model.DenikSelected;
        //    rep.params.X0001 = this.model.DenikInterval.CjInterval.start;
        //    rep.params.X0002 = this.model.DenikInterval.CjInterval.end;
        //    rep.params.X0003 = this.model.DenikInterval.Rok;
        //    rep.params.X0004 = l_sPar0004;
        //    rep.params.X0005 = this.IxsSuAkt; 
        //},

        //#region Menu

        CreateMenu: function () {
            this.ZaregistrujHromadneAkce();

            var lokalniAkceBefore = [
                { action: "actDetailWfl", favorite: true },
                { action: "actOtevriDokumentDoNoveZalozkyVeStejneFazi", favorite: true },
                { type: "separator", id: "sep1" },
            /*    { action: "actTiskPodacihoDeniku", favorite: true }, // presuneme do spolecnych ???
                { type: "separator", id: "sep2" },*/
            ];
            var lokalniAkceAfter = [
                { type: "separator", id: "sep3" },
                { action: "actObcerstvitWfl" },
            ];
            var spolecneAkce = this.VratMenuHromadneAkce();
            var kompletniAkce = lokalniAkceBefore.concat(spolecneAkce).concat(lokalniAkceAfter);

            this.CreateMenuBar(kompletniAkce);
        },

        getVisibleHromadneAkceDto: function () {
            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto();

            //tato sekce je specifická pro každá content. vybereš si které chceš a které ne
            // Defaultně jsou všechny true.

            defaultDto.PrevzitVRedistribuciHromadne = false;

            defaultDto.PridatSpisyZDokumentuHromadne = false;
            defaultDto.PridatDokumentyVlozeneDoSpisuHromadne = false;
            defaultDto.TiskDetailuDokumentu = false;

            // konec specifické sekce

         //   this.actions.actTiskPodacihoDeniku.visible(this.model.SubTask != this.PodaciDenikSubTask.DleData);

            return defaultDto;
        },

        getEnableHromadneAkceDto: function () {
            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto();

            var spisovyDenik = this.model.SubTask != this.PodaciDenikSubTask.DleCj;

            // Defaultně jsou všechny true.

            defaultDto.PredatPrimo = this.usu_predani === 1;
            defaultDto.PrevzitHromadne = false;
            defaultDto.PrevzitVRedistribuciHromadne = false;
            defaultDto.ZmenitPocetUlozenoListu = false;
            defaultDto.ZmenitPocetListu = !spisovyDenik;
            defaultDto.ZmenitPocetPriloh = !spisovyDenik;
            defaultDto.ZmenitPocetListuPriloh = !spisovyDenik;
            defaultDto.ZmenitTerminSpisuHromadne = spisovyDenik;
            defaultDto.VlozitDokEpkHromadne = !spisovyDenik;
            defaultDto.VlozitSpisEpkHromadne = spisovyDenik;
            defaultDto.VyriditAdActaHromadne = !spisovyDenik;
            defaultDto.VyriditDokumentyHromadne = !spisovyDenik;
            defaultDto.VyriditDokumentyVeSpisuHromadne = !spisovyDenik;
            defaultDto.VyriditSpisyHromadne = spisovyDenik;
            defaultDto.ZrusitVyrizeniDokumentuHromadne = !spisovyDenik;
            defaultDto.ZrusitVyrizeniSpisuHromadne = spisovyDenik;
            defaultDto.ZrusitUzavreniSpisuHromadne = spisovyDenik;
            defaultDto.PriorovatHromadne = spisovyDenik;
            defaultDto.TiskDetailuDokumentu = false;

            return defaultDto;
        },

        getFavoriteHromadneAkceDto: function () {
            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto(false);

            // Defaultně jsou všechny true.

            var spisovyDenik = this.model.SubTask != this.PodaciDenikSubTask.DleCj;

            defaultDto.PridelitHromadne = true;
            defaultDto.VlozitDokEpkHromadne = !spisovyDenik;
            defaultDto.VlozitSpisEpkHromadne = spisovyDenik;

            return defaultDto;
        },

        //#endregion

        PodaciDenikSubTask: {
            DleData: 0,
            DleSpZn: 1,
            DleCj: 2,
        },
    }, { extendIntellisense: GContent });
})(jQuery);
