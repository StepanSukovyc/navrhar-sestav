

$(function () {
    "use strict";
    namespace("Gordic.Esu.WebClient.BankovniUcetDlg", {
        /// <field type='server.GEsuParamsDto'>adfasdf</field> 
        GEsuParamsDto: this.GEsuParamsDto, // dto interlicense
        /// <field type='server.GDetailEsuItemsDto'>asdfasdf</field> 
        model: this.model,
        typZobrazeni: { // zde umístěné pouze jen kvůli interlicense, plnění je v inicializace()

            /// <field type='Boolean'>Požadavek na založení nového externího subjektu</field>
            Novy: 0 === this.TypZobrazeniC ? true : false,
            /// <field type='Boolean'>Požadavek na zobrazení externího subjektu</field>
            Detail: 1 === this.TypZobrazeniC ? true : false,
            /// <field type='Boolean'>Požadavek na editaci externího subjektu</field>
            Editace: 2 === this.TypZobrazeniC ? true : false,
            /// <field type='Boolean'>Požadavek na založení nové pobočky externího subjektu</field>
            NovaPobocka: 3 === this.TypZobrazeniC ? true : false,
            /// <field type='Boolean'>Požadavek na založení nového externího subjektu s kopií dat z původního</field>
            NovaKopie:4 === this.TypZobrazeniC ? true : false,
            test: console.log(this.TypZobrazeniC)
        },

        onContentReady: function () {
            /// <summary>
            /// Vytvoření formuláře
            /// </summary>
            var that = this;
            that.inicializace();
            var poleTypuUctu = [
                { priz_fu: 0, label: "Účet externího subjektu" },
                { priz_fu: 1, label: "Účet FÚ pro odvod DPH (nespolehlivý plátce)" }
            ];

            if (this.PouzitTypUctu2) {
                poleTypuUctu.push({ priz_fu: 2, label: "Účet pro platby přes MF (zahraniční platby)" });
            }

            console.log("UcetDto: ", $.content(this).UcetDto);
            var FormDetailUctu = new Gordic.Forms
                .Form({ name: "DetailUcet", layoutDescriptor: "L2M2S1, L-3-9-0, M-12-12-0, S-12-12-0, breaks-500-1080" })
                .addSection({ customClass: "w-L-7 w-M-7" })
                
                .addRow("jres:26265257").addField("gselectbox", { //RC 26265257 : Měna
                    name: "mena",
                    model: "model.mena=value.mena",
                    initialValue: { mena: 0 },
                    change: function (ev, changeObj) {
                        if (that.typZobrazeni.Novy) {
                            that.zkontrolujBankovniUcet();
                            that.kontrolaPobockaMaBic();
                            that.updateButtonGenerujIbanEnabled();
                        }
                    }
                }, Gordic.Prefabs.Select.ekocmen())

                .addRow("jres:31901101")
                .addField("gselectbox", { //RC 31901101 : Typ účtu
                    name: "priz_fu",
                    model: "model.priz_fu=value.priz_fu",
                    initialValue: { priz_fu: 0 },
                    data: new Gordic.Data.View(poleTypuUctu, { key: "priz_fu" }),
                    itemTemplate: "{label}",
                    dropdown: true,
                    change: function (ev, changeObj) {

                    },
                    

                })
                .addRow("jres:31900326").addField("gstringbox", "w-8", { //RC 31900326 : Číslo účtu, směrový kód
                    customClass: "js-cisloCislo",
                    name: "bu_ci",
                    validators: [
                        new Gordic.Validators.Required()
                    ],
                    change: function (ev, changeObj) {
                        if (that.typZobrazeni.Novy) {

                            if (changeObj.flags.rucniSetovaniIbanu) {
                                //that.actions.actPrevestNaIBAN.enabled(false);
                            }
                            else {
                                that.updateButtonGenerujIbanEnabled();
                                that.cisloUctuZaloha = null;
                            }
                            var skCiVal = that.findFields("sk_ci").gfield("getValue");
                            if (!changeObj.flags.rucniSetovaniBezReakce && skCiVal != null) {
                                that.zkontrolujBankovniUcet();
                            }


                        }
                    },
                    buttons: [{
                        id: "butPrevestNaIBAN",
                        //requireValue: true,
                        action: that.actions.actPrevestNaIBAN
                    }]
                })
                .addField("gselectbox", "w-4", Gordic.Prefabs.Select.ekoscsk(), {
                    name: "sk_ci",
                    model: "model.sk_ci=value.sk;model.sk_num<=value.sk_num",
                    customClass: "js-kodkod",
                    //itemTemplate: '{sk:trim:encode} - {bic:trim:encode}',
                    itemTemplate: function (val) {
                        //if (val && val.sk && val.sk !== "" && val.bic && val.bic !== "") {
                        //    return val.sk.trim() + " | " + val.bic.trim(); //"BIC:"
                        //}
                        if (val && val.sk && val.sk !== "") {
                            return val.sk.trim();
                        } else {
                            return null;
                        }
                    },
                    validators: [
                        new Gordic.Validators.Required()
                    ],
                    change: function (ev, changeObj) { // nastaví pobočku banky a název banky
                        if (changeObj.value) {
                            that.findFields("ixs_esu_ban").gfield("setValueFromKeys", changeObj.value.ixs_esu);
                        } 
                        that.zkontrolujPocetPobocek((changeObj != null && changeObj.value != null && changeObj.value.sk != null) ? changeObj.value.sk : null);
                       
                        that.findFields("nazev").gfield("setValue", changeObj.value && changeObj.value.nazev ? changeObj.value.nazev : null);
                            
                        
                        if (that.typZobrazeni.Novy) {
                            that.updateButtonGenerujIbanEnabled();
                        }
                    },
                    serverFilters: {
                        VcetnePobocek: function () {
                            var menaValue = that.findFields("mena").gfield("getValue");
                            if (menaValue != null && menaValue.mena != null && menaValue.mena != 0) {
                                return true;
                            }
                            return false;
                        } 
                    }
                })
                .addRow("jres:26265263").addField("gstringbox", { name: "nazev", disabled: true }) //RC 26265263 : Název banky
                .addRow("jres:31900327" //RC 31900327 : Pobočka banky
                 + ", " + "jres:31901114" //RC 31901114 : BIC (SWIFT)
                )
                .addField("gselectbox", "w-8", Gordic.Prefabs.Select.bankovniPobocky(), { 
                    name: "ixs_esu_ban",
                    dropdown: true,
                    customClass: "js-pobockaPobocka",
                    validators: [ new Gordic.Validators.Required() ],
                    model: "model.ixs_esu_ban=value.ixs_esu;model.bic_ban<=value.bic",
                    //itemTemplate:"{esu_txt}" ,
                    serverFilters: {
                        sk: new Gordic.Forms.Dependency("sk_ci", "sk", true)
                    },
                    change: function (ev, changeObj) {
                        console.log("Change na pobočce", changeObj);
                     
                        that.findFields("adresaPobocky").gfield("setValue", changeObj.value && changeObj.value.esu_txt ? changeObj.value.esu_txt:null);
                        
                        that.findFields("bic").gfield("setValue", changeObj.value && changeObj.value.bic ? changeObj.value.bic: null);

                        if (changeObj.flags && changeObj.flags.rucniInitHodnota) {  // pri model apply v modu inicializacnich hodnot se nenvyvola change, proto se nanastaví 
                            $(this).gfield("confirm");
                            that.findFields().gfield("confirm");
                        }
                        if (that.typZobrazeni.Novy) {
                            that.zkontrolujBankovniUcet();
                            that.updateButtonGenerujIbanEnabled();
                        }
                        that.kontrolaPobockaMaBic();

                    }
                })
                .addField("gstringbox", "w-4", {
                    name: "bic",
                    disabled: true,
                })
                .addRow("jres:31900328").addField("gstringbox", { //RC 31900328 : Adresa pobočky
                    name: "adresaPobocky",
                    disabled: true,
                    customClass: "js-adresaAdresa"
                })
                .addRow("jres:31900043").addField("gstringbox", { //RC 31900043 : Název účtu
                    name: "nazev_uctu",
                    disabled: this.GEsuParamsDto.gin_esu_buedit === 2 ? false : true,
                    validators: [
                        new Gordic.Validators.Length({ max: 50 })
                    ],
                })
                // .addSection({ customClass: "w-L-5 w-M-5" })
                //.addRow().addField("gcheck", { //,"w-6"
                //    name: "priz_fu", initialValue: false, label: "jres:31900329",//RC 31900329 : Účet finančního úřadu
                //    align: "oposite", tooltip: "jres:31900330",  //RC 31900330 : Účet finančního úřadu pro zvláštní způsob zajištění daně
                //    model: function (operation, dto, modelOptions) {
                //        switch (operation) {
                //            case "apply": $(this).gfield("setValue", dto.priz_fu === 1); return; // naplneni gcheck z DTO
                //            case "collect": dto.priz_fu = $(this).gfield("getValue") === true ? 1 : 0; return; // naplneni DTO hodnotou z gcheck
                //            default: return "priz_fu"; // model="checkValue" pro operace kterym nerozumime (validations, validators, ...)
                //        }
                //    }
                //})




                //.addField("gcheck", "w-6", {
                //    name: "aktivita", initialValue: true, label: "Aktivní", align: "oposite",
                //    model: function (operation, dto, modelOptions) {
                //        switch (operation) {
                //            case "apply": $(this).gfield("setValue", dto.aktivita === 100); return; // naplneni gcheck z DTO
                //            case "collect": dto.aktivita = $(this).gfield("getValue") === true ? 100 : 900; return; // naplneni DTO hodnotou z gcheck
                //            default: return "aktivita"; // model="checkValue" pro operace kterym nerozumime (validations, validators, ...)
                //        }
                //    }
                //})
                .addRow({ label: "jres:26265161", customClass: that.typZobrazeni.Novy ? "autohide" : "" }).addField("gstringbox", { name: "zmenu_prov_rf", disabled: true }) //RC 26265161 : Změnu provedl
                .addRow({ label: "jres:26265272", customClass: that.typZobrazeni.Novy ? "autohide" : "" }).addField("gdatebox", { name: "dat_zmena", disabled: true }) //RC 26265272 : Datum změny
                ;

            $("<div>").appendTo(this.element).gform("createFrom", FormDetailUctu);

            var vsechnyFieldy = this.findFields();
            if (that.typZobrazeni.Editace) {
                // nastaveni hodnot dto
                this.findFields("nazev_uctu, mena, bu_ci, sk_ci, nazev, bic, adresaPobocky, priz_fu, aktivita, zmenu_prov_rf, dat_zmena")
                    .gfield("model", "apply", this.UcetDto, { initialValues: true }); //
                //  .gfield("model", "validators", this.validators);
                // .gfield("confirm");

                // při initial apply se nenvyvolá change, proto se nenastaví adresa pobočky je nutno to udělat bez initial a následně on change confirmovat hodnotu
                this.findFields("ixs_esu_ban")
                    .gfield("model", "apply", this.UcetDto, { setFlags: {rucniInitHodnota:true} }); //
                // 
                this.findFields("nazev").gfield("model", "validators", this.validators);
            }
            if (that.typZobrazeni.Novy) {
                // 15.07.2025 - TFeik
                // Nastavení výchozích hodnot pro nový účet upraveno tak, aby podporovalo předplnění hodnot z UcetPredplneniDto.
                //this.findFields("mena, nazev_uctu").gfield("model", "apply", { mena: 0, nazev_uctu: this.NazevNovehoUctu }, { initialValues: true });
                //vsechnyFieldy.gfield("model", "validators", this.validators);
                var preplneni = { mena: 0, nazev_uctu: this.NazevNovehoUctu };
                var ucetPredplneniDto = this.UcetPredplneniDto;
                if (ucetPredplneniDto) {
                    // V dto jsou bohužel nevyplněné honoty jako null čímž se v extend použijí a neignorují. 
                    // Mohou tak přebít pednastavené honoty názvu účtu a měny.
                    for (var propt in ucetPredplneniDto) {
                        if (ucetPredplneniDto[propt] === null) {
                            ucetPredplneniDto[propt] = void 0;
                        }
                    }

                    $.extend(preplneni, ucetPredplneniDto);
                }

                vsechnyFieldy
                    // Chci aby se volal change a tak nevolám initialValues: true, ale pouze apply a následně confirm.
                    .gfield("model", "apply", preplneni)
                    .gfield("confirm")
                    .gfield("model", "validators", this.validators)
                    ;
            }
            Gordic.Utils.Form.markRequired(vsechnyFieldy);

            that.povoleniZakazaniPolicek();

            if (this.typZobrazeni.Novy) {
                this.findFields("bu_ci").gfield("focus");
            }
            
            
        },
    
    //#region Oblsuha policek

        inicializace: function () {
            var that = this;
            //this.TypZobrazeniC = 0   //VYMAZAT vyvoj
            this.typZobrazeni = {
                /// <field type='Boolean'>Požadavek na založení nového externího subjektu</field>
                Novy: 0 === this.TypZobrazeniC ? true : false,
                /// <field type='Boolean'>Požadavek na zobrazení externího subjektu</field>
                Detail: 1 === this.TypZobrazeniC ? true : false,
                /// <field type='Boolean'>Požadavek na editaci externího subjektu</field>
                Editace: 2 === this.TypZobrazeniC ? true : false,
                /// <field type='Boolean'>Požadavek na založení nové pobočky externího subjektu</field>
                NovaPobocka: 3 === this.TypZobrazeniC ? true : false,
                /// <field type='Boolean'>Požadavek na založení nového externího subjektu s kopií dat z původního</field>
                NovaKopie: 4 === this.TypZobrazeniC ? true : false
            };

            if ($.content(that).upozorneni) { // pokud přišlo upozornění z C# zobrazí jej
                GDlg.alert($.content(that).upozorneni);
            }

            that.cisloUctuZaloha = null;
            //that.ZobrazSkryjNeaktivni(false); // přesunuto n a load na tab až po otevření tabu

        },
        
        povoleniZakazaniPolicek:function(){
            var that = this;
            if(that.typZobrazeni.Novy){
               $.content(that).findFields("nazev, adresaPobocky, zmenu_prov_rf, dat_zmena").gfield("option", "disabled", true);
            }
            if(that.typZobrazeni.Editace){
                $.content(that).findFields("mena, bu_ci, sk_ci, nazev, ixs_esu_ban, adresaPobocky, priz_fu, zmenu_prov_rf, dat_zmena").gfield("option", "disabled", true);
                this.findForms().gform("waitForValues").done(function () {
                    that.updateButtonGenerujIbanEnabled();
                });
            }

        },

        //#endregion

        //#region Metody

        nactiDto: function(){
            var that = this;
            var dto = {};
            that.findForms("DetailUcet").findFields().gfield("model", "collect", dto);
            dto.idEsuBanky = this.getIdEsuBanky();
            return dto;
        },

        UlozitAZavrit: function () {
            var that =  this;

            var Form = that.findForms("DetailUcet");
            if (Form.gform("isValid"))
            { 
                console.log("Změna? ", Form.gform("hasChanged"));
                if (Form.gform("hasChanged") )
                {
                    that.zkontrolujWarningy();
                }
            }
        },
        
        zkontrolujWarningy: function () {
            
            var that = this;
            var zprava = null;
            var Form = that.findForms("DetailUcet");
            var warning1 = Form.findFields("bu_ci").gfield("getErrors");
            var warning2 = Form.findFields("ixs_esu_ban").gfield("getErrors");
            var ObjEror = [].concat(warning1, warning2);

            $(ObjEror).each(function (index, value) {
                if (value.errorType === "warning") {
                    if (zprava) {
                        zprava = zprava + value.message + "<br>";
                    } else {
                        zprava = value.message + "<br>";
                    }
                }
            });
            if (zprava) {
                GDlg.confirm("jres:31900331", zprava).on("close", function (ev, retVal) { //RC 31900331 : Přejete si přesto uložit?
                    if (retVal) {
                        if (retVal === "yes") {
                            that.ulozBankovniUcet();
                        }
                    }
                });
            } else {
                that.ulozBankovniUcet();
            }
        },

        ulozBankovniUcet:function(dto){
            var that = this; 
            dto = that.nactiDto();
            // doplnění dat do dto
            dto.cisloUctuZaloha = that.cisloUctuZaloha;
         
            this.call("pokusOUlozeni", {
                UcetDtoIn: dto,
                typZob: that.TypZobrazeniC
            })
            .done(function (retVal) { //
                if (retVal) {
                    if (retVal.stav === "error") {
                        GDlg.alert("jres:31900055" +"<br>" + retVal.zprava); //RC 31900055 : Nedošlo k uložení bankovního účtu z důvodu:
                    }
                    if (retVal.stav === "Ok") {
                        $.content(that).close({ stav: retVal.stav, data:dto });
                    }
                }
            })
            .fail(function (xhr, type, vobj) {
                console.log("typ exception: ", type);
                if (type === "validation") {
                    var msg = "jres:31900333" + "(server):<br/>"; //RC 31900333 : Chyba validace
                    $.each(vobj, function (k, v) {
                        for (var i = 0; i < v.length; i++)
                            msg += k + ": " + v[i].message + "<br/>";
                    });
                    GDlg.error(msg);
                }
            });
        
        },

        zkontrolujBankovniUcet: function () {
            //var that = this;
            var errorGroup = "rucniOvereni"; // skupina pro errory, které jsou vyvolány ruční kontrolou
            var buCiField = $.content(this).findFields("bu_ci");

            buCiField.gfield("resetErrors", errorGroup);

            var dto = this.nactiDto();

            if (dto.bu_ci !== null && dto.mena !== null) {  //&& dto.ixs_esu_ban !== null ) {
                this.call("KontrolaCislaUctu", { UcetDto: dto })
                    .done(function (retVal) { //
                        console.log("Kontrola cisla uctu", retVal);

                        // 04.08.2025 - TFeik
                        // Vyhodnocení přděláno na switch a doplněno resetování errorů pro stav ok a info.
                        // Mohlo se totiž stát, že bylo spuštěno několik kontrol přičemž jedna nastavila chyby a další co už prob2hla v pořádku chyby ponechala.
                        if (retVal) {
                            switch (retVal.stav) {
                                case "error":
                                    buCiField.gfield("setError", { message: retVal.zprava, stopping: true, group: errorGroup, errorType: retVal.stav });
                                    break;

                                case "warning":
                                    buCiField.gfield("setError", { message: retVal.zprava, stopping: false, group: errorGroup, errorType: retVal.stav });
                                    break;

                                case "info":
                                case "ok":
                                default:
                                    buCiField.gfield("resetErrors", errorGroup);
                                    break;
                            }

                            var opravenaHodnotaGstring = retVal.opravenaHodnotaGstring;
                            if (opravenaHodnotaGstring) {
                                buCiField.gfield("setValue", opravenaHodnotaGstring, { rucniSetovaniBezReakce: true });
                            }
                        }

                        //if (retVal && retVal.stav === "warning") {
                        //    buCiField.gfield("setError", { message: retVal.zprava, stopping: false, group: "rucniOvereni", errorType: retVal.stav });
                        //}
                        //if (retVal && retVal.stav === "error") {
                        //    buCiField.gfield("setError", { message: retVal.zprava, stopping: true, group: "rucniOvereni", errorType: retVal.stav });
                        //}
                        //if (retVal.opravenaHodnotaGstring)
                        //{
                        //    buCiField.gfield("setValue", retVal.opravenaHodnotaGstring, { rucniSetovaniBezReakce: true });
                        //}
                    })
                    .fail(function (xhr, type, vobj) {
                        console.log("typ exception: ", xhr, type, vobj);
                        //if (type === "validation") {
                        //    var msg = "Chyba validace (server):<br/>";
                        //    $.each(vobj, function (k, v) {
                        //        for (var i = 0; i < v.length; i++)
                        //            msg += k + ": " + v[i].message + "<br/>";
                        //    });
                        //    GDlg.error(msg);
                        //}
                    });

            }
        },

        kontrolaPobockaMaBic: function () {
            var that = this;
            var polickoPobocky = $.content(this).findFields("ixs_esu_ban");
            var bic;
            polickoPobocky.gfield("resetErrors", "rucniOvereni");
            var value = polickoPobocky.gfield("getValue");
            var dto = that.nactiDto();
            if (dto.mena !== null && value !== null && (value.bic === null || value.bic === "") ) {  //&& dto.ixs_esu_ban !== null ) {
                this.call("KontrolaPobockaMaBic", { UcetDto: dto})
                    .done(function (retVal) { //
                        console.log("Kontrola BIC", retVal);
                        if (retVal.stav !== "ok") {
                            polickoPobocky.gfield("setError", { message: retVal.zprava, stopping: false, group: "rucniOvereni", errorType: retVal.stav });
                        }
                        
                    })
                    .fail(function (xhr, type, vobj) {
                        console.log("typ exception: ", xhr, type, vobj);
                        //if (type === "validation") {
                        //    var msg = "Chyba validace (server):<br/>";
                        //    $.each(vobj, function (k, v) {
                        //        for (var i = 0; i < v.length; i++)
                        //            msg += k + ": " + v[i].message + "<br/>";
                        //    });
                        //    GDlg.error(msg);
                        //}
                    });

            }
        },

        prevodCislaNaIBAN: function () {
            var that = this;
            var dto = that.nactiDto();
            if (dto.mena !== null && dto.bu_ci !== null && dto.sk_ci !== null) {  //&& dto.ixs_esu_ban !== null ) {
                this.call("PrevodNaIBan", { UcetDto: dto })
                    .done(function (retVal) { //
                        console.log("převod na Iban", retVal);
                        if (retVal) {
                            var field = $.content(that).findFields("bu_ci");
                            that.cisloUctuZaloha = retVal.cisloUctuZaloha;
                            field.gfield("setValue", retVal.iban, { rucniSetovaniIbanu: true });
                            that.updateButtonGenerujIbanEnabled();
                        }

                    })
                    .fail(function (xhr, type, vobj) {
                        console.log("typ exception: ", xhr, type, vobj);
                        //if (type === "validation") {
                        //    var msg = "Chyba validace (server):<br/>";
                        //    $.each(vobj, function (k, v) {
                        //        for (var i = 0; i < v.length; i++)
                        //            msg += k + ": " + v[i].message + "<br/>";
                        //    });
                        //    GDlg.error(msg);
                        //}
                    });

            }
        },

        updateButtonGenerujIbanEnabled: function () {
            var that = this;
            var dto = that.nactiDto();
            if (dto.mena !== null && dto.bu_ci !== null && dto.sk_ci !== null) {  //&& dto.ixs_esu_ban !== null ) {
                this.call("UpdateButtonGenerujIbanEnabled", { UcetDto: dto })
                    .done(function (retVal) { 
                        if (retVal) {
                            that.actions.actPrevestNaIBAN.enabled(true);
                        } else {
                            that.actions.actPrevestNaIBAN.enabled(false);
                        }

                    })
                    .fail(function (xhr, type, vobj) {
                        console.log("typ exception: ", xhr, type, vobj);
                        //if (type === "validation") {
                        //    var msg = "Chyba validace (server):<br/>";
                        //    $.each(vobj, function (k, v) {
                        //        for (var i = 0; i < v.length; i++)
                        //            msg += k + ": " + v[i].message + "<br/>";
                        //    });
                        //    GDlg.error(msg);
                        //}
                    });

            }

        },

        zkontrolujPocetPobocek: function (sk) { // pokusi se dohledat kod obce poku je zadano jenom string název
            var that = this;
            this.log.trace("zkontrolujPocetPobocek");

            if (sk != null) {
                this.beginOperation();
                this.neexistujePobocka = false;
                var data = new Gordic.Data.Readers.BankovniPobocky().getData({ sk: sk }).done(function (view) {
                    if (view && view.length > 0) {
                        that.upravRequiredNaFieldu("ixs_esu_ban", true);
                        that.neexistujePobocka = false;
                        that.findFields("ixs_esu_ban").gfield("option", "disabled", false);
                    } else {
                        that.upravRequiredNaFieldu("ixs_esu_ban", false);
                        that.neexistujePobocka = true;
                        that.findFields("ixs_esu_ban").gfield("option", "disabled", true);
                    }
                }).always(function () {
                    that.endOperation();
                });
            } else {
                that.upravRequiredNaFieldu("ixs_esu_ban", true);
                this.neexistujePobocka = false;
                that.findFields("ixs_esu_ban").gfield("option", "disabled", false);
            }
        },

        upravRequiredNaFieldu: function (fieldName, required) {
            this.log.trace("upravRequiredNaFieldu");
            var that = this;
            var fields = that.findFields(fieldName);
            fields.each(function (index, element) {
                var puvodniValidatory = $(element).gfield("option", "validators");
                var noveValidatory = puvodniValidatory.filter(function (Validator) {
                    return !(Validator instanceof Gordic.Validators.Required);
                });
                if (required) {
                    noveValidatory.push(new Gordic.Validators.Required());
                }
                $(element).gfield("option", "validators", noveValidatory);
            });
            var nalezeneFieldy = this.findFields(fieldName);
            Utils.Form.markRequired(nalezeneFieldy);
        },

        getIdEsuBanky: function () {
            var that = this;
            if (this.neexistujePobocka) {
                var smerovyKodValue = this.findFields("sk_ci").gfield("getValue");
                if (smerovyKodValue != null) {
                    return smerovyKodValue.ixs_esu;
                }
            }
            else {
                var pobovkaValue = this.findFields("ixs_esu_ban").gfield("getValue");
                if (pobovkaValue != null) {
                    return pobovkaValue.ixs_esu;
                }
            }
            return null;
        },

        //that.cisloUctuZaloha 

        //#endregion
       



        closeDet: function () {
            $.content(this).close();
        }
        


   
    }, { extendIntellisense: GContent });
    

});


