(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ZMTR", {
        onContentReady: function () {
            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            this.defaultForm = $("<div>")
                    .appendTo(this.element)
                    .gform("setup", { layoutDescriptor: "L2M2S1" })
                        .gformsection("create")
                            .gformrow("addFieldsRow", "jres:26256067").gstringbox({ name: "duvodField", model: "Duvod" }) //RC 26256067 : Důvod
                            .gformrow("addFieldsRow", "jres:26256669").gnumberbox({ name: "prodlouzitField", model: "PocDni", returnType: "number" })//RC 26256669 : Prodloužit o (počet dnů)
                            .gformrow("addFieldsRow", "jres:26255397").gstringbox({ name: "poznamkaField", model: "Poznamka" }) //RC 26255397 : Poznámka
                            .gformrow("addFieldsRow", "jres:26256073").gstringbox({ name: "pocetProdlouzeniField", model: "PocProdlText" }) //RC 26256073 : Počet prodloužení
                            .gformrow("addFieldsRow", "jres:26256074").gstringbox({ name: "posledniPozadavekField", model: "PoslPozadavekText" }) //RC 26256074 : Poslední požadavek
                .gform("complete");

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

            this.findFields("pocetProdlouzeniField").gfield("option", { disabled: true });
            this.findFields("posledniPozadavekField").gfield("option", { disabled: true });

        },
        OKClick: function () {
            if (this.defaultForm.gform("isValid")) {
                var l_sDuvod = this.findFields("duvodField").gfield("getValue");
                var l_sPocDni = this.findFields("prodlouzitField").gfield("getValue");
                var l_sPoznamka = this.findFields("poznamkaField").gfield("getValue");

                var _this = this;
                var l_oJSONPars = { "Ixp": this.Ixp, "Duvod": l_sDuvod, "Poznamka": l_sPoznamka, "PocDni": l_sPocDni };

                this.call(["ProdluzLhutuVyrizeni", l_oJSONPars]).done(
                    function (data, content) {
                        _this.retValue = true;
                        _this.tryClose();
                    }
                );
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