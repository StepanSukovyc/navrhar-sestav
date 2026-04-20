"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            let GSeznamEkoZaznamu = class GSeznamEkoZaznamu extends Gordic.GContentBase {
                constructor() {
                    super(...arguments);
                    // atributy zobrazeni sloupcu (pouze pro saldokonto)
                    this.useNS = true;
                    this.useORJ = true;
                    this.useORG = true;
                    //$grid: JQuery;
                    /**
                     * trida gridu
                     */
                    this.classGrid = "js-grid-base";
                    //private elementPropertyNameMap: ObjectLiteral<string>;
                    this.filterHistory = [];
                    this.currFilterHistoryIndex = -1;
                    this.addFilterToHistory = true;
                    this.logOptions = { name: "GSeznamEkoZaznamu", authorCode: 311, file: "GSeznamEkoZaznamuTS.ts" };
                }
                onContentReady() {
                    this.globals = Gordic.Ucr.Globals.GUcrGlobals;
                    this.zkratky = Gordic.Ucr.Globals.GZkr;
                    this.texty = Gordic.Ucr.Globals.GTxt;
                    var that = this;
                    // nacteni ulozenych uziv. hodnot
                    if (this.TypUlohy === 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */) {
                        this.useNS = that.userSettings.get("usedNS", false);
                        this.useORJ = that.userSettings.get("usedORJ", false);
                        this.useORG = that.userSettings.get("useORG", false);
                    }
                    this.createActions();
                    this.menuBar(this.createMenubarDef(this.TypUlohy));
                    if (typeof this.detailInf !== "undefined" && this.detailInf.trim() != "")
                        this.statusBar([{ type: "static", caption: this.detailInf }]);
                    this.createFilterPanel();
                    if ((this.TypUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */ || this.TypUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                        || this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */) && (this.userSettings?.get("rozsirenyPopisAutoAddGridColumns") ?? false))
                        this.addStrPopisColumns = this.userSettings?.get("rozsirenyPopisShowGridColumns");
                    let gridFormat = this.createGridFormat();
                    this.profiles = this.createProfiles(gridFormat);
                    let profilesArr = [this.profiles.default];
                    if (this.profiles.doklady)
                        profilesArr.push(this.profiles.doklady);
                    //debugger;
                    let sumCols = gridFormat.columns.filter(c => (c.columnType == "currency" || c.columnType == "number") && ("status,drd,mesic,den,rok,rok_uej,mesic_uej".indexOf(c.name)) == -1).map(e => e.name);
                    const grid = $.newDiv(this.classGrid)
                        .appendTo(this.element)
                        .css("height", "100%")
                        .gautofit()
                        .ggrid({
                        //rowHeight: 32,
                        columnMode: "full", // fit (defaultne by melo byt toto), full
                        data: [],
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
                                if (that.TypUlohy == 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */ ||
                                    that.TypUlohy == 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */)
                                    that.primdokladAct.run();
                                else if (that.TypUlohy == 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */) {
                                    that.showZapisy();
                                }
                                else
                                    that.showDetail(ctx.cellInfo.data);
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
                        summaryRowColumns: sumCols
                        // dlouhý seznam
                        //longListAllowed: true,
                        //longListModel: "Global.Ucr.AppSettings",
                        //longListCountMethod: (rq) => that.isl.ZapoctovyList.listCount(rq).get()
                    })
                        .ggridserverfilter({
                        //invalidValueChanged: function (ev) { that.loadData(); },
                        //defaultData: { nks: { start: "000004", end: "000004" } }
                        defaultData: this.Filter
                    })
                        .on("gcfufilterinvalidvalueset", function (ev) { that.loadData(); });
                    //#region Kl. zkratky
                    this.element.gshortcut({
                        key: "INSERT",
                        description: "jres:31100226", //RC 31100226 : Načtení dat
                        group: Gordic.Shortcuts.Groups.Task,
                        canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        action: this.insAct
                    });
                    this.element.gshortcut({
                        key: "DELETE",
                        description: "jres:31100181", //RC 31100181 : Vyčistit
                        canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        group: Gordic.Shortcuts.Groups.Task,
                        action: this.clearFilterRowAct
                    });
                    this.element.gshortcut({
                        key: "1",
                        description: "jres:31100218", //RC 31100218 : Předchozí filtr
                        canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        group: Gordic.Shortcuts.Groups.Task,
                        action: this.prevFilterAct
                    });
                    this.element.gshortcut({
                        key: "0",
                        description: "jres:31100228", //RC 31100228 : Vyčistit a načíst
                        canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        group: Gordic.Shortcuts.Groups.Task,
                        action: this.clearAndFilterAct
                    });
                    grid.gshortcut({
                        key: "ctrl+shift+lclick",
                        group: Gordic.Shortcuts.Groups.Grid,
                        description: "jres:31100229", //RC 31100229 : Přenesení hodnoty do filtru.
                        action: this.selFilterAct
                    });
                    grid.gshortcut({
                        key: "ctrl+lclick",
                        group: Gordic.Shortcuts.Groups.Grid,
                        description: "jres:31100235", //RC 31100235 : Přenesení hodnoty do filtru a vyhledání.
                        action: this.selFilterAndSearchAct
                    });
                    grid.gshortcut({
                        key: [".", ","],
                        //NOTE: Description opsano z napovedy k TK UCR
                        description: "jres:31100227", //RC 31100227 : Zobrazení všech zápisů dokladů (celý doklad) nad označeným zápisem.
                        canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        group: Gordic.Shortcuts.Groups.Grid,
                        action: this.dotAct
                    });
                    if (this.TypUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                        || this.TypUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                        || this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */
                        || this.TypUlohy === 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */
                        || this.TypUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */) {
                        //grid.gshortcut();
                        grid.gshortcut({
                            key: "ctrl+.",
                            group: Gordic.Shortcuts.Groups.Grid,
                            canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                            description: "jres:31100279", //RC 31100279 : Filtrovat za pid dle označeného řádku.
                            action: this.filterPidAct
                        });
                        grid.gshortcut({
                            key: "-",
                            group: Gordic.Shortcuts.Groups.Grid,
                            canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                            description: "jres:31100231", //RC 31100231 : Doklady
                            action: this.shDokladyAct
                        });
                        grid.gshortcut({
                            key: "+",
                            group: Gordic.Shortcuts.Groups.Grid,
                            canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                            description: "jres:31100124", //RC 31100124 : Zápisy
                            action: this.shZapisyAct
                        });
                    }
                    //#endregion
                    //#region Preview v sidebaru
                    if (this.TypUlohy !== 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */ && this.TypUlohy !== 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */) {
                        let typUlohy = this.TypUlohy;
                        //if (this.TypUlohy == Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy)
                        //    typUlohy = Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis;
                        this.element.gsidebar("option", "right", { userSettings: this.userSettings, width: 500, visible: false, /* pinned: false, leafsAutoHide: false*/ });
                        this.previewController = new Gordic.Previews.GPreviewController(this.element, {
                            useSubtask: false,
                            panelOptions: {
                                caption: "jres:31100217", //RC 31100217 : Náhled detailu
                                side: "right"
                            },
                            tabs: [{
                                    caption: "jres:31100217", //RC 31100217 : Náhled detailu
                                    customLoad: (tab, dto) => {
                                        let elm = $("<div>").gcontent(Gordic.Ucr.WebClient.GDetailStavZapisRadku, { parentContent: this }); //Nutne pro spravne spojeni s kontextem hlavniho contentu
                                        let tabSettings = dto.tabSettings;
                                        delete dto.tabSettings;
                                        $(tab).empty().append(elm);
                                        $.content(elm).init({
                                            typUlohy: typUlohy,
                                            gridFormat: this.createGridFormat(),
                                            filter: this.getZapisFilter(),
                                            row: dto,
                                            viewMode: "preview",
                                            tabSettings: tabSettings,
                                            cfuSetSorted: that.cfuSetSorted
                                        });
                                    }
                                }]
                        });
                    }
                    //this.previewController.registerPanel({
                    //    id: "previewDetail",
                    //    caption: "jres:31100217", //RC 31100217 : Náhled detailu
                    //    side: "right"
                    //});
                    //#endregion
                    if (this.TypUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */) {
                        grid.ggridserverfilter("apply", {
                            ucs: { start: this.Globals.EkoParams?.UCS, end: this.Globals.EkoParams?.UCS },
                        });
                    }
                    if (this.AutoLoadData)
                        this.loadData();
                }
                /**
                 * Vraci objekt gridu
                 * @returns
                */
                getGrid() {
                    var data = this.element.find("." + this.classGrid);
                    return (data.length == 0 ? null : data);
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
                    if (this.TypUlohy == 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */ || this.TypUlohy == 13 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapisyVse */) {
                        gf.addNumberColumn({
                            name: "status",
                            caption: "jres:30250278", //RC 30250278 : Status
                            cellTemplate: function (row, meta, cellInfo) {
                                if (meta?._isSummary)
                                    return "";
                                if (row.status === null || row.status == 0)
                                    return "OK";
                                else
                                    return "N";
                            },
                            width: 80,
                            serverFilter: Gordic.Eko.Filters.status({ model: "status", caption: "jres:30250292" }) //RC 30250292 : Status
                            //serverFilter: Gordic.Eko.Filters.integerInterval({ name: "status", model: "status" })
                        });
                        if (this.globals.SaldokontoParam1.trim() != "")
                            gf.addTextColumn({
                                name: "value0",
                                caption: this.globals.SaldokontoParam1.trim(),
                                width: 120,
                                //serverFilter: Gordic.Eko.Filters.stringInterval({ name: "value0", model: "value0", caption: this.globals.SaldokontoParam1.trim() })
                            });
                        if (this.globals.SaldokontoParam2.trim() != "")
                            gf.addTextColumn({
                                name: "value1",
                                caption: this.globals.SaldokontoParam2.trim(),
                                width: 120,
                                //serverFilter: Gordic.Eko.Filters.stringInterval({ name: "value1", model: "value1", caption: this.globals.SaldokontoParam2.trim() })
                            });
                        gf.addTextColumn({
                            name: "nks",
                            caption: this.zkratky.Nks,
                            description: this.texty.Nks,
                            width: 60,
                            //group: topoGroup,
                            serverFilter: Gordic.Eko.Filters.nksInterval(this.filterOptions.nks)
                        });
                    }
                    if (this.TypUlohy == 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */ || this.TypUlohy == 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */ || (this.TypUlohy !== 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */ && this.TypUlohy !== 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */
                        && this.TypUlohy !== 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */ && this.TypUlohy !== 13 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapisyVse */)) {
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
                    // pro balancovani neni zadny filter
                    if (this.TypUlohy == 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */)
                        drdServerFilter = undefined;
                    if (this.TypUlohy !== 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */)
                        gf.addNumberColumn({
                            name: "drd",
                            caption: "jres:31100052 ", //RC 31100052 : H
                            description: "jres:31100102", //RC 31100102 : Druh dokladu (DRD)
                            //tooltipTemplate: "jres:31100102", //RC 31100102 : Druh dokladu (DRD)
                            width: 30,
                            serverFilter: drdServerFilter //Gordic.Eko.Filters.drd(this.filterOptions.drd)
                        });
                    if (this.TypUlohy == 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */ || this.TypUlohy == 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */ || this.TypUlohy === 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */) {
                        gf.addNumberColumn({
                            name: "rok",
                            caption: "jres:30250100 ", //RC 30250100 : Rok
                            //description: "jres:31100011", //RC 31100011 : Měsíc
                            width: 40,
                            //aggregate: Gordic.Data.Aggregates.first("mesic"),
                            serverFilter: Gordic.Eko.Filters.stringInterval({ model: "rok", caption: "jres:30250100", disabled: !!(this.Filter && this.StrictFilter && this.Filter.rok) }) //RC 30250100 : Rok
                        });
                    }
                    if (this.TypUlohy !== 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */)
                        gf.addNumberColumn({
                            name: "mesic",
                            caption: "jres:31100051 ", //RC 31100051 : M
                            description: "jres:31100011", //RC 31100011 : Měsíc
                            width: 30,
                            aggregate: Gordic.Data.Aggregates.first("mesic"),
                            serverFilter: Gordic.Eko.Filters.integerInterval({
                                model: "mesic", caption: "jres:31100051", //RC 31100051 : M
                                disabled: !!(this.Filter && this.StrictFilter && this.Filter.mesic),
                                firstField: { minValue: 1, maxValue: 13, allowedChars: "0123456789" },
                                secondField: { minValue: 1, maxValue: 13, allowedChars: "0123456789" },
                            })
                        });
                    if (this.Zapisova) {
                        gf.addNumberColumn({
                            name: "den",
                            caption: "jres:31100053 ", //RC 31100053 : D
                            description: "jres:31100130", //RC 31100130 : Den
                            width: 30,
                            serverFilter: Gordic.Eko.Filters.integerInterval({
                                model: "den", caption: "jres:31100053", //RC 31100053 : D
                                disabled: !!(this.Filter && this.StrictFilter && this.Filter.den),
                                firstField: { minValue: 1, maxValue: 31, allowedChars: "0123456789" },
                                secondField: { minValue: 1, maxValue: 31, allowedChars: "0123456789" },
                            })
                        });
                        gf.addTextColumn({
                            name: "lic",
                            caption: "LIC",
                            width: 60,
                            hidden: true,
                            aggregate: Gordic.Data.Aggregates.first("lic"),
                            ////serverFilter: //TODO
                        });
                        //NOTE: Zatim neni potrebne
                        //var max = 0
                        //switch (this.TypUlohy) {
                        //    case "UcetnictviZapis": max = this.globals.DelkaAcUct; break;
                        //    case "RozpocetZapis": max = this.globals.DelkaAcRoz; break;
                        //    default: max = this.globals.DelkaAcMax; break;
                        //}
                        if (this.TypUlohy !== 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */ && this.TypUlohy !== 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */)
                            gf.addTextColumn({
                                name: "ac",
                                caption: "jres:31100054", //RC 31100054 : Doklad
                                width: 70,
                                aggregate: Gordic.Data.Aggregates.first("ac"),
                                serverFilter: Gordic.Eko.Filters.acInterval(this.filterOptions.ac)
                            });
                        gf.addTextColumn({
                            name: "pdok",
                            caption: "jres:31100055", //RC 31100055 : Strukturovaný popis dokladu
                            hidden: true, //NOTE: V TK maji skryto, byva videt pole 'popis', kde je stejny prefab
                            width: 200,
                            serverFilter: Gordic.Eko.Filters.stringSingle({ model: "pdok", caption: "jres:31100055" }) //RC 31100055 : Strukturovaný popis dokladu
                        });
                    }
                    let cfuIntervalOptions = {
                        isRoz: this.Rozpocet,
                        isUct: this.Ucetnictvi,
                        checkUete: this.ekoParams.CheckUete,
                        wildcard: this.Globals.Others?.Wildcard,
                        getIntervalOptions: (dto, opts) => {
                            if (!this.Filter || !this.StrictFilter)
                                return opts;
                            opts.disabled = !!!this.Filter[dto.name];
                            return opts;
                        }
                    };
                    if (this.TypUlohy == 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */) {
                        // Modifikovane Su a Au
                        for (let i = 0; i < this.modifyCfu.columns.length; i++) {
                            const c = this.modifyCfu.columns[i];
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
                    }
                    else
                        gf.addSortedEkoCfuSet(Gordic.Eko.CfuUtils.getCfuSetServerFilters(this, cfuIntervalOptions));
                    if (this.TypUlohy == 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */) {
                        if (this.globals.SaldokontoParam1.trim() != "")
                            gf.addTextColumn({
                                name: "value0",
                                caption: this.globals.SaldokontoParam1.trim(),
                                width: 120,
                                serverFilter: Gordic.Eko.Filters.stringInterval({ name: "value0", model: "value0", caption: this.globals.SaldokontoParam1.trim() })
                            });
                        if (this.globals.SaldokontoParam2.trim() != "")
                            gf.addTextColumn({
                                name: "value1",
                                caption: this.globals.SaldokontoParam2.trim(),
                                width: 120,
                                serverFilter: Gordic.Eko.Filters.stringInterval({ name: "value1", model: "value1", caption: this.globals.SaldokontoParam2.trim() })
                            });
                    }
                    if (this.Zapisova) {
                        if (this.TypUlohy == 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */) {
                            gf.addCurrencyColumn({
                                name: "c0",
                                caption: "jres:30250145", //RC 30250145 : MD pův.
                                description: "jres:30250145", //RC 31100243 : Má Dáti
                                width: 120,
                                serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0", caption: "jres:30250145" }) //RC 30250145 : MD pův.
                            });
                            gf.addCurrencyColumn({
                                name: "c0_new",
                                caption: "jres:30250146", //RC 30250146 : MD nové
                                description: "jres:30250146", //RC 31100243 : Má Dáti
                                width: 120,
                                serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0_new", caption: "jres:30250146" }) //RC 30250146 : MD nové
                            });
                            gf.addCurrencyColumn({
                                name: "c0c0_proc",
                                caption: "jres:30250147", //RC 30250147 :  %
                                description: "jres:30250147", //RC 31100243 : Má Dáti
                                width: 50,
                                //serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0", caption: "jres:30250146" }) //RC 30250146 : MD nové
                            });
                            gf.addCurrencyColumn({
                                name: "c1",
                                caption: "jres:30250148", //RC 30250149 : Dal nové
                                description: "jres:30250148", //RC 31100243 : Má Dáti
                                width: 120,
                                serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c1", caption: "jres:30250148" }) //RC 30250146 : MD nové
                            });
                            gf.addCurrencyColumn({
                                name: "c1_new",
                                caption: "jres:30250149", //RC 30250149 : Dal nové
                                description: "jres:30250149", //RC 30250149 : Dal nové
                                width: 120,
                                serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c1_new", caption: "jres:30250149" }) //RC 30250149 : Dal nové
                            });
                            gf.addCurrencyColumn({
                                name: "c1c1_proc",
                                caption: "jres:30250147", //RC 30250147 :  %
                                description: "jres:30250147", //RC 31100243 : Má Dáti
                                width: 50,
                                //serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0", caption: "jres:30250146" }) //RC 30250146 : MD nové
                            });
                            gf.addCurrencyColumn({
                                name: "c0c1",
                                caption: "jres:30250150", //RC 30250150 : MD pův. - Dal pův.
                                description: "jres:30250150", //RC 30250150 : MD pův. - Dal pův.
                                width: 120,
                                hidden: this.globals.Rad_ZobrazMdDal,
                                serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0c1", caption: "jres:30250150" }) //RC 30250150 : MD pův. - Dal pův.
                            });
                            gf.addCurrencyColumn({
                                name: "c0c1_new",
                                caption: "jres:30250151", //RC 30250151 :  MD nové - Dal nové
                                description: "jres:30250151", //RC 30250151 :  MD nové - Dal nové
                                width: 120,
                                hidden: this.globals.Rad_ZobrazMdDal,
                                serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0c1_new", caption: "jres:30250151" }) //RC 30250151 :  MD nové - Dal nové
                            });
                        }
                        else {
                            gf.addCurrencyColumn({
                                name: "c0",
                                caption: "jres:31100056", //RC 31100056 : MD
                                description: "jres:31100243", //RC 31100243 : Má Dáti
                                width: 120,
                                serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0", caption: "jres:31100056" }) //RC 31100056 : MD
                            });
                            gf.addCurrencyColumn({
                                name: "c1",
                                caption: "jres:31100057", //RC 31100057 : Dal
                                width: 120,
                                serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c1", caption: "jres:31100057" }) //RC 31100057 : Dal
                            });
                            gf.addCurrencyColumn({
                                name: "c0c1",
                                caption: "jres:31100090", //RC 31100090 : MD-Dal
                                description: "jres:31100244", //RC 31100244 : Má Dáti - Dal
                                width: 120,
                                hidden: !this.globals.Rad_ZobrazMdDal,
                                serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0c1", caption: "jres:31100090" }) //RC 31100090 : MD-Dal
                            });
                            if (this.TypUlohy === 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */ || this.TypUlohy == 13 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapisyVse */) {
                                gf.addCurrencyColumn({
                                    name: "c0c1_as",
                                    caption: "jres:30250279", //RC 30250279 : Nevyrovnáno
                                    //description: "jres:31100244", //RC 31100244 : Má Dáti - Dal
                                    width: 120,
                                    hidden: !this.globals.Rad_ZobrazMdDal,
                                    //serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0c1_as", caption: "jres:30250280" }) //RC 30250280 : Nevyrovnáno
                                });
                            }
                        }
                    }
                    else {
                        if (this.TypUlohy === 2 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviStav */) {
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
                                caption: "jres:31100070", //RC 31100070 : AS MD - Dal
                                width: 120,
                                hidden: !this.globals.Rad_ZobrazMdDal,
                                serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0c1_as", caption: "jres:31100070" }) //RC 31100070 : AS MD - Dal
                            });
                        }
                        else if (this.TypUlohy === 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */) {
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
                                    name: this.wodrOrj.name,
                                    caption: this.wodrOrj.caption,
                                    description: this.wodrOrj.description,
                                    width: this.wodrOrj.width,
                                    serverFilter: Gordic.Eko.Filters.cfuInterval({
                                        cfu: this.wodrOrj,
                                        isRoz: false,
                                        isUct: true,
                                        model: `${this.wodrOrj.name}`
                                        //model: `${c.name}_reg`
                                    })
                                });
                            // Modifikovane org
                            if (this.useORG)
                                gf.addTextColumn({
                                    name: this.wodrOrg.name,
                                    caption: this.wodrOrg.caption,
                                    description: this.wodrOrg.description,
                                    width: this.wodrOrg.width,
                                    serverFilter: Gordic.Eko.Filters.cfuInterval({
                                        cfu: this.wodrOrg,
                                        isRoz: false,
                                        isUct: true,
                                        model: `${this.wodrOrg.name}`
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
                                hidden: !this.globals.Rad_ZobrazMdDal,
                                serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0c1", caption: "jres:30250272" }) //RC 30250272 : MD - Dal
                            });
                        }
                        else { //RozpocetStav
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
                        }
                    }
                    if (this.Zapisova)
                        gf.addTextColumn({
                            name: "popis",
                            caption: "jres:31100071", //RC 31100071 : Popis řádku
                            width: 200,
                            serverFilter: Gordic.Eko.Filters.stringSingle({ model: "popis", caption: "jres:31100071" }) //RC 31100071 : Popis řádku
                        });
                    if (this.TypUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                        || this.TypUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                        || this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */
                        || this.TypUlohy === 4 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.FinancovaniZapis */
                        || this.TypUlohy === 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */) {
                        gf.addNumberColumn({
                            name: "rok_uej",
                            caption: "jres:31100072", //RC 31100072 : Rok DPH
                            description: "jres:31100258", //RC 31100258 : Rok uskutečnění zdanitelného plnění                    
                            width: 80,
                            serverFilter: Gordic.Eko.Filters.integerInterval({
                                model: "rok_uej", caption: "jres:31100072", disabled: this.TypUlohy === 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */ || !!(this.Radek_DPH)
                            }) //RC 31100072 : Rok DPH
                        });
                        gf.addNumberColumn({
                            name: "mesic_uej",
                            caption: "jres:31100073", //RC 31100073 : Měsíc DPH
                            description: "jres:31100257", //RC 31100257 : Měsíc uskutečnění zdanitelného plnění
                            width: 80,
                            serverFilter: Gordic.Eko.Filters.integerInterval({
                                model: "mesic_uej ", caption: "jres:31100073",
                                disabled: this.TypUlohy === 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */ || !!(this.Radek_DPH)
                            }) //RC 31100073 : Měsíc DPH
                        });
                        gf.addNumberColumn({
                            name: "zd",
                            caption: "jres:31100074", //RC 31100074 : ZD
                            description: "jres:31100250", //RC 31100250 : Příznak DPH, zda je zápis nedaňový, základ daně, daň apod.
                            width: 45,
                            cellTemplate: function (row, meta, cellInfo) {
                                return Gordic.Eko.Filters.ZdUtils.zdGetLabel(row.zd);
                            },
                            serverFilter: Gordic.Eko.Filters.zdInterval({
                                model: "zd",
                                caption: "jres:31100074", //RC 31100074 : ZD
                                isProEkoFilter: true,
                                disabled: !!(this.Radek_DPH)
                            })
                        });
                    }
                    if (this.Zapisova) {
                        gf.addTextColumn({
                            name: "ixp",
                            caption: "jres:31100075", //RC 31100075 : PID
                            description: "jres:31100251", //RC 31100251 : Prvotní identifikátor primárního dokladu
                            width: 110,
                            serverFilter: Gordic.Eko.Filters.ixp({ model: "ixp", caption: "jres:31100075" }) //RC 31100075 : PID
                        });
                        //if (this.TypUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis) {
                        //    gf.addTextColumn({
                        //        name: "ac_ag",
                        //        caption: "jres:31100077", //RC 31100077 : Agendové číslo
                        //        width: 100,
                        //        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "ac_ag", caption: "jres:31100077" }) //RC 31100077 : Agendové číslo
                        //    });
                        //}
                        if (!this.globals.ExterniSumarizace) {
                            if (this.TypUlohy == 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */ || this.TypUlohy == 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */) {
                                gf.addTextColumn({
                                    name: "ixp_roz",
                                    caption: "jres:30250152", //RC 30250152 : PID RO
                                    description: "jres:30250152", //RC 30250152 : PID RO
                                    width: 110,
                                    serverFilter: Gordic.Eko.Filters.ixp({ model: "ixp_roz", caption: "jres:30250152" }) //RC 30250152 : PID RO
                                });
                                gf.addTextColumn({
                                    name: "ixp_prim",
                                    caption: "jres:30250153", //RC 30250153 : PID BLK
                                    description: "jres:30250153", //RC 30250153 : PID BLK
                                    width: 110,
                                    serverFilter: Gordic.Eko.Filters.ixp({ model: "ixp_prim", caption: "jres:30250153" }) //RC 30250153 : PID BLK
                                });
                            }
                        }
                        else {
                            gf.addTextColumn({
                                name: "ixp_prim",
                                caption: "jres:31100076", //RC 31100076 : PID primární
                                width: 110,
                                hidden: true, //NOTE: V TK je skryte
                                serverFilter: Gordic.Eko.Filters.stringSingle({ model: "ixp_prim", caption: "jres:31100076" }) //RC 31100076 : PID primární
                            });
                        }
                        if (this.globals.TypPraceWfl === 1) {
                            gf.addTextColumn({
                                name: "ac_ag",
                                caption: "jres:31100077", //RC 31100077 : Agendové číslo
                                width: 100,
                                serverFilter: Gordic.Eko.Filters.stringInterval({ model: "ac_ag", caption: "jres:31100077" }) //RC 31100077 : Agendové číslo
                            });
                            if (this.TypUlohy != 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */ && this.TypUlohy != 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */) {
                                if (this.Zapisova)
                                    gf.addTextColumn({
                                        name: "ixs_typ",
                                        caption: "jres:30250281", //RC 30250281 : Typ dokladu
                                        width: 120,
                                        cellTemplate: "{ixs_typ_txt:trim:encode}",
                                        grouping: {
                                            aggregate: Gordic.Data.Aggregates.first("ixs_typ_txt"),
                                        },
                                        //serverFilter: Gordic.Ucr.WebClient.FilterPrefabs.typ_ag({ model: "typ_ag", zkr_agPath: "typ_ag_txt", isRozpocet: this.Rozpocet, caption: "jres:31100079" }) //RC 31100079 : Agenda
                                        serverFilter: Gordic.Eko.Filters.sslTypInterval({ model: "ixs_typ=ixs_typ;ixs_typ_txt=nazev", caption: "jres:30250281" }) //RC 30250281 : Typ dokladu
                                        //serverFilter: Gordic.Eko.Filters.sslTypInterval({ model: "ixs_typ", zkr_agPath: "ixs_typ_txt",caption: "jres:30250281" }) //RC 30250281 : Typ dokladu
                                    });
                                //gf.AddLookupColumn("ixs_typ", "Sslstyp.nazev", GResources.GetResourceText(21050112), 150); //RC 21050112 : Typ dokumentu
                            }
                        }
                    }
                    if (this.TypUlohy == 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                        || this.TypUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                        || this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */
                        || this.TypUlohy == 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */
                        || this.TypUlohy == 4 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.FinancovaniZapis */
                        || this.TypUlohy == 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */)
                        gf.addTextColumn({
                            name: "nazev_rf",
                            caption: "jres:31100097", //RC 31100097 : Změnu provedl
                            width: 200,
                            serverFilter: Gordic.Eko.Filters.stringSingle({ model: "nazev_rf", caption: "jres:31100097" }) //RC 31100097 : Změnu provedl
                        });
                    if (this.TypUlohy !== 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */)
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
                    if (this.Zapisova)
                        gf.addTextColumn({
                            name: "typ_ag",
                            caption: "jres:31100079", //RC 31100079 : Agenda
                            width: 120,
                            cellTemplate: "{typ_ag_txt:trim:encode}",
                            printable: "#render",
                            grouping: {
                                aggregate: Gordic.Data.Aggregates.first("typ_ag_txt"),
                            },
                            serverFilter: Gordic.Ucr.WebClient.FilterPrefabs.typ_ag({ model: "typ_ag", zkr_agPath: "typ_ag_txt", isRozpocet: this.Rozpocet, caption: "jres:31100079" }) //RC 31100079 : Agenda
                        });
                    if (this.TypUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                        || this.TypUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                        || this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */
                        || this.TypUlohy == 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */
                        || this.TypUlohy == 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */
                        || this.TypUlohy == 13 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapisyVse */
                        || this.TypUlohy === 4 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.FinancovaniZapis */) {
                        if (this.globals.TypPraceESU === 2 /* Gordic.Uct.Interface.GUcrTypPraceESU.Ne */) { }
                        else if (this.globals.RezimProvozu === 40 /* Gordic.Uct.Interface.GUcrRezimProvozu.SOR */ && this.globals.TypSumarizace === 1 /* Gordic.Uct.Interface.GUcrTypSumarizace.Externi */) { }
                        else {
                            gf.addTextColumn({
                                name: "esu_txt",
                                caption: "jres:31100080", //RC 31100080 : ESU
                                description: "jres:31100252", //RC 31100252 : Externí subjekt
                                width: 180,
                                serverFilter: this.TypUlohy == 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */ ? undefined : Gordic.Ucr.WebClient.FilterPrefabs.esu_txt({ model: "esu_txt", ixs_esuPath: "_esu_txt_ixs", caption: "jres:31100080" }) //RC 31100080 : ESU
                            });
                            gf.addTextColumn({
                                name: "esu_ico",
                                caption: "jres:31100080" + " " + this.zkratky.Ico, //RC 31100080 : ESU
                                description: "jres:31100253", //RC 31100253 : IČO Externího subjektu primárního dokladu
                                width: 80,
                                serverFilter: this.TypUlohy == 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */ ? undefined : Gordic.Ucr.WebClient.FilterPrefabs.esu_ico({ model: "esu_ico", ixs_esuPath: "_esu_ico_ixs", caption: "jres:31100080" + " " + this.zkratky.Ico }) //RC 31100080 : ESU
                            });
                            gf.addTextColumn({
                                name: "esu_rc",
                                caption: "jres:31100081", //RC 31100081 : ESU RČ
                                description: "jres:31100254", //RC 31100254 : Rodné číslo Externího subjektu primárního dokladu
                                width: 80,
                                serverFilter: this.TypUlohy == 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */ ? undefined : Gordic.Ucr.WebClient.FilterPrefabs.esu_rc({
                                    model: "esu_rc", ixs_esuPath: "_esu_txt_rc", caption: "jres:31100081", //RC 31100081 : ESU RČ
                                    Rad_Esu_RcVyhl: this.globals.Rad_Esu_RcVyhl
                                })
                            });
                        }
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
                    }
                    if (this.addStrPopisColumns) {
                        let _this = this;
                        for (let i = 0; i < this.addStrPopisColumns.length; i++) {
                            let c = this.addStrPopisColumns[i];
                            let caption = this.filterStrPopis?.find((s) => { return s.klic === c; })?.klic_txt ?? c;
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                .addSection(caption)
                                .addField("gstringbox", { name: c });
                            gf.addTextColumn({
                                name: c,
                                caption: caption,
                                cellTemplate: `{struktPopis.${c}.hodnota}`,
                                serverFilter: {
                                    widget: "gformbox",
                                    options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults({}), {
                                        form: form,
                                        itemTemplate: (s) => { return s && s[c] ? s[c] : Gordic.Eko.Filters.Utils.filterEmptyValue; },
                                        change: (ev, v) => {
                                            let val = v?.value[c] ?? "";
                                            let fpdata = this.$filterPanel.gfilterpanel("getCurrentData");
                                            let filterStrPopis = fpdata?.filterStrPopis;
                                            let p = filterStrPopis?.find((s) => { return s.klic === c; });
                                            if (p) {
                                                p.hodnota = val;
                                                this.$filterPanel.gfilterpanel("applyFilter", fpdata, true);
                                            }
                                        },
                                        model: function (op, dto, modelOptions) {
                                            const d = dto;
                                            const dp = d?.filterStrPopis?.filter((s) => { return s.klic === c; }) ?? [];
                                            let fpdata = _this.$filterPanel.gfilterpanel("getCurrentData");
                                            let filterStrPopis = fpdata?.filterStrPopis;
                                            let p = filterStrPopis?.find((s) => { return s.klic === c; });
                                            if (!p)
                                                return;
                                            //NOTE: Musim srovnat hodnotu dle toho, co mi prislo v dto, jinak
                                            //      nefunguje mazani. Zaroven nechci ztratit instanci filterStrPopis.
                                            p.hodnota = dp.length === 1 ? dp[0].hodnota : "";
                                            switch (op) {
                                                case "apply":
                                                    $(this).gfield("setValue", { c: p.hodnota }, { triggerChange: false });
                                                    break;
                                                case "collect":
                                                default: return;
                                            }
                                        },
                                        invalidTransform: (v) => {
                                            if (typeof v === "string") {
                                                let val = {};
                                                val[c] = v;
                                                return val;
                                            }
                                            return v;
                                        }
                                    })
                                }
                            });
                        }
                    }
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
                createActions() {
                    this.detailAct = this.actions.add({
                        name: "detailAct",
                        caption: "jres:31100266", //RC 31100266 : Zobrazit detail
                        icon: "gi-detail",
                        enabled: false,
                        visible: (this.TypUlohy != 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */ && this.TypUlohy != 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */ && this.TypUlohy != 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */),
                        run: (ev, ctx) => { this.showDetail(); }
                    });
                    this.prevFilterAct = this.actions.add({
                        name: "prevFilterAct",
                        icon: "gi-arrow gi-rot180",
                        enabled: false,
                        caption: "jres:31100218", //RC 31100218 : Předchozí filtr
                        captionVisible: "never",
                        tooltip: "jres:31100220", //RC 31100220 : Návrat k předchozí hodnotě filtru a vyhledání.
                        run: (ev, ctx) => { this.prevFilter(); }
                    });
                    this.nextFilterAct = this.actions.add({
                        name: "nextFilterAct",
                        icon: "gi-arrow",
                        enabled: false,
                        caption: "jres:31100219", //RC 31100219 : Následující filtr
                        captionVisible: "never",
                        tooltip: "jres:31100221", //RC 31100221 : Vyplnění následujícího filtru a vyhledání.
                        run: (ev, ctx) => { this.nextFilter(); }
                    });
                    if (this.tema !== "")
                        this.printAct = this.actions.add(GAction.createPrintAction({
                            name: "printAct",
                            tema: this.tema,
                            parentContent: this,
                            reportGeneratorType: "Gordic.Ucr.WebClient.GSeznamEkoZaznamuGenerator",
                            reportStarting: (rep) => { return this.reportStarting(rep).then(() => { return rep; }); },
                            schedulingDisabled: true,
                        }));
                    this.zapisyAct = this.actions.add({
                        name: "zapisyAct",
                        icon: "gi-list",
                        enabled: false,
                        caption: "jres:31100124", //RC 31100124 : Zápisy
                        run: (ev, ctx) => { this.showZapisy(); }
                    });
                    this.zapisyAllAct = this.actions.add({
                        name: "zapisyAllAct",
                        icon: "gi-list",
                        enabled: false,
                        caption: "jres:30250273", //RC 30250273 : Zápisy vše
                        run: (ev, ctx) => { this.showZapisyAll(); }
                    });
                    this.dokladAct = this.actions.add({
                        name: "dokladAct",
                        enabled: false,
                        caption: "jres:31100233", //RC 31100233 : Doklady/zápisy
                        run: (ev, ctx) => { this.toggleGrouping(); }
                    });
                    this.primdokladAct = this.actions.add({
                        name: "primdokladAct",
                        enabled: false,
                        icon: "fa-external-link",
                        caption: "jres:30250154", //RC 30250154 : Prim. doklad
                        run: (ev, ctx) => { this.showPrimDoklad(); }
                    });
                    this.dokladBLKAct = this.actions.add({
                        name: "dokladBLKAct",
                        enabled: false,
                        caption: "jres:30250155", //RC 30250155 : Doklad BLK
                        run: (ev, ctx) => { this.showPrimDoklad(undefined, "BLK"); }
                    });
                    this.dokladROAct = this.actions.add({
                        name: "dokladROAct",
                        enabled: false,
                        caption: "jres:30250156", //RC 30250156 : Doklad RO
                        run: (ev, ctx) => { this.showPrimDoklad(undefined, "RO"); }
                    });
                    this.clearFilterRowAct = this.actions.add({
                        name: "clearFilterRowAct",
                        caption: "jres:31100267", //RC 31100267 : Vyčistit filtr seznamu
                        icon: "gi-bin",
                        run: (ev, ctx) => { this.$filterPanel.gfilterpanel("clear"); }
                    });
                    this.insAct = this.actions.add({
                        name: "insAct",
                        run: (ev, ctx) => {
                            this.getFilter(this.$filterPanel.gfilterpanel("getConfirmedData"))
                                .then(() => { this.doFilterClick(); });
                        }
                    });
                    this.clearAndFilterAct = this.actions.add({
                        name: "clearAndFilterAct",
                        run: (ev, ctx) => {
                            this.$filterPanel.gfilterpanel("clear");
                            this.getFilter(this.$filterPanel.gfilterpanel("getConfirmedData"))
                                .then(() => { this.doFilterClick(); });
                        }
                    });
                    this.selFilterAct = this.actions.add({
                        name: "selFilterAct",
                        run: (ev, ctx) => { this.dispatchFillServerGridEvent(ev); }
                    });
                    this.selFilterAndSearchAct = this.actions.add({
                        name: "selFilterAndSearchAct",
                        run: (ev, ctx) => {
                            this.dispatchFillServerGridEvent(ev);
                            this.doFilterClick();
                        }
                    });
                    const that = this;
                    this.dotAct = this.actions.add({
                        name: "dotAct",
                        enabled: false,
                        run: (ev, ctx) => {
                            //var sel = that.$grid.ggrid("getSelection", false)[0] as Gordic.Ucr.WebClient.Dto.GSeznamZapisuStavuDto;
                            //#region Takhle to lze nacpat i primo do elementu
                            //var val = {
                            //    elementy: {
                            //        filters: [{
                            //            ucs: { start: sel.ucs, end: sel.ucs },
                            //            drd: sel.drd,
                            //            mesic: { start: sel.mesic, end: sel.mesic },
                            //                ac: { start: sel.ac, end: sel.ac }
                            //        }]
                            //    }
                            //};
                            //that.element.find(".gfilterpanel").gfilterpanel("applyFilter", val);
                            //#endregion 
                            //var val = {
                            //    ucs: { start: sel.ucs, end: sel.ucs },
                            //    drd_msk: sel.drd,
                            //    mesic: { start: sel.mesic, end: sel.mesic },
                            //    ac: { start: sel.ac, end: sel.ac }
                            //};
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            grid
                                .ggridserverfilter("clear")
                                .ggridserverfilter("apply", this.getZapisFilter());
                            this.doFilterClick();
                        }
                    });
                    this.filterPidAct = this.actions.add({
                        name: "filterPidAct",
                        enabled: false,
                        visible: this.TypUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                            || this.TypUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                            || this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */
                            || this.TypUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */
                            || this.TypUlohy == 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */,
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
                    this.shDokladyAct = this.actions.add({
                        name: "shDokladyAct",
                        enabled: false,
                        visible: (this.TypUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */ || this.TypUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                            || this.TypUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                            || this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */
                            || this.TypUlohy == 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */),
                        //NOTE: Jak to delaji v tlustym: GSeznamUctZaznamuStavyZapisyTab.m_ActionDoklady_Start(): 
                        //Provedou seskupeni, ktere pridaji jako nove radky a pak zafiltruji pouze na souctove radky
                        run: () => { this.toggleGrouping(this.profiles.doklady.name); }
                    });
                    this.shZapisyAct = this.actions.add({
                        name: "shZapisyAct",
                        visible: (this.TypUlohy === 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */ || this.TypUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */
                            || this.TypUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                            || this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */),
                        enabled: false,
                        run: () => { this.toggleGrouping(this.profiles.default.name); }
                    });
                    if (this.TypUlohy == 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */)
                        this.zatriditAct = this.actions.add({
                            name: "zatriditAct",
                            visible: true,
                            caption: "jres:30250336", //RC 30250336 : Zatřídit
                            enabled: true,
                            run: () => { this.zatridit(); }
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
                        || typUlohy === 13 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapisyVse */
                        || typUlohy === 5 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.DanovaEvidenceZapis */) {
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
                loadData(fPanelData) {
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    this.getFilter(fPanelData)
                        .then((newFilter) => {
                        if (this.addFilterToHistory) {
                            if (this.currFilterHistoryIndex !== this.filterHistory.length - 1)
                                this.filterHistory.splice(this.currFilterHistoryIndex + 1);
                            this.filterHistory.push(newFilter);
                            this.currFilterHistoryIndex++;
                        }
                        this.addFilterToHistory = true;
                        this.nextFilterAct.enabled(this.currFilterHistoryIndex < this.filterHistory.length - 1);
                        this.prevFilterAct.enabled(this.currFilterHistoryIndex > 0);
                        return this.getData(newFilter);
                    })
                        .then((data) => {
                        //console.log("getData", data);
                        var enable = data.SeznamZapisu.length > 0;
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
                        //this.zatriditAct.enabled(enable);
                        //let processors = this.$grid.ggrid("getView").processors;
                        //if (!processors.summaryRow) {
                        //    var gf = this.createGridFormat();
                        //    var cols= gf.columns.filter(c => c.caption?.indexOf("%") !== 0).map(e => e.name);
                        //    debugger;
                        //    //var cols = gf.columns.filter(c => c.columnType !== "datetime").map(e => e.name);
                        //    processors.summaryRow = Gordic.Eko.Grid.createSummaryProcessor(gf, cols as any);
                        //}
                        let grid = this.getGrid();
                        if (grid == null)
                            return;
                        grid.ggrid("getView").updateData(data.SeznamZapisu, "reset");
                        this.previewController?.enable(enable);
                        //#region Experimental - nekopirovat!
                        if (typeof data.Sumy !== "undefined" && (typeof data.Sumy["length"] === "undefined" || data.Sumy["length"] !== 0)) {
                            var $souctySpn = $("<span>");
                            $souctySpn.append("jres:31100242"); //RC 31100242 : Součty:
                            if (this.Zapisova) {
                                this.formatSumy("jres:31100056", data.Sumy.c0, $souctySpn, ", "); //RC 31100056 : MD
                                this.formatSumy("jres:31100057", data.Sumy.c1, $souctySpn, ", "); //RC 31100057 : Dal
                                this.formatSumy("jres:31100058", data.Sumy.c0c1, $souctySpn, ""); //RC 31100058 : MD - Dal
                            }
                            else {
                                this.formatSumy("jres:31100059", data.Sumy.c0, $souctySpn, ", "); //RC 31100059 : MO MD
                                this.formatSumy("jres:31100060", data.Sumy.c1, $souctySpn, ", "); //RC 31100060 : MO Dal
                                this.formatSumy("jres:31100061", data.Sumy.c0c1, $souctySpn, "; "); //RC 31100061 : MO MD - Dal
                                this.formatSumy("jres:31100062", data.Sumy.c0_as, $souctySpn, ", "); //RC 31100062 : AS MD
                                this.formatSumy("jres:31100063", data.Sumy.c1_as, $souctySpn, ", "); //RC 31100063 : AS Dal
                                this.formatSumy("jres:31100064", data.Sumy.c0c1_as, $souctySpn); //RC 31100064 : AS MD - Dal
                            }
                            grid.ggrid("statusWidget", "ucrsuma-panel").empty().append($souctySpn);
                        }
                        //#endregion
                        return;
                    });
                }
                formatSumy(caption, value, $spn, separator) {
                    $spn.append(caption + "=");
                    $spn.append($("<span>", { text: Gordic.Templates.Formatters.number(parseDecimal(value), "C" /*"C2"*/), style: "font-weight: 700" }));
                    if (separator)
                        $spn.append(separator);
                }
                getFilter(fPanelData) {
                    var filterDto = fPanelData || {};
                    let elementy = null; //TODO: Po vyberu varianty otypovat!!!
                    let filterStrPopis = [];
                    if (fPanelData) {
                        if (fPanelData.elementy && $.isPlainObject(fPanelData.elementy))
                            elementy = fPanelData.elementy;
                        if (fPanelData.filterStrPopis && fPanelData.filterStrPopis instanceof Array)
                            filterStrPopis = fPanelData.filterStrPopis;
                    }
                    let grid = this.getGrid();
                    if (grid == null)
                        return $.Deferred().reject().promise();
                    debugger;
                    return grid.ggridserverfilter("collect", filterDto)
                        .then((d) => {
                        this.log.trace("filter", d);
                        this.log.trace("elementy", JSON.stringify(elementy));
                        this.log.trace("filterStrPopis", filterStrPopis);
                        this.log.trace("strPopisKeys", this.addStrPopisColumns);
                        return { filter: d, elementy: elementy, filterStrPopis: filterStrPopis, skipSumLimit: false, strPopisKeys: this.addStrPopisColumns, popisDokladu: this.userSettings?.get("strukturovanyPopisDokladuAutoAddGridColumns") };
                    });
                }
                createFilterPanel() {
                    var that = this;
                    let cfuSet = Gordic.Eko.CfuUtils.getCfuSetServerFilters(this, {
                        isRoz: this.Rozpocet,
                        isUct: this.Ucetnictvi,
                        checkUete: this.ekoParams.CheckUete,
                        wildcard: this.Globals.Others?.Wildcard,
                        ixsRoz: this.ekoParams.IxsRoz || undefined
                    });
                    var gf = Gordic.Ucr.WebClient.GElementUtils.createElementsGridFormat({
                        ekoParams: this.ekoParams,
                        globals: this.globals,
                        typSestavy: this.typSestavy,
                        cfuSet: cfuSet,
                        filterOptions: this.filterOptions,
                        filterParams: this.filterParams
                    });
                    var elmRowOpts = { label: "Elementy" };
                    elmRowOpts["favoriteRowLayoutDescriptor"] = "w-L-9 w-M-8 w-S-12";
                    let fpForm;
                    if (this.TypUlohy === 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */) {
                        fpForm = new Gordic.Forms.Form({ tabLabel: "jres:30250052" }); //RC 30250052 : Filtr
                        let volbyData;
                        volbyData = [{ text: this.zkratky.Nks, hodnota: 1 }];
                        if (typeof this.wodrOrj !== "undefined")
                            volbyData.push({ text: this.wodrOrj.caption, hodnota: 2 });
                        if (typeof this.wodrOrg !== "undefined")
                            volbyData.push({ text: this.wodrOrg.caption, hodnota: 3 });
                        let volby = new Gordic.Data.View(volbyData, { key: "hodnota" });
                        let initialValue = [];
                        if (that.useNS)
                            initialValue.push({
                                text: this.zkratky.Nks, hodnota: 1
                            });
                        if (that.useORJ)
                            initialValue.push({
                                text: this.wodrOrj.caption, hodnota: 2
                            });
                        if (that.useORG)
                            initialValue.push({
                                text: this.wodrOrg.caption, hodnota: 3
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
                                if (that.loading)
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
                            .appendTo(this.element)
                            .gfilterpanel({
                            forms: [fpForm],
                            favorites: ["md"],
                            favoriteLayoutDescriptor: "L5M3S1 L-12-12-0 M-12-12-0 S-12-12-0",
                            searchButtonOnMainRow: true,
                            saveOptionsForm: WebClient.GUcrMaskaDetail.getForm(gf), //TODO: Dat spravny typ gridformatu!
                            filterViewMode: FilterViewMode.Simple,
                            filterViewModeUserSettings: [FilterViewMode.Detail],
                            filterStorageService: new WebClient.GUcrMaskaService({ typSestavy: this.typSestavy, parentContent: this, fragments: "*,elementy" }),
                            autoLoadAfterChoseFilter: false,
                            apply: (ev, data) => { this.loadData(data.filter); },
                            reset: (ev, data) => {
                                let grid = this.getGrid();
                                if (grid == null)
                                    return;
                                grid.ggridserverfilter("clear");
                            },
                            primaryButtonBehaviour: "AlwaysPrimary",
                            clearFilterButtonVisible: "AlwaysVisible",
                            poVyhledaniZobrazit: "OblibenePodminky",
                            poVyhledaniZobrazitUserSettings: "Deny" //NOTE: Zakazuje prepinani po vyhledani - pokud se nekdo pokousel vymazat filtr v tomto rezimu, tak musel kliknout na vyhledat, viz T3987
                        });
                        return;
                    }
                    else {
                        fpForm = new Gordic.Forms.Form({ tabLabel: "jres:30250052" }) //RC 30250052 : Filtr
                            .addSection()
                            .addRow(elmRowOpts)
                            .addField("gselectbox", Gordic.Eko.Prefabs.cfuElements({
                            name: "elementy",
                            //name: "filters",
                            id: this.taskId ? this.taskId + "_elementyField#" : undefined,
                            model: "model.elementy.filters=value",
                            modelValueTransform: {
                                apply: (modelValue) => { return modelValue; },
                                //apply: (modelValue) => { return modelValue.filters; },
                                collect: (fieldValue) => { return fieldValue; }
                                //collect: (fieldValue) => { return { filters: fieldValue }; }
                            },
                            change: function (ev, obj) { that.log.trace("elementy", $(this).gfield("getValue")); },
                            gridFormat: gf,
                            checkUete: this.ekoParams.CheckUete,
                            canAddNewRecords: true,
                            canRemoveRecords: true,
                            createNewRecord: WebClient.GElementUtils.createNewElementFunc(this.globals.RezimProvozu, this.ekoParams),
                            clearRecord: WebClient.GElementUtils.createClearElementFunc(this.globals.RezimProvozu),
                            formatElementValueOptions: { skip: WebClient.GElementUtils.getElementValueSkipColumns(this.globals.RezimProvozu), nameColumn: "nazev" },
                        }));
                    }
                    if (this.TypUlohy === 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */ || this.TypUlohy === 16 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy */
                        || this.TypUlohy === 17 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Preuctovani_stavy */)
                        fpForm.addRow("jres:31100223") //RC 31100223 : Filtr dle str. popisu
                            .addField("gselectbox", Gordic.Ucr.WebClient.Prefabs.strukturovanyPopisFilter({
                            name: "filterStrPopis",
                            initialValue: this.filterStrPopis || [],
                            emptyValue: this.filterStrPopis || [], //Optimalizace, abych nemusel delat dalsi request
                            change: (ev, v) => {
                                //Setnuti hodnoty str. popisu z policka ve filterpanelu do policka, kt. je soucasi ggridserverfilter
                                if (!this.addStrPopisColumns || !v.value)
                                    return;
                                let grid = that.getGrid();
                                if (grid == null)
                                    return;
                                for (var i = 0; i < v.value.length; i++) {
                                    let val = v.value[i];
                                    if (this.addStrPopisColumns.indexOf(val.klic) > -1) {
                                        let vv = {};
                                        vv[val.klic] = val.hodnota;
                                        grid.ggridserverfilter("findFields", val.klic).gfield("setValue", vv, { triggerChange: false });
                                    }
                                }
                            }
                        }));
                    this.$filterPanel = $("<div>")
                        .appendTo(this.element)
                        .gfilterpanel({
                        forms: [fpForm],
                        favorites: ["md"],
                        favoriteLayoutDescriptor: "L5M3S1 L-12-12-0 M-12-12-0 S-12-12-0",
                        searchButtonOnMainRow: true,
                        saveOptionsForm: WebClient.GUcrMaskaDetail.getForm(gf), //TODO: Dat spravny typ gridformatu!
                        filterStorageService: new WebClient.GUcrMaskaService({ typSestavy: this.typSestavy, parentContent: this, fragments: "*,elementy" }),
                        autoLoadAfterChoseFilter: false,
                        apply: (ev, data) => { this.loadData(data.filter); },
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
                        //TODO: Pridat formatovani pro pripady, kdy jsou oblibene na fitrpanelu schovane
                        //badgeData: (ev, o) => {
                        //    let d = o.data.elementy;
                        //    if (!d || !d.filters)
                        //        return;
                        //    o.tooltip = "Elementy:<br/>";
                        //    o.tooltip += Gordic.Eko.Prefabs.formatElementValues(gf as any, d.filters).html();
                        //    o.tooltip = o.tooltip.replace("OR", "<br/>");
                        //}
                    });
                }
                getData(filter) {
                    let def = $.Deferred();
                    let that = this;
                    if (this.TypUlohy === 4 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.FinancovaniZapis */) {
                        if (this.Filter) {
                            filter.filter.rok = this.Filter.rok;
                            filter.filter.ico = this.Filter.ico;
                        }
                    }
                    if (this.TypUlohy === 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */) {
                        //filter.RadekStavu = this.CurrentRow;
                        let rq = {
                            RadekStavu: this.CurrentRow,
                            Maska: filter.filter,
                            Maska2: filter.filter,
                            TypUlohy: this.TypUlohy,
                            Elementy: filter.elementy,
                            logovatGdpr: true,
                            maxRecords: -1,
                        };
                        return that.getDataSaldokontoZapisy(def, rq, null);
                    }
                    else if (this.TypUlohy === 13 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapisyVse */) {
                        return that.getSaldokontoZapisyVse(filter);
                    }
                    //else if (this.TypUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.IISSP_Nezarazene_zapisy) {
                    //    return that.getSaldokontoZapisyVse(filter);
                    //}
                    else if (this.TypUlohy === 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */) {
                        // zjisteni vybranych slov
                        this.useNS = false;
                        this.useORG = false;
                        this.useORJ = false;
                        for (var i = 0; i < filter.filter.volby.length; i++) {
                            if (filter.filter.volby[i] == 1)
                                this.useNS = true;
                            if (filter.filter.volby[i] == 2)
                                this.useORJ = true;
                            if (filter.filter.volby[i] == 3)
                                this.useORG = true;
                        }
                        filter.useNS = this.useNS;
                        filter.useORG = this.useORG;
                        filter.useORJ = this.useORJ;
                        //let maska: Gordic.Uct.Interface.GEkoFilterDto = {};
                        let maska = filter.filter;
                        for (var name in filter.filter?.cfu) {
                            maska[name] = filter.filter?.cfu[name];
                        }
                        let rq = { logovatGdpr: true, ns: this.useNS, org: this.useORG, orj: this.useORJ, maxRecords: Gordic.Eko.Utils.GetUserSettingsListWarning(that, "Global.Ucr.AppSettings") ? Gordic.Eko.Utils.GetUserSettingsListMaxCount(that, "Global.Ucr.AppSettings") : -1 };
                        let grid = that.getGrid();
                        if (grid == null)
                            return $.Deferred().reject().promise();
                        grid.ggrid("option", "columns", this.createGridFormat());
                        return this.getDataSaldokonto(def, maska, rq);
                    }
                    else {
                        this.call("GetData", { f: filter })
                            .then(def.resolve)
                            .catch((xhr, state, o) => {
                            if (o && o.data && o.data.sumLimit) {
                                o.handled = true;
                                this.showSumLimitExceeded(o.data.sumLimit)
                                    .then(() => {
                                    filter.skipSumLimit = true;
                                    this.getData(filter).then(def.resolve);
                                })
                                    .catch(() => def.reject());
                            }
                            else
                                def.reject();
                        });
                    }
                    return def.promise();
                }
                /**
                 * Nacteni vsech zapisu
                 *
                 * @param def
                 * @param filter
                 */
                getSaldokontoZapisyVse(filter) {
                    const op = this.beginOperation({
                        id: "GUcrZapisListAllRequestDto",
                        progress: 0, total: 100,
                        text: "jres:30250289", //RC 30250289 : Načítám...
                        cancelAction: new GAction({ caption: "jres:30250285", run: () => { task.cancel(); }, name: "cancelAct" }) //RC 30250285 : Storno
                    });
                    var task = Gordic.Async.GTaskManager.start("Gordic.Uct.Server.GUcrZapisySaldokontoAsync", {
                        Maska: filter.filter,
                        RadekStavu: this.Rows,
                        Maska2: filter.filter,
                        TypUlohy: this.TypUlohy,
                        Elementy: filter.elementy,
                        logovatGdpr: true,
                        maxRecords: -1,
                        Nastaveni: { OtazkaVelkeMnozstviZaznamu: false }
                    });
                    return task.getPromise()
                        .then((result) => { return { SeznamZapisu: result.result, Sumy: [] }; }, (t) => {
                        if (t.state === 6 /* Gordic.Async.GTaskState.cancelSignalized */) {
                            this.dialogs.alert("Stornovano");
                        }
                        else if (t.state === 4 /* Gordic.Async.GTaskState.faulted */) {
                            this.dialogs.showException(t.exception);
                            t.handled = true;
                        }
                        return $.Deferred().reject().promise();
                    })
                        .progress((a) => {
                        if (a.progress) {
                            op.progress = a.progress.current, op.total = a.progress.total, op.text = a.progress.text;
                            this.progressOperation(op);
                        }
                    }).always(() => this.endOperation(op));
                }
                /**
                 * Nacteni dat pro saldokonto zapisy
                 * @param def
                 * @param maska
                 * @param rq
                 */
                getDataSaldokontoZapisy(def, rq, filters) {
                    let that = this;
                    this.beginOperation("");
                    Gordic.Isl.UcrUcetniZapis.listData({ rq: rq, filters: filters })
                        .getData()
                        .then(result => {
                        //debugger;
                        let ret = {
                            SeznamZapisu: result,
                            Sumy: []
                        };
                        def.resolve(ret);
                        return;
                    })
                        .then(null, function (jqXHR, type, obj) {
                        //var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, rq, null as any);
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeptionNew(that, jqXHR, rq);
                        if (typeof returnMessage === "object") {
                            // ziskani zprav poslanych ze serveru
                            returnMessage
                                .then(function (returnValue) {
                                if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                    debugger;
                                    rq.Nastaveni = returnValue.Nastaveni;
                                    return that.getDataSaldokontoZapisy(def, rq, filters);
                                }
                                else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                    that.endOperation();
                                    return def.reject();
                                }
                                else {
                                    that.endOperation();
                                    return def.resolve();
                                }
                            }).catch(() => def.reject());
                            return def.promise();
                        }
                        that.endOperation();
                        throw jqXHR;
                    })
                        .always(() => {
                        that.endOperation();
                    });
                    return def.promise();
                }
                /**
                 * Nacteni dat pro saldokonto
                 * @param def
                 * @param maska
                 * @param rq
                 */
                getDataSaldokonto(def, maska, rq) {
                    let that = this;
                    this.beginOperation("");
                    Gordic.Isl.UcrSaldokonto.listData({ maska: maska, rq: rq })
                        .getData()
                        .then(result => {
                        let ret = {
                            SeznamZapisu: result,
                            Sumy: []
                        };
                        def.resolve(ret);
                        return;
                    })
                        .then(null, function (jqXHR, type, obj) {
                        //var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that, obj, type, rq, null as any);
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeptionNew(that, jqXHR, rq);
                        if (typeof returnMessage === "object") {
                            // ziskani zprav poslanych ze serveru
                            returnMessage
                                .then(function (returnValue) {
                                if (returnValue.Result === 30 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Repeat */) {
                                    debugger;
                                    rq.Nastaveni = returnValue.Nastaveni;
                                    return that.getDataSaldokonto(def, maska, rq);
                                }
                                else if (returnValue.Result === 20 /* Gordic.Eko.Interface.GEResultOfProcessingTheMessage.Error */) {
                                    that.endOperation();
                                    return def.reject();
                                }
                                else {
                                    that.endOperation();
                                    return def.resolve();
                                }
                            }).catch(() => def.reject());
                            return def.promise();
                        }
                        that.endOperation();
                        throw jqXHR;
                    })
                        .always(() => {
                        that.endOperation();
                    });
                    return def.promise();
                }
                /**
                 * Zatrideni radku
                 *
                 * */
                zatridit() {
                    let that = this;
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    var sel = grid.ggrid("getSelection", false);
                    if (sel.length === 0)
                        return;
                    let row = sel[0];
                    //let row: Gordic.Uct.Interface.GUctSeznamZapisuStavuDto={ };
                    that.dialogs.showModalWindow(Gordic.Ucr.WebClient.GInputIDRISRE, row, "jres:30250337" /*, 400, 350,true*/) //RC 30250337 : Zadejte identifikaci RISRE
                        .on("close", function (ev, result) {
                        if (result != null && typeof result.zatrideno !== "undefined" && result.zatrideno != "") {
                            // TODO: zatrideno, nutno znovunacit, nebo zaznam smazat
                            //let newData: Gordic.Uct.Interface.GUctSeznamZapisuStavuDto[] = [];
                            let a;
                            let grid = that.getGrid();
                            if (grid == null)
                                return;
                            let view = grid.ggrid("getView");
                            //let data: Gordic.Uct.Interface.GSeznamZapisuStavuDto[] = [row];
                            //let data = view.getDataRows(false);
                            //for (let i = 0; i < data.length; i++) {
                            //    let radek = data[i];
                            //    if (!(radek.rok == row.rok &&
                            //    radek.lic == row.lic &&
                            //    radek.ico == row.ico &&
                            //    radek.ucs == row.ucs &&
                            //    radek.mesic == row.mesic &&
                            //    radek.ac == row.ac &&
                            //        radek.radek_z == row.radek_z)) {
                            //        data.push(radek);
                            //    } 
                            //}
                            view.updateData(row, "delete");
                            //.getDataRows(false);
                        }
                    });
                    return;
                }
                showSumLimitExceeded(count) {
                    let def = $.Deferred();
                    let msg = `jres:31100236${count}. `; //RC 31100236 : Počet vybraných řádků je 
                    msg += "jres:31100237"; //RC 31100237 : Načtení všech těchto řádků může trvat dlouho. Upřesněte výběr.<br/> Přejete si pokračovat v načítání?
                    this.dialogs.confirm("", msg)
                        .on("yes", () => { def.resolve(); })
                        .on("close", () => { if (def.state() === "pending")
                        def.reject(); });
                    return def.promise();
                }
                showDetail(row) {
                    if (!row) {
                        let grid = this.getGrid();
                        if (grid == null)
                            return;
                        var sel = grid.ggrid("getSelection");
                        if (sel.length === 0)
                            return;
                        row = sel[0];
                    }
                    ;
                    let typUlohy = this.TypUlohy;
                    if (this.TypUlohy === 4 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.FinancovaniZapis */) {
                        if (row.priz_ur != 0)
                            typUlohy = 1 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.RozpocetZapis */;
                        else
                            typUlohy = 3 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.UcetnictviZapis */;
                    }
                    let options = {
                        typUlohy: typUlohy, //this.TypUlohy,
                        gridFormat: this.createGridFormat(),
                        filter: this.getZapisFilter(),
                        row: row,
                        globals: this.globals,
                        viewMode: "full",
                        cfuSetSorted: this.cfuSetSorted,
                    };
                    this.navigate(Gordic.Ucr.WebClient.GDetailStavZapisRadku, options);
                }
                /**
                 * Zobrazeni prim. dokladu
                 * @param row
                 */
                showPrimDoklad(row, typ = "") {
                    if (!row) {
                        let grid = this.getGrid();
                        if (grid == null)
                            return;
                        var sel = grid.ggrid("getSelection");
                        if (sel.length === 0)
                            return;
                        row = sel[0];
                    }
                    ;
                    //debugger;
                    // Povolene agendy
                    //if (row.typ_ag == "KDF") {
                    //    a_agenda = 70;
                    //}
                    //if (cnt.filter_akce.typ == "KOF") {
                    //    a_agenda = 80;
                    //}
                    //if (cnt.filter_akce.typ == "POU") {
                    //    a_agenda = 180;
                    //}
                    //if (cnt.filter_akce.typ == "PRE") {
                    //    a_agenda = 230;
                    //}
                    var ixp = row.ixp;
                    var typAg = row.typ_ag;
                    if (typ == "BLK") {
                        //doklad blk
                        typAg = null;
                        if (this.TypUlohy == 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */ || this.TypUlohy == 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */) {
                            // Doklad BLK
                            if (typeof row.ixp_prim === "undefined" || row.ixp_prim == null)
                                return;
                            ixp = row.ixp_prim;
                        }
                    }
                    else if (typ == "RO") {
                        typAg = null;
                        // Specialitka pro strednedoby vyhled
                        if (this.TypUlohy == 7 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis */ || this.TypUlohy == 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */) {
                            // Doklad RO
                            if (typeof row.ixp_roz === "undefined" || row.ixp_roz == null)
                                return;
                            typAg = 50;
                            ixp = row.ixp_roz;
                        }
                    }
                    if (typAg !== null && ![40, 50, 70, 80, 100, 110, 120, 180, 230, 510, 580, 620, 330].concat(row.typ_ag))
                        return;
                    // test na vyplenini ixp
                    if (typeof ixp === "undefined" || ixp === null)
                        return;
                    Gordic.WebApp.Utility.openApp({
                        ixx1: ixp, // id cílového objektu v nově otevírané záložce
                        //ixx2: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        //ixx3: null,  // druhé id cílového objektu v případě složeného klíče (nepovinné)
                        typAg: typAg, // typ agendy cílového objektu (nepovinné)
                        //faze: null,  // fáze požadovaná pro otevření cílového objektu (nepovinné)
                        banCurrentApp: true, // příznak zákazu použití aktuální fáze (nepovinné)
                        noAppFail: false // příznak vyvolání výjimky při nenalezení cílové fáze (nepovinné) 
                    }, "OpenDetail" // název metody spuštěné po otevření nové záložky
                    ).catch(() => {
                        Gordic.Wfl.Dialogs.DetailDokumentuSpisu(this, { SimpleMode: true, DetailDto: { ixp: ixp } }, Gordic.Global.Enums.ModOtevreni.auto);
                    });
                }
                /***
                 * Zobrazeni vsech zapisu pro saldokonto
                 *
                 * */
                showZapisyAll() {
                    var that = this;
                    let typUlohy = 13 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapisyVse */;
                    let id = "seznamSaldokonto#"; //NOTE: Musi byt stejne ni na MainApp.cs
                    let grid = that.getGrid();
                    if (grid == null)
                        return;
                    let rows = grid.ggrid("getView").getDataRows(false);
                    this.getFilter()
                        .then((f) => {
                        //let filter: GEkoFilterDto;
                        return that.navigate('Gordic.Ucr.WebClient.GSeznamEkoZaznamu', {
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
                        if (this.TypUlohy === 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */) {
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
                        switch (this.TypUlohy) {
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
                        return this.navigate('Gordic.Ucr.WebClient.GSeznamEkoZaznamu', {
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
                    let grid = this.getGrid();
                    if (grid == null)
                        return {};
                    var sel = grid.ggrid("getSelection", false)[0];
                    if (this.TypUlohy === 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */)
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
                prevFilter() {
                    this.moveFilter(this.filterHistory[--this.currFilterHistoryIndex]);
                }
                nextFilter() {
                    this.moveFilter(this.filterHistory[++this.currFilterHistoryIndex]);
                }
                moveFilter(currFilter) {
                    this.addFilterToHistory = false;
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    grid.ggridserverfilter("apply", currFilter.filter);
                    //NOTE: Toto zatim nebude fungovat, zalezi na variante elmentu, ktera vyhraje
                    //this.element.find(".gfilterpanel").gfilterpanel("applyFilter", currFilter.elementy.filters);
                    this.doFilterClick();
                }
                doFilterClick() {
                    //NOTE: Toto je spatne, ale pro ukazku staci - je nutne filtrovat i s elementy
                    this.element.find(".gfilterpanel").find(".js-hlavniVyhledat").trigger("click");
                    //TODO: Po testech s distributory vse zrefaktorit na takovyto zapis, musi byt ale radne otestovan pro vsechny pripady
                    //this.getFilter(this.$filterPanel.gfilterpanel("getConfirmedData")).then((d) => { this.loadData(d); });
                }
                dispatchFillServerGridEvent(ev) {
                    var $col = $(ev.target);
                    if (!ev.ctrlKey || !$col.hasClass("cell") || $col.hasClass("js-cfu-cell"))
                        return;
                    let selection = document.getSelection();
                    if (ev.shiftKey && selection)
                        selection.empty(); //Pokud se vybira pres kl. zkratku ctrl+shift+lclick, tak at se neoznacuje text
                    var colIndex = $col.attr("data-column-index");
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    var colDef = grid.ggrid("trueColumns", false)[colIndex];
                    if (colDef.serverFilter) {
                        let value = $col.text();
                        if (!value)
                            return; //NOTE: Pokud neni hodnota, tak asi neni co resit. Resi hlavne bug s textovou hodnotou v ciselnych sloupcich
                        let sel = grid.ggrid("getSelection", false)[0];
                        //NOTE: Tohle je spatny zpusob, cele by to chtelo prepsat, aby se neslo po stringu z bunky, ale po datech. 
                        //      Poptat se Skalice, jestli existuje nejaky lepsi zpusob...
                        if (colDef.columnType === "datetime")
                            value = sel[colDef.name];
                        else if (colDef.columnType === "currency")
                            value = sel[colDef.name];
                        //NOTE: Toto je taky spatne, protoze se opira o model, ktery je soucasti v prefabu uvnitr. Jiny zpusob asi zatim neni :-(
                        if (colDef.name === "typ_ag")
                            value = { typ_ag: sel.typ_ag, zkr_ag: sel.typ_ag_txt };
                        else if (colDef.name === "esu_txt")
                            value = { esu_txt: sel.esu_txt, ixs_esu: sel.ixs_esu };
                        else if (colDef.name === "esu_ico")
                            value = { esu_ico: sel.esu_ico, ixs_esu: sel.ixs_esu };
                        else if (colDef.name === "esu_rc")
                            value = { esu_rc: sel.esu_rc, ixs_esu: sel.ixs_esu };
                        else if (colDef.name === "ixs_esu")
                            value = { ixs_esu: sel.ixs_esu };
                        var $filterFrmBox = grid.ggridserverfilter("findFields", colDef.name);
                        $filterFrmBox.gfield("setValue", value, { valid: false });
                    }
                }
                /** Priprava pro generovani sestavy */
                reportStarting(ri) {
                    return this.getFilter(this.$filterPanel.gfilterpanel("getConfirmedData"))
                        .then((f) => {
                        ri.customDto = {
                            typUlohy: this.TypUlohy,
                            filter: f.filter,
                            elementy: f.elementy,
                            filterStrPopis: f.filterStrPopis
                        };
                    });
                }
                toggleGrouping(profileName) {
                    GDlg.alert("Pro přepnutí zobrazení mezi 'Doklady' a 'Zápisy' použijte profily gridu.");
                    let grid = this.getGrid();
                    if (grid == null)
                        return;
                    let currProfile = grid.ggrid("getCurrentProfile");
                    profileName = profileName || (currProfile.name !== this.profiles.doklady.name ? this.profiles.doklady.name : this.profiles.default.name);
                    if (currProfile.name === profileName)
                        return;
                    grid.ggrid("useProfile", profileName);
                    //#region Alternativa, ktera muze fungovat bez vizualniho seskupeni
                    //let tc = this.$grid.ggrid<GSeznamZapisuStavuDto>("trueColumns");
                    //let aggrs = new Array();
                    //for (var i = 0; i < tc.length; i++) {
                    //    if (tc[i].aggregate) aggrs.push(tc[i].aggregate);
                    //}
                    //this.$grid.ggrid<GSeznamZapisuStavuDto>("getView").process({
                    //    ac: new Gordic.Data.Grouping([{
                    //        defaultState: "closed",
                    //        hash: (meta, rows) => {
                    //            var d = meta.data;
                    //            return `${d.ac}|${d.mesic}|${d.rok}|${d.lic}|${d.ico}|${d.ucs}`; //NOTE: Pridat aggregate: Gordic.Data.Aggregates.first("ac"), u vsech techto sloupcu
                    //        },
                    //        sort: "rok,lic,ico,ucs,mesic,ac",
                    //        aggregate: Gordic.Data.Aggregates.multi<GSeznamZapisuStavuDto>(...aggrs as any)
                    //    }])
                    //})
                    //NOTE: Aby predchozi fungovalo, je nutne pri vytvoreni widgetu gridu pridat tento radek do options:
                    //groupingHeaderColumns: {
                    //    'ac#0': { cellTemplate: Gordic.Templates.ensureTemplate("<span class='group-header-count'>({@structure.rows.length})</span>") },
                    //} as any
                    //#endregion
                }
                /**
                 * Uzavirani okna
                 * @returns
                 */
                closing() {
                    var that = this;
                    if (that.TypUlohy === 11 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto */) {
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
                        that.userSettings.set("usedNS", useNS);
                        that.userSettings.set("useORG", useORG);
                        that.userSettings.set("usedORJ", useORJ);
                    }
                    return $.Deferred().resolve().promise();
                }
            };
            GSeznamEkoZaznamu = __decorate([
                Decorators.gcontent
            ], GSeznamEkoZaznamu);
            WebClient.GSeznamEkoZaznamu = GSeznamEkoZaznamu;
            //class GUcrSummaryProcessor extends Gordic.Data.BaseProcessor<GSeznamZapisuStavuDto> {
            //    tiers = {
            //        view: { order: 99 }
            //    }
            //    process(tier: Gordic.Data.ViewTiers, data: MetaRow<GSeznamZapisuStavuDto>[], context: Gordic.Data.DataStreamContext<GSeznamZapisuStavuDto>): MetaRow<GSeznamZapisuStavuDto>[] | null {
            //        //debugger; 
            //        //TODO: Pomoct TKaresovi s processorem
            //        //context.
            //        data.push({ _isMeta: true, data: {ucs: "000", mesic: 1, ac: "1", c0: "0" }})
            //        return data;
            //    }
            //}
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUVrb1phem5hbXVUUy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTZXpuYW1Fa29aYXpuYW11VFMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQTIrRWY7QUEzK0VELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTIrRW5CO0lBMytFZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMitFN0I7UUEzK0VvQixXQUFBLFNBQVM7WUFHMUIsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxPQUFBLFlBQVk7Z0JBQW5EOztvQkE2Qkksb0RBQW9EO29CQUM1QyxVQUFLLEdBQVksSUFBSSxDQUFDO29CQUN0QixXQUFNLEdBQVksSUFBSSxDQUFDO29CQUN2QixXQUFNLEdBQVksSUFBSSxDQUFDO29CQU0vQixnQkFBZ0I7b0JBQ2hCOzt1QkFFRztvQkFDTyxjQUFTLEdBQVcsY0FBYyxDQUFDO29CQUU3Qyx3REFBd0Q7b0JBQ2hELGtCQUFhLEdBQTZDLEVBQUUsQ0FBQztvQkFDN0QsMkJBQXNCLEdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLHVCQUFrQixHQUFZLElBQUksQ0FBQztvQkE4QjNDLGVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxDQUFDO2dCQTAzRWhHLENBQUM7Z0JBeDNFVSxjQUFjO29CQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUNyQyxJQUFJLElBQUks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OzRCQUN0QixJQUFLLE1BQU0sQ0FBQyxNQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0NBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOzRCQUN2QixJQUFLLE1BQU0sQ0FBQyxNQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0NBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO3dCQUUzQixDQUFDO3dCQUNELE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzt3QkFDMUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO3dCQUM1QixNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7d0JBQzVCLHFEQUFxRDt3QkFDckQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQzt3QkFDMUIsS0FBSyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDOzRCQUNsQyxLQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzVDLENBQUM7d0JBQ0QsSUFBSSxFQUFFLEdBQTRDLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsSUFBSSxFQUFFLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLElBQUksRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO3dCQUN6UyxJQUFJLElBQUks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RUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFB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QUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQ0FDN0IsTUFBTSxHQUFHLElBQUksQ0FBQzt3QkFFdEIsQ0FBQzt3QkFDRCxJQUFJLENBQUMsWUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQ3hDLElBQUksQ0FBQyxZQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDekMsSUFBSSxDQUFDLFlBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM3QyxDQUFDO29CQUVELE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUM1QyxDQUFDO2FBRUosQ0FBQTtZQXY4RVksaUJBQWlCO2dCQUQ3QixVQUFVLENBQUMsUUFBUTtlQUNQLGlCQUFpQixDQXU4RTdCO1lBdjhFWSwyQkFBaUIsb0JBdThFN0IsQ0FBQTtZQWNELHVGQUF1RjtZQUN2RixlQUFlO1lBQ2YsNkJBQTZCO1lBQzdCLE9BQU87WUFFUCw0TEFBNEw7WUFDNUwsc0JBQXNCO1lBR3RCLGdEQUFnRDtZQUdoRCxvQkFBb0I7WUFDcEIsc0ZBQXNGO1lBRXRGLHNCQUFzQjtZQUV0QixPQUFPO1lBQ1AsR0FBRztRQUNQLENBQUMsRUEzK0VvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUEyK0U3QjtJQUFELENBQUMsRUEzK0VnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUEyK0VuQjtBQUFELENBQUMsRUEzK0VTLE1BQU0sS0FBTixNQUFNLFFBMitFZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtRWtvWmF6bmFtdSBleHRlbmRzIEdDb250ZW50QmFzZSB7XHJcbiAgICAgICAgLyoqIEdsb2JhbG5pIG1vZHVsb3ZlIHBhcmFtZXRyeSB2IEpTICovXHJcbiAgICAgICAgZ2xvYmFsczogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclBhcmFtc0R0bztcclxuICAgICAgICBHbG9iYWxzOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyR2xvYmFsRHRvO1xyXG4gICAgICAgIHprcmF0a3k6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkR0by5HVWNyWmtyRHRvO1xyXG4gICAgICAgIHRleHR5OiBHb3JkaWMuVWNyLldlYkNsaWVudC5EdG8uR1VjclprckR0bztcclxuICAgICAgICBmaWx0ZXJPcHRpb25zOiBHb3JkaWMuVWNyLldlYkNsaWVudC5EdG8uR0ZpbHRlck9wdGlvbnNEdG87XHJcbiAgICAgICAgZmlsdGVyUGFyYW1zOiBHRmlsdGVyUGFyYW1zRHRvO1xyXG4gICAgICAgIGZpbHRlclN0clBvcGlzPzogR1N0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlckR0b1tdO1xyXG4gICAgICAgIHByaXZhdGUgZWtvUGFyYW1zOiBHb3JkaWMuVWNyLldlYkNsaWVudC5HRWtvUGFyYW1zRHRvO1xyXG4gICAgICAgIEF2b2lkVXVzOiBib29sZWFuO1xyXG4gICAgICAgIEF2b2lkTmtzOiBib29sZWFuO1xyXG4gICAgICAgIEF2b2lkRXh0OiBib29sZWFuO1xyXG4gICAgICAgIFphcGlzb3ZhOiBib29sZWFuO1xyXG4gICAgICAgIFJvenBvY2V0OiBib29sZWFuO1xyXG4gICAgICAgIFVjZXRuaWN0dmk6IGJvb2xlYW47XHJcbiAgICAgICAgRXh0ZXJuaVN1bWFyaXphY2U6IGJvb2xlYW47XHJcbiAgICAgICAgLy8gbW9kaWZpa292YW5lIGNmdSBwcm8gc2FsZG9rb250b1xyXG4gICAgICAgIHByaXZhdGUgbW9kaWZ5Q2Z1OiBHdWkuV2ViQXBwLkdHcmlkRm9ybWF0RHRvO1xyXG4gICAgICAgIHByaXZhdGUgd29kck9yajogR3VpLldlYkFwcC5HR3JpZENvbHVtbkR0bztcclxuICAgICAgICBwcml2YXRlIHdvZHJPcmc6IEd1aS5XZWJBcHAuR0dyaWRDb2x1bW5EdG87XHJcbiAgICAgICAgRmlsdGVyOiBHRWtvRmlsdGVyRHRvOyAvL011emUgYnl0IHByZWR2eXBsbmVubyB6IHZlbmt1XHJcbiAgICAgICAgQ3VycmVudFJvdzogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvOyAvLyBha3R1YWxuaSB2eWJyYW55IHJhZGVrIHplIHNlem5hbXVcclxuICAgICAgICBSb3dzOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG9bXTsgLy8gYWt0dWFsbmkgdnlicmFueSByYWRlayB6ZSBzZXpuYW11XHJcbiAgICAgICAgUmFkZWtfRFBIOiBzdHJpbmc7IC8vTXV6ZSBieXQgcHJlZHZ5cGxuZW5vIHogdmVua3VcclxuICAgICAgICBTdHJpY3RGaWx0ZXI6IGJvb2xlYW47IC8vTXV6ZSBieXQgcHJlZHZ5cGxuZW5vIHogdmVua3VcclxuICAgICAgICBBdXRvTG9hZERhdGE6IGJvb2xlYW47IC8vTXV6ZSBieXQgcHJlZHZ5cGxuZW5vIHogdmVua3VcclxuICAgICAgICBFY2RkOiBzdHJpbmc7IC8vTXV6ZSBieXQgcHJlZHZ5cGxuZW5vIHogdmVua3VcclxuICAgICAgICBEaWM6IHN0cmluZzsgLy9NdXplIGJ5dCBwcmVkdnlwbG5lbm8geiB2ZW5rdVxyXG4gICAgICAgIC8vIGF0cmlidXR5IHpvYnJhemVuaSBzbG91cGN1IChwb3V6ZSBwcm8gc2FsZG9rb250bylcclxuICAgICAgICBwcml2YXRlIHVzZU5TOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICBwcml2YXRlIHVzZU9SSjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgcHJpdmF0ZSB1c2VPUkc6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgIHByaXZhdGUgVHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGU7XHJcbiAgICAgICAgcHJpdmF0ZSB0eXBTZXN0YXZ5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwU2VzdGF2eTtcclxuICAgICAgICBwcml2YXRlIHRlbWE6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIGRldGFpbEluZjogc3RyaW5nOyAvLyBkb2RhdGVjbmUgaW5mb3JtYWNlIHZlIHN0YXR1c2JhcnVcclxuICAgICAgICBQcml6SWlzc3A6IGJvb2xlYW47XHJcbiAgICAgICAgLy8kZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHRyaWRhIGdyaWR1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGNsYXNzR3JpZDogc3RyaW5nID0gXCJqcy1ncmlkLWJhc2VcIjtcclxuICAgICAgICAkZmlsdGVyUGFuZWw6IEpRdWVyeTtcclxuICAgICAgICAvL3ByaXZhdGUgZWxlbWVudFByb3BlcnR5TmFtZU1hcDogT2JqZWN0TGl0ZXJhbDxzdHJpbmc+O1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVySGlzdG9yeTogQXJyYXk8R1Nlem5hbUVrb1phem5hbXVHZXREYXRhRmlsdGVyRHRvPiA9IFtdO1xyXG4gICAgICAgIHByaXZhdGUgY3VyckZpbHRlckhpc3RvcnlJbmRleDogbnVtYmVyID0gLTE7XHJcbiAgICAgICAgcHJpdmF0ZSBhZGRGaWx0ZXJUb0hpc3Rvcnk6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgIHByaXZhdGUgcHJldmlld0NvbnRyb2xsZXI6IEdvcmRpYy5QcmV2aWV3cy5HUHJldmlld0NvbnRyb2xsZXI8SUdTZXpuYW1aYXBpc3VTdGF2dUR0b1dpdGhUYWJTZXR0aW5ncz47XHJcbiAgICAgICAgcHJpdmF0ZSBwcm9maWxlczogSUdTZXpuYW1aYXBpc3VQcm9maWxlcztcclxuICAgICAgICBwcml2YXRlIGFkZFN0clBvcGlzQ29sdW1ucz86IHN0cmluZ1tdOyAgIC8vU2V6bmFtIHNsb3VwY3Ugc3RyLiBwb3Bpc3UsIGt0ZXJlIGJ5IG1lbHkgYnl0IHByaWRhbnkgZG8gZ3JpZHUgKHBvdXplIHBybyBaYXBpc3lVY2V0bmljdHZpKSAoKVxyXG5cclxuICAgICAgICBwcml2YXRlIGRldGFpbEFjdDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIHByZXZGaWx0ZXJBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBuZXh0RmlsdGVyQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgcHJpbnRBY3Q6IEdQcmludEFjdGlvblR5cGU7XHJcbiAgICAgICAgcHJpdmF0ZSB6YXBpc3lBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSB6YXBpc3lBbGxBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBkb2tsYWRBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBwcmltZG9rbGFkQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgZG9rbGFkUk9BY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBkb2tsYWRCTEtBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBjbGVhckZpbHRlclJvd0FjdDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIGluc0FjdDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIGNsZWFyQW5kRmlsdGVyQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgc2VsRmlsdGVyQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgc2VsRmlsdGVyQW5kU2VhcmNoQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgZG90QWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyUGlkQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgc2hEb2tsYWR5QWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgc2haYXBpc3lBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSB6YXRyaWRpdEFjdDogR0FjdGlvbjtcclxuICAgICAgICAvLyBjZnVzZXRcclxuICAgICAgICBwcml2YXRlIGNmdVNldFNvcnRlZDogR3VpLldlYkFwcC5HR3JpZEZvcm1hdER0bztcclxuXHJcbiAgICAgICAgLyoqIExpbWl0IHBvY3R1IG5hY2l0YW55Y2ggemF6bmFtdSwgcG9rdWQgbmVkb2pkZSBrIHBvdHZyemVuaSwgemUgdXppdmF0ZWwgY2hjZSBqaXQgcHJlcyBsaW1pdCAqL1xyXG4gICAgICAgIHN1bUxpbWl0OiBudW1iZXI7XHJcbiAgICAgICAgbG9nT3B0aW9ucyA9IHsgbmFtZTogXCJHU2V6bmFtRWtvWmF6bmFtdVwiLCBhdXRob3JDb2RlOiAzMTEsIGZpbGU6IFwiR1Nlem5hbUVrb1phem5hbXVUUy50c1wiIH07XHJcblxyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5nbG9iYWxzID0gR29yZGljLlVjci5HbG9iYWxzLkdVY3JHbG9iYWxzO1xyXG4gICAgICAgICAgICB0aGlzLnprcmF0a3kgPSBHb3JkaWMuVWNyLkdsb2JhbHMuR1prcjtcclxuICAgICAgICAgICAgdGhpcy50ZXh0eSA9IEdvcmRpYy5VY3IuR2xvYmFscy5HVHh0O1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAgICAgLy8gbmFjdGVuaSB1bG96ZW55Y2ggdXppdi4gaG9kbm90XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlTlMgPSB0aGF0LnVzZXJTZXR0aW5ncyEuZ2V0KFwidXNlZE5TXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlT1JKID0gdGhhdC51c2VyU2V0dGluZ3MhLmdldChcInVzZWRPUkpcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VPUkcgPSB0aGF0LnVzZXJTZXR0aW5ncyEuZ2V0KFwidXNlT1JHXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMuY3JlYXRlTWVudWJhckRlZih0aGlzLlR5cFVsb2h5KSk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5kZXRhaWxJbmYgIT09IFwidW5kZWZpbmVkXCIgJiYgdGhpcy5kZXRhaWxJbmYudHJpbSgpICE9IFwiXCIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c0JhcihbeyB0eXBlOiBcInN0YXRpY1wiLCBjYXB0aW9uOiB0aGlzLmRldGFpbEluZiB9XSlcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVGaWx0ZXJQYW5lbCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKCh0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpcyB8fCB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX05lemFyYXplbmVfemFwaXN5XHJcbiAgICAgICAgICAgICAgICB8fCB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5XHJcbiAgICAgICAgICAgICkgJiYgKHRoaXMudXNlclNldHRpbmdzPy5nZXQoXCJyb3pzaXJlbnlQb3Bpc0F1dG9BZGRHcmlkQ29sdW1uc1wiKSBhcyBib29sZWFuID8/IGZhbHNlKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU3RyUG9waXNDb2x1bW5zID0gdGhpcy51c2VyU2V0dGluZ3M/LmdldChcInJvenNpcmVueVBvcGlzU2hvd0dyaWRDb2x1bW5zXCIpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgZ3JpZEZvcm1hdCA9IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnByb2ZpbGVzID0gdGhpcy5jcmVhdGVQcm9maWxlcyhncmlkRm9ybWF0KTtcclxuICAgICAgICAgICAgbGV0IHByb2ZpbGVzQXJyID0gW3RoaXMucHJvZmlsZXMuZGVmYXVsdF07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2ZpbGVzLmRva2xhZHkpIHByb2ZpbGVzQXJyLnB1c2godGhpcy5wcm9maWxlcy5kb2tsYWR5KTtcclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgbGV0IHN1bUNvbHMgPSBncmlkRm9ybWF0LmNvbHVtbnMuZmlsdGVyKGMgPT4gKGMuY29sdW1uVHlwZSA9PSBcImN1cnJlbmN5XCIgfHwgYy5jb2x1bW5UeXBlID09IFwibnVtYmVyXCIpICYmIChcInN0YXR1cyxkcmQsbWVzaWMsZGVuLHJvayxyb2tfdWVqLG1lc2ljX3VlalwiLmluZGV4T2YoYy5uYW1lISkpPT0tMSkubWFwKGUgPT4gZS5uYW1lKSBhcyBzdHJpbmdbXTtcclxuICAgICAgICAgICAgY29uc3QgZ3JpZCA9ICQubmV3RGl2KHRoaXMuY2xhc3NHcmlkKVxyXG4gICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoaXMuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICAvL3Jvd0hlaWdodDogMzIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsICAgICAvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHsgICAgIC8vb2JzbHV6bmEgYWtjZSwga3RlcmEgc2Ugc3BvdXN0aSBkYmwgY2xpY2tlbSBuYWQgcmFka2VtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUHJpbWFybmlQb3phZGF2a3laYXBpcyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuVHlwVWxvaHkgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5CYWxhbmNvdmFuaVphcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmltZG9rbGFkQWN0LnJ1bigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3daYXBpc3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dEZXRhaWwoY3R4LmNlbGxJbmZvLmRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1wicG9waXNcIiwgXCJhY1wiXSwgLy9zbG91cGNlLCBwb2RsZSBrdGVyeWNoIHNlIHZ5aGxlZGF2YSB2IHNlYXJjaGJveHUgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB0aGlzLnByb2ZpbGVzLmRlZmF1bHQsIC8vc2tyeXRlIHNsb3VwY2UgcmVzaXQgcHJlcyBjb2x1bW4uaGlkZGVuICsgY29sdW1uTGlzdCAtIHV6aXZhdGVsaSBqc291IHNrcnl0ZSwgbXV6ZSBzaSBqZSB2b2xpdGVsbmUgemFwbm91dFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzOiBwcm9maWxlc0FycixcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0TWVudTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5jbGVhckZpbHRlclJvd0FjdCB9XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IChldiwgc2VsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcHJldmlld1NpZGViYXIuZW1wdHkoKS5hcHBlbmQoXCI8ZGl2PlwiICsgc2VsLmdldFNlbGVjdGlvbihmYWxzZSlbMF0uaXhwICsgXCI8L2Rpdj5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzID0gc2VsLmdldFNlbGVjdGlvbihmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvdEFjdC5lbmFibGVkKHMubGVuZ3RoID4gMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHRoaXMucHJldmlld0NvbnRyb2xsZXIgJiYgdHlwZW9mIHRoaXMucHJldmlld0NvbnRyb2xsZXIgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXI/LnNob3coc1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jZWxsQWN0aXZhdGU6IGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coXCJjZWxsQWN0aXZhdGVcIiwgYXJndW1lbnRzKTt9IC8vTk9URTogTmVkb3N0YW51IHNlIGsgcHV2b2RuaSB1ZGFsb3N0aSwgYWJ5Y2ggemppc3RpbCwgemRhIHNlIGRyemkgY3RybFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZGVrbyhcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvdcSNdG92w70gxZnDoWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5Um93QWxsb3dlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeVJvd0NvbHVtbnM6IHN1bUNvbHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGxvdWjDvSBzZXpuYW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sb25nTGlzdEFsbG93ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbG9uZ0xpc3RNb2RlbDogXCJHbG9iYWwuVWNyLkFwcFNldHRpbmdzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbG9uZ0xpc3RDb3VudE1ldGhvZDogKHJxKSA9PiB0aGF0LmlzbC5aYXBvY3RvdnlMaXN0Lmxpc3RDb3VudChycSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWRzZXJ2ZXJmaWx0ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaW52YWxpZFZhbHVlQ2hhbmdlZDogZnVuY3Rpb24gKGV2KSB7IHRoYXQubG9hZERhdGEoKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHREYXRhOiB7IG5rczogeyBzdGFydDogXCIwMDAwMDRcIiwgZW5kOiBcIjAwMDAwNFwiIH0gfVxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHREYXRhOiB0aGlzLkZpbHRlclxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImdjZnVmaWx0ZXJpbnZhbGlkdmFsdWVzZXRcIiwgZnVuY3Rpb24gKGV2KSB7IHRoYXQubG9hZERhdGEoKTsgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gS2wuIHprcmF0a3lcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcIklOU0VSVFwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyNlwiLCAvL1JDIDMxMTAwMjI2IDogTmHEjXRlbsOtIGRhdFxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgICAgICBjYW5FeGVjdXRlOiAoZXYpID0+IHsgcmV0dXJuIGV2LnRhcmdldC50YWdOYW1lICE9PSBcIklOUFVUXCI7IH0sXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuaW5zQWN0XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMTgxXCIsIC8vUkMgMzExMDAxODEgOiBWecSNaXN0aXRcclxuICAgICAgICAgICAgICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5UYXNrLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmNsZWFyRmlsdGVyUm93QWN0XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiMVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIxOFwiLCAvL1JDIDMxMTAwMjE4IDogUMWZZWRjaG96w60gZmlsdHJcclxuICAgICAgICAgICAgICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5UYXNrLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLnByZXZGaWx0ZXJBY3RcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogXCIwXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjI4XCIsIC8vUkMgMzExMDAyMjggOiBWecSNaXN0aXQgYSBuYcSNw61zdFxyXG4gICAgICAgICAgICAgICAgY2FuRXhlY3V0ZTogKGV2KSA9PiB7IHJldHVybiBldi50YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiOyB9LFxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuY2xlYXJBbmRGaWx0ZXJBY3RcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBncmlkLmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiY3RybCtzaGlmdCtsY2xpY2tcIixcclxuICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyOVwiLCAvL1JDIDMxMTAwMjI5IDogUMWZZW5lc2Vuw60gaG9kbm90eSBkbyBmaWx0cnUuXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuc2VsRmlsdGVyQWN0XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZ3JpZC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcImN0cmwrbGNsaWNrXCIsXHJcbiAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuR3JpZCxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMzVcIiwgLy9SQyAzMTEwMDIzNSA6IFDFmWVuZXNlbsOtIGhvZG5vdHkgZG8gZmlsdHJ1IGEgdnlobGVkw6Fuw60uXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuc2VsRmlsdGVyQW5kU2VhcmNoQWN0XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZ3JpZC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBbXCIuXCIsIFwiLFwiXSxcclxuICAgICAgICAgICAgICAgIC8vTk9URTogRGVzY3JpcHRpb24gb3BzYW5vIHogbmFwb3ZlZHkgayBUSyBVQ1JcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMjdcIiwgLy9SQyAzMTEwMDIyNyA6IFpvYnJhemVuw60gdsWhZWNoIHrDoXBpc8WvIGRva2xhZMWvIChjZWzDvSBkb2tsYWQpIG5hZCBvem5hxI1lbsO9bSB6w6FwaXNlbS5cclxuICAgICAgICAgICAgICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmRvdEFjdFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9OZXphcmF6ZW5lX3phcGlzeVxyXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9QcmV1Y3RvdmFuaV9zdGF2eVxyXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5EYW5vdmFFdmlkZW5jZVphcGlzXHJcbiAgICAgICAgICAgICAgICB8fCB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlJvenBvY2V0WmFwaXMpIHtcclxuICAgICAgICAgICAgICAgIC8vZ3JpZC5nc2hvcnRjdXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBncmlkLmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcImN0cmwrLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjc5XCIsIC8vUkMgMzExMDAyNzkgOiBGaWx0cm92YXQgemEgcGlkIGRsZSBvem5hxI1lbsOpaG8gxZnDoWRrdS5cclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuZmlsdGVyUGlkQWN0XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBncmlkLmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIi1cIixcclxuICAgICAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuR3JpZCxcclxuICAgICAgICAgICAgICAgICAgICBjYW5FeGVjdXRlOiAoZXYpID0+IHsgcmV0dXJuIGV2LnRhcmdldC50YWdOYW1lICE9PSBcIklOUFVUXCI7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIzMVwiLCAvL1JDIDMxMTAwMjMxIDogRG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5zaERva2xhZHlBY3RcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGdyaWQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiK1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMTI0XCIsIC8vUkMgMzExMDAxMjQgOiBaw6FwaXN5XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLnNoWmFwaXN5QWN0XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gUHJldmlldyB2IHNpZGViYXJ1XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlR5cFVsb2h5ICE9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlByaW1hcm5pUG96YWRhdmt5WmFwaXMgJiYgdGhpcy5UeXBVbG9oeSAhPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5CYWxhbmNvdmFuaVphcGlzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHR5cFVsb2h5ID0gdGhpcy5UeXBVbG9oeTtcclxuICAgICAgICAgICAgICAgIC8vaWYgKHRoaXMuVHlwVWxvaHkgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9OZXphcmF6ZW5lX3phcGlzeSlcclxuICAgICAgICAgICAgICAgIC8vICAgIHR5cFVsb2h5ID0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuZ3NpZGViYXIoXCJvcHRpb25cIiwgXCJyaWdodFwiLCB7IHVzZXJTZXR0aW5nczogdGhpcy51c2VyU2V0dGluZ3MhLCB3aWR0aDogNTAwLCB2aXNpYmxlOiBmYWxzZSwvKiBwaW5uZWQ6IGZhbHNlLCBsZWFmc0F1dG9IaWRlOiBmYWxzZSovIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2aWV3Q29udHJvbGxlciA9IG5ldyBHb3JkaWMuUHJldmlld3MuR1ByZXZpZXdDb250cm9sbGVyPElHU2V6bmFtWmFwaXN1U3RhdnVEdG9XaXRoVGFiU2V0dGluZ3M+KHRoaXMuZWxlbWVudCwge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZVN1YnRhc2s6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhbmVsT3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyMTdcIiwgLy9SQyAzMTEwMDIxNyA6IE7DoWhsZWQgZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlOiBcInJpZ2h0XCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDIxN1wiLCAvL1JDIDMxMTAwMjE3IDogTsOhaGxlZCBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUxvYWQ6ICh0YWIsIGR0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVsbSA9ICQoXCI8ZGl2PlwiKS5nY29udGVudChHb3JkaWMuVWNyLldlYkNsaWVudC5HRGV0YWlsU3RhdlphcGlzUmFka3UsIHsgcGFyZW50Q29udGVudDogdGhpcyB9KTsgLy9OdXRuZSBwcm8gc3ByYXZuZSBzcG9qZW5pIHMga29udGV4dGVtIGhsYXZuaWhvIGNvbnRlbnR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGFiU2V0dGluZ3MgPSBkdG8udGFiU2V0dGluZ3M7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgZHRvLnRhYlNldHRpbmdzO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGFiKS5lbXB0eSgpLmFwcGVuZChlbG0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuY29udGVudDxHRGV0YWlsU3RhdlphcGlzUmFka3U+KGVsbSkuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwVWxvaHk6IHR5cFVsb2h5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcjogdGhpcy5nZXRaYXBpc0ZpbHRlcigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogZHRvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdNb2RlOiBcInByZXZpZXdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJTZXR0aW5nczogdGFiU2V0dGluZ3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Z1U2V0U29ydGVkOiB0aGF0LmNmdVNldFNvcnRlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy90aGlzLnByZXZpZXdDb250cm9sbGVyLnJlZ2lzdGVyUGFuZWwoe1xyXG4gICAgICAgICAgICAvLyAgICBpZDogXCJwcmV2aWV3RGV0YWlsXCIsXHJcbiAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwianJlczozMTEwMDIxN1wiLCAvL1JDIDMxMTAwMjE3IDogTsOhaGxlZCBkZXRhaWx1XHJcbiAgICAgICAgICAgIC8vICAgIHNpZGU6IFwicmlnaHRcIlxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX05lemFyYXplbmVfemFwaXN5KXtcclxuICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJhcHBseVwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdWNzOiB7IHN0YXJ0OiB0aGlzLkdsb2JhbHMuRWtvUGFyYW1zPy5VQ1MsIGVuZDogdGhpcy5HbG9iYWxzLkVrb1BhcmFtcz8uVUNTIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5BdXRvTG9hZERhdGEpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZyYWNpIG9iamVrdCBncmlkdVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0R3JpZCgpOiBKUXVlcnk8SFRNTEVsZW1lbnQ+IHwgbnVsbCB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5lbGVtZW50LmZpbmQoXCIuXCIgKyB0aGlzLmNsYXNzR3JpZCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0YS5sZW5ndGggPT0gMCA/IG51bGwgOiBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bz4ge1xyXG4gICAgICAgICAgICB2YXIgZ2YgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdCA8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvPiAoKTtcclxuICAgICAgICAgICAgLy92YXIgdG9wb0dyb3VwID0gXCJ0b3BvXCI7XHJcblxyXG4gICAgICAgICAgICBnZi5hZGRTdHJ1Y3R1cmVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkb2tsYWR5XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyMzFcIiwgLy9SQyAzMTEwMDIzMSA6IERva2xhZHlcclxuICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICBncm91cGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9wcmVzZXRDYXB0aW9uOiBcImpyZXM6MzExMDAyMzFcIiwgLy9SQyAzMTEwMDIzMSA6IERva2xhZHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBpbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc2g6IChtZXRhLCByb3dzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGQgPSBtZXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2QuYWN9fCR7ZC5tZXNpY318JHtkLnJva318JHtkLmxpY318JHtkLmljb318JHtkLnVjc31gOyAvL05PVEU6IFByaWRhdCBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJhY1wiKSwgdSB2c2VjaCB0ZWNodG8gc2xvdXBjdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvcnQ6IFwicm9rLGxpYyxpY28sdWNzLG1lc2ljLGFjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlQ29sdW1uOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuVHlwVWxvaHkgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvWmFwaXMgfHwgdGhpcy5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpc3lWc2UpIHtcclxuICAgICAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF0dXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyNzhcIiwgLy9SQyAzMDI1MDI3OCA6IFN0YXR1c1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKHJvdywgbWV0YSwgY2VsbEluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobWV0YT8uX2lzU3VtbWFyeSkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cuc3RhdHVzID09PSBudWxsIHx8IHJvdy5zdGF0dXMgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk9LXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk5cIjsgXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RhdHVzKHsgbW9kZWw6IFwic3RhdHVzXCIsIGNhcHRpb246IFwianJlczozMDI1MDI5MlwiIH0pIC8vUkMgMzAyNTAyOTIgOiBTdGF0dXNcclxuICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7IG5hbWU6IFwic3RhdHVzXCIsIG1vZGVsOiBcInN0YXR1c1wiIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLlNhbGRva29udG9QYXJhbTEhLnRyaW0oKSAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbHVlMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMSEudHJpbSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbmFtZTogXCJ2YWx1ZTBcIiwgbW9kZWw6IFwidmFsdWUwXCIsIGNhcHRpb246IHRoaXMuZ2xvYmFscy5TYWxkb2tvbnRvUGFyYW0xLnRyaW0oKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5TYWxkb2tvbnRvUGFyYW0yIS50cmltKCkgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWx1ZTFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5nbG9iYWxzLlNhbGRva29udG9QYXJhbTIhLnRyaW0oKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG5hbWU6IFwidmFsdWUxXCIsIG1vZGVsOiBcInZhbHVlMVwiLCBjYXB0aW9uOiB0aGlzLmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMi50cmltKCkgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMubmtzKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlByaW1hcm5pUG96YWRhdmt5WmFwaXMgfHwgdGhpcy5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkJhbGFuY292YW5pWmFwaXMgfHwgKHRoaXMuVHlwVWxvaHkgIT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRGFub3ZhRXZpZGVuY2VaYXBpcyAmJiB0aGlzLlR5cFVsb2h5ICE9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9cclxuICAgICAgICAgICAgICAgICYmIHRoaXMuVHlwVWxvaHkgIT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250b1phcGlzICYmIHRoaXMuVHlwVWxvaHkgIT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250b1phcGlzeVZzZVxyXG4gICAgICAgICAgICApKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2xvYmFscy5SZXppbVByb3ZvenUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuTktTOiBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuVUNTOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMubmtzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLm5rcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5JQ086XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJ1Y3NcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmljbywgYWt0UHJvaGw6IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuYWt0UHJvaGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG9ubHlBY3RpdmU6IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3Mub25seUFjdGl2ZSwgY2FwdGlvbjogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5jYXB0aW9uLCBuYW1lOiBcInVjc1wiLCBmaXJzdEZpZWxkOiB1bmRlZmluZWQsIHNlY29uZEZpZWxkOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcInVjc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkaXNhYmxlZDogISEodGhpcy5SYWRla19EUEgpICYmICEhdGhpcy5GaWx0ZXIudWNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkF2b2lkVXVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1dXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuVXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLnV1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51dXNJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5pY28sIHVjczogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy51Y3MsIGFrdFByb2hsOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmFrdFByb2hsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgb25seUFjdGl2ZTogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5vbmx5QWN0aXZlLCBjYXB0aW9uOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmNhcHRpb24sIG5hbWU6IFwidXVzXCIsIGZpcnN0RmllbGQ6IHVuZGVmaW5lZCwgc2Vjb25kRmllbGQ6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcInV1c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKSAmJiAhIXRoaXMuRmlsdGVyLnVjc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Bdm9pZE5rcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMubmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5TT1I6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpY29cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5JY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5JY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcImljb1wiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogdGhpcy5FeHRlcm5pU3VtYXJpemFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gR29yZGljLkVrby5GaWx0ZXJzLnJhckludGVydmFsKHsgbW9kZWw6IFwiaWNvXCIsIG9ubHlBY3RpdmU6IGZhbHNlLCBjYXB0aW9uOiB0aGlzLnprcmF0a3kuSWNvLCBkaXNhYmxlZDogISEodGhpcy5SYWRla19EUEgpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBHb3JkaWMuRWtvLkZpbHRlcnMuaWNvSW50ZXJ2YWwoeyBtb2RlbDogXCJpY29cIiwgb25seUFjdGl2ZTogZmFsc2UsIGNhcHRpb246IHRoaXMuemtyYXRreS5JY28sIGRpc2FibGVkOiAhISh0aGlzLlJhZGVrX0RQSCkgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5Bdm9pZEV4dCB8fCB0aGlzLmdsb2JhbHMuVHlwU3VtYXJpemFjZSAhPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cFN1bWFyaXphY2UuRXh0ZXJuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcInVjc1wiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudWNzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuaWNvLCBha3RQcm9obDogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5ha3RQcm9obFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG9ubHlBY3RpdmU6IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3Mub25seUFjdGl2ZSwgY2FwdGlvbjogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5jYXB0aW9uLCBuYW1lOiBcInVjc1wiLCBmaXJzdEZpZWxkOiB1bmRlZmluZWQsIHNlY29uZEZpZWxkOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJ1Y3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiAhISh0aGlzLlJhZGVrX0RQSCkgJiYgISF0aGlzLkZpbHRlci51Y3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkF2b2lkVXVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuVXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnV1c0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy51dXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnV1c0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5pY28sIHVjczogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy51Y3MsIGFrdFByb2hsOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmFrdFByb2hsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG9ubHlBY3RpdmU6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMub25seUFjdGl2ZSwgY2FwdGlvbjogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5jYXB0aW9uLCBuYW1lOiBcInV1c1wiLCBmaXJzdEZpZWxkOiB1bmRlZmluZWQsIHNlY29uZEZpZWxkOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwidXVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKSAmJiAhIXRoaXMuRmlsdGVyLnVjc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Bdm9pZE5rcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMubmtzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLm5rcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZHJkU2VydmVyRmlsdGVyID0gR29yZGljLkVrby5GaWx0ZXJzLmRyZCh0aGlzLmZpbHRlck9wdGlvbnMuZHJkKTtcclxuICAgICAgICAgICAgLy8gcHJvIGJhbGFuY292YW5pIG5lbmkgemFkbnkgZmlsdGVyXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQmFsYW5jb3ZhbmlaYXBpcylcclxuICAgICAgICAgICAgICAgIGRyZFNlcnZlckZpbHRlciA9IHVuZGVmaW5lZCBhcyBhbnk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlR5cFVsb2h5ICE9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG8pXHJcbiAgICAgICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZHJkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDUyIFwiLCAvL1JDIDMxMTAwMDUyIDogSFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAxMDJcIiwgLy9SQyAzMTEwMDEwMiA6IERydWggZG9rbGFkdSAoRFJEKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdG9vbHRpcFRlbXBsYXRlOiBcImpyZXM6MzExMDAxMDJcIiwgLy9SQyAzMTEwMDEwMiA6IERydWggZG9rbGFkdSAoRFJEKVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IGRyZFNlcnZlckZpbHRlci8vR29yZGljLkVrby5GaWx0ZXJzLmRyZCh0aGlzLmZpbHRlck9wdGlvbnMuZHJkKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUHJpbWFybmlQb3phZGF2a3laYXBpcyB8fCB0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQmFsYW5jb3ZhbmlaYXBpcyB8fCB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkRhbm92YUV2aWRlbmNlWmFwaXMpIHtcclxuICAgICAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxMDAgXCIsIC8vUkMgMzAyNTAxMDAgOiBSb2tcclxuICAgICAgICAgICAgICAgICAgICAvL2Rlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAwMTFcIiwgLy9SQyAzMTEwMDAxMSA6IE3Em3PDrWNcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJtZXNpY1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcInJva1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxMDBcIiwgZGlzYWJsZWQ6ICEhKHRoaXMuRmlsdGVyICYmIHRoaXMuU3RyaWN0RmlsdGVyICYmIHRoaXMuRmlsdGVyLnJvaykgfSkgLy9SQyAzMDI1MDEwMCA6IFJva1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuVHlwVWxvaHkgIT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250bylcclxuICAgICAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1MSBcIiwgLy9SQyAzMTEwMDA1MSA6IE1cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMDExXCIsIC8vUkMgMzExMDAwMTEgOiBNxJtzw61jXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcIm1lc2ljXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1lc2ljXCIsIGNhcHRpb246IFwianJlczozMTEwMDA1MVwiLCAvL1JDIDMxMTAwMDUxIDogTVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogISEodGhpcy5GaWx0ZXIgJiYgdGhpcy5TdHJpY3RGaWx0ZXIgJiYgdGhpcy5GaWx0ZXIubWVzaWMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiAgeyBtaW5WYWx1ZTogMSwgbWF4VmFsdWU6IDEzLCBhbGxvd2VkQ2hhcnM6IFwiMDEyMzQ1Njc4OVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZEZpZWxkOiB7IG1pblZhbHVlOiAxLCBtYXhWYWx1ZTogMTMsIGFsbG93ZWRDaGFyczogXCIwMTIzNDU2Nzg5XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KSBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuWmFwaXNvdmEpIHtcclxuICAgICAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTMgXCIsIC8vUkMgMzExMDAwNTMgOiBEXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDEzMFwiLCAvL1JDIDMxMTAwMTMwIDogRGVuXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImRlblwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTNcIiwgLy9SQyAzMTEwMDA1MyA6IERcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICEhKHRoaXMuRmlsdGVyICYmIHRoaXMuU3RyaWN0RmlsdGVyICYmIHRoaXMuRmlsdGVyLmRlbiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RmllbGQ6ICB7IG1pblZhbHVlOiAxLCBtYXhWYWx1ZTogMzEsIGFsbG93ZWRDaGFyczogXCIwMTIzNDU2Nzg5XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kRmllbGQ6IHsgbWluVmFsdWU6IDEsIG1heFZhbHVlOiAzMSwgYWxsb3dlZENoYXJzOiBcIjAxMjM0NTY3ODlcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTElDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJsaWNcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8vL3NlcnZlckZpbHRlcjogLy9UT0RPXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL05PVEU6IFphdGltIG5lbmkgcG90cmVibmVcclxuICAgICAgICAgICAgICAgIC8vdmFyIG1heCA9IDBcclxuICAgICAgICAgICAgICAgIC8vc3dpdGNoICh0aGlzLlR5cFVsb2h5KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXNlIFwiVWNldG5pY3R2aVphcGlzXCI6IG1heCA9IHRoaXMuZ2xvYmFscy5EZWxrYUFjVWN0OyBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhc2UgXCJSb3pwb2NldFphcGlzXCI6IG1heCA9IHRoaXMuZ2xvYmFscy5EZWxrYUFjUm96OyBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vICAgIGRlZmF1bHQ6IG1heCA9IHRoaXMuZ2xvYmFscy5EZWxrYUFjTWF4OyBicmVhaztcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuVHlwVWxvaHkgIT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUHJpbWFybmlQb3phZGF2a3laYXBpcyAmJiB0aGlzLlR5cFVsb2h5ICE9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkJhbGFuY292YW5pWmFwaXMpXHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU0XCIsIC8vUkMgMzExMDAwNTQgOiBEb2tsYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJhY1wiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuYWNJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMuYWMpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwZG9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU1XCIsIC8vUkMgMzExMDAwNTUgOiBTdHJ1a3R1cm92YW7DvSBwb3BpcyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLCAgICAgICAgICAgLy9OT1RFOiBWIFRLIG1hamkgc2tyeXRvLCBieXZhIHZpZGV0IHBvbGUgJ3BvcGlzJywga2RlIGplIHN0ZWpueSBwcmVmYWJcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ1NpbmdsZSh7IG1vZGVsOiBcInBkb2tcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU1XCIgfSkgLy9SQyAzMTEwMDA1NSA6IFN0cnVrdHVyb3ZhbsO9IHBvcGlzIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgY2Z1SW50ZXJ2YWxPcHRpb25zOiBHb3JkaWMuRWtvLkNmdVV0aWxzLklHQ2Z1RmlsdGVyT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIGlzUm96OiB0aGlzLlJvenBvY2V0LFxyXG4gICAgICAgICAgICAgICAgaXNVY3Q6IHRoaXMuVWNldG5pY3R2aSxcclxuICAgICAgICAgICAgICAgIGNoZWNrVWV0ZTogdGhpcy5la29QYXJhbXMuQ2hlY2tVZXRlLFxyXG4gICAgICAgICAgICAgICAgd2lsZGNhcmQ6IHRoaXMuR2xvYmFscy5PdGhlcnM/LldpbGRjYXJkLFxyXG4gICAgICAgICAgICAgICAgZ2V0SW50ZXJ2YWxPcHRpb25zOiAoZHRvLCBvcHRzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkZpbHRlciB8fCAhdGhpcy5TdHJpY3RGaWx0ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRzO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuZGlzYWJsZWQgPSAhISF0aGlzLkZpbHRlcltkdG8ubmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250bykge1xyXG4gICAgICAgICAgICAgICAgLy8gTW9kaWZpa292YW5lIFN1IGEgQXVcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tb2RpZnlDZnUuY29sdW1ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGMgPSB0aGlzLm1vZGlmeUNmdS5jb2x1bW5zW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYy5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBjLmNhcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBjLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogYy53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuY2Z1SW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Z1OiBjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSb3o6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNVY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYCR7Yy5uYW1lfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbW9kZWw6IGAke2MubmFtZX1fcmVnYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRTb3J0ZWRFa29DZnVTZXQoR29yZGljLkVrby5DZnVVdGlscy5nZXRDZnVTZXRTZXJ2ZXJGaWx0ZXJzKHRoaXMsIGNmdUludGVydmFsT3B0aW9ucykpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuVHlwVWxvaHkgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLlNhbGRva29udG9QYXJhbTEhLnRyaW0oKSAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbHVlMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMSEudHJpbSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG5hbWU6IFwidmFsdWUwXCIsIG1vZGVsOiBcInZhbHVlMFwiLCBjYXB0aW9uOiB0aGlzLmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMSEudHJpbSgpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLlNhbGRva29udG9QYXJhbTIhLnRyaW0oKSAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbHVlMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMiEudHJpbSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG5hbWU6IFwidmFsdWUxXCIsIG1vZGVsOiBcInZhbHVlMVwiLCBjYXB0aW9uOiB0aGlzLmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMiEudHJpbSgpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuWmFwaXNvdmEpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQmFsYW5jb3ZhbmlaYXBpcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDVcIiwgLy9SQyAzMDI1MDE0NSA6IE1EIHDFr3YuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAxNDVcIiwgLy9SQyAzMTEwMDI0MyA6IE3DoSBEw6F0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDVcIiB9KSAvL1JDIDMwMjUwMTQ1IDogTUQgcMWvdi5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBfbmV3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE0NlwiLCAvL1JDIDMwMjUwMTQ2IDogTUQgbm92w6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDE0NlwiLCAvL1JDIDMxMTAwMjQzIDogTcOhIETDoXRpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwX25ld1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDZcIiB9KSAvL1JDIDMwMjUwMTQ2IDogTUQgbm92w6lcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBjMF9wcm9jXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE0N1wiLCAvL1JDIDMwMjUwMTQ3IDogICVcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDE0N1wiLCAvL1JDIDMxMTAwMjQzIDogTcOhIETDoXRpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDZcIiB9KSAvL1JDIDMwMjUwMTQ2IDogTUQgbm92w6lcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTQ4XCIsIC8vUkMgMzAyNTAxNDkgOiBEYWwgbm92w6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDE0OFwiLCAvL1JDIDMxMTAwMjQzIDogTcOhIETDoXRpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMxXCIsIGNhcHRpb246IFwianJlczozMDI1MDE0OFwiIH0pIC8vUkMgMzAyNTAxNDYgOiBNRCBub3bDqVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMV9uZXdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTQ5XCIsIC8vUkMgMzAyNTAxNDkgOiBEYWwgbm92w6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDE0OVwiLCAvL1JDIDMwMjUwMTQ5IDogRGFsIG5vdsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMxX25ld1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDlcIiB9KSAvL1JDIDMwMjUwMTQ5IDogRGFsIG5vdsOpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMxYzFfcHJvY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDdcIiwgLy9SQyAzMDI1MDE0NyA6ICAlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAxNDdcIiwgLy9SQyAzMTEwMDI0MyA6IE3DoSBEw6F0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTQ2XCIgfSkgLy9SQyAzMDI1MDE0NiA6IE1EIG5vdsOpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMwYzFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTUwXCIsIC8vUkMgMzAyNTAxNTAgOiBNRCBwxa92LiAtIERhbCBwxa92LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMTUwXCIsIC8vUkMgMzAyNTAxNTAgOiBNRCBwxa92LiAtIERhbCBwxa92LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRoaXMuZ2xvYmFscy5SYWRfWm9icmF6TWREYWwhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMGMxXCIsIGNhcHRpb246IFwianJlczozMDI1MDE1MFwiIH0pIC8vUkMgMzAyNTAxNTAgOiBNRCBwxa92LiAtIERhbCBwxa92LlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMGMxX25ld1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNTFcIiwgLy9SQyAzMDI1MDE1MSA6ICBNRCBub3bDqSAtIERhbCBub3bDqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMTUxXCIsIC8vUkMgMzAyNTAxNTEgOiAgTUQgbm92w6kgLSBEYWwgbm92w6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB0aGlzLmdsb2JhbHMuUmFkX1pvYnJhek1kRGFsISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBjMV9uZXdcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTUxXCIgfSkgLy9SQyAzMDI1MDE1MSA6ICBNRCBub3bDqSAtIERhbCBub3bDqVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTZcIiwgLy9SQyAzMTEwMDA1NiA6IE1EXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNDNcIiwgLy9SQyAzMTEwMDI0MyA6IE3DoSBEw6F0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMFwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTZcIiB9KSAvL1JDIDMxMTAwMDU2IDogTURcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU3XCIsIC8vUkMgMzExMDAwNTcgOiBEYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzFcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU3XCIgfSkgLy9SQyAzMTEwMDA1NyA6IERhbFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMGMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA5MFwiLCAvL1JDIDMxMTAwMDkwIDogTUQtRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNDRcIiwgLy9SQyAzMTEwMDI0NCA6IE3DoSBEw6F0aSAtIERhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW46ICF0aGlzLmdsb2JhbHMuUmFkX1pvYnJhek1kRGFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMGMxXCIsIGNhcHRpb246IFwianJlczozMTEwMDA5MFwiIH0pIC8vUkMgMzExMDAwOTAgOiBNRC1EYWxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvWmFwaXMgfHwgdGhpcy5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpc3lWc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMGMxX2FzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyNzlcIiwgLy9SQyAzMDI1MDI3OSA6IE5ldnlyb3Zuw6Fub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjQ0XCIsIC8vUkMgMzExMDAyNDQgOiBNw6EgRMOhdGkgLSBEYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW46ICF0aGlzLmdsb2JhbHMuUmFkX1pvYnJhek1kRGFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMGMxX2FzXCIsIGNhcHRpb246IFwianJlczozMDI1MDI4MFwiIH0pIC8vUkMgMzAyNTAyODAgOiBOZXZ5cm92bsOhbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpU3Rhdikge1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTlcIiwgLy9SQyAzMTEwMDA1OSA6IE1PIE1EXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNDVcIiwgLy9SQyAzMTEwMDI0NSA6IE3Em3PDrcSNbsOtIG9icmF0IE3DoSBEw6F0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMFwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTlcIiB9KSAgLy9SQyAzMTEwMDA1OSA6IE1PIE1EXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA2MFwiLCAvL1JDIDMxMTAwMDYwIDogTU8gRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNDZcIiwgLy9SQyAzMTEwMDI0NiA6IE3Em3PDrcSNbsOtIG9icmF0IERhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMVwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNjBcIiB9KSAgLy9SQyAzMTEwMDA2MCA6IE1PIERhbFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMGMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA2MVwiLCAvL1JDIDMxMTAwMDYxIDogTU8gTUQgLSBEYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI0N1wiLCAvL1JDIDMxMTAwMjQ3IDogUm96ZMOtbCDEjcOhc3RlayBNxJtzw63EjW7DrSBvYnJhdCBNw6EgRMOhdGkgbcOtbnVzIE3Em3PDrcSNbsOtIG9icmF0IERhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW46ICF0aGlzLmdsb2JhbHMuUmFkX1pvYnJhek1kRGFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMGMxXCIsIGNhcHRpb246IFwianJlczozMTEwMDA2MVwiIH0pIC8vUkMgMzExMDAwNjEgOiBNTyBNRCAtIERhbFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMF9hc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNjJcIiwgLy9SQyAzMTEwMDA2MiA6IEFTIE1EXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNDhcIiwgLy9SQyAzMTEwMDI0OCA6IEFrdHXDoWxuw60gc3RhdiBNw6EgRMOhdGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBfYXNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDYyXCIgfSkgLy9SQyAzMTEwMDA2MiA6IEFTIE1EXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMxX2FzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA2M1wiLCAvL1JDIDMxMTAwMDYzIDogQVMgRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNDlcIiwgLy9SQyAzMTEwMDI0OSA6IEFrdHXDoWxuw60gc3RhdiBEYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzFfYXNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDYzXCIgfSkgLy9SQyAzMTEwMDA2MyA6IEFTIERhbFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMGMxX2FzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA3MFwiLCAvL1JDIDMxMTAwMDcwIDogQVMgTUQgLSBEYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiAhdGhpcy5nbG9iYWxzLlJhZF9ab2JyYXpNZERhbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBjMV9hc1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzBcIiB9KSAgLy9SQyAzMTEwMDA3MCA6IEFTIE1EIC0gRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG8pIHtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDI4MlwiLCAvL1JDIDMwMjUwMjgyIDogSUQgRVNVXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1M1wiLCAvL1JDIDMxMTAwMjUzIDogScSMTyBFeHRlcm7DrWhvIHN1Ympla3R1IHByaW3DoXJuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLlVjci5XZWJDbGllbnQuRmlsdGVyUHJlZmFicy5lc3VfaXhzKHsgbW9kZWw6IFwiaXhzX2VzdVwiLCBpeHNfZXN1UGF0aDogXCJfZXN1X2l4c1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAyODJcIiB9KSAvL1JDIDMwMjUwMjgyIDogSUQgRVNVXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nU2luZ2xlKHsgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjgyXCIsIG1vZGVsOiBcIml4c19lc3VcIiB9KSAvL1JDIDMwMjUwMjgyIDogSUQgRVNVXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXN1X2ljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwODBcIiArIFwiIFwiICsgdGhpcy56a3JhdGt5LkljbywgIC8vUkMgMzExMDAwODAgOiBFU1VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1M1wiLCAvL1JDIDMxMTAwMjUzIDogScSMTyBFeHRlcm7DrWhvIHN1Ympla3R1IHByaW3DoXJuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuVWNyLldlYkNsaWVudC5GaWx0ZXJQcmVmYWJzLmVzdV9pY28oeyBtb2RlbDogXCJlc3VfaWNvXCIsIGl4c19lc3VQYXRoOiBcIl9lc3VfaWNvX2l4c1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwODBcIiArIFwiIFwiICsgdGhpcy56a3JhdGt5LkljbyB9KSAvL1JDIDMxMTAwMDgwIDogRVNVXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXN1X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwODBcIiwgLy9SQyAzMTEwMDA4MCA6IEVTVVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjUyXCIsIC8vUkMgMzExMDAyNTIgOiBFeHRlcm7DrSBzdWJqZWt0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLlVjci5XZWJDbGllbnQuRmlsdGVyUHJlZmFicy5lc3VfdHh0KHsgbW9kZWw6IFwiZXN1X3R4dFwiLCBpeHNfZXN1UGF0aDogXCJfZXN1X3R4dF9peHNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgwXCIgfSkgIC8vUkMgMzExMDAwODAgOiBFU1VcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gTktTXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlTlMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMubmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBNb2RpZmlrb3ZhbmUgb3JqXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlT1JKKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMud29kck9yai5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy53b2RyT3JqLmNhcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy53b2RyT3JqLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMud29kck9yai53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmNmdUludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZnU6IHRoaXMud29kck9yaixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JvejogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNVY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGAke3RoaXMud29kck9yai5uYW1lfWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL21vZGVsOiBgJHtjLm5hbWV9X3JlZ2BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIE1vZGlmaWtvdmFuZSBvcmdcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VPUkcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy53b2RyT3JnLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLndvZHJPcmcuY2FwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLndvZHJPcmcuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy53b2RyT3JnLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuY2Z1SW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNmdTogdGhpcy53b2RyT3JnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUm96OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1VjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogYCR7dGhpcy53b2RyT3JnLm5hbWV9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbW9kZWw6IGAke2MubmFtZX1fcmVnYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyNzBcIiwgLy9SQyAzMDI1MDI3MCA6IE1EXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwXCIsIGNhcHRpb246IFwianJlczozMDI1MDI3MFwiIH0pICAvL1JDIDMwMjUwMjcwIDogTURcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjcxXCIsIC8vUkMgMzAyNTAyNzEgOiBEYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzFcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjcxXCIgfSkgLy9SQyAzMDI1MDI3MSA6IERhbFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMGMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDI3MlwiLCAvL1JDIDMwMjUwMjcyIDogTUQgLSBEYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiAhdGhpcy5nbG9iYWxzLlJhZF9ab2JyYXpNZERhbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBjMVwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAyNzJcIiB9KSAvL1JDIDMwMjUwMjcyIDogTUQgLSBEYWxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHsgLy9Sb3pwb2NldFN0YXZcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDY1XCIsIC8vUkMgMzExMDAwNjUgOiBNTyBQxZnDrWptxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDY1XCIgfSkgIC8vUkMgMzExMDAwNjUgOiBNTyBQxZnDrWptxa9cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDY2XCIsIC8vUkMgMzExMDAwNjYgOiBNTyBWw71kYWrFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMVwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNjZcIiB9KSAvL1JDIDMxMTAwMDY2IDogTU8gVsO9ZGFqxa9cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNjdcIiwgLy9SQyAzMTEwMDA2NyA6IE1PIFAtVlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW46ICF0aGlzLmdsb2JhbHMuUmFkX1pvYnJhek1kRGFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMGMxXCIsIGNhcHRpb246IFwianJlczozMTEwMDA2N1wiIH0pIC8vUkMgMzExMDAwNjcgOiBNTyBQLVZcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBfYXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDY4XCIsIC8vUkMgMzExMDAwNjggOiBBUyBQxZnDrWptxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBfYXNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDY4XCIgfSkgLy9SQyAzMTEwMDA2OCA6IEFTIFDFmcOtam3Fr1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMV9hc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNjlcIiwgLy9SQyAzMTEwMDA2OSA6IEFTIFbDvWRhasWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMxX2FzXCIsIGNhcHRpb246IFwianJlczozMTEwMDA2OVwiIH0pIC8vUkMgMzExMDAwNjkgOiBBUyBWw71kYWrFr1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMGMxX2FzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA3MFwiLCAvL1JDIDMxMTAwMDcwIDogQVMgTUQgLSBEYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiAhdGhpcy5nbG9iYWxzLlJhZF9ab2JyYXpNZERhbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBjMV9hc1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzBcIiB9KSAvL1JDIDMxMTAwMDcwIDogQVMgTUQgLSBEYWxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuWmFwaXNvdmEpXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDcxXCIsIC8vUkMgMzExMDAwNzEgOiBQb3BpcyDFmcOhZGt1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdTaW5nbGUoeyBtb2RlbDogXCJwb3Bpc1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzFcIiB9KSAvL1JDIDMxMTAwMDcxIDogUG9waXMgxZnDoWRrdVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfTmV6YXJhemVuZV96YXBpc3lcclxuICAgICAgICAgICAgICAgIHx8IHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfUHJldWN0b3Zhbmlfc3RhdnlcclxuICAgICAgICAgICAgICAgIHx8IHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRmluYW5jb3ZhbmlaYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5EYW5vdmFFdmlkZW5jZVphcGlzXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva191ZWpcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzJcIiwgLy9SQyAzMTEwMDA3MiA6IFJvayBEUEhcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjU4XCIsIC8vUkMgMzExMDAyNTggOiBSb2sgdXNrdXRlxI1uxJtuw60gemRhbml0ZWxuw6lobyBwbG7Em27DrSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInJva191ZWpcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDcyXCIsIGRpc2FibGVkOiB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkRhbm92YUV2aWRlbmNlWmFwaXMgfHwgISEodGhpcy5SYWRla19EUEgpXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pICAvL1JDIDMxMTAwMDcyIDogUm9rIERQSFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNfdWVqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDczXCIsIC8vUkMgMzExMDAwNzMgOiBNxJtzw61jIERQSFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNTdcIiwgLy9SQyAzMTEwMDI1NyA6IE3Em3PDrWMgdXNrdXRlxI1uxJtuw60gemRhbml0ZWxuw6lobyBwbG7Em27DrVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5pbnRlZ2VySW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtZXNpY191ZWogXCIsIGNhcHRpb246IFwianJlczozMTEwMDA3M1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICwgZGlzYWJsZWQ6IHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRGFub3ZhRXZpZGVuY2VaYXBpcyB8fCAhISh0aGlzLlJhZGVrX0RQSClcclxuICAgICAgICAgICAgICAgICAgICB9KSAvL1JDIDMxMTAwMDczIDogTcSbc8OtYyBEUEhcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInpkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc0XCIsIC8vUkMgMzExMDAwNzQgOiBaRFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNTBcIiwgLy9SQyAzMTEwMDI1MCA6IFDFmcOtem5hayBEUEgsIHpkYSBqZSB6w6FwaXMgbmVkYcWIb3bDvSwgesOha2xhZCBkYW7EmywgZGHFiCBhcG9kLlxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0NSxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IGZ1bmN0aW9uIChyb3csIG1ldGEsIGNlbGxJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkZpbHRlcnMuWmRVdGlscy56ZEdldExhYmVsKHJvdy56ZCBhcyBudW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuemRJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInpkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA3NFwiLCAvL1JDIDMxMTAwMDc0IDogWkRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNQcm9Fa29GaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhISh0aGlzLlJhZGVrX0RQSClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlphcGlzb3ZhKSB7XHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA3NVwiLCAvL1JDIDMxMTAwMDc1IDogUElEXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1MVwiLCAvL1JDIDMxMTAwMjUxIDogUHJ2b3Ruw60gaWRlbnRpZmlrw6F0b3IgcHJpbcOhcm7DrWhvIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLml4cCh7IG1vZGVsOiBcIml4cFwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzVcIiB9KSAvL1JDIDMxMTAwMDc1IDogUElEXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2lmICh0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpcykge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJhY19hZ1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA3N1wiLCAvL1JDIDMxMTAwMDc3IDogQWdlbmRvdsOpIMSNw61zbG9cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiYWNfYWdcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc3XCIgfSkgLy9SQyAzMTEwMDA3NyA6IEFnZW5kb3bDqSDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmdsb2JhbHMuRXh0ZXJuaVN1bWFyaXphY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlByaW1hcm5pUG96YWRhdmt5WmFwaXMgfHwgdGhpcy5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkJhbGFuY292YW5pWmFwaXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9yb3pcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE1MlwiLCAvL1JDIDMwMjUwMTUyIDogUElEIFJPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMTUyXCIsIC8vUkMgMzAyNTAxNTIgOiBQSUQgUk9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5peHAoeyBtb2RlbDogXCJpeHBfcm96XCIsIGNhcHRpb246IFwianJlczozMDI1MDE1MlwiIH0pIC8vUkMgMzAyNTAxNTIgOiBQSUQgUk9cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfcHJpbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTUzXCIsIC8vUkMgMzAyNTAxNTMgOiBQSUQgQkxLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMTUzXCIsIC8vUkMgMzAyNTAxNTMgOiBQSUQgQkxLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaXhwKHsgbW9kZWw6IFwiaXhwX3ByaW1cIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTUzXCIgfSkgLy9SQyAzMDI1MDE1MyA6IFBJRCBCTEtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfcHJpbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzZcIiwgIC8vUkMgMzExMDAwNzYgOiBQSUQgcHJpbcOhcm7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsICAgLy9OT1RFOiBWIFRLIGplIHNrcnl0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdTaW5nbGUoeyBtb2RlbDogXCJpeHBfcHJpbVwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzZcIiB9KSAvL1JDIDMxMTAwMDc2IDogUElEIHByaW3DoXJuw61cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbHMuVHlwUHJhY2VXZmwgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY19hZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzdcIiwgLy9SQyAzMTEwMDA3NyA6IEFnZW5kb3bDqSDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiYWNfYWdcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc3XCIgfSkgLy9SQyAzMTEwMDA3NyA6IEFnZW5kb3bDqSDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuVHlwVWxvaHkgIT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5QcmltYXJuaVBvemFkYXZreVphcGlzICYmIHRoaXMuVHlwVWxvaHkgIT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5CYWxhbmNvdmFuaVphcGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlphcGlzb3ZhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjgxXCIsIC8vUkMgMzAyNTAyODEgOiBUeXAgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiBcIntpeHNfdHlwX3R4dDp0cmltOmVuY29kZX1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cGluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJpeHNfdHlwX3R4dFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuVWNyLldlYkNsaWVudC5GaWx0ZXJQcmVmYWJzLnR5cF9hZyh7IG1vZGVsOiBcInR5cF9hZ1wiLCB6a3JfYWdQYXRoOiBcInR5cF9hZ190eHRcIiwgaXNSb3pwb2NldDogdGhpcy5Sb3pwb2NldCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc5XCIgfSkgLy9SQyAzMTEwMDA3OSA6IEFnZW5kYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnNzbFR5cEludGVydmFsKHsgbW9kZWw6IFwiaXhzX3R5cD1peHNfdHlwO2l4c190eXBfdHh0PW5hemV2XCIsIGNhcHRpb246IFwianJlczozMDI1MDI4MVwiIH0pIC8vUkMgMzAyNTAyODEgOiBUeXAgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3NsVHlwSW50ZXJ2YWwoeyBtb2RlbDogXCJpeHNfdHlwXCIsIHprcl9hZ1BhdGg6IFwiaXhzX3R5cF90eHRcIixjYXB0aW9uOiBcImpyZXM6MzAyNTAyODFcIiB9KSAvL1JDIDMwMjUwMjgxIDogVHlwIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2dmLkFkZExvb2t1cENvbHVtbihcIml4c190eXBcIiwgXCJTc2xzdHlwLm5hemV2XCIsIEdSZXNvdXJjZXMuR2V0UmVzb3VyY2VUZXh0KDIxMDUwMTEyKSwgMTUwKTsgLy9SQyAyMTA1MDExMiA6IFR5cCBkb2t1bWVudHVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVphcGlzXHJcbiAgICAgICAgICAgICAgICB8fCB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX05lemFyYXplbmVfemFwaXN5XHJcbiAgICAgICAgICAgICAgICB8fCB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5XHJcbiAgICAgICAgICAgICAgICB8fCB0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRaYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkZpbmFuY292YW5pWmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHRoaXMuVHlwVWxvaHkgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5EYW5vdmFFdmlkZW5jZVphcGlzXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmF6ZXZfcmZcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwOTdcIiwgLy9SQyAzMTEwMDA5NyA6IFptxJtudSBwcm92ZWRsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdTaW5nbGUoeyBtb2RlbDogXCJuYXpldl9yZlwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwOTdcIiB9KSAvL1JDIDMxMTAwMDk3IDogWm3Em251IHByb3ZlZGxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5UeXBVbG9oeSAhPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvKVxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDE1XCIsIC8vUkMgMzExMDAwMTUgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRhdGVJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IHZhbHVlVHlwZTogXCJkYXRldGltZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZEZpZWxkOiB7IHZhbHVlVHlwZTogXCJkYXRldGltZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDAxNVwiIC8vUkMgMzExMDAwMTUgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5aYXBpc292YSlcclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oeyAvL05PVEU6IFYgVEsgamUgdG8gcHJpZGFubyBqYWtvIEFkZExvb2t1cENvbHVtbiEgKGFyZy46IERldGFpbFR5cHVBZ2VuZHkuemtyX2FnKVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX2FnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc5XCIsIC8vUkMgMzExMDAwNzkgOiBBZ2VuZGFcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogXCJ7dHlwX2FnX3R4dDp0cmltOmVuY29kZX1cIixcclxuICAgICAgICAgICAgICAgICAgICBwcmludGFibGU6IFwiI3JlbmRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcInR5cF9hZ190eHRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkZpbHRlclByZWZhYnMudHlwX2FnKHsgbW9kZWw6IFwidHlwX2FnXCIsIHprcl9hZ1BhdGg6IFwidHlwX2FnX3R4dFwiLCBpc1JvenBvY2V0OiB0aGlzLlJvenBvY2V0LCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzlcIiB9KSAvL1JDIDMxMTAwMDc5IDogQWdlbmRhXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9OZXphcmF6ZW5lX3phcGlzeVxyXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9QcmV1Y3RvdmFuaV9zdGF2eVxyXG4gICAgICAgICAgICAgICAgfHwgdGhpcy5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkRhbm92YUV2aWRlbmNlWmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHRoaXMuVHlwVWxvaHkgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvWmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHRoaXMuVHlwVWxvaHkgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvWmFwaXN5VnNlXHJcbiAgICAgICAgICAgICAgICB8fCB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkZpbmFuY292YW5pWmFwaXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbHMuVHlwUHJhY2VFU1UgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JUeXBQcmFjZUVTVS5OZSkgeyB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmdsb2JhbHMuUmV6aW1Qcm92b3p1ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LlNPUiAmJiB0aGlzLmdsb2JhbHMuVHlwU3VtYXJpemFjZSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cFN1bWFyaXphY2UuRXh0ZXJuaSkgeyB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlc3VfdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA4MFwiLCAvL1JDIDMxMTAwMDgwIDogRVNVXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNTJcIiwgLy9SQyAzMTEwMDI1MiA6IEV4dGVybsOtIHN1Ympla3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiB0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250b1phcGlzID8gdW5kZWZpbmVkIDogR29yZGljLlVjci5XZWJDbGllbnQuRmlsdGVyUHJlZmFicy5lc3VfdHh0KHsgbW9kZWw6IFwiZXN1X3R4dFwiLCBpeHNfZXN1UGF0aDogXCJfZXN1X3R4dF9peHNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgwXCIgfSkgIC8vUkMgMzExMDAwODAgOiBFU1VcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXN1X2ljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwODBcIiArIFwiIFwiICsgdGhpcy56a3JhdGt5LkljbywgIC8vUkMgMzExMDAwODAgOiBFU1VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1M1wiLCAvL1JDIDMxMTAwMjUzIDogScSMTyBFeHRlcm7DrWhvIHN1Ympla3R1IHByaW3DoXJuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiB0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250b1phcGlzID8gdW5kZWZpbmVkIDogR29yZGljLlVjci5XZWJDbGllbnQuRmlsdGVyUHJlZmFicy5lc3VfaWNvKHsgbW9kZWw6IFwiZXN1X2ljb1wiLCBpeHNfZXN1UGF0aDogXCJfZXN1X2ljb19peHNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgwXCIgKyBcIiBcIiArIHRoaXMuemtyYXRreS5JY28gfSkgLy9SQyAzMTEwMDA4MCA6IEVTVVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlc3VfcmNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgxXCIsIC8vUkMgMzExMDAwODEgOiBFU1UgUsSMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNTRcIiwgLy9SQyAzMTEwMDI1NCA6IFJvZG7DqSDEjcOtc2xvIEV4dGVybsOtaG8gc3ViamVrdHUgcHJpbcOhcm7DrWhvIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IHRoaXMuVHlwVWxvaHkgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvWmFwaXMgPyB1bmRlZmluZWQgOiBHb3JkaWMuVWNyLldlYkNsaWVudC5GaWx0ZXJQcmVmYWJzLmVzdV9yYyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJlc3VfcmNcIiwgaXhzX2VzdVBhdGg6IFwiX2VzdV90eHRfcmNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgxXCIsIC8vUkMgMzExMDAwODEgOiBFU1UgUsSMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSYWRfRXN1X1JjVnlobDogdGhpcy5nbG9iYWxzLlJhZF9Fc3VfUmNWeWhsIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlByaXpJaXNzcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpaXNzcERpc2FibGUgPSB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5O1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkX2hkcl9yaXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgyXCIsIC8vUkMgMzExMDAwODIgOiBJRCBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjU1XCIsIC8vUkMgMzExMDAyNTUgOiBJZGVudGlmaWvDoXRvciByZXplcnZhY2Ugcm96cG/EjXRvdsO9Y2ggcHJvc3TFmWVka8WvIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaWRfaGRyX3Jpc1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwODJcIiwgZGlzYWJsZWQ6IGlpc3NwRGlzYWJsZSwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDkgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA5IH0gfSkgLy9SQyAzMTEwMDA4MiA6IElEIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWF4TGVuZ3RoOiA5XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyYWRla19oZHJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgzXCIsLy9SQyAzMTEwMDA4MyA6IMWZw6FkZWsgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1NlwiLCAvL1JDIDMxMTAwMjU2IDogxZjDoWRlayByZXplcnZhY2Ugcm96cG/EjXRvdsO9Y2ggcHJvc3TFmWVka8WvIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHsgbW9kZWw6IFwicmFkZWtfaGRyXCIsIGNhcHRpb246IFwianJlczozMTEwMDA4M1wiLCBkaXNhYmxlZDogaWlzc3BEaXNhYmxlIH0pIC8vUkMgMzExMDAwODMgOiDFmcOhZGVrIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNfcHJlcF9haXNwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM0NFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9SQyAzMDI1MDM0NCA6IElJU1NQIFDFmWVwb8SNdGVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzksLy8gZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiY2VudGVyXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zX3ByZXBfYWlzcCE9bnVsbCAmJiBkYXRhLnNfcHJlcF9haXNwID4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiLCB0ZXh0OiBcImpyZXM6MzAyNTAzNDRcIiwgLy9SQyAzMDI1MDM0NCA6IElJU1NQIFDFmWVwb8SNdGVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Rvb2x0aXA6IFwianJlczozMDI1MDI4OFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaWRfaGRyX3JpcyAhPSBudWxsICYmIGRhdGEuaWRfaGRyX3JpcyE9PXVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZXhjbGFtIGctc3RhdGUtZXJyb3JcIiwgdGV4dDogXCJqcmVzOjMwMjUwMzQ1XCIsIC8vUkMgMzAyNTAzNDUgOiBOZXpwcmFjb3bDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9vbHRpcDogXCJqcmVzOjMwMjUwMjg5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9OyAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5hZGRTdHJQb3Bpc0NvbHVtbnMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWRkU3RyUG9waXNDb2x1bW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGMgPSB0aGlzLmFkZFN0clBvcGlzQ29sdW1uc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2FwdGlvbiA9IHRoaXMuZmlsdGVyU3RyUG9waXM/LmZpbmQoKHMpID0+IHsgcmV0dXJuIHMua2xpYyA9PT0gYzsgfSk/LmtsaWNfdHh0ID8/IGM7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMSwgTC0wLTEyLTAsIE0tMC0xMi0wLCBTLTAtMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKGNhcHRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBjIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogY2FwdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiBge3N0cnVrdFBvcGlzLiR7Y30uaG9kbm90YX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZGdldDogXCJnZm9ybWJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogJC5leHRlbmQoR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmdldEZvcm1Cb3hGaWx0ZXJEZWZhdWx0cyh7fSksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHM6IE9iamVjdExpdGVyYWw8c3RyaW5nPikgPT4geyByZXR1cm4gcyAmJiBzW2NdID8gc1tjXSA6IEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5maWx0ZXJFbXB0eVZhbHVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIHY/OiB7IHZhbHVlOiBPYmplY3RMaXRlcmFsPHN0cmluZz4gfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsID0gdj8udmFsdWVbY10gPz8gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZwZGF0YSA9IHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldEN1cnJlbnREYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyU3RyUG9waXMgPSBmcGRhdGE/LmZpbHRlclN0clBvcGlzIGFzIEdTdHJ1a3R1cm92YW55UG9waXNGaWx0ZXJEdG9bXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSBmaWx0ZXJTdHJQb3Bpcz8uZmluZCgocykgPT4geyByZXR1cm4gcy5rbGljID09PSBjOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuaG9kbm90YSA9IHZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIsIGZwZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3AsIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGQgPSBkdG8gYXMgeyBmaWx0ZXJTdHJQb3BpczogR1N0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlckR0b1tdIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRwID0gZD8uZmlsdGVyU3RyUG9waXM/LmZpbHRlcigocykgPT4geyByZXR1cm4gcy5rbGljID09PSBjOyB9KSA/PyBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmcGRhdGEgPSBfdGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJTdHJQb3BpcyA9IGZwZGF0YT8uZmlsdGVyU3RyUG9waXMgYXMgR1N0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlckR0b1tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcCA9IGZpbHRlclN0clBvcGlzPy5maW5kKChzKSA9PiB7IHJldHVybiBzLmtsaWMgPT09IGM7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXApIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vTk9URTogTXVzaW0gc3Jvdm5hdCBob2Rub3R1IGRsZSB0b2hvLCBjbyBtaSBwcmlzbG8gdiBkdG8sIGppbmFrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgbmVmdW5ndWplIG1hemFuaS4gWmFyb3ZlbiBuZWNoY2kgenRyYXRpdCBpbnN0YW5jaSBmaWx0ZXJTdHJQb3Bpcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5ob2Rub3RhID0gZHAubGVuZ3RoID09PSAxID8gZHBbMF0uaG9kbm90YSA6IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgYzogcC5ob2Rub3RhIH0sIHsgdHJpZ2dlckNoYW5nZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkVHJhbnNmb3JtOiAodikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHYgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbFtjXSA9IHY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pIGFzIEdGb3JtQm94T3B0aW9uczxPYmplY3RMaXRlcmFsPHN0cmluZz4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ2YgYXMgYW55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVQcm9maWxlcyhnZjogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bz4pOiBJR1Nlem5hbVphcGlzdVByb2ZpbGVzIHtcclxuICAgICAgICAgICAgbGV0IHByb2ZpbGVzOiBJR1Nlem5hbVphcGlzdVByb2ZpbGVzID0ge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogeyBuYW1lOiBcImpyZXM6MzExMDAyMzJcIiwgY29sdW1uczoge30gfSAvL1JDIDMxMTAwMjMyIDogVsO9Y2hvesOtXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdmLmNvbHVtbnMuZmlsdGVyKChjKSA9PiB7IHJldHVybiAhYy5oaWRkZW47IH0pXHJcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoYykgPT4geyBwcm9maWxlcy5kZWZhdWx0LmNvbHVtbnMhW2MubmFtZSFdID0geyBoaWRkZW46IGZhbHNlIH0gfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5aYXBpc292YSkge1xyXG4gICAgICAgICAgICAgICAgcHJvZmlsZXMuZGVmYXVsdC5uYW1lID0gXCJqcmVzOjMxMTAwMjQxXCI7IC8vUkMgMzExMDAyNDEgOiBaw6FwaXN5ICh2w71jaG96w60pXHJcbiAgICAgICAgICAgICAgICBwcm9maWxlcy5kb2tsYWR5ID0geyBuYW1lOiBcImpyZXM6MzExMDAyMzFcIiwgY29sdW1uczoge30sIGdyb3VwaW5nOiBcImRva2xhZHlcIiB9OyAvL1JDIDMxMTAwMjMxIDogRG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgcHJvZmlsZXMuZG9rbGFkeS5jb2x1bW5zID0gJC5leHRlbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRva2xhZHk6IHsgaGlkZGVuOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBkb2s6IHsgaGlkZGVuOiBmYWxzZSB9XHJcbiAgICAgICAgICAgICAgICB9LCBwcm9maWxlcy5kZWZhdWx0LmNvbHVtbnMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJvZmlsZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuZGV0YWlsQWN0ID0gdGhpcy5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRldGFpbEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjY2XCIsIC8vUkMgMzExMDAyNjYgOiBab2JyYXppdCBkZXRhaWxcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZpc2libGU6ICh0aGlzLlR5cFVsb2h5ICE9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUHJpbWFybmlQb3phZGF2a3laYXBpcyAmJiB0aGlzLlR5cFVsb2h5ICE9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQmFsYW5jb3ZhbmlaYXBpcyAmJiB0aGlzLlR5cFVsb2h5ICE9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250byksXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuc2hvd0RldGFpbCgpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wcmV2RmlsdGVyQWN0ID0gdGhpcy5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInByZXZGaWx0ZXJBY3RcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktYXJyb3cgZ2ktcm90MTgwXCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDIxOFwiLCAvL1JDIDMxMTAwMjE4IDogUMWZZWRjaG96w60gZmlsdHJcclxuICAgICAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBcIm5ldmVyXCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzExMDAyMjBcIiwgLy9SQyAzMTEwMDIyMCA6IE7DoXZyYXQgayBwxZllZGNob3rDrSBob2Rub3TEmyBmaWx0cnUgYSB2eWhsZWTDoW7DrS5cclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5wcmV2RmlsdGVyKCk7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5leHRGaWx0ZXJBY3QgPSB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibmV4dEZpbHRlckFjdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1hcnJvd1wiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyMTlcIiwgLy9SQyAzMTEwMDIxOSA6IE7DoXNsZWR1asOtY8OtIGZpbHRyXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uVmlzaWJsZTogXCJuZXZlclwiLFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMxMTAwMjIxXCIsIC8vUkMgMzExMDAyMjEgOiBWeXBsbsSbbsOtIG7DoXNsZWR1asOtY8OtaG8gZmlsdHJ1IGEgdnlobGVkw6Fuw60uXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMubmV4dEZpbHRlcigpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudGVtYSAhPT0gXCJcIilcclxuICAgICAgICAgICAgICAgIHRoaXMucHJpbnRBY3QgPSB0aGlzLmFjdGlvbnMuYWRkKEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpbnRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZW1hOiB0aGlzLnRlbWEsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRHZW5lcmF0b3JUeXBlOiBcIkdvcmRpYy5VY3IuV2ViQ2xpZW50LkdTZXpuYW1Fa29aYXpuYW11R2VuZXJhdG9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IChyZXApID0+IHsgcmV0dXJuIHRoaXMucmVwb3J0U3RhcnRpbmcocmVwKS50aGVuKCgpID0+IHsgcmV0dXJuIHJlcDsgfSk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGluZ0Rpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSkpIGFzIEdQcmludEFjdGlvblR5cGU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnphcGlzeUFjdCA9IHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ6YXBpc3lBY3RcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxMjRcIiwgLy9SQyAzMTEwMDEyNCA6IFrDoXBpc3lcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93WmFwaXN5KCk7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuemFwaXN5QWxsQWN0ID0gdGhpcy5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInphcGlzeUFsbEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1saXN0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDI3M1wiLCAvL1JDIDMwMjUwMjczIDogWsOhcGlzeSB2xaFlXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuc2hvd1phcGlzeUFsbCgpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmRva2xhZEFjdCA9IHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkb2tsYWRBY3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjMzXCIsIC8vUkMgMzExMDAyMzMgOiBEb2tsYWR5L3rDoXBpc3lcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy50b2dnbGVHcm91cGluZygpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnByaW1kb2tsYWRBY3QgPSB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpbWRva2xhZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLWV4dGVybmFsLWxpbmtcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE1NFwiLCAvL1JDIDMwMjUwMTU0IDogUHJpbS4gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuc2hvd1ByaW1Eb2tsYWQoKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5kb2tsYWRCTEtBY3QgPSB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rbGFkQkxLQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE1NVwiLCAvL1JDIDMwMjUwMTU1IDogRG9rbGFkIEJMS1xyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLnNob3dQcmltRG9rbGFkKHVuZGVmaW5lZCwgXCJCTEtcIik7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZG9rbGFkUk9BY3QgPSB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rbGFkUk9BY3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTU2XCIsIC8vUkMgMzAyNTAxNTYgOiBEb2tsYWQgUk9cclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93UHJpbURva2xhZCh1bmRlZmluZWQsIFwiUk9cIik7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJSb3dBY3QgPSB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY2xlYXJGaWx0ZXJSb3dBY3RcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDI2N1wiLCAvL1JDIDMxMTAwMjY3IDogVnnEjWlzdGl0IGZpbHRyIHNlem5hbXVcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktYmluXCIsXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImNsZWFyXCIpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnNBY3QgPSB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaW5zQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRGaWx0ZXIodGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q29uZmlybWVkRGF0YVwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4geyB0aGlzLmRvRmlsdGVyQ2xpY2soKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jbGVhckFuZEZpbHRlckFjdCA9IHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjbGVhckFuZEZpbHRlckFjdFwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RmlsdGVyKHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldENvbmZpcm1lZERhdGFcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHsgdGhpcy5kb0ZpbHRlckNsaWNrKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2VsRmlsdGVyQWN0ID0gdGhpcy5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNlbEZpbHRlckFjdFwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLmRpc3BhdGNoRmlsbFNlcnZlckdyaWRFdmVudChldik7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNlbEZpbHRlckFuZFNlYXJjaEFjdCA9IHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzZWxGaWx0ZXJBbmRTZWFyY2hBY3RcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRmlsbFNlcnZlckdyaWRFdmVudChldik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb0ZpbHRlckNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRvdEFjdCA9IHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkb3RBY3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIHNlbCA9IHRoYXQuJGdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIiwgZmFsc2UpWzBdIGFzIEdvcmRpYy5VY3IuV2ViQ2xpZW50LkR0by5HU2V6bmFtWmFwaXN1U3RhdnVEdG87XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vI3JlZ2lvbiBUYWtobGUgdG8gbHplIG5hY3BhdCBpIHByaW1vIGRvIGVsZW1lbnR1XHJcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgdmFsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGVsZW1lbnR5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGZpbHRlcnM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB1Y3M6IHsgc3RhcnQ6IHNlbC51Y3MsIGVuZDogc2VsLnVjcyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgZHJkOiBzZWwuZHJkLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgbWVzaWM6IHsgc3RhcnQ6IHNlbC5tZXNpYywgZW5kOiBzZWwubWVzaWMgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBhYzogeyBzdGFydDogc2VsLmFjLCBlbmQ6IHNlbC5hYyB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZWxlbWVudC5maW5kKFwiLmdmaWx0ZXJwYW5lbFwiKS5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiLCB2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vI2VuZHJlZ2lvbiBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgdmFsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHVjczogeyBzdGFydDogc2VsLnVjcywgZW5kOiBzZWwudWNzIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgZHJkX21zazogc2VsLmRyZCxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBtZXNpYzogeyBzdGFydDogc2VsLm1lc2ljLCBlbmQ6IHNlbC5tZXNpYyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGFjOiB7IHN0YXJ0OiBzZWwuYWMsIGVuZDogc2VsLmFjIH1cclxuICAgICAgICAgICAgICAgICAgICAvL307XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjbGVhclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJhcHBseVwiLCB0aGlzLmdldFphcGlzRmlsdGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9GaWx0ZXJDbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyUGlkQWN0ID0gdGhpcy5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImZpbHRlclBpZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpc1xyXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfTmV6YXJhemVuZV96YXBpc3lcclxuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5Sb3pwb2NldFphcGlzXHJcbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkRhbm92YUV2aWRlbmNlWmFwaXNcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2VsID0gZ3JpZC5nZ3JpZDxVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjbGVhclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJhcHBseVwiLCB7IGl4cDogc2VsWzBdLml4cCB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvRmlsdGVyQ2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNoRG9rbGFkeUFjdCA9IHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzaERva2xhZHlBY3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogKHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRaYXBpcyB8fCB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpc1xyXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfTmV6YXJhemVuZV96YXBpc3lcclxuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkRhbm92YUV2aWRlbmNlWmFwaXMpLFxyXG4gICAgICAgICAgICAgICAgLy9OT1RFOiBKYWsgdG8gZGVsYWppIHYgdGx1c3R5bTogR1Nlem5hbVVjdFphem5hbXVTdGF2eVphcGlzeVRhYi5tX0FjdGlvbkRva2xhZHlfU3RhcnQoKTogXHJcbiAgICAgICAgICAgICAgICAvL1Byb3ZlZG91IHNlc2t1cGVuaSwga3RlcmUgcHJpZGFqaSBqYWtvIG5vdmUgcmFka3kgYSBwYWsgemFmaWx0cnVqaSBwb3V6ZSBuYSBzb3VjdG92ZSByYWRreVxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7IHRoaXMudG9nZ2xlR3JvdXBpbmcodGhpcy5wcm9maWxlcy5kb2tsYWR5IS5uYW1lKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2haYXBpc3lBY3QgPSB0aGlzLmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic2haYXBpc3lBY3RcIixcclxuICAgICAgICAgICAgICAgIHZpc2libGU6ICh0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlJvenBvY2V0WmFwaXMgfHwgdGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXNcclxuICAgICAgICAgICAgICAgICAgICB8fCB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX05lemFyYXplbmVfemFwaXN5XHJcbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9QcmV1Y3RvdmFuaV9zdGF2eVxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7IHRoaXMudG9nZ2xlR3JvdXBpbmcodGhpcy5wcm9maWxlcy5kZWZhdWx0Lm5hbWUpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX05lemFyYXplbmVfemFwaXN5KVxyXG4gICAgICAgICAgICAgICAgdGhpcy56YXRyaWRpdEFjdCA9IHRoaXMuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiemF0cmlkaXRBY3RcIixcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDMzNlwiLCAvL1JDIDMwMjUwMzM2IDogWmF0xZnDrWRpdFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHsgdGhpcy56YXRyaWRpdCgpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluaWNlIG1lbnVcclxuICAgICAgICAgKiBAcGFyYW0gdHlwVWxvaHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnViYXJEZWYodHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUpOiBNZW51UGFyYW1zW10ge1xyXG4gICAgICAgICAgICBsZXQgbWVudSA9IG5ldyBBcnJheTxNZW51UGFyYW1zPigpO1xyXG5cclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLmRldGFpbEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wcmV2RmlsdGVyQWN0LCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLm5leHRGaWx0ZXJBY3QsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcmludEFjdClcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wcmludEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVN0YXZcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlJvenBvY2V0U3RhdiB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvKVxyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnphcGlzeUFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGlmICh0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvKVxyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnphcGlzeUFsbEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVphcGlzXHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9OZXphcmF6ZW5lX3phcGlzeVxyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfUHJldWN0b3Zhbmlfc3RhdnlcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRGFub3ZhRXZpZGVuY2VaYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRaYXBpcylcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5kb2tsYWRBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICBpZiAodHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUHJpbWFybmlQb3phZGF2a3laYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQmFsYW5jb3ZhbmlaYXBpcykge1xyXG4gICAgICAgICAgICAgICAgLy9tZW51LnB1c2goeyBhY3Rpb246IHRoaXMucHJpbWRva2xhZEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMuZG9rbGFkUk9BY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLmRva2xhZEJMS0FjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlByaW1hcm5pUG96YWRhdmt5WmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkZpbmFuY292YW5pWmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfTmV6YXJhemVuZV96YXBpc3lcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5XHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5Sb3pwb2NldFphcGlzXHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5CYWxhbmNvdmFuaVphcGlzXHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvWmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpc3lWc2VcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkRhbm92YUV2aWRlbmNlWmFwaXNcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucHJpbWRva2xhZEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX05lemFyYXplbmVfemFwaXN5ICYmIHRoaXMuemF0cmlkaXRBY3QpIFxyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnphdHJpZGl0QWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMuY2xlYXJGaWx0ZXJSb3dBY3QgfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN0YXRpY1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjY4XCIsIC8vUkMgMzExMDAyNjggOiBSeWNobMOpIGFrY2VcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuaW5zQWN0LCBpY29uOiBcImdpLXJlZnJlc2hcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjI2XCIgfSwgLy9SQyAzMTEwMDIyNiA6IE5hxI10ZW7DrSBkYXRcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5jbGVhckFuZEZpbHRlckFjdCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjI4XCIgfSwgLy9SQyAzMTEwMDIyOCA6IFZ5xI1pc3RpdCBhIG5hxI3DrXN0XHJcbiAgICAgICAgICAgICAgICAgICAgLy9OT1RFOiBUeXRvIGR2ZSBha2NlIGJ1ZG91IHZ6ZHkgZnVuZ292YXQgcG91emUgeiBrbGF2ZXNuaWNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy97IGFjdGlvbjogdGhpcy5zZWxGaWx0ZXJBY3QsIGNhcHRpb246IFwianJlczozMTEwMDIyOVwiIH0sIC8vUkMgMzExMDAyMjkgOiBQxZllbmVzZW7DrSBob2Rub3R5IGRvIGZpbHRydS5cclxuICAgICAgICAgICAgICAgICAgICAvL3sgYWN0aW9uOiB0aGlzLnNlbEZpbHRlckFuZFNlYXJjaEFjdCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjM1XCIgfSwgLy9SQyAzMTEwMDIzNSA6IFDFmWVuZXNlbsOtIGhvZG5vdHkgZG8gZmlsdHJ1IGEgdnlobGVkw6Fuw60uXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuZG90QWN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA2MjBcIiwgLy9SQyAzMDI1MDYyMCA6IEZpbHRyb3ZhdCBkbGUgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzExMDAyMjdcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sIC8vUkMgMzExMDAyMjcgOiBab2JyYXplbsOtIHbFoWVjaCB6w6FwaXPFryBkb2tsYWTFryAoY2Vsw70gZG9rbGFkKSBuYWQgb3puYcSNZW7DvW0gesOhcGlzZW0uXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuZmlsdGVyUGlkQWN0LCBjYXB0aW9uOiBcImpyZXM6MzExMDAyODBcIiB9LCAvL1JDIDMxMTAwMjgwIDogRmlsdHJvdmF0IGRsZSBQSURcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5zaERva2xhZHlBY3QsIGNhcHRpb246IFwianJlczozMTEwMDIzMVwiIH0sIC8vUkMgMzExMDAyMzEgOiBEb2tsYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuc2haYXBpc3lBY3QsIGNhcHRpb246IFwianJlczozMTEwMDEyNFwiIH0gLy9SQyAzMTEwMDEyNCA6IFrDoXBpc3lcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWVudTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBsb2FkRGF0YShmUGFuZWxEYXRhPzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjsgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5nZXRGaWx0ZXIoZlBhbmVsRGF0YSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChuZXdGaWx0ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hZGRGaWx0ZXJUb0hpc3RvcnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyckZpbHRlckhpc3RvcnlJbmRleCAhPT0gdGhpcy5maWx0ZXJIaXN0b3J5Lmxlbmd0aCAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckhpc3Rvcnkuc3BsaWNlKHRoaXMuY3VyckZpbHRlckhpc3RvcnlJbmRleCArIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJIaXN0b3J5LnB1c2gobmV3RmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyRmlsdGVySGlzdG9yeUluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRmlsdGVyVG9IaXN0b3J5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0RmlsdGVyQWN0LmVuYWJsZWQodGhpcy5jdXJyRmlsdGVySGlzdG9yeUluZGV4IDwgdGhpcy5maWx0ZXJIaXN0b3J5Lmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldkZpbHRlckFjdC5lbmFibGVkKHRoaXMuY3VyckZpbHRlckhpc3RvcnlJbmRleCA+IDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREYXRhKG5ld0ZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZ2V0RGF0YVwiLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZW5hYmxlID0gZGF0YS5TZXpuYW1aYXBpc3UubGVuZ3RoID4gMDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwcmlzdHVwbm9zdCBha2NpIGRsZSBuYWN0ZW55Y2ggZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZXRhaWxBY3QuZW5hYmxlZChlbmFibGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyUGlkQWN0LmVuYWJsZWQoZW5hYmxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRva2xhZEFjdC5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmltZG9rbGFkQWN0LmVuYWJsZWQoZW5hYmxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRva2xhZEJMS0FjdC5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2tsYWRST0FjdC5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaERva2xhZHlBY3QuZW5hYmxlZChlbmFibGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuemFwaXN5QWN0LmVuYWJsZWQoZW5hYmxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnphcGlzeUFsbEFjdC5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaFphcGlzeUFjdC5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3RBY3QuZW5hYmxlZChlbmFibGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy56YXRyaWRpdEFjdC5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgcHJvY2Vzc29ycyA9IHRoaXMuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnByb2Nlc3NvcnM7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKCFwcm9jZXNzb3JzLnN1bW1hcnlSb3cpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB2YXIgZ2YgPSB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB2YXIgY29scz0gZ2YuY29sdW1ucy5maWx0ZXIoYyA9PiBjLmNhcHRpb24/LmluZGV4T2YoXCIlXCIpICE9PSAwKS5tYXAoZSA9PiBlLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIC8vdmFyIGNvbHMgPSBnZi5jb2x1bW5zLmZpbHRlcihjID0+IGMuY29sdW1uVHlwZSAhPT0gXCJkYXRldGltZVwiKS5tYXAoZSA9PiBlLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHByb2Nlc3NvcnMuc3VtbWFyeVJvdyA9IEdvcmRpYy5Fa28uR3JpZC5jcmVhdGVTdW1tYXJ5UHJvY2Vzc29yKGdmLCBjb2xzIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZChcImdldFZpZXdcIikudXBkYXRlRGF0YShkYXRhLlNlem5hbVphcGlzdSwgXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyPy5lbmFibGUoZW5hYmxlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8jcmVnaW9uIEV4cGVyaW1lbnRhbCAtIG5la29waXJvdmF0IVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YS5TdW15ICE9PSBcInVuZGVmaW5lZFwiICYmICh0eXBlb2YgZGF0YS5TdW15W1wibGVuZ3RoXCJdID09PSBcInVuZGVmaW5lZFwiIHx8ZGF0YS5TdW15W1wibGVuZ3RoXCJdICE9PSAwKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgJHNvdWN0eVNwbiA9ICQoXCI8c3Bhbj5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzb3VjdHlTcG4uYXBwZW5kKFwianJlczozMTEwMDI0MlwiKTsgLy9SQyAzMTEwMDI0MiA6IFNvdcSNdHk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLlphcGlzb3ZhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtYXRTdW15KFwianJlczozMTEwMDA1NlwiLCBkYXRhLlN1bXkuYzAhLCAkc291Y3R5U3BuLCBcIiwgXCIpOyAvL1JDIDMxMTAwMDU2IDogTURcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybWF0U3VteShcImpyZXM6MzExMDAwNTdcIiwgZGF0YS5TdW15LmMxISwgJHNvdWN0eVNwbiwgXCIsIFwiKTsgLy9SQyAzMTEwMDA1NyA6IERhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtYXRTdW15KFwianJlczozMTEwMDA1OFwiLCBkYXRhLlN1bXkuYzBjMSEsICRzb3VjdHlTcG4sIFwiXCIpOyAvL1JDIDMxMTAwMDU4IDogTUQgLSBEYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybWF0U3VteShcImpyZXM6MzExMDAwNTlcIiwgZGF0YS5TdW15LmMwISwgJHNvdWN0eVNwbiwgXCIsIFwiKTsgLy9SQyAzMTEwMDA1OSA6IE1PIE1EXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1hdFN1bXkoXCJqcmVzOjMxMTAwMDYwXCIsIGRhdGEuU3VteS5jMSEsICRzb3VjdHlTcG4sIFwiLCBcIik7IC8vUkMgMzExMDAwNjAgOiBNTyBEYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybWF0U3VteShcImpyZXM6MzExMDAwNjFcIiwgZGF0YS5TdW15LmMwYzEhLCAkc291Y3R5U3BuLCBcIjsgXCIpOyAvL1JDIDMxMTAwMDYxIDogTU8gTUQgLSBEYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybWF0U3VteShcImpyZXM6MzExMDAwNjJcIiwgZGF0YS5TdW15LmMwX2FzISwgJHNvdWN0eVNwbiwgXCIsIFwiKTsgLy9SQyAzMTEwMDA2MiA6IEFTIE1EXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1hdFN1bXkoXCJqcmVzOjMxMTAwMDYzXCIsIGRhdGEuU3VteS5jMV9hcyEsICRzb3VjdHlTcG4sIFwiLCBcIik7IC8vUkMgMzExMDAwNjMgOiBBUyBEYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybWF0U3VteShcImpyZXM6MzExMDAwNjRcIiwgZGF0YS5TdW15LmMwYzFfYXMhLCAkc291Y3R5U3BuKTsgLy9SQyAzMTEwMDA2NCA6IEFTIE1EIC0gRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJzdGF0dXNXaWRnZXRcIiwgXCJ1Y3JzdW1hLXBhbmVsXCIpLmVtcHR5KCkuYXBwZW5kKCRzb3VjdHlTcG4pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBmb3JtYXRTdW15KGNhcHRpb246IHN0cmluZywgdmFsdWU6IEpzb25EZWNpbWFsLCAkc3BuOiBKUXVlcnksIHNlcGFyYXRvcj86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgICAgICAkc3BuLmFwcGVuZChjYXB0aW9uICsgXCI9XCIpO1xyXG4gICAgICAgICAgICAkc3BuLmFwcGVuZCgkKFwiPHNwYW4+XCIsIHsgdGV4dDogR29yZGljLlRlbXBsYXRlcy5Gb3JtYXR0ZXJzLm51bWJlcihwYXJzZURlY2ltYWwodmFsdWUpLCBcIkNcIiAvKlwiQzJcIiovKSwgc3R5bGU6IFwiZm9udC13ZWlnaHQ6IDcwMFwiIH0pKTtcclxuICAgICAgICAgICAgaWYgKHNlcGFyYXRvcilcclxuICAgICAgICAgICAgICAgICRzcG4uYXBwZW5kKHNlcGFyYXRvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgZ2V0RmlsdGVyKGZQYW5lbERhdGE/OiBhbnkpOiBKUXVlcnlQcm9taXNlPEdTZXpuYW1Fa29aYXpuYW11R2V0RGF0YUZpbHRlckR0bz4ge1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVyRHRvID0gZlBhbmVsRGF0YSB8fCB7fTtcclxuICAgICAgICAgICAgbGV0IGVsZW1lbnR5OiBhbnkgPSBudWxsOyAvL1RPRE86IFBvIHZ5YmVydSB2YXJpYW50eSBvdHlwb3ZhdCEhIVxyXG4gICAgICAgICAgICBsZXQgZmlsdGVyU3RyUG9waXM6IEdTdHJ1a3R1cm92YW55UG9waXNGaWx0ZXJEdG9bXSA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoZlBhbmVsRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZQYW5lbERhdGEuZWxlbWVudHkgJiYgJC5pc1BsYWluT2JqZWN0KGZQYW5lbERhdGEuZWxlbWVudHkpKVxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnR5ID0gZlBhbmVsRGF0YS5lbGVtZW50eTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZlBhbmVsRGF0YS5maWx0ZXJTdHJQb3BpcyAmJiBmUGFuZWxEYXRhLmZpbHRlclN0clBvcGlzIGluc3RhbmNlb2YgQXJyYXkpXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RyUG9waXMgPSBmUGFuZWxEYXRhLmZpbHRlclN0clBvcGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgcmV0dXJuIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXI8R0Vrb0ZpbHRlckR0bz4oXCJjb2xsZWN0XCIsIGZpbHRlckR0bylcclxuICAgICAgICAgICAgICAgIC50aGVuKChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cudHJhY2UoXCJmaWx0ZXJcIiwgZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cudHJhY2UoXCJlbGVtZW50eVwiLCBKU09OLnN0cmluZ2lmeShlbGVtZW50eSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nLnRyYWNlKFwiZmlsdGVyU3RyUG9waXNcIiwgZmlsdGVyU3RyUG9waXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nLnRyYWNlKFwic3RyUG9waXNLZXlzXCIsIHRoaXMuYWRkU3RyUG9waXNDb2x1bW5zKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZmlsdGVyOiBkLCBlbGVtZW50eTogZWxlbWVudHksIGZpbHRlclN0clBvcGlzOiBmaWx0ZXJTdHJQb3Bpcywgc2tpcFN1bUxpbWl0OiBmYWxzZSwgc3RyUG9waXNLZXlzOiB0aGlzLmFkZFN0clBvcGlzQ29sdW1ucywgcG9waXNEb2tsYWR1OiB0aGlzLnVzZXJTZXR0aW5ncz8uZ2V0KFwic3RydWt0dXJvdmFueVBvcGlzRG9rbGFkdUF1dG9BZGRHcmlkQ29sdW1uc1wiKSBhcyBib29sZWFuIH07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyUGFuZWwoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBjZnVTZXQgPSBHb3JkaWMuRWtvLkNmdVV0aWxzLmdldENmdVNldFNlcnZlckZpbHRlcnModGhpcywge1xyXG4gICAgICAgICAgICAgICAgaXNSb3o6IHRoaXMuUm96cG9jZXQsXHJcbiAgICAgICAgICAgICAgICBpc1VjdDogdGhpcy5VY2V0bmljdHZpLFxyXG4gICAgICAgICAgICAgICAgY2hlY2tVZXRlOiB0aGlzLmVrb1BhcmFtcy5DaGVja1VldGUsXHJcbiAgICAgICAgICAgICAgICB3aWxkY2FyZDogdGhpcy5HbG9iYWxzLk90aGVycz8uV2lsZGNhcmQsXHJcbiAgICAgICAgICAgICAgICBpeHNSb3o6IHRoaXMuZWtvUGFyYW1zLkl4c1JveiB8fCB1bmRlZmluZWRcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ2YgPSBHb3JkaWMuVWNyLldlYkNsaWVudC5HRWxlbWVudFV0aWxzLmNyZWF0ZUVsZW1lbnRzR3JpZEZvcm1hdCh7XHJcbiAgICAgICAgICAgICAgICBla29QYXJhbXM6IHRoaXMuZWtvUGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgZ2xvYmFsczogdGhpcy5nbG9iYWxzLFxyXG4gICAgICAgICAgICAgICAgdHlwU2VzdGF2eTogdGhpcy50eXBTZXN0YXZ5LFxyXG4gICAgICAgICAgICAgICAgY2Z1U2V0OiBjZnVTZXQsXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJPcHRpb25zOiB0aGlzLmZpbHRlck9wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJQYXJhbXM6IHRoaXMuZmlsdGVyUGFyYW1zXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGVsbVJvd09wdHMgPSB7IGxhYmVsOiBcIkVsZW1lbnR5XCIgfTtcclxuICAgICAgICAgICAgZWxtUm93T3B0c1tcImZhdm9yaXRlUm93TGF5b3V0RGVzY3JpcHRvclwiXSA9IFwidy1MLTkgdy1NLTggdy1TLTEyXCI7XHJcbiAgICAgICAgICAgIGxldCBmcEZvcm06IEdvcmRpYy5Gb3Jtcy5Gb3JtO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvKSB7XHJcbiAgICAgICAgICAgICAgICBmcEZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJqcmVzOjMwMjUwMDUyXCIgfSkgLy9SQyAzMDI1MDA1MiA6IEZpbHRyXHJcbiAgICAgICAgICAgICAgICBsZXQgdm9sYnlEYXRhOiBbeyB0ZXh0LCBob2Rub3RhIH1dIDtcclxuICAgICAgICAgICAgICAgIHZvbGJ5RGF0YSA9IFt7IHRleHQ6IHRoaXMuemtyYXRreS5Oa3MsIGhvZG5vdGE6IDEgfV07ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLndvZHJPcmogIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdm9sYnlEYXRhLnB1c2goeyB0ZXh0OiB0aGlzLndvZHJPcmouY2FwdGlvbiwgaG9kbm90YTogMiB9KTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy53b2RyT3JnICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZvbGJ5RGF0YS5wdXNoKHsgdGV4dDogdGhpcy53b2RyT3JnLmNhcHRpb24sIGhvZG5vdGE6IDMgfSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgdm9sYnkgPSBuZXcgR29yZGljLkRhdGEuVmlldyh2b2xieURhdGFcclxuICAgICAgICAgICAgICAgICAgICAsIHsga2V5OiBcImhvZG5vdGFcIiB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgbGV0IGluaXRpYWxWYWx1ZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQudXNlTlMpXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLnprcmF0a3kuTmtzLCBob2Rub3RhOiAxXHJcbiAgICAgICAgICAgICAgICAgICAgfSBhcyBuZXZlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC51c2VPUkopXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLndvZHJPcmouY2FwdGlvbiwgaG9kbm90YTogMlxyXG4gICAgICAgICAgICAgICAgICAgIH0gYXMgbmV2ZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoYXQudXNlT1JHKVxyXG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWxWYWx1ZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogdGhpcy53b2RyT3JnLmNhcHRpb24sIGhvZG5vdGE6IDNcclxuICAgICAgICAgICAgICAgICAgICB9IGFzIG5ldmVyKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGZwRm9ybS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidm9sYnlcIiwgbGlzdDogdHJ1ZSwgaXRlbVdpZHRoOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgLCBkcm9wZG93bjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAsIG11bHRpOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJtb2RlbC52b2xieT12YWx1ZS5ob2Rub3RhXCJcclxuICAgICAgICAgICAgICAgICAgICAsIGl0ZW1UZW1wbGF0ZTogXCJ7dGV4dH1cIlxyXG4gICAgICAgICAgICAgICAgICAgICwgZGF0YTogdm9sYnlcclxuICAgICAgICAgICAgICAgICAgICAsIGluaXRpYWxWYWx1ZTogaW5pdGlhbFZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgLCBlbXB0eVZhbHVlOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgLCBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubG9hZGluZyB8fCAob2JqLmZsYWdzICYmIG9iai5mbGFncy5maWx0ZXJDbGVhciA9PT0gdHJ1ZSkpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQubG9hZGluZykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iaiAmJiB0eXBlb2Ygb2JqLnZhbHVlICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuc2V0RmlsdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy8vIG5hc3RhdmVuaSBha2NpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2xldCB2aWV3ID0gdGhhdC4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuc2V0QWN0aW9ucyh2aWV3LmdldERhdGFSb3dzKCkubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbZnBGb3JtXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVzOiBbXCJtZFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOiBcIkw1TTNTMSBMLTEyLTEyLTAgTS0xMi0xMi0wIFMtMTItMTItMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hCdXR0b25Pbk1haW5Sb3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVPcHRpb25zRm9ybTogR1Vjck1hc2thRGV0YWlsLmdldEZvcm0oZ2YgYXMgYW55KSwgLy9UT0RPOiBEYXQgc3ByYXZueSB0eXAgZ3JpZGZvcm1hdHUhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlVXNlclNldHRpbmdzOiBbRmlsdGVyVmlld01vZGUuRGV0YWlsXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RvcmFnZVNlcnZpY2U6IG5ldyBHVWNyTWFza2FTZXJ2aWNlKHsgdHlwU2VzdGF2eTogdGhpcy50eXBTZXN0YXZ5LCBwYXJlbnRDb250ZW50OiB0aGlzLCBmcmFnbWVudHM6IFwiKixlbGVtZW50eVwiIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvTG9hZEFmdGVyQ2hvc2VGaWx0ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBseTogKGV2LCBkYXRhKSA9PiB7IHRoaXMubG9hZERhdGEoZGF0YS5maWx0ZXIpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNldDogKGV2LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcihcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5QnV0dG9uQmVoYXZpb3VyOiBcIkFsd2F5c1ByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJGaWx0ZXJCdXR0b25WaXNpYmxlOiBcIkFsd2F5c1Zpc2libGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9WeWhsZWRhbmlab2JyYXppdDogXCJPYmxpYmVuZVBvZG1pbmt5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvVnlobGVkYW5pWm9icmF6aXRVc2VyU2V0dGluZ3M6IFwiRGVueVwiIC8vTk9URTogWmFrYXp1amUgcHJlcGluYW5pIHBvIHZ5aGxlZGFuaSAtIHBva3VkIHNlIG5la2RvIHBva291c2VsIHZ5bWF6YXQgZmlsdHIgdiB0b210byByZXppbXUsIHRhayBtdXNlbCBrbGlrbm91dCBuYSB2eWhsZWRhdCwgdml6IFQzOTg3XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZwRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcImpyZXM6MzAyNTAwNTJcIiB9KSAvL1JDIDMwMjUwMDUyIDogRmlsdHJcclxuICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhlbG1Sb3dPcHRzKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLkVrby5QcmVmYWJzLmNmdUVsZW1lbnRzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlbGVtZW50eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL25hbWU6IFwiZmlsdGVyc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy50YXNrSWQgPyB0aGlzLnRhc2tJZCArIFwiX2VsZW1lbnR5RmllbGQjXCIgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmVsZW1lbnR5LmZpbHRlcnM9dmFsdWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxWYWx1ZVRyYW5zZm9ybToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHk6IChtb2RlbFZhbHVlKSA9PiB7IHJldHVybiBtb2RlbFZhbHVlOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hcHBseTogKG1vZGVsVmFsdWUpID0+IHsgcmV0dXJuIG1vZGVsVmFsdWUuZmlsdGVyczsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxlY3Q6IChmaWVsZFZhbHVlKSA9PiB7IHJldHVybiBmaWVsZFZhbHVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbGxlY3Q6IChmaWVsZFZhbHVlKSA9PiB7IHJldHVybiB7IGZpbHRlcnM6IGZpZWxkVmFsdWUgfTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgb2JqKSB7IHRoYXQubG9nLnRyYWNlKFwiZWxlbWVudHlcIiwgJCh0aGlzKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IGdmLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja1VldGU6IHRoaXMuZWtvUGFyYW1zLkNoZWNrVWV0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuQWRkTmV3UmVjb3JkczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FuUmVtb3ZlUmVjb3JkczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlTmV3UmVjb3JkOiBHRWxlbWVudFV0aWxzLmNyZWF0ZU5ld0VsZW1lbnRGdW5jKHRoaXMuZ2xvYmFscy5SZXppbVByb3ZvenUhLCB0aGlzLmVrb1BhcmFtcyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyUmVjb3JkOiBHRWxlbWVudFV0aWxzLmNyZWF0ZUNsZWFyRWxlbWVudEZ1bmModGhpcy5nbG9iYWxzLlJlemltUHJvdm96dSEpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRFbGVtZW50VmFsdWVPcHRpb25zOiB7IHNraXA6IEdFbGVtZW50VXRpbHMuZ2V0RWxlbWVudFZhbHVlU2tpcENvbHVtbnModGhpcy5nbG9iYWxzLlJlemltUHJvdm96dSEpLCBuYW1lQ29sdW1uOiBcIm5hemV2XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVphcGlzIHx8IHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfTmV6YXJhemVuZV96YXBpc3lcclxuICAgICAgICAgICAgICAgIHx8IHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfUHJldWN0b3Zhbmlfc3RhdnkgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICBmcEZvcm0uYWRkUm93KFwianJlczozMTEwMDIyM1wiKSAvL1JDIDMxMTAwMjIzIDogRmlsdHIgZGxlIHN0ci4gcG9waXN1XHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuVWNyLldlYkNsaWVudC5QcmVmYWJzLnN0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlcih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmlsdGVyU3RyUG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGlzLmZpbHRlclN0clBvcGlzIHx8IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbXB0eVZhbHVlOiB0aGlzLmZpbHRlclN0clBvcGlzIHx8IFtdIGFzIGFueSwgLy9PcHRpbWFsaXphY2UsIGFieWNoIG5lbXVzZWwgZGVsYXQgZGFsc2kgcmVxdWVzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgdikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXRudXRpIGhvZG5vdHkgc3RyLiBwb3Bpc3UgeiBwb2xpY2thIHZlIGZpbHRlcnBhbmVsdSBkbyBwb2xpY2thLCBrdC4gamUgc291Y2FzaSBnZ3JpZHNlcnZlcmZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmFkZFN0clBvcGlzQ29sdW1ucyB8fCAhdi52YWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdi52YWx1ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSB2LnZhbHVlW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkZFN0clBvcGlzQ29sdW1ucy5pbmRleE9mKHZhbC5rbGljISkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdnYgPSB7fSBhcyBPYmplY3RMaXRlcmFsPHN0cmluZz47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ2W3ZhbC5rbGljIV0gPSB2YWwuaG9kbm90YSE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJmaW5kRmllbGRzXCIsIHZhbC5rbGljISkuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdnYsIHsgdHJpZ2dlckNoYW5nZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwgPSAkKFwiPGRpdj5cIilcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtczogW2ZwRm9ybV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGVzOiBbXCJtZFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZUxheW91dERlc2NyaXB0b3I6IFwiTDVNM1MxIEwtMTItMTItMCBNLTEyLTEyLTAgUy0xMi0xMi0wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoQnV0dG9uT25NYWluUm93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNhdmVPcHRpb25zRm9ybTogR1Vjck1hc2thRGV0YWlsLmdldEZvcm0oZ2YgYXMgYW55KSwgLy9UT0RPOiBEYXQgc3ByYXZueSB0eXAgZ3JpZGZvcm1hdHUhXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyU3RvcmFnZVNlcnZpY2U6IG5ldyBHVWNyTWFza2FTZXJ2aWNlKHsgdHlwU2VzdGF2eTogdGhpcy50eXBTZXN0YXZ5LCBwYXJlbnRDb250ZW50OiB0aGlzLCBmcmFnbWVudHM6IFwiKixlbGVtZW50eVwiIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Mb2FkQWZ0ZXJDaG9zZUZpbHRlcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHk6IChldiwgZGF0YSkgPT4geyB0aGlzLmxvYWREYXRhKGRhdGEuZmlsdGVyKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICByZXNldDogKGV2LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcihcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeUJ1dHRvbkJlaGF2aW91cjogXCJBbHdheXNQcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJGaWx0ZXJCdXR0b25WaXNpYmxlOiBcIkFsd2F5c1Zpc2libGVcIixcclxuICAgICAgICAgICAgICAgICAgICBwb1Z5aGxlZGFuaVpvYnJheml0OiBcIk9ibGliZW5lUG9kbWlua3lcIixcclxuICAgICAgICAgICAgICAgICAgICBwb1Z5aGxlZGFuaVpvYnJheml0VXNlclNldHRpbmdzOiBcIkRlbnlcIiAvL05PVEU6IFpha2F6dWplIHByZXBpbmFuaSBwbyB2eWhsZWRhbmkgLSBwb2t1ZCBzZSBuZWtkbyBwb2tvdXNlbCB2eW1hemF0IGZpbHRyIHYgdG9tdG8gcmV6aW11LCB0YWsgbXVzZWwga2xpa25vdXQgbmEgdnlobGVkYXQsIHZpeiBUMzk4N1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVE9ETzogUHJpZGF0IGZvcm1hdG92YW5pIHBybyBwcmlwYWR5LCBrZHkganNvdSBvYmxpYmVuZSBuYSBmaXRycGFuZWx1IHNjaG92YW5lXHJcbiAgICAgICAgICAgICAgICAgICAgLy9iYWRnZURhdGE6IChldiwgbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGxldCBkID0gby5kYXRhLmVsZW1lbnR5O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICghZCB8fCAhZC5maWx0ZXJzKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG8udG9vbHRpcCA9IFwiRWxlbWVudHk6PGJyLz5cIjtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBvLnRvb2x0aXAgKz0gR29yZGljLkVrby5QcmVmYWJzLmZvcm1hdEVsZW1lbnRWYWx1ZXMoZ2YgYXMgYW55LCBkLmZpbHRlcnMpLmh0bWwoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBvLnRvb2x0aXAgPSBvLnRvb2x0aXAucmVwbGFjZShcIk9SXCIsIFwiPGJyLz5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0RGF0YShmaWx0ZXI6IEdTZXpuYW1Fa29aYXpuYW11R2V0RGF0YUZpbHRlckR0byk6IEpRdWVyeVByb21pc2U8SUdTZXpuYW1aYXBpc3VTdGF2dVJlc3VsdER0bz4ge1xyXG4gICAgICAgICAgICBsZXQgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkZpbmFuY292YW5pWmFwaXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIChmaWx0ZXIuZmlsdGVyIGFzIGFueSkucm9rID0gdGhpcy5GaWx0ZXIucm9rO1xyXG4gICAgICAgICAgICAgICAgICAgIChmaWx0ZXIuZmlsdGVyIGFzIGFueSkuaWNvID0gdGhpcy5GaWx0ZXIuaWNvO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpcykge1xyXG4gICAgICAgICAgICAgICAgLy9maWx0ZXIuUmFkZWtTdGF2dSA9IHRoaXMuQ3VycmVudFJvdztcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcnE6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RaYXBpc0xpc3RSZXF1ZXN0RHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFJhZGVrU3RhdnU6IHRoaXMuQ3VycmVudFJvdyxcclxuICAgICAgICAgICAgICAgICAgICBNYXNrYTogZmlsdGVyLmZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICwgTWFza2EyOiBmaWx0ZXIuZmlsdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgLCBUeXBVbG9oeTogdGhpcy5UeXBVbG9oeVxyXG4gICAgICAgICAgICAgICAgICAgICwgRWxlbWVudHk6IGZpbHRlci5lbGVtZW50eVxyXG4gICAgICAgICAgICAgICAgICAgICwgbG9nb3ZhdEdkcHI6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAsIG1heFJlY29yZHM6IC0xLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5nZXREYXRhU2FsZG9rb250b1phcGlzeShkZWYsIHJxLCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpc3lWc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmdldFNhbGRva29udG9aYXBpc3lWc2UoZmlsdGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2Vsc2UgaWYgKHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfTmV6YXJhemVuZV96YXBpc3kpIHtcclxuICAgICAgICAgICAgLy8gICAgcmV0dXJuIHRoYXQuZ2V0U2FsZG9rb250b1phcGlzeVZzZShmaWx0ZXIpO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250bykge1xyXG4gICAgICAgICAgICAgICAgLy8gemppc3RlbmkgdnlicmFueWNoIHNsb3ZcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlTlMgPSBmYWxzZTsgdGhpcy51c2VPUkcgPSBmYWxzZTsgdGhpcy51c2VPUkogPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgKGZpbHRlci5maWx0ZXIgYXMgYW55KS52b2xieSEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGZpbHRlci5maWx0ZXIgYXMgYW55KS52b2xieVtpXSA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZU5TID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGZpbHRlci5maWx0ZXIgYXMgYW55KS52b2xieVtpXSA9PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZU9SSiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChmaWx0ZXIuZmlsdGVyIGFzIGFueSkudm9sYnlbaV0gPT0gMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VPUkcgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZpbHRlci51c2VOUyA9IHRoaXMudXNlTlM7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIudXNlT1JHID0gdGhpcy51c2VPUkc7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIudXNlT1JKID0gdGhpcy51c2VPUko7XHJcbiAgICAgICAgICAgICAgICAvL2xldCBtYXNrYTogR29yZGljLlVjdC5JbnRlcmZhY2UuR0Vrb0ZpbHRlckR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbGV0IG1hc2thID0gZmlsdGVyLmZpbHRlcjtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gZmlsdGVyLmZpbHRlcj8uY2Z1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFza2EhW25hbWVdID0gZmlsdGVyLmZpbHRlcj8uY2Z1W25hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHJxOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyTGlzdFJlcXVlc3REdG8gPSB7IGxvZ292YXRHZHByOiB0cnVlLCBuczogdGhpcy51c2VOUywgb3JnOiB0aGlzLnVzZU9SRywgb3JqOiB0aGlzLnVzZU9SSiwgbWF4UmVjb3JkczogR29yZGljLkVrby5VdGlscy5HZXRVc2VyU2V0dGluZ3NMaXN0V2FybmluZyh0aGF0LCBcIkdsb2JhbC5VY3IuQXBwU2V0dGluZ3NcIikgPyBHb3JkaWMuRWtvLlV0aWxzLkdldFVzZXJTZXR0aW5nc0xpc3RNYXhDb3VudCh0aGF0LCBcIkdsb2JhbC5VY3IuQXBwU2V0dGluZ3NcIikgOiAtMSB9O1xyXG4gICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJvcHRpb25cIiwgXCJjb2x1bW5zXCIsIHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERhdGFTYWxkb2tvbnRvKGRlZiwgbWFza2EgYXMgYW55LCBycSk7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbDxJR1Nlem5hbVphcGlzdVN0YXZ1UmVzdWx0RHRvPihcIkdldERhdGFcIiwgeyBmOiBmaWx0ZXIgfSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihkZWYucmVzb2x2ZSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKHhociwgc3RhdGUsIG8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8gJiYgby5kYXRhICYmIG8uZGF0YS5zdW1MaW1pdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgby5oYW5kbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1N1bUxpbWl0RXhjZWVkZWQoby5kYXRhLnN1bUxpbWl0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnNraXBTdW1MaW1pdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGF0YShmaWx0ZXIpLnRoZW4oZGVmLnJlc29sdmUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKCk9PmRlZi5yZWplY3QoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hY3RlbmkgdnNlY2ggemFwaXN1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGRlZlxyXG4gICAgICAgICAqIEBwYXJhbSBmaWx0ZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldFNhbGRva29udG9aYXBpc3lWc2UoZmlsdGVyOiBHU2V6bmFtRWtvWmF6bmFtdUdldERhdGFGaWx0ZXJEdG8pOiBKUXVlcnkuUHJvbWlzZTxJR1Nlem5hbVphcGlzdVN0YXZ1UmVzdWx0RHRvPiB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvcCA9IHRoaXMuYmVnaW5PcGVyYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwiR1VjclphcGlzTGlzdEFsbFJlcXVlc3REdG9cIixcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzOiAwLCB0b3RhbDogMTAwLCBcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwianJlczozMDI1MDI4OVwiLCAgLy9SQyAzMDI1MDI4OSA6IE5hxI3DrXTDoW0uLi5cclxuICAgICAgICAgICAgICAgIGNhbmNlbEFjdGlvbjogbmV3IEdBY3Rpb24oeyBjYXB0aW9uOiBcImpyZXM6MzAyNTAyODVcIiwgcnVuOiAoKSA9PiB7IHRhc2suY2FuY2VsKCkgfSwgbmFtZTogXCJjYW5jZWxBY3RcIiB9KSAvL1JDIDMwMjUwMjg1IDogU3Rvcm5vXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRhc2sgPSBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLnN0YXJ0PEdvcmRpYy5Bc3luYy5JR1Rhc2tQcm9ncmVzcywgYW55PihcIkdvcmRpYy5VY3QuU2VydmVyLkdVY3JaYXBpc3lTYWxkb2tvbnRvQXN5bmNcIiwge1xyXG4gICAgICAgICAgICAgICAgTWFza2E6IGZpbHRlci5maWx0ZXJcclxuICAgICAgICAgICAgICAgICwgUmFkZWtTdGF2dTogdGhpcy5Sb3dzXHJcbiAgICAgICAgICAgICAgICAsIE1hc2thMjogZmlsdGVyLmZpbHRlclxyXG4gICAgICAgICAgICAgICAgLCBUeXBVbG9oeTogdGhpcy5UeXBVbG9oeVxyXG4gICAgICAgICAgICAgICAgLCBFbGVtZW50eTogZmlsdGVyLmVsZW1lbnR5XHJcbiAgICAgICAgICAgICAgICAsIGxvZ292YXRHZHByOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAsIG1heFJlY29yZHM6IC0xXHJcbiAgICAgICAgICAgICAgICAsIE5hc3RhdmVuaTogeyBPdGF6a2FWZWxrZU1ub3pzdHZpWmF6bmFtdTogZmFsc2UgfVxyXG5cclxuICAgICAgICAgICAgfSBhcyBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyWmFwaXNMaXN0QWxsUmVxdWVzdER0byk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGFzay5nZXRQcm9taXNlKClcclxuICAgICAgICAgICAgICAgIC50aGVuKFxyXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHsgcmV0dXJuIHsgU2V6bmFtWmFwaXN1OiByZXN1bHQucmVzdWx0LCBTdW15OiBbXSBhcyBhbnkgfSBhcyBJR1Nlem5hbVphcGlzdVN0YXZ1UmVzdWx0RHRvOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICh0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0LnN0YXRlID09PSBHb3JkaWMuQXN5bmMuR1Rhc2tTdGF0ZS5jYW5jZWxTaWduYWxpemVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRpYWxvZ3MuYWxlcnQoXCJTdG9ybm92YW5vXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHQuc3RhdGUgPT09IEdvcmRpYy5Bc3luYy5HVGFza1N0YXRlLmZhdWx0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93RXhjZXB0aW9uKHQuZXhjZXB0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLnByb2dyZXNzKChhOiB7IHByb2dyZXNzPzogR29yZGljLkFzeW5jLklHVGFza1Byb2dyZXNzIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYS5wcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcC5wcm9ncmVzcyA9IGEucHJvZ3Jlc3MuY3VycmVudCwgb3AudG90YWwgPSBhLnByb2dyZXNzLnRvdGFsLCBvcC50ZXh0ID0gYS5wcm9ncmVzcy50ZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzT3BlcmF0aW9uKG9wKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4gdGhpcy5lbmRPcGVyYXRpb24ob3ApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hY3RlbmkgZGF0IHBybyBzYWxkb2tvbnRvIHphcGlzeVxyXG4gICAgICAgICAqIEBwYXJhbSBkZWZcclxuICAgICAgICAgKiBAcGFyYW0gbWFza2FcclxuICAgICAgICAgKiBAcGFyYW0gcnFcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldERhdGFTYWxkb2tvbnRvWmFwaXN5KGRlZjogSlF1ZXJ5LkRlZmVycmVkPGFueSwgYW55LCBhbnk+LCBycTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFphcGlzTGlzdFJlcXVlc3REdG8sIGZpbHRlcnM6YW55KTogSlF1ZXJ5LlByb21pc2U8YW55LCBhbnksIGFueT4ge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7IFxyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKFwiXCIpOyBcclxuICAgICAgICAgICAgR29yZGljLklzbC5VY3JVY2V0bmlaYXBpcy5saXN0RGF0YSh7IHJxOiBycSwgZmlsdGVyczogZmlsdGVycyB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2RlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNlem5hbVphcGlzdTogcmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTdW15OiBbXVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUocmV0KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4obnVsbCwgZnVuY3Rpb24gKGpxWEhSLCB0eXBlLCBvYmopIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb24odGhhdCwgb2JqLCB0eXBlLCBycSwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbk5ldyh0aGF0LCBqcVhIUiwgIHJxKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5NZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBycSEuTmFzdGF2ZW5pID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5nZXREYXRhU2FsZG9rb250b1phcGlzeShkZWYsIHJxLCBmaWx0ZXJzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKS5jYXRjaCgoKT0+ZGVmLnJlamVjdCgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGpxWEhSO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFjdGVuaSBkYXQgcHJvIHNhbGRva29udG9cclxuICAgICAgICAgKiBAcGFyYW0gZGVmXHJcbiAgICAgICAgICogQHBhcmFtIG1hc2thXHJcbiAgICAgICAgICogQHBhcmFtIHJxXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXREYXRhU2FsZG9rb250byhkZWY6IEpRdWVyeS5EZWZlcnJlZDxhbnksIGFueSwgYW55PiwgbWFza2E6IFVjdC5JbnRlcmZhY2UuR1VjckZpbHRlckR0bywgcnE6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JMaXN0UmVxdWVzdER0byk6IEpRdWVyeS5Qcm9taXNlPGFueSwgYW55LCBhbnk+IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKFwiXCIpO1xyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLlVjclNhbGRva29udG8ubGlzdERhdGEoeyBtYXNrYTogbWFza2EsIHJxOiBycSB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBTZXpuYW1aYXBpc3U6IHJlc3VsdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU3VteTogW11cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKG51bGwsIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQsIG9iaiwgdHlwZSwgcnEsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmV0dXJuTWVzc2FnZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5SZXNvbHZlRXhlcHRpb25OZXcodGhhdCwganFYSFIsIHJxKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxIS5OYXN0YXZlbmkgPSByZXR1cm5WYWx1ZS5OYXN0YXZlbmk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5nZXREYXRhU2FsZG9rb250byhkZWYsbWFza2EsIHJxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLmNhdGNoKCgpPT5kZWYucmVqZWN0KCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGpxWEhSO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmF0cmlkZW5pIHJhZGt1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIHphdHJpZGl0KCkge1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIHNlbCA9IGdyaWQuZ2dyaWQgPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0bz4oXCJnZXRTZWxlY3Rpb25cIixmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChzZWwubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gc2VsWzBdOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2xldCByb3c6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0bz17IH07XHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coR29yZGljLlVjci5XZWJDbGllbnQuR0lucHV0SURSSVNSRSwgcm93LCBcImpyZXM6MzAyNTAzMzdcIi8qLCA0MDAsIDM1MCx0cnVlKi8pIC8vUkMgMzAyNTAzMzcgOiBaYWRlanRlIGlkZW50aWZpa2FjaSBSSVNSRVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGV2LCByZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9IG51bGwgJiYgdHlwZW9mIHJlc3VsdC56YXRyaWRlbm8gIT09IFwidW5kZWZpbmVkXCIgJiYgcmVzdWx0LnphdHJpZGVubyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHphdHJpZGVubywgbnV0bm8gem5vdnVuYWNpdCwgbmVibyB6YXpuYW0gc21hemF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbGV0IG5ld0RhdGE6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0b1tdID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBncmlkLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0bz4oXCJnZXRWaWV3XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBkYXRhOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG9bXSA9IFtyb3ddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xldCBkYXRhID0gdmlldy5nZXREYXRhUm93cyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGxldCByYWRlayA9IGRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICghKHJhZGVrLnJvayA9PSByb3cucm9rICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJhZGVrLmxpYyA9PSByb3cubGljICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJhZGVrLmljbyA9PSByb3cuaWNvICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJhZGVrLnVjcyA9PSByb3cudWNzICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHJhZGVrLm1lc2ljID09IHJvdy5tZXNpYyAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByYWRlay5hYyA9PSByb3cuYWMgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHJhZGVrLnJhZGVrX3ogPT0gcm93LnJhZGVrX3opKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBkYXRhLnB1c2gocmFkZWspO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy51cGRhdGVEYXRhKHJvdywgXCJkZWxldGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5nZXREYXRhUm93cyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzaG93U3VtTGltaXRFeGNlZWRlZChjb3VudDogbnVtYmVyKTogSlF1ZXJ5UHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgICAgIGxldCBkZWYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGxldCBtc2cgPSBganJlczozMTEwMDIzNiR7Y291bnR9LiBgOyAvL1JDIDMxMTAwMjM2IDogUG/EjWV0IHZ5YnJhbsO9Y2ggxZnDoWRrxa8gamUgXHJcbiAgICAgICAgICAgIG1zZyArPSBcImpyZXM6MzExMDAyMzdcIjsgLy9SQyAzMTEwMDIzNyA6IE5hxI10ZW7DrSB2xaFlY2ggdMSbY2h0byDFmcOhZGvFryBtxa/FvmUgdHJ2YXQgZGxvdWhvLiBVcMWZZXNuxJt0ZSB2w71ixJtyLjxici8+IFDFmWVqZXRlIHNpIHBva3JhxI1vdmF0IHYgbmHEjcOtdMOhbsOtP1xyXG4gICAgICAgICAgICB0aGlzLmRpYWxvZ3MuY29uZmlybShcIlwiLCBtc2cpXHJcbiAgICAgICAgICAgICAgICAub24oXCJ5ZXNcIiwgKCkgPT4geyBkZWYucmVzb2x2ZSgpOyB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKCkgPT4geyBpZiAoZGVmLnN0YXRlKCkgPT09IFwicGVuZGluZ1wiKSBkZWYucmVqZWN0KCk7IH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNob3dEZXRhaWwocm93PzogVWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8pOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKCFyb3cpIHtcclxuICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsID0gZ3JpZC5nZ3JpZDxVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICByb3cgPSBzZWxbMF07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGxldCB0eXBVbG9oeTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZSA9IHRoaXMuVHlwVWxvaHk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkZpbmFuY292YW5pWmFwaXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyb3cucHJpel91ciAhPSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHR5cFVsb2h5ID0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5Sb3pwb2NldFphcGlzO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHR5cFVsb2h5ID0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG9wdGlvbnM6IElHRGV0YWlsU3RhdlphcGlzUmFka3VPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwVWxvaHk6IHR5cFVsb2h5LC8vdGhpcy5UeXBVbG9oeSxcclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyOiB0aGlzLmdldFphcGlzRmlsdGVyKCksXHJcbiAgICAgICAgICAgICAgICByb3c6IHJvdyxcclxuICAgICAgICAgICAgICAgIGdsb2JhbHM6IHRoaXMuZ2xvYmFscyxcclxuICAgICAgICAgICAgICAgIHZpZXdNb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgIGNmdVNldFNvcnRlZDogdGhpcy5jZnVTZXRTb3J0ZWQsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlKEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdEZXRhaWxTdGF2WmFwaXNSYWRrdSwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbmkgcHJpbS4gZG9rbGFkdVxyXG4gICAgICAgICAqIEBwYXJhbSByb3dcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNob3dQcmltRG9rbGFkKHJvdz86IFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvLCB0eXA6c3RyaW5nPVwiXCIpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKCFyb3cpIHtcclxuICAgICAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsID0gZ3JpZC5nZ3JpZDxVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICByb3cgPSBzZWxbMF07XHJcbiAgICAgICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgLy8gUG92b2xlbmUgYWdlbmR5XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vaWYgKHJvdy50eXBfYWcgPT0gXCJLREZcIikge1xyXG4gICAgICAgICAgICAvLyAgICBhX2FnZW5kYSA9IDcwO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy9pZiAoY250LmZpbHRlcl9ha2NlLnR5cCA9PSBcIktPRlwiKSB7XHJcbiAgICAgICAgICAgIC8vICAgIGFfYWdlbmRhID0gODA7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAvL2lmIChjbnQuZmlsdGVyX2FrY2UudHlwID09IFwiUE9VXCIpIHtcclxuICAgICAgICAgICAgLy8gICAgYV9hZ2VuZGEgPSAxODA7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAvL2lmIChjbnQuZmlsdGVyX2FrY2UudHlwID09IFwiUFJFXCIpIHtcclxuICAgICAgICAgICAgLy8gICAgYV9hZ2VuZGEgPSAyMzA7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICB2YXIgaXhwID0gcm93Lml4cDtcclxuICAgICAgICAgICAgdmFyIHR5cEFnID0gcm93LnR5cF9hZztcclxuICAgICAgICAgICAgaWYgKHR5cCA9PSBcIkJMS1wiKSB7XHJcbiAgICAgICAgICAgICAgICAvL2Rva2xhZCBibGtcclxuICAgICAgICAgICAgICAgIHR5cEFnID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUHJpbWFybmlQb3phZGF2a3laYXBpcyB8fCB0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQmFsYW5jb3ZhbmlaYXBpcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIERva2xhZCBCTEtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJvdy5peHBfcHJpbSA9PT0gXCJ1bmRlZmluZWRcIiB8fCByb3cuaXhwX3ByaW0gPT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpeHAgPSByb3cuaXhwX3ByaW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodHlwID09IFwiUk9cIikge1xyXG4gICAgICAgICAgICAgICAgdHlwQWcgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgLy8gU3BlY2lhbGl0a2EgcHJvIHN0cmVkbmVkb2J5IHZ5aGxlZFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuVHlwVWxvaHkgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5QcmltYXJuaVBvemFkYXZreVphcGlzIHx8IHRoaXMuVHlwVWxvaHkgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5CYWxhbmNvdmFuaVphcGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9rbGFkIFJPXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByb3cuaXhwX3JveiA9PT0gXCJ1bmRlZmluZWRcIiB8fCByb3cuaXhwX3JveiA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwQWcgPSA1MDtcclxuICAgICAgICAgICAgICAgICAgICBpeHAgPSByb3cuaXhwX3JvejsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwQWchPT1udWxsICYmICFbNDAsIDUwLCA3MCwgODAsIDEwMCwgMTEwLCAxMjAsIDE4MCwgMjMwLCA1MTAsIDU4MCwgNjIwLCAzMzBdLmNvbmNhdChyb3cudHlwX2FnIGFzIG51bWJlcikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIHRlc3QgbmEgdnlwbGVuaW5pIGl4cFxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGl4cCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBpeHAgPT09IG51bGwpIHJldHVyblxyXG5cclxuICAgICAgICAgICAgR29yZGljLldlYkFwcC5VdGlsaXR5Lm9wZW5BcHAoXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXh4MTogaXhwLCAvLyBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBub3bEmyBvdGV2w61yYW7DqSB6w6Fsb8W+Y2VcclxuICAgICAgICAgICAgICAgICAgICAvL2l4eDI6IG51bGwsICAvLyBkcnVow6kgaWQgY8OtbG92w6lobyBvYmpla3R1IHYgcMWZw61wYWTEmyBzbG/FvmVuw6lobyBrbMOtxI1lIChuZXBvdmlubsOpKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaXh4MzogbnVsbCwgIC8vIGRydWjDqSBpZCBjw61sb3bDqWhvIG9iamVrdHUgdiBwxZnDrXBhZMSbIHNsb8W+ZW7DqWhvIGtsw63EjWUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwQWc6IHR5cEFnLCAgLy8gdHlwIGFnZW5keSBjw61sb3bDqWhvIG9iamVrdHUgKG5lcG92aW5uw6kpXHJcbiAgICAgICAgICAgICAgICAgICAgLy9mYXplOiBudWxsLCAgLy8gZsOhemUgcG/FvmFkb3ZhbsOhIHBybyBvdGV2xZllbsOtIGPDrWxvdsOpaG8gb2JqZWt0dSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICBiYW5DdXJyZW50QXBwOiB0cnVlLCAvLyBwxZnDrXpuYWsgesOha2F6dSBwb3XFvml0w60gYWt0dcOhbG7DrSBmw6F6ZSAobmVwb3Zpbm7DqSlcclxuICAgICAgICAgICAgICAgICAgICBub0FwcEZhaWw6IGZhbHNlICAvLyBwxZnDrXpuYWsgdnl2b2zDoW7DrSB2w71qaW1reSBwxZlpIG5lbmFsZXplbsOtIGPDrWxvdsOpIGbDoXplIChuZXBvdmlubsOpKSBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcIk9wZW5EZXRhaWxcIiAgICAgICAgICAgIC8vIG7DoXpldiBtZXRvZHkgc3B1xaF0xJtuw6kgcG8gb3RldsWZZW7DrSBub3bDqSB6w6Fsb8W+a3lcclxuICAgICAgICAgICAgKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgV2ZsLkRpYWxvZ3MuRGV0YWlsRG9rdW1lbnR1U3Bpc3UodGhpcywgeyBTaW1wbGVNb2RlOiB0cnVlLCBEZXRhaWxEdG86IHsgaXhwOiBpeHAhIH0gfSwgR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLmF1dG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKipcclxuICAgICAgICAgKiBab2JyYXplbmkgdnNlY2ggemFwaXN1IHBybyBzYWxkb2tvbnRvXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcml2YXRlIHNob3daYXBpc3lBbGwoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IHR5cFVsb2h5ID0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvWmFwaXN5VnNlO1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBcInNlem5hbVNhbGRva29udG8jXCI7IC8vTk9URTogTXVzaSBieXQgc3Rlam5lIG5pIG5hIE1haW5BcHAuY3NcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBsZXQgcm93cyA9IGdyaWQuZ2dyaWQ8VWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8+KFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cyhmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RmlsdGVyKClcclxuICAgICAgICAgICAgICAgIC50aGVuKChmKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgZmlsdGVyOiBHRWtvRmlsdGVyRHRvO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0Lm5hdmlnYXRlKCdHb3JkaWMuVWNyLldlYkNsaWVudC5HU2V6bmFtRWtvWmF6bmFtdScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUeXBVbG9oeTogdHlwVWxvaHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEZpbHRlcjoge30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJvd3M6IHJvd3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFN0cmljdEZpbHRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRmlsdGVyU3RyUG9waXM6IGYuZmlsdGVyU3RyUG9waXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF1dG9Mb2FkRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDI4M1wiIC8vUkMgMzAyNTAyODMgOiBaw6FwaXN5IHNhbGRva29udGFcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIHNob3daYXBpc3koKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aXRsZSA9IFwianJlczozMTEwMDIyNFwiOyAvL1JDIDMxMTAwMjI0IDogWsOhcGlzeSBzdGF2dVxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RmlsdGVyKClcclxuICAgICAgICAgICAgICAgIC50aGVuKChmKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbCA9IGdyaWQuZ2dyaWQ8VWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8+KFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCAhPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gc2VsWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0eXBVbG9oeTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWQ6IHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyOiBHRWtvRmlsdGVyRHRvO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vTk9URTogT2Rwb3ZpZGEgeiBUSyBVQ1I6IEdTZXpuYW1aYXBpc3VWUmFka3VUYWIuTG9hZEdyaWREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlID0gXCJqcmVzOjMwMjUwMjc0XCIgLy9SQyAzMDI1MDI3NCA6IFrDoXBpc3kgc2FsZG9rb250YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFkZCA9IFwiXCI7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5nbG9iYWxzLlNhbGRva29udG9QYXJhbTEhLnRyaW0oKSAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkID0gdGhhdC5nbG9iYWxzLlNhbGRva29udG9QYXJhbTEhLnRyaW0oKSArIFwiOiBcIiArIHJvdyFbXCJ2YWx1ZTBcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMiEudHJpbSgpICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhZGQgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGQgKz0gXCIsIFwiICsgdGhhdC5nbG9iYWxzLlNhbGRva29udG9QYXJhbTIhLnRyaW0oKSArIFwiOiBcIiArIHJvdyFbXCJ2YWx1ZTFcIl0hLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGQgPSB0aGF0Lmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMSEudHJpbSgpICsgXCI6IFwiICsgcm93IVtcInZhbHVlMFwiXT8udHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhZGQgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZCA9IFwiIChcIiArIGFkZCArIFwiKVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSArPSBhZGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHsgc3RhcnQ6IHJvdy5pY28hLCBlbmQ6IHJvdy5pY28hIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IHsgc3RhcnQ6IHJvdy51Y3MhLCBlbmQ6IHJvdy51Y3MhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dXM6IHsgc3RhcnQ6IHJvdy51dXMhLCBlbmQ6IHJvdy51dXMhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBua3M6IHsgc3RhcnQ6IHJvdy5ua3MhLCBlbmQ6IHJvdy5ua3MhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNpYzogeyBzdGFydDogMCwgZW5kOiByb3cubWVzaWMgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyZF9tc2s6IHJvdy5kcmQhLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZnU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWE6IHsgc3RhcnQ6IHJvdy51ZWEhLCBlbmQ6IHJvdy51ZWEhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWViOiB7IHN0YXJ0OiByb3cudWViISwgZW5kOiByb3cudWViISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlYzogeyBzdGFydDogcm93LnVlYyEsIGVuZDogcm93LnVlYyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWQ6IHsgc3RhcnQ6IHJvdy51ZWQhLCBlbmQ6IHJvdy51ZWQhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVlOiB7IHN0YXJ0OiByb3cudWVlISwgZW5kOiByb3cudWVlISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZjogeyBzdGFydDogcm93LnVlZiEsIGVuZDogcm93LnVlZiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWc6IHsgc3RhcnQ6IHJvdy51ZWchLCBlbmQ6IHJvdy51ZWchIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVoOiB7IHN0YXJ0OiByb3cudWVoISwgZW5kOiByb3cudWVoISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlaTogeyBzdGFydDogcm93LnVlaSEsIGVuZDogcm93LnVlaSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWo6IHsgc3RhcnQ6IHJvdy51ZWohLCBlbmQ6IHJvdy51ZWohIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVrOiB7IHN0YXJ0OiByb3cudWVrISwgZW5kOiByb3cudWVrISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlbDogeyBzdGFydDogcm93LnVlbCEsIGVuZDogcm93LnVlbCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZW06IHsgc3RhcnQ6IHJvdy51ZW0hLCBlbmQ6IHJvdy51ZW0hIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVuOiB7IHN0YXJ0OiByb3cudWVuISwgZW5kOiByb3cudWVuISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlMDogeyBzdGFydDogcm93LnRlMCEsIGVuZDogcm93LnRlMCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTE6IHsgc3RhcnQ6IHJvdy50ZTEhLCBlbmQ6IHJvdy50ZTEhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGUyOiB7IHN0YXJ0OiByb3cudGUyISwgZW5kOiByb3cudGUyISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlMzogeyBzdGFydDogcm93LnRlMyEsIGVuZDogcm93LnRlMyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTQ6IHsgc3RhcnQ6IHJvdy50ZTQhLCBlbmQ6IHJvdy50ZTQhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU1OiB7IHN0YXJ0OiByb3cudGU1ISwgZW5kOiByb3cudGU1ISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlNjogeyBzdGFydDogcm93LnRlNiEsIGVuZDogcm93LnRlNiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTc6IHsgc3RhcnQ6IHJvdy50ZTchLCBlbmQ6IHJvdy50ZTchIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU4OiB7IHN0YXJ0OiByb3cudGU4ISwgZW5kOiByb3cudGU4ISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlOTogeyBzdGFydDogcm93LnRlOSEsIGVuZDogcm93LnRlOSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLlR5cFVsb2h5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpU3RhdjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cFVsb2h5ID0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZCA9IFwidWN0WmFwaXN5I1wiOyAvL05PVEU6IE11c2kgYnl0IHN0ZWpuZSBuaSBuYSBNYWluQXBwLmNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlJvenBvY2V0U3RhdjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cFVsb2h5ID0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5Sb3pwb2NldFphcGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBcInJvelphcGlzeSNcIjsgLy9OT1RFOiBNdXNpIGJ5dCBzdGVqbmUgbmkgbmEgTWFpbkFwcC5jc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwVWxvaHkgPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gXCJzZXpuYW1TYWxkb2tvbnRvI1wiOyAvL05PVEU6IE11c2kgYnl0IHN0ZWpuZSBuaSBuYSBNYWluQXBwLmNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBHRXJyb3IoXCJOb3RTdXBwb3J0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdmlnYXRlKCdHb3JkaWMuVWNyLldlYkNsaWVudC5HU2V6bmFtRWtvWmF6bmFtdScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUeXBVbG9oeTogdHlwVWxvaHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEZpbHRlcjogZmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdXJyZW50Um93OnJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU3RyaWN0RmlsdGVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBGaWx0ZXJTdHJQb3BpczogZi5maWx0ZXJTdHJQb3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXV0b0xvYWREYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0WmFwaXNGaWx0ZXIoKTogR0Vrb0ZpbHRlckR0byB7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiB7fTtcclxuICAgICAgICAgICAgdmFyIHNlbCA9IGdyaWQuZ2dyaWQoXCJnZXRTZWxlY3Rpb25cIiwgZmFsc2UpWzBdIGFzIFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICB1Y3M6IHsgc3RhcnQ6IHNlbC51Y3MsIGVuZDogc2VsLnVjcyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc2ljOiB7IHN0YXJ0OiBzZWwubWVzaWMsIGVuZDogc2VsLm1lc2ljIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWM6IHsgc3RhcnQ6IHNlbC5hYywgZW5kOiBzZWwuYWMgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB1Y3M6IHsgc3RhcnQ6IHNlbC51Y3MsIGVuZDogc2VsLnVjcyB9LFxyXG4gICAgICAgICAgICAgICAgZHJkX21zazogc2VsIS5kcmQhLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBtZXNpYzogeyBzdGFydDogc2VsLm1lc2ljLCBlbmQ6IHNlbC5tZXNpYyB9LFxyXG4gICAgICAgICAgICAgICAgYWM6IHsgc3RhcnQ6IHNlbC5hYywgZW5kOiBzZWwuYWMgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2RmlsdGVyKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVGaWx0ZXIodGhpcy5maWx0ZXJIaXN0b3J5Wy0tdGhpcy5jdXJyRmlsdGVySGlzdG9yeUluZGV4XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG5leHRGaWx0ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZUZpbHRlcih0aGlzLmZpbHRlckhpc3RvcnlbKyt0aGlzLmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXhdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgbW92ZUZpbHRlcihjdXJyRmlsdGVyOiBHU2V6bmFtRWtvWmF6bmFtdUdldERhdGFGaWx0ZXJEdG8pOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRGaWx0ZXJUb0hpc3RvcnkgPSBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBncmlkLmdncmlkc2VydmVyZmlsdGVyKFwiYXBwbHlcIiwgY3VyckZpbHRlci5maWx0ZXIhKTtcclxuICAgICAgICAgICAgLy9OT1RFOiBUb3RvIHphdGltIG5lYnVkZSBmdW5nb3ZhdCwgemFsZXppIG5hIHZhcmlhbnRlIGVsbWVudHUsIGt0ZXJhIHZ5aHJhamVcclxuICAgICAgICAgICAgLy90aGlzLmVsZW1lbnQuZmluZChcIi5nZmlsdGVycGFuZWxcIikuZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIiwgY3VyckZpbHRlci5lbGVtZW50eS5maWx0ZXJzKTtcclxuICAgICAgICAgICAgdGhpcy5kb0ZpbHRlckNsaWNrKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRvRmlsdGVyQ2xpY2soKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vTk9URTogVG90byBqZSBzcGF0bmUsIGFsZSBwcm8gdWthemt1IHN0YWNpIC0gamUgbnV0bmUgZmlsdHJvdmF0IGkgcyBlbGVtZW50eVxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZChcIi5nZmlsdGVycGFuZWxcIikuZmluZChcIi5qcy1obGF2bmlWeWhsZWRhdFwiKS50cmlnZ2VyKFwiY2xpY2tcIik7XHJcblxyXG4gICAgICAgICAgICAvL1RPRE86IFBvIHRlc3RlY2ggcyBkaXN0cmlidXRvcnkgdnNlIHpyZWZha3Rvcml0IG5hIHRha292eXRvIHphcGlzLCBtdXNpIGJ5dCBhbGUgcmFkbmUgb3Rlc3RvdmFuIHBybyB2c2VjaG55IHByaXBhZHlcclxuICAgICAgICAgICAgLy90aGlzLmdldEZpbHRlcih0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJnZXRDb25maXJtZWREYXRhXCIpKS50aGVuKChkKSA9PiB7IHRoaXMubG9hZERhdGEoZCk7IH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkaXNwYXRjaEZpbGxTZXJ2ZXJHcmlkRXZlbnQoZXY6IEpRdWVyeUV2ZW50T2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciAkY29sID0gJChldi50YXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFldi5jdHJsS2V5IHx8ICEkY29sLmhhc0NsYXNzKFwiY2VsbFwiKSB8fCAkY29sLmhhc0NsYXNzKFwianMtY2Z1LWNlbGxcIikpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChldi5zaGlmdEtleSAmJiBzZWxlY3Rpb24pIHNlbGVjdGlvbi5lbXB0eSgpOyAvL1Bva3VkIHNlIHZ5YmlyYSBwcmVzIGtsLiB6a3JhdGt1IGN0cmwrc2hpZnQrbGNsaWNrLCB0YWsgYXQgc2UgbmVvem5hY3VqZSB0ZXh0XHJcblxyXG4gICAgICAgICAgICB2YXIgY29sSW5kZXggPSAkY29sLmF0dHIoXCJkYXRhLWNvbHVtbi1pbmRleFwiKSE7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgdmFyIGNvbERlZiA9IGdyaWQuZ2dyaWQ8VWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8+KFwidHJ1ZUNvbHVtbnNcIiwgZmFsc2UpW2NvbEluZGV4XSBhcyBHR3JpZENvbHVtbjxVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bz47XHJcblxyXG4gICAgICAgICAgICBpZiAoY29sRGVmLnNlcnZlckZpbHRlcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlOiBhbnkgPSAkY29sLnRleHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm47IC8vTk9URTogUG9rdWQgbmVuaSBob2Rub3RhLCB0YWsgYXNpIG5lbmkgY28gcmVzaXQuIFJlc2kgaGxhdm5lIGJ1ZyBzIHRleHRvdm91IGhvZG5vdG91IHYgY2lzZWxueWNoIHNsb3VwY2ljaFxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzZWwgPSBncmlkLmdncmlkPFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPihcImdldFNlbGVjdGlvblwiLCBmYWxzZSlbMF07XHJcblxyXG4gICAgICAgICAgICAgICAgLy9OT1RFOiBUb2hsZSBqZSBzcGF0bnkgenB1c29iLCBjZWxlIGJ5IHRvIGNodGVsbyBwcmVwc2F0LCBhYnkgc2UgbmVzbG8gcG8gc3RyaW5ndSB6IGJ1bmt5LCBhbGUgcG8gZGF0ZWNoLiBcclxuICAgICAgICAgICAgICAgIC8vICAgICAgUG9wdGF0IHNlIFNrYWxpY2UsIGplc3RsaSBleGlzdHVqZSBuZWpha3kgbGVwc2kgenB1c29iLi4uXHJcbiAgICAgICAgICAgICAgICBpZiAoY29sRGVmLmNvbHVtblR5cGUgPT09IFwiZGF0ZXRpbWVcIikgdmFsdWUgPSBzZWxbY29sRGVmLm5hbWUhXTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbERlZi5jb2x1bW5UeXBlID09PSBcImN1cnJlbmN5XCIpIHZhbHVlID0gc2VsW2NvbERlZi5uYW1lIV07XHJcbiAgICAgICAgICAgICAgICAvL05PVEU6IFRvdG8gamUgdGFreSBzcGF0bmUsIHByb3RvemUgc2Ugb3BpcmEgbyBtb2RlbCwga3RlcnkgamUgc291Y2FzdGkgdiBwcmVmYWJ1IHV2bml0ci4gSmlueSB6cHVzb2IgYXNpIHphdGltIG5lbmkgOi0oXHJcbiAgICAgICAgICAgICAgICBpZiAgICAgIChjb2xEZWYubmFtZSA9PT0gXCJ0eXBfYWdcIikgIHZhbHVlID0geyB0eXBfYWc6IHNlbC50eXBfYWcsIHprcl9hZzogc2VsLnR5cF9hZ190eHQgfTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbERlZi5uYW1lID09PSBcImVzdV90eHRcIikgdmFsdWUgPSB7IGVzdV90eHQ6IHNlbC5lc3VfdHh0LCBpeHNfZXN1OiBzZWwuaXhzX2VzdSB9O1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sRGVmLm5hbWUgPT09IFwiZXN1X2ljb1wiKSB2YWx1ZSA9IHsgZXN1X2ljbzogc2VsLmVzdV9pY28sIGl4c19lc3U6IHNlbC5peHNfZXN1IH07XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjb2xEZWYubmFtZSA9PT0gXCJlc3VfcmNcIikgIHZhbHVlID0geyBlc3VfcmM6IHNlbC5lc3VfcmMsIGl4c19lc3U6IHNlbC5peHNfZXN1IH07XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjb2xEZWYubmFtZSA9PT0gXCJpeHNfZXN1XCIpIHZhbHVlID0geyBpeHNfZXN1OiBzZWwuaXhzX2VzdSB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciAkZmlsdGVyRnJtQm94ID0gZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcihcImZpbmRGaWVsZHNcIiwgY29sRGVmLm5hbWUhKTtcclxuICAgICAgICAgICAgICAgICRmaWx0ZXJGcm1Cb3guZ2ZpZWxkKFwic2V0VmFsdWVcIiwgdmFsdWUsIHsgdmFsaWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogUHJpcHJhdmEgcHJvIGdlbmVyb3Zhbmkgc2VzdGF2eSAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVwb3J0U3RhcnRpbmcocmk6IElHUHJpbnRBY3Rpb25SZXBvcnRTdGFydGluZzxHb3JkaWMuVWN0LkludGVyZmFjZS5HU2V6bmFtRWtvWmF6bmFtdUdlbmVyYXRvckR0bz4pOiBKUXVlcnlQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmlsdGVyKHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldENvbmZpcm1lZERhdGFcIikpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJpLmN1c3RvbUR0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwVWxvaHk6IHRoaXMuVHlwVWxvaHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcjogZi5maWx0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnR5OiBmLmVsZW1lbnR5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJTdHJQb3BpczogZi5maWx0ZXJTdHJQb3Bpc1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdG9nZ2xlR3JvdXBpbmcocHJvZmlsZU5hbWU/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAgICAgR0RsZy5hbGVydChcIlBybyBwxZllcG51dMOtIHpvYnJhemVuw60gbWV6aSAnRG9rbGFkeScgYSAnWsOhcGlzeScgcG91xb5panRlIHByb2ZpbHkgZ3JpZHUuXCIpO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxldCBjdXJyUHJvZmlsZSA9IGdyaWQuZ2dyaWQ8VWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8+KFwiZ2V0Q3VycmVudFByb2ZpbGVcIik7XHJcbiAgICAgICAgICAgIHByb2ZpbGVOYW1lID0gcHJvZmlsZU5hbWUgfHwgKGN1cnJQcm9maWxlLm5hbWUgIT09IHRoaXMucHJvZmlsZXMuZG9rbGFkeSEubmFtZSA/IHRoaXMucHJvZmlsZXMuZG9rbGFkeSEubmFtZSA6IHRoaXMucHJvZmlsZXMuZGVmYXVsdC5uYW1lKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJyUHJvZmlsZS5uYW1lID09PSBwcm9maWxlTmFtZSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGdyaWQuZ2dyaWQ8VWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8+KFwidXNlUHJvZmlsZVwiLCBwcm9maWxlTmFtZSk7XHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gQWx0ZXJuYXRpdmEsIGt0ZXJhIG11emUgZnVuZ292YXQgYmV6IHZpenVhbG5paG8gc2Vza3VwZW5pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2xldCB0YyA9IHRoaXMuJGdyaWQuZ2dyaWQ8R1Nlem5hbVphcGlzdVN0YXZ1RHRvPihcInRydWVDb2x1bW5zXCIpO1xyXG4gICAgICAgICAgICAvL2xldCBhZ2dycyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAvL2ZvciAodmFyIGkgPSAwOyBpIDwgdGMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gICAgaWYgKHRjW2ldLmFnZ3JlZ2F0ZSkgYWdncnMucHVzaCh0Y1tpXS5hZ2dyZWdhdGUpO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vdGhpcy4kZ3JpZC5nZ3JpZDxHU2V6bmFtWmFwaXN1U3RhdnVEdG8+KFwiZ2V0Vmlld1wiKS5wcm9jZXNzKHtcclxuICAgICAgICAgICAgLy8gICAgYWM6IG5ldyBHb3JkaWMuRGF0YS5Hcm91cGluZyhbe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgZGVmYXVsdFN0YXRlOiBcImNsb3NlZFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgaGFzaDogKG1ldGEsIHJvd3MpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB2YXIgZCA9IG1ldGEuZGF0YTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gYCR7ZC5hY318JHtkLm1lc2ljfXwke2Qucm9rfXwke2QubGljfXwke2QuaWNvfXwke2QudWNzfWA7IC8vTk9URTogUHJpZGF0IGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcImFjXCIpLCB1IHZzZWNoIHRlY2h0byBzbG91cGN1XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgc29ydDogXCJyb2ssbGljLGljbyx1Y3MsbWVzaWMsYWNcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5tdWx0aTxHU2V6bmFtWmFwaXN1U3RhdnVEdG8+KC4uLmFnZ3JzIGFzIGFueSlcclxuICAgICAgICAgICAgLy8gICAgfV0pXHJcbiAgICAgICAgICAgIC8vfSlcclxuXHJcbiAgICAgICAgICAgIC8vTk9URTogQWJ5IHByZWRjaG96aSBmdW5nb3ZhbG8sIGplIG51dG5lIHByaSB2eXR2b3Jlbmkgd2lkZ2V0dSBncmlkdSBwcmlkYXQgdGVudG8gcmFkZWsgZG8gb3B0aW9uczpcclxuICAgICAgICAgICAgLy9ncm91cGluZ0hlYWRlckNvbHVtbnM6IHtcclxuICAgICAgICAgICAgLy8gICAgJ2FjIzAnOiB7IGNlbGxUZW1wbGF0ZTogR29yZGljLlRlbXBsYXRlcy5lbnN1cmVUZW1wbGF0ZShcIjxzcGFuIGNsYXNzPSdncm91cC1oZWFkZXItY291bnQnPih7QHN0cnVjdHVyZS5yb3dzLmxlbmd0aH0pPC9zcGFuPlwiKSB9LFxyXG4gICAgICAgICAgICAvL30gYXMgYW55XHJcblxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXphdmlyYW5pIG9rbmFcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjbG9zaW5nKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoYXQuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250bykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZU5TID0gZmFsc2U7IGxldCB1c2VPUkcgPSBmYWxzZTsgbGV0IHVzZU9SSiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlciA9IHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldEN1cnJlbnREYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAoZmlsdGVyIGFzIGFueSkudm9sYnkhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChmaWx0ZXIgYXMgYW55KS52b2xieVtpXSA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VOUyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChmaWx0ZXIgYXMgYW55KS52b2xieVtpXSA9PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VPUkogPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoZmlsdGVyIGFzIGFueSkudm9sYnlbaV0gPT0gMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlT1JHID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0LnVzZXJTZXR0aW5ncyEuc2V0KFwidXNlZE5TXCIsIHVzZU5TKTtcclxuICAgICAgICAgICAgICAgIHRoYXQudXNlclNldHRpbmdzIS5zZXQoXCJ1c2VPUkdcIiwgdXNlT1JHKTtcclxuICAgICAgICAgICAgICAgIHRoYXQudXNlclNldHRpbmdzIS5zZXQoXCJ1c2VkT1JKXCIsdXNlT1JKKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBpbnRlcmZhY2UgSUdTZXpuYW1aYXBpc3VTdGF2dVJlc3VsdER0byB7XHJcbiAgICAgICAgU2V6bmFtWmFwaXN1OiBVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0b1tdO1xyXG4gICAgICAgIFN1bXk6IFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvXHJcbiAgICB9XHJcblxyXG4gICAgdHlwZSBJR1Nlem5hbVphcGlzdVN0YXZ1RHRvV2l0aFRhYlNldHRpbmdzID0gVWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8gJiB7IHRhYlNldHRpbmdzPzogSUdEZXRhaWxTdGF2WmFwaXNSYWRrdVRhYlNldHRpbmdzIH07XHJcblxyXG4gICAgaW50ZXJmYWNlIElHU2V6bmFtWmFwaXN1UHJvZmlsZXMge1xyXG4gICAgICAgIGRlZmF1bHQ6IEdyaWRQcm9maWxlPFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPjtcclxuICAgICAgICBkb2tsYWR5PzogR3JpZFByb2ZpbGU8VWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8+O1xyXG4gICAgfVxyXG5cclxuICAgIC8vY2xhc3MgR1VjclN1bW1hcnlQcm9jZXNzb3IgZXh0ZW5kcyBHb3JkaWMuRGF0YS5CYXNlUHJvY2Vzc29yPEdTZXpuYW1aYXBpc3VTdGF2dUR0bz4ge1xyXG4gICAgLy8gICAgdGllcnMgPSB7XHJcbiAgICAvLyAgICAgICAgdmlldzogeyBvcmRlcjogOTkgfVxyXG4gICAgLy8gICAgfVxyXG5cclxuICAgIC8vICAgIHByb2Nlc3ModGllcjogR29yZGljLkRhdGEuVmlld1RpZXJzLCBkYXRhOiBNZXRhUm93PEdTZXpuYW1aYXBpc3VTdGF2dUR0bz5bXSwgY29udGV4dDogR29yZGljLkRhdGEuRGF0YVN0cmVhbUNvbnRleHQ8R1Nlem5hbVphcGlzdVN0YXZ1RHRvPik6IE1ldGFSb3c8R1Nlem5hbVphcGlzdVN0YXZ1RHRvPltdIHwgbnVsbCB7XHJcbiAgICAvLyAgICAgICAgLy9kZWJ1Z2dlcjsgXHJcblxyXG5cclxuICAgIC8vICAgICAgICAvL1RPRE86IFBvbW9jdCBUS2FyZXNvdmkgcyBwcm9jZXNzb3JlbVxyXG5cclxuXHJcbiAgICAvLyAgICAgICAgLy9jb250ZXh0LlxyXG4gICAgLy8gICAgICAgIGRhdGEucHVzaCh7IF9pc01ldGE6IHRydWUsIGRhdGE6IHt1Y3M6IFwiMDAwXCIsIG1lc2ljOiAxLCBhYzogXCIxXCIsIGMwOiBcIjBcIiB9fSlcclxuXHJcbiAgICAvLyAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIFxyXG4gICAgLy8gICAgfVxyXG4gICAgLy99XHJcbn0iXX0=