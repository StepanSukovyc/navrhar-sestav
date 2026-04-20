(function ($) {
    "use strict";
    namespace("Gordic.Ssl.SCHV", {
        onContentReady: function () {
            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            this.defaultForm = $("<div>")
                    .appendTo(this.element)
                    .gform("setup", { layoutDescriptor: "L2M2S1" })
                        .gformsection("create")
                            .gformrow("addFieldsRow", "jres:26255826", ["w-12"]).gselectbox( //RC 26255826 : Schvalovatel
                                Gordic.Gin.Fields.ginsfunSSU(
                                {
                                    name: "schvalovatelField",
                                    enabled:false,
                                    model: "IxsFunSchvalovatel = ixs_fun",
                                    serverFilters: {
                                        aktivita: [100],
                                    }
                                }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO))
                        .gformrow("addFieldsRow", "jres:31937221").gstringbox( //RC 31937221 : Důvod
                            
                                {
                                    name: "duvod",
                                    model: "model.Duvod=value",
                                    rows:3
                                }
                            )
                .gform("complete");

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }
        },
        OKClick: function () {
            if (!this.defaultForm.gform("isValid")) {
                return;
            }

            var _this = this;
            this.findFields().gfield("model", "collect", this.model);

            this.call(["Schvalit", { model: this.model }]).done(
                function (data, content) {
                    if (_this.HromadnyMod) {
                        _this.retValue = data; 
                    } else {
                        _this.retValue = true;
                       
                    }
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