(function ($) {
    "use strict";
    namespace("Gordic.Ada.WebClient.GDatovaVetaCnt", {
        title: "Detail zápisu",

        onContentReady: function () {
            
            var formPrefab = Gordic.Eko.WebClient.GDatovaVetaPrefab(this, { mode: "" }); // získání prefabu formuláře

            var _this = this;
            this.defaultForm = new Gordic.Forms
                .Form({ name: "PrefabForm" });

            // IČO - prefab ekosico
            if (!this.hideColumns || this.hideColumns.indexOf("ico") === -1) {
                this.defaultForm.addRow("IČO").addField("gselectbox", {
                    name: "ico",
                    customClass: "porizovacConfig",
                    model: "ico=",
                    change: function (ev, obj) {
                        _this.changeConfig(); console.log("zmena ico");
                    }
                }, Gordic.Prefabs.Select.ekosico());
            }

            // UCS - prefab ekosucs
            if (!this.hideColumns || this.hideColumns.indexOf("ucs") === -1) {
                var ico = this.model && this.model.ico ? this.model.ico : null;
                this.defaultForm.addRow("UCS").addField("gselectbox", {
                    name: "ucs",
                    customClass: "porizovacConfig",
                    change: function (ev, obj) {
                        _this.changeConfig(); console.log("zmena ucs");
                    },
                    serverFilters: { ico: ico },
                    model: "model.ucs=value.ucs,model.ico=value.ico"
                }, Gordic.Prefabs.Select.ekosucs());
            }

            // NKS - prefab ekosnks
            if (!this.hideColumns || this.hideColumns.indexOf("nks") === -1) {
                var ico = this.model && this.model.ico ? this.model.ico : null;
                this.defaultForm.addRow("NKS").addField("gselectbox", {
                    name: "nks",
                    customClass: "porizovacConfig",
                    change: function (ev, obj) {
                        _this.changeConfig(); console.log("zmena nks");
                    },
                    serverFilters: { ico: ico },
                    model: "model.nks=value.nks,model.ico=value.ico"
                }, Gordic.Prefabs.Select.ekosnks());
            }

            // Rok
            if (!this.hideColumns || this.hideColumns.indexOf("rok") === -1) {
                this.defaultForm.addRow("Rok").addField("gnumberbox", {
                    name: "rok",
                    customClass: "porizovacConfig",
                    change: function (ev, obj) {
                        _this.changeConfig(); console.log("zmena rok");
                    }
                });
            }
                   
            // Mesic
            if (!this.hideColumns || this.hideColumns.indexOf("mesic") === -1) {
                this.defaultForm.addRow("Měsíc").addField("gnumberbox", {
                    name: "mesic",
                    customClass: "porizovacConfig",
                    change: function (ev, obj) {
                        _this.changeConfig(); console.log("zmena mesic");
                    }
                });
            }

            // Den
            if (!this.hideColumns || this.hideColumns.indexOf("den") === -1) {
                this.defaultForm.addRow("Den").addField("gnumberbox", {
                    name: "den",
                    customClass: "porizovacConfig",
                    change: function (ev, obj) {
                        _this.changeConfig(); console.log("zmena den");
                    }
                });
            }

            // Drd
            if (!this.hideColumns || this.hideColumns.indexOf("drd") === -1) {
                this.defaultForm.addRow("Drd").addField("gnumberbox", {
                    name: "drd",
                    customClass: "porizovacConfig",
                    change: function (ev, obj) {
                        _this.changeConfig(); console.log("zmena drd");
                    }
                });
            }

            this.defaultForm.addPrefab(formPrefab)                      // Přidání datové věty - prefab formulářů
                .addRow("MD").addField("gnumberbox",  { name: "c0" })   // MD
                .addRow("DAL").addField("gnumberbox", { name: "c1" });  // DAL


            this.commandBar([{
                customClass: "g-button--primary",
                action: new GAction({
                    name: "actOk",
                    caption: GDlg.mbbOk.text,
                    run: function (ev, obj) {
                        if (_this.isValid()) {                                  // když je validní
                            var dto = {};
                            //var dto2 = this.model;
                            _this.findFields().gfield("model", "collect", dto); // vybere data z polí
                            _this.call("TryToSave", { model: dto, modelold: _this.model })
                                .done(function (data) {                         // test - volání metody s DTO
                                    console.info("vracene dto");
                                    console.info(data);
                                    _this.close();
                                }); 
                        }
                    }
                })
            }]);

            this.defaultForm.appendTo(this.element); 
            this.findFields().gfield("model", "apply", this.model, { initialValues: true }); // aplikování modelu

            // inicializace datove vety
            var datovaVetaValues = {};
            this.findFields(".gporizovacfield").gfield("model", "collect", datovaVetaValues);// sběr hodnot
            this.loadInitValueToDatovaVeta(datovaVetaValues);                                // načtení hodnot do datové věty
            this.initReadOnlyFields();                                                       // nastavení polí podle datové věty
            
            
            if (this.datovaVeta.hasMDDal)   // má-li datová věta MD, DAL, nastavení MD DAL podle datové věty
            {
                //this.datovaVeta.drd = 1; // pro testování, má vliv na Bupsrr
                this.dataService
                    .call("SetMDDalFields", { poradi: this.datovaVeta.lastDatSlovo.Poradi, uroven: this.datovaVeta.lastDatSlovo.UrovenNum, datovaVeta: this.datovaVeta })
                    .done(function (fields) {
                        _this.setMDDalFields(fields.md, fields.dal);
                    });
            }
            
        }, 
        
        changeConfig: function () // při změně ico, nks, ucs, rok dojde nastavení reverifikace pro vsechny porizovaci pole
        {
            var fields = this.findFields(".gporizovacfield");
            var fieldIndex;
            var fieldLength = fields.length;
            for (fieldIndex = 0; fieldIndex < fieldLength; fieldIndex++)
            {
                $(fields[fieldIndex]).gporizovacfield("setReverifyState", false);
            }
        }





    }, { extendIntellisense: GContent });
})(jQuery);



