"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            class GSeznamBalancovani extends WebClient.GSeznamEkoZaznamuBase {
                constructor(content) {
                    super(content);
                    this.logOptions = { name: "GSeznamBalancovani", authorCode: 302, file: "GSeznamBalancovani.ts" };
                    this.pouzivanStrukPopis = false;
                    this.povolenNahled = false;
                    this.rememberHistory = true;
                    //this.Zapisova = false;
                    // definice tasku pro seznam a nacteni poctu
                    this.taskList = this.parentCnt.isl.UcrRozpoctovyZapis.list();
                    this.taskCount = this.parentCnt.isl.UcrRozpoctovyZapis.count();
                }
                setSumBar(sumRow, $souctySpn) {
                    this.formatSumy("jres:31100056", sumRow.data?.c0, $souctySpn, ", "); //RC 31100056 : MD
                    this.formatSumy("jres:31100057", sumRow.data?.c1, $souctySpn, ", "); //RC 31100057 : Dal
                    if (typeof sumRow.data?.c0c1 !== "undefined")
                        this.formatSumy("jres:31100058", sumRow.data?.c0c1, $souctySpn, ", "); //RC 31100058 : MD - Dal
                    this.formatSumy("jres:30250559", sumRow.data?.c0_new, $souctySpn, ", "); //RC 30250559 : MD nové
                    this.formatSumy("jres:30250560", sumRow.data?.c1_new, $souctySpn, ", "); //RC 30250560 : Dal nové
                    if (typeof sumRow.data?.c0c1_new !== "undefined")
                        this.formatSumy("jres:30250561", sumRow.data?.c0c1_new, $souctySpn, ""); //RC 30250561 : MD n. - Dal n.
                }
                /**
                 * Definice menu
                 * @param typUlohy
                 */
                DefineMenuBar(typUlohy) {
                    let menu = new Array();
                    menu.push({ action: this.parentCnt.actions.dokladROAct, favorite: true });
                    menu.push({ action: this.parentCnt.actions.dokladBLKAct, favorite: true });
                    menu.push({ action: this.parentCnt.actions.primdokladAct, favorite: true });
                    //if (this.printAct)
                    //    menu.push({ action: this.printAct, favorite: true });
                    menu.push({ action: this.parentCnt.actions.prevFilterAct, favorite: true, align: "opposite" });
                    menu.push({ action: this.parentCnt.actions.nextFilterAct, favorite: true, align: "opposite" });
                    //menu.push({ action: this.zapisyAct, favorite: true });
                    if (this.printAct)
                        menu.push({ action: this.printAct, favorite: true });
                    menu.push({ action: this.clearFilterRowAct });
                    menu.push({
                        type: "static",
                        caption: "jres:31100268", //RC 31100268 : Rychlé akce
                        children: [
                            { action: this.parentCnt.actions.insAct, icon: "gi-refresh", caption: "jres:31100226" }, //RC 31100226 : Načtení dat
                            { action: this.parentCnt.actions.clearAndFilterAct, caption: "jres:31100228" }, //RC 31100228 : Vyčistit a načíst
                            (this.serverovyFilterNadGridem ? { action: this.parentCnt.actions.copyFilterAct, caption: "jres:30250642" } //RC 30250642 : Kopírovat podmínky
                                : { action: this.parentCnt.actions.emptyAct }),
                            (this.serverovyFilterNadGridem ? { action: this.parentCnt.actions.pasteFilterAct, caption: "jres:30250644" } //RC 30250644 : Vložit podmínky
                                : { action: this.parentCnt.actions.emptyAct }),
                        ]
                    });
                    return menu;
                }
                /**
                * Zmena focusu radku
                *
                */
                changeSelect() {
                    // TODO: Nutno dodelat
                    //this.nastaveniAkci();
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                nastaveniAkci(grid, pocetRadku) {
                    super.nastaveniAkci(grid, pocetRadku);
                    // pokud neni grid, nic nedelej
                    //let grid = this.getGrid();
                    //if (grid == null) return;
                    if (this.parentCnt.closed)
                        return;
                    const row = grid.ggrid("activeRow", false);
                    let enable = false;
                    //enable = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid) > 0;
                    enable = pocetRadku > 0;
                    let visibleBLK = false;
                    let visibleRO = false;
                    if (enable) {
                        if (typeof row !== "undefined" && row != null && row.ixp_prim && row.ixp_prim.trim() != "")
                            visibleBLK = true;
                        if (typeof row !== "undefined" && row != null && row.ixp_roz && row.ixp_roz.trim() != "")
                            visibleRO = true;
                    }
                    // pristupnost akci dle nactenych dat
                    this.parentCnt.actions.primdokladAct.enabled(enable);
                    this.parentCnt.actions.dokladBLKAct.update({ enabled: enable, visible: visibleBLK });
                    this.parentCnt.actions.dokladROAct.update({ enabled: enable, visible: visibleRO });
                    this.parentCnt.actions.dotAct.enabled(enable);
                    this.previewController?.enable(enable);
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
                    //gf.addStructureColumn({
                    //    name: "doklady",
                    //    caption: "jres:31100231", //RC 31100231 : Doklady
                    //    hidden: true,
                    //    width: 100,
                    //    groupings: {
                    //        default: {
                    //            _presetCaption: "blabla",
                    //            grouping: {
                    //                hash: (meta, rows) => {
                    //                    var d = meta.data;
                    //                    return `${d.ac}|${d.mesic}|${d.rok}|${d.lic}|${d.ico}|${d.ucs}`; //NOTE: Pridat aggregate: Gordic.Data.Aggregates.first("ac"), u vsech techto sloupcu
                    //                },
                    //                sort: "rok,lic,ico,ucs,mesic,ac",
                    //                hideColumn: false
                    //            }
                    //        }
                    //    }
                    //});
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
                    // pro balancovani neni zadny filter
                    var drdServerFilter = Gordic.Eko.Filters.drd(this.filterOptions.drd);
                    gf.addNumberColumn({
                        name: "drd",
                        caption: "jres:31100052 ", //RC 31100052 : H
                        description: "jres:31100102", //RC 31100102 : Druh dokladu (DRD)
                        //tooltipTemplate: "jres:31100102", //RC 31100102 : Druh dokladu (DRD)
                        width: 30,
                        //serverFilter: drdServerFilter//Gordic.Eko.Filters.drd(this.filterOptions.drd)
                    });
                    gf.addNumberColumn({
                        name: "rok",
                        caption: "jres:30250100 ", //RC 30250100 : Rok
                        //description: "jres:31100011", //RC 31100011 : Měsíc
                        width: 40,
                        //aggregate: Gordic.Data.Aggregates.first("mesic"),
                        serverFilter: Gordic.Eko.Filters.stringInterval({ model: "rok", caption: "jres:30250100", disabled: !!(this.Filter && this.StrictFilter && this.Filter.rok) }) //RC 30250100 : Rok
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
                    gf.addSortedEkoCfuSet(this.getCfuSetServerFilters(true));
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
                        caption: "jres:30250553", //RC 30250553 : Dal pův.
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
                        hidden: !this.globals.Rad_ZobrazMdDal,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0c1", caption: "jres:30250150" }) //RC 30250150 : MD pův. - Dal pův.
                    });
                    gf.addCurrencyColumn({
                        name: "c0c1_new",
                        caption: "jres:30250151", //RC 30250151 :  MD nové - Dal nové
                        description: "jres:30250151", //RC 30250151 :  MD nové - Dal nové
                        width: 120,
                        hidden: !this.globals.Rad_ZobrazMdDal,
                        serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0c1_new", caption: "jres:30250151" }) //RC 30250151 :  MD nové - Dal nové
                    });
                    gf.addTextColumn({
                        name: "popis",
                        caption: "jres:31100071", //RC 31100071 : Popis řádku
                        width: 200,
                        serverFilter: Gordic.Eko.Filters.stringSingle({ model: "popis", caption: "jres:31100071" }) //RC 31100071 : Popis řádku
                    });
                    gf.addTextColumn({
                        name: "ixp",
                        caption: "jres:31100075", //RC 31100075 : PID
                        description: "jres:31100251", //RC 31100251 : Prvotní identifikátor primárního dokladu
                        width: 110,
                        serverFilter: Gordic.Eko.Filters.ixp({ model: "ixp", caption: "jres:31100075" }) //RC 31100075 : PID
                    });
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
                        gf.addNumberColumn({
                            name: "priz_blok",
                            caption: "jres:30250554", //RC 30250554 : Blok.
                            cellTemplate: function (row, meta, cellInfo) {
                                if (meta?._isSummary)
                                    return "";
                                if (row.priz_blok === 1)
                                    return "jres:30250557"; //RC 30250557 : Ano
                                else
                                    return "jres:30250555"; //RC 30250555 : Ne
                            },
                            width: 70,
                            serverFilter: Gordic.Eko.Filters.yesNo({ model: "priz_blok", caption: "jres:30250558" }) //RC 30250558 : Blokováno
                            //serverFilter: Gordic.Eko.Filters.integerInterval({ name: "status", model: "status" })
                        });
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
                    //gf.addTextColumn({
                    //    name: "nazev_rf",
                    //    caption: "jres:31100097", //RC 31100097 : Změnu provedl
                    //    width: 200,
                    //    serverFilter: Gordic.Eko.Filters.stringSingle({ model: "nazev_rf", caption: "jres:31100097" }) //RC 31100097 : Změnu provedl
                    //});
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
                    this.tema = "ucr_ptm_bal";
                    super.createActions();
                    this.parentCnt.actions.add({
                        name: "dokladBLKAct",
                        enabled: false,
                        icon: "fa-external-link",
                        caption: "jres:30250155", //RC 30250155 : Doklad BLK
                        run: (ev, ctx) => { this.showPrimDoklad(undefined, "BLK"); }
                    });
                    this.parentCnt.actions.add({
                        name: "dokladROAct",
                        enabled: false,
                        icon: "fa-external-link",
                        caption: "jres:30250156", //RC 30250156 : Doklad RO
                        run: (ev, ctx) => { this.showPrimDoklad(undefined, "RO"); }
                    });
                    this.parentCnt.actions.add({
                        name: "primdokladAct",
                        icon: "fa-external-link",
                        enabled: false,
                        caption: "jres:30250154", //RC 30250154 : Prim. doklad
                        run: (ev, ctx) => { this.showPrimDoklad(); }
                    });
                    this.defaultGridAction = this.parentCnt.actions.primdokladAct;
                }
            }
            WebClient.GSeznamBalancovani = GSeznamBalancovani;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUJhbGFuY292YW5pLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbUJhbGFuY292YW5pLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0FnaEJmO0FBaGhCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FnaEJuQjtJQWhoQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWdoQjdCO1FBaGhCb0IsV0FBQSxTQUFTO1lBRTFCLE1BQWEsa0JBQW1CLFNBQVEsVUFBQSxxQkFBcUI7Z0JBV3pELFlBQVksT0FBcUM7b0JBQzdDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFGbkIsZUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLENBQUM7b0JBR3hGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO29CQUMzQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztvQkFDNUIsd0JBQXdCO29CQUN4Qiw0Q0FBNEM7b0JBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQzdELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ25FLENBQUM7Z0JBRVMsU0FBUyxDQUFDLE1BQXNELEVBQUUsVUFBK0I7b0JBRW5HLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLGtCQUFrQjtvQkFDNUYsSUFBSSxDQUFDLFVBQVUsQ0FB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d0JBQ3RELEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQy9DLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsYUFBd0IsQ0FBQztnQkFJN0UsQ0FBQzthQUtKO1lBeGdCWSw0QkFBa0IscUJBd2dCOUIsQ0FBQTtRQU1MLENBQUMsRUFoaEJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFnaEI3QjtJQUFELENBQUMsRUFoaEJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFnaEJuQjtBQUFELENBQUMsRUFoaEJTLE1BQU0sS0FBTixNQUFNLFFBZ2hCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuVWNyLldlYkNsaWVudCB7XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtQmFsYW5jb3ZhbmkgZXh0ZW5kcyBHU2V6bmFtRWtvWmF6bmFtdUJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG4gICAgICAgIC8qKiBHbG9iYWxuaSBtb2R1bG92ZSBwYXJhbWV0cnkgdiBKUyAqL1xyXG4gICAgICAgIHByaXZhdGUgaW5zQWN0OiBHQWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgY2xlYXJBbmRGaWx0ZXJBY3Q6IEdBY3Rpb247XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qKiBMaW1pdCBwb2N0dSBuYWNpdGFueWNoIHphem5hbXUsIHBva3VkIG5lZG9qZGUgayBwb3R2cnplbmksIHplIHV6aXZhdGVsIGNoY2Ugaml0IHByZXMgbGltaXQgKi9cclxuICAgICAgICBzdW1MaW1pdDogbnVtYmVyO1xyXG4gICAgICAgIGxvZ09wdGlvbnMgPSB7IG5hbWU6IFwiR1Nlem5hbUJhbGFuY292YW5pXCIsIGF1dGhvckNvZGU6IDMwMiwgZmlsZTogXCJHU2V6bmFtQmFsYW5jb3ZhbmkudHNcIiB9O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IEdTZXpuYW1Fa29aYXpuYW11QmFzZUNvbnRlbnQpIHtcclxuICAgICAgICAgICAgc3VwZXIoY29udGVudCk7XHJcbiAgICAgICAgICAgIHRoaXMucG91eml2YW5TdHJ1a1BvcGlzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucG92b2xlbk5haGxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbWVtYmVySGlzdG9yeSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vdGhpcy5aYXBpc292YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBkZWZpbmljZSB0YXNrdSBwcm8gc2V6bmFtIGEgbmFjdGVuaSBwb2N0dVxyXG4gICAgICAgICAgICB0aGlzLnRhc2tMaXN0ID0gdGhpcy5wYXJlbnRDbnQuaXNsLlVjclJvenBvY3RvdnlaYXBpcy5saXN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFza0NvdW50ID0gdGhpcy5wYXJlbnRDbnQuaXNsLlVjclJvenBvY3RvdnlaYXBpcy5jb3VudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHNldFN1bUJhcihzdW1Sb3c6IE1ldGFSb3c8SUdTZXpuYW1aYXBpc3VTdGF2dUR0b1dpdGhUYWJTZXR0aW5ncz4sICRzb3VjdHlTcG46IEpRdWVyeTxIVE1MRWxlbWVudD4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1hdFN1bXkoXCJqcmVzOjMxMTAwMDU2XCIsIHN1bVJvdy5kYXRhPy5jMCEsICRzb3VjdHlTcG4sIFwiLCBcIik7IC8vUkMgMzExMDAwNTYgOiBNRFxyXG4gICAgICAgICAgICB0aGlzLmZvcm1hdFN1bXkoXCJqcmVzOjMxMTAwMDU3XCIsIHN1bVJvdy5kYXRhPy5jMSEsICRzb3VjdHlTcG4sIFwiLCBcIik7IC8vUkMgMzExMDAwNTcgOiBEYWxcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdW1Sb3cuZGF0YT8uYzBjMSAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgdGhpcy5mb3JtYXRTdW15KFwianJlczozMTEwMDA1OFwiLCBzdW1Sb3cuZGF0YT8uYzBjMSEsICRzb3VjdHlTcG4sIFwiLCBcIik7IC8vUkMgMzExMDAwNTggOiBNRCAtIERhbFxyXG4gICAgICAgICAgICB0aGlzLmZvcm1hdFN1bXkoXCJqcmVzOjMwMjUwNTU5XCIsIHN1bVJvdy5kYXRhPy5jMF9uZXchLCAkc291Y3R5U3BuLCBcIiwgXCIpOyAvL1JDIDMwMjUwNTU5IDogTUQgbm92w6lcclxuICAgICAgICAgICAgdGhpcy5mb3JtYXRTdW15KFwianJlczozMDI1MDU2MFwiLCBzdW1Sb3cuZGF0YT8uYzFfbmV3ISwgJHNvdWN0eVNwbiwgXCIsIFwiKTsgLy9SQyAzMDI1MDU2MCA6IERhbCBub3bDqVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHN1bVJvdy5kYXRhPy5jMGMxX25ldyAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybWF0U3VteShcImpyZXM6MzAyNTA1NjFcIiwgc3VtUm93LmRhdGE/LmMwYzFfbmV3ISwgJHNvdWN0eVNwbiwgXCJcIik7IC8vUkMgMzAyNTA1NjEgOiBNRCBuLiAtIERhbCBuLlxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlZmluaWNlIG1lbnVcclxuICAgICAgICAgKiBAcGFyYW0gdHlwVWxvaHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgRGVmaW5lTWVudUJhcih0eXBVbG9oeTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZSk6IE1lbnVQYXJhbXNbXSB7XHJcbiAgICAgICAgICAgIGxldCBtZW51ID0gbmV3IEFycmF5PE1lbnVQYXJhbXM+KCk7XHJcblxyXG4gICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuZG9rbGFkUk9BY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuZG9rbGFkQkxLQWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnByaW1kb2tsYWRBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAvL2lmICh0aGlzLnByaW50QWN0KVxyXG4gICAgICAgICAgICAvLyAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucHJpbnRBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMucHJldkZpbHRlckFjdCwgZmF2b3JpdGU6IHRydWUsIGFsaWduOiBcIm9wcG9zaXRlXCIgfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5uZXh0RmlsdGVyQWN0LCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9KTtcclxuICAgICAgICAgICAgLy9tZW51LnB1c2goeyBhY3Rpb246IHRoaXMuemFwaXN5QWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJpbnRBY3QpXHJcbiAgICAgICAgICAgICAgICBtZW51LnB1c2goeyBhY3Rpb246IHRoaXMucHJpbnRBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5jbGVhckZpbHRlclJvd0FjdCB9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwic3RhdGljXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyNjhcIiwgLy9SQyAzMTEwMDI2OCA6IFJ5Y2hsw6kgYWtjZVxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5pbnNBY3QsIGljb246IFwiZ2ktcmVmcmVzaFwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAyMjZcIiB9LCAvL1JDIDMxMTAwMjI2IDogTmHEjXRlbsOtIGRhdFxyXG4gICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmNsZWFyQW5kRmlsdGVyQWN0LCBjYXB0aW9uOiBcImpyZXM6MzExMDAyMjhcIiB9LCAvL1JDIDMxMTAwMjI4IDogVnnEjWlzdGl0IGEgbmHEjcOtc3RcclxuICAgICAgICAgICAgICAgICAgICAodGhpcy5zZXJ2ZXJvdnlGaWx0ZXJOYWRHcmlkZW0gPyB7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5jb3B5RmlsdGVyQWN0LCBjYXB0aW9uOiBcImpyZXM6MzAyNTA2NDJcIiB9IC8vUkMgMzAyNTA2NDIgOiBLb3DDrXJvdmF0IHBvZG3DrW5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmVtcHR5QWN0IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnNlcnZlcm92eUZpbHRlck5hZEdyaWRlbSA/IHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnBhc3RlRmlsdGVyQWN0LCBjYXB0aW9uOiBcImpyZXM6MzAyNTA2NDRcIiB9IC8vUkMgMzAyNTA2NDQgOiBWbG/Fvml0IHBvZG3DrW5reVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmVtcHR5QWN0IH0pLCBcclxuXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogWm1lbmEgZm9jdXN1IHJhZGt1XHJcbiAgICAgICAgKiBcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBjaGFuZ2VTZWxlY3QoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IE51dG5vIGRvZGVsYXRcclxuICAgICAgICAgICAgLy90aGlzLm5hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pIHByaXN0dXBub3N0aSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgbmFzdGF2ZW5pQWtjaShncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCBwb2NldFJhZGt1OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgc3VwZXIubmFzdGF2ZW5pQWtjaShncmlkLCBwb2NldFJhZGt1KTtcclxuICAgICAgICAgICAgLy8gcG9rdWQgbmVuaSBncmlkLCBuaWMgbmVkZWxlalxyXG4gICAgICAgICAgICAvL2xldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIC8vaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYXJlbnRDbnQuY2xvc2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBjb25zdCByb3cgPSBncmlkLmdncmlkPFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPihcImFjdGl2ZVJvd1wiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGxldCBlbmFibGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy9lbmFibGUgPSBHb3JkaWMuRWtvLldlYkNsaWVudC5Db21tb24uQ2Vsa292eVBvY2V0UmFka3UoZ3JpZCkgPiAwO1xyXG4gICAgICAgICAgICBlbmFibGUgPSBwb2NldFJhZGt1PjA7XHJcbiAgICAgICAgICAgIGxldCB2aXNpYmxlQkxLID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCB2aXNpYmxlUk8gPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKGVuYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgcm93ICE9IG51bGwgJiYgcm93Lml4cF9wcmltICYmIHJvdy5peHBfcHJpbS50cmltKCkgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlQkxLID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygcm93ICE9PSBcInVuZGVmaW5lZFwiICYmIHJvdyAhPSBudWxsICYmIHJvdy5peHBfcm96ICYmIHJvdy5peHBfcm96LnRyaW0oKSAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGVSTyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHByaXN0dXBub3N0IGFrY2kgZGxlIG5hY3RlbnljaCBkYXRcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMucHJpbWRva2xhZEFjdCEuZW5hYmxlZChlbmFibGUpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmRva2xhZEJMS0FjdCEudXBkYXRlKHsgZW5hYmxlZDogZW5hYmxlLCB2aXNpYmxlOiB2aXNpYmxlQkxLIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmRva2xhZFJPQWN0IS51cGRhdGUoeyBlbmFibGVkOiBlbmFibGUsIHZpc2libGU6IHZpc2libGVSTyB9KTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5kb3RBY3QhLmVuYWJsZWQoZW5hYmxlKTtcclxuICAgICAgICAgICAgdGhpcy5wcmV2aWV3Q29udHJvbGxlcj8uZW5hYmxlKGVuYWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogVnl0dm9yZW5pIGtsYXZlc292eWNoIHprcmF0ZWtcclxuICAgICAgICAqIFxyXG4gICAgICAgICogKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY3JlYXRlU2hvcnRDdXQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZVNob3J0Q3V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0byAvKiYgR1Nlem5hbVphcGlzdVN0YXZ1RHRvKi8+IHtcclxuICAgICAgICAgICAgdmFyIGdmID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvPigpO1xyXG4gICAgICAgICAgICAvL3ZhciB0b3BvR3JvdXAgPSBcInRvcG9cIjtcclxuXHJcbiAgICAgICAgICAgIC8vZ2YuYWRkU3RydWN0dXJlQ29sdW1uKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJkb2tsYWR5XCIsXHJcbiAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwianJlczozMTEwMDIzMVwiLCAvL1JDIDMxMTAwMjMxIDogRG9rbGFkeVxyXG4gICAgICAgICAgICAvLyAgICBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgIC8vICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgIC8vICAgIGdyb3VwaW5nczoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIF9wcmVzZXRDYXB0aW9uOiBcImJsYWJsYVwiLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIGdyb3VwaW5nOiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGhhc2g6IChtZXRhLCByb3dzKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB2YXIgZCA9IG1ldGEuZGF0YTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtkLmFjfXwke2QubWVzaWN9fCR7ZC5yb2t9fCR7ZC5saWN9fCR7ZC5pY299fCR7ZC51Y3N9YDsgLy9OT1RFOiBQcmlkYXQgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwiYWNcIiksIHUgdnNlY2ggdGVjaHRvIHNsb3VwY3VcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgc29ydDogXCJyb2ssbGljLGljbyx1Y3MsbWVzaWMsYWNcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgaGlkZUNvbHVtbjogZmFsc2VcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy99KTtcclxuXHJcblxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2xvYmFscy5SZXppbVByb3ZvenUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuTktTOiBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuVUNTOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMubmtzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLm5rcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5JQ086XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJ1Y3NcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmljbywgYWt0UHJvaGw6IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuYWt0UHJvaGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG9ubHlBY3RpdmU6IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3Mub25seUFjdGl2ZSwgY2FwdGlvbjogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5jYXB0aW9uLCBuYW1lOiBcInVjc1wiLCBmaXJzdEZpZWxkOiB1bmRlZmluZWQsIHNlY29uZEZpZWxkOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcInVjc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkaXNhYmxlZDogISEodGhpcy5SYWRla19EUEgpICYmICEhdGhpcy5GaWx0ZXIudWNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkF2b2lkVXVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1dXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuVXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLnV1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51dXNJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5pY28sIHVjczogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy51Y3MsIGFrdFByb2hsOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmFrdFByb2hsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgb25seUFjdGl2ZTogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5vbmx5QWN0aXZlLCBjYXB0aW9uOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmNhcHRpb24sIG5hbWU6IFwidXVzXCIsIGZpcnN0RmllbGQ6IHVuZGVmaW5lZCwgc2Vjb25kRmllbGQ6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcInV1c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKSAmJiAhIXRoaXMuRmlsdGVyLnVjc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Bdm9pZE5rcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMubmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5TT1I6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpY29cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5JY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5JY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcImljb1wiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogdGhpcy5FeHRlcm5pU3VtYXJpemFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gR29yZGljLkVrby5GaWx0ZXJzLnJhckludGVydmFsKHsgbW9kZWw6IFwiaWNvXCIsIG9ubHlBY3RpdmU6IGZhbHNlLCBjYXB0aW9uOiB0aGlzLnprcmF0a3kuSWNvLCBkaXNhYmxlZDogISEodGhpcy5SYWRla19EUEgpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBHb3JkaWMuRWtvLkZpbHRlcnMuaWNvSW50ZXJ2YWwoeyBtb2RlbDogXCJpY29cIiwgb25seUFjdGl2ZTogZmFsc2UsIGNhcHRpb246IHRoaXMuemtyYXRreS5JY28sIGRpc2FibGVkOiAhISh0aGlzLlJhZGVrX0RQSCkgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5Bdm9pZEV4dCB8fCB0aGlzLmdsb2JhbHMuVHlwU3VtYXJpemFjZSAhPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cFN1bWFyaXphY2UuRXh0ZXJuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcInVjc1wiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudWNzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuaWNvLCBha3RQcm9obDogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5ha3RQcm9obFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG9ubHlBY3RpdmU6IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3Mub25seUFjdGl2ZSwgY2FwdGlvbjogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5jYXB0aW9uLCBuYW1lOiBcInVjc1wiLCBmaXJzdEZpZWxkOiB1bmRlZmluZWQsIHNlY29uZEZpZWxkOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJ1Y3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiAhISh0aGlzLlJhZGVrX0RQSCkgJiYgISF0aGlzLkZpbHRlci51Y3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkF2b2lkVXVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuVXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnV1c0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy51dXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnV1c0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5pY28sIHVjczogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy51Y3MsIGFrdFByb2hsOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmFrdFByb2hsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG9ubHlBY3RpdmU6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMub25seUFjdGl2ZSwgY2FwdGlvbjogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5jYXB0aW9uLCBuYW1lOiBcInV1c1wiLCBmaXJzdEZpZWxkOiB1bmRlZmluZWQsIHNlY29uZEZpZWxkOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwidXVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKSAmJiAhIXRoaXMuRmlsdGVyLnVjc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Bdm9pZE5rcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMubmtzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLm5rcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZHJkU2VydmVyRmlsdGVyID0gR29yZGljLkVrby5GaWx0ZXJzLmRyZCh0aGlzLmZpbHRlck9wdGlvbnMuZHJkKTtcclxuICAgICAgICAgICAgLy8gcHJvIGJhbGFuY292YW5pIG5lbmkgemFkbnkgZmlsdGVyXHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGRyZFNlcnZlckZpbHRlciA9IEdvcmRpYy5Fa28uRmlsdGVycy5kcmQodGhpcy5maWx0ZXJPcHRpb25zLmRyZCk7XHJcblxyXG4gICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkcmRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1MiBcIiwgLy9SQyAzMTEwMDA1MiA6IEhcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAxMDJcIiwgLy9SQyAzMTEwMDEwMiA6IERydWggZG9rbGFkdSAoRFJEKVxyXG4gICAgICAgICAgICAgICAgLy90b29sdGlwVGVtcGxhdGU6IFwianJlczozMTEwMDEwMlwiLCAvL1JDIDMxMTAwMTAyIDogRHJ1aCBkb2tsYWR1IChEUkQpXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogZHJkU2VydmVyRmlsdGVyLy9Hb3JkaWMuRWtvLkZpbHRlcnMuZHJkKHRoaXMuZmlsdGVyT3B0aW9ucy5kcmQpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJyb2tcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDEwMCBcIiwgLy9SQyAzMDI1MDEwMCA6IFJva1xyXG4gICAgICAgICAgICAgICAgLy9kZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMDExXCIsIC8vUkMgMzExMDAwMTEgOiBNxJtzw61jXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNDAsXHJcbiAgICAgICAgICAgICAgICAvL2FnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcIm1lc2ljXCIpLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJyb2tcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTAwXCIsIGRpc2FibGVkOiAhISh0aGlzLkZpbHRlciAmJiB0aGlzLlN0cmljdEZpbHRlciAmJiB0aGlzLkZpbHRlci5yb2spIH0pIC8vUkMgMzAyNTAxMDAgOiBSb2tcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm1lc2ljXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTEgXCIsIC8vUkMgMzExMDAwNTEgOiBNXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMDExXCIsIC8vUkMgMzExMDAwMTEgOiBNxJtzw61jXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJtZXNpY1wiKSxcclxuICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJtZXNpY1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTFcIiwgZGlzYWJsZWQ6ICEhKHRoaXMuRmlsdGVyICYmIHRoaXMuU3RyaWN0RmlsdGVyICYmIHRoaXMuRmlsdGVyLm1lc2ljKSB9KSAvL1JDIDMxMTAwMDUxIDogTVxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1lc2ljXCIsIGNhcHRpb246IFwianJlczozMTEwMDA1MVwiLCAvL1JDIDMxMTAwMDUxIDogTVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhISh0aGlzLkZpbHRlciAmJiB0aGlzLlN0cmljdEZpbHRlciAmJiB0aGlzLkZpbHRlci5tZXNpYyksXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RGaWVsZDogeyB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJhbmdlKHsgbWluOiAxLCBtYXg6IDEzIH0pXSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEZpZWxkOiB7IHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDEsIG1heDogMTMgfSldIH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRlblwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDUzIFwiLCAvL1JDIDMxMTAwMDUzIDogRFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDEzMFwiLCAvL1JDIDMxMTAwMTMwIDogRGVuXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiZGVuXCIsIGNhcHRpb246IFwianJlczozMTEwMDA1M1wiLCBkaXNhYmxlZDogISEodGhpcy5GaWx0ZXIgJiYgdGhpcy5TdHJpY3RGaWx0ZXIgJiYgdGhpcy5GaWx0ZXIuZGVuKSB9KSAvL1JDIDMxMTAwMDUzIDogRFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImRlblwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTNcIiwgLy9SQyAzMTEwMDA1MyA6IERcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogISEodGhpcy5GaWx0ZXIgJiYgdGhpcy5TdHJpY3RGaWx0ZXIgJiYgdGhpcy5GaWx0ZXIuZGVuKSxcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDEsIG1heDogMzEgfSldIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRmllbGQ6IHsgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SYW5nZSh7IG1pbjogMSwgbWF4OiAzMSB9KV0gfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibGljXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkxJQ1wiLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwibGljXCIpLFxyXG4gICAgICAgICAgICAgICAgLy8vL3NlcnZlckZpbHRlcjogLy9UT0RPXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgZ2YuYWRkU29ydGVkRWtvQ2Z1U2V0KHRoaXMuZ2V0Q2Z1U2V0U2VydmVyRmlsdGVycyh0cnVlKSk7XHJcblxyXG4gICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImMwXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDVcIiwgLy9SQyAzMDI1MDE0NSA6IE1EIHDFr3YuXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMTQ1XCIsIC8vUkMgMzExMDAyNDMgOiBNw6EgRMOhdGlcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDVcIiB9KSAvL1JDIDMwMjUwMTQ1IDogTUQgcMWvdi5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBfbmV3XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDZcIiwgLy9SQyAzMDI1MDE0NiA6IE1EIG5vdsOpXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMTQ2XCIsIC8vUkMgMzExMDAyNDMgOiBNw6EgRMOhdGlcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMF9uZXdcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTQ2XCIgfSkgLy9SQyAzMDI1MDE0NiA6IE1EIG5vdsOpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImMwYzBfcHJvY1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTQ3XCIsIC8vUkMgMzAyNTAxNDcgOiAgJVxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDE0N1wiLCAvL1JDIDMxMTAwMjQzIDogTcOhIETDoXRpXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNTAsXHJcbiAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwXCIsIGNhcHRpb246IFwianJlczozMDI1MDE0NlwiIH0pIC8vUkMgMzAyNTAxNDYgOiBNRCBub3bDqVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNTUzXCIsIC8vUkMgMzAyNTA1NTMgOiBEYWwgcMWvdi5cclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAxNDhcIiwgLy9SQyAzMTEwMDI0MyA6IE3DoSBEw6F0aVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMxXCIsIGNhcHRpb246IFwianJlczozMDI1MDE0OFwiIH0pIC8vUkMgMzAyNTAxNDYgOiBNRCBub3bDqVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMV9uZXdcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE0OVwiLCAvL1JDIDMwMjUwMTQ5IDogRGFsIG5vdsOpXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMTQ5XCIsIC8vUkMgMzAyNTAxNDkgOiBEYWwgbm92w6lcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMV9uZXdcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTQ5XCIgfSkgLy9SQyAzMDI1MDE0OSA6IERhbCBub3bDqVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMWMxX3Byb2NcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE0N1wiLCAvL1JDIDMwMjUwMTQ3IDogICVcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAxNDdcIiwgLy9SQyAzMTEwMDI0MyA6IE3DoSBEw6F0aVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDUwLFxyXG4gICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNDZcIiB9KSAvL1JDIDMwMjUwMTQ2IDogTUQgbm92w6lcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBjMVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTUwXCIsIC8vUkMgMzAyNTAxNTAgOiBNRCBwxa92LiAtIERhbCBwxa92LlxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDE1MFwiLCAvL1JDIDMwMjUwMTUwIDogTUQgcMWvdi4gLSBEYWwgcMWvdi5cclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBoaWRkZW46ICF0aGlzLmdsb2JhbHMuUmFkX1pvYnJhek1kRGFsLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBjMVwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNTBcIiB9KSAvL1JDIDMwMjUwMTUwIDogTUQgcMWvdi4gLSBEYWwgcMWvdi5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBjMV9uZXdcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE1MVwiLCAvL1JDIDMwMjUwMTUxIDogIE1EIG5vdsOpIC0gRGFsIG5vdsOpXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMTUxXCIsIC8vUkMgMzAyNTAxNTEgOiAgTUQgbm92w6kgLSBEYWwgbm92w6lcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBoaWRkZW46ICF0aGlzLmdsb2JhbHMuUmFkX1pvYnJhek1kRGFsLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBjMV9uZXdcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTUxXCIgfSkgLy9SQyAzMDI1MDE1MSA6ICBNRCBub3bDqSAtIERhbCBub3bDqVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwb3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDcxXCIsIC8vUkMgMzExMDAwNzEgOiBQb3BpcyDFmcOhZGt1XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nU2luZ2xlKHsgbW9kZWw6IFwicG9waXNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDcxXCIgfSkgLy9SQyAzMTEwMDA3MSA6IFBvcGlzIMWZw6Fka3VcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzVcIiwgLy9SQyAzMTEwMDA3NSA6IFBJRFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1MVwiLCAvL1JDIDMxMTAwMjUxIDogUHJ2b3Ruw60gaWRlbnRpZmlrw6F0b3IgcHJpbcOhcm7DrWhvIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5peHAoeyBtb2RlbDogXCJpeHBcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc1XCIgfSkgLy9SQyAzMTEwMDA3NSA6IFBJRFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZ2xvYmFscy5FeHRlcm5pU3VtYXJpemFjZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuVHlwVWxvaHkgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5QcmltYXJuaVBvemFkYXZreVphcGlzIHx8IHRoaXMuVHlwVWxvaHkgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5CYWxhbmNvdmFuaVphcGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX3JvelwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNTJcIiwgLy9SQyAzMDI1MDE1MiA6IFBJRCBST1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMTUyXCIsIC8vUkMgMzAyNTAxNTIgOiBQSUQgUk9cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaXhwKHsgbW9kZWw6IFwiaXhwX3JvelwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNTJcIiB9KSAvL1JDIDMwMjUwMTUyIDogUElEIFJPXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX3ByaW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTUzXCIsIC8vUkMgMzAyNTAxNTMgOiBQSUQgQkxLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTAxNTNcIiwgLy9SQyAzMDI1MDE1MyA6IFBJRCBCTEtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaXhwKHsgbW9kZWw6IFwiaXhwX3ByaW1cIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTUzXCIgfSkgLy9SQyAzMDI1MDE1MyA6IFBJRCBCTEtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpel9ibG9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNTU0XCIsIC8vUkMgMzAyNTA1NTQgOiBCbG9rLlxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKHJvdywgbWV0YSwgY2VsbEluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGE/Ll9pc1N1bW1hcnkpIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93LnByaXpfYmxvayA9PT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzAyNTA1NTdcIjsgLy9SQyAzMDI1MDU1NyA6IEFub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMwMjUwNTU1XCI7IC8vUkMgMzAyNTA1NTUgOiBOZVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnllc05vKHsgbW9kZWw6IFwicHJpel9ibG9rXCIsIGNhcHRpb246IFwianJlczozMDI1MDU1OFwiIH0pIC8vUkMgMzAyNTA1NTggOiBCbG9rb3bDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5pbnRlZ2VySW50ZXJ2YWwoeyBuYW1lOiBcInN0YXR1c1wiLCBtb2RlbDogXCJzdGF0dXNcIiB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfcHJpbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA3NlwiLCAgLy9SQyAzMTEwMDA3NiA6IFBJRCBwcmltw6FybsOtXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsICAgLy9OT1RFOiBWIFRLIGplIHNrcnl0ZVxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ1NpbmdsZSh7IG1vZGVsOiBcIml4cF9wcmltXCIsIGNhcHRpb246IFwianJlczozMTEwMDA3NlwiIH0pIC8vUkMgMzExMDAwNzYgOiBQSUQgcHJpbcOhcm7DrVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9nZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJuYXpldl9yZlwiLFxyXG4gICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwOTdcIiwgLy9SQyAzMTEwMDA5NyA6IFptxJtudSBwcm92ZWRsXHJcbiAgICAgICAgICAgIC8vICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgIC8vICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ1NpbmdsZSh7IG1vZGVsOiBcIm5hemV2X3JmXCIsIGNhcHRpb246IFwianJlczozMTEwMDA5N1wiIH0pIC8vUkMgMzExMDAwOTcgOiBabcSbbnUgcHJvdmVkbFxyXG4gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICBnZi5hZGREYXRlVGltZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDE1XCIsIC8vUkMgMzExMDAwMTUgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kYXRlSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RmllbGQ6IHsgdmFsdWVUeXBlOiBcImRhdGV0aW1lXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRGaWVsZDogeyB2YWx1ZVR5cGU6IFwiZGF0ZXRpbWVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDAxNVwiIC8vUkMgMzExMDAwMTUgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7IC8vTk9URTogViBUSyBqZSB0byBwcmlkYW5vIGpha28gQWRkTG9va3VwQ29sdW1uISAoYXJnLjogRGV0YWlsVHlwdUFnZW5keS56a3JfYWcpXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9hZ1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc5XCIsIC8vUkMgMzExMDAwNzkgOiBBZ2VuZGFcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IFwie3R5cF9hZ190eHQ6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICBncm91cGluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcInR5cF9hZ190eHRcIiksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuVWNyLldlYkNsaWVudC5GaWx0ZXJQcmVmYWJzLnR5cF9hZyh7IG1vZGVsOiBcInR5cF9hZ1wiLCB6a3JfYWdQYXRoOiBcInR5cF9hZ190eHRcIiwgaXNSb3pwb2NldDogdGhpcy5Sb3pwb2NldCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc5XCIgfSkgLy9SQyAzMTEwMDA3OSA6IEFnZW5kYVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBnZiBhcyBhbnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlUHJvZmlsZXMoZ2Y6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvIC8qJiBHU2V6bmFtWmFwaXN1U3RhdnVEdG8qLz4pOiBJR1Nlem5hbVphcGlzdVByb2ZpbGVzIHtcclxuICAgICAgICAgICAgbGV0IHByb2ZpbGVzOiBJR1Nlem5hbVphcGlzdVByb2ZpbGVzID0ge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogeyBuYW1lOiBcImpyZXM6MzExMDAyMzJcIiwgY29sdW1uczoge30gfSAvL1JDIDMxMTAwMjMyIDogVsO9Y2hvesOtXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdmLmNvbHVtbnMuZmlsdGVyKChjKSA9PiB7IHJldHVybiAhYy5oaWRkZW47IH0pXHJcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoYykgPT4geyBwcm9maWxlcy5kZWZhdWx0LmNvbHVtbnMhW2MubmFtZSFdID0geyBoaWRkZW46IGZhbHNlIH0gfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJvZmlsZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy50ZW1hID0gXCJ1Y3JfcHRtX2JhbFwiO1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rbGFkQkxLQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtZXh0ZXJuYWwtbGlua1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTU1XCIsIC8vUkMgMzAyNTAxNTUgOiBEb2tsYWQgQkxLXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuc2hvd1ByaW1Eb2tsYWQodW5kZWZpbmVkLCBcIkJMS1wiKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkb2tsYWRST0FjdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLWV4dGVybmFsLWxpbmtcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE1NlwiLCAvL1JDIDMwMjUwMTU2IDogRG9rbGFkIFJPXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuc2hvd1ByaW1Eb2tsYWQodW5kZWZpbmVkLCBcIlJPXCIpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwcmltZG9rbGFkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLWV4dGVybmFsLWxpbmtcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTU0XCIsIC8vUkMgMzAyNTAxNTQgOiBQcmltLiBkb2tsYWRcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93UHJpbURva2xhZCgpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRHcmlkQWN0aW9uID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5wcmltZG9rbGFkQWN0IGFzIEdBY3Rpb247XHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG59Il19