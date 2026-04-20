(function ($) {
    "use strict";
    namespace("Gordic.Wfl.PREPRI", {
        logOptions: { name: 'Gordic.Wfl.WebClient.PredaniPrideleniDlg', fileName: 'PredaniPrideleniDlg.js', authorCode: 262 },

        cestaItems: [],
        isInit: true,

        funField: null,
        suField: null,
        cestaField: null,

        // nastaveni z US
        UkladatDruhUS: false,
        PouzitZodpovednouOsobuUS: false,
        DruhPredaniUS: "",
        DruhPrideleniUS: "",
        RediIxsSU: "",
        RediIxsFun: "",
        JePrednastavenySpisovyUzelMeziPovolenymi: false,

        retVal: null,

        onContentReady: function () {
            this.log.debug("Predani/prideleni - onContentReady ...");
            var _this = this;

            this.DruhPredaniUS = this.userSettings.get("LastDruhPredani");
            this.DruhPrideleniUS = this.userSettings.get("LastDruhPrideleni");

            // schvalovatel
            if (this.GinEpksredPar !== 0) {
                var ixsFunSchvalovatel = this.userSettings.get("IxsFunSchvalovatel");

                if (ixsFunSchvalovatel != null) {
                    this.model.IxsFunSchval = ixsFunSchvalovatel;
                }

                if (this.GinEpksredPar === 1) {
                    this.model.SchvalCheck = true;
                } else if (this.GinEpksredPar === 2) { // volitelne
                    var schvalitChecked = this.userSettings.get("SchvalitChecked");

                    if (schvalitChecked === true) {
                        this.model.SchvalCheck = true;
                    }
                }
            }

            this.LoadUserSettingsFromUserForm().then(function (rv) {
                _this.PrepareForm();
            });
        },

        PrepareForm: function () {
            var _this = this;

            this.menuBar([
                { action: this.actions.actOK, favorite: true, primary: !this.ZnovuPodani },
                { action: this.actions.actOKZnovupodani, favorite: true, primary: this.ZnovuPodani },
                { action: this.actions.actMoznosti, favorite: true },
                { action: this.actions.actSeznamTras, favorite: true },
            ]);

            this.commandBar([
                { action: this.actions.actOK, primary: !this.ZnovuPodani },
                { action: this.actions.actOKZnovupodani, primary: this.ZnovuPodani },
                { action: this.actions.actMoznosti },
                { action: this.actions.actSeznamTras },
                { action: this.actions.actCancel },
            ]);

            var l_sCilLabel = "";
            var l_sDuvodLabel = "";
            var l_sCestaDruhLabel = "";

            this.cestaItems = [];

            if (this.Ucel == Gordic.Wfl.Globals.Enums.UcelRedistribuce.PRIDELENI) {
                if (this.SslPridelPrpoPar == 1) {
                    this.cestaItems.push({ val: 0, label: "jres:26225450" }); //RC 26225450 : Přes podatelnu
                }
                this.cestaItems.push({ val: 1, label: "jres:26225451" }); //RC 26225451 : Přímo

                l_sCilLabel = "jres:26227117"; //RC 26227117 : Cíl přidělení
                l_sDuvodLabel = "jres:26225448";     //RC 26225448 : Důvod přidělení
                l_sCestaDruhLabel = "jres:26227989"; //RC 26227989 : Cesta
            } else {
                this.cestaItems.push({ val: 0, label: "jres:26225455" }); //RC 26225455 : Přímé předání v rámci uzlu
                this.cestaItems.push({ val: 1, label: "jres:26225456" }); //RC 26225456 : Přímé předání povoleným uzlům
                this.cestaItems.push({ val: 2, label: "jres:26225457" }); //RC 26225457 : Přímé osobní předání s potvrzením přebírajícího

                l_sCilLabel = "jres:26227116"; //RC 26227116 : Cíl předání
                l_sDuvodLabel = "jres:26225452"; //RC 26225452 : Důvod předání
                l_sCestaDruhLabel = "jres:26225454";  //RC 26225454 : Druh předání

                if (this.JePredplnenaTrasa) {
                    this.model.CestaSelectedValue = 2; // pokud je predplnena trasa, prednastavim Přímé osobní předání s potvrzením přebírajícího
                }
            }

            var chovaniStrediskaDleUcelu = this.Ucel == Gordic.Wfl.Globals.Enums.UcelRedistribuce.PREDANI ? Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.PREDANI : Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.PRIDELENI; 

            var form = new Gordic.Forms
                .Form({ name: "FormPREPRI", layoutDescriptor: "L2M2S2" })
                .addSection(l_sCilLabel)
                .addRow("jres:26225870").addField("gselectbox", "w-4", //RC 26225870 : Spisovému uzlu/funkci/osobě
                    Gordic.Gin.Fields.ginspodSSU(
                        {
                            name: "suField",
                            model: "IxsSu = ixs_su",
                            serverFilters: {
                                aktivita: [100],
                            },
                            change: function (ev, data) {
                                _this.SpisUzelChange(data.value);
                            }
                        }, chovaniStrediskaDleUcelu)
                )
                .addField("gselectbox", "w-8",
                    Gordic.Gin.Fields.ginsfunSSU(
                        {
                            name: "funField",
                            model: "IxsFun = ixs_fun",
                            serverFilters: {
                                aktivita: [100],
                                VazbaNaSpisovyDenik: this.SslPripreomezPar == 1,
                                ixs_su: new Gordic.Forms.Dependency("suField", "ixs_su", false),
                                GinvreuStUtajId: _this.FilterGinvreuStUtajId,
                            },
                            change: function (ev, data) {
                                _this.FunkceChange(data.value);
                            },
                            validators: [
                                {
                                    "message": "jres:26227470", //RC 26227470 : Zadejte funkční místo.
                                    "validate": function (value, changeObj) {

                                        if (_this.Ucel == Gordic.Wfl.Globals.Enums.UcelRedistribuce.PREDANI && value == null) {
                                            return false;
                                        }

                                        return true;
                                    },
                                    "group": "customValidation"
                                }
                            ],
                        }, chovaniStrediskaDleUcelu, "suField"))
                .addRow("jres:26227538").addField("gselectbox", "w-8", //RC 26227538 : Schvalovatel
                    Gordic.Gin.Fields.ginsfunSSU(
                        {
                            name: "schvalField",
                            model: "IxsFunSchval = ixs_fun",
                            serverFilters: {
                                aktivita: [100],
                                DlePovolenychFazi: _this.FilterSchvalovatelDlePovolenychFazi,
                            },
                            change: function (ev, data) {
                                _this.FunkceChange(data.value);
                            },
                            validators: [
                                {
                                    "message": "jres:26227539", //RC 26227539 : Zadejte schvalovatele
                                    "validate": function (value, changeObj) {
                                        var checkBoxSvalit = $.content(_this).findFields("SchvalCheck");

                                        if (checkBoxSvalit) {
                                            var schvalChecked = checkBoxSvalit.gfield("getValue");
                                            if (_this.GinEpksredPar !== 0 && schvalChecked && value == null) {
                                                return false;
                                            }
                                        }

                                        return true;
                                    },
                                    "group": "customValidation"
                                }
                            ],
                            customClass: "js-field-schvalovatel"
                        }, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO, "suField"))
                .addField("gcheck", "w-4", {
                    name: 'SchvalCheck',
                    label: "jres:26227543", //RC 26227543 : Schválit v EPK
                    enabled: _this.GinEpksredPar == 2,
                    change: function (ev, data) {
                       // var checked = data.value;

                        _this.SetAuthorizeCheck();
                    },
                    customClass: "gcheck-switch",
                })
                ;
 
            if(this.Ucel == Gordic.Wfl.Globals.Enums.UcelRedistribuce.PREDANI) {
                form.addRow(l_sDuvodLabel)
                    .addField("gstringbox", "w-12",
                    {
                        name: "duvodField",
                        model: "Duvod",
                        tagByValue:
                            _this.validators && _this.validators.Duvod && _this.validators.Duvod[0] && _this.validators.Duvod[0].max
                                ? Gordic.Prefabs.Field.charCounter(_this.validators.Duvod[0].max).tagByValue
                                : undefined
                    })
            } else {
                form.addPrefab(Gordic.Wfl.Prefabs.GDuvodyPrideleni(
                    this.userSettings,
                    {
                        name: "duvodField",
                        label: l_sDuvodLabel,
                        model: "Duvod = data",
                        validators: [
                            {
                                validate: function (value, source) {
                                    if(value && value.data && value.data.length > _this.validators.Duvod[0].max) {
                                        return false;
                                    }
                                    return true;
                                },
                                getMessage: function (value) {
                                    return "jres:26227889"; //RC 26227889 : Zadaný text je příliš dlouhý.
                                }
                            }
                        ],
                        tagByValue:
                            _this.validators && _this.validators.Duvod && _this.validators.Duvod[0] && _this.validators.Duvod[0].max
                                ? Gordic.Prefabs.Field.charCounter(_this.validators.Duvod[0].max).tagByValue
                                : undefined
                    }
                ));
            }

            form.addRow(l_sCestaDruhLabel).addField("gselectbox", "w-12", {
                    name: "cestaField",
                    customClass: "js-field-cesta",
                    //  initialValue: cestaItems[this.model.CestaSelectedValue],
                    //  model: "model.CestaSelectedValue = value.val",
                    dropdown: true,
                    itemTemplate: "{label}",
                    data: this.cestaItems,
                    change: function (ev, data) {
                        _this.DruhPredaniChanged(data.value);
                    }
            });

            if(this.Ucel == Gordic.Wfl.Globals.Enums.UcelRedistribuce.PREDANI) {
                form.addField("gcheck", "w-4", {
                    name: 'AuthorizeCheck',
                    label: "jres:26227966", //RC 26227966 : Vynutit autorizaci přebírajícího
                    enabled: false,
                    change: function (ev, data) {

                    },
                    customClass: "gcheck-switch",
                });
            }

            // vytvoření  formuláře    
            this.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", form);

            var fields = this.findFields();

            fields.gfield("model", "apply", this.model);

            if (this.validators) {
                fields.gfield("model", "validators", this.validators);
                Gordic.Utils.Form.markRequired(this.defaultForm);
            }

            this.funField = this.findFields("funField");
            this.suField = this.findFields("suField");
            this.cestaField = this.findFields("cestaField");
            this.schvalCheck = this.findFields("SchvalCheck");
            this.authorizeCheck = this.findFields("AuthorizeCheck");

            var selectedCesta = this.GetSelectedCesta();

            this.findFields("cestaField").gfield("setValue", selectedCesta); // nastaveni 1. polozky nebo dle ulozeneho nastaveni

            if(this.GinEpksredPar === 0) {
                $(".js-field-schvalovatel").gfield("disable");
                $(".js-field-schvalovatel").gformrow().hide();
            }

            //if (this.Ucel == Gordic.Wfl.Globals.Enums.UcelRedistribuce.PREDANI && selectedCesta.val === 0) { // dsebesta 15.07.2024 Sjednoceno chování viz ref T36024
                this.funField.gfield("focus");
            //} else {
            //    this.suField.gfield("focus");
            //}

            var authorizeChecked = this.DefaultValueAuthorizeCheck();
            this.authorizeCheck.gfield("model", "apply", { AuthorizeCheck: authorizeChecked }); // musím přes model, protože setValue() nezná, ačkoli je uvedeno v dokumentaci k GCheck.

            this.SetAuthorizeCheck();

            this.isInit = false;

            this.log.debug("Predani/prideleni - onContentReady DONE.");
        },
        LoadUserSettingsFromUserForm: function () {
            var def = $.Deferred();
            var that = this;

            this.UkladatDruhUS = this.globalSettings.get("Global.Wfl.AppSettings.PrideleniPredaniSettings.DruhPrePri") === true;
            this.RediIxsSU = this.globalSettings.get("Global.Wfl.AppSettings.PrideleniPredaniSettings.RediSU");
            this.RediIxsFun = this.globalSettings.get("Global.Wfl.AppSettings.PrideleniPredaniSettings.RediFun");

            if(this.Ucel == Gordic.Wfl.Globals.Enums.UcelRedistribuce.PREDANI) {
                var predplnitPosledniUzelPredani = this.globalSettings.get("Global.Wfl.AppSettings.PrideleniPredaniSettings.PredplnitPosledniUzelPredani") === true;
                var predplnitPosledniFunkciPredani = this.globalSettings.get("Global.Wfl.AppSettings.PrideleniPredaniSettings.PredplnitPosledniFunkciPredani") === true;

                // přepíše případné předchozí nastavení
                if(predplnitPosledniUzelPredani) {
                    this.RediIxsSU = this.userSettings.get("LastIxsSuPredani");
                }
                if(predplnitPosledniFunkciPredani) {
                    this.RediIxsFun = this.userSettings.get("LastIxsFunPredani");
                }

                // osetrim pripadnou nekonzistenci dvojice ixs, zpusobenou nevhodným nastavením
                if(predplnitPosledniUzelPredani && !predplnitPosledniFunkciPredani) {
                    this.RediIxsFun = "";
                } else if (!predplnitPosledniUzelPredani && predplnitPosledniFunkciPredani) {
                    this.RediIxsSU = "";
                }

                this.PouzitZodpovednouOsobuUS = this.globalSettings.get("Global.Wfl.AppSettings.PrideleniPredaniSettings.OdpovednaOsobaPredani") === true;
            } else {
                var predplnitPosledniUzelPrideleni = this.globalSettings.get("Global.Wfl.AppSettings.PrideleniPredaniSettings.PredplnitPosledniUzelPrideleni") === true;
                var predplnitPosledniFunkciPrideleni = this.globalSettings.get("Global.Wfl.AppSettings.PrideleniPredaniSettings.PredplnitPosledniFunkciPrideleni") === true;

                // přepíše případné předchozí nastavení
                if(predplnitPosledniUzelPrideleni) {
                    this.RediIxsSU = this.userSettings.get("LastIxsSuPrideleni");
                }
                if(predplnitPosledniFunkciPrideleni) {
                    this.RediIxsFun = this.userSettings.get("LastIxsFunPrideleni");
                }

                // osetrim pripadnou nekonzistenci dvojice ixs, zpusobenou nevhodným nastavením
                if (predplnitPosledniUzelPrideleni && !predplnitPosledniFunkciPrideleni) {
                    this.RediIxsFun = "";
                } else if (!predplnitPosledniUzelPrideleni && predplnitPosledniFunkciPrideleni) {
                    this.RediIxsSU = "";
                }

                this.PouzitZodpovednouOsobuUS = this.globalSettings.get("Global.Wfl.AppSettings.PrideleniPredaniSettings.OdpovednaOsobaPrideleni") === true;
            }

            // nastavim posledni vybrany druh predani/prideleni (v TK maji trochu jinak, ale dokud neexistuje nove uzivatelske nastaveni, tak nebudu resit)
            if (this.UkladatDruhUS === true) {
                if (this.Ucel == Gordic.Wfl.Globals.Enums.UcelRedistribuce.PREDANI && !this.JePredplnenaTrasa) { // zpusob predani prednastavuji jen pokud jiz neni predplnena nasledujici trasa
                    this.model.CestaSelectedValue = new Number(this.DruhPredaniUS);
                }
                if (this.Ucel == Gordic.Wfl.Globals.Enums.UcelRedistribuce.PRIDELENI) {
                    var l_sSavedCestaDokumentu = this.DruhPrideleniUS;
                    var l_nSelectedValue = 0;

                    if (l_sSavedCestaDokumentu != null) {
                        l_nSelectedValue = new Number(l_sSavedCestaDokumentu);
                    }

                    this.model.CestaSelectedValue = l_nSelectedValue;
                }
            }

            // predelat na promise, tady se to asyncronne rozjizdi
            if (this.RediIxsSU != null && this.RediIxsSU != "") {
                this.call(["JePovolenySpisovyUzel", { "IxsSu": this.RediIxsSU }])
                    .done(function (rv, content) {
                        that.JePrednastavenySpisovyUzelMeziPovolenymi = rv;

                        def.resolve();
                    })
                    .fail(function (rv, content) {
                        def.reject(rv);
                    });
            } else {
                def.resolve();
            }

            return def.promise();
        },
        AplikujUserSettingsFromUserForm: function () {
            this.DruhPredaniChanged(null);
        },
        OKClick: function () {
            // dodelat validaci required
            if (!this.defaultForm.gform("isValid")) {
                return;
            }

            var _this = this;
            this.findFields().gfield("model", "collect", this.model);

            // uchovam posledni vybrany druh predani/prideleni
            var lastDruhUserSettingId = "LastDruhPredani";
            var lastIxsSuSettingId = "LastIxsSuPredani";
            var lastIxsFunSettingId = "LastIxsFunPredani";

            if(this.Ucel == Gordic.Wfl.Globals.Enums.UcelRedistribuce.PRIDELENI) {
                lastDruhUserSettingId = "LastDruhPrideleni";
                lastIxsSuSettingId = "LastIxsSuPrideleni";
                lastIxsFunSettingId = "LastIxsFunPrideleni";
            }

            this.userSettings.set(lastDruhUserSettingId, this.model.CestaSelectedValue);
            this.userSettings.set(lastIxsSuSettingId, this.model.IxsSu);
            this.userSettings.set(lastIxsFunSettingId, this.model.IxsFun);

            if (this.GinEpksredPar === 2) {
                this.userSettings.set("IxsFunSchvalovatel", this.model.IxsFunSchval);
                this.userSettings.set("SchvalitChecked", this.model.SchvalCheck);
            }

            this.call(["OKClick", { "model": this.model }]).done(
                function (data, content) {
                    if (data.ScriptForExecute != "") {
                        var func = new Function(data.ScriptForExecute);
                        func.call(_this);
                    }
                }
            );
        },
        PotvrzeniPredani: function (behaviour, ixsfun) {
            var _this = this;

            this.model.IxsRefHidden = "";
            var options = {
                WinTitle: "jres:26225132",
                Behaviour: behaviour,
                IxsFun: ixsfun
            };
            var $div = Gordic.Wfl.Dialogs.OvereniPrebirajiciOsobyDlg(_this, options); //RC 26225132 : Zadejte identifikaci přebírající osoby

            $div.on("close", function (ev, retVal) {
                if (retVal) {
                    _this.model.IxsRefHidden = retVal;

                    _this.call(["PoOvereniClick", { "model": _this.model }]).done(
                        function (data, content) {
                            if (data.ScriptForExecute != "") {
                                //    _this.IxsFunPrebirajici = _this.model.IxsFun;

                                var func = new Function(data.ScriptForExecute);
                                func.call(_this);
                            }
                        }
                    );
                }
            });
        },
        ZnovupodaniClick: function () {
            var _this = this;

            this.call(["ZnovupodaniClick", { "model": this.model }]).done(
                function (data, content) {
                    if (data.ScriptForExecute != "") {
                        var func = new Function(data.ScriptForExecute);
                        func.call(_this);
                    }
                }
            );
        },
        DruhPredaniChanged: function (selectedItem) {
            var _this = this;
            var l_nSelectedDruhValue = this.findFields("cestaField").gfield("getValue");
   
            if(l_nSelectedDruhValue != null) {
                var l_nSelectedDruh = l_nSelectedDruhValue.val;

                this.model.CestaSelectedValue = l_nSelectedDruh;

                if(this.Ucel == Gordic.Wfl.Globals.Enums.UcelRedistribuce.PREDANI) {
                    var suFieldDisabled = false;
                    var funFieldDisabled = false;

                    this.suField.gfield("option", "serverFilters", $.extend(this.suField.gfield("option", "serverFilters"), { PovoleneSuUzlu: false }));
   
                    switch (l_nSelectedDruh) {
                        case 0: { // Přímé předání v rámci uzlu
                            var oldSuValue = this.suField.gfield("getValue");

                            this.suField.gfield("setValueFromKeys", this.IxsSuAkt)
                            this.funField.gfield("clear");
                            suFieldDisabled = true;

                            if (oldSuValue && oldSuValue.ixs_su == this.IxsSuAkt) {
                                // pokud nedojde ke změně SU nevolá se v políčku událost onChange, pak vyvolám nastavení FUN zde:
                                this.NastavZodpovednouOsobu(this.IxsSuAkt);
                            }

                            break;
                        }
                        case 1: { // Přímé předání povoleným uzlům                   
                            //this.funField.gfield("clear");

                            this.suField.gfield("clear");
                            this.suField.gfield("option", "serverFilters", $.extend(this.suField.gfield("option", "serverFilters"), { PovoleneSuUzlu: true }));

                            this.PrednastaveniPoliDleUS();

                            funFieldDisabled = this.suField.gfield("getValue") == null;
                            //funFieldDisabled = true;
                            break;
                        }
                        case 2: { // Přímé osobní předání s potvrzením přebírajícího
                            this.PrednastaveniPoliDleUS();
                            break;
                        }
                        default: break;
                    }

                    this.suField.gfield("option", { disabled: suFieldDisabled });
                    this.funField.gfield("option", { disabled: funFieldDisabled });
                } else {
                    var ixsSuValue = this.suField.gfield("getValue");
                    var suFieldIsEmpty = ixsSuValue == null;
                    
                    if(this.RediIxsSU && this.RediIxsSU != "" && suFieldIsEmpty) {
                        this.suField.gfield("setValueFromKeys", this.RediIxsSU); // nastavim prednastaveny SU
                    } else if (!suFieldIsEmpty) {
                        this.NastavZodpovednouOsobu();
                    }
                }

                this.SetAuthorizeCheck();
            }

        },
        PrednastaveniPoliDleUS: function (selectedItem) {
            var ixsSuValue = this.suField.gfield("getValue");
            var suFieldIsEmpty = ixsSuValue == null;

            if(this.RediIxsSU != null && this.RediIxsSU != "") {
                if(ixsSuValue != this.RediIxsSU) {
                    var l_nSelectedDruh = this.findFields("cestaField").gfield("getValue").val;
                    var flagPredani = this.Ucel == Gordic.Wfl.Globals.Enums.UcelRedistribuce.PREDANI;
                    var doSetSuField = true;

                    if(flagPredani && l_nSelectedDruh == 1 && this.JePrednastavenySpisovyUzelMeziPovolenymi !== true) {
                        doSetSuField = false;
                    }

                    if(doSetSuField) {
                        var oldSuValue = this.suField.gfield("getValue");

                        this.suField.gfield("setValueFromKeys", this.RediIxsSU); // nastavim prednastaveny SU
                        this.funField.gfield("clear");

                        if(oldSuValue && oldSuValue.ixs_su == this.RediIxsSU) {
                            // pokud nedojde ke změně SU nevolá se v políčku událost onChange, pak vyvolám nastavení FUN zde:
                            this.NastavZodpovednouOsobu(this.RediIxsSU);
                        }
                    }
                } else {
                    this.NastavZodpovednouOsobu();
                }
            } else if (!suFieldIsEmpty) {
                this.NastavZodpovednouOsobu();
            }
        },
        SpisUzelChange: function (selectedItem) {

            if(!selectedItem) {
                this.funField.gfield("clear");
            }
 
            if(this.Ucel == Gordic.Wfl.Globals.Enums.UcelRedistribuce.PREDANI) {
                if(this.cestaField !== null) {
                    var cestaValue = this.cestaField.gfield("getValue");
                    var funDisabled = false;
   
                    if (cestaValue != null && cestaValue.val == 1) { // povoleným uzlům
                        if(!selectedItem) {
                            funDisabled = true;
                        } else {
                            funDisabled = false;
                        }
                    } else {
                        funDisabled = false;
                    }

                    this.funField.gfield("option", { disabled: funDisabled });

                    //if(selectedItem == null) {
                    //    this.funField.gfield("option", { disabled: true });
                    //} else if(cestaValue != null && cestaValue.val == 1) { // povoleným uzlům
                    //    this.funField.gfield("option", { disabled: false });
                    //}
                }
            }

            this.NastavZodpovednouOsobu();
        },
        FunkceChange: function (selectedItem) {

            if(!selectedItem && this.kompCheck) {
                this.kompCheck.gfield("clear");
            }

        },
        NastavZodpovednouOsobu: function (proIxsSu) {
            // problém se setValues a následným getValues jsem obešel, ale dal by se řešit pomocí waitForValues findFields().gform("waitForValues").done
            if(proIxsSu == null) {
                var suValue = this.suField.gfield("getValue");

                if(suValue != null) {
                    proIxsSu = suValue.ixs_su;
                }
            }

            if(this.PouzitZodpovednouOsobuUS) { // dodelat nacteni prednastaveni zodpovedne osoby z US
                var _this = this;

                var funValue = this.funField.gfield("getValue");

                if(proIxsSu != null && funValue == null) {

                    this.call(["ZodpovednaOsobaZaSpisUzel", { "IxsSu": proIxsSu }]).done(
                        function(data, content) {
                            if(data.IxsFunZO != null && data.IxsFunZO != "" && data.IxsFunZO != "0000SF00000Z") {
                                _this.funField.gfield("setValueFromKeys", data.IxsFunZO);
                            }
                        }
                    );            
                }
            } else if(this.RediIxsFun != null && this.RediIxsFun != "") {
               // pouze pokud FUN patří k SU (uložené hodnoty v US by měly být spárovány)
                if (proIxsSu && proIxsSu == this.RediIxsSU) {
                   this.funField.gfield("setValueFromKeys", this.RediIxsFun);
               }
            }
        },
        TrasyDokumentu: function () {
            var that = this;

            var opt = {
                Ixp: this.Ixp,
                SelectRowEnabled: true
            };

            Gordic.Ssl.Dialogs.TrasyDokumentuDlg(this, opt, "navigate")
                .on("close", function (ev, retVal) {
                    if (retVal) {
                        // promazu pole, protoze u vyplneneho pole suField mi nafungovala dependancy pri setValue u funField
                        that.suField.gfield("clear");
                        that.funField.gfield("clear");

                        if(retVal.ixsFun) {
                            // pokud se vraci FUN, nastavim a provaze se mi to automaticky i na SU
                            that.funField.gfield("setValueFromKeys", retVal.ixsFun);
                        } else if (retVal.ixsSu) {
                            // pokud se vraci jen SUN, nastavim samotne SU
                            that.suField.gfield("setValueFromKeys", retVal.ixsSu);
                        }
                        // pozor, nemohu udelat synchronne po sobe, případně asynchronně az na promise...
                       

                        if(that.Ucel == Gordic.Wfl.Globals.Enums.UcelRedistribuce.PREDANI) {
                            that.model.CestaSelectedValue = 2;
                            that.cestaField.gfield("setValue", that.GetSelectedCesta());
                        }
                    }
                });

        },
        MoznostiAplikace: function () {
            var that = this;
            var forms = [Gordic.Wfl.AppSettings.PrideleniPredaniSettingsForm()];
            this.navigate([Gordic.WebApp.UserSettingsContent, { taskId: 'actUserSettings' }], { gstor: window.gstor, forms: forms }, { width: 800, height: 600 }).on("close", function (ev, retVal) {
                if(retVal && retVal.ulozeno === true) {
                    that.LoadUserSettingsFromUserForm().then(function (rv) {
                        that.AplikujUserSettingsFromUserForm();
                    });
                }
            });

        },
        SetAuthorizeCheck: function () {
            if(this.Ucel == Gordic.Wfl.Globals.Enums.UcelRedistribuce.PREDANI && this.authorizeCheck != null) {
                var selectedCesta = this.GetSelectedCesta();
                var schvalChecked = this.schvalCheck.gfield("getValue");

                if(this.SslAutPrePar == "bez" && selectedCesta.val === 2 && !schvalChecked) {
                    this.authorizeCheck.gfield("option", "disabled", false);
                } else {
                    var checked = this.DefaultValueAuthorizeCheck();
                    this.authorizeCheck.gfield("model", "apply", { AuthorizeCheck: checked }); // musím přes model, protože setValue() nezná, ačkoli je uvedeno v dokumentaci k GCheck.
                    this.authorizeCheck.gfield("option", "disabled", true);
                }
            }
        },
        DefaultValueAuthorizeCheck: function () {
            var selectedCesta = this.GetSelectedCesta();
            var schvalChecked = this.schvalCheck.gfield("getValue");

            return this.SslAutPrePar != "bez" && selectedCesta.val === 2 && !schvalChecked;
        },
        GetSelectedCesta: function () {
            var _this = this;
            var l_oSelectedCesta = this.cestaItems[0];
            this.cestaItems.forEach(function (entry) {
                if(entry.val == _this.model.CestaSelectedValue) {
                    l_oSelectedCesta = entry;
                }
            });
            return l_oSelectedCesta;
        },
        TiskProtokolu: function () {
            //this.actions.actTiskPredavaciProtokol.run();
            var that = this;
            var ImplicitneTisknoutPredProt = this.globalSettings.getDef(Gordic.Wfl.AppSettings.ImplicitneTisknoutPredProtSettingsKey, false);
            var DotazatSePredTiskem = this.globalSettings.getDef(Gordic.Wfl.AppSettings.DotazatSePredTiskemSettingsKey, false);
            if (ImplicitneTisknoutPredProt) {
                if (DotazatSePredTiskem) {
                    let l_sQuestion = "jres:26225153"; //RC 26225153 : Přejete si vytisknout předávací protokol?
                    that.dialogs.confirm("jres:23900131", l_sQuestion).on("closed", function (ev, retVal) { //RC 23900131 : Dotaz
                        if (retVal && retVal === "yes") {
                            if (that.actions.actTiskPredavaciProtokol) { 
                                that.actions.actTiskPredavaciProtokol.run();
                            }
                        } else {
                            that.tryClose();
                        }
                    });
                } else {
                    if (that.actions.actTiskPredavaciProtokol) {
                        that.actions.actTiskPredavaciProtokol.run();
                    }
                }
            } else {
                this.tryClose();
            }
          
        },
        TiskProtokoluReportRetreive: function (rep) {
            if(this.TypAgendy === Gordic.Wfl.Globals.Enums.TypAgendy.SSL || this.TypAgendy === Gordic.Wfl.Globals.Enums.TypAgendy.REG) {
                // SSL
                rep.params.X0000 = this.LogPorCislo;
                rep.params.X0001 = this.IxsFunAkt;
                rep.params.X0002 = this.model.IxsFun;
            } else {
                // EKO
                rep.params.X0000 = this.Predavajici;
                rep.params.X0001 = this.Prebirajici;
                rep.params.X0002 = this.TypAg;
                if (this.IsEkoInitialized) { // kvůli db na kterých není eko - např. MPO
                    rep.params.X0003 = this.Ico;
                    rep.params.X0004 = this.Ucs;
                    rep.params.X0005 = this.Nks;
                }
            }

            rep.params.Preselect = false;
        }, 
        SetRetValueSuccess: function () {
            var retVal = { provedeno: true };

            this.retVal = retVal;
        },

        closing: function () {  
            var def = $.Deferred();

            this.log.debug("Predani/prideleni - closing ...");
            
            if(this.retVal != null) {
                if(this.GroupResult != null) {
                    this.retVal.GroupResult = this.GroupResult;
                }

                this.log.debug("Predani/prideleni - closing: " + this.retVal);
                def.resolve(this.retVal);
            } else {
                this.log.debug("Predani/prideleni - closing bez rv");
                def.resolve();
            }
               
            return def.promise();
        },

  /*      upravRequiredNaFieldu: function (fieldName, required) {
            var that = this;

            //that.findFields(fieldName).gfield("option", "validators");
            that.findFields(fieldName).each(function (index, element) {
                var puvodniValidatory = $(element).gfield("option", "validators");
                var noveValidatory = puvodniValidatory.filter(function (Validator) {
                    that.log.debug("instance je ? ", Validator instanceof Gordic.Validators.Required);
                    return !(Validator instanceof Gordic.Validators.Required);
                });
                if (required) {
                    noveValidatory.push(new Gordic.Validators.Required());
                }
                $(element).gfield("option", "validators", noveValidatory);
            });
        },*/

    }, { pure: true });
})(jQuery);