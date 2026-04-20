

$(function () {
        "use strict";
        
        namespace("Gordic.Esu.WebClient.SeznamAdresDlg", {
            /// <summary>Běžný režim - dvojklik otevírá detail a neprovádí výběr</summary>
            /// 0 = Normal,
            /// <summary>Režim výběru jednoho externího subjektu</summary>
            /// 1 = SelectEsu,
            /// <summary>Režim výběru jednoho externího subjektu nebo jedné zástupné osoby</summary>
            /// 2 = SelectEsuOrZo,
            /// <summary>Režim výběru více externích subjektů a více zástupných osob</summary>
            /// 3 = SelectMultiEsuAndZo

            onContentReady: function () {
                if (!this._isDebounced) {
                    this.showPreview = Utils.debounced(this.showPreview, 250);
                    this._isDebounced = true;
                }
                var that = this;
                this.newOps({ title: "jres:31900216" });


                console.log("List", this.ListDto);


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
                        //customClass: "center",
                        width: 40,
                        //fixedWidth: true,
                        cellTemplate: Gordic.Esu.Function.cellTemplateZastupneOsoby(that) 
                        
                    });

                    gridKolonky.addIconColumn(Gordic.Esu.Function.ColumnTypAdresy());


                    gridKolonky.addTextColumn({
                        name: "typ_adr_txt",
                        caption: "jres:31900192", //RC 31900192 : Typ Adresy
                    });

                    if (this.gin_ssl_datschr) {
                        gridKolonky.addTextColumn({
                            name: "id_ds",
                            caption: "jres:31900191", //RC 31900191 : Datová schránka
                        });

                    }
                    gridKolonky.addTextColumn({
                        name: "ico",
                        caption: "jres:26265288", //RC 26265288 : IČO
                    })
                    .addTextColumn({
                        name: "nazev",
                        caption: "jres:26265146", //RC 26265146 : Název
                    })
                    .addTextColumn({
                        name: "esu_txt",
                        caption: "jres:26265307", //RC 26265307 : Adresa
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
                        that.prevzit();
                        
                    }
                });

                this.gridAdresy = $("<div>").appendTo(this.element);
                    //.height(900)
                this.gridAdresy.gautofit()
                    .ggrid({
                        name: "GridAdresy",
                        //data: ,
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit",  // fit, full
                        customClass: "js-gridAdresy",
                        navigationMode: "row", // row, cell
                        defaultAction: $.content(this).actions.actOtevriDetailEsu, //selectAction
                        rowsClass: function (dataRow) {
                            if (dataRow && dataRow.data && dataRow.data.trideni === 0) {
                                return "bold";
                            } else return " ";
                        },
                        selection: function (ev, selectionInfo) {
                            var sel = that.gridAdresy.ggrid("activeRow");
                            if (sel != null) {
                                that.enablePreview(true);
                                that.showPreview(sel);
                            } else {
                                that.enablePreview(false);
                            }
                            that.updateActions();
                        },

                        multi: this.TypZobrazeni === 3 ? true : false,

                        scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                        /*
                        searchColumns: ["ico", "nazev", "esu_txt", "ixs_esu", "ixs_eko", "zmenu_prov_rf"],
                        */
                        columns: gridKolonky,
                    });
             
              
                  
               

             
                this.naplnGrid(this.ListDto);
         
            },

            naplnGrid: function (listDto) {
                this.ViewTabulkaPobocky = new Gordic.Data.View(listDto, { key: "ixs_esu" }); 
                this.gridAdresy.ggrid("setData", this.ViewTabulkaPobocky, true);
            },


            //#region updateActions

            updateActions: function () {
                this.updateActionUlozit();
            },



            updateActionUlozit: function () {
                var that = this;
                var sel = this.gridAdresy.ggrid("getSelection");
                if (sel.length > 0) {
                    this.actions.actPrevzit.update({ enabled: true });
                } else {
                    this.actions.actPrevzit.update({ enabled: false });
                }
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
                        columns: this.gridAdresy.ggrid("option", "columns"),//this.porovnavaciGridFormat(),
                        itemTemplate: "{nazev}",
                        itemchange: function (ev, ctx) { _this.comparisonBadge.value = ctx.count; _this.comparisonBadge.update(); },
                        selection: function (ev, ctx) { _this.gridAdresy.ggrid("activeRow", ctx.item); }
                    });
                }
                for (var row in rows) {
                    rows[row].checked = false;
                }

                this.gridAdresy.ggrid("refresh");

            },

            addToComparison: function (rows) {
                this.comparisonCnt$.find(".gcomparator").gcomparator("addItems", rows);
            },
            //#endregion

            prevzit: function () {
                var that = this;
                var sel = that.gridAdresy.ggrid("getSelection");
                this.returnValueFromDet = { novaAdresa: sel }; //
                this.tryClose();
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

   