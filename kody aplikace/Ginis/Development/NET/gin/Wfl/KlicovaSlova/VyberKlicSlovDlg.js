(function ($) {
    "use strict";
    namespace("Gordic.Wfl.VYKS", {
        onContentReady: function () {
            var that = this;

            this.ksButtonsAction = new GAction({
                name: 'actChecker',
                icon: 'fa-file',
                tooltip: "Výběr ze všeho",
                run: function (ev, ctx) {
                    let ksButtonsAction = that.ksButtonsAction;

                    if (ksButtonsAction.selectAll) {
                        ksButtonsAction.selectAll = false;
                        ksButtonsAction.update({
                            "icon": "fa-file",
                            "tooltip": "Výběr ze spisového uzlu"
                        });

                        // nastavení filterů
                        that.findFields("klicSlovaField").gfield("option", {
                            serverFilters: {
                                "ixs_su": that.IxsSuAkt
                            }
                        });
                        Gordic.Data.readerCache.clearCache("Gordic.Wfl.Client.GReaderWflKlicSlova"); // smazání cache z Readeru
                    } else {
                        ksButtonsAction.selectAll = true;
                        ksButtonsAction.update({
                            "icon": "fa-globe",
                            tooltip: "Výběr ze všeho",
                        });

                        // vynulování filterů
                        that.findFields("klicSlovaField").gfield("option", {
                            serverFilters: null
                        });
                        Gordic.Data.readerCache.clearCache("Gordic.Wfl.Client.GReaderWflKlicSlova"); // smazání cache z Readeru
                    }

                }
            })

            this.ksButtonsAction.selectAll = false;
          
            this.defaultForm = $("<div>")
                .appendTo(this.element)
                .gform("setup", { layoutDescriptor: "L2M2S1" })
                .gformsection("create")
                .gformrow("addFieldsRow", "jres:26227187", ["w-12"]).gselectbox( //RC 26227187 : Klíč. slova
                Gordic.Prefabs.Select.wflKlicSlova(), {
                        name: "klicSlovaField",
                        placeholder: "jres:26227205", //RC 26227205 : Zadejte klíčová slova
                        multi: true,
                        //strict: false,
                        dropdown: false,
                        showSelectButton: true,
                        verticalButtons: false,
                        buttons: [{
                            action: that.ksButtonsAction,
                        },],
                        model: "model.KlicSlova=value.kl_slovo",
                        serverFilters: {
                            "ixs_su": that.IxsSuAkt
                        },
                        //invalidTransform: function (strValue) {
                        //    debugger;
                        //    if (strValue) {
                        //        return { kl_slovo: strValue }; // vratime data ve formatu v jakem je policko zvykle
                        //    }
                        //    return strValue; // vratime puvodni hodnotu pro pripad, ze si s ni verifikace nejak poradi
                        //}

                })
                .gform("complete");

            this.findFields()
                .gfield("model", "apply", this.model)
                .gfield("model", "validators", this.validators);
        },
        OKClick: function () {
            if(this.defaultForm.gform("isValid")) {
                this.findFields().gfield("model", "collect", this.model);

                this.retValue = { KlicSlova: this.model.KlicSlova };
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