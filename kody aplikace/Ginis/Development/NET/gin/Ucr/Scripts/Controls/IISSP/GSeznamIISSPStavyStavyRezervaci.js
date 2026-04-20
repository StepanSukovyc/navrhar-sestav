"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            /**
             * IISSP stavy - Stavy rezervaci
             *
             * @author tkares
             * @since 484.1.0.69
             */
            class GSeznamIISSPStavyStavyRezervaci extends WebClient.GSeznamIISSPBase {
                constructor() {
                    super(...arguments);
                    //private _nestazene: boolean = false;
                    //private _nesouhlasne: boolean = false;
                    this.pouzeSChybou = 0;
                    this.LICMO = false;
                    ///**
                    // * Nacteni Isl sluzby pro list
                    // * @param param0
                    // */
                    //protected loadISLList(rq: { maska: {}, filter: { filters: any } }): Isl._Task<any, Isl.GServiceListResponse<any>> {
                    //    return this.parentCnt.isl.UcrRisreIissp.list({ maska:rq.maska, pouzeSChybou: this.pouzeSChybou })
                    //}
                    ///**
                    // * Vrat muj sestaveny filtr
                    // * 
                    // * @returns
                    // */
                    //protected getMyFilter(filterServer: Gordic.Uct.Interface.GUcrPreuctovaniStavListFilterDto, filter: any): { maska: {}, filter: { filters: {} } } | undefined {
                    //    return {
                    //        maska: filterServer, filter: {
                    //            filters: {} }
                    //    };
                    //}
                    ///**
                    // *  Nacteni dat
                    // */
                    //public loadDataOld(): JQueryPromise<any> {
                    //    var that = this;
                    //    var def = $.Deferred();
                    //    var maska: Gordic.Uct.Interface.GRisreIIsspFilterDto = {};
                    //    //var filter = that.getFilter().gfilterpanel('getCurrentData');
                    //    //console.log("loaddata.filter", filter);
                    //    //let view = this.$grid.ggrid("getView");
                    //    let grid = that.getGrid();
                    //    if (grid == null) return $.Deferred().reject().promise();
                    //    grid.ggridserverfilter<Gordic.Uct.Interface.GRisreIIsspFilterDto>("collect", maska)
                    //        .then((filterServer) => {
                    //            maska = filterServer;
                    //            debugger;
                    //            that.parentCnt.isl.UcrRisreIissp.list({ maska: maska, pouzeSChybou: that.pouzeSChybou })
                    //                .get()
                    //                .done(function (result) {
                    //                    debugger;
                    //                    //at.setActions(result.ListValues?.length as any);
                    //                    //that.loadingData = false;
                    //                    that.nastaveniAkci();
                    //                    return def.resolve(result);
                    //                })
                    //                .always(function () {
                    //                    //that.loadingData = false;
                    //                }).catch(() => { return def.reject(); });
                    //                ;
                    //            return def.promise();
                    //        }
                    //        );
                    //    return def.promise();
                    //}
                }
                onContentReady() {
                    //this.islViewUse = true;
                    // multi vyber
                    this.multiSelect = true;
                    // sumarizacni radek
                    this.sumRow = true;
                    this.myKeys = "ico,rok,mesden,sk_vl,bu_vl,id_hdr_ris,radek_hdr,xfimuz,ucs,uus";
                    this.taskList = this.parentCnt.isl.UcrRisreIissp.list();
                    this.taskCount = this.parentCnt.isl.UcrRisreIissp.count();
                    this.LICMO = this.parentCnt["LICMO"];
                    super.onContentReady();
                    //let that = this;
                    this.FinMisto = this.parentCnt["FinMisto"];
                    if (this.FinMisto.trim() !== "") {
                        let grid = this.getGrid();
                        if (grid == null)
                            return;
                        grid.ggridserverfilter("apply", { isp_fim: { start: this.FinMisto, end: this.FinMisto } });
                    }
                }
                /**
                 * Vytvoreni akci
                 *
                 * */
                createActions() {
                    let that = this;
                    that.parentCnt.actions.addRange({
                        actOverit: {
                            name: "actOverit",
                            //icon: "gi-list",
                            enabled: false,
                            caption: "jres:30250522", //RC 30250522 : Ověřit stav
                            run: (ev, ctx) => {
                                that.parentCnt.actions["actOverit"].setPending(that.OveritStav());
                                //(this as unknown as GAction).setPending(that.OveritStav())                        
                            }
                        },
                        actDetail: Gordic.Eko.Action.actionDetail({
                            //name: "actDetail",
                            //icon: "gi-list",
                            enabled: false,
                            //caption: "jres:30250523", //RC 30250523 : Detail
                            run: (ev, ctx) => {
                                that.Detail();
                            }
                        }),
                        actIisspResDetail: {
                            name: "actIisspResDetail",
                            icon: "fa-bug",
                            caption: "IisspResDetail (DEBUG)",
                            tooltip: "Tato akce se zobrazuje pouze v DEBUGu. Do UCR nepatri, slouzi pro demonstracni ucely tasku T43460",
                            run: (ev, ctx) => {
                                that.debugShowIisspResDetail();
                            }
                        }
                    });
                }
                /**
                 * Overit stav
                 *
                 *
                 * */
                OveritStav() {
                    let that = this;
                    let input = [];
                    const grid = that.getGrid();
                    if (grid == null)
                        return $.Deferred().reject().promise();
                    // nacteni vybranych radku
                    const selectedRows = grid.ggrid("getSelection");
                    // pokud nejsou radky, nic nedelej
                    if (selectedRows.length === 0)
                        return $.Deferred().reject().promise();
                    // prevedeni vybranych radku na vstup
                    selectedRows.forEach((row) => {
                        input.push({
                            ico: that.Globals.EkoParams?.ICO,
                            rok: that.Globals.EkoParams?.Rok,
                            ucs: that.Globals.EkoParams?.UCS,
                            id_hdr: row.id_hdr,
                            id_hdr_ris: row.id_hdr_ris,
                            ixs_hpr: row.ixs_hpr
                        });
                    });
                    return that.parentCnt.isl.IisspRezervace.nactiRezervaciHromadneCommit({ rezervace_list: input })
                        .get()
                        .then((result) => {
                        return that.reload();
                    });
                }
                /**
                 *detail
                 *
                 *
                 * */
                Detail() {
                    const grid = this.getGrid();
                    if (grid == null)
                        return;
                    const sel = grid.ggrid("getSelection")[0];
                    if (!sel)
                        return;
                    const ekoParams = this.Globals.EkoParams;
                    const options = {
                        ixs_hpr: sel.ixs_hpr,
                        id_hdr: sel.id_hdr,
                        id_hdr_ris: sel.id_hdr_ris,
                        radek_hdr_ris: sel.radek_hdr_ris,
                        ico: ekoParams.ICO,
                        ucs: ekoParams.UCS,
                        rok: ekoParams.Rok,
                        volatWebSluzbu: false,
                    };
                    this.parentCnt.navigate([Gordic.Iissp.WebControls.GIisspRezDetailExt, { uid: "GIisspRezDetailExt#" }], options);
                }
                debugShowIisspResDetail() {
                    const grid = this.getGrid();
                    if (grid == null)
                        return;
                    const sel = grid.ggrid("getSelection")[0];
                    if (!sel)
                        return;
                    const ekoParams = this.Globals.EkoParams;
                    const options = {
                        ixs_hpr: sel.ixs_hpr,
                        id_hdr: sel.id_hdr,
                        id_hdr_ris: sel.id_hdr_ris,
                        radek_hdr_ris: sel.radek_hdr_ris,
                        ico: ekoParams.ICO,
                        ucs: ekoParams.UCS,
                        rok: ekoParams.Rok,
                        volatWebSluzbu: false,
                    };
                    this.parentCnt.navigate([Gordic.Iissp.WebControls.GIisspRezDetail, { uid: "GIisspRezDetail#" }], options);
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
                    // overit stav
                    this.parentCnt.actions.actOverit?.update({
                        enabled: pocet > 0,
                    });
                    // detail
                    this.parentCnt.actions.actDetail?.update({
                        enabled: pocet > 0,
                    });
                }
                /**
                 * Definice menubaru
                 * */
                DefineMenuBar() {
                    let menuPar = [
                        { action: this.parentCnt.actions.actOverit, favorite: true },
                        { action: this.parentCnt.actions.actDetail, favorite: true },
                    ];
                    if (this.parentCnt.prop("DebugOrDevelopVersion"))
                        menuPar.push({ action: this.parentCnt.actions.actIisspResDetail });
                    return menuPar;
                }
                /**
                 *  Vytvoreni gridu
                 *
                 * */
                createGrid2() {
                    let that = this;
                    //let provider = new Gordic.Data.Provider<any, any, any>(() => {
                    //    that.loadingData = true;
                    //    return that.loadData();
                    //});
                    //let view = new Gordic.Data.View<Gordic.Uct.Interface.GRisreIIsspDto>([], {
                    //    processors: { provider: provider }
                    //    //, key: "ixs_vkz,por_cislo"
                    //});
                    debugger;
                    let islView = this.createListView();
                    let sloupce = that.createGridFormat();
                    //var defaultProfile = sloupce.columns;//sloupce.columns.filter((item) => item.name?.toLowerCase().indexOf("vlastnost") === -1)
                    let sumCols = undefined;
                    // souctove sloupce
                    sumCols = sloupce.columns.filter(c => (c.columnType == "currency" || c.columnType == "number") && (c.caption.indexOf("%") == -1) && ("radek_hdr,denmes".indexOf(c.name)) == -1).map(e => e.name);
                    /*const grid =*/ $.newDiv(this.classGrid)
                        .appendTo(this.parentCnt.element)
                        .gautofit()
                        .ggrid({
                        columnMode: "full",
                        data: islView,
                        multi: true,
                        columns: sloupce,
                        defaultProfile: { name: "default", columnList: sloupce.columns.map((c) => c.name).join(",") },
                        profiles: [
                            { name: "userProfile", columnList: sloupce.columns.map((c) => c.name).join(",") },
                        ],
                        profileVisible: true,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: (ev, ctx) => this.Detail()
                        }),
                        selection: function (ev, info) {
                            that.nastaveniAkci();
                        },
                    })
                        .ggridrowscalc()
                        .ggrideko({
                        // součtový řádek
                        summaryRowAllowed: true,
                        summaryRowColumns: sumCols,
                        longListModel: "Global.Ucr.AppSettings",
                        // dlouhý seznam
                        longListAllowed: true,
                        //longListModifyRqMethod: (rq) => that.allowedList(rq),
                        longListCountMethod: (rq) => that.getCallCount(),
                    });
                }
                /**
                 * Vytvoreni view pro list
                 *
                 * */
                createListView2() {
                    let that = this;
                    this.parentCnt.log.trace("Start createListView GSeznamEkoZaznamuBase");
                    return new Gordic.Isl.View(that.parentCnt.isl.UcrRisreIissp.list().use((req, next, ctx) => {
                        if (that.parentCnt.closed)
                            return $.Deferred().reject().promise();
                        this.parentCnt.log.trace("taskList.use req:", req);
                        let result = that.getFilterData(req, next)
                            .then((result) => next(result));
                        result
                            .then((data) => {
                            // aktualizace pristupnosti akci dle nactenych dat
                            this.nastaveniAkci();
                        });
                        return result;
                    }), {
                        filterPanel: that.getFilter(),
                        key: "ico,rok,mesden,sk_vl,bu_vl,id_hdr_ris,radek_hdr,xfimuz,ucs,uus",
                        //startEmpty: true,
                        //processors: {
                        //    sumare: that.sumare_processor
                        //}
                    });
                }
                /**
                 * Vraci ISL metodu pro zjisteni poctu zaznamu
                 *
                 * */
                getCallCount2() {
                    this.parentCnt.log.trace("Start GSeznamIISSPStavyStavyRezervaci.getCallCount");
                    let that = this;
                    return that.parentCnt.isl.UcrRisreIissp.count()
                        .use((req, next, ctx) => {
                        //return that.getFilterData(that, req, next) as any;
                        return that.getFilterData(req, next)
                            .then((result) => next(result));
                    })
                        .get();
                }
                /**
                   * Nacti filtry
                   * @param that
                   * @param req
                   * @param next
                   */
                getFilterData(req, next) {
                    this.parentCnt.log.trace("Start GSeznamIISSPStavyStavyRezervaci.getFilterData");
                    let that = this;
                    let result = super.getFilterData(req, next);
                    return result
                        .then((newRequest) => {
                        //var newRequest = $.extend(true, {}, req);
                        let filtr = newRequest.filters;
                        if (this.pouzeSChybou > 0) {
                            filtr.chyba = { v: this.pouzeSChybou, o: "=" };
                        }
                        newRequest["filters"] = filtr;
                        return newRequest;
                    });
                    //return that.getFilterM()
                    //    .then((newFilter: Uct.Interface.GRisreIIsspFilterDto ) => {
                    //        var newRequest = $.extend(true, {}, req);
                    //        if (this.pouzeSChybou > 0) {
                    //            newFilter.chyba = { v: this.pouzeSChybou, o: "=" };
                    //        }
                    //            newRequest["filters"] = newFilter;
                    //         return newRequest;
                    //    }
                    //    )
                    //    ;
                }
                /**
                 * Vraci objekt filtru
                 * @param {GContent} content
                 * @returns
                 */
                getFilterGrid2() {
                    this.parentCnt.log.trace("Start getFilter ");
                    var filterDto = {};
                    let grid = this.getGrid();
                    if (grid == null)
                        return $.Deferred().reject().promise();
                    return grid.ggridserverfilter("collect", filterDto)
                        .then((d) => {
                        this.parentCnt.log.trace("filter", d);
                        return d;
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
                        caption: "jres:30250501", //RC 30250501 : #
                        description: "jres:30250500", //RC 30250500 : Řádek IISSP
                        width: 40,
                        serverFilter: Gordic.Eko.Filters.integerInterval({ model: "radek_hdr", caption: "jres:31100083", }) //RC 31100083 : řádek IISSP
                    });
                    myGridFormat.addTextColumn({
                        name: "ixs_hpr",
                        caption: "jres:30250502", //RC 30250502 : Případ
                        width: 110,
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "ixs_hpr", caption: "jres:30250502" }) //RC 30250502 : Případ
                        //maxLength: 9
                    });
                    myGridFormat.addTextColumn({
                        name: "typ_ag",
                        caption: "jres:31100079", //RC 31100079 : Agenda
                        width: 70,
                        cellTemplate: "{typ_ag_txt:trim:encode}",
                        grouping: {
                            aggregate: Gordic.Data.Aggregates.first("typ_ag_txt"),
                        },
                        serverFilter: Gordic.Ucr.WebClient.FilterPrefabs.typ_ag({ model: "typ_ag", zkr_agPath: "typ_ag_txt", isRozpocet: true, caption: "jres:31100079" }) //RC 31100079 : Agenda
                    });
                    if (that.LICMO) {
                        myGridFormat.addTextColumn({
                            name: "nks",
                            caption: this.Globals.Zkratky?.Nks,
                            description: "jres:30250503", //RC 30250503 : NS navázané položky smlouvy"
                            width: 60,
                            //group: topoGroup,
                            serverFilter: Gordic.Eko.Filters.nksInterval(this.filterOptions.nks)
                        });
                    }
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
                    myGridFormat.addTextColumn({
                        name: "s_vyriz_rezsp",
                        caption: "jres:30250504", //RC 30250504 : Stav
                        width: 90,
                        cellTemplate: "{s_vyriz_rezsp_txt:trim:encode}",
                        grouping: {
                            aggregate: Gordic.Data.Aggregates.first("s_vyriz_rezsp_txt"),
                        },
                        serverFilter: Gordic.Ucr.WebClient.FilterPrefabs.s_vyriz_rezsp({ model: "s_vyriz_rezsp", caption: "jres:30250504" }) //RC 30250504 : Stav
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_rsp_gin",
                        caption: "jres:30250505", //RC 30250505 : Prostředky GINIS
                        description: "jres:30250506", //RC 30250506 : Výše prostředků v IS GINIS odpovídajícím rezervaci v IISSP
                        width: 120,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_rsp_isp",
                        caption: "jres:30250509", //RC 30250509 : Rezervováno IISSP
                        width: 120,
                    });
                    myGridFormat.addIconColumn({
                        name: "c_rsp_isp2",
                        caption: "jres:30250526", //RC 30250526 : Rezervováno GINIS X IISSP
                        width: 39, // fixedWidth: true,
                        customClass: "center",
                        iconTemplate: function (data, meta) {
                            if (meta?._isVirtual)
                                return null;
                            const c_rsp_gin = parseDecimal(data.c_rsp_gin ?? 0);
                            const c_rsp_isp = parseDecimal(data.c_rsp_isp ?? 0);
                            const s_rezsp_isp = parseDecimal(data.s_rezsp_isp ?? 0);
                            const s_vyriz_rezsp = parseDecimal(data.s_vyriz_rezsp ?? 0);
                            const nula = parseDecimal(0);
                            if (s_rezsp_isp.equals(parseDecimal(1)) && c_rsp_isp.equals(nula) /*data.c_rsp_gin === 0*/) {
                                return {
                                    icon: "gi-schvaleno_vyrizeno_uzavreno", text: "jres:30250508", //RC 30250508 : Položka snížena na úrověň čerpání a je uzavřena v GINIS i IISSP
                                };
                            }
                            if (typeof data.c_rsp_isp !== "undefined" && data.c_rsp_isp !== null && !c_rsp_gin.equals(c_rsp_isp)) {
                                //if (data.c_rsp_isp!=null && data.c_rsp_gin !== data.c_rsp_isp) {
                                if (s_vyriz_rezsp.greaterThan(nula))
                                    return {
                                        icon: "fa-exclamation-triangle g-state-text g-state-important", text: "jres:30250513", //RC 30250513 : Stavy rezervací IS GINIS a IISSP nesouhlasí!
                                    };
                                return {
                                    icon: "fa-check-circle g-state-text g-state-warning", text: "jres:30250514", //RC 30250514 : Rezervaci je nutné aktualizovat do IISSP
                                };
                            }
                            return null;
                        }
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_cerp_xma",
                        caption: "jres:30250510", //RC 30250510 : Čerpáno GINIS deník
                        width: 120,
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_cerp_gin",
                        caption: "jres:30250524", //RC 30250524 : Čerpáno GINIS PRSK
                        width: 120,
                    });
                    myGridFormat.addIconColumn({
                        name: "c_cerp_gin2",
                        caption: "jres:30250527", //RC 30250527 : Čerpáno GINIS PRSK X IISSP
                        width: 39, // fixedWidth: true,
                        customClass: "center",
                        iconTemplate: function (data, meta) {
                            if (meta?._isVirtual)
                                return null;
                            let c_cerp_xma = parseDecimal(data.c_cerp_xma ?? 0);
                            let c_cerp_gin = parseDecimal(data.c_cerp_gin ?? 0);
                            if (!c_cerp_xma.equals(c_cerp_gin)) {
                                //if (data.c_cerp_xma !== data.c_cerp_gin) {
                                return {
                                    icon: "fa-exclamation-triangle g-state-text g-state-warning", text: "jres:30250512", //RC 30250512 : Není proveden přepočet stavů PRSK
                                };
                            }
                            return null;
                        }
                    });
                    myGridFormat.addCurrencyColumn({
                        name: "c_cerp_isp",
                        caption: "jres:30250516", //RC 30250516 : Čerpáno IISSP
                        width: 120,
                        visible: false
                    });
                    myGridFormat.addIconColumn({
                        name: "c_cerp_isp2",
                        caption: "jres:30250528", //RC 30250528 : Čerpáno GINIS X IISSP
                        width: 39, // fixedWidth: true,
                        customClass: "center",
                        iconTemplate: function (data, meta) {
                            if (meta?._isVirtual)
                                return null;
                            let gin = parseDecimal(data.c_cerp_gin ?? 0);
                            let isp = parseDecimal(data.c_cerp_isp ?? 0);
                            if (!gin.equals(isp)) {
                                return {
                                    icon: "fa-exclamation-triangle g-state-text g-state-warning", text: "jres:30250515", //RC 30250515 : Není provedeno přeúčtování skutečnosti v IISSP
                                };
                            }
                            return null;
                        }
                    });
                    myGridFormat.addTextColumn({
                        name: "denmes",
                        caption: "jres:30250520", //RC 30250520 : Dat.čerp.
                        width: 60, // fixedWidth: true,
                        customClass: "center",
                        cellTemplate: function (data) {
                            //var font = "font-weight: bold;";
                            if (typeof data.denmes === "undefined" || data.denmes === null)
                                return "";
                            let denmes = data.denmes;
                            let den = denmes % 32;
                            let mesic = Math.floor(denmes / 32);
                            //return $("<span>", { text: "" + den + "." + mesic + ".", title: ""/*, "style": font*/ });
                            return $("<span>", { text: "{0}.{1}.".format(den, mesic), title: "" /*, "style": font*/ });
                        }
                        //cellTemplate: function (row, meta, cellInfo) {
                        //    if (row.denmes == null )T return "";
                        //    var den = row.denmes % 32;
                        //    var mesic = row.denmes / 32;
                        //    return "{0}.{1}.".format( den, mesic);
                        //},
                    });
                    myGridFormat.addDateTimeColumn({
                        name: "dat_cerp_isp",
                        caption: "jres:30250518", //RC 30250518 : Stav IISSP k
                        width: 120,
                        visible: false
                    });
                    myGridFormat.addDateColumn({
                        name: "dat_rad_iissp",
                        caption: "jres:30250519", //RC 30250519 : K čerpání od
                        width: 110,
                    });
                    return myGridFormat;
                }
            }
            WebClient.GSeznamIISSPStavyStavyRezervaci = GSeznamIISSPStavyStavyRezervaci;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUlJU1NQU3RhdnlTdGF2eVJlemVydmFjaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTZXpuYW1JSVNTUFN0YXZ5U3RhdnlSZXplcnZhY2kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQThzQmY7QUE5c0JELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQThzQm5CO0lBOXNCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBOHNCN0I7UUE5c0JvQixXQUFBLFNBQVM7WUFFMUI7Ozs7O2VBS0c7WUFDSCxNQUFhLCtCQUFnQyxTQUFRLFVBQUEsZ0JBQWdCO2dCQUFyRTs7b0JBS0ksc0NBQXNDO29CQUN0Qyx3Q0FBd0M7b0JBQzlCLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO29CQUNuQixVQUFLLEdBQVksS0FBSyxDQUFDO29CQThuQi9CLEtBQUs7b0JBQ0wsZ0NBQWdDO29CQUNoQyxrQkFBa0I7b0JBQ2xCLEtBQUs7b0JBQ0wscUhBQXFIO29CQUVySCx1R0FBdUc7b0JBQ3ZHLEdBQUc7b0JBQ0gsS0FBSztvQkFDTCw2QkFBNkI7b0JBQzdCLEtBQUs7b0JBQ0wsYUFBYTtvQkFDYixLQUFLO29CQUNMLCtKQUErSjtvQkFDL0osY0FBYztvQkFDZCx3Q0FBd0M7b0JBQ3hDLDJCQUEyQjtvQkFDM0IsUUFBUTtvQkFDUixHQUFHO29CQUNILEtBQUs7b0JBQ0wsaUJBQWlCO29CQUNqQixLQUFLO29CQUNMLDRDQUE0QztvQkFDNUMsc0JBQXNCO29CQUN0Qiw2QkFBNkI7b0JBQzdCLGdFQUFnRTtvQkFFaEUscUVBQXFFO29CQUVyRSwrQ0FBK0M7b0JBQy9DLCtDQUErQztvQkFFL0MsZ0NBQWdDO29CQUNoQywrREFBK0Q7b0JBQy9ELHlGQUF5RjtvQkFDekYsbUNBQW1DO29CQUNuQyxtQ0FBbUM7b0JBQ25DLHVCQUF1QjtvQkFHdkIsc0dBQXNHO29CQUN0Ryx3QkFBd0I7b0JBQ3hCLDJDQUEyQztvQkFDM0MsK0JB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c0JuQjtBQUFELENBQUMsRUE5c0JTLE1BQU0sS0FBTixNQUFNLFFBOHNCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJSVNTUCBzdGF2eSAtIFN0YXZ5IHJlemVydmFjaVxyXG4gICAgICogXHJcbiAgICAgKiBAYXV0aG9yIHRrYXJlc1xyXG4gICAgICogQHNpbmNlIDQ4NC4xLjAuNjlcclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGNsYXNzIEdTZXpuYW1JSVNTUFN0YXZ5U3RhdnlSZXplcnZhY2kgZXh0ZW5kcyBHU2V6bmFtSUlTU1BCYXNlIGltcGxlbWVudHMgSUdDb250ZW50e1xyXG5cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIEZpbk1pc3RvOiBzdHJpbmc7ICAgLy8gZmluYW5jbmkgbWlzdG9cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIF9uZXN0YXplbmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAvL3ByaXZhdGUgX25lc291aGxhc25lOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgcHJvdGVjdGVkIHBvdXplU0NoeWJvdSA9IDA7XHJcbiAgICAgICAgcHJpdmF0ZSBMSUNNTzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIG9uQ29udGVudFJlYWR5KCk6IHZvaWQgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3RoaXMuaXNsVmlld1VzZSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIG11bHRpIHZ5YmVyXHJcbiAgICAgICAgICAgIHRoaXMubXVsdGlTZWxlY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyBzdW1hcml6YWNuaSByYWRla1xyXG4gICAgICAgICAgICB0aGlzLnN1bVJvdyA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5teUtleXMgPSBcImljbyxyb2ssbWVzZGVuLHNrX3ZsLGJ1X3ZsLGlkX2hkcl9yaXMscmFkZWtfaGRyLHhmaW11eix1Y3MsdXVzXCI7XHJcbiAgICAgICAgICAgIHRoaXMudGFza0xpc3QgPSB0aGlzLnBhcmVudENudC5pc2wuVWNyUmlzcmVJaXNzcC5saXN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFza0NvdW50ID0gdGhpcy5wYXJlbnRDbnQuaXNsLlVjclJpc3JlSWlzc3AuY291bnQoKTtcclxuICAgICAgICAgICAgdGhpcy5MSUNNTyA9IHRoaXMucGFyZW50Q250W1wiTElDTU9cIl07XHJcbiAgICAgICAgICAgIHN1cGVyLm9uQ29udGVudFJlYWR5KCk7XHJcbiAgICAgICAgICAgIC8vbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLkZpbk1pc3RvID0gdGhpcy5wYXJlbnRDbnRbXCJGaW5NaXN0b1wiXTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5GaW5NaXN0by50cmltKCkgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiYXBwbHlcIiwgeyBpc3BfZmltOiB7IHN0YXJ0OiB0aGlzLkZpbk1pc3RvLCBlbmQ6IHRoaXMuRmluTWlzdG8gfSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGFrY2lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVBY3Rpb25zKCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmFjdGlvbnMuYWRkUmFuZ2UoeyAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICBhY3RPdmVyaXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE92ZXJpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJnaS1saXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNTIyXCIsIC8vUkMgMzAyNTA1MjIgOiBPdsSbxZlpdCBzdGF2XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5hY3Rpb25zIVtcImFjdE92ZXJpdFwiXSEuc2V0UGVuZGluZyh0aGF0Lk92ZXJpdFN0YXYoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vKHRoaXMgYXMgdW5rbm93biBhcyBHQWN0aW9uKS5zZXRQZW5kaW5nKHRoYXQuT3Zlcml0U3RhdigpKSAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWw6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9uYW1lOiBcImFjdERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWNvbjogXCJnaS1saXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jYXB0aW9uOiBcImpyZXM6MzAyNTA1MjNcIiwgLy9SQyAzMDI1MDUyMyA6IERldGFpbFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5EZXRhaWwoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdElpc3NwUmVzRGV0YWlsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RJaXNzcFJlc0RldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtYnVnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJJaXNzcFJlc0RldGFpbCAoREVCVUcpXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiVGF0byBha2NlIHNlIHpvYnJhenVqZSBwb3V6ZSB2IERFQlVHdS4gRG8gVUNSIG5lcGF0cmksIHNsb3V6aSBwcm8gZGVtb25zdHJhY25pIHVjZWx5IHRhc2t1IFQ0MzQ2MFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kZWJ1Z1Nob3dJaXNzcFJlc0RldGFpbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT3Zlcml0IHN0YXZcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgT3Zlcml0U3RhdigpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBpbnB1dDogR29yZGljLklpc3NwLkludGVyZmFjZS5HSWlzc3BSZXplcnZhY2VEdG9bXSA9IFtdO1xyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAvLyBuYWN0ZW5pIHZ5YnJhbnljaCByYWRrdVxyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFJvd3MgPSBncmlkLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSaXNyZUlJc3NwRHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgLy8gcG9rdWQgbmVqc291IHJhZGt5LCBuaWMgbmVkZWxlalxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRSb3dzLmxlbmd0aCA9PT0gMCkgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBwcmV2ZWRlbmkgdnlicmFueWNoIHJhZGt1IG5hIHZzdHVwXHJcbiAgICAgICAgICAgIHNlbGVjdGVkUm93cy5mb3JFYWNoKChyb3cpID0+IHtcclxuICAgICAgICAgICAgICAgIGlucHV0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGljbzogdGhhdC5HbG9iYWxzLkVrb1BhcmFtcz8uSUNPXHJcbiAgICAgICAgICAgICAgICAgICAgLCByb2s6IHRoYXQuR2xvYmFscy5Fa29QYXJhbXM/LlJva1xyXG4gICAgICAgICAgICAgICAgICAgICwgdWNzOiB0aGF0Lkdsb2JhbHMuRWtvUGFyYW1zPy5VQ1NcclxuICAgICAgICAgICAgICAgICAgICAsIGlkX2hkcjogcm93LmlkX2hkclxyXG4gICAgICAgICAgICAgICAgICAgICwgaWRfaGRyX3Jpczogcm93LmlkX2hkcl9yaXNcclxuICAgICAgICAgICAgICAgICAgICAsIGl4c19ocHI6IHJvdy5peHNfaHByXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5wYXJlbnRDbnQuaXNsLklpc3NwUmV6ZXJ2YWNlLm5hY3RpUmV6ZXJ2YWNpSHJvbWFkbmVDb21taXQoeyByZXplcnZhY2VfbGlzdDogaW5wdXQgfSApXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICpkZXRhaWxcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBEZXRhaWwoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCBzZWwgPSBncmlkLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSaXNyZUlJc3NwRHRvPihcImdldFNlbGVjdGlvblwiKVswXTtcclxuICAgICAgICAgICAgaWYgKCFzZWwpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVrb1BhcmFtcyA9IHRoaXMuR2xvYmFscy5Fa29QYXJhbXMhO1xyXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zOiBHb3JkaWMuSWlzc3AuV2ViQ29udHJvbHMuSUdJaXNzcFJlekRldGFpbEV4dE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICBpeHNfaHByOiBzZWwuaXhzX2hwciEsXHJcbiAgICAgICAgICAgICAgICBpZF9oZHI6IHNlbC5pZF9oZHIhLFxyXG4gICAgICAgICAgICAgICAgaWRfaGRyX3Jpczogc2VsLmlkX2hkcl9yaXMhLFxyXG4gICAgICAgICAgICAgICAgcmFkZWtfaGRyX3Jpczogc2VsLnJhZGVrX2hkcl9yaXMhLFxyXG4gICAgICAgICAgICAgICAgaWNvOiBla29QYXJhbXMuSUNPISxcclxuICAgICAgICAgICAgICAgIHVjczogZWtvUGFyYW1zLlVDUyEsXHJcbiAgICAgICAgICAgICAgICByb2s6IGVrb1BhcmFtcy5Sb2shLFxyXG4gICAgICAgICAgICAgICAgdm9sYXRXZWJTbHV6YnU6IGZhbHNlLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubmF2aWdhdGUoW0dvcmRpYy5JaXNzcC5XZWJDb250cm9scy5HSWlzc3BSZXpEZXRhaWxFeHQsIHsgdWlkOiBcIkdJaXNzcFJlekRldGFpbEV4dCNcIiB9XSwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRlYnVnU2hvd0lpc3NwUmVzRGV0YWlsKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3Qgc2VsID0gZ3JpZC5nZ3JpZDxHb3JkaWMuVWN0LkludGVyZmFjZS5HUmlzcmVJSXNzcER0bz4oXCJnZXRTZWxlY3Rpb25cIilbMF07XHJcbiAgICAgICAgICAgIGlmICghc2VsKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBjb25zdCBla29QYXJhbXMgPSB0aGlzLkdsb2JhbHMuRWtvUGFyYW1zITtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogR29yZGljLklpc3NwLldlYkNvbnRyb2xzLklHSWlzc3BSZXpEZXRhaWxPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgaXhzX2hwcjogc2VsLml4c19ocHIhLFxyXG4gICAgICAgICAgICAgICAgaWRfaGRyOiBzZWwuaWRfaGRyISxcclxuICAgICAgICAgICAgICAgIGlkX2hkcl9yaXM6IHNlbC5pZF9oZHJfcmlzISxcclxuICAgICAgICAgICAgICAgIHJhZGVrX2hkcl9yaXM6IHNlbC5yYWRla19oZHJfcmlzISxcclxuICAgICAgICAgICAgICAgIGljbzogZWtvUGFyYW1zLklDTyEsXHJcbiAgICAgICAgICAgICAgICB1Y3M6IGVrb1BhcmFtcy5VQ1MhLFxyXG4gICAgICAgICAgICAgICAgcm9rOiBla29QYXJhbXMuUm9rISxcclxuICAgICAgICAgICAgICAgIHZvbGF0V2ViU2x1emJ1OiBmYWxzZSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250Lm5hdmlnYXRlKFtHb3JkaWMuSWlzc3AuV2ViQ29udHJvbHMuR0lpc3NwUmV6RGV0YWlsLCB7IHVpZDogXCJHSWlzc3BSZXpEZXRhaWwjXCIgfV0sIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pIHByaXN0dXBub3N0aSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgbmFzdGF2ZW5pQWtjaSgpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgLy8gcG9rdWQgbmVuaSBncmlkLCBuaWMgbmVkZWxlalxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnRDbnQuY2xvc2VkICkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZpZXcgPSBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgbGV0IHJvd3MgPSBncmlkLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdTZXpuYW1WeWthenVEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBsZXQgcG9jZXQgPSB2aWV3LmdldENvdW50KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgcm93OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUmlzcmVJSXNzcER0byA9IHt9O1xyXG4gICAgICAgICAgICBpZiAocG9jZXQgPiAwKVxyXG4gICAgICAgICAgICAgICAgcm93ID0gcm93c1swXVxyXG4gICAgICAgICAgICAvLyBvdmVyaXQgc3RhdlxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFjdE92ZXJpdD8udXBkYXRlKHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHBvY2V0ID4gMCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBkZXRhaWxcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hY3REZXRhaWw/LnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBwb2NldCA+IDAgLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVmaW5pY2UgbWVudWJhcnVcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBEZWZpbmVNZW51QmFyKCk6IE1lbnVQYXJhbXNbXSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWVudVBhcjogTWVudVBhcmFtc1tdID1cclxuICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hY3RPdmVyaXQsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWN0RGV0YWlsLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudENudC5wcm9wKFwiRGVidWdPckRldmVsb3BWZXJzaW9uXCIpKVxyXG4gICAgICAgICAgICAgICAgbWVudVBhci5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFjdElpc3NwUmVzRGV0YWlsIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1lbnVQYXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBWeXR2b3JlbmkgZ3JpZHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkMigpIHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvL2xldCBwcm92aWRlciA9IG5ldyBHb3JkaWMuRGF0YS5Qcm92aWRlcjxhbnksIGFueSwgYW55PigoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQubG9hZGluZ0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyAgICByZXR1cm4gdGhhdC5sb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAvL2xldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXc8R29yZGljLlVjdC5JbnRlcmZhY2UuR1Jpc3JlSUlzc3BEdG8+KFtdLCB7XHJcbiAgICAgICAgICAgIC8vICAgIHByb2Nlc3NvcnM6IHsgcHJvdmlkZXI6IHByb3ZpZGVyIH1cclxuICAgICAgICAgICAgLy8gICAgLy8sIGtleTogXCJpeHNfdmt6LHBvcl9jaXNsb1wiXHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICBsZXQgaXNsVmlldyA9IHRoaXMuY3JlYXRlTGlzdFZpZXcoKTtcclxuICAgICAgICAgICAgbGV0IHNsb3VwY2UgPSB0aGF0LmNyZWF0ZUdyaWRGb3JtYXQoKTtcclxuICAgICAgICAgICAgLy92YXIgZGVmYXVsdFByb2ZpbGUgPSBzbG91cGNlLmNvbHVtbnM7Ly9zbG91cGNlLmNvbHVtbnMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLm5hbWU/LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcInZsYXN0bm9zdFwiKSA9PT0gLTEpXHJcbiAgICAgICAgICAgIGxldCBzdW1Db2xzOiBzdHJpbmdbXSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgLy8gc291Y3RvdmUgc2xvdXBjZVxyXG4gICAgICAgICAgICBzdW1Db2xzID0gc2xvdXBjZS5jb2x1bW5zLmZpbHRlcihjID0+IChjLmNvbHVtblR5cGUgPT0gXCJjdXJyZW5jeVwiIHx8IGMuY29sdW1uVHlwZSA9PSBcIm51bWJlclwiKSAmJiAoYy5jYXB0aW9uIS5pbmRleE9mKFwiJVwiKSA9PSAtMSkgJiYgKFwicmFkZWtfaGRyLGRlbm1lc1wiLmluZGV4T2YoYy5uYW1lISkpID09IC0xKS5tYXAoZSA9PiBlLm5hbWUpIGFzIHN0cmluZ1tdO1xyXG5cclxuICAgICAgICAgICAgLypjb25zdCBncmlkID0qLyAkLm5ld0Rpdih0aGlzLmNsYXNzR3JpZClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLnBhcmVudENudC5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogaXNsVmlldyxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBzbG91cGNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7IG5hbWU6IFwiZGVmYXVsdFwiLCBjb2x1bW5MaXN0OiBzbG91cGNlLmNvbHVtbnMubWFwKChjKSA9PiBjLm5hbWUpLmpvaW4oXCIsXCIpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYW1lOiBcInVzZXJQcm9maWxlXCIsIGNvbHVtbkxpc3Q6IHNsb3VwY2UuY29sdW1ucy5tYXAoKGMpID0+IGMubmFtZSkuam9pbihcIixcIikgfSxcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVWaXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUm93U2VsZWN0ZWRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCk9PiB0aGlzLkRldGFpbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmdW5jdGlvbiAoZXYsIGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlBa2NpKCk7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWRyb3dzY2FsYygpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWRla28oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzb3XEjXRvdsO9IMWZw6FkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeVJvd0FsbG93ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnlSb3dDb2x1bW5zOiBzdW1Db2xzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25nTGlzdE1vZGVsOiBcIkdsb2JhbC5VY3IuQXBwU2V0dGluZ3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGxvdWjDvSBzZXpuYW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ0xpc3RBbGxvd2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xvbmdMaXN0TW9kaWZ5UnFNZXRob2Q6IChycSkgPT4gdGhhdC5hbGxvd2VkTGlzdChycSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvbmdMaXN0Q291bnRNZXRob2Q6IChycSkgPT4gdGhhdC5nZXRDYWxsQ291bnQoKSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSB2aWV3IHBybyBsaXN0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlTGlzdFZpZXcyKCk6IEdvcmRpYy5Jc2wuVmlldyB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwiU3RhcnQgY3JlYXRlTGlzdFZpZXcgR1Nlem5hbUVrb1phem5hbXVCYXNlXCIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuSXNsLlZpZXc8SUdTZXpuYW1aYXBpc3VTdGF2dUR0b1dpdGhUYWJTZXR0aW5ncz4oXHJcbiAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5pc2wuVWNyUmlzcmVJaXNzcC5saXN0KCkudXNlKChyZXEsIG5leHQsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnBhcmVudENudC5jbG9zZWQpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJ0YXNrTGlzdC51c2UgcmVxOlwiLCByZXEpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSAgdGhhdC5nZXRGaWx0ZXJEYXRhKCByZXEsIG5leHQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IG5leHQocmVzdWx0KSk7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBwcmlzdHVwbm9zdGkgYWtjaSBkbGUgbmFjdGVueWNoIGRhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5hc3RhdmVuaUFrY2koKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICB7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJQYW5lbDogdGhhdC5nZXRGaWx0ZXIoKSxcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiaWNvLHJvayxtZXNkZW4sc2tfdmwsYnVfdmwsaWRfaGRyX3JpcyxyYWRla19oZHIseGZpbXV6LHVjcyx1dXNcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3N0YXJ0RW1wdHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wcm9jZXNzb3JzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgc3VtYXJlOiB0aGF0LnN1bWFyZV9wcm9jZXNzb3JcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcmFjaSBJU0wgbWV0b2R1IHBybyB6amlzdGVuaSBwb2N0dSB6YXpuYW11XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0Q2FsbENvdW50MigpOiBKUXVlcnlQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBHU2V6bmFtSUlTU1BTdGF2eVN0YXZ5UmV6ZXJ2YWNpLmdldENhbGxDb3VudFwiKTtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5wYXJlbnRDbnQuaXNsLlVjclJpc3JlSWlzc3AuY291bnQoKVxyXG4gICAgICAgICAgICAgICAgLnVzZSgocmVxLCBuZXh0LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiB0aGF0LmdldEZpbHRlckRhdGEodGhhdCwgcmVxLCBuZXh0KSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZ2V0RmlsdGVyRGF0YSggcmVxLCBuZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiAgbmV4dChyZXN1bHQpKTsgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgICogTmFjdGkgZmlsdHJ5XHJcbiAgICAgICAgICAgKiBAcGFyYW0gdGhhdFxyXG4gICAgICAgICAgICogQHBhcmFtIHJlcVxyXG4gICAgICAgICAgICogQHBhcmFtIG5leHRcclxuICAgICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXRGaWx0ZXJEYXRhKHJlcTogSXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIG5leHQ6IElzbC5UYXNrUnVudGltZU5leHQ8SXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxhbnk+PiB8IElzbC5UYXNrUnVudGltZU5leHQ8SXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIG51bWJlcj4pOiBKUXVlcnlQcm9taXNlPElzbC5HU2VydmljZUxpc3RSZXF1ZXN0PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcIlN0YXJ0IEdTZXpuYW1JSVNTUFN0YXZ5U3RhdnlSZXplcnZhY2kuZ2V0RmlsdGVyRGF0YVwiKTtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gc3VwZXIuZ2V0RmlsdGVyRGF0YShyZXEsIG5leHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XHJcbiAgICAgICAgICAgICAgICAudGhlbigobmV3UmVxdWVzdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIG5ld1JlcXVlc3QgPSAkLmV4dGVuZCh0cnVlLCB7fSwgcmVxKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdHI6IFVjdC5JbnRlcmZhY2UuR1Jpc3JlSUlzc3BGaWx0ZXJEdG8gPSBuZXdSZXF1ZXN0LmZpbHRlcnMgYXMgVWN0LkludGVyZmFjZS5HUmlzcmVJSXNzcEZpbHRlckR0bztcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wb3V6ZVNDaHlib3UgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRyLmNoeWJhID0geyB2OiB0aGlzLnBvdXplU0NoeWJvdSwgbzogXCI9XCIgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1JlcXVlc3RbXCJmaWx0ZXJzXCJdID0gZmlsdHI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld1JlcXVlc3Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICAvL3JldHVybiB0aGF0LmdldEZpbHRlck0oKVxyXG4gICAgICAgICAgICAvLyAgICAudGhlbigobmV3RmlsdGVyOiBVY3QuSW50ZXJmYWNlLkdSaXNyZUlJc3NwRmlsdGVyRHRvICkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdmFyIG5ld1JlcXVlc3QgPSAkLmV4dGVuZCh0cnVlLCB7fSwgcmVxKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gICAgICAgIGlmICh0aGlzLnBvdXplU0NoeWJvdSA+IDApIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBuZXdGaWx0ZXIuY2h5YmEgPSB7IHY6IHRoaXMucG91emVTQ2h5Ym91LCBvOiBcIj1cIiB9O1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBuZXdSZXF1ZXN0W1wiZmlsdGVyc1wiXSA9IG5ld0ZpbHRlcjtcclxuICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gbmV3UmVxdWVzdDtcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvLyAgICApXHJcbiAgICAgICAgICAgIC8vICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnJhY2kgb2JqZWt0IGZpbHRydVxyXG4gICAgICAgICAqIEBwYXJhbSB7R0NvbnRlbnR9IGNvbnRlbnRcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBnZXRGaWx0ZXJHcmlkMigpOiBKUXVlcnlQcm9taXNlPGFueT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJTdGFydCBnZXRGaWx0ZXIgXCIpO1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVyRHRvID0ge307XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcjxVY3QuSW50ZXJmYWNlLkdSaXNyZUlJc3NwRmlsdGVyRHRvPihcImNvbGxlY3RcIiwgZmlsdGVyRHRvKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cudHJhY2UoXCJmaWx0ZXJcIiwgZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3JlbmkgZ3JpZGZvcm1hdHUgZGxlIHByZWRsb2h5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HUmlzcmVJSXNzcER0bz4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBteUdyaWRGb3JtYXQgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HUmlzcmVJSXNzcER0bz4oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRfaGRyX3Jpc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgyXCIsIC8vUkMgMzExMDAwODIgOiBJRCBJSVNTUFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1NVwiLCAvL1JDIDMxMTAwMjU1IDogSWRlbnRpZmlrw6F0b3IgcmV6ZXJ2YWNlIHJvenBvxI10b3bDvWNoIHByb3N0xZllZGvFryBJSVNTUFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpZF9oZHJfcmlzXCIsIGNhcHRpb246IFwianJlczozMTEwMDA4MlwiLCAgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDkgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA5IH0gfSkgLy9SQyAzMTEwMDA4MiA6IElEIElJU1NQXHJcbiAgICAgICAgICAgICAgICAvL21heExlbmd0aDogOVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX2hkclwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNTAxXCIsLy9SQyAzMDI1MDUwMSA6ICNcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA1MDBcIiwgLy9SQyAzMDI1MDUwMCA6IMWYw6FkZWsgSUlTU1BcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA0MCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7IG1vZGVsOiBcInJhZGVrX2hkclwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwODNcIiwgfSkgLy9SQyAzMTEwMDA4MyA6IMWZw6FkZWsgSUlTU1BcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2hwclwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNTAyXCIsIC8vUkMgMzAyNTA1MDIgOiBQxZnDrXBhZFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXhzX2hwclwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA1MDJcIiB9KSAvL1JDIDMwMjUwNTAyIDogUMWZw61wYWRcclxuICAgICAgICAgICAgICAgIC8vbWF4TGVuZ3RoOiA5XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX2FnXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzlcIiwgLy9SQyAzMTEwMDA3OSA6IEFnZW5kYVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDcwLFxyXG4gICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiBcInt0eXBfYWdfdHh0OnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXBpbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJ0eXBfYWdfdHh0XCIpLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLlVjci5XZWJDbGllbnQuRmlsdGVyUHJlZmFicy50eXBfYWcoeyBtb2RlbDogXCJ0eXBfYWdcIiwgemtyX2FnUGF0aDogXCJ0eXBfYWdfdHh0XCIsIGlzUm96cG9jZXQ6IHRydWUsIGNhcHRpb246IFwianJlczozMTEwMDA3OVwiIH0pIC8vUkMgMzExMDAwNzkgOiBBZ2VuZGFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LkxJQ01PKSB7XHJcbiAgICAgICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLkdsb2JhbHMuWmtyYXRreT8uTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA1MDNcIiwgLy9SQyAzMDI1MDUwMyA6IE5TIG5hdsOhemFuw6kgcG9sb8W+a3kgc21sb3V2eVwiXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMubmtzKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX2ZpbVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzU2XCIsIC8vUkMgMzAyNTAzNTYgOiBGSU0gICAgIFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDQzMFwiLCAvL1JDIDMwMjUwNDMwIDogRmluYW7EjW7DrSBtw61zdG9cclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX2ZpbVwiLCBkaXNhYmxlZDp0cnVlLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNTZcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDcgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA3LCBhbGxvd2VkQ2hhcnM6IFwiMDEyMzQ1Njc4OVwiIH0gfSksIC8vUkMgMzAyNTAzNTYgOiBGSU1cclxuICAgICAgICAgICAgICAgIHdpZHRoOiA3NSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3pkclwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzU3XCIsIC8vUkMgMzAyNTAzNTcgOiBaRFJcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA3MCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX3pkclwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNTdcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDcgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA3IH0gfSksIC8vUkMgMzAyNTAzNTcgOiBaRFJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3BhclwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzU4XCIsIC8vUkMgMzAyNTAzNTggOiBQQVJcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX3BhclwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNThcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDYgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA2IH0gfSksIC8vUkMgMzAyNTAzNTggOiBQQVJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3BvbFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzU5XCIsIC8vUkMgMzAyNTAzNTkgOiBQT0xcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX3BvbFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNTlcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDQgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA0IH0gfSksIC8vUkMgMzAyNTAzNTkgOiBQT0xcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX2Vkc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzYwXCIsIC8vUkMgMzAyNTAzNjAgOiBFRFMvU01WU1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX2Vkc1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNjBcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDEzIH0sIHNlY29uZEZpZWxkOiB7IG1heExlbmd0aDogMTMgfSB9KSwgLy9SQyAzMDI1MDM2MCA6IEVEUy9TTVZTXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImlzcF9wdnNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM2MVwiLCAvL1JDIDMwMjUwMzYxIDogUFZTXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogOTAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImlzcF9wdnNcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzYxXCIsIGZpcnN0RmllbGQ6IHsgbWF4TGVuZ3RoOiAxMCB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDEwIH0gfSksIC8vUkMgMzAyNTAzNjEgOiBQVlNcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3VjbFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzYyXCIsIC8vUkMgMzAyNTAzNjIgOiBVQ0xcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA5MCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX3VjbFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAzNjJcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDkgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA5IH0gfSksIC8vUkMgMzAyNTAzNjIgOiBVQ0xcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImlzcF96alwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDc0XCIsIC8vUkMgMzAyNTA0NzQgOiBaSlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDkwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpc3BfempcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNDc0XCIsIGZpcnN0RmllbGQ6IHsgbWF4TGVuZ3RoOiAzIH0sIHNlY29uZEZpZWxkOiB7IG1heExlbmd0aDogMyB9IH0pLCAvL1JDIDMwMjUwNDc0IDogWkpcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXNwX3VqXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NzVcIiwgLy9SQyAzMDI1MDQ3NSA6IFVKXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogOTAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImlzcF91alwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA0NzVcIiwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDYgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA2IH0gfSksIC8vUkMgMzAyNTA0NzUgOiBVSlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpc3BfdXpcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDQ3NlwiLCAvL1JDIDMwMjUwNDc2IDogVVpcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA5MCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaXNwX3V6XCIsIGNhcHRpb246IFwianJlczozMDI1MDQ3NlwiLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogNSB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDUgfSB9KSwgLy9SQyAzMDI1MDQ3NiA6IFVaXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzX3Z5cml6X3JlenNwXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA1MDRcIiwgLy9SQyAzMDI1MDUwNCA6IFN0YXZcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA5MCxcclxuICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogXCJ7c192eXJpel9yZXpzcF90eHQ6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICBncm91cGluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcInNfdnlyaXpfcmV6c3BfdHh0XCIpLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLlVjci5XZWJDbGllbnQuRmlsdGVyUHJlZmFicy5zX3Z5cml6X3JlenNwKHsgbW9kZWw6IFwic192eXJpel9yZXpzcFwiLCAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNTA0XCIgfSkgLy9SQyAzMDI1MDUwNCA6IFN0YXZcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19yc3BfZ2luXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA1MDVcIiwgLy9SQyAzMDI1MDUwNSA6IFByb3N0xZllZGt5IEdJTklTXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNTA2XCIsIC8vUkMgMzAyNTA1MDYgOiBWw73FoWUgcHJvc3TFmWVka8WvIHYgSVMgR0lOSVMgb2Rwb3bDrWRhasOtY8OtbSByZXplcnZhY2kgdiBJSVNTUFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfcnNwX2lzcFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNTA5XCIsIC8vUkMgMzAyNTA1MDkgOiBSZXplcnZvdsOhbm8gSUlTU1BcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX3JzcF9pc3AyXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA1MjZcIiwgLy9SQyAzMDI1MDUyNiA6IFJlemVydm92w6FubyBHSU5JUyBYIElJU1NQXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzksLy8gZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImNlbnRlclwiLFxyXG5cclxuICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEsbWV0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXRhPy5faXNWaXJ0dWFsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjX3JzcF9naW4gPSBwYXJzZURlY2ltYWwoZGF0YS5jX3JzcF9naW4gPz8gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY19yc3BfaXNwID0gcGFyc2VEZWNpbWFsKGRhdGEuY19yc3BfaXNwID8/IDApOyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNfcmV6c3BfaXNwID0gcGFyc2VEZWNpbWFsKGRhdGEuc19yZXpzcF9pc3AgPz8gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc192eXJpel9yZXpzcCA9IHBhcnNlRGVjaW1hbChkYXRhLnNfdnlyaXpfcmV6c3AgPz8gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbnVsYSA9IHBhcnNlRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc19yZXpzcF9pc3AuZXF1YWxzKHBhcnNlRGVjaW1hbCgxKSkgJiYgY19yc3BfaXNwLmVxdWFscyhudWxhKS8qZGF0YS5jX3JzcF9naW4gPT09IDAqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1zY2h2YWxlbm9fdnlyaXplbm9fdXphdnJlbm9cIiwgdGV4dDogXCJqcmVzOjMwMjUwNTA4XCIsIC8vUkMgMzAyNTA1MDggOiBQb2xvxb5rYSBzbsOtxb5lbmEgbmEgw7pyb3bEm8WIIMSNZXJww6Fuw60gYSBqZSB1emF2xZllbmEgdiBHSU5JUyBpIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YS5jX3JzcF9pc3AgIT09IFwidW5kZWZpbmVkXCIgJiYgZGF0YS5jX3JzcF9pc3AhPT1udWxsICAmJiAhY19yc3BfZ2luLmVxdWFscyhjX3JzcF9pc3ApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKGRhdGEuY19yc3BfaXNwIT1udWxsICYmIGRhdGEuY19yc3BfZ2luICE9PSBkYXRhLmNfcnNwX2lzcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc192eXJpel9yZXpzcC5ncmVhdGVyVGhhbihudWxhKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1pbXBvcnRhbnRcIiwgdGV4dDogXCJqcmVzOjMwMjUwNTEzXCIsIC8vUkMgMzAyNTA1MTMgOiBTdGF2eSByZXplcnZhY8OtIElTIEdJTklTIGEgSUlTU1AgbmVzb3VobGFzw60hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtd2FybmluZ1wiLCB0ZXh0OiBcImpyZXM6MzAyNTA1MTRcIiwgLy9SQyAzMDI1MDUxNCA6IFJlemVydmFjaSBqZSBudXRuw6kgYWt0dWFsaXpvdmF0IGRvIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY19jZXJwX3htYVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNTEwXCIsIC8vUkMgMzAyNTA1MTAgOiDEjGVycMOhbm8gR0lOSVMgZGVuw61rXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNfY2VycF9naW5cIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDUyNFwiLCAvL1JDIDMwMjUwNTI0IDogxIxlcnDDoW5vIEdJTklTIFBSU0tcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX2NlcnBfZ2luMlwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNTI3XCIsIC8vUkMgMzAyNTA1MjcgOiDEjGVycMOhbm8gR0lOSVMgUFJTSyBYIElJU1NQXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzksLy8gZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImNlbnRlclwiLFxyXG5cclxuICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEsbWV0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXRhPy5faXNWaXJ0dWFsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY19jZXJwX3htYSA9IHBhcnNlRGVjaW1hbChkYXRhLmNfY2VycF94bWEgPz8gMCk7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY19jZXJwX2dpbiA9IHBhcnNlRGVjaW1hbChkYXRhLmNfY2VycF9naW4/PzApOyAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjX2NlcnBfeG1hLmVxdWFscyhjX2NlcnBfZ2luKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKGRhdGEuY19jZXJwX3htYSAhPT0gZGF0YS5jX2NlcnBfZ2luKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlIGctc3RhdGUtdGV4dCBnLXN0YXRlLXdhcm5pbmdcIiwgdGV4dDogXCJqcmVzOjMwMjUwNTEyXCIsIC8vUkMgMzAyNTA1MTIgOiBOZW7DrSBwcm92ZWRlbiBwxZllcG/EjWV0IHN0YXbFryBQUlNLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBteUdyaWRGb3JtYXQuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX2NlcnBfaXNwXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA1MTZcIiwgLy9SQyAzMDI1MDUxNiA6IMSMZXJww6FubyBJSVNTUFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjX2NlcnBfaXNwMlwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNTI4XCIsIC8vUkMgMzAyNTA1MjggOiDEjGVycMOhbm8gR0lOSVMgWCBJSVNTUFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDM5LC8vIGZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJjZW50ZXJcIixcclxuXHJcbiAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhLG1ldGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWV0YT8uX2lzVmlydHVhbCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdpbiA9IHBhcnNlRGVjaW1hbChkYXRhLmNfY2VycF9naW4/PzApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpc3AgPSBwYXJzZURlY2ltYWwoZGF0YS5jX2NlcnBfaXNwPz8wKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWdpbi5lcXVhbHMoaXNwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1leGNsYW1hdGlvbi10cmlhbmdsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS13YXJuaW5nXCIsIHRleHQ6IFwianJlczozMDI1MDUxNVwiLCAvL1JDIDMwMjUwNTE1IDogTmVuw60gcHJvdmVkZW5vIHDFmWXDusSNdG92w6Fuw60gc2t1dGXEjW5vc3RpIHYgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkZW5tZXNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDUyMFwiLCAvL1JDIDMwMjUwNTIwIDogRGF0LsSNZXJwLlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwLC8vIGZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhciBmb250ID0gXCJmb250LXdlaWdodDogYm9sZDtcIjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEuZGVubWVzID09PSBcInVuZGVmaW5lZFwiIHx8IGRhdGEuZGVubWVzID09PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGVubWVzID0gZGF0YS5kZW5tZXMgYXMgbnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkZW4gPSBkZW5tZXMgJSAzMjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbWVzaWMgPSBNYXRoLmZsb29yKGRlbm1lcyAvIDMyKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiAkKFwiPHNwYW4+XCIsIHsgdGV4dDogXCJcIiArIGRlbiArIFwiLlwiICsgbWVzaWMgKyBcIi5cIiwgdGl0bGU6IFwiXCIvKiwgXCJzdHlsZVwiOiBmb250Ki8gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoXCI8c3Bhbj5cIiwgeyB0ZXh0OiBcInswfS57MX0uXCIuZm9ybWF0KGRlbiwgbWVzaWMpLCB0aXRsZTogXCJcIi8qLCBcInN0eWxlXCI6IGZvbnQqLyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vY2VsbFRlbXBsYXRlOiBmdW5jdGlvbiAocm93LCBtZXRhLCBjZWxsSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgaWYgKHJvdy5kZW5tZXMgPT0gbnVsbCApVCByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgIC8vICAgIHZhciBkZW4gPSByb3cuZGVubWVzICUgMzI7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB2YXIgbWVzaWMgPSByb3cuZGVubWVzIC8gMzI7XHJcbiAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gXCJ7MH0uezF9LlwiLmZvcm1hdCggZGVuLCBtZXNpYyk7XHJcbiAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbXlHcmlkRm9ybWF0LmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X2NlcnBfaXNwXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA1MThcIiwgLy9SQyAzMDI1MDUxOCA6IFN0YXYgSUlTU1Aga1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMFxyXG4gICAgICAgICAgICAgICAgLCB2aXNpYmxlOiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG15R3JpZEZvcm1hdC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3JhZF9paXNzcFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNTE5XCIsIC8vUkMgMzAyNTA1MTkgOiBLIMSNZXJww6Fuw60gb2RcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG15R3JpZEZvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogTmFjdGVuaSBJc2wgc2x1emJ5IHBybyBsaXN0XHJcbiAgICAgICAgLy8gKiBAcGFyYW0gcGFyYW0wXHJcbiAgICAgICAgLy8gKi9cclxuICAgICAgICAvL3Byb3RlY3RlZCBsb2FkSVNMTGlzdChycTogeyBtYXNrYToge30sIGZpbHRlcjogeyBmaWx0ZXJzOiBhbnkgfSB9KTogSXNsLl9UYXNrPGFueSwgSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPGFueT4+IHtcclxuXHJcbiAgICAgICAgLy8gICAgcmV0dXJuIHRoaXMucGFyZW50Q250LmlzbC5VY3JSaXNyZUlpc3NwLmxpc3QoeyBtYXNrYTpycS5tYXNrYSwgcG91emVTQ2h5Ym91OiB0aGlzLnBvdXplU0NoeWJvdSB9KVxyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBWcmF0IG11aiBzZXN0YXZlbnkgZmlsdHJcclxuICAgICAgICAvLyAqIFxyXG4gICAgICAgIC8vICogQHJldHVybnNcclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJvdGVjdGVkIGdldE15RmlsdGVyKGZpbHRlclNlcnZlcjogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclByZXVjdG92YW5pU3Rhdkxpc3RGaWx0ZXJEdG8sIGZpbHRlcjogYW55KTogeyBtYXNrYToge30sIGZpbHRlcjogeyBmaWx0ZXJzOiB7fSB9IH0gfCB1bmRlZmluZWQge1xyXG4gICAgICAgIC8vICAgIHJldHVybiB7XHJcbiAgICAgICAgLy8gICAgICAgIG1hc2thOiBmaWx0ZXJTZXJ2ZXIsIGZpbHRlcjoge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgZmlsdGVyczoge30gfVxyXG4gICAgICAgIC8vICAgIH07XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqICBOYWN0ZW5pIGRhdFxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wdWJsaWMgbG9hZERhdGFPbGQoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAvLyAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgLy8gICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAvLyAgICB2YXIgbWFza2E6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdSaXNyZUlJc3NwRmlsdGVyRHRvID0ge307XHJcblxyXG4gICAgICAgIC8vICAgIC8vdmFyIGZpbHRlciA9IHRoYXQuZ2V0RmlsdGVyKCkuZ2ZpbHRlcnBhbmVsKCdnZXRDdXJyZW50RGF0YScpO1xyXG5cclxuICAgICAgICAvLyAgICAvL2NvbnNvbGUubG9nKFwibG9hZGRhdGEuZmlsdGVyXCIsIGZpbHRlcik7XHJcbiAgICAgICAgLy8gICAgLy9sZXQgdmlldyA9IHRoaXMuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpO1xyXG5cclxuICAgICAgICAvLyAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgIC8vICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgIC8vICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXI8R29yZGljLlVjdC5JbnRlcmZhY2UuR1Jpc3JlSUlzc3BGaWx0ZXJEdG8+KFwiY29sbGVjdFwiLCBtYXNrYSlcclxuICAgICAgICAvLyAgICAgICAgLnRoZW4oKGZpbHRlclNlcnZlcikgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgbWFza2EgPSBmaWx0ZXJTZXJ2ZXI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuXHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuaXNsLlVjclJpc3JlSWlzc3AubGlzdCh7IG1hc2thOiBtYXNrYSwgcG91emVTQ2h5Ym91OiB0aGF0LnBvdXplU0NoeWJvdSB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vYXQuc2V0QWN0aW9ucyhyZXN1bHQuTGlzdFZhbHVlcz8ubGVuZ3RoIGFzIGFueSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHJlc3VsdCk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5sb2FkaW5nRGF0YSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7IHJldHVybiBkZWYucmVqZWN0KCk7IH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICApO1xyXG5cclxuXHJcbiAgICAgICAgLy8gICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgLy99XHJcbiAgICB9XHJcbn0iXX0=