(function ($) {
    "use strict";
    namespace("Gordic.Wfl.GENI", {
        logOptions: { name: 'Gordic.Wfl.WebClient.GenerovaniIxpDlg', fileName: 'GenerovaniIxpDlg.js', authorCode: 262 },
        actionOKInProcess: false,

        onContentReady: function () {
            var that = this;

            this.model.PidUS = this.globalSettings.get("Global.Wfl.AppSettings.OthersSettings.PredplneniPID");
            var generPidVlastni = this.globalSettings.get("Global.Wfl.AppSettings.OthersSettings.GenerPidVlastni");//

            this.log.debug("GenerovaniIxpDlg onContentReady - model Ixp: " + this.model.Ixp + " zpusobGenerovani: " + this.model.zpusobGenerovani + " GenPIDAutomaticky: " + this.model.GenPIDAutomaticky + " GenerPidVlastni: " + generPidVlastni);

            var form = new Gordic.Forms
                .Form({ name: "FormGENI", layoutDescriptor: "L2M2S1" })
                .addSection()
                .addRow("jres:26225442").addField("gstringbox", ["w-12"], //RC 26225442 : PID
                    Gordic.Prefabs.String.ixs(),
                    {
                        name: "ixpField",
                        model: "Ixp",
                        change: function (ev, obj) {
                            if (obj.value && obj.value.length === 12 && obj.flags.gener !== true) {
                                if (that.model.GenPIDAutomaticky === true) {
                                    that.PoVygenerovaniPIDu(obj.value);
                                } else {
                                    that.actionOKInProcess = true;
                                    that.actions.actOk.run();
                                }
                            }
                        }
                    })
                .addRow({ label: "jres:26227129", name: "idExtRow" }).addField("gstringbox", ["w-12"], //RC 26227129 : Cizí ID
                    {
                        name: "idExt",
                        model: "IdExt"
                    });


            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if (this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

            if (this.model.IdExtVisible === false) {
                this.findFormRows("idExtRow").hide();
            }

            if (this.model.GenPIDAutomaticky) {
                this.log.debug("GenerovaniIxpDlg onContentReady - call GenerateClick()");
                this.GenerateClick();
            }

            this.element.gshortcut({
                // klávesová zkratka
                key: "alt+i",
                // akce, která je spuštěna po zmáčknutí kombinace. Pokud akce není enabled, není enabled ani zkratka.
                action: this.actions.actPredplnitPid,
                // popis klávesové zkratky pro zobrazení v nápovědě. Pokud není zadán, je použit caption z akce.
                description: "jres:26226431",			//RC 26226431 : Předplnit
                group: Gordic.Shortcuts.Groups.Field
            });

            // Celá následující část je vyčuraná turbo vychytávka, která řeší to, že se ztrácel focus při automatickém podání, kdy se tento dialog otvíral po zavření podání.
            // Potom co se zavřel dialog podání se otevřel tento malý dialog a pod tím na pozadí se začal loadovat titulní strana modulu a sebrala focus
            // tento kod počká až všechny childcontenty na mainu jsou načtené
            var fieldMain = this.findFields("ixpField");
            var services = [];
            var significants = [];
            var promisky = [];
            $.content("main")._analyzeChildContents(services, significants);
            for (var i = 0; i < significants.length; i++) {
                promisky.push(significants[i].readyAwait);
            }
            $.when.apply(null, promisky).done(function () {
                if (Gordic.Utils.WidgetExists("gfield", fieldMain)) {
                    fieldMain.gfield("focus");
                }
            });
            // konec vyčůrané části
           
        },
        OKClick: function () {
            if(!this.defaultForm.gform("isValid")) {
                return;
            }

            this.findFields().gfield("model", "collect", this.model);

            var _this = this;

            var generPidVlastni = this.globalSettings.get("Global.Wfl.AppSettings.OthersSettings.GenerPidVlastni");//

            this.log.debug("GenerovaniIxpDlg JS OKClick - model Ixp: " + this.model.Ixp + " zpusobGenerovani: " + this.model.zpusobGenerovani + " GenerPidVlastni: " + generPidVlastni);

            this.call(["OKClick", { model: this.model }]).done(
                function (data, content) {
                    var l_sRetVal = data;

                    if(l_sRetVal != "") {
                        _this.Evaluate(l_sRetVal);
                    }
                }
            );
        },
        GenerateClick: function () {
            var _this = this;

            if(this.actionOKInProcess) {
                this.actionOKInProcess = false;
                return;
            }

            this.call(["GenerateIxp", { model: this.model }]).done(
                function (retVal, content) {
                    if(retVal != "") {
                        var aIxp = retVal;
                        _this.findFields("ixpField").gfield("setValue", aIxp, { gener:true });

                        _this.PoVygenerovaniPIDu(aIxp);
                    }
                }
            );
        },
        PoVygenerovaniPIDu: function (ixp) {
            var _this = this;

            if(this.model.IdExtVisible === true) {
                this.findFields("idExtRow").gfield("setValue", "");
            }

            this.log.debug("GenerovaniIxpDlg PoVygenerovaniPIDu - Ixp: " + ixp);

         //   var t = window.setTimeout(_this.ReturnData.bind(_this, ixp, false, false), 500);
            this.ReturnData(ixp, false, false);
        },
        PredplnitPID: function (event) {
            this.findFields("ixpField").gfield("setValue", this.model.PidUS);
        },
        IxpExistShowQuestion: function (Msg) {
            var _this = this;

            Msg += "\n\n" + "jres:26227137"; //RC 26227137 : Chcete přesto tento identifikátor použít?

            GDlg.confirm("jres:26227134", Msg).on("close", function (ev, retVal) { //RC 26227134 : Varování
                if(retVal) {
                    if(retVal === "yes") {
                        _this.ReturnData(_this.model.Ixp, true, false);
                    }
                }
            });
        },
        Evaluate: function (RetVal) {
            var func = new Function(RetVal);
            func.call(this);
        },
        ReturnData: function (Ixp, IxpExist, IxpExistShowWarn) {
            var _this = this;
            this.retValue = { "Ixp": Ixp, "IxpExist": IxpExist };

            if(IxpExist && IxpExistShowWarn) {
                GDlg.alert("jres:26227124").on("close", function (ev, retVal) { //RC 26227124 : Zadaný identifikátor dokumentu již existuje
                  /*  if(retVal) {
                        if(retVal === "ok") {
                            
                        }
                    }*/

                    _this.tryClose();
                });
            } else {
                this.tryClose();
            }
        },

        closing: function () {
            var def = $.Deferred();

            this.log.debug("GenerovaniIxpDlg closing ...");

            var generPidVlastni = this.globalSettings.get("Global.Wfl.AppSettings.OthersSettings.GenerPidVlastni");//
            this.log.debug("GenerovaniIxpDlg closing GenerovatPidVlastniUS" + generPidVlastni);

            if(this.retValue) {
                this.log.debug("GenerovaniIxpDlg closing - Ixp: " + this.retValue.Ixp + " IxpExist: " + this.retValue.IxpExist);
                def.resolve(this.retValue);
            } else {
                def.resolve();
            }

            return def.promise();
        },
    }, { pure: true });
})(jQuery);