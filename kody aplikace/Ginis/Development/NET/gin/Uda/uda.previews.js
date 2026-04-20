/** Preview pro záznam na úřední desce */
(function ($) {
    "use strict";
    Gordic.Previews.register("uda:uda-zaznam", {
        canRender: function (dto) { return dto != null },
        render: function (div, dto) {
            var entireDetail = $(div);
            entireDetail.empty();
            var formElement = $("<div class='gform--view-mode'>").appendTo(entireDetail);
            if (dto.data != null && dto.data != undefined) {
                var form = Gordic.Uda.WebApp.Forms.CreateUdaItemPreviewForm(dto.settings.isUdaPor, dto.settings.udaZobrazovatCisloJednaci, dto.settings.udaZobrazitPid, dto.settings.udaZobrazitFavorites, dto.settings.udaSslTextAz, dto.settings.udaSml, dto.settings.udaZobrazitDesku);
                formElement.gform("createFrom", form).findFields().gfield("model", "apply", dto.data);
            } else {
                $("<h4>").html("jres:33000264").appendTo(formElement); //RC 33000264 : Není vybrán žádný dokument.
            }
        }
    })

    Gordic.Previews.register("uda:zverejneni-cuet", {
        canRender: function (dto) { return dto != null },
        render: function (div, dto) {
            var entireDetail = $(div);
            entireDetail.empty();
            var formElement = $("<div class='gform--view-mode'>").appendTo(entireDetail);
            if (dto.data != null && dto.data != undefined) {
                var form = Gordic.Uda.WebApp.Forms.CreateDetailZverejneniCuetForm(dto.settings);
                formElement.gform("createFrom", form).findFields().gfield("model", "apply", dto.data);
            } else {
                $("<h4>").html("jres:33000300").appendTo(formElement); //RC 33000300 : Není vybrána žádná žádost.
            }
        }
    })
})(jQuery);