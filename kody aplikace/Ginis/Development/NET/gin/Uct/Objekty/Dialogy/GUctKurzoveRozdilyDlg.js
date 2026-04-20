"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Uct;
    (function (Uct) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            let GUctKurzoveRozdilyDlg = class GUctKurzoveRozdilyDlg extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.TypKurzovychRozdilu = 0 /* Interface.GETypKurzovychRozdilu.Zadny */;
                    this.logOptions = { name: "GUctKurzoveRozdilyDlg", authorCode: 302, file: "GUctKurzoveRozdilyDlg.ts" };
                    this.mapper = [{ id: 1, class: ".js-KZRV" }, { id: 2, class: ".js-OKZRV" },
                        { id: 3, class: ".js-KZRP" }, { id: 4, class: ".js-OKZRP" }, { id: 5, class: ".js-OKZ" }, {
                            id: 6, class: ".js-JV"
                        }
                    ];
                }
                //a: string;
                //public globals: Gordic.Uct.Interface.GUcGlobalDto;
                // ************************************************************************
                // Inicializace formuláře
                prepareContent(par) {
                    var that = this;
                    this.actionOk = new GAction({
                        name: "okAct", caption: GDlg.mbbOk.text, run: function () {
                            that.tryClose( /*that.getFormData()*/);
                        }
                    }); //RC 30250409 : OK
                    this.inputParams = par;
                    this.title = "jres:30250869"; //RC 30250869 : Kurzové rozdíly
                    // tlačítka do spodního pruhu
                    this.commandBar([
                        {
                            id: "idOK",
                            //customClass: "gi-tick",
                            favorite: true,
                            action: this.actionOk
                        },
                    ]);
                    //debugger;
                    //"L1M1S1, L-2-8-2, M-2-8-2, S-12-12-0"
                    var l_oForm = new Gordic.Forms.Form({ name: "formular", layoutDescriptor: "L1MS1, L-6-5-1, M-12-11-1, S-12-11-1" })
                        .addSection()
                        .addRow({ label: "jres:30250428", customClass: "js-KZRV" }) //RC 30250428 : Účtuje se o kurzové ztrátě při realizaci výdaje (debetu)?
                        .addField("gradio", // "w-L-12 w-M-12 w-S-12",
                    {
                        customClass: "js-KZRV",
                        name: "KZRV", // Účtuje se o kurzové ztrátě při realizaci výdaje (debetu)?
                        groupName: "Test",
                        itemClass: "",
                        change: (ev, obj) => { that.ChangeRadio("KZRV", obj.value); },
                        radios: [
                            { value: true, label: GDlg.mbbYes.text, customClass: "js-ano", id: "ano" },
                            { value: false, label: GDlg.mbbNo.text, customClass: "js-ne", id: "ne" },
                        ],
                    })
                        .addRow({ label: "jres:30250427", customClass: "js-OKZRV" }) //RC 30250427 : Jedná se o opravu kurzové ztráty při realizaci výdaje (debetu)?
                        .addField("gradio", {
                        name: "OKZRV", // Jedná se o opravu kurzové ztráty při realizaci výdaje (debetu)?
                        customClass: "js-OKZRV",
                        change: (ev, obj) => { that.ChangeRadio("OKZRV", obj.value); },
                        //itemClass: "w-3",
                        radios: [
                            { value: true, label: GDlg.mbbYes.text, customClass: "js-ano" },
                            { value: false, label: GDlg.mbbNo.text, customClass: "js-ne" },
                        ],
                    })
                        .addRow({ label: "jres:30250426", customClass: "js-KZRP" }) //RC 30250426 : Účtuje se o kurzové ztrátě při realizaci příjmu (kreditu)?
                        .addField("gradio", {
                        // 3.
                        name: "KZRP",
                        customClass: "js-KZRP",
                        change: (ev, obj) => { that.ChangeRadio("KZRP", obj.value); },
                        //itemClass: "w-3",
                        radios: [
                            { value: true, label: GDlg.mbbYes.text, customClass: "js-ano" },
                            { value: false, label: GDlg.mbbNo.text, customClass: "js-ne" },
                        ],
                    })
                        .addRow({ label: "jres:30250425", customClass: "js-OKZRP" }) //RC 30250425 : Jedná se o opravu kurzové ztráty při realizaci příjmu (kreditu)?
                        .addField("gradio", {
                        // 4.
                        name: "OKZRP",
                        customClass: "js-OKZRP",
                        change: (ev, obj) => { that.ChangeRadio("OKZRP", obj.value); },
                        //itemClass: "w-3",
                        radios: [
                            { value: true, label: GDlg.mbbYes.text, customClass: "js-ano" },
                            { value: false, label: GDlg.mbbNo.text, customClass: "js-ne" },
                        ],
                    })
                        .addRow({ label: "jres:30250424", customClass: "js-OKZ" }) //RC 30250424 : Jedná se o opravu kurzového zisku?
                        .addField("gradio", {
                        // 5.
                        name: "OKZ",
                        customClass: "js-OKZ",
                        change: (ev, obj) => { that.ChangeRadio("OKZ", obj.value); },
                        //itemClass: "w-3",
                        radios: [
                            { value: true, label: GDlg.mbbYes.text, customClass: "js-ano" },
                            { value: false, label: GDlg.mbbNo.text, customClass: "js-ne" },
                        ],
                    })
                        .addRow({ label: "Jedná se o jiný výdaj?", customClass: "js-JV" })
                        .addField("gradio", {
                        // 6.
                        name: "JV",
                        customClass: "js-JV",
                        change: (ev, obj) => { that.ChangeRadio("JV", obj.value); },
                        //itemClass: "w-3",
                        radios: [
                            { value: true, label: GDlg.mbbYes.text, customClass: "js-ano", id: "ano" },
                            { value: false, label: GDlg.mbbNo.text, customClass: "js-ne", id: "ne" },
                        ],
                    })
                        .addRow({ label: "jres:30250429" }) //RC 30250429 : Vysledek výběru
                        .addField("gstaticfield", 'w-12', { name: "resultKR", customClass: "js-result-KR" })
                        .addField("gstaticfield", 'w-12', { name: "resultSML", customClass: "js-result-SML" });
                    $.newDiv()
                        .appendTo(that.element).gform('createFrom', l_oForm); // vytvoření formuláře
                    $(that.contentDiv).resize();
                    that.inicializace();
                }
                /**
                 * Inicializace hodnot
                 * */
                inicializace() {
                    this.log.trace("Inicializace kurz. rozdilu");
                    // zneviditelnim vse
                    this.hideAll();
                    var txt = Gordic.Templates.Formatters.number(parseDecimal(this.inputParams.Hodnota), "C");
                    this.log.trace("Castka: {0}", this.inputParams.Hodnota);
                    // Kontrola, zda je zadan spravny typ kurzoveho rozdilu dle hodnot
                    this.setRightKurzovyRozdil();
                    this.log.trace("Typ kurzovych rozdilu: {0}", this.inputParams.TypKurzRozdilu);
                    this.title = "jres:30250410".format((this.inputParams.Pik == 10 ? "5142" : "2143"), txt); //RC 30250410 : Kurzové rozdíly (POL: {0}, DAL-MD: {1})
                    var modelDto = {};
                    switch (this.inputParams.TypKurzRozdilu) {
                        case 0 /* Gordic.Uct.Interface.GETypKurzovychRozdilu.Zadny */:
                            if (parseDecimal(this.inputParams.Hodnota) > parseDecimal(0)) {
                                modelDto.KZRV = true;
                            }
                            else {
                                modelDto.KZRV = false;
                                modelDto.KZRP = false;
                            }
                            break;
                        case 5 /* Gordic.Uct.Interface.GETypKurzovychRozdilu.JinyVydaj */:
                            modelDto.KZRV = false;
                            modelDto.KZRP = false;
                            modelDto.OKZ = false;
                            modelDto.JV = true;
                            break;
                        case 6 /* Gordic.Uct.Interface.GETypKurzovychRozdilu.KurzovaZtrataPriRealizaciPrijmu */:
                            if (parseDecimal(this.inputParams.Hodnota) > parseDecimal(0)) {
                                modelDto.KZRV = false;
                                modelDto.KZRP = true;
                            }
                            break;
                        case 3 /* Gordic.Uct.Interface.GETypKurzovychRozdilu.KurzovaZtrataPriRealizaciVydaje */:
                            if (parseDecimal(this.inputParams.Hodnota) > parseDecimal(0))
                                modelDto.KZRV = true;
                            break;
                        case 7 /* Gordic.Uct.Interface.GETypKurzovychRozdilu.OpravaKurzoveZtratyPriRealizaciPrijmu */:
                            modelDto.KZRV = false;
                            modelDto.KZRP = true;
                            modelDto.OKZRP = true;
                            break;
                        case 4 /* Gordic.Uct.Interface.GETypKurzovychRozdilu.OpravaKurzoveZtratyPriRealizaciVydaje */:
                            modelDto.KZRV = true;
                            modelDto.OKZRV = true;
                            break;
                        case 2 /* Gordic.Uct.Interface.GETypKurzovychRozdilu.OpravaZisku */:
                            if (parseDecimal(this.inputParams.Hodnota) > parseDecimal(0)) {
                                modelDto.KZRV = false;
                                modelDto.KZRP = false;
                                modelDto.OKZ = true;
                            }
                            break;
                        case 1 /* Gordic.Uct.Interface.GETypKurzovychRozdilu.Zisk */:
                            if (parseDecimal(this.inputParams.Hodnota) < parseDecimal(0)) {
                                modelDto.KZRV = false;
                                modelDto.KZRP = false;
                            }
                            break;
                    }
                    this.findFields().gfield("model", "apply", modelDto, { initialValues: true, setFlags: { triggerChange: true } });
                }
                /**
                 * setRightKurzovyRozdil
                 *
                 * @returns {Gordic.Uct.Interface.GETypKurzovychRozdilu}
                 */
                setRightKurzovyRozdil() {
                    switch (this.inputParams.TypKurzRozdilu) {
                        case 5 /* Gordic.Uct.Interface.GETypKurzovychRozdilu.JinyVydaj */:
                        case 6 /* Gordic.Uct.Interface.GETypKurzovychRozdilu.KurzovaZtrataPriRealizaciPrijmu */:
                        case 3 /* Gordic.Uct.Interface.GETypKurzovychRozdilu.KurzovaZtrataPriRealizaciVydaje */:
                        case 2 /* Gordic.Uct.Interface.GETypKurzovychRozdilu.OpravaZisku */:
                            if (parseDecimal(this.inputParams.Hodnota) < parseDecimal(0))
                                this.inputParams.TypKurzRozdilu = 0 /* Gordic.Uct.Interface.GETypKurzovychRozdilu.Zadny */;
                            break;
                        case 4 /* Interface.GETypKurzovychRozdilu.OpravaKurzoveZtratyPriRealizaciVydaje */:
                        case 7 /* Interface.GETypKurzovychRozdilu.OpravaKurzoveZtratyPriRealizaciPrijmu */:
                        case 1 /* Gordic.Uct.Interface.GETypKurzovychRozdilu.Zisk */:
                            if (parseDecimal(this.inputParams.Hodnota) > parseDecimal(0))
                                this.inputParams.TypKurzRozdilu = 0 /* Gordic.Uct.Interface.GETypKurzovychRozdilu.Zadny */;
                            break;
                    }
                }
                // ************************************************************************
                // Funkce naplnění dat z dialogu s doplňkovými informacemi
                getFormData() {
                    let result = { PristupnostSmlouvy: this.PristupnostSmlouvy, TypKurzRozdilu: this.TypKurzovychRozdilu };
                    //this.element.findFields().gfield("model", "collect", result);                           // naplnění dat z dialogu
                    return result; // odeslání dat
                }
                closing() {
                    var that = this;
                    var def = $.Deferred();
                    var result = that.getFormData();
                    //if (that.EditaceHlavicky || that.EditaceZapisu) {
                    if (result.TypKurzRozdilu == 0 /* Interface.GETypKurzovychRozdilu.Zadny */) {
                        // v editačním režimu (tj. i po podání) dotaz na zavření bez uložení
                        that.dialogs.alert("jres:30250868" //RC 30250868 : Není vybrán typ kurzového rozdílu!
                        )
                            .on("close", def.reject);
                    }
                    else {
                        // musim shodit status, buhuzel se pamatuje z minulych dokladu
                        //that.statusStavDokladu.update({ visible: false });
                        //that.statusTypDokladu.update({ visible: false });
                        // pokud se needituje, je možné detail zavřít
                        def.resolve(result);
                    }
                    // Aktualizace radku seznamu s dokladem
                    //Gordic.Uct.WebClient.Seznam.ReloadRowFromDB(null, that.Ixp,true);
                    return def.promise();
                }
                /**
                 *  Schovani vsech voleb
                 *
                 * */
                hideAll() {
                    this.hideBySelector(1);
                    this.hideBySelector(2);
                    this.hideBySelector(3);
                    this.hideBySelector(4);
                    this.hideBySelector(5);
                    this.hideBySelector(6);
                }
                /**
                 * hideBySelector
                 *
                 * @param {string} [selector]
                 */
                hideBySelector(selector) {
                    var result = this.findSelector(selector);
                    if (result != null)
                        result.hide();
                }
                /**
                 * Zobrazeni selectoru
                 *
                 * @param {string} selector
                 */
                showBySelector(selector) {
                    var result = this.findSelector(selector);
                    if (result != null)
                        result.show();
                }
                /**
                 * findSelector
                 *
                 * @param {string} [selector]
                 */
                findSelector(selector) {
                    if (typeof selector === "number") {
                        var item = this.mapper.find((row) => {
                            return (row.id === selector);
                        });
                        if (typeof item !== "undefined")
                            selector = item.class;
                        else {
                            this.log.warn("selector " + selector + " nenalezen");
                            debugger;
                            return null;
                        }
                    }
                    return this.find(selector);
                }
                /**
                 * NastaveniVysledkuVyberu
                 */
                NastaveniVysledkuVyberu() {
                    this.NastavPristupnostSmlouvyDleKR(this.TypKurzovychRozdilu);
                    // textovy popis kurzovych rozdilu
                    var textKR = this.GetTextKurzRozdilu(this.TypKurzovychRozdilu);
                    // textovy popis pristupnosti smlouvy
                    var textSML = this.GetTextPristupnostSmlouvy(this.PristupnostSmlouvy);
                    // zobrazeni vysledku
                    this.DisplayResult(textKR, textSML);
                    // zmena pristupnosti tlacitka ok
                    this.actionOk.update({ enabled: this.TypKurzovychRozdilu !== 0 /* Gordic.Uct.Interface.GETypKurzovychRozdilu.Zadny */ });
                }
                /**
                 *
                 *
                 * @param {string} name
                 * @param {boolean} value
                 */
                ChangeRadio(name, value) {
                    //this.hideAll();
                    switch (name) {
                        case "KZRV": // 1
                            this.showBySelector(1);
                            if (value == null)
                                break;
                            if (value === true) {
                                this.hideBySelector(2);
                                this.hideBySelector(3);
                                this.hideBySelector(4);
                                this.hideBySelector(5);
                                this.hideBySelector(6);
                                if (parseDecimal(this.inputParams.Hodnota) > parseDecimal(0))
                                    this.TypKurzovychRozdilu = 3 /* Interface.GETypKurzovychRozdilu.KurzovaZtrataPriRealizaciVydaje */;
                                else {
                                    this.findSelector(2).findFields().gfield("option", "disabled", false);
                                    this.showBySelector(2);
                                    if (this.findSelector(2).findFields().gfield("getValue") === true)
                                        this.findSelector(2).findFields().gfield("setValue", false);
                                    this.findSelector(2).findFields().gfield("setValue", true);
                                }
                            }
                            else {
                                this.TypKurzovychRozdilu = 0 /* Interface.GETypKurzovychRozdilu.Zadny */;
                                this.hideBySelector(2);
                                //this.findSelector(3).findFields().gfield("setValue", true);
                                //this.findSelector(3).findFields().gfield("setValue", false);
                                this.findSelector(3).findFields().gfield("clear");
                                this.showBySelector(3);
                            }
                            break;
                        case "OKZRV": // 2
                            this.showBySelector(2);
                            if (value == null)
                                break;
                            if (value === true) {
                                this.hideBySelector(3);
                                this.hideBySelector(4);
                                this.hideBySelector(5);
                                this.hideBySelector(6);
                                if (parseDecimal(this.inputParams.Hodnota) > parseDecimal(0)) {
                                    if (this.findSelector(2).findFields().gfield("getValue") !== true)
                                        this.findSelector(2).findFields().gfield("setValue", true);
                                    this.findSelector(2).findFields().gfield("setValue", false);
                                    this.findSelector(2).findFields().gfield("option", "disabled", true);
                                }
                                this.TypKurzovychRozdilu = 4 /* Interface.GETypKurzovychRozdilu.OpravaKurzoveZtratyPriRealizaciVydaje */;
                                this.findSelector(2).findFields().gfield("option", "disabled", true);
                            }
                            else {
                            }
                            break;
                        case "KZRP": // 3
                            this.showBySelector(3);
                            if (value == null)
                                break;
                            if (value === true) {
                                this.hideBySelector(2);
                                this.hideBySelector(4);
                                this.hideBySelector(5);
                                this.hideBySelector(6);
                                if (parseDecimal(this.inputParams.Hodnota) > parseDecimal(0)) {
                                    this.TypKurzovychRozdilu = 6 /* Interface.GETypKurzovychRozdilu.KurzovaZtrataPriRealizaciPrijmu */;
                                }
                                else {
                                    if (this.findSelector(4).findFields().gfield("getValue") === true)
                                        this.findSelector(4).findFields().gfield("setValue", false);
                                    this.findSelector(4).findFields().gfield("setValue", true);
                                    this.findSelector(4).findFields().gfield("option", "disabled", true);
                                    this.showBySelector(4);
                                }
                            }
                            else {
                                this.hideBySelector(2);
                                this.hideBySelector(4);
                                this.hideBySelector(5);
                                this.hideBySelector(6);
                                this.TypKurzovychRozdilu = 0 /* Interface.GETypKurzovychRozdilu.Zadny */;
                                if (parseDecimal(this.inputParams.Hodnota) < parseDecimal(0)) {
                                    this.TypKurzovychRozdilu = 1 /* Interface.GETypKurzovychRozdilu.Zisk */;
                                }
                                else {
                                    this.findSelector(3).findFields().gfield("option", "disabled", false);
                                    // TODO: mozna to funguje..., zrusit vsechna nastaveni
                                    this.findSelector(5).findFields().gfield("clear");
                                    this.showBySelector(5);
                                }
                            }
                            break;
                        case "OKZRP": // 4
                            this.showBySelector(4);
                            if (value == null)
                                break;
                            if (value === true) {
                                this.hideBySelector(2);
                                this.hideBySelector(5);
                                this.hideBySelector(6);
                                if (parseDecimal(this.inputParams.Hodnota) > parseDecimal(0)) {
                                    // ne zpristupnit ano
                                    this.findSelector(4).findFields().gfield("option", "disabled", true);
                                    this.findSelector(4).findFields().gfield("setValue", false);
                                }
                                this.TypKurzovychRozdilu = 7 /* Interface.GETypKurzovychRozdilu.OpravaKurzoveZtratyPriRealizaciPrijmu */;
                            }
                            else {
                            }
                            break;
                        case "OKZ": // 5
                            this.showBySelector(5);
                            if (value == null)
                                break;
                            if (value === true) {
                                this.hideBySelector(2);
                                this.hideBySelector(6);
                                if (parseDecimal(this.inputParams.Hodnota) > parseDecimal(0)) {
                                    this.TypKurzovychRozdilu = 2 /* Interface.GETypKurzovychRozdilu.OpravaZisku */;
                                }
                                else {
                                    if (this.findSelector(5).findFields().gfield("getValue") !== true)
                                        this.findSelector(5).findFields().gfield("setValue", true);
                                    this.findSelector(5).findFields().gfield("setValue", false);
                                }
                            }
                            else {
                                this.TypKurzovychRozdilu = 5 /* Interface.GETypKurzovychRozdilu.JinyVydaj */;
                                this.findSelector(6).findFields().gfield("option", "disabled", false);
                                if (this.findSelector(6).findFields().gfield("getValue") === true)
                                    this.findSelector(6).findFields().gfield("setValue", false);
                                this.findSelector(6).findFields().gfield("setValue", true);
                                this.showBySelector(6);
                            }
                            break;
                        case "JV": // 6
                            this.findSelector(6).findFields().gfield("option", "disabled", false);
                            if (value == null)
                                break;
                            if (value === true) {
                                this.TypKurzovychRozdilu = 5 /* Interface.GETypKurzovychRozdilu.JinyVydaj */;
                                this.findSelector(6).findFields().gfield("option", "disabled", true);
                            }
                            this.showBySelector(6);
                            break;
                    }
                    this.NastaveniVysledkuVyberu();
                }
                /**
                 * DisplayResult
                 *
                 * @param {string} textKR
                 * @param {string} textSML
                 */
                DisplayResult(textKR, textSML) {
                    $(".js-result-KR").findFields().gfield("setValue", textKR);
                    $(".js-result-SML").findFields().gfield("setValue", textSML);
                }
                /// <summary>
                /// Nastaveni pristupnosti smlouvy dle kurzoveho rozdilu
                /// </summary>
                NastavPristupnostSmlouvyDleKR(typKurzovychRozdilu) {
                    if (typKurzovychRozdilu == 3 /* Interface.GETypKurzovychRozdilu.KurzovaZtrataPriRealizaciVydaje */
                        || typKurzovychRozdilu == 4 /* Interface.GETypKurzovychRozdilu.OpravaKurzoveZtratyPriRealizaciVydaje */)
                        this.PristupnostSmlouvy = 4 /* Interface.GEPristupnostSmlouvy.PristupnaPovinna */;
                    else if (typKurzovychRozdilu == 6 /* Interface.GETypKurzovychRozdilu.KurzovaZtrataPriRealizaciPrijmu */ ||
                        typKurzovychRozdilu == 7 /* Interface.GETypKurzovychRozdilu.OpravaKurzoveZtratyPriRealizaciPrijmu */) {
                        if (this.inputParams.Pik == 10)
                            // 10.7.2014 T.V.: Upraveno dle mailu ze dne 10.7. Smlouva povinna dle parametru
                            //m_PristupnostSmlouvy = GEPristupnostSmlouvy.PristupnaPovinna;
                            this.PristupnostSmlouvy = this.inputParams.KurzoveRozdilyPovinnaSmlouvaZRP ? 4 /* Interface.GEPristupnostSmlouvy.PristupnaPovinna */ : 3 /* Interface.GEPristupnostSmlouvy.PristupnaNepovinna */;
                        else
                            this.PristupnostSmlouvy = 2 /* Interface.GEPristupnostSmlouvy.Nepristupna */;
                    }
                    else if (typKurzovychRozdilu == 1 /* Interface.GETypKurzovychRozdilu.Zisk */
                        || typKurzovychRozdilu == 2 /* Interface.GETypKurzovychRozdilu.OpravaZisku */)
                        this.PristupnostSmlouvy = 2 /* Interface.GEPristupnostSmlouvy.Nepristupna */;
                    else if (typKurzovychRozdilu == 5 /* Interface.GETypKurzovychRozdilu.JinyVydaj */)
                        this.PristupnostSmlouvy = 3 /* Interface.GEPristupnostSmlouvy.PristupnaNepovinna */;
                    else
                        this.PristupnostSmlouvy = 2 /* Interface.GEPristupnostSmlouvy.Nepristupna */;
                }
                /**
                 * GetTextKurzRozdilu
                 *
                 * @param {Interface.GETypKurzovychRozdilu} typKruzRoz
                 * @returns {string}
                 */
                GetTextKurzRozdilu(typKruzRoz) {
                    if (typKruzRoz === 1 /* Interface.GETypKurzovychRozdilu.Zisk */)
                        return "jres:30250411"; //RC 30250411 : Kurzový zisk
                    else if (typKruzRoz === 2 /* Interface.GETypKurzovychRozdilu.OpravaZisku */)
                        return "jres:30250412"; //RC 30250412 : Oprava kurzového zisku
                    else if (typKruzRoz === 3 /* Interface.GETypKurzovychRozdilu.KurzovaZtrataPriRealizaciVydaje */)
                        return "jres:30250413"; //RC 30250413 : Kurzová ztráta při realizaci výdaje
                    else if (typKruzRoz === 4 /* Interface.GETypKurzovychRozdilu.OpravaKurzoveZtratyPriRealizaciVydaje */)
                        return "jres:30250414"; //RC 30250414 : Oprava kurzové ztráty při realizaci výdaje
                    else if (typKruzRoz === 5 /* Interface.GETypKurzovychRozdilu.JinyVydaj */)
                        return "jres:30250415"; //RC 30250415 : Jiné výdaje
                    else if (typKruzRoz === 6 /* Interface.GETypKurzovychRozdilu.KurzovaZtrataPriRealizaciPrijmu */)
                        return "jres:30250416"; //RC 30250416 : Kurzové ztráty při realizaci příjmu
                    else if (typKruzRoz === 7 /* Interface.GETypKurzovychRozdilu.OpravaKurzoveZtratyPriRealizaciPrijmu */)
                        return "jres:30250417"; //RC 30250417 : Oprava kurzové ztráty při realizaci příjmu
                    else
                        //Interface.GETypKurzovychRozdilu.Zadny
                        return "jres:30250270"; //RC 30250270 : Nenastaveno
                }
                /**
                 * GetTextPristupnostSmlouvy
                 *
                 * @param {Interface.GEPristupnostSmlouvy} pristunostSmlouvy
                 */
                GetTextPristupnostSmlouvy(pristunostSmlouvy) {
                    if (pristunostSmlouvy === 1 /* Interface.GEPristupnostSmlouvy.Neurceno */)
                        return "jres:30250418"; //RC 30250418 : Neurčeno, zda smlouva bude přístupná, nepřístupná
                    else if (pristunostSmlouvy === 2 /* Interface.GEPristupnostSmlouvy.Nepristupna */)
                        return "jres:30250419"; //RC 30250419 : Smlouva nepřístupná
                    else if (pristunostSmlouvy === 3 /* Interface.GEPristupnostSmlouvy.PristupnaNepovinna */)
                        return "jres:30250420"; //RC 30250420 : Smlouva přístupná, ale nepovinná
                    else if (pristunostSmlouvy === 4 /* Interface.GEPristupnostSmlouvy.PristupnaPovinna */)
                        return "jres:30250421"; //RC 30250421 : Smlouva přístupná a povinná
                    else
                        return "jres:30250422"; //RC 30250422 : Nepoužito
                }
            };
            GUctKurzoveRozdilyDlg = __decorate([
                gcontent
            ], GUctKurzoveRozdilyDlg);
            WebClient.GUctKurzoveRozdilyDlg = GUctKurzoveRozdilyDlg;
        })(WebClient = Uct.WebClient || (Uct.WebClient = {}));
    })(Uct = Gordic.Uct || (Gordic.Uct = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1VjdEt1cnpvdmVSb3pkaWx5RGxnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1VjdEt1cnpvdmVSb3pkaWx5RGxnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0EwakJmO0FBMWpCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0EwakJuQjtJQTFqQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTBqQjdCO1FBMWpCb0IsV0FBQSxTQUFTO1lBRTFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFFbkMsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxPQUFBLFlBQVk7Z0JBQXZEOztvQkFJWSx3QkFBbUIsaURBQTBFO29CQUVyRyxlQUFVLEdBQUcsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQztvQkFDMUYsV0FBTSxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRTt3QkFDakYsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUU7NEJBQ3RGLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVE7eUJBQUU7cUJBQzNCLENBQUM7Z0JBMmlCRixDQUFDO2dCQXhpQkcsWUFBWTtnQkFDWixvREFBb0Q7Z0JBQ3BELDJFQUEyRTtnQkFDM0UseUJBQXlCO2dCQUN6QixjQUFjLENBQUMsR0FBMkI7b0JBQ3RDLElBQUks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QTFqQlMsTUFBTSxLQUFOLE1BQU0sUUEwakJmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3QuV2ViQ2xpZW50IHtcclxuXHJcbiAgICB2YXIgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1VjdEt1cnpvdmVSb3pkaWx5RGxnIGV4dGVuZHMgR0NvbnRlbnRCYXNlIGltcGxlbWVudHMgSUdDbGllbnRDb250ZW50IHtcclxuICAgICAgICAvLyB2c3R1cG5pIHBhcmFtZXRyeVxyXG4gICAgICAgIHByaXZhdGUgaW5wdXRQYXJhbXM6IEdBbGdvcml0bXVzS1JSZXR1cm5EdG9cclxuICAgICAgICBwcml2YXRlIFByaXN0dXBub3N0U21sb3V2eTogSW50ZXJmYWNlLkdFUHJpc3R1cG5vc3RTbWxvdXZ5O1xyXG4gICAgICAgIHByaXZhdGUgVHlwS3Vyem92eWNoUm96ZGlsdTogSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdSA9IEludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuWmFkbnk7XHJcbiAgICAgICAgcHJpdmF0ZSBhY3Rpb25PazogR0FjdGlvbjtcclxuICAgICAgICBsb2dPcHRpb25zID0geyBuYW1lOiBcIkdVY3RLdXJ6b3ZlUm96ZGlseURsZ1wiLCBhdXRob3JDb2RlOiAzMDIsIGZpbGU6IFwiR1VjdEt1cnpvdmVSb3pkaWx5RGxnLnRzXCIgfTtcclxuICAgICAgICBwcml2YXRlIG1hcHBlciA9IFt7IGlkOiAxLCBjbGFzczogXCIuanMtS1pSVlwiIH0sIHsgaWQ6IDIsIGNsYXNzOiBcIi5qcy1PS1pSVlwiIH0sXHJcbiAgICB7IGlkOiAzLCBjbGFzczogXCIuanMtS1pSUFwiIH0sIHsgaWQ6IDQsIGNsYXNzOiBcIi5qcy1PS1pSUFwiIH0sIHsgaWQ6IDUsIGNsYXNzOiBcIi5qcy1PS1pcIiB9LCB7XHJcbiAgICAgICAgaWQ6IDYsIGNsYXNzOiBcIi5qcy1KVlwiIH1cclxuICAgIF07XHJcbiAgICBcclxuXHJcbiAgICAgICAgLy9hOiBzdHJpbmc7XHJcbiAgICAgICAgLy9wdWJsaWMgZ2xvYmFsczogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjR2xvYmFsRHRvO1xyXG4gICAgICAgIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgIC8vIEluaWNpYWxpemFjZSBmb3JtdWzDocWZZVxyXG4gICAgICAgIHByZXBhcmVDb250ZW50KHBhcjogR0FsZ29yaXRtdXNLUlJldHVybkR0byk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICB0aGlzLmFjdGlvbk9rID0gbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgbmFtZTogXCJva0FjdFwiLCBjYXB0aW9uOiBHRGxnLm1iYk9rLnRleHQsIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoLyp0aGF0LmdldEZvcm1EYXRhKCkqLyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pOyAvL1JDIDMwMjUwNDA5IDogT0tcclxuICAgICAgICAgICAgdGhpcy5pbnB1dFBhcmFtcyA9IHBhcjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcImpyZXM6MzAyNTA4NjlcIjsgLy9SQyAzMDI1MDg2OSA6IEt1cnpvdsOpIHJvemTDrWx5XHJcbiAgICAgICAgICAgIC8vIHRsYcSNw610a2EgZG8gc3BvZG7DrWhvIHBydWh1XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiaWRPS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY3VzdG9tQ2xhc3M6IFwiZ2ktdGlja1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5hY3Rpb25Pa1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG5cclxuICAgICAgICAgICAgLy9cIkwxTTFTMSwgTC0yLTgtMiwgTS0yLTgtMiwgUy0xMi0xMi0wXCJcclxuICAgICAgICAgICAgdmFyIGxfb0Zvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm11bGFyXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNUzEsIEwtNi01LTEsIE0tMTItMTEtMSwgUy0xMi0xMS0xXCIgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDI1MDQyOFwiLCBjdXN0b21DbGFzczogXCJqcy1LWlJWXCIgfSkgLy9SQyAzMDI1MDQyOCA6IMOaxI10dWplIHNlIG8ga3Vyem92w6kgenRyw6F0xJsgcMWZaSByZWFsaXphY2kgdsO9ZGFqZSAoZGViZXR1KT9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLC8vIFwidy1MLTEyIHctTS0xMiB3LVMtMTJcIixcclxuICAgICAgICAgICAgICAgICAgICB7ICAvLyAxLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJqcy1LWlJWXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiS1pSVlwiLCAvLyDDmsSNdHVqZSBzZSBvIGt1cnpvdsOpIHp0csOhdMSbIHDFmWkgcmVhbGl6YWNpIHbDvWRhamUgKGRlYmV0dSk/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTmFtZTpcIlRlc3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbUNsYXNzOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7IHRoYXQuQ2hhbmdlUmFkaW8oXCJLWlJWXCIsIG9iai52YWx1ZSBhcyBib29sZWFuIHwgbnVtYmVyKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiB0cnVlLCBsYWJlbDogR0RsZy5tYmJZZXMudGV4dCwgY3VzdG9tQ2xhc3M6IFwianMtYW5vXCIsIGlkOiBcImFub1wiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IGZhbHNlLCBsYWJlbDogR0RsZy5tYmJOby50ZXh0LCBjdXN0b21DbGFzczogXCJqcy1uZVwiLCBpZDogXCJuZVwifSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcImpyZXM6MzAyNTA0MjdcIiwgY3VzdG9tQ2xhc3M6IFwianMtT0taUlZcIiB9KSAvL1JDIDMwMjUwNDI3IDogSmVkbsOhIHNlIG8gb3ByYXZ1IGt1cnpvdsOpIHp0csOhdHkgcMWZaSByZWFsaXphY2kgdsO9ZGFqZSAoZGViZXR1KT9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgLy8gMi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJPS1pSVlwiLCAvLyBKZWRuw6Egc2UgbyBvcHJhdnUga3Vyem92w6kgenRyw6F0eSBwxZlpIHJlYWxpemFjaSB2w71kYWplIChkZWJldHUpP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJqcy1PS1pSVlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7IHRoYXQuQ2hhbmdlUmFkaW8oXCJPS1pSVlwiLCBvYmoudmFsdWUgYXMgYm9vbGVhbiB8IG51bWJlcik7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaXRlbUNsYXNzOiBcInctM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IHRydWUsIGxhYmVsOiBHRGxnLm1iYlllcy50ZXh0LCBjdXN0b21DbGFzczogXCJqcy1hbm9cIiAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IGZhbHNlLCBsYWJlbDogR0RsZy5tYmJOby50ZXh0LCBjdXN0b21DbGFzczogXCJqcy1uZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSkgICBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwNDI2XCIsIGN1c3RvbUNsYXNzOiBcImpzLUtaUlBcIiB9KSAvL1JDIDMwMjUwNDI2IDogw5rEjXR1amUgc2UgbyBrdXJ6b3bDqSB6dHLDoXTEmyBwxZlpIHJlYWxpemFjaSBwxZnDrWptdSAoa3JlZGl0dSk/XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIixcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAvLyAzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIktaUlBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImpzLUtaUlBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIG9iaikgPT4geyB0aGF0LkNoYW5nZVJhZGlvKFwiS1pSUFwiLCBvYmoudmFsdWUgYXMgYm9vbGVhbiB8IG51bWJlcik7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaXRlbUNsYXNzOiBcInctM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IHRydWUsIGxhYmVsOiBHRGxnLm1iYlllcy50ZXh0LCBjdXN0b21DbGFzczogXCJqcy1hbm9cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogZmFsc2UsIGxhYmVsOiBHRGxnLm1iYk5vLnRleHQsIGN1c3RvbUNsYXNzOiBcImpzLW5lXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcImpyZXM6MzAyNTA0MjVcIiwgY3VzdG9tQ2xhc3M6IFwianMtT0taUlBcIiB9KSAvL1JDIDMwMjUwNDI1IDogSmVkbsOhIHNlIG8gb3ByYXZ1IGt1cnpvdsOpIHp0csOhdHkgcMWZaSByZWFsaXphY2kgcMWZw61qbXUgKGtyZWRpdHUpP1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyA0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIk9LWlJQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImpzLU9LWlJQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHsgdGhhdC5DaGFuZ2VSYWRpbyhcIk9LWlJQXCIsIG9iai52YWx1ZSBhcyBib29sZWFuIHwgbnVtYmVyKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pdGVtQ2xhc3M6IFwidy0zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6IEdEbGcubWJiWWVzLnRleHQsIGN1c3RvbUNsYXNzOlwianMtYW5vXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IGZhbHNlLCBsYWJlbDogR0RsZy5tYmJOby50ZXh0LCBjdXN0b21DbGFzczogXCJqcy1uZVwiICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDI1MDQyNFwiLCBjdXN0b21DbGFzczogXCJqcy1PS1pcIiB9KSAvL1JDIDMwMjUwNDI0IDogSmVkbsOhIHNlIG8gb3ByYXZ1IGt1cnpvdsOpaG8gemlza3U/XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIixcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiT0taXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImpzLU9LWlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgb2JqKSA9PiB7IHRoYXQuQ2hhbmdlUmFkaW8oXCJPS1pcIiwgb2JqLnZhbHVlIGFzIGJvb2xlYW4gfCBudW1iZXIpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2l0ZW1DbGFzczogXCJ3LTNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkaW9zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiB0cnVlLCBsYWJlbDogR0RsZy5tYmJZZXMudGV4dCwgY3VzdG9tQ2xhc3M6IFwianMtYW5vXCIgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBmYWxzZSwgbGFiZWw6IEdEbGcubWJiTm8udGV4dCwgY3VzdG9tQ2xhc3M6IFwianMtbmVcIiAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIkplZG7DoSBzZSBvIGppbsO9IHbDvWRhaj9cIiwgY3VzdG9tQ2xhc3M6IFwianMtSlZcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3JhZGlvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyA2LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkpWXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImpzLUpWXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHsgdGhhdC5DaGFuZ2VSYWRpbyhcIkpWXCIsIG9iai52YWx1ZSBhcyBib29sZWFuIHwgbnVtYmVyKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pdGVtQ2xhc3M6IFwidy0zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogdHJ1ZSwgbGFiZWw6IEdEbGcubWJiWWVzLnRleHQsIGN1c3RvbUNsYXNzOiBcImpzLWFub1wiLCBpZDogXCJhbm9cIiAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IGZhbHNlLCBsYWJlbDogR0RsZy5tYmJOby50ZXh0LCBjdXN0b21DbGFzczogXCJqcy1uZVwiLCBpZDogXCJuZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwNDI5XCIgfSkgLy9SQyAzMDI1MDQyOSA6IFZ5c2xlZGVrIHbDvWLEm3J1XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RhdGljZmllbGRcIiwgJ3ctMTInLCB7IG5hbWU6IFwicmVzdWx0S1JcIiwgY3VzdG9tQ2xhc3M6IFwianMtcmVzdWx0LUtSXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdGF0aWNmaWVsZFwiLCAndy0xMicsIHsgbmFtZTogXCJyZXN1bHRTTUxcIiwgY3VzdG9tQ2xhc3M6IFwianMtcmVzdWx0LVNNTFwiIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRUZXh0KFwiVnlzbGVkZWsgdGVzdFwiLCBcImpzLXJlc3VsdC10ZXh0XCIpO1xyXG4gICAgICAgICAgICAgICAgOyAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoYXQuZWxlbWVudCkuZ2Zvcm0oJ2NyZWF0ZUZyb20nLCBsX29Gb3JtKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnl0dm/FmWVuw60gZm9ybXVsw6HFmWVcclxuICAgICAgICAgICAgJCh0aGF0LmNvbnRlbnREaXYpLnJlc2l6ZSgpOyAgXHJcbiAgICAgICAgICAgIHRoYXQuaW5pY2lhbGl6YWNlKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmljaWFsaXphY2UgaG9kbm90XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBpbmljaWFsaXphY2UoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nLnRyYWNlKFwiSW5pY2lhbGl6YWNlIGt1cnouIHJvemRpbHVcIik7XHJcbiAgICAgICAgICAgIC8vIHpuZXZpZGl0ZWxuaW0gdnNlXHJcbiAgICAgICAgICAgIHRoaXMuaGlkZUFsbCgpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgdHh0ID0gR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihwYXJzZURlY2ltYWwodGhpcy5pbnB1dFBhcmFtcy5Ib2Rub3RhIGFzIGFueSksIFwiQ1wiKTsgXHJcbiAgICAgICAgICAgIHRoaXMubG9nLnRyYWNlKFwiQ2FzdGthOiB7MH1cIiwgdGhpcy5pbnB1dFBhcmFtcy5Ib2Rub3RhKTsgXHJcbiAgICAgICAgICAgIC8vIEtvbnRyb2xhLCB6ZGEgamUgemFkYW4gc3ByYXZueSB0eXAga3Vyem92ZWhvIHJvemRpbHUgZGxlIGhvZG5vdFxyXG4gICAgICAgICAgICB0aGlzLnNldFJpZ2h0S3Vyem92eVJvemRpbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmxvZy50cmFjZShcIlR5cCBrdXJ6b3Z5Y2ggcm96ZGlsdTogezB9XCIsIHRoaXMuaW5wdXRQYXJhbXMuVHlwS3VyelJvemRpbHUpO1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJqcmVzOjMwMjUwNDEwXCIuZm9ybWF0KCh0aGlzLmlucHV0UGFyYW1zLlBpayA9PSAxMCA/IFwiNTE0MlwiIDogXCIyMTQzXCIpLCB0eHQpOyAvL1JDIDMwMjUwNDEwIDogS3Vyem92w6kgcm96ZMOtbHkgKFBPTDogezB9LCBEQUwtTUQ6IHsxfSlcclxuICAgICAgICAgICAgdmFyIG1vZGVsRHRvOiBHS3VyelJvemRpbHlEZWZEdG8gPSB7fTtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmlucHV0UGFyYW1zLlR5cEt1cnpSb3pkaWx1KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdS5aYWRueTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VEZWNpbWFsKHRoaXMuaW5wdXRQYXJhbXMuSG9kbm90YSBhcyBhbnkpID4gcGFyc2VEZWNpbWFsKDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsRHRvLktaUlYgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEdG8uS1pSViA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbER0by5LWlJQID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuSmlueVZ5ZGFqOlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsRHRvLktaUlYgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbER0by5LWlJQID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxEdG8uT0taID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxEdG8uSlYgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuS3Vyem92YVp0cmF0YVByaVJlYWxpemFjaVByaWptdTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VEZWNpbWFsKHRoaXMuaW5wdXRQYXJhbXMuSG9kbm90YSBhcyBhbnkpID4gcGFyc2VEZWNpbWFsKDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsRHRvLktaUlYgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEdG8uS1pSUCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuS3Vyem92YVp0cmF0YVByaVJlYWxpemFjaVZ5ZGFqZTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VEZWNpbWFsKHRoaXMuaW5wdXRQYXJhbXMuSG9kbm90YSBhcyBhbnkgKSA+IHBhcnNlRGVjaW1hbCgwKSkgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsRHRvLktaUlYgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuT3ByYXZhS3Vyem92ZVp0cmF0eVByaVJlYWxpemFjaVByaWptdTpcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbER0by5LWlJWID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxEdG8uS1pSUCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxEdG8uT0taUlAgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuT3ByYXZhS3Vyem92ZVp0cmF0eVByaVJlYWxpemFjaVZ5ZGFqZTpcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbER0by5LWlJWID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbER0by5PS1pSViA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdS5PcHJhdmFaaXNrdTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VEZWNpbWFsKHRoaXMuaW5wdXRQYXJhbXMuSG9kbm90YSBhcyBhbnkpID4gcGFyc2VEZWNpbWFsKDApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsRHRvLktaUlYgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEdG8uS1pSUCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbER0by5PS1ogPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VUeXBLdXJ6b3Z5Y2hSb3pkaWx1Llppc2s6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlRGVjaW1hbCh0aGlzLmlucHV0UGFyYW1zLkhvZG5vdGEgYXMgYW55KSA8IHBhcnNlRGVjaW1hbCgwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbER0by5LWlJWID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsRHRvLktaUlAgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgbW9kZWxEdG8sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSwgc2V0RmxhZ3M6IHsgdHJpZ2dlckNoYW5nZTogdHJ1ZSB9IH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogc2V0UmlnaHRLdXJ6b3Z5Um96ZGlsXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0dvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBzZXRSaWdodEt1cnpvdnlSb3pkaWwoKTogdm9pZCB7XHJcblxyXG5cclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmlucHV0UGFyYW1zLlR5cEt1cnpSb3pkaWx1KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdS5KaW55VnlkYWo6XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdS5LdXJ6b3ZhWnRyYXRhUHJpUmVhbGl6YWNpUHJpam11OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuS3Vyem92YVp0cmF0YVByaVJlYWxpemFjaVZ5ZGFqZTpcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VUeXBLdXJ6b3Z5Y2hSb3pkaWx1Lk9wcmF2YVppc2t1OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZURlY2ltYWwodGhpcy5pbnB1dFBhcmFtcy5Ib2Rub3RhIGFzIGFueSkgPCBwYXJzZURlY2ltYWwoMCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRQYXJhbXMuVHlwS3VyelJvemRpbHUgPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuWmFkbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBJbnRlcmZhY2UuR0VUeXBLdXJ6b3Z5Y2hSb3pkaWx1Lk9wcmF2YUt1cnpvdmVadHJhdHlQcmlSZWFsaXphY2lWeWRhamU6XHJcbiAgICAgICAgICAgICAgICBjYXNlIEludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuT3ByYXZhS3Vyem92ZVp0cmF0eVByaVJlYWxpemFjaVByaWptdTpcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VUeXBLdXJ6b3Z5Y2hSb3pkaWx1Llppc2s6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlRGVjaW1hbCh0aGlzLmlucHV0UGFyYW1zLkhvZG5vdGEgYXMgYW55KSA+IHBhcnNlRGVjaW1hbCgwKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dFBhcmFtcy5UeXBLdXJ6Um96ZGlsdSA9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdS5aYWRueTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgLy8gRnVua2NlIG5hcGxuxJtuw60gZGF0IHogZGlhbG9ndSBzIGRvcGzFiGtvdsO9bWkgaW5mb3JtYWNlbWlcclxuICAgICAgICBnZXRGb3JtRGF0YSgpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IEdvcmRpYy5VY3QuV2ViQ2xpZW50LkdBbGdvcml0bXVzS1JSZXR1cm5EdG8gPSB7IFByaXN0dXBub3N0U21sb3V2eTogdGhpcy5QcmlzdHVwbm9zdFNtbG91dnksIFR5cEt1cnpSb3pkaWx1OiB0aGlzLlR5cEt1cnpvdnljaFJvemRpbHV9O1xyXG4gICAgICAgICAgICAvL3RoaXMuZWxlbWVudC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHJlc3VsdCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFwbG7Em27DrSBkYXQgeiBkaWFsb2d1XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvZGVzbMOhbsOtIGRhdFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhhdC5nZXRGb3JtRGF0YSgpO1xyXG4gICAgICAgICAgICAvL2lmICh0aGF0LkVkaXRhY2VIbGF2aWNreSB8fCB0aGF0LkVkaXRhY2VaYXBpc3UpIHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5UeXBLdXJ6Um96ZGlsdSA9PSBJbnRlcmZhY2UuR0VUeXBLdXJ6b3Z5Y2hSb3pkaWx1LlphZG55KSB7XHJcbiAgICAgICAgICAgICAgICAvLyB2IGVkaXRhxI1uw61tIHJlxb5pbXUgKHRqLiBpIHBvIHBvZMOhbsOtKSBkb3RheiBuYSB6YXbFmWVuw60gYmV6IHVsb8W+ZW7DrVxyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmFsZXJ0KFwianJlczozMDI1MDg2OFwiIC8vUkMgMzAyNTA4NjggOiBOZW7DrSB2eWJyw6FuIHR5cCBrdXJ6b3bDqWhvIHJvemTDrWx1IVxyXG4gICAgICAgICAgICAgICAgICAgICkgXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZGVmLnJlamVjdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBtdXNpbSBzaG9kaXQgc3RhdHVzLCBidWh1emVsIHNlIHBhbWF0dWplIHogbWludWx5Y2ggZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgLy90aGF0LnN0YXR1c1N0YXZEb2tsYWR1LnVwZGF0ZSh7IHZpc2libGU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LnN0YXR1c1R5cERva2xhZHUudXBkYXRlKHsgdmlzaWJsZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBwb2t1ZCBzZSBuZWVkaXR1amUsIGplIG1vxb5uw6kgZGV0YWlsIHphdsWZw610XHJcbiAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEFrdHVhbGl6YWNlIHJhZGt1IHNlem5hbXUgcyBkb2tsYWRlbVxyXG4gICAgICAgICAgICAvL0dvcmRpYy5VY3QuV2ViQ2xpZW50LlNlem5hbS5SZWxvYWRSb3dGcm9tREIobnVsbCwgdGhhdC5JeHAsdHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgU2Nob3ZhbmkgdnNlY2ggdm9sZWJcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIGhpZGVBbGwoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoMSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoMik7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoMyk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoNCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoNSk7XHJcbiAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoNik7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBoaWRlQnlTZWxlY3RvclxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbc2VsZWN0b3JdXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaGlkZUJ5U2VsZWN0b3Ioc2VsZWN0b3I6IHN0cmluZ3wgbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmZpbmRTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuaSBzZWxlY3RvcnVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcclxuICAgICAgICAgKi9cclxuICAgICAgICBzaG93QnlTZWxlY3RvcihzZWxlY3Rvcjogc3RyaW5nfCBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuZmluZFNlbGVjdG9yKHNlbGVjdG9yKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCE9bnVsbClcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5zaG93KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGZpbmRTZWxlY3RvclxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbc2VsZWN0b3JdXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZmluZFNlbGVjdG9yKHNlbGVjdG9yOiBzdHJpbmcgfCBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLm1hcHBlci5maW5kKChyb3cpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHJvdy5pZCA9PT0gc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0gIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3IgPSBpdGVtLmNsYXNzO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cud2FybihcInNlbGVjdG9yIFwiICsgc2VsZWN0b3IrIFwiIG5lbmFsZXplblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kKHNlbGVjdG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pVnlzbGVka3VWeWJlcnVcclxuICAgICAgICAgKi9cclxuICAgICAgICBOYXN0YXZlbmlWeXNsZWRrdVZ5YmVydSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5OYXN0YXZQcmlzdHVwbm9zdFNtbG91dnlEbGVLUih0aGlzLlR5cEt1cnpvdnljaFJvemRpbHUpO1xyXG5cclxuICAgICAgICAgICAgLy8gdGV4dG92eSBwb3BpcyBrdXJ6b3Z5Y2ggcm96ZGlsdVxyXG4gICAgICAgICAgICB2YXIgdGV4dEtSID0gdGhpcy5HZXRUZXh0S3VyelJvemRpbHUodGhpcy5UeXBLdXJ6b3Z5Y2hSb3pkaWx1KTtcclxuICAgICAgICAgICAgLy8gdGV4dG92eSBwb3BpcyBwcmlzdHVwbm9zdGkgc21sb3V2eVxyXG4gICAgICAgICAgICB2YXIgdGV4dFNNTCA9IHRoaXMuR2V0VGV4dFByaXN0dXBub3N0U21sb3V2eSh0aGlzLlByaXN0dXBub3N0U21sb3V2eSk7XHJcblxyXG4gICAgICAgICAgICAvLyB6b2JyYXplbmkgdnlzbGVka3VcclxuICAgICAgICAgICAgdGhpcy5EaXNwbGF5UmVzdWx0KHRleHRLUiwgdGV4dFNNTCk7XHJcblxyXG4gICAgICAgICAgICAvLyB6bWVuYSBwcmlzdHVwbm9zdGkgdGxhY2l0a2Egb2tcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25Pay51cGRhdGUoeyBlbmFibGVkOiB0aGlzLlR5cEt1cnpvdnljaFJvemRpbHUgIT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdS5aYWRueX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBDaGFuZ2VSYWRpbyhuYW1lOiBzdHJpbmcsIHZhbHVlOiBib29sZWFuIHwgbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5oaWRlQWxsKCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIktaUlZcIjogLy8gMVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0J5U2VsZWN0b3IoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlQnlTZWxlY3RvcigyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlQnlTZWxlY3RvcigzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlQnlTZWxlY3Rvcig0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlQnlTZWxlY3Rvcig1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlQnlTZWxlY3Rvcig2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlRGVjaW1hbCh0aGlzLmlucHV0UGFyYW1zLkhvZG5vdGEgYXMgYW55KSA+IHBhcnNlRGVjaW1hbCgwKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVHlwS3Vyem92eWNoUm96ZGlsdSA9IEludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuS3Vyem92YVp0cmF0YVByaVJlYWxpemFjaVZ5ZGFqZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3RvcigyKSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0J5U2VsZWN0b3IoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5maW5kU2VsZWN0b3IoMikhLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSA9PT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3RvcigyKSEuZmluZEZpZWxkcygpLmdmaWVsZChcInNldFZhbHVlXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZFNlbGVjdG9yKDIpIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVHlwS3Vyem92eWNoUm96ZGlsdSA9IEludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuWmFkbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5maW5kU2VsZWN0b3IoMykuZmluZEZpZWxkcygpLmdmaWVsZChcInNldFZhbHVlXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuZmluZFNlbGVjdG9yKDMpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZFNlbGVjdG9yKDMpIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0J5U2VsZWN0b3IoMyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJPS1pSVlwiOiAvLyAyXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QnlTZWxlY3RvcigyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoNik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZURlY2ltYWwodGhpcy5pbnB1dFBhcmFtcy5Ib2Rub3RhIGFzIGFueSkgPiBwYXJzZURlY2ltYWwoMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbmRTZWxlY3RvcigyKSEuZmluZEZpZWxkcygpLmdmaWVsZChcImdldFZhbHVlXCIpICE9PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZFNlbGVjdG9yKDIpIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3RvcigyKSEuZmluZEZpZWxkcygpLmdmaWVsZChcInNldFZhbHVlXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZFNlbGVjdG9yKDIpIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5UeXBLdXJ6b3Z5Y2hSb3pkaWx1ID0gSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdS5PcHJhdmFLdXJ6b3ZlWnRyYXR5UHJpUmVhbGl6YWNpVnlkYWplO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3RvcigyKSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJLWlJQXCI6IC8vIDNcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dCeVNlbGVjdG9yKDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlQnlTZWxlY3RvcigyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlQnlTZWxlY3Rvcig0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlQnlTZWxlY3Rvcig1KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlQnlTZWxlY3Rvcig2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlRGVjaW1hbCh0aGlzLmlucHV0UGFyYW1zLkhvZG5vdGEgYXMgYW55KSA+IHBhcnNlRGVjaW1hbCgwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5UeXBLdXJ6b3Z5Y2hSb3pkaWx1ID0gSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdS5LdXJ6b3ZhWnRyYXRhUHJpUmVhbGl6YWNpUHJpam11O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbmRTZWxlY3Rvcig0KSEuZmluZEZpZWxkcygpLmdmaWVsZChcImdldFZhbHVlXCIpID09PSB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZFNlbGVjdG9yKDQpIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kU2VsZWN0b3IoNCkhLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZFNlbGVjdG9yKDQpIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dCeVNlbGVjdG9yKDQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoNik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVHlwS3Vyem92eWNoUm96ZGlsdSA9IEludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuWmFkbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZURlY2ltYWwodGhpcy5pbnB1dFBhcmFtcy5Ib2Rub3RhIGFzIGFueSkgPCBwYXJzZURlY2ltYWwoMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVHlwS3Vyem92eWNoUm96ZGlsdSA9IEludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuWmlzaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3RvcigzKSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG1vem5hIHRvIGZ1bmd1amUuLi4sIHpydXNpdCB2c2VjaG5hIG5hc3RhdmVuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kU2VsZWN0b3IoNSkhLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJjbGVhclwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dCeVNlbGVjdG9yKDUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJPS1pSUFwiOiAgLy8gNFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0J5U2VsZWN0b3IoNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoNik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlRGVjaW1hbCh0aGlzLmlucHV0UGFyYW1zLkhvZG5vdGEgYXMgYW55KSA+IHBhcnNlRGVjaW1hbCgwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmUgenByaXN0dXBuaXQgYW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3Rvcig0KSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kU2VsZWN0b3IoNCkhLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5UeXBLdXJ6b3Z5Y2hSb3pkaWx1ID0gSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdS5PcHJhdmFLdXJ6b3ZlWnRyYXR5UHJpUmVhbGl6YWNpUHJpam11O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIk9LWlwiOiAvLyA1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QnlTZWxlY3Rvcig1KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZUJ5U2VsZWN0b3IoNik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZURlY2ltYWwodGhpcy5pbnB1dFBhcmFtcy5Ib2Rub3RhIGFzIGFueSkgPiBwYXJzZURlY2ltYWwoMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVHlwS3Vyem92eWNoUm96ZGlsdSA9IEludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuT3ByYXZhWmlza3U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5maW5kU2VsZWN0b3IoNSkhLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSAhPT0gdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3Rvcig1KSEuZmluZEZpZWxkcygpLmdmaWVsZChcInNldFZhbHVlXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kU2VsZWN0b3IoNSkhLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVHlwS3Vyem92eWNoUm96ZGlsdSA9IEludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuSmlueVZ5ZGFqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3Rvcig2KSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmluZFNlbGVjdG9yKDYpIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgPT09IHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3Rvcig2KSEuZmluZEZpZWxkcygpLmdmaWVsZChcInNldFZhbHVlXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kU2VsZWN0b3IoNikhLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QnlTZWxlY3Rvcig2KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkpWXCI6IC8vIDZcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3Rvcig2KSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuVHlwS3Vyem92eWNoUm96ZGlsdSA9IEludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuSmlueVZ5ZGFqO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3Rvcig2KSEuZmluZEZpZWxkcygpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dCeVNlbGVjdG9yKDYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk5hc3RhdmVuaVZ5c2xlZGt1VnliZXJ1KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEaXNwbGF5UmVzdWx0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRLUlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0U01MXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRGlzcGxheVJlc3VsdCh0ZXh0S1I6IHN0cmluZywgdGV4dFNNTDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICQoXCIuanMtcmVzdWx0LUtSXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0ZXh0S1IpO1xyXG4gICAgICAgICAgICAkKFwiLmpzLXJlc3VsdC1TTUxcIikuZmluZEZpZWxkcygpLmdmaWVsZChcInNldFZhbHVlXCIsIHRleHRTTUwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgc21sb3V2eSBkbGUga3Vyem92ZWhvIHJvemRpbHVcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIE5hc3RhdlByaXN0dXBub3N0U21sb3V2eURsZUtSKHR5cEt1cnpvdnljaFJvemRpbHU6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdSkge1xyXG4gICAgICAgICAgICBpZiAodHlwS3Vyem92eWNoUm96ZGlsdSA9PSBJbnRlcmZhY2UuR0VUeXBLdXJ6b3Z5Y2hSb3pkaWx1Lkt1cnpvdmFadHJhdGFQcmlSZWFsaXphY2lWeWRhamVcclxuICAgICAgICAgICAgICAgIHx8IHR5cEt1cnpvdnljaFJvemRpbHUgPT0gSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdS5PcHJhdmFLdXJ6b3ZlWnRyYXR5UHJpUmVhbGl6YWNpVnlkYWplKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QcmlzdHVwbm9zdFNtbG91dnkgPSBJbnRlcmZhY2UuR0VQcmlzdHVwbm9zdFNtbG91dnkuUHJpc3R1cG5hUG92aW5uYTtcclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwS3Vyem92eWNoUm96ZGlsdSA9PSBJbnRlcmZhY2UuR0VUeXBLdXJ6b3Z5Y2hSb3pkaWx1Lkt1cnpvdmFadHJhdGFQcmlSZWFsaXphY2lQcmlqbXUgfHxcclxuICAgICAgICAgICAgICAgIHR5cEt1cnpvdnljaFJvemRpbHUgPT0gSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdS5PcHJhdmFLdXJ6b3ZlWnRyYXR5UHJpUmVhbGl6YWNpUHJpam11KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnB1dFBhcmFtcy5QaWsgPT0gMTApXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMTAuNy4yMDE0IFQuVi46IFVwcmF2ZW5vIGRsZSBtYWlsdSB6ZSBkbmUgMTAuNy4gU21sb3V2YSBwb3Zpbm5hIGRsZSBwYXJhbWV0cnVcclxuICAgICAgICAgICAgICAgICAgICAvL21fUHJpc3R1cG5vc3RTbWxvdXZ5ID0gR0VQcmlzdHVwbm9zdFNtbG91dnkuUHJpc3R1cG5hUG92aW5uYTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlByaXN0dXBub3N0U21sb3V2eSA9IHRoaXMuaW5wdXRQYXJhbXMuS3Vyem92ZVJvemRpbHlQb3Zpbm5hU21sb3V2YVpSUCA/IEludGVyZmFjZS5HRVByaXN0dXBub3N0U21sb3V2eS5QcmlzdHVwbmFQb3Zpbm5hIDogSW50ZXJmYWNlLkdFUHJpc3R1cG5vc3RTbWxvdXZ5LlByaXN0dXBuYU5lcG92aW5uYTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlByaXN0dXBub3N0U21sb3V2eSA9IEludGVyZmFjZS5HRVByaXN0dXBub3N0U21sb3V2eS5OZXByaXN0dXBuYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBLdXJ6b3Z5Y2hSb3pkaWx1ID09IEludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuWmlza1xyXG4gICAgICAgICAgICAgICAgfHwgdHlwS3Vyem92eWNoUm96ZGlsdSA9PSBJbnRlcmZhY2UuR0VUeXBLdXJ6b3Z5Y2hSb3pkaWx1Lk9wcmF2YVppc2t1KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QcmlzdHVwbm9zdFNtbG91dnkgPSBJbnRlcmZhY2UuR0VQcmlzdHVwbm9zdFNtbG91dnkuTmVwcmlzdHVwbmE7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cEt1cnpvdnljaFJvemRpbHUgPT0gSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdS5KaW55VnlkYWopXHJcbiAgICAgICAgICAgICAgICB0aGlzLlByaXN0dXBub3N0U21sb3V2eSA9IEludGVyZmFjZS5HRVByaXN0dXBub3N0U21sb3V2eS5QcmlzdHVwbmFOZXBvdmlubmE7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuUHJpc3R1cG5vc3RTbWxvdXZ5ID0gSW50ZXJmYWNlLkdFUHJpc3R1cG5vc3RTbWxvdXZ5Lk5lcHJpc3R1cG5hO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0VGV4dEt1cnpSb3pkaWx1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlcmZhY2UuR0VUeXBLdXJ6b3Z5Y2hSb3pkaWx1fSB0eXBLcnV6Um96XHJcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICBHZXRUZXh0S3VyelJvemRpbHUodHlwS3J1elJvejogSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdSk6IHN0cmluZyB7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwS3J1elJveiA9PT0gSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdS5aaXNrKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMDI1MDQxMVwiIC8vUkMgMzAyNTA0MTEgOiBLdXJ6b3bDvSB6aXNrXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cEtydXpSb3ogPT09IEludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuT3ByYXZhWmlza3UpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMwMjUwNDEyXCIgLy9SQyAzMDI1MDQxMiA6IE9wcmF2YSBrdXJ6b3bDqWhvIHppc2t1XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cEtydXpSb3ogPT09IEludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuS3Vyem92YVp0cmF0YVByaVJlYWxpemFjaVZ5ZGFqZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzAyNTA0MTNcIiAvL1JDIDMwMjUwNDEzIDogS3Vyem92w6EgenRyw6F0YSBwxZlpIHJlYWxpemFjaSB2w71kYWplXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cEtydXpSb3ogPT09IEludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuT3ByYXZhS3Vyem92ZVp0cmF0eVByaVJlYWxpemFjaVZ5ZGFqZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzAyNTA0MTRcIiAvL1JDIDMwMjUwNDE0IDogT3ByYXZhIGt1cnpvdsOpIHp0csOhdHkgcMWZaSByZWFsaXphY2kgdsO9ZGFqZVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBLcnV6Um96ID09PSBJbnRlcmZhY2UuR0VUeXBLdXJ6b3Z5Y2hSb3pkaWx1LkppbnlWeWRhailcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzAyNTA0MTVcIiAvL1JDIDMwMjUwNDE1IDogSmluw6kgdsO9ZGFqZVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBLcnV6Um96ID09PSBJbnRlcmZhY2UuR0VUeXBLdXJ6b3Z5Y2hSb3pkaWx1Lkt1cnpvdmFadHJhdGFQcmlSZWFsaXphY2lQcmlqbXUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMwMjUwNDE2XCIgLy9SQyAzMDI1MDQxNiA6IEt1cnpvdsOpIHp0csOhdHkgcMWZaSByZWFsaXphY2kgcMWZw61qbXVcclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwS3J1elJveiA9PT0gSW50ZXJmYWNlLkdFVHlwS3Vyem92eWNoUm96ZGlsdS5PcHJhdmFLdXJ6b3ZlWnRyYXR5UHJpUmVhbGl6YWNpUHJpam11KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMDI1MDQxN1wiIC8vUkMgMzAyNTA0MTcgOiBPcHJhdmEga3Vyem92w6kgenRyw6F0eSBwxZlpIHJlYWxpemFjaSBwxZnDrWptdVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAvL0ludGVyZmFjZS5HRVR5cEt1cnpvdnljaFJvemRpbHUuWmFkbnlcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzAyNTAyNzBcIiAvL1JDIDMwMjUwMjcwIDogTmVuYXN0YXZlbm9cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0VGV4dFByaXN0dXBub3N0U21sb3V2eVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZXJmYWNlLkdFUHJpc3R1cG5vc3RTbWxvdXZ5fSBwcmlzdHVub3N0U21sb3V2eVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEdldFRleHRQcmlzdHVwbm9zdFNtbG91dnkocHJpc3R1bm9zdFNtbG91dnk6IEludGVyZmFjZS5HRVByaXN0dXBub3N0U21sb3V2eSkge1xyXG4gICAgICAgICAgICBpZiAocHJpc3R1bm9zdFNtbG91dnkgPT09IEludGVyZmFjZS5HRVByaXN0dXBub3N0U21sb3V2eS5OZXVyY2VubylcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzAyNTA0MThcIiAvL1JDIDMwMjUwNDE4IDogTmV1csSNZW5vLCB6ZGEgc21sb3V2YSBidWRlIHDFmcOtc3R1cG7DoSwgbmVwxZnDrXN0dXBuw6FcclxuICAgICAgICAgICAgZWxzZSBpZiAocHJpc3R1bm9zdFNtbG91dnkgPT09IEludGVyZmFjZS5HRVByaXN0dXBub3N0U21sb3V2eS5OZXByaXN0dXBuYSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzAyNTA0MTlcIiAvL1JDIDMwMjUwNDE5IDogU21sb3V2YSBuZXDFmcOtc3R1cG7DoVxyXG4gICAgICAgICAgICBlbHNlIGlmIChwcmlzdHVub3N0U21sb3V2eSA9PT0gSW50ZXJmYWNlLkdFUHJpc3R1cG5vc3RTbWxvdXZ5LlByaXN0dXBuYU5lcG92aW5uYSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzAyNTA0MjBcIiAvL1JDIDMwMjUwNDIwIDogU21sb3V2YSBwxZnDrXN0dXBuw6EsIGFsZSBuZXBvdmlubsOhXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHByaXN0dW5vc3RTbWxvdXZ5ID09PSBJbnRlcmZhY2UuR0VQcmlzdHVwbm9zdFNtbG91dnkuUHJpc3R1cG5hUG92aW5uYSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzAyNTA0MjFcIiAvL1JDIDMwMjUwNDIxIDogU21sb3V2YSBwxZnDrXN0dXBuw6EgYSBwb3Zpbm7DoVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMwMjUwNDIyXCIgLy9SQyAzMDI1MDQyMiA6IE5lcG91xb5pdG9cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59Il19