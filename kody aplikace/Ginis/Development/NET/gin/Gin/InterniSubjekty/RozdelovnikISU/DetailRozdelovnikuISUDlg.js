$(function () {
        "use strict";
        
        namespace("Gordic.Gin.WebClient.DetailRozdelovnikuISUDlg", {

            onContentReady: function () {

                var that = this;
                this.title = "jres:31910048"; //RC 31910048 : Detail Skupiny interních subjektů
                console.log("dto", this.dto);

                var Form = new Gordic.Forms
                    .Form({
                        name: "form",
                        layoutDescriptor: "L1M1S1, L-4-8-0, M-12-12-0, S-12-12-0"
                    })
                    .addSection()
                    .addRow({ label: "jres:26275051" }).addField("gstringbox", { name: "nazev", }) //RC 26275051 : Název
                    .addRow({ label: "jres:26275109" }).addField("gstringbox", { name: "zkratka", })  //RC 26275109 : Zkratka
                    .addRow({ label: "jres:26275067" }).addField("gstringbox", { name: "poznamka", }) //RC 26275067 : Poznámka


                    .addRow({ label: "jres:26275110" }).addField("gselectbox", Gordic.Prefabs.Select.gincssu(), //RC 26275110 : Typ skupiny
                    {
                        name: "typSkupiny",
                        model: "model.typ_ssu=value.typ_ssu",
                        serverFilters: {
                            typ_ssu: (this.Editace && this.ssl_rp_isuadm === false) ? [0,10]: null
                        }

                    })
                    .addRow({ label: "jres:26275090" }).addField("gselectbox", Gordic.Prefabs.Select.gincpss(),  //RC 26275090 : Příznak skupiny
                    {
                        name: "prizSkupiny",
                        model: "model.priz_ssu=value.priz_ssu",
                        

                    })
                    .addRow({ label: "jres:26275102" }).addField("gselectbox", Gordic.Prefabs.Select.gincakt(),  //RC 26275102 : Aktivita
                    {
                        name: "aktivita",
                        model: "model.aktivita=value.aktivita",
                    })
                    .addSection()
                    
                    .addRow({ label: "jres:31910049" }).addField("gstringbox", { name: "vlastnik", disabled: true  }) //RC 31910049 : Vlastnik skupiny
                    .addRow({ label: "jres:26275052" }).addField("gdatebox", { name: "dat_zmena", disabled: true  }) //RC 26275052 : Datum změny
                    .addRow({ label: "jres:26275053" }).addField("gstringbox", { name: "zmenu_prov", disabled: true  }) //RC 26275053 : Změnu provedl
                    ;
                $("<div>").appendTo(this.element).gform("createFrom", Form);

                
                this.setniModel(true);
                this.updateReadOnly();
            },

            setniModel: function (povesitTrigger) {
                // setování modelu
                var that = this;
                var form = this.findForms();
                var fieldy = form.findFields();
                fieldy.gfield("model", "apply", this.dto);

                //validatory
                fieldy.gfield("model", "validators", this.validators);

                // potvrzení až bude setlej
                this.beginOperation();
                var promises = fieldy.map(function () { return $(this).gfield("getValueAsync"); })
                $.when.apply(null, promises).done(function () {
                    fieldy.gfield("confirm");
                    that.endOperation();
                    // reakce na změnu ve formuláři
                    if (povesitTrigger){
                        form.on("fieldchange", function (ev, changeObj) {
                            that.updateActionUlozit();
                        });
                    }
                    
                }); 

            },

            //#region updateActions

            updateActions: function () {
                this.updateActionUlozit();

            },
            
            updateReadOnly: function () {
                if (!this.Editace && !this.dto.EditEnabled) {
                    var fieldy = this.findForms().findFields();
                    fieldy.gfield("option","disabled", true);
                }
            },
         
            
            updateActionUlozit: function () {
                var that = this;
                if (this.findForms().gform("hasChanged")) {
                    this.actions.actUlozit.update({ enabled: true });
                } else {
                    this.actions.actUlozit.update({ enabled: false });
                }
            },

            ulozit: function () {
                var that = this;
                var isValid = this.findForms().gform("isValid");
                if (isValid) {
                    var fieldy = this.findForms().findFields();
                    fieldy.gfield("model", "collect", this.dto);
                    var promis = this.call("DoSaveData", {dto:this.dto})
                        .done(function (retVal) {
                            if (retVal) {
                                // nastavím změnu v datech v návratu z dialogu
                                that.returnValueFromDet = {
                                    dataChange: retVal.ixs_ssu
                                };
                                that.dto = retVal;
                                that.setniModel(true);
                                if (that.NovaSkupina) {
                                    that.tryClose();
                                }
                            }
                        });

                    this.actions.actUlozit.setPending(promis);
                }
            
            },

            
            //#endregion

            closing: function () { // podmineny userClose 
                var def = $.Deferred();
                if (this.returnValueFromDet) {
                    def.resolve(this.returnValueFromDet);
                } else {
                    def.resolve();
                }
                return def.promise();
            },


          

    }, { extendIntellisense: GContent });
    
       

});

   