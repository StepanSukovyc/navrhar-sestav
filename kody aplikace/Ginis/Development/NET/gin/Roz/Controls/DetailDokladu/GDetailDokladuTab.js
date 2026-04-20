"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Roz;
    (function (Roz) {
        var WebClient;
        (function (WebClient) {
            var gcontent = Decorators.gcontent;
            ////////////////////////////////////////////////////////////////////////////////////////////////////////
            //#region Konstanty a enumy pro tridu detailu
            // Delka zobrazeni zaskrtavatka po akci (hodnota pro setPending)
            const pendingTime = 100;
            ;
            ;
            //#endregion Seznam policek
            ////////////////////////////////////////////////////////////////////////////////////////////////////////
            /**
             * Detail rozpoctoveho dokladu
             * @author: K.Kratochvil
             * */
            let GDetailDokladuTab = class GDetailDokladuTab extends Gordic.GDetailBuilderContent {
                constructor() {
                    //////////////////////////////////////////
                    //#region Atributy tridy
                    // jsou to promenne pro data zaslana z C# kodu a odkazy na TS komponenty se kterymi budu pracovat
                    super(...arguments);
                    // Ulozena kopie dokladu po predchozi akci. Vyuziva se pri zruseni opravy dokladu/ zruseni porizovani ci opravy zapisu
                    this.previousDoklad = null;
                    //// Atribut oznacujici, ze probiha editace hlavicky
                    //private editHeader: boolean = false;
                    //// Atribut oznacujici, ze probiha editace zapisu
                    //private editRows: boolean = false;
                    // zakazani editace diky zmene profilu (profil zmenen)
                    this.changeProfile = false;
                    /**
                     * Priznak vkladani noveho radku
                     * Nejsem schopen v metode porizovace Commit rozeznat, jestli byl radek vlozeny nebo se opravuje.
                     * TODO: Zjistit, jestli to Tomas pouziva a pokud ne, tak vyhodit. Ja to nepouzivam
                     * */
                    this.newRowStart = false;
                    /// <summary>
                    /// Priznak, zda je rozeditovana hlavicka dokladu
                    /// </summary>
                    this.editHeader = false;
                    /// <summary>
                    /// Priznak, zda jsou rozeditovane zapisy
                    /// </summary>
                    this.editRows = false;
                    this.logOptions = { name: "GDetailDokladuTab", authorCode: 302, file: "GDetailDokladuTab.ts" };
                    // Umisteni zapisu
                    this.umisteniZapisu = Gordic.Roz.AppSettings.EGPolozkyView.Zalozka;
                    //#endregion Pomocne dialogy pro spusteni akce
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////
                }
                //#endregion Atributy
                /**
                 * Delagat voleny pred schvalovanim
                 * @param ixp
                 * @returns
                 */
                beforeNoveSchval(ixp) {
                    return $.Deferred().resolve().promise();
                }
                //////////////////////////////////////////
                //////////////////////////////////////////
                //#region Metoda onContentReady - zde jiz pouze pracuji s vyplnenymi daty vybudovanymi v ramci metod builderu
                /**
                 * onContentReady - metoda ktera se spusti pri zobrazeni detailu
                 *      Zde už builder dokončil práci a může následovat vlastní kód.
                 * */
                onContentReady() {
                    let that = this;
                    // defaultni nastaveni atributu
                    this.preFillInProgress = false;
                    // Identifikator contentu
                    //this.uid = "DetailRozDokladu#";
                    // flash se stavem knihy
                    Gordic.Eko.Utils.ShowEkoBookStateFlash(this, this.globals.EkoParams?.AktSubrady);
                    // Zobrazeni celeho dokladu
                    that.updateValueFields(); // Vyplnim vsechny polozky hlavicky
                    that.updateEnableFields(); // Nastavim jejich pristupnost
                    that.updateEnableMenuDoklad(); // Nastavim pristupnost menu
                    that.updateMenuPorizovac(false); // Nastacim pristupnost menu porizovace
                    that.updateStatusBar(); // A nakonec vyplnim stavy
                    // Po loadu musim nastavit priznak, protoze se vsechno nastavuje znovu
                    this.editHeader = this.action == 3 /* Uct.Interface.GEAkceFormulare.Podani */ || this.action == 14 /* Uct.Interface.GEAkceFormulare.Oprava */;
                    // Nastaveni focusu na cislo dokladu
                    // Dle stavu dokladu bych měl ale rozlisovat, kam presne se focus umisti
                    // Pokud nejsem v oprave, nastav focus na PID
                    // Jinak bych mel rozhodnout dle stavu dokladu, je to ne vzdy na typu dokladu
                    if (!this.editHeader) {
                        this.findFields(Gordic.Eko.HeaderForm.Fields.Id).gfield("focus");
                    }
                    else {
                        this.findFields(Gordic.Eko.HeaderForm.Fields.TypDokladu).gfield("focus");
                    }
                }
                //#endregion
                //////////////////////////////////////////
                //////////////////////////////////////////
                //#region Prace s akcemi nad dokladem
                /**
                 * Vytvoreni kolekce akci dostupnych na detailu
                 *
                 * Metoda vytvari kolekci vsech akci, ktere budou dostupne v detailu
                 *
                 * @returns {GActionList} kolekce dostupnych akci
                 * */
                createActions() {
                    let that = this;
                    // Vytvorim objekt literal kolekce akci
                    // Vsechny funkce Gordic.Eko.Action.action... vraci objekt GActionParamsDefObj
                    return {
                        ["actRozPodani" /* Actions.Podani */]: Gordic.Eko.Action.actionPodat({
                            run: function () {
                                const request = {
                                    ixp: null,
                                    dat_zmena: null,
                                    action: 3 /* Gordic.Uct.Interface.GEAkceFormulare.Podani */
                                };
                                // Vytvorim si promise na provadeny chain akce
                                let promise = that.executeAction(request);
                                // Zobraz probihajici akci
                                this.setPending(promise);
                                // Po provedeni akce zpracuj odpoved a prekresli detail i seznam
                                promise.then((response) => {
                                    // Novy pid, musim vytvorit cely novy content
                                    // 24.11.25 KK - nove se vraci cely doklad (i kdyz bez dat), je nutno si sahnout do hlavicky
                                    //                            return that.load?.({ ixp: response.Data.ixp, action: response.Data.action });
                                    return that.load?.({ ixp: response.data.header.ixp, action: 3 /* Gordic.Uct.Interface.GEAkceFormulare.Podani */ });
                                })
                                    .then(() => {
                                    // Nastav priznak, ze byla zahajena editace hlavicky
                                    that.editHeader = true;
                                });
                            }
                        }),
                        ["actRozEvidence" /* Actions.Evidence */]: Gordic.Eko.Action.actionEvidovat({
                            run: function () {
                                const request = {
                                    ixp: that.doklad.ixp,
                                    dat_zmena: that.doklad.header?.dat_zmena,
                                    action: 4 /* Gordic.Uct.Interface.GEAkceFormulare.Evidence */
                                };
                                // Nastav priznak, ze byla ukoncena editace hlavicky. 
                                // Toto musi byt nastaveno pred spustenim chain, aby se nespustila podminka na rozeditovanou hlavicku
                                that.editHeader = false;
                                // Vytvorim si promise na provadeny chain akce
                                let promise = that.executeAction(request);
                                // Zobraz probihajici akci
                                this.setPending(promise);
                                promise.then((response) => {
                                    // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                    that.previousDoklad = $.extend(true, {}, that.doklad);
                                    // Vracena data sloucim do noveho objektu dokladu. Provedu hlubokou kopii
                                    $.extend(true, that.doklad, response.data);
                                    // A aplikuj vysledne upravene hodnoty
                                    that.updateValueFields(); // Zmena hodnot na polich hlavicky (hodnoty z DB)
                                    that.updateEnableFields(); // Uzamceni policek po evidenci
                                    that.updateEnableMenuDoklad(); // Zmena pristupnosti menu
                                    that.updateMenuPorizovac(); // Po evidenci se musi zpristupnit i tlacitka porizovace
                                    that.updateStatusBar(); // A zmen i popis stavu dokladu
                                    return response;
                                });
                            }
                        }),
                        // Spusteni opravy hlavicky dokladu
                        ["actRozOpravaHlavicky" /* Actions.OpravaHlavicky */]: Gordic.Eko.Action.actionOpravit({
                            run: function () {
                                const request = {
                                    ixp: that.doklad.ixp,
                                    dat_zmena: that.doklad.header?.dat_zmena,
                                    action: 14 /* Gordic.Uct.Interface.GEAkceFormulare.Oprava */
                                };
                                // Vytvorim si promise na provadeny chain akce
                                let promise = that.executeAction(request);
                                // Zobraz probihajici akci
                                this.setPending(promise);
                                // V odpovedi je vraceny doklad s nastavenim prav
                                promise
                                    .then((response) => {
                                    // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                    that.previousDoklad = $.extend(true, {}, that.doklad);
                                    // Vracena data sloucim do noveho objektu dokladu. Provedu hlubokou kopii
                                    $.extend(true, that.doklad, response.Data);
                                    // A aplikuj vysledne upravene hodnoty
                                    that.updateEnableMenuDoklad();
                                    that.updateEnableFields();
                                    that.updateMenuPorizovac(); // Znepristupneni porizovace
                                    // Nastav priznak, ze byla zahajena editace hlavicky
                                    that.editHeader = true;
                                });
                            }
                        }),
                        // Zruseni opravy hlavicky
                        ["actRozZrusitOpravaHlavicky" /* Actions.ZrusitOpravaHlavicky */]: Gordic.Eko.Action.actionZrusitZmeny({
                            run: function () {
                                // Neni potreba nic nacitat na strane serveru. Pouze vratim puvodni data
                                // Preved puvodni kopii objektu do aktualniho dokladu - deep copy, ne referenci
                                that.doklad = $.extend(true, {}, that.previousDoklad);
                                // A prepis vsechny hodnoty na puvodni
                                that.updateValueFields(); // Zmena hodnot na polich hlavicky
                                that.updateEnableFields(); // Zmena pristupnosti policek
                                that.updateEnableMenuDoklad(); // Zmena pristupnosti akci
                                that.updateMenuPorizovac(); // Puvodni nastaveni menu porizovace
                                // Nastav priznak, ze byla ukoncena editace hlavicky
                                that.editHeader = false;
                            }
                        }),
                        // Schvaleni dokladu
                        ["actRozSchvaleni" /* Actions.Schvaleni */]: Gordic.Eko.Action.actionSchvalit({
                            run: function () {
                                const request = {
                                    ixp: that.doklad.ixp,
                                    dat_zmena: that.doklad.header?.dat_zmena,
                                    action: 7 /* Gordic.Uct.Interface.GEAkceFormulare.Schvaleni */
                                };
                                // Vytvorim si promise na provadeny chain akce
                                let promise = that.executeAction(request);
                                // Zobraz probihajici akci
                                this.setPending(promise);
                                // Po provedeni akce zpracuj odpoved a prekresli detail i seznam
                                promise.then((response) => {
                                    // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                    that.previousDoklad = $.extend(true, {}, that.doklad);
                                    // Vracena data sloucim do noveho objektu dokladu. Provedu hlubokou kopii
                                    $.extend(true, that.doklad, response.Data);
                                    // A aplikuj vysledne upravene hodnoty
                                    that.updateEnableMenuDoklad();
                                    that.updateEnableFields();
                                    that.updateStatusBar();
                                    return response;
                                });
                            }
                        }),
                        // Zapisy dokladu - nova vazba
                        ["actRozZapisy" /* Actions.Zapisy */]: Gordic.Eko.Action.actionUcetniZapisy({
                            caption: "jres:30250466", //RC 30250466 : Rozpočtové zápisy
                            enabled: false, run: function () {
                                that.VazbyDokladu();
                                //VazbyDokladu(that, that.UcetniDokladDto.HlavickaDokladu as any, false);
                            }
                        }),
                        // Odschvaleni dokladu
                        ["actRozZrusitSchvaleni" /* Actions.ZrusitSchvaleni */]: Gordic.Eko.Action.actionZrusitSchvaleni({
                            run: function () {
                                const request = {
                                    ixp: that.doklad.ixp,
                                    dat_zmena: that.doklad.header?.dat_zmena,
                                    action: 8 /* Gordic.Uct.Interface.GEAkceFormulare.Odschvaleni */
                                };
                                // Vytvorim si promise na provadeny chain akce
                                let promise = that.executeAction(request);
                                // Zobraz probihajici akci
                                this.setPending(promise);
                                // Po provedeni akce zpracuj odpoved a prekresli detail i seznam
                                promise.then((response) => {
                                    // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                    that.previousDoklad = $.extend(true, {}, that.doklad);
                                    // Vracena data sloucim do noveho objektu dokladu. Provedu hlubokou kopii
                                    $.extend(true, that.doklad, response.Data);
                                    // A aplikuj vysledne upravene hodnoty
                                    that.updateEnableMenuDoklad();
                                    that.updateEnableFields();
                                    that.updateStatusBar();
                                    return response;
                                });
                            }
                        }),
                        // Realizace dokladu
                        ["actRozRealizace" /* Actions.Realizace */]: Gordic.Eko.Action.actionZauctovat({
                            caption: "jres:30150140", //RC 30150140 : Realizovat
                            run: function () {
                                const request = {
                                    ixp: that.doklad.ixp,
                                    dat_zmena: that.doklad.header?.dat_zmena,
                                    action: 13 /* Gordic.Uct.Interface.GEAkceFormulare.Realizace */
                                };
                                // Vytvorim si promise na provadeny chain akce
                                let promise = that.executeAction(request);
                                // Zobraz probihajici akci
                                this.setPending(promise);
                                // Po provedeni akce zpracuj odpoved a prekresli detail i seznam
                                promise.then((response) => {
                                    // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                    that.previousDoklad = $.extend(true, {}, that.doklad);
                                    // Vracena data sloucim do noveho objektu dokladu. Provedu hlubokou kopii
                                    $.extend(true, that.doklad, response.Data);
                                    // A aplikuj vysledne upravene hodnoty
                                    that.updateEnableMenuDoklad(); // Zmena pristupnosti menu
                                    that.updateStatusBar();
                                    return response;
                                });
                            }
                        }),
                        // Stornovani dokladu
                        ["actRozStorno" /* Actions.Storno */]: Gordic.Eko.Action.actionStornovat({
                            run: function () {
                                const request = {
                                    ixp: that.doklad.ixp,
                                    dat_zmena: that.doklad.header?.dat_zmena,
                                    action: 16 /* Gordic.Uct.Interface.GEAkceFormulare.Storno */
                                };
                                // Vytvorim si promise na provadeny chain akce
                                let promise = that.executeAction(request);
                                // Zobraz probihajici akci
                                this.setPending(promise);
                                // Po provedeni akce zpracuj odpoved a prekresli detail i seznam
                                promise.then((response) => {
                                    // Pokud se vrati novy pid, musim prekreslit cely content
                                    if (response.Data.header.ixp != that.doklad.header?.ixp) {
                                        return that.load?.({ ixp: response.data.header.ixp, action: 16 /* Gordic.Uct.Interface.GEAkceFormulare.Storno */ });
                                    }
                                    else {
                                        // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                        that.previousDoklad = $.extend(true, {}, that.doklad);
                                        // Vracena data sloucim do noveho objektu dokladu. Provedu hlubokou kopii
                                        $.extend(true, that.doklad, response.Data);
                                        // A aplikuj vysledne upravene hodnoty
                                        that.updateEnableMenuDoklad(); // Zmena pristupnosti menu
                                        that.updateStatusBar();
                                        return response;
                                    }
                                });
                            }
                        }),
                        // Aktivace (odstornovani) dokladu
                        ["actRozZrusitStorno" /* Actions.ZrusitStorno */]: Gordic.Eko.Action.actionZrusitStorno({
                            run: function () {
                                const request = {
                                    ixp: that.doklad.ixp,
                                    dat_zmena: that.doklad.header?.dat_zmena,
                                    action: 17 /* Gordic.Uct.Interface.GEAkceFormulare.Aktivace */
                                };
                                // Vytvorim si promise na provadeny chain akce
                                let promise = that.executeAction(request);
                                // Zobraz probihajici akci
                                this.setPending(promise);
                                // Po provedeni akce zpracuj odpoved a prekresli detail i seznam
                                promise.then((response) => {
                                    // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                    that.previousDoklad = $.extend(true, {}, that.doklad);
                                    // Vracena data sloucim do noveho objektu dokladu. Provedu hlubokou kopii
                                    $.extend(true, that.doklad, response.Data);
                                    // A aplikuj vysledne upravene hodnoty
                                    that.updateEnableMenuDoklad(); // Zmena pristupnosti menu
                                    that.updateStatusBar();
                                    return response;
                                });
                            }
                        }),
                        // Uzavreni dokladu
                        ["actRozUzavreni" /* Actions.Uzavreni */]: Gordic.Eko.Action.actionUzavrit({
                            run: function () {
                                const request = {
                                    ixp: that.doklad.ixp,
                                    dat_zmena: that.doklad.header?.dat_zmena,
                                    action: 18 /* Gordic.Uct.Interface.GEAkceFormulare.Uzavreni */
                                };
                                // Vytvorim si promise na provadeny chain akce
                                let promise = that.executeAction(request);
                                // Zobraz probihajici akci
                                this.setPending(promise);
                                // Po provedeni akce zpracuj odpoved a prekresli detail i seznam
                                promise.then((response) => {
                                    // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                    that.previousDoklad = $.extend(true, {}, that.doklad);
                                    // Vracena data sloucim do noveho objektu dokladu. Provedu hlubokou kopii
                                    $.extend(true, that.doklad, response.Data);
                                    // A aplikuj vysledne upravene hodnoty
                                    that.updateEnableMenuDoklad(); // Zmena pristupnosti menu
                                    that.updateStatusBar();
                                    return response;
                                });
                            }
                        }),
                        ["actRozOdeslaniSP" /* Actions.OdeslaniSP */]: Gordic.Eko.Action.actionDetail({
                            caption: "jres:30150167", //RC 30150167 : Odeslat do IISSP
                            run: function () {
                                const request = {
                                    ixp: that.doklad.ixp,
                                    dat_zmena: that.doklad.header?.dat_zmena,
                                    action: 12 /* Gordic.Uct.Interface.GEAkceFormulare.OdeslaniDoSP */
                                };
                                // Vytvorim si promise na provadeny chain akce
                                let promise = that.executeAction(request);
                                // Zobraz probihajici akci
                                this.setPending(promise);
                                // Po provedeni akce zpracuj odpoved a prekresli detail i seznam
                                promise.then((response) => {
                                    // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                    that.previousDoklad = $.extend(true, {}, that.doklad);
                                    // Vracena data sloucim do noveho objektu dokladu. Provedu hlubokou kopii
                                    $.extend(true, that.doklad, response.Data);
                                    // A aplikuj vysledne upravene hodnoty
                                    that.updateEnableMenuDoklad(); // Zmena pristupnosti menu
                                    that.updateStatusBar();
                                    return response;
                                });
                            }
                        }),
                        // Preevidence dokladu
                        ["actRozPreevidence" /* Actions.Preevidence */]: Gordic.Eko.Action.actionPreevidovat({
                            run: function () {
                                const request = {
                                    ixp: that.doklad.ixp,
                                    dat_zmena: that.doklad.header?.dat_zmena,
                                    action: 23 /* Gordic.Uct.Interface.GEAkceFormulare.Preevidence */
                                };
                                // Vytvorim si promise na provadeny chain akce
                                let promise = that.executeAction(request);
                                // Zobraz probihajici akci
                                this.setPending(promise);
                                // Po provedeni akce zpracuj odpoved a prekresli detail i seznam
                                promise.then((response) => {
                                    // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                    that.previousDoklad = $.extend(true, {}, that.doklad);
                                    // Vracena data sloucim do noveho objektu dokladu. Provedu hlubokou kopii
                                    $.extend(true, that.doklad, response.Data);
                                    // A aplikuj vysledne upravene hodnoty
                                    that.updateEnableMenuDoklad(); // Zmena pristupnosti menu
                                    that.updateStatusBar();
                                    return response;
                                });
                            }
                        }),
                        // Predani dokladu
                        ["actRozPredani" /* Actions.Predani */]: Gordic.Eko.Action.actionPredat({
                            run: function () {
                                const request = {
                                    ixp: that.doklad.ixp,
                                    dat_zmena: that.doklad.header?.dat_zmena,
                                    action: 21 /* Gordic.Uct.Interface.GEAkceFormulare.Predani */
                                };
                                // Vytvorim si promise na provadeny chain akce
                                let promise = that.executeAction(request);
                                // Zobraz probihajici akci
                                this.setPending(promise);
                                // Po provedeni akce zpracuj odpoved a prekresli detail i seznam
                                promise.then((response) => {
                                    // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                    that.previousDoklad = $.extend(true, {}, that.doklad);
                                    // Vracena data sloucim do noveho objektu dokladu. Provedu hlubokou kopii
                                    $.extend(true, that.doklad, response.Data);
                                    // A aplikuj vysledne upravene hodnoty
                                    that.updateEnableMenuDoklad(); // Zmena pristupnosti menu
                                    that.updateStatusBar();
                                    return response;
                                });
                            }
                        }),
                        // Prevzeti dokladu
                        ["actRozPrevzeti" /* Actions.Prevzeti */]: Gordic.Eko.Action.actionPrevzit({
                            run: function () {
                                const request = {
                                    ixp: that.doklad.ixp,
                                    dat_zmena: that.doklad.header?.dat_zmena,
                                    action: 22 /* Gordic.Uct.Interface.GEAkceFormulare.Prevzeti */
                                };
                                // Vytvorim si promise na provadeny chain akce
                                let promise = that.executeAction(request);
                                // Zobraz probihajici akci
                                this.setPending(promise);
                                // Po provedeni akce zpracuj odpoved a prekresli detail i seznam
                                promise.then((response) => {
                                    // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                    that.previousDoklad = $.extend(true, {}, that.doklad);
                                    // Vracena data sloucim do noveho objektu dokladu. Provedu hlubokou kopii
                                    $.extend(true, that.doklad, response.Data);
                                    // A aplikuj vysledne upravene hodnoty
                                    that.updateEnableMenuDoklad(); // Zmena pristupnosti menu
                                    that.updateStatusBar();
                                    return response;
                                });
                            }
                        }),
                        // Prideleni dokladu
                        ["actRozPrideleni" /* Actions.Prideleni */]: Gordic.Eko.Action.actionPridelit({
                            run: function () {
                                const request = {
                                    ixp: that.doklad.ixp,
                                    dat_zmena: that.doklad.header?.dat_zmena,
                                    action: 24 /* Gordic.Uct.Interface.GEAkceFormulare.Prideleni */
                                };
                                // Vytvorim si promise na provadeny chain akce
                                let promise = that.executeAction(request);
                                // Zobraz probihajici akci
                                this.setPending(promise);
                                // Po provedeni akce zpracuj odpoved a prekresli detail i seznam
                                promise.then((response) => {
                                    // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                    that.previousDoklad = $.extend(true, {}, that.doklad);
                                    // Vracena data sloucim do noveho objektu dokladu. Provedu hlubokou kopii
                                    $.extend(true, that.doklad, response.Data);
                                    // A aplikuj vysledne upravene hodnoty
                                    that.updateEnableMenuDoklad(); // Zmena pristupnosti menu
                                    that.updateStatusBar();
                                    return response;
                                });
                            }
                        }),
                        // Vraceni dokladu do WFL
                        ["actRozVraceniDoWfl" /* Actions.VraceniDoWfl */]: Gordic.Eko.Action.actionVratitDoWfl({
                            run: function () {
                                const request = {
                                    ixp: that.doklad.ixp,
                                    dat_zmena: that.doklad.header?.dat_zmena,
                                    action: 26 /* Gordic.Uct.Interface.GEAkceFormulare.VraceniDoWfl */
                                };
                                // Vytvorim si promise na provadeny chain akce
                                let promise = that.executeAction(request);
                                // Zobraz probihajici akci
                                this.setPending(promise);
                                // Po provedeni akce zpracuj odpoved a prekresli detail i seznam
                                promise.then((response) => {
                                    // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                    that.previousDoklad = $.extend(true, {}, that.doklad);
                                    // Vracena data sloucim do noveho objektu dokladu. Provedu hlubokou kopii
                                    $.extend(true, that.doklad, response.Data);
                                    // A aplikuj vysledne upravene hodnoty
                                    that.updateEnableMenuDoklad(); // Zmena pristupnosti menu
                                    that.updateStatusBar();
                                    return response;
                                });
                            }
                        }),
                        ////////////////////////////////////////////
                        // Akce porizovace
                        ["actRozPolozkyNovyRadek" /* Actions.PorizovacNovy */]: Gordic.Eko.Action.actionNovy({
                            run: function () {
                                const request = {
                                    ixp: that.doklad.ixp,
                                    dat_zmena: that.doklad.header?.dat_zmena,
                                    action: 29 /* Gordic.Uct.Interface.GEAkceFormulare.PorizovacNovy */
                                };
                                // Vytvorim si promise na provadeny chain akce
                                let promise = that.executeAction(request);
                                // Zobraz probihajici akci
                                this.setPending(promise);
                                promise.then((response) => {
                                    // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                    that.previousDoklad = $.extend(true, {}, that.doklad);
                                    // Vracena data sloucim do noveho objektu dokladu. Provedu hlubokou kopii
                                    $.extend(true, that.doklad, response.Data);
                                    // Nyni si musim vytahnout posledni radek, ktery je "rozpracovany"
                                    const lastRow = that.doklad.rows[that.doklad.rows.length - 1];
                                    // Vyvolani udalosti start v porizovaci: ggridroweditor.start(ev,info)
                                    that.$porizovac.ggridroweditor("addRow", { ...lastRow, newRow: true });
                                });
                            }
                        }),
                        ["actRozPolozkyUlozit" /* Actions.PorizovacUlozit */]: Gordic.Eko.Action.actionUlozit({
                            run: () => {
                                // Zde volam pouze ulozeni v porizovaci, cela akce je volana v ramci metody ggridroweditor.save()
                                that.$porizovac.ggridroweditor("commit");
                            }
                        }),
                        ["actRozPolozkyZrusit" /* Actions.PorizovacZrusit */]: Gordic.Eko.Action.actionZrusit({
                            run: () => {
                                if (this.preFillInProgress)
                                    Gordic.Widget.GMagicPreFiller.cancelAction.run({ cellInfo: that.$porizovac.ggrid("activeCellAddress") });
                                else
                                    // Toto vyvola udalost na porizovaci (ggridroweditor) beforeCancel a Cancel
                                    that.$porizovac.ggridroweditor("cancel");
                            }
                        }),
                        // Stisknuti tlacitka Opravit na porizovaci
                        ["actRozPolozkyOpravit" /* Actions.PorizovacOpravit */]: Gordic.Eko.Action.actionOpravit({
                            run: function () {
                                // Pouze spustim editaci na vybranem radku
                                that.$porizovac.ggridroweditor("start");
                            }
                        }),
                        // Stisknuti tlacitka Odstranit zapis
                        ["actRozPolozkyOdstranit" /* Actions.PorizovacOdstranit */]: Gordic.Eko.Action.actionOdstranit({
                            run: function () {
                                const request = {
                                    ixp: that.doklad.ixp,
                                    dat_zmena: that.doklad.header?.dat_zmena,
                                    action: 33 /* Gordic.Uct.Interface.GEAkceFormulare.PorizovacOdstranit */
                                };
                                // Vytvorim si promise na provadeny chain akce
                                let promise = that.executeAction(request);
                                // Zobraz probihajici akci
                                this.setPending(promise);
                                // Po provedeni akce zpracuj odpoved a prekresli detail i seznam
                                promise.then((response) => {
                                    // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                    that.previousDoklad = $.extend(true, {}, that.doklad);
                                    // Vracena data sloucim do noveho objektu dokladu. Provedu hlubokou kopii
                                    $.extend(true, that.doklad, response.Data);
                                    // Data se slouci, ale uzivatel radky odstranil. Musim si je tedy natvrdo prepsat
                                    that.doklad.rows = response.Data.rows;
                                    // A nyni aktualizuj data porizovace (view)
                                    const view = that.$porizovac.ggrid("getView");
                                    view.updateData(that.doklad.rows);
                                    that.updateMenuPorizovac(false);
                                    that.updateStatusBar();
                                    return response;
                                });
                            }
                        }),
                        ["actRozPolozkyPredkontace" /* Actions.PorizovacPredkontace */]: {
                            caption: "jres:30250412", //RC 30250412 : Předkontace
                            enabled: false,
                            run: function () {
                                that.StartPredkontace();
                            }
                        },
                        ["actPredkontaceVsech" /* Actions.PorizovacPrekontaceVytvoritVsech */]: {
                            caption: "jres:30250418", //RC 30250418 : dle všech řádků
                            enabled: false,
                            run: function () {
                                that.PredkontaceZeZapisu();
                            }
                        },
                        ["actPredkontaceOzn" /* Actions.PorizovacPrekontaceVytvoritOznacene */]: {
                            caption: "jres:30250419", //RC 30250419 : dle označených řádků
                            enabled: false,
                            run: function () {
                                that.PredkontaceZeZapisu(false);
                            }
                        },
                        ["acttRozPolozkyImportZeSchranky" /* Actions.PorizovacImportSchranka */]: {
                            caption: "jres:30250373", //RC 30250373 : Import ze schránky
                            enabled: false,
                            run: function () {
                                this.setPending(that.HromadneOperaceRadky("IMPCLIP"));
                            }
                        },
                        ["acttRozPolozkyImportZeSouboru" /* Actions.PorizovacImportSoubor */]: {
                            caption: "jres:30250374", //RC 30250374 : Import ze souboru
                            enabled: false,
                            run: function () {
                                this.setPending(that.HromadneOperaceRadky("IMPFILE"));
                            }
                        },
                        ["actIIISSPKumulovatBezNul" /* Actions.IISSPStrukturaKumulovatBezNul */]: {
                            caption: "jres:30250438", //RC 30250438 : Kumulovat dle IISSP bez nulových částek
                            enabled: false,
                            checked: true,
                            run: function () {
                                this.enabled(false);
                                this.checked(true);
                                that.UpdateAction([that.actions["actIIISSPKumulovatDelIISSP" /* Actions.IISSPStrukturaKumulovatDleIISSP */], that.actions["actIIISSPBezKumulace" /* Actions.IISSPStrukturaBezKumulace */]
                                ], { enabled: true, checked: false });
                                this.setPending(that.loadIKRows());
                                //this.setPending(that.loadIKRows("KUM_BEZ"));
                            }
                        },
                        ["actIIISSPKumulovatDelIISSP" /* Actions.IISSPStrukturaKumulovatDleIISSP */]: {
                            caption: "jres:30250439", //RC 30250439 : Kumulovat dle IISSP
                            enabled: true,
                            checked: false,
                            run: function () {
                                this.enabled(false);
                                this.checked(true);
                                that.UpdateAction([that.actions["actIIISSPKumulovatBezNul" /* Actions.IISSPStrukturaKumulovatBezNul */], that.actions["actIIISSPBezKumulace" /* Actions.IISSPStrukturaBezKumulace */]
                                ], { enabled: true, checked: false });
                                this.setPending(that.loadIKRows());
                            }
                        },
                        ["actIIISSPBezKumulace" /* Actions.IISSPStrukturaBezKumulace */]: {
                            caption: "jres:30250440", //RC 30250440 : Bez kumulace
                            enabled: true,
                            checked: false,
                            run: function () {
                                this.enabled(false);
                                this.checked(true);
                                that.UpdateAction([that.actions["actIIISSPKumulovatBezNul" /* Actions.IISSPStrukturaKumulovatBezNul */], that.actions["actIIISSPKumulovatDelIISSP" /* Actions.IISSPStrukturaKumulovatDleIISSP */]
                                ], { enabled: true, checked: false });
                                this.setPending(that.loadIKRows());
                            }
                        },
                        ["actIIISSZaHlavicku" /* Actions.IISSPStrukturaZaHlavicku */]: {
                            caption: "jres:30250441", //RC 30250441 : Zápisy za hlavičku
                            enabled: true,
                            checked: false,
                            visible: that.doklad.header?.ixs_ahl !== null && that.doklad.header?.ixs_ahl?.trim() !== "",
                            run: function () {
                                this.checked(!this.checked());
                                this.setPending(that.loadIKRows());
                            }
                        }
                    };
                }
                /**
                 * Seznam akci dostupnych v menu baru dokladu
                 *
                 * @returns {Gin.DetailBuilder.GDetailBuilderMenuItemDef} kolekce dostupnych akci
                 * @description Metoda vytvari kolekci akci, ktere jsou zobrazene v menubaru (hamburger vpravo nahore)
                 * */
                createMenuDoklad() {
                    // TODO: tohle se bude muset vytvaret dynamicky dle stavu dokladu
                    return [
                        "actRozPodani" /* Actions.Podani */,
                        "actRozEvidence" /* Actions.Evidence */,
                        { action: "actRozOpravaHlavicky" /* Actions.OpravaHlavicky */, favorite: true },
                        "actRozZrusitOpravaHlavicky" /* Actions.ZrusitOpravaHlavicky */,
                        "actRozZapisy" /* Actions.Zapisy */,
                        { action: "actRozSchvaleni" /* Actions.Schvaleni */, favorite: true },
                        "actRozZrusitSchvaleni" /* Actions.ZrusitSchvaleni */,
                        "actRozOdeslaniSP" /* Actions.OdeslaniSP */,
                        { action: "actRozRealizace" /* Actions.Realizace */, favorite: true },
                        "actRozStorno" /* Actions.Storno */,
                        "actRozZrusitStorno" /* Actions.ZrusitStorno */,
                        "actRozUzavreni" /* Actions.Uzavreni */,
                        { type: "separator" },
                        "actRozPreevidence" /* Actions.Preevidence */,
                        "actRozPredani" /* Actions.Predani */,
                        "actRozPrevzeti" /* Actions.Prevzeti */,
                        "actRozPrideleni" /* Actions.Prideleni */,
                        "actRozVraceniDoWfl" /* Actions.VraceniDoWfl */,
                    ];
                }
                /**
                 * Nastaveni pristupnosti nad akcemi dokladu
                 * */
                updateEnableMenuDoklad() {
                    const that = this;
                    const permissions = that.doklad.ActionPermissions;
                    // Nastavi enable a tooltip
                    this.actions["actRozPodani" /* Actions.Podani */]?.updatePermission(permissions?.Podani);
                    this.actions["actRozEvidence" /* Actions.Evidence */]?.updatePermission(permissions?.Evidence);
                    this.actions["actRozOpravaHlavicky" /* Actions.OpravaHlavicky */]?.updatePermission(permissions?.Oprava);
                    this.actions["actRozZrusitOpravaHlavicky" /* Actions.ZrusitOpravaHlavicky */]?.updatePermission(permissions?.Zrusit);
                    this.actions["actRozZapisy" /* Actions.Zapisy */]?.updatePermission(permissions?.Vazba);
                    this.actions["actRozSchvaleni" /* Actions.Schvaleni */]?.updatePermission(permissions?.Schvaleni);
                    this.actions["actRozZrusitSchvaleni" /* Actions.ZrusitSchvaleni */]?.updatePermission(permissions?.Odschvaleni);
                    //this.actions["actValidace"]?.updatePermission(permissions?.Validace);
                    //this.actions["actZrusitValidace"]?.updatePermission(permissions?.Odvalidace);
                    this.actions["actRozOdeslaniSP" /* Actions.OdeslaniSP */]?.updatePermission(permissions?.OdeslaniSP);
                    this.actions["actRozRealizace" /* Actions.Realizace */]?.updatePermission(permissions?.Realizace);
                    //this.actions["actPotvrzeni"]?.updatePermission(permissions?.Potvrzeni);
                    this.actions["actRozStorno" /* Actions.Storno */]?.updatePermission(permissions?.Storno);
                    this.actions["actRozZrusitStorno" /* Actions.ZrusitStorno */]?.updatePermission(permissions?.Aktivace);
                    this.actions["actRozUzavreni" /* Actions.Uzavreni */]?.updatePermission(permissions?.Uzavrit);
                    this.actions["actRozPreevidence" /* Actions.Preevidence */]?.updatePermission(permissions?.Preevidence);
                    this.actions["actRozPredani" /* Actions.Predani */]?.updatePermission(permissions?.Predat);
                    this.actions["actRozPrevzeti" /* Actions.Prevzeti */]?.updatePermission(permissions?.Prevzit);
                    this.actions["actRozPrideleni" /* Actions.Prideleni */]?.updatePermission(permissions?.Pridelit);
                    this.actions["actRozVraceniDoWfl" /* Actions.VraceniDoWfl */]?.updatePermission(permissions?.VraceniDoWfl);
                }
                /**
                 * Seznam akci dostupnych v hlavicce porizovace
                 *
                 * @returns {Gin.DetailBuilder.GDetailBuilderMenuItemDef} kolekce dostupnych akci
                 * @description Metoda vytvari kolekci akci, ktere jsou zobrazene v menubaru (hamburger vpravo nahore)
                 * */
                createMenuPorizovac() {
                    return [
                        { id: "menuPorizovacNovy", action: "actRozPolozkyNovyRadek" /* Actions.PorizovacNovy */, favorite: true },
                        { id: "menuPorizovacUlozit", action: "actRozPolozkyUlozit" /* Actions.PorizovacUlozit */, favorite: true },
                        { action: "actRozPolozkyZrusit" /* Actions.PorizovacZrusit */, favorite: true },
                        { action: "actRozPolozkyOpravit" /* Actions.PorizovacOpravit */, favorite: true },
                        { action: "actRozPolozkyOdstranit" /* Actions.PorizovacOdstranit */, favorite: true },
                        { type: "separator" },
                        {
                            id: "menuaAgImport", caption: "jres:30250375", type: "static", favorite: true, children: [
                                { id: "menuPolozkyImportSoubor", action: "acttRozPolozkyImportZeSouboru" /* Actions.PorizovacImportSoubor */, favorite: false },
                                { id: "menuPolozkyImportSchranky", action: "acttRozPolozkyImportZeSchranky" /* Actions.PorizovacImportSchranka */, favorite: false },
                            ]
                        },
                        { type: "separator" },
                        {
                            id: "menuAgPredkontace", caption: "jres:30250417", type: "static", favorite: true, children: [
                                { id: "menuAgPredkontaceOzn", action: "actPredkontaceOzn" /* Actions.PorizovacPrekontaceVytvoritOznacene */, favorite: false },
                                { id: "menuAgPredkontaceVse", action: "actPredkontaceVsech" /* Actions.PorizovacPrekontaceVytvoritVsech */, favorite: false },
                            ]
                        },
                    ];
                }
                ///**
                // * Nastaveni pristupnosti nad akcemi porizovace
                // * @param [editRow=false] priznak, zda edituji radek
                // * */
                updateMenuPorizovac(editRow = false) {
                    const that = this;
                    const p = that.doklad.ActionPermissions;
                    const gp = (serverPerm, editValue) => editRow ? { value: editValue } : (serverPerm || null);
                    this.actions["actRozPolozkyNovyRadek" /* Actions.PorizovacNovy */]?.updatePermission(gp(p?.NovyPorizovac, false));
                    this.actions["actRozPolozkyUlozit" /* Actions.PorizovacUlozit */]?.updatePermission(gp(p?.UlozitPorizovac, true));
                    this.actions["actRozPolozkyZrusit" /* Actions.PorizovacZrusit */]?.updatePermission(gp(p?.ZrusitPorizovac, true));
                    this.actions["actRozPolozkyOpravit" /* Actions.PorizovacOpravit */]?.updatePermission(gp(p?.OpravitPorizovac, false));
                    this.actions["actRozPolozkyOdstranit" /* Actions.PorizovacOdstranit */]?.updatePermission(gp(p?.OdstranitPorizovac, false));
                    this.actions["actRozPolozkyPredkontace" /* Actions.PorizovacPredkontace */]?.updatePermission(gp(p?.PredkontacePorizovac, false));
                    this.actions["acttRozPolozkyImportZeSchranky" /* Actions.PorizovacImportSchranka */]?.updatePermission(gp(p?.ImportZapisuPorizovac, false));
                    this.actions["acttRozPolozkyImportZeSouboru" /* Actions.PorizovacImportSoubor */]?.updatePermission(gp(p?.ImportZapisuPorizovac, false));
                    this.actions["actPredkontaceOzn" /* Actions.PorizovacPrekontaceVytvoritOznacene */]?.updatePermission(gp(p?.VytvoritPredkontaciPorizovac, false));
                    this.actions["actPredkontaceVsech" /* Actions.PorizovacPrekontaceVytvoritVsech */]?.updatePermission(gp(p?.VytvoritPredkontaciPorizovac, false));
                }
                /**
                 * Seznam akci dostupnych pod dokladem
                 *
                 * Metoda vytvari kolekci akci, ktere jsou zobrazene pod dokladem (pod kartou)
                 *
                 * @description Automaticky je zobrazeno tlačítko zavřít, zde mohu přidat dalši akce
                 * @returns {Gin.DetailBuilder.GDetailBuilderMenuItemDef} kolekce dostupnych akci
                 * */
                createCommandBar() {
                    // Pridani tlacitka vedle Zavrit.
                    // Primary znaci, ze je to predvybrana akce.
                    // Pristupnost se ridi povolenim akce (Action)
                    return [
                        { action: "actRozEvidence" /* Actions.Evidence */, primary: true }, // Ulozit
                    ];
                }
                //#endregion
                //////////////////////////////////////////
                //////////////////////////////////////////
                //#region Prace se status barem
                /**
                 * Seznam policek pro zobrazeni stavu
                 * @returns {statusBar?: GDetailBuilderMenuItemDef | null} kolekce objektu se stavem
                 * */
                createStatusBar() {
                    let that = this;
                    return [
                        // Vytvoreni barevneho kolecka znaciciho stav dokladu (uzivatelsky menitelny)
                        // Pokud se barva kolecka zmeni, vola se metoda afterChangeMethod
                        Gordic.Eko.Detail.StatusBar.createUzo({
                            ixp: that.doklad.header.ixp,
                            uzo: that.doklad.dokument?.uzo,
                            readonly: that.doklad.header.ixs_fun_akt !== that.globals.SessionParams?.IxsFun,
                            globalSettings: this?.globalSettings,
                        }, 
                        // afterChangeMethod - volano po zmene barvy kolecka
                        () => that.refreshSeznam(that.doklad.ixp), 
                        // params
                        { id: "statusBarUzo" }),
                        // Stav dokladu - vytvareno spolecnou funkci, vraci objekt typu GDetailBuilderMenuItemDef
                        // return new GObservableObject<MenuParams>($.extend({ type: "static", caption: "", customClass: "g-state-text" }, params));
                        Gordic.Eko.Detail.StatusBar.createItem({ id: "stavDokladu" }), // Vytvoreni polozky pro statusbar, pres id ji mohu aktualizovat a odkazovat na polozku pres this
                        // Stav storno - staticky objekt typu GDetailBuilderMenuItemDef
                        //{ id: "stavStorno", type: "static", caption: that.doklad.header?.stav_storno_txt!.toLocaleUpperCase(), customClass: Gordic.Global.Enums.ColorStateClass.error }, // cervena barva
                        Gordic.Eko.Detail.StatusBar.createItem({ id: "stavStorno", caption: that.doklad.header?.stav_storno_txt.toLocaleUpperCase(), customClass: Gordic.Global.Enums.ColorStateClass.error }),
                        // Stav schvalovaciho procesu - staticky objekt typu GDetailBuilderMenuItemDef
                        //{ id: "stavEpk", type: "static", caption: that.doklad.header?.stav_epk_txt!.toLocaleUpperCase() },
                        Gordic.Eko.Detail.StatusBar.createItem({ id: "stavEpk", caption: that.doklad.header?.stav_epk_txt.toLocaleUpperCase() }),
                        // Stav ve statni pokladne - staticky objekt typu GDetailBuilderMenuItemDef
                        //{ id: "stavIissp", type: "static", caption: that.doklad.header?.stav_iissp_txt!.toLocaleUpperCase() },
                        Gordic.Eko.Detail.StatusBar.createItem({ id: "stavIissp", caption: that.doklad.header?.stav_iissp_txt.toLocaleUpperCase() }),
                    ];
                }
                /**
                 * Aktualizace statusbaru s aktuálními hodnotami
                 */
                updateStatusBar() {
                    if (!this.statuses || !this.doklad.header)
                        return;
                    const header = this.doklad.header;
                    const update = (id, caption, customClass) => {
                        const status = this.statuses[id];
                        if (status) {
                            Gordic.Eko.Detail.StatusBar.updateItem(status, caption?.toLocaleUpperCase() ?? "", // Optional chaining ošetří i null
                            customClass ?? null);
                        }
                    };
                    update("stavDokladu", header.stav_dokl_txt, this.getStatusColor());
                    update("stavStorno", header.stav_storno_txt, null);
                    update("stavEpk", header.stav_epk_txt, null);
                    update("stavIissp", header.stav_iissp_txt, null);
                }
                /**
                 * Urceni vysledne barvy stavu dokladu
                 * */
                getStatusColor() {
                    const header = this.doklad.header;
                    if (header.eko_akt === 500 /* Gordic.Eko.Interface.GEAktivitaDokladu.Storno */) {
                        return Gordic.Utils.Colors.textError;
                    }
                    const colorMap = {
                        [40 /* Gordic.Eko.Interface.GEStavyDokladu.Zauctovano */]: Gordic.Utils.Colors.stateActive,
                        [50 /* Gordic.Eko.Interface.GEStavyDokladu.Uzavreno */]: Gordic.Utils.Colors.stateInactiveFn("data-deleted"),
                        [30 /* Gordic.Eko.Interface.GEStavyDokladu.Schvaleno */]: Gordic.Utils.Colors.stateSuccess,
                    };
                    return colorMap[header.s_zau] ?? Gordic.Utils.Colors.stateInfo;
                }
                //#endregion
                //////////////////////////////////////////
                //////////////////////////////////////////
                //#region Metoda onDetailBuilderInit
                /**
                 * onDetailBuilderInit
                 *
                 * Událost oznamuje, že builder má k dispozici data všech komponent a chystá se sloučit je do vnitřních polí definic
                 *
                 * @param builder {Gordic.Gin.DetailBuilder.GDetailBuilder} instance DetailBuilderu, na které je ještě možné přidat / odebrat / přesunout / upravit komponenty před tím, než budou jejich definice sloučeny.
                 */
                onDetailBuilderInit(builder) {
                    // volána před spojením komponent, je tedy možné ovlivnit pořadí komponent, odebrat, přidat či modifikovat komponenty
                    // Tato cast vytvari jednotlive komponenty (kosticky). Zde si vytvarim i svoje taby.
                    // Hlavicka bude vytvorena teprve az v ramci volani metody onDetailBuilderBuild
                    // This se neustale meni dle objektu. Zde si tedy ulozim odkaz na cely Content (GDetailBuilder)
                    let that = this;
                    that.umisteniZapisu = that.globalSettings?.get(Gordic.Roz.AppSettings.appPath + ".RozSettingsForm.PolozkyView") ?? Gordic.Roz.AppSettings.EGPolozkyView.Zalozka;
                    //if (typeof rozmisteniPolozek === "undefined")
                    //    rozmisteniPolozek = Gordic.Roz.AppSettings.EGPolozkyView.Zalozka;                
                    // Toto vytvari jednu "kosticku", pridava komponentu do Builderu
                    // withComponent<GContent>(id: string, component: GDetailBuilderComponent<GContent>, toStart?: boolean): GDetailBuilder
                    builder.withComponent("detail", // id: string
                    {
                        // Kolekce vsech akci povolenych na detailu
                        actions: that.createActions(),
                        // Kolekce akci dostupnych v menu
                        menuBar: that.createMenuDoklad(),
                        // Kolekce tlacitek (akci) pod dokladem
                        commandBar: that.createCommandBar(),
                        // Kolekce stavu dokladu
                        statusBar: that.createStatusBar(),
                        // Existuje hlavicka detailu vytvarena v onDetailBuilderBuild
                        // Pod nim nasleduje vodorovny seznam tabu ktere jsou na hlavni strance. 
                        // Umoznuje rozdelit detail dokladu na vice zalozek (napr agendove udaje, financni profil, rozsireny profil (nove popisne vlastnosti) atd.
                        // Ostatni spolecne tabgrupy jsou vkladany do builderu jinym zpusobem (v C# kodu detailu)
                        // 16.08.22 KK - dle uzivatelskeho nastaveni je mozno porizovac zobrazit v samostatne zalozce a nebo primo v Zakladnich udajich
                        tabGroups: //tabGroups,
                        (that.umisteniZapisu === Gordic.Roz.AppSettings.EGPolozkyView.Zalozka
                            ?
                                [
                                    Gordic.Prefabs.TabGroups.Agenda(),
                                    { id: "subZapisy", caption: "jres:30150084" }, //RC 30150084 : Položky
                                    this.isShowTabStrukturaIISSP ? { id: "subStruktura", caption: "jres:30250420" } : undefined, //RC 30250420 : Struktura v IISSP
                                    this.isShowTabUkazatele ? { id: "subUkazatele", caption: "jres:30250444" } : void 0 //RC 30250444 : Ukazatelé
                                ]
                            : undefined)?.filter(Boolean),
                        /////////////////////////////////////////
                        // Popis jednotlivych tabgrupu (zalozek)
                        tabs: [
                            // Tab "Základní údaje"
                            {
                                tabParams: // TabParamsId
                                {
                                    id: "tabHlavickaDokladu",
                                    // Nadpis TABu v tabgroup
                                    title: "jres:30150068", //RC 30150068 : Hlavička rozpočtového dokladu
                                    opened: true,
                                    locked: false,
                                    group: Gordic.Prefabs.TabGroups.Agenda(), // Ke ktere skupine Tabu nalezi
                                    headerClass: "hidden",
                                },
                                // Metoda pro vytvoreni Tabu
                                init: (tab) => // tab:JQuery<HTMLElement> => void
                                 {
                                    // Zde zacinam vytvaret objekt formulare, ktery pozdeji vlozim do html
                                    let formDetail = new Gordic.Forms.Form({ name: "formDetail", layoutDescriptor: "L2M2S1" });
                                    // Sekce s datumem, druhem dokladu a subradou
                                    formDetail
                                        .addSection({ label: "jres:30150069" }) //RC 30150069 : Informace o dokladu
                                        // Datum rozpoctoveho dokladu
                                        .addPrefab(Gordic.Gin.Prefabs.denMesicRok({
                                        name: "formDatumField" /* Fields.Datum */,
                                        //ekoDate: true,
                                        fields: ["rok", "mesic", "den"],
                                        yearFieldOptions: {
                                            name: "formRokField" /* Fields.Rok */,
                                            disabled: true,
                                            model: "rok"
                                        },
                                        monthFieldOptions: {
                                            name: "formMesicField" /* Fields.Mesic */,
                                            model: "mesic",
                                            flag: Gordic.Prefabs.Field.Flags.required,
                                            validators: [new Gordic.Validators.Required()],
                                            itemTemplate: "{cislo}",
                                            disabled: that.doklad.FieldPermissions?.Mesic.value === false,
                                            // Muj novy reader, ktery mi vyplni jen platne hodnoty
                                            data: new Gordic.Data.Readers.Rozsobd(),
                                            serverFilters: {
                                                rok: that.doklad.header?.rok,
                                                lic: that.doklad.header?.lic,
                                                ico: that.doklad.header?.ico,
                                                ucs: that.doklad.header?.ucs,
                                                akt_obd: 100, // pouze aktivni obdobi
                                                drd: () => { return that.findFields("formDrdField" /* Fields.Drd */).gfield("getValueAsync").then((value) => { return value ? value.drd : null; }); },
                                            },
                                            change: function (ev, changeObj) {
                                                // changeObj obsahuje novou vybranou hodnotu. Pri zmene mesice musim nejprve vymazat puvodni DRD a subradu a zpristupnit pole
                                                // Vymazani drdu
                                                that.findFields("formDrdField" /* Fields.Drd */).gfield("clear");
                                                // Vymazani subrady
                                                that.findFields("formCisloDokladuField" /* Fields.CisloDokladu */).gfield("clear");
                                                // znepristupnim/zpristupneni druhu dokladu
                                                that.findFields("formDrdField" /* Fields.Drd */).gfield("option", { disabled: changeObj == null || changeObj.value == null });
                                            },
                                        },
                                        dayFieldOptions: {
                                            name: "formDenField" /* Fields.Den */,
                                            model: "den",
                                            flag: Gordic.Prefabs.Field.Flags.required,
                                            validators: [new Gordic.Validators.Required()],
                                            disabled: that.doklad.FieldPermissions?.Den.value === false,
                                            itemTemplate: (value) => {
                                                return value ? (value < 10 ? '0' + value : String(value)) : value;
                                            },
                                            //    if (value != null) {
                                            //        return (value as number < 10 ? '0' + value : String(value)) as string;
                                            //    }
                                            //    else return value as any;
                                            //},
                                        },
                                        label: "jres:30150071", //RC 30150071 : Rok - Měsíc - Den
                                        output: "singleValues"
                                    }))
                                        // Druh dokladu
                                        .addRow({ label: "jres:30150055" }) //RC 30150055 : Druh dokladu
                                        .addField("gselectbox", // typ widgetu
                                    Gordic.Prefabs.Select.ekocdrdRoz(), // metoda vraci atributy data, itemTemplate a helperColumns
                                    {
                                        name: "formDrdField" /* Fields.Drd */,
                                        model: "drd=value.drd", // objektove policko, musim se na hodnotu odkazovat pres value.name
                                        flag: Gordic.Prefabs.Field.Flags.required,
                                        validators: [new Gordic.Validators.Required()],
                                        disabled: that.doklad.FieldPermissions?.DruhDokladu.value === false,
                                        dropdown: true, // je umoznen jen vyber z comba
                                        serverFilters: {
                                            ixs_typ: () => { return that.findFields(Gordic.Eko.HeaderForm.Fields.TypDokladu).gfield("getValueAsync").then((value) => { return value ? value.ixs_typ : ""; }); },
                                            ktg_typ: () => { return that.findFields(Gordic.Eko.HeaderForm.Fields.TypDokladu).gfield("getValueAsync").then((value) => { return value ? value.ktg_typ : -1; }); },
                                            mesic: () => { return that.getMesic(); },
                                            agenda: "ROZ",
                                        },
                                        change: (ev, changeObj) => {
                                            // Vymazani subrady
                                            that.findFields("formCisloDokladuField" /* Fields.CisloDokladu */).gfield("clear");
                                            // znepristupnim/zpristupneni subradu
                                            that.findFields("formCisloDokladuField" /* Fields.CisloDokladu */).gfield("option", { disabled: changeObj == null || changeObj.value == null });
                                        }
                                    })
                                        // Subrada / cislo dokladu
                                        .addRow({ label: "jres:30150070" }) //RC 30150070 : Subřada / Číslo dokladu
                                        .addField("gselectbox", Gordic.Eko.Prefabs.gsubsequence(), {
                                        name: "formCisloDokladuField" /* Fields.CisloDokladu */,
                                        disabled: that.doklad.FieldPermissions?.CisloDokladu.value === false,
                                        dropdown: false, // zobraz ... pro vyber namisto comba
                                        model: function (operation, dto, modelOptions) {
                                            switch (operation) {
                                                case "apply": // naplneni multivalue policka z DTO
                                                    // Pokud neni cislo dokladu v DTO naplneno, nic nedelej
                                                    if (dto.ac_ixe === null)
                                                        return;
                                                    // Otrimuj si cislo dokladu z DTO
                                                    dto.ac_ixe = /*$.trim*/ dto.ac_ixe.trim();
                                                    // Zjisti si zda byla zadana subrada nebo cislo dokladu
                                                    let isCisloSubrada = dto.ac_ixe.startsWith("*");
                                                    // Precti si bud cislo dokladu nebo subradu
                                                    let number = parseInt(isCisloSubrada ? dto.ac_ixe.substr(1) : dto.ac_ixe);
                                                    // Precti si co je na policku vyplneno
                                                    var value = $(this).gfield("getValue");
                                                    // Vyplnim pole hodnotou - vsechny hodnoty to spoji do jednoho objektu - tj. vznikne velke multipolicko
                                                    //$(this).gfield(modelOptions?.initialValues ? "setInitial" : "setValue", $.extend(value || {}, {
                                                    //    isReceipt: !isCisloSubrada,
                                                    //    ac_cislo_do: null,
                                                    //    ac_cislo_od: null,
                                                    //    aktivita: 100,
                                                    //    ico: null,
                                                    //    nazev: "",
                                                    //    rok: null,
                                                    //    subrada: number,
                                                    //    zkratka: null,
                                                    //    _validatationState: "verified",
                                                    //    _validatationMsg: ""
                                                    //}), $.extend({ valid: true }, modelOptions?.setFlags));
                                                    $(this).gfield("setValue", $.extend(value, {
                                                        isReceipt: !isCisloSubrada,
                                                        ac_cislo_do: null,
                                                        ac_cislo_od: null,
                                                        aktivita: 100,
                                                        ico: null,
                                                        nazev: "",
                                                        rok: null,
                                                        subrada: number,
                                                        zkratka: null,
                                                        _validatationState: "verified",
                                                        _validatationMsg: ""
                                                    }));
                                                    break;
                                                case "collect": // naplneni DTO hodnotou z multivalue policka (vraci vzdy pole)
                                                    // Precti si hodnotu na policku
                                                    var value = $(this).gfield("getValue");
                                                    // Pokud je tato vyplnena
                                                    if (value !== null) {
                                                        // Pokud je pole subrada, pridej mu *. Jinak jej nech prazdne (vyplneno cislo dokladu)
                                                        if (!value.isReceipt) {
                                                            dto.ac_ixe = "*" + value.subrada;
                                                        }
                                                        else
                                                            dto.ac_ixe = value.subrada;
                                                    }
                                                    break;
                                            }
                                        },
                                        flag: Gordic.Prefabs.Field.Flags.required,
                                        validators: [new Gordic.Validators.Required()],
                                        verify: function (value) {
                                            // TODO: overeni zadaneho cisla dokladu. Prozkoumat co to dela
                                            //if (typeof value !== "object") {
                                            //    return { subrada: value, _validatationState: "nonverified" };
                                            //}
                                            //if (value && value.isReceipt) {
                                            //    value._validatationMsg = "";
                                            //    value._validatationState = "verified";
                                            //    //return value;
                                            //}
                                            //return KontrolaCislaDokladu(that, value);
                                        },
                                        //model: "value.rok=model.rok;value.ico=model.ico;model.ac_ixe=value.subrada"
                                        serverFilters: {
                                            agenda: 50, // ROZ
                                            drd: () => { return that.findFields("formDrdField" /* Fields.Drd */).gfield("getValueAsync").then(function (value) { return value ? value.drd : -1; }); },
                                            ico: that.doklad.header?.ico,
                                            rok: that.doklad.header?.rok,
                                            ucs: that.doklad.header?.ucs,
                                            mesic: () => { return that.getMesic(); },
                                        },
                                    })
                                        .addRow({ label: "jres:30150036" }) //RC 30150036 : Částka dokladu
                                        .addField("gnumberbox", // fieldType
                                    Gordic.Prefabs.Number.currency(), // fieldOptions
                                    {
                                        name: "formCastkaField" /* Fields.Castka */,
                                        model: "c",
                                        disabled: that.doklad.FieldPermissions?.Castka.value === false,
                                        returnType: "decimal",
                                    });
                                    // Sekce doplnujicich udaju -
                                    formDetail
                                        .addSection("jres:30150057"); //RC 30150057 : Doplňující informace
                                    if (that.doklad.FieldPermissions?.Ahlavicka.visible) {
                                        //if (that.globals.DatabaseParams!.SpravaAHlavicek === true) {
                                        formDetail
                                            .addRow({ label: "jres:30150146" }) //RC 30150146 : Číslo A-hlavičky
                                            .addField("gselectbox", Gordic.Prefabs.Select.rozsahl(), // metoda vraci atributy data, itemTemplate a helperColumns
                                        {
                                            name: "formAHeaderField" /* Fields.AHlavicka */,
                                            model: "ixs_ahl=value.ixs_ahl", // objektove policko, musim se na hodnotu odkazovat pres value.name
                                            dropdown: false,
                                            disabled: that.doklad.FieldPermissions?.Ahlavicka.value === false,
                                            serverFilters: {
                                                rok: that.doklad.header?.rok,
                                                ico: that.doklad.header?.ico,
                                                aktivita: 100,
                                                a_stav: "< 20 ",
                                            },
                                        });
                                    }
                                    ;
                                    if (that.doklad.FieldPermissions?.CisloSablonyEds.visible) {
                                        formDetail
                                            .addRow({ label: "jres:30150147" }) //RC 30150147 : Číslo šablony EDS/SMVS
                                            .addField("gselectbox", Gordic.Prefabs.Select.rozsahl(), // metoda vraci atributy data, itemTemplate a helperColumns
                                        {
                                            name: "formCisloEdsField" /* Fields.CisloEdsSmvs */,
                                            model: "cis_sabl_eds=value.cis_sabl_eds", // objektove policko, musim se na hodnotu odkazovat pres value.name
                                            dropdown: false,
                                            disabled: that.doklad.FieldPermissions?.CisloSablonyEds.value === false,
                                            serverFilters: {
                                                rok: that.doklad.header?.rok,
                                                ico: that.doklad.header?.ico,
                                                aktivita: 100,
                                                a_stav: "<20",
                                            },
                                        });
                                    }
                                    ;
                                    // Aplikace komunikuje se statni pokladnou a je povolena funkcnost validace
                                    if (that.doklad.FieldPermissions?.ManagerCile.visible) {
                                        formDetail
                                            .addRow({ label: "jres:30250479" }) //RC 30250479 : Výkonný rozp.kompetent
                                            .addField("gselectbox", {
                                            name: "formManagerCileField" /* Fields.ManagerCile */,
                                            disabled: that.doklad.FieldPermissions?.ManagerCile.value === false,
                                            itemTemplate: "{manager_cile_txt:trim:encode}",
                                            flag: Gordic.Prefabs.Field.Flags.required,
                                            model: "model.ixs_evp=value.ixs_evp,model.ixs_evp_eo=value.ixs_evp_eo,model.manager_cile_txt=value.manager_cile_txt,model.ixs_fun_mng=value.ixs_fun_mng",
                                            dropdown: false,
                                            validators: [
                                                new Gordic.Validators.Required()
                                            ],
                                            selector: function (options) {
                                                const field = $(this);
                                                const value = field.gfield("getValue");
                                                debugger;
                                                let input = {
                                                    ixs_evp: value?.ixs_evp, //value.ixs_evp,
                                                    ixs_evp_eo: value?.ixs_evp_eo
                                                };
                                                return $.content(field).dialogs.showModalWindow("Gordic.Roz.WebClient.GRozManagerCile", { OptionInput: input }, { width: 1000, height: 500 })
                                                    .createDialogPromise((result) => {
                                                    return !!result;
                                                })
                                                    .then((result) => {
                                                    debugger;
                                                    // TODO: Nevim, zda to zde musi byt??
                                                    //field.gfield("setValue", result);
                                                    return result;
                                                });
                                                //return def.promise();
                                            }
                                        });
                                    }
                                    ;
                                    // Aplikace komunikuje se statni pokladnou a je povolena funkcnost validace
                                    if (that.globals.EkoParams.PrizIissp != 0 && that.globals.DatabaseParams.PovolenaFunkcnostValidace === true) {
                                        formDetail
                                            .addRow({ label: "jres:30150148" }) //RC 30150148 : Číslo jednací - kapitola
                                            .addField("gstringbox", "w-12", {
                                            name: "formLongPopisField" /* Fields.Popis */,
                                            model: "header.popis=popis",
                                            rows: 3,
                                            autoSize: false,
                                            disabled: that.doklad.FieldPermissions?.Popis.value === false,
                                        });
                                    }
                                    ;
                                    // 22.07.22 KK - uctarna presunuta do hlavicky dokladu vedle realizatora
                                    //.addRow({ label: "jres:30150056" }) //RC 30150056 : Účtárna
                                    //.addField
                                    //(
                                    //    "gselectbox",
                                    //    Gordic.Prefabs.Select.ekosuus(),
                                    //    {
                                    //        name: Fields.Uctarna,
                                    //        dropdown: false,
                                    //        model: "model.uus=value.uus,model.ico=>value.ico,model.ucs=>value.ucs",
                                    //        flag: Gordic.Prefabs.Field.Flags.required,
                                    //        validators: [new Gordic.Validators.Required()],
                                    //        itemTemplate: "{uus:trim:encode}",
                                    //        disabled: that.doklad.FieldPermissions?.Uctarna.value === false,
                                    //        serverFilters:
                                    //        {
                                    //            ico: that.doklad.header?.ico,
                                    //            ucs: that.doklad.header?.ucs,
                                    //            rok_od: "<= " + that.doklad.header?.rok,
                                    //            rok_do: ">= " + that.doklad.header?.rok,
                                    //            aktivita: 100,
                                    //            ekovfus_ixs_fun: that.globals.VazbaUctarnyNaFunkci ? that.globals.IxsFun : undefined,
                                    //        }
                                    //    }
                                    //)
                                    // Sekce s velkym popisem dokladu
                                    formDetail
                                        .addSection({ label: "jres:30150126", layoutDescriptor: "L2M2S1, L-0-12-0, M-0-12-0, S-0-12-0" }) //RC 30150126 : Popis
                                        //.addRow({ label: "jres:30150037" }) //RC 30150037 : Popis
                                        .addRow()
                                        .addField("gstringbox", "w-12", {
                                        name: "formLongPopisField" /* Fields.Popis */,
                                        model: "popis",
                                        rows: 3,
                                        autoSize: false,
                                        disabled: that.doklad.FieldPermissions?.Popis.value === false,
                                    });
                                    // Vytvoreni formulare z jeho definice
                                    tab.gform("createFrom", formDetail);
                                    // Pridej formular do tabu
                                    formDetail.appendTo(tab);
                                },
                            },
                            // Tab "Rozpoctove zapisy" - Porizovacka (financni profil)
                            {
                                tabParams: {
                                    id: "tabRozpoctoveZapisy",
                                    title: "jres:30150084", //RC 30150084 : Položky
                                    opened: true,
                                    locked: true,
                                    // 16.08.22 KK - dle uzivatelskeho nastaveni je mozno porizovac zobrazit v samostatne 
                                    //      zalozce a nebo primo v Zakladnich udajich
                                    //group: { id: "subZapisy" },
                                    group: that.umisteniZapisu == Gordic.Roz.AppSettings.EGPolozkyView.Tab
                                        ? Gordic.Prefabs.TabGroups.Agenda()
                                        : { id: "subZapisy" },
                                    // Menu zobrazene na vrchu tabu
                                    menuBar: this.createMenuPorizovac(),
                                },
                                init: function (tab) {
                                    // Vytvarim si zde grid porizovace a ulozim si na nej odkaz do modularni promenne, abych ho nemusel potom nacitat
                                    that.$porizovac = $.newDiv("js-RozPorizovacGrid") //$("<div class='js-RozPorizovacGrid'>") // Vytvoreni divu pro porizovacku, oznaceni tridou js-
                                        .css("height", "100%") // vysku nastavim na 100% ?
                                        .appendTo(tab) // vlastni porizovac (grid) vlozim do divu
                                        // definice (konstruktor) gridu (do divu vlozenim widget gridu)
                                        .ggrid({
                                        columnMode: "full", // tezkoklientovy rezim - šířky sloupců jsou zadány fixně v pixelech. Pokud je celková šířka sloupců menší než prostor zobrazení, bude na konci prázdné místo. Pokud je šířka sloupců větší než šířka zobrazení, objeví se scrollbar (https://xwiki.gordic.cz/NET/widgets/ggrid/#HcolumnMode)
                                        multi: true, // umozni vyber vice nez jednoho radku (https://xwiki.gordic.cz/NET/widgets/ggrid/#Hmulti)
                                        marking: true, // Příznak, zda je povolen režim speciálního výběru. Speciální výběr je jeden konkrétní řádek, který může uživatel označit pro další práci. Zmeny lze sledovat v udalosti mark (https://xwiki.gordic.cz/NET/widgets/ggrid/#Hmarking)
                                        // Událost nastává při změně výběru řádků v gridu. (https://xwiki.gordic.cz/NET/widgets/ggrid/#Hselection)
                                        selection: function (ev, info) {
                                            //nastavStavy(that, 0, 0);
                                            //RefreshKPI(that);
                                            console.log("selection", info);
                                        },
                                        cellActivate: function (ev, info) {
                                            console.log("cellActivate", info);
                                        },
                                        contextMenu: function (cellContext) {
                                            return that.actions.createBar(that.getMenuActions());
                                        },
                                        // Název vlastnosti, nebo delegát, který říká, které řádky jsou neaktivní (disabled). Neaktivní řádky mají jinou grafickou reprezentaci. (https://xwiki.gordic.cz/NET/widgets/ggrid/#HrowsEnabled)
                                        // 11.8.20 KK - vsechny radky jsou zatim pristupne, pripadne resit pozdeji
                                        //rowsEnabled: function (meta) {
                                        //    // co tohle vyjadruje ? je tam stav dokladu i zapisu najednou ????
                                        //    return meta && meta.data && (meta.data.up_stav === 0 && meta.data.aktivita === 100 && that.doklad.s_zau !== 50) ? true : false;
                                        //},
                                        //searchColumns: ["popis"], // Nastavení sloupců klientského filtrování pomocí výchozího vyhledávače. Uvádí se sloupce v jejichž hodnotách bude vyhledávat výchozí vyhledávač gridu. Typicky sem patří uvést všechny textové sloupce.  (https://xwiki.gordic.cz/NET/widgets/ggrid/#HsearchColumns)
                                        // Definice sloupců zobrazených v gridu (včetně formátů, předpisů a pravidel chování). (https://xwiki.gordic.cz/NET/widgets/ggrid/#Hcolumns)
                                        columns: that.createGridFormatPorizovac(that.typPorizovace),
                                        // Vlozeni dat do view a nasledne zobrazeni v gridu
                                        data: new Gordic.Data.View(that.doklad.rows, { key: "ixp,radek_z" }),
                                        profileBeforeChange: function (ev, obj) {
                                            // pokud se edituje, nejsou povoleny změny v gridu
                                            if (that.getGrid()?.find(".row.editing").length)
                                                return false;
                                            return true;
                                        },
                                        profileChange: function (ev, obj) {
                                            // informace (varování), pokud změna v profilu může způsobit nemožnost editace. v takovém případě není povolena editace
                                            that.changeProfile = false;
                                            let grid = that.getGrid();
                                            if (grid) {
                                                that.changeProfile = !Gordic.Eko.Grid.isStateForEditing(grid, obj, true, undefined, undefined, that.createGridFormatPorizovac(that.typPorizovace), undefined);
                                                that.SetEnableActions(that.doklad.ActionPermissions);
                                            }
                                        },
                                    })
                                        /**
                                         * Nastaveni porizovacky
                                         * */
                                        // Řádkový editor. Do editace přechází na požádání celý řádek. Zajišťuje validitu dat před uložením. Podporuje serverové ukládání dat. Může být rozeditován pouze jeden řádek.
                                        .ggridroweditor({
                                        // Povoli kopirovat z oznaceneho radku - * 
                                        allowCopy: true,
                                        // Tohle bych rekl, ze jsou tlacitka na konci v ramci porizovaciho radku
                                        rowBar: Gordic.Widget.GMagicPreFiller.buttons,
                                        /**
                                         * Udalost spustena pred spustenim editace radku. Muzu se zde neco predvyplnit, popripade porizovani primo zastavit
                                         * Je to spusteno jak pri porizovani noveho tak pri oprave stareho zapisu
                                         * */
                                        beforeStart: (ev, info) => {
                                            // Pokuid bezi predkontace, povolit
                                            if (that.preFillInProgress) {
                                                return true;
                                            }
                                            // Pokud byl změněn profil, zakázat
                                            if (that.changeProfile) {
                                                ev.preventDefault();
                                                return false;
                                            }
                                            // Pokud je zapis v jinem nez neevidovanem stavu, zapis je stornovany nebo doklad je uzavreny, tak to ukonci
                                            if (info.cellInfo.data && (info.cellInfo.data.up_stav !== 0 || info.cellInfo.data.aktivita !== 100 || that.doklad.header.s_zau === 50)) {
                                                ev.preventDefault();
                                                return false;
                                            }
                                            // Pokud se jedna o opravu zapisu, dohledej si rozvrh a dotahni si menu. Pripadne zobraz chybu
                                            if (info.cellInfo.data.newRow !== true) {
                                                // Dohledani rozvrhu                                                       
                                                info.cellInfo.data["ixsRoz"] = that.getIdRozvrhu(info.cellInfo.data.rok, info.cellInfo.data.nks, info.cellInfo.data.ucs);
                                                // Pokud nebyl rozvrh dohledan, tak zobraz chybu a ukonci zpracovani
                                                if (info.cellInfo.data["ixsRoz"] == null)
                                                    throw info.cellInfo.data.drd === 9 ?
                                                        new GError("jres:30250512") //RC 30250512 : Nenalezen rozvrh pro VLZŘ.
                                                        : new GError("jres:30250513"); //RC 30250513 : Nenalezen rozvrh.
                                            }
                                            // Predpln si polozky porizovace
                                            info.cellInfo.data["rok_ev"] = info.cellInfo.data["rok"];
                                            info.cellInfo.data["rok"] = that.doklad.header?.rok;
                                            return true;
                                        },
                                        /**
                                         * Udalost spustena pri zacatku editace
                                         * */
                                        start: (ev, info) => {
                                            // NAstavim si priznak, ze probiha editace radku
                                            that.editRows = true;
                                            // Upraveni policek. NEvim presne, co to ma delat, psal Tomas
                                            that.$porizovac.findFields("smlouva", "pozadavek").gfield("option", "disabled", info.cellInfo.data.rok_ev === that.globals.EkoParams?.Rok);
                                            // Pokud existuje vazba a je nastaven parametr automatickyNebalancovatelneUPrimarnichDokladu, pak je priznak balancovani nepristupne
                                            let disable = (that.globals.DatabaseParams?.ZadaniPriznakuBalancovatelnosti == 2 /* Gordic.Uct.Interface.ZadaniPriznakuBalancovatelnostiEnum.automatickyNebalancovatelneUPrimarnichDokladu */ && that.doklad.VazbaExistuje) || info.cellInfo.data.rok_ev === that.globals.EkoParams?.Rok;
                                            that.$porizovac.findFields("priz_bal_inv").gfield("option", "disabled", disable);
                                            // Zpristupni pouze Ulozit/Zrusit)
                                            that.updateMenuPorizovac(true); // editRow:true
                                        },
                                        /**
                                         * Udalost spustena pred ulozenim radku
                                         * */
                                        beforeCommit: (ev, info) => {
                                            info.cellInfo.data.rok = info.cellInfo.data.rok_ev; // proc to tu tomas ma ? TODO: zjisti si k cemu tu ma rok_ev ...
                                        },
                                        /**
                                         * Udalost ulozeni radku
                                         * */
                                        commit: (ev, info) => {
                                            // Opet nechapu, k cemu si to Tomas uklada
                                            if (typeof info.cellInfo.data.rok_ev !== "undefined")
                                                info.cellInfo.data.rok = info.cellInfo.data.rok_ev;
                                            // Pokud bez predkontace, ukonci to
                                            if (that.preFillInProgress === true)
                                                return;
                                            // A aplikuj vysledne upravene hodnoty
                                            that.updateMenuPorizovac(false); // editRow:false
                                            that.updateEnableMenuDoklad(); // Mohly se zmenit polozky
                                            that.updateStatusBar(); // Zmena textu stavu dokladu
                                            // Pokud jsem ukladal novy radek, tak mu vytvorim programove dalsi novy radek, protoze vklada.
                                            // Lze to potom omezit parametricky ci jinak
                                            // Pokud jsem ukladal opravu, normalne skoncim
                                            if (info.cellInfo.data.newRow) {
                                                const request = {
                                                    ixp: that.doklad.ixp,
                                                    dat_zmena: that.doklad.header?.dat_zmena,
                                                    action: 29 /* Gordic.Uct.Interface.GEAkceFormulare.PorizovacNovy */
                                                };
                                                that.executeAction(request)
                                                    .then((response) => {
                                                    // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                                    that.previousDoklad = $.extend(true, {}, that.doklad);
                                                    // Vracena data sloucim do noveho objektu dokladu. Provedu hlubokou kopii
                                                    $.extend(true, that.doklad, response.Data);
                                                    // Nyni si musim vytahnout posledni radek, ktery je "rozpracovany"
                                                    const lastRow = that.doklad.rows[that.doklad.rows.length - 1];
                                                    // Vyvolani udalosti start v porizovaci: ggridroweditor.start(ev,info)
                                                    that.$porizovac.ggridroweditor("addRow", { ...lastRow, newRow: true });
                                                });
                                            }
                                            ;
                                        },
                                        /**
                                         * Udalost pred zrusenim porizovani
                                         * */
                                        beforeCancel: (ev, info) => {
                                            info.cellInfo.data.rok = info.cellInfo.data.rok_ev; // proc to tu tomas ma ? TODO: zjisti si k cemu tu ma rok_ev ...
                                        },
                                        /**
                                         * Udalost po stisknuti Zrusit porizovani
                                         * */
                                        cancel: (ev, info) => {
                                            that.preFillInProgress = false; // Priznak zruseni predkontace
                                            // Nastavim si priznak, ze editace radku byla zrusena
                                            that.editRows = false;
                                            that.newRowStart = false; // Priznak porizovani noveho radku 
                                            info.cellInfo.data.rok = info.cellInfo.data.rok_ev; // proc to tu tomas ma ? TODO: zjisti si k cemu tu ma rok_ev ...
                                            // Neni potreba nic nacitat na strane serveru. Pouze vratim puvodni data
                                            // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                            that.doklad = $.extend(true, {}, that.previousDoklad);
                                            // A prepis vsechny hodnoty na puvodni
                                            that.updateMenuPorizovac(false); // editRow:false
                                        },
                                        change: (ev, info) => {
                                            that.log.debug("porizovac.change");
                                            console.log("porizovac.change", info);
                                        },
                                        /**
                                         * Ulozeni zapisu po ukonceni editace
                                         * */
                                        save: (data, obj) => {
                                            // POPIS CHOVANI (vysvetleni od Tomase Skaly)
                                            // Tato metoda je volana po stisknuti OK, resp. po dojiti na konec radku
                                            // V data mam data radku (interne je to formular), ktera uzivatel vyplnil.
                                            // Nyni Tomas ceka, co se stane a hlavne co vratim. Mohu vratit rovnou data
                                            // a nebo promise, ktery slibuje, ze mu data poslu.
                                            // Pokud bych neposlal nic, grid si mysli, ze ma data vsechny a pouzije to, co
                                            // uzivatel zadal.
                                            // Pokud ovsem promise nebo data poslu (tedy to, co mi vratil server),
                                            // potom to Tomas pouzije jako platna data a pokusi se je na prislusne misto doplnit.
                                            // Zaktivni vlozeny/opraveny radek. Pozor, pri trideni nemusi byt na konci gridu !
                                            // Zobrazeni pendingu zarizuje Tomas sam, kdy se toci tlacitko OK
                                            // Nastav si, ze uz neprobiha editace radku, protoze ukladam
                                            that.editRows = false;
                                            const request = {
                                                ixp: that.doklad.ixp,
                                                dat_zmena: that.doklad.header?.dat_zmena,
                                                action: 30 /* Gordic.Uct.Interface.GEAkceFormulare.PorizovacUlozit */,
                                                rows: [data]
                                            };
                                            // Vytvorim si promise na provadeny chain akce. V odpovedi je response.data s malym d
                                            return that.executeAction(request)
                                                .then((response) => {
                                                // Uloz si puvodni kopii objektu - deep copy, ne referenci
                                                that.previousDoklad = $.extend(true, {}, that.doklad);
                                                // Vracena data sloucim do noveho objektu dokladu. Provedu hlubokou kopii
                                                $.extend(true, that.doklad, response.data);
                                                // Definice zapisu s priznakem noveho/puvodniho radku
                                                let savedRow = null;
                                                if (response.data.rows && response.data.rows.length > 0) {
                                                    const allRows = response.data.rows;
                                                    const isNew = !data.radek_z || data.radek_z === 0;
                                                    if (isNew) // Pokud je to nový řádek, je to poslední v poli
                                                        savedRow = { ...allRows[allRows.length - 1], newRow: true };
                                                    else { // Pokud je to oprava existujícího řádku (má radek_z)
                                                        const found = allRows.find(row => row.radek_z === data.radek_z);
                                                        savedRow = found ? { ...found, newRow: false } : null;
                                                    }
                                                }
                                                // Vrat vysledny radek porizovaci. Odsud jdeme do udalosti commit, kde obsah obnovim
                                                return savedRow;
                                            });
                                        },
                                    })
                                        .gautofit({ resizersOnTab: false })
                                        .gmagicprefiller({
                                        defaultData: {
                                            rok: that.doklad.header?.rok,
                                            nks: that.globals.EkoParams?.Nks,
                                            ucs: that.doklad.header?.ucs,
                                            ico: that.doklad.header?.ico,
                                            //ixp: that.UcetniDokladDto.HlavickaDokladu?.ixp,
                                            ixp_den: that.doklad.header?.ixp_den,
                                            up_stav: 0,
                                            aktivita: 100,
                                            drd: that.doklad.header?.drd,
                                            typ_ag: 50
                                        },
                                        autoCommitRow: true,
                                        // TODO: nutno opravit!!
                                        headerValue: parseDecimal(that.doklad.header?.c),
                                        //headerMDValue: parseDecimal(that.UcetniDokladDto.HlavickaDokladu?.c!),
                                        ownNKS: that.globals.EkoParams?.NksVl,
                                        setNKS: that.globals.EkoParams?.Nks
                                    });
                                    ;
                                },
                            },
                            // tab Struktura v IISSP
                            this.isShowTabStrukturaIISSP ?
                                {
                                    tabParams: {
                                        id: "tabStrukturaVIISSP",
                                        title: "jres:30250420", //RC 30250420 : Struktura v IISSP
                                        opened: true,
                                        locked: true,
                                        open: () => {
                                            // nacteni dat po otevreni zalozky
                                            that.loadIKRows();
                                        },
                                        menuBar: [
                                            { id: "menuPIISSPZaHlavicku", action: "actIIISSZaHlavicku" /* Actions.IISSPStrukturaZaHlavicku */, favorite: true },
                                        ],
                                        // 16.08.22 KK - dle uzivatelskeho nastaveni je mozno porizovac zobrazit v samostatne 
                                        //      zalozce a nebo primo v Zakladnich udajich
                                        group: that.globalSettings?.get(Gordic.Roz.AppSettings.appPath + ".RozSettingsForm.PolozkyView") == Gordic.Roz.AppSettings.EGPolozkyView.Tab
                                            ? Gordic.Prefabs.TabGroups.Agenda()
                                            : { id: "subStruktura" },
                                    },
                                    init: function (tab) {
                                        const gridFormat = that.createGridFormatIISSP(that.typPorizovace);
                                        // subtasky na pohyb a doklad
                                        $.newDiv().appendTo(tab)
                                            .gsubtasks({
                                            params: [
                                                { caption: that.actions["actIIISSPKumulovatBezNul" /* Actions.IISSPStrukturaKumulovatBezNul */]?.caption, action: that.actions["actIIISSPKumulovatBezNul" /* Actions.IISSPStrukturaKumulovatBezNul */] },
                                                { caption: that.actions["actIIISSPKumulovatDelIISSP" /* Actions.IISSPStrukturaKumulovatDleIISSP */]?.caption, action: that.actions["actIIISSPKumulovatDelIISSP" /* Actions.IISSPStrukturaKumulovatDleIISSP */] },
                                                { caption: that.actions["actIIISSPBezKumulace" /* Actions.IISSPStrukturaBezKumulace */]?.caption, action: that.actions["actIIISSPBezKumulace" /* Actions.IISSPStrukturaBezKumulace */] },
                                            ],
                                            activeItem: 0
                                        });
                                        let treeProcessor = new Gordic.Data.Tree(Gordic.Data.Tree.parentIdOrganizer("parentId"), {
                                            filterKeepStructure: true,
                                            //defaultState: "unknown",// (m) => { return m.data.nodeState as DataStructureState || "unknown"; },
                                            defaultState: (m) => {
                                                // posledni uroven nebo bez rozpadu je otevrena
                                                if (m.data.level == 1 || typeof m.data?.cnt === "undefined" || m.data?.cnt === null || m.data?.cnt < 2)
                                                    return "open";
                                                // nutne odcteni
                                                return "unknown";
                                            },
                                            //dynamicRequest: (data) => {
                                            //    if (data.level === 0) {
                                            //    }
                                            //    return data;
                                            //}
                                        });
                                        let provider = new Gordic.Data.Provider((req, re) => {
                                            debugger;
                                            return that.loadIKRows(req);
                                        });
                                        let view = new Gordic.Data.View([], { key: "id", processors: { tree: treeProcessor, provider: provider } });
                                        $.newDiv("js-RozStrukturaIKGrid")
                                            .css("height", "100%") // vysku nastavim na 100% ?
                                            .appendTo(tab) // vlastni porizovac (grid) vlozim do divu
                                            // definice (konstruktor) gridu (do divu vlozenim widget gridu)
                                            .ggrid({
                                            columnMode: "full", // tezkoklientovy rezim - šířky sloupců jsou zadány fixně v pixelech. Pokud je celková šířka sloupců menší než prostor zobrazení, bude na konci prázdné místo. Pokud je šířka sloupců větší než šířka zobrazení, objeví se scrollbar (https://xwiki.gordic.cz/NET/widgets/ggrid/#HcolumnMode)
                                            // Definice sloupců zobrazených v gridu (včetně formátů, předpisů a pravidel chování). (https://xwiki.gordic.cz/NET/widgets/ggrid/#Hcolumns)
                                            columns: gridFormat,
                                            // Vlozeni dat do view a nasledne zobrazeni v gridu
                                            data: view,
                                        }).gautofit({ resizersOnTab: false });
                                    },
                                }
                                : undefined,
                            // Tab ukazatele
                            this.isShowTabUkazatele ?
                                {
                                    tabParams: {
                                        id: "tabSUkazatele",
                                        title: "jres:30250445", //RC 30250445 : Ukazatelé
                                        opened: true,
                                        locked: true,
                                        //open: () => {
                                        //    // nacteni dat po otevreni zalozky
                                        //    that.loadUkazateleRows();
                                        //},
                                        // 16.08.22 KK - dle uzivatelskeho nastaveni je mozno porizovac zobrazit v samostatne 
                                        //      zalozce a nebo primo v Zakladnich udajich
                                        group: that.globalSettings?.get(Gordic.Roz.AppSettings.appPath + ".RozSettingsForm.PolozkyView") == Gordic.Roz.AppSettings.EGPolozkyView.Tab
                                            ? Gordic.Prefabs.TabGroups.Agenda()
                                            : { id: "subUkazatele" },
                                    },
                                    init: function (tab) {
                                        const gridFormat = that.createGridFormaUkazatele();
                                        let provider = new Gordic.Data.Provider((req) => {
                                            return that.loadUkazateleRows();
                                        });
                                        let view = new Gordic.Data.View(that.doklad.ukazatele?.Seznam, { processors: { provider: provider } });
                                        var form = new Gordic.Forms.Form({
                                            name: "formDetail", layoutDescriptor: "L3M2S1, L-3-9-0, M-4-8-0, S-12-12-0"
                                        })
                                            .addField("gstatic", {
                                            caption: "jres:30250452".format(that.doklad.ukazatele?.ResultOperation) //RC 30250452 : Výsledek operace: {0}
                                        });
                                        var tabHead = $.newDiv()
                                            .appendTo(tab);
                                        form.appendTo(tabHead);
                                        $.newDiv("js-RozUkazateleGrid")
                                            .css("height", "100%") // vysku nastavim na 100% ?
                                            .appendTo(tab) // vlastni porizovac (grid) vlozim do divu
                                            // definice (konstruktor) gridu (do divu vlozenim widget gridu)
                                            .ggrid({
                                            columnMode: "full", // tezkoklientovy rezim - šířky sloupců jsou zadány fixně v pixelech. Pokud je celková šířka sloupců menší než prostor zobrazení, bude na konci prázdné místo. Pokud je šířka sloupců větší než šířka zobrazení, objeví se scrollbar (https://xwiki.gordic.cz/NET/widgets/ggrid/#HcolumnMode)
                                            // Definice sloupců zobrazených v gridu (včetně formátů, předpisů a pravidel chování). (https://xwiki.gordic.cz/NET/widgets/ggrid/#Hcolumns)
                                            columns: gridFormat,
                                            // Vlozeni dat do view a nasledne zobrazeni v gridu
                                            data: view,
                                        }).gautofit({ resizersOnTab: false });
                                    },
                                }
                                : void 0,
                        ].filter(Boolean)
                    }, true); // komponenta bude přidána před všechny ostatní.
                }
                /**
                 * Nacteni ukazatelu
                 *
                 */
                loadUkazateleRows() {
                    const that = this;
                    let result;
                    that.beginOperation("jres:30250443"); //RC 30250443 : Načítám...
                    return that.isl.RozUkazatel.getVysledkyUkazatelu({
                        header: that.doklad.header,
                        ukazatele: null
                    }).get()
                        .then((data) => {
                        const grid = that.getGridUkazatele();
                        if (grid == null)
                            throw new GError;
                        let view = grid.ggrid("getView");
                        view.updateData(data.Seznam);
                        return data;
                    }).catch((err) => {
                        //TODO: Chyba se uzivateli nezobrazi???!!! Resit asi s Bohousem
                        throw new GError(err);
                    })
                        .always(() => { that.endOperation(); });
                }
                /**
                 * Nacteni zapisu struktury IK
                 *
                 */
                loadIKRows(row) {
                    const that = this;
                    let result;
                    let loadSublevel = typeof row !== "undefined";
                    that.beginOperation("jres:30250443"); //RC 30250443 : Načítám...
                    if (!that.actions["actIIISSPBezKumulace" /* Actions.IISSPStrukturaBezKumulace */]?.checked() && !loadSublevel) {
                        if (that.actions["actIIISSZaHlavicku" /* Actions.IISSPStrukturaZaHlavicku */]?.checked()) {
                            result = that.isl.RozIissp.getRowsIisspKumulovaneHlavicka({
                                pidDokladu: (that.doklad.header?.ixs_ahl),
                                nuloveRadky: !that.actions["actIIISSPKumulovatBezNul" /* Actions.IISSPStrukturaKumulovatBezNul */]?.checked()
                            })
                                .get();
                        }
                        else
                            result = that.isl.RozIissp.getRowsIisspKumulovaneDoklad({
                                pidDokladu: (that.doklad.header?.ixp),
                                nuloveRadky: !that.actions["actIIISSPKumulovatBezNul" /* Actions.IISSPStrukturaKumulovatBezNul */]?.checked()
                            })
                                .get();
                    }
                    else {
                        if (that.actions["actIIISSZaHlavicku" /* Actions.IISSPStrukturaZaHlavicku */]?.checked()) {
                            result = that.isl.RozIissp.getRowsIisspNekumulovaneHlavicka({
                                pidDokladu: (that.doklad.header?.ixs_ahl),
                                ik: loadSublevel ? that.getIK(row) : null
                            })
                                .get();
                        }
                        else
                            result = that.isl.RozIissp.getRowsIisspNekumulovaneDoklad({
                                pidDokladu: (that.doklad.header?.ixp),
                                ik: loadSublevel ? that.getIK(row) : null
                            })
                                .get();
                    }
                    return result.then((data) => {
                        const grid = that.getGridIK();
                        if (grid == null)
                            throw new GError;
                        let data1 = [];
                        if (loadSublevel) {
                            for (var i = 0; i < data.length; i++) {
                                const parentId = that.createIdIK(data[i]);
                                const id = i + "_" + parentId;
                                let value = { id: id, parentId: parentId, level: 1 };
                                data1.push($.extend(data[i], value, true));
                            }
                        }
                        else {
                            grid.ggrid("option", "columns", that.createGridFormatIISSP(that.typPorizovace));
                            let view = grid.ggrid("getView");
                            const suma = !(that.actions["actIIISSPBezKumulace" /* Actions.IISSPStrukturaBezKumulace */]?.checked());
                            for (var i = 0; i < data.length; i++) {
                                const id = suma ? that.createIdIK(data[i]) : "_" + data[i].radek_z;
                                let value = { id: id, mainId: id, level: 0 };
                                data1.push($.extend(data[i], value, true));
                            }
                            view.updateData(data1);
                        }
                        return data1;
                        return data;
                    }).catch((err) => {
                        //TODO: Chyba se uzivateli nezobrazi???!!! Resit asi s Bohousem
                        throw new GError(err);
                    })
                        .always(() => { that.endOperation(); });
                }
                /**
                 * Vytvoreni unikatniho ID z radku
                 *
                 * @param currentRow
                 * @returns
                 */
                createIdIK(currentRow) {
                    return this.parseValue(currentRow.isp_kap) +
                        this.parseValue(currentRow.isp_fim) +
                        this.parseValue(currentRow.isp_rpo) +
                        this.parseValue(currentRow.isp_par) +
                        this.parseValue(currentRow.isp_zdr) +
                        this.parseValue(currentRow.isp_eds) +
                        this.parseValue(currentRow.isp_ucl) +
                        this.parseValue(currentRow.isp_pvs) +
                        this.parseValue(currentRow.isp_nd) +
                        this.parseValue(currentRow.isp_rd);
                }
                /**
                 * Prevod hodnoty na string
                 * @param input
                 * @returns
                 */
                parseValue(input) {
                    return typeof input === "undefined" || input === null ? "" : input;
                }
                /**
                 * Nqcteni IK aktualniho radku do tridy
                 *
                 */
                getIK(radek) {
                    if (radek == null)
                        return {};
                    return {
                        isp_kap: radek.isp_kap,
                        isp_fim: radek.isp_fim,
                        isp_rpo: radek.isp_rpo,
                        isp_par: radek.isp_par,
                        isp_zdr: radek.isp_zdr,
                        isp_eds: radek.isp_eds,
                        isp_ucl: radek.isp_ucl,
                        isp_pvs: radek.isp_pvs,
                        isp_nd: radek.isp_nd,
                        isp_rd: radek.isp_rd,
                    };
                }
                /**
                 * Je mozno editovat radek
                 * @returns
                 */
                isCanEditRow() {
                    if (this.isEditMode()
                        || ((this.newRowStart && !this.doklad.ActionPermissions?.OpravitPorizovac?.value)
                            || (!this.newRowStart && !this.doklad.ActionPermissions?.NovyPorizovac.value)))
                        return false;
                    return true;
                }
                /**
                 * Vytvoreni girdformatu pro ukazatele
                 *
                 * @param that
                 * @returns
                 */
                createGridFormaUkazatele() {
                    return new Gordic.Data.GridFormat()
                        .addTextColumn({
                        name: "nazev_ukazatele", caption: "jres:30250446" //RC 30250446 : Název ukazatele
                        ,
                        width: 250
                    })
                        .addTextColumn({
                        name: "vysl_oper_uka", caption: "jres:30250447" //RC 30250447 : Výsledek
                        ,
                        width: 75
                    })
                        .addTextColumn({
                        name: "typ_ukazatele",
                        caption: "jres:30250448", //RC 30250448 : Typ ukazatele
                        width: 110,
                    })
                        .addTextColumn({
                        name: "typ_kontroly",
                        caption: "jres:30250449", //RC 30250449 : Typ kontroly
                        width: 150,
                    })
                        .addTextColumn({
                        name: "nasl_operace",
                        caption: "jres:30250450", //RC 30250450 : Následná operace
                        width: 150,
                    })
                        .addTextColumn({
                        name: "text",
                        caption: "jres:30250451", //RC 30250451 : Text
                        width: 300,
                    });
                }
                /**
                 * Vytvoreni girdformatu pro strukturu v IISSP
                 *
                 * @param that
                 * @returns
                 */
                createGridFormatIISSP(typPorizovace) {
                    let that = this;
                    let grdFormat = new Gordic.Data.GridFormat();
                    if (!that.actions["actIIISSPBezKumulace" /* Actions.IISSPStrukturaBezKumulace */]?.checked())
                        grdFormat.addStructureColumn({
                            name: "idx", caption: "", width: 30, structureLead: true
                        });
                    if (typPorizovace == 1 /* GRozTypPorizovace.VLZR */) {
                        grdFormat
                            .addNumberColumn({
                            name: "rok",
                            caption: "jres:30250360", //RC 30250360 : Rok
                            width: 110,
                            editor: {
                                widget: "gnumberbox",
                                options: {
                                    name: "rok",
                                    model: "model.rok=value",
                                    customClass: "js-DWConfig"
                                }
                            }
                        });
                    }
                    grdFormat
                        .addNumberColumn({
                        name: "radek_z", caption: "jres:30250421" //RC 30250421 : Č. ř.
                        ,
                        description: "jres:30250422" //RC 30250422 : Číslo řádku rozpočtového dokladu
                        ,
                        width: 30
                    })
                        .addTextColumn({
                        name: "isp_kap", caption: "KAP",
                        description: "jres:30250423" //RC 30250423 : Kapitola
                        ,
                        width: 45
                    })
                        .addTextColumn({
                        name: "isp_fim", caption: "FIM",
                        description: "jres:30250424" //RC 30250424 : Finanční místo
                        ,
                        width: 64
                    })
                        .addTextColumn({
                        name: "isp_rpo", caption: "RPO",
                        description: "jres:30250425" //RC 30250425 : Rozpočtová položka
                        ,
                        width: 48
                    })
                        .addTextColumn({
                        name: "isp_par", caption: "PAR",
                        description: "jres:30250426" //RC 30250426 : Paragraf
                        ,
                        width: 55
                    })
                        .addTextColumn({
                        name: "isp_zdr", caption: "ZDR",
                        description: "jres:30250427" //RC 30250427 : Zdroj
                        ,
                        width: 61
                    })
                        .addTextColumn({
                        name: "isp_eds", caption: "EDS",
                        description: "jres:30250428" //RC 30250428 : EDS/SMVS
                        ,
                        width: 100
                    })
                        .addTextColumn({
                        name: "isp_ucl", caption: "UCL",
                        description: "jres:30250429" //RC 30250429 : Účel
                        ,
                        width: 100
                    })
                        .addTextColumn({
                        name: "isp_pvs", caption: "PVS",
                        description: "jres:30250430" //RC 30250430 : PVS
                        ,
                        width: 88
                    })
                        .addTextColumn({
                        name: "isp_zj", caption: "ZJ",
                        description: "jres:30250431" //RC 30250431 : Záznamová jednotka
                        ,
                        width: 30
                    })
                        .addTextColumn({
                        name: "isp_uj", caption: "UJ",
                        description: "jres:30250432" //RC 30250432 : Územní jednotka
                        ,
                        width: 40
                    })
                        .addTextColumn({
                        name: "isp_nd", caption: "ND",
                        description: "jres:30250433" //RC 30250433 :  Druh nároku
                        ,
                        width: 38
                    })
                        .addTextColumn({
                        name: "isp_rd", caption: "RD",
                        description: "jres:30250435" //RC 30250435 : Druh rozpočtu
                        ,
                        width: 38
                    })
                        .addCurrencyColumn({
                        name: "c0",
                        caption: that.globals.DatabaseParams.NazevPoleC0,
                        width: 110,
                        forced: true,
                    })
                        .addCurrencyColumn({
                        name: "c1",
                        caption: that.globals.DatabaseParams.NazevPoleC1,
                        width: 110,
                        forced: true,
                    })
                        .addTextColumn({
                        name: "popis",
                        caption: "jres:30150087", //RC 30150087 : Popis
                        width: 150,
                        customClass: "js-popis",
                    });
                    return grdFormat;
                }
                /**
                 * Vraci drd dle vstupniho roku
                 * @param rok
                 * @returns
                 */
                getDrd(rok) {
                    if (this.doklad.Rozvrhy?.UseVLZR && this.typPorizovace == 1 /* GRozTypPorizovace.VLZR */ && rok > this.globals.EkoParams?.Rok)
                        return 9;
                    return this.doklad.header?.drd;
                }
                /**
                 * setRozvrh - Nastaveni rozvrhu
                 * @param {vstup} Gordic.Eko.WebClient.GDataSentenceParamsDto
                 */
                setRozvrh(fieldElement, vstup, managerClass) {
                    let that = this;
                    // Defragmentace promenne - vytahnu si ze vstupu rok,ucs a nks
                    let { rok, ucs, nks } = vstup;
                    // Dohledam si pid rozvrhu
                    let idRozvrh = that.getIdRozvrhu(rok, nks, ucs);
                    // Pokud vstup neobsahuje DRD, tak si ho nacti
                    if (typeof vstup.drd === "undefined")
                        vstup.drd = that.getDrd(rok);
                    vstup.ixsRoz = idRozvrh;
                    let nastavRozvrh = true;
                    // Kontrola platnosti rozvrhu
                    if (!idRozvrh || idRozvrh.trim() === "") {
                        // Rozhodnutí, zda nastavit rozvrh podle toho, co se používá (UCS vs NKS)
                        if (that.doklad.Rozvrhy?.UseUcs) {
                            nastavRozvrh = Boolean(ucs && ucs.trim() !== "");
                        }
                        else {
                            nastavRozvrh = Boolean(nks && nks.trim() !== "");
                        }
                        // Pokud nemáme rozvrh a není to validní stav, vyhoď chybu
                        if (!nastavRozvrh) {
                            throw new Error("Nelze nastavit rozvrh - chybí požadované hodnoty");
                        }
                        idRozvrh = null;
                    }
                    if (nastavRozvrh) {
                        const managerClass = Gordic.Widget.GMagicManager.GMagicManager.widgetCssClass;
                        $(fieldElement).closest("." + managerClass).gmagicmanager("setMagicFields", vstup, $(fieldElement) /*, idRozvrh === null*/);
                    }
                    // Nastavení rozvrhu s kontrolou existence Magic Manageru
                    if (nastavRozvrh) {
                        const $manager = $(fieldElement).closest("." + managerClass);
                        if ($manager.length === 0) {
                            throw new Error("Magic Manager nebyl nalezen");
                        }
                        // Ověř, že má gmagicmanager widget
                        if (!$manager.data("gordic-gmagicmanager")) {
                            throw new Error("gmagicmanager widget není inicializován");
                        }
                        try {
                            $manager.gmagicmanager("setMagicFields", vstup, $(fieldElement));
                        }
                        catch (error) {
                            throw new Error("Chyba při volání setMagicFields: " + (error instanceof Error ? error.message : String(error)));
                        }
                    }
                }
                /**
                 * Nacteni rozvrhu dle aktualnich hodnot
                 *
                 */
                getIdRozvrhu(rok, nks, ucs) {
                    // Kontrola vstupních parametrů
                    if (!rok || rok === 0) {
                        console.warn("getIdRozvrhu: Neplatný rok", rok);
                        return null;
                    }
                    // Pro VLZŘ (DRD = 9) vrať speciální rozvrh
                    if (this.getDrd(rok) === 9) {
                        if (!this.doklad.Rozvrhy || !this.doklad.Rozvrhy.IxsVLZR) {
                            console.warn("getIdRozvrhu: Není nastaven rozvrh VLZŘ");
                            return null;
                        }
                        return this.doklad.Rozvrhy.IxsVLZR;
                    }
                    // Kontrola existence seznamu rozvrhů
                    if (!this.doklad.Rozvrhy?.Seznam || this.doklad.Rozvrhy.Seznam.length === 0) {
                        console.warn("getIdRozvrhu: Seznam rozvrhů je prázdný");
                        return null;
                    }
                    // Hledání rozvrhu podle UseUcs příznaků
                    let result = null;
                    this.doklad.Rozvrhy.Seznam.forEach((item) => {
                        // Trim hodnot před porovnáním
                        const itemUcs = item.ucs?.trim() ?? "";
                        const itemNks = item.nks?.trim() ?? "";
                        const searchUcs = ucs?.trim() ?? "";
                        const searchNks = nks?.trim() ?? "";
                        if (this.doklad.Rozvrhy?.UseUcs) {
                            // Hledání podle UCS
                            if (itemUcs === searchUcs) {
                                result = item.Ixs || null;
                                return; // Ukonči forEach
                            }
                        }
                        else {
                            // Hledání podle NKS
                            if (itemNks === searchNks) {
                                result = item.Ixs || null;
                                return; // Ukonči forEach
                            }
                        }
                    });
                    // Logování pro debugging
                    if (!result) {
                        console.warn("getIdRozvrhu: Rozvrh nebyl nalezen", {
                            rok: rok,
                            nks: nks,
                            ucs: ucs,
                            useUcs: this.doklad.Rozvrhy?.UseUcs,
                            dostupneRozvrhy: this.doklad.Rozvrhy?.Seznam
                        });
                    }
                    return result;
                }
                /**
                 * Vytvoreni girdformatu
                 *
                 * @param that
                 * @returns
                 */
                createGridFormatPorizovac(typPorizovace) {
                    let that = this;
                    const managerClass = Gordic.Widget.GMagicManager.GMagicManager.widgetCssClass;
                    let dataSentence = $.extend(that["dataSentence"], {
                        sentenceType: 50 /* Gordic.Eko.Interface.TypVetyEnum.Rozpoctova */, rok: that.doklad.header?.rok,
                        drd: this.doklad.header?.drd
                        //, ixsRoz:"A446UR00A1BX"
                    });
                    // Zacinam definici gridformatu. Pridame  cislo radku
                    const gridFormat = new Gordic.Data.GridFormat();
                    gridFormat.addNumberColumn({
                        name: "radek_z",
                        caption: "#",
                        width: 40,
                        fixedWidth: true,
                        sortable: false,
                        customClass: "ui-disabled",
                        forced: true, // sloupec nelze skryt
                    });
                    // Rok pridavame do porizovace jen pri VLZR
                    if (typPorizovace == 1 /* GRozTypPorizovace.VLZR */) {
                        gridFormat.addRok({
                            editor: {
                                // Typ widgetu
                                widget: "gnumberbox",
                                // Objekt s ejednotlivymi volbami a metodami
                                options: {
                                    // Nazev policka
                                    name: "rok",
                                    // Trida pouzita pro dohledani
                                    customClass: "js-NoDSCheck",
                                    // Metoda pro implementaci vlozeni/zjisteni hodnoty pole
                                    model: (mode, val, options) => {
                                        switch (mode) {
                                            case "collect":
                                                val.rok = $(this).gfield("getValue");
                                                return;
                                            case "apply":
                                                $(this).gfield("setValue", val.rok_ev, options);
                                                return;
                                        }
                                        return "rok";
                                    },
                                    // 
                                    validators: [new Gordic.Validators.Required()],
                                    /**
                                    * Udalost volana po zmene hodnoty v policku
                                    * */
                                    change: that.createRozvrhChangeHandler("Rok", // Název pole pro chybové hlášky
                                    (changeObj) => changeObj.value, // Extrakce hodnoty z changeObj                                
                                    ($field, rok) => {
                                        const rokNum = rok;
                                        // Zpřístupni pole smlouva, balancování, požadavek
                                        that.$porizovac.findFields("smlouva,priz_bal_inv,pozadavek")
                                            .gfield("option", "disabled", false);
                                        // Validace: Rok musí být >= aktuální rok
                                        if (rokNum < that.globals.EkoParams?.Rok) {
                                            // Pokud je v editaci a rok je 0, nastav aktuální rok
                                            if (that.editRows && rokNum === 0) {
                                                $field.gfield("setValue", that.globals.EkoParams?.Rok);
                                            }
                                            // Zobraz chybu
                                            $field.gfield("setError", {
                                                stopping: true,
                                                errorType: "error",
                                                group: "reverifyErr",
                                                message: "jres:30250511" //RC 30250511 : Rok musí být stejný nebo větší než účetní rok!
                                            });
                                            // Vyber text v input poli
                                            $field.find("input")?.trigger("select");
                                            return false; // Validace selhala
                                        }
                                        // Validace: Pro víceleté rozpočtování BEZ běžného roku
                                        if (that.globals.DatabaseParams?.ViceleteRozpoctovani ===
                                            2 /* Gordic.Uct.Interface.ViceleteRozpoctovaniEnum.anoBezBeznehoRoku */) {
                                            if (rokNum === that.globals.EkoParams?.Rok) {
                                                $field.gfield("setError", {
                                                    stopping: true,
                                                    errorType: "error",
                                                    group: "reverifyErr",
                                                    message: "jres:30250514" //RC 30250514 : Rok musí být větší než rok dokladu!
                                                });
                                                $field.find("input")?.trigger("select");
                                                return false; // Validace selhala
                                            }
                                        }
                                        // Znepřístupni pole pro běžný rok
                                        that.$porizovac.findFields("smlouva,priz_bal_inv,pozadavek")
                                            .gfield("option", "disabled", rokNum === that.globals.EkoParams?.Rok);
                                        return true;
                                    })
                                },
                            }
                        });
                    }
                    if (typPorizovace !== 2 /* GRozTypPorizovace.Rezervace */) {
                        gridFormat.addNks({
                            //name: "nks",
                            //caption: Gordic.Consts.DbShortcuts.nks,
                            //width: 80,
                            forced: true,
                            editor: {
                                widget: "gselectbox",
                                options: [
                                    Gordic.Prefabs.Select.ekosnks(),
                                    {
                                        // Nazev policka
                                        name: "nks",
                                        // Tewmplate pro zobrazeni
                                        itemTemplate: "{nks:trim:encode}",
                                        // Skryti vyberovych tecek ?
                                        showSelectButton: false,
                                        // Trida pro dohledani pomoci jQuery
                                        customClass: "js-NoDSCheck", // js-NKS",
                                        // Metoda pro implementaci vlozeni/zjisteni hodnoty pole
                                        model: "model.ico=>value.ico,model.nks=value.nks",
                                        // Serverove filtry pro vyhledavani pomoci F4
                                        serverFilters: {
                                            ico: that.doklad.header?.ico,
                                            vazbaUcsNaEkovnks: that.doklad.header?.ucs,
                                            rok_od: "<= " + that.doklad.header?.rok,
                                            rok_do: function (vstup) {
                                                //let rok = that.$porizovac.findFields("rok").gfield("getValue");
                                                let rok = that.typPorizovace == 1 /* GRozTypPorizovace.VLZR */ ? that.$porizovac.findFields("rok").gfield("getValue") : that.doklad.header?.rok;
                                                if (typPorizovace == 1 /* GRozTypPorizovace.VLZR */)
                                                    return ">= " + rok;
                                                else
                                                    return ">= " + that.doklad.header?.rok?.toString();
                                            }, //">= " + that.doklad.header?.rok,
                                            aktivita: 100,
                                            vazbaNksNaFunkci: that.globals.DatabaseParams.VazbaNksNaFunkci ? that.globals.SessionParams.IxsFun : undefined,
                                        },
                                        /**
                                         * Udalost volana po zmene hodnoty v policku NKS
                                         * */
                                        change: that.createRozvrhChangeHandler(Gordic.Consts.DbShortcuts.nks, // Název pole (např. "NKS")
                                        (changeObj) => changeObj.value?.nks // Extrakce hodnoty
                                        ),
                                    }
                                ]
                            }
                        })
                            .addUcs({
                            forced: true,
                            editor: {
                                widget: "gselectbox",
                                options: [
                                    Gordic.Prefabs.Select.ekosucs(),
                                    {
                                        // Nazev policka
                                        name: "ucs",
                                        // Tewmplate pro zobrazeni
                                        itemTemplate: "{ucs:trim:encode}",
                                        // Skryti vyberovych tecek ?
                                        showSelectButton: false,
                                        // Trida pro dohledani pomoci jQuery
                                        customClass: "js-NoDSCheck", // js-NKS",
                                        // Metoda pro implementaci vlozeni/zjisteni hodnoty pole
                                        model: "model.ico=>value.ico,model.ucs=value.ucs",
                                        // Serverove filtry pro vyhledavani pomoci F4
                                        serverFilters: {
                                            ico: that.doklad.header?.ico,
                                            aktivita: 100,
                                        },
                                        // Validator policka - musi byt vyplnene
                                        validators: [new Gordic.Validators.Required()],
                                        verify: function () {
                                            console.log("verify");
                                        },
                                        selector: function () {
                                            return that.isl.RozDoklad.getRezim({ kategorieDokladu: that.doklad.header?.ktg_typ, nks: that.$porizovac.findFields("nks").gfield("getValue").nks, throwException: true })
                                                .get()
                                                .then((rezim) => {
                                                if (rezim == -1)
                                                    return $.Deferred().reject().promise();
                                                if (rezim === 30 && !that.globals.DatabaseParams.UrceniRezimuUctovaniDleKategorieDokladu) {
                                                    // zobrazit dialog
                                                    return that.dialogs.showModalWindow(vyberoveOkno, {}, "jres:30250369" //RC 30250369 : Výběr režimu financování
                                                    )
                                                        .createDialogPromise()
                                                        .then((result) => {
                                                        debugger;
                                                        if (typeof result !== "undefined" && result.actionRadios)
                                                            return result.actionRadios;
                                                        else
                                                            return $.Deferred().reject().promise();
                                                    });
                                                }
                                                else
                                                    return rezim;
                                            })
                                                .then((rezim) => {
                                                // nacteni dat ciselniku
                                                let nks = that.$porizovac.findFields("nks").gfield("getValue")?.nks ?? "";
                                                return that.isl.RozDoklad.getUcsTable({ nks: nks, rezim: rezim, ucsFilter: "" }).get();
                                            })
                                                /*return def*/ .then((dataDB) => {
                                                return new Gordic.Data.Selectors.DefaultSelector({
                                                    data: dataDB,
                                                    related: this,
                                                    gridFormat: new Gordic.Data.GridFormat()
                                                        .addTextColumn({
                                                        name: "nazev",
                                                        caption: "jres:30250490", //RC 30250490 : Název
                                                        width: 120
                                                    })
                                                        .addTextColumn({
                                                        name: "ucs",
                                                        caption: "jres:30250491", //RC 30250491 : Hodnota
                                                        width: 150
                                                    })
                                                }).show();
                                            });
                                            //return def.promise();
                                        },
                                        /**
                                         * Udalost volana po zmene hodnoty v policku UCS
                                         * */
                                        change: that.createRozvrhChangeHandler(Gordic.Consts.DbShortcuts.ucs, // Název pole (např. "UCS")
                                        (changeObj) => changeObj.value?.ucs // Extrakce hodnoty
                                        ),
                                    }
                                ]
                            }
                        })
                            .addUus({
                            //name: "uus",
                            //caption: Gordic.Consts.DbShortcuts.uus,
                            //width: 70,
                            forced: true,
                            editor: {
                                widget: "gselectbox",
                                options: [
                                    Gordic.Prefabs.Select.ekosuus(),
                                    {
                                        name: "uus",
                                        flag: Gordic.Prefabs.Field.Flags.required,
                                        validators: [
                                            new Gordic.Validators.Required()
                                            //,new Gordic.Validators.Length({ min: 1, max: 2, message: "Pole je moc krátké" })
                                        ],
                                        itemTemplate: "{uus:trim:encode}",
                                        showSelectButton: false,
                                        change: function (ev, changeObj) {
                                            $(this).gfield("resetErrors");
                                            let uus = changeObj.value ? changeObj.value?.uus : "";
                                            if (!uus) {
                                                $(this).gfield("setError", { stopping: true, errorType: "error", group: "reverifyErr", message: "jres:30250515".format(Gordic.Consts.DbShortcuts.uus) }); //RC 30250515 : {0} musí být zadáno.
                                                return;
                                            }
                                        },
                                        serverFilters: {
                                            ico: that.doklad.header?.ico,
                                            aktivita: 100,
                                            rok_od: "<= " + that.doklad.header?.rok,
                                            ekovfus_ixs_fun: that.globals.DatabaseParams.VazbaUctarnyNaFunkci ? that.globals.SessionParams.IxsFun : undefined,
                                            ucs: (vstup) => {
                                                console.log(that.$porizovac.findFields("ucs")?.gfield("getValue")?.ucs);
                                                return that.$porizovac.findFields("ucs")?.gfield("getValue")?.ucs;
                                            },
                                            rok_do: function (vstup) {
                                                if (typPorizovace == 1 /* GRozTypPorizovace.VLZR */)
                                                    return ">= " + (that.typPorizovace == 1 /* GRozTypPorizovace.VLZR */ ? that.$porizovac.findFields("rok").gfield("getValue") : that.doklad.header?.rok); //that.$porizovac.findFields("rok").gfield("getValue");
                                                else
                                                    return ">= " + that.doklad.header?.rok?.toString();
                                            },
                                        },
                                        model: "model.ico=>value.ico,model.ucs=>value.ucs,model.uus=value.uus",
                                        //customClass: "js-DWConfig",
                                    }
                                ]
                            }
                        });
                    }
                    ;
                    gridFormat.addSortedEkoCfuSet(that, {
                        isEditable: true,
                        dataSentence: dataSentence,
                        fieldOptions: {
                            te2: {
                                // 18.8.22 pnovak - priklad pridani nasledne kontroly pri posunu na dalsi pole
                                //dodatecnaKontrola:(value)=>{return Islcall content.call();}
                                additionalCheck: (value) => {
                                    debugger;
                                    if (this.globals.DatabaseParams?.ZpracovatManazeryCilu) {
                                        if (that.KontrolaSlovaCor(value?.code ?? null, null))
                                            return $.Deferred().resolve().promise();
                                        else
                                            return $.Deferred().reject().promise();
                                    }
                                    else
                                        return $.Deferred().resolve().promise();
                                }
                            },
                            te4: {
                                //
                                additionalCheck: (value) => {
                                    debugger;
                                    if (this.globals.DatabaseParams?.ZpracovatManazeryCilu) {
                                        if (that.KontrolaSlovaUka(value?.code ?? ""))
                                            return $.Deferred().resolve().promise();
                                        else
                                            return $.Deferred().reject().promise();
                                    }
                                    else
                                        return $.Deferred().resolve().promise();
                                }
                            }
                        },
                        managerOptions: {
                            // 18.8.22 pnovak - priklad filtrovani dat pri nacitani
                            dataWordsFilter: (colName, dataview) => {
                                if (this.globals.DatabaseParams?.ZpracovatManazeryCilu) {
                                    if (colName == "te2" || colName == "te4")
                                        return $.Deferred().resolve(this.FiltrNapovedy(colName, dataview)).promise();
                                }
                                return $.Deferred().resolve(dataview).promise();
                                //return Islcall content.call(); => vracet DataView / pole dto
                            },
                            // TODO: 24.09.25 KK - puvodne zde bylo jen PrizCheckUete, ale nyni muze nabyvat hodnot 0,1,2
                            //   Jelikoz je to promenna boolean, musel jsem to doplnit na logickou operaci
                            useNonDigital: this.globals.EkoParams.PrizCheckUete > 0
                            //drd: $.Deferred().resolve(that.doklad.header?.drd).promise()
                        }
                    })
                        .addMD({
                        //name: "c0",
                        caption: that.globals.DatabaseParams.NazevPoleC0,
                        //width: 110,
                        forced: true,
                        //customClass:"js-castka",
                        editor: {
                            widget: "gnumberbox",
                            options: [
                                Gordic.Prefabs.Number.currency(),
                                {
                                    name: "c0",
                                    customClass: "js-MD",
                                    model: "model.c0=value"
                                }
                            ]
                        }
                    })
                        .addDal({
                        //name: "c1",
                        caption: that.globals.DatabaseParams.NazevPoleC1,
                        //width: 110,
                        forced: true,
                        editor: {
                            widget: "gnumberbox",
                            options: [
                                Gordic.Prefabs.Number.currency(),
                                {
                                    name: "c1",
                                    customClass: "js-DAL",
                                    model: "model.c1=value",
                                    //    smartNavNextElement: (currentElement, nextElement) => {
                                    //        return that.call("kontrolacastky").then((result) => { return result ? nextElement : false; })
                                    //    }
                                }
                            ]
                        }
                    });
                    if (typPorizovace == 1 /* GRozTypPorizovace.VLZR */) {
                        gridFormat.addTextColumn({
                            name: "smlouva",
                            caption: "jres:30250364", //RC 30250364 : Smlouva
                            width: 150,
                            forced: true,
                            editor: {
                                widget: "gselectbox",
                                options: {
                                    name: "smlouva",
                                    model: "model.ixp_sml=value.ixp_sml,model.smlouva=value.smlouva",
                                    itemTemplate: "{smlouva:trim:encode}",
                                    selector: function (options) {
                                        //let def = $.Deferred();
                                        const field = $(this);
                                        const value = field.gfield("getValue");
                                        const grid = that.getGrid();
                                        let ixp_sml = "";
                                        if (grid !== null) {
                                            var row = $(grid).find(".cell.editing").closest('.row').eq(0); //.row.editing nemusí být ještě nastaveno, toto je jistější
                                            if (row.length) {
                                                let ci = grid.ggrid("cellInfo", row, true);
                                                ixp_sml = ci?.data.ixp_sml;
                                            }
                                        }
                                        debugger;
                                        let rok = that.$porizovac.findFields("rok").gfield("getValue");
                                        let input = {
                                            smlouva: value ? value.smlouva ? value.smlouva : "" : "", ico: that.doklad.header?.ico,
                                            rok: rok, ucs: that.doklad.header?.ucs,
                                            identifikator: ixp_sml, akt_znacka: that.doklad.dokument?.akt_znacka,
                                            ixpDokladu: that.doklad.header?.ixp
                                        };
                                        return $.content(field).dialogs.showModalWindow("Gordic.Eko.WebClient.GVyberZUloh", { options: input }, { width: 1200, height: 500 })
                                            .createDialogPromise((result) => {
                                            //result["smlouva"]="vybrana";
                                            return !!result;
                                        })
                                            .then((result) => {
                                            debugger;
                                            let nazev = result.row.nazev;
                                            switch (result.ag) {
                                                case "SML":
                                                    // Pokud nazev vyplneny neni, vloz tam standardni text                                        
                                                    if (!nazev)
                                                        nazev = "jres:30250477".format(result.row.identifikator); //RC 30250477 : Smlouva {0}
                                                    if (that.globals.DatabaseParams?.ZobrazovatPIDVPrimDokladech)
                                                        nazev = result.row.identifikator + "jres:30250475"; //RC 30250475 : -SML
                                                    break;
                                                case "EVZ":
                                                    // Pokud nazev vyplneny neni, vloz tam standardni text                                        
                                                    if (!nazev)
                                                        nazev = "jres:30250478".format(result.row.identifikator); //RC 30250478 : EVZ {0}
                                                    if (that.globals.DatabaseParams?.ZobrazovatPIDVPrimDokladech)
                                                        nazev = result.row.identifikator + "jres:30250476"; //RC 30250476 : -EVZ
                                            }
                                            // TODO;                                        
                                            return { smlouva: nazev, ixp_sml: result.row.identifikator };
                                        });
                                        //return def.promise();
                                    }
                                }
                            }
                        });
                        if (that.globals.DatabaseParams?.ZadaniPriznakuBalancovatelnosti == 0 /* Gordic.Uct.Interface.ZadaniPriznakuBalancovatelnostiEnum.automatickyBalancovatelne */
                            || that.globals.DatabaseParams?.ZadaniPriznakuBalancovatelnosti == 1 /* Gordic.Uct.Interface.ZadaniPriznakuBalancovatelnostiEnum.automatickyNebalancovatelne */)
                            gridFormat.addBooleanColumn({
                                name: "priz_bal_inv",
                                caption: "jres:30250365", //RC 30250365 : Blok.
                                description: "jres:30250474", //RC 30250474 : Blokování balancování
                                width: 55,
                                forced: true,
                            });
                        else
                            gridFormat.addBooleanColumn({
                                name: "priz_bal_inv",
                                caption: "jres:30250365", //RC 30250365 : Blok.
                                description: "jres:30250474", //RC 30250474 : Blokování balancování
                                width: 55,
                                forced: true,
                                //e
                                editor: {
                                    widget: "gcheck",
                                }
                            });
                        gridFormat.add({
                            name: "pozadavek",
                            caption: "jres:30250366", //RC 30250366 : Požadavek
                            width: 150,
                            forced: true,
                            editor: {
                                widget: "gstringbox",
                                options: {
                                    name: "pozadavek"
                                }
                            }
                        });
                    }
                    that.globals.DatabaseParams?.ZadaniPriznakuBalancovatelnosti;
                    gridFormat.addPopis({
                        //name: "popis",
                        //caption: "jres:30150087",
                        //width: 300,
                        customClass: "js-popis",
                        editor: {
                            widget: "gstringbox",
                            options: [
                                { smartNavOnLength: 254 }
                            ]
                        }
                    });
                    if (typPorizovace === 0 /* GRozTypPorizovace.Standard */ && that.isRezervujeVIISSP) {
                        gridFormat.addTextColumn({
                            name: "id_hdr_ris",
                            caption: "jres:30250361", //RC 30250361 : ID IISSP
                            width: 70,
                            forced: true,
                        })
                            .addNumberColumn({
                            name: "radek_hdr_ris",
                            caption: "jres:30250362", //RC 30250362 : Řádek IISSP
                            width: 110,
                        })
                            .addNumberColumn({
                            name: "radek_hdr",
                            caption: "jres:30250363", //RC 30250363 :  Řádek GIN
                            width: 110,
                        });
                    }
                    return gridFormat;
                }
                /**
                 * Vytvoří standardní change handler pro pole, která ovlivňují rozvrh (NKS, UCS, ROK)
                 *
                 * Tato helper funkce CENTRALIZUJE logiku pro:
                 * 1. Validaci vyplněné hodnoty
                 * 2. Kontrolu závislých polí (NKS, UCS, ROK)
                 * 3. Dohledání a nastavení rozvrhu
                 * 4. Automatický přechod na další pole
                 *
                 * @param fieldName Název pole pro zobrazení v chybových hláškách (např. "UCS", "NKS", "Rok")
                 * @param getFieldValue Funkce, která ze changeObj extrahuje hodnotu pole. Příklad: (changeObj) => changeObj.value?.ucs
                 * @param additionalValidation Volitelná dodatečná validace specifická pro dané pole. Vrací true = validace OK, false = validace FAILED (chyba už nastavena)
                 * @returns Change handler funkce připravenou pro přiřazení do options.change
                 *
                 * @example
                 * // Použití pro jednoduché pole UCS:
                 * change: that.createRozvrhChangeHandler(
                 *     Gordic.Consts.DbShortcuts.ucs,      // fieldName
                 *     (changeObj) => changeObj.value?.ucs  // getFieldValue
                 * )
                 *
                 * @example
                 * // Použití pro ROK s vlastní validací:
                 * change: that.createRozvrhChangeHandler(
                 *     "Rok",
                 *     (changeObj) => changeObj.value,
                 *     ($field, rok) => {
                 *         if (rok < that.globals.EkoParams?.Rok!) {
                 *             $field.gfield("setError", { message: "Rok je příliš malý" });
                 *             return false;  // Validace selhala
                 *         }
                 *         return true;  // Validace OK
                 *     }
                 * )
                 */
                createRozvrhChangeHandler(fieldName, getFieldValue, additionalValidation) {
                    // ══════════════════════════════════════════════════════════════════════
                    // PŘÍPRAVA KONTEXTU
                    // ══════════════════════════════════════════════════════════════════════
                    // Ulož si referenci na instanci třídy (pro použití v inner function)
                    const that = this;
                    // Získej CSS třídu Magic Manageru (bez tečky na začátku)
                    const managerClass = Gordic.Widget.GMagicManager.GMagicManager.widgetCssClass;
                    // ══════════════════════════════════════════════════════════════════════
                    // VRÁCENÁ FUNKCE (vlastní change handler)
                    // ══════════════════════════════════════════════════════════════════════
                    // DŮLEŽITÉ: Používáme 'function' (ne arrow funkci), protože:
                    // - 'this' v kontextu 'function' = DOM element pole (input/select)
                    // - 'this' v arrow funkci by bylo = instance třídy (špatně!)
                    return function (ev, changeObj) {
                        // ──────────────────────────────────────────────────────────────────
                        // 1. INICIALIZACE PROMĚNNÝCH
                        // ──────────────────────────────────────────────────────────────────
                        // Ulož si referenci na DOM element pole
                        // 'this' = např. <input name="ucs" />
                        const fieldElement = this;
                        // Vytvoř jQuery wrapper pro snadnější práci
                        // Umožňuje volat .gfield(), .find() atd.
                        const $field = $(this);
                        // ──────────────────────────────────────────────────────────────────
                        // 2. RESET CHYBOVÝCH HLÁŠEK
                        // ──────────────────────────────────────────────────────────────────
                        // Smaž všechny předchozí chyby na tomto poli
                        // Pokud uživatel opraví hodnotu, nechceme mu stále ukazovat starou chybu
                        $field.gfield("resetErrors");
                        // ──────────────────────────────────────────────────────────────────
                        // 3. ZÍSKÁNÍ HODNOTY POLE
                        // ──────────────────────────────────────────────────────────────────
                        // Zavolej předanou funkci getFieldValue pro extrakci hodnoty
                        // changeObj = objekt s informacemi o změně, obsahuje 'value'
                        // 
                        // Příklady:
                        // - Pro UCS: changeObj.value = { ucs: "101", ico: "12345", ... }
                        //   → getFieldValue vrací "101"
                        // - Pro ROK: changeObj.value = 2025
                        //   → getFieldValue vrací 2025
                        const value = getFieldValue(changeObj);
                        // ──────────────────────────────────────────────────────────────────
                        // 4. ZÁKLADNÍ VALIDACE - POLE MUSÍ BÝT VYPLNĚNÉ
                        // ──────────────────────────────────────────────────────────────────
                        // Kontrola, že hodnota existuje a není prázdný string
                        // Pokryje případy:
                        // - value === null
                        // - value === undefined
                        // - value === ""
                        // - value === "   " (po trim())
                        if (!value || (typeof value === "string" && value.trim() === "")) {
                            // Zobraz chybovou hlášku
                            // RC 30250515 : {0} musí být zadáno.
                            // Výsledek např.: "UCS musí být zadáno."
                            $field.gfield("setError", {
                                stopping: true, // Zastaví další zpracování (např. submit formu)
                                errorType: "error", // Typ chyby (červená)
                                group: "reverifyErr", // Skupina pro snadné mazání souvisejících chyb
                                message: "jres:30250515".format(fieldName) //RC 30250515 : {0} musí být zadáno.
                            });
                            // Ukonči zpracování - nepokračuj dál
                            return;
                        }
                        // ──────────────────────────────────────────────────────────────────
                        // 5. DODATEČNÁ VALIDACE (VOLITELNÁ)
                        // ──────────────────────────────────────────────────────────────────
                        // Pokud byla předána funkce pro dodatečnou validaci, zavolej ji
                        // Tato funkce může provést specifické kontroly pro dané pole
                        // 
                        // Příklad pro ROK:
                        // - Kontrola minimálního roku
                        // - Kontrola víceročního rozpočtování
                        // - Zpřístupnění/znepřístupnění souvisejících polí
                        //
                        // Pokud validace vrátí false:
                        // - Předpokládá se, že chyba je už nastavena v additionalValidation
                        // - Ukončíme zpracování
                        if (additionalValidation && !additionalValidation($field, value)) {
                            return; // Validace selhala, chyba je už nastavená
                        }
                        // ──────────────────────────────────────────────────────────────────
                        // 6. NAČTENÍ HODNOT PRO ROZVRH
                        // ──────────────────────────────────────────────────────────────────
                        // Pro dohledání rozvrhu potřebujeme TROJICI hodnot: NKS + UCS + ROK
                        // Načteme je z jiných polí v pořizovači
                        // Načti NKS (Národohospodářská klasifikace)
                        // Hledáme pole s name="nks" v pořizovači
                        // ?.gfield("getValue") = bezpečné volání (pokud pole neexistuje, vrátí undefined)
                        // ?.nks = extrakce hodnoty nks z objektu { nks: "1234", ico: "...", ... }
                        // ?? "" = pokud je undefined/null, použij prázdný string
                        const nks = that.$porizovac.findFields("nks")?.gfield("getValue")?.nks ?? "";
                        // Načti UCS (Účetní středisko)
                        // Stejná logika jako u NKS
                        const ucs = that.$porizovac.findFields("ucs")?.gfield("getValue")?.ucs ?? "";
                        // Načti ROK
                        // Pro VLZŘ (Víceletý závazek rozpočtu) se rok bere z pole v pořizovači
                        // Pro ostatní typy se bere z hlavičky dokladu
                        const rok = that.typPorizovace === 1 /* GRozTypPorizovace.VLZR */
                            ? that.$porizovac.findFields("rok")?.gfield("getValue") // Z pole v gridu
                            : that.doklad.header?.rok; // Z hlavičky dokladu
                        // ──────────────────────────────────────────────────────────────────
                        // 7. KONTROLA KOMPLETNOSTI DAT PRO ROZVRH
                        // ──────────────────────────────────────────────────────────────────
                        // Bez NKS nemůžeme najít rozvrh
                        if (!nks || nks === "") {
                            $field.gfield("setError", {
                                stopping: true,
                                errorType: "error",
                                group: "reverifyErr",
                                message: "jres:30250519".format(Gordic.Consts.DbShortcuts.nks) //RC 30250519 : Nejprve vyplňte {0}.
                            });
                            // Přesuň focus na pole NKS, aby uživatel věděl, co má vyplnit
                            that.$porizovac.findFields("nks").gfield("focus");
                            return;
                        }
                        // Bez UCS nemůžeme najít rozvrh
                        if (!ucs || ucs === "") {
                            $field.gfield("setError", {
                                stopping: true,
                                errorType: "error",
                                group: "reverifyErr",
                                message: "jres:30250519".format(Gordic.Consts.DbShortcuts.ucs) //RC 30250519 : Nejprve vyplňte {0}.
                            });
                            // Přesuň focus na pole UCS
                            that.$porizovac.findFields("ucs").gfield("focus");
                            return;
                        }
                        // Bez roku nemůžeme najít rozvrh
                        if (!rok || rok === 0) {
                            $field.gfield("setError", {
                                stopping: true,
                                errorType: "error",
                                group: "reverifyErr",
                                message: "jres:30250520" //RC 30250520 : Chybný rok pro dohledání rozvrhu.
                            });
                            return;
                        }
                        // ──────────────────────────────────────────────────────────────────
                        // 8. NASTAVENÍ ROZVRHU A PŘECHOD NA DALŠÍ POLE
                        // ──────────────────────────────────────────────────────────────────
                        // Try-catch pro ošetření neočekávaných chyb
                        // Například: Magic Manager není inicializovaný, rozvrh nebyl nalezen atd.
                        try {
                            // ═══════════════════════════════════════════════════════════
                            // KLÍČOVÁ AKCE: Nastavení rozvrhu
                            // ═══════════════════════════════════════════════════════════
                            // setRozvrh dělá:
                            // 1. Dohledá ID rozvrhu podle kombinace UCS + NKS + rok
                            // 2. Najde Magic Manager (kontejner pro EKO větu)
                            // 3. Nastaví všechna pole EKO věty (TE1-TE9) podle rozvrhu
                            //
                            // Parametry:
                            // - fieldElement = DOM element aktuálního pole (pro hledání Magic Manageru)
                            // - { ucs, nks, rok } = data pro dohledání rozvrhu
                            // - managerClass = CSS třída Magic Manageru ("g-magic-manager")
                            that.setRozvrh(fieldElement, { ucs: ucs, nks: nks, rok: rok }, managerClass);
                            // ═══════════════════════════════════════════════════════════
                            // Automatický přechod na další pole
                            // ═══════════════════════════════════════════════════════════
                            // smartNavNext inteligentně najde další editovatelné pole a přesune tam focus
                            // Pořadí:
                            // 1. Další pole ve stejném řádku (doprava)
                            // 2. První pole v dalším řádku (pokud jsme na konci)
                            // 3. Tlačítko OK (pokud jsme na posledním poli)
                            $field.gfield("smartNavNext");
                        }
                        catch (error) {
                            // ═══════════════════════════════════════════════════════════
                            // Ošetření chyby při nastavení rozvrhu
                            // ═══════════════════════════════════════════════════════════
                            // Zobraz chybovou hlášku s detaily (pokud jsou dostupné)
                            $field.gfield("setError", {
                                stopping: true,
                                errorType: "error",
                                group: "reverifyErr",
                                message: "jres:30250521" + (error instanceof Error ? ": " + error.message : "") //RC 30250521 : Chyba při nastavení rozvrhu.
                                // Výsledek např.: "Chyba při nastavení rozvrhu: Magic Manager nebyl nalezen"
                            });
                            // Vypiš chybu do console pro debugging
                            // Zobrazí stack trace a detaily chyby
                            console.error("Chyba při nastavení rozvrhu:", error);
                        }
                        ;
                    };
                }
                ;
                //#endregion
                //////////////////////////////////////////
                //////////////////////////////////////////
                //#region Metoda onDetailBuilderBuild
                /**
                 * onDetailBuilderBuild
                 *
                 * Událost oznamuje, že builder sloučil data všech komponent a chystá se předat je do contentu.
                 * Jako parametr je předána instance DetailBuilderu, na které je ještě možné přidat / odebrat / přesunout / upravit jednotlivé definice před tím,
                 * než budou vloženy do contentu. (vyjímkou jsou contentExtensions a texts, které jsou předány do contentu už během build funkce).
                 *
                 * @param builder content, na kterém má DetailBuilder vytvořit detail z komponent
                 */
                onDetailBuilderBuild(builder) {
                    const that = this;
                    // !! POZOR - $.extend( musí mít prvni parametr true, aby prevzala vsechna predchozi nastaveni. Jinak to pouze prepise POZOR !!
                    const realizator = $.extend(true, builder.getDefinition(Gordic.Eko.HeaderForm.Fields.Realizator)[0]?.item, {
                        layout: "w-8",
                        options: {
                            disabled: this.doklad.FieldPermissions?.Realizator.value === false,
                        }
                    });
                    // Úprava EKO hlavičky dokladu
                    // Definice: Eko.WebClient/Eko/Detail/DetailBuilderComponents/GEkoHeaderFormComponent.ts
                    // export function setup(builder: Gin.DetailBuilder.GDetailBuilder, settings: ObjectLiteral<Partial<Forms.FormRow | Forms.FormField | Forms.FormSection> | null>) 
                    // Nekde predtim je volana funkce Gordic.Eko.DetailBuilderComponents.EkoHeaderForm.create, ktera vytvori objekt hlavicky
                    // Tento objekt jiz obsahuje predplnene hodnoty, ktere lze defaultne pouzit
                    // Pokud chci nekde nevyhovujici hodnoty zmenit, vytvorim si zde objektovy literal, ktery bude obsahovat nove nebo zmenene hodnoty
                    // Aby se definice nepopletly a netvorila se nova vlastnost, jsou ve jmenem prostoru Gordic.Eko.HeaderForm definovane enumy pro spravne prirazeni (zde napr. Gordic.Eko.HeaderForm.Fields.TypDokladu)
                    // Mohu zde definovat jak nove sekce, tak radky ci fieldy.
                    // Po vytvoreni jej poslu do setupu, kde se puvodni a tyto nove vlastnosti spoji pomoci .$extends
                    Gordic.Eko.HeaderForm.setup(builder, {
                        // Kniha
                        [Gordic.Eko.HeaderForm.Fields.Kniha]: {
                            options: $.extend(true, Gordic.Prefabs.Select.ekosden(50), {
                                disabled: true,
                                dropdown: false // vytvor policko s vyberem ..., ne jako combo
                            })
                        },
                        // Typ dokladu
                        [Gordic.Eko.HeaderForm.Fields.TypDokladu]: {
                            options: {
                                flag: Gordic.Prefabs.Field.Flags.required, // povinne pole
                                disabled: true,
                                serverFilters: {
                                    VazbaNaKnihu: that.doklad.header?.ixp_den,
                                    PouzeROZ: 1,
                                    // 11.9.19 KK - pokud je omezeni pracovat s materialovymi kompetenty, povol mu vybrat jen typy kategorie rozpoctovy doklad a ENNV
                                    ktg_typ: this.globals.DatabaseParams.PouzitiMaterialovychKompetentu ? [1100, 1185] : undefined,
                                },
                                // Co se ma stat po zmene hodnoty - znepristupneni a vymaz zavislych prvku
                                change: function (ev, changeObj) {
                                    // Po zmene musim vymazat zavisla pole. Chtelo by to zjistit puvodni hodnotu, zda se zmenila
                                    that.findFields("formMesicField" /* Fields.Mesic */).gfield("clear");
                                    that.findFields("formDenField" /* Fields.Den */).gfield("clear");
                                    that.findFields("formDrdField" /* Fields.Drd */).gfield("clear");
                                    that.findFields("formCisloDokladuField" /* Fields.CisloDokladu */).gfield("clear");
                                }
                            }
                        },
                        // Kompetent
                        [Gordic.Eko.HeaderForm.Fields.Kompetent]: {
                            options: {
                                disabled: true,
                                serverFilters: {
                                    aktivita: 100,
                                    priz_kom: 10,
                                    ico: that.doklad.header?.ico,
                                },
                                change: (ev, obj) => {
                                    if (obj && obj.value) {
                                        this.findFields(Gordic.Eko.HeaderForm.Fields.Realizator).gfield("setValue", { ico: obj.value.ico, cis_real: obj.value.cis_real }, false);
                                    }
                                }
                            }
                        },
                        // Realizator
                        //[Gordic.Eko.HeaderForm.Fields.Realizator]: {
                        //    options: {
                        //        disabled: this.doklad.FieldPermissions?.Realizator.value === false,
                        //    }
                        //} as Forms.FormField,
                        [Gordic.Eko.HeaderForm.Rows.Realizator]: {
                            fields: [realizator, {
                                    layout: "w-4",
                                    options: $.extend(Gordic.Prefabs.Select.ekosuus(), {
                                        name: "formUctarnaField" /* Fields.Uctarna */,
                                        dropdown: false,
                                        model: "model.ico=>value.ico; model.ucs=>value.ucs; model.uus=value.uus",
                                        flag: Gordic.Prefabs.Field.Flags.required,
                                        validators: [new Gordic.Validators.Required()],
                                        itemTemplate: "{uus:trim:encode}",
                                        disabled: true,
                                        serverFilters: {
                                            ico: that.doklad.header?.ico,
                                            ucs: that.doklad.header?.ucs,
                                            rok_od: "<= " + that.doklad.header?.rok,
                                            rok_do: ">= " + that.doklad.header?.rok,
                                            aktivita: 100,
                                            ekovfus_ixs_fun: that.globals.DatabaseParams.VazbaUctarnyNaFunkci ? that.globals.SessionParams.IxsFun : undefined,
                                        }
                                    }),
                                    widget: "gselectbox"
                                }]
                        }
                    });
                    ///////////////////////////////////////////
                    // úprava WFL/SSL komponent
                    // DetailDto.JePodana je vlastnost, kterou Martin pouziva, aby vedel zda se jedna o akci podani nebo akci jinou
                    // Pri podani nezobrazuje urcite casti detailu dokladu - vetsinou dat WFL
                    // Podstatne je stejnou hodnotu vlastnosti dodrzet i v TS.
                    // Ja budu vsude nastavovat false, aby se zobrazilo vsechno
                    //Eko.Detail.changeDetailBuilderWflForEkoDefinitions(builder, that.doklad?.header?.ac == null, ["menuAgTiskAgendDokl", "menuAgTiskZaucDokl"]);
                    Gordic.Eko.Detail.changeDetailBuilderWflForEkoDefinitions(builder, false, ["menuAgTiskAgendDokl", "menuAgTiskZaucDokl"]);
                    builder.updateDefinition("menuRunSouvDok", { parent: "menuWflCinnosti" /*, after: "menuDotcSubjekty"*/ }, GDbd.DefinitionKind.MenuBar);
                    builder.moveDefinitionAfter("menuRunSouvDok", "menuDotcSubjekty", GDbd.DefinitionKind.MenuBar);
                    // přidá šipky do statusbaru pro posun po seznamu
                    that.listControls_setup({
                        // delegát, který se spustí než se provede reload contentu. Je možné zde vyvolat closing a upozornit tak uživatele, že má např. neuložené změny.
                        beforeMove: that.closing,
                        // delegat, ktery řádek z gridu přetransformuje na dto pro zavolání this.load(dto); Může vracet promise.
                        //rowToDto: function (gridState) { return { Ixp: gridState.currentRow.data.ixp, Action: Gordic.Uct.Interface.GEAkceFormulare.Read }; },
                        // Pouzit Martinuv delegat, uvidime jestli to bude fungovat
                        rowToDto: (gridState) => {
                            return [
                                (gridState.currentRow != null ? Gordic.Eko.Utils.createBookGpc(that.gpc, gridState.currentRow.data.header?.ixp_den) : that.gpc),
                                {
                                    Ixp: gridState.currentRow.data.ixp,
                                    IxpDen: that.doklad.header?.ixp_den,
                                    NasledujiciDetail: true
                                }
                            ];
                        },
                        // template pro tooltip na šipce následující
                        nextItemTemplate: "jres:30150106", //RC 30150106 : Následující: {ixp} <br> {ac}
                        // template pro tooltip na šipce následující
                        prevItemTemplate: "jres:30150107" //RC 30150107 : Předchozí: {ixp} <br> {ac}
                    });
                }
                ;
                //#endregion
                //////////////////////////////////////////
                /**
                 * Vraceni hodnot policek pomoci asynchronniho volani
                 *   Hodnota nemusi byt v danou chvili pristupna, protoze se muze overovat na serveru atd. Proto je nutno hodnoty zjistovat asynchronne
                 */
                getMesic() {
                    return this.findFields("formMesicField" /* Fields.Mesic */).gfield("getValueAsync").then((value) => { return value && value.cislo ? parseInt(value.cislo) : -1; });
                }
                /// <summary>
                /// Filtrovani napovedy eko vety
                /// </summary>
                /// <param name="sloupec">eko sloupec</param>
                /// <param name="zdrojDat">zdroj dat napovedy (datatable)</param>
                FiltrNapovedy(sloupec, zdrojDat) {
                    debugger;
                    // cor
                    let result = [];
                    if (sloupec == "te2") {
                        zdrojDat.forEach((row) => {
                            if (this.KontrolaSlovaCor(row.code.trim(), null))
                                result.push(row);
                        });
                    }
                    // uko
                    else if (sloupec == "te4") {
                        let te2 = this.$porizovac.findFields("te2").gfield("getValue")["code"].trim();
                        for (var i = zdrojDat.length - 1; i > -1; i--) {
                            if (this.KontrolaSlovaUka(zdrojDat[i].code.trim())
                                && this.KontrolaSlovaCor(te2, zdrojDat[i]))
                                result.push(zdrojDat[i]);
                        }
                    }
                    return result;
                }
                /// <summary>
                /// Kontrola na uka vuci uka od cile
                /// </summary>
                /// <param name="Uko"></param>
                /// <returns></returns>
                KontrolaSlovaUka(Uko) {
                    // Pokud neni vyplnen manazer cilu, nic nekontroluj a vsechny jsou platne
                    if (this.doklad.ManageryCilu == null || this.doklad.ManageryCilu.length == 0)
                        return true;
                    for (var i = 0; i < this.doklad.ManageryCilu.length; i++) {
                        let radekUko = this.doklad.ManageryCilu[i];
                        // Pokud je hodnota zadana v porizovaci (Uko) rovna nekteremu z povolenych cilu, je to v poradku
                        if (radekUko.uko != null && Uko == radekUko.uko.trim()) {
                            return true;
                        }
                    }
                    return false;
                }
                KontrolaSlovaCor(Cor, radekUko) {
                    if (this.globals.DatabaseParams.AlgoritmusFiltrovaniPVS == "MO2013") {
                        // Algoritmus pro MO 2013:
                        if (Cor == null)
                            Cor = "    ";
                        let vydajovyBlok = Cor;
                        let vydajovyOkruh = vydajovyBlok.substring(4, 4 + 2);
                        if (vydajovyBlok.length > 8) {
                            vydajovyBlok = vydajovyBlok.substring(2, 2 + 1);
                            // atribut nalezeni UKO vuci COR
                            if (radekUko != null) {
                                if (radekUko["code"] == null || radekUko.code.trim() == "")
                                    return false;
                                let ukazatel = radekUko.code.trim();
                                let testovanyVydajovyOkruh;
                                // test pro jistotu na delku uka 
                                if (ukazatel.length > 8)
                                    testovanyVydajovyOkruh = ukazatel.substring(2, 2 + 5);
                                else
                                    return false;
                                if (vydajovyBlok == ukazatel.substring(1, 1 + 1) && (vydajovyOkruh == testovanyVydajovyOkruh.substring(0, 2) || testovanyVydajovyOkruh == "99990")) {
                                    return true;
                                }
                            }
                            else {
                                // Pokud neni vyplnen manazer cilu, nic nekontroluj a vsechny jsou platne
                                if (this.doklad.ManageryCilu == null || this.doklad.ManageryCilu.length == 0)
                                    return true;
                                for (var i = 0; i < this.doklad.ManageryCilu.length; i++) {
                                    let RadekUko = this.doklad.ManageryCilu[i];
                                    if (RadekUko.uko == null || RadekUko.uko.trim() == "")
                                        continue;
                                    let ukazatel = RadekUko.uko.trim();
                                    let testovanyVydajovyOkruh = "";
                                    // test pro jistotu na delku uka
                                    if (ukazatel.length > 8)
                                        testovanyVydajovyOkruh = ukazatel.substring(2, 2 + 5);
                                    else
                                        continue;
                                    if (vydajovyBlok == ukazatel.substring(1, 1 + 1) && (vydajovyOkruh == testovanyVydajovyOkruh.substring(0, 2) || testovanyVydajovyOkruh == "99990")) {
                                        return true;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                    return true;
                }
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                //#region Udalost pred uzavrenim contentu detailu formulare
                /**
                 * Test, zda je mozne uzavrit okno
                 * Je vyvolana vzdy, kdyz se zavira Content. Mohu ji vyvolat nebo je volana automaticky. Vzdy vraci promise
                 *
                 * @returns { JQueryPromise } - resolve = je možné zavřít, reject = není možné zavřít
                 * */
                closing() {
                    let that = this;
                    // Vytvorim si odlozeny objekt 
                    let deferred = $.Deferred();
                    // Nejprve zjisti, zda posledni akce byla aktivni operace
                    if ((that.editHeader && that.findForms().gform("hasChanged")) || that.editRows) {
                        Gordic.Eko.Detail.messageBoxUnsavedData(that) // Zobrazeni informaci hlasky 
                            .on("no", function () { deferred.resolve(); }) // Nechci zmenena data ulozit
                            .on("yes", function () {
                            //// Vytvořím si novou třídu s akcemi, jako parametr zasilam content
                            //var actions = new Gordic.Roz.WebClient.GAkceDokladu(that);
                            // Evidence
                            // Vytvorim si vstupni DTO
                            var request = {
                                data: {
                                    ixp: that.doklad.ixp,
                                    dat_zmena: that.doklad.header?.dat_zmena,
                                    action: 4 /* Gordic.Uct.Interface.GEAkceFormulare.Evidence */
                                }
                            };
                            // Pouziju validaci formulare
                            if (!that.findForms().gform("isValid"))
                                return;
                            // Nyni sesbirej data dokladu do vstupni hlavicky 
                            that.findFields().gfield("model", "collect", request.data);
                            // Nove sbiram i data rozsireneho profilu (popisne vlastnosti)
                            request.data.vlastnosti = Gordic.PopisneVlastnosti.collectValues(that);
                            //// a zavolam vykonnou metodu
                            //actions.EvidenceDokladu(request);
                        })
                            .on("cancel", function () { deferred.reject(); }); // stisknuto "storno", nechci formular uzavrit
                    }
                    else
                        deferred.resolve(); // Data nebyla zmenena, je mozno uzavrit
                    // A vracim promise s tim
                    return deferred.promise();
                }
                //#endregion Udalost pred uzavrenim contentu detailu formulare
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                /// <summary>
                /// Znovunacteni detailu dokladu
                /// </summary>
                /// <remarks>Tvagenknecht, 3.3.2017.</remarks>
                /// <returns>.</returns>
                RefreshDetail(editaceHlevicky = false) {
                    let that = this;
                    that.editRows = false;
                    that.newRowStart = false;
                    //content.showDocument = false;
                    //var def = $.Deferred();
                    // znepristupneni vsech akci
                    for (var akce in that.actions) {
                        // debugger;
                        that.actions[akce].update({ enabled: false });
                    }
                    //let oldValue = content.ReloadSeznam;
                    // Toto je zrejme aktualne otevrena polozka
                    let OldTab = that.element.find(".gtabmanager").gtabmanager("getActive");
                    if (editaceHlevicky)
                        that.editHeader = true;
                    else
                        that.editHeader = false;
                    return that.load( /*{ showDocument:false }*/)
                        .then(function () {
                        //that.ReloadSeznam = oldValue;
                        //debugger;
                        if (OldTab !== null)
                            that.SwitchTab(OldTab);
                        return; //def.resolve();
                    });
                    //return def.promise();
                }
                /**
                 * Aktualizace dat detailu podle modelu a nastaveni stavu prvku
                 * @returns
                 * */
                AktualizaceDokladu() {
                    // Nejprve naplnim vsechna policka hodnotami
                    this.findFields() // Najde vsechna pole formulare ve vsech sekcich
                        // Vyplneni polozek na dokladu - metoda modelu apply
                        // Poslednim objektem je ModelOptions. Tento option spolu s model tvoří základní konfigurační celek systému propojení formuláře a modelu - https://xwiki.gordic.cz/NET/widgets/gfield#HmodelOptions
                        // initialValues (bool, default=false) (operace: apply) - zda se při nastavovani hodnot z modelu má použít metoda setValue() nebo setInitial(). 
                        // setFlags(object, default = null) (operace: apply) - vlastní rozšíření flags, se kterými budou volána všechna setValue volaná z modelu
                        // setFlags: { triggerChange: false } - pri plneni policek metodou nespoustet udalost change nad jednotlivymi policky
                        .gfield("model", "apply", this.doklad.header, { initialValues: true, setFlags: { triggerChange: false } })
                        .gfield("model", "validators", this.validators);
                    // Vyplneni popisnych vlastnosti - pokud jsou vyplneny
                    if (this.doklad.vlastnosti)
                        Gordic.PopisneVlastnosti.applyValues(this, this.doklad.vlastnosti);
                    // Nastaveni pristupnosti poli
                    this.setEnableFields();
                    // a pristupnost akci
                    this.SetEnableActions(this.doklad.ActionPermissions);
                    this.updateStatusBar(); // Zobraz nazvy stavu ve status baru
                }
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                //#region Nastaveni pristupnosti policek
                /**
                 * Nastaveni pristupnosti policek dle stavu a proveden akce
                 * */
                setEnableFields() {
                    const that = this;
                    //private setEnableFields(action: Gordic.Uct.Interface.GEAkceFormulare): void {
                    //    const isPodaniNeboOprava = action === Gordic.Uct.Interface.GEAkceFormulare.Podani || action === Gordic.Uct.Interface.GEAkceFormulare.Oprava;
                    //    const isDokladBezZapisu = this.doklad.header?.eko_akt == 100 && this.doklad.header?.s_zau === Gordic.Eko.Interface.GEStavyDokladu.Nezauctovano;
                    //    const isDokladNeschvaleny = this.doklad.header?.eko_akt == 100 && this.doklad.header?.s_zau! <= Gordic.Eko.Interface.GEStavyDokladu.Navrh;
                    //    const isDokladSchvaleny = this.doklad.header?.eko_akt == 100 && this.doklad.header?.s_zau === Gordic.Eko.Interface.GEStavyDokladu.Schvaleno;
                    //    const isDokladUzavreny = this.doklad.header?.eko_akt == 100 && this.doklad.header?.s_zau === Gordic.Eko.Interface.GEStavyDokladu.Uzavreno;
                    //    const isRezimProvozuZakladni = this.globals.DatabaseParams?.RezimProvozu === Gordic.Uct.Interface.RezimProvozuEnum.zakladni;
                    //    const isRezimProvozuRealizator = this.globals.DatabaseParams?.RezimProvozu === Gordic.Uct.Interface.RezimProvozuEnum.realizator;
                    //    const isPovolenaZmenaUctarnyPoSchvaleni = this.globals.DatabaseParams?.PovolenaZmenaUctarnyPoSchvaleni;
                    //    const zpracovatManazeryCilu = this.globals.DatabaseParams?.ZpracovatManazeryCilu;
                    //    // Z hlavicky mohu upravovat typ dokladu, kompetent a realizator
                    //    this.findFields(Gordic.Eko.HeaderForm.Fields.TypDokladu).gfield("option", "disabled", !(isPodaniNeboOprava && isDokladBezZapisu));
                    //    this.findFields(Gordic.Eko.HeaderForm.Fields.Kompetent).gfield("option", "disabled", !(isPodaniNeboOprava && isDokladNeschvaleny && (isRezimProvozuZakladni || isRezimProvozuRealizator)));
                    //    this.findFields(Gordic.Eko.HeaderForm.Fields.Realizator).gfield("option", "disabled", !(isPodaniNeboOprava && isDokladNeschvaleny && isRezimProvozuZakladni));
                    //    // Polozky dokladu
                    //    this.findFields(Fields.Mesic).gfield("option", "disabled", !(isPodaniNeboOprava && isDokladNeschvaleny));
                    //    this.findFields(Fields.Den).gfield("option", "disabled", !(isPodaniNeboOprava && isDokladNeschvaleny));
                    //    this.findFields(Fields.Drd).gfield("option", "disabled", !(isPodaniNeboOprava && isDokladNeschvaleny));
                    //    this.findFields(Fields.CisloDokladu).gfield("option", "disabled", !(isPodaniNeboOprava && isDokladNeschvaleny));
                    //    this.findFields(Fields.ManagerCile).gfield("option", "disabled", !(isPodaniNeboOprava && isDokladNeschvaleny && zpracovatManazeryCilu));
                    //    this.findFields(Fields.Uctarna).gfield("option", "disabled", !(isPodaniNeboOprava && (isDokladNeschvaleny || (isDokladSchvaleny && isPovolenaZmenaUctarnyPoSchvaleni))));
                    //    this.findFields(Fields.Castka).gfield("option", "disabled", !(isPodaniNeboOprava && isDokladNeschvaleny));
                    //    this.findFields(Fields.Popis).gfield("option", "disabled", !(isPodaniNeboOprava && !isDokladUzavreny));
                    //    // Povoleni editace zalozky WFL dokument
                    //    (this as any).setEditmodeEkoProfil(!isPodaniNeboOprava);
                    //    // Povoleni editace zalozky popisnych vlastnosti
                    //    this.descProps_setup({ readOnly: isPodaniNeboOprava });
                    // Z hlavicky mohu upravovat typ dokladu, kompetent a realizator
                    this.findFields(Gordic.Eko.HeaderForm.Fields.TypDokladu).gfield("option", "disabled", !that.doklad.FieldPermissions?.TypDokladu.value);
                    this.findFields(Gordic.Eko.HeaderForm.Fields.Kompetent).gfield("option", "disabled", !that.doklad.FieldPermissions?.Kompetent.value);
                    this.findFields(Gordic.Eko.HeaderForm.Fields.Realizator).gfield("option", "disabled", !that.doklad.FieldPermissions?.Realizator.value);
                    // Polozky dokladu
                    this.findFields("formMesicField" /* Fields.Mesic */).gfield("option", "disabled", !that.doklad.FieldPermissions?.Mesic.value);
                    this.findFields("formDenField" /* Fields.Den */).gfield("option", "disabled", !that.doklad.FieldPermissions?.Den.value);
                    this.findFields("formDrdField" /* Fields.Drd */).gfield("option", "disabled", !that.doklad.FieldPermissions?.DruhDokladu.value);
                    this.findFields("formCisloDokladuField" /* Fields.CisloDokladu */).gfield("option", "disabled", !that.doklad.FieldPermissions?.CisloDokladu.value);
                    this.findFields("formManagerCileField" /* Fields.ManagerCile */).gfield("option", "disabled", !that.doklad.FieldPermissions?.ManagerCile.value);
                    this.findFields("formUctarnaField" /* Fields.Uctarna */).gfield("option", "disabled", !that.doklad.FieldPermissions?.Uctarna.value);
                    this.findFields("formCastkaField" /* Fields.Castka */).gfield("option", "disabled", !that.doklad.FieldPermissions?.Castka.value);
                    this.findFields("formLongPopisField" /* Fields.Popis */).gfield("option", "disabled", !that.doklad.FieldPermissions?.Popis.value);
                    // Povoleni editace zalozky WFL dokument
                    this.setEditmodeEkoProfil(that.editHeader);
                    // Povoleni editace zalozky popisnych vlastnosti
                    this.descProps_setup({ readOnly: !that.editHeader });
                }
                //#endregion Nastaveni pristupnosti policek
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                /**
                 * Pocet zapisu
                 *
                 */
                PocetZapisu() {
                    let pocetZapisu = 0;
                    let grid = this.getGrid();
                    if (grid != null)
                        pocetZapisu = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid);
                    return pocetZapisu;
                }
                /**
                 * Nastaveni pristupnosti akci dle provadene akce - default jsou vsechny akce disable a nastavuji pouze ta se kterymi mohu pracovat
                 *
                 * @param actionPermissions seznam pristupovych prav pro jednotlive akce
                 * */
                SetEnableActions(actionPermissions) {
                    //let grid = this.getGrid();
                    let pocetZapisu = this.PocetZapisu();
                    //if (grid != null)
                    //    pocetZapisu = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid);
                    // Akce dokladu
                    this.actions["actRozPodani" /* Actions.Podani */]?.updatePermission(actionPermissions?.Podani);
                    this.actions["actRozEvidence" /* Actions.Evidence */]?.updatePermission(actionPermissions?.Evidence);
                    this.actions["actRozOpravaHlavicky" /* Actions.OpravaHlavicky */]?.updatePermission(actionPermissions?.Oprava);
                    this.actions["actRozZrusitOpravaHlavicky" /* Actions.ZrusitOpravaHlavicky */]?.updatePermission(actionPermissions?.Zrusit);
                    this.actions["actRozZapisy" /* Actions.Zapisy */]?.updatePermission(actionPermissions?.Vazba);
                    this.actions["actRozSchvaleni" /* Actions.Schvaleni */]?.updatePermission(actionPermissions?.Schvaleni);
                    this.actions["actRozZrusitSchvaleni" /* Actions.ZrusitSchvaleni */]?.updatePermission(actionPermissions?.Odschvaleni);
                    //this.actions["actValidace"]?.updatePermission(this.doklad.ActionPermissions?.Validace);
                    //this.actions["actZrusitValidace"]?.updatePermission(this.doklad.ActionPermissions?.Odvalidace);
                    this.actions["actRozOdeslaniSP" /* Actions.OdeslaniSP */]?.updatePermission(this.doklad.ActionPermissions?.OdeslaniSP);
                    this.actions["actRozRealizace" /* Actions.Realizace */]?.updatePermission(actionPermissions?.Realizace);
                    //this.actions["actPotvrzeni"]?.updatePermission(this.doklad.ActionPermissions?.Potvrzeni);
                    this.actions["actRozStorno" /* Actions.Storno */]?.updatePermission(actionPermissions?.Storno);
                    this.actions["actRozZrusitStorno" /* Actions.ZrusitStorno */]?.updatePermission(actionPermissions?.Aktivace);
                    this.actions["actRozUzavreni" /* Actions.Uzavreni */]?.updatePermission(actionPermissions?.Uzavrit);
                    this.actions["actRozPreevidence" /* Actions.Preevidence */]?.updatePermission(actionPermissions?.Preevidence);
                    this.actions["actRozPredani" /* Actions.Predani */]?.updatePermission(actionPermissions?.Predat);
                    this.actions["actRozPrevzeti" /* Actions.Prevzeti */]?.updatePermission(actionPermissions?.Prevzit);
                    this.actions["actRozPrideleni" /* Actions.Prideleni */]?.updatePermission(actionPermissions?.Pridelit);
                    this.actions["actRozVraceniDoWfl" /* Actions.VraceniDoWfl */]?.updatePermission(actionPermissions?.VraceniDoWfl);
                    let tooltip = "jres:30250355"; //RC 30250355 : Probíhá editace hlavičky
                    if (this.isEditMode()) {
                        this.UpdateAction([this.actions["actRozPodani" /* Actions.Podani */],
                            this.actions["actRozOpravaHlavicky" /* Actions.OpravaHlavicky */],
                            this.actions["actRozSchvaleni" /* Actions.Schvaleni */],
                            this.actions["actRozZrusitSchvaleni" /* Actions.ZrusitSchvaleni */],
                            this.actions["actRozPrideleni" /* Actions.Prideleni */],
                            this.actions["actRozVraceniDoWfl" /* Actions.VraceniDoWfl */],
                            this.actions["actRozPrevzeti" /* Actions.Prevzeti */],
                            this.actions["actRozPredani" /* Actions.Predani */],
                            this.actions["actRozPreevidence" /* Actions.Preevidence */],
                            this.actions["actRozUzavreni" /* Actions.Uzavreni */],
                            this.actions["actRozZrusitStorno" /* Actions.ZrusitStorno */],
                            this.actions["actRozStorno" /* Actions.Storno */],
                            this.actions["actRozRealizace" /* Actions.Realizace */],
                        ], { enabled: false, tooltip: tooltip });
                    }
                    else if (!this.editHeader) {
                        this.UpdateAction([this.actions["actRozEvidence" /* Actions.Evidence */]], { enabled: false, tooltip: tooltip });
                    }
                    // pristupy k zapisum
                    tooltip = "jres:30250354"; //RC 30250354 : Probíhá editace řádku
                    if (this.editRows) {
                        this.actions["actRozPolozkyUlozit" /* Actions.PorizovacUlozit */]?.updatePermission(actionPermissions?.UlozitPorizovac);
                        this.actions["actRozPolozkyZrusit" /* Actions.PorizovacZrusit */]?.updatePermission(actionPermissions?.ZrusitPorizovac);
                        this.UpdateAction([
                            this.actions["actRozPolozkyNovyRadek" /* Actions.PorizovacNovy */],
                            this.actions["actRozPolozkyOpravit" /* Actions.PorizovacOpravit */],
                            this.actions["actRozPolozkyOdstranit" /* Actions.PorizovacOdstranit */],
                            this.actions["actRozPolozkyPredkontace" /* Actions.PorizovacPredkontace */],
                            this.actions["acttRozPolozkyImportZeSchranky" /* Actions.PorizovacImportSchranka */],
                            this.actions["acttRozPolozkyImportZeSouboru" /* Actions.PorizovacImportSoubor */],
                            this.actions["actPredkontaceOzn" /* Actions.PorizovacPrekontaceVytvoritOznacene */],
                            this.actions["actPredkontaceVsech" /* Actions.PorizovacPrekontaceVytvoritVsech */]
                        ], { enabled: false, tooltip: tooltip });
                    }
                    else {
                        //tooltip = "jres:30250356"; //RC 30250356 : Pořizovač není v režimu pořizování
                        if (this.changeProfile) {
                            this.UpdateAction([
                                this.actions["actRozPolozkyNovyRadek" /* Actions.PorizovacNovy */],
                                this.actions["actRozPolozkyOpravit" /* Actions.PorizovacOpravit */],
                                this.actions["actRozPolozkyOdstranit" /* Actions.PorizovacOdstranit */],
                                this.actions["actRozPolozkyPredkontace" /* Actions.PorizovacPredkontace */],
                                this.actions["acttRozPolozkyImportZeSchranky" /* Actions.PorizovacImportSchranka */],
                                this.actions["acttRozPolozkyImportZeSouboru" /* Actions.PorizovacImportSoubor */],
                                this.actions["actPredkontaceOzn" /* Actions.PorizovacPrekontaceVytvoritOznacene */],
                                this.actions["actPredkontaceVsech" /* Actions.PorizovacPrekontaceVytvoritVsech */]
                            ], { enabled: false, tooltip: "jres:30250370" } //RC 30250370 : Změna profilu
                            );
                        }
                        else if (this.preFillInProgress)
                            this.UpdateAction([
                                this.actions["actRozPolozkyNovyRadek" /* Actions.PorizovacNovy */],
                                this.actions["actRozPolozkyOpravit" /* Actions.PorizovacOpravit */],
                                this.actions["actRozPolozkyOdstranit" /* Actions.PorizovacOdstranit */],
                                this.actions["actRozPolozkyPredkontace" /* Actions.PorizovacPredkontace */],
                                this.actions["acttRozPolozkyImportZeSchranky" /* Actions.PorizovacImportSchranka */],
                                this.actions["acttRozPolozkyImportZeSouboru" /* Actions.PorizovacImportSoubor */],
                                this.actions["actPredkontaceOzn" /* Actions.PorizovacPrekontaceVytvoritOznacene */],
                                this.actions["actPredkontaceVsech" /* Actions.PorizovacPrekontaceVytvoritVsech */]
                            ], { enabled: false, tooltip: "jres:30250459" } //RC 30250459 : Probíhá předkontace
                            );
                        else {
                            this.actions["actRozPolozkyNovyRadek" /* Actions.PorizovacNovy */]?.updatePermission(actionPermissions?.NovyPorizovac);
                            this.actions["actRozPolozkyOpravit" /* Actions.PorizovacOpravit */]?.updatePermission(actionPermissions?.OpravitPorizovac);
                            this.actions["actRozPolozkyOdstranit" /* Actions.PorizovacOdstranit */]?.updatePermission(actionPermissions?.OdstranitPorizovac);
                            this.actions["actRozPolozkyPredkontace" /* Actions.PorizovacPredkontace */]?.updatePermission(actionPermissions?.PredkontacePorizovac);
                            this.actions["acttRozPolozkyImportZeSchranky" /* Actions.PorizovacImportSchranka */]?.updatePermission(actionPermissions?.ImportZapisuPorizovac);
                            this.actions["acttRozPolozkyImportZeSouboru" /* Actions.PorizovacImportSoubor */]?.updatePermission(actionPermissions?.ImportZapisuPorizovac);
                            this.actions["actPredkontaceOzn" /* Actions.PorizovacPrekontaceVytvoritOznacene */]?.updatePermission(actionPermissions?.VytvoritPredkontaciPorizovac);
                            this.actions["actPredkontaceVsech" /* Actions.PorizovacPrekontaceVytvoritVsech */]?.updatePermission(actionPermissions?.VytvoritPredkontaciPorizovac);
                        }
                        if (pocetZapisu == 0) {
                            this.UpdateAction([this.actions["actRozPolozkyOpravit" /* Actions.PorizovacOpravit */], this.actions["actRozPolozkyOdstranit" /* Actions.PorizovacOdstranit */]], {
                                enabled: false, tooltip: "jres:30250460" //RC 30250460 : Není žádný rozpočtový zápis
                            });
                        }
                        this.UpdateAction([this.actions["actRozPolozkyUlozit" /* Actions.PorizovacUlozit */], this.actions["actRozPolozkyZrusit" /* Actions.PorizovacZrusit */]], {
                            enabled: false, tooltip: "jres:30250356"
                        }); //RC 30250356 : Pořizovač není v režimu pořizování
                        //this.UpdateAction(this.actions[Actions.PorizovacZrusit]!, { enabled: false, tooltip: tooltip });
                    }
                }
                /**
                 * Aktualizace akce
                 *
                 * @param akce
                 */
                UpdateAction(akce, options) {
                    //instanceof  
                    //if (typeof options.caption === "undefined" || options.caption == null) {
                    akce.forEach((item) => {
                        item.update({
                            enabled: options.enabled ? options.enabled : false,
                            checked: options.checked ? options.checked : false,
                            tooltip: options.tooltip ? options.tooltip : "",
                            visible: options.visible ? options.visible : true,
                            caption: options.caption ? options.caption : undefined,
                            icon: options.icon ? options.icon : undefined,
                        });
                    });
                }
                /**
                 * Je doklad v editaci
                 * @returns
                 */
                isEditMode() {
                    //if (typeof content.EditaceHlavicky !== "undefined" && typeof content.EditaceZapisu === "undefined")
                    return (this.editHeader) || this.editRows;
                    //else
                    //return false;
                }
                //#endregion
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                //#region Akce detailu
                /**
                 * Provedeni akce po stisknuti tlacitka
                 *
                 * Zavolani akce nad dokladem
                 * Tato funkce se vola z action, aby se funkce mohla volat rekurzivne
                 * */
                executeAction(request) {
                    const that = this; // this je zde content
                    // Navratovy promise cele akce
                    // Tato metoda musi byt asynchronni, ceka na reakci uzivatele
                    const promise = this.checkEditState(request) // Kontrola editacniho stavu.
                        // Zobrazeni formulare pred akci (v pripade potreby)
                        // Opet se jedna o asynchronni metodu
                        .then(() => {
                        // Tato metoda musi byt asynchronni, ceka na reakci uzivatele
                        // Navratovou hodnotou je request doplneny daty
                        return this.showFormForAction(request);
                    })
                        // Doplneni dat do requestu, pokud je to potreba
                        // Toto se vyridi synchronne, na nic se neceka
                        .then((request) => {
                        console.log(request);
                        return this.prepareRequest(request);
                    })
                        // Zobrazeni informacni hlasky o provadene akci - synchronni operace
                        .then((request) => {
                        this.ShowOperationText(request.action);
                        return request;
                    })
                        // Odeslani pozadavku na server
                        // Toto je pochopitelne asynchronni, ceka se na volani serveru
                        .then((request) => {
                        console.log(request);
                        // Odesli pozadavek na server
                        return this.sendRequestToServer(request);
                    })
                        // 30.09.25 KK - zpracovani odpovedi preneseno do volani akce
                        //// Zpracovani odpovedi
                        //// Musi byt asynchronni protoze budu volat nove zobrazeni contentu
                        //.then((response) => {
                        //    console.log(response);
                        //    return this.processResponseFromServer(response);
                        //})
                        // Zpracovani chyby, pripadne volani metody rekurzivne
                        .catch((error) => {
                        return this.processErrorFromServer(error, request);
                    })
                        // Ukonceni operace
                        // .always automaticky neprijima hodnotu jako parametr a automaticky preposila dal
                        .always(() => {
                        that.endOperation?.();
                    });
                    return promise;
                }
                /**
                 * Kontrola editacniho stavu pred provedenim akce
                 * @param typAkce - typ provadene akce
                 * @returns Promise, ktery se vyresi, pokud uzivatel potvrdi zruseni editace
                 * @description Asynchronni metoda, protoze muze cekat na reakci uzivatele - i kdyz asynchronni volani je uvnitr volane metody
                 */
                checkEditState(request) {
                    // Vytvor si novy vyreseny promise
                    // Je to z duvodu, protoze nemusi byt splnena ani jedna podminka a pak by metoda nevratila promise
                    // Proto vytvorim uz rovnou vyreseny, aby pripadna volajici metoda necekala
                    let promise = $.Deferred().resolve().promise();
                    // Pri evidenci a vkladani to nesmim kontrolovat, protoze jsem v editacnim rezimu
                    //if ((this.editHeader) && request.action != Gordic.Uct.Interface.GEAkceFormulare.Evidence) {
                    if ((this.editHeader)) {
                        promise = promise.then(() => this.checkHeaderEditingAsync());
                    }
                    if (this.editRows) {
                        promise = promise.then(() => this.checkRowsEditingAsync());
                    }
                    return promise;
                }
                /**
                 * Kontrola editace hlavičky
                 * @returns Promise, ktery se vyresi, pokud uzivatel potvrdi zruseni editace
                 */
                checkHeaderEditingAsync() {
                    // Vytvoření dialogu
                    const $dialog = this.dialogs.confirm("jres:30150151"); //RC 30150151 : Probíhá editace dokladu, pořízená data budou ztracena. Přejete si pokračovat ?
                    // Převedení dialogu na promise a vraceni promise
                    return $dialog.createDialogPromise("yes")
                        .then(() => {
                        // Uživatel odpověděl "yes" - pokračujeme. Neocekava se odpoved
                        return;
                        //})
                        //.catch(() => {
                        //    // Uživatel zrušil nebo odpověděl jinak
                        //    throw new GError("user cancel");
                    });
                }
                /**
                 * Kontrola editace řádků
                 * @returns Promise, ktery se vyresi, pokud uzivatel potvrdi zruseni editace
                 * */
                checkRowsEditingAsync() {
                    const that = this;
                    // Dialog pro potvrzení zrušení editace řádků
                    const $dialog = this.dialogs.confirm("jres:30150152"); //RC 30150152 : Probíhá editace zápisů, pořízená data budou ztracena. Přejete si pokračovat ?
                    return $dialog.createDialogPromise("yes")
                        .then(() => {
                        // Uživatel potvrdil - zrušíme editaci
                        that.$porizovac.ggridroweditor("cancel");
                        return;
                        //})
                        //.catch(() => {
                        //    throw new GError("user cancel");
                    });
                }
                /**
                 * Univerzální metoda pro zobrazení formuláře před akcí nebo při server error
                 * @param request
                 * @description Metoda nevytvari naprimo objekt deferred, ten vytvari vnitrni az vnitrni metody. Z nich je potreba pote ten promise vratit
                 */
                showFormForAction(request) {
                    const that = this;
                    // Pokud volam akci rekurzivne, jiz vsechna data mam a nic nezobrazuji
                    if (request.member !== null && request.member !== undefined) {
                        return $.Deferred().resolve(request).promise();
                    }
                    ;
                    // Rozhodnu se dle spustene akce
                    switch (request.action) {
                        case 3 /* Gordic.Uct.Interface.GEAkceFormulare.Podani */:
                            // Zjisti si lokalni nastaveni, zda zobrazit formular pro zadavani pidu (0-ne, 1-ano)
                            const showDialog = that.globalSettings?.get("Global.Eko.AppSettings.PidSettingsForm.RezimZadavaniPidu");
                            // Pokud nema povoleno generovat pid, vzdy musim okno zobrazit nehlede na lokalni nastaveni. Pokud ma nastaveno zobrazeni, zobraz mu ho
                            if (!this.globals.DatabaseParams?.PovolitGenerovaniPiduDokladu || showDialog === "1") {
                                return this.dialogPodani()
                                    .then((data) => {
                                    // Modifikuje původní request objekt
                                    Object.assign(request, { ixp: data.Ixp });
                                    return request;
                                })
                                    .catch(() => {
                                    throw new GError("jres:30150102"); // RC 30150102 : Akce byla stornována uživatelem
                                });
                            }
                            else {
                                // Pokud ma povoleno generovani a nezobrazil se dialog, vynuluj mu ixp
                                Object.assign(request, { ixp: null });
                                return $.Deferred().resolve(request).promise();
                            }
                        case 16 /* Gordic.Uct.Interface.GEAkceFormulare.Storno */:
                            // Musim vratit promise, protoze se ceka na odpoved uzivatele
                            return this.dialogDuvod("jres:30150154") //RC 30150154 : Zadejte důvod storna
                                .then((text) => {
                                // Modifikuje původní request objekt
                                Object.assign(request, { duvod: text });
                                return request;
                            })
                                .catch(() => {
                                throw new GError("jres:30150102"); // RC 30150102 : Akce byla stornována uživatelem
                            });
                        case 17 /* Gordic.Uct.Interface.GEAkceFormulare.Aktivace */:
                            return this.dialogDuvod("jres:30150153") //RC 30150153 : Zadejte důvod aktivace
                                .then((text) => {
                                // Modifikuje původní request objekt
                                Object.assign(request, { duvod: text });
                                return request;
                            })
                                .catch(() => {
                                throw new GError("jres:30150102"); // RC 30150102 : Akce byla stornována uživatelem
                            });
                        case 26 /* Gordic.Uct.Interface.GEAkceFormulare.VraceniDoWfl */:
                            return this.dialogDuvod("jres:30150158") //RC 30150158 : Zadejte důvod vrácení do WFL
                                .then((text) => {
                                // Modifikuje původní request objekt
                                Object.assign(request, { duvod: text });
                                return request;
                            })
                                .catch(() => {
                                throw new GError("jres:30150102"); // RC 30150102 : Akce byla stornována uživatelem
                            });
                        case 21 /* Gordic.Uct.Interface.GEAkceFormulare.Predani */:
                            return this.dialogPredani()
                                .then((data) => {
                                // Modifikuje původní request objekt
                                Object.assign(request, {
                                    ixs_fun_akt: data.ixs_fun_akt,
                                    ixs_ref: data.ixs_ref,
                                    ixs_fun_vyriz: data.ixs_fun_vyriz,
                                    cis_real: data.cis_real,
                                    duvod: data.duvod,
                                    ixp_den: that.globals.EkoParams?.IxpDen,
                                });
                                return request;
                            })
                                .catch(() => {
                                throw new GError("jres:30150102"); // RC 30150102 : Akce byla stornována uživatelem
                            });
                        case 23 /* Gordic.Uct.Interface.GEAkceFormulare.Preevidence */:
                            return this.dialogPreevidovani()
                                .then((data) => {
                                // Modifikuje původní request objekt
                                Object.assign(request, {
                                    duvod: data.duvod,
                                    ixp_den: data.ixp_den,
                                    ixs_fun_akt: data.ixs_fun_akt,
                                    ixs_ref: data.ixs_ref,
                                    cis_real: data.cis_real,
                                    ixs_fun_vyriz: data.ixs_fun_vyriz,
                                    ixs_su: data.ixs_su,
                                    subrada: data.subrada
                                });
                                return request;
                            })
                                .catch(() => {
                                throw new GError("jres:30150102"); // RC 30150102 : Akce byla stornována uživatelem
                            });
                        case 24 /* Gordic.Uct.Interface.GEAkceFormulare.Prideleni */:
                            return this.dialogPrideleni()
                                .then((data) => {
                                // Modifikuje původní request objekt
                                Object.assign(request, {
                                    ixs_fun_akt: data.ixs_fun_akt,
                                    ixs_su: data.ixs_su,
                                    duvod: data.duvod,
                                });
                                return request;
                            })
                                .catch(() => {
                                throw new GError("jres:30150102"); // RC 30150102 : Akce byla stornována uživatelem
                            });
                        case 32 /* Gordic.Uct.Interface.GEAkceFormulare.PorizovacOpravit */: { // uzavreni case do bloku umozni pouziti selectedRows uvnitr bloku tohoto i dalsiho
                            // Nacti si vybrane radky
                            let selectedRows = Gordic.Eko.Grid.checkedRows(that.$porizovac);
                            // Pokud neni vybrany jeden konkterni zapis, ukonci to
                            if (!selectedRows || selectedRows?.length != 1)
                                return $.Deferred().reject(new GError("jres:30250372")); //RC 30250372 : Nevybrány žádné zápisy
                            else
                                // Tady se nezobrazi zadny formular, proto musim vratit vyreseny promise
                                return $.Deferred().resolve(request).promise();
                        }
                        case 33 /* Gordic.Uct.Interface.GEAkceFormulare.PorizovacOdstranit */: { // uzavreni case do bloku umozni pouziti selectedRows uvnitr bloku tohoto i predchoziho
                            // Nacti si vybrane radky
                            let selectedRows = Gordic.Eko.Grid.checkedRows(that.$porizovac);
                            // Pokud neni vybrany zadny zapis pro smazani, ukonci zpracovani chybou (osetreno undefined hodnota z metody)
                            if (!selectedRows || selectedRows?.length == 0) {
                                return $.Deferred().reject(new GError("jres:30250372")); //RC 30250372 : Nevybrány žádné zápisy
                            }
                            else {
                                return this.dialogs.confirm("jres:30150166".format(selectedRows?.length)) //RC 30150166 : Bude odstraněno řádků: {0}
                                    .createDialogPromise("yes")
                                    .then(() => {
                                    return request;
                                })
                                    .catch(() => {
                                    throw new GError("jres:30150102"); // RC 30150102 : Akce byla stornována uživatelem
                                });
                            }
                            ;
                        }
                        default:
                            // Tady se nezobrazi zadny formular, proto musim vratit vyreseny promise
                            return $.Deferred().resolve(request).promise();
                    }
                }
                /**
                 * Zobrazeni informacniho textu dle proveden operace
                 * @param typAkce Typ akce
                 * */
                ShowOperationText(typAkce) {
                    let infoText = "";
                    switch (typAkce) {
                        case 3 /* Gordic.Uct.Interface.GEAkceFormulare.Podani */:
                            infoText = "jres:30150072"; //RC 30150072 : Probíhá podání dokladu
                            break;
                        case 4 /* Gordic.Uct.Interface.GEAkceFormulare.Evidence */:
                            infoText = "jres:30150074"; //RC 30150074 : Probíhá evidence dokladu
                            break;
                        case 14 /* Gordic.Uct.Interface.GEAkceFormulare.Oprava */:
                            infoText = "jres:30150082"; //RC 30150082 : Probíhá oprava hlavičky dokladu
                            break;
                        case 15 /* Gordic.Uct.Interface.GEAkceFormulare.Zrusit */:
                            infoText = "Probíhá zrušení opravy hlavičky";
                            break;
                        case 7 /* Gordic.Uct.Interface.GEAkceFormulare.Schvaleni */:
                            infoText = "jres:30150133"; //RC 30150133 : Probíhá schválení dokladu
                            break;
                        case 8 /* Gordic.Uct.Interface.GEAkceFormulare.Odschvaleni */:
                            infoText = "jres:30150135"; //RC 30150135 : Probíhá zrušení schválení dokladu
                            break;
                        case 13 /* Gordic.Uct.Interface.GEAkceFormulare.Realizace */:
                            infoText = "jres:30150141"; //RC 30150141 : Probíhá realizace dokladu
                            break;
                        case 16 /* Gordic.Uct.Interface.GEAkceFormulare.Storno */:
                            infoText = "jres:30150097"; //RC 30150097 : Probíhá storno dokladu
                            break;
                        case 17 /* Gordic.Uct.Interface.GEAkceFormulare.Aktivace */:
                            infoText = "jres:30150114"; //RC 30150114 : Probíhá aktivace dokladu
                            break;
                        case 18 /* Gordic.Uct.Interface.GEAkceFormulare.Uzavreni */:
                            infoText = "jres:30150155"; //RC 30150155 : Probíhá uzavření dokladu
                            break;
                        case 23 /* Gordic.Uct.Interface.GEAkceFormulare.Preevidence */:
                            infoText = "jres:30150119"; //RC 30150119 : Probíhá předání dokladu
                            break;
                        case 21 /* Gordic.Uct.Interface.GEAkceFormulare.Predani */:
                            infoText = "jres:30150119"; //RC 30150119 : Probíhá předání dokladu
                            break;
                        case 22 /* Gordic.Uct.Interface.GEAkceFormulare.Prevzeti */:
                            infoText = "jres:30150159"; //RC 30150159 : Probíhá převzetí dokladu
                            break;
                        case 24 /* Gordic.Uct.Interface.GEAkceFormulare.Prideleni */:
                            infoText = "jres:30150160"; //RC 30150160 : Probíhá přidělení dokladu
                            break;
                        case 26 /* Gordic.Uct.Interface.GEAkceFormulare.VraceniDoWfl */:
                            infoText = "jres:30150157"; //RC 30150157 : Probíhá vrácení dokladu do WFL
                            break;
                        case 29 /* Gordic.Uct.Interface.GEAkceFormulare.PorizovacNovy */:
                            infoText = "jres:30150168"; //RC 30150168 : Probíhá přidávání nového zápisu
                            break;
                        case 33 /* Gordic.Uct.Interface.GEAkceFormulare.PorizovacOdstranit */:
                            infoText = "jres:30250359"; //RC 30150159 : //RC 30250359 : Probíhá mazání zápisů
                            break;
                    }
                    ;
                    // Zobraz prislusnou hlasku
                    this.beginOperation?.(infoText);
                }
                /**
                 * Priprava dat pro odeslani na server
                 * @param request Objekt pozadavku
                 * @param typAkce Typ akce, pro kterou se data pripravuji
                 * @returns Pripraveny request pro odeslani na server
                 * @description Tato metoda je synchronni, na nic se neceka. Pouze vraci hodnotu
                 */
                prepareRequest(request) {
                    const that = this;
                    // Specificka data podle typu akce
                    switch (request.action) {
                        case 4 /* Gordic.Uct.Interface.GEAkceFormulare.Evidence */:
                            // Nejprve pouziju validaci formulare
                            //if(that.findFields("form:formDetail,form:formHeader").gform("isValid")) return;
                            if (!that.findForms().gform("isValid"))
                                throw null; // Zavolej false vetev / return $.Deferred().reject().promise();
                            // Nyni sesbirej data dokladu. Vytvarim si novy objekt, aby v pripade chyby nezustal nekompatibilni objekt that.doklad
                            // Pokud se evidence povede, server mi vrati platny readOnly objekt that.doklad
                            let headerData = {};
                            let newHeader = {};
                            let newIissp = {};
                            that.findFields("form:formDetail,form:formHeader").gfield("model", "collect", headerData);
                            // Preloz ty spravne hodnoty do prislusneho DTO
                            newHeader = headerData;
                            // Nyni musim prevest IISSP do spravneho objektu
                            newIissp.cj_kap = headerData.cj_kap;
                            newIissp.cj_oss = headerData.cj_oss;
                            newIissp.jm_zakl_kap = headerData.jm_zakl_kap;
                            newIissp.jm_zakl_oss = headerData.jm_zakl_oss;
                            newIissp.rok_rzam = headerData.rok_rzam;
                            newIissp.id_rzam = headerData.id_rzam;
                            newIissp.typ_vazani = headerData.typ_vazani;
                            // Zaevidovani dokumentu
                            let newDokument = {};
                            // 06.11.24 KK - Úprava v sebrání dat dokumentu na WebClient (D.Sebesta)
                            //newDokument = $.extend({}, that.saveEkoProfil(), (that as any).saveSslDetailDoruceniEko ? (that as any).saveSslDetailDoruceniEko() : {});
                            newDokument = $.extend(true, {}, that.saveEkoProfil(), that.saveSslDetailDoruceniEko ? that.saveSslDetailDoruceniEko() : {});
                            newDokument.ixs_typ = newDokument.ixs_typ ?? newHeader.ixs_typ;
                            //newDokument.nazev = newDokument.nazev ?? newHeader!.dokument?.nazev;
                            //newDokument.st_utaj_id = newDokument.st_utaj_id ?? newHeader!.dokument?.st_utaj_id;
                            //newDokument.ixs_fun_akt = newDokument.ixs_fun_akt ?? newHeader!.dokument?.ixs_fun_akt;
                            Object.assign(request, {
                                // Odesli data sesbirana z meho formulare. 
                                header: newHeader,
                                iissp: newIissp,
                                // Nove sbiram i data rozsireneho profilu (popisne vlastnosti)
                                vlastnosti: Gordic.PopisneVlastnosti.collectValues(that),
                                // a SSL dokumentu
                                dokument: newDokument,
                            });
                            return request;
                        case 30 /* Gordic.Uct.Interface.GEAkceFormulare.PorizovacUlozit */:
                            //Object.assign(request,
                            //    {
                            //        rows: data,
                            //    } as Uct.Interface.GRozDokladHeaderRowInDto
                            //);
                            return request;
                        case 33 /* Gordic.Uct.Interface.GEAkceFormulare.PorizovacOdstranit */:
                            // Nacti si vybrane radky
                            let selectedRows = Gordic.Eko.Grid.checkedRows(that.$porizovac);
                            // Pridam seznam radku pro smazani do requestu
                            Object.assign(request, {
                                rows: selectedRows
                            });
                            return request;
                        default:
                            // Vetev pro neupravovane akce, vrat pouze zaslany neupraveny request
                            return request;
                    }
                }
                /**
                 * Odeslani pozadavku na server
                 * @param request Pripraveny request pro odeslani
                 * @returns Promise, ktery se vyresi odpovedi ze serveru
                 */
                sendRequestToServer(request) {
                    const that = this;
                    let promise;
                    // Vnitrni metoda vraci promise, ktery musim na konci vratit
                    switch (request.action) {
                        case 3 /* Gordic.Uct.Interface.GEAkceFormulare.Podani */:
                            promise = that.isl.RozDoklad.create(request).get();
                            break;
                        case 4 /* Gordic.Uct.Interface.GEAkceFormulare.Evidence */:
                            promise = that.isl.RozDoklad.update(request).get();
                            break;
                        case 14 /* Gordic.Uct.Interface.GEAkceFormulare.Oprava */:
                            promise = that.isl.RozDoklad.opravaHlavicky(request).get();
                            break;
                            1;
                        case 7 /* Gordic.Uct.Interface.GEAkceFormulare.Schvaleni */:
                            promise = that.isl.RozDoklad.schvaleniDokladu(request).get();
                            break;
                        case 8 /* Gordic.Uct.Interface.GEAkceFormulare.Odschvaleni */:
                            promise = that.isl.RozDoklad.odschvaleniDokladu(request).get();
                            break;
                        case 16 /* Gordic.Uct.Interface.GEAkceFormulare.Storno */:
                            promise = that.isl.RozDoklad.stornoDokladu(request).get();
                            break;
                        case 17 /* Gordic.Uct.Interface.GEAkceFormulare.Aktivace */:
                            promise = that.isl.RozDoklad.odstornovaniDokladu(request).get();
                            break;
                        case 10 /* Gordic.Uct.Interface.GEAkceFormulare.Validace */:
                            promise = that.isl.RozDoklad.validaceDokladu(request).get();
                            break;
                        case 11 /* Gordic.Uct.Interface.GEAkceFormulare.Odvalidace */:
                            promise = that.isl.RozDoklad.odvalidaceDokladu(request).get();
                            break;
                        case 13 /* Gordic.Uct.Interface.GEAkceFormulare.Realizace */:
                            promise = that.isl.RozDoklad.realizaceDokladu(request).get();
                            break;
                        case 18 /* Gordic.Uct.Interface.GEAkceFormulare.Uzavreni */:
                            promise = that.isl.RozDoklad.uzavreniDokladu(request).get();
                            break;
                        case 26 /* Gordic.Uct.Interface.GEAkceFormulare.VraceniDoWfl */:
                            promise = that.isl.RozDoklad.vraceniDoWfl(request).get();
                            break;
                        case 21 /* Gordic.Uct.Interface.GEAkceFormulare.Predani */:
                            promise = that.isl.RozDoklad.predaniDokladu(request).get();
                            break;
                        case 22 /* Gordic.Uct.Interface.GEAkceFormulare.Prevzeti */:
                            promise = that.isl.RozDoklad.prevzetiDokladu(request).get();
                            break;
                        case 23 /* Gordic.Uct.Interface.GEAkceFormulare.Preevidence */:
                            promise = that.isl.RozDoklad.preevidenceDokladu(request).get();
                            break;
                        case 24 /* Gordic.Uct.Interface.GEAkceFormulare.Prideleni */:
                            promise = that.isl.RozDoklad.prideleniDokladu(request).get();
                            break;
                        case 12 /* Gordic.Uct.Interface.GEAkceFormulare.OdeslaniDoSP */:
                            promise = that.isl.RozDoklad.odeslaniDokladuDoIissp(request).get();
                            break;
                        case 29 /* Gordic.Uct.Interface.GEAkceFormulare.PorizovacNovy */:
                            promise = that.isl.RozDokladZapis.novyRadek(request).get();
                            break;
                        case 30 /* Gordic.Uct.Interface.GEAkceFormulare.PorizovacUlozit */:
                            promise = that.isl.RozDokladZapis.upsert(request).get();
                            break;
                        //case Gordic.Uct.Interface.GEAkceFormulare.PorizovacOpravit:
                        //    promise = that.isl.RozDokladZapis.opravaRadek(request).get();
                        //    break;
                        // Akce porizovace
                        case 33 /* Gordic.Uct.Interface.GEAkceFormulare.PorizovacOdstranit */:
                            promise = that.isl.RozDokladZapis.zrusitRadek(request).get();
                            break;
                    }
                    ;
                    return promise;
                }
                /**
                 * Zpracovani chybove odpovedi ze serveru
                 * Tato metoda nahrazuje duplicitni kod v GDetailDokladuTab.islAkce()
                 * @param error Odpoved ze serveru - ixp a typ akce
                 * @description Asynchronni metoda
                 */
                processErrorFromServer(error, request) {
                    const that = this;
                    that.endOperation();
                    // Uživatelské chyby - jen zobraz zpravu
                    if (!(error instanceof GServerError) && error instanceof GError) {
                        error.handled = true; // Nastav si priznak, ze chyba byla osetrena
                        that.dialogs.error(error.message);
                        throw error;
                    }
                    ;
                    // Chyba vracena ze serveru
                    if (!error.data || !error.data.DataInvalidDetails) {
                        throw error;
                    }
                    const exc = error.details;
                    exc.handled = true; // Nastav si priznak, ze chyba byla osetrena
                    //////////////////////////////////////////////////////
                    // Osetreni chyby 
                    // Error - zobraz dialog a vrať resolved/rejected podle výsledku
                    if (exc.data.DataInvalidDetails.exceptionType == 4 /* Uct.Interface.GETypyChyb.error */) {
                        // Necekam na odpoved, uzivatel ji zavre krizkem
                        that.dialogs.error(exc.baseMessage);
                        // Vyvolam vyjimku, aby chin pokracoval do failed
                        throw exc;
                    }
                    //////////////////////////////////////////////////////
                    // Osetreni dotazu
                    // Question - pokračuj nebo zastav
                    if (exc.data.DataInvalidDetails.exceptionType == 2 /* Uct.Interface.GETypyChyb.question */) {
                        const message = exc.baseMessage + "jres:30150073"; //RC 30150073 : ;Chcete pokračovat ?
                        return that.dialogs.confirm(message)
                            .createDialogPromise("yes")
                            .then(() => {
                            request.member = exc.data.member;
                            request.addInfo = exc.data.addInfo;
                            //                        return that.executeActionAfterQuestion(typAkce, request);
                            return that.executeAction(request);
                        });
                    }
                    ;
                    //////////////////////////////////////////////////////
                    // Zobrazeni formulare
                    // ShowForm - zobraz formulář a pokračuj
                    if (exc.data.DataInvalidDetails.exceptionType == 5 /* Uct.Interface.GETypyChyb.showForm */) {
                        request.member = exc.data.member;
                        request.addInfo = exc.data.addInfo;
                        //return this.executeActionAfterForm(request);
                        return that.executeAction(request);
                    }
                    // Zobrazeni sestavy a ukonceni dle parametru
                    if (exc.data.DataInvalidDetails.exceptionType == 7 /* Uct.Interface.GETypyChyb.showReportAndError */
                        || exc.data.DataInvalidDetails.exceptionType == 8 /* Uct.Interface.GETypyChyb.showReportAndQuestion */) {
                        return that.dialogs.confirm(exc.baseMessage + ".\n" + "jres:30250499") //RC 30250499 : Chcete zobrazit sestavu ?
                            .createDialogPromise("yes")
                            .then(() => {
                            const deferred = $.Deferred();
                            GAction.createPrintAction({
                                name: "actTiskErrReportSchvaleni",
                                tema: "roz_ptm_dokerr",
                                serverParameterMethod: "Gordic.Roz.WebClient.GPrintParameters:ServerParameterMethodPodteceniRozpoctu", // Nacteni parametru na serverove strane
                                reportStarting: (rep) => {
                                    //rep.params["IXP"] = that.doklad.ixp!;
                                    rep.customDto = { Tema: rep.tema, Ixp: that.doklad.ixp };
                                },
                                dialogClosed: (ev, r) => {
                                    deferred.resolve();
                                }
                                //    reportFinished(ev) => {
                                //        // Pokud je vyplneno cislo ixb_new v infrmaci ze sestavy, tak musim obnovit detail dokladu
                                //        if(e.Report.CommonInfos.Contains("IXB_NEW")
                                //            && e.Report.CommonInfos["IXB_NEW"] != null
                                //            && e.Report.CommonInfos["IXB_NEW"].ToString().Trim() != "")
                                //                Reload();            
                                //    },
                            }).run();
                            return deferred.promise();
                        })
                            .then(() => {
                            if (exc.data.DataInvalidDetails.exceptionType == 7 /* Uct.Interface.GETypyChyb.showReportAndError */) {
                                return that.dialogs.error(exc.baseMessage)
                                    .createDialogPromise("ok");
                            }
                            else {
                                return that.dialogs.confirm(exc.baseMessage + "jres:30150073") //RC 30150073 : ;Chcete pokračovat ?
                                    .createDialogPromise("yes");
                            }
                        });
                    }
                    return $.Deferred().resolve().promise();
                }
                ///**
                // * Zpracovani odpovedi pro ulozeni porizovace
                // */
                //private handlePorizovacUlozitResponse(response: any): any {
                //    const that = this;
                //    const doklad = that.doklad;
                //    if (!doklad?.header) return;
                //    // Aktualizace dat dokladu
                //    doklad.header.dat_zmena = response.data.DatumZmeny;
                //    doklad.header.stav_dokl_txt = response.data.StavTxt;
                //    doklad.header.s_zau = response.data.s_zau;
                //    doklad.ActionPermissions = response.data.ActionPermissions;
                //    // Ukonceni editace radku
                //    that.editRows = false;
                //    // Aktualizace radku v pameti
                //    if (doklad.rows && response.data.Zapis) {
                //        doklad.rows.forEach((item) => {
                //            if (item.radek_z == response.data.Zapis.radek_z) {
                //                Object.assign(item, response.data.Zapis);
                //            }
                //        });
                //    }
                //    //// Pokud se zmenil stav dokladu
                //    //if (response.data.StateChanged) {
                //    //    that.refreshContent?.({
                //    //        reloadData: false,
                //    //        naplnitData: false,
                //    //        nastavitPristupnostPoli: true,
                //    //        aktualizovatZapisy: true
                //    //    });
                //    //}
                //    // Aktualizace seznamu
                //    that.refreshSeznam?.(doklad.ixp);
                //    // Vracime zapis pro porizovac
                //    return response.data.Zapis;
                //}
                //#endregion Akce detailu
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                /**
                * Obnoveni seznamu
                * */
                refreshSeznam(pidDokladu) {
                    if (!this.isSeznamExist())
                        return $.Deferred().reject().promise();
                    return WebClient.refreshRowsFromDB(null, [{ ixp: pidDokladu }]);
                }
                /**
                 * Zjisteni, zda je nacteny seznam, existuje metoda..
                 * */
                isSeznamExist() {
                    return typeof Gordic.Roz.WebClient.refreshRowsFromDB !== "undefined";
                }
                ///**
                // * akceZrusitOpravuHlavickyDokladu
                // *
                // * @param request vstupni parametry ISL metody obsahujici ixp, datum zmeny + dalsi mozne parametry pro opakovani operace - viz. popis GRozDokladInDto
                // * */
                //private akceZrusitOpravuHlavickyDokladu(request: Uct.Interface.GRozDokladInDto): void {
                //    // Pouze znovunactu data a prenastavim jednotlive akce menumenu
                //    this.load({ ixp: request.ixp, action: request.action });
                //}
                /**
                 * Tisk chybove sestavy v pripade podteceni rozpoctu
                 * @param ixp pid dokladu
                 * */
                tiskReportuSchvaleni(ixp) {
                    const that = this;
                    GAction.createPrintAction({
                        name: "actTiskErrReportSchvaleni", //nazev akce
                        tema: "roz_ptm_dokerr", //nazev tematu
                        serverParameterMethod: "Gordic.Roz.WebClient.GPrintParameters:ServerParameterMethodTiskyNaSeznamu", // Nacteni parametru na serverove strane
                        reportStarting: function (rep) {
                            rep.customDto = { Tema: rep.tema, Ixp: ixp };
                        },
                        reportFinished: function () {
                        }
                    }).run();
                }
                /**
                 * Jedna se doklad o prislib
                 * @returns
                 */
                isPrislib() {
                    return this.doklad.header?.ktg_typ > 1134 && this.doklad.header?.ktg_typ < 1139;
                }
                /**
                 * akcePorizovacNovy
                 *
                 * Zavolani akce novy radek na porizovaci
                 *
                 * */
                akcePorizovacNovy( /*request: Uct.Interface.GRozDokladInDto*/) {
                    const that = this;
                    let def = $.Deferred();
                    if (that.doklad.IsMusiNavazat) {
                        // zobrazeni formulare zapisu
                        this.VazbyDokladu()
                            .then((result) => {
                            if (result && typeof result.newLink && result.newLink)
                                return def.reject();
                            def.resolve();
                        });
                    }
                    else
                        def.resolve().promise();
                    return def.then(() => {
                        // Kontroluji, zda se jedna o prislib
                        if (that.isPrislib()) {
                            this.navigate([
                                "Gordic.Roz.WebClient.GRozGenerujPrislib", // nazev okna detailu (c# nebo ts ?)
                                {
                                    uid: "GRozGenerujPrislib#",
                                    // Vzdy se vytvori nove GPC s konkretni knihou. Tj. i kdyz je pohled pres vsechny knihy, tak pri zobrazeni detailu stojim v knize.
                                    // Podani tedy probiha do knizy, ze ktere je zobrazeny detail
                                    gpc: Gordic.Eko.Utils.createBookGpc(that.gpc, that.doklad.header?.ixp_den), // GPC s knihou z aktuálního záznamu
                                },
                            ], {
                                dokladHead: that.doklad.header,
                                //action: action, // Nacteni existujiciho detailu (read) nebo podani noveho dokladu (podani)
                            })
                                .on("close", function (res, result, a) {
                                debugger;
                                if (typeof result !== "undefined" && result)
                                    that.RefreshDetail();
                                def.resolve();
                                //if (res.returnValue && res.returnValue.refresh === true) {
                                //    // nacteni aktualizovaneho dokladu
                                //    //Gordic.Uct.WebClient.Seznam.ReloadRowFromDB(content, res.returnValue.ixp);
                                //    //let doklad: Interface.GUctSeznamDokladuDto[] = [{ ixp: res.returnValue.ixp }];
                                //    Gordic.Uct.WebClient.Seznam.refreshRowsFromDB(content as any, [{ ixp: res.returnValue.ixp }]);
                                //    // nastaveni aktivniho radku
                                //    // Gordic.Uct.WebClient.Seznam.RefreshSeznamu(null);
                                //}
                            })
                                .on('closed', (ev, ctx, a) => {
                                debugger;
                            });
                            return def.promise();
                        }
                        //that.globals.DatabaseParams.PreplneniNSVZapisech
                        if (that.typPorizovace !== 1 /* GRozTypPorizovace.VLZR */) {
                            // TODO: bude se muset upravit
                            const radek = {
                                lic: that.doklad.header?.lic,
                                ico: that.doklad.header?.ico,
                                ucs: that.globals.DatabaseParams?.UrceniRezimuUctovaniDleKategorieDokladu ? this.doklad.header?.ucs : "",
                                nks: this.doklad.header?.nks,
                                uus: this.doklad.header?.uus,
                                rok: this.doklad.header?.rok,
                                drd: this.doklad.header?.drd,
                                ac: this.doklad.header?.ac,
                                ixp: this.ixp,
                                aktivita: 100,
                                up_stav: 0,
                                radek_z: 0,
                                typ_ag: 50,
                            };
                            const grid = that.getGrid();
                            if (grid === null)
                                return $.Deferred().reject().promise();
                            grid.ggridroweditor("addRow", radek);
                            return def.resolve(radek).promise();
                        }
                        else {
                            return that.isl.RozDokladZapis.novyRadek({
                                ixp: that.doklad.header?.ixp,
                                dat_zmena: that.doklad.header?.dat_zmena,
                                action: 29 /* Gordic.Uct.Interface.GEAkceFormulare.PorizovacNovy */,
                                parameters: {
                                    "PohledPresKnihy": (Gordic.Eko.Utils.getEkoBookVariant(that) === 1 /* Eko.Interface.GEkoBookVariant.One */) ? 0 : 1 // zapnuty pohled pres vsechny knihy(0 - ne, 1 - ano)
                                }
                            })
                                .get()
                                .then((result => {
                                debugger;
                                const grid = that.getGrid();
                                if (grid === null)
                                    return $.Deferred().reject().promise();
                                grid.ggridroweditor("addRow", result.result.data);
                                return result;
                            }));
                        }
                        //grid.ggridroweditor("addRow", radek);
                        ////that.SetEnableActions(that.doklad.ActionPermissions!);
                        //return def.resolve(radek).promise();
                    });
                }
                /**
                 * Vraci objekt gridu
                 * @param content
                 * @returns
                */
                getGrid() {
                    var data = this.element.find(".ggrid.js-RozPorizovacGrid");
                    return (data.length == 0 ? null : data);
                }
                /**
                 * Vraci objekt gridu
                 * @param content
                 * @returns
                */
                getGridIK() {
                    var data = this.element.find(".ggrid.js-RozStrukturaIKGrid");
                    return (data.length == 0 ? null : data);
                }
                /**
                 * Vraci objekt gridu
                 * @param content
                 * @returns
                */
                getGridUkazatele() {
                    var data = this.element.find(".ggrid.js-RozUkazateleGrid");
                    return (data.length == 0 ? null : data);
                }
                /**
                 * Spusteni predkontace
                 *
                 */
                StartPredkontace() {
                    const that = this;
                    that.newRowStart = false;
                    this.dialogs.showModalWindow(Gordic.Eko.WebClient.GVyberPredkontace, {}, "jres:30250413", 800, 600, true) //RC 30250413 : Výběr předkontací
                        .on("close", function (ev, ctx) {
                        if (ctx != null && typeof ctx.selected !== "undefined" && ctx.selected != "") {
                            //Gordic.Eko.Interface.GUctRozdkonDto
                            let filtr = { ixs_kon: ctx.selected };
                            Gordic.Isl.EkoPrekontaceSablonaRadek.list({ rq: { filters: filtr }, typAg: 50 })
                                .get()
                                .then(function (result) {
                                const grid = that.getGrid();
                                if (grid === null)
                                    return;
                                let nRS = that.newRowStart;
                                that.newRowStart = false;
                                that.preFillInProgress = true;
                                let rules = Gordic.Widget.GMagicPreFiller.GMagicPreFiller.getDataWordsColumns(grid.ggrid("option", "columns"));
                                ;
                                rules.push({
                                    column: "nks", type: Gordic.Widget.GMagicPreFiller.RuleType.topology, dataExtend: (val) => {
                                        return { nks: val, ico: that.globals.EkoParams?.Ico };
                                    }
                                }, {
                                    column: "c0", type: Gordic.Widget.GMagicPreFiller.RuleType.financial
                                }, {
                                    column: "c1", type: Gordic.Widget.GMagicPreFiller.RuleType.financial
                                }, {
                                    column: "smlouva", type: Gordic.Widget.GMagicPreFiller.RuleType.other, field: "smlouva", templateName: "sml_t"
                                }, {
                                    column: "popis", type: Gordic.Widget.GMagicPreFiller.RuleType.other, field: "popis", templateName: "naz_t"
                                });
                                that.SetEnableActions(that.doklad.ActionPermissions);
                                grid.gmagicprefiller("useTemplates", result.data, rules).then(() => {
                                    that.newRowStart = nRS;
                                    return;
                                }, () => { that.newRowStart = false; }).always(() => { that.preFillInProgress = false; that.SetEnableActions(that.doklad.ActionPermissions); });
                                //;
                                return;
                            });
                        }
                        else {
                        }
                    });
                }
                /**
                 * Odstraneni zapisu
                 * @returns Promisy
                 */
                OdstranitZapisy() {
                    const that = this;
                    // Vytvor si asynchronni objekt
                    const deferred = $.Deferred;
                    // Nacti si vybrane radky
                    let selectedRows = Gordic.Eko.Grid.checkedRows(that.$porizovac);
                    let data = {
                        Zapisy: Gordic.Eko.Grid.checkedRows(that.getGrid()),
                        s_zau: that.doklad.header?.s_zau,
                        ixp: that.doklad.ixp,
                        dat_zmena: that.doklad.header.dat_zmena
                    };
                    if (data.Zapisy.length === 0) {
                        that.dialogs.messageBox("jres:30250371" //RC 30250371 : Info
                        , "jres:30250372" //RC 30250372 : Nevybrány žádné zápisy
                        );
                        return $.Deferred().reject().promise();
                    }
                    let dotaz = "jres:30250357"; //RC 30250357 : Bude odstraněn řádek s číslem 1. Opravdu chcete pokračovat ?
                    if (data.Zapisy.length > 1)
                        dotaz = "jres:30250358".format(data.Zapisy.length); //RC 30250358 : Budou odstraněny řádky v počtu {0}. Opravdu chcete pokračovat ?
                    return Gordic.Eko.WebClient.Common.Dotaz(this, dotaz)
                        .then(function (result) {
                        if (result !== "YES")
                            return $.Deferred().reject().promise();
                        that.beginOperation("jres:30250359"); //RC 30250359 : Probíhá mazání zápisů
                        // @ts-ignore: docasne pro moznost prekladu 84
                        return that.isl.RozDokladZapis.hromadneOdstranit(data)
                            .get()
                            .then(function (result) {
                            if (that.closed)
                                return;
                            debugger;
                            // ok  - konec
                            // Pocet zmeneny radku
                            if (result.data.StateChanged) {
                                // preberu hodnoty
                                that.doklad.header.dat_zmena = result.data.DatumZmeny;
                                //content.UcetniDokladDto.StavDokladu = result.data.StavDokladu;
                                that.doklad.header.stav_dokl_txt = result.data.StavTxt;
                                that.doklad.header.s_zau = result.data.s_zau;
                                that.doklad.ActionPermissions = result.data.ActionPermissions;
                                that.editRows = false;
                                that.RefreshAfterAction();
                                // aktualizace seznamu dokladu
                                that.refreshSeznam(that.doklad.ixp);
                                //refreshRowsFromDB(null, [{ ixp: that.doklad!.ixp }]);
                            }
                            if (result.data.Zapisy && result.data.PocetOvlivnenychRadku > 0) {
                                that.doklad.rows = result.data.Zapisy;
                                var myGrid = that.getGrid();
                                if (myGrid === null)
                                    return;
                                var view = new Gordic.Data.View(that.doklad.rows, { key: "ixp,radek_z" });
                                myGrid.ggrid("setData", view, true);
                            }
                            that.endOperation();
                            return;
                        })
                            .always(function () {
                            that.endOperation();
                        });
                    });
                }
                /**
                 * Aktulaizace detailu pro ukonceni akce
                 *
                 * @param {GUctDetail} content
                 * @param {any}
                 */
                RefreshAfterAction(aktualizovatZapisy = true) {
                    //if (aktualizovatZapisy)
                    //    AktualizaceZapisu(content);
                    //RefreshMenu(content);
                    this.SetEnableActions(this.doklad.ActionPermissions);
                    this.updateStatusBar(); // Zobraz nazvy stavu ve status baru
                }
                ///**
                // * akcePorizovacOpravit
                // *
                // * Zavolani akce oprava radku na porizovaci
                // * 
                // * @param request vstupni parametry ISL metody obsahujici ixp, datum zmeny + dalsi mozne parametry pro opakovani operace - viz. popis GRozDokladInDto
                // * */
                //private akcePorizovacOpravit(request: Uct.Interface.GRozDokladInDto): void {
                //    const that = this;
                //    that.newRowStart = false;
                //    const grid = this.getGrid();
                //    if (grid === null) return;
                //    var oznaceneRadky = Gordic.Eko.Grid.checkedRows<Uct.Interface.GRozdpepDto>(grid);
                //    if (!oznaceneRadky || oznaceneRadky.length == 0) {
                //        that.dialogs.messageBox("jres:30250436" //RC 30250436 : Info
                //            , "jres:30250437") //RC 30250437 : Nenalezen řádek k editaci
                //        return;
                //    }            
                //    // dohledani rozvrhu
                //    //oznaceneRadky[0]["ixs_roz"] = that.getIdRozvrhu(oznaceneRadky[0].rok!, oznaceneRadky[0].nks!, oznaceneRadky[0].ucs!);// "DEMOUR00A3E1";
                //    debugger;
                //    grid.ggridroweditor("start");
                //    /*
                //                let promise = that.isl.RozDoklad.porizovacOprava(request).get() // Zavolam metodu get a ta mi vraci slib
                //                    // 05.09.22 KK - nebudu znovu nacitavat vsechna data, ale pouze si nactu data noveho radku a permissions
                //                    //.then( // Zde zpracuji pouze kladny vysledek. chybu zpracuji az na konci a progress vubec nepouzivam
                //                    //    (response) => { // done
                //                    //        return that.load({ ixp: response.data.ixp, action: Gordic.Uct.Interface.GEAkceFormulare.PorizovacNovy }) // Vraci mi jiny promise
                //                    //            .then(() => response); // po nacteni dat pomoci load posilam dal data noveho radku
                //                    //    }
                //                    //)
                //                    .then(
                //                        (response) => { // done
                //                            that.$porizovac.ggridroweditor("start"); // Doplnim nactena data do porizovace. 
                //                            that.SetEnableActions(response.data.actionPermissions!);
                //                        },
                //                        (exc: any) => {  // fail - zde se bude vracet IGExceptionInfo
                //                            if (typeof exc != "undefined") {
                //                                exc.handled = true; // Nastav si priznak, ze chyba byla osetrena
                //                                if (exc.baseType != "Gordic.General.GDataInvalidException"
                //                                    || exc.data.DataInvalidDetails.exceptionType == Uct.Interface.GETypyChyb.error) {
                //                                    that.endOperation(); // smaz informacni hlasku
                //                                    that.dialogs.error(exc.baseMessage); // Zobraz dialog a ukonci cinnost
                //                                };
                //                                if (exc.data.DataInvalidDetails.exceptionType == Uct.Interface.GETypyChyb.question) {
                //                                    exc.baseMessage += "jres:30150073"; //RC 30150073 : ;Chcete pokračovat ?
                //                                    that.dialogs.confirm(exc.baseMessage).createDialogPromise("yes").then(function () { // Zobrazim dotau
                //                                        request.member = exc.data.member; // Ulozim si chybovy kod
                //                                        request.addInfo = exc.data.addInfo;
                //                                        that.akcePorizovacOpravit(request); // Volam rekurzivne podani dokladu se zmenenym requestem
                //                                    });
                //                                };
                //                            }
                //                        }
                //                    )
                //                // Zobrazim kolecko na akci
                //                that.actions[Actions.PorizovacNovy]?.setPending(promise);
                //                */
                //}
                /**
                * Vytvoreni predkontace ze zapisu
                * @param content
                * @param vsechnyRadky
                */
                PredkontaceZeZapisu(vsechnyRadky = true) {
                    var rowsDto;
                    var selectedRowsDto;
                    const grid = this.getGrid();
                    if (grid == null)
                        return;
                    if (vsechnyRadky) {
                        rowsDto = Gordic.Eko.WebClient.Common.GetAllRows(grid);
                        selectedRowsDto = rowsDto;
                    }
                    else {
                        rowsDto = Gordic.Eko.WebClient.Common.GetAllRows(grid); //Gordic.Eko.WebClient.Common.OznaceneRadky(content.GetGrid(that));
                        selectedRowsDto = Gordic.Eko.Grid.checkedRows(this.getGrid());
                    }
                    this.navigate("Gordic.Eko.WebClient.GDetailPredkontace", {
                        Ixp: null,
                        id: "xxxDetailPredkontace",
                        ModeDetail: Gordic.Eko.WebClient.UctRoz.Enums.ModeDetail.PrevodZapisu,
                        SourceRecords: rowsDto,
                        SelectedRecords: selectedRowsDto,
                        TypAg: 50
                    })
                        .on("close", function (res) {
                        if (res.returnValue && res.returnValue.refresh === true) {
                            //that.reload(that);
                        }
                    });
                }
                /**
                 * Hromadne operace import
                 *
                 *
                 */
                HromadneOperaceRadky(typOperace) {
                    let that = this;
                    let operace;
                    let gridformat = null;
                    let title = "";
                    switch (typOperace) {
                        case "IMPFILE":
                            // import ze souboru
                            gridformat = this.createGridFormatPorizovac(that.typPorizovace);
                            operace = "GRozOperaceImport"; //File
                            title = "jres:30250408"; //RC 30250408 : Import zápisů ze souboru
                            break;
                        case "IMPCLIP":
                            // import ze schranky
                            operace = "GRozOperaceImport"; //Clipboard
                            gridformat = this.createGridFormatPorizovac(that.typPorizovace);
                            title = "jres:30250409"; //RC 30250409 : Import zápisů ze schránky
                            break;
                        default:
                            //this.dialogs.alert("jres:30250395", //RC 30250395 : Upozornění
                            //    "jres:30250396");  //RC 30250396 : Neznámá operace
                            //return;
                            throw new GError("jres:30250396");
                        //break;
                    }
                    //this.navigate("Gordic.Roz.WebClient." + operace,
                    //    //{ type: typOperace, ixp: this.ixp, grdFormat: gridformat, datZmeny: this.doklad.header?.dat_zmena })
                    //    { id: "GRozImportZapisy", ID: "GRozImportZapisy#", title: title, type: typOperace, ixp: this.ixp, grdFormat: gridformat, datZmeny: this.doklad.header?.dat_zmena, typPorizovace: that.typPorizovace, isRezervujeVIISSP: that.isRezervujeVIISSP })
                    //    .on("close", function (cntDiv: any, par) {
                    //        if (typeof cntDiv !== "undefined" && typeof cntDiv.content !== "undefined" && typeof cntDiv.content.successClose === "boolean" && cntDiv.content.successClose === true) {
                    //            // znovunacteni dokladu
                    //            that.RefreshDetail()
                    //                .then(() => { that.SwitchToRecords(); return; });
                    //            //ReloadDoklad(content);
                    //        }
                    //        //def.resolve(content, par);
                    //    }
                    //    );
                    //return def.promise();
                    return EKOUtils.callOtherContent(this, operace, "Roz", (cntDiv, contentPruvodce) => {
                        if (typeof cntDiv !== "undefined" && typeof cntDiv.content !== "undefined" && typeof cntDiv.content.successClose === "boolean" && cntDiv.content.successClose === true) {
                            // znovunacteni dokladu
                            this.RefreshDetail()
                                .then(() => { this.SwitchToRecords(); return; });
                            //ReloadDoklad(content);
                        }
                    }, { id: "GRozImportZapisy", ID: "GRozImportZapisy#", title: title, type: typOperace, ixp: this.ixp, grdFormat: gridformat, datZmeny: this.doklad.header?.dat_zmena, typPorizovace: that.typPorizovace, isRezervujeVIISSP: that.isRezervujeVIISSP });
                }
                /**
                 * Definice lokalni nabidky
                 */
                getMenuActions() {
                    return ["actRozPolozkyNovyRadek" /* Actions.PorizovacNovy */, "actRozPolozkyOpravit" /* Actions.PorizovacOpravit */, "actRozPolozkyZrusit" /* Actions.PorizovacZrusit */, "actRozPolozkyZrusit" /* Actions.PorizovacZrusit */,
                        "-", "actRozPolozkyPredkontace" /* Actions.PorizovacPredkontace */,
                        "-", ["jres:30250411", "acttRozPolozkyImportZeSchranky" /* Actions.PorizovacImportSchranka */, "acttRozPolozkyImportZeSouboru" /* Actions.PorizovacImportSoubor */]]; //RC 30250411 : Import dat
                }
                /**
                 * function SwitchToRecords
                 *
                 *  Prepnuti na zalozku se zapisy
                 * @param {GUctDetail} content
                 */
                SwitchToRecords() {
                    this.SwitchTab("subZapisy");
                }
                /**
                 * function SwitchTab
                 *
                 * Prepinani zalozek
                 * @param {GUctDetail} content
                 * @param {string} nameTabs
                 */
                SwitchTab(nameTabs) {
                    if (this.globalSettings?.get(Gordic.Roz.AppSettings.appPath + ".RozSettingsForm.PolozkyView") == Gordic.Roz.AppSettings.EGPolozkyView.Zalozka)
                        this.element.find(".gtabmanager").gtabmanager("setActive", nameTabs);
                }
                /**
                 * Jenda se o opravny prislib
                 * @returns
                 */
                OpravnyPrislib() {
                    return this.doklad.header?.ktg_typ == 1137 || this.doklad.header?.ktg_typ == 1138;
                }
                /// <summary>
                /// Zobrazeni navazanych dokladu
                /// </summary>
                VazbyDokladu() {
                    var that = this; //this = tato akce
                    let def = $.Deferred();
                    let loading;
                    let oductovano = false;
                    //let opravyPrislib = that.doklad.header?.ktg_typ == 1137 || that.doklad.header?.ktg_typ == 1138;
                    let viewMode = (that.OpravnyPrislib() && that.PocetZapisu() > 0)
                        || that.doklad.header?.eko_akt !== 100
                        || that.doklad.header.s_zau > 5;
                    let newGpc = Gordic.Eko.Utils.createBookGpc(that.gpc, that.doklad.header?.ixp_den);
                    let vstup = {
                        drd: that.doklad.header?.drd, ixp: that.doklad.ixp, ktg_typ: that.doklad.header?.ktg_typ,
                        rez: 0 /* Gordic.Eko.Interface.GERezimPraceSVazbami.VazbaSekundaruNaPrimarni */,
                        viewMode: viewMode,
                        povolitOductovani: that.doklad.header?.drd == 6 && (that.doklad.header?.s_zau <= 5)
                    };
                    {
                        var oknoVazeb = this.navigate("Gordic.Eko.WebClient.GVazby", {
                            Id: "roz_vazby", InputDto: vstup
                        });
                        oknoVazeb.on("eko_vazby_navazano", function (ev, data) {
                            if (viewMode)
                                return def.resolve();
                            return that.RefreshDetail(false)
                                .then(() => {
                                return def.resolve({ newLink: true });
                            });
                            //loading = Gordic.Uct.WebClient.Detail.RefreshDetail(content as Gordic.Uct.WebClient.Detail.GUctDetail);
                            //that.AktualizaceDokladu();
                            //return def.resolve();
                        });
                        oknoVazeb.on("eko_zapisy_oductovat", function (ev, data) {
                            if (viewMode)
                                return;
                            oductovano = true;
                            //Gordic.Uct.WebClient.Detail.RefreshDetail(content as Gordic.Uct.WebClient.Detail.GUctDetail)
                            //if (typeof loading !== "undefined") {
                            //    if (loading.state() === "pending")
                            //        loading.then(() => Gordic.Uct.WebClient.Detail.OductovaniZapisu(content as Gordic.Uct.WebClient.Detail.GUctDetail, oknoVazeb, data.zapisy)
                            //        )
                            //            ;
                            //    else
                            //        Gordic.Uct.WebClient.Detail.OductovaniZapisu(content as Gordic.Uct.WebClient.Detail.GUctDetail, oknoVazeb, data.zapisy);
                            //    return;
                            //}
                            //Gordic.Uct.WebClient.Detail.OductovaniZapisu(content as Gordic.Uct.WebClient.Detail.GUctDetail, oknoVazeb, data.zapisy)
                            ;
                        });
                        oknoVazeb.on("closed", function (ev, ctx) {
                            // znovunacteni dokladu
                            if (ev.target == oknoVazeb[0] && ctx != null && ctx.hasChanged) {
                                if (!oductovano)
                                    that.AktualizaceDokladu();
                            }
                            if (oductovano) {
                                that.AktualizaceDokladu();
                            }
                            that.endOperation();
                            return def.reject();
                        });
                        return def.promise();
                    }
                }
                /**
                 * Aktualizace hodnot na hlavicce dokladu
                 * @returns
                 * */
                updateValueFields() {
                    const that = this;
                    // Nejprve naplnim vsechna policka hodnotami
                    that.findFields() // Najde vsechna pole formulare ve vsech sekcich
                        // Vyplneni polozek na dokladu - metoda modelu apply
                        // Poslednim objektem je ModelOptions. Tento option spolu s model tvoří základní konfigurační celek systému propojení formuláře a modelu - https://xwiki.gordic.cz/NET/widgets/gfield#HmodelOptions
                        // initialValues (bool, default=false) (operace: apply) - zda se při nastavovani hodnot z modelu má použít metoda setValue() nebo setInitial(). 
                        // setFlags(object, default = null) (operace: apply) - vlastní rozšíření flags, se kterými budou volána všechna setValue volaná z modelu
                        // setFlags: { triggerChange: false } - pri plneni policek metodou nespoustet udalost change nad jednotlivymi policky
                        .gfield("model", "apply", that.doklad.header, { initialValues: true, setFlags: { triggerChange: false } })
                        .gfield("model", "validators", that.validators);
                    // Vyplneni popisnych vlastnosti - pokud jsou vyplneny
                    if (that.doklad.vlastnosti)
                        Gordic.PopisneVlastnosti.applyValues(that, that.doklad.vlastnosti);
                }
                ///**
                // * Aktualizace hodnoty v porizovaci
                // * */
                //private updateValuePorizovac(): void {
                //    const that = this;
                //    //var view = new Gordic.Data.View(that.doklad.rows as Uct.Interface.GRozdpepDto[], { key: "ixp,radek_z" });
                //    //that.$porizovac.ggrid("setData", view, true); // autorefresh:true
                //    const view = that.$porizovac.ggrid("getView");
                //    view.updateData(that.doklad.rows);
                //}
                /**
                 * Nastaveni pristupnosti policek dle stavu a proveden akce
                 * */
                updateEnableFields() {
                    const that = this;
                    // Z hlavicky mohu upravovat typ dokladu, kompetent a realizator
                    this.findFields(Gordic.Eko.HeaderForm.Fields.TypDokladu).gfield("option", "disabled", !that.doklad.FieldPermissions?.TypDokladu.value);
                    this.findFields(Gordic.Eko.HeaderForm.Fields.Kompetent).gfield("option", "disabled", !that.doklad.FieldPermissions?.Kompetent.value);
                    this.findFields(Gordic.Eko.HeaderForm.Fields.Realizator).gfield("option", "disabled", !that.doklad.FieldPermissions?.Realizator.value);
                    // Polozky dokladu
                    this.findFields("formMesicField" /* Fields.Mesic */).gfield("option", "disabled", !that.doklad.FieldPermissions?.Mesic.value);
                    this.findFields("formDenField" /* Fields.Den */).gfield("option", "disabled", !that.doklad.FieldPermissions?.Den.value);
                    this.findFields("formDrdField" /* Fields.Drd */).gfield("option", "disabled", !that.doklad.FieldPermissions?.DruhDokladu.value);
                    this.findFields("formCisloDokladuField" /* Fields.CisloDokladu */).gfield("option", "disabled", !that.doklad.FieldPermissions?.CisloDokladu.value);
                    this.findFields("formManagerCileField" /* Fields.ManagerCile */).gfield("option", "disabled", !that.doklad.FieldPermissions?.ManagerCile.value);
                    this.findFields("formUctarnaField" /* Fields.Uctarna */).gfield("option", "disabled", !that.doklad.FieldPermissions?.Uctarna.value);
                    this.findFields("formCastkaField" /* Fields.Castka */).gfield("option", "disabled", !that.doklad.FieldPermissions?.Castka.value);
                    this.findFields("formLongPopisField" /* Fields.Popis */).gfield("option", "disabled", !that.doklad.FieldPermissions?.Popis.value);
                    this.findFields("formAHeaderField" /* Fields.AHlavicka */).gfield("option", "disabled", !that.doklad.FieldPermissions?.Ahlavicka.value);
                    this.findFields("formCisloEdsField" /* Fields.CisloEdsSmvs */).gfield("option", "disabled", !that.doklad.FieldPermissions?.CisloSablonyEds.value);
                    // Povoleni editace zalozky WFL dokument
                    this.setEditmodeEkoProfil(that.editHeader);
                    // Povoleni editace zalozky popisnych vlastnosti
                    this.descProps_setup({ readOnly: !that.editHeader });
                }
                //#endregion Akce detailu
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                //#region Pomocne dialogy pro spusteni akce
                /**
                 * Dialog pro zadani pidu pro podani dokladu
                 * @returns Promise
                 * */
                dialogPodani() {
                    const that = this;
                    const $dialog = Gordic.Wfl.Dialogs.GenerovaniIxpDlg(that, {
                        TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                        TypId: Gordic.Wfl.Globals.Enums.TypId.IXP,
                        DotazPriExistenciVJineAgende: false,
                        HlaseniPriExistenciVAgende: false,
                        ZpusobGenerovani: Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp.ParametremGinGenIxp
                    }, Gordic.Global.Enums.ModOtevreni.showModalWindow);
                    return $dialog.createDialogPromise(data => data !== undefined)
                        .then((data) => {
                        // Kontrola, zda jsou data vyplněna
                        if (!data.Ixp || data.Ixp.trim().length === 0) {
                            // Data nejsou vyplněna - zobraz chybu a opakuj
                            const $errorDialog = this.dialogs.error("jres:30150164"); //RC 30150164 : Text musí být vyplněn!
                            return $errorDialog.createDialogPromise("ok")
                                .then(() => {
                                // Rekurzivně zavolej znovu
                                return this.dialogPodani();
                            });
                        }
                        // Data jsou OK - vrať text
                        return data;
                    })
                        .catch(() => {
                        throw new GError("jres:30150102"); // RC 30150102 : Akce byla stornována uživatelem
                    });
                }
                /**
                 * Dialog pro zadani textoveho duvodu pro spusteni akce
                 * @returns Promise
                 * */
                dialogDuvod(label) {
                    // Vytvorim si DIV pro zobrazeni dialogu
                    const $dialog = this.dialogs.prompt("Dotaz", label);
                    // Z dialogu vytvorim promise . V data je DialogReturnValue s hodnotou text a pokracuji, pokud jsou data vyplnena
                    return $dialog.createDialogPromise(data => data !== undefined)
                        .then((data) => {
                        // Kontrola, zda jsou data vyplněna
                        if (!data.text || data.text.trim().length === 0) {
                            // Data nejsou vyplněna - zobraz chybu a opakuj
                            const $errorDialog = this.dialogs.error("jres:30150164"); //RC 30150164 : Text musí být vyplněn!
                            return $errorDialog.createDialogPromise("ok")
                                .then(() => {
                                // Rekurzivně zavolej znovu
                                return this.dialogDuvod(label);
                            });
                        }
                        // Data jsou OK - vrať text
                        return data.text;
                    })
                        .catch(() => {
                        throw new GError("jres:30150102"); // RC 30150102 : Akce byla stornována uživatelem
                    });
                }
                /**
                 * Dialog predani
                 * @returns Promise
                 * */
                dialogPredani() {
                    const that = this;
                    const filtryZpracovatel = {
                        DlePovolenychFazi: ["GWAROZ05", "GSAROZ01"],
                        VrfuTypAg: "roz",
                        VrfuAktivita: 100,
                        VrfuIxpDen: that.globals.EkoParams?.IxpDen,
                        aktivita: 100,
                        EkoIco: (that.globals.DatabaseParams?.RezimProvozu == 1 /* Gordic.Uct.Interface.RezimProvozuEnum.zakladni */ || that.globals.DatabaseParams?.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? that.globals.EkoParams?.Ico : null),
                        ico: (that.globals.DatabaseParams?.RezimProvozu == 1 /* Gordic.Uct.Interface.RezimProvozuEnum.zakladni */ || that.globals.DatabaseParams?.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? that.globals.EkoParams?.Ico : null),
                        ReferentAktivita: 100,
                    };
                    const filtryKompetent = {
                        aktivita: 100,
                        priz_kom: 10,
                        ico: (that.globals.EkoParams?.Ico),
                        uus: (that.globals.DatabaseParams?.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? that.globals.EkoParams?.Uus : null),
                        ucs: (that.globals.DatabaseParams?.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? that.globals.EkoParams?.Ucs : null),
                        cis_real: (that.globals.DatabaseParams?.RezimProvozu == 3 /* Gordic.Uct.Interface.RezimProvozuEnum.realizator */ ? that.globals.EkoParams?.Uus : null)
                    };
                    const $dialog = this.dialogs.simpleForm("jres:30250507", //RC 30250507 : Předání
                    Gordic.Eko.Prefabs.PredaniDokladuForm({
                        SouvisejiciViditelnost: false,
                        SouvisejiciZmena: false,
                        KompetentViditelnost: true,
                        KompetentZmena: that.globals.DatabaseParams?.PovoleniZmenitKompetenta,
                        StartFiltrZpracovatel: filtryZpracovatel,
                        StartFiltrKompetent: filtryKompetent,
                        RezimProvozu: that.globals.DatabaseParams?.RezimProvozu?.toString(),
                    }));
                    return $dialog.createDialogPromise(data => data !== undefined)
                        .then((data) => {
                        // Kontrola, zda jsou data vyplněna
                        if (!data.duvod || data.duvod.trim().length === 0
                            || !data.ixs_fun_akt || data.ixs_fun_akt.trim().length === 0) {
                            // Data nejsou vyplněna - zobraz chybu a opakuj
                            const $errorDialog = this.dialogs.error("jres:30150165"); //RC 30150165 : Požadované hodnoty nejsou vyplněné
                            return $errorDialog.createDialogPromise("ok")
                                .then(() => {
                                // Rekurzivně zavolej znovu
                                return this.dialogPredani();
                            });
                        }
                        return {
                            ixs_fun_akt: data.ixs_fun_akt,
                            ixs_fun_vyriz: data.ixs_fun_vyriz,
                            cis_real: data.cis_real,
                            ixs_ref: data.ixs_ref,
                            ixp_den: data.ixp_den,
                            duvod: data.duvod,
                        };
                    })
                        .catch(() => {
                        throw new GError("jres:30150102"); // RC 30150102 : Akce byla stornována uživatelem
                    });
                }
                /**
                 * Dialog preevidovani
                 * @returns Promise
                 * */
                dialogPreevidovani() {
                    const that = this;
                    const filtryZpracovatel = {
                        DlePovolenychFazi: ["GWAROZ05", "GSAROZ01"],
                        VrfuAktivita: 100,
                        aktivita: 100,
                        EkoIco: (that.globals.DatabaseParams?.RezimProvozu == 1 /* Gordic.Uct.Interface.RezimProvozuEnum.zakladni */ || that.globals.DatabaseParams?.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? that.globals.EkoParams?.Ico : null),
                        ico: (that.globals.DatabaseParams?.RezimProvozu == 1 /* Gordic.Uct.Interface.RezimProvozuEnum.zakladni */ || that.globals.DatabaseParams?.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? that.globals.EkoParams?.Ico : null),
                        ReferentAktivita: 100,
                    };
                    const filtryKompetent = {
                        aktivita: 100,
                        priz_kom: 10,
                        ico: (that.globals.DatabaseParams?.RezimProvozu == 1 /* Gordic.Uct.Interface.RezimProvozuEnum.zakladni */ || that.globals.DatabaseParams?.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? that.globals.EkoParams?.Ico : null),
                        uus: (that.globals.DatabaseParams?.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? that.globals.EkoParams?.Uus : null),
                        ucs: (that.globals.DatabaseParams?.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? that.globals.EkoParams?.Ucs : null),
                        cis_real: (that.globals.DatabaseParams?.RezimProvozu == 3 /* Gordic.Uct.Interface.RezimProvozuEnum.realizator */ ? that.globals.EkoParams?.Uus : null)
                    };
                    const filtryKniha = {
                        typ_ag: 50,
                        ico: that.globals.EkoParams?.Ico,
                        ucs: that.globals.EkoParams?.Ucs,
                        aktivita: 100,
                        ixp_den: "!= " + that.globals.EkoParams?.IxpDen,
                        rok: that.globals.EkoParams?.Rok, // Nabidni jen aktalni rok
                    };
                    const $dialog = that.dialogs.simpleForm("jres:30250506", //RC 30250506 : Přeevidování
                    Gordic.Eko.Prefabs.PreevidenceDokladuForm({
                        KompetentViditelnost: true,
                        KompetentZmena: that.globals.DatabaseParams?.PovoleniZmenitKompetenta,
                        ZpracovatelAktualni: that.globals.SessionParams?.IxsFun,
                        StartFiltrKniha: filtryKniha,
                        StartFiltrZpracovatel: filtryZpracovatel,
                        StartFiltrKompetent: filtryKompetent,
                        RezimProvozu: that.globals.DatabaseParams?.RezimProvozu?.toString(),
                    }));
                    return $dialog.createDialogPromise(data => data !== undefined)
                        .then((data) => {
                        // Kontrola, zda jsou data vyplněna
                        if (!data.duvod || data.duvod.trim().length === 0
                            || !data.cis_real || data.cis_real.trim().length === 0
                            || !data.ixs_fun_akt || data.ixs_fun_akt.trim().length === 0
                            || !data.ixs_fun_vyriz || data.ixs_fun_vyriz.trim().length === 0
                            || !data.ixs_ref || data.ixs_ref.trim().length === 0) {
                            // Data nejsou vyplněna - zobraz chybu a opakuj
                            const $errorDialog = this.dialogs.error("jres:30150165"); //RC 30150165 : Požadované hodnoty nejsou vyplněné
                            return $errorDialog.createDialogPromise("ok")
                                .then(() => {
                                // Rekurzivně zavolej znovu
                                return this.dialogPreevidovani();
                            });
                        }
                        return {
                            duvod: data.duvod,
                            ixp_den: data.ixp_den,
                            ixs_fun_akt: data.ixs_fun_akt,
                            ixs_ref: data.ixs_ref,
                            cis_real: data.cis_real,
                            ixs_fun_vyriz: data.ixs_fun_vyriz,
                            ixs_su: data.ixs_su,
                            subrada: data.subrada
                        };
                    })
                        .catch(() => {
                        throw new GError("jres:30150102"); // RC 30150102 : Akce byla stornována uživatelem
                    });
                }
                /**
                 * Dialog prideleni
                 * @returns Promise
                 * */
                dialogPrideleni() {
                    const that = this;
                    const filtryZpracovatel = {
                        DlePovolenychFazi: ["GWAROZ05", "GSAROZ01"],
                        VrfuTypAg: "roz",
                        VrfuAktivita: 100,
                        VrfuIxpDen: that.globals.EkoParams?.IxpDen,
                        aktivita: 100,
                        EkoIco: (that.globals.DatabaseParams?.RezimProvozu == 1 /* Gordic.Uct.Interface.RezimProvozuEnum.zakladni */ || that.globals.DatabaseParams?.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? that.globals.EkoParams?.Ico : null),
                        ico: (that.globals.DatabaseParams?.RezimProvozu == 1 /* Gordic.Uct.Interface.RezimProvozuEnum.zakladni */ || that.globals.DatabaseParams?.RezimProvozu == 2 /* Gordic.Uct.Interface.RezimProvozuEnum.uctarna */ ? that.globals.EkoParams?.Ico : null),
                        ReferentAktivita: 100,
                    };
                    const $dialog = that.dialogs.simpleForm("jres:30250508", //RC 30250508 : Přidělení
                    Gordic.Eko.Prefabs.PrideleniDokladuForm({
                        SouvisejiciViditelnost: false,
                        SouvisejiciZmena: false,
                        KompetentViditelnost: true,
                        KompetentZmena: that.globals.DatabaseParams?.PovoleniZmenitKompetenta,
                        StartFiltrZpracovatel: filtryZpracovatel,
                    }));
                    return $dialog.createDialogPromise(data => data !== undefined)
                        .then((data) => {
                        // Kontrola, zda jsou data vyplněna
                        if (!data.duvod || data.duvod.trim().length === 0
                            || !data.ixs_fun_akt || data.ixs_fun_akt.trim().length === 0
                            || !data.ixs_su || data.ixs_su.trim().length === 0) {
                            // Data nejsou vyplněna - zobraz chybu a opakuj
                            const $errorDialog = this.dialogs.error("jres:30150165"); //RC 30150165 : Požadované hodnoty nejsou vyplněné
                            return $errorDialog.createDialogPromise("ok")
                                .then(() => {
                                // Rekurzivně zavolej znovu
                                return this.dialogPrideleni();
                            });
                        }
                        return {
                            duvod: data.duvod,
                            ixs_fun_akt: data.ixs_fun_akt,
                            ixs_su: data.ixs_su
                        };
                    })
                        .catch(() => {
                        throw new GError("jres:30150102"); // RC 30150102 : Akce byla stornována uživatelem
                    });
                }
            };
            GDetailDokladuTab = __decorate([
                gcontent
            ], GDetailDokladuTab);
            WebClient.GDetailDokladuTab = GDetailDokladuTab;
            /**
            * vyberoveOkno
            *
            * @author Tomáš Kareš
            * @since 480.1.0.66
            */
            let vyberoveOkno = class vyberoveOkno extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    this.that = this;
                }
                prepareContent(params /*content: this & GContent, ...params: any[]*/) {
                    var that = this;
                    var defaultForm = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1", tabLabel: "nevim" });
                    defaultForm.addRow("").addField("gradio", {
                        name: "actionRadios",
                        itemClass: "", // případně lze přidt pevné velikosti viz xwiki
                        groupName: "nextAction",
                        radios: [
                            { value: "20", label: "jres:30250367" }, //RC 30250367 : Centrální
                            { value: "10", label: "jres:30250368" } //RC 30250368 : Decentrální
                        ]
                    });
                    this.actions = new GActionList({
                        actOk: Gordic.Eko.Action.actionOk({
                            autoFocus: true,
                            enabled: true,
                            run: function () {
                                var dto = {};
                                that.findFields().gfield("model", "collect", dto);
                                that.close(dto);
                            }
                        }),
                        actClose: Gordic.Eko.Action.actionZrusit({
                            enabled: true,
                            run: function () {
                                that.tryClose();
                            }
                        }),
                    });
                    const menuPars = this.actions.createBar(["actOk!", "actClose*"]);
                    this.commandBar(menuPars);
                    //that.commandBar([{
                    //    customClass: "g-button--primary",
                    //    action: new GAction({
                    //        name: "acOKButton", caption: GDlg.mbbOk.text, run: function (ev, ctx) { //GDlg.mbbClose.text
                    //            var dto = {};
                    //            that.findFields().gfield("model", "collect", dto);
                    //            that.close(dto);
                    //            //that.close(that.getPredkontaceAction());
                    //        }
                    //    })
                    //},
                    //{
                    //    action: new GAction({
                    //        name: "acCloseButton", caption: GDlg.mbbClose.text, run: function (ev, ctx) { //GDlg.mbbClose.text
                    //            that.close(undefined);
                    //        }
                    //    })
                    //}
                    //])
                    $.newDiv().appendTo(that.element).gform("createFrom", defaultForm);
                    that.findFields().gfield("model", "apply", { actionRadios: "20" })
                        .first()
                        .gfield("focus");
                    //let item = that.findFields("actionRadios").focus();
                    //if (item.length > 0)
                    //    item[0].focus();
                    //that.find((menuPars[0].id).focus();
                    //var index = { index: params!.index };
                    //var model = this.autoLoadParams.model ? this.transformToModel(this.autoLoadParams.model, index) : { copyFrom: index, copyFromUEA: index, actionRadios: "0" }
                    //that.findFields().gfield("model", "apply", model, { initialValues: true, setFlags: { triggerChange: true } });
                }
            };
            vyberoveOkno = __decorate([
                Decorators.gcontent
            ], vyberoveOkno);
            WebClient.vyberoveOkno = vyberoveOkno;
            ;
            ;
            ;
            ;
            ;
            // Trida pro naplneni stromu IK
            class GRozIKStruktura {
            }
        })(WebClient = Roz.WebClient || (Roz.WebClient = {}));
    })(Roz = Gordic.Roz || (Gordic.Roz = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbERva2xhZHVUYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGV0YWlsRG9rbGFkdVRhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBb3JMZjtBQXByTEQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBb3JMbkI7SUFwckxnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0Fvckw3QjtRQXByTG9CLFdBQUEsU0FBUztZQUsxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBRW5DLHdHQUF3RztZQUN4Ryw2Q0FBNkM7WUFFN0MsZ0VBQWdFO1lBQ2hFLE1BQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztZQW9CdkIsQ0FBQztZQTBDRCxDQUFDO1lBU0YsMkJBQTJCO1lBQzNCLHdHQUF3RztZQUN4Rzs7O2lCQUdLO1lBRUwsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxPQUFBLHFCQUFxQztnQkFBNUU7b0JBRUksMENBQTBDO29CQUMxQyx3QkFBd0I7b0JBQ3hCLGlHQUFpRzs7b0JBV2pHLHNIQUFzSDtvQkFDOUcsbUJBQWMsR0FBaUQsSUFBSSxDQUFDO29CQTBCNUUsb0RBQW9EO29CQUNwRCxzQ0FBc0M7b0JBRXRDLGtEQUFrRDtvQkFDbEQsb0NBQW9DO29CQUVwQyxzREFBc0Q7b0JBQzlDLGtCQUFhLEdBQVksS0FBSyxDQUFDO29CQUV2Qzs7Ozt5QkFJSztvQkFDRyxnQkFBVyxHQUFZLEtBQUssQ0FBQztvQkFFckMsYUFBYTtvQkFDYixpREFBaUQ7b0JBQ2pELGNBQWM7b0JBQ04sZUFBVSxHQUFZLEtBQUssQ0FBQztvQkFFcEMsYUFBYTtvQkFDYix5Q0FBeUM7b0JBQ3pDLGNBQWM7b0JBQ04sYUFBUSxHQUFZLEtBQUssQ0FBQztvQkFTbEMsZUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxF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SkFBOEo7b0JBRTlKLGdIQUFnSDtnQkFDcEgsQ0FBQzthQUdKLENBQUE7WUE3RVksWUFBWTtnQkFEeEIsVUFBVSxDQUFDLFFBQVE7ZUFDUCxZQUFZLENBNkV4QjtZQTdFWSxzQkFBWSxlQTZFeEIsQ0FBQTtZQU9BLENBQUM7WUFLRCxDQUFDO1lBVUQsQ0FBQztZQUlELENBQUM7WUFNRCxDQUFDO1lBQ0YsK0JBQStCO1lBQy9CLE1BQU0sZUFBZTthQTZEcEI7UUFDTCxDQUFDLEVBcHJMb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBb3JMN0I7SUFBRCxDQUFDLEVBcHJMZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBb3JMbkI7QUFBRCxDQUFDLEVBcHJMUyxNQUFNLEtBQU4sTUFBTSxRQW9yTGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlJvei5XZWJDbGllbnQge1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIER0b1R5cGUgPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96RG9rbGFkT3V0RHRvO1xyXG4gICAgZXhwb3J0IHR5cGUgVXNlZENvbXBvbmVudHMgPSBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXJDb21wb25lbnRzLkdMaXN0Q29udHJvbHNFeHRlbnNpb25zPER0b1R5cGU+ICYgR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyQ29tcG9uZW50cy5HaW5EZXNjUHJvcHNFeHRlbnNpb25zICYgR29yZGljLlNzbC5EZXRhaWxCdWlsZGVyQ29tcG9uZW50cy5Tc2xQcm9maWxEb2t1bWVudEVrb0NvbXBvbmVudENvbnRlbnRFeHRlbnNpb25zUHVibGljO1xyXG5cclxuICAgIHZhciBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vI3JlZ2lvbiBLb25zdGFudHkgYSBlbnVteSBwcm8gdHJpZHUgZGV0YWlsdVxyXG5cclxuICAgIC8vIERlbGthIHpvYnJhemVuaSB6YXNrcnRhdmF0a2EgcG8gYWtjaSAoaG9kbm90YSBwcm8gc2V0UGVuZGluZylcclxuICAgIGNvbnN0IHBlbmRpbmdUaW1lID0gMTAwO1xyXG5cclxuICAgIC8vIFNlem5hbSBwb2xpY2VrIG5hIGRldGFpbHUgZG9rbGFkdVxyXG4gICAgY29uc3QgZW51bSBGaWVsZHMge1xyXG4gICAgICAgIERhdHVtID0gJ2Zvcm1EYXR1bUZpZWxkJyxcclxuICAgICAgICBSb2sgPSAnZm9ybVJva0ZpZWxkJyxcclxuICAgICAgICBNZXNpYyA9ICdmb3JtTWVzaWNGaWVsZCcsXHJcbiAgICAgICAgRGVuID0gJ2Zvcm1EZW5GaWVsZCcsXHJcbiAgICAgICAgRHJkID0gJ2Zvcm1EcmRGaWVsZCcsXHJcbiAgICAgICAgQ2lzbG9Eb2tsYWR1ID0gJ2Zvcm1DaXNsb0Rva2xhZHVGaWVsZCcsXHJcbiAgICAgICAgTWFuYWdlckNpbGUgPSAnZm9ybU1hbmFnZXJDaWxlRmllbGQnLFxyXG4gICAgICAgIENhc3RrYSA9ICdmb3JtQ2FzdGthRmllbGQnLFxyXG4gICAgICAgIFVjdGFybmEgPSAnZm9ybVVjdGFybmFGaWVsZCcsXHJcbiAgICAgICAgUG9waXMgPSAnZm9ybUxvbmdQb3Bpc0ZpZWxkJywgLy8gMTkuMy4yMDI1IFRLOiBwcmVqbWVub3ZhbmkgeiBkdXZvZHUga29saXplIHMgcG9waXNlbSB2IGhsYXZpY2VcclxuICAgICAgICBBSGxhdmlja2EgPSAnZm9ybUFIZWFkZXJGaWVsZCcsXHJcbiAgICAgICAgQ2lzbG9FZHNTbXZzID0gJ2Zvcm1DaXNsb0Vkc0ZpZWxkJyxcclxuICAgICAgICAvL0NKS2FwXHJcbiAgICAgICAgLy9DSk9zc1xyXG4gICAgICAgIC8vSm1LYXBcclxuICAgICAgICAvL0ptT3NzXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFNlem5hbSBha2NpIG5hIGRldGFpbHUgZG9rbGFkdVxyXG4gICAgY29uc3QgZW51bSBBY3Rpb25zIHtcclxuICAgICAgICBQb2RhbmkgPSBcImFjdFJvelBvZGFuaVwiLFxyXG4gICAgICAgIEV2aWRlbmNlID0gXCJhY3RSb3pFdmlkZW5jZVwiLFxyXG4gICAgICAgIE9wcmF2YUhsYXZpY2t5ID0gXCJhY3RSb3pPcHJhdmFIbGF2aWNreVwiLFxyXG4gICAgICAgIFpydXNpdE9wcmF2YUhsYXZpY2t5ID0gXCJhY3RSb3pacnVzaXRPcHJhdmFIbGF2aWNreVwiLFxyXG4gICAgICAgIFNjaHZhbGVuaSA9IFwiYWN0Um96U2NodmFsZW5pXCIsXHJcbiAgICAgICAgWnJ1c2l0U2NodmFsZW5pID0gXCJhY3RSb3pacnVzaXRTY2h2YWxlbmlcIixcclxuICAgICAgICBWYWxpZGFjZSA9IFwiYWN0Um96VmFsaWRhY2VcIixcclxuICAgICAgICBacnVzaXRWYWxpZGFjZSA9IFwiYWN0Um96WnJ1c2l0VmFsaWRhY2VcIixcclxuICAgICAgICBPZGVzbGFuaVNQID0gXCJhY3RSb3pPZGVzbGFuaVNQXCIsXHJcbiAgICAgICAgUmVhbGl6YWNlID0gXCJhY3RSb3pSZWFsaXphY2VcIixcclxuICAgICAgICBQb3R2cnplbmkgPSBcImFjdFJvelBvdHZyemVuaVwiLFxyXG4gICAgICAgIFN0b3JubyA9IFwiYWN0Um96U3Rvcm5vXCIsXHJcbiAgICAgICAgWnJ1c2l0U3Rvcm5vID0gXCJhY3RSb3pacnVzaXRTdG9ybm9cIixcclxuICAgICAgICBVemF2cmVuaSA9IFwiYWN0Um96VXphdnJlbmlcIixcclxuICAgICAgICBaYXBpc3kgPSBcImFjdFJvelphcGlzeVwiLFxyXG5cclxuICAgICAgICBQcmVldmlkZW5jZSA9IFwiYWN0Um96UHJlZXZpZGVuY2VcIixcclxuICAgICAgICBQcmVkYW5pID0gXCJhY3RSb3pQcmVkYW5pXCIsXHJcbiAgICAgICAgUHJldnpldGkgPSBcImFjdFJvelByZXZ6ZXRpXCIsXHJcbiAgICAgICAgUHJpZGVsZW5pID0gXCJhY3RSb3pQcmlkZWxlbmlcIixcclxuICAgICAgICBWcmFjZW5pRG9XZmwgPSBcImFjdFJvelZyYWNlbmlEb1dmbFwiLFxyXG5cclxuICAgICAgICBQb3Jpem92YWNOb3Z5ID0gXCJhY3RSb3pQb2xvemt5Tm92eVJhZGVrXCIsXHJcbiAgICAgICAgUG9yaXpvdmFjVWxveml0ID0gXCJhY3RSb3pQb2xvemt5VWxveml0XCIsXHJcbiAgICAgICAgUG9yaXpvdmFjWnJ1c2l0ID0gXCJhY3RSb3pQb2xvemt5WnJ1c2l0XCIsXHJcbiAgICAgICAgUG9yaXpvdmFjT3ByYXZpdCA9IFwiYWN0Um96UG9sb3preU9wcmF2aXRcIixcclxuICAgICAgICBQb3Jpem92YWNPZHN0cmFuaXQgPSBcImFjdFJvelBvbG96a3lPZHN0cmFuaXRcIixcclxuICAgICAgICBQb3Jpem92YWNQcmVka29udGFjZSA9IFwiYWN0Um96UG9sb3preVByZWRrb250YWNlXCIsXHJcbiAgICAgICAgUG9yaXpvdmFjSW1wb3J0U2NocmFua2EgPSBcImFjdHRSb3pQb2xvemt5SW1wb3J0WmVTY2hyYW5reVwiLFxyXG4gICAgICAgIFBvcml6b3ZhY0ltcG9ydFNvdWJvciA9IFwiYWN0dFJvelBvbG96a3lJbXBvcnRaZVNvdWJvcnVcIixcclxuICAgICAgICBQb3Jpem92YWNQcmVrb250YWNlVnl0dm9yaXRPem5hY2VuZSA9IFwiYWN0UHJlZGtvbnRhY2VPem5cIixcclxuICAgICAgICBQb3Jpem92YWNQcmVrb250YWNlVnl0dm9yaXRWc2VjaCA9IFwiYWN0UHJlZGtvbnRhY2VWc2VjaFwiLFxyXG5cclxuICAgICAgICBJSVNTUFN0cnVrdHVyYUt1bXVsb3ZhdEJlek51bCA9IFwiYWN0SUlJU1NQS3VtdWxvdmF0QmV6TnVsXCIsXHJcbiAgICAgICAgSUlTU1BTdHJ1a3R1cmFLdW11bG92YXREbGVJSVNTUCA9IFwiYWN0SUlJU1NQS3VtdWxvdmF0RGVsSUlTU1BcIixcclxuICAgICAgICBJSVNTUFN0cnVrdHVyYUJlekt1bXVsYWNlID0gXCJhY3RJSUlTU1BCZXpLdW11bGFjZVwiLFxyXG4gICAgICAgIElJU1NQU3RydWt0dXJhWmFIbGF2aWNrdSA9IFwiYWN0SUlJU1NaYUhsYXZpY2t1XCJcclxuICAgICAgICBcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmljZSBpbnRlcmZhY2UgcHJvIHVsb3plbmkgemFwaXN1IHYgcG9yaXpvdmFjaSBzIHByaXpuYWtlbSBub3ZlaG8vcHV2b2RuaWhvIHJhZGt1XHJcbiAgICAgKiAqL1xyXG4gICAgaW50ZXJmYWNlIEdSb3pkcGVwRHRvV2l0aEZsYWcgZXh0ZW5kcyBVY3QuSW50ZXJmYWNlLkdSb3pkcGVwRHRvIHtcclxuICAgICAgICBuZXdSb3c/OiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vI2VuZHJlZ2lvbiBTZXpuYW0gcG9saWNla1xyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWlsIHJvenBvY3RvdmVobyBkb2tsYWR1XHJcbiAgICAgKiBAYXV0aG9yOiBLLktyYXRvY2h2aWxcclxuICAgICAqICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGV0YWlsRG9rbGFkdVRhYiBleHRlbmRzIEdEZXRhaWxCdWlsZGVyQ29udGVudDxVc2VkQ29tcG9uZW50cz4gaW1wbGVtZW50cyBJR0NvbnRlbnQsIEdvcmRpYy5Fa28uV2ViQ2xpZW50LkdFa29TY2h2YWxGS1Nlem5hbUV4dGVuc2lvbiB7XHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8vI3JlZ2lvbiBBdHJpYnV0eSB0cmlkeVxyXG4gICAgICAgIC8vIGpzb3UgdG8gcHJvbWVubmUgcHJvIGRhdGEgemFzbGFuYSB6IEMjIGtvZHUgYSBvZGthenkgbmEgVFMga29tcG9uZW50eSBzZSBrdGVyeW1pIGJ1ZHUgcHJhY292YXRcclxuXHJcbiAgICAgICAgLy8gVmxhc3Rub3N0IGRlZmlub3ZhbmEgamFrbyBKc29uUHJvcGVydHkgdiBHRGV0YWlsRG9rbGFkdVRhYi5jc1xyXG4gICAgICAgIHByaXZhdGUgaXhwOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIC8vIFBvc2xlZG5pIGFrY2UgbmEga3Rlcm91IHV6aXZhdGVsIGtsaWtudWwuIEplIHphc2xhbmEgamFrbyBKc29uUHJvcGVydHkgemUgc2VydmVydVxyXG4gICAgICAgIHByaXZhdGUgYWN0aW9uOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmU7XHJcblxyXG4gICAgICAgIC8vIERhdG92eSBvYmpla3QgcyBkZXRhaWxlbSBkb2tsYWR1IHphc2xhbnkgcG9tb2NpIENvbnRlbnRWYWx1ZXMuQWRkT2JqZWN0IHogR0RldGFpbERva2xhZHVUYWIuY3NcclxuICAgICAgICBwcml2YXRlIGRva2xhZDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1JvekRva2xhZE91dER0bzsgLy8gRGF0YSBuYWN0ZW5hIHByZWQgc3B1c3RlbmltIENvbnRlbnRSZWFkeVxyXG5cclxuICAgICAgICAvLyBVbG96ZW5hIGtvcGllIGRva2xhZHUgcG8gcHJlZGNob3ppIGFrY2kuIFZ5dXppdmEgc2UgcHJpIHpydXNlbmkgb3ByYXZ5IGRva2xhZHUvIHpydXNlbmkgcG9yaXpvdmFuaSBjaSBvcHJhdnkgemFwaXN1XHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2aW91c0Rva2xhZDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1JvekRva2xhZE91dER0byB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBSZXplcnZhY2UgdmUgc3RhdG5pIHBva2xhZG5lXHJcbiAgICAgICAgcHJpdmF0ZSBpc1JlemVydnVqZVZJSVNTUDogQm9vbGVhbjtcclxuXHJcbiAgICAgICAgLy8gWm9icmF6ZW5pIHphbG96a3kgU3RydWt0dXJhIHYgSUlTU1BcclxuICAgICAgICBwcml2YXRlIGlzU2hvd1RhYlN0cnVrdHVyYUlJU1NQOiBib29sZWFuO1xyXG5cclxuICAgICAgICAvLyBab2JyYXplbmkgemFsb3preSB1a2F6YXRlbGVcclxuICAgICAgICBwcml2YXRlIGlzU2hvd1RhYlVrYXphdGVsZTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgLy8gVHlwIHBvcml6b3ZhY2VcclxuICAgICAgICBwcml2YXRlIHR5cFBvcml6b3ZhY2U6IEdSb3pUeXBQb3Jpem92YWNlO1xyXG5cclxuICAgICAgICAvLyBEYXRvdnkgb2JqZWt0IHMgdmFsaWRhdG9yeSB6YXNsYW55IHBvbW9jaSBDb250ZW50VmFsdWVzLkFkZE9iamVjdCB6IEdEZXRhaWxEb2tsYWR1VGFiLmNzIChPdmVyaXQgY28gdiB0b20gamUpXHJcbiAgICAgICAgcHJpdmF0ZSB2YWxpZGF0b3JzOiBhbnk7XHJcblxyXG4gICAgICAgIC8vIERhdG92eSBvYmpla3QgcyBvYmVjbnltaSBkYXR5IGFwbGlrYWNlXHJcbiAgICAgICAgcHVibGljIGdsb2JhbHM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pHbG9iYWxzRHRvO1xyXG5cclxuXHJcbiAgICAgICAgLy8gQXRyaWJ1dHkgcHJvIHByYWNpIHYgVFNcclxuXHJcbiAgICAgICAgLy8gT2RrYXogbmEgb2JqZWt0IHBvcml6b3ZhY2VcclxuICAgICAgICBwcml2YXRlICRwb3Jpem92YWM6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIC8vLy8gQXRyaWJ1dCBvem5hY3VqaWNpLCB6ZSBwcm9iaWhhIGVkaXRhY2UgaGxhdmlja3lcclxuICAgICAgICAvL3ByaXZhdGUgZWRpdEhlYWRlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLy8vIEF0cmlidXQgb3puYWN1amljaSwgemUgcHJvYmloYSBlZGl0YWNlIHphcGlzdVxyXG4gICAgICAgIC8vcHJpdmF0ZSBlZGl0Um93czogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyB6YWthemFuaSBlZGl0YWNlIGRpa3kgem1lbmUgcHJvZmlsdSAocHJvZmlsIHptZW5lbilcclxuICAgICAgICBwcml2YXRlIGNoYW5nZVByb2ZpbGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJpem5hayB2a2xhZGFuaSBub3ZlaG8gcmFka3VcclxuICAgICAgICAgKiBOZWpzZW0gc2Nob3BlbiB2IG1ldG9kZSBwb3Jpem92YWNlIENvbW1pdCByb3plem5hdCwgamVzdGxpIGJ5bCByYWRlayB2bG96ZW55IG5lYm8gc2Ugb3ByYXZ1amUuXHJcbiAgICAgICAgICogVE9ETzogWmppc3RpdCwgamVzdGxpIHRvIFRvbWFzIHBvdXppdmEgYSBwb2t1ZCBuZSwgdGFrIHZ5aG9kaXQuIEphIHRvIG5lcG91eml2YW1cclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgbmV3Um93U3RhcnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBQcml6bmFrLCB6ZGEgamUgcm96ZWRpdG92YW5hIGhsYXZpY2thIGRva2xhZHVcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByaXZhdGUgZWRpdEhlYWRlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFByaXpuYWssIHpkYSBqc291IHJvemVkaXRvdmFuZSB6YXBpc3lcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByaXZhdGUgZWRpdFJvd3M6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICBBdHJpYnV0IHNwdXN0ZW5lIHByZWRrb250YWNlXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgcHJlRmlsbEluUHJvZ3Jlc3M6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGxvZ09wdGlvbnMgPSB7IG5hbWU6IFwiR0RldGFpbERva2xhZHVUYWJcIiwgYXV0aG9yQ29kZTogMzAyLCBmaWxlOiBcIkdEZXRhaWxEb2tsYWR1VGFiLnRzXCIgfTtcclxuXHJcbiAgICAgICAgLy8gVW1pc3RlbmkgemFwaXN1XHJcbiAgICAgICAgcHJpdmF0ZSB1bWlzdGVuaVphcGlzdTogR29yZGljLlJvei5BcHBTZXR0aW5ncy5FR1BvbG96a3lWaWV3ID0gR29yZGljLlJvei5BcHBTZXR0aW5ncy5FR1BvbG96a3lWaWV3LlphbG96a2E7XHJcblxyXG4gICAgIFxyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBBdHJpYnV0eVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWxhZ2F0IHZvbGVueSBwcmVkIHNjaHZhbG92YW5pbVxyXG4gICAgICAgICAqIEBwYXJhbSBpeHBcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBiZWZvcmVOb3ZlU2NodmFsKGl4cDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVsZWdhdCB6bWVueSBzY2h2YWxvdmFuaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFNjaHZhbENoYW5nZWQ/OiAoKSA9PiB7fTtcclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLy8jcmVnaW9uIE1ldG9kYSBvbkNvbnRlbnRSZWFkeSAtIHpkZSBqaXogcG91emUgcHJhY3VqaSBzIHZ5cGxuZW55bWkgZGF0eSB2eWJ1ZG92YW55bWkgdiByYW1jaSBtZXRvZCBidWlsZGVydVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBvbkNvbnRlbnRSZWFkeSAtIG1ldG9kYSBrdGVyYSBzZSBzcHVzdGkgcHJpIHpvYnJhemVuaSBkZXRhaWx1XHJcbiAgICAgICAgICogICAgICBaZGUgdcW+IGJ1aWxkZXIgZG9rb27EjWlsIHByw6FjaSBhIG3Fr8W+ZSBuw6FzbGVkb3ZhdCB2bGFzdG7DrSBrw7NkLlxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKTogdm9pZCB7ICAvLyBMb2FkICBcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmYXVsdG5pIG5hc3RhdmVuaSBhdHJpYnV0dVxyXG4gICAgICAgICAgICB0aGlzLnByZUZpbGxJblByb2dyZXNzID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBJZGVudGlmaWthdG9yIGNvbnRlbnR1XHJcbiAgICAgICAgICAgIC8vdGhpcy51aWQgPSBcIkRldGFpbFJvekRva2xhZHUjXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBmbGFzaCBzZSBzdGF2ZW0ga25paHlcclxuICAgICAgICAgICAgRWtvLlV0aWxzLlNob3dFa29Cb29rU3RhdGVGbGFzaCh0aGlzLCB0aGlzLmdsb2JhbHMuRWtvUGFyYW1zPy5Ba3RTdWJyYWR5ISk7XHJcblxyXG4gICAgICAgICAgICAvLyBab2JyYXplbmkgY2VsZWhvIGRva2xhZHVcclxuICAgICAgICAgICAgdGhhdC51cGRhdGVWYWx1ZUZpZWxkcygpOyAvLyBWeXBsbmltIHZzZWNobnkgcG9sb3preSBobGF2aWNreVxyXG4gICAgICAgICAgICB0aGF0LnVwZGF0ZUVuYWJsZUZpZWxkcygpOyAvLyBOYXN0YXZpbSBqZWppY2ggcHJpc3R1cG5vc3RcclxuICAgICAgICAgICAgdGhhdC51cGRhdGVFbmFibGVNZW51RG9rbGFkKCk7IC8vIE5hc3RhdmltIHByaXN0dXBub3N0IG1lbnVcclxuICAgICAgICAgICAgdGhhdC51cGRhdGVNZW51UG9yaXpvdmFjKGZhbHNlKTsgLy8gTmFzdGFjaW0gcHJpc3R1cG5vc3QgbWVudSBwb3Jpem92YWNlXHJcbiAgICAgICAgICAgIHRoYXQudXBkYXRlU3RhdHVzQmFyKCk7IC8vIEEgbmFrb25lYyB2eXBsbmltIHN0YXZ5XHJcblxyXG4gICAgICAgICAgICAvLyBQbyBsb2FkdSBtdXNpbSBuYXN0YXZpdCBwcml6bmFrLCBwcm90b3plIHNlIHZzZWNobm8gbmFzdGF2dWplIHpub3Z1XHJcbiAgICAgICAgICAgIHRoaXMuZWRpdEhlYWRlciA9IHRoaXMuYWN0aW9uID09IFVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlBvZGFuaSB8fCB0aGlzLmFjdGlvbiA9PSBVY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5PcHJhdmE7XHJcblxyXG4gICAgICAgICAgICAvLyBOYXN0YXZlbmkgZm9jdXN1IG5hIGNpc2xvIGRva2xhZHVcclxuICAgICAgICAgICAgLy8gRGxlIHN0YXZ1IGRva2xhZHUgYnljaCBtxJtsIGFsZSByb3psaXNvdmF0LCBrYW0gcHJlc25lIHNlIGZvY3VzIHVtaXN0aVxyXG4gICAgICAgICAgICAvLyBQb2t1ZCBuZWpzZW0gdiBvcHJhdmUsIG5hc3RhdiBmb2N1cyBuYSBQSURcclxuICAgICAgICAgICAgLy8gSmluYWsgYnljaCBtZWwgcm96aG9kbm91dCBkbGUgc3RhdnUgZG9rbGFkdSwgamUgdG8gbmUgdnpkeSBuYSB0eXB1IGRva2xhZHVcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmVkaXRIZWFkZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLklkKS5nZmllbGQoXCJmb2N1c1wiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLlR5cERva2xhZHUpLmdmaWVsZChcImZvY3VzXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLy8jcmVnaW9uIFByYWNlIHMgYWtjZW1pIG5hZCBkb2tsYWRlbVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3Jlbmkga29sZWtjZSBha2NpIGRvc3R1cG55Y2ggbmEgZGV0YWlsdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIE1ldG9kYSB2eXR2YXJpIGtvbGVrY2kgdnNlY2ggYWtjaSwga3RlcmUgYnVkb3UgZG9zdHVwbmUgdiBkZXRhaWx1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0dBY3Rpb25MaXN0fSBrb2xla2NlIGRvc3R1cG55Y2ggYWtjaVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IE9iamVjdExpdGVyYWw8R0FjdGlvblBhcmFtc0RlZk9iaj4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBWeXR2b3JpbSBvYmpla3QgbGl0ZXJhbCBrb2xla2NlIGFrY2lcclxuICAgICAgICAgICAgLy8gVnNlY2hueSBmdW5rY2UgR29yZGljLkVrby5BY3Rpb24uYWN0aW9uLi4uIHZyYWNpIG9iamVrdCBHQWN0aW9uUGFyYW1zRGVmT2JqXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBbQWN0aW9ucy5Qb2RhbmldOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25Qb2RhdCh7IC8vIGxpdGVyYWwgKHN0cmluZywgR0FjdGlvbilcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVxdWVzdDogVWN0LkludGVyZmFjZS5HUm96RG9rbGFkSW5EdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfem1lbmE6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5Qb2RhbmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5dHZvcmltIHNpIHByb21pc2UgbmEgcHJvdmFkZW55IGNoYWluIGFrY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSB0aGF0LmV4ZWN1dGVBY3Rpb24ocmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBab2JyYXogcHJvYmloYWppY2kgYWtjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcocHJvbWlzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQbyBwcm92ZWRlbmkgYWtjZSB6cHJhY3VqIG9kcG92ZWQgYSBwcmVrcmVzbGkgZGV0YWlsIGkgc2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdnkgcGlkLCBtdXNpbSB2eXR2b3JpdCBjZWx5IG5vdnkgY29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMjQuMTEuMjUgS0sgLSBub3ZlIHNlIHZyYWNpIGNlbHkgZG9rbGFkIChpIGtkeXogYmV6IGRhdCksIGplIG51dG5vIHNpIHNhaG5vdXQgZG8gaGxhdmlja3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmxvYWQ/Lih7IGl4cDogcmVzcG9uc2UuRGF0YS5peHAsIGFjdGlvbjogcmVzcG9uc2UuRGF0YS5hY3Rpb24gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5sb2FkPy4oeyBpeHA6IHJlc3BvbnNlLmRhdGEuaGVhZGVyLml4cCwgYWN0aW9uOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUG9kYW5pIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOYXN0YXYgcHJpem5haywgemUgYnlsYSB6YWhhamVuYSBlZGl0YWNlIGhsYXZpY2t5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVkaXRIZWFkZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIFtBY3Rpb25zLkV2aWRlbmNlXTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRXZpZG92YXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0OiBVY3QuSW50ZXJmYWNlLkdSb3pEb2tsYWRJbkR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhhdC5kb2tsYWQuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0X3ptZW5hOiB0aGF0LmRva2xhZC5oZWFkZXI/LmRhdF96bWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLkV2aWRlbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOYXN0YXYgcHJpem5haywgemUgYnlsYSB1a29uY2VuYSBlZGl0YWNlIGhsYXZpY2t5LiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVG90byBtdXNpIGJ5dCBuYXN0YXZlbm8gcHJlZCBzcHVzdGVuaW0gY2hhaW4sIGFieSBzZSBuZXNwdXN0aWxhIHBvZG1pbmthIG5hIHJvemVkaXRvdmFub3UgaGxhdmlja3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lZGl0SGVhZGVyID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXR2b3JpbSBzaSBwcm9taXNlIG5hIHByb3ZhZGVueSBjaGFpbiBha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gdGhhdC5leGVjdXRlQWN0aW9uKHJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWm9icmF6IHByb2JpaGFqaWNpIGFrY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHByb21pc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKChyZXNwb25zZSkgPT4geyAvLyByZXNwb25zZSBvYnNhaHVqZSAuZGF0YSBzIG1hbHltIGQgIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVWxveiBzaSBwdXZvZG5pIGtvcGlpIG9iamVrdHUgLSBkZWVwIGNvcHksIG5lIHJlZmVyZW5jaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aW91c0Rva2xhZCA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGF0LmRva2xhZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnJhY2VuYSBkYXRhIHNsb3VjaW0gZG8gbm92ZWhvIG9iamVrdHUgZG9rbGFkdS4gUHJvdmVkdSBobHVib2tvdSBrb3BpaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5leHRlbmQodHJ1ZSwgdGhhdC5kb2tsYWQsIHJlc3BvbnNlLmRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgYXBsaWt1aiB2eXNsZWRuZSB1cHJhdmVuZSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZVZhbHVlRmllbGRzKCk7IC8vIFptZW5hIGhvZG5vdCBuYSBwb2xpY2ggaGxhdmlja3kgKGhvZG5vdHkgeiBEQilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudXBkYXRlRW5hYmxlRmllbGRzKCk7IC8vIFV6YW1jZW5pIHBvbGljZWsgcG8gZXZpZGVuY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudXBkYXRlRW5hYmxlTWVudURva2xhZCgpOyAvLyBabWVuYSBwcmlzdHVwbm9zdGkgbWVudVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVNZW51UG9yaXpvdmFjKCk7IC8vIFBvIGV2aWRlbmNpIHNlIG11c2kgenByaXN0dXBuaXQgaSB0bGFjaXRrYSBwb3Jpem92YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZVN0YXR1c0JhcigpOyAvLyBBIHptZW4gaSBwb3BpcyBzdGF2dSBkb2tsYWR1XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTcHVzdGVuaSBvcHJhdnkgaGxhdmlja3kgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgW0FjdGlvbnMuT3ByYXZhSGxhdmlja3ldOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25PcHJhdml0KHtcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVxdWVzdDogVWN0LkludGVyZmFjZS5HUm96RG9rbGFkSW5EdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHRoYXQuZG9rbGFkLml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF96bWVuYTogdGhhdC5kb2tsYWQuaGVhZGVyPy5kYXRfem1lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5PcHJhdmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5dHZvcmltIHNpIHByb21pc2UgbmEgcHJvdmFkZW55IGNoYWluIGFrY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSB0aGF0LmV4ZWN1dGVBY3Rpb24ocmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBab2JyYXogcHJvYmloYWppY2kgYWtjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcocHJvbWlzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBWIG9kcG92ZWRpIGplIHZyYWNlbnkgZG9rbGFkIHMgbmFzdGF2ZW5pbSBwcmF2XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVsb3ogc2kgcHV2b2RuaSBrb3BpaSBvYmpla3R1IC0gZGVlcCBjb3B5LCBuZSByZWZlcmVuY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpb3VzRG9rbGFkID0gJC5leHRlbmQodHJ1ZSwge30sIHRoYXQuZG9rbGFkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnJhY2VuYSBkYXRhIHNsb3VjaW0gZG8gbm92ZWhvIG9iamVrdHUgZG9rbGFkdS4gUHJvdmVkdSBobHVib2tvdSBrb3BpaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIHRoYXQuZG9rbGFkLCByZXNwb25zZS5EYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQSBhcGxpa3VqIHZ5c2xlZG5lIHVwcmF2ZW5lIGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZUVuYWJsZU1lbnVEb2tsYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZUVuYWJsZUZpZWxkcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudXBkYXRlTWVudVBvcml6b3ZhYygpOyAvLyBabmVwcmlzdHVwbmVuaSBwb3Jpem92YWNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5hc3RhdiBwcml6bmFrLCB6ZSBieWxhIHphaGFqZW5hIGVkaXRhY2UgaGxhdmlja3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVkaXRIZWFkZXIgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gWnJ1c2VuaSBvcHJhdnkgaGxhdmlja3lcclxuICAgICAgICAgICAgICAgIFtBY3Rpb25zLlpydXNpdE9wcmF2YUhsYXZpY2t5XTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWnJ1c2l0Wm1lbnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOZW5pIHBvdHJlYmEgbmljIG5hY2l0YXQgbmEgc3RyYW5lIHNlcnZlcnUuIFBvdXplIHZyYXRpbSBwdXZvZG5pIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJldmVkIHB1dm9kbmkga29waWkgb2JqZWt0dSBkbyBha3R1YWxuaWhvIGRva2xhZHUgLSBkZWVwIGNvcHksIG5lIHJlZmVyZW5jaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRva2xhZCA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGF0LnByZXZpb3VzRG9rbGFkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgcHJlcGlzIHZzZWNobnkgaG9kbm90eSBuYSBwdXZvZG5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudXBkYXRlVmFsdWVGaWVsZHMoKTsgLy8gWm1lbmEgaG9kbm90IG5hIHBvbGljaCBobGF2aWNreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZUVuYWJsZUZpZWxkcygpOyAvLyBabWVuYSBwcmlzdHVwbm9zdGkgcG9saWNla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZUVuYWJsZU1lbnVEb2tsYWQoKTsgLy8gWm1lbmEgcHJpc3R1cG5vc3RpIGFrY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVNZW51UG9yaXpvdmFjKCk7IC8vIFB1dm9kbmkgbmFzdGF2ZW5pIG1lbnUgcG9yaXpvdmFjZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmFzdGF2IHByaXpuYWssIHplIGJ5bGEgdWtvbmNlbmEgZWRpdGFjZSBobGF2aWNreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVkaXRIZWFkZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTY2h2YWxlbmkgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgW0FjdGlvbnMuU2NodmFsZW5pXTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uU2NodmFsaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0OiBVY3QuSW50ZXJmYWNlLkdSb3pEb2tsYWRJbkR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhhdC5kb2tsYWQuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0X3ptZW5hOiB0aGF0LmRva2xhZC5oZWFkZXI/LmRhdF96bWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlNjaHZhbGVuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnl0dm9yaW0gc2kgcHJvbWlzZSBuYSBwcm92YWRlbnkgY2hhaW4gYWtjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZSA9IHRoYXQuZXhlY3V0ZUFjdGlvbihyZXF1ZXN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFpvYnJheiBwcm9iaWhhamljaSBha2NpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyhwcm9taXNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBvIHByb3ZlZGVuaSBha2NlIHpwcmFjdWogb2Rwb3ZlZCBhIHByZWtyZXNsaSBkZXRhaWwgaSBzZXpuYW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVWxveiBzaSBwdXZvZG5pIGtvcGlpIG9iamVrdHUgLSBkZWVwIGNvcHksIG5lIHJlZmVyZW5jaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aW91c0Rva2xhZCA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGF0LmRva2xhZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnJhY2VuYSBkYXRhIHNsb3VjaW0gZG8gbm92ZWhvIG9iamVrdHUgZG9rbGFkdS4gUHJvdmVkdSBobHVib2tvdSBrb3BpaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5leHRlbmQodHJ1ZSwgdGhhdC5kb2tsYWQsIHJlc3BvbnNlLkRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgYXBsaWt1aiB2eXNsZWRuZSB1cHJhdmVuZSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZUVuYWJsZU1lbnVEb2tsYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudXBkYXRlRW5hYmxlRmllbGRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZVN0YXR1c0JhcigpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gWmFwaXN5IGRva2xhZHUgLSBub3ZhIHZhemJhXHJcbiAgICAgICAgICAgICAgICBbQWN0aW9ucy5aYXBpc3ldOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25VY2V0bmlaYXBpc3koe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ2NlwiLCAvL1JDIDMwMjUwNDY2IDogUm96cG/EjXRvdsOpIHrDoXBpc3lcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSwgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuVmF6YnlEb2tsYWR1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVmF6YnlEb2tsYWR1KHRoYXQsIHRoYXQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdSBhcyBhbnksIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBPZHNjaHZhbGVuaSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICBbQWN0aW9ucy5acnVzaXRTY2h2YWxlbmldOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25acnVzaXRTY2h2YWxlbmkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0OiBVY3QuSW50ZXJmYWNlLkdSb3pEb2tsYWRJbkR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhhdC5kb2tsYWQuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0X3ptZW5hOiB0aGF0LmRva2xhZC5oZWFkZXI/LmRhdF96bWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLk9kc2NodmFsZW5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXR2b3JpbSBzaSBwcm9taXNlIG5hIHByb3ZhZGVueSBjaGFpbiBha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gdGhhdC5leGVjdXRlQWN0aW9uKHJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWm9icmF6IHByb2JpaGFqaWNpIGFrY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHByb21pc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG8gcHJvdmVkZW5pIGFrY2UgenByYWN1aiBvZHBvdmVkIGEgcHJla3Jlc2xpIGRldGFpbCBpIHNlem5hbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVbG96IHNpIHB1dm9kbmkga29waWkgb2JqZWt0dSAtIGRlZXAgY29weSwgbmUgcmVmZXJlbmNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpb3VzRG9rbGFkID0gJC5leHRlbmQodHJ1ZSwge30sIHRoYXQuZG9rbGFkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWcmFjZW5hIGRhdGEgc2xvdWNpbSBkbyBub3ZlaG8gb2JqZWt0dSBkb2tsYWR1LiBQcm92ZWR1IGhsdWJva291IGtvcGlpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZCh0cnVlLCB0aGF0LmRva2xhZCwgcmVzcG9uc2UuRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQSBhcGxpa3VqIHZ5c2xlZG5lIHVwcmF2ZW5lIGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudXBkYXRlRW5hYmxlTWVudURva2xhZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVFbmFibGVGaWVsZHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudXBkYXRlU3RhdHVzQmFyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZWFsaXphY2UgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgW0FjdGlvbnMuUmVhbGl6YWNlXTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uWmF1Y3RvdmF0KHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAxNTAxNDBcIiwgLy9SQyAzMDE1MDE0MCA6IFJlYWxpem92YXRcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVxdWVzdDogVWN0LkludGVyZmFjZS5HUm96RG9rbGFkSW5EdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHRoYXQuZG9rbGFkLml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF96bWVuYTogdGhhdC5kb2tsYWQuaGVhZGVyPy5kYXRfem1lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5SZWFsaXphY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5dHZvcmltIHNpIHByb21pc2UgbmEgcHJvdmFkZW55IGNoYWluIGFrY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSB0aGF0LmV4ZWN1dGVBY3Rpb24ocmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBab2JyYXogcHJvYmloYWppY2kgYWtjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcocHJvbWlzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQbyBwcm92ZWRlbmkgYWtjZSB6cHJhY3VqIG9kcG92ZWQgYSBwcmVrcmVzbGkgZGV0YWlsIGkgc2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVsb3ogc2kgcHV2b2RuaSBrb3BpaSBvYmpla3R1IC0gZGVlcCBjb3B5LCBuZSByZWZlcmVuY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlvdXNEb2tsYWQgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhhdC5kb2tsYWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZyYWNlbmEgZGF0YSBzbG91Y2ltIGRvIG5vdmVobyBvYmpla3R1IGRva2xhZHUuIFByb3ZlZHUgaGx1Ym9rb3Uga29waWlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIHRoYXQuZG9rbGFkLCByZXNwb25zZS5EYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBIGFwbGlrdWogdnlzbGVkbmUgdXByYXZlbmUgaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVFbmFibGVNZW51RG9rbGFkKCk7IC8vIFptZW5hIHByaXN0dXBub3N0aSBtZW51XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZVN0YXR1c0JhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdG9ybm92YW5pIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIFtBY3Rpb25zLlN0b3Jub106IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblN0b3Jub3ZhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3Q6IFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZEluRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGF0LmRva2xhZC5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfem1lbmE6IHRoYXQuZG9rbGFkLmhlYWRlcj8uZGF0X3ptZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuU3Rvcm5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXR2b3JpbSBzaSBwcm9taXNlIG5hIHByb3ZhZGVueSBjaGFpbiBha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gdGhhdC5leGVjdXRlQWN0aW9uKHJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWm9icmF6IHByb2JpaGFqaWNpIGFrY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHByb21pc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG8gcHJvdmVkZW5pIGFrY2UgenByYWN1aiBvZHBvdmVkIGEgcHJla3Jlc2xpIGRldGFpbCBpIHNlem5hbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQb2t1ZCBzZSB2cmF0aSBub3Z5IHBpZCwgbXVzaW0gcHJla3Jlc2xpdCBjZWx5IGNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5EYXRhLmhlYWRlci5peHAgIT0gdGhhdC5kb2tsYWQuaGVhZGVyPy5peHApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5sb2FkPy4oeyBpeHA6IHJlc3BvbnNlLmRhdGEuaGVhZGVyLml4cCwgYWN0aW9uOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuU3Rvcm5vIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVbG96IHNpIHB1dm9kbmkga29waWkgb2JqZWt0dSAtIGRlZXAgY29weSwgbmUgcmVmZXJlbmNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aW91c0Rva2xhZCA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGF0LmRva2xhZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZyYWNlbmEgZGF0YSBzbG91Y2ltIGRvIG5vdmVobyBvYmpla3R1IGRva2xhZHUuIFByb3ZlZHUgaGx1Ym9rb3Uga29waWlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZCh0cnVlLCB0aGF0LmRva2xhZCwgcmVzcG9uc2UuRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgYXBsaWt1aiB2eXNsZWRuZSB1cHJhdmVuZSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVFbmFibGVNZW51RG9rbGFkKCk7IC8vIFptZW5hIHByaXN0dXBub3N0aSBtZW51XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVTdGF0dXNCYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFrdGl2YWNlIChvZHN0b3Jub3ZhbmkpIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIFtBY3Rpb25zLlpydXNpdFN0b3Jub106IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblpydXNpdFN0b3Jubyh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3Q6IFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZEluRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGF0LmRva2xhZC5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfem1lbmE6IHRoYXQuZG9rbGFkLmhlYWRlcj8uZGF0X3ptZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuQWt0aXZhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5dHZvcmltIHNpIHByb21pc2UgbmEgcHJvdmFkZW55IGNoYWluIGFrY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSB0aGF0LmV4ZWN1dGVBY3Rpb24ocmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBab2JyYXogcHJvYmloYWppY2kgYWtjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcocHJvbWlzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQbyBwcm92ZWRlbmkgYWtjZSB6cHJhY3VqIG9kcG92ZWQgYSBwcmVrcmVzbGkgZGV0YWlsIGkgc2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVsb3ogc2kgcHV2b2RuaSBrb3BpaSBvYmpla3R1IC0gZGVlcCBjb3B5LCBuZSByZWZlcmVuY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlvdXNEb2tsYWQgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhhdC5kb2tsYWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZyYWNlbmEgZGF0YSBzbG91Y2ltIGRvIG5vdmVobyBvYmpla3R1IGRva2xhZHUuIFByb3ZlZHUgaGx1Ym9rb3Uga29waWlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIHRoYXQuZG9rbGFkLCByZXNwb25zZS5EYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBIGFwbGlrdWogdnlzbGVkbmUgdXByYXZlbmUgaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVFbmFibGVNZW51RG9rbGFkKCk7IC8vIFptZW5hIHByaXN0dXBub3N0aSBtZW51XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZVN0YXR1c0JhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVemF2cmVuaSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICBbQWN0aW9ucy5VemF2cmVuaV06IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblV6YXZyaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0OiBVY3QuSW50ZXJmYWNlLkdSb3pEb2tsYWRJbkR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhhdC5kb2tsYWQuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0X3ptZW5hOiB0aGF0LmRva2xhZC5oZWFkZXI/LmRhdF96bWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlV6YXZyZW5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXR2b3JpbSBzaSBwcm9taXNlIG5hIHByb3ZhZGVueSBjaGFpbiBha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gdGhhdC5leGVjdXRlQWN0aW9uKHJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWm9icmF6IHByb2JpaGFqaWNpIGFrY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHByb21pc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG8gcHJvdmVkZW5pIGFrY2UgenByYWN1aiBvZHBvdmVkIGEgcHJla3Jlc2xpIGRldGFpbCBpIHNlem5hbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVbG96IHNpIHB1dm9kbmkga29waWkgb2JqZWt0dSAtIGRlZXAgY29weSwgbmUgcmVmZXJlbmNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpb3VzRG9rbGFkID0gJC5leHRlbmQodHJ1ZSwge30sIHRoYXQuZG9rbGFkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWcmFjZW5hIGRhdGEgc2xvdWNpbSBkbyBub3ZlaG8gb2JqZWt0dSBkb2tsYWR1LiBQcm92ZWR1IGhsdWJva291IGtvcGlpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZCh0cnVlLCB0aGF0LmRva2xhZCwgcmVzcG9uc2UuRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQSBhcGxpa3VqIHZ5c2xlZG5lIHVwcmF2ZW5lIGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudXBkYXRlRW5hYmxlTWVudURva2xhZCgpOyAvLyBabWVuYSBwcmlzdHVwbm9zdGkgbWVudVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVTdGF0dXNCYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgW0FjdGlvbnMuT2Rlc2xhbmlTUF06IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMTUwMTY3XCIsIC8vUkMgMzAxNTAxNjcgOiBPZGVzbGF0IGRvIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3Q6IFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZEluRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGF0LmRva2xhZC5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfem1lbmE6IHRoYXQuZG9rbGFkLmhlYWRlcj8uZGF0X3ptZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuT2Rlc2xhbmlEb1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXR2b3JpbSBzaSBwcm9taXNlIG5hIHByb3ZhZGVueSBjaGFpbiBha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gdGhhdC5leGVjdXRlQWN0aW9uKHJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWm9icmF6IHByb2JpaGFqaWNpIGFrY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHByb21pc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG8gcHJvdmVkZW5pIGFrY2UgenByYWN1aiBvZHBvdmVkIGEgcHJla3Jlc2xpIGRldGFpbCBpIHNlem5hbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVbG96IHNpIHB1dm9kbmkga29waWkgb2JqZWt0dSAtIGRlZXAgY29weSwgbmUgcmVmZXJlbmNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpb3VzRG9rbGFkID0gJC5leHRlbmQodHJ1ZSwge30sIHRoYXQuZG9rbGFkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWcmFjZW5hIGRhdGEgc2xvdWNpbSBkbyBub3ZlaG8gb2JqZWt0dSBkb2tsYWR1LiBQcm92ZWR1IGhsdWJva291IGtvcGlpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZCh0cnVlLCB0aGF0LmRva2xhZCwgcmVzcG9uc2UuRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQSBhcGxpa3VqIHZ5c2xlZG5lIHVwcmF2ZW5lIGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudXBkYXRlRW5hYmxlTWVudURva2xhZCgpOyAvLyBabWVuYSBwcmlzdHVwbm9zdGkgbWVudVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVTdGF0dXNCYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUHJlZXZpZGVuY2UgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgW0FjdGlvbnMuUHJlZXZpZGVuY2VdOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25QcmVldmlkb3ZhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3Q6IFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZEluRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGF0LmRva2xhZC5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfem1lbmE6IHRoYXQuZG9rbGFkLmhlYWRlcj8uZGF0X3ptZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUHJlZXZpZGVuY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5dHZvcmltIHNpIHByb21pc2UgbmEgcHJvdmFkZW55IGNoYWluIGFrY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSB0aGF0LmV4ZWN1dGVBY3Rpb24ocmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBab2JyYXogcHJvYmloYWppY2kgYWtjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcocHJvbWlzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQbyBwcm92ZWRlbmkgYWtjZSB6cHJhY3VqIG9kcG92ZWQgYSBwcmVrcmVzbGkgZGV0YWlsIGkgc2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVsb3ogc2kgcHV2b2RuaSBrb3BpaSBvYmpla3R1IC0gZGVlcCBjb3B5LCBuZSByZWZlcmVuY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlvdXNEb2tsYWQgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhhdC5kb2tsYWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZyYWNlbmEgZGF0YSBzbG91Y2ltIGRvIG5vdmVobyBvYmpla3R1IGRva2xhZHUuIFByb3ZlZHUgaGx1Ym9rb3Uga29waWlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIHRoYXQuZG9rbGFkLCByZXNwb25zZS5EYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBIGFwbGlrdWogdnlzbGVkbmUgdXByYXZlbmUgaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVFbmFibGVNZW51RG9rbGFkKCk7IC8vIFptZW5hIHByaXN0dXBub3N0aSBtZW51XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZVN0YXR1c0JhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQcmVkYW5pIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIFtBY3Rpb25zLlByZWRhbmldOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25QcmVkYXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0OiBVY3QuSW50ZXJmYWNlLkdSb3pEb2tsYWRJbkR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhhdC5kb2tsYWQuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0X3ptZW5hOiB0aGF0LmRva2xhZC5oZWFkZXI/LmRhdF96bWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlByZWRhbmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5dHZvcmltIHNpIHByb21pc2UgbmEgcHJvdmFkZW55IGNoYWluIGFrY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSB0aGF0LmV4ZWN1dGVBY3Rpb24ocmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBab2JyYXogcHJvYmloYWppY2kgYWtjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcocHJvbWlzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQbyBwcm92ZWRlbmkgYWtjZSB6cHJhY3VqIG9kcG92ZWQgYSBwcmVrcmVzbGkgZGV0YWlsIGkgc2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVsb3ogc2kgcHV2b2RuaSBrb3BpaSBvYmpla3R1IC0gZGVlcCBjb3B5LCBuZSByZWZlcmVuY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlvdXNEb2tsYWQgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhhdC5kb2tsYWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZyYWNlbmEgZGF0YSBzbG91Y2ltIGRvIG5vdmVobyBvYmpla3R1IGRva2xhZHUuIFByb3ZlZHUgaGx1Ym9rb3Uga29waWlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIHRoYXQuZG9rbGFkLCByZXNwb25zZS5EYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBIGFwbGlrdWogdnlzbGVkbmUgdXByYXZlbmUgaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVFbmFibGVNZW51RG9rbGFkKCk7IC8vIFptZW5hIHByaXN0dXBub3N0aSBtZW51XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZVN0YXR1c0JhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQcmV2emV0aSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICBbQWN0aW9ucy5QcmV2emV0aV06IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblByZXZ6aXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0OiBVY3QuSW50ZXJmYWNlLkdSb3pEb2tsYWRJbkR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhhdC5kb2tsYWQuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0X3ptZW5hOiB0aGF0LmRva2xhZC5oZWFkZXI/LmRhdF96bWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlByZXZ6ZXRpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXR2b3JpbSBzaSBwcm9taXNlIG5hIHByb3ZhZGVueSBjaGFpbiBha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gdGhhdC5leGVjdXRlQWN0aW9uKHJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWm9icmF6IHByb2JpaGFqaWNpIGFrY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHByb21pc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG8gcHJvdmVkZW5pIGFrY2UgenByYWN1aiBvZHBvdmVkIGEgcHJla3Jlc2xpIGRldGFpbCBpIHNlem5hbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVbG96IHNpIHB1dm9kbmkga29waWkgb2JqZWt0dSAtIGRlZXAgY29weSwgbmUgcmVmZXJlbmNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpb3VzRG9rbGFkID0gJC5leHRlbmQodHJ1ZSwge30sIHRoYXQuZG9rbGFkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWcmFjZW5hIGRhdGEgc2xvdWNpbSBkbyBub3ZlaG8gb2JqZWt0dSBkb2tsYWR1LiBQcm92ZWR1IGhsdWJva291IGtvcGlpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZCh0cnVlLCB0aGF0LmRva2xhZCwgcmVzcG9uc2UuRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQSBhcGxpa3VqIHZ5c2xlZG5lIHVwcmF2ZW5lIGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudXBkYXRlRW5hYmxlTWVudURva2xhZCgpOyAvLyBabWVuYSBwcmlzdHVwbm9zdGkgbWVudVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVTdGF0dXNCYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUHJpZGVsZW5pIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIFtBY3Rpb25zLlByaWRlbGVuaV06IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblByaWRlbGl0KHtcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVxdWVzdDogVWN0LkludGVyZmFjZS5HUm96RG9rbGFkSW5EdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHRoYXQuZG9rbGFkLml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF96bWVuYTogdGhhdC5kb2tsYWQuaGVhZGVyPy5kYXRfem1lbmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5QcmlkZWxlbmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5dHZvcmltIHNpIHByb21pc2UgbmEgcHJvdmFkZW55IGNoYWluIGFrY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSB0aGF0LmV4ZWN1dGVBY3Rpb24ocmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBab2JyYXogcHJvYmloYWppY2kgYWtjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcocHJvbWlzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQbyBwcm92ZWRlbmkgYWtjZSB6cHJhY3VqIG9kcG92ZWQgYSBwcmVrcmVzbGkgZGV0YWlsIGkgc2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVsb3ogc2kgcHV2b2RuaSBrb3BpaSBvYmpla3R1IC0gZGVlcCBjb3B5LCBuZSByZWZlcmVuY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlvdXNEb2tsYWQgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhhdC5kb2tsYWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZyYWNlbmEgZGF0YSBzbG91Y2ltIGRvIG5vdmVobyBvYmpla3R1IGRva2xhZHUuIFByb3ZlZHUgaGx1Ym9rb3Uga29waWlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIHRoYXQuZG9rbGFkLCByZXNwb25zZS5EYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBIGFwbGlrdWogdnlzbGVkbmUgdXByYXZlbmUgaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVFbmFibGVNZW51RG9rbGFkKCk7IC8vIFptZW5hIHByaXN0dXBub3N0aSBtZW51XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZVN0YXR1c0JhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBWcmFjZW5pIGRva2xhZHUgZG8gV0ZMXHJcbiAgICAgICAgICAgICAgICBbQWN0aW9ucy5WcmFjZW5pRG9XZmxdOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25WcmF0aXREb1dmbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3Q6IFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZEluRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGF0LmRva2xhZC5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfem1lbmE6IHRoYXQuZG9rbGFkLmhlYWRlcj8uZGF0X3ptZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuVnJhY2VuaURvV2ZsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXR2b3JpbSBzaSBwcm9taXNlIG5hIHByb3ZhZGVueSBjaGFpbiBha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9taXNlID0gdGhhdC5leGVjdXRlQWN0aW9uKHJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWm9icmF6IHByb2JpaGFqaWNpIGFrY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHByb21pc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG8gcHJvdmVkZW5pIGFrY2UgenByYWN1aiBvZHBvdmVkIGEgcHJla3Jlc2xpIGRldGFpbCBpIHNlem5hbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVbG96IHNpIHB1dm9kbmkga29waWkgb2JqZWt0dSAtIGRlZXAgY29weSwgbmUgcmVmZXJlbmNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpb3VzRG9rbGFkID0gJC5leHRlbmQodHJ1ZSwge30sIHRoYXQuZG9rbGFkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWcmFjZW5hIGRhdGEgc2xvdWNpbSBkbyBub3ZlaG8gb2JqZWt0dSBkb2tsYWR1LiBQcm92ZWR1IGhsdWJva291IGtvcGlpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZCh0cnVlLCB0aGF0LmRva2xhZCwgcmVzcG9uc2UuRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQSBhcGxpa3VqIHZ5c2xlZG5lIHVwcmF2ZW5lIGhvZG5vdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudXBkYXRlRW5hYmxlTWVudURva2xhZCgpOyAvLyBabWVuYSBwcmlzdHVwbm9zdGkgbWVudVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVTdGF0dXNCYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgIC8vIEFrY2UgcG9yaXpvdmFjZVxyXG4gICAgICAgICAgICAgICAgW0FjdGlvbnMuUG9yaXpvdmFjTm92eV06IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk5vdnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0OiBVY3QuSW50ZXJmYWNlLkdSb3pEb2tsYWRJbkR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhhdC5kb2tsYWQuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0X3ptZW5hOiB0aGF0LmRva2xhZC5oZWFkZXI/LmRhdF96bWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlBvcml6b3ZhY05vdnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5dHZvcmltIHNpIHByb21pc2UgbmEgcHJvdmFkZW55IGNoYWluIGFrY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb21pc2UgPSB0aGF0LmV4ZWN1dGVBY3Rpb24ocmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBab2JyYXogcHJvYmloYWppY2kgYWtjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcocHJvbWlzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVbG96IHNpIHB1dm9kbmkga29waWkgb2JqZWt0dSAtIGRlZXAgY29weSwgbmUgcmVmZXJlbmNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZpb3VzRG9rbGFkID0gJC5leHRlbmQodHJ1ZSwge30sIHRoYXQuZG9rbGFkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWcmFjZW5hIGRhdGEgc2xvdWNpbSBkbyBub3ZlaG8gb2JqZWt0dSBkb2tsYWR1LiBQcm92ZWR1IGhsdWJva291IGtvcGlpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZCh0cnVlLCB0aGF0LmRva2xhZCwgcmVzcG9uc2UuRGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTnluaSBzaSBtdXNpbSB2eXRhaG5vdXQgcG9zbGVkbmkgcmFkZWssIGt0ZXJ5IGplIFwicm96cHJhY292YW55XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RSb3c6IFVjdC5JbnRlcmZhY2UuR1JvemRwZXBEdG8gPSB0aGF0LmRva2xhZC5yb3dzIVt0aGF0LmRva2xhZC5yb3dzIS5sZW5ndGggLSAxXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXZvbGFuaSB1ZGFsb3N0aSBzdGFydCB2IHBvcml6b3ZhY2k6IGdncmlkcm93ZWRpdG9yLnN0YXJ0KGV2LGluZm8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRwb3Jpem92YWMuZ2dyaWRyb3dlZGl0b3IoXCJhZGRSb3dcIiwgeyAuLi5sYXN0Um93LCBuZXdSb3c6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgIFtBY3Rpb25zLlBvcml6b3ZhY1Vsb3ppdF06IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblVsb3ppdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFpkZSB2b2xhbSBwb3V6ZSB1bG96ZW5pIHYgcG9yaXpvdmFjaSwgY2VsYSBha2NlIGplIHZvbGFuYSB2IHJhbWNpIG1ldG9keSBnZ3JpZHJvd2VkaXRvci5zYXZlKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kcG9yaXpvdmFjLmdncmlkcm93ZWRpdG9yKFwiY29tbWl0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgIFtBY3Rpb25zLlBvcml6b3ZhY1pydXNpdF06IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblpydXNpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZUZpbGxJblByb2dyZXNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLldpZGdldC5HTWFnaWNQcmVGaWxsZXIuY2FuY2VsQWN0aW9uLnJ1bih7IGNlbGxJbmZvOiB0aGF0LiRwb3Jpem92YWMuZ2dyaWQoXCJhY3RpdmVDZWxsQWRkcmVzc1wiKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVG90byB2eXZvbGEgdWRhbG9zdCBuYSBwb3Jpem92YWNpIChnZ3JpZHJvd2VkaXRvcikgYmVmb3JlQ2FuY2VsIGEgQ2FuY2VsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRwb3Jpem92YWMuZ2dyaWRyb3dlZGl0b3IoXCJjYW5jZWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3Rpc2tudXRpIHRsYWNpdGthIE9wcmF2aXQgbmEgcG9yaXpvdmFjaVxyXG4gICAgICAgICAgICAgICAgW0FjdGlvbnMuUG9yaXpvdmFjT3ByYXZpdF06IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9wcmF2aXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBvdXplIHNwdXN0aW0gZWRpdGFjaSBuYSB2eWJyYW5lbSByYWRrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRwb3Jpem92YWMuZ2dyaWRyb3dlZGl0b3IoXCJzdGFydFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdGlza251dGkgdGxhY2l0a2EgT2RzdHJhbml0IHphcGlzXHJcbiAgICAgICAgICAgICAgICBbQWN0aW9ucy5Qb3Jpem92YWNPZHN0cmFuaXRdOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25PZHN0cmFuaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0OiBVY3QuSW50ZXJmYWNlLkdSb3pEb2tsYWRJbkR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhhdC5kb2tsYWQuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0X3ptZW5hOiB0aGF0LmRva2xhZC5oZWFkZXI/LmRhdF96bWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlBvcml6b3ZhY09kc3RyYW5pdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnl0dm9yaW0gc2kgcHJvbWlzZSBuYSBwcm92YWRlbnkgY2hhaW4gYWtjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZSA9IHRoYXQuZXhlY3V0ZUFjdGlvbihyZXF1ZXN0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFpvYnJheiBwcm9iaWhhamljaSBha2NpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyhwcm9taXNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBvIHByb3ZlZGVuaSBha2NlIHpwcmFjdWogb2Rwb3ZlZCBhIHByZWtyZXNsaSBkZXRhaWwgaSBzZXpuYW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVWxveiBzaSBwdXZvZG5pIGtvcGlpIG9iamVrdHUgLSBkZWVwIGNvcHksIG5lIHJlZmVyZW5jaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aW91c0Rva2xhZCA9ICQuZXh0ZW5kKHRydWUsIHt9LCB0aGF0LmRva2xhZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnJhY2VuYSBkYXRhIHNsb3VjaW0gZG8gbm92ZWhvIG9iamVrdHUgZG9rbGFkdS4gUHJvdmVkdSBobHVib2tvdSBrb3BpaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5leHRlbmQodHJ1ZSwgdGhhdC5kb2tsYWQsIHJlc3BvbnNlLkRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERhdGEgc2Ugc2xvdWNpLCBhbGUgdXppdmF0ZWwgcmFka3kgb2RzdHJhbmlsLiBNdXNpbSBzaSBqZSB0ZWR5IG5hdHZyZG8gcHJlcHNhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kb2tsYWQucm93cyA9IHJlc3BvbnNlLkRhdGEucm93cztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBIG55bmkgYWt0dWFsaXp1aiBkYXRhIHBvcml6b3ZhY2UgKHZpZXcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2aWV3ID0gdGhhdC4kcG9yaXpvdmFjLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcudXBkYXRlRGF0YSh0aGF0LmRva2xhZC5yb3dzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZU1lbnVQb3Jpem92YWMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVTdGF0dXNCYXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgW0FjdGlvbnMuUG9yaXpvdmFjUHJlZGtvbnRhY2VdOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDEyXCIsLy9SQyAzMDI1MDQxMiA6IFDFmWVka29udGFjZVxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlN0YXJ0UHJlZGtvbnRhY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgW0FjdGlvbnMuUG9yaXpvdmFjUHJla29udGFjZVZ5dHZvcml0VnNlY2hdOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDE4XCIsLy9SQyAzMDI1MDQxOCA6IGRsZSB2xaFlY2ggxZnDoWRrxa9cclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5QcmVka29udGFjZVplWmFwaXN1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFtBY3Rpb25zLlBvcml6b3ZhY1ByZWtvbnRhY2VWeXR2b3JpdE96bmFjZW5lXToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQxOVwiLC8vUkMgMzAyNTA0MTkgOiBkbGUgb3puYcSNZW7DvWNoIMWZw6Fka8WvXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuUHJlZGtvbnRhY2VaZVphcGlzdShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFtBY3Rpb25zLlBvcml6b3ZhY0ltcG9ydFNjaHJhbmthXToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM3M1wiLC8vUkMgMzAyNTAzNzMgOiBJbXBvcnQgemUgc2NocsOhbmt5XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0Lkhyb21hZG5lT3BlcmFjZVJhZGt5KFwiSU1QQ0xJUFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFtBY3Rpb25zLlBvcml6b3ZhY0ltcG9ydFNvdWJvcl06IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNzRcIiwvL1JDIDMwMjUwMzc0IDogSW1wb3J0IHplIHNvdWJvcnVcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQuSHJvbWFkbmVPcGVyYWNlUmFka3koXCJJTVBGSUxFXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgW0FjdGlvbnMuSUlTU1BTdHJ1a3R1cmFLdW11bG92YXRCZXpOdWxdOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDM4XCIsIC8vUkMgMzAyNTA0MzggOiBLdW11bG92YXQgZGxlIElJU1NQIGJleiBudWxvdsO9Y2ggxI3DoXN0ZWtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuVXBkYXRlQWN0aW9uKFt0aGF0LmFjdGlvbnNbQWN0aW9ucy5JSVNTUFN0cnVrdHVyYUt1bXVsb3ZhdERsZUlJU1NQXSEsIHRoYXQuYWN0aW9uc1tBY3Rpb25zLklJU1NQU3RydWt0dXJhQmV6S3VtdWxhY2VdIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBlbmFibGVkOiB0cnVlLCBjaGVja2VkOiBmYWxzZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LmxvYWRJS1Jvd3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5zZXRQZW5kaW5nKHRoYXQubG9hZElLUm93cyhcIktVTV9CRVpcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBbQWN0aW9ucy5JSVNTUFN0cnVrdHVyYUt1bXVsb3ZhdERsZUlJU1NQXToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQzOVwiLCAvL1JDIDMwMjUwNDM5IDogS3VtdWxvdmF0IGRsZSBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5VcGRhdGVBY3Rpb24oW3RoYXQuYWN0aW9uc1tBY3Rpb25zLklJU1NQU3RydWt0dXJhS3VtdWxvdmF0QmV6TnVsXSEsIHRoYXQuYWN0aW9uc1tBY3Rpb25zLklJU1NQU3RydWt0dXJhQmV6S3VtdWxhY2VdIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBlbmFibGVkOiB0cnVlLCBjaGVja2VkOiBmYWxzZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVuZGluZyh0aGF0LmxvYWRJS1Jvd3MoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFtBY3Rpb25zLklJU1NQU3RydWt0dXJhQmV6S3VtdWxhY2VdOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDQwXCIsIC8vUkMgMzAyNTA0NDAgOiBCZXoga3VtdWxhY2VcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuVXBkYXRlQWN0aW9uKFt0aGF0LmFjdGlvbnNbQWN0aW9ucy5JSVNTUFN0cnVrdHVyYUt1bXVsb3ZhdEJlek51bF0hLCB0aGF0LmFjdGlvbnNbQWN0aW9ucy5JSVNTUFN0cnVrdHVyYUt1bXVsb3ZhdERsZUlJU1NQXSFcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZW5hYmxlZDogdHJ1ZSwgY2hlY2tlZDogZmFsc2UgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlbmRpbmcodGhhdC5sb2FkSUtSb3dzKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBbQWN0aW9ucy5JSVNTUFN0cnVrdHVyYVphSGxhdmlja3VdOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDQxXCIsIC8vUkMgMzAyNTA0NDEgOiBaw6FwaXN5IHphIGhsYXZpxI1rdVxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdGhhdC5kb2tsYWQuaGVhZGVyPy5peHNfYWhsICE9PSBudWxsICYmIHRoYXQuZG9rbGFkLmhlYWRlcj8uaXhzX2FobD8udHJpbSgpICE9PSBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQoIXRoaXMuY2hlY2tlZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZW5kaW5nKHRoYXQubG9hZElLUm93cygpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXpuYW0gYWtjaSBkb3N0dXBueWNoIHYgbWVudSBiYXJ1IGRva2xhZHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7R2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJNZW51SXRlbURlZn0ga29sZWtjZSBkb3N0dXBueWNoIGFrY2lcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gTWV0b2RhIHZ5dHZhcmkga29sZWtjaSBha2NpLCBrdGVyZSBqc291IHpvYnJhemVuZSB2IG1lbnViYXJ1IChoYW1idXJnZXIgdnByYXZvIG5haG9yZSlcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWVudURva2xhZCgpOiBHaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlck1lbnVJdGVtRGVmIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogdG9obGUgc2UgYnVkZSBtdXNldCB2eXR2YXJldCBkeW5hbWlja3kgZGxlIHN0YXZ1IGRva2xhZHVcclxuICAgICAgICAgICAgcmV0dXJuIFsgXHJcbiAgICAgICAgICAgICAgICBBY3Rpb25zLlBvZGFuaSxcclxuICAgICAgICAgICAgICAgIEFjdGlvbnMuRXZpZGVuY2UsXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogQWN0aW9ucy5PcHJhdmFIbGF2aWNreSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIEFjdGlvbnMuWnJ1c2l0T3ByYXZhSGxhdmlja3ksXHJcbiAgICAgICAgICAgICAgICBBY3Rpb25zLlphcGlzeSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBBY3Rpb25zLlNjaHZhbGVuaSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIEFjdGlvbnMuWnJ1c2l0U2NodmFsZW5pLFxyXG4gICAgICAgICAgICAgICAgLy9cImFjdFZhbGlkYWNlXCIsXHJcbiAgICAgICAgICAgICAgICAvL1wiYWN0WnJ1c2l0VmFsaWRhY2VcIixcclxuICAgICAgICAgICAgICAgIEFjdGlvbnMuT2Rlc2xhbmlTUCxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBBY3Rpb25zLlJlYWxpemFjZSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIEFjdGlvbnMuU3Rvcm5vLFxyXG4gICAgICAgICAgICAgICAgQWN0aW9ucy5acnVzaXRTdG9ybm8sXHJcbiAgICAgICAgICAgICAgICBBY3Rpb25zLlV6YXZyZW5pLFxyXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXHJcbiAgICAgICAgICAgICAgICBBY3Rpb25zLlByZWV2aWRlbmNlLFxyXG4gICAgICAgICAgICAgICAgQWN0aW9ucy5QcmVkYW5pLFxyXG4gICAgICAgICAgICAgICAgQWN0aW9ucy5QcmV2emV0aSxcclxuICAgICAgICAgICAgICAgIEFjdGlvbnMuUHJpZGVsZW5pLFxyXG4gICAgICAgICAgICAgICAgQWN0aW9ucy5WcmFjZW5pRG9XZmwsXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbmkgcHJpc3R1cG5vc3RpIG5hZCBha2NlbWkgZG9rbGFkdVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSB1cGRhdGVFbmFibGVNZW51RG9rbGFkKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgcGVybWlzc2lvbnMgPSB0aGF0LmRva2xhZC5BY3Rpb25QZXJtaXNzaW9ucztcclxuXHJcbiAgICAgICAgICAgIC8vIE5hc3RhdmkgZW5hYmxlIGEgdG9vbHRpcFxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb2RhbmldPy51cGRhdGVQZXJtaXNzaW9uKHBlcm1pc3Npb25zPy5Qb2RhbmkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5FdmlkZW5jZV0/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzc2lvbnM/LkV2aWRlbmNlKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuT3ByYXZhSGxhdmlja3ldPy51cGRhdGVQZXJtaXNzaW9uKHBlcm1pc3Npb25zPy5PcHJhdmEpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5acnVzaXRPcHJhdmFIbGF2aWNreV0/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzc2lvbnM/LlpydXNpdCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlphcGlzeV0/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzc2lvbnM/LlZhemJhKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuU2NodmFsZW5pXT8udXBkYXRlUGVybWlzc2lvbihwZXJtaXNzaW9ucz8uU2NodmFsZW5pKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuWnJ1c2l0U2NodmFsZW5pXT8udXBkYXRlUGVybWlzc2lvbihwZXJtaXNzaW9ucz8uT2RzY2h2YWxlbmkpO1xyXG4gICAgICAgICAgICAvL3RoaXMuYWN0aW9uc1tcImFjdFZhbGlkYWNlXCJdPy51cGRhdGVQZXJtaXNzaW9uKHBlcm1pc3Npb25zPy5WYWxpZGFjZSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zW1wiYWN0WnJ1c2l0VmFsaWRhY2VcIl0/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzc2lvbnM/Lk9kdmFsaWRhY2UpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5PZGVzbGFuaVNQXT8udXBkYXRlUGVybWlzc2lvbihwZXJtaXNzaW9ucz8uT2Rlc2xhbmlTUCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlJlYWxpemFjZV0/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzc2lvbnM/LlJlYWxpemFjZSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zW1wiYWN0UG90dnJ6ZW5pXCJdPy51cGRhdGVQZXJtaXNzaW9uKHBlcm1pc3Npb25zPy5Qb3R2cnplbmkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5TdG9ybm9dPy51cGRhdGVQZXJtaXNzaW9uKHBlcm1pc3Npb25zPy5TdG9ybm8pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5acnVzaXRTdG9ybm9dPy51cGRhdGVQZXJtaXNzaW9uKHBlcm1pc3Npb25zPy5Ba3RpdmFjZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlV6YXZyZW5pXT8udXBkYXRlUGVybWlzc2lvbihwZXJtaXNzaW9ucz8uVXphdnJpdCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5QcmVldmlkZW5jZV0/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzc2lvbnM/LlByZWV2aWRlbmNlKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUHJlZGFuaV0/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzc2lvbnM/LlByZWRhdCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlByZXZ6ZXRpXT8udXBkYXRlUGVybWlzc2lvbihwZXJtaXNzaW9ucz8uUHJldnppdCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlByaWRlbGVuaV0/LnVwZGF0ZVBlcm1pc3Npb24ocGVybWlzc2lvbnM/LlByaWRlbGl0KTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuVnJhY2VuaURvV2ZsXT8udXBkYXRlUGVybWlzc2lvbihwZXJtaXNzaW9ucz8uVnJhY2VuaURvV2ZsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNlem5hbSBha2NpIGRvc3R1cG55Y2ggdiBobGF2aWNjZSBwb3Jpem92YWNlXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0dpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyTWVudUl0ZW1EZWZ9IGtvbGVrY2UgZG9zdHVwbnljaCBha2NpXHJcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIE1ldG9kYSB2eXR2YXJpIGtvbGVrY2kgYWtjaSwga3RlcmUganNvdSB6b2JyYXplbmUgdiBtZW51YmFydSAoaGFtYnVyZ2VyIHZwcmF2byBuYWhvcmUpXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnVQb3Jpem92YWMoKTogR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJNZW51SXRlbURlZiB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICB7IGlkOiBcIm1lbnVQb3Jpem92YWNOb3Z5XCIsIGFjdGlvbjogQWN0aW9ucy5Qb3Jpem92YWNOb3Z5LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBpZDogXCJtZW51UG9yaXpvdmFjVWxveml0XCIsIGFjdGlvbjogQWN0aW9ucy5Qb3Jpem92YWNVbG96aXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogQWN0aW9ucy5Qb3Jpem92YWNacnVzaXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB7IGFjdGlvbjogQWN0aW9ucy5Qb3Jpem92YWNPcHJhdml0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyBhY3Rpb246IEFjdGlvbnMuUG9yaXpvdmFjT2RzdHJhbml0LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwibWVudWFBZ0ltcG9ydFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNzVcIiwgdHlwZTogXCJzdGF0aWNcIiwgZmF2b3JpdGU6IHRydWUsIGNoaWxkcmVuOiBbIC8vUkMgMzAyNTAzNzUgOiBJbXBvcnQgZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwibWVudVBvbG96a3lJbXBvcnRTb3Vib3JcIiwgYWN0aW9uOiBBY3Rpb25zLlBvcml6b3ZhY0ltcG9ydFNvdWJvciwgZmF2b3JpdGU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwibWVudVBvbG96a3lJbXBvcnRTY2hyYW5reVwiLCBhY3Rpb246IEFjdGlvbnMuUG9yaXpvdmFjSW1wb3J0U2NocmFua2EsIGZhdm9yaXRlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7IHR5cGU6IFwic2VwYXJhdG9yXCIgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJtZW51QWdQcmVka29udGFjZVwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA0MTdcIiwgdHlwZTogXCJzdGF0aWNcIiwgZmF2b3JpdGU6IHRydWUsIGNoaWxkcmVuOiBbIC8vUkMgMzAyNTA0MTcgOiBWeXR2b8WZaXQgcMWZZWRwaXMgcMWZZWRrb250YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwibWVudUFnUHJlZGtvbnRhY2VPem5cIiwgYWN0aW9uOiBBY3Rpb25zLlBvcml6b3ZhY1ByZWtvbnRhY2VWeXR2b3JpdE96bmFjZW5lLCBmYXZvcml0ZTogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJtZW51QWdQcmVka29udGFjZVZzZVwiLCBhY3Rpb246IEFjdGlvbnMuUG9yaXpvdmFjUHJla29udGFjZVZ5dHZvcml0VnNlY2gsIGZhdm9yaXRlOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBOYXN0YXZlbmkgcHJpc3R1cG5vc3RpIG5hZCBha2NlbWkgcG9yaXpvdmFjZVxyXG4gICAgICAgIC8vICogQHBhcmFtIFtlZGl0Um93PWZhbHNlXSBwcml6bmFrLCB6ZGEgZWRpdHVqaSByYWRla1xyXG4gICAgICAgIC8vICogKi9cclxuICAgICAgICBwcml2YXRlIHVwZGF0ZU1lbnVQb3Jpem92YWMoZWRpdFJvdzogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBwID0gdGhhdC5kb2tsYWQuQWN0aW9uUGVybWlzc2lvbnM7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBncCA9IChzZXJ2ZXJQZXJtOiBhbnksIGVkaXRWYWx1ZTogYm9vbGVhbik6IGFueSA9PlxyXG4gICAgICAgICAgICAgICAgZWRpdFJvdyA/IHsgdmFsdWU6IGVkaXRWYWx1ZSB9IDogKHNlcnZlclBlcm0gfHwgbnVsbCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNOb3Z5XT8udXBkYXRlUGVybWlzc2lvbihncChwPy5Ob3Z5UG9yaXpvdmFjLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNVbG96aXRdPy51cGRhdGVQZXJtaXNzaW9uKGdwKHA/LlVsb3ppdFBvcml6b3ZhYywgdHJ1ZSkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNacnVzaXRdPy51cGRhdGVQZXJtaXNzaW9uKGdwKHA/LlpydXNpdFBvcml6b3ZhYywgdHJ1ZSkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNPcHJhdml0XT8udXBkYXRlUGVybWlzc2lvbihncChwPy5PcHJhdml0UG9yaXpvdmFjLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNPZHN0cmFuaXRdPy51cGRhdGVQZXJtaXNzaW9uKGdwKHA/Lk9kc3RyYW5pdFBvcml6b3ZhYywgZmFsc2UpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUG9yaXpvdmFjUHJlZGtvbnRhY2VdPy51cGRhdGVQZXJtaXNzaW9uKGdwKHA/LlByZWRrb250YWNlUG9yaXpvdmFjLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNJbXBvcnRTY2hyYW5rYV0/LnVwZGF0ZVBlcm1pc3Npb24oZ3AocD8uSW1wb3J0WmFwaXN1UG9yaXpvdmFjLCBmYWxzZSkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNJbXBvcnRTb3Vib3JdPy51cGRhdGVQZXJtaXNzaW9uKGdwKHA/LkltcG9ydFphcGlzdVBvcml6b3ZhYywgZmFsc2UpKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUG9yaXpvdmFjUHJla29udGFjZVZ5dHZvcml0T3puYWNlbmVdPy51cGRhdGVQZXJtaXNzaW9uKGdwKHA/LlZ5dHZvcml0UHJlZGtvbnRhY2lQb3Jpem92YWMsIGZhbHNlKSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlBvcml6b3ZhY1ByZWtvbnRhY2VWeXR2b3JpdFZzZWNoXT8udXBkYXRlUGVybWlzc2lvbihncChwPy5WeXR2b3JpdFByZWRrb250YWNpUG9yaXpvdmFjLCBmYWxzZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V6bmFtIGFrY2kgZG9zdHVwbnljaCBwb2QgZG9rbGFkZW1cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBNZXRvZGEgdnl0dmFyaSBrb2xla2NpIGFrY2ksIGt0ZXJlIGpzb3Ugem9icmF6ZW5lIHBvZCBkb2tsYWRlbSAocG9kIGthcnRvdSlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gQXV0b21hdGlja3kgamUgem9icmF6ZW5vIHRsYcSNw610a28gemF2xZnDrXQsIHpkZSBtb2h1IHDFmWlkYXQgZGFsxaFpIGFrY2VcclxuICAgICAgICAgKiBAcmV0dXJucyB7R2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJNZW51SXRlbURlZn0ga29sZWtjZSBkb3N0dXBueWNoIGFrY2lcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQ29tbWFuZEJhcigpOiBHaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlck1lbnVJdGVtRGVmIHtcclxuICAgICAgICAgICAgLy8gUHJpZGFuaSB0bGFjaXRrYSB2ZWRsZSBaYXZyaXQuXHJcbiAgICAgICAgICAgIC8vIFByaW1hcnkgem5hY2ksIHplIGplIHRvIHByZWR2eWJyYW5hIGFrY2UuXHJcbiAgICAgICAgICAgIC8vIFByaXN0dXBub3N0IHNlIHJpZGkgcG92b2xlbmltIGFrY2UgKEFjdGlvbilcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiBBY3Rpb25zLkV2aWRlbmNlLCBwcmltYXJ5OiB0cnVlIH0sIC8vIFVsb3ppdFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8vI3JlZ2lvbiBQcmFjZSBzZSBzdGF0dXMgYmFyZW1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V6bmFtIHBvbGljZWsgcHJvIHpvYnJhemVuaSBzdGF2dVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtzdGF0dXNCYXI/OiBHRGV0YWlsQnVpbGRlck1lbnVJdGVtRGVmIHwgbnVsbH0ga29sZWtjZSBvYmpla3R1IHNlIHN0YXZlbVxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVTdGF0dXNCYXIoKTogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyTWVudUl0ZW1EZWYge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgLy8gVnl0dm9yZW5pIGJhcmV2bmVobyBrb2xlY2thIHpuYWNpY2lobyBzdGF2IGRva2xhZHUgKHV6aXZhdGVsc2t5IG1lbml0ZWxueSlcclxuICAgICAgICAgICAgICAgIC8vIFBva3VkIHNlIGJhcnZhIGtvbGVja2Egem1lbmksIHZvbGEgc2UgbWV0b2RhIGFmdGVyQ2hhbmdlTWV0aG9kXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIuY3JlYXRlVXpvKFxyXG4gICAgICAgICAgICAgICAgICAgIHsgLy8gb2JqZWt0IHMgcGFyYW1ldHJ5IC0gZHRvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhhdC5kb2tsYWQuaGVhZGVyIS5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV6bzogdGhhdC5kb2tsYWQuZG9rdW1lbnQ/LnV6byxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZG9ubHk6IHRoYXQuZG9rbGFkLmhlYWRlciEuaXhzX2Z1bl9ha3QgIT09IHRoYXQuZ2xvYmFscy5TZXNzaW9uUGFyYW1zPy5JeHNGdW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbFNldHRpbmdzOiB0aGlzPy5nbG9iYWxTZXR0aW5ncyxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFmdGVyQ2hhbmdlTWV0aG9kIC0gdm9sYW5vIHBvIHptZW5lIGJhcnZ5IGtvbGVja2FcclxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB0aGF0LnJlZnJlc2hTZXpuYW0odGhhdC5kb2tsYWQhLml4cCksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGFyYW1zXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJzdGF0dXNCYXJVem9cIiB9LCAvLyBwYXJhbXM/OiBNZW51UGFyYW1zXHJcbiAgICAgICAgICAgICAgICApIGFzIEdPYnNlcnZhYmxlT2JqZWN0PE1lbnVQYXJhbXM+LFxyXG4gICAgICAgICAgICAgICAgLy8gU3RhdiBkb2tsYWR1IC0gdnl0dmFyZW5vIHNwb2xlY25vdSBmdW5rY2ksIHZyYWNpIG9iamVrdCB0eXB1IEdEZXRhaWxCdWlsZGVyTWVudUl0ZW1EZWZcclxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBuZXcgR09ic2VydmFibGVPYmplY3Q8TWVudVBhcmFtcz4oJC5leHRlbmQoeyB0eXBlOiBcInN0YXRpY1wiLCBjYXB0aW9uOiBcIlwiLCBjdXN0b21DbGFzczogXCJnLXN0YXRlLXRleHRcIiB9LCBwYXJhbXMpKTtcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uRGV0YWlsLlN0YXR1c0Jhci5jcmVhdGVJdGVtKHsgaWQ6IFwic3RhdkRva2xhZHVcIiB9KSwgLy8gVnl0dm9yZW5pIHBvbG96a3kgcHJvIHN0YXR1c2JhciwgcHJlcyBpZCBqaSBtb2h1IGFrdHVhbGl6b3ZhdCBhIG9ka2F6b3ZhdCBuYSBwb2xvemt1IHByZXMgdGhpc1xyXG4gICAgICAgICAgICAgICAgLy8gU3RhdiBzdG9ybm8gLSBzdGF0aWNreSBvYmpla3QgdHlwdSBHRGV0YWlsQnVpbGRlck1lbnVJdGVtRGVmXHJcbiAgICAgICAgICAgICAgICAvL3sgaWQ6IFwic3RhdlN0b3Jub1wiLCB0eXBlOiBcInN0YXRpY1wiLCBjYXB0aW9uOiB0aGF0LmRva2xhZC5oZWFkZXI/LnN0YXZfc3Rvcm5vX3R4dCEudG9Mb2NhbGVVcHBlckNhc2UoKSwgY3VzdG9tQ2xhc3M6IEdvcmRpYy5HbG9iYWwuRW51bXMuQ29sb3JTdGF0ZUNsYXNzLmVycm9yIH0sIC8vIGNlcnZlbmEgYmFydmFcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uRGV0YWlsLlN0YXR1c0Jhci5jcmVhdGVJdGVtKHsgaWQ6IFwic3RhdlN0b3Jub1wiLCBjYXB0aW9uOiB0aGF0LmRva2xhZC5oZWFkZXI/LnN0YXZfc3Rvcm5vX3R4dCEudG9Mb2NhbGVVcHBlckNhc2UoKSwgY3VzdG9tQ2xhc3M6IEdvcmRpYy5HbG9iYWwuRW51bXMuQ29sb3JTdGF0ZUNsYXNzLmVycm9yIH0pLFxyXG4gICAgICAgICAgICAgICAgLy8gU3RhdiBzY2h2YWxvdmFjaWhvIHByb2Nlc3UgLSBzdGF0aWNreSBvYmpla3QgdHlwdSBHRGV0YWlsQnVpbGRlck1lbnVJdGVtRGVmXHJcbiAgICAgICAgICAgICAgICAvL3sgaWQ6IFwic3RhdkVwa1wiLCB0eXBlOiBcInN0YXRpY1wiLCBjYXB0aW9uOiB0aGF0LmRva2xhZC5oZWFkZXI/LnN0YXZfZXBrX3R4dCEudG9Mb2NhbGVVcHBlckNhc2UoKSB9LFxyXG4gICAgICAgICAgICAgICAgR29yZGljLkVrby5EZXRhaWwuU3RhdHVzQmFyLmNyZWF0ZUl0ZW0oeyBpZDogXCJzdGF2RXBrXCIsIGNhcHRpb246IHRoYXQuZG9rbGFkLmhlYWRlcj8uc3Rhdl9lcGtfdHh0IS50b0xvY2FsZVVwcGVyQ2FzZSgpIH0pLFxyXG4gICAgICAgICAgICAgICAgLy8gU3RhdiB2ZSBzdGF0bmkgcG9rbGFkbmUgLSBzdGF0aWNreSBvYmpla3QgdHlwdSBHRGV0YWlsQnVpbGRlck1lbnVJdGVtRGVmXHJcbiAgICAgICAgICAgICAgICAvL3sgaWQ6IFwic3Rhdklpc3NwXCIsIHR5cGU6IFwic3RhdGljXCIsIGNhcHRpb246IHRoYXQuZG9rbGFkLmhlYWRlcj8uc3Rhdl9paXNzcF90eHQhLnRvTG9jYWxlVXBwZXJDYXNlKCkgfSxcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uRGV0YWlsLlN0YXR1c0Jhci5jcmVhdGVJdGVtKHsgaWQ6IFwic3Rhdklpc3NwXCIsIGNhcHRpb246IHRoYXQuZG9rbGFkLmhlYWRlcj8uc3Rhdl9paXNzcF90eHQhLnRvTG9jYWxlVXBwZXJDYXNlKCkgfSksIFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dWFsaXphY2Ugc3RhdHVzYmFydSBzIGFrdHXDoWxuw61taSBob2Rub3RhbWlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHVwZGF0ZVN0YXR1c0JhcigpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXR1c2VzIHx8ICF0aGlzLmRva2xhZC5oZWFkZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IHRoaXMuZG9rbGFkLmhlYWRlcjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZSA9IChpZDogc3RyaW5nLCBjYXB0aW9uPzogc3RyaW5nIHwgbnVsbCwgY3VzdG9tQ2xhc3M/OiBzdHJpbmcgfCBudWxsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXMgPSB0aGlzLnN0YXR1c2VzIVtpZF07XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5EZXRhaWwuU3RhdHVzQmFyLnVwZGF0ZUl0ZW0oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbj8udG9Mb2NhbGVVcHBlckNhc2UoKSA/PyBcIlwiLCAgLy8gT3B0aW9uYWwgY2hhaW5pbmcgb8WhZXTFmcOtIGkgbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzcyA/PyBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHVwZGF0ZShcInN0YXZEb2tsYWR1XCIsIGhlYWRlci5zdGF2X2Rva2xfdHh0LCB0aGlzLmdldFN0YXR1c0NvbG9yKCkpO1xyXG4gICAgICAgICAgICB1cGRhdGUoXCJzdGF2U3Rvcm5vXCIsIGhlYWRlci5zdGF2X3N0b3Jub190eHQsIG51bGwpO1xyXG4gICAgICAgICAgICB1cGRhdGUoXCJzdGF2RXBrXCIsIGhlYWRlci5zdGF2X2Vwa190eHQsIG51bGwpO1xyXG4gICAgICAgICAgICB1cGRhdGUoXCJzdGF2SWlzc3BcIiwgaGVhZGVyLnN0YXZfaWlzc3BfdHh0LCBudWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVyY2VuaSB2eXNsZWRuZSBiYXJ2eSBzdGF2dSBkb2tsYWR1XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGdldFN0YXR1c0NvbG9yKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IHRoaXMuZG9rbGFkLmhlYWRlciE7XHJcblxyXG4gICAgICAgICAgICBpZiAoaGVhZGVyLmVrb19ha3QgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFQWt0aXZpdGFEb2tsYWR1LlN0b3Jubykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5VdGlscy5Db2xvcnMudGV4dEVycm9yO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb2xvck1hcDogUGFydGlhbDxSZWNvcmQ8R29yZGljLkVrby5JbnRlcmZhY2UuR0VTdGF2eURva2xhZHUsIHN0cmluZz4+ID0ge1xyXG4gICAgICAgICAgICAgICAgW0dvcmRpYy5Fa28uSW50ZXJmYWNlLkdFU3RhdnlEb2tsYWR1LlphdWN0b3Zhbm9dOiBHb3JkaWMuVXRpbHMuQ29sb3JzLnN0YXRlQWN0aXZlLFxyXG4gICAgICAgICAgICAgICAgW0dvcmRpYy5Fa28uSW50ZXJmYWNlLkdFU3RhdnlEb2tsYWR1LlV6YXZyZW5vXTogR29yZGljLlV0aWxzLkNvbG9ycy5zdGF0ZUluYWN0aXZlRm4oXCJkYXRhLWRlbGV0ZWRcIiksXHJcbiAgICAgICAgICAgICAgICBbR29yZGljLkVrby5JbnRlcmZhY2UuR0VTdGF2eURva2xhZHUuU2NodmFsZW5vXTogR29yZGljLlV0aWxzLkNvbG9ycy5zdGF0ZVN1Y2Nlc3MsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gY29sb3JNYXBbaGVhZGVyLnNfemF1IV0gPz8gR29yZGljLlV0aWxzLkNvbG9ycy5zdGF0ZUluZm87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLy8jcmVnaW9uIE1ldG9kYSBvbkRldGFpbEJ1aWxkZXJJbml0XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIG9uRGV0YWlsQnVpbGRlckluaXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBVZMOhbG9zdCBvem5hbXVqZSwgxb5lIGJ1aWxkZXIgbcOhIGsgZGlzcG96aWNpIGRhdGEgdsWhZWNoIGtvbXBvbmVudCBhIGNoeXN0w6Egc2Ugc2xvdcSNaXQgamUgZG8gdm5pdMWZbsOtY2ggcG9sw60gZGVmaW5pY1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBidWlsZGVyIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGluc3RhbmNlIERldGFpbEJ1aWxkZXJ1LCBuYSBrdGVyw6kgamUgamXFoXTEmyBtb8W+bsOpIHDFmWlkYXQgLyBvZGVicmF0IC8gcMWZZXN1bm91dCAvIHVwcmF2aXQga29tcG9uZW50eSBwxZllZCB0w61tLCBuZcW+IGJ1ZG91IGplamljaCBkZWZpbmljZSBzbG91xI1lbnkuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyB2b2zDoW5hIHDFmWVkIHNwb2plbsOtbSBrb21wb25lbnQsIGplIHRlZHkgbW/Fvm7DqSBvdmxpdm5pdCBwb8WZYWTDrSBrb21wb25lbnQsIG9kZWJyYXQsIHDFmWlkYXQgxI1pIG1vZGlmaWtvdmF0IGtvbXBvbmVudHlcclxuICAgICAgICAgICAgLy8gVGF0byBjYXN0IHZ5dHZhcmkgamVkbm90bGl2ZSBrb21wb25lbnR5IChrb3N0aWNreSkuIFpkZSBzaSB2eXR2YXJpbSBpIHN2b2plIHRhYnkuXHJcbiAgICAgICAgICAgIC8vIEhsYXZpY2thIGJ1ZGUgdnl0dm9yZW5hIHRlcHJ2ZSBheiB2IHJhbWNpIHZvbGFuaSBtZXRvZHkgb25EZXRhaWxCdWlsZGVyQnVpbGRcclxuXHJcbiAgICAgICAgICAgIC8vIFRoaXMgc2UgbmV1c3RhbGUgbWVuaSBkbGUgb2JqZWt0dS4gWmRlIHNpIHRlZHkgdWxvemltIG9ka2F6IG5hIGNlbHkgQ29udGVudCAoR0RldGFpbEJ1aWxkZXIpXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC51bWlzdGVuaVphcGlzdSA9IHRoYXQuZ2xvYmFsU2V0dGluZ3M/LmdldChHb3JkaWMuUm96LkFwcFNldHRpbmdzLmFwcFBhdGggKyBcIi5Sb3pTZXR0aW5nc0Zvcm0uUG9sb3preVZpZXdcIikgPz8gR29yZGljLlJvei5BcHBTZXR0aW5ncy5FR1BvbG96a3lWaWV3LlphbG96a2E7XHJcbiAgICAgICAgICAgIC8vaWYgKHR5cGVvZiByb3ptaXN0ZW5pUG9sb3playA9PT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgLy8gICAgcm96bWlzdGVuaVBvbG96ZWsgPSBHb3JkaWMuUm96LkFwcFNldHRpbmdzLkVHUG9sb3preVZpZXcuWmFsb3prYTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFRvdG8gdnl0dmFyaSBqZWRudSBcImtvc3RpY2t1XCIsIHByaWRhdmEga29tcG9uZW50dSBkbyBCdWlsZGVydVxyXG4gICAgICAgICAgICAvLyB3aXRoQ29tcG9uZW50PEdDb250ZW50PihpZDogc3RyaW5nLCBjb21wb25lbnQ6IEdEZXRhaWxCdWlsZGVyQ29tcG9uZW50PEdDb250ZW50PiwgdG9TdGFydD86IGJvb2xlYW4pOiBHRGV0YWlsQnVpbGRlclxyXG4gICAgICAgICAgICBidWlsZGVyLndpdGhDb21wb25lbnQ8dGhpcz4oXHJcbiAgICAgICAgICAgICAgICBcImRldGFpbFwiLCAgICAgICAvLyBpZDogc3RyaW5nXHJcbiAgICAgICAgICAgICAgICB7ICAgICAgICAgICAgICAgLy8gY29tcG9uZW50OiBHRGV0YWlsQnVpbGRlckNvbXBvbmVudDxHQ29udGVudD5cclxuICAgICAgICAgICAgICAgICAgICAvLyBLb2xla2NlIHZzZWNoIGFrY2kgcG92b2xlbnljaCBuYSBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uczogdGhhdC5jcmVhdGVBY3Rpb25zKCksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gS29sZWtjZSBha2NpIGRvc3R1cG55Y2ggdiBtZW51XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogdGhhdC5jcmVhdGVNZW51RG9rbGFkKCksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gS29sZWtjZSB0bGFjaXRlayAoYWtjaSkgcG9kIGRva2xhZGVtXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZEJhcjogdGhhdC5jcmVhdGVDb21tYW5kQmFyKCksIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEtvbGVrY2Ugc3RhdnUgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0JhcjogdGhhdC5jcmVhdGVTdGF0dXNCYXIoKSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRXhpc3R1amUgaGxhdmlja2EgZGV0YWlsdSB2eXR2YXJlbmEgdiBvbkRldGFpbEJ1aWxkZXJCdWlsZFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFBvZCBuaW0gbmFzbGVkdWplIHZvZG9yb3ZueSBzZXpuYW0gdGFidSBrdGVyZSBqc291IG5hIGhsYXZuaSBzdHJhbmNlLiBcclxuICAgICAgICAgICAgICAgICAgICAvLyBVbW96bnVqZSByb3pkZWxpdCBkZXRhaWwgZG9rbGFkdSBuYSB2aWNlIHphbG96ZWsgKG5hcHIgYWdlbmRvdmUgdWRhamUsIGZpbmFuY25pIHByb2ZpbCwgcm96c2lyZW55IHByb2ZpbCAobm92ZSBwb3Bpc25lIHZsYXN0bm9zdGkpIGF0ZC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBPc3RhdG5pIHNwb2xlY25lIHRhYmdydXB5IGpzb3UgdmtsYWRhbnkgZG8gYnVpbGRlcnUgamlueW0genB1c29iZW0gKHYgQyMga29kdSBkZXRhaWx1KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDE2LjA4LjIyIEtLIC0gZGxlIHV6aXZhdGVsc2tlaG8gbmFzdGF2ZW5pIGplIG1vem5vIHBvcml6b3ZhYyB6b2JyYXppdCB2IHNhbW9zdGF0bmUgemFsb3pjZSBhIG5lYm8gcHJpbW8gdiBaYWtsYWRuaWNoIHVkYWppY2hcclxuICAgICAgICAgICAgICAgICAgICB0YWJHcm91cHM6IC8vdGFiR3JvdXBzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhhdC51bWlzdGVuaVphcGlzdSA9PT0gR29yZGljLlJvei5BcHBTZXR0aW5ncy5FR1BvbG96a3lWaWV3LlphbG96a2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5UYWJHcm91cHMuQWdlbmRhKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJzdWJaYXBpc3lcIiwgY2FwdGlvbjogXCJqcmVzOjMwMTUwMDg0XCIgfSwgLy9SQyAzMDE1MDA4NCA6IFBvbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1Nob3dUYWJTdHJ1a3R1cmFJSVNTUCA/IHsgaWQ6IFwic3ViU3RydWt0dXJhXCIsIGNhcHRpb246IFwianJlczozMDI1MDQyMFwiIH0gOiB1bmRlZmluZWQsIC8vUkMgMzAyNTA0MjAgOiBTdHJ1a3R1cmEgdiBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTaG93VGFiVWthemF0ZWxlID8geyBpZDogXCJzdWJVa2F6YXRlbGVcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDQ0XCIgfSA6IHZvaWQgMCBhcyBhbnkgLy9SQyAzMDI1MDQ0NCA6IFVrYXphdGVsw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk/LmZpbHRlcihCb29sZWFuKSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgICAgICAgICAvLyBQb3BpcyBqZWRub3RsaXZ5Y2ggdGFiZ3J1cHUgKHphbG96ZWspXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUYWIgXCJaw6FrbGFkbsOtIMO6ZGFqZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczogLy8gVGFiUGFyYW1zSWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0YWJIbGF2aWNrYURva2xhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOYWRwaXMgVEFCdSB2IHRhYmdyb3VwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDE1MDA2OFwiLCAvL1JDIDMwMTUwMDY4IDogSGxhdmnEjWthIHJvenBvxI10b3bDqWhvIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlByZWZhYnMuVGFiR3JvdXBzLkFnZW5kYSgpLCAvLyBLZSBrdGVyZSBza3VwaW5lIFRhYnUgbmFsZXppXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyQ2xhc3M6IFwiaGlkZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1ldG9kYSBwcm8gdnl0dm9yZW5pIFRhYnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6ICh0YWIpID0+ICAvLyB0YWI6SlF1ZXJ5PEhUTUxFbGVtZW50PiA9PiB2b2lkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWmRlIHphY2luYW0gdnl0dmFyZXQgb2JqZWt0IGZvcm11bGFyZSwga3RlcnkgcG96ZGVqaSB2bG96aW0gZG8gaHRtbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3JtRGV0YWlsID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtRGV0YWlsXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCIgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNla2NlIHMgZGF0dW1lbSwgZHJ1aGVtIGRva2xhZHUgYSBzdWJyYWRvdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBsYWJlbDogXCJqcmVzOjMwMTUwMDY5XCIgfSkgLy9SQyAzMDE1MDA2OSA6IEluZm9ybWFjZSBvIGRva2xhZHVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERhdHVtIHJvenBvY3RvdmVobyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuR2luLlByZWZhYnMuZGVuTWVzaWNSb2soXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBGaWVsZHMuRGF0dW0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZWtvRGF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRzOiBbXCJyb2tcIiwgXCJtZXNpY1wiLCBcImRlblwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhckZpZWxkT3B0aW9uczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGRzLlJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwicm9rXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9udGhGaWVsZE9wdGlvbnM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZpZWxkcy5NZXNpYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1lc2ljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie2Npc2xvfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoYXQuZG9rbGFkLkZpZWxkUGVybWlzc2lvbnM/Lk1lc2ljLnZhbHVlID09PSBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE11aiBub3Z5IHJlYWRlciwga3RlcnkgbWkgdnlwbG5pIGplbiBwbGF0bmUgaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlJlYWRlcnMuUm96c29iZCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvazogdGhhdC5kb2tsYWQuaGVhZGVyPy5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGljOiB0aGF0LmRva2xhZC5oZWFkZXI/LmxpYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoYXQuZG9rbGFkLmhlYWRlcj8uaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjczogdGhhdC5kb2tsYWQuaGVhZGVyPy51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0X29iZDogMTAwLCAvLyBwb3V6ZSBha3Rpdm5pIG9iZG9iaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyZDogKCkgPT4geyByZXR1cm4gdGhhdC5maW5kRmllbGRzKEZpZWxkcy5EcmQpLmdmaWVsZChcImdldFZhbHVlQXN5bmNcIikudGhlbigodmFsdWUpID0+IHsgcmV0dXJuIHZhbHVlID8gdmFsdWUuZHJkIDogbnVsbCB9KTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hhbmdlT2JqIG9ic2FodWplIG5vdm91IHZ5YnJhbm91IGhvZG5vdHUuIFByaSB6bWVuZSBtZXNpY2UgbXVzaW0gbmVqcHJ2ZSB2eW1hemF0IHB1dm9kbmkgRFJEIGEgc3VicmFkdSBhIHpwcmlzdHVwbml0IHBvbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWeW1hemFuaSBkcmR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKEZpZWxkcy5EcmQpLmdmaWVsZChcImNsZWFyXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWeW1hemFuaSBzdWJyYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKEZpZWxkcy5DaXNsb0Rva2xhZHUpLmdmaWVsZChcImNsZWFyXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6bmVwcmlzdHVwbmltL3pwcmlzdHVwbmVuaSBkcnVodSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKEZpZWxkcy5EcmQpLmdmaWVsZChcIm9wdGlvblwiLCB7IGRpc2FibGVkOiBjaGFuZ2VPYmogPT0gbnVsbCB8fCBjaGFuZ2VPYmoudmFsdWUgPT0gbnVsbCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRheUZpZWxkT3B0aW9uczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGRzLkRlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImRlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoYXQuZG9rbGFkLkZpZWxkUGVybWlzc2lvbnM/LkRlbi52YWx1ZSA9PT0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA/ICh2YWx1ZSBhcyBudW1iZXIgPCAxMCA/ICcwJyArIHZhbHVlIDogU3RyaW5nKHZhbHVlKSkgOiB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiAodmFsdWUgYXMgbnVtYmVyIDwgMTAgPyAnMCcgKyB2YWx1ZSA6IFN0cmluZyh2YWx1ZSkpIGFzIHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGVsc2UgcmV0dXJuIHZhbHVlIGFzIGFueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwianJlczozMDE1MDA3MVwiLCAvL1JDIDMwMTUwMDcxIDogUm9rIC0gTcSbc8OtYyAtIERlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQ6IFwic2luZ2xlVmFsdWVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEcnVoIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcImpyZXM6MzAxNTAwNTVcIiB9KSAvL1JDIDMwMTUwMDU1IDogRHJ1aCBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImdzZWxlY3Rib3hcIiwgLy8gdHlwIHdpZGdldHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jZHJkUm96KCksIC8vIG1ldG9kYSB2cmFjaSBhdHJpYnV0eSBkYXRhLCBpdGVtVGVtcGxhdGUgYSBoZWxwZXJDb2x1bW5zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGRzLkRyZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkcmQ9dmFsdWUuZHJkXCIsIC8vIG9iamVrdG92ZSBwb2xpY2tvLCBtdXNpbSBzZSBuYSBob2Rub3R1IG9ka2F6b3ZhdCBwcmVzIHZhbHVlLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGF0LmRva2xhZC5GaWVsZFBlcm1pc3Npb25zPy5EcnVoRG9rbGFkdS52YWx1ZSA9PT0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsIC8vIGplIHVtb3puZW4gamVuIHZ5YmVyIHogY29tYmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c190eXA6ICgpID0+IHsgcmV0dXJuIHRoYXQuZmluZEZpZWxkcyhHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLlR5cERva2xhZHUpLmdmaWVsZChcImdldFZhbHVlQXN5bmNcIikudGhlbigodmFsdWUpID0+IHsgcmV0dXJuIHZhbHVlID8gdmFsdWUuaXhzX3R5cCA6IFwiXCIgfSkgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga3RnX3R5cDogKCkgPT4geyByZXR1cm4gdGhhdC5maW5kRmllbGRzKEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5GaWVsZHMuVHlwRG9rbGFkdSkuZ2ZpZWxkKFwiZ2V0VmFsdWVBc3luY1wiKS50aGVuKCh2YWx1ZSkgPT4geyByZXR1cm4gdmFsdWUgPyB2YWx1ZS5rdGdfdHlwIDogLTEgfSkgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzaWM6ICgpID0+IHsgcmV0dXJuIHRoYXQuZ2V0TWVzaWMoKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2VuZGE6IFwiUk9aXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY2hhbmdlT2JqKSA9PiB7IC8vIGNoYW5nZU9iaiBvYnNhaHVqZSBub3ZvdSB2eWJyYW5vdSBob2Rub3R1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5bWF6YW5pIHN1YnJhZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKEZpZWxkcy5DaXNsb0Rva2xhZHUpLmdmaWVsZChcImNsZWFyXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gem5lcHJpc3R1cG5pbS96cHJpc3R1cG5lbmkgc3VicmFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoRmllbGRzLkNpc2xvRG9rbGFkdSkuZ2ZpZWxkKFwib3B0aW9uXCIsIHsgZGlzYWJsZWQ6IGNoYW5nZU9iaiA9PSBudWxsIHx8IGNoYW5nZU9iai52YWx1ZSA9PSBudWxsIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VicmFkYSAvIGNpc2xvIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcImpyZXM6MzAxNTAwNzBcIiB9KSAvL1JDIDMwMTUwMDcwIDogU3VixZlhZGEgLyDEjMOtc2xvIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5QcmVmYWJzLmdzdWJzZXF1ZW5jZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZpZWxkcy5DaXNsb0Rva2xhZHUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoYXQuZG9rbGFkLkZpZWxkUGVybWlzc2lvbnM/LkNpc2xvRG9rbGFkdS52YWx1ZSA9PT0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLCAvLyB6b2JyYXogLi4uIHBybyB2eWJlciBuYW1pc3RvIGNvbWJhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcGVyYXRpb24sIGR0bywgbW9kZWxPcHRpb25zKSB7IC8vIE1ldG9kYSB2eXZvbGFuYSBwcmkgc3B1c3RlbmkgZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6IC8vIG5hcGxuZW5pIG11bHRpdmFsdWUgcG9saWNrYSB6IERUT1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBva3VkIG5lbmkgY2lzbG8gZG9rbGFkdSB2IERUTyBuYXBsbmVubywgbmljIG5lZGVsZWpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHRvLmFjX2l4ZSA9PT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPdHJpbXVqIHNpIGNpc2xvIGRva2xhZHUgeiBEVE9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdG8uYWNfaXhlID0gLyokLnRyaW0qLyhkdG8uYWNfaXhlIGFzIHN0cmluZykudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBaamlzdGkgc2kgemRhIGJ5bGEgemFkYW5hIHN1YnJhZGEgbmVibyBjaXNsbyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlzQ2lzbG9TdWJyYWRhOiBib29sZWFuID0gZHRvLmFjX2l4ZS5zdGFydHNXaXRoKFwiKlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQcmVjdGkgc2kgYnVkIGNpc2xvIGRva2xhZHUgbmVibyBzdWJyYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG51bWJlcjogbnVtYmVyID0gcGFyc2VJbnQoaXNDaXNsb1N1YnJhZGEgPyBkdG8uYWNfaXhlLnN1YnN0cigxKSA6IGR0by5hY19peGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQcmVjdGkgc2kgY28gamUgbmEgcG9saWNrdSB2eXBsbmVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9ICQodGhpcykuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5cGxuaW0gcG9sZSBob2Rub3RvdSAtIHZzZWNobnkgaG9kbm90eSB0byBzcG9qaSBkbyBqZWRub2hvIG9iamVrdHUgLSB0ai4gdnpuaWtuZSB2ZWxrZSBtdWx0aXBvbGlja29cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQodGhpcykuZ2ZpZWxkKG1vZGVsT3B0aW9ucz8uaW5pdGlhbFZhbHVlcyA/IFwic2V0SW5pdGlhbFwiIDogXCJzZXRWYWx1ZVwiLCAkLmV4dGVuZCh2YWx1ZSB8fCB7fSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlzUmVjZWlwdDogIWlzQ2lzbG9TdWJyYWRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGFjX2Npc2xvX2RvOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGFjX2Npc2xvX29kOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgaWNvOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIG5hemV2OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJvazogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBzdWJyYWRhOiBudW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgemtyYXRrYTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBfdmFsaWRhdGF0aW9uU3RhdGU6IFwidmVyaWZpZWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBfdmFsaWRhdGF0aW9uTXNnOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99KSwgJC5leHRlbmQoeyB2YWxpZDogdHJ1ZSB9LCBtb2RlbE9wdGlvbnM/LnNldEZsYWdzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCAkLmV4dGVuZCh2YWx1ZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JlY2VpcHQ6ICFpc0Npc2xvU3VicmFkYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNfY2lzbG9fZG86IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjX2Npc2xvX29kOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hemV2OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2s6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YnJhZGE6IG51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgemtyYXRrYTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZhbGlkYXRhdGlvblN0YXRlOiBcInZlcmlmaWVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92YWxpZGF0YXRpb25Nc2c6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsZWN0XCI6IC8vIG5hcGxuZW5pIERUTyBob2Rub3RvdSB6IG11bHRpdmFsdWUgcG9saWNrYSAodnJhY2kgdnpkeSBwb2xlKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQcmVjdGkgc2kgaG9kbm90dSBuYSBwb2xpY2t1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gJCh0aGlzKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgamUgdGF0byB2eXBsbmVuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgamUgcG9sZSBzdWJyYWRhLCBwcmlkZWogbXUgKi4gSmluYWsgamVqIG5lY2ggcHJhemRuZSAodnlwbG5lbm8gY2lzbG8gZG9rbGFkdSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2YWx1ZS5pc1JlY2VpcHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0by5hY19peGUgPSBcIipcIiArIHZhbHVlLnN1YnJhZGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHRvLmFjX2l4ZSA9IHZhbHVlLnN1YnJhZGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJpZnk6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBvdmVyZW5pIHphZGFuZWhvIGNpc2xhIGRva2xhZHUuIFByb3prb3VtYXQgY28gdG8gZGVsYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIHsgc3VicmFkYTogdmFsdWUsIF92YWxpZGF0YXRpb25TdGF0ZTogXCJub252ZXJpZmllZFwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh2YWx1ZSAmJiB2YWx1ZS5pc1JlY2VpcHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdmFsdWUuX3ZhbGlkYXRhdGlvbk1zZyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHZhbHVlLl92YWxpZGF0YXRpb25TdGF0ZSA9IFwidmVyaWZpZWRcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy9yZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBLb250cm9sYUNpc2xhRG9rbGFkdSh0aGF0LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL21vZGVsOiBcInZhbHVlLnJvaz1tb2RlbC5yb2s7dmFsdWUuaWNvPW1vZGVsLmljbzttb2RlbC5hY19peGU9dmFsdWUuc3VicmFkYVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZW5kYTogNTAsIC8vIFJPWlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmQ6ICgpID0+IHsgcmV0dXJuIHRoYXQuZmluZEZpZWxkcyhGaWVsZHMuRHJkKS5nZmllbGQoXCJnZXRWYWx1ZUFzeW5jXCIpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB2YWx1ZSA/IHZhbHVlLmRyZCA6IC0xIH0pIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhhdC5kb2tsYWQuaGVhZGVyPy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvazogdGhhdC5kb2tsYWQuaGVhZGVyPy5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjczogdGhhdC5kb2tsYWQuaGVhZGVyPy51Y3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc2ljOiAoKSA9PiB7IHJldHVybiB0aGF0LmdldE1lc2ljKCkgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDE1MDAzNlwiIH0pIC8vUkMgMzAxNTAwMzYgOiDEjMOhc3RrYSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImdudW1iZXJib3hcIiwgICAgICAgICAgICAgICAgICAgICAgIC8vIGZpZWxkVHlwZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksICAgLy8gZmllbGRPcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBleHRlbmRlZE9wdGlvbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBGaWVsZHMuQ2FzdGthLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhhdC5kb2tsYWQuRmllbGRQZXJtaXNzaW9ucz8uQ2FzdGthLnZhbHVlID09PSBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5UeXBlOiBcImRlY2ltYWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VrY2UgZG9wbG51amljaWNoIHVkYWp1IC1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtRGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMDE1MDA1N1wiKTsgLy9SQyAzMDE1MDA1NyA6IERvcGzFiHVqw61jw60gaW5mb3JtYWNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmRva2xhZC5GaWVsZFBlcm1pc3Npb25zPy5BaGxhdmlja2EudmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHRoYXQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcyEuU3ByYXZhQUhsYXZpY2VrID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMTUwMTQ2XCIgfSkgLy9SQyAzMDE1MDE0NiA6IMSMw61zbG8gQS1obGF2acSNa3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5TZWxlY3Qucm96c2FobCgpLCAvLyBtZXRvZGEgdnJhY2kgYXRyaWJ1dHkgZGF0YSwgaXRlbVRlbXBsYXRlIGEgaGVscGVyQ29sdW1uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGRzLkFIbGF2aWNrYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaXhzX2FobD12YWx1ZS5peHNfYWhsXCIsIC8vIG9iamVrdG92ZSBwb2xpY2tvLCBtdXNpbSBzZSBuYSBob2Rub3R1IG9ka2F6b3ZhdCBwcmVzIHZhbHVlLm5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhhdC5kb2tsYWQuRmllbGRQZXJtaXNzaW9ucz8uQWhsYXZpY2thLnZhbHVlID09PSBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiB0aGF0LmRva2xhZC5oZWFkZXI/LnJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhhdC5kb2tsYWQuaGVhZGVyPy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYV9zdGF2OiBcIjwgMjAgXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZG9rbGFkLkZpZWxkUGVybWlzc2lvbnM/LkNpc2xvU2FibG9ueUVkcy52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMTUwMTQ3XCIgfSkgLy9SQyAzMDE1MDE0NyA6IMSMw61zbG8gxaFhYmxvbnkgRURTL1NNVlNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5TZWxlY3Qucm96c2FobCgpLCAvLyBtZXRvZGEgdnJhY2kgYXRyaWJ1dHkgZGF0YSwgaXRlbVRlbXBsYXRlIGEgaGVscGVyQ29sdW1uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGRzLkNpc2xvRWRzU212cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiY2lzX3NhYmxfZWRzPXZhbHVlLmNpc19zYWJsX2Vkc1wiLCAvLyBvYmpla3RvdmUgcG9saWNrbywgbXVzaW0gc2UgbmEgaG9kbm90dSBvZGthem92YXQgcHJlcyB2YWx1ZS5uYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoYXQuZG9rbGFkLkZpZWxkUGVybWlzc2lvbnM/LkNpc2xvU2FibG9ueUVkcy52YWx1ZSA9PT0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvazogdGhhdC5kb2tsYWQuaGVhZGVyPy5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoYXQuZG9rbGFkLmhlYWRlcj8uaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFfc3RhdjogXCI8MjBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGFzIEdTZWxlY3RCb3hPcHRpb25zTXVsdGk8YW55PixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXBsaWthY2Uga29tdW5pa3VqZSBzZSBzdGF0bmkgcG9rbGFkbm91IGEgamUgcG92b2xlbmEgZnVua2Nub3N0IHZhbGlkYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZG9rbGFkLkZpZWxkUGVybWlzc2lvbnM/Lk1hbmFnZXJDaWxlLnZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURldGFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcImpyZXM6MzAyNTA0NzlcIiB9KSAvL1JDIDMwMjUwNDc5IDogVsO9a29ubsO9IHJvenAua29tcGV0ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJnc2VsZWN0Ym94XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTpGaWVsZHMuTWFuYWdlckNpbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGF0LmRva2xhZC5GaWVsZFBlcm1pc3Npb25zPy5NYW5hZ2VyQ2lsZS52YWx1ZSA9PT0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7bWFuYWdlcl9jaWxlX3R4dDp0cmltOmVuY29kZX1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19ldnA9dmFsdWUuaXhzX2V2cCxtb2RlbC5peHNfZXZwX2VvPXZhbHVlLml4c19ldnBfZW8sbW9kZWwubWFuYWdlcl9jaWxlX3R4dD12YWx1ZS5tYW5hZ2VyX2NpbGVfdHh0LG1vZGVsLml4c19mdW5fbW5nPXZhbHVlLml4c19mdW5fbW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWVsZCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGZpZWxkLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQ6IEdSb3pPcHRpb25NYW5hZ2VyQ2lsdSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfZXZwOiB2YWx1ZT8uaXhzX2V2cCwgLy92YWx1ZS5peHNfZXZwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19ldnBfZW86IHZhbHVlPy5peHNfZXZwX2VvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5jb250ZW50KGZpZWxkKS5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5Sb3ouV2ViQ2xpZW50LkdSb3pNYW5hZ2VyQ2lsZVwiLCB7IE9wdGlvbklucHV0OiBpbnB1dCB9LCB7IHdpZHRoOiAxMDAwLCBoZWlnaHQ6IDUwMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhcmVzdWx0ITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IEdSb3pPcHRpb25NYW5hZ2VyQ2lsdSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogTmV2aW0sIHpkYSB0byB6ZGUgbXVzaSBieXQ/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2ZpZWxkLmdmaWVsZChcInNldFZhbHVlXCIsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQXBsaWthY2Uga29tdW5pa3VqZSBzZSBzdGF0bmkgcG9rbGFkbm91IGEgamUgcG92b2xlbmEgZnVua2Nub3N0IHZhbGlkYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZ2xvYmFscy5Fa29QYXJhbXMhLlByaXpJaXNzcCAhPSAwICYmIHRoYXQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcyEuUG92b2xlbmFGdW5rY25vc3RWYWxpZGFjZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtRGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDE1MDE0OFwiIH0pIC8vUkMgMzAxNTAxNDggOiDEjMOtc2xvIGplZG5hY8OtIC0ga2FwaXRvbGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImdzdHJpbmdib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInctMTJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IEZpZWxkcy5Qb3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaGVhZGVyLnBvcGlzPXBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9TaXplOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRoYXQuZG9rbGFkLkZpZWxkUGVybWlzc2lvbnM/LlBvcGlzLnZhbHVlID09PSBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDIyLjA3LjIyIEtLIC0gdWN0YXJuYSBwcmVzdW51dGEgZG8gaGxhdmlja3kgZG9rbGFkdSB2ZWRsZSByZWFsaXphdG9yYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLmFkZFJvdyh7IGxhYmVsOiBcImpyZXM6MzAxNTAwNTZcIiB9KSAvL1JDIDMwMTUwMDU2IDogw5rEjXTDoXJuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1dXMoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IEZpZWxkcy5VY3Rhcm5hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIG1vZGVsOiBcIm1vZGVsLnV1cz12YWx1ZS51dXMsbW9kZWwuaWNvPT52YWx1ZS5pY28sbW9kZWwudWNzPT52YWx1ZS51Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7dXVzOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBkaXNhYmxlZDogdGhhdC5kb2tsYWQuRmllbGRQZXJtaXNzaW9ucz8uVWN0YXJuYS52YWx1ZSA9PT0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHNlcnZlckZpbHRlcnM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGljbzogdGhhdC5kb2tsYWQuaGVhZGVyPy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB1Y3M6IHRoYXQuZG9rbGFkLmhlYWRlcj8udWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgcm9rX29kOiBcIjw9IFwiICsgdGhhdC5kb2tsYWQuaGVhZGVyPy5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICByb2tfZG86IFwiPj0gXCIgKyB0aGF0LmRva2xhZC5oZWFkZXI/LnJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBla292ZnVzX2l4c19mdW46IHRoYXQuZ2xvYmFscy5WYXpiYVVjdGFybnlOYUZ1bmtjaSA/IHRoYXQuZ2xvYmFscy5JeHNGdW4gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNla2NlIHMgdmVsa3ltIHBvcGlzZW0gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBsYWJlbDogXCJqcmVzOjMwMTUwMTI2XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxLCBMLTAtMTItMCwgTS0wLTEyLTAsIFMtMC0xMi0wXCIgfSkgLy9SQyAzMDE1MDEyNiA6IFBvcGlzXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMTUwMDM3XCIgfSkgLy9SQyAzMDE1MDAzNyA6IFBvcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJnc3RyaW5nYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInctMTJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBGaWVsZHMuUG9waXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwicG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9TaXplOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhhdC5kb2tsYWQuRmllbGRQZXJtaXNzaW9ucz8uUG9waXMudmFsdWUgPT09IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXR2b3JlbmkgZm9ybXVsYXJlIHogamVobyBkZWZpbmljZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYi5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybURldGFpbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFByaWRlaiBmb3JtdWxhciBkbyB0YWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURldGFpbC5hcHBlbmRUbyh0YWIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUYWIgXCJSb3pwb2N0b3ZlIHphcGlzeVwiIC0gUG9yaXpvdmFja2EgKGZpbmFuY25pIHByb2ZpbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGFiUm96cG9jdG92ZVphcGlzeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzAxNTAwODRcIiwgLy9SQyAzMDE1MDA4NCA6IFBvbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAxNi4wOC4yMiBLSyAtIGRsZSB1eml2YXRlbHNrZWhvIG5hc3RhdmVuaSBqZSBtb3pubyBwb3Jpem92YWMgem9icmF6aXQgdiBzYW1vc3RhdG5lIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgemFsb3pjZSBhIG5lYm8gcHJpbW8gdiBaYWtsYWRuaWNoIHVkYWppY2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB7IGlkOiBcInN1YlphcGlzeVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHRoYXQudW1pc3RlbmlaYXBpc3UgPT0gR29yZGljLlJvei5BcHBTZXR0aW5ncy5FR1BvbG96a3lWaWV3LlRhYlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IEdvcmRpYy5QcmVmYWJzLlRhYkdyb3Vwcy5BZ2VuZGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHsgaWQ6IFwic3ViWmFwaXN5XCIgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWVudSB6b2JyYXplbmUgbmEgdnJjaHUgdGFidVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IHRoaXMuY3JlYXRlTWVudVBvcml6b3ZhYygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXR2YXJpbSBzaSB6ZGUgZ3JpZCBwb3Jpem92YWNlIGEgdWxvemltIHNpIG5hIG5laiBvZGtheiBkbyBtb2R1bGFybmkgcHJvbWVubmUsIGFieWNoIGhvIG5lbXVzZWwgcG90b20gbmFjaXRhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJHBvcml6b3ZhYyA9ICQubmV3RGl2KFwianMtUm96UG9yaXpvdmFjR3JpZFwiKSAvLyQoXCI8ZGl2IGNsYXNzPSdqcy1Sb3pQb3Jpem92YWNHcmlkJz5cIikgLy8gVnl0dm9yZW5pIGRpdnUgcHJvIHBvcml6b3ZhY2t1LCBvem5hY2VuaSB0cmlkb3UganMtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpIC8vIHZ5c2t1IG5hc3RhdmltIG5hIDEwMCUgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiKSAvLyB2bGFzdG5pIHBvcml6b3ZhYyAoZ3JpZCkgdmxvemltIGRvIGRpdnVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlZmluaWNlIChrb25zdHJ1a3RvcikgZ3JpZHUgKGRvIGRpdnUgdmxvemVuaW0gd2lkZ2V0IGdyaWR1KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsIC8vIHRlemtva2xpZW50b3Z5IHJlemltIC0gxaHDrcWZa3kgc2xvdXBjxa8ganNvdSB6YWTDoW55IGZpeG7EmyB2IHBpeGVsZWNoLiBQb2t1ZCBqZSBjZWxrb3bDoSDFocOtxZlrYSBzbG91cGPFryBtZW7FocOtIG5lxb4gcHJvc3RvciB6b2JyYXplbsOtLCBidWRlIG5hIGtvbmNpIHByw6F6ZG7DqSBtw61zdG8uIFBva3VkIGplIMWhw63FmWthIHNsb3VwY8WvIHbEm3TFocOtIG5lxb4gxaHDrcWZa2Egem9icmF6ZW7DrSwgb2JqZXbDrSBzZSBzY3JvbGxiYXIgKGh0dHBzOi8veHdpa2kuZ29yZGljLmN6L05FVC93aWRnZXRzL2dncmlkLyNIY29sdW1uTW9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLCAvLyB1bW96bmkgdnliZXIgdmljZSBuZXogamVkbm9obyByYWRrdSAoaHR0cHM6Ly94d2lraS5nb3JkaWMuY3ovTkVUL3dpZGdldHMvZ2dyaWQvI0htdWx0aSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtpbmc6IHRydWUsIC8vIFDFmcOtem5haywgemRhIGplIHBvdm9sZW4gcmXFvmltIHNwZWNpw6FsbsOtaG8gdsO9YsSbcnUuIFNwZWNpw6FsbsOtIHbDvWLEm3IgamUgamVkZW4ga29ua3LDqXRuw60gxZnDoWRlaywga3RlcsO9IG3Fr8W+ZSB1xb5pdmF0ZWwgb3puYcSNaXQgcHJvIGRhbMWhw60gcHLDoWNpLiBabWVueSBsemUgc2xlZG92YXQgdiB1ZGFsb3N0aSBtYXJrIChodHRwczovL3h3aWtpLmdvcmRpYy5jei9ORVQvd2lkZ2V0cy9nZ3JpZC8jSG1hcmtpbmcpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVWTDoWxvc3QgbmFzdMOhdsOhIHDFmWkgem3Em27EmyB2w71ixJtydSDFmcOhZGvFryB2IGdyaWR1LiAoaHR0cHM6Ly94d2lraS5nb3JkaWMuY3ovTkVUL3dpZGdldHMvZ2dyaWQvI0hzZWxlY3Rpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IGZ1bmN0aW9uIChldiwgaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbmFzdGF2U3RhdnkodGhhdCwgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9SZWZyZXNoS1BJKHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VsZWN0aW9uXCIsIGluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZTogZnVuY3Rpb24gKGV2LCBpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjZWxsQWN0aXZhdGVcIiwgaW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dE1lbnU6IGZ1bmN0aW9uIChjZWxsQ29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKHRoYXQuZ2V0TWVudUFjdGlvbnMoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTsOhemV2IHZsYXN0bm9zdGksIG5lYm8gZGVsZWfDoXQsIGt0ZXLDvSDFmcOta8OhLCBrdGVyw6kgxZnDoWRreSBqc291IG5lYWt0aXZuw60gKGRpc2FibGVkKS4gTmVha3Rpdm7DrSDFmcOhZGt5IG1hasOtIGppbm91IGdyYWZpY2tvdSByZXByZXplbnRhY2kuIChodHRwczovL3h3aWtpLmdvcmRpYy5jei9ORVQvd2lkZ2V0cy9nZ3JpZC8jSHJvd3NFbmFibGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gMTEuOC4yMCBLSyAtIHZzZWNobnkgcmFka3kganNvdSB6YXRpbSBwcmlzdHVwbmUsIHByaXBhZG5lIHJlc2l0IHBvemRlamlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcm93c0VuYWJsZWQ6IGZ1bmN0aW9uIChtZXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyBjbyB0b2hsZSB2eWphZHJ1amUgPyBqZSB0YW0gc3RhdiBkb2tsYWR1IGkgemFwaXN1IG5hamVkbm91ID8/Pz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybiBtZXRhICYmIG1ldGEuZGF0YSAmJiAobWV0YS5kYXRhLnVwX3N0YXYgPT09IDAgJiYgbWV0YS5kYXRhLmFrdGl2aXRhID09PSAxMDAgJiYgdGhhdC5kb2tsYWQuc196YXUgIT09IDUwKSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1wicG9waXNcIl0sIC8vIE5hc3RhdmVuw60gc2xvdXBjxa8ga2xpZW50c2vDqWhvIGZpbHRyb3bDoW7DrSBwb21vY8OtIHbDvWNob3rDrWhvIHZ5aGxlZMOhdmHEjWUuIFV2w6Fkw60gc2Ugc2xvdXBjZSB2IGplamljaMW+IGhvZG5vdMOhY2ggYnVkZSB2eWhsZWTDoXZhdCB2w71jaG96w60gdnlobGVkw6F2YcSNIGdyaWR1LiBUeXBpY2t5IHNlbSBwYXTFmcOtIHV2w6lzdCB2xaFlY2hueSB0ZXh0b3bDqSBzbG91cGNlLiAgKGh0dHBzOi8veHdpa2kuZ29yZGljLmN6L05FVC93aWRnZXRzL2dncmlkLyNIc2VhcmNoQ29sdW1ucylcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEZWZpbmljZSBzbG91cGPFryB6b2JyYXplbsO9Y2ggdiBncmlkdSAodsSNZXRuxJsgZm9ybcOhdMWvLCBwxZllZHBpc8WvIGEgcHJhdmlkZWwgY2hvdsOhbsOtKS4gKGh0dHBzOi8veHdpa2kuZ29yZGljLmN6L05FVC93aWRnZXRzL2dncmlkLyNIY29sdW1ucylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoYXQuY3JlYXRlR3JpZEZvcm1hdFBvcml6b3ZhYyh0aGF0LnR5cFBvcml6b3ZhY2UpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVmxvemVuaSBkYXQgZG8gdmlldyBhIG5hc2xlZG5lIHpvYnJhemVuaSB2IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyh0aGF0LmRva2xhZC5yb3dzISwgeyBrZXk6IFwiaXhwLHJhZGVrX3pcIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGVCZWZvcmVDaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgc2UgZWRpdHVqZSwgbmVqc291IHBvdm9sZW55IHptxJtueSB2IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZ2V0R3JpZCgpPy5maW5kKFwiLnJvdy5lZGl0aW5nXCIpLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2ZpbGVDaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW5mb3JtYWNlICh2YXJvdsOhbsOtKSwgcG9rdWQgem3Em25hIHYgcHJvZmlsdSBtxa/FvmUgenDFr3NvYml0IG5lbW/Fvm5vc3QgZWRpdGFjZS4gdiB0YWtvdsOpbSBwxZnDrXBhZMSbIG5lbsOtIHBvdm9sZW5hIGVkaXRhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNoYW5nZVByb2ZpbGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2hhbmdlUHJvZmlsZSA9ICFHb3JkaWMuRWtvLkdyaWQuaXNTdGF0ZUZvckVkaXRpbmcoZ3JpZCwgb2JqLCB0cnVlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhhdC5jcmVhdGVHcmlkRm9ybWF0UG9yaXpvdmFjKHRoYXQudHlwUG9yaXpvdmFjZSksIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuU2V0RW5hYmxlQWN0aW9ucyh0aGF0LmRva2xhZC5BY3Rpb25QZXJtaXNzaW9ucyEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogTmFzdGF2ZW5pIHBvcml6b3ZhY2t5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqICovXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDFmMOhZGtvdsO9IGVkaXRvci4gRG8gZWRpdGFjZSBwxZllY2jDoXrDrSBuYSBwb8W+w6Fkw6Fuw60gY2Vsw70gxZnDoWRlay4gWmFqacWhxaV1amUgdmFsaWRpdHUgZGF0IHDFmWVkIHVsb8W+ZW7DrW0uIFBvZHBvcnVqZSBzZXJ2ZXJvdsOpIHVrbMOhZMOhbsOtIGRhdC4gTcWvxb5lIGLDvXQgcm96ZWRpdG92w6FuIHBvdXplIGplZGVuIMWZw6FkZWsuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZ3JpZHJvd2VkaXRvcjxVY3QuSW50ZXJmYWNlLkdSb3pkcGVwRHRvICYgeyByb2tfZXY/OiBudW1iZXIgfCBudWxsIH0gJiB7IG5ld1Jvdz86IGJvb2xlYW4gfCBudWxsIH0+KHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQb3ZvbGkga29waXJvdmF0IHogb3puYWNlbmVobyByYWRrdSAtICogXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxvd0NvcHk6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVG9obGUgYnljaCByZWtsLCB6ZSBqc291IHRsYWNpdGthIG5hIGtvbmNpIHYgcmFtY2kgcG9yaXpvdmFjaWhvIHJhZGt1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dCYXI6IEdvcmRpYy5XaWRnZXQuR01hZ2ljUHJlRmlsbGVyLmJ1dHRvbnMsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBVZGFsb3N0IHNwdXN0ZW5hIHByZWQgc3B1c3RlbmltIGVkaXRhY2UgcmFka3UuIE11enUgc2UgemRlIG5lY28gcHJlZHZ5cGxuaXQsIHBvcHJpcGFkZSBwb3Jpem92YW5pIHByaW1vIHphc3Rhdml0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBKZSB0byBzcHVzdGVubyBqYWsgcHJpIHBvcml6b3Zhbmkgbm92ZWhvIHRhayBwcmkgb3ByYXZlIHN0YXJlaG8gemFwaXN1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVmb3JlU3RhcnQ6IChldiwgaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBva3VpZCBiZXppIHByZWRrb250YWNlLCBwb3ZvbGl0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucHJlRmlsbEluUHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQb2t1ZCBieWwgem3Em27Em24gcHJvZmlsLCB6YWvDoXphdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmNoYW5nZVByb2ZpbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgamUgemFwaXMgdiBqaW5lbSBuZXogbmVldmlkb3ZhbmVtIHN0YXZ1LCB6YXBpcyBqZSBzdG9ybm92YW55IG5lYm8gZG9rbGFkIGplIHV6YXZyZW55LCB0YWsgdG8gdWtvbmNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8uY2VsbEluZm8uZGF0YSAmJiAoaW5mby5jZWxsSW5mby5kYXRhLnVwX3N0YXYgIT09IDAgfHwgaW5mby5jZWxsSW5mby5kYXRhLmFrdGl2aXRhICE9PSAxMDAgfHwgdGhhdC5kb2tsYWQuaGVhZGVyIS5zX3phdSA9PT0gNTApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgc2UgamVkbmEgbyBvcHJhdnUgemFwaXN1LCBkb2hsZWRlaiBzaSByb3p2cmggYSBkb3RhaG5pIHNpIG1lbnUuIFByaXBhZG5lIHpvYnJheiBjaHlidVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLmNlbGxJbmZvLmRhdGEubmV3Um93ICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvaGxlZGFuaSByb3p2cmh1ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvLmNlbGxJbmZvLmRhdGFbXCJpeHNSb3pcIl0gPSB0aGF0LmdldElkUm96dnJodShpbmZvLmNlbGxJbmZvLmRhdGEucm9rISwgaW5mby5jZWxsSW5mby5kYXRhLm5rcyEsIGluZm8uY2VsbEluZm8uZGF0YS51Y3MhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBva3VkIG5lYnlsIHJvenZyaCBkb2hsZWRhbiwgdGFrIHpvYnJheiBjaHlidSBhIHVrb25jaSB6cHJhY292YW5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLmNlbGxJbmZvLmRhdGFbXCJpeHNSb3pcIl0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGluZm8uY2VsbEluZm8uZGF0YS5kcmQhID09PSA5ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgR0Vycm9yKFwianJlczozMDI1MDUxMlwiKSAvL1JDIDMwMjUwNTEyIDogTmVuYWxlemVuIHJvenZyaCBwcm8gVkxaxZguXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBuZXcgR0Vycm9yKFwianJlczozMDI1MDUxM1wiKTsgLy9SQyAzMDI1MDUxMyA6IE5lbmFsZXplbiByb3p2cmguXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQcmVkcGxuIHNpIHBvbG96a3kgcG9yaXpvdmFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uY2VsbEluZm8uZGF0YVtcInJva19ldlwiXSA9IGluZm8uY2VsbEluZm8uZGF0YVtcInJva1wiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvLmNlbGxJbmZvLmRhdGFbXCJyb2tcIl0gPSB0aGF0LmRva2xhZC5oZWFkZXI/LnJvaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogVWRhbG9zdCBzcHVzdGVuYSBwcmkgemFjYXRrdSBlZGl0YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IChldiwgaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5Bc3RhdmltIHNpIHByaXpuYWssIHplIHByb2JpaGEgZWRpdGFjZSByYWRrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWRpdFJvd3MgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVcHJhdmVuaSBwb2xpY2VrLiBORXZpbSBwcmVzbmUsIGNvIHRvIG1hIGRlbGF0LCBwc2FsIFRvbWFzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kcG9yaXpvdmFjLmZpbmRGaWVsZHMoXCJzbWxvdXZhXCIsIFwicG96YWRhdmVrXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGluZm8uY2VsbEluZm8uZGF0YS5yb2tfZXYgPT09IHRoYXQuZ2xvYmFscy5Fa29QYXJhbXM/LlJvayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgZXhpc3R1amUgdmF6YmEgYSBqZSBuYXN0YXZlbiBwYXJhbWV0ciBhdXRvbWF0aWNreU5lYmFsYW5jb3ZhdGVsbmVVUHJpbWFybmljaERva2xhZHUsIHBhayBqZSBwcml6bmFrIGJhbGFuY292YW5pIG5lcHJpc3R1cG5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc2FibGUgPSAodGhhdC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zPy5aYWRhbmlQcml6bmFrdUJhbGFuY292YXRlbG5vc3RpID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLlphZGFuaVByaXpuYWt1QmFsYW5jb3ZhdGVsbm9zdGlFbnVtLmF1dG9tYXRpY2t5TmViYWxhbmNvdmF0ZWxuZVVQcmltYXJuaWNoRG9rbGFkdSAmJiB0aGF0LmRva2xhZC5WYXpiYUV4aXN0dWplKSB8fCBpbmZvLmNlbGxJbmZvLmRhdGEucm9rX2V2ID09PSB0aGF0Lmdsb2JhbHMuRWtvUGFyYW1zPy5Sb2s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kcG9yaXpvdmFjLmZpbmRGaWVsZHMoXCJwcml6X2JhbF9pbnZcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZGlzYWJsZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFpwcmlzdHVwbmkgcG91emUgVWxveml0L1pydXNpdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZU1lbnVQb3Jpem92YWModHJ1ZSk7IC8vIGVkaXRSb3c6dHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIFVkYWxvc3Qgc3B1c3RlbmEgcHJlZCB1bG96ZW5pbSByYWRrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZm9yZUNvbW1pdDogKGV2LCBpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5jZWxsSW5mby5kYXRhLnJvayA9IGluZm8uY2VsbEluZm8uZGF0YS5yb2tfZXY7IC8vIHByb2MgdG8gdHUgdG9tYXMgbWEgPyBUT0RPOiB6amlzdGkgc2kgayBjZW11IHR1IG1hIHJva19ldiAuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBVZGFsb3N0IHVsb3plbmkgcmFka3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXQ6IChldiwgaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9wZXQgbmVjaGFwdSwgayBjZW11IHNpIHRvIFRvbWFzIHVrbGFkYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5mby5jZWxsSW5mby5kYXRhLnJva19ldiAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5jZWxsSW5mby5kYXRhLnJvayA9IGluZm8uY2VsbEluZm8uZGF0YS5yb2tfZXY7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBva3VkIGJleiBwcmVka29udGFjZSwgdWtvbmNpIHRvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQucHJlRmlsbEluUHJvZ3Jlc3MgPT09IHRydWUpIHJldHVybjsgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgYXBsaWt1aiB2eXNsZWRuZSB1cHJhdmVuZSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVNZW51UG9yaXpvdmFjKGZhbHNlKTsgLy8gZWRpdFJvdzpmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudXBkYXRlRW5hYmxlTWVudURva2xhZCgpOyAvLyBNb2hseSBzZSB6bWVuaXQgcG9sb3preVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudXBkYXRlU3RhdHVzQmFyKCk7IC8vIFptZW5hIHRleHR1IHN0YXZ1IGRva2xhZHVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQganNlbSB1a2xhZGFsIG5vdnkgcmFkZWssIHRhayBtdSB2eXR2b3JpbSBwcm9ncmFtb3ZlIGRhbHNpIG5vdnkgcmFkZWssIHByb3RvemUgdmtsYWRhLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEx6ZSB0byBwb3RvbSBvbWV6aXQgcGFyYW1ldHJpY2t5IGNpIGppbmFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQganNlbSB1a2xhZGFsIG9wcmF2dSwgbm9ybWFsbmUgc2tvbmNpbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLmNlbGxJbmZvLmRhdGEubmV3Um93ISkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0OiBVY3QuSW50ZXJmYWNlLkdSb3pEb2tsYWRJbkR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhhdC5kb2tsYWQuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0X3ptZW5hOiB0aGF0LmRva2xhZC5oZWFkZXI/LmRhdF96bWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlBvcml6b3ZhY05vdnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZXhlY3V0ZUFjdGlvbihyZXF1ZXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVWxveiBzaSBwdXZvZG5pIGtvcGlpIG9iamVrdHUgLSBkZWVwIGNvcHksIG5lIHJlZmVyZW5jaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlvdXNEb2tsYWQgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhhdC5kb2tsYWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWcmFjZW5hIGRhdGEgc2xvdWNpbSBkbyBub3ZlaG8gb2JqZWt0dSBkb2tsYWR1LiBQcm92ZWR1IGhsdWJva291IGtvcGlpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5leHRlbmQodHJ1ZSwgdGhhdC5kb2tsYWQsIHJlc3BvbnNlLkRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOeW5pIHNpIG11c2ltIHZ5dGFobm91dCBwb3NsZWRuaSByYWRlaywga3RlcnkgamUgXCJyb3pwcmFjb3ZhbnlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RSb3c6IFVjdC5JbnRlcmZhY2UuR1JvemRwZXBEdG8gPSB0aGF0LmRva2xhZC5yb3dzIVt0aGF0LmRva2xhZC5yb3dzIS5sZW5ndGggLSAxXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnl2b2xhbmkgdWRhbG9zdGkgc3RhcnQgdiBwb3Jpem92YWNpOiBnZ3JpZHJvd2VkaXRvci5zdGFydChldixpbmZvKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJHBvcml6b3ZhYy5nZ3JpZHJvd2VkaXRvcihcImFkZFJvd1wiLCB7IC4uLmxhc3RSb3csIG5ld1JvdzogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogVWRhbG9zdCBwcmVkIHpydXNlbmltIHBvcml6b3ZhbmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWZvcmVDYW5jZWw6IChldiwgaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uY2VsbEluZm8uZGF0YS5yb2sgPSBpbmZvLmNlbGxJbmZvLmRhdGEucm9rX2V2OyAvLyBwcm9jIHRvIHR1IHRvbWFzIG1hID8gVE9ETzogemppc3RpIHNpIGsgY2VtdSB0dSBtYSByb2tfZXYgLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogVWRhbG9zdCBwbyBzdGlza251dGkgWnJ1c2l0IHBvcml6b3ZhbmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5jZWw6IChldiwgaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJlRmlsbEluUHJvZ3Jlc3MgPSBmYWxzZTsgLy8gUHJpem5hayB6cnVzZW5pIHByZWRrb250YWNlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5hc3RhdmltIHNpIHByaXpuYWssIHplIGVkaXRhY2UgcmFka3UgYnlsYSB6cnVzZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lZGl0Um93cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmV3Um93U3RhcnQgPSBmYWxzZTsgLy8gUHJpem5hayBwb3Jpem92YW5pIG5vdmVobyByYWRrdSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvLmNlbGxJbmZvLmRhdGEucm9rID0gaW5mby5jZWxsSW5mby5kYXRhLnJva19ldjsgLy8gcHJvYyB0byB0dSB0b21hcyBtYSA/IFRPRE86IHpqaXN0aSBzaSBrIGNlbXUgdHUgbWEgcm9rX2V2IC4uLlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOZW5pIHBvdHJlYmEgbmljIG5hY2l0YXQgbmEgc3RyYW5lIHNlcnZlcnUuIFBvdXplIHZyYXRpbSBwdXZvZG5pIGRhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVbG96IHNpIHB1dm9kbmkga29waWkgb2JqZWt0dSAtIGRlZXAgY29weSwgbmUgcmVmZXJlbmNpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kb2tsYWQgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhhdC5wcmV2aW91c0Rva2xhZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgcHJlcGlzIHZzZWNobnkgaG9kbm90eSBuYSBwdXZvZG5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51cGRhdGVNZW51UG9yaXpvdmFjKGZhbHNlKTsgLy8gZWRpdFJvdzpmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9nLmRlYnVnKFwicG9yaXpvdmFjLmNoYW5nZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBvcml6b3ZhYy5jaGFuZ2VcIiwgaW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogVWxvemVuaSB6YXBpc3UgcG8gdWtvbmNlbmkgZWRpdGFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmU6IChkYXRhLCBvYmopID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQT1BJUyBDSE9WQU5JICh2eXN2ZXRsZW5pIG9kIFRvbWFzZSBTa2FseSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUYXRvIG1ldG9kYSBqZSB2b2xhbmEgcG8gc3Rpc2tudXRpIE9LLCByZXNwLiBwbyBkb2ppdGkgbmEga29uZWMgcmFka3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWIGRhdGEgbWFtIGRhdGEgcmFka3UgKGludGVybmUgamUgdG8gZm9ybXVsYXIpLCBrdGVyYSB1eml2YXRlbCB2eXBsbmlsLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE55bmkgVG9tYXMgY2VrYSwgY28gc2Ugc3RhbmUgYSBobGF2bmUgY28gdnJhdGltLiBNb2h1IHZyYXRpdCByb3Zub3UgZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGEgbmVibyBwcm9taXNlLCBrdGVyeSBzbGlidWplLCB6ZSBtdSBkYXRhIHBvc2x1LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBva3VkIGJ5Y2ggbmVwb3NsYWwgbmljLCBncmlkIHNpIG15c2xpLCB6ZSBtYSBkYXRhIHZzZWNobnkgYSBwb3V6aWplIHRvLCBjb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHV6aXZhdGVsIHphZGFsLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBva3VkIG92c2VtIHByb21pc2UgbmVibyBkYXRhIHBvc2x1ICh0ZWR5IHRvLCBjbyBtaSB2cmF0aWwgc2VydmVyKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3RvbSB0byBUb21hcyBwb3V6aWplIGpha28gcGxhdG5hIGRhdGEgYSBwb2t1c2kgc2UgamUgbmEgcHJpc2x1c25lIG1pc3RvIGRvcGxuaXQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWmFrdGl2bmkgdmxvemVueS9vcHJhdmVueSByYWRlay4gUG96b3IsIHByaSB0cmlkZW5pIG5lbXVzaSBieXQgbmEga29uY2kgZ3JpZHUgIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFpvYnJhemVuaSBwZW5kaW5ndSB6YXJpenVqZSBUb21hcyBzYW0sIGtkeSBzZSB0b2NpIHRsYWNpdGtvIE9LXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5hc3RhdiBzaSwgemUgdXogbmVwcm9iaWhhIGVkaXRhY2UgcmFka3UsIHByb3RvemUgdWtsYWRhbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWRpdFJvd3MgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVxdWVzdDogVWN0LkludGVyZmFjZS5HUm96RG9rbGFkSGVhZGVyUm93SW5EdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogdGhhdC5kb2tsYWQuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRfem1lbmE6IHRoYXQuZG9rbGFkLmhlYWRlcj8uZGF0X3ptZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5Qb3Jpem92YWNVbG96aXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3MgOiBbZGF0YV0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXR2b3JpbSBzaSBwcm9taXNlIG5hIHByb3ZhZGVueSBjaGFpbiBha2NlLiBWIG9kcG92ZWRpIGplIHJlc3BvbnNlLmRhdGEgcyBtYWx5bSBkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZXhlY3V0ZUFjdGlvbihyZXF1ZXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVsb3ogc2kgcHV2b2RuaSBrb3BpaSBvYmpla3R1IC0gZGVlcCBjb3B5LCBuZSByZWZlcmVuY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlvdXNEb2tsYWQgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhhdC5kb2tsYWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZyYWNlbmEgZGF0YSBzbG91Y2ltIGRvIG5vdmVobyBvYmpla3R1IGRva2xhZHUuIFByb3ZlZHUgaGx1Ym9rb3Uga29waWlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIHRoYXQuZG9rbGFkLCByZXNwb25zZS5kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEZWZpbmljZSB6YXBpc3UgcyBwcml6bmFrZW0gbm92ZWhvL3B1dm9kbmlobyByYWRrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNhdmVkUm93OiBHUm96ZHBlcER0b1dpdGhGbGFnIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEucm93cyAmJiByZXNwb25zZS5kYXRhLnJvd3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbFJvd3MgPSByZXNwb25zZS5kYXRhLnJvd3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNOZXcgPSAhZGF0YS5yYWRla196IHx8IGRhdGEucmFkZWtfeiA9PT0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmV3KSAvLyBQb2t1ZCBqZSB0byBub3bDvSDFmcOhZGVrLCBqZSB0byBwb3NsZWRuw60gdiBwb2xpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVkUm93ID0geyAuLi5hbGxSb3dzW2FsbFJvd3MubGVuZ3RoIC0gMV0sIG5ld1JvdzogdHJ1ZSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyAvLyBQb2t1ZCBqZSB0byBvcHJhdmEgZXhpc3R1asOtY8OtaG8gxZnDoWRrdSAobcOhIHJhZGVrX3opXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gYWxsUm93cy5maW5kKHJvdyA9PiByb3cucmFkZWtfeiA9PT0gZGF0YS5yYWRla196KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZWRSb3cgPSBmb3VuZCA/IHsgLi4uZm91bmQsIG5ld1JvdzogZmFsc2UgfSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZyYXQgdnlzbGVkbnkgcmFkZWsgcG9yaXpvdmFjaS4gT2RzdWQgamRlbWUgZG8gdWRhbG9zdGkgY29tbWl0LCBrZGUgb2JzYWggb2Jub3ZpbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNhdmVkUm93O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ21hZ2ljcHJlZmlsbGVyPEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdVY3RSb3pka29uRHRvLCBHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96ZHBlcER0bz4oeyAvLyBUb3RvIGplIGsgY2VtdSA/PyBKZSB0YW0gbmVqYWthIGluaWNpYWxpemFjZSByYWRrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdERhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2s6IHRoYXQuZG9rbGFkLmhlYWRlcj8ucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5rczogdGhhdC5nbG9iYWxzLkVrb1BhcmFtcz8uTmtzIGFzIGFueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IHRoYXQuZG9rbGFkLmhlYWRlcj8udWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhhdC5kb2tsYWQuaGVhZGVyPy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9peHA6IHRoYXQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHRoYXQuZG9rbGFkLmhlYWRlcj8uaXhwX2RlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cF9zdGF2OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJkOiB0aGF0LmRva2xhZC5oZWFkZXI/LmRyZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfYWc6IDUwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0NvbW1pdFJvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG51dG5vIG9wcmF2aXQhIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyVmFsdWU6IHBhcnNlRGVjaW1hbCh0aGF0LmRva2xhZC5oZWFkZXI/LmMhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaGVhZGVyTURWYWx1ZTogcGFyc2VEZWNpbWFsKHRoYXQuVWNldG5pRG9rbGFkRHRvLkhsYXZpY2thRG9rbGFkdT8uYyEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3duTktTOiB0aGF0Lmdsb2JhbHMuRWtvUGFyYW1zPy5Oa3NWbCBhcyBhbnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXROS1M6IHRoYXQuZ2xvYmFscy5Fa29QYXJhbXM/Lk5rcyBhcyBhbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0YWIgU3RydWt0dXJhIHYgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1Nob3dUYWJTdHJ1a3R1cmFJSVNTUCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRhYlN0cnVrdHVyYVZJSVNTUFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwNDIwXCIsIC8vUkMgMzAyNTA0MjAgOiBTdHJ1a3R1cmEgdiBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFjdGVuaSBkYXQgcG8gb3RldnJlbmkgemFsb3preVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkSUtSb3dzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwibWVudVBJSVNTUFphSGxhdmlja3VcIiwgYWN0aW9uOiBBY3Rpb25zLklJU1NQU3RydWt0dXJhWmFIbGF2aWNrdSwgZmF2b3JpdGU6IHRydWUgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAxNi4wOC4yMiBLSyAtIGRsZSB1eml2YXRlbHNrZWhvIG5hc3RhdmVuaSBqZSBtb3pubyBwb3Jpem92YWMgem9icmF6aXQgdiBzYW1vc3RhdG5lIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgIHphbG96Y2UgYSBuZWJvIHByaW1vIHYgWmFrbGFkbmljaCB1ZGFqaWNoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiB0aGF0Lmdsb2JhbFNldHRpbmdzPy5nZXQoR29yZGljLlJvei5BcHBTZXR0aW5ncy5hcHBQYXRoICsgXCIuUm96U2V0dGluZ3NGb3JtLlBvbG96a3lWaWV3XCIpID09IEdvcmRpYy5Sb3ouQXBwU2V0dGluZ3MuRUdQb2xvemt5Vmlldy5UYWJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gR29yZGljLlByZWZhYnMuVGFiR3JvdXBzLkFnZW5kYSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHsgaWQ6IFwic3ViU3RydWt0dXJhXCIgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyaWRGb3JtYXQgPSB0aGF0LmNyZWF0ZUdyaWRGb3JtYXRJSVNTUCh0aGF0LnR5cFBvcml6b3ZhY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3VidGFza3kgbmEgcG9oeWIgYSBkb2tsYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ3N1YnRhc2tzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBjYXB0aW9uOiB0aGF0LmFjdGlvbnNbQWN0aW9ucy5JSVNTUFN0cnVrdHVyYUt1bXVsb3ZhdEJlek51bF0/LmNhcHRpb24sIGFjdGlvbjogdGhhdC5hY3Rpb25zW0FjdGlvbnMuSUlTU1BTdHJ1a3R1cmFLdW11bG92YXRCZXpOdWxdIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgY2FwdGlvbjogdGhhdC5hY3Rpb25zW0FjdGlvbnMuSUlTU1BTdHJ1a3R1cmFLdW11bG92YXREbGVJSVNTUF0/LmNhcHRpb24sIGFjdGlvbjogdGhhdC5hY3Rpb25zW0FjdGlvbnMuSUlTU1BTdHJ1a3R1cmFLdW11bG92YXREbGVJSVNTUF0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBjYXB0aW9uOiB0aGF0LmFjdGlvbnNbQWN0aW9ucy5JSVNTUFN0cnVrdHVyYUJlekt1bXVsYWNlXT8uY2FwdGlvbiwgYWN0aW9uOiB0aGF0LmFjdGlvbnNbQWN0aW9ucy5JSVNTUFN0cnVrdHVyYUJlekt1bXVsYWNlXSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlSXRlbTogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdHJlZVByb2Nlc3NvciA9IG5ldyBHb3JkaWMuRGF0YS5UcmVlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkRhdGEuVHJlZS5wYXJlbnRJZE9yZ2FuaXplcjxHUm96SUtTdHJ1a3R1cmE+KFwicGFyZW50SWRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyS2VlcFN0cnVjdHVyZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRTdGF0ZTogXCJ1bmtub3duXCIsLy8gKG0pID0+IHsgcmV0dXJuIG0uZGF0YS5ub2RlU3RhdGUgYXMgRGF0YVN0cnVjdHVyZVN0YXRlIHx8IFwidW5rbm93blwiOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRTdGF0ZTogKG0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9zbGVkbmkgdXJvdmVuIG5lYm8gYmV6IHJvenBhZHUgamUgb3RldnJlbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG0uZGF0YS5sZXZlbCA9PSAxIHx8IHR5cGVvZiBtLmRhdGE/LmNudCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBtLmRhdGE/LmNudCA9PT0gbnVsbCB8fCBtLmRhdGE/LmNudCA8IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJvcGVuXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbnV0bmUgb2RjdGVuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ1bmtub3duXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9keW5hbWljUmVxdWVzdDogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoZGF0YS5sZXZlbCA9PT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb3ZpZGVyID0gbmV3IEdvcmRpYy5EYXRhLlByb3ZpZGVyPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pkaXNwRHRvLCBHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96ZGlzcER0bz4oKHJlcSwgcmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQubG9hZElLUm93cyhyZXEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldzxHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96ZGlzcER0bz4oW10sIHsga2V5OiBcImlkXCIsIHByb2Nlc3NvcnM6IHsgdHJlZTogdHJlZVByb2Nlc3NvciwgcHJvdmlkZXI6IHByb3ZpZGVyIH0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQubmV3RGl2KFwianMtUm96U3RydWt0dXJhSUtHcmlkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKSAvLyB2eXNrdSBuYXN0YXZpbSBuYSAxMDAlID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWIpIC8vIHZsYXN0bmkgcG9yaXpvdmFjIChncmlkKSB2bG96aW0gZG8gZGl2dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVmaW5pY2UgKGtvbnN0cnVrdG9yKSBncmlkdSAoZG8gZGl2dSB2bG96ZW5pbSB3aWRnZXQgZ3JpZHUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLCAvLyB0ZXprb2tsaWVudG92eSByZXppbSAtIMWhw63FmWt5IHNsb3VwY8WvIGpzb3UgemFkw6FueSBmaXhuxJsgdiBwaXhlbGVjaC4gUG9rdWQgamUgY2Vsa292w6EgxaHDrcWZa2Egc2xvdXBjxa8gbWVuxaHDrSBuZcW+IHByb3N0b3Igem9icmF6ZW7DrSwgYnVkZSBuYSBrb25jaSBwcsOhemRuw6kgbcOtc3RvLiBQb2t1ZCBqZSDFocOtxZlrYSBzbG91cGPFryB2xJt0xaHDrSBuZcW+IMWhw63FmWthIHpvYnJhemVuw60sIG9iamV2w60gc2Ugc2Nyb2xsYmFyIChodHRwczovL3h3aWtpLmdvcmRpYy5jei9ORVQvd2lkZ2V0cy9nZ3JpZC8jSGNvbHVtbk1vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGVmaW5pY2Ugc2xvdXBjxa8gem9icmF6ZW7DvWNoIHYgZ3JpZHUgKHbEjWV0bsSbIGZvcm3DoXTFrywgcMWZZWRwaXPFryBhIHByYXZpZGVsIGNob3bDoW7DrSkuIChodHRwczovL3h3aWtpLmdvcmRpYy5jei9ORVQvd2lkZ2V0cy9nZ3JpZC8jSGNvbHVtbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogZ3JpZEZvcm1hdCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVmxvemVuaSBkYXQgZG8gdmlldyBhIG5hc2xlZG5lIHpvYnJhemVuaSB2IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdmlldyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5nYXV0b2ZpdCh7IHJlc2l6ZXJzT25UYWI6IGZhbHNlIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUYWIgdWthemF0ZWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTaG93VGFiVWthemF0ZWxlID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGFiU1VrYXphdGVsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwNDQ1XCIsIC8vUkMgMzAyNTA0NDUgOiBVa2F6YXRlbMOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL29wZW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gbmFjdGVuaSBkYXQgcG8gb3RldnJlbmkgemFsb3preVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LmxvYWRVa2F6YXRlbGVSb3dzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDE2LjA4LjIyIEtLIC0gZGxlIHV6aXZhdGVsc2tlaG8gbmFzdGF2ZW5pIGplIG1vem5vIHBvcml6b3ZhYyB6b2JyYXppdCB2IHNhbW9zdGF0bmUgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgemFsb3pjZSBhIG5lYm8gcHJpbW8gdiBaYWtsYWRuaWNoIHVkYWppY2hcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHRoYXQuZ2xvYmFsU2V0dGluZ3M/LmdldChHb3JkaWMuUm96LkFwcFNldHRpbmdzLmFwcFBhdGggKyBcIi5Sb3pTZXR0aW5nc0Zvcm0uUG9sb3preVZpZXdcIikgPT0gR29yZGljLlJvei5BcHBTZXR0aW5ncy5FR1BvbG96a3lWaWV3LlRhYlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBHb3JkaWMuUHJlZmFicy5UYWJHcm91cHMuQWdlbmRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogeyBpZDogXCJzdWJVa2F6YXRlbGVcIiB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JpZEZvcm1hdCA9IHRoYXQuY3JlYXRlR3JpZEZvcm1hVWthemF0ZWxlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvdmlkZXIgPSBuZXcgR29yZGljLkRhdGEuUHJvdmlkZXI8R29yZGljLlVjdC5JbnRlcmZhY2UuR1JvemRrenVWeXNsZWRla0R0bywgR29yZGljLlVjdC5JbnRlcmZhY2UuR1JvemRrenVWeXNsZWRla0R0bz4oKHJlcSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQubG9hZFVrYXphdGVsZVJvd3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pka3p1VnlzbGVkZWtEdG8+KHRoYXQuZG9rbGFkLnVrYXphdGVsZT8uU2V6bmFtISwgeyBwcm9jZXNzb3JzOiB7IHByb3ZpZGVyOiBwcm92aWRlciB9IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZvcm1EZXRhaWxcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMM00yUzEsIEwtMy05LTAsIE0tNC04LTAsIFMtMTItMTItMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RhdGljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NTJcIi5mb3JtYXQodGhhdC5kb2tsYWQudWthemF0ZWxlPy5SZXN1bHRPcGVyYXRpb24hKSAvL1JDIDMwMjUwNDUyIDogVsO9c2xlZGVrIG9wZXJhY2U6IHswfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YWJIZWFkID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRhYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm0uYXBwZW5kVG8odGFiSGVhZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLm5ld0RpdihcImpzLVJvelVrYXphdGVsZUdyaWRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpIC8vIHZ5c2t1IG5hc3RhdmltIG5hIDEwMCUgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRhYikgLy8gdmxhc3RuaSBwb3Jpem92YWMgKGdyaWQpIHZsb3ppbSBkbyBkaXZ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWZpbmljZSAoa29uc3RydWt0b3IpIGdyaWR1IChkbyBkaXZ1IHZsb3plbmltIHdpZGdldCBncmlkdSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsIC8vIHRlemtva2xpZW50b3Z5IHJlemltIC0gxaHDrcWZa3kgc2xvdXBjxa8ganNvdSB6YWTDoW55IGZpeG7EmyB2IHBpeGVsZWNoLiBQb2t1ZCBqZSBjZWxrb3bDoSDFocOtxZlrYSBzbG91cGPFryBtZW7FocOtIG5lxb4gcHJvc3RvciB6b2JyYXplbsOtLCBidWRlIG5hIGtvbmNpIHByw6F6ZG7DqSBtw61zdG8uIFBva3VkIGplIMWhw63FmWthIHNsb3VwY8WvIHbEm3TFocOtIG5lxb4gxaHDrcWZa2Egem9icmF6ZW7DrSwgb2JqZXbDrSBzZSBzY3JvbGxiYXIgKGh0dHBzOi8veHdpa2kuZ29yZGljLmN6L05FVC93aWRnZXRzL2dncmlkLyNIY29sdW1uTW9kZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEZWZpbmljZSBzbG91cGPFryB6b2JyYXplbsO9Y2ggdiBncmlkdSAodsSNZXRuxJsgZm9ybcOhdMWvLCBwxZllZHBpc8WvIGEgcHJhdmlkZWwgY2hvdsOhbsOtKS4gKGh0dHBzOi8veHdpa2kuZ29yZGljLmN6L05FVC93aWRnZXRzL2dncmlkLyNIY29sdW1ucylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBncmlkRm9ybWF0LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWbG96ZW5pIGRhdCBkbyB2aWV3IGEgbmFzbGVkbmUgem9icmF6ZW5pIHYgZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB2aWV3LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHZvaWQgMCBhcyBhbnksXHJcbiAgICAgICAgICAgICAgICAgICAgXS5maWx0ZXIoQm9vbGVhbilcclxuICAgICAgICAgICAgICAgIH0sIHRydWUpOyAvLyBrb21wb25lbnRhIGJ1ZGUgcMWZaWTDoW5hIHDFmWVkIHbFoWVjaG55IG9zdGF0bsOtLlxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFjdGVuaSB1a2F6YXRlbHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxvYWRVa2F6YXRlbGVSb3dzKCk6IEpRdWVyeVByb21pc2U8VWN0LkludGVyZmFjZS5HUm96VnlzbGVkZWtVa2F6YXRlbHVSZXNwb25zZUR0b1tdPiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBKUXVlcnlQcm9taXNlPFVjdC5JbnRlcmZhY2UuR1JvelZ5c2xlZGVrVWthemF0ZWx1UmVzcG9uc2VEdG9bXT47XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwNDQzXCIpIC8vUkMgMzAyNTA0NDMgOiBOYcSNw610w6FtLi4uXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuUm96VWthemF0ZWwuZ2V0VnlzbGVka3lVa2F6YXRlbHUoe1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB0aGF0LmRva2xhZC5oZWFkZXIhLFxyXG4gICAgICAgICAgICAgICAgdWthemF0ZWxlOiBudWxsIGFzIGFueVxyXG4gICAgICAgICAgICB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBncmlkID0gdGhhdC5nZXRHcmlkVWthemF0ZWxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgdGhyb3cgbmV3IEdFcnJvcjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmlldy51cGRhdGVEYXRhKGRhdGEuU2V6bmFtKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyOiBFcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogQ2h5YmEgc2UgdXppdmF0ZWxpIG5lem9icmF6aT8/PyEhISBSZXNpdCBhc2kgcyBCb2hvdXNlbVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBHRXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHsgdGhhdC5lbmRPcGVyYXRpb24oKSB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWN0ZW5pIHphcGlzdSBzdHJ1a3R1cnkgSUtcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxvYWRJS1Jvd3Mocm93PzogR29yZGljLlVjdC5JbnRlcmZhY2UuR1JvemRpc3BEdG8pOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDogSlF1ZXJ5UHJvbWlzZTxVY3QuSW50ZXJmYWNlLkdSb3pkaXNwRHRvW10+O1xyXG4gICAgICAgICAgICBsZXQgbG9hZFN1YmxldmVsID0gdHlwZW9mIHJvdyAhPT0gXCJ1bmRlZmluZWRcIjtcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTA0NDNcIikgLy9SQyAzMDI1MDQ0MyA6IE5hxI3DrXTDoW0uLi5cclxuICAgICAgICAgICAgaWYgKCF0aGF0LmFjdGlvbnNbQWN0aW9ucy5JSVNTUFN0cnVrdHVyYUJlekt1bXVsYWNlXT8uY2hlY2tlZCgpICYmICFsb2FkU3VibGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LmFjdGlvbnNbQWN0aW9ucy5JSVNTUFN0cnVrdHVyYVphSGxhdmlja3VdPy5jaGVja2VkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGF0LmlzbC5Sb3pJaXNzcC5nZXRSb3dzSWlzc3BLdW11bG92YW5lSGxhdmlja2Eoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwaWREb2tsYWR1OiAodGhhdC5kb2tsYWQuaGVhZGVyPy5peHNfYWhsISlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBudWxvdmVSYWRreTogIXRoYXQuYWN0aW9uc1tBY3Rpb25zLklJU1NQU3RydWt0dXJhS3VtdWxvdmF0QmV6TnVsXT8uY2hlY2tlZCgpIVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhhdC5pc2wuUm96SWlzc3AuZ2V0Um93c0lpc3NwS3VtdWxvdmFuZURva2xhZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpZERva2xhZHU6ICh0aGF0LmRva2xhZC5oZWFkZXI/Lml4cCEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgbnVsb3ZlUmFka3k6ICF0aGF0LmFjdGlvbnNbQWN0aW9ucy5JSVNTUFN0cnVrdHVyYUt1bXVsb3ZhdEJlek51bF0/LmNoZWNrZWQoKSFcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuYWN0aW9uc1tBY3Rpb25zLklJU1NQU3RydWt0dXJhWmFIbGF2aWNrdV0/LmNoZWNrZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoYXQuaXNsLlJveklpc3NwLmdldFJvd3NJaXNzcE5la3VtdWxvdmFuZUhsYXZpY2thKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGlkRG9rbGFkdTogKHRoYXQuZG9rbGFkLmhlYWRlcj8uaXhzX2FobCEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpazogbG9hZFN1YmxldmVsID8gdGhhdC5nZXRJSyhyb3cgYXMgR29yZGljLlVjdC5JbnRlcmZhY2UuR1JvemRpc3BEdG8pIDogbnVsbCBhcyBhbnlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoYXQuaXNsLlJveklpc3NwLmdldFJvd3NJaXNzcE5la3VtdWxvdmFuZURva2xhZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpZERva2xhZHU6ICh0aGF0LmRva2xhZC5oZWFkZXI/Lml4cCEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpazogbG9hZFN1YmxldmVsID8gdGhhdC5nZXRJSyhyb3cgYXMgR29yZGljLlVjdC5JbnRlcmZhY2UuR1JvemRpc3BEdG8pIDogbnVsbCBhcyBhbnlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZ3JpZCA9IHRoYXQuZ2V0R3JpZElLKClcclxuICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHRocm93IG5ldyBHRXJyb3I7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YTE6IEdSb3pJS1N0cnVrdHVyYVtdID0gW107XHJcbiAgICAgICAgICAgICAgICBpZiAobG9hZFN1YmxldmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudElkID0gdGhhdC5jcmVhdGVJZElLKGRhdGFbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZCA9IGkgKyBcIl9cIiArIHBhcmVudElkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBHUm96SUtTdHJ1a3R1cmEgPSB7IGlkOiBpZCwgcGFyZW50SWQ6IHBhcmVudElkLCBsZXZlbDogMSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhMS5wdXNoKCQuZXh0ZW5kKGRhdGFbaV0sIHZhbHVlLCB0cnVlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZChcIm9wdGlvblwiLCBcImNvbHVtbnNcIiwgdGhhdC5jcmVhdGVHcmlkRm9ybWF0SUlTU1AodGhhdC50eXBQb3Jpem92YWNlKSlcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdW1hID0gISh0aGF0LmFjdGlvbnNbQWN0aW9ucy5JSVNTUFN0cnVrdHVyYUJlekt1bXVsYWNlXT8uY2hlY2tlZCgpKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaWQgPSBzdW1hID8gdGhhdC5jcmVhdGVJZElLKGRhdGFbaV0pIDogXCJfXCIgKyBkYXRhW2ldLnJhZGVrX3o7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZTogR1JveklLU3RydWt0dXJhID0geyBpZDogaWQsIG1haW5JZDogaWQsIGxldmVsOiAwIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGExLnB1c2goJC5leHRlbmQoZGF0YVtpXSwgdmFsdWUsIHRydWUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmlldy51cGRhdGVEYXRhKGRhdGExKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhMTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuXHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnI6IEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL1RPRE86IENoeWJhIHNlIHV6aXZhdGVsaSBuZXpvYnJhemk/Pz8hISEgUmVzaXQgYXNpIHMgQm9ob3VzZW1cclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBHRXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyB0aGF0LmVuZE9wZXJhdGlvbigpIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgdW5pa2F0bmlobyBJRCB6IHJhZGt1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGN1cnJlbnRSb3dcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlSWRJSyhjdXJyZW50Um93OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96ZGlzcER0byk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlVmFsdWUoY3VycmVudFJvdy5pc3Bfa2FwKSArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlVmFsdWUoY3VycmVudFJvdy5pc3BfZmltKSArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlVmFsdWUoY3VycmVudFJvdy5pc3BfcnBvKSArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlVmFsdWUoY3VycmVudFJvdy5pc3BfcGFyKSArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlVmFsdWUoY3VycmVudFJvdy5pc3BfemRyKSArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlVmFsdWUoY3VycmVudFJvdy5pc3BfZWRzKSArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlVmFsdWUoY3VycmVudFJvdy5pc3BfdWNsKSArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlVmFsdWUoY3VycmVudFJvdy5pc3BfcHZzKSArXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcnNlVmFsdWUoY3VycmVudFJvdy5pc3BfbmQpICtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyc2VWYWx1ZShjdXJyZW50Um93LmlzcF9yZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByZXZvZCBob2Rub3R5IG5hIHN0cmluZ1xyXG4gICAgICAgICAqIEBwYXJhbSBpbnB1dFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwYXJzZVZhbHVlKGlucHV0OiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBpbnB1dCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBpbnB1dCA9PT0gbnVsbCA/IFwiXCIgOiBpbnB1dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTnFjdGVuaSBJSyBha3R1YWxuaWhvIHJhZGt1IGRvIHRyaWR5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRJSyhyYWRlazogR29yZGljLlVjdC5JbnRlcmZhY2UuR1JvemRpc3BEdG8pOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HU0lkZW50aWZpa2FjZUtvcnVueSB7XHJcbiAgICAgICAgICAgIGlmIChyYWRlayA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaXNwX2thcDogcmFkZWsuaXNwX2thcCxcclxuICAgICAgICAgICAgICAgIGlzcF9maW06IHJhZGVrLmlzcF9maW0sXHJcbiAgICAgICAgICAgICAgICBpc3BfcnBvOiByYWRlay5pc3BfcnBvLFxyXG4gICAgICAgICAgICAgICAgaXNwX3BhcjogcmFkZWsuaXNwX3BhcixcclxuICAgICAgICAgICAgICAgIGlzcF96ZHI6IHJhZGVrLmlzcF96ZHIsXHJcbiAgICAgICAgICAgICAgICBpc3BfZWRzOiByYWRlay5pc3BfZWRzLFxyXG4gICAgICAgICAgICAgICAgaXNwX3VjbDogcmFkZWsuaXNwX3VjbCxcclxuICAgICAgICAgICAgICAgIGlzcF9wdnM6IHJhZGVrLmlzcF9wdnMsXHJcbiAgICAgICAgICAgICAgICBpc3BfbmQ6IHJhZGVrLmlzcF9uZCxcclxuICAgICAgICAgICAgICAgIGlzcF9yZDogcmFkZWsuaXNwX3JkLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEplIG1vem5vIGVkaXRvdmF0IHJhZGVrXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGlzQ2FuRWRpdFJvdygpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRWRpdE1vZGUoKVxyXG4gICAgICAgICAgICAgICAgfHwgKCh0aGlzLm5ld1Jvd1N0YXJ0ICYmICF0aGlzLmRva2xhZC5BY3Rpb25QZXJtaXNzaW9ucz8uT3ByYXZpdFBvcml6b3ZhYz8udmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgKCF0aGlzLm5ld1Jvd1N0YXJ0ICYmICF0aGlzLmRva2xhZC5BY3Rpb25QZXJtaXNzaW9ucz8uTm92eVBvcml6b3ZhYyEudmFsdWUpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGdpcmRmb3JtYXR1IHBybyB1a2F6YXRlbGVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gdGhhdFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWFVa2F6YXRlbGUoKTogRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pka3p1VnlzbGVkZWtEdG8+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pka3p1VnlzbGVkZWtEdG8+KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X3VrYXphdGVsZVwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NDZcIiAvL1JDIDMwMjUwNDQ2IDogTsOhemV2IHVrYXphdGVsZVxyXG4gICAgICAgICAgICAgICAgICAgICwgd2lkdGg6IDI1MFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZ5c2xfb3Blcl91a2FcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDQ3XCIgLy9SQyAzMDI1MDQ0NyA6IFbDvXNsZWRla1xyXG4gICAgICAgICAgICAgICAgICAgICwgd2lkdGg6IDc1XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3VrYXphdGVsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ0OFwiLCAvL1JDIDMwMjUwNDQ4IDogVHlwIHVrYXphdGVsZVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX2tvbnRyb2x5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDQ5XCIsIC8vUkMgMzAyNTA0NDkgOiBUeXAga29udHJvbHlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hc2xfb3BlcmFjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ1MFwiLCAvL1JDIDMwMjUwNDUwIDogTsOhc2xlZG7DoSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0ZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDUxXCIsIC8vUkMgMzAyNTA0NTEgOiBUZXh0XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBnaXJkZm9ybWF0dSBwcm8gc3RydWt0dXJ1IHYgSUlTU1BcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gdGhhdFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0SUlTU1AodHlwUG9yaXpvdmFjZTogR1JvelR5cFBvcml6b3ZhY2UpOiBEYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1JveklLPiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGdyZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pJSz4oKTtcclxuICAgICAgICAgICAgaWYgKCF0aGF0LmFjdGlvbnNbQWN0aW9ucy5JSVNTUFN0cnVrdHVyYUJlekt1bXVsYWNlXT8uY2hlY2tlZCgpKVxyXG4gICAgICAgICAgICAgICAgZ3JkRm9ybWF0LmFkZFN0cnVjdHVyZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZHhcIiwgY2FwdGlvbjogXCJcIiwgd2lkdGg6IDMwLCBzdHJ1Y3R1cmVMZWFkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBQb3Jpem92YWNlID09IEdSb3pUeXBQb3Jpem92YWNlLlZMWlIpIHtcclxuICAgICAgICAgICAgICAgIGdyZEZvcm1hdFxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM2MFwiLCAvL1JDIDMwMjUwMzYwIDogUm9rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdudW1iZXJib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnJvaz12YWx1ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImpzLURXQ29uZmlnXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ3JkRm9ybWF0XHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX3pcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDIxXCIgLy9SQyAzMDI1MDQyMSA6IMSMLiDFmS5cclxuICAgICAgICAgICAgICAgICAgICAsIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA0MjJcIiAvL1JDIDMwMjUwNDIyIDogxIzDrXNsbyDFmcOhZGt1IHJvenBvxI10b3bDqWhvIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAsIHdpZHRoOiAzMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX2thcFwiLCBjYXB0aW9uOiBcIktBUFwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNDIzXCIgLy9SQyAzMDI1MDQyMyA6IEthcGl0b2xhXHJcbiAgICAgICAgICAgICAgICAgICAgLCB3aWR0aDogNDVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfZmltXCIsIGNhcHRpb246IFwiRklNXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA0MjRcIiAvL1JDIDMwMjUwNDI0IDogRmluYW7EjW7DrSBtw61zdG9cclxuICAgICAgICAgICAgICAgICAgICAsIHdpZHRoOiA2NFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlzcF9ycG9cIiwgY2FwdGlvbjogXCJSUE9cIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZGVzY3JpcHRpb246IFwianJlczozMDI1MDQyNVwiIC8vUkMgMzAyNTA0MjUgOiBSb3pwb8SNdG92w6EgcG9sb8W+a2FcclxuICAgICAgICAgICAgICAgICAgICAsIHdpZHRoOiA0OFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlzcF9wYXJcIiwgY2FwdGlvbjogXCJQQVJcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZGVzY3JpcHRpb246IFwianJlczozMDI1MDQyNlwiIC8vUkMgMzAyNTA0MjYgOiBQYXJhZ3JhZlxyXG4gICAgICAgICAgICAgICAgICAgICwgd2lkdGg6IDU1XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3pkclwiLCBjYXB0aW9uOiBcIlpEUlwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNDI3XCIgLy9SQyAzMDI1MDQyNyA6IFpkcm9qXHJcbiAgICAgICAgICAgICAgICAgICAgLCB3aWR0aDogNjFcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfZWRzXCIsIGNhcHRpb246IFwiRURTXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA0MjhcIiAvL1JDIDMwMjUwNDI4IDogRURTL1NNVlNcclxuICAgICAgICAgICAgICAgICAgICAsIHdpZHRoOiAxMDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfdWNsXCIsIGNhcHRpb246IFwiVUNMXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA0MjlcIiAvL1JDIDMwMjUwNDI5IDogw5rEjWVsXHJcbiAgICAgICAgICAgICAgICAgICAgLCB3aWR0aDogMTAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3B2c1wiLCBjYXB0aW9uOiBcIlBWU1wiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNDMwXCIgLy9SQyAzMDI1MDQzMCA6IFBWU1xyXG4gICAgICAgICAgICAgICAgICAgICwgd2lkdGg6IDg4XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3pqXCIsIGNhcHRpb246IFwiWkpcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZGVzY3JpcHRpb246IFwianJlczozMDI1MDQzMVwiIC8vUkMgMzAyNTA0MzEgOiBaw6F6bmFtb3bDoSBqZWRub3RrYVxyXG4gICAgICAgICAgICAgICAgICAgICwgd2lkdGg6IDMwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3VqXCIsIGNhcHRpb246IFwiVUpcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZGVzY3JpcHRpb246IFwianJlczozMDI1MDQzMlwiIC8vUkMgMzAyNTA0MzIgOiDDmnplbW7DrSBqZWRub3RrYVxyXG4gICAgICAgICAgICAgICAgICAgICwgd2lkdGg6IDQwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX25kXCIsIGNhcHRpb246IFwiTkRcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZGVzY3JpcHRpb246IFwianJlczozMDI1MDQzM1wiIC8vUkMgMzAyNTA0MzMgOiAgRHJ1aCBuw6Fyb2t1XHJcbiAgICAgICAgICAgICAgICAgICAgLCB3aWR0aDogMzhcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfcmRcIiwgY2FwdGlvbjogXCJSRFwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNDM1XCIgLy9SQyAzMDI1MDQzNSA6IERydWggcm96cG/EjXR1XHJcbiAgICAgICAgICAgICAgICAgICAgLCB3aWR0aDogMzhcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGF0Lmdsb2JhbHMuRGF0YWJhc2VQYXJhbXMhLk5hemV2UG9sZUMwISxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcmNlZDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhhdC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zIS5OYXpldlBvbGVDMSEsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICBmb3JjZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIiwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDE1MDA4N1wiLCAvL1JDIDMwMTUwMDg3IDogUG9waXNcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImpzLXBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGdyZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYWNpIGRyZCBkbGUgdnN0dXBuaWhvIHJva3VcclxuICAgICAgICAgKiBAcGFyYW0gcm9rXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldERyZChyb2s6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRva2xhZC5Sb3p2cmh5Py5Vc2VWTFpSISAmJiB0aGlzLnR5cFBvcml6b3ZhY2UgPT0gR1JvelR5cFBvcml6b3ZhY2UuVkxaUiAmJiByb2sgPiB0aGlzLmdsb2JhbHMuRWtvUGFyYW1zPy5Sb2shKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRva2xhZC5oZWFkZXI/LmRyZCE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHNldFJvenZyaCAtIE5hc3RhdmVuaSByb3p2cmh1XHJcbiAgICAgICAgICogQHBhcmFtIHt2c3R1cH0gR29yZGljLkVrby5XZWJDbGllbnQuR0RhdGFTZW50ZW5jZVBhcmFtc0R0b1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc2V0Um96dnJoKGZpZWxkRWxlbWVudDogSFRNTEVsZW1lbnQsIHZzdHVwOiBHb3JkaWMuRWtvLldlYkNsaWVudC5HRGF0YVNlbnRlbmNlUGFyYW1zRHRvLCBtYW5hZ2VyQ2xhc3M6c3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIERlZnJhZ21lbnRhY2UgcHJvbWVubmUgLSB2eXRhaG51IHNpIHplIHZzdHVwdSByb2ssdWNzIGEgbmtzXHJcbiAgICAgICAgICAgIGxldCB7IHJvaywgdWNzLCBua3MgfSA9IHZzdHVwOyAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgLy8gRG9obGVkYW0gc2kgcGlkIHJvenZyaHVcclxuICAgICAgICAgICAgbGV0IGlkUm96dnJoID0gdGhhdC5nZXRJZFJvenZyaHUocm9rISwgbmtzISwgdWNzISk7XHJcblxyXG4gICAgICAgICAgICAvLyBQb2t1ZCB2c3R1cCBuZW9ic2FodWplIERSRCwgdGFrIHNpIGhvIG5hY3RpXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdnN0dXAuZHJkID09PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgdnN0dXAuZHJkID0gdGhhdC5nZXREcmQocm9rISk7XHJcblxyXG4gICAgICAgICAgICB2c3R1cC5peHNSb3ogPSBpZFJvenZyaDtcclxuICAgICAgICAgICAgbGV0IG5hc3RhdlJvenZyaCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvLyBLb250cm9sYSBwbGF0bm9zdGkgcm96dnJodVxyXG4gICAgICAgICAgICBpZiAoIWlkUm96dnJoIHx8IGlkUm96dnJoLnRyaW0oKSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gUm96aG9kbnV0w60sIHpkYSBuYXN0YXZpdCByb3p2cmggcG9kbGUgdG9obywgY28gc2UgcG91xb7DrXbDoSAoVUNTIHZzIE5LUylcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LmRva2xhZC5Sb3p2cmh5Py5Vc2VVY3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBuYXN0YXZSb3p2cmggPSBCb29sZWFuKHVjcyAmJiB1Y3MudHJpbSgpICE9PSBcIlwiKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFzdGF2Um96dnJoID0gQm9vbGVhbihua3MgJiYgbmtzLnRyaW0oKSAhPT0gXCJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUG9rdWQgbmVtw6FtZSByb3p2cmggYSBuZW7DrSB0byB2YWxpZG7DrSBzdGF2LCB2eWhvxI8gY2h5YnVcclxuICAgICAgICAgICAgICAgIGlmICghbmFzdGF2Um96dnJoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTmVsemUgbmFzdGF2aXQgcm96dnJoIC0gY2h5YsOtIHBvxb5hZG92YW7DqSBob2Rub3R5XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlkUm96dnJoID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobmFzdGF2Um96dnJoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYW5hZ2VyQ2xhc3MgPSBHb3JkaWMuV2lkZ2V0LkdNYWdpY01hbmFnZXIuR01hZ2ljTWFuYWdlci53aWRnZXRDc3NDbGFzcztcclxuICAgICAgICAgICAgICAgICQoZmllbGRFbGVtZW50KS5jbG9zZXN0KFwiLlwiICsgbWFuYWdlckNsYXNzKS5nbWFnaWNtYW5hZ2VyKFwic2V0TWFnaWNGaWVsZHNcIiwgdnN0dXAsICQoZmllbGRFbGVtZW50KS8qLCBpZFJvenZyaCA9PT0gbnVsbCovKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBOYXN0YXZlbsOtIHJvenZyaHUgcyBrb250cm9sb3UgZXhpc3RlbmNlIE1hZ2ljIE1hbmFnZXJ1XHJcbiAgICAgICAgICAgIGlmIChuYXN0YXZSb3p2cmgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0ICRtYW5hZ2VyID0gJChmaWVsZEVsZW1lbnQpLmNsb3Nlc3QoXCIuXCIgKyBtYW5hZ2VyQ2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkbWFuYWdlci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNYWdpYyBNYW5hZ2VyIG5lYnlsIG5hbGV6ZW5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gT3bEm8WZLCDFvmUgbcOhIGdtYWdpY21hbmFnZXIgd2lkZ2V0XHJcbiAgICAgICAgICAgICAgICBpZiAoISRtYW5hZ2VyLmRhdGEoXCJnb3JkaWMtZ21hZ2ljbWFuYWdlclwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImdtYWdpY21hbmFnZXIgd2lkZ2V0IG5lbsOtIGluaWNpYWxpem92w6FuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJG1hbmFnZXIuZ21hZ2ljbWFuYWdlcihcInNldE1hZ2ljRmllbGRzXCIsIHZzdHVwLCAkKGZpZWxkRWxlbWVudCkpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDaHliYSBwxZlpIHZvbMOhbsOtIHNldE1hZ2ljRmllbGRzOiBcIiArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcikpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFjdGVuaSByb3p2cmh1IGRsZSBha3R1YWxuaWNoIGhvZG5vdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0SWRSb3p2cmh1KHJvazogbnVtYmVyLCBua3M6IHN0cmluZywgdWNzOiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgICAgICAgICAgLy8gS29udHJvbGEgdnN0dXBuw61jaCBwYXJhbWV0csWvXHJcbiAgICAgICAgICAgIGlmICghcm9rIHx8IHJvayA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiZ2V0SWRSb3p2cmh1OiBOZXBsYXRuw70gcm9rXCIsIHJvayk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUHJvIFZMWsWYIChEUkQgPSA5KSB2cmHFpSBzcGVjacOhbG7DrSByb3p2cmhcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0RHJkKHJvaykgPT09IDkpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kb2tsYWQuUm96dnJoeSB8fCAhdGhpcy5kb2tsYWQuUm96dnJoeS5JeHNWTFpSKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiZ2V0SWRSb3p2cmh1OiBOZW7DrSBuYXN0YXZlbiByb3p2cmggVkxaxZhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kb2tsYWQuUm96dnJoeS5JeHNWTFpSO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEtvbnRyb2xhIGV4aXN0ZW5jZSBzZXpuYW11IHJvenZyaMWvXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5kb2tsYWQuUm96dnJoeT8uU2V6bmFtIHx8IHRoaXMuZG9rbGFkLlJvenZyaHkuU2V6bmFtLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiZ2V0SWRSb3p2cmh1OiBTZXpuYW0gcm96dnJoxa8gamUgcHLDoXpkbsO9XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEhsZWTDoW7DrSByb3p2cmh1IHBvZGxlIFVzZVVjcyBwxZnDrXpuYWvFr1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmcgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZG9rbGFkLlJvenZyaHkuU2V6bmFtLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIFRyaW0gaG9kbm90IHDFmWVkIHBvcm92bsOhbsOtbVxyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbVVjcyA9IGl0ZW0udWNzPy50cmltKCkgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1Oa3MgPSBpdGVtLm5rcz8udHJpbSgpID8/IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2hVY3MgPSB1Y3M/LnRyaW0oKSA/PyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VhcmNoTmtzID0gbmtzPy50cmltKCkgPz8gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kb2tsYWQuUm96dnJoeT8uVXNlVWNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSGxlZMOhbsOtIHBvZGxlIFVDU1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtVWNzID09PSBzZWFyY2hVY3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gaXRlbS5JeHMgfHwgbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBVa29uxI1pIGZvckVhY2hcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEhsZWTDoW7DrSBwb2RsZSBOS1NcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbU5rcyA9PT0gc2VhcmNoTmtzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGl0ZW0uSXhzIHx8IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjsgLy8gVWtvbsSNaSBmb3JFYWNoXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIExvZ292w6Fuw60gcHJvIGRlYnVnZ2luZ1xyXG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ2V0SWRSb3p2cmh1OiBSb3p2cmggbmVieWwgbmFsZXplblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9rOiByb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5rczogbmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IHVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlVWNzOiB0aGlzLmRva2xhZC5Sb3p2cmh5Py5Vc2VVY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvc3R1cG5lUm96dnJoeTogdGhpcy5kb2tsYWQuUm96dnJoeT8uU2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBnaXJkZm9ybWF0dVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB0aGF0XHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXRQb3Jpem92YWModHlwUG9yaXpvdmFjZTogR1JvelR5cFBvcml6b3ZhY2UpOiBEYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1JvemRwZXBEdG8+IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBtYW5hZ2VyQ2xhc3MgPSBHb3JkaWMuV2lkZ2V0LkdNYWdpY01hbmFnZXIuR01hZ2ljTWFuYWdlci53aWRnZXRDc3NDbGFzcztcclxuICAgICAgICAgICAgbGV0IGRhdGFTZW50ZW5jZSA9ICQuZXh0ZW5kKHRoYXRbXCJkYXRhU2VudGVuY2VcIl0sIHtcclxuICAgICAgICAgICAgICAgIHNlbnRlbmNlVHlwZTogR29yZGljLkVrby5JbnRlcmZhY2UuVHlwVmV0eUVudW0uUm96cG9jdG92YSwgcm9rOiB0aGF0LmRva2xhZC5oZWFkZXI/LnJvayxcclxuICAgICAgICAgICAgICAgIGRyZDogdGhpcy5kb2tsYWQuaGVhZGVyPy5kcmRcclxuICAgICAgICAgICAgICAgIC8vLCBpeHNSb3o6XCJBNDQ2VVIwMEExQlhcIlxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBaYWNpbmFtIGRlZmluaWNpIGdyaWRmb3JtYXR1LiBQcmlkYW1lICBjaXNsbyByYWRrdVxyXG4gICAgICAgICAgICBjb25zdCBncmlkRm9ybWF0ID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1JvemRwZXBEdG8+KCk7XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX3pcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiI1wiLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDQwLFxyXG4gICAgICAgICAgICAgICAgZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcInVpLWRpc2FibGVkXCIsXHJcbiAgICAgICAgICAgICAgICBmb3JjZWQ6IHRydWUsIC8vIHNsb3VwZWMgbmVsemUgc2tyeXRcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBSb2sgcHJpZGF2YW1lIGRvIHBvcml6b3ZhY2UgamVuIHByaSBWTFpSXHJcbiAgICAgICAgICAgIGlmICh0eXBQb3Jpem92YWNlID09IEdSb3pUeXBQb3Jpem92YWNlLlZMWlIpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkUm9rKHtcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHlwIHdpZGdldHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdudW1iZXJib3hcIixcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9iamVrdCBzIGVqZWRub3RsaXZ5bWkgdm9sYmFtaSBhIG1ldG9kYW1pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5hemV2IHBvbGlja2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rXCIsIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyaWRhIHBvdXppdGEgcHJvIGRvaGxlZGFuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwianMtTm9EU0NoZWNrXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWV0b2RhIHBybyBpbXBsZW1lbnRhY2kgdmxvemVuaS96amlzdGVuaSBob2Rub3R5IHBvbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiAobW9kZSwgdmFsLCBvcHRpb25zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoKG1vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbC5yb2sgPSAkKHRoaXMpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdmFsLnJva19ldiwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInJva1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIFVkYWxvc3Qgdm9sYW5hIHBvIHptZW5lIGhvZG5vdHkgdiBwb2xpY2t1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAqICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IHRoYXQuY3JlYXRlUm96dnJoQ2hhbmdlSGFuZGxlcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlJva1wiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE7DoXpldiBwb2xlIHBybyBjaHlib3bDqSBobMOhxaFreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjaGFuZ2VPYmopID0+IGNoYW5nZU9iai52YWx1ZSwgICAgIC8vIEV4dHJha2NlIGhvZG5vdHkgeiBjaGFuZ2VPYmogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgkZmllbGQsIHJvaykgPT4geyAgICAgICAgICAgICAgICAgIC8vIFZsYXN0bsOtIG1ldG9kYSB2YWxpZGFjZSBzcGVjaWZpY2vDoSBwcm8gUk9LXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJva051bSA9IHJvayBhcyBudW1iZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBacMWZw61zdHVwbmkgcG9sZSBzbWxvdXZhLCBiYWxhbmNvdsOhbsOtLCBwb8W+YWRhdmVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJHBvcml6b3ZhYy5maW5kRmllbGRzKFwic21sb3V2YSxwcml6X2JhbF9pbnYscG96YWRhdmVrXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVmFsaWRhY2U6IFJvayBtdXPDrSBiw710ID49IGFrdHXDoWxuw60gcm9rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb2tOdW0gPCB0aGF0Lmdsb2JhbHMuRWtvUGFyYW1zPy5Sb2shKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQb2t1ZCBqZSB2IGVkaXRhY2kgYSByb2sgamUgMCwgbmFzdGF2IGFrdHXDoWxuw60gcm9rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5lZGl0Um93cyAmJiByb2tOdW0gPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZmllbGQuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdGhhdC5nbG9iYWxzLkVrb1BhcmFtcz8uUm9rISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWm9icmF6IGNoeWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZmllbGQuZ2ZpZWxkKFwic2V0RXJyb3JcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BwaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZTogXCJlcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiBcInJldmVyaWZ5RXJyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMwMjUwNTExXCIgIC8vUkMgMzAyNTA1MTEgOiBSb2sgbXVzw60gYsO9dCBzdGVqbsO9IG5lYm8gdsSbdMWhw60gbmXFviDDusSNZXRuw60gcm9rIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnliZXIgdGV4dCB2IGlucHV0IHBvbGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRmaWVsZC5maW5kKFwiaW5wdXRcIik/LnRyaWdnZXIoXCJzZWxlY3RcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBWYWxpZGFjZSBzZWxoYWxhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZhbGlkYWNlOiBQcm8gdsOtY2VsZXTDqSByb3pwb8SNdG92w6Fuw60gQkVaIGLEm8W+bsOpaG8gcm9rdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zPy5WaWNlbGV0ZVJvenBvY3RvdmFuaSA9PT1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5VY3QuSW50ZXJmYWNlLlZpY2VsZXRlUm96cG9jdG92YW5pRW51bS5hbm9CZXpCZXpuZWhvUm9rdSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb2tOdW0gPT09IHRoYXQuZ2xvYmFscy5Fa29QYXJhbXM/LlJvayEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkZmllbGQuZ2ZpZWxkKFwic2V0RXJyb3JcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9wcGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlOiBcImVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiBcInJldmVyaWZ5RXJyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMDI1MDUxNFwiICAvL1JDIDMwMjUwNTE0IDogUm9rIG11c8OtIGLDvXQgdsSbdMWhw60gbmXFviByb2sgZG9rbGFkdSFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGZpZWxkLmZpbmQoXCJpbnB1dFwiKT8udHJpZ2dlcihcInNlbGVjdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIFZhbGlkYWNlIHNlbGhhbGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gWm5lcMWZw61zdHVwbmkgcG9sZSBwcm8gYsSbxb5uw70gcm9rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJHBvcml6b3ZhYy5maW5kRmllbGRzKFwic21sb3V2YSxwcml6X2JhbF9pbnYscG96YWRhdmVrXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgcm9rTnVtID09PSB0aGF0Lmdsb2JhbHMuRWtvUGFyYW1zPy5Sb2spO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBQb3Jpem92YWNlICE9PSBHUm96VHlwUG9yaXpvdmFjZS5SZXplcnZhY2UpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkTmtzKHtcclxuICAgICAgICAgICAgICAgICAgICAvL25hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLm5rcyxcclxuICAgICAgICAgICAgICAgICAgICAvL3dpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICBmb3JjZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc2VsZWN0Ym94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zbmtzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmF6ZXYgcG9saWNrYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRld21wbGF0ZSBwcm8gem9icmF6ZW5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntua3M6dHJpbTplbmNvZGV9XCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNrcnl0aSB2eWJlcm92eWNoIHRlY2VrID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93U2VsZWN0QnV0dG9uOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpZGEgcHJvIGRvaGxlZGFuaSBwb21vY2kgalF1ZXJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwianMtTm9EU0NoZWNrXCIsLy8ganMtTktTXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1ldG9kYSBwcm8gaW1wbGVtZW50YWNpIHZsb3plbmkvemppc3RlbmkgaG9kbm90eSBwb2xlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaWNvPT52YWx1ZS5pY28sbW9kZWwubmtzPXZhbHVlLm5rc1wiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTZXJ2ZXJvdmUgZmlsdHJ5IHBybyB2eWhsZWRhdmFuaSBwb21vY2kgRjRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhhdC5kb2tsYWQuaGVhZGVyPy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhemJhVWNzTmFFa292bmtzOiB0aGF0LmRva2xhZC5oZWFkZXI/LnVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rX29kOiBcIjw9IFwiICsgdGhhdC5kb2tsYWQuaGVhZGVyPy5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJva19kbzogZnVuY3Rpb24gKHZzdHVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xldCByb2sgPSB0aGF0LiRwb3Jpem92YWMuZmluZEZpZWxkcyhcInJva1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb2sgPSB0aGF0LnR5cFBvcml6b3ZhY2UgPT0gR1JvelR5cFBvcml6b3ZhY2UuVkxaUiA/IHRoYXQuJHBvcml6b3ZhYy5maW5kRmllbGRzKFwicm9rXCIpLmdmaWVsZChcImdldFZhbHVlXCIpIDogdGhhdC5kb2tsYWQuaGVhZGVyPy5yb2s7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwUG9yaXpvdmFjZSA9PSBHUm96VHlwUG9yaXpvdmFjZS5WTFpSKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIj49IFwiICsgcm9rO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIj49IFwiICsgdGhhdC5kb2tsYWQuaGVhZGVyPy5yb2s/LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sLy9cIj49IFwiICsgdGhhdC5kb2tsYWQuaGVhZGVyPy5yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhemJhTmtzTmFGdW5rY2k6IHRoYXQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcyEuVmF6YmFOa3NOYUZ1bmtjaSA/IHRoYXQuZ2xvYmFscy5TZXNzaW9uUGFyYW1zIS5JeHNGdW4gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogVWRhbG9zdCB2b2xhbmEgcG8gem1lbmUgaG9kbm90eSB2IHBvbGlja3UgTktTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IHRoYXQuY3JlYXRlUm96dnJoQ2hhbmdlSGFuZGxlcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy5ua3MhLCAgICAgICAgIC8vIE7DoXpldiBwb2xlIChuYXDFmS4gXCJOS1NcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNoYW5nZU9iaikgPT4gY2hhbmdlT2JqLnZhbHVlPy5ua3MgICAgLy8gRXh0cmFrY2UgaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRVY3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JjZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc3VjcygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmF6ZXYgcG9saWNrYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGV3bXBsYXRlIHBybyB6b2JyYXplbmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcInt1Y3M6dHJpbTplbmNvZGV9XCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTa3J5dGkgdnliZXJvdnljaCB0ZWNlayA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dTZWxlY3RCdXR0b246IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpZGEgcHJvIGRvaGxlZGFuaSBwb21vY2kgalF1ZXJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImpzLU5vRFNDaGVja1wiLC8vIGpzLU5LU1wiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWV0b2RhIHBybyBpbXBsZW1lbnRhY2kgdmxvemVuaS96amlzdGVuaSBob2Rub3R5IHBvbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaWNvPT52YWx1ZS5pY28sbW9kZWwudWNzPXZhbHVlLnVjc1wiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VydmVyb3ZlIGZpbHRyeSBwcm8gdnlobGVkYXZhbmkgcG9tb2NpIEY0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhhdC5kb2tsYWQuaGVhZGVyPy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVmFsaWRhdG9yIHBvbGlja2EgLSBtdXNpIGJ5dCB2eXBsbmVuZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVyaWZ5OiBmdW5jdGlvbiAodGhpczogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmVyaWZ5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZ1bmN0aW9uICh0aGlzOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlJvekRva2xhZC5nZXRSZXppbSh7IGthdGVnb3JpZURva2xhZHU6IHRoYXQuZG9rbGFkLmhlYWRlcj8ua3RnX3R5cCBhcyBudW1iZXIsIG5rczogdGhhdC4kcG9yaXpvdmFjLmZpbmRGaWVsZHMoXCJua3NcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikubmtzLCB0aHJvd0V4Y2VwdGlvbjogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXppbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV6aW0gPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlemltID09PSAzMCAmJiAhdGhhdC5nbG9iYWxzIS5EYXRhYmFzZVBhcmFtcyEuVXJjZW5pUmV6aW11VWN0b3ZhbmlEbGVLYXRlZ29yaWVEb2tsYWR1ISl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6b2JyYXppdCBkaWFsb2dcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KHZ5YmVyb3ZlT2tubywge30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwMzY5XCIgLy9SQyAzMDI1MDM2OSA6IFbDvWLEm3IgcmXFvmltdSBmaW5hbmNvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiICYmIHJlc3VsdC5hY3Rpb25SYWRpb3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmFjdGlvblJhZGlvcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlemltO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXppbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYWN0ZW5pIGRhdCBjaXNlbG5pa3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5rcyA9IHRoYXQuJHBvcml6b3ZhYy5maW5kRmllbGRzKFwibmtzXCIpLmdmaWVsZChcImdldFZhbHVlXCIpPy5ua3MgPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlJvekRva2xhZC5nZXRVY3NUYWJsZSh7IG5rczogbmtzLCByZXppbTogcmV6aW0sIHVjc0ZpbHRlcjogXCJcIiB9KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLypyZXR1cm4gZGVmKi8udGhlbigoZGF0YURCKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5EYXRhLlNlbGVjdG9ycy5EZWZhdWx0U2VsZWN0b3Ioe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YURCLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVsYXRlZDogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDkwXCIsIC8vUkMgMzAyNTA0OTAgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0OTFcIiwgLy9SQyAzMDI1MDQ5MSA6IEhvZG5vdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBkZWYucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBVZGFsb3N0IHZvbGFuYSBwbyB6bWVuZSBob2Rub3R5IHYgcG9saWNrdSBVQ1NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiB0aGF0LmNyZWF0ZVJvenZyaENoYW5nZUhhbmRsZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLnVjcyEsICAgICAgICAgLy8gTsOhemV2IHBvbGUgKG5hcMWZLiBcIlVDU1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNoYW5nZU9iaikgPT4gY2hhbmdlT2JqLnZhbHVlPy51Y3MgICAgLy8gRXh0cmFrY2UgaG9kbm90eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFV1cyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbmFtZTogXCJ1dXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLnV1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy93aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzZWxlY3Rib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc3V1cygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1dXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyxuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWluOiAxLCBtYXg6IDIsIG1lc3NhZ2U6IFwiUG9sZSBqZSBtb2Mga3LDoXRrw6lcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3V1czp0cmltOmVuY29kZX1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1NlbGVjdEJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuZ2ZpZWxkKFwicmVzZXRFcnJvcnNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdXVzID0gY2hhbmdlT2JqLnZhbHVlID8gY2hhbmdlT2JqLnZhbHVlPy51dXMgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF1dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldEVycm9yXCIsIHsgc3RvcHBpbmc6IHRydWUsIGVycm9yVHlwZTogXCJlcnJvclwiLCBncm91cDogXCJyZXZlcmlmeUVyclwiLCBtZXNzYWdlOiBcImpyZXM6MzAyNTA1MTVcIi5mb3JtYXQoR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy51dXMpIH0pOyAgLy9SQyAzMDI1MDUxNSA6IHswfSBtdXPDrSBiw710IHphZMOhbm8uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGF0LmRva2xhZC5oZWFkZXI/LmljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2tfb2Q6IFwiPD0gXCIgKyB0aGF0LmRva2xhZC5oZWFkZXI/LnJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVrb3ZmdXNfaXhzX2Z1bjogdGhhdC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zIS5WYXpiYVVjdGFybnlOYUZ1bmtjaSA/IHRoYXQuZ2xvYmFscy5TZXNzaW9uUGFyYW1zIS5JeHNGdW4gOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y3M6ICh2c3R1cCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQuJHBvcml6b3ZhYy5maW5kRmllbGRzKFwidWNzXCIpPy5nZmllbGQoXCJnZXRWYWx1ZVwiKT8udWNzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC4kcG9yaXpvdmFjLmZpbmRGaWVsZHMoXCJ1Y3NcIik/LmdmaWVsZChcImdldFZhbHVlXCIpPy51Y3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9rX2RvOiBmdW5jdGlvbiAodnN0dXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwUG9yaXpvdmFjZSA9PSBHUm96VHlwUG9yaXpvdmFjZS5WTFpSKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCI+PSBcIiArICh0aGF0LnR5cFBvcml6b3ZhY2UgPT0gR1JvelR5cFBvcml6b3ZhY2UuVkxaUiA/IHRoYXQuJHBvcml6b3ZhYy5maW5kRmllbGRzKFwicm9rXCIpLmdmaWVsZChcImdldFZhbHVlXCIpIDogdGhhdC5kb2tsYWQuaGVhZGVyPy5yb2spOy8vdGhhdC4kcG9yaXpvdmFjLmZpbmRGaWVsZHMoXCJyb2tcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCI+PSBcIiArIHRoYXQuZG9rbGFkLmhlYWRlcj8ucm9rPy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaWNvPT52YWx1ZS5pY28sbW9kZWwudWNzPT52YWx1ZS51Y3MsbW9kZWwudXVzPXZhbHVlLnV1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2N1c3RvbUNsYXNzOiBcImpzLURXQ29uZmlnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkU29ydGVkRWtvQ2Z1U2V0KHRoYXQsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNFZGl0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhU2VudGVuY2U6IGRhdGFTZW50ZW5jZSxcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGUyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDE4LjguMjIgcG5vdmFrIC0gcHJpa2xhZCBwcmlkYW5pIG5hc2xlZG5lIGtvbnRyb2x5IHByaSBwb3N1bnUgbmEgZGFsc2kgcG9sZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kb2RhdGVjbmFLb250cm9sYToodmFsdWUpPT57cmV0dXJuIElzbGNhbGwgY29udGVudC5jYWxsKCk7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbENoZWNrOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zPy5acHJhY292YXRNYW5hemVyeUNpbHUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuS29udHJvbGFTbG92YUNvcih2YWx1ZT8uY29kZSA/PyBudWxsLCBudWxsKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGU0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkaXRpb25hbENoZWNrOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zPy5acHJhY292YXRNYW5hemVyeUNpbHUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuS29udHJvbGFTbG92YVVrYSh2YWx1ZT8uY29kZSA/PyBcIlwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWFuYWdlck9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMTguOC4yMiBwbm92YWsgLSBwcmlrbGFkIGZpbHRyb3ZhbmkgZGF0IHByaSBuYWNpdGFuaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhV29yZHNGaWx0ZXI6IChjb2xOYW1lLCBkYXRhdmlldykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcz8uWnByYWNvdmF0TWFuYXplcnlDaWx1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbE5hbWUgPT0gXCJ0ZTJcIiB8fCBjb2xOYW1lID09IFwidGU0XCIpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHRoaXMuRmlsdHJOYXBvdmVkeShjb2xOYW1lLGRhdGF2aWV3KSkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShkYXRhdmlldykucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gSXNsY2FsbCBjb250ZW50LmNhbGwoKTsgPT4gdnJhY2V0IERhdGFWaWV3IC8gcG9sZSBkdG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogMjQuMDkuMjUgS0sgLSBwdXZvZG5lIHpkZSBieWxvIGplbiBQcml6Q2hlY2tVZXRlLCBhbGUgbnluaSBtdXplIG5hYnl2YXQgaG9kbm90IDAsMSwyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgSmVsaWtveiBqZSB0byBwcm9tZW5uYSBib29sZWFuLCBtdXNlbCBqc2VtIHRvIGRvcGxuaXQgbmEgbG9naWNrb3Ugb3BlcmFjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VOb25EaWdpdGFsOiB0aGlzLmdsb2JhbHMuRWtvUGFyYW1zIS5Qcml6Q2hlY2tVZXRlISA+IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kcmQ6ICQuRGVmZXJyZWQoKS5yZXNvbHZlKHRoYXQuZG9rbGFkLmhlYWRlcj8uZHJkKS5wcm9taXNlKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIC5hZGRNRCh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9uYW1lOiBcImMwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhhdC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zIS5OYXpldlBvbGVDMCEsXHJcbiAgICAgICAgICAgICAgICAgICAgLy93aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcmNlZDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jdXN0b21DbGFzczpcImpzLWNhc3RrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ251bWJlcmJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwianMtTURcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5jMD12YWx1ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9uYW1lOiBcImMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhhdC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zIS5OYXpldlBvbGVDMSEsXHJcbiAgICAgICAgICAgICAgICAgICAgLy93aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcmNlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdudW1iZXJib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImpzLURBTFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmMxPXZhbHVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgc21hcnROYXZOZXh0RWxlbWVudDogKGN1cnJlbnRFbGVtZW50LCBuZXh0RWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gdGhhdC5jYWxsKFwia29udHJvbGFjYXN0a3lcIikudGhlbigocmVzdWx0KSA9PiB7IHJldHVybiByZXN1bHQgPyBuZXh0RWxlbWVudCA6IGZhbHNlOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmICh0eXBQb3Jpem92YWNlID09IEdSb3pUeXBQb3Jpem92YWNlLlZMWlIpIHtcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzbWxvdXZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzY0XCIsIC8vUkMgMzAyNTAzNjQgOiBTbWxvdXZhXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yY2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3NlbGVjdGJveFwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzbWxvdXZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHBfc21sPXZhbHVlLml4cF9zbWwsbW9kZWwuc21sb3V2YT12YWx1ZS5zbWxvdXZhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie3NtbG91dmE6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmllbGQgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZmllbGQuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpeHBfc21sID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gJChncmlkKS5maW5kKFwiLmNlbGwuZWRpdGluZ1wiKS5jbG9zZXN0KCcucm93JykuZXEoMCk7IC8vLnJvdy5lZGl0aW5nIG5lbXVzw60gYsO9dCBqZcWhdMSbIG5hc3RhdmVubywgdG90byBqZSBqaXN0xJtqxaHDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNpID0gZ3JpZC5nZ3JpZChcImNlbGxJbmZvXCIsIHJvdywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBfc21sID0gY2k/LmRhdGEuaXhwX3NtbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvayA9ICB0aGF0LiRwb3Jpem92YWMuZmluZEZpZWxkcyhcInJva1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW5wdXQ6IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkdJbnB1dFpVbG9oRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbWxvdXZhOiB2YWx1ZSA/IHZhbHVlLnNtbG91dmEgPyB2YWx1ZS5zbWxvdXZhIDogXCJcIiA6IFwiXCIsIGljbzogdGhhdC5kb2tsYWQuaGVhZGVyPy5pY28hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb2s6IHJvaywgdWNzOiB0aGF0LmRva2xhZC5oZWFkZXI/LnVjcyEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aWZpa2F0b3I6IGl4cF9zbWwsIGFrdF96bmFja2E6IHRoYXQuZG9rbGFkLmRva3VtZW50Py5ha3Rfem5hY2thLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBEb2tsYWR1OiB0aGF0LmRva2xhZC5oZWFkZXI/Lml4cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuY29udGVudChmaWVsZCkuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRWtvLldlYkNsaWVudC5HVnliZXJaVWxvaFwiLCB7IG9wdGlvbnM6IGlucHV0IH0sIHsgIHdpZHRoOiAxMjAwLCBoZWlnaHQ6IDUwMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Jlc3VsdFtcInNtbG91dmFcIl09XCJ2eWJyYW5hXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFyZXN1bHQhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuYXpldiA9IHJlc3VsdC5yb3cubmF6ZXY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlc3VsdC5hZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJTTUxcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgbmF6ZXYgdnlwbG5lbnkgbmVuaSwgdmxveiB0YW0gc3RhbmRhcmRuaSB0ZXh0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5hemV2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF6ZXYgPSBcImpyZXM6MzAyNTA0NzdcIi5mb3JtYXQocmVzdWx0LnJvdy5pZGVudGlmaWthdG9yKTsgLy9SQyAzMDI1MDQ3NyA6IFNtbG91dmEgezB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lmdsb2JhbHMuRGF0YWJhc2VQYXJhbXM/LlpvYnJhem92YXRQSURWUHJpbURva2xhZGVjaClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hemV2ID0gcmVzdWx0LnJvdy5pZGVudGlmaWthdG9yICsgXCJqcmVzOjMwMjUwNDc1XCI7IC8vUkMgMzAyNTA0NzUgOiAtU01MXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJFVlpcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgbmF6ZXYgdnlwbG5lbnkgbmVuaSwgdmxveiB0YW0gc3RhbmRhcmRuaSB0ZXh0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5hemV2KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF6ZXYgPSBcImpyZXM6MzAyNTA0NzhcIi5mb3JtYXQocmVzdWx0LnJvdy5pZGVudGlmaWthdG9yKTsgLy9SQyAzMDI1MDQ3OCA6IEVWWiB7MH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcz8uWm9icmF6b3ZhdFBJRFZQcmltRG9rbGFkZWNoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF6ZXYgPSByZXN1bHQucm93LmlkZW50aWZpa2F0b3IgKyBcImpyZXM6MzAyNTA0NzZcIjsgLy9SQyAzMDI1MDQ3NiA6IC1FVlpcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHNtbG91dmE6IG5hemV2LCBpeHBfc21sOiByZXN1bHQucm93LmlkZW50aWZpa2F0b3IgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcz8uWmFkYW5pUHJpem5ha3VCYWxhbmNvdmF0ZWxub3N0aSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5aYWRhbmlQcml6bmFrdUJhbGFuY292YXRlbG5vc3RpRW51bS5hdXRvbWF0aWNreUJhbGFuY292YXRlbG5lXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgdGhhdC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zPy5aYWRhbmlQcml6bmFrdUJhbGFuY292YXRlbG5vc3RpID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLlphZGFuaVByaXpuYWt1QmFsYW5jb3ZhdGVsbm9zdGlFbnVtLmF1dG9tYXRpY2t5TmViYWxhbmNvdmF0ZWxuZSlcclxuICAgICAgICAgICAgICAgICAgICBncmlkRm9ybWF0LmFkZEJvb2xlYW5Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaXpfYmFsX2ludlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNjVcIiwgLy9SQyAzMDI1MDM2NSA6IEJsb2suXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA0NzRcIiwgLy9SQyAzMDI1MDQ3NCA6IEJsb2tvdsOhbsOtIGJhbGFuY292w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDU1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JjZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRCb29sZWFuQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcml6X2JhbF9pbnZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzY1XCIsIC8vUkMgMzAyNTAzNjUgOiBCbG9rLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNDc0XCIsIC8vUkMgMzAyNTA0NzQgOiBCbG9rb3bDoW7DrSBiYWxhbmNvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1NSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yY2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ2NoZWNrXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0LmFkZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96YWRhdmVrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM2NlwiLCAvL1JDIDMwMjUwMzY2IDogUG/FvmFkYXZla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JjZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdzdHJpbmdib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOlwicG96YWRhdmVrXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcz8uWmFkYW5pUHJpem5ha3VCYWxhbmNvdmF0ZWxub3N0aVxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFBvcGlzKHtcclxuICAgICAgICAgICAgICAgIC8vbmFtZTogXCJwb3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgLy9jYXB0aW9uOiBcImpyZXM6MzAxNTAwODdcIixcclxuICAgICAgICAgICAgICAgIC8vd2lkdGg6IDMwMCxcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImpzLXBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ3N0cmluZ2JveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzbWFydE5hdk9uTGVuZ3RoOiAyNTQgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0eXBQb3Jpem92YWNlID09PSBHUm96VHlwUG9yaXpvdmFjZS5TdGFuZGFyZCAmJiB0aGF0LmlzUmV6ZXJ2dWplVklJU1NQKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRfaGRyX3Jpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM2MVwiLCAvL1JDIDMwMjUwMzYxIDogSUQgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yY2VkOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7ICAgICAgICAgICAgICAgLy9zbG91cGNlIHByaWRhbmUgcHJlZCBjZnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyYWRla19oZHJfcmlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM2MlwiLCAvL1JDIDMwMjUwMzYyIDogxZjDoWRlayBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oeyAgICAgICAgICAgICAgIC8vc2xvdXBjZSBwcmlkYW5lIHByZWQgY2Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmFkZWtfaGRyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM2M1wiLCAvL1JDIDMwMjUwMzYzIDogIMWYw6FkZWsgR0lOXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGdyaWRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b8WZw60gc3RhbmRhcmRuw60gY2hhbmdlIGhhbmRsZXIgcHJvIHBvbGUsIGt0ZXLDoSBvdmxpdsWIdWrDrSByb3p2cmggKE5LUywgVUNTLCBST0spXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogVGF0byBoZWxwZXIgZnVua2NlIENFTlRSQUxJWlVKRSBsb2dpa3UgcHJvOlxyXG4gICAgICAgICAqIDEuIFZhbGlkYWNpIHZ5cGxuxJtuw6kgaG9kbm90eVxyXG4gICAgICAgICAqIDIuIEtvbnRyb2x1IHrDoXZpc2zDvWNoIHBvbMOtIChOS1MsIFVDUywgUk9LKVxyXG4gICAgICAgICAqIDMuIERvaGxlZMOhbsOtIGEgbmFzdGF2ZW7DrSByb3p2cmh1XHJcbiAgICAgICAgICogNC4gQXV0b21hdGlja8O9IHDFmWVjaG9kIG5hIGRhbMWhw60gcG9sZVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBmaWVsZE5hbWUgTsOhemV2IHBvbGUgcHJvIHpvYnJhemVuw60gdiBjaHlib3bDvWNoIGhsw6HFoWvDoWNoIChuYXDFmS4gXCJVQ1NcIiwgXCJOS1NcIiwgXCJSb2tcIilcclxuICAgICAgICAgKiBAcGFyYW0gZ2V0RmllbGRWYWx1ZSBGdW5rY2UsIGt0ZXLDoSB6ZSBjaGFuZ2VPYmogZXh0cmFodWplIGhvZG5vdHUgcG9sZS4gUMWZw61rbGFkOiAoY2hhbmdlT2JqKSA9PiBjaGFuZ2VPYmoudmFsdWU/LnVjc1xyXG4gICAgICAgICAqIEBwYXJhbSBhZGRpdGlvbmFsVmFsaWRhdGlvbiBWb2xpdGVsbsOhIGRvZGF0ZcSNbsOhIHZhbGlkYWNlIHNwZWNpZmlja8OhIHBybyBkYW7DqSBwb2xlLiBWcmFjw60gdHJ1ZSA9IHZhbGlkYWNlIE9LLCBmYWxzZSA9IHZhbGlkYWNlIEZBSUxFRCAoY2h5YmEgdcW+IG5hc3RhdmVuYSlcclxuICAgICAgICAgKiBAcmV0dXJucyBDaGFuZ2UgaGFuZGxlciBmdW5rY2UgcMWZaXByYXZlbm91IHBybyBwxZlpxZlhemVuw60gZG8gb3B0aW9ucy5jaGFuZ2VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIC8vIFBvdcW+aXTDrSBwcm8gamVkbm9kdWNow6kgcG9sZSBVQ1M6XHJcbiAgICAgICAgICogY2hhbmdlOiB0aGF0LmNyZWF0ZVJvenZyaENoYW5nZUhhbmRsZXIoXHJcbiAgICAgICAgICogICAgIEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMudWNzLCAgICAgIC8vIGZpZWxkTmFtZVxyXG4gICAgICAgICAqICAgICAoY2hhbmdlT2JqKSA9PiBjaGFuZ2VPYmoudmFsdWU/LnVjcyAgLy8gZ2V0RmllbGRWYWx1ZVxyXG4gICAgICAgICAqIClcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIC8vIFBvdcW+aXTDrSBwcm8gUk9LIHMgdmxhc3Ruw60gdmFsaWRhY8OtOlxyXG4gICAgICAgICAqIGNoYW5nZTogdGhhdC5jcmVhdGVSb3p2cmhDaGFuZ2VIYW5kbGVyKFxyXG4gICAgICAgICAqICAgICBcIlJva1wiLFxyXG4gICAgICAgICAqICAgICAoY2hhbmdlT2JqKSA9PiBjaGFuZ2VPYmoudmFsdWUsXHJcbiAgICAgICAgICogICAgICgkZmllbGQsIHJvaykgPT4ge1xyXG4gICAgICAgICAqICAgICAgICAgaWYgKHJvayA8IHRoYXQuZ2xvYmFscy5Fa29QYXJhbXM/LlJvayEpIHtcclxuICAgICAgICAgKiAgICAgICAgICAgICAkZmllbGQuZ2ZpZWxkKFwic2V0RXJyb3JcIiwgeyBtZXNzYWdlOiBcIlJvayBqZSBwxZnDrWxpxaEgbWFsw71cIiB9KTtcclxuICAgICAgICAgKiAgICAgICAgICAgICByZXR1cm4gZmFsc2U7ICAvLyBWYWxpZGFjZSBzZWxoYWxhXHJcbiAgICAgICAgICogICAgICAgICB9XHJcbiAgICAgICAgICogICAgICAgICByZXR1cm4gdHJ1ZTsgIC8vIFZhbGlkYWNlIE9LXHJcbiAgICAgICAgICogICAgIH1cclxuICAgICAgICAgKiApXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVSb3p2cmhDaGFuZ2VIYW5kbGVyKFxyXG4gICAgICAgICAgICBmaWVsZE5hbWU6IHN0cmluZyxcclxuICAgICAgICAgICAgZ2V0RmllbGRWYWx1ZTogKGNoYW5nZU9iajogYW55KSA9PiBzdHJpbmcgfCBudW1iZXIgfCBudWxsLFxyXG4gICAgICAgICAgICBhZGRpdGlvbmFsVmFsaWRhdGlvbj86IChcclxuICAgICAgICAgICAgICAgICRmaWVsZDogSlF1ZXJ5PEhUTUxFbGVtZW50PixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsXHJcbiAgICAgICAgICAgICkgPT4gYm9vbGVhblxyXG4gICAgICAgICk6IChldjogYW55LCBjaGFuZ2VPYmo6IGFueSkgPT4gdm9pZCB7XHJcbiAgICAgICAgICAgIC8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxyXG4gICAgICAgICAgICAvLyBQxZjDjVBSQVZBIEtPTlRFWFRVXHJcbiAgICAgICAgICAgIC8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxyXG5cclxuICAgICAgICAgICAgLy8gVWxvxb4gc2kgcmVmZXJlbmNpIG5hIGluc3RhbmNpIHTFmcOtZHkgKHBybyBwb3XFvml0w60gdiBpbm5lciBmdW5jdGlvbilcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBaw61za2VqIENTUyB0xZnDrWR1IE1hZ2ljIE1hbmFnZXJ1IChiZXogdGXEjWt5IG5hIHphxI3DoXRrdSlcclxuICAgICAgICAgICAgY29uc3QgbWFuYWdlckNsYXNzID0gR29yZGljLldpZGdldC5HTWFnaWNNYW5hZ2VyLkdNYWdpY01hbmFnZXIud2lkZ2V0Q3NzQ2xhc3M7XHJcblxyXG4gICAgICAgICAgICAvLyDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZBcclxuICAgICAgICAgICAgLy8gVlLDgUNFTsOBIEZVTktDRSAodmxhc3Ruw60gY2hhbmdlIGhhbmRsZXIpXHJcbiAgICAgICAgICAgIC8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxyXG5cclxuICAgICAgICAgICAgLy8gRMWuTEXFvUlUw4k6IFBvdcW+w612w6FtZSAnZnVuY3Rpb24nIChuZSBhcnJvdyBmdW5rY2kpLCBwcm90b8W+ZTpcclxuICAgICAgICAgICAgLy8gLSAndGhpcycgdiBrb250ZXh0dSAnZnVuY3Rpb24nID0gRE9NIGVsZW1lbnQgcG9sZSAoaW5wdXQvc2VsZWN0KVxyXG4gICAgICAgICAgICAvLyAtICd0aGlzJyB2IGFycm93IGZ1bmtjaSBieSBieWxvID0gaW5zdGFuY2UgdMWZw61keSAoxaFwYXRuxJshKVxyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRoaXM6IEhUTUxFbGVtZW50LCBldjogYW55LCBjaGFuZ2VPYmo6IGFueSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG4gICAgICAgICAgICAgICAgLy8gMS4gSU5JQ0lBTElaQUNFIFBST03Emk5Ow51DSFxyXG4gICAgICAgICAgICAgICAgLy8g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVWxvxb4gc2kgcmVmZXJlbmNpIG5hIERPTSBlbGVtZW50IHBvbGVcclxuICAgICAgICAgICAgICAgIC8vICd0aGlzJyA9IG5hcMWZLiA8aW5wdXQgbmFtZT1cInVjc1wiIC8+XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWVsZEVsZW1lbnQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFZ5dHZvxZkgalF1ZXJ5IHdyYXBwZXIgcHJvIHNuYWRuxJtqxaHDrSBwcsOhY2lcclxuICAgICAgICAgICAgICAgIC8vIFVtb8W+xYh1amUgdm9sYXQgLmdmaWVsZCgpLCAuZmluZCgpIGF0ZC5cclxuICAgICAgICAgICAgICAgIGNvbnN0ICRmaWVsZCA9ICQodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcbiAgICAgICAgICAgICAgICAvLyAyLiBSRVNFVCBDSFlCT1bDnUNIIEhMw4HFoEVLXHJcbiAgICAgICAgICAgICAgICAvLyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTbWHFviB2xaFlY2hueSBwxZllZGNob3rDrSBjaHlieSBuYSB0b210byBwb2xpXHJcbiAgICAgICAgICAgICAgICAvLyBQb2t1ZCB1xb5pdmF0ZWwgb3ByYXbDrSBob2Rub3R1LCBuZWNoY2VtZSBtdSBzdMOhbGUgdWthem92YXQgc3Rhcm91IGNoeWJ1XHJcbiAgICAgICAgICAgICAgICAkZmllbGQuZ2ZpZWxkKFwicmVzZXRFcnJvcnNcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcbiAgICAgICAgICAgICAgICAvLyAzLiBaw41TS8OBTsONIEhPRE5PVFkgUE9MRVxyXG4gICAgICAgICAgICAgICAgLy8g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gWmF2b2xlaiBwxZllZGFub3UgZnVua2NpIGdldEZpZWxkVmFsdWUgcHJvIGV4dHJha2NpIGhvZG5vdHlcclxuICAgICAgICAgICAgICAgIC8vIGNoYW5nZU9iaiA9IG9iamVrdCBzIGluZm9ybWFjZW1pIG8gem3Em27Emywgb2JzYWh1amUgJ3ZhbHVlJ1xyXG4gICAgICAgICAgICAgICAgLy8gXHJcbiAgICAgICAgICAgICAgICAvLyBQxZnDrWtsYWR5OlxyXG4gICAgICAgICAgICAgICAgLy8gLSBQcm8gVUNTOiBjaGFuZ2VPYmoudmFsdWUgPSB7IHVjczogXCIxMDFcIiwgaWNvOiBcIjEyMzQ1XCIsIC4uLiB9XHJcbiAgICAgICAgICAgICAgICAvLyAgIOKGkiBnZXRGaWVsZFZhbHVlIHZyYWPDrSBcIjEwMVwiXHJcbiAgICAgICAgICAgICAgICAvLyAtIFBybyBST0s6IGNoYW5nZU9iai52YWx1ZSA9IDIwMjVcclxuICAgICAgICAgICAgICAgIC8vICAg4oaSIGdldEZpZWxkVmFsdWUgdnJhY8OtIDIwMjVcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZ2V0RmllbGRWYWx1ZShjaGFuZ2VPYmopO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG4gICAgICAgICAgICAgICAgLy8gNC4gWsOBS0xBRE7DjSBWQUxJREFDRSAtIFBPTEUgTVVTw40gQsOdVCBWWVBMTsSaTsOJXHJcbiAgICAgICAgICAgICAgICAvLyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBLb250cm9sYSwgxb5lIGhvZG5vdGEgZXhpc3R1amUgYSBuZW7DrSBwcsOhemRuw70gc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAvLyBQb2tyeWplIHDFmcOtcGFkeTpcclxuICAgICAgICAgICAgICAgIC8vIC0gdmFsdWUgPT09IG51bGxcclxuICAgICAgICAgICAgICAgIC8vIC0gdmFsdWUgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgLy8gLSB2YWx1ZSA9PT0gXCJcIlxyXG4gICAgICAgICAgICAgICAgLy8gLSB2YWx1ZSA9PT0gXCIgICBcIiAocG8gdHJpbSgpKVxyXG4gICAgICAgICAgICAgICAgaWYgKCF2YWx1ZSB8fCAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnRyaW0oKSA9PT0gXCJcIikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gWm9icmF6IGNoeWJvdm91IGhsw6HFoWt1XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUkMgMzAyNTA1MTUgOiB7MH0gbXVzw60gYsO9dCB6YWTDoW5vLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFbDvXNsZWRlayBuYXDFmS46IFwiVUNTIG11c8OtIGLDvXQgemFkw6Fuby5cIlxyXG4gICAgICAgICAgICAgICAgICAgICRmaWVsZC5nZmllbGQoXCJzZXRFcnJvclwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BwaW5nOiB0cnVlLCAgICAgICAgICAgLy8gWmFzdGF2w60gZGFsxaHDrSB6cHJhY292w6Fuw60gKG5hcMWZLiBzdWJtaXQgZm9ybXUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZTogXCJlcnJvclwiLCAgICAgICAvLyBUeXAgY2h5YnkgKMSNZXJ2ZW7DoSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IFwicmV2ZXJpZnlFcnJcIiwgICAgIC8vIFNrdXBpbmEgcHJvIHNuYWRuw6kgbWF6w6Fuw60gc291dmlzZWrDrWPDrWNoIGNoeWJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMwMjUwNTE1XCIuZm9ybWF0KGZpZWxkTmFtZSkgLy9SQyAzMDI1MDUxNSA6IHswfSBtdXPDrSBiw710IHphZMOhbm8uXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVrb27EjWkgenByYWNvdsOhbsOtIC0gbmVwb2tyYcSNdWogZMOhbFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuICAgICAgICAgICAgICAgIC8vIDUuIERPREFURcSMTsOBIFZBTElEQUNFIChWT0xJVEVMTsOBKVxyXG4gICAgICAgICAgICAgICAgLy8g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUG9rdWQgYnlsYSBwxZllZMOhbmEgZnVua2NlIHBybyBkb2RhdGXEjW5vdSB2YWxpZGFjaSwgemF2b2xlaiBqaVxyXG4gICAgICAgICAgICAgICAgLy8gVGF0byBmdW5rY2UgbcWvxb5lIHByb3bDqXN0IHNwZWNpZmlja8OpIGtvbnRyb2x5IHBybyBkYW7DqSBwb2xlXHJcbiAgICAgICAgICAgICAgICAvLyBcclxuICAgICAgICAgICAgICAgIC8vIFDFmcOta2xhZCBwcm8gUk9LOlxyXG4gICAgICAgICAgICAgICAgLy8gLSBLb250cm9sYSBtaW5pbcOhbG7DrWhvIHJva3VcclxuICAgICAgICAgICAgICAgIC8vIC0gS29udHJvbGEgdsOtY2Vyb8SNbsOtaG8gcm96cG/EjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAvLyAtIFpwxZnDrXN0dXBuxJtuw60vem5lcMWZw61zdHVwbsSbbsOtIHNvdXZpc2Vqw61jw61jaCBwb2zDrVxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIC8vIFBva3VkIHZhbGlkYWNlIHZyw6F0w60gZmFsc2U6XHJcbiAgICAgICAgICAgICAgICAvLyAtIFDFmWVkcG9rbMOhZMOhIHNlLCDFvmUgY2h5YmEgamUgdcW+IG5hc3RhdmVuYSB2IGFkZGl0aW9uYWxWYWxpZGF0aW9uXHJcbiAgICAgICAgICAgICAgICAvLyAtIFVrb27EjcOtbWUgenByYWNvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkaXRpb25hbFZhbGlkYXRpb24gJiYgIWFkZGl0aW9uYWxWYWxpZGF0aW9uKCRmaWVsZCwgdmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBWYWxpZGFjZSBzZWxoYWxhLCBjaHliYSBqZSB1xb4gbmFzdGF2ZW7DoVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG4gICAgICAgICAgICAgICAgLy8gNi4gTkHEjFRFTsONIEhPRE5PVCBQUk8gUk9aVlJIXHJcbiAgICAgICAgICAgICAgICAvLyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQcm8gZG9obGVkw6Fuw60gcm96dnJodSBwb3TFmWVidWplbWUgVFJPSklDSSBob2Rub3Q6IE5LUyArIFVDUyArIFJPS1xyXG4gICAgICAgICAgICAgICAgLy8gTmHEjXRlbWUgamUgeiBqaW7DvWNoIHBvbMOtIHYgcG/FmWl6b3ZhxI1pXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTmHEjXRpIE5LUyAoTsOhcm9kb2hvc3BvZMOhxZlza8OhIGtsYXNpZmlrYWNlKVxyXG4gICAgICAgICAgICAgICAgLy8gSGxlZMOhbWUgcG9sZSBzIG5hbWU9XCJua3NcIiB2IHBvxZlpem92YcSNaVxyXG4gICAgICAgICAgICAgICAgLy8gPy5nZmllbGQoXCJnZXRWYWx1ZVwiKSA9IGJlenBlxI1uw6kgdm9sw6Fuw60gKHBva3VkIHBvbGUgbmVleGlzdHVqZSwgdnLDoXTDrSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAvLyA/Lm5rcyA9IGV4dHJha2NlIGhvZG5vdHkgbmtzIHogb2JqZWt0dSB7IG5rczogXCIxMjM0XCIsIGljbzogXCIuLi5cIiwgLi4uIH1cclxuICAgICAgICAgICAgICAgIC8vID8/IFwiXCIgPSBwb2t1ZCBqZSB1bmRlZmluZWQvbnVsbCwgcG91xb5paiBwcsOhemRuw70gc3RyaW5nXHJcbiAgICAgICAgICAgICAgICBjb25zdCBua3MgPSB0aGF0LiRwb3Jpem92YWMuZmluZEZpZWxkcyhcIm5rc1wiKT8uZ2ZpZWxkKFwiZ2V0VmFsdWVcIik/Lm5rcyA/PyBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIE5hxI10aSBVQ1MgKMOaxI1ldG7DrSBzdMWZZWRpc2tvKVxyXG4gICAgICAgICAgICAgICAgLy8gU3Rlam7DoSBsb2dpa2EgamFrbyB1IE5LU1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdWNzID0gdGhhdC4kcG9yaXpvdmFjLmZpbmRGaWVsZHMoXCJ1Y3NcIik/LmdmaWVsZChcImdldFZhbHVlXCIpPy51Y3MgPz8gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBOYcSNdGkgUk9LXHJcbiAgICAgICAgICAgICAgICAvLyBQcm8gVkxaxZggKFbDrWNlbGV0w70gesOhdmF6ZWsgcm96cG/EjXR1KSBzZSByb2sgYmVyZSB6IHBvbGUgdiBwb8WZaXpvdmHEjWlcclxuICAgICAgICAgICAgICAgIC8vIFBybyBvc3RhdG7DrSB0eXB5IHNlIGJlcmUgeiBobGF2acSNa3kgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgcm9rID0gdGhhdC50eXBQb3Jpem92YWNlID09PSBHUm96VHlwUG9yaXpvdmFjZS5WTFpSXHJcbiAgICAgICAgICAgICAgICAgICAgPyB0aGF0LiRwb3Jpem92YWMuZmluZEZpZWxkcyhcInJva1wiKT8uZ2ZpZWxkKFwiZ2V0VmFsdWVcIikgIC8vIFogcG9sZSB2IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgOiB0aGF0LmRva2xhZC5oZWFkZXI/LnJvazsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFogaGxhdmnEjWt5IGRva2xhZHVcclxuXHJcbiAgICAgICAgICAgICAgICAvLyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuICAgICAgICAgICAgICAgIC8vIDcuIEtPTlRST0xBIEtPTVBMRVROT1NUSSBEQVQgUFJPIFJPWlZSSFxyXG4gICAgICAgICAgICAgICAgLy8g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQmV6IE5LUyBuZW3Fr8W+ZW1lIG5hasOtdCByb3p2cmhcclxuICAgICAgICAgICAgICAgIGlmICghbmtzIHx8IG5rcyA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICRmaWVsZC5nZmllbGQoXCJzZXRFcnJvclwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BwaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGU6IFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IFwicmV2ZXJpZnlFcnJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMwMjUwNTE5XCIuZm9ybWF0KEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMubmtzKSAgIC8vUkMgMzAyNTA1MTkgOiBOZWpwcnZlIHZ5cGzFiHRlIHswfS5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUMWZZXN1xYggZm9jdXMgbmEgcG9sZSBOS1MsIGFieSB1xb5pdmF0ZWwgdsSbZMSbbCwgY28gbcOhIHZ5cGxuaXRcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRwb3Jpem92YWMuZmluZEZpZWxkcyhcIm5rc1wiKS5nZmllbGQoXCJmb2N1c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQmV6IFVDUyBuZW3Fr8W+ZW1lIG5hasOtdCByb3p2cmhcclxuICAgICAgICAgICAgICAgIGlmICghdWNzIHx8IHVjcyA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICRmaWVsZC5nZmllbGQoXCJzZXRFcnJvclwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BwaW5nOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGU6IFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IFwicmV2ZXJpZnlFcnJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJqcmVzOjMwMjUwNTE5XCIuZm9ybWF0KEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMudWNzKSAgIC8vUkMgMzAyNTA1MTkgOiBOZWpwcnZlIHZ5cGzFiHRlIHswfS5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUMWZZXN1xYggZm9jdXMgbmEgcG9sZSBVQ1NcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRwb3Jpem92YWMuZmluZEZpZWxkcyhcInVjc1wiKS5nZmllbGQoXCJmb2N1c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQmV6IHJva3UgbmVtxa/FvmVtZSBuYWrDrXQgcm96dnJoXHJcbiAgICAgICAgICAgICAgICBpZiAoIXJvayB8fCByb2sgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkZmllbGQuZ2ZpZWxkKFwic2V0RXJyb3JcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wcGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlOiBcImVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiBcInJldmVyaWZ5RXJyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMDI1MDUyMFwiICAvL1JDIDMwMjUwNTIwIDogQ2h5Ym7DvSByb2sgcHJvIGRvaGxlZMOhbsOtIHJvenZyaHUuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG4gICAgICAgICAgICAgICAgLy8gOC4gTkFTVEFWRU7DjSBST1pWUkhVIEEgUMWYRUNIT0QgTkEgREFMxaDDjSBQT0xFXHJcbiAgICAgICAgICAgICAgICAvLyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUcnktY2F0Y2ggcHJvIG/FoWV0xZllbsOtIG5lb8SNZWvDoXZhbsO9Y2ggY2h5YlxyXG4gICAgICAgICAgICAgICAgLy8gTmFwxZnDrWtsYWQ6IE1hZ2ljIE1hbmFnZXIgbmVuw60gaW5pY2lhbGl6b3ZhbsO9LCByb3p2cmggbmVieWwgbmFsZXplbiBhdGQuXHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEtMw43EjE9Ww4EgQUtDRTogTmFzdGF2ZW7DrSByb3p2cmh1XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldFJvenZyaCBkxJtsw6E6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMS4gRG9obGVkw6EgSUQgcm96dnJodSBwb2RsZSBrb21iaW5hY2UgVUNTICsgTktTICsgcm9rXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMi4gTmFqZGUgTWFnaWMgTWFuYWdlciAoa29udGVqbmVyIHBybyBFS08gdsSbdHUpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMy4gTmFzdGF2w60gdsWhZWNobmEgcG9sZSBFS08gdsSbdHkgKFRFMS1URTkpIHBvZGxlIHJvenZyaHVcclxuICAgICAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFBhcmFtZXRyeTpcclxuICAgICAgICAgICAgICAgICAgICAvLyAtIGZpZWxkRWxlbWVudCA9IERPTSBlbGVtZW50IGFrdHXDoWxuw61obyBwb2xlIChwcm8gaGxlZMOhbsOtIE1hZ2ljIE1hbmFnZXJ1KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIC0geyB1Y3MsIG5rcywgcm9rIH0gPSBkYXRhIHBybyBkb2hsZWTDoW7DrSByb3p2cmh1XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLSBtYW5hZ2VyQ2xhc3MgPSBDU1MgdMWZw61kYSBNYWdpYyBNYW5hZ2VydSAoXCJnLW1hZ2ljLW1hbmFnZXJcIilcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFJvenZyaChcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRFbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHVjczogdWNzLCBua3M6IG5rcywgcm9rOiByb2sgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFuYWdlckNsYXNzXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQXV0b21hdGlja8O9IHDFmWVjaG9kIG5hIGRhbMWhw60gcG9sZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBzbWFydE5hdk5leHQgaW50ZWxpZ2VudG7EmyBuYWpkZSBkYWzFocOtIGVkaXRvdmF0ZWxuw6kgcG9sZSBhIHDFmWVzdW5lIHRhbSBmb2N1c1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFBvxZlhZMOtOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDEuIERhbMWhw60gcG9sZSB2ZSBzdGVqbsOpbSDFmcOhZGt1IChkb3ByYXZhKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIDIuIFBydm7DrSBwb2xlIHYgZGFsxaHDrW0gxZnDoWRrdSAocG9rdWQganNtZSBuYSBrb25jaSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAzLiBUbGHEjcOtdGtvIE9LIChwb2t1ZCBqc21lIG5hIHBvc2xlZG7DrW0gcG9saSlcclxuICAgICAgICAgICAgICAgICAgICAkZmllbGQuZ2ZpZWxkKFwic21hcnROYXZOZXh0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT8WhZXTFmWVuw60gY2h5YnkgcMWZaSBuYXN0YXZlbsOtIHJvenZyaHVcclxuICAgICAgICAgICAgICAgICAgICAvLyDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gWm9icmF6IGNoeWJvdm91IGhsw6HFoWt1IHMgZGV0YWlseSAocG9rdWQganNvdSBkb3N0dXBuw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgJGZpZWxkLmdmaWVsZChcInNldEVycm9yXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcHBpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZTogXCJlcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cDogXCJyZXZlcmlmeUVyclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzAyNTA1MjFcIiArIChlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gXCI6IFwiICsgZXJyb3IubWVzc2FnZSA6IFwiXCIpICAvL1JDIDMwMjUwNTIxIDogQ2h5YmEgcMWZaSBuYXN0YXZlbsOtIHJvenZyaHUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFbDvXNsZWRlayBuYXDFmS46IFwiQ2h5YmEgcMWZaSBuYXN0YXZlbsOtIHJvenZyaHU6IE1hZ2ljIE1hbmFnZXIgbmVieWwgbmFsZXplblwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZ5cGnFoSBjaHlidSBkbyBjb25zb2xlIHBybyBkZWJ1Z2dpbmdcclxuICAgICAgICAgICAgICAgICAgICAvLyBab2JyYXrDrSBzdGFjayB0cmFjZSBhIGRldGFpbHkgY2h5YnlcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2h5YmEgcMWZaSBuYXN0YXZlbsOtIHJvenZyaHU6XCIsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8vI3JlZ2lvbiBNZXRvZGEgb25EZXRhaWxCdWlsZGVyQnVpbGRcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogb25EZXRhaWxCdWlsZGVyQnVpbGRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBVZMOhbG9zdCBvem5hbXVqZSwgxb5lIGJ1aWxkZXIgc2xvdcSNaWwgZGF0YSB2xaFlY2gga29tcG9uZW50IGEgY2h5c3TDoSBzZSBwxZllZGF0IGplIGRvIGNvbnRlbnR1LiBcclxuICAgICAgICAgKiBKYWtvIHBhcmFtZXRyIGplIHDFmWVkw6FuYSBpbnN0YW5jZSBEZXRhaWxCdWlsZGVydSwgbmEga3RlcsOpIGplIGplxaF0xJsgbW/Fvm7DqSBwxZlpZGF0IC8gb2RlYnJhdCAvIHDFmWVzdW5vdXQgLyB1cHJhdml0IGplZG5vdGxpdsOpIGRlZmluaWNlIHDFmWVkIHTDrW0sIFxyXG4gICAgICAgICAqIG5lxb4gYnVkb3Ugdmxvxb5lbnkgZG8gY29udGVudHUuICh2eWrDrW1rb3UganNvdSBjb250ZW50RXh0ZW5zaW9ucyBhIHRleHRzLCBrdGVyw6kganNvdSBwxZllZMOhbnkgZG8gY29udGVudHUgdcW+IGLEm2hlbSBidWlsZCBmdW5rY2UpLlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBidWlsZGVyIGNvbnRlbnQsIG5hIGt0ZXLDqW0gbcOhIERldGFpbEJ1aWxkZXIgdnl0dm/FmWl0IGRldGFpbCB6IGtvbXBvbmVudFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uRGV0YWlsQnVpbGRlckJ1aWxkKGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcik6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vICEhIFBPWk9SIC0gJC5leHRlbmQoIG11c8OtIG3DrXQgcHJ2bmkgcGFyYW1ldHIgdHJ1ZSwgYWJ5IHByZXZ6YWxhIHZzZWNobmEgcHJlZGNob3ppIG5hc3RhdmVuaS4gSmluYWsgdG8gcG91emUgcHJlcGlzZSBQT1pPUiAhIVxyXG4gICAgICAgICAgICBjb25zdCByZWFsaXphdG9yID0gJC5leHRlbmQodHJ1ZSwgYnVpbGRlci5nZXREZWZpbml0aW9uKEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5GaWVsZHMuUmVhbGl6YXRvcilbMF0/Lml0ZW0sIHtcclxuICAgICAgICAgICAgICAgIGxheW91dDogXCJ3LThcIixcclxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdGhpcy5kb2tsYWQuRmllbGRQZXJtaXNzaW9ucz8uUmVhbGl6YXRvci52YWx1ZSA9PT0gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gw5pwcmF2YSBFS08gaGxhdmnEjWt5IGRva2xhZHVcclxuICAgICAgICAgICAgLy8gRGVmaW5pY2U6IEVrby5XZWJDbGllbnQvRWtvL0RldGFpbC9EZXRhaWxCdWlsZGVyQ29tcG9uZW50cy9HRWtvSGVhZGVyRm9ybUNvbXBvbmVudC50c1xyXG4gICAgICAgICAgICAvLyBleHBvcnQgZnVuY3Rpb24gc2V0dXAoYnVpbGRlcjogR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIsIHNldHRpbmdzOiBPYmplY3RMaXRlcmFsPFBhcnRpYWw8Rm9ybXMuRm9ybVJvdyB8IEZvcm1zLkZvcm1GaWVsZCB8IEZvcm1zLkZvcm1TZWN0aW9uPiB8IG51bGw+KSBcclxuICAgICAgICAgICAgLy8gTmVrZGUgcHJlZHRpbSBqZSB2b2xhbmEgZnVua2NlIEdvcmRpYy5Fa28uRGV0YWlsQnVpbGRlckNvbXBvbmVudHMuRWtvSGVhZGVyRm9ybS5jcmVhdGUsIGt0ZXJhIHZ5dHZvcmkgb2JqZWt0IGhsYXZpY2t5XHJcbiAgICAgICAgICAgIC8vIFRlbnRvIG9iamVrdCBqaXogb2JzYWh1amUgcHJlZHBsbmVuZSBob2Rub3R5LCBrdGVyZSBsemUgZGVmYXVsdG5lIHBvdXppdFxyXG4gICAgICAgICAgICAvLyBQb2t1ZCBjaGNpIG5la2RlIG5ldnlob3Z1amljaSBob2Rub3R5IHptZW5pdCwgdnl0dm9yaW0gc2kgemRlIG9iamVrdG92eSBsaXRlcmFsLCBrdGVyeSBidWRlIG9ic2Fob3ZhdCBub3ZlIG5lYm8gem1lbmVuZSBob2Rub3R5XHJcbiAgICAgICAgICAgIC8vIEFieSBzZSBkZWZpbmljZSBuZXBvcGxldGx5IGEgbmV0dm9yaWxhIHNlIG5vdmEgdmxhc3Rub3N0LCBqc291IHZlIGptZW5lbSBwcm9zdG9ydSBHb3JkaWMuRWtvLkhlYWRlckZvcm0gZGVmaW5vdmFuZSBlbnVteSBwcm8gc3ByYXZuZSBwcmlyYXplbmkgKHpkZSBuYXByLiBHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLlR5cERva2xhZHUpXHJcbiAgICAgICAgICAgIC8vIE1vaHUgemRlIGRlZmlub3ZhdCBqYWsgbm92ZSBzZWtjZSwgdGFrIHJhZGt5IGNpIGZpZWxkeS5cclxuICAgICAgICAgICAgLy8gUG8gdnl0dm9yZW5pIGplaiBwb3NsdSBkbyBzZXR1cHUsIGtkZSBzZSBwdXZvZG5pIGEgdHl0byBub3ZlIHZsYXN0bm9zdGkgc3BvamkgcG9tb2NpIC4kZXh0ZW5kc1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkhlYWRlckZvcm0uc2V0dXAoYnVpbGRlciwgeyAgLy8gcHJvdmVkZW7DrSDDunByYXYgaGxhdmnEjWt5XHJcbiAgICAgICAgICAgICAgICAvLyBLbmloYVxyXG4gICAgICAgICAgICAgICAgW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5GaWVsZHMuS25paGFdOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogJC5leHRlbmQodHJ1ZSwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3NkZW4oNTApLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UgLy8gdnl0dm9yIHBvbGlja28gcyB2eWJlcmVtIC4uLiwgbmUgamFrbyBjb21ib1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGFzIEZvcm1zLkZvcm1GaWVsZCxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBUeXAgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5GaWVsZHMuVHlwRG9rbGFkdV06IHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLCAvLyBwb3Zpbm5lIHBvbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZhemJhTmFLbmlodTogdGhhdC5kb2tsYWQuaGVhZGVyPy5peHBfZGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUG91emVST1o6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAxMS45LjE5IEtLIC0gcG9rdWQgamUgb21lemVuaSBwcmFjb3ZhdCBzIG1hdGVyaWFsb3Z5bWkga29tcGV0ZW50eSwgcG92b2wgbXUgdnlicmF0IGplbiB0eXB5IGthdGVnb3JpZSByb3pwb2N0b3Z5IGRva2xhZCBhIEVOTlZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGt0Z190eXA6IHRoaXMuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcyEuUG91eml0aU1hdGVyaWFsb3Z5Y2hLb21wZXRlbnR1ID8gWzExMDAsIDExODVdIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDbyBzZSBtYSBzdGF0IHBvIHptZW5lIGhvZG5vdHkgLSB6bmVwcmlzdHVwbmVuaSBhIHZ5bWF6IHphdmlzbHljaCBwcnZrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQbyB6bWVuZSBtdXNpbSB2eW1hemF0IHphdmlzbGEgcG9sZS4gQ2h0ZWxvIGJ5IHRvIHpqaXN0aXQgcHV2b2RuaSBob2Rub3R1LCB6ZGEgc2Ugem1lbmlsYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKEZpZWxkcy5NZXNpYykuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoRmllbGRzLkRlbikuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoRmllbGRzLkRyZCkuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoRmllbGRzLkNpc2xvRG9rbGFkdSkuZ2ZpZWxkKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGFzIEZvcm1zLkZvcm1GaWVsZCxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBLb21wZXRlbnRcclxuICAgICAgICAgICAgICAgIFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLktvbXBldGVudF06IHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7IC8vIEdGb3JtUm93T3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaXpfa29tOiAxMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhhdC5kb2tsYWQuaGVhZGVyPy5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBvYmopID0+IHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvIHDFmWkgem3Em27Em1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iaiAmJiBvYmoudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoR29yZGljLkVrby5IZWFkZXJGb3JtLkZpZWxkcy5SZWFsaXphdG9yKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGljbzogb2JqLnZhbHVlLmljbywgY2lzX3JlYWw6IG9iai52YWx1ZS5jaXNfcmVhbCB9LCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGFzIEZvcm1zLkZvcm1GaWVsZCxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZWFsaXphdG9yXHJcbiAgICAgICAgICAgICAgICAvL1tHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLlJlYWxpemF0b3JdOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgZGlzYWJsZWQ6IHRoaXMuZG9rbGFkLkZpZWxkUGVybWlzc2lvbnM/LlJlYWxpemF0b3IudmFsdWUgPT09IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99IGFzIEZvcm1zLkZvcm1GaWVsZCxcclxuXHJcbiAgICAgICAgICAgICAgICBbR29yZGljLkVrby5IZWFkZXJGb3JtLlJvd3MuUmVhbGl6YXRvcl06IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWVsZHM6IFtyZWFsaXphdG9yLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dDogXCJ3LTRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogJC5leHRlbmQoR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3N1dXMoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogRmllbGRzLlVjdGFybmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5pY289PnZhbHVlLmljbzsgbW9kZWwudWNzPT52YWx1ZS51Y3M7IG1vZGVsLnV1cz12YWx1ZS51dXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7dXVzOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGF0LmRva2xhZC5oZWFkZXI/LmljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IHRoYXQuZG9rbGFkLmhlYWRlcj8udWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJva19vZDogXCI8PSBcIiArIHRoYXQuZG9rbGFkLmhlYWRlcj8ucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJva19kbzogXCI+PSBcIiArIHRoYXQuZG9rbGFkLmhlYWRlcj8ucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWtvdmZ1c19peHNfZnVuOiB0aGF0Lmdsb2JhbHMuRGF0YWJhc2VQYXJhbXMhLlZhemJhVWN0YXJueU5hRnVua2NpID8gdGhhdC5nbG9iYWxzLlNlc3Npb25QYXJhbXMhLkl4c0Z1biA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnc2VsZWN0Ym94XCJcclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSBhcyBGb3Jtcy5Gb3JtUm93XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgLy8gw7pwcmF2YSBXRkwvU1NMIGtvbXBvbmVudFxyXG4gICAgICAgICAgICAvLyBEZXRhaWxEdG8uSmVQb2RhbmEgamUgdmxhc3Rub3N0LCBrdGVyb3UgTWFydGluIHBvdXppdmEsIGFieSB2ZWRlbCB6ZGEgc2UgamVkbmEgbyBha2NpIHBvZGFuaSBuZWJvIGFrY2kgamlub3VcclxuICAgICAgICAgICAgLy8gUHJpIHBvZGFuaSBuZXpvYnJhenVqZSB1cmNpdGUgY2FzdGkgZGV0YWlsdSBkb2tsYWR1IC0gdmV0c2lub3UgZGF0IFdGTFxyXG4gICAgICAgICAgICAvLyBQb2RzdGF0bmUgamUgc3Rlam5vdSBob2Rub3R1IHZsYXN0bm9zdGkgZG9kcnpldCBpIHYgVFMuXHJcbiAgICAgICAgICAgIC8vIEphIGJ1ZHUgdnN1ZGUgbmFzdGF2b3ZhdCBmYWxzZSwgYWJ5IHNlIHpvYnJhemlsbyB2c2VjaG5vXHJcblxyXG4gICAgICAgICAgICAvL0Vrby5EZXRhaWwuY2hhbmdlRGV0YWlsQnVpbGRlcldmbEZvckVrb0RlZmluaXRpb25zKGJ1aWxkZXIsIHRoYXQuZG9rbGFkPy5oZWFkZXI/LmFjID09IG51bGwsIFtcIm1lbnVBZ1Rpc2tBZ2VuZERva2xcIiwgXCJtZW51QWdUaXNrWmF1Y0Rva2xcIl0pO1xyXG4gICAgICAgICAgICBFa28uRGV0YWlsLmNoYW5nZURldGFpbEJ1aWxkZXJXZmxGb3JFa29EZWZpbml0aW9ucyhidWlsZGVyLCBmYWxzZSwgW1wibWVudUFnVGlza0FnZW5kRG9rbFwiLCBcIm1lbnVBZ1Rpc2taYXVjRG9rbFwiXSk7XHJcbiAgICAgICAgICAgIGJ1aWxkZXIudXBkYXRlRGVmaW5pdGlvbihcIm1lbnVSdW5Tb3V2RG9rXCIsIHsgcGFyZW50OiBcIm1lbnVXZmxDaW5ub3N0aVwiLyosIGFmdGVyOiBcIm1lbnVEb3RjU3ViamVrdHlcIiovIH0sIEdEYmQuRGVmaW5pdGlvbktpbmQuTWVudUJhcik7XHJcbiAgICAgICAgICAgIGJ1aWxkZXIubW92ZURlZmluaXRpb25BZnRlcihcIm1lbnVSdW5Tb3V2RG9rXCIsIFwibWVudURvdGNTdWJqZWt0eVwiLCBHRGJkLkRlZmluaXRpb25LaW5kLk1lbnVCYXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gcMWZaWTDoSDFoWlwa3kgZG8gc3RhdHVzYmFydSBwcm8gcG9zdW4gcG8gc2V6bmFtdVxyXG4gICAgICAgICAgICB0aGF0Lmxpc3RDb250cm9sc19zZXR1cCh7IC8vIGxpc3RDb250cm9sc19zZXR1cChzZXR0aW5nczogR0xpc3RDb250cm9sc1NldHVwT3B0aW9uczxHUm96RG9rbGFkT3V0RHRvPik6IHZvaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gZGVsZWfDoXQsIGt0ZXLDvSBzZSBzcHVzdMOtIG5lxb4gc2UgcHJvdmVkZSByZWxvYWQgY29udGVudHUuIEplIG1vxb5uw6kgemRlIHZ5dm9sYXQgY2xvc2luZyBhIHVwb3pvcm5pdCB0YWsgdcW+aXZhdGVsZSwgxb5lIG3DoSBuYXDFmS4gbmV1bG/FvmVuw6kgem3Em255LlxyXG4gICAgICAgICAgICAgICAgYmVmb3JlTW92ZTogdGhhdC5jbG9zaW5nLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGRlbGVnYXQsIGt0ZXJ5IMWZw6FkZWsgeiBncmlkdSBwxZlldHJhbnNmb3JtdWplIG5hIGR0byBwcm8gemF2b2zDoW7DrSB0aGlzLmxvYWQoZHRvKTsgTcWvxb5lIHZyYWNldCBwcm9taXNlLlxyXG4gICAgICAgICAgICAgICAgLy9yb3dUb0R0bzogZnVuY3Rpb24gKGdyaWRTdGF0ZSkgeyByZXR1cm4geyBJeHA6IGdyaWRTdGF0ZS5jdXJyZW50Um93LmRhdGEuaXhwLCBBY3Rpb246IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5SZWFkIH07IH0sXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUG91eml0IE1hcnRpbnV2IGRlbGVnYXQsIHV2aWRpbWUgamVzdGxpIHRvIGJ1ZGUgZnVuZ292YXRcclxuICAgICAgICAgICAgICAgIHJvd1RvRHRvOiAoZ3JpZFN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGdyaWRTdGF0ZS5jdXJyZW50Um93ICE9IG51bGwgPyBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGModGhhdC5ncGMsIGdyaWRTdGF0ZS5jdXJyZW50Um93LmRhdGEuaGVhZGVyPy5peHBfZGVuISkgOiB0aGF0LmdwYyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogZ3JpZFN0YXRlLmN1cnJlbnRSb3cuZGF0YS5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHBEZW46IHRoYXQuZG9rbGFkLmhlYWRlcj8uaXhwX2RlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5hc2xlZHVqaWNpRGV0YWlsOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0ZW1wbGF0ZSBwcm8gdG9vbHRpcCBuYSDFoWlwY2UgbsOhc2xlZHVqw61jw61cclxuICAgICAgICAgICAgICAgIG5leHRJdGVtVGVtcGxhdGU6IFwianJlczozMDE1MDEwNlwiLCAvL1JDIDMwMTUwMTA2IDogTsOhc2xlZHVqw61jw606IHtpeHB9IDxicj4ge2FjfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRlbXBsYXRlIHBybyB0b29sdGlwIG5hIMWhaXBjZSBuw6FzbGVkdWrDrWPDrVxyXG4gICAgICAgICAgICAgICAgcHJldkl0ZW1UZW1wbGF0ZTogXCJqcmVzOjMwMTUwMTA3XCIgLy9SQyAzMDE1MDEwNyA6IFDFmWVkY2hvesOtOiB7aXhwfSA8YnI+IHthY31cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjZW5pIGhvZG5vdCBwb2xpY2VrIHBvbW9jaSBhc3luY2hyb25uaWhvIHZvbGFuaVxyXG4gICAgICAgICAqICAgSG9kbm90YSBuZW11c2kgYnl0IHYgZGFub3UgY2h2aWxpIHByaXN0dXBuYSwgcHJvdG96ZSBzZSBtdXplIG92ZXJvdmF0IG5hIHNlcnZlcnUgYXRkLiBQcm90byBqZSBudXRubyBob2Rub3R5IHpqaXN0b3ZhdCBhc3luY2hyb25uZSBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldE1lc2ljKCk6IGFueSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmRGaWVsZHMoRmllbGRzLk1lc2ljKS5nZmllbGQoXCJnZXRWYWx1ZUFzeW5jXCIpLnRoZW4oKHZhbHVlKSA9PiB7IHJldHVybiB2YWx1ZSAmJiB2YWx1ZS5jaXNsbyA/IHBhcnNlSW50KHZhbHVlLmNpc2xvKSA6IC0xIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEZpbHRyb3ZhbmkgbmFwb3ZlZHkgZWtvIHZldHlcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNsb3VwZWNcIj5la28gc2xvdXBlYzwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiemRyb2pEYXRcIj56ZHJvaiBkYXQgbmFwb3ZlZHkgKGRhdGF0YWJsZSk8L3BhcmFtPlxyXG4gICAgICAgIHByaXZhdGUgRmlsdHJOYXBvdmVkeShzbG91cGVjOiBzdHJpbmcsIHpkcm9qRGF0OiBHb3JkaWMuRWtvLldlYkNsaWVudC5EYXRhV29yZENvbnRlbnRbXSk6IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkRhdGFXb3JkQ29udGVudFtdIHtcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIC8vIGNvclxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBHb3JkaWMuRWtvLldlYkNsaWVudC5EYXRhV29yZENvbnRlbnRbXT1bXTtcclxuICAgICAgICAgICAgaWYgKHNsb3VwZWMgPT0gXCJ0ZTJcIikge1xyXG4gICAgICAgICAgICAgICAgemRyb2pEYXQuZm9yRWFjaCgocm93KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuS29udHJvbGFTbG92YUNvcihyb3cuY29kZSEudHJpbSgpLCBudWxsKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gocm93KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB1a29cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2xvdXBlYyA9PSBcInRlNFwiKSB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHRlMjpzdHJpbmcgPSB0aGlzLiRwb3Jpem92YWMuZmluZEZpZWxkcyhcInRlMlwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKVtcImNvZGVcIl0udHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHpkcm9qRGF0Lmxlbmd0aCAtIDE7IGkgPiAtMTsgaS0tKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLktvbnRyb2xhU2xvdmFVa2EoemRyb2pEYXRbaV0uY29kZSEudHJpbSgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLktvbnRyb2xhU2xvdmFDb3IodGUyLCB6ZHJvakRhdFtpXSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHpkcm9qRGF0W2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBLb250cm9sYSBuYSB1a2EgdnVjaSB1a2Egb2QgY2lsZVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiVWtvXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHByaXZhdGUgS29udHJvbGFTbG92YVVrYShVa286IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICAvLyBQb2t1ZCBuZW5pIHZ5cGxuZW4gbWFuYXplciBjaWx1LCBuaWMgbmVrb250cm9sdWogYSB2c2VjaG55IGpzb3UgcGxhdG5lXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRva2xhZC5NYW5hZ2VyeUNpbHUgPT0gbnVsbCB8fCB0aGlzLmRva2xhZC5NYW5hZ2VyeUNpbHUubGVuZ3RoPT0wKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5kb2tsYWQuTWFuYWdlcnlDaWx1Lmxlbmd0aDsgaSsrIClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJhZGVrVWtvID0gdGhpcy5kb2tsYWQuTWFuYWdlcnlDaWx1W2ldO1xyXG4gICAgICAgICAgICAgICAgLy8gUG9rdWQgamUgaG9kbm90YSB6YWRhbmEgdiBwb3Jpem92YWNpIChVa28pIHJvdm5hIG5la3RlcmVtdSB6IHBvdm9sZW55Y2ggY2lsdSwgamUgdG8gdiBwb3JhZGt1XHJcbiAgICAgICAgICAgICAgICBpZiAocmFkZWtVa28udWtvICE9IG51bGwgJiYgVWtvID09IHJhZGVrVWtvLnVrby50cmltKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgS29udHJvbGFTbG92YUNvcihDb3I6IHN0cmluZ3xudWxsLCByYWRla1VrbzogR29yZGljLkVrby5XZWJDbGllbnQuRGF0YVdvcmRDb250ZW50IHxudWxsKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zIS5BbGdvcml0bXVzRmlsdHJvdmFuaVBWUyA9PSBcIk1PMjAxM1wiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBbGdvcml0bXVzIHBybyBNTyAyMDEzOlxyXG4gICAgICAgICAgICAgICAgaWYgKENvciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIENvciA9IFwiICAgIFwiO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZ5ZGFqb3Z5Qmxvazogc3RyaW5nID0gQ29yO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZ5ZGFqb3Z5T2tydWg6IHN0cmluZyA9IHZ5ZGFqb3Z5Qmxvay5zdWJzdHJpbmcoNCw0KyAyKTtcclxuICAgICAgICAgICAgICAgIGlmICh2eWRham92eUJsb2subGVuZ3RoID4gOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZ5ZGFqb3Z5QmxvayA9IHZ5ZGFqb3Z5Qmxvay5zdWJzdHJpbmcoMiwyKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhdHJpYnV0IG5hbGV6ZW5pIFVLTyB2dWNpIENPUlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYWRla1VrbyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYWRla1Vrb1tcImNvZGVcIl0gPT0gbnVsbCB8fCByYWRla1Vrby5jb2RlLnRyaW0oKSA9PSBcIlwiKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1a2F6YXRlbDogc3RyaW5nID0gcmFkZWtVa28uY29kZS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZXN0b3ZhbnlWeWRham92eU9rcnVoOnN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGVzdCBwcm8gamlzdG90dSBuYSBkZWxrdSB1a2EgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1a2F6YXRlbC5sZW5ndGggPiA4KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVzdG92YW55VnlkYWpvdnlPa3J1aCA9IHVrYXphdGVsLnN1YnN0cmluZygyLDIrIDUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2eWRham92eUJsb2sgPT0gdWthemF0ZWwuc3Vic3RyaW5nKDEsIDEgKyAxKSAmJiAodnlkYWpvdnlPa3J1aCA9PSB0ZXN0b3ZhbnlWeWRham92eU9rcnVoLnN1YnN0cmluZygwLCAyKSB8fCB0ZXN0b3ZhbnlWeWRham92eU9rcnVoID09IFwiOTk5OTBcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQb2t1ZCBuZW5pIHZ5cGxuZW4gbWFuYXplciBjaWx1LCBuaWMgbmVrb250cm9sdWogYSB2c2VjaG55IGpzb3UgcGxhdG5lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRva2xhZC5NYW5hZ2VyeUNpbHUgPT0gbnVsbCB8fCB0aGlzLmRva2xhZC5NYW5hZ2VyeUNpbHUubGVuZ3RoID09IDApIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmRva2xhZC5NYW5hZ2VyeUNpbHUubGVuZ3RoOyBpKysgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgUmFkZWtVa28gPSB0aGlzLmRva2xhZC5NYW5hZ2VyeUNpbHVbaV0gYXMgR29yZGljLlVjdC5JbnRlcmZhY2UuR1JvekNpbGVEdG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoUmFkZWtVa28udWtvID09IG51bGwgfHwgUmFkZWtVa28udWtvLnRyaW0oKT09XCJcIikgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdWthemF0ZWw6c3RyaW5nID0gUmFkZWtVa28udWtvIS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVzdG92YW55VnlkYWpvdnlPa3J1aDpzdHJpbmc9XCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRlc3QgcHJvIGppc3RvdHUgbmEgZGVsa3UgdWthXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodWthemF0ZWwubGVuZ3RoID4gOClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0b3ZhbnlWeWRham92eU9rcnVoID0gdWthemF0ZWwuc3Vic3RyaW5nKDIsIDIrNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodnlkYWpvdnlCbG9rID09IHVrYXphdGVsLnN1YnN0cmluZygxLCAxICsgMSkgJiYgKHZ5ZGFqb3Z5T2tydWggPT0gdGVzdG92YW55VnlkYWpvdnlPa3J1aC5zdWJzdHJpbmcoMCwgMikgfHwgdGVzdG92YW55VnlkYWpvdnlPa3J1aCA9PSBcIjk5OTkwXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLy8jcmVnaW9uIFVkYWxvc3QgcHJlZCB1emF2cmVuaW0gY29udGVudHUgZGV0YWlsdSBmb3JtdWxhcmVcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdCwgemRhIGplIG1vem5lIHV6YXZyaXQgb2tub1xyXG4gICAgICAgICAqIEplIHZ5dm9sYW5hIHZ6ZHksIGtkeXogc2UgemF2aXJhIENvbnRlbnQuIE1vaHUgamkgdnl2b2xhdCBuZWJvIGplIHZvbGFuYSBhdXRvbWF0aWNreS4gVnpkeSB2cmFjaSBwcm9taXNlXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMgeyBKUXVlcnlQcm9taXNlIH0gLSByZXNvbHZlID0gamUgbW/Fvm7DqSB6YXbFmcOtdCwgcmVqZWN0ID0gbmVuw60gbW/Fvm7DqSB6YXbFmcOtdCBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBWeXR2b3JpbSBzaSBvZGxvemVueSBvYmpla3QgXHJcbiAgICAgICAgICAgIGxldCBkZWZlcnJlZCA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIE5lanBydmUgemppc3RpLCB6ZGEgcG9zbGVkbmkgYWtjZSBieWxhIGFrdGl2bmkgb3BlcmFjZVxyXG4gICAgICAgICAgICBpZiAoKHRoYXQuZWRpdEhlYWRlciAmJiB0aGF0LmZpbmRGb3JtcygpLmdmb3JtKFwiaGFzQ2hhbmdlZFwiKSkgfHwgdGhhdC5lZGl0Um93cykge1xyXG4gICAgICAgICAgICAgICAgRWtvLkRldGFpbC5tZXNzYWdlQm94VW5zYXZlZERhdGEodGhhdCkgLy8gWm9icmF6ZW5pIGluZm9ybWFjaSBobGFza3kgXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwibm9cIiwgZnVuY3Rpb24gKCkgeyBkZWZlcnJlZC5yZXNvbHZlKCk7IH0pIC8vIE5lY2hjaSB6bWVuZW5hIGRhdGEgdWxveml0XHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHsgLy8gQ2hjaSB6bWVuZW5hIGRhdGEgdWxveml0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8vIFZ5dHZvxZnDrW0gc2kgbm92b3UgdMWZw61kdSBzIGFrY2VtaSwgamFrbyBwYXJhbWV0ciB6YXNpbGFtIGNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy92YXIgYWN0aW9ucyA9IG5ldyBHb3JkaWMuUm96LldlYkNsaWVudC5HQWtjZURva2xhZHUodGhhdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFdmlkZW5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXR2b3JpbSBzaSB2c3R1cG5pIERUT1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxdWVzdDogSXNsLkdTZXJ2aWNlU2F2ZVJlc3BvbnNlPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pEb2tsYWRIZWFkZXJJbkR0bz4gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGF0LmRva2xhZC5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0X3ptZW5hOiB0aGF0LmRva2xhZC5oZWFkZXI/LmRhdF96bWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5FdmlkZW5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG91emlqdSB2YWxpZGFjaSBmb3JtdWxhcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTnluaSBzZXNiaXJlaiBkYXRhIGRva2xhZHUgZG8gdnN0dXBuaSBobGF2aWNreSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIHJlcXVlc3QuZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3ZlIHNiaXJhbSBpIGRhdGEgcm96c2lyZW5laG8gcHJvZmlsdSAocG9waXNuZSB2bGFzdG5vc3RpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmRhdGEudmxhc3Rub3N0aSA9IEdvcmRpYy5Qb3Bpc25lVmxhc3Rub3N0aS5jb2xsZWN0VmFsdWVzKHRoYXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8vLyBhIHphdm9sYW0gdnlrb25ub3UgbWV0b2R1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYWN0aW9ucy5FdmlkZW5jZURva2xhZHUocmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAub24oXCJjYW5jZWxcIiwgZnVuY3Rpb24gKCkgeyBkZWZlcnJlZC5yZWplY3QoKTsgfSkgLy8gc3Rpc2tudXRvIFwic3Rvcm5vXCIsIG5lY2hjaSBmb3JtdWxhciB1emF2cml0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpOyAvLyBEYXRhIG5lYnlsYSB6bWVuZW5hLCBqZSBtb3pubyB1emF2cml0XHJcblxyXG4gICAgICAgICAgICAvLyBBIHZyYWNpbSBwcm9taXNlIHMgdGltXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb24gVWRhbG9zdCBwcmVkIHV6YXZyZW5pbSBjb250ZW50dSBkZXRhaWx1IGZvcm11bGFyZVxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gWm5vdnVuYWN0ZW5pIGRldGFpbHUgZG9rbGFkdVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZW1hcmtzPlR2YWdlbmtuZWNodCwgMy4zLjIwMTcuPC9yZW1hcmtzPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz4uPC9yZXR1cm5zPlxyXG4gICAgICAgIHByaXZhdGUgUmVmcmVzaERldGFpbChlZGl0YWNlSGxldmlja3k6IGJvb2xlYW4gPSBmYWxzZSk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5lZGl0Um93cyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5uZXdSb3dTdGFydCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvL2NvbnRlbnQuc2hvd0RvY3VtZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgLy8gem5lcHJpc3R1cG5lbmkgdnNlY2ggYWtjaVxyXG4gICAgICAgICAgICBmb3IgKHZhciBha2NlIGluIHRoYXQuYWN0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgLy8gZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnNbYWtjZV0hLnVwZGF0ZSh7IGVuYWJsZWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2xldCBvbGRWYWx1ZSA9IGNvbnRlbnQuUmVsb2FkU2V6bmFtO1xyXG4gICAgICAgICAgICAvLyBUb3RvIGplIHpyZWptZSBha3R1YWxuZSBvdGV2cmVuYSBwb2xvemthXHJcbiAgICAgICAgICAgIGxldCBPbGRUYWIgPSB0aGF0LmVsZW1lbnQuZmluZChcIi5ndGFibWFuYWdlclwiKS5ndGFibWFuYWdlcihcImdldEFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgaWYgKGVkaXRhY2VIbGV2aWNreSlcclxuICAgICAgICAgICAgICAgIHRoYXQuZWRpdEhlYWRlciA9IHRydWU7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHRoYXQuZWRpdEhlYWRlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5sb2FkKC8qeyBzaG93RG9jdW1lbnQ6ZmFsc2UgfSovKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5SZWxvYWRTZXpuYW0gPSBvbGRWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChPbGRUYWIgIT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuU3dpdGNoVGFiKE9sZFRhYik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuOy8vZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAvLyAgICByZXR1cm47IGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgLy9yZXR1cm4gZGVmLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrdHVhbGl6YWNlIGRhdCBkZXRhaWx1IHBvZGxlIG1vZGVsdSBhIG5hc3RhdmVuaSBzdGF2dSBwcnZrdVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIEFrdHVhbGl6YWNlRG9rbGFkdSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIC8vIE5lanBydmUgbmFwbG5pbSB2c2VjaG5hIHBvbGlja2EgaG9kbm90YW1pXHJcbiAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcygpIC8vIE5hamRlIHZzZWNobmEgcG9sZSBmb3JtdWxhcmUgdmUgdnNlY2ggc2VrY2ljaFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFZ5cGxuZW5pIHBvbG96ZWsgbmEgZG9rbGFkdSAtIG1ldG9kYSBtb2RlbHUgYXBwbHlcclxuICAgICAgICAgICAgICAgIC8vIFBvc2xlZG5pbSBvYmpla3RlbSBqZSBNb2RlbE9wdGlvbnMuIFRlbnRvIG9wdGlvbiBzcG9sdSBzIG1vZGVsIHR2b8WZw60gesOha2xhZG7DrSBrb25maWd1cmHEjW7DrSBjZWxlayBzeXN0w6ltdSBwcm9wb2plbsOtIGZvcm11bMOhxZllIGEgbW9kZWx1IC0gaHR0cHM6Ly94d2lraS5nb3JkaWMuY3ovTkVUL3dpZGdldHMvZ2ZpZWxkI0htb2RlbE9wdGlvbnNcclxuICAgICAgICAgICAgICAgIC8vIGluaXRpYWxWYWx1ZXMgKGJvb2wsIGRlZmF1bHQ9ZmFsc2UpIChvcGVyYWNlOiBhcHBseSkgLSB6ZGEgc2UgcMWZaSBuYXN0YXZvdmFuaSBob2Rub3QgeiBtb2RlbHUgbcOhIHBvdcW+w610IG1ldG9kYSBzZXRWYWx1ZSgpIG5lYm8gc2V0SW5pdGlhbCgpLiBcclxuICAgICAgICAgICAgICAgIC8vIHNldEZsYWdzKG9iamVjdCwgZGVmYXVsdCA9IG51bGwpIChvcGVyYWNlOiBhcHBseSkgLSB2bGFzdG7DrSByb3rFocOtxZllbsOtIGZsYWdzLCBzZSBrdGVyw71taSBidWRvdSB2b2zDoW5hIHbFoWVjaG5hIHNldFZhbHVlIHZvbGFuw6EgeiBtb2RlbHVcclxuICAgICAgICAgICAgICAgIC8vIHNldEZsYWdzOiB7IHRyaWdnZXJDaGFuZ2U6IGZhbHNlIH0gLSBwcmkgcGxuZW5pIHBvbGljZWsgbWV0b2RvdSBuZXNwb3VzdGV0IHVkYWxvc3QgY2hhbmdlIG5hZCBqZWRub3RsaXZ5bWkgcG9saWNreVxyXG4gICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5kb2tsYWQuaGVhZGVyLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUsIHNldEZsYWdzOiB7IHRyaWdnZXJDaGFuZ2U6IGZhbHNlIH0gfSlcclxuICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy52YWxpZGF0b3JzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFZ5cGxuZW5pIHBvcGlzbnljaCB2bGFzdG5vc3RpIC0gcG9rdWQganNvdSB2eXBsbmVueVxyXG4gICAgICAgICAgICBpZiAodGhpcy5kb2tsYWQudmxhc3Rub3N0aSlcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Qb3Bpc25lVmxhc3Rub3N0aS5hcHBseVZhbHVlcyh0aGlzLCB0aGlzLmRva2xhZC52bGFzdG5vc3RpISk7XHJcblxyXG4gICAgICAgICAgICAvLyBOYXN0YXZlbmkgcHJpc3R1cG5vc3RpIHBvbGlcclxuICAgICAgICAgICAgdGhpcy5zZXRFbmFibGVGaWVsZHMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGEgcHJpc3R1cG5vc3QgYWtjaVxyXG4gICAgICAgICAgICB0aGlzLlNldEVuYWJsZUFjdGlvbnModGhpcy5kb2tsYWQuQWN0aW9uUGVybWlzc2lvbnMhKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0dXNCYXIoKTsgLy8gWm9icmF6IG5henZ5IHN0YXZ1IHZlIHN0YXR1cyBiYXJ1XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8vI3JlZ2lvbiBOYXN0YXZlbmkgcHJpc3R1cG5vc3RpIHBvbGljZWtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pIHByaXN0dXBub3N0aSBwb2xpY2VrIGRsZSBzdGF2dSBhIHByb3ZlZGVuIGFrY2VcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgc2V0RW5hYmxlRmllbGRzKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvL3ByaXZhdGUgc2V0RW5hYmxlRmllbGRzKGFjdGlvbjogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlKTogdm9pZCB7XHJcbiAgICAgICAgLy8gICAgY29uc3QgaXNQb2RhbmlOZWJvT3ByYXZhID0gYWN0aW9uID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUG9kYW5pIHx8IGFjdGlvbiA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLk9wcmF2YTtcclxuICAgICAgICAvLyAgICBjb25zdCBpc0Rva2xhZEJlelphcGlzdSA9IHRoaXMuZG9rbGFkLmhlYWRlcj8uZWtvX2FrdCA9PSAxMDAgJiYgdGhpcy5kb2tsYWQuaGVhZGVyPy5zX3phdSA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VTdGF2eURva2xhZHUuTmV6YXVjdG92YW5vO1xyXG4gICAgICAgIC8vICAgIGNvbnN0IGlzRG9rbGFkTmVzY2h2YWxlbnkgPSB0aGlzLmRva2xhZC5oZWFkZXI/LmVrb19ha3QgPT0gMTAwICYmIHRoaXMuZG9rbGFkLmhlYWRlcj8uc196YXUhIDw9IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFU3RhdnlEb2tsYWR1Lk5hdnJoO1xyXG4gICAgICAgIC8vICAgIGNvbnN0IGlzRG9rbGFkU2NodmFsZW55ID0gdGhpcy5kb2tsYWQuaGVhZGVyPy5la29fYWt0ID09IDEwMCAmJiB0aGlzLmRva2xhZC5oZWFkZXI/LnNfemF1ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVN0YXZ5RG9rbGFkdS5TY2h2YWxlbm87XHJcbiAgICAgICAgLy8gICAgY29uc3QgaXNEb2tsYWRVemF2cmVueSA9IHRoaXMuZG9rbGFkLmhlYWRlcj8uZWtvX2FrdCA9PSAxMDAgJiYgdGhpcy5kb2tsYWQuaGVhZGVyPy5zX3phdSA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VTdGF2eURva2xhZHUuVXphdnJlbm87XHJcbiAgICAgICAgLy8gICAgY29uc3QgaXNSZXppbVByb3ZvenVaYWtsYWRuaSA9IHRoaXMuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcz8uUmV6aW1Qcm92b3p1ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5SZXppbVByb3ZvenVFbnVtLnpha2xhZG5pO1xyXG4gICAgICAgIC8vICAgIGNvbnN0IGlzUmV6aW1Qcm92b3p1UmVhbGl6YXRvciA9IHRoaXMuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcz8uUmV6aW1Qcm92b3p1ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5SZXppbVByb3ZvenVFbnVtLnJlYWxpemF0b3I7XHJcbiAgICAgICAgLy8gICAgY29uc3QgaXNQb3ZvbGVuYVptZW5hVWN0YXJueVBvU2NodmFsZW5pID0gdGhpcy5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zPy5Qb3ZvbGVuYVptZW5hVWN0YXJueVBvU2NodmFsZW5pO1xyXG4gICAgICAgIC8vICAgIGNvbnN0IHpwcmFjb3ZhdE1hbmF6ZXJ5Q2lsdSA9IHRoaXMuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcz8uWnByYWNvdmF0TWFuYXplcnlDaWx1O1xyXG5cclxuICAgICAgICAvLyAgICAvLyBaIGhsYXZpY2t5IG1vaHUgdXByYXZvdmF0IHR5cCBkb2tsYWR1LCBrb21wZXRlbnQgYSByZWFsaXphdG9yXHJcbiAgICAgICAgLy8gICAgdGhpcy5maW5kRmllbGRzKEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5GaWVsZHMuVHlwRG9rbGFkdSkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIShpc1BvZGFuaU5lYm9PcHJhdmEgJiYgaXNEb2tsYWRCZXpaYXBpc3UpKTtcclxuICAgICAgICAvLyAgICB0aGlzLmZpbmRGaWVsZHMoR29yZGljLkVrby5IZWFkZXJGb3JtLkZpZWxkcy5Lb21wZXRlbnQpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICEoaXNQb2RhbmlOZWJvT3ByYXZhICYmIGlzRG9rbGFkTmVzY2h2YWxlbnkgJiYgKGlzUmV6aW1Qcm92b3p1WmFrbGFkbmkgfHwgaXNSZXppbVByb3ZvenVSZWFsaXphdG9yKSkpO1xyXG4gICAgICAgIC8vICAgIHRoaXMuZmluZEZpZWxkcyhHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLlJlYWxpemF0b3IpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICEoaXNQb2RhbmlOZWJvT3ByYXZhICYmIGlzRG9rbGFkTmVzY2h2YWxlbnkgJiYgaXNSZXppbVByb3ZvenVaYWtsYWRuaSkpO1xyXG5cclxuICAgICAgICAvLyAgICAvLyBQb2xvemt5IGRva2xhZHVcclxuICAgICAgICAvLyAgICB0aGlzLmZpbmRGaWVsZHMoRmllbGRzLk1lc2ljKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhKGlzUG9kYW5pTmVib09wcmF2YSAmJiBpc0Rva2xhZE5lc2NodmFsZW55KSk7XHJcbiAgICAgICAgLy8gICAgdGhpcy5maW5kRmllbGRzKEZpZWxkcy5EZW4pLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICEoaXNQb2RhbmlOZWJvT3ByYXZhICYmIGlzRG9rbGFkTmVzY2h2YWxlbnkpKTtcclxuICAgICAgICAvLyAgICB0aGlzLmZpbmRGaWVsZHMoRmllbGRzLkRyZCkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIShpc1BvZGFuaU5lYm9PcHJhdmEgJiYgaXNEb2tsYWROZXNjaHZhbGVueSkpO1xyXG4gICAgICAgIC8vICAgIHRoaXMuZmluZEZpZWxkcyhGaWVsZHMuQ2lzbG9Eb2tsYWR1KS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhKGlzUG9kYW5pTmVib09wcmF2YSAmJiBpc0Rva2xhZE5lc2NodmFsZW55KSk7XHJcbiAgICAgICAgLy8gICAgdGhpcy5maW5kRmllbGRzKEZpZWxkcy5NYW5hZ2VyQ2lsZSkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIShpc1BvZGFuaU5lYm9PcHJhdmEgJiYgaXNEb2tsYWROZXNjaHZhbGVueSAmJiB6cHJhY292YXRNYW5hemVyeUNpbHUpKTtcclxuICAgICAgICAvLyAgICB0aGlzLmZpbmRGaWVsZHMoRmllbGRzLlVjdGFybmEpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICEoaXNQb2RhbmlOZWJvT3ByYXZhICYmIChpc0Rva2xhZE5lc2NodmFsZW55IHx8IChpc0Rva2xhZFNjaHZhbGVueSAmJiBpc1Bvdm9sZW5hWm1lbmFVY3Rhcm55UG9TY2h2YWxlbmkpKSkpO1xyXG4gICAgICAgIC8vICAgIHRoaXMuZmluZEZpZWxkcyhGaWVsZHMuQ2FzdGthKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhKGlzUG9kYW5pTmVib09wcmF2YSAmJiBpc0Rva2xhZE5lc2NodmFsZW55KSk7XHJcbiAgICAgICAgLy8gICAgdGhpcy5maW5kRmllbGRzKEZpZWxkcy5Qb3BpcykuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIShpc1BvZGFuaU5lYm9PcHJhdmEgJiYgIWlzRG9rbGFkVXphdnJlbnkpKTtcclxuXHJcbiAgICAgICAgLy8gICAgLy8gUG92b2xlbmkgZWRpdGFjZSB6YWxvemt5IFdGTCBkb2t1bWVudFxyXG4gICAgICAgIC8vICAgICh0aGlzIGFzIGFueSkuc2V0RWRpdG1vZGVFa29Qcm9maWwoIWlzUG9kYW5pTmVib09wcmF2YSk7XHJcblxyXG4gICAgICAgIC8vICAgIC8vIFBvdm9sZW5pIGVkaXRhY2UgemFsb3preSBwb3Bpc255Y2ggdmxhc3Rub3N0aVxyXG4gICAgICAgIC8vICAgIHRoaXMuZGVzY1Byb3BzX3NldHVwKHsgcmVhZE9ubHk6IGlzUG9kYW5pTmVib09wcmF2YSB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBaIGhsYXZpY2t5IG1vaHUgdXByYXZvdmF0IHR5cCBkb2tsYWR1LCBrb21wZXRlbnQgYSByZWFsaXphdG9yXHJcbiAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLlR5cERva2xhZHUpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICF0aGF0LmRva2xhZC5GaWVsZFBlcm1pc3Npb25zPy5UeXBEb2tsYWR1LnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5GaWVsZHMuS29tcGV0ZW50KS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhdGhhdC5kb2tsYWQuRmllbGRQZXJtaXNzaW9ucz8uS29tcGV0ZW50LnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5GaWVsZHMuUmVhbGl6YXRvcikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwhdGhhdC5kb2tsYWQuRmllbGRQZXJtaXNzaW9ucz8uUmVhbGl6YXRvci52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBQb2xvemt5IGRva2xhZHVcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKEZpZWxkcy5NZXNpYykuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIXRoYXQuZG9rbGFkLkZpZWxkUGVybWlzc2lvbnM/Lk1lc2ljLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKEZpZWxkcy5EZW4pLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICF0aGF0LmRva2xhZC5GaWVsZFBlcm1pc3Npb25zPy5EZW4udmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoRmllbGRzLkRyZCkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIXRoYXQuZG9rbGFkLkZpZWxkUGVybWlzc2lvbnM/LkRydWhEb2tsYWR1LnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKEZpZWxkcy5DaXNsb0Rva2xhZHUpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICF0aGF0LmRva2xhZC5GaWVsZFBlcm1pc3Npb25zPy5DaXNsb0Rva2xhZHUudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoRmllbGRzLk1hbmFnZXJDaWxlKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhdGhhdC5kb2tsYWQuRmllbGRQZXJtaXNzaW9ucz8uTWFuYWdlckNpbGUudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoRmllbGRzLlVjdGFybmEpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICF0aGF0LmRva2xhZC5GaWVsZFBlcm1pc3Npb25zPy5VY3Rhcm5hLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKEZpZWxkcy5DYXN0a2EpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICF0aGF0LmRva2xhZC5GaWVsZFBlcm1pc3Npb25zPy5DYXN0a2EudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoRmllbGRzLlBvcGlzKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhdGhhdC5kb2tsYWQuRmllbGRQZXJtaXNzaW9ucz8uUG9waXMudmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gUG92b2xlbmkgZWRpdGFjZSB6YWxvemt5IFdGTCBkb2t1bWVudFxyXG4gICAgICAgICAgICAodGhpcyBhcyBhbnkpLnNldEVkaXRtb2RlRWtvUHJvZmlsKHRoYXQuZWRpdEhlYWRlcik7XHJcblxyXG4gICAgICAgICAgICAvLyBQb3ZvbGVuaSBlZGl0YWNlIHphbG96a3kgcG9waXNueWNoIHZsYXN0bm9zdGlcclxuICAgICAgICAgICAgdGhpcy5kZXNjUHJvcHNfc2V0dXAoeyByZWFkT25seTogIXRoYXQuZWRpdEhlYWRlciB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBOYXN0YXZlbmkgcHJpc3R1cG5vc3RpIHBvbGljZWtcclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG9jZXQgemFwaXN1IFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgUG9jZXRaYXBpc3UoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgbGV0IHBvY2V0WmFwaXN1ID0gMDtcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHBvY2V0WmFwaXN1ID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkNlbGtvdnlQb2NldFJhZGt1KGdyaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcG9jZXRaYXBpc3U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaSBkbGUgcHJvdmFkZW5lIGFrY2UgLSBkZWZhdWx0IGpzb3UgdnNlY2hueSBha2NlIGRpc2FibGUgYSBuYXN0YXZ1amkgcG91emUgdGEgc2Uga3RlcnltaSBtb2h1IHByYWNvdmF0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGFjdGlvblBlcm1pc3Npb25zIHNlem5hbSBwcmlzdHVwb3Z5Y2ggcHJhdiBwcm8gamVkbm90bGl2ZSBha2NlXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIFNldEVuYWJsZUFjdGlvbnMoYWN0aW9uUGVybWlzc2lvbnM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3pEb2tsYWRBY3Rpb25QZXJtaXNzaW9ucyk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy9sZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBsZXQgcG9jZXRaYXBpc3UgPSB0aGlzLlBvY2V0WmFwaXN1KCk7XHJcbiAgICAgICAgICAgIC8vaWYgKGdyaWQgIT0gbnVsbClcclxuICAgICAgICAgICAgLy8gICAgcG9jZXRaYXBpc3UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uQ2Vsa292eVBvY2V0UmFka3UoZ3JpZCk7XHJcbiAgICAgICAgICAgIC8vIEFrY2UgZG9rbGFkdVxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb2RhbmldPy51cGRhdGVQZXJtaXNzaW9uKGFjdGlvblBlcm1pc3Npb25zPy5Qb2RhbmkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5FdmlkZW5jZV0/LnVwZGF0ZVBlcm1pc3Npb24oYWN0aW9uUGVybWlzc2lvbnM/LkV2aWRlbmNlKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuT3ByYXZhSGxhdmlja3ldPy51cGRhdGVQZXJtaXNzaW9uKGFjdGlvblBlcm1pc3Npb25zPy5PcHJhdmEpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5acnVzaXRPcHJhdmFIbGF2aWNreV0/LnVwZGF0ZVBlcm1pc3Npb24oYWN0aW9uUGVybWlzc2lvbnM/LlpydXNpdCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlphcGlzeV0/LnVwZGF0ZVBlcm1pc3Npb24oYWN0aW9uUGVybWlzc2lvbnM/LlZhemJhKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5TY2h2YWxlbmldPy51cGRhdGVQZXJtaXNzaW9uKGFjdGlvblBlcm1pc3Npb25zPy5TY2h2YWxlbmkpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5acnVzaXRTY2h2YWxlbmldPy51cGRhdGVQZXJtaXNzaW9uKGFjdGlvblBlcm1pc3Npb25zPy5PZHNjaHZhbGVuaSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zW1wiYWN0VmFsaWRhY2VcIl0/LnVwZGF0ZVBlcm1pc3Npb24odGhpcy5kb2tsYWQuQWN0aW9uUGVybWlzc2lvbnM/LlZhbGlkYWNlKTtcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnNbXCJhY3RacnVzaXRWYWxpZGFjZVwiXT8udXBkYXRlUGVybWlzc2lvbih0aGlzLmRva2xhZC5BY3Rpb25QZXJtaXNzaW9ucz8uT2R2YWxpZGFjZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLk9kZXNsYW5pU1BdPy51cGRhdGVQZXJtaXNzaW9uKHRoaXMuZG9rbGFkLkFjdGlvblBlcm1pc3Npb25zPy5PZGVzbGFuaVNQKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUmVhbGl6YWNlXT8udXBkYXRlUGVybWlzc2lvbihhY3Rpb25QZXJtaXNzaW9ucz8uUmVhbGl6YWNlKTtcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnNbXCJhY3RQb3R2cnplbmlcIl0/LnVwZGF0ZVBlcm1pc3Npb24odGhpcy5kb2tsYWQuQWN0aW9uUGVybWlzc2lvbnM/LlBvdHZyemVuaSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlN0b3Jub10/LnVwZGF0ZVBlcm1pc3Npb24oYWN0aW9uUGVybWlzc2lvbnM/LlN0b3Jubyk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlpydXNpdFN0b3Jub10/LnVwZGF0ZVBlcm1pc3Npb24oYWN0aW9uUGVybWlzc2lvbnM/LkFrdGl2YWNlKTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuVXphdnJlbmldPy51cGRhdGVQZXJtaXNzaW9uKGFjdGlvblBlcm1pc3Npb25zPy5VemF2cml0KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlByZWV2aWRlbmNlXT8udXBkYXRlUGVybWlzc2lvbihhY3Rpb25QZXJtaXNzaW9ucz8uUHJlZXZpZGVuY2UpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5QcmVkYW5pXT8udXBkYXRlUGVybWlzc2lvbihhY3Rpb25QZXJtaXNzaW9ucz8uUHJlZGF0KTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUHJldnpldGldPy51cGRhdGVQZXJtaXNzaW9uKGFjdGlvblBlcm1pc3Npb25zPy5QcmV2eml0KTtcclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUHJpZGVsZW5pXT8udXBkYXRlUGVybWlzc2lvbihhY3Rpb25QZXJtaXNzaW9ucz8uUHJpZGVsaXQpO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5WcmFjZW5pRG9XZmxdPy51cGRhdGVQZXJtaXNzaW9uKGFjdGlvblBlcm1pc3Npb25zPy5WcmFjZW5pRG9XZmwpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHRvb2x0aXAgPSBcImpyZXM6MzAyNTAzNTVcIjsgLy9SQyAzMDI1MDM1NSA6IFByb2LDrWjDoSBlZGl0YWNlIGhsYXZpxI1reVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0VkaXRNb2RlKCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZUFjdGlvbihbdGhpcy5hY3Rpb25zW0FjdGlvbnMuUG9kYW5pXSEsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5PcHJhdmFIbGF2aWNreV0hLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuU2NodmFsZW5pXSEsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5acnVzaXRTY2h2YWxlbmldISxcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlByaWRlbGVuaV0hLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuVnJhY2VuaURvV2ZsXSEsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5QcmV2emV0aV0hLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUHJlZGFuaV0hLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUHJlZXZpZGVuY2VdISxcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlV6YXZyZW5pXSEsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5acnVzaXRTdG9ybm9dISxcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlN0b3Jub10hLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUmVhbGl6YWNlXSEsXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgZW5hYmxlZDogZmFsc2UsIHRvb2x0aXA6IHRvb2x0aXAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMuZWRpdEhlYWRlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVBY3Rpb24oW3RoaXMuYWN0aW9uc1tBY3Rpb25zLkV2aWRlbmNlXSFdLCB7IGVuYWJsZWQ6IGZhbHNlLCB0b29sdGlwOiB0b29sdGlwIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIHByaXN0dXB5IGsgemFwaXN1bVxyXG4gICAgICAgICAgICB0b29sdGlwID0gXCJqcmVzOjMwMjUwMzU0XCI7IC8vUkMgMzAyNTAzNTQgOiBQcm9iw61ow6EgZWRpdGFjZSDFmcOhZGt1XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5lZGl0Um93cykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUG9yaXpvdmFjVWxveml0XT8udXBkYXRlUGVybWlzc2lvbihhY3Rpb25QZXJtaXNzaW9ucz8uVWxveml0UG9yaXpvdmFjKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlBvcml6b3ZhY1pydXNpdF0/LnVwZGF0ZVBlcm1pc3Npb24oYWN0aW9uUGVybWlzc2lvbnM/LlpydXNpdFBvcml6b3ZhYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVBY3Rpb24oW1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlBvcml6b3ZhY05vdnldISxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNPcHJhdml0XSEsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUG9yaXpvdmFjT2RzdHJhbml0XSEsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUG9yaXpvdmFjUHJlZGtvbnRhY2VdISxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNJbXBvcnRTY2hyYW5rYV0hLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlBvcml6b3ZhY0ltcG9ydFNvdWJvcl0hLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlBvcml6b3ZhY1ByZWtvbnRhY2VWeXR2b3JpdE96bmFjZW5lXSEsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUG9yaXpvdmFjUHJla29udGFjZVZ5dHZvcml0VnNlY2hdIV0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBlbmFibGVkOiBmYWxzZSwgdG9vbHRpcDogdG9vbHRpcCB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy90b29sdGlwID0gXCJqcmVzOjMwMjUwMzU2XCI7IC8vUkMgMzAyNTAzNTYgOiBQb8WZaXpvdmHEjSBuZW7DrSB2IHJlxb5pbXUgcG/FmWl6b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhbmdlUHJvZmlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVXBkYXRlQWN0aW9uKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUG9yaXpvdmFjTm92eV0hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNPcHJhdml0XSEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlBvcml6b3ZhY09kc3RyYW5pdF0hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNQcmVka29udGFjZV0hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNJbXBvcnRTY2hyYW5rYV0hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNJbXBvcnRTb3Vib3JdISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUG9yaXpvdmFjUHJla29udGFjZVZ5dHZvcml0T3puYWNlbmVdISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUG9yaXpvdmFjUHJla29udGFjZVZ5dHZvcml0VnNlY2hdIV0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGVuYWJsZWQ6IGZhbHNlLCB0b29sdGlwOiBcImpyZXM6MzAyNTAzNzBcIiB9IC8vUkMgMzAyNTAzNzAgOiBabcSbbmEgcHJvZmlsdVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJlRmlsbEluUHJvZ3Jlc3MpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VcGRhdGVBY3Rpb24oW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNOb3Z5XSEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlBvcml6b3ZhY09wcmF2aXRdISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUG9yaXpvdmFjT2RzdHJhbml0XSEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlBvcml6b3ZhY1ByZWRrb250YWNlXSEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlBvcml6b3ZhY0ltcG9ydFNjaHJhbmthXSEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlBvcml6b3ZhY0ltcG9ydFNvdWJvcl0hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNQcmVrb250YWNlVnl0dm9yaXRPem5hY2VuZV0hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNQcmVrb250YWNlVnl0dm9yaXRWc2VjaF0hXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBlbmFibGVkOiBmYWxzZSwgdG9vbHRpcDogXCJqcmVzOjMwMjUwNDU5XCIgfSAvL1JDIDMwMjUwNDU5IDogUHJvYsOtaMOhIHDFmWVka29udGFjZVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNOb3Z5XT8udXBkYXRlUGVybWlzc2lvbihhY3Rpb25QZXJtaXNzaW9ucz8uTm92eVBvcml6b3ZhYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUG9yaXpvdmFjT3ByYXZpdF0/LnVwZGF0ZVBlcm1pc3Npb24oYWN0aW9uUGVybWlzc2lvbnM/Lk9wcmF2aXRQb3Jpem92YWMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlBvcml6b3ZhY09kc3RyYW5pdF0/LnVwZGF0ZVBlcm1pc3Npb24oYWN0aW9uUGVybWlzc2lvbnM/Lk9kc3RyYW5pdFBvcml6b3ZhYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUG9yaXpvdmFjUHJlZGtvbnRhY2VdPy51cGRhdGVQZXJtaXNzaW9uKGFjdGlvblBlcm1pc3Npb25zPy5QcmVka29udGFjZVBvcml6b3ZhYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUG9yaXpvdmFjSW1wb3J0U2NocmFua2FdPy51cGRhdGVQZXJtaXNzaW9uKGFjdGlvblBlcm1pc3Npb25zPy5JbXBvcnRaYXBpc3VQb3Jpem92YWMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlBvcml6b3ZhY0ltcG9ydFNvdWJvcl0/LnVwZGF0ZVBlcm1pc3Npb24oYWN0aW9uUGVybWlzc2lvbnM/LkltcG9ydFphcGlzdVBvcml6b3ZhYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3Rpb25zW0FjdGlvbnMuUG9yaXpvdmFjUHJla29udGFjZVZ5dHZvcml0T3puYWNlbmVdPy51cGRhdGVQZXJtaXNzaW9uKGFjdGlvblBlcm1pc3Npb25zPy5WeXR2b3JpdFByZWRrb250YWNpUG9yaXpvdmFjKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNQcmVrb250YWNlVnl0dm9yaXRWc2VjaF0/LnVwZGF0ZVBlcm1pc3Npb24oYWN0aW9uUGVybWlzc2lvbnM/LlZ5dHZvcml0UHJlZGtvbnRhY2lQb3Jpem92YWMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHBvY2V0WmFwaXN1ID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZUFjdGlvbihbdGhpcy5hY3Rpb25zW0FjdGlvbnMuUG9yaXpvdmFjT3ByYXZpdF0hLCB0aGlzLmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNPZHN0cmFuaXRdIV0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsIHRvb2x0aXA6IFwianJlczozMDI1MDQ2MFwiIC8vUkMgMzAyNTA0NjAgOiBOZW7DrSDFvsOhZG7DvSByb3pwb8SNdG92w70gesOhcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVwZGF0ZUFjdGlvbihbdGhpcy5hY3Rpb25zW0FjdGlvbnMuUG9yaXpvdmFjVWxveml0XSEsIHRoaXMuYWN0aW9uc1tBY3Rpb25zLlBvcml6b3ZhY1pydXNpdF0hXSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLCB0b29sdGlwOiBcImpyZXM6MzAyNTAzNTZcIlxyXG4gICAgICAgICAgICAgICAgfSk7Ly9SQyAzMDI1MDM1NiA6IFBvxZlpem92YcSNIG5lbsOtIHYgcmXFvmltdSBwb8WZaXpvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuVXBkYXRlQWN0aW9uKHRoaXMuYWN0aW9uc1tBY3Rpb25zLlBvcml6b3ZhY1pydXNpdF0hLCB7IGVuYWJsZWQ6IGZhbHNlLCB0b29sdGlwOiB0b29sdGlwIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrdHVhbGl6YWNlIGFrY2VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gYWtjZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgVXBkYXRlQWN0aW9uKGFrY2U6IEdBY3Rpb25bXSwgb3B0aW9uczogR0FjdGlvblBhcmFtc0RlZk9iakJhc2UpIHtcclxuICAgICAgICAgICAgLy9pbnN0YW5jZW9mICBcclxuICAgICAgICAgICAgLy9pZiAodHlwZW9mIG9wdGlvbnMuY2FwdGlvbiA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvcHRpb25zLmNhcHRpb24gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBha2NlLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0udXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBvcHRpb25zLmVuYWJsZWQgPyBvcHRpb25zLmVuYWJsZWQgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkOiBvcHRpb25zLmNoZWNrZWQgPyBvcHRpb25zLmNoZWNrZWQgOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBvcHRpb25zLnRvb2x0aXAgPyBvcHRpb25zLnRvb2x0aXAgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IG9wdGlvbnMudmlzaWJsZSA/IG9wdGlvbnMudmlzaWJsZSA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogb3B0aW9ucy5jYXB0aW9uID8gb3B0aW9ucy5jYXB0aW9uIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IG9wdGlvbnMuaWNvbiA/IG9wdGlvbnMuaWNvbiA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEplIGRva2xhZCB2IGVkaXRhY2lcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgaXNFZGl0TW9kZSgpIHtcclxuICAgICAgICAgICAgLy9pZiAodHlwZW9mIGNvbnRlbnQuRWRpdGFjZUhsYXZpY2t5ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb250ZW50LkVkaXRhY2VaYXBpc3UgPT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5lZGl0SGVhZGVyKSB8fCB0aGlzLmVkaXRSb3dzO1xyXG4gICAgICAgICAgICAvL2Vsc2VcclxuICAgICAgICAgICAgLy9yZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvLyNyZWdpb24gQWtjZSBkZXRhaWx1XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb3ZlZGVuaSBha2NlIHBvIHN0aXNrbnV0aSB0bGFjaXRrYVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogWmF2b2xhbmkgYWtjZSBuYWQgZG9rbGFkZW1cclxuICAgICAgICAgKiBUYXRvIGZ1bmtjZSBzZSB2b2xhIHogYWN0aW9uLCBhYnkgc2UgZnVua2NlIG1vaGxhIHZvbGF0IHJla3Vyeml2bmVcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgZXhlY3V0ZUFjdGlvbihyZXF1ZXN0OiBVY3QuSW50ZXJmYWNlLkdSb3pEb2tsYWRJbkR0byk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpczsgLy8gdGhpcyBqZSB6ZGUgY29udGVudFxyXG5cclxuICAgICAgICAgICAgLy8gTmF2cmF0b3Z5IHByb21pc2UgY2VsZSBha2NlXHJcbiAgICAgICAgICAgIC8vIFRhdG8gbWV0b2RhIG11c2kgYnl0IGFzeW5jaHJvbm5pLCBjZWthIG5hIHJlYWtjaSB1eml2YXRlbGVcclxuICAgICAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuY2hlY2tFZGl0U3RhdGUocmVxdWVzdCkgLy8gS29udHJvbGEgZWRpdGFjbmlobyBzdGF2dS5cclxuXHJcbiAgICAgICAgICAgIC8vIFpvYnJhemVuaSBmb3JtdWxhcmUgcHJlZCBha2NpICh2IHByaXBhZGUgcG90cmVieSlcclxuICAgICAgICAgICAgLy8gT3BldCBzZSBqZWRuYSBvIGFzeW5jaHJvbm5pIG1ldG9kdVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBUYXRvIG1ldG9kYSBtdXNpIGJ5dCBhc3luY2hyb25uaSwgY2VrYSBuYSByZWFrY2kgdXppdmF0ZWxlXHJcbiAgICAgICAgICAgICAgICAvLyBOYXZyYXRvdm91IGhvZG5vdG91IGplIHJlcXVlc3QgZG9wbG5lbnkgZGF0eVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvd0Zvcm1Gb3JBY3Rpb24ocmVxdWVzdCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvLyBEb3BsbmVuaSBkYXQgZG8gcmVxdWVzdHUsIHBva3VkIGplIHRvIHBvdHJlYmFcclxuICAgICAgICAgICAgLy8gVG90byBzZSB2eXJpZGkgc3luY2hyb25uZSwgbmEgbmljIHNlIG5lY2VrYVxyXG4gICAgICAgICAgICAudGhlbigocmVxdWVzdCkgPT4geyAvLyB2c3R1cGVtIGpzb3UgZGF0YSB6IGZvcm11bGFyZSwgcG9rdWQgYnlsIHpvYnJhemVuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXBhcmVSZXF1ZXN0KHJlcXVlc3QpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy8gWm9icmF6ZW5pIGluZm9ybWFjbmkgaGxhc2t5IG8gcHJvdmFkZW5lIGFrY2kgLSBzeW5jaHJvbm5pIG9wZXJhY2VcclxuICAgICAgICAgICAgLnRoZW4oKHJlcXVlc3QpID0+IHsgLy8gdnN0dXBlbSBqc291IGRhdGEgeiBmb3JtdWxhcmUsIHBva3VkIGJ5bCB6b2JyYXplblxyXG4gICAgICAgICAgICAgICAgdGhpcy5TaG93T3BlcmF0aW9uVGV4dChyZXF1ZXN0LmFjdGlvbiEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAvLyBPZGVzbGFuaSBwb3phZGF2a3UgbmEgc2VydmVyXHJcbiAgICAgICAgICAgIC8vIFRvdG8gamUgcG9jaG9waXRlbG5lIGFzeW5jaHJvbm5pLCBjZWthIHNlIG5hIHZvbGFuaSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgIC50aGVuKChyZXF1ZXN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIC8vIE9kZXNsaSBwb3phZGF2ZWsgbmEgc2VydmVyXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdFRvU2VydmVyKHJlcXVlc3QpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgLy8gMzAuMDkuMjUgS0sgLSB6cHJhY292YW5pIG9kcG92ZWRpIHByZW5lc2VubyBkbyB2b2xhbmkgYWtjZVxyXG4gICAgICAgICAgICAvLy8vIFpwcmFjb3Zhbmkgb2Rwb3ZlZGlcclxuICAgICAgICAgICAgLy8vLyBNdXNpIGJ5dCBhc3luY2hyb25uaSBwcm90b3plIGJ1ZHUgdm9sYXQgbm92ZSB6b2JyYXplbmkgY29udGVudHVcclxuICAgICAgICAgICAgLy8udGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAvLyAgICByZXR1cm4gdGhpcy5wcm9jZXNzUmVzcG9uc2VGcm9tU2VydmVyKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgLy99KVxyXG5cclxuICAgICAgICAgICAgLy8gWnByYWNvdmFuaSBjaHlieSwgcHJpcGFkbmUgdm9sYW5pIG1ldG9keSByZWt1cnppdm5lXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NFcnJvckZyb21TZXJ2ZXIoZXJyb3IsIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVrb25jZW5pIG9wZXJhY2VcclxuICAgICAgICAgICAgLy8gLmFsd2F5cyBhdXRvbWF0aWNreSBuZXByaWppbWEgaG9kbm90dSBqYWtvIHBhcmFtZXRyIGEgYXV0b21hdGlja3kgcHJlcG9zaWxhIGRhbFxyXG4gICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uPy4oKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtvbnRyb2xhIGVkaXRhY25paG8gc3RhdnUgcHJlZCBwcm92ZWRlbmltIGFrY2VcclxuICAgICAgICAgKiBAcGFyYW0gdHlwQWtjZSAtIHR5cCBwcm92YWRlbmUgYWtjZVxyXG4gICAgICAgICAqIEByZXR1cm5zIFByb21pc2UsIGt0ZXJ5IHNlIHZ5cmVzaSwgcG9rdWQgdXppdmF0ZWwgcG90dnJkaSB6cnVzZW5pIGVkaXRhY2VcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gQXN5bmNocm9ubmkgbWV0b2RhLCBwcm90b3plIG11emUgY2VrYXQgbmEgcmVha2NpIHV6aXZhdGVsZSAtIGkga2R5eiBhc3luY2hyb25uaSB2b2xhbmkgamUgdXZuaXRyIHZvbGFuZSBtZXRvZHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNoZWNrRWRpdFN0YXRlKHJlcXVlc3Q6IFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZEluRHRvKTogSlF1ZXJ5LlByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICAvLyBWeXR2b3Igc2kgbm92eSB2eXJlc2VueSBwcm9taXNlXHJcbiAgICAgICAgICAgIC8vIEplIHRvIHogZHV2b2R1LCBwcm90b3plIG5lbXVzaSBieXQgc3BsbmVuYSBhbmkgamVkbmEgcG9kbWlua2EgYSBwYWsgYnkgbWV0b2RhIG5ldnJhdGlsYSBwcm9taXNlXHJcbiAgICAgICAgICAgIC8vIFByb3RvIHZ5dHZvcmltIHV6IHJvdm5vdSB2eXJlc2VueSwgYWJ5IHByaXBhZG5hIHZvbGFqaWNpIG1ldG9kYSBuZWNla2FsYVxyXG4gICAgICAgICAgICBsZXQgcHJvbWlzZTogSlF1ZXJ5LlByb21pc2U8dm9pZD4gPSAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFByaSBldmlkZW5jaSBhIHZrbGFkYW5pIHRvIG5lc21pbSBrb250cm9sb3ZhdCwgcHJvdG96ZSBqc2VtIHYgZWRpdGFjbmltIHJlemltdVxyXG4gICAgICAgICAgICAvL2lmICgodGhpcy5lZGl0SGVhZGVyKSAmJiByZXF1ZXN0LmFjdGlvbiAhPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuRXZpZGVuY2UpIHtcclxuICAgICAgICAgICAgaWYgKCh0aGlzLmVkaXRIZWFkZXIpKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKCgpID0+IHRoaXMuY2hlY2tIZWFkZXJFZGl0aW5nQXN5bmMoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmVkaXRSb3dzKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKCgpID0+IHRoaXMuY2hlY2tSb3dzRWRpdGluZ0FzeW5jKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtvbnRyb2xhIGVkaXRhY2UgaGxhdmnEjWt5XHJcbiAgICAgICAgICogQHJldHVybnMgUHJvbWlzZSwga3Rlcnkgc2UgdnlyZXNpLCBwb2t1ZCB1eml2YXRlbCBwb3R2cmRpIHpydXNlbmkgZWRpdGFjZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY2hlY2tIZWFkZXJFZGl0aW5nQXN5bmMoKTogSlF1ZXJ5LlByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICAvLyBWeXR2b8WZZW7DrSBkaWFsb2d1XHJcbiAgICAgICAgICAgIGNvbnN0ICRkaWFsb2cgPSB0aGlzLmRpYWxvZ3MuY29uZmlybShcImpyZXM6MzAxNTAxNTFcIik7IC8vUkMgMzAxNTAxNTEgOiBQcm9iw61ow6EgZWRpdGFjZSBkb2tsYWR1LCBwb8WZw616ZW7DoSBkYXRhIGJ1ZG91IHp0cmFjZW5hLiBQxZllamV0ZSBzaSBwb2tyYcSNb3ZhdCA/XHJcblxyXG4gICAgICAgICAgICAvLyBQxZlldmVkZW7DrSBkaWFsb2d1IG5hIHByb21pc2UgYSB2cmFjZW5pIHByb21pc2VcclxuICAgICAgICAgICAgcmV0dXJuICRkaWFsb2cuY3JlYXRlRGlhbG9nUHJvbWlzZShcInllc1wiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFXFvml2YXRlbCBvZHBvdsSbZMSbbCBcInllc1wiIC0gcG9rcmHEjXVqZW1lLiBOZW9jZWthdmEgc2Ugb2Rwb3ZlZFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC8vLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vIFXFvml2YXRlbCB6cnXFoWlsIG5lYm8gb2Rwb3bEm2TEm2wgamluYWtcclxuICAgICAgICAgICAgICAgIC8vICAgIHRocm93IG5ldyBHRXJyb3IoXCJ1c2VyIGNhbmNlbFwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS29udHJvbGEgZWRpdGFjZSDFmcOhZGvFr1xyXG4gICAgICAgICAqIEByZXR1cm5zIFByb21pc2UsIGt0ZXJ5IHNlIHZ5cmVzaSwgcG9rdWQgdXppdmF0ZWwgcG90dnJkaSB6cnVzZW5pIGVkaXRhY2VcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgY2hlY2tSb3dzRWRpdGluZ0FzeW5jKCk6IEpRdWVyeS5Qcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBEaWFsb2cgcHJvIHBvdHZyemVuw60genJ1xaFlbsOtIGVkaXRhY2UgxZnDoWRrxa9cclxuICAgICAgICAgICAgY29uc3QgJGRpYWxvZyA9IHRoaXMuZGlhbG9ncy5jb25maXJtKFwianJlczozMDE1MDE1MlwiKTsgLy9SQyAzMDE1MDE1MiA6IFByb2LDrWjDoSBlZGl0YWNlIHrDoXBpc8WvLCBwb8WZw616ZW7DoSBkYXRhIGJ1ZG91IHp0cmFjZW5hLiBQxZllamV0ZSBzaSBwb2tyYcSNb3ZhdCA/XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJGRpYWxvZy5jcmVhdGVEaWFsb2dQcm9taXNlKFwieWVzXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVcW+aXZhdGVsIHBvdHZyZGlsIC0genJ1xaHDrW1lIGVkaXRhY2lcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRwb3Jpem92YWMuZ2dyaWRyb3dlZGl0b3IoXCJjYW5jZWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLy8uY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdGhyb3cgbmV3IEdFcnJvcihcInVzZXIgY2FuY2VsXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbml2ZXJ6w6FsbsOtIG1ldG9kYSBwcm8gem9icmF6ZW7DrSBmb3JtdWzDocWZZSBwxZllZCBha2PDrSBuZWJvIHDFmWkgc2VydmVyIGVycm9yXHJcbiAgICAgICAgICogQHBhcmFtIHJlcXVlc3RcclxuICAgICAgICAgKiBAZGVzY3JpcHRpb24gTWV0b2RhIG5ldnl0dmFyaSBuYXByaW1vIG9iamVrdCBkZWZlcnJlZCwgdGVuIHZ5dHZhcmkgdm5pdHJuaSBheiB2bml0cm5pIG1ldG9keS4gWiBuaWNoIGplIHBvdHJlYmEgcG90ZSB0ZW4gcHJvbWlzZSB2cmF0aXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNob3dGb3JtRm9yQWN0aW9uKHJlcXVlc3Q6IFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZEluRHRvKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gUG9rdWQgdm9sYW0gYWtjaSByZWt1cnppdm5lLCBqaXogdnNlY2huYSBkYXRhIG1hbSBhIG5pYyBuZXpvYnJhenVqaVxyXG4gICAgICAgICAgICBpZiAocmVxdWVzdC5tZW1iZXIgIT09IG51bGwgJiYgcmVxdWVzdC5tZW1iZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHJlcXVlc3QpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJvemhvZG51IHNlIGRsZSBzcHVzdGVuZSBha2NlXHJcbiAgICAgICAgICAgIHN3aXRjaCAocmVxdWVzdC5hY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlBvZGFuaTpcclxuICAgICAgICAgICAgICAgICAgICAvLyBaamlzdGkgc2kgbG9rYWxuaSBuYXN0YXZlbmksIHpkYSB6b2JyYXppdCBmb3JtdWxhciBwcm8gemFkYXZhbmkgcGlkdSAoMC1uZSwgMS1hbm8pXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hvd0RpYWxvZyA9IHRoYXQuZ2xvYmFsU2V0dGluZ3M/LmdldChcIkdsb2JhbC5Fa28uQXBwU2V0dGluZ3MuUGlkU2V0dGluZ3NGb3JtLlJlemltWmFkYXZhbmlQaWR1XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBQb2t1ZCBuZW1hIHBvdm9sZW5vIGdlbmVyb3ZhdCBwaWQsIHZ6ZHkgbXVzaW0gb2tubyB6b2JyYXppdCBuZWhsZWRlIG5hIGxva2FsbmkgbmFzdGF2ZW5pLiBQb2t1ZCBtYSBuYXN0YXZlbm8gem9icmF6ZW5pLCB6b2JyYXogbXUgaG9cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcz8uUG92b2xpdEdlbmVyb3ZhbmlQaWR1RG9rbGFkdSB8fCBzaG93RGlhbG9nID09PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dQb2RhbmkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGE6IElHUG9kYW5pTW9kZWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNb2RpZmlrdWplIHDFr3ZvZG7DrSByZXF1ZXN0IG9iamVrdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocmVxdWVzdCwgeyBpeHA6IGRhdGEuSXhwIH0pIGFzIFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZEluRHRvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdFcnJvcihcImpyZXM6MzAxNTAxMDJcIik7IC8vIFJDIDMwMTUwMTAyIDogQWtjZSBieWxhIHN0b3Jub3bDoW5hIHXFvml2YXRlbGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBva3VkIG1hIHBvdm9sZW5vIGdlbmVyb3ZhbmkgYSBuZXpvYnJhemlsIHNlIGRpYWxvZywgdnludWx1aiBtdSBpeHBcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXF1ZXN0LCB7IGl4cDogbnVsbCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKHJlcXVlc3QpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuU3Rvcm5vOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE11c2ltIHZyYXRpdCBwcm9taXNlLCBwcm90b3plIHNlIGNla2EgbmEgb2Rwb3ZlZCB1eml2YXRlbGVcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dEdXZvZChcImpyZXM6MzAxNTAxNTRcIikgLy9SQyAzMDE1MDE1NCA6IFphZGVqdGUgZMWvdm9kIHN0b3JuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodGV4dDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNb2RpZmlrdWplIHDFr3ZvZG7DrSByZXF1ZXN0IG9iamVrdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXF1ZXN0LCB7IGR1dm9kOiB0ZXh0IH0pIGFzIFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZFJlZGlzdHJpYnVjZUluRHRvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR0Vycm9yKFwianJlczozMDE1MDEwMlwiKTsgLy8gUkMgMzAxNTAxMDIgOiBBa2NlIGJ5bGEgc3Rvcm5vdsOhbmEgdcW+aXZhdGVsZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuQWt0aXZhY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9nRHV2b2QoXCJqcmVzOjMwMTUwMTUzXCIpIC8vUkMgMzAxNTAxNTMgOiBaYWRlanRlIGTFr3ZvZCBha3RpdmFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodGV4dDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNb2RpZmlrdWplIHDFr3ZvZG7DrSByZXF1ZXN0IG9iamVrdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXF1ZXN0LCB7IGR1dm9kOiB0ZXh0IH0pIGFzIFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZFJlZGlzdHJpYnVjZUluRHRvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR0Vycm9yKFwianJlczozMDE1MDEwMlwiKTsgLy8gUkMgMzAxNTAxMDIgOiBBa2NlIGJ5bGEgc3Rvcm5vdsOhbmEgdcW+aXZhdGVsZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuVnJhY2VuaURvV2ZsOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ0R1dm9kKFwianJlczozMDE1MDE1OFwiKSAvL1JDIDMwMTUwMTU4IDogWmFkZWp0ZSBkxa92b2QgdnLDoWNlbsOtIGRvIFdGTFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodGV4dDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNb2RpZmlrdWplIHDFr3ZvZG7DrSByZXF1ZXN0IG9iamVrdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXF1ZXN0LCB7IGR1dm9kOiB0ZXh0IH0pIGFzIFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZFJlZGlzdHJpYnVjZUluRHRvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR0Vycm9yKFwianJlczozMDE1MDEwMlwiKTsgLy8gUkMgMzAxNTAxMDIgOiBBa2NlIGJ5bGEgc3Rvcm5vdsOhbmEgdcW+aXZhdGVsZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUHJlZGFuaTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dQcmVkYW5pKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGE6IElHUHJlZGF0TW9kZWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1vZGlmaWt1amUgcMWvdm9kbsOtIHJlcXVlc3Qgb2JqZWt0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHJlcXVlc3QsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfZnVuX2FrdDogZGF0YS5peHNfZnVuX2FrdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfcmVmOiBkYXRhLml4c19yZWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2Z1bl92eXJpejogZGF0YS5peHNfZnVuX3Z5cml6LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNpc19yZWFsOiBkYXRhLmNpc19yZWFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1dm9kOiBkYXRhLmR1dm9kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHRoYXQuZ2xvYmFscy5Fa29QYXJhbXM/Lkl4cERlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pIGFzIFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZFJlZGlzdHJpYnVjZUluRHRvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR0Vycm9yKFwianJlczozMDE1MDEwMlwiKTsgLy8gUkMgMzAxNTAxMDIgOiBBa2NlIGJ5bGEgc3Rvcm5vdsOhbmEgdcW+aXZhdGVsZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUHJlZXZpZGVuY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9nUHJlZXZpZG92YW5pKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGE6IElHUHJlZXZpZGVuY2VNb2RlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTW9kaWZpa3VqZSBwxa92b2Ruw60gcmVxdWVzdCBvYmpla3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocmVxdWVzdCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1dm9kOiBkYXRhLmR1dm9kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IGRhdGEuaXhwX2RlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfZnVuX2FrdDogZGF0YS5peHNfZnVuX2FrdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfcmVmOiBkYXRhLml4c19yZWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2lzX3JlYWw6IGRhdGEuY2lzX3JlYWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2Z1bl92eXJpejogZGF0YS5peHNfZnVuX3Z5cml6LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19zdTogZGF0YS5peHNfc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VicmFkYTogZGF0YS5zdWJyYWRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSBhcyBVY3QuSW50ZXJmYWNlLkdSb3pEb2tsYWRSZWRpc3RyaWJ1Y2VJbkR0bztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdFcnJvcihcImpyZXM6MzAxNTAxMDJcIik7IC8vIFJDIDMwMTUwMTAyIDogQWtjZSBieWxhIHN0b3Jub3bDoW5hIHXFvml2YXRlbGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlByaWRlbGVuaTpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dQcmlkZWxlbmkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YTogSUdQcmlkZWxpdE1vZGVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNb2RpZmlrdWplIHDFr3ZvZG7DrSByZXF1ZXN0IG9iamVrdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXF1ZXN0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2Z1bl9ha3Q6IGRhdGEuaXhzX2Z1bl9ha3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3N1OiBkYXRhLml4c19zdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXZvZDogZGF0YS5kdXZvZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pIGFzIFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZFJlZGlzdHJpYnVjZUluRHRvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR0Vycm9yKFwianJlczozMDE1MDEwMlwiKTsgLy8gUkMgMzAxNTAxMDIgOiBBa2NlIGJ5bGEgc3Rvcm5vdsOhbmEgdcW+aXZhdGVsZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUG9yaXpvdmFjT3ByYXZpdDogeyAvLyB1emF2cmVuaSBjYXNlIGRvIGJsb2t1IHVtb3puaSBwb3V6aXRpIHNlbGVjdGVkUm93cyB1dm5pdHIgYmxva3UgdG9ob3RvIGkgZGFsc2lob1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5hY3RpIHNpIHZ5YnJhbmUgcmFka3lcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRSb3dzID0gR29yZGljLkVrby5HcmlkLmNoZWNrZWRSb3dzKHRoYXQuJHBvcml6b3ZhYyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFBva3VkIG5lbmkgdnlicmFueSBqZWRlbiBrb25rdGVybmkgemFwaXMsIHVrb25jaSB0b1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VsZWN0ZWRSb3dzIHx8IHNlbGVjdGVkUm93cz8ubGVuZ3RoICE9IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KG5ldyBHRXJyb3IoXCJqcmVzOjMwMjUwMzcyXCIpKTsgLy9SQyAzMDI1MDM3MiA6IE5ldnlicsOhbnkgxb7DoWRuw6kgesOhcGlzeVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGFkeSBzZSBuZXpvYnJhemkgemFkbnkgZm9ybXVsYXIsIHByb3RvIG11c2ltIHZyYXRpdCB2eXJlc2VueSBwcm9taXNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZShyZXF1ZXN0KS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5Qb3Jpem92YWNPZHN0cmFuaXQ6IHsgLy8gdXphdnJlbmkgY2FzZSBkbyBibG9rdSB1bW96bmkgcG91eml0aSBzZWxlY3RlZFJvd3MgdXZuaXRyIGJsb2t1IHRvaG90byBpIHByZWRjaG96aWhvXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTmFjdGkgc2kgdnlicmFuZSByYWRreVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZFJvd3MgPSBHb3JkaWMuRWtvLkdyaWQuY2hlY2tlZFJvd3ModGhhdC4kcG9yaXpvdmFjKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgbmVuaSB2eWJyYW55IHphZG55IHphcGlzIHBybyBzbWF6YW5pLCB1a29uY2kgenByYWNvdmFuaSBjaHlib3UgKG9zZXRyZW5vIHVuZGVmaW5lZCBob2Rub3RhIHogbWV0b2R5KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VsZWN0ZWRSb3dzIHx8IHNlbGVjdGVkUm93cz8ubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QobmV3IEdFcnJvcihcImpyZXM6MzAyNTAzNzJcIikpOyAvL1JDIDMwMjUwMzcyIDogTmV2eWJyw6FueSDFvsOhZG7DqSB6w6FwaXN5XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5jb25maXJtKFwianJlczozMDE1MDE2NlwiLmZvcm1hdChzZWxlY3RlZFJvd3M/Lmxlbmd0aCkpIC8vUkMgMzAxNTAxNjYgOiBCdWRlIG9kc3RyYW7Em25vIMWZw6Fka8WvOiB7MH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKFwieWVzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR0Vycm9yKFwianJlczozMDE1MDEwMlwiKTsgLy8gUkMgMzAxNTAxMDIgOiBBa2NlIGJ5bGEgc3Rvcm5vdsOhbmEgdcW+aXZhdGVsZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAvLyBUYWR5IHNlIG5lem9icmF6aSB6YWRueSBmb3JtdWxhciwgcHJvdG8gbXVzaW0gdnJhdGl0IHZ5cmVzZW55IHByb21pc2VcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUocmVxdWVzdCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbmkgaW5mb3JtYWNuaWhvIHRleHR1IGRsZSBwcm92ZWRlbiBvcGVyYWNlXHJcbiAgICAgICAgICogQHBhcmFtIHR5cEFrY2UgVHlwIGFrY2VcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgU2hvd09wZXJhdGlvblRleHQodHlwQWtjZTogR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBpbmZvVGV4dDogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAodHlwQWtjZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUG9kYW5pOlxyXG4gICAgICAgICAgICAgICAgICAgIGluZm9UZXh0ID0gXCJqcmVzOjMwMTUwMDcyXCI7IC8vUkMgMzAxNTAwNzIgOiBQcm9iw61ow6EgcG9kw6Fuw60gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuRXZpZGVuY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mb1RleHQgPSBcImpyZXM6MzAxNTAwNzRcIjsgLy9SQyAzMDE1MDA3NCA6IFByb2LDrWjDoSBldmlkZW5jZSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5PcHJhdmE6XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mb1RleHQgPSBcImpyZXM6MzAxNTAwODJcIjsgLy9SQyAzMDE1MDA4MiA6IFByb2LDrWjDoSBvcHJhdmEgaGxhdmnEjWt5IGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlpydXNpdDpcclxuICAgICAgICAgICAgICAgICAgICBpbmZvVGV4dCA9IFwiUHJvYsOtaMOhIHpydcWhZW7DrSBvcHJhdnkgaGxhdmnEjWt5XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5TY2h2YWxlbmk6XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mb1RleHQgPSBcImpyZXM6MzAxNTAxMzNcIjsgLy9SQyAzMDE1MDEzMyA6IFByb2LDrWjDoSBzY2h2w6FsZW7DrSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5PZHNjaHZhbGVuaTpcclxuICAgICAgICAgICAgICAgICAgICBpbmZvVGV4dCA9IFwianJlczozMDE1MDEzNVwiOyAvL1JDIDMwMTUwMTM1IDogUHJvYsOtaMOhIHpydcWhZW7DrSBzY2h2w6FsZW7DrSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5SZWFsaXphY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mb1RleHQgPSBcImpyZXM6MzAxNTAxNDFcIjsgLy9SQyAzMDE1MDE0MSA6IFByb2LDrWjDoSByZWFsaXphY2UgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuU3Rvcm5vOlxyXG4gICAgICAgICAgICAgICAgICAgIGluZm9UZXh0ID0gXCJqcmVzOjMwMTUwMDk3XCI7IC8vUkMgMzAxNTAwOTcgOiBQcm9iw61ow6Egc3Rvcm5vIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLkFrdGl2YWNlOlxyXG4gICAgICAgICAgICAgICAgICAgIGluZm9UZXh0ID0gXCJqcmVzOjMwMTUwMTE0XCI7IC8vUkMgMzAxNTAxMTQgOiBQcm9iw61ow6EgYWt0aXZhY2UgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuVXphdnJlbmk6XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mb1RleHQgPSBcImpyZXM6MzAxNTAxNTVcIjsgLy9SQyAzMDE1MDE1NSA6IFByb2LDrWjDoSB1emF2xZllbsOtIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlByZWV2aWRlbmNlOlxyXG4gICAgICAgICAgICAgICAgICAgIGluZm9UZXh0ID0gXCJqcmVzOjMwMTUwMTE5XCI7IC8vUkMgMzAxNTAxMTkgOiBQcm9iw61ow6EgcMWZZWTDoW7DrSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5QcmVkYW5pOlxyXG4gICAgICAgICAgICAgICAgICAgIGluZm9UZXh0ID0gXCJqcmVzOjMwMTUwMTE5XCI7IC8vUkMgMzAxNTAxMTkgOiBQcm9iw61ow6EgcMWZZWTDoW7DrSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5QcmV2emV0aTpcclxuICAgICAgICAgICAgICAgICAgICBpbmZvVGV4dCA9IFwianJlczozMDE1MDE1OVwiOyAvL1JDIDMwMTUwMTU5IDogUHJvYsOtaMOhIHDFmWV2emV0w60gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUHJpZGVsZW5pOlxyXG4gICAgICAgICAgICAgICAgICAgIGluZm9UZXh0ID0gXCJqcmVzOjMwMTUwMTYwXCI7IC8vUkMgMzAxNTAxNjAgOiBQcm9iw61ow6EgcMWZaWTEm2xlbsOtIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlZyYWNlbmlEb1dmbDpcclxuICAgICAgICAgICAgICAgICAgICBpbmZvVGV4dCA9IFwianJlczozMDE1MDE1N1wiOyAvL1JDIDMwMTUwMTU3IDogUHJvYsOtaMOhIHZyw6FjZW7DrSBkb2tsYWR1IGRvIFdGTFxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUG9yaXpvdmFjTm92eTpcclxuICAgICAgICAgICAgICAgICAgICBpbmZvVGV4dCA9IFwianJlczozMDE1MDE2OFwiOyAvL1JDIDMwMTUwMTY4IDogUHJvYsOtaMOhIHDFmWlkw6F2w6Fuw60gbm92w6lobyB6w6FwaXN1XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5Qb3Jpem92YWNPZHN0cmFuaXQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mb1RleHQgPSBcImpyZXM6MzAyNTAzNTlcIjsgLy9SQyAzMDE1MDE1OSA6IC8vUkMgMzAyNTAzNTkgOiBQcm9iw61ow6EgbWF6w6Fuw60gesOhcGlzxa9cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy8gWm9icmF6IHByaXNsdXNub3UgaGxhc2t1XHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24/LihpbmZvVGV4dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcmlwcmF2YSBkYXQgcHJvIG9kZXNsYW5pIG5hIHNlcnZlclxyXG4gICAgICAgICAqIEBwYXJhbSByZXF1ZXN0IE9iamVrdCBwb3phZGF2a3VcclxuICAgICAgICAgKiBAcGFyYW0gdHlwQWtjZSBUeXAgYWtjZSwgcHJvIGt0ZXJvdSBzZSBkYXRhIHByaXByYXZ1amlcclxuICAgICAgICAgKiBAcmV0dXJucyBQcmlwcmF2ZW55IHJlcXVlc3QgcHJvIG9kZXNsYW5pIG5hIHNlcnZlclxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBUYXRvIG1ldG9kYSBqZSBzeW5jaHJvbm5pLCBuYSBuaWMgc2UgbmVjZWthLiBQb3V6ZSB2cmFjaSBob2Rub3R1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwcmVwYXJlUmVxdWVzdChyZXF1ZXN0OiBVY3QuSW50ZXJmYWNlLkdSb3pEb2tsYWRJbkR0byk6IFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZEluRHRvIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBTcGVjaWZpY2thIGRhdGEgcG9kbGUgdHlwdSBha2NlXHJcbiAgICAgICAgICAgIHN3aXRjaCAocmVxdWVzdC5hY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLkV2aWRlbmNlOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIE5lanBydmUgcG91emlqdSB2YWxpZGFjaSBmb3JtdWxhcmVcclxuICAgICAgICAgICAgICAgICAgICAvL2lmKHRoYXQuZmluZEZpZWxkcyhcImZvcm06Zm9ybURldGFpbCxmb3JtOmZvcm1IZWFkZXJcIikuZ2Zvcm0oXCJpc1ZhbGlkXCIpKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiKSkgdGhyb3cgbnVsbDsgLy8gWmF2b2xlaiBmYWxzZSB2ZXRldiAvIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBOeW5pIHNlc2JpcmVqIGRhdGEgZG9rbGFkdS4gVnl0dmFyaW0gc2kgbm92eSBvYmpla3QsIGFieSB2IHByaXBhZGUgY2h5YnkgbmV6dXN0YWwgbmVrb21wYXRpYmlsbmkgb2JqZWt0IHRoYXQuZG9rbGFkXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgc2UgZXZpZGVuY2UgcG92ZWRlLCBzZXJ2ZXIgbWkgdnJhdGkgcGxhdG55IHJlYWRPbmx5IG9iamVrdCB0aGF0LmRva2xhZFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBoZWFkZXJEYXRhOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SGVhZGVyOiBHb3JkaWMuRWtvLkludGVyZmFjZS5HUm96c3BpZER0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdJaXNzcDogR29yZGljLlVjdC5JbnRlcmZhY2UuR1JvenNpc3BEdG8gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJmb3JtOmZvcm1EZXRhaWwsZm9ybTpmb3JtSGVhZGVyXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBoZWFkZXJEYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJlbG96IHR5IHNwcmF2bmUgaG9kbm90eSBkbyBwcmlzbHVzbmVobyBEVE9cclxuICAgICAgICAgICAgICAgICAgICBuZXdIZWFkZXIgPSBoZWFkZXJEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBOeW5pIG11c2ltIHByZXZlc3QgSUlTU1AgZG8gc3ByYXZuZWhvIG9iamVrdHVcclxuICAgICAgICAgICAgICAgICAgICBuZXdJaXNzcC5jal9rYXAgPSBoZWFkZXJEYXRhLmNqX2thcDtcclxuICAgICAgICAgICAgICAgICAgICBuZXdJaXNzcC5jal9vc3MgPSBoZWFkZXJEYXRhLmNqX29zcztcclxuICAgICAgICAgICAgICAgICAgICBuZXdJaXNzcC5qbV96YWtsX2thcCA9IGhlYWRlckRhdGEuam1femFrbF9rYXA7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3SWlzc3Auam1femFrbF9vc3MgPSBoZWFkZXJEYXRhLmptX3pha2xfb3NzO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0lpc3NwLnJva19yemFtID0gaGVhZGVyRGF0YS5yb2tfcnphbTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdJaXNzcC5pZF9yemFtID0gaGVhZGVyRGF0YS5pZF9yemFtO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0lpc3NwLnR5cF92YXphbmkgPSBoZWFkZXJEYXRhLnR5cF92YXphbmk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFphZXZpZG92YW5pIGRva3VtZW50dVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdEb2t1bWVudDogR29yZGljLlNzbC5JbnRlcmZhY2UuR0Rva3VtZW50RHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMDYuMTEuMjQgS0sgLSDDmnByYXZhIHYgc2VicsOhbsOtIGRhdCBkb2t1bWVudHUgbmEgV2ViQ2xpZW50IChELlNlYmVzdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgLy9uZXdEb2t1bWVudCA9ICQuZXh0ZW5kKHt9LCB0aGF0LnNhdmVFa29Qcm9maWwoKSwgKHRoYXQgYXMgYW55KS5zYXZlU3NsRGV0YWlsRG9ydWNlbmlFa28gPyAodGhhdCBhcyBhbnkpLnNhdmVTc2xEZXRhaWxEb3J1Y2VuaUVrbygpIDoge30pO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0Rva3VtZW50ID0gJC5leHRlbmQodHJ1ZSwge30sIHRoYXQuc2F2ZUVrb1Byb2ZpbCgpLCAodGhhdCBhcyBhbnkpLnNhdmVTc2xEZXRhaWxEb3J1Y2VuaUVrbyA/ICh0aGF0IGFzIGFueSkuc2F2ZVNzbERldGFpbERvcnVjZW5pRWtvKCkgOiB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3RG9rdW1lbnQuaXhzX3R5cCA9IG5ld0Rva3VtZW50Lml4c190eXAgPz8gbmV3SGVhZGVyLml4c190eXA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9uZXdEb2t1bWVudC5uYXpldiA9IG5ld0Rva3VtZW50Lm5hemV2ID8/IG5ld0hlYWRlciEuZG9rdW1lbnQ/Lm5hemV2O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbmV3RG9rdW1lbnQuc3RfdXRhal9pZCA9IG5ld0Rva3VtZW50LnN0X3V0YWpfaWQgPz8gbmV3SGVhZGVyIS5kb2t1bWVudD8uc3RfdXRhal9pZDtcclxuICAgICAgICAgICAgICAgICAgICAvL25ld0Rva3VtZW50Lml4c19mdW5fYWt0ID0gbmV3RG9rdW1lbnQuaXhzX2Z1bl9ha3QgPz8gbmV3SGVhZGVyIS5kb2t1bWVudD8uaXhzX2Z1bl9ha3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocmVxdWVzdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT2Rlc2xpIGRhdGEgc2VzYmlyYW5hIHogbWVobyBmb3JtdWxhcmUuIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBuZXdIZWFkZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpaXNzcDogbmV3SWlzc3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3ZlIHNiaXJhbSBpIGRhdGEgcm96c2lyZW5laG8gcHJvZmlsdSAocG9waXNuZSB2bGFzdG5vc3RpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmxhc3Rub3N0aTogR29yZGljLlBvcGlzbmVWbGFzdG5vc3RpLmNvbGxlY3RWYWx1ZXModGhhdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhIFNTTCBkb2t1bWVudHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva3VtZW50OiBuZXdEb2t1bWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBhcyBVY3QuSW50ZXJmYWNlLkdSb3pEb2tsYWRIZWFkZXJJbkR0b1xyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUG9yaXpvdmFjVWxveml0OlxyXG4gICAgICAgICAgICAgICAgICAgIC8vT2JqZWN0LmFzc2lnbihyZXF1ZXN0LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgcm93czogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9IGFzIFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZEhlYWRlclJvd0luRHRvXHJcbiAgICAgICAgICAgICAgICAgICAgLy8pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlBvcml6b3ZhY09kc3RyYW5pdDpcclxuICAgICAgICAgICAgICAgICAgICAvLyBOYWN0aSBzaSB2eWJyYW5lIHJhZGt5XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkUm93cyA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93cyh0aGF0LiRwb3Jpem92YWMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBQcmlkYW0gc2V6bmFtIHJhZGt1IHBybyBzbWF6YW5pIGRvIHJlcXVlc3R1XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihyZXF1ZXN0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IHNlbGVjdGVkUm93c1xyXG4gICAgICAgICAgICAgICAgICAgIH0pIGFzIFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZEhlYWRlclJvd0luRHRvO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZldGV2IHBybyBuZXVwcmF2b3ZhbmUgYWtjZSwgdnJhdCBwb3V6ZSB6YXNsYW55IG5ldXByYXZlbnkgcmVxdWVzdFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPZGVzbGFuaSBwb3phZGF2a3UgbmEgc2VydmVyXHJcbiAgICAgICAgICogQHBhcmFtIHJlcXVlc3QgUHJpcHJhdmVueSByZXF1ZXN0IHBybyBvZGVzbGFuaVxyXG4gICAgICAgICAqIEByZXR1cm5zIFByb21pc2UsIGt0ZXJ5IHNlIHZ5cmVzaSBvZHBvdmVkaSB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZW5kUmVxdWVzdFRvU2VydmVyKHJlcXVlc3Q6IFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZEluRHRvKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzOyBcclxuICAgICAgICAgICAgbGV0IHByb21pc2U7XHJcblxyXG4gICAgICAgICAgICAvLyBWbml0cm5pIG1ldG9kYSB2cmFjaSBwcm9taXNlLCBrdGVyeSBtdXNpbSBuYSBrb25jaSB2cmF0aXRcclxuICAgICAgICAgICAgc3dpdGNoIChyZXF1ZXN0LmFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUG9kYW5pOlxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSB0aGF0LmlzbC5Sb3pEb2tsYWQuY3JlYXRlKHJlcXVlc3QpLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuRXZpZGVuY2U6XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSA9IHRoYXQuaXNsLlJvekRva2xhZC51cGRhdGUocmVxdWVzdCkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5PcHJhdmE6XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSA9IHRoYXQuaXNsLlJvekRva2xhZC5vcHJhdmFIbGF2aWNreShyZXF1ZXN0KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhazsgMVxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuU2NodmFsZW5pOlxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSB0aGF0LmlzbC5Sb3pEb2tsYWQuc2NodmFsZW5pRG9rbGFkdShyZXF1ZXN0KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLk9kc2NodmFsZW5pOlxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSB0aGF0LmlzbC5Sb3pEb2tsYWQub2RzY2h2YWxlbmlEb2tsYWR1KHJlcXVlc3QpLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuU3Rvcm5vOlxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSB0aGF0LmlzbC5Sb3pEb2tsYWQuc3Rvcm5vRG9rbGFkdShyZXF1ZXN0KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLkFrdGl2YWNlOlxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSB0aGF0LmlzbC5Sb3pEb2tsYWQub2RzdG9ybm92YW5pRG9rbGFkdShyZXF1ZXN0KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlZhbGlkYWNlOlxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSB0aGF0LmlzbC5Sb3pEb2tsYWQudmFsaWRhY2VEb2tsYWR1KHJlcXVlc3QpLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuT2R2YWxpZGFjZTpcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gdGhhdC5pc2wuUm96RG9rbGFkLm9kdmFsaWRhY2VEb2tsYWR1KHJlcXVlc3QpLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUmVhbGl6YWNlOlxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSB0aGF0LmlzbC5Sb3pEb2tsYWQucmVhbGl6YWNlRG9rbGFkdShyZXF1ZXN0KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlV6YXZyZW5pOlxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSB0aGF0LmlzbC5Sb3pEb2tsYWQudXphdnJlbmlEb2tsYWR1KHJlcXVlc3QpLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuVnJhY2VuaURvV2ZsOlxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSB0aGF0LmlzbC5Sb3pEb2tsYWQudnJhY2VuaURvV2ZsKHJlcXVlc3QpLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUHJlZGFuaTpcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gdGhhdC5pc2wuUm96RG9rbGFkLnByZWRhbmlEb2tsYWR1KHJlcXVlc3QpLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUHJldnpldGk6XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSA9IHRoYXQuaXNsLlJvekRva2xhZC5wcmV2emV0aURva2xhZHUocmVxdWVzdCkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5QcmVldmlkZW5jZTpcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gdGhhdC5pc2wuUm96RG9rbGFkLnByZWV2aWRlbmNlRG9rbGFkdShyZXF1ZXN0KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlByaWRlbGVuaTpcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gdGhhdC5pc2wuUm96RG9rbGFkLnByaWRlbGVuaURva2xhZHUocmVxdWVzdCkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5PZGVzbGFuaURvU1A6XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZSA9IHRoYXQuaXNsLlJvekRva2xhZC5vZGVzbGFuaURva2xhZHVEb0lpc3NwKHJlcXVlc3QpLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUG9yaXpvdmFjTm92eTpcclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gdGhhdC5pc2wuUm96RG9rbGFkWmFwaXMubm92eVJhZGVrKHJlcXVlc3QpLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUG9yaXpvdmFjVWxveml0OlxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSB0aGF0LmlzbC5Sb3pEb2tsYWRaYXBpcy51cHNlcnQocmVxdWVzdCkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAvL2Nhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR0VBa2NlRm9ybXVsYXJlLlBvcml6b3ZhY09wcmF2aXQ6XHJcbiAgICAgICAgICAgICAgICAvLyAgICBwcm9taXNlID0gdGhhdC5pc2wuUm96RG9rbGFkWmFwaXMub3ByYXZhUmFkZWsocmVxdWVzdCkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vIEFrY2UgcG9yaXpvdmFjZVxyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HRUFrY2VGb3JtdWxhcmUuUG9yaXpvdmFjT2RzdHJhbml0OlxyXG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSB0aGF0LmlzbC5Sb3pEb2tsYWRaYXBpcy56cnVzaXRSYWRlayhyZXF1ZXN0KS5nZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBacHJhY292YW5pIGNoeWJvdmUgb2Rwb3ZlZGkgemUgc2VydmVydVxyXG4gICAgICAgICAqIFRhdG8gbWV0b2RhIG5haHJhenVqZSBkdXBsaWNpdG5pIGtvZCB2IEdEZXRhaWxEb2tsYWR1VGFiLmlzbEFrY2UoKVxyXG4gICAgICAgICAqIEBwYXJhbSBlcnJvciBPZHBvdmVkIHplIHNlcnZlcnUgLSBpeHAgYSB0eXAgYWtjZVxyXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBBc3luY2hyb25uaSBtZXRvZGFcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHByb2Nlc3NFcnJvckZyb21TZXJ2ZXIoZXJyb3I6IGFueSwgcmVxdWVzdDogVWN0LkludGVyZmFjZS5HUm96RG9rbGFkSW5EdG8pOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgLy8gVcW+aXZhdGVsc2vDqSBjaHlieSAtIGplbiB6b2JyYXogenByYXZ1XHJcbiAgICAgICAgICAgIGlmICghKGVycm9yIGluc3RhbmNlb2YgR1NlcnZlckVycm9yKSAmJiBlcnJvciBpbnN0YW5jZW9mIEdFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgZXJyb3IuaGFuZGxlZCA9IHRydWU7IC8vIE5hc3RhdiBzaSBwcml6bmFrLCB6ZSBjaHliYSBieWxhIG9zZXRyZW5hXHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoeWJhIHZyYWNlbmEgemUgc2VydmVydVxyXG4gICAgICAgICAgICBpZiAoIWVycm9yLmRhdGEgfHwgIWVycm9yLmRhdGEuRGF0YUludmFsaWREZXRhaWxzKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZXhjOiBJR0V4Y2VwdGlvbkluZm8gPSBlcnJvci5kZXRhaWxzO1xyXG4gICAgICAgICAgICBleGMuaGFuZGxlZCA9IHRydWU7IC8vIE5hc3RhdiBzaSBwcml6bmFrLCB6ZSBjaHliYSBieWxhIG9zZXRyZW5hXHJcblxyXG4gICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAgICAgLy8gT3NldHJlbmkgY2h5YnkgXHJcbiAgICAgICAgICAgIC8vIEVycm9yIC0gem9icmF6IGRpYWxvZyBhIHZyYcWlIHJlc29sdmVkL3JlamVjdGVkIHBvZGxlIHbDvXNsZWRrdVxyXG4gICAgICAgICAgICBpZiAoZXhjIS5kYXRhIS5EYXRhSW52YWxpZERldGFpbHMuZXhjZXB0aW9uVHlwZSA9PSBVY3QuSW50ZXJmYWNlLkdFVHlweUNoeWIuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIC8vIE5lY2VrYW0gbmEgb2Rwb3ZlZCwgdXppdmF0ZWwgamkgemF2cmUga3JpemtlbVxyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKGV4Yy5iYXNlTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBWeXZvbGFtIHZ5amlta3UsIGFieSBjaGluIHBva3JhY292YWwgZG8gZmFpbGVkXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBleGM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAvLyBPc2V0cmVuaSBkb3RhenVcclxuICAgICAgICAgICAgLy8gUXVlc3Rpb24gLSBwb2tyYcSNdWogbmVibyB6YXN0YXZcclxuICAgICAgICAgICAgaWYgKGV4YyEuZGF0YSEuRGF0YUludmFsaWREZXRhaWxzLmV4Y2VwdGlvblR5cGUgPT0gVWN0LkludGVyZmFjZS5HRVR5cHlDaHliLnF1ZXN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXhjLmJhc2VNZXNzYWdlICsgXCJqcmVzOjMwMTUwMDczXCI7IC8vUkMgMzAxNTAwNzMgOiA7Q2hjZXRlIHBva3JhxI1vdmF0ID9cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuY29uZmlybShtZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKFwieWVzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0Lm1lbWJlciA9IGV4YyEuZGF0YSEubWVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LmFkZEluZm8gPSBleGMhLmRhdGEhLmFkZEluZm87XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZXhlY3V0ZUFjdGlvbkFmdGVyUXVlc3Rpb24odHlwQWtjZSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZXhlY3V0ZUFjdGlvbihyZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAvLyBab2JyYXplbmkgZm9ybXVsYXJlXHJcbiAgICAgICAgICAgIC8vIFNob3dGb3JtIC0gem9icmF6IGZvcm11bMOhxZkgYSBwb2tyYcSNdWpcclxuICAgICAgICAgICAgaWYgKGV4YyEuZGF0YSEuRGF0YUludmFsaWREZXRhaWxzLmV4Y2VwdGlvblR5cGUgPT0gVWN0LkludGVyZmFjZS5HRVR5cHlDaHliLnNob3dGb3JtKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0Lm1lbWJlciA9IGV4YyEuZGF0YSEubWVtYmVyO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5hZGRJbmZvID0gZXhjIS5kYXRhIS5hZGRJbmZvO1xyXG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy5leGVjdXRlQWN0aW9uQWZ0ZXJGb3JtKHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZXhlY3V0ZUFjdGlvbihyZXF1ZXN0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gWm9icmF6ZW5pIHNlc3RhdnkgYSB1a29uY2VuaSBkbGUgcGFyYW1ldHJ1XHJcbiAgICAgICAgICAgIGlmIChleGMhLmRhdGEhLkRhdGFJbnZhbGlkRGV0YWlscy5leGNlcHRpb25UeXBlID09IFVjdC5JbnRlcmZhY2UuR0VUeXB5Q2h5Yi5zaG93UmVwb3J0QW5kRXJyb3JcclxuICAgICAgICAgICAgICAgIHx8IGV4YyEuZGF0YSEuRGF0YUludmFsaWREZXRhaWxzLmV4Y2VwdGlvblR5cGUgPT0gVWN0LkludGVyZmFjZS5HRVR5cHlDaHliLnNob3dSZXBvcnRBbmRRdWVzdGlvbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGlhbG9ncy5jb25maXJtKGV4Yy5iYXNlTWVzc2FnZSArIFwiLlxcblwiICsgXCJqcmVzOjMwMjUwNDk5XCIpIC8vUkMgMzAyNTA0OTkgOiBDaGNldGUgem9icmF6aXQgc2VzdGF2dSA/XHJcbiAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoXCJ5ZXNcIilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlZmVycmVkID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tFcnJSZXBvcnRTY2h2YWxlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbWE6IFwicm96X3B0bV9kb2tlcnJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuUm96LldlYkNsaWVudC5HUHJpbnRQYXJhbWV0ZXJzOlNlcnZlclBhcmFtZXRlck1ldGhvZFBvZHRlY2VuaVJvenBvY3R1XCIsIC8vIE5hY3RlbmkgcGFyYW1ldHJ1IG5hIHNlcnZlcm92ZSBzdHJhbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiAocmVwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXAucGFyYW1zW1wiSVhQXCJdID0gdGhhdC5kb2tsYWQuaXhwITtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBUZW1hOiByZXAudGVtYSwgSXhwOiB0aGF0LmRva2xhZC5peHAhIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9nQ2xvc2VkOiAoZXYsIHIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJlcG9ydEZpbmlzaGVkKGV2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvLyBQb2t1ZCBqZSB2eXBsbmVubyBjaXNsbyBpeGJfbmV3IHYgaW5mcm1hY2kgemUgc2VzdGF2eSwgdGFrIG11c2ltIG9ibm92aXQgZGV0YWlsIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGlmKGUuUmVwb3J0LkNvbW1vbkluZm9zLkNvbnRhaW5zKFwiSVhCX05FV1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICYmIGUuUmVwb3J0LkNvbW1vbkluZm9zW1wiSVhCX05FV1wiXSAhPSBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgJiYgZS5SZXBvcnQuQ29tbW9uSW5mb3NbXCJJWEJfTkVXXCJdLlRvU3RyaW5nKCkuVHJpbSgpICE9IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIFJlbG9hZCgpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5ydW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGMhLmRhdGEhLkRhdGFJbnZhbGlkRGV0YWlscy5leGNlcHRpb25UeXBlID09IFVjdC5JbnRlcmZhY2UuR0VUeXB5Q2h5Yi5zaG93UmVwb3J0QW5kRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpYWxvZ3MuZXJyb3IoZXhjLmJhc2VNZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKFwib2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmNvbmZpcm0oZXhjLmJhc2VNZXNzYWdlICsgXCJqcmVzOjMwMTUwMDczXCIpIC8vUkMgMzAxNTAwNzMgOiA7Q2hjZXRlIHBva3JhxI1vdmF0ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZShcInllc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogWnByYWNvdmFuaSBvZHBvdmVkaSBwcm8gdWxvemVuaSBwb3Jpem92YWNlXHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL3ByaXZhdGUgaGFuZGxlUG9yaXpvdmFjVWxveml0UmVzcG9uc2UocmVzcG9uc2U6IGFueSk6IGFueSB7XHJcbiAgICAgICAgLy8gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgLy8gICAgY29uc3QgZG9rbGFkID0gdGhhdC5kb2tsYWQ7XHJcblxyXG4gICAgICAgIC8vICAgIGlmICghZG9rbGFkPy5oZWFkZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gICAgLy8gQWt0dWFsaXphY2UgZGF0IGRva2xhZHVcclxuICAgICAgICAvLyAgICBkb2tsYWQuaGVhZGVyLmRhdF96bWVuYSA9IHJlc3BvbnNlLmRhdGEuRGF0dW1abWVueTtcclxuICAgICAgICAvLyAgICBkb2tsYWQuaGVhZGVyLnN0YXZfZG9rbF90eHQgPSByZXNwb25zZS5kYXRhLlN0YXZUeHQ7XHJcbiAgICAgICAgLy8gICAgZG9rbGFkLmhlYWRlci5zX3phdSA9IHJlc3BvbnNlLmRhdGEuc196YXU7XHJcbiAgICAgICAgLy8gICAgZG9rbGFkLkFjdGlvblBlcm1pc3Npb25zID0gcmVzcG9uc2UuZGF0YS5BY3Rpb25QZXJtaXNzaW9ucztcclxuXHJcbiAgICAgICAgLy8gICAgLy8gVWtvbmNlbmkgZWRpdGFjZSByYWRrdVxyXG4gICAgICAgIC8vICAgIHRoYXQuZWRpdFJvd3MgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gICAgLy8gQWt0dWFsaXphY2UgcmFka3UgdiBwYW1ldGlcclxuICAgICAgICAvLyAgICBpZiAoZG9rbGFkLnJvd3MgJiYgcmVzcG9uc2UuZGF0YS5aYXBpcykge1xyXG4gICAgICAgIC8vICAgICAgICBkb2tsYWQucm93cy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBpZiAoaXRlbS5yYWRla196ID09IHJlc3BvbnNlLmRhdGEuWmFwaXMucmFkZWtfeikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oaXRlbSwgcmVzcG9uc2UuZGF0YS5aYXBpcyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgLy8vLyBQb2t1ZCBzZSB6bWVuaWwgc3RhdiBkb2tsYWR1XHJcbiAgICAgICAgLy8gICAgLy9pZiAocmVzcG9uc2UuZGF0YS5TdGF0ZUNoYW5nZWQpIHtcclxuICAgICAgICAvLyAgICAvLyAgICB0aGF0LnJlZnJlc2hDb250ZW50Py4oe1xyXG4gICAgICAgIC8vICAgIC8vICAgICAgICByZWxvYWREYXRhOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgbmFwbG5pdERhdGE6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgIC8vICAgICAgICBuYXN0YXZpdFByaXN0dXBub3N0UG9saTogdHJ1ZSxcclxuICAgICAgICAvLyAgICAvLyAgICAgICAgYWt0dWFsaXpvdmF0WmFwaXN5OiB0cnVlXHJcbiAgICAgICAgLy8gICAgLy8gICAgfSk7XHJcbiAgICAgICAgLy8gICAgLy99XHJcblxyXG4gICAgICAgIC8vICAgIC8vIEFrdHVhbGl6YWNlIHNlem5hbXVcclxuICAgICAgICAvLyAgICB0aGF0LnJlZnJlc2hTZXpuYW0/Lihkb2tsYWQuaXhwKTtcclxuXHJcbiAgICAgICAgLy8gICAgLy8gVnJhY2ltZSB6YXBpcyBwcm8gcG9yaXpvdmFjXHJcbiAgICAgICAgLy8gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEuWmFwaXM7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBBa2NlIGRldGFpbHVcclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiBPYm5vdmVuaSBzZXpuYW11IFxyXG4gICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIHJlZnJlc2hTZXpuYW0ocGlkRG9rbGFkdSk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1Nlem5hbUV4aXN0KCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlZnJlc2hSb3dzRnJvbURCKG51bGwsIFt7IGl4cDogcGlkRG9rbGFkdSB9XSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpqaXN0ZW5pLCB6ZGEgamUgbmFjdGVueSBzZXpuYW0sIGV4aXN0dWplIG1ldG9kYS4uXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGlzU2V6bmFtRXhpc3QoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgR29yZGljLlJvei5XZWJDbGllbnQucmVmcmVzaFJvd3NGcm9tREIgIT09IFwidW5kZWZpbmVkXCI7XHJcbiAgICAgICAgfSAgICBcclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogYWtjZVpydXNpdE9wcmF2dUhsYXZpY2t5RG9rbGFkdVxyXG4gICAgICAgIC8vICpcclxuICAgICAgICAvLyAqIEBwYXJhbSByZXF1ZXN0IHZzdHVwbmkgcGFyYW1ldHJ5IElTTCBtZXRvZHkgb2JzYWh1amljaSBpeHAsIGRhdHVtIHptZW55ICsgZGFsc2kgbW96bmUgcGFyYW1ldHJ5IHBybyBvcGFrb3Zhbmkgb3BlcmFjZSAtIHZpei4gcG9waXMgR1JvekRva2xhZEluRHRvXHJcbiAgICAgICAgLy8gKiAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBha2NlWnJ1c2l0T3ByYXZ1SGxhdmlja3lEb2tsYWR1KHJlcXVlc3Q6IFVjdC5JbnRlcmZhY2UuR1JvekRva2xhZEluRHRvKTogdm9pZCB7XHJcbiAgICAgICAgLy8gICAgLy8gUG91emUgem5vdnVuYWN0dSBkYXRhIGEgcHJlbmFzdGF2aW0gamVkbm90bGl2ZSBha2NlIG1lbnVtZW51XHJcbiAgICAgICAgLy8gICAgdGhpcy5sb2FkKHsgaXhwOiByZXF1ZXN0Lml4cCwgYWN0aW9uOiByZXF1ZXN0LmFjdGlvbiB9KTtcclxuICAgICAgICAvL31cclxuXHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaXNrIGNoeWJvdmUgc2VzdGF2eSB2IHByaXBhZGUgcG9kdGVjZW5pIHJvenBvY3R1IFxyXG4gICAgICAgICAqIEBwYXJhbSBpeHAgcGlkIGRva2xhZHVcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgdGlza1JlcG9ydHVTY2h2YWxlbmkoaXhwOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza0VyclJlcG9ydFNjaHZhbGVuaVwiLCAgLy9uYXpldiBha2NlXHJcbiAgICAgICAgICAgICAgICB0ZW1hOiBcInJvel9wdG1fZG9rZXJyXCIsICAgIC8vbmF6ZXYgdGVtYXR1XHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLlJvei5XZWJDbGllbnQuR1ByaW50UGFyYW1ldGVyczpTZXJ2ZXJQYXJhbWV0ZXJNZXRob2RUaXNreU5hU2V6bmFtdVwiLCAvLyBOYWN0ZW5pIHBhcmFtZXRydSBuYSBzZXJ2ZXJvdmUgc3RyYW5lXHJcbiAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7IFRlbWE6IHJlcC50ZW1hLCBJeHA6IGl4cCB9O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHJlcG9ydEZpbmlzaGVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnJ1bigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSmVkbmEgc2UgZG9rbGFkIG8gcHJpc2xpYlxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBpc1ByaXNsaWIoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRva2xhZC5oZWFkZXI/Lmt0Z190eXAhID4gMTEzNCAmJiB0aGlzLmRva2xhZC5oZWFkZXI/Lmt0Z190eXAhIDwgMTEzOTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogYWtjZVBvcml6b3ZhY05vdnlcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIFphdm9sYW5pIGFrY2Ugbm92eSByYWRlayBuYSBwb3Jpem92YWNpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGFrY2VQb3Jpem92YWNOb3Z5KC8qcmVxdWVzdDogVWN0LkludGVyZmFjZS5HUm96RG9rbGFkSW5EdG8qLyk6IEpRdWVyeVByb21pc2U8R29yZGljLlVjdC5JbnRlcmZhY2UuR1JvemRwZXBEdG8+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5kb2tsYWQuSXNNdXNpTmF2YXphdCkge1xyXG4gICAgICAgICAgICAgICAgLy8gem9icmF6ZW5pIGZvcm11bGFyZSB6YXBpc3VcclxuICAgICAgICAgICAgICAgIHRoaXMuVmF6YnlEb2tsYWR1KClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdC5uZXdMaW5rICYmIHJlc3VsdC5uZXdMaW5rKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi50aGVuKCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBLb250cm9sdWppLCB6ZGEgc2UgamVkbmEgbyBwcmlzbGliXHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5pc1ByaXNsaWIoKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkdvcmRpYy5Sb3ouV2ViQ2xpZW50LkdSb3pHZW5lcnVqUHJpc2xpYlwiLCAvLyBuYXpldiBva25hIGRldGFpbHUgKGMjIG5lYm8gdHMgPylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWQ6IFwiR1JvekdlbmVydWpQcmlzbGliI1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ6ZHkgc2Ugdnl0dm9yaSBub3ZlIEdQQyBzIGtvbmtyZXRuaSBrbmlob3UuIFRqLiBpIGtkeXogamUgcG9obGVkIHByZXMgdnNlY2hueSBrbmloeSwgdGFrIHByaSB6b2JyYXplbmkgZGV0YWlsdSBzdG9qaW0gdiBrbml6ZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQb2RhbmkgdGVkeSBwcm9iaWhhIGRvIGtuaXp5LCB6ZSBrdGVyZSBqZSB6b2JyYXplbnkgZGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3BjOiBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGModGhhdC5ncGMsIHRoYXQuZG9rbGFkLmhlYWRlcj8uaXhwX2RlbiEpLCAvLyBHUEMgcyBrbmlob3UgeiBha3R1w6FsbsOtaG8gesOhem5hbXVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva2xhZEhlYWQ6IHRoYXQuZG9rbGFkLmhlYWRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWN0aW9uOiBhY3Rpb24sIC8vIE5hY3RlbmkgZXhpc3R1amljaWhvIGRldGFpbHUgKHJlYWQpIG5lYm8gcG9kYW5pIG5vdmVobyBkb2tsYWR1IChwb2RhbmkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uIChyZXM6IGFueSwgcmVzdWx0LCBhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ICE9PSBcInVuZGVmaW5lZFwiICYmIHJlc3VsdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlJlZnJlc2hEZXRhaWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChyZXMucmV0dXJuVmFsdWUgJiYgcmVzLnJldHVyblZhbHVlLnJlZnJlc2ggPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vIG5hY3RlbmkgYWt0dWFsaXpvdmFuZWhvIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vR29yZGljLlVjdC5XZWJDbGllbnQuU2V6bmFtLlJlbG9hZFJvd0Zyb21EQihjb250ZW50LCByZXMucmV0dXJuVmFsdWUuaXhwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vbGV0IGRva2xhZDogSW50ZXJmYWNlLkdVY3RTZXpuYW1Eb2tsYWR1RHRvW10gPSBbeyBpeHA6IHJlcy5yZXR1cm5WYWx1ZS5peHAgfV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBHb3JkaWMuVWN0LldlYkNsaWVudC5TZXpuYW0ucmVmcmVzaFJvd3NGcm9tREIoY29udGVudCBhcyBhbnksIFt7IGl4cDogcmVzLnJldHVyblZhbHVlLml4cCB9XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyBuYXN0YXZlbmkgYWt0aXZuaWhvIHJhZGt1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyBHb3JkaWMuVWN0LldlYkNsaWVudC5TZXpuYW0uUmVmcmVzaFNlem5hbXUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdjbG9zZWQnLCAoZXYsIGN0eCwgYSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcy5QcmVwbG5lbmlOU1ZaYXBpc2VjaFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQudHlwUG9yaXpvdmFjZSAhPT0gR1JvelR5cFBvcml6b3ZhY2UuVkxaUikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGJ1ZGUgc2UgbXVzZXQgdXByYXZpdFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhZGVrOiBVY3QuSW50ZXJmYWNlLkdSb3pkcGVwRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWM6IHRoYXQuZG9rbGFkLmhlYWRlcj8ubGljLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoYXQuZG9rbGFkLmhlYWRlcj8uaWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IHRoYXQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcz8uVXJjZW5pUmV6aW11VWN0b3ZhbmlEbGVLYXRlZ29yaWVEb2tsYWR1ID8gdGhpcy5kb2tsYWQuaGVhZGVyPy51Y3MgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBua3M6IHRoaXMuZG9rbGFkLmhlYWRlcj8ubmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1dXM6IHRoaXMuZG9rbGFkLmhlYWRlcj8udXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2s6IHRoaXMuZG9rbGFkLmhlYWRlcj8ucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmQ6IHRoaXMuZG9rbGFkLmhlYWRlcj8uZHJkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhYzogdGhpcy5kb2tsYWQuaGVhZGVyPy5hYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGlzLml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBfc3RhdjogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFkZWtfejogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX2FnOiA1MCxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PT0gbnVsbCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZHJvd2VkaXRvcihcImFkZFJvd1wiLCByYWRlayk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHJhZGVrKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5Sb3pEb2tsYWRaYXBpcy5ub3Z5UmFkZWsoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHRoYXQuZG9rbGFkLmhlYWRlcj8uaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRfem1lbmE6IHRoYXQuZG9rbGFkLmhlYWRlcj8uZGF0X3ptZW5hLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5Qb3Jpem92YWNOb3Z5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlBvaGxlZFByZXNLbmloeVwiOiAoRWtvLlV0aWxzLmdldEVrb0Jvb2tWYXJpYW50KHRoYXQpID09PSBFa28uSW50ZXJmYWNlLkdFa29Cb29rVmFyaWFudC5PbmUpID8gMCA6IDEgLy8gemFwbnV0eSBwb2hsZWQgcHJlcyB2c2VjaG55IGtuaWh5KDAgLSBuZSwgMSAtIGFubylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gYXMgVWN0LkludGVyZmFjZS5HUm96RG9rbGFkSW5EdG8pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT09IG51bGwpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZHJvd2VkaXRvcihcImFkZFJvd1wiLCByZXN1bHQucmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2dyaWQuZ2dyaWRyb3dlZGl0b3IoXCJhZGRSb3dcIiwgcmFkZWspO1xyXG4gICAgICAgICAgICAgICAgLy8vL3RoYXQuU2V0RW5hYmxlQWN0aW9ucyh0aGF0LmRva2xhZC5BY3Rpb25QZXJtaXNzaW9ucyEpO1xyXG4gICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmLnJlc29sdmUocmFkZWspLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICk7XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY2kgb2JqZWt0IGdyaWR1XHJcbiAgICAgICAgICogQHBhcmFtIGNvbnRlbnRcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRHcmlkKCk6IEpRdWVyeTxIVE1MRWxlbWVudD4gfCBudWxsIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmVsZW1lbnQuZmluZChcIi5nZ3JpZC5qcy1Sb3pQb3Jpem92YWNHcmlkXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGRhdGEubGVuZ3RoID09IDAgPyBudWxsIGFzIGFueSA6IGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjaSBvYmpla3QgZ3JpZHVcclxuICAgICAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldEdyaWRJSygpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHwgbnVsbCB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5lbGVtZW50LmZpbmQoXCIuZ2dyaWQuanMtUm96U3RydWt0dXJhSUtHcmlkXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGRhdGEubGVuZ3RoID09IDAgPyBudWxsIGFzIGFueSA6IGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjaSBvYmpla3QgZ3JpZHVcclxuICAgICAgICAgKiBAcGFyYW0gY29udGVudFxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldEdyaWRVa2F6YXRlbGUoKTogSlF1ZXJ5PEhUTUxFbGVtZW50PiB8IG51bGwge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZWxlbWVudC5maW5kKFwiLmdncmlkLmpzLVJvelVrYXphdGVsZUdyaWRcIik7XHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0YS5sZW5ndGggPT0gMCA/IG51bGwgYXMgYW55IDogZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNwdXN0ZW5pIHByZWRrb250YWNlXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBTdGFydFByZWRrb250YWNlKCkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5uZXdSb3dTdGFydCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KEdvcmRpYy5Fa28uV2ViQ2xpZW50LkdWeWJlclByZWRrb250YWNlLCB7fSwgXCJqcmVzOjMwMjUwNDEzXCIsIDgwMCwgNjAwLCB0cnVlKSAvL1JDIDMwMjUwNDEzIDogVsO9YsSbciBwxZllZGtvbnRhY8OtXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3R4ICE9IG51bGwgJiYgdHlwZW9mIGN0eC5zZWxlY3RlZCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjdHguc2VsZWN0ZWQgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0dvcmRpYy5Fa28uSW50ZXJmYWNlLkdVY3RSb3pka29uRHRvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ciA9IHsgaXhzX2tvbjogY3R4LnNlbGVjdGVkIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuSXNsLkVrb1ByZWtvbnRhY2VTYWJsb25hUmFkZWsubGlzdCh7IHJxOiB7IGZpbHRlcnM6IGZpbHRyIH0sIHR5cEFnOiA1MCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5SUyA9IHRoYXQubmV3Um93U3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uZXdSb3dTdGFydCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJlRmlsbEluUHJvZ3Jlc3MgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcnVsZXM6IEdvcmRpYy5XaWRnZXQuR01hZ2ljUHJlRmlsbGVyLlByZWZpbGxlclJ1bGVbXSA9IEdvcmRpYy5XaWRnZXQuR01hZ2ljUHJlRmlsbGVyLkdNYWdpY1ByZUZpbGxlci5nZXREYXRhV29yZHNDb2x1bW5zKGdyaWQuZ2dyaWQoXCJvcHRpb25cIiwgXCJjb2x1bW5zXCIpKTs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGVzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogXCJua3NcIiwgdHlwZTogR29yZGljLldpZGdldC5HTWFnaWNQcmVGaWxsZXIuUnVsZVR5cGUudG9wb2xvZ3ksIGRhdGFFeHRlbmQ6ICh2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBua3M6IHZhbCwgaWNvOiB0aGF0Lmdsb2JhbHMuRWtvUGFyYW1zPy5JY28gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IFwiYzBcIiwgdHlwZTogR29yZGljLldpZGdldC5HTWFnaWNQcmVGaWxsZXIuUnVsZVR5cGUuZmluYW5jaWFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogXCJjMVwiLCB0eXBlOiBHb3JkaWMuV2lkZ2V0LkdNYWdpY1ByZUZpbGxlci5SdWxlVHlwZS5maW5hbmNpYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBcInNtbG91dmFcIiwgdHlwZTogR29yZGljLldpZGdldC5HTWFnaWNQcmVGaWxsZXIuUnVsZVR5cGUub3RoZXIsIGZpZWxkOiBcInNtbG91dmFcIiwgdGVtcGxhdGVOYW1lOiBcInNtbF90XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBcInBvcGlzXCIsIHR5cGU6IEdvcmRpYy5XaWRnZXQuR01hZ2ljUHJlRmlsbGVyLlJ1bGVUeXBlLm90aGVyLCBmaWVsZDogXCJwb3Bpc1wiLCB0ZW1wbGF0ZU5hbWU6IFwibmF6X3RcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlNldEVuYWJsZUFjdGlvbnModGhhdC5kb2tsYWQuQWN0aW9uUGVybWlzc2lvbnMhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkLmdtYWdpY3ByZWZpbGxlcihcInVzZVRlbXBsYXRlc1wiLCByZXN1bHQuZGF0YSwgcnVsZXMpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5ld1Jvd1N0YXJ0ID0gblJTOyByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKCkgPT4geyB0aGF0Lm5ld1Jvd1N0YXJ0ID0gZmFsc2U7IH0pLmFsd2F5cygoKSA9PiB7IHRoYXQucHJlRmlsbEluUHJvZ3Jlc3MgPSBmYWxzZTsgdGhhdC5TZXRFbmFibGVBY3Rpb25zKHRoYXQuZG9rbGFkLkFjdGlvblBlcm1pc3Npb25zISk7IH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2RzdHJhbmVuaSB6YXBpc3VcclxuICAgICAgICAgKiBAcmV0dXJucyBQcm9taXN5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBPZHN0cmFuaXRaYXBpc3koKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBWeXR2b3Igc2kgYXN5bmNocm9ubmkgb2JqZWt0XHJcbiAgICAgICAgICAgIGNvbnN0IGRlZmVycmVkID0gJC5EZWZlcnJlZDtcclxuXHJcbiAgICAgICAgICAgIC8vIE5hY3RpIHNpIHZ5YnJhbmUgcmFka3lcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkUm93cyA9IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93cyh0aGF0LiRwb3Jpem92YWMpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGE6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSb3paYXBpc1JlcXVlc3REdG8gPSB7XHJcbiAgICAgICAgICAgICAgICBaYXBpc3k6IEdvcmRpYy5Fa28uR3JpZC5jaGVja2VkUm93cyh0aGF0LmdldEdyaWQoKSlcclxuICAgICAgICAgICAgICAgICwgc196YXU6IHRoYXQuZG9rbGFkLmhlYWRlcj8uc196YXVcclxuICAgICAgICAgICAgICAgICwgaXhwOiB0aGF0LmRva2xhZC5peHBcclxuICAgICAgICAgICAgICAgICwgZGF0X3ptZW5hOiB0aGF0LmRva2xhZC5oZWFkZXIhLmRhdF96bWVuYVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5aYXBpc3khLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwMzcxXCIgLy9SQyAzMDI1MDM3MSA6IEluZm9cclxuICAgICAgICAgICAgICAgICAgICAsIFwianJlczozMDI1MDM3MlwiIC8vUkMgMzAyNTAzNzIgOiBOZXZ5YnLDoW55IMW+w6FkbsOpIHrDoXBpc3lcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGRvdGF6ID0gXCJqcmVzOjMwMjUwMzU3XCI7IC8vUkMgMzAyNTAzNTcgOiBCdWRlIG9kc3RyYW7Em24gxZnDoWRlayBzIMSNw61zbGVtIDEuIE9wcmF2ZHUgY2hjZXRlIHBva3JhxI1vdmF0ID9cclxuICAgICAgICAgICAgaWYgKGRhdGEuWmFwaXN5IS5sZW5ndGggPiAxKVxyXG4gICAgICAgICAgICAgICAgZG90YXogPSBcImpyZXM6MzAyNTAzNThcIi5mb3JtYXQoZGF0YS5aYXBpc3khLmxlbmd0aCk7IC8vUkMgMzAyNTAzNTggOiBCdWRvdSBvZHN0cmFuxJtueSDFmcOhZGt5IHYgcG/EjXR1IHswfS4gT3ByYXZkdSBjaGNldGUgcG9rcmHEjW92YXQgP1xyXG4gICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkRvdGF6KHRoaXMsIGRvdGF6KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT09IFwiWUVTXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczozMDI1MDM1OVwiKTsgLy9SQyAzMDI1MDM1OSA6IFByb2LDrWjDoSBtYXrDoW7DrSB6w6FwaXPFr1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmU6IGRvY2FzbmUgcHJvIG1vem5vc3QgcHJla2xhZHUgODRcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuUm96RG9rbGFkWmFwaXMuaHJvbWFkbmVPZHN0cmFuaXQoZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmNsb3NlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9rICAtIGtvbmVjXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9jZXQgem1lbmVueSByYWRrdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZGF0YS5TdGF0ZUNoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJlYmVydSBob2Rub3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZG9rbGFkLmhlYWRlciEuZGF0X3ptZW5hID0gcmVzdWx0LmRhdGEuRGF0dW1abWVueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb250ZW50LlVjZXRuaURva2xhZER0by5TdGF2RG9rbGFkdSA9IHJlc3VsdC5kYXRhLlN0YXZEb2tsYWR1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRva2xhZC5oZWFkZXIhLnN0YXZfZG9rbF90eHQgPSByZXN1bHQuZGF0YS5TdGF2VHh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRva2xhZC5oZWFkZXIhLnNfemF1ID0gcmVzdWx0LmRhdGEuc196YXU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZG9rbGFkLkFjdGlvblBlcm1pc3Npb25zID0gcmVzdWx0LmRhdGEuQWN0aW9uUGVybWlzc2lvbnM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVkaXRSb3dzID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlJlZnJlc2hBZnRlckFjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBzZXpuYW11IGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZWZyZXNoU2V6bmFtKHRoYXQuZG9rbGFkIS5peHApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3JlZnJlc2hSb3dzRnJvbURCKG51bGwsIFt7IGl4cDogdGhhdC5kb2tsYWQhLml4cCB9XSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kYXRhLlphcGlzeSAmJiByZXN1bHQuZGF0YS5Qb2NldE92bGl2bmVueWNoUmFka3UhID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRva2xhZC5yb3dzID0gcmVzdWx0LmRhdGEuWmFwaXN5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXlHcmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChteUdyaWQgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyh0aGF0LmRva2xhZC5yb3dzIGFzIGFueSwgeyBrZXk6IFwiaXhwLHJhZGVrX3pcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXlHcmlkLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrdHVsYWl6YWNlIGRldGFpbHUgcHJvIHVrb25jZW5pIGFrY2VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dVY3REZXRhaWx9IGNvbnRlbnRcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBSZWZyZXNoQWZ0ZXJBY3Rpb24oYWt0dWFsaXpvdmF0WmFwaXN5OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgICAgICAgICAvL2lmIChha3R1YWxpem92YXRaYXBpc3kpXHJcbiAgICAgICAgICAgIC8vICAgIEFrdHVhbGl6YWNlWmFwaXN1KGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAvL1JlZnJlc2hNZW51KGNvbnRlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLlNldEVuYWJsZUFjdGlvbnModGhpcy5kb2tsYWQuQWN0aW9uUGVybWlzc2lvbnMhKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0dXNCYXIoKTsgLy8gWm9icmF6IG5henZ5IHN0YXZ1IHZlIHN0YXR1cyBiYXJ1XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogYWtjZVBvcml6b3ZhY09wcmF2aXRcclxuICAgICAgICAvLyAqXHJcbiAgICAgICAgLy8gKiBaYXZvbGFuaSBha2NlIG9wcmF2YSByYWRrdSBuYSBwb3Jpem92YWNpXHJcbiAgICAgICAgLy8gKiBcclxuICAgICAgICAvLyAqIEBwYXJhbSByZXF1ZXN0IHZzdHVwbmkgcGFyYW1ldHJ5IElTTCBtZXRvZHkgb2JzYWh1amljaSBpeHAsIGRhdHVtIHptZW55ICsgZGFsc2kgbW96bmUgcGFyYW1ldHJ5IHBybyBvcGFrb3Zhbmkgb3BlcmFjZSAtIHZpei4gcG9waXMgR1JvekRva2xhZEluRHRvXHJcbiAgICAgICAgLy8gKiAqL1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgYWtjZVBvcml6b3ZhY09wcmF2aXQocmVxdWVzdDogVWN0LkludGVyZmFjZS5HUm96RG9rbGFkSW5EdG8pOiB2b2lkIHtcclxuICAgICAgICAvLyAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyAgICB0aGF0Lm5ld1Jvd1N0YXJ0ID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgY29uc3QgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgIC8vICAgIGlmIChncmlkID09PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgLy8gICAgdmFyIG96bmFjZW5lUmFka3kgPSBHb3JkaWMuRWtvLkdyaWQuY2hlY2tlZFJvd3M8VWN0LkludGVyZmFjZS5HUm96ZHBlcER0bz4oZ3JpZCk7XHJcbiAgICAgICAgLy8gICAgaWYgKCFvem5hY2VuZVJhZGt5IHx8IG96bmFjZW5lUmFka3kubGVuZ3RoID09IDApIHtcclxuICAgICAgICAvLyAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJqcmVzOjMwMjUwNDM2XCIgLy9SQyAzMDI1MDQzNiA6IEluZm9cclxuICAgICAgICAvLyAgICAgICAgICAgICwgXCJqcmVzOjMwMjUwNDM3XCIpIC8vUkMgMzAyNTA0MzcgOiBOZW5hbGV6ZW4gxZnDoWRlayBrIGVkaXRhY2lcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAvLyBkb2hsZWRhbmkgcm96dnJodVxyXG4gICAgICAgIC8vICAgIC8vb3puYWNlbmVSYWRreVswXVtcIml4c19yb3pcIl0gPSB0aGF0LmdldElkUm96dnJodShvem5hY2VuZVJhZGt5WzBdLnJvayEsIG96bmFjZW5lUmFka3lbMF0ubmtzISwgb3puYWNlbmVSYWRreVswXS51Y3MhKTsvLyBcIkRFTU9VUjAwQTNFMVwiO1xyXG4gICAgICAgIC8vICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAvLyAgICBncmlkLmdncmlkcm93ZWRpdG9yKFwic3RhcnRcIik7XHJcbiAgICAgICAgLy8gICAgLypcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZSA9IHRoYXQuaXNsLlJvekRva2xhZC5wb3Jpem92YWNPcHJhdmEocmVxdWVzdCkuZ2V0KCkgLy8gWmF2b2xhbSBtZXRvZHUgZ2V0IGEgdGEgbWkgdnJhY2kgc2xpYlxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyAwNS4wOS4yMiBLSyAtIG5lYnVkdSB6bm92dSBuYWNpdGF2YXQgdnNlY2huYSBkYXRhLCBhbGUgcG91emUgc2kgbmFjdHUgZGF0YSBub3ZlaG8gcmFka3UgYSBwZXJtaXNzaW9uc1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLy50aGVuKCAvLyBaZGUgenByYWN1amkgcG91emUga2xhZG55IHZ5c2xlZGVrLiBjaHlidSB6cHJhY3VqaSBheiBuYSBrb25jaSBhIHByb2dyZXNzIHZ1YmVjIG5lcG91eml2YW1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gICAgKHJlc3BvbnNlKSA9PiB7IC8vIGRvbmVcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiB0aGF0LmxvYWQoeyBpeHA6IHJlc3BvbnNlLmRhdGEuaXhwLCBhY3Rpb246IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFQWtjZUZvcm11bGFyZS5Qb3Jpem92YWNOb3Z5IH0pIC8vIFZyYWNpIG1pIGppbnkgcHJvbWlzZVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC50aGVuKCgpID0+IHJlc3BvbnNlKTsgLy8gcG8gbmFjdGVuaSBkYXQgcG9tb2NpIGxvYWQgcG9zaWxhbSBkYWwgZGF0YSBub3ZlaG8gcmFka3VcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvLylcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLnRoZW4oXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAocmVzcG9uc2UpID0+IHsgLy8gZG9uZVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJHBvcml6b3ZhYy5nZ3JpZHJvd2VkaXRvcihcInN0YXJ0XCIpOyAvLyBEb3BsbmltIG5hY3RlbmEgZGF0YSBkbyBwb3Jpem92YWNlLiBcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LlNldEVuYWJsZUFjdGlvbnMocmVzcG9uc2UuZGF0YS5hY3Rpb25QZXJtaXNzaW9ucyEpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIChleGM6IGFueSkgPT4geyAgLy8gZmFpbCAtIHpkZSBzZSBidWRlIHZyYWNldCBJR0V4Y2VwdGlvbkluZm9cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGV4YyAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4Yy5oYW5kbGVkID0gdHJ1ZTsgLy8gTmFzdGF2IHNpIHByaXpuYWssIHplIGNoeWJhIGJ5bGEgb3NldHJlbmFcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4Yy5iYXNlVHlwZSAhPSBcIkdvcmRpYy5HZW5lcmFsLkdEYXRhSW52YWxpZEV4Y2VwdGlvblwiXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBleGMuZGF0YS5EYXRhSW52YWxpZERldGFpbHMuZXhjZXB0aW9uVHlwZSA9PSBVY3QuSW50ZXJmYWNlLkdFVHlweUNoeWIuZXJyb3IpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7IC8vIHNtYXogaW5mb3JtYWNuaSBobGFza3VcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihleGMuYmFzZU1lc3NhZ2UpOyAvLyBab2JyYXogZGlhbG9nIGEgdWtvbmNpIGNpbm5vc3RcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4Yy5kYXRhLkRhdGFJbnZhbGlkRGV0YWlscy5leGNlcHRpb25UeXBlID09IFVjdC5JbnRlcmZhY2UuR0VUeXB5Q2h5Yi5xdWVzdGlvbikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhjLmJhc2VNZXNzYWdlICs9IFwianJlczozMDE1MDA3M1wiOyAvL1JDIDMwMTUwMDczIDogO0NoY2V0ZSBwb2tyYcSNb3ZhdCA/XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShleGMuYmFzZU1lc3NhZ2UpLmNyZWF0ZURpYWxvZ1Byb21pc2UoXCJ5ZXNcIikudGhlbihmdW5jdGlvbiAoKSB7IC8vIFpvYnJhemltIGRvdGF1XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5tZW1iZXIgPSBleGMuZGF0YS5tZW1iZXI7IC8vIFVsb3ppbSBzaSBjaHlib3Z5IGtvZFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3QuYWRkSW5mbyA9IGV4Yy5kYXRhLmFkZEluZm87XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ha2NlUG9yaXpvdmFjT3ByYXZpdChyZXF1ZXN0KTsgLy8gVm9sYW0gcmVrdXJ6aXZuZSBwb2RhbmkgZG9rbGFkdSBzZSB6bWVuZW55bSByZXF1ZXN0ZW1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBab2JyYXppbSBrb2xlY2tvIG5hIGFrY2lcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnNbQWN0aW9ucy5Qb3Jpem92YWNOb3Z5XT8uc2V0UGVuZGluZyhwcm9taXNlKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFZ5dHZvcmVuaSBwcmVka29udGFjZSB6ZSB6YXBpc3VcclxuICAgICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgICAgKiBAcGFyYW0gdnNlY2hueVJhZGt5XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIFByZWRrb250YWNlWmVaYXBpc3UodnNlY2hueVJhZGt5OiBib29sZWFuID0gdHJ1ZSk6IGFueSB7XHJcbiAgICAgICAgICAgIHZhciByb3dzRHRvO1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRSb3dzRHRvO1xyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKHZzZWNobnlSYWRreSkge1xyXG4gICAgICAgICAgICAgICAgcm93c0R0byA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5HZXRBbGxSb3dzKGdyaWQpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRSb3dzRHRvID0gcm93c0R0bztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJvd3NEdG8gPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uR2V0QWxsUm93cyhncmlkKTsvL0dvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5Pem5hY2VuZVJhZGt5KGNvbnRlbnQuR2V0R3JpZCh0aGF0KSk7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFJvd3NEdG8gPSBHb3JkaWMuRWtvLkdyaWQuY2hlY2tlZFJvd3ModGhpcy5nZXRHcmlkKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlKFwiR29yZGljLkVrby5XZWJDbGllbnQuR0RldGFpbFByZWRrb250YWNlXCIsIHtcclxuICAgICAgICAgICAgICAgIEl4cDogbnVsbFxyXG4gICAgICAgICAgICAgICAgLCBpZDogXCJ4eHhEZXRhaWxQcmVka29udGFjZVwiXHJcbiAgICAgICAgICAgICAgICAsIE1vZGVEZXRhaWw6IEdvcmRpYy5Fa28uV2ViQ2xpZW50LlVjdFJvei5FbnVtcy5Nb2RlRGV0YWlsLlByZXZvZFphcGlzdVxyXG4gICAgICAgICAgICAgICAgLCBTb3VyY2VSZWNvcmRzOiByb3dzRHRvXHJcbiAgICAgICAgICAgICAgICAsIFNlbGVjdGVkUmVjb3Jkczogc2VsZWN0ZWRSb3dzRHRvXHJcbiAgICAgICAgICAgICAgICAsIFR5cEFnOiA1MFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKHJlczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyEucmV0dXJuVmFsdWUgJiYgcmVzIS5yZXR1cm5WYWx1ZS5yZWZyZXNoID09PSB0cnVlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQucmVsb2FkKHRoYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhyb21hZG5lIG9wZXJhY2UgaW1wb3J0XHJcbiAgICAgICAgICogIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgSHJvbWFkbmVPcGVyYWNlUmFka3kodHlwT3BlcmFjZTogXCJJTVBDTElQXCIgfCBcIklNUEZJTEVcIik6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IG9wZXJhY2U6IHN0cmluZztcclxuICAgICAgICAgICAgbGV0IGdyaWRmb3JtYXQ6IGFueSA9IG51bGw7XHJcbiAgICAgICAgICAgIGxldCB0aXRsZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodHlwT3BlcmFjZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJJTVBGSUxFXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW1wb3J0IHplIHNvdWJvcnVcclxuICAgICAgICAgICAgICAgICAgICBncmlkZm9ybWF0ID0gdGhpcy5jcmVhdGVHcmlkRm9ybWF0UG9yaXpvdmFjKHRoYXQudHlwUG9yaXpvdmFjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlcmFjZSA9IFwiR1Jvek9wZXJhY2VJbXBvcnRcIjsvL0ZpbGVcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZSA9IFwianJlczozMDI1MDQwOFwiOyAvL1JDIDMwMjUwNDA4IDogSW1wb3J0IHrDoXBpc8WvIHplIHNvdWJvcnVcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJJTVBDTElQXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW1wb3J0IHplIHNjaHJhbmt5XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlcmFjZSA9IFwiR1Jvek9wZXJhY2VJbXBvcnRcIjsvL0NsaXBib2FyZFxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRmb3JtYXQgPSB0aGlzLmNyZWF0ZUdyaWRGb3JtYXRQb3Jpem92YWModGhhdC50eXBQb3Jpem92YWNlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZSA9IFwianJlczozMDI1MDQwOVwiOyAvL1JDIDMwMjUwNDA5IDogSW1wb3J0IHrDoXBpc8WvIHplIHNjaHLDoW5reVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRpYWxvZ3MuYWxlcnQoXCJqcmVzOjMwMjUwMzk1XCIsIC8vUkMgMzAyNTAzOTUgOiBVcG96b3JuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBcImpyZXM6MzAyNTAzOTZcIik7ICAvL1JDIDMwMjUwMzk2IDogTmV6bsOhbcOhIG9wZXJhY2VcclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR0Vycm9yKFwianJlczozMDI1MDM5NlwiKTtcclxuICAgICAgICAgICAgICAgIC8vYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy90aGlzLm5hdmlnYXRlKFwiR29yZGljLlJvei5XZWJDbGllbnQuXCIgKyBvcGVyYWNlLFxyXG4gICAgICAgICAgICAvLyAgICAvL3sgdHlwZTogdHlwT3BlcmFjZSwgaXhwOiB0aGlzLml4cCwgZ3JkRm9ybWF0OiBncmlkZm9ybWF0LCBkYXRabWVueTogdGhpcy5kb2tsYWQuaGVhZGVyPy5kYXRfem1lbmEgfSlcclxuICAgICAgICAgICAgLy8gICAgeyBpZDogXCJHUm96SW1wb3J0WmFwaXN5XCIsIElEOiBcIkdSb3pJbXBvcnRaYXBpc3kjXCIsIHRpdGxlOiB0aXRsZSwgdHlwZTogdHlwT3BlcmFjZSwgaXhwOiB0aGlzLml4cCwgZ3JkRm9ybWF0OiBncmlkZm9ybWF0LCBkYXRabWVueTogdGhpcy5kb2tsYWQuaGVhZGVyPy5kYXRfem1lbmEsIHR5cFBvcml6b3ZhY2U6IHRoYXQudHlwUG9yaXpvdmFjZSwgaXNSZXplcnZ1amVWSUlTU1A6IHRoYXQuaXNSZXplcnZ1amVWSUlTU1AgfSlcclxuICAgICAgICAgICAgLy8gICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGNudERpdjogYW55LCBwYXIpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGlmICh0eXBlb2YgY250RGl2ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjbnREaXYuY29udGVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY250RGl2LmNvbnRlbnQuc3VjY2Vzc0Nsb3NlID09PSBcImJvb2xlYW5cIiAmJiBjbnREaXYuY29udGVudC5zdWNjZXNzQ2xvc2UgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyB6bm92dW5hY3RlbmkgZG9rbGFkdVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuUmVmcmVzaERldGFpbCgpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHsgdGhhdC5Td2l0Y2hUb1JlY29yZHMoKTsgcmV0dXJuOyB9KTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL1JlbG9hZERva2xhZChjb250ZW50KTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgICAgIC8vZGVmLnJlc29sdmUoY29udGVudCwgcGFyKTtcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvLyAgICApO1xyXG4gICAgICAgICAgICAvL3JldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gRUtPVXRpbHMuY2FsbE90aGVyQ29udGVudCh0aGlzLCBvcGVyYWNlLCBcIlJvelwiLFxyXG4gICAgICAgICAgICAgICAgKGNudERpdiwgY29udGVudFBydXZvZGNlOiBHUHJ1dm9kY2VPcGVyYWNlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY250RGl2ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjbnREaXYuY29udGVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY250RGl2LmNvbnRlbnQuc3VjY2Vzc0Nsb3NlID09PSBcImJvb2xlYW5cIiAmJiBjbnREaXYuY29udGVudC5zdWNjZXNzQ2xvc2UgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gem5vdnVuYWN0ZW5pIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5SZWZyZXNoRGV0YWlsKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHsgdGhpcy5Td2l0Y2hUb1JlY29yZHMoKTsgcmV0dXJuOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9SZWxvYWREb2tsYWQoY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLCB7IGlkOiBcIkdSb3pJbXBvcnRaYXBpc3lcIiwgSUQ6IFwiR1JvekltcG9ydFphcGlzeSNcIiwgdGl0bGU6IHRpdGxlLCB0eXBlOiB0eXBPcGVyYWNlLCBpeHA6IHRoaXMuaXhwLCBncmRGb3JtYXQ6IGdyaWRmb3JtYXQsIGRhdFptZW55OiB0aGlzLmRva2xhZC5oZWFkZXI/LmRhdF96bWVuYSwgdHlwUG9yaXpvdmFjZTogdGhhdC50eXBQb3Jpem92YWNlLCBpc1JlemVydnVqZVZJSVNTUDogdGhhdC5pc1JlemVydnVqZVZJSVNTUCB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBsb2thbG5pIG5hYmlka3lcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldE1lbnVBY3Rpb25zKCk6IChzdHJpbmcgfCB1bmRlZmluZWQpW10gfCAoc3RyaW5nIHwgKHN0cmluZyB8IHVuZGVmaW5lZClbXSB8IHsgYWN0aW9uOiBHQWN0aW9uIHwgdW5kZWZpbmVkOyBwcmltYXJ5OiB0cnVlOyBmYXZvcml0ZTogdHJ1ZTsgfSlbXSB8IE1lbnVQYXJhbXNbXSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gW0FjdGlvbnMuUG9yaXpvdmFjTm92eSwgQWN0aW9ucy5Qb3Jpem92YWNPcHJhdml0LCBBY3Rpb25zLlBvcml6b3ZhY1pydXNpdCwgQWN0aW9ucy5Qb3Jpem92YWNacnVzaXRcclxuICAgICAgICAgICAgICAgICwgXCItXCIsIEFjdGlvbnMuUG9yaXpvdmFjUHJlZGtvbnRhY2VcclxuICAgICAgICAgICAgICAgICwgXCItXCIsIFtcImpyZXM6MzAyNTA0MTFcIiwgQWN0aW9ucy5Qb3Jpem92YWNJbXBvcnRTY2hyYW5rYSwgQWN0aW9ucy5Qb3Jpem92YWNJbXBvcnRTb3Vib3JdXTsgLy9SQyAzMDI1MDQxMSA6IEltcG9ydCBkYXRcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZnVuY3Rpb24gU3dpdGNoVG9SZWNvcmRzXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogIFByZXBudXRpIG5hIHphbG96a3Ugc2UgemFwaXN5XHJcbiAgICAgICAgICogQHBhcmFtIHtHVWN0RGV0YWlsfSBjb250ZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBTd2l0Y2hUb1JlY29yZHMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuU3dpdGNoVGFiKFwic3ViWmFwaXN5XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBmdW5jdGlvbiBTd2l0Y2hUYWJcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBQcmVwaW5hbmkgemFsb3pla1xyXG4gICAgICAgICAqIEBwYXJhbSB7R1VjdERldGFpbH0gY29udGVudFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lVGFic1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgU3dpdGNoVGFiKG5hbWVUYWJzOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFsU2V0dGluZ3M/LmdldChHb3JkaWMuUm96LkFwcFNldHRpbmdzLmFwcFBhdGggKyBcIi5Sb3pTZXR0aW5nc0Zvcm0uUG9sb3preVZpZXdcIikgPT0gR29yZGljLlJvei5BcHBTZXR0aW5ncy5FR1BvbG96a3lWaWV3LlphbG96a2EpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZChcIi5ndGFibWFuYWdlclwiKS5ndGFibWFuYWdlcihcInNldEFjdGl2ZVwiLCBuYW1lVGFicyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEplbmRhIHNlIG8gb3ByYXZueSBwcmlzbGliXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIE9wcmF2bnlQcmlzbGliKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kb2tsYWQuaGVhZGVyPy5rdGdfdHlwID09IDExMzcgfHwgdGhpcy5kb2tsYWQuaGVhZGVyPy5rdGdfdHlwID09IDExMzg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFpvYnJhemVuaSBuYXZhemFueWNoIGRva2xhZHVcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByaXZhdGUgVmF6YnlEb2tsYWR1KCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpczsgLy90aGlzID0gdGF0byBha2NlXHJcbiAgICAgICAgICAgIGxldCBkZWY6IEpRdWVyeS5EZWZlcnJlZDxhbnksIGFueSwgYW55PiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBsb2FkaW5nOiBKUXVlcnlQcm9taXNlPGFueT47XHJcbiAgICAgICAgICAgIGxldCBvZHVjdG92YW5vID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vbGV0IG9wcmF2eVByaXNsaWIgPSB0aGF0LmRva2xhZC5oZWFkZXI/Lmt0Z190eXAgPT0gMTEzNyB8fCB0aGF0LmRva2xhZC5oZWFkZXI/Lmt0Z190eXAgPT0gMTEzODtcclxuICAgICAgICAgICAgbGV0IHZpZXdNb2RlOiBib29sZWFuID0gKHRoYXQuT3ByYXZueVByaXNsaWIoKSAmJiB0aGF0LlBvY2V0WmFwaXN1KCk+MClcclxuICAgICAgICAgICAgICAgIHx8IHRoYXQuZG9rbGFkLmhlYWRlcj8uZWtvX2FrdCAhPT0gMTAwXHJcbiAgICAgICAgICAgICAgICB8fCB0aGF0LmRva2xhZC5oZWFkZXIuc196YXUhID41XHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIGxldCBuZXdHcGMgPSBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGModGhhdC5ncGMsIHRoYXQuZG9rbGFkLmhlYWRlcj8uaXhwX2RlbiEpO1xyXG4gICAgICAgICAgICBsZXQgdnN0dXA6IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkdWYXpieUlucHV0RHRvID0ge1xyXG4gICAgICAgICAgICAgICAgZHJkOiB0aGF0LmRva2xhZC5oZWFkZXI/LmRyZCEsIGl4cDogdGhhdC5kb2tsYWQuaXhwISwga3RnX3R5cDogdGhhdC5kb2tsYWQuaGVhZGVyPy5rdGdfdHlwISxcclxuICAgICAgICAgICAgICAgIHJlejogR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXppbVByYWNlU1ZhemJhbWkuVmF6YmFTZWt1bmRhcnVOYVByaW1hcm5pLFxyXG4gICAgICAgICAgICAgICAgdmlld01vZGU6IHZpZXdNb2RlLFxyXG4gICAgICAgICAgICAgICAgcG92b2xpdE9kdWN0b3Zhbmk6IHRoYXQuZG9rbGFkLmhlYWRlcj8uZHJkID09IDYgJiYgKHRoYXQuZG9rbGFkLmhlYWRlcj8uc196YXUhIDw9NSlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9rbm9WYXplYiA9IHRoaXMubmF2aWdhdGUoXCJHb3JkaWMuRWtvLldlYkNsaWVudC5HVmF6YnlcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIElkOiBcInJvel92YXpieVwiLCBJbnB1dER0bzogdnN0dXBcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG9rbm9WYXplYi5vbihcImVrb192YXpieV9uYXZhemFub1wiLCBmdW5jdGlvbiAoZXYsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmlld01vZGUpIHJldHVybiBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LlJlZnJlc2hEZXRhaWwoZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSh7bmV3TGluazp0cnVlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAvL2xvYWRpbmcgPSBHb3JkaWMuVWN0LldlYkNsaWVudC5EZXRhaWwuUmVmcmVzaERldGFpbChjb250ZW50IGFzIEdvcmRpYy5VY3QuV2ViQ2xpZW50LkRldGFpbC5HVWN0RGV0YWlsKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuQWt0dWFsaXphY2VEb2tsYWR1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gZGVmLnJlc29sdmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIG9rbm9WYXplYi5vbihcImVrb196YXBpc3lfb2R1Y3RvdmF0XCIsIGZ1bmN0aW9uIChldiwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2aWV3TW9kZSkgcmV0dXJuIDtcclxuICAgICAgICAgICAgICAgICAgICBvZHVjdG92YW5vID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvL0dvcmRpYy5VY3QuV2ViQ2xpZW50LkRldGFpbC5SZWZyZXNoRGV0YWlsKGNvbnRlbnQgYXMgR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLkdVY3REZXRhaWwpXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAodHlwZW9mIGxvYWRpbmcgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAobG9hZGluZy5zdGF0ZSgpID09PSBcInBlbmRpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgbG9hZGluZy50aGVuKCgpID0+IEdvcmRpYy5VY3QuV2ViQ2xpZW50LkRldGFpbC5PZHVjdG92YW5pWmFwaXN1KGNvbnRlbnQgYXMgR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLkdVY3REZXRhaWwsIG9rbm9WYXplYiwgZGF0YS56YXBpc3kpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIEdvcmRpYy5VY3QuV2ViQ2xpZW50LkRldGFpbC5PZHVjdG92YW5pWmFwaXN1KGNvbnRlbnQgYXMgR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLkdVY3REZXRhaWwsIG9rbm9WYXplYiwgZGF0YS56YXBpc3kpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAvL0dvcmRpYy5VY3QuV2ViQ2xpZW50LkRldGFpbC5PZHVjdG92YW5pWmFwaXN1KGNvbnRlbnQgYXMgR29yZGljLlVjdC5XZWJDbGllbnQuRGV0YWlsLkdVY3REZXRhaWwsIG9rbm9WYXplYiwgZGF0YS56YXBpc3kpXHJcbiAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBva25vVmF6ZWIub24oXCJjbG9zZWRcIiwgZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB6bm92dW5hY3RlbmkgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldi50YXJnZXQgPT0gb2tub1ZhemViWzBdICYmIGN0eCAhPSBudWxsICYmIGN0eC5oYXNDaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb2R1Y3RvdmFubylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuQWt0dWFsaXphY2VEb2tsYWR1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvZHVjdG92YW5vKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuQWt0dWFsaXphY2VEb2tsYWR1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dWFsaXphY2UgaG9kbm90IG5hIGhsYXZpY2NlIGRva2xhZHVcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSB1cGRhdGVWYWx1ZUZpZWxkcygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBOZWpwcnZlIG5hcGxuaW0gdnNlY2huYSBwb2xpY2thIGhvZG5vdGFtaVxyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKSAvLyBOYWpkZSB2c2VjaG5hIHBvbGUgZm9ybXVsYXJlIHZlIHZzZWNoIHNla2NpY2hcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBWeXBsbmVuaSBwb2xvemVrIG5hIGRva2xhZHUgLSBtZXRvZGEgbW9kZWx1IGFwcGx5XHJcbiAgICAgICAgICAgICAgICAvLyBQb3NsZWRuaW0gb2JqZWt0ZW0gamUgTW9kZWxPcHRpb25zLiBUZW50byBvcHRpb24gc3BvbHUgcyBtb2RlbCB0dm/FmcOtIHrDoWtsYWRuw60ga29uZmlndXJhxI1uw60gY2VsZWsgc3lzdMOpbXUgcHJvcG9qZW7DrSBmb3JtdWzDocWZZSBhIG1vZGVsdSAtIGh0dHBzOi8veHdpa2kuZ29yZGljLmN6L05FVC93aWRnZXRzL2dmaWVsZCNIbW9kZWxPcHRpb25zXHJcbiAgICAgICAgICAgICAgICAvLyBpbml0aWFsVmFsdWVzIChib29sLCBkZWZhdWx0PWZhbHNlKSAob3BlcmFjZTogYXBwbHkpIC0gemRhIHNlIHDFmWkgbmFzdGF2b3ZhbmkgaG9kbm90IHogbW9kZWx1IG3DoSBwb3XFvsOtdCBtZXRvZGEgc2V0VmFsdWUoKSBuZWJvIHNldEluaXRpYWwoKS4gXHJcbiAgICAgICAgICAgICAgICAvLyBzZXRGbGFncyhvYmplY3QsIGRlZmF1bHQgPSBudWxsKSAob3BlcmFjZTogYXBwbHkpIC0gdmxhc3Ruw60gcm96xaHDrcWZZW7DrSBmbGFncywgc2Uga3RlcsO9bWkgYnVkb3Ugdm9sw6FuYSB2xaFlY2huYSBzZXRWYWx1ZSB2b2xhbsOhIHogbW9kZWx1XHJcbiAgICAgICAgICAgICAgICAvLyBzZXRGbGFnczogeyB0cmlnZ2VyQ2hhbmdlOiBmYWxzZSB9IC0gcHJpIHBsbmVuaSBwb2xpY2VrIG1ldG9kb3UgbmVzcG91c3RldCB1ZGFsb3N0IGNoYW5nZSBuYWQgamVkbm90bGl2eW1pIHBvbGlja3lcclxuICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQuZG9rbGFkLmhlYWRlciwgeyBpbml0aWFsVmFsdWVzOiB0cnVlLCBzZXRGbGFnczogeyB0cmlnZ2VyQ2hhbmdlOiBmYWxzZSB9IH0pXHJcbiAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwibW9kZWxcIiwgXCJ2YWxpZGF0b3JzXCIsIHRoYXQudmFsaWRhdG9ycyk7XHJcblxyXG4gICAgICAgICAgICAvLyBWeXBsbmVuaSBwb3Bpc255Y2ggdmxhc3Rub3N0aSAtIHBva3VkIGpzb3UgdnlwbG5lbnlcclxuICAgICAgICAgICAgaWYgKHRoYXQuZG9rbGFkLnZsYXN0bm9zdGkpXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuUG9waXNuZVZsYXN0bm9zdGkuYXBwbHlWYWx1ZXModGhhdCwgdGhhdC5kb2tsYWQudmxhc3Rub3N0aSEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIEFrdHVhbGl6YWNlIGhvZG5vdHkgdiBwb3Jpem92YWNpXHJcbiAgICAgICAgLy8gKiAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSB1cGRhdGVWYWx1ZVBvcml6b3ZhYygpOiB2b2lkIHtcclxuICAgICAgICAvLyAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAvLyAgICAvL3ZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcodGhhdC5kb2tsYWQucm93cyBhcyBVY3QuSW50ZXJmYWNlLkdSb3pkcGVwRHRvW10sIHsga2V5OiBcIml4cCxyYWRla196XCIgfSk7XHJcbiAgICAgICAgLy8gICAgLy90aGF0LiRwb3Jpem92YWMuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcsIHRydWUpOyAvLyBhdXRvcmVmcmVzaDp0cnVlXHJcblxyXG4gICAgICAgIC8vICAgIGNvbnN0IHZpZXcgPSB0aGF0LiRwb3Jpem92YWMuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgIC8vICAgIHZpZXcudXBkYXRlRGF0YSh0aGF0LmRva2xhZC5yb3dzKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pIHByaXN0dXBub3N0aSBwb2xpY2VrIGRsZSBzdGF2dSBhIHByb3ZlZGVuIGFrY2VcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlRW5hYmxlRmllbGRzKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIFogaGxhdmlja3kgbW9odSB1cHJhdm92YXQgdHlwIGRva2xhZHUsIGtvbXBldGVudCBhIHJlYWxpemF0b3JcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5GaWVsZHMuVHlwRG9rbGFkdSkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIXRoYXQuZG9rbGFkLkZpZWxkUGVybWlzc2lvbnM/LlR5cERva2xhZHUudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoR29yZGljLkVrby5IZWFkZXJGb3JtLkZpZWxkcy5Lb21wZXRlbnQpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICF0aGF0LmRva2xhZC5GaWVsZFBlcm1pc3Npb25zPy5Lb21wZXRlbnQudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoR29yZGljLkVrby5IZWFkZXJGb3JtLkZpZWxkcy5SZWFsaXphdG9yKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhdGhhdC5kb2tsYWQuRmllbGRQZXJtaXNzaW9ucz8uUmVhbGl6YXRvci52YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBQb2xvemt5IGRva2xhZHVcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKEZpZWxkcy5NZXNpYykuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIXRoYXQuZG9rbGFkLkZpZWxkUGVybWlzc2lvbnM/Lk1lc2ljLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKEZpZWxkcy5EZW4pLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICF0aGF0LmRva2xhZC5GaWVsZFBlcm1pc3Npb25zPy5EZW4udmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoRmllbGRzLkRyZCkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIXRoYXQuZG9rbGFkLkZpZWxkUGVybWlzc2lvbnM/LkRydWhEb2tsYWR1LnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKEZpZWxkcy5DaXNsb0Rva2xhZHUpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICF0aGF0LmRva2xhZC5GaWVsZFBlcm1pc3Npb25zPy5DaXNsb0Rva2xhZHUudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoRmllbGRzLk1hbmFnZXJDaWxlKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhdGhhdC5kb2tsYWQuRmllbGRQZXJtaXNzaW9ucz8uTWFuYWdlckNpbGUudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoRmllbGRzLlVjdGFybmEpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICF0aGF0LmRva2xhZC5GaWVsZFBlcm1pc3Npb25zPy5VY3Rhcm5hLnZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKEZpZWxkcy5DYXN0a2EpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICF0aGF0LmRva2xhZC5GaWVsZFBlcm1pc3Npb25zPy5DYXN0a2EudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoRmllbGRzLlBvcGlzKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhdGhhdC5kb2tsYWQuRmllbGRQZXJtaXNzaW9ucz8uUG9waXMudmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoRmllbGRzLkFIbGF2aWNrYSkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIXRoYXQuZG9rbGFkLkZpZWxkUGVybWlzc2lvbnM/LkFobGF2aWNrYS52YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZEZpZWxkcyhGaWVsZHMuQ2lzbG9FZHNTbXZzKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhdGhhdC5kb2tsYWQuRmllbGRQZXJtaXNzaW9ucz8uQ2lzbG9TYWJsb255RWRzLnZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFBvdm9sZW5pIGVkaXRhY2UgemFsb3preSBXRkwgZG9rdW1lbnRcclxuICAgICAgICAgICAgKHRoaXMgYXMgYW55KS5zZXRFZGl0bW9kZUVrb1Byb2ZpbCh0aGF0LmVkaXRIZWFkZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gUG92b2xlbmkgZWRpdGFjZSB6YWxvemt5IHBvcGlzbnljaCB2bGFzdG5vc3RpXHJcbiAgICAgICAgICAgIHRoaXMuZGVzY1Byb3BzX3NldHVwKHsgcmVhZE9ubHk6ICF0aGF0LmVkaXRIZWFkZXIgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBBa2NlIGRldGFpbHVcclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8vI3JlZ2lvbiBQb21vY25lIGRpYWxvZ3kgcHJvIHNwdXN0ZW5pIGFrY2VcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGlhbG9nIHBybyB6YWRhbmkgcGlkdSBwcm8gcG9kYW5pIGRva2xhZHVcclxuICAgICAgICAgKiBAcmV0dXJucyBQcm9taXNlXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGRpYWxvZ1BvZGFuaSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0ICRkaWFsb2cgPSBXZmwuRGlhbG9ncy5HZW5lcm92YW5pSXhwRGxnKFxyXG4gICAgICAgICAgICAgICAgdGhhdCxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBUeXBEb2s6IFdmbC5HbG9iYWxzLkVudW1zLlR5cERvay5WbGFzdG5pLFxyXG4gICAgICAgICAgICAgICAgICAgIFR5cElkOiBXZmwuR2xvYmFscy5FbnVtcy5UeXBJZC5JWFAsXHJcbiAgICAgICAgICAgICAgICAgICAgRG90YXpQcmlFeGlzdGVuY2lWSmluZUFnZW5kZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgSGxhc2VuaVByaUV4aXN0ZW5jaVZBZ2VuZGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIFpwdXNvYkdlbmVyb3Zhbmk6IEdvcmRpYy5XZmwuR2xvYmFscy5FbnVtcy5acHVzb2JHZW5lcm92YW5pSXhwLlBhcmFtZXRyZW1HaW5HZW5JeHBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLnNob3dNb2RhbFdpbmRvd1xyXG4gICAgICAgICAgICApITtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkZGlhbG9nLmNyZWF0ZURpYWxvZ1Byb21pc2U8SUdQb2RhbmlNb2RlbD4oZGF0YSA9PiBkYXRhICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YTogSUdQb2RhbmlNb2RlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEtvbnRyb2xhLCB6ZGEganNvdSBkYXRhIHZ5cGxuxJtuYVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0YS5JeHAgfHwgZGF0YS5JeHAudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEYXRhIG5lanNvdSB2eXBsbsSbbmEgLSB6b2JyYXogY2h5YnUgYSBvcGFrdWpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgJGVycm9yRGlhbG9nID0gdGhpcy5kaWFsb2dzLmVycm9yKFwianJlczozMDE1MDE2NFwiKTsgLy9SQyAzMDE1MDE2NCA6IFRleHQgbXVzw60gYsO9dCB2eXBsbsSbbiFcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRlcnJvckRpYWxvZy5jcmVhdGVEaWFsb2dQcm9taXNlKFwib2tcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWt1cnppdm7EmyB6YXZvbGVqIHpub3Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9nUG9kYW5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRGF0YSBqc291IE9LIC0gdnJhxaUgdGV4dFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdFcnJvcihcImpyZXM6MzAxNTAxMDJcIik7IC8vIFJDIDMwMTUwMTAyIDogQWtjZSBieWxhIHN0b3Jub3bDoW5hIHXFvml2YXRlbGVtXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERpYWxvZyBwcm8gemFkYW5pIHRleHRvdmVobyBkdXZvZHUgcHJvIHNwdXN0ZW5pIGFrY2VcclxuICAgICAgICAgKiBAcmV0dXJucyBQcm9taXNlXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGRpYWxvZ0R1dm9kKGxhYmVsOiBzdHJpbmcpOiBKUXVlcnkuUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICAgICAgLy8gVnl0dm9yaW0gc2kgRElWIHBybyB6b2JyYXplbmkgZGlhbG9ndVxyXG4gICAgICAgICAgICBjb25zdCAkZGlhbG9nID0gdGhpcy5kaWFsb2dzLnByb21wdChcIkRvdGF6XCIsIGxhYmVsKTsgXHJcblxyXG4gICAgICAgICAgICAvLyBaIGRpYWxvZ3Ugdnl0dm9yaW0gcHJvbWlzZSAuIFYgZGF0YSBqZSBEaWFsb2dSZXR1cm5WYWx1ZSBzIGhvZG5vdG91IHRleHQgYSBwb2tyYWN1amksIHBva3VkIGpzb3UgZGF0YSB2eXBsbmVuYVxyXG4gICAgICAgICAgICByZXR1cm4gJGRpYWxvZy5jcmVhdGVEaWFsb2dQcm9taXNlPElHVGV4dE1vZGVsPihkYXRhID0+IGRhdGEgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhOiBJR1RleHRNb2RlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEtvbnRyb2xhLCB6ZGEganNvdSBkYXRhIHZ5cGxuxJtuYVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0YS50ZXh0IHx8IGRhdGEudGV4dC50cmltKCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERhdGEgbmVqc291IHZ5cGxuxJtuYSAtIHpvYnJheiBjaHlidSBhIG9wYWt1alxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCAkZXJyb3JEaWFsb2cgPSB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJqcmVzOjMwMTUwMTY0XCIpOyAvL1JDIDMwMTUwMTY0IDogVGV4dCBtdXPDrSBiw710IHZ5cGxuxJtuIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGVycm9yRGlhbG9nLmNyZWF0ZURpYWxvZ1Byb21pc2UoXCJva1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJla3Vyeml2bsSbIHphdm9sZWogem5vdnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dEdXZvZChsYWJlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRGF0YSBqc291IE9LIC0gdnJhxaUgdGV4dFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnRleHQ7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR0Vycm9yKFwianJlczozMDE1MDEwMlwiKTsgLy8gUkMgMzAxNTAxMDIgOiBBa2NlIGJ5bGEgc3Rvcm5vdsOhbmEgdcW+aXZhdGVsZW1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGlhbG9nIHByZWRhbmlcclxuICAgICAgICAgKiBAcmV0dXJucyBQcm9taXNlXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIGRpYWxvZ1ByZWRhbmkoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZmlsdHJ5WnByYWNvdmF0ZWwgPSB7XHJcbiAgICAgICAgICAgICAgICBEbGVQb3ZvbGVueWNoRmF6aTogW1wiR1dBUk9aMDVcIiwgXCJHU0FST1owMVwiXSwgXHJcbiAgICAgICAgICAgICAgICBWcmZ1VHlwQWc6IFwicm96XCIsXHJcbiAgICAgICAgICAgICAgICBWcmZ1QWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgIFZyZnVJeHBEZW46IHRoYXQuZ2xvYmFscy5Fa29QYXJhbXM/Lkl4cERlbixcclxuICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICBFa29JY286ICh0aGF0Lmdsb2JhbHMuRGF0YWJhc2VQYXJhbXM/LlJlemltUHJvdm96dSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5SZXppbVByb3ZvenVFbnVtLnpha2xhZG5pIHx8IHRoYXQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcz8uUmV6aW1Qcm92b3p1ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLlJlemltUHJvdm96dUVudW0udWN0YXJuYSA/IHRoYXQuZ2xvYmFscy5Fa29QYXJhbXM/LkljbyA6IG51bGwpLFxyXG4gICAgICAgICAgICAgICAgaWNvOiAodGhhdC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zPy5SZXppbVByb3ZvenUgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuUmV6aW1Qcm92b3p1RW51bS56YWtsYWRuaSB8fCB0aGF0Lmdsb2JhbHMuRGF0YWJhc2VQYXJhbXM/LlJlemltUHJvdm96dSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5SZXppbVByb3ZvenVFbnVtLnVjdGFybmEgPyB0aGF0Lmdsb2JhbHMuRWtvUGFyYW1zPy5JY28gOiBudWxsKSxcclxuICAgICAgICAgICAgICAgIFJlZmVyZW50QWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRyeUtvbXBldGVudCA9IHtcclxuICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICBwcml6X2tvbTogMTAsXHJcbiAgICAgICAgICAgICAgICBpY286ICh0aGF0Lmdsb2JhbHMuRWtvUGFyYW1zPy5JY28pLFxyXG4gICAgICAgICAgICAgICAgdXVzOiAodGhhdC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zPy5SZXppbVByb3ZvenUgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuUmV6aW1Qcm92b3p1RW51bS51Y3Rhcm5hID8gdGhhdC5nbG9iYWxzLkVrb1BhcmFtcz8uVXVzIDogbnVsbCksXHJcbiAgICAgICAgICAgICAgICB1Y3M6ICh0aGF0Lmdsb2JhbHMuRGF0YWJhc2VQYXJhbXM/LlJlemltUHJvdm96dSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5SZXppbVByb3ZvenVFbnVtLnVjdGFybmEgPyB0aGF0Lmdsb2JhbHMuRWtvUGFyYW1zPy5VY3MgOiBudWxsKSxcclxuICAgICAgICAgICAgICAgIGNpc19yZWFsOiAodGhhdC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zPy5SZXppbVByb3ZvenUgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuUmV6aW1Qcm92b3p1RW51bS5yZWFsaXphdG9yID8gdGhhdC5nbG9iYWxzLkVrb1BhcmFtcz8uVXVzIDogbnVsbClcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRkaWFsb2cgPSB0aGlzLmRpYWxvZ3Muc2ltcGxlRm9ybShcclxuICAgICAgICAgICAgICAgIFwianJlczozMDI1MDUwN1wiLCAvL1JDIDMwMjUwNTA3IDogUMWZZWTDoW7DrVxyXG4gICAgICAgICAgICAgICAgR29yZGljLkVrby5QcmVmYWJzLlByZWRhbmlEb2tsYWR1Rm9ybSh7XHJcbiAgICAgICAgICAgICAgICAgICAgU291dmlzZWppY2lWaWRpdGVsbm9zdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgU291dmlzZWppY2labWVuYTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgS29tcGV0ZW50VmlkaXRlbG5vc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgS29tcGV0ZW50Wm1lbmE6IHRoYXQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcz8uUG92b2xlbmlabWVuaXRLb21wZXRlbnRhISxcclxuICAgICAgICAgICAgICAgICAgICBTdGFydEZpbHRyWnByYWNvdmF0ZWw6IGZpbHRyeVpwcmFjb3ZhdGVsLFxyXG4gICAgICAgICAgICAgICAgICAgIFN0YXJ0RmlsdHJLb21wZXRlbnQ6IGZpbHRyeUtvbXBldGVudCxcclxuICAgICAgICAgICAgICAgICAgICBSZXppbVByb3ZvenU6IHRoYXQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcz8uUmV6aW1Qcm92b3p1Py50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkZGlhbG9nLmNyZWF0ZURpYWxvZ1Byb21pc2U8SUdQcmVkYXRNb2RlbD4oZGF0YSA9PiBkYXRhICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YTogSUdQcmVkYXRNb2RlbCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBLb250cm9sYSwgemRhIGpzb3UgZGF0YSB2eXBsbsSbbmFcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuZHV2b2QgfHwgZGF0YS5kdXZvZC50cmltKCkubGVuZ3RoID09PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8ICFkYXRhLml4c19mdW5fYWt0IHx8IGRhdGEuaXhzX2Z1bl9ha3QudHJpbSgpLmxlbmd0aCA9PT0gMFxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEYXRhIG5lanNvdSB2eXBsbsSbbmEgLSB6b2JyYXogY2h5YnUgYSBvcGFrdWpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgJGVycm9yRGlhbG9nID0gdGhpcy5kaWFsb2dzLmVycm9yKFwianJlczozMDE1MDE2NVwiKTsgLy9SQyAzMDE1MDE2NSA6IFBvxb5hZG92YW7DqSBob2Rub3R5IG5lanNvdSB2eXBsbsSbbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkZXJyb3JEaWFsb2cuY3JlYXRlRGlhbG9nUHJvbWlzZShcIm9rXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVrdXJ6aXZuxJsgemF2b2xlaiB6bm92dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ1ByZWRhbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfZnVuX2FrdDogZGF0YS5peHNfZnVuX2FrdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2Z1bl92eXJpejogZGF0YS5peHNfZnVuX3Z5cml6LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaXNfcmVhbDogZGF0YS5jaXNfcmVhbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3JlZjogZGF0YS5peHNfcmVmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiBkYXRhLml4cF9kZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1dm9kOiBkYXRhLmR1dm9kLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR0Vycm9yKFwianJlczozMDE1MDEwMlwiKTsgLy8gUkMgMzAxNTAxMDIgOiBBa2NlIGJ5bGEgc3Rvcm5vdsOhbmEgdcW+aXZhdGVsZW1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGlhbG9nIHByZWV2aWRvdmFuaVxyXG4gICAgICAgICAqIEByZXR1cm5zIFByb21pc2VcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgZGlhbG9nUHJlZXZpZG92YW5pKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRyeVpwcmFjb3ZhdGVsID0ge1xyXG4gICAgICAgICAgICAgICAgRGxlUG92b2xlbnljaEZhemk6IFtcIkdXQVJPWjA1XCIsIFwiR1NBUk9aMDFcIl0sXHJcbiAgICAgICAgICAgICAgICBWcmZ1QWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICBFa29JY286ICh0aGF0Lmdsb2JhbHMuRGF0YWJhc2VQYXJhbXM/LlJlemltUHJvdm96dSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5SZXppbVByb3ZvenVFbnVtLnpha2xhZG5pIHx8IHRoYXQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcz8uUmV6aW1Qcm92b3p1ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLlJlemltUHJvdm96dUVudW0udWN0YXJuYSA/IHRoYXQuZ2xvYmFscy5Fa29QYXJhbXM/LkljbyA6IG51bGwpLFxyXG4gICAgICAgICAgICAgICAgaWNvOiAodGhhdC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zPy5SZXppbVByb3ZvenUgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuUmV6aW1Qcm92b3p1RW51bS56YWtsYWRuaSB8fCB0aGF0Lmdsb2JhbHMuRGF0YWJhc2VQYXJhbXM/LlJlemltUHJvdm96dSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5SZXppbVByb3ZvenVFbnVtLnVjdGFybmEgPyB0aGF0Lmdsb2JhbHMuRWtvUGFyYW1zPy5JY28gOiBudWxsKSxcclxuICAgICAgICAgICAgICAgIFJlZmVyZW50QWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRyeUtvbXBldGVudCA9IHtcclxuICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICBwcml6X2tvbTogMTAsXHJcbiAgICAgICAgICAgICAgICBpY286ICh0aGF0Lmdsb2JhbHMuRGF0YWJhc2VQYXJhbXM/LlJlemltUHJvdm96dSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5SZXppbVByb3ZvenVFbnVtLnpha2xhZG5pIHx8IHRoYXQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcz8uUmV6aW1Qcm92b3p1ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLlJlemltUHJvdm96dUVudW0udWN0YXJuYSA/IHRoYXQuZ2xvYmFscy5Fa29QYXJhbXM/LkljbyA6IG51bGwpLFxyXG4gICAgICAgICAgICAgICAgdXVzOiAodGhhdC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zPy5SZXppbVByb3ZvenUgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuUmV6aW1Qcm92b3p1RW51bS51Y3Rhcm5hID8gdGhhdC5nbG9iYWxzLkVrb1BhcmFtcz8uVXVzIDogbnVsbCksXHJcbiAgICAgICAgICAgICAgICB1Y3M6ICh0aGF0Lmdsb2JhbHMuRGF0YWJhc2VQYXJhbXM/LlJlemltUHJvdm96dSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5SZXppbVByb3ZvenVFbnVtLnVjdGFybmEgPyB0aGF0Lmdsb2JhbHMuRWtvUGFyYW1zPy5VY3MgOiBudWxsKSxcclxuICAgICAgICAgICAgICAgIGNpc19yZWFsOiAodGhhdC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zPy5SZXppbVByb3ZvenUgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuUmV6aW1Qcm92b3p1RW51bS5yZWFsaXphdG9yID8gdGhhdC5nbG9iYWxzLkVrb1BhcmFtcz8uVXVzIDogbnVsbClcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRyeUtuaWhhID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwX2FnOiA1MCxcclxuICAgICAgICAgICAgICAgIGljbzogdGhhdC5nbG9iYWxzLkVrb1BhcmFtcz8uSWNvLFxyXG4gICAgICAgICAgICAgICAgdWNzOiB0aGF0Lmdsb2JhbHMuRWtvUGFyYW1zPy5VY3MsXHJcbiAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwLFxyXG4gICAgICAgICAgICAgICAgaXhwX2RlbjogXCIhPSBcIiArIHRoYXQuZ2xvYmFscy5Fa29QYXJhbXM/Lkl4cERlbixcclxuICAgICAgICAgICAgICAgIHJvazogdGhhdC5nbG9iYWxzLkVrb1BhcmFtcz8uUm9rLCAvLyBOYWJpZG5pIGplbiBha3RhbG5pIHJva1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgJGRpYWxvZyA9IHRoYXQuZGlhbG9ncy5zaW1wbGVGb3JtKFxyXG4gICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwNTA2XCIsIC8vUkMgMzAyNTA1MDYgOiBQxZllZXZpZG92w6Fuw61cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uUHJlZmFicy5QcmVldmlkZW5jZURva2xhZHVGb3JtKHtcclxuICAgICAgICAgICAgICAgICAgICBLb21wZXRlbnRWaWRpdGVsbm9zdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBLb21wZXRlbnRabWVuYTogdGhhdC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zPy5Qb3ZvbGVuaVptZW5pdEtvbXBldGVudGEhLFxyXG4gICAgICAgICAgICAgICAgICAgIFpwcmFjb3ZhdGVsQWt0dWFsbmk6IHRoYXQuZ2xvYmFscy5TZXNzaW9uUGFyYW1zPy5JeHNGdW4hLFxyXG4gICAgICAgICAgICAgICAgICAgIFN0YXJ0RmlsdHJLbmloYTogZmlsdHJ5S25paGEsXHJcbiAgICAgICAgICAgICAgICAgICAgU3RhcnRGaWx0clpwcmFjb3ZhdGVsOiBmaWx0cnlacHJhY292YXRlbCxcclxuICAgICAgICAgICAgICAgICAgICBTdGFydEZpbHRyS29tcGV0ZW50OiBmaWx0cnlLb21wZXRlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgUmV6aW1Qcm92b3p1OiB0aGF0Lmdsb2JhbHMuRGF0YWJhc2VQYXJhbXM/LlJlemltUHJvdm96dT8udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJGRpYWxvZy5jcmVhdGVEaWFsb2dQcm9taXNlPElHUHJlZXZpZGVuY2VNb2RlbD4oZGF0YSA9PiBkYXRhICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YTogSUdQcmVldmlkZW5jZU1vZGVsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gS29udHJvbGEsIHpkYSBqc291IGRhdGEgdnlwbG7Em25hXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhLmR1dm9kIHx8IGRhdGEuZHV2b2QudHJpbSgpLmxlbmd0aCA9PT0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCAhZGF0YS5jaXNfcmVhbCB8fCBkYXRhLmNpc19yZWFsLnRyaW0oKS5sZW5ndGggPT09IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgIWRhdGEuaXhzX2Z1bl9ha3QgfHwgZGF0YS5peHNfZnVuX2FrdC50cmltKCkubGVuZ3RoID09PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8ICFkYXRhLml4c19mdW5fdnlyaXogfHwgZGF0YS5peHNfZnVuX3Z5cml6LnRyaW0oKS5sZW5ndGggPT09IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgIWRhdGEuaXhzX3JlZiB8fCBkYXRhLml4c19yZWYudHJpbSgpLmxlbmd0aCA9PT0gMFxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEYXRhIG5lanNvdSB2eXBsbsSbbmEgLSB6b2JyYXogY2h5YnUgYSBvcGFrdWpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgJGVycm9yRGlhbG9nID0gdGhpcy5kaWFsb2dzLmVycm9yKFwianJlczozMDE1MDE2NVwiKTsgLy9SQyAzMDE1MDE2NSA6IFBvxb5hZG92YW7DqSBob2Rub3R5IG5lanNvdSB2eXBsbsSbbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkZXJyb3JEaWFsb2cuY3JlYXRlRGlhbG9nUHJvbWlzZShcIm9rXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVrdXJ6aXZuxJsgemF2b2xlaiB6bm92dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ1ByZWV2aWRvdmFuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1dm9kOiBkYXRhLmR1dm9kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiBkYXRhLml4cF9kZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4c19mdW5fYWt0OiBkYXRhLml4c19mdW5fYWt0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfcmVmOiBkYXRhLml4c19yZWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpc19yZWFsOiBkYXRhLmNpc19yZWFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfZnVuX3Z5cml6OiBkYXRhLml4c19mdW5fdnlyaXosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4c19zdTogZGF0YS5peHNfc3UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnJhZGE6IGRhdGEuc3VicmFkYVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR0Vycm9yKFwianJlczozMDE1MDEwMlwiKTsgLy8gUkMgMzAxNTAxMDIgOiBBa2NlIGJ5bGEgc3Rvcm5vdsOhbmEgdcW+aXZhdGVsZW1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGlhbG9nIHByaWRlbGVuaVxyXG4gICAgICAgICAqIEByZXR1cm5zIFByb21pc2VcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgZGlhbG9nUHJpZGVsZW5pKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZpbHRyeVpwcmFjb3ZhdGVsID0ge1xyXG4gICAgICAgICAgICAgICAgRGxlUG92b2xlbnljaEZhemk6IFtcIkdXQVJPWjA1XCIsIFwiR1NBUk9aMDFcIl0sXHJcbiAgICAgICAgICAgICAgICBWcmZ1VHlwQWc6IFwicm96XCIsXHJcbiAgICAgICAgICAgICAgICBWcmZ1QWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgIFZyZnVJeHBEZW46IHRoYXQuZ2xvYmFscy5Fa29QYXJhbXM/Lkl4cERlbixcclxuICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICBFa29JY286ICh0aGF0Lmdsb2JhbHMuRGF0YWJhc2VQYXJhbXM/LlJlemltUHJvdm96dSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5SZXppbVByb3ZvenVFbnVtLnpha2xhZG5pIHx8IHRoYXQuZ2xvYmFscy5EYXRhYmFzZVBhcmFtcz8uUmV6aW1Qcm92b3p1ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLlJlemltUHJvdm96dUVudW0udWN0YXJuYSA/IHRoYXQuZ2xvYmFscy5Fa29QYXJhbXM/LkljbyA6IG51bGwpLFxyXG4gICAgICAgICAgICAgICAgaWNvOiAodGhhdC5nbG9iYWxzLkRhdGFiYXNlUGFyYW1zPy5SZXppbVByb3ZvenUgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuUmV6aW1Qcm92b3p1RW51bS56YWtsYWRuaSB8fCB0aGF0Lmdsb2JhbHMuRGF0YWJhc2VQYXJhbXM/LlJlemltUHJvdm96dSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5SZXppbVByb3ZvenVFbnVtLnVjdGFybmEgPyB0aGF0Lmdsb2JhbHMuRWtvUGFyYW1zPy5JY28gOiBudWxsKSxcclxuICAgICAgICAgICAgICAgIFJlZmVyZW50QWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRkaWFsb2cgPSB0aGF0LmRpYWxvZ3Muc2ltcGxlRm9ybShcclxuICAgICAgICAgICAgICAgIFwianJlczozMDI1MDUwOFwiLCAvL1JDIDMwMjUwNTA4IDogUMWZaWTEm2xlbsOtXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLlByZWZhYnMuUHJpZGVsZW5pRG9rbGFkdUZvcm0oe1xyXG4gICAgICAgICAgICAgICAgICAgIFNvdXZpc2VqaWNpVmlkaXRlbG5vc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIFNvdXZpc2VqaWNpWm1lbmE6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIEtvbXBldGVudFZpZGl0ZWxub3N0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIEtvbXBldGVudFptZW5hOiB0aGF0Lmdsb2JhbHMuRGF0YWJhc2VQYXJhbXM/LlBvdm9sZW5pWm1lbml0S29tcGV0ZW50YSEsIFxyXG4gICAgICAgICAgICAgICAgICAgIFN0YXJ0RmlsdHJacHJhY292YXRlbDogZmlsdHJ5WnByYWNvdmF0ZWwsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICRkaWFsb2cuY3JlYXRlRGlhbG9nUHJvbWlzZTxJR1ByaWRlbGl0TW9kZWw+KGRhdGEgPT4gZGF0YSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGE6IElHUHJpZGVsaXRNb2RlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEtvbnRyb2xhLCB6ZGEganNvdSBkYXRhIHZ5cGxuxJtuYVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZGF0YS5kdXZvZCB8fCBkYXRhLmR1dm9kLnRyaW0oKS5sZW5ndGggPT09IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgIWRhdGEuaXhzX2Z1bl9ha3QgfHwgZGF0YS5peHNfZnVuX2FrdC50cmltKCkubGVuZ3RoID09PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8ICFkYXRhLml4c19zdSB8fCBkYXRhLml4c19zdS50cmltKCkubGVuZ3RoID09PSAwXHJcbiAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERhdGEgbmVqc291IHZ5cGxuxJtuYSAtIHpvYnJheiBjaHlidSBhIG9wYWt1alxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCAkZXJyb3JEaWFsb2cgPSB0aGlzLmRpYWxvZ3MuZXJyb3IoXCJqcmVzOjMwMTUwMTY1XCIpOyAvL1JDIDMwMTUwMTY1IDogUG/FvmFkb3ZhbsOpIGhvZG5vdHkgbmVqc291IHZ5cGxuxJtuw6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRlcnJvckRpYWxvZy5jcmVhdGVEaWFsb2dQcm9taXNlKFwib2tcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWt1cnppdm7EmyB6YXZvbGVqIHpub3Z1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9nUHJpZGVsZW5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHV2b2Q6IGRhdGEuZHV2b2QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4c19mdW5fYWt0OiBkYXRhLml4c19mdW5fYWt0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHNfc3U6IGRhdGEuaXhzX3N1XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBHRXJyb3IoXCJqcmVzOjMwMTUwMTAyXCIpOyAvLyBSQyAzMDE1MDEwMiA6IEFrY2UgYnlsYSBzdG9ybm92w6FuYSB1xb5pdmF0ZWxlbVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIFBvbW9jbmUgZGlhbG9neSBwcm8gc3B1c3RlbmkgYWtjZVxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiB2eWJlcm92ZU9rbm9cclxuICAgICogXHJcbiAgICAqIEBhdXRob3IgVG9tw6HFoSBLYXJlxaFcclxuICAgICogQHNpbmNlIDQ4MC4xLjAuNjZcclxuICAgICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIHZ5YmVyb3ZlT2tubyBleHRlbmRzIEdDb250ZW50QmFzZSBpbXBsZW1lbnRzIElHQ2xpZW50Q29udGVudCB7XHJcbiAgICAgICAgcHVibGljIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIHB1YmxpYyB0eXBlSXRlbTogR29yZGljLkVrby5XZWJDbGllbnQuVWN0Um96LkVudW1zLlR5cFBvbGlja2E7XHJcbiAgICAgICAgcHJlcGFyZUNvbnRlbnQocGFyYW1zLypjb250ZW50OiB0aGlzICYgR0NvbnRlbnQsIC4uLnBhcmFtczogYW55W10qLyk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZGVmYXVsdEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiLCB0YWJMYWJlbDpcIm5ldmltXCIgfSlcclxuXHJcbiAgICAgICAgICAgIGRlZmF1bHRGb3JtLmFkZFJvdyhcIlwiKS5hZGRGaWVsZChcImdyYWRpb1wiLCB7IC8vY3VzdG9tQ2xhc3M6XCJub1Bpbm5hYmxlXCJcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0aW9uUmFkaW9zXCIsXHJcbiAgICAgICAgICAgICAgICBpdGVtQ2xhc3M6IFwiXCIsIC8vIHDFmcOtcGFkbsSbIGx6ZSBwxZlpZHQgcGV2bsOpIHZlbGlrb3N0aSB2aXogeHdpa2lcclxuICAgICAgICAgICAgICAgIGdyb3VwTmFtZTogXCJuZXh0QWN0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICByYWRpb3M6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBcIjIwXCIsIGxhYmVsOiBcImpyZXM6MzAyNTAzNjdcIiB9LCAvL1JDIDMwMjUwMzY3IDogQ2VudHLDoWxuw61cclxuICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBcIjEwXCIsIGxhYmVsOiBcImpyZXM6MzAyNTAzNjhcIiB9IC8vUkMgMzAyNTAzNjggOiBEZWNlbnRyw6FsbsOtXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGlvbnMgPSBuZXcgR0FjdGlvbkxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgYWN0T2s6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9rKHtcclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZShkdG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgIGFjdENsb3NlOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25acnVzaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudHJ5Q2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc3QgbWVudVBhcnMgPSB0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdE9rIVwiLCBcImFjdENsb3NlKlwiXSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZEJhcihtZW51UGFycyk7XHJcbiAgICAgICAgICAgIC8vdGhhdC5jb21tYW5kQmFyKFt7XHJcbiAgICAgICAgICAgIC8vICAgIGN1c3RvbUNsYXNzOiBcImctYnV0dG9uLS1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgIC8vICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJhY09LQnV0dG9uXCIsIGNhcHRpb246IEdEbGcubWJiT2sudGV4dCwgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkgeyAvL0dEbGcubWJiQ2xvc2UudGV4dFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHZhciBkdG8gPSB7fTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImNvbGxlY3RcIiwgZHRvKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0LmNsb3NlKGR0byk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy90aGF0LmNsb3NlKHRoYXQuZ2V0UHJlZGtvbnRhY2VBY3Rpb24oKSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJhY0Nsb3NlQnV0dG9uXCIsIGNhcHRpb246IEdEbGcubWJiQ2xvc2UudGV4dCwgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkgeyAvL0dEbGcubWJiQ2xvc2UudGV4dFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuY2xvc2UodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gICAgfSlcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIC8vXSlcclxuXHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgZGVmYXVsdEZvcm0pO1xyXG4gICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHsgYWN0aW9uUmFkaW9zOiBcIjIwXCIgfSlcclxuICAgICAgICAgICAgICAgIC5maXJzdCgpXHJcbiAgICAgICAgICAgICAgICAuZ2ZpZWxkKFwiZm9jdXNcIik7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vbGV0IGl0ZW0gPSB0aGF0LmZpbmRGaWVsZHMoXCJhY3Rpb25SYWRpb3NcIikuZm9jdXMoKTtcclxuICAgICAgICAgICAgLy9pZiAoaXRlbS5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAvLyAgICBpdGVtWzBdLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIC8vdGhhdC5maW5kKChtZW51UGFyc1swXS5pZCkuZm9jdXMoKTtcclxuICAgICAgICAgICAgLy92YXIgaW5kZXggPSB7IGluZGV4OiBwYXJhbXMhLmluZGV4IH07XHJcbiAgICAgICAgICAgIC8vdmFyIG1vZGVsID0gdGhpcy5hdXRvTG9hZFBhcmFtcy5tb2RlbCA/IHRoaXMudHJhbnNmb3JtVG9Nb2RlbCh0aGlzLmF1dG9Mb2FkUGFyYW1zLm1vZGVsLCBpbmRleCkgOiB7IGNvcHlGcm9tOiBpbmRleCwgY29weUZyb21VRUE6IGluZGV4LCBhY3Rpb25SYWRpb3M6IFwiMFwiIH1cclxuXHJcbiAgICAgICAgICAgIC8vdGhhdC5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBtb2RlbCwgeyBpbml0aWFsVmFsdWVzOiB0cnVlLCBzZXRGbGFnczogeyB0cmlnZ2VyQ2hhbmdlOiB0cnVlIH0gfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIE5hdnJhdG92ZSBob2Rub3R5IHogZm9ybXVsYXJlIHBybyBwb2RhbmlcclxuICAgIGludGVyZmFjZSBJR1BvZGFuaU1vZGVsIHtcclxuICAgICAgICBJeHA6IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgSXhwRXhpc3Q6IGJvb2xlYW4gfCBudWxsLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBOYXZyYXRvdmUgaG9kbm90eSB6IGZvcm11bGFyZSBwcm8gcG9kYW5pXHJcbiAgICBpbnRlcmZhY2UgSUdUZXh0TW9kZWwge1xyXG4gICAgICAgIHRleHQ6IHN0cmluZyB8IG51bGwsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE5hdnJhdG92ZSBob2Rub3R5IHogZm9ybXVsYXJlIHBybyBwcmVkYW5pXHJcbiAgICBpbnRlcmZhY2UgSUdQcmVkYXRNb2RlbCB7XHJcbiAgICAgICAgZHV2b2Q6IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgaXhzX2Z1bl9ha3Q6IHN0cmluZyB8IG51bGwsXHJcbiAgICAgICAgaXhzX2Z1bl92eXJpejogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICBpeHNfcmVmOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgIGNpc19yZWFsOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgIGl4cF9kZW46IHN0cmluZyB8IG51bGwsXHJcbiAgICB9O1xyXG4gICAgLy8gTmF2cmF0b3ZlIGhvZG5vdHkgeiBmb3JtdWxhcmUgcHJvIHByZXZ6ZXRpXHJcbiAgICBpbnRlcmZhY2UgSUdQcmV2emV0aU1vZGVsIHtcclxuICAgICAgICBkdXZvZDogc3RyaW5nIHwgbnVsbCxcclxuICAgIH07XHJcbiAgICAvLyBOYXZyYXRvdmUgaG9kbm90eSB6IGZvcm11bGFyZSBwcm8gcHJpZGVsZW5pXHJcbiAgICBpbnRlcmZhY2UgSUdQcmlkZWxpdE1vZGVsIHtcclxuICAgICAgICBkdXZvZDogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICBpeHNfZnVuX2FrdDogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICBpeHNfc3U6IHN0cmluZyB8bnVsbCxcclxuICAgIH07XHJcbiAgICAvLyBUcmlkYSBwcm8gbmFwbG5lbmkgc3Ryb211IElLXHJcbiAgICBjbGFzcyBHUm96SUtTdHJ1a3R1cmEgaW1wbGVtZW50cyBHb3JkaWMuVWN0LkludGVyZmFjZS5HUm96SUsgIHtcclxuICAgICAgICAvKipJZCovXHJcbiAgICAgICAgaWQ/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICAgIC8qKlBhcmVudElkKi9cclxuICAgICAgICBwYXJlbnRJZD86IHN0cmluZyB8IG51bGw7XHJcbiAgICAgICAgbWFpbklkPzogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgICBsZXZlbD86IG51bWJlciB8IG51bGw7XHJcbiAgICAgICAgY250PzogbnVtYmVyIHwgbnVsbDtcclxuICAgICAgICBpeHA/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICAgIC8qKkRCQ09MVU1OOlNlem5hbS5yb2sqL1xyXG4gICAgICAgIHJvaz86IG51bWJlciB8IG51bGw7XHJcbiAgICAgICAgLyoqREJDT0xVTU46U2V6bmFtLmxpYyovXHJcbiAgICAgICAgbGljPzogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgICAvKipEQkNPTFVNTjpTZXpuYW0uaWNvKi9cclxuICAgICAgICBpY28/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICAgIC8qKkRCQ09MVU1OOlNlem5hbS51Y3MqL1xyXG4gICAgICAgIHVjcz86IHN0cmluZyB8IG51bGw7XHJcbiAgICAgICAgLyoqREJDT0xVTU46U2V6bmFtLm1lc2ljKi9cclxuICAgICAgICBtZXNpYz86IG51bWJlciB8IG51bGw7XHJcbiAgICAgICAgLyoqREJDT0xVTU46U2V6bmFtLmFjKi9cclxuICAgICAgICBhYz86IHN0cmluZyB8IG51bGw7XHJcbiAgICAgICAgLyoqREJDT0xVTU46U2V6bmFtLnJhZGVrX3oqL1xyXG4gICAgICAgIHJhZGVrX3o/OiBudW1iZXIgfCBudWxsO1xyXG4gICAgICAgIC8qKkRCQ09MVU1OOlNlem5hbS5pc3Bfa2FwKi9cclxuICAgICAgICBpc3Bfa2FwPzogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgICAvKipEQkNPTFVNTjpTZXpuYW0uaXNwX2ZpbSovXHJcbiAgICAgICAgaXNwX2ZpbT86IHN0cmluZyB8IG51bGw7XHJcbiAgICAgICAgLyoqREJDT0xVTU46U2V6bmFtLmlzcF9ycG8qL1xyXG4gICAgICAgIGlzcF9ycG8/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICAgIC8qKkRCQ09MVU1OOlNlem5hbS5pc3BfcGFyKi9cclxuICAgICAgICBpc3BfcGFyPzogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgICAvKipEQkNPTFVNTjpTZXpuYW0uaXNwX3pkciovXHJcbiAgICAgICAgaXNwX3pkcj86IHN0cmluZyB8IG51bGw7XHJcbiAgICAgICAgLyoqREJDT0xVTU46U2V6bmFtLmlzcF9lZHMqL1xyXG4gICAgICAgIGlzcF9lZHM/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICAgIC8qKkRCQ09MVU1OOlNlem5hbS5pc3BfdWNsKi9cclxuICAgICAgICBpc3BfdWNsPzogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgICAvKipEQkNPTFVNTjpTZXpuYW0uaXNwX3B2cyovXHJcbiAgICAgICAgaXNwX3B2cz86IHN0cmluZyB8IG51bGw7XHJcbiAgICAgICAgLyoqREJDT0xVTU46U2V6bmFtLmMwKi9cclxuICAgICAgICBjMD86IEpzb25EZWNpbWFsIHwgbnVsbDtcclxuICAgICAgICAvKipEQkNPTFVNTjpTZXpuYW0uYzEqL1xyXG4gICAgICAgIGMxPzogSnNvbkRlY2ltYWwgfCBudWxsO1xyXG4gICAgICAgIC8qKkRCQ09MVU1OOlNlem5hbS5kYXRfem1lbmEqL1xyXG4gICAgICAgIGRhdF96bWVuYT86IEpzb25EYXRlIHwgbnVsbDtcclxuICAgICAgICAvKipEQkNPTFVNTjpTZXpuYW0uem1lbnVfcHJvdiovXHJcbiAgICAgICAgem1lbnVfcHJvdj86IHN0cmluZyB8IG51bGw7XHJcbiAgICAgICAgLyoqREJDT0xVTU46U2V6bmFtLmlzcF9uZCovXHJcbiAgICAgICAgaXNwX25kPzogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgICAvKipEQkNPTFVNTjpTZXpuYW0uaXNwX3JkKi9cclxuICAgICAgICBpc3BfcmQ/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICAgIC8qKkRCQ09MVU1OOlNlem5hbS5wb3BpcyovXHJcbiAgICAgICAgcG9waXM/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICAgIC8qKkRCQ09MVU1OOlNlem5hbS5yYWRla19pc3AqL1xyXG4gICAgICAgIHJhZGVrX2lzcD86IG51bWJlciB8IG51bGw7XHJcbiAgICAgICAgLyoqREJDT0xVTU46U2V6bmFtLmlzcF96aiovXHJcbiAgICAgICAgaXNwX3pqPzogc3RyaW5nIHwgbnVsbDtcclxuICAgICAgICAvKipEQkNPTFVNTjpTZXpuYW0uaXNwX3VqKi9cclxuICAgICAgICBpc3BfdWo/OiBzdHJpbmcgfCBudWxsO1xyXG4gICAgICAgIC8qKkRCQ09MVU1OOlNlem5hbS5pc3BfdXoqL1xyXG4gICAgICAgIGlzcF91ej86IHN0cmluZyB8IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==