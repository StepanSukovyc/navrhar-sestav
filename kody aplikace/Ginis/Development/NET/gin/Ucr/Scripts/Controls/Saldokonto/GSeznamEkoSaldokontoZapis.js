"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            class GSeznamEkoSaldokontoZapis extends WebClient.GSeznamEkoZaznamuBase {
                constructor(content) {
                    super(content);
                    this.logOptions = { name: "GSeznamEkoSaldokontoZapis", authorCode: 311, file: "GSeznamEkoZaznamuTS.ts" };
                    this.pouzivanStrukPopis = false;
                    this.povolenNahled = true;
                    // definice tasku pro seznam a nacteni poctu
                    this.taskList = this.parentCnt.isl.UcrUcetniZapis.list();
                    this.taskCount = this.parentCnt.isl.UcrUcetniZapis.count();
                    // moznost ukladani historie filtru
                    this.rememberHistory = true;
                    this.useTextyZRozvrhu = true;
                }
                onContentReady2() {
                    //this.globals = Gordic.Ucr.Globals.GUcrGlobals;
                    //this.zkratky = Gordic.Ucr.Globals.GZkr;
                    //this.texty = Gordic.Ucr.Globals.GTxt;
                    var that = this;
                    this.createActions();
                    this.parentCnt.menuBar(this.createMenubarDef(this.parentCnt.TypUlohy));
                    if (typeof this.detailInf !== "undefined" && this.detailInf.trim() != "")
                        this.parentCnt.statusBar([{ type: "static", caption: this.detailInf }]);
                    this.createFilterPanel();
                    let gridFormat = this.createGridFormat();
                    this.profiles = this.createProfiles(gridFormat);
                    let profilesArr = [this.profiles.default];
                    if (this.profiles.doklady)
                        profilesArr.push(this.profiles.doklady);
                    that.islView = new Gordic.Isl.View(that.parentCnt.isl.UcrUcetniZapis.list().use((req, next, ctx) => {
                        debugger;
                        return this.getFilterData(that, req, next);
                        //return next(req);
                    }), {
                        filterPanel: that.$filterPanel,
                        startEmpty: true
                    });
                    that.islView.on("change", function (ev, ctx) {
                        that._nastaveniAkci();
                    });
                    let sumCols = gridFormat.columns.filter(c => (c.columnType == "currency" || c.columnType == "number") && ("status,drd,mesic,den,rok".indexOf(c.name)) == -1).map(e => e.name);
                    $.newDiv(this.classGrid)
                        .appendTo(this.parentCnt.element)
                        .css("height", "100%")
                        .gautofit()
                        .ggrid({
                        //rowHeight: 32,
                        columnMode: "full", // fit (defaultne by melo byt toto), full
                        data: that.islView,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: function (ev, ctx) {
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
                        .on("gcfufilterinvalidvalueset", function (ev) {
                        that.reload();
                    });
                    //#region Kl. zkratky
                    this.createShortCut();
                    if (this.AutoLoadData)
                        that.reload();
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
                        that.nextFilterAct.enabled(that.currFilterHistoryIndex < that.filterHistory.length - 1);
                        that.prevFilterAct.enabled(that.currFilterHistoryIndex > 0);
                        //return this.getData(newFilter);
                        var newRequest = $.extend(true, {}, req);
                        let rq = {
                            RadekStavu: this.CurrentRow,
                            Maska: newFilter.filter,
                            Maska2: newFilter.filter,
                            TypUlohy: 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */,
                            Elementy: newFilter.elementy,
                            logovatGdpr: true,
                            maxRecords: -1,
                        };
                        newRequest["filters"] = rq;
                        return next(newRequest);
                    });
                }
                /**
                 * Vytvoreni klavesovych zkratek
                 *
                 * */
                createShortCut() {
                    let that = this;
                    this.parentCnt.element.gshortcut({
                        key: "INSERT",
                        description: "jres:31100226", //RC 31100226 : Načtení dat
                        group: Gordic.Shortcuts.Groups.Task,
                        canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        action: this.insAct
                    });
                    this.parentCnt.element.gshortcut({
                        key: "DELETE",
                        description: "jres:31100181", //RC 31100181 : Vyčistit
                        canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        group: Gordic.Shortcuts.Groups.Task,
                        action: this.clearFilterRowAct
                    });
                    this.parentCnt.element.gshortcut({
                        key: "1",
                        description: "jres:31100218", //RC 31100218 : Předchozí filtr
                        canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        group: Gordic.Shortcuts.Groups.Task,
                        action: this.prevFilterAct
                    });
                    this.parentCnt.element.gshortcut({
                        key: "0",
                        description: "jres:31100228", //RC 31100228 : Vyčistit a načíst
                        canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        group: Gordic.Shortcuts.Groups.Task,
                        action: this.clearAndFilterAct
                    });
                    const grid = this.getGrid();
                    if (grid !== null) {
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
                    }
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
                    {
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
                    var drdServerFilter = Gordic.Eko.Filters.drd(this.filterOptions.drd);
                    if (this.Zapisova) {
                        gf.addNumberColumn({
                            name: "den",
                            caption: "jres:31100053 ", //RC 31100053 : D
                            description: "jres:31100130", //RC 31100130 : Den
                            width: 30,
                            //serverFilter: Gordic.Eko.Filters.stringInterval({ model: "den", caption: "jres:31100053", disabled: !!(this.Filter && this.StrictFilter && this.Filter.den) }) //RC 31100053 : D
                            serverFilter: Gordic.Eko.Filters.stringInterval({
                                model: "den", caption: "jres:31100053", //RC 31100053 : D
                                disabled: !!(this.Filter && this.StrictFilter && this.Filter.den),
                                firstField: { validators: [new Gordic.Validators.Range({ min: 1, max: 31 })] },
                                secondField: { validators: [new Gordic.Validators.Range({ min: 1, max: 31 })] },
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
                        gf.addTextColumn({
                            name: "pdok",
                            caption: "jres:31100055", //RC 31100055 : Strukturovaný popis dokladu
                            hidden: true, //NOTE: V TK maji skryto, byva videt pole 'popis', kde je stejny prefab
                            width: 200,
                            serverFilter: Gordic.Eko.Filters.stringSingle({ model: "pdok", caption: "jres:31100055" }) //RC 31100055 : Strukturovaný popis dokladu
                        });
                    }
                    gf.addSortedEkoCfuSet(this.getCfuSetServerFilters(true));
                    if (this.Zapisova) {
                        if (this.parentCnt.TypUlohy == 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */) {
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
                    if (this.Zapisova)
                        gf.addTextColumn({
                            name: "popis",
                            caption: "jres:31100071", //RC 31100071 : Popis řádku
                            width: 200,
                            serverFilter: Gordic.Eko.Filters.stringSingle({ model: "popis", caption: "jres:31100071" }) //RC 31100071 : Popis řádku
                        });
                    if (this.Zapisova) {
                        gf.addTextColumn({
                            name: "ixp",
                            caption: "jres:31100075", //RC 31100075 : PID
                            description: "jres:31100251", //RC 31100251 : Prvotní identifikátor primárního dokladu
                            width: 110,
                            serverFilter: Gordic.Eko.Filters.ixp({ model: "ixp", caption: "jres:31100075" }) //RC 31100075 : PID
                        });
                        if (!this.globals.ExterniSumarizace) {
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
                        }
                    }
                    if (this.Zapisova)
                        gf.addTextColumn({
                            name: "typ_ag",
                            caption: "jres:31100079", //RC 31100079 : Agenda
                            width: 120,
                            cellTemplate: "{typ_ag_txt:trim:encode}",
                            grouping: {
                                aggregate: Gordic.Data.Aggregates.first("typ_ag_txt"),
                            },
                            serverFilter: Gordic.Ucr.WebClient.FilterPrefabs.typ_ag({ model: "typ_ag", zkr_agPath: "typ_ag_txt", isRozpocet: this.Rozpocet, caption: "jres:31100079" }) //RC 31100079 : Agenda
                        });
                    {
                        if (this.globals.TypPraceESU === 2 /* Gordic.Uct.Interface.GUcrTypPraceESU.Ne */) { }
                        else if (this.globals.RezimProvozu === 40 /* Gordic.Uct.Interface.GUcrRezimProvozu.SOR */ && this.globals.TypSumarizace === 1 /* Gordic.Uct.Interface.GUcrTypSumarizace.Externi */) { }
                        else {
                            gf.addTextColumn({
                                name: "esu_txt",
                                caption: "jres:31100080", //RC 31100080 : ESU
                                description: "jres:31100252", //RC 31100252 : Externí subjekt
                                width: 180,
                                serverFilter: this.parentCnt.TypUlohy == 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */ ? undefined : Gordic.Ucr.WebClient.FilterPrefabs.esu_txt({ model: "esu_txt", ixs_esuPath: "_esu_txt_ixs", caption: "jres:31100080" }) //RC 31100080 : ESU
                            });
                            gf.addTextColumn({
                                name: "esu_ico",
                                caption: "jres:31100080" + " " + this.zkratky.Ico, //RC 31100080 : ESU
                                description: "jres:31100253", //RC 31100253 : IČO Externího subjektu primárního dokladu
                                width: 80,
                                serverFilter: this.parentCnt.TypUlohy == 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */ ? undefined : Gordic.Ucr.WebClient.FilterPrefabs.esu_ico({ model: "esu_ico", ixs_esuPath: "_esu_ico_ixs", caption: "jres:31100080" + " " + this.zkratky.Ico }) //RC 31100080 : ESU
                            });
                            gf.addTextColumn({
                                name: "esu_rc",
                                caption: "jres:31100081", //RC 31100081 : ESU RČ
                                description: "jres:31100254", //RC 31100254 : Rodné číslo Externího subjektu primárního dokladu
                                width: 80,
                                serverFilter: this.parentCnt.TypUlohy == 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */ ? undefined : Gordic.Ucr.WebClient.FilterPrefabs.esu_rc({
                                    model: "esu_rc", ixs_esuPath: "_esu_txt_rc", caption: "jres:31100081", //RC 31100081 : ESU RČ
                                    Rad_Esu_RcVyhl: this.globals.Rad_Esu_RcVyhl
                                })
                            });
                        }
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
                                            let fpdata = _this.$filterPanel.gfilterpanel("getCurrentData");
                                            let filterStrPopis = fpdata?.filterStrPopis;
                                            let p = filterStrPopis?.find((s) => { return s.klic === c; });
                                            if (!p)
                                                return;
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
                    super.createActions();
                    const that = this;
                    this.detailAct = this.parentCnt.actions.add({
                        name: "detailAct",
                        caption: "jres:31100266", //RC 31100266 : Zobrazit detail
                        icon: "gi-detail",
                        enabled: false,
                        //visible: ( this.TypUlohy != Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto),
                        run: (ev, ctx) => { this.showDetail(); }
                    });
                    this.prevFilterAct = this.parentCnt.actions.add({
                        name: "prevFilterAct",
                        icon: "gi-arrow gi-rot180",
                        enabled: false,
                        caption: "jres:31100218", //RC 31100218 : Předchozí filtr
                        captionVisible: "never",
                        tooltip: "jres:31100220", //RC 31100220 : Návrat k předchozí hodnotě filtru a vyhledání.
                        run: (ev, ctx) => { this.prevFilter(); }
                    });
                    this.nextFilterAct = this.parentCnt.actions.add({
                        name: "nextFilterAct",
                        icon: "gi-arrow",
                        enabled: false,
                        caption: "jres:31100219", //RC 31100219 : Následující filtr
                        captionVisible: "never",
                        tooltip: "jres:31100221", //RC 31100221 : Vyplnění následujícího filtru a vyhledání.
                        run: (ev, ctx) => { this.nextFilter(); }
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
                        icon: "fa-external-link",
                        enabled: false,
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
                        caption: "jres:30250156", //RC 30250156 : Doklad RO
                        icon: "fa-external-link",
                        run: (ev, ctx) => { this.showPrimDoklad(undefined, "RO"); }
                    });
                    //this.clearFilterRowAct = this.parentCnt.actions.add({
                    //    name: "clearFilterRowAct",
                    //    caption: "jres:31100267", //RC 31100267 : Vyčistit filtr seznamu
                    //    icon: "gi-bin",
                    //    run: (ev, ctx) => { this.$filterPanel.gfilterpanel("clear"); }
                    //});
                    this.insAct = this.parentCnt.actions.add({
                        name: "insAct",
                        run: (ev, ctx) => {
                            this.getFilter(this.$filterPanel.gfilterpanel("getConfirmedData"))
                                .then(() => { this.doFilterClick(); });
                        }
                    });
                    this.clearAndFilterAct = this.parentCnt.actions.add({
                        name: "clearAndFilterAct",
                        run: (ev, ctx) => {
                            this.$filterPanel.gfilterpanel("clear");
                            this.getFilter(this.$filterPanel.gfilterpanel("getConfirmedData"))
                                .then(() => { this.doFilterClick(); });
                        }
                    });
                    this.selFilterAct = this.parentCnt.actions.add({
                        name: "selFilterAct",
                        run: (ev, ctx) => { this.dispatchFillServerGridEvent(ev); }
                    });
                    this.selFilterAndSearchAct = this.parentCnt.actions.add({
                        name: "selFilterAndSearchAct",
                        run: (ev, ctx) => {
                            this.dispatchFillServerGridEvent(ev);
                            this.doFilterClick();
                        }
                    });
                    this.dotAct = this.parentCnt.actions.add({
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
                            const grid = this.getGrid();
                            if (grid == null)
                                return;
                            grid
                                .ggridserverfilter("clear")
                                .ggridserverfilter("apply", this.getZapisFilter());
                            this.doFilterClick();
                        }
                    });
                    this.filterPidAct = this.parentCnt.actions.add({
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
                    });
                    this.shDokladyAct = this.parentCnt.actions.add({
                        name: "shDokladyAct",
                        enabled: false,
                        //NOTE: Jak to delaji v tlustym: GSeznamUctZaznamuStavyZapisyTab.m_ActionDoklady_Start(): 
                        //Provedou seskupeni, ktere pridaji jako nove radky a pak zafiltruji pouze na souctove radky
                        run: () => { this.toggleGrouping(this.profiles.doklady.name); }
                    });
                    this.shZapisyAct = this.parentCnt.actions.add({
                        name: "shZapisyAct",
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
                    //let fpForm: Gordic.Forms.Form;
                    //{
                    //    fpForm = new Gordic.Forms.Form({ tabLabel: "jres:30250052" }) //RC 30250052 : Filtr
                    //        .addSection()
                    //        .addRow(elmRowOpts)
                    //        .addField("gselectbox", Gordic.Eko.Prefabs.cfuElements({
                    //            name: "elementy",
                    //            //name: "filters",
                    //            id: this.parentCnt.taskId ? this.parentCnt.taskId + "_elementyField#" : undefined,
                    //            modelValueTransform: {
                    //                //apply: (modelValue) => { return modelValue; },
                    //                apply: (modelValue) => { return modelValue.filters; },
                    //                //collect: (fieldValue) => { return fieldValue; }
                    //                collect: (fieldValue) => { return { filters: fieldValue }; }
                    //            },
                    //            change: function (ev, obj) { that.parentCnt.log.trace("elementy", $(this).gfield("getValue")); },
                    //            gridFormat: gf,
                    //            canAddNewRecords: true,
                    //            canRemoveRecords: true,
                    //            createNewRecord: GElementUtils.createNewElementFunc(this.globals.RezimProvozu!, this.parentCnt.ekoParams),
                    //            clearRecord: GElementUtils.createClearElementFunc(this.globals.RezimProvozu!),
                    //            formatElementValueOptions: { skip: GElementUtils.getElementValueSkipColumns(this.globals.RezimProvozu!), nameColumn: "nazev" },
                    //        }));
                    //}
                    //this.$filterPanel = $.newDiv()
                    //    .appendTo(this.parentCnt.element)
                    //    .gfilterpanel({
                    //        forms: [fpForm],
                    //        favorites: ["md"],
                    //        favoriteLayoutDescriptor: "L5M3S1 L-12-12-0 M-12-12-0 S-12-12-0",
                    //        searchButtonOnMainRow: true,
                    //        saveOptionsForm: GUcrMaskaDetail.getForm(gf as any), //TODO: Dat spravny typ gridformatu!
                    //        filterStorageService: new GUcrMaskaService({ typSestavy: this.typSestavy, parentContent: this.parentCnt, fragments: "*,elementy" }),
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
                    //        poVyhledaniZobrazitUserSettings: "Deny" //NOTE: Zakazuje prepinani po vyhledani - pokud se nekdo pokousel vymazat filtr v tomto rezimu, tak musel kliknout na vyhledat, viz T3987
                    //        //TODO: Pridat formatovani pro pripady, kdy jsou oblibene na fitrpanelu schovane
                    //        //badgeData: (ev, o) => {
                    //        //    let d = o.data.elementy;
                    //        //    if (!d || !d.filters)
                    //        //        return;
                    //        //    o.tooltip = "Elementy:<br/>";
                    //        //    o.tooltip += Gordic.Eko.Prefabs.formatElementValues(gf as any, d.filters).html();
                    //        //    o.tooltip = o.tooltip.replace("OR", "<br/>");
                    //        //}
                    //    });
                }
                /**
                 * Nacteni dat pro saldokonto
                 * @param def
                 * @param maska
                 * @param rq
                 */
                getDataSaldokonto(def, maska, rq) {
                    let that = this;
                    this.parentCnt.beginOperation("");
                    that.parentCnt.isl.UcrSaldokonto.listData({ maska: maska, rq: rq })
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
                        //var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that.parentCnt, obj, type, rq, null as any);
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeptionNew(that.parentCnt, jqXHR, rq, null);
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
                                    that.parentCnt.endOperation();
                                    return def.reject();
                                }
                                else {
                                    that.parentCnt.endOperation();
                                    return def.resolve();
                                }
                            }).catch(def.reject);
                            return def.promise();
                        }
                        that.parentCnt.endOperation();
                        throw jqXHR;
                    })
                        .always(() => {
                        that.parentCnt.endOperation();
                    });
                    return def.promise();
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
                //        globals: this.globals,
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
                    let id = "seznamSaldokonto#"; //NOTE: Musi byt stejne ni na MainApp.cs
                    const grid = that.getGrid();
                    if (grid == null)
                        return;
                    let rows = grid.ggrid("getView").getDataRows(false);
                    this.getFilter()
                        .then((f) => {
                        //let filter: GEkoFilterDto;
                        return that.parentCnt.navigate('Gordic.Ucr.WebClient.GSeznamEkoZaznamu', {
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
                //private getZapisFilter(): GEkoFilterDto {
                //    var sel = this.$grid.ggrid("getSelection", false)[0] as GSeznamZapisuStavuDto;
                //    if (this.parentCnt.TypUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto)
                //        return {
                //            ucs: { start: sel.ucs, end: sel.ucs },
                //            mesic: { start: sel.mesic, end: sel.mesic },
                //            ac: { start: sel.ac, end: sel.ac }
                //        };
                //    return {
                //        ucs: { start: sel.ucs, end: sel.ucs },
                //        drd_msk: sel!.drd!.toString(),
                //        mesic: { start: sel.mesic, end: sel.mesic },
                //        ac: { start: sel.ac, end: sel.ac }
                //    };
                //}
                //private doFilterClick(): void {
                //    //NOTE: Toto je spatne, ale pro ukazku staci - je nutne filtrovat i s elementy
                //    this.parentCnt.element.find(".gfilterpanel").find(".js-hlavniVyhledat").click();
                //    //TODO: Po testech s distributory vse zrefaktorit na takovyto zapis, musi byt ale radne otestovan pro vsechny pripady
                //    //this.getFilter(this.$filterPanel.gfilterpanel("getConfirmedData")).then((d) => { this.loadData(d); });
                //}
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
            WebClient.GSeznamEkoSaldokontoZapis = GSeznamEkoSaldokontoZapis;
            //interface IGSeznamZapisuStavuResultDto {
            //    SeznamZapisu: Uct.Interface.GSeznamZapisuStavuDto[];
            //    Sumy: Uct.Interface.GSeznamZapisuStavuDto
            //}
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUVrb1NhbGRva29udG9aYXBpcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTZXpuYW1Fa29TYWxkb2tvbnRvWmFwaXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQSt3Q2Y7QUEvd0NELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQSt3Q25CO0lBL3dDZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBK3dDN0I7UUEvd0NvQixXQUFBLFNBQVM7WUFFMUIsTUFBYSx5QkFBMEIsU0FBUSxVQUFBLHFCQUFxQjtnQkFnQ2hFLFlBQVksT0FBcUM7b0JBQzdDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFGbkIsZUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLDJCQUEyQixFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixFQUFFLENBQUM7b0JBR2hHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO29CQUMxQiw0Q0FBNEM7b0JBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUN6RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDM0QsbUNBQW1DO29CQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztvQkFDNUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztnQkFDakMsQ0FBQztnQkFDTSxlQUFlO29CQUNsQixnREFBZ0Q7b0JBQ2hELHlDQUF5QztvQkFDekMsdUNBQXVDO29CQUN2QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBR2hCLElBQUksQ0FBQyxhQUFhLEVBQUUs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RSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO2dDQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtnQ0FDdkMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssRUFBRTtnQ0FDbkMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxHQUFJLENBQUMsUUFBUSxFQUFFO2dDQUM1QixHQUFHLEVBQUU7b0NBQ0QsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FB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bnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbUVrb1NhbGRva29udG9aYXBpcyBleHRlbmRzIEdTZXpuYW1Fa29aYXpuYW11QmFzZSBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcbiAgICAgICAgLyoqIEdsb2JhbG5pIG1vZHVsb3ZlIHBhcmFtZXRyeSB2IEpTICovXHJcbiAgICAgICAgLy9nbG9iYWxzOiBHb3JkaWMuVWNyLldlYkNsaWVudC5EdG8uR1Vjckdsb2JhbHNEdG87XHJcbiAgICAgICAgLy96a3JhdGt5OiBHb3JkaWMuVWNyLldlYkNsaWVudC5EdG8uR1VjclprckR0bztcclxuICAgICAgICAvL3RleHR5OiBHb3JkaWMuVWNyLldlYkNsaWVudC5EdG8uR1VjclprckR0bztcclxuXHJcblxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgYWRkU3RyUG9waXNDb2x1bW5zPzogc3RyaW5nW107ICAgLy9TZXpuYW0gc2xvdXBjdSBzdHIuIHBvcGlzdSwga3RlcmUgYnkgbWVseSBieXQgcHJpZGFueSBkbyBncmlkdSAocG91emUgcHJvIFphcGlzeVVjZXRuaWN0dmkpICgpXHJcblxyXG4gICAgICAgIHByaXZhdGUgZGV0YWlsQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgcHJldkZpbHRlckFjdDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIG5leHRGaWx0ZXJBY3Q6IEdBY3Rpb247XHJcblxyXG4gICAgICAgIHByaXZhdGUgemFwaXN5QWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgemFwaXN5QWxsQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgZG9rbGFkQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgcHJpbWRva2xhZEFjdDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIGRva2xhZFJPQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgZG9rbGFkQkxLQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgaW5zQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgY2xlYXJBbmRGaWx0ZXJBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBzZWxGaWx0ZXJBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBzZWxGaWx0ZXJBbmRTZWFyY2hBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBmaWx0ZXJQaWRBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBzaERva2xhZHlBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBzaFphcGlzeUFjdDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIHphdHJpZGl0QWN0OiBHQWN0aW9uO1xyXG5cclxuICAgICAgICAvKiogTGltaXQgcG9jdHUgbmFjaXRhbnljaCB6YXpuYW11LCBwb2t1ZCBuZWRvamRlIGsgcG90dnJ6ZW5pLCB6ZSB1eml2YXRlbCBjaGNlIGppdCBwcmVzIGxpbWl0ICovXHJcbiAgICAgICAgc3VtTGltaXQ6IG51bWJlcjtcclxuICAgICAgICBsb2dPcHRpb25zID0geyBuYW1lOiBcIkdTZXpuYW1Fa29TYWxkb2tvbnRvWmFwaXNcIiwgYXV0aG9yQ29kZTogMzExLCBmaWxlOiBcIkdTZXpuYW1Fa29aYXpuYW11VFMudHNcIiB9O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IEdTZXpuYW1Fa29aYXpuYW11QmFzZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgc3VwZXIoY29udGVudCk7XHJcbiAgICAgICAgICAgIHRoaXMucG91eml2YW5TdHJ1a1BvcGlzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucG92b2xlbk5haGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNlIHRhc2t1IHBybyBzZXpuYW0gYSBuYWN0ZW5pIHBvY3R1XHJcbiAgICAgICAgICAgIHRoaXMudGFza0xpc3QgPSB0aGlzLnBhcmVudENudC5pc2wuVWNyVWNldG5pWmFwaXMubGlzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tDb3VudCA9IHRoaXMucGFyZW50Q250LmlzbC5VY3JVY2V0bmlaYXBpcy5jb3VudCgpO1xyXG4gICAgICAgICAgICAvLyBtb3pub3N0IHVrbGFkYW5pIGhpc3RvcmllIGZpbHRydVxyXG4gICAgICAgICAgICB0aGlzLnJlbWVtYmVySGlzdG9yeSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMudXNlVGV4dHlaUm96dnJodSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBvbkNvbnRlbnRSZWFkeTIoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5nbG9iYWxzID0gR29yZGljLlVjci5HbG9iYWxzLkdVY3JHbG9iYWxzO1xyXG4gICAgICAgICAgICAvL3RoaXMuemtyYXRreSA9IEdvcmRpYy5VY3IuR2xvYmFscy5HWmtyO1xyXG4gICAgICAgICAgICAvL3RoaXMudGV4dHkgPSBHb3JkaWMuVWNyLkdsb2JhbHMuR1R4dDtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5tZW51QmFyKHRoaXMuY3JlYXRlTWVudWJhckRlZih0aGlzLnBhcmVudENudC5UeXBVbG9oeSkpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGV0YWlsSW5mICE9PSBcInVuZGVmaW5lZFwiICYmIHRoaXMuZGV0YWlsSW5mLnRyaW0oKSAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuc3RhdHVzQmFyKFt7IHR5cGU6IFwic3RhdGljXCIsIGNhcHRpb246IHRoaXMuZGV0YWlsSW5mIH1dKVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZpbHRlclBhbmVsKCk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgZ3JpZEZvcm1hdCA9IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnByb2ZpbGVzID0gdGhpcy5jcmVhdGVQcm9maWxlcyhncmlkRm9ybWF0KTtcclxuICAgICAgICAgICAgbGV0IHByb2ZpbGVzQXJyID0gW3RoaXMucHJvZmlsZXMuZGVmYXVsdF07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2ZpbGVzLmRva2xhZHkpIHByb2ZpbGVzQXJyLnB1c2godGhpcy5wcm9maWxlcy5kb2tsYWR5KTtcclxuICAgICAgICAgICAgdGhhdC5pc2xWaWV3ID0gbmV3IEdvcmRpYy5Jc2wuVmlldzxJR1Nlem5hbVphcGlzdVN0YXZ1RHRvV2l0aFRhYlNldHRpbmdzPihcclxuICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmlzbC5VY3JVY2V0bmlaYXBpcy5saXN0KFxyXG4gICAgICAgICAgICAgICAgKS51c2UoKHJlcSwgbmV4dCwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmlsdGVyRGF0YSh0aGF0LCByZXEsIG5leHQpIGFzIGFueTtcclxuICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBuZXh0KHJlcSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclBhbmVsOiB0aGF0LiRmaWx0ZXJQYW5lbCxcclxuICAgICAgICAgICAgICAgICAgICBzdGFydEVtcHR5OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoYXQuaXNsVmlldy5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZXYsIGN0eCkgeyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhhdC5fbmFzdGF2ZW5pQWtjaSgpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGxldCBzdW1Db2xzID0gZ3JpZEZvcm1hdC5jb2x1bW5zLmZpbHRlcihjID0+IChjLmNvbHVtblR5cGUgPT0gXCJjdXJyZW5jeVwiIHx8IGMuY29sdW1uVHlwZSA9PSBcIm51bWJlclwiKSAmJiAoXCJzdGF0dXMsZHJkLG1lc2ljLGRlbixyb2tcIi5pbmRleE9mKGMubmFtZSEpKSA9PSAtMSkubWFwKGUgPT4gZS5uYW1lKSBhcyBzdHJpbmdbXTtcclxuICAgICAgICAgICAgJC5uZXdEaXYodGhpcy5jbGFzc0dyaWQpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5wYXJlbnRDbnQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICAvL3Jvd0hlaWdodDogMzIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsICAgICAvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQuaXNsVmlldyxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7ICAgICAvL29ic2x1em5hIGFrY2UsIGt0ZXJhIHNlIHNwb3VzdGkgZGJsIGNsaWNrZW0gbmFkIHJhZGtlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRSb3dTZWxlY3RlZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dEZXRhaWwoY3R4LmNlbGxJbmZvLmRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1wicG9waXNcIiwgXCJhY1wiXSwgLy9zbG91cGNlLCBwb2RsZSBrdGVyeWNoIHNlIHZ5aGxlZGF2YSB2IHNlYXJjaGJveHUgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpIGFzIGFueSxcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZTogdGhpcy5wcm9maWxlcy5kZWZhdWx0LCAvL3Nrcnl0ZSBzbG91cGNlIHJlc2l0IHByZXMgY29sdW1uLmhpZGRlbiArIGNvbHVtbkxpc3QgLSB1eml2YXRlbGkganNvdSBza3J5dGUsIG11emUgc2kgamUgdm9saXRlbG5lIHphcG5vdXRcclxuICAgICAgICAgICAgICAgICAgICBwcm9maWxlczogcHJvZmlsZXNBcnIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dE1lbnU6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuY2xlYXJGaWx0ZXJSb3dBY3QgfVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiAoZXYsIHNlbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3ByZXZpZXdTaWRlYmFyLmVtcHR5KCkuYXBwZW5kKFwiPGRpdj5cIiArIHNlbC5nZXRTZWxlY3Rpb24oZmFsc2UpWzBdLml4cCArIFwiPC9kaXY+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcyA9IHNlbC5nZXRTZWxlY3Rpb24oZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3RBY3QuZW5hYmxlZChzLmxlbmd0aCA+IDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmICh0aGlzLnByZXZpZXdDb250cm9sbGVyICYmIHR5cGVvZiB0aGlzLnByZXZpZXdDb250cm9sbGVyICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyPy5zaG93KHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vY2VsbEFjdGl2YXRlOiBmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKFwiY2VsbEFjdGl2YXRlXCIsIGFyZ3VtZW50cyk7fSAvL05PVEU6IE5lZG9zdGFudSBzZSBrIHB1dm9kbmkgdWRhbG9zdGksIGFieWNoIHpqaXN0aWwsIHpkYSBzZSBkcnppIGN0cmxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWRla28oXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzb3XEjXRvdsO9IMWZw6FkZWtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeVJvd0FsbG93ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnlSb3dDb2x1bW5zOiBzdW1Db2xzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRsb3Vow70gc2V6bmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbG9uZ0xpc3RBbGxvd2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xvbmdMaXN0TW9kZWw6IFwiR2xvYmFsLlVjci5BcHBTZXR0aW5nc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xvbmdMaXN0Q291bnRNZXRob2Q6IChycSkgPT4gdGhhdC5pc2wuWmFwb2N0b3Z5TGlzdC5saXN0Q291bnQocnEpLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkc2VydmVyZmlsdGVyKHtcclxuICAgICAgICAgICAgICAgICAgICAvL2ludmFsaWRWYWx1ZUNoYW5nZWQ6IGZ1bmN0aW9uIChldikgeyB0aGF0LmxvYWREYXRhKCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWZhdWx0RGF0YTogeyBua3M6IHsgc3RhcnQ6IFwiMDAwMDA0XCIsIGVuZDogXCIwMDAwMDRcIiB9IH1cclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0RGF0YTogdGhpcy5GaWx0ZXJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAub24oXCJnY2Z1ZmlsdGVyaW52YWxpZHZhbHVlc2V0XCIsIGZ1bmN0aW9uIChldikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucmVsb2FkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gS2wuIHprcmF0a3lcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVTaG9ydEN1dCgpO1xyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuQXV0b0xvYWREYXRhKVxyXG4gICAgICAgICAgICAgICAgdGhhdC5yZWxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICAqIE5hY3RpIGZpbHRyeVxyXG4gICAgICAgICAgKiBAcGFyYW0gdGhhdFxyXG4gICAgICAgICAgKiBAcGFyYW0gcmVxXHJcbiAgICAgICAgICAqIEBwYXJhbSBuZXh0XHJcbiAgICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBnZXRGaWx0ZXJEYXRhKHRoYXQ6IHRoaXMsIHJlcTogSXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIG5leHQ6IElzbC5UYXNrUnVudGltZU5leHQ8SXNsLkdTZXJ2aWNlTGlzdFJlcXVlc3QsIElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxVY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0bz4+IHwgSXNsLlRhc2tSdW50aW1lTmV4dDxJc2wuR1NlcnZpY2VMaXN0UmVxdWVzdCwgbnVtYmVyPik6IElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxVY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0bz4gfCBKUXVlcnlQcm9taXNlPElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxVY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0bz4+IHwgSlF1ZXJ5UHJvbWlzZTxudW1iZXI+IFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuZ2V0RmlsdGVyKHRoYXQuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldEN1cnJlbnREYXRhXCIpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKG5ld0ZpbHRlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmFkZEZpbHRlclRvSGlzdG9yeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4ICE9PSB0aGF0LmZpbHRlckhpc3RvcnkubGVuZ3RoIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVySGlzdG9yeS5zcGxpY2UodGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4ICsgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbHRlckhpc3RvcnkucHVzaChuZXdGaWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hZGRGaWx0ZXJUb0hpc3RvcnkgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm5leHRGaWx0ZXJBY3QuZW5hYmxlZCh0aGF0LmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXggPCB0aGF0LmZpbHRlckhpc3RvcnkubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2RmlsdGVyQWN0LmVuYWJsZWQodGhhdC5jdXJyRmlsdGVySGlzdG9yeUluZGV4ID4gMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMuZ2V0RGF0YShuZXdGaWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdSZXF1ZXN0ID0gJC5leHRlbmQodHJ1ZSwge30sIHJlcSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJxOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0WmFwaXNMaXN0UmVxdWVzdER0byA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmFkZWtTdGF2dTogdGhpcy5DdXJyZW50Um93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBNYXNrYTogbmV3RmlsdGVyLmZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIE1hc2thMjogbmV3RmlsdGVyLmZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIFR5cFVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIEVsZW1lbnR5OiBuZXdGaWx0ZXIuZWxlbWVudHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBsb2dvdmF0R2RwcjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAsIG1heFJlY29yZHM6IC0xLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UmVxdWVzdFtcImZpbHRlcnNcIl0gPSBycTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dChuZXdSZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBrbGF2ZXNvdnljaCB6a3JhdGVrXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlU2hvcnRDdXQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuZWxlbWVudC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcIklOU0VSVFwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyNlwiLCAvL1JDIDMxMTAwMjI2IDogTmHEjXRlbsOtIGRhdFxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgICAgICBjYW5FeGVjdXRlOiAoZXYpID0+IHsgcmV0dXJuIGV2LnRhcmdldC50YWdOYW1lICE9PSBcIklOUFVUXCI7IH0sXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuaW5zQWN0XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuZWxlbWVudC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAga2V5OiBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDE4MVwiLCAvL1JDIDMxMTAwMTgxIDogVnnEjWlzdGl0XHJcbiAgICAgICAgICAgICAgICBjYW5FeGVjdXRlOiAoZXYpID0+IHsgcmV0dXJuIGV2LnRhcmdldC50YWdOYW1lICE9PSBcIklOUFVUXCI7IH0sXHJcbiAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuVGFzayxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5jbGVhckZpbHRlclJvd0FjdFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmVsZW1lbnQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogXCIxXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjE4XCIsIC8vUkMgMzExMDAyMTggOiBQxZllZGNob3rDrSBmaWx0clxyXG4gICAgICAgICAgICAgICAgY2FuRXhlY3V0ZTogKGV2KSA9PiB7IHJldHVybiBldi50YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiOyB9LFxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMucHJldkZpbHRlckFjdFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmVsZW1lbnQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogXCIwXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjI4XCIsIC8vUkMgMzExMDAyMjggOiBWecSNaXN0aXQgYSBuYcSNw61zdFxyXG4gICAgICAgICAgICAgICAgY2FuRXhlY3V0ZTogKGV2KSA9PiB7IHJldHVybiBldi50YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiOyB9LFxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuY2xlYXJBbmRGaWx0ZXJBY3RcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGdyaWQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgICAgIGtleTogXCJjdHJsK3NoaWZ0K2xjbGlja1wiLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkdyaWQsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjI5XCIsIC8vUkMgMzExMDAyMjkgOiBQxZllbmVzZW7DrSBob2Rub3R5IGRvIGZpbHRydS5cclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5zZWxGaWx0ZXJBY3RcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ3JpZC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJjdHJsK2xjbGlja1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMzVcIiwgLy9SQyAzMTEwMDIzNSA6IFDFmWVuZXNlbsOtIGhvZG5vdHkgZG8gZmlsdHJ1IGEgdnlobGVkw6Fuw60uXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLnNlbEZpbHRlckFuZFNlYXJjaEFjdFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ3JpZC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGtleTogW1wiLlwiLCBcIixcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9OT1RFOiBEZXNjcmlwdGlvbiBvcHNhbm8geiBuYXBvdmVkeSBrIFRLIFVDUlxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMjdcIiwgLy9SQyAzMTEwMDIyNyA6IFpvYnJhemVuw60gdsWhZWNoIHrDoXBpc8WvIGRva2xhZMWvIChjZWzDvSBkb2tsYWQpIG5hZCBvem5hxI1lbsO9bSB6w6FwaXNlbS5cclxuICAgICAgICAgICAgICAgICAgICBjYW5FeGVjdXRlOiAoZXYpID0+IHsgcmV0dXJuIGV2LnRhcmdldC50YWdOYW1lICE9PSBcIklOUFVUXCI7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkdyaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmRvdEFjdFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvLyomR1Nlem5hbVphcGlzdVN0YXZ1RHRvKi8+IHtcclxuICAgICAgICAgICAgdmFyIGdmID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvIC8qJiBHU2V6bmFtWmFwaXN1U3RhdnVEdG8qLz4gKCk7XHJcbiAgICAgICAgICAgIC8vdmFyIHRvcG9Hcm91cCA9IFwidG9wb1wiO1xyXG5cclxuICAgICAgICAgICAgZ2YuYWRkU3RydWN0dXJlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rbGFkeVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjMxXCIsIC8vUkMgMzExMDAyMzEgOiBEb2tsYWR5XHJcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXBpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcHJlc2V0Q2FwdGlvbjogXCJqcmVzOjMxMTAwMjMxXCIsIC8vUkMgMzExMDAyMzEgOiBEb2tsYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNoOiAobWV0YSwgcm93cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkID0gbWV0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtkLmFjfXwke2QubWVzaWN9fCR7ZC5yb2t9fCR7ZC5saWN9fCR7ZC5pY299fCR7ZC51Y3N9YDsgLy9OT1RFOiBQcmlkYXQgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwiYWNcIiksIHUgdnNlY2ggdGVjaHRvIHNsb3VwY3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInJvayxsaWMsaWNvLHVjcyxtZXNpYyxhY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUNvbHVtbjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF0dXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyNzhcIiwgLy9SQyAzMDI1MDI3OCA6IFN0YXR1c1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKHJvdywgbWV0YSwgY2VsbEluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobWV0YT8uX2lzU3VtbWFyeSkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cuc3RhdHVzID09PSBudWxsIHx8IHJvdy5zdGF0dXMgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk9LXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk5cIjsgXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RhdHVzKHsgbW9kZWw6IFwic3RhdHVzXCIsIGNhcHRpb246IFwianJlczozMDI1MDI5MlwiIH0pIC8vUkMgMzAyNTAyOTIgOiBTdGF0dXNcclxuICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7IG5hbWU6IFwic3RhdHVzXCIsIG1vZGVsOiBcInN0YXR1c1wiIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLlNhbGRva29udG9QYXJhbTEhLnRyaW0oKSAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbHVlMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMSEudHJpbSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbmFtZTogXCJ2YWx1ZTBcIiwgbW9kZWw6IFwidmFsdWUwXCIsIGNhcHRpb246IHRoaXMuZ2xvYmFscy5TYWxkb2tvbnRvUGFyYW0xLnRyaW0oKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5TYWxkb2tvbnRvUGFyYW0yIS50cmltKCkgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWx1ZTFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5nbG9iYWxzLlNhbGRva29udG9QYXJhbTIhLnRyaW0oKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG5hbWU6IFwidmFsdWUxXCIsIG1vZGVsOiBcInZhbHVlMVwiLCBjYXB0aW9uOiB0aGlzLmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMi50cmltKCkgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMubmtzKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGRyZFNlcnZlckZpbHRlciA9IEdvcmRpYy5Fa28uRmlsdGVycy5kcmQodGhpcy5maWx0ZXJPcHRpb25zLmRyZCk7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuWmFwaXNvdmEpIHtcclxuICAgICAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTMgXCIsIC8vUkMgMzExMDAwNTMgOiBEXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDEzMFwiLCAvL1JDIDMxMTAwMTMwIDogRGVuXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJkZW5cIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDUzXCIsIGRpc2FibGVkOiAhISh0aGlzLkZpbHRlciAmJiB0aGlzLlN0cmljdEZpbHRlciAmJiB0aGlzLkZpbHRlci5kZW4pIH0pIC8vUkMgMzExMDAwNTMgOiBEXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkZW5cIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDUzXCIsIC8vUkMgMzExMDAwNTMgOiBEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhISh0aGlzLkZpbHRlciAmJiB0aGlzLlN0cmljdEZpbHRlciAmJiB0aGlzLkZpbHRlci5kZW4pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDEsIG1heDogMzEgfSldIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZEZpZWxkOiB7IHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDEsIG1heDogMzEgfSldIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsaWNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkxJQ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwibGljXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vLy9zZXJ2ZXJGaWx0ZXI6IC8vVE9ET1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBkb2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTVcIiwgLy9SQyAzMTEwMDA1NSA6IFN0cnVrdHVyb3ZhbsO9IHBvcGlzIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsICAgICAgICAgICAvL05PVEU6IFYgVEsgbWFqaSBza3J5dG8sIGJ5dmEgdmlkZXQgcG9sZSAncG9waXMnLCBrZGUgamUgc3Rlam55IHByZWZhYlxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nU2luZ2xlKHsgbW9kZWw6IFwicGRva1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTVcIiB9KSAvL1JDIDMxMTAwMDU1IDogU3RydWt0dXJvdmFuw70gcG9waXMgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFNvcnRlZEVrb0NmdVNldCh0aGlzLmdldENmdVNldFNlcnZlckZpbHRlcnModHJ1ZSkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5aYXBpc292YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQmFsYW5jb3ZhbmlaYXBpcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDVcIiwgLy9SQyAzMDI1MDE0NSA6IE1EIHDFr3YuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAxNDVcIiwgLy9SQyAzMTEwMDI0MyA6IE3DoSBEw6F0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDVcIiB9KSAvL1JDIDMwMjUwMTQ1IDogTUQgcMWvdi5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBfbmV3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE0NlwiLCAvL1JDIDMwMjUwMTQ2IDogTUQgbm92w6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDE0NlwiLCAvL1JDIDMxMTAwMjQzIDogTcOhIETDoXRpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwX25ld1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDZcIiB9KSAvL1JDIDMwMjUwMTQ2IDogTUQgbm92w6lcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBjMF9wcm9jXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE0N1wiLCAvL1JDIDMwMjUwMTQ3IDogICVcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDE0N1wiLCAvL1JDIDMxMTAwMjQzIDogTcOhIETDoXRpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDZcIiB9KSAvL1JDIDMwMjUwMTQ2IDogTUQgbm92w6lcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTQ4XCIsIC8vUkMgMzAyNTAxNDkgOiBEYWwgbm92w6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDE0OFwiLCAvL1JDIDMxMTAwMjQzIDogTcOhIETDoXRpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMxXCIsIGNhcHRpb246IFwianJlczozMDI1MDE0OFwiIH0pIC8vUkMgMzAyNTAxNDYgOiBNRCBub3bDqVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMV9uZXdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTQ5XCIsIC8vUkMgMzAyNTAxNDkgOiBEYWwgbm92w6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDE0OVwiLCAvL1JDIDMwMjUwMTQ5IDogRGFsIG5vdsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMxX25ld1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDlcIiB9KSAvL1JDIDMwMjUwMTQ5IDogRGFsIG5vdsOpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMxYzFfcHJvY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDdcIiwgLy9SQyAzMDI1MDE0NyA6ICAlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAxNDdcIiwgLy9SQyAzMTEwMDI0MyA6IE3DoSBEw6F0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTQ2XCIgfSkgLy9SQyAzMDI1MDE0NiA6IE1EIG5vdsOpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMwYzFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTUwXCIsIC8vUkMgMzAyNTAxNTAgOiBNRCBwxa92LiAtIERhbCBwxa92LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMTUwXCIsIC8vUkMgMzAyNTAxNTAgOiBNRCBwxa92LiAtIERhbCBwxa92LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRoaXMuZ2xvYmFscy5SYWRfWm9icmF6TWREYWwhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMGMxXCIsIGNhcHRpb246IFwianJlczozMDI1MDE1MFwiIH0pIC8vUkMgMzAyNTAxNTAgOiBNRCBwxa92LiAtIERhbCBwxa92LlxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMGMxX25ld1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNTFcIiwgLy9SQyAzMDI1MDE1MSA6ICBNRCBub3bDqSAtIERhbCBub3bDqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMTUxXCIsIC8vUkMgMzAyNTAxNTEgOiAgTUQgbm92w6kgLSBEYWwgbm92w6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB0aGlzLmdsb2JhbHMuUmFkX1pvYnJhek1kRGFsISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBjMV9uZXdcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTUxXCIgfSkgLy9SQyAzMDI1MDE1MSA6ICBNRCBub3bDqSAtIERhbCBub3bDqVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTZcIiwgLy9SQyAzMTEwMDA1NiA6IE1EXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNDNcIiwgLy9SQyAzMTEwMDI0MyA6IE3DoSBEw6F0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMFwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTZcIiB9KSAvL1JDIDMxMTAwMDU2IDogTURcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU3XCIsIC8vUkMgMzExMDAwNTcgOiBEYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzFcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU3XCIgfSkgLy9SQyAzMTEwMDA1NyA6IERhbFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMGMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA5MFwiLCAvL1JDIDMxMTAwMDkwIDogTUQtRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNDRcIiwgLy9SQyAzMTEwMDI0NCA6IE3DoSBEw6F0aSAtIERhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW46ICF0aGlzLmdsb2JhbHMuUmFkX1pvYnJhek1kRGFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMGMxXCIsIGNhcHRpb246IFwianJlczozMTEwMDA5MFwiIH0pIC8vUkMgMzExMDAwOTAgOiBNRC1EYWxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBjMV9hc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyNzlcIiwgLy9SQyAzMDI1MDI3OSA6IE5ldnlyb3Zuw6Fub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Rlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNDRcIiwgLy9SQyAzMTEwMDI0NCA6IE3DoSBEw6F0aSAtIERhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW46ICF0aGlzLmdsb2JhbHMuUmFkX1pvYnJhek1kRGFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwYzFfYXNcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjgwXCIgfSkgLy9SQyAzMDI1MDI4MCA6IE5ldnlyb3Zuw6Fub1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5aYXBpc292YSlcclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzFcIiwgLy9SQyAzMTEwMDA3MSA6IFBvcGlzIMWZw6Fka3VcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ1NpbmdsZSh7IG1vZGVsOiBcInBvcGlzXCIsIGNhcHRpb246IFwianJlczozMTEwMDA3MVwiIH0pIC8vUkMgMzExMDAwNzEgOiBQb3BpcyDFmcOhZGt1XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5aYXBpc292YSkge1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzVcIiwgLy9SQyAzMTEwMDA3NSA6IFBJRFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNTFcIiwgLy9SQyAzMTEwMDI1MSA6IFBydm90bsOtIGlkZW50aWZpa8OhdG9yIHByaW3DoXJuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5peHAoeyBtb2RlbDogXCJpeHBcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc1XCIgfSkgLy9SQyAzMTEwMDA3NSA6IFBJRFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmdsb2JhbHMuRXh0ZXJuaVN1bWFyaXphY2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfcHJpbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzZcIiwgIC8vUkMgMzExMDAwNzYgOiBQSUQgcHJpbcOhcm7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsICAgLy9OT1RFOiBWIFRLIGplIHNrcnl0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdTaW5nbGUoeyBtb2RlbDogXCJpeHBfcHJpbVwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzZcIiB9KSAvL1JDIDMxMTAwMDc2IDogUElEIHByaW3DoXJuw61cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdsb2JhbHMuVHlwUHJhY2VXZmwgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY19hZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzdcIiwgLy9SQyAzMTEwMDA3NyA6IEFnZW5kb3bDqSDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiYWNfYWdcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc3XCIgfSkgLy9SQyAzMTEwMDA3NyA6IEFnZW5kb3bDqSDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDI4MVwiLCAvL1JDIDMwMjUwMjgxIDogVHlwIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiBcIntpeHNfdHlwX3R4dDp0cmltOmVuY29kZX1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBpbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcIml4c190eXBfdHh0XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLlVjci5XZWJDbGllbnQuRmlsdGVyUHJlZmFicy50eXBfYWcoeyBtb2RlbDogXCJ0eXBfYWdcIiwgemtyX2FnUGF0aDogXCJ0eXBfYWdfdHh0XCIsIGlzUm96cG9jZXQ6IHRoaXMuUm96cG9jZXQsIGNhcHRpb246IFwianJlczozMTEwMDA3OVwiIH0pIC8vUkMgMzExMDAwNzkgOiBBZ2VuZGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3NsVHlwSW50ZXJ2YWwoeyBtb2RlbDogXCJpeHNfdHlwPWl4c190eXA7aXhzX3R5cF90eHQ9bmF6ZXZcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjgxXCIgfSkgLy9SQyAzMDI1MDI4MSA6IFR5cCBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3NsVHlwSW50ZXJ2YWwoeyBtb2RlbDogXCJpeHNfdHlwXCIsIHprcl9hZ1BhdGg6IFwiaXhzX3R5cF90eHRcIixjYXB0aW9uOiBcImpyZXM6MzAyNTAyODFcIiB9KSAvL1JDIDMwMjUwMjgxIDogVHlwIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5aYXBpc292YSlcclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oeyAvL05PVEU6IFYgVEsgamUgdG8gcHJpZGFubyBqYWtvIEFkZExvb2t1cENvbHVtbiEgKGFyZy46IERldGFpbFR5cHVBZ2VuZHkuemtyX2FnKVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX2FnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc5XCIsIC8vUkMgMzExMDAwNzkgOiBBZ2VuZGFcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogXCJ7dHlwX2FnX3R4dDp0cmltOmVuY29kZX1cIixcclxuICAgICAgICAgICAgICAgICAgICBncm91cGluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJ0eXBfYWdfdHh0XCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuVWNyLldlYkNsaWVudC5GaWx0ZXJQcmVmYWJzLnR5cF9hZyh7IG1vZGVsOiBcInR5cF9hZ1wiLCB6a3JfYWdQYXRoOiBcInR5cF9hZ190eHRcIiwgaXNSb3pwb2NldDogdGhpcy5Sb3pwb2NldCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc5XCIgfSkgLy9SQyAzMTEwMDA3OSA6IEFnZW5kYVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLlR5cFByYWNlRVNVISA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cFByYWNlRVNVLk5lKSB7IH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZ2xvYmFscy5SZXppbVByb3ZvenUgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuU09SICYmIHRoaXMuZ2xvYmFscy5UeXBTdW1hcml6YWNlID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwU3VtYXJpemFjZS5FeHRlcm5pKSB7IH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVzdV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgwXCIsIC8vUkMgMzExMDAwODAgOiBFU1VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1MlwiLCAvL1JDIDMxMTAwMjUyIDogRXh0ZXJuw60gc3ViamVrdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250b1phcGlzID8gdW5kZWZpbmVkIDogR29yZGljLlVjci5XZWJDbGllbnQuRmlsdGVyUHJlZmFicy5lc3VfdHh0KHsgbW9kZWw6IFwiZXN1X3R4dFwiLCBpeHNfZXN1UGF0aDogXCJfZXN1X3R4dF9peHNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgwXCIgfSkgIC8vUkMgMzExMDAwODAgOiBFU1VcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXN1X2ljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwODBcIiArIFwiIFwiICsgdGhpcy56a3JhdGt5LkljbywgIC8vUkMgMzExMDAwODAgOiBFU1VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1M1wiLCAvL1JDIDMxMTAwMjUzIDogScSMTyBFeHRlcm7DrWhvIHN1Ympla3R1IHByaW3DoXJuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiB0aGlzLnBhcmVudENudC5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpcyA/IHVuZGVmaW5lZCA6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkZpbHRlclByZWZhYnMuZXN1X2ljbyh7IG1vZGVsOiBcImVzdV9pY29cIiwgaXhzX2VzdVBhdGg6IFwiX2VzdV9pY29faXhzXCIsIGNhcHRpb246IFwianJlczozMTEwMDA4MFwiICsgXCIgXCIgKyB0aGlzLnprcmF0a3kuSWNvIH0pIC8vUkMgMzExMDAwODAgOiBFU1VcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXN1X3JjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA4MVwiLCAvL1JDIDMxMTAwMDgxIDogRVNVIFLEjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjU0XCIsIC8vUkMgMzExMDAyNTQgOiBSb2Ruw6kgxI3DrXNsbyBFeHRlcm7DrWhvIHN1Ympla3R1IHByaW3DoXJuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiB0aGlzLnBhcmVudENudC5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpcyA/IHVuZGVmaW5lZCA6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkZpbHRlclByZWZhYnMuZXN1X3JjKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImVzdV9yY1wiLCBpeHNfZXN1UGF0aDogXCJfZXN1X3R4dF9yY1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwODFcIiwgLy9SQyAzMTEwMDA4MSA6IEVTVSBSxIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJhZF9Fc3VfUmNWeWhsOiB0aGlzLmdsb2JhbHMuUmFkX0VzdV9SY1Z5aGwhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuUHJpeklpc3NwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlpc3NwRGlzYWJsZSA9IHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5O1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkX2hkcl9yaXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgyXCIsIC8vUkMgMzExMDAwODIgOiBJRCBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjU1XCIsIC8vUkMgMzExMDAyNTUgOiBJZGVudGlmaWvDoXRvciByZXplcnZhY2Ugcm96cG/EjXRvdsO9Y2ggcHJvc3TFmWVka8WvIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaWRfaGRyX3Jpc1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwODJcIiwgZGlzYWJsZWQ6IGlpc3NwRGlzYWJsZSwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDkgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA5IH0gfSkgLy9SQyAzMTEwMDA4MiA6IElEIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWF4TGVuZ3RoOiA5XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyYWRla19oZHJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgzXCIsLy9SQyAzMTEwMDA4MyA6IMWZw6FkZWsgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1NlwiLCAvL1JDIDMxMTAwMjU2IDogxZjDoWRlayByZXplcnZhY2Ugcm96cG/EjXRvdsO9Y2ggcHJvc3TFmWVka8WvIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHsgbW9kZWw6IFwicmFkZWtfaGRyXCIsIGNhcHRpb246IFwianJlczozMTEwMDA4M1wiLCBkaXNhYmxlZDogaWlzc3BEaXNhYmxlIH0pIC8vUkMgMzExMDAwODMgOiDFmcOhZGVrIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNfcHJlcF9haXNwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM0NFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9SQyAzMDI1MDM0NCA6IElJU1NQIFDFmWVwb8SNdGVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzksLy8gZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiY2VudGVyXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zX3ByZXBfYWlzcCE9bnVsbCAmJiBkYXRhLnNfcHJlcF9haXNwID4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiLCB0ZXh0OiBcImpyZXM6MzAyNTAzNDRcIiwgLy9SQyAzMDI1MDM0NCA6IElJU1NQIFDFmWVwb8SNdGVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Rvb2x0aXA6IFwianJlczozMDI1MDI4OFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmlkX2hkcl9yaXMgIT0gbnVsbCAmJiBkYXRhLmlkX2hkcl9yaXMhPT11bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWV4Y2xhbSBnLXN0YXRlLWVycm9yXCIsIHRleHQ6IFwianJlczozMDI1MDM0NVwiLCAvL1JDIDMwMjUwMzQ1IDogTmV6cHJhY292w6Fub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Rvb2x0aXA6IFwianJlczozMDI1MDI4OVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuYWRkU3RyUG9waXNDb2x1bW5zKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFkZFN0clBvcGlzQ29sdW1ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjID0gdGhpcy5hZGRTdHJQb3Bpc0NvbHVtbnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNhcHRpb24gPSB0aGlzLmZpbHRlclN0clBvcGlzPy5maW5kKChzKSA9PiB7IHJldHVybiBzLmtsaWMgPT09IGM7IH0pPy5rbGljX3R4dCA/PyBjO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMC0xMi0wLCBNLTAtMTItMCwgUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihjYXB0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogYyB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGNhcHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogYHtzdHJ1a3RQb3Bpcy4ke2N9LmhvZG5vdGF9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ2Zvcm1ib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6ICQuZXh0ZW5kKEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5nZXRGb3JtQm94RmlsdGVyRGVmYXVsdHMoe30pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IChzOiBPYmplY3RMaXRlcmFsPHN0cmluZz4pID0+IHsgcmV0dXJuIHMgJiYgc1tjXSA/IHNbY10gOiBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZmlsdGVyRW1wdHlWYWx1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCB2PzogeyB2YWx1ZTogT2JqZWN0TGl0ZXJhbDxzdHJpbmc+IH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbCA9IHY/LnZhbHVlW2NdID8/IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmcGRhdGEgPSB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJnZXRDdXJyZW50RGF0YVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlclN0clBvcGlzID0gZnBkYXRhPy5maWx0ZXJTdHJQb3BpcyBhcyBHU3RydWt0dXJvdmFueVBvcGlzRmlsdGVyRHRvW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwID0gZmlsdGVyU3RyUG9waXM/LmZpbmQoKHMpID0+IHsgcmV0dXJuIHMua2xpYyA9PT0gYzsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmhvZG5vdGEgPSB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiLCBmcGRhdGEsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogZnVuY3Rpb24gKG9wLCBkdG8sIG1vZGVsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnBkYXRhID0gKF90aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwgYXMgYW55KShcImdldEN1cnJlbnREYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyU3RyUG9waXMgPSBmcGRhdGE/LmZpbHRlclN0clBvcGlzIGFzIEdTdHJ1a3R1cm92YW55UG9waXNGaWx0ZXJEdG9bXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSBmaWx0ZXJTdHJQb3Bpcz8uZmluZCgocykgPT4geyByZXR1cm4gcy5rbGljID09PSBjOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXBwbHlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmdmaWVsZChcInNldFZhbHVlXCIsIHsgYzogcC5ob2Rub3RhIH0sIHsgdHJpZ2dlckNoYW5nZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnZhbGlkVHJhbnNmb3JtOiAodikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHYgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbFtjXSA9IHY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pIGFzIEdGb3JtQm94T3B0aW9uczxPYmplY3RMaXRlcmFsPHN0cmluZz4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ2YgYXMgYW55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZVByb2ZpbGVzKGdmOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0by8qJkdTZXpuYW1aYXBpc3VTdGF2dUR0byovPik6IElHU2V6bmFtWmFwaXN1UHJvZmlsZXMge1xyXG4gICAgICAgICAgICBsZXQgcHJvZmlsZXM6IElHU2V6bmFtWmFwaXN1UHJvZmlsZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7IG5hbWU6IFwianJlczozMTEwMDIzMlwiLCBjb2x1bW5zOiB7fSB9IC8vUkMgMzExMDAyMzIgOiBWw71jaG96w61cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2YuY29sdW1ucy5maWx0ZXIoKGMpID0+IHsgcmV0dXJuICFjLmhpZGRlbjsgfSlcclxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChjKSA9PiB7IHByb2ZpbGVzLmRlZmF1bHQuY29sdW1ucyFbYy5uYW1lIV0gPSB7IGhpZGRlbjogZmFsc2UgfSB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlphcGlzb3ZhKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9maWxlcy5kZWZhdWx0Lm5hbWUgPSBcImpyZXM6MzExMDAyNDFcIjsgLy9SQyAzMTEwMDI0MSA6IFrDoXBpc3kgKHbDvWNob3rDrSlcclxuICAgICAgICAgICAgICAgIHByb2ZpbGVzLmRva2xhZHkgPSB7IG5hbWU6IFwianJlczozMTEwMDIzMVwiLCBjb2x1bW5zOiB7fSwgZ3JvdXBpbmc6IFwiZG9rbGFkeVwiIH07IC8vUkMgMzExMDAyMzEgOiBEb2tsYWR5XHJcbiAgICAgICAgICAgICAgICBwcm9maWxlcy5kb2tsYWR5LmNvbHVtbnMgPSAkLmV4dGVuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9rbGFkeTogeyBoaWRkZW46IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGRvazogeyBoaWRkZW46IGZhbHNlIH1cclxuICAgICAgICAgICAgICAgIH0sIHByb2ZpbGVzLmRlZmF1bHQuY29sdW1ucyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9maWxlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmRldGFpbEFjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZGV0YWlsQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyNjZcIiwgLy9SQyAzMTEwMDI2NiA6IFpvYnJheml0IGRldGFpbFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy92aXNpYmxlOiAoIHRoaXMuVHlwVWxvaHkgIT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvKSxcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93RGV0YWlsKCk7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnByZXZGaWx0ZXJBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInByZXZGaWx0ZXJBY3RcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktYXJyb3cgZ2ktcm90MTgwXCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDIxOFwiLCAvL1JDIDMxMTAwMjE4IDogUMWZZWRjaG96w60gZmlsdHJcclxuICAgICAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBcIm5ldmVyXCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzExMDAyMjBcIiwgLy9SQyAzMTEwMDIyMCA6IE7DoXZyYXQgayBwxZllZGNob3rDrSBob2Rub3TEmyBmaWx0cnUgYSB2eWhsZWTDoW7DrS5cclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5wcmV2RmlsdGVyKCk7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5leHRGaWx0ZXJBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm5leHRGaWx0ZXJBY3RcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktYXJyb3dcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjE5XCIsIC8vUkMgMzExMDAyMTkgOiBOw6FzbGVkdWrDrWPDrSBmaWx0clxyXG4gICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IFwibmV2ZXJcIixcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMTEwMDIyMVwiLCAvL1JDIDMxMTAwMjIxIDogVnlwbG7Em27DrSBuw6FzbGVkdWrDrWPDrWhvIGZpbHRydSBhIHZ5aGxlZMOhbsOtLlxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLm5leHRGaWx0ZXIoKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy56YXBpc3lBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInphcGlzeUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1saXN0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDEyNFwiLCAvL1JDIDMxMTAwMTI0IDogWsOhcGlzeVxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLnNob3daYXBpc3koKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy56YXBpc3lBbGxBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInphcGlzeUFsbEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1saXN0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDI3M1wiLCAvL1JDIDMwMjUwMjczIDogWsOhcGlzeSB2xaFlXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuc2hvd1phcGlzeUFsbCgpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmRva2xhZEFjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rbGFkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDIzM1wiLCAvL1JDIDMxMTAwMjMzIDogRG9rbGFkeS96w6FwaXN5XHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMudG9nZ2xlR3JvdXBpbmcoKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wcmltZG9rbGFkQWN0ID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwcmltZG9rbGFkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLWV4dGVybmFsLWxpbmtcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTU0XCIsIC8vUkMgMzAyNTAxNTQgOiBQcmltLiBkb2tsYWRcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93UHJpbURva2xhZCgpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmRva2xhZEJMS0FjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rbGFkQkxLQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtZXh0ZXJuYWwtbGlua1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTU1XCIsIC8vUkMgMzAyNTAxNTUgOiBEb2tsYWQgQkxLXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuc2hvd1ByaW1Eb2tsYWQodW5kZWZpbmVkLCBcIkJMS1wiKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5kb2tsYWRST0FjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rbGFkUk9BY3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTU2XCIsIC8vUkMgMzAyNTAxNTYgOiBEb2tsYWQgUk9cclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtZXh0ZXJuYWwtbGlua1wiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLnNob3dQcmltRG9rbGFkKHVuZGVmaW5lZCwgXCJST1wiKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy90aGlzLmNsZWFyRmlsdGVyUm93QWN0ID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAvLyAgICBuYW1lOiBcImNsZWFyRmlsdGVyUm93QWN0XCIsXHJcbiAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwianJlczozMTEwMDI2N1wiLCAvL1JDIDMxMTAwMjY3IDogVnnEjWlzdGl0IGZpbHRyIHNlem5hbXVcclxuICAgICAgICAgICAgLy8gICAgaWNvbjogXCJnaS1iaW5cIixcclxuICAgICAgICAgICAgLy8gICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJjbGVhclwiKTsgfVxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnNBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImluc0FjdFwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0RmlsdGVyKHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldENvbmZpcm1lZERhdGFcIikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHsgdGhpcy5kb0ZpbHRlckNsaWNrKCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJBbmRGaWx0ZXJBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImNsZWFyQW5kRmlsdGVyQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiY2xlYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRGaWx0ZXIodGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q29uZmlybWVkRGF0YVwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4geyB0aGlzLmRvRmlsdGVyQ2xpY2soKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZWxGaWx0ZXJBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNlbEZpbHRlckFjdFwiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLmRpc3BhdGNoRmlsbFNlcnZlckdyaWRFdmVudChldik7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNlbEZpbHRlckFuZFNlYXJjaEFjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic2VsRmlsdGVyQW5kU2VhcmNoQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEZpbGxTZXJ2ZXJHcmlkRXZlbnQoZXYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9GaWx0ZXJDbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5kb3RBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRvdEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgc2VsID0gdGhhdC4kZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiLCBmYWxzZSlbMF0gYXMgR29yZGljLlVjci5XZWJDbGllbnQuRHRvLkdTZXpuYW1aYXBpc3VTdGF2dUR0bztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8jcmVnaW9uIFRha2hsZSB0byBsemUgbmFjcGF0IGkgcHJpbW8gZG8gZWxlbWVudHVcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhciB2YWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgZWxlbWVudHk6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgZmlsdGVyczogW3tcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHVjczogeyBzdGFydDogc2VsLnVjcywgZW5kOiBzZWwudWNzIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBkcmQ6IHNlbC5kcmQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBtZXNpYzogeyBzdGFydDogc2VsLm1lc2ljLCBlbmQ6IHNlbC5tZXNpYyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGFjOiB7IHN0YXJ0OiBzZWwuYWMsIGVuZDogc2VsLmFjIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy99O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5lbGVtZW50LmZpbmQoXCIuZ2ZpbHRlcnBhbmVsXCIpLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIsIHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8jZW5kcmVnaW9uIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3ZhciB2YWwgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdWNzOiB7IHN0YXJ0OiBzZWwudWNzLCBlbmQ6IHNlbC51Y3MgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBkcmRfbXNrOiBzZWwuZHJkLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIG1lc2ljOiB7IHN0YXJ0OiBzZWwubWVzaWMsIGVuZDogc2VsLm1lc2ljIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgYWM6IHsgc3RhcnQ6IHNlbC5hYywgZW5kOiBzZWwuYWMgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkc2VydmVyZmlsdGVyKFwiY2xlYXJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkc2VydmVyZmlsdGVyKFwiYXBwbHlcIiwgdGhpcy5nZXRaYXBpc0ZpbHRlcigpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvRmlsdGVyQ2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlclBpZEFjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZmlsdGVyUGlkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWwgPSBncmlkLmdncmlkPFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBncmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZ3JpZHNlcnZlcmZpbHRlcihcImNsZWFyXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZ3JpZHNlcnZlcmZpbHRlcihcImFwcGx5XCIsIHsgaXhwOiBzZWxbMF0uaXhwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9GaWx0ZXJDbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hEb2tsYWR5QWN0ID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzaERva2xhZHlBY3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vTk9URTogSmFrIHRvIGRlbGFqaSB2IHRsdXN0eW06IEdTZXpuYW1VY3RaYXpuYW11U3RhdnlaYXBpc3lUYWIubV9BY3Rpb25Eb2tsYWR5X1N0YXJ0KCk6IFxyXG4gICAgICAgICAgICAgICAgLy9Qcm92ZWRvdSBzZXNrdXBlbmksIGt0ZXJlIHByaWRhamkgamFrbyBub3ZlIHJhZGt5IGEgcGFrIHphZmlsdHJ1amkgcG91emUgbmEgc291Y3RvdmUgcmFka3lcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4geyB0aGlzLnRvZ2dsZUdyb3VwaW5nKHRoaXMucHJvZmlsZXMuZG9rbGFkeSEubmFtZSk7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNoWmFwaXN5QWN0ID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzaFphcGlzeUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHsgdGhpcy50b2dnbGVHcm91cGluZyh0aGlzLnByb2ZpbGVzLmRlZmF1bHQubmFtZSk7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluaWNlIG1lbnVcclxuICAgICAgICAgKiBAcGFyYW0gdHlwVWxvaHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZU1lbnViYXJEZWYodHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUpOiBNZW51UGFyYW1zW10ge1xyXG4gICAgICAgICAgICBsZXQgbWVudSA9IG5ldyBBcnJheTxNZW51UGFyYW1zPigpO1xyXG5cclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLmRldGFpbEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wcmV2RmlsdGVyQWN0LCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLm5leHRGaWx0ZXJBY3QsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcmludEFjdClcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wcmludEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVN0YXZcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlJvenBvY2V0U3RhdiB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvKVxyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnphcGlzeUFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIGlmICh0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvKVxyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnphcGlzeUFsbEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVphcGlzXHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9OZXphcmF6ZW5lX3phcGlzeVxyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfUHJldWN0b3Zhbmlfc3RhdnlcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRGFub3ZhRXZpZGVuY2VaYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRaYXBpcylcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5kb2tsYWRBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICBpZiAodHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUHJpbWFybmlQb3phZGF2a3laYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQmFsYW5jb3ZhbmlaYXBpcykge1xyXG4gICAgICAgICAgICAgICAgLy9tZW51LnB1c2goeyBhY3Rpb246IHRoaXMucHJpbWRva2xhZEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMuZG9rbGFkUk9BY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLmRva2xhZEJMS0FjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlByaW1hcm5pUG96YWRhdmt5WmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkZpbmFuY292YW5pWmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfTmV6YXJhemVuZV96YXBpc3lcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5XHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5Sb3pwb2NldFphcGlzXHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5CYWxhbmNvdmFuaVphcGlzXHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvWmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpc3lWc2VcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucHJpbWRva2xhZEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX05lemFyYXplbmVfemFwaXN5ICYmIHRoaXMuemF0cmlkaXRBY3QpIFxyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnphdHJpZGl0QWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMuY2xlYXJGaWx0ZXJSb3dBY3QgfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN0YXRpY1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjY4XCIsIC8vUkMgMzExMDAyNjggOiBSeWNobMOpIGFrY2VcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuaW5zQWN0LCBpY29uOiBcImdpLXJlZnJlc2hcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjI2XCIgfSwgLy9SQyAzMTEwMDIyNiA6IE5hxI10ZW7DrSBkYXRcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5jbGVhckFuZEZpbHRlckFjdCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjI4XCIgfSwgLy9SQyAzMTEwMDIyOCA6IFZ5xI1pc3RpdCBhIG5hxI3DrXN0XHJcbiAgICAgICAgICAgICAgICAgICAgLy9OT1RFOiBUeXRvIGR2ZSBha2NlIGJ1ZG91IHZ6ZHkgZnVuZ292YXQgcG91emUgeiBrbGF2ZXNuaWNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy97IGFjdGlvbjogdGhpcy5zZWxGaWx0ZXJBY3QsIGNhcHRpb246IFwianJlczozMTEwMDIyOVwiIH0sIC8vUkMgMzExMDAyMjkgOiBQxZllbmVzZW7DrSBob2Rub3R5IGRvIGZpbHRydS5cclxuICAgICAgICAgICAgICAgICAgICAvL3sgYWN0aW9uOiB0aGlzLnNlbEZpbHRlckFuZFNlYXJjaEFjdCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjM1XCIgfSwgLy9SQyAzMTEwMDIzNSA6IFDFmWVuZXNlbsOtIGhvZG5vdHkgZG8gZmlsdHJ1IGEgdnlobGVkw6Fuw60uXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb246IHRoaXMuZG90QWN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA2MjBcIiwgLy9SQyAzMDI1MDYyMCA6IEZpbHRyb3ZhdCBkbGUgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzExMDAyMjdcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sIC8vUkMgMzExMDAyMjcgOiBab2JyYXplbsOtIHbFoWVjaCB6w6FwaXPFryBkb2tsYWTFryAoY2Vsw70gZG9rbGFkKSBuYWQgb3puYcSNZW7DvW0gesOhcGlzZW0uXHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuZmlsdGVyUGlkQWN0LCBjYXB0aW9uOiBcImpyZXM6MzExMDAyODBcIiB9LCAvL1JDIDMxMTAwMjgwIDogRmlsdHJvdmF0IGRsZSBQSURcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5zaERva2xhZHlBY3QsIGNhcHRpb246IFwianJlczozMTEwMDIzMVwiIH0sIC8vUkMgMzExMDAyMzEgOiBEb2tsYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMuc2haYXBpc3lBY3QsIGNhcHRpb246IFwianJlczozMTEwMDEyNFwiIH0gLy9SQyAzMTEwMDEyNCA6IFrDoXBpc3lcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWVudTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUZpbHRlclBhbmVsKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUZpbHRlclBhbmVsKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgLy9sZXQgY2Z1U2V0ID0gdGhpcy5nZXRDZnVTZXRTZXJ2ZXJGaWx0ZXJzKGZhbHNlKTtcclxuICAgICAgICAgICAgLy92YXIgZ2YgPSBHb3JkaWMuVWNyLldlYkNsaWVudC5HRWxlbWVudFV0aWxzLmNyZWF0ZUVsZW1lbnRzR3JpZEZvcm1hdCh7XHJcbiAgICAgICAgICAgIC8vICAgIGVrb1BhcmFtczogdGhpcy5wYXJlbnRDbnQuZWtvUGFyYW1zLFxyXG4gICAgICAgICAgICAvLyAgICBnbG9iYWxzOiB0aGlzLmdsb2JhbHMsXHJcbiAgICAgICAgICAgIC8vICAgIHR5cFNlc3Rhdnk6IHRoaXMudHlwU2VzdGF2eSxcclxuICAgICAgICAgICAgLy8gICAgY2Z1U2V0OiBjZnVTZXQsXHJcbiAgICAgICAgICAgIC8vICAgIGZpbHRlck9wdGlvbnM6IHRoaXMuZmlsdGVyT3B0aW9ucyxcclxuICAgICAgICAgICAgLy8gICAgZmlsdGVyUGFyYW1zOiB0aGlzLnBhcmVudENudC5maWx0ZXJQYXJhbXNcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGVsbVJvd09wdHMgPSB7IGxhYmVsOiBcIkVsZW1lbnR5XCIgfTtcclxuICAgICAgICAgICAgLy9lbG1Sb3dPcHRzW1wiZmF2b3JpdGVSb3dMYXlvdXREZXNjcmlwdG9yXCJdID0gXCJ3LUwtOSB3LU0tOCB3LVMtMTJcIjtcclxuICAgICAgICAgICAgLy9sZXQgZnBGb3JtOiBHb3JkaWMuRm9ybXMuRm9ybTtcclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIGZwRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcImpyZXM6MzAyNTAwNTJcIiB9KSAvL1JDIDMwMjUwMDUyIDogRmlsdHJcclxuICAgICAgICAgICAgLy8gICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgLy8gICAgICAgIC5hZGRSb3coZWxtUm93T3B0cylcclxuICAgICAgICAgICAgLy8gICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLkVrby5QcmVmYWJzLmNmdUVsZW1lbnRzKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcImVsZW1lbnR5XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy9uYW1lOiBcImZpbHRlcnNcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZDogdGhpcy5wYXJlbnRDbnQudGFza0lkID8gdGhpcy5wYXJlbnRDbnQudGFza0lkICsgXCJfZWxlbWVudHlGaWVsZCNcIiA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBtb2RlbFZhbHVlVHJhbnNmb3JtOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC8vYXBwbHk6IChtb2RlbFZhbHVlKSA9PiB7IHJldHVybiBtb2RlbFZhbHVlOyB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBhcHBseTogKG1vZGVsVmFsdWUpID0+IHsgcmV0dXJuIG1vZGVsVmFsdWUuZmlsdGVyczsgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLy9jb2xsZWN0OiAoZmllbGRWYWx1ZSkgPT4geyByZXR1cm4gZmllbGRWYWx1ZTsgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjb2xsZWN0OiAoZmllbGRWYWx1ZSkgPT4geyByZXR1cm4geyBmaWx0ZXJzOiBmaWVsZFZhbHVlIH07IH1cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBvYmopIHsgdGhhdC5wYXJlbnRDbnQubG9nLnRyYWNlKFwiZWxlbWVudHlcIiwgJCh0aGlzKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSk7IH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZ3JpZEZvcm1hdDogZ2YsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY2FuQWRkTmV3UmVjb3JkczogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjYW5SZW1vdmVSZWNvcmRzOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNyZWF0ZU5ld1JlY29yZDogR0VsZW1lbnRVdGlscy5jcmVhdGVOZXdFbGVtZW50RnVuYyh0aGlzLmdsb2JhbHMuUmV6aW1Qcm92b3p1ISwgdGhpcy5wYXJlbnRDbnQuZWtvUGFyYW1zKSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjbGVhclJlY29yZDogR0VsZW1lbnRVdGlscy5jcmVhdGVDbGVhckVsZW1lbnRGdW5jKHRoaXMuZ2xvYmFscy5SZXppbVByb3ZvenUhKSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBmb3JtYXRFbGVtZW50VmFsdWVPcHRpb25zOiB7IHNraXA6IEdFbGVtZW50VXRpbHMuZ2V0RWxlbWVudFZhbHVlU2tpcENvbHVtbnModGhpcy5nbG9iYWxzLlJlemltUHJvdm96dSEpLCBuYW1lQ29sdW1uOiBcIm5hemV2XCIgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgIH0pKTtcclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuJGZpbHRlclBhbmVsID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAvLyAgICAuYXBwZW5kVG8odGhpcy5wYXJlbnRDbnQuZWxlbWVudClcclxuICAgICAgICAgICAgLy8gICAgLmdmaWx0ZXJwYW5lbCh7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBmb3JtczogW2ZwRm9ybV0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBmYXZvcml0ZXM6IFtcIm1kXCJdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZmF2b3JpdGVMYXlvdXREZXNjcmlwdG9yOiBcIkw1TTNTMSBMLTEyLTEyLTAgTS0xMi0xMi0wIFMtMTItMTItMFwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgc2VhcmNoQnV0dG9uT25NYWluUm93OiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgc2F2ZU9wdGlvbnNGb3JtOiBHVWNyTWFza2FEZXRhaWwuZ2V0Rm9ybShnZiBhcyBhbnkpLCAvL1RPRE86IERhdCBzcHJhdm55IHR5cCBncmlkZm9ybWF0dSFcclxuICAgICAgICAgICAgLy8gICAgICAgIGZpbHRlclN0b3JhZ2VTZXJ2aWNlOiBuZXcgR1Vjck1hc2thU2VydmljZSh7IHR5cFNlc3Rhdnk6IHRoaXMudHlwU2VzdGF2eSwgcGFyZW50Q29udGVudDogdGhpcy5wYXJlbnRDbnQsIGZyYWdtZW50czogXCIqLGVsZW1lbnR5XCIgfSksXHJcbiAgICAgICAgICAgIC8vICAgICAgICBhdXRvTG9hZEFmdGVyQ2hvc2VGaWx0ZXI6IGZhbHNlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy9hcHBseTogKGV2LCBkYXRhKSA9PiB7IHRoaXMubG9hZERhdGFPbGQoZGF0YS5maWx0ZXIpOyB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgcmVzZXQ6IChldiwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnN0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgZ3JpZC5nZ3JpZHNlcnZlcmZpbHRlcihcImNsZWFyXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgIHByaW1hcnlCdXR0b25CZWhhdmlvdXI6IFwiQWx3YXlzUHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgY2xlYXJGaWx0ZXJCdXR0b25WaXNpYmxlOiBcIkFsd2F5c1Zpc2libGVcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIHBvVnlobGVkYW5pWm9icmF6aXQ6IFwiT2JsaWJlbmVQb2RtaW5reVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgcG9WeWhsZWRhbmlab2JyYXppdFVzZXJTZXR0aW5nczogXCJEZW55XCIgLy9OT1RFOiBaYWthenVqZSBwcmVwaW5hbmkgcG8gdnlobGVkYW5pIC0gcG9rdWQgc2UgbmVrZG8gcG9rb3VzZWwgdnltYXphdCBmaWx0ciB2IHRvbXRvIHJlemltdSwgdGFrIG11c2VsIGtsaWtub3V0IG5hIHZ5aGxlZGF0LCB2aXogVDM5ODdcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vVE9ETzogUHJpZGF0IGZvcm1hdG92YW5pIHBybyBwcmlwYWR5LCBrZHkganNvdSBvYmxpYmVuZSBuYSBmaXRycGFuZWx1IHNjaG92YW5lXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL2JhZGdlRGF0YTogKGV2LCBvKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyAgICBsZXQgZCA9IG8uZGF0YS5lbGVtZW50eTtcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vICAgIGlmICghZCB8fCAhZC5maWx0ZXJzKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy8gICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyAgICBvLnRvb2x0aXAgPSBcIkVsZW1lbnR5Ojxici8+XCI7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyAgICBvLnRvb2x0aXAgKz0gR29yZGljLkVrby5QcmVmYWJzLmZvcm1hdEVsZW1lbnRWYWx1ZXMoZ2YgYXMgYW55LCBkLmZpbHRlcnMpLmh0bWwoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vICAgIG8udG9vbHRpcCA9IG8udG9vbHRpcC5yZXBsYWNlKFwiT1JcIiwgXCI8YnIvPlwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vfVxyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFjdGVuaSBkYXQgcHJvIHNhbGRva29udG9cclxuICAgICAgICAgKiBAcGFyYW0gZGVmXHJcbiAgICAgICAgICogQHBhcmFtIG1hc2thXHJcbiAgICAgICAgICogQHBhcmFtIHJxXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXREYXRhU2FsZG9rb250byhkZWY6IEpRdWVyeS5EZWZlcnJlZDxhbnksIGFueSwgYW55PiwgbWFza2E6IFVjdC5JbnRlcmZhY2UuR1VjckZpbHRlckR0bywgcnE6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JMaXN0UmVxdWVzdER0byk6IEpRdWVyeS5Qcm9taXNlPGFueSwgYW55LCBhbnk+IHtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5iZWdpbk9wZXJhdGlvbihcIlwiKTtcclxuICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuaXNsLlVjclNhbGRva29udG8ubGlzdERhdGEoeyBtYXNrYTogbWFza2EsIHJxOiBycSB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBTZXpuYW1aYXBpc3U6IHJlc3VsdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU3VteTogW11cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKG51bGwsIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uKHRoYXQucGFyZW50Q250LCBvYmosIHR5cGUsIHJxLCBudWxsIGFzIGFueSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldHVybk1lc3NhZ2UgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uUmVzb2x2ZUV4ZXB0aW9uTmV3KHRoYXQucGFyZW50Q250LCBqcVhIUiwgcnEsIG51bGwgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldHVybk1lc3NhZ2UgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gemlza2FuaSB6cHJhdiBwb3NsYW55Y2ggemUgc2VydmVydVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuUmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxIS5OYXN0YXZlbmkgPSByZXR1cm5WYWx1ZS5OYXN0YXZlbmk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5nZXREYXRhU2FsZG9rb250byhkZWYsbWFza2EsIHJxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkuY2F0Y2goZGVmLnJlamVjdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGpxWEhSO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSkgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBzaG93RGV0YWlsKHJvdz86IEdTZXpuYW1aYXBpc3VTdGF2dUR0byk6IHZvaWQge1xyXG4gICAgICAgIC8vICAgIGlmICghcm93KSB7XHJcbiAgICAgICAgLy8gICAgICAgIHZhciBzZWwgPSB0aGlzLiRncmlkLmdncmlkPEdTZXpuYW1aYXBpc3VTdGF2dUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgLy8gICAgICAgIGlmIChzZWwubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vICAgICAgICByb3cgPSBzZWxbMF07XHJcbiAgICAgICAgLy8gICAgfTtcclxuICAgICAgICAvLyAgICBsZXQgdHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUgPSB0aGlzLnBhcmVudENudC5UeXBVbG9oeTtcclxuICAgICAgICAvLyAgICBpZiAodGhpcy5wYXJlbnRDbnQuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRmluYW5jb3ZhbmlaYXBpcykge1xyXG4gICAgICAgIC8vICAgICAgICBpZiAocm93LnByaXpfdXIgIT0gMClcclxuICAgICAgICAvLyAgICAgICAgICAgIHR5cFVsb2h5ID0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5Sb3pwb2NldFphcGlzO1xyXG4gICAgICAgIC8vICAgICAgICBlbHNlXHJcbiAgICAgICAgLy8gICAgICAgICAgICB0eXBVbG9oeSA9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVphcGlzO1xyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvLyAgICBsZXQgb3B0aW9uczogSUdEZXRhaWxTdGF2WmFwaXNSYWRrdU9wdGlvbnMgPSB7XHJcbiAgICAgICAgLy8gICAgICAgIHR5cFVsb2h5OiB0eXBVbG9oeSwvL3RoaXMuVHlwVWxvaHksXHJcbiAgICAgICAgLy8gICAgICAgIGdyaWRGb3JtYXQ6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgIC8vICAgICAgICBmaWx0ZXI6IHRoaXMuZ2V0WmFwaXNGaWx0ZXIoKSxcclxuICAgICAgICAvLyAgICAgICAgcm93OiByb3csXHJcbiAgICAgICAgLy8gICAgICAgIGdsb2JhbHM6IHRoaXMuZ2xvYmFscyxcclxuICAgICAgICAvLyAgICAgICAgdmlld01vZGU6IFwiZnVsbFwiXHJcbiAgICAgICAgLy8gICAgfTtcclxuXHJcbiAgICAgICAgLy8gICAgdGhpcy5wYXJlbnRDbnQubmF2aWdhdGUoR29yZGljLlVjci5XZWJDbGllbnQuR0RldGFpbFN0YXZaYXBpc1JhZGt1LCBvcHRpb25zKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLyoqKlxyXG4gICAgICAgICAqIFpvYnJhemVuaSB2c2VjaCB6YXBpc3UgcHJvIHNhbGRva29udG9cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgc2hvd1phcGlzeUFsbCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgdHlwVWxvaHkgPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpc3lWc2U7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IFwic2V6bmFtU2FsZG9rb250byNcIjsgLy9OT1RFOiBNdXNpIGJ5dCBzdGVqbmUgbmkgbmEgTWFpbkFwcC5jc1xyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgbGV0IHJvd3MgPSBncmlkLmdncmlkPFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPihcImdldFZpZXdcIikuZ2V0RGF0YVJvd3MoZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmdldEZpbHRlcigpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IGZpbHRlcjogR0Vrb0ZpbHRlckR0bztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5wYXJlbnRDbnQubmF2aWdhdGUoJ0dvcmRpYy5VY3IuV2ViQ2xpZW50LkdTZXpuYW1Fa29aYXpuYW11Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRDogaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR5cFVsb2h5OiB0eXBVbG9oeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRmlsdGVyOiB7fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUm93czogcm93cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU3RyaWN0RmlsdGVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBGaWx0ZXJTdHJQb3BpczogZi5maWx0ZXJTdHJQb3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXV0b0xvYWREYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMwMjUwMjgzXCIgLy9SQyAzMDI1MDI4MyA6IFrDoXBpc3kgc2FsZG9rb250YVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzaG93WmFwaXN5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgdGl0bGUgPSBcImpyZXM6MzExMDAyMjRcIjsgLy9SQyAzMTEwMDIyNCA6IFrDoXBpc3kgc3RhdnVcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmdldEZpbHRlcigpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbCA9IGdyaWQuZ2dyaWQ8VWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8+KFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCAhPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gc2VsWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0eXBVbG9oeTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaWQ6IHN0cmluZztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyOiBHRWtvRmlsdGVyRHRvO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vTk9URTogT2Rwb3ZpZGEgeiBUSyBVQ1I6IEdTZXpuYW1aYXBpc3VWUmFka3VUYWIuTG9hZEdyaWREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJlbnRDbnQuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSA9IFwianJlczozMDI1MDI3NFwiIC8vUkMgMzAyNTAyNzQgOiBaw6FwaXN5IHNhbGRva29udGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhZGQgPSBcIlwiOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZ2xvYmFscy5TYWxkb2tvbnRvUGFyYW0xIS50cmltKCkgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZCA9IHRoYXQuZ2xvYmFscy5TYWxkb2tvbnRvUGFyYW0xIS50cmltKCkgKyBcIjogXCIgKyByb3chW1widmFsdWUwXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5nbG9iYWxzLlNhbGRva29udG9QYXJhbTIhLnRyaW0oKSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWRkICE9IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkICs9IFwiLCBcIiArIHRoYXQuZ2xvYmFscy5TYWxkb2tvbnRvUGFyYW0yIS50cmltKCkgKyBcIjogXCIgKyByb3chW1widmFsdWUxXCJdIS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkID0gdGhhdC5nbG9iYWxzLlNhbGRva29udG9QYXJhbTEhLnRyaW0oKSArIFwiOiBcIiArIHJvdyFbXCJ2YWx1ZTBcIl0/LnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWRkICE9IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGQgPSBcIiAoXCIgKyBhZGQgKyBcIilcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgKz0gYWRkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB7IHN0YXJ0OiByb3cuaWNvISwgZW5kOiByb3cuaWNvISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWNzOiB7IHN0YXJ0OiByb3cudWNzISwgZW5kOiByb3cudWNzISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXVzOiB7IHN0YXJ0OiByb3cudXVzISwgZW5kOiByb3cudXVzISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmtzOiB7IHN0YXJ0OiByb3cubmtzISwgZW5kOiByb3cubmtzISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzaWM6IHsgc3RhcnQ6IDAsIGVuZDogcm93Lm1lc2ljIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmRfbXNrOiByb3cuZHJkIS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Z1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVhOiB7IHN0YXJ0OiByb3cudWVhISwgZW5kOiByb3cudWVhISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlYjogeyBzdGFydDogcm93LnVlYiEsIGVuZDogcm93LnVlYiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWM6IHsgc3RhcnQ6IHJvdy51ZWMhLCBlbmQ6IHJvdy51ZWMhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVkOiB7IHN0YXJ0OiByb3cudWVkISwgZW5kOiByb3cudWVkISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZTogeyBzdGFydDogcm93LnVlZSEsIGVuZDogcm93LnVlZSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWY6IHsgc3RhcnQ6IHJvdy51ZWYhLCBlbmQ6IHJvdy51ZWYhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVnOiB7IHN0YXJ0OiByb3cudWVnISwgZW5kOiByb3cudWVnISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlaDogeyBzdGFydDogcm93LnVlaCEsIGVuZDogcm93LnVlaCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWk6IHsgc3RhcnQ6IHJvdy51ZWkhLCBlbmQ6IHJvdy51ZWkhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVqOiB7IHN0YXJ0OiByb3cudWVqISwgZW5kOiByb3cudWVqISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlazogeyBzdGFydDogcm93LnVlayEsIGVuZDogcm93LnVlayEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWw6IHsgc3RhcnQ6IHJvdy51ZWwhLCBlbmQ6IHJvdy51ZWwhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVtOiB7IHN0YXJ0OiByb3cudWVtISwgZW5kOiByb3cudWVtISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlbjogeyBzdGFydDogcm93LnVlbiEsIGVuZDogcm93LnVlbiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTA6IHsgc3RhcnQ6IHJvdy50ZTAhLCBlbmQ6IHJvdy50ZTAhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGUxOiB7IHN0YXJ0OiByb3cudGUxISwgZW5kOiByb3cudGUxISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlMjogeyBzdGFydDogcm93LnRlMiEsIGVuZDogcm93LnRlMiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTM6IHsgc3RhcnQ6IHJvdy50ZTMhLCBlbmQ6IHJvdy50ZTMhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU0OiB7IHN0YXJ0OiByb3cudGU0ISwgZW5kOiByb3cudGU0ISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlNTogeyBzdGFydDogcm93LnRlNSEsIGVuZDogcm93LnRlNSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTY6IHsgc3RhcnQ6IHJvdy50ZTYhLCBlbmQ6IHJvdy50ZTYhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU3OiB7IHN0YXJ0OiByb3cudGU3ISwgZW5kOiByb3cudGU3ISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlODogeyBzdGFydDogcm93LnRlOCEsIGVuZDogcm93LnRlOCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTk6IHsgc3RhcnQ6IHJvdy50ZTkhLCBlbmQ6IHJvdy50ZTkhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5wYXJlbnRDbnQuVHlwVWxvaHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlTdGF2OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwVWxvaHkgPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gXCJ1Y3RaYXBpc3kjXCI7IC8vTk9URTogTXVzaSBieXQgc3Rlam5lIG5pIG5hIE1haW5BcHAuY3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRTdGF2OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwVWxvaHkgPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlJvenBvY2V0WmFwaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZCA9IFwicm96WmFwaXN5I1wiOyAvL05PVEU6IE11c2kgYnl0IHN0ZWpuZSBuaSBuYSBNYWluQXBwLmNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG86XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBVbG9oeSA9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250b1phcGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBcInNlem5hbVNhbGRva29udG8jXCI7IC8vTk9URTogTXVzaSBieXQgc3Rlam5lIG5pIG5hIE1haW5BcHAuY3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEdFcnJvcihcIk5vdFN1cHBvcnRlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Q250Lm5hdmlnYXRlKCdHb3JkaWMuVWNyLldlYkNsaWVudC5HU2V6bmFtRWtvWmF6bmFtdScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUeXBVbG9oeTogdHlwVWxvaHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEZpbHRlcjogZmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdXJyZW50Um93OnJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU3RyaWN0RmlsdGVyOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBGaWx0ZXJTdHJQb3BpczogZi5maWx0ZXJTdHJQb3BpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXV0b0xvYWREYXRhOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBnZXRaYXBpc0ZpbHRlcigpOiBHRWtvRmlsdGVyRHRvIHtcclxuICAgICAgICAvLyAgICB2YXIgc2VsID0gdGhpcy4kZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiLCBmYWxzZSlbMF0gYXMgR1Nlem5hbVphcGlzdVN0YXZ1RHRvO1xyXG4gICAgICAgIC8vICAgIGlmICh0aGlzLnBhcmVudENudC5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvKVxyXG4gICAgICAgIC8vICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdWNzOiB7IHN0YXJ0OiBzZWwudWNzLCBlbmQ6IHNlbC51Y3MgfSxcclxuICAgICAgICAvLyAgICAgICAgICAgIG1lc2ljOiB7IHN0YXJ0OiBzZWwubWVzaWMsIGVuZDogc2VsLm1lc2ljIH0sXHJcbiAgICAgICAgLy8gICAgICAgICAgICBhYzogeyBzdGFydDogc2VsLmFjLCBlbmQ6IHNlbC5hYyB9XHJcbiAgICAgICAgLy8gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vICAgIHJldHVybiB7XHJcbiAgICAgICAgLy8gICAgICAgIHVjczogeyBzdGFydDogc2VsLnVjcywgZW5kOiBzZWwudWNzIH0sXHJcbiAgICAgICAgLy8gICAgICAgIGRyZF9tc2s6IHNlbCEuZHJkIS50b1N0cmluZygpLFxyXG4gICAgICAgIC8vICAgICAgICBtZXNpYzogeyBzdGFydDogc2VsLm1lc2ljLCBlbmQ6IHNlbC5tZXNpYyB9LFxyXG4gICAgICAgIC8vICAgICAgICBhYzogeyBzdGFydDogc2VsLmFjLCBlbmQ6IHNlbC5hYyB9XHJcbiAgICAgICAgLy8gICAgfTtcclxuICAgICAgICAvL31cclxuXHJcbiAgIFxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgZG9GaWx0ZXJDbGljaygpOiB2b2lkIHtcclxuICAgICAgICAvLyAgICAvL05PVEU6IFRvdG8gamUgc3BhdG5lLCBhbGUgcHJvIHVrYXprdSBzdGFjaSAtIGplIG51dG5lIGZpbHRyb3ZhdCBpIHMgZWxlbWVudHlcclxuICAgICAgICAvLyAgICB0aGlzLnBhcmVudENudC5lbGVtZW50LmZpbmQoXCIuZ2ZpbHRlcnBhbmVsXCIpLmZpbmQoXCIuanMtaGxhdm5pVnlobGVkYXRcIikuY2xpY2soKTtcclxuXHJcbiAgICAgICAgLy8gICAgLy9UT0RPOiBQbyB0ZXN0ZWNoIHMgZGlzdHJpYnV0b3J5IHZzZSB6cmVmYWt0b3JpdCBuYSB0YWtvdnl0byB6YXBpcywgbXVzaSBieXQgYWxlIHJhZG5lIG90ZXN0b3ZhbiBwcm8gdnNlY2hueSBwcmlwYWR5XHJcbiAgICAgICAgLy8gICAgLy90aGlzLmdldEZpbHRlcih0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJnZXRDb25maXJtZWREYXRhXCIpKS50aGVuKChkKSA9PiB7IHRoaXMubG9hZERhdGEoZCk7IH0pO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgXHJcblxyXG4gICAgICAgIC8vLyoqIFByaXByYXZhIHBybyBnZW5lcm92YW5pIHNlc3RhdnkgKi9cclxuICAgICAgICAvL3ByaXZhdGUgcmVwb3J0U3RhcnRpbmcocmk6IElHUHJpbnRBY3Rpb25SZXBvcnRTdGFydGluZzxHU2V6bmFtRWtvWmF6bmFtdUdlbmVyYXRvckR0bz4pOiBKUXVlcnlQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyAgICByZXR1cm4gdGhpcy5nZXRGaWx0ZXIodGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q29uZmlybWVkRGF0YVwiKSlcclxuICAgICAgICAvLyAgICAgICAgLnRoZW4oKGYpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgIHJpLmN1c3RvbUR0byA9IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0eXBVbG9oeTogdGhpcy5wYXJlbnRDbnQuVHlwVWxvaHksXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZmlsdGVyOiBmLmZpbHRlcixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBlbGVtZW50eTogZi5lbGVtZW50eSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBmaWx0ZXJTdHJQb3BpczogZi5maWx0ZXJTdHJQb3Bpc1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfTtcclxuICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgLy99XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVemF2aXJhbmkgb2tuYVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5wYXJlbnRDbnQuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250bykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZU5TID0gZmFsc2U7IGxldCB1c2VPUkcgPSBmYWxzZTsgbGV0IHVzZU9SSiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlciA9IHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldEN1cnJlbnREYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAoZmlsdGVyIGFzIGFueSkudm9sYnkhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChmaWx0ZXIgYXMgYW55KS52b2xieVtpXSA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VOUyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChmaWx0ZXIgYXMgYW55KS52b2xieVtpXSA9PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VPUkogPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoZmlsdGVyIGFzIGFueSkudm9sYnlbaV0gPT0gMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlT1JHID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC51c2VyU2V0dGluZ3MhLnNldChcInVzZWROU1wiLCB1c2VOUyk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC51c2VyU2V0dGluZ3MhLnNldChcInVzZU9SR1wiLCB1c2VPUkcpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQudXNlclNldHRpbmdzIS5zZXQoXCJ1c2VkT1JKXCIsdXNlT1JKKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvL2ludGVyZmFjZSBJR1Nlem5hbVphcGlzdVN0YXZ1UmVzdWx0RHRvIHtcclxuICAgIC8vICAgIFNlem5hbVphcGlzdTogVWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG9bXTtcclxuICAgIC8vICAgIFN1bXk6IFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvXHJcbiAgICAvL31cclxuXHJcblxyXG5cclxuIFxyXG59Il19