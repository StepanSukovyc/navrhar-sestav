(function ($) {
    "use strict";
    namespace("Gordic.Wfl.NPRA", {
        onContentReady: function () {
            var _this = this;
            if(this.DeleteRights) {
                this.title = "jres:31926511"; //RC 31926511 : Odebrání přístupových práv
            } else {
                this.title = "jres:26226395"; //RC 26226395 : Přiřazení přístupových práv
            }

            this.menuBar([
                {
                    action: this.actions.actPridelit,
                    favorite: true
                }
            ]);

            var duvod = "jres:26226378";//RC 26226378 : Zdůvodnění přiřazení oprávnění
            if (this.DeleteRights) {
                duvod = "jres:31926512";//RC 31926512 : Zdůvodnění odebrání oprávnění
            }

            var form = new Gordic.Forms
                .Form({ name: "FormNPRA", layoutDescriptor: "L1M1S1, L-2-9-1, M-3-9-0, S-12-12-0" })
                    .addSection("jres:26225397") //RC 26225397 : Dokument
                        .addRow("jres:26225442").addField("gstringbox", ["w-12"], //RC 26225442 : PID
                            Gordic.Prefabs.String.ixs(),
                            {
                                name: "ixpField",
                                model: "Ixp",
                                disabled: true
                            })
                    .addSection("jres:26225956") //RC 26225956 : Oprávnění
                        .addRow(Gordic.Wfl.GRPPrefabs.GRPSubjectRightsControl({ filterStUtajId: this.FilterStUtajId }))
                            .addPrefab(Gordic.Wfl.GRPPrefabs.GRPNastaveniOpravneniControl({ name: "nastaveniOpravneniCtrl", value: this.model.UrovenPristupu, userAccess: this.model.UserAccess, restrictedValue: this.model.RestrictedValue }))
                        .addRow(duvod).addField("gstringbox", ["w-12"],
                            {
                                name: "zduvodneniField",
                                model: "Zduvodneni"
                            })
                        //.addRow({ label: "jres:26226393", name: "platnostRow" }).addField("gintervalbox", ["w-12"], { //RC 26226393 : Platnost // nahrazeno za samostatne datumy
                        //    name: "platnostField",
                        //    model: "Platnost",
                        //    customClass: "js-interval"
                        //})
                        .addRow({ label: "Platnost od", name: "platnostRowOd" }).addField("gdatebox",  { //RC 26226393 : Platnost
                            name: "platnostFieldOd",
                            model: "Platnost.start=value",
                            valueType: "date"
                        })
                        .addRow({ label: "Platnost do", name: "platnostRowDo" }).addField("gdatebox", { //RC 26226393 : Platnost
                            name: "platnostFieldDo",
                            model: "Platnost.end=value",
                            valueType: "date"
                        })
                ;

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            var fields = this.findFields();
            this.findForms().gform("waitForValues").done(function () { // nejspíš padalo, že nebyl inicializovanej form
                fields.gfield("model", "apply", _this.model);
                if (_this.validators) {
                    fields.gfield("model", "validators", _this.validators);
                    Gordic.Utils.Form.markRequired(_this.defaultForm);
                }
                if (_this.WflPristdatePar == 0 || _this.ShowPlatnost === false) {
                    _this.findFormRows("platnostRowOd").hide();
                    _this.findFormRows("platnostRowDo").hide();
                }

                if (_this.model.WinMode == 2) { // Show
                    _this.findFields().gfield("option", { disabled: true });
                }
            });
        },
        OKClick: function (flagPrideleni) {
            if (!this.defaultForm.gform("isValid")) {
                return;
            }

            this.findFields().gfield("model", "collect", this.model);

            if(flagPrideleni == true && this.model.GRPSubjectRightsControl_ix != "SF") {
                this.dialogs.alert("jres:26228064"); //RC 26228064 : Přidělit oprávnění lze pouze pro funkční místo.
                return;
            }

            this.model.ModePrideleni = flagPrideleni;

            var irpRv = Gordic.Wfl.GRPPrefabs.GetValueNastaveniOpravneniControl(this);

            this.model.UrovenPristupu = irpRv.urovenPristupu;
            this.model.UrovenPristupuTxt = irpRv.urovenPristupuTxt;
            //  this.model.UrovenPristupuTxt = this.GRPNastaveniOpravneniControl({ name: "nastaveniOpravneniCtrl", akce: "getLabel" });

            var _this = this;
            var opt = {
                "model": this.model,
                AktOpravneniDT: this.AktOpravneniDT || []
            };
            this.call(["EditAktualniOpravneni", opt]).done(
                function (data, content) {
                    _this.AktOpravneniDT = data;
                    _this.close(data);
                }
            );
        },
     
    }, { pure: true });
})(jQuery);