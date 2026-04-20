"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            class GSeznamEkoUctZapis extends WebClient.GSeznamEkoZaznamuBase {
                constructor(content) {
                    super(content);
                    /** Globalni modulove parametry v JS */
                    this.logOptions = { name: "GSeznamEkoUctZapis", authorCode: 302, file: "GSeznamEkoUctZapis.ts" };
                    this.pouzivanStrukPopis = true;
                    this.povolenNahled = true;
                    // definice tasku pro seznam a nacteni poctu
                    this.taskList = this.parentCnt.isl.UcrUcetniZapis.list();
                    this.taskCount = this.parentCnt.isl.UcrUcetniZapis.count();
                    // moznost ukladani historie filtru
                    this.rememberHistory = true;
                    // pouzivat texty z rozvrhu
                    this.useTextyZRozvrhu = true;
                    // pouzivat filtr na PAP radky
                    this.usePapRows = true;
                    this.myKeys = "rok,lic,ico,ucs,mesic,ac,radek_z";
                    this._nastaveniAkci();
                }
                /**
                * Zmena focusu radku
                *
                */
                changeSelect() {
                    //    let grid = this.getGrid();
                    //    if (grid == null) return;
                    //    const row = grid.ggrid<Uct.Interface.GSeznamZapisuStavuDto>("activeRow", false);
                    //    if (typeof this.parentCnt.actions.doklaZauctAct === "undefined") return;
                    //    let enable = false;
                    //    if (typeof row !== "undefined" && row != null && row.ixb_dzu && row.ixb_dzu.trim() != "")
                    //        enable = true;
                    //    this.parentCnt.actions.doklaZauctAct.enabled(enable);
                }
                /**
                 * Nastaveni pristupnosti akci
                 *
                 * */
                nastaveniAkci(grid, pocetRadku) {
                    super.nastaveniAkci(grid, pocetRadku);
                    this.parentCnt.log.debug("Start nastaveniAkci GSeznamEkoUctZapis");
                    let that = this.parentCnt;
                    //let grid = this.getGrid();
                    //if (grid == null) return;
                    // pokud neni grid, nic nedelej
                    if (that.closed)
                        return;
                    let row = this.getCurrentRow(grid);
                    // pristupnost akci dokladu o zauctovani
                    if (typeof this.parentCnt.actions.doklaZauctAct !== "undefined")
                        this.parentCnt.actions.doklaZauctAct.enabled(row != null && typeof row.ixb_dzu !== "undefined" && row.ixb_dzu != null && row.ixb_dzu.trim() !== "");
                    //var enable = Gordic.Eko.WebClient.Common.CelkovyPocetRadku(grid) > 0;
                    // pristupnost akci dle nactenych dat
                    let showPopisStruktPolozkyNew = that.userSettings?.get("rozsirenyPopisAutoAddGridColumns") ?? false;
                    let showPopisStruktNew = that.userSettings?.get("strukturovanyPopisDokladuAutoAddGridColumns") ?? false;
                    let showEsuNew = (that.userSettings?.get("esuAddGridColumns") ?? false);
                    this.addStrPopisColumns = (that.userSettings?.get("rozsirenyPopisShowGridColumns"));
                    if (showPopisStruktPolozkyNew) {
                        this.showPopisStruktPolozky = showPopisStruktPolozkyNew;
                        //this.manuallyStartedStruktPopisPolozky = false;
                        that.actions.zobrazitStuktPopisPolAct?.checked(false);
                    }
                    if (showPopisStruktNew) {
                        this.showPopisStrukt = showPopisStruktNew;
                        //this.manuallyStartedStruktPopis = false;
                        //that.actions.zobrazitStukzobrazitStuktPopisActtPopisPolAct?.checked(false);
                    }
                    if (showEsuNew) {
                        this.showEsu = showEsuNew;
                        //this.manuallyStartedEsu = false;
                        that.actions.zobrazitESUAct?.checked(false);
                    }
                    if (!showPopisStruktPolozkyNew) {
                        if (this.addStrPopisColumns && this.addStrPopisColumns.length > 0)
                            this.parentCnt.actions.zobrazitStuktPopisPolAct?.update({ enabled: true, tooltip: "jres:30250624" }); //RC 30250624 : V seznamu jsou přidány/odstraněny sloupce pro vybrané údaje strukturovaného popisu podle uživatelského nastavení
                        else
                            this.parentCnt.actions.zobrazitStuktPopisPolAct?.update({ enabled: false, tooltip: "jres:30250633" }); //RC 30250633 : Nejsou vybrána slova strukturovaného popisu v uživatelském nastavení.
                    }
                    this.parentCnt.actions.zobrazitESUAct?.visible(!showEsuNew);
                    this.parentCnt.actions.zobrazitStuktPopisPolAct?.visible(!showPopisStruktPolozkyNew);
                    this.parentCnt.actions.zobrazitStuktPopisAct?.visible(!showPopisStruktNew);
                    let checked = this.parentCnt.actions.zobrazitESUAct?.checked();
                    checked = (typeof checked == "undefined" ? false : checked);
                    that.actions.zobrazitESUAct?.update({ icon: (checked ? "gi-check" : "gi-uncheck") });
                    checked = this.parentCnt.actions.zobrazitStuktPopisPolAct?.checked();
                    checked = (typeof checked == "undefined" ? false : checked);
                    that.actions.zobrazitStuktPopisPolAct?.update({ icon: (checked ? "gi-check" : "gi-uncheck") });
                    checked = this.parentCnt.actions.zobrazitStuktPopisAct?.checked();
                    checked = (typeof checked == "undefined" ? false : checked);
                    that.actions.zobrazitStuktPopisAct?.update({ icon: (checked ? "gi-check" : "gi-uncheck") });
                    this.parentCnt.log.debug("Konec nastaveniAkci GSeznamEkoUctZapis");
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
                        that.addFilterIntoHistory($.extend(true, {}, newFilter));
                        var newRequest = $.extend(true, {}, req);
                        let maska2 = $.extend(true, {}, newFilter.filter);
                        //maska2.cfu = $.extend({}, newFilter.filter?.cfu);
                        for (var name in maska2?.cfu) {
                            if (name == "uef") {
                                maska2.cfu[name] = null;
                                maska2.uef = void 0;
                            }
                        }
                        //let struktPopis = this.parentCnt.userSettings?.get("rozsirenyPopisAutoAddGridColumns") as boolean ?? false;
                        //maska2.cfu["uef"] = undefined;
                        if (that.TypUlohy !== 9 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.ViceleteFinancovaniZapis */) {
                            let rq = {
                                RadekStavu: that.CurrentRow,
                                Maska: newFilter.filter,
                                Maska2: maska2 //newFilter.filter
                                ,
                                TypUlohy: that.TypUlohy,
                                Elementy: newFilter.elementy,
                                FilterStrPopis: that.showPopisStruktPolozky ? newFilter.filterStrPopis : [],
                                logovatGdpr: true,
                                StrPopisKeys: that.showPopisStruktPolozky ? that.addStrPopisColumns : [],
                                maxRecords: -1
                                //, Limit: 0
                                ,
                                LoadEsu: that.showEsu,
                                LoadPopisDokladu: that.showPopisStrukt
                                // podminka na PAP ucty
                                ,
                                Pap: that.usePapRows ? { v: that.getCheckedPap() ? 0 : 1 } : undefined
                            };
                            let maska = newFilter.filter;
                            for (var name in newFilter.filter?.cfu) {
                                maska[name] = newFilter.filter?.cfu[name];
                            }
                            rq.Maska = maska;
                            newRequest["filters"] = rq;
                        }
                        else
                            newRequest["filters"] = { Maska: newFilter.filter, Elementy: (newFilter.elementy).filters, Limit: 0, TypUlohy: that.TypUlohy };
                        return next(newRequest);
                        //return newRequest;
                    });
                }
                /**
                 * Vytvoreni klavesovych zkratek
                 *
                 * */
                createShortCut() {
                    super.createShortCut();
                    return;
                }
                createGridFormat(typeZapis) {
                    var gf = new Gordic.Data.GridFormat();
                    // Priznak zobrazeni detailu
                    let detail = typeZapis === "Detail";
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
                                        onlyActive: this.filterOptions.ucs.onlyActive, caption: this.filterOptions.ucs.caption, name: "ucs", firstField: void 0, secondField: void 0,
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
                                            onlyActive: this.filterOptions.uus.onlyActive, caption: this.filterOptions.uus.caption, name: "uus", firstField: void 0, secondField: void 0,
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
                                            onlyActive: this.filterOptions.ucs.onlyActive, caption: this.filterOptions.ucs.caption, name: "ucs", firstField: void 0, secondField: void 0,
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
                                                onlyActive: this.filterOptions.uus.onlyActive, caption: this.filterOptions.uus.caption, name: "uus", firstField: void 0, secondField: void 0,
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
                    // filtr na druh dokladu
                    let drdServerFilter = Gordic.Eko.Filters.drd(this.filterOptions.drd);
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
                        //NOTE: Zatim neni potrebne
                        //var max = 0
                        //switch (this.TypUlohy) {
                        //    case "UcetnictviZapis": max = this.globals.DelkaAcUct; break;
                        //    case "RozpocetZapis": max = this.globals.DelkaAcRoz; break;
                        //    default: max = this.globals.DelkaAcMax; break;
                        //}
                        gf.addTextColumn({
                            name: "ac",
                            caption: "jres:31100054", //RC 31100054 : Doklad
                            width: 70,
                            aggregate: Gordic.Data.Aggregates.first("ac"),
                            serverFilter: Gordic.Eko.Filters.acInterval(this.filterOptions.ac)
                        });
                        //gf.addTextColumn({
                        //    name: "popisdokladu",
                        //    caption: "jres:31100054", //RC 31100054 : Doklad
                        //    width: 70,
                        //    aggregate: Gordic.Data.Aggregates.first("popisdokladu"),
                        //    serverFilter: Gordic.Eko.Filters.acInterval(this.filterOptions.ac)
                        //});
                        if (this.showPopisStrukt)
                            gf.addTextColumn({
                                name: "pdok",
                                caption: "jres:31100055", //RC 31100055 : Strukturovaný popis dokladu
                                //hidden: !((this.parentCnt.userSettings?.get("strukturovanyPopisDokladuAutoAddGridColumns") as boolean ?? false) && !detail),
                                //NOTE: V TK maji skryto, byva videt pole 'popis', kde je stejny prefab
                                width: 200,
                                serverFilter: Gordic.Eko.Filters.stringSingle({ model: "pdok", caption: "jres:31100055" }) //RC 31100055 : Strukturovaný popis dokladu
                            });
                    }
                    //// slova ucetni vety
                    //let cfuIntervalOptions: Gordic.Eko.CfuUtils.IGCfuFilterOptions = {
                    //    isRoz: this.Rozpocet,
                    //    isUct: this.Ucetnictvi,
                    //    checkUete: this.parentCnt.ekoParams.CheckUete as any,
                    //    getIntervalOptions: (dto, opts) => {
                    //        if (!this.Filter || !this.StrictFilter)
                    //            return opts;
                    //        opts.disabled = !!!this.Filter[dto.name];
                    //        return opts;
                    //    }
                    //};
                    //gf.addSortedEkoCfuSet(Gordic.Eko.CfuUtils.getCfuSetServerFilters(this.parentCnt, cfuIntervalOptions));
                    gf.addSortedEkoCfuSet(this.getCfuSetServerFilters(true));
                    //gf.addMD({ serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c0", caption: "jres:31100056" } )});
                    //gf.addDal({ serverFilter: Gordic.Eko.Filters.decimalInterval({ model: "c1", caption: "jres:31100057" } )});
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
                    //gf.addPid({
                    //    name: "ixp",
                    //    width: 110,
                    //    serverFilter: Gordic.Eko.Filters.ixp({ model: "ixp", caption: "jres:30250663" }) //RC 30250663 : Identifikátor
                    //});
                    gf.addTextColumn({
                        name: "ixp",
                        caption: "jres:31100075", //RC 31100075 : PID
                        description: "jres:30250666", //RC 30250666 : Identifikátor účtujícího dokladu
                        width: 110,
                        serverFilter: Gordic.Eko.Filters.ixp({ model: "ixp", caption: "jres:31100075" /*, useSouvisejici:true*/ }) //RC 31100075 : PID
                    });
                    gf.addTextColumn({
                        name: "ixp_prim",
                        caption: "jres:30250664", //RC 30250664 : PID prim. dokladu
                        description: "jres:30250665", //RC 30250665 : Identifikátor primárního dokladu
                        width: 110,
                        serverFilter: Gordic.Eko.Filters.stringSingle({ model: "ixp_prim", caption: "jres:30250664" }) //RC 30250664 : PID prim. dokladu
                        //serverFilter: Gordic.Eko.Filters.ixp({ model: "ixp_prim", caption: "jres:30250664", useSouvisejici:false }) //RC 31100075 : PID
                    });
                    if (this.globals.TypPraceWfl === 1) {
                        gf.addTextColumn({
                            name: "ac_ag",
                            caption: "jres:31100077", //RC 31100077 : Agendové číslo
                            width: 100,
                            serverFilter: Gordic.Eko.Filters.stringInterval({ model: "ac_ag", caption: "jres:31100077" }) //RC 31100077 : Agendové číslo
                        });
                        gf.addTextColumn({
                            // Oprava z duvodu seskupovani (zobrazovala se hodnota undefined)
                            name: "ixs_typ",
                            //name: "ixs_typ_txt",
                            caption: "jres:30250281", //RC 30250281 : Typ dokladu
                            width: 120,
                            cellTemplate: "{ixs_typ_txt:trim:encode}",
                            printable: "#render",
                            searchFields: ["ixs_typ_txt"],
                            //groupings: { groupingPreset:"",},
                            grouping: {
                                aggregate: Gordic.Data.Aggregates.first("ixs_typ_txt"),
                                //captionTemplate: "{ixs_typ_txt:trim:encode}"
                            },
                            serverFilter: Gordic.Eko.Filters.sslTypInterval({ model: "ixs_typ=ixs_typ;ixs_typ_txt=nazev", caption: "jres:30250281" }) //RC 30250281 : Typ dokladu
                        });
                    }
                    //if (!this.globals.ExterniSumarizace) {
                    //    if (this.TypUlohy == Gordic.Uct.Interface.GProhlizeniUctTaskType.PrimarniPozadavkyZapis || this.TypUlohy == Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis) {
                    //        gf.addTextColumn({
                    //            name: "ixp_roz",
                    //            caption: "jres:30250152", //RC 30250152 : PID RO
                    //            description: "jres:30250152", //RC 30250152 : PID RO
                    //            width: 110,
                    //            serverFilter: Gordic.Eko.Filters.ixp({ model: "ixp_roz", caption: "jres:30250152" }) //RC 30250152 : PID RO
                    //        });
                    //        gf.addTextColumn({
                    //            name: "ixp_prim",
                    //            caption: "jres:30250153", //RC 30250153 : PID BLK
                    //            description: "jres:30250153", //RC 30250153 : PID BLK
                    //            width: 110,
                    //            serverFilter: Gordic.Eko.Filters.ixp({ model: "ixp_prim", caption: "jres:30250153" }) //RC 30250153 : PID BLK
                    //        });
                    //    }
                    //}
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
                        // Oprava z duvody seskupovani(zobrazovala se hodnota undefined)
                        //name: "typ_ag_txt",
                        name: "typ_ag",
                        caption: "jres:31100079", //RC 31100079 : Agenda
                        width: 120,
                        cellTemplate: "{typ_ag_txt:trim:encode}", // field: "typ_ag_txt"
                        searchFields: ["typ_ag_txt"],
                        printable: "#render",
                        grouping: {
                            aggregate: Gordic.Data.Aggregates.first("typ_ag_txt"),
                        },
                        serverFilter: Gordic.Ucr.WebClient.FilterPrefabs.typ_ag({ model: "typ_ag", zkr_agPath: "typ_ag_txt", isRozpocet: false, caption: "jres:31100079" }) //RC 31100079 : Agenda
                    });
                    if ( /*this.globals.TypPraceESU === "Ne" ||*/detail) { }
                    else if (this.globals.RezimProvozu === 40 /* Gordic.Uct.Interface.GUcrRezimProvozu.SOR */ && this.globals.TypSumarizace === 1 /* Gordic.Uct.Interface.GUcrTypSumarizace.Externi */) { }
                    else {
                        if (this.showEsu) {
                            gf.addTextColumn({
                                name: "esu_txt",
                                caption: "jres:30250667", //RC 30250667 : ESU
                                description: "jres:31100252", //RC 31100252 : Externí subjekt
                                width: 180,
                                serverFilter: this.TypUlohy == 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */ ? void 0 : Gordic.Ucr.WebClient.FilterPrefabs.esu_txt({ model: "esu_txt", ixs_esuPath: "_esu_txt_ixs", caption: "jres:30250667" }) //RC 30250667 : ESU
                            });
                            gf.addTextColumn({
                                name: "esu_ico",
                                caption: "jres:31100080 {0}".format(this.zkratky.Ico), //RC 31100080 : ESU
                                description: "jres:31100253", //RC 31100253 : IČO Externího subjektu primárního dokladu
                                width: 80,
                                serverFilter: this.TypUlohy == 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */ ? void 0 : Gordic.Ucr.WebClient.FilterPrefabs.esu_ico({ model: "esu_ico", ixs_esuPath: "_esu_ico_ixs", caption: "jres:31100080" + " " + this.zkratky.Ico }) //RC 31100080 : ESU
                            });
                            gf.addTextColumn({
                                name: "esu_rc",
                                caption: "jres:31100081", //RC 31100081 : ESU RČ
                                description: "jres:31100254", //RC 31100254 : Rodné číslo Externího subjektu primárního dokladu
                                width: 80,
                                serverFilter: this.TypUlohy == 12 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.SaldokontoZapis */ ? void 0 : Gordic.Ucr.WebClient.FilterPrefabs.esu_rc({
                                    model: "esu_rc", ixs_esuPath: "_esu_txt_rc", caption: "jres:31100081", //RC 31100081 : ESU RČ
                                    Rad_Esu_RcVyhl: this.globals.Rad_Esu_RcVyhl
                                })
                            });
                        }
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
                                if (typeof data.id_hdr_ris !== "undefined" && data.id_hdr_ris != null) {
                                    return {
                                        icon: "gi-exclam g-state-error", text: "jres:30250345", //RC 30250345 : Nezpracováno
                                        //tooltip: "jres:30250289"
                                    };
                                }
                            }
                        });
                    }
                    if (this.addStrPopisColumns && !detail && this.showPopisStruktPolozky) {
                        let _this = this;
                        for (let i = 0; i < this.addStrPopisColumns.length; i++) {
                            let c = this.addStrPopisColumns[i];
                            let description = this.filterStrPopis?.find((s) => { return s.klic === c; })?.klic_txt ?? c;
                            let form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" })
                                .addSection(description)
                                .addField("gstringbox", { name: c });
                            let caption = "SPD - " + c;
                            gf.addTextColumn({
                                name: c,
                                caption: caption,
                                description: description,
                                cellTemplate: `{struktPopis.${c}.hodnota}`,
                                printable: "#render",
                                serverFilter: {
                                    widget: "gformbox",
                                    options: $.extend(Gordic.Eko.Filters.Utils.getFormBoxFilterDefaults({}), {
                                        form: form,
                                        itemTemplate: (s) => { return s && s[c] ? s[c] : Gordic.Eko.Filters.Utils.formatEmptyValue(caption); },
                                        change: (ev, v) => {
                                            let val = v?.value[c] ?? "";
                                            let fpdata = $.extend(true, {}, this.$filterPanel.gfilterpanel("getCurrentData"));
                                            let filterStrPopis = fpdata?.filterStrPopis;
                                            let p = filterStrPopis?.find((s) => { return s.klic === c; });
                                            if (p) {
                                                p.hodnota = val;
                                                this.$filterPanel.gfilterpanel("applyFilter", fpdata, true);
                                            }
                                        },
                                        model: function (op, dto, modelOptions) {
                                            switch (op) {
                                                case "apply":
                                                    const v = dto[c];
                                                    if (typeof v !== "undefined")
                                                        $(this).gfield("setValue", { c: v }, { triggerChange: false });
                                                    break;
                                                case "collect":
                                                    return $(this).gfield("getValue");
                                                default: return;
                                            }
                                        },
                                        caption: caption,
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
                        default: { name: "jres:31100232", columns: {}, columnList: "" } //RC 31100232 : Výchozí
                    };
                    //gf.columns.filter((c) => { return (!c.hidden && c.name != "ixp_prim"); })
                    //    .forEach((c) => { profiles.default.columns![c.name!] = { hidden: false }
                    //    }
                    //    );
                    profiles.default.columnList = (gf.columns.filter((c) => { return (!c.hidden /*&& c.name != "ixp_prim"*/); }))
                        .map((c) => c.name).join(",");
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
                 * Udalost pred vlastnim nactenim. Lze zrusit nacteni
                 * @returns
                 */
                beforeLoading() {
                    const that = this;
                    let grid = that.getGrid();
                    if (grid == null)
                        return false;
                    let showPopisStruktPolozkyNew = that.parentCnt.userSettings?.get("rozsirenyPopisAutoAddGridColumns") ?? false;
                    let showPopisStruktNew = that.parentCnt.userSettings?.get("strukturovanyPopisDokladuAutoAddGridColumns") ?? false;
                    let showEsuNew = (that.parentCnt.userSettings?.get("esuAddGridColumns") ?? false);
                    let columnsPopisStruktNew = (that.parentCnt.userSettings?.get("rozsirenyPopisShowGridColumns"));
                    that.showEsu = this.parentCnt.actions.zobrazitESUAct?.checked();
                    that.showPopisStruktPolozky = that.parentCnt.actions.zobrazitStuktPopisPolAct?.checked();
                    that.showPopisStrukt = that.parentCnt.actions.zobrazitStuktPopisAct?.checked();
                    if (showPopisStruktNew != that.showPopisStrukt
                        || that.showPopisStruktOld != that.showPopisStrukt
                        || that.showEsu != showEsuNew
                        || that.showEsuOld != that.showEsu
                        || that.showPopisStruktPolozky != showPopisStruktPolozkyNew
                        || that.showPopisStruktPolozky != that.showPopisStruktPolozkyOld
                        || that.showPopisStrukt != showPopisStruktNew
                        || that.addStrPopisColumns != columnsPopisStruktNew) {
                        that.addStrPopisColumns = columnsPopisStruktNew;
                        if (showEsuNew)
                            that.showEsu = showEsuNew;
                        if (showPopisStruktPolozkyNew)
                            that.showPopisStruktPolozky = showPopisStruktPolozkyNew;
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
                    that.showPopisStruktPolozkyOld = that.showPopisStruktPolozky;
                    that.showEsuOld = that.showEsu;
                    that.showPopisStruktOld = that.showPopisStrukt;
                    that.addStrPopisColumns = columnsPopisStruktNew;
                    return true;
                }
                /**
                 * Pregenerovani griformatu
                 * @returns
                 */
                reCreateGridFormat() {
                    return this.beforeLoading();
                    //let grid = this.getGrid();
                    //if (grid == null) return;
                    //this.addStrPopisColumns = (this.parentCnt.userSettings?.get("rozsirenyPopisShowGridColumns"));
                    //let showPopisStruktPolozkyNew = this.parentCnt.userSettings?.get("rozsirenyPopisAutoAddGridColumns") as boolean ?? false;
                    //let showPopisStruktNew = this.parentCnt.userSettings?.get("strukturovanyPopisDokladuAutoAddGridColumns") as boolean ?? false;
                    //let showEsuNew = (this.parentCnt.userSettings?.get("esuAddGridColumns") as boolean ?? false);
                    //this.showEsu = showEsuNew ? showEsuNew: this.parentCnt.actions.zobrazitESUAct?.checked() as boolean;
                    //this.showPopisStruktPolozky = showPopisStruktPolozkyNew ? showPopisStruktPolozkyNew: this.parentCnt.actions.zobrazitStuktPopisPolAct?.checked() as boolean;
                    //this.showPopisStrukt = showPopisStruktNew ? showPopisStruktNew: this.parentCnt.actions.zobrazitStuktPopisAct?.checked() as boolean;
                    //let columns = this.createGridFormat();
                    //this.addCommonCols(columns);
                    //let searchItems = columns.columns.filter(c => c.columnType !== "datetime" && c.columnType !== "currency").map(e => "*" + e.name);
                    //let columnsOld = grid.ggrid("option", "columns") as Gordic.Data.GridFormat<any>;
                    ////if (columnsOld.columns.length != columns.columns.length)
                    //    grid.ggrid("option", "columns", columns);
                    //// doplneni vyhledavacich poli
                    //let searchItemsOld = grid.ggrid("option", "searchColumns");
                    ////if (typeof searchItemsOld !== "undefined" && searchItemsOld != "*") {
                    ////    if (searchItemsOld.length != searchItems.length)
                    //        grid.ggrid("option", "searchColumns", searchItems);
                    ////}
                }
                /**
                 * Vytvoreni akci
                 *
                 */
                createActions() {
                    super.createActions();
                    let that = this;
                    this.parentCnt.actions.add({
                        name: "zobrazitESUAct",
                        caption: "jres:30250621", //RC 30250621 : Údaje ESU
                        tooltip: "jres:30250622", //RC 30250622 : V seznamu jsou přidány/odstraněny sloupce pro údaje o externím subjektu
                        icon: "gi-uncheck",
                        enabled: true,
                        checked: false,
                        run: () => {
                            let checked = this.parentCnt.actions.zobrazitESUAct?.checked();
                            checked = !(typeof checked == "undefined" ? false : checked);
                            that.showEsuOld = (!checked);
                            that.parentCnt.actions.zobrazitESUAct?.checked(checked);
                            //that.manuallyStartedEsu = checked;
                            //let caption = (checked) ? "jres:30250632" //RC 30250632 : Načíst bez ESU
                            //    : "jres:30250621"; //RC 30250621 : Údaje ESU
                            //let tooltip = (checked) ? "jres:30250631" //RC 30250631 : Načíst ibez informací o  ekonomickém subjektu
                            //    : "jres:30250622"; //RC 30250622 : V seznamu jsou přidány/odstraněny sloupce pro údaje o externím subjektu
                            //that.parentCnt.actions.zobrazitESUAct?.update({ caption: caption/*, tooltip: tooltip*/ });
                            that.parentCnt.actions.zobrazitESUAct?.update({ icon: (checked ? "gi-check" : "gi-uncheck") });
                            that.showEsu = checked;
                            that.reCreateGridFormat();
                            //that.reload();                    
                        }
                    });
                    this.parentCnt.actions.add({
                        name: "zobrazitStuktPopisPolAct",
                        caption: "jres:30250623", //RC 30250623 : Slova SPD
                        tooltip: "jres:30250624", //RC 30250624 : V seznamu jsou přidány/odstraněny sloupce pro vybrané údaje strukturovaného popisu podle uživatelského nastavení
                        icon: "gi-uncheck",
                        checked: false,
                        enabled: true,
                        run: () => {
                            this.addStrPopisColumns = (that.parentCnt.userSettings?.get("rozsirenyPopisShowGridColumns"));
                            if (!that.addStrPopisColumns || that.addStrPopisColumns.length == 0) {
                                that.parentCnt.dialogs.warning("jres:30250634", //RC 30250634 : Upozornění
                                "jres:30250633"); //RC 30250633 : Nejsou vybrána slova strukturovaného popisu v uživatelském nastavení.
                                that.reCreateGridFormat();
                                this._nastaveniAkci();
                                return;
                            }
                            let checked = that.parentCnt.actions.zobrazitStuktPopisPolAct?.checked();
                            that.showPopisStruktPolozkyOld = (typeof checked == "undefined" ? false : checked);
                            checked = !(typeof checked == "undefined" ? false : checked);
                            that.parentCnt.actions.zobrazitStuktPopisPolAct?.checked(checked);
                            //that.manuallyStartedStruktPopisPolozky = checked;
                            //let caption = (checked) ? "jres:30250627" //RC 30250627 : Načíst bez PSPD
                            //    : "jres:30250623"; //RC 30250623 : Slova SPD
                            //let tooltip = (checked) ? "jres:30250628" //RC 30250628 : v seznamu je odstraněn sloupec Strukturovaný popis dokladu
                            //    : "jres:30250624"; //RC 30250624 : V seznamu jsou přidány/odstraněny sloupce pro vybrané údaje strukturovaného popisu podle uživatelského nastavení
                            //that.parentCnt.actions.zobrazitStuktPopisPolAct?.update({ caption: caption, tooltip: tooltip });                    
                            that.parentCnt.actions.zobrazitStuktPopisPolAct?.update({ icon: (checked ? "gi-check" : "gi-uncheck") });
                            that.showPopisStruktPolozky = checked;
                            that.reCreateGridFormat();
                            //this.manuallyStarted = true;
                            //that.reload();
                        }
                    });
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
                        name: "doklaZauctAct",
                        caption: "jres:30250613", //RC 30250613 : Dokl. o zaúč.
                        description: "jres:30250612", //RC 30250612 : Doklad o zaúčtování
                        enabled: false,
                        run: () => { that.parentCnt.actions["doklaZauctAct"].setPending(that.showDokladZauc()); }
                    });
                    this.parentCnt.actions.add({
                        name: "detailAct",
                        caption: "jres:31100266", //RC 31100266 : Zobrazit detail
                        icon: "gi-detail",
                        enabled: false,
                        run: (ev, ctx) => { this.showDetail(); }
                    });
                    //this.parentCnt.actions.add({
                    //    name: "zapisyAct",
                    //    icon: "gi-list",
                    //    enabled: false,
                    //    caption: "jres:31100124", //RC 31100124 : Zápisy
                    //    run: (ev, ctx) => { this.showZapisy(); }
                    //});
                    //this.parentCnt.actions.add({
                    //    name: "zapisyAllAct",
                    //    icon: "gi-list",
                    //    enabled: false,
                    //    caption: "jres:30250273", //RC 30250273 : Zápisy vše
                    //    run: (ev, ctx) => { this.showZapisyAll(); }
                    //});
                    this.parentCnt.actions.add({
                        name: "dokladAct",
                        enabled: false,
                        caption: "jres:31100233", //RC 31100233 : Doklady/zápisy
                        run: (ev, ctx) => { this.toggleGrouping(); }
                    });
                    this.parentCnt.actions.add({
                        name: "primdokladAct", //UCdokladAct
                        enabled: false,
                        icon: "fa-external-link",
                        caption: "jres:30250671", //RC 30250671 : Účt. doklad
                        run: (ev, ctx) => { this.showPrimDoklad(); }
                    });
                    this.parentCnt.actions.add({
                        name: "primdokladExtAct",
                        enabled: false,
                        icon: "fa-external-link",
                        caption: "jres:30250154", //RC 30250154 : Prim. doklad
                        run: (ev, ctx) => { this.showPrimDoklad(undefined, "PRI"); }
                    });
                    /*this.selFilterAct = */
                    //this.parentCnt.actions.add({
                    //    name: "selFilterAct",
                    //    run: (ev, ctx) => { this.dispatchFillServerGridEvent(ev); }
                    //});
                    /*this.selFilterAndSearchAct = */
                    //this.parentCnt.actions.add({
                    //    name: "selFilterAndSearchAct",
                    //    run: (ev, ctx) => {
                    //        this.dispatchFillServerGridEvent(ev);
                    //        this.doFilterClick();
                    //    }
                    //});
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
                createFilterPanel() {
                    super.createFilterPanel(this);
                }
                /**
                 * Zobrazeni zapisu
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
                /**
                 * Zobrazeni dokladu o zauctovani
                 */
                showDokladZauc() {
                    this.parentCnt.log.debug("Start showDokladZauc GSeznamEkoZaznamuBase");
                    let grid = this.getGrid();
                    if (grid == null)
                        return $.Deferred().reject().promise();
                    var sel = grid.ggrid("getSelection");
                    if (sel.length === 0)
                        return $.Deferred().reject().promise();
                    const row = sel[0];
                    if (row.ixb_dzu && row.ixb_dzu.trim()) {
                        let dto = {
                            DownloaderType: "Gordic.Ucr.WebClient.GFileDownloader",
                            CustomData: {
                                "dokladZauct": "ANO",
                                "rok": row.rok == null ? "0" : row.rok?.toString(),
                                "mesic": row.mesic == null ? "0" : row.mesic.toString(),
                                "ucs": row.ucs,
                                "ac": row.ac,
                                "radek_z": row.radek_z == null ? "0" : row.radek_z.toString()
                            }
                        };
                        let doc = new GDocument(this.parentCnt);
                        this.parentCnt.log.debug("Konec showDokladZauc GSeznamEkoZaznamuBase");
                        return doc.download(dto);
                    }
                    else {
                        return this.parentCnt.dialogs.error("jres:30250614", //RC 30250614 : Doklad o zaúčtování
                        "jres:30250615" //RC 30250615 : Doklad o zaúčtování nebyl nalezen
                        )
                            .createDialogPromise(() => false);
                    }
                }
                getZapisFilter() {
                    let grid = this.getGrid();
                    if (grid == null)
                        return {};
                    var sel = grid.ggrid("getSelection", false)[0];
                    //if (this.parentCnt.TypUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.Saldokonto)
                    //    return {
                    //        ucs: { start: sel.ucs, end: sel.ucs },
                    //        mesic: { start: sel.mesic, end: sel.mesic },
                    //        ac: { start: sel.ac, end: sel.ac }
                    //    };
                    return {
                        ucs: { start: sel.ucs, end: sel.ucs },
                        drd_msk: sel.drd.toString(),
                        mesic: { start: sel.mesic, end: sel.mesic },
                        ac: { start: sel.ac, end: sel.ac }
                    };
                }
                /**
                 * Definice menu baru
                 * @param typUlohy
                 */
                DefineMenuBar(typUlohy) {
                    let menu = super.DefineMenuBar(typUlohy);
                    menu.push({ action: this.parentCnt.actions.doklaZauctAct, favorite: true });
                    menu.unshift({ action: this.parentCnt.actions.zobrazitStuktPopisPolAct, favorite: true, align: "opposite" });
                    menu.unshift({ action: this.parentCnt.actions.zobrazitStuktPopisAct, favorite: true, align: "opposite" });
                    menu.unshift({ action: this.parentCnt.actions.zobrazitESUAct, favorite: true, align: "opposite" });
                    return menu;
                }
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
            WebClient.GSeznamEkoUctZapis = GSeznamEkoUctZapis;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Nlem5hbUVrb1VjdFphcGlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR1Nlem5hbUVrb1VjdFphcGlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0F3dENmO0FBeHRDRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0F3dENuQjtJQXh0Q2dCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQXd0QzdCO1FBeHRDb0IsV0FBQSxTQUFTO1lBRTFCLE1BQWEsa0JBQW1CLFNBQVEsVUFBQSxxQkFBcUI7Z0JBSXpELFlBQVksT0FBcUM7b0JBQzdDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFKbkIsdUNBQXVDO29CQUV2QyxlQUFVLEdBQUcsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQztvQkFHeEYsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztvQkFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQzFCLDRDQUE0QztvQkFDNUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ3pELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUMzRCxtQ0FBbUM7b0JBQ25DLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO29CQUM1QiwyQkFBMkI7b0JBQzNCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7b0JBQzdCLDhCQUE4QjtvQkFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsa0NBQWtDLENBQUM7b0JBQ2pELElBQUksQ0FBQyxjQUFj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RSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUU7Z0NBQ25DLE9BQU8sRUFBRSxHQUFHLENBQUMsR0FBSSxDQUFDLFFBQVEsRUFBRTtnQ0FDNUIsR0FBRyxFQUFFO29DQUNELEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7b0NBQ3ZDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBSSxFQUFFO29DQUN2QyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUksRUFBRTtvQ0FDdkMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFJLEVBQUU7aUNBQzFDOzZCQUNKLENBQUM7d0JBQ04sQ0FBQzt3QkFDRCxRQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQzlCO2dDQUNJLFFBQVEsc0VBQThELENBQUM7Z0NBQ3ZFLEVBQUUsR0FBRyxZQUFZLENBQUMsQ0FBQyx3Q0FBd0M7Z0NBQzNELE1BQU07NEJBQ1Y7Z0NBQ0ksUUFBUSxvRUFBNEQsQ0FBQztnQ0FDckUsRUFBRSxHQUFHLFlBQVksQ0FBQyxDQUFDLHdDQUF3QztnQ0FDM0QsTUFBTTs0QkFDVjtnQ0FDSSxRQUFRLHVFQUE4RCxDQUFDO2dDQUN2RSxFQUFFLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyx3Q0FBd0M7Z0NBQ2xFLE1BQU07NEJBQ1Y7Z0NBQ0ksTUFBTSxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDekMsQ0FBQzt3QkFFRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHdDQUF3QyxFQUFFOzRCQUNyRSxFQUFFLEVBQUUsRUFBRTs0QkFDTixRQUFRLEVBQUUsUUFBUTs0QkFDbEIsTUFBTSxFQUFFLE1BQU07NEJBQ2QsVUFBVSxFQUFDLEdBQUc7NEJBQ2QsWUFBWSxFQUFFLElBQUk7NEJBQ2xCLGNBQWMsRUFBRSxDQUFDLENBQUMsY0FBYzs0QkFDaEMsWUFBWSxFQUFFLElBQUk7NEJBQ2xCLEtBQUssRUFBRSxLQUFLO3lCQUNmLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO2dCQUVEOzttQkFFRztnQkFDTyxjQUFjO29CQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQztvQkFDdkUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUMxQixJQUFJLElBQUksSUFBSSxJQUFJO3dCQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUN6RCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUE2QyxjQUFjLENBQUMsQ0FBQztvQkFDakYsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUM7d0JBQ2hCLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUUzQyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ25CLElBQUksR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7d0JBQ3BDLElBQUksR0FBRyxHQUE2Qjs0QkFDaEMsY0FBYyxFQUFFLHNDQUFzQzs0QkFDdEQsVUFBVSxFQUFFO2dDQUNSLGFBQWEsRUFBRSxLQUFLO2dDQUNwQixLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBRSxJQUFJLENBQUEsQ0FBQyxDQUFBLEdBQUcsQ0FBQSxDQUFDLENBQUEsR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUU7Z0NBQzVDLE9BQU8sRUFBRSxHQUFHLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUEsR0FBRyxDQUFBLENBQUMsQ0FBQSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtnQ0FDcEQsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHO2dDQUNkLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRTtnQ0FDWixTQUFTLEVBQUUsR0FBRyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7NkJBQ2hFO3lCQUNKLENBQUM7d0JBQ0YsSUFBSSxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQzt3QkFDdkUsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM3QixDQUFDO3lCQUNJLENBQUM7d0JBQ0YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQy9CLGVBQWUsRUFBRSxtQ0FBbUM7d0JBQ3BELGVBQWUsQ0FBQyxpREFBaUQ7eUJBQ3BFOzZCQUNJLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMxQyxDQUFDO2dCQUNMLENBQUM7Z0JBRVMsY0FBYztvQkFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUMxQixJQUFJLElBQUksSUFBSSxJQUFJO3dCQUFFLE9BQU8sRUFBRSxDQUFDO29CQUM1QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQXdDLENBQUM7b0JBQ3RGLHlGQUF5RjtvQkFDekYsY0FBYztvQkFDZCxnREFBZ0Q7b0JBQ2hELHNEQUFzRDtvQkFDdEQsNENBQTRDO29CQUM1QyxRQUFRO29CQUVSLE9BQU87d0JBQ0gsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUU7d0JBQ3JDLE9BQU8sRUFBRSxHQUFJLENBQUMsR0FBSSxDQUFDLFFBQVEsRUFBRTt3QkFDN0IsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUU7d0JBQzNDLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFO3FCQUNyQyxDQUFDO2dCQUNOLENBQUM7Z0JBQ0Q7OzttQkFHRztnQkFDTyxhQUFhLENBQUMsUUFBcUQ7b0JBQ3pFLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUM1RSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7b0JBQzdHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztvQkFDMUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztvQkFHbkcsT0FBTyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7Z0JBRUQ7OzttQkFHRztnQkFDSSxPQUFPO29CQUNWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsb0VBQTJELEVBQUUsQ0FBQzt3QkFDckYsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO3dCQUFDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQzt3QkFBQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7d0JBQzFELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7d0JBQzlELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBSSxNQUFjLENBQUMsS0FBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDOzRCQUNyRCxJQUFLLE1BQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQ0FDN0IsS0FBSyxHQUFHLElBQUksQ0FBQzs0QkFDakIsSUFBSyxNQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0NBQzdCLE1BQU0sR0FBRyxJQUFJLENBQUM7NEJBQ2xCLElBQUssTUFBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dDQUM3QixNQUFNLEdBQUcsSUFBSSxDQUFDO3dCQUV0QixDQUFDO3dCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsWUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMsWUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQ25ELElBQUksQ0FBQyxTQUFTLENBQUMsWUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3ZELENBQUM7b0JBRUQsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzVDLENBQUM7YUFFSjtZQWp0Q1ksNEJBQWtCLHFCQWl0QzlCLENBQUE7UUFLTCxDQUFDLEVBeHRDb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBd3RDN0I7SUFBRCxDQUFDLEVBeHRDZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBd3RDbkI7QUFBRCxDQUFDLEVBeHRDUyxNQUFNLEtBQU4sTUFBTSxRQXd0Q2YiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjci5XZWJDbGllbnQge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHU2V6bmFtRWtvVWN0WmFwaXMgZXh0ZW5kcyBHU2V6bmFtRWtvWmF6bmFtdUJhc2UgaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG4gICAgICAgIC8qKiBHbG9iYWxuaSBtb2R1bG92ZSBwYXJhbWV0cnkgdiBKUyAqL1xyXG5cclxuICAgICAgICBsb2dPcHRpb25zID0geyBuYW1lOiBcIkdTZXpuYW1Fa29VY3RaYXBpc1wiLCBhdXRob3JDb2RlOiAzMDIsIGZpbGU6IFwiR1Nlem5hbUVrb1VjdFphcGlzLnRzXCIgfTtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb250ZW50OiBHU2V6bmFtRWtvWmF6bmFtdUJhc2VDb250ZW50KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLnBvdXppdmFuU3RydWtQb3BpcyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucG92b2xlbk5haGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNlIHRhc2t1IHBybyBzZXpuYW0gYSBuYWN0ZW5pIHBvY3R1XHJcbiAgICAgICAgICAgIHRoaXMudGFza0xpc3QgPSB0aGlzLnBhcmVudENudC5pc2wuVWNyVWNldG5pWmFwaXMubGlzdCgpO1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tDb3VudCA9IHRoaXMucGFyZW50Q250LmlzbC5VY3JVY2V0bmlaYXBpcy5jb3VudCgpO1xyXG4gICAgICAgICAgICAvLyBtb3pub3N0IHVrbGFkYW5pIGhpc3RvcmllIGZpbHRydVxyXG4gICAgICAgICAgICB0aGlzLnJlbWVtYmVySGlzdG9yeSA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vIHBvdXppdmF0IHRleHR5IHogcm96dnJodVxyXG4gICAgICAgICAgICB0aGlzLnVzZVRleHR5WlJvenZyaHUgPSB0cnVlOyBcclxuICAgICAgICAgICAgLy8gcG91eml2YXQgZmlsdHIgbmEgUEFQIHJhZGt5XHJcbiAgICAgICAgICAgIHRoaXMudXNlUGFwUm93cyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubXlLZXlzID0gXCJyb2ssbGljLGljbyx1Y3MsbWVzaWMsYWMscmFkZWtfelwiO1xyXG4gICAgICAgICAgICB0aGlzLl9uYXN0YXZlbmlBa2NpKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogWm1lbmEgZm9jdXN1IHJhZGt1XHJcbiAgICAgICAgKiAgXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgY2hhbmdlU2VsZWN0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAvLyAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgIC8vICAgIGlmIChncmlkID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAvLyAgICBjb25zdCByb3cgPSBncmlkLmdncmlkPFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPihcImFjdGl2ZVJvd1wiLCBmYWxzZSk7XHJcbiAgICAgICAgLy8gICAgaWYgKHR5cGVvZiB0aGlzLnBhcmVudENudC5hY3Rpb25zLmRva2xhWmF1Y3RBY3QgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuICAgICAgICAvLyAgICBsZXQgZW5hYmxlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgaWYgKHR5cGVvZiByb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgcm93ICE9IG51bGwgJiYgcm93Lml4Yl9kenUgJiYgcm93Lml4Yl9kenUudHJpbSgpICE9IFwiXCIpXHJcbiAgICAgICAgLy8gICAgICAgIGVuYWJsZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5kb2tsYVphdWN0QWN0LmVuYWJsZWQoZW5hYmxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW5pIHByaXN0dXBub3N0aSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogKi9cclxuICAgICAgICBwdWJsaWMgbmFzdGF2ZW5pQWtjaShncmlkOiBKUXVlcnk8SFRNTEVsZW1lbnQ+LCBwb2NldFJhZGt1OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgc3VwZXIubmFzdGF2ZW5pQWtjaShncmlkLCBwb2NldFJhZGt1KTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLmRlYnVnKFwiU3RhcnQgbmFzdGF2ZW5pQWtjaSBHU2V6bmFtRWtvVWN0WmFwaXNcIik7XHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcy5wYXJlbnRDbnQ7XHJcbiAgICAgICAgICAgIC8vbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgLy9pZiAoZ3JpZCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIHBva3VkIG5lbmkgZ3JpZCwgbmljIG5lZGVsZWpcclxuICAgICAgICAgICAgaWYgKHRoYXQuY2xvc2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBsZXQgcm93ID0gdGhpcy5nZXRDdXJyZW50Um93KGdyaWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gcHJpc3R1cG5vc3QgYWtjaSBkb2tsYWR1IG8gemF1Y3RvdmFuaVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucGFyZW50Q250LmFjdGlvbnMuZG9rbGFaYXVjdEFjdCAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuZG9rbGFaYXVjdEFjdC5lbmFibGVkKHJvdyAhPSBudWxsICYmIHR5cGVvZiByb3cuaXhiX2R6dSAhPT0gXCJ1bmRlZmluZWRcIiAmJiByb3cuaXhiX2R6dSAhPW51bGwmJiByb3cuaXhiX2R6dS50cmltKCkgIT09IFwiXCIpO1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGVuYWJsZSA9IEdvcmRpYy5Fa28uV2ViQ2xpZW50LkNvbW1vbi5DZWxrb3Z5UG9jZXRSYWRrdShncmlkKSA+IDA7XHJcbiAgICAgICAgICAgIC8vIHByaXN0dXBub3N0IGFrY2kgZGxlIG5hY3RlbnljaCBkYXRcclxuICAgICAgICAgICAgbGV0IHNob3dQb3Bpc1N0cnVrdFBvbG96a3lOZXcgPSB0aGF0LnVzZXJTZXR0aW5ncz8uZ2V0KFwicm96c2lyZW55UG9waXNBdXRvQWRkR3JpZENvbHVtbnNcIikgYXMgYm9vbGVhbiA/PyBmYWxzZTtcclxuICAgICAgICAgICAgbGV0IHNob3dQb3Bpc1N0cnVrdE5ldyA9IHRoYXQudXNlclNldHRpbmdzPy5nZXQoXCJzdHJ1a3R1cm92YW55UG9waXNEb2tsYWR1QXV0b0FkZEdyaWRDb2x1bW5zXCIpIGFzIGJvb2xlYW4gPz8gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBzaG93RXN1TmV3ID0gKHRoYXQudXNlclNldHRpbmdzPy5nZXQoXCJlc3VBZGRHcmlkQ29sdW1uc1wiKSBhcyBib29sZWFuID8/IGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRTdHJQb3Bpc0NvbHVtbnMgPSAodGhhdC51c2VyU2V0dGluZ3M/LmdldChcInJvenNpcmVueVBvcGlzU2hvd0dyaWRDb2x1bW5zXCIpKTtcclxuICAgICAgICAgICAgaWYgKHNob3dQb3Bpc1N0cnVrdFBvbG96a3lOZXcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1BvcGlzU3RydWt0UG9sb3preSA9IHNob3dQb3Bpc1N0cnVrdFBvbG96a3lOZXc7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMubWFudWFsbHlTdGFydGVkU3RydWt0UG9waXNQb2xvemt5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuem9icmF6aXRTdHVrdFBvcGlzUG9sQWN0Py5jaGVja2VkKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2hvd1BvcGlzU3RydWt0TmV3KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQb3Bpc1N0cnVrdCA9IHNob3dQb3Bpc1N0cnVrdE5ldztcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5tYW51YWxseVN0YXJ0ZWRTdHJ1a3RQb3BpcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LmFjdGlvbnMuem9icmF6aXRTdHVrem9icmF6aXRTdHVrdFBvcGlzQWN0dFBvcGlzUG9sQWN0Py5jaGVja2VkKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2hvd0VzdU5ldykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RXN1ID0gc2hvd0VzdU5ldztcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5tYW51YWxseVN0YXJ0ZWRFc3UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy56b2JyYXppdEVTVUFjdD8uY2hlY2tlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICghc2hvd1BvcGlzU3RydWt0UG9sb3preU5ldyApIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFkZFN0clBvcGlzQ29sdW1ucyAmJiB0aGlzLmFkZFN0clBvcGlzQ29sdW1ucy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuem9icmF6aXRTdHVrdFBvcGlzUG9sQWN0Py51cGRhdGUoeyBlbmFibGVkOiB0cnVlLCB0b29sdGlwOiBcImpyZXM6MzAyNTA2MjRcIiB9KTsgLy9SQyAzMDI1MDYyNCA6IFYgc2V6bmFtdSBqc291IHDFmWlkw6FueS9vZHN0cmFuxJtueSBzbG91cGNlIHBybyB2eWJyYW7DqSDDumRhamUgc3RydWt0dXJvdmFuw6lobyBwb3Bpc3UgcG9kbGUgdcW+aXZhdGVsc2vDqWhvIG5hc3RhdmVuw61cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLnpvYnJheml0U3R1a3RQb3Bpc1BvbEFjdD8udXBkYXRlKHsgZW5hYmxlZDogZmFsc2UsIHRvb2x0aXA6XCJqcmVzOjMwMjUwNjMzXCIgfSk7IC8vUkMgMzAyNTA2MzMgOiBOZWpzb3UgdnlicsOhbmEgc2xvdmEgc3RydWt0dXJvdmFuw6lobyBwb3Bpc3UgdiB1xb5pdmF0ZWxza8OpbSBuYXN0YXZlbsOtLlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuem9icmF6aXRFU1VBY3Q/LnZpc2libGUoIXNob3dFc3VOZXcpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLnpvYnJheml0U3R1a3RQb3Bpc1BvbEFjdD8udmlzaWJsZSghc2hvd1BvcGlzU3RydWt0UG9sb3preU5ldyk7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuem9icmF6aXRTdHVrdFBvcGlzQWN0Py52aXNpYmxlKCFzaG93UG9waXNTdHJ1a3ROZXcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoZWNrZWQgPSB0aGlzLnBhcmVudENudC5hY3Rpb25zLnpvYnJheml0RVNVQWN0Py5jaGVja2VkKCk7XHJcbiAgICAgICAgICAgIGNoZWNrZWQgPSAodHlwZW9mIGNoZWNrZWQgPT0gXCJ1bmRlZmluZWRcIiA/IGZhbHNlIDogY2hlY2tlZCk7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy56b2JyYXppdEVTVUFjdD8udXBkYXRlKHsgaWNvbjogKGNoZWNrZWQgPyBcImdpLWNoZWNrXCIgOiBcImdpLXVuY2hlY2tcIikgfSk7XHJcblxyXG4gICAgICAgICAgICBjaGVja2VkID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy56b2JyYXppdFN0dWt0UG9waXNQb2xBY3Q/LmNoZWNrZWQoKTtcclxuICAgICAgICAgICAgY2hlY2tlZCA9ICh0eXBlb2YgY2hlY2tlZCA9PSBcInVuZGVmaW5lZFwiID8gZmFsc2UgOiBjaGVja2VkKTtcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLnpvYnJheml0U3R1a3RQb3Bpc1BvbEFjdD8udXBkYXRlKHsgaWNvbjogKGNoZWNrZWQgPyBcImdpLWNoZWNrXCIgOiBcImdpLXVuY2hlY2tcIikgfSk7XHJcblxyXG4gICAgICAgICAgICBjaGVja2VkID0gdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy56b2JyYXppdFN0dWt0UG9waXNBY3Q/LmNoZWNrZWQoKTtcclxuICAgICAgICAgICAgY2hlY2tlZCA9ICh0eXBlb2YgY2hlY2tlZCA9PSBcInVuZGVmaW5lZFwiID8gZmFsc2UgOiBjaGVja2VkKTtcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLnpvYnJheml0U3R1a3RQb3Bpc0FjdD8udXBkYXRlKHsgaWNvbjogKGNoZWNrZWQgPyBcImdpLWNoZWNrXCIgOiBcImdpLXVuY2hlY2tcIikgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5sb2cuZGVidWcoXCJLb25lYyBuYXN0YXZlbmlBa2NpIEdTZXpuYW1Fa29VY3RaYXBpc1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAgKiBOYWN0aSBmaWx0cnlcclxuICAgICAgICAgICogQHBhcmFtIHRoYXRcclxuICAgICAgICAgICogQHBhcmFtIHJlcVxyXG4gICAgICAgICAgKiBAcGFyYW0gbmV4dFxyXG4gICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgZ2V0RmlsdGVyRGF0YSh0aGF0OiB0aGlzLCByZXE6IElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBuZXh0OiBJc2wuVGFza1J1bnRpbWVOZXh0PElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBJc2wuR1NlcnZpY2VMaXN0UmVzcG9uc2U8YW55Pj4gfCBJc2wuVGFza1J1bnRpbWVOZXh0PElzbC5HU2VydmljZUxpc3RSZXF1ZXN0LCBudW1iZXI+KTogSXNsLkdTZXJ2aWNlTGlzdFJlc3BvbnNlPGFueT4gfCBKUXVlcnlQcm9taXNlPElzbC5HU2VydmljZUxpc3RSZXNwb25zZTxhbnk+PiB8IEpRdWVyeVByb21pc2U8bnVtYmVyPiB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5nZXRGaWx0ZXIodGhhdC4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIikpXHJcbiAgICAgICAgICAgICAgICAudGhlbigobmV3RmlsdGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hZGRGaWx0ZXJJbnRvSGlzdG9yeSgkLmV4dGVuZCh0cnVlLCB7fSwgbmV3RmlsdGVyKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdSZXF1ZXN0ID0gJC5leHRlbmQodHJ1ZSwge30sIHJlcSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hc2thMiA9ICQuZXh0ZW5kKHRydWUsIHt9LCBuZXdGaWx0ZXIuZmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAvL21hc2thMi5jZnUgPSAkLmV4dGVuZCh7fSwgbmV3RmlsdGVyLmZpbHRlcj8uY2Z1KTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIG1hc2thMj8uY2Z1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09IFwidWVmXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2thMi5jZnVbbmFtZV0gPSBudWxsIGFzIGFueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hc2thMi51ZWYgPSB2b2lkIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgc3RydWt0UG9waXMgPSB0aGlzLnBhcmVudENudC51c2VyU2V0dGluZ3M/LmdldChcInJvenNpcmVueVBvcGlzQXV0b0FkZEdyaWRDb2x1bW5zXCIpIGFzIGJvb2xlYW4gPz8gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9tYXNrYTIuY2Z1W1widWVmXCJdID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LlR5cFVsb2h5ICE9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlZpY2VsZXRlRmluYW5jb3ZhbmlaYXBpcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcnE6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RaYXBpc0xpc3RSZXF1ZXN0RHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgUmFkZWtTdGF2dTogdGhhdC5DdXJyZW50Um93LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFza2E6IG5ld0ZpbHRlci5maWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgTWFza2EyOiBtYXNrYTIvL25ld0ZpbHRlci5maWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgVHlwVWxvaHk6IHRoYXQuVHlwVWxvaHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgRWxlbWVudHk6IG5ld0ZpbHRlci5lbGVtZW50eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBGaWx0ZXJTdHJQb3BpczogdGhhdC5zaG93UG9waXNTdHJ1a3RQb2xvemt5ID9uZXdGaWx0ZXIuZmlsdGVyU3RyUG9waXM6W11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbG9nb3ZhdEdkcHI6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgU3RyUG9waXNLZXlzOiB0aGF0LnNob3dQb3Bpc1N0cnVrdFBvbG96a3k/dGhhdC5hZGRTdHJQb3Bpc0NvbHVtbnM6W11cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbWF4UmVjb3JkczogLTFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLCBMaW1pdDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBMb2FkRXN1OiB0aGF0LnNob3dFc3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgTG9hZFBvcGlzRG9rbGFkdTogdGhhdC5zaG93UG9waXNTdHJ1a3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvZG1pbmthIG5hIFBBUCB1Y3R5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIFBhcDogdGhhdC51c2VQYXBSb3dzID8geyB2OiB0aGF0LmdldENoZWNrZWRQYXAoKT8wOjEgfSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbWFza2EgPSBuZXdGaWx0ZXIuZmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIG5ld0ZpbHRlci5maWx0ZXI/LmNmdSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFza2EhW25hbWVdID0gbmV3RmlsdGVyLmZpbHRlcj8uY2Z1W25hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBycS5NYXNrYSA9IG1hc2thO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdSZXF1ZXN0W1wiZmlsdGVyc1wiXSA9IHJxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1JlcXVlc3RbXCJmaWx0ZXJzXCJdID0geyBNYXNrYTogbmV3RmlsdGVyLmZpbHRlciwgRWxlbWVudHk6ICgobmV3RmlsdGVyIS5lbGVtZW50eSEpIGFzIGFueSkuZmlsdGVycywgTGltaXQ6IDAsIFR5cFVsb2h5OiB0aGF0LlR5cFVsb2h5IH07XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHQobmV3UmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gbmV3UmVxdWVzdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnl0dm9yZW5pIGtsYXZlc292eWNoIHprcmF0ZWtcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBjcmVhdGVTaG9ydEN1dCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlU2hvcnRDdXQoKTtcclxuICAgICAgICAgICAgcmV0dXJuOyBcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgY3JlYXRlR3JpZEZvcm1hdCh0eXBlWmFwaXM/OiBcIkRldGFpbFwiKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuVWN0LkludGVyZmFjZS5HVWN0U2V6bmFtWmFwaXN1U3RhdnVEdG8gLyomIEdTZXpuYW1aYXBpc3VTdGF2dUR0byovPiB7XHJcbiAgICAgICAgICAgIHZhciBnZiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0bz4oKTtcclxuICAgICAgICAgICAgLy8gUHJpem5hayB6b2JyYXplbmkgZGV0YWlsdVxyXG4gICAgICAgICAgICBsZXQgZGV0YWlsID0gdHlwZVphcGlzID09PSBcIkRldGFpbFwiO1xyXG4gICAgICAgICAgICAvL3ZhciB0b3BvR3JvdXAgPSBcInRvcG9cIjtcclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFN0cnVjdHVyZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRva2xhZHlcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDIzMVwiLCAvL1JDIDMxMTAwMjMxIDogRG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgIGdyb3VwaW5nczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3ByZXNldENhcHRpb246IFwianJlczozMTEwMDIzMVwiLCAvL1JDIDMxMTAwMjMxIDogRG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cGluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzaDogKG1ldGEsIHJvd3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZCA9IG1ldGEuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7ZC5hY318JHtkLm1lc2ljfXwke2Qucm9rfXwke2QubGljfXwke2QuaWNvfXwke2QudWNzfWA7IC8vTk9URTogUHJpZGF0IGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcImFjXCIpLCB1IHZzZWNoIHRlY2h0byBzbG91cGN1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ydDogXCJyb2ssbGljLGljbyx1Y3MsbWVzaWMsYWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhpZGVDb2x1bW46IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nbG9iYWxzLlJlemltUHJvdm96dSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5OS1M6IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5VQ1M6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMubmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LklDTzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcInVjc1wiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudWNzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLnVjcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY286IHRoaXMuZmlsdGVyT3B0aW9ucy51Y3MuaWNvLCBha3RQcm9obDogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5ha3RQcm9obFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgb25seUFjdGl2ZTogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5vbmx5QWN0aXZlLCBjYXB0aW9uOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmNhcHRpb24sIG5hbWU6IFwidWNzXCIsIGZpcnN0RmllbGQ6IHZvaWQgMCwgc2Vjb25kRmllbGQ6IHZvaWQgMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwidWNzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIGRpc2FibGVkOiAhISh0aGlzLlJhZGVrX0RQSCkgJiYgISF0aGlzLkZpbHRlci51Y3NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuQXZvaWRVdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuVXVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51dXNJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMudXVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnV1c0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmljbywgdWNzOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLnVjcywgYWt0UHJvaGw6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuYWt0UHJvaGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBvbmx5QWN0aXZlOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLm9ubHlBY3RpdmUsIGNhcHRpb246IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuY2FwdGlvbiwgbmFtZTogXCJ1dXNcIiwgZmlyc3RGaWVsZDogdm9pZCAwLCBzZWNvbmRGaWVsZDogdm9pZCAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgbW9kZWw6IFwidXVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkaXNhYmxlZDogISEodGhpcy5SYWRla19EUEgpICYmICEhdGhpcy5GaWx0ZXIudWNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkF2b2lkTmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJua3NcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5Lk5rcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLm5rc0ludGVydmFsKHRoaXMuZmlsdGVyT3B0aW9ucy5ua3MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LlNPUjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImljb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhpcy56a3JhdGt5LkljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5LkljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwiaWNvXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiB0aGlzLkV4dGVybmlTdW1hcml6YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBHb3JkaWMuRWtvLkZpbHRlcnMucmFySW50ZXJ2YWwoeyBtb2RlbDogXCJpY29cIiwgb25seUFjdGl2ZTogZmFsc2UsIGNhcHRpb246IHRoaXMuemtyYXRreS5JY28sIGRpc2FibGVkOiAhISh0aGlzLlJhZGVrX0RQSCkgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IEdvcmRpYy5Fa28uRmlsdGVycy5pY29JbnRlcnZhbCh7IG1vZGVsOiBcImljb1wiLCBvbmx5QWN0aXZlOiBmYWxzZSwgY2FwdGlvbjogdGhpcy56a3JhdGt5LkljbywgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLkF2b2lkRXh0IHx8IHRoaXMuZ2xvYmFscy5UeXBTdW1hcml6YWNlICE9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwU3VtYXJpemFjZS5FeHRlcm5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMudGV4dHkuVWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwidWNzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudWNzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLnVjcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy51Y3NJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5pY28sIGFrdFByb2hsOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmFrdFByb2hsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgb25seUFjdGl2ZTogdGhpcy5maWx0ZXJPcHRpb25zLnVjcy5vbmx5QWN0aXZlLCBjYXB0aW9uOiB0aGlzLmZpbHRlck9wdGlvbnMudWNzLmNhcHRpb24sIG5hbWU6IFwidWNzXCIsIGZpcnN0RmllbGQ6IHZvaWQgMCwgc2Vjb25kRmllbGQ6IHZvaWQgMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIG1vZGVsOiBcInVjc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKSAmJiAhIXRoaXMuRmlsdGVyLnVjc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuQXZvaWRVdXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidXVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IHRoaXMuemtyYXRreS5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLnRleHR5LlV1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLnV1cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmljbywgdWNzOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLnVjcywgYWt0UHJvaGw6IHRoaXMuZmlsdGVyT3B0aW9ucy51dXMuYWt0UHJvaGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgb25seUFjdGl2ZTogdGhpcy5maWx0ZXJPcHRpb25zLnV1cy5vbmx5QWN0aXZlLCBjYXB0aW9uOiB0aGlzLmZpbHRlck9wdGlvbnMudXVzLmNhcHRpb24sIG5hbWU6IFwidXVzXCIsIGZpcnN0RmllbGQ6IHZvaWQgMCwgc2Vjb25kRmllbGQ6IHZvaWQgMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBtb2RlbDogXCJ1dXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCBkaXNhYmxlZDogISEodGhpcy5SYWRla19EUEgpICYmICEhdGhpcy5GaWx0ZXIudWNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLkF2b2lkTmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiB0aGlzLnprcmF0a3kuTmtzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdGhpcy50ZXh0eS5Oa3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMubmtzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBmaWx0ciBuYSBkcnVoIGRva2xhZHVcclxuICAgICAgICAgICAgbGV0IGRyZFNlcnZlckZpbHRlciA9IEdvcmRpYy5Fa28uRmlsdGVycy5kcmQodGhpcy5maWx0ZXJPcHRpb25zLmRyZCk7XHJcblxyXG5cclxuICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZHJkXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTIgXCIsIC8vUkMgMzExMDAwNTIgOiBIXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMTAyXCIsIC8vUkMgMzExMDAxMDIgOiBEcnVoIGRva2xhZHUgKERSRClcclxuICAgICAgICAgICAgICAgIC8vdG9vbHRpcFRlbXBsYXRlOiBcImpyZXM6MzExMDAxMDJcIiwgLy9SQyAzMTEwMDEwMiA6IERydWggZG9rbGFkdSAoRFJEKVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBkcmRTZXJ2ZXJGaWx0ZXIvL0dvcmRpYy5Fa28uRmlsdGVycy5kcmQodGhpcy5maWx0ZXJPcHRpb25zLmRyZClcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDUxIFwiLCAvL1JDIDMxMTAwMDUxIDogTVxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDAxMVwiLCAvL1JDIDMxMTAwMDExIDogTcSbc8OtY1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMwLFxyXG4gICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwibWVzaWNcIiksXHJcbiAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwibWVzaWNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDUxXCIsIGRpc2FibGVkOiAhISh0aGlzLkZpbHRlciAmJiB0aGlzLlN0cmljdEZpbHRlciAmJiB0aGlzLkZpbHRlci5tZXNpYykgfSkgLy9SQyAzMTEwMDA1MSA6IE1cclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtZXNpY1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTFcIiwgLy9SQyAzMTEwMDA1MSA6IE1cclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogISEodGhpcy5GaWx0ZXIgJiYgdGhpcy5TdHJpY3RGaWx0ZXIgJiYgdGhpcy5GaWx0ZXIubWVzaWMpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RmllbGQ6IHsgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SYW5nZSh7IG1pbjogMSwgbWF4OiAxMyB9KV0gfSxcclxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRGaWVsZDogeyB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJhbmdlKHsgbWluOiAxLCBtYXg6IDEzIH0pXSB9LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlphcGlzb3ZhKSB7XHJcbiAgICAgICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDUzIFwiLCAvL1JDIDMxMTAwMDUzIDogRFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAxMzBcIiwgLy9SQyAzMTEwMDEzMCA6IERlblxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMCxcclxuICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiZGVuXCIsIGNhcHRpb246IFwianJlczozMTEwMDA1M1wiLCBkaXNhYmxlZDogISEodGhpcy5GaWx0ZXIgJiYgdGhpcy5TdHJpY3RGaWx0ZXIgJiYgdGhpcy5GaWx0ZXIuZGVuKSB9KSAvL1JDIDMxMTAwMDUzIDogRFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiZGVuXCIsIGNhcHRpb246IFwianJlczozMTEwMDA1M1wiLCAvL1JDIDMxMTAwMDUzIDogRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogISEodGhpcy5GaWx0ZXIgJiYgdGhpcy5TdHJpY3RGaWx0ZXIgJiYgdGhpcy5GaWx0ZXIuZGVuKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RGaWVsZDogeyB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJhbmdlKHsgbWluOiAxLCBtYXg6IDMxIH0pXSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRGaWVsZDogeyB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJhbmdlKHsgbWluOiAxLCBtYXg6IDMxIH0pXSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibGljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJMSUNcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgICAgICAgICAgICAgaGlkZGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcImxpY1wiKSxcclxuICAgICAgICAgICAgICAgICAgICAvLy8vc2VydmVyRmlsdGVyOiAvL1RPRE9cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vTk9URTogWmF0aW0gbmVuaSBwb3RyZWJuZVxyXG4gICAgICAgICAgICAgICAgLy92YXIgbWF4ID0gMFxyXG4gICAgICAgICAgICAgICAgLy9zd2l0Y2ggKHRoaXMuVHlwVWxvaHkpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhc2UgXCJVY2V0bmljdHZpWmFwaXNcIjogbWF4ID0gdGhpcy5nbG9iYWxzLkRlbGthQWNVY3Q7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FzZSBcIlJvenBvY2V0WmFwaXNcIjogbWF4ID0gdGhpcy5nbG9iYWxzLkRlbGthQWNSb3o7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgZGVmYXVsdDogbWF4ID0gdGhpcy5nbG9iYWxzLkRlbGthQWNNYXg7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU0XCIsIC8vUkMgMzExMDAwNTQgOiBEb2tsYWRcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICAgICAgYWdncmVnYXRlOiBHb3JkaWMuRGF0YS5BZ2dyZWdhdGVzLmZpcnN0KFwiYWNcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuYWNJbnRlcnZhbCh0aGlzLmZpbHRlck9wdGlvbnMuYWMpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcInBvcGlzZG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU0XCIsIC8vUkMgMzExMDAwNTQgOiBEb2tsYWRcclxuICAgICAgICAgICAgICAgIC8vICAgIHdpZHRoOiA3MCxcclxuICAgICAgICAgICAgICAgIC8vICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcInBvcGlzZG9rbGFkdVwiKSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmFjSW50ZXJ2YWwodGhpcy5maWx0ZXJPcHRpb25zLmFjKVxyXG4gICAgICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3dQb3Bpc1N0cnVrdClcclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicGRva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1NVwiLCAvL1JDIDMxMTAwMDU1IDogU3RydWt0dXJvdmFuw70gcG9waXMgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaGlkZGVuOiAhKCh0aGlzLnBhcmVudENudC51c2VyU2V0dGluZ3M/LmdldChcInN0cnVrdHVyb3ZhbnlQb3Bpc0Rva2xhZHVBdXRvQWRkR3JpZENvbHVtbnNcIikgYXMgYm9vbGVhbiA/PyBmYWxzZSkgJiYgIWRldGFpbCksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9OT1RFOiBWIFRLIG1hamkgc2tyeXRvLCBieXZhIHZpZGV0IHBvbGUgJ3BvcGlzJywga2RlIGplIHN0ZWpueSBwcmVmYWJcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ1NpbmdsZSh7IG1vZGVsOiBcInBkb2tcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU1XCIgfSkgLy9SQyAzMTEwMDA1NSA6IFN0cnVrdHVyb3ZhbsO9IHBvcGlzIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy8vLyBzbG92YSB1Y2V0bmkgdmV0eVxyXG4gICAgICAgICAgICAvL2xldCBjZnVJbnRlcnZhbE9wdGlvbnM6IEdvcmRpYy5Fa28uQ2Z1VXRpbHMuSUdDZnVGaWx0ZXJPcHRpb25zID0ge1xyXG4gICAgICAgICAgICAvLyAgICBpc1JvejogdGhpcy5Sb3pwb2NldCxcclxuICAgICAgICAgICAgLy8gICAgaXNVY3Q6IHRoaXMuVWNldG5pY3R2aSxcclxuICAgICAgICAgICAgLy8gICAgY2hlY2tVZXRlOiB0aGlzLnBhcmVudENudC5la29QYXJhbXMuQ2hlY2tVZXRlIGFzIGFueSxcclxuICAgICAgICAgICAgLy8gICAgZ2V0SW50ZXJ2YWxPcHRpb25zOiAoZHRvLCBvcHRzKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICBpZiAoIXRoaXMuRmlsdGVyIHx8ICF0aGlzLlN0cmljdEZpbHRlcilcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gb3B0cztcclxuICAgICAgICAgICAgLy8gICAgICAgIG9wdHMuZGlzYWJsZWQgPSAhISF0aGlzLkZpbHRlcltkdG8ubmFtZV07XHJcbiAgICAgICAgICAgIC8vICAgICAgICByZXR1cm4gb3B0cztcclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvL307XHJcblxyXG4gICAgICAgICAgICAvL2dmLmFkZFNvcnRlZEVrb0NmdVNldChHb3JkaWMuRWtvLkNmdVV0aWxzLmdldENmdVNldFNlcnZlckZpbHRlcnModGhpcy5wYXJlbnRDbnQsIGNmdUludGVydmFsT3B0aW9ucykpO1xyXG5cclxuICAgICAgICAgICAgZ2YuYWRkU29ydGVkRWtvQ2Z1U2V0KHRoaXMuZ2V0Q2Z1U2V0U2VydmVyRmlsdGVycyh0cnVlKSk7XHJcblxyXG4gICAgICAgICAgICAvL2dmLmFkZE1EKHsgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzBcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU2XCIgfSApfSk7XHJcbiAgICAgICAgICAgIC8vZ2YuYWRkRGFsKHsgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHsgbW9kZWw6IFwiYzFcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU3XCIgfSApfSk7XHJcbiAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYzBcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1NlwiLCAvL1JDIDMxMTAwMDU2IDogTURcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNDNcIiwgLy9SQyAzMTEwMDI0MyA6IE3DoSBEw6F0aVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwXCIsIGNhcHRpb246IFwianJlczozMTEwMDA1NlwiIH0pIC8vUkMgMzExMDAwNTYgOiBNRFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU3XCIsIC8vUkMgMzExMDAwNTcgOiBEYWxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoeyBtb2RlbDogXCJjMVwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTdcIiB9KSAvL1JDIDMxMTAwMDU3IDogRGFsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImMwYzFcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA5MFwiLCAvL1JDIDMxMTAwMDkwIDogTUQtRGFsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjQ0XCIsIC8vUkMgMzExMDAyNDQgOiBNw6EgRMOhdGkgLSBEYWxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICBoaWRkZW46ICF0aGlzLmdsb2JhbHMuUmFkX1pvYnJhek1kRGFsICxcclxuICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7IG1vZGVsOiBcImMwYzFcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDkwXCIgfSkgLy9SQyAzMTEwMDA5MCA6IE1ELURhbFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDcxXCIsIC8vUkMgMzExMDAwNzEgOiBQb3BpcyDFmcOhZGt1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdTaW5nbGUoeyBtb2RlbDogXCJwb3Bpc1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzFcIiB9KSAvL1JDIDMxMTAwMDcxIDogUG9waXMgxZnDoWRrdVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gXHJcbiAgICAgICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rX3VlalwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA3MlwiLCAvL1JDIDMxMTAwMDcyIDogUm9rIERQSFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNThcIiwgLy9SQyAzMTEwMDI1OCA6IFJvayB1c2t1dGXEjW7Em27DrSB6ZGFuaXRlbG7DqWhvIHBsbsSbbsOtICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwicm9rX3VlalwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzJcIiwgZGlzYWJsZWQ6IHRoaXMuVHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuRGFub3ZhRXZpZGVuY2VaYXBpcyB8fCAhISh0aGlzLlJhZGVrX0RQSClcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSkgIC8vUkMgMzExMDAwNzIgOiBSb2sgRFBIXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY191ZWpcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzNcIiwgLy9SQyAzMTEwMDA3MyA6IE3Em3PDrWMgRFBIXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1N1wiLCAvL1JDIDMxMTAwMjU3IDogTcSbc8OtYyB1c2t1dGXEjW7Em27DrSB6ZGFuaXRlbG7DqWhvIHBsbsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1lc2ljX3VlaiBcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDczXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLCBkaXNhYmxlZDogdGhpcy5UeXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5EYW5vdmFFdmlkZW5jZVphcGlzIHx8ICEhKHRoaXMuUmFkZWtfRFBIKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pIC8vUkMgMzExMDAwNzMgOiBNxJtzw61jIERQSFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiemRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzRcIiwgLy9SQyAzMTEwMDA3NCA6IFpEXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1MFwiLCAvL1JDIDMxMTAwMjUwIDogUMWZw616bmFrIERQSCwgemRhIGplIHrDoXBpcyBuZWRhxYhvdsO9LCB6w6FrbGFkIGRhbsSbLCBkYcWIIGFwb2QuXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQ1LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKHJvdywgbWV0YSwgY2VsbEluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uRmlsdGVycy5aZFV0aWxzLnpkR2V0TGFiZWwocm93LnpkIGFzIG51bWJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy56ZEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiemRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc0XCIsIC8vUkMgMzExMDAwNzQgOiBaRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1Byb0Vrb0ZpbHRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6ICEhKHRoaXMuUmFkZWtfRFBIKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vZ2YuYWRkUGlkKHtcclxuICAgICAgICAgICAgLy8gICAgbmFtZTogXCJpeHBcIixcclxuICAgICAgICAgICAgLy8gICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgLy8gICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaXhwKHsgbW9kZWw6IFwiaXhwXCIsIGNhcHRpb246IFwianJlczozMDI1MDY2M1wiIH0pIC8vUkMgMzAyNTA2NjMgOiBJZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA3NVwiLCAvL1JDIDMxMTAwMDc1IDogUElEXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDY2NlwiLCAvL1JDIDMwMjUwNjY2IDogSWRlbnRpZmlrw6F0b3Igw7rEjXR1asOtY8OtaG8gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaXhwKHsgbW9kZWw6IFwiaXhwXCIsIGNhcHRpb246IFwianJlczozMTEwMDA3NVwiLyosIHVzZVNvdXZpc2VqaWNpOnRydWUqLyB9KSAvL1JDIDMxMTAwMDc1IDogUElEXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX3ByaW1cIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDY2NFwiLCAvL1JDIDMwMjUwNjY0IDogUElEIHByaW0uIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzAyNTA2NjVcIiwgLy9SQyAzMDI1MDY2NSA6IElkZW50aWZpa8OhdG9yIHByaW3DoXJuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nU2luZ2xlKHsgbW9kZWw6IFwiaXhwX3ByaW1cIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwNjY0XCIgfSkgLy9SQyAzMDI1MDY2NCA6IFBJRCBwcmltLiBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLml4cCh7IG1vZGVsOiBcIml4cF9wcmltXCIsIGNhcHRpb246IFwianJlczozMDI1MDY2NFwiLCB1c2VTb3V2aXNlamljaTpmYWxzZSB9KSAvL1JDIDMxMTAwMDc1IDogUElEXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5nbG9iYWxzLlR5cFByYWNlV2ZsID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjX2FnXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc3XCIsIC8vUkMgMzExMDAwNzcgOiBBZ2VuZG92w6kgxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJhY19hZ1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzdcIiB9KSAvL1JDIDMxMTAwMDc3IDogQWdlbmRvdsOpIMSNw61zbG9cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gT3ByYXZhIHogZHV2b2R1IHNlc2t1cG92YW5pICh6b2JyYXpvdmFsYSBzZSBob2Rub3RhIHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c190eXBcIixcclxuICAgICAgICAgICAgICAgICAgICAvL25hbWU6IFwiaXhzX3R5cF90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTAyODFcIiwgLy9SQyAzMDI1MDI4MSA6IFR5cCBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCwgXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiBcIntpeHNfdHlwX3R4dDp0cmltOmVuY29kZX1cIixcclxuICAgICAgICAgICAgICAgICAgICBwcmludGFibGU6IFwiI3JlbmRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEZpZWxkczogW1wiaXhzX3R5cF90eHRcIl0sIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZ3JvdXBpbmdzOiB7IGdyb3VwaW5nUHJlc2V0OlwiXCIsfSxcclxuICAgICAgICAgICAgICAgICAgICBncm91cGluZzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZ2dyZWdhdGU6IEdvcmRpYy5EYXRhLkFnZ3JlZ2F0ZXMuZmlyc3QoXCJpeHNfdHlwX3R4dFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jYXB0aW9uVGVtcGxhdGU6IFwie2l4c190eXBfdHh0OnRyaW06ZW5jb2RlfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3NsVHlwSW50ZXJ2YWwoeyBtb2RlbDogXCJpeHNfdHlwPWl4c190eXA7aXhzX3R5cF90eHQ9bmF6ZXZcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjgxXCIgfSkgLy9SQyAzMDI1MDI4MSA6IFR5cCBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vaWYgKCF0aGlzLmdsb2JhbHMuRXh0ZXJuaVN1bWFyaXphY2UpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIGlmICh0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuUHJpbWFybmlQb3phZGF2a3laYXBpcyB8fCB0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQmFsYW5jb3ZhbmlaYXBpcykge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcIml4cF9yb3pcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTUyXCIsIC8vUkMgMzAyNTAxNTIgOiBQSUQgUk9cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMDI1MDE1MlwiLCAvL1JDIDMwMjUwMTUyIDogUElEIFJPXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLml4cCh7IG1vZGVsOiBcIml4cF9yb3pcIiwgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTUyXCIgfSkgLy9SQyAzMDI1MDE1MiA6IFBJRCBST1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcIml4cF9wcmltXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDE1M1wiLCAvL1JDIDMwMjUwMTUzIDogUElEIEJMS1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwMTUzXCIsIC8vUkMgMzAyNTAxNTMgOiBQSUQgQkxLXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLml4cCh7IG1vZGVsOiBcIml4cF9wcmltXCIsIGNhcHRpb246IFwianJlczozMDI1MDE1M1wiIH0pIC8vUkMgMzAyNTAxNTMgOiBQSUQgQkxLXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgXHJcbiAgICAgICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2X3JmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDk3XCIsIC8vUkMgMzExMDAwOTcgOiBabcSbbnUgcHJvdmVkbFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nU2luZ2xlKHsgbW9kZWw6IFwibmF6ZXZfcmZcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDk3XCIgfSkgLy9SQyAzMTEwMDA5NyA6IFptxJtudSBwcm92ZWRsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGdmLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDAxNVwiLCAvL1JDIDMxMTAwMDE1IDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEzMCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5Fa28uRmlsdGVycy5kYXRlSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RGaWVsZDogeyB2YWx1ZVR5cGU6IFwiZGF0ZXRpbWVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRGaWVsZDogeyB2YWx1ZVR5cGU6IFwiZGF0ZXRpbWVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwMTVcIiAvL1JDIDMxMTAwMDE1IDogRGF0dW0gem3Em255XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oeyAvL05PVEU6IFYgVEsgamUgdG8gcHJpZGFubyBqYWtvIEFkZExvb2t1cENvbHVtbiEgKGFyZy46IERldGFpbFR5cHVBZ2VuZHkuemtyX2FnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPcHJhdmEgeiBkdXZvZHkgc2Vza3Vwb3Zhbmkoem9icmF6b3ZhbGEgc2UgaG9kbm90YSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLy9uYW1lOiBcInR5cF9hZ190eHRcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9hZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA3OVwiLCAvL1JDIDMxMTAwMDc5IDogQWdlbmRhXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IFwie3R5cF9hZ190eHQ6dHJpbTplbmNvZGV9XCIsLy8gZmllbGQ6IFwidHlwX2FnX3R4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoRmllbGRzOiBbXCJ0eXBfYWdfdHh0XCJdLCBcclxuICAgICAgICAgICAgICAgICAgICBwcmludGFibGU6IFwiI3JlbmRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwaW5nOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFnZ3JlZ2F0ZTogR29yZGljLkRhdGEuQWdncmVnYXRlcy5maXJzdChcInR5cF9hZ190eHRcIiksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkZpbHRlclByZWZhYnMudHlwX2FnKHsgbW9kZWw6IFwidHlwX2FnXCIsIHprcl9hZ1BhdGg6IFwidHlwX2FnX3R4dFwiLCBpc1JvenBvY2V0OiBmYWxzZSwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc5XCIgfSkgLy9SQyAzMTEwMDA3OSA6IEFnZW5kYVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoLyp0aGlzLmdsb2JhbHMuVHlwUHJhY2VFU1UgPT09IFwiTmVcIiB8fCovIGRldGFpbCkgeyB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmdsb2JhbHMuUmV6aW1Qcm92b3p1ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LlNPUiAmJiB0aGlzLmdsb2JhbHMuVHlwU3VtYXJpemFjZSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cFN1bWFyaXphY2UuRXh0ZXJuaSkgeyB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvd0VzdSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZXN1X3R4dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNjY3XCIsIC8vUkMgMzAyNTA2NjcgOiBFU1VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNTJcIiwgLy9SQyAzMTEwMDI1MiA6IEV4dGVybsOtIHN1Ympla3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxODAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXI6IHRoaXMuVHlwVWxvaHkgPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvWmFwaXMgPyB2b2lkIDAgOiBHb3JkaWMuVWNyLldlYkNsaWVudC5GaWx0ZXJQcmVmYWJzLmVzdV90eHQoeyBtb2RlbDogXCJlc3VfdHh0XCIsIGl4c19lc3VQYXRoOiBcIl9lc3VfdHh0X2l4c1wiLCBjYXB0aW9uOiBcImpyZXM6MzAyNTA2NjdcIiB9KSAgLy9SQyAzMDI1MDY2NyA6IEVTVVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlc3VfaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwODAgezB9XCIuZm9ybWF0KHRoaXMuemtyYXRreS5JY28pICwgIC8vUkMgMzExMDAwODAgOiBFU1VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNTNcIiwgLy9SQyAzMTEwMDI1MyA6IEnEjE8gRXh0ZXJuw61obyBzdWJqZWt0dSBwcmltw6FybsOtaG8gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiB0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250b1phcGlzID8gdm9pZCAwIDogR29yZGljLlVjci5XZWJDbGllbnQuRmlsdGVyUHJlZmFicy5lc3VfaWNvKHsgbW9kZWw6IFwiZXN1X2ljb1wiLCBpeHNfZXN1UGF0aDogXCJfZXN1X2ljb19peHNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgwXCIgKyBcIiBcIiArIHRoaXMuemtyYXRreS5JY28gfSkgLy9SQyAzMTEwMDA4MCA6IEVTVVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlc3VfcmNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA4MVwiLCAvL1JDIDMxMTAwMDgxIDogRVNVIFLEjFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1NFwiLCAvL1JDIDMxMTAwMjU0IDogUm9kbsOpIMSNw61zbG8gRXh0ZXJuw61obyBzdWJqZWt0dSBwcmltw6FybsOtaG8gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiB0aGlzLlR5cFVsb2h5ID09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuU2FsZG9rb250b1phcGlzID8gdm9pZCAwIDogR29yZGljLlVjci5XZWJDbGllbnQuRmlsdGVyUHJlZmFicy5lc3VfcmMoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImVzdV9yY1wiLCBpeHNfZXN1UGF0aDogXCJfZXN1X3R4dF9yY1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwODFcIiwgLy9SQyAzMTEwMDA4MSA6IEVTVSBSxIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSYWRfRXN1X1JjVnlobDogdGhpcy5nbG9iYWxzLlJhZF9Fc3VfUmNWeWhsIVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlByaXpJaXNzcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpaXNzcERpc2FibGUgPSB0aGlzLlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLklJU1NQX1ByZXVjdG92YW5pX3N0YXZ5O1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkX2hkcl9yaXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgyXCIsIC8vUkMgMzExMDAwODIgOiBJRCBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjU1XCIsIC8vUkMgMzExMDAyNTUgOiBJZGVudGlmaWvDoXRvciByZXplcnZhY2Ugcm96cG/EjXRvdsO9Y2ggcHJvc3TFmWVka8WvIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaWRfaGRyX3Jpc1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwODJcIiwgZGlzYWJsZWQ6IGlpc3NwRGlzYWJsZSwgZmlyc3RGaWVsZDogeyBtYXhMZW5ndGg6IDkgfSwgc2Vjb25kRmllbGQ6IHsgbWF4TGVuZ3RoOiA5IH0gfSkgLy9SQyAzMTEwMDA4MiA6IElEIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbWF4TGVuZ3RoOiA5XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyYWRla19oZHJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgzXCIsLy9SQyAzMTEwMDA4MyA6IMWZw6FkZWsgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1NlwiLCAvL1JDIDMxMTAwMjU2IDogxZjDoWRlayByZXplcnZhY2Ugcm96cG/EjXRvdsO9Y2ggcHJvc3TFmWVka8WvIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHsgbW9kZWw6IFwicmFkZWtfaGRyXCIsIGNhcHRpb246IFwianJlczozMTEwMDA4M1wiLCBkaXNhYmxlZDogaWlzc3BEaXNhYmxlIH0pIC8vUkMgMzExMDAwODMgOiDFmcOhZGVrIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNfcHJlcF9haXNwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDM0NFwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9SQyAzMDI1MDM0NCA6IElJU1NQIFDFmWVwb8SNdGVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzksLy8gZml4ZWRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiY2VudGVyXCIsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5zX3ByZXBfYWlzcCAhPSBudWxsICYmIGRhdGEuc19wcmVwX2Fpc3AgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1jaGVjay1jaXJjbGUgZy1zdGF0ZS10ZXh0IGctc3RhdGUtc3VjY2Vzc1wiLCB0ZXh0OiBcImpyZXM6MzAyNTAzNDRcIiwgLy9SQyAzMDI1MDM0NCA6IElJU1NQIFDFmWVwb8SNdGVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Rvb2x0aXA6IFwianJlczozMDI1MDI4OFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTsgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhLmlkX2hkcl9yaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgZGF0YS5pZF9oZHJfcmlzICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWV4Y2xhbSBnLXN0YXRlLWVycm9yXCIsIHRleHQ6IFwianJlczozMDI1MDM0NVwiLCAvL1JDIDMwMjUwMzQ1IDogTmV6cHJhY292w6Fub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Rvb2x0aXA6IFwianJlczozMDI1MDI4OVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuYWRkU3RyUG9waXNDb2x1bW5zICYmICFkZXRhaWwgJiYgdGhpcy5zaG93UG9waXNTdHJ1a3RQb2xvemt5KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFkZFN0clBvcGlzQ29sdW1ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjID0gdGhpcy5hZGRTdHJQb3Bpc0NvbHVtbnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRlc2NyaXB0aW9uID0gdGhpcy5maWx0ZXJTdHJQb3Bpcz8uZmluZCgocykgPT4geyByZXR1cm4gcy5rbGljID09PSBjOyB9KT8ua2xpY190eHQgPz8gYztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTAtMTItMCwgTS0wLTEyLTAsIFMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oZGVzY3JpcHRpb24pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBjIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjYXB0aW9uID0gXCJTUEQgLSBcIiArIGM7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGNhcHRpb24gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IGB7c3RydWt0UG9waXMuJHtjfS5ob2Rub3RhfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW50YWJsZTpcIiNyZW5kZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXQ6IFwiZ2Zvcm1ib3hcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogJC5leHRlbmQoR29yZGljLkVrby5GaWx0ZXJzLlV0aWxzLmdldEZvcm1Cb3hGaWx0ZXJEZWZhdWx0cyh7fSksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogKHM6IE9iamVjdExpdGVyYWw8c3RyaW5nPikgPT4geyByZXR1cm4gcyAmJiBzW2NdID8gc1tjXSA6IEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5mb3JtYXRFbXB0eVZhbHVlKGNhcHRpb24pICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCB2PzogeyB2YWx1ZTogT2JqZWN0TGl0ZXJhbDxzdHJpbmc+IH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbCA9IHY/LnZhbHVlW2NdID8/IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmcGRhdGEgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy4kZmlsdGVyUGFuZWwuZ2ZpbHRlcnBhbmVsKFwiZ2V0Q3VycmVudERhdGFcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyU3RyUG9waXMgPSBmcGRhdGE/LmZpbHRlclN0clBvcGlzIGFzIEdTdHJ1a3R1cm92YW55UG9waXNGaWx0ZXJEdG9bXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSBmaWx0ZXJTdHJQb3Bpcz8uZmluZCgocykgPT4geyByZXR1cm4gcy5rbGljID09PSBjOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuaG9kbm90YSA9IHZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGZpbHRlclBhbmVsLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIsIGZwZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBmdW5jdGlvbiAob3AsIGR0bywgbW9kZWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAob3ApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhcHBseVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHYgPSBkdG9bY107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIHYgIT09IFwidW5kZWZpbmVkXCIpICQodGhpcykuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgeyBjOiB2IH0sIHsgdHJpZ2dlckNoYW5nZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGVjdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkKHRoaXMpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBjYXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludmFsaWRUcmFuc2Zvcm06ICh2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdiA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsW2NdID0gdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgYXMgR0Zvcm1Cb3hPcHRpb25zPE9iamVjdExpdGVyYWw8c3RyaW5nPj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ2YgYXMgYW55O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZVByb2ZpbGVzKGdmOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3RTZXpuYW1aYXBpc3VTdGF2dUR0by8qJkdTZXpuYW1aYXBpc3VTdGF2dUR0byovPik6IElHU2V6bmFtWmFwaXN1UHJvZmlsZXMge1xyXG4gICAgICAgICAgICBsZXQgcHJvZmlsZXM6IElHU2V6bmFtWmFwaXN1UHJvZmlsZXMgPSB7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7IG5hbWU6IFwianJlczozMTEwMDIzMlwiLCBjb2x1bW5zOiB7fSwgY29sdW1uTGlzdDpcIlwiIH0gLy9SQyAzMTEwMDIzMiA6IFbDvWNob3rDrVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2dmLmNvbHVtbnMuZmlsdGVyKChjKSA9PiB7IHJldHVybiAoIWMuaGlkZGVuICYmIGMubmFtZSAhPSBcIml4cF9wcmltXCIpOyB9KVxyXG4gICAgICAgICAgICAvLyAgICAuZm9yRWFjaCgoYykgPT4geyBwcm9maWxlcy5kZWZhdWx0LmNvbHVtbnMhW2MubmFtZSFdID0geyBoaWRkZW46IGZhbHNlIH1cclxuICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAvLyAgICApO1xyXG4gICAgICAgICAgICBwcm9maWxlcy5kZWZhdWx0LmNvbHVtbkxpc3QgPSggZ2YuY29sdW1ucy5maWx0ZXIoKGMpID0+IHsgcmV0dXJuICghYy5oaWRkZW4gLyomJiBjLm5hbWUgIT0gXCJpeHBfcHJpbVwiKi8pOyB9KSlcclxuICAgICAgICAgICAgLm1hcCgoYyk9PmMubmFtZSkuam9pbihcIixcIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlphcGlzb3ZhKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9maWxlcy5kZWZhdWx0Lm5hbWUgPSBcImpyZXM6MzExMDAyNDFcIjsgLy9SQyAzMTEwMDI0MSA6IFrDoXBpc3kgKHbDvWNob3rDrSlcclxuICAgICAgICAgICAgICAgIHByb2ZpbGVzLmRva2xhZHkgPSB7IG5hbWU6IFwianJlczozMTEwMDIzMVwiLCBjb2x1bW5zOiB7fSwgZ3JvdXBpbmc6IFwiZG9rbGFkeVwiIH07IC8vUkMgMzExMDAyMzEgOiBEb2tsYWR5XHJcbiAgICAgICAgICAgICAgICBwcm9maWxlcy5kb2tsYWR5LmNvbHVtbnMgPSAkLmV4dGVuZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9rbGFkeTogeyBoaWRkZW46IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGRvazogeyBoaWRkZW46IGZhbHNlIH1cclxuICAgICAgICAgICAgICAgIH0sIHByb2ZpbGVzLmRlZmF1bHQuY29sdW1ucyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwcm9maWxlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVkYWxvc3QgcHJlZCB2bGFzdG5pbSBuYWN0ZW5pbS4gTHplIHpydXNpdCBuYWN0ZW5pXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgYmVmb3JlTG9hZGluZygpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBncmlkID0gdGhhdC5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIGlmIChncmlkID09IG51bGwpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzaG93UG9waXNTdHJ1a3RQb2xvemt5TmV3ID0gdGhhdC5wYXJlbnRDbnQudXNlclNldHRpbmdzPy5nZXQoXCJyb3pzaXJlbnlQb3Bpc0F1dG9BZGRHcmlkQ29sdW1uc1wiKSBhcyBib29sZWFuID8/IGZhbHNlO1xyXG4gICAgICAgICAgICBsZXQgc2hvd1BvcGlzU3RydWt0TmV3ID0gdGhhdC5wYXJlbnRDbnQudXNlclNldHRpbmdzPy5nZXQoXCJzdHJ1a3R1cm92YW55UG9waXNEb2tsYWR1QXV0b0FkZEdyaWRDb2x1bW5zXCIpIGFzIGJvb2xlYW4gPz8gZmFsc2U7XHJcbiAgICAgICAgICAgIGxldCBzaG93RXN1TmV3ID0gKHRoYXQucGFyZW50Q250LnVzZXJTZXR0aW5ncz8uZ2V0KFwiZXN1QWRkR3JpZENvbHVtbnNcIikgYXMgYm9vbGVhbiA/PyBmYWxzZSk7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW5zUG9waXNTdHJ1a3ROZXcgPSAodGhhdC5wYXJlbnRDbnQudXNlclNldHRpbmdzPy5nZXQoXCJyb3pzaXJlbnlQb3Bpc1Nob3dHcmlkQ29sdW1uc1wiKSk7XHJcbiAgICAgICAgICAgIHRoYXQuc2hvd0VzdSA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuem9icmF6aXRFU1VBY3Q/LmNoZWNrZWQoKSBhcyBib29sZWFuO1xyXG4gICAgICAgICAgICB0aGF0LnNob3dQb3Bpc1N0cnVrdFBvbG96a3kgPSB0aGF0LnBhcmVudENudC5hY3Rpb25zLnpvYnJheml0U3R1a3RQb3Bpc1BvbEFjdD8uY2hlY2tlZCgpIGFzIGJvb2xlYW47XHJcbiAgICAgICAgICAgIHRoYXQuc2hvd1BvcGlzU3RydWt0ID0gdGhhdC5wYXJlbnRDbnQuYWN0aW9ucy56b2JyYXppdFN0dWt0UG9waXNBY3Q/LmNoZWNrZWQoKSBhcyBib29sZWFuO1xyXG5cclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgc2hvd1BvcGlzU3RydWt0TmV3ICE9IHRoYXQuc2hvd1BvcGlzU3RydWt0XHJcbiAgICAgICAgICAgICAgICB8fCB0aGF0LnNob3dQb3Bpc1N0cnVrdE9sZCAhPSB0aGF0LnNob3dQb3Bpc1N0cnVrdFxyXG4gICAgICAgICAgICAgICAgfHwgdGhhdC5zaG93RXN1ICE9IHNob3dFc3VOZXdcclxuICAgICAgICAgICAgICAgIHx8IHRoYXQuc2hvd0VzdU9sZCAhPSB0aGF0LnNob3dFc3VcclxuICAgICAgICAgICAgICAgIHx8IHRoYXQuc2hvd1BvcGlzU3RydWt0UG9sb3preSAhPSBzaG93UG9waXNTdHJ1a3RQb2xvemt5TmV3ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfHwgdGhhdC5zaG93UG9waXNTdHJ1a3RQb2xvemt5ICE9IHRoYXQuc2hvd1BvcGlzU3RydWt0UG9sb3preU9sZFxyXG4gICAgICAgICAgICAgICAgfHwgdGhhdC5zaG93UG9waXNTdHJ1a3QgIT0gc2hvd1BvcGlzU3RydWt0TmV3XHJcbiAgICAgICAgICAgICAgICB8fCB0aGF0LmFkZFN0clBvcGlzQ29sdW1ucyAhPSBjb2x1bW5zUG9waXNTdHJ1a3ROZXdcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFkZFN0clBvcGlzQ29sdW1ucyA9IGNvbHVtbnNQb3Bpc1N0cnVrdE5ldztcclxuICAgICAgICAgICAgICAgIGlmIChzaG93RXN1TmV3KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0VzdSA9IHNob3dFc3VOZXc7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2hvd1BvcGlzU3RydWt0UG9sb3preU5ldylcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dQb3Bpc1N0cnVrdFBvbG96a3kgPSBzaG93UG9waXNTdHJ1a3RQb2xvemt5TmV3O1xyXG4gICAgICAgICAgICAgICAgaWYgKHNob3dQb3Bpc1N0cnVrdE5ldylcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dQb3Bpc1N0cnVrdCA9IHNob3dQb3Bpc1N0cnVrdE5ldztcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1ucyA9IHRoYXQuY3JlYXRlR3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gc3BvbGVjbmUgc2xvdXBjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDb21tb25Db2xzKGNvbHVtbnMpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlYXJjaEl0ZW1zID0gY29sdW1ucy5jb2x1bW5zLmZpbHRlcihjID0+IGMuY29sdW1uVHlwZSAhPT0gXCJkYXRldGltZVwiICYmIGMuY29sdW1uVHlwZSAhPT0gXCJjdXJyZW5jeVwiKS5tYXAoZSA9PiBcIipcIiArIGUubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1uc09sZCA9IGdyaWQuZ2dyaWQoXCJvcHRpb25cIiwgXCJjb2x1bW5zXCIpIGFzIEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8YW55PjtcclxuICAgICAgICAgICAgICAgIGlmIChjb2x1bW5zT2xkLmNvbHVtbnMubGVuZ3RoICE9IGNvbHVtbnMuY29sdW1ucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwib3B0aW9uXCIsIFwiY29sdW1uc1wiLCBjb2x1bW5zKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VyUHJvZmlsID0gZ3JpZC5nZ3JpZChcImdldEN1cnJlbnRQcm9maWxlXCIpOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlclByb2ZpbC5jb2x1bW5MaXN0ID0gY29sdW1ucy5jb2x1bW5zLm1hcCgoYykgPT4gYy5uYW1lKS5qb2luKFwiLFwiKSBcclxuICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkPEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdFa29TZXpuYW1EcGhGaWx0ZXJEdG8+KFwidXNlUHJvZmlsZVwiLCB7IG5hbWU6IHVzZXJQcm9maWwubmFtZSEvKiArIG5hbWVQcm9maWxlUG9zdEZpeCovLCBjb2x1bW5MaXN0OiB1c2VyUHJvZmlsLmNvbHVtbkxpc3QgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBkb3BsbmVuaSB2eWhsZWRhdmFjaWNoIHBvbGlcclxuICAgICAgICAgICAgICAgIGxldCBzZWFyY2hJdGVtc09sZCA9IGdyaWQuZ2dyaWQoXCJvcHRpb25cIiwgXCJzZWFyY2hDb2x1bW5zXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWFyY2hJdGVtc09sZCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWFyY2hJdGVtc09sZCAhPSBcIipcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWFyY2hJdGVtc09sZC5sZW5ndGggIT0gc2VhcmNoSXRlbXMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncmlkLmdncmlkKFwib3B0aW9uXCIsIFwic2VhcmNoQ29sdW1uc1wiLCBzZWFyY2hJdGVtcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhhdC5zaG93UG9waXNTdHJ1a3RQb2xvemt5T2xkID0gdGhhdC5zaG93UG9waXNTdHJ1a3RQb2xvemt5O1xyXG4gICAgICAgICAgICB0aGF0LnNob3dFc3VPbGQgPSB0aGF0LnNob3dFc3U7XHJcbiAgICAgICAgICAgIHRoYXQuc2hvd1BvcGlzU3RydWt0T2xkID0gdGhhdC5zaG93UG9waXNTdHJ1a3Q7XHJcbiAgICAgICAgICAgIHRoYXQuYWRkU3RyUG9waXNDb2x1bW5zID0gY29sdW1uc1BvcGlzU3RydWt0TmV3O1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJlZ2VuZXJvdmFuaSBncmlmb3JtYXR1XHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlQ3JlYXRlR3JpZEZvcm1hdCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmVmb3JlTG9hZGluZygpO1xyXG4gICAgICAgICAgICAvL2xldCBncmlkID0gdGhpcy5nZXRHcmlkKCk7XHJcbiAgICAgICAgICAgIC8vaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAvL3RoaXMuYWRkU3RyUG9waXNDb2x1bW5zID0gKHRoaXMucGFyZW50Q250LnVzZXJTZXR0aW5ncz8uZ2V0KFwicm96c2lyZW55UG9waXNTaG93R3JpZENvbHVtbnNcIikpO1xyXG5cclxuICAgICAgICAgICAgLy9sZXQgc2hvd1BvcGlzU3RydWt0UG9sb3preU5ldyA9IHRoaXMucGFyZW50Q250LnVzZXJTZXR0aW5ncz8uZ2V0KFwicm96c2lyZW55UG9waXNBdXRvQWRkR3JpZENvbHVtbnNcIikgYXMgYm9vbGVhbiA/PyBmYWxzZTtcclxuICAgICAgICAgICAgLy9sZXQgc2hvd1BvcGlzU3RydWt0TmV3ID0gdGhpcy5wYXJlbnRDbnQudXNlclNldHRpbmdzPy5nZXQoXCJzdHJ1a3R1cm92YW55UG9waXNEb2tsYWR1QXV0b0FkZEdyaWRDb2x1bW5zXCIpIGFzIGJvb2xlYW4gPz8gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vbGV0IHNob3dFc3VOZXcgPSAodGhpcy5wYXJlbnRDbnQudXNlclNldHRpbmdzPy5nZXQoXCJlc3VBZGRHcmlkQ29sdW1uc1wiKSBhcyBib29sZWFuID8/IGZhbHNlKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93RXN1ID0gc2hvd0VzdU5ldyA/IHNob3dFc3VOZXc6IHRoaXMucGFyZW50Q250LmFjdGlvbnMuem9icmF6aXRFU1VBY3Q/LmNoZWNrZWQoKSBhcyBib29sZWFuO1xyXG4gICAgICAgICAgICAvL3RoaXMuc2hvd1BvcGlzU3RydWt0UG9sb3preSA9IHNob3dQb3Bpc1N0cnVrdFBvbG96a3lOZXcgPyBzaG93UG9waXNTdHJ1a3RQb2xvemt5TmV3OiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnpvYnJheml0U3R1a3RQb3Bpc1BvbEFjdD8uY2hlY2tlZCgpIGFzIGJvb2xlYW47XHJcbiAgICAgICAgICAgIC8vdGhpcy5zaG93UG9waXNTdHJ1a3QgPSBzaG93UG9waXNTdHJ1a3ROZXcgPyBzaG93UG9waXNTdHJ1a3ROZXc6IHRoaXMucGFyZW50Q250LmFjdGlvbnMuem9icmF6aXRTdHVrdFBvcGlzQWN0Py5jaGVja2VkKCkgYXMgYm9vbGVhbjtcclxuXHJcbiAgICAgICAgICAgIC8vbGV0IGNvbHVtbnMgPSB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKTtcclxuICAgICAgICAgICAgLy90aGlzLmFkZENvbW1vbkNvbHMoY29sdW1ucyk7XHJcbiAgICAgICAgICAgIC8vbGV0IHNlYXJjaEl0ZW1zID0gY29sdW1ucy5jb2x1bW5zLmZpbHRlcihjID0+IGMuY29sdW1uVHlwZSAhPT0gXCJkYXRldGltZVwiICYmIGMuY29sdW1uVHlwZSAhPT0gXCJjdXJyZW5jeVwiKS5tYXAoZSA9PiBcIipcIiArIGUubmFtZSk7XHJcbiAgICAgICAgICAgIC8vbGV0IGNvbHVtbnNPbGQgPSBncmlkLmdncmlkKFwib3B0aW9uXCIsIFwiY29sdW1uc1wiKSBhcyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PGFueT47XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLy8vaWYgKGNvbHVtbnNPbGQuY29sdW1ucy5sZW5ndGggIT0gY29sdW1ucy5jb2x1bW5zLmxlbmd0aClcclxuICAgICAgICAgICAgLy8gICAgZ3JpZC5nZ3JpZChcIm9wdGlvblwiLCBcImNvbHVtbnNcIiwgY29sdW1ucyk7XHJcbiAgICAgICAgICAgIC8vLy8gZG9wbG5lbmkgdnlobGVkYXZhY2ljaCBwb2xpXHJcbiAgICAgICAgICAgIC8vbGV0IHNlYXJjaEl0ZW1zT2xkID0gZ3JpZC5nZ3JpZChcIm9wdGlvblwiLCBcInNlYXJjaENvbHVtbnNcIik7XHJcbiAgICAgICAgICAgIC8vLy9pZiAodHlwZW9mIHNlYXJjaEl0ZW1zT2xkICE9PSBcInVuZGVmaW5lZFwiICYmIHNlYXJjaEl0ZW1zT2xkICE9IFwiKlwiKSB7XHJcbiAgICAgICAgICAgIC8vLy8gICAgaWYgKHNlYXJjaEl0ZW1zT2xkLmxlbmd0aCAhPSBzZWFyY2hJdGVtcy5sZW5ndGgpXHJcbiAgICAgICAgICAgIC8vICAgICAgICBncmlkLmdncmlkKFwib3B0aW9uXCIsIFwic2VhcmNoQ29sdW1uc1wiLCBzZWFyY2hJdGVtcyk7XHJcbiAgICAgICAgICAgIC8vLy99XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5dHZvcmVuaSBha2NpXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUFjdGlvbnMoKTtcclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ6b2JyYXppdEVTVUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNjIxXCIsIC8vUkMgMzAyNTA2MjEgOiDDmmRhamUgRVNVXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTA2MjJcIiwgLy9SQyAzMDI1MDYyMiA6IFYgc2V6bmFtdSBqc291IHDFmWlkw6FueS9vZHN0cmFuxJtueSBzbG91cGNlIHBybyDDumRhamUgbyBleHRlcm7DrW0gc3ViamVrdHVcclxuICAgICAgICAgICAgICAgIGljb246IFwiZ2ktdW5jaGVja1wiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hlY2tlZCA9IHRoaXMucGFyZW50Q250LmFjdGlvbnMuem9icmF6aXRFU1VBY3Q/LmNoZWNrZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkID0gISh0eXBlb2YgY2hlY2tlZCA9PSBcInVuZGVmaW5lZFwiID8gZmFsc2UgOiBjaGVja2VkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dFc3VPbGQgPSAoIWNoZWNrZWQpIGFzIGJvb2xlYW47XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuYWN0aW9ucy56b2JyYXppdEVTVUFjdD8uY2hlY2tlZChjaGVja2VkKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQubWFudWFsbHlTdGFydGVkRXN1ID0gY2hlY2tlZDtcclxuICAgICAgICAgICAgICAgICAgICAvL2xldCBjYXB0aW9uID0gKGNoZWNrZWQpID8gXCJqcmVzOjMwMjUwNjMyXCIgLy9SQyAzMDI1MDYzMiA6IE5hxI3DrXN0IGJleiBFU1VcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICA6IFwianJlczozMDI1MDYyMVwiOyAvL1JDIDMwMjUwNjIxIDogw5pkYWplIEVTVVxyXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IHRvb2x0aXAgPSAoY2hlY2tlZCkgPyBcImpyZXM6MzAyNTA2MzFcIiAvL1JDIDMwMjUwNjMxIDogTmHEjcOtc3QgaWJleiBpbmZvcm1hY8OtIG8gIGVrb25vbWlja8OpbSBzdWJqZWt0dVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIDogXCJqcmVzOjMwMjUwNjIyXCI7IC8vUkMgMzAyNTA2MjIgOiBWIHNlem5hbXUganNvdSBwxZlpZMOhbnkvb2RzdHJhbsSbbnkgc2xvdXBjZSBwcm8gw7pkYWplIG8gZXh0ZXJuw61tIHN1Ympla3R1XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LnBhcmVudENudC5hY3Rpb25zLnpvYnJheml0RVNVQWN0Py51cGRhdGUoeyBjYXB0aW9uOiBjYXB0aW9uLyosIHRvb2x0aXA6IHRvb2x0aXAqLyB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5hY3Rpb25zLnpvYnJheml0RVNVQWN0Py51cGRhdGUoeyBpY29uOiAoY2hlY2tlZCA/IFwiZ2ktY2hlY2tcIiA6IFwiZ2ktdW5jaGVja1wiKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dFc3UgPSBjaGVja2VkOyBcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnJlQ3JlYXRlR3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5yZWxvYWQoKTsgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiem9icmF6aXRTdHVrdFBvcGlzUG9sQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA2MjNcIiwgLy9SQyAzMDI1MDYyMyA6IFNsb3ZhIFNQRFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcDogXCJqcmVzOjMwMjUwNjI0XCIsIC8vUkMgMzAyNTA2MjQgOiBWIHNlem5hbXUganNvdSBwxZlpZMOhbnkvb2RzdHJhbsSbbnkgc2xvdXBjZSBwcm8gdnlicmFuw6kgw7pkYWplIHN0cnVrdHVyb3ZhbsOpaG8gcG9waXN1IHBvZGxlIHXFvml2YXRlbHNrw6lobyBuYXN0YXZlbsOtXHJcbiAgICAgICAgICAgICAgICBpY29uOiBcImdpLXVuY2hlY2tcIixcclxuICAgICAgICAgICAgICAgIGNoZWNrZWQ6ZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTdHJQb3Bpc0NvbHVtbnMgPSAodGhhdC5wYXJlbnRDbnQudXNlclNldHRpbmdzPy5nZXQoXCJyb3pzaXJlbnlQb3Bpc1Nob3dHcmlkQ29sdW1uc1wiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGF0LmFkZFN0clBvcGlzQ29sdW1ucyB8fCB0aGF0LmFkZFN0clBvcGlzQ29sdW1ucy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5kaWFsb2dzLndhcm5pbmcoXCJqcmVzOjMwMjUwNjM0XCIsIC8vUkMgMzAyNTA2MzQgOiBVcG96b3JuxJtuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwianJlczozMDI1MDYzM1wiKTsgLy9SQyAzMDI1MDYzMyA6IE5lanNvdSB2eWJyw6FuYSBzbG92YSBzdHJ1a3R1cm92YW7DqWhvIHBvcGlzdSB2IHXFvml2YXRlbHNrw6ltIG5hc3RhdmVuw60uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVDcmVhdGVHcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX25hc3RhdmVuaUFrY2koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hlY2tlZCA9IHRoYXQucGFyZW50Q250LmFjdGlvbnMuem9icmF6aXRTdHVrdFBvcGlzUG9sQWN0Py5jaGVja2VkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93UG9waXNTdHJ1a3RQb2xvemt5T2xkID0gKHR5cGVvZiBjaGVja2VkID09IFwidW5kZWZpbmVkXCIgPyBmYWxzZSA6Y2hlY2tlZCkgYXMgYm9vbGVhbjtcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkID0gISh0eXBlb2YgY2hlY2tlZCA9PSBcInVuZGVmaW5lZFwiID8gZmFsc2UgOiBjaGVja2VkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5hY3Rpb25zLnpvYnJheml0U3R1a3RQb3Bpc1BvbEFjdD8uY2hlY2tlZChjaGVja2VkKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQubWFudWFsbHlTdGFydGVkU3RydWt0UG9waXNQb2xvemt5ID0gY2hlY2tlZDtcclxuICAgICAgICAgICAgICAgICAgICAvL2xldCBjYXB0aW9uID0gKGNoZWNrZWQpID8gXCJqcmVzOjMwMjUwNjI3XCIgLy9SQyAzMDI1MDYyNyA6IE5hxI3DrXN0IGJleiBQU1BEXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgOiBcImpyZXM6MzAyNTA2MjNcIjsgLy9SQyAzMDI1MDYyMyA6IFNsb3ZhIFNQRFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IHRvb2x0aXAgPSAoY2hlY2tlZCkgPyBcImpyZXM6MzAyNTA2MjhcIiAvL1JDIDMwMjUwNjI4IDogdiBzZXpuYW11IGplIG9kc3RyYW7Em24gc2xvdXBlYyBTdHJ1a3R1cm92YW7DvSBwb3BpcyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgOiBcImpyZXM6MzAyNTA2MjRcIjsgLy9SQyAzMDI1MDYyNCA6IFYgc2V6bmFtdSBqc291IHDFmWlkw6FueS9vZHN0cmFuxJtueSBzbG91cGNlIHBybyB2eWJyYW7DqSDDumRhamUgc3RydWt0dXJvdmFuw6lobyBwb3Bpc3UgcG9kbGUgdcW+aXZhdGVsc2vDqWhvIG5hc3RhdmVuw61cclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQucGFyZW50Q250LmFjdGlvbnMuem9icmF6aXRTdHVrdFBvcGlzUG9sQWN0Py51cGRhdGUoeyBjYXB0aW9uOiBjYXB0aW9uLCB0b29sdGlwOiB0b29sdGlwIH0pOyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQuYWN0aW9ucy56b2JyYXppdFN0dWt0UG9waXNQb2xBY3Q/LnVwZGF0ZSh7IGljb246IChjaGVja2VkID8gXCJnaS1jaGVja1wiIDogXCJnaS11bmNoZWNrXCIpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd1BvcGlzU3RydWt0UG9sb3preSA9IGNoZWNrZWQ7ICBcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnJlQ3JlYXRlR3JpZEZvcm1hdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5tYW51YWxseVN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiem9icmF6aXRTdHVrdFBvcGlzQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzAyNTA2MjZcIiwgLy9SQyAzMDI1MDYyNiA6IFNsb3VwZWMgU1BEXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwOiBcImpyZXM6MzAyNTA2MjVcIiwgLy9SQyAzMDI1MDYyNSA6IFYgc2V6bmFtdSBqZSBwxZlpZMOhbi9vZHN0cmFuxJtuIHNsb3VwZWMgU3RydWt0dXJvdmFuw70gcG9waXMgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS11bmNoZWNrXCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2hlY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGVja2VkID0gdGhhdC5wYXJlbnRDbnQuYWN0aW9ucy56b2JyYXppdFN0dWt0UG9waXNBY3Q/LmNoZWNrZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkID0gISh0eXBlb2YgY2hlY2tlZCA9PSBcInVuZGVmaW5lZFwiID8gZmFsc2UgOiBjaGVja2VkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dQb3Bpc1N0cnVrdE9sZCA9ICghY2hlY2tlZCkgYXMgYm9vbGVhbjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnBhcmVudENudC5hY3Rpb25zLnpvYnJheml0U3R1a3RQb3Bpc0FjdD8uY2hlY2tlZChjaGVja2VkKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQubWFudWFsbHlTdGFydGVkU3RydWt0UG9waXMgPSBjaGVja2VkOyAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IGNhcHRpb24gPSAoY2hlY2tlZCkgPyBcImpyZXM6MzAyNTA2MjlcIiAvL1JDIDMwMjUwNjI5IDogTmHEjcOtc3QgYmV6IFNQRFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIDogXCJqcmVzOjMwMjUwNjI2XCI7IC8vUkMgMzAyNTA2MjYgOiBTbG91cGVjIFNQRFxyXG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IHRvb2x0aXAgPSAoY2hlY2tlZCkgPyBcImpyZXM6MzAyNTA2MjhcIiAvL1JDIDMwMjUwNjI4IDogdiBzZXpuYW11IGplIG9kc3RyYW7Em24gc2xvdXBlYyBTdHJ1a3R1cm92YW7DvSBwb3BpcyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgOiBcImpyZXM6MzAyNTA2MjVcIjsgLy9SQyAzMDI1MDYyNSA6IFYgc2V6bmFtdSBqZSBwxZlpZMOhbi9vZHN0cmFuxJtuIHNsb3VwZWMgU3RydWt0dXJvdmFuw70gcG9waXMgZG9rbGFkdVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQucGFyZW50Q250LmFjdGlvbnMuem9icmF6aXRTdHVrdFBvcGlzQWN0Py51cGRhdGUoeyBjYXB0aW9uOiBjYXB0aW9uLCB0b29sdGlwOiB0b29sdGlwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LmFjdGlvbnMuem9icmF6aXRTdHVrdFBvcGlzQWN0Py51cGRhdGUoeyBpY29uOiAoY2hlY2tlZCA/IFwiZ2ktY2hlY2tcIiA6IFwiZ2ktdW5jaGVja1wiKSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dQb3Bpc1N0cnVrdCA9IGNoZWNrZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5yZUNyZWF0ZUdyaWRGb3JtYXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRva2xhWmF1Y3RBY3RcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMDI1MDYxM1wiLCAvL1JDIDMwMjUwNjEzIDogRG9rbC4gbyB6YcO6xI0uXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMwMjUwNjEyXCIsIC8vUkMgMzAyNTA2MTIgOiBEb2tsYWQgbyB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBydW46ICgpID0+IHsgdGhhdC5wYXJlbnRDbnQuYWN0aW9ucyFbXCJkb2tsYVphdWN0QWN0XCJdIS5zZXRQZW5kaW5nKHRoYXQuc2hvd0Rva2xhZFphdWMoKSk7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiZGV0YWlsQWN0XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyNjZcIiwgLy9SQyAzMTEwMDI2NiA6IFpvYnJheml0IGRldGFpbFxyXG4gICAgICAgICAgICAgICAgaWNvbjogXCJnaS1kZXRhaWxcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLnNob3dEZXRhaWwoKTsgfVxyXG4gICAgICAgICAgICB9KTsgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgLy90aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiemFwaXN5QWN0XCIsXHJcbiAgICAgICAgICAgIC8vICAgIGljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAvLyAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTI0XCIsIC8vUkMgMzExMDAxMjQgOiBaw6FwaXN5XHJcbiAgICAgICAgICAgIC8vICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93WmFwaXN5KCk7IH1cclxuICAgICAgICAgICAgLy99KTtcclxuICAgICAgICAgICAgLy90aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwiemFwaXN5QWxsQWN0XCIsXHJcbiAgICAgICAgICAgIC8vICAgIGljb246IFwiZ2ktbGlzdFwiLFxyXG4gICAgICAgICAgICAvLyAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMjczXCIsIC8vUkMgMzAyNTAyNzMgOiBaw6FwaXN5IHbFoWVcclxuICAgICAgICAgICAgLy8gICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLnNob3daYXBpc3lBbGwoKTsgfVxyXG4gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImRva2xhZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyMzNcIiwgLy9SQyAzMTEwMDIzMyA6IERva2xhZHkvesOhcGlzeVxyXG4gICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4geyB0aGlzLnRvZ2dsZUdyb3VwaW5nKCk7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpbWRva2xhZEFjdFwiLCAvL1VDZG9rbGFkQWN0XHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtZXh0ZXJuYWwtbGlua1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwNjcxXCIsIC8vUkMgMzAyNTA2NzEgOiDDmsSNdC4gZG9rbGFkXHJcbiAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7IHRoaXMuc2hvd1ByaW1Eb2tsYWQoKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5hZGQoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJwcmltZG9rbGFkRXh0QWN0XCIsXHJcbiAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGljb246IFwiZmEtZXh0ZXJuYWwtbGlua1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMwMjUwMTU0XCIsIC8vUkMgMzAyNTAxNTQgOiBQcmltLiBkb2tsYWRcclxuICAgICAgICAgICAgICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5zaG93UHJpbURva2xhZCh1bmRlZmluZWQsXCJQUklcIik7IH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvKnRoaXMuc2VsRmlsdGVyQWN0ID0gKi9cclxuICAgICAgICAgICAgLy90aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwic2VsRmlsdGVyQWN0XCIsXHJcbiAgICAgICAgICAgIC8vICAgIHJ1bjogKGV2LCBjdHgpID0+IHsgdGhpcy5kaXNwYXRjaEZpbGxTZXJ2ZXJHcmlkRXZlbnQoZXYpOyB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICAvKnRoaXMuc2VsRmlsdGVyQW5kU2VhcmNoQWN0ID0gKi9cclxuICAgICAgICAgICAgLy90aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgIC8vICAgIG5hbWU6IFwic2VsRmlsdGVyQW5kU2VhcmNoQWN0XCIsXHJcbiAgICAgICAgICAgIC8vICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuZGlzcGF0Y2hGaWxsU2VydmVyR3JpZEV2ZW50KGV2KTtcclxuICAgICAgICAgICAgLy8gICAgICAgIHRoaXMuZG9GaWx0ZXJDbGljaygpO1xyXG4gICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImZpbHRlclBpZEFjdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9IHRoYXQuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2VsID0gZ3JpZC5nZ3JpZDxVY3QuSW50ZXJmYWNlLkdTZXpuYW1aYXBpc3VTdGF2dUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWwubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkc2VydmVyZmlsdGVyKFwiY2xlYXJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZ3JpZHNlcnZlcmZpbHRlcihcImFwcGx5XCIsIHsgaXhwOiBzZWxbMF0uaXhwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvRmlsdGVyQ2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBhcmVudENudC5hY3Rpb25zLmFkZCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInNoRG9rbGFkeUFjdFwiLFxyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICAgICAgLy9OT1RFOiBKYWsgdG8gZGVsYWppIHYgdGx1c3R5bTogR1Nlem5hbVVjdFphem5hbXVTdGF2eVphcGlzeVRhYi5tX0FjdGlvbkRva2xhZHlfU3RhcnQoKTogXHJcbiAgICAgICAgICAgICAgICAvL1Byb3ZlZG91IHNlc2t1cGVuaSwga3RlcmUgcHJpZGFqaSBqYWtvIG5vdmUgcmFka3kgYSBwYWsgemFmaWx0cnVqaSBwb3V6ZSBuYSBzb3VjdG92ZSByYWRreVxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7IHRoaXMudG9nZ2xlR3JvdXBpbmcodGhpcy5wcm9maWxlcy5kb2tsYWR5IS5uYW1lKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Q250LmFjdGlvbnMuYWRkKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic2haYXBpc3lBY3RcIixcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7IHRoaXMudG9nZ2xlR3JvdXBpbmcodGhpcy5wcm9maWxlcy5kZWZhdWx0Lm5hbWUpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHVibGljIGNyZWF0ZUZpbHRlclBhbmVsKCk6IHZvaWQgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVGaWx0ZXJQYW5lbCh0aGlzKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbmkgemFwaXN1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHNob3daYXBpc3koKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCB0aXRsZSA9IFwianJlczozMTEwMDIyNFwiOyAvL1JDIDMxMTAwMjI0IDogWsOhcGlzeSBzdGF2dVxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RmlsdGVyKClcclxuICAgICAgICAgICAgICAgIC50aGVuKChmKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGF0LmdldEdyaWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4gO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZWwgPSBncmlkLmdncmlkPFVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPihcImdldFNlbGVjdGlvblwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggIT09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IHNlbFswXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdHlwVWxvaHk6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkOiBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcjogR0Vrb0ZpbHRlckR0bztcclxuICAgICAgICAgICAgICAgICAgICAvL05PVEU6IE9kcG92aWRhIHogVEsgVUNSOiBHU2V6bmFtWmFwaXN1VlJhZGt1VGFiLkxvYWRHcmlkRGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGUgPSBcImpyZXM6MzAyNTAyNzRcIiAvL1JDIDMwMjUwMjc0IDogWsOhcGlzeSBzYWxkb2tvbnRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWRkID0gXCJcIjsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGF0Lmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMSEudHJpbSgpICE9IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGQgPSB0aGF0Lmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMSEudHJpbSgpICsgXCI6IFwiICsgcm93IVtcInZhbHVlMFwiXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZ2xvYmFscy5TYWxkb2tvbnRvUGFyYW0yIS50cmltKCkgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFkZCAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZCArPSBcIiwgXCIgKyB0aGF0Lmdsb2JhbHMuU2FsZG9rb250b1BhcmFtMiEudHJpbSgpICsgXCI6IFwiICsgcm93IVtcInZhbHVlMVwiXSEudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZCA9IHRoYXQuZ2xvYmFscy5TYWxkb2tvbnRvUGFyYW0xIS50cmltKCkgKyBcIjogXCIgKyByb3chW1widmFsdWUwXCJdPy50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFkZCAhPSBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkID0gXCIgKFwiICsgYWRkICsgXCIpXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlICs9IGFkZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlciA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljbzogeyBzdGFydDogcm93LmljbyEsIGVuZDogcm93LmljbyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVjczogeyBzdGFydDogcm93LnVjcyEsIGVuZDogcm93LnVjcyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV1czogeyBzdGFydDogcm93LnV1cyEsIGVuZDogcm93LnV1cyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5rczogeyBzdGFydDogcm93Lm5rcyEsIGVuZDogcm93Lm5rcyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc2ljOiB7IHN0YXJ0OiAwLCBlbmQ6IHJvdy5tZXNpYyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJkX21zazogcm93LmRyZCEudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNmdToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlYTogeyBzdGFydDogcm93LnVlYSEsIGVuZDogcm93LnVlYSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWI6IHsgc3RhcnQ6IHJvdy51ZWIhLCBlbmQ6IHJvdy51ZWIhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVjOiB7IHN0YXJ0OiByb3cudWVjISwgZW5kOiByb3cudWVjISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZDogeyBzdGFydDogcm93LnVlZCEsIGVuZDogcm93LnVlZCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWU6IHsgc3RhcnQ6IHJvdy51ZWUhLCBlbmQ6IHJvdy51ZWUhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVmOiB7IHN0YXJ0OiByb3cudWVmISwgZW5kOiByb3cudWVmISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlZzogeyBzdGFydDogcm93LnVlZyEsIGVuZDogcm93LnVlZyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWg6IHsgc3RhcnQ6IHJvdy51ZWghLCBlbmQ6IHJvdy51ZWghIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVpOiB7IHN0YXJ0OiByb3cudWVpISwgZW5kOiByb3cudWVpISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlajogeyBzdGFydDogcm93LnVlaiEsIGVuZDogcm93LnVlaiEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZWs6IHsgc3RhcnQ6IHJvdy51ZWshLCBlbmQ6IHJvdy51ZWshIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWVsOiB7IHN0YXJ0OiByb3cudWVsISwgZW5kOiByb3cudWVsISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVlbTogeyBzdGFydDogcm93LnVlbSEsIGVuZDogcm93LnVlbSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1ZW46IHsgc3RhcnQ6IHJvdy51ZW4hLCBlbmQ6IHJvdy51ZW4hIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGUwOiB7IHN0YXJ0OiByb3cudGUwISwgZW5kOiByb3cudGUwISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlMTogeyBzdGFydDogcm93LnRlMSEsIGVuZDogcm93LnRlMSEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTI6IHsgc3RhcnQ6IHJvdy50ZTIhLCBlbmQ6IHJvdy50ZTIhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGUzOiB7IHN0YXJ0OiByb3cudGUzISwgZW5kOiByb3cudGUzISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlNDogeyBzdGFydDogcm93LnRlNCEsIGVuZDogcm93LnRlNCEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTU6IHsgc3RhcnQ6IHJvdy50ZTUhLCBlbmQ6IHJvdy50ZTUhIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU2OiB7IHN0YXJ0OiByb3cudGU2ISwgZW5kOiByb3cudGU2ISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlNzogeyBzdGFydDogcm93LnRlNyEsIGVuZDogcm93LnRlNyEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZTg6IHsgc3RhcnQ6IHJvdy50ZTghLCBlbmQ6IHJvdy50ZTghIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGU5OiB7IHN0YXJ0OiByb3cudGU5ISwgZW5kOiByb3cudGU5ISB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMucGFyZW50Q250LlR5cFVsb2h5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpU3RhdjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cFVsb2h5ID0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5VY2V0bmljdHZpWmFwaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZCA9IFwidWN0WmFwaXN5I1wiOyAvL05PVEU6IE11c2kgYnl0IHN0ZWpuZSBuaSBuYSBNYWluQXBwLmNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlJvenBvY2V0U3RhdjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cFVsb2h5ID0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5Sb3pwb2NldFphcGlzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBcInJvelphcGlzeSNcIjsgLy9OT1RFOiBNdXNpIGJ5dCBzdGVqbmUgbmkgbmEgTWFpbkFwcC5jc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5TYWxkb2tvbnRvOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwVWxvaHkgPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG9aYXBpcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gXCJzZXpuYW1TYWxkb2tvbnRvI1wiOyAvL05PVEU6IE11c2kgYnl0IHN0ZWpuZSBuaSBuYSBNYWluQXBwLmNzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBHRXJyb3IoXCJOb3RTdXBwb3J0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmVudENudC5uYXZpZ2F0ZSgnR29yZGljLlVjci5XZWJDbGllbnQuR1Nlem5hbUVrb1phem5hbXUnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVHlwVWxvaHk6IHR5cFVsb2h5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBGaWx0ZXI6IGZpbHRlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ3VycmVudFJvdzpyb3csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFN0cmljdEZpbHRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRmlsdGVyU3RyUG9waXM6IGYuZmlsdGVyU3RyUG9waXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF1dG9Mb2FkRGF0YTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IHRpdGxlXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuaSBkb2tsYWR1IG8gemF1Y3RvdmFuaVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByb3RlY3RlZCBzaG93RG9rbGFkWmF1YygpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLmRlYnVnKFwiU3RhcnQgc2hvd0Rva2xhZFphdWMgR1Nlem5hbUVrb1phem5hbXVCYXNlXCIpO1xyXG4gICAgICAgICAgICBsZXQgZ3JpZCA9IHRoaXMuZ2V0R3JpZCgpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZCA9PSBudWxsKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgdmFyIHNlbCA9IGdyaWQuZ2dyaWQ8R29yZGljLlVjdC5JbnRlcmZhY2UuR1Nlem5hbVphcGlzdVN0YXZ1RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggPT09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHNlbFswXTtcclxuICAgICAgICAgICAgaWYgKHJvdy5peGJfZHp1ICYmIHJvdy5peGJfZHp1LnRyaW0oKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGR0bzogSUdEb2N1bWVudERvd25sb2FkUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIERvd25sb2FkZXJUeXBlOiBcIkdvcmRpYy5VY3IuV2ViQ2xpZW50LkdGaWxlRG93bmxvYWRlclwiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIEN1c3RvbURhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkb2tsYWRaYXVjdFwiOiBcIkFOT1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJva1wiOiByb3cucm9rPT1udWxsP1wiMFwiOnJvdy5yb2s/LnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibWVzaWNcIjogcm93Lm1lc2ljID09IG51bGwgP1wiMFwiOnJvdy5tZXNpYy50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVjc1wiOiByb3cudWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjXCI6IHJvdy5hYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyYWRla196XCI6IHJvdy5yYWRla196ID09IG51bGwgPyBcIjBcIiA6IHJvdy5yYWRla196LnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgbGV0IGRvYyA9IG5ldyBHRG9jdW1lbnQodGhpcy5wYXJlbnRDbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDbnQubG9nLmRlYnVnKFwiS29uZWMgc2hvd0Rva2xhZFphdWMgR1Nlem5hbUVrb1phem5hbXVCYXNlXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvYy5kb3dubG9hZChkdG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Q250LmRpYWxvZ3MuZXJyb3IoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJqcmVzOjMwMjUwNjE0XCIsIC8vUkMgMzAyNTA2MTQgOiBEb2tsYWQgbyB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIFwianJlczozMDI1MDYxNVwiIC8vUkMgMzAyNTA2MTUgOiBEb2tsYWQgbyB6YcO6xI10b3bDoW7DrSBuZWJ5bCBuYWxlemVuXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoKCkgPT4gZmFsc2UpOyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBnZXRaYXBpc0ZpbHRlcigpOiBHRWtvRmlsdGVyRHRvIHtcclxuICAgICAgICAgICAgbGV0IGdyaWQgPSB0aGlzLmdldEdyaWQoKTtcclxuICAgICAgICAgICAgaWYgKGdyaWQgPT0gbnVsbCkgcmV0dXJuIHt9O1xyXG4gICAgICAgICAgICB2YXIgc2VsID0gZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiLCBmYWxzZSlbMF0gYXMgVWN0LkludGVyZmFjZS5HU2V6bmFtWmFwaXN1U3RhdnVEdG87XHJcbiAgICAgICAgICAgIC8vaWYgKHRoaXMucGFyZW50Q250LlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG8pXHJcbiAgICAgICAgICAgIC8vICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB1Y3M6IHsgc3RhcnQ6IHNlbC51Y3MsIGVuZDogc2VsLnVjcyB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgbWVzaWM6IHsgc3RhcnQ6IHNlbC5tZXNpYywgZW5kOiBzZWwubWVzaWMgfSxcclxuICAgICAgICAgICAgLy8gICAgICAgIGFjOiB7IHN0YXJ0OiBzZWwuYWMsIGVuZDogc2VsLmFjIH1cclxuICAgICAgICAgICAgLy8gICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICB1Y3M6IHsgc3RhcnQ6IHNlbC51Y3MsIGVuZDogc2VsLnVjcyB9LFxyXG4gICAgICAgICAgICAgICAgZHJkX21zazogc2VsIS5kcmQhLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBtZXNpYzogeyBzdGFydDogc2VsLm1lc2ljLCBlbmQ6IHNlbC5tZXNpYyB9LFxyXG4gICAgICAgICAgICAgICAgYWM6IHsgc3RhcnQ6IHNlbC5hYywgZW5kOiBzZWwuYWMgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWZpbmljZSBtZW51IGJhcnVcclxuICAgICAgICAgKiBAcGFyYW0gdHlwVWxvaHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcm90ZWN0ZWQgRGVmaW5lTWVudUJhcih0eXBVbG9oeTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZSk6IE1lbnVQYXJhbXNbXSB7XHJcbiAgICAgICAgICAgIGxldCBtZW51ID0gc3VwZXIuRGVmaW5lTWVudUJhcih0eXBVbG9oeSk7XHJcbiAgICAgICAgICAgIG1lbnUucHVzaCh7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy5kb2tsYVphdWN0QWN0LCBmYXZvcml0ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgbWVudS51bnNoaWZ0KHsgYWN0aW9uOiB0aGlzLnBhcmVudENudC5hY3Rpb25zLnpvYnJheml0U3R1a3RQb3Bpc1BvbEFjdCwgZmF2b3JpdGU6IHRydWUsIGFsaWduOiBcIm9wcG9zaXRlXCIgfSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1lbnUudW5zaGlmdCh7IGFjdGlvbjogdGhpcy5wYXJlbnRDbnQuYWN0aW9ucy56b2JyYXppdFN0dWt0UG9waXNBY3QsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0pO1xyXG4gICAgICAgICAgICBtZW51LnVuc2hpZnQoeyBhY3Rpb246IHRoaXMucGFyZW50Q250LmFjdGlvbnMuem9icmF6aXRFU1VBY3QsIGZhdm9yaXRlOiB0cnVlLCBhbGlnbjogXCJvcHBvc2l0ZVwiIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBtZW51O1xyXG4gICAgICAgIH0gICBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXphdmlyYW5pIG9rbmFcclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBjbG9zaW5nKCk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgaWYgKHRoYXQucGFyZW50Q250LlR5cFVsb2h5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLlNhbGRva29udG8pIHtcclxuICAgICAgICAgICAgICAgIGxldCB1c2VOUyA9IGZhbHNlOyBsZXQgdXNlT1JHID0gZmFsc2U7IGxldCB1c2VPUkogPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXIgPSB0aGlzLiRmaWx0ZXJQYW5lbC5nZmlsdGVycGFuZWwoXCJnZXRDdXJyZW50RGF0YVwiKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgKGZpbHRlciBhcyBhbnkpLnZvbGJ5IS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoZmlsdGVyIGFzIGFueSkudm9sYnlbaV0gPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlTlMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoZmlsdGVyIGFzIGFueSkudm9sYnlbaV0gPT0gMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlT1JKID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGZpbHRlciBhcyBhbnkpLnZvbGJ5W2ldID09IDMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZU9SRyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQudXNlclNldHRpbmdzIS5zZXQoXCJ1c2VkTlNcIiwgdXNlTlMpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wYXJlbnRDbnQudXNlclNldHRpbmdzIS5zZXQoXCJ1c2VPUkdcIiwgdXNlT1JHKTtcclxuICAgICAgICAgICAgICAgIHRoYXQucGFyZW50Q250LnVzZXJTZXR0aW5ncyEuc2V0KFwidXNlZE9SSlwiLHVzZU9SSik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiBcclxufSJdfQ==