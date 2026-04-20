(function ($) {
    "use strict";
    namespace("Gordic.Uct.WebClient.GUctDotazPriStornu", {
        onContentReady: function () {
            var that = this;
            var _this = this;            
            //this.newOps({ title: "Důvod " });
            var form = new Gordic.Forms
                .Form({ name: "FormDotazStorno", layoutDescriptor: "L2M2S1" })
                    .addSection()                        
                        .addRow({ label: "jres:30250082", name: "duvod" }).addField("gstringbox", ["w-200"], //RC 30250082 : Důvod
                            {
                                name: "idduvod",
                                model: "DuvodStorna"
                            });
                        

                // vytvoření  formuláře    
                this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

                this.findFields()
                    .gfield("model", "apply", this.model)
                    .gfield("model", "validators", this.validators);

            },
            OKClick: function () {
                if(!this.defaultForm.gform("isValid")) {
                    return;
                }

                this.findFields().gfield("model", "collect", this.model);

                var _this = this;
                var txtDuvod = _this.findFields("idduvod").gfield("getValue");
                _this.ReturnData(txtDuvod);
                /*
                this.call(["OKClick", { model: this.model }]).done(
                    function (data, content) {
                        var l_sRetVal = data;

                        if(l_sRetVal != "") {
                            _this.Evaluate(l_sRetVal);
                        }
                    }
                );*/
            },
            ReturnData: function (duvod) {
                var _this = this;
                if ($.trim(duvod) == "")
                    GDlg.alert("Důvod musí být zadán!")
                    else
                this.close({ "Duvod": duvod});
            }


    }, { extendIntellisense: GContent })
})(jQuery);
