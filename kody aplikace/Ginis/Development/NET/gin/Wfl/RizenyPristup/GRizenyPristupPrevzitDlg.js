(function ($) {
    "use strict";
    namespace("Gordic.Wfl.GRizenyPristupPrevzitDlg", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26226409"; //RC 26226409 : Převzetí přístupových práv ze spisu

            var form = new Gordic.Forms
                .Form({ name: "FormRPPR", layoutDescriptor: "L1M1S1" })
                .addSection();

            this.LoadGrid();
        },
        LoadGrid: function () {
            var that = this;

            var gridColumnsDefinition = new Gordic.Data.GridFormat()
                .addTextColumn({
                    name: "typ_subjektu",
                    caption: "jres:26226361", //RC 26226361 : Typ subjektu
                    width: 120,
                })
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26226362", //RC 26226362 : Název subjektu
                    width: 120,
                })
                .addTextColumn({
                    name: "uroven_prist_txt",
                    caption: "jres:26226363", //RC 26226363 : Úroveň přístupu
                    width: 150,
                })
                .addTextColumn({
                    name: "duvod_prist_txt",
                    caption: "jres:26226364", //RC 26226364 : Důvod přidělení přístupu
                    width: 150,
                    fixedWidth: true,
                })
                .addTextColumn({
                    name: "duvod_txt",
                    caption: "jres:26226365", //RC 26226365 : Zdůvodnění přidělení práv
                    width: 150,
                    fixedWidth: true,
                })
                .addTextColumn({
                    name: "zmenu_prov_txt",
                    caption: "jres:26226361", //RC 26226361 : Typ subjektu
                    width: 120,
                    fixedWidth: true,
                });

            this.gridOpravneni = $("<div>").appendTo(this.element)
                .css("height", "100%")
                .ggrid({
                    name: "GridRPPR",
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "full",  // fit (defaultne by melo byt toto), full
                    navigationMode: "row", // row, cell
                    searchColumns: ["typ_subjektu", "nazev", "uroven_prist_txt", "duvod_prist_txt", "duvod_txt", "zmenu_prov_txt"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: gridColumnsDefinition,
                    rowsEnabled: function (dataRow) {
                        if(dataRow && dataRow.data && dataRow.data.duvod_prist > 0) {
                            return false;
                        } else {
                            return true;
                        }
                    },
                    multi: true,
                });

            this.LoadData();
        },
        LoadData: function () {
            var that = this;
            // this.findFields().gfield("model", "collect", this.model);

            //nacteni dat do gridu
            this.call("SeznamOpravneni", { Ixp: this.Ixp })
                .done(function (data) {
                    var view = new Gordic.Data.View(data, { key: "nazev" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                    that.gridOpravneni.ggrid("setData", view, true);           //true = prekresleni gridu
                });
        },
        OKClick: function () {
            var that = this;

            var selection = this.gridOpravneni.ggrid("getSelection");

            if(selection.length > 0) {
                this.close(selection); // vratim vybrane radky
            } else {
                GDlg.alert("jres:26225137"); //RC 26225137 : Není vybrán řádek.
            }
        }

    }, { pure: true });
})(jQuery);