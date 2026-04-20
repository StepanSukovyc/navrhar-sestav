"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            class GSeznamEkoRozStavy extends WebClient.GSeznamEkoZaznamuBase {
                /**
                 * Konstruktor
                 * @param content
                 */
                constructor(content) {
                    super(content);
                    /** Globalni modulove parametry v JS */
                    /** Limit poctu nacitanych zaznamu, pokud nedojde k potvrzeni, ze uzivatel chce jit pres limit */
                    //sumLimit: number;
                    this.logOptions = { name: "GSeznamEkoRozStavy", authorCode: 302, file: "GSeznamEkoRozStavy.ts" };
                    this.pouzivanStrukPopis = false;
                    this.povolenNahled = true;
                    this.useTextyZRozvrhu = true;
                    // moznost ukladani historie filtru
                    this.rememberHistory = true;
                }
                /**
                 * Vraci ISL metodu pro zjisteni poctu zaznamu
                 *
                 * */
                getCallCount() {
                    let that = this;
                    return that.parentCnt.isl.UcrRozpoctovyStav.count()
                        .use((req, next, ctx) => {
                        that.addFilterToHistory = false;
                        return this.getFilterData(that, req, next);
                    })
                        .get();
                }
                /**
                 * Vytvoreni view pro list
                 * */
                createListView() {
                    let that = this;
                    return new Gordic.Isl.View(that.parentCnt.isl.UcrRozpoctovyStav.list().use((req, next, ctx) => {
                        return this.getFilterData(that, req, next);
                        //return next(req);
                    }), {
                        filterPanel: that.$filterPanel,
                        startEmpty: true,
                        processors: {
                            sumare: that.sumare_processor
                        }
                    });
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                nastaveniAkci(grid, pocetRadku) {
                    super.nastaveniAkci(grid, pocetRadku);
                }
                /**
                  * Nacti filtry
                  * @param that
                  * @param req
                  * @param next
                  */
                getFilterData(that, req, next) {
                    return that.getFilter(that.$filterPanel.gfilterpanel("getCurrentData"))
                        .then((newFilter) => {
                        if (that.addFilterToHistory) {
                            if (that.currFilterHistoryIndex !== that.filterHistory.length - 1)
                                that.filterHistory.splice(that.currFilterHistoryIndex + 1);
                            that.filterHistory.push(newFilter);
                            that.currFilterHistoryIndex++;
                        }
                        that.addFilterToHistory = true;
                        let maska = newFilter.filter;
                        for (var name in newFilter.filter?.cfu) {
                            maska[name] = newFilter.filter?.cfu[name];
                        }
                        this.parentCnt.actions.nextFilterAct?.enabled(that.currFilterHistoryIndex < that.filterHistory.length - 1);
                        this.parentCnt.actions.prevFilterAct?.enabled(that.currFilterHistoryIndex > 0);
                        //return this.getData(newFilter);
                        var newRequest = $.extend(true, {}, req);
                        let rq = {
                            RadekStavu: this.CurrentRow,
                            Maska: newFilter.filter,
                            Maska2: newFilter.filter,
                            TypUlohy: that.TypUlohy,
                            Elementy: newFilter.elementy,
                            FilterStrPopis: newFilter.filterStrPopis,
                            logovatGdpr: true,
                            StrPopisKeys: that.addStrPopisColumns,
                            maxRecords: -1,
                        };
                        rq.Maska = maska;
                        newRequest["filters"] = rq;
                        return next(newRequest);
                    });
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
                    //    action: this.parentCnt.actions.insAct
                    //});
                    //this.parentCnt.element.gshortcut({
                    //    key: "1",
                    //    description: "jres:31100218", //RC 31100218 : Předchozí filtr
                    //    canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                    //    group: Gordic.Shortcuts.Groups.Task,
                    //    action: this.parentCnt.actions.prevFilterAct
                    //});
                    //this.parentCnt.element.gshortcut({
                    //    key: "0",
                    //    description: "jres:31100228", //RC 31100228 : Vyčistit a načíst
                    //    canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                    //    group: Gordic.Shortcuts.Groups.Task,
                    //    action: this.parentCnt.actions.clearAndFilterAct
                    //});
                    //let grid = this.getGrid();
                    //if (grid !== null) {
                    //    grid.gshortcut({
                    //        key: "ctrl+shift+lclick",
                    //        group: Gordic.Shortcuts.Groups.Grid,
                    //        description: "jres:31100229", //RC 31100229 : Přenesení hodnoty do filtru.
                    //        action: this.parentCnt.actions.selFilterAct
                    //    });
                    //    grid.gshortcut({
                    //        key: "ctrl+lclick",
                    //        group: Gordic.Shortcuts.Groups.Grid,
                    //        description: "jres:31100235", //RC 31100235 : Přenesení hodnoty do filtru a vyhledání.
                    //        action: this.parentCnt.actions.selFilterAndSearchAct
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
                createGridFormat() {
                    var gf = new Gordic.Data.GridFormat();
                    //var topoGroup = "topo";
                    {
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
                    }
                    var drdServerFilter = Gordic.Eko.Filters.drd(this.filterOptions.drd);
                    gf.addNumberColumn({
                        name: "drd",
                        caption: "jres:31100052 ", //RC 31100052 : H
                        description: "jres:31100102", //RC 31100102 : Druh dokladu (DRD)
                        //tooltipTemplate: "jres:31100102", //RC 31100102 : Druh dokladu (DRD)
                        width: 30,
                        serverFilter: drdServerFilter //Gordic.Eko.Filters.drd(this.filterOptions.drd)
                    });
                    gf.addNumberColumn({
                        name: "mesic",
                        caption: "jres:31100051 ", //RC 31100051 : M
                        description: "jres:31100011", //RC 31100011 : Měsíc
                        width: 30,
                        aggregate: Gordic.Data.Aggregates.first("mesic"),
                        //serverFilter: Gordic.Eko.Filters.stringInterval({ model: "mesic", caption: "jres:31100051", disabled: !!(this.Filter && this.StrictFilter && this.Filter.mesic) }) //RC 31100051 : M
                        serverFilter: Gordic.Eko.Filters.stringInterval({
                            model: "mesic", caption: "jres:31100051", //RC 31100051 : M
                            disabled: !!(this.Filter && this.StrictFilter && this.Filter.mesic),
                            firstField: { validators: [new Gordic.Validators.Range({ min: 1, max: 13 })] },
                            secondField: { validators: [new Gordic.Validators.Range({ min: 1, max: 13 })] },
                        })
                    });
                    gf.addSortedEkoCfuSet(this.getCfuSetServerFilters(true));
                    gf.addCurrencyColumn({
                        name: "c0",
                        caption: "jres:31100065", //RC 31100065 : MO Příjmů
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0", caption: "jres:31100065" }) //RC 31100065 : MO Příjmů
                    });
                    gf.addCurrencyColumn({
                        name: "c1",
                        caption: "jres:31100066", //RC 31100066 : MO Výdajů
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c1", caption: "jres:31100066" }) //RC 31100066 : MO Výdajů
                    });
                    gf.addCurrencyColumn({
                        name: "c0c1",
                        caption: "jres:31100067", //RC 31100067 : MO P-V
                        width: 120,
                        hidden: !this.globals.Rad_ZobrazMdDal,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0c1", caption: "jres:31100067" }) //RC 31100067 : MO P-V
                    });
                    gf.addCurrencyColumn({
                        name: "c0_as",
                        caption: "jres:31100068", //RC 31100068 : AS Příjmů
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0_as", caption: "jres:31100068" }) //RC 31100068 : AS Příjmů
                    });
                    gf.addCurrencyColumn({
                        name: "c1_as",
                        caption: "jres:31100069", //RC 31100069 : AS Výdajů
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c1_as", caption: "jres:31100069" }) //RC 31100069 : AS Výdajů
                    });
                    gf.addCurrencyColumn({
                        name: "c0c1_as",
                        caption: "jres:31100070", //RC 31100070 : AS MD - Dal
                        width: 120,
                        hidden: !this.globals.Rad_ZobrazMdDal,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0c1_as", caption: "jres:31100070" }) //RC 31100070 : AS MD - Dal
                    });
                    gf.addDateTimeColumn({
                        name: "dat_zmena",
                        caption: "jres:31100015", //RC 31100015 : Datum změny
                        width: 130,
                        serverFilter: Gordic.Eko.Filters.dateInterval({
                            model: "dat_zmena",
                            firstField: { valueType: "datetime" },
                            secondField: { valueType: "datetime" },
                            caption: "jres:31100015" //RC 31100015 : Datum změny
                        })
                    });
                    if (this.PrizIissp) {
                        let iisspDisable = this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */;
                        gf.addTextColumn({
                            name: "id_hdr_ris",
                            caption: "jres:31100082", //RC 31100082 : ID IISSP
                            description: "jres:31100255", //RC 31100255 : Identifikátor rezervace rozpočtových prostředků IISSP
                            serverFilter: Gordic.Eko.Filters.stringInterval({ model: "id_hdr_ris", caption: "jres:31100082", disabled: iisspDisable, firstField: { maxLength: 9 }, secondField: { maxLength: 9 } }) //RC 31100082 : ID IISSP
                            //maxLength: 9
                        });
                        gf.addNumberColumn({
                            name: "radek_hdr",
                            caption: "jres:31100083", //RC 31100083 : řádek IISSP
                            description: "jres:31100256", //RC 31100256 : Řádek rezervace rozpočtových prostředků IISSP
                            width: 80,
                            serverFilter: Gordic.Eko.Filters.integerInterval({ model: "radek_hdr", caption: "jres:31100083", disabled: iisspDisable }) //RC 31100083 : řádek IISSP
                        });
                        gf.addIconColumn({
                            name: "s_prep_aisp",
                            caption: "jres:30250344", //RC 30250344 : IISSP Přepočteno
                            width: 39, // fixedWidth: true,
                            customClass: "center",
                            iconTemplate: function (data) {
                                if (data.s_prep_aisp != null && data.s_prep_aisp > 0) {
                                    return {
                                        icon: "fa-check-circle g-state-text g-state-success", text: "jres:30250344", //RC 30250344 : IISSP Přepočteno
                                        //tooltip: "jres:30250288"
                                    };
                                }
                                if (data.id_hdr_ris != null && data.id_hdr_ris !== undefined) {
                                    return {
                                        icon: "gi-exclam g-state-error", text: "jres:30250345", //RC 30250345 : Nezpracováno
                                        //tooltip: "jres:30250289"
                                    };
                                }
                            }
                        });
                    }
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
                    const that = this;
                    super.createActions();
                    this.parentCnt.actions.addRange({
                        detailAct: {
                            name: "detailAct",
                            caption: "jres:31100266", //RC 31100266 : Zobrazit detail
                            icon: "gi-detail",
                            enabled: false,
                            run: (ev, ctx) => { this.showDetail(); }
                        },
                        //prevFilterAct: {
                        //    name: "prevFilterAct",
                        //    icon: "gi-arrow gi-rot180",
                        //    enabled: false,
                        //    caption: "jres:31100218", //RC 31100218 : Předchozí filtr
                        //    captionVisible: "never",
                        //    tooltip: "jres:31100220", //RC 31100220 : Návrat k předchozí hodnotě filtru a vyhledání.
                        //    run: (ev, ctx) => { this.prevFilter(); }
                        //},
                        //nextFilterAct: {
                        //    name: "nextFilterAct",
                        //    icon: "gi-arrow",
                        //    enabled: false,
                        //    caption: "jres:31100219", //RC 31100219 : Následující filtr
                        //    captionVisible: "never",
                        //    tooltip: "jres:31100221", //RC 31100221 : Vyplnění následujícího filtru a vyhledání.
                        //    run: (ev, ctx) => { this.nextFilter(); }
                        //},
                        zapisyAct: {
                            name: "zapisyAct",
                            icon: "gi-list",
                            enabled: false,
                            caption: "jres:31100124", //RC 31100124 : Zápisy
                            run: (ev, ctx) => { this.showZapisy(); }
                        },
                        primdokladAct: {
                            name: "primdokladAct",
                            enabled: false,
                            icon: "fa-external-link",
                            caption: "jres:30250154", //RC 30250154 : Prim. doklad
                            run: (ev, ctx) => { this.showPrimDoklad(); }
                        },
                        dokladBLKAct: {
                            name: "dokladBLKAct",
                            enabled: false,
                            caption: "jres:30250155", //RC 30250155 : Doklad BLK
                            run: (ev, ctx) => { this.showPrimDoklad(undefined, "BLK"); }
                        },
                        dokladROAct: {
                            name: "dokladROAct",
                            enabled: false,
                            caption: "jres:30250156", //RC 30250156 : Doklad RO
                            run: (ev, ctx) => { this.showPrimDoklad(undefined, "RO"); }
                        },
                        //insAct: {
                        //    name: "insAct",
                        //    run: (ev, ctx) => {
                        //        this.getFilter(this.$filterPanel.gfilterpanel("getConfirmedData"))
                        //            .then(() => { this.doFilterClick(); });
                        //    }
                        //},
                        //clearAndFilterAct: {
                        //    name: "clearAndFilterAct",
                        //    run: (ev, ctx) => {
                        //        this.$filterPanel.gfilterpanel("clear");
                        //        this.getFilter(this.$filterPanel.gfilterpanel("getConfirmedData"))
                        //            .then(() => { this.doFilterClick(); });
                        //    }
                        //},
                        selFilterAct: {
                            name: "selFilterAct",
                            run: (ev, ctx) => { this.dispatchFillServerGridEvent(ev); }
                        },
                        selFilterAndSearchAct: {
                            name: "selFilterAndSearchAct",
                            run: (ev, ctx) => {
                                this.dispatchFillServerGridEvent(ev);
                                this.doFilterClick();
                            }
                        },
                        //dotAct: {
                        //    name: "dotAct",
                        //    enabled: false,
                        //    run: (ev, ctx) => {
                        //        this.$grid
                        //            .ggridserverfilter("clear")
                        //            .ggridserverfilter("apply", this.getZapisFilter());
                        //        this.doFilterClick();
                        //    }
                        //},
                        filterPidAct: {
                            name: "filterPidAct",
                            enabled: false,
                            run: (ev, ctx) => {
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                var sel = grid.ggrid("getSelection");
                                if (sel.length === 0)
                                    return;
                                grid
                                    .ggridserverfilter("clear")
                                    .ggridserverfilter("apply", { ixp: sel[0].ixp });
                                this.doFilterClick();
                            }
                        },
                    });
                }
                /**
                 * Definice menu baru
                 * @param typUlohy
                 */
                DefineMenuBar(typUlohy) {
                    return super.DefineMenuBar(typUlohy);
                    //let menu = new Array<MenuParams>();
                    //menu.push({ action: this.parentCnt.actions.detailAct, favorite: true });
                    //menu.push({ action: this.parentCnt.actions.prevFilterAct, favorite: true, align: "opposite" });
                    //menu.push({ action: this.parentCnt.actions.nextFilterAct, favorite: true, align: "opposite" });
                    //if (this.printAct)
                    //    menu.push({ action: this.printAct, favorite: true });
                    //menu.push({ action: this.parentCnt.actions.zapisyAct, favorite: true });
                    //////menu.push({ action: this.parentCnt.actions.primdokladAct, favorite: true });
                    //// textu z rozvrhu
                    //if (typeof this.parentCnt.actions.textRozvrhAct !== "undefined")
                    //    menu.push({ action: this.parentCnt.actions.textRozvrhAct, favorite: true });
                    //menu.push({ action: this.clearFilterRowAct });
                    //menu.push({
                    //    type: "static",
                    //    caption: "jres:31100268", //RC 31100268 : Rychlé akce
                    //    children: [
                    //        { action: this.parentCnt.actions.insAct, icon: "gi-refresh", caption: "jres:31100226" }, //RC 31100226 : Načtení dat
                    //        { action: this.parentCnt.actions.clearAndFilterAct, caption: "jres:31100228" }, //RC 31100228 : Vyčistit a načíst
                    //        //NOTE: Tyto dve akce budou vzdy fungovat pouze z klavesnice
                    //        //{ action: this.selFilterAct, caption: "jres:31100229" }, //RC 31100229 : Přenesení hodnoty do filtru.
                    //        //{ action: this.selFilterAndSearchAct, caption: "jres:31100235" }, //RC 31100235 : Přenesení hodnoty do filtru a vyhledání.
                    //        //{ action: this.dotAct, caption: "jres:31100227" }, //RC 31100227 : Zobrazení všech zápisů dokladů (celý doklad) nad označeným zápisem.
                    //    ]
                    //});
                    //return menu;
                }
                showZapisy() {
                    let title = "jres:31100224"; //RC 31100224 : Zápisy stavu
                    let that = this;
                    this.getFilter()
                        .then((f) => {
                        let grid = that.getGrid();
                        if (grid == null)
                            return;
                        let sel = grid.ggrid("getSelection", false);
                        if (sel.length !== 1)
                            return;
                        let row = sel[0];
                        let typUlohy;
                        let id;
                        let filter;
                        //NOTE: Odpovida z TK UCR: GSeznamZapisuVRadkuTab.LoadGridData()
                        if (this.parentCnt.TypUlohy === 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */) {
                            title = "jres:30250274"; //RC 30250274 : Zápisy saldokonta
                            filter = {};
                            var add = "";
                            if (that.globals.SaldokontoParam1.trim() != "")
                                add = that.globals.SaldokontoParam1.trim() + ": " + row["value0"];
                            if (that.globals.SaldokontoParam2.trim() != "") {
                                if (add != "")
                                    add += ", " + that.globals.SaldokontoParam2.trim() + ": " + row["value1"].trim();
                                else
                                    add = that.globals.SaldokontoParam1.trim() + ": " + row["value0"]?.trim();
                            }
                            if (add != "")
                                add = " (" + add + ")";
                            title += add;
                        }
                        else {
                            filter = {
                                ico: { start: row.ico, end: row.ico },
                                ucs: { start: row.ucs, end: row.ucs },
                                uus: { start: row.uus, end: row.uus },
                                nks: { start: row.nks, end: row.nks },
                                mesic: { start: 0, end: row.mesic },
                                drd_msk: row.drd.toString(),
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
                        }
                        switch (this.parentCnt.TypUlohy) {
                            case 2 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviStav */:
                                typUlohy = 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */;
                                id = "uctZapisy#"; //NOTE: Musi byt stejne ni na MainApp.cs
                                break;
                            case 0 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetStav */:
                                typUlohy = 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */;
                                id = "rozZapisy#"; //NOTE: Musi byt stejne ni na MainApp.cs
                                break;
                            case 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */:
                                typUlohy = 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */;
                                id = "seznamSaldokonto#"; //NOTE: Musi byt stejne ni na MainApp.cs
                                break;
                            default:
                                throw new GError("NotSupported");
                        }
                        return this.parentCnt.navigate('Gordic.Ucr.WebClient.GSeznamEkoZaznamu', {
                            ID: id,
                            TypUlohy: typUlohy,
                            Filter: filter,
                            CurrentRow: row,
                            StrictFilter: true,
                            FilterStrPopis: f.filterStrPopis,
                            AutoLoadData: true,
                            title: title
                        });
                    });
                }
                doFilterClick() {
                    //NOTE: Toto je spatne, ale pro ukazku staci - je nutne filtrovat i s elementy
                    this.parentCnt.element.find(".gfilterpanel").find(".js-hlavniVyhledat").click();
                    //TODO: Po testech s distributory vse zrefaktorit na takovyto zapis, musi byt ale radne otestovan pro vsechny pripady
                    //this.getFilter(this.$filterPanel.gfilterpanel("getConfirmedData")).then((d) => { this.loadData(d); });
                }
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    var that = this;
                    return $.Deferred().resolve().promise();
                }
            }
            WebClient.GSeznamEkoRozStavy = GSeznamEkoRozStavy;
            //interface IGSeznamZapisuStavuResultDto {
            //    SeznamZapisu: Uct.Interface.GSeznamZapisuStavuDto[];
            //    Sumy: Uct.Interface.GSeznamZapisuStavuDto 
            //}
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUVrb1JvelN0YXZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbUVrb1JvelN0YXZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0FtdEJmO0FBbnRCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FtdEJuQjtJQW50QmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQW10QjdCO1FBbnRCb0IsV0FBQSxTQUFTO1lBRTFCLE1BQWEsa0JBQW1CLFNBQVEsVUFBQSxxQkFBcUI7Z0JBUXpEOzs7bUJBR0c7Z0JBQ0gsWUFBWSxPQUFxQztvQkFDN0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQVpuQix1Q0FBdUM7b0JBR3ZDLGlHQUFpRztvQkFDakcsbUJBQW1CO29CQUNuQixlQUFVLEdBQUcsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQztvQkFReEYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztvQkFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQzFCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7b0JBQzdCLG1DQUFtQztvQkFDbkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7Z0JBQ2hDLENBQUM7Z0JBRUQ7OztxQkFHSztnQkFDSyxZQUFZO29CQUNsQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFO3lCQUM5QyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO3dCQUNwQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO3dCQUNoQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQVEsQ0FBQztvQkFDdEQsQ0FBQyxDQUFDO3lCQUNELEdBQUcsRUFBRSxDQUNMO2dCQUNULENBQUM7Z0JBQ0Q7O3FCQUVLO2dCQUNLLGNBQWM7b0JBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQ3hDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTt3QkFDckIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFRLENBQUM7d0JBQ2xELG1CQUFtQjtvQkFDdkIsQ0FBQyxDQUFDLEVBRUY7d0JBQ0ksV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZO3dCQUM5QixVQUFVLEVBQUUsSUFBSTt3QkFDaEIsVUFBVSxFQUFFOzRCQUNSLE1BQU0sRUFBRSxJQUFJLENBQUMsZ0JBQWdCO3lCQUNoQztxQkFDSixDQUNKLENBQUM7Z0JBQ04sQ0FBQztnQkFDRDs7O3FCQUdLO2dCQUNFLGFBQWEsQ0FBQyxJQUF5QixFQUFFLFVBQWtCO29CQUM5RCxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFFMUMsQ0FBQztnQkFDRDs7Ozs7b0JBS0k7Z0JBQ00sYUFBYSxDQUFDLElBQVUsRUFBRSxHQUE0QixFQUFFLElBQTJLO29CQUV6TyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzt5QkFDbEUsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7d0JBQ2hCLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7NEJBQzFCLElBQUksSUFBSSxDQUFDLHNCQUFzQixLQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUM7Z0NBQzdELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFFL0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQ25DLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO3dCQUNsQyxDQUFDO3dCQUNELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7d0JBRS9CLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7d0JBQzdCLEtBQUssSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQzs0QkFDckMsS0FBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMvQyxDQUFDO3dCQUVELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUMzRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFFL0UsaUNBQWlDO3dCQUNqQyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ3pDLElBQUksRUFBRSxHQUFpRDs0QkFDbkQsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVOzRCQUMzQixLQUFLLEVBQUUsU0FBUyxDQUFDLE1BQU07NEJBQ3JCLE1BQU0sRUFBRSxTQUFTLENBQUMsTUFBTTs0QkFDeEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFROzRCQUN2QixRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVE7NEJBQzVCLGNBQWMsRUFBRSxTQUFTLENBQUMsY0FBYzs0QkFDeEMsV0FBVyxFQUFFLElBQUk7NEJBQ2pCLFlBQVksRUFBRSxJQUFJLENBQUMsa0JBQWtCOzRCQUNyQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO3lCQUNuQixDQUFDO3dCQUNGLEVBQUUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO3dCQUNqQixVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUMzQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDNUIsQ0FBQyxDQUNBLENBQ0E7Z0JBRVQsQ0FBQztnQkFDRDs7O3FCQUdLO2dCQUNLLGNBQWM7b0JBQ3BCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsa0JBQWtCO29CQUNsQixvQ0FBb0M7b0JBQ3BDLG9CQUFvQjtvQkFDcEIsK0RBQStEO29CQUMvRCwwQ0FBMEM7b0JBQzFDLG9FQUFvRTtvQkFDcEUsMkNBQTJDO29CQUMzQyxLQUFLO29CQUdMLG9DQUFvQztvQkFDcEMsZUFBZTtvQkFDZixtRUFBbUU7b0JBQ25FLG9FQUFvRTtvQkFDcEUsMENBQTBDO29CQUMxQyxrREFBa0Q7b0JBQ2xELEtBQUs7b0JBRUwsb0NBQW9DO29CQUNwQyxlQUFlO29CQUNmLHFFQUFxRTtvQkFDckUsb0VBQW9FO29CQUNwRSwwQ0FBMEM7b0JBQzFDLHNEQUFzRDtvQkFDdEQsS0FBSztvQkFDTCw0QkFBNEI7b0JBQzVCLHNCQUFzQjtvQkFFdEIsc0JBQXNCO29CQUN0QixtQ0FBbUM7b0JBQ25DLDhDQUE4QztvQkFDOUMsb0ZBQW9GO29CQUNwRixxREFBcUQ7b0JBQ3JELFNBQVM7b0JBRVQsc0JBQXNCO29CQUN0Qiw2QkFBNkI7b0JBQzdCLDhDQUE4QztvQkFDOUMsZ0dBQWdHO29CQUNoRyw4REFBOEQ7b0JBQzlELFNBQVM7b0JBRVQsc0JBQXNCO29CQUN0QiwwQkFBMEI7b0JBQzFCLHdEQUF3RDtvQkFDeEQsMkhBQTJIO29CQUMzSCx3RUFBd0U7b0JBQ3hFLDhDQUE4QztvQkFDOUMsNkJBQTZCO29CQUM3QixTQUFTO29CQUNULEdBQUc7Z0JBQ1AsQ0FBQztnQkFFTSxnQkFBZ0I7b0JBQ25CLElBQUksRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQWlELENBQUM7b0JBQ3JGLHlCQUF5QjtvQkFJekIsQ0FBQzt3QkFDRyxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7NEJBQ2hDLHVEQUE4QyxDQUFDLENBQUMsTUFBTTs0QkFDdEQ7Z0NBQ0ksRUFBRSxDQUFDLGFBQWEsQ0FBQztvQ0FDYixJQUFJLEVBQUUsS0FBSztvQ0FDWCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO29DQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHO29DQUMzQixLQUFLLEVBQUUsRUFBRTtvQ0FDVCxtQkFBbUI7b0NBQ25CLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7aUNBQ3ZFLENBQUMsQ0FBQztnQ0FDSCxNQUFNOzRCQUNWO2dDQUNJLEVBQUUsQ0FBQyxhQUFhLENBQUM7b0NBQ2IsSUFBSSxFQUFFLEtBQUs7b0NBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztvQ0FDekIsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRztvQ0FDM0IsS0FBSyxFQUFFLEVBQUU7b0NBQ1QsbUJBQW1CO29DQUNuQixTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztvQ0FDOUMsc0VBQXNFO29DQUN0RSxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO3dDQUN6QyxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRO3dDQUN4RSxVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTO3dDQUNsSixLQUFLLEVBQUUsS0FBSzt3Q0FDWixRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7cUNBQ3RELENBQUM7aUNBQ0wsQ0FBQyxDQUFDO2dDQUNILElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtvQ0FDZCxFQUFFLENBQUMsYUFBYSxDQUFDO3dDQUNiLElBQUksRUFBRSxLQUFLO3dDQUNYLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7d0NBQ3pCLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7d0NBQzNCLEtBQUssRUFBRSxFQUFFO3dDQUNULG1CQUFtQjt3Q0FDbkIsc0VBQXNFO3dDQUN0RSxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDOzRDQUN6QyxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVE7NENBQ3pHLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVM7NENBQ2xKLEtBQUssRUFBRSxLQUFLOzRDQUNaLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRzt5Q0FDdEQsQ0FBQztxQ0FDTCxDQUFDLENBQUM7Z0NBRVAsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO29DQUNkLEVBQUUsQ0FBQyxhQUFhLENBQUM7d0NBQ2IsSUFBSSxFQUFFLEtBQUs7d0NBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzt3Q0FDekIsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRzt3Q0FDM0IsS0FBSyxFQUFFLEVBQUU7d0NBQ1QsbUJBQW1CO3dDQUNuQixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO3FDQUN2RSxDQUFDLENBQUM7Z0NBQ1AsTUFBTTs0QkFDVjtnQ0FDSSxFQUFFLENBQUMsYUFBYSxDQUFDO29DQUNiLElBQUksRUFBRSxLQUFLO29DQUNYLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7b0NBQ3pCLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7b0NBQzNCLEtBQUssRUFBRSxFQUFFO29DQUNULGtCQUFrQjtvQ0FDbEIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7b0NBQzlDLFlBQVksRUFBRSxJQUFJLENBQUMsaUJBQWlCO3dDQUNoQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7d0NBQzlILENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztpQ0FDckksQ0FBQyxDQUFDO2dDQUVILElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsMkRBQW1ELEVBQUUsQ0FBQztvQ0FDakcsRUFBRSxDQUFDLGFBQWEsQ0FBQzt3Q0FDYixJQUFJLEVBQUUsS0FBSzt3Q0FDWCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO3dDQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHO3dDQUMzQixLQUFLLEVBQUUsRUFBRTt3Q0FDVCxtQkFBbUI7d0NBQ25CLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO3dDQUM5QyxzRUFBc0U7d0NBQ3RFLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7NENBQ3pDLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVE7NENBQ3hFLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVM7NENBQ2xKLEtBQUssRUFBRSxLQUFLOzRDQUNaLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRzt5Q0FDdEQsQ0FBQztxQ0FDTCxDQUFDLENBQUM7b0NBRUgsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO3dDQUNkLEVBQUUsQ0FBQyxhQUFhLENBQUM7NENBQ2IsSUFBSSxFQUFFLEtBQUs7NENBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzs0Q0FDekIsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRzs0Q0FDM0IsS0FBSyxFQUFFLEVBQUU7NENBQ1QsbUJBQW1COzRDQUNuQixzRUFBc0U7NENBQ3RFLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Z0RBQ3pDLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUTtnREFDekcsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUztnREFDbEosS0FBSyxFQUFFLEtBQUs7Z0RBQ1osUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHOzZDQUN0RCxDQUFDO3lDQUNMLENBQUMsQ0FBQztvQ0FFUCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7d0NBQ2QsRUFBRSxDQUFDLGFBQWEsQ0FBQzs0Q0FDYixJQUFJLEVBQUUsS0FBSzs0Q0FDWCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzRDQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHOzRDQUMzQixLQUFLLEVBQUUsRUFBRTs0Q0FDVCxtQkFBbUI7NENBQ25CLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7eUNBQ3ZFLENBQUMsQ0FBQztnQ0FDWCxDQUFDO2dDQUNELE1BQU07d0JBQ2QsQ0FBQztvQkFDTCxDQUFDO29CQUNELElBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNyRSxFQUFFLENBQUMsZUFBZSxDQUFDO3dCQUNmLElBQUksRUFBRSxLQUFLO3dCQUNYLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUI7d0JBQzVDLFdBQVcsRUFBRSxlQUFlLEVBQUUsa0NBQWtDO3dCQUNoRSxzRUFBc0U7d0JBQ3RFLEtBQUssRUFBRSxFQUFFO3dCQUNULFlBQVksRUFBRSxlQUFlLENBQUEsZ0RBQWdEO3FCQUNoRixDQUFDLENBQUM7b0JBQ0gsRUFBRSxDQUFDLGVBQWUsQ0FBQzt3QkFDZixJQUFJLEVBQUUsT0FBTzt3QkFDYixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCO3dCQUM1QyxXQUFXLEVBQUUsZUFBZSxFQUFFLHFCQUFxQjt3QkFDbkQsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7d0JBQ2hELHNMQUFzTDt3QkFDdEwsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQzs0QkFDNUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLGlCQUFpQjs0QkFDM0QsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs0QkFDbkUsVUFBVSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTs0QkFDOUUsV0FBVyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTt5QkFDbEYsQ0FBQztxQkFDTCxDQUFDLENBQUM7b0JBSUgsRUFBRSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUl6RCxFQUFFLENBQUMsaUJBQWlCLENBQUM7d0JBQ2pCLElBQUksRUFBRSxJQUFJO3dCQUNWLE9BQU8sRUFBRSxlQUFlLEVBQUUseUJBQXlCO3dCQUNuRCxLQUFLLEVBQUUsR0FBRzt3QkFDVixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBRSx5QkFBeUI7cUJBQ3pILENBQUMsQ0FBQztvQkFDSCxFQUFFLENBQUMsaUJBQWlCLENBQUM7d0JBQ2pCLElBQUksRUFBRSxJQUFJO3dCQUNWLE9BQU8sRUFBRSxlQUFlLEVBQUUseUJBQXlCO3dCQUNuRCxLQUFLLEVBQUUsR0FBRzt3QkFDVixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyx5QkFBeUI7cUJBQ3hILENBQUMsQ0FBQztvQkFDSCxFQUFFLENBQUMsaUJBQWlCLENBQUM7d0JBQ2pCLElBQUksRUFBRSxNQUFNO3dCQUNaLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCO3dCQUNoRCxLQUFLLEVBQUUsR0FBRzt3QkFDVixNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWU7d0JBQ3JDLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLHNCQUFzQjtxQkFDdkgsQ0FBQyxDQUFDO29CQUNILEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDakIsSUFBSSxFQUFFLE9BQU87d0JBQ2IsT0FBTyxFQUFFLGVBQWUsRUFBRSx5QkFBeUI7d0JBQ25ELEtBQUssRUFBRSxHQUFHO3dCQUNWLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLHlCQUF5QjtxQkFDM0gsQ0FBQyxDQUFDO29CQUNILEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDakIsSUFBSSxFQUFFLE9BQU87d0JBQ2IsT0FBTyxFQUFFLGVBQWUsRUFBRSx5QkFBeUI7d0JBQ25ELEtBQUssRUFBRSxHQUFHO3dCQUNWLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLHlCQUF5QjtxQkFDM0gsQ0FBQyxDQUFDO29CQUNILEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDakIsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLGVBQWUsRUFBRSwyQkFBMkI7d0JBQ3JELEtBQUssRUFBRSxHQUFHO3dCQUNWLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZTt3QkFDckMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsMkJBQTJCO3FCQUMvSCxDQUFDLENBQUM7b0JBU0MsRUFBRSxDQUFDLGlCQUFpQixDQUFDO3dCQUNqQixJQUFJLEVBQUUsV0FBVzt3QkFDakIsT0FBTyxFQUFFLGVBQWUsRUFBRSwyQkFBMkI7d0JBQ3JELEtBQUssRUFBRSxHQUFHO3dCQUNWLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7NEJBQzFDLEtBQUssRUFBRSxXQUFXOzRCQUNsQixVQUFVLEVBQUUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFOzRCQUNyQyxXQUFXLEVBQUUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFOzRCQUN0QyxPQUFPLEVBQUUsZUFBZSxDQUFDLDJCQUEyQjt5QkFDdkQsQ0FBQztxQkFDTCxDQUFDLENBQUM7b0JBSUgsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7d0JBQ2pCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLGlGQUF3RSxDQUFDO3dCQUN6RyxFQUFFLENBQUMsYUFBYSxDQUFDOzRCQUNiLElBQUksRUFBRSxZQUFZOzRCQUNsQixPQUFPLEVBQUUsZUFBZSxFQUFFLHdCQUF3Qjs0QkFDbEQsV0FBVyxFQUFFLGVBQWUsRUFBRSxxRUFBcUU7NEJBQ25HLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyx3QkFBd0I7NEJBQ2hOLGNBQWM7eUJBQ2pCLENBQUMsQ0FBQzt3QkFDSCxFQUFFLENBQUMsZUFBZSxDQUFDOzRCQUNmLElBQUksRUFBRSxXQUFXOzRCQUNqQixPQUFPLEVBQUUsZUFBZSxFQUFDLDJCQUEyQjs0QkFDcEQsV0FBVyxFQUFFLGVBQWUsRUFBRSw2REFBNkQ7NEJBQzNGLEtBQUssRUFBRSxFQUFFOzRCQUNULFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsMkJBQTJCO3lCQUN6SixDQUFDLENBQUM7d0JBRUgsRUFBRSxDQUFDLGFBQWEsQ0FBQzs0QkFDYixJQUFJLEVBQUUsYUFBYTs0QkFDbkIsT0FBTyxFQUFFLGVBQWUsRUFBaUYsZ0NBQWdDOzRCQUN6SSxLQUFLLEVBQUUsRUFBRSxFQUFDLG9CQUFvQjs0QkFDOUIsV0FBVyxFQUFFLFFBQVE7NEJBRXJCLFlBQVksRUFBRSxVQUFVLElBQUk7Z0NBQ3hCLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQ0FDbkQsT0FBTzt3Q0FDSCxJQUFJLEVBQUUsOENBQThDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxnQ0FBZ0M7d0NBQzdHLDBCQUEwQjtxQ0FDN0IsQ0FBQztnQ0FDTixDQUFDO2dDQUNELElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUUsQ0FBQztvQ0FDM0QsT0FBTzt3Q0FDSCxJQUFJLEVBQUUseUJBQXlCLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSw0QkFBNEI7d0NBQ3BGLDBCQUEwQjtxQ0FDN0IsQ0FBQztnQ0FDTixDQUFDOzRCQUNMLENBQUM7eUJBQ0osQ0FBQyxDQUFDO29CQUNQLENBQUM7b0JBR0wsT0FBTyxFQUFTLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRU0sY0FBYyxDQUFDLEVBQW1HO29CQUNySCxJQUFJLFFBQVEsR0FBMkI7d0JBQ25DLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLHVCQUF1QjtxQkFDMUUsQ0FBQTtvQkFFRCxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQzFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFRLENBQUMsQ0FBQyxDQUFDLElBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWhGLE9BQU8sUUFBUSxDQUFDO2dCQUNwQixDQUFDO2dCQUVNLGFBQWE7b0JBQ2hCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDbEIsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQzVCLFNBQVMsRUFBRTs0QkFDUCxJQUFJLEVBQUUsV0FBVzs0QkFDakIsT0FBTyxFQUFFLGVBQWUsRUFBRSwrQkFBK0I7NEJBQ3pELElBQUksRUFBRSxXQUFXOzRCQUNqQixPQUFPLEVBQUUsS0FBSzs0QkFDZCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUMzQzt3QkFDRCxrQkFBa0I7d0JBQ2xCLDRCQUE0Qjt3QkFDNUIsaUNBQWlDO3dCQUNqQyxxQkFBcUI7d0JBQ3JCLCtEQUErRDt3QkFDL0QsOEJBQThCO3dCQUM5Qiw4RkFBOEY7d0JBQzlGLDhDQUE4Qzt3QkFDOUMsSUFBSTt3QkFDSixrQkFBa0I7d0JBQ2xCLDRCQUE0Qjt3QkFDNUIsdUJBQXVCO3dCQUN2QixxQkFBcUI7d0JBQ3JCLGlFQUFpRTt3QkFDakUsOEJBQThCO3dCQUM5QiwwRkFBMEY7d0JBQzFGLDhDQUE4Qzt3QkFDOUMsSUFBSTt3QkFDSixTQUFTLEVBQUU7NEJBQ1AsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLElBQUksRUFBRSxTQUFTOzRCQUNmLE9BQU8sRUFBRSxLQUFLOzRCQUNkLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCOzRCQUNoRCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUMzQzt3QkFHRCxhQUFhLEVBQUU7NEJBQ1gsSUFBSSxFQUFFLGVBQWU7NEJBQ3JCLE9BQU8sRUFBRSxLQUFLOzRCQUNkLElBQUksRUFBRSxrQkFBa0I7NEJBQ3hCLE9BQU8sRUFBRSxlQUFlLEVBQUUsNEJBQTRCOzRCQUN0RCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUMvQzt3QkFDRCxZQUFZLEVBQUU7NEJBQ1YsSUFBSSxFQUFFLGNBQWM7NEJBQ3BCLE9BQU8sRUFBRSxLQUFLOzRCQUNkLE9BQU8sRUFBRSxlQUFlLEVBQUUsMEJBQTBCOzRCQUNwRCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQy9EO3dCQUNELFdBQVcsRUFBRTs0QkFDVCxJQUFJLEVBQUUsYUFBYTs0QkFDbkIsT0FBTyxFQUFFLEtBQUs7NEJBQ2QsT0FBTyxFQUFFLGVBQWUsRUFBRSx5QkFBeUI7NEJBQ25ELEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDOUQ7d0JBQ0QsV0FBVzt3QkFDWCxxQkFBcUI7d0JBQ3JCLHlCQUF5Qjt3QkFDekIsNEVBQTRFO3dCQUM1RSxxREFBcUQ7d0JBQ3JELE9BQU87d0JBQ1AsSUFBSTt3QkFDSixzQkFBc0I7d0JBQ3RCLGdDQUFnQzt3QkFDaEMseUJBQXlCO3dCQUN6QixrREFBa0Q7d0JBQ2xELDRFQUE0RTt3QkFDNUUscURBQXFEO3dCQUNyRCxPQUFPO3dCQUNQLElBQUk7d0JBQ0osWUFBWSxFQUFFOzRCQUNWLElBQUksRUFBRSxjQUFjOzRCQUNwQixHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUM5RDt3QkFDRCxxQkFBcUIsRUFBRTs0QkFDbkIsSUFBSSxFQUFFLHVCQUF1Qjs0QkFDN0IsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO2dDQUNiLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQ0FDckMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOzRCQUN6QixDQUFDO3lCQUNKO3dCQUNELFdBQVc7d0JBQ1gscUJBQXFCO3dCQUNyQixxQkFBcUI7d0JBQ3JCLHlCQUF5Qjt3QkFDekIsb0JBQW9CO3dCQUNwQix5Q0FBeUM7d0JBQ3pDLGlFQUFpRTt3QkFDakUsK0JBQStCO3dCQUMvQixPQUFPO3dCQUNQLElBQUk7d0JBQ0osWUFBWSxFQUFFOzRCQUNWLElBQUksRUFBRSxjQUFjOzRCQUNwQixPQUFPLEVBQUUsS0FBSzs0QkFDZCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0NBQ2IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dDQUMxQixJQUFJLElBQUksSUFBSSxJQUFJO29DQUFFLE9BQU87Z0NBRXpCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQXNDLGNBQWMsQ0FBQyxDQUFDO2dDQUMxRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQztvQ0FDaEIsT0FBTztnQ0FFWCxJQUFJO3FDQUNDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztxQ0FDMUIsaUJBQWlCLENBQUMsT0FBTyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dDQUNyRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7NEJBQ3pCLENBQUM7eUJBQ0o7cUJBR0osQ0FBQyxDQUFDO2dCQUVQLENBQUM7Z0JBR0Q7OzttQkFHRztnQkFDTyxhQUFhLENBQUMsUUFBcUQ7b0JBQ3pFLE9BQU8sS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDckMscUNBQXFDO29CQUVyQywwRUFBMEU7b0JBQzFFLGlHQUFpRztvQkFDakcsaUdBQWlHO29CQUNqRyxvQkFBb0I7b0JBQ3BCLDJEQUEyRDtvQkFFM0QsMEVBQTBFO29CQUcxRSxrRkFBa0Y7b0JBQ2xGLG9CQUFvQjtvQkFDcEIsa0VBQWtFO29CQUNsRSxrRkFBa0Y7b0JBRWxGLGdEQUFnRDtvQkFDaEQsYUFBYTtvQkFDYixxQkFBcUI7b0JBQ3JCLDJEQUEyRDtvQkFDM0QsaUJBQWlCO29CQUNqQiw4SEFBOEg7b0JBQzlILDJIQUEySDtvQkFDM0gsc0VBQXNFO29CQUN0RSxpSEFBaUg7b0JBQ2pILHNJQUFzSTtvQkFDdEksa0pBQWtKO29CQUVsSixPQUFPO29CQUNQLEtBQUs7b0JBRUwsY0FBYztnQkFDbEIsQ0FBQztnQkFFTSxVQUFVO29CQUNiLElBQUksS0FBSyxHQUFHLGVBQWUsQ0FBQyxDQUFDLDRCQUE0QjtvQkFDekQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsU0FBUyxFQUFFO3lCQUNYLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUNSLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDMUIsSUFBSSxJQUFJLElBQUksSUFBSTs0QkFBRSxPQUFPO3dCQUV6QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFzQyxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQ2pGLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDOzRCQUNoQixPQUFPO3dCQUVYLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakIsSUFBSSxRQUFxRCxDQUFDO3dCQUMxRCxJQUFJLEVBQVUsQ0FBQzt3QkFDZixJQUFJLE1BQXFCLENBQUM7d0JBQzFCLGdFQUFnRTt3QkFDaEUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsb0VBQTJELEVBQUUsQ0FBQzs0QkFDckYsS0FBSyxHQUFHLGVBQWUsQ0FBQSxDQUFDLGlDQUFpQzs0QkFDekQsTUFBTSxHQUFHLEVBQUUsQ0FBQzs0QkFDWixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7NEJBQ2IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7Z0NBQzNDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFpQixDQUFDLElBQUksRUFBRSxHQUFHLElBQUksR0FBRyxHQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQ3hFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQ0FDOUMsSUFBSSxHQUFHLElBQUksRUFBRTtvQ0FDVCxHQUFHLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWlCLENBQUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxHQUFHLEdBQUksQ0FBQyxRQUFRLENBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7b0NBRXBGLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFpQixDQUFDLElBQUksRUFBRSxHQUFHLElBQUksR0FBRyxHQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUM7NEJBQ3BGLENBQUM7NEJBQ0QsSUFBSSxHQUFHLElBQUksRUFBRTtnQ0FDVCxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7NEJBQzNCLEtBQUssSUFBSSxHQUFHLENBQUM7d0JBQ2pCLENBQUM7NkJBQ0ksQ0FBQzs0QkFDRixNQUFNLEdBQUc7Z0NBQ0wsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7Z0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO2dDQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtnQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7Z0NBQ3ZDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUU7Z0NBQ25DLE9BQU8sRUFBRSxHQUFHLENBQUMsR0FBSSxDQUFDLFFBQVEsRUFBRTtnQ0FDNUIsR0FBRyxFQUFFO29DQUNELEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7aUNBQzFDOzZCQUNKLENBQUM7d0JBQ04sQ0FBQzt3QkFDRCxRQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQzlCO2dDQUNJLFFBQVEsc0VBQThELENBQUM7Z0NBQ3ZFLEVBQUUsR0FBRyxZQUFZLENBQUMsQ0FBQyx3Q0FBd0M7Z0NBQzNELE1BQU07NEJBQ1Y7Z0NBQ0ksUUFBUSxvRUFBNEQsQ0FBQztnQ0FDckUsRUFBRSxHQUFHLFlBQVksQ0FBQyxDQUFDLHdDQUF3QztnQ0FDM0QsTUFBTTs0QkFDVjtnQ0FDSSxRQUFRLHVFQUE4RCxDQUFDO2dDQUN2RSxFQUFFLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyx3Q0FBd0M7Z0NBQ2xFLE1BQU07NEJBQ1Y7Z0NBQ0ksTUFBTSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDekMsQ0FBQzt3QkFFRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHdDQUF3QyxFQUFFOzRCQUNyRSxFQUFFLEVBQUUsRUFBRTs0QkFDTixRQUFRLEVBQUUsUUFBUTs0QkFDbEIsTUFBTSxFQUFFLE1BQU07NEJBQ2QsVUFBVSxFQUFDLEdBQUc7NEJBQ2QsWUFBWSxFQUFFLElBQUk7NEJBQ2xCLGNBQWMsRUFBRSxDQUFDLENBQUMsY0FBYzs0QkFDaEMsWUFBWSxFQUFFLElBQUk7NEJBQ2xCLEtBQUssRUFBRSxLQUFLO3lCQUNmLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO2dCQUdTLGFBQWE7b0JBQ25CLDhFQUE4RTtvQkFDOUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUVoRixxSEFBcUg7b0JBQ3JILHdHQUF3RztnQkFDNUcsQ0FBQztnQkFHRDs7O21CQUdHO2dCQUNJLE9BQU87b0JBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNiLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUMvQyxDQUFDO2FBRUo7WUF2c0JZLDRCQUFrQixxQkF1c0I5QixDQUFBO1lBRUQsMENBQTBDO1lBQzFDLDBEQUEwRDtZQUMxRCxnREFBZ0Q7WUFDaEQsR0FBRztRQUtQLENBQUMsRUFudEJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFtdEI3QjtJQUFELENBQUMsRUFudEJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFtdEJuQjtBQUFELENBQUMsRUFudEJTLE1BQU0sS0FBTixNQUFNLFFBbXRCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1Fa29Sb3pTdGF2eSBleHRlbmRzIEdTZXpuYW1Fa29aYXpuYW11QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcbiAgICAgICAgLyoqIEdsb2JhbG5pIG1vZHVsb3ZlIHBhcmFtZXRyeSB2IEpTICovXHJcblxyXG5cclxuICAgICAgICAvKiogTGltaXQgcG9jdHUgbmFjaXRhbnljaCB6YXpuYW11LCBwb2t1ZCBuZWRvamRlIGsgcG90dnJ6ZW5pLCB6ZSB1eml2YXRlbCBjaGNlIGppdCBwcmVzIGxpbWl0ICovXHJcbiAgICAgICAgLy9zdW1MaW1pdDogbnVtYmVyO1xyXG4gICAgICAgIGxvZ09wdGlvbnMgPSB7IG5hbWU6IFwiR1Nlem5hbUVrb1JvelN0YXZ5XCIsIGF1dGhvckNvZGU6IDMwMiwgZmlsZTogXCJHU2V6bmFtRWtvUm96U3RhdnkudHNcIiB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBLb25zdHJ1a3RvclxyXG4gICAgICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3RydWN0b3IoY29udGVudDogR1Nlem5hbUVrb1phem5hbXVCYXNlQ29udGVudCkge1xyXG4gICAgICAgICAgICBzdXBlcihjb250ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5wb3V6aXZhblN0cnVrUG9waXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5wb3ZvbGVuTmFobGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy51c2VUZXh0eVpSb3p2cmh1ID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gbW96bm9zdCB1a2xhZGFuaSBoaXN0b3JpZSBmaWx0cnVcclxuICAgICAgICAgICAgdGhpcy5yZW1lbWJlckhpc3RvcnkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY2kgSVNMIG1ldG9kdSBwcm8gemppc3RlbmkgcG9jdHUgemF6bmFtdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldENhbGxDb3VudCgpOiBKUXVlcnlQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LnBhcmVudENudC5pc2wuVWNyUm96cG9jdG92eVN0YXYuY291bnQoKVxyXG4gICAgICAgICAgICAgICAgLnVzZSgocmVxLCBuZXh0LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFkZEZpbHRlclRvSGlzdG9yeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpbHRlckRhdGEodGhhdCwgcmVxLCBuZXh0KSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSB2aWV3IHBybyBsaXN0XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlTGlzdFZpZXcoKTogR29yZGljLklzbC5WaWV3IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5Jc2wuVmlldzxJR1Nlem5hbVphcGlzdVN0YXZ1RHRvV2l0aFRhYlNldHRpbmdzPihcclxuICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmlzbC5VY3JSb3pwb2N0b3Z5U3Rhdi5saXN0KFxyXG4gICAgICAgICAgICAgICAgKS51c2UoKHJlcSwgbmV4dCwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmlsdGVyRGF0YSh0aGF0LCByZXEsIG5leHQpIGFzIGFueTtcclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBuZXh0KHJlcSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclBhbmVsOiB0aGF0LiRmaWx0ZXJQYW5lbCxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydEVtcHR5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NvcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtYXJlOiB0aGF0LnN1bWFyZV9wcm9jZXNzb3JcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIG5hc3RhdmVuaUFrY2koZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PiwgcG9jZXRSYWRrdTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHN1cGVyLm5hc3RhdmVuaUFrY2koZ3JpZCwgcG9jZXRSYWRrdSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgICogTmFjdGkgZmlsdHJ5XHJcbiAgICAgICAgICAqIEBwYXJhbSB0aGF0XHJcbiAgICAgICAgICAqIEBwYXJhbSByZXFcclxuICAgICAgICAgICogQHBhcmFtIG5leHRcclxuICAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGdldEZpbHRlckRhdGEodGhhdDogdGhpcywgcmVxOiBJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgbmV4dDogSXNsLlRhc2tSdW50aW1lTmV4dDxJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPFVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvPj4gfCBJc2wuVGFza1J1bnRpbWVOZXh0PElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBudW1iZXI+KTogSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPFVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvPiB8IEpRdWVyeVByb21pc2U8SXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPFVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvPj4gfCBKUXVlcnlQcm9taXNlPG51bWJlcj4gXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5nZXRGaWx0ZXIodGhhdC4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIikpXHJcbiAgICAgICAgICAgICAgICAudGhlbigobmV3RmlsdGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuYWRkRmlsdGVyVG9IaXN0b3J5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXggIT09IHRoYXQuZmlsdGVySGlzdG9yeS5sZW5ndGggLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maWx0ZXJIaXN0b3J5LnNwbGljZSh0aGF0LmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXggKyAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVySGlzdG9yeS5wdXNoKG5ld0ZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFkZEZpbHRlclRvSGlzdG9yeSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtYXNrYSA9IG5ld0ZpbHRlci5maWx0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBuZXdGaWx0ZXIuZmlsdGVyPy5jZnUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFza2EhW25hbWVdID0gbmV3RmlsdGVyLmZpbHRlcj8uY2Z1W25hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5uZXh0RmlsdGVyQWN0Py5lbmFibGVkKHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCA8IHRoYXQuZmlsdGVySGlzdG9yeS5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLnByZXZGaWx0ZXJBY3Q/LmVuYWJsZWQodGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4ID4gMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMuZ2V0RGF0YShuZXdGaWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdSZXF1ZXN0ID0gJC5leHRlbmQodHJ1ZSwge30sIHJlcSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJxOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0WmFwaXNMaXN0UmVxdWVzdER0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmFkZWtTdGF2dTogdGhpcy5DdXJyZW50Um93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXNrYTogbmV3RmlsdGVyLmZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIE1hc2thMjogbmV3RmlsdGVyLmZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIFR5cFVsb2h5OiB0aGF0LlR5cFVsb2h5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgRWxlbWVudHk6IG5ld0ZpbHRlci5lbGVtZW50eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIEZpbHRlclN0clBvcGlzOiBuZXdGaWx0ZXIuZmlsdGVyU3RyUG9waXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBsb2dvdmF0R2RwcjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIFN0clBvcGlzS2V5czogdGhhdC5hZGRTdHJQb3Bpc0NvbHVtbnNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBtYXhSZWNvcmRzOiAtMSxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJxLk1hc2thID0gbWFza2E7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UmVxdWVzdFtcImZpbHRlcnNcIl0gPSBycTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dChuZXdSZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBrbGF2ZXNvdnljaCB6a3JhdGVrXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlU2hvcnRDdXQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZVNob3J0Q3V0KCk7XHJcbiAgICAgICAgICAgIC8vbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL3RoaXMucGFyZW50Q250LmVsZW1lbnQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgLy8gICAga2V5OiBcIklOU0VSVFwiLFxyXG4gICAgICAgICAgICAvLyAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjI2XCIsIC8vUkMgMzExMDAyMjYgOiBOYcSNdGVuw60gZGF0XHJcbiAgICAgICAgICAgIC8vICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5UYXNrLFxyXG4gICAgICAgICAgICAvLyAgICBjYW5FeGVjdXRlOiAoZXYpID0+IHsgcmV0dXJuIGV2LnRhcmdldC50YWdOYW1lICE9PSBcIklOUFVUXCI7IH0sXHJcbiAgICAgICAgICAgIC8vICAgIGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5pbnNBY3RcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL3RoaXMucGFyZW50Q250LmVsZW1lbnQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgLy8gICAga2V5OiBcIjFcIixcclxuICAgICAgICAgICAgLy8gICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIxOFwiLCAvL1JDIDMxMTAwMjE4IDogUMWZZWRjaG96w60gZmlsdHJcclxuICAgICAgICAgICAgLy8gICAgY2FuRXhlY3V0ZTogKGV2KSA9PiB7IHJldHVybiBldi50YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiOyB9LFxyXG4gICAgICAgICAgICAvLyAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuVGFzayxcclxuICAgICAgICAgICAgLy8gICAgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnByZXZGaWx0ZXJBY3RcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5wYXJlbnRDbnQuZWxlbWVudC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAvLyAgICBrZXk6IFwiMFwiLFxyXG4gICAgICAgICAgICAvLyAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjI4XCIsIC8vUkMgMzExMDAyMjggOiBWecSNaXN0aXQgYSBuYcSNw61zdFxyXG4gICAgICAgICAgICAvLyAgICBjYW5FeGVjdXRlOiAoZXYpID0+IHsgcmV0dXJuIGV2LnRhcmdldC50YWdOYW1lICE9PSBcIklOUFVUXCI7IH0sXHJcbiAgICAgICAgICAgIC8vICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5UYXNrLFxyXG4gICAgICAgICAgICAvLyAgICBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuY2xlYXJBbmRGaWx0ZXJBY3RcclxuICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgLy9sZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAvL2lmIChncmlkICE9PSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICAvLyAgICBncmlkLmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBrZXk6IFwiY3RybCtzaGlmdCtsY2xpY2tcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyOVwiLCAvL1JDIDMxMTAwMjI5IDogUMWZZW5lc2Vuw60gaG9kbm90eSBkbyBmaWx0cnUuXHJcbiAgICAgICAgICAgIC8vICAgICAgICBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuc2VsRmlsdGVyQWN0XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgZ3JpZC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAga2V5OiBcImN0cmwrbGNsaWNrXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuR3JpZCxcclxuICAgICAgICAgICAgLy8gICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMzVcIiwgLy9SQyAzMTEwMDIzNSA6IFDFmWVuZXNlbsOtIGhvZG5vdHkgZG8gZmlsdHJ1IGEgdnlobGVkw6Fuw60uXHJcbiAgICAgICAgICAgIC8vICAgICAgICBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuc2VsRmlsdGVyQW5kU2VhcmNoQWN0XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgZ3JpZC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAga2V5OiBbXCIuXCIsIFwiLFwiXSxcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vTk9URTogRGVzY3JpcHRpb24gb3BzYW5vIHogbmFwb3ZlZHkgayBUSyBVQ1JcclxuICAgICAgICAgICAgLy8gICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMjdcIiwgLy9SQyAzMTEwMDIyNyA6IFpvYnJhemVuw60gdsWhZWNoIHrDoXBpc8WvIGRva2xhZMWvIChjZWzDvSBkb2tsYWQpIG5hZCBvem5hxI1lbsO9bSB6w6FwaXNlbS5cclxuICAgICAgICAgICAgLy8gICAgICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgYWN0aW9uOiB0aGlzLmRvdEFjdFxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0by8qJkdTZXpuYW1aYXBpc3VTdGF2dUR0byovPiB7XHJcbiAgICAgICAgICAgIHZhciBnZiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0bz4oKTtcclxuICAgICAgICAgICAgLy92YXIgdG9wb0dyb3VwID0gXCJ0b3BvXCI7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nbG9iYWxzLlJlemltUHJvdm96dSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5OS1M6IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5VQ1M6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMubmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LklDTzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcInVjc1wiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudWNzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLnVjcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuaWNvLCBha3RQcm9obDogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5ha3RQcm9obFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgb25seUFjdGl2ZTogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5vbmx5QWN0aXZlLCBjYXB0aW9uOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmNhcHRpb24sIG5hbWU6IFwidWNzXCIsIGZpcnN0RmllbGQ6IHVuZGVmaW5lZCwgc2Vjb25kRmllbGQ6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwidWNzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiAhISh0aGlzLlJhZGVrX0RQSCkgJiYgISF0aGlzLkZpbHRlci51Y3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuQXZvaWRVdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuVXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51dXNJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudXVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnV1c0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmljbywgdWNzOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLnVjcywgYWt0UHJvaGw6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuYWt0UHJvaGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuY2FwdGlvbiwgbmFtZTogXCJ1dXNcIiwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwidXVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkaXNhYmxlZDogISEodGhpcy5SYWRla19EUEgpICYmICEhdGhpcy5GaWx0ZXIudWNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkF2b2lkTmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLm5rc0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy5ua3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LlNPUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5LkljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5LkljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwiaWNvXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiB0aGlzLkV4dGVybmlTdW1hcml6YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBHb3JkaWMuRWtvLkZpbHRlcnMucmFySW50ZXJ2YWwoeyBtb2RlbDogXCJpY29cIiwgb25seUFjdGl2ZTogZmFsc2UsIGNhcHRpb246IHRoaXMuemtyYXRreS5JY28sIGRpc2FibGVkOiAhISh0aGlzLlJhZGVrX0RQSCkgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IEdvcmRpYy5Fa28uRmlsdGVycy5pY29JbnRlcnZhbCh7IG1vZGVsOiBcImljb1wiLCBvbmx5QWN0aXZlOiBmYWxzZSwgY2FwdGlvbjogdGhpcy56a3JhdGt5LkljbywgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLkF2b2lkRXh0IHx8IHRoaXMuZ2xvYmFscy5UeXBTdW1hcml6YWNlICE9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwU3VtYXJpemFjZS5FeHRlcm5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwidWNzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudWNzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLnVjcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5pY28sIGFrdFByb2hsOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmFrdFByb2hsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgb25seUFjdGl2ZTogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5vbmx5QWN0aXZlLCBjYXB0aW9uOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmNhcHRpb24sIG5hbWU6IFwidWNzXCIsIGZpcnN0RmllbGQ6IHVuZGVmaW5lZCwgc2Vjb25kRmllbGQ6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcInVjc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKSAmJiAhIXRoaXMuRmlsdGVyLnVjc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuQXZvaWRVdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLnV1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmljbywgdWNzOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLnVjcywgYWt0UHJvaGw6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuYWt0UHJvaGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgb25seUFjdGl2ZTogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5vbmx5QWN0aXZlLCBjYXB0aW9uOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmNhcHRpb24sIG5hbWU6IFwidXVzXCIsIGZpcnN0RmllbGQ6IHVuZGVmaW5lZCwgc2Vjb25kRmllbGQ6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJ1dXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkaXNhYmxlZDogISEodGhpcy5SYWRla19EUEgpICYmICEhdGhpcy5GaWx0ZXIudWNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkF2b2lkTmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMubmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBkcmRTZXJ2ZXJGaWx0ZXIgPSBHb3JkaWMuRWtvLkZpbHRlcnMuZHJkKHRoaXMuZmlsdGVyT3B0aW9ucy5kcmQpO1xyXG4gICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkcmRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1MiBcIiwgLy9SQyAzMTEwMDA1MiA6IEhcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAxMDJcIiwgLy9SQyAzMTEwMDEwMiA6IERydWggZG9rbGFkdSAoRFJEKVxyXG4gICAgICAgICAgICAgICAgLy90b29sdGlwVGVtcGxhdGU6IFwianJlczozMTEwMDEwMlwiLCAvL1JDIDMxMTAwMTAyIDogRHJ1aCBkb2tsYWR1IChEUkQpXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IGRyZFNlcnZlckZpbHRlci8vR29yZGljLkVrby5GaWx0ZXJzLmRyZCh0aGlzLmZpbHRlck9wdGlvbnMuZHJkKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1MSBcIiwgLy9SQyAzMTEwMDA1MSA6IE1cclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAwMTFcIiwgLy9SQyAzMTEwMDAxMSA6IE3Em3PDrWNcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMCxcclxuICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcIm1lc2ljXCIpLFxyXG4gICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcIm1lc2ljXCIsIGNhcHRpb246IFwianJlczozMTEwMDA1MVwiLCBkaXNhYmxlZDogISEodGhpcy5GaWx0ZXIgJiYgdGhpcy5TdHJpY3RGaWx0ZXIgJiYgdGhpcy5GaWx0ZXIubWVzaWMpIH0pIC8vUkMgMzExMDAwNTEgOiBNXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibWVzaWNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDUxXCIsIC8vUkMgMzExMDAwNTEgOiBNXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICEhKHRoaXMuRmlsdGVyICYmIHRoaXMuU3RyaWN0RmlsdGVyICYmIHRoaXMuRmlsdGVyLm1lc2ljKSxcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDEsIG1heDogMTMgfSldIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRmllbGQ6IHsgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SYW5nZSh7IG1pbjogMSwgbWF4OiAxMyB9KV0gfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBnZi5hZGRTb3J0ZWRFa29DZnVTZXQodGhpcy5nZXRDZnVTZXRTZXJ2ZXJGaWx0ZXJzKHRydWUpKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDY1XCIsIC8vUkMgMzExMDAwNjUgOiBNTyBQxZnDrWptxa9cclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMFwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNjVcIiB9KSAgLy9SQyAzMTEwMDA2NSA6IE1PIFDFmcOtam3Fr1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDY2XCIsIC8vUkMgMzExMDAwNjYgOiBNTyBWw71kYWrFr1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMxXCIsIGNhcHRpb246IFwianJlczozMTEwMDA2NlwiIH0pIC8vUkMgMzExMDAwNjYgOiBNTyBWw71kYWrFr1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMGMxXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNjdcIiwgLy9SQyAzMTEwMDA2NyA6IE1PIFAtVlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIGhpZGRlbjogIXRoaXMuZ2xvYmFscy5SYWRfWm9icmF6TWREYWwsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMGMxXCIsIGNhcHRpb246IFwianJlczozMTEwMDA2N1wiIH0pIC8vUkMgMzExMDAwNjcgOiBNTyBQLVZcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBfYXNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA2OFwiLCAvL1JDIDMxMTAwMDY4IDogQVMgUMWZw61qbcWvXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBfYXNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDY4XCIgfSkgLy9SQyAzMTEwMDA2OCA6IEFTIFDFmcOtam3Fr1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMV9hc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDY5XCIsIC8vUkMgMzExMDAwNjkgOiBBUyBWw71kYWrFr1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMxX2FzXCIsIGNhcHRpb246IFwianJlczozMTEwMDA2OVwiIH0pIC8vUkMgMzExMDAwNjkgOiBBUyBWw71kYWrFr1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMGMxX2FzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzBcIiwgLy9SQyAzMTEwMDA3MCA6IEFTIE1EIC0gRGFsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiAhdGhpcy5nbG9iYWxzLlJhZF9ab2JyYXpNZERhbCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwYzFfYXNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDcwXCIgfSkgLy9SQyAzMTEwMDA3MCA6IEFTIE1EIC0gRGFsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgICAgIFxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDE1XCIsIC8vUkMgMzExMDAwMTUgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRhdGVJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IHZhbHVlVHlwZTogXCJkYXRldGltZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZEZpZWxkOiB7IHZhbHVlVHlwZTogXCJkYXRldGltZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDAxNVwiIC8vUkMgMzExMDAwMTUgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5Qcml6SWlzc3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWlzc3BEaXNhYmxlID0gdGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9QcmV1Y3RvdmFuaV9zdGF2eTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZF9oZHJfcmlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA4MlwiLCAvL1JDIDMxMTAwMDgyIDogSUQgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1NVwiLCAvL1JDIDMxMTAwMjU1IDogSWRlbnRpZmlrw6F0b3IgcmV6ZXJ2YWNlIHJvenBvxI10b3bDvWNoIHByb3N0xZllZGvFryBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImlkX2hkcl9yaXNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgyXCIsIGRpc2FibGVkOiBpaXNzcERpc2FibGUsIGZpcnN0RmllbGQ6IHsgbWF4TGVuZ3RoOiA5IH0sIHNlY29uZEZpZWxkOiB7IG1heExlbmd0aDogOSB9IH0pIC8vUkMgMzExMDAwODIgOiBJRCBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL21heExlbmd0aDogOVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmFkZWtfaGRyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA4M1wiLC8vUkMgMzExMDAwODMgOiDFmcOhZGVrIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNTZcIiwgLy9SQyAzMTEwMDI1NiA6IMWYw6FkZWsgcmV6ZXJ2YWNlIHJvenBvxI10b3bDvWNoIHByb3N0xZllZGvFryBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7IG1vZGVsOiBcInJhZGVrX2hkclwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwODNcIiwgZGlzYWJsZWQ6IGlpc3NwRGlzYWJsZSB9KSAvL1JDIDMxMTAwMDgzIDogxZnDoWRlayBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzX3ByZXBfYWlzcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNDRcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vUkMgMzAyNTAzNDQgOiBJSVNTUCBQxZllcG/EjXRlbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDM5LC8vIGZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImNlbnRlclwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc19wcmVwX2Fpc3AgIT0gbnVsbCAmJiBkYXRhLnNfcHJlcF9haXNwID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtY2hlY2stY2lyY2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXN1Y2Nlc3NcIiwgdGV4dDogXCJqcmVzOjMwMjUwMzQ0XCIsIC8vUkMgMzAyNTAzNDQgOiBJSVNTUCBQxZllcG/EjXRlbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90b29sdGlwOiBcImpyZXM6MzAyNTAyODhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmlkX2hkcl9yaXMgIT0gbnVsbCAmJiBkYXRhLmlkX2hkcl9yaXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZXhjbGFtIGctc3RhdGUtZXJyb3JcIiwgdGV4dDogXCJqcmVzOjMwMjUwMzQ1XCIsIC8vUkMgMzAyNTAzNDUgOiBOZXpwcmFjb3bDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9vbHRpcDogXCJqcmVzOjMwMjUwMjg5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdmIGFzIGFueTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVQcm9maWxlcyhnZjogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0U2V6bmFtWmFwaXN1U3RhdnVEdG8vKiZHU2V6bmFtWmFwaXN1U3RhdnVEdG8qLz4pOiBJR1Nlem5hbVphcGlzdVByb2ZpbGVzIHtcclxuICAgICAgICAgICAgbGV0IHByb2ZpbGVzOiBJR1Nlem5hbVphcGlzdVByb2ZpbGVzID0ge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogeyBuYW1lOiBcImpyZXM6MzExMDAyMzJcIiwgY29sdW1uczoge30gfSAvL1JDIDMxMTAwMjMyIDogVsO9Y2hvesOtXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdmLmNvbHVtbnMuZmlsdGVyKChjKSA9PiB7IHJldHVybiAhYy5oaWRkZW47IH0pXHJcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoYykgPT4geyBwcm9maWxlcy5kZWZhdWx0LmNvbHVtbnMhW2MubmFtZSFdID0geyBoaWRkZW46IGZhbHNlIH0gfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJvZmlsZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICBkZXRhaWxBY3Q6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRldGFpbEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDI2NlwiLCAvL1JDIDMxMTAwMjY2IDogWm9icmF6aXQgZGV0YWlsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93RGV0YWlsKCk7IH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvL3ByZXZGaWx0ZXJBY3Q6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwicHJldkZpbHRlckFjdFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgaWNvbjogXCJnaS1hcnJvdyBnaS1yb3QxODBcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjE4XCIsIC8vUkMgMzExMDAyMTggOiBQxZllZGNob3rDrSBmaWx0clxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvblZpc2libGU6IFwibmV2ZXJcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIHRvb2x0aXA6IFwianJlczozMTEwMDIyMFwiLCAvL1JDIDMxMTAwMjIwIDogTsOhdnJhdCBrIHDFmWVkY2hvesOtIGhvZG5vdMSbIGZpbHRydSBhIHZ5aGxlZMOhbsOtLlxyXG4gICAgICAgICAgICAgICAgLy8gICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLnByZXZGaWx0ZXIoKTsgfVxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgLy9uZXh0RmlsdGVyQWN0OiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcIm5leHRGaWx0ZXJBY3RcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGljb246IFwiZ2ktYXJyb3dcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjE5XCIsIC8vUkMgMzExMDAyMTkgOiBOw6FzbGVkdWrDrWPDrSBmaWx0clxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvblZpc2libGU6IFwibmV2ZXJcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIHRvb2x0aXA6IFwianJlczozMTEwMDIyMVwiLCAvL1JDIDMxMTAwMjIxIDogVnlwbG7Em27DrSBuw6FzbGVkdWrDrWPDrWhvIGZpbHRydSBhIHZ5aGxlZMOhbsOtLlxyXG4gICAgICAgICAgICAgICAgLy8gICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLm5leHRGaWx0ZXIoKTsgfVxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgemFwaXN5QWN0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6YXBpc3lBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxMjRcIiwgLy9SQyAzMTEwMDEyNCA6IFrDoXBpc3lcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuc2hvd1phcGlzeSgpOyB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBwcmltZG9rbGFkQWN0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcmltZG9rbGFkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1leHRlcm5hbC1saW5rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTU0XCIsIC8vUkMgMzAyNTAxNTQgOiBQcmltLiBkb2tsYWRcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuc2hvd1ByaW1Eb2tsYWQoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRva2xhZEJMS0FjdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rbGFkQkxLQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTU1XCIsIC8vUkMgMzAyNTAxNTUgOiBEb2tsYWQgQkxLXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLnNob3dQcmltRG9rbGFkKHVuZGVmaW5lZCwgXCJCTEtcIik7IH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkb2tsYWRST0FjdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rbGFkUk9BY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNTZcIiwgLy9SQyAzMDI1MDE1NiA6IERva2xhZCBST1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93UHJpbURva2xhZCh1bmRlZmluZWQsIFwiUk9cIik7IH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvL2luc0FjdDoge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJpbnNBY3RcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGlzLmdldEZpbHRlcih0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJnZXRDb25maXJtZWREYXRhXCIpKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAudGhlbigoKSA9PiB7IHRoaXMuZG9GaWx0ZXJDbGljaygpOyB9KTtcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIC8vY2xlYXJBbmRGaWx0ZXJBY3Q6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiY2xlYXJBbmRGaWx0ZXJBY3RcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGlzLmdldEZpbHRlcih0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJnZXRDb25maXJtZWREYXRhXCIpKVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAudGhlbigoKSA9PiB7IHRoaXMuZG9GaWx0ZXJDbGljaygpOyB9KTtcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIHNlbEZpbHRlckFjdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2VsRmlsdGVyQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLmRpc3BhdGNoRmlsbFNlcnZlckdyaWRFdmVudChldik7IH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZWxGaWx0ZXJBbmRTZWFyY2hBY3Q6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNlbEZpbHRlckFuZFNlYXJjaEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEZpbGxTZXJ2ZXJHcmlkRXZlbnQoZXYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvRmlsdGVyQ2xpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy9kb3RBY3Q6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiZG90QWN0XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGlzLiRncmlkXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC5nZ3JpZHNlcnZlcmZpbHRlcihcImNsZWFyXCIpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC5nZ3JpZHNlcnZlcmZpbHRlcihcImFwcGx5XCIsIHRoaXMuZ2V0WmFwaXNGaWx0ZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhpcy5kb0ZpbHRlckNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJQaWRBY3Q6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZpbHRlclBpZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuOyAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZWwgPSBncmlkLmdncmlkPFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjbGVhclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkc2VydmVyZmlsdGVyKFwiYXBwbHlcIiwgeyBpeHA6IHNlbFswXS5peHAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9GaWx0ZXJDbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVmaW5pY2UgbWVudSBiYXJ1XHJcbiAgICAgICAgICogQHBhcmFtIHR5cFVsb2h5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIERlZmluZU1lbnVCYXIodHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUpOiBNZW51UGFyYW1zW10ge1xyXG4gICAgICAgICAgICByZXR1cm4gc3VwZXIuRGVmaW5lTWVudUJhcih0eXBVbG9oeSk7XHJcbiAgICAgICAgICAgIC8vbGV0IG1lbnUgPSBuZXcgQXJyYXk8TWVudVBhcmFtcz4oKTtcclxuXHJcbiAgICAgICAgICAgIC8vbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmRldGFpbEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIC8vbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnByZXZGaWx0ZXJBY3QsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0pO1xyXG4gICAgICAgICAgICAvL21lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5uZXh0RmlsdGVyQWN0LCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9KTtcclxuICAgICAgICAgICAgLy9pZiAodGhpcy5wcmludEFjdClcclxuICAgICAgICAgICAgLy8gICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnByaW50QWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnphcGlzeUFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8vLy8vbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnByaW1kb2tsYWRBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAvLy8vIHRleHR1IHogcm96dnJodVxyXG4gICAgICAgICAgICAvL2lmICh0eXBlb2YgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy50ZXh0Um96dnJoQWN0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAvLyAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMudGV4dFJvenZyaEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcblxyXG4gICAgICAgICAgICAvL21lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5jbGVhckZpbHRlclJvd0FjdCB9KTtcclxuICAgICAgICAgICAgLy9tZW51LnB1c2goe1xyXG4gICAgICAgICAgICAvLyAgICB0eXBlOiBcInN0YXRpY1wiLFxyXG4gICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyNjhcIiwgLy9SQyAzMTEwMDI2OCA6IFJ5Y2hsw6kgYWtjZVxyXG4gICAgICAgICAgICAvLyAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAvLyAgICAgICAgeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuaW5zQWN0LCBpY29uOiBcImdpLXJlZnJlc2hcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjI2XCIgfSwgLy9SQyAzMTEwMDIyNiA6IE5hxI10ZW7DrSBkYXRcclxuICAgICAgICAgICAgLy8gICAgICAgIHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmNsZWFyQW5kRmlsdGVyQWN0LCBjYXB0aW9uOiBcImpyZXM6MzExMDAyMjhcIiB9LCAvL1JDIDMxMTAwMjI4IDogVnnEjWlzdGl0IGEgbmHEjcOtc3RcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vTk9URTogVHl0byBkdmUgYWtjZSBidWRvdSB2emR5IGZ1bmdvdmF0IHBvdXplIHoga2xhdmVzbmljZVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy97IGFjdGlvbjogdGhpcy5zZWxGaWx0ZXJBY3QsIGNhcHRpb246IFwianJlczozMTEwMDIyOVwiIH0sIC8vUkMgMzExMDAyMjkgOiBQxZllbmVzZW7DrSBob2Rub3R5IGRvIGZpbHRydS5cclxuICAgICAgICAgICAgLy8gICAgICAgIC8veyBhY3Rpb246IHRoaXMuc2VsRmlsdGVyQW5kU2VhcmNoQWN0LCBjYXB0aW9uOiBcImpyZXM6MzExMDAyMzVcIiB9LCAvL1JDIDMxMTAwMjM1IDogUMWZZW5lc2Vuw60gaG9kbm90eSBkbyBmaWx0cnUgYSB2eWhsZWTDoW7DrS5cclxuICAgICAgICAgICAgLy8gICAgICAgIC8veyBhY3Rpb246IHRoaXMuZG90QWN0LCBjYXB0aW9uOiBcImpyZXM6MzExMDAyMjdcIiB9LCAvL1JDIDMxMTAwMjI3IDogWm9icmF6ZW7DrSB2xaFlY2ggesOhcGlzxa8gZG9rbGFkxa8gKGNlbMO9IGRva2xhZCkgbmFkIG96bmHEjWVuw71tIHrDoXBpc2VtLlxyXG5cclxuICAgICAgICAgICAgLy8gICAgXVxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgLy9yZXR1cm4gbWVudTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzaG93WmFwaXN5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGl0bGUgPSBcImpyZXM6MzExMDAyMjRcIjsgLy9SQyAzMTEwMDIyNCA6IFrDoXBpc3kgc3RhdnVcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmdldEZpbHRlcigpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuOyAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbCA9IGdyaWQuZ2dyaWQ8VWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8+KFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCAhPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gc2VsWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0eXBVbG9oeTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWQ6IHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyOiBHRWtvRmlsdGVyRHRvO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vTk9URTogT2Rwb3ZpZGEgeiBUSyBVQ1I6IEdTZXpuYW1aYXBpc3VWUmFka3VUYWIuTG9hZEdyaWREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJlbnRDbnQuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA9IFwianJlczozMDI1MDI3NFwiIC8vUkMgMzAyNTAyNzQgOiBaw6FwaXN5IHNhbGRva29udGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhZGQgPSBcIlwiOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZ2xvYmFscy5TYWxkb2tvbnRvUGFyYW0xIS50cmltKCkgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZCA9IHRoYXQuZ2xvYmFscy5TYWxkb2tvbnRvUGFyYW0xIS50cmltKCkgKyBcIjogXCIgKyByb3chW1widmFsdWUwXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5nbG9iYWxzLlNhbGRva29udG9QYXJhbTIhLnRyaW0oKSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWRkICE9IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkICs9IFwiLCBcIiArIHRoYXQuZ2xvYmFscy5TYWxkb2tvbnRvUGFyYW0yIS50cmltKCkgKyBcIjogXCIgKyByb3chW1widmFsdWUxXCJdIS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkID0gdGhhdC5nbG9iYWxzLlNhbGRva29udG9QYXJhbTEhLnRyaW0oKSArIFwiOiBcIiArIHJvdyFbXCJ2YWx1ZTBcIl0/LnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWRkICE9IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGQgPSBcIiAoXCIgKyBhZGQgKyBcIilcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgKz0gYWRkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB7IHN0YXJ0OiByb3cuaWNvISwgZW5kOiByb3cuaWNvISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiB7IHN0YXJ0OiByb3cudWNzISwgZW5kOiByb3cudWNzISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVzOiB7IHN0YXJ0OiByb3cudXVzISwgZW5kOiByb3cudXVzISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmtzOiB7IHN0YXJ0OiByb3cubmtzISwgZW5kOiByb3cubmtzISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzaWM6IHsgc3RhcnQ6IDAsIGVuZDogcm93Lm1lc2ljIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmRfbXNrOiByb3cuZHJkIS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Z1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVhOiB7IHN0YXJ0OiByb3cudWVhISwgZW5kOiByb3cudWVhISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlYjogeyBzdGFydDogcm93LnVlYiEsIGVuZDogcm93LnVlYiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWM6IHsgc3RhcnQ6IHJvdy51ZWMhLCBlbmQ6IHJvdy51ZWMhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVkOiB7IHN0YXJ0OiByb3cudWVkISwgZW5kOiByb3cudWVkISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZTogeyBzdGFydDogcm93LnVlZSEsIGVuZDogcm93LnVlZSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWY6IHsgc3RhcnQ6IHJvdy51ZWYhLCBlbmQ6IHJvdy51ZWYhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVnOiB7IHN0YXJ0OiByb3cudWVnISwgZW5kOiByb3cudWVnISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlaDogeyBzdGFydDogcm93LnVlaCEsIGVuZDogcm93LnVlaCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWk6IHsgc3RhcnQ6IHJvdy51ZWkhLCBlbmQ6IHJvdy51ZWkhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVqOiB7IHN0YXJ0OiByb3cudWVqISwgZW5kOiByb3cudWVqISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlazogeyBzdGFydDogcm93LnVlayEsIGVuZDogcm93LnVlayEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWw6IHsgc3RhcnQ6IHJvdy51ZWwhLCBlbmQ6IHJvdy51ZWwhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVtOiB7IHN0YXJ0OiByb3cudWVtISwgZW5kOiByb3cudWVtISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlbjogeyBzdGFydDogcm93LnVlbiEsIGVuZDogcm93LnVlbiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTA6IHsgc3RhcnQ6IHJvdy50ZTAhLCBlbmQ6IHJvdy50ZTAhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGUxOiB7IHN0YXJ0OiByb3cudGUxISwgZW5kOiByb3cudGUxISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlMjogeyBzdGFydDogcm93LnRlMiEsIGVuZDogcm93LnRlMiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTM6IHsgc3RhcnQ6IHJvdy50ZTMhLCBlbmQ6IHJvdy50ZTMhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU0OiB7IHN0YXJ0OiByb3cudGU0ISwgZW5kOiByb3cudGU0ISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlNTogeyBzdGFydDogcm93LnRlNSEsIGVuZDogcm93LnRlNSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTY6IHsgc3RhcnQ6IHJvdy50ZTYhLCBlbmQ6IHJvdy50ZTYhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU3OiB7IHN0YXJ0OiByb3cudGU3ISwgZW5kOiByb3cudGU3ISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlODogeyBzdGFydDogcm93LnRlOCEsIGVuZDogcm93LnRlOCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTk6IHsgc3RhcnQ6IHJvdy50ZTkhLCBlbmQ6IHJvdy50ZTkhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wYXJlbnRDbnQuVHlwVWxvaHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlTdGF2OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwVWxvaHkgPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gXCJ1Y3RaYXBpc3kjXCI7IC8vTk9URTogTXVzaSBieXQgc3Rlam5lIG5pIG5hIE1haW5BcHAuY3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRTdGF2OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwVWxvaHkgPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlJvenBvY2V0WmFwaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZCA9IFwicm96WmFwaXN5I1wiOyAvL05PVEU6IE11c2kgYnl0IHN0ZWpuZSBuaSBuYSBNYWluQXBwLmNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG86XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBVbG9oeSA9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250b1phcGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBcInNlem5hbVNhbGRva29udG8jXCI7IC8vTk9URTogTXVzaSBieXQgc3Rlam5lIG5pIG5hIE1haW5BcHAuY3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdFcnJvcihcIk5vdFN1cHBvcnRlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Q250Lm5hdmlnYXRlKCdHb3JkaWMuVWNyLldlYkNsaWVudC5HU2V6bmFtRWtvWmF6bmFtdScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUeXBVbG9oeTogdHlwVWxvaHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEZpbHRlcjogZmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdXJyZW50Um93OnJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU3RyaWN0RmlsdGVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBGaWx0ZXJTdHJQb3BpczogZi5maWx0ZXJTdHJQb3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXV0b0xvYWREYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBkb0ZpbHRlckNsaWNrKCk6IHZvaWQge1xyXG4gICAgICAgICAgICAvL05PVEU6IFRvdG8gamUgc3BhdG5lLCBhbGUgcHJvIHVrYXprdSBzdGFjaSAtIGplIG51dG5lIGZpbHRyb3ZhdCBpIHMgZWxlbWVudHlcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuZWxlbWVudC5maW5kKFwiLmdmaWx0ZXJwYW5lbFwiKS5maW5kKFwiLmpzLWhsYXZuaVZ5aGxlZGF0XCIpLmNsaWNrKCk7XHJcblxyXG4gICAgICAgICAgICAvL1RPRE86IFBvIHRlc3RlY2ggcyBkaXN0cmlidXRvcnkgdnNlIHpyZWZha3Rvcml0IG5hIHRha292eXRvIHphcGlzLCBtdXNpIGJ5dCBhbGUgcmFkbmUgb3Rlc3RvdmFuIHBybyB2c2VjaG55IHByaXBhZHlcclxuICAgICAgICAgICAgLy90aGlzLmdldEZpbHRlcih0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJnZXRDb25maXJtZWREYXRhXCIpKS50aGVuKChkKSA9PiB7IHRoaXMubG9hZERhdGEoZCk7IH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFV6YXZpcmFuaSBva25hXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy9pbnRlcmZhY2UgSUdTZXpuYW1aYXBpc3VTdGF2dVJlc3VsdER0byB7XHJcbiAgICAvLyAgICBTZXpuYW1aYXBpc3U6IFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvW107XHJcbiAgICAvLyAgICBTdW15OiBVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0byBcclxuICAgIC8vfVxyXG5cclxuXHJcblxyXG4gXHJcbn0iXX0=