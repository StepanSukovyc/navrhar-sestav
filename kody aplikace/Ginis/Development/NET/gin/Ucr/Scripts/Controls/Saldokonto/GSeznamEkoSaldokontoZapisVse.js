"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            class GSeznamEkoSaldokontoZapisVse extends WebClient.GSeznamEkoZaznamuBase {
                constructor() {
                    /** Globalni modulove parametry v JS */
                    super(...arguments);
                    this.logOptions = { name: "GSeznamEkoSaldokontoZapisVse", authorCode: 302, file: "GSeznamEkoSaldokontoZapisVse.ts" };
                }
                onContentReady() {
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
                    //let view = new Gordic.Isl.View<IGSeznamZapisuStavuDtoWithTabSettings>(
                    //    that.parentCnt.isl.UcetniZapis.list(
                    //    ).use((req, next, ctx) => {
                    //        debugger;
                    //        return this.getFilterData(that, req, next) as any;
                    //        return next(req);
                    //    })
                    //    ,
                    //    {
                    //        filterPanel: that.$filterPanel,
                    //        startEmpty: true
                    //    }
                    //);
                    //view.on("change", function (ev, ctx) {               
                    //    that.nastaveniAkci();                
                    //})
                    let sumCols = gridFormat.columns.filter(c => (c.columnType == "currency" || c.columnType == "number") && ("status,drd,mesic,den,rok".indexOf(c.name)) == -1).map(e => e.name);
                    const grid = $.newDiv(that.classGrid)
                        .appendTo(this.parentCnt.element)
                        .css("height", "100%")
                        .gautofit()
                        .ggrid({
                        //rowHeight: 32,
                        columnMode: "full", // fit (defaultne by melo byt toto), full
                        data: [],
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
                        //that.reload();
                        that.loadDataOld();
                    });
                    //#region Kl. zkratky
                    this.createShortCut();
                    if (this.AutoLoadData)
                        //that.reload();
                        this.loadDataOld();
                }
                /**
                * Vytvoreni klavesovych zkratek
                *
                * */
                createShortCut() {
                    super.createActions();
                    let that = this;
                    this.parentCnt.element.gshortcut({
                        key: "INSERT",
                        description: "jres:31100226", //RC 31100226 : Načtení dat
                        group: Gordic.Shortcuts.Groups.Task,
                        canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        action: this.insAct
                    });
                    //this.parentCnt.element.gshortcut({
                    //    key: "DELETE",
                    //    description: "jres:31100181", //RC 31100181 : Vyčistit
                    //    canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                    //    group: Gordic.Shortcuts.Groups.Task,
                    //    action: this.clearFilterRowAct
                    //});
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
                    this.clearFilterRowAct = this.parentCnt.actions.add({
                        name: "clearFilterRowAct",
                        caption: "jres:31100267", //RC 31100267 : Vyčistit filtr seznamu
                        icon: "gi-bin",
                        run: (ev, ctx) => { this.$filterPanel.gfilterpanel("clear"); }
                    });
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
                    const that = this;
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
                            const grid = that.getGrid();
                            if (grid == null)
                                return;
                            grid
                                .ggridserverfilter("clear")
                                .ggridserverfilter("apply", that.getZapisFilter());
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
                loadDataOld(fPanelData) {
                    const that = this;
                    //if (grid == null) return;
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
                        const grid = that.getGrid();
                        if (grid == null)
                            return;
                        grid.ggrid("getView").updateData(data.SeznamZapisu, "reset");
                        this.previewController?.enable(enable);
                        //#region Experimental - nekopirovat!
                        //if (typeof data.Sumy !== "undefined") {
                        //    var $souctySpn = $("<span>");
                        //    $souctySpn.append("jres:31100242"); //RC 31100242 : Součty:
                        //    if (this.Zapisova) {
                        //        this.formatSumy("jres:31100056", data.Sumy.c0!, $souctySpn, ", "); //RC 31100056 : MD
                        //        this.formatSumy("jres:31100057", data.Sumy.c1!, $souctySpn, ", "); //RC 31100057 : Dal
                        //        this.formatSumy("jres:31100058", data.Sumy.c0c1!, $souctySpn, ""); //RC 31100058 : MD - Dal
                        //    }
                        //    else {
                        //        this.formatSumy("jres:31100059", data.Sumy.c0!, $souctySpn, ", "); //RC 31100059 : MO MD
                        //        this.formatSumy("jres:31100060", data.Sumy.c1!, $souctySpn, ", "); //RC 31100060 : MO Dal
                        //        this.formatSumy("jres:31100061", data.Sumy.c0c1!, $souctySpn, "; "); //RC 31100061 : MO MD - Dal
                        //        this.formatSumy("jres:31100062", data.Sumy.c0_as!, $souctySpn, ", "); //RC 31100062 : AS MD
                        //        this.formatSumy("jres:31100063", data.Sumy.c1_as!, $souctySpn, ", "); //RC 31100063 : AS Dal
                        //        this.formatSumy("jres:31100064", data.Sumy.c0c1_as!, $souctySpn); //RC 31100064 : AS MD - Dal
                        //    }
                        //    this.$grid.ggrid("statusWidget", "ucrsuma-panel").empty().append($souctySpn);
                        //}
                        //#endregion
                    });
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
                    //        filterStorageService: new GUcrMaskaService({ typSestavy: this.typSestavy, parentContent: that.parentCnt, fragments: "*,elementy" }),
                    //        autoLoadAfterChoseFilter: false,
                    //        apply: (ev, data) => { this.loadDataOld(data.filter); },
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
                getData(filter) {
                    let def = $.Deferred();
                    let that = this;
                    if (this.parentCnt.TypUlohy === 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */) {
                        //filter.RadekStavu = this.CurrentRow;
                        let rq = {
                            RadekStavu: this.CurrentRow,
                            Maska: filter.filter,
                            Maska2: filter.filter,
                            TypUlohy: 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */,
                            Elementy: filter.elementy,
                            logovatGdpr: true,
                            maxRecords: -1,
                        };
                        return that.getDataSaldokontoZapisy(def, rq, null);
                    }
                    else //if (this.parentCnt.TypUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapisyVse) {
                        return that.getSaldokontoZapisyVse(filter);
                    //}
                }
                /**
                 * Nacteni vsech zapisu
                 *
                 * @param def
                 * @param filter
                 */
                getSaldokontoZapisyVse(filter) {
                    const op = this.parentCnt.beginOperation({
                        id: "GUcrZapisListAllRequestDto",
                        progress: 0, total: 100,
                        text: "jres:30250289", //RC 30250289 : Načítám...
                        cancelAction: new GAction({ caption: "jres:30250285", run: () => { task.cancel(); }, name: "cancelAct" }) //RC 30250285 : Storno
                    });
                    var task = Gordic.Async.GTaskManager.start("Gordic.Uct.Server.GUcrZapisySaldokontoAsync", {
                        Maska: filter.filter,
                        RadekStavu: this.Rows,
                        Maska2: filter.filter,
                        TypUlohy: this.parentCnt.TypUlohy,
                        Elementy: filter.elementy,
                        logovatGdpr: true,
                        maxRecords: -1,
                        Nastaveni: { OtazkaVelkeMnozstviZaznamu: false }
                    });
                    return task.getPromise()
                        .then((result) => { return { SeznamZapisu: result.result, Sumy: [] }; }, (t) => {
                        if (t.state === 6 /* Gordic.Async.GTaskState.cancelSignalized */) {
                            this.parentCnt.dialogs.alert("Stornovano");
                        }
                        else if (t.state === 4 /* Gordic.Async.GTaskState.faulted */) {
                            this.parentCnt.dialogs.showException(t.exception);
                            t.handled = true;
                        }
                        return $.Deferred().reject().promise();
                    })
                        .progress((a) => {
                        if (a.progress) {
                            op.progress = a.progress.current, op.total = a.progress.total, op.text = a.progress.text;
                            this.parentCnt.progressOperation(op);
                        }
                    }).always(() => this.parentCnt.endOperation(op));
                }
                /**
                 * Nacteni dat pro saldokonto zapisy
                 * @param def
                 * @param maska
                 * @param rq
                 */
                getDataSaldokontoZapisy(def, rq, filters) {
                    let that = this;
                    this.parentCnt.beginOperation("");
                    that.parentCnt.isl.UcrUcetniZapis.listData({ rq: rq, filters: filters })
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
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeption(that.parentCnt, obj, type, rq, null);
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
                    })
                        .always(() => {
                        that.parentCnt.endOperation();
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
                        var returnMessage = Gordic.Eko.WebClient.Common.ResolveExeptionNew(that.parentCnt, jqXHR, rq);
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
                doFilterClick() {
                    //NOTE: Toto je spatne, ale pro ukazku staci - je nutne filtrovat i s elementy
                    this.parentCnt.element.find(".gfilterpanel").find(".js-hlavniVyhledat").click();
                    //TODO: Po testech s distributory vse zrefaktorit na takovyto zapis, musi byt ale radne otestovan pro vsechny pripady
                    //this.getFilter(this.$filterPanel.gfilterpanel("getConfirmedData")).then((d) => { this.loadData(d); });
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
            WebClient.GSeznamEkoSaldokontoZapisVse = GSeznamEkoSaldokontoZapisVse;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUVrb1NhbGRva29udG9aYXBpc1ZzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTZXpuYW1Fa29TYWxkb2tvbnRvWmFwaXNWc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQW82Q2Y7QUFwNkNELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW82Q25CO0lBcDZDZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBbzZDN0I7UUFwNkNvQixXQUFBLFNBQVM7WUFFMUIsTUFBYSw0QkFBNkIsU0FBUSxVQUFBLHFCQUFxQjtnQkFBdkU7b0JBQ0ksdUNBQXVDOztvQkEyQnZDLGVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSw4QkFBOEIsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRSxDQUFDO2dCQTQzQ3BILENBQUM7Z0JBMTNDVSxjQUFjO29CQUNqQixnREFBZ0Q7b0JBQ2hELHlDQUF5QztvQkFDekMsdUNBQXVDO29CQUN2QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBR2hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDdkUsSUFBSSxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTt3QkFDcEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUE7b0JBQzNFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO29CQUt6QixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNoRCxJQUFJLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPO3dCQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbkUsd0VBQXdFO29CQUN4RSwwQ0FBMEM7b0JBQzFDLGlDQUFpQztvQkFDakMsbUJBQW1CO29CQUNuQiw0REFBNEQ7b0JBQzVELDJCQUEyQjtvQkFDM0IsUUFBUTtvQkFDUixPQUFPO29CQUNQLE9BQU87b0JBQ1AseUNBQXlDO29CQUN6QywwQkFBMEI7b0JBQzFCLE9BQU87b0JBQ1AsSUFBSTtvQkFDSix1REFBdUQ7b0JBQ3ZELDJDQUEyQztvQkFDM0MsSUFBSTtvQkFFSixJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxVQUFVLElBQUksQ0FBQyxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQWEsQ0FBQztvQkFDM0wsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO3lCQUNoQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7eUJBQ2hDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO3lCQUNyQixRQUFRLEVBQUU7eUJBQ1YsS0FBSyxDQUFDO3dCQUNILGdCQUFnQjt3QkFDaEIsVUFBVSxFQUFFLE1BQU0sRUFBTSx5Q0FBeUM7d0JBQ2pFLElBQUksRUFBRSxFQUFFO3dCQUNSLGFBQWEsRUFBRSxJQUFJLE9BQU8sQ0FBQzs0QkFDdkIsSUFBSSxFQUFFLG9CQUFvQjs0QkFDMUIsR0FBRyxFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7Z0NBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUUxQyxDQUFDO3lCQUNKLENBQUM7d0JBQ0Ysd0dBQXdHO3dCQUN4RyxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFTO3dCQUN2QyxjQUFjLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsNEdBQTRHO3dCQUNuSixRQUFRLEVBQUUsV0FBVzt3QkFDckIsV0FBVyxFQUFFOzRCQUNULEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRTt5QkFDckM7d0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFOzRCQUNuQixxRkFBcUY7NEJBQ3JGLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBRWhDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBRWxDLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDO2dDQUNkLE9BQU87NEJBQ1gsOEVBQThFOzRCQUM5RSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QyxDQUFDO3dCQUVELCtJQUErSTtxQkFDbEosQ0FBQzt5QkFDRCxRQUFRLENBQ0w7d0JBQ0ksaUJBQWlCO3dCQUNqQixpQkFBaUIsRUFBRSxJQUFJO3dCQUN2QixpQkFBaUIsRUFBRSxPQUFPO3dCQUMxQixnQkFBZ0I7d0JBQ2hCLHdCQUF3Qjt3QkFDeEIsMENBQTBDO3dCQUMxQyx5RUFBeUU7cUJBQzVFLENBQ0o7eUJBQ0EsaUJBQWlCLENBQUM7d0JBQ2YsMERBQTBEO3dCQUMxRCwwREFBMEQ7d0JBQzFELFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTTtxQkFDM0IsQ0FBQzt5QkFDRCxFQUFFLENBQUMsMkJBQTJCLEVBQUUsVUFBVSxFQUFFO3dCQUN6QyxnQkFBZ0I7d0JBQ2hCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDdkIsQ0FBQyxDQUFDLENBQUM7b0JBRVAscUJBQXFCO29CQUNyQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBS3RCLElBQUksSUFBSSxDQUFDLFlBQVk7d0JBQ2pCLGdCQUFnQjt3QkFDaEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUMzQixDQUFDO2dCQUNBOzs7b0JBR0k7Z0JBQ0ssY0FBYztvQkFDcEIsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUN0QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQzt3QkFDN0IsR0FBRyxFQUFFLFFBQVE7d0JBQ2IsV0FBVyxFQUFFLGVBQWUsRUFBRSwyQkFBMkI7d0JBQ3pELEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJO3dCQUNuQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDN0QsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO3FCQUN0QixDQUFDLENBQUM7b0JBRUgsb0NBQW9DO29CQUNwQyxvQkFBb0I7b0JBQ3BCLDREQUE0RDtvQkFDNUQsb0VBQW9FO29CQUNwRSwwQ0FBMEM7b0JBQzFDLG9DQUFvQztvQkFDcEMsS0FBSztvQkFFTCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7d0JBQzdCLEdBQUcsRUFBRSxHQUFHO3dCQUNSLFdBQVcsRUFBRSxlQUFlLEVBQUUsK0JBQStCO3dCQUM3RCxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDN0QsS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUk7d0JBQ25DLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYTtxQkFDN0IsQ0FBQyxDQUFDO29CQUVILElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQzt3QkFDN0IsR0FBRyxFQUFFLEdBQUc7d0JBQ1IsV0FBVyxFQUFFLGVBQWUsRUFBRSxpQ0FBaUM7d0JBQy9ELFVBQVUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUM3RCxLQUFLLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSTt3QkFDbkMsTUFBTSxFQUFFLElBQUksQ0FBQyxpQkFBaUI7cUJBQ2pDLENBQUMsQ0FBQztvQkFDSCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzVCLElBQUksSUFBSSxLQUFLLElBQUksRUFBRSxDQUFDO3dCQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDOzRCQUNYLEdBQUcsRUFBRSxtQkFBbUI7NEJBQ3hCLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJOzRCQUNuQyxXQUFXLEVBQUUsZUFBZSxFQUFFLDRDQUE0Qzs0QkFDMUUsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZO3lCQUM1QixDQUFDLENBQUM7d0JBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQzs0QkFDWCxHQUFHLEVBQUUsYUFBYTs0QkFDbEIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUk7NEJBQ25DLFdBQVcsRUFBRSxlQUFlLEVBQUUsd0RBQXdEOzRCQUN0RixNQUFNLEVBQUUsSUFBSSxDQUFDLHFCQUFxQjt5QkFDckMsQ0FBQyxDQUFDO3dCQUVILElBQUksQ0FBQyxTQUFTLENBQUM7NEJBQ1gsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzs0QkFDZiw4Q0FBOEM7NEJBQzlDLFdBQVcsRUFBRSxlQUFlLEVBQUUsbUZBQW1GOzRCQUNqSCxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQzs0QkFDN0QsS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUk7NEJBQ25DLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTt5QkFDdEIsQ0FBQyxDQUFDO29CQUNQLENBQUM7Z0JBQ0wsQ0FBQztnQkFFTSxnQkFBZ0I7b0JBQ25CLElBQUksRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQThFLENBQUM7b0JBQ2xILHlCQUF5QjtvQkFFekIsRUFBRSxDQUFDLGtCQUFrQixDQUFDO3dCQUNsQixJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsZUFBZSxFQUFFLHVCQUF1Qjt3QkFDakQsTUFBTSxFQUFFLElBQUk7d0JBQ1osS0FBSyxFQUFFLEdBQUc7d0JBQ1YsU0FBUyxFQUFFOzRCQUNQLE9BQU8sRUFBRTtnQ0FDTCxjQUFjLEVBQUUsZUFBZSxFQUFFLHVCQUF1QjtnQ0FDeEQsUUFBUSxFQUFFO29DQUNOLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTt3Q0FDakIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzt3Q0FDbEIsT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxvRkFBb0Y7b0NBQ3pKLENBQUM7b0NBQ0QsSUFBSSxFQUFFLDBCQUEwQjtvQ0FDaEMsVUFBVSxFQUFFLEtBQUs7aUNBQ3BCOzZCQUNKO3lCQUNKO3FCQUNKLENBQUMsQ0FBQztvQkFDSCxDQUFDO3dCQUNHLEVBQUUsQ0FBQyxlQUFlLENBQUM7NEJBQ2YsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsT0FBTyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7NEJBQ2hELFlBQVksRUFBRSxVQUFVLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUTtnQ0FDdkMsSUFBRyxJQUFJLEVBQUUsVUFBVTtvQ0FBRSxPQUFPLEVBQUUsQ0FBQztnQ0FDL0IsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUM7b0NBQ3RDLE9BQU8sSUFBSSxDQUFDOztvQ0FFWixPQUFPLEdBQUcsQ0FBQzs0QkFDbkIsQ0FBQzs0QkFDRCxLQUFLLEVBQUUsRUFBRTs0QkFDVCxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxzQkFBc0I7NEJBQzdHLHVGQUF1Rjt5QkFDMUYsQ0FBQyxDQUFDO3dCQUVILElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFOzRCQUMzQyxFQUFFLENBQUMsYUFBYSxDQUFDO2dDQUNiLElBQUksRUFBRSxRQUFRO2dDQUNkLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFpQixDQUFDLElBQUksRUFBRTtnQ0FDOUMsS0FBSyxFQUFFLEdBQUc7Z0NBQ1YscUlBQXFJOzZCQUN4SSxDQUFDLENBQUM7d0JBQ1AsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7NEJBQzNDLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0NBQ2IsSUFBSSxFQUFFLFFBQVE7Z0NBQ2QsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWlCLENBQUMsSUFBSSxFQUFFO2dDQUM5QyxLQUFLLEVBQUUsR0FBRztnQ0FDVixxSUFBcUk7NkJBQ3hJLENBQUMsQ0FBQzt3QkFDUCxFQUFFLENBQUMsYUFBYSxDQUFDOzRCQUNiLElBQUksRUFBRSxLQUFLOzRCQUNYLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7NEJBQ3pCLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7NEJBQzNCLEtBQUssRUFBRSxFQUFFOzRCQUNULG1CQUFtQjs0QkFDbkIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQzt5QkFDdkUsQ0FBQyxDQUFDO29CQUdQLENBQUM7b0JBRUQsSUFBSSxlQUFlLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBR3JFLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNoQixFQUFFLENBQUMsZUFBZSxDQUFDOzRCQUNmLElBQUksRUFBRSxLQUFLOzRCQUNYLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUI7NEJBQzVDLFdBQVcsRUFBRSxlQUFlLEVBQUUsbUJBQW1COzRCQUNqRCxLQUFLLEVBQUUsRUFBRTs0QkFDVCxrTEFBa0w7NEJBQ2xMLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7Z0NBQzVDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxpQkFBaUI7Z0NBQ3pELFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7Z0NBQ2pFLFVBQVUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0NBQzlFLFdBQVcsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7NkJBQ2xGLENBQUM7eUJBQ0wsQ0FBQyxDQUFDO3dCQUNILEVBQUUsQ0FBQyxhQUFhLENBQUM7NEJBQ2IsSUFBSSxFQUFFLEtBQUs7NEJBQ1gsT0FBTyxFQUFFLEtBQUs7NEJBQ2QsS0FBSyxFQUFFLEVBQUU7NEJBQ1QsTUFBTSxFQUFFLElBQUk7NEJBQ1osU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7NEJBQzlDLHdCQUF3Qjt5QkFDM0IsQ0FBQyxDQUFDO3dCQUlILEVBQUUsQ0FBQyxhQUFhLENBQUM7NEJBQ2IsSUFBSSxFQUFFLE1BQU07NEJBQ1osT0FBTyxFQUFFLGVBQWUsRUFBRSwyQ0FBMkM7NEJBQ3JFLE1BQU0sRUFBRSxJQUFJLEVBQVksdUVBQXVFOzRCQUMvRixLQUFLLEVBQUUsR0FBRzs0QkFDVixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQywyQ0FBMkM7eUJBQ3pJLENBQUMsQ0FBQztvQkFDUCxDQUFDO29CQUdELEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFJekQsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBQ2hCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLHdFQUFnRSxFQUFFLENBQUM7NEJBQzFGLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQ0FDakIsSUFBSSxFQUFFLElBQUk7Z0NBQ1YsT0FBTyxFQUFFLGVBQWUsRUFBRSx1QkFBdUI7Z0NBQ2pELFdBQVcsRUFBRSxlQUFlLEVBQUUsdUJBQXVCO2dDQUNyRCxLQUFLLEVBQUUsR0FBRztnQ0FDVixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyx1QkFBdUI7NkJBQ3RILENBQUMsQ0FBQzs0QkFDSCxFQUFFLENBQUMsaUJBQWlCLENBQUM7Z0NBQ2pCLElBQUksRUFBRSxRQUFRO2dDQUNkLE9BQU8sRUFBRSxlQUFlLEVBQUUsdUJBQXVCO2dDQUNqRCxXQUFXLEVBQUUsZUFBZSxFQUFFLHVCQUF1QjtnQ0FDckQsS0FBSyxFQUFFLEdBQUc7Z0NBQ1YsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsdUJBQXVCOzZCQUMxSCxDQUFDLENBQUM7NEJBQ0gsRUFBRSxDQUFDLGlCQUFpQixDQUFDO2dDQUNqQixJQUFJLEVBQUUsV0FBVztnQ0FDakIsT0FBTyxFQUFFLGVBQWUsRUFBRSxrQkFBa0I7Z0NBQzVDLFdBQVcsRUFBRSxlQUFlLEVBQUUsdUJBQXVCO2dDQUNyRCxLQUFLLEVBQUUsRUFBRTtnQ0FDVCxxSEFBcUg7NkJBQ3hILENBQUMsQ0FBQzs0QkFDSCxFQUFFLENBQUMsaUJBQWlCLENBQUM7Z0NBQ2pCLElBQUksRUFBRSxJQUFJO2dDQUNWLE9BQU8sRUFBRSxlQUFlLEVBQUUsd0JBQXdCO2dDQUNsRCxXQUFXLEVBQUUsZUFBZSxFQUFFLHVCQUF1QjtnQ0FDckQsS0FBSyxFQUFFLEdBQUc7Z0NBQ1YsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsdUJBQXVCOzZCQUN0SCxDQUFDLENBQUM7NEJBQ0gsRUFBRSxDQUFDLGlCQUFpQixDQUFDO2dDQUNqQixJQUFJLEVBQUUsUUFBUTtnQ0FDZCxPQUFPLEVBQUUsZUFBZSxFQUFFLHdCQUF3QjtnQ0FDbEQsV0FBVyxFQUFFLGVBQWUsRUFBRSx3QkFBd0I7Z0NBQ3RELEtBQUssRUFBRSxHQUFHO2dDQUNWLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLHdCQUF3Qjs2QkFDM0gsQ0FBQyxDQUFDOzRCQUNILEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQ0FDakIsSUFBSSxFQUFFLFdBQVc7Z0NBQ2pCLE9BQU8sRUFBRSxlQUFlLEVBQUUsa0JBQWtCO2dDQUM1QyxXQUFXLEVBQUUsZUFBZSxFQUFFLHVCQUF1QjtnQ0FDckQsS0FBSyxFQUFFLEVBQUU7Z0NBQ1QscUhBQXFIOzZCQUN4SCxDQUFDLENBQUM7NEJBQ0gsRUFBRSxDQUFDLGlCQUFpQixDQUFDO2dDQUNqQixJQUFJLEVBQUUsTUFBTTtnQ0FDWixPQUFPLEVBQUUsZUFBZSxFQUFFLGtDQUFrQztnQ0FDNUQsV0FBVyxFQUFFLGVBQWUsRUFBRSxrQ0FBa0M7Z0NBQ2hFLEtBQUssRUFBRSxHQUFHO2dDQUNWLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWdCO2dDQUNyQyxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxrQ0FBa0M7NkJBQ25JLENBQUMsQ0FBQzs0QkFDSCxFQUFFLENBQUMsaUJBQWlCLENBQUM7Z0NBQ2pCLElBQUksRUFBRSxVQUFVO2dDQUNoQixPQUFPLEVBQUUsZUFBZSxFQUFFLG1DQUFtQztnQ0FDN0QsV0FBVyxFQUFFLGVBQWUsRUFBRSxtQ0FBbUM7Z0NBQ2pFLEtBQUssRUFBRSxHQUFHO2dDQUNWLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWdCO2dDQUNyQyxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxtQ0FBbUM7NkJBQ3hJLENBQUMsQ0FBQzt3QkFFUCxDQUFDOzZCQUNJLENBQUM7NEJBQ0YsRUFBRSxDQUFDLGlCQUFpQixDQUFDO2dDQUNqQixJQUFJLEVBQUUsSUFBSTtnQ0FDVixPQUFPLEVBQUUsZUFBZSxFQUFFLGtCQUFrQjtnQ0FDNUMsV0FBVyxFQUFFLGVBQWUsRUFBRSx1QkFBdUI7Z0NBQ3JELEtBQUssRUFBRSxHQUFHO2dDQUNWLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQjs2QkFDakgsQ0FBQyxDQUFDOzRCQUNILEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQ0FDakIsSUFBSSxFQUFFLElBQUk7Z0NBQ1YsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQkFBbUI7Z0NBQzdDLEtBQUssRUFBRSxHQUFHO2dDQUNWLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQjs2QkFDbEgsQ0FBQyxDQUFDOzRCQUNILEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQ0FDakIsSUFBSSxFQUFFLE1BQU07Z0NBQ1osT0FBTyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7Z0NBQ2hELFdBQVcsRUFBRSxlQUFlLEVBQUUsNkJBQTZCO2dDQUMzRCxLQUFLLEVBQUUsR0FBRztnQ0FDVixNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWU7Z0NBQ3JDLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLHNCQUFzQjs2QkFDdkgsQ0FBQyxDQUFDOzRCQUNILEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQ0FDakIsSUFBSSxFQUFFLFNBQVM7Z0NBQ2YsT0FBTyxFQUFFLGVBQWUsRUFBRSwyQkFBMkI7Z0NBQ3JELDZEQUE2RDtnQ0FDN0QsS0FBSyxFQUFFLEdBQUc7Z0NBQ1YsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlO2dDQUNyQyw4SEFBOEg7NkJBQ2pJLENBQUMsQ0FBQzt3QkFHUCxDQUFDO29CQUNMLENBQUM7b0JBR0QsSUFBSSxJQUFJLENBQUMsUUFBUTt3QkFDYixFQUFFLENBQUMsYUFBYSxDQUFDOzRCQUNiLElBQUksRUFBRSxPQUFPOzRCQUNiLE9BQU8sRUFBRSxlQUFlLEVBQUUsMkJBQTJCOzRCQUNyRCxLQUFLLEVBQUUsR0FBRzs0QkFDVixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQywyQkFBMkI7eUJBQzFILENBQUMsQ0FBQztvQkFHUCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDaEIsRUFBRSxDQUFDLGFBQWEsQ0FBQzs0QkFDYixJQUFJLEVBQUUsS0FBSzs0QkFDWCxPQUFPLEVBQUUsZUFBZSxFQUFFLG1CQUFtQjs0QkFDN0MsV0FBVyxFQUFFLGVBQWUsRUFBRSx3REFBd0Q7NEJBQ3RGLEtBQUssRUFBRSxHQUFHOzRCQUNWLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLG1CQUFtQjt5QkFDdkcsQ0FBQyxDQUFDO3dCQUVILElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7d0JBRXRDLENBQUM7NkJBQ0ksQ0FBQzs0QkFDRixFQUFFLENBQUMsYUFBYSxDQUFDO2dDQUNiLElBQUksRUFBRSxVQUFVO2dDQUNoQixPQUFPLEVBQUUsZUFBZSxFQUFHLDRCQUE0QjtnQ0FDdkQsS0FBSyxFQUFFLEdBQUc7Z0NBQ1YsTUFBTSxFQUFFLElBQUksRUFBSSxzQkFBc0I7Z0NBQ3RDLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLDRCQUE0Qjs2QkFDOUgsQ0FBQyxDQUFDO3dCQUNQLENBQUM7d0JBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsS0FBSyxDQUFDLEVBQUUsQ0FBQzs0QkFDakMsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQ0FDYixJQUFJLEVBQUUsT0FBTztnQ0FDYixPQUFPLEVBQUUsZUFBZSxFQUFFLDhCQUE4QjtnQ0FDeEQsS0FBSyxFQUFFLEdBQUc7Z0NBQ1YsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsOEJBQThCOzZCQUMvSCxDQUFDLENBQUM7NEJBQ0gsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQ0FDYixJQUFJLEVBQUUsU0FBUztnQ0FDZixPQUFPLEVBQUUsZUFBZSxFQUFFLDJCQUEyQjtnQ0FDckQsS0FBSyxFQUFFLEdBQUc7Z0NBQ1YsWUFBWSxFQUFFLDJCQUEyQjtnQ0FDekMsUUFBUSxFQUFFO29DQUNOLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO2lDQUN6RDtnQ0FDRCxvTEFBb0w7Z0NBQ3BMLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsbUNBQW1DLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsMkJBQTJCO2dDQUNySix1SkFBdUo7NkJBQzFKLENBQUMsQ0FBQzt3QkFDUCxDQUFDO29CQUNMLENBQUM7b0JBSUQsSUFBSSxJQUFJLENBQUMsUUFBUTt3QkFDYixFQUFFLENBQUMsYUFBYSxDQUFDOzRCQUNiLElBQUksRUFBRSxRQUFROzRCQUNkLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCOzRCQUNoRCxLQUFLLEVBQUUsR0FBRzs0QkFDVixZQUFZLEVBQUUsMEJBQTBCOzRCQUN4QyxRQUFRLEVBQUU7Z0NBQ04sU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7NkJBQ3hEOzRCQUNELFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLHNCQUFzQjt5QkFDckwsQ0FBQyxDQUFDO29CQUVQLENBQUM7d0JBQ0csSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsb0RBQTRDLEVBQUUsQ0FBQyxDQUFDLENBQUM7NkJBQ3hFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLHVEQUE4QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSwyREFBbUQsRUFBRSxDQUFDLENBQUMsQ0FBQzs2QkFDakssQ0FBQzs0QkFDRixFQUFFLENBQUMsYUFBYSxDQUFDO2dDQUNiLElBQUksRUFBRSxTQUFTO2dDQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUsbUJBQW1CO2dDQUM3QyxXQUFXLEVBQUUsZUFBZSxFQUFFLCtCQUErQjtnQ0FDN0QsS0FBSyxFQUFFLEdBQUc7Z0NBQ1YsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSx3RUFBK0QsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFFLG1CQUFtQjs2QkFDbFEsQ0FBQyxDQUFDOzRCQUVILEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0NBQ2IsSUFBSSxFQUFFLFNBQVM7Z0NBQ2YsT0FBTyxFQUFFLGVBQWUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUcsbUJBQW1CO2dDQUN2RSxXQUFXLEVBQUUsZUFBZSxFQUFFLHlEQUF5RDtnQ0FDdkYsS0FBSyxFQUFFLEVBQUU7Z0NBQ1QsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSx3RUFBK0QsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxlQUFlLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxtQkFBbUI7NkJBQzFSLENBQUMsQ0FBQzs0QkFFSCxFQUFFLENBQUMsYUFBYSxDQUFDO2dDQUNiLElBQUksRUFBRSxRQUFRO2dDQUNkLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCO2dDQUNoRCxXQUFXLEVBQUUsZUFBZSxFQUFFLGlFQUFpRTtnQ0FDL0YsS0FBSyxFQUFFLEVBQUU7Z0NBQ1QsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSx3RUFBK0QsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO29DQUN6SixLQUFLLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7b0NBQzdGLGNBQWMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWU7aUNBQy9DLENBQUM7NkJBQ0wsQ0FBQyxDQUFDO3dCQUNQLENBQUM7d0JBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7NEJBQ2pCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxpRkFBd0UsQ0FBQzs0QkFDbkgsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQ0FDYixJQUFJLEVBQUUsWUFBWTtnQ0FDbEIsT0FBTyxFQUFFLGVBQWUsRUFBRSx3QkFBd0I7Z0NBQ2xELFdBQVcsRUFBRSxlQUFlLEVBQUUscUVBQXFFO2dDQUNuRyxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsd0JBQXdCO2dDQUNoTixjQUFjOzZCQUNqQixDQUFDLENBQUM7NEJBQ0gsRUFBRSxDQUFDLGVBQWUsQ0FBQztnQ0FDZixJQUFJLEVBQUUsV0FBVztnQ0FDakIsT0FBTyxFQUFFLGVBQWUsRUFBQywyQkFBMkI7Z0NBQ3BELFdBQVcsRUFBRSxlQUFlLEVBQUUsNkRBQTZEO2dDQUMzRixLQUFLLEVBQUUsRUFBRTtnQ0FDVCxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLDJCQUEyQjs2QkFDekosQ0FBQyxDQUFDOzRCQUVILEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0NBQ2IsSUFBSSxFQUFFLGFBQWE7Z0NBQ25CLE9BQU8sRUFBRSxlQUFlLEVBQWlGLGdDQUFnQztnQ0FDekksS0FBSyxFQUFFLEVBQUUsRUFBQyxvQkFBb0I7Z0NBQzlCLFdBQVcsRUFBRSxRQUFRO2dDQUVyQixZQUFZLEVBQUUsVUFBVSxJQUFJO29DQUN4QixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUUsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUUsQ0FBQyxFQUFFLENBQUM7d0NBQ2hELE9BQU87NENBQ0gsSUFBSSxFQUFFLDhDQUE4QyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsZ0NBQWdDOzRDQUM3RywwQkFBMEI7eUNBQzdCLENBQUM7b0NBQ04sQ0FBQztvQ0FDRCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUcsU0FBUyxFQUFFLENBQUM7d0NBQ3pELE9BQU87NENBQ0gsSUFBSSxFQUFFLHlCQUF5QixFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsNEJBQTRCOzRDQUNwRiwwQkFBMEI7eUNBQzdCLENBQUM7b0NBQ04sQ0FBQztnQ0FDTCxDQUFDOzZCQUNKLENBQUMsQ0FBQzt3QkFDUCxDQUFDO29CQUNMLENBQUM7b0JBRUQsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzt3QkFDMUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO3dCQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzRCQUN0RCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ25DLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxJQUFJLENBQUMsQ0FBQzs0QkFDeEYsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLGdCQUFnQixFQUFFLHNDQUFzQyxFQUFFLENBQUM7aUNBQ3pGLFVBQVUsQ0FBQyxPQUFPLENBQUM7aUNBQ25CLFFBQVEsQ0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFFekMsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQ0FDYixJQUFJLEVBQUUsQ0FBQztnQ0FDUCxPQUFPLEVBQUUsT0FBTztnQ0FDaEIsWUFBWSxFQUFFLGdCQUFnQixDQUFDLFdBQVc7Z0NBQzFDLFlBQVksRUFBRTtvQ0FDVixNQUFNLEVBQUUsVUFBVTtvQ0FDbEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLEVBQUUsQ0FBQyxFQUFFO3dDQUNyRSxJQUFJLEVBQUUsSUFBSTt3Q0FDVixZQUFZLEVBQUUsQ0FBQyxDQUF3QixFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFBLENBQUMsQ0FBQzt3Q0FDbkgsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQW9DLEVBQUUsRUFBRTs0Q0FDakQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7NENBQzVCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7NENBQzlELElBQUksY0FBYyxHQUFHLE1BQU0sRUFBRSxjQUFnRCxDQUFDOzRDQUM5RSxJQUFJLENBQUMsR0FBRyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NENBQzlELElBQUksQ0FBQyxFQUFFLENBQUM7Z0RBQ0osQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7Z0RBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7NENBQ2hFLENBQUM7d0NBQ0wsQ0FBQzt3Q0FDRCxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRyxFQUFFLFlBQVk7NENBQ2xDLElBQUksTUFBTSxHQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsWUFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOzRDQUN4RSxJQUFJLGNBQWMsR0FBRyxNQUFNLEVBQUUsY0FBZ0QsQ0FBQzs0Q0FDOUUsSUFBSSxDQUFDLEdBQUcsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRDQUM5RCxJQUFJLENBQUMsQ0FBQztnREFBRSxPQUFPOzRDQUVmLFFBQVEsRUFBRSxFQUFFLENBQUM7Z0RBQ1QsS0FBSyxPQUFPO29EQUNSLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO29EQUN2RSxNQUFNO2dEQUNWLEtBQUssU0FBUyxDQUFDO2dEQUNmLE9BQU8sQ0FBQyxDQUFDLE9BQU87NENBQ3BCLENBQUM7d0NBQ0wsQ0FBQzt3Q0FDRCxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFOzRDQUNwQixJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRSxDQUFDO2dEQUN4QixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7Z0RBQ2IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnREFDWCxPQUFPLEdBQUcsQ0FBQzs0Q0FDZixDQUFDOzRDQUNELE9BQU8sQ0FBQyxDQUFDO3dDQUNiLENBQUM7cUNBQ0osQ0FBMkM7aUNBQy9DOzZCQUNKLENBQUMsQ0FBQTt3QkFDTixDQUFDO29CQUNMLENBQUM7b0JBRUQsT0FBTyxFQUFTLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRU0sY0FBYyxDQUFDLEVBQW1HO29CQUNySCxJQUFJLFFBQVEsR0FBMkI7d0JBQ25DLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLHVCQUF1QjtxQkFDMUUsQ0FBQTtvQkFFRCxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQzFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFRLENBQUMsQ0FBQyxDQUFDLElBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWhGLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNoQixRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxlQUFlLENBQUMsQ0FBQyxnQ0FBZ0M7d0JBQ3pFLFFBQVEsQ0FBQyxPQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsdUJBQXVCO3dCQUN2RyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDOzRCQUNoQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFOzRCQUMxQixJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO3lCQUMxQixFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2pDLENBQUM7b0JBRUQsT0FBTyxRQUFRLENBQUM7Z0JBQ3BCLENBQUM7Z0JBRU0sYUFBYTtvQkFDaEIsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDeEMsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLE9BQU8sRUFBRSxlQUFlLEVBQUUsK0JBQStCO3dCQUN6RCxJQUFJLEVBQUUsV0FBVzt3QkFDakIsT0FBTyxFQUFFLEtBQUs7d0JBQ2Qsc0ZBQXNGO3dCQUN0RixHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUMzQyxDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7d0JBQzVDLElBQUksRUFBRSxlQUFlO3dCQUNyQixJQUFJLEVBQUUsb0JBQW9CO3dCQUMxQixPQUFPLEVBQUUsS0FBSzt3QkFDZCxPQUFPLEVBQUUsZUFBZSxFQUFFLCtCQUErQjt3QkFDekQsY0FBYyxFQUFFLE9BQU87d0JBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsOERBQThEO3dCQUN4RixHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUMzQyxDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7d0JBQzVDLElBQUksRUFBRSxlQUFlO3dCQUNyQixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsT0FBTyxFQUFFLGVBQWUsRUFBRSxpQ0FBaUM7d0JBQzNELGNBQWMsRUFBRSxPQUFPO3dCQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLDBEQUEwRDt3QkFDcEYsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDM0MsQ0FBQyxDQUFDO29CQUdILElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUN4QyxJQUFJLEVBQUUsV0FBVzt3QkFDakIsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsT0FBTyxFQUFFLGVBQWUsRUFBRSxzQkFBc0I7d0JBQ2hELEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQzNDLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDM0MsSUFBSSxFQUFFLGNBQWM7d0JBQ3BCLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxLQUFLO3dCQUNkLE9BQU8sRUFBRSxlQUFlLEVBQUUsMEJBQTBCO3dCQUNwRCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUM5QyxDQUFDLENBQUM7b0JBQ0gsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7d0JBQ3hDLElBQUksRUFBRSxXQUFXO3dCQUNqQixPQUFPLEVBQUUsS0FBSzt3QkFDZCxPQUFPLEVBQUUsZUFBZSxFQUFFLDhCQUE4Qjt3QkFDeEQsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDL0MsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUM1QyxJQUFJLEVBQUUsZUFBZTt3QkFDckIsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsSUFBSSxFQUFFLGtCQUFrQjt3QkFDeEIsT0FBTyxFQUFFLGVBQWUsRUFBRSw0QkFBNEI7d0JBQ3RELEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQy9DLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDM0MsSUFBSSxFQUFFLGNBQWM7d0JBQ3BCLE9BQU8sRUFBRSxLQUFLO3dCQUNkLElBQUksRUFBRSxrQkFBa0I7d0JBQ3hCLE9BQU8sRUFBRSxlQUFlLEVBQUUsMEJBQTBCO3dCQUNwRCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQy9ELENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDMUMsSUFBSSxFQUFFLGFBQWE7d0JBQ25CLE9BQU8sRUFBRSxLQUFLO3dCQUNkLElBQUksRUFBRSxrQkFBa0I7d0JBQ3hCLE9BQU8sRUFBRSxlQUFlLEVBQUUseUJBQXlCO3dCQUNuRCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQzlELENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUNoRCxJQUFJLEVBQUUsbUJBQW1CO3dCQUN6QixPQUFPLEVBQUUsZUFBZSxFQUFFLHNDQUFzQzt3QkFDaEUsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNqRSxDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7d0JBQ3JDLElBQUksRUFBRSxRQUFRO3dCQUNkLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTs0QkFDYixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUNBQzdELElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0MsQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDaEQsSUFBSSxFQUFFLG1CQUFtQjt3QkFDekIsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFOzRCQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUNBQzdELElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0MsQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7d0JBQzNDLElBQUksRUFBRSxjQUFjO3dCQUNwQixHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUM5RCxDQUFDLENBQUM7b0JBRUgsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDcEQsSUFBSSxFQUFFLHVCQUF1Qjt3QkFDN0IsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFOzRCQUNiLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDckMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUN6QixDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWxCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUNyQyxJQUFJLEVBQUUsUUFBUTt3QkFDZCxPQUFPLEVBQUUsS0FBSzt3QkFDZCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7NEJBQ2IseUdBQXlHOzRCQUV6RyxrREFBa0Q7NEJBQ2xELGFBQWE7NEJBQ2IsaUJBQWlCOzRCQUNqQixxQkFBcUI7NEJBQ3JCLG9EQUFvRDs0QkFDcEQsMkJBQTJCOzRCQUMzQiwwREFBMEQ7NEJBQzFELG9EQUFvRDs0QkFDcEQsWUFBWTs0QkFDWixPQUFPOzRCQUNQLElBQUk7NEJBQ0osc0VBQXNFOzRCQUN0RSxhQUFhOzRCQUViLGFBQWE7NEJBQ2IsNENBQTRDOzRCQUM1Qyx1QkFBdUI7NEJBQ3ZCLGtEQUFrRDs0QkFDbEQsd0NBQXdDOzRCQUN4QyxJQUFJOzRCQUNKLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDNUIsSUFBSSxJQUFJLElBQUksSUFBSTtnQ0FBRSxPQUFPOzRCQUN6QixJQUFJO2lDQUNDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztpQ0FDMUIsaUJBQWlCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDOzRCQUN2RCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQ3pCLENBQUM7cUJBQ0osQ0FBQyxDQUFDO29CQUVILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUMzQyxJQUFJLEVBQUUsY0FBYzt3QkFDcEIsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFOzRCQUNiLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDNUIsSUFBSSxJQUFJLElBQUksSUFBSTtnQ0FBRSxPQUFPOzRCQUV6QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFzQyxjQUFjLENBQUMsQ0FBQzs0QkFDMUUsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUM7Z0NBQ2hCLE9BQU87NEJBR1gsSUFBSTtpQ0FDQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7aUNBQzFCLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQzs0QkFDckQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUN6QixDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDM0MsSUFBSSxFQUFFLGNBQWM7d0JBQ3BCLE9BQU8sRUFBRSxLQUFLO3dCQUVkLDBGQUEwRjt3QkFDMUYsNEZBQTRGO3dCQUM1RixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ25FLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDMUMsSUFBSSxFQUFFLGFBQWE7d0JBQ25CLE9BQU8sRUFBRSxLQUFLO3dCQUNkLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDbEUsQ0FBQyxDQUFDO2dCQUlQLENBQUM7Z0JBQ0Q7OzttQkFHRztnQkFDSyxnQkFBZ0IsQ0FBQyxRQUFxRDtvQkFDMUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQWMsQ0FBQztvQkFFbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztvQkFDN0UsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7b0JBQzdFLElBQUksSUFBSSxDQUFDLFFBQVE7d0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUV6RCxJQUFJLFFBQVEsdUVBQStEOzJCQUNwRSxRQUFRLHFFQUE2RCxJQUFJLFFBQVEsb0VBQTJEO3dCQUMvSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQzFELElBQUksUUFBUSxvRUFBMkQ7d0JBQ25FLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFFN0QsSUFBSSxRQUFRLHdFQUFnRTsyQkFDckUsUUFBUSxpRkFBd0U7MkJBQ2hGLFFBQVEsaUZBQXdFOzJCQUNoRixRQUFRLDJFQUFtRTsyQkFDM0UsUUFBUSxzRUFBOEQ7d0JBQ3pFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDMUQsSUFBSSxRQUFRLCtFQUF1RTsyQkFDNUUsUUFBUSx5RUFBaUUsRUFBRSxDQUFDO3dCQUMvRSw0REFBNEQ7d0JBQzVELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzt3QkFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUM3RCxDQUFDO29CQUNELElBQUksUUFBUSwrRUFBdUU7MkJBQzVFLFFBQVEseUVBQWlFOzJCQUN6RSxRQUFRLHdFQUFnRTsyQkFDeEUsUUFBUSxpRkFBd0U7MkJBQ2hGLFFBQVEsaUZBQXdFOzJCQUNoRixRQUFRLHNFQUE4RDsyQkFDdEUsUUFBUSx5RUFBaUU7MkJBQ3pFLFFBQVEseUVBQWdFOzJCQUN4RSxRQUFRLDZFQUFvRSxFQUNqRixDQUFDO3dCQUNDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDOUQsQ0FBQztvQkFHRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7b0JBQzlDLElBQUksQ0FBQyxJQUFJLENBQUM7d0JBQ04sSUFBSSxFQUFFLFFBQVE7d0JBQ2QsT0FBTyxFQUFFLGVBQWUsRUFBRSwyQkFBMkI7d0JBQ3JELFFBQVEsRUFBRTs0QkFDTixFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxFQUFFLDJCQUEyQjs0QkFDbEcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsRUFBRSxpQ0FBaUM7NEJBQy9GLDREQUE0RDs0QkFDNUQsdUdBQXVHOzRCQUN2Ryw0SEFBNEg7NEJBQzVIO2dDQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQ0FDbkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxxQ0FBcUM7Z0NBQy9ELE9BQU8sRUFBRSxlQUFlOzZCQUMzQixFQUFFLG1GQUFtRjs0QkFDdEYsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEVBQUUsaUNBQWlDOzRCQUMxRixFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsRUFBRSx1QkFBdUI7NEJBQ2hGLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLHNCQUFzQjt5QkFDaEY7cUJBQ0osQ0FBQyxDQUFDO29CQUVILE9BQU8sSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQUVNLFdBQVcsQ0FBQyxVQUFnQjtvQkFDL0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQiwyQkFBMkI7b0JBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO3lCQUNyQixJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTt3QkFDaEIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs0QkFDMUIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEtBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQ0FDN0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUUvRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFDbkMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7d0JBQ2xDLENBQUM7d0JBQ0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQzt3QkFFL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUN4RixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBRTVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDbkMsQ0FBQyxDQUFDO3lCQUNELElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO3dCQUNYLCtCQUErQjt3QkFDL0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO3dCQUMxQyxxQ0FBcUM7d0JBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDNUIsbUNBQW1DO3dCQUNuQywwREFBMEQ7d0JBRTFELCtCQUErQjt3QkFDL0IsdUNBQXVDO3dCQUN2Qyx1RkFBdUY7d0JBQ3ZGLGVBQWU7d0JBQ2Ysd0ZBQXdGO3dCQUN4RixzRkFBc0Y7d0JBQ3RGLEdBQUc7d0JBQ0gsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUM1QixJQUFJLElBQUksSUFBSSxJQUFJOzRCQUFFLE9BQU87d0JBRXpCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQzdELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBRXZDLHFDQUFxQzt3QkFDckMseUNBQXlDO3dCQUN6QyxtQ0FBbUM7d0JBQ25DLGlFQUFpRTt3QkFDakUsMEJBQTBCO3dCQUUxQiwrRkFBK0Y7d0JBQy9GLGdHQUFnRzt3QkFDaEcscUdBQXFHO3dCQUNyRyxPQUFPO3dCQUNQLFlBQVk7d0JBQ1osa0dBQWtHO3dCQUNsRyxtR0FBbUc7d0JBQ25HLDBHQUEwRzt3QkFDMUcscUdBQXFHO3dCQUNyRyxzR0FBc0c7d0JBQ3RHLHVHQUF1Rzt3QkFDdkcsT0FBTzt3QkFFUCxtRkFBbUY7d0JBQ25GLEdBQUc7d0JBQ0gsWUFBWTtvQkFDaEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQztnQkFHTSxpQkFBaUI7b0JBQ3BCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUU5QixrREFBa0Q7b0JBQ2xELHdFQUF3RTtvQkFDeEUsMENBQTBDO29CQUMxQyw0QkFBNEI7b0JBQzVCLGtDQUFrQztvQkFDbEMscUJBQXFCO29CQUNyQix3Q0FBd0M7b0JBQ3hDLCtDQUErQztvQkFDL0MsS0FBSztvQkFFTCx5Q0FBeUM7b0JBQ3pDLG1FQUFtRTtvQkFDbkUsZ0NBQWdDO29CQUNoQyxHQUFHO29CQUNILHlGQUF5RjtvQkFDekYsdUJBQXVCO29CQUN2Qiw2QkFBNkI7b0JBQzdCLGtFQUFrRTtvQkFDbEUsK0JBQStCO29CQUMvQixnQ0FBZ0M7b0JBQ2hDLGdHQUFnRztvQkFDaEcsb0NBQW9DO29CQUNwQyxrRUFBa0U7b0JBQ2xFLHdFQUF3RTtvQkFDeEUsbUVBQW1FO29CQUNuRSw4RUFBOEU7b0JBQzlFLGdCQUFnQjtvQkFDaEIsK0dBQStHO29CQUMvRyw2QkFBNkI7b0JBQzdCLHFDQUFxQztvQkFDckMscUNBQXFDO29CQUNyQyx3SEFBd0g7b0JBQ3hILDRGQUE0RjtvQkFDNUYsNklBQTZJO29CQUM3SSxjQUFjO29CQUNkLEdBQUc7b0JBRUgsZ0NBQWdDO29CQUNoQyx1Q0FBdUM7b0JBQ3ZDLHFCQUFxQjtvQkFDckIsMEJBQTBCO29CQUMxQiw0QkFBNEI7b0JBQzVCLDJFQUEyRTtvQkFDM0Usc0NBQXNDO29CQUN0QyxtR0FBbUc7b0JBQ25HLDhJQUE4STtvQkFDOUksMENBQTBDO29CQUMxQyxrRUFBa0U7b0JBQ2xFLGdDQUFnQztvQkFDaEMsMENBQTBDO29CQUMxQyx1Q0FBdUM7b0JBRXZDLDhDQUE4QztvQkFDOUMsWUFBWTtvQkFDWixrREFBa0Q7b0JBQ2xELG9EQUFvRDtvQkFDcEQsa0RBQWtEO29CQUNsRCwyTEFBMkw7b0JBQzNMLDBGQUEwRjtvQkFDMUYsbUNBQW1DO29CQUNuQyx3Q0FBd0M7b0JBQ3hDLHFDQUFxQztvQkFDckMsMkJBQTJCO29CQUUzQiw2Q0FBNkM7b0JBQzdDLGlHQUFpRztvQkFDakcsNkRBQTZEO29CQUM3RCxhQUFhO29CQUNiLFNBQVM7Z0JBQ2IsQ0FBQztnQkFFTyxPQUFPLENBQUMsTUFBeUM7b0JBQ3JELElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSx5RUFBZ0UsRUFBRSxDQUFDO3dCQUMxRixzQ0FBc0M7d0JBRXRDLElBQUksRUFBRSxHQUFpRDs0QkFDbkQsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVOzRCQUMzQixLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU07NEJBQ2xCLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTs0QkFDckIsUUFBUSxzRUFBNkQ7NEJBQ3JFLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTs0QkFDekIsV0FBVyxFQUFFLElBQUk7NEJBQ2pCLFVBQVUsRUFBRSxDQUFDLENBQUM7eUJBQ25CLENBQUM7d0JBRUYsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDdkQsQ0FBQzt5QkFDSSxvR0FBb0c7d0JBRXJHLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUMvQyxHQUFHO2dCQUVQLENBQUM7Z0JBQ0Q7Ozs7O21CQUtHO2dCQUNLLHNCQUFzQixDQUFDLE1BQXlDO29CQUVwRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQzt3QkFDckMsRUFBRSxFQUFFLDRCQUE0Qjt3QkFDaEMsUUFBUSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRzt3QkFDdkIsSUFBSSxFQUFFLGVBQWUsRUFBRywwQkFBMEI7d0JBQ2xELFlBQVksRUFBRSxJQUFJLE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxzQkFBc0I7cUJBQ2xJLENBQUMsQ0FBQztvQkFFSCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQW1DLDZDQUE2QyxFQUFFO3dCQUN4SCxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU07d0JBQ2xCLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSTt3QkFDckIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO3dCQUNyQixRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRO3dCQUNqQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7d0JBQ3pCLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixVQUFVLEVBQUUsQ0FBQyxDQUFDO3dCQUNkLFNBQVMsRUFBRSxFQUFFLDBCQUEwQixFQUFFLEtBQUssRUFBRTtxQkFFRixDQUFDLENBQUM7b0JBRXRELE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRTt5QkFDbkIsSUFBSSxDQUNELENBQUMsTUFBTSxFQUFFLEVBQUUsR0FBRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQVMsRUFBa0MsQ0FBQyxDQUFDLENBQUMsRUFDeEcsQ0FBQyxDQUFDLEVBQUUsRUFBRTt3QkFDRixJQUFJLENBQUMsQ0FBQyxLQUFLLHFEQUE2QyxFQUFFLENBQUM7NEJBQ3ZELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDL0MsQ0FBQzs2QkFDSSxJQUFJLENBQUMsQ0FBQyxLQUFLLDRDQUFvQyxFQUFFLENBQUM7NEJBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQ2xELENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO3dCQUNyQixDQUFDO3dCQUNELE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUMzQyxDQUFDLENBQ0o7eUJBQ0EsUUFBUSxDQUFDLENBQUMsQ0FBNkMsRUFBRSxFQUFFO3dCQUN4RCxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs0QkFDYixFQUFFLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQzs0QkFDekYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDekMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDekQsQ0FBQztnQkFFRDs7Ozs7bUJBS0c7Z0JBQ0ssdUJBQXVCLENBQUMsR0FBbUMsRUFBRSxFQUFnRCxFQUFFLE9BQVc7b0JBQzlILElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzt5QkFDbkUsT0FBTyxFQUFFO3lCQUNULElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDWCxXQUFXO3dCQUNYLElBQUksR0FBRyxHQUFHOzRCQUNOLFlBQVksRUFBRSxNQUFNOzRCQUNwQixJQUFJLEVBQUUsRUFBRTt5QkFDWCxDQUFDO3dCQUNGLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2pCLE9BQU87b0JBQ1gsQ0FBQyxDQUFDO3lCQUNELElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUc7d0JBRWxDLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxJQUFXLENBQUMsQ0FBQzt3QkFDNUcsSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLEVBQUUsQ0FBQzs0QkFDcEMscUNBQXFDOzRCQUNyQyxhQUFhO2lDQUNSLElBQUksQ0FBQyxVQUFVLFdBQWtEO2dDQUM5RCxJQUFJLFdBQVcsQ0FBQyxNQUFNLHdFQUErRCxFQUFFLENBQUM7b0NBQ3BGLFFBQVEsQ0FBQztvQ0FDVCxFQUFHLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7b0NBQ3RDLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0NBQzFELENBQUM7cUNBQ0ksSUFBSSxXQUFXLENBQUMsTUFBTSx1RUFBOEQsRUFBRSxDQUFDO29DQUN4RixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO29DQUM5QixPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQ0FDeEIsQ0FBQztxQ0FDSSxDQUFDO29DQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7b0NBQzlCLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dDQUN6QixDQUFDOzRCQUNMLENBQUMsQ0FDQSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBRXhCLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUN6QixDQUFDO3dCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ2xDLENBQUMsQ0FBQzt5QkFDRCxNQUFNLENBQUMsR0FBRyxFQUFFO3dCQUNULElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ2xDLENBQUMsQ0FBQyxDQUNEO29CQUNMLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN6QixDQUFDO2dCQUNEOzs7OzttQkFLRztnQkFDSyxpQkFBaUIsQ0FBQyxHQUFtQyxFQUFFLEtBQWtDLEVBQUUsRUFBMkM7b0JBQzFJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQzt5QkFDOUQsT0FBTyxFQUFFO3lCQUNULElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDWCxJQUFJLEdBQUcsR0FBRzs0QkFDTixZQUFZLEVBQUUsTUFBTTs0QkFDcEIsSUFBSSxFQUFFLEVBQUU7eUJBQ1gsQ0FBQzt3QkFDRixHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNqQixPQUFPO29CQUNYLENBQUMsQ0FBQzt5QkFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHO3dCQUVsQyw4R0FBOEc7d0JBQzlHLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRyxFQUFFLENBQUMsQ0FBQzt3QkFDL0YsSUFBSSxPQUFPLGFBQWEsS0FBSyxRQUFRLEVBQUUsQ0FBQzs0QkFDcEMscUNBQXFDOzRCQUNqQyxhQUFhO2lDQUNSLElBQUksQ0FBQyxVQUFVLFdBQWtEO2dDQUM5RCxJQUFJLFdBQVcsQ0FBQyxNQUFNLHdFQUErRCxFQUFFLENBQUM7b0NBQ3BGLFFBQVEsQ0FBQztvQ0FDVCxFQUFHLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUM7b0NBQ3RDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0NBQ2pELENBQUM7cUNBQ0ksSUFBSSxXQUFXLENBQUMsTUFBTSx1RUFBOEQsRUFBRSxDQUFDO29DQUN4RixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO29DQUM5QixPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQ0FDeEIsQ0FBQztxQ0FDSSxDQUFDO29DQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7b0NBQzlCLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dDQUN6QixDQUFDOzRCQUNMLENBQUMsQ0FDSixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBRXBCLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUM3QixDQUFDO3dCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQzlCLE1BQU0sS0FBSyxDQUFBO29CQUNmLENBQUMsQ0FBQzt5QkFDRCxNQUFNLENBQUMsR0FBRyxFQUFFO3dCQUNULElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7b0JBQ2xDLENBQUMsQ0FBQyxDQUNEO29CQUNMLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUN6QixDQUFDO2dCQUdELHlEQUF5RDtnQkFDekQsaUJBQWlCO2dCQUNqQiw0RUFBNEU7Z0JBQzVFLCtCQUErQjtnQkFDL0IscUJBQXFCO2dCQUNyQix1QkFBdUI7Z0JBQ3ZCLFFBQVE7Z0JBQ1IsMEZBQTBGO2dCQUMxRixxR0FBcUc7Z0JBQ3JHLCtCQUErQjtnQkFDL0IsbUZBQW1GO2dCQUNuRixjQUFjO2dCQUNkLHFGQUFxRjtnQkFDckYsT0FBTztnQkFDUCxvREFBb0Q7Z0JBQ3BELDZDQUE2QztnQkFDN0MsOENBQThDO2dCQUM5Qyx3Q0FBd0M7Z0JBQ3hDLG1CQUFtQjtnQkFDbkIsZ0NBQWdDO2dCQUNoQywwQkFBMEI7Z0JBQzFCLFFBQVE7Z0JBRVIsbUZBQW1GO2dCQUNuRixHQUFHO2dCQUVIOzs7cUJBR0s7Z0JBQ0csYUFBYTtvQkFDakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNoQixJQUFJLFFBQVEsMkVBQWtFLENBQUM7b0JBQy9FLElBQUksRUFBRSxHQUFHLG1CQUFtQixDQUFDLENBQUMsd0NBQXdDO29CQUN0RSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzVCLElBQUksSUFBSSxJQUFJLElBQUk7d0JBQUUsT0FBTztvQkFFekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBc0MsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6RixJQUFJLENBQUMsU0FBUyxFQUFFO3lCQUNYLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUNSLDRCQUE0Qjt3QkFDNUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyx3Q0FBd0MsRUFBRTs0QkFDckUsRUFBRSxFQUFFLEVBQUU7NEJBQ04sUUFBUSxFQUFFLFFBQVE7NEJBQ2xCLE1BQU0sRUFBRSxFQUFFOzRCQUNWLElBQUksRUFBRSxJQUFJOzRCQUNWLFlBQVksRUFBRSxJQUFJOzRCQUNsQixjQUFjLEVBQUUsQ0FBQyxDQUFDLGNBQWM7NEJBQ2hDLFlBQVksRUFBRSxJQUFJOzRCQUNsQixLQUFLLEVBQUUsZUFBZSxDQUFDLGlDQUFpQzt5QkFDM0QsQ0FBQyxDQUFDO29CQUNQLENBQUMsQ0FDQSxDQUFDO2dCQUVWLENBQUM7Z0JBQ00sVUFBVTtvQkFDYixJQUFJLEtBQUssR0FBRyxlQUFlLENBQUMsQ0FBQyw0QkFBNEI7b0JBQ3pELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLFNBQVMsRUFBRTt5QkFDWCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTt3QkFDUixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQzVCLElBQUksSUFBSSxJQUFJLElBQUk7NEJBQUUsT0FBTzt3QkFFekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBc0MsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUNqRixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQzs0QkFDaEIsT0FBTzt3QkFFWCxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLElBQUksUUFBcUQsQ0FBQzt3QkFDMUQsSUFBSSxFQUFVLENBQUM7d0JBQ2YsSUFBSSxNQUFxQixDQUFDO3dCQUMxQixnRUFBZ0U7d0JBQ2hFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLG9FQUEyRCxFQUFFLENBQUM7NEJBQ3JGLEtBQUssR0FBRyxlQUFlLENBQUEsQ0FBQyxpQ0FBaUM7NEJBQ3pELE1BQU0sR0FBRyxFQUFFLENBQUM7NEJBQ1osSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDOzRCQUNiLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO2dDQUMzQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBaUIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLEdBQUcsR0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUN4RSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7Z0NBQzlDLElBQUksR0FBRyxJQUFJLEVBQUU7b0NBQ1QsR0FBRyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFpQixDQUFDLElBQUksRUFBRSxHQUFHLElBQUksR0FBRyxHQUFJLENBQUMsUUFBUSxDQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7O29DQUVwRixHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBaUIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLEdBQUcsR0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDOzRCQUNwRixDQUFDOzRCQUNELElBQUksR0FBRyxJQUFJLEVBQUU7Z0NBQ1QsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDOzRCQUMzQixLQUFLLElBQUksR0FBRyxDQUFDO3dCQUNqQixDQUFDOzZCQUNJLENBQUM7NEJBQ0YsTUFBTSxHQUFHO2dDQUNMLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO2dDQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtnQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7Z0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO2dDQUN2QyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFO2dDQUNuQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEdBQUksQ0FBQyxRQUFRLEVBQUU7Z0NBQzVCLEdBQUcsRUFBRTtvQ0FDRCxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFF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QUksQ0FBQyxTQUFTLENBQUMsWUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3ZELENBQUM7b0JBRUQsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzVDLENBQUM7YUFFSjtZQXg1Q1ksc0NBQTRCLCtCQXc1Q3hDLENBQUE7UUFVTCxDQUFDLEVBcDZDb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBbzZDN0I7SUFBRCxDQUFDLEVBcDZDZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBbzZDbkI7QUFBRCxDQUFDLEVBcDZDUyxNQUFNLEtBQU4sTUFBTSxRQW82Q2YiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjci5XZWJDbGllbnQge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtRWtvU2FsZG9rb250b1phcGlzVnNlIGV4dGVuZHMgR1Nlem5hbUVrb1phem5hbXVCYXNlIGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuICAgICAgICAvKiogR2xvYmFsbmkgbW9kdWxvdmUgcGFyYW1ldHJ5IHYgSlMgKi9cclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBlbGVtZW50UHJvcGVydHlOYW1lTWFwOiBPYmplY3RMaXRlcmFsPHN0cmluZz47XHJcbiAgICAgICAgLy9wcml2YXRlIGFkZFN0clBvcGlzQ29sdW1ucz86IHN0cmluZ1tdOyAgIC8vU2V6bmFtIHNsb3VwY3Ugc3RyLiBwb3Bpc3UsIGt0ZXJlIGJ5IG1lbHkgYnl0IHByaWRhbnkgZG8gZ3JpZHUgKHBvdXplIHBybyBaYXBpc3lVY2V0bmljdHZpKSAoKVxyXG5cclxuICAgICAgICBwcml2YXRlIGRldGFpbEFjdDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIHByZXZGaWx0ZXJBY3Q6IEdBY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBuZXh0RmlsdGVyQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgemFwaXN5QWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgemFwaXN5QWxsQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgZG9rbGFkQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgcHJpbWRva2xhZEFjdDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIGRva2xhZFJPQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgZG9rbGFkQkxLQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBjbGVhckZpbHRlclJvd0FjdDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIGluc0FjdDogR0FjdGlvbjtcclxuICAgICAgICBwcml2YXRlIGNsZWFyQW5kRmlsdGVyQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgc2VsRmlsdGVyQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgc2VsRmlsdGVyQW5kU2VhcmNoQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyUGlkQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgc2hEb2tsYWR5QWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgc2haYXBpc3lBY3Q6IEdBY3Rpb247XHJcblxyXG5cclxuICAgICAgICAvKiogTGltaXQgcG9jdHUgbmFjaXRhbnljaCB6YXpuYW11LCBwb2t1ZCBuZWRvamRlIGsgcG90dnJ6ZW5pLCB6ZSB1eml2YXRlbCBjaGNlIGppdCBwcmVzIGxpbWl0ICovXHJcbiAgICAgICAgc3VtTGltaXQ6IG51bWJlcjtcclxuICAgICAgICBsb2dPcHRpb25zID0geyBuYW1lOiBcIkdTZXpuYW1Fa29TYWxkb2tvbnRvWmFwaXNWc2VcIiwgYXV0aG9yQ29kZTogMzAyLCBmaWxlOiBcIkdTZXpuYW1Fa29TYWxkb2tvbnRvWmFwaXNWc2UudHNcIiB9O1xyXG5cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vdGhpcy5nbG9iYWxzID0gR29yZGljLlVjci5HbG9iYWxzLkdVY3JHbG9iYWxzO1xyXG4gICAgICAgICAgICAvL3RoaXMuemtyYXRreSA9IEdvcmRpYy5VY3IuR2xvYmFscy5HWmtyO1xyXG4gICAgICAgICAgICAvL3RoaXMudGV4dHkgPSBHb3JkaWMuVWNyLkdsb2JhbHMuR1R4dDtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5tZW51QmFyKHRoaXMuY3JlYXRlTWVudWJhckRlZih0aGlzLnBhcmVudENudC5UeXBVbG9oeSkpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGV0YWlsSW5mICE9PSBcInVuZGVmaW5lZFwiICYmIHRoaXMuZGV0YWlsSW5mLnRyaW0oKSAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuc3RhdHVzQmFyKFt7IHR5cGU6IFwic3RhdGljXCIsIGNhcHRpb246IHRoaXMuZGV0YWlsSW5mIH1dKVxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZpbHRlclBhbmVsKCk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgZ3JpZEZvcm1hdCA9IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnByb2ZpbGVzID0gdGhpcy5jcmVhdGVQcm9maWxlcyhncmlkRm9ybWF0KTtcclxuICAgICAgICAgICAgbGV0IHByb2ZpbGVzQXJyID0gW3RoaXMucHJvZmlsZXMuZGVmYXVsdF07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2ZpbGVzLmRva2xhZHkpIHByb2ZpbGVzQXJyLnB1c2godGhpcy5wcm9maWxlcy5kb2tsYWR5KTtcclxuICAgICAgICAgICAgLy9sZXQgdmlldyA9IG5ldyBHb3JkaWMuSXNsLlZpZXc8SUdTZXpuYW1aYXBpc3VTdGF2dUR0b1dpdGhUYWJTZXR0aW5ncz4oXHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQucGFyZW50Q250LmlzbC5VY2V0bmlaYXBpcy5saXN0KFxyXG4gICAgICAgICAgICAvLyAgICApLnVzZSgocmVxLCBuZXh0LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmlsdGVyRGF0YSh0aGF0LCByZXEsIG5leHQpIGFzIGFueTtcclxuICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiBuZXh0KHJlcSk7XHJcbiAgICAgICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgICAgIC8vICAgICxcclxuICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgZmlsdGVyUGFuZWw6IHRoYXQuJGZpbHRlclBhbmVsLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgc3RhcnRFbXB0eTogdHJ1ZVxyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vKTtcclxuICAgICAgICAgICAgLy92aWV3Lm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChldiwgY3R4KSB7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICAgIHRoYXQubmFzdGF2ZW5pQWtjaSgpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy99KVxyXG5cclxuICAgICAgICAgICAgbGV0IHN1bUNvbHMgPSBncmlkRm9ybWF0LmNvbHVtbnMuZmlsdGVyKGMgPT4gKGMuY29sdW1uVHlwZSA9PSBcImN1cnJlbmN5XCIgfHwgYy5jb2x1bW5UeXBlID09IFwibnVtYmVyXCIpICYmIChcInN0YXR1cyxkcmQsbWVzaWMsZGVuLHJva1wiLmluZGV4T2YoYy5uYW1lISkpID09IC0xKS5tYXAoZSA9PiBlLm5hbWUpIGFzIHN0cmluZ1tdO1xyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gJC5uZXdEaXYodGhhdC5jbGFzc0dyaWQpXHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5wYXJlbnRDbnQuZWxlbWVudClcclxuICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAuZ2F1dG9maXQoKVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICAvL3Jvd0hlaWdodDogMzIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsICAgICAvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IG5ldyBHQWN0aW9uKHsgICAgIC8vb2JzbHV6bmEgYWtjZSwga3RlcmEgc2Ugc3BvdXN0aSBkYmwgY2xpY2tlbSBuYWQgcmFka2VtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0RldGFpbChjdHguY2VsbEluZm8uZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZWFyY2hDb2x1bW5zOiBbXCJwb3Bpc1wiLCBcImFjXCJdLCAvL3Nsb3VwY2UsIHBvZGxlIGt0ZXJ5Y2ggc2UgdnlobGVkYXZhIHYgc2VhcmNoYm94dSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCkgYXMgYW55LFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB0aGlzLnByb2ZpbGVzLmRlZmF1bHQsIC8vc2tyeXRlIHNsb3VwY2UgcmVzaXQgcHJlcyBjb2x1bW4uaGlkZGVuICsgY29sdW1uTGlzdCAtIHV6aXZhdGVsaSBqc291IHNrcnl0ZSwgbXV6ZSBzaSBqZSB2b2xpdGVsbmUgemFwbm91dFxyXG4gICAgICAgICAgICAgICAgICAgIHByb2ZpbGVzOiBwcm9maWxlc0FycixcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0TWVudTogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5jbGVhckZpbHRlclJvd0FjdCB9XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IChldiwgc2VsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcHJldmlld1NpZGViYXIuZW1wdHkoKS5hcHBlbmQoXCI8ZGl2PlwiICsgc2VsLmdldFNlbGVjdGlvbihmYWxzZSlbMF0uaXhwICsgXCI8L2Rpdj5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzID0gc2VsLmdldFNlbGVjdGlvbihmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvdEFjdC5lbmFibGVkKHMubGVuZ3RoID4gMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgKHRoaXMucHJldmlld0NvbnRyb2xsZXIgJiYgdHlwZW9mIHRoaXMucHJldmlld0NvbnRyb2xsZXIgIT09IFwidW5kZWZpbmVkXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXI/LnNob3coc1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jZWxsQWN0aXZhdGU6IGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coXCJjZWxsQWN0aXZhdGVcIiwgYXJndW1lbnRzKTt9IC8vTk9URTogTmVkb3N0YW51IHNlIGsgcHV2b2RuaSB1ZGFsb3N0aSwgYWJ5Y2ggemppc3RpbCwgemRhIHNlIGRyemkgY3RybFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZGVrbyhcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvdcSNdG92w70gxZnDoWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5Um93QWxsb3dlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeVJvd0NvbHVtbnM6IHN1bUNvbHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGxvdWjDvSBzZXpuYW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9sb25nTGlzdEFsbG93ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbG9uZ0xpc3RNb2RlbDogXCJHbG9iYWwuVWNyLkFwcFNldHRpbmdzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbG9uZ0xpc3RDb3VudE1ldGhvZDogKHJxKSA9PiB0aGF0LmlzbC5aYXBvY3RvdnlMaXN0Lmxpc3RDb3VudChycSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWRzZXJ2ZXJmaWx0ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaW52YWxpZFZhbHVlQ2hhbmdlZDogZnVuY3Rpb24gKGV2KSB7IHRoYXQubG9hZERhdGEoKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHREYXRhOiB7IG5rczogeyBzdGFydDogXCIwMDAwMDRcIiwgZW5kOiBcIjAwMDAwNFwiIH0gfVxyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHREYXRhOiB0aGlzLkZpbHRlclxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImdjZnVmaWx0ZXJpbnZhbGlkdmFsdWVzZXRcIiwgZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZERhdGFPbGQoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8jcmVnaW9uIEtsLiB6a3JhdGt5XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlU2hvcnRDdXQoKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLkF1dG9Mb2FkRGF0YSlcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZERhdGFPbGQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBrbGF2ZXNvdnljaCB6a3JhdGVrXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlU2hvcnRDdXQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiSU5TRVJUXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjI2XCIsIC8vUkMgMzExMDAyMjYgOiBOYcSNdGVuw60gZGF0XHJcbiAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuVGFzayxcclxuICAgICAgICAgICAgICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5pbnNBY3RcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMucGFyZW50Q250LmVsZW1lbnQuZ3Nob3J0Y3V0KHtcclxuICAgICAgICAgICAgLy8gICAga2V5OiBcIkRFTEVURVwiLFxyXG4gICAgICAgICAgICAvLyAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMTgxXCIsIC8vUkMgMzExMDAxODEgOiBWecSNaXN0aXRcclxuICAgICAgICAgICAgLy8gICAgY2FuRXhlY3V0ZTogKGV2KSA9PiB7IHJldHVybiBldi50YXJnZXQudGFnTmFtZSAhPT0gXCJJTlBVVFwiOyB9LFxyXG4gICAgICAgICAgICAvLyAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuVGFzayxcclxuICAgICAgICAgICAgLy8gICAgYWN0aW9uOiB0aGlzLmNsZWFyRmlsdGVyUm93QWN0XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiMVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIxOFwiLCAvL1JDIDMxMTAwMjE4IDogUMWZZWRjaG96w60gZmlsdHJcclxuICAgICAgICAgICAgICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5UYXNrLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLnByZXZGaWx0ZXJBY3RcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiMFwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyOFwiLCAvL1JDIDMxMTAwMjI4IDogVnnEjWlzdGl0IGEgbmHEjcOtc3RcclxuICAgICAgICAgICAgICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5UYXNrLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmNsZWFyQW5kRmlsdGVyQWN0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBncmlkLmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcImN0cmwrc2hpZnQrbGNsaWNrXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkdyaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyOVwiLCAvL1JDIDMxMTAwMjI5IDogUMWZZW5lc2Vuw60gaG9kbm90eSBkbyBmaWx0cnUuXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLnNlbEZpbHRlckFjdFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ3JpZC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJjdHJsK2xjbGlja1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMzVcIiwgLy9SQyAzMTEwMDIzNSA6IFDFmWVuZXNlbsOtIGhvZG5vdHkgZG8gZmlsdHJ1IGEgdnlobGVkw6Fuw60uXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLnNlbEZpbHRlckFuZFNlYXJjaEFjdFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ3JpZC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGtleTogW1wiLlwiLCBcIixcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9OT1RFOiBEZXNjcmlwdGlvbiBvcHNhbm8geiBuYXBvdmVkeSBrIFRLIFVDUlxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMjdcIiwgLy9SQyAzMTEwMDIyNyA6IFpvYnJhemVuw60gdsWhZWNoIHrDoXBpc8WvIGRva2xhZMWvIChjZWzDvSBkb2tsYWQpIG5hZCBvem5hxI1lbsO9bSB6w6FwaXNlbS5cclxuICAgICAgICAgICAgICAgICAgICBjYW5FeGVjdXRlOiAoZXYpID0+IHsgcmV0dXJuIGV2LnRhcmdldC50YWdOYW1lICE9PSBcIklOUFVUXCI7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLkdyaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLmRvdEFjdFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvLyomR1Nlem5hbVphcGlzdVN0YXZ1RHRvKi8+IHtcclxuICAgICAgICAgICAgdmFyIGdmID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvLyogJiBHU2V6bmFtWmFwaXN1U3RhdnVEdG8qLz4gKCk7XHJcbiAgICAgICAgICAgIC8vdmFyIHRvcG9Hcm91cCA9IFwidG9wb1wiO1xyXG5cclxuICAgICAgICAgICAgZ2YuYWRkU3RydWN0dXJlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rbGFkeVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjMxXCIsIC8vUkMgMzExMDAyMzEgOiBEb2tsYWR5XHJcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXBpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcHJlc2V0Q2FwdGlvbjogXCJqcmVzOjMxMTAwMjMxXCIsIC8vUkMgMzExMDAyMzEgOiBEb2tsYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNoOiAobWV0YSwgcm93cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkID0gbWV0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtkLmFjfXwke2QubWVzaWN9fCR7ZC5yb2t9fCR7ZC5saWN9fCR7ZC5pY299fCR7ZC51Y3N9YDsgLy9OT1RFOiBQcmlkYXQgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwiYWNcIiksIHUgdnNlY2ggdGVjaHRvIHNsb3VwY3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInJvayxsaWMsaWNvLHVjcyxtZXNpYyxhY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUNvbHVtbjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF0dXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyNzhcIiwgLy9SQyAzMDI1MDI3OCA6IFN0YXR1c1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKHJvdywgbWV0YSwgY2VsbEluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobWV0YT8uX2lzU3VtbWFyeSkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cuc3RhdHVzID09PSBudWxsIHx8IHJvdy5zdGF0dXMgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk9LXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk5cIjsgXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RhdHVzKHsgbW9kZWw6IFwic3RhdHVzXCIsIGNhcHRpb246IFwianJlczozMDI1MDI5MlwiIH0pIC8vUkMgMzAyNTAyOTIgOiBTdGF0dXNcclxuICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7IG5hbWU6IFwic3RhdHVzXCIsIG1vZGVsOiBcInN0YXR1c1wiIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLlNhbGRva29udG9QYXJhbTEhLnRyaW0oKSAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInZhbHVlMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMSEudHJpbSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbmFtZTogXCJ2YWx1ZTBcIiwgbW9kZWw6IFwidmFsdWUwXCIsIGNhcHRpb246IHRoaXMuZ2xvYmFscy5TYWxkb2tvbnRvUGFyYW0xLnRyaW0oKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5TYWxkb2tvbnRvUGFyYW0yIS50cmltKCkgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ2YWx1ZTFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy5nbG9iYWxzLlNhbGRva29udG9QYXJhbTIhLnRyaW0oKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG5hbWU6IFwidmFsdWUxXCIsIG1vZGVsOiBcInZhbHVlMVwiLCBjYXB0aW9uOiB0aGlzLmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMi50cmltKCkgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMubmtzKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGRyZFNlcnZlckZpbHRlciA9IEdvcmRpYy5Fa28uRmlsdGVycy5kcmQodGhpcy5maWx0ZXJPcHRpb25zLmRyZCk7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuWmFwaXNvdmEpIHtcclxuICAgICAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTMgXCIsIC8vUkMgMzExMDAwNTMgOiBEXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDEzMFwiLCAvL1JDIDMxMTAwMTMwIDogRGVuXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJkZW5cIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDUzXCIsIGRpc2FibGVkOiAhISh0aGlzLkZpbHRlciAmJiB0aGlzLlN0cmljdEZpbHRlciAmJiB0aGlzLkZpbHRlci5kZW4pIH0pIC8vUkMgMzExMDAwNTMgOiBEXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkZW5cIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDUzXCIsIC8vUkMgMzExMDAwNTMgOiBEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhISh0aGlzLkZpbHRlciAmJiB0aGlzLlN0cmljdEZpbHRlciAmJiB0aGlzLkZpbHRlci5kZW4pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDEsIG1heDogMzEgfSldIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZEZpZWxkOiB7IHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDEsIG1heDogMzEgfSldIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsaWNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkxJQ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwibGljXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vLy9zZXJ2ZXJGaWx0ZXI6IC8vVE9ET1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBkb2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTVcIiwgLy9SQyAzMTEwMDA1NSA6IFN0cnVrdHVyb3ZhbsO9IHBvcGlzIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsICAgICAgICAgICAvL05PVEU6IFYgVEsgbWFqaSBza3J5dG8sIGJ5dmEgdmlkZXQgcG9sZSAncG9waXMnLCBrZGUgamUgc3Rlam55IHByZWZhYlxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nU2luZ2xlKHsgbW9kZWw6IFwicGRva1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTVcIiB9KSAvL1JDIDMxMTAwMDU1IDogU3RydWt0dXJvdmFuw70gcG9waXMgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBnZi5hZGRTb3J0ZWRFa29DZnVTZXQodGhpcy5nZXRDZnVTZXRTZXJ2ZXJGaWx0ZXJzKHRydWUpKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuWmFwaXNvdmEpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudENudC5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkJhbGFuY292YW5pWmFwaXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTQ1XCIsIC8vUkMgMzAyNTAxNDUgOiBNRCBwxa92LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMTQ1XCIsIC8vUkMgMzExMDAyNDMgOiBNw6EgRMOhdGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTQ1XCIgfSkgLy9SQyAzMDI1MDE0NSA6IE1EIHDFr3YuXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMwX25ld1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDZcIiwgLy9SQyAzMDI1MDE0NiA6IE1EIG5vdsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAxNDZcIiwgLy9SQyAzMTEwMDI0MyA6IE3DoSBEw6F0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMF9uZXdcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTQ2XCIgfSkgLy9SQyAzMDI1MDE0NiA6IE1EIG5vdsOpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMwYzBfcHJvY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDdcIiwgLy9SQyAzMDI1MDE0NyA6ICAlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAxNDdcIiwgLy9SQyAzMTEwMDI0MyA6IE3DoSBEw6F0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTQ2XCIgfSkgLy9SQyAzMDI1MDE0NiA6IE1EIG5vdsOpXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE0OFwiLCAvL1JDIDMwMjUwMTQ5IDogRGFsIG5vdsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAxNDhcIiwgLy9SQyAzMTEwMDI0MyA6IE3DoSBEw6F0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMVwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDhcIiB9KSAvL1JDIDMwMjUwMTQ2IDogTUQgbm92w6lcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzFfbmV3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE0OVwiLCAvL1JDIDMwMjUwMTQ5IDogRGFsIG5vdsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAxNDlcIiwgLy9SQyAzMDI1MDE0OSA6IERhbCBub3bDqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMV9uZXdcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTQ5XCIgfSkgLy9SQyAzMDI1MDE0OSA6IERhbCBub3bDqVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMWMxX3Byb2NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTQ3XCIsIC8vUkMgMzAyNTAxNDcgOiAgJVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMTQ3XCIsIC8vUkMgMzExMDAyNDMgOiBNw6EgRMOhdGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwXCIsIGNhcHRpb246IFwianJlczozMDI1MDE0NlwiIH0pIC8vUkMgMzAyNTAxNDYgOiBNRCBub3bDqVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMGMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE1MFwiLCAvL1JDIDMwMjUwMTUwIDogTUQgcMWvdi4gLSBEYWwgcMWvdi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDE1MFwiLCAvL1JDIDMwMjUwMTUwIDogTUQgcMWvdi4gLSBEYWwgcMWvdi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB0aGlzLmdsb2JhbHMuUmFkX1pvYnJhek1kRGFsISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBjMVwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNTBcIiB9KSAvL1JDIDMwMjUwMTUwIDogTUQgcMWvdi4gLSBEYWwgcMWvdi5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBjMV9uZXdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTUxXCIsIC8vUkMgMzAyNTAxNTEgOiAgTUQgbm92w6kgLSBEYWwgbm92w6lcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDE1MVwiLCAvL1JDIDMwMjUwMTUxIDogIE1EIG5vdsOpIC0gRGFsIG5vdsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhpZGRlbjogdGhpcy5nbG9iYWxzLlJhZF9ab2JyYXpNZERhbCEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwYzFfbmV3XCIsIGNhcHRpb246IFwianJlczozMDI1MDE1MVwiIH0pIC8vUkMgMzAyNTAxNTEgOiAgTUQgbm92w6kgLSBEYWwgbm92w6lcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU2XCIsIC8vUkMgMzExMDAwNTYgOiBNRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjQzXCIsIC8vUkMgMzExMDAyNDMgOiBNw6EgRMOhdGlcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU2XCIgfSkgLy9SQyAzMTEwMDA1NiA6IE1EXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1N1wiLCAvL1JDIDMxMTAwMDU3IDogRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMxXCIsIGNhcHRpb246IFwianJlczozMTEwMDA1N1wiIH0pIC8vUkMgMzExMDAwNTcgOiBEYWxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwOTBcIiwgLy9SQyAzMTEwMDA5MCA6IE1ELURhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjQ0XCIsIC8vUkMgMzExMDAyNDQgOiBNw6EgRMOhdGkgLSBEYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiAhdGhpcy5nbG9iYWxzLlJhZF9ab2JyYXpNZERhbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBjMVwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwOTBcIiB9KSAvL1JDIDMxMTAwMDkwIDogTUQtRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMwYzFfYXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjc5XCIsIC8vUkMgMzAyNTAyNzkgOiBOZXZ5cm92bsOhbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9kZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjQ0XCIsIC8vUkMgMzExMDAyNDQgOiBNw6EgRMOhdGkgLSBEYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiAhdGhpcy5nbG9iYWxzLlJhZF9ab2JyYXpNZERhbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMGMxX2FzXCIsIGNhcHRpb246IFwianJlczozMDI1MDI4MFwiIH0pIC8vUkMgMzAyNTAyODAgOiBOZXZ5cm92bsOhbm9cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuWmFwaXNvdmEpXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDcxXCIsIC8vUkMgMzExMDAwNzEgOiBQb3BpcyDFmcOhZGt1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdTaW5nbGUoeyBtb2RlbDogXCJwb3Bpc1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzFcIiB9KSAvL1JDIDMxMTAwMDcxIDogUG9waXMgxZnDoWRrdVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuWmFwaXNvdmEpIHtcclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc1XCIsIC8vUkMgMzExMDAwNzUgOiBQSURcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjUxXCIsIC8vUkMgMzExMDAyNTEgOiBQcnZvdG7DrSBpZGVudGlmaWvDoXRvciBwcmltw6FybsOtaG8gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaXhwKHsgbW9kZWw6IFwiaXhwXCIsIGNhcHRpb246IFwianJlczozMTEwMDA3NVwiIH0pIC8vUkMgMzExMDAwNzUgOiBQSURcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5nbG9iYWxzLkV4dGVybmlTdW1hcml6YWNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX3ByaW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc2XCIsICAvL1JDIDMxMTAwMDc2IDogUElEIHByaW3DoXJuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLCAgIC8vTk9URTogViBUSyBqZSBza3J5dGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nU2luZ2xlKHsgbW9kZWw6IFwiaXhwX3ByaW1cIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc2XCIgfSkgLy9SQyAzMTEwMDA3NiA6IFBJRCBwcmltw6FybsOtXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLlR5cFByYWNlV2ZsID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNfYWdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc3XCIsIC8vUkMgMzExMDAwNzcgOiBBZ2VuZG92w6kgxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImFjX2FnXCIsIGNhcHRpb246IFwianJlczozMTEwMDA3N1wiIH0pIC8vUkMgMzExMDAwNzcgOiBBZ2VuZG92w6kgxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgICAgIH0pOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyODFcIiwgLy9SQyAzMDI1MDI4MSA6IFR5cCBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogXCJ7aXhzX3R5cF90eHQ6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJpeHNfdHlwX3R4dFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkZpbHRlclByZWZhYnMudHlwX2FnKHsgbW9kZWw6IFwidHlwX2FnXCIsIHprcl9hZ1BhdGg6IFwidHlwX2FnX3R4dFwiLCBpc1JvenBvY2V0OiB0aGlzLlJvenBvY2V0LCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzlcIiB9KSAvL1JDIDMxMTAwMDc5IDogQWdlbmRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnNzbFR5cEludGVydmFsKHsgbW9kZWw6IFwiaXhzX3R5cD1peHNfdHlwO2l4c190eXBfdHh0PW5hemV2XCIsIGNhcHRpb246IFwianJlczozMDI1MDI4MVwiIH0pIC8vUkMgMzAyNTAyODEgOiBUeXAgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnNzbFR5cEludGVydmFsKHsgbW9kZWw6IFwiaXhzX3R5cFwiLCB6a3JfYWdQYXRoOiBcIml4c190eXBfdHh0XCIsY2FwdGlvbjogXCJqcmVzOjMwMjUwMjgxXCIgfSkgLy9SQyAzMDI1MDI4MSA6IFR5cCBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuWmFwaXNvdmEpXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHsgLy9OT1RFOiBWIFRLIGplIHRvIHByaWRhbm8gamFrbyBBZGRMb29rdXBDb2x1bW4hIChhcmcuOiBEZXRhaWxUeXB1QWdlbmR5Lnprcl9hZylcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9hZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA3OVwiLCAvL1JDIDMxMTAwMDc5IDogQWdlbmRhXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IFwie3R5cF9hZ190eHQ6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBpbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwidHlwX2FnX3R4dFwiKSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLlVjci5XZWJDbGllbnQuRmlsdGVyUHJlZmFicy50eXBfYWcoeyBtb2RlbDogXCJ0eXBfYWdcIiwgemtyX2FnUGF0aDogXCJ0eXBfYWdfdHh0XCIsIGlzUm96cG9jZXQ6IHRoaXMuUm96cG9jZXQsIGNhcHRpb246IFwianJlczozMTEwMDA3OVwiIH0pIC8vUkMgMzExMDAwNzkgOiBBZ2VuZGFcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5UeXBQcmFjZUVTVSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cFByYWNlRVNVLk5lKSB7IH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZ2xvYmFscy5SZXppbVByb3ZvenUgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuU09SICYmIHRoaXMuZ2xvYmFscy5UeXBTdW1hcml6YWNlID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwU3VtYXJpemFjZS5FeHRlcm5pKSB7IH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVzdV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgwXCIsIC8vUkMgMzExMDAwODAgOiBFU1VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1MlwiLCAvL1JDIDMxMTAwMjUyIDogRXh0ZXJuw60gc3ViamVrdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250b1phcGlzID8gdW5kZWZpbmVkIDogR29yZGljLlVjci5XZWJDbGllbnQuRmlsdGVyUHJlZmFicy5lc3VfdHh0KHsgbW9kZWw6IFwiZXN1X3R4dFwiLCBpeHNfZXN1UGF0aDogXCJfZXN1X3R4dF9peHNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgwXCIgfSkgIC8vUkMgMzExMDAwODAgOiBFU1VcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXN1X2ljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwODBcIiArIFwiIFwiICsgdGhpcy56a3JhdGt5LkljbywgIC8vUkMgMzExMDAwODAgOiBFU1VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1M1wiLCAvL1JDIDMxMTAwMjUzIDogScSMTyBFeHRlcm7DrWhvIHN1Ympla3R1IHByaW3DoXJuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiB0aGlzLnBhcmVudENudC5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpcyA/IHVuZGVmaW5lZCA6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkZpbHRlclByZWZhYnMuZXN1X2ljbyh7IG1vZGVsOiBcImVzdV9pY29cIiwgaXhzX2VzdVBhdGg6IFwiX2VzdV9pY29faXhzXCIsIGNhcHRpb246IFwianJlczozMTEwMDA4MFwiICsgXCIgXCIgKyB0aGlzLnprcmF0a3kuSWNvIH0pIC8vUkMgMzExMDAwODAgOiBFU1VcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXN1X3JjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA4MVwiLCAvL1JDIDMxMTAwMDgxIDogRVNVIFLEjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjU0XCIsIC8vUkMgMzExMDAyNTQgOiBSb2Ruw6kgxI3DrXNsbyBFeHRlcm7DrWhvIHN1Ympla3R1IHByaW3DoXJuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiB0aGlzLnBhcmVudENudC5UeXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpcyA/IHVuZGVmaW5lZCA6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkZpbHRlclByZWZhYnMuZXN1X3JjKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImVzdV9yY1wiLCBpeHNfZXN1UGF0aDogXCJfZXN1X3R4dF9yY1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwODFcIiwgLy9SQyAzMTEwMDA4MSA6IEVTVSBSxIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJhZF9Fc3VfUmNWeWhsOiB0aGlzLmdsb2JhbHMuUmFkX0VzdV9SY1Z5aGwhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuUHJpeklpc3NwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlpc3NwRGlzYWJsZSA9IHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5O1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkX2hkcl9yaXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgyXCIsIC8vUkMgMzExMDAwODIgOiBJRCBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjU1XCIsIC8vUkMgMzExMDAyNTUgOiBJZGVudGlmaWvDoXRvciByZXplcnZhY2Ugcm96cG/EjXRvdsO9Y2ggcHJvc3TFmWVka8WvIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaWRfaGRyX3Jpc1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwODJcIiwgZGlzYWJsZWQ6IGlpc3NwRGlzYWJsZSwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDkgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA5IH0gfSkgLy9SQyAzMTEwMDA4MiA6IElEIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWF4TGVuZ3RoOiA5XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyYWRla19oZHJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgzXCIsLy9SQyAzMTEwMDA4MyA6IMWZw6FkZWsgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1NlwiLCAvL1JDIDMxMTAwMjU2IDogxZjDoWRlayByZXplcnZhY2Ugcm96cG/EjXRvdsO9Y2ggcHJvc3TFmWVka8WvIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHsgbW9kZWw6IFwicmFkZWtfaGRyXCIsIGNhcHRpb246IFwianJlczozMTEwMDA4M1wiLCBkaXNhYmxlZDogaWlzc3BEaXNhYmxlIH0pIC8vUkMgMzExMDAwODMgOiDFmcOhZGVrIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNfcHJlcF9haXNwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM0NFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9SQyAzMDI1MDM0NCA6IElJU1NQIFDFmWVwb8SNdGVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzksLy8gZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiY2VudGVyXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zX3ByZXBfYWlzcCE9bnVsbCAmJiBkYXRhLnNfcHJlcF9haXNwID4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiLCB0ZXh0OiBcImpyZXM6MzAyNTAzNDRcIiwgLy9SQyAzMDI1MDM0NCA6IElJU1NQIFDFmWVwb8SNdGVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Rvb2x0aXA6IFwianJlczozMDI1MDI4OFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5pZF9oZHJfcmlzICE9IG51bGwgJiYgZGF0YS5pZF9oZHJfcmlzIT09dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1leGNsYW0gZy1zdGF0ZS1lcnJvclwiLCB0ZXh0OiBcImpyZXM6MzAyNTAzNDVcIiwgLy9SQyAzMDI1MDM0NSA6IE5lenByYWNvdsOhbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90b29sdGlwOiBcImpyZXM6MzAyNTAyODlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07ICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFkZFN0clBvcGlzQ29sdW1ucykge1xyXG4gICAgICAgICAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hZGRTdHJQb3Bpc0NvbHVtbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYyA9IHRoaXMuYWRkU3RyUG9waXNDb2x1bW5zW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjYXB0aW9uID0gdGhpcy5maWx0ZXJTdHJQb3Bpcz8uZmluZCgocykgPT4geyByZXR1cm4gcy5rbGljID09PSBjOyB9KT8ua2xpY190eHQgPz8gYztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTAtMTItMCwgTS0wLTEyLTAsIFMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oY2FwdGlvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IGMgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBjYXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IGB7c3RydWt0UG9waXMuJHtjfS5ob2Rub3RhfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0OiBcImdmb3JtYm94XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiAkLmV4dGVuZChHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZ2V0Rm9ybUJveEZpbHRlckRlZmF1bHRzKHt9KSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAoczogT2JqZWN0TGl0ZXJhbDxzdHJpbmc+KSA9PiB7IHJldHVybiBzICYmIHNbY10gPyBzW2NdIDogR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmZpbHRlckVtcHR5VmFsdWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgdj86IHsgdmFsdWU6IE9iamVjdExpdGVyYWw8c3RyaW5nPiB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWwgPSB2Py52YWx1ZVtjXSA/PyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZnBkYXRhID0gdGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJTdHJQb3BpcyA9IGZwZGF0YT8uZmlsdGVyU3RyUG9waXMgYXMgR1N0cnVrdHVyb3ZhbnlQb3Bpc0ZpbHRlckR0b1tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcCA9IGZpbHRlclN0clBvcGlzPy5maW5kKChzKSA9PiB7IHJldHVybiBzLmtsaWMgPT09IGM7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcC5ob2Rub3RhID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIiwgZnBkYXRhLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IGZ1bmN0aW9uIChvcCwgZHRvLCBtb2RlbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZwZGF0YSA9IChfdGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsIGFzIGFueSkoXCJnZXRDdXJyZW50RGF0YVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlclN0clBvcGlzID0gZnBkYXRhPy5maWx0ZXJTdHJQb3BpcyBhcyBHU3RydWt0dXJvdmFueVBvcGlzRmlsdGVyRHRvW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwID0gZmlsdGVyU3RyUG9waXM/LmZpbmQoKHMpID0+IHsgcmV0dXJuIHMua2xpYyA9PT0gYzsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFwcGx5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCB7IGM6IHAuaG9kbm90YSB9LCB7IHRyaWdnZXJDaGFuZ2U6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvbGxlY3RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW52YWxpZFRyYW5zZm9ybTogKHYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxbY10gPSB2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSBhcyBHRm9ybUJveE9wdGlvbnM8T2JqZWN0TGl0ZXJhbDxzdHJpbmc+PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdmIGFzIGFueTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVQcm9maWxlcyhnZjogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0U2V6bmFtWmFwaXN1U3RhdnVEdG8vKiZHU2V6bmFtWmFwaXN1U3RhdnVEdG8qLz4pOiBJR1Nlem5hbVphcGlzdVByb2ZpbGVzIHtcclxuICAgICAgICAgICAgbGV0IHByb2ZpbGVzOiBJR1Nlem5hbVphcGlzdVByb2ZpbGVzID0ge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogeyBuYW1lOiBcImpyZXM6MzExMDAyMzJcIiwgY29sdW1uczoge30gfSAvL1JDIDMxMTAwMjMyIDogVsO9Y2hvesOtXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdmLmNvbHVtbnMuZmlsdGVyKChjKSA9PiB7IHJldHVybiAhYy5oaWRkZW47IH0pXHJcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoYykgPT4geyBwcm9maWxlcy5kZWZhdWx0LmNvbHVtbnMhW2MubmFtZSFdID0geyBoaWRkZW46IGZhbHNlIH0gfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5aYXBpc292YSkge1xyXG4gICAgICAgICAgICAgICAgcHJvZmlsZXMuZGVmYXVsdC5uYW1lID0gXCJqcmVzOjMxMTAwMjQxXCI7IC8vUkMgMzExMDAyNDEgOiBaw6FwaXN5ICh2w71jaG96w60pXHJcbiAgICAgICAgICAgICAgICBwcm9maWxlcy5kb2tsYWR5ID0geyBuYW1lOiBcImpyZXM6MzExMDAyMzFcIiwgY29sdW1uczoge30sIGdyb3VwaW5nOiBcImRva2xhZHlcIiB9OyAvL1JDIDMxMTAwMjMxIDogRG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgcHJvZmlsZXMuZG9rbGFkeS5jb2x1bW5zID0gJC5leHRlbmQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRva2xhZHk6IHsgaGlkZGVuOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBkb2s6IHsgaGlkZGVuOiBmYWxzZSB9XHJcbiAgICAgICAgICAgICAgICB9LCBwcm9maWxlcy5kZWZhdWx0LmNvbHVtbnMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJvZmlsZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLmRldGFpbEFjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZGV0YWlsQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyNjZcIiwgLy9SQyAzMTEwMDI2NiA6IFpvYnJheml0IGRldGFpbFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy92aXNpYmxlOiAoIHRoaXMuVHlwVWxvaHkgIT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvKSxcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93RGV0YWlsKCk7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnByZXZGaWx0ZXJBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInByZXZGaWx0ZXJBY3RcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktYXJyb3cgZ2ktcm90MTgwXCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDIxOFwiLCAvL1JDIDMxMTAwMjE4IDogUMWZZWRjaG96w60gZmlsdHJcclxuICAgICAgICAgICAgICAgIGNhcHRpb25WaXNpYmxlOiBcIm5ldmVyXCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzExMDAyMjBcIiwgLy9SQyAzMTEwMDIyMCA6IE7DoXZyYXQgayBwxZllZGNob3rDrSBob2Rub3TEmyBmaWx0cnUgYSB2eWhsZWTDoW7DrS5cclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5wcmV2RmlsdGVyKCk7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5leHRGaWx0ZXJBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm5leHRGaWx0ZXJBY3RcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktYXJyb3dcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjE5XCIsIC8vUkMgMzExMDAyMTkgOiBOw6FzbGVkdWrDrWPDrSBmaWx0clxyXG4gICAgICAgICAgICAgICAgY2FwdGlvblZpc2libGU6IFwibmV2ZXJcIixcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMTEwMDIyMVwiLCAvL1JDIDMxMTAwMjIxIDogVnlwbG7Em27DrSBuw6FzbGVkdWrDrWPDrWhvIGZpbHRydSBhIHZ5aGxlZMOhbsOtLlxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLm5leHRGaWx0ZXIoKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLnphcGlzeUFjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiemFwaXN5QWN0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTI0XCIsIC8vUkMgMzExMDAxMjQgOiBaw6FwaXN5XHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuc2hvd1phcGlzeSgpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnphcGlzeUFsbEFjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiemFwaXN5QWxsQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjczXCIsIC8vUkMgMzAyNTAyNzMgOiBaw6FwaXN5IHbFoWVcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93WmFwaXN5QWxsKCk7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZG9rbGFkQWN0ID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkb2tsYWRBY3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjMzXCIsIC8vUkMgMzExMDAyMzMgOiBEb2tsYWR5L3rDoXBpc3lcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy50b2dnbGVHcm91cGluZygpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnByaW1kb2tsYWRBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInByaW1kb2tsYWRBY3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJmYS1leHRlcm5hbC1saW5rXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNTRcIiwgLy9SQyAzMDI1MDE1NCA6IFByaW0uIGRva2xhZFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLnNob3dQcmltRG9rbGFkKCk7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZG9rbGFkQkxLQWN0ID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkb2tsYWRCTEtBY3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJmYS1leHRlcm5hbC1saW5rXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNTVcIiwgLy9SQyAzMDI1MDE1NSA6IERva2xhZCBCTEtcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93UHJpbURva2xhZCh1bmRlZmluZWQsIFwiQkxLXCIpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmRva2xhZFJPQWN0ID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkb2tsYWRST0FjdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLWV4dGVybmFsLWxpbmtcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE1NlwiLCAvL1JDIDMwMjUwMTU2IDogRG9rbGFkIFJPXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuc2hvd1ByaW1Eb2tsYWQodW5kZWZpbmVkLCBcIlJPXCIpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyRmlsdGVyUm93QWN0ID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjbGVhckZpbHRlclJvd0FjdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjY3XCIsIC8vUkMgMzExMDAyNjcgOiBWecSNaXN0aXQgZmlsdHIgc2V6bmFtdVxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1iaW5cIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiY2xlYXJcIik7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluc0FjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaW5zQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRGaWx0ZXIodGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q29uZmlybWVkRGF0YVwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4geyB0aGlzLmRvRmlsdGVyQ2xpY2soKTsgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jbGVhckFuZEZpbHRlckFjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiY2xlYXJBbmRGaWx0ZXJBY3RcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEZpbHRlcih0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJnZXRDb25maXJtZWREYXRhXCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7IHRoaXMuZG9GaWx0ZXJDbGljaygpOyB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNlbEZpbHRlckFjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic2VsRmlsdGVyQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuZGlzcGF0Y2hGaWxsU2VydmVyR3JpZEV2ZW50KGV2KTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2VsRmlsdGVyQW5kU2VhcmNoQWN0ID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzZWxGaWx0ZXJBbmRTZWFyY2hBY3RcIixcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRmlsbFNlcnZlckdyaWRFdmVudChldik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb0ZpbHRlckNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRvdEFjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZG90QWN0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhciBzZWwgPSB0aGF0LiRncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlKVswXSBhcyBHb3JkaWMuVWNyLldlYkNsaWVudC5EdG8uR1Nlem5hbVphcGlzdVN0YXZ1RHRvO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyNyZWdpb24gVGFraGxlIHRvIGx6ZSBuYWNwYXQgaSBwcmltbyBkbyBlbGVtZW50dVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIHZhbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBlbGVtZW50eToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBmaWx0ZXJzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdWNzOiB7IHN0YXJ0OiBzZWwudWNzLCBlbmQ6IHNlbC51Y3MgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGRyZDogc2VsLmRyZCxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIG1lc2ljOiB7IHN0YXJ0OiBzZWwubWVzaWMsIGVuZDogc2VsLm1lc2ljIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgYWM6IHsgc3RhcnQ6IHNlbC5hYywgZW5kOiBzZWwuYWMgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvL307XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LmVsZW1lbnQuZmluZChcIi5nZmlsdGVycGFuZWxcIikuZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIiwgdmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyNlbmRyZWdpb24gXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIHZhbCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB1Y3M6IHsgc3RhcnQ6IHNlbC51Y3MsIGVuZDogc2VsLnVjcyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGRyZF9tc2s6IHNlbC5kcmQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgbWVzaWM6IHsgc3RhcnQ6IHNlbC5tZXNpYywgZW5kOiBzZWwubWVzaWMgfSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICBhYzogeyBzdGFydDogc2VsLmFjLCBlbmQ6IHNlbC5hYyB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy99O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjbGVhclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJhcHBseVwiLCB0aGF0LmdldFphcGlzRmlsdGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9GaWx0ZXJDbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyUGlkQWN0ID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJmaWx0ZXJQaWRBY3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWwgPSBncmlkLmdncmlkPFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjbGVhclwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJhcHBseVwiLCB7IGl4cDogc2VsWzBdLml4cCB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvRmlsdGVyQ2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNoRG9rbGFkeUFjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic2hEb2tsYWR5QWN0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuXHJcbiAgICAgICAgICAgICAgICAvL05PVEU6IEphayB0byBkZWxhamkgdiB0bHVzdHltOiBHU2V6bmFtVWN0WmF6bmFtdVN0YXZ5WmFwaXN5VGFiLm1fQWN0aW9uRG9rbGFkeV9TdGFydCgpOiBcclxuICAgICAgICAgICAgICAgIC8vUHJvdmVkb3Ugc2Vza3VwZW5pLCBrdGVyZSBwcmlkYWppIGpha28gbm92ZSByYWRreSBhIHBhayB6YWZpbHRydWppIHBvdXplIG5hIHNvdWN0b3ZlIHJhZGt5XHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHsgdGhpcy50b2dnbGVHcm91cGluZyh0aGlzLnByb2ZpbGVzLmRva2xhZHkhLm5hbWUpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zaFphcGlzeUFjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic2haYXBpc3lBY3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7IHRoaXMudG9nZ2xlR3JvdXBpbmcodGhpcy5wcm9maWxlcy5kZWZhdWx0Lm5hbWUpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBtZW51XHJcbiAgICAgICAgICogQHBhcmFtIHR5cFVsb2h5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51YmFyRGVmKHR5cFVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlKTogTWVudVBhcmFtc1tdIHtcclxuICAgICAgICAgICAgbGV0IG1lbnUgPSBuZXcgQXJyYXk8TWVudVBhcmFtcz4oKTtcclxuXHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5kZXRhaWxBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucHJldkZpbHRlckFjdCwgZmF2b3JpdGU6IHRydWUsIGFsaWduOiBcIm9wcG9zaXRlXCIgfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5uZXh0RmlsdGVyQWN0LCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJpbnRBY3QpXHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucHJpbnRBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlTdGF2XHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5Sb3pwb2NldFN0YXYgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250bylcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy56YXBpc3lBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICBpZiAodHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250bylcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy56YXBpc3lBbGxBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlVjZXRuaWN0dmlaYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfTmV6YXJhemVuZV96YXBpc3lcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5XHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkRhbm92YUV2aWRlbmNlWmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlJvenBvY2V0WmFwaXMpXHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMuZG9rbGFkQWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgaWYgKHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlByaW1hcm5pUG96YWRhdmt5WmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkJhbGFuY292YW5pWmFwaXMpIHtcclxuICAgICAgICAgICAgICAgIC8vbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnByaW1kb2tsYWRBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLmRva2xhZFJPQWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5kb2tsYWRCTEtBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5QcmltYXJuaVBvemFkYXZreVphcGlzXHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5GaW5hbmNvdmFuaVphcGlzXHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXNcclxuICAgICAgICAgICAgICAgIHx8IHR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX05lemFyYXplbmVfemFwaXN5XHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9QcmV1Y3RvdmFuaV9zdGF2eVxyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRaYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQmFsYW5jb3ZhbmlaYXBpc1xyXG4gICAgICAgICAgICAgICAgfHwgdHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250b1phcGlzXHJcbiAgICAgICAgICAgICAgICB8fCB0eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvWmFwaXN5VnNlXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnByaW1kb2tsYWRBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5jbGVhckZpbHRlclJvd0FjdCB9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwic3RhdGljXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyNjhcIiwgLy9SQyAzMTEwMDI2OCA6IFJ5Y2hsw6kgYWtjZVxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5pbnNBY3QsIGljb246IFwiZ2ktcmVmcmVzaFwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAyMjZcIiB9LCAvL1JDIDMxMTAwMjI2IDogTmHEjXRlbsOtIGRhdFxyXG4gICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmNsZWFyQW5kRmlsdGVyQWN0LCBjYXB0aW9uOiBcImpyZXM6MzExMDAyMjhcIiB9LCAvL1JDIDMxMTAwMjI4IDogVnnEjWlzdGl0IGEgbmHEjcOtc3RcclxuICAgICAgICAgICAgICAgICAgICAvL05PVEU6IFR5dG8gZHZlIGFrY2UgYnVkb3UgdnpkeSBmdW5nb3ZhdCBwb3V6ZSB6IGtsYXZlc25pY2VcclxuICAgICAgICAgICAgICAgICAgICAvL3sgYWN0aW9uOiB0aGlzLnNlbEZpbHRlckFjdCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjI5XCIgfSwgLy9SQyAzMTEwMDIyOSA6IFDFmWVuZXNlbsOtIGhvZG5vdHkgZG8gZmlsdHJ1LlxyXG4gICAgICAgICAgICAgICAgICAgIC8veyBhY3Rpb246IHRoaXMuc2VsRmlsdGVyQW5kU2VhcmNoQWN0LCBjYXB0aW9uOiBcImpyZXM6MzExMDAyMzVcIiB9LCAvL1JDIDMxMTAwMjM1IDogUMWZZW5lc2Vuw60gaG9kbm90eSBkbyBmaWx0cnUgYSB2eWhsZWTDoW7DrS5cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogdGhpcy5kb3RBY3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDYyMFwiLCAvL1JDIDMwMjUwNjIwIDogRmlsdHJvdmF0IGRsZSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMTEwMDIyN1wiXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgLy9SQyAzMTEwMDIyNyA6IFpvYnJhemVuw60gdsWhZWNoIHrDoXBpc8WvIGRva2xhZMWvIChjZWzDvSBkb2tsYWQpIG5hZCBvem5hxI1lbsO9bSB6w6FwaXNlbS5cclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5maWx0ZXJQaWRBY3QsIGNhcHRpb246IFwianJlczozMTEwMDI4MFwiIH0sIC8vUkMgMzExMDAyODAgOiBGaWx0cm92YXQgZGxlIFBJRFxyXG4gICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLnNoRG9rbGFkeUFjdCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjMxXCIgfSwgLy9SQyAzMTEwMDIzMSA6IERva2xhZHlcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5zaFphcGlzeUFjdCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTI0XCIgfSAvL1JDIDMxMTAwMTI0IDogWsOhcGlzeVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtZW51O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGxvYWREYXRhT2xkKGZQYW5lbERhdGE/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmdldEZpbHRlcihmUGFuZWxEYXRhKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKG5ld0ZpbHRlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkZEZpbHRlclRvSGlzdG9yeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyRmlsdGVySGlzdG9yeUluZGV4ICE9PSB0aGlzLmZpbHRlckhpc3RvcnkubGVuZ3RoIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVySGlzdG9yeS5zcGxpY2UodGhpcy5jdXJyRmlsdGVySGlzdG9yeUluZGV4ICsgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlckhpc3RvcnkucHVzaChuZXdGaWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRGaWx0ZXJUb0hpc3RvcnkgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRGaWx0ZXJBY3QuZW5hYmxlZCh0aGlzLmN1cnJGaWx0ZXJIaXN0b3J5SW5kZXggPCB0aGlzLmZpbHRlckhpc3RvcnkubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2RmlsdGVyQWN0LmVuYWJsZWQodGhpcy5jdXJyRmlsdGVySGlzdG9yeUluZGV4ID4gMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERhdGEobmV3RmlsdGVyKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJnZXREYXRhXCIsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmFibGUgPSBkYXRhLlNlem5hbVphcGlzdS5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHByaXN0dXBub3N0IGFrY2kgZGxlIG5hY3RlbnljaCBkYXRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRldGFpbEFjdC5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJQaWRBY3QuZW5hYmxlZChlbmFibGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9rbGFkQWN0LmVuYWJsZWQoZW5hYmxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByaW1kb2tsYWRBY3QuZW5hYmxlZChlbmFibGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9rbGFkQkxLQWN0LmVuYWJsZWQoZW5hYmxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRva2xhZFJPQWN0LmVuYWJsZWQoZW5hYmxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoRG9rbGFkeUFjdC5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy56YXBpc3lBY3QuZW5hYmxlZChlbmFibGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuemFwaXN5QWxsQWN0LmVuYWJsZWQoZW5hYmxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoWmFwaXN5QWN0LmVuYWJsZWQoZW5hYmxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvdEFjdC5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnphdHJpZGl0QWN0LmVuYWJsZWQoZW5hYmxlKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2xldCBwcm9jZXNzb3JzID0gdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucHJvY2Vzc29ycztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAoIXByb2Nlc3NvcnMuc3VtbWFyeVJvdykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHZhciBnZiA9IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHZhciBjb2xzPSBnZi5jb2x1bW5zLmZpbHRlcihjID0+IGMuY2FwdGlvbj8uaW5kZXhPZihcIiVcIikgIT09IDApLm1hcChlID0+IGUubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy92YXIgY29scyA9IGdmLmNvbHVtbnMuZmlsdGVyKGMgPT4gYy5jb2x1bW5UeXBlICE9PSBcImRhdGV0aW1lXCIpLm1hcChlID0+IGUubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcHJvY2Vzc29ycy5zdW1tYXJ5Um93ID0gR29yZGljLkVrby5HcmlkLmNyZWF0ZVN1bW1hcnlQcm9jZXNzb3IoZ2YsIGNvbHMgYXMgYW55KTtcclxuICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS51cGRhdGVEYXRhKGRhdGEuU2V6bmFtWmFwaXN1LCBcInJlc2V0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXI/LmVuYWJsZShlbmFibGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyNyZWdpb24gRXhwZXJpbWVudGFsIC0gbmVrb3Bpcm92YXQhXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAodHlwZW9mIGRhdGEuU3VteSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHZhciAkc291Y3R5U3BuID0gJChcIjxzcGFuPlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAkc291Y3R5U3BuLmFwcGVuZChcImpyZXM6MzExMDAyNDJcIik7IC8vUkMgMzExMDAyNDIgOiBTb3XEjXR5OlxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGlmICh0aGlzLlphcGlzb3ZhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGlzLmZvcm1hdFN1bXkoXCJqcmVzOjMxMTAwMDU2XCIsIGRhdGEuU3VteS5jMCEsICRzb3VjdHlTcG4sIFwiLCBcIik7IC8vUkMgMzExMDAwNTYgOiBNRFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGlzLmZvcm1hdFN1bXkoXCJqcmVzOjMxMTAwMDU3XCIsIGRhdGEuU3VteS5jMSEsICRzb3VjdHlTcG4sIFwiLCBcIik7IC8vUkMgMzExMDAwNTcgOiBEYWxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgdGhpcy5mb3JtYXRTdW15KFwianJlczozMTEwMDA1OFwiLCBkYXRhLlN1bXkuYzBjMSEsICRzb3VjdHlTcG4sIFwiXCIpOyAvL1JDIDMxMTAwMDU4IDogTUQgLSBEYWxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuZm9ybWF0U3VteShcImpyZXM6MzExMDAwNTlcIiwgZGF0YS5TdW15LmMwISwgJHNvdWN0eVNwbiwgXCIsIFwiKTsgLy9SQyAzMTEwMDA1OSA6IE1PIE1EXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuZm9ybWF0U3VteShcImpyZXM6MzExMDAwNjBcIiwgZGF0YS5TdW15LmMxISwgJHNvdWN0eVNwbiwgXCIsIFwiKTsgLy9SQyAzMTEwMDA2MCA6IE1PIERhbFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGlzLmZvcm1hdFN1bXkoXCJqcmVzOjMxMTAwMDYxXCIsIGRhdGEuU3VteS5jMGMxISwgJHNvdWN0eVNwbiwgXCI7IFwiKTsgLy9SQyAzMTEwMDA2MSA6IE1PIE1EIC0gRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuZm9ybWF0U3VteShcImpyZXM6MzExMDAwNjJcIiwgZGF0YS5TdW15LmMwX2FzISwgJHNvdWN0eVNwbiwgXCIsIFwiKTsgLy9SQyAzMTEwMDA2MiA6IEFTIE1EXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuZm9ybWF0U3VteShcImpyZXM6MzExMDAwNjNcIiwgZGF0YS5TdW15LmMxX2FzISwgJHNvdWN0eVNwbiwgXCIsIFwiKTsgLy9SQyAzMTEwMDA2MyA6IEFTIERhbFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB0aGlzLmZvcm1hdFN1bXkoXCJqcmVzOjMxMTAwMDY0XCIsIGRhdGEuU3VteS5jMGMxX2FzISwgJHNvdWN0eVNwbik7IC8vUkMgMzExMDAwNjQgOiBBUyBNRCAtIERhbFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhpcy4kZ3JpZC5nZ3JpZChcInN0YXR1c1dpZGdldFwiLCBcInVjcnN1bWEtcGFuZWxcIikuZW1wdHkoKS5hcHBlbmQoJHNvdWN0eVNwbik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgLy8jZW5kcmVnaW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlRmlsdGVyUGFuZWwoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlRmlsdGVyUGFuZWwodGhpcyk7XHJcblxyXG4gICAgICAgICAgICAvL2xldCBjZnVTZXQgPSB0aGlzLmdldENmdVNldFNlcnZlckZpbHRlcnMoZmFsc2UpO1xyXG4gICAgICAgICAgICAvL3ZhciBnZiA9IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdFbGVtZW50VXRpbHMuY3JlYXRlRWxlbWVudHNHcmlkRm9ybWF0KHtcclxuICAgICAgICAgICAgLy8gICAgZWtvUGFyYW1zOiB0aGlzLnBhcmVudENudC5la29QYXJhbXMsXHJcbiAgICAgICAgICAgIC8vICAgIGdsb2JhbHM6IHRoaXMuZ2xvYmFscyxcclxuICAgICAgICAgICAgLy8gICAgdHlwU2VzdGF2eTogdGhpcy50eXBTZXN0YXZ5LFxyXG4gICAgICAgICAgICAvLyAgICBjZnVTZXQ6IGNmdVNldCxcclxuICAgICAgICAgICAgLy8gICAgZmlsdGVyT3B0aW9uczogdGhpcy5maWx0ZXJPcHRpb25zLFxyXG4gICAgICAgICAgICAvLyAgICBmaWx0ZXJQYXJhbXM6IHRoaXMucGFyZW50Q250LmZpbHRlclBhcmFtc1xyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgLy92YXIgZWxtUm93T3B0cyA9IHsgbGFiZWw6IFwiRWxlbWVudHlcIiB9O1xyXG4gICAgICAgICAgICAvL2VsbVJvd09wdHNbXCJmYXZvcml0ZVJvd0xheW91dERlc2NyaXB0b3JcIl0gPSBcInctTC05IHctTS04IHctUy0xMlwiO1xyXG4gICAgICAgICAgICAvL2xldCBmcEZvcm06IEdvcmRpYy5Gb3Jtcy5Gb3JtO1xyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgZnBGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwianJlczozMDI1MDA1MlwiIH0pIC8vUkMgMzAyNTAwNTIgOiBGaWx0clxyXG4gICAgICAgICAgICAvLyAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLmFkZFJvdyhlbG1Sb3dPcHRzKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuRWtvLlByZWZhYnMuY2Z1RWxlbWVudHMoe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiZWxlbWVudHlcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAvL25hbWU6IFwiZmlsdGVyc1wiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGlkOiB0aGlzLnBhcmVudENudC50YXNrSWQgPyB0aGlzLnBhcmVudENudC50YXNrSWQgKyBcIl9lbGVtZW50eUZpZWxkI1wiIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIG1vZGVsVmFsdWVUcmFuc2Zvcm06IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLy9hcHBseTogKG1vZGVsVmFsdWUpID0+IHsgcmV0dXJuIG1vZGVsVmFsdWU7IH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGFwcGx5OiAobW9kZWxWYWx1ZSkgPT4geyByZXR1cm4gbW9kZWxWYWx1ZS5maWx0ZXJzOyB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvL2NvbGxlY3Q6IChmaWVsZFZhbHVlKSA9PiB7IHJldHVybiBmaWVsZFZhbHVlOyB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGNvbGxlY3Q6IChmaWVsZFZhbHVlKSA9PiB7IHJldHVybiB7IGZpbHRlcnM6IGZpZWxkVmFsdWUgfTsgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIG9iaikgeyB0aGF0LnBhcmVudENudC5sb2cudHJhY2UoXCJlbGVtZW50eVwiLCAkKHRoaXMpLmdmaWVsZChcImdldFZhbHVlXCIpKTsgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBncmlkRm9ybWF0OiBnZixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjYW5BZGROZXdSZWNvcmRzOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNhblJlbW92ZVJlY29yZHM6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgY3JlYXRlTmV3UmVjb3JkOiBHRWxlbWVudFV0aWxzLmNyZWF0ZU5ld0VsZW1lbnRGdW5jKHRoaXMuZ2xvYmFscy5SZXppbVByb3ZvenUhLCB0aGlzLnBhcmVudENudC5la29QYXJhbXMpLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNsZWFyUmVjb3JkOiBHRWxlbWVudFV0aWxzLmNyZWF0ZUNsZWFyRWxlbWVudEZ1bmModGhpcy5nbG9iYWxzLlJlemltUHJvdm96dSEpLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGZvcm1hdEVsZW1lbnRWYWx1ZU9wdGlvbnM6IHsgc2tpcDogR0VsZW1lbnRVdGlscy5nZXRFbGVtZW50VmFsdWVTa2lwQ29sdW1ucyh0aGlzLmdsb2JhbHMuUmV6aW1Qcm92b3p1ISksIG5hbWVDb2x1bW46IFwibmF6ZXZcIiB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAvL31cclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy4kZmlsdGVyUGFuZWwgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgIC8vICAgIC5hcHBlbmRUbyh0aGlzLnBhcmVudENudC5lbGVtZW50KVxyXG4gICAgICAgICAgICAvLyAgICAuZ2ZpbHRlcnBhbmVsKHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGZvcm1zOiBbZnBGb3JtXSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGZhdm9yaXRlczogW1wibWRcIl0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBmYXZvcml0ZUxheW91dERlc2NyaXB0b3I6IFwiTDVNM1MxIEwtMTItMTItMCBNLTEyLTEyLTAgUy0xMi0xMi0wXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBzZWFyY2hCdXR0b25Pbk1haW5Sb3c6IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBzYXZlT3B0aW9uc0Zvcm06IEdVY3JNYXNrYURldGFpbC5nZXRGb3JtKGdmIGFzIGFueSksIC8vVE9ETzogRGF0IHNwcmF2bnkgdHlwIGdyaWRmb3JtYXR1IVxyXG4gICAgICAgICAgICAvLyAgICAgICAgZmlsdGVyU3RvcmFnZVNlcnZpY2U6IG5ldyBHVWNyTWFza2FTZXJ2aWNlKHsgdHlwU2VzdGF2eTogdGhpcy50eXBTZXN0YXZ5LCBwYXJlbnRDb250ZW50OiB0aGF0LnBhcmVudENudCwgZnJhZ21lbnRzOiBcIiosZWxlbWVudHlcIiB9KSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGF1dG9Mb2FkQWZ0ZXJDaG9zZUZpbHRlcjogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBhcHBseTogKGV2LCBkYXRhKSA9PiB7IHRoaXMubG9hZERhdGFPbGQoZGF0YS5maWx0ZXIpOyB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgcmVzZXQ6IChldiwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbnN0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGdyaWQuZ2dyaWRzZXJ2ZXJmaWx0ZXIoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBwcmltYXJ5QnV0dG9uQmVoYXZpb3VyOiBcIkFsd2F5c1ByaW1hcnlcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGNsZWFyRmlsdGVyQnV0dG9uVmlzaWJsZTogXCJBbHdheXNWaXNpYmxlXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBwb1Z5aGxlZGFuaVpvYnJheml0OiBcIk9ibGliZW5lUG9kbWlua3lcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIHBvVnlobGVkYW5pWm9icmF6aXRVc2VyU2V0dGluZ3M6IFwiRGVueVwiIC8vTk9URTogWmFrYXp1amUgcHJlcGluYW5pIHBvIHZ5aGxlZGFuaSAtIHBva3VkIHNlIG5la2RvIHBva291c2VsIHZ5bWF6YXQgZmlsdHIgdiB0b210byByZXppbXUsIHRhayBtdXNlbCBrbGlrbm91dCBuYSB2eWhsZWRhdCwgdml6IFQzOTg3XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL1RPRE86IFByaWRhdCBmb3JtYXRvdmFuaSBwcm8gcHJpcGFkeSwga2R5IGpzb3Ugb2JsaWJlbmUgbmEgZml0cnBhbmVsdSBzY2hvdmFuZVxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy9iYWRnZURhdGE6IChldiwgbykgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgLy8gICAgbGV0IGQgPSBvLmRhdGEuZWxlbWVudHk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyAgICBpZiAoIWQgfHwgIWQuZmlsdGVycylcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy8gICAgby50b29sdGlwID0gXCJFbGVtZW50eTo8YnIvPlwiO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgLy8gICAgby50b29sdGlwICs9IEdvcmRpYy5Fa28uUHJlZmFicy5mb3JtYXRFbGVtZW50VmFsdWVzKGdmIGFzIGFueSwgZC5maWx0ZXJzKS5odG1sKCk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyAgICBvLnRvb2x0aXAgPSBvLnRvb2x0aXAucmVwbGFjZShcIk9SXCIsIFwiPGJyLz5cIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL31cclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldERhdGEoZmlsdGVyOiBHU2V6bmFtRWtvWmF6bmFtdUdldERhdGFGaWx0ZXJEdG8pOiBKUXVlcnlQcm9taXNlPElHU2V6bmFtWmFwaXN1U3RhdnVSZXN1bHREdG8+IHtcclxuICAgICAgICAgICAgbGV0IGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnRDbnQuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250b1phcGlzKSB7XHJcbiAgICAgICAgICAgICAgICAvL2ZpbHRlci5SYWRla1N0YXZ1ID0gdGhpcy5DdXJyZW50Um93O1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBycTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFphcGlzTGlzdFJlcXVlc3REdG8gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmFkZWtTdGF2dTogdGhpcy5DdXJyZW50Um93LFxyXG4gICAgICAgICAgICAgICAgICAgIE1hc2thOiBmaWx0ZXIuZmlsdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgLCBNYXNrYTI6IGZpbHRlci5maWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICAsIFR5cFVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpc1xyXG4gICAgICAgICAgICAgICAgICAgICwgRWxlbWVudHk6IGZpbHRlci5lbGVtZW50eVxyXG4gICAgICAgICAgICAgICAgICAgICwgbG9nb3ZhdEdkcHI6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAsIG1heFJlY29yZHM6IC0xLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5nZXREYXRhU2FsZG9rb250b1phcGlzeShkZWYsIHJxLCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIC8vaWYgKHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpc3lWc2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5nZXRTYWxkb2tvbnRvWmFwaXN5VnNlKGZpbHRlcik7XHJcbiAgICAgICAgICAgIC8vfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFjdGVuaSB2c2VjaCB6YXBpc3VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gZGVmXHJcbiAgICAgICAgICogQHBhcmFtIGZpbHRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0U2FsZG9rb250b1phcGlzeVZzZShmaWx0ZXI6IEdTZXpuYW1Fa29aYXpuYW11R2V0RGF0YUZpbHRlckR0byk6IEpRdWVyeS5Qcm9taXNlPElHU2V6bmFtWmFwaXN1U3RhdnVSZXN1bHREdG8+IHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9wID0gdGhpcy5wYXJlbnRDbnQuYmVnaW5PcGVyYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwiR1VjclphcGlzTGlzdEFsbFJlcXVlc3REdG9cIixcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzOiAwLCB0b3RhbDogMTAwLCBcclxuICAgICAgICAgICAgICAgIHRleHQ6IFwianJlczozMDI1MDI4OVwiLCAgLy9SQyAzMDI1MDI4OSA6IE5hxI3DrXTDoW0uLi5cclxuICAgICAgICAgICAgICAgIGNhbmNlbEFjdGlvbjogbmV3IEdBY3Rpb24oeyBjYXB0aW9uOiBcImpyZXM6MzAyNTAyODVcIiwgcnVuOiAoKSA9PiB7IHRhc2suY2FuY2VsKCkgfSwgbmFtZTogXCJjYW5jZWxBY3RcIiB9KSAvL1JDIDMwMjUwMjg1IDogU3Rvcm5vXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRhc2sgPSBHb3JkaWMuQXN5bmMuR1Rhc2tNYW5hZ2VyLnN0YXJ0PEdvcmRpYy5Bc3luYy5JR1Rhc2tQcm9ncmVzcywgYW55PihcIkdvcmRpYy5VY3QuU2VydmVyLkdVY3JaYXBpc3lTYWxkb2tvbnRvQXN5bmNcIiwge1xyXG4gICAgICAgICAgICAgICAgTWFza2E6IGZpbHRlci5maWx0ZXJcclxuICAgICAgICAgICAgICAgICwgUmFkZWtTdGF2dTogdGhpcy5Sb3dzXHJcbiAgICAgICAgICAgICAgICAsIE1hc2thMjogZmlsdGVyLmZpbHRlclxyXG4gICAgICAgICAgICAgICAgLCBUeXBVbG9oeTogdGhpcy5wYXJlbnRDbnQuVHlwVWxvaHlcclxuICAgICAgICAgICAgICAgICwgRWxlbWVudHk6IGZpbHRlci5lbGVtZW50eVxyXG4gICAgICAgICAgICAgICAgLCBsb2dvdmF0R2RwcjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLCBtYXhSZWNvcmRzOiAtMVxyXG4gICAgICAgICAgICAgICAgLCBOYXN0YXZlbmk6IHsgT3RhemthVmVsa2VNbm96c3R2aVphem5hbXU6IGZhbHNlIH1cclxuXHJcbiAgICAgICAgICAgIH0gYXMgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclphcGlzTGlzdEFsbFJlcXVlc3REdG8pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRhc2suZ2V0UHJvbWlzZSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihcclxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0KSA9PiB7IHJldHVybiB7IFNlem5hbVphcGlzdTogcmVzdWx0LnJlc3VsdCwgU3VteTogW10gYXMgYW55IH0gYXMgSUdTZXpuYW1aYXBpc3VTdGF2dVJlc3VsdER0bzsgfSxcclxuICAgICAgICAgICAgICAgICAgICAodCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodC5zdGF0ZSA9PT0gR29yZGljLkFzeW5jLkdUYXNrU3RhdGUuY2FuY2VsU2lnbmFsaXplZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuZGlhbG9ncy5hbGVydChcIlN0b3Jub3Zhbm9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodC5zdGF0ZSA9PT0gR29yZGljLkFzeW5jLkdUYXNrU3RhdGUuZmF1bHRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuZGlhbG9ncy5zaG93RXhjZXB0aW9uKHQuZXhjZXB0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHQuaGFuZGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLnByb2dyZXNzKChhOiB7IHByb2dyZXNzPzogR29yZGljLkFzeW5jLklHVGFza1Byb2dyZXNzIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYS5wcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcC5wcm9ncmVzcyA9IGEucHJvZ3Jlc3MuY3VycmVudCwgb3AudG90YWwgPSBhLnByb2dyZXNzLnRvdGFsLCBvcC50ZXh0ID0gYS5wcm9ncmVzcy50ZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENudC5wcm9ncmVzc09wZXJhdGlvbihvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHRoaXMucGFyZW50Q250LmVuZE9wZXJhdGlvbihvcCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFjdGVuaSBkYXQgcHJvIHNhbGRva29udG8gemFwaXN5XHJcbiAgICAgICAgICogQHBhcmFtIGRlZlxyXG4gICAgICAgICAqIEBwYXJhbSBtYXNrYVxyXG4gICAgICAgICAqIEBwYXJhbSBycVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0RGF0YVNhbGRva29udG9aYXBpc3koZGVmOiBKUXVlcnkuRGVmZXJyZWQ8YW55LCBhbnksIGFueT4sIHJxOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0WmFwaXNMaXN0UmVxdWVzdER0bywgZmlsdGVyczphbnkpOiBKUXVlcnkuUHJvbWlzZTxhbnksIGFueSwgYW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpczsgXHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmJlZ2luT3BlcmF0aW9uKFwiXCIpO1xyXG4gICAgICAgICAgICB0aGF0LnBhcmVudENudC5pc2wuVWNyVWNldG5pWmFwaXMubGlzdERhdGEoeyBycTogcnEsIGZpbHRlcnM6IGZpbHRlcnMgfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmV0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBTZXpuYW1aYXBpc3U6IHJlc3VsdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgU3VteTogW11cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKHJldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKG51bGwsIGZ1bmN0aW9uIChqcVhIUiwgdHlwZSwgb2JqKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LnBhcmVudENudCwgb2JqLCB0eXBlLCBycSwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0dXJuTWVzc2FnZSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB6aXNrYW5pIHpwcmF2IHBvc2xhbnljaCB6ZSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5WYWx1ZTogR29yZGljLkVrby5JbnRlcmZhY2UuR1RyYW5zZmVyTWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5SZXBlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJxIS5OYXN0YXZlbmkgPSByZXR1cm5WYWx1ZS5OYXN0YXZlbmk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmdldERhdGFTYWxkb2tvbnRvWmFwaXN5KGRlZiwgcnEsIGZpbHRlcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXR1cm5WYWx1ZS5SZXN1bHQgPT09IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdFUmVzdWx0T2ZQcm9jZXNzaW5nVGhlTWVzc2FnZS5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLmNhdGNoKGRlZi5yZWplY3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hY3RlbmkgZGF0IHBybyBzYWxkb2tvbnRvXHJcbiAgICAgICAgICogQHBhcmFtIGRlZlxyXG4gICAgICAgICAqIEBwYXJhbSBtYXNrYVxyXG4gICAgICAgICAqIEBwYXJhbSBycVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZ2V0RGF0YVNhbGRva29udG8oZGVmOiBKUXVlcnkuRGVmZXJyZWQ8YW55LCBhbnksIGFueT4sIG1hc2thOiBVY3QuSW50ZXJmYWNlLkdVY3JGaWx0ZXJEdG8sIHJxOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyTGlzdFJlcXVlc3REdG8pOiBKUXVlcnkuUHJvbWlzZTxhbnksIGFueSwgYW55PiB7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYmVnaW5PcGVyYXRpb24oXCJcIik7XHJcbiAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmlzbC5VY3JTYWxkb2tvbnRvLmxpc3REYXRhKHsgbWFza2E6IG1hc2thLCBycTogcnEgfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJldCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgU2V6bmFtWmFwaXN1OiByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFN1bXk6IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihudWxsLCBmdW5jdGlvbiAoanFYSFIsIHR5cGUsIG9iaikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3ZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbih0aGF0LnBhcmVudENudCwgb2JqLCB0eXBlLCBycSwgbnVsbCBhcyBhbnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXR1cm5NZXNzYWdlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLlJlc29sdmVFeGVwdGlvbk5ldyh0aGF0LnBhcmVudENudCwganFYSFIsICBycSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXR1cm5NZXNzYWdlID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHppc2thbmkgenByYXYgcG9zbGFueWNoIHplIHNlcnZlcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybk1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuVmFsdWU6IEdvcmRpYy5Fa28uSW50ZXJmYWNlLkdUcmFuc2Zlck1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlLlJlc3VsdCA9PT0gR29yZGljLkVrby5JbnRlcmZhY2UuR0VSZXN1bHRPZlByb2Nlc3NpbmdUaGVNZXNzYWdlLlJlcGVhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBycSEuTmFzdGF2ZW5pID0gcmV0dXJuVmFsdWUuTmFzdGF2ZW5pOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZ2V0RGF0YVNhbGRva29udG8oZGVmLG1hc2thLCBycSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocmV0dXJuVmFsdWUuUmVzdWx0ID09PSBHb3JkaWMuRWtvLkludGVyZmFjZS5HRVJlc3VsdE9mUHJvY2Vzc2luZ1RoZU1lc3NhZ2UuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApLmNhdGNoKGRlZi5yZWplY3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBqcVhIUlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSkgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBzaG93RGV0YWlsKHJvdz86IEdTZXpuYW1aYXBpc3VTdGF2dUR0byk6IHZvaWQge1xyXG4gICAgICAgIC8vICAgIGlmICghcm93KSB7XHJcbiAgICAgICAgLy8gICAgICAgIHZhciBzZWwgPSB0aGlzLiRncmlkLmdncmlkPEdTZXpuYW1aYXBpc3VTdGF2dUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgLy8gICAgICAgIGlmIChzZWwubGVuZ3RoID09PSAwKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vICAgICAgICByb3cgPSBzZWxbMF07XHJcbiAgICAgICAgLy8gICAgfTtcclxuICAgICAgICAvLyAgICBsZXQgdHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUgPSB0aGlzLnBhcmVudENudC5UeXBVbG9oeTtcclxuICAgICAgICAvLyAgICBpZiAodGhpcy5wYXJlbnRDbnQuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRmluYW5jb3ZhbmlaYXBpcykge1xyXG4gICAgICAgIC8vICAgICAgICBpZiAocm93LnByaXpfdXIgIT0gMClcclxuICAgICAgICAvLyAgICAgICAgICAgIHR5cFVsb2h5ID0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5Sb3pwb2NldFphcGlzO1xyXG4gICAgICAgIC8vICAgICAgICBlbHNlXHJcbiAgICAgICAgLy8gICAgICAgICAgICB0eXBVbG9oeSA9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVphcGlzO1xyXG4gICAgICAgIC8vICAgIH1cclxuICAgICAgICAvLyAgICBsZXQgb3B0aW9uczogSUdEZXRhaWxTdGF2WmFwaXNSYWRrdU9wdGlvbnMgPSB7XHJcbiAgICAgICAgLy8gICAgICAgIHR5cFVsb2h5OiB0eXBVbG9oeSwvL3RoaXMuVHlwVWxvaHksXHJcbiAgICAgICAgLy8gICAgICAgIGdyaWRGb3JtYXQ6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgIC8vICAgICAgICBmaWx0ZXI6IHRoaXMuZ2V0WmFwaXNGaWx0ZXIoKSxcclxuICAgICAgICAvLyAgICAgICAgcm93OiByb3csXHJcbiAgICAgICAgLy8gICAgICAgIGdsb2JhbHM6IHRoaXMuZ2xvYmFscyxcclxuICAgICAgICAvLyAgICAgICAgdmlld01vZGU6IFwiZnVsbFwiXHJcbiAgICAgICAgLy8gICAgfTtcclxuXHJcbiAgICAgICAgLy8gICAgdGhpcy5wYXJlbnRDbnQubmF2aWdhdGUoR29yZGljLlVjci5XZWJDbGllbnQuR0RldGFpbFN0YXZaYXBpc1JhZGt1LCBvcHRpb25zKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLyoqKlxyXG4gICAgICAgICAqIFpvYnJhemVuaSB2c2VjaCB6YXBpc3UgcHJvIHNhbGRva29udG9cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByaXZhdGUgc2hvd1phcGlzeUFsbCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgdHlwVWxvaHkgPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpc3lWc2U7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IFwic2V6bmFtU2FsZG9rb250byNcIjsgLy9OT1RFOiBNdXNpIGJ5dCBzdGVqbmUgbmkgbmEgTWFpbkFwcC5jc1xyXG4gICAgICAgICAgICBjb25zdCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGxldCByb3dzID0gZ3JpZC5nZ3JpZDxVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bz4oXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRGaWx0ZXIoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvL2xldCBmaWx0ZXI6IEdFa29GaWx0ZXJEdG87XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQucGFyZW50Q250Lm5hdmlnYXRlKCdHb3JkaWMuVWNyLldlYkNsaWVudC5HU2V6bmFtRWtvWmF6bmFtdScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUeXBVbG9oeTogdHlwVWxvaHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEZpbHRlcjoge30sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJvd3M6IHJvd3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFN0cmljdEZpbHRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRmlsdGVyU3RyUG9waXM6IGYuZmlsdGVyU3RyUG9waXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF1dG9Mb2FkRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMDI1MDI4M1wiIC8vUkMgMzAyNTAyODMgOiBaw6FwaXN5IHNhbGRva29udGFcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2hvd1phcGlzeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IHRpdGxlID0gXCJqcmVzOjMxMTAwMjI0XCI7IC8vUkMgMzExMDAyMjQgOiBaw6FwaXN5IHN0YXZ1XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5nZXRGaWx0ZXIoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsID0gZ3JpZC5nZ3JpZDxVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bz4oXCJnZXRTZWxlY3Rpb25cIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWwubGVuZ3RoICE9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSBzZWxbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHR5cFVsb2h5OiBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpZDogc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXI6IEdFa29GaWx0ZXJEdG87XHJcbiAgICAgICAgICAgICAgICAgICAgLy9OT1RFOiBPZHBvdmlkYSB6IFRLIFVDUjogR1Nlem5hbVphcGlzdVZSYWRrdVRhYi5Mb2FkR3JpZERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudENudC5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlID0gXCJqcmVzOjMwMjUwMjc0XCIgLy9SQyAzMDI1MDI3NCA6IFrDoXBpc3kgc2FsZG9rb250YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFkZCA9IFwiXCI7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5nbG9iYWxzLlNhbGRva29udG9QYXJhbTEhLnRyaW0oKSAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkID0gdGhhdC5nbG9iYWxzLlNhbGRva29udG9QYXJhbTEhLnRyaW0oKSArIFwiOiBcIiArIHJvdyFbXCJ2YWx1ZTBcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMiEudHJpbSgpICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhZGQgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGQgKz0gXCIsIFwiICsgdGhhdC5nbG9iYWxzLlNhbGRva29udG9QYXJhbTIhLnRyaW0oKSArIFwiOiBcIiArIHJvdyFbXCJ2YWx1ZTFcIl0hLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGQgPSB0aGF0Lmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMSEudHJpbSgpICsgXCI6IFwiICsgcm93IVtcInZhbHVlMFwiXT8udHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhZGQgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZCA9IFwiIChcIiArIGFkZCArIFwiKVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZSArPSBhZGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHsgc3RhcnQ6IHJvdy5pY28hLCBlbmQ6IHJvdy5pY28hIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IHsgc3RhcnQ6IHJvdy51Y3MhLCBlbmQ6IHJvdy51Y3MhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dXM6IHsgc3RhcnQ6IHJvdy51dXMhLCBlbmQ6IHJvdy51dXMhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBua3M6IHsgc3RhcnQ6IHJvdy5ua3MhLCBlbmQ6IHJvdy5ua3MhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNpYzogeyBzdGFydDogMCwgZW5kOiByb3cubWVzaWMgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyZF9tc2s6IHJvdy5kcmQhLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZnU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWE6IHsgc3RhcnQ6IHJvdy51ZWEhLCBlbmQ6IHJvdy51ZWEhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWViOiB7IHN0YXJ0OiByb3cudWViISwgZW5kOiByb3cudWViISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlYzogeyBzdGFydDogcm93LnVlYyEsIGVuZDogcm93LnVlYyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWQ6IHsgc3RhcnQ6IHJvdy51ZWQhLCBlbmQ6IHJvdy51ZWQhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVlOiB7IHN0YXJ0OiByb3cudWVlISwgZW5kOiByb3cudWVlISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZjogeyBzdGFydDogcm93LnVlZiEsIGVuZDogcm93LnVlZiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWc6IHsgc3RhcnQ6IHJvdy51ZWchLCBlbmQ6IHJvdy51ZWchIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVoOiB7IHN0YXJ0OiByb3cudWVoISwgZW5kOiByb3cudWVoISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlaTogeyBzdGFydDogcm93LnVlaSEsIGVuZDogcm93LnVlaSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWo6IHsgc3RhcnQ6IHJvdy51ZWohLCBlbmQ6IHJvdy51ZWohIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVrOiB7IHN0YXJ0OiByb3cudWVrISwgZW5kOiByb3cudWVrISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlbDogeyBzdGFydDogcm93LnVlbCEsIGVuZDogcm93LnVlbCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZW06IHsgc3RhcnQ6IHJvdy51ZW0hLCBlbmQ6IHJvdy51ZW0hIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVuOiB7IHN0YXJ0OiByb3cudWVuISwgZW5kOiByb3cudWVuISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlMDogeyBzdGFydDogcm93LnRlMCEsIGVuZDogcm93LnRlMCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTE6IHsgc3RhcnQ6IHJvdy50ZTEhLCBlbmQ6IHJvdy50ZTEhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGUyOiB7IHN0YXJ0OiByb3cudGUyISwgZW5kOiByb3cudGUyISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlMzogeyBzdGFydDogcm93LnRlMyEsIGVuZDogcm93LnRlMyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTQ6IHsgc3RhcnQ6IHJvdy50ZTQhLCBlbmQ6IHJvdy50ZTQhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU1OiB7IHN0YXJ0OiByb3cudGU1ISwgZW5kOiByb3cudGU1ISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlNjogeyBzdGFydDogcm93LnRlNiEsIGVuZDogcm93LnRlNiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTc6IHsgc3RhcnQ6IHJvdy50ZTchLCBlbmQ6IHJvdy50ZTchIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU4OiB7IHN0YXJ0OiByb3cudGU4ISwgZW5kOiByb3cudGU4ISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlOTogeyBzdGFydDogcm93LnRlOSEsIGVuZDogcm93LnRlOSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLnBhcmVudENudC5UeXBVbG9oeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVN0YXY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBVbG9oeSA9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVphcGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBcInVjdFphcGlzeSNcIjsgLy9OT1RFOiBNdXNpIGJ5dCBzdGVqbmUgbmkgbmEgTWFpbkFwcC5jc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5Sb3pwb2NldFN0YXY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBVbG9oeSA9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRaYXBpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gXCJyb3paYXBpc3kjXCI7IC8vTk9URTogTXVzaSBieXQgc3Rlam5lIG5pIG5hIE1haW5BcHAuY3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250bzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cFVsb2h5ID0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvWmFwaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZCA9IFwic2V6bmFtU2FsZG9rb250byNcIjsgLy9OT1RFOiBNdXNpIGJ5dCBzdGVqbmUgbmkgbmEgTWFpbkFwcC5jc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR0Vycm9yKFwiTm90U3VwcG9ydGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJlbnRDbnQubmF2aWdhdGUoJ0dvcmRpYy5VY3IuV2ViQ2xpZW50LkdTZXpuYW1Fa29aYXpuYW11Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRDogaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR5cFVsb2h5OiB0eXBVbG9oeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRmlsdGVyOiBmaWx0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEN1cnJlbnRSb3c6cm93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBTdHJpY3RGaWx0ZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEZpbHRlclN0clBvcGlzOiBmLmZpbHRlclN0clBvcGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBdXRvTG9hZERhdGE6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aXRsZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIGdldFphcGlzRmlsdGVyKCk6IEdFa29GaWx0ZXJEdG8ge1xyXG4gICAgICAgIC8vICAgIHZhciBzZWwgPSB0aGlzLiRncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlKVswXSBhcyBHU2V6bmFtWmFwaXN1U3RhdnVEdG87XHJcbiAgICAgICAgLy8gICAgaWYgKHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG8pXHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICB1Y3M6IHsgc3RhcnQ6IHNlbC51Y3MsIGVuZDogc2VsLnVjcyB9LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgbWVzaWM6IHsgc3RhcnQ6IHNlbC5tZXNpYywgZW5kOiBzZWwubWVzaWMgfSxcclxuICAgICAgICAvLyAgICAgICAgICAgIGFjOiB7IHN0YXJ0OiBzZWwuYWMsIGVuZDogc2VsLmFjIH1cclxuICAgICAgICAvLyAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gICAgcmV0dXJuIHtcclxuICAgICAgICAvLyAgICAgICAgdWNzOiB7IHN0YXJ0OiBzZWwudWNzLCBlbmQ6IHNlbC51Y3MgfSxcclxuICAgICAgICAvLyAgICAgICAgZHJkX21zazogc2VsIS5kcmQhLnRvU3RyaW5nKCksXHJcbiAgICAgICAgLy8gICAgICAgIG1lc2ljOiB7IHN0YXJ0OiBzZWwubWVzaWMsIGVuZDogc2VsLm1lc2ljIH0sXHJcbiAgICAgICAgLy8gICAgICAgIGFjOiB7IHN0YXJ0OiBzZWwuYWMsIGVuZDogc2VsLmFjIH1cclxuICAgICAgICAvLyAgICB9O1xyXG4gICAgICAgIC8vfVxyXG5cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGRvRmlsdGVyQ2xpY2soKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vTk9URTogVG90byBqZSBzcGF0bmUsIGFsZSBwcm8gdWthemt1IHN0YWNpIC0gamUgbnV0bmUgZmlsdHJvdmF0IGkgcyBlbGVtZW50eVxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5lbGVtZW50LmZpbmQoXCIuZ2ZpbHRlcnBhbmVsXCIpLmZpbmQoXCIuanMtaGxhdm5pVnlobGVkYXRcIikuY2xpY2soKTtcclxuXHJcbiAgICAgICAgICAgIC8vVE9ETzogUG8gdGVzdGVjaCBzIGRpc3RyaWJ1dG9yeSB2c2UgenJlZmFrdG9yaXQgbmEgdGFrb3Z5dG8gemFwaXMsIG11c2kgYnl0IGFsZSByYWRuZSBvdGVzdG92YW4gcHJvIHZzZWNobnkgcHJpcGFkeVxyXG4gICAgICAgICAgICAvL3RoaXMuZ2V0RmlsdGVyKHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldENvbmZpcm1lZERhdGFcIikpLnRoZW4oKGQpID0+IHsgdGhpcy5sb2FkRGF0YShkKTsgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgXHJcblxyXG4gICAgICAgIC8vLyoqIFByaXByYXZhIHBybyBnZW5lcm92YW5pIHNlc3RhdnkgKi9cclxuICAgICAgICAvL3ByaXZhdGUgcmVwb3J0U3RhcnRpbmcocmk6IElHUHJpbnRBY3Rpb25SZXBvcnRTdGFydGluZzxHU2V6bmFtRWtvWmF6bmFtdUdlbmVyYXRvckR0bz4pOiBKUXVlcnlQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyAgICByZXR1cm4gdGhpcy5nZXRGaWx0ZXIodGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q29uZmlybWVkRGF0YVwiKSlcclxuICAgICAgICAvLyAgICAgICAgLnRoZW4oKGYpID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgIHJpLmN1c3RvbUR0byA9IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB0eXBVbG9oeTogdGhpcy5wYXJlbnRDbnQuVHlwVWxvaHksXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZmlsdGVyOiBmLmZpbHRlcixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBlbGVtZW50eTogZi5lbGVtZW50eSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBmaWx0ZXJTdHJQb3BpczogZi5maWx0ZXJTdHJQb3Bpc1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfTtcclxuICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgLy99XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVemF2aXJhbmkgb2tuYVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5wYXJlbnRDbnQuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250bykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHVzZU5TID0gZmFsc2U7IGxldCB1c2VPUkcgPSBmYWxzZTsgbGV0IHVzZU9SSiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlciA9IHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldEN1cnJlbnREYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAoZmlsdGVyIGFzIGFueSkudm9sYnkhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChmaWx0ZXIgYXMgYW55KS52b2xieVtpXSA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VOUyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChmaWx0ZXIgYXMgYW55KS52b2xieVtpXSA9PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VPUkogPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoZmlsdGVyIGFzIGFueSkudm9sYnlbaV0gPT0gMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlT1JHID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC51c2VyU2V0dGluZ3MhLnNldChcInVzZWROU1wiLCB1c2VOUyk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC51c2VyU2V0dGluZ3MhLnNldChcInVzZU9SR1wiLCB1c2VPUkcpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQudXNlclNldHRpbmdzIS5zZXQoXCJ1c2VkT1JKXCIsdXNlT1JKKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuICQuRGVmZXJyZWQoKS5yZXNvbHZlKCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBpbnRlcmZhY2UgSUdTZXpuYW1aYXBpc3VTdGF2dVJlc3VsdER0byB7XHJcbiAgICAgICAgU2V6bmFtWmFwaXN1OiBVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0b1tdO1xyXG4gICAgICAgIFN1bXk6IFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiBcclxufSJdfQ==