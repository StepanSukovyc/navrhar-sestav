(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DetailBuilderComponents", {
        SslDetailSbernyArch: {
            create: function (content, componentDto) {
                //definice badge ve sběrném archu
                content.sbernyArchBadge = new GObservableObject({
                    id: "wflSbernyArchBadge",
                    value: "0",
                    tooltip: "0",
                    customClass: "g-state-info" //zobrazeni, akt. moznosti: g-state-info, g-state-important, g-state-warning, g-state-error
                });
                content.statusSbernyArchStatusVelikostSouboru = new GObservableObject({
                  
                    type: "static",
                    id: "statusSbernyArchStatusVelikostSouboru",
                    caption: undefined,
                });


                var result = {
                    onInit: [
                        function () {
                            this.GroupResult = undefined;

                            this.zaregistrujHromadneAkce();
                            this.visibleHromadneAkce();
                        }
                    ],
                    onBuild: [
                        function () {
                            this.sslArchIsMoved = false;

                            this.enableSslDetailSbernyArch();

                            //  this.nasetujSbernyArch(this.SslDetailSbernyArch_Dto);
                            this.sslSbernyArchNastavEnableAkceZRadkuGridu();
                            this.updatePocetAVelikostiSouboru(componentDto.KpiVelikostaPocetSoboru);
                        }
                    ],

                    contentExtensions: { //sem patří funkce volané z akcí ... this je stejné this jako v onContentReady

                        setSslDetailSbernyArch_Dto: function (newDto) {
                            var that = this;
                            if (newDto != null) {
                                this.SslDetailSbernyArch_Dto = newDto;
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
                                key: "por_cislo"
                            };
                            var data = this.SslDetailSbernyArch_Dto.ListSbernyArchSpisu;
                            if (this.isTreeActivated()) {
                                data = this.SslDetailSbernyArch_Dto.ListTreeSbernyArchSpisu;
                                viewOpt.key = "ixp";
                                viewOpt.processors = {
                                    //provider: new Gordic.Data.Provider(function (req) {
                                    //    if (!req.data) return [_this.newItem(0, null)]; // root

                                    //    var d = [];   // random data
                                    //    for (var i = 0; i < Math.random() * 10; i++)
                                    //        d.push(_this.newItem(id++, req.data.index));
                                    //    return req.data.index < 10 ? d : [];
                                    //}),
                                    tree: new Gordic.Data.Tree(
                                        Gordic.Data.Tree.parentIdOrganizer("ixp_spis"),
                                        {
                                            defaultState: "open"
                                        }
                                    ) //,  // defaultnistav radku je „nenacteno“, tzn [+] ale bez children
                                };
                            }

                            if (createEmptyGrid) { // při přepínání modu je potřeba vytvořit prázdný grid
                               data = [];
                            }

                            this.viewSbernyArch = new Gordic.Data.View(
                                data,
                                viewOpt
                            );

                            if (componentDto.IsSoucast && this.isSbernyArchTreeModeEnable() && !this.isTreeActivated()) {
                                this.sslArchIDily();
                            }
                            var columnListObj = {columnList:""};
                            var gridKolonky = Gordic.Ssl.GSslCommonDlg.getGridColumnsSbernyArch(
                                {
                                    ZnackaText: this.SslDetailSbernyArch_Dto.ZnackaText,
                                    isTreeMode: this.isTreeActivated(),
                                    ssl_nev_posepk: this.SslDetailSbernyArch_Dto.ssl_nev_posepk,
                                    ssl_uzooznacfun: this.SslDetailSbernyArch_Dto.ssl_uzooznacfun,
                                    content: this,
                                    pouzivatDilciTerminy: this.SslDetailSbernyArch_Dto.PouzivatDilciTerminy,
                                    withoutDoplnujiciInformace: true,
                                    IxsFunAkt: componentDto.IxsFunAkt,
                                    IxsSuAkt: componentDto.IxsSuAkt,
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
                                sort: "por_cislo_uziv",
                                defaultAction: this.actions.actSbernyArchOtevriNovyDetail, //selectAction
                                cellActivate: function (ev, row) {
                                    that.sslSbernyArchNastavEnableAkceZRadkuGridu(row);
                                },
                                multi: !this.isTreeActivated(),
                                scrollHelperTemplate: "{nazev_ext}",  // "{ixs_esu} - {nazev}",
                                //searchColumns: ["nazev_ext"],
                                columns: gridKolonky,
                                defaultProfile: {
                                    //condFormats: condFormats,
                                    columnList: columnListObj.columnList
                                },
                                rowsClass: function (dataRow) {
                                    if (dataRow && dataRow.data && dataRow.data.aktivita !== 100 ) { // přiřazená 300  
                                        return " ui-disabled data-deleted ";// + Gordic.Global.Enums.ColorStateClass.inactive; //g-state-inactive data-deleted  
                                    } else return "  ";
                                },
                                contextMenu: [
                                    { action: this.actions.actSbernyArchOtevriNovyDetail, favorite: true },
                                    { action: this.actions.actOtevriDokumentDoNoveZalozkyVeStejneFazi, favorite: true },
                                    { action: this.actions.actOtevreniElObrazuDokumentu },
                                    { action: this.actions.actSslArchPosunUplneNahoru, favorite: true },
                                    { action: this.actions.actSslArchPosunNahoru, favorite: true },
                                    { action: this.actions.actSslArchPosunDolu, favorite: true },
                                    { action: this.actions.actSslArchPosunUplneDolu, favorite: true },
                                    { action: this.actions.actSslArchUlozitMoves, favorite: true },
                                    { action: this.actions.actSslArchZrusitMoves, favorite: true },
                                    { action: this.actions.actSslArchZnovuVlozit, favorite: true },
                                    { action: this.actions.actSslArchVlozit, favorite: true },
                                    { action: this.actions.actSslArchVyjmout, favorite: true },
                                    { action: this.actions.actSslArchVyrizujici, favorite: true },
                                    { action: this.actions.actSslArchZmenitDatVlozeni, favorite: true },
                                    { action: this.actions.actSslArchPrilohy, favorite: false },
                                    //{ action: this.actions.actPoznamkovyBlokPridat, favorite: true },
                                    { action: this.actions.actTiskArchu, favorite: true },
                                    hromadneAkce[0]//RC 31937273 : Hromadné akce
                                ]
                            });

                        },


                        refreshGridSslSbernyArch: function () {
                            var that = this;
                            var opt = {
                                SSLDetail: null,
                                IxpSpis: this.SslDetailSbernyArch_Dto.ixp
                            };
                            this.beginOperation();
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            if (this.isTreeActivated()) {
                                srv.call("SeznamSbernyArchTypovehoSpisuTree", opt)
                                    .done(function (retVal) {
                                        if (retVal) {
                                            that.SslDetailSbernyArch_Dto.ListTreeSbernyArchSpisu = retVal;
                                            that.sslArchIsMoved = false;
                                            that.setGridSbernyArch();
                                        }
                                    })
                                    .always(function () {
                                        that.endOperation();
                                        srv.close();
                                    })
                                    ;
                            } else {
                                srv.call("SeznamSbernyArchSpisuNeboTypovehoSpisu", opt) //dsebesta dříve // SeznamSbernyArchSpisu
                                    .done(function (retVal) {
                                        if (retVal) {
                                            that.SslDetailSbernyArch_Dto.ListSbernyArchSpisu = retVal;
                                            that.sslArchIsMoved = false;
                                            that.setGridSbernyArch();
                                        }
                                    })
                                    .always(function () {
                                        that.endOperation();
                                        srv.close();
                                    })
                                    ;
                            }



                        },
                        setGridSbernyArch: function () {
                            var that = this;
                            if (Gordic.Utils.WidgetExists("ggrid", this.gridSbernyArch)) {
                                var data = this.SslDetailSbernyArch_Dto.ListSbernyArchSpisu;
                                if (this.isTreeActivated()) {
                                    data = that.SslDetailSbernyArch_Dto.ListTreeSbernyArchSpisu;
                                }
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

                            var treeActivated = this.isTreeActivated();

                            this.actions.actSslArchVyjmout.update({ enabled: false });
                            this.actions.actSslArchVyrizujici.update({ enabled: false });
                            this.actions.actSslArchZmenitDatVlozeni.update({ enabled: false });
                            this.actions.actSslArchZnovuVlozit.update({ enabled: false });
                            this.actions.actSslArchPrepniNaStromAZpet.update({ visible: this.isSbernyArchTreeModeEnable() });

                            this.actions.actSslArchIDily.update({ visible: componentDto.IsSoucast && this.isSbernyArchTreeModeEnable() && !treeActivated });

                            this.actions.actSslArchVyjmout.update({ visible: this.sslArchIsMoved ? false : true });
                            this.actions.actSslArchVyrizujici.update({ visible: this.sslArchIsMoved ? false : true });
                            this.actions.actSslArchZmenitDatVlozeni.update({ visible: this.sslArchIsMoved ? false : true });
                            this.actions.actSslArchZnovuVlozit.update({ visible: this.sslArchIsMoved ? false : true });
                            //this.actions.actSslArchVlozit.update({ visible: this.sslArchIsMoved ? false : true }); //  dsebesta 14.6 Netřeba vypořítávat z řádku
                            this.actions.actTiskArchu.update({ visible: this.sslArchIsMoved ? false : true });

                            this.actions.actSslArchUlozitMoves.update({ visible: this.sslArchIsMoved && !treeActivated ? true : false });
                            this.actions.actSslArchZrusitMoves.update({ visible: this.sslArchIsMoved && !treeActivated ? true : false });

                            this.actions.actSslArchPosunUplneDolu.update({ visible: !treeActivated });
                            this.actions.actSslArchPosunUplneNahoru.update({ visible: !treeActivated });
                            this.actions.actSslArchPosunDolu.update({ visible: !treeActivated });
                            this.actions.actSslArchPosunNahoru.update({ visible: !treeActivated });

                            if (trueRow && trueRow.aktivita != null && trueRow.ixp != null) {

                                var opt = {
                                    IxpSpis: trueRow.ixp_spis,
                                    IxpDok: trueRow.ixp,
                                    Aktivita: trueRow.aktivita,
                                    // VztahSpis: trueRow.vztah_spis
                                };

                                var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                //this.beginOperation();
                                this.promisSbernyArchSpisuEnabledActions = srv.call("SbernyArchSpisuEnabledActions", opt, null, { progressState: false }) // srv.call("SbernyArchSpisuEnabledActions", opt, null, { progressState: false } 
                                    .done(function (retVal) {
                                        if (retVal.StavBool) {
                                            that.SslDetailSbernyArch_Dto.nastavenoZRadkuGridu = true;
                                            that.actions.actSslArchVyrizujici.update({ enabled: retVal.BoolParam1 && that.SslDetailSbernyArch_Dto.VyrizujiciEnabled && trueRow.aktivita === 100 }); //ActionNastavitVyrizujiciEnabled 
                                            that.actions.actSslArchZmenitDatVlozeni.update({ enabled: retVal.BoolParam2 }); //ActionaZmenitDatVlozeniEnabled
                                            that.actions.actSslArchVyjmout.update({ enabled: retVal.BoolParam3 }); //LzeVyjmoutPisemnost

                                            //that.actions.actSslArchVlozit.update({ enabled: retVal.BoolParam4 }); //  dsebesta 14.6 Netřeba vypořítávat z řádku
                                            that.actions.actSslArchZnovuVlozit.update({ enabled: retVal.BoolParam5 }); // toto
                                        }
                                        //that.endOperation();
                                    }).always(function () { srv.close(); });
                                this.actions.actSslArchZnovuVlozit.update({ enabled: that.SslDetailSbernyArch_Dto.ZnovuVlozitEnabled && (trueRow.aktivita === 500 || trueRow.aktivita === 300) });
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

                        CreateGroupResult: function (error, isError, key, rowState) {
                            return { Error: error, IsError: isError, Key: key, RowState: rowState }
                        },

                        //sslArchZnovuVlozitDoSpisu: function () {

                        //    var that = this;

                        //    var selection = this.gridSbernyArch.ggrid("getSelection");
                        //    if (selection.length === 1) {

                        //        var idDokumentu = selection[0].ixp;

                        //        var IDSpisVlozitDoSpisu = this.SslDetailSbernyArch_Dto.ixp + "|" + "empty";
                        //        //_this.onDoneFunction = this.ZnovuVlozitDoSpisuSubmit;
                        //        var opt = {
                        //            IxpSpis: that.SslDetailSbernyArch_Dto.ixp,
                        //            IxpDok: idDokumentu,
                        //            IDSpisVlozitDoSpisu: IDSpisVlozitDoSpisu,
                        //            content: this,

                        //        };
                        //        that.beginOperation();
                        //        Gordic.Ssl.Utils.dotazIRPNaVlozeniDokumentuDoSpisu(opt)
                        //            .done(function (rv) {
                        //                that.refreshGridSslSbernyArch();
                        //            })
                        //            .always(function () {
                        //                that.endOperation();
                        //            })
                        //            ;

                        //    } else {
                        //        this.dialogs.alert("jres:31937042", "jres:31937064"); //RC 31937064 : Je označeno příliš mnoho řádků
                        //    }
                        //},

                        //sslArchVyjmoutZeSpisu: function () {
                        //    var that = this;

                        //    var selection = this.gridSbernyArch.ggrid("getSelection");
                        //    if (selection.length === 1) {

                        //        var idDokumentu = selection[0].ixp;

                        //        var IDSpisVlozitDoSpisu = this.SslDetailSbernyArch_Dto.ixp + "|" + "empty";
                        //        //_this.onDoneFunction = this.ZnovuVlozitDoSpisuSubmit;

                        //        var def = $.Deferred();

                        //        var optVlozit = {
                        //            def: def,
                        //            IDSpisVlozitDoSpisu: IDSpisVlozitDoSpisu,
                        //            content: this
                        //        };
                        //        that.beginOperation();
                        //        Gordic.Ssl.Utils.vlozitVyjmoutZeSpisu(false, idDokumentu, optVlozit);

                        //        def.done(function () {
                        //            that.refreshGridSslSbernyArch();
                        //        })
                        //            .always(function () {
                        //                that.endOperation();
                        //            })
                        //            ;

                        //    } else {
                        //        this.dialogs.alert("jres:31937042", "jres:31937064"); //RC 31937064 : Je označeno příliš mnoho řádků
                        //    }
                        //},
                        sslArchVlozitZaznam: function () {
                            var that = this;
                            var options =
                            {
                                IxpVkladanehoDok: this.SslDetailSbernyArch_Dto.ixp,
                                TypSpis: 0
                            };

                            this.GroupResult = [];

                            this.hledatIdentDokSpi(
                                function (retVal) { // 
                                    var idDokumentu = retVal.ixp;
                                    if (idDokumentu) {
                                        var IDSpisVlozitDoSpisu = that.SslDetailSbernyArch_Dto.ixp + "|" + "empty";
                                        //_this.onDoneFunction = this.ZnovuVlozitDoSpisuSubmit;
                                        var opt = {
                                            IxpSpis: that.SslDetailSbernyArch_Dto.ixp,
                                            IxpDok: idDokumentu,
                                            IDSpisVlozitDoSpisu: IDSpisVlozitDoSpisu,
                                            content: that,

                                        };
                                        that.beginOperation();
                                        Gordic.Ssl.Utils.dotazIRPNaVlozeniDokumentuDoSpisu(opt)
                                            .done(function (rv) {
                                                 var gr = that.CreateGroupResult("", false, idDokumentu, 0);
                                                 that.GroupResult.push(gr);

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
                        sslArchVyrizujiciPisemnostSpisu: function () {
                            var that = this;
                            if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                return;
                            }

                            this.GroupResult = [];

                            var selection = this.gridSbernyArch.ggrid("getSelection");
                            if (selection.length === 1) {

                                var idDokumentu = selection[0].ixp;
                                var opt = {
                                    IxpSpis: this.SslDetailSbernyArch_Dto.ixp,
                                    IxpDok: idDokumentu

                                };
                                var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                this.beginOperation();
                                srv.call("VyrizujiciPisemnostSpisu", opt)
                                    .done(function (retVal) {
                                        if (retVal.StavBool) {
                                            var gr = that.CreateGroupResult("", false, idDokumentu, 0);
                                            that.GroupResult.push(gr);

                                            that.refreshGridSslSbernyArch();
                                        } else {
                                            that.dialogs.alert("jres:31937043"); //RC 31937043 : Něco se nepovedlo.
                                        }
                                    })
                                    .always(function () {
                                        that.endOperation();
                                        srv.close();
                                    })
                                    ;

                            } else {
                                this.dialogs.alert("jres:31937042", "jres:31937064"); //RC 31937064 : Je označeno příliš mnoho řádků
                            }

                        },

                        //sslArchVlozitDoBloku: function () {
                        //    var that = this;

                        //    var selection = this.gridSbernyArch.ggrid("getSelection");
                        //    if (selection.length > 0) {

                        //        var idDokumentu = selection[0].ixp;
                        //        var opt = {
                        //            IxpSpis: this.SslDetailSbernyArch_Dto.ixp,
                        //            IxpDok: idDokumentu

                        //        };
                        //        var srv = this.createServiceContent({ className: "Gordic.Ssl.WebClient.GDetailUtils", params: {} });  //servisni sluzba/content
                        //        this.beginOperation();
                        //        srv.call("VyrizujiciPisemnostSpisu", opt)
                        //            .done(function (retVal) {
                        //                if (retVal.StavBool) {
                        //                    that.refreshGridSslSbernyArch();
                        //                } else {
                        //                    that.dialogs.alert("jres:31937043"); //RC 31937043 : Něco se nepovedlo.
                        //                }
                        //            })
                        //            .always(function () {
                        //                that.endOperation();
                        //            })
                        //            ;

                        //    } else {
                        //        this.dialogs.alert("jres:31937042", "jres:26257032"); //RC 26257032 : Označte řádek.
                        //    }

                        //},

                        sslArchZmenitDatVlozeni: function () {
                            var that = this;
                            if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                return;
                            }

                            this.GroupResult = [];

                            var selection = this.gridSbernyArch.ggrid("getSelection");
                            if (selection.length === 1) {

                                var idDokumentu = selection[0].ixp;

                                var form = new Gordic.Forms.Form()
                                    .addRow("jres:26256683") //RC 26256683 : Datum vložení do spisu
                                    .addField("gdatebox", { name: "date", valueType: "date" });
                                var simpeForm = this.dialogs.simpleForm("jres:26256683", form, null, { width: 400, height: 230 });  //RC 26256683 : Datum vložení do spisu

                                simpeForm.on("ok", function (ev, data) {
                                    if (data && data.date) {
                                        var opt = {
                                            "IxpSpis": that.SslDetailSbernyArch_Dto.ixp,
                                            "IxpDok": idDokumentu,
                                            "SpisDatZmena": that.datZmena,
                                            "DatOd": data.date
                                        };
                                        var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                                        that.beginOperation();
                                        srv.call("ZmenitDatVlozeniDoSpisu", opt) // nevyvolá se preloader   
                                            .done(function (retVal) {
                                                if (retVal) {
                                                    var gr = that.CreateGroupResult("", false, idDokumentu, 0);

                                                    that.GroupResult.push(gr);

                                                    that.refreshGridSslSbernyArch();
                                                }
                                            })
                                            .always(function () {
                                                that.endOperation();
                                                srv.close();
                                            })
                                            ;
                                    }
                                });
                            } else {
                                this.dialogs.alert("jres:31937042", "jres:31937064"); //RC 31937064 : Je označeno příliš mnoho řádků
                            }
                        },

                        sslArchPrilohySpisu: function () {

                            var that = this;
                            if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                return;
                            }

                            var opt = {
                                IxpSpis: this.SslDetailSbernyArch_Dto.ixp
                            };

                            Gordic.Ssl.Dialogs.PrilohyObsahSpisuDlg(this, opt, Gordic.Global.Enums.ModOtevreni.navigate);
                        },

                        //#region pole

                        sslArchMoveInList: function (typ) {

                            this.sslArchIsMoved = true;
                            if (!Gordic.Utils.WidgetExists('ggrid', this.gridSbernyArch)) {
                                return;
                            }
                            var selection = this.gridSbernyArch.ggrid("getSelection");
                            switch (typ) {
                                case 0: //0 dolu
                                    this.sslArchPosunDoluPripravit(selection);
                                    this.setGridSbernyArch();
                                    break;
                                case 1: //1nahoru
                                    this.sslArchPosunNahoruPripravit(selection);
                                    this.setGridSbernyArch();
                                    break;
                                case 2: // uplne dolu
                                    this.sslArchPosunUplneDoluPripravit(selection);
                                    this.setGridSbernyArch();
                                    break;
                                case 3:// uplne nahoru
                                    this.sslArchPosunUplneNahoruPripravit(selection);
                                    this.setGridSbernyArch();
                                    break;

                                default:
                            }
                            this.sslSbernyArchNastavEnableAkceZRadkuGridu();

                        },


                        //Dolu
                        sslArchPosunDoluPripravit: function (selection) {
                            var that = this;
                            $(selection.reverse()).each(function (index, element) {
                                that.sslArchPosunDolu(that.SslDetailSbernyArch_Dto.ListSbernyArchSpisu, element.por_cislo_uziv);

                            });
                        },
                        sslArchPosunDolu: function (input, por_cislo_uziv) {
                            //var index = input.findIndex(item => item.por_cislo_uziv === por_cislo_uziv);
                            var index = -1;
                            for (var i = 0; i < input.length; ++i) {
                                if (input[i].por_cislo_uziv === por_cislo_uziv) {
                                    index = i;
                                    break;
                                }
                            }

                            //var indexDolu = input.findIndex(item => item.por_cislo_uziv === por_cislo_uziv + 1); 
                            var indexDolu = -1;
                            for (var i = 0; i < input.length; ++i) {
                                if (input[i].por_cislo_uziv === por_cislo_uziv + 1) {
                                    indexDolu = i;
                                    break;
                                }
                            }
                            if (index !== -1 && indexDolu !== -1) {
                                this.sslArchSwapIndex(input, index, indexDolu)
                            }
                        },
                        //nahoru
                        sslArchPosunNahoruPripravit: function (selection) {
                            var that = this;
                            $(selection).each(function (index, element) {
                                that.sslArchPosunNahoru(that.SslDetailSbernyArch_Dto.ListSbernyArchSpisu, element.por_cislo_uziv);
                            });
                        },
                        sslArchPosunNahoru: function (input, por_cislo_uziv) {
                            //var index = input.findIndex(item => item.por_cislo_uziv === por_cislo_uziv);
                            var index = -1;
                            for (var i = 0; i < input.length; ++i) {
                                if (input[i].por_cislo_uziv === por_cislo_uziv) {
                                    index = i;
                                    break;
                                }
                            }
                            //var indexNahoru = input.findIndex(item => item.por_cislo_uziv === por_cislo_uziv - 1);
                            var indexNahoru = -1;
                            for (var i = 0; i < input.length; ++i) {
                                if (input[i].por_cislo_uziv === por_cislo_uziv - 1) {
                                    indexNahoru = i;
                                    break;
                                }
                            }
                            if (index !== -1 && indexNahoru !== -1) {
                                this.sslArchSwapIndex(input, index, indexNahoru)
                            }
                        },

                        //uplne dolu
                        sslArchPosunUplneDoluPripravit: function (selection) {
                            var that = this;
                            var maxIndex = that.SslDetailSbernyArch_Dto.ListSbernyArchSpisu.length;

                            $(selection.reverse()).each(function (index, element) {
                                for (var i = 0; i < maxIndex; i++) {
                                    that.sslArchPosunDolu(that.SslDetailSbernyArch_Dto.ListSbernyArchSpisu, element.por_cislo_uziv);
                                }
                            });
                        },

                        //uplne nahoru
                        sslArchPosunUplneNahoruPripravit: function (selection) {
                            var that = this;
                            var maxIndex = that.SslDetailSbernyArch_Dto.ListSbernyArchSpisu.length;

                            $(selection).each(function (index, element) {
                                for (var i = 0; i < maxIndex; i++) {
                                    that.sslArchPosunNahoru(that.SslDetailSbernyArch_Dto.ListSbernyArchSpisu, element.por_cislo_uziv);
                                }
                            });
                        },

                        //společne
                        sslArchSwapIndex: function (input, index_A, index_B) {

                            var temp = input[index_A].por_cislo_uziv;

                            input[index_A].por_cislo_uziv = input[index_B].por_cislo_uziv;
                            input[index_B].por_cislo_uziv = temp;
                            input.sort(this.sslArchSortByPor_cislo_uziv);
                        },
                        sslArchSortByPor_cislo_uziv: function (a, b) {
                            var aNum = a.por_cislo_uziv;
                            var bNum = b.por_cislo_uziv;
                            return ((aNum < bNum) ? -1 : ((aNum > bNum) ? 1 : 0));
                        },
                        sslArchSaveMoves: function () {
                            var that = this;
                            var opt = {
                                IxpSpis: this.SslDetailSbernyArch_Dto.ixp,
                                List: this.SslDetailSbernyArch_Dto.ListSbernyArchSpisu,
                            };

                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            this.beginOperation();
                            srv.call("UlozitPoradiRadku", opt) // nevyvolá se preloader   
                                .done(function (retVal) {
                                    if (retVal) {
                                        that.refreshGridSslSbernyArch();
                                    }
                                })
                                .always(function () {
                                    that.endOperation();
                                    srv.close();
                                })
                                ;


                        },
                        sslArchStornoMoves: function () {
                            this.refreshGridSslSbernyArch();
                        },

                        isSbernyArchTreeModeEnable: function () {
                            var ret = false;
                            if (componentDto.IsTypovySpis || componentDto.IsSoucast) { // componentDto.IsDil už není stromovej
                                ret = true;
                            }
                            return ret;
                        },
                        isTreeActivated: function () {
                            var ret = false;
                            if (this.treeSbernyArchIsActive) { // componentDto.IsDil už není stromovej
                                ret = true;
                            }
                            return ret;
                        },
                        sslArchPrepniNaStromAZpet: function () {
                            if (this.isTreeActivated()) {
                                this.actions.actSslArchPrepniNaStromAZpet.update({
                                    caption: "jres:31937186", //RC 31937186 : Strom    
                                    icon: "gi-uzel"
                                });
                                this.treeSbernyArchIsActive = false;
                            } else {
                                this.actions.actSslArchPrepniNaStromAZpet.update({
                                    caption: "jres:31937187", //RC 31937187 : Seznam
                                    icon: "gi-list"
                                });
                                this.treeSbernyArchIsActive = true;
                            }
                            this.createSbernyArchGrid(true);
                            this.refreshGridSslSbernyArch();

                        },
                        sslArchIDily: function () {
                            this.viewSbernyArch.process({
                                filterTypSpis4: new Gordic.Data.FilterProcessor(
                                    function (row) {
                                        return row.data.typ_spis != 4;
                                    }
                                )
                            });

                            var checked = this.actions.actSslArchIDily.checked();

                            if (this.viewSbernyArch && this.viewSbernyArch.processors && this.viewSbernyArch.processors.filterTypSpis4) {
                                this.viewSbernyArch.processors.filterTypSpis4.setEnabled(!checked);
                            }
                            this.viewSbernyArch.refresh();
                        },


                        /*

                        saveSslDetailSbernyArch: function () {
                            
                            var sbernyArchModel = {
                                IsSbernyArch:true
                            };
                            this.findForms("formSslSbernyArch").findFields().gfield("model", "collect", sbernyArchModel);
                            return sbernyArchModel;
                        },
                        */
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
                        znovuNactiPocetAVelikostiSouboru: function () {
                            var that = this;
                            var srv = that.createServiceContent("Gordic.Ssl.WebClient.GDetailUtils");  //servisni sluzba/content
                            var opt = {
                                ixp: componentDto.ixp
                            }
                            srv.call("ZnovuNactiPocetAVelikostiSouboru", opt)
                                .done(function (retVal) {
                                    that.updatePocetAVelikostiSouboru(retVal);
                                })
                                .always(function () {
                                })
                                ;
                        },
                        updatePocetAVelikostiSouboru: function (dto) {
                            this.updateSbernyArchBadge(dto.VelikostPocetSoboruPocetDok, dto.VelikostaPocetSoboruVarovani);
                            this.updateStatusSbernyArchStatusVelikostSouboru(dto.VelikostaPocetSoboruVelikost, dto.VelikostaPocetSoboruVarovani);
                            
                        },
                        updateSbernyArchBadge: function (VelikostPocetSoboruPocetDok, VelikostaPocetSoboruVarovani) {
                            var that = this;
                            var tooltip = "jres:31937440 " + (VelikostPocetSoboruPocetDok ? VelikostPocetSoboruPocetDok : "0"); //RC 31937440 : Počet dokumentů:
                            if (VelikostaPocetSoboruVarovani) {
                                tooltip = tooltip + ".<br> " + VelikostaPocetSoboruVarovani;
                            }
                            
                            content.sbernyArchBadge.update( {
                                id: "statusWflPrilohyBadge",
                                value: VelikostPocetSoboruPocetDok ? VelikostPocetSoboruPocetDok : "0",
                                tooltip: tooltip,
                                customClass: VelikostaPocetSoboruVarovani ? "g-state-important"  :  "g-state-info" //zobrazeni, akt. moznosti: g-state-info, g-state-important, g-state-warning, g-state-error
                            });

                        },

                        updateStatusSbernyArchStatusVelikostSouboru: function (velikostaPocetSoboruVelikost, velikostaPocetSoboruVarovani) {
                            content.statusSbernyArchStatusVelikostSouboru.update({
                                caption: velikostaPocetSoboruVelikost ? "jres:31937442: " + velikostaPocetSoboruVelikost : "", //RC 31937442 : VELIKOST
                                tooltip: "jres:31937441 " + velikostaPocetSoboruVelikost + (velikostaPocetSoboruVarovani ? "<br>" + velikostaPocetSoboruVarovani : ""), //RC 31937441 : Velikost el. dokumentů (kB):
                                customClass: velikostaPocetSoboruVarovani ? "g-state-text g-state-important" : ""
                            });

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
                            defaultDto.PredatSpisyExtAgHromadne = false;
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

                            this.actions.actSslArchZnovuVlozit.update({ enabled: false });
                            this.actions.actSslArchVlozit.update({ enabled: this.SslDetailSbernyArch_Dto.VlozitEnabled });
                            this.actions.actSslArchVyjmout.update({ enabled: false });
                            this.actions.actTiskArchu.update({ enabled: this.SslDetailSbernyArch_Dto.TiskArchuEnabled });
                            this.actions.actSslArchPrilohy.update({ enabled: this.SslDetailSbernyArch_Dto.PrilohySpisuEnabled });

                            this.actions.actSslArchPrilohy.update({ visible: this.SslDetailSbernyArch_Dto.PrilohySpisuVisible });

                            this.actions.actSslArchVyrizujici.update({ enabled: false });
                            this.actions.actSslArchZmenitDatVlozeni.update({ enabled: false });
                            //this.actions.actPoznamkovyBlokPridat.visible(componentDto.SimpleMode? false: true);
                            //this.visibleHromadneAkce();
                        }


                    },

                    actions: { //může být zadáno jako pole nebo jako objekt

                        actTiskArchu: GAction.createPrintAction({
                            name: "actTiskArchu",
                            icon: "gi-print|gi-spis_bold gi-bgw gi-stack-pos--rb g-state-text g-state-info",
                            tema: "usu_ptm_spisarc",
                            caption: "jres:31937065",  //RC 31937065 : Tisk archu
                            reportStarting: function (rep) {
                                rep.params.X0000 = $.content(this).SslDetailSbernyArch_Dto.ixp;
                                rep.params.Preselect = false;
                            },
                        }),
                        //actSslArchZnovuVlozit: {
                        //    caption: "jres:31937066",  //RC 31937066 : Znovu vložit
                        //    run: function () {
                        //        $.content(this).sslArchZnovuVlozitDoSpisu();
                        //    }
                        //},
                        actSslArchZnovuVlozit: Gordic.Wfl.PreActions.VlozitDoSpisuSslHromadne({
                            inputData: function () {
                                return {
                                    parentContent: content,
                                    opt: { rows: content.getSelectedRowsInfoFromList(), ixpSpisuProVlozeni: componentDto.ixp }
                                };
                            },
                            done: function (retVal) {
                                content.zpracujResultSGroupResult(retVal);
                            },
                            fail: function (retVal) {
                                content.showFlash("jres:31937455", "g-state-error"); //RC 31937455 : Nepodařilo se vložit dokumenty do spisu.
                            },
                            actionParams: {
                                caption: "jres:31937066",  //RC 31937066 : Znovu vložit
                                tooltip: "jres:31937066",  //RC 31937066 : Znovu vložit
                                name: "actSslArchZnovuVlozit"
                            }
                        }),
                        actSslArchVlozit: {
                            caption: "jres:31937470", //RC 31937470 : Vložit nový
                            tooltip: "jres:31937471", //RC 31937471 : Otevře hledání nového dokumentu, který bude vložen do spisu.
                            run: function () {
                                $.content(this).sslArchVlozitZaznam();
                            }
                        },
                        //actSslArchVyjmout: {
                        //    caption: "jres:26255302", //RC 26255302 : Vyjmout
                        //    run: function () {
                        //        $.content(this).sslArchVyjmoutZeSpisu();
                        //    }
                        //},
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
                        actSslArchVyrizujici: {
                            caption: "jres:26255300", //RC 26255300 : Vyřizující
                            run: function () {
                                $.content(this).sslArchVyrizujiciPisemnostSpisu();
                            }
                        },
                        actSslArchZmenitDatVlozeni: {
                            caption: "jres:26256682", //RC 26256682 : Změnit datum vložení do spisu
                            run: function () {
                                $.content(this).sslArchZmenitDatVlozeni();
                            }
                        },
                        actSslArchPrilohy: {
                            caption: "jres:26257250", //RC 26257250 : Přílohy spisu
                            tooltip: "jres:26257251", //RC 26257251 : Všechny přílohy v rámci spisu
                            icon: "gi-attachment|gi-spis_bold gi-bgw gi-stack-pos--rb g-state-text g-state-info",
                            run: function () {
                                $.content(this).sslArchPrilohySpisu();
                            },
                        },
                        /*
                        actPoznamkovyBlokPridat: new GAction(Gordic.Wfl.PreActions.PoznamkovyBlokPridatHromadne({
                            inputData: function (action, event, ctx, param) {
                                var deferred = $.Deferred();
                                
                                //var cnt = $.content(event.target); 
                                
                                
                                var selection = content.gridSbernyArch.ggrid("getSelection");
                                if (selection.length > 0) {
                                    return deferred.resolve({
                                        IxpArr: Gordic.Ssl.WebClient.GDokumentIsl.DocumentDtosToIxps(selection)
                                    }).promise();
                                } else {
                                    content.dialogs.error("jres:26257034"); //RC 26257034 : Označte řádek pro provedení akce.
                                    return deferred.reject();
                                }
                               
                            },
                            done: function (retVal) {
                                
                                if (retVal != null) {
                                    content.zpracujResultSGroupResult(retVal);
                                    //if(retVal.GroupResult) {
                                    //    cnt.GroupResult = retVal.GroupResult;
                                    //} else {
                                    //    cnt.GroupResult = undefined;
                                    //}
                                   
                                }

                            },
                            })),
                        */
                        //actSslArchRefresh: {
                        //    caption: "Občerstvit",
                        //    run: function () {
                        //        $.content(this).sslArchRefreshList();
                        //    }
                        //},
                        actSslArchPosunNahoru: {
                            caption: "jres:26255304", //RC 26255304 : Posunout nahoru
                            tooltip: "jres:26255304", //RC 26255304 : Posunout nahoru
                            captionVisible: "never",
                            icon: "gi-arrow-down gi-rot180",
                            run: function () {
                                $.content(this).sslArchMoveInList(1);
                            }
                        },
                        actSslArchPosunDolu: {
                            caption: "jres:26255305", //RC 26255305 : Posunout dolů
                            tooltip: "jres:26255305", //RC 26255305 : Posunout dolů
                            captionVisible: "never",
                            icon: "gi-arrow-down",
                            run: function () {
                                $.content(this).sslArchMoveInList(0);
                            }
                        },
                        actSslArchPosunUplneNahoru: {
                            caption: "jres:31937067", //RC 31937067 : Posunout úplně nahoru
                            tooltip: "jres:31937067", //RC 31937067 : Posunout úplně nahoru
                            captionVisible: "never",
                            icon: "gi-arrow-double gi-rot90",
                            run: function () {
                                $.content(this).sslArchMoveInList(3);
                            }
                        },
                        actSslArchPosunUplneDolu: {
                            caption: "jres:31937068", //RC 31937068 : Posunout úplně dolů
                            tooltip: "jres:31937068", //RC 31937068 : Posunout úplně dolů
                            captionVisible: "never",
                            icon: "gi-arrow-double gi-rot270",
                            run: function () {
                                $.content(this).sslArchMoveInList(2);
                            }
                        },
                        actSslArchUlozitMoves: {
                            caption: "jres:31937069", //RC 31937069 : Uložit posunutí
                            icon: "gi-save",
                            run: function () {
                                $.content(this).sslArchSaveMoves();
                            }
                        },
                        actSslArchZrusitMoves: {
                            caption: "jres:31937070", //RC 31937070 : Zrušit posunutí
                            icon: "gi-window-close",
                            run: function () {
                                $.content(this).sslArchStornoMoves();
                            }
                        },
                        actSslArchPrepniNaStromAZpet: {
                            caption: "jres:31937186", //RC 31937186 : Strom
                            icon: "gi-uzel", //gi-list
                            visible: false,
                            run: function () {
                                $.content(this).sslArchPrepniNaStromAZpet();
                            }
                        },
                        actSslArchIDily: {
                            caption: "jres:31937200", //RC 31937200 : I díly
                            icon: "gi-folder_bold_D", //gi-list
                            tooltip: "jres:31937201", //RC 31937201 : V seznamu se zobrazí i díly
                            visible: false,
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
                            /*
                            actionParams: {
                                name: "actVytvoritBalik",
                                caption: "jres:26255568" //RC 26255568 : Vytvořit balík a vložit
                            }
                            */
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

                                // opened: true,  //1. tab je pro agednovou hlavičku, ta je pro dokumenty, spisy, zakázky atp. vždy L2M2S1. BO detaily mimo wfl (tzn. dokumenty, spisy) jsou v L1M1S1 //RC 26255308 : Dokument
                                //menuBar: [
                                //   // { action: "actSslArchRefresh", favorite: true },
                                //    { action: "actSslArchPosunUplneNahoru", favorite: true },
                                //    { action: "actSslArchPosunNahoru", favorite: true },
                                //    { action: "actSslArchPosunDolu", favorite: true },
                                //    { action: "actSslArchPosunUplneDolu", favorite: true },
                                //    { action: "actSslArchUlozitMoves", favorite: true },
                                //    { action: "actSslArchZrusitMoves", favorite: true },
                                //    { action: "actSslArchZnovuVlozit", favorite: true },
                                //    { action: "actSslArchVlozit", favorite: true },
                                //    { action: "actSslArchVyjmout", favorite: true },
                                //    { action: "actSslArchVyrizujici", favorite: true },
                                //    { action: "actSslArchZmenitDatVlozeni", favorite: true },
                                //    { action: "actPoznamkovyBlokPridat", favorite: true },
                                //    { action: "actTiskArchu", favorite: true },
                                //    { action: "actSslArchIDily", favorite: true, align: "opposite" },
                                //    { action: "actSslArchPrepniNaStromAZpet", favorite: true, align: "opposite" }
                                //],
                                group: $.extend(
                                    Gordic.Prefabs.TabGroups.SbernyArch(componentDto.NadpisTabu), {
                                    badge: content.sbernyArchBadge
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
                                    { action: "actOtevreniElObrazuDokumentu"},
                                    { action: "actSslArchPosunUplneNahoru", favorite: true },
                                    { action: "actSslArchPosunNahoru", favorite: true },
                                    { action: "actSslArchPosunDolu", favorite: true },
                                    { action: "actSslArchPosunUplneDolu", favorite: true },
                                    { action: "actSslArchUlozitMoves", favorite: true },
                                    { action: "actSslArchZrusitMoves", favorite: true },
                                    { action: "actSslArchZnovuVlozit", favorite: true },
                                    { action: "actSslArchVlozit", favorite: true },
                                    { action: "actSslArchVyjmout", favorite: true },
                                    { action: "actSslArchVyrizujici", favorite: true },
                                    { action: "actSslArchZmenitDatVlozeni", favorite: true },
                                    { action: "actSslArchPrilohy", favorite: false },
                                    //{ action: "actPoznamkovyBlokPridat", favorite: true },
                                    { action: "actTiskArchu", favorite: true },
                                    { action: "actSslArchIDily", favorite: true, align: "opposite" },
                                    { action: "actSslArchPrepniNaStromAZpet", favorite: true, align: "opposite" }
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


                                /*
                                that.actions.add({
                                    name: "actSbernyArchOtevriNovyDetail",
                                    run: function (ev, ctx) {
                                      
                                        var gridSbernyArch = that.gridSbernyArch;
                                        if (that.promisSbernyArchSpisuEnabledActions) {
                                            that.promisSbernyArchSpisuEnabledActions
                                                .always(function (retVal) {
                                                    that.otevriNovyDetail({
                                                        DetailDto: {
                                                            ixp: ctx.cellInfo.data.ixp
                                                        },
                                                        grid: gridSbernyArch
                                                    });
                                                });
                                        }
                                        else {
                                            that.otevriNovyDetail({
                                                DetailDto: {
                                                    ixp: ctx.cellInfo.data.ixp
                                                },
                                                grid: gridSbernyArch
                                            });
                                        }
                                       
                                    }
                                });
                                */
                                that.gridSbernyArchTab = tab;
                                that.gridSbernyArch = $("<div>").appendTo(tab).gautofit({ resizersOnTab: false });
                                that.createSbernyArchGrid();
                                //#endregion
                                
                            }
                        }
                    },

                    statusBar: [content.statusSbernyArchStatusVelikostSouboru]

                };

                return result;
            }

        }


    }, { pure: true, extendIntellisense: GContent });
})(jQuery);