(function ($) {
    "use strict";
    namespace("Gordic.Ssl.Lists.Nerozdelene", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26256866"; //RC 26256866 : Rozdělení dokumentů/spisů převzatých na uzel

            this.printRestrictionALF = "dok_ner";
            this.loadGridImmediately = this.SslCtiSezPar === 1;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_pnero01",
                ["suField", "funField"],
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

            //var fields = this.findFields();//
            //fields.gfield("model", "apply", this.model);//
        },
        CreateFilterForms: function () {
            var that = this;
            var filterForm = new Gordic.Forms.Form({ name: "FormNerozdeleneList", tabLabel: "jres:26256764", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" }) //RC 26256764 : Kompletní filtr
                .addSection()
                .addRow("jres:26255693").addField("gselectbox", "w-4", //RC 26255693 : Přebírající
                    Gordic.Gin.Fields.ginspodSSU(
                        {
                            name: "suField",
                            model: "IxsSu = ixs_su",
                            initialValue: { ixs_su: this.model.IxsSu },
                            serverFilters: {
                                aktivita: [100],
                            },
                            change: function (ev, data) {
                                that.AnableActions(data);
                            }
                        }, false))
                .addField("gselectbox", "w-8",
                        Gordic.Gin.Fields.ginsfunSSU(
                            {
                                name: "funField",
                                model: "IxsFun = ixs_fun",
                                initialValue: { ixs_fun : this.model.IxsFun },
                                serverFilters: {
                                    aktivita: [100],
                                 //   VazbaNaSpisovyDenik: l_bVazbaNaSpisDenik,
                                    ixs_su: new Gordic.Forms.Dependency("suField", "ixs_su", false)
                                },
                                change: function (ev, data) {
                                    that.AnableActions(data);
                                }
                            }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO, "suField"))
                ;

            return [filterForm];
        },
        LoadGrid: function () {
            var that = this;
            var gridColumnsDefinition = new Gordic.Data.GridFormat();

            gridColumnsDefinition.addIconColumn(this.VysledekOperaceIcoColumn());

            Gordic.Wfl.GWflCommonDlg.AddDokumentyColumnsDlg(gridColumnsDefinition, {}); // extendObj nepovinné

            gridColumnsDefinition

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
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26255640", //RC 26255640 : Věc-obsah
                    width: 250,
                })
                .addDateTimeColumn({
                    name: "dat_zmena",
                    caption: "jres:26255404", //RC 26255404 : Datum změny
                })
                .addDateTimeColumn({
                    name: "dat_pod",
                    caption: "jres:26257387", //RC 26257387 : Datum podání / založení
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

            this.AddUserColumnsToGridFormat(gridColumnsDefinition); // zvazit presun do funkce onGetGridData

            this.mainGrid.ggrid({
                name: "GridNerozdelene",
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
                searchColumns: ["ixp", "akt_znacka", "misto_vzniku", "nazev", "dat_zmena", "dat_pod", "uziv_sl_1", "uziv_sl_2", "uziv_sl_3", "uziv_sl_4"], //sloupce, podle kterych se vyhledava v searchboxu
                columns: gridColumnsDefinition,
            });

            this.LoadData();
        },
        VyberRadkuClick: function (rowData) {
            var that = this;


        },
        AnableActions: function (data) {
            var enabled = false;

            if (data.value && data.value.ixs_fun && data.value.ixs_fun != "" && this.GridCreated()) {
                enabled = true;
            }

            this.actions.actPredatNerozdelene.enabled(enabled);
        },
        PredatNerozdeleneClick: function () {
            var that = this;

            this.findFields().gfield("model", "collect", this.model);

            var selectedRowsInfo = that.GetSelectedRowsInfoFromList();

            if(selectedRowsInfo.length > 0) {
                this.call("PredatNerozdelene", { selectedRowsInfo: selectedRowsInfo, model: this.model })
                    .done(function (rv) {
                        if(rv.PrintProtocol === true) {
                            that.PredavaciProtokolInfo = { ixsFunPredavajici: that.IxsFunAkt, ixsFunPrebirajici: that.model.IxsFun };
                            that.TiskPredavacihoProtokolu();
                        }
                        that.Reload();
                    });
            }
        },

        //#region Menu

        CreateMenu: function () {
            this.ZaregistrujHromadneAkce();

            var lokalniAkceBefore = [
                { action: "actDetailWfl", favorite: true },
                { action: "actOtevriDokumentDoNoveZalozkyVeStejneFazi", favorite: true },
                { action: "actPredatNerozdelene", favorite: true },
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
