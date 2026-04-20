(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ZmenaDoplnkuZnacky", {

        onContentReady: function () {
            var that = this;
            this.title = "jres:26256887"; //RC 26256887 : Změna doplňku značky

            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);

            var form = new Gordic.Forms
                .Form({ name: "FormFiltry", layoutDescriptor: "L2M2S1" })
                .addSection("")
                .addRow("jres:26256888"); //RC 26256888 : Doplněk



            // Zde je jedna nesrovnalost.Tento dialog nebere v potaz parametr SSL - možnost editovat doplněk spisové značky výběrem z číselníku
            // a vždy použije volné editační pole, takže může dojít i k situaci, že si ke spisu uloží něco, co je mimo číselník doplňků / přívěsků spisové značky.
            // Dialog je společný pro spisy i dokumenty a to se tím docela komplikuje.Stejný problém v TK.


 
            //if (this.SslEdiSzecisPar === 1) { 
            //    // parametr se jmenuje SSL - možnost editovat doplněk spisové značky výběrem z číselníku
            //    // default je 0, a používají třeba UOHS, MOCR). ref T35482

            //    // používat CjExt nad adminem spravovanou tabulkou
            //    form.addField("gselectbox", Gordic.Prefabs.Select.ginvpsu(), "w-4", {
            //        name: "CjExt",
            //        model: "model.CjExt=value.cj_ext",
            //        modelDefaults: { ixs_su: this.IxsSuAkt },
            //        serverFilters: {
            //            ixs_su: this.IxsSuAkt,
            //        },
            //        dropdown: true
            //    })

            //} else {
                // jinak využít volné editační pole, zde ponechávám možnost gmemorySelectbox, což je bonus pro uživatele

                // pouzivat CjExt oblibene
                form.addField("gselectbox", "w-4", {
                    model: "model.CjExt=value.data",
                }, Gordic.Gin.Prefabs.gmemorySelectbox({
                    userSettings: that.userSettings, // todo - predelat spolecne s detailem spisu na spolecny/globalni usersettings
                    name: "CjExt",
                    type: "string",
                    rememberLast: false,
                    countOfRemembered: 10
                }));

                //form.addField("gstringbox", "w-12", { name: "doplnekField", model: "CjExt" })
           // }

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            var fields = this.findFields();

      debugger;
            this.model.CjExt = "BBB"; //
          //  this.model.CjExt = { ixs_su: this.IxsSuAkt, cj_ext: "BBB" }; //

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

        },
        OKClick: function () {
            if(this.defaultForm.gform("isValid")) {
                //var l_sDoplnek = this.findFields("doplnekField").gfield("getValue");
                this.findFields().gfield("model", "collect", this.model);

                this.retValue = { Doplnek: this.model.CjExt };
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