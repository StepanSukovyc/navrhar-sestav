(function ($) {
    "use strict";

    Gordic.Previews.register("agx:agx-user", {
        canRender: function (dto) { return dto != null },
        render: function (div, dto) {
            var entireDetail = $(div);
            entireDetail.empty();
            var formElement = $("<div class='gform--view-mode'>").appendTo(entireDetail);
            var form = Gordic.Agx.WebClient.Forms.CreateAgxUserPreviewForm();
            formElement.gform("createFrom", form).findFields().gfield("model", "apply", dto);
        }
    })

})(jQuery);