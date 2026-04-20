(function ($) {
    "use strict";
    namespace("Gordic.Ssl.Lists.PrehledPrace", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26256154"; //RC 26256154 : Přehled práce

            this.loadGridImmediately = this.SslCtiSezPar === 1;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_pprac01",
                ["dateIntervalRow", "filterSubjekt"],
                "FilterPanel"
            )

            // TODO - nelze pouzit tiskovou sestavu pres temp tabulku, kvuli duplicitnim zaznamum. Nema zadne RestrictionALF - ani neni akce v menu baru
            // Smysl dává operativni tisk přes grid. Ten dosud neni funkcni.

            this.actions.addRange({
                noact: { run: $.noop },
                /*   act2: { icon: "fa-bookmark", run: $.noop },
                   act3: { icon: "fa-book", run: $.noop },*/
            });

            this.menuBar(
                this.actions.createBar(["actDetailWfl*", "actOtevriDokumentDoNoveZalozkyVeStejneFazi*","-", "actPoznamkovyBlokPridatSsl*","-","actUzivatelskeSloupceVlastnostiWfl", "-", "actObcerstvitWfl"]) //RC 26255317 : Další
            );

            this.contextMenu = [
                {
                    action: this.actions.actUzivatelskeSloupceVlastnostiWfl,
                },
                {
                   action: this.actions.actPoznamkovyBlokPridatSsl,
                },
                {
                    action: this.actions.actObcerstvitWfl,
                },
            ];

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
                { caption: "jres:26255404", factor: "DZ" }, //RC 26255404 : Datum změny
            ];
            var filterForm = new Gordic.Forms.Form({ name: "FormPrehledPraceList", tabLabel: "jres:26256764", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" }) //RC 26256764 : Kompletní filtr
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
                })
                .addSection(Gordic.Wfl.Prefabs.FilterSubjekt({
                    name: "filterSubjekt",
                    model: "model.SelectedSubject.Ixs=value.Ixs;model.SelectedSubject.Name=value.Name;model.SelectedSubject.TypeIxs=value.TypeIxs;model.SelectedSubject.SubjectStructOrg=value.SubjectStructOrg;model.SelectedSubject.pIxs=value.pIxs",
                    typSubjektuFilter: Gordic.Ssl.Globals.Enums.TypSubjektuFilter.JEN_FUN,
                    label: "jres:26256953",
                    initialValue: this.model.SelectedSubject
                }, this)); //RC 26256953 : Za funkční místo

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

                .addDateTimeColumn({
                    name: "dat_zmena",
                    caption: "jres:26255404", //RC 26255404 : Datum změny
                })
                .addTextColumn({
                    name: "ixp",
                    caption: "jres:26255367", //RC 26255367 : PID
                    width: 120,
                 //   fixedWidth: true,
                })
                .addTextColumn({
                    name: "zmena_txt",
                    caption: "jres:26255699", //RC 26255699 : Úkon
                    width: 250,
                })
                .addTextColumn({
                    name: "poznamka",
                    caption: "jres:26255397", //RC 26255397 : Poznámka
                    width: 130,
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
                    width: 200,
                })
                .addTextColumn({ 
                    name: "zmenu_prov_txt",
                    caption: "jres:26257039", //RC 26257039 : Změnu provedl
                    width: 200,
                });

            this.AddUserColumnsToGridFormat(gridColumnsDefinition); // zvazit presun do funkce onGetGridData

            this.mainGrid.ggrid({
                name: "GridPrehledPrace",
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
                       // Gordic.Ssl.MainApp.ShowDetail(that, options);
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
                    return that.contextMenu;
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

    }, { extendIntellisense: GContent });
})(jQuery);
