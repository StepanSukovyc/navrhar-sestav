(function ($) {
    "use strict";
    namespace("Gordic.Ada.WebClient.GSeznamZapisu", {
        title: "Seznam zápisů akce", //aby se dalo přistoupit z breadcrumbs, je nastaveno zde místo v C#

        onContentReady: function () {
            
            var that = this;
            var $tab = $(this.contentDiv);
            var datazapisy = this.modelzapisy;

            //nastavení breadcrumbs
            this.setBreadcrumbs([
                {
                    caption: that.title,
                    action: new GAction({ name: "actBack", run: function () { that.tryCloseAllChildContents(); } }), // zavření všech oken otevřených z tohoto contentu
                }
            ]);

            console.log("GAkceZapisy", this.modelzapisy);

            var globals = Gordic.Ada.Globals.GAdaGlobals;
            console.log("Globalni promenne", globals);

            $tab.empty();

            var cnt = this;

            //nastavení akcí
            cnt.actions.addRange({
                actNewZapis: {
                    caption: "Nový", icon: "gi-plus",
                    run: function () {
                        cnt.call("NovyZapis")
                            .then(function (data) {
                                console.log("NovyZapis", data);
                                that.gridLike = false;
                                that.zobraz_radek(data);
                            });
                    }
                },
                actEditZapis: {
                    caption: "Editace", icon: "gi-pencil",
                    run: function () {
                        var row = cnt.cellInfo.data;    //data, ze kterych byl vytvoren radek
                        console.log("Editace zapisu", row);
                        that.gridLike = false;
                        that.zobraz_radek(row);
                    }
                },
                actKopieZapis: {
                    caption: "Kopie", icon: "gi-pencil",
                    run: function () {
                        var aktradek = cnt.find(".js-SeznamZapisu").ggrid("getSelection");
                        if (aktradek.length === 1) {                                                            // pokud existuje vybraný záznam
                            var row = aktradek[0];
                            row.radek = -1
                            console.log("Kopie zapisu", row);
                            that.gridLike = false;
                            that.zobraz_radek(row);
                        }
                    }
                }
            });

            //nastavení menuBaru
            cnt.menuBar(this.actions.createBar(["actNewZapis*", "actEditZapis*", "actKopieZapis*"]));

            var mainForm = $("<div>").appendTo(this.element).gform("setup", { layoutDescriptor: "L1M1S1 LMS-0-12-0" }).gformsection("create");

            var $mainTable = $("<div class='js-SeznamZapisu'>")
                .css("height", "100%")
                .appendTo(mainForm)
                .ggrid({
                    columnMode: "fit",

                    defaultAction: new GAction({
                        name: "gridRowSelectedAct",
                        run: function (ev, ctx) {
                            var row = ctx.cellInfo.data;    //data, ze kterych byl vytvoren radek
                            console.log("gridRowSelectedAct", row);
                            that.gridLike = false;
                            that.zobraz_radek(row);
                        }
                    }),

                    searchColumns: ["rok"],
                    columns: new Gordic.Data.GridFormat()
                                 .addNumberColumn({               //sloupce pridane pred cfu
                                     name: "rok",
                                     caption: "Rok",
                                     width: 50
                                 })
                                 .addNumberColumn({               //sloupce pridane pred cfu
                                     name: "mesic",
                                     caption: "Měsíc",
                                     width: 50
                                 })
                                 .addNumberColumn({               //sloupce pridane pred cfu
                                     name: "den",
                                     caption: "Den",
                                     width: 50
                                 })
                                 .addNumberColumn({               //sloupce pridane pred cfu
                                     name: "drd",
                                     caption: "H",
                                     width: 50
                                 })
                        .addSortedEkoCfuSet(this)       //LK20170214_1, standardni pouziti cfu (eko sloupcu), this = instance gcontentu
                        .addCurrencyColumn({            //sloupce pridane za cfu
                                    name: "c0",
                                    caption: "MD"
                                })
                        .addCurrencyColumn({            //sloupce pridane za cfu
                            name: "c1",
                            caption: "Dal"
                        })
                });
            
            var view = new Gordic.Data.View(datazapisy);
            $mainTable.ggrid("setData", view, true);

        },

        zobraz_radek: function (akt_modelradek)
        {
            var cnt = this;

            var detailzapiswindow = cnt.navigate(
                "Gordic.Ada.WebClient.GDatovaVetaCnt",
                {
                    ID: "porizovacDlg",
                    model: akt_modelradek,
                    hideColumns: "ico,ucs",
                    datVetaParams:
                    {
                        ico: akt_modelradek.ico,
                        nks: akt_modelradek.nks,
                        ucs: akt_modelradek.ucs,
                        rok: akt_modelradek.rok,
                        drd: akt_modelradek.drd,
                        hasMDDal: true
                    }
                });

            var windowContent = $.content(detailzapiswindow);
            //if (akt_modelradek.radek <= 0 ) {
                windowContent.close(function () {
                    console.log("aktualizace seznamu zapisu");
                    cnt.call("Seznam_Zapisu", {})
                    .done(function (data) {
                        console.log("Nove zapisy", data);
                        var view = new Gordic.Data.View(data);
                        cnt.find(".js-SeznamZapisu").ggrid("setData", view, true);

                    })
                    .fail(function () {
                        cnt.dialogs.alert("Chyba načítání dat");
                    });
                });
            //}

            //GDlg.showModalWindow("Gordic.Ada.WebClient.GDatovaVetaCnt",
            //    {
            //        ID: "porizovacDlg",
            //        model: akt_modelradek,
            //        hideColumns: "ico,ucs",
            //        datVetaParams:
            //        {
            //            ico: akt_modelradek.ico,
            //            nks: akt_modelradek.nks,
            //            ucs: akt_modelradek.ucs,
            //            rok: akt_modelradek.rok,
            //            drd: akt_modelradek.drd,
            //            hasMDDal: true
            //        }
            //    });

        }

    }, { extendIntellisense: GContent })

})(jQuery);
