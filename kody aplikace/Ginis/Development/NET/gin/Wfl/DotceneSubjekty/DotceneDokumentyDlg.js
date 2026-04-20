

$(function () {
        "use strict";
        namespace("Gordic.Wfl.WebClient.DotceneDokumentyDlg", {

            onContentReady: function () {

                var that = this;
                this.title = "jres:31926079" + " " + this.ixs_esu;


                //#region vytvoření gsidebaru pro Esu 
                if (!this.OmezenyNahledZESU) {
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
                }
                //#endregion

                //#region Vytvoreni gsidebaru pro porovnání
                this.comparisonBadge = new GObservableObject({ value: "0" });
                this.comparisonCnt$ = $("<div class='no-border'>").append($("<h3>", { text: "jres:31926005", style: "margin: 0.5rem" })); //RC 31926005 : Vyberte alespoň dvě položky v seznamu
                this.element.gsidebar("addPanel", "right", {
                    leaf: { caption: "jres:26226072", badge: this.comparisonBadge }, //RC 26226072 : Porovnání
                    id: "rightComparisonPanel",
                    pinned: false,
                    icon: "fa-balance-scale",
                    customDiv: this.comparisonCnt$
                });
                //#endregion

                //#region dokumenty

                var gridKolonky = new Gordic.Data.GridFormat();
              
                gridKolonky
                    .addIconColumn(Gordic.Wfl.Globals.ListSupport.TypDokumentuColumn())
                    .addIconColumn(Gordic.Wfl.Globals.ListSupport.EleColumn())
                    .addIconColumn(Gordic.Wfl.Globals.ListSupport.StavDokColumn())
                    ;
                
                gridKolonky
                    .addTextColumn({
                        name: "ixp",
                        caption: "jres:26225442", //RC 26225442 : PID
                    })
                    .addTextColumn({
                        name: "akt_znacka",
                        caption: "jres:26225557", //RC 26225557 : Značka
                    });
                if (!this.OmezenyNahledZESU) { 
                    gridKolonky
                        .addTextColumn({
                            name: "nazev",
                            caption: "jres:26225443", //RC 26225443 : Věc
                        })
                        .addTextColumn({
                            name: "poznamka",
                            caption: "jres:26225312", //RC 26225312 : Poznámka
                        });
                }
                gridKolonky
                    .addTextColumn({
                        name: "typ_vazby_txt",
                        caption: "jres:26225313", //RC 26225313 : Typ vazby
                    })
                    .addTextColumn({
                        name: "dva_txt",
                        caption: "jres:26225311", //RC 26225311 : Důvod vazby
                    })
                    .addTextColumn({
                        name: "nazev_rf",
                        caption: "jres:26225279", //RC 26225279 : Změnu provedl
                    })
                    .addDateTimeColumn({
                        name: "dat_zmena",
                        caption: "jres:26225280", //RC 26225280 : Datum změny
                    });
               

                $.content(this).actions.add({
                    name: "actDoubleClickDokumentu",
                    run: function (ev, ctx) {
                        that.detailDokumentu();
                        
                    }
                });

                that.grid = $("<div>").appendTo(this.element);
                that.grid.gautofit()
                    //.height(600)
                    .ggrid({
                        name: "Grid",
                        //data: ,
                        renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                        columnMode: "fit",  // fit, full
                        navigationMode: "row", // row, cell
                        defaultAction: $.content(this).actions.actDoubleClickDokumentu, //selectAction
                        rowsClass: function (dataRow) {
                            if (dataRow && dataRow.data && dataRow.data.aktivita !== 100) { //aktivita_ds
                                return " ui-disabled data-deleted ";
                            } else return " ";
                        },
                        selection: function (ev, selectionInfo) {
                            var sel = that.grid.ggrid("activeRow");
                            if (!that.OmezenyNahledZESU) {
                                if (sel != null) {
                                    that.enablePreview(true);
                                    that.showPreview(sel);
                                } else {
                                    that.enablePreview(false);
                                }
                            }
                            that.updateActions();
                        },


                        multi: false,

                        scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                        searchColumns: ["nazev"],

                        columns: gridKolonky,
                    });
                 //#endregion 

               






                this.naplnGrid(this.ListDto);
            },

            naplnGrid: function (listDto) {
                this.ViewTabulka = new Gordic.Data.View(listDto, { key: "ixp" }); 
                this.grid.ggrid("setData", this.ViewTabulka, true);
                this.updateActions();
            },

            updateActions: function () {


            },
            iNeaktivniChange: function () {

                this.actions.actINeaktivni.checked(!this.actions.actINeaktivni.checked());
                this.INeaktivni = this.actions.actINeaktivni.checked();
                this.reloadData();
            },

            iOdesilateleChange: function () {

                this.actions.actIOdesilatele.checked(!this.actions.actIOdesilatele.checked());
                this.IOdesilatele = this.actions.actIOdesilatele.checked();
                this.reloadData();
            },

            //#region akce
            detail: function () {
                var opt = {
                    IxsEsu: this.ixs_esu,
                    Ucel: 1,
                    Logovani: this.Logovani,
                    LzePrepnoutZDetailuNaEditaci: false
                };
                Gordic.Esu.Dialogs.DetailEsuDlg(this, opt);
            },

            detailDokumentu: function () {
                var selection = this.grid.ggrid("getSelection");
                if (selection &&
                    (selection.length === 1) &&
                    selection[0].ixp != null) {
                    var opt = {
                        DetailDto:
                        {
                            ixp: selection[0].ixp
                        }
                    };
                    Gordic.Wfl.Dialogs.DetailDokumentuSpisu(this, opt);
                }
            },

            //#endregion 
            reloadData: function () {
                var that = this;
                this.call("LoadData", { INeaktivni: this.INeaktivni, IOdesilatele: this.IOdesilatele })
                    .done(function (retVal) {
                        if (retVal) {
                            that.naplnGrid(retVal);
                        }

                    });
            },

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
                        itemTemplate: "{nazev}",
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


            //#region Wfl náhled
            createPreviewPanel: function () {
                return $("<div>").gpreview({
                    parenteContent: this,
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

            loadPreview: function (row) {
                this.previewDiv.gpreview("loadAll", { ixp: row.ixp } /*nebo jiné dto, klidně celé row*/, true/*okamžitý reload*/);
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



            closing: function () { // podmineny userClose 
                var def = $.Deferred();

                if(this.retValue) {
                    //this.dialogs.messageBox("jres:31926025",//RC 31926025 : Zavření
                    //    "jres:31900210", GDlg.mbbYesNo, GDlg.mbiQuestion)  //RC 31900210 : Opravdu chcete zavřít Adresy/Pobočky bez uložení změn?
                    //    .on("yes", def.resolve)
                    //    .on("close", def.reject);
                } else {
                    def.resolve();
                }
               
                return def.promise();
            },

            closeDet: function () {
                this.tryClose();

            },

            

    }, { extendIntellisense: GContent });
    
       

});

   