(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ZTER", {
        onContentReady: function () {
            this.title = this.winTitle ? this.winTitle : "jres:26256826"; //RC 26256826 : Změna termínu

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            this.defaultForm = $("<div>")
                    .appendTo(this.element)
                    .gform("setup", { layoutDescriptor: "L2M2S1" })
                        .gformsection("create")
                            .gformrow("addFieldsRow", this.model.LabelText, ["w-12"]).gdatebox({ name: "TerminField", model: "Termin" })
                .gform("complete");

            if(this.DateEditDisabled) {
                this.findFields("TerminField").gfield("option", "disabled", true);
            }

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }
        },
        OKClick: function () {
            if(this.defaultForm.gform("isValid")) {
                var l_oTermin = this.findFields("TerminField").gfield("getValue");

                this.retValue = { TerminField: l_oTermin };
                this.tryClose();
            }
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