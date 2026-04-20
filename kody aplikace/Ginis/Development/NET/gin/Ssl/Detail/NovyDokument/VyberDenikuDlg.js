(function ($) {
    "use strict";
    namespace("Gordic.Ssl.VDEN", {
     //   EditDleDeniku: null,

        onContentReady: function () {
            var _this = this;
            this.title = "jres:26255131"; //RC 26255131 : Vytvoření/změna ČJ

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            var form = new Gordic.Forms
                 .Form({ name: "FormFiltry", layoutDescriptor: "L1M1S1, L-4-8-0, M-12-12-0, S-3-9-0, breaks-600-900" })
                   .addSection({ label: "jres:26256034" }) //RC 26256034 : Nové ČJ
                       .addRow("jres:26256034") //RC 26256034 : Nové ČJ
                              //.addField("gselectbox", "w-5",
                              //    {
                              //        name: "denikField",
                              //        model: "DenikSelected = sslden",
                              //        serverFilters: {
                              //            priz_den_cj: [1, 2],
                              //        },
                              //        change: function (ev, data) {
                              //            _this.GetEditovatelnostDleDeniku(data.value.sslden);
                              //        }
                              //    }, Gordic.Prefabs.Select.sslsden())
                              .addField("gselectbox", Gordic.Prefabs.Select.sslsden(),
                                    {
                                        name: "denikField",
                                        model: "DenikSelected = sslden",
                                      //  model: "model.DenikSelected=value.sslden",
                                        customClass: "w-5 denikCj",
                                        serverFilters: {
                                            priz_den_cj: [1, 2],
                                        },
                                        change: function (ev, data) {
                                            _this.GetEditovatelnostDleDeniku(data.value.sslden);
                                        }
                                    })
                              .addField("gnumberbox", "w-3", { name: "poradiField", model: "Poradi", emptyValue: null, defaultValue: null, returnType: "number" })
                              .addText("/", "w-1 center")
                              .addField("gnumberbox", "w-3", {
                                  name: "rokField",
                                  model: "Rok",
                                  returnType: "number",
                                  change: function (ev, data) {
                                     // console.log("Nastavuji rok deniku:" + data.value + ".");
                                  }
                              })
                        .addRow({ layoutDescriptor: "L-0-12-0, M-0-12-0, S-0-12-0" })
                              .addField("gstringbox", "w-12", { name: "commentField", model: "CommentText", disabled:true, rows: 4 });

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            
            // přidání tlačítka do fieldu
 /*           $(".js-fieldHistoryButt").gfield("addButton", {
                action: new GAction({ name: "actHis", icon: "gi-time-back", run: function (ev, ctx) { console.log("Historie"); } })
            });*/


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

            this.findFields().gfield("model", "collect", this.model);

            if(this.model.EditDleDenikuInfo.PoradiRequired && !this.model.Poradi) {
                GDlg.alert(this.PoradiRequiredErrMessage);
                return;
            }

            if(this.model.EditDleDenikuInfo.RokRequired && !this.model.Rok) {
                GDlg.alert(this.RokRequiredErrMessage);
                return;
            }

            // osetrim pro pripad spojiteho deniku, kdy AL vyzaduje GInt32.Null u spojiteho deniku, ale policko vraci svou hodnotu 0
        /*    if(this.model.EditDleDenikuInfo.PoradiReadOnly) {
                this.model.Poradi = null;
            }*/

            this.retValue = { "denik": this.model.DenikSelected, "poradi": this.model.Poradi, "rok": this.model.Rok };
            this.tryClose();
        },
        GetEditovatelnostDleDeniku: function (DenikSelected) {
            var _this = this;

            this.call(["EditovatelnostDleDeniku", { "sslden": DenikSelected }]).done(
                function (data, content) {
                    _this.model.EditDleDenikuInfo = data;
                    _this.NastavEditovatelnostDleDeniku();
                }
            );
        },
        NastavEditovatelnostDleDeniku: function() {
            var l_oEditovatelnostVyberuDenikuInfo = this.model.EditDleDenikuInfo;
           // console.log("Rok deniku:" + l_oEditovatelnostVyberuDenikuInfo.RokValue + ".");

            if(l_oEditovatelnostVyberuDenikuInfo.Success === true) {
                if(l_oEditovatelnostVyberuDenikuInfo.RokValue != "") {
                    this.findFields("rokField").gfield("setValue", l_oEditovatelnostVyberuDenikuInfo.RokValue);
                }

                var poradiReadOnly = l_oEditovatelnostVyberuDenikuInfo.PoradiReadOnly;
                var rokReadOnly = l_oEditovatelnostVyberuDenikuInfo.RokReadOnly;
                //var poradiValidator = [];
                //var rokValidator = [];

                //if(!poradiReadOnly) {
                //    poradiValidator = [new Gordic.Validators.Required];
                //}
                //if(!rokReadOnly) {
                //    rokValidator = [new Gordic.Validators.Required];
                //}

                this.findFields("poradiField").gfield("option", { disabled: poradiReadOnly === true/*, validators: poradiValidator*/ });
                this.findFields("rokField").gfield("option", { disabled: rokReadOnly === true/*, validators: rokValidator*/ });

                this.findFields("commentField").gfield("setValue", l_oEditovatelnostVyberuDenikuInfo.CommentText);
            } else {
                if(l_oEditovatelnostVyberuDenikuInfo.ErrMessage != "") {
                    GDlg.alert(l_oEditovatelnostVyberuDenikuInfo.ErrMessage);
                }
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