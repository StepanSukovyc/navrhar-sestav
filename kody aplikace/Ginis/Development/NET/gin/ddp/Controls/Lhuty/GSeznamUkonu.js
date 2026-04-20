"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GSeznamUkonu.ts                        </Name>
//    <Description> Okno se seznamem úkonů (pro předpis)                        </Description>
//    <Author>      Hanus                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2024                            </Copyright>
//    <Created>     2024-11-07                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            /**
             * Okno se seznamem úkonů lhůty (nad předpisem)
             * @author Martin Hanuš
             * @copyright © GORDIC spol. s r. o. 1993-2024
             * @created 2024-11-07
             * @lastModified 2025-02-04
             */
            let GSeznamUkonu = class GSeznamUkonu extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    /** Pomocný obj. nastavující změny ukládání */
                    this.vybrano_zmenen = false;
                    /** Povolovač change metod formuláře */
                    this.changeAllow = false;
                    //#endregion ULOŽENÍ|ZAVŘENÍ|ZMĚNA
                }
                //#endregion  P R O P E R T I E S 
                /**
                 * Základní metoda pro nastavení contentu
                 * @method onContentReady()
                 * @returns {void} - Ukončení metody void
                 */
                onContentReady() {
                    const that = this;
                    that.createMainButtons(); // Vytvoření tlačítek command baru (dolní část okna)
                    that.createActions(); // Definice akcí okna
                    that.createMenu(); // Vytvoření horního menu s tlačítky akcí      
                    that.createForm(); // Vytvoření formuláře s políčky
                    that.createGrid(); // Vytvoření gridu
                    that.afterInit(); // Načtení dat po inítu okna
                    that.defaultForm.gform("waitForValues") // Po načteění dat do formuláře
                        .done(() => { that.changeAllow = true; }); // Aktivuju si change na formuláři
                }
                //#region SESTAVENÍ OKNA
                /**
                 * Metoda pro vytvoření základních tlačítek okna - commandbaru
                 * @method createMainButtons()
                 * @returns {void} - Ukončení metody void
                 */
                createMainButtons() {
                    const that = this;
                    that.actions.addRange([
                        new GAction({
                            name: "actSave",
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            enabled: false,
                            run: function () {
                                that.ulozit(false)
                                    .done(() => {
                                    that.NastavHodnoty(false);
                                    that.vybrano_zmenen = false;
                                });
                            }
                        }),
                        new GAction({
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: function () {
                                that.zavrit()
                                    .done(() => {
                                    that.close();
                                });
                            }
                        })
                    ]);
                    that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                }
                /**
                 * Vytvoří tlačítko nad seznamem kontrol
                 * @method createActions()
                 * @returns {void} - Ukončení metody void
                 */
                createActions() {
                    const that = this;
                    that.actions.addRange([
                        {
                            name: "actNacistSeznamUkonuLhuty",
                            caption: "Občerstvit",
                            tooltip: "Obnovit seznam úkonů",
                            run: () => {
                                const that = this;
                                that.viewUkony.requestData();
                            }
                        },
                        {
                            name: "actDetailUkonuLhuty",
                            caption: "Detail úkonu",
                            tooltip: "Detail úkonu pro běh lhůty",
                            run: () => {
                                var selection = that.grid.ggrid("getSelection")[0];
                                if (selection != null && selection.dat_od != null) {
                                    this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GNastaveniUkonu", {
                                        ID: "DDPGNastaveniUkonu#",
                                        Ixp: that.Ixp,
                                        Dat_spl: that.Dat_spl,
                                        Ktg_upo: that.Ktg_upo,
                                        Pri_uhr: that.Pri_uhr,
                                        Ixs_lhu: that.model.ixs_lhu,
                                        Dat_od: selection.dat_od,
                                        Edit: true
                                    }, `Nastavení úkonů pro běh lhůty předpisu`, 505, 600) //TODO: otestovat a nastavit velikost okna...
                                        .on("close", (ev, retVal) => {
                                        that.viewUkony.requestData();
                                    });
                                }
                            }
                        },
                        {
                            name: "actPridatUkonLhute",
                            caption: "Přidat úkon",
                            tooltip: "Přidání úkonu pro běh lhůty",
                            run: () => {
                                this.dialogs.showModalWindow("Gordic.Ddp.WebClient.GNastaveniUkonu", {
                                    ID: "DDPGNastaveniUkonu#",
                                    Ixp: that.Ixp,
                                    Dat_spl: that.Dat_spl,
                                    Ktg_upo: that.Ktg_upo,
                                    Pri_uhr: that.Pri_uhr,
                                    Ixs_lhu: that.model.ixs_lhu,
                                    Edit: false
                                }, `Nastavení úkonů pro běh lhůty předpisu`, 505, 600) //TODO: otestovat a anstavit velikost okna...      
                                    .on("close", (ev, retVal) => {
                                    that.viewUkony.requestData();
                                });
                            }
                        },
                        {
                            name: "actObnovitUkonLhuty",
                            caption: "Obnovit úkon",
                            tooltip: "Zaktivní úkon pro běh lhůty",
                            run: () => {
                                const that = this;
                                var selection = that.grid.ggrid("getSelection"); //Seznam zaškrtnutých řádků lze přečíst metodou getSelection()
                                let rq = {};
                                if (selection.length != 0) {
                                    that.beginOperation({ id: "ObnovitUkonLhuty", text: "Probíhá obnova..." });
                                    let zprava = false;
                                    selection.forEach(function (item) {
                                        if (item.aktivita != 900) {
                                            zprava = true;
                                        }
                                        ;
                                        that.isl.PredpisyUkonyLhuta.zaktivniUkon(item) //TODO - forEach by měl být na serveru
                                            .get()
                                            .done(function (ret) {
                                            that.endOperation({ id: "ObnovitUkonLhuty" });
                                            that.notification("showToast", { id: "ulozeniPredpisu", title: "Úspěšné obnovení", content: "Úkon byl onoven" });
                                            that.viewUkony.requestData();
                                        })
                                            .fail(function (jqXHR, typ, obj) {
                                            that.endOperation({ id: "ObnovitUkonLhuty" });
                                            if (typ === "exception") {
                                                obj.handled = true;
                                                that.dialogs.error("Chyba", obj.baseMessage);
                                            }
                                        });
                                    });
                                    if (zprava != false) {
                                        that.dialogs.warning("Obnovit lze pouze zrušené kontroly");
                                    }
                                }
                            }
                        },
                        {
                            name: "actZrusitUkonLhuty",
                            caption: "Zrušit úkon",
                            tooltip: "Zneaktivní úkon pro běh lhůty",
                            run: () => {
                                var selection = that.grid.ggrid("getSelection");
                                let rq = {};
                                if (selection.length != 0) {
                                    that.beginOperation({ id: "ZrusitUkonLhuty", text: "Probíhá zrušwní..." });
                                    let neakt = false;
                                    selection.forEach(function (item) {
                                        if (item.aktivita != 100) {
                                            neakt = true;
                                        }
                                        ;
                                        that.isl.PredpisyUkonyLhuta.zneaktivniUkon(item)
                                            .get() // volám skrze interface serverovou metodu smazKontrolu, dávám jí dto a volám na ní get
                                            .done(function (ret) {
                                            that.endOperation({ id: "ZrusitUkonLhuty" });
                                            that.notification("showToast", { id: "ulozeniPredpisu", title: "Úspěšné zrušení", content: "Úkon byl zrušen" });
                                            that.viewUkony.requestData();
                                            return;
                                        })
                                            .fail(function (jqXHR, typ, obj) {
                                            that.endOperation({ id: "ZrusitUkonLhuty" });
                                            if (typ === "exception") {
                                                obj.handled = true;
                                                that.dialogs.error("Chyba", obj.baseMessage);
                                            }
                                        });
                                    });
                                    if (neakt != false) {
                                        that.dialogs.warning("Zrušit lze pouze aktivní kontroly");
                                    }
                                }
                            }
                        }
                    ]);
                }
                /**
                 * Metoda pro vytvoření menu na contentu
                 * @method createMenu()
                 * @returns {void} - Ukončení metody void
                 */
                createMenu() {
                    const that = this;
                    let menu = [
                        {
                            caption: "Občerstvit",
                            tooltip: "Obnovit seznam úkonů",
                            icon: "fa-repeat",
                            favorite: true,
                            action: that.actions["actNacistSeznamUkonuLhuty"]
                        }, {
                            caption: "Detail úkonu",
                            tooltip: "Detail úkonu pro běh lhůty",
                            icon: "gi-detail",
                            favorite: true,
                            action: that.actions["actDetailUkonuLhuty"]
                        }, {
                            caption: "Přidat úkon",
                            tooltip: "Přidání úkonu pro běh lhůty",
                            icon: "gi-plus",
                            favorite: true,
                            action: that.actions["actPridatUkonLhute"]
                        }, {
                            caption: "Obnovit úkon",
                            tooltip: "Zaktivní úkon pro běh lhůty",
                            icon: "gi-refresh",
                            favorite: true,
                            action: that.actions["actObnovitUkonLhuty"]
                        }, {
                            caption: "Zrušit úkon",
                            tooltip: "Zneaktivní úkon pro běh lhůty",
                            icon: "fa-ban",
                            favorite: true,
                            action: that.actions["actZrusitUkonLhuty"]
                        },
                    ];
                    this.menuBar(menu);
                }
                /**
                 * Metoda pro vytvoření formuláře
                 * @method createForm()
                 * @returns {Gordic.Forms.Form} - Vrací formulář
                 */
                createForm() {
                    const that = this;
                    var headerForm = new Gordic.Forms.Form({ name: "ddpNastaveniSeznamuUkonu", layoutDescriptor: "L3M3S1" });
                    //#region form
                    headerForm
                        .addSection({ name: "header", layoutDescriptor: "L3M3S1" })
                        .addRow("Datum splatnosti")
                        .addField("gdatebox", {
                        name: "dat_spl", // Datum splatnosti
                        disabled: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Typ předpisu")
                        .addField("gselectbox", Gordic.Prefabs.Select.fuccupo(), {
                        name: "ktg_upo", // Typ předpisu
                        disabled: true,
                        model: "model.ktg_upo=value.ktg_upo;model.ktg_upo_txt=value.ktg_upo_txt",
                        itemTemplate: "{ktg_upo}-{ktg_upo_txt}",
                        helperColumns: ["ktg_upo", "ktg_upo_txt"],
                        dropdown: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Priorita úhrady")
                        .addField("gnumberbox", {
                        name: "pri_uhr", // Priorita úhrady
                        disabled: true,
                    })
                        .addRow()
                        .addField("gcheck", {
                        name: "zobZru",
                        label: "Zobrazit zrušené",
                        initialValue: false,
                        change: () => {
                            that.viewUkony.requestData();
                        }
                    })
                        ///////////////////////////////////////////////////////////////////////////////////////////////////
                        ///////////////////////////////////////////////////////////////////////////////////////////////////
                        .addSection({ name: "currency", layoutDescriptor: "L3M3S1" })
                        .addRow("Uhrazeno")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "sum_c_uhr", // Uhrazeno
                        disabled: true,
                        //flag: "required", validators: [new Gordic.Validators.Required()],
                        initialValue: 0,
                        //initialValue: that.uhrCastka ?? 0,
                        change: function (ev, input) { }
                    })
                        .addRow("Neuhrazeno")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "sum_c_neuhr", // Neuhrazeno
                        disabled: true,
                        //flag: "required", validators: [new Gordic.Validators.Required()],
                        //initialValue: that.neUhrCastka ?? 0,
                        initialValue: 0,
                        change: function (ev, input) { }
                    })
                        .addRow("Rozdíl")
                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                        name: "sum_c_rozdil", // Rozdíl
                        disabled: true,
                        //flag: "required", validators: [new Gordic.Validators.Required()],
                        initialValue: 0,
                        change: function (ev, input) { }
                    })
                        .addRow("Nastavení")
                        .addField("gradio", {
                        name: "rezim", // Nastavení / Režim
                        disabled: false,
                        radios: [
                            { value: 0, label: 'Výchozí' },
                            { value: 1, label: 'Vlastní' }
                        ],
                        change: function (ev, input) {
                            that.changeValue();
                        }
                    })
                        ///////////////////////////////////////////////////////////////////////////////////////////////////
                        ///////////////////////////////////////////////////////////////////////////////////////////////////
                        .addSection({ name: "main", layoutDescriptor: "L3M3S1" })
                        .addRow("Stav lhůty")
                        .addField("gselectbox", WebClient.Common.Prefabs.stavLhuty(), {
                        disabled: true,
                    })
                        .addRow("Poslední den lhůty")
                        .addField("gdatebox", {
                        name: "dat_lhuty", //Poslední den lhůty
                        disabled: true,
                        change: function (ev, input) { }
                    })
                        .addRow("Lhůta")
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpLhuta(), {
                        name: "ixs_lhu", // Lhůta  
                        dropdown: true,
                        serverFilters: { ixp: that.Ixp },
                        itemTemplate: "{nazev}",
                        model: "ixs_lhu=ixs_lhu",
                        change: function (ev, input) {
                            that.changeValue();
                        }
                    })
                        .addRow()
                        .addText(" * - již použité ");
                    //#endregion
                    that.defaultForm = $("<div>").appendTo(this.element).gform("createFrom", headerForm);
                    return headerForm;
                }
                /**
                 * Metoda pro vytvoření a definování seznamu (=gridu)
                 * @method createGrid()
                 * @returns {void} - Ukončení metody void
                 */
                createGrid() {
                    const that = this;
                    that.grid = $.newDiv()
                        .appendTo(this.element)
                        .gautofit();
                    that.grid.ggrid({
                        name: "grid",
                        defaultAction: that.actions["actDetailUkonuLhuty"],
                        defaultProfile: {
                            columnList: "dat_od, dat_do, typ_uko, poznamka, aktivita",
                            condFormats: [
                                { description: "Neaktivní", formula: 'NOT(EQUALS(@aktivita, 100))', bg: Gordic.Components.Grid.CondFormats.CondFormatBg.lightgray },
                            ]
                        },
                        columns: Ddp.WebClient.Common.GridFormats.SeznamUkonu()
                    });
                }
                //#endregion SESTAVENÍ OKNA
                //#region INICIALIZACE OKNA
                /**
                 * Metoda pro nastavení dat po inicializaci okna
                 * @method afterInit()
                 * @returns {void} - Ukončení metody void
                 */
                afterInit() {
                    const that = this;
                    that.defaultForm.findFields().gfield("model", "apply", that.model, { initialValues: true }); // Nastaveni dat modelu do políček
                    that.NastavHodnoty(true);
                    that.getGridData();
                }
                /**
                 * Funkce pro získání filtrovaných dat
                 * @method getGridData()
                 * @returns {void} - Ukončení metody void
                 */
                getGridData() {
                    const that = this;
                    //TODO: přidat nějaký if aby se vědělo zda se data mají brát z fitlru nebo natvrdo v předpisu
                    //TODO: - nejsem si jist jak multifunkční má to okno být... zatím natvrdo předávat správná a podstatná data
                    that.viewUkony = new Gordic.Isl.View(that.isl.PredpisyUkonyLhuta.list(rq => {
                        that.createFilter();
                        return {
                            filters: that.filter,
                            fragments: ["*"]
                        };
                    }));
                    that.grid.ggrid("setData", that.viewUkony);
                }
                /**
                 * Metoda pro vytvoření filtru z formuláře pro nastavení dat v gridu
                 * @method createFilter()
                 * @returns {object} - Objekt obsahující filtr
                 */
                createFilter() {
                    const that = this;
                    let zobZruValue = that.defaultForm.findForms().findFields("zobZru").gfield("getValue");
                    that.filter = {
                        ixp: that.Ixp,
                        dat_spl: that.Dat_spl,
                        ktg_upo: that.Ktg_upo,
                        pri_uhr: that.Pri_uhr,
                        zobZru: zobZruValue ?? false
                    };
                    return that.filter;
                }
                /**
                 * Metoda načítající data lhůty ze serveru
                 * @method NactiHodnotyLhuty()
                 * @returns {void} - Ukončení metody void
                 */
                NactiHodnotyLhuty() {
                    const that = this;
                    that.beginOperation({ id: "loadHodnotyLhuty", text: "Načítám hodnoty..." });
                    let input = { ixp: this.Ixp, dat_spl: this.Dat_spl, ktg_upo: this.Ktg_upo, pri_uhr: this.Pri_uhr };
                    that.isl.PredpisyUkonyLhuta.nactiHodnotyLhuty(rq => { return { data: input }; })
                        .get()
                        .done(function (data) {
                        that.endOperation({ id: "loadHodnotyLhuty" });
                        that.model = data;
                        that.NastavHodnoty(false);
                    })
                        .fail(function (jqXHR, typ, obj) {
                        that.endOperation({ id: "loadHodnotyLhuty" });
                        if (typ === "exception") {
                            obj.handled = true;
                            that.dialogs.error("Chyba", obj.baseMessage);
                        }
                    });
                }
                /**
                 * Metoda nastavující data lhůty ve formuláři
                 * @method NastavHodnoty()
                 * @param {boolean} init - Parametr určujicí zda se mají donastavit inicializační údaje
                 * @returns {void | JQuery<HTMLElement>} - ukončení mětody (void), v případě nenačtené lhůty vrací okno s chybou
                 */
                NastavHodnoty(init) {
                    const that = this;
                    const form = that.defaultForm;
                    that.beginOperation({ id: "changeHodnotyLhuty", text: "Nastavuji hodnoty..." });
                    that.changeAllow = false; // Zruším si change na formuláři
                    if (that.model.ixs_lhu == null) { // Pokud nemám PID lhůty               
                        that.nastaveniPristupnosti(false); // deaktivuju tlačítka s akcema 
                        that.changeAllow = true; // Aktivuju si change na formuláři
                        that.endOperation({ id: "changeHodnotyLhuty" });
                        return that.dialogs.error("Chyba nastavení lhůt pro typ pohledávky", "Není nastavena lhúta nebo úkon pro kategorii účetního pohybu"); // a vyhodím okno s chybou
                    }
                    else {
                        that.nastaveniPristupnosti(true); // zaktivuju tlačítka s akcema
                        form.findForms().findFields("ixs_lhu").gfield("option", "disabled", (that.model.rezim != 1)); // Deaktivace políčka lhůta
                        that.defaultForm.findFields().gfield("model", "apply", that.model, { initialValues: true }); // Nastaveni dat modelu do políček
                        //form.findFields("stav_lhuty").gfield("setValue", that.initialStavuLhuty(), { initialValues: true });    // Nastavení stavu lhůty (bez prefabu zřejmě nefunguje z modelu...
                        //form.findFields("stav_lhuty").gfield("model", "apply", that.model.stav_lhuty, { initialValues: true }); // Nastavení stavu lhůty (bez prefabu zřejmě nefunguje z modelu...
                        that.setTooltip(that.model.tooltip); // Nastavím tooltip ke stavu lhůty
                        if (init)
                            that.Ixs_lhu_old = that.model.ixs_lhu; // Pokud mám lhůtu, při initu si nastavím starou lhůtu pro ukládání...
                        that.Ixs_lhu_posl = that.model.ixs_lhu; // Taky si uložím poslední vybranou lhůtu
                        that.changeAllow = true; // Aktivuju si change na formuláři
                    }
                    that.endOperation({ id: "changeHodnotyLhuty" });
                }
                /**
                 * Metoda pro nastavení přístupnosti tlačítek akcí
                 * @method nastaveniPristupnosti()
                 * @param {boolean} zmena - Prom. určijící jak se má změnit přístupnost tlačítek
                 * @returns {void} - Ukončení metody void
                 */
                nastaveniPristupnosti(zmena) {
                    const that = this;
                    that.actions["actNacistSeznamUkonuLhuty"]?.enabled(zmena);
                    that.actions["actDetailUkonuLhuty"]?.enabled(zmena);
                    that.actions["actPridatUkonLhute"]?.enabled(zmena);
                    that.actions["actObnovitUkonLhuty"]?.enabled(zmena);
                    that.actions["actZrusitUkonLhuty"]?.enabled(zmena);
                    that.actions["actSave"]?.enabled(zmena);
                }
                /**
                 * Metoda pro nastavení tooltipu k políčku stavu lhůty
                 * @method setTooltip()
                 * @param {string} text - Text který se má nastavit
                 * @returns {void} - Ukončení metody void
                 */
                setTooltip(text) {
                    const that = this;
                    const form = that.defaultForm;
                    let tooltip = text.replace(" /n\\ ", "\n");
                    form.findFields("stav_lhuty").gfield("option", "tooltip", tooltip);
                    if (that.model.tooltip.includes("Neprovedené úkony nad lhůtou:")) {
                        let opt = { id: "vsState", text: "Neprovedené úkony", state: "error" };
                        form.findFields("stav_lhuty").gfield("option", "tag", opt);
                    }
                }
                ///** 
                // * Metoda pro nastavení políčka se stavem lhůty 
                // * @method initialStavuLhuty()
                // * @returns {object} - Vrací objekt s hodnotou stavu lhůty a jejím popisem
                // */
                //private initialStavuLhuty(): { stav_lhuty: number; popis: string } {
                //    const that = this;
                //    switch (that.model.stav_lhuty) {
                //        case 0:
                //            return { stav_lhuty: 0, popis: "Lhůta není definovaná" };
                //            break;
                //        case 1:
                //            return { stav_lhuty: 1, popis: "Lhůta není třeba (je zaplaceno)" };
                //            break;
                //        case 2:
                //            return { stav_lhuty: 2, popis: "Je před upozorněním, jsou všechna vymáhání" };
                //            break;
                //        case 3:
                //            return { stav_lhuty: 3, popis: "Je před upozorněním, nejsou všechna vymáhání" };
                //            break;
                //        case 4:
                //            return { stav_lhuty: 4, popis: "Je před vypršením lhůty, jsou všechna vymáhání" };
                //            break;
                //        case 5:
                //            return { stav_lhuty: 5, popis: "Je před vypršením lhůty, nejsou všechna vymáhání" };
                //            break;
                //        case 6:
                //            return { stav_lhuty: 6, popis: "Je po vypršením lhůty, jsou všechna vymáhání" };
                //            break;
                //        case 7:
                //            return { stav_lhuty: 7, popis: "Je po vypršením lhůty, nejsou všechna vymáhání'" };
                //            break;
                //        default:
                //            return { stav_lhuty: 0, popis: "Lhůta není definovaná" };
                //            break;
                //    }         
                //}
                //#endregion INICIALIZACE OKNA
                //#region ULOŽENÍ|ZAVŘENÍ|ZMĚNA        
                /**
                 * Pomocná metoda po změně hodnoty lhůty nebo změny režimu
                 * @method changeValue()
                 * @returns {void} - Ukončení metody void
                 */
                changeValue() {
                    const that = this;
                    if (that.changeAllow) {
                        that.vybrano_zmenen = true;
                        that.ulozit(false).done(() => { that.NastavHodnoty(false); });
                    }
                }
                /**
                 * Metoda pro uložení dat z obsahu (a zavření dialogového okna)
                 * @method ulozit()
                 * @param {boolean} ulozPuvodniHodnoty - Prom. určijící o jaké uložnení se jedná
                 * @returns {JQueryPromise<void>} - Vrací promise <Ukončení metody void>
                 */
                ulozit(ulozPuvodniHodnoty) {
                    const that = this;
                    var def = $.Deferred();
                    that.beginOperation({ id: "saveHodnotyLhuty", text: "Ukládám..." });
                    let formData = {}; // Definice objektu pro data k uložení
                    that.findFields().gfield("model", "collect", formData); // Sebrání hodnot z formuláře
                    formData.ixp = that.Ixp; // Nastavení PIDu případu
                    formData.dat_spl = that.Dat_spl; // Nastavení Datumu splatnosti
                    formData.ktg_upo = that.Ktg_upo; // Nastavení Kategorie účetního pohybu
                    formData.pri_uhr = that.Pri_uhr; // Nastavení Priority úhrady
                    formData.ixs_lhu_old = that.Ixs_lhu_old; // Nastavení IXS Lhůty při initu
                    formData.ixs_lhu_posl = that.Ixs_lhu_posl; // Nastavení IXS Lhůty která byla naposledy uložena
                    formData.ulozPuvodniHodnoty = ulozPuvodniHodnoty; // Nastavení Prom. určijící o jaké uložnení se jedná
                    that.isl.PredpisyUkonyLhuta.ulozZmenyLhuty({ data: formData }) // Zavolání ISL metody k uložení dat lhůty
                        .get()
                        .done(function (ret) {
                        that.model = ret.data;
                        that.endOperation({ id: "saveHodnotyLhuty" });
                        return def.resolve();
                    })
                        .fail(function (jqXHR, typ, obj) {
                        that.endOperation({ id: "saveHodnotyLhuty" });
                        if (typ === "exception") {
                            obj.handled = true;
                            that.dialogs.error("Chyba", obj.baseMessage)
                                .on("close", (ev, retVal) => {
                                return def.reject();
                            });
                        }
                        else {
                            return def.reject();
                        }
                    });
                    return def.promise();
                }
                /**
                 * Metoda pro zavření okna po stisknutí tlačítka
                 * @method zavrit()
                 * @returns {JQueryPromise<void>} - Vrací promise <Ukončení metody void>
                 */
                zavrit() {
                    const that = this;
                    var def = $.Deferred();
                    that.vybrano_zmenen = true;
                    that.zavirani()
                        .done(() => {
                        return def.resolve();
                    })
                        .fail(() => {
                        return def.reject();
                    });
                    return def.promise();
                }
                /**
                 * Doplňující metoda pro zavření okna s potvrzovacím dialogem
                 * @method zavirani()
                 * @returns {JQueryPromise<void>} - Vrací promise <Ukončení metody void>
                 */
                zavirani() {
                    const that = this;
                    var def = $.Deferred();
                    if (that.vybrano_zmenen) {
                        that.vybrano_zmenen = false;
                        that.dialogs.confirm("Upozornění", "Přejete si uložit provedené změny?")
                            .on("close", (ev, retVal) => {
                            if (retVal === "yes") {
                                that.ulozit(true)
                                    .done(() => {
                                    return def.resolve();
                                })
                                    .fail(() => {
                                    return def.reject();
                                });
                            }
                            else {
                                return def.resolve();
                            }
                        });
                    }
                    return def.promise();
                }
            };
            GSeznamUkonu = __decorate([
                Decorators.gcontent
            ], GSeznamUkonu);
            WebClient.GSeznamUkonu = GSeznamUkonu;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbVVrb251LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbVVrb251LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBc3JCZjtBQXRyQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBc3JCbkI7SUF0ckJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FzckI3QjtRQXRyQm9CLFdBQUEsU0FBUztZQUMxQjs7Ozs7O2VBTUc7WUFFSCxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFhLFNBQVEsT0FBQSxZQUFZO2dCQUE5Qzs7b0JBNEJJLDhDQUE4QztvQkFDdEMsbUJBQWMsR0FBWSxLQUFLLENBQUM7b0JBQ3hDLHVDQUF1QztvQkFDL0IsZ0JBQVcsR0FBWSxLQUFLLENBQUM7b0JBNG9CckMsa0NBQWtDO2dCQUN0QyxDQUFDO2dCQTVvQkcsa0NBQWtDO2dCQUVsQzs7OzttQkFJRztnQkFDSCxjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBdUIsb0RBQW9EO29CQUNwRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBMkIscUJBQXFCO29CQUNyRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBOEIsK0NBQStDO29CQUMvRixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUEsQ0FBK0IsZ0NBQWdDO29CQUNoRixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBOEIsa0JBQWtCO29CQUNsRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBK0IsNEJBQTRCO29CQUM1RSxJQUFJLENBQUMsV0FBWSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMs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Q0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7d0JBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxvQ0FBb0MsQ0FBQzs2QkFDbkUsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRTs0QkFDeEIsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFLENBQUM7Z0NBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO3FDQUNaLElBQUksQ0FBQyxHQUFHLEVBQUU7b0NBQ1AsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Z0NBQ3pCLENBQUMsQ0FBQztxQ0FDRCxJQUFJLENBQUMsR0FBRyxFQUFFO29DQUNQLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dDQUN4QixDQUFDLENBQUMsQ0FBQzs0QkFDWCxDQUFDO2lDQUNJLENBQUM7Z0NBQ0YsT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7NEJBQ3pCLENBQUM7d0JBQ0wsQ0FBQyxDQUFDLENBQUE7b0JBQ1YsQ0FBQztvQkFDRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDekIsQ0FBQzthQUVKLENBQUE7WUE1cUJZLFlBQVk7Z0JBRHhCLFVBQVUsQ0FBQyxRQUFRO2VBQ1AsWUFBWSxDQTRxQnhCO1lBNXFCWSxzQkFBWSxlQTRxQnhCLENBQUE7UUFDTCxDQUFDLEVBdHJCb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBc3JCN0I7SUFBRCxDQUFDLEVBdHJCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBc3JCbkI7QUFBRCxDQUFDLEVBdHJCUyxNQUFNLEtBQU4sTUFBTSxRQXNyQmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR1Nlem5hbVVrb251LnRzICAgICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IE9rbm8gc2Ugc2V6bmFtZW0gw7prb27FryAocHJvIHDFmWVkcGlzKSAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgSGFudXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjQtMTEtMDcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIE9rbm8gc2Ugc2V6bmFtZW0gw7prb27FryBsaMWvdHkgKG5hZCBwxZllZHBpc2VtKVxyXG4gICAgICogQGF1dGhvciBNYXJ0aW4gSGFudcWhXHJcbiAgICAgKiBAY29weXJpZ2h0IMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyNFxyXG4gICAgICogQGNyZWF0ZWQgMjAyNC0xMS0wN1xyXG4gICAgICogQGxhc3RNb2RpZmllZCAyMDI1LTAyLTA0XHJcbiAgICAgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbVVrb251IGV4dGVuZHMgR0NvbnRlbnRCYXNlIHtcclxuICAgICAgICAvLyNyZWdpb24gUCBSIE8gUCBFIFIgVCBJIEUgUyBcclxuICAgICAgICAvKiogSWRlbnRpZmlrw6F0b3IgcMWZw61wYWR1IEREUCAqL1xyXG4gICAgICAgIHByaXZhdGUgSXhwOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIERhdHVtIHNwbGF0bm9zdGkgKi9cclxuICAgICAgICBwcml2YXRlIERhdF9zcGw6IERhdGU7XHJcbiAgICAgICAgLyoqIEthdGVnb3JpZSDDusSNZXRuw61obyBwb2h5YnUgKi9cclxuICAgICAgICBwcml2YXRlIEt0Z191cG86IG51bWJlcjtcclxuICAgICAgICAvKiogUHJpb3JpdGEgw7pocmFkeSAqL1xyXG4gICAgICAgIHByaXZhdGUgUHJpX3VocjogbnVtYmVyO1xyXG4gICAgICAgIC8qKiDEjMOtc2xvIHR5cHUgcG9obGVkw6F2a3kgKi9cclxuICAgICAgICBwcml2YXRlIFR5cF9waGw6IHN0cmluZztcclxuICAgICAgICAvKiogVWxvxb5lbsO9IFBJRCBsaMWvdHkgeiBpbml0dSAqL1xyXG4gICAgICAgIHByaXZhdGUgSXhzX2xodV9vbGQ6IHN0cmluZztcclxuICAgICAgICAvKiogUG9tb2Nuw70gb2JqIHBybyB1ZHLFvmVuw60gcG9zbGVkbsOtaG8gcGlkdSBsaMWvdHkgKi9cclxuICAgICAgICBwcml2YXRlIEl4c19saHVfcG9zbDogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBNb2RlbCBwcm8gc2V6bmFtIMO6a29uxa8gICBcclxuICAgICAgICAgKiBAdHlwZSB7R29yZGljLkRkcC5JbnRlcmZhY2UuR0RhdGFQcm9TZXpuYW1Va29udUR0b30gKi9cclxuICAgICAgICBwcml2YXRlIG1vZGVsOiBHb3JkaWMuRGRwLkludGVyZmFjZS5HRGF0YVByb1Nlem5hbVVrb251RHRvO1xyXG4gICAgICAgIC8qKiBGb3JtdWzDocWZIHBybyBmaWx0cm92w6Fuw60gZGF0ICAgXHJcbiAgICAgICAgICogQHR5cGUge29qZWN0fSAqL1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyOiBvYmplY3Q7ICAgICBcclxuICAgICAgICAvKiogR3JpZCAoc2V6bmFtKSAgIFxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnk8Pn0gKi9cclxuICAgICAgICBwcml2YXRlIGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqIElTTCBWaWV3IHBybyDDmmtvbnlcclxuICAgICAgICAgKiBAdHlwZSB7SXNsLlZpZXc8Pn0gKi9cclxuICAgICAgICBwcml2YXRlIHZpZXdVa29ueTogSXNsLlZpZXc8RGRwLkludGVyZmFjZS5HRGF0YVByb1Nlem5hbVVrb251RHRvPjtcclxuICAgICAgICAvKiogUG9tb2Nuw70gb2JqLiBuYXN0YXZ1asOtY8OtIHptxJtueSB1a2zDoWTDoW7DrSAqL1xyXG4gICAgICAgIHByaXZhdGUgdnlicmFub196bWVuZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAvKiogUG92b2xvdmHEjSBjaGFuZ2UgbWV0b2QgZm9ybXVsw6HFmWUgKi9cclxuICAgICAgICBwcml2YXRlIGNoYW5nZUFsbG93OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uICBQIFIgTyBQIEUgUiBUIEkgRSBTIFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaw6FrbGFkbsOtIG1ldG9kYSBwcm8gbmFzdGF2ZW7DrSBjb250ZW50dVxyXG4gICAgICAgICAqIEBtZXRob2Qgb25Db250ZW50UmVhZHkoKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfSAtIFVrb27EjWVuw60gbWV0b2R5IHZvaWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7ICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZU1haW5CdXR0b25zKCk7ICAgICAgICAgICAgICAgICAgICAgICAvLyBWeXR2b8WZZW7DrSB0bGHEjcOtdGVrIGNvbW1hbmQgYmFydSAoZG9sbsOtIMSNw6FzdCBva25hKVxyXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZUFjdGlvbnMoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEZWZpbmljZSBha2PDrSBva25hXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlTWVudSgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5dHZvxZllbsOtIGhvcm7DrWhvIG1lbnUgcyB0bGHEjcOtdGt5IGFrY8OtICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybSgpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5dHZvxZllbsOtIGZvcm11bMOhxZllIHMgcG9sw63EjWt5XHJcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlR3JpZCgpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZ5dHZvxZllbsOtIGdyaWR1XHJcbiAgICAgICAgICAgIHRoYXQuYWZ0ZXJJbml0KCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5hxI10ZW7DrSBkYXQgcG8gaW7DrXR1IG9rbmFcclxuICAgICAgICAgICAgdGhhdC5kZWZhdWx0Rm9ybSEuZ2Zvcm0oXCJ3YWl0Rm9yVmFsdWVzXCIpICAgICAgICAvLyBQbyBuYcSNdGXEm27DrSBkYXQgZG8gZm9ybXVsw6HFmWVcclxuICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHsgdGhhdC5jaGFuZ2VBbGxvdyA9IHRydWU7IH0pOyAgLy8gQWt0aXZ1anUgc2kgY2hhbmdlIG5hIGZvcm11bMOhxZlpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gU0VTVEFWRU7DjSBPS05BXHJcbiAgICAgICAgLyoqIFxyXG4gICAgICAgICAqIE1ldG9kYSBwcm8gdnl0dm/FmWVuw60gesOha2xhZG7DrWNoIHRsYcSNw610ZWsgb2tuYSAtIGNvbW1hbmRiYXJ1XHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVNYWluQnV0dG9ucygpXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9IC0gVWtvbsSNZW7DrSBtZXRvZHkgdm9pZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlTWFpbkJ1dHRvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNhdmVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWZsb3BweS1vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudWxveml0KGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuTmFzdGF2SG9kbm90eShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52eWJyYW5vX3ptZW5lbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWmF2xZnDrXRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXdpbmRvdy1jbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnphdnJpdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgdGhhdC5jb21tYW5kQmFyKHRoYXQuYWN0aW9ucy5jcmVhdGVCYXIoW1wiYWN0U2F2ZSFcIiwgXCJhY3RDbG9zZVwiXSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm/FmcOtIHRsYcSNw610a28gbmFkIHNlem5hbWVtIGtvbnRyb2wgXHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVBY3Rpb25zKClcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH0gLSBVa29uxI1lbsOtIG1ldG9keSB2b2lkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFkZFJhbmdlKFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE5hY2lzdFNlem5hbVVrb251TGh1dHlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9ixI1lcnN0dml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJPYm5vdml0IHNlem5hbSDDumtvbsWvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdVa29ueS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3REZXRhaWxVa29udUxodXR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWwgw7prb251XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJEZXRhaWwgw7prb251IHBybyBixJtoIGxoxa90eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkPERkcC5JbnRlcmZhY2UuR05hc3RhdmVuaVVrb251RHRvPihcImdldFNlbGVjdGlvblwiKVswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbiAhPSBudWxsICYmIHNlbGVjdGlvbi5kYXRfb2QgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dzLnNob3dNb2RhbFdpbmRvdyhcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdOYXN0YXZlbmlVa29udVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IFwiRERQR05hc3RhdmVuaVVrb251I1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogdGhhdC5JeHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGF0X3NwbDogdGhhdC5EYXRfc3BsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEt0Z191cG86IHRoYXQuS3RnX3VwbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmlfdWhyOiB0aGF0LlByaV91aHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhzX2xodTogdGhhdC5tb2RlbC5peHNfbGh1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERhdF9vZDogc2VsZWN0aW9uLmRhdF9vZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZGl0OiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBgTmFzdGF2ZW7DrSDDumtvbsWvIHBybyBixJtoIGxoxa90eSBwxZllZHBpc3VgLCA1MDUsIDYwMCkgLy9UT0RPOiBvdGVzdG92YXQgYSBuYXN0YXZpdCB2ZWxpa29zdCBva25hLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGV2LCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3VWtvbnkucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RQcmlkYXRVa29uTGh1dGVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDFmWlkYXQgw7prb25cIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlDFmWlkw6Fuw60gw7prb251IHBybyBixJtoIGxoxa90eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR05hc3RhdmVuaVVrb251XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIkREUEdOYXN0YXZlbmlVa29udSNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogdGhhdC5JeHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEYXRfc3BsOiB0aGF0LkRhdF9zcGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBLdGdfdXBvOiB0aGF0Lkt0Z191cG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmlfdWhyOiB0aGF0LlByaV91aHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHNfbGh1OiB0aGF0Lm1vZGVsLml4c19saHUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBFZGl0OiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBgTmFzdGF2ZW7DrSDDumtvbsWvIHBybyBixJtoIGxoxa90eSBwxZllZHBpc3VgLCA1MDUsIDYwMCkgLy9UT0RPOiBvdGVzdG92YXQgYSBhbnN0YXZpdCB2ZWxpa29zdCBva25hLi4uICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld1Vrb255LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0T2Jub3ZpdFVrb25MaHV0eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2Jub3ZpdCDDumtvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiWmFrdGl2bsOtIMO6a29uIHBybyBixJtoIGxoxa90eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5HTmFzdGF2ZW5pVWtvbnVEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpOyAvL1Nlem5hbSB6YcWha3J0bnV0w71jaCDFmcOhZGvFryBsemUgcMWZZcSNw61zdCBtZXRvZG91IGdldFNlbGVjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBycTogR29yZGljLkRkcC5JbnRlcmZhY2UuR05hc3RhdmVuaVVrb251RHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJPYm5vdml0VWtvbkxodXR5XCIsIHRleHQ6IFwiUHJvYsOtaMOhIG9ibm92YS4uLlwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgenByYXZhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmFrdGl2aXRhICE9IDkwMCkgeyB6cHJhdmEgPSB0cnVlIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuUHJlZHBpc3lVa29ueUxodXRhLnpha3Rpdm5pVWtvbihpdGVtKSAvL1RPRE8gLSBmb3JFYWNoIGJ5IG3Em2wgYsO9dCBuYSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIk9ibm92aXRVa29uTGh1dHlcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ub3RpZmljYXRpb24oXCJzaG93VG9hc3RcIiwgeyBpZDogXCJ1bG96ZW5pUHJlZHBpc3VcIiwgdGl0bGU6IFwiw5pzcMSbxaFuw6kgb2Jub3ZlbsOtXCIsIGNvbnRlbnQ6IFwiw5prb24gYnlsIG9ub3ZlblwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC52aWV3VWtvbnkucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0eXAsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJPYm5vdml0VWtvbkxodXR5XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXAgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmFcIiwgb2JqLmJhc2VNZXNzYWdlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoenByYXZhICE9IGZhbHNlKSB7IHRoYXQuZGlhbG9ncy53YXJuaW5nKFwiT2Jub3ZpdCBsemUgcG91emUgenJ1xaFlbsOpIGtvbnRyb2x5XCIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RacnVzaXRVa29uTGh1dHlcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpydcWhaXQgw7prb25cIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlpuZWFrdGl2bsOtIMO6a29uIHBybyBixJtoIGxoxa90eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkdOYXN0YXZlbmlVa29udUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBycTogR29yZGljLkRkcC5JbnRlcmZhY2UuR05hc3RhdmVuaVVrb251RHRvID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb24ubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJacnVzaXRVa29uTGh1dHlcIiwgdGV4dDogXCJQcm9iw61ow6EgenJ1xaF3bsOtLi4uXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZWFrdCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkgeyAvL1RPRE8gLSBmb3JFYWNoIGJ5IG3Em2wgYsO9dCBuYSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uYWt0aXZpdGEgIT0gMTAwKSB7IG5lYWt0ID0gdHJ1ZSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlByZWRwaXN5VWtvbnlMaHV0YS56bmVha3Rpdm5pVWtvbihpdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KCkgLy8gdm9sw6FtIHNrcnplIGludGVyZmFjZSBzZXJ2ZXJvdm91IG1ldG9kdSBzbWF6S29udHJvbHUsIGTDoXbDoW0gasOtIGR0byBhIHZvbMOhbSBuYSBuw60gZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwiWnJ1c2l0VWtvbkxodXR5XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubm90aWZpY2F0aW9uKFwic2hvd1RvYXN0XCIsIHsgaWQ6IFwidWxvemVuaVByZWRwaXN1XCIsIHRpdGxlOiBcIsOac3DEm8WhbsOpIHpydcWhZW7DrVwiLCBjb250ZW50OiBcIsOaa29uIGJ5bCB6cnXFoWVuXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnZpZXdVa29ueS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoanFYSFIsIHR5cCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIlpydXNpdFVrb25MaHV0eVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwID09PSBcImV4Y2VwdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIG9iai5iYXNlTWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5lYWt0ICE9IGZhbHNlKSB7IHRoYXQuZGlhbG9ncy53YXJuaW5nKFwiWnJ1xaFpdCBsemUgcG91emUgYWt0aXZuw60ga29udHJvbHlcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBtZW51IG5hIGNvbnRlbnR1XHJcbiAgICAgICAgICogQG1ldGhvZCBjcmVhdGVNZW51KClcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH0gLSBVa29uxI1lbsOtIG1ldG9keSB2b2lkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IG1lbnU6IE1lbnVQYXJhbXNbXSA9IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9ixI1lcnN0dml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJPYm5vdml0IHNlem5hbSDDumtvbsWvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1yZXBlYXRcIixcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdE5hY2lzdFNlem5hbVVrb251TGh1dHlcIl1cclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbCDDumtvbnVcIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIkRldGFpbCDDumtvbnUgcHJvIGLEm2ggbGjFr3R5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9uc1tcImFjdERldGFpbFVrb251TGh1dHlcIl1cclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDFmWlkYXQgw7prb25cIixcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlDFmWlkw6Fuw60gw7prb251IHBybyBixJtoIGxoxa90eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcGx1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0UHJpZGF0VWtvbkxodXRlXCJdXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPYm5vdml0IMO6a29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJaYWt0aXZuw60gw7prb24gcHJvIGLEm2ggbGjFr3R5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1yZWZyZXNoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGF0LmFjdGlvbnNbXCJhY3RPYm5vdml0VWtvbkxodXR5XCJdXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJacnXFoWl0IMO6a29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJabmVha3Rpdm7DrSDDumtvbiBwcm8gYsSbaCBsaMWvdHlcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWJhblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0WnJ1c2l0VWtvbkxodXR5XCJdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIobWVudSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGZvcm11bMOhxZllIFxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlRm9ybSgpXHJcbiAgICAgICAgICogQHJldHVybnMge0dvcmRpYy5Gb3Jtcy5Gb3JtfSAtIFZyYWPDrSBmb3JtdWzDocWZXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGb3JtKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBoZWFkZXJGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJkZHBOYXN0YXZlbmlTZXpuYW11VWtvbnVcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMM00zUzFcIiB9KTtcclxuICAgICAgICAgICAgLy8jcmVnaW9uIGZvcm1cclxuICAgICAgICAgICAgaGVhZGVyRm9ybVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oeyBuYW1lOiBcImhlYWRlclwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwzTTNTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gc3BsYXRub3N0aVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3NwbFwiLCAvLyBEYXR1bSBzcGxhdG5vc3RpXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVHlwIHDFmWVkcGlzdVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5mdWNjdXBvKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt0Z191cG9cIiwgLy8gVHlwIHDFmWVkcGlzdVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmt0Z191cG89dmFsdWUua3RnX3Vwbzttb2RlbC5rdGdfdXBvX3R4dD12YWx1ZS5rdGdfdXBvX3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7a3RnX3Vwb30te2t0Z191cG9fdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlckNvbHVtbnM6IFtcImt0Z191cG9cIiwgXCJrdGdfdXBvX3R4dFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQcmlvcml0YSDDumhyYWR5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaV91aHJcIiwgLy8gUHJpb3JpdGEgw7pocmFkeVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInpvYlpydVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlpvYnJheml0IHpydcWhZW7DqVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudmlld1Vrb255LnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IG5hbWU6IFwiY3VycmVuY3lcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMM00zUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlVocmF6ZW5vXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN1bV9jX3VoclwiLCAvLyBVaHJhemVub1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmxhZzogXCJyZXF1aXJlZFwiLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogdGhhdC51aHJDYXN0a2EgPz8gMCxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJOZXVocmF6ZW5vXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN1bV9jX25ldWhyXCIsIC8vIE5ldWhyYXplbm9cclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2ZsYWc6IFwicmVxdWlyZWRcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICAvL2luaXRpYWxWYWx1ZTogdGhhdC5uZVVockNhc3RrYSA/PyAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZTogMCxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgaW5wdXQpIHsgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJSb3pkw61sXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN1bV9jX3JvemRpbFwiLCAvLyBSb3pkw61sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9mbGFnOiBcInJlcXVpcmVkXCIsIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkgeyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk5hc3RhdmVuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdyYWRpb1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyZXppbVwiLCAvLyBOYXN0YXZlbsOtIC8gUmXFvmltXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiAwLCBsYWJlbDogJ1bDvWNob3rDrScgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogMSwgbGFiZWw6ICdWbGFzdG7DrScgfVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY2hhbmdlVmFsdWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgICAgICAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbih7IG5hbWU6IFwibWFpblwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwzTTNTMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3RhdiBsaMWvdHlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgQ29tbW9uLlByZWZhYnMuc3RhdkxodXR5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG9zbGVkbsOtIGRlbiBsaMWvdHlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9saHV0eVwiLCAvL1Bvc2xlZG7DrSBkZW4gbGjFr3R5XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGlucHV0KSB7IH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiTGjFr3RhXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmRkcExodXRhKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19saHVcIiwgLy8gTGjFr3RhICBcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IGl4cDogdGhhdC5JeHAgfSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie25hemV2fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c19saHU9aXhzX2xodVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNoYW5nZVZhbHVlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiICogLSBqacW+IHBvdcW+aXTDqSBcIilcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgIHRoYXQuZGVmYXVsdEZvcm0gPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZm9ybShcImNyZWF0ZUZyb21cIiwgaGVhZGVyRm9ybSk7XHJcbiAgICAgICAgICAgIHJldHVybiBoZWFkZXJGb3JtO1xyXG4gICAgICAgIH0gIFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHZ5dHZvxZllbsOtIGEgZGVmaW5vdsOhbsOtIHNlem5hbXUgKD1ncmlkdSlcclxuICAgICAgICAgKiBAbWV0aG9kIGNyZWF0ZUdyaWQoKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfSAtIFVrb27EjWVuw60gbWV0b2R5IHZvaWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5ncmlkID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCgpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFwiLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zW1wiYWN0RGV0YWlsVWtvbnVMaHV0eVwiXSxcclxuICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJkYXRfb2QsIGRhdF9kbywgdHlwX3VrbywgcG96bmFta2EsIGFrdGl2aXRhXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJOZWFrdGl2bsOtXCIsIGZvcm11bGE6ICdOT1QoRVFVQUxTKEBha3Rpdml0YSwgMTAwKSknLCBiZzogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0QmcubGlnaHRncmF5IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IERkcC5XZWJDbGllbnQuQ29tbW9uLkdyaWRGb3JtYXRzLlNlem5hbVVrb251KClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uIFNFU1RBVkVOw40gT0tOQVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gSU5JQ0lBTElaQUNFIE9LTkFcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIG5hc3RhdmVuw60gZGF0IHBvIGluaWNpYWxpemFjaSBva25hIFxyXG4gICAgICAgICAqIEBtZXRob2QgYWZ0ZXJJbml0KClcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH0gLSBVa29uxI1lbsOtIG1ldG9keSB2b2lkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBhZnRlckluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0Lm1vZGVsLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7ICAgIC8vIE5hc3RhdmVuaSBkYXQgbW9kZWx1IGRvIHBvbMOtxI1la1xyXG4gICAgICAgICAgICB0aGF0Lk5hc3RhdkhvZG5vdHkodHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoYXQuZ2V0R3JpZERhdGEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZ1bmtjZSBwcm8gesOtc2vDoW7DrSBmaWx0cm92YW7DvWNoIGRhdFxyXG4gICAgICAgICAqIEBtZXRob2QgZ2V0R3JpZERhdGEoKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfSAtIFVrb27EjWVuw60gbWV0b2R5IHZvaWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldEdyaWREYXRhKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy9UT0RPOiBwxZlpZGF0IG7Em2pha8O9IGlmIGFieSBzZSB2xJtkxJtsbyB6ZGEgc2UgZGF0YSBtYWrDrSBicsOhdCB6IGZpdGxydSBuZWJvIG5hdHZyZG8gdiBwxZllZHBpc3VcclxuICAgICAgICAgICAgLy9UT0RPOiAtIG5lanNlbSBzaSBqaXN0IGphayBtdWx0aWZ1bmvEjW7DrSBtw6EgdG8gb2tubyBiw710Li4uIHphdMOtbSBuYXR2cmRvIHDFmWVkw6F2YXQgc3Byw6F2bsOhIGEgcG9kc3RhdG7DoSBkYXRhXHJcbiAgICAgICAgICAgIHRoYXQudmlld1Vrb255ID0gbmV3IElzbC5WaWV3KHRoYXQuaXNsLlByZWRwaXN5VWtvbnlMaHV0YS5saXN0KFxyXG4gICAgICAgICAgICAgICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlRmlsdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogdGhhdC5maWx0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyYWdtZW50czogW1wiKlwiXVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZChcInNldERhdGFcIiwgdGhhdC52aWV3VWtvbnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB2eXR2b8WZZW7DrSBmaWx0cnUgeiBmb3JtdWzDocWZZSBwcm8gbmFzdGF2ZW7DrSBkYXQgdiBncmlkdVxyXG4gICAgICAgICAqIEBtZXRob2QgY3JlYXRlRmlsdGVyKClcclxuICAgICAgICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIE9iamVrdCBvYnNhaHVqw61jw60gZmlsdHJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlcigpOiBvYmplY3Qge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHpvYlpydVZhbHVlID0gdGhhdC5kZWZhdWx0Rm9ybSEuZmluZEZvcm1zKCkuZmluZEZpZWxkcyhcInpvYlpydVwiKS5nZmllbGQ8Ym9vbGVhbj4oXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdGhhdC5maWx0ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICBpeHA6IHRoYXQuSXhwLFxyXG4gICAgICAgICAgICAgICAgZGF0X3NwbDogdGhhdC5EYXRfc3BsLFxyXG4gICAgICAgICAgICAgICAga3RnX3VwbzogdGhhdC5LdGdfdXBvLFxyXG4gICAgICAgICAgICAgICAgcHJpX3VocjogdGhhdC5QcmlfdWhyLFxyXG4gICAgICAgICAgICAgICAgem9iWnJ1OiB6b2JacnVWYWx1ZSA/PyBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmZpbHRlcjtcclxuICAgICAgICB9ICAgIFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgbmHEjcOtdGFqw61jw60gZGF0YSBsaMWvdHkgemUgc2VydmVydVxyXG4gICAgICAgICAqIEBtZXRob2QgTmFjdGlIb2Rub3R5TGh1dHkoKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfSAtIFVrb27EjWVuw60gbWV0b2R5IHZvaWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIE5hY3RpSG9kbm90eUxodXR5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImxvYWRIb2Rub3R5TGh1dHlcIiwgdGV4dDogXCJOYcSNw610w6FtIGhvZG5vdHkuLi5cIiB9KTtcclxuICAgICAgICAgICAgbGV0IGlucHV0OiBHb3JkaWMuRGRwLkludGVyZmFjZS5HRGF0YVByb1Nlem5hbVVrb251RHRvID0geyBpeHA6IHRoaXMuSXhwLCBkYXRfc3BsOiB0aGlzLkRhdF9zcGwsIGt0Z191cG86IHRoaXMuS3RnX3VwbywgcHJpX3VocjogdGhpcy5QcmlfdWhyIH07XHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlByZWRwaXN5VWtvbnlMaHV0YS5uYWN0aUhvZG5vdHlMaHV0eShycSA9PiB7IHJldHVybiB7IGRhdGE6IGlucHV0IH0gfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImxvYWRIb2Rub3R5TGh1dHlcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lk5hc3RhdkhvZG5vdHkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uIChqcVhIUiwgdHlwLCBvYmopIHsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwibG9hZEhvZG5vdHlMaHV0eVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXAgPT09IFwiZXhjZXB0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmhhbmRsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuZXJyb3IoXCJDaHliYVwiLCBvYmouYmFzZU1lc3NhZ2UpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgbmFzdGF2dWrDrWPDrSBkYXRhIGxoxa90eSB2ZSBmb3JtdWzDocWZaVxyXG4gICAgICAgICAqIEBtZXRob2QgTmFzdGF2SG9kbm90eSgpXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBpbml0IC0gUGFyYW1ldHIgdXLEjXVqaWPDrSB6ZGEgc2UgbWFqw60gZG9uYXN0YXZpdCBpbmljaWFsaXphxI1uw60gw7pkYWplXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWQgfCBKUXVlcnk8SFRNTEVsZW1lbnQ+fSAtIHVrb27EjWVuw60gbcSbdG9keSAodm9pZCksIHYgcMWZw61wYWTEmyBuZW5hxI10ZW7DqSBsaMWvdHkgdnJhY8OtIG9rbm8gcyBjaHlib3VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIE5hc3RhdkhvZG5vdHkoaW5pdDogYm9vbGVhbik6IHZvaWQgfCBKUXVlcnk8SFRNTEVsZW1lbnQ+IHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7ICAgIFxyXG4gICAgICAgICAgICBjb25zdCBmb3JtID0gdGhhdC5kZWZhdWx0Rm9ybSE7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJjaGFuZ2VIb2Rub3R5TGh1dHlcIiwgdGV4dDogXCJOYXN0YXZ1amkgaG9kbm90eS4uLlwiIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmNoYW5nZUFsbG93ID0gZmFsc2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBacnXFocOtbSBzaSBjaGFuZ2UgbmEgZm9ybXVsw6HFmWlcclxuICAgICAgICAgICAgaWYgKHRoYXQubW9kZWwuaXhzX2xodSA9PSBudWxsKSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQgbmVtw6FtIFBJRCBsaMWvdHkgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHRoYXQubmFzdGF2ZW5pUHJpc3R1cG5vc3RpKGZhbHNlKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVha3RpdnVqdSB0bGHEjcOtdGthIHMgYWtjZW1hIFxyXG4gICAgICAgICAgICAgICAgdGhhdC5jaGFuZ2VBbGxvdyA9IHRydWU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBa3RpdnVqdSBzaSBjaGFuZ2UgbmEgZm9ybXVsw6HFmWlcclxuICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwiY2hhbmdlSG9kbm90eUxodXR5XCIgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5kaWFsb2dzLmVycm9yKFwiQ2h5YmEgbmFzdGF2ZW7DrSBsaMWvdCBwcm8gdHlwIHBvaGxlZMOhdmt5XCIsIFwiTmVuw60gbmFzdGF2ZW5hIGxow7p0YSBuZWJvIMO6a29uIHBybyBrYXRlZ29yaWkgw7rEjWV0bsOtaG8gcG9oeWJ1XCIpIC8vIGEgdnlob2TDrW0gb2tubyBzIGNoeWJvdVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlQcmlzdHVwbm9zdGkodHJ1ZSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6YWt0aXZ1anUgdGxhxI3DrXRrYSBzIGFrY2VtYVxyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRm9ybXMoKS5maW5kRmllbGRzKFwiaXhzX2xodVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAodGhhdC5tb2RlbC5yZXppbSAhPSAxKSk7ICAgICAgICAgICAvLyBEZWFrdGl2YWNlIHBvbMOtxI1rYSBsaMWvdGFcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmRlZmF1bHRGb3JtIS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0Lm1vZGVsLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7ICAgICAgICAgICAvLyBOYXN0YXZlbmkgZGF0IG1vZGVsdSBkbyBwb2zDrcSNZWtcclxuICAgICAgICAgICAgICAgIC8vZm9ybS5maW5kRmllbGRzKFwic3Rhdl9saHV0eVwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB0aGF0LmluaXRpYWxTdGF2dUxodXR5KCksIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTsgICAgLy8gTmFzdGF2ZW7DrSBzdGF2dSBsaMWvdHkgKGJleiBwcmVmYWJ1IHrFmWVqbcSbIG5lZnVuZ3VqZSB6IG1vZGVsdS4uLlxyXG4gICAgICAgICAgICAgICAgLy9mb3JtLmZpbmRGaWVsZHMoXCJzdGF2X2xodXR5XCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhhdC5tb2RlbC5zdGF2X2xodXR5LCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7IC8vIE5hc3RhdmVuw60gc3RhdnUgbGjFr3R5IChiZXogcHJlZmFidSB6xZllam3EmyBuZWZ1bmd1amUgeiBtb2RlbHUuLi5cclxuICAgICAgICAgICAgICAgIHRoYXQuc2V0VG9vbHRpcCh0aGF0Lm1vZGVsLnRvb2x0aXAhKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmFzdGF2w61tIHRvb2x0aXAga2Ugc3RhdnUgbGjFr3R5XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGluaXQpIHRoYXQuSXhzX2xodV9vbGQgPSB0aGF0Lm1vZGVsLml4c19saHU7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQb2t1ZCBtw6FtIGxoxa90dSwgcMWZaSBpbml0dSBzaSBuYXN0YXbDrW0gc3Rhcm91IGxoxa90dSBwcm8gdWtsw6Fkw6Fuw60uLi5cclxuICAgICAgICAgICAgICAgIHRoYXQuSXhzX2xodV9wb3NsID0gdGhhdC5tb2RlbC5peHNfbGh1OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGFreSBzaSB1bG/FvsOtbSBwb3NsZWRuw60gdnlicmFub3UgbGjFr3R1XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNoYW5nZUFsbG93ID0gdHJ1ZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFrdGl2dWp1IHNpIGNoYW5nZSBuYSBmb3JtdWzDocWZaVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwiY2hhbmdlSG9kbm90eUxodXR5XCIgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIG5hc3RhdmVuw60gcMWZw61zdHVwbm9zdGkgdGxhxI3DrXRlayBha2PDrSBcclxuICAgICAgICAgKiBAbWV0aG9kIG5hc3RhdmVuaVByaXN0dXBub3N0aSgpXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSB6bWVuYSAtIFByb20uIHVyxI1pasOtY8OtIGphayBzZSBtw6Egem3Em25pdCBwxZnDrXN0dXBub3N0IHRsYcSNw610ZWtcclxuICAgICAgICAgKiBAcmV0dXJucyB7dm9pZH0gLSBVa29uxI1lbsOtIG1ldG9keSB2b2lkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBuYXN0YXZlbmlQcmlzdHVwbm9zdGkoem1lbmE6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9uc1tcImFjdE5hY2lzdFNlem5hbVVrb251TGh1dHlcIl0/LmVuYWJsZWQoem1lbmEpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zW1wiYWN0RGV0YWlsVWtvbnVMaHV0eVwiXT8uZW5hYmxlZCh6bWVuYSk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnNbXCJhY3RQcmlkYXRVa29uTGh1dGVcIl0/LmVuYWJsZWQoem1lbmEpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9uc1tcImFjdE9ibm92aXRVa29uTGh1dHlcIl0/LmVuYWJsZWQoem1lbmEpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zW1wiYWN0WnJ1c2l0VWtvbkxodXR5XCJdPy5lbmFibGVkKHptZW5hKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnNbXCJhY3RTYXZlXCJdPy5lbmFibGVkKHptZW5hKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIG5hc3RhdmVuw60gdG9vbHRpcHUgayBwb2zDrcSNa3Ugc3RhdnUgbGjFr3R5XHJcbiAgICAgICAgICogQG1ldGhvZCBzZXRUb29sdGlwKClcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIFRleHQga3RlcsO9IHNlIG3DoSBuYXN0YXZpdFxyXG4gICAgICAgICAqIEByZXR1cm5zIHt2b2lkfSAtIFVrb27EjWVuw60gbWV0b2R5IHZvaWRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNldFRvb2x0aXAodGV4dDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtID0gdGhhdC5kZWZhdWx0Rm9ybSE7XHJcbiAgICAgICAgICAgIGxldCB0b29sdGlwID0gdGV4dC5yZXBsYWNlKFwiIC9uXFxcXCBcIiwgXCJcXG5cIik7XHJcbiAgICAgICAgICAgIGZvcm0uZmluZEZpZWxkcyhcInN0YXZfbGh1dHlcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwidG9vbHRpcFwiLCB0b29sdGlwKTtcclxuICAgICAgICAgICAgaWYgKHRoYXQubW9kZWwudG9vbHRpcCEuaW5jbHVkZXMoXCJOZXByb3ZlZGVuw6kgw7prb255IG5hZCBsaMWvdG91OlwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wdDogR0ZpZWxkVGFnT3B0aW9ucyA9IHsgaWQ6IFwidnNTdGF0ZVwiLCB0ZXh0OiBcIk5lcHJvdmVkZW7DqSDDumtvbnlcIiwgc3RhdGU6IFwiZXJyb3JcIiB9O1xyXG4gICAgICAgICAgICAgICAgZm9ybS5maW5kRmllbGRzKFwic3Rhdl9saHV0eVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJ0YWdcIiwgb3B0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vKiogXHJcbiAgICAgICAgLy8gKiBNZXRvZGEgcHJvIG5hc3RhdmVuw60gcG9sw63EjWthIHNlIHN0YXZlbSBsaMWvdHkgXHJcbiAgICAgICAgLy8gKiBAbWV0aG9kIGluaXRpYWxTdGF2dUxodXR5KClcclxuICAgICAgICAvLyAqIEByZXR1cm5zIHtvYmplY3R9IC0gVnJhY8OtIG9iamVrdCBzIGhvZG5vdG91IHN0YXZ1IGxoxa90eSBhIGplasOtbSBwb3Bpc2VtXHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL3ByaXZhdGUgaW5pdGlhbFN0YXZ1TGh1dHkoKTogeyBzdGF2X2xodXR5OiBudW1iZXI7IHBvcGlzOiBzdHJpbmcgfSB7XHJcbiAgICAgICAgLy8gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgLy8gICAgc3dpdGNoICh0aGF0Lm1vZGVsLnN0YXZfbGh1dHkpIHtcclxuICAgICAgICAvLyAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIHsgc3Rhdl9saHV0eTogMCwgcG9waXM6IFwiTGjFr3RhIG5lbsOtIGRlZmlub3ZhbsOhXCIgfTtcclxuICAgICAgICAvLyAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4geyBzdGF2X2xodXR5OiAxLCBwb3BpczogXCJMaMWvdGEgbmVuw60gdMWZZWJhIChqZSB6YXBsYWNlbm8pXCIgfTtcclxuICAgICAgICAvLyAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4geyBzdGF2X2xodXR5OiAyLCBwb3BpczogXCJKZSBwxZllZCB1cG96b3JuxJtuw61tLCBqc291IHbFoWVjaG5hIHZ5bcOhaMOhbsOtXCIgfTtcclxuICAgICAgICAvLyAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4geyBzdGF2X2xodXR5OiAzLCBwb3BpczogXCJKZSBwxZllZCB1cG96b3JuxJtuw61tLCBuZWpzb3UgdsWhZWNobmEgdnltw6Fow6Fuw61cIiB9O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgICAgIGNhc2UgNDpcclxuICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiB7IHN0YXZfbGh1dHk6IDQsIHBvcGlzOiBcIkplIHDFmWVkIHZ5cHLFoWVuw61tIGxoxa90eSwganNvdSB2xaFlY2huYSB2eW3DoWjDoW7DrVwiIH07XHJcbiAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIHsgc3Rhdl9saHV0eTogNSwgcG9waXM6IFwiSmUgcMWZZWQgdnlwcsWhZW7DrW0gbGjFr3R5LCBuZWpzb3UgdsWhZWNobmEgdnltw6Fow6Fuw61cIiB9O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgLy8gICAgICAgIGNhc2UgNjpcclxuICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiB7IHN0YXZfbGh1dHk6IDYsIHBvcGlzOiBcIkplIHBvIHZ5cHLFoWVuw61tIGxoxa90eSwganNvdSB2xaFlY2huYSB2eW3DoWjDoW7DrVwiIH07XHJcbiAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAvLyAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIHsgc3Rhdl9saHV0eTogNywgcG9waXM6IFwiSmUgcG8gdnlwcsWhZW7DrW0gbGjFr3R5LCBuZWpzb3UgdsWhZWNobmEgdnltw6Fow6Fuw60nXCIgfTtcclxuICAgICAgICAvLyAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIHsgc3Rhdl9saHV0eTogMCwgcG9waXM6IFwiTGjFr3RhIG5lbsOtIGRlZmlub3ZhbsOhXCIgfTtcclxuICAgICAgICAvLyAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vICAgIH0gICAgICAgICBcclxuICAgICAgICAvL31cclxuICAgICAgICAvLyNlbmRyZWdpb24gSU5JQ0lBTElaQUNFIE9LTkFcclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIFVMT8W9RU7DjXxaQVbFmEVOw418Wk3Emk5BICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQb21vY27DoSBtZXRvZGEgcG8gem3Em27EmyBob2Rub3R5IGxoxa90eSBuZWJvIHptxJtueSByZcW+aW11XHJcbiAgICAgICAgICogQG1ldGhvZCBjaGFuZ2VWYWx1ZSgpXHJcbiAgICAgICAgICogQHJldHVybnMge3ZvaWR9IC0gVWtvbsSNZW7DrSBtZXRvZHkgdm9pZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgY2hhbmdlVmFsdWUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5jaGFuZ2VBbGxvdykge1xyXG4gICAgICAgICAgICAgICAgdGhhdC52eWJyYW5vX3ptZW5lbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnVsb3ppdChmYWxzZSkuZG9uZSgoKSA9PiB7IHRoYXQuTmFzdGF2SG9kbm90eShmYWxzZSk7IH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBcclxuICAgICAgICAgKiBNZXRvZGEgcHJvIHVsb8W+ZW7DrSBkYXQgeiBvYnNhaHUgKGEgemF2xZllbsOtIGRpYWxvZ292w6lobyBva25hKSBcclxuICAgICAgICAgKiBAbWV0aG9kIHVsb3ppdCgpXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSB1bG96UHV2b2RuaUhvZG5vdHkgLSBQcm9tLiB1csSNaWrDrWPDrSBvIGpha8OpIHVsb8W+bmVuw60gc2UgamVkbsOhXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8dm9pZD59IC0gVnJhY8OtIHByb21pc2UgPFVrb27EjWVuw60gbWV0b2R5IHZvaWQ+XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB1bG96aXQodWxvelB1dm9kbmlIb2Rub3R5OiBib29sZWFuKTogSlF1ZXJ5UHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwic2F2ZUhvZG5vdHlMaHV0eVwiLCB0ZXh0OiBcIlVrbMOhZMOhbS4uLlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBmb3JtRGF0YTogR29yZGljLkRkcC5JbnRlcmZhY2UuR0RhdGFQcm9TZXpuYW1Va29udUR0byA9IHt9OyAvLyBEZWZpbmljZSBvYmpla3R1IHBybyBkYXRhIGsgdWxvxb5lbsOtXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiY29sbGVjdFwiLCBmb3JtRGF0YSk7ICAgICAgICAgLy8gU2VicsOhbsOtIGhvZG5vdCB6IGZvcm11bMOhxZllXHJcbiAgICAgICAgICAgIGZvcm1EYXRhLml4cCA9IHRoYXQuSXhwOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOYXN0YXZlbsOtIFBJRHUgcMWZw61wYWR1XHJcbiAgICAgICAgICAgIGZvcm1EYXRhLmRhdF9zcGwgPSB0aGF0LkRhdF9zcGw7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOYXN0YXZlbsOtIERhdHVtdSBzcGxhdG5vc3RpXHJcbiAgICAgICAgICAgIGZvcm1EYXRhLmt0Z191cG8gPSB0aGF0Lkt0Z191cG87ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOYXN0YXZlbsOtIEthdGVnb3JpZSDDusSNZXRuw61obyBwb2h5YnVcclxuICAgICAgICAgICAgZm9ybURhdGEucHJpX3VociA9IHRoYXQuUHJpX3VocjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5hc3RhdmVuw60gUHJpb3JpdHkgw7pocmFkeVxyXG4gICAgICAgICAgICBmb3JtRGF0YS5peHNfbGh1X29sZCA9IHRoYXQuSXhzX2xodV9vbGQ7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmFzdGF2ZW7DrSBJWFMgTGjFr3R5IHDFmWkgaW5pdHVcclxuICAgICAgICAgICAgZm9ybURhdGEuaXhzX2xodV9wb3NsID0gdGhhdC5JeHNfbGh1X3Bvc2w7ICAgICAgICAgICAgICAgICAgICAgIC8vIE5hc3RhdmVuw60gSVhTIExoxa90eSBrdGVyw6EgYnlsYSBuYXBvc2xlZHkgdWxvxb5lbmFcclxuICAgICAgICAgICAgZm9ybURhdGEudWxvelB1dm9kbmlIb2Rub3R5ID0gdWxvelB1dm9kbmlIb2Rub3R5OyAgICAgICAgICAgICAgIC8vIE5hc3RhdmVuw60gUHJvbS4gdXLEjWlqw61jw60gbyBqYWvDqSB1bG/Fvm5lbsOtIHNlIGplZG7DoVxyXG5cclxuICAgICAgICAgICAgdGhhdC5pc2wuUHJlZHBpc3lVa29ueUxodXRhLnVsb3pabWVueUxodXR5KHsgZGF0YTogZm9ybURhdGEgfSkgIC8vIFphdm9sw6Fuw60gSVNMIG1ldG9keSBrIHVsb8W+ZW7DrSBkYXQgbGjFr3R5XHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsID0gcmV0LmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJzYXZlSG9kbm90eUxodXR5XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKGpxWEhSLCB0eXAsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwic2F2ZUhvZG5vdHlMaHV0eVwiIH0pOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cCA9PT0gXCJleGNlcHRpb25cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5lcnJvcihcIkNoeWJhXCIsIG9iai5iYXNlTWVzc2FnZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHsgcmV0dXJuIGRlZi5yZWplY3QoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWV0b2RhIHBybyB6YXbFmWVuw60gb2tuYSBwbyBzdGlza251dMOtIHRsYcSNw610a2FcclxuICAgICAgICAgKiBAbWV0aG9kIHphdnJpdCgpXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8dm9pZD59IC0gVnJhY8OtIHByb21pc2UgPFVrb27EjWVuw60gbWV0b2R5IHZvaWQ+XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB6YXZyaXQoKTogSlF1ZXJ5UHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LnZ5YnJhbm9fem1lbmVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhhdC56YXZpcmFuaSgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTsgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRG9wbMWIdWrDrWPDrSBtZXRvZGEgcHJvIHphdsWZZW7DrSBva25hIHMgcG90dnJ6b3ZhY8OtbSBkaWFsb2dlbVxyXG4gICAgICAgICAqIEBtZXRob2QgemF2aXJhbmkoKVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPHZvaWQ+fSAtIFZyYWPDrSBwcm9taXNlIDxVa29uxI1lbsOtIG1ldG9keSB2b2lkPlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgemF2aXJhbmkoKTogSlF1ZXJ5UHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBpZiAodGhhdC52eWJyYW5vX3ptZW5lbikge1xyXG4gICAgICAgICAgICAgICAgdGhhdC52eWJyYW5vX3ptZW5lbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJVcG96b3JuxJtuw61cIiwgXCJQxZllamV0ZSBzaSB1bG/Fvml0IHByb3ZlZGVuw6kgem3Em255P1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChldiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudWxveml0KHRydWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvbiBVTE/FvUVOw418WkFWxZhFTsONfFpNxJpOQVxyXG4gICAgfVxyXG59Il19