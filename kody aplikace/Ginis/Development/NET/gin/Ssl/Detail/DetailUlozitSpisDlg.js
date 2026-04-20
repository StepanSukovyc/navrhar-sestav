(function ($) {
    "use strict";
    namespace("Gordic.Ssl.DULS", {
        onContentReady: function () {
            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            this.defaultForm = $("<div>")
                    .appendTo(this.element)
                    .gform("setup", { layoutDescriptor: "L2M2S1" })
                        .gformsection("create")
                            .gformrow("addFieldsRow", "jres:26255848", ["w-12"]).gselectbox( //RC 26255848 : Umístění
                                Gordic.Prefabs.Select.sslsumi(),
                                {
                                    name: "UmisteniField",
                                    model: "Umisteni = umisteni",
                                    //itemTemplate: function (value) {
                                    //    if (value) {
                                    //        return "" + value.umisteni_txt + (value.poznamka ? (" - " + value.poznamka) : "");
                                    //    }
                                    //}, 
                                    serverFilters: {
                                        aktivita: [100],
                                        ixs_su: this.model.FilterIxsSu
                                    }
                                })
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

            var _this = this;
            this.findFields(/*"zmenaField, poznamkaField"*/).gfield("model", "collect", this.model);

            this.call(["ZmenaUlozeniSpisu", { model: this.model }]).done(
                function (data, content) {
                    _this.retValue = true;
                    _this.tryClose();
                }
            );
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