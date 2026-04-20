(function ($) {
    "use strict";

    namespace("Gordic.Report.WebClient.GReportFavoriteDetailsControl", {
        title: "jres:69", //RC 69 : Oblíbené
        onContentReady: function (args) {
            var that = this;
            var dto = this.dto;
            //args.reportId

            $("<div>")
                .appendTo(this.element)
                .gform("setup", { layoutDescriptor: "L2M2S1, L-4-8-0, M-4-8-0, S-4-8-0" })
                .gformsection("create", "")
                    .gformrow("addFieldsRow", "jres:107").gformtext(this.formatText(dto.Nazev)) //RC 107 : Sestava
                    .gformrow("addFieldsRow", "jres:108").gformtext(this.formatText(dto.Format)) //RC 108 : Formát
                    .gformrow("addFieldsRow", "jres:207").gstringbox({ name: "Popis" }); //RC 207 : Název

            this.findFields()
                .gfield("model", "apply", dto);

            this.element.resize();
        },
        _save: function () {
            var that = this;
            this.findFields().gfield("model", "collect", this.dto);
            this.call("Save", { dto: this.dto })
                .done(function () {
                    that.close({ updated: true });
                });
        },
        formatText: function (txt) {
            /// <summary>Pomocna funkce, ktera zvyrazni text (v budoucnu odstranit, jakmile to zvladne widget gformtext).</summary>
            return "<b>" + txt + "</b>";
        }
    }, { extendIntellisense: GContent });
})(jQuery);