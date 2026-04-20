(function ($) {
    "use strict";
    namespace("Gordic.Wfl.HSCHVEPK", {

        onContentReady: function () {
            var that = this;

            var form = new Gordic.Forms
                 .Form({ name: "FormHSCHVEPK", layoutDescriptor: "L1M1S1" })
                   .addSection();


            // vytvoření  formuláře    
       //     this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

          /*  this.findFields()
                .gfield("model", "apply", this.model)
                .gfield("model", "validators", this.validators);*/

            this.LoadGrid();
        },
        LoadGrid: function () {
            var that = this;

            var gridColumnsDefinition = new Gordic.Data.GridFormat()
                /*.addIconColumn({
                    name: "typ_sgn",
                    caption: "",
                    width: 30,
                    customClass: "center",
                    fixedWidth: true,
                    iconTemplate: function (row) {
                        var verze = row.verze;
                        var typSgn = row.typ_sgn;

                        if(verze > -1) {
                            if (typSgn > -1) {
                                return { icon: "gi-edoc gi-sign" };
                            } else {
                                return { icon: "gi-edoc" };
                            }
                        } else {
                            return null;
                        }
                    }
                })*/
                .addIconColumn({
                    name: "verze",
                    caption: "",
                    width: 30,
                    customClass: "center",
                    fixedWidth: true,
                    iconTemplate: function (row) {
                        var verze = row.verze;

                        if(verze > -1) {
                            return { icon: "gi-edoc" };
                        } else {
                            return null;
                        }
                    }
                })
                .addIconColumn({
                    name: "typ_sgn",
                    caption: "",
                    width: 30,
                    customClass: "center",
                    fixedWidth: true,
                    iconTemplate: function (row) {
                        var verze = row.verze;
                        var typSgn = row.typ_sgn;

                        if(verze > -1) {
                            if(typSgn > -1) {
                                return { icon: "gi-sign" };
                            } else {
                                return null;
                            }
                        } else {
                            return null;
                        }
                    }
                })
                .addDateColumn({
                    name: "dat_zmena",
                    caption: "jres:26225280", //RC 26225280 : Datum změny
                    width: 100,
                    fixedWidth: true,
                })
                .addTextColumn({
                    name: "zmena_txt",
                    caption: "jres:26226486", //RC 26226486 : Změna
                    width: 50,
                })
                .addTextColumn({
                    name: "poznamka",
                    caption: "jres:26225312", //RC 26225312 : Poznámka
                    width: 50,
                    cellTemplate: function (row) {
                        if (row.poznamka == "undefined") {
                            return "";
                        } else {
                            return row.poznamka;
                        }
                    },
                })
                .addTextColumn({
                    name: "nazev_rf",
                    caption: "jres:26225279", //RC 26225279 : Změnu provedl
                    width: 50,
                });

            this.gridHistorie = $("<div>").appendTo(this.element)
                .css("height", "100%")
                .ggrid({
                    name: "GridZmeny",
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit (defaultne by melo byt toto), full
                    navigationMode: "row", // row, cell
                    searchColumns: ["typ_sgn", "dat_zmena", "zmena_txt", "poznamka", "nazev_rf"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: gridColumnsDefinition,
                });

            this.LoadData();
        },
        LoadData: function () {
            var that = this;
           // this.findFields().gfield("model", "collect", this.model);

            //nacteni dat do gridu
            this.call("SeznamHistorieSchvalovani", { Ixp: this.Ixp })
                .done(function (data) {
                    var view = new Gordic.Data.View(data, { key: "zmena_txt" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                    that.gridHistorie.ggrid("setData", view, true);           //true = prekresleni gridu
                });
        },
    }, { pure: true });
})(jQuery);