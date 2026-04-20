"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPoukazPozadavekDetail.cs              </Name>
//    <Description> Detail požadavku na založení poukazu                        </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-05-05                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            /**
             * Okno Detailu požadavku na založení poukazu#
             * @author Martin Hanus
             * @copyright © GORDIC spol. s r. o. 1993-2026
             * @created 2025-05-05
             * @lastModified 2025-05-05
             */
            let GPoukazPozadavekDetail = class GPoukazPozadavekDetail extends Gordic.GContentBase {
                constructor() {
                    ////////////////////////////////////////////////////////////////////
                    //TODO: 
                    ////////////////////////////////////////////////////////////////////
                    super(...arguments);
                    /** dateChangeHolder */
                    this.dateChangeHolder = false;
                    //#endregion A C T I O N S - V Y T V O Ř E N Í  A  D E F I N I C E
                }
                //#endregion P R O P E R T I E S 
                /**
                 * Hlavní metoda pro inicializaci okna
                 * @method onContentReady
                 */
                onContentReady() {
                    const that = this;
                    that.title = !that.EditMode ? `Nový požadavek na založení poukazu (${that.Ixp})` : `Detail požadavku na založení poukazu (${that.Ixp})`;
                    that.createCommandBar();
                    that.createActions();
                    that.createForm();
                    that.nactiData();
                    WebClient.Common.Base.setDateBoxShortcuts(that);
                }
                //#region S E S T A V E N Í   O K N A 
                /**
                 * Metoda pro vytvoření command baru s tlačítky pro uložení a zavření okna
                 * @method createCommandBar()
                 */
                createCommandBar() {
                    const that = this;
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Ok",
                            icon: "fa-floppy-o",
                            run: function () {
                                that.ulozit().done(() => { that.close(true); }); // Uložení dat a zavření okna v případě úspěchu metody.
                            }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () { that.close(false); } // Zavření okna
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
                /**
                 * Metoda pro vytvoření formuláře
                 * @method createForm()
                 * @returns {Gordic.Forms.Form} - Vrací formulář
                 */
                createForm() {
                    const that = this;
                    var mainForm = new Gordic.Forms.Form({ name: "GDdpFormPoukazPozadavek" });
                    //#region form
                    mainForm
                        .addSection({ name: "SectionPoukazPozadavekBasicInfo", label: "Poukaz" })
                        .addRow({ label: "Šablona", required: true })
                        .addField("gselectbox", Gordic.Prefabs.Select.pousste(), {
                        name: "ixs_ste", // Šablona
                        flag: "required", validators: [new Gordic.Validators.Required()],
                        dropdown: true,
                        model: "model.ixs_ste=value.ixs_ste",
                        serverFilters: {
                            typ_ste: 60,
                            aktivita: 100
                        },
                    })
                        .addRow({ label: "Kniha", required: true })
                        .addField("gselectbox", Gordic.Prefabs.Select.pousden(), {
                        name: "ixp_den", // Kniha
                        flag: "required", validators: [new Gordic.Validators.Required()],
                        dropdown: true,
                        model: "model.ixp_den=value.ixp_den",
                        serverFilters: {
                            aktivita: 100
                        },
                        change: function (ev, input) {
                            if (input.value?.ixp_den?.length != 12)
                                that.actions.getActions().find(e => e.name == "actSave")?.enabled(false); // pokud není vybrána kniha, tak zakážu uložení
                            else
                                that.actions.getActions().find(e => e.name == "actSave")?.enabled(true); // jinak povolím uložení
                        } // akce po změně knihy
                    })
                        .addRow("Popis")
                        .addField("gstringbox", {
                        name: "popis", // Popis
                    })
                        .addRow({ label: "Typ dokladu", required: true })
                        .addField("gselectbox", Gordic.Prefabs.Select.sslstyp(), {
                        name: "ixs_typ", // Typ dokladu
                        flag: "required", validators: [new Gordic.Validators.Required()],
                        dropdown: true,
                        model: "model.ixs_typ=value.ixs_typ",
                        serverFilters: {
                            ktg_typ: [1380, 1380]
                        }
                    })
                        .addRow("Bankovní účet vlastní")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.ekosuvl(), {
                        name: "bu_vl",
                        flag: "required", validators: [new Gordic.Validators.Required()],
                        dropdown: false,
                        customClass: "js-nevalidovat",
                        initialValue: { bu_vl: 0, sk_vl: 0 },
                        modelDefaults: { rok: this.Rok },
                        model: "this.Rok=>value.rok;model.bu_vl=value.bu_vl,model.sk_vl=value.sk_vl",
                        serverFilters: {
                            pristupKBU: 1,
                            urovenPristupuKBU: 1,
                            rezimVyberuDleKnihy: 0,
                            aktivita: [100],
                            rok: this.Rok
                        },
                    })
                        .addRow("VS, SS, KS")
                        .addField("gstringbox", "w-4", {
                        name: "vs", //VS - Variabilní/párovací symbol - identifikuje a rozlišuje příchozí/odchozí platby
                        allowedChars: "0123456789*",
                        validators: [new Gordic.Validators.Length({ max: 12 }),
                            //new Gordic.Validators.Base({
                            //    validate: function (MyValue, source) {
                            //        let l_vs: string;
                            //        let fMaska: boolean = true;
                            //        // Trim the input value
                            //        MyValue = MyValue!.trim();
                            //        l_vs = MyValue;
                            //        // If the last character is '*'
                            //        if (l_vs!.charAt(l_vs!.length - 1) === '*') {
                            //            // If fMaska is false, show an error message and return false
                            //            if (!fMaska) {
                            //                this.errorType = "error";
                            //                this.message = 'Zadaná hodnota obsahuje znak *, který není povoleno zadávat!'
                            //                this.stopping = true; // evidence bude zakázána
                            //                return false;
                            //            }
                            //            // Remove the '*' for number validation
                            //            l_vs = l_vs.slice(0, -1);
                            //        }
                            //        if (!that.isValidNumber(l_vs) && l_vs.length > 0) {
                            //            this.errorType = "error";
                            //            this.message = 'Chybně vyplněné pole, musí být zadaná číselná hodnota!'
                            //            this.stopping = true; // evidence bude zakázána
                            //            return false;
                            //        }
                            //        return true;
                            //    }
                            //}),
                        ],
                    })
                        .addField("gselectbox", "w-4", Gordic.Prefabs.Select.ekoscss(), {
                        name: "ss", //SS - Specifický symbol - identifikuje a rozlišuje příchozí/odchozí platby
                        dropdown: true,
                        model: "model.ss=value.ss"
                    })
                        .addField("gselectbox", "w-4", Gordic.Prefabs.Select.ekoskos(), {
                        name: "ks", //KS - Konstatní symbol - identifikuje a rozlišuje příchozí/odchozí platby
                        dropdown: true,
                        model: "model.ks=value.ks"
                    })
                        .addRow("Datum vystavení,splatnosti")
                        .addField("gdatebox", "w-6", {
                        name: "dat_vyst",
                        flag: "required", validators: [new Gordic.Validators.Required()],
                        change: function (ev, input) {
                            if (that.dateChangeHolder != true)
                                that.spocitejSplatnost("dat_vyst");
                        }
                    })
                        .addField("gdatebox", "w-6", {
                        name: "dat_spl",
                        flag: "required", validators: [new Gordic.Validators.Required()],
                        change: function (ev, input) {
                            if (that.dateChangeHolder != true)
                                that.spocitejSplatnost("dat_spl");
                        }
                    })
                        .addRow({ label: "Částka, Splatnost", required: true })
                        .addField("gnumberbox", "w-6", Gordic.Prefabs.Number.currency(), {
                        name: "c_mena", //Částka 
                        flag: "required", validators: [new Gordic.Validators.Required()],
                        initialValue: 0,
                    }) // BUCDPEP.c
                        .addField("gnumberbox", "w-6", {
                        name: "splatnost", initialValue: 15,
                        change: function (ev, input) {
                            if (that.dateChangeHolder != true)
                                that.spocitejSplatnost("splatnost");
                        }
                    })
                        //////////////////////////////////////////////////////////////////////////////////////
                        .addSection({ label: "Externí subjekt", name: "SectionPoukazPozadavekEsu" })
                        .addRow("Detail")
                        .addField("gselectbox", "w-12", {
                        name: "ixs_esu",
                        flag: "required", validators: [new Gordic.Validators.Required()],
                        disabled: false,
                        model: "ixs_esu=ixs_esu;esu_dic=dic;model.lic=value.lic;model.por_zast=value.por_zast",
                        change: function (ev, ctx) {
                            that.poZmeneSubjektu(ctx); // akce po změně subjektu
                            // ještě nastavím ostatní políčka spojená s poplatníkem (ESU)
                            if (ctx.value.ico)
                                that.modelPoukazu.ico = ctx.value.ico;
                            if (ctx.value.ico_esu)
                                that.modelPoukazu.ico_esu = ctx.value.ico_esu;
                            if (ctx.value.ac_esu)
                                that.modelPoukazu.ac_esu = ctx.value.ac_esu;
                            //if (ctx.value.rc) that.modelPoukazu.rc = ctx.value.rc;
                        }
                    }, Gordic.Esu.Prefabs.vyberEsu({
                        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu,
                        Logovani: {
                            Ixp: that.Ixp,
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani,
                            AktZnacka: that.Ixp,
                            DuvodHledaniTxt: "Detail požadavku na založení poukazu"
                        },
                    }))
                        .addRow("Bankovní účet cizí")
                        .addField("gselectbox", "w-12", Gordic.Eko.Components.ekosuci({
                        Ixp: that.Ixp ?? "",
                        AktZnacka: "",
                        DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniDotcenehoSubjektu
                    }), {
                        name: "bu_ci", // Bankovní účet cizí
                        validators: [],
                        dropdown: false, // výběr přes 3 tečky
                        model: "ixs_esu=>ixs_esu;bu_ci=bu_ci;sk_ci=sk_ci", // model pro naplnění políčka         
                        customClass: "js-nevalidovat", // vynechá validace proti DTO
                        serverFilters: {
                            //ixs_esu: new Gordic.Forms.Dependency("ixs_esu", "ixs_esu", false, true),    
                            aktivita: 100
                        },
                        change: function (ev, input) { }
                    })
                        /////////////////////////////////////////////////////////////////////////////////
                        .addSection({ label: "Předpis", name: "SectionPoukazPozadavekPredpis" })
                        .addRow()
                        .addField("gcheck", "w-12", {
                        name: "zal_predp",
                        label: "Snížit výši předpisu na případu o částku poukazu",
                        disabled: that.EditMode,
                        initialValue: !that.EditMode,
                        change: function (ev, input) {
                            const field = that.findFields("ktg_upo");
                            if (input.value)
                                field.gfield("option", "disabled", false);
                            else
                                field.gfield("option", "disabled", true);
                        }
                    })
                        .addRow("PID, Řád.předpisu")
                        .addField("gstringbox", "w-6", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp_poz",
                        flag: "required", validators: [new Gordic.Validators.Required()],
                        disabled: true,
                        change: function (ev, input) { }
                    })
                        .addField("gnumberbox", "w-6", {
                        name: "radek_uhr", // Řádek úhrady
                        disabled: true,
                        emptyValue: null,
                        change: function (ev, input) { }
                    })
                        .addRow("Kategorie pohybu")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo", //Typ předpisu
                        model: "model.ktg_upo=value.ktg_upo;model.ktg_upo_txt=value.ktg_upo_txt", //,
                        itemTemplate: "{ktg_upo}-{ktg_upo_txt}",
                        initialValue: { ktg_upo: 100 },
                        serverFilters: {
                            ktg_upo: WebClient.Common.Base.naplneniPole(0, 199),
                        },
                        dropdown: false,
                        disabled: that.EditMode,
                        change: function (ev, input) { }
                    });
                    //#endregion
                    that.defaultForm = $.newDiv( /*ID*/).appendTo(that.element).gform("createFrom", mainForm);
                    return mainForm;
                }
                /**
                  * Metoda nastavující políčko bankovního účtu po změně ESU
                  * @method poZmeneSubjektu()
                  */
                poZmeneSubjektu(ctx) {
                    const that = this;
                    var buciField = that.findFields("bu_ci"); // políčko cizého bankovního účtu
                    if (buciField.gfield("option", "disabled") == false) { // pokud je políčko editovatelné
                        if (ctx.value !== null) // nějaký subjekt je vybrán
                            buciField.gfield("option", "serverFilters", { ixs_esu: ctx.value.ixs_esu }); // náhrada za dependency                                              
                        else // subjekt je prázdný
                            buciField.gfield("option", "serverFilters", { ixs_esu: null }); // náhrada za dependency                                        
                    }
                    buciField.gfield("getServerFilters").then((sf) => {
                        return new Gordic.Data.Readers.Ekosuci().getData(sf); // vrácení hodnot políčka s aktuálními serverovými filtry
                    }).then((buci) => {
                        if (buci.length === 1) { // pokud existuje jedna vrácená hodnota
                            buciField.gfield("setValue", buci[0]); // doplním jí do políčka
                        }
                        else
                            buciField.gfield("clear"); // existuje více nebo žádná hodnota, tak účet vymažu
                    });
                }
                spocitejSplatnost(field) {
                    const that = this;
                    that.dateChangeHolder = true;
                    var splatnost = that.element.findForms().findFields("splatnost").gfield("getValue");
                    var dat_vyst = that.element.findForms().findFields("dat_vyst").gfield("getValue");
                    var dat_spl = that.element.findForms().findFields("dat_spl").gfield("getValue");
                    if (field == "dat_vyst") {
                        if (dat_vyst != null && dat_spl != null) {
                            that.element.findForms().findFields("splatnost").gfield("setValue", that.getDaysBetweenDates(dat_spl, dat_vyst), { initialValues: true });
                        }
                        if (splatnost != null) {
                            that.element.findForms().findFields("dat_spl").gfield("setValue", that.addDays(dat_vyst, splatnost), { initialValues: true });
                        }
                    }
                    else if (field == "dat_spl") {
                        if (dat_vyst != null && dat_spl != null) {
                            that.element.findForms().findFields("splatnost").gfield("setValue", that.getDaysBetweenDates(dat_spl, dat_vyst), { initialValues: true });
                        }
                        if (splatnost != null) {
                            that.element.findForms().findFields("dat_vyst").gfield("setValue", that.subtractDays(dat_spl, splatnost), { initialValues: true });
                        }
                    }
                    else { // splatnost
                        if (splatnost != null && dat_vyst != null) {
                            that.element.findForms().findFields("dat_spl").gfield("setValue", that.addDays(dat_vyst, splatnost), { initialValues: true });
                        }
                    }
                    that.dateChangeHolder = false;
                }
                getDaysBetweenDates(date1, date2) {
                    const oneDayMs = 1000 * 60 * 60 * 24; // počet milisekund za jeden den
                    // Získáme rozdíl v milisekundách
                    const diffMs = Math.abs(date2.getTime() - date1.getTime());
                    // Vrátíme počet dní (zaokrouhlený dolů)
                    return Math.floor(diffMs / oneDayMs);
                }
                addDays(date, days) {
                    const result = new Date(date); // vytvoříme kopii původního data
                    result.setDate(result.getDate() + days);
                    return result;
                }
                subtractDays(date, days) {
                    const result = new Date(date); // vytvoříme kopii původního data
                    result.setDate(result.getDate() - days);
                    return result;
                }
                //#endregion S E S T A V E N Í   O K N A
                //#region N A Č T E N Í   D A T
                nactiData() {
                    const that = this;
                    that.beginOperation("Načítám data...");
                    if (that.EditMode && that.IdTem.length == 12) { // pokud je editace s "validním" IdTem, pak načtu data poukazu
                        that.isl.PripadPoukazPozadavek.read(rq => {
                            return {
                                data: {
                                    ixs_ste: that.IxsSte,
                                    id_tem: that.IdTem
                                }
                            };
                        }).get()
                            .done((data) => {
                            that.modelPoukazu = data.data;
                            that.nastavData(data.data, null);
                        })
                            .fail((xhr, type, obj) => {
                            if (type === "exception") {
                                obj.handled = true;
                                console.log(obj.Data);
                                that.actions.getActions().find(e => e.name == "actSave")?.enabled(false);
                                that.dialogs.error("Chyba", obj.baseMessage);
                            }
                        })
                            .always(() => {
                            that.endOperation();
                        });
                        that.isl.PripadPoukazPozadavek.nactiInfoPredpis({ ixp: that.Ixp, idTem: that.IdTem }).get()
                            .done((data) => {
                            that.nastavData(null, data);
                        })
                            .fail((xhr, type, obj) => {
                            if (type === "exception") {
                                obj.handled = true;
                                console.log(obj.Data);
                                //that.actions.getActions().find(e => e.name == "actSave")?.enabled(false); //////   
                                that.dialogs.error("Chyba", obj.baseMessage);
                            }
                        })
                            .always(() => {
                            that.endOperation();
                        });
                    }
                    else { // jinak se nastavi default hodnoty dle pripadu DDP
                        that.isl.PripadPoukazPozadavek.inicializacePripadu({ ixp: that.Ixp }).get()
                            .done((data) => {
                            that.modelPoukazu.ixs_esu = data.ixs_esu;
                            that.modelPoukazu.vs = data.vs;
                            that.modelPoukazu.ks = data.ks;
                            that.modelPoukazu.ss = data.ss;
                            that.modelPoukazu.bu_vl = data.bu_vl;
                            that.modelPoukazu.sk_vl = data.sk_vl;
                            that.modelPoukazu.bu_ci = data.bu_ci;
                            that.modelPoukazu.sk_ci = data.sk_ci;
                            that.modelPredpisu.ixp = data.ixp;
                            that.modelPredpisu.vs = data.vs;
                            that.modelPredpisu.ks = data.ks;
                            that.modelPredpisu.ss = data.ss;
                            that.modelPredpisu.popis = data.popis;
                            that.modelPredpisu.bu_vl = data.bu_vl;
                            that.modelPredpisu.sk_vl = data.sk_vl;
                            that.modelPredpisu.bu_ci = data.bu_ci;
                            that.modelPredpisu.sk_ci = data.sk_ci;
                            that.modelPredpisu.zp = data.zp;
                            that.modelPredpisu.ixs_esu = data.ixs_esu;
                            that.nastavData(that.modelPoukazu, that.modelPredpisu);
                        })
                            .fail((xhr, type, obj) => {
                            if (type === "exception") {
                                obj.handled = true;
                                console.log(obj.Data);
                                that.actions.getActions().find(e => e.name == "actSave")?.enabled(false);
                                that.dialogs.error("Chyba", obj.baseMessage);
                            }
                        })
                            .always(() => {
                            that.endOperation();
                        });
                    }
                }
                nastavData(poukaz, predpis) {
                    const that = this;
                    if (poukaz != null) {
                        that.defaultForm.findFields().gfield("model", "apply", poukaz, { initialValues: true });
                        that.defaultForm.findFields().gfield("model", "validators", that.validators);
                    }
                    if (predpis != null) {
                        that.defaultForm.findFields("ixp_poz").gfield("setValue", predpis.ixp, { initialValues: true });
                        that.defaultForm.findFields("radek_uhr").gfield("setValue", predpis.radek_uhr, { initialValues: true });
                        that.defaultForm.findFields("ktg_upo").gfield("model", "apply", { ktg_upo: predpis.ktg_upo }, { initialValues: true });
                    }
                    if (!that.EditMode || that.IdTem.length != 12) {
                        that.nactiInitDataKnihy();
                        that.nactiInitDataSablony();
                        that.nactiInitDataTypuDokladu();
                    }
                }
                nactiInitDataKnihy() {
                    const that = this;
                    const knihaField = that.findFields("ixp_den"); // políčko Kniha
                    if (knihaField.gfield("option", "disabled") == false) { // pokud je políčko editovatelné
                        return knihaField.gfield("getServerFilters").then((sf) => {
                            return new Gordic.Data.Readers.Pousden().getData(sf, void 0, that); // vrácení hodnot políčka s aktuálními serverovými filtry
                        }).then((ixpDen) => {
                            if (ixpDen.length > 0) // pokud existuje minimálně jedna vrácená hodnota
                                knihaField.gfield("setInitial", ixpDen[0]); // doplním jí do políčka
                            else
                                knihaField.gfield("clear"); // existuje více nebo žádná hodnota, tak políčko vymažu
                            return ixpDen.length > 0; // vrácení boolean, zda existuje aspoň jedna kniha
                        });
                    }
                }
                nactiInitDataSablony() {
                    const that = this;
                    const sablonaField = that.findFields("ixs_ste"); // políčko Šablona
                    if (sablonaField.gfield("option", "disabled") == false) { // pokud je políčko editovatelné
                        return sablonaField.gfield("getServerFilters").then((sf) => {
                            return new Gordic.Data.Readers.Pousste().getData(sf, void 0, that); // vrácení hodnot políčka s aktuálními serverovými filtry
                        }).then((ixsSte) => {
                            if (ixsSte.length > 0) // pokud existuje minimálně jedna vrácená hodnota
                                sablonaField.gfield("setInitial", ixsSte[0]); // doplním jí do políčka
                            else
                                sablonaField.gfield("clear"); // existuje více nebo žádná hodnota, tak políčko vymažu
                            return ixsSte.length > 0; // vrácení boolean, zda existuje aspoň jedna kniha
                        });
                    }
                }
                nactiInitDataTypuDokladu() {
                    const that = this;
                    const TypDokladuField = that.findFields("ixs_typ"); // políčko Typ dokladu
                    if (TypDokladuField.gfield("option", "disabled") == false) { // pokud je políčko editovatelné
                        return TypDokladuField.gfield("getServerFilters").then((sf) => {
                            return new Gordic.Data.Readers.Sslstyp().getData(sf, void 0, that); // vrácení hodnot políčka s aktuálními serverovými filtry
                        }).then((ixsTyp) => {
                            if (ixsTyp.length > 0) // pokud existuje minimálně jedna vrácená hodnota
                                TypDokladuField.gfield("setInitial", ixsTyp[0]); // doplním jí do políčka
                            else
                                TypDokladuField.gfield("clear"); // existuje více nebo žádná hodnota, tak políčko vymažu
                            return ixsTyp.length > 0; // vrácení boolean, zda existuje aspoň jedna kniha
                        });
                    }
                }
                //#endregion N A Č T E N Í   D A T
                //#region A C T I O N S - V Y T V O Ř E N Í  A  D E F I N I C E
                /**
                 * Vytvoří action list a jednotlivé akce
                 * @method createActions()
                 * @returns {void} - Ukončení metody void
                 */
                createActions() {
                    const that = this;
                    that.actions.addRange([
                        {
                            name: "actZavritPotomkyContentu",
                            run: () => {
                                that.tryCloseAllSignificants();
                            }
                        },
                    ]);
                }
                /**
                 * Metoda pro uložení dat z obsahu
                 * @method ulozit()
                 * @returns {JQueryPromise<void>} - Vrací promise <Ukončení metody void>
                 */
                ulozit() {
                    const that = this; // THIS
                    const frm = that.element.findForms(); // reference na formulář
                    var def = $.Deferred(); // Vytvoření promisu
                    var chybnaKontrola = false; // Pomocná prom. pro kontrolu chyb  
                    frm.findFields().gfield('resetErrors'); // Vyresetuju chyby na formuláři
                    that.beginOperation("Kontroluji data...");
                    //?---------------------------------------------------------------------------------------------------------
                    // kontrola validace formuláře - zakomentovná protože validuje i bu_ci
                    //if (!frm.gform("isValid")) {
                    //    chybnaKontrola = true;
                    //    that.endOperation();
                    //    return def.reject();
                    //}
                    //?---------------------------------------------------------------------------------------------------------
                    // sebrání hodnot z formuláře
                    let formData = {};
                    that.findFields().gfield("model", "collect", formData);
                    // zkontroluji vstupní data jako v guptě
                    //?---------------------------------------------------------------------------------------------------------
                    if (formData.ixp_den == null || formData.ixp_den?.trim().length != 12) {
                        chybnaKontrola = true;
                        that.endOperation();
                        frm.findFields("ixp_den").gfield("setError", {
                            message: "Povinná položka!", // customizovatelný text chyby (používat pouze výjimečně!) 
                            errorType: "error", // typ chyby (error, warning, info)
                        });
                        frm.findFields("ixp_den").gfield('focus');
                        return def.reject();
                    }
                    //?---------------------------------------------------------------------------------------------------------
                    if (formData.ixs_ste == null || formData.ixs_ste?.trim().length != 12) {
                        chybnaKontrola = true;
                        that.endOperation();
                        frm.findFields("ixs_ste").gfield("setError", {
                            message: "Povinná položka!", // customizovatelný text chyby (používat pouze výjimečně!) 
                            errorType: "error", // typ chyby (error, warning, info)
                        });
                        frm.findFields("ixs_ste").gfield('focus');
                        return def.reject();
                    }
                    //?---------------------------------------------------------------------------------------------------------
                    if (formData.ixs_typ == null || formData.ixs_typ?.trim().length != 12) {
                        chybnaKontrola = true;
                        that.endOperation();
                        frm.findFields("ixs_typ").gfield("setError", {
                            message: "Povinná položka!", // customizovatelný text chyby (používat pouze výjimečně!) 
                            errorType: "error", // typ chyby (error, warning, info)
                        });
                        frm.findFields("ixs_typ").gfield('focus');
                        return def.reject();
                    }
                    //?---------------------------------------------------------------------------------------------------------
                    if (formData.ixs_esu == null || formData.ixs_esu?.trim().length != 12 || formData.ixs_esu == Ddp.WebClient.Common.Globals.sgNull.NullEsu) {
                        chybnaKontrola = true;
                        that.endOperation();
                        frm.findFields("ixs_esu").gfield("setError", {
                            message: "Povinná položka!", // customizovatelný text chyby (používat pouze výjimečně!) 
                            errorType: "error", // typ chyby (error, warning, info)
                        });
                        frm.findFields("ixs_esu").gfield('focus');
                        return def.reject();
                    }
                    //?---------------------------------------------------------------------------------------------------------
                    if (formData.ixp_poz == null || formData.ixp_poz?.trim().length != 12) {
                        chybnaKontrola = true;
                        that.endOperation();
                        frm.findFields("ixp_poz").gfield("setError", {
                            message: "Povinná položka!", // customizovatelný text chyby (používat pouze výjimečně!) 
                            errorType: "error", // typ chyby (error, warning, info)
                        });
                        frm.findFields("ixp_poz").gfield('focus');
                        return def.reject();
                    }
                    //?---------------------------------------------------------------------------------------------------------
                    if (formData.c_mena == null || formData.c_mena == 0) {
                        chybnaKontrola = true;
                        that.endOperation();
                        frm.findFields("c_mena").gfield("setError", {
                            message: "Zadaná částka nesmí být nulová!", // customizovatelný text chyby (používat pouze výjimečně!) 
                            errorType: "error", // typ chyby (error, warning, info)
                        });
                        frm.findFields("c_mena").gfield('focus');
                        return def.reject();
                    }
                    //?---------------------------------------------------------------------------------------------------------
                    if (formData.bu_vl?.trim().length == 0 || formData.bu_vl == null) {
                        chybnaKontrola = true;
                        that.endOperation();
                        frm.findFields("bu_vl").gfield("setError", {
                            message: "Není vybrán vlastní bankovní účet!", // customizovatelný text chyby (používat pouze výjimečně!) 
                            errorType: "error", // typ chyby (error, warning, info)
                        });
                        frm.findFields("bu_vl").gfield('focus');
                        return def.reject();
                    }
                    //?---------------------------------------------------------------------------------------------------------
                    that.endOperation();
                    that.beginOperation("Nastavuji data pro uložení...");
                    //!Nacteni podkladu pro poukaz
                    that.modelPoukazu.ixp_den = formData.ixp_den; //cmb_kniha.CtiPolozkuS(1)
                    that.modelPoukazu.ixs_ste = formData.ixs_ste; //cmb_sablona.CtiPolozkuS(1)
                    that.modelPoukazu.ixs_typ = formData.ixs_typ; //cmb_ixs_typ.CtiPolozkuS(1)
                    that.modelPoukazu.ixs_esu = formData.ixs_esu; //xTODO:Set poukaz.ixs_esu = df_ico_esu.ixs_esu
                    that.modelPoukazu.popis = formData.popis; //df_popis
                    that.modelPoukazu.vs = formData.vs; //df_vs
                    that.modelPoukazu.ss = formData.ss; //df_ss
                    that.modelPoukazu.ks = formData.ks; //df_ks
                    that.modelPoukazu.bu_vl = formData.bu_vl; //df_bu_vl
                    that.modelPoukazu.sk_vl = formData.sk_vl; //df_sk_vl
                    that.modelPoukazu.bu_ci = formData.bu_ci; //df_bu_ci
                    that.modelPoukazu.sk_ci = formData.sk_ci; //df_sk_ci
                    that.modelPoukazu.dat_spl = formData.dat_spl; //df_dat_spl.Datum()
                    that.modelPoukazu.dat_vyst = formData.dat_vyst; //df_dat_vyst.Datum()
                    that.modelPoukazu.splatnost = formData.splatnost; //df_splatnost.Cislo()
                    that.modelPoukazu.c_mena = formData.c_mena; //df_c_mena.Cislo()
                    //!nacteni podkladu pro predpis
                    //if (that.modelPoukazu.zal_predp == true) {
                    that.modelPoukazu.zal_predp = formData.zal_predp;
                    that.modelPoukazu.radek_uhr = formData.radek_uhr;
                    that.modelPoukazu.ktg_upo = formData.ktg_upo;
                    //}
                    that.modelPoukazu.ixp_poz = formData.ixp_poz; //df_ixp_ddp
                    //
                    //that.modelPredpisu.ixp = formData.ixp                           // ip_ixp_ddp
                    //that.modelPredpisu.c = formData.c_mena                          // -SalNumberAbs(df_c_mena.Cislo())
                    //that.modelPredpisu.dat_vzniku = formData.dat_vyst               // df_dat_vyst.Datum()
                    //that.modelPredpisu.dat_spl = formData.dat_spl                   // df_dat_spl.Datum()
                    //that.modelPredpisu.vs = formData.vs                             // df_vs
                    //that.modelPredpisu.ks = formData.ks                             // df_ks
                    //that.modelPredpisu.ss = formData.ss                             // df_ss
                    //that.modelPredpisu.poznamka = 'Snížení výše předpisu poukazem'  // 'Snížení výše předpisu poukazem'
                    //that.modelPredpisu.ktg_upo = formData.ktg_upo                   // cmb_ktg_upo.CtiPolozkuN(1)
                    //that.modelPredpisu.bu_vl = formData.bu_vl                       // df_bu_vl
                    //that.modelPredpisu.sk_vl = formData.sk_vl                       // df_sk_vl
                    //that.modelPredpisu.dat_zdan = null                              // DATETIME_Null
                    //that.modelPredpisu.rok_dph = null                               // NUMBER_Null
                    //that.modelPredpisu.mesic_dph = null                             // NUMBER_Null
                    //that.modelPredpisu.c_z0 = formData.c_mena                       // df_c_mena.Cislo()
                    //that.modelPredpisu.c_d0 = new Decimal(0)                        // 0
                    //that.modelPredpisu.c_z1 = new Decimal(0)                        // 0
                    //that.modelPredpisu.c_d1 = new Decimal(0)                        // 0
                    //that.modelPredpisu.c_z2 = new Decimal(0)                        // 0
                    //that.modelPredpisu.c_d2 = new Decimal(0)                        // 0
                    //that.modelPredpisu.c_z3 = new Decimal(0)                        // 0
                    //that.modelPredpisu.c_d3 = new Decimal(0)                        // 0
                    //that.modelPredpisu.c_z4 = new Decimal(0)                        // 0
                    //that.modelPredpisu.c_d4 = new Decimal(0)                        // 0
                    //that.modelPredpisu.c_zao = new Decimal(0)                       // 0
                    ////!inicializace dle parametru
                    //if (that.Params.ddp_pou_stapre == 0)                            //If gf_HodnotaParametruDBN('ddp_pou_stapre') = 0
                    //    that.modelPredpisu.stav_uz_pr = 300                         //Set predpis.stav_uz_pr = 300
                    //else                                                            //Else
                    //    that.modelPredpisu.stav_uz_pr = 100                         //Set predpis.stav_uz_pr = 100
                    //that.modelPredpisu.bu_ci = formData.bu_ci
                    //that.modelPredpisu.sk_ci = formData.sk_ci
                    //that.modelPredpisu.zp = 20
                    //that.modelPredpisu.ixs_esu = formData.ixs_esu                   //TODO:poukaz.ixs_esu
                    //that.modelPredpisu.popis = formData.popis
                    that.endOperation();
                    that.beginOperation({ id: "opSaveContentLoading", text: "Ukládám..." }); // Zobrazení dialogu s načítáním
                    if (!that.EditMode) {
                        that.isl.PripadPoukazPozadavek.novyPozadavek({ data: that.modelPoukazu }) // Zavolání ISL metody k uložení dat lhůty
                            .get()
                            .done(function (ret) {
                            that.modelPoukazu = ret.data;
                            that.endOperation({ id: "opSaveContentLoading" }); // Ukončení dialogu s načítáním
                            return def.resolve(); // Vrací promise_resolve = úspěch
                        })
                            .fail(function (jqXHR, typ, obj) {
                            that.endOperation({ id: "opSaveContentLoading" }); // Ukončení dialogu s načítáním
                            WebClient.Common.Base.getFailFromIslPromise(that, jqXHR, typ, obj)
                                .then(() => {
                                def.reject();
                            });
                            //if (typ === "exception") {                                       // V případě výjimky
                            //    obj.handled = true;                                          // Nastavení výjimky jako ošetřené
                            //    that.dialogs.error("Chyba", obj.baseMessage)                 // Zobrazení dialogu s chybou
                            //        .on("close", (ev, retVal) => {                           // Po zavření dialogu
                            //            return def.reject();                                 // Vrací promise_reject = chyba
                            //        });
                            //}
                            //else { return def.reject(); }                                    // Vrací promise_reject = chyba (i když se nejedná o ošetřenou vyjímku)
                        });
                    }
                    else {
                        that.modelPoukazu.id_tem = that.IdTem;
                        that.isl.PripadPoukazPozadavek.ulozPozadavek({ data: that.modelPoukazu }) // Zavolání ISL metody k uložení dat lhůty
                            .get()
                            .done(function (ret) {
                            that.modelPoukazu = ret.data;
                            that.endOperation({ id: "opSaveContentLoading" }); // Ukončení dialogu s načítáním
                            return def.resolve(); // Vrací promise_resolve = úspěch
                        })
                            .fail(function (jqXHR, typ, obj) {
                            that.endOperation({ id: "opSaveContentLoading" }); // Ukončení dialogu s načítáním
                            WebClient.Common.Base.getFailFromIslPromise(that, jqXHR, typ, obj)
                                .then(() => {
                                def.reject();
                            });
                            //if (typ === "exception") {                                       // V případě výjimky
                            //    obj.handled = true;                                          // Nastavení výjimky jako ošetřené
                            //    that.dialogs.error("Chyba", obj.baseMessage)                 // Zobrazení dialogu s chybou
                            //        .on("close", (ev, retVal) => {                           // Po zavření dialogu
                            //            return def.reject();                                 // Vrací promise_reject = chyba
                            //        });
                            //}
                            //else { return def.reject(); }                                    // Vrací promise_reject = chyba (i když se nejedná o ošetřenou vyjímku)
                        });
                    }
                    return def.promise(); // Vrací promise
                    //return $.Deferred<void>().resolve().promise(); // Jestliže není potřeba volat ISL metodu, vracím zde rovnou promise + resolve
                }
            };
            GPoukazPozadavekDetail = __decorate([
                Decorators.gcontent
            ], GPoukazPozadavekDetail);
            WebClient.GPoukazPozadavekDetail = GPoukazPozadavekDetail;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1BvdWthelBvemFkYXZla0RldGFpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdQb3VrYXpQb3phZGF2ZWtEZXRhaWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLDBFQUEwRTtBQUMxRSx1RkFBdUY7QUFDdkYsOEZBQThGO0FBQzlGLHlGQUF5RjtBQUN6Riw0RkFBNEY7QUFDNUYsMEZBQTBGO0FBQzFGLGlCQUFpQjtBQUNqQixJQUFVLE1BQU0sQ0F1d0JmO0FBdndCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F1d0JuQjtJQXZ3QmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXV3QjdCO1FBdndCb0IsV0FBQSxTQUFTO1lBQzFCOzs7Ozs7ZUFNRztZQUVILElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXVCLFNBQVEsT0FBQSxZQUFZO2dCQUF4RDtvQkFFSSxvRUFBb0U7b0JBQ3BFLFFBQVE7b0JBQ1Isb0VBQW9FOztvQkF3QnBFLHVCQUF1QjtvQkFDdkIscUJBQWdCLEdBQVksS0FBSyxDQUFDO29CQSt0QmxDLGtFQUFrRTtnQkFDdEUsQ0FBQztnQkE5dEJHLGlDQUFpQztnQkFFakM7OzttQkFHRztnQkFDSCxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLHVDQUF1QyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLHlDQUF5QyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7b0JBRXhJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNqQixVQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMs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QUMscUJBQXFCLENBQUMsbUJBQW1CLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFOzZCQUN0RSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs0QkFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDOzRCQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDOzRCQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDOzRCQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDOzRCQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOzRCQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOzRCQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOzRCQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOzRCQUNyQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDOzRCQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDOzRCQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDOzRCQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDOzRCQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOzRCQUN0QyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxJQUFJ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LHFHQUFxRzs0QkFDckcsZ0dBQWdHOzRCQUNoRyx3RkFBd0Y7NEJBQ3hGLGtHQUFrRzs0QkFDbEcsYUFBYTs0QkFDYixHQUFHOzRCQUNILDBJQUEwSTt3QkFDOUksQ0FBQyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztvQkFDRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFvRCxnQkFBZ0I7b0JBQ3pGLCtIQUErSDtnQkFDbkksQ0FBQzthQUlKLENBQUE7WUE3dkJZLHNCQUFzQjtnQkFEbEMsVUFBVSxDQUFDLFFBQVE7ZUFDUCxzQkFBc0IsQ0E2dkJsQztZQTd2QlksZ0NBQXNCLHlCQTZ2QmxDLENBQUE7UUFDTCxDQUFDLEVBdndCb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBdXdCN0I7SUFBRCxDQUFDLEVBdndCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBdXdCbkI7QUFBRCxDQUFDLEVBdndCUyxNQUFNLEtBQU4sTUFBTSxRQXV3QmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1BvdWthelBvemFkYXZla0RldGFpbC5jcyAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IERldGFpbCBwb8W+YWRhdmt1IG5hIHphbG/FvmVuw60gcG91a2F6dSAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjUtMDUtMDUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxubmFtZXNwYWNlIEdvcmRpYy5EZHAuV2ViQ2xpZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogT2tubyBEZXRhaWx1IHBvxb5hZGF2a3UgbmEgemFsb8W+ZW7DrSBwb3VrYXp1IyAgIFxyXG4gICAgICogQGF1dGhvciBNYXJ0aW4gSGFudXNcclxuICAgICAqIEBjb3B5cmlnaHQgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI2XHJcbiAgICAgKiBAY3JlYXRlZCAyMDI1LTA1LTA1XHJcbiAgICAgKiBAbGFzdE1vZGlmaWVkIDIwMjUtMDUtMDVcclxuICAgICAqL1xyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHUG91a2F6UG96YWRhdmVrRGV0YWlsIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvL1RPRE86IFxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBQIFIgTyBQIEUgUiBUIEkgRSBTXHJcblxyXG4gICAgICAgIC8qKiBJZGVudGlpa8OhdG9yIHDFmcOtcGFkdSAqL1xyXG4gICAgICAgIEl4cDogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBJWFNTVEUgKi9cclxuICAgICAgICBJeHNTdGU6IHN0cmluZztcclxuICAgICAgICAvKiogSWRUZW0gKi9cclxuICAgICAgICBJZFRlbTogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBSb2sgZGxlIGVrb3BhcmFtcyAqL1xyXG4gICAgICAgIFJvazogbnVtYmVyO1xyXG5cclxuICAgICAgICAvKiogRFRPIFBvdWthenUgKi9cclxuICAgICAgICBtb2RlbFBvdWthenU6IERkcC5JbnRlcmZhY2UuTEsuSXNsLkdQcmlwYWRQb3VrYXpQb3phZGF2ZWtEdG87XHJcbiAgICAgICAgLyoqIERUTyBwxZllZHBpc3UgKi9cclxuICAgICAgICBtb2RlbFByZWRwaXN1OiBEZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJlZHBpc0R0bztcclxuICAgICAgICAvKiogUMWZw61zdHVwb3bDqSBwYXJhbWV0cnkgKi9cclxuICAgICAgICBQYXJhbXM6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkdEZHBQYXJhbWV0cnlEdG87XHJcblxyXG4gICAgICAgIC8qKiBFZGl0bW9kZSAodHJ1ZSA9IGVkaXRhY2UvZGV0YWlsIHwgZmFsc2UgPSBub3bDvSkgKi9cclxuICAgICAgICBFZGl0TW9kZTogYm9vbGVhbjtcclxuICAgICAgICAvKiogVmFsaWTDoXRvciAqL1xyXG4gICAgICAgIHZhbGlkYXRvcnM6IGFueTtcclxuICAgICAgICAvKiogZGF0ZUNoYW5nZUhvbGRlciAqL1xyXG4gICAgICAgIGRhdGVDaGFuZ2VIb2xkZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIFAgUiBPIFAgRSBSIFQgSSBFIFMgXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhsYXZuw60gbWV0b2RhIHBybyBpbmljaWFsaXphY2kgb2tuYVxyXG4gICAgICAgICAqIEBtZXRob2Qgb25Db250ZW50UmVhZHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID0gIXRoYXQuRWRpdE1vZGUgPyBgTm92w70gcG/FvmFkYXZlayBuYSB6YWxvxb5lbsOtIHBvdWthenUgKCR7dGhhdC5JeHB9KWAgOiBgRGV0YWlsIHBvxb5hZGF2a3UgbmEgemFsb8W+ZW7DrSBwb3VrYXp1ICgke3RoYXQuSXhwfSlgO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVDb21tYW5kQmFyKCk7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUZvcm0oKTtcclxuICAgICAgICAgICAgdGhhdC5uYWN0aURhdGEoKTtcclxuICAgICAgICAgICAgQ29tbW9uLkJhc2Uuc2V0RGF0ZUJveFNob3J0Y3V0cyh0aGF0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBTIEUgUyBUIEEgViBFIE4gw40gICBPIEsgTiBBIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gY29tbWFuZCBiYXJ1IHMgdGxhxI3DrXRreSBwcm8gdWxvxb5lbsOtIGEgemF2xZllbsOtIG9rbmFcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUNvbW1hbmRCYXIoKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzOyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZShbXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RTYXZlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPa1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZmxvcHB5LW9cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51bG96aXQoKS5kb25lKCgpID0+IHsgdGhhdC5jbG9zZSh0cnVlKTsgfSkgLy8gVWxvxb5lbsOtIGRhdCBhIHphdsWZZW7DrSBva25hIHYgcMWZw61wYWTEmyDDunNwxJtjaHUgbWV0b2R5LlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0Q2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZShmYWxzZSk7IH0gLy8gWmF2xZllbsOtIG9rbmFcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFNhdmUhXCIsIFwiYWN0Q2xvc2VcIl0pKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVGb3JtKClcclxuICAgICAgICAgKiBAcmV0dXJucyB7R29yZGljLkZvcm1zLkZvcm19IC0gVnJhY8OtIGZvcm11bMOhxZlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG1haW5Gb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJHRGRwRm9ybVBvdWthelBvemFkYXZla1wiIH0pO1xyXG4gICAgICAgICAgICAvLyNyZWdpb24gZm9ybVxyXG4gICAgICAgICAgICBtYWluRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBuYW1lOiBcIlNlY3Rpb25Qb3VrYXpQb3phZGF2ZWtCYXNpY0luZm9cIiwgbGFiZWw6IFwiUG91a2F6XCIgfSkgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCLFoGFibG9uYVwiLCByZXF1aXJlZDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5wb3Vzc3RlKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19zdGVcIiwgLy8gxaBhYmxvbmFcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX3N0ZT12YWx1ZS5peHNfc3RlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBfc3RlOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIktuaWhhXCIsIHJlcXVpcmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LnBvdXNkZW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX2RlblwiLCAvLyBLbmloYVxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHBfZGVuPXZhbHVlLml4cF9kZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQudmFsdWU/Lml4cF9kZW4/Lmxlbmd0aCAhPSAxMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5nZXRBY3Rpb25zKCkuZmluZChlID0+IGUubmFtZSA9PSBcImFjdFNhdmVcIik/LmVuYWJsZWQoZmFsc2UpOyAvLyBwb2t1ZCBuZW7DrSB2eWJyw6FuYSBrbmloYSwgdGFrIHpha8Ohxb51IHVsb8W+ZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuZ2V0QWN0aW9ucygpLmZpbmQoZSA9PiBlLm5hbWUgPT0gXCJhY3RTYXZlXCIpPy5lbmFibGVkKHRydWUpOyAgLy8gamluYWsgcG92b2zDrW0gdWxvxb5lbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgfSAvLyBha2NlIHBvIHptxJtuxJsga25paHlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG9waXNcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIiwgLy8gUG9waXNcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwiVHlwIGRva2xhZHVcIiwgcmVxdWlyZWQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgUHJlZmFicy5TZWxlY3Quc3Nsc3R5cCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfdHlwXCIsIC8vIFR5cCBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c190eXA9dmFsdWUuaXhzX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga3RnX3R5cDogWzEzODAsIDEzODBdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJCYW5rb3Zuw60gw7rEjWV0IHZsYXN0bsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc3V2bCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJidV92bFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwianMtbmV2YWxpZG92YXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgYnVfdmw6IDAsIHNrX3ZsOiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxEZWZhdWx0czogeyByb2s6IHRoaXMuUm9rIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwidGhpcy5Sb2s9PnZhbHVlLnJvazttb2RlbC5idV92bD12YWx1ZS5idV92bCxtb2RlbC5za192bD12YWx1ZS5za192bFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpc3R1cEtCVTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJvdmVuUHJpc3R1cHVLQlU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlemltVnliZXJ1RGxlS25paHk6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiBbMTAwXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiB0aGlzLlJva1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9IGFzIEdTZWxlY3RCb3hPcHRpb25zPGFueT4pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVlMsIFNTLCBLU1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2c1wiLCAvL1ZTIC0gVmFyaWFiaWxuw60vcMOhcm92YWPDrSBzeW1ib2wgLSBpZGVudGlmaWt1amUgYSByb3psacWhdWplIHDFmcOtY2hvesOtL29kY2hvesOtIHBsYXRieVxyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93ZWRDaGFyczogXCIwMTIzNDU2Nzg5KlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiAxMiB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9uZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAoTXlWYWx1ZSwgc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBsZXQgbF92czogc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgbGV0IGZNYXNrYTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyBUcmltIHRoZSBpbnB1dCB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgTXlWYWx1ZSA9IE15VmFsdWUhLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGxfdnMgPSBNeVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gSWYgdGhlIGxhc3QgY2hhcmFjdGVyIGlzICcqJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgaWYgKGxfdnMhLmNoYXJBdChsX3ZzIS5sZW5ndGggLSAxKSA9PT0gJyonKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gSWYgZk1hc2thIGlzIGZhbHNlLCBzaG93IGFuIGVycm9yIG1lc3NhZ2UgYW5kIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGlmICghZk1hc2thKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JUeXBlID0gXCJlcnJvclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSAnWmFkYW7DoSBob2Rub3RhIG9ic2FodWplIHpuYWsgKiwga3RlcsO9IG5lbsOtIHBvdm9sZW5vIHphZMOhdmF0ISdcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdGhpcy5zdG9wcGluZyA9IHRydWU7IC8vIGV2aWRlbmNlIGJ1ZGUgemFrw6F6w6FuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgJyonIGZvciBudW1iZXIgdmFsaWRhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGxfdnMgPSBsX3ZzLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmICghdGhhdC5pc1ZhbGlkTnVtYmVyKGxfdnMpICYmIGxfdnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHRoaXMuZXJyb3JUeXBlID0gXCJlcnJvclwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHRoaXMubWVzc2FnZSA9ICdDaHlibsSbIHZ5cGxuxJtuw6kgcG9sZSwgbXVzw60gYsO9dCB6YWRhbsOhIMSNw61zZWxuw6EgaG9kbm90YSEnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhpcy5zdG9wcGluZyA9IHRydWU7IC8vIGV2aWRlbmNlIGJ1ZGUgemFrw6F6w6FuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfSksXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy00XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zY3NzKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNzXCIsICAvL1NTIC0gU3BlY2lmaWNrw70gc3ltYm9sIC0gaWRlbnRpZmlrdWplIGEgcm96bGnFoXVqZSBwxZnDrWNob3rDrS9vZGNob3rDrSBwbGF0YnlcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5zcz12YWx1ZS5zc1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctNFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc2tvcygpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrc1wiLCAvL0tTIC0gS29uc3RhdG7DrSBzeW1ib2wgLSBpZGVudGlmaWt1amUgYSByb3psacWhdWplIHDFmcOtY2hvesOtL29kY2hvesOtIHBsYXRieVxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmtzPXZhbHVlLmtzXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIHZ5c3RhdmVuw60sc3BsYXRub3N0aVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3Z5c3RcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBcInJlcXVpcmVkXCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmRhdGVDaGFuZ2VIb2xkZXIgIT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3BvY2l0ZWpTcGxhdG5vc3QoXCJkYXRfdnlzdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3NwbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZGF0ZUNoYW5nZUhvbGRlciAhPSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zcG9jaXRlalNwbGF0bm9zdChcImRhdF9zcGxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCLEjMOhc3RrYSwgU3BsYXRub3N0XCIsIHJlcXVpcmVkOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfbWVuYVwiLCAvL8SMw6FzdGthIFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IFwicmVxdWlyZWRcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSwgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgfSkgLy8gQlVDRFBFUC5jXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNwbGF0bm9zdFwiLCBpbml0aWFsVmFsdWU6IDE1LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5kYXRlQ2hhbmdlSG9sZGVyICE9IHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNwb2NpdGVqU3BsYXRub3N0KFwic3BsYXRub3N0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBsYWJlbDogXCJFeHRlcm7DrSBzdWJqZWt0XCIsIG5hbWU6IFwiU2VjdGlvblBvdWthelBvemFkYXZla0VzdVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGV0YWlsXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHNfZXN1PWl4c19lc3U7ZXN1X2RpYz1kaWM7bW9kZWwubGljPXZhbHVlLmxpYzttb2RlbC5wb3JfemFzdD12YWx1ZS5wb3JfemFzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjdHgpIHsgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpIHptxJtuxJsgc3ViamVrdHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wb1ptZW5lU3ViamVrdHUoY3R4KTsgICAgICAgICAgICAgICAgICAgLy8gYWtjZSBwbyB6bcSbbsSbIHN1Ympla3R1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGplxaF0xJsgbmFzdGF2w61tIG9zdGF0bsOtIHBvbMOtxI1rYSBzcG9qZW7DoSBzIHBvcGxhdG7DrWtlbSAoRVNVKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LnZhbHVlLmljbykgdGhhdC5tb2RlbFBvdWthenUuaWNvID0gY3R4LnZhbHVlLmljbztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC52YWx1ZS5pY29fZXN1KSB0aGF0Lm1vZGVsUG91a2F6dS5pY29fZXN1ID0gY3R4LnZhbHVlLmljb19lc3U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHgudmFsdWUuYWNfZXN1KSB0aGF0Lm1vZGVsUG91a2F6dS5hY19lc3UgPSBjdHgudmFsdWUuYWNfZXN1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChjdHgudmFsdWUucmMpIHRoYXQubW9kZWxQb3VrYXp1LnJjID0gY3R4LnZhbHVlLnJjO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkVzdS5QcmVmYWJzLnZ5YmVyRXN1KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwOiBHb3JkaWMuRXN1Lkdsb2JhbHMuRW51bXMuVHlwWm9icmF6ZW5pS2Fyb3Rla2EuU2VsZWN0RXN1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dvdmFuaToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiB0aGF0Lkl4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlFc3VWSGxlZGFuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogdGhhdC5JeHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmlUeHQ6IFwiRGV0YWlsIHBvxb5hZGF2a3UgbmEgemFsb8W+ZW7DrSBwb3VrYXp1XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KSBhcyBHU2VsZWN0Qm94T3B0aW9uczxhbnk+KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkJhbmtvdm7DrSDDusSNZXQgY2l6w61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTEyXCIsIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5la29zdWNpKHtcclxuICAgICAgICAgICAgICAgICAgICBJeHA6IHRoYXQuSXhwID8/IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgQWt0Wm5hY2thOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlEb3RjZW5laG9TdWJqZWt0dVxyXG4gICAgICAgICAgICAgICAgfSkse1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImJ1X2NpXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQmFua292bsOtIMO6xI1ldCBjaXrDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2w71ixJtyIHDFmWVzIDMgdGXEjWt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c19lc3U9Pml4c19lc3U7YnVfY2k9YnVfY2k7c2tfY2k9c2tfY2lcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBtb2RlbCBwcm8gbmFwbG7Em27DrSBwb2zDrcSNa2EgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwianMtbmV2YWxpZG92YXRcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZ5bmVjaMOhIHZhbGlkYWNlIHByb3RpIERUT1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZpdHJ5IHBybyBzZXJ2ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaXhzX2VzdTogbmV3IEdvcmRpYy5Gb3Jtcy5EZXBlbmRlbmN5KFwiaXhzX2VzdVwiLCBcIml4c19lc3VcIiwgZmFsc2UsIHRydWUpLCAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7fVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBsYWJlbDogXCJQxZllZHBpc1wiLCBuYW1lOiBcIlNlY3Rpb25Qb3VrYXpQb3phZGF2ZWtQcmVkcGlzXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6YWxfcHJlZHBcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJTbsOtxb5pdCB2w73FoWkgcMWZZWRwaXN1IG5hIHDFmcOtcGFkdSBvIMSNw6FzdGt1IHBvdWthenVcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhhdC5FZGl0TW9kZSxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6ICF0aGF0LkVkaXRNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWVsZCA9IHRoYXQuZmluZEZpZWxkcyhcImt0Z191cG9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUElELCDFmMOhZC5wxZllZHBpc3VcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwgUHJlZmFicy5TdHJpbmcuaXhzKHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfcG96XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogXCJyZXF1aXJlZFwiLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyYWRla191aHJcIiwgLy8gxZjDoWRlayDDumhyYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLYXRlZ29yaWUgcG9oeWJ1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCBQcmVmYWJzLlNlbGVjdC5mdWNjdXBvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt0Z191cG9cIiwgLy9UeXAgcMWZZWRwaXN1XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwua3RnX3Vwbz12YWx1ZS5rdGdfdXBvO21vZGVsLmt0Z191cG9fdHh0PXZhbHVlLmt0Z191cG9fdHh0XCIsIC8vLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7a3RnX3Vwb30te2t0Z191cG9fdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogeyBrdGdfdXBvOiAxMDAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGt0Z191cG86IENvbW1vbi5CYXNlLm5hcGxuZW5pUG9sZSgwLCAxOTkpLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGF0LkVkaXRNb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0gPSAkLm5ld0RpdigvKklEKi8pLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIG1haW5Gb3JtKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1haW5Gb3JtOyAgICAgXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICAqIE1ldG9kYSBuYXN0YXZ1asOtY8OtIHBvbMOtxI1rbyBiYW5rb3Zuw61obyDDusSNdHUgcG8gem3Em27EmyBFU1VcclxuICAgICAgICAgICogQG1ldGhvZCBwb1ptZW5lU3ViamVrdHUoKVxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHBvWm1lbmVTdWJqZWt0dShjdHgpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHYgVEsgdG8gYnlsbyBOYWN0aUVzdUluZm9cclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBidWNpRmllbGQgPSB0aGF0LmZpbmRGaWVsZHMoXCJidV9jaVwiKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvbMOtxI1rbyBjaXrDqWhvIGJhbmtvdm7DrWhvIMO6xI10dVxyXG5cclxuICAgICAgICAgICAgaWYgKGJ1Y2lGaWVsZC5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiKSA9PSBmYWxzZSkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBqZSBwb2zDrcSNa28gZWRpdG92YXRlbG7DqVxyXG4gICAgICAgICAgICAgICAgaWYgKGN0eC52YWx1ZSAhPT0gbnVsbCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbsSbamFrw70gc3ViamVrdCBqZSB2eWJyw6FuXHJcbiAgICAgICAgICAgICAgICAgICAgYnVjaUZpZWxkLmdmaWVsZChcIm9wdGlvblwiLCBcInNlcnZlckZpbHRlcnNcIiwgeyBpeHNfZXN1OiBjdHgudmFsdWUuaXhzX2VzdSB9KTsgICAgLy8gbsOhaHJhZGEgemEgZGVwZW5kZW5jeSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGVsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN1Ympla3QgamUgcHLDoXpkbsO9XHJcbiAgICAgICAgICAgICAgICAgICAgYnVjaUZpZWxkLmdmaWVsZChcIm9wdGlvblwiLCBcInNlcnZlckZpbHRlcnNcIiwgeyBpeHNfZXN1OiBudWxsIH0pOyAgICAgICAgICAgICAgICAgLy8gbsOhaHJhZGEgemEgZGVwZW5kZW5jeSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYnVjaUZpZWxkLmdmaWVsZChcImdldFNlcnZlckZpbHRlcnNcIikudGhlbigoc2YpID0+IHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemppxaF0xJtuw60gYWt0dcOhbG7DrWNoIHNlcnZlcm92w71jaCBmaWx0csWvIChwcm9taXNlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5SZWFkZXJzLkVrb3N1Y2koKS5nZXREYXRhKHNmKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnLDoWNlbsOtIGhvZG5vdCBwb2zDrcSNa2EgcyBha3R1w6FsbsOtbWkgc2VydmVyb3bDvW1pIGZpbHRyeVxyXG4gICAgICAgICAgICB9KS50aGVuKChidWNpKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG8gdnLDoWNlbsOtXHJcbiAgICAgICAgICAgICAgICBpZiAoYnVjaS5sZW5ndGggPT09IDEpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBleGlzdHVqZSBqZWRuYSB2csOhY2Vuw6EgaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgIGJ1Y2lGaWVsZC5nZmllbGQoXCJzZXRWYWx1ZVwiLCBidWNpWzBdKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkb3BsbsOtbSBqw60gZG8gcG9sw63EjWthXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGJ1Y2lGaWVsZC5nZmllbGQoXCJjbGVhclwiKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4aXN0dWplIHbDrWNlIG5lYm8gxb7DoWRuw6EgaG9kbm90YSwgdGFrIMO6xI1ldCB2eW1hxb51XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzcG9jaXRlalNwbGF0bm9zdChmaWVsZDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmRhdGVDaGFuZ2VIb2xkZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICB2YXIgc3BsYXRub3N0ID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJzcGxhdG5vc3RcIikuZ2ZpZWxkPG51bWJlcj4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIGRhdF92eXN0ID0gdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJkYXRfdnlzdFwiKS5nZmllbGQ8RGF0ZT4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIGRhdF9zcGwgPSB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImRhdF9zcGxcIikuZ2ZpZWxkPERhdGU+KFwiZ2V0VmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmllbGQgPT0gXCJkYXRfdnlzdFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0X3Z5c3QgIT0gbnVsbCAmJiBkYXRfc3BsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInNwbGF0bm9zdFwiKS5nZmllbGQ8bnVtYmVyPihcInNldFZhbHVlXCIsIHRoYXQuZ2V0RGF5c0JldHdlZW5EYXRlcyhkYXRfc3BsLCBkYXRfdnlzdCksIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHNwbGF0bm9zdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJkYXRfc3BsXCIpLmdmaWVsZDxEYXRlPihcInNldFZhbHVlXCIsIHRoYXQuYWRkRGF5cyhkYXRfdnlzdCwgc3BsYXRub3N0KSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGZpZWxkID09IFwiZGF0X3NwbFwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0X3Z5c3QgIT0gbnVsbCAmJiBkYXRfc3BsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInNwbGF0bm9zdFwiKS5nZmllbGQ8bnVtYmVyPihcInNldFZhbHVlXCIsIHRoYXQuZ2V0RGF5c0JldHdlZW5EYXRlcyhkYXRfc3BsLCBkYXRfdnlzdCksIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHNwbGF0bm9zdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoXCJkYXRfdnlzdFwiKS5nZmllbGQ8RGF0ZT4oXCJzZXRWYWx1ZVwiLCB0aGF0LnN1YnRyYWN0RGF5cyhkYXRfc3BsLCBzcGxhdG5vc3QpLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7IC8vIHNwbGF0bm9zdFxyXG4gICAgICAgICAgICAgICAgaWYgKHNwbGF0bm9zdCAhPSBudWxsICYmIGRhdF92eXN0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcImRhdF9zcGxcIikuZ2ZpZWxkPERhdGU+KFwic2V0VmFsdWVcIiwgdGhhdC5hZGREYXlzKGRhdF92eXN0LCBzcGxhdG5vc3QpLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0LmRhdGVDaGFuZ2VIb2xkZXIgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0RGF5c0JldHdlZW5EYXRlcyhkYXRlMTogRGF0ZSwgZGF0ZTI6IERhdGUpOiBudW1iZXIge1xyXG4gICAgICAgICAgICBjb25zdCBvbmVEYXlNcyA9IDEwMDAgKiA2MCAqIDYwICogMjQ7IC8vIHBvxI1ldCBtaWxpc2VrdW5kIHphIGplZGVuIGRlblxyXG4gICAgICAgICAgICAvLyBaw61za8OhbWUgcm96ZMOtbCB2IG1pbGlzZWt1bmTDoWNoXHJcbiAgICAgICAgICAgIGNvbnN0IGRpZmZNcyA9IE1hdGguYWJzKGRhdGUyLmdldFRpbWUoKSAtIGRhdGUxLmdldFRpbWUoKSk7XHJcbiAgICAgICAgICAgIC8vIFZyw6F0w61tZSBwb8SNZXQgZG7DrSAoemFva3JvdWhsZW7DvSBkb2zFrylcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoZGlmZk1zIC8gb25lRGF5TXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhZGREYXlzKGRhdGU6IERhdGUsIGRheXM6IG51bWJlcik6IERhdGUge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBuZXcgRGF0ZShkYXRlKTsgLy8gdnl0dm/FmcOtbWUga29waWkgcMWvdm9kbsOtaG8gZGF0YVxyXG4gICAgICAgICAgICByZXN1bHQuc2V0RGF0ZShyZXN1bHQuZ2V0RGF0ZSgpICsgZGF5cyk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1YnRyYWN0RGF5cyhkYXRlOiBEYXRlLCBkYXlzOiBudW1iZXIpOiBEYXRlIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IERhdGUoZGF0ZSk7IC8vIHZ5dHZvxZnDrW1lIGtvcGlpIHDFr3ZvZG7DrWhvIGRhdGFcclxuICAgICAgICAgICAgcmVzdWx0LnNldERhdGUocmVzdWx0LmdldERhdGUoKSAtIGRheXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb24gUyBFIFMgVCBBIFYgRSBOIMONICAgTyBLIE4gQVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gTiBBIMSMIFQgRSBOIMONICAgRCBBIFRcclxuICAgICAgICBuYWN0aURhdGEoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiTmHEjcOtdMOhbSBkYXRhLi4uXCIpXHJcbiAgICAgICAgICAgIGlmICh0aGF0LkVkaXRNb2RlICYmIHRoYXQuSWRUZW0ubGVuZ3RoID09IDEyKSB7IC8vIHBva3VkIGplIGVkaXRhY2UgcyBcInZhbGlkbsOtbVwiIElkVGVtLCBwYWsgbmHEjXR1IGRhdGEgcG91a2F6dVxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkUG91a2F6UG96YWRhdmVrLnJlYWQocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19zdGU6IHRoYXQuSXhzU3RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRfdGVtOiB0aGF0LklkVGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsUG91a2F6dSA9IGRhdGEuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZEYXRhKGRhdGEuZGF0YSwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbCgoeGhyLCB0eXBlLCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iai5EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5nZXRBY3Rpb25zKCkuZmluZChlID0+IGUubmFtZSA9PSBcImFjdFNhdmVcIik/LmVuYWJsZWQoZmFsc2UpOyAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIG9iai5iYXNlTWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5QcmlwYWRQb3VrYXpQb3phZGF2ZWsubmFjdGlJbmZvUHJlZHBpcyh7IGl4cDogdGhhdC5JeHAsIGlkVGVtOiB0aGF0LklkVGVtIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZEYXRhKG51bGwsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmZhaWwoKHhociwgdHlwZSwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvYmouRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuYWN0aW9ucy5nZXRBY3Rpb25zKCkuZmluZChlID0+IGUubmFtZSA9PSBcImFjdFNhdmVcIik/LmVuYWJsZWQoZmFsc2UpOyAvLy8vLy8gICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIG9iai5iYXNlTWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIGppbmFrIHNlIG5hc3RhdmkgZGVmYXVsdCBob2Rub3R5IGRsZSBwcmlwYWR1IEREUFxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkUG91a2F6UG96YWRhdmVrLmluaWNpYWxpemFjZVByaXBhZHUoeyBpeHA6IHRoYXQuSXhwIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbFBvdWthenUuaXhzX2VzdSA9IGRhdGEuaXhzX2VzdTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbFBvdWthenUudnMgPSBkYXRhLnZzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsUG91a2F6dS5rcyA9IGRhdGEua3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxQb3VrYXp1LnNzID0gZGF0YS5zcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbFBvdWthenUuYnVfdmwgPSBkYXRhLmJ1X3ZsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsUG91a2F6dS5za192bCA9IGRhdGEuc2tfdmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxQb3VrYXp1LmJ1X2NpID0gZGF0YS5idV9jaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5tb2RlbFBvdWthenUuc2tfY2kgPSBkYXRhLnNrX2NpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsUHJlZHBpc3UuaXhwID0gZGF0YS5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxQcmVkcGlzdS52cyA9IGRhdGEudnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxQcmVkcGlzdS5rcyA9IGRhdGEua3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxQcmVkcGlzdS5zcyA9IGRhdGEuc3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxQcmVkcGlzdS5wb3BpcyA9IGRhdGEucG9waXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxQcmVkcGlzdS5idV92bCA9IGRhdGEuYnVfdmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxQcmVkcGlzdS5za192bCA9IGRhdGEuc2tfdmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxQcmVkcGlzdS5idV9jaSA9IGRhdGEuYnVfY2k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxQcmVkcGlzdS5za19jaSA9IGRhdGEuc2tfY2k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxQcmVkcGlzdS56cCA9IGRhdGEuenA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxQcmVkcGlzdS5peHNfZXN1ID0gZGF0YS5peHNfZXN1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdkRhdGEodGhhdC5tb2RlbFBvdWthenUsIHRoYXQubW9kZWxQcmVkcGlzdSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbCgoeGhyLCB0eXBlLCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iai5EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5nZXRBY3Rpb25zKCkuZmluZChlID0+IGUubmFtZSA9PSBcImFjdFNhdmVcIik/LmVuYWJsZWQoZmFsc2UpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIG9iai5iYXNlTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5hc3RhdkRhdGEocG91a2F6OiBEZHAuSW50ZXJmYWNlLkxLLklzbC5HUHJpcGFkUG91a2F6UG96YWRhdmVrRHRvIHwgbnVsbCwgcHJlZHBpczogRGRwLkludGVyZmFjZS5MSy5Jc2wuR1ByZWRwaXNEdG8gfCBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzXHJcbiAgICAgICAgICAgIGlmIChwb3VrYXogIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgcG91a2F6LCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsIHRoYXQudmFsaWRhdG9ycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByZWRwaXMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSEuZmluZEZpZWxkcyhcIml4cF9wb3pcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcHJlZHBpcy5peHAsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJyYWRla191aHJcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcHJlZHBpcy5yYWRla191aHIsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0hLmZpbmRGaWVsZHMoXCJrdGdfdXBvXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBrdGdfdXBvOiBwcmVkcGlzLmt0Z191cG8gfSwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhhdC5FZGl0TW9kZSB8fCB0aGF0LklkVGVtLmxlbmd0aCAhPSAxMikge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5uYWN0aUluaXREYXRhS25paHkoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQubmFjdGlJbml0RGF0YVNhYmxvbnkoKTtcclxuICAgICAgICAgICAgICAgIHRoYXQubmFjdGlJbml0RGF0YVR5cHVEb2tsYWR1KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbmFjdGlJbml0RGF0YUtuaWh5KCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3Qga25paGFGaWVsZCA9IHRoYXQuZmluZEZpZWxkcyhcIml4cF9kZW5cIik7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2zDrcSNa28gS25paGFcclxuICAgICAgICAgICAgaWYgKGtuaWhhRmllbGQuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIikgPT0gZmFsc2UpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIGplIHBvbMOtxI1rbyBlZGl0b3ZhdGVsbsOpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ga25paGFGaWVsZC5nZmllbGQoXCJnZXRTZXJ2ZXJGaWx0ZXJzXCIpLnRoZW4oKHNmKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gemppxaF0xJtuw60gYWt0dcOhbG7DrWNoIHNlcnZlcm92w71jaCBmaWx0csWvIChwcm9taXNlKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhdGEuUmVhZGVycy5Qb3VzZGVuKCkuZ2V0RGF0YShzZiwgdm9pZCAwLCB0aGF0KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2csOhY2Vuw60gaG9kbm90IHBvbMOtxI1rYSBzIGFrdHXDoWxuw61taSBzZXJ2ZXJvdsO9bWkgZmlsdHJ5XHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKChpeHBEZW4pID0+IHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvIHZyw6FjZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpeHBEZW4ubGVuZ3RoID4gMCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2t1ZCBleGlzdHVqZSBtaW5pbcOhbG7EmyBqZWRuYSB2csOhY2Vuw6EgaG9kbm90YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrbmloYUZpZWxkLmdmaWVsZChcInNldEluaXRpYWxcIiwgaXhwRGVuWzBdKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvcGxuw61tIGrDrSBkbyBwb2zDrcSNa2FcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGtuaWhhRmllbGQuZ2ZpZWxkKFwiY2xlYXJcIik7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBleGlzdHVqZSB2w61jZSBuZWJvIMW+w6FkbsOhIGhvZG5vdGEsIHRhayBwb2zDrcSNa28gdnltYcW+dVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpeHBEZW4ubGVuZ3RoID4gMDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2csOhY2Vuw60gYm9vbGVhbiwgemRhIGV4aXN0dWplIGFzcG/FiCBqZWRuYSBrbmloYVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgbmFjdGlJbml0RGF0YVNhYmxvbnkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBzYWJsb25hRmllbGQgPSB0aGF0LmZpbmRGaWVsZHMoXCJpeHNfc3RlXCIpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvbMOtxI1rbyDFoGFibG9uYVxyXG4gICAgICAgICAgICBpZiAoc2FibG9uYUZpZWxkLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIpID09IGZhbHNlKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgamUgcG9sw63EjWtvIGVkaXRvdmF0ZWxuw6lcclxuICAgICAgICAgICAgICAgIHJldHVybiBzYWJsb25hRmllbGQuZ2ZpZWxkKFwiZ2V0U2VydmVyRmlsdGVyc1wiKS50aGVuKChzZikgPT4geyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6amnFoXTEm27DrSBha3R1w6FsbsOtY2ggc2VydmVyb3bDvWNoIGZpbHRyxa8gKHByb21pc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5SZWFkZXJzLlBvdXNzdGUoKS5nZXREYXRhKHNmLCB2b2lkIDAsIHRoYXQpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZyw6FjZW7DrSBob2Rub3QgcG9sw63EjWthIHMgYWt0dcOhbG7DrW1pIHNlcnZlcm92w71taSBmaWx0cnlcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKGl4c1N0ZSkgPT4geyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG8gdnLDoWNlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl4c1N0ZS5sZW5ndGggPiAwKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIGV4aXN0dWplIG1pbmltw6FsbsSbIGplZG5hIHZyw6FjZW7DoSBob2Rub3RhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhYmxvbmFGaWVsZC5nZmllbGQoXCJzZXRJbml0aWFsXCIsIGl4c1N0ZVswXSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG9wbG7DrW0gasOtIGRvIHBvbMOtxI1rYVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Ugc2FibG9uYUZpZWxkLmdmaWVsZChcImNsZWFyXCIpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4aXN0dWplIHbDrWNlIG5lYm8gxb7DoWRuw6EgaG9kbm90YSwgdGFrIHBvbMOtxI1rbyB2eW1hxb51XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl4c1N0ZS5sZW5ndGggPiAwOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZyw6FjZW7DrSBib29sZWFuLCB6ZGEgZXhpc3R1amUgYXNwb8WIIGplZG5hIGtuaWhhXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBuYWN0aUluaXREYXRhVHlwdURva2xhZHUoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBUeXBEb2tsYWR1RmllbGQgPSB0aGF0LmZpbmRGaWVsZHMoXCJpeHNfdHlwXCIpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvbMOtxI1rbyBUeXAgZG9rbGFkdVxyXG4gICAgICAgICAgICBpZiAoVHlwRG9rbGFkdUZpZWxkLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIpID09IGZhbHNlKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgamUgcG9sw63EjWtvIGVkaXRvdmF0ZWxuw6lcclxuICAgICAgICAgICAgICAgIHJldHVybiBUeXBEb2tsYWR1RmllbGQuZ2ZpZWxkKFwiZ2V0U2VydmVyRmlsdGVyc1wiKS50aGVuKChzZikgPT4geyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6amnFoXTEm27DrSBha3R1w6FsbsOtY2ggc2VydmVyb3bDvWNoIGZpbHRyxa8gKHByb21pc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5SZWFkZXJzLlNzbHN0eXAoKS5nZXREYXRhKHNmLCB2b2lkIDAsIHRoYXQpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZyw6FjZW7DrSBob2Rub3QgcG9sw63EjWthIHMgYWt0dcOhbG7DrW1pIHNlcnZlcm92w71taSBmaWx0cnlcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKGl4c1R5cCkgPT4geyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG8gdnLDoWNlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl4c1R5cC5sZW5ndGggPiAwKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIGV4aXN0dWplIG1pbmltw6FsbsSbIGplZG5hIHZyw6FjZW7DoSBob2Rub3RhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR5cERva2xhZHVGaWVsZC5nZmllbGQoXCJzZXRJbml0aWFsXCIsIGl4c1R5cFswXSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG9wbG7DrW0gasOtIGRvIHBvbMOtxI1rYVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgVHlwRG9rbGFkdUZpZWxkLmdmaWVsZChcImNsZWFyXCIpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4aXN0dWplIHbDrWNlIG5lYm8gxb7DoWRuw6EgaG9kbm90YSwgdGFrIHBvbMOtxI1rbyB2eW1hxb51XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl4c1R5cC5sZW5ndGggPiAwOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZyw6FjZW7DrSBib29sZWFuLCB6ZGEgZXhpc3R1amUgYXNwb8WIIGplZG5hIGtuaWhhXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb24gTiBBIMSMIFQgRSBOIMONICAgRCBBIFRcclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIEEgQyBUIEkgTyBOIFMgLSBWIFkgVCBWIE8gxZggRSBOIMONICBBICBEIEUgRiBJIE4gSSBDIEVcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZw60gYWN0aW9uIGxpc3QgYSBqZWRub3RsaXbDqSBha2NlXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVBY3Rpb25zKClcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH0gLSBVa29uxI1lbsOtIG1ldG9keSB2b2lkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFphdnJpdFBvdG9ta3lDb250ZW50dVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHVsb8W+ZW7DrSBkYXQgeiBvYnNhaHUgXHJcbiAgICAgICAgICogQG1ldGhvZCB1bG96aXQoKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPHZvaWQ+fSAtIFZyYWPDrSBwcm9taXNlIDxVa29uxI1lbsOtIG1ldG9keSB2b2lkPlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHVsb3ppdCgpOiBKUXVlcnlQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7ICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUSElTXHJcbiAgICAgICAgICAgIGNvbnN0IGZybSA9IHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKTsgICAgICAgLy8gcmVmZXJlbmNlIG5hIGZvcm11bMOhxZlcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQ8dm9pZD4oKTsgICAgICAgICAgICAgICAvLyBWeXR2b8WZZW7DrSBwcm9taXN1XHJcbiAgICAgICAgICAgIHZhciBjaHlibmFLb250cm9sYTogYm9vbGVhbiA9IGZhbHNlOyAgICAgICAgLy8gUG9tb2Nuw6EgcHJvbS4gcHJvIGtvbnRyb2x1IGNoeWIgIFxyXG4gICAgICAgICAgICBmcm0uZmluZEZpZWxkcygpLmdmaWVsZCgncmVzZXRFcnJvcnMnKTsgICAgIC8vIFZ5cmVzZXR1anUgY2h5YnkgbmEgZm9ybXVsw6HFmWlcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIktvbnRyb2x1amkgZGF0YS4uLlwiKSBcclxuICAgICAgICAgICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIC8vIGtvbnRyb2xhIHZhbGlkYWNlIGZvcm11bMOhxZllIC0gemFrb21lbnRvdm7DoSBwcm90b8W+ZSB2YWxpZHVqZSBpIGJ1X2NpXHJcbiAgICAgICAgICAgIC8vaWYgKCFmcm0uZ2Zvcm0oXCJpc1ZhbGlkXCIpKSB7XHJcbiAgICAgICAgICAgIC8vICAgIGNoeWJuYUtvbnRyb2xhID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgLy8gICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICAvLyBzZWJyw6Fuw60gaG9kbm90IHogZm9ybXVsw6HFmWVcclxuICAgICAgICAgICAgbGV0IGZvcm1EYXRhOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGZvcm1EYXRhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIHprb250cm9sdWppIHZzdHVwbsOtIGRhdGEgamFrbyB2IGd1cHTEm1xyXG4gICAgICAgICAgICAvLz8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAgICAgaWYgKGZvcm1EYXRhLml4cF9kZW4gPT0gbnVsbCB8fCBmb3JtRGF0YS5peHBfZGVuPy50cmltKCkubGVuZ3RoICE9IDEyKSB7XHJcbiAgICAgICAgICAgICAgICBjaHlibmFLb250cm9sYSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgZnJtLmZpbmRGaWVsZHMoXCJpeHBfZGVuXCIpLmdmaWVsZChcInNldEVycm9yXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlBvdmlubsOhIHBvbG/FvmthIVwiLCAvLyBjdXN0b21pem92YXRlbG7DvSB0ZXh0IGNoeWJ5IChwb3XFvsOtdmF0IHBvdXplIHbDvWppbWXEjW7EmyEpIFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZTogXCJlcnJvclwiLCAvLyB0eXAgY2h5YnkgKGVycm9yLCB3YXJuaW5nLCBpbmZvKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBmcm0uZmluZEZpZWxkcyhcIml4cF9kZW5cIikuZ2ZpZWxkKCdmb2N1cycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIGlmIChmb3JtRGF0YS5peHNfc3RlID09IG51bGwgfHwgZm9ybURhdGEuaXhzX3N0ZT8udHJpbSgpLmxlbmd0aCAhPSAxMikge1xyXG4gICAgICAgICAgICAgICAgY2h5Ym5hS29udHJvbGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGZybS5maW5kRmllbGRzKFwiaXhzX3N0ZVwiKS5nZmllbGQoXCJzZXRFcnJvclwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJQb3Zpbm7DoSBwb2xvxb5rYSFcIiwgLy8gY3VzdG9taXpvdmF0ZWxuw70gdGV4dCBjaHlieSAocG91xb7DrXZhdCBwb3V6ZSB2w71qaW1lxI1uxJshKSBcclxuICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGU6IFwiZXJyb3JcIiwgLy8gdHlwIGNoeWJ5IChlcnJvciwgd2FybmluZywgaW5mbylcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZnJtLmZpbmRGaWVsZHMoXCJpeHNfc3RlXCIpLmdmaWVsZCgnZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIGlmIChmb3JtRGF0YS5peHNfdHlwID09IG51bGwgfHwgZm9ybURhdGEuaXhzX3R5cD8udHJpbSgpLmxlbmd0aCAhPSAxMikge1xyXG4gICAgICAgICAgICAgICAgY2h5Ym5hS29udHJvbGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGZybS5maW5kRmllbGRzKFwiaXhzX3R5cFwiKS5nZmllbGQoXCJzZXRFcnJvclwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJQb3Zpbm7DoSBwb2xvxb5rYSFcIiwgLy8gY3VzdG9taXpvdmF0ZWxuw70gdGV4dCBjaHlieSAocG91xb7DrXZhdCBwb3V6ZSB2w71qaW1lxI1uxJshKSBcclxuICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGU6IFwiZXJyb3JcIiwgLy8gdHlwIGNoeWJ5IChlcnJvciwgd2FybmluZywgaW5mbylcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZnJtLmZpbmRGaWVsZHMoXCJpeHNfdHlwXCIpLmdmaWVsZCgnZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIGlmIChmb3JtRGF0YS5peHNfZXN1ID09IG51bGwgfHwgZm9ybURhdGEuaXhzX2VzdT8udHJpbSgpLmxlbmd0aCAhPSAxMiB8fCBmb3JtRGF0YS5peHNfZXN1ID09IERkcC5XZWJDbGllbnQuQ29tbW9uLkdsb2JhbHMuc2dOdWxsLk51bGxFc3UpIHtcclxuICAgICAgICAgICAgICAgIGNoeWJuYUtvbnRyb2xhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBmcm0uZmluZEZpZWxkcyhcIml4c19lc3VcIikuZ2ZpZWxkKFwic2V0RXJyb3JcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiUG92aW5uw6EgcG9sb8W+a2EhXCIsIC8vIGN1c3RvbWl6b3ZhdGVsbsO9IHRleHQgY2h5YnkgKHBvdcW+w612YXQgcG91emUgdsO9amltZcSNbsSbISkgXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlOiBcImVycm9yXCIsIC8vIHR5cCBjaHlieSAoZXJyb3IsIHdhcm5pbmcsIGluZm8pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGZybS5maW5kRmllbGRzKFwiaXhzX2VzdVwiKS5nZmllbGQoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICBpZiAoZm9ybURhdGEuaXhwX3BveiA9PSBudWxsIHx8IGZvcm1EYXRhLml4cF9wb3o/LnRyaW0oKS5sZW5ndGggIT0gMTIpIHtcclxuICAgICAgICAgICAgICAgIGNoeWJuYUtvbnRyb2xhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBmcm0uZmluZEZpZWxkcyhcIml4cF9wb3pcIikuZ2ZpZWxkKFwic2V0RXJyb3JcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiUG92aW5uw6EgcG9sb8W+a2EhXCIsIC8vIGN1c3RvbWl6b3ZhdGVsbsO9IHRleHQgY2h5YnkgKHBvdcW+w612YXQgcG91emUgdsO9amltZcSNbsSbISkgXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlOiBcImVycm9yXCIsIC8vIHR5cCBjaHlieSAoZXJyb3IsIHdhcm5pbmcsIGluZm8pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGZybS5maW5kRmllbGRzKFwiaXhwX3BvelwiKS5nZmllbGQoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICBpZiAoZm9ybURhdGEuY19tZW5hID09IG51bGwgfHwgZm9ybURhdGEuY19tZW5hID09IDApIHtcclxuICAgICAgICAgICAgICAgIGNoeWJuYUtvbnRyb2xhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBmcm0uZmluZEZpZWxkcyhcImNfbWVuYVwiKS5nZmllbGQoXCJzZXRFcnJvclwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJaYWRhbsOhIMSNw6FzdGthIG5lc23DrSBiw710IG51bG92w6EhXCIsIC8vIGN1c3RvbWl6b3ZhdGVsbsO9IHRleHQgY2h5YnkgKHBvdcW+w612YXQgcG91emUgdsO9amltZcSNbsSbISkgXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlOiBcImVycm9yXCIsIC8vIHR5cCBjaHlieSAoZXJyb3IsIHdhcm5pbmcsIGluZm8pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGZybS5maW5kRmllbGRzKFwiY19tZW5hXCIpLmdmaWVsZCgnZm9jdXMnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgICAgIGlmIChmb3JtRGF0YS5idV92bD8udHJpbSgpLmxlbmd0aCA9PSAwIHx8IGZvcm1EYXRhLmJ1X3ZsID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNoeWJuYUtvbnRyb2xhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBmcm0uZmluZEZpZWxkcyhcImJ1X3ZsXCIpLmdmaWVsZChcInNldEVycm9yXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIk5lbsOtIHZ5YnLDoW4gdmxhc3Ruw60gYmFua292bsOtIMO6xI1ldCFcIiwgLy8gY3VzdG9taXpvdmF0ZWxuw70gdGV4dCBjaHlieSAocG91xb7DrXZhdCBwb3V6ZSB2w71qaW1lxI1uxJshKSBcclxuICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGU6IFwiZXJyb3JcIiwgLy8gdHlwIGNoeWJ5IChlcnJvciwgd2FybmluZywgaW5mbylcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZnJtLmZpbmRGaWVsZHMoXCJidV92bFwiKS5nZmllbGQoJ2ZvY3VzJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vPy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiTmFzdGF2dWppIGRhdGEgcHJvIHVsb8W+ZW7DrS4uLlwiKVxyXG4gICAgICAgICAgICAvLyFOYWN0ZW5pIHBvZGtsYWR1IHBybyBwb3VrYXpcclxuICAgICAgICAgICAgdGhhdC5tb2RlbFBvdWthenUuaXhwX2RlbiA9IGZvcm1EYXRhLml4cF9kZW47ICAgICAgICAgICAvL2NtYl9rbmloYS5DdGlQb2xvemt1UygxKVxyXG4gICAgICAgICAgICB0aGF0Lm1vZGVsUG91a2F6dS5peHNfc3RlID0gZm9ybURhdGEuaXhzX3N0ZTsgICAgICAgICAgIC8vY21iX3NhYmxvbmEuQ3RpUG9sb3prdVMoMSlcclxuXHRcdCAgICB0aGF0Lm1vZGVsUG91a2F6dS5peHNfdHlwID0gZm9ybURhdGEuaXhzX3R5cDsgICAgICAgICAgIC8vY21iX2l4c190eXAuQ3RpUG9sb3prdVMoMSlcclxuICAgICAgICAgICAgdGhhdC5tb2RlbFBvdWthenUuaXhzX2VzdSA9IGZvcm1EYXRhLml4c19lc3U7ICAgICAgICAgICAvL3hUT0RPOlNldCBwb3VrYXouaXhzX2VzdSA9IGRmX2ljb19lc3UuaXhzX2VzdVxyXG5cdFx0ICAgIHRoYXQubW9kZWxQb3VrYXp1LnBvcGlzID0gZm9ybURhdGEucG9waXM7ICAgICAgICAgICAgICAgLy9kZl9wb3Bpc1xyXG5cdFx0ICAgIHRoYXQubW9kZWxQb3VrYXp1LnZzID0gZm9ybURhdGEudnM7ICAgICAgICAgICAgICAgICAgICAgLy9kZl92c1xyXG5cdFx0ICAgIHRoYXQubW9kZWxQb3VrYXp1LnNzID0gZm9ybURhdGEuc3M7ICAgICAgICAgICAgICAgICAgICAgLy9kZl9zc1xyXG5cdFx0ICAgIHRoYXQubW9kZWxQb3VrYXp1LmtzID0gZm9ybURhdGEua3M7ICAgICAgICAgICAgICAgICAgICAgLy9kZl9rc1xyXG5cdFx0ICAgIHRoYXQubW9kZWxQb3VrYXp1LmJ1X3ZsID0gZm9ybURhdGEuYnVfdmw7ICAgICAgICAgICAgICAgLy9kZl9idV92bFxyXG5cdFx0ICAgIHRoYXQubW9kZWxQb3VrYXp1LnNrX3ZsID0gZm9ybURhdGEuc2tfdmw7ICAgICAgICAgICAgICAgLy9kZl9za192bFxyXG5cdFx0ICAgIHRoYXQubW9kZWxQb3VrYXp1LmJ1X2NpID0gZm9ybURhdGEuYnVfY2k7ICAgICAgICAgICAgICAgLy9kZl9idV9jaVxyXG5cdFx0ICAgIHRoYXQubW9kZWxQb3VrYXp1LnNrX2NpID0gZm9ybURhdGEuc2tfY2k7ICAgICAgICAgICAgICAgLy9kZl9za19jaVxyXG5cdFx0ICAgIHRoYXQubW9kZWxQb3VrYXp1LmRhdF9zcGwgPSBmb3JtRGF0YS5kYXRfc3BsOyAgICAgICAgICAgLy9kZl9kYXRfc3BsLkRhdHVtKClcclxuXHRcdCAgICB0aGF0Lm1vZGVsUG91a2F6dS5kYXRfdnlzdCA9IGZvcm1EYXRhLmRhdF92eXN0OyAgICAgICAgIC8vZGZfZGF0X3Z5c3QuRGF0dW0oKVxyXG5cdFx0ICAgIHRoYXQubW9kZWxQb3VrYXp1LnNwbGF0bm9zdCA9IGZvcm1EYXRhLnNwbGF0bm9zdDsgICAgICAgLy9kZl9zcGxhdG5vc3QuQ2lzbG8oKVxyXG5cdFx0ICAgIHRoYXQubW9kZWxQb3VrYXp1LmNfbWVuYSA9IGZvcm1EYXRhLmNfbWVuYTsgICAgICAgICAgICAgLy9kZl9jX21lbmEuQ2lzbG8oKVxyXG4gICAgICAgICAgICAvLyFuYWN0ZW5pIHBvZGtsYWR1IHBybyBwcmVkcGlzXHJcbiAgICAgICAgICAgIC8vaWYgKHRoYXQubW9kZWxQb3VrYXp1LnphbF9wcmVkcCA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsUG91a2F6dS56YWxfcHJlZHAgPSBmb3JtRGF0YS56YWxfcHJlZHA7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsUG91a2F6dS5yYWRla191aHIgPSBmb3JtRGF0YS5yYWRla191aHI7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsUG91a2F6dS5rdGdfdXBvID0gZm9ybURhdGEua3RnX3VwbztcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIHRoYXQubW9kZWxQb3VrYXp1Lml4cF9wb3ogPSBmb3JtRGF0YS5peHBfcG96OyAgICAgICAgICAgLy9kZl9peHBfZGRwXHJcbiAgICAgICAgICAgIC8vXHJcblx0XHQgICAgLy90aGF0Lm1vZGVsUHJlZHBpc3UuaXhwID0gZm9ybURhdGEuaXhwICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXBfaXhwX2RkcFxyXG5cdFx0ICAgIC8vdGhhdC5tb2RlbFByZWRwaXN1LmMgPSBmb3JtRGF0YS5jX21lbmEgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIC1TYWxOdW1iZXJBYnMoZGZfY19tZW5hLkNpc2xvKCkpXHJcblx0XHQgICAgLy90aGF0Lm1vZGVsUHJlZHBpc3UuZGF0X3Z6bmlrdSA9IGZvcm1EYXRhLmRhdF92eXN0ICAgICAgICAgICAgICAgLy8gZGZfZGF0X3Z5c3QuRGF0dW0oKVxyXG5cdFx0ICAgIC8vdGhhdC5tb2RlbFByZWRwaXN1LmRhdF9zcGwgPSBmb3JtRGF0YS5kYXRfc3BsICAgICAgICAgICAgICAgICAgIC8vIGRmX2RhdF9zcGwuRGF0dW0oKVxyXG5cdFx0ICAgIC8vdGhhdC5tb2RlbFByZWRwaXN1LnZzID0gZm9ybURhdGEudnMgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRmX3ZzXHJcblx0XHQgICAgLy90aGF0Lm1vZGVsUHJlZHBpc3Uua3MgPSBmb3JtRGF0YS5rcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGZfa3NcclxuXHRcdCAgICAvL3RoYXQubW9kZWxQcmVkcGlzdS5zcyA9IGZvcm1EYXRhLnNzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZl9zc1xyXG4gICAgICAgICAgICAvL3RoYXQubW9kZWxQcmVkcGlzdS5wb3puYW1rYSA9ICdTbsOtxb5lbsOtIHbDvcWhZSBwxZllZHBpc3UgcG91a2F6ZW0nICAvLyAnU27DrcW+ZW7DrSB2w73FoWUgcMWZZWRwaXN1IHBvdWthemVtJ1xyXG5cdFx0ICAgIC8vdGhhdC5tb2RlbFByZWRwaXN1Lmt0Z191cG8gPSBmb3JtRGF0YS5rdGdfdXBvICAgICAgICAgICAgICAgICAgIC8vIGNtYl9rdGdfdXBvLkN0aVBvbG96a3VOKDEpXHJcblx0XHQgICAgLy90aGF0Lm1vZGVsUHJlZHBpc3UuYnVfdmwgPSBmb3JtRGF0YS5idV92bCAgICAgICAgICAgICAgICAgICAgICAgLy8gZGZfYnVfdmxcclxuXHRcdCAgICAvL3RoYXQubW9kZWxQcmVkcGlzdS5za192bCA9IGZvcm1EYXRhLnNrX3ZsICAgICAgICAgICAgICAgICAgICAgICAvLyBkZl9za192bFxyXG5cdFx0ICAgIC8vdGhhdC5tb2RlbFByZWRwaXN1LmRhdF96ZGFuID0gbnVsbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERBVEVUSU1FX051bGxcclxuXHRcdCAgICAvL3RoYXQubW9kZWxQcmVkcGlzdS5yb2tfZHBoID0gbnVsbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOVU1CRVJfTnVsbFxyXG5cdFx0ICAgIC8vdGhhdC5tb2RlbFByZWRwaXN1Lm1lc2ljX2RwaCA9IG51bGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5VTUJFUl9OdWxsXHJcblx0XHQgICAgLy90aGF0Lm1vZGVsUHJlZHBpc3UuY196MCA9IGZvcm1EYXRhLmNfbWVuYSAgICAgICAgICAgICAgICAgICAgICAgLy8gZGZfY19tZW5hLkNpc2xvKClcclxuXHRcdCAgICAvL3RoYXQubW9kZWxQcmVkcGlzdS5jX2QwID0gbmV3IERlY2ltYWwoMCkgICAgICAgICAgICAgICAgICAgICAgICAvLyAwXHJcblx0XHQgICAgLy90aGF0Lm1vZGVsUHJlZHBpc3UuY196MSA9IG5ldyBEZWNpbWFsKDApICAgICAgICAgICAgICAgICAgICAgICAgLy8gMFxyXG5cdFx0ICAgIC8vdGhhdC5tb2RlbFByZWRwaXN1LmNfZDEgPSBuZXcgRGVjaW1hbCgwKSAgICAgICAgICAgICAgICAgICAgICAgIC8vIDBcclxuXHRcdCAgICAvL3RoYXQubW9kZWxQcmVkcGlzdS5jX3oyID0gbmV3IERlY2ltYWwoMCkgICAgICAgICAgICAgICAgICAgICAgICAvLyAwXHJcblx0XHQgICAgLy90aGF0Lm1vZGVsUHJlZHBpc3UuY19kMiA9IG5ldyBEZWNpbWFsKDApICAgICAgICAgICAgICAgICAgICAgICAgLy8gMFxyXG5cdFx0ICAgIC8vdGhhdC5tb2RlbFByZWRwaXN1LmNfejMgPSBuZXcgRGVjaW1hbCgwKSAgICAgICAgICAgICAgICAgICAgICAgIC8vIDBcclxuXHRcdCAgICAvL3RoYXQubW9kZWxQcmVkcGlzdS5jX2QzID0gbmV3IERlY2ltYWwoMCkgICAgICAgICAgICAgICAgICAgICAgICAvLyAwXHJcblx0XHQgICAgLy90aGF0Lm1vZGVsUHJlZHBpc3UuY196NCA9IG5ldyBEZWNpbWFsKDApICAgICAgICAgICAgICAgICAgICAgICAgLy8gMFxyXG4gICAgICAgICAgICAvL3RoYXQubW9kZWxQcmVkcGlzdS5jX2Q0ID0gbmV3IERlY2ltYWwoMCkgICAgICAgICAgICAgICAgICAgICAgICAvLyAwXHJcbiAgICAgICAgICAgIC8vdGhhdC5tb2RlbFByZWRwaXN1LmNfemFvID0gbmV3IERlY2ltYWwoMCkgICAgICAgICAgICAgICAgICAgICAgIC8vIDBcclxuICAgICAgICAgICAgLy8vLyFpbmljaWFsaXphY2UgZGxlIHBhcmFtZXRydVxyXG5cdFx0ICAgIC8vaWYgKHRoYXQuUGFyYW1zLmRkcF9wb3Vfc3RhcHJlID09IDApICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSWYgZ2ZfSG9kbm90YVBhcmFtZXRydURCTignZGRwX3BvdV9zdGFwcmUnKSA9IDBcclxuICAgICAgICAgICAgLy8gICAgdGhhdC5tb2RlbFByZWRwaXN1LnN0YXZfdXpfcHIgPSAzMDAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgcHJlZHBpcy5zdGF2X3V6X3ByID0gMzAwXHJcbiAgICAgICAgICAgIC8vZWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vRWxzZVxyXG4gICAgICAgICAgICAvLyAgICB0aGF0Lm1vZGVsUHJlZHBpc3Uuc3Rhdl91el9wciA9IDEwMCAgICAgICAgICAgICAgICAgICAgICAgICAvL1NldCBwcmVkcGlzLnN0YXZfdXpfcHIgPSAxMDBcclxuXHRcdCAgICAvL3RoYXQubW9kZWxQcmVkcGlzdS5idV9jaSA9IGZvcm1EYXRhLmJ1X2NpXHJcblx0XHQgICAgLy90aGF0Lm1vZGVsUHJlZHBpc3Uuc2tfY2kgPSBmb3JtRGF0YS5za19jaVxyXG5cdFx0ICAgIC8vdGhhdC5tb2RlbFByZWRwaXN1LnpwID0gMjBcclxuICAgICAgICAgICAgLy90aGF0Lm1vZGVsUHJlZHBpc3UuaXhzX2VzdSA9IGZvcm1EYXRhLml4c19lc3UgICAgICAgICAgICAgICAgICAgLy9UT0RPOnBvdWthei5peHNfZXN1XHJcbiAgICAgICAgICAgIC8vdGhhdC5tb2RlbFByZWRwaXN1LnBvcGlzID0gZm9ybURhdGEucG9waXNcclxuICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJvcFNhdmVDb250ZW50TG9hZGluZ1wiLCB0ZXh0OiBcIlVrbMOhZMOhbS4uLlwiIH0pOyAvLyBab2JyYXplbsOtIGRpYWxvZ3UgcyBuYcSNw610w6Fuw61tXHJcbiAgICAgICAgICAgIGlmICghdGhhdC5FZGl0TW9kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkUG91a2F6UG96YWRhdmVrLm5vdnlQb3phZGF2ZWsoeyBkYXRhOiB0aGF0Lm1vZGVsUG91a2F6dSB9KS8vIFphdm9sw6Fuw60gSVNMIG1ldG9keSBrIHVsb8W+ZW7DrSBkYXQgbGjFr3R5XHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gViBwxZnDrXBhZMSbIMO6c3DEm2NodVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsUG91a2F6dSA9IHJldC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIm9wU2F2ZUNvbnRlbnRMb2FkaW5nXCIgfSk7ICAgICAgICAgICAgICAgLy8gVWtvbsSNZW7DrSBkaWFsb2d1IHMgbmHEjcOtdMOhbsOtbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZyYWPDrSBwcm9taXNlX3Jlc29sdmUgPSDDunNwxJtjaFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0eXAsIG9iaikgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gViBwxZnDrXBhZMSbIGNoeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwib3BTYXZlQ29udGVudExvYWRpbmdcIiB9KTsgICAgICAgICAgICAgICAvLyBVa29uxI1lbsOtIGRpYWxvZ3UgcyBuYcSNw610w6Fuw61tXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5CYXNlLmdldEZhaWxGcm9tSXNsUHJvbWlzZSh0aGF0LCBqcVhIUiwgdHlwLCBvYmopXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodHlwID09PSBcImV4Y2VwdGlvblwiKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gViBwxZnDrXBhZMSbIHbDvWppbWt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG9iai5oYW5kbGVkID0gdHJ1ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOYXN0YXZlbsOtIHbDvWppbWt5IGpha28gb8WhZXTFmWVuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgb2JqLmJhc2VNZXNzYWdlKSAgICAgICAgICAgICAgICAgLy8gWm9icmF6ZW7DrSBkaWFsb2d1IHMgY2h5Ym91XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4geyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBvIHphdsWZZW7DrSBkaWFsb2d1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWcmFjw60gcHJvbWlzZV9yZWplY3QgPSBjaHliYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Vsc2UgeyByZXR1cm4gZGVmLnJlamVjdCgpOyB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnJhY8OtIHByb21pc2VfcmVqZWN0ID0gY2h5YmEgKGkga2R5xb4gc2UgbmVqZWRuw6EgbyBvxaFldMWZZW5vdSB2eWrDrW1rdSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubW9kZWxQb3VrYXp1LmlkX3RlbSA9IHRoYXQuSWRUZW07XHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5QcmlwYWRQb3VrYXpQb3phZGF2ZWsudWxvelBvemFkYXZlayh7IGRhdGE6IHRoYXQubW9kZWxQb3VrYXp1IH0pLy8gWmF2b2zDoW7DrSBJU0wgbWV0b2R5IGsgdWxvxb5lbsOtIGRhdCBsaMWvdHlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWIHDFmcOtcGFkxJsgw7pzcMSbY2h1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWxQb3VrYXp1ID0gcmV0LmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwib3BTYXZlQ29udGVudExvYWRpbmdcIiB9KTsgICAgICAgICAgICAgICAvLyBVa29uxI1lbsOtIGRpYWxvZ3UgcyBuYcSNw610w6Fuw61tXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnJhY8OtIHByb21pc2VfcmVzb2x2ZSA9IMO6c3DEm2NoXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWIHDFmcOtcGFkxJsgY2h5YnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJvcFNhdmVDb250ZW50TG9hZGluZ1wiIH0pOyAgICAgICAgICAgICAgIC8vIFVrb27EjWVuw60gZGlhbG9ndSBzIG5hxI3DrXTDoW7DrW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgQ29tbW9uLkJhc2UuZ2V0RmFpbEZyb21Jc2xQcm9taXNlKHRoYXQsIGpxWEhSLCB0eXAsIG9iailcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh0eXAgPT09IFwiZXhjZXB0aW9uXCIpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWIHDFmcOtcGFkxJsgdsO9amlta3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgb2JqLmhhbmRsZWQgPSB0cnVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5hc3RhdmVuw60gdsO9amlta3kgamFrbyBvxaFldMWZZW7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBvYmouYmFzZU1lc3NhZ2UpICAgICAgICAgICAgICAgICAvLyBab2JyYXplbsOtIGRpYWxvZ3UgcyBjaHlib3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG8gemF2xZllbsOtIGRpYWxvZ3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZyYWPDrSBwcm9taXNlX3JlamVjdCA9IGNoeWJhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZWxzZSB7IHJldHVybiBkZWYucmVqZWN0KCk7IH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWcmFjw60gcHJvbWlzZV9yZWplY3QgPSBjaHliYSAoaSBrZHnFviBzZSBuZWplZG7DoSBvIG/FoWV0xZllbm91IHZ5asOtbWt1KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWcmFjw60gcHJvbWlzZVxyXG4gICAgICAgICAgICAvL3JldHVybiAkLkRlZmVycmVkPHZvaWQ+KCkucmVzb2x2ZSgpLnByb21pc2UoKTsgLy8gSmVzdGxpxb5lIG5lbsOtIHBvdMWZZWJhIHZvbGF0IElTTCBtZXRvZHUsIHZyYWPDrW0gemRlIHJvdm5vdSBwcm9taXNlICsgcmVzb2x2ZVxyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb24gQSBDIFQgSSBPIE4gUyAtIFYgWSBUIFYgTyDFmCBFIE4gw40gIEEgIEQgRSBGIEkgTiBJIEMgRVxyXG4gICAgfVxyXG59Il19