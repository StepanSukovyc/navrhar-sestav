(function ($) {
    "use strict";
    namespace("Gordic.Wfl.AdminUzivSloupcuSeznamu", {
        flashPanelTimer: 5000,
        data: [],

        onContentReady: function () {
            var that = this;
            this.title = "jres:26227504"; //RC 26227504 : Přidání/odebrání uživatelských sloupců

            this.actions.addRange({
                actPridat: {
                    //icon: "gi-paper",
                    caption: "jres:26227512", //RC 26227512 : Přidat
                    tooltip: "jres:26227513", //RC 26227513 : Přidat do seznamu
                    run: function (ev, ctx) {
                        that.PridatDoSeznamu();
                    }
                },
                actOdebrat: {
                    //icon: "gi-paper",
                    caption: "jres:26227520", //RC 26227520 : Odebrat
                    tooltip: "jres:26227521", //RC 26227521 : Odebrat ze seznamu
                    run: function (ev, ctx) {
                        that.OdebratZeSeznamu();
                    }
                },
                actOK: {
                    icon: undefined,
                    caption: "jres:26227524", //RC 26227524 : OK
                    run: function (ev, ctx) {
                        that.close(true);
                    }
                },
                actCancel: {
                    icon: undefined,
                    caption: "jres:26227503", //RC 26227503 : Zavří­t
                    run: function (ev, ctx) {
                        that.close();
                    }
                },
            });

            this.menuBar([
                { action: this.actions.actPridat, favorite: true },
                { action: this.actions.actOdebrat, favorite: true },
            ]);

            this.commandBar([
                { action: this.actions.actOK, primary: true },
                { action: this.actions.actCancel },
            ]);

            var form = new Gordic.Forms
                .Form({ name: "FormUzivSloupce", layoutDescriptor: "L2M2S2" })
                .addSection();

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            this.LoadGrid();
        },
        PridatDoSeznamu: function () {
            var that = this;

            var selection = this.gridSloupce.ggrid("getSelection");

            if(selection.length >= this.MaxRows) {
                GDlg.alert(MaxRowsErrText);
                return;
            }

            Gordic.Wfl.Dialogs.UzivSloupceList(this, {}).done(function (retVal) {
                if(retVal) {
                    var newIxs = retVal.row.ixs; 
                    var l_sIxsSerialized = "";
                    var inList = false;

                    for(var i = 0; i < that.data.length; i++) {
                        if(that.data[i].ixs == newIxs) {
                            inList = true;
                        }

                        l_sIxsSerialized += that.data[i].ixs + "|";
                    }

                    if(!inList) {
                        l_sIxsSerialized += newIxs + "|";

                        that.globalSettings.set(that.IdContentUS, l_sIxsSerialized);
                    } else {
                        GDlg.alert("26227519"); //RC 26227519 : Seznam již vybraný sloupec obsahuje.
                    }

                    that.LoadData();
                }
            });
        },
        OdebratZeSeznamu: function () {
            var that = this;

            var selection = this.gridSloupce.ggrid("getSelection");

            if(selection.length == 0) {
                GDlg.alert("jres:26227522"); //RC 26227522 : Vyberte řádek
                return;
            }

            this.data = $.grep(this.data, function (a) {
               // return a.ixs != selection[0].ixs;
                return $.inArray(a,selection) == -1;
            });

            var l_sIxsSerialized = "";

            for(var i = 0; i < that.data.length; i++) {
                l_sIxsSerialized += that.data[i].ixs + "|";
            }

            this.globalSettings.set(this.IdContentUS, l_sIxsSerialized);
            this.LoadData();
        },
        LoadGrid: function () {
            var that = this;

            var gridColumnsDefinition = new Gordic.Data.GridFormat()

                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26227505", //RC 26227505 : Název
                    width: 200,
                })
                .addTextColumn({
                    name: "typ",
                    caption: "jres:26227506", //RC 26227506 : Typ
                    width: 120,
                    cellTemplate: function (row) {
                        var l_text = "";

                        switch(row.typ) {
                            case 0: l_text = "jres:26227507"; break; //RC 26227507 : Vlastnost
                            case 1: l_text = "jres:26227509"; break; //RC 26227509 : DB
                            default: l_text = "jres:26227508"; break; //RC 26227508 : Neznámo
                        }

                        return l_text;
                    },
                    fixedWidth: true,
                });


            this.gridSloupce = $("<div>").appendTo(this.element)
                .css("height", "calc(100% - " + this.defaultForm.height() + "px)")
                .ggrid({
                    name: "GridSloupce",
                    //    data: that.ViewTabulkaSubjektu,
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "full",  // fit (defaultne by melo byt toto), full
                    //customClass: "js-gridKartoteka",
                    navigationMode: "row", // row, cell
                    //defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                    //    name: "gridRowSelectedAct",
                    //    run: function (ev, ctx) {
                    //        var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek
                    //        var options = {
                    //            ixp: rowData.ixp_kop,
                    //            grid: that.gridKopie
                    //        };
                    //        Gordic.Ssl.MainApp.ShowDetail(that, options);
                    //    }
                    //}),
                    /*selection: function (ev, selectionInfo) {
                        if (selectionInfo.count === 1) { // u single modu vzdy 1 ale pro jistotu testuji
                            var rowData = that.gridTrasy.ggrid("getSelection");
                            that.VyberRadkuClick(rowData[0]);
                        }
                    },*/
                    multi: true,

                    //     scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                    searchColumns: ["nazev", "typ"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: gridColumnsDefinition,
                });

            this.LoadData();
        },
        LoadData: function () {
            var that = this;

            this.model.ColumnsUS = this.globalSettings.get(this.IdContentUS);

            //nacteni dat do gridu
            this.call("GetSloupceSeznamu", { model: this.model })
                .done(function (data) {
                    that.data = data;
                    var view = new Gordic.Data.View(data, { key: "nazev" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                    that.gridSloupce.ggrid("setData", view, true);           //true = prekresleni gridu

                });
        },
        Reload: function () {
            this.LoadData();
        },


    }, { pure: true });
})(jQuery);