(function ($) {
    "use strict";
    namespace("Gordic.Ssl.Lists.DokumentyUzlu", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26255728"; //RC 26255728 : Dokumenty uzlu

            this.printRestrictionALF = "dok_uzl";
            this.loadGridImmediately = this.SslCtiSezPar === 1;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_pdouz01",
                ["dateIntervalRow"],
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

            var dateFactors = [
                { caption: "jres:26255459", factor: "DP" }, //RC 26255459 : Datum podání
            ];

            var filterForm = new Gordic.Forms.Form({ name: "FormDokumentyUzluList", tabLabel: "jres:26256764", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" }) //RC 26256764 : Kompletní filtr
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

            return [filterForm];
        },
        LoadGrid: function () {
            var that = this;
            var gridColumnsDefinition = new Gordic.Data.GridFormat();

            gridColumnsDefinition.addIconColumn(this.VysledekOperaceIcoColumn());

            gridColumnsDefinition
                .addIconColumn(Gordic.Wfl.Globals.ListSupport.TypEntityColumnDlg({}))
                .addIconColumn(Gordic.Wfl.Globals.ListSupport.VlastnictviDoruceniColumnDlg({}));

            gridColumnsDefinition

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
                    name: "stav_pis_txt",
                    caption: "jres:26255161", //RC 26255161 : Vyřízení
                    width: 150,
                })
                .addTextColumn({
                    name: "misto_vzniku",
                    caption: "jres:26255430", //RC 26255430 : Odesílatel
                    width: 200,
                })
                .addTextColumn({
                    name: "vlastnik",
                    caption: "jres:26255398", //RC 26255398 : Vlastník
                    width: 200,
                })
                .addDateTimeColumn({
                    name: "dat_pod",
                    caption: "jres:26255459", //RC 26255459 : Datum podání
                    width: 150,
                });

            this.AddUserColumnsToGridFormat(gridColumnsDefinition); // zvazit presun do funkce onGetGridData

            this.mainGrid.ggrid({
                name: "GridDokumentyUzlu",
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
                searchColumns: ["ixp", "akt_znacka", "nazev", "stav_pis_txt", "misto_vzniku"], //sloupce, podle kterych se vyhledava v searchboxu
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

            //tato sekce je specifická pro každá content. vybereš si které chceš a které ne
            // Defaultně jsou všechny true.

            defaultDto.PrevzitVRedistribuciHromadne = false;
            defaultDto.VlozitSpisEpkHromadne = false;
            defaultDto.PridatSpisyZDokumentuHromadne = false;
            defaultDto.PridatDokumentyVlozeneDoSpisuHromadne = false;

            defaultDto.TiskSpisObalky = false;
            defaultDto.TiskSbernyArch = false;

            // konec specifické sekce

            return defaultDto;
        },

        getEnableHromadneAkceDto: function () {
            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto();

            // Defaultně jsou všechny true.

            defaultDto.PredatPrimo = this.usu_predani === 1;
            defaultDto.PrevzitHromadne = false;
            defaultDto.PrevzitVRedistribuciHromadne = false;
            defaultDto.VyriditSpisyHromadne = false;
            defaultDto.ZrusitVyrizeniSpisuHromadne = false;
            defaultDto.ZrusitUzavreniSpisuHromadne = false;
            defaultDto.ZmenitTerminSpisuHromadne = false;
            defaultDto.PriorovatHromadne = false;

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
