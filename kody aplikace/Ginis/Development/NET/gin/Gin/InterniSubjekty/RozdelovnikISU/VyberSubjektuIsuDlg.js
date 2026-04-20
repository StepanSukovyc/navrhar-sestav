(function ($) {
    "use strict";
    namespace("Gordic.Gin.VSISU", {
        onContentReady: function () {
            var _this = this;

            var form = new Gordic.Forms
                 .Form({ name: "FormVSISU", layoutDescriptor: "L2M2S2" })
                   .addSection()
                        .addRow()
                        .addField("gradio", "", {
                            name: "typSubjRB",
                            model: "RBValue",
                            radios: [
                                { value: '0', label: "jres:26275122", tooltip: "jres:26275122" }, //RC 26275122 : Org. jednotka:
                                { value: '1', label: "jres:26275121", tooltip: "jres:26275121" }, //RC 26275121 : Spis. uzel:
                                { value: '2', label: "jres:26275120", tooltip: "jres:26275120" }, //RC 26275120 : Funkce
                            ],
                            change: function (ev, data) {
                                _this.PrepnoutVyberSubjektu();
                            }
                            })
                       .addRow({ name: "typSubjRow" })
                       .addRow("jres:26275067") //RC 26275067 : Poznámka
                           .addField("gstringbox", "w-12", { name: "poznamkaField", model: "Poznamka" });

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            this.findFields()
                .gfield("model", "apply", this.model)
                .gfield("model", "validators", this.validators);

            this.PrepnoutVyberSubjektu();
        },
        OKClick: function () {
            if(!this.defaultForm.gform("isValid")) {
                return;
            }

            var _this = this;
            this.findFields().gfield("model", "collect", this.model);

            var l_sIxsSubjektu = "";
            var l_sFlagSubjektu = "";

            if(this.model.RBValue == "0" && this.model.IxsOrj) {
                l_sIxsSubjektu = this.model.IxsOrj;
                l_sFlagSubjektu = "O";
            } else if(this.model.RBValue == "1" && this.model.IxsSu) {
                l_sIxsSubjektu = this.model.IxsSu;
                l_sFlagSubjektu = "U";
            } else if(this.model.RBValue == "2" && this.model.IxsFun) {
                l_sIxsSubjektu = this.model.IxsFun;
                l_sFlagSubjektu = "F";
            }

            if(l_sIxsSubjektu != "") {
                var l_sPoznamka = "";

                if(this.model.Poznamka) {
                    l_sPoznamka = this.model.Poznamka;
                }

                this.close({ IxsSubjektu: l_sIxsSubjektu, FlagSubjektu: l_sFlagSubjektu, Poznamka: l_sPoznamka });
            } else {
                GDlg.alert("jres:26275126"); //RC 26275126 : Vyberte subjekt.
            }
        },
        PrepnoutVyberSubjektu: function () {
            this.findFields().gfield("model", "collect", this.model);

            if(this.model.RBValue == "0") {
                this.findFormRows("typSubjRow").gformrow("setLabel", "jres:26275122").gformrow("clearFields").gformrow("createField").gselectbox( //RC 26275122 : Org. jednotka
                    Gordic.Prefabs.Select.ginsorj(),
                    {
                        name: "subjektField",
                        model: "IxsOrj = ixs_orj",
                        multi:true,
                    });
            } else if(this.model.RBValue == "1") {
                this.findFormRows("typSubjRow").gformrow("setLabel", "jres:26275121").gformrow("clearFields").gformrow("createField").gselectbox( //RC 26275121 : Spis. uzel

                    Gordic.Gin.Fields.ginspodSSU(
                        {
                            name: "subjektField",
                            model: "IxsSu = ixs_su",
                            multi: true,
                            serverFilters: {
                                aktivita: [100],
                            },
                        }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO)
                    );
            } else if(this.model.RBValue == "2") {
                this.findFormRows("typSubjRow").gformrow("setLabel", "jres:26275120").gformrow("clearFields").gformrow("createField").gselectbox( //RC 26275120 : Funkce
                    Gordic.Gin.Fields.ginsfunSSU(
                    {
                        name: "subjektField",
                        model: "IxsFun = ixs_fun",
                        multi: true
                    }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO));
            }

            this.findFields()
                .gfield("model", "apply", this.model)
                .gfield("model", "validators", this.validators);

        },
    }, { pure: true });
})(jQuery);