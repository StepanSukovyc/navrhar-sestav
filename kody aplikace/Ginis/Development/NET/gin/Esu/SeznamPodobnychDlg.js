

$(function () {
        "use strict";
        
        namespace("Gordic.Esu.WebClient.SeznamPodobnychDlg", {

            onContentReady: function () {
                if (!this._isDebounced) {
                    this.showPreview = Utils.debounced(this.showPreview, 250);
                    this._isDebounced = true;
                }
                var that = this;
                this.newOps({ title: "jres:31900289" });

                console.log("podobne", this.ListDto);
                //#region Vytvoreni gsidebaru pro nahled

                this.previewDiv = this.createPreviewPanel();
                this.rowToPreview = null;

                this.element.gsidebar("addPanel", "right", {
                    leaf: { caption: "jres:31900196" }, //RC 31900196 : Náhled
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
                this.comparisonCnt$ = $("<div class='no-border'>").append($("<h3>", { text: "jres:31900218", style: "margin: 0.5rem" })); //RC 31900218 : Vyberte alespoň dvě položky v seznamu
                this.element.gsidebar("addPanel", "right", {
                    leaf: { caption: "jres:31900197", badge: this.comparisonBadge }, //RC 31900197 : Porovnání
                    id: "rightComparisonPanel",
                    pinned: false,
                    icon: "fa-balance-scale",
                    customDiv: this.comparisonCnt$
                });
                //#endregion

                var gridKolonky = new Gordic.Data.GridFormat()

                    .addHtmlColumn({
                        name: "cnt_zo",
                        caption: "jres:31900190", //RC 31900190 : Zástupné osoboy
                        customClass: "center",
                        width: 40,
                        fixedWidth: true,
                        cellTemplate: Gordic.Esu.Function.cellTemplateZastupneOsoby(that) 
                    });

                    if (this.gin_ssl_datschr) {
                        gridKolonky.addIconColumn(Gordic.Esu.Function.ColumnDatovaSchrankaZIco_ds());
                    }

                    gridKolonky
                        .addIconColumn(Gordic.Esu.Function.ColumnTypAdresy())
                        .addIconColumn(Gordic.Esu.Function.ColumnIszrIkonka(that.gin_esu_inzobr, that.gin_iszr_zostv));

                    gridKolonky.addTextColumn({
                        name: "typ_adr_txt",
                        caption: "jres:26265354", //RC 26265354 : Typ adresy
                    });

                    if (this.gin_ssl_datschr) {
                        gridKolonky.addTextColumn({
                            name: "id_ds",
                            caption: "jres:31900191", //RC 31900191 : Datová schránka
                        });

                    }
                    gridKolonky.addTextColumn({
                        name: "nazev_ext",
                        caption: "jres:26265146", //RC 26265146 : Název
                    })
                    .addTextColumn({
                        name: "ulice",
                        caption: "jres:26265147", //RC 26265147 : Ulice
                    })
                    .addTextColumn({
                        name: "cpop",
                        caption: "jres:31900193", //RC 31900193 : Č.pop
                    })
                    .addTextColumn({
                        name: "obec",
                        caption: "jres:26265149", //RC 26265149 : Obec
                    })
                    .addNumberColumn({
                        name: "ur_pri",
                        caption: "jres:26265382", //RC 26265382 : Úroveň přístupu
                    })
                    .addTextColumn({
                        name: "esu_txt_ext",
                        caption: "jres:26265098", //RC 26265098 : Externí subjekt
                    })
                    .addTextColumn({
                        name: "typ_txt",
                        caption: "jres:31900194", //RC 31900194 : Typ
                    })
                    .addTextColumn({
                        name: "ixs_esu",
                        caption: "jres:26265221", //RC 26265221 : ID
                    })
                    .addTextColumn({
                        name: "ixs_eko",
                        caption: "jres:31900195", //RC 31900195 : ID ekonomického subjektu
                    })
                    .addTextColumn({
                        name: "zmenu_prov_rf",
                        caption: "jres:26265161", //RC 26265161 : Změnu provedl
                    });

                $.content(this).actions.add({
                    name: "actOtevriDetailEsu",
                    run: function (ev, ctx) {
                        console.log(ctx.cellInfo.data);
                        that.detail(); // detailEditace
                        
                    }
                });

                that.gridPodobne = $("<div>").appendTo(this.element);
                    //.height(900)
                that.gridPodobne.gautofit()
                    .ggrid({
                        name: "GridPodobne",
                        //data: ,
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit",  // fit, full
                        customClass: "js-gridPodobne",
                        navigationMode: "row", // row, cell
                        defaultAction: $.content(this).actions.actOtevriDetailEsu, //selectAction
                        rowsClass: function (dataRow) {
                            if (dataRow && dataRow.data && dataRow.data.trideni === 0) {
                                return "bold";
                            } else return "  ";
                        },
                        selection: function (ev, selectionInfo) {
                            var sel = that.gridPodobne.ggrid("activeRow");
                            if (sel != null) {
                                that.enablePreview(true);
                                that.showPreview(sel);
                            } else {
                                that.enablePreview(false);
                            }
                            that.updateActions();
                        },

                        multi: this.TypZobrazeni === 3 ? true : false,

                        scrollHelperTemplate: "{nazev_ext}",  // "{ixs_esu} - {nazev}",
                        /*
                        searchColumns: ["nazev_ext"],
                        */
                        columns: gridKolonky,
                    });
             
                  
                

               
             
                this.naplnGrid(this.ListDto);
                this.updateActions();
         
            },

            naplnGrid: function (listDto) {
                this.ViewTabulkaPobocky = new Gordic.Data.View(listDto, { key: "ixs_esu" }); 
                this.gridPodobne.ggrid("setData", this.ViewTabulkaPobocky, true);
            },

         
            //#region updateActions

            updateActions: function () {
                this.updateActDetail();
                this.updateActUlozitNovy();
                this.updateActVybrat();
                this.updateActNapojit();
            },


            updateActDetail: function () {
                var enabled = false;
                var sel = this.gridPodobne.ggrid("getSelection");
                if (sel.length === 1) {
                    enabled = true;
                }
                this.actions.actDetail.update({ enabled: enabled });
            },

            updateActUlozitNovy: function () {
                var enabled = false;
                if (this.gin_esu_rp_newd) {
                    enabled = true;
                }
                this.actions.actUlozitNovy.update({ enabled: enabled });
            },

            updateActVybrat: function () {
                var enabled = false;
                var sel = this.gridPodobne.ggrid("getSelection");
                if (sel.length === 1) {
                    enabled = true;
                }
                this.actions.actVybrat.update({ enabled: enabled });
            },

            updateActNapojit: function () {
                var enabled = false;
                var sel = this.gridPodobne.ggrid("getSelection");
                if (sel.length === 1 && (sel.stupen_ver === 55 || sel.stupen_ver === 65) && this.DetailUkladaneho.IxsEsu) {
                     // Hlavni subjekt
                    if (sel.ixs_esu === sel.ixs_eko && this.DetailUkladaneho.IxsEsu === this.DetailUkladaneho.IxsEko && sel.aktivita === 100 ) {
                        enabled = true;  
                    }
                    // napojovaný je pobočka nebo není hlavní
                    if (this.DetailUkladaneho.IxsEsu !== this.DetailUkladaneho.IxsEko && sel.aktivita === 100){
                        enabled = true;                
                    }
                }
                    //enabled = true;
       
                this.actions.actNapojit.update({ enabled: enabled });
            },


            
            //#endregion

            //#region Esu náhled
            _isDebounced: false,

            createPreviewPanel: function () {
                return $("<div>").gpreview({
                    tabs: [

                        {
                            caption: "jres:31900321", //RC 31900321 : Souhrn
                            content: "Gordic.Esu.WebClient.GEsuDetailPreview"//časem takto-> function (loadParams) { return Gordic.Previews.getPreviewClass(loadParams.typ_ag, loadParams); }
                        },

                    ]
                });
            },

            loadPreview: function (row) {
                var that = this;
                console.log(row);
                this.previewDiv.gpreview("loadAll", {
                    Logovani: that.Logovani,
                    IxsEsu: row.ixs_esu
                } /*nebo jiné dto, klidně celé row*/, true/*okamžitý reload*/);
            },
            enablePreview: function (enabled) {
                this.previewDiv.gpreview("option", { disabled: !enabled });
            },
            showPreview: function (row) {
                if (this.element.gsidebar("getPanel", "panelPreview").gsbpanel("option", "visible")) {
                    this.loadPreview(row);
                } else {
                    this.rowToPreview = row;
                }
            },
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
                        columns: this.gridPodobne.ggrid("option", "columns"),//this.porovnavaciGridFormat(),
                        itemTemplate: "{nazev}",
                        itemchange: function (ev, ctx) { _this.comparisonBadge.value = ctx.count; _this.comparisonBadge.update(); },
                        selection: function (ev, ctx) { _this.gridPodobne.ggrid("activeRow", ctx.item); }
                    });
                }
                for (var row in rows) {
                    rows[row].checked = false;
                }

                this.gridPodobne.ggrid("refresh");

            },

            addToComparison: function (rows) {
                this.comparisonCnt$.find(".gcomparator").gcomparator("addItems", rows);
            },
            //#endregion

            detail: function () {
                var that = this;
                var sel = that.gridPodobne.ggrid("getSelection");
                if (sel.length > 0 && sel["0"].ixs_esu) {
                    var opt = {
                        IxsEsu: sel["0"].ixs_esu,
                        Ucel: 1,
                        Logovani: this.Logovani,
                        LzePrepnoutZDetailuNaEditaci: true // dsebesta přidáno 22.1.2021
                    };
                    Gordic.Esu.Dialogs.DetailEsuDlg(this, opt);
                }

            },
            /*
            /// <summary>
            /// Má se uložit nově zakládaný ESU
            /// </summary>
            UlozitNovy,
            /// <summary>
            /// Má se použít vybraný podobný ESU
            /// </summary>
            PouzitVybrany,
            /// <summary>
            /// Uživatel stiskl strono - návrat k editaci nového ESU
            /// </summary>
            Storno,
            /// <summary>
            /// Napojit
            /// </summary>
            Napojit,
            */

            ulozitNovy: function () {
                var that = this;
                this.returnValueFromDet = {
                    stav: "UlozitNovy",
                    data: this.DetailUkladaneho
                };
                this.tryClose();
            },

            vybrat: function () {
                var that = this;
                var sel = that.gridPodobne.ggrid("getSelection");
                if (sel.length > 0) {
                    // asi přesypat do dat Ginsesu
                    this.returnValueFromDet = {
                        stav: "PouzitVybrany",
                        data: {
                            IxsEsu: sel[0].ixs_esu,
                            Nazev: sel[0].nazev
                        }
                    }
                    this.tryClose();
                }
            },

            napojitNaVybrany: function () {
                var that = this;
                var sel = that.gridPodobne.ggrid("getSelection");
                if (sel.length > 0) {
                    this.call("Napojeni", { row: sel[0] } )
                        .done(function (retVal) {
                            if (retVal) {
                                this.returnValueFromDet = {
                                    stav: "Napojit",
                                    data: {
                                        IxsEsu: sel[0].ixs_esu,
                                        Nazev: sel[0].nazev
                                    }
                                }
                                this.tryClose();
                            }
                        });
                }
            },

            closing: function () { // podmineny userClose 
                var def = $.Deferred();

                if(this.returnValueFromDet) {
                    def.resolve(this.returnValueFromDet);
                } else {
                    def.resolve();
                }
               
                return def.promise();
            },
    }, { extendIntellisense: GContent });
    
       

});

   