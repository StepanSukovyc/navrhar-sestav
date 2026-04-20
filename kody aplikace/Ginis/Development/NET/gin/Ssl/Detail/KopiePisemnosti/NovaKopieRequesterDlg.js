(function ($) {
    "use strict";
    namespace("Gordic.Ssl.NKOR", {
        onContentReady: function () {
            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            this.defaultForm = $("<div>")
                    .appendTo(this.element)
                    .gform("setup", { layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                        .gformsection("create", "jres:26256561") //RC 26256561 : El. obraz
                            .gformrow("addFieldsRow", "", ["w-12"]).gcheck(({ name: 'elObrazCheck', label: "jres:26256030", model: "ElObrazChecked" })) //RC 26256030 : Kopírovat el. obraz
                            .gformrow("addFieldsRow", "", ["w-1","w-11"]).next().gcheck(({ name: 'verzePredKonvElObrazCheck', label: "jres:26256484", model: "VerzePredKonvElObrazChecked", customClass: "js-field-margin40" })) //RC 26256484 : Kopírovat i verzi před konverzí do PDF
                        .gformsection("create", "jres:26256674") //RC 26256674 : El. přílohy
                            .gformrow("addFieldsRow", "", ["w-12"]).gcheck(({ name: 'elPrilohyCheck', label: "jres:26256482", model: "ElPrilohyChecked" })) //RC 26256482 : Kopírovat el. přílohy
                            .gformrow("addFieldsRow", "", ["w-1", "w-11"]).next().gcheck(({ name: 'verzePredKonvElPrilohyCheck', label: "jres:26256483", model: "VerzePredKonvElPrilohyChecked", customClass: "js-field-margin40" })) //RC 26256483 : Kopírovat i verze před konverzí do PDF
                        .gformsection("create")
                            .gformrow("addFieldsRow", "", ["w-12"]).gcheck(({ name: 'cjCheck', label: "jres:26256485", model: "CjChecked", customClass: "js-field-cjCheck" })) //RC 26256485 : Vytvořit ČJ
                            .gformrow("addFieldsRow", "", ["w-12"]).gcheck(({ name: 'vlastnostiCheck', label: "jres:26256486", model: "VlastnostiChecked", customClass: "js-field-vlastnostiCheck" })) //RC 26256486 : Kopírovat vlastnosti
                .gform("complete");

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }
            if (!this.model.ElObrazEnabled) {
                this.findFields("elObrazCheck").gfield("option", { disabled: true });
            }
            if(!this.model.VerzePredKonvElObrazEnabled) {
                this.findFields("verzePredKonvElObrazCheck").gfield("option", { disabled: true });
            }
            if(!this.model.ElPrilohyEnabled) {
                this.findFields("elPrilohyCheck").gfield("option", { disabled: true });
                this.findFields("verzePredKonvElPrilohyCheck").gfield("option", { disabled: true });
            }
            if(!this.model.CjEnabled) {
                this.findFields("cjCheck").gfield("option", { disabled: true });
            }
            if(!this.model.CjVisible) {
                $(".js-field-cjCheck").gformrow().hide();
            }
            if(!this.model.VlastnostiVisible) {
                $(".js-field-vlastnostiCheck").gformrow().hide();
            }

            //$(".js-field-margin40").gformrow().css( { marginLeft : "40px" } );
        },
        OKClick: function () {
            if(!this.defaultForm.gform("isValid")) {
                 return;
            }

            this.findFields().gfield("model", "collect", this.model);

            var l_nCopyEleVal = 0;
            var l_nCopyPriVal = 0;
            var l_bMakeCjVal = false;
            var l_bCopyVlaVal = false;

            if(this.model.ElObrazChecked /* && !nkor.ElObrazCheckbox.disabled*/) {
                l_nCopyEleVal = 1;
            }

            if(this.model.VerzePredKonvElObrazChecked) {
                l_nCopyEleVal = 2;
            }

            if(this.model.ElPrilohyChecked /* && !nkor.ElPrilohyCheckbox.disabled*/) {
                l_nCopyPriVal = 1;
            }

            if(this.model.VerzePredKonvElPrilohyChecked) {
                l_nCopyPriVal = 2;
            }

            if(this.model.CjChecked) {
                l_bMakeCjVal = true;
            }

            if(this.model.VlastnostiChecked) {
                l_bCopyVlaVal = true;
            }

            this.retValue = { "IxpNove": this.IxpNove, "CopyEleVal": l_nCopyEleVal, "CopyPriVal": l_nCopyPriVal, "MakeCjVal": l_bMakeCjVal, "CopyVlaVal": l_bCopyVlaVal };
            this.tryClose();
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