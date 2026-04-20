"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            class GSeznamEkoPrimPozadavky extends WebClient.GSeznamEkoZaznamuBase {
                constructor(content) {
                    super(content);
                    this.logOptions = { name: "GSeznamEkoPrimPozadavky", authorCode: 302, file: "GSeznamEkoPrimPozadavky.ts" };
                    this.pouzivanStrukPopis = false;
                    this.povolenNahled = false;
                    this.rememberHistory = true;
                    //this.Zapisova = false;
                    // definice tasku pro seznam a nacteni poctu
                    this.taskList = this.parentCnt.isl.UcrRozpoctovyZapis.list();
                    this.taskCount = this.parentCnt.isl.UcrRozpoctovyZapis.count();
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
                    //if (grid == null) return ;
                    if (this.parentCnt.closed)
                        return;
                    const row = grid.ggrid("activeRow", false);
                    //let enable = false;
                    //enable = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid) > 0;
                    let enable = pocetRadku > 0;
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
                        serverFilter: drdServerFilter //Gordic.Eko.Filters.drd(this.filterOptions.drd)
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
                        //gf.addTextColumn({
                        //    name: "ac",
                        //    caption: "jres:31100054", //RC 31100054 : Doklad
                        //    width: 70,
                        //    aggregate: Gordic.Data.Aggregates.first("ac"),
                        //    serverFilter: Gordic.Eko.Filters.acInterval(this.filterOptions.ac)
                        //});
                        //gf.addTextColumn({
                        //    name: "pdok",
                        //    caption: "jres:31100055", //RC 31100055 : Strukturovaný popis dokladu
                        //    hidden: true,           //NOTE: V TK maji skryto, byva videt pole 'popis', kde je stejny prefab
                        //    width: 200,
                        //    serverFilter: Gordic.Eko.Filters.stringSingle({ model: "pdok", caption: "jres:31100055" }) //RC 31100055 : Strukturovaný popis dokladu
                        //});
                    }
                    gf.addSortedEkoCfuSet(this.getCfuSetServerFilters(true));
                    //gf.addTextColumn({
                    //    name: "ixp",
                    //    caption: "jres:31100075", //RC 31100075 : PID
                    //    description: "jres:31100251", //RC 31100251 : Prvotní identifikátor primárního dokladu
                    //    width: 110,
                    //    serverFilter: Gordic.Eko.Filters.ixp({ model: "ixp", caption: "jres:31100075" }) //RC 31100075 : PID
                    //});
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
                    this.tema = "ucr_ptm_ppo";
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
                    //this.insAct = this.parentCnt.actions.add({
                    //    name: "insAct",
                    //    run: (ev, ctx) => {
                    //        this.getFilter(this.$filterPanel.gfilterpanel("getConfirmedData"))
                    //            .then(() => { this.doFilterClick(); });
                    //    }
                    //});
                    //this.clearAndFilterAct = this.parentCnt.actions.add({
                    //    name: "clearAndFilterAct",
                    //    run: (ev, ctx) => {
                    //        this.$filterPanel.gfilterpanel("clear");
                    //        this.getFilter(this.$filterPanel.gfilterpanel("getConfirmedData"))
                    //            .then(() => { this.doFilterClick(); });
                    //    }
                    //});
                    //this.filterPidAct = this.parentCnt.actions.add({
                    //    name: "filterPidAct",
                    //    enabled: false,
                    //    run: (ev, ctx) => {
                    //        var sel = this.$grid.ggrid<GSeznamZapisuStavuDto>("getSelection");
                    //        if (sel.length === 0)
                    //            return;
                    //        this.$grid
                    //            .ggridserverfilter("clear")
                    //            .ggridserverfilter("apply", { ixp: sel[0].ixp });
                    //        this.doFilterClick();
                    //    }
                    //});
                }
            }
            WebClient.GSeznamEkoPrimPozadavky = GSeznamEkoPrimPozadavky;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUVrb1ByaW1Qb3phZGF2a3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU2V6bmFtRWtvUHJpbVBvemFkYXZreS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBVSxNQUFNLENBaWtCZjtBQWprQkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBaWtCbkI7SUFqa0JnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0Fpa0I3QjtRQWprQm9CLFdBQUEsU0FBUztZQUUxQixNQUFhLHVCQUF3QixTQUFRLFVBQUEscUJBQXFCO2dCQVc5RCxZQUFZLE9BQXFDO29CQUM3QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRm5CLGVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSw0QkFBNEIsRUFBRSxDQUFDO29CQUdsRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO29CQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztvQkFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7b0JBQzVCLHdCQUF3QjtvQkFDeEIsNENBQTRDO29CQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO29CQUM3RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNuRSxDQUFDO2dCQUdEOzs7bUJBR0c7Z0JBQ08sYUFBYSxDQUFDLFFBQXFEO29CQUN6RSxJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO29CQUVuQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFdB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QztvQkFDSCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsYUFBd0IsQ0FBQztvQkFFekUsNENBQTRDO29CQUM1QyxxQkFBcUI7b0JBQ3JCLHlCQUF5QjtvQkFDekIsNEVBQTRFO29CQUM1RSxxREFBcUQ7b0JBQ3JELE9BQU87b0JBQ1AsS0FBSztvQkFFTCx1REFBdUQ7b0JBQ3ZELGdDQUFnQztvQkFDaEMseUJBQXlCO29CQUN6QixrREFBa0Q7b0JBQ2xELDRFQUE0RTtvQkFDNUUscURBQXFEO29CQUNyRCxPQUFPO29CQUNQLEtBQUs7b0JBSUwsa0RBQWtEO29CQUNsRCwyQkFBMkI7b0JBQzNCLHFCQUFxQjtvQkFDckIseUJBQXlCO29CQUN6Qiw0RUFBNEU7b0JBQzVFLCtCQUErQjtvQkFDL0IscUJBQXFCO29CQUVyQixvQkFBb0I7b0JBQ3BCLHlDQUF5QztvQkFDekMsK0RBQStEO29CQUMvRCwrQkFBK0I7b0JBQy9CLE9BQU87b0JBQ1AsS0FBSztnQkFJVCxDQUFDO2FBS0o7WUF6akJZLGlDQUF1QiwwQkF5akJuQyxDQUFBO1FBTUwsQ0FBQyxFQWprQm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQWlrQjdCO0lBQUQsQ0FBQyxFQWprQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQWlrQm5CO0FBQUQsQ0FBQyxFQWprQlMsTUFBTSxLQUFOLE1BQU0sUUFpa0JmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5VY3IuV2ViQ2xpZW50IHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgR1Nlem5hbUVrb1ByaW1Qb3phZGF2a3kgZXh0ZW5kcyBHU2V6bmFtRWtvWmF6bmFtdUJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG4gICAgICAgIC8qKiBHbG9iYWxuaSBtb2R1bG92ZSBwYXJhbWV0cnkgdiBKUyAqL1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgY2xlYXJBbmRGaWx0ZXJBY3Q6IEdBY3Rpb247XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qKiBMaW1pdCBwb2N0dSBuYWNpdGFueWNoIHphem5hbXUsIHBva3VkIG5lZG9qZGUgayBwb3R2cnplbmksIHplIHV6aXZhdGVsIGNoY2Ugaml0IHByZXMgbGltaXQgKi9cclxuICAgICAgICBzdW1MaW1pdDogbnVtYmVyO1xyXG4gICAgICAgIGxvZ09wdGlvbnMgPSB7IG5hbWU6IFwiR1Nlem5hbUVrb1ByaW1Qb3phZGF2a3lcIiwgYXV0aG9yQ29kZTogMzAyLCBmaWxlOiBcIkdTZXpuYW1Fa29QcmltUG96YWRhdmt5LnRzXCIgfTtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb250ZW50OiBHU2V6bmFtRWtvWmF6bmFtdUJhc2VDb250ZW50KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnBvdXppdmFuU3RydWtQb3BpcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnBvdm9sZW5OYWhsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5yZW1lbWJlckhpc3RvcnkgPSB0cnVlO1xyXG4gICAgICAgICAgICAvL3RoaXMuWmFwaXNvdmEgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gZGVmaW5pY2UgdGFza3UgcHJvIHNlem5hbSBhIG5hY3RlbmkgcG9jdHVcclxuICAgICAgICAgICAgdGhpcy50YXNrTGlzdCA9IHRoaXMucGFyZW50Q250LmlzbC5VY3JSb3pwb2N0b3Z5WmFwaXMubGlzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tDb3VudCA9IHRoaXMucGFyZW50Q250LmlzbC5VY3JSb3pwb2N0b3Z5WmFwaXMuY291bnQoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBtZW51XHJcbiAgICAgICAgICogQHBhcmFtIHR5cFVsb2h5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJvdGVjdGVkIERlZmluZU1lbnVCYXIodHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUpOiBNZW51UGFyYW1zW10ge1xyXG4gICAgICAgICAgICBsZXQgbWVudSA9IG5ldyBBcnJheTxNZW51UGFyYW1zPigpO1xyXG5cclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmRva2xhZFJPQWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmRva2xhZEJMS0FjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5wcmltZG9rbGFkQWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5wcmV2RmlsdGVyQWN0LCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9KTtcclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLm5leHRGaWx0ZXJBY3QsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0pO1xyXG4gICAgICAgICAgICAvL21lbnUucHVzaCh7IGFjdGlvbjogdGhpcy56YXBpc3lBY3QsIGZhdm9yaXRlOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcmludEFjdClcclxuICAgICAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wcmludEFjdCwgZmF2b3JpdGU6IHRydWUgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgbWVudS5wdXNoKHsgYWN0aW9uOiB0aGlzLmNsZWFyRmlsdGVyUm93QWN0IH0pO1xyXG4gICAgICAgICAgICBtZW51LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJzdGF0aWNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDI2OFwiLCAvL1JDIDMxMTAwMjY4IDogUnljaGzDqSBha2NlXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmluc0FjdCwgaWNvbjogXCJnaS1yZWZyZXNoXCIsIGNhcHRpb246IFwianJlczozMTEwMDIyNlwiIH0sIC8vUkMgMzExMDAyMjYgOiBOYcSNdGVuw60gZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuY2xlYXJBbmRGaWx0ZXJBY3QsIGNhcHRpb246IFwianJlczozMTEwMDIyOFwiIH0sIC8vUkMgMzExMDAyMjggOiBWecSNaXN0aXQgYSBuYcSNw61zdFxyXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnNlcnZlcm92eUZpbHRlck5hZEdyaWRlbSA/IHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmNvcHlGaWx0ZXJBY3QsIGNhcHRpb246IFwianJlczozMDI1MDY0MlwiIH0gLy9SQyAzMDI1MDY0MiA6IEtvcMOtcm92YXQgcG9kbcOtbmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuZW1wdHlBY3QgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuc2VydmVyb3Z5RmlsdGVyTmFkR3JpZGVtID8geyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMucGFzdGVGaWx0ZXJBY3QsIGNhcHRpb246IFwianJlczozMDI1MDY0NFwiIH0gLy9SQyAzMDI1MDY0NCA6IFZsb8W+aXQgcG9kbcOtbmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuZW1wdHlBY3QgfSksIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtZW51O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFptZW5hIGZvY3VzdSByYWRrdVxyXG4gICAgICAgICogXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY2hhbmdlU2VsZWN0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBOdXRubyBkb2RlbGF0XHJcbiAgICAgICAgICAgIC8vdGhpcy5uYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIG5hc3RhdmVuaUFrY2koZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PiwgcG9jZXRSYWRrdTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHN1cGVyLm5hc3RhdmVuaUFrY2koZ3JpZCwgcG9jZXRSYWRrdSk7XHJcbiAgICAgICAgICAgIC8vIHBva3VkIG5lbmkgZ3JpZCwgbmljIG5lZGVsZWpcclxuICAgICAgICAgICAgLy9sZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAvL2lmIChncmlkID09IG51bGwpIHJldHVybiA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudENudC5jbG9zZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGdyaWQuZ2dyaWQ8VWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8+KFwiYWN0aXZlUm93XCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgLy9sZXQgZW5hYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vZW5hYmxlID0gR29yZGljLkVrby5XZWJDbGllbnQuQ29tbW9uLkNlbGtvdnlQb2NldFJhZGt1KGdyaWQpID4gMDtcclxuICAgICAgICAgICAgbGV0IGVuYWJsZSA9IHBvY2V0UmFka3UgPiAwO1xyXG4gICAgICAgICAgICBsZXQgdmlzaWJsZUJMSyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgdmlzaWJsZVJPID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChlbmFibGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygcm93ICE9PSBcInVuZGVmaW5lZFwiICYmIHJvdyAhPSBudWxsICYmIHJvdy5peHBfcHJpbSAmJiByb3cuaXhwX3ByaW0udHJpbSgpICE9IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZUJMSyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiByb3cgIT0gbnVsbCAmJiByb3cuaXhwX3JveiAmJiByb3cuaXhwX3Jvei50cmltKCkgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlUk8gPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBwcmlzdHVwbm9zdCBha2NpIGRsZSBuYWN0ZW55Y2ggZGF0XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLnByaW1kb2tsYWRBY3QhLmVuYWJsZWQoZW5hYmxlKTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5kb2tsYWRCTEtBY3QhLnVwZGF0ZSh7IGVuYWJsZWQ6IGVuYWJsZSwgdmlzaWJsZTogdmlzaWJsZUJMSyB9KTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5kb2tsYWRST0FjdCEudXBkYXRlKHsgZW5hYmxlZDogZW5hYmxlLCB2aXNpYmxlOiB2aXNpYmxlUk8gfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuZG90QWN0IS5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXI/LmVuYWJsZShlbmFibGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGtsYXZlc292eWNoIHprcmF0ZWtcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBjcmVhdGVTaG9ydEN1dCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlU2hvcnRDdXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvIC8qJiBHU2V6bmFtWmFwaXN1U3RhdnVEdG8qLz4ge1xyXG4gICAgICAgICAgICB2YXIgZ2YgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0U2V6bmFtWmFwaXN1U3RhdnVEdG8+KCk7XHJcbiAgICAgICAgICAgIC8vdmFyIHRvcG9Hcm91cCA9IFwidG9wb1wiO1xyXG5cclxuICAgICAgICAgICAgZ2YuYWRkU3RydWN0dXJlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rbGFkeVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjMxXCIsIC8vUkMgMzExMDAyMzEgOiBEb2tsYWR5XHJcbiAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXBpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcHJlc2V0Q2FwdGlvbjogXCJqcmVzOjMxMTAwMjMxXCIsIC8vUkMgMzExMDAyMzEgOiBEb2tsYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNoOiAobWV0YSwgcm93cykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkID0gbWV0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtkLmFjfXwke2QubWVzaWN9fCR7ZC5yb2t9fCR7ZC5saWN9fCR7ZC5pY299fCR7ZC51Y3N9YDsgLy9OT1RFOiBQcmlkYXQgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwiYWNcIiksIHUgdnNlY2ggdGVjaHRvIHNsb3VwY3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0OiBcInJvayxsaWMsaWNvLHVjcyxtZXNpYyxhY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUNvbHVtbjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdsb2JhbHMuUmV6aW1Qcm92b3p1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1Lk5LUzogYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LlVDUzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLm5rc0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy5ua3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuSUNPOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwidWNzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudWNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudWNzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5pY28sIGFrdFByb2hsOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmFrdFByb2hsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuY2FwdGlvbiwgbmFtZTogXCJ1Y3NcIiwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJ1Y3NcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKSAmJiAhIXRoaXMuRmlsdGVyLnVjc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Bdm9pZFV1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnV1c0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy51dXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuaWNvLCB1Y3M6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMudWNzLCBha3RQcm9obDogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5ha3RQcm9obFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG9ubHlBY3RpdmU6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMub25seUFjdGl2ZSwgY2FwdGlvbjogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5jYXB0aW9uLCBuYW1lOiBcInV1c1wiLCBmaXJzdEZpZWxkOiB1bmRlZmluZWQsIHNlY29uZEZpZWxkOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJ1dXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiAhISh0aGlzLlJhZGVrX0RQSCkgJiYgISF0aGlzLkZpbHRlci51Y3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuQXZvaWROa3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMubmtzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLm5rcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuU09SOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuSWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuSWNvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJpY29cIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IHRoaXMuRXh0ZXJuaVN1bWFyaXphY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IEdvcmRpYy5Fa28uRmlsdGVycy5yYXJJbnRlcnZhbCh7IG1vZGVsOiBcImljb1wiLCBvbmx5QWN0aXZlOiBmYWxzZSwgY2FwdGlvbjogdGhpcy56a3JhdGt5LkljbywgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogR29yZGljLkVrby5GaWx0ZXJzLmljb0ludGVydmFsKHsgbW9kZWw6IFwiaWNvXCIsIG9ubHlBY3RpdmU6IGZhbHNlLCBjYXB0aW9uOiB0aGlzLnprcmF0a3kuSWNvLCBkaXNhYmxlZDogISEodGhpcy5SYWRla19EUEgpIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuQXZvaWRFeHQgfHwgdGhpcy5nbG9iYWxzLlR5cFN1bWFyaXphY2UgIT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JUeXBTdW1hcml6YWNlLkV4dGVybmkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJ1Y3NcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudWNzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmljbywgYWt0UHJvaGw6IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuYWt0UHJvaGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuY2FwdGlvbiwgbmFtZTogXCJ1Y3NcIiwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwidWNzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkaXNhYmxlZDogISEodGhpcy5SYWRla19EUEgpICYmICEhdGhpcy5GaWx0ZXIudWNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Bdm9pZFV1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1dXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuVXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51dXNJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudXVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51dXNJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuaWNvLCB1Y3M6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMudWNzLCBha3RQcm9obDogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5ha3RQcm9obFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuY2FwdGlvbiwgbmFtZTogXCJ1dXNcIiwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcInV1c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiAhISh0aGlzLlJhZGVrX0RQSCkgJiYgISF0aGlzLkZpbHRlci51Y3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuQXZvaWROa3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibmtzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLm5rc0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy5ua3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGRyZFNlcnZlckZpbHRlciA9IEdvcmRpYy5Fa28uRmlsdGVycy5kcmQodGhpcy5maWx0ZXJPcHRpb25zLmRyZCk7XHJcbiAgICAgICAgICAgIC8vIHBybyBiYWxhbmNvdmFuaSBuZW5pIHphZG55IGZpbHRlclxyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBkcmRTZXJ2ZXJGaWx0ZXIgPSBHb3JkaWMuRWtvLkZpbHRlcnMuZHJkKHRoaXMuZmlsdGVyT3B0aW9ucy5kcmQpO1xyXG5cclxuICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZHJkXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTIgXCIsIC8vUkMgMzExMDAwNTIgOiBIXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMTAyXCIsIC8vUkMgMzExMDAxMDIgOiBEcnVoIGRva2xhZHUgKERSRClcclxuICAgICAgICAgICAgICAgIC8vdG9vbHRpcFRlbXBsYXRlOiBcImpyZXM6MzExMDAxMDJcIiwgLy9SQyAzMTEwMDEwMiA6IERydWggZG9rbGFkdSAoRFJEKVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBkcmRTZXJ2ZXJGaWx0ZXIvL0dvcmRpYy5Fa28uRmlsdGVycy5kcmQodGhpcy5maWx0ZXJPcHRpb25zLmRyZClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTAwIFwiLCAvL1JDIDMwMjUwMTAwIDogUm9rXHJcbiAgICAgICAgICAgICAgICAvL2Rlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAwMTFcIiwgLy9SQyAzMTEwMDAxMSA6IE3Em3PDrWNcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA0MCxcclxuICAgICAgICAgICAgICAgIC8vYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwibWVzaWNcIiksXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcInJva1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTAxMDBcIiwgZGlzYWJsZWQ6ICEhKHRoaXMuRmlsdGVyICYmIHRoaXMuU3RyaWN0RmlsdGVyICYmIHRoaXMuRmlsdGVyLnJvaykgfSkgLy9SQyAzMDI1MDEwMCA6IFJva1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwibWVzaWNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1MSBcIiwgLy9SQyAzMTEwMDA1MSA6IE1cclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAwMTFcIiwgLy9SQyAzMTEwMDAxMSA6IE3Em3PDrWNcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMCxcclxuICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcIm1lc2ljXCIpLFxyXG4gICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcIm1lc2ljXCIsIGNhcHRpb246IFwianJlczozMTEwMDA1MVwiLCBkaXNhYmxlZDogISEodGhpcy5GaWx0ZXIgJiYgdGhpcy5TdHJpY3RGaWx0ZXIgJiYgdGhpcy5GaWx0ZXIubWVzaWMpIH0pIC8vUkMgMzExMDAwNTEgOiBNXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibWVzaWNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDUxXCIsIC8vUkMgMzExMDAwNTEgOiBNXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICEhKHRoaXMuRmlsdGVyICYmIHRoaXMuU3RyaWN0RmlsdGVyICYmIHRoaXMuRmlsdGVyLm1lc2ljKSxcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDEsIG1heDogMTMgfSldIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRmllbGQ6IHsgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SYW5nZSh7IG1pbjogMSwgbWF4OiAxMyB9KV0gfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5aYXBpc292YSkge1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1MyBcIiwgLy9SQyAzMTEwMDA1MyA6IERcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMTMwXCIsIC8vUkMgMzExMDAxMzAgOiBEZW5cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7IG1vZGVsOiBcImRlblwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTNcIiwgZGlzYWJsZWQ6ICEhKHRoaXMuRmlsdGVyICYmIHRoaXMuU3RyaWN0RmlsdGVyICYmIHRoaXMuRmlsdGVyLmRlbikgfSkgLy9SQyAzMTEwMDA1MyA6IERcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImRlblwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTNcIiwgLy9SQyAzMTEwMDA1MyA6IERcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICEhKHRoaXMuRmlsdGVyICYmIHRoaXMuU3RyaWN0RmlsdGVyICYmIHRoaXMuRmlsdGVyLmRlbiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RmllbGQ6IHsgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SYW5nZSh7IG1pbjogMSwgbWF4OiAzMSB9KV0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kRmllbGQ6IHsgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SYW5nZSh7IG1pbjogMSwgbWF4OiAzMSB9KV0gfSxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImxpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTElDXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgIGhpZGRlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJsaWNcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8vL3NlcnZlckZpbHRlcjogLy9UT0RPXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy9nZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiYWNcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwianJlczozMTEwMDA1NFwiLCAvL1JDIDMxMTAwMDU0IDogRG9rbGFkXHJcbiAgICAgICAgICAgICAgICAvLyAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJhY1wiKSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmFjSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLmFjKVxyXG4gICAgICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2dmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCJwZG9rXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTVcIiwgLy9SQyAzMTEwMDA1NSA6IFN0cnVrdHVyb3ZhbsO9IHBvcGlzIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIC8vICAgIGhpZGRlbjogdHJ1ZSwgICAgICAgICAgIC8vTk9URTogViBUSyBtYWppIHNrcnl0bywgYnl2YSB2aWRldCBwb2xlICdwb3BpcycsIGtkZSBqZSBzdGVqbnkgcHJlZmFiXHJcbiAgICAgICAgICAgICAgICAvLyAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nU2luZ2xlKHsgbW9kZWw6IFwicGRva1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTVcIiB9KSAvL1JDIDMxMTAwMDU1IDogU3RydWt0dXJvdmFuw70gcG9waXMgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFNvcnRlZEVrb0NmdVNldCh0aGlzLmdldENmdVNldFNlcnZlckZpbHRlcnModHJ1ZSkpO1xyXG5cclxuICAgXHJcblxyXG5cclxuICAgICAgICAgICAgLy9nZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJpeHBcIixcclxuICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc1XCIsIC8vUkMgMzExMDAwNzUgOiBQSURcclxuICAgICAgICAgICAgLy8gICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1MVwiLCAvL1JDIDMxMTAwMjUxIDogUHJ2b3Ruw60gaWRlbnRpZmlrw6F0b3IgcHJpbcOhcm7DrWhvIGRva2xhZHVcclxuICAgICAgICAgICAgLy8gICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgLy8gICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaXhwKHsgbW9kZWw6IFwiaXhwXCIsIGNhcHRpb246IFwianJlczozMTEwMDA3NVwiIH0pIC8vUkMgMzExMDAwNzUgOiBQSURcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1NlwiLCAvL1JDIDMxMTAwMDU2IDogTURcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNDNcIiwgLy9SQyAzMTEwMDI0MyA6IE3DoSBEw6F0aVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwXCIsIGNhcHRpb246IFwianJlczozMTEwMDA1NlwiIH0pIC8vUkMgMzExMDAwNTYgOiBNRFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU3XCIsIC8vUkMgMzExMDAwNTcgOiBEYWxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMVwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTdcIiB9KSAvL1JDIDMxMTAwMDU3IDogRGFsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImMwYzFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA5MFwiLCAvL1JDIDMxMTAwMDkwIDogTUQtRGFsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjQ0XCIsIC8vUkMgMzExMDAyNDQgOiBNw6EgRMOhdGkgLSBEYWxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBoaWRkZW46ICF0aGlzLmdsb2JhbHMuUmFkX1pvYnJhek1kRGFsLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBjMVwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwOTBcIiB9KSAvL1JDIDMxMTAwMDkwIDogTUQtRGFsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicG9waXNcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA3MVwiLCAvL1JDIDMxMTAwMDcxIDogUG9waXMgxZnDoWRrdVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ1NpbmdsZSh7IG1vZGVsOiBcInBvcGlzXCIsIGNhcHRpb246IFwianJlczozMTEwMDA3MVwiIH0pIC8vUkMgMzExMDAwNzEgOiBQb3BpcyDFmcOhZGt1XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc1XCIsIC8vUkMgMzExMDAwNzUgOiBQSURcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNTFcIiwgLy9SQyAzMTEwMDI1MSA6IFBydm90bsOtIGlkZW50aWZpa8OhdG9yIHByaW3DoXJuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaXhwKHsgbW9kZWw6IFwiaXhwXCIsIGNhcHRpb246IFwianJlczozMTEwMDA3NVwiIH0pIC8vUkMgMzExMDAwNzUgOiBQSURcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmdsb2JhbHMuRXh0ZXJuaVN1bWFyaXphY2UpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUHJpbWFybmlQb3phZGF2a3laYXBpcyB8fCB0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQmFsYW5jb3ZhbmlaYXBpcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9yb3pcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTUyXCIsIC8vUkMgMzAyNTAxNTIgOiBQSUQgUk9cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDE1MlwiLCAvL1JDIDMwMjUwMTUyIDogUElEIFJPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLml4cCh7IG1vZGVsOiBcIml4cF9yb3pcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTUyXCIgfSkgLy9SQyAzMDI1MDE1MiA6IFBJRCBST1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9wcmltXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE1M1wiLCAvL1JDIDMwMjUwMTUzIDogUElEIEJMS1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMTUzXCIsIC8vUkMgMzAyNTAxNTMgOiBQSUQgQkxLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLml4cCh7IG1vZGVsOiBcIml4cF9wcmltXCIsIGNhcHRpb246IFwianJlczozMDI1MDE1M1wiIH0pIC8vUkMgMzAyNTAxNTMgOiBQSUQgQkxLXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaXpfYmxva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDU1NFwiLCAvL1JDIDMwMjUwNTU0IDogQmxvay5cclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IGZ1bmN0aW9uIChyb3csIG1ldGEsIGNlbGxJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRhPy5faXNTdW1tYXJ5KSByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdy5wcml6X2Jsb2sgPT09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMwMjUwNTU3XCI7IC8vUkMgMzAyNTA1NTcgOiBBbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMDI1MDU1NVwiOyAvL1JDIDMwMjUwNTU1IDogTmVcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy55ZXNObyh7IG1vZGVsOiBcInByaXpfYmxva1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA1NThcIiB9KSAvL1JDIDMwMjUwNTU4IDogQmxva292w6Fub1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHsgbmFtZTogXCJzdGF0dXNcIiwgbW9kZWw6IFwic3RhdHVzXCIgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX3ByaW1cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzZcIiwgIC8vUkMgMzExMDAwNzYgOiBQSUQgcHJpbcOhcm7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLCAgIC8vTk9URTogViBUSyBqZSBza3J5dGVcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdTaW5nbGUoeyBtb2RlbDogXCJpeHBfcHJpbVwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzZcIiB9KSAvL1JDIDMxMTAwMDc2IDogUElEIHByaW3DoXJuw61cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwibmF6ZXZfcmZcIixcclxuICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDk3XCIsIC8vUkMgMzExMDAwOTcgOiBabcSbbnUgcHJvdmVkbFxyXG4gICAgICAgICAgICAvLyAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAvLyAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdTaW5nbGUoeyBtb2RlbDogXCJuYXpldl9yZlwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwOTdcIiB9KSAvL1JDIDMxMTAwMDk3IDogWm3Em251IHByb3ZlZGxcclxuICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgZ2YuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDAxNVwiLCAvL1JDIDMxMTAwMDE1IDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTMwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGF0ZUludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IHZhbHVlVHlwZTogXCJkYXRldGltZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRmllbGQ6IHsgdmFsdWVUeXBlOiBcImRhdGV0aW1lXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwMTVcIiAvL1JDIDMxMTAwMDE1IDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oeyAvL05PVEU6IFYgVEsgamUgdG8gcHJpZGFubyBqYWtvIEFkZExvb2t1cENvbHVtbiEgKGFyZy46IERldGFpbFR5cHVBZ2VuZHkuemtyX2FnKVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfYWdcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA3OVwiLCAvL1JDIDMxMTAwMDc5IDogQWdlbmRhXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiBcInt0eXBfYWdfdHh0OnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXBpbmc6IHtcclxuICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJ0eXBfYWdfdHh0XCIpLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLlVjci5XZWJDbGllbnQuRmlsdGVyUHJlZmFicy50eXBfYWcoeyBtb2RlbDogXCJ0eXBfYWdcIiwgemtyX2FnUGF0aDogXCJ0eXBfYWdfdHh0XCIsIGlzUm96cG9jZXQ6IHRoaXMuUm96cG9jZXQsIGNhcHRpb246IFwianJlczozMTEwMDA3OVwiIH0pIC8vUkMgMzExMDAwNzkgOiBBZ2VuZGFcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLlByaXpJaXNzcCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlpc3NwRGlzYWJsZSA9IHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuSUlTU1BfUHJldWN0b3Zhbmlfc3Rhdnk7XHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkX2hkcl9yaXNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwODJcIiwgLy9SQyAzMTEwMDA4MiA6IElEIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1NVwiLCAvL1JDIDMxMTAwMjU1IDogSWRlbnRpZmlrw6F0b3IgcmV6ZXJ2YWNlIHJvenBvxI10b3bDvWNoIHByb3N0xZllZGvFryBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaWRfaGRyX3Jpc1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwODJcIiwgZGlzYWJsZWQ6IGlpc3NwRGlzYWJsZSwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDkgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA5IH0gfSkgLy9SQyAzMTEwMDA4MiA6IElEIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgLy9tYXhMZW5ndGg6IDlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJhZGVrX2hkclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA4M1wiLC8vUkMgMzExMDAwODMgOiDFmcOhZGVrIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1NlwiLCAvL1JDIDMxMTAwMjU2IDogxZjDoWRlayByZXplcnZhY2Ugcm96cG/EjXRvdsO9Y2ggcHJvc3TFmWVka8WvIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7IG1vZGVsOiBcInJhZGVrX2hkclwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwODNcIiwgZGlzYWJsZWQ6IGlpc3NwRGlzYWJsZSB9KSAvL1JDIDMxMTAwMDgzIDogxZnDoWRlayBJSVNTUFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkSWNvbkNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzX3ByZXBfYWlzcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM0NFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9SQyAzMDI1MDM0NCA6IElJU1NQIFDFmWVwb8SNdGVub1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzOSwvLyBmaXhlZFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcImNlbnRlclwiLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnNfcHJlcF9haXNwICE9IG51bGwgJiYgZGF0YS5zX3ByZXBfYWlzcCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiLCB0ZXh0OiBcImpyZXM6MzAyNTAzNDRcIiwgLy9SQyAzMDI1MDM0NCA6IElJU1NQIFDFmWVwb8SNdGVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9vbHRpcDogXCJqcmVzOjMwMjUwMjg4XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmlkX2hkcl9yaXMgIT0gbnVsbCAmJiBkYXRhLmlkX2hkcl9yaXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWV4Y2xhbSBnLXN0YXRlLWVycm9yXCIsIHRleHQ6IFwianJlczozMDI1MDM0NVwiLCAvL1JDIDMwMjUwMzQ1IDogTmV6cHJhY292w6Fub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdG9vbHRpcDogXCJqcmVzOjMwMjUwMjg5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBnZiBhcyBhbnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlUHJvZmlsZXMoZ2Y6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvIC8qJiBHU2V6bmFtWmFwaXN1U3RhdnVEdG8qLz4pOiBJR1Nlem5hbVphcGlzdVByb2ZpbGVzIHtcclxuICAgICAgICAgICAgbGV0IHByb2ZpbGVzOiBJR1Nlem5hbVphcGlzdVByb2ZpbGVzID0ge1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogeyBuYW1lOiBcImpyZXM6MzExMDAyMzJcIiwgY29sdW1uczoge30gfSAvL1JDIDMxMTAwMjMyIDogVsO9Y2hvesOtXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdmLmNvbHVtbnMuZmlsdGVyKChjKSA9PiB7IHJldHVybiAhYy5oaWRkZW47IH0pXHJcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoYykgPT4geyBwcm9maWxlcy5kZWZhdWx0LmNvbHVtbnMhW2MubmFtZSFdID0geyBoaWRkZW46IGZhbHNlIH0gfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJvZmlsZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlQWN0aW9ucygpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy50ZW1hID0gXCJ1Y3JfcHRtX3Bwb1wiO1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rbGFkQkxLQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtZXh0ZXJuYWwtbGlua1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTU1XCIsIC8vUkMgMzAyNTAxNTUgOiBEb2tsYWQgQkxLXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuc2hvd1ByaW1Eb2tsYWQodW5kZWZpbmVkLCBcIkJMS1wiKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkb2tsYWRST0FjdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImZhLWV4dGVybmFsLWxpbmtcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE1NlwiLCAvL1JDIDMwMjUwMTU2IDogRG9rbGFkIFJPXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuc2hvd1ByaW1Eb2tsYWQodW5kZWZpbmVkLCBcIlJPXCIpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInByaW1kb2tsYWRBY3RcIixcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtZXh0ZXJuYWwtbGlua1wiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNTRcIiwgLy9SQyAzMDI1MDE1NCA6IFByaW0uIGRva2xhZFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLnNob3dQcmltRG9rbGFkKCk7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEdyaWRBY3Rpb24gPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLnByaW1kb2tsYWRBY3QgYXMgR0FjdGlvbjtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5pbnNBY3QgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiaW5zQWN0XCIsXHJcbiAgICAgICAgICAgIC8vICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuZ2V0RmlsdGVyKHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldENvbmZpcm1lZERhdGFcIikpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLnRoZW4oKCkgPT4geyB0aGlzLmRvRmlsdGVyQ2xpY2soKTsgfSk7XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5jbGVhckFuZEZpbHRlckFjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJjbGVhckFuZEZpbHRlckFjdFwiLFxyXG4gICAgICAgICAgICAvLyAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJjbGVhclwiKTtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuZ2V0RmlsdGVyKHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImdldENvbmZpcm1lZERhdGFcIikpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLnRoZW4oKCkgPT4geyB0aGlzLmRvRmlsdGVyQ2xpY2soKTsgfSk7XHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy99KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgLy90aGlzLmZpbHRlclBpZEFjdCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJmaWx0ZXJQaWRBY3RcIixcclxuICAgICAgICAgICAgLy8gICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIC8vICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHZhciBzZWwgPSB0aGlzLiRncmlkLmdncmlkPEdTZXpuYW1aYXBpc3VTdGF2dUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAoc2VsLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgdGhpcy4kZ3JpZFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIC5nZ3JpZHNlcnZlcmZpbHRlcihcImNsZWFyXCIpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLmdncmlkc2VydmVyZmlsdGVyKFwiYXBwbHlcIiwgeyBpeHA6IHNlbFswXS5peHAgfSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGlzLmRvRmlsdGVyQ2xpY2soKTtcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxufSJdfQ==