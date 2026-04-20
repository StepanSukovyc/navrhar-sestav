(function ($) {
    "use strict";

    Gordic.Previews.register("smz:detailZarizeni", {
        canRender: function (dto) { return dto != null },
        render: function (div, dto) {
            debugger;
            var entireDetail = $(div);
            entireDetail.empty();
            var form = $("<div class='gform--view-mode'>").appendTo(entireDetail).gform("createFrom", Gordic.Smz.WebApp.DetailForms.FormSmzZarizeni())
            form.findFields().gfield("model", "apply", dto.data);
        }
    })
})