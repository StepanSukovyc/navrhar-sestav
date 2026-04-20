(function ($) {
    "use strict";
    namespace("Gordic.Wfl.TIRE", {
        onContentReady: function () {
            this.defaultForm = $("<div>")
                    .appendTo(this.element)
                    .gform("setup", { layoutDescriptor: "L2M2S1" })
                        .gformsection("create", "jres:26226710") //RC 26226710 : Časové razítko
                            .gformrow("addFieldsRow", "", ["w-12"]).gcheck(({ name: 'MakeTSCheck', model: "MakeTSChecked",  label: "jres:23900035" })) //RC 23900035 : Přidat časové razítko
                .gform("complete");

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }
        },
        OKClick: function () {
            var l_bMakeTSChecked = this.findFields("MakeTSCheck").gfield("getValue");

            this.retValue = { MakeTSChecked: l_bMakeTSChecked };
            this.tryClose();
        },

        closing: function () {
            var def = $.Deferred();

            if (this.retValue) {
                def.resolve(this.retValue);
            } else {
                def.resolve();
            }

            return def.promise();
        },
    }, { pure: true });
})(jQuery);