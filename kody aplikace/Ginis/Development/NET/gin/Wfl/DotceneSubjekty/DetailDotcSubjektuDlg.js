(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DDSU", {
        //   EditDleDeniku: null,

        onContentReady: function () {
            var that = this;
            var tittle = "";
            if (this.IxsEsu) {
                tittle = "jres:31926088" + " " + this.IxsEsu;
            } else {
                tittle = "jres:31926655" //RC 31926655 : Vytvoření nové vazby ESU
            }
            this.title = tittle;

            var form = new Gordic.Forms
                .Form({ name: "FormDDSU", layoutDescriptor: "L1M1S1" })
                .addSection()
                .addRow("jres:26225309") //RC 26225309 : Externí subjekt

                //.addField("gstringbox", "w-12", { name: "esuField", model: "ExtEsuText", disabled: true })
                //.addRow("jres:26225508") //RC 26225508 : Zástupná osoba
                //.addField("gstringbox", "w-12", { name: "zoField", model: "CommentText", disabled: true })

                .addField("gselectbox", Gordic.Esu.Prefabs.vyberEsu({
                    typ: 2,// 2 a 3 puvodně 2 
                    Logovani: that.Logovani,
                    //FieldsToFilterpanel: [Gordic.Esu.Globals.Enums.ESUKartotekaFieldToFilter.Nazev]
                    //ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow
                    //strictEnableChangeZoInDisabled:true
                } ),
                {
                    name: "esuPolicko",
                    model: "model.IxsEsu=value.ixs_esu;model.LicZast=value.lic;model.PorZast=value.por_zast",
                    change: function (ev, changeObj) {
                    },
                    disabled: this.model.ESUReadOnly,
                    validators: [new Gordic.Validators.Required()],

                })




                .addRow("jres:26225313") //RC 26225313 : Typ vazby
                .addField("gselectbox",
                    {
                        name: "typVazbyField",
                        model: "TypVazby = typ_vazby",
                        disabled: this.model.TypVazbyReadOnly,
                        validators: [new Gordic.Validators.Required()],
                        serverFilters: this.model.FilterTypVazby ? { typ_vazby: this.model.FilterTypVazby } : undefined

                    }, Gordic.Prefabs.Select.wflctyv())
                .addRow("jres:26225311") //RC 26225311 : Důvod vazby
                .addField("gselectbox",
                    {
                        name: "duvodVazbyField",
                        model: "IxsDva = ixs_dva",
                        validators: [new Gordic.Validators.Required()],
                        disabled: this.model.DuvodVazbyReadOnly,
                        serverFilters: {
                            aktivita: [100, 300, 500, 900],
                            typ_vazby: new Gordic.Forms.Dependency("typVazbyField", "typ_vazby")
                        }
                    }, Gordic.Prefabs.Select.wflsdva())
                .addRow("jres:26225312") //RC 26225312 : Poznámka
                .addField("gstringbox", {
                    name: "poznamkaField",
                    model: "Poznamka",
                    disabled: this.model.PoznamkaReadOnly
                });

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            var fields = this.findFields();
            Gordic.Utils.Form.markRequired(fields);
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

            var that = this;
            this.findFields().gfield("model", "collect", this.model);

            var l_oJSONPars = { "ixp": this.Ixp, "ixsEsu": this.model.IxsEsu, "typVazbyOrig": this.TypVazby, "typVazbyNew": this.model.TypVazby, "licZast": this.model.LicZast, "porZast": this.model.PorZast, "duvodVazby": this.model.IxsDva, "poznamka": this.model.Poznamka };

            this.call(["OpravDotcenySubjekt", l_oJSONPars]).done(
                function (data, content) {
                    that.close(true);
                }
            );

        },
    }, { pure: true });
})(jQuery);