(function ($) {
    "use strict";
    namespace("Gordic.Ssl.VyberDenikuSpzDlg", {
     //   EditDleDeniku: null,

        onContentReady: function () {
            var that = this;


            var form = new Gordic.Forms
                .Form({
                    name: "Form", layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, M-0-12-0" })
                .addRow()// "jres:31937131" //RC 31937131 : Výběr  deníku pro spis
                .addField("gselectbox",
                    {
                        name: "denikField",
                        model: "DenikSelected = sslden",
                        list: true,
                        //data: that.model.Data,
                        data: new Gordic.Data.View(that.model.Data, { key: "sslden" }),
                        graphicInput: "always",
                        itemTemplate: function (row) {
                            var str = "";
                            str = str + (row.zkratka ? "<b>" + row.zkratka + "</b>":"");
                            str = str + (row.nazev ? (" | " + row.nazev) : "");
                            str = str + (row.poznamka ? (" | " + row.poznamka) : "");
                            return "<span>" + str + "</span>"
                        } 
                    });
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

            var value = this.findFields("denikField").gfield("getValue");
            if (value == null) {
                return;
            }

            this.retValue = { "sslden": value.sslden, "typDen": value.typ_den, "prizDenCj": value.priz_den_cj };
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