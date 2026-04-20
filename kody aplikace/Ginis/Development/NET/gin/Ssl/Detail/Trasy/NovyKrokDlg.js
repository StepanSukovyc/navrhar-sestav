(function ($) {
    "use strict";
    namespace("Gordic.Ssl.TRNK", {

        onContentReady: function () {
            var _this = this;
           // this.title = "jres:26255530"; //RC 26255530 : Vytvoření kopií dokumentů s předáním/přidělením

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            var form = new Gordic.Forms
                 .Form({ name: "FormTRNK", layoutDescriptor: "L2M2S2" })
                   .addSection()
                       .addRow("jres:26255451") //RC 26255451 : Název
                           .addField("gstringbox", "w-12", { name: "nazevField", model: "Nazev" })
                       .addRow("jres:26255397") //RC 26255397 : Poznámka
                           .addField("gstringbox", "w-12", { name: "poznamkaField", model: "Poznamka" })
                       .addRow("jres:26256045") //RC 26256045 : Spisovému uzlu/funkci/osobě
                           .addField("gselectbox", "w-6",
                               Gordic.Gin.Fields.ginspodSSU(
                                {
                                    name: "suField",
                                    model: "IxsSu = ixs_su",
                                    serverFilters: {
                                        aktivita: [100],
                                    },
                                }, false))
                           .addField("gselectbox", "w-6",
                               Gordic.Gin.Fields.ginsfunSSU(
                                {
                                    name: "funField",
                                    model: "IxsFun = ixs_fun",
                                    serverFilters: {
                                        aktivita: [100],
                                        //DlePovolenychAgend: true,
                                        //VazbaNaSpisovyDenik: this.SslPripreomezPar == 1,
                                        ixs_su: new Gordic.Forms.Dependency("suField", "ixs_su")
                                    },
                                }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO, "suField"))
                       .addRow("jres:26255478") //RC 26255478 : Termín
                           .addField("gdatebox", "w-12", { name: "terminField", model: "Termin" })
                       .addRow("")
                           .addField("gcheck", "w-3", { name: "povinnyKrokCheck", label: "jres:26256285", tooltip: "jres:26256285", model: "PovKrokChecked" }) //RC 26256285 : Povinný krok
                           .addField("gcheck", "w-3", { name: "editovatelnyCheck", label: "jres:26256303", tooltip: "jres:26256303", model: "EditovatelnyChecked" }) //RC 26256303 : Editovatelný
                       .addRow()
                           .addField("gcheck", "w-3", { name: "povinnyKrokCheck", label: "jres:26256046", tooltip: "jres:26256046", model: "PovPoradiChecked" }) //RC 26256046 : Povinné pořadí
                           .addField("gnumberbox", "w-3", { name: "poradiField", model: "PoradiNum" });


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
            if(!this.defaultForm.gform("isValid")) {
                return;
            }

            var _this = this;
            this.findFields().gfield("model", "collect", this.model);

            var l_oJSONPars = { "ixp": this.Ixp, "poradi": this.PorCislo, "model": this.model };

            this.call(["EditKrokTrasy", l_oJSONPars]).done(
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