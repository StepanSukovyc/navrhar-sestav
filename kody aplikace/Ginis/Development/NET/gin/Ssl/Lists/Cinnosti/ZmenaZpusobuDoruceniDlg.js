(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ZMZD", {
        onContentReady: function () {
            var that = this;
            this.title = "jres:26257183"; //RC 26257183 : Změna způsobu doručení

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            var form = new Gordic.Forms
                .Form({ name: "FormFiltry", layoutDescriptor: "L2M2S1" })
                .addSection("")
                .addRow("jres:26255413")  //RC 26255413 : Způsob doručení
                .addField("gselectbox", Gordic.Prefabs.Select.wflczpd(), {
                    name: "ZpusobDoruceniField",
                    model: "model.ZpusobDoruceni=value.zpusob_dor",
                    validators: [
                        new Gordic.Validators.Base({
                            message: "jres:26257184", //RC 26257184 : Nelze zadat hodnotu neurčeno.
                            validate: function (value) {
                                /// <summary>s the specified value.</summary>
                                /// <param name="value">The value.</param>
                                /// <returns></returns>
                                if (that.sslPodZpdorpPar === 1 && value && value.zpusob_dor === 0) {
                                    return false;
                                }
                                return true;
                            },

                        })
                    ],
                    serverFilters: that.sslPodZpdorpPar === 1 ? { zpusob_dor: "!= 0" } : undefined,
                });

            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if (this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

            //if(this.element.gpreset) {
            //    this.element.gpreset({ placeTo: PlaceEnum.command, elements: this.findFields("ZpusobDoruceniField"), userSettings: this.userSettings }/* as GPresetOptions<IGPresetDefaultRecord>*/);
            //    this.element.gpreset("apply");
            //}
        },
        OKClick: function () {
            if (this.defaultForm.gform("isValid")) {
                var l_sSelectedZpusobDoruceni = this.findFields("ZpusobDoruceniField").gfield("getValue").zpusob_dor;
               // var l_bVyplneneChecked = this.findFields("VyplneneCheck").gfield("getValue");

                this.retValue = { SelectedZpusobDoruceni: l_sSelectedZpusobDoruceni/*, VyplneneChecked: l_bVyplneneChecked */};
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