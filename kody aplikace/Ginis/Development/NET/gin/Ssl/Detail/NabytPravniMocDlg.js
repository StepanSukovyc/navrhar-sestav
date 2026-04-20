//(function ($) {
//    "use strict";
//    namespace("Gordic.Ssl.NPRM", {
//        onContentReady: function () {
//            var that = this;
//            this.commandBar([
//                { action: this.actions.actOk, primary: true },
//                { action: this.actions.actCancel },
//            ]);
//            this.defaultForm = $("<div>")
//                .appendTo(this.element)
//                .gform("setup", { layoutDescriptor: "L2M2S1" })
//                .gformsection("create")
//                .gformrow("addFieldsRow", "jres:31937460", ["w-12"]).gdatebox({
//                    name: "PrMocField",
//                    model: "PrMocDate",
//                    validators: this.skfunkcnost ? undefined : [new Gordic.Validators.Required({ message: "jres:31937493" })], //RC 31937493 : Povinná hodnota
//                    change: function (ev, item) {
                        
//                        var val = item && item.value ? item.value : null;
//                        if(that.skfunkcnost && val) {
//                            var datVykonavField = that.findFields("DatVykonav");
//                            var datVykonavValue = datVykonavField.gfield("getValue");

//                            if(!datVykonavValue) {
//                                var valDate = new Date(val).addDays(15);
//                                datVykonavField.gfield("setValue", valDate);
//                            }
//                        }
//                    }
//                }); //RC 31937460 : Právní moc

//            if (this.skfunkcnost) {
//                this.defaultForm
//                    .gformrow("addFieldsRow", "jres:31937461", ["w-12"]).gdatebox({ name: "DatVykonav" }); //RC 31937461 : Vykonavatelnost
//            }


//            this.defaultForm.gform("complete");

//            var fields = this.findFields();

//            fields.gfield("model", "apply", this.model);

//            if(this.validators) {
//                fields.gfield("model", "validators", this.validators);
//                Gordic.Utils.Form.markRequired(this.defaultForm);
//            }
//        },
//        OKClick: function () {
//            if (this.defaultForm.gform("isValid")) {
//                var _this = this;
//                var l_oDate = this.findFields("PrMocField").gfield("getValue");
//                var vykonav = null;
//                if (this.skfunkcnost) {
//                    vykonav = this.findFields("DatVykonav").gfield("getValue");
//                }

//                if (this.IxpsArry != null) {
//                    var l_oParamsJSON = { "IxpsArry": this.IxpsArry, "Datum": l_oDate, "Vykonav": vykonav };

//                    _this.call(["NabytiPravniMociHromadne", l_oParamsJSON]).done(
//                        function (data, content) {
//                            _this.retValue = data;
//                            _this.tryClose();
//                        }
//                    );

//                } else {
//                    var l_oParamsJSON = { "Ixp": this.Ixp, "Dokument": this.Dokument, "Datum": l_oDate, "Vykonav": vykonav };

//                    _this.call(["NabytiPravniMoci", l_oParamsJSON]).done(
//                        function (data, content) {
//                            _this.retValue = true;
//                            _this.tryClose();
//                        }
//                    );
//                }

               
//            }
//        },

//        closing: function () {
//            var def = $.Deferred();

//            if (this.retValue) {
//                def.resolve(this.retValue);
//            } else {
//                def.resolve();
//            }

//            return def.promise();
//        },
//    }, { pure: true });
//})(jQuery);