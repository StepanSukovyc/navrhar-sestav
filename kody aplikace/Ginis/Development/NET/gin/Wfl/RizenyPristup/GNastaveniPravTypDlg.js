(function ($) {
    "use strict";
    namespace("Gordic.Wfl.NPRT", {
        onContentReady: function () {
            var _this = this;
            this.title = "jres:26226395"; //RC 26226395 : Přiřazení přístupových práv
            var form = new Gordic.Forms
                .Form({ name: "FormNPRT", layoutDescriptor: "L1M1S1, L-1-11-0, M-3-9-0, S-0-12-0" })
                    .addSection("jres:26225397") //RC 26225397 : Dokument
                        .addRow("jres:26225442").addField("gstringbox", ["w-12"], //RC 26225442 : PID
                            Gordic.Prefabs.String.ixs(),
                            {
                                name: "ixpField",
                                model: "Ixp",
                                disabled: true
                            })
                    .addSection("jres:26225956") //RC 26225956 : Oprávnění
                        //.addRow(Gordic.Wfl.GRPPrefabs.GRPAutoAssignSubjectRightsControl({ name: "subjectRightsCtrl", model: this.model.Pristup, value: this.model.Pristup.value }))
                        .addRow(Gordic.Wfl.GRPPrefabs.GRPSubjectRightsControl({ filterStUtajId: this.FilterStUtajId }))
                        .addPrefab(Gordic.Wfl.GRPPrefabs.GRPNastaveniOpravneniControl({ name: "nastaveniOpravneniCtrl", value: this.model.UrovenPristupu, userAccess: this.model.UserAccess }))
                        .addRow("jres:26226378").addField("gstringbox", ["w-12"], //RC 26226378 : Zdůvodnění přiřazení oprávnění
                            {
                                name: "zduvodneniField",
                                model: "Zduvodneni"
                            })
                        .addRow({ label: "jres:26226393", name: "platnostRow" }).addField("gintervalbox", ["w-12"], { //RC 26226393 : Platnost
                            name: "platnostField",
                            model: "Platnost",
                            customClass: "js-interval"
                        });

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            
            var fields = this.findFields();
            this.findForms().gform("waitForValues").done(function () { // nejspíš padalo, že nebyl inicializovanej form
                fields.gfield("model", "apply", _this.model);
                if (_this.validators) {
                    fields.gfield("model", "validators", _this.validators);
                    Gordic.Utils.Form.markRequired(_this.defaultForm);
                }
                if (_this.WflPristdatePar == 0) {
                    _this.findFormRows("platnostRow").hide();
                }

                if (_this.model.WinMode == 2) { // Show
                    _this.findFields().gfield("option", { disabled: true });
                }
            });

        },
        OKClick: function () {
            this.findFields().gfield("model", "collect", this.model);

            var l_oSelectedPristup = this.findFields("subjectRightsCtrl").gfield("getValue");
            this.model.Pristup.value = l_oSelectedPristup.value;
            this.model.Pristup.label = l_oSelectedPristup.label;

            var irpRv = Gordic.Wfl.GRPPrefabs.GetValueNastaveniOpravneniControl(this);

            this.model.UrovenPristupu = irpRv.urovenPristupu;
            this.model.UrovenPristupuTxt = irpRv.urovenPristupuTxt;

            var _this = this;
            var opt = {
                "model": this.model,
                TypDokDT: this.TypDokDT || [],
            }
            this.call(["EditOpravneniTyp", opt]).done(
                function (data, content) {
                    _this.close(data);
                }
            );
        },

    }, { pure: true });
})(jQuery);