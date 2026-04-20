(function ($) {
    "use strict";
    namespace("Gordic.Ssl.ZMSZ", {

        onContentReady: function () {
            var _this = this;
            
            this.commandBar([
                { action: this.actions.actOk, primary: true },
                { action: this.actions.actCancel },
            ]);
            var form = new Gordic.Forms
                .Form({ name: "FormZMSZ", layoutDescriptor: "L2M2S2" })
                   .addSection();

            if (this.gin_n23_vecsk == 1) {
                this.title = "jres:26257238"; //RC 26257238 : Změna věcné skupiny spisu

                var prefabGinsvskOptions = Gordic.Prefabs.Select.ginsvsk();
                prefabGinsvskOptions.validators?.push(new Gordic.Validators.Required());

                form
                    .addRow("jres:26257237") //RC 26257237 : Věcná skupina spisu
                        .addField("gselectbox", prefabGinsvskOptions, {
                            name: "VecnaSkupina",
                            model: "model.IxsVsk=value.ixs_vsk",
                            graphicInput: "oninput",
                            itemTemplate: Gordic.Wfl.GWflCommonDlg.ginsvskItemTemplate({ casObdobiVisible: false }),
                            itemTooltipTemplate: Gordic.Wfl.GWflCommonDlg.ginsvskItemTooltipTemplate({ casObdobiVisible: false }),
                            //modelOptions: {
                            //    initialValues: true
                            //},
                          //  validators: [new Gordic.Validators.Required()], 
                            serverFilters: {
                                // aktivita: [100],
                                JenKoncove: true,
                                urceni_spis_z: [2,3]
                            }

                        });
            } else {
                this.title = "jres:26255896"; //RC 26255896 : Změna spisového plánu a znaku

                form
                    .addRow("jres:26257187") //RC 26257187 : Spis. plán a znak
                        .addField("gselectbox", "w-3",
                            Gordic.Prefabs.Select.sslsspl(),
                            {
                                name: "spPlField",
                                model: "SpisPlan = spis_pl",
                                serverFilters: {
                                    aktivita: [100, 500] // i 500 - požadavek MV ref T32077
                                }
                            })
                        .addField("gselectbox", "w-9",
                            Gordic.Prefabs.Select.sslsspz(),
                            {
                                name: "spZnField",
                                model: "model.SpisZnak = value.spis_znak;model.SpisPlan = value.spis_pl",
                                graphicInput: "oninput",
                                itemTemplate: Gordic.Wfl.GWflCommonDlg.sslsspzItemTemplate(),
                                itemTooltipTemplate: Gordic.Wfl.GWflCommonDlg.sslsspzItemTooltipTemplate(),
                                serverFilters: {
                                    aktivita: [100, 500], // i 500 - požadavek MV ref T32077
                                    spis_pl: new Gordic.Forms.Dependency("spPlField", "spis_pl")
                                }
                            });

                form
                    .addRow()
                    .addField("gcheck", { name: "vyplneneCheck", label: "jres:26255846", tooltip: "jres:26255846", model: "VyplneneChecked" }) //RC 26255846 : Změnit i pokud je spis. znak již vyplněn
                    .addRow()
                    .addField("gcheck", {
                        name: "uzavreneCheck",
                        label: "jres:26256318",
                        tooltip: "jres:26256318",
                        model: "UzavreneChecked",
                        disabled: this.zmenitINaVlozenychDisabled,
                    }); //RC 26256318 : Změnit i na vložených dokumentech
            }



            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if(this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

            //if(this.element.gpreset) {
            //    this.element.gpreset({ placeTo: PlaceEnum.command, elements: this.findFields("spPlField,spZnField,vyplneneCheck,uzavreneCheck"), userSettings: this.userSettings }/* as GPresetOptions<IGPresetDefaultRecord>*/);
            //    this.element.gpreset("apply");
            //}
        },
        OKClick: function () {
            if(!this.defaultForm.gform("isValid")) {
                return;
            }

            this.findFields().gfield("model", "collect", this.model);

            var ixsVsk = null; // pro přenos na server musím undefined nahradit za null
            if(this.model.IxsVsk != null) {
                ixsVsk = this.model.IxsVsk;
            }

            this.retValue = { SpisPlanSelected: this.model.SpisPlan, SpisZnakSelected: this.model.SpisZnak, IxsVskSelected: ixsVsk, VyplneneChecked: this.model.VyplneneChecked, UzavreneChecked: this.model.UzavreneChecked };
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