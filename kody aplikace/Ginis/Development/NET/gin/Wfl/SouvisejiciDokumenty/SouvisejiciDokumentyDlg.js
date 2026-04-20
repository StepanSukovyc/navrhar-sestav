
$(function () {
        "use strict";
        namespace("Gordic.Wfl.WebClient.SouvisejiciDokumentyDlg", {

            onContentReady: function () {

                var that = this;
          
                //TODO IxpSouvisejici
                this.vtvorNormalniGridy();
                this.vytvorPostraniPanely();
                //#region vytvoření gsidebaru pro esu náhled
             
             
                this.naplnGridDokumenty(this.LoadData.SouvisejiciDokumenty);
                this.naplnGridSpisy(this.LoadData.SouvisejiciSpisy);
                                                  

                //this.element.gsidebar("option", { right: { visible: false } });
                //this.rightSb$.gsbpanel("show");
                if (this.IxpSouvisejici) { 
                    this.gridDokumenty.ggrid("activeRow", this.IxpSouvisejici);
                }

                this.crateStromoGrid();
                this.zobrazeni(this.isTreViewMode());

            },

            zobrazeni: function (checked) {
                var that = this;
                if (checked) {
                    this.actions.actZobrazeni.checked(true);
                    this.userSettings.set("isTreeViewMode", true);
                    this.gridDokumenty.gtab("hide");
                    this.gridSpis.gtab("hide");
                    this.stromoGrid.show();
                 
                } else {
                    this.actions.actZobrazeni.checked(false);
                    this.userSettings.set("isTreeViewMode", false);
                    this.gridDokumenty.gtab("show");
                    this.gridDokumenty.gtab("open");
                    this.gridSpis.gtab("show");
                    this.gridSpis.gtab("open");
                    this.stromoGrid.hide();
                   
                }
                this.updateActions();
            },

            isTreViewMode: function () {

                return !!t.userSettings.get("isTreeViewMode");
            },

            vytvorPostraniPanely: function () {
                var that = this;
                this.previewDiv = this.createPreviewPanel();
                this.rowToPreview = null;

                this.element.gsidebar("addPanel", "right", {
                    leaf: { caption: "jres:31926004" }, //RC 31926004 : Náhled
                    id: "panelPreview",
                    icon: "gi-nahled",
                    customDiv: this.previewDiv,
                    open: function (ev, ctx) {
                        if (that.rowToPreview != null) {
                            that.loadPreview(that.rowToPreview);
                            that.rowToPreview = null;
                        }
                    },

                });
                this.enablePreview(false);

                //#endregion

                //#region Vytvoreni gsidebaru pro porovnání
                this.comparisonBadge = new GObservableObject({ value: "0" });
                this.comparisonCnt$ = $("<div class='no-border'>").append($("<h3>", { text: "jres:31926005", style: "margin: 0.5rem" })); //RC 31926005 : Vyberte alespoň dvě položky v seznamu
                this.element.gsidebar("addPanel", "right", {
                    leaf: { caption: "jres:26226072", badge: this.comparisonBadge }, //RC 26226072 : Porovnání
                    id: "rightComparisonPanel",
                    icon: "fa-balance-scale",
                    pinned: false,
                    customDiv: this.comparisonCnt$
                });
                //#endregion


            },

            vtvorNormalniGridy: function () {
                var that = this;

                //#region dokumenty
                var opt = {
                    IxsFunEx: this.IxsFun,
                    TypAgEx: this.TypAg,
                    allowEpk: this.GinEleOkprepkPar !== 0,
                };

                //var gridKolonky = Gordic.Wfl.GWflCommonDlg.getGridSouvisejiciDokumentKolonky(this.lzeSchvalovaciProces, this.TypAg, this.IxsFun, false); // čtvrtej parametr = light verze
                var gridKolonky = Gordic.Wfl.GWflCommonDlg.getGridSouvisejiciDokumentKolonkyDlg(opt); // čtvrtej parametr = light verze
                /*
                $.content(this).actions.add({
                    name: "actDoubleClickDokumentu",
                    run: function (ev, ctx) {
                        console.log(ctx.cellInfo.data);
                        //

                    }
                });
                */

                var defaultProfile = {
                    name: "jres:32001067", //RC 32001067 : Výchozí profil
                    _locked: true,
                    columnList: "smer,OznacenoKPodepsani,stav_zpracovani_ico,ixp_vis,akt_znacka,nazev,nazev_typ,typ_ag_txt,typ_vpp_txt,priz_kriz_txt,poznamka",
                };

                that.gridDokumenty = $("<div>").appendTo(this.element)
                    .gtab({
                        title: "jres:26225848" //RC 26225848 : Související dokumenty
                        , opened: true
                        , menuBar: [
                            {
                                action: this.actions.actDetailDokumentu, favorite: true
                            },
                            {
                                action: this.actions.actOtevritVAgende, favorite: true
                            }
                        ]
                    })
                    //.height(500)
                    .gautofit({ resizersOnTab:false})
                    .ggrid({
                        defaultProfile: defaultProfile,
                        name: "GridDokumenty",
                        //data: ,
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit",  // fit, full
                        navigationMode: "row", // row, cell
                        defaultAction: this.actions.actDetailDokumentu, // $.content(this).actions.actDoubleClickDokumentu, //selectAction
                        //rowsClass: function (dataRow) {
                        //    if (dataRow && dataRow.data && dataRow.data.trideni === 0) {
                        //        return "bold";
                        //    } else return "  ";
                        //},
                        //selection: 
                        rowsClass: function (dataRow) {
                            if (dataRow && dataRow.data && dataRow.data.aktivita !== 100) {
                                return " ui-disabled data-deleted ";
                            } else return "  ";
                        },
                        cellActivate: function (ev, row) {
                            if (row != null && row.cellInfo != null && row.cellInfo.data != null) {
                                that.enablePreview(true);
                                that.showPreview(row.cellInfo.data.ixp_2);
                            } else {
                                that.enablePreview(false);
                            }

                            that.updateActions();

                        },

                        multi: false,

                        scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                        searchColumns: ["nazev", "nazev_typ", "nazev_rf", "typ_ag_doc_txt", "poznamka"],

                        columns: gridKolonky,
                    }).ggridcelleditor({ //ggridcelleditor

                        change: function (data, info) { // drive pro row eritor zde byla funkce "save"
                            var opt = {};
                            opt.Ixp1 = info.cellInfo.data.ixp_1;
                            opt.Ixp2 = info.cellInfo.data.ixp_2;
                            opt.TypVpp = info.cellInfo.data.typ_vpp;
                            opt.Poznamka = info.cellInfo.data.poznamka;
                            return $.content(this).call("ZmenaPoznamky", opt)
                                .then(
                                    function () {
                                        return data;
                                    },
                                    function () {
                                        return false;
                                    }
                                );

                        },
                    });


                ;
                //#endregion 


                //#region spisy
                /*
                var gridKolonkySpis = new Gordic.Data.GridFormat()

                    .addTextColumn({
                        name: "ixp_spis",
                        caption: "jres:26225468", //RC 26225468 : PID spisu
                    })
                    .addTextColumn({
                        name: "cj",
                        caption: "jres:26225559", //RC 26225559 : ČJ
                    })
                    .addTextColumn({
                        name: "nazev",
                        caption: "jres:26225443", //RC 26225443 : Věc
                    })
                    .addTextColumn({
                        name: "vztah_spis_txt",
                        caption: "jres:26225469", //RC 26225469 : Vztah ke spisu
                    })
                    .addTextColumn({
                        name: "nazev_rf",
                        caption: "jres:26225279", //RC 26225279 : Změnu provedl
                    });
                    */
                var gridKolonkySpis = new Gordic.Data.GridFormat()

                    .addTextColumn({
                        name: "ixp_spis",
                        caption: "jres:31926422", //RC 31926422 : PID nadřízené entity
                    })
                    .addTextColumn({
                        name: "cj",
                        caption: this.textCJShortDBParam
                    })
                    .addTextColumn({
                        name: "nazev",
                        caption: "jres:26225443", //RC 26225443 : Věc
                    })
                    .addTextColumn({
                        name: "vztah_spis_txt",
                        caption: "jres:26225469", //RC 26225469 : Vztah ke spisu
                    })
                    .addTextColumn({
                        name: "zmenu_prov_txt",
                        caption: "jres:26225279", //RC 26225279 : Změnu provedl
                    });

                $.content(this).actions.add({
                    name: "actDoubleClicSpisu",
                    run: function (ev, ctx) {
                        console.log(ctx.cellInfo.data);
                        //

                    }
                });

                that.gridSpis = $("<div>").appendTo(this.element)
                    .gtab({
                        title: this.labelDruhyGrid //RC 31926022 : Související spisy
                        , opened: true
                        , menuBar: [
                            {
                                action: this.actions.actDetailSpisu, favorite: true
                            }]
                    })
                    //.height(250)
                    .gautofit() //{ resizersOnTab:false}
                    .ggrid({
                        name: "GridSpisy",
                        //data: ,
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit",  // fit, full
                        navigationMode: "row", // row, cell
                        defaultAction: this.actions.actDetailSpisu,//$.content(this).actions.actDoubleClicSpisu, //selectAction
                        //rowsClass: function (dataRow) {
                        //    if (dataRow && dataRow.data && dataRow.data.trideni === 0) {
                        //        return "bold";
                        //    } else return "  ";
                        //},
                        rowsClass: function (dataRow) {
                            if (dataRow && dataRow.data && dataRow.data.aktivita !== 100) {
                                return " ui-disabled data-deleted ";
                            } else return "  ";
                        },
                        //selection: 
                        cellActivate: function (ev, row) {

                            if (row != null && row.cellInfo != null && row.cellInfo.data != null) {
                                that.enablePreview(true);
                                that.showPreview(row.cellInfo.data.ixp_2);
                            } else {
                                that.enablePreview(false);
                            }
                            // konec wfl náhledu

                            that.updateActions();

                        },

                        multi: false,

                        scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                        searchColumns: ["nazev", "ixp_spis", "cj", "vztah_spis_txt", "nazev_rf"],

                        columns: gridKolonkySpis,
                    });
                 //#endregion


            },
            naplnGridDokumenty: function (listDto) {
                this.ViewTabulka = new Gordic.Data.View(listDto, { key: "ixp_vis" }); 
                this.gridDokumenty.ggrid("setData", this.ViewTabulka, true);
                this.updateActions();
            },

            naplnGridSpisy: function (listDto) {
                this.ViewTabulkaSpisy = new Gordic.Data.View(listDto, { key: "ixp_spis" });
                this.gridSpis.ggrid("setData", this.ViewTabulkaSpisy, true);
                this.updateActions();
            },

            //#region updateActions

            updateActions: function () {
                var gridSpisValue = this.gridSpis.ggrid("getSelection");
                var gridDokumentValue = this.gridDokumenty.ggrid("getSelection");

                this.updateActionDetailSpisu(gridSpisValue);
                this.updateActionNovy();
                this.updateActionDetailDokumentu(gridDokumentValue);
               // this.updateActionDetailNovyDokumentu(gridDokumentValue);
                this.updateActionZmenitAktivitu(gridDokumentValue);
                this.updateActionOznacEpk(gridDokumentValue);
                //this.updateActionZmenaPoznamky(gridDokumentValue);
                this.updateActionPrilohy(gridDokumentValue);
                this.updateActionPouzeAktivni(gridDokumentValue);
                this.updateActionOdstranit(gridDokumentValue);
                //chkZobrazitNahled.Enabled = (m_oResultDok.Rows.Count > 0);

                //EnabledActionsOfRow();
                this.updateActionsStrom();
            },

            updateActionDetailSpisu: function (gridSpisValue) {
                var enabled = false;
                if (gridSpisValue && gridSpisValue.length > 0) {
                    enabled = true;
                }
                this.actions.actDetailSpisu.update({ enabled: enabled });
            },

            updateActionNovy: function () {
                var enabled = false;
                if (this.AllowActive && this.LzeSouvisejiciEditovat) {
                    enabled = true;
                }
                this.actions.actNovy.update({ enabled: enabled });
            }, 

            updateActionDetailDokumentu: function (gridDokumentValue) {
                var enabled = false;
                if (gridDokumentValue && gridDokumentValue.length > 0) {
                    enabled = true;
                }
                this.actions.actDetailDokumentu.update({ enabled: enabled });
                this.actions.actOtevritVAgende.update({ enabled: enabled });
            }, 
            //updateActionDetailNovyDokumentu: function (gridDokumentValue) {
            //    var enabled = false;
            //    if (gridDokumentValue && gridDokumentValue.length > 0) {
            //        enabled = true;
            //    }
            //    this.actions.actDetailNovy.update({ enabled: enabled });
            //}, 

            updateActionZmenitAktivitu: function (gridDokumentValue) {
                var enabled = false;
                if (this.AllowActive &&
                    gridDokumentValue && (gridDokumentValue.length > 0) &&
                    gridDokumentValue[0].LzeSouvisejiciOdstranit &&
                    this.LzeSouvisejiciEditovat)
                {
                    enabled = true;
                }
                this.actions.actZmenaAktivity.update({ enabled: enabled });
            },

            updateActionOznacEpk: function (gridDokumentValue) {
                var enabled = false;
                if (this.AllowActive
                    && gridDokumentValue
                    && (gridDokumentValue.length > 0)
                    && this.LzeSouvisejiciEditovat
                    && this.LzeSchvalovaciProces
                    && (gridDokumentValue[0].s_ele !== 0)
                    && gridDokumentValue[0].lzeSouvisejiciEditovatPrizEpk//(gridDokumentValue[0].priz_epk !== 2)
                )
                {
                    enabled = true;
                }
                this.actions.actOznacitProEPK.update({ enabled: enabled });
            },

            //updateActionZmenaPoznamky: function (gridDokumentValue) {
            //    var enabled = false;
            //    if (this.AllowActive && gridDokumentValue && (gridDokumentValue.length > 0) && this.LzeSouvisejiciEditovat) {
            //        enabled = true;
            //    }
            //    this.actions.actZmenaPoznamky.update({ enabled: enabled });
            //},

            updateActionPrilohy: function (gridDokumentValue) {
                var enabled = false;
                if (gridDokumentValue && (gridDokumentValue.length > 0) && gridDokumentValue[0].enableActionPrilohy) {
                    enabled = true;
                }
                this.actions.actPrilohy.update({ enabled: enabled });
            },

            updateActionPouzeAktivni: function (gridDokumentValue) {
                var enabled = false;
                //if (true) {
                    enabled = true;
               // }
                this.actions.actPouzeAktivni.update({ enabled: enabled });
            },

            updateActionOdstranit: function (gridDokumentValue) {
                var enabled = false;
                if (this.AllowActive && gridDokumentValue && (gridDokumentValue.length > 0) && this.LzeSouvisejiciEditovat) {
                    enabled = true;
                }
                this.actions.actOdstranit.update({ enabled: enabled });
            },

            //#endregion

            //#region akce
            pouzeAktivni: function () {
                var newVal = !this.actions.actPouzeAktivni.checked();
                this.actions.actPouzeAktivni.checked(newVal);
                this.pouzeAktivniValue = newVal;
                this.refreshData();
                this.updateActions();

            },

            detailDokumentu: function () {
                var gridDokumentValue = this.gridDokumenty.ggrid("getSelection");
                if (gridDokumentValue != null && gridDokumentValue.length > 0) {

                    var opt = {
                        DetailDto: { ixp: gridDokumentValue[0].ixp_vis },
                    };
                    Gordic.Ssl.Dialogs.Detail(this, opt);
                }
            },

            otevritVAgende: function () {
                var that = this;
                var gridDokumentValue = this.gridDokumenty.ggrid("getSelection");
                if (gridDokumentValue != null && gridDokumentValue.length > 0) {

                    var opt = {
                        content: that,
                        ixx1: gridDokumentValue[0].ixp_vis
                    }
                    Gordic.Wfl.Utils.ZkusOtevritPrislusnyModulVNoveZalozce(opt);
                }
            },

            detailSpisu: function () {
                var gridSpisValue = this.gridSpis.ggrid("getSelection");
                if (gridSpisValue != null && gridSpisValue.length > 0) {
                    var row = gridSpisValue[0];
                    var ixpRpoDetail = row.ixp_spis
                   
                    if (row.priz_spis === 1) //zkontrolovat zda je tma priz_spis
                        ixpRpoDetail = row.ixp;
                    
                    var opt = {
                        DetailDto: { ixp: ixpRpoDetail},
                    };

                    Gordic.Ssl.Dialogs.Detail(this, opt);
                }
            },

            novy: function () {
                var that = this;
                Gordic.Wfl.Dialogs.HledatIdentDokSpisDlg(this, {}).on("closed", function (ev, retVal) {
                    if (retVal && retVal.ixp) {
                        that.pridaniNoveho(retVal.ixp);
                    }
                });
            },

            pridaniNoveho: function (ixp) {
                var that = this;
                var jsonParams = {
                    IxpNew: ixp
                };

                this.call("Novy", jsonParams).then(function (retVal){
                    if (retVal) {
                        that.nastavZeDosloKeZmene();
                        that.refreshData();
                    }
                });


            },


            zmenitAktivitu: function () {
                var that = this;

                var gridDokumentValue = this.gridDokumenty.ggrid("activeRow");
                if (gridDokumentValue) { 
                this.call("ZmenitAktivitu", {
                    typ_vpp: gridDokumentValue.typ_vpp,
                    aktivita: gridDokumentValue.aktivita,
                    ixp_1: gridDokumentValue.ixp_1,
                    ixp_2: gridDokumentValue.ixp_2
                })    
                    .done(function (retVal) {
                        if (retVal) {
                            that.nastavZeDosloKeZmene();
                            that.refreshData();
                        }
                    });
                }

            },

            oznacitProEpk: function () {
                var that = this;
                var gridDokumentValue = this.gridDokumenty.ggrid("activeRow");
                if (gridDokumentValue) {
                    this.call("OznacEpk", {
                        priz_epk: gridDokumentValue.priz_epk,
                        ixp_1: gridDokumentValue.ixp_1,
                        ixp_2: gridDokumentValue.ixp_2
                    })
                        .done(function (retVal) {
                            if (retVal) {
                                that.nastavZeDosloKeZmene();
                                that.refreshData();
                            }
                        });
                }

            },


            prilohy: function () {
                if (this.isTreViewMode()) {
                    var that = this;
                    var gridStromoGridValue = this.stromoGrid.ggrid("getSelection");
                    if (gridStromoGridValue != null && gridStromoGridValue.length > 0) {
                        if (gridStromoGridValue[0] && gridStromoGridValue[0].Tag && gridStromoGridValue[0].Tag.ixp) {
                            var opt = {
                                Ixp: gridStromoGridValue[0].Tag.ixp
                            };
                            Gordic.Wfl.Dialogs.GPrilohyDlg(this, opt);
                        }
                    }
                }
                else {
                    var gridDokumentValue = this.gridDokumenty.ggrid("getSelection");
                    if (gridDokumentValue != null && gridDokumentValue.length > 0) {

                        var opt = {
                            Ixp: gridDokumentValue[0].ixp_vis
                        };
                        Gordic.Wfl.Dialogs.GPrilohyDlg(this, opt);
                    }
                }
                
                
                 //TODO  čeká se na dialog GPrilohyDokumentuTab

            },

            zmenaPoznamky: function () {
                var that = this;
                var gridDokumentValue = this.gridDokumenty.ggrid("activeRow");
                if (gridDokumentValue && gridDokumentValue.ixp_1) {
                    var opt = {
                        Ixp1: gridDokumentValue.ixp_1,
                        Ixp2: gridDokumentValue.ixp_2,
                        TypVpp: gridDokumentValue.typ_vpp
                    };
                    Gordic.Wfl.Dialogs.SouvisejiciZmenaPoznamkyDlg(this, opt, Gordic.Global.Enums.ModOtevreni.showWindow).on("closed", function (ev, retVal) {
                        if (retVal) {
                            that.nastavZeDosloKeZmene();
                            that.refreshData();
                        }
                    });
                }
            },

            odstranit: function () {
                var that = this;

                var gridDokumentValue = this.gridDokumenty.ggrid("activeRow");
                if (gridDokumentValue) {
                    this.call("Odstranit", {
                        typ_vpp: gridDokumentValue.typ_vpp,
                        ixp_1: gridDokumentValue.ixp_1,
                        ixp_2: gridDokumentValue.ixp_2
                    })
                        .done(function (retVal) {
                            if (retVal) {
                                that.nastavZeDosloKeZmene();
                                that.refreshData();
                            }
                        });
                }

            },

            //#endregion

            //#region dalsi

            refreshData: function () {
                var that = this;
                this.call("LoadData", {
                    LoadDto: {
                        pouzeAktivni: this.pouzeAktivniValue
                    }
                        
                })
                    .done(function (retVal) {
                        if (retVal) {
                            that.naplnGridDokumenty(retVal.SouvisejiciDokumenty);
                            that.naplnGridSpisy(retVal.SouvisejiciSpisy);
                        }
                    });
            },
            //#endregion
            
            //#region porovnání
            showComparison: function (rows) {
                var _this = this;
                if (rows && rows.length > 0) { 
                    var dataRows = rows.map(function (item, idx) { return item.data; }); // převod z grid metadata-view do pole dto
                    if (this.isComparisonInited) {
                        this.addToComparison(dataRows);
                    } else {
                        this.isComparisonInited = true;
                        this.comparisonCnt$.empty();

                        $('<div class="js-detail-comparator">').appendTo(this.comparisonCnt$).gcomparator({
                            items: dataRows,
                            columns: this.gridDokumenty.ggrid("option", "columns"),//this.porovnavaciGridFormat(),
                            itemTemplate: "{nazev}",
                            itemchange: function (ev, ctx) { _this.comparisonBadge.value = ctx.count; _this.comparisonBadge.update(); },
                            selection: function (ev, ctx) { _this.gridDokumenty.ggrid("activeRow", ctx.item); }
                        });
                    }
                    for (var row in rows) {
                        rows[row].checked = false;
                    }

                    this.gridDokumenty.ggrid("refresh");
                }
            },

            addToComparison: function (rows) {
                this.comparisonCnt$.find(".gcomparator").gcomparator("addItems", rows);
            },
            //#endregion

            //#region Wfl náhled
            createPreviewPanel: function () {
                return $("<div>").gpreview({
                    tabs: [

                        {
                            caption: "Souhrn",
                            content: "Gordic.Wfl.WebClient.GWflDetailPreview"//časem takto-> function (loadParams) { return Gordic.Previews.getPreviewClass(loadParams.typ_ag, loadParams); }
                        },
                        {
                            caption: "Náhled",
                            customLoad: function () { //subtask was clicked

                                var cnt = this.customDiv;
                                if (cnt.hasClass("gfilepreview")) {
                                    cnt.gwflfilepreview("displayElDoc", this.loadParams.ixp);
                                }
                            },

                            content: {//jednoduchý contentík pro náhled el.obrazu
                                onPrepareContent: function () {
                                    if (!this.element.hasClass("gfilepreview")) {
                                        this.element.gwflfilepreview();
                                    }

                                }
                            }
                        },
                    ]
                });
            },

            loadPreview: function (ixp) {
                debugger;
                this.previewDiv.gpreview("loadAll", { ixp: ixp } /*nebo jiné dto, klidně celé row*/, true/*okamžitý reload*/);
            },
            enablePreview: function (enabled) {
                this.previewDiv.gpreview("option", { disabled: !enabled });
            },
            showPreview: function (ixp) {
                if (this.element.gsidebar("getPanel", "panelPreview").gsbpanel("option", "visible")) {
                    this.loadPreview(ixp);
                } else {
                    this.rowToPreview = ixp;
                }
            },



            //#endregion

            nastavZeDosloKeZmene: function () {
                if (this.retValue == null) {
                    this.retValue = {};
                }
                this.retValue.dosloKeZmene = true;

            },

            closing: function () { // podmineny userClose 
                var def = $.Deferred();

                if(this.retValue) {
                    def.resolve(this.retValue);
                } else {
                    def.resolve();
                }
               
                return def.promise();
            },

            closeDet: function () {
                this.tryClose();

            },

            //#region stromogrid

            crateStromoGrid: function () {
                var that = this;

                var gridKolonky = new Gordic.Data.GridFormat()
                    .addStructureColumn(
                        {
                            name: "typNode",
                            caption: "Typ", //RC 26225317 : Typ
                            //description: "jres:31926220", //RC 31926220 : Typ entity
                           // customClass: "center",
                            formatPreset: "icon",
                            //width: 2,
                            //fixedWidth: true,
                            //sortOrder: Gordic.Data.Sorting.Inline.number("typ_entity_ico"),
                            //field: "typ_entity_ico",
                            iconTemplate: function (row) {
                                
                                if (row && row.ImageKey) {
                                    switch (row.ImageKey) {
                                        case "dokumenty_souvisejici": return { icon: "gi-navazany_zaznam", text: row.Text, tooltip: row.Text };
                                        case "spis": return { icon: "gi-folder_bold g-state-text g-state-warning", text: row.Text, tooltip: row.Text };
                                        case "subjekt": return { icon: "gi-user", text: row.Text, tooltip: row.Text };
                                        default: return { icon: "gi-question", text: row.Text, tooltip: row.Text };
                                    }
                                }
                                if (row && row.TypEntity_Ico) {
                                    var entita = Gordic.Wfl.Globals.ListSupport.TypEntityVypocet(row.TypEntity_Ico, { withOutDocumentIcon: false });
                                    entita.text = row.Text;
                                    return entita;
                                } else {
                                    return undefined;
                                }
                            }
                        }

                    )
                    //.addTextColumn({
                    //    width: 8,
                    //    name: "Text",
                    //    caption: "Název", //RC 31150014 : Název
                    //    //customClass: "ui-disabled",
                    //})
                    //.addIconColumn({
                    //    name: "IsLocked",
                    //    caption: "jres:33000001",  //RC 33000001 : Zamčeno
                    //    customClass: "ui-disabled",
                    //    headerTemplate: Gordic.Templates.iconTemplate({ icon: "fa-lock" }),
                    //    iconTemplate: function (data, meta) {
                    //        if (isSettingTemplates) {
                    //            if (that.settingTemplate.isLocked(data.Parents))
                    //                return { icon: "fa-lock" }
                    //        } else {
                    //            if (that.globalSettings.isLocked(data.Parents))
                    //                return { icon: "fa-lock" }
                    //        }
                    //    }
                    //})
                    ;
                var viewOpt = { };
                viewOpt.key = "KeyID";
                //viewOpt.processOnStart = false;
                viewOpt.processors = {
                    provider: new Gordic.Data.Provider(function (req,x) {
                       
                        if (req.data != null && req.data.Nodes != null) {
                            return req.data.Nodes;
                        } 
                        if (!req.data || !req.data.Tag || !req.data.Tag.ixp) {
                            return []; // root
                        }
                        var KeyID = req.data.KeyID;
                        var ixp = req.data.Tag.ixp;
                        var opt = {
                            ixp: ixp
                        };
                        var deff = $.Deferred();
                        that.call("GenerateTree", opt)
                            .done(function (novaData) {
                                
                                novaData.KeyID = KeyID;
                                req.data.Nodes = novaData.Nodes;
                                for (var i = 0; i < req.data.Nodes.length; i++) {
                                    req.data.Nodes[i].idForSort = i;
                                }
                                deff.resolve([req.data]);
                            })
                            .fail(function () {
                                deff.reject();
                            });


                        return deff;
                    }),
                    sort: new Gordic.Data.SortProcessor("idForSort"), // je zde protože když se donačítal řádek, tak children byly na přeskáčku
                    tree: new Gordic.Data.Tree(
                        Gordic.Data.Tree.childrenOrganizer("Nodes")
                        , {
                            defaultState: function (row) {
                                
                                var state = "empty";
                                if ((row.data.Nodes != null) && (row.data.Nodes.length === 0)){
                                    state = "empty";
                                } else if (row.data.Nodes && row.data.Nodes.length > 0){
                                    state = "closed";
                                } else if (row.data.Nodes == null) {
                                    state = "unknown";
                                } 
                                return state;
                            }// "unknown" //{ defaultState: "unknown" } "closed" | "open" | "empty" | "unknown" | "loading"
                            //open ma otevrenou sipecku, closed a unknown ma zavrenou sipecku, loading ma motatko a empty nema nic
                            //a.. chyba.. "closed"
                        }
                    ) //,  // defaultnistav radku je „nenacteno“, tzn [+] ale bez children
                };

                this.viewSbernyArch = new Gordic.Data.View(
                    [this.treeData],
                    viewOpt
                );


                this.stromoGrid = $("<div>").appendTo(this.element).hide().ggrid({
                    name: "GridSbernyArch",
                    data: this.viewSbernyArch,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit, full
                    navigationMode: "row", // row, cell
                    //sort: "por_cislo_uziv",
                    //defaultAction: this.actions.actSbernyArchOtevriNovyDetail, //selectAction
                  
                    scrollHelperTemplate: "{Text}",  // "{ixs_esu} - {nazev}",
                    searchColumns: ["Text"],
                    columns: gridKolonky,
                    cellActivate: function (ev, row) {
                        if (row != null && row.cellInfo != null && row.cellInfo.data != null && row.cellInfo.data.Tag != null && row.cellInfo.data.Tag.ixp != null) {
                            that.enablePreview(true);
                            that.showPreview(row.cellInfo.data.Tag.ixp);
                        } else {
                            that.enablePreview(false);
                        }
                        // konec wfl náhledu

                        that.updateActions();

                    },
                    contextMenu: this.getMenu(),
                });


            },

            getDataForUpdate: function (row) {
                var that = this;
                //var data = this.viewSbernyArch
                return row;
            },

            updateActionsStrom: function () {
                var isIxpInRow = false;
                var gridStromoGridValue = null;
                if (Gordic.Utils.WidgetExists("ggrid", this.stromoGrid)) { 
                    gridStromoGridValue = this.stromoGrid.ggrid("getSelection");
                    if (gridStromoGridValue != null && gridStromoGridValue.length > 0 && gridStromoGridValue[0] && gridStromoGridValue[0].Tag && gridStromoGridValue[0].Tag.ixp) {
                        isIxpInRow = true;
                    }
                }

                if (this.isTreViewMode()) {
                    this.actions.actDetailStrom.visible(true);

                    this.actions.actPouzeAktivni.visible(false);
                    this.actions.actOznacitProEPK.visible(false);
                    this.actions.actOdstranit.visible(false);
                    this.actions.actZmenaAktivity.visible(false);
                    this.actions.actAddToComparison.visible(false); //showComparison
                    

                    if (isIxpInRow) {
                        this.actions.actDetailStrom.enabled(true);
                    } else {
                        this.actions.actDetailStrom.enabled(false);
                    }

                    this.updateActionPrilohy(gridStromoGridValue);
                } else {
                    this.actions.actDetailStrom.enabled(false);
                    this.actions.actDetailStrom.visible(false);

                    this.actions.actPouzeAktivni.visible(true);
                    this.actions.actOznacitProEPK.visible(true);
                    this.actions.actOdstranit.visible(true);
                    this.actions.actZmenaAktivity.visible(true);
                    this.actions.actAddToComparison.visible(true); //showComparison
                }

                

            },

            detailStrom: function () {
                var that = this;
                var gridStromoGridValue = this.stromoGrid.ggrid("getSelection");
                if (gridStromoGridValue != null && gridStromoGridValue.length > 0) {
                    if (gridStromoGridValue[0] && gridStromoGridValue[0].Tag && gridStromoGridValue[0].Tag.ixp) { 
                        var opt = {
                            DetailDto: { ixp: gridStromoGridValue[0].Tag.ixp },
                        };
                        Gordic.Ssl.Dialogs.Detail(this, opt);
                    }
                }
            },
            getMenu: function() {
                return [
                    { action: this.actions.actDetailStrom, favorite: true },
                    { action: this.actions.actPrilohy, favorite: true }
                ];
            }


            //@endregion 

    }, { extendIntellisense: GContent });
    
       

});

   