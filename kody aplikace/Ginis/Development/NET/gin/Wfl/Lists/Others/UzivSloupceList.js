(function ($) {
    "use strict";
    namespace("Gordic.Wfl.UzivSloupceList", {
        flashPanelTimer: 5000,

        onContentReady: function () {
            var that = this;
            this.title = "jres:26227514"; //RC 26227514 : Přidání uživatelského sloupce

            this.actions.addRange({
                actOK: {
                    icon: undefined,
                    caption: "jres:26227515", //RC 26227515 : OK
                    run: function (ev, ctx) {
                        that.OKClick();
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
        OKClick: function () {
            var that = this;
            var selection = this.gridSloupce.ggrid("getSelection");

            if(selection && selection.length == 1) {

                this.retValue = { row: selection[0] };
                this.tryClose();
            } else {
                GDlg.alert("jres:26227518") //RC 26227518 : Vyberte řádek
            }

        },
        LoadGrid: function () {
            var that = this;

            var gridColumnsDefinition = new Gordic.Data.GridFormat()
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26227505", //RC 26227505 : Název
                    width: 300,
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
                    defaultAction: new GAction({     //obsluzna akce, ktera se spousti dbl clickem nad radkem
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek

                            that.retValue = { row: rowData };
                            that.tryClose();
                        }
                    }),
                    //selection: function (ev, selectionInfo) {
                    //    if (selectionInfo.count === 1) { // u single modu vzdy 1 ale pro jistotu testuji
                    //        var rowData = that.gridTrasy.ggrid("getSelection");
                    //        that.VyberRadkuClick(rowData[0]);
                    //    }
                    //},
                    //multi: true,

                    //     scrollHelperTemplate: "{nazev}",  // "{ixs_esu} - {nazev}",
                    searchColumns: ["nazev"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: gridColumnsDefinition,
                });

            this.LoadData();
        },
        LoadData: function () {
            var that = this;

            //nacteni dat do gridu
            this.call("GetSloupceSeznamu", { model: this.model })
                .done(function (data) {
                    var view = new Gordic.Data.View(data, { key: "nazev" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                    that.gridSloupce.ggrid("setData", view, true);           //true = prekresleni gridu

                });
        },
        Reload: function () {
            this.LoadData();
        },
        closing: function () {
            var def = $.Deferred();

            if (this.retValue) {
                def.resolve(this.retValue);
            } else {
                def.resolve();
            }

            return def.promise();
        },

    }, { pure: true });
})(jQuery);