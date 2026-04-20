"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            class GSeznamEkoFinancovani extends WebClient.GSeznamEkoZaznamuBase {
                constructor(content) {
                    super(content);
                    //private insAct: GAction;
                    //private clearAndFilterAct: GAction;
                    //private selFilterAct: GAction;
                    //private selFilterAndSearchAct: GAction;
                    /** Limit poctu nacitanych zaznamu, pokud nedojde k potvrzeni, ze uzivatel chce jit pres limit */
                    this.logOptions = { name: "GSeznamEkoFinancovani", authorCode: 302, file: "GSeznamEkoFinancovani.ts" };
                    this.pouzivanStrukPopis = false;
                    this.povolenNahled = false;
                    this.soucetVeStatusBaru = false;
                    this.rememberHistory = true;
                    // definice tasku pro seznam a nacteni poctu
                    this.taskList = this.parentCnt.isl.UcrRozStavyAat.list();
                    this.taskCount = this.parentCnt.isl.UcrRozStavyAat.count();
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                nastaveniAkci(grid, pocetRadku) {
                    //let grid = this.getGrid();
                    //if (grid == null) return ;
                    //var enable = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid)>0;
                    var enable = pocetRadku > 0;
                    // pristupnost akci dle nactenych dat
                    this.zapisyAct.enabled(enable);
                    this.dotAct.enabled(enable);
                    this.previewController?.enable(enable);
                }
                /**
                 * Vytvoreni klavesovych zkratek
                 *
                 * */
                createShortCut() {
                    super.createShortCut();
                    //let that = this;
                    //this.parentCnt.element.gshortcut({
                    //    key: "INSERT",
                    //    description: "jres:31100226", //RC 31100226 : Načtení dat
                    //    group: Gordic.Shortcuts.Groups.Task,
                    //    canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                    //    action: this.parentCnt.actions.insAct//this.insAct
                    //});
                    //this.parentCnt.element.gshortcut({
                    //    key: "DELETE",
                    //    description: "jres:31100181", //RC 31100181 : Vyčistit
                    //    canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                    //    group: Gordic.Shortcuts.Groups.Task,
                    //    action: this.clearFilterRowAct
                    //});
                    //this.parentCnt.element.gshortcut({
                    //    key: "1",
                    //    description: "jres:31100218", //RC 31100218 : Předchozí filtr
                    //    canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                    //    group: Gordic.Shortcuts.Groups.Task,
                    //    action: this.parentCnt.actions.prevFilterAct//this.prevFilterAct
                    //});
                    //this.parentCnt.element.gshortcut({
                    //    key: "0",
                    //    description: "jres:31100228", //RC 31100228 : Vyčistit a načíst
                    //    canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                    //    group: Gordic.Shortcuts.Groups.Task,
                    //    action: this.parentCnt.actions.clearAndFilterAct//this.clearAndFilterAct
                    //});
                    //let grid = this.getGrid();
                    //if (grid !== null) {
                    //    grid.gshortcut({
                    //        key: "ctrl+shift+lclick",
                    //        group: Gordic.Shortcuts.Groups.Grid,
                    //        description: "jres:31100229", //RC 31100229 : Přenesení hodnoty do filtru.
                    //        action: this.selFilterAct
                    //    });
                    //    grid.gshortcut({
                    //        key: "ctrl+lclick",
                    //        group: Gordic.Shortcuts.Groups.Grid,
                    //        description: "jres:31100235", //RC 31100235 : Přenesení hodnoty do filtru a vyhledání.
                    //        action: this.selFilterAndSearchAct
                    //    });
                    //    grid.gshortcut({
                    //        key: [".", ","],
                    //        //NOTE: Description opsano z napovedy k TK UCR
                    //        description: "jres:31100227", //RC 31100227 : Zobrazení všech zápisů dokladů (celý doklad) nad označeným zápisem.
                    //        canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                    //        group: Gordic.Shortcuts.Groups.Grid,
                    //        action: this.dotAct
                    //    });
                    //}
                }
                /**
                 * Vytvoreni gridformatu
                 * @returns
                 */
                createGridFormat() {
                    var gf = new Gordic.Data.GridFormat();
                    //var topoGroup = "topo";
                    if (this.parentCnt.ekoParams.PrizNpv > 0) {
                        gf.addTextColumn({
                            name: "druh_char",
                            caption: "jres:30250006", //RC 30250006 : Druh
                            width: 100,
                            cellTemplate: "{druh_char_txt:trim:encode}",
                            grouping: {
                                aggregate: Gordic.Data.Aggregates.first("druh_char_txt"),
                            },
                            serverFilter: Gordic.Ucr.WebClient.FilterPrefabs.druh_char({ model: "druh_char", txt_name: "druh_char_txt", caption: "jres:30250006" }) //RC 30250006 : Druh
                        });
                        gf.addTextColumn({
                            name: "priz_char",
                            caption: "jres:30250007", //RC 30250007 : Charakter
                            width: 100,
                            cellTemplate: "{priz_char_txt:trim:encode}",
                            grouping: {
                                aggregate: Gordic.Data.Aggregates.first("priz_char_txt"),
                            },
                            serverFilter: Gordic.Ucr.WebClient.FilterPrefabs.priz_char({ model: "priz_char", txt_name: "priz_char_txt", caption: "jres:30250007" }) //RC 30250007 : Charakter
                        });
                    }
                    switch (this.globals.RezimProvozu) {
                        case 10 /* Gordic.Uct.Interface.GUcrRezimProvozu.NKS */: break;
                        case 20 /* Gordic.Uct.Interface.GUcrRezimProvozu.UCS */:
                            gf.addTextColumn({
                                name: "nks",
                                caption: this.zkratky.Nks,
                                description: this.texty.Nks,
                                width: 60,
                                //group: topoGroup,
                                serverFilter: Gordic.Eko.Filters.nksInterval(this.filterOptions.nks)
                            });
                            break;
                        case 30 /* Gordic.Uct.Interface.GUcrRezimProvozu.ICO */:
                            gf.addTextColumn({
                                name: "ucs",
                                caption: this.zkratky.Ucs,
                                description: this.texty.Ucs,
                                width: 60,
                                //group: topoGroup,
                                aggregate: Gordic.Data.Aggregates.first("ucs"),
                                //serverFilter: Gordic.Eko.Filters.ucsInterval(this.filterOptions.ucs)
                                serverFilter: Gordic.Eko.Filters.ucsInterval({
                                    ico: this.filterOptions.ucs.ico, aktProhl: this.filterOptions.ucs.aktProhl,
                                    onlyActive: this.filterOptions.ucs.onlyActive, caption: this.filterOptions.ucs.caption, name: "ucs", firstField: undefined, secondField: undefined,
                                    model: "ucs",
                                    disabled: !!(this.Radek_DPH) && !!this.Filter.ucs
                                })
                            });
                            if (!this.AvoidUus)
                                gf.addTextColumn({
                                    name: "uus",
                                    caption: this.zkratky.Uus,
                                    description: this.texty.Uus,
                                    width: 60,
                                    //group: topoGroup,
                                    //serverFilter: Gordic.Eko.Filters.uusInterval(this.filterOptions.uus)
                                    serverFilter: Gordic.Eko.Filters.uusInterval({
                                        ico: this.filterOptions.uus.ico, ucs: this.filterOptions.uus.ucs, aktProhl: this.filterOptions.uus.aktProhl,
                                        onlyActive: this.filterOptions.uus.onlyActive, caption: this.filterOptions.uus.caption, name: "uus", firstField: undefined, secondField: undefined,
                                        model: "uus",
                                        disabled: !!(this.Radek_DPH) && !!this.Filter.ucs
                                    })
                                });
                            if (!this.AvoidNks)
                                gf.addTextColumn({
                                    name: "nks",
                                    caption: this.zkratky.Nks,
                                    description: this.texty.Nks,
                                    width: 60,
                                    //group: topoGroup,
                                    serverFilter: Gordic.Eko.Filters.nksInterval(this.filterOptions.nks)
                                });
                            break;
                        case 40 /* Gordic.Uct.Interface.GUcrRezimProvozu.SOR */:
                            gf.addTextColumn({
                                name: "ico",
                                caption: this.zkratky.Ico,
                                description: this.texty.Ico,
                                width: 60,
                                //group: topoGroup
                                aggregate: Gordic.Data.Aggregates.first("ico"),
                                serverFilter: this.ExterniSumarizace
                                    ? Gordic.Eko.Filters.rarInterval({ model: "ico", onlyActive: false, caption: this.zkratky.Ico, disabled: !!(this.Radek_DPH) })
                                    : Gordic.Eko.Filters.icoInterval({ model: "ico", onlyActive: false, caption: this.zkratky.Ico, disabled: !!(this.Radek_DPH) })
                            });
                            if (this.AvoidExt || this.globals.TypSumarizace !== 1 /* Gordic.Uct.Interface.GUcrTypSumarizace.Externi */) {
                                gf.addTextColumn({
                                    name: "ucs",
                                    caption: this.zkratky.Ucs,
                                    description: this.texty.Ucs,
                                    width: 60,
                                    //group: topoGroup,
                                    aggregate: Gordic.Data.Aggregates.first("ucs"),
                                    //serverFilter: Gordic.Eko.Filters.ucsInterval(this.filterOptions.ucs)
                                    serverFilter: Gordic.Eko.Filters.ucsInterval({
                                        ico: this.filterOptions.ucs.ico, aktProhl: this.filterOptions.ucs.aktProhl,
                                        onlyActive: this.filterOptions.ucs.onlyActive, caption: this.filterOptions.ucs.caption, name: "ucs", firstField: undefined, secondField: undefined,
                                        model: "ucs",
                                        disabled: !!(this.Radek_DPH) && !!this.Filter.ucs
                                    })
                                });
                                if (!this.AvoidUus)
                                    gf.addTextColumn({
                                        name: "uus",
                                        caption: this.zkratky.Uus,
                                        description: this.texty.Uus,
                                        width: 60,
                                        //group: topoGroup,
                                        //serverFilter: Gordic.Eko.Filters.uusInterval(this.filterOptions.uus)
                                        serverFilter: Gordic.Eko.Filters.uusInterval({
                                            ico: this.filterOptions.uus.ico, ucs: this.filterOptions.uus.ucs, aktProhl: this.filterOptions.uus.aktProhl,
                                            onlyActive: this.filterOptions.uus.onlyActive, caption: this.filterOptions.uus.caption, name: "uus", firstField: undefined, secondField: undefined,
                                            model: "uus",
                                            disabled: !!(this.Radek_DPH) && !!this.Filter.ucs
                                        })
                                    });
                                if (!this.AvoidNks)
                                    gf.addTextColumn({
                                        name: "nks",
                                        caption: this.zkratky.Nks,
                                        description: this.texty.Nks,
                                        width: 60,
                                        //group: topoGroup,
                                        serverFilter: Gordic.Eko.Filters.nksInterval(this.filterOptions.nks)
                                    });
                            }
                            break;
                    }
                    //var drdServerFilter = Gordic.Eko.Filters.drd(this.filterOptions.drd);
                    gf.addNumberColumn({
                        name: "drd",
                        caption: "jres:31100052 ", //RC 31100052 : H
                        description: "jres:31100102", //RC 31100102 : Druh dokladu (DRD)
                        width: 30,
                        //serverFilter: Gordic.Eko.Filters.drd(this.filterOptions.drd)
                        serverFilter: Gordic.Eko.Filters.drd({
                            caption: this.filterOptions.drd.caption,
                            model: this.filterOptions.drd.model,
                            maxLength: this.filterOptions.drd.maxLength,
                            items: [{
                                    name: "drd_moje_ostatni",
                                    caption: "jres:30250139", //RC 30250139 : Ostatní
                                    dataSource: $.Deferred()
                                        .resolve([
                                        { drd: 9, drd_txt: "jres:30250134" }, //RC 30250134 : Požadavek na rozpočet
                                        { drd: 69, drd_txt: "jres:30250135" }, //RC 30250135 : Blokace požadavků na rozpočet
                                        { drd: 103, drd_txt: "jres:30250136" }, //RC 30250136 : Disponibilní zdroje financování
                                        { drd: 130, drd_txt: "jres:30250137" }, //RC 30250137 : Rezerva zdrojů financování
                                        { drd: 140, drd_txt: "jres:30250138" } //RC 30250138 : Financování bez zdrojů
                                    ])
                                        .promise()
                                }]
                        })
                    });
                    gf.addNumberColumn({
                        name: "rok",
                        caption: "jres:30250008", //RC 30250008 : Rok
                        description: "",
                        width: 80,
                        serverFilter: Gordic.Eko.Filters.integerInterval({ model: "rok", caption: "jres:30250008" }) //RC 30250008 : Rok
                    });
                    gf.addSortedEkoCfuSet(this.getCfuSetServerFilters(true));
                    if (this.globals.RezimZobrazeniUlohyFinancovani === 1 /* Gordic.Uct.Interface.GUcrRezimZobrazeniFinancovani.FinancovaniSeStrednedobymVyhledem */) {
                        gf.addCurrencyColumn({
                            name: "c_navrh",
                            caption: "jres:30250009", //RC 30250009 : Návrh rozpočtu
                            width: 120,
                            serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_navrh", caption: "jres:30250009" }) //RC 30250009 : Návrh rozpočtu
                        });
                    }
                    gf.addCurrencyColumn({
                        name: "c_sl",
                        caption: "jres:30250010", //RC 30250010 : Rozpočet schválený
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_sl", caption: "jres:30250010" }) //RC 30250010 : Rozpočet schválený
                    });
                    if (this.globals.ZobrazeniCerpaniRozpoctuVProcentech) {
                        gf.addDecimalColumn({
                            name: "c_cerpani_rs",
                            caption: "jres:30250011", //RC 30250011 : Čerpání k RS %
                            width: 120,
                            serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_cerpani_rs", caption: "jres:30250011" }) //RC 30250011 : Čerpání k RS %
                        });
                    }
                    gf.addCurrencyColumn({
                        name: "c_ru",
                        caption: "jres:30250012", //RC 30250012 : Rozpočet upravený
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_ru", caption: "jres:30250012" }) //RC 30250012 : Rozpočet upravený
                    });
                    if (this.globals.ZobrazeniCerpaniRozpoctuVProcentech) {
                        gf.addDecimalColumn({
                            name: "c_cerpani_ru",
                            caption: "jres:30250013", //RC 30250013 : Čerpání k RU %
                            width: 120,
                            serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_cerpani_ru", caption: "jres:30250013" }) //RC 30250013 : Čerpání k RU %
                        });
                    }
                    gf.addCurrencyColumn({
                        name: "c_14",
                        caption: "jres:30250014", //RC 30250014 : Rozpočet vázaný
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_14", caption: "jres:30250014" }) //RC 30250014 : Rozpočet vázaný
                    });
                    gf.addCurrencyColumn({
                        name: "c_mrz",
                        caption: "jres:30250015", //RC 30250015 : Mimorozp. zdroje
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_mrz", caption: "jres:30250015" }) //RC 30250015 : Mimorozp. zdroje
                    });
                    gf.addCurrencyColumn({
                        name: "c_act",
                        caption: "jres:30250016", //RC 30250016 : Aktuální zdroje
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_act", caption: "jres:30250016" }) //RC 30250016 : Aktuální zdroje
                    });
                    gf.addCurrencyColumn({
                        name: "c_vz",
                        caption: "jres:30250017", //RC 30250017 : Blokováno ROZ
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_vz", caption: "jres:30250017" }) //RC 30250017 : Blokováno ROZ
                    });
                    gf.addCurrencyColumn({
                        name: "c_sml",
                        caption: "jres:30250018", //RC 30250018 :  Nasmlouváno ROZ
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_sml", caption: "jres:30250018" }) //RC 30250018 :  Nasmlouváno ROZ
                    });
                    gf.addCurrencyColumn({
                        name: "c_vz_sml",
                        caption: "jres:30250019", //RC 30250019 : Nasmlouváno BLK
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_vz_sml", caption: "jres:30250019" }) //RC 30250019 : Nasmlouváno BLK
                    });
                    gf.addCurrencyColumn({
                        name: "c_obj",
                        caption: "jres:30250020", //RC 30250020 : Objednáno ROZ
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_obj", caption: "jres:30250020" }) //RC 30250020 : Objednáno ROZ
                    });
                    gf.addCurrencyColumn({
                        name: "c_obj_sml",
                        caption: "jres:30250021", //RC 30250021 : Objednáno SML
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_obj_sml", caption: "jres:30250021" }) //RC 30250021 : Objednáno SML
                    });
                    gf.addCurrencyColumn({
                        name: "c_obj_blk",
                        caption: "jres:30250022", //RC 30250022 : Objednáno BLK
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_obj_blk", caption: "jres:30250022" }) //RC 30250022 : Objednáno BLK
                    });
                    gf.addCurrencyColumn({
                        name: "c_fak",
                        caption: "jres:30250023", //RC 30250023 : Rezervováno ROZ
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_fak", caption: "jres:30250023" }) //RC 30250023 : Rezervováno ROZ
                    });
                    gf.addCurrencyColumn({
                        name: "c_rsm",
                        caption: "jres:30250024", //RC 30250023 : Rezervováno ROZ
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_rsm", caption: "jres:30250024" }) //RC 30250024 : Rezervováno SML
                    });
                    gf.addCurrencyColumn({
                        name: "c_disp",
                        caption: "jres:30250025", //RC 30250025 : Disponibilní zdroje
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_disp", caption: "jres:30250025" }) //RC 30250025 : Disponibilní zdroje
                    });
                    gf.addCurrencyColumn({
                        name: "c_uct",
                        caption: "jres:30250026", //RC 30250026 : Čerpáno
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c_uct", caption: "jres:30250026" }) //RC 30250026 : Čerpáno
                    });
                    return gf;
                }
                createProfiles(gf) {
                    let profiles = {
                        default: { name: "jres:31100232", columns: {} } //RC 31100232 : Výchozí
                    };
                    gf.columns.filter((c) => { return !c.hidden; })
                        .forEach((c) => { profiles.default.columns[c.name] = { hidden: false }; });
                    return profiles;
                }
                createActions() {
                    super.createActions();
                    if (typeof this.parentCnt.actions.detailAct !== "undefined")
                        this.parentCnt.actions.detailAct = undefined;
                    this.zapisyAct = this.parentCnt.actions.add({
                        name: "zapisyAct",
                        icon: "gi-list",
                        enabled: false,
                        caption: "jres:31100124", //RC 31100124 : Zápisy
                        run: (ev, ctx) => { this.showZapisy(); }
                    });
                }
                /**
                 * Definice menu
                 * @param typUlohy
                 */
                DefineMenuBar(typUlohy) {
                    return super.DefineMenuBar(typUlohy);
                    //let menu = new Array<MenuParams>();
                    //menu.push({ action: this.parentCnt.actions.prevFilterAct/* this.prevFilterAct*/, favorite: true, align: "opposite" });
                    //menu.push({ action: this.parentCnt.actions.nextFilterAct /*this.nextFilterAct*/, favorite: true, align: "opposite" });
                    //menu.push({ action: this.zapisyAct, favorite: true });
                    //if (this.printAct)
                    //    menu.push({ action: this.printAct, favorite: true });
                    //menu.push({ action: this.clearFilterRowAct });
                    //menu.push({
                    //    type: "static",
                    //    caption: "jres:31100268", //RC 31100268 : Rychlé akce
                    //    children: [
                    //        { action: this.parentCnt.actions.insAct /*this.insAct*/, icon: "gi-refresh", caption: "jres:31100226" }, //RC 31100226 : Načtení dat
                    //        { action: this.parentCnt.actions.clearAndFilterAct /*this.clearAndFilterAct*/, caption: "jres:31100228" }, //RC 31100228 : Vyčistit a načíst
                    //        { action: this.zapisyAct, caption: "jres:31100124" } //RC 31100124 : Zápisy
                    //    ]
                    //});
                    //return menu;
                }
                /**
                 * Zobrazeni detailu - budu zobrazovat zapisy
                 * @param row
                 */
                showDetail(row) {
                    this.showZapisy();
                }
                /**
                 *
                 * Zobrazeni zapisu
                 * */
                showZapisy() {
                    const that = this;
                    this.getFilter()
                        .then((f) => {
                        let grid = that.getGrid();
                        if (grid == null)
                            return;
                        let sel = grid.ggrid("getSelection", false);
                        if (sel.length !== 1)
                            return;
                        let row = sel[0];
                        let id;
                        //NOTE: Odpovida z TK UCR: GSeznamZapisuVRadkuTab.LoadGridData()
                        let filter = {
                            ico: { start: row.ico, end: row.ico },
                            ucs: { start: row.ucs, end: row.ucs },
                            uus: { start: row.uus, end: row.uus },
                            nks: { start: row.nks, end: row.nks },
                            rok: { start: row.rok, end: row.rok },
                            //mesic: { start: 0, end: row.mesic },
                            //drd_msk: row.drd!.toString(),
                            cfu: {
                                uea: { start: row.uea, end: row.uea },
                                ueb: { start: row.ueb, end: row.ueb },
                                uec: { start: row.uec, end: row.uec },
                                ued: { start: row.ued, end: row.ued },
                                uee: { start: row.uee, end: row.uee },
                                uef: { start: row.uef, end: row.uef },
                                ueg: { start: row.ueg, end: row.ueg },
                                ueh: { start: row.ueh, end: row.ueh },
                                uei: { start: row.uei, end: row.uei },
                                uej: { start: row.uej, end: row.uej },
                                uek: { start: row.uek, end: row.uek },
                                uel: { start: row.uel, end: row.uel },
                                uem: { start: row.uem, end: row.uem },
                                uen: { start: row.uen, end: row.uen },
                                te0: { start: row.te0, end: row.te0 },
                                te1: { start: row.te1, end: row.te1 },
                                te2: { start: row.te2, end: row.te2 },
                                te3: { start: row.te3, end: row.te3 },
                                te4: { start: row.te4, end: row.te4 },
                                te5: { start: row.te5, end: row.te5 },
                                te6: { start: row.te6, end: row.te6 },
                                te7: { start: row.te7, end: row.te7 },
                                te8: { start: row.te8, end: row.te8 },
                                te9: { start: row.te9, end: row.te9 },
                            }
                        };
                        let typUlohy = 4 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.FinancovaniZapis */;
                        id = "uctZapisy#"; //NOTE: Musi byt stejne ni na MainApp.cs
                        return this.parentCnt.navigate('Gordic.Ucr.WebClient.GSeznamEkoZaznamu', {
                            ID: id,
                            TypUlohy: typUlohy,
                            Filter: filter,
                            StrictFilter: true,
                            AutoLoadData: true,
                            title: "jres:30250047" //RC 30250047 : Zápisy financování
                        });
                    });
                }
                getZapisFilter() {
                    let grid = this.getGrid();
                    if (grid == null)
                        return {};
                    var sel = grid.ggrid("getSelection", false)[0];
                    if (this.parentCnt.TypUlohy === 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */)
                        return {
                            ucs: { start: sel.ucs, end: sel.ucs },
                            mesic: { start: sel.mesic, end: sel.mesic },
                            ac: { start: sel.ac, end: sel.ac }
                        };
                    return {
                        ucs: { start: sel.ucs, end: sel.ucs },
                        drd_msk: sel.drd.toString(),
                        mesic: { start: sel.mesic, end: sel.mesic },
                        ac: { start: sel.ac, end: sel.ac }
                    };
                }
            }
            WebClient.GSeznamEkoFinancovani = GSeznamEkoFinancovani;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUVrb0ZpbmFuY292YW5pLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbUVrb0ZpbmFuY292YW5pLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0F5a0JmO0FBemtCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F5a0JuQjtJQXprQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXlrQjdCO1FBemtCb0IsV0FBQSxTQUFTO1lBRTFCLE1BQWEscUJBQXNCLFNBQVEsVUFBQSxxQkFBcUI7Z0JBZTVELFlBQVksT0FBcUM7b0JBQzdDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFUbkIsMEJBQTBCO29CQUMxQixxQ0FBcUM7b0JBQ3JDLGdDQUFnQztvQkFDaEMseUNBQXlDO29CQUd6QyxpR0FBaUc7b0JBQ2pHLGVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSx1QkFBdUIsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSwwQkFBMEIsRUFBRSxDQUFDO29CQUc5RixJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO29CQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztvQkFDM0IsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztvQkFDaEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7b0JBQzVCLDRDQUE0QztvQkFDNUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ3pELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUMvRCxDQUFDO2dCQUVEOzs7cUJBR0s7Z0JBQ0UsYUFBYSxDQUFDLElBQXlCLEVBQUUsVUFBa0I7b0JBQzlELDRCQUE0QjtvQkFD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QUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTs0QkFDdkMsc0NBQXNDOzRCQUN0QywrQkFBK0I7NEJBQy9CLEdBQUcsRUFBRTtnQ0FDRCxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtnQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7Z0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO2dDQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtnQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7Z0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO2dDQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtnQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7Z0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO2dDQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtnQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7Z0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO2dDQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtnQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7Z0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO2dDQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtnQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7Z0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO2dDQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtnQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7Z0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO2dDQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtnQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7Z0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFOzZCQUMxQzt5QkFDSixDQUFDO3dCQUdGLElBQUksUUFBUSx1RUFBK0QsQ0FBQzt3QkFDNUUsRUFBRSxHQUFHLFlBQVksQ0FBQyxDQUFDLHdDQUF3Qzt3QkFHM0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyx3Q0FBd0MsRUFBRTs0QkFDckUsRUFBRSxFQUFFLEVBQUU7NEJBQ04sUUFBUSxFQUFFLFFBQVE7NEJBQ2xCLE1BQU0sRUFBRSxNQUFNOzRCQUNkLFlBQVksRUFBRSxJQUFJOzRCQUNsQixZQUFZLEVBQUUsSUFBSTs0QkFDbEIsS0FBSyxFQUFFLGVBQWUsQ0FBQyxrQ0FBa0M7eUJBQzVELENBQUMsQ0FBQztvQkFFUCxDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO2dCQUdTLGNBQWM7b0JBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDMUIsSUFBSSxJQUFJLElBQUksSUFBSTt3QkFBRSxPQUFPLEVBQUUsQ0FBQztvQkFFNUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUF3QyxDQUFDO29CQUN0RixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxvRUFBMkQ7d0JBQ2xGLE9BQU87NEJBQ0gsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7NEJBQ3JDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFOzRCQUMzQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRTt5QkFDckMsQ0FBQztvQkFFTixPQUFPO3dCQUNILEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFO3dCQUNyQyxPQUFPLEVBQUUsR0FBSSxDQUFDLEdBQUksQ0FBQyxRQUFRLEVBQUU7d0JBQzdCLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFO3dCQUMzQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRTtxQkFDckMsQ0FBQztnQkFDTixDQUFDO2FBSUo7WUFwa0JZLCtCQUFxQix3QkFva0JqQyxDQUFBO1FBR0wsQ0FBQyxFQXprQm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQXlrQjdCO0lBQUQsQ0FBQyxFQXprQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQXlrQm5CO0FBQUQsQ0FBQyxFQXprQlMsTUFBTSxLQUFOLE1BQU0sUUF5a0JmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbUVrb0ZpbmFuY292YW5pIGV4dGVuZHMgR1Nlem5hbUVrb1phem5hbXVCYXNlIGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuICBcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIHByZXZGaWx0ZXJBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgLy9wcml2YXRlIG5leHRGaWx0ZXJBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSB6YXBpc3lBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9wcml2YXRlIGluc0FjdDogR0FjdGlvbjtcclxuICAgICAgICAvL3ByaXZhdGUgY2xlYXJBbmRGaWx0ZXJBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgLy9wcml2YXRlIHNlbEZpbHRlckFjdDogR0FjdGlvbjtcclxuICAgICAgICAvL3ByaXZhdGUgc2VsRmlsdGVyQW5kU2VhcmNoQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvKiogTGltaXQgcG9jdHUgbmFjaXRhbnljaCB6YXpuYW11LCBwb2t1ZCBuZWRvamRlIGsgcG90dnJ6ZW5pLCB6ZSB1eml2YXRlbCBjaGNlIGppdCBwcmVzIGxpbWl0ICovXHJcbiAgICAgICAgbG9nT3B0aW9ucyA9IHsgbmFtZTogXCJHU2V6bmFtRWtvRmluYW5jb3ZhbmlcIiwgYXV0aG9yQ29kZTogMzAyLCBmaWxlOiBcIkdTZXpuYW1Fa29GaW5hbmNvdmFuaS50c1wiIH07XHJcbiAgICAgICAgY29uc3RydWN0b3IoY29udGVudDogR1Nlem5hbUVrb1phem5hbXVCYXNlQ29udGVudCkge1xyXG4gICAgICAgICAgICBzdXBlcihjb250ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5wb3V6aXZhblN0cnVrUG9waXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5wb3ZvbGVuTmFobGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc291Y2V0VmVTdGF0dXNCYXJ1ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucmVtZW1iZXJIaXN0b3J5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gZGVmaW5pY2UgdGFza3UgcHJvIHNlem5hbSBhIG5hY3RlbmkgcG9jdHVcclxuICAgICAgICAgICAgdGhpcy50YXNrTGlzdCA9IHRoaXMucGFyZW50Q250LmlzbC5VY3JSb3pTdGF2eUFhdC5saXN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFza0NvdW50ID0gdGhpcy5wYXJlbnRDbnQuaXNsLlVjclJvelN0YXZ5QWF0LmNvdW50KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbmkgcHJpc3R1cG5vc3RpIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBuYXN0YXZlbmlBa2NpKGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD4sIHBvY2V0UmFka3U6IG51bWJlcikge1xyXG4gICAgICAgICAgICAvL2xldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIC8vaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuIDtcclxuICAgICAgICAgICAgLy92YXIgZW5hYmxlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkNlbGtvdnlQb2NldFJhZGt1KGdyaWQpPjA7XHJcbiAgICAgICAgICAgIHZhciBlbmFibGUgPSBwb2NldFJhZGt1ID4gMDtcclxuICAgICAgICAgICAgLy8gcHJpc3R1cG5vc3QgYWtjaSBkbGUgbmFjdGVueWNoIGRhdFxyXG4gICAgICAgICAgICB0aGlzLnphcGlzeUFjdC5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZG90QWN0LmVuYWJsZWQoZW5hYmxlKTtcclxuICAgICAgICAgICAgdGhpcy5wcmV2aWV3Q29udHJvbGxlcj8uZW5hYmxlKGVuYWJsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3Jlbmkga2xhdmVzb3Z5Y2ggemtyYXRla1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGNyZWF0ZVNob3J0Q3V0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVTaG9ydEN1dCgpO1xyXG4gICAgICAgICAgICAvL2xldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy90aGlzLnBhcmVudENudC5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIC8vICAgIGtleTogXCJJTlNFUlRcIixcclxuICAgICAgICAgICAgLy8gICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyNlwiLCAvL1JDIDMxMTAwMjI2IDogTmHEjXRlbsOtIGRhdFxyXG4gICAgICAgICAgICAvLyAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuVGFzayxcclxuICAgICAgICAgICAgLy8gICAgY2FuRXhlY3V0ZTogKGV2KSA9PiB7IHJldHVybiBldi50YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiOyB9LFxyXG4gICAgICAgICAgICAvLyAgICBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuaW5zQWN0Ly90aGlzLmluc0FjdFxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLnBhcmVudENudC5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIC8vICAgIGtleTogXCJERUxFVEVcIixcclxuICAgICAgICAgICAgLy8gICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDE4MVwiLCAvL1JDIDMxMTAwMTgxIDogVnnEjWlzdGl0XHJcbiAgICAgICAgICAgIC8vICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgLy8gICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgIC8vICAgIGFjdGlvbjogdGhpcy5jbGVhckZpbHRlclJvd0FjdFxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLnBhcmVudENudC5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIC8vICAgIGtleTogXCIxXCIsXHJcbiAgICAgICAgICAgIC8vICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMThcIiwgLy9SQyAzMTEwMDIxOCA6IFDFmWVkY2hvesOtIGZpbHRyXHJcbiAgICAgICAgICAgIC8vICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgLy8gICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgIC8vICAgIGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5wcmV2RmlsdGVyQWN0Ly90aGlzLnByZXZGaWx0ZXJBY3RcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5wYXJlbnRDbnQuZWxlbWVudC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAvLyAgICBrZXk6IFwiMFwiLFxyXG4gICAgICAgICAgICAvLyAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjI4XCIsIC8vUkMgMzExMDAyMjggOiBWecSNaXN0aXQgYSBuYcSNw61zdFxyXG4gICAgICAgICAgICAvLyAgICBjYW5FeGVjdXRlOiAoZXYpID0+IHsgcmV0dXJuIGV2LnRhcmdldC50YWdOYW1lICE9PSBcIklOUFVUXCI7IH0sXHJcbiAgICAgICAgICAgIC8vICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5UYXNrLFxyXG4gICAgICAgICAgICAvLyAgICBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuY2xlYXJBbmRGaWx0ZXJBY3QvL3RoaXMuY2xlYXJBbmRGaWx0ZXJBY3RcclxuICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgLy9sZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAvL2lmIChncmlkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vICAgIGdyaWQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGtleTogXCJjdHJsK3NoaWZ0K2xjbGlja1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkdyaWQsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjI5XCIsIC8vUkMgMzExMDAyMjkgOiBQxZllbmVzZW7DrSBob2Rub3R5IGRvIGZpbHRydS5cclxuICAgICAgICAgICAgLy8gICAgICAgIGFjdGlvbjogdGhpcy5zZWxGaWx0ZXJBY3RcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICBncmlkLmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBrZXk6IFwiY3RybCtsY2xpY2tcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIzNVwiLCAvL1JDIDMxMTAwMjM1IDogUMWZZW5lc2Vuw60gaG9kbm90eSBkbyBmaWx0cnUgYSB2eWhsZWTDoW7DrS5cclxuICAgICAgICAgICAgLy8gICAgICAgIGFjdGlvbjogdGhpcy5zZWxGaWx0ZXJBbmRTZWFyY2hBY3RcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyAgICBncmlkLmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBrZXk6IFtcIi5cIiwgXCIsXCJdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy9OT1RFOiBEZXNjcmlwdGlvbiBvcHNhbm8geiBuYXBvdmVkeSBrIFRLIFVDUlxyXG4gICAgICAgICAgICAvLyAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyN1wiLCAvL1JDIDMxMTAwMjI3IDogWm9icmF6ZW7DrSB2xaFlY2ggesOhcGlzxa8gZG9rbGFkxa8gKGNlbMO9IGRva2xhZCkgbmFkIG96bmHEjWVuw71tIHrDoXBpc2VtLlxyXG4gICAgICAgICAgICAvLyAgICAgICAgY2FuRXhlY3V0ZTogKGV2KSA9PiB7IHJldHVybiBldi50YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiOyB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkdyaWQsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBhY3Rpb246IHRoaXMuZG90QWN0XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBncmlkZm9ybWF0dVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0U2V6bmFtWmFwaXN1U3RhdnVEdG8vKiZHU2V6bmFtWmFwaXN1U3RhdnVEdG8qLz4ge1xyXG4gICAgICAgICAgICB2YXIgZ2YgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0U2V6bmFtWmFwaXN1U3RhdnVEdG8+KCk7XHJcbiAgICAgICAgICAgIC8vdmFyIHRvcG9Hcm91cCA9IFwidG9wb1wiO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudENudC5la29QYXJhbXMuUHJpek5wdiEgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHsgLy9OT1RFOiBWIFRLIGplIHRvIHByaWRhbm8gamFrbyBBZGRMb29rdXBDb2x1bW4hIChhcmcuOiBEZXRhaWxUeXB1QWdlbmR5Lnprcl9hZylcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRydWhfY2hhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDAwNlwiLCAvL1JDIDMwMjUwMDA2IDogRHJ1aFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiBcIntkcnVoX2NoYXJfdHh0OnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcImRydWhfY2hhcl90eHRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkZpbHRlclByZWZhYnMuZHJ1aF9jaGFyKHsgbW9kZWw6IFwiZHJ1aF9jaGFyXCIsIHR4dF9uYW1lOiBcImRydWhfY2hhcl90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDA2XCIgfSkgLy9SQyAzMDI1MDAwNiA6IERydWhcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7IC8vTk9URTogViBUSyBqZSB0byBwcmlkYW5vIGpha28gQWRkTG9va3VwQ29sdW1uISAoYXJnLjogRGV0YWlsVHlwdUFnZW5keS56a3JfYWcpXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcml6X2NoYXJcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMDdcIiwgLy9SQyAzMDI1MDAwNyA6IENoYXJha3RlclxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiBcIntwcml6X2NoYXJfdHh0OnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcInByaXpfY2hhcl90eHRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkZpbHRlclByZWZhYnMucHJpel9jaGFyKHsgbW9kZWw6IFwicHJpel9jaGFyXCIsIHR4dF9uYW1lOiBcInByaXpfY2hhcl90eHRcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDA3XCIgfSkgLy9SQyAzMDI1MDAwNyA6IENoYXJha3RlclxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdsb2JhbHMuUmV6aW1Qcm92b3p1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1Lk5LUzogYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LlVDUzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLm5rc0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy5ua3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuSUNPOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwidWNzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudWNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudWNzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5pY28sIGFrdFByb2hsOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmFrdFByb2hsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuY2FwdGlvbiwgbmFtZTogXCJ1Y3NcIiwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJ1Y3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKSAmJiAhIXRoaXMuRmlsdGVyLnVjc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Bdm9pZFV1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnV1c0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy51dXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuaWNvLCB1Y3M6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMudWNzLCBha3RQcm9obDogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5ha3RQcm9obFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG9ubHlBY3RpdmU6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMub25seUFjdGl2ZSwgY2FwdGlvbjogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5jYXB0aW9uLCBuYW1lOiBcInV1c1wiLCBmaXJzdEZpZWxkOiB1bmRlZmluZWQsIHNlY29uZEZpZWxkOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJ1dXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiAhISh0aGlzLlJhZGVrX0RQSCkgJiYgISF0aGlzLkZpbHRlci51Y3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuQXZvaWROa3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMubmtzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLm5rcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuU09SOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuSWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuSWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJpY29cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IHRoaXMuRXh0ZXJuaVN1bWFyaXphY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IEdvcmRpYy5Fa28uRmlsdGVycy5yYXJJbnRlcnZhbCh7IG1vZGVsOiBcImljb1wiLCBvbmx5QWN0aXZlOiBmYWxzZSwgY2FwdGlvbjogdGhpcy56a3JhdGt5LkljbywgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogR29yZGljLkVrby5GaWx0ZXJzLmljb0ludGVydmFsKHsgbW9kZWw6IFwiaWNvXCIsIG9ubHlBY3RpdmU6IGZhbHNlLCBjYXB0aW9uOiB0aGlzLnprcmF0a3kuSWNvLCBkaXNhYmxlZDogISEodGhpcy5SYWRla19EUEgpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuQXZvaWRFeHQgfHwgdGhpcy5nbG9iYWxzLlR5cFN1bWFyaXphY2UgIT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JUeXBTdW1hcml6YWNlLkV4dGVybmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJ1Y3NcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudWNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmljbywgYWt0UHJvaGw6IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuYWt0UHJvaGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuY2FwdGlvbiwgbmFtZTogXCJ1Y3NcIiwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwidWNzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkaXNhYmxlZDogISEodGhpcy5SYWRla19EUEgpICYmICEhdGhpcy5GaWx0ZXIudWNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Bdm9pZFV1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1dXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuVXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51dXNJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudXVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51dXNJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuaWNvLCB1Y3M6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMudWNzLCBha3RQcm9obDogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5ha3RQcm9obFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuY2FwdGlvbiwgbmFtZTogXCJ1dXNcIiwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcInV1c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiAhISh0aGlzLlJhZGVrX0RQSCkgJiYgISF0aGlzLkZpbHRlci51Y3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuQXZvaWROa3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLm5rc0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy5ua3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3ZhciBkcmRTZXJ2ZXJGaWx0ZXIgPSBHb3JkaWMuRWtvLkZpbHRlcnMuZHJkKHRoaXMuZmlsdGVyT3B0aW9ucy5kcmQpO1xyXG4gICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkcmRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1MiBcIiwgLy9SQyAzMTEwMDA1MiA6IEhcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAxMDJcIiwgLy9SQyAzMTEwMDEwMiA6IERydWggZG9rbGFkdSAoRFJEKVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMwLFxyXG4gICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kcmQodGhpcy5maWx0ZXJPcHRpb25zLmRyZClcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRyZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5maWx0ZXJPcHRpb25zLmRyZC5jYXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiB0aGlzLmZpbHRlck9wdGlvbnMuZHJkLm1vZGVsLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heExlbmd0aDogdGhpcy5maWx0ZXJPcHRpb25zLmRyZC5tYXhMZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZHJkX21vamVfb3N0YXRuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxMzlcIiwgLy9SQyAzMDI1MDEzOSA6IE9zdGF0bsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFTb3VyY2U6ICQuRGVmZXJyZWQ8R29yZGljLkRhdGEuUmVhZGVycy5Fa29jZHJkRHRvW10+KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXNvbHZlKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRyZDogOSwgZHJkX3R4dDogXCJqcmVzOjMwMjUwMTM0XCIgfSwgLy9SQyAzMDI1MDEzNCA6IFBvxb5hZGF2ZWsgbmEgcm96cG/EjWV0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkcmQ6IDY5LCBkcmRfdHh0OiBcImpyZXM6MzAyNTAxMzVcIiB9LCAvL1JDIDMwMjUwMTM1IDogQmxva2FjZSBwb8W+YWRhdmvFryBuYSByb3pwb8SNZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRyZDogMTAzLCBkcmRfdHh0OiBcImpyZXM6MzAyNTAxMzZcIiB9LCAvL1JDIDMwMjUwMTM2IDogRGlzcG9uaWJpbG7DrSB6ZHJvamUgZmluYW5jb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZHJkOiAxMzAsIGRyZF90eHQ6IFwianJlczozMDI1MDEzN1wiIH0sIC8vUkMgMzAyNTAxMzcgOiBSZXplcnZhIHpkcm9qxa8gZmluYW5jb3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZHJkOiAxNDAsIGRyZF90eHQ6IFwianJlczozMDI1MDEzOFwiIH0gLy9SQyAzMDI1MDEzOCA6IEZpbmFuY292w6Fuw60gYmV6IHpkcm9qxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJvbWlzZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDA4XCIsIC8vUkMgMzAyNTAwMDggOiBSb2tcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHsgbW9kZWw6IFwicm9rXCIsIGNhcHRpb246IFwianJlczozMDI1MDAwOFwiIH0pICAvL1JDIDMwMjUwMDA4IDogUm9rXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgZ2YuYWRkU29ydGVkRWtvQ2Z1U2V0KHRoaXMuZ2V0Q2Z1U2V0U2VydmVyRmlsdGVycyh0cnVlKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5SZXppbVpvYnJhemVuaVVsb2h5RmluYW5jb3ZhbmkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVpvYnJhemVuaUZpbmFuY292YW5pLkZpbmFuY292YW5pU2VTdHJlZG5lZG9ieW1WeWhsZWRlbSkge1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19uYXZyaFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDAwOVwiLCAvL1JDIDMwMjUwMDA5IDogTsOhdnJoIHJvenBvxI10dVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiY19uYXZyaFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMDlcIiB9KSAvL1JDIDMwMjUwMDA5IDogTsOhdnJoIHJvenBvxI10dVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX3NsXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMTBcIiwgLy9SQyAzMDI1MDAxMCA6IFJvenBvxI1ldCBzY2h2w6FsZW7DvVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImNfc2xcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDEwXCIgfSkgLy9SQyAzMDI1MDAxMCA6IFJvenBvxI1ldCBzY2h2w6FsZW7DvVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5ab2JyYXplbmlDZXJwYW5pUm96cG9jdHVWUHJvY2VudGVjaCkge1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkRGVjaW1hbENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2NlcnBhbmlfcnNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMTFcIiwgLy9SQyAzMDI1MDAxMSA6IMSMZXJww6Fuw60gayBSUyAlXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjX2NlcnBhbmlfcnNcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDExXCIgfSkgLy9SQyAzMDI1MDAxMSA6IMSMZXJww6Fuw60gayBSUyAlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfcnVcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDAxMlwiLCAvL1JDIDMwMjUwMDEyIDogUm96cG/EjWV0IHVwcmF2ZW7DvVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImNfcnVcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDEyXCIgfSkgLy9SQyAzMDI1MDAxMiA6IFJvenBvxI1ldCB1cHJhdmVuw71cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLlpvYnJhemVuaUNlcnBhbmlSb3pwb2N0dVZQcm9jZW50ZWNoKSB7XHJcbiAgICAgICAgICAgICAgICBnZi5hZGREZWNpbWFsQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfY2VycGFuaV9ydVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDAxM1wiLCAvL1JDIDMwMjUwMDEzIDogxIxlcnDDoW7DrSBrIFJVICVcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImNfY2VycGFuaV9ydVwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMTNcIiB9KSAvL1JDIDMwMjUwMDEzIDogxIxlcnDDoW7DrSBrIFJVICVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfMTRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDAxNFwiLCAvL1JDIDMwMjUwMDE0IDogUm96cG/EjWV0IHbDoXphbsO9XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiY18xNFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMTRcIiB9KSAvL1JDIDMwMjUwMDE0IDogUm96cG/EjWV0IHbDoXphbsO9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfbXJ6XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMTVcIiwgLy9SQyAzMDI1MDAxNSA6IE1pbW9yb3pwLiB6ZHJvamVcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjX21yelwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMTVcIiB9KSAvL1JDIDMwMjUwMDE1IDogTWltb3JvenAuIHpkcm9qZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX2FjdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDE2XCIsIC8vUkMgMzAyNTAwMTYgOiBBa3R1w6FsbsOtIHpkcm9qZVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImNfYWN0XCIsIGNhcHRpb246IFwianJlczozMDI1MDAxNlwiIH0pIC8vUkMgMzAyNTAwMTYgOiBBa3R1w6FsbsOtIHpkcm9qZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX3Z6XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMTdcIiwgLy9SQyAzMDI1MDAxNyA6IEJsb2tvdsOhbm8gUk9aXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiY192elwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMTdcIiB9KSAvL1JDIDMwMjUwMDE3IDogQmxva292w6FubyBST1pcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19zbWxcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDAxOFwiLCAvL1JDIDMwMjUwMDE4IDogIE5hc21sb3V2w6FubyBST1pcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjX3NtbFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMThcIiB9KSAvL1JDIDMwMjUwMDE4IDogIE5hc21sb3V2w6FubyBST1pcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY192el9zbWxcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDAxOVwiLCAvL1JDIDMwMjUwMDE5IDogTmFzbWxvdXbDoW5vIEJMS1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImNfdnpfc21sXCIsIGNhcHRpb246IFwianJlczozMDI1MDAxOVwiIH0pIC8vUkMgMzAyNTAwMTkgOiBOYXNtbG91dsOhbm8gQkxLXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfb2JqXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMjBcIiwgLy9SQyAzMDI1MDAyMCA6IE9iamVkbsOhbm8gUk9aXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiY19vYmpcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDIwXCIgfSkgLy9SQyAzMDI1MDAyMCA6IE9iamVkbsOhbm8gUk9aXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfb2JqX3NtbFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDIxXCIsIC8vUkMgMzAyNTAwMjEgOiBPYmplZG7DoW5vIFNNTFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImNfb2JqX3NtbFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMjFcIiB9KSAvL1JDIDMwMjUwMDIxIDogT2JqZWRuw6FubyBTTUxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19vYmpfYmxrXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMjJcIiwgLy9SQyAzMDI1MDAyMiA6IE9iamVkbsOhbm8gQkxLXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiY19vYmpfYmxrXCIsIGNhcHRpb246IFwianJlczozMDI1MDAyMlwiIH0pIC8vUkMgMzAyNTAwMjIgOiBPYmplZG7DoW5vIEJMS1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX2Zha1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDIzXCIsIC8vUkMgMzAyNTAwMjMgOiBSZXplcnZvdsOhbm8gUk9aXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiY19mYWtcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDIzXCIgfSkgLy9SQyAzMDI1MDAyMyA6IFJlemVydm92w6FubyBST1pcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19yc21cIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDAyNFwiLCAvL1JDIDMwMjUwMDIzIDogUmV6ZXJ2b3bDoW5vIFJPWlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImNfcnNtXCIsIGNhcHRpb246IFwianJlczozMDI1MDAyNFwiIH0pIC8vUkMgMzAyNTAwMjQgOiBSZXplcnZvdsOhbm8gU01MXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfZGlzcFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDI1XCIsIC8vUkMgMzAyNTAwMjUgOiBEaXNwb25pYmlsbsOtIHpkcm9qZVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImNfZGlzcFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAwMjVcIiB9KSAvL1JDIDMwMjUwMDI1IDogRGlzcG9uaWJpbG7DrSB6ZHJvamVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY191Y3RcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDAyNlwiLCAvL1JDIDMwMjUwMDI2IDogxIxlcnDDoW5vXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiY191Y3RcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMDI2XCIgfSkgLy9SQyAzMDI1MDAyNiA6IMSMZXJww6Fub1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ2YgYXMgYW55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZVByb2ZpbGVzKGdmOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0by8qJkdTZXpuYW1aYXBpc3VTdGF2dUR0byovPik6IElHU2V6bmFtWmFwaXN1UHJvZmlsZXMge1xyXG4gICAgICAgICAgICBsZXQgcHJvZmlsZXM6IElHU2V6bmFtWmFwaXN1UHJvZmlsZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7IG5hbWU6IFwianJlczozMTEwMDIzMlwiLCBjb2x1bW5zOiB7fSB9IC8vUkMgMzExMDAyMzIgOiBWw71jaG96w61cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2YuY29sdW1ucy5maWx0ZXIoKGMpID0+IHsgcmV0dXJuICFjLmhpZGRlbjsgfSlcclxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChjKSA9PiB7IHByb2ZpbGVzLmRlZmF1bHQuY29sdW1ucyFbYy5uYW1lIV0gPSB7IGhpZGRlbjogZmFsc2UgfSB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJvZmlsZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQWN0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmRldGFpbEFjdCAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuZGV0YWlsQWN0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuemFwaXN5QWN0ID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ6YXBpc3lBY3RcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxMjRcIiwgLy9SQyAzMTEwMDEyNCA6IFrDoXBpc3lcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93WmFwaXN5KCk7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluaWNlIG1lbnVcclxuICAgICAgICAgKiBAcGFyYW0gdHlwVWxvaHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgRGVmaW5lTWVudUJhcih0eXBVbG9oeTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZSk6IE1lbnVQYXJhbXNbXSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXBlci5EZWZpbmVNZW51QmFyKHR5cFVsb2h5KTtcclxuICAgICAgICAgICAgLy9sZXQgbWVudSA9IG5ldyBBcnJheTxNZW51UGFyYW1zPigpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9tZW51LnB1c2goeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMucHJldkZpbHRlckFjdC8qIHRoaXMucHJldkZpbHRlckFjdCovLCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9KTtcclxuICAgICAgICAgICAgLy9tZW51LnB1c2goeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMubmV4dEZpbHRlckFjdCAvKnRoaXMubmV4dEZpbHRlckFjdCovLCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9KTtcclxuICAgICAgICAgICAgLy9tZW51LnB1c2goeyBhY3Rpb246IHRoaXMuemFwaXN5QWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgLy9pZiAodGhpcy5wcmludEFjdClcclxuICAgICAgICAgICAgLy8gICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnByaW50QWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9tZW51LnB1c2goeyBhY3Rpb246IHRoaXMuY2xlYXJGaWx0ZXJSb3dBY3QgfSk7XHJcbiAgICAgICAgICAgIC8vbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgLy8gICAgdHlwZTogXCJzdGF0aWNcIixcclxuICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjY4XCIsIC8vUkMgMzExMDAyNjggOiBSeWNobMOpIGFrY2VcclxuICAgICAgICAgICAgLy8gICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgLy8gICAgICAgIHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmluc0FjdCAvKnRoaXMuaW5zQWN0Ki8sIGljb246IFwiZ2ktcmVmcmVzaFwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAyMjZcIiB9LCAvL1JDIDMxMTAwMjI2IDogTmHEjXRlbsOtIGRhdFxyXG4gICAgICAgICAgICAvLyAgICAgICAgeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuY2xlYXJBbmRGaWx0ZXJBY3QgLyp0aGlzLmNsZWFyQW5kRmlsdGVyQWN0Ki8sIGNhcHRpb246IFwianJlczozMTEwMDIyOFwiIH0sIC8vUkMgMzExMDAyMjggOiBWecSNaXN0aXQgYSBuYcSNw61zdFxyXG4gICAgICAgICAgICAvLyAgICAgICAgeyBhY3Rpb246IHRoaXMuemFwaXN5QWN0LCBjYXB0aW9uOiBcImpyZXM6MzExMDAxMjRcIiB9IC8vUkMgMzExMDAxMjQgOiBaw6FwaXN5XHJcbiAgICAgICAgICAgIC8vICAgIF1cclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIC8vcmV0dXJuIG1lbnU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbmkgZGV0YWlsdSAtIGJ1ZHUgem9icmF6b3ZhdCB6YXBpc3lcclxuICAgICAgICAgKiBAcGFyYW0gcm93XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHNob3dEZXRhaWwocm93PzogVWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8pOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93WmFwaXN5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBab2JyYXplbmkgemFwaXN1XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgc2hvd1phcGlzeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RmlsdGVyKClcclxuICAgICAgICAgICAgICAgIC50aGVuKChmKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4gO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWwgPSBncmlkLmdncmlkPFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPihcImdldFNlbGVjdGlvblwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggIT09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHNlbFswXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkOiBzdHJpbmc7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vTk9URTogT2Rwb3ZpZGEgeiBUSyBVQ1I6IEdTZXpuYW1aYXBpc3VWUmFka3VUYWIuTG9hZEdyaWREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyOiBHRWtvRmlsdGVyRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY286IHsgc3RhcnQ6IHJvdy5pY28hLCBlbmQ6IHJvdy5pY28hIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVjczogeyBzdGFydDogcm93LnVjcyEsIGVuZDogcm93LnVjcyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXVzOiB7IHN0YXJ0OiByb3cudXVzISwgZW5kOiByb3cudXVzISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBua3M6IHsgc3RhcnQ6IHJvdy5ua3MhLCBlbmQ6IHJvdy5ua3MhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvazogeyBzdGFydDogcm93LnJvayEsIGVuZDogcm93LnJvayEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9tZXNpYzogeyBzdGFydDogMCwgZW5kOiByb3cubWVzaWMgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kcmRfbXNrOiByb3cuZHJkIS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZnU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlYTogeyBzdGFydDogcm93LnVlYSEsIGVuZDogcm93LnVlYSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlYjogeyBzdGFydDogcm93LnVlYiEsIGVuZDogcm93LnVlYiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlYzogeyBzdGFydDogcm93LnVlYyEsIGVuZDogcm93LnVlYyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZDogeyBzdGFydDogcm93LnVlZCEsIGVuZDogcm93LnVlZCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZTogeyBzdGFydDogcm93LnVlZSEsIGVuZDogcm93LnVlZSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZjogeyBzdGFydDogcm93LnVlZiEsIGVuZDogcm93LnVlZiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZzogeyBzdGFydDogcm93LnVlZyEsIGVuZDogcm93LnVlZyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlaDogeyBzdGFydDogcm93LnVlaCEsIGVuZDogcm93LnVlaCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlaTogeyBzdGFydDogcm93LnVlaSEsIGVuZDogcm93LnVlaSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlajogeyBzdGFydDogcm93LnVlaiEsIGVuZDogcm93LnVlaiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlazogeyBzdGFydDogcm93LnVlayEsIGVuZDogcm93LnVlayEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlbDogeyBzdGFydDogcm93LnVlbCEsIGVuZDogcm93LnVlbCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlbTogeyBzdGFydDogcm93LnVlbSEsIGVuZDogcm93LnVlbSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlbjogeyBzdGFydDogcm93LnVlbiEsIGVuZDogcm93LnVlbiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlMDogeyBzdGFydDogcm93LnRlMCEsIGVuZDogcm93LnRlMCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlMTogeyBzdGFydDogcm93LnRlMSEsIGVuZDogcm93LnRlMSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlMjogeyBzdGFydDogcm93LnRlMiEsIGVuZDogcm93LnRlMiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlMzogeyBzdGFydDogcm93LnRlMyEsIGVuZDogcm93LnRlMyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlNDogeyBzdGFydDogcm93LnRlNCEsIGVuZDogcm93LnRlNCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlNTogeyBzdGFydDogcm93LnRlNSEsIGVuZDogcm93LnRlNSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlNjogeyBzdGFydDogcm93LnRlNiEsIGVuZDogcm93LnRlNiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlNzogeyBzdGFydDogcm93LnRlNyEsIGVuZDogcm93LnRlNyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlODogeyBzdGFydDogcm93LnRlOCEsIGVuZDogcm93LnRlOCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlOTogeyBzdGFydDogcm93LnRlOSEsIGVuZDogcm93LnRlOSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHlwVWxvaHkgPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkZpbmFuY292YW5pWmFwaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBcInVjdFphcGlzeSNcIjsgLy9OT1RFOiBNdXNpIGJ5dCBzdGVqbmUgbmkgbmEgTWFpbkFwcC5jc1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Q250Lm5hdmlnYXRlKCdHb3JkaWMuVWNyLldlYkNsaWVudC5HU2V6bmFtRWtvWmF6bmFtdScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUeXBVbG9oeTogdHlwVWxvaHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEZpbHRlcjogZmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTdHJpY3RGaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF1dG9Mb2FkRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDA0N1wiIC8vUkMgMzAyNTAwNDcgOiBaw6FwaXN5IGZpbmFuY292w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0WmFwaXNGaWx0ZXIoKTogR0Vrb0ZpbHRlckR0byB7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiB7fTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzZWwgPSBncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlKVswXSBhcyBVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bztcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG8pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVjczogeyBzdGFydDogc2VsLnVjcywgZW5kOiBzZWwudWNzIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzaWM6IHsgc3RhcnQ6IHNlbC5tZXNpYywgZW5kOiBzZWwubWVzaWMgfSxcclxuICAgICAgICAgICAgICAgICAgICBhYzogeyBzdGFydDogc2VsLmFjLCBlbmQ6IHNlbC5hYyB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHVjczogeyBzdGFydDogc2VsLnVjcywgZW5kOiBzZWwudWNzIH0sXHJcbiAgICAgICAgICAgICAgICBkcmRfbXNrOiBzZWwhLmRyZCEudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIG1lc2ljOiB7IHN0YXJ0OiBzZWwubWVzaWMsIGVuZDogc2VsLm1lc2ljIH0sXHJcbiAgICAgICAgICAgICAgICBhYzogeyBzdGFydDogc2VsLmFjLCBlbmQ6IHNlbC5hYyB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuIFxyXG59Il19