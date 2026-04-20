///<reference path="../_references.js" />

$(function () {
    "use strict";

    namespace("Gordic.Ucr.WebClient.GSeznamPozadavku", {
        taskId: "showSeznamPozActJs",
        title: "jres:31100165",
        className: "Gordic.Ucr.WebClient.GSeznamPozadavkuControlService",
        prepareContent: function () {
            //console.log("Gordic.Ucr.WebClient.GSeznamPozadavku", this);
            var that = this;
            
            this.setBreadcrumbs([
                { action: new GAction({ name: "actBack", caption: this.title, run: function () { that.tryCloseAllChildContents(); } }) }
            ]);

            $("<div>")
                .appendTo(this.element)
                .gsubtasks({
                    params: [
                        { action: new GAction({ name: "actAll", caption: "jres:31100002", run: function () { that.loadData(-1); } }) },  //RC 31100002 : Všechny
                        { action: new GAction({ name: "actPers", caption: "jres:31100003", run: function () { that.loadData(10); } }) },  //RC 7 : Osobní
                        { action: new GAction({ name: "actPublic", caption: "jres:31100004", run: function () { that.loadData(0); } }) }   //RC 33 : Veřejné
                    ]
                });

            this.actions.add({
                name: "newAct",
                icon: "gi-plus",
                caption: "jres:31100210", //RC 31100210 : Nový požadavek
                run: function (ev, ctx) {
                    that.navigate('Gordic.Ucr.WebClient.GDetailPozadavkuControl', { });
                }
            });

            this.actions.add({
                name: "selAct",
                icon: "gi-detail",
                caption: "jres:31100156",  //RC 31100156 : Detail
                enabled: false,
                run: function (ev, ctx) {
                    var row = that.$grid.ggrid("activeRow");
                    if (row === null)
                        return;
                    that.navigate("Gordic.Ucr.WebClient.GDetailPozadavkuControl", { options: { ixsSes: row.ixs_ses } });
                }
            });

            this.actions.add({
                name: "delAct",
                icon: "gi-bin",
                caption: "jres:31100212", //RC 31100212 : Smazat
                run: function (ev, ctx) {
                    var row = that.$grid.ggrid("activeRow");
                    if (row === null)
                        return;

                    that.call("Delete", { ixs_ses: row.ixs_ses })
                        .then(function () { that.loadData(); });
                }
            });

            this.menuBar([
                { action: "newAct", favorite: true, captionVisible: "never" },
                { action: "selAct", favorite: true },
                { action: "delAct", favorite: true }
            ]);

            this.$grid = $.newDiv()
                .appendTo(this.element)
                .gautofit()
                .ggrid({
                    columnMode: "full",
                    data: [],
                    defaultAction: new GAction({
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            var row = ctx.cellInfo.data;
                            that.navigate("Gordic.Ucr.WebClient.GDetailPozadavkuControl", { options: { ixsSes: row.ixs_ses } });
                        }
                    }),

                    

                    //#region Definice sloupcu

                    columns: new Gordic.Data.GridFormat()
                        .addIconColumn({
                            name: "ixs_fun",
                            caption: "",
                            width: 30,
                            iconTemplate: function (row, metarow) {
                                var icon = metarow.data.ixs_fun === Gordic.Ucr.Globals.GUcrGlobals.ixs_fun ? "gi-user" : "gi-group";
                                return { icon: icon };
                            },
                            sortable: false
                        })
                        .addTextColumn({
                            name: "nazev",
                            caption: "jres:31100006", //RC 31100006 : Název požadavku
                            width: 250
                        })
                        .addTextColumn({
                            name: "id_ses_alv",
                            caption: "jres:31100007", //RC 31100007 : Sestava
                            width: 75
                        })
                        .addTextColumn({
                            name: "nazev_alv",
                            caption: "jres:31100008", //RC 31100008 : Název sestavy
                            width: 250
                        })
                        .addTextColumn({
                            name: "nazev_frm",
                            caption: "jres:31100009", //RC 31100009 : Název formátu
                            width: 150
                        })
                        .addNumberColumn({
                            name: "rok",
                            caption: "jres:31100010", //RC 31100010 : Rok
                            width: 50
                        })
                        .addTextColumn({
                            name: "mesic_comp",
                            caption: "jres:31100011", //RC 31100011 : Měsíc
                            width: 80
                        })
                        .addTextColumn({
                            name: "msk_nazev",
                            caption: "jres:31100012", //RC 31100012 : Maska
                            width: 100
                        })
                        .addTextColumn({
                            name: "ico",
                            caption: Gordic.Ucr.Globals.GZkr.Ico,
                            width: 70
                        })
                        .addTextColumn({
                            name: "ucs",
                            caption: Gordic.Ucr.Globals.GZkr.Ucs,
                            width: 70
                        })
                        .addTextColumn({
                            name: "uus",
                            caption: Gordic.Ucr.Globals.GZkr.Uus,
                            width: 70
                        })
                        .addTextColumn({
                            name: "nks",
                            caption: Gordic.Ucr.Globals.GZkr.Nks,
                            width: 70
                        })
                        .addTextColumn({
                            name: "sns_nazev",
                            caption: "jres:31100013", //RC 31100013 : Seskupení
                            width: 100
                        })
                        .addTextColumn({
                            name: "poznamka",
                            caption: "jres:31100014", //RC 31100014 : Poznámka
                            width: 200
                        })
                        .addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "jres:31100015", //RC 31100015 : Datum změny
                            width: 130
                        })

                    //#endregion
                });

            this.loadData(-1);
        },
        loadData: function (typMsk) {
            /// <param name='typMsk' type='Number'></param>
            var that = this;
            typMsk = typMsk === undefined ? this.lastTypMsk : typMsk;
            this.lastTypMsk = typMsk;

            this.call("GetData", { typMsk: typMsk })
                .done(function (r) {
                    that.actions.selAct.enabled(r.length > 0);
                    that.data = r;
                    that.$grid.ggrid("setData", new Gordic.Data.View(r, { key: "ixs_ses" }));
                    //that.$grid.ggrid("focus");
                });
        }
    }, { extendIntellisense: GContent });
});