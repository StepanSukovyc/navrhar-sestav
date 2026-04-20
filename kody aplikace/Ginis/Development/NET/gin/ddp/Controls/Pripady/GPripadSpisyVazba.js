"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GPripadSpisyVazba.ts                   </Name>
//    <Description> Okno pro vazbu spisů na případ                              </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2025-02-17                                                  </Created>
//  </FileHeader>
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            /**
             * VAZBY SPISU K PŘÍPADU
             * Okno pro vazbu spisů na případ
             * @author Martin Hanuš
             * @copyright © GORDIC spol. s r. o. 1993-2026
             * @created 2025-02-17
             * @lastModified 2025-02-18
             */
            let GPripadSpisyVazba = class GPripadSpisyVazba extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /** Sdílené DDP methody a funkce */
                    this.ddpMethod = Ddp.WebClient.Common.Base;
                    this.maxInt32 = 2147483647;
                    //#endregion A C T I O N S - V Y T V O Ř E N Í  A  D E F I N I C E
                }
                /////////////////////////////////
                //#endregion P R O P E R T I E S 
                /**
                 * Hlavní metoda pro inicializaci okna
                 * @method onContentReady
                 */
                onContentReady() {
                    const that = this;
                    //that.id = "DDPGPripadSpisyVazba#";
                    that.createCommandBar(); // Vytvořím si commandBar
                    that.createActions(); // Vytvořím si akce
                    that.createForm(); // Vytvořím si formulář
                    that.createShortcuts(); // Vytvořím kl.zkratky
                    that.element.findForms().findFields().gfield("model", "apply", that.model); //, { initialValues: true })
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
                                that.beginOperation({ id: "opSaveContentLoading", text: "Ukládám..." });
                                that.ok()
                                    .done(() => {
                                    // Uložení dat a zavření okna v případě úspěchu metody.
                                    that.endOperation({ id: "opSaveContentLoading" });
                                    that.close(true);
                                })
                                    .fail(() => {
                                    // Ukončení dialogu s načítáním v případě chyby metody.
                                    that.endOperation({ id: "opSaveContentLoading" });
                                });
                            }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Storno",
                            icon: "gi-window-close",
                            run: function () { that.close(); } // Zavření okna
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
                createDataColors() {
                    WebClient.Common.Base.GetColors();
                }
                /**
                 * Metoda pro vytvoření formuláře
                 * @method createForm()
                 * @returns {Gordic.Forms.Form} - Vrací formulář
                 */
                createForm() {
                    const that = this;
                    //const konst = Ddp.WebClient.Globals.Enums.Konst; //constanty;
                    that.form = new Gordic.Forms.Form({ name: "GDdpFormVazbaSpisu" });
                    //#region form
                    that.form
                        //.addSection({ name: "SekceFormuláře" })
                        .addRow({ label: "Identifikátor spisu", hint: "[F4] - Otevře okno pro hledání identifikátoru dokumentu a spisu" })
                        .addField("gstringbox", "w-12", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp_spis",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        disabled: (that.EditMode == 1 || that.EditMode == 2), //TODO: Podle EditMode
                        //change: function (ev, input) {}
                    })
                        .addRow("Skupina vymáhání")
                        //.addField("gselectbox", "w-3", {
                        //    name: "barva",
                        //    graphicInput: "hidden",
                        //    disabled: true,
                        //    showSelectButton: false,
                        //    customClass: Gordic.Components.GFieldAssist.ignoreClass,
                        //    data: Common.Base.GetColors(),
                        //    itemTemplate: (item) => {
                        //        //debugger;
                        //        //let item = that.findFields("barva").gfield("getValue");
                        //        if (item == that.maxInt32) return `<div style="height: 18px; border: 1px solid gray;"></div>`;
                        //        let bg = item != null ? `background-color: ${that.ddpMethod.GetHexColor(item)};` : "";
                        //        return `<div style="${bg}height: 18px; border: 1px solid gray;"></div>`;
                        //    }
                        //})
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.skupinaVymahani(), {
                        name: "ixs_skv",
                        model: "model.ixs_skv = value.ixs_skv",
                        dropdown: true,
                        graphicInput: "hidden",
                        defaultValue: { ixs_skv: that.nullSkv },
                        customClass: Gordic.Components.GFieldAssist.ignoreClass,
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        disabled: (that.EditMode == 1), //TODO: Podle EditMode
                        //var ddpsskvFilter = (that.Params.ddp_vym_pouskv == 1) ? { aktivita: 100, dostupne: true, ixs_skv: that.nullSkv } : { aktivita: 100, dostupne: true };
                        //TODO: Zjistit jak funguje podmínka s parametrem ddp_vym_pouskv - dle všeho bych to měl mít správně ale v porovnání s TK to nesouhlasí
                        serverFilters: {
                            aktivita: 100,
                            dostupne: true,
                            //ixs_skv: () => {
                            //    //that.skvparamchange();
                            //    if (that.Params.ddp_vym_pouskv == 1)
                            //        return that.nullSkv;
                            //}
                        },
                        change: function (ev, input) {
                            that.findFields("ixs_skv").gfield("option", "tooltip", input.value?.nazev ?? "");
                        },
                        itemTemplate: (data) => {
                            //debugger;
                            let item = data?.barva;
                            //let item = that.findFields("barva").gfield("getValue");
                            //if (item == that.maxInt32) return `<div style="height: 18px; border: 1px solid gray;"></div>`;
                            let bg = item != null ? `background-color: ${that.ddpMethod.GetHexColor(item)};` : "";
                            return `<div style="display: flex; align-items: center;"><div style="${bg} height: 18px; width: 18px; border: 1px solid gray; margin-right: 5px;"></div>${data?.nazev}</div>`;
                            //return `<div style="${bg}height: 18px; width: 18px; border: 1px solid gray;">${data?.nazev}</div>`;
                        }
                    })
                        .addRow("Poznámka")
                        .addField("gstringbox", "w-12", {
                        name: "poznamka",
                        change: function (ev, input) { }
                    });
                    //#endregion
                    that.defaultForm = $("<div>").appendTo(that.element).gform("createFrom", that.form);
                    return that.form;
                }
                /** Metoda pro vytvoření kl. zkratek */
                createShortcuts() {
                    const that = this;
                    that.findForms("GDdpFormVazbaSpisu").findFields("ixp_spis").gshortcut({
                        key: "F4", //klávesová zkratka
                        description: "Otevře okno pro hledání identifikátoru dokumentu a spisu",
                        group: Gordic.Shortcuts.Groups.Field, //Skupina, do které klávesová zkratka patří - (fieldy=políčka).
                        disabled: (that.EditMode == 1 || that.EditMode == 2), //TODO: Podle EditMode
                        //enabled: that.EditMode == 0,
                        action: that.actions.add({
                            name: "openGHledatIdentDokSpisDlg",
                            disabled: (that.EditMode == 1 || that.EditMode == 2), //TODO: Podle EditMode
                            run: () => {
                                //debugger;
                                Gordic.Wfl.Dialogs.GHledatIdentDokSpisDlg(that)
                                    .done(function (retVal) {
                                    //debugger;
                                    if (retVal == null)
                                        return;
                                    that.element.findForms().findFields("ixp_spis").gfield("setValue", retVal.ixp);
                                });
                            }
                        }),
                    });
                }
                //#endregion S E S T A V E N Í   O K N A
                //#region A C T I O N S - V Y T V O Ř E N Í  A  D E F I N I C E
                /**
                 * Vytvoří tlačítko nad seznamem kontrol
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
                 * Metoda po kliknutí na tlačítko OK
                 * @method ok()
                 * @returns {JQueryPromise<void>} - Vrací promise <Ukončení metody void>
                 */
                ok() {
                    const that = this;
                    var def = $.Deferred();
                    // sebrání hodnot z formuláře
                    let formData = that.model;
                    that.findFields().gfield("model", "collect", formData);
                    var saveTaskMode;
                    switch (that.EditMode) {
                        case 1: // EditMode = 1 - Detail vazby 
                            saveTaskMode = that.ulozitDetailVazby(formData);
                            break;
                        case 2: // EditMode = 2 - Nový spis
                            saveTaskMode = that.novySpis(formData);
                            break;
                        default: // EditMode = 0 - Přidat spis
                            saveTaskMode = that.pridatSpis(formData);
                            break;
                    }
                    saveTaskMode
                        .done(() => {
                        def.resolve();
                    })
                        .fail(() => {
                        def.reject();
                    });
                    return def.promise();
                }
                /**
                 * Metoda pro uložení detailu vazby (EditMode = 1)
                 * @method ulozitDetailVazby()
                 * @param {Interface.GPripadSpisyDto} input - Vstupní data
                 * @returns {JQueryPromise<void>} - Vrací promise <Ukončení metody void>
                 */
                ulozitDetailVazby(input) {
                    const that = this;
                    var def = $.Deferred();
                    that.isl.PripadSpisy.ulozitDetailVazby({ data: input })
                        .get()
                        .done(function (ret) {
                        that.ddpMethod.setNotificationAfterOperation(that, "actGUlozitDetailVazbyOp", ret.result.errors[0].message);
                        def.resolve();
                    })
                        .fail(function (jqXHR, typ, obj) {
                        if (typ === "exception") {
                            obj.handled = true;
                            that.dialogs.error("Chyba", obj.baseMessage)
                                .on("close", (ev, retVal) => {
                                def.reject();
                            });
                        }
                        else {
                            def.reject();
                        }
                    });
                    return def.promise();
                }
                /**
                 * Metoda pro nový spis (EditMode = 2)
                 * @method novySpis()
                 * @param {Interface.GPripadSpisyDto} input - Vstupní data
                 * @returns {JQueryPromise<void>} - Vrací promise <Ukončení metody void>
                 */
                novySpis(input) {
                    const that = this;
                    var def = $.Deferred();
                    // 27.2. Přidáno kvůli vytváření nového spisu
                    // TODO: zjistit zda nebudu potřebovat typ pohledávky případu (?)
                    input.typPhl = that.TypPhl;
                    that.isl.PripadSpisy.novySpis({ data: input })
                        .get()
                        .done(function (ret) {
                        that.ddpMethod.setNotificationAfterOperation(that, "actGUlozitDetailVazbyOp", ret.result.errors[0].message);
                        def.resolve();
                    })
                        .fail(function (jqXHR, typ, obj) {
                        that.ddpMethod.getFailFromIslPromise(that, jqXHR, typ, obj)
                            .done(() => { def.reject(); }) // Toto by nemělo nikdy nastat - ale pro jistotku to tu takto taky přídám :D
                            .fail(() => { def.reject(); });
                        //if (typ === "exception") {
                        //    obj.handled = true;
                        //    if (obj.baseType == 'Gordic.General.GFatalSplException')
                        //        obj.baseMessage = that.tryParseErrorMessage(obj.baseMessage);
                        //    that.dialogs.error("Chyba", obj.baseMessage)
                        //        .on("close", (ev, retVal) => {
                        //            def.reject();
                        //        });
                        //}
                        //else {
                        //    def.reject();
                        //}
                    });
                    return def.promise();
                }
                /**
                 * Metoda pro přidání spisu (EditMode = 0)
                 * @method pridatSpis()
                 * @param {Interface.GPripadSpisyDto} input - Vstupní data
                 * @returns {JQueryPromise<void>} - Vrací promise <Ukončení metody void>
                 */
                pridatSpis(input) {
                    const that = this;
                    var def = $.Deferred();
                    that.jeSpisNapojenNaJinyPripad(input.ixp, input.ixp_spis)
                        .done(() => {
                        that.isl.PripadSpisy.pridatSpis({ data: input })
                            .get()
                            .done(function (ret) {
                            that.ddpMethod.setNotificationAfterOperation(that, "actGUlozitDetailVazbyOp", ret.result.errors[0].message);
                            def.resolve();
                        })
                            .fail(function (jqXHR, typ, obj) {
                            if (typ === "exception") {
                                obj.handled = true;
                                that.dialogs.error("Chyba", obj.baseMessage)
                                    .on("close", (ev, retVal) => {
                                    def.reject();
                                });
                            }
                            else {
                                def.reject();
                            }
                        });
                        def.resolve();
                    })
                        .fail(() => {
                        def.reject();
                    });
                    return def.promise();
                }
                /**
                 * Metoda pro zjištění zda je spis napojen na jiný případ
                 * @method jeSpisNapojenNaJinyPripad()
                 * @param {string} i_ixp - PID případu
                 * @param {string} i_ixp_spis - PID spisu
                 * @returns {JQueryPromise<void>} - Vrací promise <Ukončení metody void>
                 */
                jeSpisNapojenNaJinyPripad(i_ixp, i_ixp_spis) {
                    const that = this;
                    var def = $.Deferred();
                    // zkontroluju jestli neni spis napojenej nekam jinam
                    that.isl.PripadSpisy.jeSpisNapojenNaJinyPripad(rq => { return { ixp: i_ixp, ixp_spis: i_ixp_spis }; })
                        .get()
                        .done((data) => {
                        if (data) {
                            that.dialogs.confirm("Vybraný spis je již napojen na jiný případ!", "Opravdu chcete vybraný spis připojit k tomuto případu?")
                                .on("close", (ev, retVal) => {
                                if (retVal === "yes") {
                                    def.resolve();
                                }
                                else
                                    def.reject();
                            });
                        }
                        else {
                            def.resolve();
                        }
                    })
                        .fail(() => {
                        def.reject();
                    });
                    return def.promise();
                }
            };
            GPripadSpisyVazba = __decorate([
                Decorators.gcontent
            ], GPripadSpisyVazba);
            WebClient.GPripadSpisyVazba = GPripadSpisyVazba;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
///**
//* Metoda pro uložení dat z obsahu
//* @method ulozit()
//* @returns {JQueryPromise<void>} - Vrací promise <Ukončení metody void>
//*/
//ulozit(): JQueryPromise < void> {
//    const that = this;
//    //var def = $.Deferred<void>();                                            // Vytvoření promisu
//    //that.beginOperation({ id: "opSaveContentLoading", text: "Ukládám..." }); // Zobrazení dialogu s načítáním
//    //that.isl.NazevTridyISLu.islMetodaProUlozeni({ data: dataKuloženi })      // Zavolání ISL metody k uložení dat lhůty
//    //    .get()
//    //    .done(function (ret) {                                               // V případě úspěchu
//    //        that.endOperation({ id: "opSaveContentLoading" });               // Ukončení dialogu s načítáním
//    //        return def.resolve();                                            // Vrací promise_resolve = úspěch
//    //    })
//    //    .fail(function (jqXHR, typ, obj) {                                   // V případě chyby
//    //        that.endOperation({ id: "opSaveContentLoading" });               // Ukončení dialogu s načítáním
//    //        if (typ === "exception") {                                       // V případě výjimky
//    //            obj.handled = true;                                          // Nastavení výjimky jako ošetřené
//    //            that.dialogs.error("Chyba", obj.baseMessage)                 // Zobrazení dialogu s chybou
//    //                .on("close", (ev, retVal) => {                           // Po zavření dialogu
//    //                    return def.reject();                                 // Vrací promise_reject = chyba
//    //                });
//    //        }
//    //        else { return def.reject(); }                                    // Vrací promise_reject = chyba (i když se nejedná o ošetřenou vyjímku)
//    //    });
//    //return def.promise();                                                    // Vrací promise
//    return $.Deferred<void>().resolve().promise(); // Jestliže není potřeba volat ISL metodu, vracím zde rovnou promise + resolve
//}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1ByaXBhZFNwaXN5VmF6YmEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUHJpcGFkU3Bpc3lWYXpiYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCO0FBQ2pCLElBQVUsTUFBTSxDQStZZjtBQS9ZRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0ErWW5CO0lBL1lnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0ErWTdCO1FBL1lvQixXQUFBLFNBQVM7WUFDMUI7Ozs7Ozs7ZUFPRztZQUVILElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsT0FBQSxZQUFZO2dCQUFuRDs7b0JBMkJJLG1DQUFtQztvQkFDbkMsY0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFJN0IsYUFBUSxHQUFXLFVBQVUsQ0FBQztvQkFtV3ZDLGtFQUFrRTtnQkFDdEUsQ0FBQztnQkFuV0csaUNBQWlDO2dCQUNqQyxpQ0FBaUM7Z0JBRWpDOzs7bUJBR0c7Z0JBQ0gsY0FBYztvQkFDVixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLG9DQUFvQztvQkFDcEMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyx5QkFBeUI7b0JBQ2xELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFJLG1CQUFtQjtvQkFDNUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQU8sdUJBQXVCO29CQUNoRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBRSxzQkFBc0I7b0JBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxD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QztnQkFDekIsQ0FBQzthQUlKLENBQUE7WUFwWVksaUJBQWlCO2dCQUQ3QixVQUFVLENBQUMsUUFBUTtlQUNQLGlCQUFpQixDQW9ZN0I7WUFwWVksMkJBQWlCLG9CQW9ZN0IsQ0FBQTtRQUNMLENBQUMsRUEvWW9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQStZN0I7SUFBRCxDQUFDLEVBL1lnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUErWW5CO0FBQUQsQ0FBQyxFQS9ZUyxNQUFNLEtBQU4sTUFBTSxRQStZZjtBQUNELEtBQUs7QUFDTCxtQ0FBbUM7QUFDbkMsb0JBQW9CO0FBQ3BCLHlFQUF5RTtBQUN6RSxJQUFJO0FBQ0osbUNBQW1DO0FBQ25DLHdCQUF3QjtBQUN4QixxR0FBcUc7QUFDckcsaUhBQWlIO0FBQ2pILDJIQUEySDtBQUMzSCxrQkFBa0I7QUFDbEIscUdBQXFHO0FBQ3JHLGdIQUFnSDtBQUNoSCxrSEFBa0g7QUFDbEgsY0FBYztBQUNkLG1HQUFtRztBQUNuRyxnSEFBZ0g7QUFDaEgscUdBQXFHO0FBQ3JHLG1IQUFtSDtBQUNuSCw4R0FBOEc7QUFDOUcsc0dBQXNHO0FBQ3RHLGdIQUFnSDtBQUNoSCwyQkFBMkI7QUFDM0IsaUJBQWlCO0FBQ2pCLHdKQUF3SjtBQUN4SixlQUFlO0FBQ2YsaUdBQWlHO0FBQ2pHLG1JQUFtSTtBQUNuSSxHQUFHIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxyXG4vLyAgICA8TmFtZT4gICAgICAgIEdvcmRpYy5EZHAuV2ViQ2xpZW50LkdQcmlwYWRTcGlzeVZhemJhLnRzICAgICAgICAgICAgICAgICAgIDwvTmFtZT5cclxuLy8gICAgPERlc2NyaXB0aW9uPiBPa25vIHBybyB2YXpidSBzcGlzxa8gbmEgcMWZw61wYWQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0Rlc2NyaXB0aW9uPlxyXG4vLyAgICA8QXV0aG9yPiAgICAgIEhhbnVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXV0aG9yPlxyXG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNSAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cclxuLy8gICAgPENyZWF0ZWQ+ICAgICAyMDI1LTAyLTE3ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NyZWF0ZWQ+XHJcbi8vICA8L0ZpbGVIZWFkZXI+XHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIFZBWkJZIFNQSVNVIEsgUMWYw41QQURVXHJcbiAgICAgKiBPa25vIHBybyB2YXpidSBzcGlzxa8gbmEgcMWZw61wYWQgICBcclxuICAgICAqIEBhdXRob3IgTWFydGluIEhhbnXFoVxyXG4gICAgICogQGNvcHlyaWdodCDCqSBHT1JESUMgc3BvbC4gcyByLiBvLiAxOTkzLTIwMjZcclxuICAgICAqIEBjcmVhdGVkIDIwMjUtMDItMTdcclxuICAgICAqIEBsYXN0TW9kaWZpZWQgMjAyNS0wMi0xOFxyXG4gICAgICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdQcmlwYWRTcGlzeVZhemJhIGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIFAgUiBPIFAgRSBSIFQgSSBFIFNcclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvKiogUElEIFDFmcOtcGFkdSAqL1xyXG4gICAgICAgIHByaXZhdGUgSXhwOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFBJRCBza3VwaW55IHZ5bcOhaMOhbsOtICovXHJcbiAgICAgICAgcHJpdmF0ZSBJeHNTa3Y6IHN0cmluZztcclxuICAgICAgICAvKiogUElEIHNwaXN1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBJeHBTcGlzOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFR5cCBwb2hsZWTDoXZreSAoeiBla29wYXJhbXMpICovIC8vIDI3LjIuIFDFmWlkw6FubyBrdsWvbGkgdnl0dsOhxZllbsOtIG5vdsOpaG8gc3Bpc3VcclxuICAgICAgICBwcml2YXRlIFR5cFBobDogc3RyaW5nOyAvL1RPRE86IHpqaXN0aXQgemRhIG5lYnVkdSBwb3TFmWVib3ZhdCB0eXAgcG9obGVkw6F2a3kgcMWZw61wYWR1ICg/KVxyXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgIC8qKiBEVE8gKi9cclxuICAgICAgICBwcml2YXRlIG1vZGVsOiBEZHAuSW50ZXJmYWNlLkdQcmlwYWRTcGlzeUR0bztcclxuICAgICAgICAvKiogUGFyYW1ldHJ5ICovXHJcbiAgICAgICAgcHJpdmF0ZSBQYXJhbXM6IERkcC5JbnRlcmZhY2UuR0RkcFBhcmFtZXRyeUR0bztcclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvKiogR3JpZCAoc2V6bmFtKSAgIFxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnk8Pn0gKi9cclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqIFrDoWtsYWRuw60gZm9ybXVsw6HFmSBcclxuICAgICAgICAgKiBAdHlwZSB7R29yZGljLkZvcm1zLkZvcm19ICovXHJcbiAgICAgICAgcHJpdmF0ZSBmb3JtOiBHb3JkaWMuRm9ybXMuRm9ybTtcclxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgICAgICAvKiogRWRpdE1vZGUgKCAxIC0gRGV0YWlsIHZhemJ5IHwgMiAtIE5vdsO9IHNwaXMgfCAwIC0gUMWZaWRhdCBzcGlzKSAqL1xyXG4gICAgICAgIHByaXZhdGUgRWRpdE1vZGU6IG51bWJlcjtcclxuICAgICAgICAvKiogU2TDrWxlbsOpIEREUCBtZXRob2R5IGEgZnVua2NlICovXHJcbiAgICAgICAgZGRwTWV0aG9kID0gRGRwLldlYkNsaWVudC5Db21tb24uQmFzZTtcclxuICAgICAgICAvLy8qKiBHbG9iw6FsbsOtIGtvbnN0YW50eSAqL1xyXG4gICAgICAgIC8vS29uc3QgPSBEZHAuV2ViQ2xpZW50Lkdsb2JhbHMuRW51bXMuS29uc3RcclxuICAgICAgICByZWFkb25seSBudWxsU2t2OiBzdHJpbmc7XHJcbiAgICAgICAgcmVhZG9ubHkgbWF4SW50MzI6IG51bWJlciA9IDIxNDc0ODM2NDc7XHJcbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIFAgUiBPIFAgRSBSIFQgSSBFIFMgXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhsYXZuw60gbWV0b2RhIHBybyBpbmljaWFsaXphY2kgb2tuYVxyXG4gICAgICAgICAqIEBtZXRob2Qgb25Db250ZW50UmVhZHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vdGhhdC5pZCA9IFwiRERQR1ByaXBhZFNwaXN5VmF6YmEjXCI7XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlQ29tbWFuZEJhcigpOyAvLyBWeXR2b8WZw61tIHNpIGNvbW1hbmRCYXJcclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7ICAgIC8vIFZ5dHZvxZnDrW0gc2kgYWtjZVxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUZvcm0oKTsgICAgICAgLy8gVnl0dm/FmcOtbSBzaSBmb3JtdWzDocWZXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlU2hvcnRjdXRzKCk7ICAvLyBWeXR2b8WZw61tIGtsLnprcmF0a3lcclxuICAgICAgICAgICAgdGhhdC5lbGVtZW50LmZpbmRGb3JtcygpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQubW9kZWwpIC8vLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBTIEUgUyBUIEEgViBFIE4gw40gICBPIEsgTiBBIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gY29tbWFuZCBiYXJ1IHMgdGxhxI3DrXRreSBwcm8gdWxvxb5lbsOtIGEgemF2xZllbsOtIG9rbmFcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUNvbW1hbmRCYXIoKVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNyZWF0ZUNvbW1hbmRCYXIoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoW1xyXG4gICAgICAgICAgICAgICAgbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2tcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWZsb3BweS1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJvcFNhdmVDb250ZW50TG9hZGluZ1wiLCB0ZXh0OiBcIlVrbMOhZMOhbS4uLlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9rKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVbG/FvmVuw60gZGF0IGEgemF2xZllbsOtIG9rbmEgdiBwxZnDrXBhZMSbIMO6c3DEm2NodSBtZXRvZHkuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJvcFNhdmVDb250ZW50TG9hZGluZ1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2xvc2UodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVa29uxI1lbsOtIGRpYWxvZ3UgcyBuYcSNw610w6Fuw61tIHYgcMWZw61wYWTEmyBjaHlieSBtZXRvZHkuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJvcFNhdmVDb250ZW50TG9hZGluZ1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3Rvcm5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS13aW5kb3ctY2xvc2VcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5jbG9zZSgpOyB9IC8vIFphdsWZZW7DrSBva25hXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIodGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RTYXZlIVwiLCBcImFjdENsb3NlXCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVEYXRhQ29sb3JzKCkge1xyXG4gICAgICAgICAgICBDb21tb24uQmFzZS5HZXRDb2xvcnMoKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGZvcm11bMOhxZllIFxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlRm9ybSgpXHJcbiAgICAgICAgICogQHJldHVybnMge0dvcmRpYy5Gb3Jtcy5Gb3JtfSAtIFZyYWPDrSBmb3JtdWzDocWZXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vY29uc3Qga29uc3QgPSBEZHAuV2ViQ2xpZW50Lkdsb2JhbHMuRW51bXMuS29uc3Q7IC8vY29uc3RhbnR5O1xyXG4gICAgICAgICAgICB0aGF0LmZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIkdEZHBGb3JtVmF6YmFTcGlzdVwiIH0pO1xyXG4gICAgICAgICAgICAvLyNyZWdpb24gZm9ybVxyXG4gICAgICAgICAgICB0aGF0LmZvcm1cclxuICAgICAgICAgICAgICAgIC8vLmFkZFNlY3Rpb24oeyBuYW1lOiBcIlNla2NlRm9ybXVsw6HFmWVcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcIklkZW50aWZpa8OhdG9yIHNwaXN1XCIsIGhpbnQ6IFwiW0Y0XSAtIE90ZXbFmWUgb2tubyBwcm8gaGxlZMOhbsOtIGlkZW50aWZpa8OhdG9ydSBkb2t1bWVudHUgYSBzcGlzdVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCBQcmVmYWJzLlN0cmluZy5peHModHJ1ZSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9zcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogKHRoYXQuRWRpdE1vZGUgPT0gMSB8fCB0aGF0LkVkaXRNb2RlID09IDIpLCAvL1RPRE86IFBvZGxlIEVkaXRNb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHt9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlNrdXBpbmEgdnltw6Fow6Fuw61cIilcclxuICAgICAgICAgICAgICAgIC8vLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctM1wiLCB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcImJhcnZhXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBncmFwaGljSW5wdXQ6IFwiaGlkZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHNob3dTZWxlY3RCdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY3VzdG9tQ2xhc3M6IEdvcmRpYy5Db21wb25lbnRzLkdGaWVsZEFzc2lzdC5pZ25vcmVDbGFzcyxcclxuICAgICAgICAgICAgICAgIC8vICAgIGRhdGE6IENvbW1vbi5CYXNlLkdldENvbG9ycygpLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgaXRlbVRlbXBsYXRlOiAoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgLy9sZXQgaXRlbSA9IHRoYXQuZmluZEZpZWxkcyhcImJhcnZhXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGlmIChpdGVtID09IHRoYXQubWF4SW50MzIpIHJldHVybiBgPGRpdiBzdHlsZT1cImhlaWdodDogMThweDsgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcIj48L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGxldCBiZyA9IGl0ZW0gIT0gbnVsbCA/IGBiYWNrZ3JvdW5kLWNvbG9yOiAke3RoYXQuZGRwTWV0aG9kLkdldEhleENvbG9yKGl0ZW0pfTtgIDogXCJcIjtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gYDxkaXYgc3R5bGU9XCIke2JnfWhlaWdodDogMThweDsgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcIj48L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBcInctMTJcIiwgUHJlZmFicy5TZWxlY3Quc2t1cGluYVZ5bWFoYW5pKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19za3ZcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfc2t2ID0gdmFsdWUuaXhzX3NrdlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyYXBoaWNJbnB1dDogXCJoaWRkZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHsgaXhzX3NrdjogdGhhdC5udWxsU2t2IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IEdvcmRpYy5Db21wb25lbnRzLkdGaWVsZEFzc2lzdC5pZ25vcmVDbGFzcyxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAodGhhdC5FZGl0TW9kZSA9PSAxKSwgLy9UT0RPOiBQb2RsZSBFZGl0TW9kZVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIGRkcHNza3ZGaWx0ZXIgPSAodGhhdC5QYXJhbXMuZGRwX3Z5bV9wb3Vza3YgPT0gMSkgPyB7IGFrdGl2aXRhOiAxMDAsIGRvc3R1cG5lOiB0cnVlLCBpeHNfc2t2OiB0aGF0Lm51bGxTa3YgfSA6IHsgYWt0aXZpdGE6IDEwMCwgZG9zdHVwbmU6IHRydWUgfTtcclxuICAgICAgICAgICAgICAgICAgICAvL1RPRE86IFpqaXN0aXQgamFrIGZ1bmd1amUgcG9kbcOtbmthIHMgcGFyYW1ldHJlbSBkZHBfdnltX3BvdXNrdiAtIGRsZSB2xaFlaG8gYnljaCB0byBtxJtsIG3DrXQgc3Byw6F2bsSbIGFsZSB2IHBvcm92bsOhbsOtIHMgVEsgdG8gbmVzb3VobGFzw61cclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdGl2aXRhOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvc3R1cG5lOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2l4c19za3Y6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy90aGF0LnNrdnBhcmFtY2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICh0aGF0LlBhcmFtcy5kZHBfdnltX3BvdXNrdiA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHRoYXQubnVsbFNrdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiaXhzX3NrdlwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJ0b29sdGlwXCIsIGlucHV0LnZhbHVlPy5uYXpldiA/PyBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBkYXRhPy5iYXJ2YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sZXQgaXRlbSA9IHRoYXQuZmluZEZpZWxkcyhcImJhcnZhXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmIChpdGVtID09IHRoYXQubWF4SW50MzIpIHJldHVybiBgPGRpdiBzdHlsZT1cImhlaWdodDogMThweDsgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcIj48L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmcgPSBpdGVtICE9IG51bGwgPyBgYmFja2dyb3VuZC1jb2xvcjogJHt0aGF0LmRkcE1ldGhvZC5HZXRIZXhDb2xvcihpdGVtKX07YCA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7XCI+PGRpdiBzdHlsZT1cIiR7Ymd9IGhlaWdodDogMThweDsgd2lkdGg6IDE4cHg7IGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7IG1hcmdpbi1yaWdodDogNXB4O1wiPjwvZGl2PiR7ZGF0YT8ubmF6ZXZ9PC9kaXY+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gYDxkaXYgc3R5bGU9XCIke2JnfWhlaWdodDogMThweDsgd2lkdGg6IDE4cHg7IGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XCI+JHtkYXRhPy5uYXpldn08L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG96bsOhbWthXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhhdC5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgdGhhdC5mb3JtKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuZm9ybTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60ga2wuIHprcmF0ZWsgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVNob3J0Y3V0cygpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKFwiR0RkcEZvcm1WYXpiYVNwaXN1XCIpLmZpbmRGaWVsZHMoXCJpeHBfc3Bpc1wiKS5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcIkY0XCIsIC8va2zDoXZlc292w6EgemtyYXRrYVxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiT3RldsWZZSBva25vIHBybyBobGVkw6Fuw60gaWRlbnRpZmlrw6F0b3J1IGRva3VtZW50dSBhIHNwaXN1XCIsXHJcbiAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuRmllbGQsIC8vU2t1cGluYSwgZG8ga3RlcsOpIGtsw6F2ZXNvdsOhIHprcmF0a2EgcGF0xZnDrSAtIChmaWVsZHk9cG9sw63EjWthKS5cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiAodGhhdC5FZGl0TW9kZSA9PSAxIHx8IHRoYXQuRWRpdE1vZGUgPT0gMiksIC8vVE9ETzogUG9kbGUgRWRpdE1vZGVcclxuICAgICAgICAgICAgICAgIC8vZW5hYmxlZDogdGhhdC5FZGl0TW9kZSA9PSAwLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnMuYWRkKHsgLy9ha2NlLCBrdGVyw6EgamUgc3B1xaF0xJtuYSBwbyB6bcOhxI1rbnV0w60ga29tYmluYWNlLiBQb2t1ZCBha2NlIG5lbsOtIGVuYWJsZWQsIG5lbsOtIGVuYWJsZWQgYW5pIHprcmF0a2EuXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJvcGVuR0hsZWRhdElkZW50RG9rU3Bpc0RsZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAodGhhdC5FZGl0TW9kZSA9PSAxIHx8IHRoYXQuRWRpdE1vZGUgPT0gMiksIC8vVE9ETzogUG9kbGUgRWRpdE1vZGVcclxuICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLldmbC5EaWFsb2dzLkdIbGVkYXRJZGVudERva1NwaXNEbGcodGhhdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZWxlbWVudC5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiaXhwX3NwaXNcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcmV0VmFsLml4cCApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBTIEUgUyBUIEEgViBFIE4gw40gICBPIEsgTiBBXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBBIEMgVCBJIE8gTiBTIC0gViBZIFQgViBPIMWYIEUgTiDDjSAgQSAgRCBFIEYgSSBOIEkgQyBFXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmcOtIHRsYcSNw610a28gbmFkIHNlem5hbWVtIGtvbnRyb2wgXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVBY3Rpb25zKClcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH0gLSBVa29uxI1lbsOtIG1ldG9keSB2b2lkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFphdnJpdFBvdG9ta3lDb250ZW50dVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRyeUNsb3NlQWxsU2lnbmlmaWNhbnRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgfSAgICAgICBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBvIGtsaWtudXTDrSBuYSB0bGHEjcOtdGtvIE9LXHJcbiAgICAgICAgICogQG1ldGhvZCBvaygpXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8dm9pZD59IC0gVnJhY8OtIHByb21pc2UgPFVrb27EjWVuw60gbWV0b2R5IHZvaWQ+XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb2soKTogSlF1ZXJ5UHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZDx2b2lkPigpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vIHNlYnLDoW7DrSBob2Rub3QgeiBmb3JtdWzDocWZZVxyXG4gICAgICAgICAgICBsZXQgZm9ybURhdGE6IEludGVyZmFjZS5HUHJpcGFkU3Bpc3lEdG8gPSB0aGF0Lm1vZGVsXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBmb3JtRGF0YSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2F2ZVRhc2tNb2RlOiBKUXVlcnlQcm9taXNlPHZvaWQ+O1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoYXQuRWRpdE1vZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTogLy8gRWRpdE1vZGUgPSAxIC0gRGV0YWlsIHZhemJ5IFxyXG4gICAgICAgICAgICAgICAgICAgIHNhdmVUYXNrTW9kZSA9IHRoYXQudWxveml0RGV0YWlsVmF6YnkoZm9ybURhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6IC8vIEVkaXRNb2RlID0gMiAtIE5vdsO9IHNwaXNcclxuICAgICAgICAgICAgICAgICAgICBzYXZlVGFza01vZGUgPSB0aGF0Lm5vdnlTcGlzKGZvcm1EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IC8vIEVkaXRNb2RlID0gMCAtIFDFmWlkYXQgc3Bpc1xyXG4gICAgICAgICAgICAgICAgICAgIHNhdmVUYXNrTW9kZSA9IHRoYXQucHJpZGF0U3Bpcyhmb3JtRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNhdmVUYXNrTW9kZVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHVsb8W+ZW7DrSBkZXRhaWx1IHZhemJ5IChFZGl0TW9kZSA9IDEpXHJcbiAgICAgICAgICogQG1ldGhvZCB1bG96aXREZXRhaWxWYXpieSgpXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlcmZhY2UuR1ByaXBhZFNwaXN5RHRvfSBpbnB1dCAtIFZzdHVwbsOtIGRhdGFcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTx2b2lkPn0gLSBWcmFjw60gcHJvbWlzZSA8VWtvbsSNZW7DrSBtZXRvZHkgdm9pZD5cclxuICAgICAgICAgKi9cclxuICAgICAgICB1bG96aXREZXRhaWxWYXpieShpbnB1dDogSW50ZXJmYWNlLkdQcmlwYWRTcGlzeUR0byk6IEpRdWVyeVByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQ8dm9pZD4oKTsgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5pc2wuUHJpcGFkU3Bpc3kudWxveml0RGV0YWlsVmF6YnkoeyBkYXRhOiBpbnB1dCB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kZHBNZXRob2Quc2V0Tm90aWZpY2F0aW9uQWZ0ZXJPcGVyYXRpb24odGhhdCwgXCJhY3RHVWxveml0RGV0YWlsVmF6YnlPcFwiLCByZXQucmVzdWx0LmVycm9yc1swXS5tZXNzYWdlISk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cCA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIG9iai5iYXNlTWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgeyBkZWYucmVqZWN0KCk7IH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTsgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gbm92w70gc3BpcyAoRWRpdE1vZGUgPSAyKVxyXG4gICAgICAgICAqIEBtZXRob2Qgbm92eVNwaXMoKVxyXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZXJmYWNlLkdQcmlwYWRTcGlzeUR0b30gaW5wdXQgLSBWc3R1cG7DrSBkYXRhXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8dm9pZD59IC0gVnJhY8OtIHByb21pc2UgPFVrb27EjWVuw60gbWV0b2R5IHZvaWQ+XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgbm92eVNwaXMoaW5wdXQ6IEludGVyZmFjZS5HUHJpcGFkU3Bpc3lEdG8pOiBKUXVlcnlQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkPHZvaWQ+KCk7XHJcbiAgICAgICAgICAgIC8vIDI3LjIuIFDFmWlkw6FubyBrdsWvbGkgdnl0dsOhxZllbsOtIG5vdsOpaG8gc3Bpc3VcclxuICAgICAgICAgICAgLy8gVE9ETzogemppc3RpdCB6ZGEgbmVidWR1IHBvdMWZZWJvdmF0IHR5cCBwb2hsZWTDoXZreSBwxZnDrXBhZHUgKD8pXHJcbiAgICAgICAgICAgIGlucHV0LnR5cFBobCA9IHRoYXQuVHlwUGhsO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5QcmlwYWRTcGlzeS5ub3Z5U3Bpcyh7IGRhdGE6IGlucHV0IH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRkcE1ldGhvZC5zZXROb3RpZmljYXRpb25BZnRlck9wZXJhdGlvbih0aGF0LCBcImFjdEdVbG96aXREZXRhaWxWYXpieU9wXCIsIHJldC5yZXN1bHQuZXJyb3JzWzBdLm1lc3NhZ2UhKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmRkcE1ldGhvZC5nZXRGYWlsRnJvbUlzbFByb21pc2UodGhhdCwganFYSFIsIHR5cCwgb2JqKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7IGRlZi5yZWplY3QoKTsgfSkgLy8gVG90byBieSBuZW3Em2xvIG5pa2R5IG5hc3RhdCAtIGFsZSBwcm8gamlzdG90a3UgdG8gdHUgdGFrdG8gdGFreSBwxZnDrWTDoW0gOkRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4geyBkZWYucmVqZWN0KCk7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAodHlwID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgb2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmIChvYmouYmFzZVR5cGUgPT0gJ0dvcmRpYy5HZW5lcmFsLkdGYXRhbFNwbEV4Y2VwdGlvbicpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIG9iai5iYXNlTWVzc2FnZSA9IHRoYXQudHJ5UGFyc2VFcnJvck1lc3NhZ2Uob2JqLmJhc2VNZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgb2JqLmJhc2VNZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAvL2Vsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9ICAgICAgIFxyXG5cclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogTWV0b2RhIHBybyBwxZlpZMOhbsOtIHNwaXN1IChFZGl0TW9kZSA9IDApXHJcbiAgICAgICAgICogQG1ldGhvZCBwcmlkYXRTcGlzKClcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVyZmFjZS5HUHJpcGFkU3Bpc3lEdG99IGlucHV0IC0gVnN0dXBuw60gZGF0YVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPHZvaWQ+fSAtIFZyYWPDrSBwcm9taXNlIDxVa29uxI1lbsOtIG1ldG9keSB2b2lkPlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaWRhdFNwaXMoaW5wdXQ6IEludGVyZmFjZS5HUHJpcGFkU3Bpc3lEdG8pOiBKUXVlcnlQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkPHZvaWQ+KCk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmplU3Bpc05hcG9qZW5OYUppbnlQcmlwYWQoaW5wdXQuaXhwISwgaW5wdXQuaXhwX3NwaXMhKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlByaXBhZFNwaXN5LnByaWRhdFNwaXMoeyBkYXRhOiBpbnB1dCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZHBNZXRob2Quc2V0Tm90aWZpY2F0aW9uQWZ0ZXJPcGVyYXRpb24odGhhdCwgXCJhY3RHVWxveml0RGV0YWlsVmF6YnlPcFwiLCByZXQucmVzdWx0LmVycm9yc1swXS5tZXNzYWdlISk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIG9iai5iYXNlTWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHsgZGVmLnJlamVjdCgpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB6amnFoXTEm27DrSB6ZGEgamUgc3BpcyBuYXBvamVuIG5hIGppbsO9IHDFmcOtcGFkIFxyXG4gICAgICAgICAqIEBtZXRob2QgamVTcGlzTmFwb2plbk5hSmlueVByaXBhZCgpXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGlfaXhwIC0gUElEIHDFmcOtcGFkdVxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpX2l4cF9zcGlzIC0gUElEIHNwaXN1XHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8dm9pZD59IC0gVnJhY8OtIHByb21pc2UgPFVrb27EjWVuw60gbWV0b2R5IHZvaWQ+XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgamVTcGlzTmFwb2plbk5hSmlueVByaXBhZChpX2l4cDogc3RyaW5nLCBpX2l4cF9zcGlzOiBzdHJpbmcpOiBKUXVlcnlQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZWYgPSAkLkRlZmVycmVkPHZvaWQ+KCk7XHJcbiAgICAgICAgICAgIC8vIHprb250cm9sdWp1IGplc3RsaSBuZW5pIHNwaXMgbmFwb2plbmVqIG5la2FtIGppbmFtXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlByaXBhZFNwaXN5LmplU3Bpc05hcG9qZW5OYUppbnlQcmlwYWQocnEgPT4geyByZXR1cm4geyBpeHA6IGlfaXhwLCBpeHBfc3BpczogaV9peHBfc3BpcyB9IH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJWeWJyYW7DvSBzcGlzIGplIGppxb4gbmFwb2plbiBuYSBqaW7DvSBwxZnDrXBhZCFcIiwgXCJPcHJhdmR1IGNoY2V0ZSB2eWJyYW7DvSBzcGlzIHDFmWlwb2ppdCBrIHRvbXV0byBwxZnDrXBhZHU/XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTsgXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb24gQSBDIFQgSSBPIE4gUyAtIFYgWSBUIFYgTyDFmCBFIE4gw40gIEEgIEQgRSBGIEkgTiBJIEMgRVxyXG4gICAgfVxyXG59XHJcbi8vLyoqXHJcbi8vKiBNZXRvZGEgcHJvIHVsb8W+ZW7DrSBkYXQgeiBvYnNhaHVcclxuLy8qIEBtZXRob2QgdWxveml0KClcclxuLy8qIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPHZvaWQ+fSAtIFZyYWPDrSBwcm9taXNlIDxVa29uxI1lbsOtIG1ldG9keSB2b2lkPlxyXG4vLyovXHJcbi8vdWxveml0KCk6IEpRdWVyeVByb21pc2UgPCB2b2lkPiB7XHJcbi8vICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4vLyAgICAvL3ZhciBkZWYgPSAkLkRlZmVycmVkPHZvaWQ+KCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXR2b8WZZW7DrSBwcm9taXN1XHJcbi8vICAgIC8vdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcIm9wU2F2ZUNvbnRlbnRMb2FkaW5nXCIsIHRleHQ6IFwiVWtsw6Fkw6FtLi4uXCIgfSk7IC8vIFpvYnJhemVuw60gZGlhbG9ndSBzIG5hxI3DrXTDoW7DrW1cclxuLy8gICAgLy90aGF0LmlzbC5OYXpldlRyaWR5SVNMdS5pc2xNZXRvZGFQcm9VbG96ZW5pKHsgZGF0YTogZGF0YUt1bG/FvmVuaSB9KSAgICAgIC8vIFphdm9sw6Fuw60gSVNMIG1ldG9keSBrIHVsb8W+ZW7DrSBkYXQgbGjFr3R5XHJcbi8vICAgIC8vICAgIC5nZXQoKVxyXG4vLyAgICAvLyAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWIHDFmcOtcGFkxJsgw7pzcMSbY2h1XHJcbi8vICAgIC8vICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIm9wU2F2ZUNvbnRlbnRMb2FkaW5nXCIgfSk7ICAgICAgICAgICAgICAgLy8gVWtvbsSNZW7DrSBkaWFsb2d1IHMgbmHEjcOtdMOhbsOtbVxyXG4vLyAgICAvLyAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWcmFjw60gcHJvbWlzZV9yZXNvbHZlID0gw7pzcMSbY2hcclxuLy8gICAgLy8gICAgfSlcclxuLy8gICAgLy8gICAgLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0eXAsIG9iaikgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gViBwxZnDrXBhZMSbIGNoeWJ5XHJcbi8vICAgIC8vICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIm9wU2F2ZUNvbnRlbnRMb2FkaW5nXCIgfSk7ICAgICAgICAgICAgICAgLy8gVWtvbsSNZW7DrSBkaWFsb2d1IHMgbmHEjcOtdMOhbsOtbVxyXG4vLyAgICAvLyAgICAgICAgaWYgKHR5cCA9PT0gXCJleGNlcHRpb25cIikgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFYgcMWZw61wYWTEmyB2w71qaW1reVxyXG4vLyAgICAvLyAgICAgICAgICAgIG9iai5oYW5kbGVkID0gdHJ1ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOYXN0YXZlbsOtIHbDvWppbWt5IGpha28gb8WhZXTFmWVuw6lcclxuLy8gICAgLy8gICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBvYmouYmFzZU1lc3NhZ2UpICAgICAgICAgICAgICAgICAvLyBab2JyYXplbsOtIGRpYWxvZ3UgcyBjaHlib3VcclxuLy8gICAgLy8gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHsgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQbyB6YXbFmWVuw60gZGlhbG9ndVxyXG4vLyAgICAvLyAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBWcmFjw60gcHJvbWlzZV9yZWplY3QgPSBjaHliYVxyXG4vLyAgICAvLyAgICAgICAgICAgICAgICB9KTtcclxuLy8gICAgLy8gICAgICAgIH1cclxuLy8gICAgLy8gICAgICAgIGVsc2UgeyByZXR1cm4gZGVmLnJlamVjdCgpOyB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVnJhY8OtIHByb21pc2VfcmVqZWN0ID0gY2h5YmEgKGkga2R5xb4gc2UgbmVqZWRuw6EgbyBvxaFldMWZZW5vdSB2eWrDrW1rdSlcclxuLy8gICAgLy8gICAgfSk7XHJcbi8vICAgIC8vcmV0dXJuIGRlZi5wcm9taXNlKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZyYWPDrSBwcm9taXNlXHJcbi8vICAgIHJldHVybiAkLkRlZmVycmVkPHZvaWQ+KCkucmVzb2x2ZSgpLnByb21pc2UoKTsgLy8gSmVzdGxpxb5lIG5lbsOtIHBvdMWZZWJhIHZvbGF0IElTTCBtZXRvZHUsIHZyYWPDrW0gemRlIHJvdm5vdSBwcm9taXNlICsgcmVzb2x2ZVxyXG4vL30iXX0=