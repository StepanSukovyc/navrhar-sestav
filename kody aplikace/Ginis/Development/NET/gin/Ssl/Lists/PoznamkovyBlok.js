(function ($) {
    "use strict";
    namespace("Gordic.Ssl.Lists.PoznamkovyBlok", {
        PracBlokNamePom: null,
        IxpProGenSablon: [],
        PrintUserHeaderUserSettingsID: "PrintUserHeader",

        onContentReady: function () {
            var that = this;
            this.UpdateTitle();

            this.loadGridImmediately = this.SslCtiSezPar === 1;
            
            this.CreateMenu();

            // samotná definice gfilterpanelu
            this.filterForm = $("<div>")
                .appendTo(this.element)
                .on("gfilterpanelapply", function (event, obj) {         // eventa která je vyvolána při vyhledávání. obj.filter -> hledaný seznam podmínek
                    that.Reload(obj.filter);
                    that.enableAkcePoVyhledani();
                // 02.08.2022 - TFeik
                // Zrušení duplicitního vytváření filterpanelu.
                //}).gfilterpanel({
                //    forms: null, // poleFormu ktere budou pouzity pro podminky
                //    simpleMode: true,
                //    favoriteLayoutDescriptor: "L3M2S1",
                });

            //var ixsBlpDefault = that.globalSettings?.get("Global.Ssl.AppSettings.ListNotepadDokSpis.IdDefault");

            //if(ixsBlpDefault != null) {
            //    this.model.IxsBlp = ixsBlpDefault;
            //}

            this.PrepareSubtask();
        },
        CreateFilterForms: function () {
            var that = this;

            this.printRestrictionALF = "poz_blo";

            var filterForm = new Gordic.Forms.Form({ name: "FormPracBlokList", tabLabel: "jres:26256764", layoutDescriptor: "L2M2S1, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" }); //RC 26256764 : Kompletní filtr
                
            filterForm.addSection()
                .addRow("jres:26256912").addField("gstringbox", { //RC 26256912 : Název bloku
                    name: "nazevBlokuField",
                    disabled: true, // TODO
                    initialValue: this.model.PracBlokName,
                    model: "model.PracBlokName",
                    change: function (ev, changeObj) {
                        if (changeObj.value != null) {
                            that.model.PracBlokName = changeObj.value;
                            that.UpdateTitle();
                        }
                    },
                    buttons: [
                        {
                            icon: 'fa-ellipsis-h',
                            requireEdit: false,
                            action: new GAction({
                                name: 'actSelectBlok',
                                run: function (ev, ctx) {
                                    that.PracovniBlokSelector(ev);
                                }
                            })
                        }
                    ]
                })
                .addRow("jres:26257092") //RC 26257092 : Filtr vlastnictví dokumentu
                .addField("gselectbox", {
                    name: "filterSPrij",
                    //  multi: true,
                    list: true,
                    //verticalButtons: true,
                    itemTemplate: "{nazev}",
                    itemWidth: "",
                    //helperColumns: ["nazev"],
                    itemClass: function (value) {
                        if (value.disabled) {
                            return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
                        }
                    },
                    data: new Gordic.Data.View([
                        { nazev: "jres:26255733", id: 1 }, //RC 26255733 : Všechny
                        { nazev: "jres:26257420", id: 2 }, //RC 26257420 : Doručené
                        { nazev: "jres:26255345", id: 3 } //RC 26255345 : Vlastní
                    ], { key: "id" }),
                    initialValue: { id: this.model.ZobrazitVlastnictviFilter },
                    model: "model.ZobrazitVlastnictviFilter = value.id",
                    /* change: function (ev, selected) {

                     },*/
                })
                .addRow("jres:26257005") //RC 26257005 : Filtr
                .addField("gselectbox", {
                    name: "filterPrizSpis",
                    multi: true,
                    list: true,
                    //verticalButtons: true,
                    itemTemplate: "{nazev}",
                    itemWidth: "",
                    //helperColumns: ["nazev"],
                    itemClass: function (value) {
                        if (value.disabled) {
                            return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
                        }
                    },
                    data: new Gordic.Data.View([
                        { nazev: "jres:26257088", id: 1 }, //RC 26257088 : Dokumenty mimo spis
                        { nazev: "jres:26257087", id: 2 }, //RC 26257087 : Dokumenty ve spisu
                        { nazev: "jres:26257093", id: 3 } //RC 26257093 : Spis
                    ], { key: "id" }),
                  //  initialValue: { id: this.model.ZobrazitPrizSpisFilter },
                    initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(this.model.ZobrazitPrizSpisFilter),
                    model: "model.ZobrazitPrizSpisFilter = value.id",
                    /* change: function (ev, selected) {

                     },*/
                });

            //filterForm.addSection(Gordic.Ssl.Prefabs.FilterDleStavu({
            //    name: "filterStavDoc",
            //    model: "model.ZobrazitDokumentyFilter=value.id",
            //    modelSpZn: "FiltrSpZn",
            //    label: "jres:26257005",
            //    FiltrCjVisible: false,
            //    FiltrVcetneOdeslanychVisible: false,
            //    FiltrElektronickeVisible: false,
            //    FiltrZnackaVisible: false,
            //    FiltrIDokumentyVeSpisech: false,
            //    FiltrDokumentyMimoSpis: true,
            //    FiltrDokumentyVeSpisu: true,
            //    initialValue: this.model.ZobrazitDokumentyFilter
            //    }
            //)); //RC 26257005 : Filtr

            return [filterForm];
        },
        UpdateNazevBloku: function (blokName) {
            this.findFields("nazevBlokuField").gfield("setValue", blokName);
        },
        UpdateTitle: function () {
            // " ... operativní složka, pracovní blok, schránka, dříve poznámkový blok, ... navrhněte lepší název"
            var title = "jres:26256855"; //RC 26256855 : Pracovní blok

            if (this.model.PracBlokName != "") {
                title = title + " [" + this.model.PracBlokName + "]";
            }
           // this.title = title;
            this.title = title;
        },

        // *** Vyber pracovniho bloku ***

        PracovniBlokSelector: function (ev) {
            var that = this;
            this.beginOperation();

            Gordic.Wfl.Utils.SeznamPracovnichBloku(Gordic.Wfl.Globals.Enums.TypBlp.dokspis, this)
                .done(function (data) {
                    var dialogOpts = {
                        autoClose: false,
                        related: $(ev.currentTarget), // this.element NOTE: Musi byt table, jinak zlobi padding a pozice.
                        // commandBar: [],
                        // closeButton: null,
                        //close: (ev, ctx) => {

                        //}
                        width: 400,
                    }
                    var isImmediateClose = true;
                    if (isImmediateClose) {
                        dialogOpts.createClosed = true; //NOTE: Musi byt vytvoreno skryte a az po vytvoreni otevrit, aby se vyvolala udalost 'open' v momente, kdy jsou jiz registrovane ev. handlery
                    }

                    that.foldersDlg = Gordic.InlineDialogs.simpleForm({
                        formDescriptor: that.CreatePracovniBlokyForm(data),
                        data: { test: "test" },
                        options: dialogOpts
                    });

                    that.foldersDlg.ginlinedialog("open");

                    that.foldersDlg.on("close", function (ev, data, meta) {
                        if (meta.type != "cancel") {
                            that.UpdateNazevBloku(that.PracBlokNamePom);
                            that.Reload();
                        }
                    });

                    that.endOperation();

                })
                .fail(function (msg) {
                    that.endOperation();
                    that.showFlash("jres:26256913" + " " + msg, "g-state-error"); //RC 26256913 : Nepodařilo se načíst seznam pracovních bloků.
                });
        },
        CreatePracovniBlokyForm: function (data) {
            var that = this;

            var form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1 LMS-0-12-0" });

            var view = new Gordic.Data.View(data, { key: "name"/*, processors: { tree: treeProcessor }*/ });

            var gridOptions = {
                defaultAction: new GAction({ //obsluzna akce, ktera se spousti dbl clickem nad radkem
                    name: "gridPracBlokySelectAct",
                    run: function (ev, ctx) {
                        var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek

                        that.IxsBlp = rowData.ixs_blp;
                        that.model.IxsBlp = rowData.ixs_blp;
                        that.PracBlokNamePom = rowData.nazev;

                        that.foldersDlg.ginlinedialog("close");
                    }
                }),
                //selection: 
                cellActivate: function (ev, row) {
                    if (row != null && row.cellInfo != null && row.cellInfo.data != null) {
                        var rowData = row.cellInfo.data; //data, ze kterych byl vytvoren radek

                        that.IxsBlp = rowData.ixs_blp;
                        that.model.IxsBlp = rowData.ixs_blp;
                        that.PracBlokNamePom = rowData.nazev;
                    }
                },
                data: view,
                columnMode: "fit",
                columns: new Gordic.Data.GridFormat()
                    .addIconColumn({
                        name: "icon",
                        caption: "jres:26256855", //RC 26256855 : Pracovní blok
                        width: 30,
                        customClass: "center",
                      //  fixedWidth: true,
                        iconTemplate: function (row) {
                            return { icon: "gi-calendar-interval", tooltip: "jres:26256855" }; //RC 26256855 : Pracovní blok
                        }
                    })
                    .addTextColumn({
                        name: "nazev",
                        caption: "jres:26255451", //RC 26255451 : Název
                        width: 150,
                      //  fixedWidth: true,
                    })
                    .addTextColumn({
                        name: "poznamka",
                        caption: "jres:26255397", //RC 26255397 : Poznámka
                        width: 200,
                      //  fixedWidth: true,
                    })
            };
            form.addField("ggrid", gridOptions);

            return form;
        }, 


        LoadGrid: function () {
            var that = this;
            var gridColumnsDefinition = new Gordic.Data.GridFormat();

            gridColumnsDefinition.addIconColumn(this.VysledekOperaceIcoColumn());

            // nove ikonove sloupce
            Gordic.Wfl.GWflCommonDlg.AddDokumentyColumnsDlg(gridColumnsDefinition, {}); // extendObj nepovinné

            gridColumnsDefinition
                /* .addIconColumn(Gordic.Wfl.Globals.ListSupport.TypDokumentuColumn())
                 .addIconColumn(Gordic.Wfl.Globals.ListSupport.EleColumn())
                 .addIconColumn(Gordic.Wfl.Globals.ListSupport.StavDokColumn())*/
                .addTextColumn(Gordic.Wfl.Globals.ListSupport.PrizKopieColumn())
                .addIconColumn(Gordic.Wfl.Globals.ListSupport.PrizBalikColumn())
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
                .addIconColumn(Gordic.Wfl.Globals.ListSupport.DelegateStavSmazaniIcon())
                .addTextColumn({
                    name: "ixp",
                    caption: "jres:26255367", //RC 26255367 : PID
                    width: 120,
                    //  fixedWidth: true,
                })
                .addTextColumn({
                    name: "cj",
                    caption: this.ZnackaShortText,
                    width: 130,
                    //    fixedWidth: true,
                })
                .addTextColumn({
                    name: "cj_spis",
                    caption: this.SpZnackaShortText,
                    width: 130,
                    //   fixedWidth: true,
                })
                .addTextColumn({
                    name: "vec",
                    caption: "jres:26255640", //RC 26255640 : Věc-obsah
                    width: 250,
                })
                .addTextColumn({
                    name: "odesilatel",
                    caption: "jres:26255430", //RC 26255430 : Odesílatel
                    width: 200,
                })
                .addTextColumn({
                    name: "vlastnik",
                    caption: "jres:26255398", //RC 26255398 : Vlastník
                    width: 150,
                })
                .addTextColumn({
                    name: "nazev_su_akt",
                    caption: "jres:26257432", //RC 26257432 : Na spisovém uzlu
                    width: 140,
                })
                .addDateTimeColumn({
                    name: "dat_zmena",
                    caption: "jres:26255404", //RC 26255404 : Datum změny
                })
                .addTextColumn({
                    name: "vlastnictvi",
                    caption: "jres:26255855", //RC 26255855 : Vlastnictví
                    width: 100,
                })
                .addTextColumn({
                    name: "stav_dist_txt",
                    caption: "jres:26255856", //RC 26255856 : Distribuce
                    width: 200,
                })
                .addNumberColumn({
                    name: "poradi",
                    caption: "jres:26255472", //RC 26255472 : Pořadí
                })
                .addTextColumn({
                    name: "nazev_typ",
                    caption: "jres:26257433", //RC 26257433 : Typ dokumentu či spisu
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
                        caption: "jres:26255615", //RC 26255615 : Skar. lhuta
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
                    name: "stav_pis_txt",
                    caption: "jres:26255513", //RC 26255513 : Stav
                })
                .addTextColumn({
                    name: "st_utaj_id_txt",
                    caption: "jres:26257041", //RC 26257041 : Přístup
                });

          //  if(!this.IsStaraMetodikaSsl) {
                // sloupec termín je zde pro dokumenty i pro spisy, proto nemohu podminkovat !this.IsStaraMetodikaSsl
                gridColumnsDefinition.addDateColumn({
                    name: "dat_vyriz_do",
                    caption: "jres:26257070", //RC 26257070 : Termín
                    width: 100,
                    // fixedWidth: true,
                })
          //  }
            if(this.PouzivatDilciTerminy) {
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
                selection: function (ev, ctx) {
                    if (that.SelectionForPreviewController) {
                        var opt = {
                            ggrid: $(this)
                        };
                        that.SelectionForPreviewController(opt);
                    }
                },
                multi: true,
                rowsClass: function (dataRow) {
                    return that.GetRowClass(dataRow);
                },
                contextMenu: function (cellContext) {
                    return that.GetFullContextMenu();
                },
                multiMenu: this.multiMenu,
                //     scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                searchColumns: ["ixp", "cj", "cj_spis", "vec", "odesilatel", "vlastnik", "dat_zmena", "vlastnictví", "stav_dist_txt", "poradi", "dat_pod", "spis_pl", "spis_znak", "skar_znak", "skar_lhuta", "skar_znak2", "skar_lhuta2", "stav_pis_txt", "st_utaj_id_txt", "uziv_sl_1", "uziv_sl_2", "uziv_sl_3", "uziv_sl_4"], //sloupce, podle kterych se vyhledava v searchboxu
                columns: gridColumnsDefinition,
            });

            this.LoadData();

        },
        PBEvent: function (actStr, params) {
            var that = this;
            var rowsSelected = true;

            if(actStr != "EvidovatAlternate") {
                this.modelAkce.SelectedRowsInfo = this.GetSelectedRowsInfoFromList();

                if(this.modelAkce.SelectedRowsInfo.length == 0) {
                    rowsSelected = false;
                }
            } else {
                this.modelAkce.SelectedRowsInfo = this.AlternativeIxpArray; // vyjimecne nepracuji s oznacenymi radky
            }

            if(rowsSelected) {
                if(params != undefined) {
                    this.modelAkce.Params = params;
                }

                var l_oParamsJSON = {
                    eventId: actStr,
                    model: this.modelAkce
                };

                this.call(["PBEvent", l_oParamsJSON])
                    .done(
                        function (data, content) {
                            var l_oRetVal = data;

                            if (l_oRetVal != null) {
                                if (l_oRetVal.PrintProtocol != undefined && l_oRetVal.PrintProtocol === true) { // Prevzit

                                    that.PredavaciProtokolInfo = { ixsFunPredavajici: "", ixsFunPrebirajici: that.IxsFunAkt };
                                    that.TiskPredavacihoProtokolu();
                                } else {
                                    that.Reload();
                                }
                            }
                        }
                    )
                    .always(function () {
                        that.modelAkce.Params = null;
                    });
            }
        },
        Export: function() {
            var that = this;

            var dto = {
                DownloaderType: "Gordic.Ssl.WebClient.Lists.PoznBlokDownloader",
                AutoDownload: true,
                DisablePluginDownload: true,
                CustomData: {
                    "ixs_blp": this.IxsBlp
                }
            };

            var doc = new GDocument(this);
            //doc.uploadCompleted(function (args) {
            //    console.log("doc.downloadCompleted", this, args);
            //});

            doc.downloadDocument(dto, function (args) {
               // console.log("doc.downloadCompleted", this, args);
            });

        },
        Import: function () {
            var that = this;

            var dto = {
                UploaderType: "Gordic.Ssl.WebClient.Lists.PoznBlokUploader",
                CustomData: {
                    "ixs_blp": this.IxsBlp
                }
            };

            var doc = new GDocument(this, { cptSave: "jres:26257097" }); //RC 26257097 : Načíst
            //doc.uploadCompleted(function (args) {
            //    console.log("doc.uploadCompleted", this, args);
            //});

            doc.upload(dto).done(function() {
                // console.log("doc.uploadCompleted", this, args);
                that.Reload();
            });

        },
        //CreateGroupResult: function (error, isError, key, rowState) {
        //    //CreateGroupResult: function (Error: string, IsError: boolean, Key: string, RowState: number }) {
        //    return { Error: error, IsError: isError, Key: key, RowState: rowState }
        //},
        TiskWordSablonPoslVlozDok: function (firstRun) {
            var that = this;

            if(this.IxpProGenSablon.length > 0) {
                this.actions.actTiskWordSablony.run();
            } else {
                if(firstRun) {
                    GDlg.alert("jres:26255909"); //RC 26255909 : Nejsou dostupné žádné dokumenty k odeslání.
                } else {
                    var ixpProOdeslani = this.IxpProHromadneOdeslani;

                    Gordic.Wfl.Dialogs.GOdeslaniHromadneDlg(this, { Pids: ixpProOdeslani, PosledniVlozeneDokumenty: true })
                        .done(function (rv) {
                            that.showFlash("jres:26256831", "g-state-info", that.flashPanelTimer); //RC 26256831 : Označené dokumenty/spisy byly úspěšně odeslány.
                            var groupResult = rv.GroupResult;
                            // --- provizorne nez GOdeslaniHromadneDlg bude vracet GroupResult
                            //var groupResult = [];
                            
                            //if(rv.Odeslane.length > 0) {
                            //    for(var i = 0; i < rv.Odeslane.length; i++) {
                            //        var gr = that.CreateGroupResult("", false, rv.Odeslane[i].Ixp, 0);
                            //        groupResult.push(gr);
                            //    }
                            //}
                            //-----

                            // chyby z dokumentoveho GroupResult prenesu do spisoveho GroupResult, aby se nasledne zobrazily u drive oznacenych spisu, zaroven reloadnu
                            var srv = that.createServiceContent({ className: "Gordic.Wfl.WebClient.GWflListUtils", params: {} });
                            srv.call("PrevodGroupResultDokumentNaSpis", { DokumentGroupResult: groupResult }) // vyresit serializace nebo presypat v js, coz asi bude i lepsi reseni
                                .done(function (spisGroupResult) {
                                    that.ZpracujResultSGroupResult({ GroupResult: spisGroupResult });
                                });
                           
                        })
                        .always(function () {
                            
                        });
                }
            }
        },
        TiskWordSablonyReportRetreive: function (rep) {
            var ixp = this.IxpProGenSablon.shift();

            rep.params.IXP = ixp;
            rep.params.X0000 = ixp;
        },

      //  TiskVypisovehoListuReportRetreive: function (rep) {
      //      rep.params.X0001 = this.IxsFunAkt;
      //  },

        TiskPevnyReportRetreive: function (rep) {
            var userHeader = this.userSettings.get(this.PrintUserHeaderUserSettingsID);

            if(userHeader) {
                rep.params.Header = userHeader;
            }

            rep.params.X0000 = this.IxsBlp;
            rep.params.X0001 = this.IxsFunAkt;
            rep.params.Preselect = false;
        },


        //TiskSbernyArchReportRetreive: function (rep) {
        //    if (this.IxpProGenSablon.length > 0) {
        //        var ixp = this.IxpProGenSablon.shift();
        //        rep.params.X0000 = ixp;
        //    } else {
        //        GDlg.alert("jres:26256983"); //RC 26256983 : Nejsou další záznamy k tisku.
        //    }
        //},

        //#region Menu

        CreateMenu: function () {
            var that = this;
            this.ZaregistrujHromadneAkce();

            var addMoreAct = new GAction({
                name: "addMoreAct",
                icon: Gordic.Gin.Globals.Icons.NovyZaznam().icon,
                caption: "jres:26256991", //RC 26256991 : Přidat více
                //    tooltip: "",
                run: function (ev, ctx) {
                    var srv = that.createServiceContent({ className: "Gordic.Wfl.WebClient.GWflListUtils", params: {} });

                    Gordic.Wfl.Dialogs.HledatIdentDokSpisDlg(that, {}, "showModalWindow").on("close", function (ev, retVal) {
                        if(retVal && retVal.ixp) {
                            srv.call("SaveToPoznamkovyBlok", { IxsBlp: that.model.IxsBlp, SelectedIxp: [retVal.ixp] })
                                .done(function (rv) {
                                    if(rv && rv.GroupResult) {
                                        that.GroupResult = rv.GroupResult;
                                    }

                                    that.Reload();

                                    if(rv && rv.GroupResult && rv.GroupResult.length > 0 && rv.GroupResult[0].IsError && rv.GroupResult[0].Error != "") {
                                        that.dialogs.error(rv.GroupResult[0].Error).on("close", function () {
                                            that.actions.addMoreAct.run();
                                        });
                                    } else {
                                        that.actions.addMoreAct.run();
                                    }

                                })
                                .fail(function (rv) {
                                    that.showFlash("jres:26256857", "g-state-error", that.flashPanelTimer); //RC 26256857 : Nepodařilo se vložit do pracovního bloku.
                                })
                        } else {
                            that.showFlash("jres:26256856", "g-state-info", that.flashPanelTimer); //RC 26256856 : Dokumenty byly vloženy do pracovního bloku.
                            that.Reload();
                        }
                    });
                }
            });

            this.actions.add(addMoreAct);

            var lokalniAkceBefore = [
                {
                    action: that.actions.actDetailWfl,
                    favorite: true
                },
                {
                    action: that.actions.actOtevriDokumentDoNoveZalozkyVeStejneFazi,
                    favorite: true
                },
                {
                    action: new GAction({
                        name: "addAct",
                        icon: Gordic.Gin.Globals.Icons.NovyZaznam().icon,
                        caption: "jres:26255278", //RC 26255278 : Přidat
                        //    tooltip: "",
                        run: function (ev, ctx) {

                            Gordic.Wfl.Dialogs.HledatIdentDokSpisDlg(that, {}, "showModalWindow").on("close", function (ev, retVal) {
                                if (retVal && retVal.ixp) {
                                    var srv = that.createServiceContent({ className: "Gordic.Wfl.WebClient.GWflListUtils", params: {} });

                                    srv.call("SaveToPoznamkovyBlok", { IxsBlp: that.model.IxsBlp, SelectedIxp: [retVal.ixp] })
                                        .done(function (rv) {
                                            if(rv && rv.GroupResult) {
                                                that.GroupResult = rv.GroupResult;
                                            }

                                            if(rv && rv.GroupResult && rv.GroupResult.length > 0 && rv.GroupResult[0].IsError && rv.GroupResult[0].Error != "") {
                                                that.dialogs.error(rv.GroupResult[0].Error).on("close", function () {

                                                });
                                            } else {
                                                that.showFlash("jres:26256856", "g-state-info", that.flashPanelTimer); //RC 26256856 : Dokumenty byly vloženy do pracovního bloku.
                                            }
                                        })
                                        .fail(function (rv) {
                                            that.showFlash("jres:26256857", "g-state-error", that.flashPanelTimer); //RC 26256857 : Nepodařilo se vložit do pracovního bloku.
                                        })
                                        .always(function () {
                                            that.Reload();
                                        });
                                }
                            });
                        }
                    }),
                    favorite: true
                },
                {
                    action: that.actions.addMoreAct,
                    favorite: true
                },
                {
                    action: new GAction({
                        name: "removeAct",
                        icon: "fa-remove",
                        caption: "jres:26255302", //RC 26255302 : Vyjmout
                        //   tooltip: "Vyhodi serverovou vyjimku",
                        run: function (ev, ctx) {
                            that.PBEvent("Vyjmout", { IxsBlp: that.IxsBlp });
                        }
                    }),
                    favorite: true
                },
                {
                    action: new GAction({
                        name: "removeAllAct",
                        icon: "fa-remove",
                        caption: "jres:26256716", //RC 26256716 : Vyjmout vše
                        // tooltip: "Vyhodi serverovou vyjimku",
                        run: function (ev, ctx) {
                            that.PBEvent("VyjmoutVse", { IxsBlp: that.IxsBlp });
                        }
                    }),
                    favorite: true
                },
                {
                    action: new GAction({
                        name: "selectNotebookAct",
                        icon: "fa-list",
                        caption: "jres:26256858", //RC 26256858 : Pracovní bloky
                        //  tooltip: "Pracovní bloky",
                        run: function (ev, ctx) {
                            var opt = { TypBlp: Gordic.Wfl.Globals.Enums.TypBlp.dokspis };
                            Gordic.Wfl.Dialogs.PracovniBlokyDlg(that, opt).done(function (retVal) {
                                if (retVal) {
                                    that.IxsBlp = retVal.ixsBlp;
                                    that.model.IxsBlp = retVal.ixsBlp;

                                    that.UpdateNazevBloku(retVal.nazev);

                                    that.Reload();
                                }
                            });
                        }
                    }),
                    favorite: true
                },
                {
                    action: new GAction({
                        name: "exportAct",
                        icon: "gi-send",
                        caption: "jres:26255913", //RC 26255913 : Export souboru
                        run: function (ev, ctx) {
                            that.Export();
                        }
                    }),
                    favorite: true
                },
                {
                    action: new GAction({
                        name: "importAct",
                        icon: "gi-download",
                        caption: "jres:26256556", //RC 26256556 : Import souboru
                        run: function (ev, ctx) {
                            that.Import();
                        }
                    }),
                    favorite: true
                },
            ];

            var wflDBParams = Gordic.Wfl.WebClient.GetGWflDBParams();

            var lokalniAkceAfter = [
                {
                    action: new GAction({
                        id: "obcerstvitPBAct",
                        name: "obcerstvitPBAct",
                        icon: "gi-refresh",
                        caption: "jres:26255299", //RC 26255299 : Občerstvit
                        enabled: (wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false,
                        run: function (ev, ctx) {
                            //that.Reload();
                            that.ReloadWithApplyFilter();
                        }
                    }),
                    favorite: false
                },
                {
                    id: "tiskPevnyBase",
                    caption: "jres:26257170", //RC 26257170 : Tisk s pevnou hlavičkou
                    type: "static",
                    children: [
                        {
                            action: new GAction({
                                id: "tiskPevnyPBAct",
                                name: "tiskPevnyPBAct",
                                icon: "gi-print",
                                enabled: (wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false,
                                caption: "jres:26257168", //RC 26257168 : Tisk s nastavenou hlavičkou
                                run: function (ev, ctx) {
                                    that.actions.actTiskPevnyNonVisual.run();
                                }
                            }),
                            favorite: true
                        },
                        {
                            action: new GAction({
                                id: "tiskNastaveniHlavickyPBAct",
                                name: "tiskNastaveniHlavickyPBAct",
                                icon: "gi-print",
                                enabled: true,
                                caption: "jres:26257169", //RC 26257169 : Nastavení textu hlavičky tisku
                                run: function (ev, ctx) {
                                    var savedPrintUserHeader = that.userSettings.get(that.PrintUserHeaderUserSettingsID)

                                    that.dialogs.prompt("jres:26257173", "jres:26257172", savedPrintUserHeader).createDialogPromise().then(function (retVal) { //RC 26257173 : Nastavení textu hlavičky tisku
                                        if(retVal && retVal.text && retVal.text.trim()) {
                                            that.userSettings.set(that.PrintUserHeaderUserSettingsID, retVal.text);
                                        }
                                    })
                                }
                            }),
                            favorite: false
                        },
                    ]
                },
                {
                    action: new GAction({
                        id: "actTiskVypisovehoListu",
                        name: "actTiskVypisovehoListu",
                        icon: "gi-print|gi-list gi-bgw gi-stack-pos--rb g-state-text g-state-info",
                        enabled: that.TiskVypisovehoListuEnabled,
                        caption: "jres:26257239", //RC 26257239 : Tisk výpisového listu
                        run: function (ev, ctx) {
                            that.actions.actTiskVypisovehoListuNonVisual.run(ev);
                        }
                    }),
                    favorite: false
                },
                {
                    id: "specAkceBase",
                    caption: "jres:26257071", //RC 26257071 : Speciální akce pracovního bloku
                    type: "static",
                    children: [
                        {
                            action: new GAction(
                                Gordic.Wfl.PreActions.VytvDokDoOznSpisuHromadne({
                                    inputData: function () {
                                        return {
                                            parentContent: that,
                                          //  opt: options.getSelectedRowsInfoFromList.call(that)
                                            opt: {
                                                rows: that.GetSelectedRowsInfoFromList(),
                                                evidovatEnabled: that.EvidovatEnabled,
                                                isNutnyVyberDenikuCj: that.IsNutnyVyberDenikuCj
                                            }
                                        };
                                    },
                                    done: function (retVal) {
                                        that.ZpracujResultSGroupResult(retVal);
                                    },
                                    actionParams: {
                                        enabled: (that.UsuPozblHakcPar == 1) && ((wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false),
                                    },
                                    fail: function () {

                                    }
                                })
                            )
                        },
                        {
                            action: new GAction(
                                Gordic.Wfl.PreActions.OdesPoslVlozeneDokumentyDoOznacenychSpisuHromadne({
                                    inputData: function () {
                                        return {
                                            parentContent: that,
                                            opt: {
                                                rows: that.GetSelectedRowsInfoFromList(),
                                            }
                                        };
                                    },
                                    done: function (retVal) {
                                        if(retVal != null) {
                                            if(retVal.GroupResult) {
                                                that.GroupResult = retVal.GroupResult;
                                            } else {
                                                that.GroupResult = undefined;
                                            }

                                            if(retVal.IxpNewDok) {
                                                that.IxpProGenSablon = retVal.IxpNewDok;
                                                that.IxpProHromadneOdeslani = [].concat(that.IxpProGenSablon); // musim vytvorit novou instanci
                                                that.TiskWordSablonPoslVlozDok(true);
                                            }

                                            that.ZpracujResultSGroupResult(retVal);
                                        }

                                    },
                                    actionParams: {
                                        enabled: (that.UsuPozblHakcPar == 1) && ((wflDBParams && wflDBParams.gin_rad_konao === 1) ? true : false),
                                    },
                                    fail: function () {

                                    }
                                })
                            )

                        }
                    ]
                },
            ];
 
            var spolecneAkceBase = this.VratMenuHromadneAkce();
            var akce = spolecneAkceBase.concat(lokalniAkceAfter);
   
            var spolecneAkce = [{ //MenuParams[] 
                id: "akceMenu",
                caption: "jres:26256717", //RC 26256717 : Akce
                favorite: true,
                type: "static",
                children: akce
            }];

            var kompletniAkce = lokalniAkceBefore.concat(spolecneAkce);

            this.CreateMenuBar(kompletniAkce);
        },

        getVisibleHromadneAkceDto: function () {
            var hromadneAkceDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto();
            //tady mohu zakazat některé akce v DTO

            hromadneAkceDto.PrevzitVRedistribuciHromadne = false;

            hromadneAkceDto.PoznamkovyBlokPridatHromadne = false;
            hromadneAkceDto.TiskListWfl = true;

            return hromadneAkceDto;
        },

        enableAkcePoVyhledani: function () {
            var dto = this.getEnableHromadneAkceDto();

            var optEnableShowHromadneAkce = {
                content: this,
                hromadneAkceWflDto: dto
            };
            // určím kterí budou pristupne a které ne
            Gordic.Wfl.Globals.ListSupport.EnableShowHromadneAkce(optEnableShowHromadneAkce);

        },
        
        getEnableHromadneAkceDto: function () {
            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto();
            //var vyrizeneView = this.model.SubTask == this.DokumentySubTask.Vyrizene;

            // Defaultně jsou všechny true.
            defaultDto.PredatPrimo = false;
            if((this.model.ZobrazitVlastnictviFilter !== null && this.model.ZobrazitVlastnictviFilter === 3 ) || this.usu_pozblokprev === 1)  {
                defaultDto.PredatPrimo = true;
            }
            if(this.usu_predani === 1) {
                defaultDto.PredatPrimo = true;
            }

            defaultDto.PrevzitVRedistribuciHromadne = false;

            return defaultDto;
        }
       
        //#endregion 

		
    }, { extendIntellisense: GContent });
})(jQuery);