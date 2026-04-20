(function ($) {
    "use strict";
    namespace("Gordic.Wfl.GRPPrefabs", {

        GRPAutoAssignSubjectRightsControl: function (options) { // zároveň název fieldu
            var defaults = {
                name: "GRPAutoAssignSubjectRightsControl",
                value: "300",
                disabled: false,
                akce: ((typeof options === "string") ? options : null),
                model: null, // taky by určitě šla použít nějaká defaultní hodnota
            }
            var settings = $.extend({}, defaults, options);

            var wflPrisPodPar = 1;
            var k203Params = Gordic.Gin.WebClient.GK203Handler.GetK203ParamsImmediate();
            if(k203Params) {
                wflPrisPodPar = k203Params.wfl_pris_pod;
            }

            // obslužné funkce políčka (akce) nemají nic spolešného s .gfield("set/GetValue") radějí používat model apply/collect
            if (settings.akce === "getValue") { return $(".js-" + settings.name).gfield("getValue"); }  // getvalue
            if (settings.akce === "getLabel") { return $(".js-" + settings.name).gfield("getValue").label; }  // getLabel
            if (settings.akce === "setValue" && settings.value !== null) { return $(".js-" + settings.name).gfield("setValue", { value: settings.value }); }

            var GradioGRPAutoAssignSubjectRightsControl_Temp = new Gordic.Forms
           .Form()
               .addField("gselectbox", {
                   name: settings.name,
                   customClass: "js-" + settings.name,
                   initialValue: ((settings.value !== null) ? { value: settings.value } : null),
                   //    itemClass: "w-12",
                   disabled: settings.disabled,
                   model: settings.model,
                   list: true,
                   itemTemplate: "{label}",
                   itemClass: function (value) {
                       if (value.disabled) {
                           return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
                       }
                   },
                   data: new Gordic.Data.View([ //radios
                       { value: 200, disabled: ((true === true) ? false : true), label: 'jres:26226373' }, //, id: "HistVlastniSURB" //RC 26226373 : Historický vlastník typu spisový uzel
                       { value: 300, disabled: ((true === true) ? false : true), label: 'jres:26226374' }, //, id: "HistVlastnikFUNRB" //RC 26226374 : Historický vlastník typu funkční místo
                       { value: 700, disabled: ((wflPrisPodPar === 1) ? false : true), label: 'jres:26226688' }, //, id: "NadrizeniAktVlastnikaRB" //RC 26226688 : Nadřízení aktuálního vlastníka
                       { value: 701, disabled: ((wflPrisPodPar === 1) ? false : true), label: 'jres:26226689' }, // , id: "PrvniNadrizenyAktVlastnikaRB" //RC 26226689 : První nadřízený aktuálního vlastníka
                       { value: 400, disabled: ((true === true) ? false : true), label: 'jres:26226375' }, //, id: "AktVlastnikSURB" //RC 26226375 : Aktuální vlastník typu spisový uzel
                       { value: 500, disabled: ((true === true) ? false : true), label: 'jres:26226376' }, //, id: "AktVlastnikFUNRB" //RC 26226376 : Aktuální vlastník typu funkční místo
                       { value: 100, disabled: ((true === true) ? false : true), label: 'jres:26226377' } //, id: "TvurciDokumentuRB" //RC 26226377 : Tvůrce dokumentu
                   ], { key: "value" })
               })
            ;
            return GradioGRPAutoAssignSubjectRightsControl_Temp.getLastRow();
        },


        GRPNastaveniOpravneniControl: function (options) { // zároveň název fieldu            
            var initialValue = 0; // možná zvolit nějakou mimo reálné hodnoty
            var initialCheck = false;
            var initialEnabled = false;

            var defaults = {
                name: "GRPNastaveniOpravneniControl",
                rowLabel: undefined, // potřebné pouze pro volání z usersettings
                value: null,
                disabled: false,
                akce: ((typeof options === "string") ? options : null),
                model: null, // "model.xxxxxx=value.label; model.yyy=value.value"
                modelPravoCteni:null,
                //speciální option
                userAccess: 20, // Hodnota opravneni aktualniho uzivatele
                restrictedValue: 0,
            }
            var settings = $.extend({}, defaults, options);
            var val = settings.value;
   
            var gin_n06_op = 0;
            var k203Params = Gordic.Gin.WebClient.GK203Handler.GetK203ParamsImmediate();
            if (k203Params) {
                gin_n06_op = k203Params.gin_n06_op;
            }
 
            var m_RestrictedValue = settings.restrictedValue;
            var m_MaxAllowedValue = 7; // zmena z 6
            var m_MinAllowedValue = 1;

            var enabled0 = true;
            var enabled1 = true;
            var enabled2 = true;
            var enabled3 = true;
            var enabled4 = true;
            var enabled5 = true;
            var enabled6 = true;
            var enabled7 = true;

            // obslužné funkce políčka (akce) nemají nic spolešného s .gfield("set/GetValue") radějí používat model apply/collect
            if (settings.akce === "getValue") { return $(".js-" + settings.name).gfield("getValue"); }  // getvalue
            if (settings.akce === "getLabel") { return $(".js-" + settings.name).gfield("getValue").label; }  // getLabel
            if (settings.akce === "setValue" && settings.value !== null) { return $(".js-" + settings.name).gfield("setValue", { value: settings.value }); }
  
            if(settings.userAccess <= 15) { //nema pravo pridelovat opravneni
                m_MaxAllowedValue = 3;
                m_MinAllowedValue = 1;
                enabled0 = false;
                enabled1 = false;
                enabled2 = false;
                enabled3 = false;
                enabled4 = false;
                enabled5 = false;
                enabled6 = false;
                enabled7 = false;
            } else if(settings.userAccess == 15 || settings.userAccess == 25 || settings.userAccess == 45) { //muze pridelit pouze prava pro cteni
                m_MaxAllowedValue = 5; 
                m_MinAllowedValue = 1;
                enabled0 = false;
                enabled1 = false;
                // hodnoty čtení enabled, zbytek disabled
                enabled5 = false;
                enabled6 = false;
                enabled7 = false;
            } else if (settings.userAccess == 20 || settings.userAccess == 30 || settings.userAccess == 50) { //muze pridelit pouze prava pro cteni
                m_MaxAllowedValue = 6; 
                m_MinAllowedValue = 2;
                enabled0 = false;
                enabled1 = false;
                // hodnoty čtení enabled, zbytek disabled
                enabled5 = false;
                enabled6 = false;
                enabled7 = false;

                initialEnabled = true;
                initialCheck = true;
            } else if(settings.userAccess == 70) { //plne opravneni
                m_RestrictedValue = -1;
                initialCheck = true;
            }

            var data = [];
            data.push({ value: 7 /* 70 */, disabled: !enabled7, label: 'jres:26227985' });   //  wflRP.GetUrovenPristupuTxt(new GInt16(70)) //RC 26227985 : Plný přístup - všechna oprávnění
            data.push({ value: 6 /* 45 50*/, disabled: !enabled6, label: 'jres:26227382' });   //  wflRP.GetUrovenPristupuTxt(new GInt16(50)) //RC 26227382 : Editace (karta + el.)
            data.push({ value: 5 /* 30 25*/, disabled: !enabled5, label: 'jres:26227983' });   //  wflRP.GetUrovenPristupuTxt(new GInt16(30)) //RC 26227983 : Editace karta, čtení (el.)
            data.push({ value: 4 /* 15 20*/, disabled: !enabled4, label: 'jres:26227984' });    //  wflRP.GetUrovenPristupuTxt(new GInt16(15)) //RC 26227984 : Čtení (karta + el.)
            data.push({ value: 3 /* 10 */, disabled: !enabled3, label: 'jres:26227386' });    //  wflRP.GetUrovenPristupuTxt(new GInt16(10)) //RC 26227386 : Čtení (karta)

            if(gin_n06_op == 1) {
                data.push({ value: 2 /* 5 */, disabled: !enabled2, label: 'jres:26228021' });    //  wflRP.GetUrovenPristupuTxt(new GInt16(5)) //RC 26228021 : Čtení (základní metadata)
            }

            data.push({ value: 0 /* -10 */, disabled: !enabled0, label: 'jres:26227387' });  //  wflRP.GetUrovenPristupuTxt(new GInt16(-10)) //RC 26227387 : Zákaz přístupu
            data.push({ value: 1,/* 0 */ disabled: !enabled1, label: 'jres:26227388' });     //  wflRP.GetUrovenPristupuTxt(new GInt16(0)) //RC 26227388 : Ponechat původní oprávnění

            function setControlByValue(ev, selectedValue) {
                var cnt = $.content($(ev.target));
                var val = selectedValue.value;
                var pridelitPravoCteniCheckbox = cnt.findFields("PridelitPravoCteni");
   
                var enabled = false;
                var checked = false;

                if((val >= 4) && (settings.userAccess == 70)) {
                    enabled = true;

                    if(val == 7) {
                        checked = true;
                        enabled = false;
                    }
                }

                pridelitPravoCteniCheckbox.gfield("option", { disabled: !enabled });
                pridelitPravoCteniCheckbox.gfield("setValue", checked);
            }

            initialCheck = false; // hotfix, ignoruji tím předchozí případné nastavení výše, které způsobuje problémy. TK má jiný přístup - nastavuje ve více metodách různě a opakovaně volaných. Zde se to jen řetězí za sebe v inicializaci políčka + onChange 
            initialEnabled = false; // hotfix, ignoruji tím předchozí případné nastavení výše, které způsobuje problémy. TK má jiný přístup - nastavuje ve více metodách různě a opakovaně volaných. Zde se to jen řetězí za sebe v inicializaci políčka + onChange 

            if (val == -10)
                initialValue = 0;
            else if (val == 0)
                initialValue = 1;
            else if(val == 5)
                initialValue = 2;
            else if (val == 10)
                initialValue = 3;
            else if ((val == 20) || (val == 15))
                initialValue = 4;
            else if ((val == 30) || (val == 25))
                initialValue = 5;
            else if ((val == 50) || (val == 45))
                initialValue = 6;
            else if (val == 70)
                initialValue = 7;

            if(initialValue >= 4 && settings.userAccess == 70) {
                initialEnabled = true;

                if(initialValue == 7) {
                    initialCheck = true;
                    initialEnabled = false;
                }
            }

            if(val == 20 || val == 30 || val == 50) {
                initialCheck = true;
            }        
   
            var GRPNastaveniOpravneniControl_Temp = new Gordic.Forms.Form()
                .addSection() 
                .addRow(settings.rowLabel)
                .addField("gselectbox", {
                    name: settings.name,
                    customClass: "js-" + settings.name,
                    initialValue: ((val !== null) ? { value: initialValue } : null),

                    //   itemClass: "w-12",
                    disabled: settings.disabled,
                    model: settings.model,
                    list: true,
                    multi: false,
                    itemTemplate: "{label}",
                    itemClass: function (value) {
                        if(value.disabled) {
                            return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
                        }
                    },
                    validators: [
                        new Gordic.Validators.Base({
                            message: "jres:26228148", //RC 26228148 : Nelze použít vybranou hodnotu.
                            validate: function (value, changeObj) {         
                                if(value && (value.disabled == true)) {
                                    return false;
                                }
                                return true;
                            }
                        }) 
                    ],
                    change: function (ev, changeObj) {
                        var newValue = changeObj.value;
       
                        if(newValue && newValue.disabled != true) {
                            var newVal = newValue.value;

                            if (newVal == m_RestrictedValue) {
                                newValue.value = newVal + 1;
                            }
                            if (newVal > m_MaxAllowedValue) {
                                newValue.value = m_MaxAllowedValue;
                            }
                            if (newVal < m_MinAllowedValue) {
                                newValue.value = m_MinAllowedValue;
                            }

                            setControlByValue(ev, newValue);
                        } else {
                            $(this).gfield("validate");
                            return;
                        }
                    },
                    data: new Gordic.Data.View(data, { key: "value" })
                })
                .addRow()
                .addField("gcheck", {
                    initialValue: initialCheck,
                    name: 'PridelitPravoCteni',
                    model: settings.modelPravoCteni,
                    label: "jres:26227981", //RC 26227981 : Povolení přidělit ostatním uživatelům právo pro čtení
                    change: function (ev, object) {
                        
                    },
                    disabled: !initialEnabled,
                })
            ;
          //  return GRPNastaveniOpravneniControl_Temp.getLastRow();
            return GRPNastaveniOpravneniControl_Temp.getLastSection().rows;
        },
        GRPSubjectRightsControl: function (options) {
            var that = this;
            var defaults = {
                name: "GRPSubjectRightsControl",
              //  value: "SF", // POZOR! Nesmím nastavit reálnou hodnotu, protože pokud se zvenčí v modelu posílá stejná, pak se nevyvolá change a nevyrenderuje se správně druhé políčko
                disabled: false,
                akce: ((typeof options === "string") ? options : null),
                model: "GRPSubjectRightsControl_ix",  //pouze jmeno mod kterou bude hledat přislušnou hodnotu v modelu
                //specialni Options
                nameDruhehoFieldu: "GRPSubjectRightsControl_sel",
                model2Fieldu: "GRPSubjectRightsControl_ixs",   //pouze jmeno mod kterou bude hledat přislušnou hodnotu v modelu
                value2Feildu: null,
                filterStUtajId: null
            }
            var settings = $.extend({}, defaults, options);

            // obslužné funkce políčka (akce) nemají nic spolešného s .gfield("set/GetValue") radějí používat model apply/collect
            if (settings.akce === "getValue") { return [$(".js-" + settings.name).gfield("getValue"), $(".js-" + settings.nameDruhehoFieldu).gfield("getValue")]; }  // getvalue
            if (settings.akce === "setValue" && settings.value !== null) {
                var ret = $(".js-" + settings.name).gfield("setValueFromKeys", settings.value);
                if (settings.value2Feildu !== null) {
                    ret = $(".js-" + settings.nameDruhehoFieldu).gfield("setValueFromKeys", settings.value2Feildu);
                }
                return ret;
            }

            var wflPristprisPar = "";
            var k203Params = Gordic.Gin.WebClient.GK203Handler.GetK203ParamsImmediate();
            if(k203Params) {
                wflPristprisPar = k203Params.wfl_pristpris;
            }

            var referentEnabled = wflPristprisPar == "" || wflPristprisPar.indexOf("SR") > -1;
            var funkceEnabled = wflPristprisPar == "" || wflPristprisPar.indexOf("SF") > -1;
            var suEnabled = wflPristprisPar == "" || wflPristprisPar.indexOf("SS") > -1;
            var pracSkupEnabled = wflPristprisPar == "" || wflPristprisPar.indexOf("WGP") > -1;
            var orgJedEnabled = wflPristprisPar == "" || wflPristprisPar.indexOf("SG") > -1;
            var konfSkupEnabled = wflPristprisPar == "" || wflPristprisPar.indexOf("0A") > -1;

            var data = [] 
            if (true) { data.push({ hodnota: "SR", prefab: "ginsref", disabled: (referentEnabled ? false : true), label: 'jres:26227389', klicovePoleVprefabu: "ixs_ref" }); };     //GGinsrefDBBox //RC 26227389 : Osoba
            if (true) { data.push({ hodnota: "SF", prefab: "ginsfun", disabled: (funkceEnabled ? false : true), label: 'jres:26225681', klicovePoleVprefabu: "ixs_fun" }); };       //GGinsfunDBBox() //RC 26225681 : Funkční místo
            if (true) { data.push({ hodnota: "WGP", prefab: "ginswgp", disabled: (pracSkupEnabled ? false : true), label: 'jres:26227390', klicovePoleVprefabu: "ixs_wgp" }); };    //GGinswgpDBBox //RC 26227390 : Pracovní skupina
            if (true) { data.push({ hodnota: "SS", prefab: "ginspod", disabled: (suEnabled ? false : true), label: 'jres:26227391', klicovePoleVprefabu: "ixs_su" }); };            //GGinspodDBBox //RC 26227391 : Spis.uzel
            if (true) { data.push({ hodnota: "SG", prefab: "ginsorj", disabled: (orgJedEnabled ? false : true), label: 'jres:26227392', klicovePoleVprefabu: "ixs_orj" }); };       //GGinsorjDBBox //RC 26227392 : Org. jednotka
            if (true) { data.push({ hodnota: "0A", prefab: "ginsusr", disabled: (konfSkupEnabled ? false : true), label: 'jres:26227393', klicovePoleVprefabu: "ixs_usr" }); };       //GGinsusrDBBox //RC 26227393 : Konf. skupina

            var GRPSubjectRightsControl_Temp = new Gordic.Forms
           .Form()
               .addField("gselectbox", "w-4", {    //výběrový selectBox
                   name: settings.name,
                   customClass: "js-" + settings.name,
                   initialValue: { hodnota: settings.value, prefab: "", label: "", klicovePoleVprefabu: "" },
                   itemClass: "w-12",
                   disabled: settings.disabled,
                   model: "model." + settings.model + "=value.hodnota",
                   dropdown: true, //dropdown
                   itemTemplate: "{label}",
                   helperItemClass: function (value) {
                       if (value.disabled) {
                           return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
                       }
                   },
                   graphicInput: "hidden",
                   data: new Gordic.Data.View(data, { key: "hodnota" }),
                   // data pro druhy field
                   nameDruhehoFieldu: settings.nameDruhehoFieldu,
                   model2Fieldu: settings.model2Fieldu,
                   change: function (ev, changeObj) {
                       if (changeObj.value != null && changeObj.value.disabled === true) {
                           //$(this).gfield("clear");
                           $(this).gfield("setValue", null);
                           //var fieldNameDruheho = $(this).gfield("option", "nameDruhehoFieldu");
                           //$(this).gformrow().findFields(fieldNameDruheho).gfield("destroy");
                           var fieldNameDruheho = $(this).gfield("option", "nameDruhehoFieldu");
                           var druhyField = $(this).gformrow().findFields(fieldNameDruheho);
                           druhyField.gfield("setValue", null);
                           druhyField.hide();

                           //return;
                       }
                       else { 
                           if(changeObj.value != null && changeObj.value != "") {
                               var fieldNameDruheho = $(this).gfield("option", "nameDruhehoFieldu");
                               var fieldModelDruheho = $(this).gfield("option", "model2Fieldu");
                               var klicovePoleVprefabu = changeObj.value.klicovePoleVprefabu;

                               var prefabnameWithNamespace = "Gordic.Prefabs.Select." + changeObj.value.prefab + "()";
                               //var filtrovatZaStredisko = false;

                               //var k203Params = Gordic.Gin.WebClient.GK203Handler.GetK203ParamsImmediate();
                               //if(k203Params) {
                               //    filtrovatZaStredisko = k203Params.ssl_filtristr == 1;
                               //}

                               var serverFilters = undefined;
                               if (settings.filterStUtajId != null) {
                                   if (changeObj.value.prefab == "ginsref") {
                                       serverFilters = { GinvreuStUtajId: settings.filterStUtajId };
                                   } else if (changeObj.value.prefab == "ginsfun") {
                                       serverFilters = { GinvreuStUtajId: settings.filterStUtajId };
                                   }
                               }
 
                               var prefabOptions = {
                                   //itemDeletable:true,
                                   name: fieldNameDruheho,
                                   model: "model." + fieldModelDruheho + " = value." + klicovePoleVprefabu,
                                   change: function (ev, changeObj) {
                                       // console.log("Změněná prefab v ", $(this).gfield("option", "name"), " je: ", changeObj.value);
                                       // tady lze reagovat na změny v druhém selectboxu
                                   },
                                   serverFilters: serverFilters ? serverFilters : undefined
                               }

                              // if (filtrovatZaStredisko) {
                                   if (changeObj.value.prefab == "ginspod") {
                                       prefabnameWithNamespace = "Gordic.Gin.Fields.ginspodSSU(prefabOptions, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO)";
                                   } else if (changeObj.value.prefab == "ginsfun") {
                                       prefabnameWithNamespace = "Gordic.Gin.Fields.ginsfunSSU(prefabOptions, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO)";
                                   } else if (changeObj.value.prefab == "ginsref") {
                                       prefabOptions.typeReader = "Ginsref";

                                       prefabnameWithNamespace = "Gordic.Gin.Fields.ginsfunSSU(prefabOptions, Gordic.Gin.Globals.Enums.ChovaniStrediskaDleUcelu.NEURCENO)";
                                   } else if (changeObj.value.prefab == "ginsorj") {
                                       prefabnameWithNamespace = "Gordic.Gin.Fields.ginsorjSSU(prefabOptions)";
                                   } else if (changeObj.value.prefab == "ginswgp") {
                                       prefabnameWithNamespace = "Gordic.Gin.Fields.ginswgp(prefabOptions)";
                                   }
                               // }

                               var secondField = $(this).gformrow().findFields(fieldNameDruheho);

                               if(secondField != null) {
                                   secondField.gfield("destroy");
                               }
                           
                               $(this).next()
                                   .gselectbox(eval(prefabnameWithNamespace));

                           }
                       }
                   }
                   //*/
               })
                 // defaultni prazdny select pro vytvoření místa
                .addField("gselectbox", "w-8", {
                    name: settings.nameDruhehoFieldu,
                    customClass: "js-" + settings.nameDruhehoFieldu,
                    itemClass: "w-12",
                    disabled: settings.disabled,
                })
            return GRPSubjectRightsControl_Temp.getLastRow();
        },

        GetValueNastaveniOpravneniControl: function (cnt) {
            var urovenPristupu = -10;
            var urovenPristupuTxt = "";

            var l_oSelectedOpravneni = cnt.findFields("nastaveniOpravneniCtrl").gfield("getValue");
            var povolenoCteniChecked = cnt.findFields("PridelitPravoCteni").gfield("getValue");
            var selectedValue = l_oSelectedOpravneni.value;

            //  var o = cnt.findFields("nastaveniOpravneniCtrl").gfield("instance");

            // IRP Value
            if (selectedValue == 0)
                urovenPristupu = -10;
            else if (selectedValue == 1)
                urovenPristupu = 0;
            else if (selectedValue == 2)
                urovenPristupu = 5;
            else if (selectedValue == 3)
                urovenPristupu = 10;
            else if (selectedValue == 4)
                urovenPristupu = povolenoCteniChecked ? 20 : 15;
            else if (selectedValue == 5)
                urovenPristupu = povolenoCteniChecked ? 30 : 25;
            else if (selectedValue == 6)
                urovenPristupu = povolenoCteniChecked ? 50 : 45;
            else if (selectedValue == 7)
                urovenPristupu = 70;

            // IRP Txt
            if (selectedValue == 0)
                urovenPristupuTxt = 'jres:26227387'; //RC 26227387 : Zákaz přístupu
            else if (selectedValue == 1)
                urovenPristupuTxt = 'jres:26227388'; //RC 26227388 : Ponechat původní oprávnění
            else if (selectedValue == 2)
                urovenPristupuTxt = 'jres:26228021'; //RC 26228021 : Čtení (základní metadata)
            else if (selectedValue == 3)
                urovenPristupuTxt = 'jres:26227386'; //RC 26227386 : Čtení (karta)
            else if (selectedValue == 4) {
                if (urovenPristupu == 20)
                    urovenPristupuTxt = 'jres:26227986'; //RC 26227986 : Čtení(karta + el.), změna opr.číst
                else
                    urovenPristupuTxt = 'jres:26227984'; //RC 26227984 : Čtení (karta + el.)
            }
            else if (selectedValue == 5) {
                if (urovenPristupu == 30)
                    urovenPristupuTxt = 'jres:26227987'; //RC 26227987 : Editace karta, čtení (el.), změna opr.číst
                else
                    urovenPristupuTxt = 'jres:26227983'; //RC 26227983 : Editace karta, čtení (el.)
            }
            else if (selectedValue == 6) {
                if (urovenPristupu == 50)
                    urovenPristupuTxt = 'jres:26227988'; //RC 26227988 : Editace (karta + el.), změna opr.číst
                else
                    urovenPristupuTxt = 'jres:26227382'; //RC 26227382 : Editace (karta + el.)
            }
            else if (selectedValue == 7)
                urovenPristupuTxt = 'jres:26227985'; //RC 26227985 : Plný přístup - všechna oprávnění

            return {
                urovenPristupu: urovenPristupu,
                urovenPristupuTxt: urovenPristupuTxt,
            };
        }

    }, { pure: true });
})(jQuery);