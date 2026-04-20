(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ZmenaUzivatelskePoznamky", {

        onContentReady: function () {
            var _this = this;
            this.title = "jres:26257196"; //RC 26257196 : Uživatelská poznámka

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            var form = new Gordic.Forms
                //.Form({ name: "FormFiltry", layoutDescriptor: "L2M2S1" })
                .Form({ name: "FormFiltry", layoutDescriptor: "L1M1S1" }) // test
                .addSection("")
                .addRow("jres:26255397") //RC 26255397 : Poznámka
                .addField("gstringbox", "w-6", { name: "poznamkaField", model: "Poznamka", rows: 5 })
                .addRow("jres:26257197") //RC 26257197 : Typ
                .addField("gradio", "w-6", {
                    name: "typPoznamky",
                    model: "TypPoznamky",
                    radios: [
                        { value: "0", label: "jres:26257198" }, //RC 26257198 : Veřejná
                        { value: "10", label: "jres:26257199" }, //RC 26257199 : Spisového uzlu
                        { value: "20", label: "jres:26257200" } //RC 26257200 : Soukromá
                    ]
                })

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
            if (this.defaultForm.gform("isValid")) {
                var l_sPoznamka = this.findFields("poznamkaField").gfield("getValue");
                var l_sTypPoznamky = this.findFields("typPoznamky").gfield("getValue");

                this.retValue = { Poznamka: l_sPoznamka, TypPoznamky: parseInt(l_sTypPoznamky, 10) };
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