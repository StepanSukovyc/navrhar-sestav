$(function () {
    "use strict";
    namespace("Gordic.Esu.WebClient.DetailEsuDlg", {
        /// <field type='server.GEsuParamsDto'>adfasdf</field> 
        GEsuParamsDto: this.GEsuParamsDto, // dto interlicense
        /// <field type='server.GDetailEsuItemsDto'>asdfasdf</field> 
        model: this.model,
        ProbihaAsynchroniOperace: false,
        m_bAresOk: true,
        // puvodniEsu   // ixs_esu puvodne otvírtaného
        // flagNovehoEsu:null,

        logOptions: { name: "Gordic.Esu.WebClient.DetailEsuDlg", fileName: "DetailEsuDlg.js", authorCode: 484 },

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
            NovaKopie: 4 === this.TypZobrazeniC ? true : false
        },

        onContentReady: function () {
            /// <summary>
            /// Vytvoření formuláře
            /// </summary>
            this.log.trace("onContentReady");
            if (this.puvodniEsu == null) {
                this.puvodniEsu = this.model.IxsEsu;
            }
            var that = this;

            this.esuUtils = this.createServiceContent({ className: "Gordic.Gin.WebClient.GFilterStorageService" });

            //this.isTechnologickeCentrum   zda se jedná o technologické centrum

            that.beginOperation();
            that.inicializace();
            /*
            console.log("Esu Model: ", $.content(this).model);
            console.log("EkoSubmodel: ", $.content(this).EkoSubmodel);
            console.log("FiltrBankaTypOrg: ", that.FiltrBankaTypOrg);
            console.log("ListUrPri: ", that.ListUrPri);
            console.log("Esu Parametry: ", $.content(this).GEsuParamsDto);
            console.log("Typ Zobrazení JS: ", that.typZobrazeni);
            console.log("TabulkaAdres: ", that.TabulkaAdres);
            console.log("doklady: ", that.model.doklady); // přesunuto do model.
            */
            var caption = that.model.Nazev || "jres:26265098"; //RC 26265098 : Externí subjekt
            this.newOps({ title: caption });

            this.vybudovaniMenu();

            this.nactiObsahZOknaElPodani(this);
            //#region Definice Hlavního formu

            var hlavniForm = new Gordic.Forms
                .Form({ name: "HlavniForm", layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0, breaks-500-1000" }) // customClass: "w-S-h" L-4-8-0
                .addSection({ label: "jres:31900892" }) //RC 31900892 : Základní profil //layoutDescriptor: "L-3-9-0"

                .addRow("jres:31900354") //RC 31900354 : Typ subjektu, organizace

                .addField("gselectbox", "w-6", Gordic.Prefabs.Select.gincesu(), {
                    name: "TypEsu",
                    customClass: "js-TSub-select " + " " + Gordic.Components.GFieldAssist.ignoreClass,
                    model: "model.TypEsu=value.typ_esu",
                    change: function (ev, changeObj) {
                        //console.log("Změněná hodnota v master Políčku: ", changeObj.value);
                        var typ = 0;
                        if (changeObj.value && changeObj.value.typ_esu) {                    //nacteni zmenene hodnoty -> 10 pravnicka 20 fyzicka 30 osvc
                            typ = changeObj.value.typ_esu;                    //nacteni zmenene hodnoty -> 10 pravnicka 20 fyzicka 30 osvc
                        }

                        //$.content(this).showHideFields(typ);                  // funkce pro přerovnání formuláře podle typu 
                        that.showHideFields(typ);
                        that.pokusSePrednastavitTypOrganizacePokudJeNaVyberJenJedno(typ);
                    },
                    serverFilters: {
                        typ_esu: [10, 20, 30]
                    }
                })
                .addField("gselectbox", "w-6", Gordic.Prefabs.Select.ginctyo(), {
                    name: "TypOrganizace",
                    customClass: "js-TSub-selectOrg " + Gordic.Components.GFieldAssist.ignoreClass,
                    model: "model.TypOrganizace=value.typ_org",
                    helperLimit: 150,
                    change: function (ev, changeObj) {
                        if (changeObj.value && changeObj.value.typ_org === 60) { // zobrazení/ skrytí typu banky a bicu
                            if (that.EkoSubmodel) {
                                that.findFields("BicTypBan").gformrow().show();  // typ banky pouze v eko sub modelu
                            }
                            that.findFields("Bic").gformrow().show();
                            if (!changeObj.flags.NastaveniInit) { that.zkontrolujBICUBanky(); }

                        } else {
                            that.findFields("BicTypBan, Bic").gformrow().hide();
                        }
                        if (!changeObj.flags.BezObalky) { that.UpdateObalkovaAdresa(); } // vyvolání update obálky
                    },

                    serverFilters: {
                        typ_esu: new Gordic.Forms.Dependency(
                            "TypEsu", "typ_esu", false
                            //function (thisValue, masterField) {

                            //} 
                            //=> masterValue">(default=thisValue)
                        ),              //, bool znamená, zda lze vyplnit hodnotu aniž by bylo vyplněné master políčko
                        priz_banka: that.FiltrBankaTypOrg
                        //typ_org_txt: ["!= zaměstnanec", "!= Akciová spolecnost", "!= Banka-stát.penež.úst"] //novy gin_esu_rp_zvty //editace gin_esu_rp_zety
                    }
                })
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                .addRow({ label: "jres:31900355" }) //RC 31900355 : Titul, jméno, příjmení, titul za
                .addField("gstringbox", "w-2", {
                    placeholder: "Tit.",
                    name: "TitulPred", customClass: "js-TSub-fyzicka",
                    change: function (ev, changeObj) { if (!changeObj.flags.BezObalky) { that.UpdateObalkovaAdresa(); } }
                })
                .addField("gstringbox", "w-4", {
                    name: "Jmeno", customClass: "js-TSub-fyzicka",
                    placeholder: "Jméno",
                    change: function (ev, changeObj) {
                        that.changeIsdsPole();
                        that.DoplnNazevZJmenaAPrijmeni(changeObj.flags.BezObalky);
                        if (!changeObj.flags.BezObalky) { that.UpdateObalkovaAdresa(); }
                    }
                })
                .addField("gstringbox", "w-4", {
                    name: "Prijmeni", customClass: "js-TSub-fyzicka",
                    placeholder: "Příjmení",
                    change: function (ev, changeObj) {
                        that.changeIsdsPole();
                        that.DoplnNazevZJmenaAPrijmeni(changeObj.flags.BezObalky);
                        if (!changeObj.flags.BezObalky) { that.UpdateObalkovaAdresa(); }
                    }
                })
                .addField("gstringbox", "w-2", {
                    name: "TitulZa", customClass: "js-TSub-fyzicka",
                    placeholder: "Tit. za",
                    change: function (ev, changeObj) { if (!changeObj.flags.BezObalky) { that.UpdateObalkovaAdresa(); } }
                })
                //MiJmeno MiPrijmeni
                .addRow({ label: "jres:31900356" }) //RC 31900356 : M. jméno, M.Přijmení
                .addField("gstringbox", "w-6", {
                    name: "MiJmeno", customClass: "js-TSub-fyzicka js-TSub-osvcNezobrazovat",
                    change: function (ev, changeObj) { if (!changeObj.flags.BezObalky) { ; } }
                })
                .addField("gstringbox", "w-6", {
                    name: "MiPrijmeni", customClass: "js-TSub-fyzicka js-TSub-osvcNezobrazovat",
                    change: function (ev, changeObj) { if (!changeObj.flags.BezObalky) { ; } }
                })
                .addRow("jres:32100017").addField("gstringbox", { //RC 32100017 : Obchodní jméno
                    name: "ObchodniJmeno", customClass: "js-TSub-pravnicka", rows: "2",
                    change: function (ev, changeObj) {
                        that.changeIsdsPole();
                        that.doplnNazevZObchodnihoJmena();
                        if (!changeObj.flags.BezObalky) {
                            that.UpdateObalkovaAdresa();
                        }
                    }
                })

                .addRow("jres:26265146").addField("gstringbox", {
                    name: "Nazev", //RC 26265146 : Název
                    change: function (ev, changeObj) {
                        var typEsuValue = that.findFields("TypEsu").gfield("getValue");
                        var typ = typEsuValue ? typEsuValue.typ_esu : 0; //0 nepřiřazeno   10 pravnicka   20 fyzicka   30 osvc
                        if (typ != 20) {
                            that.changeIsdsPole();
                        }
                        
                        if (!changeObj.flags.BezObalky) {
                            that.UpdateObalkovaAdresa();
                        }
                    } // vyvolání update obálky
                })
                //.addRow("Obchodní jméno").addField("gstringbox", { name: "ObchodniJmeno", placeholder: '', customClass: "js-TSub-pravnicka", rows: "2" })


                .addRow("jres:31900087").addField("gstringbox", { name: "RodPrijmeni", }) //customClass: "js-TSub-fyzicka",  //RC 31900087 : Rodné příjmení
                .addRow("jres:31900315").addField("gstringbox", { name: "MistoNar", customClass: "js-TSub-fyzicka" }) //RC 31900315 : Místo narození
                .addRow("jres:26265336").addField("gselectbox", {
                    name: "Pohlavi",
                    model: "model.Pohlavi=value.pohlavi",
                    customClass: "js-TSub-fyzicka" + " " + Gordic.Components.GFieldAssist.ignoreClass
                }, Gordic.Prefabs.Select.gincpoh()) //pohlavi //RC 26265336 : Pohlaví
                .addRow("jres:26265328").addField("gselectbox", {
                    name: "RodStav",
                    model: "model.RodStav=value.rod_stav",
                    customClass: "js-TSub-fyzicka" + " " + Gordic.Components.GFieldAssist.ignoreClass
                }, Gordic.Prefabs.Select.robcrst()) //rod_stav //RC 26265328 : Stav
                .addRow("jres:31900357") //RC 31900357 : Zkratka, poznámka
                .addField("gstringbox", "w-2", {
                    name: "Zkratka",
                    placeholder: "Zkratka",
                })
                .addField("gstringbox", "w-10", {
                    name: "Poznamka",
                    placeholder: "Poznámka",
                }) //


                .addRow("jres:31900663").addField("gstringbox", { //RC 31900663 : Údaje vázané k dokumentu
                    name: "Wfldkou",
                    disabled: true,
                    states: [
                        { icon: 'fa-info-circle g-state-text g-state-info', tooltip: "jres:31900664" } // customClass: "g-state-info" //RC 31900664 : Osobní údaje vázané na pid dokumentu.
                    ]

                })

                .addSection({ label: "&nbsp;", customClass: this.ModJmennyRejstrik === 1 ? "" : "w-L-3 w-M-3" })
                .addRow("jres:31900359").addField("gstringbox", Gordic.Prefabs.String.ixs(), { //RC 31900359 : Identifikátor
                    name: "IxsEsu", disabled: true
                })
                .addRow("jres:31900360").addField("gselectbox", Gordic.Prefabs.Select.ekoctyb(), { //RC 31900360 : Typ banky
                    name: "BicTypBan",
                    model: "model.BicTypBan=value.typ_ban",
                    customClass: Gordic.Components.GFieldAssist.ignoreClass,
                    change: function (ev, changeObj) {

                        that.zkontrolujBICUBanky();

                    }
                }) //Typ Banky
                .addRow("jres:31900044").addField("gstringbox", { //RC 31900044 : BIC
                    name: "Bic", //
                    change: function (ev, changeObj) {
                        that.zkontrolujBICUBanky();
                    }
                }) //Příznak vykazovaci
                .addRow("jres:31900361").addField("gstringbox", { name: "ISZRtxt", disabled: true }) //RC 31900361 : Ověření ISZR
                .addRow("jres:31900362")
                .addField("gselectbox", {
                    name: "StupenVerifikace",
                    model: "model.StupenVerifikace=value.stupen_ver",
                    customClass: Gordic.Components.GFieldAssist.ignoreClass,
                    serverFilters: {
                        stupen_ver: [0, 5, 10, 20] //FilterStupenVer = new GBaseFilter<GInt16>(0, 5, 10, 20); 
                    }
                }, Gordic.Prefabs.Select.gincses()) // stupen_ver //RC 31900362 : Verifikace
                .addRow("jres:26265288").addField("gstringbox", { //RC 26265288 : IČO
                    name: "Ico", customClass: "js-TSub-pravnicka",
                    change: function (ev, changeObj) {
                        that.changeIsdsPole();
                        that.zkontrolujICO();
                        that.NastavPriznakNeovereniAres();
                    }

                })
                .addRow("jres:32100016")
                .addField("gstringbox", {
                    name: "Dic",
                    customClass: "js-TSub-pravnicka",
                    validators: [
                        new Gordic.Validators.Base({
                            message: "jres:31901135",  //RC 31901135 : DIČ pro ČR není validní
                            validate: function (value, element) {
                                var val = value;
                                var valid = true;
                                var value = val;
                                if (value && value.length > 0) {

                                    var valStat = that.findFields("Stat").gfield("getValue");
                                    if ((value.length > 1 && value.substring(0, 2) == "CZ") || valStat && valStat.stat === 42) {
                                        var regex = /^CZ[0-9]{8,10}$/;
                                        valid = regex.test(value);
                                    } else {
                                        valid = true;
                                    }
                                }
                                return valid;
                            },
                            group: "customValidation"
                        })
                    ],

                    buttons: [{
                        requireEdit: false,
                        action: this.actions.add({
                            name: "actOveritPlatceDph",
                            icon: 'gi-magglass',
                            customClass: "",
                            tooltip: "jres:31901278", //RC 31901278 : Otevřít Registr plátců DPH
                            run: function (ev, ctx) {
                                that.overitPlatceDph();
                            }
                        })
                    }]
                }) //RC 32100016 : DIČ
                .addRow("jres:31900363").addField("gselectbox", Gordic.Prefabs.Select.gincsta(), { //RC 31900363 : Státní přís.
                    name: "StatSp",
                    model: "model.StatSp=value.stat",
                    customClass: "js-TSub-fyzicka" + " " + Gordic.Components.GFieldAssist.ignoreClass,
                    change: function (ev, changeObj) {
                        that.OverRodneCislo();
                    }
                }) //stat


                .addRow("jres:31900364").addField("gdatebox", { //RC 31900364 : D. narození
                    name: "DatNar", customClass: "js-TSub-fyzicka",
                    format: this.gin_esu_dnzobr == 2 && (!this.typZobrazeni.Novy) ? "yyyy" : undefined,
                    change: function (ev, changeObj) {
                        that.changeIsdsPole();
                        that.GenerovaniKontrolaRcADatNaroz();
                    }
                })

                /* .addPrefab(Gordic.Gin.Prefabs.denMesicRok({
                     fieldOptions: {
                        
                         showSelectButton:false
                     },
                     name: "DatNar",
                     label: "D. narození",
                     output: "string"
                 }))
             */
                .addRow("jres:31900365").addField("gstringbox", { //RC 31900365 : Přezdívky
                    name: "Prezdivka", customClass: "",
                    change: function (ev, changeObj) {
                    }
                }) //

                .addSection({ label: "jres:31900893", customClass: "w-L-3 w-M-3 js-agendovaSekce" }) //RC 31900893 : Agendová data
                .addRow("jres:26265289").addField("gstringbox", { //RC 26265289 : Rodné číslo
                    name: "RodneCislo",
                    customClass: "js-TSub-fyzicka",
                    inputType: (!that.GEsuParamsDto.gin_esu_rczobr && !that.typZobrazeni.Novy ? "password" : "text"),   // gin_esu_rczobr rodné číslo bude nečitelné
                    disabled: (!that.GEsuParamsDto.gin_esu_rczobr && !that.typZobrazeni.Novy ? true : false),
                    change: function (ev, changeObj) {
                        if (changeObj.value !== null) {

                            //that.OverRodneCislo(changeObj.value, $(this).gform().findFields("StatSp").gfield("getValue").stat);
                            //that.findFields("StatSp").gfield("getValueAsync").done(function (valueStat) {
                            that.OverRodneCislo(); //changeObj.value, valueStat.stat
                            //});

                            that.GenerovaniKontrolaRcADatNaroz();
                        }
                    }
                })



                .addRow("jres:31900366").addField("gstringbox", { //RC 31900366 : ID DS
                    name: "IdDs",
                    disabled: true,
                    validators: (this.GEsuParamsDto.gin_upsr_povol != 1) ? [new Gordic.Validators.Length({ min: 7, max: 7, message: "jres:31901234", autoValidate: true })] : undefined, //RC 31901234 : Identifikátor datové schránky musí mít 7 znaků.
                    change: function (ev, changeObj) {
                        if (that.GEsuParamsDto.gin_upsr_povol != 1 && that.GEsuParamsDto.gin_esu_isds_id) {
                            if (this.classList.contains("gfield-error")) { // chyba
                                return;
                            } else if (changeObj.value == null) {
                                that.IdDsOverene = null;
                            } else if (that.IdDsOverene != changeObj.value
                                && that.GEsuParamsDto.gin_ssl_datschr
                                && (that.typZobrazeni.Novy || that.typZobrazeni.NovaPobocka || that.typZobrazeni.Editace || that.typZobrazeni.NovaKopie)) {
                                // hodnota se neshoduje s tou předchozí, zkusím ověřit
                                that.overitISDS(false);
                                that.IdDsOverene = changeObj.value;
                            } else {
                                ; // nemělo by nastávat
                            }
                        }

                        that.changeIsdsPole();
                        that.updateIddsIcons();
                        that.updateDsStatus();
                    },
                    buttons: [{
                        requireEdit: false,
                        action: this.actions.add({
                            name: "actIdDsFieldButton",
                            icon: 'gi-ds',
                            customClass: "",
                            tooltip: "jres:31900904", //RC 31900904 : Datová schránka
                            run: function (ev, ctx) {
                                that.historieDs();
                            }
                        })
                    }, {
                            requireEdit: false,
                            action: this.actions.add({
                                name: "actIdDsOdstraneni",
                                icon: 'gi-window-close ',
                                visible: that.GEsuParamsDto.gin_esu_isdsods && that.typZobrazeni.Editace,
                                customClass: "g-state-text g-state-important",
                                tooltip: "jres:31901268", //RC 31901268 : Odstranit IdDs
                                run: function (ev, ctx) {
                                    that.odstranitIdDs();
                                }
                            })
                        }

                    ],


                    //buttons: [{
                    //    requireEdit: false,
                    //    action: new GAction({
                    //        caption: "", name: "actIdDsOdstraneni", icon: "gi-bin", tooltip: "Odstranění ID DS", run: function (ev, ctx) { }
                    //    })
                    //}, {
                    //    requireEdit: false,
                    //    action: new GAction({
                    //        caption: "", name: "actIdDSEditace", icon: "gi-pencil", tooltip: "Editace ID DS", run: function (ev, ctx) {
                    //            that.findFields("IdDs").gfield("option", "disabled", false);
                    //        }
                    //    })
                    //}],


                });
            hlavniForm
                .addRow("jres:31901118").addField("gstringbox", { //RC 31901118 : Číslo schránky
                    name: "SkEdeskId",
                    disabled: that.GEsuParamsDto.gin_upsr_povol === 1 ? false : true,



                });

            hlavniForm
                .addRow("jres:31900367").addField("gstringbox", { name: "IdGex", disabled: true }) //RC 31900367 : ID GEX
                .addRow("jres:31900925").addField("gstringbox", {
                    name: "IdExt",
                    disabled: true,
                    states: [
                        { icon: 'fa-exclamation-triangle', customClass: "g-state-warning", tooltip: this.model.IdExtWarning }
                    ],
                }) //RC 31900925 : ID EXT
                .addRow("jres:31900316").addField("gselectbox", Gordic.Prefabs.Select.gincdph(), { //priz_dph //RC 31900316 : Plátce DPH
                    name: "PrizDph",
                    customClass: "js-selPlatceDPH" + " " + Gordic.Components.GFieldAssist.ignoreClass,
                    model: "model.PrizDph=value.priz_dph",
                    change: function (ev, changeObj) {
                        var priz_dph = 0;
                        if (changeObj.value && changeObj.value.priz_dph === 10) {
                            that.actions.actStatPlatceDPH.update({
                                enabled: true, caption: "jres:31900316", //RC 31900316 : Plátce DPH
                                tooltip: "jres:31900414" //RC 31900414 : Objekt je plátce DPH
                            });
                            priz_dph = changeObj.value.priz_dph;
                        } else {
                            that.actions.actStatPlatceDPH.update({
                                enabled: true, caption: "jres:31900413", //RC 31900413 : Neplátce DPH
                                tooltip: "jres:31900415" //RC 31900415 : Objekt není plátce DPH
                            });
                        }
                        that.upravRequiredNaFieldu("Dic", (priz_dph === 10 && that.GEsuParamsDto.gin_esu_pdicdph ? true : false)); // u plátceDPH  nutné vyplnit DIČ + gin_esu_pdicdph
                    }
                })
                .addRow("jres:26265284").addField("gstringbox", { //RC 26265284 : Insolvence
                    name: "Insolvence",
                    disabled: true, // TODO
                    model: "model.Insolvence=value",
                    change: function (ev, changeObj) {
                        if (changeObj.value) {
                            that.Insolvence(true);
                        }
                        else {
                            that.Insolvence(false);
                        }
                    },
                    buttons: [
                        {
                            icon: Gordic.Gin.Icons.ActionEnum.insolvence,
                            requireEdit: false,
                            customClass: "js-butonekInsolvence",
                            action: new GAction({
                                name: 'actInsolvence',
                                run: function (ev, ctx) {
                                    that.HledatVInsolvencnimRejstriku();
                                }
                            })
                        }
                    ]
                })
                .addRow("jres:31900368").addField("gselectbox", { //RC 31900368 : Partner IISSP
                    name: "PartnerUct",
                    model: "model.PartnerUct=value.partner_iissp",
                    verificationNeeded: true,
                    verify: function (value) {
                        //var value = value;
                        if (value) {
                            if (typeof value == "object" && value.partner_iissp.length !== 8) { //value.partner_iissp.length > 7 && value.partner_iissp.length < 11
                                value = value.partner_iissp;
                            }
                            if (typeof value == "string" && value.length === 8) { //value.length > 7 && value.length < 11
                                return { partner_iissp: value, partner_uct: value };
                            }
                        }
                    }
                }, Gordic.Prefabs.Select.gincpai()) //partner_iissp
                .addRow("jres:26265191").addField("gstringbox", { //RC 26265191 : OČ
                    name: "Oc",
                    customClass: "js-TSub-fyzicka",
                    change: function (ev, changeObj) {
                        that.OverOsobniCislo();
                    },
                })
                .addRow("jres:26265252").addField("gstringbox", { name: "Bio", customClass: "js-TSub-fyzicka" }) //RC 26265252 : BIO
                .addRow("jres:31900369").addField("gselectbox", Gordic.Prefabs.Select.ginsurp(), { //RC 31900369 : Úr. přístupu
                    name: "UrPri",
                    model: "model.UrPri=value.ur_pri",
                    customClass: Gordic.Components.GFieldAssist.ignoreClass,
                    serverFilters: {
                        ur_pri: that.ListUrPri
                    }
                });
            var FormDoklady = new Gordic.Forms.Form()
                .addRow("jres:31900370").addField("gselectbox", Gordic.Prefabs.Select.robcpru(), { //RC 31900370 : Typ Průkazu
                    name: "typ_pruk",
                    model: "model.typ_pruk=value.typ_pruk; model.typ_pruk_txt=value.typ_pruk_txt",
                    customClass: Gordic.Components.GFieldAssist.ignoreClass,
                    validators: [new Gordic.Validators.Required()]
                })
                .addRow("jres:31900371").addField("gstringbox", { //RC 31900371 : Číslo průkazu (ID)
                    name: "id_pruk",
                    validators: [new Gordic.Validators.Required()]
                })
                .addRow("jres:31900372").addField("gstringbox", { name: "vydal" }) //RC 31900372 : Vydal
                .addRow("jres:31900373").addField("gdatebox", { name: "dat_vydani" }) //RC 31900373 : Datum vydání
                .addRow("jres:31900374").addField("gdatebox", { name: "dat_platnost_do" }); //RC 31900374 : Datum platnosti do

            hlavniForm.addRow("jres:31900375").addField("gformbox", { // Průkazy totožnosti  //RC 31900375 : Průkazy
                name: "doklady",
                customClass: "js-TSub-fyzicka js-ignore-mark-required",
                itemTemplate: function (value) {
                    return "<span class='" + (value.aktivita === 900 ? 'ui-state-disabled' : '') + "'> " + value.typ_pruk_txt + " : " + value.id_pruk + "</span>";
                },
                //itemTemplate:  "{typ_pruk_txt} : {id_pruk}",
                dialogOptions: {
                    width: 500,
                    height: 300
                },
                //emptyValue: null,
                defaultValue: null,
                //initialValue: null,
                itemWidth: "w-12",
                multi: true,
                form: FormDoklady,
                newItemData: { aktivita: 100 },
                itemEditable: function (value) {
                    return value.aktivita === 100;
                },
                itemDeletable: false,
                itemCreated: function (ev, div, value, index, btnAdd) {
                    var button = $((value.aktivita === 100 ? "<span class='gi gi-window-close'>" : "<span class='gi gi-plus'>"))

                        .click(function (ev) {
                            if (value.aktivita === 100) {
                                value.aktivita = 900;
                                $(div).find(".button-edit").removeClass("fa-pencil").addClass("fa-eye").gdomcontext({ viewOnly: true });
                                $(div).find(".gselectbox-item > span").addClass("ui-state-disabled");
                                button.removeClass("gi-window-close").addClass("gi-plus");
                            } else {
                                value.aktivita = 100;
                                $(div).find(".button-edit").removeClass("fa-eye").addClass("fa-pencil").gdomcontext({ viewOnly: false });
                                $(div).find(".gselectbox-item > span").removeClass("ui-state-disabled");
                                button.removeClass("gi-plus").addClass("gi-window-close");
                            }
                            //console.log(div);
                        });
                    btnAdd(button);
                }


                //model: "model.typ_pruk=value.typ_pruk; model.id_pruk=value.id_pruk",
                // při odstranění nastavit aktivitu na 900
            })
                .addRow("jres:31900358") //RC 31900358 : Datum úmrtí
                .addField("gdatebox", { name: "DatUmrti", customClass: "" }) //"w-6",
                //.addText("", "w-1")
                .addField("gcheck", { //"w-6",
                    name: "PrizUmrti", initialValue: false, label: "jres:31900405", align: "oposite", customClass: "js-priznakUmrti", //RC 31900405 : Příznak umrtí
                    model: function (operation, dto, modelOptions) {
                        switch (operation) {
                            case "apply":
                                if (dto.PrizUmrti != null) {
                                    $(this).gfield("setValue", dto.PrizUmrti === 1); return; // naplneni gcheck z DTO
                                }
                                break;
                            case "collect": dto.PrizUmrti = $(this).gfield("getValue") === true ? 1 : 0; return; // naplneni DTO hodnotou z gcheck
                            default: return "PrizUmrti";
                        }
                    }
                })

                ;
            //#endregion

            //#region Sídlo Obalka Kontakty
            hlavniForm

                .addSection("jres:31900376") //RC 31900376 : Sídlo
                .addRow("jres:26265354").addField("gselectbox", { //RC 26265354 : Typ adresy
                    name: "TypAdr",
                    dropdown: true,
                    customClass: Gordic.Components.GFieldAssist.ignoreClass,
                    helperCustomizer: function (data) {
                        var newData = [];
                        var m_oRadioButtonTrvala = !that.ReadOnlyMode && that.LzeMenitTypAdresyTrvala(); // ALF 18.11.2014
                        var m_oRadioButtonDorucovaci = !that.ReadOnlyMode && that.LzeMenitTypAdresyDorucovaciKontaktni();
                        var m_oRadioButtonKontakt = !that.ReadOnlyMode && that.GEsuParamsDto.gin_esu_zatypak && that.LzeMenitTypAdresyDorucovaciKontaktni();

                        var datazFieldu = {};
                        that.findFields("TypEsu, StupenVerifikace").gfield("model", "collect", datazFieldu);
                        if (datazFieldu.StupenVerifikace != null && datazFieldu.TypEsu) {
                            var ovRobRos = (datazFieldu.StupenVerifikace == 55) || (datazFieldu.StupenVerifikace == -55) || (datazFieldu.StupenVerifikace == 65) || that.ReadOnlyMode;
                            m_oRadioButtonKontakt = !that.ReadOnlyMode && !ovRobRos && that.GEsuParamsDto.gin_esu_zatypak && (datazFieldu.TypEsu == 20)
                                && that.LzeMenitTypAdresyDorucovaciKontaktni();
                        }

                        newData = $.grep(data, function (value) {
                            var enable = false;
                            switch (value.typ) {
                                case 0: //Trvalá
                                    enable = m_oRadioButtonTrvala;
                                    break;
                                case 10: //Doručovací
                                    enable = m_oRadioButtonDorucovaci;
                                    break;
                                case 30: //Kontaktní
                                    enable = m_oRadioButtonKontakt;
                                    break;
                            }
                            // ALF 18.11.2014
                            return enable;
                        });
                        return newData;
                    },
                    model: "model.TypAdr=value.typ",
                    itemTemplate: "{nazev}",
                    data: new Gordic.Data.View([
                        { typ: 0, nazev: "Trvalá" },
                        { typ: 10, nazev: "Doručovací" },
                        { typ: 30, nazev: "Kontaktní" }
                    ], { key: "typ" })

                })

                .addRow("jres:31900377").addField("gselectbox", "w-8", Gordic.Prefabs.Select.szrsuli(), { //RC 31900377 : Ulice, Čp, Č.or.
                    name: "Ulice",
                    customClass: "js-ulice " + Gordic.Components.GFieldAssist.ignoreClass,
                    strict: false,
                    placeholder: "Ulice",
                    model: "model.Ulice=value.ulice_kod; model.Ulice=value.ulice_nazev",  //ulice_nazev // vysvětleno
                    invalidTransform: function (strValue) {
                        if ((typeof strValue === "string")) {
                            return { ulice_nazev: strValue }; // vratime data ve formatu v jakem je policko zvykle
                        }
                        return strValue; // vratime puvodni hodnotu pro pripad, ze si s ni verifikace nejak poradi
                    },
                    verify: function (strValue) {
                        return strValue;
                    },
                    change: function (ev, changeObj) {
                        that.changeIsdsPole();
                        if (!changeObj.flags.BezObalky) { that.UpdateObalkovaAdresa(); }
                        if (changeObj && changeObj.value && changeObj.value.obec_kod) {
                            // //zakomentovat to pod tím
                            //that.zkusNasetovatZUliceNaObecAPSC(changeObj.value.obec_kod);
                        }
                    },
                    serverFilters: {
                        //obec_kod: new Gordic.Forms.Dependency("Obec", "obec_kod", false),              //, bool znamená, zda lze vyplnit hodnotu aniž by bylo vyplněné master políčko
                        obec_kod: that.model.obec_kod
                    }
                })

                .addField("gstringbox", "w-2", {
                    name: "CisloPopisne",
                    placeholder: 'Č.p',
                    customClass: Gordic.Components.GFieldAssist.ignoreClass,
                    validators: [
                        new Gordic.Validators.Base({
                            message: "jres:31900669", //RC 31900669 : Pro ČR lze zadat maximálně 4 znaky.
                            validate: function (value, changeObj) {
                                // pokud stat == čr => nesmí být delší jak 4 znaky
                                var valid = true;
                                var valStat = that.findFields("Stat").gfield("getValue");
                                if (valStat && valStat.stat === 42) {
                                    if (value && value.length > 4) {
                                        valid = false;
                                    }
                                }
                                return valid;
                            },
                            group: "customValidation"
                        })
                    ],
                    change: function (ev, changeObj) {
                        that.changeIsdsPole();
                        if (!changeObj.flags.BezObalky) { that.UpdateObalkovaAdresa(); }
                        that.ZkontrolujCisloPopisneAOrientacni();
                    }
                })
                .addField("gstringbox", "w-2", {
                    name: "CisloOrientacni",
                    placeholder: 'Č.or',
                    customClass: Gordic.Components.GFieldAssist.ignoreClass,
                    validators: [
                        new Gordic.Validators.Base({
                            message: "jres:31900670", //RC 31900670 : Pro ČR by číslo mělo být maximálně 4 znaky.
                            validate: function (value, changeObj) {
                                // pokud stat == čr => nesmí být delší jak 4 znaky
                                var valid = true;
                                var valStat = that.findFields("Stat").gfield("getValue");
                                if (valStat && valStat.stat === 42) {
                                    if (value && value.length > 4) {
                                        valid = false;
                                    }
                                }
                                return valid;
                            },
                            group: "customValidation",
                            errorType: "warning"
                        })
                    ],
                    change: function (ev, changeObj) {
                        that.changeIsdsPole();
                        if (!changeObj.flags.BezObalky) { that.UpdateObalkovaAdresa(); }
                        that.ZkontrolujCisloPopisneAOrientacni();
                    }
                })
                .addRow("jres:26265235").addField("gselectbox", Gordic.Prefabs.Select.szrsobc(), { //RC 26265235 : Část obce
                    name: "CastObce",
                    strict: false,
                    customClass: Gordic.Components.GFieldAssist.ignoreClass,
                    model: "model.CastObce=value.cast_obce_kod;model.CastObce=value.cast_obce_nazev", // možná trochu podivný zápis ale je to zde kuli aktivaci vlastní funkce verify nastavuju i klíč
                    invalidTransform: function (strValue) {
                        if ((typeof strValue === "string" && strValue.trim() !== "")) {
                            return { cast_obce_nazev: strValue }; // vratime data ve formatu v jakem je policko zvykle
                        }
                        return strValue; // vratime puvodni hodnotu pro pripad, ze si s ni verifikace nejak poradi
                    },
                    verify: function (strValue) {
                        return strValue;
                    },

                    change: function (ev, changeObj) {
                        that.changeIsdsPole();
                        if (!changeObj.flags.BezObalky) { that.UpdateObalkovaAdresa(); }

                        if (changeObj && changeObj.value && changeObj.value.obec_kod) {
                            //that.zkusNasetovatZCastiObceNaObecAPSC(changeObj.value.obec_kod);
                        }
                    },
                    serverFilters: {
                        //obec_kod: new Gordic.Forms.Dependency("Obec", "obec_kod", false),              //, bool znamená, zda lze vyplnit hodnotu aniž by bylo vyplněné master políčko
                        obec_kod: that.model.obec_kod
                    }
                })
                .addRow("jres:31900378").addField("gselectbox", "w-5", Gordic.Prefabs.Select.ginspsc(this.DbCulture === 10 ? { props: { menuBar: { model: { stat: "235", aktivita: 100 } } } } : undefined), { //RC 31900378 : PSČ, Obec
                    name: "Psc",
                    strict: false,
                    customClass: Gordic.Components.GFieldAssist.ignoreClass,
                    //itemTemplate: "{psc} - {posta}",
                    itemTemplate: function (value) {
                        var str = "";
                        if (value && value.psc) { str = value.psc; }
                        if (value && value.posta) { str = str + " - " + value.posta; }

                        return str;
                        //return "<span class='" + (value.aktivita === 900 ? 'ui-state-disabled' : '') + "'> " + value.typ_pruk_txt + " : " + value.id_pruk + "</span>";
                    },
                    placeholder: "PSČ",
                    helperItemTemplate: "{psc} - {posta}",
                    invalidTransform: function (strValue) {
                        if ((typeof strValue === "string")) {
                            var statVal = that.findFields("Stat").gfield("getValue");
                            var stat = statVal && statVal.stat ? statVal.stat : undefined;

                            // Použijeme regulární výraz k nalezení čísel na začátku řetězce
                            const numbers = strValue.trim().match(/^\s*(\d+(\s+\d+)*)/);
                            // Odstraníme všechny mezery z výsledného čísla
                            const result = numbers ? numbers[0].replace(/\s+/g, '') : '';
                            return { psc: result, stat: stat }; // vratime data ve formatu v jakem je policko zvykle
                        }
                        return strValue; // vratime puvodni hodnotu pro pripad, ze si s ni verifikace nejak poradi
                    },
                    //verify: function (strValue) {
                    //    return strValue;
                    //},
                    //model: "model.Psc=value.psc; model.Stat=value.stat",
                    model: function (operation, dto, modelOptions) {
                        switch (operation) {
                            case "apply": if (dto.Psc) { $(this).gfield("setInitial", { psc: dto.Psc, stat: dto.Stat }, { valid: false }); } return; // naplneni gcheck z DTO
                            case "collect": var val = $(this).gfield("getValue");
                                if (val) {
                                    dto.Psc = val.psc;
                                } else dto.Psc = null;
                                return;
                            default: return "Psc";
                        }
                    },
                    modelOptions: { initialValues: true }, // nevyvolá se change při model apply
                    change: function (ev, changeObj) {
                        if (changeObj.value && changeObj.value.posta
                            && that.GEsuParamsDto.gin_esu_obecpre && (!that.typZobrazeni.Detail)) { //předplní obec z pošty pokud editační nebo nový a parametr nebo je už vyplněný
                            //TODO dodělat poslání i názvu a zkusit dohledat obec
                            that.ZkusNasetovatObec(changeObj.value.posta.replace(/\d+/g, '').trim(), changeObj.value.psc);
                        }
                        that.NastavFilterUObce(changeObj);
                        if (!changeObj.flags.BezObalky) { that.UpdateObalkovaAdresa(); }
                    },
                    serverFilters: {
                        stat: new Gordic.Forms.Dependency("Stat", "stat", true),              //, bool znamená, zda lze vyplnit hodnotu aniž by bylo vyplněné master políčko

                    }
                }) //ginspsc 
                .addField("gselectbox", "w-7", Gordic.Prefabs.Select.ginspso(), { //szrsobe
                    name: "Obec",
                    placeholder: "Obec",
                    customClass: Gordic.Components.GFieldAssist.ignoreClass,
                    strict: false,
                    //model: "model.obec_kod=value.obec_kod; model.Obec=value.obec",  // column: obec_nazev 
                    helperItemTemplate: "<b>{obec}</b> | {okres_txt} | {psc}",
                    helperColumns: ["obec", "psc"], // ["obec", "cast_obce", "okres_txt"]
                    model: function (operation, dto, modelOptions) {
                        switch (operation) {
                            case "apply": if (dto.Obec) { $(this).gfield("setInitial", { obec: dto.Obec, obec_kod: dto.obec_kod }); } return; // naplneni gcheck z DTO
                            case "collect": var val = $(this).gfield("getValue");
                                if (val) {
                                    dto.Obec = val.obec;
                                } else dto.Obec = null;
                                return; // naplneni DTO hodnotou z gcheck
                            default: return "Obec";
                        }
                    },
                    invalidTransform: function (strValue) {
                        if ((typeof strValue === "string")) {
                            return { obec: strValue }; // vratime data ve formatu v jakem je policko zvykle
                        }
                        return strValue; // vratime puvodni hodnotu pro pripad, ze si s ni verifikace nejak poradi
                    },
                    verify: function (strValue) {
                        return strValue;
                    },
                    change: function (ev, changeObj) {
                        that.changeIsdsPole();
                        if (changeObj && changeObj.value && changeObj.value.psc) {
                            that.ZkusNasetovatPsc(changeObj.value.psc.trim());
                        }
                        if (changeObj && changeObj.value && changeObj.value.obec_kod) { // nastavím filtry u políčka ulice a části obce
                            that.SetniServerFiltersUAdresy(changeObj.value.obec_kod);
                        } else {
                            that.SetniServerFiltersUAdresy(null);
                        }
                        if (changeObj && changeObj.value && changeObj.value.obec_kod) {
                            //that.ZkusDohledatANasetovatCastObce(changeObj.value.obec_kod, changeObj.value.cast_obce);
                        }

                        if (!changeObj.flags.BezObalky) { that.UpdateObalkovaAdresa(); }
                    },
                    serverFilters: {
                        psc: that.model.Psc             //, bool znamená, zda lze vyplnit hodnotu aniž by bylo vyplněné master políčko
                    }

                })

                .addRow("jres:31900379").addField("gstringbox", { //RC 31900379 : P.O. Box
                    name: "PoBox",
                    customClass: Gordic.Components.GFieldAssist.ignoreClass,
                    change: function (ev, changeObj) { if (!changeObj.flags.BezObalky) { that.UpdateObalkovaAdresa(); } }
                })
                .addRow("jres:26265294").addField("gselectbox", { //RC 26265294 : Stát
                    name: "Stat",
                    customClass: Gordic.Components.GFieldAssist.ignoreClass,
                    model: "model.Stat=value.stat",
                    change: function (ev, changeObj) {
                        if (changeObj.value && changeObj.value.stat) {
                            var stat = changeObj.value.stat;
                            that.upravRequiredNaFieldu("Psc", (stat === 42 && that.GEsuParamsDto.gin_esu_povvpsc && (that.typZobrazeni.Novy || that.typZobrazeni.NovaPobocka || that.typZobrazeni.Editace) ? true : false)); // //GIN ESU - Povinnost vyplnění PSČ pro adresy v ČR      gin_esu_povvpsc
                        }
                        if (!changeObj.flags.BezObalky) { that.UpdateObalkovaAdresa(); }
                        if (!changeObj.flags.NastaveniInit) {
                            that.zkontrolujICO();
                            that.zkontrolujBICUBanky();
                        }
                        that.upravRequireIco();
                        that.NastavPriznakNeovereniAres();
                    },
                }, Gordic.Prefabs.Select.gincsta())    //keys:['stat']

                .addSection({ label: "jres:26265208", layoutDescriptor: "L-2-10-0" }) //RC 26265208 : Obálková adresa
                //.addRow()
                //    .addField("gcheck", "w-6", {
                //        name: "CheckBoxOpravit",
                //        initialValue: !this.ReadOnlyMode,
                //        label: "Vypnout automatickou opravu",
                //        change: function (ev, changeObj) {
                //            if (changeObj.value) {
                //                that.findFields("m_oObalka").gfield("option", "disabled", false)
                //            } else {
                //                that.findFields("m_oObalka").gfield("option", "disabled", true)
                //            }
                //        }
                //    })

                .addRow("jres:31900380") //RC 31900380 : Automatická oprava
                .addField("gselectbox", "w-4", {
                    name: "CheckBoxOpravit",
                    list: true,
                    customClass: Gordic.Components.GFieldAssist.ignoreClass,
                    initialValue: !this.ReadOnlyMode ? { stav: true } : { stav: false },
                    label: "jres:31900406", //RC 31900406 : Vypnout automatickou opravu
                    data: new Gordic.Data.View([
                        { label: "jres:31900407", stav: false } //RC 31900407 : Zapnuto
                        , { label: "jres:31900408", stav: true } //RC 31900408 : Vypnuto
                    ], { key: "stav" }),
                    itemTemplate: "{label}",
                    itemWidth: "",
                    model: function (operation, dto, modelOptions) {
                        switch (operation) {
                            case "apply":
                                if (dto.CheckBoxOpravit) {
                                    $(this).gfield("setValue", { stav: true });
                                } else {
                                    $(this).gfield("setValue", { stav: false });
                                }
                                return;
                            case "collect": dto.CheckBoxOpravit = $(this).gfield("getValue").stav;
                                return;
                            default: return "CheckBoxOpravit";
                        }
                    },
                    change: function (ev, changeObj) {
                        if (changeObj.value.stav) {
                            that.findFields("m_oObalka").gfield("option", "disabled", false)
                        } else {
                            that.findFields("m_oObalka").gfield("option", "disabled", true)
                        }
                    }
                })



                .addField("gcheck", "w-8", {
                    name: "NeaktObaInt", initialValue: true, label: "jres:31900381", //RC 31900381 : Aktualizovat obálkovou adresu modulem INT
                    model: function (operation, dto, modelOptions) {
                        switch (operation) {
                            case "apply":
                                if (dto.NeaktObaInt != null) {
                                    $(this).gfield("setValue", dto.NeaktObaInt === 0);
                                }
                                return; // naplneni gcheck z DTO
                            case "collect": dto.NeaktObaInt = $(this).gfield("getValue") === true ? 0 : 1; return; // naplneni DTO hodnotou z gcheck
                            default: return "NeaktObaInt";
                        }
                    }
                })

                .addRow("jres:26265208").addField("gstringbox", { //RC 26265208 : Obálková adresa
                    customClass: "js-obalkovaAdresa",
                    name: "m_oObalka",
                    rows: "8",
                    wrap: false,
                    disabled: true,
                    buttons: [
                        { icon: 'gi-refresh', requireEdit: false, tooltip: "Občerstvit", action: new GAction({ name: 'actObcerstvitObalkovouAdresu', run: function (ev, ctx) { that.UpdateObalkovaAdresa(true); } }) }, // obejde zaškrtávátko a provede se vždy
                    ],
                    change: function (ev, changeObj) {
                        if (!(changeObj && changeObj.flags && changeObj.flags.RucniNastaveniZKodu)) {
                            that.UpdateObalkovaAdresa(null, true);
                        }
                    },
                    model: function (operation, dto, modelOptions) {
                        var val = null;
                        switch (operation) {
                            case "apply":  // naplneni řádků z dto
                                if (dto.St0 || dto.St1 || dto.St2 || dto.St3 || dto.St4 || dto.St5 || dto.St6 || dto.St7) {
                                    val = "";
                                    for (var i = 0; i < 8; i++) {
                                        //var aktualVal = eval("dto.St" + i);
                                        var aktualVal = dto[("St" + i)];
                                        if (aktualVal) {
                                            val = val + aktualVal + (i !== 7 ? "\n" : "")
                                        } else {
                                            val = val + (i !== 7 ? "\n" : "")
                                        }
                                    }
                                    $(this).gfield("setValue", val, modelOptions.setFlags);
                                }
                                return;
                            case "collect":
                                var radky = [];
                                val = $(this).gfield("getValue");
                                if (val) {
                                    radky = val.split("\n");
                                }
                                dto.St0 = radky[0] || "";
                                dto.St1 = radky[1] || "";
                                dto.St2 = radky[2] || "";
                                dto.St3 = radky[3] || "";
                                dto.St4 = radky[4] || "";
                                dto.St5 = radky[5] || "";
                                dto.St6 = radky[6] || "";
                                dto.St7 = radky[7] || "";

                                dto.St0 = dto.St0.substr(0, 50);
                                dto.St1 = dto.St1.substr(0, 50);
                                dto.St2 = dto.St2.substr(0, 50);
                                dto.St3 = dto.St3.substr(0, 50);
                                dto.St4 = dto.St4.substr(0, 50);
                                dto.St5 = dto.St5.substr(0, 50);
                                dto.St6 = dto.St6.substr(0, 50);
                                dto.St7 = dto.St7.substr(0, 50);

                                return;
                        }
                        return;
                    },
                })
                ;

            $("<div>").appendTo(this.element)

                .gtab({
                    title: "Externí subjekt",
                    opened: true,
                })

                .gform("createFrom", hlavniForm);


            // buton u obalkovky
            $.content(that).find(".js-obalkovaAdresa").gfield("addButton", {
                requireEdit: false,
                action: new GAction({
                    name: "actDetailObalky", icon: "gi-detail",
                    run: function (ev, ctx) {
                        var dto = {};
                        $(ctx.field).gfield("model", "collect", dto);
                        var DetailObalkoveAdresy = new Gordic.Forms
                            .Form("L2M2S1, L-3-9-0, M-3-9-0, S-3-9-0, breaks-500-1000")
                            .addSection()
                            .addRow("jres:31900384" + " 1").addField("gstringbox", { name: "St0", disabled: (that.typZobrazeni.Detail ? true : false), validators: [new Gordic.Validators.Length({ max: 50, message: "jres:31900390" })] }) //RC 31900382 : Řádek 1
                            .addRow("jres:31900384" + " 2").addField("gstringbox", { name: "St1", disabled: (that.typZobrazeni.Detail ? true : false), validators: [new Gordic.Validators.Length({ max: 50, message: "jres:31900390" })] }) //RC 31900383 : Řádek 2
                            .addRow("jres:31900384" + " 3").addField("gstringbox", { name: "St2", disabled: (that.typZobrazeni.Detail ? true : false), validators: [new Gordic.Validators.Length({ max: 50, message: "jres:31900390" })] }) //RC 31900384 : Řádek
                            .addRow("jres:31900384" + " 4").addField("gstringbox", { name: "St3", disabled: (that.typZobrazeni.Detail ? true : false), validators: [new Gordic.Validators.Length({ max: 50, message: "jres:31900390" })] })
                            .addRow("jres:31900384" + " 5").addField("gstringbox", { name: "St4", disabled: (that.typZobrazeni.Detail ? true : false), validators: [new Gordic.Validators.Length({ max: 50, message: "jres:31900390" })] })
                            .addRow("jres:31900384" + " 6").addField("gstringbox", { name: "St5", disabled: (that.typZobrazeni.Detail ? true : false), validators: [new Gordic.Validators.Length({ max: 50, message: "jres:31900390" })] })
                            .addRow("jres:31900384" + " 7").addField("gstringbox", { name: "St6", disabled: (that.typZobrazeni.Detail ? true : false), validators: [new Gordic.Validators.Length({ max: 50, message: "jres:31900390" })] })
                            .addRow("jres:31900384" + " 8").addField("gstringbox", { name: "St7", disabled: (that.typZobrazeni.Detail ? true : false), validators: [new Gordic.Validators.Length({ max: 50, message: "jres:31900390" })] });
                        return that.dialogs.simpleForm("Detail obálkové adresy", DetailObalkoveAdresy, dto, { width: 400, height: 400 }).on("close", function (ev, retVal) {
                            for (var val in retVal) {  // retval navracuje prázdné hodnoty jako Null -> nahradím prázdným stringem
                                if (retVal[val] === null) { retVal[val] = ""; }
                            };
                            if (retVal && !that.typZobrazeni.Detail) {
                                $(ctx.field).gfield("model", "apply", retVal, { setFlags: { RucniNastaveniZKodu: false } }); // nechám přepočítat obalku
                            }  // aplikuju zmenu do textArea
                        });
                    }
                })
            })
                .find("textarea").bind('change keyup', function (event) {
                    var rows = 8;//$(this).attr('rows');
                    var value = '';
                    var splitval = $(this).val().split("\n");
                    for (var a = 0; a < rows && typeof splitval[a] != 'undefined'; a++) {
                        if (a > 0) value += "\n";
                        value += splitval[a];
                    }
                    $(this).val(value);
                });

            var FormKontakty = new Gordic.Forms
                .Form({ name: "KontaktyForm", layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0, breaks-500-1000" })
                .addSection()
                .addRow("jres:32100022").addField("gstringbox", { name: "Telefon" }) //RC 32100022 : Telefon
                .addRow("jres:26265167").addField("gstringbox", { name: "Fax" }); //RC 26265167 : Fax

            //dsebesta zobrazení emailu na parametr


            if (this.gin_esu_emzobr === 1) {
                FormKontakty
                    .addRow("jres:31900385")
                    .addField("gstringbox", {
                        name: "EMail",
                        buttons: this.predplneniMailuZPodani()
                    }); //RC 31900385 : E-mail
            } else {
                FormKontakty
                    .addRow("jres:31900385") //RC 31900385 : E-mail
                    .addText("jres:31900324") //RC 31900324 : Neveřejné
                    .addField("gstringbox", {
                        name: "EMail",
                        customClass: "autohide"
                    });
            }
            FormKontakty.addRow("jres:31900386").addField("gstringbox", { name: "Url" }) //RC 31900386 : Web
                .addRow("jres:31900387") //RC 31900387 : GPS
                .addField("gstringbox", "w-L-3", { name: "GpsSirka" })
                .addField("gstringbox", "w-L-3", { name: "GpsDelka" })
                .addSection()
                ;
            $("<div>").appendTo(this.element).gtab({ title: "jres:31900392", opened: false }).gform("createFrom", FormKontakty); //RC 31900392 : Kontakty

            //#endregion

            //this.findFields()
            //    .gfield("model", "apply", this.model, { setFlags: { BezObalky: true } })
            //.gfield("model", "apply", this.model, { initialValues: true })
            //this.findFields().gfield("model", "validators", this.validators)
            //.gfield("confirmValue");

            that.gridAdresy = $("<div>").appendTo(this.element);
            that.zastupyKarticky = $("<div>").appendTo(this.element);


            var FormUdajeEU = new Gordic.Forms
                .Form({ name: "UdajeEU", layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0, breaks-500-1000" }) //KontaktyForm

                .addRow("jres:31901244") //RC 31901244 : EUID - identifikační kód uvedený v čl. 3 odst. 1 směrnice Evropského parlamentu a Rady 2009/101/ES
                .addField("gstringbox", { name: "EuId" })
                .addRow("jres:31901245") //RC 31901245 : LEI - identifikační kód právnické osoby uvedený v prováděcím nařízení Komise (EU) č. 1247/2012 
                .addField("gstringbox", { name: "Lei" })
                .addRow("jres:31901246") //RC 31901246 : EORI - registrační a identifikační číslo hospodářských subjektů (EORI) uvedené v prováděcím nařízení Komise (EU) č. 1352/2013
                .addField("gstringbox", { name: "Eori" })
                .addRow("jres:31901247") //RC 31901247 : SEED-ID číslo pro účely spotřebních daní stanovené v čl. 2 bodu 12 nařízení Rady (ES) č. 389/2012
                .addField("gstringbox", { name: "SeedId" })
                .addRow("jres:31901249") //RC 31901249 : Jedinečný identifikátor vytvořený odesílajícím členským státem pro účely přeshraniční identifikace (ID EU / BSI)
                .addField("gstringbox", { name: "IdEu" })
                .addRow("jres:31901248") //RC 31901248 : Rodné jméno
                .addField("gstringbox", { name: "RodneJmeno" })
                ;
            $("<div>").appendTo(this.element).gtab({ title: "jres:31901210", opened: false, visible: this.UdajeEuVisible }).gform("createFrom", FormUdajeEU); //RC 31901210 : Údaje EU


            that.setovaniModelu();


            //#region Grid Adresy

            var ColumsGridAdresy = new Gordic.Data.GridFormat()
                .addHtmlColumn({
                    name: "cnt_zo",
                    caption: "jres:31900190", //RC 31900190 : Zástupné osoboy
                    customClass: "center",
                    width: 40,
                    //fixedWidth: true,
                    cellTemplate: Gordic.Esu.Function.cellTemplateZastupneOsoby(that)
                });

            if (that.GEsuParamsDto.gin_ssl_datschr || (this.gin_odes_esj_po === 1)) {
                ColumsGridAdresy
                    .addIconColumn(Gordic.Esu.Function.ColumnDatovaSchrankaZIco_ds());
            }

            ColumsGridAdresy
                .addIconColumn(Gordic.Esu.Function.ColumnTypAdresy())
                .addTextColumn({
                    name: "typ_adr_txt",
                    caption: "jres:26265354", //RC 26265354 : Typ adresy
                    width: 180,
                    //maxwidth: 160,
                    fixedWidth: true,
                    cellTemplate: "{typ_adr_txt}"
                })
                .addTextColumn({
                    name: "esu_txt",
                    caption: "jres:26265098", //RC 26265098 : Externí subjekt
                    minWidth: 300,
                    //fixedWidth: true,
                })
                .addNumberColumn({
                    name: "ur_pri",
                    caption: "jres:26265382", //RC 26265382 : Úroveň přístupu
                    width: 120,
                    fixedWidth: true,
                })
                .addTextColumn({
                    name: "ixs_esu",
                    caption: "jres:31900359", //RC 31900359 : Identifikátor
                    width: 120,
                    fixedWidth: true,
                    customClass: "ui-disabled",
                    //  cellTemplate: "{ixs_esu:number:D6}",
                    //  headerMenu: al.createBar(["act4"])
                    // sortOrder: Gordic.Data.Sorting.Inline.number("hodnota", false),
                })
                .addTextColumn({
                    name: "id_ds",
                    caption: "jres:31900366", //RC 31900366 : ID DS
                    width: 80,
                    fixedWidth: true,
                })
                .addTextColumn({
                    name: "ixs_eko",
                    caption: "jres:31900451", //RC 31900451 : ID ekonomického subjektu
                    width: 120,
                    fixedWidth: true,
                })
                .addTextColumn({
                    name: "zmenu_prov_rf",
                    caption: "jres:26265161", //RC 26265161 : Změnu provedl
                    width: 200,
                    fixedWidth: true,
                });



            that.actions.add({
                name: "actOtevriDetailAdresy",
                run: function (ev, ctx) {
                    //console.log(ctx.cellInfo.data);
                    that.detailkAdresaPobocka();
                }
            });

            that.gridAdresy.gtab({ //.height(600)
                title: "jres:31900452", opened: false,    //RC 31900452 : Další adresy
                menuBar: [
                    {
                        action: this.actions.actNovaAdresaPobocka, favorite: true
                    },
                    {
                        action: this.actions.actEditovatAdresaPobocka, favorite: true
                    },
                    {
                        action: this.actions.actSpravovatAdresaPobocka, favorite: true
                    },

                ]
            }).

                ggrid({
                    name: "GridAdresy",
                    data: that.TabulkaAdres,

                    renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                    columnMode: "fit",  // fit, full
                    rowsClass: function (row, trueColumns, rowIndex) {
                        if (row.data.ixs_esu === row.data.ixs_eko) {
                            return "bold";
                        }
                    },
                    navigationMode: "row", // row, cell
                    defaultAction: that.actions.actOtevriDetailAdresy,
                    // multi: true,

                    scrollHelperTemplate: "{typ_adr_txt}-{esu_txt}",  // "{ixs_esu} - {nazev}",
                    /*
                    searchColumns: ["esu_txt"],
                    */
                    columns: ColumsGridAdresy
                });
            //#endregion




            //#region Kartičky Zastupnych Osob

            // tlačítka do selecboxu se zastupy
            var buttonkyDoSelectboxu =
                [{
                    actionContext: { jenAktivni: true },
                    requireEdit: false,
                    action: new GAction({
                        name: "actZobrazitSkrytNeaktivniZastupy",
                        tooltip: "jres:31900453", //RC 31900453 : Zobrazit neaktvní
                        icon: "fa-eye", //gi-visible-non,
                        run: function (ev, actionContext) {
                            var fieldzas = that.findFields("zastupySel");
                            var boolicek = fieldzas.gfield("option", "jenAktivni");
                            this.update({ icon: boolicek ? "fa-eye-slash" : "fa-eye", tooltip: boolicek ? "jres:31900455" : "jres:31900453" }); //RC 31900453 : Zobrazit neaktivní
                            fieldzas.gfield("option", "jenAktivni", !boolicek);
                            that.VyfiltrujANastavZastupneOsoby();
                        }
                    })
                }];
            if (!that.ReadOnlyModeZo) { // na podmínku přidám ppřidávací trlačitko zástupu
                buttonkyDoSelectboxu.push({
                    icon: 'gi-plus', tooltip: "jres:31900454", //RC 31900454 : Přidání zástupu
                    action: new GAction({ name: 'actPridejKartickuZastupu', run: function (ev, ctx) { that.vytvorNovouZastupnouosobuKarticky(); } })
                })
                    ;
            }

            var KartickyForm = new Gordic.Forms
                .Form({ name: "KartickyForm", layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0, breaks-700-1200" })
                .addSection()
                .addRow("").addField("gselectbox", { // Průkazy totožnosti 
                    name: "zastupySel",
                    customClass: Gordic.Components.GFieldAssist.ignoreClass,
                    itemTemplate: function (value) {
                        var string = "<div class='gi gi-group minifoto'></div><b>" + (value.zast_txt ? value.zast_txt : " ") + "</b>" + //value.st2
                            (value.mail ? "<br>jres:31900456: <i>" + (value.mail) + "</i>" : "<br>&nbsp;") + //RC 31900456 : mail
                            (value.tel ? "<br>jres:31900457: <i>" + (value.tel) + "</i>" : "<br>&nbsp;") + //RC 31900457 : tel
                            (value.fax ? "<br>jres:31900458: <i>" + (value.fax) + "</i>" : "<br>&nbsp;"); //RC 31900458 : fax

                        return string;
                        //return "<span class='" + (value.aktivita === 900 ? 'ui-state-disabled' : '') + "'> " + value.typ_pruk_txt + " : " + value.id_pruk + "</span>";
                    },
                    dialogOptions: {
                        width: 1000,
                        height: 900
                    },
                    itemWidth: "w-L-4 w-M-6 w-S-12",
                    //model: "model.TabulkaZastupu=value;",
                    multi: true,

                    graphicInput: "hidden",
                    //newItemData: { aktivita: 100 },
                    //itemEditable: function (value) {
                    //    return value.aktivita === 100;
                    //},
                    itemDeletable: false,
                    showSelectButton: false,
                    jenAktivni: true,
                    itemClass: function (value) {
                        if (value && value.aktivita !== 100) {
                            return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
                        }
                    },
                    verticalButtons: true,
                    buttons: buttonkyDoSelectboxu,
                    itemCreated: function (ev, div, value, index, btnAdd) {
                        //var button = $(!that.ReadOnlyModeZo ? "<span class='gi gi-pencil'>" : "<span class='gi gi-detail clickable'>");

                        //$(div).click(function (ev) {
                        //        that.editujZastupnouosobuKarticky(value);
                        //    });
                        //btnAdd(button);



                        var buttonZastupny = new GAction({
                            name: "actEditZo",
                            icon: "gi-pencil",
                            tooltip: "jres:31900668", //RC 31900668 : Editovat zástupnou osobu.
                            run: function (event) {
                                that.editujZastupnouosobuKarticky(value);
                            }
                        });
                        btnAdd(buttonZastupny);
                    }
                    // při odstranění nastavit aktivitu na 900
                })
                ;


            that.zastupyKarticky.gtab({
                title: "jres:26265207", opened: that.EditaceNeboZalozeniZastupneOsobyDto ? true : false, //RC 26265207 : Zástupné osoby

                customLoad: function () {
                    if (that.model && that.model.IxsEsu) {
                        that.nactiNoveDataZastupnychOsobKarticky();

                        return false;                   //ponecha preloader na zalozce, po nacteni dat je nutne zavolat $().gtab("loadComplete")
                    }
                }
            })
                .gform("createFrom", KartickyForm);
            //#endregion

            this.beginOperation();
            this.findForms("HlavniForm").gform("waitForValues")
                .done(function () {
                    that.endOperation();
                    that.findFields("TypEsu").gfield("focus");
                    that.doplnKovaAkcePoSpusteni();
                });



            //console.log("Kobec Scriptu");
        },


        //#region Oblsuha policek
        setovaniModelu: function (data, delegatFormularjepripraven) {
            var that = this;
            this.log.trace("setovaniModelu");
            //uprava zaškrtávátka

            //this.model.CheckBoxOpravit = !this.ReadOnlyMode;

            var initFildy = this.findFields(
                "Nazev, ObchodniJmeno, TitulPred, Jmeno, Prijmeni, MiJmeno, MiPrijmeni, TitulZa, RodPrijmeni, MistoNar, Pohlavi, RodStav, Zkratka, Poznamka, DatUmrti, PrizUmrti, IxsEsu, Wfldkou, " +
                "BicTypBan, Bic, ISZRtxt, StupenVerifikace, Ico, Dic, StatSp, RodneCislo, DatNar, IdDs, SkEdeskId, IdGex,IdExt, PartnerUct, Bio, UrPri, Prukazy, Oc, Prezdivka, " +
                "TypAdr, Ulice, CisloPopisne, CisloOrientacni, Psc, Obec, CastObce, PoBox, CheckBoxOpravit, NeaktObaInt, m_oObalka, " +
                "Telefon, Fax, EMail, Url, GpsSirka, GpsDelka, doklady, EuId, Lei, Eori, SeedId, RodneJmeno, IdEu"
            );

            var fildyVyvolavaciChange = this.findFields(
                "TypEsu, TypOrganizace, PrizDph, Insolvence, Stat"
            );

            if (data && data.TypOrganizace != null && data.TypEsu == null) {
                this.findFields("TypEsu").gfield("celar");
                this.findFields("TypOrganizace").gfield("celar");
            }
            if (data == null) { // mělo by jít o uvodní nastavení po načtení detailu
                this.IdDsOverene = this.model.IdDs;
            } else if (data != null && data.IdDs != null) {
                this.IdDsOverene = data.IdDs;
            }

            // nejdříve nasetuju ty hodnoty co se setujou jako inicializační
            initFildy.gfield("model", "apply", data ? data : this.model, { initialValues: true, setFlags: { RucniNastaveniZKodu: true } });
            
            
            //validatory
            var nalezeneFieldy = this.findFields();

            //#region Zmena na stare Validatory pri stareDB
            if (this.stareValidatoryProJmenoAPrijmeni) {
                if (this.validators && this.validators.Jmeno && this.validators.Jmeno[0] && this.validators.Jmeno[0].max > 1) {
                    this.validators.Jmeno[0].max = 24;
                }
                if (this.validators && this.validators.Prijmeni && this.validators.Prijmeni[0] && this.validators.Prijmeni[0].max > 1) {
                    this.validators.Prijmeni[0].max = 36;
                }
            }

            //#endregion


            nalezeneFieldy.gfield("model", "validators", this.validators); // DSebesta - zapnuto 28.8.2018 - nevím proč bylo vyplé (čas ukáže)
            Utils.Form.markRequired(nalezeneFieldy);

            // až se doloudujou nasetuju ty co potřebují vyvolat change
            var promisesinitFildu = initFildy.map(function () { return $(this).gfield("getValueAsync"); });
            $.when.apply(null, promisesinitFildu).done(function () {
                fildyVyvolavaciChange.gfield("model", "apply", data ? data : that.model, { setFlags: { BezObalky: true, NastaveniInit: true, RucniNastaveniZKodu: true } });
                // vyvolání čekání na celí form
                var promises = fildyVyvolavaciChange.map(function () { return $(this).gfield("getValueAsync"); });
                $.when.apply(null, promises).done(function () {
                    if (delegatFormularjepripraven) {
                        delegatFormularjepripraven.call(that);
                    } else {
                        that.formularJePripraven();
                    }
                });
            });


            this.rychleZakladniNastaveni();
        },

        rychleZakladniNastaveni: function () {
            this.log.trace("rychleZakladniNastaveni");
            //this.ModJmennyRejstrik = 1;
            if (this.ModJmennyRejstrik != null && this.ModJmennyRejstrik === 1) {
                $(".js-agendovaSekce").hide();
            }
        },

        formularJePripraven: function () {
            var that = this;
            this.log.trace("formularJePripraven");
            // nastavení hodnot jako inint na formu 
            that.findFields().gfield("confirm");

            // inicializace podle parametru
            that.zakladniNastaveniPodleParametru();

            // zkusim dohledat nazev obce a dosetovat server filters v pdostate když generuju nazev Obce z PSC // inicalizacni najiti přesunute do C#
            //if (that.GEsuParamsDto.gin_esu_obecpre && (!that.typZobrazeni.Detail)) { //předplní obec z pošty pokud editační nebo nový a parametr nebo je už vyplněný
            //    var postaVal = that.findFields("Psc").gfield("getValue");
            //    if (postaVal && postaVal.psc) {
            //        that.dohledejKodObce(postaVal.posta.replace(/\d+/g, '').trim(), postaVal.psc);
            //    }
            //}

            // provedu ruzne kontroly
            that.nastaveniPodleUceluOtevreni();
            that.endOperation();

            that.zkontrolujICO();
            that.pokusOUpdateIszrIcon();


            // that.UpdateObalkovaAdresa();
            that.zkontrolujBICUBanky();
            that.OverRodneCislo();
            that.OverOsobniCislo();
            that.UpdateObalkovaAdresa(null, true); // počáteční kontrola zda sedí adresa ESU s obálkovou adresou
            this.zkontrolujZdaJdeONejnovejsiESU();
        },

        inicializace: function () {
            var that = this;
            this.log.trace("inicializace");
            //this.TypZobrazeniC = 0   //VYMAZAT vyvoj
            this.typZobrazeni = {
                /// <field type='Boolean'>Požadavek na založení nového externího subjektu</field>
                Novy: (0 === this.TypZobrazeniC ? true : false),
                /// <field type='Boolean'>Požadavek na zobrazení externího subjektu</field>
                Detail: (1 === this.TypZobrazeniC ? true : false),
                /// <field type='Boolean'>Požadavek na editaci externího subjektu</field>
                Editace: (2 === this.TypZobrazeniC ? true : false),
                /// <field type='Boolean'>Požadavek na založení nové pobočky externího subjektu</field>
                NovaPobocka: (3 === this.TypZobrazeniC ? true : false),
                /// <field type='Boolean'>Požadavek na založení nového externího subjektu s kopií dat z původního</field>
                NovaKopie: (4 === this.TypZobrazeniC ? true : false),
            };

            if ($.content(that).upozorneni) { // pokud přišlo upozornění z C# zobrazí jej
                that.dialogs.alert($.content(that).upozorneni);
            }




            //that.ZobrazSkryjNeaktivni(false); // přesunuto n a load na tab až po otevření tabu

        },

        //kulitomu že chci v js měnit zachodu číslo v badge tak musím mít badge nadefinovanej až v JS 
        vybudovaniMenu: function () {
            this.log.trace("vybudovaniMenu");

            var menuPole =
                [
                    //['Externí subjekt', 'actNovyEx', 'actEditovat'],
                    'actNovyEx',
                    'actEditovat',
                    (!this.typZobrazeni.Detail) ? 'actSave' : undefined,
                    ['jres:31901150', 'actOveritSZR', 'actOveritAISEO', 'actOveritISDS', 'actOveritGex', 'actOveritARES', 'actOveritVERA', 'actOveritCRS', 'actOveritRUIAN', 'actInsolvence', 'actOveritUPSR'], //RC 31901150 : Ověřit
                    ['jres:31901151', 'actNovaAdresaPobocka', 'actSpravovatAdresaPobocka'], //,'actVyjmoutAdresaPobocka' //RC 31901151 : Adresy/Pobočky
                    'actKopie'
                ];
           

            if (this.pocetUctu != null && this.pocetUctu > 0) {

                this.uctyBadgeOpts = new GObservableObject({
                    value: this.pocetUctu,
                    id: "BankovniBadge",
                    customClass: " g-state-info js-badgeBankovniUcty",
                    tooltip: "jres:31900221 " //RC 31900221 : Subjekt má
                        + this.pocetUctu.toString() +
                        " jres:31900459 " + //RC 31900459 : aktivní bankovní
                        (this.pocetUctu > 1 ? "jres:31900460" //RC 31900460 : účty
                            : "jres:31900461") //RC 31900461 : účet
                });

                menuPole.push(
                    {
                        action: this.actions.actBankovniUcty,
                        favorite: true,
                        badge: this.uctyBadgeOpts
                    }
                );
            } else {
                menuPole.push({ action: this.actions.actBankovniUcty, favorite: true });
            }
            // pridani historie
            menuPole.push(
                {
                    action: this.actions.actHistorie,
                    favorite: true,
                }
            );
            if (this.actions.actSzrSeznamDokladu) {
                menuPole.push(
                    {
                        action: this.actions.actSzrSeznamDokladu,
                        favorite: true,
                    }
                );
            }

            var menuVazby = ['jres:31901152']; //RC 31901152 : Vazby
            if (this.povZobrDotcDokumenty) {
                menuVazby.push("actDotceneDokumenty");
            }
            if (this.povVytvDokument) {
                menuVazby.push("actDokumentVlastni");
                menuVazby.push("actDokumentCizi");
            }

            if (this.zobrazitMenuVazby) {
                menuPole.push(menuVazby);
            }

            menuPole.push('actOtevriInfoNespPlatceDph');

            this.menuBar(this.actions.createBar(menuPole, true));
        },

        showHideFields: function (typ) {
            /// <summary>
            ///  Show/Hide některých řádků
            /// </summary>
            /// <param name="typ" type="type"></param>
            var that = this;
            this.log.trace("showHideFields");
            //console.log("f: ", typ);
            switch (typ) {
                case 0:  // nepřiřazeno
                    that.upravFormPodlenNeprirazeno();
                    break;
                case 10:  // pravnicka
                    that.upravFormPodlePravnicke();
                    break;
                case 20:  // fyzicka
                    that.upravFormPodleFyzicke();
                    break;
                case 30:  // osvc
                    that.upravFormPodleOsvc();
                    break;
                default:
            }

        },
        upravFormPodlenNeprirazeno: function () { //0
            var that = this;
            this.log.trace("upravFormPodlenNeprirazeno");
            that.findFields("RodPrijmeni").gformrow().gformrow("setLabel", "jres:31900087"); //RC 31900087 : Rodné příjmení
            $.content(that).find(".js-TSub-fyzicka").gformrow().show();
            $.content(that).find(".js-TSub-pravnicka").gformrow().show();
            $.content(that).find(".js-priznakUmrti").gfield("option", "label", "jres:31900405")
                .gformrow("setLabel", "jres:31900358"); //RC 31900358 : Datum úmrtí
            that.findFields("Prezdivka").gformrow("setLabel", "jres:26265368"); //RC 26265368 : Provozovna
            this.UpdateTypAdresyLabel(0);

           

            that.upravFormSpolecne();
        },
        upravFormPodlePravnicke: function () { //10 pravnicka
            var that = this;
            this.log.trace("upravFormPodlePravnicke");
            that.findFields("RodPrijmeni").gformrow().gformrow("setLabel", "jres:31900088");  //Editorská agenda OVM //RC 31900088 : Editorská agenda OVM
            $.content(that).find(".js-TSub-fyzicka").gformrow().hide();
            $.content(that).find(".js-TSub-pravnicka").gformrow().show();
            $.content(that).find(".js-priznakUmrti")
                .gfield("option", "label", "jres:31900409") //RC 31900409 : Příznak Ukončení
                .gformrow("setLabel", "jres:31900317"); //RC 31900317 : Datum ukončení
            that.findFields("Prezdivka").gformrow("setLabel", "jres:26265368"); //RC 26265368 : Provozovna
            this.UpdateTypAdresyLabel(10);
            that.upravFormSpolecne();
            that.findFields("RodneJmeno").gformrow().hide();

            this.updateActionsAres(10);

        },
        upravFormPodleFyzicke: function () { //20 fyzicka
            var that = this;
            this.log.trace("upravFormPodleFyzicke");
            that.findFields("RodPrijmeni").gformrow().gformrow("setLabel", "jres:31900087"); //RC 31900087 : Rodné příjmení
            $.content(that).find(".js-TSub-fyzicka").gformrow().show();
            $.content(that).find(".js-TSub-pravnicka").gformrow().hide();
            $.content(that).find(".js-priznakUmrti")
                .gfield("option", "label", "jres:31900405") //RC 31900405 : Příznak umrtí
                .gformrow("setLabel", "jres:31900358"); //RC 31900358 : Datum úmrtí
            that.findFields("Prezdivka").gformrow("setLabel", "jres:26265319"); //RC 26265319 : Přezdívka
            this.UpdateTypAdresyLabel(20);
            this.updateActionsAres(20);
            this.findFields("Ico").gfield("setValue", null); //17.8.2021 doplněno podle těžkého

            that.upravFormSpolecne();
            that.nastavTextAdresaUradu(this.adresaUraduTxt);
        },
        upravFormPodleOsvc: function () { //30 osvc
            var that = this;
            this.log.trace("upravFormPodleOsvc");
            that.findFields("RodPrijmeni").gformrow().gformrow("setLabel", "jres:31900088"); //Editorská agenda OVM //RC 31900088 : Editorská agenda OVM
            $.content(that).find(".js-TSub-pravnicka").gformrow().show();
            $.content(that).find(".js-TSub-fyzicka").gformrow().show();
            $.content(that).find(".js-TSub-osvcNezobrazovat").gformrow().hide();
            $.content(that).find(".js-priznakUmrti")
                .gfield("option", "label", "jres:31900409") //RC 31900409 : Příznak Ukončení
                .gformrow("setLabel", "jres:31900317"); //RC 31900317 : Datum ukončení
            that.findFields("Prezdivka").gformrow("setLabel", "jres:26265368"); //RC 26265368 : Provozovna
            this.UpdateTypAdresyLabel(30);

            this.updateActionsAres(30);

            that.upravFormSpolecne();
        },
        upravFormSpolecne: function () {
            var that = this;
            this.log.trace("upravFormSpolecne");
            that.zakladniNastaveniPodleParametru();
            this.ukazSchovejPolePrezdivka();
            this.updateIddsIcons();
            this.updateDsStatus();
            this.skontrolujObecneWarningy();
        },
        Insolvence: function (enabled) {
            var that = this;
            this.log.trace("Insolvence");
            that.actions.actStatInsolvence.update({ enabled: enabled });
            if (enabled) {
                $.content(that).find(".js-statInsolvence").addClass("g-state-text g-state-important");
                $.content(that).findFields("Insolvence").gfield("setError", {
                    message:
                        "jres:31900462", stopping: false, group: "rucniInsolvence", errorType: "warning", showOnDisabled: true //RC 31900462 : Subjekt prošel/prochází insolvencí.
                });
            } else {
                $.content(that).find(".js-statInsolvence").removeClass("g-state-text g-state-important");
                $.content(that).findFields("Insolvence").gfield("resetErrors", "rucniInsolvence");
            }
            //"g-state-text g-state-important" 

        },
        updateActionsAres: function (typ) {

            var val = (typ === 20 ? false : true);
            if (this.typZobrazeni.Detail) {
                val = false;
            }
            this.actions.actOveritARES.enabled(val);

        },

        zakladniNastaveniPodleParametru: function () {
            var that = this;
            this.log.trace("zakladniNastaveniPodleParametru");
            var hlavniForm = that.findForms("HlavniForm");
            var typEsuValue = hlavniForm.findFields("TypEsu").gfield("getValue");
            var typ = typEsuValue ? typEsuValue.typ_esu : 0; //0 nepřiřazeno   10 pravnicka   20 fyzicka   30 osvc

            if (!this.EkoSubmodel) {
                hlavniForm.findFields("PartnerUct").gformrow().hide();
            }
            ;
            if (typ != 20 || !that.GEsuParamsDto.gin_esu_poumid) {
                hlavniForm.findFields("MiJmeno, MiPrijmeni").gformrow().hide();
            }
            ;
            if (!that.GEsuParamsDto.gin_esu_poudi) { // používat pole DIČ
                this.findFields("Dic").gformrow().hide();
            }
            if (!that.GEsuParamsDto.gin_esu_pogps) {// používat pole GPS
                this.findFields("GpsSirka").gformrow().hide();
            }
            if (!that.GEsuParamsDto.gin_esu_poupo) {// používat pole pohlaví
                this.findFields("Pohlavi").gformrow().hide();
            }
            if (!that.GEsuParamsDto.gin_esu_pours) {// používat pole rodinný stav
                this.findFields("RodStav").gformrow().hide();
            }
            if (!that.GEsuParamsDto.gin_esu_pourl) {// používat pole URL na detailu ESU
                this.findFields("Url").gformrow().hide();
            }

            this.upravRequireIco();

            that.upravRequiredNaFieldu("DatNar", ((typ === 20 || typ === 30) && that.GEsuParamsDto.gin_esu_dnpov ? true : false)); // u fyzicke osoby nutné vyplnit IČO + gin_esu_dnpov

            //if (!that.GEsuParamsDto.gin_esu_torg) hlavniForm.findFields("TypOrganizace").hide(); // na parametr ukryje typ organizace
            if (((this.gin_esu_dnzobr == 0) && !that.typZobrazeni.Novy) || this.gin_esu_dnzobr == 3) hlavniForm.findFields("DatNar").gformrow().hide(); // na parametr ukryje typ datum narozeni

            if (!that.GEsuParamsDto.gin_esu_mnzobr) hlavniForm.findFields("RodPrijmeni,MistoNar").gformrow().hide(); // na parametr ukryje rodne prijmeni a misto narozeni
            //povolení práce s typem adresy (trvalá, kontakní, doručovací, zaměstnavatele)
            //Ne 
            //Ano - volný režim - Uživatelé nejsou omezeni při výběru typu adresy. 
            //Ano - striktní režim - Uživatelům je povoleno zadat nebo změnit typ adresy, jenom když jde o smysluplnou kombinaci. Např. na pobočce/adrese nelze zadat typ adresy trvalá atd
            //if (!that.GEsuParamsDto.gin_esu_zatypad) hlavniForm.findFields("TypAdr").gfield("option", "disabled", true);  // přesunuto do nabídkové funkce v políčku
            //if (that.GEsuParamsDto.gin_esu_zatypad_volnyRezim);         // přesunuto do nabídkové funkce v políčku
            //if (that.GEsuParamsDto.gin_esu_zatypad_striktniRezim);      // přesunuto do nabídkové funkce v políčku
            if (!that.GEsuParamsDto.gin_esu_inzobr) {
                hlavniForm.findFields("Insolvence").gformrow().hide(); // zobrazení insolvence
                that.actions.actStatInsolvence.visible(true)
            }
            if (!that.GEsuParamsDto.gin_esu_rczadat) { hlavniForm.findFields("RodneCislo").gformrow().hide(); }  // rodné číslo se nebude používat
            if (!that.GEsuParamsDto.gin_esu_pouoc) { hlavniForm.findFields("Oc").gformrow().hide(); }    //  schová pole osobní čáslo
            if (!that.GEsuParamsDto.gin_ssl_datschr && (this.gin_odes_esj_po !== 1)) {
                hlavniForm.findFields("IdDs").gformrow().hide();
                this.actions.actOveritISDS.update({ visible: false });
            }    //  povolení práce s datovými schránkami
            if (!that.GEsuParamsDto.gin_gex_povolen) {
                hlavniForm.findFields("IdGex").gformrow().hide();
                this.actions.actOveritGex.update({ visible: false });
            }    //  povolení práce s ID GEX
            if (!this.model.IdExtVisible) {
                hlavniForm.findFields("IdExt").gformrow().hide();
            }
            if (that.GEsuParamsDto.gin_esu_bizobr == 0) {
                hlavniForm.findFields("Bio").gformrow().hide();
            }
            if (that.GEsuParamsDto.gin_upsr_povol == 0) {
                hlavniForm.findFields("SkEdeskId").gformrow().hide();
            }

            if (!that.GEsuParamsDto.gin_esu_zatypad) hlavniForm.findFields("TypAdr").gformrow().hide(); // zakázání práce s typem adresy
            if (that.GEsuParamsDto.gin_rad_esusa === "") hlavniForm.findFields("UrPri").gfield("option", "disabled", true); // nastavení striktního režimu
            if (!that.GEsuParamsDto.gin_esu_pcisdok) hlavniForm.findFields("doklady").gfield("option", "disabled", true); // na zakladě parametru se skrýva pole doklady

            that.upravRequiredNaFieldu("ObchodniJmeno", (typ === 10 || typ === 30 ? true : false));
            that.upravRequiredNaFieldu("Prijmeni", (typ === 20 || (typ === 30 && that.GEsuParamsDto.gin_esu_povpri === 1) ? true : false)); // dsebesta 25.03.2022  odebraán required pro osvč //
            if (!that.GEsuParamsDto.gin_iszr_povole && !that.GEsuParamsDto.gin_iszr_povopr) { hlavniForm.findFields("ISZRtxt").gformrow().hide(); }    //  poveolení text políčka s ISZR

            this.updateActionsAres(typ);


            // pridano pro UK
            if (!that.GEsuParamsDto.gin_iszr_povole) {
                this.actions.actOveritSZR.update({ visible: false });
            }
            if (!this.bIszrAiseoPovolit) {
                this.actions.actOveritAISEO.update({ visible: false });
            }
            if (this.DbCulture === 50) {
                this.actions.actOveritARES.update({ visible: false });
                this.actions.actOveritRUIAN.update({ visible: false });
                this.actions.actOveritVERA.update({ visible: false });
            }

            this.actions.actOveritVERA.update({ visible: this.VeraVisible });


            this.actions.actOveritCRS.update({ visible: (this.gin_crs_url != null && this.gin_crs_url !== "") });
            this.actions.actOveritCRS.update({
                enabled: this.gin_crs_url != null && this.gin_crs_url !== "" && typEsuValue != null && typEsuValue.typ_esu == 20 && !this.typZobrazeni.Detail

            });

            if (!this.model.Wfldkou) { hlavniForm.findFields("Wfldkou").gformrow().hide(); }


        },

        upravRequireIco: function () {
            var that = this;
            this.log.trace("upravRequireIco");
            //.Stat v== 42
            var hlavniForm = this.findForms("HlavniForm");
            var typEsuValue = hlavniForm.findFields("TypEsu").gfield("getValue");
            var typ = typEsuValue ? typEsuValue.typ_esu : 0; //0 nepřiřazeno   10 pravnicka   20 fyzicka   30 osvc
            var statVal = this.findFields("Stat").gfield("getValue");

            if (statVal != null && statVal.stat == 42) {
                that.upravRequiredNaFieldu("Ico", (typ === 10 && (that.GEsuParamsDto.gin_esu_povicop >= 1 ? true : false))); // u právnické osoby nutné vyplnit IČO + gin_esu_povicop 
            } else {
                that.upravRequiredNaFieldu("Ico", false);
            }
            var icoField = this.findFields("Ico");
            Utils.Form.markRequired(icoField);

        },

        nastaveniPodleUceluOtevreni: function () {
            var that = this;
            this.log.trace("nastaveniPodleUceluOtevreni");
            if (that.typZobrazeni.Novy) {
                that.gridAdresy.gtab("option", { opened: false, locked: true });
                that.zastupyKarticky.gtab("option", { opened: false, locked: true });

                this.enablefields();

            }
            else if (that.typZobrazeni.Detail) {
                that.findFields().gfield("option", "disabled", true);
                that.findFields("zastupySel").gfield("option", "disabled", that.ReadOnlyModeZo); //that.ReadOnlyModeZo //dsebesta 22.9.2021 přehozeno z defaulltního false na ReadOnlyModeZo

            }
            else if (that.typZobrazeni.Editace) {
                this.enablefields();
            }
            else if (that.typZobrazeni.NovaPobocka) {
                that.gridAdresy.gtab("option", { opened: false, locked: true });
                that.zastupyKarticky.gtab("option", { opened: false, locked: true });
                this.enablefields();
            }

        },

        cekejApakEnableFields: function () {
            // až se doloudujou polička zavolám enable fields
            var that = this;
            this.log.trace("cekejApakEnableFields");
            var promisReadyField = this.findFields().map(function () { return $(this).gfield("getValueAsync"); });
            $.when.apply(null, promisReadyField).done(function () {
                that.enablefields();
            });

        },

        enablefields: function () {
            var that = this;
            this.log.trace("enablefields");
            var m_bReadOnlyMode = that.ReadOnlyMode //that.typZobrazeni.Detail;
            var dis = "vyreseniCarkyNaZacatku";
            var enable = "vyreseniCarkyNaZacatku";

            if (m_bReadOnlyMode && !that.GEsuParamsDto.ssl_rp_esu_obal)
                dis = dis + ",CheckBoxOpravit";
            else
                enable = enable + ",CheckBoxOpravit";

            if (m_bReadOnlyMode)
                dis = dis + ",NeaktObaInt";
            else
                enable = enable + ",NeaktObaInt";

            if (m_bReadOnlyMode || !(that.GEsuParamsDto.gin_esu_oprazo >= 1))
                dis = dis + ",zastupySel";
            else
                enable = enable + ",zastupySel";

            dis = dis + ",IdGex";

            if (m_bReadOnlyMode) {  // m_bReadOnlyMode || !this.m_bEditacniRezimIdds
                dis = dis + ",IdDs,SkEdeskId";
            }
            else { 
               
                if (this.GEsuParamsDto.gin_upsr_povol != 1) {
                    if (this.GEsuParamsDto.gin_esu_isds_id) {
                        enable = enable + ",IdDs";
                    } else {
                        dis = dis + ",IdDs";
                    }
                } else { //SK 
                    enable = enable + ",IdDs,SkEdeskId";
                }
            }
            if (m_bReadOnlyMode || that.typZobrazeni.NovaPobocka || (this.PrizEko && !this.typZobrazeni.Novy)) // dsebesta 4.4.2023 k prizEko doplněna podmínka že nesmí být nový detail ref T26308
                dis = dis + ",TypEsu";
            else
                enable = enable + ",TypEsu";

            dis = dis + ",IxsEsu";


            if ((m_bReadOnlyMode || that.typZobrazeni.NovaPobocka)
                || ((this.gin_esu_dnzobr == 2) && (!this.typZobrazeni.Novy)))
                dis = dis + ", DatNar";
            else
                enable = enable + ", DatNar";

            if (m_bReadOnlyMode || that.typZobrazeni.NovaPobocka)
                dis = dis + ", TypOrganizace, TitulPred, Jmeno, Prijmeni, TitulZa, RodPrijmeni, MiJmeno, MiPrijmeni, Pohlavi, RodStav, MistoNar, StatSp, ObchodniJmeno, Nazev, Prezdivka, Dic, Oc, PrizDph, UrPri, PrizUmrti";
            else
                enable = enable + ", TypOrganizace, TitulPred, Jmeno, Prijmeni, TitulZa, RodPrijmeni, MiJmeno, MiPrijmeni, Pohlavi, RodStav, MistoNar, StatSp, ObchodniJmeno, Nazev, Prezdivka, Dic, Oc, PrizDph, UrPri, PrizUmrti";

            if (m_bReadOnlyMode || (that.typZobrazeni.NovaPobocka && !that.GEsuParamsDto.gin_esu_pobico)) {
                this.findFields("Ico").gfield("option", "disabled", true);
            } else {
                this.findFields("Ico").gfield("option", "disabled", false);
            }

            dis = dis + ",Bio";
            dis = dis + ",Insolvence";
            //m_oTbUrlUpadku.ReadOnly = true;
            dis = dis + ",StupenVerifikace";
            dis = dis + ",DatUmrti";
            enable = enable + ",PrizUmrti";

            //var opravit = this.findFields("CheckBoxOpravit").gfield("getValue");
            var opravit = this.findFields("CheckBoxOpravit").gfield("getValue").stav;
            if (!this.GEsuParamsDto.ssl_rp_esu_obal || !opravit)
                dis = dis + ", m_oObalka";
            else
                enable = enable + ", m_oObalka";


            this.findFields(dis).gfield("option", "disabled", true);
            this.findFields(enable).gfield("option", "disabled", false);

            dis = "vyreseniCarkyNaZacatku";
            enable = "vyreseniCarkyNaZacatku";

            // VERIFIKACE
            var stupenVerValue = this.findFields("StupenVerifikace").gfield("getValue");
            var stupenVer = (stupenVerValue && (stupenVerValue.stupen_ver != null)) ? stupenVerValue.stupen_ver : null;
            if (stupenVer != null) {

                var ovRobRos = (stupenVer === 55) || (stupenVer === -55) || (stupenVer === 65) || m_bReadOnlyMode;
                var ovRob = (stupenVer === 55) || (stupenVer === -55) || m_bReadOnlyMode;
                var ovPouzeRuian = (stupenVer === 35) || (stupenVer === 30) || m_bReadOnlyMode;
                var jePrFormaOk = false;        // zda je typ organizace jednoznačně dohledatelný dle právní formy jednoznačně dohledatelná
                var ovRosPoNeboOsvcSAifo = (stupenVer === 65) || m_bReadOnlyMode;


                var ico = this.findFields("Ico").gfield("getValue");
                var TypEsuVal = this.findFields("TypEsu").gfield("getValue");

                //disabled enabled

                if (ovRobRos || this.PrizEko)
                    dis = dis + ",TypEsu";
                else
                    enable = enable + ",TypEsu";

                if (m_bReadOnlyMode)
                    dis = dis + ",TitulPred, TitulZa, RodStav, Dic, RodneCislo";
                else
                    enable = enable + ",TitulPred, TitulZa, RodStav, Dic, RodneCislo";

                if (m_bReadOnlyMode || ovRob)
                    dis = dis + ",TypOrganizace";
                else
                    enable = enable + ",TypOrganizace";

                if (ovRob)
                    dis = dis + ",Jmeno,Prijmeni";
                else
                    enable = enable + ",Jmeno,Prijmeni";

                if (ovRobRos)
                    dis = dis + ",RodPrijmeni, Pohlavi, StatSp, MistoNar, ObchodniJmeno, Prezdivka, UrPri"; // dsebesta  20.01.2021  Petr chtěl povolit Nazev 
                else
                    enable = enable + ",RodPrijmeni, Pohlavi, StatSp, MistoNar, ObchodniJmeno, Prezdivka, UrPri, Nazev";// dsebesta  20.01.2021  Petr chtěl povolit Nazev 

                var datNarValue = this.findFields("DatNar").gfield("getValue");
                if (ovRob
                    || (datNarValue && this.gin_esu_dnzobr == 2 && (!this.typZobrazeni.Novy)))
                    dis = dis + ", DatNar";
                else
                    enable = enable + ", DatNar";

                if (ovRobRos
                    || m_bReadOnlyMode
                    || ((that.typZobrazeni.NovaPobocka || (this.model.IxsEsu && this.model.IxsEsu !== this.model.IxsEko)) && !that.GEsuParamsDto.gin_esu_pobico)
                ) // ALF 1.2.2017 detail ESU: obsluha GIN ESU - povolení zadat a editovat IČO na pobočce/adrese ESU [REQ-35741-16]
                    dis = dis + ", Ico";
                else
                    enable = enable + ", Ico";

                if (ovRobRos || !this.GEsuParamsDto.ssl_rp_esu_obal || !opravit)
                    dis = dis + ", m_oObalka";
                else
                    enable = enable + ", m_oObalka";

                if (ovRobRos || ovPouzeRuian)
                    dis = dis + ", Ulice, CisloPopisne, CisloOrientacni, Psc, Obec, CastObce, Stat";
                else
                    enable = enable + ", Ulice, CisloPopisne, CisloOrientacni, Psc, Obec, CastObce, Stat";

                if (ovRobRos || (ovPouzeRuian && (this.gin_esu_povoadm !== 1)))
                    dis = dis + ", StupenVerifikace";
                else
                    enable = enable + ", StupenVerifikace";

                if (ovRobRos || that.GEsuParamsDto.gin_esu_duedit === 0)
                    dis = dis + ", DatUmrti";
                else
                    enable = enable + ", DatUmrti";

                //cally na server

                if (ico && stupenVer === 65 && that.GEsuParamsDto.gin_iszr_esuprf !== 0) {
                    var TypOrgVal = this.findFields("TypOrganizace").gfield("getValue");
                    that.call("OvereniPodleStupnuVerifikace", {
                        TypEsu: TypEsuVal.typ_esu ? TypEsuVal.typ_esu : null,
                        Ico: ico,
                        TypOrg: TypOrgVal && TypOrgVal.typ_org ? TypOrgVal.typ_org : null
                    }, null, { progressState: false }) // nevyvolá se preloader   
                        .done(function (retVal) {
                            if (retVal) {
                                jePrFormaOk = true
                                var stav = m_bReadOnlyMode || ovRob || (ovRobRos && jePrFormaOk);
                                that.findFields("TypOrganizace").gfield("option", "disabled", stav);
                            }
                        });
                }
                if (ico && TypEsuVal && TypEsuVal.typ_esu === 30 && stupenVer === 65) {
                    var jmeno = this.findFields("Jmeno").gfield("getValue");
                    var prijmeni = this.findFields("Prijmeni").gfield("getValue");

                    that.call("OvereniPodleStupnuVerifikace", {
                        TypEsu: TypEsuVal.typ_esu ? TypEsuVal.typ_esu : null,
                        Ico: ico,
                        Jmeno: jmeno,
                        Prijmeni: prijmeni
                    }, null, { progressState: false }) // nevyvolá se preloader   
                        .done(function (retVal) {
                            ovRosPoNeboOsvcSAifo = retVal;
                            var stav = ovRob || ovRosPoNeboOsvcSAifo;
                            that.findFields("Jmeno,Prijmeni").gfield("option", "disabled", stav);
                        })
                }
                this.findFields(dis).gfield("option", "disabled", true);
                this.findFields(enable).gfield("option", "disabled", false);
            }
        },

        ZkusNasetovatObec: function (nazev, psc) { // nastavím filtry u políčka ulice a části obce
            var that = this;
            this.log.trace("ZkusNasetovatObec");
            var field = that.findFields("Obec");
            var hodnotaVObci = field.gfield("getValue");
            if(hodnotaVObci === null) {
                field.gfield("setValue", { obec: nazev });
                that.dohledejKodObce(nazev, psc);
            }
        },

        dohledejKodObce: function (nazev, psc) { // pokusi se dohledat kod obce poku je zadano jenom string název
            var that = this;
            this.log.trace("dohledejKodObce");
            this.beginOperation();

            var data = new Gordic.Data.Readers.Ginspso().getData({ obec: nazev, psc: psc }).done(function (view) {

                if (view.length === 1 && view["0"].obec_kod) {
                    that.SetniServerFiltersUAdresy(view["0"].obec_kod);
                    var field = that.findFields("Obec");
                    field.gfield("setValue", view["0"], { valid: true });
                    //that.ZkusDohledatANasetovatCastObce(view["0"].obec_kod, view["0"].cast_obce);
                }
            }).always(function () {
                that.endOperation();
            })
                ;
        },
        SetniServerFiltersUAdresy: function (obec_kod) { // nastavi server filters
            var that = this;
            this.log.trace("SetniServerFiltersUAdresy");
            that.findFields("CastObce").gfield("option", "serverFilters", { obec_kod: obec_kod });
            that.findFields("Ulice").gfield("option", "serverFilters", { obec_kod: obec_kod, });
        },

        NastavFilterUObce: function (changeObj) {
            var that = this;
            this.log.trace("NastavFilterUObce");
            if (changeObj.value && changeObj.value.psc) {
                that.findFields("Obec").gfield("option", "serverFilters", { psc: changeObj.value.psc });
            } else {
                that.findFields("Obec").gfield("option", "serverFilters", { psc: null });
            }

        },

        ZkusNasetovatPsc: function (psc) { // nastavím filtry u políčka ulice a části obce

            var that = this;
            this.log.trace("ZkusNasetovatPsc");
            var field = that.findFields("Psc");
            var hodnotaPsc = field.gfield("getValue");
            if (hodnotaPsc == null) {
                var statVal = that.findFields("Stat").gfield("getValue");
                var stat = statVal && statVal.stat ? statVal.stat : undefined;

                field.gfield("setValue", { stat: stat, psc: psc }, { valid: false, BezObalky: true }); // //setValueFromKeys
            }
        },

        ZkusDohledatANasetovatCastObce: function (obec_kod, cast_obce) { // nastavím filtry u políčka ulice a části obce
            var that = this;
            this.log.trace("ZkusDohledatANasetovatCastObce");
            var field = that.findFields("CastObce");
            var hodnota = field.gfield("getValue");
            if (hodnota == null || hodnota.cast_obce_kod === "" || hodnota.cast_obce_kod == null) {
                //Gordic.Prefabs.Select.szrsobc
                if (cast_obce.indexOf("(jres:31900463)") > -1) { //RC 31900463 : část
                    cast_obce = cast_obce.replace("(jres:31900463)", ""); //RC 31900463 : část
                    cast_obce = cast_obce.trim();
                }
                this.beginOperation();
                var data = new Gordic.Data.Readers.Szrsobc().getData({ obec_kod: obec_kod, cast_obce_nazev: cast_obce })
                    .done(function (view) {
                        if (view.length === 1 && view["0"].cast_obce_kod) {
                            //that.SetniServerFiltersUAdresy(view["0"].obec_kod);
                            field.gfield("setValue", view["0"], { valid: true });
                        }
                    })
                    .always(function () {
                        that.endOperation();
                    })
                    ;

            }
        },

        zkusNasetovatZCastiObceNaObecAPSC: function (obec_kod_input) {
            var that = this;
            this.log.trace("zkusNasetovatZCastiObceNaObecAPSC");
            var field = that.findFields("Obec");
            var hodnotaVObci = field.gfield("getValue");
            if (hodnotaVObci === null) {
                that.beginOperation();

                var data = new Gordic.Data.Readers.Ginspso().getData({ obec_kod: obec_kod_input })
                    .done(function (view) {
                        if (view && view.length === 1 && view["0"].obec_kod) {
                            field.gfield("setValue", view["0"], { valid: true });
                        }
                    })
                    .always(function () {
                        that.endOperation();
                    })
                    ;
            }
        },

        zkusNasetovatZUliceNaObecAPSC: function (obec_kod_input) {
            this.log.trace("zkusNasetovatZUliceNaObecAPSC");
            this.zkusNasetovatZCastiObceNaObecAPSC(obec_kod_input);
        },

        UpdateTypAdresyLabel: function (typesu) {
            this.log.trace("UpdateTypAdresyLabel");
            var field = this.findFields("TypAdr");
            var value = {};
            field.gfield("model", "collect", value);

            if (typesu === 20)    // FO
            {
                if (this.GEsuParamsDto.gin_esu_zatypak) {
                    field.gfield("option", "data",
                        new Gordic.Data.View([
                            { typ: 0, nazev: "jres:26265188" }, //RC 26265188 : Trvalá
                            { typ: 10, nazev: "jres:26265189" }, //RC 26265189 : Doručovací
                            { typ: 30, nazev: "jres:31900410" }, //RC 31900410 : Kontaktní
                        ], { key: "typ" }));
                }
                else {
                    field.gfield("option", "data",
                        new Gordic.Data.View([
                            { typ: 0, nazev: "jres:26265188" }, //RC 26265188 : Trvalá
                            { typ: 10, nazev: "jres:31900411" }, //RC 31900411 : Kontaktní/doruč.
                            { typ: 30, nazev: "jres:31900410" }, //RC 31900410 : Kontaktní
                        ], { key: "typ" }));
                }
            } else {
                field.gfield("option", "data",
                    new Gordic.Data.View([
                        { typ: 0, nazev: "jres:26265188" }, //RC 26265188 : Trvalá
                        { typ: 10, nazev: "jres:31900412" }, //RC 31900412 : Pobočka/provozovna
                        { typ: 30, nazev: "jres:31900410" }, //RC 31900410 : Kontaktní
                    ], { key: "typ" }));
            }
            field.gfield("model", "apply", value);
        },

        //#endregion



        //#region Metody co jdou na server
        pokusOUlozeni: function (FlagZavriDetail, OpakovaneVolani) {
            this.log.trace("pokusOUlozeni");
            var that = this;
            //this.findForms("HlavniForm").gform("waitForValues").done(function () {
            //    that.UpdateObalkovaAdresa();
            that.beginOperation("jres:31901096"); //RC 31901096 : Dokončují se operace na dialogu
            that.loadingAwait.then(function () {
                that.endOperation();
                that.findFields().gfield("resetErrors", "serverValidation"); //resetovani chyb ze serverové validace
                if (!that.findForms("HlavniForm").gform("isValid") || !that.findForms("KontaktyForm").gform("isValid") || !that.findForms("UdajeEU").gform("isValid"))
                    return;
                var Form = that.findForms("HlavniForm");

                var hlaseni = Form.gform("getErrors");
                var chybyObj = that.zkontrolujZdaJeChybaNaPolicku(hlaseni)
                if (chybyObj && chybyObj.zprava) {
                    $($(chybyObj.prvni)).gfield().find(":focusable:first").focus();
                    return;
                }

                var warningyStr = that.zkontrolujWarningy(hlaseni);
                if (that.PocitadloVolaniObalkoveAdresy !== that.PocitadloVolaniObalkoveAdresyVracenaHodnota) {
                    if (OpakovaneVolani || that.posledniOdchoziCallNaUpdateObalkoveAdresy == null) {
                        that.dialogs.messageBox("jres:31900975", //RC 31900975 : Pozor
                            "jres:31901095"); //RC 31901095 : Vyčkejte prosím na dokončení výpočtu obálkové adresy a poté prosím znovu uložte.
                    } else {
                        that.beginOperation("jres:31901153"); //RC 31901153 : Dopočítání obalkové adresy
                        that.posledniOdchoziCallNaUpdateObalkoveAdresy.done(function () {
                            
                            that.endOperation();
                            that.pokusOUlozeni(FlagZavriDetail, true);

                        }).fail(function (xhr, type, vobj) {
                            that.endOperation();
                        });

                        //setTimeout(function () {
                        //    that.endOperation();
                        //    that.pokusOUlozeni(FlagZavriDetail, true);
                        //}, 1000)
                    }
                    return;
                }

                if (warningyStr) {
                    that.dialogs.confirm("jres:26265465", //RC 26265465 : Varování
                        warningyStr + "<br> <br>" + "jres:31900331").on("closed", function (ev, retVal) { //RC 31900331 : Přejete si přesto uložit?
                            if (retVal) {
                                if (retVal === "yes") {
                                    that.saveDetailKontrolaISDS(FlagZavriDetail);
                                }
                            }
                        });
                } else {
                    // that.loading 
                    that.saveDetailKontrolaISDS(FlagZavriDetail);
                }
            });

            //});


        },

        zkontrolujZdaJeChybaNaPolicku: function (warningy) {
            this.log.trace("zkontrolujZdaJeChybaNaPolicku");
            var that = this;
            var zprava = null;
            var prvni = null;
            var vypisovaneChyby = [];

            $(warningy).each(function (index, value) {
                if (value && value.errorType == "error") {
                    if (prvni === null) {
                        prvni = value.source["0"];
                    }
                    vypisovaneChyby.push(value.message);
                }
            });
            zprava = vypisovaneChyby.join("<br>");

            return { zprava: zprava, prvni: prvni };
        },

        zkontrolujWarningy: function (warningy) {
            this.log.trace("zkontrolujWarningy");
            var that = this;
            var zprava = null;


            var vypisovaneWarningy = []; //.concat(warning1, warning2);

            $(warningy).each(function (index, value) {
                //if (value.errorType == "warning") {
                if (value
                    && value.group != "ObalkovaAdresaStateId"
                    && value.group != "ObalkovaAdresaOriznutiId"
                    && vypisovaneWarningy.indexOf(value.message) === -1)// zjištuji zda už se hláška v poli nenachází, pokud ano tak již znova nepřidávám
                {
                    vypisovaneWarningy.push(value.message);
                }
                //}
            });
            zprava = vypisovaneWarningy.join("<br>");
            return zprava;


        },

        saveDetailKontrolaISDS: function (FlagZavriDetail) {
            var that = this;
            if (this.dataIsdsUserChanged && this.GEsuParamsDto.gin_upsr_povol != 1) {
                var stupenVerField = that.findFields("StupenVerifikace");
                var stupenVerValue = stupenVerField.gfield("getValue");
                var stupenVer = (stupenVerValue && (stupenVerValue.stupen_ver != null)) ? stupenVerValue.stupen_ver : null;
                if (stupenVer == 80) {
                    that.dialogs.confirm("Dotaz",
                        "jres:31901250") //RC 31901250 : Data převzatá z ISDS byla změněna, chcete uložit s verifikací neverifikováno?
                        .on("closed", function (ev, ret) {
                            if (ret === "yes") {
                                stupenVerField.gfield("setValueFromKeys", "10");
                                that.findForms("HlavniForm").gform("waitForValues")
                                    .done(function () {
                                        that.saveDetail(FlagZavriDetail);
                                        that.resetIsdsPole();
                                    });
                            } else {
                                ; //nic
                            }
                        });
                    return; // pokud dotaz tak končím funkci
                }
            }
            this.saveDetail(FlagZavriDetail);
        },

        saveDetail: function (FlagZavriDetail, data) {
            var that = this;
            this.log.trace("saveDetail");
            var fields = this.findForms("HlavniForm,KontaktyForm,UdajeEU").findFields();
            var SaveBezHledaniDuplicit = false;
            if (data == null) {
                fields.gfield("model", "collect", this.model);
            } else {
                this.model = data;
                SaveBezHledaniDuplicit = true;
            }

            if (this.typZobrazeni.Novy || this.typZobrazeni.NovaPobocka || this.typZobrazeni.NovaKopie) {
                this.flagNovehoEsu = true;
            }

            if (that.ProbihaAsynchroniOperace === false) {
                this.call("SaveDetailEsu", { DetailEsuItems: this.model, SaveBezHledaniDuplicit: SaveBezHledaniDuplicit }, null, { applyValidationResultTo: fields })
                    .done(function (retVal) {
                        if (retVal.Stav == "1") {
                            that.findFields().gfield("confirm");

                            that.TempRetValueFromDetailEsu = {
                                ulozeno: true,  // indikace změny esu v databázi.
                                data: retVal.Model
                            };
                            if (FlagZavriDetail) {
                                that.tryClose();

                            } else {
                                var ParamsJSON = {
                                    IxsEsu: retVal.Model.IxsEsu,
                                    Logovani: that.serverParams.Logovani,
                                    Ucel: 2,
                                    TempRetValueFromDetailEsu: that.TempRetValueFromDetailEsu
                                }; //,    , ID: "DetailEsu#"   // ucel 2 = editace
                                $.content(that).load(ParamsJSON);
                            }

                        } else if (retVal.Stav == "2") {
                            that.otevriPodobneSubjekty(retVal, FlagZavriDetail);
                        }
                    })
                    .fail(function (xhr, type, vobj) {
                        //console.log("typ exception: ", type);
                        if (type === "validation") {
                            var msg = "jres:31900332:<br/>"; //RC 31900332 : Chyba validace (server)
                            $.each(vobj, function (k, v) {
                                for (var i = 0; i < v.length; i++)
                                    msg += k + ": " + v[i].message + "<br/>";
                            });
                            that.dialogs.error(msg);
                        }
                    });
            } else {
                that.dialogs.alert("jres:31900100"); //RC 31900100 : Probíhá ověření zadaných dat, počkejte na jeho dokončení.
            }

        },

        otevriPodobneSubjekty: function (retVal, FlagZavriDetail) {

            var that = this;
            this.log.trace("otevriPodobneSubjekty");
            var param = {
                Logovani: this.serverParams.Logovani,
                DetailUkladaneho: retVal.Model,
                SeznamPodobnych: retVal.Podobne,
            };

            Gordic.Esu.Dialogs.SeznamPodobnychDlg(this, param).on("closed", function (ev, retVal) {
                if (retVal && retVal.stav) {

                    switch (retVal.stav) {
                        case "UlozitNovy":
                            that.saveDetail(FlagZavriDetail, retVal.data);
                            break;

                        case "PouzitVybrany":
                        case "Napojit":
                            that.TempRetValueFromDetailEsu = {
                                ulozeno: true,  // indikace změny esu v databázi.
                                data: retVal.data
                            };
                            if (FlagZavriDetail) {
                                that.tryClose();

                            } else {
                                var ParamsJSON = {
                                    IxsEsu: retVal.data.IxsEsu,
                                    Logovani: that.serverParams.Logovani,
                                    Ucel: 2,
                                    TempRetValueFromDetailEsu: that.TempRetValueFromDetailEsu
                                }; //,    , ID: "DetailEsu#"   // ucel 2 = editace
                                $.content(that).load(ParamsJSON);
                            }
                            break;

                        default:
                            break;
                    }

                }
            });
        },

        OverOsobniCislo: function () {
            var that = this;
            this.log.trace("OverOsobniCislo");
            var osobnicislo = that.findFields("Oc").gfield("getValue");
            if (osobnicislo) {
                $.content(that).findFields("Oc").gfield("resetErrors", "manualOC");
                this.call("UpdateOcValid", { osobnicislo: osobnicislo }, null, { progressState: false }) // nevyvolá se preloader
                    .done(function (r) {
                        //console.log("UpdateOcValid", r);
                        if (r.stav === "error") {
                            that.findFields("Oc").gfield("setError",
                                {
                                    message: r.zprava,
                                    errorType: r.stav,
                                    group: "manualRC",
                                    stopping: false,
                                    showOnDisabled: true
                                });
                            if (that.typZobrazeni.Detail) that.showFlash({ label: r.zprava, customClass: "g-state-" + r.stav, });
                        }
                    })
                    .fail(function (xhr, type, vobj) {
                    });
            } else {
                $.content(that).findFields("Oc").gfield("resetErrors", "manualOC");
            }
        },

        OverRodneCislo: function () {
            var that = this;
            this.log.trace("OverRodneCislo");
            var rodneCislo = that.findFields("RodneCislo").gfield("getValue");
            var StatSpValue = that.findFields("StatSp").gfield("getValue");
            var StatSp = null;
            if (StatSpValue) {
                StatSp = StatSpValue.stat
            }
            if (rodneCislo && StatSpValue) {


                $.content(that).findFields("RodneCislo").gfield("resetErrors", "manualRC");
                this.call("UpdateRodneCisloValid", { rodneCislo: rodneCislo, StatSp: StatSp }, null, { progressState: false }) // nevyvolá se preloader
                    .done(function (r) {
                        if (r.stav === "error") {
                            that.findFields("RodneCislo").gfield("setError",
                                {
                                    message: r.zprava,
                                    errorType: r.stav,
                                    group: "manualRC",
                                    stopping: false,
                                    showOnDisabled: true
                                });
                            if (that.typZobrazeni.Detail) that.showFlash({ label: r.zprava, customClass: "g-state-" + r.stav, });
                        }
                    }).fail(function (xhr, type, vobj) {
                    });
            } else {
                $.content(that).findFields("RodneCislo").gfield("resetErrors", "manualRC");
            }
        },

        zkontrolujBICUBanky: function () {
            var that = this;
            var dto = {};
            this.log.trace("zkontrolujBICUBanky");
            $.content(this).findFields("TypOrganizace, BicTypBan, Bic, Stat").gfield("model", "collect", dto);
            if (dto.TypOrganizace === 60) {
                this.call("UpdateTbBicValid", { dto: dto }, null, { progressState: false }) // nevyvolá se preloader
                    .done(function (retVal) { //
                        $.content(that).findFields("Bic").gfield("resetErrors", "rucniOvereniBic");
                        if (retVal && retVal.stav === "error") {
                            $.content(that).findFields("Bic").gfield("setError", { message: retVal.zprava, stopping: false, group: "rucniOvereniBic", errorType: retVal.stav, showOnDisabled: true })
                            if (that.typZobrazeni.Detail) that.showFlash({ label: retVal.zprava, customClass: "g-state-" + retVal.stav, });
                        }
                        if (retVal && retVal.stav === "warning") {
                            $.content(that).findFields("Bic").gfield("setError", { message: retVal.zprava, stopping: false, group: "rucniOvereniBic", errorType: retVal.stav, showOnDisabled: true })
                            if (that.typZobrazeni.Detail) that.showFlash({ label: retVal.zprava, customClass: "g-state-" + retVal.stav, });
                        }

                    })
                    .fail(function (xhr, type, vobj) {
                    });

            }
        },
        // UpdateIcoValid. 
        zkontrolujICO: function () {
            var that = this;
            this.log.trace("zkontrolujICO");
            var dto = {};
            $.content(this).findFields("Ico, IxsEsu, Stat").gfield("model", "collect", dto);

            if (dto.Ico) {
                this.call("UpdateIcoValid", { dto: dto }, null, { progressState: false }) // nevyvolá se preloader
                    .done(function (retVal) { //
                        $.content(that).findFields("Ico").gfield("resetErrors", "rucniOvereniIco");
                        if (retVal && retVal.stav === "error") {
                            $.content(that).findFields("Ico").gfield("setError", { message: retVal.zprava, stopping: false, group: "rucniOvereniIco", errorType: retVal.stav, showOnDisabled: true })
                            if (that.typZobrazeni.Detail) that.showFlash({ label: retVal.zprava, customClass: "g-state-" + retVal.stav, });
                        }
                        if (retVal && retVal.stav === "warning") {
                            $.content(that).findFields("Ico").gfield("setError", { message: retVal.zprava, stopping: false, group: "rucniOvereniIco", errorType: retVal.stav, showOnDisabled: true })
                            if (that.typZobrazeni.Detail) that.showFlash({ label: retVal.zprava, customClass: "g-state-" + retVal.stav, });
                        }

                    })
                    .fail(function (xhr, type, vobj) {
                    });

            }
        },



        //#endregion 

        //#region Pomocné metody

        /**
         * 
         * @param {any} fieldName
         * @param {any} required
         */
        upravRequiredNaFieldu: function (fieldName, required) {
            this.log.trace("upravRequiredNaFieldu");
            var that = this;
            //that.findFields(fieldName).gfield("option", "validators");
            that.findFields(fieldName).each(function (index, element) {
                var puvodniValidatory = $(element).gfield("option", "validators");
                var noveValidatory = puvodniValidatory.filter(function (Validator) {
                    return !(Validator instanceof Gordic.Validators.Required);
                });
                if (required) {
                    noveValidatory.push(new Gordic.Validators.Required());
                }
                $(element).gfield("option", "validators", noveValidatory);
            });
            var nalezeneFieldy = this.findFields();
            Utils.Form.markRequired(nalezeneFieldy);
        },

        /**
         * @fn  GenerovaniKontrolaRcADatNaroz: function ()
         *
         * @brief   Generovani kontrola rectangle a dat naroz.
         *
         * @author  Dsebesta
         * @date    24.07.2017
         *
         * @return  .
         */

        GenerovaniKontrolaRcADatNaroz: function () {
            var that = this;
            this.log.trace("GenerovaniKontrolaRcADatNaroz");
            that.findFields("DatNar").gfield("resetErrors", "OvereniDatumuNarozeni");
            var rodneCislo = that.findFields("RodneCislo").gfield("getValue");
            var datNar = that.findFields("DatNar").gfield("getValue");
            var vygenerovane = null;
            if (rodneCislo) {
                if (rodneCislo === "xxxxxxxxx" && this.zacatekRodCislaPuvodni) {
                    vygenerovane = that.DatNarozeniGenerate(this.zacatekRodCislaPuvodni);
                } else if (rodneCislo !== "xxxxxxxxx") {
                    vygenerovane = that.DatNarozeniGenerate(rodneCislo);
                }
               
                
            }
            if (datNar && vygenerovane) {
                var vyg = new Date(vygenerovane);  //new Date(parseInt(vygenerovane.substring(6, 10)), parseInt(vygenerovane.substring(3, 5)) - 1, parseInt(vygenerovane.substring(0, 2)));
                var nac = new Date(datNar);
                if (vyg.getDate() === nac.getDate() && vyg.getMonth() === nac.getMonth() && vyg.getFullYear() === nac.getFullYear()) {
                    //console.log("ano, ano, čas sedí jako zadnice na rendliku");
                } else {
                    that.findFields("DatNar").gfield("setError", { stopping: false, group: "OvereniDatumuNarozeni", errorType: "warning", message: "jres:31900101", showOnDisabled: true }); //RC 31900101 : Datum narození vypočtený z rodného čísla neodpovídá zadanému datumu narození.
                }

                //compare
            }
            if (vygenerovane && datNar === null) {
                that.findFields("DatNar").gfield("setValue", vygenerovane);
            }

        },


        DatNarozeniGenerate: function (aRC) {

            this.log.trace("DatNarozeniGenerate");
            var ret = null;
            try {
                aRC = aRC.trim().replace("\\", "").replace("/", "").replace(" ", "");
                var aYear = aRC.substring(0, 2);
                var aMonth = aRC.substring(2, 4);
                var aDay = aRC.substring(4, 6);
                var Year = parseInt(aYear, 10);
                var Month = parseInt(aMonth, 10);
                var Day = parseInt(aDay, 10);

                if (isNaN(Year) || isNaN(Month) || isNaN(Day)) return null;

                if (aRC.length == 9)    // 9 místná čísla se vydávají do 31.12.1953
                {
                    Year += 1900;
                }
                else // 10 místná čísla se vydávají od 1.1.1954
                {
                    if (Year >= 54)
                        Year += 1900;
                    else
                        Year += 2000;
                }

                // 01-12, 21-32, 51-62 a 71-82 pro druhé dvojčíslí 
                if (Month >= 21 && Month <= 32)
                    Month = Month - 20;   // muži - od 2004
                else if (Month >= 51 && Month <= 62)
                    Month = Month - 50;   // ženy
                else if (Month >= 71 && Month <= 82)
                    Month = Month - 70;   // ženy - od 2004

                //ret = Day.toString() + "." + Month.toString() + "." + Year.toString();  //l_oDatumNarozeni = new DateTime(l_nRok, l_nMesic, l_nDen);
                ret = new Date(Year, Month - 1, Day);  //l_oDatumNarozeni = new DateTime(l_nRok, l_nMesic, l_nDen);
            } catch (error) {
                // nedělám nic
            }
            return ret;

        },

        nactiDtoBezValidace: function () {
            var dto = {};
            this.log.trace("nactiDtoBezValidace");
            this.findFields().gfield("model", "collect", dto);
            return dto;
        },

        ZkontrolujCisloPopisneAOrientacni: function () {
            var that = this;
            this.log.trace("ZkontrolujCisloPopisneAOrientacni");
            that.findFields("CisloPopisne, CisloOrientacni").gfield("resetErrors", "OvereniCPopCor");
            var CPop = parseInt(that.findFields("CisloPopisne").gfield("getValue"));
            var COr = parseInt(that.findFields("CisloOrientacni").gfield("getValue"));

            if (CPop && COr) {
                if (CPop < COr) {
                    //that.findFields("CisloPopisne").gfield("setError", { stopping: false, group: "OvereniCPopCor", errorType: "warning", message: "jres:31900082", showOnDisabled: true }); //RC 31900082 : Číslo orientační je obvykle menší než číslo popisné, doporučujeme zadání čísel zkontrolovat.
                    that.findFields("CisloOrientacni").gfield("setError", { stopping: false, group: "OvereniCPopCor", errorType: "warning", message: "jres:31900082", showOnDisabled: true }); //RC 31900082 : Číslo orientační je obvykle menší než číslo popisné, doporučujeme zadání čísel zkontrolovat.
                }
            }
        },
        DoplnNazevZJmenaAPrijmeni: function (BezObalky) {
            var that = this;
            this.log.trace("DoplnNazevZJmenaAPrijmeni");
            var jmeno = that.findFields("Jmeno").gfield("getValue");
            var prijmeni = that.findFields("Prijmeni").gfield("getValue");
            var nazev = that.findFields("Nazev").gfield("getValue");
            var obchodniJmeno = that.findFields("ObchodniJmeno").gfield("getValue");
            var typ = that.findFields("TypEsu").gfield("getValue").typ_esu;
            var Nazvicek = null;
            if (prijmeni) {  // připravení stringu
                if (jmeno) {
                    Nazvicek = prijmeni.trim() + " " + jmeno.trim();
                } else {
                    Nazvicek = prijmeni.trim();
                }
            }

            if (Nazvicek) { // vyplněny oba
                if (typ === 20) {   // fyzická osoba Nazev přeuložím vždy 
                    that.findFields("Nazev").gfield("setValue", Nazvicek, { BezObalky: BezObalky });
                } else if (typ === 30) {
                    if (nazev === null) {
                        that.findFields("Nazev").gfield("setValue", Nazvicek, { BezObalky: BezObalky });
                    }
                    if (obchodniJmeno === null) {
                        that.findFields("ObchodniJmeno").gfield("setValue", Nazvicek, { BezObalky: BezObalky });
                    }
                }
            }

        },

        doplnNazevZObchodnihoJmena: function () {
            var that = this;
            this.log.trace("doplnNazevZObchodnihoJmena");
            var obchodniJmeno = that.findFields("ObchodniJmeno").gfield("getValue");
            var nazev = that.findFields("Nazev").gfield("getValue");
            var typ = null;
            var fieldTypEsu = that.findFields("TypEsu");

            fieldTypEsu.gfield("getValueAsync").done(function (value) {
                if (value && value.typ_esu) {
                    typ = value.typ_esu;
                    if (obchodniJmeno) {
                        if ((typ === 10 || typ === 30) && nazev == null) {   // fyzická osoba Nazev přeuložím vždy 
                            that.findFields("Nazev").gfield("setValue", obchodniJmeno);
                        }
                    }
                }
            });







        },

        prepnoutDoEditace: function (ixs_esu) {
            var that = this;
            this.log.trace("prepnoutDoEditace");
            if (ixs_esu == null) {
                ixs_esu = that.model.IxsEsu;
            }

            if (ixs_esu) {
                var ParamsJSON = { IxsEsu: ixs_esu, Ucel: 2, Logovani: this.serverParams.Logovani }; //,    , ID: "DetailEsu#"   // ucel 2 = editace
                this.load(ParamsJSON);
            }

        },

        cekejAPakObnov: function () {
            var that = this;
            this.log.trace("cekejAPakObnov");
            return this.findForms("HlavniForm").gform("waitForValues").done(function () {
                that.UpdateObalkovaAdresa();
                that.cekejApakEnableFields(); // napříkad po převzetí z iszr je potřeba znovu předisableovat políčka
            });
        },
        //#endregion


        //#region metody Adresa a Obalkova Adresa
        UpdateObalkovaAdresa: function (hardSet, NeprovadetOpravuObalkoveAdresyInput) {
            var that = this;
            this.log.trace("UpdateObalkovaAdresaCallCountDto");
            this.ProgramovaZmenaUrPriStupenVer = this.ProgramovaZmenaUrPriStupenVer ? true : false; // TODO Dodělat nastavování
            var dto = that.nactiDtoBezValidace();

            this.PocitadloVolaniObalkoveAdresy = this.PocitadloVolaniObalkoveAdresy != null ? this.PocitadloVolaniObalkoveAdresy : 0;
            this.PocitadloVolaniObalkoveAdresy = this.PocitadloVolaniObalkoveAdresy + 1; // přičtu jedničku k počítadlu odeslaných požadavku
            var NeprovadetOpravuObalkoveAdresy = true;
            if (!NeprovadetOpravuObalkoveAdresyInput &&
                (!dto.CheckBoxOpravit
                    || (hardSet && !this.typZobrazeni.Detail)
                    || (this.ProgramovaZmenaUrPriStupenVer && (dto.NeaktObaInt == 1))
                ) // pokud přebírám data z ISZR a není zaškrtnuto aktulalizovat - měla by zůstat původní obálka
            ) {
                NeprovadetOpravuObalkoveAdresy = false;
            }
            this.posledniOdchoziCallNaUpdateObalkoveAdresy = this.call("UpdateObalkovaAdresaCallCountDto", { dto: dto, PocitadloVolaniObalkoveAdresy: this.PocitadloVolaniObalkoveAdresy, NeprovadetOpravuObalkoveAdresy: NeprovadetOpravuObalkoveAdresy }, null, { progressState: false }) // nevyvolá se preloader
                .done(function (retVal) {
                    if (that.PocitadloVolaniObalkoveAdresy === retVal.PocitadloVolaniObalkoveAdresy) { // pokud je to práva ten poslední call na který se čeká
                        that.PocitadloVolaniObalkoveAdresyVracenaHodnota = retVal.PocitadloVolaniObalkoveAdresy; // uložím hodnotu pro výslednou kontrolu při uložení, asi by tam časem nemusela být
                        var obalkaField = that.findFields("m_oObalka");
                        if (retVal && retVal.ObalkovaAdresaDto && retVal.ObalkovaAdresaDto.DetailEsuItemsDto) { // pokud přišli hodnoty tak nasetuji
                            obalkaField.gfield("model", "apply", retVal.ObalkovaAdresaDto.DetailEsuItemsDto, { setFlags: { RucniNastaveniZKodu: true } });
                        }
                        obalkaField.gfield("resetErrors", "ObalkovaAdresaStateId"); // vyresetuju warning s rozdilnou obalkovou adresou
                        obalkaField.gfield("resetErrors", "ObalkovaAdresaOriznutiId"); 
                        if (retVal && retVal.ObalkovaAdresaDto && retVal.ObalkovaAdresaDto.UpdateObalkovaAdresaState && retVal.ObalkovaAdresaDto.UpdateObalkovaAdresaState.RozdilnaObalkovaAdresa) {
                            var VypociranaAdresa =
                                retVal.ObalkovaAdresaDto.UpdateObalkovaAdresaState.St2 + "<br>"
                                + retVal.ObalkovaAdresaDto.UpdateObalkovaAdresaState.St3 + "<br>"
                                + retVal.ObalkovaAdresaDto.UpdateObalkovaAdresaState.St4 + "<br>"
                                + retVal.ObalkovaAdresaDto.UpdateObalkovaAdresaState.St5 + "<br>"
                                + retVal.ObalkovaAdresaDto.UpdateObalkovaAdresaState.St6;
                            var textDoWarnigu = "jres:31901098" + ":<br>" + VypociranaAdresa; //RC 31901098 : Obálková adresa neodpovídá doporučené obálce podle údajů ESU

                            obalkaField.gfield("setError", { stopping: false, group: "ObalkovaAdresaStateId", errorType: "warning", message: textDoWarnigu, showOnDisabled: true, tooltip: "jres:31901140" }); //RC 31901140 : Vygenerovaná obálková adresa
                        }
                        if (retVal && retVal.ObalkovaAdresaDto && retVal.ObalkovaAdresaDto.UpdateObalkovaAdresaState && retVal.ObalkovaAdresaDto.UpdateObalkovaAdresaState.GenerovaniObalkoveAdresyDosloKOriznuti) {
                            
                            var textDoWarniguOriznuti = "jres:31901141"; //RC 31901141 : Automaticky generovaná adresa byla oříznuta. Pokud jste ještě adresu neupravili ručně, učiňte tak. Povolená délka řádku je 50 znaků.

                            obalkaField.gfield("setError", {
                                stopping: false, group: "ObalkovaAdresaOriznutiId", errorType: "warning", message: textDoWarniguOriznuti, showOnDisabled: true,
                                //tooltip: "Při generování obálkové adresy došlo k oříznutí textu. Jeden řádek adresy může mít pouze 50 znaků. Pokud nemáte již upravenou adresu ručně, prosím editujte adresu manuálně."
                            });
                       
                        }
                    }

                })
                .fail(function (xhr, type, vobj) {
                });


        },
        //#endregion

        //#region Zastupne osoby Kartičky Metody

        VyfiltrujANastavZastupneOsoby: function () { // zoobrazi skryje neaktivní záznamy v gridu Zastupnych osob
            var that = this;
            this.log.trace("VyfiltrujANastavZastupneOsoby");
            var fieldZas = that.findFields("zastupySel");
            var jenAktivni = fieldZas.gfield("option", "jenAktivni");
            var temp = {};
            if (jenAktivni) {
                temp = $.grep(that.TabulkaZastupu, function (value) {
                    return value.aktivita === 100;
                });
            } else {
                temp = that.TabulkaZastupu;
            }
            fieldZas.gfield("setValue", temp);
        },
        vytvorNovouZastupnouosobuKarticky: function () { // vytvolá dialog nové zástupné osoby
            var that = this;
            this.log.trace("vytvorNovouZastupnouosobuKarticky");
            var dtoTemp = {};
            var dto = {};
            that.findForms("HlavniForm").findFields("m_oObalka")
                .gfield("model", "collect", dtoTemp);
            dto.st0 = "";
            dto.st1 = "";
            dto.st2 = "";
            dto.st3 = dtoTemp.St3;
            dto.st4 = dtoTemp.St4;
            dto.st5 = dtoTemp.St5;
            dto.st6 = dtoTemp.St6;
            dto.st7 = dtoTemp.St7;
            dto.st8 = dtoTemp.St8;
            dto.por_zast = that.TabulkaZastupu.length + 1; // zjištění nového pořadí
            dto.mod = "novy" // označení že jde o editaci
            dto.aktivita = 100;
            dto.ixs_esu = that.model.IxsEsu;
            that.vyvolatDetailZastupneOsobyKarticky(dto);

        },
        editujZastupnouosobuKarticky: function (prichozidto) { // vytvolá dialog nové zástupné osoby
            var that = this;
            this.log.trace("editujZastupnouosobuKarticky");
            var dto = {};
            dto = prichozidto;

            dto.mod = "edit" // označení že jde o editaci

            var retDto = that.vyvolatDetailZastupneOsobyKarticky(dto);
            if (retDto) {
                //TODO
                //console.log(retDto)
            }
        },
        vyvolatDetailZastupneOsobyKarticky: function (dtoZastupna) { // mod značí zda jde o novou osobu nebo editaci
            var that = this;
            this.log.trace("vyvolatDetailZastupneOsobyKarticky");
            var simpleForm;
            var AktualizujRadekObalkyVzastupneOsobe = function () {
                if (simpleForm !== undefined) {
                    var retezec = "";
                    var tit_pred = simpleForm.findFields("tit_pred").gfield("getValue") || "";
                    var jmeno = simpleForm.findFields("jmeno").gfield("getValue") || "";
                    var prijmeni = simpleForm.findFields("prijmeni").gfield("getValue") || "";
                    var tit_za = simpleForm.findFields("tit_za").gfield("getValue") || "";
                    var funkce = simpleForm.findFields("funkce").gfield("getValue") || "";

                    if (tit_pred) { retezec = retezec + tit_pred }
                    if (jmeno) { retezec = retezec + " " + jmeno }
                    if (prijmeni) { retezec = retezec + " " + prijmeni }
                    if (tit_za) { retezec = retezec + " " + tit_za }
                    if (funkce) { retezec = retezec + ", " + funkce }

                    simpleForm.findFields("st2").gfield("setValue", retezec.trim());
                }
            };

            var DetailzastupneOsoby = new Gordic.Forms
                .Form({ name: "FormDetailzastupu", layoutDescriptor: "L2M2S1, L-4-8-0, M-12-12-0, S-12-12-0" })
                .addSection("jres:31900391") //RC 31900391 : Zástupná Osoba
                //.addRow("Pořadí").addField("gnumberbox", { name: "por_zast", disabled: true, })
                .addRow("jres:26265162").addField("gnumberbox", { name: "por_zast", disabled: true, }) //RC 26265162 : Pořadí
                .addRow("jres:31900388").addField("gstringbox", { //RC 31900388 : Titul Před
                    name: "tit_pred", disabled: that.ReadOnlyModeZo,
                    validators: [new Gordic.Validators.Length({ max: 35, message: "jres:31900390" })], //RC 31900390 : Pole je moc dlouhé
                    change: function (ev, changeObj) { AktualizujRadekObalkyVzastupneOsobe(); }
                })

                .addRow("jres:26265153").addField("gstringbox", { //RC 26265153 : Jméno
                    name: "jmeno", disabled: that.ReadOnlyModeZo,
                    validators: [new Gordic.Validators.Length({ max: 24, message: "jres:31900390" })],
                    change: function (ev, changeObj) { AktualizujRadekObalkyVzastupneOsobe(); }
                })
                .addRow("jres:26265152").addField("gstringbox", { //RC 26265152 : Příjmení
                    name: "prijmeni", disabled: that.ReadOnlyModeZo,
                    validators: [new Gordic.Validators.Length({ max: 36, message: "jres:31900390" })],
                    change: function (ev, changeObj) { AktualizujRadekObalkyVzastupneOsobe(); }
                })
                .addRow("jres:31900389").addField("gstringbox", { //RC 31900389 : Titul Za
                    name: "tit_za", disabled: that.ReadOnlyModeZo,
                    validators: [new Gordic.Validators.Length({ max: 35, message: "jres:31900390" })],
                    change: function (ev, changeObj) { AktualizujRadekObalkyVzastupneOsobe(); }
                })
                .addRow("jres:26265165").addField("gstringbox", { //RC 26265165 : Funkce
                    name: "funkce", disabled: that.ReadOnlyModeZo,
                    validators: [new Gordic.Validators.Length({ max: 50, message: "jres:31900390" })],
                    change: function (ev, changeObj) { AktualizujRadekObalkyVzastupneOsobe(); }
                })
                .addRow().addField("gcheck", {
                    name: "aktivita", initialValue: true, label: "jres:26265299", align: "oposite", disabled: that.ReadOnlyModeZo, //RC 26265299 : Aktivní
                    model: function (operation, dto, modelOptions) {
                        switch (operation) {
                            case "apply": $(this).gfield("setValue", dto.aktivita === 100); return; // naplneni gcheck z DTO
                            case "collect": dto.aktivita = $(this).gfield("getValue") === true ? 100 : 500; return; // naplneni DTO hodnotou z gcheck
                            default: return "aktivita"; // model="checkValue" pro operace kterym nerozumime (validations, validators, ...)
                        }
                    }
                })
                .addSection("jres:31900392") //RC 31900392 : Kontakty
                .addRow("jres:31900393").addField("gstringbox", { name: "utvar", disabled: that.ReadOnlyModeZo, validators: [new Gordic.Validators.Length({ max: 100, message: "jres:31900390" })] }) //RC 31900390 : Hodnota v poli je moc dlouhá
                .addRow("jres:26265166").addField("gstringbox", { name: "tel", disabled: that.ReadOnlyModeZo, validators: [new Gordic.Validators.Length({ max: 33, message: "jres:31900390" })] }) //RC 26265166 : Tel.
                .addRow("jres:26265155").addField("gstringbox", { name: "mail", disabled: that.ReadOnlyModeZo, validators: [new Gordic.Validators.Length({ max: 254, message: "jres:31900390" })] }) //RC 26265155 : Mail
                .addRow("jres:26265167").addField("gstringbox", { name: "fax", disabled: that.ReadOnlyModeZo, validators: [new Gordic.Validators.Length({ max: 33, message: "jres:31900390" })] }) //RC 26265167 : Fax
                .addRow("jres:26265161").addField("gstringbox", { name: "zmenu_prov_txt", disabled: true }) //RC 26265161 : Změnu provedl
                .addRow("jres:31900394").addField("gstringbox", { name: "zmenu_prov_pristup_txt", disabled: true }) //RC 31900394 : Přístup
                .addRow("jres:31900395").addField("gstringbox", { name: "id_vnitr_adr", disabled: that.ReadOnlyModeZo, validators: [new Gordic.Validators.Length({ max: 100, message: "jres:31900390" })] }) //RC 31900395 : ID vnitřní adresy

                .addSection("Obálková adresa")
                .addRow("jres:31900384" + " 1").addField("gstringbox", { name: "st0", disabled: that.ReadOnlyModeZo, validators: [new Gordic.Validators.Length({ max: 50, message: "jres:31900390" })] }) //RC 31900384 : Řádek
                .addRow("jres:31900384" + " 2").addField("gstringbox", { name: "st1", disabled: that.ReadOnlyModeZo, validators: [new Gordic.Validators.Length({ max: 50, message: "jres:31900390" })] })
                .addRow("jres:31900384" + " 3").addField("gstringbox", { name: "st2", disabled: that.ReadOnlyModeZo, validators: [new Gordic.Validators.Length({ max: 50, message: "jres:31900390" })] })
                .addRow("jres:31900384" + " 4").addField("gstringbox", { name: "st3", disabled: that.ReadOnlyModeZo, validators: [new Gordic.Validators.Length({ max: 50, message: "jres:31900390" })] })
                .addRow("jres:31900384" + " 5").addField("gstringbox", { name: "st4", disabled: that.ReadOnlyModeZo, validators: [new Gordic.Validators.Length({ max: 50, message: "jres:31900390" })] })
                .addRow("jres:31900384" + " 6").addField("gstringbox", { name: "st5", disabled: that.ReadOnlyModeZo, validators: [new Gordic.Validators.Length({ max: 50, message: "jres:31900390" })] })
                .addRow("jres:31900384" + " 7").addField("gstringbox", { name: "st6", disabled: that.ReadOnlyModeZo, validators: [new Gordic.Validators.Length({ max: 50, message: "jres:31900390" })] })
                .addRow("jres:31900384" + " 8").addField("gstringbox", { name: "st7", disabled: that.ReadOnlyModeZo, validators: [new Gordic.Validators.Length({ max: 50, message: "jres:31900390" })] })
                ;



            var tlacitkaDoComandBaru = []
            if (!that.ReadOnlyModeZo) { // přidám ukládací tlačítka
                tlacitkaDoComandBaru.push({
                    customClass: "g-button--primary",
                    action: new GAction({
                        name: "actOk", caption: "jres:26265119", //RC 26265119 : Uložit
                        enabled: !that.ReadOnlyModeZo,
                        run: function (ev) {
                            var dlg = simpleForm;
                            //console.log("dlg: ", dlg);
                            if (dlg.gform("isValid", true)) { //&& dlg.gform("hasChanged", true)
                                var data = dtoZastupna || {};
                                dlg.findFields().gfield("model", "collect", data);
                                if (data.st0 === null) data.st0 = "";
                                if (data.st1 === null) data.st1 = "";
                                if (data.st2 === null) data.st2 = "";
                                if (data.st3 === null) data.st3 = "";
                                if (data.st4 === null) data.st4 = "";
                                if (data.st5 === null) data.st5 = "";
                                if (data.st6 === null) data.st6 = "";
                                if (data.st7 === null) data.st7 = "";
                                dlg.gcontent().close(data);
                            }
                        }
                    })
                });
            }
            tlacitkaDoComandBaru.push({
                customClass: (that.ReadOnlyModeZo ? "g-button--primary" : ""),
                action: new GAction({
                    name: "actZrušit", caption: "jres:26265415", run: function (ev) {  //RC 26265415 : Zavřít
                        var dlg = simpleForm;
                        dlg.gcontent().close();
                    }
                })
            });

            simpleForm = that.dialogs.simpleForm((dtoZastupna.mod === "edit" ?
                "jres:26265052"   //RC 26265052 : Detail zástupné osoby
                : "jres:31900396"), DetailzastupneOsoby, dtoZastupna, {  //RC 31900396 : Nová zástupná osoba
                width: 950, height: 700,
                commandBar: tlacitkaDoComandBaru

            }).on("close", function (ev, retVal) {

                if (retVal) {

                    return that.ulozZastupnouOsobuKarticky(retVal);
                } else {
                    return false;
                }
            });
        },

        ulozZastupnouOsobuKarticky: function (dto) {
            var that = this;
            this.log.trace("ulozZastupnouOsobuKarticky");
            this.call("UlozZastupneOsoby", { dto: dto })
                .done(function (retVal) { //
                    //console.log("Proběhlo Uložení zástupné osoby", retVal);
                    that.nactiNoveDataZastupnychOsobKarticky(); // zobrazí ty se zvolenou aktivitou 
                    that.showFlash("jres:31900353", "g-state-success");
                })
                .fail(function (xhr, type, vobj) {
                });
        },

        nactiNoveDataZastupnychOsobKarticky: function () {
            var that = this;
            this.log.trace("nactiNoveDataZastupnychOsobKarticky");
            that.call("NactiZastupyDoJS", { ixs_Esu_JS: that.model.IxsEsu })       //LK20170110_4, nacteni obsahu zalozky az na udalost otevreni
                .done(function (dto) {
                    that.TabulkaZastupu = dto;
                    //console.log("TabulkaZastupných Osob", that.TabulkaZastupu);
                    that.VyfiltrujANastavZastupneOsoby();
                })
                .always(function () {
                    that.zastupyKarticky.gtab("loadComplete");
                    if (that.EditaceNeboZalozeniZastupneOsobyDto && that.jizPracovanoSeZastupnouOsobouPoOtevreniDetailu == null && that.typZobrazeni.Editace) {
                        that.jizPracovanoSeZastupnouOsobouPoOtevreniDetailu = true;
                        that.findForms("HlavniForm,KartickyForm").gform("waitForValues")
                            .done(function () {
                                that.pracujSeZastupyHnedPoOtevreniDetailu(that.EditaceNeboZalozeniZastupneOsobyDto);
                            });

                    }
                });
        },

        OtevritBankovniUcty: function () {
            var that = this;
            this.log.trace("OtevritBankovniUcty");
            var opt = {
                IxsEsu: that.model.IxsEsu,
                Ucel: 1,
                Logovani: this.Logovani
            };
            Gordic.Esu.Dialogs.BankovniUctyDlg(this, opt).on("closed", function (ev, retVal) { // 0- detail 1 - editace 2 -prevzit
                if (retVal && retVal.pocetUctu != null) {
                    that.updateovatPocetUctu(retVal.pocetUctu);
                    //retVal.bankovniUcet;
                }
            });
        },

        updateovatPocetUctu: function (pocetUctu) {
            this.log.trace("updateovatPocetUctu");
            if (this.pocetUctu !== pocetUctu) {
                this.pocetUctu = pocetUctu;
                this.vybudovaniMenu();
            }
            //this.uctyBadgeOpts.update({ value: "pocetUctu", tooltip: "něco" }); //js-badgeBankovniUcty
        },

        //#endregion

        //#region Ikonky podle stupnu verifikace

        pokusOUpdateIszrIcon: function (StupenVerifikaceValue) {
            var that = this;
            this.log.trace("pokusOUpdateIszrIcon");
            if (StupenVerifikaceValue == null) {
                StupenVerifikaceValue = that.findFields("StupenVerifikace").gfield("getValue");
            }
            if (StupenVerifikaceValue && StupenVerifikaceValue.stupen_ver) {
                that.UpdateIszrIcon(StupenVerifikaceValue.stupen_ver);
                that.UpdateSzrRuianInfo(StupenVerifikaceValue.stupen_ver);
            }

        },


        // vrátí ikonku dle stupně verifikace ESU ( šedá pro ověřeno administrátorem a pak tři barvy dle SZR registrů)
        UpdateIszrIcon: function (stupenVer) {
            var that = this;
            this.log.trace("UpdateIszrIcon");
            var gFieldTypEsuVal = that.findFields("TypEsu").gfield("getValue");
            var ico = that.findFields("Ico").gfield("getValue");
            var ikonkaOvereni = "";

            if (stupenVer && stupenVer === 20) { // overeno správcem
                ikonkaOvereni = that.GetIcoDleStupenVer(stupenVer);
                var fieldyTextOverenoSpravcem = undefined;
                that.DoplnFajfkyaOvereni(fieldyTextOverenoSpravcem, "OverenoSpravcem", ikonkaOvereni);
            }

            if (stupenVer && stupenVer === 55)     // ROB
            {
                ikonkaOvereni = that.GetIcoDleStupenVer(stupenVer);
                var fieldyTextROB = "IdDs, Jmeno, Prijmeni, MistoNar, DatNar, DatUmrti, Stat, StatSp, Ulice, Obec, CisloOrientacni, CisloPopisne, CastObce, Psc, StupenVerifikace";
                //var fieldyDodatecneROB = "TypEsu, TypOrganizace, IdGex, ISZRtxt, Pohlavi, RodPrijmeni, MistoNar, PrizUmrti, Bio, UrPri"// TODO mozna smazat
                that.DoplnFajfkyaOvereni(fieldyTextROB, "ROB", ikonkaOvereni); // zavolám přidání ikonek
                //that.findFields(fieldyDodatecneROB).gfield("option", "disabled", true);
            }
            if (stupenVer && stupenVer === 65)     // ROS
            {
                //Color m_NormalColor = GCommon.GetIcoDleStupenVer(GInt16.Parse(0));
                //UpdateControlColorIszr(m_oTbJmeno, m_NormalColor);
                //UpdateControlColorIszr(m_oTbPrijmeni, m_NormalColor);

                ikonkaOvereni = that.GetIcoDleStupenVer(stupenVer);
                var fieldyText = "IdDs, Jmeno, Prijmeni, Ico,ObchodniJmeno, DatUmrti, Stat, StatSp, Ulice, Obec, CisloOrientacni, CisloPopisne, CastObce, Psc, StupenVerifikace, Prezdivka"
                var fieldyDodatecne = "TypEsu, TypOrganizace, DatNar, IdGex, ISZRtxt, Pohlavi, RodPrijmeni, MistoNar, PrizUmrti, Bio, UrPri"
                that.DoplnFajfkyaOvereni(fieldyText, "ROS", ikonkaOvereni); // zavolám přidání ikonek
                //that.findFields(fieldyDodatecne).gfield("option", "disabled", true);

                //UpdateControlColorIszr(m_oTbPrezdivky, m_IszrColor);    // provozovny

                if (gFieldTypEsuVal && gFieldTypEsuVal.typ_esu == 10)   // PO - typ organizace/právní forma
                {
                    if (ico) {
                        var gFieldTypOrgVal = that.findFields("TypOrganizace").gfield("getValue");
                        if (that.GEsuParamsDto.gin_iszr_esuprf != 0) {
                            that.call("OvereniPodleStupnuVerifikace", { TypEsu: gFieldTypEsuVal.typ_esu, Ico: ico, TypOrg: gFieldTypOrgVal && gFieldTypOrgVal.typ_org ? gFieldTypOrgVal.typ_org : null }, null, { progressState: false }) // nevyvolá se preloader  
                                .done(function (retVal) {
                                    if (retVal) {
                                        ikonkaOvereni = that.GetIcoDleStupenVer(65);
                                        var fieldyText = "TypOrganizace"
                                        that.DoplnFajfkyaOvereni(fieldyText, "ROS", ikonkaOvereni); // zavolám přidání ikonek
                                    }
                                })
                                .fail(function (xhr, type, vobj) {
                                });
                        }
                    }
                }
                if (gFieldTypEsuVal && gFieldTypEsuVal.typ_esu == 30) {
                    if (ico) {
                        var Jmeno = that.findFields("Jmeno").gfield("getValue");
                        var Prijmeni = that.findFields("Prijmeni").gfield("getValue");
                        if (Jmeno && Prijmeni) {
                            that.call("OvereniPodleStupnuVerifikace", { TypEsu: gFieldTypEsuVal.typ_esu, Ico: ico, Jmeno: Jmeno, Prijmeni: Prijmeni }, null, { progressState: false }) // nevyvolá se preloader   
                                .done(function (retVal) {
                                    if (retVal) {
                                        ikonkaOvereni = that.GetIcoDleStupenVer(55);
                                        var fieldyText = "Jmeno, Prijmeni"
                                        that.DoplnFajfkyaOvereni(fieldyText, "ROB", ikonkaOvereni); // zavolám přidání ikonek

                                    }
                                }).fail(function (xhr, type, vobj) {
                                });
                        }
                    }

                }
            }
            this.nastaveniPodleUceluOtevreni(stupenVer);
        },

        // vrátí ikonku dle stupně verifikace ESU ( šedá pro ověřeno administrátorem a pak tři barvy dle SZR registrů)
        GetIcoDleStupenVer: function (stupenVer) {
            this.log.trace("GetIcoDleStupenVer");
            var iconkaOvereni = ""

            if (stupenVer == 20)    // ALF 20.8.2015 ověřeno administrátorem/správcem
            {
                iconkaOvereni = "jres:31900397"; //Color.FromArgb(223, 223, 223); //RC 31900397 : Ověřeno správcem
            }
            // ověření v RUIAN
            if (stupenVer == 35 || stupenVer == 30)    // je ověřeno RUIAN
            {
                iconkaOvereni = "jres:31900398";//Color.FromArgb(233, 226, 239); //RC 31900398 : Ověřeno podle RUIAN
            }
            // ověření v SZR - nejpodstatnější informace
            if (stupenVer == 55)    // je ověřeno ROB
            {
                iconkaOvereni = "jres:31900399";       //ColorIszrROB; //  ALF 20.7.2016  (252, 210, 188) ROB //RC 31900399 : Ověřeno podle ROB
            }
            if (stupenVer == 65)    // je ověřeno ROS
            {
                iconkaOvereni = "jres:31900400";//"gi-rob g-state-text g-state-success"        // Color.FromArgb(253, 248, 215);  // ALF 20.7.2016 (252, 242, 186) ROS     //  //RC 31900400 : Ověřeno podle ROS
            }
            return iconkaOvereni;
        },

        DoplnFajfkyaOvereni: function (fieldy, nazevIkonky, iconkaOvereni) {
            var that = this;
            this.log.trace("DoplnFajfkyaOvereni");
            //
            //sel.gfield("option", "disabled", true);
            this.nastaveniPodleUceluOtevreni();
            that.actions["actStat" + nazevIkonky].update({ enabled: true, tooltip: iconkaOvereni });
            if (fieldy) {
                var sel = that.element.findFields(fieldy);
                //sel.gfield("addState", { id: "icook", icon: "gi-tick", customClass: "g-state-success", tooltip: "Ověřeno v SZR." });
                sel.each(function (index, fieldik) {
                    var icoToolTip = $(fieldik).gfield("getState", "icook").eq(0).gtooltip("option", "tooltip");
                    if (typeof icoToolTip !== "string" || icoToolTip.indexOf(iconkaOvereni) === -1) {  // pokud ještě není v tooltipu
                        if (icoToolTip.length > 0) {
                            $(fieldik).gfield("getState", "icook").gtooltip("option", "tooltip", icoToolTip + "<br>✓ " + iconkaOvereni);
                        }
                        else {
                            $(fieldik).gfield("addState", { id: "icook", icon: "gi-tick", customClass: "g-state-success", tooltip: "✓ " + iconkaOvereni });
                        }
                    }
                });
            }
        },

        OdstranFajfkyaOvereni: function (fieldy, nazevIkonky, iconkaOvereni) {
            var that = this;
            this.log.trace("OdstranFajfkyaOvereni");
            var sel = that.element.findFields(fieldy);

            //sel.gfield("option", "disabled", false);
            this.nastaveniPodleUceluOtevreni();
            that.actions["actStat" + nazevIkonky].update({ enabled: false, tooltip: "RUIAN" });


            sel.each(function (index, fieldik) {
                var icoToolTip = $(fieldik).gfield("getState", "icook").eq(0).gtooltip("option", "tooltip");
                if (typeof icoToolTip === "string" && icoToolTip.indexOf(iconkaOvereni) >= 0) {
                    icoToolTip = icoToolTip.replace("<br>✓ " + iconkaOvereni, ""); // v případě kdy leží na jiném než prvním řádku
                    icoToolTip = icoToolTip.replace("✓ " + iconkaOvereni, ""); // v případě že leží na prvním řádku
                    if (icoToolTip.length > 0) {

                        $(fieldik).gfield("getState", "icook").gtooltip("option", "tooltip", icoToolTip);
                    } else {
                        $(fieldik).gfield("getState", "icook").remove();
                    }
                }
            });
        },

        UpdateSzrRuianInfo: function (StupenVer) {
            var that = this;
            this.log.trace("UpdateSzrRuianInfo");
            //name: "StupenVerifikace", model: "model.StupenVerifikace=value.stupen_ver",
            that.findForms("HlavniForm").findFields().gfield("resetErrors", "OvereniRuian").gfield("resetErrors", "NeniKodUirAdr");
            if (StupenVer &&
                (StupenVer == 55 || StupenVer == 65 || StupenVer == 35)) {
                if (that.model.KodUirAdr && that.model.KodUirAdr !== 0) {
                    that.findForms("HlavniForm").gform("waitForValues")
                        .done(function () {
                            var fieldy = that.findFields("Ulice, Obec, CisloOrientacni, CisloPopisne, CastObce, Psc");
                            var modelikSAdresou = {};
                            fieldy.gfield("model", "collect", modelikSAdresou);
                            modelikSAdresou.StupenVerifikace = StupenVer;
                            modelikSAdresou.KodUirAdr = that.model.KodUirAdr;
                            that.call("OvereniRUIANStatus", { AdresaDto: modelikSAdresou }, null, { progressState: false }) // nevyvolá se preloader
                                .done(function (retVal) {
                                    if (retVal) {
                                        if (retVal.ObecRuian) that.findFields("Obec").gfield("setError", { stopping: false, group: "OvereniRuian", errorType: "warning", message: "jres:31900070", showOnDisabled: true }); //RC 31900070 : Obec se liší od aktuální hodnoty v SZR RUIAN.
                                        if (retVal.CastObceRuian) that.findFields("CastObce").gfield("setError", { stopping: false, group: "OvereniRuian", errorType: "warning", message: "jres:31900071", showOnDisabled: true }); //RC 31900071 : Část obce se liší od aktuální hodnoty v SZR RUIAN.
                                        if (retVal.UliceRuian) that.findFields("Ulice").gfield("setError", { stopping: false, group: "OvereniRuian", errorType: "warning", message: "jres:31900072", showOnDisabled: true }); //RC 31900072 : Ulice se liší od aktuální hodnoty v SZR RUIAN.
                                        if (retVal.PscRuian) that.findFields("Psc").gfield("setError", { stopping: false, group: "OvereniRuian", errorType: "warning", message: "jres:31900073", showOnDisabled: true }); //RC 31900073 : PSČ se liší od aktuální hodnoty v SZR RUIAN.
                                        if (retVal.CpopRuian) that.findFields("CisloPopisne").gfield("setError", { stopping: false, group: "OvereniRuian", errorType: "warning", message: "jres:31900074", showOnDisabled: true }); //RC 31900074 : Číslo popisné se liší od aktuální hodnoty v SZR RUIAN.
                                        if (retVal.CorRuian) that.findFields("CisloOrientacni").gfield("setError", { stopping: false, group: "OvereniRuian", errorType: "warning", message: "jres:31900075", showOnDisabled: true }); //RC 31900075 : Číslo orientační se liší od aktuální hodnoty v SZR RUIAN.
                                        if (retVal.AdresaRuian) {
                                            that.findFields("Ulice, Obec, CisloOrientacni, CisloPopisne, CastObce, Psc").gfield("setError", { stopping: false, group: "OvereniRuian", errorType: "warning", message: "jres:31900076", showOnDisabled: true }); // velka Hlaska //RC 31900076 : V RUIAN bylo toto adresní místo zrušeno. Prověřte nové ověření.
                                            that.showFlash({ label: "jres:31900076", customClass: "g-state-warning", });
                                        }
                                        var fieldyText = "Obec, CastObce, Ulice, Psc, CisloPopisne, CisloOrientacni";
                                        var ikonkaOvereni = that.GetIcoDleStupenVer(35);

                                        that.DoplnFajfkyaOvereni(fieldyText, "RUIAN", ikonkaOvereni); // zavolám přidání ikonek
                                    }
                                })
                                .always(function () {

                                });
                        });
                }
                else {
                    if (StupenVer != null && (StupenVer == 55 || StupenVer == 65))  // ALF 20.10.2020 ref T7382
                    {
                        //imgAdresaRuian.Visible = true;
                        var textDoTooltipuNeniKodUirAdr = "jres:31900874"; //RC 31900874 : Subjekt je ověřen v SZR ale adresa není v SZR vedena odkazem do RUIAN, byla editorem zadána pouze textově.
                        var field = this.findFields("Stat");
                        //field.gfield("addState", { id: "neniKodUirAdr", icon: "fa-exclamation-triangle", customClass: "g-state-warning", tooltip: textDoTooltipuNeniKodUirAdr });
                        field.gfield("setError", { stopping: false, group: "NeniKodUirAdr", errorType: "warning", message: textDoTooltipuNeniKodUirAdr, showOnDisabled: true });
                    }
                }
            }
        },

        odstranSZRRuianInfo: function () {
            var that = this;
            this.log.trace("odstranSZRRuianInfo");
            this.findForms("HlavniForm").findFields().gfield("resetErrors", "OvereniRuian");

            var fieldyText = "Ulice, Obec, CisloOrientacni, CisloPopisne, CastObce, Psc";
            var ikonkaOvereni = that.GetIcoDleStupenVer(35);
            that.OdstranFajfkyaOvereni(fieldyText, "RUIAN", ikonkaOvereni);

        },
        //#endregion

        //#region Oveření ISZR
        overitROB: function () {
            var that = this;
            this.log.trace("overitROB");
            that.UpdateObalkovaAdresa();
        },


        overitISZR: function (typ) {
            /// <summary>
            /// ukazka vizualizace ověření ve formuláři 
            /// </summary>
            /// <param name="typ" type="type"></param>
            this.log.trace("overitISZR");
            var that = this;
            //console.log("overovani ISZR");
            var esuDto = jQuery.extend(true, {}, this.model);
            this.findFields().gfield("model", "collect", esuDto);

            var VyberZIszrItemsDto = {};
            VyberZIszrItemsDto.Ixp = this.serverParams.Logovani.Ixp;
            VyberZIszrItemsDto.AktZnacka = this.serverParams.Logovani.AktZnacka;

            // pro FO
            var editmode = !this.typZobrazeni.Detail // pokud
            var opt = null;
            if (esuDto.TypEsu === 20) {
                opt = {
                    EditMode: editmode,
                    esuDto: esuDto,
                    VyberZRobItemsDto: VyberZIszrItemsDto
                };
                Gordic.Esu.Dialogs.VyberZRobDlg(this, opt).on("closed", function (ev, retVal) {
                    if (retVal) {
                        that.setujHodnotyPrevzaneZROB(retVal);
                    }
                });
            }
            else // pro PO, OSVČ
            {
                opt = {
                    EditMode: editmode,
                    esuDto: esuDto,
                    VyberZRosItemsDto: VyberZIszrItemsDto
                };
                Gordic.Esu.Dialogs.VyberZRosDlg(this, opt).on("closed", function (ev, retVal) {
                    if (retVal) {
                        that.setujHodnotyPrevzaneZROS(retVal);
                    }
                });
            }
        }, // ukázková verze TO DO

        setujHodnotyPrevzaneZROB: function (values) {
            //var fieldyTextROB = "IdDs, Jmeno, Prijmeni, MistoNar, DatNar, DatUmrti, Stat, StatSp, Ulice, Obec, CisloOrientacni, CisloPopisne, CastObce, Psc, StupenVerifikace"
            this.log.trace("setujHodnotyPrevzaneZROB");
            if (values != null) {

                var l_nOverenoSynchronne = 1;
                var l_nOverenoVyzvednutimZFronty = 2;
                var l_nOverenoZadanAsynchronniPozadavek = 3;
                var l_nVysledekOvereni = values.VysledekOvereni;
                var OdstraneniVazbyNaSzrRob = 5;

                if (l_nVysledekOvereni == l_nOverenoSynchronne || l_nVysledekOvereni == l_nOverenoVyzvednutimZFronty) {
                    this.findFields("StupenVerifikace").gfield("setValueFromKeys", "55");

                    //if (esud.GinIszrEsvynuPar == 1) {
                    //    this.actions.actCancel.enabled(false);
                    //}

                    values.PrizUmrti = values.DatUmrti ? 1 : 0;
                    if (values.IdDs) { // pokud přebírám datovku nastavím rovnou že je již ověřená
                        this.IdDsOverene = values.IdDs;
                    }

                    this.findFields("Jmeno, Prijmeni, DatNar, IdDs, MistoNar, DatUmrti, PrizUmrti").gfield("clear", { BezObalky: true }).gfield("model", "apply", values, { setFlags: { BezObalky: true } });

                    if (values.StatSpISZR) {
                        this.findFields("StatSp").gfield("setValueFromKeys", values.StatSpISZR.stat);

                    }
                    if (this.GEsuParamsDto.gin_esu_zatypad) {
                        if (values.PrevzitDorucAdresuCheckbox) { // prebirani doruc. adresy
                            this.findFields("TypAdr").gfield("setValueFromKeys", 10);
                        } else {
                            this.findFields("TypAdr").gfield("setValueFromKeys", 0);
                        }
                    }
                    var l_oKodUirAdr = values.AdrKod;
                    //if (l_oKodUirAdr === "" || l_oKodUirAdr === "0") {
                    var l_sUlice = null;
                    if (l_oKodUirAdr == null || l_oKodUirAdr == 0) {
                        l_sUlice = values.Adresa; //AdresaTxt

                        this.PreberAdresuZSzr(l_oKodUirAdr, "", "", l_sUlice, "", "", "")
                    } else {
                        var l_sObec = values.GObec; // Obec
                        l_sUlice = values.GUlice; // Ulice
                        var l_sCastObce = values.GCastObce; // CastObce
                        var l_sPsc = values.PostaKod; // Psc
                        var l_sCisOr = values.GCisOrientacni;
                        if (values.GCisOrientacni && values.GCisOrientacniPismeno) {
                            l_sCisOr = values.GCisOrientacni + values.GCisOrientacniPismeno;
                        }


                        var l_sCisloPopisne = values.GCisPopisne; // CisPopisne

                        this.PreberAdresuZSzr(l_oKodUirAdr, l_sObec, l_sCastObce, l_sUlice, l_sCisOr, l_sCisloPopisne, l_sPsc);
                    }
                    this.model.Aifo = values.AifoText;

                    this.model.FrontaIszrZadostId = values.IszrZadostId;
                    this.model.IszrZadostId = values.IszrZadostId;
                    this.model.AgendaZadostId = values.AgendaZadostId;
                    this.model.RegOdpovedId = values.RegOdpovedId;


                    //if (!esud.IsTC) { // pokud se nejedna o technologicke centrum, tak nastavim uroven pristupu
                    this.NastavUrPriDleDefaulAgendySzr();
                    //}

                    //this.UpdateTbIszr();
                    this.ObcerstviIszr(values.CasOdpovedi, 55);
                    this.UpdateIszrIcon(55);
                    this.UpdateSzrRuianInfo(55);
                }

                //if (l_nVysledekOvereni == l_nOverenoZadanAsynchronniPozadavek) {
                //    this.NastavStupenVerifikace("-55");

                //    esudItems.IszrZadostId = values.values[1];

                //    this.NastavUrPriDleDefaulAgendySzr();
                //    this.UpdateTbIszr();
                //    this.ObcerstviIszr("");
                //}
                if (l_nVysledekOvereni == OdstraneniVazbyNaSzrRob) {

                    this.zneaktivniAifo();

                    var stupenVerNovy = 10;
                    if (this.gin_esu_povoadm !== 0)
                        stupenVerNovy = 20;
                    this.findFields("StupenVerifikace").gfield("setValueFromKeys", stupenVerNovy);
                    this.model.Aifo = null;

                    this.model.FrontaIszrZadostId = null;

                    this.findFields("ISZRtxt").gfield("setValue", null);


                    this.NastavUrPriDlePovoleniEditace();


                    //UpdateReadOnly();   // barvy a povolení editace stupně verifikace
                    //SetDataChanged();
                }
                if (values.JeDorucovaciVSZR && this.PrizIszr && (this.typZobrazeni.Editace && !this.model.ExistujeDorucovaci)) {
                    this.dialogs.messageBox("jres:31900975", //RC 31900975 : Pozor
                        "jres:31900974"); //RC 31900974 : V SZR existuje doručovací adresa, ale zatím není pořízena v ESU. Doporučujeme provést následující úkony: 1) uložit ESU tlačítkem Uložit, 2) vytvořit novou adresu tlačítkem "Nová adresa/pobočka", 3) ověřit nově vytvořenou adresu v SZR  - tlačítkem ověřit v SZR.Poté převzít data doručovací adresy a ESU uložit. K odeslání zásilek subjektu se obvykle preferuje doručovací adresa.

                }

                this.cekejAPakObnov();
            }

        },

        setujHodnotyPrevzaneZROS: function (values) {
            var that = this;
            this.log.trace("setujHodnotyPrevzaneZROS");
            //var fieldyText = "IdDs, Ico,ObchodniJmeno, DatUmrti, Stat, StatSp, Ulice, Obec, CisloOrientacni, CisloPopisne, CastObce, Psc, StupenVerifikace"
            //var fieldyDodatecne = "TypEsu, TypOrganizace, DatNar, IdGex, ISZRtxt, Pohlavi, RodPrijmeni, MistoNar, PrizUmrti, Bio, UrPri"
            if (values) {
                this.ProgramovaZmenaUrPriStupenVer = true;
                var TypEsu = null;
                var l_nOverenoSynchronne = 1;
                var l_nOverenoVyzvednutimZFronty = 2;
                var l_nOverenoZadanAsynchronniPozadavek = 3;
                var OdstraneniVazbyNaSzrRob = 5;
                var l_nVysledekOvereni = values.VysledekOvereni;

                if (l_nVysledekOvereni == l_nOverenoSynchronne || l_nVysledekOvereni == l_nOverenoVyzvednutimZFronty) {
                    this.findFields("StupenVerifikace").gfield("setValueFromKeys", "65");

                    if (values.PrepnoutTypEsuNaOsvc)       // ALF 1.4.2016 - poku je OSVČ a uživatel ověřil v ROB
                    {
                        TypEsu = 30;
                        this.findFields("TypEsu").gfield("setValue", { typ_esu: 30 }, { valid: false, BezObalky: true });

                    } else if (values.TypOrg && values.TypOrg !== 0 && that.GEsuParamsDto.gin_iszr_esuprf !== 0) // ALF 16.11.2016 nová obsluha pro MO
                    {
                        TypEsu = 30;
                        var TypEsuField = this.findFields("TypEsu");
                        var TypOrgani = that.findFields("TypOrganizace");
                        //field.gfield("setValue", { typ_esu: 30 }, { valid: false, BezObalky: true }); // puvodne 30 //15.8.2018 zmeneno zpátky na 30
                        TypEsuField.gfield("clear");
                        TypOrgani.gfield("clear");
                        //field.gfield("getValueAsync").done(function (value) {

                        TypOrgani.gfield("setValue", { typ_org: values.TypOrg }, { valid: false, BezObalky: true });

                        //});
                    }

                    if (values.Jmeno) {
                        this.findFields("Prijmeni").gfield("setValue", values.Prijmeni, { BezObalky: true });
                    }

                    if (values.Jmeno) {
                        this.findFields("Jmeno").gfield("setValue", values.Jmeno, { BezObalky: true });
                    }

                    this.findFields("ObchodniJmeno").gfield("setValue", values.ObchodniJmeno, { BezObalky: true });
                    var nazev = values.ObchodniJmeno.replace("\"", "").trim().slice(0, 100);
                    this.findFields("Nazev").gfield("setValue", nazev, { BezObalky: true });
                    if (values.IDDS) { // pokud přebírám datovku nastavím rovnou že je již ověřená
                        this.IdDsOverene = values.IDDS;
                    }
                    this.findFields("IdDs").gfield("setValue", values.IDDS, { BezObalky: true });
                    this.findFields("Ico").gfield("setValue", values.Ico, { BezObalky: true });

                    if (values.DatUkonceni) // ALF 24.1.2014
                    {
                        this.findFields("DatUmrti").gfield("setValue", values.DatUkonceni, { BezObalky: true });
                        this.findFields("PrizUmrti").gfield("setValue", true, { BezObalky: true });

                    }
                    else {
                        this.findFields("DatUmrti").gfield("setValue", values.DatUkonceni, { BezObalky: true });
                        this.findFields("PrizUmrti").gfield("setValue", false, { BezObalky: true });
                    }

                    var l_oKodUirAdr = values.AdrKod;
                    var l_sUlice = null;

                    if (l_oKodUirAdr == null || l_oKodUirAdr === 0) {
                        l_sUlice = values.Adresa; //AdresaTxt

                        this.PreberAdresuZSzr(l_oKodUirAdr, "", "", l_sUlice, "", "", "")
                    } else {
                        var l_sObec = values.GObec; // Obec
                        l_sUlice = values.GUlice; // Ulice
                        var l_sCastObce = values.GCastObce; // CastObce
                        var l_sPsc = values.PostaKod; // Psc
                        var l_sCisOr = values.GCisOrientacni;
                        if (values.GCisOrientacni && values.GCisOrientacniPismeno) {
                            l_sCisOr = values.GCisOrientacni + values.GCisOrientacniPismeno;
                        }

                        var l_sCisloPopisne = values.GCisPopisne; // CisPopisne

                        this.PreberAdresuZSzr(l_oKodUirAdr, l_sObec, l_sCastObce, l_sUlice, l_sCisOr, l_sCisloPopisne, l_sPsc);
                    }

                    if (this.GEsuParamsDto.gin_esu_zatypad) {
                        if (values.PrevzitProvozovnu) {
                            this.findFields("TypAdr").gfield("setValue", { typ: 10 }, { valid: false, BezObalky: true })
                            this.findFields("Prezdivka").gfield("setValue", values.Provozovna, { BezObalky: true });
                            this.findFields("Poznamka").gfield("setValue", "Provozovna: " + values.Provozovna, { BezObalky: true });
                        }
                        else {
                            this.findFields("Prezdivka").gfield("setValue", null, { BezObalky: true });
                            var pozn = this.findFields("Poznamka").gfield("getValue");
                            if (pozn && pozn.indexOf("Provozovna:") > -1) {
                                this.findFields("Poznamka").gfield("setValue", null, { BezObalky: true });
                            }
                            this.findFields("TypAdr").gfield("setValue", { typ: 0 }, { valid: false, BezObalky: true })
                        }
                    }
                    this.ukazSchovejPolePrezdivka();

                    this.findFields("RodPrijmeni").gfield("setValue", values.EditorskaOvmAAgenda, { BezObalky: true });

                    this.model.FrontaIszrZadostId = values.IszrZadostId;
                    this.model.IszrZadostId = values.IszrZadostId;
                    this.model.AgendaZadostId = values.AgendaZadostId;
                    this.model.RegOdpovedId = values.RegOdpovedId;

                    this.NastavUrPriDleSzrRos();
                    this.ObcerstviIszr(values.CasOdpovedi, 65, TypEsu);
                    this.UpdateIszrIcon(65);
                    this.UpdateSzrRuianInfo(65);

                    //if (l_oVyberZRosTab.VysledekOvereni == OvereniVSzrRob.ZadanAsynchronniPozadavek) {
                    //    m_oGinsesu.StupenVerifikace = -65;
                    //    m_oGinsesu.IszrZadostId = l_oVyberZRosTab.IszrZadostId;
                    //    m_oCbStupenVer.SetValidData(new GInt16(-65));

                    //    NastavUrPriDleSzrRos();
                    //    UpdateTbIszr(m_oGinsesu.StupenVerifikace);
                    //    SetDataChanged();
                    //    ObcerstviIszr(GDateTime.Null);
                    //}

                }
                if (l_nVysledekOvereni == OdstraneniVazbyNaSzrRob) {
                    var stupenVerNovy = 10;
                    if (this.gin_esu_povoadm !== 0)
                        stupenVerNovy = 20;
                    this.findFields("StupenVerifikace").gfield("setValueFromKeys", stupenVerNovy);
                    this.model.Aifo = null;

                    this.model.FrontaIszrZadostId = null;

                    this.findFields("ISZRtxt").gfield("setValue", null);


                    this.NastavUrPriDlePovoleniEditace();


                    //UpdateReadOnly();   // barvy a povolení editace stupně verifikace
                    //SetDataChanged();
                }

                this.cekejAPakObnov();
            }
        },

        PreberAdresuZSzr: function (adresaKod, obec, castObce, ulice, cor, cpop, psc, stat) {
            var that = this;
            this.log.trace("PreberAdresuZSzr");
            //var esud = this.contentDiv;
            //var esudItems = esud.DetailEsuItems;
            //KodUirAdr
            this.model.KodUirAdr = adresaKod;
            //Ulice, Obec, CisloOrientacni, CisloPopisne, CastObce, Psc,

            this.findFields("Obec").gfield("setValue", { obec: obec }, { BezObalky: true });

            this.findFields("Ulice").gfield("setValue", { ulice_nazev: ulice }, { BezObalky: true });

            this.findFields("CastObce").gfield("setValue", { cast_obce_nazev: castObce }, { BezObalky: true });
            if (psc != null && psc != "0") {
                var l_stat = undefined;
                if (stat != null) {
                    l_stat = stat;
                } else {
                    var statVal = this.findFields("Stat").gfield("getValue");
                    l_stat = statVal && statVal.stat ? statVal.stat : undefined;
                }

                this.findFields("Psc").gfield("setValue", { stat: l_stat, psc: psc }, { valid: false, BezObalky: true }); // //setValueFromKeys
                this.findFields("Stat").gfield("setValue", { stat: l_stat }, { valid: false, BezObalky: true }); //setValueFromKeys

            } else { // dsebesta přidáno 24.05.2023
                this.findFields("Psc").gfield("setValue", null, { valid: false, BezObalky: true });
            }

            if (cor != "0") {
                this.findFields("CisloOrientacni").gfield("setValue", cor, { BezObalky: true });
            } else {
                this.findFields("CisloOrientacni").gfield("clear", { BezObalky: true });
            }

            if (cpop != "0") {
                this.findFields("CisloPopisne").gfield("setValue", cpop, { BezObalky: true });
            } else {
                this.findFields("CisloPopisne").gfield("clear", { BezObalky: true });
            }

            // vyjímka pro 1ř tvar
            if (ulice != null && ulice != "" && (obec == null || obec == "") && (psc == null || psc == "" || psc == "0")) { //dsebesta 7.3.2022 přidáno ulice != null
                //if (ulice.indexOf("~") != -1) {
                //    var ObecComplet = null;;
                //    var l_oRadkyArray = ulice.split("~");

                //    if (l_oRadkyArray.Length > 0) {
                //        this.findFields("Ulice").gfield("setValue", { ulice_nazev: l_oRadkyArray[0] }, { BezObalky: true });
                //    }
                //    if (l_oRadkyArray.Length > 1) {
                //        ObecComplet = l_oRadkyArray[1];
                //    }
                //    else if (l_oRadkyArray.Length > 2) {
                //        ObecComplet = ObecComplet + " " + l_oRadkyArray[2];
                //    }
                //    else if (l_oRadkyArray.Length > 3) {
                //        ObecComplet = ObecComplet + " " + l_oRadkyArray[3];
                //    }
                //    this.findFields("Obec").gfield("setValue", { obec: ObecComplet }, { BezObalky: true });
                //}
                this.rozeberJednoradkovouAdresu(ulice);
            }

            //if (esud.UliceTextBox.value.length > 48) {
            //    esud.UliceTextBox.value = esud.UliceTextBox.value.substr(0, 48);
            //}

            //if (esud.AktModIntCheckbox.checked && !esud.OpravitCheckbox.checked) {
            //    this.NaplnObalkovouAdresu();
            //}
        },

        rozeberJednoradkovouAdresu: function (ulice) {
            var that = this;
            this.call("RozeberJednoradkovouAdresu", { ulice: ulice })
                .done(function (retVal) {
                    that.findFields("Obec").gfield("setValue", { obec: retVal.obec }, { BezObalky: true });
                    that.findFields("Ulice").gfield("setValue", { ulice_nazev: retVal.ulice }, { BezObalky: true });
                    that.findFields("CastObce").gfield("setValue", { cast_obce_nazev: retVal.castObce }, { BezObalky: true });
                    that.findFields("CisloOrientacni").gfield("setValue", retVal.cor, { BezObalky: true });
                    that.findFields("CisloPopisne").gfield("setValue", retVal.cpop, { BezObalky: true });
                    if (retVal.psc != null && retVal.psc != "0") {
                        var l_stat = undefined;
                        if (stat != null) {
                            l_stat = stat;
                        } else {
                            var statVal = that.findFields("Stat").gfield("getValue");
                            l_stat = statVal && statVal.stat ? statVal.stat : undefined;
                        }

                        that.findFields("Psc").gfield("setValue", { stat: l_stat, psc: retVal.psc }, { valid: false, BezObalky: true }); // //setValueFromKeys
                        that.findFields("Stat").gfield("setValue", { stat: l_stat }, { valid: false, BezObalky: true }); //setValueFromKeys

                    } else { // dsebesta přidáno 24.05.2023
                        that.findFields("Psc").gfield("setValue", null, { valid: false, BezObalky: true });
                    }
                    that.pokusOUpdateIszrIcon();


                    that.cekejAPakObnov();
                    //ret.ulice = GString.Left(uliceNova, 48);
                    //ret.cor = GString.Left(corNova, 6);
                    //ret.cpop = GString.Left(cpopNova, 8);
                    //ret.obec = GString.Left(obecNova, 48);
                    //ret.castObce = GString.Left(castObceNova, 48);
                    //ret.psc = pscNova;

                });
        },

        ObcerstviIszr: function (datumAktualnihoOvereni, stupVer, TypEsu) {
            var that = this;
            this.log.trace("ObcerstviIszr");
            var FrontaIszrZadostId =  this.model.FrontaIszrZadostId;
            
            var StupenVerifikace = stupVer;
            if (!StupenVerifikace) { 
                StupenVerifikace = this.findFields("StupenVerifikace").gfield("getValue");
                if(StupenVerifikace) {StupenVerifikace = StupenVerifikace.stupen_ver; } 
            }
            if (TypEsu == null) { 
                TypEsu = this.findFields("TypEsu").gfield("getValue");
                if(TypEsu) {TypEsu = TypEsu.typ_esu; } 
            }
            var IxsEsu = this.findFields("IxsEsu").gfield("getValue");
            if (TypEsu && IxsEsu && StupenVerifikace) {
                this.call("ObcerstviIszr", { datumNejnovejsihoOvereni: datumAktualnihoOvereni, IxsEsu: IxsEsu, TypEsu: TypEsu, FrontaIszrZadostId: FrontaIszrZadostId, StupenVerifikace : StupenVerifikace })
                  .done(function (retVal) { //
                      if (retVal) {
                          that.findFields("ISZRtxt").gfield("setValue", retVal.gDatIszr);
                          if (retVal.adresaUraduTxt) {
                              that.nastavTextAdresaUradu(retVal.adresaUraduTxt);
                          }
                      }
                  })
                  .fail(function (xhr, type, vobj) {
                      //console.log("typ exception: ", type);
                 
                  });
            }
        },

        nastavTextAdresaUradu: function (adrText) {
            this.log.trace("nastavTextAdresaUradu");
            if (adrText) {
                this.findFields("TypAdr").gfield("addState", {                                                  
                    id: "adresaInfo",     
                    //icon: "fa-open",
                    customClass: "g-state-info",
                    caption:adrText,
                    tooltip:adrText
                }); 
            }
        },

        ukazSchovejPolePrezdivka: function () {
            this.log.trace("ukazSchovejPolePrezdivka");
            var field = this.findFields("Prezdivka");
            var value = field.gfield("getValue");
            if (value) {
                field.gformrow().show();
            } else {
                field.gformrow().hide();
            }
        },

        NastavUrPriDleSzrRos:function()
        {
            this.log.trace("NastavUrPriDleSzrRos");
            var urPriRos = this.gin_iszr_urprio; 
            if(urPriRos != null){
                var novyUrPri = parseInt(urPriRos);
                if(novyUrPri !== NaN){
                    var isNotIn = $.inArray(novyUrPri, this.ListUrPri)
                    if(isNotIn === -1){
                        this.ListUrPri.push(novyUrPri);
                    }
                    this.findFields("UrPri").gfield("option", "serverFilters", { ur_pri: this.ListUrPri});
                    this.findFields("UrPri").gfield("setValue", { ur_pri: novyUrPri }, { valid: false });
             
                }
            }
        },

        NastavUrPriDleDefaulAgendySzr:function()
        {
            this.log.trace("NastavUrPriDleDefaulAgendySzr");
            if (!this.isTechnologickeCentrum) { 
                var defISZR = this.serverParams.UrPriSzrDleDefaultAgendy; 
                if(defISZR != null){
                    var isNotIn = $.inArray(defISZR, this.ListUrPri)
                    if( isNotIn === -1){
                        this.ListUrPri.push(defISZR);
                    }
                    this.findFields("UrPri").gfield("option", "serverFilters", { ur_pri: this.ListUrPri});
                    this.findFields("UrPri").gfield("setValue", { ur_pri: defISZR }, { valid: false });
                }
            }
        },

        NastavUrPriDlePovoleniEditace: function () {
            this.log.trace("NastavUrPriDlePovoleniEditace");
            var urPriEdit = this.urPriEdit;
            if (urPriEdit != null) {
                var isNotIn = $.inArray(urPriEdit, this.ListUrPri)
                if (isNotIn === -1) {
                    this.ListUrPri.push(urPriEdit);
                }
                this.findFields("UrPri").gfield("option", "serverFilters", { ur_pri: this.ListUrPri });
                this.findFields("UrPri").gfield("setValue", { ur_pri: urPriEdit }, { valid: false });
            }
        },


        //#endregion

    //#region adresy pobočky 
        novaAdresaPobocka: function () {
            /// <summary> odevře se nová pobočka</summary>
            var that = this;
            this.log.trace("novaAdresaPobocka");
            var row = that.gridAdresy.ggrid("getSelection")[0];
            if (row && row.ixs_nad) {
                var opt = {
                    IxsEsu: row.ixs_nad,
                    Ucel: 3,
                    Logovani: this.Logovani,
                    ZalozniIxsEsuProNovouPobocku: this.model.IxsEsu
                };
                Gordic.Esu.Dialogs.DetailEsuDlg(this, opt); //that.parentContent
            } else {
                this.dialogs.alert("jres:31900198"); //RC 31900198 : Nebyla vybrána adresa v seznamu.
            }
        },

        editovatAdresaPobocka: function () {
            /// <summary> nové detailové okno </summary>
            var that = this;
            this.log.trace("editovatAdresaPobocka");
            var row = that.gridAdresy.ggrid("getSelection")[0];
            
            if (row && row.ixs_esu) {
                var opt = {
                    IxsEsu: row.ixs_esu,
                    Ucel: 2,
                    Logovani: this.Logovani,
                };
                Gordic.Esu.Dialogs.DetailEsuDlg(this, opt ); //that.parentContent
            } else {
                this.dialogs.alert("jres:31900198"); //RC 31900198 : Nebyla vybrána adresa v seznamu.
            }
            
        },
        detailkAdresaPobocka: function () {
            /// <summary>
            /// nové detailové okno
            /// </summary>
            var that = this;
            this.log.trace("detailkAdresaPobocka");
            var row = that.gridAdresy.ggrid("getSelection")[0];

            if (row && row.ixs_esu) {
                var opt = {
                    IxsEsu: row.ixs_esu,
                    Ucel: 1,
                    Logovani: this.Logovani,
                    LzePrepnoutZDetailuNaEditaci:true
                };
                Gordic.Esu.Dialogs.DetailEsuDlg(this, opt);
            } else {
                this.dialogs.alert("jres:31900198"); //RC 31900198 : Nebyla vybrána adresa v seznamu.
            }
        },

        spravovatAdresy: function () {
            var that = this;
            this.log.trace("spravovatAdresy");
            var IxsDto = {
                IxsEsu: this.model.IxsEsu,
                IxsNad: this.model.IxsNad
            };

            var ucel = 0; // běžný

            var l_oJSONPars = {
                Ucel: ucel,
                IxsDto: IxsDto, // IxsDto.IxsEsu  IxsDto.IxsNad   IxsDto.IxsEko
                Logovani: this.Logovani

            };
            Gordic.Esu.Dialogs.SeznamPobocekDlg(this, l_oJSONPars).on("closed", function (ev, retVal) {
                if (retVal) {
                    //that.load();
                }
            });


        },

        //#endregion
        
    //#region ISDS

        /**
         * spustí proces ověření v ISDS
         *
         * @author  Dsebesta
         * @date    03.08.2017
         *
         * @param   flagGex zda se jedná o gex
         *
         * @return  .
         */

        overitISDS: function (flagGex) {
            var that = this;
            this.log.trace("overitISDS");
            var obj = {
                flagGex: flagGex,
                content: this,
                Ucel: this.typZobrazeni,
                PrevzitVOkne: false
            };
            obj.esuDto = this.nactiDtoBezValidace();
            this.beginOperation();
            Gordic.Esu.Utils.OverISDSzDetailuEsu(obj)
                .then(function (retVal) { //stav,zprava
                    if (retVal.prevzit) {
                        that.prevzitZiskanatData(retVal.prevzit, null, 80);
                        that.resetIsdsPole();
                    }
                    else if (retVal.zprava) {
                        var stupenVerField = that.findFields("StupenVerifikace");
                        var stupenVerValue = stupenVerField.gfield("getValue");
                        var stupenVer = (stupenVerValue && (stupenVerValue.stupen_ver != null)) ? stupenVerValue.stupen_ver : null;
                        if (retVal.stav == "nalezeno" && stupenVer != 55 && stupenVer != 65 && stupenVer != 80  ) {
                            stupenVerField.gfield("setValueFromKeys", "80");
                            that.dialogs.alert(retVal.zprava + ". Byl nastaven nový stupeň verifikace. Změnu můžete uložit.");
                            that.resetIsdsPole();
                        } else {
                            that.dialogs.alert(retVal.zprava);
                        }
                  
                    }
                })
                .always(function (msg) {
                    that.endOperation();
                });
        },

        /**
         * spracovani převzanych dat z registru
         *
         * @author  Dsebesta
         * @date    03.08.2017
         *
         * @param   KPrevzeti  data prevzena z registru .
         *
         * @return  .
         */

        prevzitZiskanatData: function (KPrevzeti,isAres, stupenVerifikace) {
            var that = this;
            this.log.trace("prevzitZiskanatData");
            if (KPrevzeti) { //&& KPrevzeti.length > 0
                this.beginOperation();
                this.call("PrevzitExt", { PolozkyKPrevzeti: KPrevzeti })
                    .done(function (esuDto) { 
                        that.clearDetailesuItemsDto(esuDto);
                        if (stupenVerifikace) {
                            var stupenVerValue = that.findFields("StupenVerifikace").gfield("getValue");
                            var stupenVer = (stupenVerValue && (stupenVerValue.stupen_ver != null)) ? stupenVerValue.stupen_ver : null;
                            if ((stupenVer == null)
                                || (stupenVer != 55 && stupenVer != 65)
                            ) {
                                esuDto.StupenVerifikace = stupenVerifikace;

                            }
                        }

                        that.setovaniModelu(esuDto, that.UpdateObalkovaAdresa); //
                        if (isAres) {
                            that.m_bAresOk = true;
                            that.UpdateOkButton();
                        }
                        

                      })
                      .always(function (xhr, type, vobj) {
                          that.endOperation();
                      });
            } else {
                this.m_bAresOk = true;
                that.UpdateOkButton();
                this.dialogs.alert("jres:31900401"); //RC 31900401 : Nebyly předány žádné data k převzetí.
            }
        },
        //#endregion
        
        //#region ARES
        overitARES: function () {
            var that = this;
            this.log.trace("overitARES");
            var obj = {
                content: this,
                Ucel: this.typZobrazeni
            };
            obj.esuDto = this.nactiDtoBezValidace();

            if (obj.esuDto.Ico) {
                this.m_bAresOk = false;
                this.beginOperation();
                Gordic.Esu.Utils.OverARES(obj)
                    .then(function (retVal) { //stav,zprava
                        that.prevzitZiskanatData(retVal.prevzit,true,null);
                     
                    })
                    .always(function (msg) {
                        that.endOperation();
                    });
            } else {
                this.dialogs.alert("jres:31900402");  //RC 31900402 : Subjekt nemá vyplněné IČO.

            }
        },

        //#region ARES
        overitVERA: function () {
            var that = this;
            this.log.trace("overitVERA");
            var obj = {
                content: this,
                Ucel: this.typZobrazeni
            };
            obj.esuDto = this.nactiDtoBezValidace();

            this.beginOperation();
            Gordic.Esu.Utils.OverVERA(obj)
                .then(function (retVal) { //stav,zprava
                    that.prevzitZiskanatData(retVal.prevzit,null, null);
                })
                .always(function (msg) {
                    that.endOperation();
                });
        },


        //#endregion

        //#region CRS
        overitCRS: function () {
            var that = this;
            this.log.trace("overitCRS");
            var esuDto = jQuery.extend(true, {}, this.model);
            this.findFields().gfield("model", "collect", esuDto);
            if (esuDto.Jmeno == null || esuDto.Prijmeni == null) {
                var txtmes = "Pro ověření je potřeba zadat alespoň jméno, příjmení a datum narození (případně adresu výběrem z RUIAN).";
                this.dialogs.alert(txtmes);
                return;
            }
            
            if (this.model.KodUirAdr == null || this.model.KodUirAdr === "" || this.model.KodUirAdr === "0") {
                this.startoveritCRS(esuDto, null);
            } else {
                that.dialogs.confirm("Dotaz",
                    "Ověřovat i dle adresy?") 
                    .on("closed", function (ev, ret) { 
                        if (ret === "yes") {
                            that.startoveritCRS(esuDto, that.model.KodUirAdr);
                        } else {
                            that.startoveritCRS(esuDto, null);
                        }
                    });
            }


            
        },

        startoveritCRS: function (esuDto, KodUirAdr) {
            var that = this;
            var opt = {
                Ixp: this.serverParams.Logovani.Ixp,
                Jmeno: esuDto.Jmeno,
                Prijmeni: esuDto.Prijmeni,
                KodAdresnihoMista: KodUirAdr,
                DatNar: esuDto.DatNar,
                IdDs: esuDto.IdDs,
            };
            this.call("OveritCRS", opt)
                .done(function (retVal) {
                    if (retVal.Jmeno == null || retVal.Prijmeni == null) {
                        var txtmes = "Subjekt se dle zadaných kritérií nepodařilo najít.";
                        that.dialogs.alert(txtmes);
                    } else {
                        var ss = "";
                        ss += retVal.Jmeno + " ";
                        ss += retVal.Prijmeni + " ";
                        ss += retVal.Ulice + " ";
                        ss += retVal.CastObce + " ";
                        ss += retVal.Obec + " ";
                        ss += retVal.CisloOrientacni + " ";
                        ss += retVal.CisloPopisne + " ";
                        ss += retVal.TypIdentifikatoru + " ";
                        ss += retVal.HodnotaIdentifikatoru + " ";

                        that.dialogs.confirm("Dotaz",
                            "Převzít na detail ESU? " + ss)
                            .on("closed", function (ev, ret) {
                                if (ret === "yes") {

                                    that.findFields("Jmeno").gfield("setValue", retVal.Jmeno, { BezObalky: true });
                                    that.findFields("Prijmeni").gfield("setValue", retVal.Prijmeni, { BezObalky: true });
                                    that.PreberAdresuZSzr(retVal.KodAdresy, retVal.Obec, retVal.CastObce, retVal.Ulice, retVal.CisloOrientacni, retVal.CisloPopisne, retVal.PSC);
                                    if (retVal.IdDs) {
                                        that.IdDsOverene = retVal.IdDs;
                                        that.findFields("IdDs").gfield("setValue", retVal.IdDs, { BezObalky: true });
                                    }
                                } 
                            });
                    }
                }
            );

        },


        //#endregion


        //#region insolvence
        HledatVInsolvencnimRejstriku: function () {
            var that = this;
            this.log.trace("HledatVInsolvencnimRejstriku");
            var model = this.nactiDtoBezValidace();
            var l_oJSONPars = {};

            if (model.IxsEsu) {
                l_oJSONPars.ixs_esu = model.IxsEsu;
            } else {
                l_oJSONPars.ico= model.Ico;
                l_oJSONPars.rc = model.RodneCislo;
                if (l_oJSONPars.ico == null && l_oJSONPars.rc == null) {
                    l_oJSONPars.dat_narozeni = model.DatNar;
                }
            }
            var opt = {
                filter: l_oJSONPars
            }
            Gordic.Esu.Dialogs.GSeznamInsolvenceDlg(that, opt);         
        },
        //#endregion

        //#region overeni RUIAN
        overitRUIAN: function (typ) {
            /// <summary>
            /// ukazka vizualizace ověření ve formuláři 
            /// </summary>
            /// <param name="typ" type="type"></param>
            this.log.trace("overitRUIAN");
            var that = this;
            var esuDto = jQuery.extend(true, {}, this.model);
            this.findFields().gfield("model", "collect", esuDto);
            // pro FO
            var editmode = !this.typZobrazeni.Detail // pokud
            var enableOk = false;
            if ((esuDto.StupenVerifikace == 55) || (esuDto.StupenVerifikace == 65) || (esuDto.StupenVerifikace == -55) || (esuDto.StupenVerifikace == -65)) {
                editmode = false;
                if (!this.typZobrazeni.Detail) {
                    enableOk = true; // // l_oTab.OnlyOK = true; // ALF 23.7.2013 - aby šlo přebírat potencionální změny v RUIAN
                }
            }

            //VyberZRuianDlg: function (content, ModOtevreni, EditMode, esuDto, adresaKod)

            var options = {
                
                EditMode: editmode,
                esuDto: esuDto,
                adresaKod: esuDto.KodUirAdr,
                enableOk: enableOk
            };

            Gordic.Esu.Dialogs.VyberZRuianDlg(this, options).on("closed", function (ev, retVal) {
                if (retVal) {
                    that.SpracujVysledekRuian(retVal);
                }
            });
         
        },

        SpracujVysledekRuian: function (retVal) {
            var that = this;
            this.log.trace("SpracujVysledekRuian");
            var stupenVerField = this.findFields("StupenVerifikace");
            var stupenVerInDetail = stupenVerField.gfield("getValueIn", "stupen_ver");
            var StupenVerifikaceValue = {};
            if (retVal.prevzit === true) {
                if (retVal.adresaKod) {
                    this.model.KodUirAdr = retVal.adresaKod.toString();
                    if ((this.model.KodUirAdr) && (this.model.KodUirAdr !== "0")) {
                        if (stupenVerInDetail !== 55 && stupenVerInDetail !== 65 && stupenVerInDetail !== -65 && stupenVerInDetail !== -55) {
                            stupenVerField.gfield("setValueFromKeys", "35");
                            StupenVerifikaceValue.stupen_ver = 35;
                        } else {
                            StupenVerifikaceValue = stupenVerField.gfield("getValue");
                        }
                        //// ALF 11.2.2014 přesunuto sem aby se dobře přegenerovala obálková adresa
                        //if (l_oVyberZUirTab.Cor != "0") m_oTbCisloOr.Text = l_oVyberZUirTab.Cor;
                        //if (l_oVyberZUirTab.Cpop != "0") m_oTbCisloPop.Text = l_oVyberZUirTab.Cpop;
                        //if  m_oTbObec.Text = l_oVyberZUirTab.Obec;
                        //m_oTbUlice.Text = l_oVyberZUirTab.Ulice;
                        //m_oTbCastObce.Text = l_oVyberZUirTab.CastObce;
                        //m_oTbPsc.SetValidData(42, l_oVyberZUirTab.PscKod.ToString());
                        this.PreberAdresuZSzr(
                            this.model.KodUirAdr//adresaKod
                            , retVal.OrigObec// obec
                            , retVal.OrigCastObce// castObce
                            , retVal.OrigUlice// ulice
                            , retVal.OrigCisOrientacni// cor
                            , retVal.OrigCisPopisne// cpop
                            , retVal.OrigPosta);// psc

                        that.cekejAPakObnov().done(function(){
                            that.dokonciPrevzetiVysledkuRuian(StupenVerifikaceValue);
                        });

                    }
                }
            } else if (retVal.odstranitVazbuNaRuian === true) {
                // ALF 25.3.2014
                
                if (stupenVerInDetail === 35 || stupenVerInDetail === 30)        // ALF 26.5.2015 povoleno i pro UIR
                {
                    this.model.KodUirAdr = "";
                    stupenVerField.gfield("setValueFromKeys", "10");
                    StupenVerifikaceValue.stupen_ver = 10;
                    that.cekejAPakObnov().done(function () {
                        that.odstranSZRRuianInfo();

                    });
                }
               
            }

        },

        dokonciPrevzetiVysledkuRuian: function (StupenVerifikaceValue) {
            // zkontroluju a vyupdateuju ikonky
            this.log.trace("dokonciPrevzetiVysledkuRuian");
            this.pokusOUpdateIszrIcon(StupenVerifikaceValue);

        },

        //#endregion
        
        novyEx: function () {
            this.log.trace("novyEx");
            var opt = {
                IxsEsu: null,
                Ucel: 0,
                Logovani: this.Logovani,
            };
            Gordic.Esu.Dialogs.DetailEsuDlg(this, opt);
        },

        historie: function () {
            this.log.trace("historie");
            var ixsEsu;

            ixsEsu = this.findFields("IxsEsu").gfield("getValue");
            if (ixsEsu){ 
                var InputDto = {
                    ixsEsu: ixsEsu
                };
                var options = {
                    InputDto: InputDto,
                    Logovani: this.Logovani
                };

                Gordic.Esu.Dialogs.HistorieEsuDlg(this, options);
            }
        },

        
        clearDetailesuItemsDto: function (esuDto) {
            this.log.trace("clearDetailesuItemsDto");
            delete esuDto.AutomatickeNacteniDetailu;
            delete esuDto.CheckBoxOpravit;
            delete esuDto.FlagUlozeno;
            delete esuDto.GenerateSt;
            delete esuDto.LzeEditovatZastupnouOsobu;

        },
        
        closing: function () { // podmineny userClose 
            var that = this;
            this.log.trace("closing");
            //that.serverParams.TempRetValueFromDetailEsu
            //this.flagNovehoEsu
            if (that.TempRetValueFromDetailEsu) {
                that.TempRetValueFromDetailEsu.flagNovehoEsu = this.flagNovehoEsu;  // zda se zalozilo nové esu
                that.TempRetValueFromDetailEsu.puvodniEsu = this.puvodniEsu;        // ixsEsupuvodně otvírané
            }

            var mainDef = $.Deferred();
            var otazkaDef = $.Deferred();
            var HlavniFormChanged = that.findForms("HlavniForm").gform("hasChanged");
            var KontaktyFormChanged = that.findForms("KontaktyForm").gform("hasChanged");
            var UdajeEU = that.findForms("UdajeEU").gform("hasChanged");
            if (HlavniFormChanged || KontaktyFormChanged || UdajeEU) {
                this.dialogs.messageBox("jres:31900404", //RC 31900404 : Uložení
                    "jres:31900403", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 31900403 : Ve formuláři došlo k neuloženým změnám, přejete si přesto zavřít bez uložení?
                    .on("yes", otazkaDef.resolve)
                    .on("close", otazkaDef.reject);
                otazkaDef.done(function () {
                    mainDef.resolve(that.TempRetValueFromDetailEsu || null);
                }).fail(function () {
                    mainDef.reject();
                });


            } else {
                mainDef.resolve(that.TempRetValueFromDetailEsu || null);
            }
            return mainDef.promise();


            // tří prvková 
            /*
            var that = this;
            that.closingDef = $.Deferred();

            if (that.serverParams.UnsavedChanges) {
                this.dialogs.messageBox("Upozornění", "Chcete uložit provedené změny?", GDlg.mbbYesNoCancel, GDlg.mbiQuestion)
                    .on("yes", function () {
                        that.simpleEvent("PripravitUlozit");
                    })
                    .on("no", that.closingDef.resolve)
                    .on("cancel", function () {
                        
                        that.closingDef.reject();
                    });
            } else {
                that.closingDef.resolve();
            }
            
            return that.closingDef.promise();
       


              */
        },

        closeDet: function () {
            this.log.trace("closeDet");
            //this.nactiDtoBezValidace();
            $.content(this).tryClose();
        },

        //#region pomocné boolíky

        TypZobrazeniJeEditaceAdresy:function() {
            var editaceAdresy = false;
            this.log.trace("TypZobrazeniJeEditaceAdresy");
            if(this.typZobrazeni.Editace) {
                editaceAdresy = this.model.IxsEsu !== this.model.IxsEko;
            }
            return editaceAdresy;
        },


        LzeMenitTypAdresyDorucovaciKontaktni:function() {
            var zmenaTypuAdresy = false;
            this.log.trace("LzeMenitTypAdresyDorucovaciKontaktni");
            if (this.GEsuParamsDto.gin_esu_zatypad_volnyRezim ||
                (this.GEsuParamsDto.gin_esu_zatypad_striktniRezim && (this.typZobrazeni.NovaPobocka || this.TypZobrazeniJeEditaceAdresy()))) {
                zmenaTypuAdresy = true;
            }
            return zmenaTypuAdresy;
        },

        LzeMenitTypAdresyTrvala:function() {
            var zmenaTypuAdresy = false;
            this.log.trace("LzeMenitTypAdresyTrvala");
            if (this.GEsuParamsDto.gin_esu_zatypad_volnyRezim ||
                (this.GEsuParamsDto.gin_esu_zatypad_striktniRezim && (!this.typZobrazeni.NovaPobocka && !this.TypZobrazeniJeEditaceAdresy()))) {
                zmenaTypuAdresy = true;
            }
            return zmenaTypuAdresy;
        },

        //#endregion

        //#region PSR overeni
        overitUPSR: function (typ) {
            var that = this;
            this.log.trace("overitUPSR");
            //console.log("overovani ISZR");
            var esuDto = jQuery.extend(true, {}, this.model);
            this.findFields().gfield("model", "collect", esuDto);

            var VyberZPsrItemsDto = {};
            VyberZPsrItemsDto.Ixp = this.serverParams.Logovani.Ixp;
            VyberZPsrItemsDto.AktZnacka = this.serverParams.Logovani.AktZnacka;

            var editmode = !this.typZobrazeni.Detail;
            // if (esuDto.TypEsu === 20) {
            if (esuDto.IdDs == null) { //ref T22390 upraveno předplnění ID DS

                if (esuDto.TypEsu === 20 && esuDto.RodneCislo != null) {//12.7.2023 dsebesta pridani jmena a prijmeni //rc://sk/7906086243_dvorak_lubomir
                    if (esuDto.Prijmeni && esuDto.Jmeno) {
                        var jmenoSK = esuDto.Jmeno.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(" ", "").toLowerCase();
                        var prijmeniSK = esuDto.Prijmeni.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(" ", "").toLowerCase();
                        esuDto.IdDs = "rc://sk/" + esuDto.RodneCislo + "_" + prijmeniSK + "_" + jmenoSK;
                    } else {
                        esuDto.IdDs = "rc://sk/" + esuDto.RodneCislo;
                    }
                } else if ((esuDto.TypEsu === 10 || esuDto.TypEsu === 30) && esuDto.Ico != null) {
                    esuDto.IdDs = "ico://sk/" + esuDto.Ico;
                }

            }

            var opt = {
                EditMode: editmode,
                esuDto: esuDto,
                VyberZPsrItemsDto: VyberZPsrItemsDto
            };
            Gordic.Esu.Dialogs.GVyberZPsrDlg(this, opt).on("closed", function (ev, retVal) {
                if (retVal) {
                    that.setujHodnotyPrevzaneZPSR(retVal);
                    that.resetIsdsPole();
                }
            });
        }, 

        setujHodnotyPrevzaneZPSR: function (values) {
            //var fieldyTextROB = "IdDs, Jmeno, Prijmeni, MistoNar, DatNar, DatUmrti, Stat, StatSp, Ulice, Obec, CisloOrientacni, CisloPopisne, CastObce, Psc, StupenVerifikace"
            this.log.trace("setujHodnotyPrevzaneZPSR");
            if (values != null) {
             
                var l_nVysledekOvereni = true; //values.VysledekOvereni;
                if (l_nVysledekOvereni ) {
                    this.findFields("StupenVerifikace").gfield("setValueFromKeys", "80");

                    var typEsuField = this.findFields("TypEsu");
                    var typEsuValue = typEsuField.gfield("getValue"); //10 pravnicka 20 fyzicka 30 osvc
                    if (typEsuValue != null && values.TypEsu != null && values.TypEsu !== 0) {

                        if (typEsuValue.typ_esu !== 20 && values.TypEsu === 20 ) { // pokud není nastavená fyzická a má být
                            
                        }
                        else if (typEsuValue.typ_esu === 20 && values.TypEsu !== 20) { // pokud je nastavená fyzická, ale typEsu přišel jiný než fyzická
                            typEsuField.gfield("setValue", { typ_esu: values.TypEsu }, { valid: false, BezObalky: true });
                        }
                    }

                    //var TypOrganizaceField = that.findFields("TypOrganizace"); // organizaci zatím neřeším
                    //values.TypOrganizace

                    values.PrizUmrti = values.DatUmrti ? 1 : 0;

                    this.findFields("Jmeno, Prijmeni, ObchodniJmeno, Nazev, DatNar, IdDs,SkEdeskId, MistoNar, DatUmrti, PrizUmrti, Ico","RodneCislo").gfield("clear", { BezObalky: true }).gfield("model", "apply", values, { setFlags: { BezObalky: true } });


                    if (values.StatSp) {
                        this.findFields("StatSp").gfield("setValueFromKeys", values.StatSp);

                    }

                    //if (this.GEsuParamsDto.gin_esu_zatypad) {
                    //    if (values.PrevzitDorucAdresuCheckbox) { // prebirani doruc. adresy
                    //        this.findFields("TypAdr").gfield("setValueFromKeys", 10);
                    //    } else {
                    //        this.findFields("TypAdr").gfield("setValueFromKeys", 0);
                    //    }
                    //}
                    var l_oKodUirAdr = null; 
                    var l_sObec = values.Obec; // Obec
                    var l_sUlice = values.Ulice; // Ulice
                    var l_sCastObce = values.CastObce; // CastObce
                    var l_sPsc = values.Psc; // Psc
                    var l_sCisOr = values.CisloOrientacni; // CisOr
                    var l_sCisloPopisne = values.CisloPopisne; // CisPopisne
                    var l_sStat = values.Stat; // CisPopisne
                    this.PreberAdresuZSzr(l_oKodUirAdr, l_sObec, l_sCastObce, l_sUlice, l_sCisOr, l_sCisloPopisne, l_sPsc, l_sStat);

                    //this.model.Aifo = values.AifoText;


                    //this.model.AgendaZadostId = values.AgendaZadostId;
                    //this.model.RegOdpovedId = values.RegOdpovedId;

                    this.NastavUrPriDleDefaulAgendySzr();
               

           
                    //this.ObcerstviIszr(values.CasOdpovedi, 55);
                    this.UpdateIszrIcon(80);
                }

                //if (l_nVysledekOvereni == l_nOverenoZadanAsynchronniPozadavek) {
                //    this.NastavStupenVerifikace("-55");

                //    esudItems.IszrZadostId = values.values[1];

                //    this.NastavUrPriDleDefaulAgendySzr();
                //    this.UpdateTbIszr();
                //    this.ObcerstviIszr("");
                //}


                this.cekejAPakObnov();
            }

        },


        zneaktivniAifo: function () {
            this.log.trace("zneaktivniAifo");
            var opt = {
                ixsEsu: this.model.IxsEsu,
                aifo: this.model.Aifo
            };
            this.call("ZneaktivniAifo", opt)
                .done(function (retVal) {
                    //asi nic
                });
        },

        

        updateIddsIcons: function () {
            var that = this;
            this.log.trace("updateIddsIcons");
            if (!this.GEsuParamsDto.gin_ssl_datschr) {
                return;
            }
            
            //var nazevField = this.findFields("Nazev");
            var iddsField = this.findFields("IdDs");
            var prijmeniField = this.findFields("Prijmeni");
            var jmenoField = this.findFields("Jmeno");
            var datNarField = this.findFields("DatNar");
            var icoField = this.findFields("Ico");
            var obchodniJmenoField = this.findFields("ObchodniJmeno");
            var obecField = this.findFields("Obec");
            var uliceField = this.findFields("Ulice");

            this.odeberIDDSIkonu(iddsField);
            this.odeberIDDSIkonu(prijmeniField);
            this.odeberIDDSIkonu(jmenoField);
            this.odeberIDDSIkonu(datNarField);
            this.odeberIDDSIkonu(icoField);
            this.odeberIDDSIkonu(obchodniJmenoField);
            this.odeberIDDSIkonu(obecField);
            this.odeberIDDSIkonu(uliceField);

             // v případě, že je vyplněn ID datové schránky, "vyžlutí" se vždy jen toto políčko
            if (iddsField != null && iddsField.length > 0) {
                var iddsValue = iddsField.gfield("getValue");
                if (iddsValue) {
                    this.pridejIDDSIkonu(iddsField);
                    return;
                }
            }
            var poleFieldNaParametrISDS = this.ziskejPoleFieldNaParametrISDS();
            for (var i = 0; i < poleFieldNaParametrISDS.length; i++) {
                this.pridejIDDSIkonu(poleFieldNaParametrISDS[i]);
            }



        },

        pridejIDDSIkonu: function (field) {
            this.log.trace("pridejIDDSIkonu");
            if (field && field.length > 0) {
                $(field).gfield("addState", {
                    id: "iddsIndikace",
                    icon: "gi-isds",
                    customClass: "g-state-info", //success
                    tooltip: "jres:31900885" //RC 31900885 : Kritérium podle kterého se hledá v ISDS
                });
            }
          
        },

        odeberIDDSIkonu: function (field) {
            this.log.trace("odeberIDDSIkonu");
            if (field && field.length > 0) {
                $(field).gfield("getState", "iddsIndikace").remove();
            }
        },

        ziskejPoleFieldNaParametrISDS: function () {
            this.log.trace("ziskejPoleFieldNaParametrISDS");
            var polenazvupolicek = this.ziskejPolenazvuFieldNaParametrISDS();
            var poleFieldu = [];
            for (var i = 0; i < polenazvupolicek.length; i++) {
                poleFieldu.push(this.findFields(polenazvupolicek[i]));
            }
            return poleFieldu;
        },

        ziskejPolenazvuFieldNaParametrISDS: function () {
            //zjistím typ esu 
            this.log.trace("ziskejPolenazvuFieldNaParametrISDS");
            var poleNazvuPolicek = [];
            var typEsuValue = this.findFields("TypEsu").gfield("getValue");
            if (!typEsuValue) return poleNazvuPolicek;

            var vybranyparam = null;
            switch (typEsuValue.typ_esu) {
                case 0://0 nepřiřazeno 
                    vybranyparam = this.GEsuParamsDto.gin_esu_isdson;
                    break;
                case 10: //10 pravnicka
                    vybranyparam = this.GEsuParamsDto.gin_esu_isdsop;
                    break;
                case 20: // fyzicka
                    vybranyparam = this.GEsuParamsDto.gin_esu_isdsof;
                    break;
                case 30: //osvc
                    vybranyparam = this.GEsuParamsDto.gin_esu_isdsof;
                    break;
            }

            if (vybranyparam != null) {
                var poleTextu = vybranyparam.split(',');
                for (var i = 0; i < poleTextu.length; i++) {
                    switch (poleTextu[i]) {
                        case "id_ds": poleNazvuPolicek.push("IdDs");   break; //RC 23320384 : ID datové schránky
                        case "prijmeni": poleNazvuPolicek.push("Prijmeni"); break; //RC 23320378 : Příjmení
                        case "jmeno": poleNazvuPolicek.push("Jmeno"); break; //RC 23320379 : Jméno
                        case "dat_nar": poleNazvuPolicek.push("DatNar"); break; //RC 23320380 : Datum narození
                        case "ico": poleNazvuPolicek.push("Ico"); break; //RC 23320381 : IČO
                        case "[ico]": poleNazvuPolicek.push("Ico"); break; //RC 23320381 : IČO
                        case "ob_jmeno": poleNazvuPolicek.push("ObchodniJmeno"); break; //RC 23320382 : Obchodní jméno
                        case "obec": poleNazvuPolicek.push("Obec"); break; //RC 23320383 : Obec
                        case "ulice": poleNazvuPolicek.push("Ulice"); break; //RC 23320383 : Ulice
                    }
                }

            }
            return poleNazvuPolicek;
        },

        pokusSePrednastavitTypOrganizacePokudJeNaVyberJenJedno: function (typ) {
            var that = this;
            this.log.trace("pokusSePrednastavitTypOrganizacePokudJeNaVyberJenJedno");
            var typOrgField = that.findFields("TypOrganizace");
            typOrgField.gfield("getValueAsync").done(function (value) {
                if (value == null) {
                    if (typ != null) {
                        if (typ === 20 || typ === 30) {
                            that.beginOperation();
                            var data = new Gordic.Data.Readers.Ginctyo().getData({ typ_esu: typ }).done(function (view) {
                                if (view.length === 1) {
                                    var model = {
                                        TypOrganizace: view["0"].typ_org
                                    };
                                    typOrgField.gfield("model", "apply", model);
                                }
                            }).always(function (msg) {
                                that.endOperation();
                            });

                        }
                        else if (typ === 10 && that.GEsuParamsDto.gin_esu_predpto != null && that.GEsuParamsDto.gin_esu_predpto !== 0 && that.GEsuParamsDto.gin_esu_predpto !== "0") {
                            var poModel = { TypOrganizace: that.GEsuParamsDto.gin_esu_predpto };
                            typOrgField.gfield("model", "apply", poModel);
                        }
                    }
                }
            });

            
        },

        //#region Nacitani z okna el podání
        predplneniMailuZPodani: function () {
            var that = this;
            this.log.trace("predplneniMailuZPodani");
            var buttons = undefined;
            var nalezenyEmail = null;
            var tempConent = this;
            for (var i = 0; i < 3; i++) {
                if (tempConent.parentContent) {
                    tempConent = tempConent.parentContent // pokud je parent pracuju s ním
                    if (tempConent.className == "Gordic.Pod.WebControls.GEvidenceElPodaniDlg") {
                        if (tempConent.EmailPuvodni) {
                            nalezenyEmail = tempConent.EmailPuvodni;
                        }
                        break; // našel jsem tak končím s forem
                    }
                }
            }
            if (nalezenyEmail != null && nalezenyEmail !== "") {
                buttons = [{
                    requireEdit: true,
                    action: new GAction({
                        caption: "",
                        name: "actPredplneniMailuZPodani",
                        icon: "gi-accept",
                        tooltip: "jres:31900884", //RC 31900884 : Předplnit email z podání
                        run: function (ev, ctx) {
                            $(ctx.field).gfield("setValue", nalezenyEmail);
                        }
                    })
                }];
            }
            return buttons;
        },

        nactiObsahZOknaElPodani: function (content) {
            this.log.trace("nactiObsahZOknaElPodani");
            Gordic.Esu.Function.pridejNaDetailESUNeboDoKartotekyObsahZElPodani(content);
        },
        //#endregion

        updateDsStatus: function () {
            var that = this;
            this.log.trace("updateDsStatus");
            var IdDsField = this.findFields("IdDs");
            var IdDsValue = IdDsField.gfield("getValue");
            IdDsField.gfield("getState", "stIdDsWarning").remove();  

            if ((IdDsValue == null) || IdDsValue.length != 7) {
                this.actions.actIdDsFieldButton.update({
                    icon: "gi-ds",
                    tooltip: "jres:31900905" //RC 31900905 : Datová schránka

                });

            }
            else {
                var DatAktSzr = this.DatAktSzr != null ? this.DatAktSzr : null;
                this.call("UpdateDsStatus", { IdDs: IdDsValue, DatAktSzr: DatAktSzr  })
                    .done(function (retVal) {
                        if (retVal) {
                            var ico = "gi-ds";
                            switch (retVal.StrParam1) {
                                case "Ds":
                                    ico = "gi-ds";
                                    break;
                                case "Ds_zpristupnit":
                                    ico = "gi-ds g-state-text g-state-success"; //"gi-ds|gi-tick gi-bgw g-state-text g-state-success gi-stack-pos--rb"; // fa-check-circle gi-stack-fw gi-bgw
                                    break;
                                case "Ds_znepristupnit":
                                    ico = "gi-ds g-state-text g-state-error";// "gi-ds|fa-times-circle gi-bgw g-state-text g-state-error gi-stack-pos--rb";// fa-check-circle gi-stack-fw gi-bgw
                                    break;
                                case "Ds_neniPovolenoZiskatInformace":
                                    ico = "gi-ds g-state-text g-state-warning";// "gi-ds|fa-times-circle gi-bgw g-state-text g-state-error gi-stack-pos--rb";// fa-check-circle gi-stack-fw gi-bgw
                                    break;
                                default:
                                    ico = "gi-ds";
                                    break;
                            }

                            that.actions.actIdDsFieldButton.update({
                                icon: ico,
                                tooltip: retVal.StrParam2 
                            });
                            if (retVal.BoolParam1) {
                                IdDsField.gfield("addState", {
                                    id: "stIdDsWarning",     // nepovinný, pouze pokud bude potřeba ikonu adresovat/měnit
                                    icon: "fa-exclamation-triangle g-state-text g-state-warning"
                                    //customClass: "g-state-success",
                                    // tooltip: "" //provedeno_s_varovanim
                                });
                            }

                        }

                    });
            }

        },

        historieDs: function () {
            var that = this;
            this.log.trace("historieDs");
            var IdDsField = this.findFields("IdDs");
            var IdDsValue = IdDsField.gfield("getValue");
            if (IdDsValue) {
                this.call("HistorieDs", { IdDs: IdDsValue })
                    .done(function (retVal) {
                        if (retVal && retVal.StrParam1) {
                            that.dialogs.messageBox("", retVal.StrParam1).on("closed", function (ev, retValDialog) {
                                that.otevriDialogHistorieDs(IdDsValue, retVal.NumParam1);
                            });
                        } else {
                            that.otevriDialogHistorieDs(IdDsValue, retVal.NumParam1);

                        }
                    });
    


            }

        },

        otevriDialogHistorieDs: function (IdDs, statusDs) {

            //var l_oEsuHistorieTab = new GDsInfoHistorieTab(idDs, statusDs);
            //Task.AddModalWin(l_oEsuHistorieTab);
            var that = this;
            this.log.trace("otevriDialogHistorieDs");
            var opt = {
                parentContent: this,
                opt: {
                    IdDs: IdDs,
                    Status: statusDs
                }
            };

            Gordic.Esu.Dialogs.GDsInfoHistorieDlg(opt)
                .done(function (retVal) {
                    if (retVal) {
                        
                    }
                });
        },

        overitPlatceDph: function () {
            var that = this;
            var dic = this.findFields("Dic").gfield("getValue");
            this.log.trace("overitPlatceDph");
            if (dic == null || dic == ""){
                var ico = this.findFields("Ico").gfield("getValue");
                if (ico != null && ico != "") {
                    dic = "CZ" + ico;
                    this.findFields("Dic").gfield("setValue", dic);
                }
            }

            if (dic !=null && dic != "") { 

                this.call("BylDnesDotazDoRegistru", {
                    dic: dic
                }) 
                    .done(function (retVal) {
                        if (retVal.StavBool) {
                            if (retVal.StrParam1) {
                                that.dialogs.messageBox("Pozor", retVal.StrParam1).on("closed",
                                    function (ev, retValDialog) {
                                        that.otevriDialogoovereniDPH(dic);
                                    }
                                );
                            } else {
                                that.otevriDialogoovereniDPH(dic);
                            }
                        } 
                    })
                    .fail(function (xhr, type, vobj) {
                    });
            }

        },
        otevriDialogoovereniDPH: function (dic) {
            var that = this;
            this.log.trace("otevriDialogoovereniDPH");
            var nazev = this.findFields("ObchodniJmeno").gfield("getValue");
            var options = {
                dic: dic ?? this.model?.Dic?.trim(),
                nazev: nazev,
                ixs_esu: this.model?.IxsEsu
            };
            Gordic.Esu.Dialogs.InfoNespPlatceDphDlg(that, options).on("closed", function (ev, retVal) {
                if (retVal) {
                    ;
                }
            });
        },

        skontrolujObecneWarningy: function () {
            this.log.trace("skontrolujObecneWarningy");
            if (this.model.PocetGinsexuWarning) {
                this.pridejUpozorneni(this.model.PocetGinsexuWarning);
            }
        },
        pridejUpozorneni: function (tooltip) {
            this.log.trace("pridejUpozorneni");
            this.actions.actUpozorneni.update({
                tooltip: tooltip,
                caption: "jres:31900929", //RC 31900929 : Upozornění
                icon: "fa-exclamation-triangle g-state-text g-state-warning"
            });
            this.actions.actUpozorneni.visible(true);
            //if (enabled) {
            $.content(this).find(".js-statUpozorneni").addClass("g-state-text g-state-warning");
           
            //} else {
            //    $.content(that).find(".js-statInsolvence").removeClass("g-state-text g-state-important");
            //    $.content(that).findFields("Insolvence").gfield("resetErrors", "rucniInsolvence");
            //}
        },

        pracujSeZastupyHnedPoOtevreniDetailu: function (zastupyInputDto) {
            var that = this;
            if (zastupyInputDto && zastupyInputDto.ixs_esu !== null) {
                var zastupyField = that.findFields("zastupySel");
                zastupyField.gfield("focus");

                if (zastupyInputDto.lic === "###VytvorNovyZastup###") {
                    that.vytvorNovouZastupnouosobuKarticky();
                } else {
                    
                    var nalazenyZastupArr = $.grep(that.TabulkaZastupu, function (value) {
                        if (zastupyInputDto.ixs_esu === value.ixs_esu && zastupyInputDto.lic === value.lic && zastupyInputDto.por_zast === value.por_zast) {
                            return true;
                        }
                        return false;
                    });
                    if (nalazenyZastupArr && nalazenyZastupArr.length > 0) {
                        that.editujZastupnouosobuKarticky(nalazenyZastupArr[0]);
                    }

                }
            }

        },

        otevriSzrSeznamDokladuDlg: function () {
            var that = this;
            var opt = {
                Aifo: this.model.Aifo 
            };
            Gordic.Esu.Dialogs.SzrSeznamDokladuDlg({ parentContent: this, opt: opt, ModOtevreni: Gordic.Global.Enums.ModOtevreni.showModalWindow })  //  
                .done(function (retVal) {
                    if (retVal) {
                        ;
                    }

                });
        },

        overitAISEO: function () {
            /// <summary>
            /// ukazka vizualizace ověření ve formuláři 
            /// </summary>
            /// <param name="typ" type="type"></param>
            this.log.trace("overitAISEO");
            var that = this;
            //console.log("overovani ISZR");
            var esuDto = jQuery.extend(true, {}, this.model);
            this.findFields().gfield("model", "collect", esuDto);

            //var VyberZIszrItemsDto = {};
            //VyberZIszrItemsDto.Ixp = this.serverParams.Logovani.Ixp;
            //VyberZIszrItemsDto.AktZnacka = this.serverParams.Logovani.AktZnacka;

            // pro FO
            var editmode = !this.typZobrazeni.Detail // pokud
            var opt = null;
           
            opt = {
                EditMode: editmode,
                esuDto: esuDto,
                //VyberZRobItemsDto: VyberZIszrItemsDto
            };
            Gordic.Esu.Dialogs.SzrAiseoDlg({ parentContent: this, opt: opt })  //  
                .done(function (retVal) {
                    if (retVal) {
                        that.setujHodnotyPrevzaneZAISEO(retVal);
                    }

                });
           
        },

        setujHodnotyPrevzaneZAISEO: function (values) {
            //var fieldyTextROB = "IdDs, Jmeno, Prijmeni, MistoNar, DatNar, DatUmrti, Stat, StatSp, Ulice, Obec, CisloOrientacni, CisloPopisne, CastObce, Psc, StupenVerifikace"
            this.log.trace("setujHodnotyPrevzaneZAISEO");
            if (values != null) {

                //TODO
                // from TK   m_oTbRodnePrijmeni.Value = l_oDetSzrAiseoTab.SzrAiseo.Szrsieo[0].rodne_prijm;
                // ukládání  FrontaIszrZadostId, AgendaZadostId, RegOdpovedId



                values.PrizUmrti = values.DatUmrti ? 1 : 0;
                this.findFields("Jmeno,Prijmeni,DatNar,MistoNar,DatUmrti,PrizUmrti,RodneCislo,RodPrijmeni").gfield("clear", { BezObalky: true }).gfield("model", "apply", values, { setFlags: { BezObalky: true } });

                this.model.Aifo = values.Aifo;
                this.model.FrontaIszrZadostId = values.IszrZadostId;
                this.model.IszrZadostId = values.IszrZadostId;
                this.model.AgendaZadostId = values.AgendaZadostId;
                this.model.RegOdpovedId = values.RegOdpovedId;

                this.PreberAdresuZSzr(null, values.Obec, values.CastObce, values.Ulice, values.CisloOr, values.CisloPop, values.Psc);

                if (values.StatSpISZR) {
                    this.findFields("StatSp").gfield("setValueFromKeys", values.StatSpISZR);

                }

                this.NastavUrPriDleDefaulAgendySzr();
                //this.UpdateIszrIcon(55);

                this.cekejAPakObnov();


            }

        },
        UpdateOkButton: function ()
        {
            var that = this;
            var l_bAresOk = true;
            
            if ((this.gin_esu_aresvyz == 1) && !this.TypZobrazeniJeEditaceAdresy2())     
            {
                l_bAresOk = this.m_bAresOk;          // je true pokud proběhlo ověření v 
            }
            if (this.actions.actOveritARES.enabled()) { 
                this.actions.actStatPovinnostARES.update({ visible: !l_bAresOk });
            }

            //if (l_bAresOk) {
            if (this.actions.actSave) { 
                this.actions.actSave.update({
                    enabled: l_bAresOk,
                    tooltip: l_bAresOk ?
                        "jres:31901108" //RC 31901108 : Uložit změny bez uzavření
                        : "jres:31901109" //RC 31901109 : Nejdříve je nutné ověřit v ARES
                });
            }
            if (this.actions.actSaveAndClose) {
                this.actions.actSaveAndClose.update({
                    enabled: l_bAresOk,
                    tooltip: l_bAresOk ?
                        "jres:31901110" //RC 31901110 : Uložit změny a zavřít
                        : "jres:31901109" //RC 31901109 : Nejdříve je nutné ověřit v ARES
                });
            }
            //}


            //OkEnabled = DataChanged && !ReadOnlyMode && l_bAresOk;     // ALF 22.10.2014 - po ověření v ISDS šlo uložit i když uživatel neměl díky úrovním přístupu oprávnění
            //if (!ReadOnlyMode)
            //{
            //    m_oActionUlozit.Enabled = DataChanged && l_bAresOk;
            //}
            //else if (!ReadOnlyModeZo)
            //{
            //    m_oActionUlozit.Enabled = !ReadOnlyModeZo;
            //}
            //else
            //{
            //    m_oActionUlozit.Enabled = false;
            //}

            //if (DataChanged && OkEnabled)     // 21.9.2015 [INC-30706-15](UserProcess.Configuration.GetDatabaseParameter("gin_esu_povoadm", 0) == 1)
            //    if ((UserProcess.Configuration.GetDatabaseParameter("gin_esu_povoadm", 0) == 0) && (!m_oCbStupenVer.StupenVer.IsNull && m_oCbStupenVer.StupenVer == 20))
            //    {
            //        ProgramovaZmenaUrPriStupenVer = true;
            //        m_oCbStupenVer.SetValidData(10);
            //        ProgramovaZmenaUrPriStupenVer = false;
            //    }



        },

        TypZobrazeniJeEditaceAdresy2: function()
        {
            var that = this;
            var editaceAdresy = false;

            if (this.typZobrazeni.Editace)
            {
                var TypAdrVal = this.findFields("TypAdr").gfield("getValue");
                if (TypAdrVal && TypAdrVal.typ != null) {
                    editaceAdresy = !TypAdrVal.typ === 0;
                }
            }
            return editaceAdresy;
        },

        NastavPriznakNeovereniAres: function () {
            var that = this;
            var ico = this.findFields("Ico").gfield("getValue");
            if ((this.gin_esu_aresvyz == 1) && (ico != null))        // pokud uživatel zadal nějaké IČO, shodím příznak ověření v ARES
            {
                var valStat = that.findFields("Stat").gfield("getValue");
                if (valStat == null || valStat.stat == 0 || valStat.stat == 42)   // ALF 6.8.2015 logický požadavek vznesený J. Zedníčkem pro MO - kontrolovat pouze firmy z ČR
                {
                    if (this.typZobrazeni.NovaPobocka)        // ALF 11.12.2018
                        this.m_bAresOk = true;
                    else
                        this.m_bAresOk = false;
                }
                else
                    this.m_bAresOk = true;   // je-li jiný stát nebude se ověření vyžadovat

            }
            this.UpdateOkButton();
        },

        zkontrolujZdaJdeONejnovejsiESU: function () {
            var that = this;
            if (this.typZobrazeni.Detail || this.typZobrazeni.Editace) { 
                if (this.model.IxsPrev != null && this.model.IxsPrev != "" && this.model.IxsEsu !== this.model.IxsPrev) {
                    var prvek = $("<a>").glink({
                        params: {
                            action: new GAction({
                                name: "actNvoaVerzeEsu",
                                //icon: pocet > 0 ? "gi-group" : "gi-minus", //fa-fw
                                //customClass: "g-link--no-underline g-state-text",
                                caption:"jres:31901120", //RC 31901120 : Aktuální verze ESU
                                run: function (event) {
                                    //event.preventDefault();
                                    var opt = {
                                        IxsEsu: that.model.IxsPrev,
                                        Ucel: that.TypZobrazeniC,
                                        Logovani: that.Logovani,
                                    };
                                    Gordic.Esu.Dialogs.DetailEsuDlg(that, opt); //that.parentContent
                                }
                            })
                        }
                    });
                    var txt = $("<div>jres:31901121</div>"); //RC 31901121 : Pozor nejedná se o nejnovější verzi ESU
                    prvek.appendTo(txt)


                    this.showFlash({
                        label: txt, customClass: "g-state-warning",
                    });
                }

            }



        },

        kopie: function () {
            var that = this;
            this.log.trace("novaKopie");
            var ixs = this.model.IxsEsu;
            if (this.model.IxsEsu != this.model.IxsNad) {
                ixs = this.model.IxsNad;
            }
            var opt = {
                IxsEsu: ixs,
                Ucel: 4,
                Logovani: this.Logovani,
            };
            Gordic.Esu.Dialogs.DetailEsuDlg(this, opt); //that.parentContent
        },

        otevriDotceneDokumenty: function () {
            var that = this;
            var opt = {
                ixs_esu: this.model.IxsEsu,
                Logovani: this.Logovani,
                OmezenyNahledZESU: true
            };
            Gordic.Wfl.Dialogs.DotceneDokumentyDlg(this, opt).on("closed", function (ev, retVal) {

            });
        },
        vytvoritDokumentVlastni: function () {
            Gordic.Ssl.MainApp.NovyVlastniDokument(this, { IxsEsuProVytvoreniVazby: this.model.IxsEsu });
        },
        vytvoritDokumentCizi: function () {
            Gordic.Ssl.MainApp.NovyCiziDokument(this, { IxsEsuProVytvoreniVazby: this.model.IxsEsu });
        },

        changeIsdsPole: function () {
            this.dataIsdsUserChanged = true
        },
        resetIsdsPole: function () {
            var that = this;
            this.findForms("HlavniForm").gform("waitForValues")
                .done(function () {
                    that.dataIsdsUserChanged = false
                });
           
        },
        odstranitIdDs: function () {
            var that = this;
            var IdDsField = this.findFields("IdDs");
            var IdDsVal = IdDsField.gfield("getValue");
            if (IdDsVal) { 
                that.dialogs.confirm("jres:31901269", //RC 31901269 : Odstranění ID DS
                    "jres:31901270") //RC 31901270 : Chcete skutečně odstranit vazbu na datovou schránku?
                    .on("closed", function (ev, retVal) { //RC 31900331 : Přejete si přesto uložit?
                        if (retVal) {
                            if (retVal === "yes") {
                                IdDsField.gfield("clear");
                            }
                        }
                    });
            }
        },

        
        doplnKovaAkcePoSpusteni: function () {
            if (this.DoplnkovaAkcePoSpusteniDetailuESU != null && this.DoplnkovaAkcePoSpusteniDetailuESU != 0) {
                switch (this.DoplnkovaAkcePoSpusteniDetailuESU) {
                    case 100: //Gordic.Esu.WebClient.DoplnkovaAkcePoSpusteniDetailuESUEnum.spustitAres
                        if (this.actions.actOveritARES.enabled()) {
                            this.actions.actOveritARES.run();
                        }
                        break;
                    default:
                        break
                }
            }
        }

        //#endregion



        

 
    }, { extendIntellisense: GContent });
    

});


