(function ($) {
    "use strict";
    namespace("Gordic.Wfl.RPHIDET", {

        onContentReady: function () {
            var _this = this;
            this.title = "jres:26226395"; //RC 26226395 : Přiřazení přístupových práv

            var form = new Gordic.Forms
                 .Form({ name: "FormFiltry", layoutDescriptor: "L1M1S1, L-1-11-0, M-2-9-0, S-3-9-0" })
                   .addSection("jres:26227103") //RC 26227103 : Modul
                        .addRow("jres:26226894") //RC 26226894 : Fáze
                           .addText(this.model.Faze)
                        .addRow("jres:26225172") //RC 26225172 : Verze
                            .addText(this.model.Verze)
                        .addRow("jres:26226895") //RC 26226895 : Subverze
                            .addText(this.model.Subverze)
                        .addRow("jres:26226896") //RC 26226896 : Revize
                            .addText(this.model.Revize)
                   .addSection("jres:26227104") //RC 26227104 : Přihlášení
                        .addRow("jres:26226897") //RC 26226897 : Datum přihlášení
                            .addText(this.model.DatLogin)
                        .addRow("jres:26226898") //RC 26226898 : Datum odhlášení
                            .addText(this.model.DatLogout)
                        .addRow("jres:26226899") //RC 26226899 : IP adresa
                            .addText(this.model.IpAdr)
                   .addSection("jres:26227105") //RC 26227105 : Uživatel
                        .addRow("jres:26225578") //RC 26225578 : Referent
                            .addText(this.model.Referent)
                        .addRow("jres:26226900") //RC 26226900 : Funkce
                            .addText(this.model.Funkce)
                        .addRow("jres:26226505") //RC 26226505 : Režim
                            .addText(this.model.Rezim)
                   .addSection("jres:26227106") //RC 26227106 : Počítač
                        .addRow("jres:26226901") //RC 26226901 : Win login
                            .addText(this.model.LoginWin)
                        .addRow("jres:26226902") //RC 26226902 : Jméno počítače
                            .addText(this.model.CompName)

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

        }
    }, { pure: true });
})(jQuery);