(function ($) {
    "use strict";
    namespace("Gordic.Wfl.DHUP", {
        onContentReady: function () {
            this.defaultForm = $("<div>")
                    .appendTo(this.element)
                    .gform("setup", { layoutDescriptor: "L2M2S1" })
                        .gformsection("create")
                            .gformrow("addFieldsRow", "jres:26225312").gstringbox({ name: "poznamkaField", model: "Poznamka", rows: 4 }) //RC 26225312 : Poznámka
                            .gformrow("addFieldsRow", "").gradio({
                                name: "DruhPoznamkyRadio",
                                model: "DruhPoznamky",
                              //  itemClass: "w-12",
                             //   initialValue: this.model.SelectedDruhPoznamky,
                                radios: [
                                  { value: '0', label: "jres:26226972" }, //RC 26226972 : Soukromá
                                  { value: '1', label: "jres:26226973" }, //RC 26226973 : Spisového uzlu
                                  { value: '2', label: "jres:26225700" } //RC 26225700 : Veřejná
                                ]
                            })
                .gform("complete");

            this.findFields()
                .gfield("model", "apply", this.model)
                .gfield("model", "validators", this.validators);
        },
        OKClick: function () {
            if (!this.defaultForm.gform("isValid")) {
                return;
            }

            var _this = this;
            this.findFields().gfield("model", "collect", this.model);

           // var l_sDruhPoznamkySelectedValue = this.findFields("druhPoznamkyRadio").gfield("getValue");

            if(this.FlagHromadne) {
                this.close(this.model);
            } else {
                this.call(["PridejUzivPoznDoHistorie", { model: this.model }]).done(
                    function (data, content) {
                        _this.close(true);
                    }
                );
            }

        },
    }, { pure: true });
})(jQuery);