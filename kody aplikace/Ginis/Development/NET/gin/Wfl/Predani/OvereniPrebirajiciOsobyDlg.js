(function ($) {
    "use strict";
    namespace("Gordic.Wfl.OPOS", {
        onContentReady: function () {
            this.defaultForm = $("<div>")
                    .appendTo(this.element)
                    .gform("setup", { layoutDescriptor: "L2M2S1" })
                        .gformsection("create")
                            .gformrow("addFieldsRow", this.model.JmenoLabel).gstringbox({
                                name: "jmenoField",
                                model: "JmenoText"
                            })
                            .gformrow("addFieldsRow", this.model.HesloLabel).gstringbox({
                                name: "hesloField",
                                flag: 'required',
                                validators: [new Gordic.Validators.Required()],
                                customClass: "js-field-hesloOPOS",
                                inputType: "password"
                            })
                .gform("complete");

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

            if(!this.model.HesloVisible) {
                $(".js-field-hesloOPOS").gfield("disable");
                $(".js-field-hesloOPOS").gformrow().hide();
            }
        },
        OKClick: function () {
            if(this.defaultForm.gform("isValid")) {
                var l_sJmeno = this.findFields("jmenoField").gfield("getValue");
                var _this = this;
               
                if(this.ZpusobAut == "heslo") { // HESLEM
                    var l_sHeslo = this.findFields("hesloField").gfield("getValue");

                    if(l_sHeslo != null) {
                        var l_oJSONPars = { "IxsFun": this.IxsFun, "Jmeno": l_sJmeno, "Heslo": l_sHeslo };

                        this.call(["TestPlatnyLoginZastupuProFunkci", l_oJSONPars]).done(
                            function (data, content) {
                                _this.close(data);
                            }
                        );
                    } else { // uzivatel nevyplnil heslo
                        GDlg.alert(this.ErrMessage);
                    }
                } else { // PIDEM
                    if(l_sJmeno != null) {
                        var l_oJSONPars = { "IxsFun": this.IxsFun, "Jmeno": l_sJmeno };

                        this.call(["TestPlatnyZastupFunkce", l_oJSONPars]).done(
                            function (data, content) {
                                _this.close(data);
                            }
                        );
                    } else { // uzivatel nevyplnil heslo
                        GDlg.alert(this.ErrMessage);
                    }
                }
            }
        },
    }, { pure: true });
})(jQuery);