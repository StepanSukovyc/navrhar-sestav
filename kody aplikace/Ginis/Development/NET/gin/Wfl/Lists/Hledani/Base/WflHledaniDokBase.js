(function ($) {
    "use strict";
    namespace("Gordic.Wfl.Hledani.HledaniDokBase", {

        PrepareHledani: function (opt) {

            var that = this;

            

            if (opt != null) {
                if (opt.essFlag != null) {
                    this.essFlag = opt.essFlag;             // thazmuka (29.4.2025) - příznak použití hledačky v ESS05
                }
                if (opt.customElement != null) {
                    this.customElement = opt.customElement;
                }
            }

            /*this.findFields()
                .gfield("model", "apply", this.model)
                .gfield("model", "validators", this.validators);*/

            //this.menuBar(
            //    this.actions.createBar(["actDetailWfl*", "actTiskListWfl*", "-", "actObcerstvitWfl"])
            //);

            if(this.CreateMenu) {
                this.CreateMenu();
            }

            this.printRestrictionALF = "hled";

            this.mainGrid = $("<div>")
                .appendTo(this.customElement != null ? this.customElement : this.element)
                //   .css("height", "calc(100% - " + this.defaultForm.height() + "px)")
                //   .height(400)
                .gautofit();
        },
        LoadGrid: function () {
            var that = this;

            var gridColumnsDefinition = new Gordic.Data.GridFormat();

            gridColumnsDefinition.addIconColumn(this.VysledekOperaceIcoColumn());

            if(this.TypVysledkuHledani == 0) { // DokumentyWfl

                if (this.IsStaraMetodikaSsl) {
                    Gordic.Wfl.GWflCommonDlg.AddDokumentySimpleColumnsDlg(gridColumnsDefinition, {}); // pro starou metodiku
                } else {
                    Gordic.Wfl.GWflCommonDlg.AddDokumentyColumnsDlg(gridColumnsDefinition, {}); // pro novou metodiku
                }

                gridColumnsDefinition
                    .addTextColumn(Gordic.Wfl.Globals.ListSupport.PrizKopieColumn())
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
                        caption: "jres:26225442", //RC 26225442 : PID
                        width: 110,
                      //  fixedWidth: true,
                    })
                    .addTextColumn({
                        name: "akt_znacka",
                        caption: this.ZnackaShortText,
                        width: 120,
                      //  fixedWidth: true,
                        sortOrder: Gordic.Ssl.Utils.SortSpzn,
                    })
                    .addTextColumn({
                        name: "cj_spis",
                        caption: this.SpZnText,
                        width: 200,
                    })
                    .addTextColumn({
                        name: "nazev",
                        caption: "jres:26225443", //RC 26225443 : Věc
                        width: 250,
                    });

                if(this.sslHledZvecpPar != 0) {
                    gridColumnsDefinition
                        .addHtmlColumn({
                            name: "obsah_text",
                            caption: "jres:26227936", //RC 26227936 : Věc podrobně
                            width: 350,
                            cellTemplate: function (row) {
                                var vecPodrobne = "";

                                if(row.obsah_text) {
                                    vecPodrobne = row.obsah_text.replaceAll('\\n', ' ');
                                }

                                return vecPodrobne;
                            },
                            filter: [new Gordic.Data.Filters.GTextFilterVariant("obsah_text")]
                        });
                 }

                gridColumnsDefinition
                    .addTextColumn({
                        name: "nazev_su_akt",
                        caption: "jres:26225444", //RC 26225444 : Na spisovém uzlu
                        width: 200,
                    })
                    .addTextColumn({
                        name: "nazev_fun_akt",
                        caption: "jres:26225445", //RC 26225445 : U referenta
                        width: 200,
                    })
                    .addTextColumn({
                        name: "misto_vzniku",
                        caption: "jres:26225446", //RC 26225446 : Odesílatel
                        width: 250,
                    })
                    .addTextColumn({
                        name: "nazev_typ",
                        caption: this.gin_n23_vecsk == 0 ? "jres:26227898" : "jres:26228102", //RC 26227898 : Typ dokumentu či spisu RC 26228102 : Druh dokumentu či spisu
                        width: 200,
                    })
                    .addDateColumn({
                        name: "dat_pod",
                        caption: "jres:26228117", //RC 26228117 : Datum podání / založení
                        width: 100,
                     //   fixedWidth: true,
                    });

                if(!this.IsStaraMetodikaSsl) {
                    gridColumnsDefinition.addDateColumn({
                        name: "dat_vyriz_do",
                        caption: "jres:26225618", //RC 26225618 : Termín dok.
                        width: 100,
                     //   fixedWidth: true,
                    })
                }

                // (thazmuka 1.8.2023)
                gridColumnsDefinition.addDateColumn({
                    name: "dat_vyriz_do_spis",
                    caption: "jres:32000937", //RC 32000937 : Termín spisu
                    width: 130,
                })

                gridColumnsDefinition.addDateColumn({
                        name: "dat_vyriz",
                        caption: "jres:26225289", //RC 26225289 : Datum vyřízení
                        width: 100,
                      //  fixedWidth: true,
                    })
                    .addTextColumn({
                        name: "znacka_odes",
                        caption: "jres:26227921", //RC 26227921 : Značka odesílatele
                    })

                if (this.gin_n23_vecsk == 0 || !this.TestMinDbVersionProVecneSkupiny) {
                    gridColumnsDefinition
                        .addTextColumn({
                            name: "spis_pl",
                            caption: "jres:26227457", //RC 26227457 : Spis. plán
                        })
                        .addTextColumn({
                            name: "spis_znak",
                            caption: "jres:26227458", //RC 26227458 : Spis. znak
                            filter: [new Gordic.Wfl.Utils.GTextFilterFullTextStartsWith("spis_znak"), new Gordic.Data.Filters.GSelectionFilterVariant("spis_znak", { columnName: "spis_znak", columnType: "text" })]
                        })
                        .addTextColumn({
                            name: "skar_znak",
                            caption: "jres:26227459", //RC 26227459 : Skar. znak (dle spis. plánu, znaku)
                            width: 30,
                        })
                        .addNumberColumn({
                            name: "skar_lhuta",
                            caption: "jres:26227460", //RC 26227460 : Skar. lhůta (dle spis. plánu, znaku)
                            width: 30,
                        })
                        .addTextColumn({
                            name: "skar_znak2",
                            caption: "jres:26227461", //RC 26227461 : Skar. znak
                            width: 30,
                        })
                        .addNumberColumn({
                            name: "skar_lhuta2",
                            caption: "jres:26227462", //RC 26227462 : Skar. lhůta
                            width: 30,
                        });
                }

                if(this.gin_n23_vecsk != 0 && this.TestMinDbVersionProVecneSkupiny == true) {
                    gridColumnsDefinition
                        .addTextColumn({
                            name: "vsk_nazev",
                            caption: "jres:26228072", //RC 26228072 : Věcná skupina - Název
                        })
                        .addTextColumn({
                            name: "vsk_spis_znak",
                            caption: "jres:26228073", //RC 26228073 : Věcná skupina - Spis. znak
                            tooltipTemplate: (value) => {
                                return value.vsk_spis_znak;
                            }
                        })
                        .addTextColumn({
                            name: "vsk_skar_rezim",
                            caption: "jres:32001113", //RC 32001113 : Skartační režim (Věcná skupina)
                            width: 250,
                        })
                        .addTextColumn({
                            name: "vsk_skar_znak",
                            caption: "jres:32001115", //RC 32001115 : Skar. znak (Věcná skupina)
                            width: 30,
                        })
                        .addNumberColumn({
                            name: "vsk_skar_lhuta",
                            caption: "jres:32001116", //RC 32001116 : Skar. lhůta (Věcná skupina)
                            width: 30,
                        })
                        .addTextColumn({
                            name: "uzav_spis_skar_rezim",
                            caption: "jres:32001117", //RC 32001117 : Skartační režim (Uzavřený spis)
                            width: 250,
                        })
                }
    
                if (this.wfl_typspisy != 0) {
                    gridColumnsDefinition
                     .addTextColumn({
                         name: "typ_spis_nazev",
                         caption: "jres:32001101", //RC 32001101 : Typový spis (název)
                         width: 200,
                     });
                }

                gridColumnsDefinition
                    .addTextColumn({
                        name: "uziv_sl_1",
                        caption: this.UzivSlC,
                    })
                    .addTextColumn({
                        name: "uziv_sl_2",
                        caption: this.UzivSlD,
                    })
                    .addTextColumn({
                        name: "uziv_sl_3",
                        caption: this.UzivSlC2,
                    })
                    .addTextColumn({
                        name: "uziv_sl_4",
                        caption: this.UzivSlD2,
                    });
            } else { // ElSouboryWfl

                gridColumnsDefinition
                    .addIconColumn(Gordic.Wfl.Globals.ListSupport.TypDokumentuColumn())
                    .addIconColumn(Gordic.Wfl.Globals.ListSupport.EleColumn())
                    // oblast
                    .addTextColumn({
                        name: "oblast_txt",
                        caption: "jres:32001104", //RC 32001104 : Oblast nalezení
                        width: 200,
                    })
                    // titulek
                    .addTextColumn({
                        name: "popis",
                        caption: "jres:32001106", //RC 32001106 : Titulek
                        width: 200,
                    })
                    // popis
                    .addTextColumn({
                        name: "popis_dms",
                        caption: "jres:32001105", //RC 32001105 : Popis
                        width: 200,
                    })
                    // id souboru
                    .addTextColumn({
                        name: "ixb",
                        caption: "jres:32001107", //RC 32001107 : ID souboru
                        width: 200,
                    })
                    // soubor
                    .addTextColumn({
                        name: "soubor",
                        caption: "jres:32001108", //RC 32001108 : Soubor
                        width: 200,
                    })
                    // písemnost
                    .addTextColumn({
                        name: "ixp",
                        caption: "jres:26225442", //RC 26225442 : PID
                        width: 100,
                    })
                    // značka
                    .addTextColumn({
                        name: "akt_znacka",
                        caption: this.ZnackaShortText,
                        width: 120,
                        fixedWidth: false,
                        sortOrder: Gordic.Ssl.Utils.SortSpzn,
                    })

                    // věcná skupina /spis.znak
                    if (this.gin_n23_vecsk != 0 && this.TestMinDbVersionProVecneSkupiny == true) {
                        gridColumnsDefinition
                            .addTextColumn({
                                name: "vsk_nazev",
                                caption: "jres:26228072", //RC 26228072 : Věcná skupina - Název
                            })
                            .addTextColumn({
                                name: "vsk_spis_znak",
                                caption: "jres:26228073", //RC 26228073 : Věcná skupina - Spis. znak
                                tooltipTemplate: (value) => {
                                    return value.vsk_spis_znak;
                                },
                            })
                    }
                    else
                    {
                        gridColumnsDefinition
                            .addTextColumn({
                                name: "spis_pl",
                                caption: "jres:26227457", //RC 26227457 : Spis. plán
                            })
                            .addTextColumn({
                                name: "spis_znak",
                                caption: "jres:26227458", //RC 26227458 : Spis. znak
                                filter: [new Gordic.Wfl.Utils.GTextFilterFullTextStartsWith("spis_znak"), new Gordic.Data.Filters.GSelectionFilterVariant("spis_znak", { columnName: "spis_znak", columnType: "text" })]
                            })
                    }

                    gridColumnsDefinition
                    // věc
                        .addTextColumn({
                            name: "nazev",
                            caption: "jres:26225443", //RC 26225443 : Věc
                            width: 100,
                        })
                    // na spisovém uzlu
                    gridColumnsDefinition
                        .addTextColumn({
                            name: "nazev_su_akt",
                            caption: "jres:26225444", //RC 26225444 : Na spisovém uzlu
                            width: 200,
                        })
                    // vlastník
                    gridColumnsDefinition
                    .addTextColumn({
                        name: "nazev_fun_akt",
                        caption: "jres:26225445", //RC 26225445 : U referenta
                        width: 200,
                    })
                    .addTextColumn({
                        name: "misto_vzniku",
                        caption: "jres:26225446", //RC 26225446 : Odesílatel
                        width: 100,
                    })
                    gridColumnsDefinition
                    .addDateColumn({
                        name: "dat_pod",
                        caption: "jres:26225290", //RC 26225290 : Datum podání
                        width: 100,
                    });

            }

            this.AddUserColumnsToGridFormat(gridColumnsDefinition);

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

                        if (that.essFlag === true) {
                            return;
                        }

                        var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                        var options = {
                            DetailDto: { ixp: rowData.ixp },
                            EditMode: false,
                            grid: that.mainGrid
                        };

                        Gordic.Wfl.Dialogs.DetailDokumentuSpisu(that, options);
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
                multi: true,

                //     scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                searchColumns: ["ixp", "akt_znacka", "cj_spis", "nazev", "obsah_text", "nazev_su_akt", "nazev_fun_akt", "misto_vzniku", "dat_pod", "dat_vyriz_do", "dat_vyriz", "uziv_sl_1", "uziv_sl_2", "uziv_sl_3", "uziv_sl_4"], //sloupce, podle kterych se vyhledava v searchboxu
                columns: gridColumnsDefinition,
            });



            this.LoadData();
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

            // konec specifické sekce

            return defaultDto;
        },

        getEnableHromadneAkceDto: function () {
            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto();

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