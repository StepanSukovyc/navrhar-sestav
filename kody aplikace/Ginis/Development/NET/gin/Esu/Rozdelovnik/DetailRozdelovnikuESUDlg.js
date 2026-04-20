$(function () {
        "use strict";
        
        namespace("Gordic.Esu.WebClient.DetailRozdelovnikuESUDlg", {

            onContentReady: function () {

                var that = this;
                this.newOps({ title: "jres:31900252" });
                console.log("dto", this.dto);

                var Form = new Gordic.Forms.Form({
                    name: "form",
                    layoutDescriptor: "L1M1S1, L-4-8-0, M-12-12-0, S-12-12-0"
                })
                    .addSection()
                    .addRow({ label: "jres:26265146" }).addField("gstringbox", { name: "Nazev", }) //RC 26265146 : Název
                    .addRow({ label: "jres:31900260" }).addField("gselectbox", Gordic.Prefabs.Select.gincrzd(), //RC 31900260 : Typ skupiny
                        {
                            name: "TypRzd",
                            model: "model.TypRzd=value.typ_rzd",
                            disabled: this.dto.TypRzd === 2 ? true: false,
                            serverFilters: {
                                typ_rzd: this.Editace ? [1, 0] : null

                            },
                            change: function (ev, ChObj) {
                                that.upravFormPodleRZD();
                            }

                        })
                    .addSection()
                    .addRow({ label: "jres:26265268" }).addField("gstringbox", { name: "Poznamka", }) //RC 26265268 : Poznámka
                    

                    
                if (this.pravoSkupinyEsuEditovatVlastnikaANacitatVsechnySkupiny && ((this.dto.TypRzd === 0) || (this.dto.TypRzd === 1))) {
                    //this.dto.TypRzd === 0
                    Form
                        .addRow("jres:31900261")//RC 31900261 : Vlastnik skupiny
                        .addField("gselectbox",
                            Gordic.Gin.Fields.ginsfunSSU({
                                name: "IxsVlastnikFU",
                                model: "IxsVlastnikFU = ixs_fun",
                                //serverFilters: {
                                //    aktivita: [100],
                                //    //VazbaNaSpisovyDenik: this.SslPripreomezPar == 1,
                                //    //ixs_su: new Gordic.Forms.Dependency("suField", "ixs_su", false),
                                //    //GinvreuStUtajId: _this.FilterGinvreuStUtajId,
                                //}
                            }, false)
                            ,{
                                disabled: !this.pravoSkupinyEsuEditovatVlastnikaANacitatVsechnySkupiny,
                                serverFilters: {  // pozor přetěžuji všechny severfiltry z políčka !!!! Třeba střediska
                                    aktivita: [100],
                                    PridruzenaStrediska: false,
                                    DlePovolenychAgend: false
                                }
                            }
                        );

                     //this.dto.TypRzd === 1
                    Form
                        .addRow("jres:31900261")//RC 31900261 : Vlastnik skupiny
                        .addField("gselectbox", 
                            Gordic.Gin.Fields.ginspodSSU({
                                name: "IxsVlastnikSU",
                                model: "IxsVlastnikSU = ixs_su",
                                //serverFilters: {
                                //    aktivita: [100],
                                //},
                            }, false)
                            ,{
                                disabled: !this.pravoSkupinyEsuEditovatVlastnikaANacitatVsechnySkupiny,
                                serverFilters: {  
                                    aktivita: [100],
                                    PridruzenaStrediska: false  
                                }
                            }
                    );
                } else {
                    Form.addRow({ label: "jres:31900261" }).addField("gstringbox", {
                        name: "Vlastnik", disabled: true
                    }) //RC 31900261 : Vlastnik skupiny
                }
                
                
                Form
                    .addRow({ label: "jres:26265272" }).addField("gdatebox", { name: "DatZmena", disabled: true  }) //RC 26265272 : Datum změny
                    .addRow({ label: "jres:26265161" }).addField("gstringbox", { name: "ZmenuProv", disabled: true  }) //RC 26265161 : Změnu provedl
                    ;
                $("<div>").appendTo(this.element).gform("createFrom", Form);

                
                this.setniModel(true);
                this.updateReadOnly();
                this.upravFormPodleRZD();

                //nefunguje pro vytvoření pro organizaci =>dodělej to 
            },

            upravFormPodleRZD: function () {
                
                if (this.pravoSkupinyEsuEditovatVlastnikaANacitatVsechnySkupiny) {
                    var typRzdFiledVal = this.findFields("TypRzd").gfield("getValue");
                    if (typRzdFiledVal != null && typRzdFiledVal.typ_rzd != null) {
                        var filedIxsVlastnikFU = this.findFields("IxsVlastnikFU");
                        var filedIxsVlastnikSU = this.findFields("IxsVlastnikSU");
                        if (typRzdFiledVal.typ_rzd == 0) {
                            filedIxsVlastnikFU.gformrow().show();
                            filedIxsVlastnikSU.gformrow().hide();
                        } else if (typRzdFiledVal.typ_rzd == 1) {
                            filedIxsVlastnikFU.gformrow().hide();
                            filedIxsVlastnikSU.gformrow().show();
                        }

                    }
                }

            },

            setniModel: function (povesitTrigger) {
                // setování modelu
                var that = this;
                var form = this.findForms();
                var fieldy = form.findFields();

                this.dto.IxsVlastnikFU = this.dto.IxsVlastnik;
                this.dto.IxsVlastnikSU = this.dto.IxsVlastnik; 

                fieldy.gfield("model", "apply", this.dto);

                //validatory
                fieldy.gfield("model", "validators", this.validators);
                // potvrzení až bude setlej
                this.beginOperation();
                var promises = fieldy.map(function () { return $(this).gfield("getValueAsync"); })
                $.when.apply(null, promises).done(function () {
                    fieldy.gfield("confirm");
                    that.endOperation();
                    that.upravFormPodleRZD();
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
                if (!this.Editace) {
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
                    if (this.pravoSkupinyEsuEditovatVlastnikaANacitatVsechnySkupiny) {
                        var typRzdFiledVal = this.findFields("TypRzd").gfield("getValue");
                        if (typRzdFiledVal != null && typRzdFiledVal.typ_rzd != null) {
                            if (typRzdFiledVal.typ_rzd == 0) {
                                this.dto.IxsVlastnik = this.dto.IxsVlastnikFU
                            } else if (typRzdFiledVal.typ_rzd == 1) {
                                this.dto.IxsVlastnik = this.dto.IxsVlastnikSU
                            }
                        }
                    }


                    var promis = this.call("DoSaveData", {dto:this.dto})
                        .done(function (retVal) {
                            if (retVal) {
                                // nastavím změnu v datech v návratu z dialogu
                                that.returnValueFromDet = {
                                    dataChange: retVal.IxsRzd
                                };
                                that.dto = retVal;
                                that.setniModel(true);
                                that.tryClose();
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

   