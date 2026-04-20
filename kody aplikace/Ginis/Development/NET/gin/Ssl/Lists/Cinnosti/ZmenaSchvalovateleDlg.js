(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ZMSCH", {
        onContentReady: function () {
            this.title = "jres:26257144"; //RC 26257144 : Změna schvalovatele

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            this.defaultForm = $("<div>")
                    .appendTo(this.element)
                    .gform("setup", { layoutDescriptor: "L2M2S1" })
                        .gformsection("create")
                            .gformrow("addFieldsRow", "jres:26257145", ["w-12"]).gselectbox( //RC 26257145 : Schvalovatel
                                Gordic.Gin.Fields.ginsfunSSU(
                                {
                                    name: "schvalovatelField",
                                    model: "IxsFunSchvalovatel = ixs_fun",
                                    serverFilters: {
                                        aktivita: [100],
                                    }
                                }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO))
                            .gformrow("addFieldsRow", "", ["w-12"]).gcheck(({ name: 'vyplneneCheck', label: "jres:26257146" })) //RC 26257146 : Změnit i pokud je schvalovatel již vyplněn
                .gform("complete");

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

            var l_oSchvalovatelSelected = this.findFields("schvalovatelField").gfield("getValue").ixs_fun;
            var l_bVyplneneChecked = this.findFields("vyplneneCheck").gfield("getValue");

            this.retValue = { SchvalovatelIxsFun: l_oSchvalovatelSelected, VyplneneChecked: l_bVyplneneChecked };

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