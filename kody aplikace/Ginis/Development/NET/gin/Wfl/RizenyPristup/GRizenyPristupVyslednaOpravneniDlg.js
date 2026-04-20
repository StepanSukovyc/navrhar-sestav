(function ($) {
    "use strict";
    namespace("Gordic.Wfl.GRizenyPristupVyslednaOpravneniDlg", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26227171"; //RC 26227171 : Výsledná oprávnění

            this.actions.addRange({
                actVysledna: {
                    run: function (ev, ctx) {
                        that.VyslednaClick();
                    }
                },
                actVsechny: {
                    run: function (ev, ctx) {
                        that.VsechnyClick();
                    }
                },
            });

            $("<div>").appendTo(this.element)
                .gsubtasks({
                    params: [
                        { caption: "jres:26227172", action: this.actions.actVysledna }, //RC 26227172 : Výsledná
                        { caption: "jres:26226036", action: this.actions.actVsechny }, //RC 26226036 : Všechny
                    ]
                });

            var form = new Gordic.Forms
                .Form({ name: "FormRPVOPR", layoutDescriptor: "L1M1S1" })
                .addSection();

            this.LoadGrid();
        },
        LoadGrid: function () {
            var that = this;

            var gridColumnsDefinition = new Gordic.Data.GridFormat()
                .addTextColumn({
                    name: "nazev",
                    caption: "jres:26225282", //RC 26225282 : Název
                    width: 120,
                })
                .addTextColumn({
                    name: "nazev_ref",
                    caption: "jres:26225578", //RC 26225578 : Referent
                    width: 150,
                })
                .addTextColumn({
                    name: "nazev_su",
                    caption: "jres:26225514", //RC 26225514 : Spisový uzel
                    width: 150,
                })
                .addTextColumn({
                    name: "uroven_prist_txt",
                    caption: "jres:26226363", //RC 26226363 : Úroveň přístupu
                    width: 180,
                    fixedWidth: true,
                })
                .addTextColumn({
                    name: "duvod_prist_txt",
                    caption: "jres:26226364", //RC 26226364 : Důvod přidělení přístupu
                    width: 180,
                    fixedWidth: true,
                })
                .addTextColumn({
                    name: "duvod_txt",
                    caption: "jres:26226365", //RC 26226365 : Zdůvodnění přidělení práv
                    width: 180,
                    fixedWidth: true,
                });

            this.gridOpravneni = $("<div>").appendTo(this.element)
                .gautofit()
                .ggrid({
                    name: "GridRPVOPR",
                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "full",  // fit (defaultne by melo byt toto), full
                    navigationMode: "row", // row, cell
                    searchColumns: ["nazev", "nazev_ref", "nazev_su", "uroven_prist_txt", "duvod_prist_txt", "duvod_txt"], //sloupce, podle kterych se vyhledava v searchboxu
                    columns: gridColumnsDefinition,
                    multi: false,
                });

            this.LoadData(true);
        },
        LoadData: function (unikatni) {
            var that = this;
            // this.findFields().gfield("model", "collect", this.model);

            //nacteni dat do gridu
            this.call("SeznamOpravneni", { Ixp: this.Ixp, Unikatni: unikatni })
                .done(function (data) {
                    var view = new Gordic.Data.View(that.GridData, { key: "nazev" });  //key je dulezity kvuli pripadnemu vyhledavani radku
                    that.gridOpravneni.ggrid("setData", view, true);           //true = prekresleni gridu
                });
        },
        VyslednaClick: function () {

            this.LoadData(true);
        },
        VsechnyClick: function () {

            this.LoadData(false);
        },

    }, { pure: true });
})(jQuery);