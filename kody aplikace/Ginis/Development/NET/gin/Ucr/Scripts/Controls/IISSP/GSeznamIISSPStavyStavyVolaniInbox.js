"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            /**
             * IISSP stavy - Stavy skutecnosti
             *
             * @author tkares
             * @since 484.1.0.69
             */
            class GSeznamIISSPStavyStavyVolaniInbox extends WebClient.GSeznamIISSPBase {
                constructor() {
                    super(...arguments);
                    this._nestazene = false;
                    this._nesouhlasne = false;
                }
                onContentReady() {
                    super.onContentReady();
                    let that = this;
                    that.FinMisto = this.parentCnt["FinMisto"];
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    if (this.FinMisto.trim() !== "")
                        grid.ggridserverfilter("apply", { isp_fim: { start: that.FinMisto, end: that.FinMisto } });
                }
                /**
                 * Vytvoreni akci
                 *
                 * */
                createActions() {
                    let that = this;
                    that.parentCnt.actions.addRange({
                        actOdeslat: {
                            name: "actOdeslat",
                            //icon: "gi-list",
                            enabled: false,
                            caption: "jres:30250469", //RC 30250469 : Dotaz IISSP
                            run: (ev, ctx) => {
                                that.dotazIISSP();
                            }
                        },
                        acPohyby: {
                            name: "acPohyby",
                            //icon: "gi-list",
                            enabled: false,
                            caption: "jres:30250499", //RC 30250499 : Pohyby
                            run: (ev, ctx) => {
                                that.pohyby();
                            }
                        },
                    });
                }
                /**
                 * Odeslat vykaz
                 *
                 *
                 * */
                dotazIISSP() {
                    let that = this;
                    that.parentCnt.beginOperation("jres:30250445"); //RC 30250445 : Připravuje se odeslání
                }
                /**
                 * Odeslat vykaz
                 *
                 *
                 * */
                pohyby() {
                    let that = this;
                    //that.parentCnt.beginOperation("jres:30250445"); //RC 30250445 : Připravuje se odeslání
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                nastaveniAkci() {
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    // pokud neni grid, nic nedelej
                    if (this.parentCnt.closed)
                        return;
                    let view = grid.ggrid("getView");
                    let rows = grid.ggrid("getSelection");
                    let pocet = view.getCount();
                    let row = {};
                    if (pocet > 0)
                        row = rows[0];
                    // odeslat
                    this.parentCnt.actions.actOdeslat?.update({
                        enabled: pocet > 0 && Ucr.Globals.GUcrGlobals.Rad_RisStrc === 2 /* Gordic.Uct.Interface.GUcrZobrazeniVdu.AnoEditace */,
                    });
                    // pohyby
                    this.parentCnt.actions.acPohyby?.update({
                        enabled: pocet > 0 && row.priz_detail > 0,
                    });
                }
                /**
                 * Definice menubaru
                 * */
                DefineMenuBar() {
                    let menuPar = [
                        { action: this.parentCnt.actions.actOdeslat, favorite: true },
                        { action: this.parentCnt.actions.acPohyby, favorite: true },
                    ];
                    return menuPar;
                }
                /**
                 *  Vytvoreni gridu
                 *
                 * */
                createGrid() {
                    let that = this;
                    let provider = new Gordic.Data.Provider(() => {
                        that.loadingData = true;
                        return that.loadData();
                    });
                    let view = new Gordic.Data.View([], {
                        processors: { provider: provider },
                        key: "ixs_vkz,por_cislo"
                    });
                    var sloupce = that.createGridFormat();
                    //var defaultProfile = sloupce.columns;//sloupce.columns.filter((item) => item.name?.toLowerCase().indexOf("vlastnost") === -1)
                    const grid = $.newDiv(this.classGrid)
                        .appendTo(this.parentCnt.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        data: view,
                        columns: sloupce,
                        defaultProfile: { name: "default", columnList: sloupce.columns.map((c) => c.name).join(",") },
                        profiles: [
                            { name: "userProfile", columnList: sloupce.columns.map((c) => c.name).join(",") },
                        ],
                        profileVisible: false,
                        selection: function (ev, info) {
                            that.nastaveniAkci();
                        },
                    });
                }
                /**
                * function createFilterZalozka
                *
                * Obecna zalozka
                * @param {GContent} content
                * @returns {any}
                */
                createFilterZalozka() {
                    let that = this;
                    let datMax = new Date(that.Globals.EkoParams?.Rok + "-12-31");
                    let datMin = new Date(that.Globals.EkoParams?.Rok + "-1-1");
                    let currDat = datMax;
                    if (that.Globals.EkoParams?.Rok == new Date().getFullYear())
                        currDat = new Date();
                    var filterFormDef = new Gordic.Forms.Form({ opened: true, layoutDescriptor: "L4M3S12, L-12-12-0, M-12-11-1, S-12-11-1", tabLabel: "jres:30250052" }); //RC 30250052 : Filtr
                    filterFormDef.addSection()
                        .addRow({ label: "jres:30250497" }) //RC 30250497 : Od - Do
                        .addField("gintervalbox", {
                        //format: (Gordic.Templates.Formatters as any).date(),
                        name: "datumK",
                        minValue: datMin,
                        maxValue: datMax,
                        //initialValue: datMax,
                        initialValue: { start: datMin, end: currDat },
                        buttons: [
                            {
                                action: new GAction({
                                    name: "next",
                                    icon: "fa-arrow-right",
                                    tooltip: "jres:30250493", //RC 30250493 : Posune celý interval do budoucnosti                                
                                    run: (ev, ctx) => {
                                        let obj = $(ev.target).closest(".gfield");
                                        let value = obj.gfield("getValue");
                                        if (value === null)
                                            return;
                                        value.start.setDate(value.start.getDate() + 1);
                                        value.end.setDate(value.end.getDate() + 1);
                                        obj.gfield("setValue", value);
                                    }
                                })
                            },
                            {
                                action: new GAction({
                                    name: "nastav",
                                    icon: "fa-expand",
                                    tooltip: "jres:30250495", //RC 30250495 : Nastaví interval ode dnešního dne na doporučenou délku
                                    run: (ev, ctx) => {
                                        let obj = $(ev.target).closest(".gfield");
                                        //let value = obj.gfield("getValue");
                                        //if (value === null) return;
                                        let now = new Date();
                                        now.setDate(now.getDate() - 30);
                                        let value = { start: now, end: new Date() };
                                        //(value.start as Date).setDate(new Date().getDate());
                                        //(value.end as Date).setDate(new Date().getDate() - 30);
                                        obj.gfield("setValue", value);
                                    }
                                })
                            },
                            {
                                action: new GAction({
                                    name: "preview",
                                    icon: "fa-arrow-left",
                                    tooltip: "jres:30250494", //RC 30250494 : Posune celý interval do minulosti
                                    run: (ev, ctx) => {
                                        let obj = $(ev.target).closest(".gfield");
                                        let value = obj.gfield("getValue");
                                        if (value === null)
                                            return;
                                        value.start.setDate(value.start.getDate() - 1);
                                        value.end.setDate(value.end.getDate() - 1);
                                        obj.gfield("setValue", value);
                                    }
                                })
                            }
                        ],
                        //model: "model.datumK=value",
                        change: (ev, ctx) => {
                        },
                        //valueType: "date"
                    });
                    filterFormDef.addSection()
                        .addRow({ label: "jres:30250496" }) //RC 30250496 : Volby
                        .addField("gselectbox", {
                        name: "volby", list: true, itemWidth: "",
                        dropdown: false,
                        multi: true,
                        model: "model.volby=value.hodnota",
                        itemTemplate: "{text}",
                        data: new Gordic.Data.View([{ text: "jres:30250470", hodnota: 1 } //RC 30250470 : Nestažené
                            ,
                            { text: "jres:30250471", hodnota: 2 }] //RC 30250471 : Nesouhlasné stavy
                        , { key: "hodnota" })
                        //, initialValue: initialValue
                        ,
                        emptyValue: null,
                        change: function (ev, obj) {
                            //                    if (that.loading || (obj.flags && obj.flags.filterClear === true)) return;
                            //if (that.loading) return;
                            if (obj && typeof obj.value !== "undefined") {
                                //that.setFilter();
                                //// nastaveni akci
                                //let view = that.$grid.ggrid("getView");
                                //that.setActions(view.getDataRows().length);
                            }
                        }
                    });
                    //    .addRow({ label: "jres:30250470" }) //RC 30250470 : Nestažené
                    //    .addField("gcheck", {
                    //        name: "nestazene",
                    //        labelFromRow: "always",
                    //        initialValue: false,
                    //        //model: "model.agregace=value.agregace",
                    //        change: (ev, ctx) => {
                    //            if (typeof that.$grid === "undefined" || typeof ctx === "undefined" || typeof ctx.value === "undefined")
                    //                return;
                    //            // nastaveni atributu nestazene
                    //            that._nestazene = ctx.value as boolean;
                    //        },
                    //    }
                    //);
                    //filterFormDef.addSection()
                    //    .addRow({ label: "jres:30250471" }) //RC 30250471 : Nesouhlasné stavy
                    //    .addField("gcheck", {
                    //        name: "nesouhlasne",
                    //        initialValue: false,
                    //        labelFromRow: "always",
                    //        //labelFromRow: true, 
                    //        //model: "model.agregace=value.agregace",
                    //        change: (ev, ctx) => {
                    //            if (typeof that.$grid === "undefined" || typeof ctx === "undefined" || typeof ctx.value === "undefined")
                    //                return;
                    //            // nastaveni atributu nesouhlasne
                    //            that._nesouhlasne = ctx.value as boolean;
                    //        },
                    //    }
                    //    );
                    return filterFormDef;
                }
                ///**
                // * Znovunacteni dat
                // * 
                // * */
                //private reload(): void {
                //    let that = this;
                //    var view = that.$grid.ggrid("getView");
                //    view.requestData();
                //    view.getLoadingPromise().always(() => {
                //        that.loadingData = false;
                //        that.nastaveniAkci();
                //    });
                //}
                /**
                 * Vytvoreni filtrovaciho panelu
                 * @param that
                 */
                createFilterPanel(that) {
                    this.$filterPanel = $.newDiv("js-filtr")
                        .appendTo(this.parentCnt.element)
                        .gfilterpanel({
                        helperCustomizer: function (data) {
                            debugger;
                            var polSort = data.sort(function (a, b) { return a.name <= b.name; });
                            return polSort;
                        },
                        forms: [that.createFilterZalozka()],
                        favoriteLayoutDescriptor: "L4M3S1 L12-12-0 M-12-12-0 S-12-12-0",
                        //favoriteLayoutDescriptor:"L1M1S1 L12-12-0 M-12-12-0 S-12-12-0",
                        filterStorageService: new Gordic.Gin.FilterStorageService.Store(),
                        filterViewModeUserSettings: [FilterViewMode.Detail /*, FilterViewMode.Normal*/],
                        //simpleModeAutoLoadAfterCreatePanel: false,
                        //userDefaultFilter: true,
                        // 01.03.2021 - TFeik
                        // Nahrazení obsolete parametrů.
                        filterViewMode: FilterViewMode.Simple,
                        //simpleMode: true,
                        primaryButtonBehaviour: "AlwaysPrimary",
                        //favoriteLayoutDescriptor: "L4M3S1",
                        clearFilterButtonVisible: "AlwaysVisible",
                        //autoLoadAfterChoseFilter: true,
                        autoLoadAfterCreatePanel: false,
                        //autoLoadAfterClearFilter: true,
                        //filterHelperItemTemplate: "<b>{nazev}</b>",
                        //textItemTemplate: "{nazev}",
                        apply: function (event, obj) {
                            console.log("filterForm.apply", obj);
                            that.parentCnt.log.trace("filterForm.apply", obj);
                            if (that.loadingData)
                                return;
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            var view = grid.ggrid("getView");
                            view.requestData(obj.filter);
                            view.getLoadingPromise().always(() => {
                                that.loadingData = false;
                                that.nastaveniAkci();
                            });
                        },
                        reset: (ev, data) => {
                            that.loadingData = true;
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            grid.ggridserverfilter("clear");
                            //this.$filterPanel.gfilterpanel("clear");
                            that.loadingData = false;
                        }
                    });
                }
                /**
                 * Vytvoreni gridformatu dle predlohy
                 *
                 *
                 */
                createGridFormat() {
                    let that = this;
                    var myGridFormat = new Gordic.Data.GridFormat();
                    myGridFormat.addTextColumn({
                        name: "id_hdr_ris",
                        caption: "jres:31100082", //RC 31100082 : ID IISSP
                        description: "jres:31100255", //RC 31100255 : Identifikátor rezervace rozpočtových prostředků IISSP
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "id_hdr_ris", caption: "jres:31100082", firstField: { maxLength: 9 }, secondField: { maxLength: 9 } }) //RC 31100082 : ID IISSP
                        //maxLength: 9
                    });
                    myGridFormat.addNumberColumn({
                        name: "radek_hdr",
                        caption: "jres:31100083", //RC 31100083 : řádek IISSP
                        description: "jres:31100256", //RC 31100256 : Řádek rezervace rozpočtových prostředků IISSP
                        width: 80,
                        serverFilter: Gordic.Eko.Filters.integerInterval({ model: "radek_hdr", caption: "jres:31100083", }) //RC 31100083 : řádek IISSP
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_fim",
                        caption: "jres:30250356", //RC 30250356 : FIM     
                        description: "jres:30250430", //RC 30250430 : Finanční místo
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_fim", disabled: true, caption: "jres:30250356", firstField: { maxLength: 7 }, secondField: { maxLength: 7, allowedChars: "0123456789" } }), //RC 30250356 : FIM
                        width: 75,
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_zdr",
                        caption: "jres:30250357", //RC 30250357 : ZDR
                        width: 70,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_zdr", caption: "jres:30250357", firstField: { maxLength: 7 }, secondField: { maxLength: 7 } }), //RC 30250357 : ZDR
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_par",
                        caption: "jres:30250358", //RC 30250358 : PAR
                        width: 60,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_par", caption: "jres:30250358", firstField: { maxLength: 6 }, secondField: { maxLength: 6 } }), //RC 30250358 : PAR
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_pol",
                        caption: "jres:30250359", //RC 30250359 : POL
                        width: 60,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_pol", caption: "jres:30250359", firstField: { maxLength: 4 }, secondField: { maxLength: 4 } }), //RC 30250359 : POL
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_eds",
                        caption: "jres:30250360", //RC 30250360 : EDS/SMVS
                        width: 100,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_eds", caption: "jres:30250360", firstField: { maxLength: 13 }, secondField: { maxLength: 13 } }), //RC 30250360 : EDS/SMVS
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_pvs",
                        caption: "jres:30250361", //RC 30250361 : PVS
                        width: 90,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_pvs", caption: "jres:30250361", firstField: { maxLength: 10 }, secondField: { maxLength: 10 } }), //RC 30250361 : PVS
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_ucl",
                        caption: "jres:30250362", //RC 30250362 : UCL
                        width: 90,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_ucl", caption: "jres:30250362", firstField: { maxLength: 9 }, secondField: { maxLength: 9 } }), //RC 30250362 : UCL
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_zj",
                        caption: "jres:30250474", //RC 30250474 : ZJ
                        width: 90,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_zj", caption: "jres:30250474", firstField: { maxLength: 3 }, secondField: { maxLength: 3 } }), //RC 30250474 : ZJ
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_uj",
                        caption: "jres:30250475", //RC 30250475 : UJ
                        width: 90,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_uj", caption: "jres:30250475", firstField: { maxLength: 6 }, secondField: { maxLength: 6 } }), //RC 30250475 : UJ
                    });
                    myGridFormat.addTextColumn({
                        name: "isp_uz",
                        caption: "jres:30250476", //RC 30250476 : UZ
                        width: 90,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "isp_uz", caption: "jres:30250476", firstField: { maxLength: 5 }, secondField: { maxLength: 5 } }), //RC 30250476 : UZ
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "kc01",
                        caption: "jres:30250477", //RC 30250477 : GINIS PRSK
                        width: 120,
                    });
                    myGridFormat.addIconColumn({
                        name: "c_psk_suma2",
                        caption: "jres:30250498", //RC 30250498 : GINIS IISSP PRSK
                        width: 39, // fixedWidth: true,
                        customClass: "center",
                        iconTemplate: function (data) {
                            if (!parseDecimal(data.c_psk_suma ?? 0).equals(parseDecimal(data.kc01 ?? 0))) {
                                return {
                                    icon: "fa-exclamation-triangle g-state-text g-state-warning", text: "jres:30250482" //RC 30250482 : Není provedeno přeúčtování skutečnosti v IISSP nebo nesouhlasí stavy
                                    //tooltip: "jres
                                };
                            }
                            return null;
                        }
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_psk_suma",
                        caption: "jres:30250478", //RC 30250478 : IISSP PRSK
                        width: 120,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_platba",
                        caption: "jres:30250479", //RC 30250479 : IISSP Příkaz k platbě
                        width: 120,
                        visible: false
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_bvypis",
                        caption: "jres:30250488", //RC 30250488 : IISSP Bank.výpis
                        width: 120,
                        visible: false
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_psk",
                        caption: "jres:30250489", //RC 30250489 : IISSP PSK
                        width: 120,
                        visible: false
                    });
                    myGridFormat.addDateColumn({
                        name: "dat_akt",
                        caption: "jres:30250490", //RC 30250490 : Datum sestavení
                        width: 110,
                    });
                    myGridFormat.addIconColumn({
                        name: "priz_detail",
                        caption: "jres:30250491", //RC 30250491 : Detail
                        width: 39, // fixedWidth: true,
                        customClass: "center",
                        description: "jres:30250491", //RC 30250491 : Detail
                        iconTemplate: function (data) {
                            if (data.priz_detail > 0) {
                                return {
                                    icon: "gi-detail", text: "jres:30250492", //RC 30250492 : Existuje detailní rozpad
                                    //tooltip: "jres:30250288"
                                };
                            }
                            return null;
                        }
                    });
                    return myGridFormat;
                }
                /**
                 * Zjisteni voleb na filtrpanelu
                 * */
                nactiVolby(volby) {
                    this._nestazene = false;
                    this._nestazene = false;
                    for (var i = 0; i < volby.length; i++) {
                        if (volby[i] == 1)
                            this._nestazene = true;
                        else
                            (volby[i] == 2);
                        this._nesouhlasne = true;
                    }
                }
                ///**
                // * Vrat muj sestaveny filtr
                // * 
                // * @returns
                // */
                //protected getMyFilter(filterServer: Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto, filter: any): { maska: {}, filter: { filters: {} } }|undefined {
                //    this.nactiVolby(filter.volby);
                //    if (filter.Mesic === null)
                //        filter.Mesic = -1;
                //    debugger;
                //    let denmesStart: number | null = null;
                //    if (typeof filter.datumK !== undefined && filter.datumK.start !== null) {
                //        denmesStart = 1 * filter.datumK.start.getDate() + (filter.datumK.start.getMonth() + 1) * 32
                //    }
                //    let denmesEnd: number | null = null;
                //    if (typeof filter.datumK !== undefined && filter.datumK.end !== null) {
                //        denmesEnd = 1 * filter.datumK.end.getDate() + (filter.datumK.end.getMonth() + 1) * 32
                //    }
                //    let nesouhlasne: any;
                //    if (this._nesouhlasne)
                //        nesouhlasne = { o: "=", v: true };
                //    let nestazene: any;
                //    if (this._nestazene)
                //        nestazene = { o: "=", v: true };
                //    if (denmesEnd === null || denmesStart === null) return;
                //    let myfiltr = {
                //        rok: { o: "=", v: this.Globals.EkoParams?.Rok }, ico: { o: "=", v: this.Globals.EkoParams?.ICO },
                //        denmes: { o: [">=", "<="], v: [denmesStart, denmesEnd] },
                //        //denmes: { o: ">=", v: denmesStart },
                //        //denmes: { o: "<=", v: denmesEnd },
                //        nesouhlasne, nestazene
                //    };
                //    return {
                //        maska: filterServer, filter: { filters: myfiltr } };
                //}
                ///**
                // * Nacteni Isl sluzby pro list
                // * @param param0
                // */
                //protected loadISLList(rq: { maska: {}, filter: { filters: {} } }): Isl._Task<{ maska: Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto, filter: Isl.GServiceListRequest }, Isl.GServiceListResponse<any>> {
                //    debugger;
                //    return Gordic.Isl.UcrRisreStavy.stavySkutecnosti(rq);
                //}
                /**
                 *  Nacteni dat
                 */
                loadData() {
                    var that = this;
                    var def = $.Deferred();
                    var maska = {};
                    var filter = that.getFilter().gfilterpanel('getCurrentData');
                    console.log("loaddata.filter", filter);
                    //let view = this.$grid.ggrid("getView");
                    let grid = that.getGrid();
                    if (grid == null)
                        return $.Deferred().reject().promise();
                    grid.ggridserverfilter("collect", maska)
                        .then((filterServer) => {
                        maska = filterServer;
                        that.nactiVolby(filter.volby);
                        if (filter.Mesic === null)
                            filter.Mesic = -1;
                        debugger;
                        let denmesStart = null;
                        if (typeof filter.datumK !== undefined && filter.datumK.start !== null) {
                            denmesStart = 1 * filter.datumK.start.getDate() + (filter.datumK.start.getMonth() + 1) * 32;
                        }
                        let denmesEnd = null;
                        if (typeof filter.datumK !== undefined && filter.datumK.end !== null) {
                            denmesEnd = 1 * filter.datumK.end.getDate() + (filter.datumK.end.getMonth() + 1) * 32;
                        }
                        let nesouhlasne;
                        if (that._nesouhlasne)
                            nesouhlasne = { o: "=", v: true };
                        let nestazene;
                        if (that._nestazene)
                            nestazene = { o: "=", v: true };
                        if (denmesEnd === null || denmesStart === null)
                            return;
                        let myfiltr = {
                            rok: { o: "=", v: that.Globals.EkoParams?.Rok }, ico: { o: "=", v: that.Globals.EkoParams?.ICO },
                            denmes: { o: [">=", "<="], v: [denmesStart, denmesEnd] },
                            //denmes: { o: ">=", v: denmesStart },
                            //denmes: { o: "<=", v: denmesEnd },
                            nesouhlasne, nestazene
                        };
                        that.parentCnt.isl.UcrRisreStavy.stavySkutecnosti({ maska: maska, filter: { filters: myfiltr } })
                            .get()
                            .then(function (result) {
                            debugger;
                            //at.setActions(result.ListValues?.length as any);
                            //that.loadingData = false;
                            that.nastaveniAkci();
                            return def.resolve(result);
                        })
                            .always(function () {
                            //that.loadingData = false;
                        }).catch(() => { return def.reject(); });
                        ;
                        return def.promise();
                    });
                    return def.promise();
                }
            }
            WebClient.GSeznamIISSPStavyStavyVolaniInbox = GSeznamIISSPStavyStavyVolaniInbox;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUlJU1NQU3RhdnlTdGF2eVZvbGFuaUluYm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbUlJU1NQU3RhdnlTdGF2eVZvbGFuaUluYm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0E0cUJmO0FBNXFCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0E0cUJuQjtJQTVxQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQTRxQjdCO1FBNXFCb0IsV0FBQSxTQUFTO1lBRTFCOzs7OztlQUtHO1lBQ0gsTUFBYSxpQ0FBa0MsU0FBUSxVQUFBLGdCQUFnQjtnQkFBdkU7O29CQUtZLGVBQVUsR0FBWSxLQUFLLENBQUM7b0JBQzVCLGlCQUFZLEdBQVksS0FBSyxDQUFDO2dCQTZwQjFDLENBQUM7Z0JBM3BCRyxjQUFjO29CQUNWLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzNDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDMUIsSUFBSSxJQUFJLElBQUksSUFBSTt3QkFBRSxPQUFPO29CQUN6QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTt3QkFDM0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRyxDQUFDO2dCQUVEOzs7cUJBR0s7Z0JBQ0UsYUFBYTtvQkFDaEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLENBQUMsU0FBUyxDQUFD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RSxPQUFPLEVBQUUsRUFBRSxDQUFDOzZCQUM1RixHQUFHLEVBQUU7NkJBQ0wsSUFBSSxDQUFDLFVBQVUsTUFBTTs0QkFDbEIsUUFBUSxDQUFDOzRCQUNULGtEQUFrRDs0QkFDbEQsMkJBQTJCOzRCQUMzQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7NEJBQ3JCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFFL0IsQ0FBQyxDQUFDOzZCQUNELE1BQU0sQ0FBQzs0QkFDSiwyQkFBMkI7d0JBRS9CLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN6QyxDQUFDO3dCQUNMLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUV6QixDQUFDLENBQ0EsQ0FBQztvQkFHTixPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDekIsQ0FBQzthQUNKO1lBbnFCWSwyQ0FBaUMsb0NBbXFCN0MsQ0FBQTtRQUNMLENBQUMsRUE1cUJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE0cUI3QjtJQUFELENBQUMsRUE1cUJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE0cUJuQjtBQUFELENBQUMsRUE1cUJTLE1BQU0sS0FBTixNQUFNLFFBNHFCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJSVNTUCBzdGF2eSAtIFN0YXZ5IHNrdXRlY25vc3RpXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgdGthcmVzXHJcbiAgICAgKiBAc2luY2UgNDg0LjEuMC42OVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbUlJU1NQU3RhdnlTdGF2eVZvbGFuaUluYm94IGV4dGVuZHMgR1Nlem5hbUlJU1NQQmFzZSBpbXBsZW1lbnRzIElHQ29udGVudHtcclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgRmluTWlzdG86IHN0cmluZzsgICAvLyBmaW5hbmNuaSBtaXN0b1xyXG5cclxuICAgICAgICBwcml2YXRlIF9uZXN0YXplbmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBwcml2YXRlIF9uZXNvdWhsYXNuZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgc3VwZXIub25Db250ZW50UmVhZHkoKTtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LkZpbk1pc3RvID0gdGhpcy5wYXJlbnRDbnRbXCJGaW5NaXN0b1wiXTtcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5GaW5NaXN0by50cmltKCkgIT09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICBncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiYXBwbHlcIiwgeyBpc3BfZmltOiB7IHN0YXJ0OiB0aGF0LkZpbk1pc3RvLCBlbmQ6IHRoYXQuRmluTWlzdG8gfSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnBhcmVudENudC5hY3Rpb25zLmFkZFJhbmdlKHsgICAgICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGFjdE9kZXNsYXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9kZXNsYXRcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ2OVwiLCAvL1JDIDMwMjUwNDY5IDogRG90YXogSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZG90YXpJSVNTUCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY1BvaHlieToge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNQb2h5YnlcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ5OVwiLCAvL1JDIDMwMjUwNDk5IDogUG9oeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBvaHlieSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9kZXNsYXQgdnlrYXpcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgZG90YXpJSVNTUCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnBhcmVudENudC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MzAyNTA0NDVcIik7IC8vUkMgMzAyNTA0NDUgOiBQxZlpcHJhdnVqZSBzZSBvZGVzbMOhbsOtXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9kZXNsYXQgdnlrYXpcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgcG9oeWJ5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vdGhhdC5wYXJlbnRDbnQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjMwMjUwNDQ1XCIpOyAvL1JDIDMwMjUwNDQ1IDogUMWZaXByYXZ1amUgc2Ugb2Rlc2zDoW7DrVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pIHByaXN0dXBub3N0aSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgbmFzdGF2ZW5pQWtjaSgpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgLy8gcG9rdWQgbmVuaSBncmlkLCBuaWMgbmVkZWxlalxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnRDbnQuY2xvc2VkICkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZpZXcgPSBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgbGV0IHJvd3MgPSBncmlkLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdTZXpuYW1WeWthenVEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBsZXQgcG9jZXQgPSB2aWV3LmdldENvdW50KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgcm93OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0YXNwc0R0byA9IHt9O1xyXG4gICAgICAgICAgICBpZiAocG9jZXQgPiAwKVxyXG4gICAgICAgICAgICAgICAgcm93ID0gcm93c1swXVxyXG4gICAgICAgICAgICAvLyBvZGVzbGF0XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWN0T2Rlc2xhdD8udXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHBvY2V0ID4gMCAmJiAgR2xvYmFscy5HVWNyR2xvYmFscy5SYWRfUmlzU3RyYyA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclpvYnJhemVuaVZkdS5Bbm9FZGl0YWNlLCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIHBvaHlieVxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFjUG9oeWJ5Py51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogcG9jZXQgPiAwICYmIHJvdy5wcml6X2RldGFpbCE+MCxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluaWNlIG1lbnViYXJ1XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgRGVmaW5lTWVudUJhcigpOiBNZW51UGFyYW1zW10ge1xyXG5cclxuICAgICAgICAgICAgbGV0IG1lbnVQYXI6IE1lbnVQYXJhbXNbXSA9XHJcbiAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWN0T2Rlc2xhdCwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hY1BvaHlieSwgZmF2b3JpdGU6IHRydWUgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIHJldHVybiBtZW51UGFyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgVnl0dm9yZW5pIGdyaWR1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgcHJvdmlkZXIgPSBuZXcgR29yZGljLkRhdGEuUHJvdmlkZXI8YW55LCBhbnksIGFueT4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5sb2FkaW5nRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldzxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0YXNwc0R0bz4oW10sIHtcclxuICAgICAgICAgICAgICAgIHByb2Nlc3NvcnM6IHsgcHJvdmlkZXI6IHByb3ZpZGVyIH1cclxuICAgICAgICAgICAgICAgICwga2V5OiBcIml4c192a3oscG9yX2Npc2xvXCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBzbG91cGNlID0gdGhhdC5jcmVhdGVHcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgIC8vdmFyIGRlZmF1bHRQcm9maWxlID0gc2xvdXBjZS5jb2x1bW5zOy8vc2xvdXBjZS5jb2x1bW5zLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5uYW1lPy50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJ2bGFzdG5vc3RcIikgPT09IC0xKVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9ICQubmV3RGl2KHRoaXMuY2xhc3NHcmlkKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMucGFyZW50Q250LmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB2aWV3LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHNsb3VwY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHsgbmFtZTogXCJkZWZhdWx0XCIsIGNvbHVtbkxpc3Q6IHNsb3VwY2UuY29sdW1ucy5tYXAoKGMpID0+IGMubmFtZSkuam9pbihcIixcIikgfSxcclxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hbWU6IFwidXNlclByb2ZpbGVcIiwgY29sdW1uTGlzdDogc2xvdXBjZS5jb2x1bW5zLm1hcCgoYykgPT4gYy5uYW1lKS5qb2luKFwiLFwiKSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZVZpc2libGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZnVuY3Rpb24gKGV2LCBpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmFzdGF2ZW5pQWtjaSgpOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIGZ1bmN0aW9uIGNyZWF0ZUZpbHRlclphbG96a2FcclxuICAgICAgICAqICAgICAgXHJcbiAgICAgICAgKiBPYmVjbmEgemFsb3prYVxyXG4gICAgICAgICogQHBhcmFtIHtHQ29udGVudH0gY29udGVudFxyXG4gICAgICAgICogQHJldHVybnMge2FueX1cclxuICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVGaWx0ZXJaYWxvemthKCk6IGFueSB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGRhdE1heCA9IG5ldyBEYXRlKHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvayArIFwiLTEyLTMxXCIpO1xyXG4gICAgICAgICAgICBsZXQgZGF0TWluID0gbmV3IERhdGUodGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rICsgXCItMS0xXCIpO1xyXG4gICAgICAgICAgICBsZXQgY3VyckRhdCA9IGRhdE1heDtcclxuICAgICAgICAgICAgaWYgKHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvayA9PSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpXHJcbiAgICAgICAgICAgICAgICBjdXJyRGF0ID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgdmFyIGZpbHRlckZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBvcGVuZWQ6IHRydWUsIGxheW91dERlc2NyaXB0b3I6IFwiTDRNM1MxMiwgTC0xMi0xMi0wLCBNLTEyLTExLTEsIFMtMTItMTEtMVwiLCB0YWJMYWJlbDogXCJqcmVzOjMwMjUwMDUyXCIgfSkgIC8vUkMgMzAyNTAwNTIgOiBGaWx0clxyXG5cclxuICAgICAgICAgICAgZmlsdGVyRm9ybURlZi5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coeyBsYWJlbDogXCJqcmVzOjMwMjUwNDk3XCIgfSkgLy9SQyAzMDI1MDQ5NyA6IE9kIC0gRG9cclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdpbnRlcnZhbGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9mb3JtYXQ6IChHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMgYXMgYW55KS5kYXRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXR1bUtcIixcclxuICAgICAgICAgICAgICAgICAgICBtaW5WYWx1ZTogZGF0TWluLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFZhbHVlOiBkYXRNYXgsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pbml0aWFsVmFsdWU6IGRhdE1heCxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgc3RhcnQ6IGRhdE1pbiwgZW5kOiBjdXJyRGF0IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5leHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWFycm93LXJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDpcImpyZXM6MzAyNTA0OTNcIiwgLy9SQyAzMDI1MDQ5MyA6IFBvc3VuZSBjZWzDvSBpbnRlcnZhbCBkbyBidWRvdWNub3N0aSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gJChldi50YXJnZXQpLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBvYmouZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsdWUuc3RhcnQgYXMgRGF0ZSkuc2V0RGF0ZSgodmFsdWUuc3RhcnQgYXMgRGF0ZSkuZ2V0RGF0ZSgpICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZS5lbmQgYXMgRGF0ZSkuc2V0RGF0ZSgodmFsdWUuZW5kIGFzIERhdGUpLmdldERhdGUoKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmFzdGF2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1leHBhbmRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTA0OTVcIiwgLy9SQyAzMDI1MDQ5NSA6IE5hc3RhdsOtIGludGVydmFsIG9kZSBkbmXFoW7DrWhvIGRuZSBuYSBkb3BvcnXEjWVub3UgZMOpbGt1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gJChldi50YXJnZXQpLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xldCB2YWx1ZSA9IG9iai5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodmFsdWUgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdy5zZXREYXRlKG5vdy5nZXREYXRlKCkgLSAzMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHsgc3RhcnQ6IG5vdywgZW5kOiBuZXcgRGF0ZSgpIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vKHZhbHVlLnN0YXJ0IGFzIERhdGUpLnNldERhdGUobmV3IERhdGUoKS5nZXREYXRlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyh2YWx1ZS5lbmQgYXMgRGF0ZSkuc2V0RGF0ZShuZXcgRGF0ZSgpLmdldERhdGUoKSAtIDMwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmdmaWVsZChcInNldFZhbHVlXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogbmV3IEdBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJldmlld1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtYXJyb3ctbGVmdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6XCJqcmVzOjMwMjUwNDk0XCIsIC8vUkMgMzAyNTA0OTQgOiBQb3N1bmUgY2Vsw70gaW50ZXJ2YWwgZG8gbWludWxvc3RpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0gJChldi50YXJnZXQpLmNsb3Nlc3QoXCIuZ2ZpZWxkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBvYmouZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsdWUuc3RhcnQgYXMgRGF0ZSkuc2V0RGF0ZSgodmFsdWUuc3RhcnQgYXMgRGF0ZSkuZ2V0RGF0ZSgpIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZS5lbmQgYXMgRGF0ZSkuc2V0RGF0ZSgodmFsdWUuZW5kIGFzIERhdGUpLmdldERhdGUoKSAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tb2RlbDogXCJtb2RlbC5kYXR1bUs9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy92YWx1ZVR5cGU6IFwiZGF0ZVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBmaWx0ZXJGb3JtRGVmLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDI1MDQ5NlwiIH0pIC8vUkMgMzAyNTA0OTYgOiBWb2xieVxyXG4gICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidm9sYnlcIiwgbGlzdDogdHJ1ZSwgaXRlbVdpZHRoOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAsIGRyb3Bkb3duOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgLCBtdWx0aTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLCBtb2RlbDogXCJtb2RlbC52b2xieT12YWx1ZS5ob2Rub3RhXCJcclxuICAgICAgICAgICAgICAgICwgaXRlbVRlbXBsYXRlOiBcInt0ZXh0fVwiXHJcbiAgICAgICAgICAgICAgICAsIGRhdGE6IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFt7IHRleHQ6IFwianJlczozMDI1MDQ3MFwiLCBob2Rub3RhOjEgfSAvL1JDIDMwMjUwNDcwIDogTmVzdGHFvmVuw6lcclxuICAgICAgICAgICAgICAgICAgICAsIHsgdGV4dDogXCJqcmVzOjMwMjUwNDcxXCIsIGhvZG5vdGE6Mn0gICAgICAgICAgICAgICAgXSAvL1JDIDMwMjUwNDcxIDogTmVzb3VobGFzbsOpIHN0YXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgLCB7IGtleTogXCJob2Rub3RhXCIgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLy8sIGluaXRpYWxWYWx1ZTogaW5pdGlhbFZhbHVlXHJcbiAgICAgICAgICAgICAgICAsIGVtcHR5VmFsdWU6IG51bGxcclxuICAgICAgICAgICAgICAgICwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubG9hZGluZyB8fCAob2JqLmZsYWdzICYmIG9iai5mbGFncy5maWx0ZXJDbGVhciA9PT0gdHJ1ZSkpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAvL2lmICh0aGF0LmxvYWRpbmcpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iaiAmJiB0eXBlb2Ygb2JqLnZhbHVlICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zZXRGaWx0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8vLyBuYXN0YXZlbmkgYWtjaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCB2aWV3ID0gdGhhdC4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zZXRBY3Rpb25zKHZpZXcuZ2V0RGF0YVJvd3MoKS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDI1MDQ3MFwiIH0pIC8vUkMgMzAyNTA0NzAgOiBOZXN0YcW+ZW7DqVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJuZXN0YXplbmVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGxhYmVsRnJvbVJvdzogXCJhbHdheXNcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL21vZGVsOiBcIm1vZGVsLmFncmVnYWNlPXZhbHVlLmFncmVnYWNlXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0LiRncmlkID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBjdHggPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGN0eC52YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIG5hc3RhdmVuaSBhdHJpYnV0dSBuZXN0YXplbmVcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB0aGF0Ll9uZXN0YXplbmUgPSBjdHgudmFsdWUgYXMgYm9vbGVhbjtcclxuICAgICAgICAgICAgLy8gICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vKTtcclxuICAgICAgICAgICAgLy9maWx0ZXJGb3JtRGVmLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAvLyAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMDI1MDQ3MVwiIH0pIC8vUkMgMzAyNTA0NzEgOiBOZXNvdWhsYXNuw6kgc3RhdnlcclxuICAgICAgICAgICAgLy8gICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwibmVzb3VobGFzbmVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGluaXRpYWxWYWx1ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBsYWJlbEZyb21Sb3c6IFwiYWx3YXlzXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL2xhYmVsRnJvbVJvdzogdHJ1ZSwgXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL21vZGVsOiBcIm1vZGVsLmFncmVnYWNlPXZhbHVlLmFncmVnYWNlXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGF0LiRncmlkID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBjdHggPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGN0eC52YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIG5hc3RhdmVuaSBhdHJpYnV0dSBuZXNvdWhsYXNuZVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHRoYXQuX25lc291aGxhc25lID0gY3R4LnZhbHVlIGFzIGJvb2xlYW47XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvLyAgICApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlckZvcm1EZWY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogWm5vdnVuYWN0ZW5pIGRhdFxyXG4gICAgICAgIC8vICogXHJcbiAgICAgICAgLy8gKiAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSByZWxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIC8vICAgIHZhciB2aWV3ID0gdGhhdC4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgLy8gICAgdmlldy5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgIC8vICAgIHZpZXcuZ2V0TG9hZGluZ1Byb21pc2UoKS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgICAgIHRoYXQubmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBmaWx0cm92YWNpaG8gcGFuZWx1XHJcbiAgICAgICAgICogQHBhcmFtIHRoYXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlRmlsdGVyUGFuZWwodGhhdDogdGhpcyk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwgPSAkLm5ld0RpdihcImpzLWZpbHRyXCIpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5wYXJlbnRDbnQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGhlbHBlckN1c3RvbWl6ZXI6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9sU29ydCA9IGRhdGEuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5uYW1lIDw9IGIubmFtZTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwb2xTb3J0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAsIGZvcm1zOiBbdGhhdC5jcmVhdGVGaWx0ZXJaYWxvemthKCldXHJcbiAgICAgICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlTGF5b3V0RGVzY3JpcHRvcjogXCJMNE0zUzEgTDEyLTEyLTAgTS0xMi0xMi0wIFMtMTItMTItMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOlwiTDFNMVMxIEwxMi0xMi0wIE0tMTItMTItMCBTLTEyLTEyLTBcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdG9yYWdlU2VydmljZTogbmV3IEdvcmRpYy5HaW4uRmlsdGVyU3RvcmFnZVNlcnZpY2UuU3RvcmUoKSwgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlVXNlclNldHRpbmdzOiBbRmlsdGVyVmlld01vZGUuRGV0YWlsLyosIEZpbHRlclZpZXdNb2RlLk5vcm1hbCovXSxcclxuICAgICAgICAgICAgICAgICAgICAvL3NpbXBsZU1vZGVBdXRvTG9hZEFmdGVyQ3JlYXRlUGFuZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdXNlckRlZmF1bHRGaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gMDEuMDMuMjAyMSAtIFRGZWlrXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTmFocmF6ZW7DrSBvYnNvbGV0ZSBwYXJhbWV0csWvLlxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zaW1wbGVNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnlCdXR0b25CZWhhdmlvdXI6IFwiQWx3YXlzUHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOiBcIkw0TTNTMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyRmlsdGVyQnV0dG9uVmlzaWJsZTogXCJBbHdheXNWaXNpYmxlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hdXRvTG9hZEFmdGVyQ2hvc2VGaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0xvYWRBZnRlckNyZWF0ZVBhbmVsOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2F1dG9Mb2FkQWZ0ZXJDbGVhckZpbHRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL2ZpbHRlckhlbHBlckl0ZW1UZW1wbGF0ZTogXCI8Yj57bmF6ZXZ9PC9iPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGV4dEl0ZW1UZW1wbGF0ZTogXCJ7bmF6ZXZ9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IGZ1bmN0aW9uIChldmVudCwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmlsdGVyRm9ybS5hcHBseVwiLCBvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5sb2cudHJhY2UoXCJmaWx0ZXJGb3JtLmFwcGx5XCIsIG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmxvYWRpbmdEYXRhKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5yZXF1ZXN0RGF0YShvYmouZmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5nZXRMb2FkaW5nUHJvbWlzZSgpLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzZXQ6IChldiwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRpbmdEYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiY2xlYXJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBncmlkZm9ybWF0dSBkbGUgcHJlZGxvaHlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3Rhc3BzRHRvPiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG15R3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3Rhc3BzRHRvPigpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRfaGRyX3Jpc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgyXCIsIC8vUkMgMzExMDAwODIgOiBJRCBJSVNTUFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1NVwiLCAvL1JDIDMxMTAwMjU1IDogSWRlbnRpZmlrw6F0b3IgcmV6ZXJ2YWNlIHJvenBvxI10b3bDvWNoIHByb3N0xZllZGvFryBJSVNTUFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpZF9oZHJfcmlzXCIsIGNhcHRpb246IFwianJlczozMTEwMDA4MlwiLCAgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDkgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA5IH0gfSkgLy9SQyAzMTEwMDA4MiA6IElEIElJU1NQXHJcbiAgICAgICAgICAgICAgICAvL21heExlbmd0aDogOVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX2hkclwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgzXCIsLy9SQyAzMTEwMDA4MyA6IMWZw6FkZWsgSUlTU1BcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNTZcIiwgLy9SQyAzMTEwMDI1NiA6IMWYw6FkZWsgcmV6ZXJ2YWNlIHJvenBvxI10b3bDvWNoIHByb3N0xZllZGvFryBJSVNTUFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHsgbW9kZWw6IFwicmFkZWtfaGRyXCIsIGNhcHRpb246IFwianJlczozMTEwMDA4M1wiLCB9KSAvL1JDIDMxMTAwMDgzIDogxZnDoWRlayBJSVNTUFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX2ZpbVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzU2XCIsIC8vUkMgMzAyNTAzNTYgOiBGSU0gICAgIFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDQzMFwiLCAvL1JDIDMwMjUwNDMwIDogRmluYW7EjW7DrSBtw61zdG9cclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX2ZpbVwiLCBkaXNhYmxlZDp0cnVlLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNTZcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDcgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA3LCBhbGxvd2VkQ2hhcnM6IFwiMDEyMzQ1Njc4OVwiIH0gfSksIC8vUkMgMzAyNTAzNTYgOiBGSU1cclxuICAgICAgICAgICAgICAgIHdpZHRoOiA3NSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3pkclwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzU3XCIsIC8vUkMgMzAyNTAzNTcgOiBaRFJcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA3MCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX3pkclwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNTdcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDcgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA3IH0gfSksIC8vUkMgMzAyNTAzNTcgOiBaRFJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3BhclwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzU4XCIsIC8vUkMgMzAyNTAzNTggOiBQQVJcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX3BhclwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNThcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDYgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA2IH0gfSksIC8vUkMgMzAyNTAzNTggOiBQQVJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3BvbFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzU5XCIsIC8vUkMgMzAyNTAzNTkgOiBQT0xcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX3BvbFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNTlcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDQgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA0IH0gfSksIC8vUkMgMzAyNTAzNTkgOiBQT0xcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX2Vkc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzYwXCIsIC8vUkMgMzAyNTAzNjAgOiBFRFMvU01WU1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX2Vkc1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNjBcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDEzIH0sIHNlY29uZEZpZWxkOiB7IG1heExlbmd0aDogMTMgfSB9KSwgLy9SQyAzMDI1MDM2MCA6IEVEUy9TTVZTXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImlzcF9wdnNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM2MVwiLCAvL1JDIDMwMjUwMzYxIDogUFZTXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogOTAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImlzcF9wdnNcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzYxXCIsIGZpcnN0RmllbGQ6IHsgbWF4TGVuZ3RoOiAxMCB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDEwIH0gfSksIC8vUkMgMzAyNTAzNjEgOiBQVlNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3VjbFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzYyXCIsIC8vUkMgMzAyNTAzNjIgOiBVQ0xcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA5MCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX3VjbFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNjJcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDkgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA5IH0gfSksIC8vUkMgMzAyNTAzNjIgOiBVQ0xcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImlzcF96alwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDc0XCIsIC8vUkMgMzAyNTA0NzQgOiBaSlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDkwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfempcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDc0XCIsIGZpcnN0RmllbGQ6IHsgbWF4TGVuZ3RoOiAzIH0sIHNlY29uZEZpZWxkOiB7IG1heExlbmd0aDogMyB9IH0pLCAvL1JDIDMwMjUwNDc0IDogWkpcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3VqXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NzVcIiwgLy9SQyAzMDI1MDQ3NSA6IFVKXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogOTAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImlzcF91alwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NzVcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDYgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA2IH0gfSksIC8vUkMgMzAyNTA0NzUgOiBVSlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfdXpcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ3NlwiLCAvL1JDIDMwMjUwNDc2IDogVVpcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA5MCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX3V6XCIsIGNhcHRpb246IFwianJlczozMDI1MDQ3NlwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogNSB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDUgfSB9KSwgLy9SQyAzMDI1MDQ3NiA6IFVaXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwia2MwMVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDc3XCIsIC8vUkMgMzAyNTA0NzcgOiBHSU5JUyBQUlNLXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX3Bza19zdW1hMlwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDk4XCIsIC8vUkMgMzAyNTA0OTggOiBHSU5JUyBJSVNTUCBQUlNLXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzksLy8gZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImNlbnRlclwiLFxyXG5cclxuICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcnNlRGVjaW1hbChkYXRhLmNfcHNrX3N1bWEgPz8gMCkuZXF1YWxzKHBhcnNlRGVjaW1hbChkYXRhLmtjMDE/PzApKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS13YXJuaW5nXCIsIHRleHQ6IFwianJlczozMDI1MDQ4MlwiIC8vUkMgMzAyNTA0ODIgOiBOZW7DrSBwcm92ZWRlbm8gcMWZZcO6xI10b3bDoW7DrSBza3V0ZcSNbm9zdGkgdiBJSVNTUCBuZWJvIG5lc291aGxhc8OtIHN0YXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Rvb2x0aXA6IFwianJlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfcHNrX3N1bWFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ3OFwiLCAvL1JDIDMwMjUwNDc4IDogSUlTU1AgUFJTS1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wbGF0YmFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ3OVwiLCAvL1JDIDMwMjUwNDc5IDogSUlTU1AgUMWZw61rYXogayBwbGF0YsSbXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX2J2eXBpc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDg4XCIsIC8vUkMgMzAyNTA0ODggOiBJSVNTUCBCYW5rLnbDvXBpc1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19wc2tcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ4OVwiLCAvL1JDIDMwMjUwNDg5IDogSUlTU1AgUFNLXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwXHJcbiAgICAgICAgICAgICAgICAsIHZpc2libGU6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfYWt0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0OTBcIiwgLy9SQyAzMDI1MDQ5MCA6IERhdHVtIHNlc3RhdmVuw61cclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwcml6X2RldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDkxXCIsIC8vUkMgMzAyNTA0OTEgOiBEZXRhaWxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzOSwvLyBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjpcImpyZXM6MzAyNTA0OTFcIiwgLy9SQyAzMDI1MDQ5MSA6IERldGFpbFxyXG4gICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnByaXpfZGV0YWlsIT4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWRldGFpbFwiLCB0ZXh0OiBcImpyZXM6MzAyNTA0OTJcIiwgLy9SQyAzMDI1MDQ5MiA6IEV4aXN0dWplIGRldGFpbG7DrSByb3pwYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9vbHRpcDogXCJqcmVzOjMwMjUwMjg4XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG15R3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpqaXN0ZW5pIHZvbGViIG5hIGZpbHRycGFuZWx1XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIG5hY3RpVm9sYnkodm9sYnk6IFtOdW1iZXJdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25lc3RhemVuZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9uZXN0YXplbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2b2xieSEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh2b2xieVtpXSA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25lc3RhemVuZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBlbHNlICh2b2xieVtpXSA9PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25lc291aGxhc25lID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogVnJhdCBtdWogc2VzdGF2ZW55IGZpbHRyXHJcbiAgICAgICAgLy8gKiBcclxuICAgICAgICAvLyAqIEByZXR1cm5zXHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL3Byb3RlY3RlZCBnZXRNeUZpbHRlcihmaWx0ZXJTZXJ2ZXI6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQcmV1Y3RvdmFuaVN0YXZMaXN0RmlsdGVyRHRvLCBmaWx0ZXI6IGFueSk6IHsgbWFza2E6IHt9LCBmaWx0ZXI6IHsgZmlsdGVyczoge30gfSB9fHVuZGVmaW5lZCB7XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICB0aGlzLm5hY3RpVm9sYnkoZmlsdGVyLnZvbGJ5KTtcclxuICAgICAgICAvLyAgICBpZiAoZmlsdGVyLk1lc2ljID09PSBudWxsKVxyXG4gICAgICAgIC8vICAgICAgICBmaWx0ZXIuTWVzaWMgPSAtMTtcclxuXHJcbiAgICAgICAgLy8gICAgZGVidWdnZXI7XHJcbiAgICAgICAgLy8gICAgbGV0IGRlbm1lc1N0YXJ0OiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAvLyAgICBpZiAodHlwZW9mIGZpbHRlci5kYXR1bUsgIT09IHVuZGVmaW5lZCAmJiBmaWx0ZXIuZGF0dW1LLnN0YXJ0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgICAgIGRlbm1lc1N0YXJ0ID0gMSAqIGZpbHRlci5kYXR1bUsuc3RhcnQuZ2V0RGF0ZSgpICsgKGZpbHRlci5kYXR1bUsuc3RhcnQuZ2V0TW9udGgoKSArIDEpICogMzJcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgbGV0IGRlbm1lc0VuZDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgLy8gICAgaWYgKHR5cGVvZiBmaWx0ZXIuZGF0dW1LICE9PSB1bmRlZmluZWQgJiYgZmlsdGVyLmRhdHVtSy5lbmQgIT09IG51bGwpIHtcclxuICAgICAgICAvLyAgICAgICAgZGVubWVzRW5kID0gMSAqIGZpbHRlci5kYXR1bUsuZW5kLmdldERhdGUoKSArIChmaWx0ZXIuZGF0dW1LLmVuZC5nZXRNb250aCgpICsgMSkgKiAzMlxyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvLyAgICBsZXQgbmVzb3VobGFzbmU6IGFueTtcclxuICAgICAgICAvLyAgICBpZiAodGhpcy5fbmVzb3VobGFzbmUpXHJcbiAgICAgICAgLy8gICAgICAgIG5lc291aGxhc25lID0geyBvOiBcIj1cIiwgdjogdHJ1ZSB9O1xyXG4gICAgICAgIC8vICAgIGxldCBuZXN0YXplbmU6IGFueTtcclxuICAgICAgICAvLyAgICBpZiAodGhpcy5fbmVzdGF6ZW5lKVxyXG4gICAgICAgIC8vICAgICAgICBuZXN0YXplbmUgPSB7IG86IFwiPVwiLCB2OiB0cnVlIH07XHJcblxyXG4gICAgICAgIC8vICAgIGlmIChkZW5tZXNFbmQgPT09IG51bGwgfHwgZGVubWVzU3RhcnQgPT09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gICAgbGV0IG15ZmlsdHIgPSB7XHJcbiAgICAgICAgLy8gICAgICAgIHJvazogeyBvOiBcIj1cIiwgdjogdGhpcy5HbG9iYWxzLkVrb1BhcmFtcz8uUm9rIH0sIGljbzogeyBvOiBcIj1cIiwgdjogdGhpcy5HbG9iYWxzLkVrb1BhcmFtcz8uSUNPIH0sXHJcbiAgICAgICAgLy8gICAgICAgIGRlbm1lczogeyBvOiBbXCI+PVwiLCBcIjw9XCJdLCB2OiBbZGVubWVzU3RhcnQsIGRlbm1lc0VuZF0gfSxcclxuICAgICAgICAvLyAgICAgICAgLy9kZW5tZXM6IHsgbzogXCI+PVwiLCB2OiBkZW5tZXNTdGFydCB9LFxyXG4gICAgICAgIC8vICAgICAgICAvL2Rlbm1lczogeyBvOiBcIjw9XCIsIHY6IGRlbm1lc0VuZCB9LFxyXG4gICAgICAgIC8vICAgICAgICBuZXNvdWhsYXNuZSwgbmVzdGF6ZW5lXHJcbiAgICAgICAgLy8gICAgfTtcclxuICAgICAgICAvLyAgICByZXR1cm4ge1xyXG4gICAgICAgIC8vICAgICAgICBtYXNrYTogZmlsdGVyU2VydmVyLCBmaWx0ZXI6IHsgZmlsdGVyczogbXlmaWx0ciB9IH07XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIE5hY3RlbmkgSXNsIHNsdXpieSBwcm8gbGlzdFxyXG4gICAgICAgIC8vICogQHBhcmFtIHBhcmFtMFxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wcm90ZWN0ZWQgbG9hZElTTExpc3QocnE6IHsgbWFza2E6IHt9LCBmaWx0ZXI6IHsgZmlsdGVyczoge30gfSB9KTogSXNsLl9UYXNrPHsgbWFza2E6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQcmV1Y3RvdmFuaVN0YXZMaXN0RmlsdGVyRHRvLCBmaWx0ZXI6IElzbC5HU2VydmljZUxpc3RSZXF1ZXN0IH0sIElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxhbnk+PiB7XHJcbiAgICAgICAgLy8gICAgZGVidWdnZXI7XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIEdvcmRpYy5Jc2wuVWNyUmlzcmVTdGF2eS5zdGF2eVNrdXRlY25vc3RpKHJxKTtcclxuICAgICAgICAvL31cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgTmFjdGVuaSBkYXRcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgbG9hZERhdGEoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB2YXIgbWFza2E6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQcmV1Y3RvdmFuaVN0YXZMaXN0RmlsdGVyRHRvID0ge307XHJcblxyXG4gICAgICAgICAgICB2YXIgZmlsdGVyID0gdGhhdC5nZXRGaWx0ZXIoKS5nZmlsdGVycGFuZWwoJ2dldEN1cnJlbnREYXRhJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvYWRkYXRhLmZpbHRlclwiLCBmaWx0ZXIpO1xyXG4gICAgICAgICAgICAvL2xldCB2aWV3ID0gdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcblxyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcjxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUHJldWN0b3ZhbmlTdGF2TGlzdEZpbHRlckR0bz4oXCJjb2xsZWN0XCIsIG1hc2thKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGZpbHRlclNlcnZlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hc2thID0gZmlsdGVyU2VydmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubmFjdGlWb2xieShmaWx0ZXIudm9sYnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIuTWVzaWMgPT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5NZXNpYyA9IC0xO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGVubWVzU3RhcnQ6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZmlsdGVyLmRhdHVtSyAhPT0gdW5kZWZpbmVkICYmIGZpbHRlci5kYXR1bUsuc3RhcnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVubWVzU3RhcnQgPSAxICogZmlsdGVyLmRhdHVtSy5zdGFydC5nZXREYXRlKCkgKyAoZmlsdGVyLmRhdHVtSy5zdGFydC5nZXRNb250aCgpICsgMSkgKiAzMlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGVubWVzRW5kOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGZpbHRlci5kYXR1bUsgIT09IHVuZGVmaW5lZCAmJiBmaWx0ZXIuZGF0dW1LLmVuZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZW5tZXNFbmQgPSAxICogZmlsdGVyLmRhdHVtSy5lbmQuZ2V0RGF0ZSgpICsgKGZpbHRlci5kYXR1bUsuZW5kLmdldE1vbnRoKCkgKyAxKSAqIDMyXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXNvdWhsYXNuZTogYW55O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Ll9uZXNvdWhsYXNuZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVzb3VobGFzbmUgPSAgeyBvOiBcIj1cIiwgdjogdHJ1ZSB9IDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmVzdGF6ZW5lOiBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuX25lc3RhemVuZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVzdGF6ZW5lID0geyBvOiBcIj1cIiwgdjogdHJ1ZSB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVubWVzRW5kID09PSBudWxsIHx8IGRlbm1lc1N0YXJ0ID09PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBteWZpbHRyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2s6IHsgbzogXCI9XCIsIHY6IHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJvayB9LCBpY286IHsgbzogXCI9XCIsIHY6IHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LklDTyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZW5tZXM6IHsgbzogW1wiPj1cIiwgXCI8PVwiXSwgdjogW2Rlbm1lc1N0YXJ0LCBkZW5tZXNFbmRdIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVubWVzOiB7IG86IFwiPj1cIiwgdjogZGVubWVzU3RhcnQgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZW5tZXM6IHsgbzogXCI8PVwiLCB2OiBkZW5tZXNFbmQgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVzb3VobGFzbmUsIG5lc3RhemVuZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmlzbC5VY3JSaXNyZVN0YXZ5LnN0YXZ5U2t1dGVjbm9zdGkoeyBtYXNrYTogbWFza2EsIGZpbHRlcjogeyBmaWx0ZXJzOiBteWZpbHRyIH0gfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hdC5zZXRBY3Rpb25zKHJlc3VsdC5MaXN0VmFsdWVzPy5sZW5ndGggYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LmxvYWRpbmdEYXRhID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7IHJldHVybiBkZWYucmVqZWN0KCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=