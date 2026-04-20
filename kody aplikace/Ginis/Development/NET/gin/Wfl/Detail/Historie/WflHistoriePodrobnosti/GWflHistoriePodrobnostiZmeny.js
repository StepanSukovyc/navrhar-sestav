(function ($) {
    "use strict";
    namespace("Gordic.Wfl.WebClient.GWflHistoriePodrobnostiZmeny", {
        onContentReady: function () {
            var that = this;
            that.doubleClick();
        },

        doubleClick: function () {

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
            that.loadDataDoubleClick();

        },


        loadDataDoubleClick: function () {
            var that = this;
            that.call("LoadDoubleClick").then(function (data) {

                var view = new Gordic.Data.View(data);

                //that.parseToUtc(view, data);
                that.$gridPodrobnosti.ggrid("setData", view, true);
            })
        },

        /// překreslení gridu

        refresh: function () {

            var that = this;
            that.loadDataDoubleClick();
        },

    }

        , { extendIntellisense: GContent });           //NOTE: Zprovozneni intellisense pro tuto tridu
})(jQuery);