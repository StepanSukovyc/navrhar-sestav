(function ($) {

    var Prefabs = namespace("Gordic.Esu.Prefabs");
    
    //#region adresa string 
    Prefabs.adresa = function (userOpt) {
        //var that = this;
        var defOptions = {
            serverFilters: true,
            change: null,
            pathInModel: "model.adresa",
            DbCulture: null // asi nikde nepoužito, tak neřeším. 
        };

        
        var options = $.extend({}, defOptions, userOpt);
        var funkceChange = function (ev, changeObj) {
            if (options.change) {
                options.change(ev, changeObj);
            }
        };
        var ModelBezModel = null;
        if (options.pathInModel && options.pathInModel.indexOf("model.") === 0) {
            ModelBezModel = options.pathInModel.substr(6) + ".";
        } else if (options.pathInModel && options.pathInModel.indexOf("model") === 0) {
            ModelBezModel = "";
        } else if (options.pathInModel && options.pathInModel === "") {
            ModelBezModel = "";
        } else {
            ModelBezModel = options.pathInModel + ".";
        }
        // string version
        var adresaFormString = new Gordic.Forms
            .Form({ name: "HlavniForm", layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0, breaks-500-1000" })

            .addRow("jres:31900377").addField("gselectbox", "w-8", Gordic.Prefabs.Select.szrsuli(), { //RC 31900377 : Ulice, Čp, Č.or.
                name: "ulice",
                strict: false,
                model: options.pathInModel + ".ulice=value.ulice_kod; " + options.pathInModel + ".ulice=value.ulice_nazev",  //ulice_nazev // vysvětleno
                invalidTransform: function (strValue) {
                    if (typeof strValue === "string") {
                        return { ulice_nazev: strValue }; // vratime data ve formatu v jakem je policko zvykle
                    }
                    return strValue; // vratime puvodni hodnotu pro pripad, ze si s ni verifikace nejak poradi
                },
                verify: function (strValue) {
                    return strValue;
                },
                change: function (ev, changeObj) { funkceChange(ev, changeObj); }
            })
            .addField("gstringbox", "w-2", {
                name: "cPop", placeholder: 'jres:31900523', //RC 31900523 : Č.p
                model: options.pathInModel + ".cPop=value",
                change: function (ev, changeObj) { funkceChange(ev, changeObj); }
            })
            .addField("gstringbox", "w-2", {
                name: "cOr", placeholder: 'jres:31900524', //RC 31900524 : Č.or
                model: options.pathInModel + ".cOr=value",
                change: function (ev, changeObj) { funkceChange(ev, changeObj); }
            })
            .addRow("jres:26265235").addField("gselectbox", Gordic.Prefabs.Select.szrsobc(), { //RC 26265235 : Část obce
                name: "castObce",
                strict: false,
                model: options.pathInModel + ".castObce=value.cast_obce_kod; " + options.pathInModel + ".castObce=value.cast_obce_nazev", // možná trochu podivný zápis ale je to zde kuli aktivaci vlastní funkce verify nastavuju i klíč
                verificationNeeded: true,
                invalidTransform: function (strValue) {
                    if (typeof strValue === "string") {
                        return { cast_obce_nazev: strValue }; // vratime data ve formatu v jakem je policko zvykle
                    }
                    return strValue; // vratime puvodni hodnotu pro pripad, ze si s ni verifikace nejak poradi
                },
                verify: function (strValue) {
                    return strValue;
                },
                change: function (ev, changeObj) { funkceChange(ev, changeObj); }
            })
            .addRow("jres:31900378").addField("gselectbox", "w-4", { //RC 31900378 : PSČ, obec
                name: "psc",
                strict: false,
                invalidTransform: function (strValue) {
                    if (typeof strValue === "string") {
                        return { psc: strValue, stat: 42 }; // vratime data ve formatu v jakem je policko zvykle
                    }
                    return strValue; // vratime puvodni hodnotu pro pripad, ze si s ni verifikace nejak poradi
                },

                model: function (operation, dto, modelOptions) {
                    switch (operation) {
                        
                        case "apply":
                            var val = Utils.getValueByKeyPath(ModelBezModel + "psc", dto, null);
                            if (val) {
                                $(this).gfield("setValue", { psc: val, stat: Utils.getValueByKeyPath(ModelBezModel + "stat", dto, null) }, { valid: false, initialValue: modelOptions.initialValues ? true : false });
                            } return; // naplneni gcheck z DTO
                        case "collect": val = $(this).gfield("getValue");
                            if (val) {
                                Utils.setValueByKeyPath(ModelBezModel + "psc", dto, $.trim(val.psc));
                            } else Utils.setValueByKeyPath(ModelBezModel + "psc", dto, null);
                            return;
                        default: return "psc"; // model="checkValue" pro operace kterym nerozumime (validations, validators, ...)
                    }
                },
                modelOptions: { initialValues: true }, // nevyvolá se change při model apply
                serverFiltersOn: options.serverFilters,
                change: function (ev, changeObj) {
                    if (changeObj.value && changeObj.value.psc && $(ev.currentTarget).gfield("option", "serverFiltersOn")) {
                        $(ev.currentTarget).gform().findFields("obec").gfield("option", "serverFilters", { psc: changeObj.value.psc });
                    } else {
                        $(ev.currentTarget).gform().findFields("obec").gfield("option", "serverFilters", { psc: null });
                    }
                    funkceChange(ev, changeObj);
                }
            }, Gordic.Prefabs.Select.ginspsc(options.DbCulture === 10 ? { props: { menuBar: { model: { stat: "235", aktivita: 100 } } } } : undefined)) //ginspsc 
            .addField("gselectbox", "w-8", Gordic.Prefabs.Select.ginspso(), { //szrsobe
                name: "obec",
                strict: false,
                model: function (operation, dto, modelOptions) {
                    switch (operation) {
                        case "apply":
                            var val = Utils.getValueByKeyPath(ModelBezModel + "obec", dto, null);
                            if (val) {
                                $(this).gfield("setValue",
                                    { psc: Utils.getValueByKeyPath(ModelBezModel + "psc", dto, null), obec: val, stat: Utils.getValueByKeyPath(ModelBezModel + "stat", dto, null) },
                                    { valid: false, initialValue: modelOptions.initialValues ? true : false });
                            } return;
                        case "collect": val = $(this).gfield("getValue");
                            if (val) {
                                Utils.setValueByKeyPath(ModelBezModel + "obec", dto, $.trim(val.obec));
                            } else Utils.setValueByKeyPath(ModelBezModel + "obec", dto, null);
                            return; // naplneni DTO hodnotou z gcheck
                        default: return "obec"; // model="checkValue" pro operace kterym nerozumime (validations, validators, ...)
                    }
                },
                invalidTransform: function (strValue) {
                    if (typeof strValue === "string") {
                        return { obec: strValue }; // vratime data ve formatu v jakem je policko zvykle
                    }
                    return strValue; // vratime puvodni hodnotu pro pripad, ze si s ni verifikace nejak poradi
                },
                serverFiltersOn: options.serverFilters,
                change: function (ev, changeObj) {
                    if (changeObj.value && changeObj.value.obec_kod && $(ev.currentTarget).gfield("option", "serverFiltersOn")) {
                        $(ev.currentTarget).gform().findFields("castObce,ulice").gfield("option", "serverFilters", { obec_kod: changeObj.value.obec_kod });
                    } else {
                        $(ev.currentTarget).gform().findFields("castObce,ulice").gfield("option", "serverFilters", { obec_kod: null });
                    }
                    funkceChange(ev, changeObj);
                }
            })
            .addRow("jres:31900379").addField("gstringbox", { //RC 31900379 : P.O. Box
                name: "pobox",
                model: options.pathInModel + ".pobox=value",
                change: function (ev, changeObj) { funkceChange(ev, changeObj); }
            })
            .addRow("jres:26265294").addField("gselectbox", { //RC 26265294 : Stát
                name: "stat",
                model: options.pathInModel + ".stat=value.stat",
                initialValues: 42,
                change: function (ev, changeObj) { funkceChange(ev, changeObj); }
            }, Gordic.Prefabs.Select.gincsta());


        return adresaFormString.form.sections["0"].rows;
    };

    Prefabs.vyberEsu = function (userOpt) {

        var defOptions = {
            //model: null,
            //name: "VyberEsu",
            typ: 3,
            Logovani: null, //{ Ixp: '', DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.xxx, AktZnacka: '', DuvodHledaniTxt:"" }
            FieldsToFilterpanel: null,
            IdSimpleMode: null , // "DefaultKartotekaID", // přepne otevírání kartotéky do simpemodu to znamená že filterpanel bude v režimu bez ukládání
            VyberEsuTypItemTemplateOpt: 0,

            InsolvecneButtonEnable:true,
            IszrButtonEnable: true,
            DPHButtonEnable: true,
            EditmodeDetailEsuEnable: true, // zda povolit otevření detailu v editačním modu když je políčko editovatelné
            BuButtonEnable: false,

            StrictEnableChangeZoInDisabled: false,  // povolí měnit Zástupnou osobu i v disabled modu políčka,
            ModOtevreni: null,
            DataToFilterPanel: null,
            VyberESUDialogClose: null // eventa, která informuje, že dialog otevřený z políčka esu byl zavřený => na základě toho lze předpokládat, že mohlo dojít ke změně dat ESU. 
        };
       
        var options = $.extend({}, defOptions, userOpt);

        if (options.Logovani == null || options.Logovani.Ixp == null || options.Logovani.DuvodHledani == null || options.Logovani.AktZnacka == null) {
            GDlg.warning("Novinka", "Pro použití tohoto políčka je nutné zadat logovací údaje:  minimum je: <br>   Gordic.Esu.Prefabs.vyberEsu({ Logovani: { Ixp: '', DuvodHledani: enum, AktZnacka: ''DuvodHledaniTxt:'' }})");
            return {};
        }

        var vyberESUDialogClose = function (opt, retVal, field) {
            if (options != null && options.VyberESUDialogClose) {
                options.VyberESUDialogClose(opt, retVal);
                field.trigger("vyberESUDialogClose", { opt: opt, retVal: retVal })
            }
        }

        var vytahejKlice = function (puvodniPole, novePole) {
            $(puvodniPole).each(function (index, element) {
                var obj = {};
                obj.ixs_esu = element.ixs_esu;
                obj.lic = element.lic;
                obj.por_zast = element.por_zast;
                novePole.push(obj);
            });

        };
        var vytahejKliceHybrid = function (puvodniPole, novePole) {
            $(puvodniPole).each(function (index, element) {
                var obj = {};
                obj.ixs_esu = element.IxsEsu;
                obj.lic = element.Lic;
                obj.por_zast = element.Poradi;
                novePole.push(obj);
            });

        };
        var isNovaNehybridniAplikace = $("body").hasClass("gwebapp");
        var otevriDetailEsuTemp = function (content, opt) {
            if (isNovaNehybridniAplikace) {
                return Gordic.Esu.Dialogs.DetailEsuDlg(content, opt, options.ModOtevreni);
            } else {
                OtevriDetailEsu(opt.IxsEsu);
            }
        };
   
        var otevriDialogSeZastupnymaOsobamaTemp = function (field, ucel, ixs_esu, Logovani, por_zast) {
            var content = $.content(field);
            var promis = $.Deferred();
            if (isNovaNehybridniAplikace) {
                Gordic.Esu.Utils.OtevriDialogSeZastupnymaOsobama(content, ucel, ixs_esu, Logovani, por_zast,null)
                    .done(function (retval) {
                        vyberESUDialogClose({ type: "Zastup" }, retval, field);
                        promis.resolve(retval);
                    })
                    .fail(function () {
                        promis.reject();
                    });
                
            } else {
                OtevriESUZastupneOsoby(true).on("close", function (ev, retVal) {
                    if (retVal) {
                        
                        var esuobj = {};
                        esuobj.ixs_esu = retVal.IxsEsu;
                        esuobj.lic = retVal.Lic;
                        esuobj.por_zast = retVal.Poradi;
                        var newRetVal = { subjekty: [esuobj] };
                        promis.resolve(newRetVal);

                        //if (retVal.Poradi == null) {
                        //    odhro.AdresatTextBox.value = retVal.EsuTxt;
                        //    odhro.IxsAdresatHidden.value = retVal.IxsEsu;
                        //    odhro.ZastupOsobaTextBox.value = "";
                        //} else {
                        //    odhro.AdresatTextBox.value = retVal.EsuTxt;
                        //    odhro.IxsAdresatHidden.value = retVal.IxsEsu + "," + retVal.Poradi + "," + retVal.Lic;
                        //    odhro.ZastupOsobaTextBox.value = retVal.ZastTXT;
                        //}

                    }
                });
            }

            return promis;
        };
        
        // itemtemplate 
        var mainItemTemplate = function (value) {
            var retString = "";
            if (value && value.nazev === "PrekorcenLimitMaxLIMITLIMITLIMIT") {
                retString = "<i>" + "jres:31900684" + "</i>"; //RC 31900684 : Překročen povolený limit nalezených záznamů. Dospecifikujte prosím vyhledávaný text.
            }
            else if (value) {
                var isZastup = false;
                var pipe = false;
                var p = function () { // funkce pro návrat Pipe
                    if (pipe === false) {
                        pipe = true;
                        return "";
                    } else {
                        return " "; // |
                    }
                };
                if (value.por_zast != null) { isZastup = true; }
                if (value.anonymizovano) {
                    retString = "<div class='fa fa-user-secret g-state-text g-state-warning microfoto' style='float:left'></div>"
                        + "<div style='overflow: hidden;text-overflow: ellipsis;white-space: nowrap;'>" + "jres:31900525 <br>"; //RC 31900525 : Anonymizováno
                    retString = retString + "<i>jres:31900293 " + value.ur_pri + ".</i>";  //RC 31900293 : Potřebná úroveň přístupu je
                    retString = retString + "</div>";
                }
                else if (!isZastup) {
                    retString = "<div style='display: flex; justify-content: space-between; align-items: flex-start;'>";

                    retString = retString + "<div class='gi gi-user microfoto' style='flex-shrink: 0;'></div>";

                    retString = retString + "<div style='flex-grow: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'>" + value.esu_txt + "<br>";
                    if (value.ico && $.trim(value.ico)) { retString = retString + "<i> " + p() + "jres:26265288: " + value.ico + "</i>"; } //RC 26265288 : IČO
                    if (value.dic && $.trim(value.dic)) { retString = retString + "<i> " + p() + "jres:32100016: " + value.dic + "</i>"; } //RC 32100016 : DIČ
                    if (value.rc && $.trim(value.rc)) { retString = retString + "<i> " + p() + "jres:31900526: " + value.rc + "</i>"; } //RC 31900526 : RČ
                    if (value.stat_txt) { retString = retString + "<i> " + p() + "jres:26265294: " + value.stat_txt + "</i>"; } //RC 26265294 : Stát
                    retString = retString + "</div>";

                    retString = retString + "</div>";
                }
                else {
                    retString = "<div style='display: flex; justify-content: space-between; align-items: flex-start;'>";

                    retString = retString + "<div class='gi gi-users microfoto' style='lex-shrink: 0;'></div>";

                    retString = retString + "<div style='flex-grow: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'>" + value.esu_txt + "<br>";
                    if (value.zast_txt) { retString = retString + "jres:31900527: " + p() + value.zast_txt; } //RC 31900527 : Zástup
                    else { retString = retString + "jres:31900527: " + p(); } //RC 31900527 : Zástup
                    if (value.ico && $.trim(value.ico)) { retString = retString + "<i> " + p() + "jres:26265288: " + value.ico + "</i>"; } //RC 26265288 : IČO
                    if (value.dic && $.trim(value.dic)) { retString = retString + "<i> " + p() + "jres:32100016: " + value.dic + "</i>"; } //RC 32100016 : DIČ
                    if (value.rc && $.trim(value.rc)) { retString = retString + "<i> " + p() + "jres:31900526: " + value.rc + "</i>"; } //RC 31900526 : RČ
                    if (value.stat_txt) { retString = retString + "<i> " + p() + "jres:26265294: " + value.stat_txt + "</i>"; } //RC 26265294 : Stát
                    retString = retString + "</div>";

                    retString = retString + "</div>";

                }
            }
            else
            {
                retString = "<div>jres:31900294</div>"; //RC 31900294 : Subjekt nebyl nalezen nebo nemáte dostatečnou úroveň oprávnění.
            }
            return $(retString);

        };

        var mainHelperItemTemplate = function (value) {
            var retString = "";
            if (value && value.nazev === "PrekorcenLimitMaxLIMITLIMITLIMIT") {
                retString = "<i>" + "jres:31900684" + "</i>"; //RC 31900684 : Překročen povolený limit nalezených záznamů. Dospecifikujte prosím vyhledávaný text.
            }
            else if (value) {
                var isZastup = false;
                var pipe = false;
                var p = function () { // funkce pro návrat Pipe
                    if (pipe === false) {
                        pipe = true;
                        return "";
                    } else {
                        return " "; // |
                    }
                };
                if (value.por_zast != null) { isZastup = true; }
                if (value.anonymizovano) {
                    retString = "<div class='fa fa-user-secret g-state-text g-state-warning microfoto' style='float:left'></div>"
                        + "<div style='overflow: hidden;text-overflow: ellipsis;white-space: nowrap;'>" + "jres:31900525 <br>"; //RC 31900525 : Anonymizováno
                    retString = retString + "<i>jres:31900293 " + value.ur_pri + ".</i>";  //RC 31900293 : Potřebná úroveň přístupu je
                    retString = retString + "</div>";
                }
                else if (!isZastup) {
                    retString = "<div style='display: flex; justify-content: space-between; align-items: flex-start;'>";

                    retString = retString + "<div class='gi gi-user microfoto' style='flex-shrink: 0;'></div>";

                    retString = retString + "<div style='flex-grow: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'>" + value.esu_txt + "<br>";
                    if (value.ico && $.trim(value.ico)) { retString = retString + "<i> " + p() + "jres:26265288: " + value.ico + "</i>"; } //RC 26265288 : IČO
                    if (value.dic && $.trim(value.dic)) { retString = retString + "<i> " + p() + "jres:32100016: " + value.dic + "</i>"; } //RC 32100016 : DIČ
                    if (value.rc && $.trim(value.rc)) { retString = retString + "<i> " + p() + "jres:31900526: " + value.rc + "</i>"; } //RC 31900526 : RČ
                    if (value.stat_txt) { retString = retString + "<i> " + p() + "jres:26265294: " + value.stat_txt + "</i>"; } //RC 26265294 : Stát
                    retString = retString + "</div>";

                    if (options.BuButtonEnable && value.bu_exist != null && value.bu_exist > 0) { retString = retString + "<div class='fa fa-university microfoto' style='flex-shrink: 0;'></div>"; }

                    retString = retString + "</div>";
                }
                else {
                    retString = "<div style='display: flex; justify-content: space-between; align-items: flex-start;'>";

                    retString = retString + "<div class='gi gi-users microfoto' style='lex-shrink: 0;'></div>";

                    retString = retString + "<div style='flex-grow: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'>" + value.esu_txt + "<br>";
                    if (value.zast_txt) { retString = retString + "jres:31900527: " + p() + value.zast_txt; } //RC 31900527 : Zástup
                    else { retString = retString + "jres:31900527: " + p(); } //RC 31900527 : Zástup
                    if (value.ico && $.trim(value.ico)) { retString = retString + "<i> " + p() + "jres:26265288: " + value.ico + "</i>"; } //RC 26265288 : IČO
                    if (value.dic && $.trim(value.dic)) { retString = retString + "<i> " + p() + "jres:32100016: " + value.dic + "</i>"; } //RC 32100016 : DIČ
                    if (value.rc && $.trim(value.rc)) { retString = retString + "<i> " + p() + "jres:31900526: " + value.rc + "</i>"; } //RC 31900526 : RČ
                    if (value.stat_txt) { retString = retString + "<i> " + p() + "jres:26265294: " + value.stat_txt + "</i>"; } //RC 26265294 : Stát
                    retString = retString + "</div>";

                    if (options.BuButtonEnable && value.bu_exist != null && value.bu_exist > 0) { retString = retString + "<div class='fa fa-university microfoto' style='flex-shrink: 0;'></div>"; }

                    retString = retString + "</div>";

                }
            }
            else {
                retString = "<div>jres:31900294</div>"; //RC 31900294 : Subjekt nebyl nalezen nebo nemáte dostatečnou úroveň oprávnění.
            }
            return $(retString);

        };

        var itemTooltipTemplateFunc = function (value) {
            var retString = "";
            if (value && value.nazev === "PrekorcenLimitMaxLIMITLIMITLIMIT") {
                retString = "jres:31900684"; //RC 31900684 : Překročen povolený limit nalezených záznamů. Dospecifikujte prosím vyhledávaný text.
            }
            else if (value) {
                var isZastup = false;                
                if (value.por_zast != null) { isZastup = true; }

                if (value.anonymizovano) {
                    retString = "jres:31900525" + "<br>" ; //RC 31900525 : Anonymizováno
                    retString = retString + "jres:31900293 " + value.ur_pri + ".";  //RC 31900293 : Potřebná úroveň přístupu je
                }
                else if (!isZastup) {
                    retString = value.esu_txt + "<br>";
                    if (value.ico && $.trim(value.ico)) { retString = retString + "<i> " +  "jres:26265288: " + value.ico + "</i><br>"; } //RC 26265288 : IČO
                    if (value.dic && $.trim(value.dic)) { retString = retString + "<i> " +  "jres:32100016: " + value.dic + "</i><br>"; } //RC 32100016 : DIČ
                    if (value.rc && $.trim(value.rc)) { retString = retString + "<i> " + "jres:31900526: " + value.rc + "</i><br>"; } //RC 31900526 : RČ
                    if (value.stat_txt) { retString = retString + "<i> " +  "jres:26265294: " + value.stat_txt + "</i>"; } //RC 26265294 : Stát
                }
                else {
                    retString = value.esu_txt + "<br>";
                    if (value.zast_txt) { retString = retString + "jres:31900527: " + value.zast_txt + " <br>" } //RC 31900527 : Zástup
                    if (value.ico && $.trim(value.ico)) { retString = retString + "<i> " + "jres:26265288: " + value.ico + "</i><br>"; } //RC 26265288 : IČO
                    if (value.dic && $.trim(value.dic)) { retString = retString + "<i> " + "jres:32100016: " + value.dic + "</i><br>"; } //RC 32100016 : DIČ
                    if (value.rc && $.trim(value.rc)) { retString = retString + "<i> " + "jres:31900526: " + value.rc + "</i><br>"; } //RC 31900526 : RČ
                    if (value.stat_txt) { retString = retString + "<i> "+ "jres:26265294: " + value.stat_txt + "</i>"; } //RC 26265294 : Stát
                }
            }
            else {
                retString = "<i>jres:31900294</i>"; //RC 31900294 : Subjekt nebyl nalezen nebo nemáte dostatečnou úroveň oprávnění.
            }
            return retString;

        };
        
        // itemtemplate 
        var oneRowItemTemplate = function (value) {
            var retString = "";
            if (value && value.nazev === "PrekorcenLimitMaxLIMITLIMITLIMIT") {
                retString = "<i>" + "jres:31900684" + "</i>"; //RC 31900684 : Překročen povolený limit nalezených záznamů. Dospecifikujte prosím vyhledávaný text.
            }
            else if (value) {
                var isZastup = false;
                var pipe = false;
                var p = function () { // funkce pro návrat Pipe
                    if (pipe === false) {
                        pipe = true;
                        return "";
                    } else {
                        return "| ";
                    }
                };
                
                if (value.por_zast != null) { isZastup = true; }
                if (value.anonymizovano) {
                    retString = "<b>jres:31900525</b> "; //RC 31900525 : Anonymizováno
                    retString = retString + "<i>jres:31900293 " + value.ur_pri + ".</i>";  //RC 31900293 : Potřebná úroveň přístupu je
                } else if (!isZastup) {
                    retString = "<b>" + value.esu_txt + "</b> ";
                    if (value.ico && $.trim(value.ico)) { retString = retString + "<i> " + p() + "jres:26265288: " + value.ico + "</i>"; } //RC 26265288 : IČO
                    if (value.dic && $.trim(value.dic)) { retString = retString + "<i> " + p() + "jres:32100016: " + value.dic + "</i>"; } //RC 32100016 : DIČ
                    if (value.rc && $.trim(value.rc)) { retString = retString + "<i> " + p() + "jres:31900526: " + value.rc + "</i>"; } //RC 31900526 : RČ
                    if (value.stat_txt) { retString = retString + "<i> " + p() + "jres:26265294: " + value.stat_txt + "</i>"; } //RC 26265294 : Stát

                } else {
                    retString =  value.esu_txt + " ";
                    if (value.zast_txt) { retString = retString + "jres:31900527: <b> " + p() + value.zast_txt + "</b>"; } //RC 31900527 : Zástup
                    if (value.ico && $.trim(value.ico)) { retString = retString + "<i> " + p() + "jres:26265288: " + value.ico + "</i>"; } //RC 26265288 : IČO
                    if (value.dic && $.trim(value.dic)) { retString = retString + "<i> " + p() + "jres:32100016: " + value.dic + "</i>"; } //RC 32100016 : DIČ
                    if (value.rc && $.trim(value.rc)) { retString = retString + "<i> " + p() + "jres:31900526: " + value.rc + "</i>"; } //RC 31900526 : RČ
                    if (value.stat_txt) { retString = retString + "<i> " + p() + "jres:26265294: " + value.stat_txt + "</i>"; } //RC 26265294 : Stát
                }
            }
            else {
                retString = "<b>jres:31900294</b>"; //RC 31900294 : Subjekt nebyl nalezen nebo nemáte dostatečnou úroveň oprávnění.

            }
            return $(retString);

        };

        var aktualizujHodnotyEsu = function (puvodniValue, noveValue, field, ixs_esuOteviranehoDetailu) {

            field.gfield('clear', {
                triggerChange: false
            });
            if (field.gfield("option", "multi")) {

                // remove object
                var removeIndex = puvodniValue.map(function (item) { return item.ixs_esu; }).indexOf(ixs_esuOteviranehoDetailu);
                puvodniValue.splice(removeIndex, 1);

                puvodniValue.push(noveValue);

                field.gfield('setValue', puvodniValue, {
                    valid: false,
                });
            } else {
                field.gfield('setValue', noveValue, {
                     valid: false,
                     //triggerChange: false
                 });
            }
              
        }

        var najdiObjektvDatech = function (data, ixs_esu) {
            if (Array.isArray(data)) {
                var ret = $.grep(data, function (e) { return e.ixs_esu == ixs_esu; });
                if (ret && ret.length > 0) {
                    return ret[0];
                } else {
                    return {}
                }
            } else {
                return data;
            }
            
        }

        var jePovolenoZobrazeniKartotekyBezVazbyNaDokument = Gordic.Esu.Function.jePovolenoZobrazeniKartotekyBezVazbyNaDokument(options.Logovani.Ixp, null);


        var getButtonDetail = function (value) {
            var buttonDetail = new GAction({
                name: "actDetail",
                icon: "gi-detail",
                tooltip: "jres:31901243", //RC 31901243 : Detail ESU ve jmenném rejstříku
                // customClass: "g-link--no-underline g-state-text",
                run: function (event, obj) {
                    event.preventDefault();
                    var opt = {
                        IxsEsu: value.ixs_esu,
                        Ucel: 1,
                        Logovani: options.Logovani
                    };
                    var field = $(obj.field);
                    var fieldDetEnabled = !field.gfield("option", "disabled");
                    if (options.EditmodeDetailEsuEnable && fieldDetEnabled) {
                        opt.Ucel = 2;
                    }
                   
                    otevriDetailEsuTemp($.content(field), opt)
                        .on("closed", function (ev, retVal) {
                            vyberESUDialogClose({ type: "DetailESU" }, retVal, field);
                            if (retVal && retVal.ulozeno) {
                                if (Gordic.Utils.WidgetExists("gfield", field)) {
                                    if (retVal.data) {
                                        var puvodniValue = field.gfield("getValue");
                                        aktualizujHodnotyEsu(
                                            puvodniValue,
                                            {
                                                ixs_esu: retVal.data.IxsEsu,
                                                lic: najdiObjektvDatech(puvodniValue, value.ixs_esu).lic,
                                                por_zast: najdiObjektvDatech(puvodniValue, value.ixs_esu).por_zast
                                            },
                                            field,
                                            value.ixs_esu
                                        );

                                    }
                                }
                            }
                        });
                }
            });
            return buttonDetail;


        }

        var getButtonZastupy = function (value) {
            var buttonZastupny = new GAction({
                name: "actZo",
                icon: "gi-group",
                tooltip: "jres:31900528", //RC 31900528 : Výběr zastupné osoby
                // customClass: "g-link--no-underline g-state-text",
                run: function (event, obj) {
                    event.preventDefault();
                    var ucel = options.typ;
                    var field = $(obj.field);
                    if (field.gfield("option", "disabled") && (options.StrictEnableChangeZoInDisabled === false)) {
                        ucel = 1;
                    }
                    otevriDialogSeZastupnymaOsobamaTemp(field, ucel, value.ixs_esu, options.Logovani, value.por_zast)
                        .then(function (retVal) { //stav,zprava
                            if (retVal && retVal.subjekty && retVal.subjekty.length === 1 && Gordic.Utils.WidgetExists("gfield", field)) {
                                var puvodniPole = [];
                                var oldVal = field.gfield("getValue");
                                vytahejKlice(oldVal, puvodniPole);
                                var zastup = retVal.subjekty[0];
                                $(puvodniPole).each(function (index, puvodni) {
                                    if (zastup.ixs_esu === puvodni.ixs_esu && value.por_zast === puvodni.por_zast) { // pokud steejné ixsesu a stejný puvodní element
                                        puvodni.lic = zastup.lic;
                                        puvodni.por_zast = zastup.por_zast;
                                    }
                                });

                                if (options.typ >= 3) {
                                    field.gfield("option", "oldLength", puvodniPole.length + 1);
                                    field.gfield("setValue", puvodniPole, { valid: false });
                                    field.gfield("option", "oldLength", puvodniPole.length);
                                } else if (puvodniPole.length === 1) {
                                    field.gfield("setValue", puvodniPole[0], { valid: false });
                                }

                            }
                        });
                }
            });
            return buttonZastupny;
        }

        var getButtonInsolvence = function (value) {
            var buttonInsolvence = new GAction({
                name: "actIns",
                icon: "gi-ir",
                //caption: "Zastupné osoby",
                tooltip: value.insolvence == "Zobrazit nenalezeno."
                    ? "jres:31900896" //RC 31900896 : Insolvenční rejstřík
                    : "jres:31901232" + " " + value.insolvence, //RC 31901232 : Stav insolvenčního řízení:
                customClass: value.insolvence == "Zobrazit nenalezeno." ? "g-state-text g-state-inactive" : "g-state-text g-state-important",
                run: function (ev,obj) {
                    ev.preventDefault();
                    var field = $(obj.field);
                    var l_oJSONPars = {
                        ixs_esu: value.ixs_esu,
                        Logovani: options.Logovani
                    };
                    var opt = {
                        filter: l_oJSONPars
                    };
                    Gordic.Esu.Dialogs.GSeznamInsolvenceDlg($.content(field), opt, options.ModOtevreni)
                        .done(function (retval) {
                            vyberESUDialogClose({ type: "Insolvence" }, retval, field);
                    });
                }

            });
            return buttonInsolvence;
        };

        var getbuttonIszr = function (value) {
            var buttonIszr = null;
            var ico = undefined;
            switch (value.iszr) {
                case 1:  // overeno iszr
                    ico = "gi-iszr";
                    break;
                case 2:  // overeno správcem
                    ico = "gi-ias";
                    break;
                default: // neovereno
            }
            if (ico != null) {
                buttonIszr = new GAction({
                    name: "actSzr",
                    icon: ico,
                    tooltip: value.iszrTxt,
                    run: function (ev) {
                        ev.preventDefault();
                    }

                });
            }
            return buttonIszr;
        }

        var getbuttonBu = function (value) {
            var buttonBu = null;
            
            if (options.BuButtonEnable && value.bu_exist != null && value.bu_exist > 0) {
                buttonBu = new GAction({
                    name: "actBu",
                    icon: "fa-university",
                    tooltip: "Subjekt má bankovní účty.",
                    run: function (ev) {
                        ev.preventDefault();
                    }

                });
            }
            return buttonBu;
        }

        var getbuttonNeaktualniVerze = function (value) {
            var buttonNeaktualniVerze = null;
            
            if (value != null && value.ixs_prev != null && value.ixs_prev != "" && value.ixs_esu !== value.ixs_prev) {
                buttonNeaktualniVerze = new GAction({
                    name: "actNeaktualniVerze",
                    icon: "fa-exclamation-triangle g-state-text g-state-warning",
                    tooltip: "jres:31901284", //RC 31901284 : Existuje nová verze ESU
                    run: function (ev, obj) {
                        ev.preventDefault();
                        var field = $(obj.field);
                        var opt = {
                            IxsEsu: value.ixs_prev,
                            Ucel: 1,
                            Logovani: options.Logovani
                        };
                        otevriDetailEsuTemp($.content(field), opt)
                    }

                });
            }
            return buttonNeaktualniVerze;
        } 

        var getbuttonMulti = function (value) {
            var buttonMulti = null;


            var butChildren = [
                {
                    action: new GAction({
                        name: "actPredplnitESU",
                        caption: "Předplnit ESU aktuální verzí",
                        enabled: value != null && value.ixs_prev != null && value.ixs_prev != "" && value.ixs_esu !== value.ixs_prev,
                        run: function (ev, ctx) {
                            ev.preventDefault();
                            var field = $(ctx.field); 
                            var content = $.content(field)
                            var fieldDisabled = field.gfield("option", "disabled");
                            if (fieldDisabled) {
                                GDlg.warning("Pozor", "Políčko není v editačním režimu.");
                                return;
                            }

                            if (value != null && value.ixs_prev != null && value.ixs_prev != "" && value.ixs_esu !== value.ixs_prev) {

                                var novePole = [];

                                //sezbírání starých dat
                                var OldVal = field.gfield("getValue");
                                vytahejKlice(OldVal, novePole);

                                var fieldFlags = { valid: false };
                                for (var i = 0; i < novePole.length; i++) {
                                    if (novePole[i].ixs_esu == value.ixs_esu) {
                                        novePole[i].ixs_esu = value.ixs_prev;
                                    }
                                }

                                if (options.typ >= 3) {
                                    field.gfield("option", "oldLength", novePole.length + 1);

                                    field.gfield("setValue", novePole, fieldFlags);
                                    field.gfield("option", "oldLength", novePole.length);

                                } else if (novePole.length > 0) {
                                    field.gfield("setValue", novePole[0], fieldFlags);
                                }
                                

                            }

                        }
                    })
                },
            ]

            
            buttonMulti = {
                id:"actButtonMulti",
                type: "static",                        
                caption: "",
                icon: "gi-menu", /*  */
                menuActivationIcon: false,
                //tooltip: "",
                children: butChildren
            };





            /*
            new GAction({
            name: "actMulti",
            icon: "fa-university",
            tooltip: "Subjekt má bankovní účty.",
            run: function (ev) {
                ev.preventDefault();
            }

            });
            */
            return buttonMulti;
        }

        var getbuttonPrizDph = function () {
            var buttonPrizDph = new GAction({
                name: "actPrizDph",
                icon: "gi-dph",
                tooltip: "jres:31900900", //RC 31900900 : Subjekt je plátcem DPH
                // customClass: "g-state-text g-state-important",
                run: function (ev) {
                    ev.preventDefault();
                }

            });
            return buttonPrizDph;
        }

        var getbuttonAktivita = function () {
            var buttonAktivita = new GAction({
                name: "actAktivita300",
                icon: "gi-exclam",
                //caption: "Zastupné osoby",
                tooltip: "jres:31900295", //RC 31900295 : Zpracování osobních údajů bylo pozastaveno z důvodu hlášeného rozporu, kontaktujte správce kartotéky.
                customClass: "g-state-text g-state-important",
                run: function (ev) {
                    jQuery.noop();
                }

            });
            return buttonAktivita;
        }

        var updatebuttonsSingleFiled = function (field) {
            smazatSingleButtonsNaFieldu(field);

            field.off("fieldchange.changeNaVyberuEsu");
            field.on("fieldchange.changeNaVyberuEsu", function (ev, changeObj) {
                var value = field.gfield("getValue");
                if (value == null) {
                    smazatSingleButtonsNaFieldu(field);
                }
            });

            var value = field.gfield("getValue");

            if (value) {

                var buttonMulti = getbuttonMulti(value);
                field.gfield("addButton", buttonMulti); 

                var buttonDetail = getButtonDetail(value);
                field.gfield("addButton", { id: "actDetail", action: buttonDetail }); 

                if (options.typ > 1 && value.num_zast != null && value.num_zast > 0 && !value.anonymizovano) {
                    var buttonZastupny = getButtonZastupy(value);
                    field.gfield("addButton", { id: "actZo", action: buttonZastupny }); 
                }

                if (options.InsolvecneButtonEnable && value.insolvence && !value.anonymizovano) {
                    var buttonInsolvence = getButtonInsolvence(value);
                    field.gfield("addButton", { id: "actIns", action: buttonInsolvence }); 
                }

                if (!value.anonymizovano) {
                    var buttonNeaktualniVerze = getbuttonNeaktualniVerze(value);
                    if (buttonNeaktualniVerze) {
                        field.gfield("addButton", {
                            id: buttonNeaktualniVerze.name,
                            action: buttonNeaktualniVerze
                        });
                    }
                }


                if (value.aktivita === 300) {
                    var buttonAktivita = getbuttonAktivita();
                    field.gfield("addState", {
                        id: buttonAktivita.name,
                        icon: buttonAktivita.icon,
                        customClass: buttonAktivita.customClass,
                        tooltip: buttonAktivita.tooltip
                    });
                }

                if (options.DPHButtonEnable && value.priz_dph != null && value.priz_dph > 0 && !value.anonymizovano) {
                    var buttonPrizDph = getbuttonPrizDph(value);
                    field.gfield("addState", {
                        id: buttonPrizDph.name,
                        icon: buttonPrizDph.icon,
                        //customClass: "g-state-success",
                        tooltip: buttonPrizDph.tooltip
                    });
                }

                if (options.IszrButtonEnable && value.iszr != null && !value.anonymizovano) {
                    var buttonIszr = getbuttonIszr(value);
                    if (buttonIszr) {
                        field.gfield("addState", {
                            id: buttonIszr.name,     
                            icon: buttonIszr.icon,
                            //customClass: "g-state-success",
                            tooltip: buttonIszr.tooltip
                        });
                    }
                }

               
                if (!value.anonymizovano) {
                    var buttonBu = getbuttonBu(value);
                    if (buttonBu) {
                        field.gfield("addState", {
                            id: buttonBu.name,
                            icon: buttonBu.icon,
                            //customClass: "g-state-success",
                            tooltip: buttonBu.tooltip
                        });
                    }
                }
            }
        };

        

        var smazatSingleButtonsNaFieldu = function (fieldInFun) {
            fieldInFun.gfield("getButton", "actButtonMulti").remove();
            fieldInFun.gfield("getButton", "actDetail").remove();
            fieldInFun.gfield("getButton", "actZo").remove();
            fieldInFun.gfield("getButton", "actIns").remove();
            fieldInFun.gfield("getButton", "actNeaktualniVerze").remove();
            fieldInFun.gfield("getState", "actSzr").remove(); 
            fieldInFun.gfield("getState", "actPrizDph").remove(); 
            fieldInFun.gfield("getState", "actAktivita300").remove(); 
            fieldInFun.gfield("getState", "actBu").remove(); 
        }

        var itemCreatedFunSingle = function (ev, div, value, index, btnAddDelegate) {
            // radek pro otevreni rovnou na click
            var that = this;
            var field = $(this);
            if (value == null || !Gordic.Utils.WidgetExists("gfield", field)) { return; }


            updatebuttonsSingleFiled(field);
        }


        var itemCreatedFunMulti = function (ev, div, value, index, btnAddDelegate) {
            // radek pro otevreni rovnou na click
            var that = this;
            var field = $(this);
            if (value == null || !Gordic.Utils.WidgetExists("gfield", field)) { return; }

            var isZastup = false;

            if (value.por_zast != null) { isZastup = true; }

            // je zde kuli automatickému otvíráníé detailu aby se poznalo kterápoložka byla naposled přidána či zda byla nějaká přidána 
            var allValue = field.gfield("getValue");
            var oldLength = field.gfield("option", "oldLength");
            if (oldLength == null) { oldLength = -1; }

            /*
            //tlačítko detailu
            var buttonDetail = new GAction({
                name: "actDetail",
                icon: "gi-detail",
                tooltip: "jres:26265426", //RC 26265426 : Detail ESU
                // customClass: "g-link--no-underline g-state-text",
                run: function (event, obj) {
                    event.preventDefault();
                    var opt = {
                        IxsEsu: value.ixs_esu,
                        Ucel: 1,
                        Logovani: options.Logovani
                    };
                    var field = $(obj.field);
                    var fieldDetEnabled = !field.gfield("option", "disabled");
                    if (options.EditmodeDetailEsuEnable && fieldDetEnabled) {
                        opt.Ucel = 2;
                    }

                    otevriDetailEsuTemp($.content(field), opt)
                        .on("closed", function (ev, retVal) {
                            if (retVal && retVal.ulozeno) {
                                if (Gordic.Utils.WidgetExists("gfield", field)) {
                                    if (retVal.data) {
                                        var puvodniValue = field.gfield("getValue");
                                        aktualizujHodnotyEsu(
                                            puvodniValue,
                                            {
                                                ixs_esu: retVal.data.IxsEsu,
                                                lic: najdiObjektvDatech(puvodniValue, value.ixs_esu).lic,
                                                por_zast: najdiObjektvDatech(puvodniValue, value.ixs_esu).por_zast
                                            },
                                            field,
                                            value.ixs_esu
                                        );

                                    }
                                }
                            }
                        });
                }
            });
            */
            var buttonMulti = getbuttonMulti(value);
            btnAddDelegate(buttonMulti);

            var buttonDetail = getButtonDetail(value);
            btnAddDelegate(buttonDetail);
            //    }
            //});




            if (options.typ > 1 && value.num_zast != null && value.num_zast > 0 && !value.anonymizovano) {
            
                /*
                var buttonZastupny = new GAction({
                    name: "actZo",
                    icon: "gi-group",
                    tooltip: "jres:31900528", //RC 31900528 : Výběr zastupné osoby
                    // customClass: "g-link--no-underline g-state-text",
                    run: function (event) {
                        event.preventDefault();
                        var ucel = options.typ;
                        if (field.gfield("option", "disabled") && (options.StrictEnableChangeZoInDisabled === false)) {
                            ucel = 1;
                        }
                        otevriDialogSeZastupnymaOsobamaTemp($.content(that), ucel, value.ixs_esu, options.Logovani, value.por_zast)
                            .then(function (retVal) { //stav,zprava
                                if (retVal && retVal.subjekty && retVal.subjekty.length === 1 && Gordic.Utils.WidgetExists("gfield", field)) {
                                    var puvodniPole = [];
                                    var oldVal = field.gfield("getValue");
                                    vytahejKlice(oldVal, puvodniPole);
                                    var zastup = retVal.subjekty[0];
                                    $(puvodniPole).each(function (index, puvodni) {
                                        if (zastup.ixs_esu === puvodni.ixs_esu && value.por_zast === puvodni.por_zast) { // pokud steejné ixsesu a stejný puvodní element
                                            puvodni.lic = zastup.lic;
                                            puvodni.por_zast = zastup.por_zast;
                                        }
                                    });

                                    if (options.typ >= 3) {
                                        field.gfield("option", "oldLength", puvodniPole.length + 1);
                                        field.gfield("setValue", puvodniPole, { valid: false });
                                        field.gfield("option", "oldLength", puvodniPole.length);
                                    } else if (puvodniPole.length === 1) {
                                        field.gfield("setValue", puvodniPole[0], { valid: false });
                                    }

                                }
                            });
                    }
                });
                */
                var buttonZastupny = getButtonZastupy(value);
                btnAddDelegate(buttonZastupny);
            }
            //otevre detail insolvence  po kliku na detailovou ikonku
            if (options.InsolvecneButtonEnable && value.insolvence && !value.anonymizovano) {
               /*
                var buttonInsolvence = new GAction({
                    name: "actIns",
                    icon: "gi-ir",
                    //caption: "Zastupné osoby",
                    tooltip: value.insolvence == "Zobrazit nenalezeno." ? "jres:31900896" : value.insolvence, //RC 31900896 : Insolvenční rejstřík
                    customClass: value.insolvence == "Zobrazit nenalezeno." ? "g-state-text g-state-inactive" : "g-state-text g-state-important",
                    run: function (ev) {
                        ev.preventDefault();
                        var l_oJSONPars = {
                            ixs_esu: value.ixs_esu,
                            Logovani: options.Logovani
                        };
                        var opt = {
                            filter: l_oJSONPars
                        };
                        Gordic.Esu.Dialogs.GSeznamInsolvenceDlg($.content(field), opt);
                    }

                });
                */
                var buttonInsolvence = getButtonInsolvence(value);
                btnAddDelegate(buttonInsolvence);

            }

            //Iszr ikona

            if (options.IszrButtonEnable && value.iszr != null && !value.anonymizovano) {
                /*
                var ico = undefined;
                switch (value.iszr) {
                    case 1:  // overeno iszr
                        ico = "gi-iszr";
                        break;
                    case 2:  // overeno správcem
                        ico = "gi-ias";
                        break;
                    default: // neovereno
                }
                if (ico != null) {
                    var buttonIszr = new GAction({
                        name: "actSzr",
                        icon: ico,
                        tooltip: value.iszrTxT,
                        // customClass: "g-state-text g-state-important",
                        run: function (ev) {
                            ev.preventDefault();
                            //var l_oJSONPars = {
                            //    ixs_esu: value.ixs_esu,
                            //    Logovani: options.Logovani
                            //};
                            //var opt = {
                            //    filter: l_oJSONPars
                            //}
                            //Gordic.Esu.Dialogs.GSeznamInsolvenceDlg($.content(field), opt);
                        }

                    });
                    //    }
                    //});
                    btnAddDelegate(buttonIszr);
                }
                */
                var buttonIszr = getbuttonIszr(value);
                if (buttonIszr) {
                    btnAddDelegate(buttonIszr);
                }
            }

            //Bu ikona

            if (!value.anonymizovano) {
                var buttonBu = getbuttonBu(value);
                if (buttonBu) {
                    btnAddDelegate(buttonBu);
                }
            }

            if (!value.anonymizovano) {
                var buttonNeaktualniVerze = getbuttonNeaktualniVerze(value);
                if (buttonNeaktualniVerze) {
                    btnAddDelegate(buttonNeaktualniVerze);
                }
            }

            //priz_dph
            if (options.DPHButtonEnable && value.priz_dph != null && value.priz_dph > 0 && !value.anonymizovano) {
                /*
                var buttonPrizDph = new GAction({
                    name: "actPrizDph",
                    icon: "gi-dph",
                    tooltip: "jres:31900900", //RC 31900900 : Subjekt je plátcem DPH
                    // customClass: "g-state-text g-state-important",
                    run: function (ev) {
                        ev.preventDefault();
                    }

                });
                */
                var buttonPrizDph = getbuttonPrizDph(value);
                btnAddDelegate(buttonPrizDph);
            }

            // aktivita 300

            if (value.aktivita === 300) {
                /*
                var buttonAktivita = new GAction({
                    name: "actAktivita300",
                    icon: "gi-exclam",
                    //caption: "Zastupné osoby",
                    tooltip: "jres:31900295", //RC 31900295 : Zpracování osobních údajů bylo pozastaveno z důvodu hlášeného rozporu, kontaktujte správce kartotéky.
                    customClass: "g-state-text g-state-important",
                    run: function (ev) {
                        jQuery.noop();
                    }

                });
                */
                var buttonAktivita = getbuttonAktivita();
                btnAddDelegate(buttonAktivita);
            }
        };

        var FormiFilterSelectGinSesu =
            new Gordic.Forms.Form({})
            .addSection()
            .addRow().addField("gselectbox",
            jePovolenoZobrazeniKartotekyBezVazbyNaDokument ? Gordic.Prefabs.Select.ginsesuPol(options.Logovani.Ixp) : { data: new Gordic.Data.View([{}], { key: "ixs_esu" })}
            //Gordic.Prefabs.Select.ginsesuPol(options.Logovani.Ixp)
            , { 
                multi: options.typ < 3 ? false : true,
                //name: options.name,
                //model:options.model,
                //disabled: !jePovolenoZobrazeniKartotekyBezVazbyNaDokument, // dsebesta T28953   odebráno dělalo problémy, když si definují vlastní disabled, tak jim to přebíjelo.
                helperColumns: jePovolenoZobrazeniKartotekyBezVazbyNaDokument ? undefined: null,
                customClass: "js-vyberEsu",
                serverFastFilterSupport: true,
                clientFilterEvaluator: false,
                graphicInput: "oninput", // oninput always
                filterMinLength :3,
                helperChoice: function (value) {
                    $(this).gfield("setValue", value, { valid: false });
                },
                verify: jePovolenoZobrazeniKartotekyBezVazbyNaDokument ? undefined:  function (value) {
                    return null;
                },
                //verify: function (value) {
                    
                //    if (Array.isArray(value)) {
                //        $(value).each(function (index,element) {
                //            if (element && !element.ixp)
                //                element.ixp = options.Logovani.Ixp;
                //        });
                //    } else {
                //        if (value && !value.ixp)
                //            value.ixp = options.Logovani.Ixp;
                //    }
                //},

                serverFilters: {
                    enable_bu_exist: options.BuButtonEnable,
                },
                itemTemplate: options.VyberEsuTypItemTemplateOpt !== 1 ? mainItemTemplate : oneRowItemTemplate, //mainItemTemplate
                helperItemTemplate: options.VyberEsuTypItemTemplateOpt !== 1 ? mainHelperItemTemplate : oneRowItemTemplate,
                itemTooltipTemplate: itemTooltipTemplateFunc,
                itemCreated: options.typ >= 3 ? itemCreatedFunMulti : itemCreatedFunSingle ,
                selector: function (opts) {
                    var field = $(this);
                    var contik = $.content(field);
                    var filterToKartoteka = field.find("input")[0].value;
                    if (filterToKartoteka == null || filterToKartoteka === "") {
                        var value = field.gfield("getValue");
                        if (value && value.ixs_esu !== "0000SE00000M") {
                            filterToKartoteka = value.nazev;
                        }
                    }
                    var int = 0;
                    // test na ičo
                    if (filterToKartoteka != null && filterToKartoteka !== "") {
                        if (/^\d+$/.test(filterToKartoteka)) {  // obsahuje jenom čísla
                            int = parseInt(filterToKartoteka);
                        }
                    }
                    var priOtevreniKartotekyAplikovatFavoriteMasku = false;
                    if (contik && contik.globalSettings != null) {
                        priOtevreniKartotekyAplikovatFavoriteMasku = contik.globalSettings.get("Global.Esu.AppSettings.Obecne.PriOtevreniKartotekyAplikovatFavoriteMasku")
                    }
                    var strictStopAutoLoad = true;
                    // naplnění do objektu k hledání
                    var DataToFilterPanel = options.DataToFilterPanel;
                    if (int !== 0 && !isNaN(int)) {
                        if (DataToFilterPanel == null) {DataToFilterPanel = {} }
                        DataToFilterPanel.ico = int;
                        strictStopAutoLoad = false;
                    } else {
                        if (filterToKartoteka != null && filterToKartoteka !== "") {
                            if (DataToFilterPanel == null) { DataToFilterPanel = {} }
                            DataToFilterPanel.nazev = filterToKartoteka;
                            strictStopAutoLoad = false;
                        } else if (priOtevreniKartotekyAplikovatFavoriteMasku) {
                            strictStopAutoLoad = false;
                        } else {
                            if (DataToFilterPanel == null) { DataToFilterPanel = {} }
                        }
                    }

                    var mainDef = $.Deferred();
                    if (Gordic.Esu.Function.jePovolenoZobrazeniKartotekyBezVazbyNaDokument(options.Logovani.Ixp, (contik ? contik.dialogs : null))) {  // pokud je parametrem zakázáno tak nicnedělám
                        if (isNovaNehybridniAplikace) {
                         
                            var optKartoteky = {
                                Ucel: options.typ ? options.typ : 0,
                                Logovani: options.Logovani,
                                FieldsToFilterpanel: options.FieldsToFilterpanel,
                                IdSimpleMode: options.IdSimpleMode,
                                DataToFilterPanel: DataToFilterPanel,
                                StrictStopAutoLoad: strictStopAutoLoad
                            };
                            var tempOptKartoteky = $.extend(true, {}, optKartoteky);
                            field.trigger("vyberesukartotekaopt", {
                                optKartoteky: tempOptKartoteky
                            });

                            Gordic.Esu.Dialogs.KartotekaEsuDlgFromMain($.content(field), tempOptKartoteky, options.ModOtevreni).done(function (retPromis) {
                                if (retPromis) {
                                    retPromis.on("close", function (ev, retVal) { //on("close", function (ev, retVal) {
                                        if (Gordic.Utils.WidgetExists("gfield", field)) { 
                                            vyberESUDialogClose({ type: "Kartoteka" }, retVal, field);
                                            if (retVal && retVal.subjekty) {

                                                var novePole = [];

                                                //sezbírání starých dat
                                                var OldVal = field.gfield("getValue");
                                                vytahejKlice(OldVal, novePole);

                                                //sezbírání příchozích dat
                                                // když jsem setoval celý objekt nefungovala verifikace je třeba vyzobat jen klíče
                                                var val = retVal.subjekty;
                                                vytahejKlice(val, novePole);
                                                var fieldFlags = { valid: false };
                                                if (retVal.flags) {
                                                    fieldFlags = $.extend({}, fieldFlags, retVal.flags)
                                                }
                                                
                                                if (options.typ >= 3) {
                                                    field.gfield("option", "oldLength", OldVal.length + val.length + 1);

                                                    field.gfield("setValue", novePole, fieldFlags);
                                                    //setování pojednom setne jen to poslední dycky
                                                    //$(novePole).each(function (index, element) {
                                                    //    field.gfield("setValue", element, { valid: false });
                                                    //});
                                                    field.gfield("option", "oldLength", OldVal.length + val.length);

                                                } else if (retVal.subjekty.length > 0) {
                                                    field.gfield("setValue", retVal.subjekty[0], fieldFlags);
                                                }
                                            }
                                            field.gfield("focus");
                                        }
                                        mainDef.reject();
                                    });
                                } else {
                                    mainDef.reject();
                                }
                            });
                        } else {
                            var retVal = OtevriESUZastupneOsoby(true).on("close", function (ev, retVal) {
                               
                                if (retVal && Gordic.Utils.WidgetExists("gfield", field)) {

                                    var novePole = [];

                                    //sezbírání starých dat
                                    var OldVal = field.gfield("getValue");
                                    vytahejKlice(OldVal, novePole);

                                    //sezbírání příchozích dat
                                    // když jsem setoval celý objekt nefungovala verifikace je třeba vyzobat jen klíče
                                    var val = [retVal];
                                    vytahejKliceHybrid(val, novePole);

                                    if (options.typ >= 3) {
                                        field.gfield("option", "oldLength", OldVal.length + val.length + 1);

                                        field.gfield("setValue", novePole, { valid: false });
                                        //setování pojednom setne jen to poslední dycky
                                        //$(novePole).each(function (index, element) {
                                        //    field.gfield("setValue", element, { valid: false });
                                        //});
                                        field.gfield("option", "oldLength", OldVal.length + val.length);

                                    } else if (retVal != null) {
                                        var objEsu = {};
                                        objEsu.ixs_esu = retVal.IxsEsu;
                                        objEsu.lic = retVal.Lic;
                                        objEsu.por_zast = retVal.Poradi;
                                        field.gfield("setValue", objEsu, { valid: false });
                                    }
                                }
                                mainDef.reject();

                                if (retVal.Poradi == null) {
                                    odhro.AdresatTextBox.value = retVal.EsuTxt;
                                    odhro.IxsAdresatHidden.value = retVal.IxsEsu;
                                    odhro.ZastupOsobaTextBox.value = "";
                                } else {
                                    odhro.AdresatTextBox.value = retVal.EsuTxt;
                                    odhro.IxsAdresatHidden.value = retVal.IxsEsu + "," + retVal.Poradi + "," + retVal.Lic;
                                    odhro.ZastupOsobaTextBox.value = retVal.ZastTXT;
                                }
                                
                            });

                        }
                    } else {
                        mainDef.reject();
                    }

                    return mainDef.promise();
                },
                itemSelectable: function (nabizenaHodnota) {
                    var ret = true;
                    if (nabizenaHodnota && nabizenaHodnota.nazev === "PrekorcenLimitMaxLIMITLIMITLIMIT") {
                        ret = false;
                    }
                    return ret;
                }
            }
        );
        return FormiFilterSelectGinSesu.form.sections[0].rows[0].fields[0].options;
    };

    Prefabs.typPrukazu = function (userOpt) {

        var defOptions = {
            model: undefined,
            name: undefined
        };
        var options = $.extend({}, defOptions, userOpt);

        var Form = new Gordic.Forms
            .Form({})
            .addSection()
            .addRow().addField("gselectbox", Gordic.Prefabs.Select.ginsesu(), {
                name: options.name || undefined,
                model: options.model || undefined,
                dropdown: true,
                data: new Gordic.Data.View([
                    { typ: 1, nazev: "jres:31900180" }, //RC 31900180 : ID - občanský průkaz
                    { typ: 2, nazev: "jres:31900181" }, //RC 31900181 : P - cestovní pas
                    { typ: 3, nazev: "jres:31900182" }, //RC 31900182 : IR - povolení k pobytu
                    { typ: 4, nazev: "jres:31900183" }, //RC 31900183 : VS - vízový štítek
                    { typ: 5, nazev: "jres:31900184" } //RC 31900184 : PS - pobytový štítek
                ], { key: "nazev" })
            })
            ;
        return Form.form.sections[0].rows[0].fields[0].options;
    };

    

})(jQuery);
