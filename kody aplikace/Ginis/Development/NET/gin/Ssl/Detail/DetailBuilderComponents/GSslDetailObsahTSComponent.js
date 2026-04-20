(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {
        SslDetailObsahTS: {
            create: function (content, componentDto) {
                //definice badge v obsahu spisu
                //content.sbernyArchBadge = new GObservableObject({
                //    id: "wflObsahSpisuBadge",
                //    value: "0",
                //    tooltip: "0",
                //    customClass: "g-state-info" //zobrazeni, akt. moznosti: g-state-info, g-state-important, g-state-warning, g-state-error
                //});

                //content.statusSbernyArchStatusVelikostSouboru = new GObservableObject({
                  
                //    type: "static",
                //    id: "statusSbernyArchStatusVelikostSouboru",
                //    caption: undefined,
                //});
                
                var result = {
                    onInit: [
                        function () {
                           // this.zaregistrujHromadneAkce();
                           // this.visibleHromadneAkce();
                        }
                    ],
                    onBuild: [
                        function () {

                            this.enableSslDetailSbernyArch();

                            //  this.nasetujSbernyArch(this.SslDetailObsahTS_Dto);
                            this.sslSbernyArchNastavEnableAkceZRadkuGridu();
                          //  this.updatePocetAVelikostiSouboru(componentDto.KpiVelikostaPocetSoboru);
                        }
                    ],

                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        setSslDetailObsahTS_Dto: function (newDto) {
                            var that = this;
                            if (newDto != null) {
                                this.SslDetailObsahTS_Dto = newDto;
                                this.refreshGridSslSbernyArch(this.actions.actSslArchIDily.checked());
                            }
                        },

                        createSbernyArchGrid: function (createEmptyGrid) {
                            var that = this;
                            if (Gordic.Utils.WidgetExists("ggrid", this.gridSbernyArch)) {
                                this.gridSbernyArch.ggrid("destroy");
                                this.gridSbernyArch.remove();
                                this.gridSbernyArch = $("<div>").appendTo(this.gridSbernyArchTab).gautofit({ resizersOnTab: false });
                            }

                            var data = this.SslDetailObsahTS_Dto.ListSbernyArchSpisu;

                            //if (createEmptyGrid) { // při přepínání modu je potřeba vytvořit prázdný grid
                            //    data = [];
                            //}

                            var viewOpt = {
                                key: "ixp",
                            };

                            viewOpt.processors = {
                                tree: new Gordic.Data.Tree(
                                    Gordic.Data.Tree.parentIdOrganizer("ixp_parent"),
                                    {
                                        defaultState: function (row) {
                                            var state = "open"; // "closed" | "open" | "empty" | "unknown" | "loading";

                                            //if (row.data.typ_spis == 3 || row.data.typ_spis == 5) {
                                            //    state = "open"; // případně "unknown", pokud nechci mít díly hned viditelné
                                            //}
                                            return state;
                                        },
                                        filterKeepStructure: false,
                                        filterIncludeChildren: true
                                    }
                                ),
                                filterObsahSoucasti: new Gordic.Data.FilterProcessor(
                                    function (row) {
                                        return row.data.ixp_soucast == componentDto.ixp;
                                    }
                                )
                            };
      
                            this.viewSbernyArch = new Gordic.Data.View(
                                data,
                                viewOpt
                            );

                            this.viewSbernyArch.processors.filterObsahSoucasti.setEnabled(false); // ve výchozím stavu se nepoužívá


                            var columnListObj = { columnList: "" };
                            var gridKolonky = Gordic.Ssl.GSslCommonDlg.getGridColumnsObsahTS(
                                {
                                    // 03.04.2025 - TFeik
                                    // Změnba návu značky.
                                    //ZnackaText: this.SslDetailObsahTS_Dto.ZnackaText,
                                    ZnackaText: 'jres:32170447', //RC 32170447 : Značka entity
                                    isTreeMode: true,
                                    ssl_nev_posepk: this.SslDetailObsahTS_Dto.ssl_nev_posepk,
                                    content: this,
                                    pouzivatDilciTerminy: this.SslDetailObsahTS_Dto.PouzivatDilciTerminy,
                                    withoutDoplnujiciInformace: true,
                                    IxsFunAkt: componentDto.IxsFunAkt,
                                    columnListObj: columnListObj
                                }
                            );

                            var hromadneAkce = that.actions.createBar([{ type: "static", caption: "jres:31937273", favorite: true, children: that.menuHromadneAKceSbernyarch }]);

                            this.gridSbernyArch.ggrid({
                                name: "GridSbernyArch",
                                data: this.viewSbernyArch,
                                renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                                columnMode: "full",  // fit, full
                                navigationMode: "row", // row, cell
                              //  sort: "por_cislo_uziv",
                                defaultAction: this.actions.actSbernyArchOtevriNovyDetail, //selectAction
                                cellActivate: function (ev, row) {
                                    that.sslSbernyArchNastavEnableAkceZRadkuGridu(row);
                                },
                                multi: true,
                                scrollHelperTemplate: "{nazev_ext}",  // "{ixs_esu} - {nazev}",
                                //searchColumns: ["nazev_ext"],
                                columns: gridKolonky,
                                defaultProfile: {
                                    //condFormats: condFormats,
                                    columnList: columnListObj.columnList
                                },
                                rowsClass: function (dataRow) {
                                    if (dataRow && dataRow.data && dataRow.data.priz_spis == 0 ) { // 0 u nevložených/vyjmutých Dokumentů/Součástí/Dilů:
                                        return " ui-disabled data-deleted ";// + Gordic.Global.Enums.ColorStateClass.inactive; //g-state-inactive data-deleted  
                                    } else return "  ";
                                },
                                contextMenu: [
                                    { action: this.actions.actSbernyArchOtevriNovyDetail, favorite: true },
                                    { action: this.actions.actOtevriDokumentDoNoveZalozkyVeStejneFazi, favorite: true },
                                 //   { action: this.actions.actOtevreniElObrazuDokumentu },
                                 //   { action: this.actions.actTiskArchu, favorite: true },
                                 //   hromadneAkce[0]//RC 31937273 : Hromadné akce
                                ]
                            });

                            this.gridSbernyArch.ggrid("activeRow", this.SslDetailObsahTS_Dto.ixp);
                        },

                        refreshGridSslSbernyArch: function (vcetneDilu) {
                            var that = this;

                            var opt = {
                                SSLDetail: null,
                                IxpTypovySpis: componentDto.ixp_top,
                                VcetneDilu: vcetneDilu
                            };
                            this.beginOperation();
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content

                            srv.call("SeznamObsahTypovehoSpisu", opt)
                                .done(function (retVal) {
                                    if (retVal) {
                                        that.SslDetailObsahTS_Dto.ListSbernyArchSpisu = retVal;
                                        that.setGridSbernyArch();
                                    }
                                })
                                .always(function () {
                                    that.endOperation();
                                    srv.close();
                                })
                                ;

                        },
                        setGridSbernyArch: function () {
                            var that = this;
                            if (Gordic.Utils.WidgetExists("ggrid", this.gridSbernyArch)) {
                                var data = this.SslDetailObsahTS_Dto.ListSbernyArchSpisu;
    
                                this.viewSbernyArch.updateData(data, "reset"); // hotfix. Update mi od nějaké doby přestal spolehlivě fungovat. Resetem a následným updatem zajistím zobrazení správných dat. I když je možné, že reset může resetovat víc věcí, než si přeji.
                                this.viewSbernyArch.updateData(data, "update", true); // update na rozdíl od set zde funguje u stromogridu
                                //update //"add" | "update" | "extend" | "refresh" | "delete" | "set" | "reset"  dříve "update"
                                if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                    return;
                                }
                                this.gridSbernyArch.ggrid("refreshRows");


                          //      this.sslSbernyArchNastavEnableAkceZRadkuGridu();
                              //  this.znovuNactiPocetAVelikostiSouboru();
                            }
                        },
                        sslSbernyArchNastavEnableAkceZRadkuGridu: function (row) {
                            var that = this;
                            var trueRow = null;
                            if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                return;
                            }
                            if (row == null) {
                                trueRow = that.gridSbernyArch.ggrid("activeRow");
                            } else {
                                if (row != null && row.cellInfo != null && row.cellInfo.data != null) {
                                    trueRow = row.cellInfo.data;
                                }
                            }

                            var treeActivated = true;

                            if(trueRow && trueRow.aktivita != null && trueRow.ixp != null) {
                                var opt = {
                                    IxpSpis: trueRow.ixp,
                                    IxpDok: trueRow.ixp,
                                    Aktivita: trueRow.aktivita,
                                    // VztahSpis: trueRow.vztah_spis
                                };

                                var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                //this.beginOperation();
                                this.promisSbernyArchSpisuEnabledActions = srv.call("SbernyArchTypoveEntityEnabledActions", opt, null, { progressState: false }) // srv.call("SbernyArchSpisuEnabledActions", opt, null, { progressState: false } 
                                    .done(function (retVal) {
                                        if (retVal.StavBool) {
                                            that.SslDetailObsahTS_Dto.nastavenoZRadkuGridu = true;
                                        }
                                        //that.endOperation();
                                    }).always(function () { srv.close(); });

                            }

                        },

                        zpracujResultSGroupResult: function (retVal) {
                            var that = this;
                            if (retVal != null) {
                                if (retVal.GroupResult) {
                                    this.GroupResult = retVal.GroupResult;
                                } else if (retVal.groupResult) {
                                    this.GroupResult = retVal.groupResult;
                                } else if (retVal.GroupResultList) {
                                    this.GroupResult = retVal.GroupResultList;
                                } else {
                                    this.GroupResult = undefined;
                                }
                                if (retVal.PrintProtocol != undefined && retVal.PrintProtocol === true) { // Prevzit

                                    this.tiskPredavacihoProtokolu(); // TODO
                                }

                                else {
                                    this.refreshGridSslSbernyArch(this.actions.actSslArchIDily.checked());
                                }
                            }
                        },
                        tiskPredavacihoProtokolu: function () {
                            var that = this;
                            var predavaciProtokolAkce = GAction.createPrintAction({
                                name: 'actTiskPredavaciProtokolSbernyArch',
                                caption: 'Tisk předávacího protokolu',
                                tema: 'ssl_ptm_predpro',
                                reportStarting: function (reportInfo) {
                                    return Gordic.Wfl.GWflListUtils.CreatePredavaciProtokolPrintParams({
                                        parentContent: that
                                    })
                                        .then(function (printParams) {
                                            if (printParams.LogPorCislo == null
                                                || printParams.IxsFunPredavajici == null
                                                || printParams.IxsFunPrebirajici == null
                                            ) {
                                                return $.Deferred().reject().promise();
                                            }

                                            reportInfo.params.X0000 = printParams.LogPorCislo.toString();
                                            reportInfo.params.X0001 = printParams.IxsFunPredavajici;
                                            reportInfo.params.X0002 = printParams.IxsFunPrebirajici;

                                            return $.Deferred().resolve().promise();
                                        });
                                },
                                reportFinished: function () {
                                    that.refreshGridSslSbernyArch(this.actions.actSslArchIDily.checked());
                                }
                            });
                            var ImplicitneTisknoutPredProt = this.globalSettings.getDef(Gordic.Wfl.AppSettings.ImplicitneTisknoutPredProtSettingsKey, false);
                            var DotazatSePredTiskem = this.globalSettings.getDef(Gordic.Wfl.AppSettings.DotazatSePredTiskemSettingsKey, false);
                            if (ImplicitneTisknoutPredProt) {
                                if (DotazatSePredTiskem) {
                                    let l_sQuestion = "jres:31937276"; //RC 31937276 : Přejete si vytisknout předávací protokol?
                                    that.dialogs.confirm("jres:31937277", l_sQuestion).on("close", function (ev, retVal) { //RC 31937277 : Dotaz
                                        if (retVal) {
                                            if (retVal === "yes") {
                                                predavaciProtokolAkce.run();
                                            }
                                        }
                                    });
                                } else {
                                    predavaciProtokolAkce.run();
                                }
                            }

                        },

                        sslArchVlozitZaznam: function () {
                            var that = this;
                            var options =
                            {
                                IxpVkladanehoDok: this.SslDetailObsahTS_Dto.ixp,
                                TypSpis: 0
                            };

                            this.hledatIdentDokSpi(
                                function (retVal) { // 
                                    var idDokumentu = retVal.ixp;
                                    if (idDokumentu) {
                                        var IDSpisVlozitDoSpisu = that.SslDetailObsahTS_Dto.ixp + "|" + "empty";
                                        //_this.onDoneFunction = this.ZnovuVlozitDoSpisuSubmit;
                                        var opt = {
                                            IxpSpis: that.SslDetailObsahTS_Dto.ixp,
                                            IxpDok: idDokumentu,
                                            IDSpisVlozitDoSpisu: IDSpisVlozitDoSpisu,
                                            content: that,

                                        };
                                        that.beginOperation();
                                        Gordic.Ssl.Utils.dotazIRPNaVlozeniDokumentuDoSpisu(opt)
                                            .done(function (rv) {
                                                that.refreshGridSslSbernyArch(that.actions.actSslArchIDily.checked());
                                            })
                                            .always(function () {
                                                that.endOperation();
                                            })
                                            ;

                                    }
                                }
                                , options
                            );
                        },
                        sslArchIDily: function () {
                            var checked = this.actions.actSslArchIDily.checked();

                           /* if (this.viewSbernyArch && this.viewSbernyArch.processors && this.viewSbernyArch.processors.filterTypSpis4) {
                                this.viewSbernyArch.processors.filterTypSpis4.setEnabled(!checked);
                            }
                            this.viewSbernyArch.refresh();*/
 
                            // TODO volani serveru
                            this.refreshGridSslSbernyArch(checked);
                        },
                        sslJenObsahSoucasti: function () {
                            var checked = this.actions.actSslJenObsahSoucasti.checked();

                            if(this.viewSbernyArch && this.viewSbernyArch.processors && this.viewSbernyArch.processors.filterObsahSoucasti) {
                                this.viewSbernyArch.processors.filterObsahSoucasti.setEnabled(checked);
                            }
                            this.viewSbernyArch.refresh();
                        },

                        //#region akce

                        //zaregistrujHromadneAkce: function () {
                        //    var opt = {
                        //        content: this,
                        //        getSelectedRowsInfoFromList: this.getSelectedRowsInfoFromList, // WflListBase
                        //        getIxpArrayFromSelection: this.getIxpArrayFromSelection,// WflListBase
                        //        zpracujResultSGroupResult: this.zpracujResultSGroupResult, //WflListBase
                        //        getIxpOfActiveRow: this.getIxpOfActiveRow, // WflListBase
                        //        reload: this.refreshGridSslSbernyArch, // WflListBase // reload
                        //        isNutnyVyberDenikuCj: componentDto.IsNutnyVyberDenikuCj, //WflListBase
                        //        // IxsBlp: string, nakonec bráno z kontentu aktualní hodnota
                        //        // AlternativeIxpArray?: any[], // bráno z kontentu
                        //        ssl_rem_dokd: componentDto.ssl_rem_dokd, //WflListBase,
                        //        actNameSufix: "DetailSbernyArch",
                        //        //getSelectedGDataAkceSslProfil: this.getSelectedGDataAkceSslProfil
                        //    };

                        //    // registruju akce na kontent
                        //    Gordic.Wfl.Globals.ListSupport.HromadneAkceZaregistrujnaContent(opt);

                        //    this.menuHromadneAKceSbernyarch = Gordic.Wfl.Globals.ListSupport.HromadneAkceVratMenu({ content: content, actNameSufix: "DetailSbernyArch" });
                        //},
                        getSelectedRowsInfoFromList: function () {
                            var that = this;
                            var l_asSelectedRows = [];

                            if (Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {

                                var l_aoSelections = this.gridSbernyArch.ggrid("getSelection", true);

                                if (l_aoSelections.length > 0) {
                                    l_aoSelections.forEach(function (entry) {
                                        var rowData = entry.data;
                                        // 11.06.2024 - TFeik
                                        // Datum změny dokumentu je ve vlastnosti dat_zmena_dok a ne v dat_zmena.
                                        l_asSelectedRows.push({
                                            Ixp: rowData.ixp,
                                            //DatZmena: rowData.dat_zmena,
                                            DatZmena: rowData.dat_zmena_dok,
                                            PrizSpis: rowData.priz_spis,
                                            SPrij: rowData.s_prij
                                        });
                                    });
                                }
                            }

                            if (l_asSelectedRows.length == 0) {
                                this.showFlash("jres:31937271", "g-state-error", this.flashPanelTimer); //RC 31937271 : Není vybrán žádný záznam.
                            }

                            return l_asSelectedRows;
                        },
                        getIxpArrayFromSelection: function () {
                            var ixpArray = [];

                            if (Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                var selection = this.gridSbernyArch.ggrid("getSelection");

                                if (selection.length > 0) {
                                    selection.forEach(function (entry) {
                                        ixpArray.push(entry.ixp);
                                    });
                                }
                            }

                            if (ixpArray.length == 0) {
                                this.showFlash("jres:31937272", "g-state-error", this.flashPanelTimer); //RC 31937272 : Není vybrán žádný záznam.
                            }

                            return ixpArray;
                        },

                        getIxpOfActiveRow: function () {
                            if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                return;
                            }
                            var activeRow = this.gridSbernyArch.ggrid("activeRow");
                            var ixp = null;
                            if (activeRow) {
                                ixp = activeRow.ixp;
                            }
                            return ixp;
                        },

                        //visibleHromadneAkce: function () {
                        //    var dto = this.getVisibleHromadneAkceDto();

                        //    var optHideShowHromadneAkce = {
                        //        content: this,
                        //        hromadneAkceWflDto: dto,
                        //        actNameSufix: "DetailSbernyArch"
                        //    };
                        //    // určím kterí budou vidět a které ne
                        //    Gordic.Wfl.Globals.ListSupport.HideShowHromadneAkce(optHideShowHromadneAkce);
                        //},

                        //getVisibleHromadneAkceDto: function () {
                        //    var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto();

                        //    var visible = false;
                        //    var simpleMode = componentDto.SimpleMode;
                        //    if (simpleMode) {
                        //        visible = false;
                        //    }
                        //    //tato sekce je specifická pro každá content. vybereš si které chceš a které ne
                        //    // Defaultně jsou všechny true.

                        //    defaultDto.PredatPrimo = simpleMode ? true : visible;
                        //    defaultDto.PridelitHromadne = visible;
                        //    defaultDto.PrevzitHromadne = visible;
                        //    defaultDto.PrevzitVRedistribuciHromadne = false;
                        //    defaultDto.ZrusitPrideleniHromadne = visible;
                        //    defaultDto.ZmenitPrideleniHromadne = visible;
                        //    defaultDto.EvidovatRozsirenyProfilHromadne = visible;
                        //    defaultDto.EvidovatHromadne = visible;
                        //    defaultDto.OdeslatHromadne = visible;
                        //    defaultDto.VyjmoutZeSpisuHromadne = visible;
                        //    defaultDto.VlozitDoSpisuSslHromadne = visible;
                        //    defaultDto.SouboryNearchivniFormat = visible;
                        //    defaultDto.SouboryRozpoznaniFormatu = visible;
                        //    defaultDto.OpravaMetadatSeznamNew = simpleMode ? true : visible;
                        //    defaultDto.OpravitMetadataPoKontroleSeznam = simpleMode ? true : visible;
                        //    defaultDto.ZmenitFormuHromadne = visible;
                        //    defaultDto.ZtvarneniMetadatSpisuHromadne = false;
                        //    defaultDto.ZmenitDilciDokTerminHromadne = visible;
                        //    defaultDto.ZmenitDoplnekZnackyHromadne = visible;
                        //    defaultDto.ZmenitPocetListu = visible;
                        //    defaultDto.ZmenitPocetPriloh = visible;
                        //    defaultDto.ZmenitPocetListuPriloh = visible;
                        //    defaultDto.ZmenitPoznamkuHromadne = visible;
                        //    defaultDto.ZmenitPristupHromadne = visible;
                        //    defaultDto.ZmenitSpisZnakHromadne = visible;
                        //    defaultDto.ZmenitTerminSpisuHromadne = visible;
                        //    defaultDto.ZmenitTypDokHromadne = visible;
                        //    defaultDto.ZmenitVecHromadne = visible;
                        //    defaultDto.ZmenitUmisteniHromadne = visible;
                        //    defaultDto.ZmenitZpusobDoruceniHromadne = visible;
                        //    defaultDto.ZmenitSchvalovateleHromadne = visible;
                        //    defaultDto.ZmenitZpracovateleHromadne = visible;
                        //    defaultDto.VlozitDokEpkHromadne = visible;
                        //    defaultDto.VlozitSpisEpkHromadne = false;
                        //    defaultDto.VyriditAdActaHromadne = simpleMode ? true : visible;
                        //    defaultDto.VyriditDokumentyHromadne = simpleMode ? true : visible;
                        //    defaultDto.VyriditSpisyHromadne = false;
                        //    defaultDto.ZrusitVyrizeniDokumentuHromadne = visible;
                        //    defaultDto.ZrusitVyrizeniSpisuHromadne = false;
                        //    defaultDto.ZrusitUzavreniSpisuHromadne = false;
                        //    defaultDto.PrerusitHromadne = visible;
                        //    defaultDto.PriorovatHromadne = false;
                        //    defaultDto.PredatDokumentyExtAgHromadne = visible;
                        //    defaultDto.PredatSpisyExtAgHromadne = visible;
                        //    defaultDto.PrevzitExtAgHromadne = visible;
                        //    defaultDto.PridatKlSlovaHromadne = visible;
                        //    defaultDto.OdebratKlSlovaHromadne = visible;
                        //    defaultDto.VlozitDokumentSpisDoBaliku = false;
                        //    defaultDto.VyjmoutDokumentSpisZBaliku = false;
                        //    defaultDto.VytvoritBalikAVlozitSeznam = false;
                        //    defaultDto.PridatSpisyZDokumentuHromadne = false;
                        //    defaultDto.PridatDokumentyVlozeneDoSpisuHromadne = false;
                        //    defaultDto.PoznamkovyBlokPridatHromadne = visible;
                        //    defaultDto.OznacitJakoPrecteneHromadne = visible;
                        //    defaultDto.OznacitJakoNeprecteneHromadne = visible;
                        //    defaultDto.TiskListWfl = visible;
                        //    defaultDto.TiskPevny = visible;
                        //    defaultDto.TiskSpisObalky = false;
                        //    defaultDto.TiskSbernyArch = false;
                        //    defaultDto.Obcerstvit = visible;
                        //    defaultDto.UzivatelskeSloupceVlastnosti = false;
                        //    defaultDto.UlozitDoClipboardu = true;
                        //    // konec specifické sekce

                        //    return defaultDto;
                        //},


                        //#endregion
                        enableSslDetailSbernyArch: function () {
                            var that = this;
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }

                          //  this.actions.actTiskArchu.update({ enabled: this.SslDetailObsahTS_Dto.TiskArchuEnabled });
  
                            //this.actions.actPoznamkovyBlokPridat.visible(componentDto.SimpleMode? false: true);
                            //this.visibleHromadneAkce();
                        }
                    },

                    actions: { //může být zadáno jako pole nebo jako objekt

                        //actTiskArchu: GAction.createPrintAction({
                        //    name: "actTiskArchu",
                        //    icon: "gi-print|gi-spis_bold gi-bgw gi-stack-pos--rb g-state-text g-state-info",
                        //    tema: "usu_ptm_spisarc",
                        //    caption: "jres:31937065",  //RC 31937065 : Tisk archu
                        //    reportStarting: function (rep) {
                        //        rep.params.X0000 = $.content(this).SslDetailObsahTS_Dto.ixp;
                        //        rep.params.Preselect = false;
                        //    },
                        //}),

                        actSslArchIDily: {
                            caption: "jres:31937200", //RC 31937200 : I díly
                            icon: "gi-folder_bold_D", //gi-list
                            tooltip: "jres:31937201", //RC 31937201 : V seznamu se zobrazí i díly
                            checked: false,
                            run: function () {
                                if (!this.checked()) {
                                    this.checked(true);
                                    $.content(this).sslArchIDily();
                                } else {
                                    this.checked(false);
                                    $.content(this).sslArchIDily();
                                }
                            }
                        },
                        actSslJenObsahSoucasti: {
                            caption: "jres:26257279", //RC 26257279 : Jen obsah součásti
                            icon: "gi-folder_bold_S", //gi-list
                            tooltip: "jres:26257280", //RC 26257280 : V seznamu se zobrazí jen obsah součásti
                            checked: false,
                            run: function () {
                                if (!this.checked()) {
                                    this.checked(true);
                                    $.content(this).sslJenObsahSoucasti();
                                } else {
                                    this.checked(false);
                                    $.content(this).sslJenObsahSoucasti();
                                }
                            },
                            visible: componentDto.IsSoucast,
                        },
                        actSbernyArchOtevriNovyDetail: {
                            caption: "jres:26257273",  //RC 26257273 : Detail
                            icon: "gi-detail", //gi-list
                            tooltip: "jres:26257272",  //RC 26257272 : Otevře detail do nové záložky
                            run: function (ev, ctx) {
                                var cnt = $.content(this);
                                var gridSbernyArch = cnt.gridSbernyArch;
                                var ixp = cnt.getIxpOfActiveRow();
                                if (ixp) {
                                    if (cnt.promisSbernyArchSpisuEnabledActions) {
                                        cnt.promisSbernyArchSpisuEnabledActions
                                            .always(function (retVal) {
                                                cnt.otevriNovyDetail({
                                                    DetailDto: {
                                                        ixp: ixp
                                                    },
                                                    grid: gridSbernyArch
                                                });
                                            });
                                    }
                                    else {
                                        cnt.otevriNovyDetail({
                                            DetailDto: {
                                                ixp: ixp
                                            },
                                            grid: gridSbernyArch
                                        });
                                    }
                                }
                            }
                        },
                        actOtevriDokumentDoNoveZalozkyVeStejneFazi: Gordic.Wfl.PreActions.OtevriDokumentDoNoveZalozkyVeStejneFazi({
                            inputData: function (x, y) {
                                var optinput = { ixp: content.getIxpOfActiveRow() };
                                return optinput;
                            },
                            done: function (retVal) {
                                //var content = $.content(this);
                            },
                            fail: function () {
                                content.showFlash(
                                    "jres:31937314", //RC 31937314 : Novou záložku se nepodařilo otevřít.
                                    Gordic.Global.Enums.ColorStateClass.error,
                                    undefined,
                                    "actOteveniNoveZalozky"
                                );
                            },
                        }),
                        //actOtevreniElObrazuDokumentu: {
                        //    caption: "Otevřít hlavní přílohu",
                        //    icon: "gi-eattachment",
                        //    tooltip: "Otevřít hlavní přílohu",
                        //    run: function (ev, ctx) {
                        //        var cnt = $.content(this);
                        //        var ixp = cnt.getIxpOfActiveRow();
                        //        if (ixp) {
                        //            Gordic.Wfl.AttachmentUtils.ShowMainAttachment(cnt, ixp, false);
                        //        }
                                
                        //    }
                        //},

                    },

                    tabs: {
                        SslSbernyArch: {
                            tabParams: {
                                title: componentDto.NadpisTabu,

                                group: $.extend(
                                    Gordic.Prefabs.TabGroups.SbernyArch(componentDto.NadpisTabu), {
                                  //  badge: content.sbernyArchBadge
                                })
                            },
                           
                            init: function (tab) {
                                //#region definice tab dokumentu
                                var that = $.content(tab);
                                    //.addNumberColumn({
  
                                //var menuHromadneAKce = Gordic.Wfl.Globals.ListSupport.HromadneAkceVratMenu({ content: content });
                                var menubarSbernyArch = [
                                    { action: "actSbernyArchOtevriNovyDetail"},
                                    { action: "actOtevriDokumentDoNoveZalozkyVeStejneFazi"},
                                    { action: "actSslJenObsahSoucasti", favorite: true, align: "opposite" },
                                    { action: "actSslArchIDily", favorite: true, align: "opposite" },
                                   // , { type: "static", caption: "jres:31937273", favorite: true, children: that.menuHromadneAKceSbernyarch }//favoriteHromadneAkceDto: favoriteHromadneAkceDto //RC 31937273 : Hromadné akce
                                ]
 
                                tab.one('gtabopen', function (ev, ctx) { // Vlastův života zachraný zlepšovák
                                    var bar = that.actions.createBar(menubarSbernyArch);
                                    var opt = {
                                        content: that,
                                        menuParamsArr: bar
                                    };
                                //    Gordic.Wfl.Globals.ListSupport.NastavHiddenZbytecnymSeparatorumZMenuParams(opt);

                                    tab.gtab("setMenuBar", bar, that.userSettings.sub("menuBarObsahTSTab"));
                                });

                                that.gridSbernyArchTab = tab;
                                that.gridSbernyArch = $("<div>").appendTo(tab).gautofit({ resizersOnTab: false });
                                that.createSbernyArchGrid();
                                //#endregion
                                
                            }
                        }
                    },

                   // statusBar: [content.statusSbernyArchStatusVelikostSouboru]

                };

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);