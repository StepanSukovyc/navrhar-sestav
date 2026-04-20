(function ($) {
    namespace("Gordic.Report.WebClient.GStoredReports", {
        //uid: "GStoredReports#", //NOTE: uid nefunguje u serverovych contentu. Pokud by se to pouzivalo z vice mist, pak by asi bylo lepsi udelat prefab pro otevreni.
        onContentReady: function () {

            var that = this;
            var loadAct = this.actions.add({
                name: "loadAct",
                caption: "Nacist",
                run: function () {
                    
                    that.call("GetStoredReports", {
                        tema: that.Tema || "",
                        ixsAlv: that.IxsAlv || "",
                        ixp: that.Ixp || "",
                        rok: that.Rok || null,
                        ico: that.Ico || "",
                        ixsFun: that.IxsFun || "",
                        wrid: that.Wrid || ""
                    })
                        .done(function (data) {
                            //console.log(data);
                            var view = new Gordic.Data.View(data.Reports, { key: "ixp" });
                            $grid.ggrid("setData", view)
                                 .ggrid("sort", "!dat_zmena");
                            that.showFlash({ label: that._formatFilterFlash(data.Filters) });
                            that.actions.downloadAct.enabled(data.Reports.length > 0);
                        });
                }
            });

            this.commandBar([{
                action: new GAction({
                    name: "closeAct",
                    caption: "jres:121", //RC 121 : Zavřít
                    run: function () {
                        that.close();
                    }
                })
            }]);

            var downloadAct = this.actions.add({
                name: "downloadAct",
                enabled: false,
                run: function (ev, ctx) {
                    var ixb;

                    if (ctx && ctx.cellInfo) ixb = ctx.cellInfo.data.ixb;
                    else ixb = $grid.ggrid("getSelection")[0].ixb;
                    if (!ixb) return;

                    //console.log("selectAct", ev, ctx.cellInfo.data);
                    new GDocument(that).downloadDocument({
                        DownloaderType: "Gordic.Report.WebClient.Reporter.SinglePage.Common.GStoredReportsDownloader",
                        Context: { "encodeToBase64": true },
                        AutoDownload: true, //autodownload pro ne-pluginove stazeni
                        CustomData: { ixb: ixb }
                    });
                }
            });

            this.menuBar([{
                icon: "gi-detail",
                caption: "jres:31105116", //RC 31105116 : Detail
                action: downloadAct,
                favorite: true
            }]);

            var $grid = $("<div>")
                .css("height", "100%")
                .appendTo(this.element)
                .ggrid({
                    columnMode: "full",
                    defaultAction: downloadAct,
                    defaultProfile: { columnList: "ixp,tema_nazev,alv_nazev,frm_nazev,dat_zmena,nazev_rf,obsah_text,poznamka,ico,ucs,rok,mesic" },
                    //sort: "dat_zmena",
                    searchColumns: ["alv_nazev", "obsah_text", "poznamka"],
                    //#region ColDef
                    columns: new Gordic.Data.GridFormat()
                        .addTextColumn({
                            name: "tema_nazev",
                            caption: "jres:106", //RC 106 : Název tématu
                            width: 320,
                        })
                        .addTextColumn({
                            name: "alv_nazev",
                            caption: "jres:31105112", //RC 31105112 : Název sestavy
                            width: 200
                        })
                        .addTextColumn({
                            name: "frm_nazev",
                            caption: "jres:108" //RC 108 : Formát
                        })
                        .addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "jres:109" //RC 109 : Datum generování
                        })
                        .addTextColumn({
                            name: "nazev_rf",
                            caption: "jres:110", //RC 110 : Autor generování
                            width: 200,
                        })
                        .addIconColumn({
                            name: "ixp",
                            caption: "jres:31105118", //RC 31105118 : Dokument
                            width: 100,
                            iconTemplate: function (d) {
                                var ixp = d.ixp;
                                var hasIxp = ixp && ixp !== "0000P000000N";
                                return {
                                    icon: (hasIxp ? "gi-eattachment" : "fa-fw"),
                                    text: (hasIxp ? "jres:31105119".format(ixp) : "jres:31105120") //RC 31105119 : Má navázaný dokument {0}. //RC 31105120 : Bez vazby na dokument.
                                }
                            }
                        })
                        .addTextColumn({
                            name: "obsah_text",
                            caption: "jres:112", //RC 112 : Obsah
                            width: 300,
                        })
                        .addTextColumn({
                            name: "poznamka",
                            caption: "jres:113", //RC 113 : Poznámka
                            width: 200,
                        })
                        .addTextColumn({
                            name: "tema",
                            caption: "jres:31105113", //RC 31105113 : Téma
                            width: 100
                        })
                        .addTextColumn({
                            name: "ico",
                            caption: Gordic.Consts.DbShortcuts.ico,
                            width: 100
                        })
                        .addTextColumn({
                            name: "ucs",
                            caption: Gordic.Consts.DbShortcuts.ucs,
                            width: 100
                        })
                        .addNumberColumn({
                            name: "rok",
                            caption: "jres:31105114", //RC 31105114 : Rok
                            width: 50
                        })
                        .addNumberColumn({
                            name: "mesic",
                            caption: "jres:31105115", //RC 31105115 : Měsíc
                            width: 50,
                            cellTemplate: function (d) {
                                return d.mesic ? d.mesic : undefined;
                            }
                        })
                        .addIconColumn({
                            name: "soubor_pri",
                            caption: "jres:31105117", //RC 31105117 : Typ výstupu
                            iconTemplate: function (d) {
                                var ext = d.soubor_pri || "";
                                return { icon: Gordic.Report.WebClient.GReportTreeControlTS.getIconByFileExtension(ext), text: ext };
                            }
                        })
                        
                    //#endregion
                });

            loadAct.run();
        },
        _formatFilterFlash: function (filters) {
            /// <summary>Formatuje do gflashpanelu</summary>
            /// <param name="filters" type="Array"></param>
            if (!filters)
                return "";

            var s = "jres:47 "; //RC 47 : Filtrováno dle:

            for (var i = 0; i < filters.length; i++) {
                var item = filters[i];
                var value = item.Value;
                var hasComma = value.indexOf(',') != -1;
                s += item.Name + " " + ( hasComma ? ( "(" + value + ")") : value );
                if (i < filters.length - 1)
                    s += ", ";
            }

            return s;
        }

    }, { extendIntellisense: GContent });
})(jQuery);
