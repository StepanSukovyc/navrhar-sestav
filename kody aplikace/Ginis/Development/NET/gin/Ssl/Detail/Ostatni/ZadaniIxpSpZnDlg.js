(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ZIXPSPZN", {
        pidUS: "",

        onContentReady: function () {
            var _this = this;

            this.commandBar([
                { action: this.actions.actOK, primary: true },
                { action: this.actions.actCancel },
            ]);

            var form = new Gordic.Forms
                 .Form({ name: "FormFiltry", layoutDescriptor: "L2M2S1" })
                   .addSection("")
                        .addRow("jres:26256672") //RC 26256672 : Ixp
                              .addField("gstringbox", "w-5",
                                  {
                                      name: "ixpField",
                                      model: "Ixp"
                                  }, Gordic.Prefabs.String.ixs())
                        .addRow(this.model.SpZnLabelText)
                            .addField("gstringbox", "w-12", { name: "spZnField", model: "SpZn" })

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

            this.pidUS = this.globalSettings.get("Global.Wfl.AppSettings.OthersSettings.PredplneniPID");
        },
        OKClick: function () {
            if(this.defaultForm.gform("isValid")) {
                this.findFields().gfield("model", "collect", this.model);

                this.close({ Ixp: this.model.Ixp, SpZn: this.model.SpZn });
            }
        },
        PredplnitPID: function (event) {
            this.findFields("ixpField").gfield("setValue", this.pidUS);
        },
    }, { pure: true });
})(jQuery);