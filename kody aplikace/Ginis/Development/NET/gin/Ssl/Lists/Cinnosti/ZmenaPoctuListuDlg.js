(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ZmenaPoctuListu", {
        isStringInput: false,

        onContentReady: function () {
            var _this = this;

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            this.isStringInput = this.TypZmenyPoctu == 0 && this.SslTextPListuPar == 1;
            var label = "";
            var winTitle = "";
            switch (this.TypZmenyPoctu) {
                case 0:
                    label = "jres:26256798"; //RC 26256798 : Počet listů
                    winTitle ="jres:26256824"; //RC 26256824 : Změna počtu listů
                    break;
                case 1:
                    label = "jres:26256797"; //RC 26256797 : Počet příloh
                    winTitle ="jres:26256825"; //RC 26256825 : Změna počtu příloh
                    break;
                case 2:
                    label = "jres:31937289"; //RC 31937289 : Počet listů příloh
                    winTitle = "jres:31937290"; //RC 31937290 : Změna počtu listů příloh
                    break;
                case 3:
                    label = "jres:32170286"; //RC 32170286 : Počet uloženo listů
                    winTitle = "jres:32170287"; //RC 32170287 : Změna počtu uloženo listů
                    break;
                default:
            }

            this.title = winTitle;

            var form = new Gordic.Forms
                .Form({ name: "FormFiltry", layoutDescriptor: "L2M2S1" })
                .addSection("")
                .addRow(label);

            if(this.isStringInput) {
                form.addField("gstringbox", "w-3", { name: "pocetStrField", model: "Pocet" });
            } else {
                form.addField("gnumberbox", "w-3", { name: "pocetNumField", model: "Pocet" });
            }
   
            // vytvoření  formuláře    
            this.defaultForm = $.newDiv().appendTo(this.element).gform("createFrom", form);

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

            //if(this.element.gpreset) {
            //    this.element.gpreset({ placeTo: PlaceEnum.command, elements: this.findFields("pocetStrField,pocetNumField"), userSettings: this.userSettings }/* as GPresetOptions<IGPresetDefaultRecord>*/);
            //    this.element.gpreset("apply");
            //}
        },
        OKClick: function () {
            if(this.defaultForm.gform("isValid")) {
                var l_sFieldName = this.isStringInput ? "pocetStrField" : "pocetNumField";

                var l_sPocet = this.findFields(l_sFieldName).gfield("getValue");

                this.retValue = { Pocet: l_sPocet, TypZmenyPoctu: this.TypZmenyPoctu };
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