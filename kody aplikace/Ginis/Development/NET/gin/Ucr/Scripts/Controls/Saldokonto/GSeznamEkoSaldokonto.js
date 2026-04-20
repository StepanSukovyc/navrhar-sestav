"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            class GSeznamEkoSaldokonto extends WebClient.GSeznamEkoZaznamuBase {
                /**
                 * Konstruktor
                 *
                 * @param content - parent content
                 */
                constructor(content) {
                    super(content);
                    // atributy zobrazeni sloupcu (pouze pro saldokonto)
                    this.useNS = true;
                    this.useORJ = true;
                    this.useORG = true;
                    this.logOptions = { name: "GSeznamEkoSaldokonto", authorCode: 311, file: "GSeznamEkoSaldokonto.ts" };
                    this.soucetVeStatusBaru = true;
                    this.povolenNahled = false;
                    // nacteni ulozenych uziv. hodnot
                    if (this.parentCnt.TypUlohy === 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */) {
                        this.useNS = this.parentCnt.userSettings.get("usedNS", false);
                        this.useORJ = this.parentCnt.userSettings.get("usedORJ", false);
                        this.useORG = this.parentCnt.userSettings.get("useORG", false);
                    }
                    // definice tasku pro seznam a nacteni poctu
                    this.taskList = this.parentCnt.isl.UcrSaldokonto.list();
                    this.taskCount = this.parentCnt.isl.UcrSaldokonto.count();
                    // pouzivat filtr na PAP radky
                    this.usePapRows = true;
                    // moznost ukladani historie filtru
                    this.rememberHistory = true;
                    this._nastaveniAkci();
                }
                onContentReady_1() {
                    //this.parentCnt.globals = Gordic.Ucr.Globals.GUcrGlobals;
                    //this.zkratky = Gordic.Ucr.Globals.GZkr;
                    //this.texty = Gordic.Ucr.Globals.GTxt;
                    var that = this;
                    // nacteni ulozenych uziv. hodnot
                    if (this.parentCnt.TypUlohy === 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */) {
                        this.useNS = that.parentCnt.userSettings.get("usedNS", false);
                        this.useORJ = that.parentCnt.userSettings.get("usedORJ", false);
                        this.useORG = that.parentCnt.userSettings.get("useORG", false);
                    }
                    this.createActions();
                    this.parentCnt.menuBar(this.createMenubarDef(this.parentCnt.TypUlohy));
                    if (typeof this.detailInf !== "undefined" && this.detailInf.trim() != "")
                        this.parentCnt.statusBar([{ type: "static", caption: this.detailInf }]);
                    this.createFilterPanel();
                    if ((this.parentCnt.TypUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */ || this.parentCnt.TypUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                        || this.parentCnt.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */) && (this.parentCnt.userSettings?.get("rozsirenyPopisAutoAddGridColumns") ?? false))
                        this.addStrPopisColumns = this.parentCnt.userSettings?.get("rozsirenyPopisShowGridColumns");
                    let gridFormat = this.createGridFormat();
                    this.profiles = this.createProfiles(gridFormat);
                    let profilesArr = [this.profiles.default];
                    if (this.profiles.doklady)
                        profilesArr.push(this.profiles.doklady);
                    let view = new Gordic.Isl.View(that.parentCnt.isl.UcrSaldokonto.list().use((req, next, ctx) => {
                        debugger;
                        return this.getFilterData(that, req, next);
                    }), {
                        filterPanel: that.$filterPanel,
                        startEmpty: true
                    });
                    view.on("change", function (ev, ctx) {
                        debugger;
                        that._nastaveniAkci();
                        //NastaveniPristupnosti(that);
                    });
                    let sumCols = gridFormat.columns.filter(c => (c.columnType == "currency" || c.columnType == "number") && ("status,drd,mesic,den,rok".indexOf(c.name)) == -1).map(e => e.name);
                    const grid = $.newDiv(that.classGrid)
                        .appendTo(this.parentCnt.element)
                        .css("height", "100%")
                        .gautofit()
                        .ggrid({
                        //rowHeight: 32,
                        columnMode: "full", // fit (defaultne by melo byt toto), full
                        data: view,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                that.showZapisy();
                            }
                        }),
                        //searchColumns: ["popis", "ac"], //sloupce, podle kterych se vyhledava v searchboxu                    
                        columns: this.createGridFormat(),
                        defaultProfile: this.profiles.default, //skryte sloupce resit pres column.hidden + columnList - uzivateli jsou skryte, muze si je volitelne zapnout
                        profiles: profilesArr,
                        contextMenu: [
                            { action: this.clearFilterRowAct }
                        ],
                        selection: (ev, sel) => {
                            //previewSidebar.empty().append("<div>" + sel.getSelection(false)[0].ixp + "</div>");
                            let s = sel.getSelection(false);
                            this.dotAct.enabled(s.length > 0);
                            if (s.length === 0)
                                return;
                            //if (this.previewController && typeof this.previewController !== "undefined")
                            this.previewController?.show(s[0]);
                        },
                        //cellActivate: function () { console.log("cellActivate", arguments);} //NOTE: Nedostanu se k puvodni udalosti, abych zjistil, zda se drzi ctrl
                    })
                        .ggrideko({
                        // součtový řádek
                        summaryRowAllowed: true,
                        summaryRowColumns: sumCols,
                        // dlouhý seznam
                        longListAllowed: true,
                        //longListModifyRqMethod: (rq) => { debugger; return true },
                        longListModel: "Global.Ucr.AppSettings",
                        longListCountMethod: (rq) => {
                            return that.parentCnt.isl.UcrSaldokonto.count()
                                .use((req, next, ctx) => {
                                //debugger;
                                return this.getFilterData(that, req, next);
                            })
                                .get();
                        }
                        //  $.Deferred().resolve(1).promise()//that.isl.ZapoctovyList.listCount(rq).get()
                    })
                        .ggridserverfilter({
                        //invalidValueChanged: function (ev) { that.loadData(); },
                        //defaultData: { nks: { start: "000004", end: "000004" } }
                        defaultData: this.Filter
                    })
                        .on("gcfufilterinvalidvalueset", function (ev) {
                        //that.loadData2();
                        let grid = that.getGrid();
                        if (grid == null)
                            return;
                        grid.ggrid("getView").requestData();
                    });
                    //#region Kl. zkratky
                    this.createShortCut();
                    //#endregion
                    if (this.AutoLoadData)
                        view.requestData();
                    //this.loadData2();
                }
                /**
                 * Nacti filtry
                 * @param that
                 * @param req
                 * @param next
                 */
                getFilterData(that, req, next) {
                    return that.getFilter(that.$filterPanel.gfilterpanel("getCurrentData"))
                        //return that.getFilter(that.$filterPanel.gfilterpanel("getConfirmedData"))
                        .then((newFilter) => {
                        // zjisteni vybranych slov
                        this.useNS = false;
                        this.useORG = false;
                        this.useORJ = false;
                        for (var i = 0; i < newFilter.filter.volby.length; i++) {
                            if (newFilter.filter.volby[i] == 1)
                                this.useNS = true;
                            if (newFilter.filter.volby[i] == 2)
                                this.useORJ = true;
                            if (newFilter.filter.volby[i] == 3)
                                this.useORG = true;
                        }
                        newFilter.useNS = this.useNS;
                        newFilter.useORG = this.useORG;
                        newFilter.useORJ = this.useORJ;
                        that.addFilterIntoHistory($.extend(true, {}, newFilter));
                        //if (that.addFilterToHistory) {
                        //    if (that.currFilterHistoryIndex !== that.filterHistory.length - 1)
                        //        that.filterHistory.splice(that.currFilterHistoryIndex + 1);
                        //    that.filterHistory.push(newFilter);
                        //    that.currFilterHistoryIndex++;
                        //}
                        //that.addFilterToHistory = true;
                        //// zjisteni vybranych slov
                        //this.useNS = false; this.useORG = false; this.useORJ = false;
                        //for (var i = 0; i < (newFilter.filter as any).volby!.length; i++) {
                        //    if ((newFilter.filter as any).volby[i] == 1)
                        //        this.useNS = true;
                        //    if ((newFilter.filter as any).volby[i] == 2)
                        //        this.useORJ = true;
                        //    if ((newFilter.filter as any).volby[i] == 3)
                        //        this.useORG = true;
                        //}
                        //newFilter.useNS = this.useNS;
                        //newFilter.useORG = this.useORG;
                        //newFilter.useORJ = this.useORJ;
                        let maska = newFilter.filter;
                        for (var name in newFilter.filter?.cfu) {
                            maska[name] = newFilter.filter?.cfu[name];
                        }
                        //that.nextFilterAct.enabled(that.currFilterHistoryIndex < that.filterHistory.length - 1);
                        //that.prevFilterAct.enabled(that.currFilterHistoryIndex > 0);
                        let rq = {
                            logovatGdpr: true, ns: this.useNS, org: this.useORG, orj: this.useORJ,
                            maxRecords: Gordic.Eko.Utils.GetUserSettingsListWarning(that.parentCnt, "Global.Ucr.AppSettings") ? Gordic.Eko.Utils.GetUserSettingsListMaxCount(that.parentCnt, "Global.Ucr.AppSettings") : -1,
                            // podminka na PAP ucty
                            Pap: that.usePapRows ? { v: that.getCheckedPap() ? 0 : 1 } : undefined
                        };
                        maska["volby"] = undefined;
                        rq.maska = maska;
                        var newRequest = $.extend(true, {}, req);
                        newRequest["filters"] = rq;
                        newRequest.filters["volby"] = undefined;
                        let grid = that.getGrid();
                        if (grid == null)
                            return next(newRequest);
                        grid.ggrid("option", "columns", this.createGridFormat());
                        //delete (newRequest.filters!["volby"]);                    
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
                /**
                 * Nastaveni pristupnosti akci
                 *
                 *
                 * */
                nastaveniAkci(grid, pocetRadku) {
                    //super.nastaveniAkci();
                    //let grid = this.getGrid();
                    //if (grid == null) return;
                    //var enable = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid) > 0;
                    var enable = pocetRadku > 0;
                    // pristupnost akci dle nactenych dat
                    this.detailAct.enabled(enable);
                    this.filterPidAct.enabled(enable);
                    this.dokladAct.enabled(enable);
                    this.primdokladAct.enabled(enable);
                    this.dokladBLKAct.enabled(enable);
                    this.dokladROAct.enabled(enable);
                    this.shDokladyAct.enabled(enable);
                    this.zapisyAct.enabled(enable);
                    this.zapisyAllAct.enabled(enable);
                    this.shZapisyAct.enabled(enable);
                    this.dotAct.enabled(enable);
                    //this.$grid.ggrid("getView").updateData(data.SeznamZapisu, "reset");
                    this.previewController?.enable(enable);
                }
                createGridFormat() {
                    var gf = new Gordic.Data.GridFormat();
                    // Modifikovane Su a Au
                    for (let i = 0; i < this.parentCnt.modifyCfu.columns.length; i++) {
                        const c = this.parentCnt.modifyCfu.columns[i];
                        gf.addTextColumn({
                            name: c.name,
                            caption: c.caption,
                            description: c.description,
                            width: c.width,
                            serverFilter: Gordic.Eko.Filters.cfuInterval({
                                cfu: c,
                                isRoz: false,
                                isUct: true,
                                model: `${c.name}`
                                //model: `${c.name}_reg`
                            })
                        });
                    }
                    if (this.parentCnt.globals.SaldokontoParam1.trim() != "")
                        gf.addTextColumn({
                            name: "value0",
                            caption: this.parentCnt.globals.SaldokontoParam1.trim(),
                            width: 120,
                            serverFilter: Gordic.Eko.Filters.stringInterval({ name: "value0", model: "value0", caption: this.parentCnt.globals.SaldokontoParam1.trim() })
                        });
                    if (this.parentCnt.globals.SaldokontoParam2.trim() != "")
                        gf.addTextColumn({
                            name: "value1",
                            caption: this.parentCnt.globals.SaldokontoParam2.trim(),
                            width: 120,
                            serverFilter: Gordic.Eko.Filters.stringInterval({ name: "value1", model: "value1", caption: this.parentCnt.globals.SaldokontoParam2.trim() })
                        });
                    if (this.parentCnt.globals.TypPraceESU === 2 /* Gordic.Uct.Interface.GUcrTypPraceESU.Ne */) {
                    }
                    else if (this.parentCnt.globals.RezimProvozu === 40 /* Gordic.Uct.Interface.GUcrRezimProvozu.SOR */ && this.parentCnt.globals.TypSumarizace === 1 /* Gordic.Uct.Interface.GUcrTypSumarizace.Externi */) {
                    }
                    else {
                        gf.addTextColumn({
                            name: "ixs_esu",
                            caption: "jres:30250282", //RC 30250282 : ID ESU
                            //description: "jres:31100253", //RC 31100253 : IČO Externího subjektu primárního dokladu
                            width: 120,
                            serverFilter: Gordic.Ucr.WebClient.FilterPrefabs.esu_ixs({ model: "ixs_esu", ixs_esuPath: "_esu_ixs", caption: "jres:30250282" }) //RC 30250282 : ID ESU
                            //serverFilter: Gordic.Eko.Filters.stringSingle({ caption: "jres:30250282", model: "ixs_esu" }) //RC 30250282 : ID ESU
                        });
                        gf.addTextColumn({
                            name: "esu_ico",
                            caption: "jres:31100080" + " " + this.zkratky.Ico, //RC 31100080 : ESU
                            description: "jres:31100253", //RC 31100253 : IČO Externího subjektu primárního dokladu
                            width: 80,
                            serverFilter: Gordic.Ucr.WebClient.FilterPrefabs.esu_ico({ model: "esu_ico", ixs_esuPath: "_esu_ico_ixs", caption: "jres:31100080" + " " + this.zkratky.Ico }) //RC 31100080 : ESU
                        });
                        gf.addTextColumn({
                            name: "esu_txt",
                            caption: "jres:31100080", //RC 31100080 : ESU
                            description: "jres:31100252", //RC 31100252 : Externí subjekt
                            width: 180,
                            serverFilter: Gordic.Ucr.WebClient.FilterPrefabs.esu_txt({ model: "esu_txt", ixs_esuPath: "_esu_txt_ixs", caption: "jres:31100080" }) //RC 31100080 : ESU
                        });
                    }
                    // NKS
                    if (this.useNS)
                        gf.addTextColumn({
                            name: "nks",
                            caption: this.zkratky.Nks,
                            description: this.texty.Nks,
                            width: 60,
                            //group: topoGroup,
                            serverFilter: Gordic.Eko.Filters.nksInterval(this.filterOptions.nks)
                        });
                    // Modifikovane orj
                    if (this.useORJ)
                        gf.addTextColumn({
                            name: this.parentCnt.wodrOrj.name,
                            caption: this.parentCnt.wodrOrj.caption,
                            description: this.parentCnt.wodrOrj.description,
                            width: this.parentCnt.wodrOrj.width,
                            serverFilter: Gordic.Eko.Filters.cfuInterval({
                                cfu: this.parentCnt.wodrOrj,
                                isRoz: false,
                                isUct: true,
                                model: `${this.parentCnt.wodrOrj.name}`
                                //model: `${c.name}_reg`
                            })
                        });
                    // Modifikovane org
                    if (this.useORG)
                        gf.addTextColumn({
                            name: this.parentCnt.wodrOrg.name,
                            caption: this.parentCnt.wodrOrg.caption,
                            description: this.parentCnt.wodrOrg.description,
                            width: this.parentCnt.wodrOrg.width,
                            serverFilter: Gordic.Eko.Filters.cfuInterval({
                                cfu: this.parentCnt.wodrOrg,
                                isRoz: false,
                                isUct: true,
                                model: `${this.parentCnt.wodrOrg.name}`
                                //model: `${c.name}_reg`
                            })
                        });
                    gf.addCurrencyColumn({
                        name: "c0",
                        caption: "jres:30250270", //RC 30250270 : MD
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0", caption: "jres:30250270" }) //RC 30250270 : MD
                    });
                    gf.addCurrencyColumn({
                        name: "c1",
                        caption: "jres:30250271", //RC 30250271 : Dal
                        width: 120,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c1", caption: "jres:30250271" }) //RC 30250271 : Dal
                    });
                    gf.addCurrencyColumn({
                        name: "c0c1",
                        caption: "jres:30250272", //RC 30250272 : MD - Dal
                        width: 120,
                        hidden: !this.parentCnt.globals.Rad_ZobrazMdDal,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0c1", caption: "jres:30250272" }) //RC 30250272 : MD - Dal
                    });
                    if (this.PrizIissp) {
                        let iisspDisable = this.parentCnt.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */;
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
                    }
                    return gf;
                }
                /**
                 * Vytoreni akci
                 */
                createActions() {
                    super.createActions();
                    const that = this;
                    this.detailAct = this.parentCnt.actions.add({
                        name: "detailAct",
                        caption: "jres:31100266", //RC 31100266 : Zobrazit detail
                        icon: "gi-detail",
                        enabled: false,
                        visible: (this.parentCnt.TypUlohy != 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */ && this.parentCnt.TypUlohy != 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */ && this.parentCnt.TypUlohy != 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */),
                        run: (ev, ctx) => { this.showDetail(); }
                    });
                    this.zapisyAct = this.parentCnt.actions.add({
                        name: "zapisyAct",
                        icon: "gi-list",
                        enabled: false,
                        caption: "jres:31100124", //RC 31100124 : Zápisy
                        run: (ev, ctx) => { this.showZapisy(); }
                    });
                    this.zapisyAllAct = this.parentCnt.actions.add({
                        name: "zapisyAllAct",
                        icon: "gi-list",
                        enabled: false,
                        caption: "jres:30250273", //RC 30250273 : Zápisy vše
                        run: (ev, ctx) => { this.showZapisyAll(); }
                    });
                    this.dokladAct = this.parentCnt.actions.add({
                        name: "dokladAct",
                        enabled: false,
                        caption: "jres:31100233", //RC 31100233 : Doklady/zápisy
                        run: (ev, ctx) => { this.toggleGrouping(); }
                    });
                    this.primdokladAct = this.parentCnt.actions.add({
                        name: "primdokladAct",
                        enabled: false,
                        icon: "fa-external-link",
                        caption: "jres:30250154", //RC 30250154 : Prim. doklad
                        run: (ev, ctx) => { this.showPrimDoklad(); }
                    });
                    this.dokladBLKAct = this.parentCnt.actions.add({
                        name: "dokladBLKAct",
                        enabled: false,
                        icon: "fa-external-link",
                        caption: "jres:30250155", //RC 30250155 : Doklad BLK
                        run: (ev, ctx) => { this.showPrimDoklad(undefined, "BLK"); }
                    });
                    this.dokladROAct = this.parentCnt.actions.add({
                        name: "dokladROAct",
                        enabled: false,
                        icon: "fa-external-link",
                        caption: "jres:30250156", //RC 30250156 : Doklad RO
                        run: (ev, ctx) => { this.showPrimDoklad(undefined, "RO"); }
                    });
                    this.filterPidAct = this.parentCnt.actions.add({
                        name: "filterPidAct",
                        enabled: false,
                        visible: this.parentCnt.TypUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                            || this.parentCnt.TypUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                            || this.parentCnt.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */
                            || this.parentCnt.TypUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */
                            || this.parentCnt.TypUlohy == 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */,
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
                    });
                    this.shDokladyAct = this.parentCnt.actions.add({
                        name: "shDokladyAct",
                        enabled: false,
                        visible: (this.parentCnt.TypUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */ || this.parentCnt.TypUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                            || this.parentCnt.TypUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                            || this.parentCnt.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */
                            || this.parentCnt.TypUlohy == 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */),
                        //NOTE: Jak to delaji v tlustym: GSeznamUctZaznamuStavyZapisyTab.m_ActionDoklady_Start(): 
                        //Provedou seskupeni, ktere pridaji jako nove radky a pak zafiltruji pouze na souctove radky
                        run: () => { this.toggleGrouping(this.profiles.doklady.name); }
                    });
                    this.shZapisyAct = this.parentCnt.actions.add({
                        name: "shZapisyAct",
                        visible: (this.parentCnt.TypUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */ || this.parentCnt.TypUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                            || this.parentCnt.TypUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                            || this.parentCnt.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */),
                        enabled: false,
                        run: () => { this.toggleGrouping(this.profiles.default.name); }
                    });
                }
                /**
                 * Definice menu
                 * @param typUlohy
                 */
                createMenubarDef(typUlohy) {
                    let menu = new Array();
                    menu.push({ action: this.detailAct, favorite: true });
                    menu.push({ action: this.prevFilterAct, favorite: true, align: "opposite" });
                    menu.push({ action: this.nextFilterAct, favorite: true, align: "opposite" });
                    if (this.printAct)
                        menu.push({ action: this.printAct, favorite: true });
                    if (typUlohy === 2 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviStav */
                        || typUlohy === 0 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetStav */ || typUlohy === 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */)
                        menu.push({ action: this.zapisyAct, favorite: true });
                    if (typUlohy === 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */)
                        menu.push({ action: this.zapisyAllAct, favorite: true });
                    if (typUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                        || typUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                        || typUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */
                        || typUlohy == 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */
                        || typUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */)
                        menu.push({ action: this.dokladAct, favorite: true });
                    if (typUlohy === 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */
                        || typUlohy === 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */) {
                        //menu.push({ action: this.primdokladAct, favorite: true });
                        menu.push({ action: this.dokladROAct, favorite: true });
                        menu.push({ action: this.dokladBLKAct, favorite: true });
                    }
                    if (typUlohy === 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */
                        || typUlohy === 4 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.FinancovaniZapis */
                        || typUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                        || typUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                        || typUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */
                        || typUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */
                        || typUlohy === 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */
                        || typUlohy === 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */
                        || typUlohy === 13 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapisyVse */) {
                        menu.push({ action: this.primdokladAct, favorite: true });
                    }
                    if (typUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */ && this.zatriditAct)
                        menu.push({ action: this.zatriditAct, favorite: true });
                    menu.push({ action: this.clearFilterRowAct });
                    menu.push({
                        type: "static",
                        caption: "jres:31100268", //RC 31100268 : Rychlé akce
                        children: [
                            { action: this.insAct, icon: "gi-refresh", caption: "jres:31100226" }, //RC 31100226 : Načtení dat
                            { action: this.clearAndFilterAct, caption: "jres:31100228" }, //RC 31100228 : Vyčistit a načíst
                            //NOTE: Tyto dve akce budou vzdy fungovat pouze z klavesnice
                            //{ action: this.selFilterAct, caption: "jres:31100229" }, //RC 31100229 : Přenesení hodnoty do filtru.
                            //{ action: this.selFilterAndSearchAct, caption: "jres:31100235" }, //RC 31100235 : Přenesení hodnoty do filtru a vyhledání.
                            {
                                action: this.dotAct,
                                caption: "jres:30250620", //RC 30250620 : Filtrovat dle dokladu
                                tooltip: "jres:31100227"
                            }, //RC 31100227 : Zobrazení všech zápisů dokladů (celý doklad) nad označeným zápisem.
                            { action: this.filterPidAct, caption: "jres:31100280" }, //RC 31100280 : Filtrovat dle PID
                            { action: this.shDokladyAct, caption: "jres:31100231" }, //RC 31100231 : Doklady
                            { action: this.shZapisyAct, caption: "jres:31100124" } //RC 31100124 : Zápisy
                        ]
                    });
                    return menu;
                }
                //public getFilter(fPanelData?: any): JQueryPromise<GSeznamEkoZaznamuGetDataFilterDto> {
                //    var filterDto = fPanelData || {};
                //    let elementy: any = null; //TODO: Po vyberu varianty otypovat!!!
                //    let filterStrPopis: GStrukturovanyPopisFilterDto[] = [];
                //    if (fPanelData) {
                //        if (fPanelData.elementy && $.isPlainObject(fPanelData.elementy))
                //            elementy = fPanelData.elementy;
                //        if (fPanelData.filterStrPopis && fPanelData.filterStrPopis instanceof Array)
                //            filterStrPopis = fPanelData.filterStrPopis;
                //    }
                //    return this.$grid.ggridserverfilter<GEkoFilterDto>("collect", filterDto)
                //        .then((d) => {
                //            this.parentCnt.log.trace("filter", d);
                //            this.parentCnt.log.trace("elementy", JSON.stringify(elementy));
                //            this.parentCnt.log.trace("filterStrPopis", filterStrPopis);
                //            this.parentCnt.log.trace("strPopisKeys", this.addStrPopisColumns);
                //            return { filter: d, elementy: elementy, filterStrPopis: filterStrPopis, skipSumLimit: false, strPopisKeys: this.addStrPopisColumns };
                //        });
                //}
                createFilterPanel() {
                    var that = this;
                    //let cfuSet = Gordic.Eko.CfuUtils.getCfuSetServerFilters(this.parentCnt, {
                    //    isRoz: this.Rozpocet,
                    //    isUct: this.Ucetnictvi,
                    //    checkUete: this.parentCnt.ekoParams.CheckUete,
                    //    ixsRoz: this.parentCnt.ekoParams.IxsRoz || undefined
                    //});
                    //let cfuSet = this.getCfuSetServerFilters(false);
                    //var gf = Gordic.Ucr.WebClient.GElementUtils.createElementsGridFormat({
                    //    ekoParams: this.parentCnt.ekoParams,
                    //    globals: this.parentCnt.globalParams,
                    //    typSestavy: this.parentCnt.typSestavy,
                    //    cfuSet: cfuSet,
                    //    filterOptions: this.filterOptions,
                    //    filterParams: this.parentCnt.filterParams
                    //});
                    //var elmRowOpts = { label: "Elementy" };
                    //elmRowOpts["favoriteRowLayoutDescriptor"] = "w-L-9 w-M-8 w-S-12";
                    let fpForm;
                    fpForm = new Gordic.Forms.Form({ tabLabel: "jres:30250052" }); //RC 30250052 : Filtr
                    let volbyData;
                    volbyData = [{ text: this.zkratky.Nks, hodnota: 1 }];
                    if (typeof this.parentCnt.wodrOrj !== "undefined")
                        volbyData.push({ text: this.parentCnt.wodrOrj.caption, hodnota: 2 });
                    if (typeof this.parentCnt.wodrOrg !== "undefined")
                        volbyData.push({ text: this.parentCnt.wodrOrg.caption, hodnota: 3 });
                    let volby = new Gordic.Data.View(volbyData, { key: "hodnota" });
                    let initialValue = [];
                    if (that.useNS)
                        initialValue.push({
                            text: this.zkratky.Nks, hodnota: 1
                        });
                    if (that.useORJ)
                        initialValue.push({
                            text: this.parentCnt.wodrOrj.caption, hodnota: 2
                        });
                    if (that.useORG)
                        initialValue.push({
                            text: this.parentCnt.wodrOrg.caption, hodnota: 3
                        });
                    fpForm.addField("gselectbox", {
                        name: "volby", list: true, itemWidth: "",
                        dropdown: false,
                        multi: true,
                        model: "model.volby=value.hodnota",
                        itemTemplate: "{text}",
                        data: volby,
                        initialValue: initialValue,
                        emptyValue: null,
                        change: function (ev, obj) {
                            //                    if (that.loading || (obj.flags && obj.flags.filterClear === true)) return;
                            if (that.parentCnt.loading)
                                return;
                            if (obj && typeof obj.value !== "undefined") {
                                //that.setFilter();
                                //// nastaveni akci
                                //let view = that.$grid.ggrid("getView");
                                //that.setActions(view.getDataRows().length);
                            }
                        }
                    });
                    this.$filterPanel = $.newDiv()
                        .appendTo(this.parentCnt.element)
                        .gfilterpanel({
                        forms: [fpForm],
                        favorites: ["md"],
                        favoriteLayoutDescriptor: "L5M3S1 L-12-12-0 M-12-12-0 S-12-12-0",
                        searchButtonOnMainRow: true,
                        //saveOptionsForm: GUcrMaskaDetail.getForm(gf as any), //TODO: Dat spravny typ gridformatu!
                        filterViewMode: FilterViewMode.Simple,
                        filterViewModeUserSettings: [FilterViewMode.Detail],
                        //filterStorageService: new GUcrMaskaService({ typSestavy: this.parentCnt.typSestavy, parentContent: that.parentCnt, fragments: "*" }),
                        autoLoadAfterChoseFilter: false,
                        //apply: (ev, data) => { this.loadData2(data.filter); },
                        reset: (ev, data) => {
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            grid.ggridserverfilter("clear");
                        },
                        primaryButtonBehaviour: "AlwaysPrimary",
                        clearFilterButtonVisible: "AlwaysVisible",
                        poVyhledaniZobrazit: "OblibenePodminky",
                        poVyhledaniZobrazitUserSettings: "Deny" //NOTE: Zakazuje prepinani po vyhledani - pokud se nekdo pokousel vymazat filtr v tomto rezimu, tak musel kliknout na vyhledat, viz T3987
                    });
                }
                /**
                 * Zobrazeni detailu - budu zobrazovat zapisy
                 * @param row
                 */
                showDetail(row) {
                    this.showZapisy();
                }
                //private showDetail(row?: GSeznamZapisuStavuDto): void {
                //    if (!row) {
                //        var sel = this.$grid.ggrid<GSeznamZapisuStavuDto>("getSelection");
                //        if (sel.length === 0)
                //            return;
                //        row = sel[0];
                //    };
                //    let typUlohy: Gordic.Uct.Interface.GProhlizeniUctTaskType = this.parentCnt.TypUlohy;
                //    if (this.parentCnt.TypUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.FinancovaniZapis) {
                //        if (row.priz_ur != 0)
                //            typUlohy = Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis;
                //        else
                //            typUlohy = Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis;
                //    }
                //    let options: IGDetailStavZapisRadkuOptions = {
                //        typUlohy: typUlohy,//this.TypUlohy,
                //        gridFormat: this.createGridFormat(),
                //        filter: this.getZapisFilter(),
                //        row: row,
                //        globals: this.parentCnt.globalParams,
                //        viewMode: "full"
                //    };
                //    this.parentCnt.navigate(Gordic.Ucr.WebClient.GDetailStavZapisRadku, options);
                //}
                /***
                 * Zobrazeni vsech zapisu pro saldokonto
                 *
                 * */
                showZapisyAll() {
                    var that = this;
                    let typUlohy = 13 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapisyVse */;
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    let id = "seznamSaldokonto#"; //NOTE: Musi byt stejne ni na MainApp.cs
                    let rows = grid.ggrid("getView").getDataRows(false);
                    this.getFilter()
                        .then((f) => {
                        //let filter: GEkoFilterDto;
                        return this.parentCnt.navigate('Gordic.Ucr.WebClient.GSeznamEkoZaznamuBaseContent', {
                            //that.parentCnt.navigate('Gordic.Ucr.WebClient.GSeznamEkoZaznamu', {
                            ID: id,
                            TypUlohy: typUlohy,
                            Filter: {},
                            Rows: rows,
                            StrictFilter: true,
                            FilterStrPopis: f.filterStrPopis,
                            AutoLoadData: true,
                            title: "jres:30250283" //RC 30250283 : Zápisy saldokonta
                        });
                    });
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
                            if (that.parentCnt.globals.SaldokontoParam1.trim() != "")
                                add = that.parentCnt.globals.SaldokontoParam1.trim() + ": " + row["value0"];
                            if (that.parentCnt.globals.SaldokontoParam2.trim() != "") {
                                if (add != "")
                                    add += ", " + that.parentCnt.globals?.SaldokontoParam2.trim() + ": " + row["value1"].trim();
                                else
                                    add = that.parentCnt.globals.SaldokontoParam1.trim() + ": " + row["value0"]?.trim();
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
                        return this.parentCnt.navigate('Gordic.Ucr.WebClient.GSeznamEkoZaznamuBaseContent', {
                            //this.parentCnt.navigate('Gordic.Ucr.WebClient.GSeznamEkoZaznamu', {
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
                createProfiles(gf) {
                    let profiles = {
                        default: { name: "jres:31100232", columns: {} } //RC 31100232 : Výchozí
                    };
                    gf.columns.filter((c) => { return !c.hidden; })
                        .forEach((c) => { profiles.default.columns[c.name] = { hidden: false }; });
                    return profiles;
                }
                /**
                 * nacteni pomoci tecky
                 * */
                doFilterClick() {
                    this.reload();
                }
                /**
                 * Definice menu baru
                 * @param typUlohy
                 */
                DefineMenuBar(typUlohy) {
                    let menu = super.DefineMenuBar(typUlohy);
                    menu.push({ action: this.parentCnt.actions.zapisyAllAct, favorite: true });
                    return menu;
                }
                ///** Priprava pro generovani sestavy */
                //private reportStarting(ri: IGPrintActionReportStarting<GSeznamEkoZaznamuGeneratorDto>): JQueryPromise<void> {
                //    return this.getFilter(this.$filterPanel.gfilterpanel("getConfirmedData"))
                //        .then((f) => {
                //            ri.customDto = {
                //                typUlohy: this.parentCnt.TypUlohy,
                //                filter: f.filter,
                //                elementy: f.elementy,
                //                filterStrPopis: f.filterStrPopis
                //            };
                //        });
                //}
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    var that = this;
                    if (that.parentCnt.TypUlohy === 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */) {
                        let useNS = false;
                        let useORG = false;
                        let useORJ = false;
                        let filter = this.$filterPanel.gfilterpanel("getCurrentData");
                        for (var i = 0; i < filter.volby.length; i++) {
                            if (filter.volby[i] == 1)
                                useNS = true;
                            if (filter.volby[i] == 2)
                                useORJ = true;
                            if (filter.volby[i] == 3)
                                useORG = true;
                        }
                        that.parentCnt.userSettings.set("usedNS", useNS);
                        that.parentCnt.userSettings.set("useORG", useORG);
                        that.parentCnt.userSettings.set("usedORJ", useORJ);
                    }
                    return $.Deferred().resolve().promise();
                }
            }
            WebClient.GSeznamEkoSaldokonto = GSeznamEkoSaldokonto;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUVrb1NhbGRva29udG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2V6bmFtRWtvU2FsZG9rb250by50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBeS9CZjtBQXovQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBeS9CbkI7SUF6L0JnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0F5L0I3QjtRQXovQm9CLFdBQUEsU0FBUztZQUUxQixNQUFhLG9CQUFxQixTQUFRLFVBQUEscUJBQXFCO2dCQWtDM0Q7Ozs7bUJBSUc7Z0JBQ0gsWUFBWSxPQUFxQztvQkFDN0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQWZuQixvREFBb0Q7b0JBQzdDLFVBQUssR0FBWSxJQUFJLENBQUM7b0JBQ3RCLFdBQU0sR0FBWSxJQUFJLENBQUM7b0JBQ3ZCLFdBQU0sR0FBWSxJQUFJLENBQUM7b0JBSTlCLGVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBRSxDQUFDO29CQVM1RixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO29CQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztvQkFDM0IsaUNBQWlDO29CQUNqQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxvRUFBMkQsRUFBRSxDQUFDO3dCQUNyRixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQy9ELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDakUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FB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Z0NBQzVCLEdBQUcsRUFBRTtvQ0FDRCxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUs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QUE7UUFDTCxDQUFDLEVBei9Cb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBeS9CN0I7SUFBRCxDQUFDLEVBei9CZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBeS9CbkI7QUFBRCxDQUFDLEVBei9CUyxNQUFNLEtBQU4sTUFBTSxRQXkvQmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjci5XZWJDbGllbnQge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtRWtvU2FsZG9rb250byBleHRlbmRzIEdTZXpuYW1Fa29aYXpuYW11QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCAge1xyXG4gICAgICAgIC8qKiBHbG9iYWxuaSBtb2R1bG92ZSBwYXJhbWV0cnkgdiBKUyAqL1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vemtyYXRreTogR29yZGljLlVjci5XZWJDbGllbnQuRHRvLkdVY3Jaa3JEdG87XHJcbiAgICAgICAgLy90ZXh0eTogR29yZGljLlVjci5XZWJDbGllbnQuRHRvLkdVY3Jaa3JEdG87XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIGRldGFpbEFjdDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIHByZXZGaWx0ZXJBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBuZXh0RmlsdGVyQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgemFwaXN5QWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgemFwaXN5QWxsQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgZG9rbGFkQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgcHJpbWRva2xhZEFjdDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIGRva2xhZFJPQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgZG9rbGFkQkxLQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgaW5zQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgY2xlYXJBbmRGaWx0ZXJBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBzZWxGaWx0ZXJBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBzZWxGaWx0ZXJBbmRTZWFyY2hBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXJQaWRBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBzaERva2xhZHlBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBzaFphcGlzeUFjdDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIHphdHJpZGl0QWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIC8vIGF0cmlidXR5IHpvYnJhemVuaSBzbG91cGN1IChwb3V6ZSBwcm8gc2FsZG9rb250bylcclxuICAgICAgICBwdWJsaWMgdXNlTlM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgIHB1YmxpYyB1c2VPUko6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgIHB1YmxpYyB1c2VPUkc6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgICAgICAvKiogTGltaXQgcG9jdHUgbmFjaXRhbnljaCB6YXpuYW11LCBwb2t1ZCBuZWRvamRlIGsgcG90dnJ6ZW5pLCB6ZSB1eml2YXRlbCBjaGNlIGppdCBwcmVzIGxpbWl0ICovXHJcbiAgICAgICAgc3VtTGltaXQ6IG51bWJlcjtcclxuICAgICAgICBsb2dPcHRpb25zID0geyBuYW1lOiBcIkdTZXpuYW1Fa29TYWxkb2tvbnRvXCIsIGF1dGhvckNvZGU6IDMxMSwgZmlsZTogXCJHU2V6bmFtRWtvU2FsZG9rb250by50c1wiIH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtvbnN0cnVrdG9yXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGNvbnRlbnQgLSBwYXJlbnQgY29udGVudFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IEdTZXpuYW1Fa29aYXpuYW11QmFzZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgc3VwZXIoY29udGVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuc291Y2V0VmVTdGF0dXNCYXJ1ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5wb3ZvbGVuTmFobGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vIG5hY3RlbmkgdWxvemVueWNoIHV6aXYuIGhvZG5vdFxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnRDbnQuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250bykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VOUyA9IHRoaXMucGFyZW50Q250LnVzZXJTZXR0aW5ncyEuZ2V0KFwidXNlZE5TXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlT1JKID0gdGhpcy5wYXJlbnRDbnQudXNlclNldHRpbmdzIS5nZXQoXCJ1c2VkT1JKXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlT1JHID0gdGhpcy5wYXJlbnRDbnQudXNlclNldHRpbmdzIS5nZXQoXCJ1c2VPUkdcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNlIHRhc2t1IHBybyBzZXpuYW0gYSBuYWN0ZW5pIHBvY3R1XHJcbiAgICAgICAgICAgIHRoaXMudGFza0xpc3QgPSB0aGlzLnBhcmVudENudC5pc2wuVWNyU2FsZG9rb250by5saXN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFza0NvdW50ID0gdGhpcy5wYXJlbnRDbnQuaXNsLlVjclNhbGRva29udG8uY291bnQoKTtcclxuICAgICAgICAgICAgLy8gcG91eml2YXQgZmlsdHIgbmEgUEFQIHJhZGt5XHJcbiAgICAgICAgICAgIHRoaXMudXNlUGFwUm93cyA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIG1vem5vc3QgdWtsYWRhbmkgaGlzdG9yaWUgZmlsdHJ1XHJcbiAgICAgICAgICAgIHRoaXMucmVtZW1iZXJIaXN0b3J5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fbmFzdGF2ZW5pQWtjaSgpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5XzEoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5wYXJlbnRDbnQuZ2xvYmFscyA9IEdvcmRpYy5VY3IuR2xvYmFscy5HVWNyR2xvYmFscztcclxuICAgICAgICAgICAgLy90aGlzLnprcmF0a3kgPSBHb3JkaWMuVWNyLkdsb2JhbHMuR1prcjtcclxuICAgICAgICAgICAgLy90aGlzLnRleHR5ID0gR29yZGljLlVjci5HbG9iYWxzLkdUeHQ7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBuYWN0ZW5pIHVsb3plbnljaCB1eml2LiBob2Rub3RcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlTlMgPSB0aGF0LnBhcmVudENudC51c2VyU2V0dGluZ3MhLmdldChcInVzZWROU1wiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZU9SSiA9IHRoYXQucGFyZW50Q250LnVzZXJTZXR0aW5ncyEuZ2V0KFwidXNlZE9SSlwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZU9SRyA9IHRoYXQucGFyZW50Q250LnVzZXJTZXR0aW5ncyEuZ2V0KFwidXNlT1JHXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubWVudUJhcih0aGlzLmNyZWF0ZU1lbnViYXJEZWYodGhpcy5wYXJlbnRDbnQuVHlwVWxvaHkpKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRldGFpbEluZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0aGlzLmRldGFpbEluZi50cmltKCkgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q250LnN0YXR1c0JhcihbeyB0eXBlOiBcInN0YXRpY1wiLCBjYXB0aW9uOiB0aGlzLmRldGFpbEluZiB9XSlcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGaWx0ZXJQYW5lbCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCh0aGlzLnBhcmVudENudC5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXMgfHwgdGhpcy5wYXJlbnRDbnQuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfTmV6YXJhemVuZV96YXBpc3lcclxuICAgICAgICAgICAgICAgIHx8IHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5XHJcbiAgICAgICAgICAgICkgJiYgKHRoaXMucGFyZW50Q250LnVzZXJTZXR0aW5ncz8uZ2V0KFwicm96c2lyZW55UG9waXNBdXRvQWRkR3JpZENvbHVtbnNcIikgYXMgYm9vbGVhbiA/PyBmYWxzZSkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFN0clBvcGlzQ29sdW1ucyA9IHRoaXMucGFyZW50Q250LnVzZXJTZXR0aW5ncz8uZ2V0KFwicm96c2lyZW55UG9waXNTaG93R3JpZENvbHVtbnNcIik7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGxldCBncmlkRm9ybWF0ID0gdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvZmlsZXMgPSB0aGlzLmNyZWF0ZVByb2ZpbGVzKGdyaWRGb3JtYXQpO1xyXG4gICAgICAgICAgICBsZXQgcHJvZmlsZXNBcnIgPSBbdGhpcy5wcm9maWxlcy5kZWZhdWx0XTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvZmlsZXMuZG9rbGFkeSkgcHJvZmlsZXNBcnIucHVzaCh0aGlzLnByb2ZpbGVzLmRva2xhZHkpO1xyXG4gICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuSXNsLlZpZXc8SUdTZXpuYW1aYXBpc3VTdGF2dUR0b1dpdGhUYWJTZXR0aW5ncz4oXHJcbiAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5pc2wuVWNyU2FsZG9rb250by5saXN0KCAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICApLnVzZSgocmVxLCBuZXh0LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGaWx0ZXJEYXRhKHRoYXQsIHJlcSwgbmV4dCkgYXMgYW55OyAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJQYW5lbDogdGhhdC4kZmlsdGVyUGFuZWwsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRFbXB0eTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB2aWV3Lm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgIHRoYXQuX25hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgIC8vTmFzdGF2ZW5pUHJpc3R1cG5vc3RpKHRoYXQpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBsZXQgc3VtQ29scyA9IGdyaWRGb3JtYXQuY29sdW1ucy5maWx0ZXIoYyA9PiAoYy5jb2x1bW5UeXBlID09IFwiY3VycmVuY3lcIiB8fCBjLmNvbHVtblR5cGUgPT0gXCJudW1iZXJcIikgJiYgKFwic3RhdHVzLGRyZCxtZXNpYyxkZW4scm9rXCIuaW5kZXhPZihjLm5hbWUhKSkgPT0gLTEpLm1hcChlID0+IGUubmFtZSkgYXMgc3RyaW5nW107XHJcblxyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gJC5uZXdEaXYodGhhdC5jbGFzc0dyaWQpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5wYXJlbnRDbnQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICAvL3Jvd0hlaWdodDogMzIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsICAgICAvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHZpZXcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oeyAgICAgLy9vYnNsdXpuYSBha2NlLCBrdGVyYSBzZSBzcG91c3RpIGRibCBjbGlja2VtIG5hZCByYWRrZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUm93U2VsZWN0ZWRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3daYXBpc3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1wicG9waXNcIiwgXCJhY1wiXSwgLy9zbG91cGNlLCBwb2RsZSBrdGVyeWNoIHNlIHZ5aGxlZGF2YSB2IHNlYXJjaGJveHUgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpIGFzIGFueSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZTogdGhpcy5wcm9maWxlcy5kZWZhdWx0LCAvL3Nrcnl0ZSBzbG91cGNlIHJlc2l0IHByZXMgY29sdW1uLmhpZGRlbiArIGNvbHVtbkxpc3QgLSB1eml2YXRlbGkganNvdSBza3J5dGUsIG11emUgc2kgamUgdm9saXRlbG5lIHphcG5vdXRcclxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlczogcHJvZmlsZXNBcnIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dE1lbnU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuY2xlYXJGaWx0ZXJSb3dBY3QgfVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiAoZXYsIHNlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ByZXZpZXdTaWRlYmFyLmVtcHR5KCkuYXBwZW5kKFwiPGRpdj5cIiArIHNlbC5nZXRTZWxlY3Rpb24oZmFsc2UpWzBdLml4cCArIFwiPC9kaXY+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcyA9IHNlbC5nZXRTZWxlY3Rpb24oZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3RBY3QuZW5hYmxlZChzLmxlbmd0aCA+IDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh0aGlzLnByZXZpZXdDb250cm9sbGVyICYmIHR5cGVvZiB0aGlzLnByZXZpZXdDb250cm9sbGVyICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyPy5zaG93KHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vY2VsbEFjdGl2YXRlOiBmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKFwiY2VsbEFjdGl2YXRlXCIsIGFyZ3VtZW50cyk7fSAvL05PVEU6IE5lZG9zdGFudSBzZSBrIHB1dm9kbmkgdWRhbG9zdGksIGFieWNoIHpqaXN0aWwsIHpkYSBzZSBkcnppIGN0cmxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWRla28oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzb3XEjXRvdsO9IMWZw6FkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeVJvd0FsbG93ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnlSb3dDb2x1bW5zOiBzdW1Db2xzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkbG91aMO9IHNlem5hbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25nTGlzdEFsbG93ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbG9uZ0xpc3RNb2RpZnlScU1ldGhvZDogKHJxKSA9PiB7IGRlYnVnZ2VyOyByZXR1cm4gdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25nTGlzdE1vZGVsOiBcIkdsb2JhbC5VY3IuQXBwU2V0dGluZ3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ0xpc3RDb3VudE1ldGhvZDogKHJxKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5wYXJlbnRDbnQuaXNsLlVjclNhbGRva29udG8uY291bnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51c2UoKHJlcSwgbmV4dCwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpbHRlckRhdGEodGhhdCwgcmVxLCBuZXh0KSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgJC5EZWZlcnJlZCgpLnJlc29sdmUoMSkucHJvbWlzZSgpLy90aGF0LmlzbC5aYXBvY3RvdnlMaXN0Lmxpc3RDb3VudChycSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWRzZXJ2ZXJmaWx0ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaW52YWxpZFZhbHVlQ2hhbmdlZDogZnVuY3Rpb24gKGV2KSB7IHRoYXQubG9hZERhdGEoKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHREYXRhOiB7IG5rczogeyBzdGFydDogXCIwMDAwMDRcIiwgZW5kOiBcIjAwMDAwNFwiIH0gfVxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHREYXRhOiB0aGlzLkZpbHRlclxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImdjZnVmaWx0ZXJpbnZhbGlkdmFsdWVzZXRcIiwgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LmxvYWREYXRhMigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuOyAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIEtsLiB6a3JhdGt5XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU2hvcnRDdXQoKTtcclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLkF1dG9Mb2FkRGF0YSlcclxuICAgICAgICAgICAgICAgIHZpZXcucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5sb2FkRGF0YTIoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWN0aSBmaWx0cnlcclxuICAgICAgICAgKiBAcGFyYW0gdGhhdFxyXG4gICAgICAgICAqIEBwYXJhbSByZXFcclxuICAgICAgICAgKiBAcGFyYW0gbmV4dFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXRGaWx0ZXJEYXRhKHRoYXQ6IHRoaXMsIHJlcTogSXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIG5leHQ6IElzbC5UYXNrUnVudGltZU5leHQ8SXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxVY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0bz4+IHwgSXNsLlRhc2tSdW50aW1lTmV4dDxJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgbnVtYmVyPik6IElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxVY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0bz4gfCBKUXVlcnlQcm9taXNlPElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxVY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0bz4+IHwgSlF1ZXJ5UHJvbWlzZTxudW1iZXI+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmdldEZpbHRlcih0aGF0LiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJnZXRDdXJyZW50RGF0YVwiKSlcclxuICAgICAgICAgICAgLy9yZXR1cm4gdGhhdC5nZXRGaWx0ZXIodGhhdC4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q29uZmlybWVkRGF0YVwiKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChuZXdGaWx0ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB6amlzdGVuaSB2eWJyYW55Y2ggc2xvdlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlTlMgPSBmYWxzZTsgdGhpcy51c2VPUkcgPSBmYWxzZTsgdGhpcy51c2VPUkogPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IChuZXdGaWx0ZXIuZmlsdGVyIGFzIGFueSkudm9sYnkhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobmV3RmlsdGVyLmZpbHRlciBhcyBhbnkpLnZvbGJ5W2ldID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZU5TID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChuZXdGaWx0ZXIuZmlsdGVyIGFzIGFueSkudm9sYnlbaV0gPT0gMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlT1JKID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChuZXdGaWx0ZXIuZmlsdGVyIGFzIGFueSkudm9sYnlbaV0gPT0gMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlT1JHID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0ZpbHRlci51c2VOUyA9IHRoaXMudXNlTlM7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3RmlsdGVyLnVzZU9SRyA9IHRoaXMudXNlT1JHO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0ZpbHRlci51c2VPUkogPSB0aGlzLnVzZU9SSjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFkZEZpbHRlckludG9IaXN0b3J5KCQuZXh0ZW5kKHRydWUsIHt9LCBuZXdGaWx0ZXIpICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKHRoYXQuYWRkRmlsdGVyVG9IaXN0b3J5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKHRoYXQuY3VyckZpbHRlckhpc3RvcnlJbmRleCAhPT0gdGhhdC5maWx0ZXJIaXN0b3J5Lmxlbmd0aCAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuZmlsdGVySGlzdG9yeS5zcGxpY2UodGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4ICsgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQuZmlsdGVySGlzdG9yeS5wdXNoKG5ld0ZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LmFkZEZpbHRlclRvSGlzdG9yeSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8vLyB6amlzdGVuaSB2eWJyYW55Y2ggc2xvdlxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy51c2VOUyA9IGZhbHNlOyB0aGlzLnVzZU9SRyA9IGZhbHNlOyB0aGlzLnVzZU9SSiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZm9yICh2YXIgaSA9IDA7IGkgPCAobmV3RmlsdGVyLmZpbHRlciBhcyBhbnkpLnZvbGJ5IS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICgobmV3RmlsdGVyLmZpbHRlciBhcyBhbnkpLnZvbGJ5W2ldID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMudXNlTlMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICgobmV3RmlsdGVyLmZpbHRlciBhcyBhbnkpLnZvbGJ5W2ldID09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMudXNlT1JKID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBpZiAoKG5ld0ZpbHRlci5maWx0ZXIgYXMgYW55KS52b2xieVtpXSA9PSAzKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGlzLnVzZU9SRyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vbmV3RmlsdGVyLnVzZU5TID0gdGhpcy51c2VOUztcclxuICAgICAgICAgICAgICAgICAgICAvL25ld0ZpbHRlci51c2VPUkcgPSB0aGlzLnVzZU9SRztcclxuICAgICAgICAgICAgICAgICAgICAvL25ld0ZpbHRlci51c2VPUkogPSB0aGlzLnVzZU9SSjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hc2thID0gbmV3RmlsdGVyLmZpbHRlcjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIG5ld0ZpbHRlci5maWx0ZXI/LmNmdSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNrYSFbbmFtZV0gPSBuZXdGaWx0ZXIuZmlsdGVyPy5jZnVbbmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5uZXh0RmlsdGVyQWN0LmVuYWJsZWQodGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4IDwgdGhhdC5maWx0ZXJIaXN0b3J5Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5wcmV2RmlsdGVyQWN0LmVuYWJsZWQodGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4ID4gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJxOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyTGlzdFJlcXVlc3REdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ292YXRHZHByOiB0cnVlLCBuczogdGhpcy51c2VOUywgb3JnOiB0aGlzLnVzZU9SRywgb3JqOiB0aGlzLnVzZU9SSixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4UmVjb3JkczogR29yZGljLkVrby5VdGlscy5HZXRVc2VyU2V0dGluZ3NMaXN0V2FybmluZyh0aGF0LnBhcmVudENudCwgXCJHbG9iYWwuVWNyLkFwcFNldHRpbmdzXCIpID8gR29yZGljLkVrby5VdGlscy5HZXRVc2VyU2V0dGluZ3NMaXN0TWF4Q291bnQodGhhdC5wYXJlbnRDbnQsIFwiR2xvYmFsLlVjci5BcHBTZXR0aW5nc1wiKSA6IC0xLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIC8vIHBvZG1pbmthIG5hIFBBUCB1Y3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICBQYXA6IHRoYXQudXNlUGFwUm93cyA/eyB2OiB0aGF0LmdldENoZWNrZWRQYXAoKSA/IDAgOiAxfSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgbWFza2EhW1widm9sYnlcIl0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcnEubWFza2EgPSBtYXNrYTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3UmVxdWVzdCA9ICQuZXh0ZW5kKHRydWUsIHt9LCByZXEpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1JlcXVlc3RbXCJmaWx0ZXJzXCJdID0gcnE7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UmVxdWVzdC5maWx0ZXJzIVtcInZvbGJ5XCJdID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuIG5leHQobmV3UmVxdWVzdCk7ICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwib3B0aW9uXCIsIFwiY29sdW1uc1wiLCB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgKG5ld1JlcXVlc3QuZmlsdGVycyFbXCJ2b2xieVwiXSk7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHQobmV3UmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBrbGF2ZXNvdnljaCB6a3JhdGVrXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBjcmVhdGVTaG9ydEN1dCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlU2hvcnRDdXQoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIG5hc3RhdmVuaUFrY2koZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PiwgcG9jZXRSYWRrdTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIC8vc3VwZXIubmFzdGF2ZW5pQWtjaSgpO1xyXG4gICAgICAgICAgICAvL2xldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIC8vaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgZW5hYmxlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkNlbGtvdnlQb2NldFJhZGt1KGdyaWQpID4gMDtcclxuICAgICAgICAgICAgdmFyIGVuYWJsZSA9IHBvY2V0UmFka3UgPiAwO1xyXG4gICAgICAgICAgICAvLyBwcmlzdHVwbm9zdCBha2NpIGRsZSBuYWN0ZW55Y2ggZGF0XHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsQWN0LmVuYWJsZWQoZW5hYmxlKTtcclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJQaWRBY3QuZW5hYmxlZChlbmFibGUpO1xyXG4gICAgICAgICAgICB0aGlzLmRva2xhZEFjdC5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJpbWRva2xhZEFjdC5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZG9rbGFkQkxLQWN0LmVuYWJsZWQoZW5hYmxlKTtcclxuICAgICAgICAgICAgdGhpcy5kb2tsYWRST0FjdC5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hEb2tsYWR5QWN0LmVuYWJsZWQoZW5hYmxlKTtcclxuICAgICAgICAgICAgdGhpcy56YXBpc3lBY3QuZW5hYmxlZChlbmFibGUpO1xyXG4gICAgICAgICAgICB0aGlzLnphcGlzeUFsbEFjdC5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2haYXBpc3lBY3QuZW5hYmxlZChlbmFibGUpO1xyXG4gICAgICAgICAgICB0aGlzLmRvdEFjdC5lbmFibGVkKGVuYWJsZSk7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnVwZGF0ZURhdGEoZGF0YS5TZXpuYW1aYXBpc3UsIFwicmVzZXRcIik7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXI/LmVuYWJsZShlbmFibGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0U2V6bmFtWmFwaXN1U3RhdnVEdG8gLyomIEdTZXpuYW1aYXBpc3VTdGF2dUR0byovPiB7XHJcbiAgICAgICAgICAgIHZhciBnZiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0byAvKiYgR1Nlem5hbVphcGlzdVN0YXZ1RHRvKi8+ICgpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAvLyBNb2RpZmlrb3ZhbmUgU3UgYSBBdVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFyZW50Q250Lm1vZGlmeUNmdS5jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjID0gdGhpcy5wYXJlbnRDbnQubW9kaWZ5Q2Z1LmNvbHVtbnNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYy5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGMuY2FwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogYy5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogYy53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5jZnVJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNmdTogYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNSb3o6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1VjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGAke2MubmFtZX1gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbW9kZWw6IGAke2MubmFtZX1fcmVnYFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudENudC5nbG9iYWxzLlNhbGRva29udG9QYXJhbTEhLnRyaW0oKSAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWx1ZTBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnBhcmVudENudC5nbG9iYWxzLlNhbGRva29udG9QYXJhbTEhLnRyaW0oKSxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbmFtZTogXCJ2YWx1ZTBcIiwgbW9kZWw6IFwidmFsdWUwXCIsIGNhcHRpb246IHRoaXMucGFyZW50Q250Lmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMSEudHJpbSgpIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Q250Lmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMiEudHJpbSgpICE9IFwiXCIpXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbHVlMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMucGFyZW50Q250Lmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMiEudHJpbSgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBuYW1lOiBcInZhbHVlMVwiLCBtb2RlbDogXCJ2YWx1ZTFcIiwgY2FwdGlvbjogdGhpcy5wYXJlbnRDbnQuZ2xvYmFscy5TYWxkb2tvbnRvUGFyYW0yIS50cmltKCkgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnRDbnQuZ2xvYmFscy5UeXBQcmFjZUVTVSEgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JUeXBQcmFjZUVTVS5OZSkge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucGFyZW50Q250Lmdsb2JhbHMuUmV6aW1Qcm92b3p1ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LlNPUiAmJiB0aGlzLnBhcmVudENudC5nbG9iYWxzLlR5cFN1bWFyaXphY2UgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JUeXBTdW1hcml6YWNlLkV4dGVybmkpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19lc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyODJcIiwgLy9SQyAzMDI1MDI4MiA6IElEIEVTVVxyXG4gICAgICAgICAgICAgICAgICAgIC8vZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1M1wiLCAvL1JDIDMxMTAwMjUzIDogScSMTyBFeHRlcm7DrWhvIHN1Ympla3R1IHByaW3DoXJuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkZpbHRlclByZWZhYnMuZXN1X2l4cyh7IG1vZGVsOiBcIml4c19lc3VcIiwgaXhzX2VzdVBhdGg6IFwiX2VzdV9peHNcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjgyXCIgfSkgLy9SQyAzMDI1MDI4MiA6IElEIEVTVVxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nU2luZ2xlKHsgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjgyXCIsIG1vZGVsOiBcIml4c19lc3VcIiB9KSAvL1JDIDMwMjUwMjgyIDogSUQgRVNVXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXN1X2ljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA4MFwiICsgXCIgXCIgKyB0aGlzLnprcmF0a3kuSWNvLCAgLy9SQyAzMTEwMDA4MCA6IEVTVVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNTNcIiwgLy9SQyAzMTEwMDI1MyA6IEnEjE8gRXh0ZXJuw61obyBzdWJqZWt0dSBwcmltw6FybsOtaG8gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkZpbHRlclByZWZhYnMuZXN1X2ljbyh7IG1vZGVsOiBcImVzdV9pY29cIiwgaXhzX2VzdVBhdGg6IFwiX2VzdV9pY29faXhzXCIsIGNhcHRpb246IFwianJlczozMTEwMDA4MFwiICsgXCIgXCIgKyB0aGlzLnprcmF0a3kuSWNvIH0pIC8vUkMgMzExMDAwODAgOiBFU1VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlc3VfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgwXCIsIC8vUkMgMzExMDAwODAgOiBFU1VcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjUyXCIsIC8vUkMgMzExMDAyNTIgOiBFeHRlcm7DrSBzdWJqZWt0XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkZpbHRlclByZWZhYnMuZXN1X3R4dCh7IG1vZGVsOiBcImVzdV90eHRcIiwgaXhzX2VzdVBhdGg6IFwiX2VzdV90eHRfaXhzXCIsIGNhcHRpb246IFwianJlczozMTEwMDA4MFwiIH0pICAvL1JDIDMxMTAwMDgwIDogRVNVXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gTktTXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VOUylcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMubmtzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLm5rcylcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIE1vZGlmaWtvdmFuZSBvcmpcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnVzZU9SSilcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wYXJlbnRDbnQud29kck9yai5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnBhcmVudENudC53b2RyT3JqLmNhcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnBhcmVudENudC53b2RyT3JqLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5wYXJlbnRDbnQud29kck9yai53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuY2Z1SW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Z1OiB0aGlzLnBhcmVudENudC53b2RyT3JqLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSb3o6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNVY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYCR7dGhpcy5wYXJlbnRDbnQud29kck9yai5uYW1lfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbW9kZWw6IGAke2MubmFtZX1fcmVnYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gTW9kaWZpa292YW5lIG9yZ1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlT1JHKVxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnBhcmVudENudC53b2RyT3JnLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMucGFyZW50Q250LndvZHJPcmcuY2FwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMucGFyZW50Q250LndvZHJPcmcuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnBhcmVudENudC53b2RyT3JnLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5jZnVJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZnU6IHRoaXMucGFyZW50Q250LndvZHJPcmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JvejogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1VjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBgJHt0aGlzLnBhcmVudENudC53b2RyT3JnLm5hbWV9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9tb2RlbDogYCR7Yy5uYW1lfV9yZWdgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyNzBcIiwgLy9SQyAzMDI1MDI3MCA6IE1EXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAyNzBcIiB9KSAgLy9SQyAzMDI1MDI3MCA6IE1EXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjcxXCIsIC8vUkMgMzAyNTAyNzEgOiBEYWxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMxXCIsIGNhcHRpb246IFwianJlczozMDI1MDI3MVwiIH0pIC8vUkMgMzAyNTAyNzEgOiBEYWxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDI3MlwiLCAvL1JDIDMwMjUwMjcyIDogTUQgLSBEYWxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbjogIXRoaXMucGFyZW50Q250Lmdsb2JhbHMuUmFkX1pvYnJhek1kRGFsLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwYzFcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjcyXCIgfSkgLy9SQyAzMDI1MDI3MiA6IE1EIC0gRGFsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5Qcml6SWlzc3ApIHtcclxuICAgICAgICAgICAgICAgIGxldCBpaXNzcERpc2FibGUgPSB0aGlzLnBhcmVudENudC5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9QcmV1Y3RvdmFuaV9zdGF2eTtcclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRfaGRyX3Jpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA4MlwiLCAvL1JDIDMxMTAwMDgyIDogSUQgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjU1XCIsIC8vUkMgMzExMDAyNTUgOiBJZGVudGlmaWvDoXRvciByZXplcnZhY2Ugcm96cG/EjXRvdsO9Y2ggcHJvc3TFmWVka8WvIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpZF9oZHJfcmlzXCIsIGNhcHRpb246IFwianJlczozMTEwMDA4MlwiLCBkaXNhYmxlZDogaWlzc3BEaXNhYmxlLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogOSB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDkgfSB9KSAvL1JDIDMxMTAwMDgyIDogSUQgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAvL21heExlbmd0aDogOVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmFkZWtfaGRyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgzXCIsLy9SQyAzMTEwMDA4MyA6IMWZw6FkZWsgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjU2XCIsIC8vUkMgMzExMDAyNTYgOiDFmMOhZGVrIHJlemVydmFjZSByb3pwb8SNdG92w71jaCBwcm9zdMWZZWRrxa8gSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHsgbW9kZWw6IFwicmFkZWtfaGRyXCIsIGNhcHRpb246IFwianJlczozMTEwMDA4M1wiLCBkaXNhYmxlZDogaWlzc3BEaXNhYmxlIH0pIC8vUkMgMzExMDAwODMgOiDFmcOhZGVrIElJU1NQXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ2YgYXMgYW55O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dG9yZW5pIGFrY2lcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5kZXRhaWxBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRldGFpbEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjY2XCIsIC8vUkMgMzExMDAyNjYgOiBab2JyYXppdCBkZXRhaWxcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZpc2libGU6ICh0aGlzLnBhcmVudENudC5UeXBVbG9oeSAhPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlByaW1hcm5pUG96YWRhdmt5WmFwaXMgJiYgdGhpcy5wYXJlbnRDbnQuVHlwVWxvaHkgIT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5CYWxhbmNvdmFuaVphcGlzICYmIHRoaXMucGFyZW50Q250LlR5cFVsb2h5ICE9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250byksXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuc2hvd0RldGFpbCgpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuemFwaXN5QWN0ID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ6YXBpc3lBY3RcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxMjRcIiwgLy9SQyAzMTEwMDEyNCA6IFrDoXBpc3lcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93WmFwaXN5KCk7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuemFwaXN5QWxsQWN0ID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ6YXBpc3lBbGxBY3RcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyNzNcIiwgLy9SQyAzMDI1MDI3MyA6IFrDoXBpc3kgdsWhZVxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLnNob3daYXBpc3lBbGwoKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5kb2tsYWRBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRva2xhZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyMzNcIiwgLy9SQyAzMTEwMDIzMyA6IERva2xhZHkvesOhcGlzeVxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLnRvZ2dsZUdyb3VwaW5nKCk7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJpbWRva2xhZEFjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpbWRva2xhZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLWV4dGVybmFsLWxpbmtcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE1NFwiLCAvL1JDIDMwMjUwMTU0IDogUHJpbS4gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuc2hvd1ByaW1Eb2tsYWQoKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5kb2tsYWRCTEtBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRva2xhZEJMS0FjdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLWV4dGVybmFsLWxpbmtcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE1NVwiLCAvL1JDIDMwMjUwMTU1IDogRG9rbGFkIEJMS1xyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLnNob3dQcmltRG9rbGFkKHVuZGVmaW5lZCwgXCJCTEtcIik7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZG9rbGFkUk9BY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRva2xhZFJPQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtZXh0ZXJuYWwtbGlua1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTU2XCIsIC8vUkMgMzAyNTAxNTYgOiBEb2tsYWQgUk9cclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93UHJpbURva2xhZCh1bmRlZmluZWQsIFwiUk9cIik7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJQaWRBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImZpbHRlclBpZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiB0aGlzLnBhcmVudENudC5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXNcclxuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLnBhcmVudENudC5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9OZXphcmF6ZW5lX3phcGlzeVxyXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wYXJlbnRDbnQuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRaYXBpc1xyXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRGFub3ZhRXZpZGVuY2VaYXBpc1xyXG4gICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuOyAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbCA9IGdyaWQuZ2dyaWQ8VWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWwubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47IFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBncmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZ3JpZHNlcnZlcmZpbHRlcihcImNsZWFyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZ3JpZHNlcnZlcmZpbHRlcihcImFwcGx5XCIsIHsgaXhwOiBzZWxbMF0uaXhwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9GaWx0ZXJDbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hEb2tsYWR5QWN0ID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzaERva2xhZHlBY3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogKHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlJvenBvY2V0WmFwaXMgfHwgdGhpcy5wYXJlbnRDbnQuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVphcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5wYXJlbnRDbnQuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfTmV6YXJhemVuZV96YXBpc3lcclxuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLnBhcmVudENudC5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9QcmV1Y3RvdmFuaV9zdGF2eVxyXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRGFub3ZhRXZpZGVuY2VaYXBpcyksXHJcbiAgICAgICAgICAgICAgICAvL05PVEU6IEphayB0byBkZWxhamkgdiB0bHVzdHltOiBHU2V6bmFtVWN0WmF6bmFtdVN0YXZ5WmFwaXN5VGFiLm1fQWN0aW9uRG9rbGFkeV9TdGFydCgpOiBcclxuICAgICAgICAgICAgICAgIC8vUHJvdmVkb3Ugc2Vza3VwZW5pLCBrdGVyZSBwcmlkYWppIGpha28gbm92ZSByYWRreSBhIHBhayB6YWZpbHRydWppIHBvdXplIG5hIHNvdWN0b3ZlIHJhZGt5XHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHsgdGhpcy50b2dnbGVHcm91cGluZyh0aGlzLnByb2ZpbGVzLmRva2xhZHkhLm5hbWUpOyB9XHJcbiAgICAgICAgICAgIH0pOyBcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2haYXBpc3lBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNoWmFwaXN5QWN0XCIsXHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiAodGhpcy5wYXJlbnRDbnQuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRaYXBpcyB8fCB0aGlzLnBhcmVudENudC5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXNcclxuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLnBhcmVudENudC5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9OZXphcmF6ZW5lX3phcGlzeVxyXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5XHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHsgdGhpcy50b2dnbGVHcm91cGluZyh0aGlzLnByb2ZpbGVzLmRlZmF1bHQubmFtZSk7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluaWNlIG1lbnVcclxuICAgICAgICAgKiBAcGFyYW0gdHlwVWxvaHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnViYXJEZWYodHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUpOiBNZW51UGFyYW1zW10ge1xyXG4gICAgICAgICAgICBsZXQgbWVudSA9IG5ldyBBcnJheTxNZW51UGFyYW1zPigpO1xyXG5cclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLmRldGFpbEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wcmV2RmlsdGVyQWN0LCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLm5leHRGaWx0ZXJBY3QsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcmludEFjdClcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wcmludEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVN0YXZcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlJvenBvY2V0U3RhdiB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvKVxyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnphcGlzeUFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGlmICh0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvKVxyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnphcGlzeUFsbEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVphcGlzXHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9OZXphcmF6ZW5lX3phcGlzeVxyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfUHJldWN0b3Zhbmlfc3RhdnlcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRGFub3ZhRXZpZGVuY2VaYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRaYXBpcylcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5kb2tsYWRBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICBpZiAodHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUHJpbWFybmlQb3phZGF2a3laYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQmFsYW5jb3ZhbmlaYXBpcykge1xyXG4gICAgICAgICAgICAgICAgLy9tZW51LnB1c2goeyBhY3Rpb246IHRoaXMucHJpbWRva2xhZEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMuZG9rbGFkUk9BY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLmRva2xhZEJMS0FjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlByaW1hcm5pUG96YWRhdmt5WmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkZpbmFuY292YW5pWmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfTmV6YXJhemVuZV96YXBpc3lcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5XHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5Sb3pwb2NldFphcGlzXHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5CYWxhbmNvdmFuaVphcGlzXHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvWmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpc3lWc2VcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucHJpbWRva2xhZEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX05lemFyYXplbmVfemFwaXN5ICYmIHRoaXMuemF0cmlkaXRBY3QpIFxyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnphdHJpZGl0QWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMuY2xlYXJGaWx0ZXJSb3dBY3QgfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN0YXRpY1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjY4XCIsIC8vUkMgMzExMDAyNjggOiBSeWNobMOpIGFrY2VcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuaW5zQWN0LCBpY29uOiBcImdpLXJlZnJlc2hcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjI2XCIgfSwgLy9SQyAzMTEwMDIyNiA6IE5hxI10ZW7DrSBkYXRcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5jbGVhckFuZEZpbHRlckFjdCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjI4XCIgfSwgLy9SQyAzMTEwMDIyOCA6IFZ5xI1pc3RpdCBhIG5hxI3DrXN0XHJcbiAgICAgICAgICAgICAgICAgICAgLy9OT1RFOiBUeXRvIGR2ZSBha2NlIGJ1ZG91IHZ6ZHkgZnVuZ292YXQgcG91emUgeiBrbGF2ZXNuaWNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy97IGFjdGlvbjogdGhpcy5zZWxGaWx0ZXJBY3QsIGNhcHRpb246IFwianJlczozMTEwMDIyOVwiIH0sIC8vUkMgMzExMDAyMjkgOiBQxZllbmVzZW7DrSBob2Rub3R5IGRvIGZpbHRydS5cclxuICAgICAgICAgICAgICAgICAgICAvL3sgYWN0aW9uOiB0aGlzLnNlbEZpbHRlckFuZFNlYXJjaEFjdCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjM1XCIgfSwgLy9SQyAzMTEwMDIzNSA6IFDFmWVuZXNlbsOtIGhvZG5vdHkgZG8gZmlsdHJ1IGEgdnlobGVkw6Fuw60uXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuZG90QWN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA2MjBcIiwgLy9SQyAzMDI1MDYyMCA6IEZpbHRyb3ZhdCBkbGUgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzExMDAyMjdcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sIC8vUkMgMzExMDAyMjcgOiBab2JyYXplbsOtIHbFoWVjaCB6w6FwaXPFryBkb2tsYWTFryAoY2Vsw70gZG9rbGFkKSBuYWQgb3puYcSNZW7DvW0gesOhcGlzZW0uXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuZmlsdGVyUGlkQWN0LCBjYXB0aW9uOiBcImpyZXM6MzExMDAyODBcIiB9LCAvL1JDIDMxMTAwMjgwIDogRmlsdHJvdmF0IGRsZSBQSURcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5zaERva2xhZHlBY3QsIGNhcHRpb246IFwianJlczozMTEwMDIzMVwiIH0sIC8vUkMgMzExMDAyMzEgOiBEb2tsYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuc2haYXBpc3lBY3QsIGNhcHRpb246IFwianJlczozMTEwMDEyNFwiIH0gLy9SQyAzMTEwMDEyNCA6IFrDoXBpc3lcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWVudTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvL3B1YmxpYyBnZXRGaWx0ZXIoZlBhbmVsRGF0YT86IGFueSk6IEpRdWVyeVByb21pc2U8R1Nlem5hbUVrb1phem5hbXVHZXREYXRhRmlsdGVyRHRvPiB7XHJcbiAgICAgICAgLy8gICAgdmFyIGZpbHRlckR0byA9IGZQYW5lbERhdGEgfHwge307XHJcbiAgICAgICAgLy8gICAgbGV0IGVsZW1lbnR5OiBhbnkgPSBudWxsOyAvL1RPRE86IFBvIHZ5YmVydSB2YXJpYW50eSBvdHlwb3ZhdCEhIVxyXG4gICAgICAgIC8vICAgIGxldCBmaWx0ZXJTdHJQb3BpczogR1N0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlckR0b1tdID0gW107XHJcbiAgICAgICAgLy8gICAgaWYgKGZQYW5lbERhdGEpIHtcclxuICAgICAgICAvLyAgICAgICAgaWYgKGZQYW5lbERhdGEuZWxlbWVudHkgJiYgJC5pc1BsYWluT2JqZWN0KGZQYW5lbERhdGEuZWxlbWVudHkpKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgZWxlbWVudHkgPSBmUGFuZWxEYXRhLmVsZW1lbnR5O1xyXG5cclxuICAgICAgICAvLyAgICAgICAgaWYgKGZQYW5lbERhdGEuZmlsdGVyU3RyUG9waXMgJiYgZlBhbmVsRGF0YS5maWx0ZXJTdHJQb3BpcyBpbnN0YW5jZW9mIEFycmF5KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgZmlsdGVyU3RyUG9waXMgPSBmUGFuZWxEYXRhLmZpbHRlclN0clBvcGlzO1xyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvLyAgICByZXR1cm4gdGhpcy4kZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcjxHRWtvRmlsdGVyRHRvPihcImNvbGxlY3RcIiwgZmlsdGVyRHRvKVxyXG4gICAgICAgIC8vICAgICAgICAudGhlbigoZCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwiZmlsdGVyXCIsIGQpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLnRyYWNlKFwiZWxlbWVudHlcIiwgSlNPTi5zdHJpbmdpZnkoZWxlbWVudHkpKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcImZpbHRlclN0clBvcGlzXCIsIGZpbHRlclN0clBvcGlzKTtcclxuICAgICAgICAvLyAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy50cmFjZShcInN0clBvcGlzS2V5c1wiLCB0aGlzLmFkZFN0clBvcGlzQ29sdW1ucyk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIHsgZmlsdGVyOiBkLCBlbGVtZW50eTogZWxlbWVudHksIGZpbHRlclN0clBvcGlzOiBmaWx0ZXJTdHJQb3Bpcywgc2tpcFN1bUxpbWl0OiBmYWxzZSwgc3RyUG9waXNLZXlzOiB0aGlzLmFkZFN0clBvcGlzQ29sdW1ucyB9O1xyXG4gICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUZpbHRlclBhbmVsKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvL2xldCBjZnVTZXQgPSBHb3JkaWMuRWtvLkNmdVV0aWxzLmdldENmdVNldFNlcnZlckZpbHRlcnModGhpcy5wYXJlbnRDbnQsIHtcclxuICAgICAgICAgICAgLy8gICAgaXNSb3o6IHRoaXMuUm96cG9jZXQsXHJcbiAgICAgICAgICAgIC8vICAgIGlzVWN0OiB0aGlzLlVjZXRuaWN0dmksXHJcbiAgICAgICAgICAgIC8vICAgIGNoZWNrVWV0ZTogdGhpcy5wYXJlbnRDbnQuZWtvUGFyYW1zLkNoZWNrVWV0ZSxcclxuICAgICAgICAgICAgLy8gICAgaXhzUm96OiB0aGlzLnBhcmVudENudC5la29QYXJhbXMuSXhzUm96IHx8IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICAvL2xldCBjZnVTZXQgPSB0aGlzLmdldENmdVNldFNlcnZlckZpbHRlcnMoZmFsc2UpO1xyXG4gICAgICAgICAgICAvL3ZhciBnZiA9IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdFbGVtZW50VXRpbHMuY3JlYXRlRWxlbWVudHNHcmlkRm9ybWF0KHtcclxuICAgICAgICAgICAgLy8gICAgZWtvUGFyYW1zOiB0aGlzLnBhcmVudENudC5la29QYXJhbXMsXHJcbiAgICAgICAgICAgIC8vICAgIGdsb2JhbHM6IHRoaXMucGFyZW50Q250Lmdsb2JhbFBhcmFtcyxcclxuICAgICAgICAgICAgLy8gICAgdHlwU2VzdGF2eTogdGhpcy5wYXJlbnRDbnQudHlwU2VzdGF2eSxcclxuICAgICAgICAgICAgLy8gICAgY2Z1U2V0OiBjZnVTZXQsXHJcbiAgICAgICAgICAgIC8vICAgIGZpbHRlck9wdGlvbnM6IHRoaXMuZmlsdGVyT3B0aW9ucyxcclxuICAgICAgICAgICAgLy8gICAgZmlsdGVyUGFyYW1zOiB0aGlzLnBhcmVudENudC5maWx0ZXJQYXJhbXNcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGVsbVJvd09wdHMgPSB7IGxhYmVsOiBcIkVsZW1lbnR5XCIgfTtcclxuICAgICAgICAgICAgLy9lbG1Sb3dPcHRzW1wiZmF2b3JpdGVSb3dMYXlvdXREZXNjcmlwdG9yXCJdID0gXCJ3LUwtOSB3LU0tOCB3LVMtMTJcIjtcclxuICAgICAgICAgICAgbGV0IGZwRm9ybTogR29yZGljLkZvcm1zLkZvcm07XHJcblxyXG4gICAgICAgICAgICAgICAgZnBGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwianJlczozMDI1MDA1MlwiIH0pIC8vUkMgMzAyNTAwNTIgOiBGaWx0clxyXG4gICAgICAgICAgICAgICAgbGV0IHZvbGJ5RGF0YTogW3sgdGV4dCwgaG9kbm90YSB9XSA7XHJcbiAgICAgICAgICAgICAgICB2b2xieURhdGEgPSBbeyB0ZXh0OiB0aGlzLnprcmF0a3kuTmtzLCBob2Rub3RhOiAxIH1dOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wYXJlbnRDbnQud29kck9yaiAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICB2b2xieURhdGEucHVzaCh7IHRleHQ6IHRoaXMucGFyZW50Q250LndvZHJPcmouY2FwdGlvbiwgaG9kbm90YTogMiB9KTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wYXJlbnRDbnQud29kck9yZyAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICB2b2xieURhdGEucHVzaCh7IHRleHQ6IHRoaXMucGFyZW50Q250LndvZHJPcmcuY2FwdGlvbiwgaG9kbm90YTogMyB9KTtcclxuICAgICAgICAgICAgICAgIGxldCB2b2xieSA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KHZvbGJ5RGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICwgeyBrZXk6IFwiaG9kbm90YVwiIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5pdGlhbFZhbHVlID0gW107XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC51c2VOUylcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuemtyYXRreS5Oa3MsIGhvZG5vdGE6IDFcclxuICAgICAgICAgICAgICAgICAgICB9IGFzIG5ldmVyKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LnVzZU9SSilcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMucGFyZW50Q250LndvZHJPcmouY2FwdGlvbiwgaG9kbm90YTogMlxyXG4gICAgICAgICAgICAgICAgICAgIH0gYXMgbmV2ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQudXNlT1JHKVxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy5wYXJlbnRDbnQud29kck9yZy5jYXB0aW9uLCBob2Rub3RhOiAzXHJcbiAgICAgICAgICAgICAgICAgICAgfSBhcyBuZXZlcik7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBmcEZvcm0uYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZvbGJ5XCIsIGxpc3Q6IHRydWUsIGl0ZW1XaWR0aDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZHJvcGRvd246IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgLCBtdWx0aTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwibW9kZWwudm9sYnk9dmFsdWUuaG9kbm90YVwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBpdGVtVGVtcGxhdGU6IFwie3RleHR9XCJcclxuICAgICAgICAgICAgICAgICAgICAsIGRhdGE6IHZvbGJ5XHJcbiAgICAgICAgICAgICAgICAgICAgLCBpbml0aWFsVmFsdWU6IGluaXRpYWxWYWx1ZVxyXG4gICAgICAgICAgICAgICAgICAgICwgZW1wdHlWYWx1ZTogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICwgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmxvYWRpbmcgfHwgKG9iai5mbGFncyAmJiBvYmouZmxhZ3MuZmlsdGVyQ2xlYXIgPT09IHRydWUpKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnBhcmVudENudC5sb2FkaW5nKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqICYmIHR5cGVvZiBvYmoudmFsdWUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zZXRGaWx0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8gbmFzdGF2ZW5pIGFrY2lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IHZpZXcgPSB0aGF0LiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5zZXRBY3Rpb25zKHZpZXcuZ2V0RGF0YVJvd3MoKS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbCA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5wYXJlbnRDbnQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXM6IFtmcEZvcm1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZXM6IFtcIm1kXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZUxheW91dERlc2NyaXB0b3I6IFwiTDVNM1MxIEwtMTItMTItMCBNLTEyLTEyLTAgUy0xMi0xMi0wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaEJ1dHRvbk9uTWFpblJvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zYXZlT3B0aW9uc0Zvcm06IEdVY3JNYXNrYURldGFpbC5nZXRGb3JtKGdmIGFzIGFueSksIC8vVE9ETzogRGF0IHNwcmF2bnkgdHlwIGdyaWRmb3JtYXR1IVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuU2ltcGxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZVVzZXJTZXR0aW5nczogW0ZpbHRlclZpZXdNb2RlLkRldGFpbF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZmlsdGVyU3RvcmFnZVNlcnZpY2U6IG5ldyBHVWNyTWFza2FTZXJ2aWNlKHsgdHlwU2VzdGF2eTogdGhpcy5wYXJlbnRDbnQudHlwU2VzdGF2eSwgcGFyZW50Q29udGVudDogdGhhdC5wYXJlbnRDbnQsIGZyYWdtZW50czogXCIqXCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJDaG9zZUZpbHRlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vYXBwbHk6IChldiwgZGF0YSkgPT4geyB0aGlzLmxvYWREYXRhMihkYXRhLmZpbHRlcik7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0OiAoZXYsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47ICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeUJ1dHRvbkJlaGF2aW91cjogXCJBbHdheXNQcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyRmlsdGVyQnV0dG9uVmlzaWJsZTogXCJBbHdheXNWaXNpYmxlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvVnlobGVkYW5pWm9icmF6aXQ6IFwiT2JsaWJlbmVQb2RtaW5reVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb1Z5aGxlZGFuaVpvYnJheml0VXNlclNldHRpbmdzOiBcIkRlbnlcIiAvL05PVEU6IFpha2F6dWplIHByZXBpbmFuaSBwbyB2eWhsZWRhbmkgLSBwb2t1ZCBzZSBuZWtkbyBwb2tvdXNlbCB2eW1hemF0IGZpbHRyIHYgdG9tdG8gcmV6aW11LCB0YWsgbXVzZWwga2xpa25vdXQgbmEgdnlobGVkYXQsIHZpeiBUMzk4N1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbmkgZGV0YWlsdSAtIGJ1ZHUgem9icmF6b3ZhdCB6YXBpc3lcclxuICAgICAgICAgKiBAcGFyYW0gcm93XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIHNob3dEZXRhaWwocm93PzogVWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8pOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5zaG93WmFwaXN5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgc2hvd0RldGFpbChyb3c/OiBHU2V6bmFtWmFwaXN1U3RhdnVEdG8pOiB2b2lkIHtcclxuICAgICAgICAvLyAgICBpZiAoIXJvdykge1xyXG4gICAgICAgIC8vICAgICAgICB2YXIgc2VsID0gdGhpcy4kZ3JpZC5nZ3JpZDxHU2V6bmFtWmFwaXN1U3RhdnVEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgIC8vICAgICAgICBpZiAoc2VsLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAvLyAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyAgICAgICAgcm93ID0gc2VsWzBdO1xyXG4gICAgICAgIC8vICAgIH07XHJcbiAgICAgICAgLy8gICAgbGV0IHR5cFVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlID0gdGhpcy5wYXJlbnRDbnQuVHlwVWxvaHk7XHJcbiAgICAgICAgLy8gICAgaWYgKHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkZpbmFuY292YW5pWmFwaXMpIHtcclxuICAgICAgICAvLyAgICAgICAgaWYgKHJvdy5wcml6X3VyICE9IDApXHJcbiAgICAgICAgLy8gICAgICAgICAgICB0eXBVbG9oeSA9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRaYXBpcztcclxuICAgICAgICAvLyAgICAgICAgZWxzZVxyXG4gICAgICAgIC8vICAgICAgICAgICAgdHlwVWxvaHkgPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpcztcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgbGV0IG9wdGlvbnM6IElHRGV0YWlsU3RhdlphcGlzUmFka3VPcHRpb25zID0ge1xyXG4gICAgICAgIC8vICAgICAgICB0eXBVbG9oeTogdHlwVWxvaHksLy90aGlzLlR5cFVsb2h5LFxyXG4gICAgICAgIC8vICAgICAgICBncmlkRm9ybWF0OiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAvLyAgICAgICAgZmlsdGVyOiB0aGlzLmdldFphcGlzRmlsdGVyKCksXHJcbiAgICAgICAgLy8gICAgICAgIHJvdzogcm93LFxyXG4gICAgICAgIC8vICAgICAgICBnbG9iYWxzOiB0aGlzLnBhcmVudENudC5nbG9iYWxQYXJhbXMsXHJcbiAgICAgICAgLy8gICAgICAgIHZpZXdNb2RlOiBcImZ1bGxcIlxyXG4gICAgICAgIC8vICAgIH07XHJcblxyXG4gICAgICAgIC8vICAgIHRoaXMucGFyZW50Q250Lm5hdmlnYXRlKEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdEZXRhaWxTdGF2WmFwaXNSYWRrdSwgb3B0aW9ucyk7XHJcbiAgICAgICAgLy99XHJcblxyXG5cclxuICAgICAgICAvKioqXHJcbiAgICAgICAgICogWm9icmF6ZW5pIHZzZWNoIHphcGlzdSBwcm8gc2FsZG9rb250b1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJpdmF0ZSBzaG93WmFwaXN5QWxsKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCB0eXBVbG9oeSA9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250b1phcGlzeVZzZTtcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuOyAgICBcclxuXHJcbiAgICAgICAgICAgIGxldCBpZCA9IFwic2V6bmFtU2FsZG9rb250byNcIjsgLy9OT1RFOiBNdXNpIGJ5dCBzdGVqbmUgbmkgbmEgTWFpbkFwcC5jc1xyXG4gICAgICAgICAgICBsZXQgcm93cyA9IGdyaWQuZ2dyaWQ8VWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8+KFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cyhmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RmlsdGVyKClcclxuICAgICAgICAgICAgICAgIC50aGVuKChmKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgZmlsdGVyOiBHRWtvRmlsdGVyRHRvO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudENudC5uYXZpZ2F0ZSgnR29yZGljLlVjci5XZWJDbGllbnQuR1Nlem5hbUVrb1phem5hbXVCYXNlQ29udGVudCcsIHtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQucGFyZW50Q250Lm5hdmlnYXRlKCdHb3JkaWMuVWNyLldlYkNsaWVudC5HU2V6bmFtRWtvWmF6bmFtdScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUeXBVbG9oeTogdHlwVWxvaHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEZpbHRlcjoge30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJvd3M6IHJvd3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFN0cmljdEZpbHRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRmlsdGVyU3RyUG9waXM6IGYuZmlsdGVyU3RyUG9waXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF1dG9Mb2FkRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDI4M1wiIC8vUkMgMzAyNTAyODMgOiBaw6FwaXN5IHNhbGRva29udGFcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2hvd1phcGlzeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRpdGxlID0gXCJqcmVzOjMxMTAwMjI0XCI7IC8vUkMgMzExMDAyMjQgOiBaw6FwaXN5IHN0YXZ1XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5nZXRGaWx0ZXIoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjsgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWwgPSBncmlkLmdncmlkPFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPihcImdldFNlbGVjdGlvblwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggIT09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHNlbFswXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkOiBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcjogR0Vrb0ZpbHRlckR0bztcclxuICAgICAgICAgICAgICAgICAgICAvL05PVEU6IE9kcG92aWRhIHogVEsgVUNSOiBHU2V6bmFtWmFwaXN1VlJhZGt1VGFiLkxvYWRHcmlkRGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgPSBcImpyZXM6MzAyNTAyNzRcIiAvL1JDIDMwMjUwMjc0IDogWsOhcGlzeSBzYWxkb2tvbnRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWRkID0gXCJcIjsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LnBhcmVudENudC5nbG9iYWxzLlNhbGRva29udG9QYXJhbTEhLnRyaW0oKSAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkID0gdGhhdC5wYXJlbnRDbnQuZ2xvYmFscy5TYWxkb2tvbnRvUGFyYW0xIS50cmltKCkgKyBcIjogXCIgKyByb3chW1widmFsdWUwXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5wYXJlbnRDbnQuZ2xvYmFscy5TYWxkb2tvbnRvUGFyYW0yIS50cmltKCkgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFkZCAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZCArPSBcIiwgXCIgKyB0aGF0LnBhcmVudENudC5nbG9iYWxzPy5TYWxkb2tvbnRvUGFyYW0yIS50cmltKCkgKyBcIjogXCIgKyByb3chW1widmFsdWUxXCJdIS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkID0gdGhhdC5wYXJlbnRDbnQuZ2xvYmFscy5TYWxkb2tvbnRvUGFyYW0xIS50cmltKCkgKyBcIjogXCIgKyByb3chW1widmFsdWUwXCJdPy50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFkZCAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkID0gXCIgKFwiICsgYWRkICsgXCIpXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlICs9IGFkZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogeyBzdGFydDogcm93LmljbyEsIGVuZDogcm93LmljbyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjczogeyBzdGFydDogcm93LnVjcyEsIGVuZDogcm93LnVjcyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1czogeyBzdGFydDogcm93LnV1cyEsIGVuZDogcm93LnV1cyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5rczogeyBzdGFydDogcm93Lm5rcyEsIGVuZDogcm93Lm5rcyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc2ljOiB7IHN0YXJ0OiAwLCBlbmQ6IHJvdy5tZXNpYyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJkX21zazogcm93LmRyZCEudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNmdToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlYTogeyBzdGFydDogcm93LnVlYSEsIGVuZDogcm93LnVlYSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWI6IHsgc3RhcnQ6IHJvdy51ZWIhLCBlbmQ6IHJvdy51ZWIhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVjOiB7IHN0YXJ0OiByb3cudWVjISwgZW5kOiByb3cudWVjISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZDogeyBzdGFydDogcm93LnVlZCEsIGVuZDogcm93LnVlZCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWU6IHsgc3RhcnQ6IHJvdy51ZWUhLCBlbmQ6IHJvdy51ZWUhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVmOiB7IHN0YXJ0OiByb3cudWVmISwgZW5kOiByb3cudWVmISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZzogeyBzdGFydDogcm93LnVlZyEsIGVuZDogcm93LnVlZyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWg6IHsgc3RhcnQ6IHJvdy51ZWghLCBlbmQ6IHJvdy51ZWghIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVpOiB7IHN0YXJ0OiByb3cudWVpISwgZW5kOiByb3cudWVpISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlajogeyBzdGFydDogcm93LnVlaiEsIGVuZDogcm93LnVlaiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWs6IHsgc3RhcnQ6IHJvdy51ZWshLCBlbmQ6IHJvdy51ZWshIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVsOiB7IHN0YXJ0OiByb3cudWVsISwgZW5kOiByb3cudWVsISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlbTogeyBzdGFydDogcm93LnVlbSEsIGVuZDogcm93LnVlbSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZW46IHsgc3RhcnQ6IHJvdy51ZW4hLCBlbmQ6IHJvdy51ZW4hIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGUwOiB7IHN0YXJ0OiByb3cudGUwISwgZW5kOiByb3cudGUwISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlMTogeyBzdGFydDogcm93LnRlMSEsIGVuZDogcm93LnRlMSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTI6IHsgc3RhcnQ6IHJvdy50ZTIhLCBlbmQ6IHJvdy50ZTIhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGUzOiB7IHN0YXJ0OiByb3cudGUzISwgZW5kOiByb3cudGUzISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlNDogeyBzdGFydDogcm93LnRlNCEsIGVuZDogcm93LnRlNCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTU6IHsgc3RhcnQ6IHJvdy50ZTUhLCBlbmQ6IHJvdy50ZTUhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU2OiB7IHN0YXJ0OiByb3cudGU2ISwgZW5kOiByb3cudGU2ISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlNzogeyBzdGFydDogcm93LnRlNyEsIGVuZDogcm93LnRlNyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTg6IHsgc3RhcnQ6IHJvdy50ZTghLCBlbmQ6IHJvdy50ZTghIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU5OiB7IHN0YXJ0OiByb3cudGU5ISwgZW5kOiByb3cudGU5ISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMucGFyZW50Q250LlR5cFVsb2h5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpU3RhdjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cFVsb2h5ID0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZCA9IFwidWN0WmFwaXN5I1wiOyAvL05PVEU6IE11c2kgYnl0IHN0ZWpuZSBuaSBuYSBNYWluQXBwLmNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlJvenBvY2V0U3RhdjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cFVsb2h5ID0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5Sb3pwb2NldFphcGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBcInJvelphcGlzeSNcIjsgLy9OT1RFOiBNdXNpIGJ5dCBzdGVqbmUgbmkgbmEgTWFpbkFwcC5jc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwVWxvaHkgPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gXCJzZXpuYW1TYWxkb2tvbnRvI1wiOyAvL05PVEU6IE11c2kgYnl0IHN0ZWpuZSBuaSBuYSBNYWluQXBwLmNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBHRXJyb3IoXCJOb3RTdXBwb3J0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudENudC5uYXZpZ2F0ZSgnR29yZGljLlVjci5XZWJDbGllbnQuR1Nlem5hbUVrb1phem5hbXVCYXNlQ29udGVudCcsIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnBhcmVudENudC5uYXZpZ2F0ZSgnR29yZGljLlVjci5XZWJDbGllbnQuR1Nlem5hbUVrb1phem5hbXUnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVHlwVWxvaHk6IHR5cFVsb2h5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBGaWx0ZXI6IGZpbHRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3VycmVudFJvdzpyb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFN0cmljdEZpbHRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRmlsdGVyU3RyUG9waXM6IGYuZmlsdGVyU3RyUG9waXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF1dG9Mb2FkRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlUHJvZmlsZXMoZ2Y6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvLyogJiBHU2V6bmFtWmFwaXN1U3RhdnVEdG8qLz4pOiBJR1Nlem5hbVphcGlzdVByb2ZpbGVzIHtcclxuICAgICAgICAgICAgbGV0IHByb2ZpbGVzOiBJR1Nlem5hbVphcGlzdVByb2ZpbGVzID0ge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogeyBuYW1lOiBcImpyZXM6MzExMDAyMzJcIiwgY29sdW1uczoge30gfSAvL1JDIDMxMTAwMjMyIDogVsO9Y2hvesOtXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdmLmNvbHVtbnMuZmlsdGVyKChjKSA9PiB7IHJldHVybiAhYy5oaWRkZW47IH0pXHJcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoYykgPT4geyBwcm9maWxlcy5kZWZhdWx0LmNvbHVtbnMhW2MubmFtZSFdID0geyBoaWRkZW46IGZhbHNlIH0gfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHByb2ZpbGVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIG5hY3RlbmkgcG9tb2NpIHRlY2t5XHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZG9GaWx0ZXJDbGljaygpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5yZWxvYWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluaWNlIG1lbnUgYmFydVxyXG4gICAgICAgICAqIEBwYXJhbSB0eXBVbG9oeVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBEZWZpbmVNZW51QmFyKHR5cFVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlKTogTWVudVBhcmFtc1tdIHtcclxuICAgICAgICAgICAgbGV0IG1lbnUgPSBzdXBlci5EZWZpbmVNZW51QmFyKHR5cFVsb2h5KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnphcGlzeUFsbEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XHJcbiAgICAgICAgfSAgIFxyXG4gICAgICAgIC8vLyoqIFByaXByYXZhIHBybyBnZW5lcm92YW5pIHNlc3RhdnkgKi9cclxuICAgICAgICAvL3ByaXZhdGUgcmVwb3J0U3RhcnRpbmcocmk6IElHUHJpbnRBY3Rpb25SZXBvcnRTdGFydGluZzxHU2V6bmFtRWtvWmF6bmFtdUdlbmVyYXRvckR0bz4pOiBKUXVlcnlQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyAgICByZXR1cm4gdGhpcy5nZXRGaWx0ZXIodGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q29uZmlybWVkRGF0YVwiKSlcclxuICAgICAgICAvLyAgICAgICAgLnRoZW4oKGYpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgIHJpLmN1c3RvbUR0byA9IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0eXBVbG9oeTogdGhpcy5wYXJlbnRDbnQuVHlwVWxvaHksXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZmlsdGVyOiBmLmZpbHRlcixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBlbGVtZW50eTogZi5lbGVtZW50eSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBmaWx0ZXJTdHJQb3BpczogZi5maWx0ZXJTdHJQb3Bpc1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfTtcclxuICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgLy99XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVemF2aXJhbmkgb2tuYVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5wYXJlbnRDbnQuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250bykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZU5TID0gZmFsc2U7IGxldCB1c2VPUkcgPSBmYWxzZTsgbGV0IHVzZU9SSiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlciA9IHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldEN1cnJlbnREYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAoZmlsdGVyIGFzIGFueSkudm9sYnkhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChmaWx0ZXIgYXMgYW55KS52b2xieVtpXSA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VOUyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChmaWx0ZXIgYXMgYW55KS52b2xieVtpXSA9PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VPUkogPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoZmlsdGVyIGFzIGFueSkudm9sYnlbaV0gPT0gMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlT1JHID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC51c2VyU2V0dGluZ3MhLnNldChcInVzZWROU1wiLCB1c2VOUyk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC51c2VyU2V0dGluZ3MhLnNldChcInVzZU9SR1wiLCB1c2VPUkcpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQudXNlclNldHRpbmdzIS5zZXQoXCJ1c2VkT1JKXCIsdXNlT1JKKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxufSJdfQ==