(function ($) {
    "use strict";
    namespace("Gordic.Wfl.EmailLoginSettings", {

        onContentReady: function () {
            var that = this;
            this.newOps({ title: "jres:26227677" }); //RC 26227677 : Nastavení účtu

            this.actions.addRange({
                actClear: {
                  //  icon: Gordic.Gin.Icons.StavEnum.odstraneno,
                    icon: "gi-bin",
                    caption: "jres:26227683", //RC 26227683 : Smazat nastavení
                    run: function (ev, ctx) {
                        that.ClearClick();
                    }
                },
                actOk: {
                    icon: undefined,
                    caption: "jres:26227680", //RC 26227680 : OK
                    run: function (ev, ctx) {
                        that.OKClick();
                    }
                },
                actCancel: {
                    icon: undefined,
                    caption: "jres:26227681", //RC 26227681 : Zavří­t
                    run: function (ev, ctx) {
                        that.close();
                    }
                },
            });

            this.menuBar([
                { action: this.actions.actClear, favorite: true },
            ]);

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            var form = new Gordic.Forms
                .Form({ name: "FormFiltry", layoutDescriptor: "L2M2S1" })
                .addSection("")
                .addRow("jres:26227678") //RC 26227678 : Uživatelské jméno
                .addField("gstringbox", "w-12", { name: "usernameField", model: "Username" })
                .addRow("jres:26227679") //RC 26227679 : Heslo
                .addField("gstringbox", "w-12", {
                    name: "passwordField",
                    /* model: "Password<=value"*/
                    inputType: "password",
                    validators: [
                        new Gordic.Validators.Required()
                    ],
                })

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

        },
        ClearClick: function () {
            var that = this;

            this.Save(null, null);
        },
        OKClick: function () {
            var that = this;

            if(this.defaultForm.gform("isValid")) {
                var l_sUsername = this.findFields("usernameField").gfield("getValue");
                var l_sPassword = this.findFields("passwordField").gfield("getValue");

                this.Save(l_sUsername, l_sPassword);
            }
        },

        Save: function (username, password) {
            var that = this;

            this.model.Username = username;

            //*** hrátky s crypto/šifrováním ***
            //if(password != null) {
            //    debugger; 
            //    var key = CryptoJS.enc.Base64.parse(this.AesKey);
            //    var iv = CryptoJS.enc.Base64.parse(this.AesIv);
            //    var encrypted = CryptoJS.AES.encrypt(password, key, { iv: iv });
            //    var pe = encrypted.toString();

            //    var decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv });
            //    var p = decrypted.toString(CryptoJS.enc.Utf8);
            //}

            this.call("SaveEmailLogin", { dto: this.model, pass: password })
                .then(function (result) {
                   // that.retValue = {  };
                    that.tryClose();
                })
                .fail(function (error) {
                    console.error(error)
                })
                .always(function () {

                })
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