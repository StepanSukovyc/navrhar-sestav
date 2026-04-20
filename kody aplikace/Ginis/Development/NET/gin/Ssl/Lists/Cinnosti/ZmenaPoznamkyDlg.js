(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ZmenaPoznamky", {

        onContentReady: function () {
            var _this = this;
            this.title = "jres:26256802"; //RC 26256802 : Změna poznámky

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            var form = new Gordic.Forms
                //.Form({ name: "FormFiltry", layoutDescriptor: "L2M2S1" })
                .Form({ name: "FormFiltry", layoutDescriptor: "L1M1S1" }) // test
                .addSection("")
                .addRow("jres:26255397") //RC 26255397 : Poznámka
                .addField("gstringbox", "w-12", { name: "poznamkaField", model: "Poznamka" })

                //// test ...
                //.addSection(Gordic.Gin.Fields.MultiSuFunRef({
                //    rowOptions: { label: "Spisovému uzlu/funkci/osobě", favoriteRowLayoutDescriptor: "w-L-6 w-M-8 w-S-12" },
                //    chovaniStrediskaDleUcelu: false,
                //    name: "GinFieldsMultiSuFunRef",
                //   // model: null, // taky by určitě šla použít nějaká defaultní hodnota

                //    suOptions: {
                //        name: "suField",
                //        model: "IxsSu = ixs_su",
                //        serverFilters: {
                //            aktivita: [100, 500],
                //        },
                //        change: function (ev, data) {
                //            console.log("Change su " + data.value);
                //        },
                //    },
                //    orjOptions: {
                //        name: "orjField",
                //        model: "IxsOrj = ixs_orj",
                //        serverFilters: {
                //            aktivita: [100, 500],
                //        },
                //    },
                //    funOptions: {
                //        name: "funField",
                //        model: "IxsFun = ixs_fun",
                //        serverFilters: {
                //            aktivita: [100, 500],
                //            //VazbaNaSpisovyDenik: this.SslPripreomezPar == 1,
                //        },
                //        change: function (ev, data) {
                //            console.log("Change fun " + data.value);
                //        },
                //        validators: [
                //            {
                //                "message": "jres:26227470", //RC 26227470 : Zadejte funkční místo.
                //                "validate": function (value, changeObj) {

                //                    console.log("Validate " + value);

                //                    //if (_this.Ucel == Gordic.Wfl.Globals.Enums.UcelRedistribuce.PREDANI && value == null) {
                //                    //    return false;
                //                    //}

                //                    return true;
                //                },
                //                "group": "customValidation"
                //            }
                //        ],
                //    },
                //}));

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

            //if(this.element.gpreset) {
            //    this.element.gpreset({ placeTo: PlaceEnum.command, elements: this.findFields("poznamkaField"), userSettings: this.userSettings }/* as GPresetOptions<IGPresetDefaultRecord>*/);
            //    this.element.gpreset("apply");
            //}
        },
        OKClick: function () {
            if (this.defaultForm.gform("isValid")) {
                var l_sPoznamka = this.findFields("poznamkaField").gfield("getValue");

                this.retValue = { Poznamka: l_sPoznamka };
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