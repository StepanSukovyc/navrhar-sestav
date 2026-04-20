(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ADTP", {
        onContentReady: function () {
            this.commandBar([
                { action: this.actions.actOdstranit },
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            this.defaultForm = $("<div>")
                    .appendTo(this.element)
                    .gform("setup", { layoutDescriptor: "L2M2S1" })
                        .gformsection("create")
                            .gformrow("addFieldsRow", "jres:26255478").gdatebox({ name: "terminField", model: "Termin" }) //RC 26255478 : Termín
                            .gformrow("addFieldsRow", "jres:26256067").gstringbox({ name: "duvodField", model: "Duvod" }) //RC 26256067 : Důvod
                .gform("complete");

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

            this.findFields("terminField").gfield("option", "change", function (event, fieldValue) {

                if($.content(this).defaultForm.gform("isValid")) {
                    var l_oCurrentTime = new Date();
                    var l_nCurrentYear = l_oCurrentTime.getYear();

                    if(l_nCurrentYear < 1900) {
                        l_nCurrentYear = l_nCurrentYear + 1900;
                    }

                    var l_oCurrentDate = new Date(l_nCurrentYear, l_oCurrentTime.getMonth(), l_oCurrentTime.getDate());

                    if(fieldValue.value.getTime() < l_oCurrentDate.getTime()) {
                        GDlg.alert("jres:26256509"); //RC 26256509 : Nelze zadat uplynulé datum.

                        $.content(this).findFields("terminField").gfield("setValue", l_oCurrentDate, { triggerChange: false }); // neni idealni zpusob - mel bych nastavit primo policku, ktere je this
                    }
                }
            });
        },
        OKClick: function () {
            if(this.defaultForm.gform("isValid")) {
                var l_oTermin = this.findFields("terminField").gfield("getValue");
                var l_sDuvod = this.findFields("duvodField").gfield("getValue");

                var l_nMode = 0;

                if (this.FlagEditace) {
                    l_nMode = 1;
                }

                if (this.Ixp == "") {
                    this.retValue = { termin: l_oTermin, duvod: l_sDuvod };
                    this.tryClose();
                } else {
                    var _this = this;
                    var l_oJSONPars = { "Ixp": this.Ixp, "DatZmena": this.model.DatZmena, "DatZmenaTicks": this.model.DatZmenaTicks, "DatTermin": l_oTermin, "Duvod": l_sDuvod, "Mode": l_nMode };

                    this.call(["ZpracovatDilciTermin", l_oJSONPars]).done(
                        function (data, content) {
                            _this.retValue = true;
                            _this.tryClose();
                        }
                    );
                }
            }
        },
        OdstranitDilciTermin: function () {
            var l_oTermin = this.findFields("terminField").gfield("getValue");
            var l_sDuvod = this.findFields("duvodField").gfield("getValue");
            var l_nMode = 4;
            var _this = this;

            var l_oJSONPars = { "Ixp": this.Ixp, "DatZmena": this.model.DatZmena, "DatZmenaTicks": this.model.DatZmenaTicks, "DatTermin": l_oTermin, "Duvod": l_sDuvod, "Mode": l_nMode };

            this.call(["ZpracovatDilciTermin", l_oJSONPars]).done(
                function (data, content) {
                    _this.retValue = true;
                    _this.tryClose();
                }
            );
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