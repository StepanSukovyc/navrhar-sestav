"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            class GSeznamEkoRozZapis extends WebClient.GSeznamEkoZaznamuBase {
                constructor(content) {
                    super(content);
                    this.logOptions = { name: "GSeznamEkoRozZapis", authorCode: 302, file: "GSeznamEkoRozZapis.ts" };
                    this.pouzivanStrukPopis = false;
                    this.povolenNahled = true;
                    // definice tasku pro seznam a nacteni poctu
                    this.taskList = this.parentCnt.isl.UcrRozpoctovyZapis.list();
                    this.taskCount = this.parentCnt.isl.UcrRozpoctovyZapis.count();
                    // moznost ukladani historie filtru
                    this.rememberHistory = true;
                    this.useTextyZRozvrhu = true;
                    this.myKeys = "rok,lic,ico,ucs,mesic,ac,radek_z";
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                nastaveniAkci(grid, pocetRadku) {
                    super.nastaveniAkci(grid, pocetRadku);
                    let that = this.parentCnt;
                    this.parentCnt.log.debug("Konec nastaveniAkci GSeznamEkoRozZapis");
                    let showPopisStruktNew = that.userSettings?.get("strukturovanyPopisDokladuAutoAddGridColumns") ?? false;
                    let enable = false;
                    if (pocetRadku > 0) {
                        let row = this.getCurrentRow(grid);
                        enable = typeof row?.ixp_sml !== "undefined" && row?.ixp_sml !== null;
                    }
                    // pristupnost akci zobrazeni smlouvy
                    this.parentCnt.actions.smlDetailAct?.enabled(enable);
                    if (showPopisStruktNew) {
                        this.showPopisStrukt = showPopisStruktNew;
                        //this.manuallyStartedStruktPopis = false;
                        //that.actions.zobrazitStukzobrazitStuktPopisActtPopisPolAct?.checked(false);
                    }
                    this.parentCnt.actions.zobrazitStuktPopisAct?.visible(!showPopisStruktNew);
                    let checked = this.parentCnt.actions.zobrazitStuktPopisAct?.checked();
                    checked = (typeof checked == "undefined" ? false : checked);
                    that.actions.zobrazitStuktPopisAct?.update({ icon: (checked ? "gi-check" : "gi-uncheck") });
                    this.parentCnt.log.debug("Konec nastaveniAkci GSeznamEkoRozZapis");
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
                    //    key: "DELETE",
                    //    description: "jres:31100181", //RC 31100181 : Vyčistit
                    //    canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                    //    group: Gordic.Shortcuts.Groups.Task,
                    //    action: this.clearFilterRowAct
                    //});
                    //this.parentCnt.element.gshortcut({
                    //    key: "1",
                    //    description: "jres:31100218", //RC 31100218 : Předchozí filtr
                    //    canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                    //    group: Gordic.Shortcuts.Groups.Task,
                    //    action: this.parentCnt.actions.prevFilterAct
                    //});
                    this.parentCnt.element.gshortcut({
                        key: "0",
                        description: "jres:31100228", //RC 31100228 : Vyčistit a načíst
                        canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        group: Gordic.Shortcuts.Groups.Task,
                        action: this.parentCnt.actions.clearAndFilterAct
                    });
                    let grid = this.getGrid();
                    if (grid !== null) {
                        //grid.gshortcut({
                        //    key: "ctrl+shift+lclick",
                        //    group: Gordic.Shortcuts.Groups.Grid,
                        //    description: "jres:31100229", //RC 31100229 : Přenesení hodnoty do filtru.
                        //    action: this.selFilterAct
                        //});
                        //grid.gshortcut({
                        //    key: "ctrl+lclick",
                        //    group: Gordic.Shortcuts.Groups.Grid,
                        //    description: "jres:31100235", //RC 31100235 : Přenesení hodnoty do filtru a vyhledání.
                        //    action: this.selFilterAndSearchAct
                        //});
                        //grid.gshortcut({
                        //    key: [".", ","],
                        //    //NOTE: Description opsano z napovedy k TK UCR
                        //    description: "jres:31100227", //RC 31100227 : Zobrazení všech zápisů dokladů (celý doklad) nad označeným zápisem.
                        //    canExecute: (ev) => { return ev.target.tagName !== "INPUT"; },
                        //    group: Gordic.Shortcuts.Groups.Grid,
                        //    action: this.dotAct
                        //});
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
                    //var drdServerFilter = Gordic.Eko.Filters.drd(this.filterOptions.drd);
                    //// pro balancovani neni zadny filter
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
                            name: "ac",
                            caption: "jres:31100054", //RC 31100054 : Doklad
                            width: 70,
                            aggregate: Gordic.Data.Aggregates.first("ac"),
                            serverFilter: Gordic.Eko.Filters.acInterval(this.filterOptions.ac)
                        });
                        if (this.showPopisStrukt)
                            gf.addTextColumn({
                                name: "pdok",
                                caption: "jres:31100055", //RC 31100055 : Strukturovaný popis dokladu
                                //hidden: !(this.parentCnt.userSettings?.get("strukturovanyPopisDokladuAutoAddGridColumns") as boolean ?? false),            //NOTE: V TK maji skryto, byva videt pole 'popis', kde je stejny prefab
                                width: 200,
                                serverFilter: Gordic.Eko.Filters.stringSingle({ model: "pdok", caption: "jres:31100055" }) //RC 31100055 : Strukturovaný popis dokladu
                            });
                    }
                    gf.addSortedEkoCfuSet(this.getCfuSetServerFilters(true));
                    gf.addTextColumn({
                        name: "popis",
                        caption: "jres:31100071", //RC 31100071 : Popis řádku
                        width: 200,
                        serverFilter: Gordic.Eko.Filters.stringSingle({ model: "popis", caption: "jres:31100071" }) //RC 31100071 : Popis řádku
                    });
                    gf.addPid({
                        name: "ixp",
                        //caption: "jres:31100075", //RC 31100075 : PID
                        //description: "jres:31100251", //RC 31100251 : Prvotní identifikátor primárního dokladu
                        width: 110,
                        serverFilter: Gordic.Eko.Filters.ixp({ model: "ixp", caption: "jres:30250663" }) //RC 30250663 : Identifikátor
                    });
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
                            printable: "#render",
                            grouping: {
                                aggregate: Gordic.Data.Aggregates.first("ixs_typ_txt"),
                            },
                            //serverFilter: Gordic.Ucr.WebClient.FilterPrefabs.typ_ag({ model: "typ_ag", zkr_agPath: "typ_ag_txt", isRozpocet: this.Rozpocet, caption: "jres:31100079" }) //RC 31100079 : Agenda
                            serverFilter: Gordic.Eko.Filters.sslTypInterval({ model: "ixs_typ=ixs_typ;ixs_typ_txt=nazev", caption: "jres:30250281" }) //RC 30250281 : Typ dokladu                    
                            //serverFilter: Gordic.Eko.Filters.sslTypInterval({ model: "ixs_typ", zkr_agPath: "ixs_typ_txt",caption: "jres:30250281" }) //RC 30250281 : Typ dokladu
                        });
                    }
                    gf.addTextColumn({
                        name: "nazev_rf",
                        caption: "jres:31100097", //RC 31100097 : Změnu provedl
                        width: 200,
                        serverFilter: Gordic.Eko.Filters.stringSingle({ model: "nazev_rf", caption: "jres:31100097" }) //RC 31100097 : Změnu provedl
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
                    gf.addTextColumn({
                        name: "typ_ag",
                        caption: "jres:31100079", //RC 31100079 : Agenda
                        width: 70,
                        cellTemplate: "{typ_ag_txt:trim:encode}",
                        grouping: {
                            aggregate: Gordic.Data.Aggregates.first("typ_ag_txt"),
                        },
                        printable: "#render",
                        serverFilter: Gordic.Ucr.WebClient.FilterPrefabs.typ_ag({ model: "typ_ag", zkr_agPath: "typ_ag_txt", isRozpocet: true, caption: "jres:31100079" }) //RC 31100079 : Agenda
                    });
                    gf.addTextColumn({
                        name: "ixp_sml",
                        caption: "jres:30250675", //RC 30250675 : SML - identifikátor
                        //description: "jres:31100251", //RC 31100251 : Prvotní identifikátor primárního dokladu
                        width: 140,
                        serverFilter: Gordic.Eko.Filters.stringSingle({ model: "ixp_sml", caption: "jres:30250675" }) //RC 30250675 : SML - identifikátor
                    })
                        .addNumberColumn({
                        name: "rok_sml",
                        caption: "jres:30250677", //RC 30250677 : SML - rok
                        //description: "jres:31100251", //RC 31100251 : Prvotní identifikátor primárního dokladu
                        width: 80,
                        serverFilter: Gordic.Eko.Filters.integerInterval({ model: "rok_sml", caption: "jres:30250677" }) //RC 30250676 : SML - rok
                    })
                        .addNumberColumn({
                        name: "cislo_sml",
                        caption: "jres:30250678 ", //RC 30250678 : SML - číslo
                        //description: "jres:31100011", //RC 31100011 : Měsíc
                        width: 80,
                        //aggregate: Gordic.Data.Aggregates.first("mesic"),
                        //serverFilter: Gordic.Eko.Filters.stringInterval({ model: "mesic", caption: "jres:31100051", disabled: !!(this.Filter && this.StrictFilter && this.Filter.mesic) }) //RC 31100051 : M
                        serverFilter: Gordic.Eko.Filters.integerInterval({
                            model: "cislo_sml",
                            caption: "jres:30250679", //RC 30250679 : SML - číslo
                            //disabled: !!(this.Filter && this.StrictFilter && this.Filter.mesic),
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
                            doklady: { hidden: !(this.parentCnt.userSettings?.get("strukturovanyPopisDokladuAutoAddGridColumns") ?? false) },
                            pdok: { hidden: !(this.parentCnt.userSettings?.get("strukturovanyPopisDokladuAutoAddGridColumns") ?? false) }
                        }, profiles.default.columns);
                    }
                    return profiles;
                }
                /**
                 *  Vytvoření akcí
                 *
                 */
                createActions() {
                    super.createActions();
                    this.parentCnt.actions.add({
                        name: "zobrazitStuktPopisAct",
                        caption: "jres:30250626", //RC 30250626 : Sloupec SPD
                        tooltip: "jres:30250625", //RC 30250625 : V seznamu je přidán/odstraněn sloupec Strukturovaný popis dokladu
                        icon: "gi-uncheck",
                        enabled: true,
                        checked: false,
                        run: () => {
                            let checked = that.parentCnt.actions.zobrazitStuktPopisAct?.checked();
                            checked = !(typeof checked == "undefined" ? false : checked);
                            that.showPopisStruktOld = (!checked);
                            that.parentCnt.actions.zobrazitStuktPopisAct?.checked(checked);
                            //that.manuallyStartedStruktPopis = checked;   
                            //let caption = (checked) ? "jres:30250629" //RC 30250629 : Načíst bez SPD
                            //    : "jres:30250626"; //RC 30250626 : Sloupec SPD
                            //let tooltip = (checked) ? "jres:30250628" //RC 30250628 : v seznamu je odstraněn sloupec Strukturovaný popis dokladu
                            //    : "jres:30250625"; //RC 30250625 : V seznamu je přidán/odstraněn sloupec Strukturovaný popis dokladu
                            //that.parentCnt.actions.zobrazitStuktPopisAct?.update({ caption: caption, tooltip: tooltip });
                            that.parentCnt.actions.zobrazitStuktPopisAct?.update({ icon: (checked ? "gi-check" : "gi-uncheck") });
                            that.showPopisStrukt = checked;
                            that.reCreateGridFormat();
                            //that.reload();
                        }
                    });
                    this.parentCnt.actions.add({
                        name: "smlDetailAct",
                        enabled: false,
                        visible: true,
                        caption: "jres:30250680", //RC 30250680 : Případ SML
                        icon: "fa-external-link",
                        run: (ev, ctx) => { this.showPrimDoklad(void 0, "SML"); }
                    });
                    this.parentCnt.actions.add({
                        name: "zapisyAct",
                        icon: "gi-list",
                        enabled: false,
                        caption: "jres:31100124", //RC 31100124 : Zápisy
                        run: (ev, ctx) => { this.showZapisy(); }
                    });
                    //this.dokladAct =
                    this.parentCnt.actions.add({
                        name: "dokladAct",
                        enabled: false,
                        caption: "jres:31100233", //RC 31100233 : Doklady/zápisy
                        run: (ev, ctx) => { this.toggleGrouping(); }
                    });
                    //this.primdokladAct =
                    this.parentCnt.actions.add({
                        name: "primdokladAct",
                        icon: "fa-external-link",
                        enabled: false,
                        caption: "jres:30250154", //RC 30250154 : Prim. doklad
                        run: (ev, ctx) => { this.showPrimDoklad(); }
                    });
                    const that = this;
                    this.parentCnt.actions.add({
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
                    });
                    this.parentCnt.actions.add({
                        name: "shDokladyAct",
                        enabled: false,
                        //NOTE: Jak to delaji v tlustym: GSeznamUctZaznamuStavyZapisyTab.m_ActionDoklady_Start(): 
                        //Provedou seskupeni, ktere pridaji jako nove radky a pak zafiltruji pouze na souctove radky
                        run: () => { this.toggleGrouping(this.profiles.doklady.name); }
                    });
                    this.parentCnt.actions.add({
                        name: "shZapisyAct",
                        enabled: false,
                        run: () => { this.toggleGrouping(this.profiles.default.name); }
                    });
                }
                /**
                 * Pregenerovani griformatu
                 * @returns
                 */
                reCreateGridFormat() {
                    return this.beforeLoading();
                }
                /**
                 * Udalost pred vlastnim nactenim. Lze zrusit nacteni
                 * @returns
                 */
                beforeLoading() {
                    const that = this;
                    let grid = that.getGrid();
                    if (grid == null)
                        return false;
                    //let showPopisStruktPolozkyNew = that.parentCnt.userSettings?.get("rozsirenyPopisAutoAddGridColumns") as boolean ?? false;
                    let showPopisStruktNew = that.parentCnt.userSettings?.get("strukturovanyPopisDokladuAutoAddGridColumns") ?? false;
                    //let showEsuNew = (that.parentCnt.userSettings?.get("esuAddGridColumns") as boolean ?? false);
                    //let columnsPopisStruktNew = (that.parentCnt.userSettings?.get("rozsirenyPopisShowGridColumns"));
                    //that.showEsu = this.parentCnt.actions.zobrazitESUAct?.checked() as boolean;
                    //that.showPopisStruktPolozky = that.parentCnt.actions.zobrazitStuktPopisPolAct?.checked() as boolean;
                    that.showPopisStrukt = that.parentCnt.actions.zobrazitStuktPopisAct?.checked();
                    if (showPopisStruktNew != that.showPopisStrukt
                        || that.showPopisStruktOld != that.showPopisStrukt
                        //|| that.showPopisStruktPolozky != showPopisStruktPolozkyNew
                        || that.showPopisStrukt != showPopisStruktNew
                    //|| that.addStrPopisColumns != columnsPopisStruktNew
                    ) {
                        if (showPopisStruktNew)
                            that.showPopisStrukt = showPopisStruktNew;
                        let columns = that.createGridFormat();
                        // spolecne sloupce
                        this.addCommonCols(columns);
                        let searchItems = columns.columns.filter(c => c.columnType !== "datetime" && c.columnType !== "currency").map(e => "*" + e.name);
                        let columnsOld = grid.ggrid("option", "columns");
                        if (columnsOld.columns.length != columns.columns.length) {
                            grid.ggrid("option", "columns", columns);
                            let userProfil = grid.ggrid("getCurrentProfile");
                            userProfil.columnList = columns.columns.map((c) => c.name).join(",");
                            grid.ggrid("useProfile", { name: userProfil.name /* + nameProfilePostFix*/, columnList: userProfil.columnList });
                        }
                        // doplneni vyhledavacich poli
                        let searchItemsOld = grid.ggrid("option", "searchColumns");
                        if (typeof searchItemsOld !== "undefined" && searchItemsOld != "*") {
                            if (searchItemsOld.length != searchItems.length)
                                grid.ggrid("option", "searchColumns", searchItems);
                        }
                    }
                    return true;
                }
                /**
                 * Zobrazeni formulare se zapisy
                 */
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
                /**
                 * Definice menu baru
                 * @param typUlohy
                 */
                DefineMenuBar(typUlohy) {
                    let menu = super.DefineMenuBar(typUlohy);
                    menu.push({ action: this.parentCnt.actions.smlDetailAct, favorite: true });
                    menu.unshift({ action: this.parentCnt.actions.zobrazitStuktPopisAct, favorite: true, align: "opposite" });
                    return menu;
                }
            }
            WebClient.GSeznamEkoRozZapis = GSeznamEkoRozZapis;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUVrb1JvelphcGlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbUVrb1JvelphcGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0FxeEJmO0FBcnhCRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FxeEJuQjtJQXJ4QmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXF4QjdCO1FBcnhCb0IsV0FBQSxTQUFTO1lBRTFCLE1BQWEsa0JBQW1CLFNBQVEsVUFBQSxxQkFBcUI7Z0JBT3pELFlBQVksT0FBcUM7b0JBQzdDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFGbkIsZUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLENBQUM7b0JBR3hGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO29CQUMxQiw0Q0FBNEM7b0JBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQzdELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQy9ELG1DQUFtQztvQkFDbkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7b0JBQzVCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7b0JBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsa0NBQWtDLENBQUM7Z0JBQ3JELENBQUM7Z0JBRUQ7OztxQkFHSztnQkFDRSxhQUFhLENBQUMsSUFBeUIsRUFBRSxVQUFrQjtvQkFDOUQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBQ3RDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO29CQUNuRSxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLDZDQUE2QyxDQUFZLElBQUksS0FBSyxDQUFDO29CQUNuSCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7b0JBQ25CLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUNqQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNuQyxNQUFNLEdBQUcsT0FBTyxHQUFHLEVBQUUsT0FBTyxLQUFLLFdBQVcsSUFBSSxHQUFHLEVBQUUsT0FBTyxLQUFLLElBQUksQ0FBQztvQkFDMUUsQ0FBQztvQkFDRCxxQ0FBcUM7b0JBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3JELElBQUksa0JBQWtCLEVBQUUsQ0FBQzt3QkFDckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQzt3QkFDMUMsMENBQTBDO3dCQUMxQyw2RUFBNkU7b0JBQ2pGLENBQUM7b0JBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsT0FBTyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQztvQkFDM0UsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsT0FBTyxFQUFFLENBQUM7b0JBQ3RFLE9BQU8sR0FBRyxDQUFDLE9BQU8sT0FBTyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDNUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM1RixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztnQkFDdkUsQ0FBQztnQkFDQTs7O29CQUdJO2dCQUNLLGNBQWM7b0JBQ3BCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsa0JBQWtCO29CQUNsQixvQ0FBb0M7b0JBQ3BDLG9CQUFvQjtvQkFDcEIsK0RBQStEO29CQUMvRCwwQ0FBMEM7b0JBQzFDLG9FQUFvRTtvQkFDcEUsMkNBQTJDO29CQUMzQyxLQUFLO29CQUVMLG9DQUFvQztvQkFDcEMsb0JBQW9CO29CQUNwQiw0REFBNEQ7b0JBQzVELG9FQUFvRTtvQkFDcEUsMENBQTBDO29CQUMxQyxvQ0FBb0M7b0JBQ3BDLEtBQUs7b0JBRUwsb0NBQW9DO29CQUNwQyxlQUFlO29CQUNmLG1FQUFtRTtvQkFDbkUsb0VBQW9FO29CQUNwRSwwQ0FBMEM7b0JBQzFDLGtEQUFrRDtvQkFDbEQsS0FBSztvQkFFTCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7d0JBQzdCLEdBQUcsRUFBRSxHQUFHO3dCQUNSLFdBQVcsRUFBRSxlQUFlLEVBQUUsaUNBQWlDO3dCQUMvRCxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDN0QsS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUk7d0JBQ25DLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUI7cUJBQ25ELENBQUMsQ0FBQztvQkFDSCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzFCLElBQUksSUFBSSxLQUFLLElBQUksRUFBRSxDQUFDO3dCQUNoQixrQkFBa0I7d0JBQ2xCLCtCQUErQjt3QkFDL0IsMENBQTBDO3dCQUMxQyxnRkFBZ0Y7d0JBQ2hGLCtCQUErQjt3QkFDL0IsS0FBSzt3QkFFTCxrQkFBa0I7d0JBQ2xCLHlCQUF5Qjt3QkFDekIsMENBQTBDO3dCQUMxQyw0RkFBNEY7d0JBQzVGLHdDQUF3Qzt3QkFDeEMsS0FBSzt3QkFFTCxrQkFBa0I7d0JBQ2xCLHNCQUFzQjt3QkFDdEIsb0RBQW9EO3dCQUNwRCx1SEFBdUg7d0JBQ3ZILG9FQUFvRTt3QkFDcEUsMENBQTBDO3dCQUMxQyx5QkFBeUI7d0JBQ3pCLEtBQUs7b0JBQ1QsQ0FBQztnQkFDTCxDQUFDO2dCQUVNLGdCQUFnQjtvQkFDbkIsSUFBSSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBaUQsQ0FBQztvQkFDckYseUJBQXlCO29CQUV6QixFQUFFLENBQUMsa0JBQWtCLENBQUM7d0JBQ2xCLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUsdUJBQXVCO3dCQUNqRCxNQUFNLEVBQUUsSUFBSTt3QkFDWixLQUFLLEVBQUUsR0FBRzt3QkFDVixTQUFTLEVBQUU7NEJBQ1AsT0FBTyxFQUFFO2dDQUNMLGNBQWMsRUFBRSxlQUFlLEVBQUUsdUJBQXVCO2dDQUN4RCxRQUFRLEVBQUU7b0NBQ04sSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFO3dDQUNqQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO3dDQUNsQixPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLG9GQUFvRjtvQ0FDekosQ0FBQztvQ0FDRCxJQUFJLEVBQUUsMEJBQTBCO29DQUNoQyxVQUFVLEVBQUUsS0FBSztpQ0FDcEI7NkJBQ0o7eUJBQ0o7cUJBQ0osQ0FBQyxDQUFDO29CQUdILENBQUM7d0JBQ0csUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDOzRCQUNoQyx1REFBOEMsQ0FBQyxDQUFDLE1BQU07NEJBQ3REO2dDQUNJLEVBQUUsQ0FBQyxhQUFhLENBQUM7b0NBQ2IsSUFBSSxFQUFFLEtBQUs7b0NBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRztvQ0FDekIsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRztvQ0FDM0IsS0FBSyxFQUFFLEVBQUU7b0NBQ1QsbUJBQW1CO29DQUNuQixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO2lDQUN2RSxDQUFDLENBQUM7Z0NBQ0gsTUFBTTs0QkFDVjtnQ0FDSSxFQUFFLENBQUMsYUFBYSxDQUFDO29DQUNiLElBQUksRUFBRSxLQUFLO29DQUNYLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7b0NBQ3pCLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7b0NBQzNCLEtBQUssRUFBRSxFQUFFO29DQUNULG1CQUFtQjtvQ0FDbkIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7b0NBQzlDLHNFQUFzRTtvQ0FDdEUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQzt3Q0FDekMsR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUTt3Q0FDeEUsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUzt3Q0FDbEosS0FBSyxFQUFFLEtBQUs7d0NBQ1osUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO3FDQUN0RCxDQUFDO2lDQUNMLENBQUMsQ0FBQztnQ0FDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7b0NBQ2QsRUFBRSxDQUFDLGFBQWEsQ0FBQzt3Q0FDYixJQUFJLEVBQUUsS0FBSzt3Q0FDWCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO3dDQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHO3dDQUMzQixLQUFLLEVBQUUsRUFBRTt3Q0FDVCxtQkFBbUI7d0NBQ25CLHNFQUFzRTt3Q0FDdEUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQzs0Q0FDekMsR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFROzRDQUN6RyxVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTOzRDQUNsSixLQUFLLEVBQUUsS0FBSzs0Q0FDWixRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7eUNBQ3RELENBQUM7cUNBQ0wsQ0FBQyxDQUFDO2dDQUVQLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtvQ0FDZCxFQUFFLENBQUMsYUFBYSxDQUFDO3dDQUNiLElBQUksRUFBRSxLQUFLO3dDQUNYLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7d0NBQ3pCLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7d0NBQzNCLEtBQUssRUFBRSxFQUFFO3dDQUNULG1CQUFtQjt3Q0FDbkIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQztxQ0FDdkUsQ0FBQyxDQUFDO2dDQUNQLE1BQU07NEJBQ1Y7Z0NBQ0ksRUFBRSxDQUFDLGFBQWEsQ0FBQztvQ0FDYixJQUFJLEVBQUUsS0FBSztvQ0FDWCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO29DQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHO29DQUMzQixLQUFLLEVBQUUsRUFBRTtvQ0FDVCxrQkFBa0I7b0NBQ2xCLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO29DQUM5QyxZQUFZLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjt3Q0FDaEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO3dDQUM5SCxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7aUNBQ3JJLENBQUMsQ0FBQztnQ0FFSCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLDJEQUFtRCxFQUFFLENBQUM7b0NBQ2pHLEVBQUUsQ0FBQyxhQUFhLENBQUM7d0NBQ2IsSUFBSSxFQUFFLEtBQUs7d0NBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzt3Q0FDekIsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRzt3Q0FDM0IsS0FBSyxFQUFFLEVBQUU7d0NBQ1QsbUJBQW1CO3dDQUNuQixTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzt3Q0FDOUMsc0VBQXNFO3dDQUN0RSxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDOzRDQUN6QyxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFROzRDQUN4RSxVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTOzRDQUNsSixLQUFLLEVBQUUsS0FBSzs0Q0FDWixRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7eUNBQ3RELENBQUM7cUNBQ0wsQ0FBQyxDQUFDO29DQUVILElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTt3Q0FDZCxFQUFFLENBQUMsYUFBYSxDQUFDOzRDQUNiLElBQUksRUFBRSxLQUFLOzRDQUNYLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7NENBQ3pCLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7NENBQzNCLEtBQUssRUFBRSxFQUFFOzRDQUNULG1CQUFtQjs0Q0FDbkIsc0VBQXNFOzRDQUN0RSxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2dEQUN6QyxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVE7Z0RBQ3pHLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFNBQVM7Z0RBQ2xKLEtBQUssRUFBRSxLQUFLO2dEQUNaLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRzs2Q0FDdEQsQ0FBQzt5Q0FDTCxDQUFDLENBQUM7b0NBRVAsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO3dDQUNkLEVBQUUsQ0FBQyxhQUFhLENBQUM7NENBQ2IsSUFBSSxFQUFFLEtBQUs7NENBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRzs0Q0FDekIsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRzs0Q0FDM0IsS0FBSyxFQUFFLEVBQUU7NENBQ1QsbUJBQW1COzRDQUNuQixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO3lDQUN2RSxDQUFDLENBQUM7Z0NBQ1gsQ0FBQztnQ0FDRCxNQUFNO3dCQUNkLENBQUM7b0JBQ0wsQ0FBQztvQkFDRCx1RUFBdUU7b0JBQ3ZFLHNDQUFzQztvQkFHdEMsSUFBSSxlQUFlLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBRXJFLEVBQUUsQ0FBQyxlQUFlLENBQUM7d0JBQ2YsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQjt3QkFDNUMsV0FBVyxFQUFFLGVBQWUsRUFBRSxrQ0FBa0M7d0JBQ2hFLHNFQUFzRTt3QkFDdEUsS0FBSyxFQUFFLEVBQUU7d0JBQ1QsWUFBWSxFQUFFLGVBQWUsQ0FBQSxnREFBZ0Q7cUJBQ2hGLENBQUMsQ0FBQztvQkFFSCxFQUFFLENBQUMsZUFBZSxDQUFDO3dCQUNmLElBQUksRUFBRSxPQUFPO3dCQUNiLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUI7d0JBQzVDLFdBQVcsRUFBRSxlQUFlLEVBQUUscUJBQXFCO3dCQUNuRCxLQUFLLEVBQUUsRUFBRTt3QkFDVCxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQzt3QkFDaEQsc0xBQXNMO3dCQUN0TCxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDOzRCQUM1QyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsaUJBQWlCOzRCQUMzRCxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDOzRCQUNuRSxVQUFVLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFOzRCQUM5RSxXQUFXLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFO3lCQUNsRixDQUFDO3FCQUNMLENBQUMsQ0FBQztvQkFDSCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3QkFDaEIsRUFBRSxDQUFDLGVBQWUsQ0FBQzs0QkFDZixJQUFJLEVBQUUsS0FBSzs0QkFDWCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCOzRCQUM1QyxXQUFXLEVBQUUsZUFBZSxFQUFFLG1CQUFtQjs0QkFDakQsS0FBSyxFQUFFLEVBQUU7NEJBQ1Qsa0xBQWtMOzRCQUNsTCxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO2dDQUM1QyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsaUJBQWlCO2dDQUN6RCxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2dDQUNqRSxVQUFVLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFO2dDQUM5RSxXQUFXLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFOzZCQUNsRixDQUFDO3lCQUNMLENBQUMsQ0FBQzt3QkFDSCxFQUFFLENBQUMsYUFBYSxDQUFDOzRCQUNiLElBQUksRUFBRSxLQUFLOzRCQUNYLE9BQU8sRUFBRSxLQUFLOzRCQUNkLEtBQUssRUFBRSxFQUFFOzRCQUNULE1BQU0sRUFBRSxJQUFJOzRCQUNaLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDOzRCQUM5Qyx3QkFBd0I7eUJBQzNCLENBQUMsQ0FBQzt3QkFHSCxFQUFFLENBQUMsYUFBYSxDQUFDOzRCQUNiLElBQUksRUFBRSxJQUFJOzRCQUNWLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCOzRCQUNoRCxLQUFLLEVBQUUsRUFBRTs0QkFDVCxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs0QkFDN0MsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQzt5QkFDckUsQ0FBQyxDQUFDO3dCQUNILElBQUksSUFBSSxDQUFDLGVBQWU7NEJBQ3hCLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0NBQ2IsSUFBSSxFQUFFLE1BQU07Z0NBQ1osT0FBTyxFQUFFLGVBQWUsRUFBRSwyQ0FBMkM7Z0NBQ3JFLG9NQUFvTTtnQ0FDcE0sS0FBSyxFQUFFLEdBQUc7Z0NBQ1YsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsMkNBQTJDOzZCQUN6SSxDQUFDLENBQUM7b0JBQ1AsQ0FBQztvQkFFRCxFQUFFLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBR3pELEVBQUUsQ0FBQyxhQUFhLENBQUM7d0JBQ2IsSUFBSSxFQUFFLE9BQU87d0JBQ2IsT0FBTyxFQUFFLGVBQWUsRUFBRSwyQkFBMkI7d0JBQ3JELEtBQUssRUFBRSxHQUFHO3dCQUNWLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLDJCQUEyQjtxQkFDMUgsQ0FBQyxDQUFDO29CQUdILEVBQUUsQ0FBQyxNQUFNLENBQUM7d0JBQ04sSUFBSSxFQUFFLEtBQUs7d0JBQ1gsK0NBQStDO3dCQUMvQyx3RkFBd0Y7d0JBQ3hGLEtBQUssRUFBRSxHQUFHO3dCQUNWLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLDZCQUE2QjtxQkFDakgsQ0FBQyxDQUFDO29CQUlILEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQzt3QkFDakIsSUFBSSxFQUFFLElBQUk7d0JBQ1YsT0FBTyxFQUFFLGVBQWUsRUFBRSxrQkFBa0I7d0JBQzVDLFdBQVcsRUFBRSxlQUFlLEVBQUUsdUJBQXVCO3dCQUNyRCxLQUFLLEVBQUUsR0FBRzt3QkFDVixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxrQkFBa0I7cUJBQ2pILENBQUMsQ0FBQztvQkFDSCxFQUFFLENBQUMsaUJBQWlCLENBQUM7d0JBQ2pCLElBQUksRUFBRSxJQUFJO3dCQUNWLE9BQU8sRUFBRSxlQUFlLEVBQUUsbUJBQW1CO3dCQUM3QyxLQUFLLEVBQUUsR0FBRzt3QkFDVixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxtQkFBbUI7cUJBQ2xILENBQUMsQ0FBQztvQkFDSCxFQUFFLENBQUMsaUJBQWlCLENBQUM7d0JBQ2pCLElBQUksRUFBRSxNQUFNO3dCQUNaLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCO3dCQUNoRCxXQUFXLEVBQUUsZUFBZSxFQUFFLDZCQUE2Qjt3QkFDM0QsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlO3dCQUNyQyxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxzQkFBc0I7cUJBQ3ZILENBQUMsQ0FBQztvQkFDSCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxLQUFLLENBQUMsRUFBRSxDQUFDO3dCQUNqQyxFQUFFLENBQUMsYUFBYSxDQUFDOzRCQUNiLElBQUksRUFBRSxPQUFPOzRCQUNiLE9BQU8sRUFBRSxlQUFlLEVBQUUsOEJBQThCOzRCQUN4RCxLQUFLLEVBQUUsR0FBRzs0QkFDVixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyw4QkFBOEI7eUJBQy9ILENBQUMsQ0FBQzt3QkFDSCxFQUFFLENBQUMsYUFBYSxDQUFDOzRCQUNiLElBQUksRUFBRSxTQUFTOzRCQUNmLE9BQU8sRUFBRSxlQUFlLEVBQUUsMkJBQTJCOzRCQUNyRCxLQUFLLEVBQUUsR0FBRzs0QkFDVixZQUFZLEVBQUUsMkJBQTJCOzRCQUN6QyxTQUFTLEVBQUUsU0FBUzs0QkFDcEIsUUFBUSxFQUFFO2dDQUNOLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDOzZCQUN6RDs0QkFDRCxvTEFBb0w7NEJBQ3BMLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsbUNBQW1DLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsK0NBQStDOzRCQUN6Syx1SkFBdUo7eUJBQzFKLENBQUMsQ0FBQztvQkFDUCxDQUFDO29CQUVELEVBQUUsQ0FBQyxhQUFhLENBQUM7d0JBQ2IsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLE9BQU8sRUFBRSxlQUFlLEVBQUUsNkJBQTZCO3dCQUN2RCxLQUFLLEVBQUUsR0FBRzt3QkFDVixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyw2QkFBNkI7cUJBQy9ILENBQUMsQ0FBQztvQkFDSCxFQUFFLENBQUMsaUJBQWlCLENBQUM7d0JBQ2pCLElBQUksRUFBRSxXQUFXO3dCQUNqQixPQUFPLEVBQUUsZUFBZSxFQUFFLDJCQUEyQjt3QkFDckQsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQzs0QkFDMUMsS0FBSyxFQUFFLFdBQVc7NEJBQ2xCLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUU7NEJBQ3JDLFdBQVcsRUFBRSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUU7NEJBQ3RDLE9BQU8sRUFBRSxlQUFlLENBQUMsMkJBQTJCO3lCQUN2RCxDQUFDO3FCQUNMLENBQUMsQ0FBQztvQkFFSCxFQUFFLENBQUMsYUFBYSxDQUFDO3dCQUNiLElBQUksRUFBRSxRQUFRO3dCQUNkLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCO3dCQUNoRCxLQUFLLEVBQUUsRUFBRTt3QkFDVCxZQUFZLEVBQUUsMEJBQTBCO3dCQUN4QyxRQUFRLEVBQUU7NEJBQ04sU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7eUJBQ3hEO3dCQUNELFNBQVMsRUFBRSxTQUFTO3dCQUNwQixZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLHNCQUFzQjtxQkFDNUssQ0FBQyxDQUFDO29CQUdILEVBQUUsQ0FBQyxhQUFhLENBQUM7d0JBQ2IsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQ0FBbUM7d0JBQzdELHdGQUF3Rjt3QkFDeEYsS0FBSyxFQUFFLEdBQUc7d0JBQ1YsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUUsbUNBQW1DO3FCQUNySSxDQUFDO3lCQUNELGVBQWUsQ0FBQzt3QkFDYixJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsZUFBZSxFQUFFLHlCQUF5Qjt3QkFDbkQsd0ZBQXdGO3dCQUN4RixLQUFLLEVBQUUsRUFBRTt3QkFDVCxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyx5QkFBeUI7cUJBQzdILENBQUM7eUJBQ0QsZUFBZSxDQUFDO3dCQUNiLElBQUksRUFBRSxXQUFXO3dCQUNqQixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsMkJBQTJCO3dCQUN0RCxxREFBcUQ7d0JBQ3JELEtBQUssRUFBRSxFQUFFO3dCQUNULG1EQUFtRDt3QkFDbkQsc0xBQXNMO3dCQUN0TCxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDOzRCQUM3QyxLQUFLLEVBQUUsV0FBVzs0QkFDbEIsT0FBTyxFQUFFLGVBQWUsRUFBRSwyQkFBMkI7NEJBQ3JELHNFQUFzRTt5QkFDekUsQ0FBQztxQkFDTCxDQUFDLENBQUM7b0JBQ0gsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7d0JBQ2pCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLGlGQUF3RSxDQUFDO3dCQUN6RyxFQUFFLENBQUMsYUFBYSxDQUFDOzRCQUNiLElBQUksRUFBRSxZQUFZOzRCQUNsQixPQUFPLEVBQUUsZUFBZSxFQUFFLHdCQUF3Qjs0QkFDbEQsV0FBVyxFQUFFLGVBQWUsRUFBRSxxRUFBcUU7NEJBQ25HLFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyx3QkFBd0I7NEJBQ2hOLGNBQWM7eUJBQ2pCLENBQUMsQ0FBQzt3QkFDSCxFQUFFLENBQUMsZUFBZSxDQUFDOzRCQUNmLElBQUksRUFBRSxXQUFXOzRCQUNqQixPQUFPLEVBQUUsZUFBZSxFQUFDLDJCQUEyQjs0QkFDcEQsV0FBVyxFQUFFLGVBQWUsRUFBRSw2REFBNkQ7NEJBQzNGLEtBQUssRUFBRSxFQUFFOzRCQUNULFlBQVksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsMkJBQTJCO3lCQUN6SixDQUFDLENBQUM7d0JBRUgsRUFBRSxDQUFDLGFBQWEsQ0FBQzs0QkFDYixJQUFJLEVBQUUsYUFBYTs0QkFDbkIsT0FBTyxFQUFFLGVBQWUsRUFBaUYsZ0NBQWdDOzRCQUN6SSxLQUFLLEVBQUUsRUFBRSxFQUFDLG9CQUFvQjs0QkFDOUIsV0FBVyxFQUFFLFFBQVE7NEJBRXJCLFlBQVksRUFBRSxVQUFVLElBQUk7Z0NBQ3hCLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQ0FDbkQsT0FBTzt3Q0FDSCxJQUFJLEVBQUUsOENBQThDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxnQ0FBZ0M7d0NBQzdHLDBCQUEwQjtxQ0FDN0IsQ0FBQztnQ0FDTixDQUFDO2dDQUNELElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUUsQ0FBQztvQ0FDM0QsT0FBTzt3Q0FDSCxJQUFJLEVBQUUseUJBQXlCLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSw0QkFBNEI7d0NBQ3BGLDBCQUEwQjtxQ0FDN0IsQ0FBQztnQ0FDTixDQUFDOzRCQUNMLENBQUM7eUJBQ0osQ0FBQyxDQUFDO29CQUNQLENBQUM7b0JBR0Qsb0JBQW9CO29CQUNwQixvQ0FBb0M7b0JBQ3BDLDhDQUE4QztvQkFDOUMsOEpBQThKO29CQUU5Siw2QkFBNkI7b0JBQzdCLCtDQUErQztvQkFDL0MsNEJBQTRCO29CQUM1Qiw4Q0FBOEM7b0JBQzlDLHlGQUF5RjtvQkFDekYsOEJBQThCO29CQUM5Qix5QkFBeUI7b0JBQ3pCLGdKQUFnSjtvQkFDaEosYUFBYTtvQkFDYixTQUFTO29CQUNULEdBQUc7b0JBRUgsT0FBTyxFQUFTLENBQUM7Z0JBQ3JCLENBQUM7Z0JBRU0sY0FBYyxDQUFDLEVBQXFHO29CQUN2SCxJQUFJLFFBQVEsR0FBMkI7d0JBQ25DLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLHVCQUF1QjtxQkFDMUUsQ0FBQTtvQkFFRCxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQzFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFRLENBQUMsQ0FBQyxDQUFDLElBQUssQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWhGLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNoQixRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxlQUFlLENBQUMsQ0FBQyxnQ0FBZ0M7d0JBQ3pFLFFBQVEsQ0FBQyxPQUFPLEdBQUcsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsdUJBQXVCO3dCQUN2RyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDOzRCQUNoQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyw2Q0FBNkMsQ0FBWSxJQUFJLEtBQUssQ0FBQyxFQUFFOzRCQUMzSCxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyw2Q0FBNkMsQ0FBWSxJQUFJLEtBQUssQ0FBQyxFQUFFO3lCQUMzSCxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2pDLENBQUM7b0JBRUQsT0FBTyxRQUFRLENBQUM7Z0JBQ3BCLENBQUM7Z0JBQ0Q7OzttQkFHRztnQkFDSSxhQUFhO29CQUNoQixLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDdkIsSUFBSSxFQUFFLHVCQUF1Qjt3QkFDN0IsT0FBTyxFQUFFLGVBQWUsRUFBRSwyQkFBMkI7d0JBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsaUZBQWlGO3dCQUMzRyxJQUFJLEVBQUUsWUFBWTt3QkFDbEIsT0FBTyxFQUFFLElBQUk7d0JBQ2IsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsR0FBRyxFQUFFLEdBQUcsRUFBRTs0QkFFTixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsQ0FBQzs0QkFDdEUsT0FBTyxHQUFHLENBQUMsQ0FBQyxPQUFPLE9BQU8sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQzdELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFZLENBQUM7NEJBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDL0QsK0NBQStDOzRCQUMvQywwRUFBMEU7NEJBQzFFLG9EQUFvRDs0QkFDcEQsc0hBQXNIOzRCQUN0SCwwR0FBMEc7NEJBRTFHLCtGQUErRjs0QkFDL0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDdEcsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUM7NEJBQy9CLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDOzRCQUMxQixnQkFBZ0I7d0JBQ3BCLENBQUM7cUJBQ0osQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDdkIsSUFBSSxFQUFFLGNBQWM7d0JBQ3BCLE9BQU8sRUFBRSxLQUFLO3dCQUNkLE9BQU8sRUFBQyxJQUFJO3dCQUNaLE9BQU8sRUFBRSxlQUFlLEVBQUUsMEJBQTBCO3dCQUNwRCxJQUFJLEVBQUUsa0JBQWtCO3dCQUN4QixHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDM0QsQ0FBQyxDQUFDO29CQUdILElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDdkIsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxLQUFLO3dCQUNkLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCO3dCQUNoRCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUMzQyxDQUFDLENBQUM7b0JBQ0gsa0JBQWtCO29CQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDM0IsSUFBSSxFQUFFLFdBQVc7d0JBQ2pCLE9BQU8sRUFBRSxLQUFLO3dCQUNkLE9BQU8sRUFBRSxlQUFlLEVBQUUsOEJBQThCO3dCQUN4RCxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUMvQyxDQUFDLENBQUM7b0JBQ0gsc0JBQXNCO29CQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7d0JBQ3ZCLElBQUksRUFBRSxlQUFlO3dCQUNyQixJQUFJLEVBQUUsa0JBQWtCO3dCQUM1QixPQUFPLEVBQUUsS0FBSzt3QkFDZCxPQUFPLEVBQUUsZUFBZSxFQUFFLDRCQUE0Qjt3QkFDdEQsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDL0MsQ0FBQyxDQUFDO29CQUVILE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUN2QixJQUFJLEVBQUUsY0FBYzt3QkFDcEIsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFOzRCQUNiLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs0QkFDMUIsSUFBSSxJQUFJLElBQUksSUFBSTtnQ0FBRSxPQUFROzRCQUMxQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFzQyxjQUFjLENBQUMsQ0FBQzs0QkFDMUUsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUM7Z0NBQ2hCLE9BQU87NEJBRVgsSUFBSTtpQ0FDQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7aUNBQzFCLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQzs0QkFDckQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUN6QixDQUFDO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7d0JBQ3ZCLElBQUksRUFBRSxjQUFjO3dCQUNwQixPQUFPLEVBQUUsS0FBSzt3QkFFZCwwRkFBMEY7d0JBQzFGLDRGQUE0Rjt3QkFDNUYsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNuRSxDQUFDLENBQUM7b0JBRUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO3dCQUMzQixJQUFJLEVBQUUsYUFBYTt3QkFDbkIsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNsRSxDQUFDLENBQUM7Z0JBSVAsQ0FBQztnQkFDRDs7O21CQUdHO2dCQUNLLGtCQUFrQjtvQkFDdEIsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ2hDLENBQUM7Z0JBQ0Q7OzttQkFHRztnQkFDTyxhQUFhO29CQUNuQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2xCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDMUIsSUFBSSxJQUFJLElBQUksSUFBSTt3QkFBRSxPQUFPLEtBQUssQ0FBQztvQkFFL0IsMkhBQTJIO29CQUMzSCxJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyw2Q0FBNkMsQ0FBWSxJQUFJLEtBQUssQ0FBQztvQkFDN0gsK0ZBQStGO29CQUMvRixrR0FBa0c7b0JBQ2xHLDZFQUE2RTtvQkFDN0Usc0dBQXNHO29CQUN0RyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLE9BQU8sRUFBYSxDQUFDO29CQUUxRixJQUNJLGtCQUFrQixJQUFJLElBQUksQ0FBQyxlQUFlOzJCQUN2QyxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLGVBQWU7d0JBQ2xELDZEQUE2RDsyQkFDMUQsSUFBSSxDQUFDLGVBQWUsSUFBSSxrQkFBa0I7b0JBQzdDLHFEQUFxRDtzQkFDdkQsQ0FBQzt3QkFFQyxJQUFJLGtCQUFrQjs0QkFDbEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQzt3QkFFOUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7d0JBQ3RDLG1CQUFtQjt3QkFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDNUIsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2pJLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBZ0MsQ0FBQzt3QkFDaEYsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDOzRCQUN0RCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7NEJBRXpDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs0QkFDakQsVUFBVSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTs0QkFDcEUsSUFBSSxDQUFDLEtBQUssQ0FBOEMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFLLENBQUEseUJBQXlCLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO3dCQUNsSyxDQUFDO3dCQUNELDhCQUE4Qjt3QkFDOUIsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7d0JBQzNELElBQUksT0FBTyxjQUFjLEtBQUssV0FBVyxJQUFJLGNBQWMsSUFBSSxHQUFHLEVBQUUsQ0FBQzs0QkFDakUsSUFBSSxjQUFjLENBQUMsTUFBTSxJQUFJLFdBQVcsQ0FBQyxNQUFNO2dDQUMzQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUUsV0FBVyxDQUFDLENBQUM7d0JBQzNELENBQUM7b0JBQ0wsQ0FBQztvQkFFRCxPQUFPLElBQUksQ0FBQztnQkFDaEIsQ0FBQztnQkFDRDs7bUJBRUc7Z0JBQ0ksVUFBVTtvQkFDYixJQUFJLEtBQUssR0FBRyxlQUFlLENBQUMsQ0FBQyw0QkFBNEI7b0JBQ3pELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxDQUFDLFNBQVMsRUFBRTt5QkFDWCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTt3QkFDUixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQzFCLElBQUksSUFBSSxJQUFJLElBQUk7NEJBQUUsT0FBUTt3QkFDMUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBc0MsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUNqRixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQzs0QkFDaEIsT0FBTzt3QkFFWCxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLElBQUksUUFBcUQsQ0FBQzt3QkFDMUQsSUFBSSxFQUFVLENBQUM7d0JBQ2YsSUFBSSxNQUFxQixDQUFDO3dCQUMxQixnRUFBZ0U7d0JBQ2hFLENBQUM7NEJBQ0csTUFBTSxHQUFHO2dDQUNMLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO2dDQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtnQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7Z0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO2dDQUN2QyxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFFO2dDQUNuQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEdBQUksQ0FBQyxRQUFRLEVBQUU7Z0NBQzVCLEdBQUcsRUFBRTtvQ0FDRCxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO2lDQUMxQzs2QkFDSixDQUFDO3dCQUNOLENBQUM7d0JBQ0QsUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDOzRCQUM5QjtnQ0FDSSxRQUFRLHNFQUE4RCxDQUFDO2dDQUN2RSxFQUFFLEdBQUcsWUFBWSxDQUFDLENBQUMsd0NBQXdDO2dDQUMzRCxNQUFNOzRCQUNWO2dDQUNJLFFBQVEsb0VBQTRELENBQUM7Z0NBQ3JFLEVBQUUsR0FBRyxZQUFZLENBQUMsQ0FBQyx3Q0FBd0M7Z0NBQzNELE1BQU07NEJBQ1Y7Z0NBQ0ksUUFBUSx1RUFBOEQsQ0FBQztnQ0FDdkUsRUFBRSxHQUFHLG1CQUFtQixDQUFDLENBQUMsd0NBQXdDO2dDQUNsRSxNQUFNOzRCQUNWO2dDQUNJLE1BQU0sSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7d0JBQ3pDLENBQUM7d0JBRUQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyx3Q0FBd0MsRUFBRTs0QkFDckUsRUFBRSxFQUFFLEVBQUU7NEJBQ04sUUFBUSxFQUFFLFFBQVE7NEJBQ2xCLE1BQU0sRUFBRSxNQUFNOzRCQUNkLFVBQVUsRUFBRSxHQUFHOzRCQUNmLFlBQVksRUFBRSxJQUFJOzRCQUNsQixjQUFjLEVBQUUsQ0FBQyxDQUFDLGNBQWM7NEJBQ2hDLFlBQVksRUFBRSxJQUFJOzRCQUNsQixLQUFLLEVBQUUsS0FBSzt5QkFDZixDQUFDLENBQUM7b0JBQ1AsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQztnQkFDRjs7O21CQUdHO2dCQUNRLGFBQWEsQ0FBQyxRQUFxRDtvQkFDekUsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQzNFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztvQkFDMUcsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7YUFNSjtZQTd3QlksNEJBQWtCLHFCQTZ3QjlCLENBQUE7UUFNTCxDQUFDLEVBcnhCb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBcXhCN0I7SUFBRCxDQUFDLEVBcnhCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBcXhCbkI7QUFBRCxDQUFDLEVBcnhCUyxNQUFNLEtBQU4sTUFBTSxRQXF4QmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjci5XZWJDbGllbnQge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtRWtvUm96WmFwaXMgZXh0ZW5kcyBHU2V6bmFtRWtvWmF6bmFtdUJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG4gICAgICAgIC8qKiBHbG9iYWxuaSBtb2R1bG92ZSBwYXJhbWV0cnkgdiBKUyAqL1xyXG5cclxuXHJcbiAgICAgICAgLyoqIExpbWl0IHBvY3R1IG5hY2l0YW55Y2ggemF6bmFtdSwgcG9rdWQgbmVkb2pkZSBrIHBvdHZyemVuaSwgemUgdXppdmF0ZWwgY2hjZSBqaXQgcHJlcyBsaW1pdCAqL1xyXG4gICAgICAgIHN1bUxpbWl0OiBudW1iZXI7XHJcbiAgICAgICAgbG9nT3B0aW9ucyA9IHsgbmFtZTogXCJHU2V6bmFtRWtvUm96WmFwaXNcIiwgYXV0aG9yQ29kZTogMzAyLCBmaWxlOiBcIkdTZXpuYW1Fa29Sb3paYXBpcy50c1wiIH07XHJcbiAgICAgICAgY29uc3RydWN0b3IoY29udGVudDogR1Nlem5hbUVrb1phem5hbXVCYXNlQ29udGVudCkge1xyXG4gICAgICAgICAgICBzdXBlcihjb250ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5wb3V6aXZhblN0cnVrUG9waXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5wb3ZvbGVuTmFobGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy8gZGVmaW5pY2UgdGFza3UgcHJvIHNlem5hbSBhIG5hY3RlbmkgcG9jdHVcclxuICAgICAgICAgICAgdGhpcy50YXNrTGlzdCA9IHRoaXMucGFyZW50Q250LmlzbC5VY3JSb3pwb2N0b3Z5WmFwaXMubGlzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tDb3VudCA9IHRoaXMucGFyZW50Q250LmlzbC5VY3JSb3pwb2N0b3Z5WmFwaXMuY291bnQoKTtcclxuICAgICAgICAgICAgLy8gbW96bm9zdCB1a2xhZGFuaSBoaXN0b3JpZSBmaWx0cnVcclxuICAgICAgICAgICAgdGhpcy5yZW1lbWJlckhpc3RvcnkgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnVzZVRleHR5WlJvenZyaHUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm15S2V5cyA9IFwicm9rLGxpYyxpY28sdWNzLG1lc2ljLGFjLHJhZGVrX3pcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuaSBwcmlzdHVwbm9zdGkgYWtjaVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHVibGljIG5hc3RhdmVuaUFrY2koZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PiwgcG9jZXRSYWRrdTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHN1cGVyLm5hc3RhdmVuaUFrY2koZ3JpZCwgcG9jZXRSYWRrdSk7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcy5wYXJlbnRDbnQ7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmxvZy5kZWJ1ZyhcIktvbmVjIG5hc3RhdmVuaUFrY2kgR1Nlem5hbUVrb1JvelphcGlzXCIpO1xyXG4gICAgICAgICAgICBsZXQgc2hvd1BvcGlzU3RydWt0TmV3ID0gdGhhdC51c2VyU2V0dGluZ3M/LmdldChcInN0cnVrdHVyb3ZhbnlQb3Bpc0Rva2xhZHVBdXRvQWRkR3JpZENvbHVtbnNcIikgYXMgYm9vbGVhbiA/PyBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IGVuYWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAocG9jZXRSYWRrdSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGlzLmdldEN1cnJlbnRSb3coZ3JpZCk7XHJcbiAgICAgICAgICAgICAgICBlbmFibGUgPSB0eXBlb2Ygcm93Py5peHBfc21sICE9PSBcInVuZGVmaW5lZFwiICYmIHJvdz8uaXhwX3NtbCAhPT0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBwcmlzdHVwbm9zdCBha2NpIHpvYnJhemVuaSBzbWxvdXZ5XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuc21sRGV0YWlsQWN0Py5lbmFibGVkKGVuYWJsZSk7XHJcbiAgICAgICAgICAgIGlmIChzaG93UG9waXNTdHJ1a3ROZXcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BvcGlzU3RydWt0ID0gc2hvd1BvcGlzU3RydWt0TmV3O1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLm1hbnVhbGx5U3RhcnRlZFN0cnVrdFBvcGlzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvL3RoYXQuYWN0aW9ucy56b2JyYXppdFN0dWt6b2JyYXppdFN0dWt0UG9waXNBY3R0UG9waXNQb2xBY3Q/LmNoZWNrZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuem9icmF6aXRTdHVrdFBvcGlzQWN0Py52aXNpYmxlKCFzaG93UG9waXNTdHJ1a3ROZXcpO1xyXG4gICAgICAgICAgICBsZXQgY2hlY2tlZCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuem9icmF6aXRTdHVrdFBvcGlzQWN0Py5jaGVja2VkKCk7XHJcbiAgICAgICAgICAgIGNoZWNrZWQgPSAodHlwZW9mIGNoZWNrZWQgPT0gXCJ1bmRlZmluZWRcIiA/IGZhbHNlIDogY2hlY2tlZCk7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy56b2JyYXppdFN0dWt0UG9waXNBY3Q/LnVwZGF0ZSh7IGljb246IChjaGVja2VkID8gXCJnaS1jaGVja1wiIDogXCJnaS11bmNoZWNrXCIpIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cuZGVidWcoXCJLb25lYyBuYXN0YXZlbmlBa2NpIEdTZXpuYW1Fa29Sb3paYXBpc1wiKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgICAvKipcclxuICAgICAgICAgKiBWeXR2b3Jlbmkga2xhdmVzb3Z5Y2ggemtyYXRla1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqICovXHJcbiAgICAgICAgcHJvdGVjdGVkIGNyZWF0ZVNob3J0Q3V0KCk6IHZvaWQgeyBcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlU2hvcnRDdXQoKTtcclxuICAgICAgICAgICAgLy9sZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vdGhpcy5wYXJlbnRDbnQuZWxlbWVudC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAvLyAgICBrZXk6IFwiSU5TRVJUXCIsXHJcbiAgICAgICAgICAgIC8vICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMjZcIiwgLy9SQyAzMTEwMDIyNiA6IE5hxI10ZW7DrSBkYXRcclxuICAgICAgICAgICAgLy8gICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgIC8vICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgLy8gICAgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmluc0FjdFxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLnBhcmVudENudC5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIC8vICAgIGtleTogXCJERUxFVEVcIixcclxuICAgICAgICAgICAgLy8gICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDE4MVwiLCAvL1JDIDMxMTAwMTgxIDogVnnEjWlzdGl0XHJcbiAgICAgICAgICAgIC8vICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgLy8gICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgIC8vICAgIGFjdGlvbjogdGhpcy5jbGVhckZpbHRlclJvd0FjdFxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLnBhcmVudENudC5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgIC8vICAgIGtleTogXCIxXCIsXHJcbiAgICAgICAgICAgIC8vICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMThcIiwgLy9SQyAzMTEwMDIxOCA6IFDFmWVkY2hvesOtIGZpbHRyXHJcbiAgICAgICAgICAgIC8vICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgLy8gICAgZ3JvdXA6IEdvcmRpYy5TaG9ydGN1dHMuR3JvdXBzLlRhc2ssXHJcbiAgICAgICAgICAgIC8vICAgIGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5wcmV2RmlsdGVyQWN0XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5lbGVtZW50LmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IFwiMFwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyOFwiLCAvL1JDIDMxMTAwMjI4IDogVnnEjWlzdGl0IGEgbmHEjcOtc3RcclxuICAgICAgICAgICAgICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5UYXNrLFxyXG4gICAgICAgICAgICAgICAgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmNsZWFyQW5kRmlsdGVyQWN0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9ncmlkLmdzaG9ydGN1dCh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBrZXk6IFwiY3RybCtzaGlmdCtsY2xpY2tcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDIyOVwiLCAvL1JDIDMxMTAwMjI5IDogUMWZZW5lc2Vuw60gaG9kbm90eSBkbyBmaWx0cnUuXHJcbiAgICAgICAgICAgICAgICAvLyAgICBhY3Rpb246IHRoaXMuc2VsRmlsdGVyQWN0XHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vZ3JpZC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAga2V5OiBcImN0cmwrbGNsaWNrXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBncm91cDogR29yZGljLlNob3J0Y3V0cy5Hcm91cHMuR3JpZCxcclxuICAgICAgICAgICAgICAgIC8vICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMzVcIiwgLy9SQyAzMTEwMDIzNSA6IFDFmWVuZXNlbsOtIGhvZG5vdHkgZG8gZmlsdHJ1IGEgdnlobGVkw6Fuw60uXHJcbiAgICAgICAgICAgICAgICAvLyAgICBhY3Rpb246IHRoaXMuc2VsRmlsdGVyQW5kU2VhcmNoQWN0XHJcbiAgICAgICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vZ3JpZC5nc2hvcnRjdXQoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAga2V5OiBbXCIuXCIsIFwiLFwiXSxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vTk9URTogRGVzY3JpcHRpb24gb3BzYW5vIHogbmFwb3ZlZHkgayBUSyBVQ1JcclxuICAgICAgICAgICAgICAgIC8vICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyMjdcIiwgLy9SQyAzMTEwMDIyNyA6IFpvYnJhemVuw60gdsWhZWNoIHrDoXBpc8WvIGRva2xhZMWvIChjZWzDvSBkb2tsYWQpIG5hZCBvem5hxI1lbsO9bSB6w6FwaXNlbS5cclxuICAgICAgICAgICAgICAgIC8vICAgIGNhbkV4ZWN1dGU6IChldikgPT4geyByZXR1cm4gZXYudGFyZ2V0LnRhZ05hbWUgIT09IFwiSU5QVVRcIjsgfSxcclxuICAgICAgICAgICAgICAgIC8vICAgIGdyb3VwOiBHb3JkaWMuU2hvcnRjdXRzLkdyb3Vwcy5HcmlkLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgYWN0aW9uOiB0aGlzLmRvdEFjdFxyXG4gICAgICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0U2V6bmFtWmFwaXN1U3RhdnVEdG8vKiYgR1Nlem5hbVphcGlzdVN0YXZ1RHRvKi8+IHtcclxuICAgICAgICAgICAgdmFyIGdmID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1VjdFNlem5hbVphcGlzdVN0YXZ1RHRvPigpO1xyXG4gICAgICAgICAgICAvL3ZhciB0b3BvR3JvdXAgPSBcInRvcG9cIjtcclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFN0cnVjdHVyZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRva2xhZHlcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDIzMVwiLCAvL1JDIDMxMTAwMjMxIDogRG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgIGdyb3VwaW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3ByZXNldENhcHRpb246IFwianJlczozMTEwMDIzMVwiLCAvL1JDIDMxMTAwMjMxIDogRG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cGluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzaDogKG1ldGEsIHJvd3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZCA9IG1ldGEuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7ZC5hY318JHtkLm1lc2ljfXwke2Qucm9rfXwke2QubGljfXwke2QuaWNvfXwke2QudWNzfWA7IC8vTk9URTogUHJpZGF0IGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcImFjXCIpLCB1IHZzZWNoIHRlY2h0byBzbG91cGN1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJyb2ssbGljLGljbyx1Y3MsbWVzaWMsYWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVDb2x1bW46IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nbG9iYWxzLlJlemltUHJvdm96dSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5OS1M6IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5VQ1M6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMubmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LklDTzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcInVjc1wiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudWNzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLnVjcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuaWNvLCBha3RQcm9obDogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5ha3RQcm9obFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgb25seUFjdGl2ZTogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5vbmx5QWN0aXZlLCBjYXB0aW9uOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmNhcHRpb24sIG5hbWU6IFwidWNzXCIsIGZpcnN0RmllbGQ6IHVuZGVmaW5lZCwgc2Vjb25kRmllbGQ6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwidWNzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiAhISh0aGlzLlJhZGVrX0RQSCkgJiYgISF0aGlzLkZpbHRlci51Y3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuQXZvaWRVdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuVXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51dXNJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudXVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnV1c0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmljbywgdWNzOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLnVjcywgYWt0UHJvaGw6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuYWt0UHJvaGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuY2FwdGlvbiwgbmFtZTogXCJ1dXNcIiwgZmlyc3RGaWVsZDogdW5kZWZpbmVkLCBzZWNvbmRGaWVsZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwidXVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkaXNhYmxlZDogISEodGhpcy5SYWRla19EUEgpICYmICEhdGhpcy5GaWx0ZXIudWNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkF2b2lkTmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLm5rc0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy5ua3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LlNPUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5LkljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5LkljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwiaWNvXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiB0aGlzLkV4dGVybmlTdW1hcml6YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBHb3JkaWMuRWtvLkZpbHRlcnMucmFySW50ZXJ2YWwoeyBtb2RlbDogXCJpY29cIiwgb25seUFjdGl2ZTogZmFsc2UsIGNhcHRpb246IHRoaXMuemtyYXRreS5JY28sIGRpc2FibGVkOiAhISh0aGlzLlJhZGVrX0RQSCkgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IEdvcmRpYy5Fa28uRmlsdGVycy5pY29JbnRlcnZhbCh7IG1vZGVsOiBcImljb1wiLCBvbmx5QWN0aXZlOiBmYWxzZSwgY2FwdGlvbjogdGhpcy56a3JhdGt5LkljbywgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLkF2b2lkRXh0IHx8IHRoaXMuZ2xvYmFscy5UeXBTdW1hcml6YWNlICE9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwU3VtYXJpemFjZS5FeHRlcm5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwidWNzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudWNzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLnVjcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5pY28sIGFrdFByb2hsOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmFrdFByb2hsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgb25seUFjdGl2ZTogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5vbmx5QWN0aXZlLCBjYXB0aW9uOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmNhcHRpb24sIG5hbWU6IFwidWNzXCIsIGZpcnN0RmllbGQ6IHVuZGVmaW5lZCwgc2Vjb25kRmllbGQ6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcInVjc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKSAmJiAhIXRoaXMuRmlsdGVyLnVjc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuQXZvaWRVdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLnV1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmljbywgdWNzOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLnVjcywgYWt0UHJvaGw6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuYWt0UHJvaGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgb25seUFjdGl2ZTogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5vbmx5QWN0aXZlLCBjYXB0aW9uOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmNhcHRpb24sIG5hbWU6IFwidXVzXCIsIGZpcnN0RmllbGQ6IHVuZGVmaW5lZCwgc2Vjb25kRmllbGQ6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJ1dXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkaXNhYmxlZDogISEodGhpcy5SYWRla19EUEgpICYmICEhdGhpcy5GaWx0ZXIudWNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkF2b2lkTmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMubmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdmFyIGRyZFNlcnZlckZpbHRlciA9IEdvcmRpYy5Fa28uRmlsdGVycy5kcmQodGhpcy5maWx0ZXJPcHRpb25zLmRyZCk7XHJcbiAgICAgICAgICAgIC8vLy8gcHJvIGJhbGFuY292YW5pIG5lbmkgemFkbnkgZmlsdGVyXHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGRyZFNlcnZlckZpbHRlciA9IEdvcmRpYy5Fa28uRmlsdGVycy5kcmQodGhpcy5maWx0ZXJPcHRpb25zLmRyZCk7XHJcblxyXG4gICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkcmRcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1MiBcIiwgLy9SQyAzMTEwMDA1MiA6IEhcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAxMDJcIiwgLy9SQyAzMTEwMDEwMiA6IERydWggZG9rbGFkdSAoRFJEKVxyXG4gICAgICAgICAgICAgICAgLy90b29sdGlwVGVtcGxhdGU6IFwianJlczozMTEwMDEwMlwiLCAvL1JDIDMxMTAwMTAyIDogRHJ1aCBkb2tsYWR1IChEUkQpXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IGRyZFNlcnZlckZpbHRlci8vR29yZGljLkVrby5GaWx0ZXJzLmRyZCh0aGlzLmZpbHRlck9wdGlvbnMuZHJkKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm1lc2ljXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTEgXCIsIC8vUkMgMzExMDAwNTEgOiBNXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMDExXCIsIC8vUkMgMzExMDAwMTEgOiBNxJtzw61jXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJtZXNpY1wiKSxcclxuICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJtZXNpY1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTFcIiwgZGlzYWJsZWQ6ICEhKHRoaXMuRmlsdGVyICYmIHRoaXMuU3RyaWN0RmlsdGVyICYmIHRoaXMuRmlsdGVyLm1lc2ljKSB9KSAvL1JDIDMxMTAwMDUxIDogTVxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1lc2ljXCIsIGNhcHRpb246IFwianJlczozMTEwMDA1MVwiLCAvL1JDIDMxMTAwMDUxIDogTVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhISh0aGlzLkZpbHRlciAmJiB0aGlzLlN0cmljdEZpbHRlciAmJiB0aGlzLkZpbHRlci5tZXNpYyksXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RGaWVsZDogeyB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJhbmdlKHsgbWluOiAxLCBtYXg6IDEzIH0pXSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEZpZWxkOiB7IHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDEsIG1heDogMTMgfSldIH0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuWmFwaXNvdmEpIHtcclxuICAgICAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTMgXCIsIC8vUkMgMzExMDAwNTMgOiBEXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDEzMFwiLCAvL1JDIDMxMTAwMTMwIDogRGVuXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJkZW5cIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDUzXCIsIGRpc2FibGVkOiAhISh0aGlzLkZpbHRlciAmJiB0aGlzLlN0cmljdEZpbHRlciAmJiB0aGlzLkZpbHRlci5kZW4pIH0pIC8vUkMgMzExMDAwNTMgOiBEXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkZW5cIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDUzXCIsIC8vUkMgMzExMDAwNTMgOiBEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiAhISh0aGlzLkZpbHRlciAmJiB0aGlzLlN0cmljdEZpbHRlciAmJiB0aGlzLkZpbHRlci5kZW4pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDEsIG1heDogMzEgfSldIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZEZpZWxkOiB7IHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmFuZ2UoeyBtaW46IDEsIG1heDogMzEgfSldIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJsaWNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkxJQ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICBoaWRkZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwibGljXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vLy9zZXJ2ZXJGaWx0ZXI6IC8vVE9ET1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTRcIiwgLy9SQyAzMTEwMDA1NCA6IERva2xhZFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA3MCxcclxuICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJhY1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5hY0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy5hYylcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1BvcGlzU3RydWt0KVxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwZG9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU1XCIsIC8vUkMgMzExMDAwNTUgOiBTdHJ1a3R1cm92YW7DvSBwb3BpcyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgLy9oaWRkZW46ICEodGhpcy5wYXJlbnRDbnQudXNlclNldHRpbmdzPy5nZXQoXCJzdHJ1a3R1cm92YW55UG9waXNEb2tsYWR1QXV0b0FkZEdyaWRDb2x1bW5zXCIpIGFzIGJvb2xlYW4gPz8gZmFsc2UpLCAgICAgICAgICAgIC8vTk9URTogViBUSyBtYWppIHNrcnl0bywgYnl2YSB2aWRldCBwb2xlICdwb3BpcycsIGtkZSBqZSBzdGVqbnkgcHJlZmFiXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdTaW5nbGUoeyBtb2RlbDogXCJwZG9rXCIsIGNhcHRpb246IFwianJlczozMTEwMDA1NVwiIH0pIC8vUkMgMzExMDAwNTUgOiBTdHJ1a3R1cm92YW7DvSBwb3BpcyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2YuYWRkU29ydGVkRWtvQ2Z1U2V0KHRoaXMuZ2V0Q2Z1U2V0U2VydmVyRmlsdGVycyh0cnVlKSk7XHJcblxyXG5cclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzFcIiwgLy9SQyAzMTEwMDA3MSA6IFBvcGlzIMWZw6Fka3VcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdTaW5nbGUoeyBtb2RlbDogXCJwb3Bpc1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzFcIiB9KSAvL1JDIDMxMTAwMDcxIDogUG9waXMgxZnDoWRrdVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBnZi5hZGRQaWQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgIC8vY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc1XCIsIC8vUkMgMzExMDAwNzUgOiBQSURcclxuICAgICAgICAgICAgICAgIC8vZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1MVwiLCAvL1JDIDMxMTAwMjUxIDogUHJ2b3Ruw60gaWRlbnRpZmlrw6F0b3IgcHJpbcOhcm7DrWhvIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5peHAoeyBtb2RlbDogXCJpeHBcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNjYzXCIgfSkgLy9SQyAzMDI1MDY2MyA6IElkZW50aWZpa8OhdG9yXHJcbiAgICAgICAgICAgIH0pOyAgIFxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImMwXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTZcIiwgLy9SQyAzMTEwMDA1NiA6IE1EXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjQzXCIsIC8vUkMgMzExMDAyNDMgOiBNw6EgRMOhdGlcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMFwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTZcIiB9KSAvL1JDIDMxMTAwMDU2IDogTURcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYzFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1N1wiLCAvL1JDIDMxMTAwMDU3IDogRGFsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzFcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU3XCIgfSkgLy9SQyAzMTEwMDA1NyA6IERhbFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMGMxXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwOTBcIiwgLy9SQyAzMTEwMDA5MCA6IE1ELURhbFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI0NFwiLCAvL1JDIDMxMTAwMjQ0IDogTcOhIETDoXRpIC0gRGFsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiAhdGhpcy5nbG9iYWxzLlJhZF9ab2JyYXpNZERhbCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwYzFcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDkwXCIgfSkgLy9SQyAzMTEwMDA5MCA6IE1ELURhbFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZ2xvYmFscy5UeXBQcmFjZVdmbCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY19hZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA3N1wiLCAvL1JDIDMxMTAwMDc3IDogQWdlbmRvdsOpIMSNw61zbG9cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiYWNfYWdcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc3XCIgfSkgLy9SQyAzMTEwMDA3NyA6IEFnZW5kb3bDqSDEjcOtc2xvXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDI4MVwiLCAvL1JDIDMwMjUwMjgxIDogVHlwIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogXCJ7aXhzX3R5cF90eHQ6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbnRhYmxlOiBcIiNyZW5kZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBncm91cGluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJpeHNfdHlwX3R4dFwiKSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuVWNyLldlYkNsaWVudC5GaWx0ZXJQcmVmYWJzLnR5cF9hZyh7IG1vZGVsOiBcInR5cF9hZ1wiLCB6a3JfYWdQYXRoOiBcInR5cF9hZ190eHRcIiwgaXNSb3pwb2NldDogdGhpcy5Sb3pwb2NldCwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc5XCIgfSkgLy9SQyAzMTEwMDA3OSA6IEFnZW5kYVxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnNzbFR5cEludGVydmFsKHsgbW9kZWw6IFwiaXhzX3R5cD1peHNfdHlwO2l4c190eXBfdHh0PW5hemV2XCIsIGNhcHRpb246IFwianJlczozMDI1MDI4MVwiIH0pIC8vUkMgMzAyNTAyODEgOiBUeXAgZG9rbGFkdSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zc2xUeXBJbnRlcnZhbCh7IG1vZGVsOiBcIml4c190eXBcIiwgemtyX2FnUGF0aDogXCJpeHNfdHlwX3R4dFwiLGNhcHRpb246IFwianJlczozMDI1MDI4MVwiIH0pIC8vUkMgMzAyNTAyODEgOiBUeXAgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldl9yZlwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDk3XCIsIC8vUkMgMzExMDAwOTcgOiBabcSbbnUgcHJvdmVkbFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ1NpbmdsZSh7IG1vZGVsOiBcIm5hemV2X3JmXCIsIGNhcHRpb246IFwianJlczozMTEwMDA5N1wiIH0pIC8vUkMgMzExMDAwOTcgOiBabcSbbnUgcHJvdmVkbFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDAxNVwiLCAvL1JDIDMxMTAwMDE1IDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTMwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGF0ZUludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IHZhbHVlVHlwZTogXCJkYXRldGltZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kRmllbGQ6IHsgdmFsdWVUeXBlOiBcImRhdGV0aW1lXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwMTVcIiAvL1JDIDMxMTAwMDE1IDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oeyAvL05PVEU6IFYgVEsgamUgdG8gcHJpZGFubyBqYWtvIEFkZExvb2t1cENvbHVtbiEgKGFyZy46IERldGFpbFR5cHVBZ2VuZHkuemtyX2FnKVxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfYWdcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA3OVwiLCAvL1JDIDMxMTAwMDc5IDogQWdlbmRhXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IFwie3R5cF9hZ190eHQ6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICBncm91cGluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcInR5cF9hZ190eHRcIiksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcHJpbnRhYmxlOiBcIiNyZW5kZXJcIixcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLlVjci5XZWJDbGllbnQuRmlsdGVyUHJlZmFicy50eXBfYWcoeyBtb2RlbDogXCJ0eXBfYWdcIiwgemtyX2FnUGF0aDogXCJ0eXBfYWdfdHh0XCIsIGlzUm96cG9jZXQ6IHRydWUsIGNhcHRpb246IFwianJlczozMTEwMDA3OVwiIH0pIC8vUkMgMzExMDAwNzkgOiBBZ2VuZGFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfc21sXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA2NzVcIiwgLy9SQyAzMDI1MDY3NSA6IFNNTCAtIGlkZW50aWZpa8OhdG9yXHJcbiAgICAgICAgICAgICAgICAvL2Rlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNTFcIiwgLy9SQyAzMTEwMDI1MSA6IFBydm90bsOtIGlkZW50aWZpa8OhdG9yIHByaW3DoXJuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nU2luZ2xlKHsgbW9kZWw6IFwiaXhwX3NtbFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA2NzVcIiB9KSAgLy9SQyAzMDI1MDY3NSA6IFNNTCAtIGlkZW50aWZpa8OhdG9yXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJyb2tfc21sXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA2NzdcIiwgLy9SQyAzMDI1MDY3NyA6IFNNTCAtIHJva1xyXG4gICAgICAgICAgICAgICAgLy9kZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjUxXCIsIC8vUkMgMzExMDAyNTEgOiBQcnZvdG7DrSBpZGVudGlmaWvDoXRvciBwcmltw6FybsOtaG8gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHsgbW9kZWw6IFwicm9rX3NtbFwiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA2NzdcIiB9KSAvL1JDIDMwMjUwNjc2IDogU01MIC0gcm9rXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjaXNsb19zbWxcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDY3OCBcIiwgLy9SQyAzMDI1MDY3OCA6IFNNTCAtIMSNw61zbG9cclxuICAgICAgICAgICAgICAgIC8vZGVzY3JpcHRpb246IFwianJlczozMTEwMDAxMVwiLCAvL1JDIDMxMTAwMDExIDogTcSbc8OtY1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgLy9hZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJtZXNpY1wiKSxcclxuICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJtZXNpY1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTFcIiwgZGlzYWJsZWQ6ICEhKHRoaXMuRmlsdGVyICYmIHRoaXMuU3RyaWN0RmlsdGVyICYmIHRoaXMuRmlsdGVyLm1lc2ljKSB9KSAvL1JDIDMxMTAwMDUxIDogTVxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJjaXNsb19zbWxcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA2NzlcIiwgLy9SQyAzMDI1MDY3OSA6IFNNTCAtIMSNw61zbG9cclxuICAgICAgICAgICAgICAgICAgICAvL2Rpc2FibGVkOiAhISh0aGlzLkZpbHRlciAmJiB0aGlzLlN0cmljdEZpbHRlciAmJiB0aGlzLkZpbHRlci5tZXNpYyksXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHRoaXMuUHJpeklpc3NwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWlzc3BEaXNhYmxlID0gdGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5JSVNTUF9QcmV1Y3RvdmFuaV9zdGF2eTtcclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaWRfaGRyX3Jpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA4MlwiLCAvL1JDIDMxMTAwMDgyIDogSUQgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjU1XCIsIC8vUkMgMzExMDAyNTUgOiBJZGVudGlmaWvDoXRvciByZXplcnZhY2Ugcm96cG/EjXRvdsO9Y2ggcHJvc3TFmWVka8WvIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpZF9oZHJfcmlzXCIsIGNhcHRpb246IFwianJlczozMTEwMDA4MlwiLCBkaXNhYmxlZDogaWlzc3BEaXNhYmxlLCBmaXJzdEZpZWxkOiB7IG1heExlbmd0aDogOSB9LCBzZWNvbmRGaWVsZDogeyBtYXhMZW5ndGg6IDkgfSB9KSAvL1JDIDMxMTAwMDgyIDogSUQgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAvL21heExlbmd0aDogOVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmFkZWtfaGRyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgzXCIsLy9SQyAzMTEwMDA4MyA6IMWZw6FkZWsgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjU2XCIsIC8vUkMgMzExMDAyNTYgOiDFmMOhZGVrIHJlemVydmFjZSByb3pwb8SNdG92w71jaCBwcm9zdMWZZWRrxa8gSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHsgbW9kZWw6IFwicmFkZWtfaGRyXCIsIGNhcHRpb246IFwianJlczozMTEwMDA4M1wiLCBkaXNhYmxlZDogaWlzc3BEaXNhYmxlIH0pIC8vUkMgMzExMDAwODMgOiDFmcOhZGVrIElJU1NQXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNfcHJlcF9haXNwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMzQ0XCIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1JDIDMwMjUwMzQ0IDogSUlTU1AgUMWZZXBvxI10ZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDM5LC8vIGZpeGVkV2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiY2VudGVyXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGljb25UZW1wbGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc19wcmVwX2Fpc3AgIT0gbnVsbCAmJiBkYXRhLnNfcHJlcF9haXNwID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWNoZWNrLWNpcmNsZSBnLXN0YXRlLXRleHQgZy1zdGF0ZS1zdWNjZXNzXCIsIHRleHQ6IFwianJlczozMDI1MDM0NFwiLCAvL1JDIDMwMjUwMzQ0IDogSUlTU1AgUMWZZXBvxI10ZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90b29sdGlwOiBcImpyZXM6MzAyNTAyODhcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuaWRfaGRyX3JpcyAhPSBudWxsICYmIGRhdGEuaWRfaGRyX3JpcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktZXhjbGFtIGctc3RhdGUtZXJyb3JcIiwgdGV4dDogXCJqcmVzOjMwMjUwMzQ1XCIsIC8vUkMgMzAyNTAzNDUgOiBOZXpwcmFjb3bDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90b29sdGlwOiBcImpyZXM6MzAyNTAyODlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy8vLyB0ZXh0dSB6IHJvenZyaHVcclxuICAgICAgICAgICAgLy9pZiAodGhpcy5kaXNwbGF5VGV4dHlaUm96dnJodSgpKSB7XHJcbiAgICAgICAgICAgIC8vICAgIC8vIHpqaXN0ZW5pIHByZWRuYXN0YXZlbnljaCBzbG92IHJvenZyaHVcclxuICAgICAgICAgICAgLy8gICAgbGV0IHNsb3ZhUm96dnJodSA9IHRoaXMucGFyZW50Q250Lmdsb2JhbFNldHRpbmdzPy5nZXQoXCJHbG9iYWwuVWNyLkFwcFNldHRpbmdzLlVjdFNldHRpbmdzRm9ybS5zZWxlY3RlZFdvcmRzU2hvd0dyaWRDb2x1bW5zXCIpIGFzIEdTbG92YVJvenZyaEZpbHRlckR0b1tdO1xyXG5cclxuICAgICAgICAgICAgLy8gICAgLy8gcHJldnpldGkgc2xvdXBjdSAgICBcclxuICAgICAgICAgICAgLy8gICAgc2xvdmFSb3p2cmh1LmZvckVhY2goZnVuY3Rpb24gKHNsb3VwZWMpIHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IHNsb3VwZWMuaG9kbm90YSEgKyBcIl90eHRcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA1OTRcIi5mb3JtYXQoc2xvdXBlYy5rbGljISksIC8vUkMgMzAyNTA1OTQgOiB7MH0gLSBwb3Bpc1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ1NpbmdsZSh7IG1vZGVsOiBzbG91cGVjLmhvZG5vdGEhLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwOTdcIiB9KSAvL1JDIDMxMTAwMDk3IDogWm3Em251IHByb3ZlZGxcclxuICAgICAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICB9KTtcclxuICAgICAgICAgICAgLy99XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ2YgYXMgYW55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZVByb2ZpbGVzKGdmOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0byAvKiYgR1Nlem5hbVphcGlzdVN0YXZ1RHRvKi8+KTogSUdTZXpuYW1aYXBpc3VQcm9maWxlcyB7XHJcbiAgICAgICAgICAgIGxldCBwcm9maWxlczogSUdTZXpuYW1aYXBpc3VQcm9maWxlcyA9IHtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHsgbmFtZTogXCJqcmVzOjMxMTAwMjMyXCIsIGNvbHVtbnM6IHt9IH0gLy9SQyAzMTEwMDIzMiA6IFbDvWNob3rDrVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZi5jb2x1bW5zLmZpbHRlcigoYykgPT4geyByZXR1cm4gIWMuaGlkZGVuOyB9KVxyXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGMpID0+IHsgcHJvZmlsZXMuZGVmYXVsdC5jb2x1bW5zIVtjLm5hbWUhXSA9IHsgaGlkZGVuOiBmYWxzZSB9IH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuWmFwaXNvdmEpIHtcclxuICAgICAgICAgICAgICAgIHByb2ZpbGVzLmRlZmF1bHQubmFtZSA9IFwianJlczozMTEwMDI0MVwiOyAvL1JDIDMxMTAwMjQxIDogWsOhcGlzeSAodsO9Y2hvesOtKVxyXG4gICAgICAgICAgICAgICAgcHJvZmlsZXMuZG9rbGFkeSA9IHsgbmFtZTogXCJqcmVzOjMxMTAwMjMxXCIsIGNvbHVtbnM6IHt9LCBncm91cGluZzogXCJkb2tsYWR5XCIgfTsgLy9SQyAzMTEwMDIzMSA6IERva2xhZHlcclxuICAgICAgICAgICAgICAgIHByb2ZpbGVzLmRva2xhZHkuY29sdW1ucyA9ICQuZXh0ZW5kKHtcclxuICAgICAgICAgICAgICAgICAgICBkb2tsYWR5OiB7IGhpZGRlbjogISh0aGlzLnBhcmVudENudC51c2VyU2V0dGluZ3M/LmdldChcInN0cnVrdHVyb3ZhbnlQb3Bpc0Rva2xhZHVBdXRvQWRkR3JpZENvbHVtbnNcIikgYXMgYm9vbGVhbiA/PyBmYWxzZSkgfSxcclxuICAgICAgICAgICAgICAgICAgICBwZG9rOiB7IGhpZGRlbjogISh0aGlzLnBhcmVudENudC51c2VyU2V0dGluZ3M/LmdldChcInN0cnVrdHVyb3ZhbnlQb3Bpc0Rva2xhZHVBdXRvQWRkR3JpZENvbHVtbnNcIikgYXMgYm9vbGVhbiA/PyBmYWxzZSkgfVxyXG4gICAgICAgICAgICAgICAgfSwgcHJvZmlsZXMuZGVmYXVsdC5jb2x1bW5zKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHByb2ZpbGVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAgVnl0dm/FmWVuw60gYWtjw60gXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ6b2JyYXppdFN0dWt0UG9waXNBY3RcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDYyNlwiLCAvL1JDIDMwMjUwNjI2IDogU2xvdXBlYyBTUERcclxuICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMDI1MDYyNVwiLCAvL1JDIDMwMjUwNjI1IDogViBzZXpuYW11IGplIHDFmWlkw6FuL29kc3RyYW7Em24gc2xvdXBlYyBTdHJ1a3R1cm92YW7DvSBwb3BpcyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImdpLXVuY2hlY2tcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGVja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hlY2tlZCA9IHRoYXQucGFyZW50Q250LmFjdGlvbnMuem9icmF6aXRTdHVrdFBvcGlzQWN0Py5jaGVja2VkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZCA9ICEodHlwZW9mIGNoZWNrZWQgPT0gXCJ1bmRlZmluZWRcIiA/IGZhbHNlIDogY2hlY2tlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93UG9waXNTdHJ1a3RPbGQgPSAoIWNoZWNrZWQpIGFzIGJvb2xlYW47XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuYWN0aW9ucy56b2JyYXppdFN0dWt0UG9waXNBY3Q/LmNoZWNrZWQoY2hlY2tlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0Lm1hbnVhbGx5U3RhcnRlZFN0cnVrdFBvcGlzID0gY2hlY2tlZDsgICBcclxuICAgICAgICAgICAgICAgICAgICAvL2xldCBjYXB0aW9uID0gKGNoZWNrZWQpID8gXCJqcmVzOjMwMjUwNjI5XCIgLy9SQyAzMDI1MDYyOSA6IE5hxI3DrXN0IGJleiBTUERcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICA6IFwianJlczozMDI1MDYyNlwiOyAvL1JDIDMwMjUwNjI2IDogU2xvdXBlYyBTUERcclxuICAgICAgICAgICAgICAgICAgICAvL2xldCB0b29sdGlwID0gKGNoZWNrZWQpID8gXCJqcmVzOjMwMjUwNjI4XCIgLy9SQyAzMDI1MDYyOCA6IHYgc2V6bmFtdSBqZSBvZHN0cmFuxJtuIHNsb3VwZWMgU3RydWt0dXJvdmFuw70gcG9waXMgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIDogXCJqcmVzOjMwMjUwNjI1XCI7IC8vUkMgMzAyNTA2MjUgOiBWIHNlem5hbXUgamUgcMWZaWTDoW4vb2RzdHJhbsSbbiBzbG91cGVjIFN0cnVrdHVyb3ZhbsO9IHBvcGlzIGRva2xhZHVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LnBhcmVudENudC5hY3Rpb25zLnpvYnJheml0U3R1a3RQb3Bpc0FjdD8udXBkYXRlKHsgY2FwdGlvbjogY2FwdGlvbiwgdG9vbHRpcDogdG9vbHRpcCB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5hY3Rpb25zLnpvYnJheml0U3R1a3RQb3Bpc0FjdD8udXBkYXRlKHsgaWNvbjogKGNoZWNrZWQgPyBcImdpLWNoZWNrXCIgOiBcImdpLXVuY2hlY2tcIikgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93UG9waXNTdHJ1a3QgPSBjaGVja2VkO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucmVDcmVhdGVHcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzbWxEZXRhaWxBY3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmlzaWJsZTp0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNjgwXCIsIC8vUkMgMzAyNTA2ODAgOiBQxZnDrXBhZCBTTUxcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtZXh0ZXJuYWwtbGlua1wiLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLnNob3dQcmltRG9rbGFkKHZvaWQgMCxcIlNNTFwiKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoeyBcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiemFwaXN5QWN0XCIsXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTI0XCIsIC8vUkMgMzExMDAxMjQgOiBaw6FwaXN5XHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuc2hvd1phcGlzeSgpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL3RoaXMuZG9rbGFkQWN0ID1cclxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZG9rbGFkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDIzM1wiLCAvL1JDIDMxMTAwMjMzIDogRG9rbGFkeS96w6FwaXN5XHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMudG9nZ2xlR3JvdXBpbmcoKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy90aGlzLnByaW1kb2tsYWRBY3QgPVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpbWRva2xhZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZmEtZXh0ZXJuYWwtbGlua1wiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAxNTRcIiwgLy9SQyAzMDI1MDE1NCA6IFByaW0uIGRva2xhZFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLnNob3dQcmltRG9rbGFkKCk7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZmlsdGVyUGlkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbCA9IGdyaWQuZ2dyaWQ8VWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWwubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkc2VydmVyZmlsdGVyKFwiY2xlYXJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkc2VydmVyZmlsdGVyKFwiYXBwbHlcIiwgeyBpeHA6IHNlbFswXS5peHAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb0ZpbHRlckNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzaERva2xhZHlBY3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vTk9URTogSmFrIHRvIGRlbGFqaSB2IHRsdXN0eW06IEdTZXpuYW1VY3RaYXpuYW11U3RhdnlaYXBpc3lUYWIubV9BY3Rpb25Eb2tsYWR5X1N0YXJ0KCk6IFxyXG4gICAgICAgICAgICAgICAgLy9Qcm92ZWRvdSBzZXNrdXBlbmksIGt0ZXJlIHByaWRhamkgamFrbyBub3ZlIHJhZGt5IGEgcGFrIHphZmlsdHJ1amkgcG91emUgbmEgc291Y3RvdmUgcmFka3lcclxuICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4geyB0aGlzLnRvZ2dsZUdyb3VwaW5nKHRoaXMucHJvZmlsZXMuZG9rbGFkeSEubmFtZSk7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzaFphcGlzeUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHsgdGhpcy50b2dnbGVHcm91cGluZyh0aGlzLnByb2ZpbGVzLmRlZmF1bHQubmFtZSk7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByZWdlbmVyb3ZhbmkgZ3JpZm9ybWF0dVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZUNyZWF0ZUdyaWRGb3JtYXQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJlZm9yZUxvYWRpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVWRhbG9zdCBwcmVkIHZsYXN0bmltIG5hY3RlbmltLiBMemUgenJ1c2l0IG5hY3RlbmlcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBiZWZvcmVMb2FkaW5nKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy9sZXQgc2hvd1BvcGlzU3RydWt0UG9sb3preU5ldyA9IHRoYXQucGFyZW50Q250LnVzZXJTZXR0aW5ncz8uZ2V0KFwicm96c2lyZW55UG9waXNBdXRvQWRkR3JpZENvbHVtbnNcIikgYXMgYm9vbGVhbiA/PyBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHNob3dQb3Bpc1N0cnVrdE5ldyA9IHRoYXQucGFyZW50Q250LnVzZXJTZXR0aW5ncz8uZ2V0KFwic3RydWt0dXJvdmFueVBvcGlzRG9rbGFkdUF1dG9BZGRHcmlkQ29sdW1uc1wiKSBhcyBib29sZWFuID8/IGZhbHNlO1xyXG4gICAgICAgICAgICAvL2xldCBzaG93RXN1TmV3ID0gKHRoYXQucGFyZW50Q250LnVzZXJTZXR0aW5ncz8uZ2V0KFwiZXN1QWRkR3JpZENvbHVtbnNcIikgYXMgYm9vbGVhbiA/PyBmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vbGV0IGNvbHVtbnNQb3Bpc1N0cnVrdE5ldyA9ICh0aGF0LnBhcmVudENudC51c2VyU2V0dGluZ3M/LmdldChcInJvenNpcmVueVBvcGlzU2hvd0dyaWRDb2x1bW5zXCIpKTtcclxuICAgICAgICAgICAgLy90aGF0LnNob3dFc3UgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLnpvYnJheml0RVNVQWN0Py5jaGVja2VkKCkgYXMgYm9vbGVhbjtcclxuICAgICAgICAgICAgLy90aGF0LnNob3dQb3Bpc1N0cnVrdFBvbG96a3kgPSB0aGF0LnBhcmVudENudC5hY3Rpb25zLnpvYnJheml0U3R1a3RQb3Bpc1BvbEFjdD8uY2hlY2tlZCgpIGFzIGJvb2xlYW47XHJcbiAgICAgICAgICAgIHRoYXQuc2hvd1BvcGlzU3RydWt0ID0gdGhhdC5wYXJlbnRDbnQuYWN0aW9ucy56b2JyYXppdFN0dWt0UG9waXNBY3Q/LmNoZWNrZWQoKSBhcyBib29sZWFuO1xyXG5cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgc2hvd1BvcGlzU3RydWt0TmV3ICE9IHRoYXQuc2hvd1BvcGlzU3RydWt0XHJcbiAgICAgICAgICAgICAgICB8fCB0aGF0LnNob3dQb3Bpc1N0cnVrdE9sZCAhPSB0aGF0LnNob3dQb3Bpc1N0cnVrdFxyXG4gICAgICAgICAgICAgICAgLy98fCB0aGF0LnNob3dQb3Bpc1N0cnVrdFBvbG96a3kgIT0gc2hvd1BvcGlzU3RydWt0UG9sb3preU5ld1xyXG4gICAgICAgICAgICAgICAgfHwgdGhhdC5zaG93UG9waXNTdHJ1a3QgIT0gc2hvd1BvcGlzU3RydWt0TmV3XHJcbiAgICAgICAgICAgICAgICAvL3x8IHRoYXQuYWRkU3RyUG9waXNDb2x1bW5zICE9IGNvbHVtbnNQb3Bpc1N0cnVrdE5ld1xyXG4gICAgICAgICAgICApIHtcclxuIFxyXG4gICAgICAgICAgICAgICAgaWYgKHNob3dQb3Bpc1N0cnVrdE5ldylcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dQb3Bpc1N0cnVrdCA9IHNob3dQb3Bpc1N0cnVrdE5ldztcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1ucyA9IHRoYXQuY3JlYXRlR3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gc3BvbGVjbmUgc2xvdXBjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDb21tb25Db2xzKGNvbHVtbnMpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlYXJjaEl0ZW1zID0gY29sdW1ucy5jb2x1bW5zLmZpbHRlcihjID0+IGMuY29sdW1uVHlwZSAhPT0gXCJkYXRldGltZVwiICYmIGMuY29sdW1uVHlwZSAhPT0gXCJjdXJyZW5jeVwiKS5tYXAoZSA9PiBcIipcIiArIGUubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1uc09sZCA9IGdyaWQuZ2dyaWQoXCJvcHRpb25cIiwgXCJjb2x1bW5zXCIpIGFzIEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8YW55PjtcclxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5zT2xkLmNvbHVtbnMubGVuZ3RoICE9IGNvbHVtbnMuY29sdW1ucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwib3B0aW9uXCIsIFwiY29sdW1uc1wiLCBjb2x1bW5zKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVzZXJQcm9maWwgPSBncmlkLmdncmlkKFwiZ2V0Q3VycmVudFByb2ZpbGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlclByb2ZpbC5jb2x1bW5MaXN0ID0gY29sdW1ucy5jb2x1bW5zLm1hcCgoYykgPT4gYy5uYW1lKS5qb2luKFwiLFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR0Vrb1Nlem5hbURwaEZpbHRlckR0bz4oXCJ1c2VQcm9maWxlXCIsIHsgbmFtZTogdXNlclByb2ZpbC5uYW1lIS8qICsgbmFtZVByb2ZpbGVQb3N0Rml4Ki8sIGNvbHVtbkxpc3Q6IHVzZXJQcm9maWwuY29sdW1uTGlzdCB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGRvcGxuZW5pIHZ5aGxlZGF2YWNpY2ggcG9saVxyXG4gICAgICAgICAgICAgICAgbGV0IHNlYXJjaEl0ZW1zT2xkID0gZ3JpZC5nZ3JpZChcIm9wdGlvblwiLCBcInNlYXJjaENvbHVtbnNcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNlYXJjaEl0ZW1zT2xkICE9PSBcInVuZGVmaW5lZFwiICYmIHNlYXJjaEl0ZW1zT2xkICE9IFwiKlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlYXJjaEl0ZW1zT2xkLmxlbmd0aCAhPSBzZWFyY2hJdGVtcy5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWQuZ2dyaWQoXCJvcHRpb25cIiwgXCJzZWFyY2hDb2x1bW5zXCIsIHNlYXJjaEl0ZW1zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuaSBmb3JtdWxhcmUgc2UgemFwaXN5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHNob3daYXBpc3koKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aXRsZSA9IFwianJlczozMTEwMDIyNFwiOyAvL1JDIDMxMTAwMjI0IDogWsOhcGlzeSBzdGF2dVxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RmlsdGVyKClcclxuICAgICAgICAgICAgICAgIC50aGVuKChmKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4gO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWwgPSBncmlkLmdncmlkPFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPihcImdldFNlbGVjdGlvblwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggIT09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHNlbFswXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkOiBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcjogR0Vrb0ZpbHRlckR0bztcclxuICAgICAgICAgICAgICAgICAgICAvL05PVEU6IE9kcG92aWRhIHogVEsgVUNSOiBHU2V6bmFtWmFwaXN1VlJhZGt1VGFiLkxvYWRHcmlkRGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHsgc3RhcnQ6IHJvdy5pY28hLCBlbmQ6IHJvdy5pY28hIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Y3M6IHsgc3RhcnQ6IHJvdy51Y3MhLCBlbmQ6IHJvdy51Y3MhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dXM6IHsgc3RhcnQ6IHJvdy51dXMhLCBlbmQ6IHJvdy51dXMhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBua3M6IHsgc3RhcnQ6IHJvdy5ua3MhLCBlbmQ6IHJvdy5ua3MhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNpYzogeyBzdGFydDogMCwgZW5kOiByb3cubWVzaWMgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyZF9tc2s6IHJvdy5kcmQhLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZnU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWE6IHsgc3RhcnQ6IHJvdy51ZWEhLCBlbmQ6IHJvdy51ZWEhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWViOiB7IHN0YXJ0OiByb3cudWViISwgZW5kOiByb3cudWViISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlYzogeyBzdGFydDogcm93LnVlYyEsIGVuZDogcm93LnVlYyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWQ6IHsgc3RhcnQ6IHJvdy51ZWQhLCBlbmQ6IHJvdy51ZWQhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVlOiB7IHN0YXJ0OiByb3cudWVlISwgZW5kOiByb3cudWVlISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZjogeyBzdGFydDogcm93LnVlZiEsIGVuZDogcm93LnVlZiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWc6IHsgc3RhcnQ6IHJvdy51ZWchLCBlbmQ6IHJvdy51ZWchIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVoOiB7IHN0YXJ0OiByb3cudWVoISwgZW5kOiByb3cudWVoISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlaTogeyBzdGFydDogcm93LnVlaSEsIGVuZDogcm93LnVlaSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWo6IHsgc3RhcnQ6IHJvdy51ZWohLCBlbmQ6IHJvdy51ZWohIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVrOiB7IHN0YXJ0OiByb3cudWVrISwgZW5kOiByb3cudWVrISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlbDogeyBzdGFydDogcm93LnVlbCEsIGVuZDogcm93LnVlbCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZW06IHsgc3RhcnQ6IHJvdy51ZW0hLCBlbmQ6IHJvdy51ZW0hIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVuOiB7IHN0YXJ0OiByb3cudWVuISwgZW5kOiByb3cudWVuISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlMDogeyBzdGFydDogcm93LnRlMCEsIGVuZDogcm93LnRlMCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTE6IHsgc3RhcnQ6IHJvdy50ZTEhLCBlbmQ6IHJvdy50ZTEhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGUyOiB7IHN0YXJ0OiByb3cudGUyISwgZW5kOiByb3cudGUyISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlMzogeyBzdGFydDogcm93LnRlMyEsIGVuZDogcm93LnRlMyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTQ6IHsgc3RhcnQ6IHJvdy50ZTQhLCBlbmQ6IHJvdy50ZTQhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU1OiB7IHN0YXJ0OiByb3cudGU1ISwgZW5kOiByb3cudGU1ISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlNjogeyBzdGFydDogcm93LnRlNiEsIGVuZDogcm93LnRlNiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTc6IHsgc3RhcnQ6IHJvdy50ZTchLCBlbmQ6IHJvdy50ZTchIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU4OiB7IHN0YXJ0OiByb3cudGU4ISwgZW5kOiByb3cudGU4ISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlOTogeyBzdGFydDogcm93LnRlOSEsIGVuZDogcm93LnRlOSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLnBhcmVudENudC5UeXBVbG9oeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVN0YXY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBVbG9oeSA9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVWNldG5pY3R2aVphcGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBcInVjdFphcGlzeSNcIjsgLy9OT1RFOiBNdXNpIGJ5dCBzdGVqbmUgbmkgbmEgTWFpbkFwcC5jc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5Sb3pwb2NldFN0YXY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBVbG9oeSA9IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUm96cG9jZXRaYXBpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gXCJyb3paYXBpc3kjXCI7IC8vTk9URTogTXVzaSBieXQgc3Rlam5lIG5pIG5hIE1haW5BcHAuY3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250bzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cFVsb2h5ID0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvWmFwaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZCA9IFwic2V6bmFtU2FsZG9rb250byNcIjsgLy9OT1RFOiBNdXNpIGJ5dCBzdGVqbmUgbmkgbmEgTWFpbkFwcC5jc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgR0Vycm9yKFwiTm90U3VwcG9ydGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Q250Lm5hdmlnYXRlKCdHb3JkaWMuVWNyLldlYkNsaWVudC5HU2V6bmFtRWtvWmF6bmFtdScsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUeXBVbG9oeTogdHlwVWxvaHksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEZpbHRlcjogZmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDdXJyZW50Um93OiByb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFN0cmljdEZpbHRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRmlsdGVyU3RyUG9waXM6IGYuZmlsdGVyU3RyUG9waXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF1dG9Mb2FkRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAvKipcclxuICAgICAgICAqIERlZmluaWNlIG1lbnUgYmFydVxyXG4gICAgICAgICogQHBhcmFtIHR5cFVsb2h5XHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgRGVmaW5lTWVudUJhcih0eXBVbG9oeTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZSk6IE1lbnVQYXJhbXNbXSB7XHJcbiAgICAgICAgICAgIGxldCBtZW51ID0gc3VwZXIuRGVmaW5lTWVudUJhcih0eXBVbG9oeSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5zbWxEZXRhaWxBY3QsIGZhdm9yaXRlOiB0cnVlIH0pOyAgIFxyXG4gICAgICAgICAgICBtZW51LnVuc2hpZnQoeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuem9icmF6aXRTdHVrdFBvcGlzQWN0LCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lbnU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxufSJdfQ==