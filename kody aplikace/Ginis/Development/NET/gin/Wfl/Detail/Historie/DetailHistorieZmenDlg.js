(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DHZM", {
        onContentReady: function () {
            this.defaultForm = $("<div>")
                    .appendTo(this.element)
                    .gform("setup", { layoutDescriptor: "L2M2S1" })
                        .gformsection("create")
                            .gformrow("addFieldsRow", "jres:26226486").gstringbox({ name: "zmenaField", model: "Zmena" }) //RC 26226486 : Změna
                            .gformrow("addFieldsRow", "jres:26225312").gstringbox({ name: "poznamkaField", model: "Poznamka" }) //RC 26225312 : Poznámka
                .gform("complete");

            this.findFields()
                .gfield("model", "apply", this.model)
                .gfield("model", "validators", this.validators);
        },
        OKClick: function () {
            if(!this.defaultForm.gform("isValid")) {
                return;
            }

            var _this = this;
            this.findFields(/*"zmenaField, poznamkaField"*/).gfield("model", "collect", this.model);

            this.call(["PridejZmenuDoHistorie", { model: this.model }]).done(
                function (data, content) {
                    _this.close(true);
                }
            );
        },
    }, { pure: true });
})(jQuery);