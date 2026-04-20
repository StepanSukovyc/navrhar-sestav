(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ZMTD", {
        onContentReady: function () {
            this.title = "jres:26255900"; //RC 26255900 : Změna typu dokumentu

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            this.defaultForm = $("<div>")
                .appendTo(this.element)
                .gform("setup", { layoutDescriptor: "L2M2S1" })
                .gformsection("create")
                .gformrow("addFieldsRow", "jres:26255426", ["w-12"]).gselectbox( //RC 26255426 : Typ dokumentu
                    Gordic.Prefabs.Select.sslstyp(),
                    {
                        name: "TypDokField",
                        model: "TypDokumentu = ixs_typ",
                        serverFilters: {
                            aktivita_ssl: [100],
                        },
                    })
                .gform("complete");

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

            //if(this.element.gpreset) {
            //    this.element.gpreset({ placeTo: PlaceEnum.command, elements: this.findFields("TypDokField"), userSettings: this.userSettings }/* as GPresetOptions<IGPresetDefaultRecord>*/);
            //    this.element.gpreset("apply");
            //}
        },
        OKClick: function () {
            if (this.defaultForm.gform("isValid")) {
                var l_sSelectedTypDokumentu = this.findFields("TypDokField").gfield("getValue").ixs_typ;

                this.retValue = { ixs_typ: l_sSelectedTypDokumentu };
                this.tryClose();
            }
        },

        closing: function () {
            var def = $.Deferred();

            if(this.retValue) {
                def.resolve(this.retValue);
            } else {
                def.resolve();
            }

            return def.promise();
        },
    }, { pure: true });
})(jQuery);