(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ZmenaTerminuDokumentu", {
        onContentReady: function () {
            this.title = "jres:26256828"; //RC 26256828 : Změna termínu dokumentu

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            this.defaultForm = $("<div>")
                    .appendTo(this.element)
                    .gform("setup", { layoutDescriptor: "L2M2S1" })
                        .gformsection("create")
                        .gformrow("addFieldsRow", "jres:26255478", ["w-12"]).gdatebox({ name: "TerminField", model: "Termin" }) //RC 26255478 : Termín
                        .gformrow("addFieldsRow", "jres:26256067", ["w-12"]).gstringbox({ name: "DuvodField", model: "Duvod" }) //RC 26256067 : Důvod
                .gform("complete");

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
                var l_sDuvod = this.findFields("DuvodField").gfield("getValue");

                this.retValue = { Termin: l_oTermin, Duvod: l_sDuvod };
                this.tryClose();
            }
        },

        closing: function () {
            var def = $.Deferred();
            if(this.retValue) {
                def.resolve(this.retValue);
            } else {
                def.resolve();
            }

            return def.promise();
        },
    }, { pure: true });
})(jQuery);