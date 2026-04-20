

$(function () {
        "use strict";
        
        namespace("Gordic.Gin.WebClient.RozdelovnikISUDlg", {

            onContentReady: function () {
                // exportGridEnabled - POZOR!!! V js funguje, ale pri prepisu do TS zacne padat u hodnoty true. Není to bool ale eventa. 

                var that = this;
                this.title = "jres:26275118";
                console.log("List", this.ListDto);

                var gridKolonky = new Gordic.Data.GridFormat()
                    

                    gridKolonky.addTextColumn({
                        name: "nazev_subjektu",
                        caption: "jres:26275065",  //RC 26275065 : Subjekt
                    });

                    gridKolonky.addTextColumn({
                        name: "typ_subjektu",
                        caption: "jres:26275066",   //RC 26275066 : Typ
                    })
                    .addTextColumn({
                        name: "poznamka",
                        caption: "jres:26275067",  //RC 26275067 : Poznámka
                    })
                    .addDateTimeColumn({
                        name: "dat_zmena",
                        caption: "jres:26275068",  //RC 26275068 : Datum přidání
                    })
                    .addTextColumn({
                        name: "nazev_zmenu_prov",
                        caption: "jres:26275069", //RC 26275069 : Přidal
                    });

                $.content(this).actions.add({
                    name: "actOtevriDetailEsu",
                    run: function (ev, ctx) {
                        console.log(ctx.cellInfo.data);
                        
                    }
                });

                that.grid = $("<div>").appendTo(this.element)
                    //.height(900)
                    .gautofit()
                    .ggrid({
                        name: "Grid",
                        //data: ,
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit",  // fit, full
                        customClass: "js-grid",
                        navigationMode: "row", // row, cell
                        defaultAction: $.content(this).actions.actOtevriDetailEsu, //selectAction
                        rowsClass: function (dataRow) {
                            
                        },
                        //selection: 
                        cellActivate: function (ev, row) {
                            if (row && row.cellInfo && row.cellInfo.data ) { // u single modu vzdy 1 ale pro jistotu testuji
                              //  that.ukazNahled(row.cellInfo.data);
                                that.updateActions();
                            }
                         },

                        multi: true,
                        rowsChecked: "checked",
                        exportOptions: this.exportGridEnabled,
                        scrollHelperTemplate: "{nazev_subjektu}",  // "{ixs_ssu} - {nazev}",
                        searchColumns: ["nazev_subjektu", "typ_subjektu"],

                        columns: gridKolonky,
                    });
             
                //#region Vytvoreni gsidebaru pro nahled
                /*
                this.element.gsidebar("option", { right: { width: 400 } });
                this.rightSbCnt$ = $("<div class=''>").append($("<h3>", { text: "jres:31900217", style: "margin: 0.5rem" })); //RC 31900217 : Vyberte položku v seznamu
                this.element.gsidebar("addPanel", "right", {
                    caption: "jres:31900196", //RC 31900196 : Náhled
                    id: "rightPanel",
                    customDiv: this.rightSbCnt$
                });
                
                this.rightSb$ = this.element.gsidebar("getPanel", "rightPanel"); //.gsbpanel("hide").gsbpanel("show")
                //this.element.gsidebar().hide().show();
                */
                //#endregion
                  
                //#region Vytvoreni gsidebaru pro porovnání
                this.comparisonBadge = new GObservableObject({ value: "0" });
                this.comparisonCnt$ = $("<div class='no-border'>").append($("<h3>", { text: "jres:31910026", style: "margin: 0.5rem" })); //RC 31910026 : Vyberte alespoň dvě položky v seznamu
                this.element.gsidebar("addPanel", "right", {
                    leaf: { caption: "jres:31910025", badge: this.comparisonBadge }, //RC 31910025 : Porovnání
                    id: "rightComparisonPanel",
                    pinned: false,
                    customDiv: this.comparisonCnt$
                });
                //#endregion
                this.provestZaskrtnuti = true;
                this.vytvoritStromoGrid();
                this.naplnSkupinyGrid(this.ListDto);
                //this.naplnGrid(this.ListDto);
                this.setFocusOnReferent();
            },

            naplnGrid: function (listDto) {
                if (this.SkupinyWorkingMode === 1 && this.provestZaskrtnuti) {   // pokud je nastaveno zaškrtnu vše jen tekdy pokud dochází k výběru ze stromu
                    $(listDto).each(function (index, element) {
                        element.checked = true;
                    });
                }
                else if (this.ViewTabulkaEsu) { // && !this.provestZaskrtnuti // pokus o pamatopvání předchozích zaškrtlejch
                    var index = this.ViewTabulkaEsu.buildIndex();
                    $(listDto).each(function (numIndex, element) {
                        if (index[element.ixs_ssu] && index[element.ixs_ssu].checked) {
                            element.checked = true;
                        }
                    });
                }
                this.provestZaskrtnuti = true;
                this.ViewTabulkaEsu = new Gordic.Data.View(listDto, { key: "ixs_ssu" }); 
                this.grid.ggrid("setData", this.ViewTabulkaEsu, true);
                this.updateActions();
            },


            //#region postraní grid se skupinama
            vytvoritStromoGrid: function () {

                var that = this;
                this.element.gsidebar("option", { left: { width: 400 } });
                this.leftSbCnt$ = $("<div class=''>");

                var menuPole =
                    [
                        "actNovaSkupina",
                        "actDetailSkupina",
                        "actOblibeneSkupinu"
                    ];

                this.element.gsidebar("addPanel", "left", {
                    caption: "jres:31910024", //RC 31910024 : Skupiny ISU
                    id: "leftPanel",
                    icon: "fa-group",
                    customDiv: this.leftSbCnt$,
                    pinned: true,
                 //   menuBar: this.actions.createBar(menuPole, true)
                });
                this.leftSb$ = this.element.gsidebar("getPanel", "leftPanel");


                // GRID

                var gridSkupinyKolonky = new Gordic.Data.GridFormat();


                gridSkupinyKolonky.addStructureColumn({
                    name: "mainIco",
                    caption: "jres:26275110",  //RC 26275110 : Typ skupiny
                    //width: 40,
                    fixedWidth: false,
                    sortable: false,
                    formatPreset: "full",
                    iconTemplate: function (data) {
                        if (data.Text) { 
                            if (data.ImageIndex === 1) {
                                return { icon: "fa-building", tooltip: data.Text, text: data.Text };
                            } else if (data.ImageIndex === 2) {
                                return { icon: "fa-cloud", tooltip: data.Text, text: data.Text };
                            } else if (data.ImageIndex === 3) {
                                return { icon: "fa-user", tooltip: data.Text, text: data.Text };
                            } else if (data.ImageIndex === 4) {
                                return { icon: "fa-star", tooltip: data.Text, text: data.Text };
                            } else {
                            return null;
                            }
                        }
                    }
                }).addIconColumn({
                    name: "secoundIco",
                    caption: "jres:31910023", //RC 31910023 : Skupiny
                    //width: 40,
                    fixedWidth: false,
                    sortable: true,
                    formatPreset: "full",
                    sortOrder: Gordic.Data.Sorting.Inline.text("nazev"),
                    iconTemplate: function (data) {
                        if (!data.Text) {
                            if (data.ImageIndex === 0) {
                                return { icon: "fa-group", tooltip: data.nazev, text: data.nazev };
                            } else if (data.ImageIndex === 1) {
                                return { icon: "fa-building", tooltip: data.nazev, text: data.nazev };
                            } else if (data.ImageIndex === 2) {
                                return { icon: "fa-cloud", tooltip: data.nazev, text: data.nazev };
                            } else if (data.ImageIndex === 3) {
                                return { icon: "fa-user", tooltip: data.nazev, text: data.nazev };
                            } else {
                                return null;
                            }
                        }
                    }
                }); 
                gridSkupinyKolonky
                    .addHtmlColumn({
                        name: "editovatelneCol2",
                        caption: "jres:31910162", //RC 31910162 : Možnost editovat
                        width: 35,
                        fixedWidth: true,
                        sortable: false,
                        customClass: "center",
                        cellTemplate: function (data) {
                            if (data.pravoModifikovat) {
                                var pencil = $("<a>").glink({
                                    params: {
                                        action: new GAction({
                                            name: "actZo",
                                            icon: "gi-pencil g-state-text g-state-inactive",
                                            tooltip: "jres:31910163", //RC 31910163 : Skupinu lze modifikovat
                                            customClass: "g-link--no-underline g-state-text",
                                            run: function (event) {
                                                //event.preventDefault();
                                                that.detailSkupiny(data.ixs_ssu, data.pravoModifikovat);
                                            }
                                        })
                                    }
                                });
                                return pencil.prop('title', "jres:31910163"); //RC 31910163 : Skupinu lze modifikovat
                            } else if (data.pravoVytvoritNovy && data.ImageIndex > 0) {
                                var prvek = $("<a>").glink({
                                    params: {
                                        action: new GAction({
                                            name: "actPlus",
                                            icon: "fa-plus g-state-text g-state-success",
                                            tooltip: "jres:31910164", //RC 31910164 : Lze přidat novou skupinu
                                            customClass: "g-link--no-underline g-state-text",
                                            run: function (event) {
                                                //event.preventDefault();
                                                that.novaSkupina(data.typ_ssu);
                                            }
                                        })
                                    }
                                });
                                return prvek.prop('title', "jres:31910164"); //RC 31910164 : Lze přidat novou skupinu



                            }

                            else {
                                return null;
                            }
                        }
                    });

                $.content(this).actions.add({
                    name: "actDoubleClickSkupiny",
                    run: function (ev, ctx) {
                        console.log(ctx.cellInfo.data);
                        that.detailSkupiny();
                    }
                });

                that.gridSkupiny = $("<div>").appendTo(this.leftSbCnt$)
                    .gsubtasks({
                        params: [
                            { action: this.actions.actAktivni }, //RC 26256131 : Nevyřízené
                            { action: this.actions.actNeaktivni }, //RC 26256135 : Vyřízené
                            { action: this.actions.actZrusene }, //RC 26256138 : Neaktivní
                            { action: this.actions.actVsechny } //RC 26256138 : Neaktivní
                        ]
                    });

                that.gridSkupiny = $("<div>").appendTo(this.leftSbCnt$)
                    .gautofit()
                    .ggrid({
                        name: "GridSkupiny",
                        //data: ,
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit",  // fit, full
                        navigationMode: "row", // row, cell
                        defaultAction: $.content(this).actions.actDoubleClickSkupiny, //selectAction
                        rowsClass: function (dataRow) {
                            if ((dataRow.data.ImageIndex !== 0 && dataRow.data.Typ !== 4) || (dataRow.data.Typ === 4 && dataRow.data.Text)) {
                                return "bold";
                            } else return " ";
                        },
                        //selection: 
                        cellActivate: function (ev, row) {
                            if (row && row.cellInfo && row.cellInfo.data) { // u single modu vzdy 1 ale pro jistotu testuji
                              
                                that.nacistEsuVeSkupine();
                                that.updateActions();
                                
                            }
                        },
                        multi: false,
                        exportOptions: that.exportGridEnabled,
                        searchEngine:false,
                        columns: gridSkupinyKolonky,
                    });
            },

            naplnSkupinyGrid: function (listDto) {
                this.viewTabulkaSkupiny =
                    new Gordic.Data.View(
                        listDto,
                        {
                            //key: "ixs_ssu",
                            key: "gridKey",
                            //key: "ixs_rzd",
                            processors: {
                                tree: new Gordic.Data.Tree( // pozor je nutné přidat "addStructureColumn"
                                    Gordic.Data.Tree.parentIdOrganizer("p_gridKey"),
                                    {
                                        defaultState: "open"
                                    }
                                )
                            }
                        }
                    );
                this.gridSkupiny.ggrid("setData", this.viewTabulkaSkupiny, true);
                this.updateActions();
            },

            //#endregion

            //#region updateActions

            updateActions: function () {
                var skupinySel = this.gridSkupiny.ggrid("getSelection");
                var esuSel = this.grid.ggrid("getSelection");

                this.UpdateActionNovaSkupina(skupinySel);
                this.UpdateActionOblibeneSkupinu(skupinySel);
                this.UpdateActionDetailSkupiny(skupinySel);
                this.UpdateActionNovy(skupinySel);
                this.UpdateActionOdstranit(skupinySel,esuSel);
                //this.UpdateActionPridatZeSouboru(skupinySel);
                this.UpdateActionactPrevzit(esuSel);
                

            },

            UpdateActionNovaSkupina: function (skupinySel) {
                if (skupinySel.length > 0 && skupinySel[0].pravoVytvoritNovy) {
                    this.actions.actNovaSkupina.update({ enabled: true });
                } else {
                    this.actions.actNovaSkupina.update({ enabled: false });
                }
            },

            UpdateActionOblibeneSkupinu: function (skupinySel) {
                if (skupinySel.length > 0 && skupinySel[0].pravoModifikovat) {
                    this.actions.actOblibeneSkupinu.update({ enabled: true });
                } else {
                    this.actions.actOblibeneSkupinu.update({ enabled: false });
                }

                if (skupinySel[0].Typ === 4 && !skupinySel[0].Text) {
                    this.actions.actOblibeneSkupinu.update({
                        caption: "jres:31910047" //RC 31910047 : Odebrat z oblíbených
                        ,tooltip: "jres:31910047" //RC 31910047 : Odebrat z oblíbených
                    });
                } else {
                    this.actions.actOblibeneSkupinu.update({
                        caption:"jres:31910036", //RC 31910036 : Přidat k oblíbeným
                        tooltip: "jres:31910036" //RC 31910036 : Přidat k oblíbeným
                    });
                }
                 
            },

            UpdateActionDetailSkupiny: function (skupinySel) {
                if (skupinySel.length > 0 && !skupinySel[0].Text) {
                    this.actions.actDetailSkupina.update({ enabled: true });
                } else {
                    this.actions.actDetailSkupina.update({ enabled: false });
                }

            },

            UpdateActionNovy: function (skupinySel) {
                if (skupinySel.length > 0 && skupinySel[0].pravoModifikovat) { //ixs_ssu
                    this.actions.actNovaIsu.update({ enabled: true });
                } else {
                    this.actions.actNovaIsu.update({ enabled: false });
                }

            },

            UpdateActionOdstranit: function (skupinySel, esuSel) {
                if ((skupinySel.length > 0 && skupinySel[0].pravoModifikovat) && esuSel.length > 0) {
                    this.actions.actOdstranitEsu.update({ enabled: true });
                } else {
                    this.actions.actOdstranitEsu.update({ enabled: false });
                }


            },



            UpdateActionactPrevzit: function (esuSel) {
                if (esuSel.length > 0) {
                    this.actions.actPrevzit.update({ enabled: true });
                } else {
                    this.actions.actPrevzit.update({ enabled: false });
                }
            },

            //UpdateActionPridatZeSouboru: function (skupinySel) {
            //    if (this.gin_esu_roznaci && skupinySel[0].ImageIndex === 0 && skupinySel[0].pravoModifikovat) {
            //        this.actions.actPridatZeSouboru.update({ enabled: true });
            //    } else {
            //        this.actions.actPridatZeSouboru.update({ enabled: false });
            //    }
            //},

            
            //#endregion

           
            
            //#region porovnání
            showComparison: function (rows) {
                var _this = this;
                var dataRows = rows.map(function (item, idx) { return item.data; }); // převod z grid metadata-view do pole dto
                if (this.isComparisonInited) {
                    this.addToComparison(dataRows);
                } else {
                    this.isComparisonInited = true;
                    this.comparisonCnt$.empty();

                    $('<div class="js-detail-comparator">').appendTo(this.comparisonCnt$).gcomparator({
                        items: dataRows,
                        columns: this.grid.ggrid("option", "columns"),//this.porovnavaciGridFormat(),
                        itemTemplate: "{esu_txt}",
                        itemchange: function (ev, ctx) { _this.comparisonBadge.value = ctx.count; _this.comparisonBadge.update(); },
                        selection: function (ev, ctx) { _this.grid.ggrid("activeRow", ctx.item); }
                    });
                }
                for (var row in rows) {
                    rows[row].checked = false;
                }

                this.grid.ggrid("refresh");

            },

            addToComparison: function (rows) {
                this.comparisonCnt$.find(".gcomparator").gcomparator("addItems", rows);
            },
            //#endregion

            //#region obsluha gridu skupin
            nacistEsuVeSkupine: function () {
                var that = this;
                var sel = that.gridSkupiny.ggrid("getSelection");
                if (sel.length > 0 && (sel[0].ImageIndex === 0 || (sel[0].Typ === 4 && !sel[0].Text)) ) {
                    this.call("LoadDataSubjektyVeSkupine", { IxsSsu: sel[0].ixs_ssu })
                        .done(function (retVal) {
                            if (retVal) {
                                that.ixsSsu = sel[0].ixs_ssu; 
                                
                                that.naplnGrid(retVal);
                                
                            }
                        });
                }
            },

            detailSkupiny: function (ixs_ssu, pravoModifikovat) {
                var that = this;
                if (ixs_ssu == null) {
                    var sel = that.gridSkupiny.ggrid("getSelection");
                    if (sel.length > 0 && sel[0].ixs_ssu) {
                        ixs_ssu = sel[0].ixs_ssu;
                        pravoModifikovat = sel[0].pravoModifikovat;
                    }
                }
                if (ixs_ssu) {
                    var l_oJSONPars = {
                        IxsSsu: ixs_ssu,
                        Editace: pravoModifikovat
                    };
                    Gordic.Gin.Dialogs.DetailRozdelovnikuISUDlg(this, l_oJSONPars,"showModalWindow").on("close", function (ev, retVal) {
                        if (retVal && retVal.dataChange) {
                            that.obcerstivt(null);
                        }
                    });
                }

            },

            novaSkupina: function (typ_ssu) {
                var that = this;
                var sel = that.gridSkupiny.ggrid("getSelection");
                if (sel.length > 0 && sel[0].typ_ssu != null) {
                    var l_oJSONPars = {
                        TypSkupiny: typ_ssu != null ? typ_ssu : sel[0].typ_ssu,
                        Editace: true
                    };
                    Gordic.Gin.Dialogs.DetailRozdelovnikuISUDlg(this, l_oJSONPars, "showModalWindow").on("close", function (ev, retVal) {
                        if (retVal && retVal.dataChange) {
                            that.obcerstivt(retVal.dataChange,true); //zároven nastavím jako active
                        }
                    });
                }

            },

            pridatKOblibenym: function () {
                var that = this;
                var sel = that.gridSkupiny.ggrid("getSelection");
                if (sel.length > 0 && (sel[0].ImageIndex === 0 || (sel[0].Typ === 4 && !sel[0].Text))) { // pokud je to skupina lze přidat k oblíbeným

                    this.call("Oblibene", { IxsSsu: sel[0].ixs_ssu })
                        .done(function (retVal) {
                            if (retVal) {
                                that.obcerstivt();
                            }
                        });
                }
            },

            obcerstivt: function (ixs_ssu,zaskrtnoutVse) {
                var that = this;
                that.provestZaskrtnuti = zaskrtnoutVse ? true : false;
                this.call("LoadData", { TreeAktivita: this.aktivita})
                    .done(function (retVal) {
                        if (retVal) {
                            that.naplnSkupinyGrid(retVal);
                            if (ixs_ssu) {
                                that.gridSkupiny.ggrid("activeRow", { ixs_ssu: ixs_ssu });
                            }
                        }
                    });
            },

            aktivniSkupiny: function () {
                this.aktivita = 100;
                this.obcerstivt();
            },
            neaktivniSkupiny: function () {
                this.aktivita = 500;
                this.obcerstivt();
            },
            zruseneSkupiny: function () {
                this.aktivita = 900;
                this.obcerstivt();
            },
            vsechnySkupiny: function () {
                this.aktivita = 0;
                this.obcerstivt();
            },

            //#endregion

            //#region obsluha gridu esu


            zkontrolujIxsSsuSkupiny: function () {
                var that = this;
                if (this.ixsSsu == null) {
                    this.dialogs.alert(
                        "jres:31910129", //RC 31910129 : Pozor
                        "jres:31910130" //RC 31910130 : Vyberte konkrétní skupinu.
                    );
                    return false;
                }
                return true;
            },

            noveISU: function () {
                var that = this;
                if (!this.zkontrolujIxsSsuSkupiny()) {
                    return;
                }
                Gordic.Gin.Dialogs.VyberSubjektuIsuDlg(this, {}, "showModalWindow").on("close", function (ev, retVal) {
                    if (retVal && retVal.IxsSubjektu && retVal.IxsSubjektu.length > 0) {
                        that.noveISUSrv(retVal);
                        //{ IxsSubjektu: l_sIxsSubjektu, FlagSubjektu: l_sFlagSubjektu, Poznamka: l_sPoznamka }
                    }
                });
            },

            noveISUSrv: function (retVal) {
                var that = this;
                var l_oJSONPars = {
                    IxsSsu: this.ixsSsu,
                    PolePridanych: retVal.IxsSubjektu,
                    FlagSubjektu: retVal.FlagSubjektu,
                    Poznamka: retVal.Poznamka
                };
                that.call("PridaniNovychIsu", l_oJSONPars)
                    .done(function (retVal) {
                        if (retVal) {
                            that.nacistEsuVeSkupine();
                        }
                    });
            },

            odstranitISU: function () {
                var that = this;
                var sel = that.grid.ggrid("getSelection");
                if (sel.length > 0) { // pokud je to skupina lze mazat
                    var ISUTxt = "<br><br>";
                    $(sel).each(function (index, element) {
                        ISUTxt = ISUTxt + "<br>" + element.nazev_subjektu;
                        //esu_txt
                    });
                    var text = "jres:31910035".format(sel.length); //RC 31910035 : Přejete si opravdu odebrat vybrané interní subjekty (počet: {0}) ze skupiny?
                    text = text + ISUTxt;
                    this.dialogs.confirm("jres:26275048", text).on("close", function (ev, retVal) { //RC 26275048 : Odstranit
                        if (retVal) {
                            if (retVal === "yes") {
                                that.odstranitISUSrv(sel);
                            }
                        }
                    });
                }

            },
            odstranitISUSrv: function (subjekty) {
                var that = this;
                var l_oJSONPars = {
                    ixs_ssu: this.ixsSsu,
                    List: subjekty
                };
                that.call("OdstraneniIsu", l_oJSONPars)
                    .done(function (retVal) {
                        if (retVal) {
                            that.nacistEsuVeSkupine();
                        }
                    });
            },
          
            //odstranitESU

             //#endregion


            prevzit: function () {
                var esuSel = this.grid.ggrid("getSelection");
                if (esuSel.length > 0){
                    this.returnValueFromDet = { subjekty: esuSel };
                    this.tryClose();
                }

            },

            setFocusOnReferent: function () {
                var poleDat = this.viewTabulkaSkupiny.getDataRows();
                var referenti = poleDat.filter(function (params) {
                    return params.ImageIndex === 3;
                });
                if (referenti != null && referenti.length > 0) {
                    this.gridSkupiny.ggrid("activeRow", { gridKey: referenti[0].gridKey });
                }
            },

            closing: function () { // podmineny userClose 
                var def = $.Deferred();
                if (this.returnValueFromDet) {
                    def.resolve(this.returnValueFromDet);
                } else {
                    def.resolve();
                }
                return def.promise();
            },


          

    }, { extendIntellisense: GContent });
    
       

});

   