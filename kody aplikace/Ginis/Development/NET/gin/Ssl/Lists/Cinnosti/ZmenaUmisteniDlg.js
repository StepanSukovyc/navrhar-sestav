(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ZMUM", {
        onContentReady: function () {
            var that = this;
            this.title = "jres:26256823"; //RC 26256823 : Změna umístění

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            this.defaultForm = $("<div>")
                    .appendTo(this.element)
                    .gform("setup", { layoutDescriptor: "L2M2S1" })
                        .gformsection("create")
                            .gformrow("addFieldsRow", "jres:26255848", ["w-12"]).gselectbox( //RC 26255848 : Umístění: 
                                Gordic.Prefabs.Select.sslsumi(),
                                {
                                    name: "UmisteniField",
                                    model: "Umisteni = umisteni",
                                    //itemTemplate: function (value) {
                                    //    if (value) {
                                    //        return "" + value.umisteni_txt + (value.poznamka ? (" - " + value.poznamka) : "");
                                    //    }
                                    //}, 
                                    serverFilters: {
                                        ixs_su: that.IxsSuAkt,
                                    },
                                })
                            .gformrow("addFieldsRow", "", ["w-12"]).gcheck(({ name: 'VyplneneCheck', label: "jres:26255850" })) //RC 26255850 : Změnit i pokud je umístění již vyplněno
                .gform("complete");

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

            //if(this.element.gpreset) {
            //    this.element.gpreset({ placeTo: PlaceEnum.command, elements: this.findFields("UmisteniField,VyplneneCheck"), userSettings: this.userSettings }/* as GPresetOptions<IGPresetDefaultRecord>*/);
            //    this.element.gpreset("apply");
            //}
        },
        OKClick: function () {
            if(this.defaultForm.gform("isValid")) {
                var l_sSelectedUmisteni = this.findFields("UmisteniField").gfield("getValue").umisteni;
                var l_bVyplneneChecked = this.findFields("VyplneneCheck").gfield("getValue");

                this.retValue = { SelectedUmisteni: l_sSelectedUmisteni, VyplneneChecked: l_bVyplneneChecked };
                this.tryClose();
            }
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