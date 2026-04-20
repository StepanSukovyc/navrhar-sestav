

//$(function () {
//        "use strict";
        
//        namespace("Gordic.Esu.WebClient.RozdelovnikEsuDlg", {

//            onContentReady: function () {
//                if (!this._isDebounced) {
//                    this.showPreview = Utils.debounced(this.showPreview, 250);
//                    this._isDebounced = true;
//                }
//                var that = this;
//                this.newOps({ title: "jres:31900238" });

//                //#region Vytvoreni gsidebaru pro nahled

//                this.previewDiv = this.createPreviewPanel();
//                this.rowToPreview = null;

//                this.element.gsidebar("addPanel", "right", {
//                    leaf: { caption: "jres:31900196" }, //RC 31900196 : Náhled
//                    id: "panelPreview",
//                    icon: "gi-nahled",
//                    customDiv: this.previewDiv,
//                    open: function (ev, ctx) {
//                        if (that.rowToPreview != null) {
//                            that.loadPreview(that.rowToPreview);
//                            that.rowToPreview = null;
//                        }
//                    },
//                });
//                this.enablePreview(false);

//                //#endregion

//                //#region Vytvoreni gsidebaru pro porovnání
//                this.comparisonBadge = new GObservableObject({ value: "0" });
//                this.comparisonCnt$ = $("<div class='no-border'>").append($("<h3>", { text: "jres:31900218", style: "margin: 0.5rem" })); //RC 31900218 : Vyberte alespoň dvě položky v seznamu
//                this.element.gsidebar("addPanel", "right", {
//                    leaf: { caption: "jres:31900197", badge: this.comparisonBadge }, //RC 31900197 : Porovnání
//                    id: "rightComparisonPanel",
//                    pinned: false,
//                    icon: "fa-balance-scale",
//                    customDiv: this.comparisonCnt$
//                });
//                //#endregion

//                var gridKolonky = new Gordic.Data.GridFormat();
                    
//                    if (this.gin_ssl_datschr) {
//                        gridKolonky.addIconColumn(Gordic.Esu.Function.ColumnDatovaSchrankaZIco_ds());
//                    }

//                    gridKolonky.addIconColumn({
//                        name: "aktivita",
//                        caption: "jres:31900262",  //RC 31900262 : Aktivita subjektu
//                        //customClass: "center",
//                        width: 40,
//                        //fixedWidth: true,
//                        iconTemplate: function (data) {
//                            if (data && data.aktivita_esu) {
//                                var objImg = Gordic.Esu.Function.GetAktivitaImageNove(data.aktivita_esu);
//                                if (objImg) {
//                                    return { icon: objImg.img ? objImg.img : undefined, tooltip: objImg.tooltip }; 
//                                } else return null;
//                            } else {
//                                return null;
//                            }
//                        }
//                    });


//                    gridKolonky.addTextColumn({
//                        name: "ixs_esu",
//                        caption: "jres:26265221",  //RC 26265221 : ID
//                    });

//                    gridKolonky.addTextColumn({
//                        name: "id_ds",
//                        caption: "jres:31900930",  //RC 31900930 : ID DS
//                    });

//                    gridKolonky.addTextColumn({
//                        name: "ico",
//                        caption: "jres:31900931",  //RC 31900931 : IČO
//                    });
                   
//                    gridKolonky.addTextColumn({
//                        name: "esu_txt",
//                        caption: "jres:26265098",  //RC 26265098 : Externí subjekt
//                    })
//                    .addTextColumn({
//                        name: "zast_txt",
//                        caption: "jres:26265099",  //RC 26265099 : Zástupná osoba
//                    })
//                    .addTextColumn({
//                        name: "typ_vazby_txt",
//                        caption: "jres:26265100",  //RC 26265100 : Typ vazby
//                    })
//                    .addTextColumn({
//                        name: "nazev_dva",
//                        caption: "jres:26265101",  //RC 26265101 : Důvod
//                    })
//                    .addDateTimeColumn({
//                        name: "dat_zmena_esu",
//                        caption: "jres:31900263",  //RC 31900263 : Datum změny ESU
//                    })
//                    .addDateTimeColumn({
//                        name: "dat_zmena",
//                        caption: "jres:26265102",  //RC 26265102 : Datum přidání
//                    })
//                    .addTextColumn({
//                        name: "zmp_txt",
//                        caption: "jres:26265103", //RC 26265103 : Přidal
//                    });

//                $.content(this).actions.add({
//                    name: "actOtevriDetailEsu",
//                    run: function (ev, ctx) {
//                        console.log(ctx.cellInfo.data);
                        
//                    }
//                });

//                that.grid = $("<div>").appendTo(this.element);
//                    //.height(900)
//                that.grid.gautofit()
//                    .ggrid({
//                        name: "Grid",
//                        //data: ,
//                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
//                        columnMode: "fit",  // fit, full
//                        customClass: "js-grid",
//                        navigationMode: "row", // row, cell
//                        defaultAction: $.content(this).actions.actOtevriDetailEsu, //selectAction
//                        rowsClass: function (dataRow) {
//                            if (dataRow && dataRow.data && dataRow.data.trideni === 0) {
//                                return "bold";
//                            } else return " ";
//                        },
//                        selection: function (ev, selectionInfo) {
//                            var sel = that.grid.ggrid("activeRow");
//                            if (sel != null) {
//                                that.enablePreview(true);
//                                that.showPreview(sel);
//                            } else {
//                                that.enablePreview(false);
//                            }
//                            that.updateActions();
//                        },

//                        multi: true,
//                        rowsChecked: "checked",

//                        scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
//                        /*
//                        searchColumns: ["ico", "nazev", "esu_txt", "ixs_esu", "ixs_eko", "zmenu_prov_rf"],
//                        */
//                        columns: gridKolonky,
//                    });
             
              
//                this.provestZaskrtnuti = true;
//                this.vytvoritStromoGrid();
//                this.naplnSkupinyGrid(this.ListDto);
//                //this.naplnGrid(this.ListDto);
//                this.UpdateActionNactiVse();
//                this.setFocusOnReferent();
//            },

//            naplnGrid: function (listDto) {
//                if (this.SkupinyWorkingMode === 1 && this.provestZaskrtnuti) {   // pokud je nastaveno zaškrtnu vše jen tekdy pokud dochází k výběru ze stromu
//                    $(listDto).each(function (index, element) {
//                        element.checked = true;
//                    });
//                }
//                else if (this.ViewTabulkaEsu) { // && !this.provestZaskrtnuti // pokus o pamatopvání předchozích zaškrtlejch
//                    var index = this.ViewTabulkaEsu.buildIndex();
//                    $(listDto).each(function (numIndex, element) {
//                        if (index[element.ixs_esu] && index[element.ixs_esu].checked) {
//                            element.checked = true;
//                        }
//                    });
//                }
//                this.provestZaskrtnuti = true;
//                this.ViewTabulkaEsu = new Gordic.Data.View(listDto, { key: "ixs_esu" }); 
//                this.grid.ggrid("setData", this.ViewTabulkaEsu, true);
//                this.updateActions();
//            },


//            //#region postraní grid se skupinama
//            vytvoritStromoGrid: function () {

//                var that = this;
//                this.element.gsidebar("option", { left: { width: 400 } });
//                this.leftSbCnt$ = $("<div class=''>");

//                var menuPole =
//                    [
//                        "actNovaSkupina",
//                        "actDetailSkupina",
//                        "actOdstranitSkupinu",
//                        "actNactiVse"
//                    ];

//                this.element.gsidebar("addPanel", "left", {
//                    caption: "jres:31900239", //RC 31900239 : Skupiny ESU
//                    id: "leftPanel",
//                    icon:"fa-group",
//                    customDiv: this.leftSbCnt$,
//                    pinned: true,
//                 //   menuBar: this.actions.createBar(menuPole, true)
//                });
//                this.leftSb$ = this.element.gsidebar("getPanel", "leftPanel");
//                this.leftSb$.gsbpanel("show");

//                // GRID

//                var gridSkupinyKolonky = new Gordic.Data.GridFormat();
//                gridSkupinyKolonky.addStructureColumn({
//                    name: "mainIco",
//                    caption: "jres:31900260",  //RC 31900260 : Typ skupiny
//                    //width: 40,
//                    fixedWidth: false,
//                    sortable: false,
//                    iconTemplate: function (data) {
//                        if (data.ImageIndex === 1) {
//                            return { icon: "fa-building", tooltip: data.Text, text: data.Text };
//                        } else if (data.ImageIndex === 2) {
//                            return { icon: "fa-cloud", tooltip: data.Text, text: data.Text };
//                        } else if (data.ImageIndex === 3) {
//                            return { icon: "fa-user", tooltip: data.Text, text: data.Text };
//                        } else {
//                            return null;
//                        }
//                    }
//                }).addIconColumn({
//                    name: "secoundIco",
//                    caption: "jres:31900264", //RC 31900264 : Skupiny
//                    //width: 40,
//                    //fixedWidth: false,
//                    sortable: true,
//                    formatPreset: "full",
//                    sortOrder: Gordic.Data.Sorting.Inline.text("TextNameOfGroup"),
//                    iconTemplate: function (data) {
//                        if (data.ImageIndex === 0) {
//                            var ikona = "fa-group";
//                            //if (data.pravoModifikovat) {
//                            //    ikona = "fa-group g-state-text g-state-info"
//                            //}
//                            return { icon: ikona, tooltip: data.TextNameOfGroup, text: data.TextNameOfGroup };
//                        } else {
//                            return null;
//                        }
//                    }
//                }); 
//                //gridSkupinyKolonky
//                //    .addIconColumn({
//                //        name: "editovatelneCol",
//                //        caption: "Možno editovat", 
//                //        width: 40,
//                //        sortable: false,
//                //        //formatPreset: "full",
//                //        iconTemplate: function (data) {
//                //            if (data.pravoModifikovat) {
//                //                return { icon: "gi-pencil", tooltip: "Skupinu lze modifikovat"};
//                //            } else {
//                //                return null;
//                //            }
//                //        }
//                //    });
//                gridSkupinyKolonky
//                .addHtmlColumn({
//                    name: "editovatelneCol2",
//                    caption: "jres:31901142", //RC 31901142 : Možnost editovat
//                    width: 35,
//                    fixedWidth: true,
//                    sortable: false,
//                    customClass: "center",
//                    cellTemplate: function (data) {
//                        if (data.pravoModifikovat) {
//                            var pencil = $("<a>").glink({
//                                params: {
//                                    action: new GAction({
//                                        name: "actZo",
//                                        icon: "gi-pencil g-state-text g-state-inactive",
//                                        tooltip: "jres:31901056", //RC 31901056 : Skupinu lze modifikovat
//                                        customClass: "g-link--no-underline g-state-text",
//                                        run: function (event) {
//                                            //event.preventDefault();
//                                            that.detailSkupiny(data.ixs_rzd, data.pravoModifikovat);
//                                        }
//                                    })
//                                }
//                            });
//                            return pencil.prop('title', "jres:31901055"); //RC 31901055 : Skupinu lze modifikovat
//                        } else if (data.pravoVytvoritNovy && data.ImageIndex > 0) {
//                            var prvek = $("<a>").glink({
//                                params: {
//                                    action: new GAction({
//                                        name: "actPlus",
//                                        icon: "fa-plus g-state-text g-state-success",
//                                        tooltip: "jres:31901134", //RC 31901134 : Lze přidat novou skupinu
//                                        customClass: "g-link--no-underline g-state-text",
//                                        run: function (event) {
//                                            //event.preventDefault();
//                                            that.novaSkupina(data.typ_rzd);
//                                        }
//                                    })
//                                }
//                            });
//                            return prvek.prop('title', "jres:31901134"); //RC 31901055 : Lze přidat novou skupinu



//                        }

//                        else {
//                            return null;
//                        }
//                    }
//                });

//                $.content(this).actions.add({
//                    name: "actDoubleClickSkupiny",
//                    run: function (ev, ctx) {
//                        console.log(ctx.cellInfo.data);
                       
//                    }
//                });

//                that.gridSkupiny = $("<div>").appendTo(this.leftSbCnt$)
//                    //.height(900)
//                    .gautofit()
//                    .ggrid({
//                        name: "GridSkupiny",
//                        //data: ,
//                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
//                        columnMode: "fit",  // fit, full
//                        navigationMode: "row", // row, cell
//                        defaultAction: $.content(this).actions.actDoubleClickSkupiny, //selectAction
//                        rowsClass: function (dataRow) {
//                            if (dataRow.data.ImageIndex !== 0) {
//                                return "bold";
//                            } else return " ";
//                        },
//                        //selection: 
//                        cellActivate: function (ev, row) {
//                            if (row && row.cellInfo && row.cellInfo.data) { // u single modu vzdy 1 ale pro jistotu testuji
                              
//                                that.nacistEsuVeSkupine();
//                                that.updateActions();
                                
//                            }
//                        },
//                        multi: false,
//                        searchEngine:false,
//                        columns: gridSkupinyKolonky,
                        
//                    });

//            },

//            naplnSkupinyGrid: function (listDto) {
//                this.viewTabulkaSkupiny = new Gordic.Data.View(listDto,
//                    {
//                        key: "ixs_rzd",
//                        processors: {
//                            //provider: new Gordic.Data.Provider(function (req) {
//                            //    if (!req.data) return [_this.newItem(0, null)]; // root

//                            //    var d = [];   // random data
//                            //    for (var i = 0; i < Math.random() * 10; i++)
//                            //        d.push(_this.newItem(id++, req.data.index));
//                            //    return req.data.index < 10 ? d : [];
//                            //}),
//                            tree: new Gordic.Data.Tree(
//                                Gordic.Data.Tree.parentIdOrganizer("p_ixs_rzd"),
//                                {
//                                    defaultState: "open"
//                                }
//                            ), //,  // defaultnistav radku je „nenacteno“, tzn [+] ale bez children
//                        }

//                    });



//                this.gridSkupiny.ggrid("setData", this.viewTabulkaSkupiny, true);
//                this.updateActions();
//            },

//            setFocusOnReferent: function () {
//                var poleDat = this.viewTabulkaSkupiny.getDataRows();
//                var referenti = poleDat.filter(function (params) {
//                    return params.ImageIndex === 3;
//                });
//                if (referenti != null && referenti.length > 0) { 
//                    this.gridSkupiny.ggrid("activeRow", { ixs_rzd: referenti[0].ixs_rzd});
//                }
//            },


//            //#endregion

//            //#region updateActions

//            updateActions: function () {
//                if (this.gridSkupiny && this.grid) { 
//                    var skupinySel = this.gridSkupiny.ggrid("getSelection");
//                    var esuSel = this.grid.ggrid("getSelection");

//                    this.UpdateActionNovaSkupina(skupinySel);
//                    this.UpdateActionOdstranitSkupinu(skupinySel);
//                    this.UpdateActionDetailSkupiny(skupinySel);
//                    this.UpdateActionNovy(skupinySel);
//                    this.UpdateActionOdstranit(skupinySel,esuSel);
//                    this.UpdateActionDetail(esuSel);
//                    this.UpdateActionPridatZeSouboru(skupinySel);
//                    this.UpdateActionactPrevzit(esuSel);
//                    this.UpdateActZmenitTyp(skupinySel, esuSel);
//                }
//            },

//            UpdateActionNovaSkupina: function (skupinySel) {
//                if (skupinySel.length > 0 && skupinySel[0].pravoVytvoritNovy) {
//                    this.actions.actNovaSkupina.update({ enabled: true });
//                } else {
//                    this.actions.actNovaSkupina.update({ enabled: false });
//                }
//            },

//            UpdateActionOdstranitSkupinu: function (skupinySel) {
//                if (skupinySel.length > 0 && skupinySel[0].pravoModifikovat) {
//                    this.actions.actOdstranitSkupinu.update({ enabled: true });
//                } else {
//                    this.actions.actOdstranitSkupinu.update({ enabled: false });
//                }
//            },

//            UpdateActionDetailSkupiny: function (skupinySel) {
//                if (skupinySel.length > 0 && skupinySel[0].ImageIndex === 0) {
//                    this.actions.actDetailSkupina.update({ enabled: true });
//                } else {
//                    this.actions.actDetailSkupina.update({ enabled: false });
//                }

//            },

//            UpdateActionNactiVse: function () {
//                if (this.pravoSkupinyEsuEditovatVlastnikaANacitatVsechnySkupiny) {
//                    this.actions.actNactiVse.update({ visible: true, enabled: true });
//                } else {
//                    this.actions.actNactiVse.update({ visible: false, enabled: false });
//                }

//            },

//            UpdateActionNovy: function (skupinySel) {
//                if (skupinySel.length > 0 && skupinySel[0].pravoVytvoritNovy) {
//                    this.actions.actNovaEsu.update({ enabled: true });
//                } else {
//                    this.actions.actNovaEsu.update({ enabled: false });
//                }

//            },

//            UpdateActionOdstranit: function (skupinySel, esuSel) {
//                if ((skupinySel.length > 0 && skupinySel[0].pravoModifikovat) && esuSel.length > 0) {
//                    this.actions.actOdstranitEsu.update({ enabled: true });
//                } else {
//                    this.actions.actOdstranitEsu.update({ enabled: false });
//                }


//            },

//            UpdateActZmenitTyp: function (skupinySel, esuSel) {
//                if ((skupinySel.length > 0 && skupinySel[0].pravoModifikovat) && esuSel.length > 0) {
//                    this.actions.actZmenitTyp.update({ enabled: true });
//                } else {
//                    this.actions.actZmenitTyp.update({ enabled: false });
//                }


//            },

//            UpdateActionDetail: function (esuSel) {
//                if (esuSel.length > 0) {
//                    this.actions.actDetailEsu.update({ enabled: true });
//                } else {
//                    this.actions.actDetailEsu.update({ enabled: false });
//                }

//            },

//            UpdateActionactPrevzit: function (esuSel) {
//                if (esuSel.length > 0) {
//                    this.actions.actPrevzit.update({ enabled: true });
//                } else {
//                    this.actions.actPrevzit.update({ enabled: false });
//                }
//            },

//            UpdateActionPridatZeSouboru: function (skupinySel) {
//                if (this.gin_esu_roznaci && skupinySel[0].ImageIndex === 0 && skupinySel[0].pravoModifikovat) {
//                    this.actions.actPridatZeSouboru.update({ enabled: true });
//                } else {
//                    this.actions.actPridatZeSouboru.update({ enabled: false });
//                }
//            },

            
//            //#endregion

           
            
//            //#region porovnání
//            showComparison: function (rows) {
//                var _this = this;
//                var dataRows = rows.map(function (item, idx) { return item.data; }); // převod z grid metadata-view do pole dto
//                if (this.isComparisonInited) {
//                    this.addToComparison(dataRows);
//                } else {
//                    this.isComparisonInited = true;
//                    this.comparisonCnt$.empty();

//                    $('<div class="js-detail-comparator">').appendTo(this.comparisonCnt$).gcomparator({
//                        items: dataRows,
//                        columns: this.grid.ggrid("option", "columns"),//this.porovnavaciGridFormat(),
//                        itemTemplate: "{esu_txt}",
//                        itemchange: function (ev, ctx) { _this.comparisonBadge.value = ctx.count; _this.comparisonBadge.update(); },
//                        selection: function (ev, ctx) { _this.grid.ggrid("activeRow", ctx.item); }
//                    });
//                }
//                for (var row in rows) {
//                    rows[row].checked = false;
//                }

//                this.grid.ggrid("refresh");

//            },

//            addToComparison: function (rows) {
//                this.comparisonCnt$.find(".gcomparator").gcomparator("addItems", rows);
//            },
//            //#endregion

//            //#region Esu náhled
//            _isDebounced: false,

//            createPreviewPanel: function () {
//                return $("<div>").gpreview({
//                    tabs: [

//                        {
//                            caption: "jres:31900321", //RC 31900321 : Souhrn
//                            content: "Gordic.Esu.WebClient.GEsuDetailPreview"//časem takto-> function (loadParams) { return Gordic.Previews.getPreviewClass(loadParams.typ_ag, loadParams); }
//                        },

//                    ]
//                });
//            },

//            loadPreview: function (row) {
//                var that = this;
//                console.log(row);
//                this.previewDiv.gpreview("loadAll", {
//                    Logovani: that.Logovani,
//                    IxsEsu: row.ixs_esu
//                } /*nebo jiné dto, klidně celé row*/, true/*okamžitý reload*/);
//            },
//            enablePreview: function (enabled) {
//                this.previewDiv.gpreview("option", { disabled: !enabled });
//            },
//            showPreview: function (row) {
//                if (this.element.gsidebar("getPanel", "panelPreview").gsbpanel("option", "visible")) {
//                    this.loadPreview(row);
//                } else {
//                    this.rowToPreview = row;
//                }
//            },
//            //#endregion

//            //#region obsluha gridu skupin
//            nacistEsuVeSkupine: function () {
//                var that = this;
//                var sel = that.gridSkupiny.ggrid("getSelection");
//                if (sel.length > 0 && sel[0].ImageIndex === 0 ) {
//                    this.call("LoadDataSubjektyVeSkupine", { ixsRzd: sel[0].ixs_rzd })
//                        .done(function (retVal) {
//                            if (retVal) {
//                                that.ixsRzd = sel[0].ixs_rzd; 
                                
//                                that.naplnGrid(retVal);
                                
//                            }
//                        });
//                }
//            },

           

//            detailSkupiny: function (ixs_rzd, pravoModifikovat) {
//                var that = this;
//                if (ixs_rzd == null) {
//                    var sel = that.gridSkupiny.ggrid("getSelection");
//                    if (sel.length > 0 && sel[0].ixs_rzd) {
//                        ixs_rzd = sel[0].ixs_rzd;
//                        pravoModifikovat = sel[0].pravoModifikovat;
//                    }
//                }
//                if (ixs_rzd) {
//                    var l_oJSONPars = {
//                        IxsRzd: ixs_rzd,
//                        Editace: pravoModifikovat
//                    };

//                    Gordic.Esu.Dialogs.DetailRozdelovnikuESUDlg(this, l_oJSONPars, "showModalWindow").on("close", function (ev, retVal) {
//                        if (retVal && retVal.dataChange) {
//                            that.obcerstivt(null);
//                        }
//                    });
//                }

//            },

//            novaSkupina: function (typ_rzd) {
//                var that = this;
//                var sel = that.gridSkupiny.ggrid("getSelection");
//                if (sel.length > 0 && sel[0].typ_rzd != null) {
//                    var l_oJSONPars = {
//                        TypSkupiny: typ_rzd !=null ? typ_rzd: sel[0].typ_rzd,
//                        Editace: true
//                    };
//                    Gordic.Esu.Dialogs.DetailRozdelovnikuESUDlg(this, l_oJSONPars, "showModalWindow").on("close", function (ev, retVal) {
//                        if (retVal && retVal.dataChange) {
//                            that.obcerstivt(retVal.dataChange,true); //zároven nastavím jako active
//                        }
//                    });
//                }

//            },

//            odstranitSkupinu: function () {
//                var that = this;
//                var sel = that.gridSkupiny.ggrid("getSelection");
//                if (sel.length > 0 && sel[0].ImageIndex === 0) { // pokud je to skupina lze mazat

//                    var text = "jres:31900253".format(sel[0].nazev); //RC 31900253 : Přejete si opravdu odstranit skupinu externích subjektů '{0}'?
//                    this.dialogs.confirm("jres:26265104", text).on("close", function (ev, retVal) { //RC 26265104 : Odstranit
//                            if (retVal) {
//                            if (retVal === "yes") {
//                                that.interniOdstranit(sel[0]);
//                            }
//                        }
//                    });
//                }
//            },

//            interniOdstranit: function (dtoSkupiny) {
//                var that = this;
//                if (dtoSkupiny && dtoSkupiny.ixs_rzd){ 
//                    this.call("OdstranitSkupinu", { ixs_rzd: dtoSkupiny.ixs_rzd})
//                        .done(function (retVal) {
//                            if (retVal) {
//                                that.obcerstivt(null,true);
//                            }
//                        });
//                }

//            },

//            obcerstivt: function (ixs_rzd,zaskrtnoutVse) {
//                var that = this;
//                that.provestZaskrtnuti = zaskrtnoutVse ? true : false;
//                var nactiVse = this.actions.actNactiVse.checked();
//                this.call("LoadData", { nacistVse: nactiVse ? true: false })
//                    .done(function (retVal) {
//                        if (retVal) {
//                            that.naplnSkupinyGrid(retVal);
//                            if (ixs_rzd) {
//                                that.gridSkupiny.ggrid("activeRow", { ixs_rzd: ixs_rzd });
//                            }
//                        }
//                    });
//            },

//            //#endregion

//            //#region obsluha gridu esu
//            zmenitTyp: function () {
//                var that = this;
//                var active = that.grid.ggrid("activeRow");
//                if (active) {
//                    var l_oJSONPars = {
//                        typ_vazby: active.typ_vazby,
//                        ixs_dva: active.ixs_dva
//                    };
//                    Gordic.Esu.Dialogs.ZmenaTypuVazbyDlg(this, l_oJSONPars, "showModalWindow").on("close", function (ev, retVal) {
//                        if (retVal) {
//                            that.zmenaTypuSrtv(active.ixs_esu, active.por_zast, retVal.typVazby, retVal.duvodVazby);
//                        }
//                    });
//                }
//            },

//            zkontrolujIxsRzdSkupiny: function () {
//                var that = this;
//                if (this.ixsRzd == null) {
//                    this.dialogs.alert(
//                        "jres:31900864", //RC 31900864 : Pozor
//                        "jres:31900865" //RC 31900865 : Vyberte konkrétní skupinu.
//                    );
//                    return false;
//                }
//                return true;
//            },

//            zmenaTypuSrtv: function (ixs_esu, por_zast, typ_vazby, ixs_dva) {
//                var that = this;
//                if (!this.zkontrolujIxsRzdSkupiny()) {
//                    return;
//                }
//                var active = that.grid.ggrid("activeRow");
//                if (active) {
//                    var l_oJSONPars = {
//                        ixs_rzd: this.ixsRzd,
//                        dto: {
//                            ixs_esu: ixs_esu,
//                            por_zast: por_zast,
//                            typ_vazby: typ_vazby,
//                            ixs_dva: ixs_dva,
//                        }
//                    };
//                    this.call("ZmenaVazby", l_oJSONPars)
//                        .done(function (retVal) {
//                            if (retVal) {
//                                that.nacistEsuVeSkupine();
//                            }
//                        });
//                }

//            },

//            noveESU: function () {
//                var that = this;
//                if (!this.zkontrolujIxsRzdSkupiny()) {
//                    return;
//                }
//                var optKartoteky = {
//                    Ucel: 3,
//                    Logovani: this.Logovani
//                };
//                Gordic.Esu.Dialogs.KartotekaEsuDlg(this, optKartoteky).on("close", function (ev, retVal) {
//                    if (retVal && retVal.subjekty && retVal.subjekty.length > 0) {
//                        that.noveESUSrv(retVal.subjekty);
//                    }
//                });
//            },

//            noveESUSrv: function (subjekty) {
//                var that = this;
//                if (!this.zkontrolujIxsRzdSkupiny()) {
//                    return;
//                }
//                var l_oJSONPars = {
//                    ixs_rzd: this.ixsRzd,
//                    List: subjekty
//                };
//                that.call("PridaniNovychEsu", l_oJSONPars)
//                    .done(function (retVal) {
//                        if (retVal) {
//                            that.nacistEsuVeSkupine();
//                        }
//                    });
//            },

//            detailESU: function () {
//                var that = this;
//                var active = that.grid.ggrid("activeRow");
//                if (active && active.ixs_esu) {
//                    var opt = {
//                        IxsEsu: active.ixs_esu,
//                        Ucel: 2,
//                        Logovani: this.Logovani
//                    };
//                    Gordic.Esu.Dialogs.DetailEsuDlg(this, opt).on("close", function (ev, retVal) {
//                        if (retVal && retVal.ulozeno) {
//                            that.nacistEsuVeSkupine();
//                        }
//                    });
//                }

//            },

//            odstranitESU: function () {
//                var that = this;
//                var sel = that.grid.ggrid("getSelection");
//                if (sel.length > 0) { // pokud je to skupina lze mazat
//                    var EsuTxt = "<br><br>";
//                    $(sel).each(function (index, element) {
//                        EsuTxt = EsuTxt + "<br>" + element.esu_txt
//                        //esu_txt
//                    });
                    

//                    var text = "jres:31900256".format(sel.length); //RC 31900256 : Přejete si opravdu odebrat vybrané externí subjekty (počet: {0}) ze skupiny?
//                    text = text + EsuTxt;
//                    this.dialogs.confirm("jres:26265104", text).on("close", function (ev, retVal) { //RC 26265104 : Odstranit
//                        if (retVal) {
//                            if (retVal === "yes") {
//                                that.odstranitESUSrv(sel);
//                            }
//                        }
//                    });
//                }

//            },
//            odstranitESUSrv: function (subjekty) {
//                var that = this;
//                if (!this.zkontrolujIxsRzdSkupiny()) {
//                    return;
//                }
//                var l_oJSONPars = {
//                    ixs_rzd: this.ixsRzd,
//                    List: subjekty
//                };
//                that.call("OdstraneniEsu", l_oJSONPars)
//                    .done(function (retVal) {
//                        if (retVal) {
//                            that.nacistEsuVeSkupine();
//                        }
//                    });

//            },
          
//            //odstranitESU

//             //#endregion


//            nactiVse: function () {
//                var that = this;
//                // nactu aktualní stav
//                var nactiVse = this.actions.actNactiVse.checked();  
//                // nastavím opačný
//                this.actions.actNactiVse.checked(!nactiVse); 

//                this.obcerstivt(null);

//            },

//            prevzit: function () {
//                var esuSel = this.grid.ggrid("getSelection");
//                if (esuSel.length > 0){
//                    this.returnValueFromDet = { subjekty: esuSel };
//                    this.tryClose();
//                }

//            },

//            pridatZeSouboru: function () {
//                var that = this;
//                if (!this.zkontrolujIxsRzdSkupiny()) {
//                    return;
//                }
//                var opt = {
//                    IxsRzd: this.ixsRzd
//                };
//                Gordic.Esu.Dialogs.VyslNacteniSubjektuDlg({ parentContent: this, opt: opt })
//                    .done(function (retVal) {
//                        if (retVal) {
//                            that.nacistEsuVeSkupine();
//                        }
                       
//                });
//            },

//            closing: function () { // podmineny userClose 
//                var def = $.Deferred();
//                if (this.returnValueFromDet) {
//                    def.resolve(this.returnValueFromDet);
//                } else {
//                    def.resolve();
//                }
//                return def.promise();
//            },


          

//    }, { extendIntellisense: GContent });
    
       

//});

   