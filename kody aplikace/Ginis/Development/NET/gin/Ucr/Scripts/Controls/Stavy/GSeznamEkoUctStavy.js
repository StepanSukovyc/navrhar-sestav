"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            class GSeznamEkoUctStavy extends WebClient.GSeznamEkoZaznamuBase {
                /**
                 * Konstruktor
                 * @param content
                 */
                constructor(content) {
                    super(content);
                    this.logOptions = { name: "GSeznamEkoUctStavy", authorCode: 302, file: "GSeznamEkoUctStavy.ts" };
                    this.pouzivanStrukPopis = false;
                    this.povolenNahled = true;
                    // definice tasku pro seznam a nacteni poctu
                    this.taskList = this.parentCnt.isl.UcrUcetniStav.list();
                    this.taskCount = this.parentCnt.isl.UcrUcetniStav.count();
                    // moznost ukladani historie filtru
                    this.rememberHistory = true;
                    // pouzivat texty z rozvrhu
                    this.useTextyZRozvrhu = true;
                    // pouzivat filtr na PAP radky
                    this.usePapRows = true;
                    this._nastaveniAkci();
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
                getFilterData1(that, req, next) {
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
                        that.parentCnt.actions.nextFilterAct?.enabled(that.currFilterHistoryIndex < that.filterHistory.length - 1);
                        that.parentCnt.actions.prevFilterAct?.enabled(that.currFilterHistoryIndex > 0);
                        //return this.getData(newFilter);
                        var newRequest = $.extend(true, {}, req);
                        let rq = {
                            Maska: newFilter.filter,
                            Elementy: newFilter.elementy
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
                }
                createGridFormat() {
                    var gf = new Gordic.Data.GridFormat();
                    //var topoGroup = "topo";
                    gf.addStructureColumn({
                        name: "doklady",
                        caption: "jres:31100231", //RC 31100231 : Doklady
                        hidden: true,
                        width: 100,
                        groupings: {
                            default: {
                                _presetCaption: "jres:31100231", //RC 31100231 : Doklady
                                grouping: {
                                    hash: (meta, rows) => {
                                        var d = meta.data;
                                        return `${d.ac}|${d.mesic}|${d.rok}|${d.lic}|${d.ico}|${d.ucs}`; //NOTE: Pridat aggregate: Gordic.Data.Aggregates.first("ac"), u vsech techto sloupcu
                                    },
                                    sort: "rok,lic,ico,ucs,mesic,ac",
                                    hideColumn: false
                                }
                            }
                        }
                    });
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
                        caption: "jres:31100059", //RC 31100059 : MO MD
                        description: "jres:31100245", //RC 31100245 : Měsíční obrat Má Dáti
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0", caption: "jres:31100059" }) //RC 31100059 : MO MD
                    });
                    gf.addCurrencyColumn({
                        name: "c1",
                        caption: "jres:31100060", //RC 31100060 : MO Dal
                        description: "jres:31100246", //RC 31100246 : Měsíční obrat Dal
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c1", caption: "jres:31100060" }) //RC 31100060 : MO Dal
                    });
                    gf.addCurrencyColumn({
                        name: "c0c1",
                        caption: "jres:31100061", //RC 31100061 : MO MD - Dal
                        description: "jres:31100247", //RC 31100247 : Rozdíl částek Měsíční obrat Má Dáti mínus Měsíční obrat Dal
                        width: 120,
                        hidden: !this.globals.Rad_ZobrazMdDal,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0c1", caption: "jres:31100061" }) //RC 31100061 : MO MD - Dal
                    });
                    gf.addCurrencyColumn({
                        name: "c0_as",
                        caption: "jres:31100062", //RC 31100062 : AS MD
                        description: "jres:31100248", //RC 31100248 : Aktuální stav Má Dáti
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0_as", caption: "jres:31100062" }) //RC 31100062 : AS MD
                    });
                    gf.addCurrencyColumn({
                        name: "c1_as",
                        caption: "jres:31100063", //RC 31100063 : AS Dal
                        description: "jres:31100249", //RC 31100249 : Aktuální stav Dal
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c1_as", caption: "jres:31100063" }) //RC 31100063 : AS Dal
                    });
                    gf.addCurrencyColumn({
                        name: "c0c1_as",
                        caption: "jres:30250605", //RC 30250605 : AS MD - Dal
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
                    //// textu z rozvrhu
                    //if (this.displayTextyZRozvrhu()) {
                    //    // zjisteni prednastavenych slov rozvrhu
                    //    let slovaRozvrhu = this.parentCnt.globalSettings?.get("Global.Ucr.AppSettings.UctSettingsForm.selectedWordsShowGridColumns") as GSlovaRozvrhFilterDto[];
                    //    // prevzeti sloupcu    
                    //    slovaRozvrhu.forEach(function (sloupec) {
                    //        gf.addTextColumn({
                    //            name: sloupec.hodnota! + "_txt",
                    //            caption: "jres:30250594".format(sloupec.klic!), //RC 30250594 : {0} - popis
                    //            sortable: false,
                    //            width: 200,
                    //            serverFilter: Gordic.Eko.Filters.stringSingle({ model: sloupec.hodnota!, caption: "jres:31100097" }) //RC 31100097 : Změnu provedl
                    //        });
                    //    });
                    //}            
                    return gf;
                }
                createProfiles(gf) {
                    let profiles = {
                        default: { name: "jres:31100232", columns: {} } //RC 31100232 : Výchozí
                    };
                    gf.columns.filter((c) => { return !c.hidden; })
                        .forEach((c) => { profiles.default.columns[c.name] = { hidden: false }; });
                    if (this.Zapisova) {
                        profiles.default.name = "jres:31100241"; //RC 31100241 : Zápisy (výchozí)
                        profiles.doklady = { name: "jres:31100231", columns: {}, grouping: "doklady" }; //RC 31100231 : Doklady
                        profiles.doklady.columns = $.extend({
                            doklady: { hidden: false },
                            pdok: { hidden: false }
                        }, profiles.default.columns);
                    }
                    return profiles;
                }
                /**
                 * Vytvoreni akci
                 *
                 * */
                createActions() {
                    let that = this;
                    super.createActions();
                    this.parentCnt.actions.addRange({
                        detailAct: {
                            name: "detailAct",
                            caption: "jres:31100266", //RC 31100266 : Zobrazit detail
                            icon: "gi-detail",
                            enabled: false,
                            run: (ev, ctx) => { this.showDetail(); }
                        },
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
                        filterPidAct: {
                            name: "filterPidAct",
                            enabled: false,
                            run: (ev, ctx) => {
                                const grid = that.getGrid();
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
                    //// akci pro nacitani bez PAP radku
                    //if (this.showPapAction()) 
                    //    menu.push({ action: this.parentCnt.actions.bezPapAct, favorite: true, align: "opposite" });
                    //menu.push({ action: this.parentCnt.actions.zapisyAct, favorite: true });
                    ////menu.push({ action: this.parentCnt.actions.primdokladAct, favorite: true });
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
                createFilterPanel() {
                    var that = this;
                    super.createFilterPanel(this);
                    //let cfuSet = this.getCfuSetServerFilters(false);
                    //var gf = Gordic.Ucr.WebClient.GElementUtils.createElementsGridFormat({
                    //    ekoParams: this.parentCnt.ekoParams,
                    //    globals: this.globals,
                    //    typSestavy: this.typSestavy,
                    //    cfuSet: cfuSet,
                    //    filterOptions: this.filterOptions,
                    //    filterParams: this.parentCnt.filterParams
                    //});
                    //var elmRowOpts = { label: "Elementy" };
                    //elmRowOpts["favoriteRowLayoutDescriptor"] = "w-L-9 w-M-8 w-S-12";
                    ////let fpForm: Gordic.Forms.Form;
                    //let fpForm = new Gordic.Forms.Form({ tabLabel: "jres:30250052" }) //RC 30250052 : Filtr
                    //    .addSection()
                    //    .addRow(elmRowOpts)
                    //    .addField("gselectbox", Gordic.Eko.Prefabs.cfuElements({
                    //        name: "elementy",
                    //        //name: "filters",
                    //        id: this.parentCnt.taskId ? this.parentCnt.taskId + "_elementyField#" : undefined,
                    //        modelValueTransform: {
                    //            //apply: (modelValue) => { return modelValue; },
                    //            apply: (modelValue) => { return modelValue.filters; },
                    //            //collect: (fieldValue) => { return fieldValue; }
                    //            collect: (fieldValue) => { return { filters: fieldValue }; }
                    //        },
                    //        change: function (ev, obj) { that.parentCnt.log.trace("elementy", $(this).gfield("getValue")); },
                    //        gridFormat: gf,
                    //        canAddNewRecords: true,
                    //        canRemoveRecords: true,
                    //        createNewRecord: GElementUtils.createNewElementFunc(this.globals.RezimProvozu!, this.parentCnt.ekoParams),
                    //        clearRecord: GElementUtils.createClearElementFunc(this.globals.RezimProvozu!),
                    //        formatElementValueOptions: { skip: GElementUtils.getElementValueSkipColumns(this.globals.RezimProvozu!), nameColumn: "nazev" },
                    //    }));
                    //this.$filterPanel = $.newDiv()
                    //    .appendTo(this.parentCnt.element)
                    //    .gfilterpanel({
                    //        forms: [fpForm],
                    //        favorites: ["md"],
                    //        favoriteLayoutDescriptor: "L5M3S1 L-12-12-0 M-12-12-0 S-12-12-0",
                    //        searchButtonOnMainRow: true,
                    //        saveOptionsForm: GUcrMaskaDetail.getForm(gf as any), //TODO: Dat spravny typ gridformatu!
                    //        filterStorageService: new GUcrMaskaService({ typSestavy: this.typSestavy, parentContent: that.parentCnt,fragments:"*,elementy" }),
                    //        autoLoadAfterChoseFilter: false,
                    //        //apply: (ev, data) => { this.loadDataOld(data.filter); },
                    //        reset: (ev, data) => {
                    //            const grid = that.getGrid();
                    //            if (grid == null) return;
                    //            grid.ggridserverfilter("clear");
                    //        },
                    //        primaryButtonBehaviour: "AlwaysPrimary",
                    //        clearFilterButtonVisible: "AlwaysVisible",
                    //        poVyhledaniZobrazit: "OblibenePodminky",
                    //        filterViewMode: FilterViewMode.Detail,
                    //        filterViewModeUserSettings: [FilterViewMode.Detail, FilterViewMode.Normal, FilterViewMode.Simple],
                    //        poVyhledaniZobrazitUserSettings: "Deny" //NOTE: Zakazuje prepinani po vyhledani - pokud se nekdo pokousel vymazat filtr v tomto rezimu, tak musel kliknout na vyhledat, viz T3987
                    //    });
                }
                showZapisy() {
                    let title = "jres:31100224"; //RC 31100224 : Zápisy stavu
                    let that = this;
                    this.getFilter()
                        .then((f) => {
                        const grid = that.getGrid();
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
                        {
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
                getZapisFilter() {
                    const grid = this.getGrid();
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
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    var that = this;
                    return $.Deferred().resolve().promise();
                }
            }
            WebClient.GSeznamEkoUctStavy = GSeznamEkoUctStavy;
            //interface IGSeznamZapisuStavuResultDto {
            //    SeznamZapisu: GSeznamZapisuStavuDto[];
            //    Sumy: GSeznamZapisuStavuDto
            //}
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUVrb1VjdFN0YXZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbUVrb1VjdFN0YXZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0Fxb0JmO0FBcm9CRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0Fxb0JuQjtJQXJvQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXFvQjdCO1FBcm9Cb0IsV0FBQSxTQUFTO1lBRTFCLE1BQWEsa0JBQW1CLFNBQVEsVUFBQSxxQkFBcUI7Z0JBWXpEOzs7bUJBR0c7Z0JBQ0gsWUFBWSxPQUFxQztvQkFDN0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQU5uQixlQUFVLEdBQUcsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQztvQkFPeEYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztvQkFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQzFCLDRDQUE0QztvQkFDNUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ3hELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUMxRCxtQ0FBbUM7b0JBQ25DLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO29CQUM1QiwyQkFBMkI7b0JBQzNCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7b0JBQzdCLDhCQUE4QjtvQkFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDMUIsQ0FBQztnQkFJRDs7O3FCQUdLO2dCQUNFLGFBQWEsQ0FBQyxJQUF5QixFQUFFLFVBQWtCO29CQUM5RCxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFFMUMsQ0FBQztnQkFDRDs7Ozs7b0JBS0k7Z0JBQ00sY0FBYyxDQUFDLElBQVUsRUFBRSxHQUE0QixFQUFFLElBQTJLO29CQUUxTyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzt5QkFDbEUsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7d0JBQ2hCLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7NEJBQzFCLElBQUksSUFBSSxDQUFDLHNCQUFzQixLQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUM7Z0NBQzdELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFFL0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQ25DLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO3dCQUNsQyxDQUFDO3dCQUNELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7d0JBRS9CLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7d0JBQzdCLEtBQUssSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQzs0QkFDckMsS0FBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMvQyxDQUFDO3dCQUVELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUMzRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDL0UsaUNBQWlDO3dCQUNqQyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ3pDLElBQUksRUFBRSxHQUE2Qzs0QkFDL0MsS0FBSyxFQUFFLFNBQVMsQ0FBQyxNQUFNOzRCQUNyQixRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVE7eUJBQ2pDLENBQUM7d0JBQ0YsRUFBRSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7d0JBQ2pCLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7d0JBQzNCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM1QixDQUFDLENBQ0EsQ0FDQTtnQkFFVCxDQUFDO2dCQUNEOzs7cUJBR0s7Z0JBQ0ssY0FBYztvQkFDcEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUUzQixDQUFDO2dCQUVNLGdCQUFnQjtvQkFDbkIsSUFBSSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBaUQsQ0FBQztvQkFDckYseUJBQXlCO29CQUV6QixFQUFFLENBQUMsa0JBQWtCLENBQUM7d0JBQ2xCLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUsdUJBQXVCO3dCQUNqRCxNQUFNLEVBQUUsSUFBSTt3QkFDWixLQUFLLEVBQUUsR0FBRzt3QkFDVixTQUFTLEVBQUU7NEJBQ1AsT0FBTyxFQUFFO2dDQUNMLGNBQWMsRUFBRSxlQUFlLEVBQUUsdUJBQXVCO2dDQUN4RCxRQUFRLEVBQUU7b0NBQ04sSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO3dDQUNqQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO3dDQUNsQixPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLG9GQUFvRjtvQ0FDekosQ0FBQztvQ0FDRCxJQUFJLEVBQUUsMEJBQTBCO29DQUNoQyxVQUFVLEVBQUUsS0FBSztpQ0FDcEI7NkJBQ0o7eUJBQ0o7cUJBQ0osQ0FBQyxDQUFDO29CQUdILFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDaEMsdURBQThDLENBQUMsQ0FBQyxNQUFNO3dCQUN0RDs0QkFDSSxFQUFFLENBQUMsYUFBYSxDQUFDO2dDQUNiLElBQUksRUFBRSxLQUFLO2dDQUNYLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7Z0NBQ3pCLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7Z0NBQzNCLEtBQUssRUFBRSxFQUFFO2dDQUNULG1CQUFtQjtnQ0FDbkIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQzs2QkFDdkUsQ0FBQyxDQUFDOzRCQUNILE1BQU07d0JBQ1Y7NEJBQ0ksRUFBRSxDQUFDLGFBQWEsQ0FBQztnQ0FDYixJQUFJLEVBQUUsS0FBSztnQ0FDWCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO2dDQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHO2dDQUMzQixLQUFLLEVBQUUsRUFBRTtnQ0FDVCxtQkFBbUI7Z0NBQ25CLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2dDQUM5QyxzRUFBc0U7Z0NBQ3RFLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7b0NBQ3pDLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVE7b0NBQ3hFLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVM7b0NBQ2xKLEtBQUssRUFBRSxLQUFLO29DQUNaLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRztpQ0FDdEQsQ0FBQzs2QkFDTCxDQUFDLENBQUM7NEJBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO2dDQUNkLEVBQUUsQ0FBQyxhQUFhLENBQUM7b0NBQ2IsSUFBSSxFQUFFLEtBQUs7b0NBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztvQ0FDekIsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRztvQ0FDM0IsS0FBSyxFQUFFLEVBQUU7b0NBQ1QsbUJBQW1CO29DQUNuQixzRUFBc0U7b0NBQ3RFLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7d0NBQ3pDLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUTt3Q0FDekcsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUzt3Q0FDbEosS0FBSyxFQUFFLEtBQUs7d0NBQ1osUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO3FDQUN0RCxDQUFDO2lDQUNMLENBQUMsQ0FBQzs0QkFFUCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7Z0NBQ2QsRUFBRSxDQUFDLGFBQWEsQ0FBQztvQ0FDYixJQUFJLEVBQUUsS0FBSztvQ0FDWCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO29DQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHO29DQUMzQixLQUFLLEVBQUUsRUFBRTtvQ0FDVCxtQkFBbUI7b0NBQ25CLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7aUNBQ3ZFLENBQUMsQ0FBQzs0QkFDUCxNQUFNO3dCQUNWOzRCQUNJLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0NBQ2IsSUFBSSxFQUFFLEtBQUs7Z0NBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztnQ0FDekIsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRztnQ0FDM0IsS0FBSyxFQUFFLEVBQUU7Z0NBQ1Qsa0JBQWtCO2dDQUNsQixTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztnQ0FDOUMsWUFBWSxFQUFFLElBQUksQ0FBQyxpQkFBaUI7b0NBQ2hDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztvQ0FDOUgsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDOzZCQUNySSxDQUFDLENBQUM7NEJBRUgsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSwyREFBbUQsRUFBRSxDQUFDO2dDQUNqRyxFQUFFLENBQUMsYUFBYSxDQUFDO29DQUNiLElBQUksRUFBRSxLQUFLO29DQUNYLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7b0NBQ3pCLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7b0NBQzNCLEtBQUssRUFBRSxFQUFFO29DQUNULG1CQUFtQjtvQ0FDbkIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7b0NBQzlDLHNFQUFzRTtvQ0FDdEUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQzt3Q0FDekMsR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUTt3Q0FDeEUsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUzt3Q0FDbEosS0FBSyxFQUFFLEtBQUs7d0NBQ1osUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO3FDQUN0RCxDQUFDO2lDQUNMLENBQUMsQ0FBQztnQ0FFSCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7b0NBQ2QsRUFBRSxDQUFDLGFBQWEsQ0FBQzt3Q0FDYixJQUFJLEVBQUUsS0FBSzt3Q0FDWCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO3dDQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHO3dDQUMzQixLQUFLLEVBQUUsRUFBRTt3Q0FDVCxtQkFBbUI7d0NBQ25CLHNFQUFzRTt3Q0FDdEUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQzs0Q0FDekMsR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFROzRDQUN6RyxVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTOzRDQUNsSixLQUFLLEVBQUUsS0FBSzs0Q0FDWixRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7eUNBQ3RELENBQUM7cUNBQ0wsQ0FBQyxDQUFDO2dDQUVQLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtvQ0FDZCxFQUFFLENBQUMsYUFBYSxDQUFDO3dDQUNiLElBQUksRUFBRSxLQUFLO3dDQUNYLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7d0NBQ3pCLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7d0NBQzNCLEtBQUssRUFBRSxFQUFFO3dDQUNULG1CQUFtQjt3Q0FDbkIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQztxQ0FDdkUsQ0FBQyxDQUFDOzRCQUNYLENBQUM7NEJBQ0QsTUFBTTtvQkFDZCxDQUFDO29CQUVELElBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUVyRSxFQUFFLENBQUMsZUFBZSxDQUFDO3dCQUNmLElBQUksRUFBRSxLQUFLO3dCQUNYLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUI7d0JBQzVDLFdBQVcsRUFBRSxlQUFlLEVBQUUsa0NBQWtDO3dCQUNoRSxzRUFBc0U7d0JBQ3RFLEtBQUssRUFBRSxFQUFFO3dCQUNULFlBQVksRUFBRSxlQUFlLENBQUEsZ0RBQWdEO3FCQUNoRixDQUFDLENBQUM7b0JBQ0gsRUFBRSxDQUFDLGVBQWUsQ0FBQzt3QkFDZixJQUFJLEVBQUUsT0FBTzt3QkFDYixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCO3dCQUM1QyxXQUFXLEVBQUUsZUFBZSxFQUFFLHFCQUFxQjt3QkFDbkQsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7d0JBQ2hELHNMQUFzTDt3QkFDdEwsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQzs0QkFDNUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLGlCQUFpQjs0QkFDM0QsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs0QkFDbkUsVUFBVSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTs0QkFDOUUsV0FBVyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTt5QkFDbEYsQ0FBQztxQkFDTCxDQUFDLENBQUM7b0JBR0gsRUFBRSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUV6RCxFQUFFLENBQUMsaUJBQWlCLENBQUM7d0JBQ2pCLElBQUksRUFBRSxJQUFJO3dCQUNWLE9BQU8sRUFBRSxlQUFlLEVBQUUscUJBQXFCO3dCQUMvQyxXQUFXLEVBQUUsZUFBZSxFQUFFLHFDQUFxQzt3QkFDbkUsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUUscUJBQXFCO3FCQUNySCxDQUFDLENBQUM7b0JBQ0gsRUFBRSxDQUFDLGlCQUFpQixDQUFDO3dCQUNqQixJQUFJLEVBQUUsSUFBSTt3QkFDVixPQUFPLEVBQUUsZUFBZSxFQUFFLHNCQUFzQjt3QkFDaEQsV0FBVyxFQUFFLGVBQWUsRUFBRSxpQ0FBaUM7d0JBQy9ELEtBQUssRUFBRSxHQUFHO3dCQUNWLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFFLHNCQUFzQjtxQkFDdEgsQ0FBQyxDQUFDO29CQUNILEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDakIsSUFBSSxFQUFFLE1BQU07d0JBQ1osT0FBTyxFQUFFLGVBQWUsRUFBRSwyQkFBMkI7d0JBQ3JELFdBQVcsRUFBRSxlQUFlLEVBQUUsMkVBQTJFO3dCQUN6RyxLQUFLLEVBQUUsR0FBRzt3QkFDVixNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWU7d0JBQ3JDLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLDJCQUEyQjtxQkFDNUgsQ0FBQyxDQUFDO29CQUNILEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDakIsSUFBSSxFQUFFLE9BQU87d0JBQ2IsT0FBTyxFQUFFLGVBQWUsRUFBRSxxQkFBcUI7d0JBQy9DLFdBQVcsRUFBRSxlQUFlLEVBQUUscUNBQXFDO3dCQUNuRSxLQUFLLEVBQUUsR0FBRzt3QkFDVixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxxQkFBcUI7cUJBQ3ZILENBQUMsQ0FBQztvQkFDSCxFQUFFLENBQUMsaUJBQWlCLENBQUM7d0JBQ2pCLElBQUksRUFBRSxPQUFPO3dCQUNiLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCO3dCQUNoRCxXQUFXLEVBQUUsZUFBZSxFQUFFLGlDQUFpQzt3QkFDL0QsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsc0JBQXNCO3FCQUN4SCxDQUFDLENBQUM7b0JBQ0gsRUFBRSxDQUFDLGlCQUFpQixDQUFDO3dCQUNqQixJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsZUFBZSxFQUFFLDJCQUEyQjt3QkFDckQsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlO3dCQUNyQyxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBRSwyQkFBMkI7cUJBQ2hJLENBQUMsQ0FBQztvQkFFSCxFQUFFLENBQUMsaUJBQWlCLENBQUM7d0JBQ2pCLElBQUksRUFBRSxXQUFXO3dCQUNqQixPQUFPLEVBQUUsZUFBZSxFQUFFLDJCQUEyQjt3QkFDckQsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQzs0QkFDMUMsS0FBSyxFQUFFLFdBQVc7NEJBQ2xCLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUU7NEJBQ3JDLFdBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUU7NEJBQ3RDLE9BQU8sRUFBRSxlQUFlLENBQUMsMkJBQTJCO3lCQUN2RCxDQUFDO3FCQUNMLENBQUMsQ0FBQztvQkFDSCxvQkFBb0I7b0JBQ3BCLG9DQUFvQztvQkFDcEMsOENBQThDO29CQUM5Qyw4SkFBOEo7b0JBRTlKLDZCQUE2QjtvQkFDN0IsK0NBQStDO29CQUMvQyw0QkFBNEI7b0JBQzVCLDhDQUE4QztvQkFDOUMseUZBQXlGO29CQUN6Riw4QkFBOEI7b0JBQzlCLHlCQUF5QjtvQkFDekIsZ0pBQWdKO29CQUNoSixhQUFhO29CQUNiLFNBQVM7b0JBQ1QsZUFBZTtvQkFFZixPQUFPLEVBQVMsQ0FBQztnQkFDckIsQ0FBQztnQkFFTSxjQUFjLENBQUMsRUFBbUc7b0JBQ3JILElBQUksUUFBUSxHQUEyQjt3QkFDbkMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsdUJBQXVCO3FCQUMxRSxDQUFBO29CQUVELEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDMUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQVEsQ0FBQyxDQUFDLENBQUMsSUFBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFaEYsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ2hCLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxDQUFDLGdDQUFnQzt3QkFDekUsUUFBUSxDQUFDLE9BQU8sR0FBRyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyx1QkFBdUI7d0JBQ3ZHLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7NEJBQ2hDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7NEJBQzFCLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7eUJBQzFCLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDakMsQ0FBQztvQkFFRCxPQUFPLFFBQVEsQ0FBQztnQkFDcEIsQ0FBQztnQkFFRDs7O3FCQUdLO2dCQUVFLGFBQWE7b0JBQ2hCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQzVCLFNBQVMsRUFBRTs0QkFDUCxJQUFJLEVBQUUsV0FBVzs0QkFDakIsT0FBTyxFQUFFLGVBQWUsRUFBRSwrQkFBK0I7NEJBQ3pELElBQUksRUFBRSxXQUFXOzRCQUNqQixPQUFPLEVBQUUsS0FBSzs0QkFDZCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUMzQzt3QkFDRCxTQUFTLEVBQUU7NEJBQ1AsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLElBQUksRUFBRSxTQUFTOzRCQUNmLE9BQU8sRUFBRSxLQUFLOzRCQUNkLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCOzRCQUNoRCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUMzQzt3QkFDRCxhQUFhLEVBQUU7NEJBQ1gsSUFBSSxFQUFFLGVBQWU7NEJBQ3JCLE9BQU8sRUFBRSxLQUFLOzRCQUNkLElBQUksRUFBRSxrQkFBa0I7NEJBQ3hCLE9BQU8sRUFBRSxlQUFlLEVBQUUsNEJBQTRCOzRCQUN0RCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUMvQzt3QkFHRCxZQUFZLEVBQUU7NEJBQ1YsSUFBSSxFQUFFLGNBQWM7NEJBQ3BCLE9BQU8sRUFBRSxLQUFLOzRCQUNkLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQ0FDYixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0NBQzVCLElBQUksSUFBSSxJQUFJLElBQUk7b0NBQUUsT0FBTztnQ0FFekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBc0MsY0FBYyxDQUFDLENBQUM7Z0NBQzFFLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDO29DQUNoQixPQUFPO2dDQUdYLElBQUk7cUNBQ0MsaUJBQWlCLENBQUMsT0FBTyxDQUFDO3FDQUMxQixpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0NBQ3JELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs0QkFDekIsQ0FBQzt5QkFDSjtxQkFFSixDQUFDLENBQUM7Z0JBR1AsQ0FBQztnQkFFRDs7O21CQUdHO2dCQUNPLGFBQWEsQ0FBQyxRQUFxRDtvQkFDekUsT0FBTyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUVyQyxxQ0FBcUM7b0JBRXJDLDBFQUEwRTtvQkFDMUUsaUdBQWlHO29CQUNqRyxpR0FBaUc7b0JBQ2pHLG9CQUFvQjtvQkFDcEIsMkRBQTJEO29CQUUzRCxvQ0FBb0M7b0JBQ3BDLDRCQUE0QjtvQkFDNUIsaUdBQWlHO29CQUNqRywwRUFBMEU7b0JBRzFFLGdGQUFnRjtvQkFFaEYsb0JBQW9CO29CQUNwQixrRUFBa0U7b0JBQ2xFLGtGQUFrRjtvQkFFbEYsZ0RBQWdEO29CQUNoRCxhQUFhO29CQUNiLHFCQUFxQjtvQkFDckIsMkRBQTJEO29CQUMzRCxpQkFBaUI7b0JBQ2pCLDhIQUE4SDtvQkFDOUgsMkhBQTJIO29CQUMzSCxzRUFBc0U7b0JBQ3RFLGlIQUFpSDtvQkFDakgsc0lBQXNJO29CQUN0SSxrSkFBa0o7b0JBRWxKLE9BQU87b0JBQ1AsS0FBSztvQkFFTCxjQUFjO2dCQUNsQixDQUFDO2dCQUVNLGlCQUFpQjtvQkFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzlCLGtEQUFrRDtvQkFDbEQsd0VBQXdFO29CQUN4RSwwQ0FBMEM7b0JBQzFDLDRCQUE0QjtvQkFDNUIsa0NBQWtDO29CQUNsQyxxQkFBcUI7b0JBQ3JCLHdDQUF3QztvQkFDeEMsK0NBQStDO29CQUMvQyxLQUFLO29CQUVMLHlDQUF5QztvQkFDekMsbUVBQW1FO29CQUNuRSxrQ0FBa0M7b0JBQ2xDLHlGQUF5RjtvQkFDekYsbUJBQW1CO29CQUNuQix5QkFBeUI7b0JBQ3pCLDhEQUE4RDtvQkFDOUQsMkJBQTJCO29CQUMzQiw0QkFBNEI7b0JBQzVCLDRGQUE0RjtvQkFDNUYsZ0NBQWdDO29CQUNoQyw4REFBOEQ7b0JBQzlELG9FQUFvRTtvQkFDcEUsK0RBQStEO29CQUMvRCwwRUFBMEU7b0JBQzFFLFlBQVk7b0JBQ1osMkdBQTJHO29CQUMzRyx5QkFBeUI7b0JBQ3pCLGlDQUFpQztvQkFDakMsaUNBQWlDO29CQUNqQyxvSEFBb0g7b0JBQ3BILHdGQUF3RjtvQkFDeEYseUlBQXlJO29CQUN6SSxVQUFVO29CQUVWLGdDQUFnQztvQkFDaEMsdUNBQXVDO29CQUN2QyxxQkFBcUI7b0JBQ3JCLDBCQUEwQjtvQkFDMUIsNEJBQTRCO29CQUM1QiwyRUFBMkU7b0JBQzNFLHNDQUFzQztvQkFDdEMsbUdBQW1HO29CQUNuRyw0SUFBNEk7b0JBQzVJLDBDQUEwQztvQkFDMUMsb0VBQW9FO29CQUNwRSxnQ0FBZ0M7b0JBQ2hDLDBDQUEwQztvQkFDMUMsdUNBQXVDO29CQUV2Qyw4Q0FBOEM7b0JBQzlDLFlBQVk7b0JBQ1osa0RBQWtEO29CQUNsRCxvREFBb0Q7b0JBQ3BELGtEQUFrRDtvQkFDbEQsZ0RBQWdEO29CQUNoRCw0R0FBNEc7b0JBQzVHLDJMQUEyTDtvQkFFM0wsU0FBUztnQkFDYixDQUFDO2dCQUVNLFVBQVU7b0JBQ2IsSUFBSSxLQUFLLEdBQUcsZUFBZSxDQUFDLENBQUMsNEJBQTRCO29CQUN6RCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxTQUFTLEVBQUU7eUJBQ1gsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7d0JBQ1IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUM1QixJQUFJLElBQUksSUFBSSxJQUFJOzRCQUFFLE9BQU87d0JBRXpCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQXNDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDakYsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUM7NEJBQ2hCLE9BQU87d0JBRVgsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNqQixJQUFJLFFBQXFELENBQUM7d0JBQzFELElBQUksRUFBVSxDQUFDO3dCQUNmLElBQUksTUFBcUIsQ0FBQzt3QkFDMUIsZ0VBQWdFO3dCQUNuRixDQUFDOzRCQUNzQixNQUFNLEdBQUc7Z0NBQ0wsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7Z0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO2dDQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtnQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7Z0NBQ3ZDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUU7Z0NBQ25DLE9BQU8sRUFBRSxHQUFHLENBQUMsR0FBSSxDQUFDLFFBQVEsRUFBRTtnQ0FDNUIsR0FBRyxFQUFFO29DQUNELEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFF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RSxDQUFDO2dCQUM1QyxDQUFDO2FBRUo7WUF6bkJZLDRCQUFrQixxQkF5bkI5QixDQUFBO1lBRUQsMENBQTBDO1lBQzFDLDRDQUE0QztZQUM1QyxpQ0FBaUM7WUFDakMsR0FBRztRQUtQLENBQUMsRUFyb0JvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFxb0I3QjtJQUFELENBQUMsRUFyb0JnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFxb0JuQjtBQUFELENBQUMsRUFyb0JTLE1BQU0sS0FBTixNQUFNLFFBcW9CZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1Fa29VY3RTdGF2eSBleHRlbmRzIEdTZXpuYW1Fa29aYXpuYW11QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcbiAgICAgICAgLyoqIEdsb2JhbG5pIG1vZHVsb3ZlIHBhcmFtZXRyeSB2IEpTICovXHJcbiAgICAgICAgLy9nbG9iYWxzOiBHb3JkaWMuVWNyLldlYkNsaWVudC5EdG8uR1Vjckdsb2JhbHNEdG87XHJcbiAgICAgICAgLy96a3JhdGt5OiBHb3JkaWMuVWNyLldlYkNsaWVudC5EdG8uR1VjclprckR0bztcclxuICAgICAgICAvL3RleHR5OiBHb3JkaWMuVWNyLldlYkNsaWVudC5EdG8uR1VjclprckR0bztcclxuICBcclxuXHJcblxyXG5cclxuICAgICAgICAvKiogTGltaXQgcG9jdHUgbmFjaXRhbnljaCB6YXpuYW11LCBwb2t1ZCBuZWRvamRlIGsgcG90dnJ6ZW5pLCB6ZSB1eml2YXRlbCBjaGNlIGppdCBwcmVzIGxpbWl0ICovXHJcbiAgICAgICAgc3VtTGltaXQ6IG51bWJlcjtcclxuICAgICAgICBsb2dPcHRpb25zID0geyBuYW1lOiBcIkdTZXpuYW1Fa29VY3RTdGF2eVwiLCBhdXRob3JDb2RlOiAzMDIsIGZpbGU6IFwiR1Nlem5hbUVrb1VjdFN0YXZ5LnRzXCIgfTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBLb25zdHJ1a3RvclxyXG4gICAgICAgICAqIEBwYXJhbSBjb250ZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3RydWN0b3IoY29udGVudDogR1Nlem5hbUVrb1phem5hbXVCYXNlQ29udGVudCkge1xyXG4gICAgICAgICAgICBzdXBlcihjb250ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5wb3V6aXZhblN0cnVrUG9waXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5wb3ZvbGVuTmFobGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gZGVmaW5pY2UgdGFza3UgcHJvIHNlem5hbSBhIG5hY3RlbmkgcG9jdHVcclxuICAgICAgICAgICAgdGhpcy50YXNrTGlzdCA9IHRoaXMucGFyZW50Q250LmlzbC5VY3JVY2V0bmlTdGF2Lmxpc3QoKTtcclxuICAgICAgICAgICAgdGhpcy50YXNrQ291bnQgPSB0aGlzLnBhcmVudENudC5pc2wuVWNyVWNldG5pU3Rhdi5jb3VudCgpO1xyXG4gICAgICAgICAgICAvLyBtb3pub3N0IHVrbGFkYW5pIGhpc3RvcmllIGZpbHRydVxyXG4gICAgICAgICAgICB0aGlzLnJlbWVtYmVySGlzdG9yeSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIHBvdXppdmF0IHRleHR5IHogcm96dnJodVxyXG4gICAgICAgICAgICB0aGlzLnVzZVRleHR5WlJvenZyaHUgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyBwb3V6aXZhdCBmaWx0ciBuYSBQQVAgcmFka3lcclxuICAgICAgICAgICAgdGhpcy51c2VQYXBSb3dzID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fbmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbmkgcHJpc3R1cG5vc3RpIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBuYXN0YXZlbmlBa2NpKGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD4sIHBvY2V0UmFka3U6IG51bWJlcikge1xyXG4gICAgICAgICAgICBzdXBlci5uYXN0YXZlbmlBa2NpKGdyaWQsIHBvY2V0UmFka3UpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAqIE5hY3RpIGZpbHRyeVxyXG4gICAgICAgICAgKiBAcGFyYW0gdGhhdFxyXG4gICAgICAgICAgKiBAcGFyYW0gcmVxXHJcbiAgICAgICAgICAqIEBwYXJhbSBuZXh0XHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXRGaWx0ZXJEYXRhMSh0aGF0OiB0aGlzLCByZXE6IElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBuZXh0OiBJc2wuVGFza1J1bnRpbWVOZXh0PElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBJc2wuR1NlcnZpY2VMaXN0UmVzcG9uc2U8VWN0LkludGVyZmFjZS5HVWN0U2V6bmFtWmFwaXN1U3RhdnVEdG8+PiB8IElzbC5UYXNrUnVudGltZU5leHQ8SXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIG51bWJlcj4pOiBJc2wuR1NlcnZpY2VMaXN0UmVzcG9uc2U8VWN0LkludGVyZmFjZS5HVWN0U2V6bmFtWmFwaXN1U3RhdnVEdG8+IHwgSlF1ZXJ5UHJvbWlzZTxJc2wuR1NlcnZpY2VMaXN0UmVzcG9uc2U8VWN0LkludGVyZmFjZS5HVWN0U2V6bmFtWmFwaXN1U3RhdnVEdG8+PiB8IEpRdWVyeVByb21pc2U8bnVtYmVyPiBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmdldEZpbHRlcih0aGF0LiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJnZXRDdXJyZW50RGF0YVwiKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChuZXdGaWx0ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5hZGRGaWx0ZXJUb0hpc3RvcnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCAhPT0gdGhhdC5maWx0ZXJIaXN0b3J5Lmxlbmd0aCAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbHRlckhpc3Rvcnkuc3BsaWNlKHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCArIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maWx0ZXJIaXN0b3J5LnB1c2gobmV3RmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWRkRmlsdGVyVG9IaXN0b3J5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hc2thID0gbmV3RmlsdGVyLmZpbHRlcjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIG5ld0ZpbHRlci5maWx0ZXI/LmNmdSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrYSFbbmFtZV0gPSBuZXdGaWx0ZXIuZmlsdGVyPy5jZnVbbmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5hY3Rpb25zLm5leHRGaWx0ZXJBY3Q/LmVuYWJsZWQodGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4IDwgdGhhdC5maWx0ZXJIaXN0b3J5Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmFjdGlvbnMucHJldkZpbHRlckFjdD8uZW5hYmxlZCh0aGF0LmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXggPiAwKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiB0aGlzLmdldERhdGEobmV3RmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3UmVxdWVzdCA9ICQuZXh0ZW5kKHRydWUsIHt9LCByZXEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBycTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFN0YXZ5UmVxdWVzdER0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTWFza2E6IG5ld0ZpbHRlci5maWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBFbGVtZW50eTogbmV3RmlsdGVyLmVsZW1lbnR5XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBycS5NYXNrYSA9IG1hc2thO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1JlcXVlc3RbXCJmaWx0ZXJzXCJdID0gcnE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHQobmV3UmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3Jlbmkga2xhdmVzb3Z5Y2ggemtyYXRla1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGNyZWF0ZVNob3J0Q3V0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVTaG9ydEN1dCgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvLyomR1Nlem5hbVphcGlzdVN0YXZ1RHRvKi8+IHtcclxuICAgICAgICAgICAgdmFyIGdmID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvPigpO1xyXG4gICAgICAgICAgICAvL3ZhciB0b3BvR3JvdXAgPSBcInRvcG9cIjtcclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFN0cnVjdHVyZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRva2xhZHlcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDIzMVwiLCAvL1JDIDMxMTAwMjMxIDogRG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgIGdyb3VwaW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3ByZXNldENhcHRpb246IFwianJlczozMTEwMDIzMVwiLCAvL1JDIDMxMTAwMjMxIDogRG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cGluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzaDogKG1ldGEsIHJvd3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZCA9IG1ldGEuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7ZC5hY318JHtkLm1lc2ljfXwke2Qucm9rfXwke2QubGljfXwke2QuaWNvfXwke2QudWNzfWA7IC8vTk9URTogUHJpZGF0IGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcImFjXCIpLCB1IHZzZWNoIHRlY2h0byBzbG91cGN1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJyb2ssbGljLGljbyx1Y3MsbWVzaWMsYWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVDb2x1bW46IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nbG9iYWxzLlJlemltUHJvdm96dSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1Lk5LUzogYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuVUNTOlxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMubmtzKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LklDTzpcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwidWNzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5pY28sIGFrdFByb2hsOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmFrdFByb2hsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG9ubHlBY3RpdmU6IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3Mub25seUFjdGl2ZSwgY2FwdGlvbjogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5jYXB0aW9uLCBuYW1lOiBcInVjc1wiLCBmaXJzdEZpZWxkOiB1bmRlZmluZWQsIHNlY29uZEZpZWxkOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwidWNzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKSAmJiAhIXRoaXMuRmlsdGVyLnVjc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Bdm9pZFV1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLnV1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnV1c0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuaWNvLCB1Y3M6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMudWNzLCBha3RQcm9obDogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5ha3RQcm9obFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgb25seUFjdGl2ZTogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5vbmx5QWN0aXZlLCBjYXB0aW9uOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmNhcHRpb24sIG5hbWU6IFwidXVzXCIsIGZpcnN0RmllbGQ6IHVuZGVmaW5lZCwgc2Vjb25kRmllbGQ6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwidXVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiAhISh0aGlzLlJhZGVrX0RQSCkgJiYgISF0aGlzLkZpbHRlci51Y3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuQXZvaWROa3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMubmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5TT1I6XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5JY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5LkljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwiaWNvXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IHRoaXMuRXh0ZXJuaVN1bWFyaXphY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gR29yZGljLkVrby5GaWx0ZXJzLnJhckludGVydmFsKHsgbW9kZWw6IFwiaWNvXCIsIG9ubHlBY3RpdmU6IGZhbHNlLCBjYXB0aW9uOiB0aGlzLnprcmF0a3kuSWNvLCBkaXNhYmxlZDogISEodGhpcy5SYWRla19EUEgpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IEdvcmRpYy5Fa28uRmlsdGVycy5pY29JbnRlcnZhbCh7IG1vZGVsOiBcImljb1wiLCBvbmx5QWN0aXZlOiBmYWxzZSwgY2FwdGlvbjogdGhpcy56a3JhdGt5LkljbywgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5Bdm9pZEV4dCB8fCB0aGlzLmdsb2JhbHMuVHlwU3VtYXJpemFjZSAhPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cFN1bWFyaXphY2UuRXh0ZXJuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwidWNzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudWNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudWNzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5pY28sIGFrdFByb2hsOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmFrdFByb2hsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuY2FwdGlvbiwgbmFtZTogXCJ1Y3NcIiwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJ1Y3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKSAmJiAhIXRoaXMuRmlsdGVyLnVjc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuQXZvaWRVdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuVXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51dXNJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudXVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnV1c0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmljbywgdWNzOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLnVjcywgYWt0UHJvaGw6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuYWt0UHJvaGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuY2FwdGlvbiwgbmFtZTogXCJ1dXNcIiwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwidXVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkaXNhYmxlZDogISEodGhpcy5SYWRla19EUEgpICYmICEhdGhpcy5GaWx0ZXIudWNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkF2b2lkTmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLm5rc0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy5ua3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBkcmRTZXJ2ZXJGaWx0ZXIgPSBHb3JkaWMuRWtvLkZpbHRlcnMuZHJkKHRoaXMuZmlsdGVyT3B0aW9ucy5kcmQpO1xyXG5cclxuICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZHJkXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTIgXCIsIC8vUkMgMzExMDAwNTIgOiBIXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMTAyXCIsIC8vUkMgMzExMDAxMDIgOiBEcnVoIGRva2xhZHUgKERSRClcclxuICAgICAgICAgICAgICAgIC8vdG9vbHRpcFRlbXBsYXRlOiBcImpyZXM6MzExMDAxMDJcIiwgLy9SQyAzMTEwMDEwMiA6IERydWggZG9rbGFkdSAoRFJEKVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBkcmRTZXJ2ZXJGaWx0ZXIvL0dvcmRpYy5Fa28uRmlsdGVycy5kcmQodGhpcy5maWx0ZXJPcHRpb25zLmRyZClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm1lc2ljXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTEgXCIsIC8vUkMgMzExMDAwNTEgOiBNXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMDExXCIsIC8vUkMgMzExMDAwMTEgOiBNxJtzw61jXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJtZXNpY1wiKSxcclxuICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJtZXNpY1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTFcIiwgZGlzYWJsZWQ6ICEhKHRoaXMuRmlsdGVyICYmIHRoaXMuU3RyaWN0RmlsdGVyICYmIHRoaXMuRmlsdGVyLm1lc2ljKSB9KSAvL1JDIDMxMTAwMDUxIDogTVxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1lc2ljXCIsIGNhcHRpb246IFwianJlczozMTEwMDA1MVwiLCAvL1JDIDMxMTAwMDUxIDogTVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhISh0aGlzLkZpbHRlciAmJiB0aGlzLlN0cmljdEZpbHRlciAmJiB0aGlzLkZpbHRlci5tZXNpYyksXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RGaWVsZDogeyB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJhbmdlKHsgbWluOiAxLCBtYXg6IDEzIH0pXSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEZpZWxkOiB7IHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDEsIG1heDogMTMgfSldIH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBnZi5hZGRTb3J0ZWRFa29DZnVTZXQodGhpcy5nZXRDZnVTZXRTZXJ2ZXJGaWx0ZXJzKHRydWUpKTtcclxuXHJcbiAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1OVwiLCAvL1JDIDMxMTAwMDU5IDogTU8gTURcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNDVcIiwgLy9SQyAzMTEwMDI0NSA6IE3Em3PDrcSNbsOtIG9icmF0IE3DoSBEw6F0aVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwXCIsIGNhcHRpb246IFwianJlczozMTEwMDA1OVwiIH0pICAvL1JDIDMxMTAwMDU5IDogTU8gTURcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYzFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA2MFwiLCAvL1JDIDMxMTAwMDYwIDogTU8gRGFsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjQ2XCIsIC8vUkMgMzExMDAyNDYgOiBNxJtzw63EjW7DrSBvYnJhdCBEYWxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMVwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNjBcIiB9KSAgLy9SQyAzMTEwMDA2MCA6IE1PIERhbFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMGMxXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNjFcIiwgLy9SQyAzMTEwMDA2MSA6IE1PIE1EIC0gRGFsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjQ3XCIsIC8vUkMgMzExMDAyNDcgOiBSb3pkw61sIMSNw6FzdGVrIE3Em3PDrcSNbsOtIG9icmF0IE3DoSBEw6F0aSBtw61udXMgTcSbc8OtxI1uw60gb2JyYXQgRGFsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiAhdGhpcy5nbG9iYWxzLlJhZF9ab2JyYXpNZERhbCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwYzFcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDYxXCIgfSkgLy9SQyAzMTEwMDA2MSA6IE1PIE1EIC0gRGFsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImMwX2FzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNjJcIiwgLy9SQyAzMTEwMDA2MiA6IEFTIE1EXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjQ4XCIsIC8vUkMgMzExMDAyNDggOiBBa3R1w6FsbsOtIHN0YXYgTcOhIETDoXRpXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBfYXNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDYyXCIgfSkgLy9SQyAzMTEwMDA2MiA6IEFTIE1EXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImMxX2FzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNjNcIiwgLy9SQyAzMTEwMDA2MyA6IEFTIERhbFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI0OVwiLCAvL1JDIDMxMTAwMjQ5IDogQWt0dcOhbG7DrSBzdGF2IERhbFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMxX2FzXCIsIGNhcHRpb246IFwianJlczozMTEwMDA2M1wiIH0pIC8vUkMgMzExMDAwNjMgOiBBUyBEYWxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBjMV9hc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNjA1XCIsIC8vUkMgMzAyNTA2MDUgOiBBUyBNRCAtIERhbFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIGhpZGRlbjogIXRoaXMuZ2xvYmFscy5SYWRfWm9icmF6TWREYWwsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMGMxX2FzXCIsIGNhcHRpb246IFwianJlczozMTEwMDA3MFwiIH0pICAvL1JDIDMxMTAwMDcwIDogQVMgTUQgLSBEYWxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgZ2YuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDAxNVwiLCAvL1JDIDMxMTAwMDE1IDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTMwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGF0ZUludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IHZhbHVlVHlwZTogXCJkYXRldGltZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRmllbGQ6IHsgdmFsdWVUeXBlOiBcImRhdGV0aW1lXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwMTVcIiAvL1JDIDMxMTAwMDE1IDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8vLyB0ZXh0dSB6IHJvenZyaHVcclxuICAgICAgICAgICAgLy9pZiAodGhpcy5kaXNwbGF5VGV4dHlaUm96dnJodSgpKSB7XHJcbiAgICAgICAgICAgIC8vICAgIC8vIHpqaXN0ZW5pIHByZWRuYXN0YXZlbnljaCBzbG92IHJvenZyaHVcclxuICAgICAgICAgICAgLy8gICAgbGV0IHNsb3ZhUm96dnJodSA9IHRoaXMucGFyZW50Q250Lmdsb2JhbFNldHRpbmdzPy5nZXQoXCJHbG9iYWwuVWNyLkFwcFNldHRpbmdzLlVjdFNldHRpbmdzRm9ybS5zZWxlY3RlZFdvcmRzU2hvd0dyaWRDb2x1bW5zXCIpIGFzIEdTbG92YVJvenZyaEZpbHRlckR0b1tdO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgLy8gcHJldnpldGkgc2xvdXBjdSAgICBcclxuICAgICAgICAgICAgLy8gICAgc2xvdmFSb3p2cmh1LmZvckVhY2goZnVuY3Rpb24gKHNsb3VwZWMpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IHNsb3VwZWMuaG9kbm90YSEgKyBcIl90eHRcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA1OTRcIi5mb3JtYXQoc2xvdXBlYy5rbGljISksIC8vUkMgMzAyNTA1OTQgOiB7MH0gLSBwb3Bpc1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ1NpbmdsZSh7IG1vZGVsOiBzbG91cGVjLmhvZG5vdGEhLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwOTdcIiB9KSAvL1JDIDMxMTAwMDk3IDogWm3Em251IHByb3ZlZGxcclxuICAgICAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgLy99ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ2YgYXMgYW55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZVByb2ZpbGVzKGdmOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0by8qJkdTZXpuYW1aYXBpc3VTdGF2dUR0byovPik6IElHU2V6bmFtWmFwaXN1UHJvZmlsZXMge1xyXG4gICAgICAgICAgICBsZXQgcHJvZmlsZXM6IElHU2V6bmFtWmFwaXN1UHJvZmlsZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7IG5hbWU6IFwianJlczozMTEwMDIzMlwiLCBjb2x1bW5zOiB7fSB9IC8vUkMgMzExMDAyMzIgOiBWw71jaG96w61cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2YuY29sdW1ucy5maWx0ZXIoKGMpID0+IHsgcmV0dXJuICFjLmhpZGRlbjsgfSlcclxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChjKSA9PiB7IHByb2ZpbGVzLmRlZmF1bHQuY29sdW1ucyFbYy5uYW1lIV0gPSB7IGhpZGRlbjogZmFsc2UgfSB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlphcGlzb3ZhKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9maWxlcy5kZWZhdWx0Lm5hbWUgPSBcImpyZXM6MzExMDAyNDFcIjsgLy9SQyAzMTEwMDI0MSA6IFrDoXBpc3kgKHbDvWNob3rDrSlcclxuICAgICAgICAgICAgICAgIHByb2ZpbGVzLmRva2xhZHkgPSB7IG5hbWU6IFwianJlczozMTEwMDIzMVwiLCBjb2x1bW5zOiB7fSwgZ3JvdXBpbmc6IFwiZG9rbGFkeVwiIH07IC8vUkMgMzExMDAyMzEgOiBEb2tsYWR5XHJcbiAgICAgICAgICAgICAgICBwcm9maWxlcy5kb2tsYWR5LmNvbHVtbnMgPSAkLmV4dGVuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9rbGFkeTogeyBoaWRkZW46IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGRvazogeyBoaWRkZW46IGZhbHNlIH1cclxuICAgICAgICAgICAgICAgIH0sIHByb2ZpbGVzLmRlZmF1bHQuY29sdW1ucyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9maWxlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGRldGFpbEFjdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGV0YWlsQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjY2XCIsIC8vUkMgMzExMDAyNjYgOiBab2JyYXppdCBkZXRhaWxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93RGV0YWlsKCk7IH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB6YXBpc3lBY3Q6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInphcGlzeUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDEyNFwiLCAvL1JDIDMxMTAwMTI0IDogWsOhcGlzeVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93WmFwaXN5KCk7IH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBwcmltZG9rbGFkQWN0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwcmltZG9rbGFkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1leHRlcm5hbC1saW5rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTU0XCIsIC8vUkMgMzAyNTAxNTQgOiBQcmltLiBkb2tsYWRcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuc2hvd1ByaW1Eb2tsYWQoKTsgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZmlsdGVyUGlkQWN0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmaWx0ZXJQaWRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNlbCA9IGdyaWQuZ2dyaWQ8VWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjbGVhclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkc2VydmVyZmlsdGVyKFwiYXBwbHlcIiwgeyBpeHA6IHNlbFswXS5peHAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9GaWx0ZXJDbGljaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVmaW5pY2UgbWVudSBiYXJ1XHJcbiAgICAgICAgICogQHBhcmFtIHR5cFVsb2h5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIERlZmluZU1lbnVCYXIodHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUpOiBNZW51UGFyYW1zW10ge1xyXG4gICAgICAgICAgICByZXR1cm4gc3VwZXIuRGVmaW5lTWVudUJhcih0eXBVbG9oeSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2xldCBtZW51ID0gbmV3IEFycmF5PE1lbnVQYXJhbXM+KCk7XHJcblxyXG4gICAgICAgICAgICAvL21lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5kZXRhaWxBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAvL21lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5wcmV2RmlsdGVyQWN0LCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9KTtcclxuICAgICAgICAgICAgLy9tZW51LnB1c2goeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMubmV4dEZpbHRlckFjdCwgZmF2b3JpdGU6IHRydWUsIGFsaWduOiBcIm9wcG9zaXRlXCIgfSk7XHJcbiAgICAgICAgICAgIC8vaWYgKHRoaXMucHJpbnRBY3QpXHJcbiAgICAgICAgICAgIC8vICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wcmludEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcblxyXG4gICAgICAgICAgICAvLy8vIGFrY2kgcHJvIG5hY2l0YW5pIGJleiBQQVAgcmFka3VcclxuICAgICAgICAgICAgLy9pZiAodGhpcy5zaG93UGFwQWN0aW9uKCkpIFxyXG4gICAgICAgICAgICAvLyAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYmV6UGFwQWN0LCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9KTtcclxuICAgICAgICAgICAgLy9tZW51LnB1c2goeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuemFwaXN5QWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLy8vbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnByaW1kb2tsYWRBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8vLyB0ZXh0dSB6IHJvenZyaHVcclxuICAgICAgICAgICAgLy9pZiAodHlwZW9mIHRoaXMucGFyZW50Q250LmFjdGlvbnMudGV4dFJvenZyaEFjdCAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgLy8gICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnRleHRSb3p2cmhBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9tZW51LnB1c2goeyBhY3Rpb246IHRoaXMuY2xlYXJGaWx0ZXJSb3dBY3QgfSk7XHJcbiAgICAgICAgICAgIC8vbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgLy8gICAgdHlwZTogXCJzdGF0aWNcIixcclxuICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjY4XCIsIC8vUkMgMzExMDAyNjggOiBSeWNobMOpIGFrY2VcclxuICAgICAgICAgICAgLy8gICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgLy8gICAgICAgIHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmluc0FjdCwgaWNvbjogXCJnaS1yZWZyZXNoXCIsIGNhcHRpb246IFwianJlczozMTEwMDIyNlwiIH0sIC8vUkMgMzExMDAyMjYgOiBOYcSNdGVuw60gZGF0XHJcbiAgICAgICAgICAgIC8vICAgICAgICB7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5jbGVhckFuZEZpbHRlckFjdCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjI4XCIgfSwgLy9SQyAzMTEwMDIyOCA6IFZ5xI1pc3RpdCBhIG5hxI3DrXN0XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL05PVEU6IFR5dG8gZHZlIGFrY2UgYnVkb3UgdnpkeSBmdW5nb3ZhdCBwb3V6ZSB6IGtsYXZlc25pY2VcclxuICAgICAgICAgICAgLy8gICAgICAgIC8veyBhY3Rpb246IHRoaXMuc2VsRmlsdGVyQWN0LCBjYXB0aW9uOiBcImpyZXM6MzExMDAyMjlcIiB9LCAvL1JDIDMxMTAwMjI5IDogUMWZZW5lc2Vuw60gaG9kbm90eSBkbyBmaWx0cnUuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL3sgYWN0aW9uOiB0aGlzLnNlbEZpbHRlckFuZFNlYXJjaEFjdCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjM1XCIgfSwgLy9SQyAzMTEwMDIzNSA6IFDFmWVuZXNlbsOtIGhvZG5vdHkgZG8gZmlsdHJ1IGEgdnlobGVkw6Fuw60uXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL3sgYWN0aW9uOiB0aGlzLmRvdEFjdCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjI3XCIgfSwgLy9SQyAzMTEwMDIyNyA6IFpvYnJhemVuw60gdsWhZWNoIHrDoXBpc8WvIGRva2xhZMWvIChjZWzDvSBkb2tsYWQpIG5hZCBvem5hxI1lbsO9bSB6w6FwaXNlbS5cclxuXHJcbiAgICAgICAgICAgIC8vICAgIF1cclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIC8vcmV0dXJuIG1lbnU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlRmlsdGVyUGFuZWwoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlRmlsdGVyUGFuZWwodGhpcyk7XHJcbiAgICAgICAgICAgIC8vbGV0IGNmdVNldCA9IHRoaXMuZ2V0Q2Z1U2V0U2VydmVyRmlsdGVycyhmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vdmFyIGdmID0gR29yZGljLlVjci5XZWJDbGllbnQuR0VsZW1lbnRVdGlscy5jcmVhdGVFbGVtZW50c0dyaWRGb3JtYXQoe1xyXG4gICAgICAgICAgICAvLyAgICBla29QYXJhbXM6IHRoaXMucGFyZW50Q250LmVrb1BhcmFtcyxcclxuICAgICAgICAgICAgLy8gICAgZ2xvYmFsczogdGhpcy5nbG9iYWxzLFxyXG4gICAgICAgICAgICAvLyAgICB0eXBTZXN0YXZ5OiB0aGlzLnR5cFNlc3RhdnksXHJcbiAgICAgICAgICAgIC8vICAgIGNmdVNldDogY2Z1U2V0LFxyXG4gICAgICAgICAgICAvLyAgICBmaWx0ZXJPcHRpb25zOiB0aGlzLmZpbHRlck9wdGlvbnMsXHJcbiAgICAgICAgICAgIC8vICAgIGZpbHRlclBhcmFtczogdGhpcy5wYXJlbnRDbnQuZmlsdGVyUGFyYW1zXHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBlbG1Sb3dPcHRzID0geyBsYWJlbDogXCJFbGVtZW50eVwiIH07XHJcbiAgICAgICAgICAgIC8vZWxtUm93T3B0c1tcImZhdm9yaXRlUm93TGF5b3V0RGVzY3JpcHRvclwiXSA9IFwidy1MLTkgdy1NLTggdy1TLTEyXCI7XHJcbiAgICAgICAgICAgIC8vLy9sZXQgZnBGb3JtOiBHb3JkaWMuRm9ybXMuRm9ybTtcclxuICAgICAgICAgICAgLy9sZXQgZnBGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwianJlczozMDI1MDA1MlwiIH0pIC8vUkMgMzAyNTAwNTIgOiBGaWx0clxyXG4gICAgICAgICAgICAvLyAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRSb3coZWxtUm93T3B0cylcclxuICAgICAgICAgICAgLy8gICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuRWtvLlByZWZhYnMuY2Z1RWxlbWVudHMoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJlbGVtZW50eVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy9uYW1lOiBcImZpbHRlcnNcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGlkOiB0aGlzLnBhcmVudENudC50YXNrSWQgPyB0aGlzLnBhcmVudENudC50YXNrSWQgKyBcIl9lbGVtZW50eUZpZWxkI1wiIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgbW9kZWxWYWx1ZVRyYW5zZm9ybToge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vYXBwbHk6IChtb2RlbFZhbHVlKSA9PiB7IHJldHVybiBtb2RlbFZhbHVlOyB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGFwcGx5OiAobW9kZWxWYWx1ZSkgPT4geyByZXR1cm4gbW9kZWxWYWx1ZS5maWx0ZXJzOyB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vY29sbGVjdDogKGZpZWxkVmFsdWUpID0+IHsgcmV0dXJuIGZpZWxkVmFsdWU7IH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjb2xsZWN0OiAoZmllbGRWYWx1ZSkgPT4geyByZXR1cm4geyBmaWx0ZXJzOiBmaWVsZFZhbHVlIH07IH1cclxuICAgICAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7IHRoYXQucGFyZW50Q250LmxvZy50cmFjZShcImVsZW1lbnR5XCIsICQodGhpcykuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikpOyB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZ3JpZEZvcm1hdDogZ2YsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjYW5BZGROZXdSZWNvcmRzOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY2FuUmVtb3ZlUmVjb3JkczogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGNyZWF0ZU5ld1JlY29yZDogR0VsZW1lbnRVdGlscy5jcmVhdGVOZXdFbGVtZW50RnVuYyh0aGlzLmdsb2JhbHMuUmV6aW1Qcm92b3p1ISwgdGhpcy5wYXJlbnRDbnQuZWtvUGFyYW1zKSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGNsZWFyUmVjb3JkOiBHRWxlbWVudFV0aWxzLmNyZWF0ZUNsZWFyRWxlbWVudEZ1bmModGhpcy5nbG9iYWxzLlJlemltUHJvdm96dSEpLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZm9ybWF0RWxlbWVudFZhbHVlT3B0aW9uczogeyBza2lwOiBHRWxlbWVudFV0aWxzLmdldEVsZW1lbnRWYWx1ZVNraXBDb2x1bW5zKHRoaXMuZ2xvYmFscy5SZXppbVByb3ZvenUhKSwgbmFtZUNvbHVtbjogXCJuYXpldlwiIH0sXHJcbiAgICAgICAgICAgIC8vICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy4kZmlsdGVyUGFuZWwgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgIC8vICAgIC5hcHBlbmRUbyh0aGlzLnBhcmVudENudC5lbGVtZW50KVxyXG4gICAgICAgICAgICAvLyAgICAuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGZvcm1zOiBbZnBGb3JtXSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGZhdm9yaXRlczogW1wibWRcIl0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBmYXZvcml0ZUxheW91dERlc2NyaXB0b3I6IFwiTDVNM1MxIEwtMTItMTItMCBNLTEyLTEyLTAgUy0xMi0xMi0wXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBzZWFyY2hCdXR0b25Pbk1haW5Sb3c6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBzYXZlT3B0aW9uc0Zvcm06IEdVY3JNYXNrYURldGFpbC5nZXRGb3JtKGdmIGFzIGFueSksIC8vVE9ETzogRGF0IHNwcmF2bnkgdHlwIGdyaWRmb3JtYXR1IVxyXG4gICAgICAgICAgICAvLyAgICAgICAgZmlsdGVyU3RvcmFnZVNlcnZpY2U6IG5ldyBHVWNyTWFza2FTZXJ2aWNlKHsgdHlwU2VzdGF2eTogdGhpcy50eXBTZXN0YXZ5LCBwYXJlbnRDb250ZW50OiB0aGF0LnBhcmVudENudCxmcmFnbWVudHM6XCIqLGVsZW1lbnR5XCIgfSksXHJcbiAgICAgICAgICAgIC8vICAgICAgICBhdXRvTG9hZEFmdGVyQ2hvc2VGaWx0ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy9hcHBseTogKGV2LCBkYXRhKSA9PiB7IHRoaXMubG9hZERhdGFPbGQoZGF0YS5maWx0ZXIpOyB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgcmVzZXQ6IChldiwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnN0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBwcmltYXJ5QnV0dG9uQmVoYXZpb3VyOiBcIkFsd2F5c1ByaW1hcnlcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGNsZWFyRmlsdGVyQnV0dG9uVmlzaWJsZTogXCJBbHdheXNWaXNpYmxlXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBwb1Z5aGxlZGFuaVpvYnJheml0OiBcIk9ibGliZW5lUG9kbWlua3lcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5EZXRhaWwsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBmaWx0ZXJWaWV3TW9kZVVzZXJTZXR0aW5nczogW0ZpbHRlclZpZXdNb2RlLkRldGFpbCwgRmlsdGVyVmlld01vZGUuTm9ybWFsLCBGaWx0ZXJWaWV3TW9kZS5TaW1wbGVdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgcG9WeWhsZWRhbmlab2JyYXppdFVzZXJTZXR0aW5nczogXCJEZW55XCIgLy9OT1RFOiBaYWthenVqZSBwcmVwaW5hbmkgcG8gdnlobGVkYW5pIC0gcG9rdWQgc2UgbmVrZG8gcG9rb3VzZWwgdnltYXphdCBmaWx0ciB2IHRvbXRvIHJlemltdSwgdGFrIG11c2VsIGtsaWtub3V0IG5hIHZ5aGxlZGF0LCB2aXogVDM5ODdcclxuXHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNob3daYXBpc3koKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aXRsZSA9IFwianJlczozMTEwMDIyNFwiOyAvL1JDIDMxMTAwMjI0IDogWsOhcGlzeSBzdGF2dVxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RmlsdGVyKClcclxuICAgICAgICAgICAgICAgIC50aGVuKChmKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbCA9IGdyaWQuZ2dyaWQ8VWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8+KFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCAhPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gc2VsWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0eXBVbG9oeTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWQ6IHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyOiBHRWtvRmlsdGVyRHRvO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vTk9URTogT2Rwb3ZpZGEgeiBUSyBVQ1I6IEdTZXpuYW1aYXBpc3VWUmFka3VUYWIuTG9hZEdyaWREYXRhKClcclxuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB7IHN0YXJ0OiByb3cuaWNvISwgZW5kOiByb3cuaWNvISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiB7IHN0YXJ0OiByb3cudWNzISwgZW5kOiByb3cudWNzISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVzOiB7IHN0YXJ0OiByb3cudXVzISwgZW5kOiByb3cudXVzISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmtzOiB7IHN0YXJ0OiByb3cubmtzISwgZW5kOiByb3cubmtzISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzaWM6IHsgc3RhcnQ6IDAsIGVuZDogcm93Lm1lc2ljIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmRfbXNrOiByb3cuZHJkIS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Z1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVhOiB7IHN0YXJ0OiByb3cudWVhISwgZW5kOiByb3cudWVhISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlYjogeyBzdGFydDogcm93LnVlYiEsIGVuZDogcm93LnVlYiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWM6IHsgc3RhcnQ6IHJvdy51ZWMhLCBlbmQ6IHJvdy51ZWMhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVkOiB7IHN0YXJ0OiByb3cudWVkISwgZW5kOiByb3cudWVkISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZTogeyBzdGFydDogcm93LnVlZSEsIGVuZDogcm93LnVlZSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWY6IHsgc3RhcnQ6IHJvdy51ZWYhLCBlbmQ6IHJvdy51ZWYhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVnOiB7IHN0YXJ0OiByb3cudWVnISwgZW5kOiByb3cudWVnISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlaDogeyBzdGFydDogcm93LnVlaCEsIGVuZDogcm93LnVlaCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWk6IHsgc3RhcnQ6IHJvdy51ZWkhLCBlbmQ6IHJvdy51ZWkhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVqOiB7IHN0YXJ0OiByb3cudWVqISwgZW5kOiByb3cudWVqISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlazogeyBzdGFydDogcm93LnVlayEsIGVuZDogcm93LnVlayEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWw6IHsgc3RhcnQ6IHJvdy51ZWwhLCBlbmQ6IHJvdy51ZWwhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVtOiB7IHN0YXJ0OiByb3cudWVtISwgZW5kOiByb3cudWVtISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlbjogeyBzdGFydDogcm93LnVlbiEsIGVuZDogcm93LnVlbiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTA6IHsgc3RhcnQ6IHJvdy50ZTAhLCBlbmQ6IHJvdy50ZTAhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGUxOiB7IHN0YXJ0OiByb3cudGUxISwgZW5kOiByb3cudGUxISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlMjogeyBzdGFydDogcm93LnRlMiEsIGVuZDogcm93LnRlMiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTM6IHsgc3RhcnQ6IHJvdy50ZTMhLCBlbmQ6IHJvdy50ZTMhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU0OiB7IHN0YXJ0OiByb3cudGU0ISwgZW5kOiByb3cudGU0ISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlNTogeyBzdGFydDogcm93LnRlNSEsIGVuZDogcm93LnRlNSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTY6IHsgc3RhcnQ6IHJvdy50ZTYhLCBlbmQ6IHJvdy50ZTYhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU3OiB7IHN0YXJ0OiByb3cudGU3ISwgZW5kOiByb3cudGU3ISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlODogeyBzdGFydDogcm93LnRlOCEsIGVuZDogcm93LnRlOCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTk6IHsgc3RhcnQ6IHJvdy50ZTkhLCBlbmQ6IHJvdy50ZTkhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wYXJlbnRDbnQuVHlwVWxvaHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlTdGF2OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwVWxvaHkgPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gXCJ1Y3RaYXBpc3kjXCI7IC8vTk9URTogTXVzaSBieXQgc3Rlam5lIG5pIG5hIE1haW5BcHAuY3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRTdGF2OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwVWxvaHkgPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlJvenBvY2V0WmFwaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZCA9IFwicm96WmFwaXN5I1wiOyAvL05PVEU6IE11c2kgYnl0IHN0ZWpuZSBuaSBuYSBNYWluQXBwLmNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG86XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBVbG9oeSA9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250b1phcGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBcInNlem5hbVNhbGRva29udG8jXCI7IC8vTk9URTogTXVzaSBieXQgc3Rlam5lIG5pIG5hIE1haW5BcHAuY3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdFcnJvcihcIk5vdFN1cHBvcnRlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Q250Lm5hdmlnYXRlKCdHb3JkaWMuVWNyLldlYkNsaWVudC5HU2V6bmFtRWtvWmF6bmFtdScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUeXBVbG9oeTogdHlwVWxvaHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEZpbHRlcjogZmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdXJyZW50Um93OnJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU3RyaWN0RmlsdGVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBGaWx0ZXJTdHJQb3BpczogZi5maWx0ZXJTdHJQb3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXV0b0xvYWREYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBnZXRaYXBpc0ZpbHRlcigpOiBHRWtvRmlsdGVyRHRvIHtcclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4ge307XHJcblxyXG4gICAgICAgICAgICB2YXIgc2VsID0gZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiLCBmYWxzZSlbMF0gYXMgVWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG87XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudENudC5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB1Y3M6IHsgc3RhcnQ6IHNlbC51Y3MsIGVuZDogc2VsLnVjcyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc2ljOiB7IHN0YXJ0OiBzZWwubWVzaWMsIGVuZDogc2VsLm1lc2ljIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWM6IHsgc3RhcnQ6IHNlbC5hYywgZW5kOiBzZWwuYWMgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB1Y3M6IHsgc3RhcnQ6IHNlbC51Y3MsIGVuZDogc2VsLnVjcyB9LFxyXG4gICAgICAgICAgICAgICAgZHJkX21zazogc2VsIS5kcmQhLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBtZXNpYzogeyBzdGFydDogc2VsLm1lc2ljLCBlbmQ6IHNlbC5tZXNpYyB9LFxyXG4gICAgICAgICAgICAgICAgYWM6IHsgc3RhcnQ6IHNlbC5hYywgZW5kOiBzZWwuYWMgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXphdmlyYW5pIG9rbmFcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjbG9zaW5nKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL2ludGVyZmFjZSBJR1Nlem5hbVphcGlzdVN0YXZ1UmVzdWx0RHRvIHtcclxuICAgIC8vICAgIFNlem5hbVphcGlzdTogR1Nlem5hbVphcGlzdVN0YXZ1RHRvW107XHJcbiAgICAvLyAgICBTdW15OiBHU2V6bmFtWmFwaXN1U3RhdnVEdG9cclxuICAgIC8vfVxyXG5cclxuXHJcblxyXG4gXHJcbn0iXX0=