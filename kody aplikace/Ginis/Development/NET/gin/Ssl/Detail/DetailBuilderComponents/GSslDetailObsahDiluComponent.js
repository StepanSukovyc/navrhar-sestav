(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {
        SslDetailObsahDilu: {
            create: function (content, componentDto) {
                //definice badge v obsahu spisu
                //content.sbernyArchBadge = new GObservableObject({
                //    id: "wflObsahDiluBadge",
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
                            this.zaregistrujHromadneAkce();
                            this.visibleHromadneAkce();
                        }
                    ],
                    onBuild: [
                        function () {
                            this.sslArchIsMoved = false;

                            this.enableSslDetailSbernyArch();

                            //  this.nasetujSbernyArch(this.SslDetailObsahDilu_Dto);
                            this.sslSbernyArchNastavEnableAkceZRadkuGridu();
                        }
                    ],

                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        setSslDetailObsahDilu_Dto: function (newDto) {
                            var that = this;
                            if (newDto != null) {
                                this.SslDetailObsahDilu_Dto = newDto;
                                this.refreshGridSslSbernyArch();
                            }
                        },

                        createSbernyArchGrid: function (createEmptyGrid) {
                            var that = this;
                            if (Gordic.Utils.WidgetExists("ggrid", this.gridSbernyArch)) {
                                this.gridSbernyArch.ggrid("destroy");
                                this.gridSbernyArch.remove();
                                this.gridSbernyArch = $("<div>").appendTo(this.gridSbernyArchTab).gautofit({ resizersOnTab: false });
                            }
                            var viewOpt = {
                                key: "ixp",
                            };

                            var data = this.SslDetailObsahDilu_Dto.ListObsahDilu;

                            if (createEmptyGrid) { // při přepínání modu je potřeba vytvořit prázdný grid
                               data = [];
                            }

                            this.viewSbernyArch = new Gordic.Data.View(
                                data,
                                viewOpt
                            );

                            var columnListObj = { columnList: "" };
                            var gridKolonky = Gordic.Ssl.GSslCommonDlg.getGridColumnsObsahTS( // TODO
                                {
                                    ZnackaText: this.SslDetailObsahDilu_Dto.ZnackaText,
                                    isTreeMode: true,
                                    ssl_nev_posepk: this.SslDetailObsahDilu_Dto.ssl_nev_posepk,
                                    content: this,
                                    pouzivatDilciTerminy: this.SslDetailObsahDilu_Dto.PouzivatDilciTerminy,
                                    withoutDoplnujiciInformace: true,
                                    IxsFunAkt: componentDto.IxsFunAkt,
                                    columnListObj: columnListObj
                                }
                            );
                            var hromadneAkce = that.actions.createBar([{ type: "static", caption: "jres:31937273", favorite: true, children: that.menuHromadneAKceSbernyarch }]);
                            //var opt = {
                            //    content: that,
                            //    menuParamsArr: hromadneAkce
                            //};
                            //Gordic.Wfl.Globals.ListSupport.NastavHiddenZbytecnymSeparatorumZMenuParams(opt); // mělo by stačit volat na tu eventu
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
                                    if(dataRow && dataRow.data && dataRow.data.aktivita !== 100 ) {
                                        return " ui-disabled data-deleted ";// + Gordic.Global.Enums.ColorStateClass.inactive; //g-state-inactive data-deleted  
                                    } else return "  ";
                                },
                                contextMenu: [
                                    { action: this.actions.actSbernyArchOtevriNovyDetail, favorite: true },
                                    { action: this.actions.actOtevriDokumentDoNoveZalozkyVeStejneFazi, favorite: true },
                                  //  { action: this.actions.actOtevreniElObrazuDokumentu },
                                  //  { action: this.actions.actSslArchVlozit, favorite: true },
                                  //  { action: this.actions.actSslArchVyjmout, favorite: true },
                                    hromadneAkce[0]//RC 31937273 : Hromadné akce
                                ]
                            });

                        },


                        refreshGridSslSbernyArch: function () {
                            var that = this;
                            var opt = {
                                SSLDetail: null,
                                IxpSpis: this.SslDetailObsahDilu_Dto.ixp
                            };
                            this.beginOperation();
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content

                            srv.call("SeznamObsahDilu", opt) // TODO
                                .done(function (retVal) {
                                    if (retVal) {
                                        that.SslDetailObsahDilu_Dto.ListObsahDilu = retVal;
                                        that.sslArchIsMoved = false;
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
                                var data = this.SslDetailObsahDilu_Dto.ListObsahDilu;
                                this.viewSbernyArch.updateData(data, "set", true); // dsebesta ref T19864 po update tam zustavali vyset řádky co u jsem nechtěl dříve byl "update"
                                //update //"add" | "update" | "extend" | "refresh" | "delete" | "set" | "reset"  dříve "update"
                                if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                    return;
                                }
                                this.gridSbernyArch.ggrid("refreshRows");


                                this.sslSbernyArchNastavEnableAkceZRadkuGridu();
                                this.znovuNactiPocetAVelikostiSouboru();
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

                            this.actions.actSslArchVyjmout.update({ enabled: false });
                            this.actions.actSslArchVyjmout.update({ visible: this.sslArchIsMoved ? false : true });

                            if (trueRow && trueRow.aktivita != null && trueRow.ixp != null) {

                                var opt = {
                                    IxpSpis: trueRow.ixp,
                                    IxpDok: trueRow.ixp,
                                    Aktivita: trueRow.aktivita,
                                    // VztahSpis: trueRow.vztah_spis
                                };

                                var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                //this.beginOperation();
                                this.promisSbernyArchSpisuEnabledActions = srv.call("SbernyArchTypoveEntityEnabledActions", opt, null, { progressState: false })  
                                    .done(function (retVal) {
                                        if (retVal.StavBool) {
                                            that.SslDetailObsahDilu_Dto.nastavenoZRadkuGridu = true;
                                            that.actions.actSslArchVyjmout.update({ enabled: retVal.BoolParam3 }); //LzeVyjmoutPisemnost

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
                                    this.refreshGridSslSbernyArch();
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
                                    that.refreshGridSslSbernyArch();
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
                                IxpVkladanehoDok: this.SslDetailObsahDilu_Dto.ixp,
                                TypSpis: 0
                            };

                            this.hledatIdentDokSpi(
                                function (retVal) { // 
                                    var idDokumentu = retVal.ixp;
                                    if (idDokumentu) {
                                        var IDSpisVlozitDoSpisu = that.SslDetailObsahDilu_Dto.ixp + "|" + "empty";
                                        //_this.onDoneFunction = this.ZnovuVlozitDoSpisuSubmit;
                                        var opt = {
                                            IxpSpis: that.SslDetailObsahDilu_Dto.ixp,
                                            IxpDok: idDokumentu,
                                            IDSpisVlozitDoSpisu: IDSpisVlozitDoSpisu,
                                            content: that,

                                        };
                                        that.beginOperation();
                                        Gordic.Ssl.Utils.dotazIRPNaVlozeniDokumentuDoSpisu(opt)
                                            .done(function (rv) {
                                                that.refreshGridSslSbernyArch();
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

                        //#region akce

                        zaregistrujHromadneAkce: function () {
                            var opt = {
                                content: this,
                                getSelectedRowsInfoFromList: this.getSelectedRowsInfoFromList, // WflListBase
                                getIxpArrayFromSelection: this.getIxpArrayFromSelection,// WflListBase
                                zpracujResultSGroupResult: this.zpracujResultSGroupResult, //WflListBase
                                getIxpOfActiveRow: this.getIxpOfActiveRow, // WflListBase
                                reload: this.refreshGridSslSbernyArch, // WflListBase // reload
                                isNutnyVyberDenikuCj: componentDto.IsNutnyVyberDenikuCj, //WflListBase
                                // IxsBlp: string, nakonec bráno z kontentu aktualní hodnota
                                // AlternativeIxpArray?: any[], // bráno z kontentu
                                ssl_rem_dokd: componentDto.ssl_rem_dokd, //WflListBase,
                                actNameSufix: "DetailSbernyArch",
                                //getSelectedGDataAkceSslProfil: this.getSelectedGDataAkceSslProfil
                            };

                            // registruju akce na kontent
                            Gordic.Wfl.Globals.ListSupport.HromadneAkceZaregistrujnaContent(opt);

                            this.menuHromadneAKceSbernyarch = Gordic.Wfl.Globals.ListSupport.HromadneAkceVratMenu({ content: content, actNameSufix: "DetailSbernyArch" });
                        },
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
                        //getSelectedGDataAkceSslProfil: function(){
                        //    if (Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                        //        return this.gridSbernyArch.ggrid("getSelection").map((o) => { return { ixp: o.ixp, SpPlan: o.spis_pl, SpZnak: o.spis_znak, SkartZnak: o.skar_znak, SkartLhuta: o.skar_lhuta, SkartLhutaSpra: o.skar_lhuta_spra, RokSkartace: o.rok_skartace, }; });
                        //    }
                        //},

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

                        visibleHromadneAkce: function () {
                            var dto = this.getVisibleHromadneAkceDto();

                            var optHideShowHromadneAkce = {
                                content: this,
                                hromadneAkceWflDto: dto,
                                actNameSufix: "DetailSbernyArch"
                            };
                            // určím kterí budou vidět a které ne
                            Gordic.Wfl.Globals.ListSupport.HideShowHromadneAkce(optHideShowHromadneAkce);
                        },

                        getVisibleHromadneAkceDto: function () {
                            var defaultDto = Gordic.Wfl.Globals.ListSupport.GetDefaultGHromadneWflAkceDto();

                            var visible = true;
                            var simpleMode = componentDto.SimpleMode;
                            if (simpleMode) {
                                visible = false;
                            }
                            //tato sekce je specifická pro každá content. vybereš si které chceš a které ne
                            // Defaultně jsou všechny true.

                            defaultDto.PredatPrimo = simpleMode ? true : visible;
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
                            defaultDto.OpravaMetadatSeznamNew = simpleMode ? true : visible;
                            defaultDto.OpravitMetadataPoKontroleSeznam = simpleMode ? true : visible;
                            defaultDto.ZmenitFormuHromadne = visible;
                            defaultDto.ZtvarneniMetadatSpisuHromadne = false;
                            defaultDto.ZmenitDilciDokTerminHromadne = visible;
                            defaultDto.ZmenitDoplnekZnackyHromadne = visible;
                            defaultDto.ZmenitPocetListu = visible;
                            defaultDto.ZmenitPocetPriloh = visible;
                            defaultDto.ZmenitPocetListuPriloh = visible;
                            defaultDto.ZmenitPoznamkuHromadne = visible;
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
                            defaultDto.VlozitSpisEpkHromadne = false;
                            defaultDto.VyriditAdActaHromadne = simpleMode ? true : visible;
                            defaultDto.VyriditDokumentyHromadne = simpleMode ? true : visible;
                            defaultDto.VyriditSpisyHromadne = false;
                            defaultDto.ZrusitVyrizeniDokumentuHromadne = visible;
                            defaultDto.ZrusitVyrizeniSpisuHromadne = false;
                            defaultDto.ZrusitUzavreniSpisuHromadne = false;
                            defaultDto.PrerusitHromadne = visible;
                            defaultDto.PriorovatHromadne = false;
                            defaultDto.PredatDokumentyExtAgHromadne = visible;
                            defaultDto.PredatSpisyExtAgHromadne = visible;
                            defaultDto.PrevzitExtAgHromadne = visible;
                            defaultDto.PridatKlSlovaHromadne = visible;
                            defaultDto.OdebratKlSlovaHromadne = visible;
                            defaultDto.VlozitDokumentSpisDoBaliku = false;
                            defaultDto.VyjmoutDokumentSpisZBaliku = false;
                            defaultDto.VytvoritBalikAVlozitSeznam = false;
                            defaultDto.PridatSpisyZDokumentuHromadne = false;
                            defaultDto.PridatDokumentyVlozeneDoSpisuHromadne = false;
                            defaultDto.PoznamkovyBlokPridatHromadne = visible;
                            defaultDto.OznacitJakoPrecteneHromadne = visible;
                            defaultDto.OznacitJakoNeprecteneHromadne = visible;
                            defaultDto.TiskListWfl = visible;
                            defaultDto.TiskPevny = visible;
                            defaultDto.TiskSpisObalky = false;
                            defaultDto.TiskSbernyArch = false;
                            defaultDto.Obcerstvit = visible;
                            defaultDto.UzivatelskeSloupceVlastnosti = false;
                            defaultDto.UlozitDoClipboardu = true;
                            // konec specifické sekce

                            return defaultDto;
                        },


                        //#endregion
                        enableSslDetailSbernyArch: function () {
                            var that = this;
                            var l_bActionEnabled = true;
                            if (this.EditMode === true || (this.RezimPodani != null && this.RezimPodani != 0)) {
                                l_bActionEnabled = false;
                            }

                            this.actions.actSslArchVlozit.update({ enabled: this.SslDetailObsahDilu_Dto.VlozitEnabled });
                            this.actions.actSslArchVyjmout.update({ enabled: false });
                        }
                    },

                    actions: { //může být zadáno jako pole nebo jako objekt

                        actSslArchVlozit: {
                            caption: "jres:31937470", //RC 31937470 : Vložit nový
                            tooltip: "jres:31937471", //RC 31937471 : Otevře hledání nového dokumentu, který bude vložen do spisu.
                            run: function () {
                                $.content(this).sslArchVlozitZaznam();
                            }
                        },
                        actSslArchVyjmout: Gordic.Wfl.PreActions.VyjmoutZeSpisuHromadne({
                            inputData: function () {
                                var def = $.Deferred();
                                var inputData = {
                                    data: content.getSelectedRowsInfoFromList(),
                                    ssl_rem_dokd: componentDto.ssl_rem_dokd,
                                };

                                return def.resolve(inputData).promise();
                            },
                            done: function (retVal) {
                                content.zpracujResultSGroupResult(retVal);
                            },
                            fail: function (retVal) {
                                if (retVal && retVal !== "") {
                                    var rows = content.getSelectedRowsInfoFromList();
                                    var GroupResult = Gordic.Wfl.Globals.createGroupResultForErrorBulkOperation(rows, retVal);

                                    content.zpracujResultSGroupResult({ GroupResult: GroupResult });
                                }
                            },
                            actionParams: {
                                caption: "jres:26255302", //RC 26255302 : Vyjmout
                                tooltip: "jres:26255302", //RC 26255302 : Vyjmout
                                name: "actSslArchVyjmout"
                            }
                        }),

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
                        actOtevreniElObrazuDokumentu: {
                            caption: "jres:26257431", //RC 26257431 : Otevřít hlavní přílohu
                            icon: "gi-eattachment",
                            tooltip: "jres:26257431", //RC 26257431 : Otevřít hlavní přílohu
                            run: function (ev, ctx) {
                                var cnt = $.content(this);
                                var ixp = cnt.getIxpOfActiveRow();
                                if (ixp) {
                                    Gordic.Wfl.AttachmentUtils.ShowMainAttachment(cnt, ixp, false);
                                }
                            }
                        },

                    },

                    tabs: {
                        SslSbernyArch: {
                            tabParams: {
                                title: componentDto.NadpisTabu,

                                group: $.extend(
                                    Gordic.Prefabs.TabGroups.SbernyArch(componentDto.NadpisTabu), {
                                   // badge: content.sbernyArchBadge
                                })
                            },
                           
                            init: function (tab) {
                                //#region definice tab dokumentu
                                var that = $.content(tab);
                                    //.addNumberColumn({
                                
                                //var menuHromadneAKce = Gordic.Wfl.Globals.ListSupport.HromadneAkceVratMenu({ content: content });
                                var menubarSbernyArch = [
                                    // { action: "actSslArchRefresh", favorite: true },
                                    { action: "actSbernyArchOtevriNovyDetail"},
                                    { action: "actOtevriDokumentDoNoveZalozkyVeStejneFazi"},
                                  //  { action: "actOtevreniElObrazuDokumentu"},
                                  //  { action: "actSslArchVlozit", favorite: true },
                                  //  { action: "actSslArchVyjmout", favorite: true },
                                    , { type: "static", caption: "jres:31937273", favorite: true, children: that.menuHromadneAKceSbernyarch }//favoriteHromadneAkceDto: favoriteHromadneAkceDto //RC 31937273 : Hromadné akce
                                ]
                                /*
                                tab.one('gtabopen', (ev, ctx) => { // Vlastův života zachraný zlepšovák
                                    var bar = that.actions.createBar(menubarSbernyArch);
                                    tab.gtab("setMenuBar", bar);
                                })
                                */

                                tab.one('gtabopen', function (ev, ctx) { // Vlastův života zachraný zlepšovák
                                    var bar = that.actions.createBar(menubarSbernyArch);
                                    var opt = {
                                        content: that,
                                        menuParamsArr: bar
                                    };
                                    Gordic.Wfl.Globals.ListSupport.NastavHiddenZbytecnymSeparatorumZMenuParams(opt);

                                    tab.gtab("setMenuBar", bar, that.userSettings.sub("menuBarSbernyArchTab"));
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