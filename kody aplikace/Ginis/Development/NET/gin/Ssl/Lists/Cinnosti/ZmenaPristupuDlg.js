(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ZMPRI", {
        onContentReady: function () {
            this.title = "jres:26256446"; //RC 26256446 : Změna přístupu

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            var l_nPristup = this.userSettings.get("PristupSelected");
            this.model.NastRPChecked = this.userSettings.get("NastaveniRPVlDoSpisuChecked", false);

            if (l_nPristup != null) {
                this.model.StupUtajId = l_nPristup;
            }

            //  this.model.StupUtajId = 40;//
            //  this.model.NastRPChecked = true;//

            var form = new Gordic.Forms
                //.Form({ name: "FormFiltry", layoutDescriptor: "L2M2S1" })
                .Form({ name: "FormFiltry", layoutDescriptor: "L1M1S1" }) // test
                .addSection("")
                .addRow({ label: "jres:26255496", name: "addFieldsRow" }) //RC 26255496 : Přístup
                .addField("gselectbox", Gordic.Prefabs.Select.gincstu(), {
                    name: "PristupField",
                    model: "StupUtajId = st_utaj_id"
                })
                .addField("gcheck", {
                    name: 'NastaveniRPVlDoSpisuCheck',
                    label: "jres:26256450", //RC 26256450 : Nastavit řízený přístup i u vnořených dokumentů spisu
                    model: "NastRPChecked",
                });

            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            $.content(this).findFields("NastaveniRPVlDoSpisuCheck").hide();

            var fields = this.findFields();
            fields.gfield("model", "apply", this.model);

            if (this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

            this.findFields("PristupField").gfield("option", "change", function (event, fieldValue) {
                var l_oNastaveniRPVlDoSpisuCheck = $.content(this).findFields("NastaveniRPVlDoSpisuCheck");

                if (fieldValue.value.st_utaj_id == 40) {
                    l_oNastaveniRPVlDoSpisuCheck.show();
                } else {
                    l_oNastaveniRPVlDoSpisuCheck.hide();
                }
            });

            //if(this.element.gpreset) { 
            //   this.element.gpreset({ placeTo: PlaceEnum.command, elements: this.findFields("PristupField,NastaveniRPVlDoSpisuCheck"), userSettings: this.userSettings }/* as GPresetOptions<IGPresetDefaultRecord>*/);
            //   this.element.gpreset("apply");
            //}
        },
        OKClick: function () {
            var l_nPristupSelected = this.findFields("PristupField").gfield("getValue").st_utaj_id;
            var l_bNastaveniRPVlDoSpisuChecked = this.findFields("NastaveniRPVlDoSpisuCheck").gfield("getValue");

            this.userSettings.set("PristupSelected", l_nPristupSelected);
            this.userSettings.set("NastaveniRPVlDoSpisuChecked", l_bNastaveniRPVlDoSpisuChecked);

            this.retValue = { PristupSelected: l_nPristupSelected, NastaveniRPVlDoSpisuChecked: l_bNastaveniRPVlDoSpisuChecked };
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