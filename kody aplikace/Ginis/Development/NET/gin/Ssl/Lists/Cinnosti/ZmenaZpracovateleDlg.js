(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ZMZP", {
        onContentReady: function () {
            this.title = "jres:26255901"; //RC 26255901 : Změna zpracovatele

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            this.defaultForm = $("<div>")
                    .appendTo(this.element)
                    .gform("setup", { layoutDescriptor: "L2M2S1" })
                        .gformsection("create")
                            .gformrow("addFieldsRow", "jres:26255852", ["w-12"]).gselectbox( //RC 26255852 : Zpracovatel 
                                Gordic.Gin.Fields.ginsfunSSU(
                                {
                                    name: "zpracovatelField",
                                    model: "IxsFunZpracovatel = ixs_fun",
                                    serverFilters: {
                                        aktivita: [100],
                                    }
                                }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO))
                            .gformrow("addFieldsRow", "", ["w-12"]).gcheck(({ name: 'vyplneneCheck', label: "jres:26255853" })) //RC 26255853 : Změnit i pokud je zpracovatel již vyplněn
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

            var l_oZpracovatelSelected = this.findFields("zpracovatelField").gfield("getValue").ixs_fun;
            var l_bVyplneneChecked = this.findFields("vyplneneCheck").gfield("getValue");

            this.retValue = { ZpracovatelIxsFun: l_oZpracovatelSelected, VyplneneChecked: l_bVyplneneChecked };

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