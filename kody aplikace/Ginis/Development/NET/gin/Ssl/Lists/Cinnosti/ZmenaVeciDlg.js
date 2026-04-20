(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ZMVE", {

        onContentReady: function () {
            var _this = this;
            this.title = "jres:26256827"; //RC 26256827 : Změna věci

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            var form = new Gordic.Forms
                .Form({ name: "FormFiltry", layoutDescriptor: "L2M2S1" })
                .addPrefab(Gordic.Wfl.Prefabs.GVec(
                    _this.userSettings,
                    {
                        model: "model.Vec=value.data",
                        disabled: false,
                    }
                ))
                .addRow({ layoutDescriptor: "L-0-12-0, M-0-12-0, S-0-12-0" })
                .addField("gcheck", "w-12", { name: 'VyplneneCheck', label: "jres:26255851" }); //RC 26255851 : Změnit i pokud je věc již vyplněna

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

        },
        OKClick: function () {
            if(this.defaultForm.gform("isValid")) {
                this.findFields().gfield("model", "collect", this.model);

                //var l_sVec = this.findFields("vecField").gfield("getValue");
                //var l_bVyplneneChecked = this.findFields("VyplneneCheck").gfield("getValue");

                this.retValue = { Vec: this.model.Vec, VyplneneChecked: this.model.VyplneneCheck };
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