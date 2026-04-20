(function ($) {
    "use strict";
    namespace("Gordic.Wfl.WebClient.GWflHistoriePodrobnostiSchvalovani", {
        onContentReady: function () {

            var that = this;

            that.podrobnosti();


        },

        podrobnosti: function () {

            var that = this;

            that.$gridPodrobnosti = $("<div>").appendTo(that.element)
                .appendTo(that.element)
                .height(500)
                .ggrid({
                    columnMode: "fit",
                    searchColumns: ["dat_zmena", "zmena_txt", "poznamka", "nazev_rf"],
                    columns: new Gordic.Data.GridFormat()
                        .addDateTimeColumn({ name: "dat_zmena", caption: "jres:26226966", width: 25, fixedWidth: false }) //RC 26226966 : Dne
                        .addTextColumn({ name: "zmena_txt", caption: "jres:26226486", width: 30, fixedWidth: false }) //RC 26226486 : Změna
                        .addTextColumn({ name: "poznamka", caption: "jres:26225312", width: 30, fixedWidth: false }) //RC 26225312 : Poznámka
                        .addTextColumn({ name: "nazev_rf", caption: "jres:26225279", width: 30, fixedWidth: false }) //RC 26225279 : Změnu provedl
                });

            /* překreslení gridu */
            that.loadDataPodrobnosti();

        },


        loadDataPodrobnosti: function () {
            var that = this;
            that.call("LoadPodrobnosti").then(function (data) {

                var view = new Gordic.Data.View(data);
                view.applyView({

                    /* filter pro zobrazení jen konkrétních dat v Podrobnostech */
                    filter: function (row) {
                        return row.data.zmena === 332 ||       // vložení el. obrazu
                            row.data.zmena === 333 ||       // vložení el. nové verze el. obrazu
                            row.data.zmena === 334 ||       // vložení el. přílohy
                            row.data.zmena === 339 ||       // vložení el. nové verze el. přílohy
                            row.data.zmena === 304 ||       // zneaktivnění přiřazení el. přílohy
                            row.data.zmena === 306 ||       // zaktivnění přiřazení el. přílohy
                            row.data.zmena === 336 ||       // konverze el. obrazu
                            row.data.zmena === 338 ||       // konverze el. přílohy
                            row.data.zmena === 335 ||       // znovuvložení el. přílohy
                            row.data.zmena === 331 ||       // znovuvložení el. obrazu
                            row.data.zmena === 340 ||       // podepsání obrazu
                            row.data.zmena === 342 ||       // podepsání přílohy
                            row.data.zmena === 344 ||       // podepsání obrazu s TS
                            row.data.zmena === 346 ||       // podepsání přílohy s TS
                            row.data.zmena === 350 ||       // vložení el. podpisu obrazu 
                            row.data.zmena === 352 ||       // vložení cas raz obrazu
                            row.data.zmena === 356 ||       // vložení el. podpisu přílohy
                            row.data.zmena === 358 ||       // vložení cas raz přílohy
                            row.data.zmena === 1022 ||
                            row.data.zmena === 1030 ||      // schválení
                            row.data.zmena === 1032 ||      // odschválení
                            row.data.zmena === 1400 ||      // vytvoření žádosti
                            row.data.zmena === 1410 ||      // posouzení souhlas
                            row.data.zmena === 1420 ||      // posouzení nesouhlas
                            row.data.zmena === 1430;        // zrušení
                    }

                });

                //that.parseToUtc(view, data);
                that.$gridPodrobnosti.ggrid("setData", view, true);
            })
        },

        /// překreslení gridu

        refresh: function () {

            var that = this;
            that.loadDataPodrobnosti();
        },

    }

        , { extendIntellisense: GContent });           //NOTE: Zprovozneni intellisense pro tuto tridu
})(jQuery);