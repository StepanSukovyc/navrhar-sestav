(function ($) {
    "use strict";
    namespace("Gordic.Ssl.Lists.VlastnostiDleUrovne", {
        //gridColumnsDefinition: new Gordic.Data.GridFormat(),

        onContentReady: function () {
            var that = this;
            this.title = "jres:26256969"; //RC 26256969 : Vlastnosti s úrovní

            this.loadGridImmediately = this.SslCtiSezPar === 1;

            this.actions.addRange({
                noact: { run: $.noop },
             /*   act2: { icon: "fa-bookmark", run: $.noop },
                act3: { icon: "fa-book", run: $.noop },*/
            });

            var subtaskParams = [];

            if(this.VlastnostiSUrovniDto.kybezEnabled) {
                subtaskParams.push({ caption: "jres:26256965", action: this.actions.actKYBEZ }); //RC 26256965 : KYBEZ

                this.KybezSubtaskSet();
            }
            if(this.VlastnostiSUrovniDto.sanonyEnabled) {
                subtaskParams.push({ caption: "jres:26256966", action: this.actions.actSanony }); //RC 26256966 : Šanony

                if (subtaskParams.length == 1) {
                    this.SanonySubtaskSet();
                }
            }
            if(this.VlastnostiSUrovniDto.formulareEnabled) {
                subtaskParams.push({ caption: "jres:26256967", action: this.actions.actFormulare }); //RC 26256967 : Formuláře

                if(subtaskParams.length == 1) {
                    this.FormulareSubtaskSet();
                }
            }

            $("<div>").appendTo(this.element)
                .gsubtasks({
                    params: subtaskParams
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
            var filtrIDokumentyVeSpisech = this.IsStaraMetodikaSsl;
            var filtrVcetneOdeslanychVisible = false;
            var filtrElektronickeVisible = false;
            var filtrZnackaVisible = false;
            var labelStringField = "jres:26256968"; //RC 26256968 : Vlastnost nebo hodnota

            if(this.model.SubTask != this.VlastnostiDleUrovneSubTask.KYBEZ) {
                labelStringField = "jres:26256970"; //RC 26256970 : Text začíná na
            }

            dateFactors = [
                { caption: "jres:26255459", factor: "DP" }, //RC 26255459 : Datum podání
                { caption: "jres:26255404", factor: "DZ" } //RC 26255404 : Datum změny
            ];

            this.printRestrictionALF = "dok_nev";

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
                       // daysRange: that.predplneniPocetDni
                    },
                    change: function (ev, obj) {

                    }
                });

         //   urovenVlastnosti = l_oDto.SubTask == VlastnostiDleUrovneSubTask.KYBEZ ? new GInt16(100) : new GInt16(10);

            if(this.model.SubTask == this.VlastnostiDleUrovneSubTask.KYBEZ) {
                filterForm.addSection(Gordic.Ssl.Prefabs.FilterDleStavu({ name: "filterStavDoc", model: "model.ZobrazitDokumentyFilter=value.id", modelSpZn: "FiltrSpZn", label: "jres:26257005", FiltrCjVisible: filtrCjVisible, FiltrVcetneOdeslanychVisible: filtrVcetneOdeslanychVisible, FiltrElektronickeVisible: filtrElektronickeVisible, FiltrZnackaVisible: filtrZnackaVisible, FiltrIDokumentyVeSpisech: filtrIDokumentyVeSpisech, initialValue: this.model.ZobrazitDokumentyFilter })); //RC 26257005 : Filtr
                this.model.UrovenVlastnosti = 100;
            } else {
                filterForm.addSection(Gordic.Ssl.Prefabs.FilterStavuProVlastnostiDleUrovne({ name: "filterStavDoc", model: "model.ZobrazitSanonyFormulareFilter=value.id", label: "jres:26255267", initialValue: this.model.ZobrazitSanonyFormulareFilter })); //RC 26255267 : Zobrazit
                this.model.UrovenVlastnosti = 10;
            }
            
            filterForm.addSection()
                .addRow({ label: labelStringField, required: false })
                .addField("gstringbox", {
                    name: "VlastnostNeboHodnotaField",
                    model: "VlastnostNeboHodnota",
                    initialValue: this.model.VlastnostNeboHodnota,
                    //validators: [
                    //    {
                    //        "message": "jres:26227184", //RC 26227184 : Musíte zadat minimálně 2 znaky.
                    //        "validate": function (value, changeObj) {
                    //            return value !== null && value.length >= 2;
                    //        },
                    //        "group": "customValidation"
                    //    }
                    //],
                })

           // if(this.model.SubTask != this.VlastnostiDleUrovneSubTask.KYBEZ) {
            filterForm.addSection(Gordic.Wfl.Prefabs.FilterSubjekt({ name: "filterSubjekt", model: "model.SelectedSubject.Ixs=value.Ixs;model.SelectedSubject.Name=value.Name;model.SelectedSubject.TypeIxs=value.TypeIxs;model.SelectedSubject.SubjectStructOrg=value.SubjectStructOrg;model.SelectedSubject.pIxs=value.pIxs", initialValue: this.model.SelectedSubject, /*typSubjektuFilter: Gordic.Ssl.Globals.Enums.TypSubjektuFilter.AKTFUN_AKTSU,*/ label: "jres:26255855" }, this)); //RC 26255855 : Vlastnictví
           // }

            return [filterForm]; 
        },
        LoadGrid: function () {
            var that = this;
            this.gridColumnsDefinition = new Gordic.Data.GridFormat();

            this.gridColumnsDefinition.addIconColumn(this.VysledekOperaceIcoColumn());

            if(this.IsStaraMetodikaSsl) {
                Gordic.Wfl.GWflCommonDlg.AddDokumentySimpleColumnsDlg(this.gridColumnsDefinition, {}); // pro starou metodiku
            } else {
                Gordic.Wfl.GWflCommonDlg.AddDokumentyColumnsDlg(this.gridColumnsDefinition, {}); // pro novou metodiku
            }

            this.gridColumnsDefinition.addTextColumn(Gordic.Wfl.Globals.ListSupport.PrizKopieColumn());

            if(!this.IsStaraMetodikaSsl) {
                this.gridColumnsDefinition.addTextColumn(Gordic.Wfl.Globals.ListSupport.PrizCjColumn());
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
                    sortOrder: Gordic.Ssl.Utils.SortSpzn,
                })
                .addTextColumn({
                    name: "cj_spis",
                    caption: this.SpZnText,
                    width: 200,
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
                    name: "nazev_fun_akt",
                    caption: "jres:26255398", //RC 26255398 : Vlastník
                    width: 200,
                })
                .addTextColumn({
                    name: "nazev_su_akt",
                    caption: "jres:26256972", //RC 26256972 : Na spisovém uzlu
                    width: 200,
                })
                .addDateTimeColumn({
                    name: "dat_pod",
                    caption: "jres:26257387", //RC 26257387 : Datum podání / založení
                });

            if(!this.IsStaraMetodikaSsl) {
                this.gridColumnsDefinition.addDateColumn({
                    name: "dat_vyriz_do",
                    caption: "jres:26255641", //RC 26255641 : Termín dok.
                    width: 100,
                  //  fixedWidth: true,
                })
            }

            this.gridColumnsDefinition
                .addDateColumn({
                    name: "dat_vyriz_do_spis",
                    caption: "jres:26256975", //RC 26256975 : Termín spisu
                    width: 100,
                    //   fixedWidth: true,
                })
                .addDateColumn({
                    name: "dat_vyriz",
                    caption: "jres:26256978", //RC 26256978 : Datum vyřízení
                    width: 100,
                    //    fixedWidth: true,
                });

            if (this.gin_n23_vecsk == 0 || !this.TestMinDbVersionProVecneSkupiny) {
                this.gridColumnsDefinition
                    .addTextColumn({
                        name: "spis_pl",
                        caption: "jres:26256979", //RC 26256979 : Spis. plán
                    })
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
            }

            this.gridColumnsDefinition
                .addTextColumn({
                    name: "ixs_typ_txt",
                    caption: this.gin_n23_vecsk == 0 ? "jres:31937228" : "jres:26257355", //RC 31937228 : Typ dokumentu RC 26257355 : Druh dokumentu
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

           // this.AddUserColumnsToGridFormat(this.gridColumnsDefinition); // zde se presunulo do onGetGridData

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
                searchColumns: ["ixp", "akt_znacka", "misto_vzniku", "nazev", "dat_zmena", "vlastnik", "dat_pod", "dat_vyriz_do", "spis_znak", "ixs_typ_txt", "uziv_sl_1", "uziv_sl_2", "uziv_sl_3", "uziv_sl_4"], //sloupce, podle kterych se vyhledava v searchboxu
                columns: this.gridColumnsDefinition,
            });

            this.LoadData();
        },
        onGetGridData: function (GridData) {
            // pridani sloupcu az na zaklade hodnot v datech. Problem je ten, ze data dostavam az po definici sloupcu. Musim tedy sloupce pridavat dodatecne, ale grid je nacita az v okamziku prekresleni a diky referenci to zafunguje
            var that = this;

            if (this.TableVla != null && GridData != null && GridData.length > 0) {
                var rowGD = GridData[0];

                for(var i = 0; i < this.TableVla.length; i++) {
                    var row = this.TableVla[i];

                    if(row.s_view_detail != null && row.s_view_detail != 0 && row.uroven_vla == this.UrovenVlastnosti) {
                        var alias = "";

                        if(this.model.SubTask == this.VlastnostiDleUrovneSubTask.KYBEZ) {
                            alias = "vla_ginvvla" + i;
                        } else {
                            alias = "vla_ginvvla" + row.ixs_vla;
                        }

                        var colExist = rowGD[alias] != null;
                       // eval('colExist = rowGD.' + alias + ' != null'); // eval nemohu pouzit diky minifikaci

                        if(colExist) {
                            var existingColumn = this.gridColumnsDefinition.get(row.nazev);

                            if(existingColumn == null) {
                                this.gridColumnsDefinition
                                    .addTextColumn({
                                        name: alias,
                                        caption: row.nazev,
                                        width: 200,
                                        fixedWidth: false,
                                    })
                           }
                        }
                    }
                }
            }

            this.AddUserColumnsToGridFormat(this.gridColumnsDefinition);
        },
        VyberRadkuClick: function (rowData) {
            var that = this;

      
        },
        KybezSubtaskSet: function () {
            this.model.SubTask = this.VlastnostiDleUrovneSubTask.KYBEZ;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_pvlau01",
                ["dateIntervalRow", "filterStavDoc", "VlastnostNeboHodnotaField", "filterSubjekt"],
                "FilterPanelKYBEZ"
            )
        },
        SanonySubtaskSet: function () {
            this.model.SubTask = this.VlastnostiDleUrovneSubTask.Sanony;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_pvlau02",
                ["dateIntervalRow", "filterStavDoc", "VlastnostNeboHodnotaField", "filterSubjekt"],
                "FilterPanelSanony"
            )
        },
        FormulareSubtaskSet: function () {
            this.model.SubTask = this.VlastnostiDleUrovneSubTask.Formulare;

            this.SetParamsSubtaskFilterPanel(
                "ssl_ptm_pvlau03",
                ["dateIntervalRow", "filterStavDoc", "VlastnostNeboHodnotaField", "filterSubjekt"],
                "FilterPanelFormulare"
            )
        },

        KybezClick: function () {
            this.KybezSubtaskSet();

            this.PrepareSubtask();
        },
        SanonyClick: function () {
            this.SanonySubtaskSet();

            this.PrepareSubtask();
        },
        FormulareClick: function () {
            this.FormulareSubtaskSet();

            this.PrepareSubtask();
        },

        VlastnostiDleUrovneSubTask: {
            Neurceno: 0,
            KYBEZ: 1,
            Sanony: 2,
            Formulare: 3
        },


        //#region Menu

        CreateMenu: function () {
            this.ZaregistrujHromadneAkce();
            // this.enableHromadneAkce(); // TODO

            var lokalniAkceBefore = [
                { action: "actDetailWfl", favorite: true },
                { action: "actOtevriDokumentDoNoveZalozkyVeStejneFazi", favorite: true },
                { type: "separator", id: "sep1" },
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

            var visible = this.model.SubTask != this.VlastnostiDleUrovneSubTask.Neaktivni;

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
            defaultDto.ZmenitPocetUlozenoListu = false;
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
            defaultDto.PredatDokumentyExtAgHromadne = visible;
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
            defaultDto.OznacitJakoPrecteneHromadne = visible;
            defaultDto.OznacitJakoNeprecteneHromadne = visible;
            defaultDto.TiskListWfl = visible;
            defaultDto.TiskPevny = visible;
            defaultDto.Obcerstvit = visible;

            // konec specifické sekce

            return defaultDto;
        },

        getEnableHromadneAkceDto: function () {
            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto();

            var vyrizeneView = this.model.SubTask == this.VlastnostiDleUrovneSubTask.Vyrizene;

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

            return defaultDto;
        },

        getFavoriteHromadneAkceDto: function () {
            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto(false);

            // Defaultně jsou všechny true.

            defaultDto.PredatPrimo = true;
            defaultDto.PridelitHromadne = true;
            defaultDto.VlozitDokEpkHromadne = true;

            return defaultDto;
        }

        //#endregion

    }, { extendIntellisense: GContent });
})(jQuery);
