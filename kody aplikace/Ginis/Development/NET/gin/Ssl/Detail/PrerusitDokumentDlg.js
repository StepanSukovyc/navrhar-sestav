(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DPRD", {
        onContentReady: function () {
            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            this.defaultForm = $("<div>")
                    .appendTo(this.element)
                    .gform("setup", { layoutDescriptor: "L2M2S1" })
                        .gformsection("create")
                            .gformrow("addFieldsRow", "jres:26256049", ["w-12"]).gdatebox({ name: "prerusitDoField", model: "PrerusitDo" }) //RC 26256049 : Přerušit do:
                            .gformrow("addFieldsRow", "jres:26255760").gstringbox({ name: "duvodField", model: "Duvod" }) //RC 26255760 : Důvod přerušení
                .gform("complete");

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }
        },
        OKClick: function () {
            if(!this.defaultForm.gform("isValid")) {
                return;
            }

            this.findFields().gfield("model", "collect", this.model);

            if(this.FlagHromadne) {
                var l_oRetVal = { "Datum": this.model.PrerusitDo, "Duvod": this.model.Duvod };

                this.close(l_oRetVal);
            } else {
                var _this = this;

                this.call(["PreruseniVyrizovaniDokumentu", { model: this.model }]).done(
                    function (data, content) {
                        _this.close(true);
                    }
                );
            }
        },
    }, { pure: true });
})(jQuery);