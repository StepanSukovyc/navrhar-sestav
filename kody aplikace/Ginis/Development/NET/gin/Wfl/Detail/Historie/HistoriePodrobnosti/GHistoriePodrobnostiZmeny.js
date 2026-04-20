(function ($) {
    "use strict";
    namespace("Gordic.Wfl.WebClient.GHistoriePodrobnostiZmeny", {
        onContentReady: function () {

            var that = this;

            that.doubleClick();

            console.log(this.Ixp);

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
                        .addDateTimeColumn({ name: "dat_zmena", caption: "Dne", width: 25, fixedWidth: false })
                        .addTextColumn({ name: "zmena_txt", caption: "Změna", width: 30, fixedWidth: false })
                        .addTextColumn({ name: "poznamka", caption: "Poznámka", width: 30, fixedWidth: false })
                        .addTextColumn({ name: "nazev_rf", caption: "Změnu provedl", width: 30, fixedWidth: false })
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