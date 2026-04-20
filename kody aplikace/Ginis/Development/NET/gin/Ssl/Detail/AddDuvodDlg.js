(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ADDUV", {
        onContentReady: function () {
            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);
            this.IsHybrid = true;
            if (this.userSettings) { // dsebesta 18.01.2022 Oifoval jsem to takhle kuli hybridu, tak snad to bude fungovat.
                this.IsHybrid = false;
            }
            
            this.defaultForm = $("<div>")
                .appendTo(this.element)
                .gform("setup", { layoutDescriptor: "L2M2S1" })
                .gformsection("create")
                .gformrow("addFieldsRow", this.fieldLabel);
         
            if (this.IsHybrid) {
                this.defaultForm
                    .gstringbox(
                        {
                            name: "duvodField",
                            model: "Duvod"
                        }
                    ); //RC 26256067 : Důvod
            } else {
                this.defaultForm
                    .gselectbox(
                        {
                            model: "model.Duvod=value.data"
                        },
                        Gordic.Gin.Prefabs.gmemorySelectbox({
                            userSettings: this.userSettings,            // (povinne)instance usersettings z contentu 
                            name: "duvodField",                       // (povinne) name políčka, použije se i jako klíč pod který se boudou ukládat hodnoty v gstore
                            type: "string",                             // (nepovine) zatím jen jeden typ
                            //rememberLast: true,                         // (nepovine) default false   zda se má nastavovat jako initialValue poslední hodnota co ručně napsal/vybral uživatel
                            //staticData: ["staticke data", "dalsi"],  //(nepovine) staticke hodnoty co se budou nabízet uživateli pokaždé nezavisle na countOfRemembered
                            countOfRemembered: 20        //(nepovine) default 10     počet pamatovaných hodnot           !!!!!!! šetřit gstor
                        })
                    ); //RC 26256067 : Důvod

            }

            this.defaultForm.gform("complete");

            var fields = this.findFields();

            //fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }
        },
        OKClick: function () {
            if (this.defaultForm.gform("isValid")) {
                var l_sDuvod = null;
                if (this.IsHybrid) {
                    l_sDuvod = this.findFields("duvodField").gfield("getValue");
                } else {
                    var fields = this.findFields();
                    var obj = {};
                    fields.gfield("model", "collect", obj);
                    if (obj.Duvod) {
                        l_sDuvod = obj.Duvod;
                    }

                }
                this.retValue = { duvod: l_sDuvod };
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