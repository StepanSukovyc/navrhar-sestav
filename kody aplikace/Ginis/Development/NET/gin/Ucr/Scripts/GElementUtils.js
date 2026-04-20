"use strict";
var Gordic;
(function (Gordic) {
    var Ucr;
    (function (Ucr) {
        var WebClient;
        (function (WebClient) {
            class GElementUtils {
                static createElementsGridFormat(options) {
                    var gf = new Gordic.Data.GridFormat();
                    //addTopFilters: ico, ucs, uus, uuu, nks
                    //typUlohy zjistim podle sestavy
                    //options.filterOptions.nks
                    //const reportInfo = this.reportInfo!;
                    //TK GUcrApplication.UpdateTopoFilters()
                    let icoEnabled = true;
                    let ucsEnabled = true;
                    let nksEnabled = true;
                    let uusEnabled = true;
                    let ucs = undefined;
                    switch (options.globals.RezimProvozu) {
                        case 40 /* Gordic.Uct.Interface.GUcrRezimProvozu.SOR */:
                            icoEnabled = true;
                            ucsEnabled = options.globals.TypSumarizace != 1 /* Gordic.Uct.Interface.GUcrTypSumarizace.Externi */;
                            uusEnabled = options.globals.TypSumarizace != 1 /* Gordic.Uct.Interface.GUcrTypSumarizace.Externi */;
                            nksEnabled = options.globals.TypSumarizace != 1 /* Gordic.Uct.Interface.GUcrTypSumarizace.Externi */;
                            break;
                        case 30 /* Gordic.Uct.Interface.GUcrRezimProvozu.ICO */:
                            icoEnabled = false;
                            ucsEnabled = true;
                            uusEnabled = true;
                            nksEnabled = true;
                            break;
                        case 20 /* Gordic.Uct.Interface.GUcrRezimProvozu.UCS */:
                            icoEnabled = false;
                            ucsEnabled = false;
                            ucs = options.ekoParams.Ucs;
                            uusEnabled = true;
                            nksEnabled = true;
                            break;
                        case 10 /* Gordic.Uct.Interface.GUcrRezimProvozu.NKS */:
                            icoEnabled = false;
                            ucsEnabled = false;
                            uusEnabled = false;
                            nksEnabled = false;
                            break;
                        default:
                            throw new GError("NotSupported");
                    }
                    gf.addTextColumn({
                        name: "ico",
                        caption: Gordic.Consts.DbShortcuts.ico,
                        description: Gordic.Ucr.Globals.GTxt.Ico,
                        width: 80,
                        //group: topoGroup
                        customClass: icoEnabled ? undefined : "ui-disabled",
                        cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("ico", d); },
                        editor: !icoEnabled ? undefined : Gordic.Eko.Filters.icoInterval({
                            model: "ico", onlyActive: false, caption: Gordic.Consts.DbShortcuts.ico,
                            firstField: { disabled: !icoEnabled },
                            secondField: { disabled: !icoEnabled }
                        }),
                    });
                    //ucs
                    gf.addTextColumn({
                        name: "ucs",
                        caption: Gordic.Consts.DbShortcuts.ucs,
                        description: Gordic.Ucr.Globals.GTxt.Ucs,
                        width: 80,
                        //group: topoGroup,                
                        customClass: ucsEnabled ? undefined : "ui-disabled",
                        cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("ucs", d); },
                        editor: !ucsEnabled ? undefined : Gordic.Eko.Filters.ucsInterval(options.filterOptions.ucs)
                    });
                    //filterParams.typUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis
                    //NOTE: Toto je v TK pro dalsi typy uloh
                    if (options.filterParams.typUlohy !== 9 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.ViceleteFinancovaniZapis */
                        && options.filterParams.typUlohy !== 4 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.FinancovaniZapis */)
                        gf.addTextColumn({
                            name: "uus",
                            caption: Gordic.Consts.DbShortcuts.uus,
                            description: Gordic.Ucr.Globals.GTxt.Uus,
                            width: 80,
                            //group: topoGroup,
                            customClass: uusEnabled ? undefined : "ui-disabled",
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("uus", d); },
                            editor: !uusEnabled ? undefined : Gordic.Eko.Filters.uusInterval(options.filterOptions.uus)
                        });
                    gf.addTextColumn({
                        name: "nks",
                        caption: Gordic.Consts.DbShortcuts.nks,
                        description: Gordic.Ucr.Globals.GTxt.Nks,
                        width: 80,
                        //group: topoGroup
                        customClass: nksEnabled ? undefined : "ui-disabled",
                        cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("nks", d); },
                        editor: !nksEnabled ? undefined : Gordic.Eko.Filters.nksInterval(options.filterOptions.nks)
                    });
                    if (options.typSestavy !== 100 /* Gordic.Uct.Interface.GUcrTypSestavy.Financovani */)
                        gf.addNumberColumn({
                            name: "drd",
                            caption: "jres:31100052", //RC 31100052 : H
                            description: "jres:31100102", //RC 31100102 : Druh dokladu (DRD)
                            width: 30,
                            tooltipTemplate: (d) => { return d.drd_msk || ""; },
                            cellTemplate: (d) => { return d.drd_msk || ""; },
                            editor: Gordic.Eko.Filters.drd(options.filterOptions.drd)
                        });
                    if (options.typSestavy === 10 /* Gordic.Uct.Interface.GUcrTypSestavy.Zapisova */) {
                        //den, mesic, rok
                        gf.addNumberColumn({
                            name: "den",
                            caption: "jres:31100053", //RC 31100053 : D
                            description: "jres:31100130", //RC 31100130 : Den
                            width: 40,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("den", d); },
                            editor: Gordic.Eko.Filters.integerInterval({
                                model: "den",
                                caption: "jres:31100053", //RC 31100053 : D
                                firstField: { minValue: 1, maxValue: 31 }, secondField: { minValue: 1, maxValue: 31 }
                            })
                        });
                        gf.addNumberColumn({
                            name: "mesic",
                            caption: "jres:31100051", //RC 31100051 : M
                            description: "jres:31100011", //RC 31100011 : Měsíc
                            width: 40,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("mesic", d); },
                            editor: Gordic.Eko.Filters.integerInterval({
                                model: "mesic",
                                caption: "jres:31100051", //RC 31100051 : M
                                firstField: { minValue: 1, maxValue: 13 }, secondField: { minValue: 1, maxValue: 13 }
                            })
                        });
                        gf.addNumberColumn({
                            name: "rok",
                            caption: "jres:31100010", //RC 31100010 : Rok
                            width: 55,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("rok", d); },
                            editor: Gordic.Eko.Filters.integerInterval({
                                model: "rok",
                                caption: "jres:31100010", //RC 31100010 : Rok
                                firstField: { minValue: 0, maxValue: 9999 }, secondField: { minValue: 0, maxValue: 9999 }
                            })
                        });
                        //doklad
                        gf.addTextColumn({
                            name: "ac",
                            caption: "jres:31100054", //RC 31100054 : Doklad
                            width: 170,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("ac", d); },
                            editor: Gordic.Eko.Filters.acInterval(options.filterOptions.ac)
                        });
                    }
                    if (options.typSestavy === 100 /* Gordic.Uct.Interface.GUcrTypSestavy.Financovani */) {
                        gf.addNumberColumn({
                            name: "rok",
                            caption: "jres:31100010", //RC 31100010 : Rok
                            width: 55,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("rok", d); },
                            editor: Gordic.Eko.Filters.integerInterval({
                                model: "rok",
                                caption: "jres:31100010", //RC 31100010 : Rok
                                firstField: { minValue: 0, maxValue: 9999 }, secondField: { minValue: 0, maxValue: 9999 }
                            })
                        });
                    }
                    if (options.cfuSet) {
                        options.cfuSet.columns.forEach((c) => {
                            c.editor = c.serverFilter;
                            //NOTE (BM 2025-07-22): Toto uz by nemelo byt nikde nutne (je to poreseno v Eko.WebClient, viz souvisejici soubory v tomto commitu).
                            //c.cellTemplate = (d) => {
                            //    if (!d || !d.cfu) return "";
                            //    return Gordic.Eko.Filters.Utils.formatIntervalValue(d.cfu[c.name!], "*");
                            //};
                        });
                        gf.addSortedEkoCfuSet(options.cfuSet);
                    }
                    if (options.typSestavy !== 100 /* Gordic.Uct.Interface.GUcrTypSestavy.Financovani */)
                        gf.addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "jres:31100015", //RC 31100015 : Datum změny
                            width: 130,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.dateTimeIntervalCellTemplate("dat_zmena", d); },
                            editor: Gordic.Eko.Filters.dateInterval({
                                model: "dat_zmena",
                                firstField: { valueType: "datetime" },
                                secondField: { valueType: "datetime" },
                                caption: "jres:31100015" //RC 31100015 : Datum změny
                            })
                        });
                    if (options.typSestavy === 20 /* Gordic.Uct.Interface.GUcrTypSestavy.Stavova */) {
                        //Za obdobi
                        gf.addCurrencyColumn({
                            name: "sc0",
                            caption: "jres:31100059", //RC 31100059 : MO MD
                            description: "jres:31100245", //RC 31100245 : Měsíční obrat Má Dáti
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc0", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("sc0", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc0",
                                caption: "jres:31100059" //RC 31100059 : MO MD
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "sc1",
                            caption: "jres:31100060", //RC 31100060 : MO Dal
                            description: "jres:31100246", //RC 31100246 : Měsíční obrat Dal
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc1", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("sc1", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc1",
                                caption: "jres:31100060", //RC 31100060 : MO Dal
                            })
                        });
                        if (options.globals.Rad_ZobrazMdDal)
                            gf.addDecimalColumn({
                                name: "sc2",
                                caption: "jres:31100061", //RC 31100061 : MO MD - Dal
                                description: "jres:31100247", //RC 31100247 : Rozdíl částek Měsíční obrat Má Dáti mínus Měsíční obrat Dal
                                width: 140,
                                //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc2", d); },
                                cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("sc2", d); },
                                editor: Gordic.Eko.Filters.decimalInterval({
                                    model: "sc2",
                                    caption: "jres:31100061", //RC 31100061 : MO MD - Dal
                                })
                            });
                        //Do data
                        gf.addDecimalColumn({
                            name: "kc0",
                            caption: "jres:31100062", //RC 31100062 : AS MD
                            description: "jres:31100248", //RC 31100248 : Aktuální stav Má Dáti
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("kc0", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("kc0", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "kc0",
                                caption: "jres:31100062", //RC 31100062 : AS MD
                            })
                        });
                        gf.addDecimalColumn({
                            name: "kc1",
                            caption: "jres:31100063", //RC 31100063 : AS Dal
                            description: "jres:31100249", //RC 31100249 : Aktuální stav Dal
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("kc1", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("kc1", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "kc1",
                                caption: "jres:31100063", //RC 31100063 : AS Dal
                            })
                        });
                        if (options.globals.Rad_ZobrazMdDal)
                            gf.addDecimalColumn({
                                name: "kc2",
                                caption: "jres:31100064", //RC 31100064 : AS MD - Dal
                                width: 140,
                                //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("kc2", d); },
                                cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("kc2", d); },
                                editor: Gordic.Eko.Filters.decimalInterval({
                                    model: "kc2",
                                    caption: "jres:31100064", //RC 31100064 : AS MD - Dal
                                })
                            });
                    }
                    else if (options.typSestavy === 100 /* Gordic.Uct.Interface.GUcrTypSestavy.Financovani */) {
                        if (options.globals.RezimZobrazeniUlohyFinancovani === 1 /* Gordic.Uct.Interface.GUcrRezimZobrazeniFinancovani.FinancovaniSeStrednedobymVyhledem */)
                            gf.addCurrencyColumn({
                                name: "sc0",
                                caption: "jres:31100183", //RC 31100183 : Návrh rozpočtu
                                width: 140,
                                //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc0", d); },
                                cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("sc0", d); },
                                editor: Gordic.Eko.Filters.decimalInterval({
                                    model: "sc0",
                                    caption: "jres:31100183" //RC 31100183 : Návrh rozpočtu
                                })
                            });
                        gf.addCurrencyColumn({
                            name: "sc1",
                            caption: "jres:31100184", //RC 31100184 : Rozpočet schválený
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc1", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("sc1", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc1",
                                caption: "jres:31100184" //RC 31100184 : Rozpočet schválený
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "sc2",
                            caption: "jres:31100185", //RC 31100185 : Rozpočet upravený
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc2", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("sc2", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc2",
                                caption: "jres:31100185" //RC 31100185 : Rozpočet upravený
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "kc0",
                            caption: "jres:31100186", //RC 31100186 : Rozpočet vázaný
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("kc0", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("kc0", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "kc0",
                                caption: "jres:31100186" //RC 31100186 : Rozpočet vázaný
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "kc1",
                            caption: "jres:31100187", //RC 31100187 : Mimorozp. zdroje
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("kc1", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("kc1", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "kc1",
                                caption: "jres:31100187" //RC 31100187 : Mimorozp. zdroje
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "kc2",
                            caption: "jres:31100188", //RC 31100188 : Aktuální zdroje
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("kc2", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("kc2", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "kc2",
                                caption: "jres:31100188" //RC 31100188 : Aktuální zdroje
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "c0",
                            caption: "jres:31100189", //RC 31100189 : Blokováno ROZ
                            description: "jres:31100259", //RC 31100259 : Součet zápisů DRD 12
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("c0", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("c0", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "c0",
                                caption: "jres:31100189" //RC 31100189 : Blokováno ROZ
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "c1",
                            caption: "jres:31100190", //RC 31100190 : Nasmlouváno ROZ
                            description: "jres:31100260", //RC 31100260 : Součet zápisů DRD 10
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("c1", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("c1", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "c1",
                                caption: "jres:31100190" //RC 31100190 : Nasmlouváno ROZ
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "c2",
                            caption: "jres:31100191", //RC 31100191 : Nasmlouváno BLK
                            description: "jres:31100261", //RC 31100261 : Součet zápisů DRD 11
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("c2", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("c2", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "c2",
                                caption: "jres:31100191" //RC 31100191 : Nasmlouváno BLK
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "sc3",
                            caption: "jres:31100192", //RC 31100192 : Objednáno ROZ
                            description: "jres:31100262", //RC 31100262 : Součet zápisů DRD 15
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc3", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("sc3", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc3",
                                caption: "jres:31100192" //RC 31100192 : Objednáno ROZ
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "sc4",
                            caption: "jres:31100193", //RC 31100193 : Objednáno SML
                            description: "jres:31100263", //RC 31100263 : Součet zápisů DRD 16
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc4", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("sc4", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc4",
                                caption: "jres:31100193" //RC 31100193 : Objednáno SML
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "sc5",
                            caption: "jres:31100194", //RC 31100194 : Objednáno BLK
                            description: "jres:31100261", //RC 31100261 : Součet zápisů DRD 11
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc5", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("sc5", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc5",
                                caption: "jres:31100194" //RC 31100194 : Objednáno BLK
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "sc6",
                            caption: "jres:31100195", //RC 31100195 : Rezervováno ROZ
                            description: "jres:31100264", //RC 31100264 : Součet zápisů DRD 6
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc6", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("sc6", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc6",
                                caption: "jres:31100195" //RC 31100195 : Rezervováno ROZ
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "sc7",
                            caption: "jres:31100196", //RC 31100196 : Rezervováno SML
                            description: "jres:31100265", //RC 31100265 : Součet zápisů DRD 18
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc7", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("sc7", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc7",
                                caption: "jres:31100196" //RC 31100196 : Rezervováno SML
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "sc8",
                            caption: "jres:31100197", //RC 31100197 : Disponibilní zdroje
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc8", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("sc8", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc8",
                                caption: "jres:31100197" //RC 31100197 : Disponibilní zdroje
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "sc9",
                            caption: "jres:31100198", //RC 31100198 : Čerpáno
                            width: 140,
                            //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc9", d); },
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("sc9", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc9",
                                caption: "jres:31100198" //RC 31100198 : Čerpáno
                            })
                        });
                    }
                    else if (options.typSestavy === 10 /* Gordic.Uct.Interface.GUcrTypSestavy.Zapisova */) {
                        if (options.filterParams.typUlohy === 8 /* Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis */) {
                            gf.addCurrencyColumn({
                                name: "c0",
                                caption: "jres:31100199", //RC 31100199 : MD nový
                                width: 140,
                                //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("c0", d); },
                                cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("c0", d); },
                                editor: Gordic.Eko.Filters.decimalInterval({
                                    model: "c0",
                                    caption: "jres:31100199" //RC 31100199 : MD nový
                                })
                            });
                            gf.addCurrencyColumn({
                                name: "c1",
                                caption: "jres:31100200", //RC 31100200 : Dal nový
                                width: 140,
                                //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("c1", d); },
                                cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("c1", d); },
                                editor: Gordic.Eko.Filters.decimalInterval({
                                    model: "c1",
                                    caption: "jres:31100200" //RC 31100200 : Dal nový
                                })
                            });
                        }
                        else {
                            gf.addCurrencyColumn({
                                name: "c0",
                                caption: "jres:31100056", //RC 31100056 : MD
                                description: "jres:31100243", //RC 31100243 : Má Dáti
                                width: 140,
                                //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("c0", d); },
                                cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("c0", d); },
                                editor: Gordic.Eko.Filters.decimalInterval({
                                    model: "c0",
                                    caption: "jres:31100056" //RC 31100056 : MD
                                })
                            });
                            gf.addCurrencyColumn({
                                name: "c1",
                                caption: "jres:31100057", //RC 31100057 : Dal
                                width: 140,
                                //cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("c1", d); },
                                cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("c1", d); },
                                editor: Gordic.Eko.Filters.decimalInterval({
                                    model: "c1",
                                    caption: "jres:31100057" //RC 31100057 : Dal
                                })
                            });
                            if (options.globals.Rad_ZobrazMdDal /*&& !$.isEmptyObject(this.pozadavek)*/) //TODO: poresit i pozadavek???
                                gf.addCurrencyColumn({
                                    name: "c2",
                                    caption: "jres:31100058", //RC 31100058 : MD - Dal
                                    width: 140,
                                    //cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("c2", d); },
                                    cellTemplate: (d) => { return Gordic.Eko.Prefabs.decimalIntervalCellTemplate("c2", d); },
                                    editor: Gordic.Eko.Filters.decimalInterval({
                                        model: "c2",
                                        caption: "jres:31100058" //RC 31100058 : MD - Dal
                                    })
                                });
                        }
                        gf.addTextColumn({
                            name: "popis",
                            caption: "jres:31100071", //RC 31100071 : Popis řádku
                            width: 200,
                            cellTemplate: (d) => {
                                if (!d.popis)
                                    return "";
                                return ` '${d.popis}'`;
                            },
                            tooltipTemplate: "{popis}",
                            editor: Gordic.Eko.Filters.stringSingle({ model: "popis", caption: "jres:31100071" }) //RC 31100071 : Popis řádku
                        });
                        if (!options.filterParams.rozOnly) {
                            if (window["ginisDebugMode"])
                                gf.addTextColumn({
                                    name: "esu_txt",
                                    caption: "jres:31100080", //RC 31100080 : ESU
                                    description: "jres:31100252", //RC 31100252 : Externí subjekt
                                    width: 180,
                                    editor: Gordic.Ucr.WebClient.FilterPrefabs.esu_txt({ model: "esu_txt", ixs_esuPath: "_esu_txt_ixs", caption: "jres:31100080" }) //RC 31100080 : ESU
                                });
                            gf.addTextColumn({
                                name: "esu_ico",
                                caption: "jres:31100080" + " " + Gordic.Consts.DbShortcuts.ico, //RC 31100080 : ESU
                                description: "jres:31100253", //RC 31100253 : IČO Externího subjektu primárního dokladu
                                width: 80,
                                editor: Gordic.Ucr.WebClient.FilterPrefabs.esu_ico({ model: "esu_ico", ixs_esuPath: "_esu_ico_ixs", caption: "jres:31100080" + " " + Gordic.Consts.DbShortcuts.ico }) //RC 31100080 : ESU
                            });
                            gf.addTextColumn({
                                name: "esu_rc",
                                caption: "jres:31100081", //RC 31100081 : ESU RČ
                                description: "jres:31100254", //RC 31100254 : Rodné číslo Externího subjektu primárního dokladu
                                width: 80,
                                editor: Gordic.Ucr.WebClient.FilterPrefabs.esu_rc({
                                    model: "esu_rc", ixs_esuPath: "_esu_txt_rc", caption: "jres:31100081", //RC 31100081 : ESU RČ
                                    Rad_Esu_RcVyhl: options.globals.Rad_Esu_RcVyhl
                                })
                            });
                        }
                        gf.addTextColumn({
                            name: "typ_ag",
                            caption: "jres:31100079", //RC 31100079 : Agenda
                            width: 120,
                            cellTemplate: (v) => { return Gordic.Eko.Filters.singleCellTemplate("typ_ag_txt", v); },
                            tooltipTemplate: "{typ_ag_txt}",
                            editor: Gordic.Ucr.WebClient.FilterPrefabs.typ_ag({ model: "typ_ag", zkr_agPath: "typ_ag_txt", isRozpocet: options.filterParams.rozOnly, caption: "jres:31100079" }) //RC 31100079 : Agenda
                        });
                        if (options.filterParams.rozOnly)
                            gf.addTextColumn({
                                name: "ixp_prim",
                                caption: "jres:31100076", //RC 31100076 : PID primární
                                width: 110,
                                cellTemplate: "{ixp_prim}",
                                editor: Gordic.Eko.Filters.stringSingle({ model: "ixp_prim", caption: "jres:31100076" }) //RC 31100076 : PID primární
                            });
                        else
                            gf.addTextColumn({
                                name: "ixp",
                                caption: "jres:31100075", //RC 31100075 : PID
                                description: "jres:31100251", //RC 31100251 : Prvotní identifikátor primárního dokladu
                                width: 110,
                                cellTemplate: (d) => { return Gordic.Eko.Filters.ixpCellTemlate("jres:31100075", d.ixp); }, //RC 31100075 : PID
                                editor: Gordic.Eko.Filters.ixp({ model: "ixp", caption: "jres:31100075" }) //RC 31100075 : PID
                            });
                        if (options.filterParams.prizIissp) {
                            gf.addTextColumn({
                                name: "id_hdr_ris",
                                caption: "jres:31100082", //RC 31100082 : ID IISSP
                                description: "jres:31100255", //RC 31100255 : Identifikátor rezervace rozpočtových prostředků IISSP
                                width: 110,
                                cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("id_hdr_ris", d); },
                                editor: Gordic.Eko.Filters.stringInterval({ model: "id_hdr_ris", firstField: { allowedChars: "0123456789" }, secondField: { allowedChars: "0123456789" } })
                            });
                            gf.addNumberColumn({
                                name: "radek_hdr",
                                caption: "jres:31100132", //RC 31100132 : Řádek IISSP
                                description: "jres:31100256", //RC 31100256 : Řádek rezervace rozpočtových prostředků IISSP
                                width: 80,
                                cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("radek_hdr", d); },
                                editor: Gordic.Eko.Filters.integerInterval({ model: "radek_hdr", firstField: { minValue: 0, maxValue: 999 }, secondField: { minValue: 0, maxValue: 999 } })
                            });
                        }
                    }
                    gf.addTextColumn({
                        name: "nazev",
                        caption: "jres:31100271", //RC 31100271 : Název
                        width: 200,
                        cellTemplate: (d) => {
                            if (!d.nazev)
                                return "";
                            return ` '${d.nazev}'`;
                        },
                        tooltipTemplate: "{nazev}",
                        editor: Gordic.Eko.Filters.stringSingle({ model: "nazev", caption: "jres:31100271" }) //RC 31100271 : Název
                    });
                    return gf;
                }
                static createNewElementFunc(rp, ekoParams) {
                    return (view, gridFormat) => {
                        let ico;
                        let ucs;
                        let nks;
                        if (rp === 30 /* Gordic.Uct.Interface.GUcrRezimProvozu.ICO */
                            || rp === 20 /* Gordic.Uct.Interface.GUcrRezimProvozu.UCS */
                            || rp === 10 /* Gordic.Uct.Interface.GUcrRezimProvozu.NKS */) {
                            ico = { start: ekoParams.Ico, end: ekoParams.Ico };
                            if (rp === 20 /* Gordic.Uct.Interface.GUcrRezimProvozu.UCS */ || rp === 10 /* Gordic.Uct.Interface.GUcrRezimProvozu.NKS */)
                                ucs = { start: ekoParams.Ucs, end: ekoParams.Ucs };
                            if (rp === 10 /* Gordic.Uct.Interface.GUcrRezimProvozu.NKS */)
                                nks = { start: ekoParams.Nks, end: ekoParams.Nks };
                        }
                        return { ico: ico, ucs: ucs, nks: nks, cfu: {} };
                    };
                }
                static createClearElementFunc(rp) {
                    let skipColumns = GElementUtils.getElementValueSkipColumns(rp);
                    return (dto) => {
                        dto.cfu = {};
                        for (let p in dto) {
                            //console.log("elm. prop ", p, dto[p]);
                            //klice
                            if (p === "ixs_msk")
                                continue;
                            if (p === "radek")
                                continue; //NOTE: Je to jeden z klicu
                            if (p === "cfu")
                                continue;
                            if (skipColumns.indexOf(p) > -1)
                                continue;
                            delete dto[p];
                        }
                    };
                }
                /** Zjisti, ktere sloupce gridFormatu nemaji byt viditelne na zastupne hodnote elementoveho policka */
                static getElementValueSkipColumns(rp) {
                    let skipColumns = new Array();
                    if (rp === 30 /* Gordic.Uct.Interface.GUcrRezimProvozu.ICO */
                        || rp === 20 /* Gordic.Uct.Interface.GUcrRezimProvozu.UCS */
                        || rp === 10 /* Gordic.Uct.Interface.GUcrRezimProvozu.NKS */) {
                        skipColumns.push("ico");
                        if (rp === 20 /* Gordic.Uct.Interface.GUcrRezimProvozu.UCS */ || rp === 10 /* Gordic.Uct.Interface.GUcrRezimProvozu.NKS */)
                            skipColumns.push("ucs");
                        if (rp === 10 /* Gordic.Uct.Interface.GUcrRezimProvozu.NKS */)
                            skipColumns.push("nks");
                    }
                    skipColumns.push("nazev");
                    return skipColumns;
                }
            }
            WebClient.GElementUtils = GElementUtils;
        })(WebClient = Ucr.WebClient || (Ucr.WebClient = {}));
    })(Ucr = Gordic.Ucr || (Gordic.Ucr = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0VsZW1lbnRVdGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdFbGVtZW50VXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQVUsTUFBTSxDQTJ0QmY7QUEzdEJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTJ0Qm5CO0lBM3RCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBMnRCN0I7UUEzdEJvQixXQUFBLFNBQVM7WUFXMUIsTUFBYSxhQUFhO2dCQUN0QixNQUFNLENBQUMsd0JBQXdCLENBQUMsT0FBeUI7b0JBQ3JELElBQUksRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQWlCLENBQUM7b0JBQ3JELHdDQUF3QztvQkFDeEMsZ0NBQWdDO29CQUNoQywyQkFBMkI7b0JBRTNCLHNDQUFzQztvQkFFdEMsd0NBQXdDO29CQUV4QyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQ3RCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQztvQkFDdEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUN0QixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQ3RCLElBQUksR0FBRyxHQUF1QixTQUFTLENBQUM7b0JBRXhDLFFBQVEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQzt3QkFDbkM7NEJBQ0ksVUFBVSxHQUFHLElBQUksQ0FBQzs0QkFDbEIsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSwwREFBa0QsQ0FBQzs0QkFDN0YsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSwwREFBa0QsQ0FBQzs0QkFDN0YsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSwwREFBa0QsQ0FBQzs0QkFDN0YsTUFBTTt3QkFDVjs0QkFDSSxVQUFVLEdBQUcsS0FBSyxDQUFDOzRCQUNuQixVQUFVLEdBQUcsSUFBSSxDQUFDOzRCQUNsQixVQUFV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QUNoRCxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNoQyxDQUFDO29CQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzFCLE9BQU8sV0FBVyxDQUFDO2dCQUN2QixDQUFDO2FBQ0o7WUEvc0JZLHVCQUFhLGdCQStzQnpCLENBQUE7UUFDTCxDQUFDLEVBM3RCb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBMnRCN0I7SUFBRCxDQUFDLEVBM3RCZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMnRCbkI7QUFBRCxDQUFDLEVBM3RCUyxNQUFNLEtBQU4sTUFBTSxRQTJ0QmYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLlVjci5XZWJDbGllbnQge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR0VsZW1lbnRzT3B0aW9ucyB7XHJcbiAgICAgICAgdHlwU2VzdGF2eTogR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cFNlc3Rhdnk7XHJcbiAgICAgICAgZmlsdGVyT3B0aW9uczogR29yZGljLlVjci5XZWJDbGllbnQuRHRvLkdGaWx0ZXJPcHRpb25zRHRvO1xyXG4gICAgICAgIGdsb2JhbHM6IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JQYXJhbXNEdG87XHJcbiAgICAgICAgZmlsdGVyUGFyYW1zOiBHb3JkaWMuVWNyLldlYkNsaWVudC5HRmlsdGVyUGFyYW1zRHRvO1xyXG4gICAgICAgIGNmdVNldDogR29yZGljLkRhdGEuR3JpZEZvcm1hdDtcclxuICAgICAgICBla29QYXJhbXM6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkdFa29QYXJhbXNEdG87XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdFbGVtZW50VXRpbHMge1xyXG4gICAgICAgIHN0YXRpYyBjcmVhdGVFbGVtZW50c0dyaWRGb3JtYXQob3B0aW9uczogR0VsZW1lbnRzT3B0aW9ucyk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R0Vrb0ZpbHRlckR0bz4ge1xyXG4gICAgICAgICAgICB2YXIgZ2YgPSBuZXcgR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHRWtvRmlsdGVyRHRvPigpO1xyXG4gICAgICAgICAgICAvL2FkZFRvcEZpbHRlcnM6IGljbywgdWNzLCB1dXMsIHV1dSwgbmtzXHJcbiAgICAgICAgICAgIC8vdHlwVWxvaHkgemppc3RpbSBwb2RsZSBzZXN0YXZ5XHJcbiAgICAgICAgICAgIC8vb3B0aW9ucy5maWx0ZXJPcHRpb25zLm5rc1xyXG5cclxuICAgICAgICAgICAgLy9jb25zdCByZXBvcnRJbmZvID0gdGhpcy5yZXBvcnRJbmZvITtcclxuXHJcbiAgICAgICAgICAgIC8vVEsgR1VjckFwcGxpY2F0aW9uLlVwZGF0ZVRvcG9GaWx0ZXJzKClcclxuXHJcbiAgICAgICAgICAgIGxldCBpY29FbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHVjc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgbmtzRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCB1dXNFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHVjczogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChvcHRpb25zLmdsb2JhbHMuUmV6aW1Qcm92b3p1KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuU09SOlxyXG4gICAgICAgICAgICAgICAgICAgIGljb0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHVjc0VuYWJsZWQgPSBvcHRpb25zLmdsb2JhbHMuVHlwU3VtYXJpemFjZSAhPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwU3VtYXJpemFjZS5FeHRlcm5pO1xyXG4gICAgICAgICAgICAgICAgICAgIHV1c0VuYWJsZWQgPSBvcHRpb25zLmdsb2JhbHMuVHlwU3VtYXJpemFjZSAhPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwU3VtYXJpemFjZS5FeHRlcm5pO1xyXG4gICAgICAgICAgICAgICAgICAgIG5rc0VuYWJsZWQgPSBvcHRpb25zLmdsb2JhbHMuVHlwU3VtYXJpemFjZSAhPSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwU3VtYXJpemFjZS5FeHRlcm5pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LklDTzpcclxuICAgICAgICAgICAgICAgICAgICBpY29FbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdWNzRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdXVzRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbmtzRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuVUNTOlxyXG4gICAgICAgICAgICAgICAgICAgIGljb0VuYWJsZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIHVjc0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB1Y3MgPSBvcHRpb25zLmVrb1BhcmFtcy5VY3MhO1xyXG4gICAgICAgICAgICAgICAgICAgIHV1c0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIG5rc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1Lk5LUzpcclxuICAgICAgICAgICAgICAgICAgICBpY29FbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdWNzRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHV1c0VuYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBua3NFbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBHRXJyb3IoXCJOb3RTdXBwb3J0ZWRcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJpY29cIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMuaWNvLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IEdvcmRpYy5VY3IuR2xvYmFscy5HVHh0LkljbyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IGljb0VuYWJsZWQgPyB1bmRlZmluZWQgOiBcInVpLWRpc2FibGVkXCIsXHJcbiAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwiaWNvXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiAhaWNvRW5hYmxlZCA/IHVuZGVmaW5lZCA6IEdvcmRpYy5Fa28uRmlsdGVycy5pY29JbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiaWNvXCIsIG9ubHlBY3RpdmU6IGZhbHNlLCBjYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLmljbyEsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RGaWVsZDogeyBkaXNhYmxlZDogIWljb0VuYWJsZWQgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZWNvbmRGaWVsZDogeyBkaXNhYmxlZDogIWljb0VuYWJsZWQgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy91Y3NcclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJ1Y3NcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMudWNzLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IEdvcmRpYy5VY3IuR2xvYmFscy5HVHh0LlVjcyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogdWNzRW5hYmxlZCA/IHVuZGVmaW5lZCA6IFwidWktZGlzYWJsZWRcIixcclxuICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJ1Y3NcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6ICF1Y3NFbmFibGVkID8gdW5kZWZpbmVkIDogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKG9wdGlvbnMuZmlsdGVyT3B0aW9ucy51Y3MpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9maWx0ZXJQYXJhbXMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQmFsYW5jb3ZhbmlaYXBpc1xyXG4gICAgICAgICAgICAvL05PVEU6IFRvdG8gamUgdiBUSyBwcm8gZGFsc2kgdHlweSB1bG9oXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmZpbHRlclBhcmFtcy50eXBVbG9oeSAhPT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5WaWNlbGV0ZUZpbmFuY292YW5pWmFwaXNcclxuICAgICAgICAgICAgICAgICYmIG9wdGlvbnMuZmlsdGVyUGFyYW1zLnR5cFVsb2h5ICE9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkZpbmFuY292YW5pWmFwaXMpXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMudXVzLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBHb3JkaWMuVWNyLkdsb2JhbHMuR1R4dC5VdXMsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCxcclxuICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogdXVzRW5hYmxlZCA/IHVuZGVmaW5lZCA6IFwidWktZGlzYWJsZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwidXVzXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogIXV1c0VuYWJsZWQgPyB1bmRlZmluZWQgOiBHb3JkaWMuRWtvLkZpbHRlcnMudXVzSW50ZXJ2YWwob3B0aW9ucy5maWx0ZXJPcHRpb25zLnV1cylcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy5ua3MsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogR29yZGljLlVjci5HbG9iYWxzLkdUeHQuTmtzLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogbmtzRW5hYmxlZCA/IHVuZGVmaW5lZCA6IFwidWktZGlzYWJsZWRcIixcclxuICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJua3NcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6ICFua3NFbmFibGVkID8gdW5kZWZpbmVkIDogR29yZGljLkVrby5GaWx0ZXJzLm5rc0ludGVydmFsKG9wdGlvbnMuZmlsdGVyT3B0aW9ucy5ua3MpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy50eXBTZXN0YXZ5ICE9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwU2VzdGF2eS5GaW5hbmNvdmFuaSlcclxuICAgICAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7IC8vVE9ETzogZHJkIG5lZnVuZ3VqZSAtIG5lem9icmF6dWplIHNlIG5hIGVsZW1lbnRvdmVtIHBvbGlja3VcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRyZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1MlwiLCAvL1JDIDMxMTAwMDUyIDogSFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAxMDJcIiwgLy9SQyAzMTEwMDEwMiA6IERydWggZG9rbGFkdSAoRFJEKVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMCxcclxuICAgICAgICAgICAgICAgICAgICB0b29sdGlwVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBkLmRyZF9tc2sgfHwgXCJcIjsgfSxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBkLmRyZF9tc2sgfHwgXCJcIjsgfSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5kcmQob3B0aW9ucy5maWx0ZXJPcHRpb25zLmRyZClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMudHlwU2VzdGF2eSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cFNlc3RhdnkuWmFwaXNvdmEpIHtcclxuICAgICAgICAgICAgICAgIC8vZGVuLCBtZXNpYywgcm9rXHJcbiAgICAgICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDUzXCIsIC8vUkMgMzExMDAwNTMgOiBEXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDEzMFwiLCAvL1JDIDMxMTAwMTMwIDogRGVuXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJkZW5cIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1M1wiLCAvL1JDIDMxMTAwMDUzIDogRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IG1pblZhbHVlOiAxLCBtYXhWYWx1ZTogMzEgfSwgc2Vjb25kRmllbGQ6IHsgbWluVmFsdWU6IDEsIG1heFZhbHVlOiAzMSB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtZXNpY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1MVwiLCAvL1JDIDMxMTAwMDUxIDogTVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAwMTFcIiwgLy9SQyAzMTEwMDAxMSA6IE3Em3PDrWNcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcIm1lc2ljXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1lc2ljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1MVwiLCAvL1JDIDMxMTAwMDUxIDogTVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IG1pblZhbHVlOiAxLCBtYXhWYWx1ZTogMTMgfSwgc2Vjb25kRmllbGQ6IHsgbWluVmFsdWU6IDEsIG1heFZhbHVlOiAxMyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyb2tcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwMTBcIiwgLy9SQyAzMTEwMDAxMCA6IFJva1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1NSxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwicm9rXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwMTBcIiwgLy9SQyAzMTEwMDAxMCA6IFJva1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IG1pblZhbHVlOiAwLCBtYXhWYWx1ZTogOTk5OSB9LCBzZWNvbmRGaWVsZDogeyBtaW5WYWx1ZTogMCwgbWF4VmFsdWU6IDk5OTkgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vZG9rbGFkXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU0XCIsIC8vUkMgMzExMDAwNTQgOiBEb2tsYWRcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTcwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJhY1wiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5hY0ludGVydmFsKG9wdGlvbnMuZmlsdGVyT3B0aW9ucy5hYylcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy50eXBTZXN0YXZ5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwU2VzdGF2eS5GaW5hbmNvdmFuaSkge1xyXG4gICAgICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInJva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDAxMFwiLCAvL1JDIDMxMTAwMDEwIDogUm9rXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDU1LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJyb2tcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDAxMFwiLCAvL1JDIDMxMTAwMDEwIDogUm9rXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RmllbGQ6IHsgbWluVmFsdWU6IDAsIG1heFZhbHVlOiA5OTk5IH0sIHNlY29uZEZpZWxkOiB7IG1pblZhbHVlOiAwLCBtYXhWYWx1ZTogOTk5OSB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jZnVTZXQpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuY2Z1U2V0LmNvbHVtbnMuZm9yRWFjaCgoYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGMuZWRpdG9yID0gYy5zZXJ2ZXJGaWx0ZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9OT1RFIChCTSAyMDI1LTA3LTIyKTogVG90byB1eiBieSBuZW1lbG8gYnl0IG5pa2RlIG51dG5lIChqZSB0byBwb3Jlc2VubyB2IEVrby5XZWJDbGllbnQsIHZpeiBzb3V2aXNlamljaSBzb3Vib3J5IHYgdG9tdG8gY29tbWl0dSkuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jLmNlbGxUZW1wbGF0ZSA9IChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaWYgKCFkIHx8ICFkLmNmdSkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgcmV0dXJuIEdvcmRpYy5Fa28uRmlsdGVycy5VdGlscy5mb3JtYXRJbnRlcnZhbFZhbHVlKGQuY2Z1W2MubmFtZSFdLCBcIipcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkU29ydGVkRWtvQ2Z1U2V0KG9wdGlvbnMuY2Z1U2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnR5cFNlc3RhdnkgIT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JUeXBTZXN0YXZ5LkZpbmFuY292YW5pKVxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkRGF0ZVRpbWVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGF0X3ptZW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDE1XCIsIC8vUkMgMzExMDAwMTUgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTMwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5kYXRlVGltZUludGVydmFsQ2VsbFRlbXBsYXRlKFwiZGF0X3ptZW5hXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRhdGVJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IHZhbHVlVHlwZTogXCJkYXRldGltZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZEZpZWxkOiB7IHZhbHVlVHlwZTogXCJkYXRldGltZVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDAxNVwiIC8vUkMgMzExMDAwMTUgOiBEYXR1bSB6bcSbbnlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy50eXBTZXN0YXZ5ID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyVHlwU2VzdGF2eS5TdGF2b3ZhKSB7XHJcbiAgICAgICAgICAgICAgICAvL1phIG9iZG9iaVxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2MwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU5XCIsIC8vUkMgMzExMDAwNTkgOiBNTyBNRFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNDVcIiwgLy9SQyAzMTEwMDI0NSA6IE3Em3PDrcSNbsOtIG9icmF0IE3DoSBEw6F0aVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwic2MwXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5kZWNpbWFsSW50ZXJ2YWxDZWxsVGVtcGxhdGUoXCJzYzBcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic2MwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1OVwiIC8vUkMgMzExMDAwNTkgOiBNTyBNRFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzYzFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNjBcIiwgLy9SQyAzMTEwMDA2MCA6IE1PIERhbFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNDZcIiwgLy9SQyAzMTEwMDI0NiA6IE3Em3PDrcSNbsOtIG9icmF0IERhbFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwic2MxXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5kZWNpbWFsSW50ZXJ2YWxDZWxsVGVtcGxhdGUoXCJzYzFcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic2MxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA2MFwiLCAvL1JDIDMxMTAwMDYwIDogTU8gRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmdsb2JhbHMuUmFkX1pvYnJhek1kRGFsKVxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZERlY2ltYWxDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNjMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNjFcIiwgLy9SQyAzMTEwMDA2MSA6IE1PIE1EIC0gRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNDdcIiwgLy9SQyAzMTEwMDI0NyA6IFJvemTDrWwgxI3DoXN0ZWsgTcSbc8OtxI1uw60gb2JyYXQgTcOhIETDoXRpIG3DrW51cyBNxJtzw63EjW7DrSBvYnJhdCBEYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwic2MyXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuZGVjaW1hbEludGVydmFsQ2VsbFRlbXBsYXRlKFwic2MyXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic2MyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNjFcIiwgLy9SQyAzMTEwMDA2MSA6IE1PIE1EIC0gRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9EbyBkYXRhXHJcbiAgICAgICAgICAgICAgICBnZi5hZGREZWNpbWFsQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtjMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA2MlwiLCAvL1JDIDMxMTAwMDYyIDogQVMgTURcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjQ4XCIsIC8vUkMgMzExMDAyNDggOiBBa3R1w6FsbsOtIHN0YXYgTcOhIETDoXRpXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgICAgICAvL2NlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJrYzBcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmRlY2ltYWxJbnRlcnZhbENlbGxUZW1wbGF0ZShcImtjMFwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJrYzBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDYyXCIsIC8vUkMgMzExMDAwNjIgOiBBUyBNRFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGREZWNpbWFsQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA2M1wiLCAvL1JDIDMxMTAwMDYzIDogQVMgRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI0OVwiLCAvL1JDIDMxMTAwMjQ5IDogQWt0dcOhbG7DrSBzdGF2IERhbFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwia2MxXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5kZWNpbWFsSW50ZXJ2YWxDZWxsVGVtcGxhdGUoXCJrYzFcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwia2MxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA2M1wiLCAvL1JDIDMxMTAwMDYzIDogQVMgRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmdsb2JhbHMuUmFkX1pvYnJhek1kRGFsKVxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZERlY2ltYWxDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtjMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNjRcIiwgLy9SQyAzMTEwMDA2NCA6IEFTIE1EIC0gRGFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcImtjMlwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmRlY2ltYWxJbnRlcnZhbENlbGxUZW1wbGF0ZShcImtjMlwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImtjMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDY0XCIsIC8vUkMgMzExMDAwNjQgOiBBUyBNRCAtIERhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMudHlwU2VzdGF2eSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cFNlc3RhdnkuRmluYW5jb3ZhbmkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmdsb2JhbHMuUmV6aW1ab2JyYXplbmlVbG9oeUZpbmFuY292YW5pID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1ab2JyYXplbmlGaW5hbmNvdmFuaS5GaW5hbmNvdmFuaVNlU3RyZWRuZWRvYnltVnlobGVkZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNjMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxODNcIiwgLy9SQyAzMTEwMDE4MyA6IE7DoXZyaCByb3pwb8SNdHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwic2MwXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuZGVjaW1hbEludGVydmFsQ2VsbFRlbXBsYXRlKFwic2MwXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic2MwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxODNcIiAvL1JDIDMxMTAwMTgzIDogTsOhdnJoIHJvenBvxI10dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE4NFwiLCAvL1JDIDMxMTAwMTg0IDogUm96cG/EjWV0IHNjaHbDoWxlbsO9XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgICAgICAvL2NlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJzYzFcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmRlY2ltYWxJbnRlcnZhbENlbGxUZW1wbGF0ZShcInNjMVwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJzYzFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTg0XCIgLy9SQyAzMTEwMDE4NCA6IFJvenBvxI1ldCBzY2h2w6FsZW7DvVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzYzJcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxODVcIiwgLy9SQyAzMTEwMDE4NSA6IFJvenBvxI1ldCB1cHJhdmVuw71cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcInNjMlwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuZGVjaW1hbEludGVydmFsQ2VsbFRlbXBsYXRlKFwic2MyXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInNjMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxODVcIiAvL1JDIDMxMTAwMTg1IDogUm96cG/EjWV0IHVwcmF2ZW7DvVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrYzBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxODZcIiwgLy9SQyAzMTEwMDE4NiA6IFJvenBvxI1ldCB2w6F6YW7DvVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwia2MwXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5kZWNpbWFsSW50ZXJ2YWxDZWxsVGVtcGxhdGUoXCJrYzBcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwia2MwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE4NlwiIC8vUkMgMzExMDAxODYgOiBSb3pwb8SNZXQgdsOhemFuw71cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia2MxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTg3XCIsIC8vUkMgMzExMDAxODcgOiBNaW1vcm96cC4gemRyb2plXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgICAgICAvL2NlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJrYzFcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmRlY2ltYWxJbnRlcnZhbENlbGxUZW1wbGF0ZShcImtjMVwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJrYzFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTg3XCIgLy9SQyAzMTEwMDE4NyA6IE1pbW9yb3pwLiB6ZHJvamVcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia2MyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTg4XCIsIC8vUkMgMzExMDAxODggOiBBa3R1w6FsbsOtIHpkcm9qZVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwia2MyXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5kZWNpbWFsSW50ZXJ2YWxDZWxsVGVtcGxhdGUoXCJrYzJcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwia2MyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE4OFwiIC8vUkMgMzExMDAxODggOiBBa3R1w6FsbsOtIHpkcm9qZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE4OVwiLCAvL1JDIDMxMTAwMTg5IDogQmxva292w6FubyBST1pcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjU5XCIsIC8vUkMgMzExMDAyNTkgOiBTb3XEjWV0IHrDoXBpc8WvIERSRCAxMlxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwiYzBcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmRlY2ltYWxJbnRlcnZhbENlbGxUZW1wbGF0ZShcImMwXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImMwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE4OVwiIC8vUkMgMzExMDAxODkgOiBCbG9rb3bDoW5vIFJPWlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE5MFwiLCAvL1JDIDMxMTAwMTkwIDogTmFzbWxvdXbDoW5vIFJPWlxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNjBcIiwgLy9SQyAzMTEwMDI2MCA6IFNvdcSNZXQgesOhcGlzxa8gRFJEIDEwXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgICAgICAvL2NlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJjMVwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuZGVjaW1hbEludGVydmFsQ2VsbFRlbXBsYXRlKFwiYzFcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiYzFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTkwXCIgLy9SQyAzMTEwMDE5MCA6IE5hc21sb3V2w6FubyBST1pcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzJcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxOTFcIiwgLy9SQyAzMTEwMDE5MSA6IE5hc21sb3V2w6FubyBCTEtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjYxXCIsIC8vUkMgMzExMDAyNjEgOiBTb3XEjWV0IHrDoXBpc8WvIERSRCAxMVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwiYzJcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmRlY2ltYWxJbnRlcnZhbENlbGxUZW1wbGF0ZShcImMyXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImMyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE5MVwiIC8vUkMgMzExMDAxOTEgOiBOYXNtbG91dsOhbm8gQkxLXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNjM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE5MlwiLCAvL1JDIDMxMTAwMTkyIDogT2JqZWRuw6FubyBST1pcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjYyXCIsIC8vUkMgMzExMDAyNjIgOiBTb3XEjWV0IHrDoXBpc8WvIERSRCAxNVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwic2MzXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5kZWNpbWFsSW50ZXJ2YWxDZWxsVGVtcGxhdGUoXCJzYzNcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic2MzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE5MlwiIC8vUkMgMzExMDAxOTIgOiBPYmplZG7DoW5vIFJPWlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzYzRcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxOTNcIiwgLy9SQyAzMTEwMDE5MyA6IE9iamVkbsOhbm8gU01MXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI2M1wiLCAvL1JDIDMxMTAwMjYzIDogU291xI1ldCB6w6FwaXPFryBEUkQgMTZcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcInNjNFwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuZGVjaW1hbEludGVydmFsQ2VsbFRlbXBsYXRlKFwic2M0XCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInNjNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxOTNcIiAgLy9SQyAzMTEwMDE5MyA6IE9iamVkbsOhbm8gU01MXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNjNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE5NFwiLCAvL1JDIDMxMTAwMTk0IDogT2JqZWRuw6FubyBCTEtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjYxXCIsIC8vUkMgMzExMDAyNjEgOiBTb3XEjWV0IHrDoXBpc8WvIERSRCAxMVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwic2M1XCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5kZWNpbWFsSW50ZXJ2YWxDZWxsVGVtcGxhdGUoXCJzYzVcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic2M1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE5NFwiICAvL1JDIDMxMTAwMTk0IDogT2JqZWRuw6FubyBCTEtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2M2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTk1XCIsIC8vUkMgMzExMDAxOTUgOiBSZXplcnZvdsOhbm8gUk9aXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI2NFwiLCAvL1JDIDMxMTAwMjY0IDogU291xI1ldCB6w6FwaXPFryBEUkQgNlxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwic2M2XCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5kZWNpbWFsSW50ZXJ2YWxDZWxsVGVtcGxhdGUoXCJzYzZcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic2M2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE5NVwiICAvL1JDIDMxMTAwMTk1IDogUmV6ZXJ2b3bDoW5vIFJPWlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzYzdcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxOTZcIiwgLy9SQyAzMTEwMDE5NiA6IFJlemVydm92w6FubyBTTUxcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjY1XCIsIC8vUkMgMzExMDAyNjUgOiBTb3XEjWV0IHrDoXBpc8WvIERSRCAxOFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwic2M3XCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5kZWNpbWFsSW50ZXJ2YWxDZWxsVGVtcGxhdGUoXCJzYzdcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic2M3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE5NlwiIC8vUkMgMzExMDAxOTYgOiBSZXplcnZvdsOhbm8gU01MXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNjOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE5N1wiLCAvL1JDIDMxMTAwMTk3IDogRGlzcG9uaWJpbG7DrSB6ZHJvamVcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcInNjOFwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuZGVjaW1hbEludGVydmFsQ2VsbFRlbXBsYXRlKFwic2M4XCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInNjOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxOTdcIiAvL1JDIDMxMTAwMTk3IDogRGlzcG9uaWJpbG7DrSB6ZHJvamVcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2M5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTk4XCIsIC8vUkMgMzExMDAxOTggOiDEjGVycMOhbm9cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcInNjOVwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuZGVjaW1hbEludGVydmFsQ2VsbFRlbXBsYXRlKFwic2M5XCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInNjOVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxOThcIiAvL1JDIDMxMTAwMTk4IDogxIxlcnDDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMudHlwU2VzdGF2eSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclR5cFNlc3RhdnkuWmFwaXNvdmEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmZpbHRlclBhcmFtcy50eXBVbG9oeSA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1Byb2hsaXplbmlVY3RUYXNrVHlwZS5CYWxhbmNvdmFuaVphcGlzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE5OVwiLCAvL1JDIDMxMTAwMTk5IDogTUQgbm92w71cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwiYzBcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5kZWNpbWFsSW50ZXJ2YWxDZWxsVGVtcGxhdGUoXCJjMFwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImMwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxOTlcIiAvL1JDIDMxMTAwMTk5IDogTUQgbm92w71cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDIwMFwiLCAvL1JDIDMxMTAwMjAwIDogRGFsIG5vdsO9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcImMxXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuZGVjaW1hbEludGVydmFsQ2VsbFRlbXBsYXRlKFwiYzFcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjAwXCIgLy9SQyAzMTEwMDIwMCA6IERhbCBub3bDvVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1NlwiLCAvL1JDIDMxMTAwMDU2IDogTURcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI0M1wiLCAvL1JDIDMxMTAwMjQzIDogTcOhIETDoXRpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcImMwXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuZGVjaW1hbEludGVydmFsQ2VsbFRlbXBsYXRlKFwiYzBcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU2XCIgLy9SQyAzMTEwMDA1NiA6IE1EXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNTdcIiwgLy9SQyAzMTEwMDA1NyA6IERhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5kZWNpbWFsSW50ZXJ2YWxDZWxsVGVtcGxhdGUoXCJjMVwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmRlY2ltYWxJbnRlcnZhbENlbGxUZW1wbGF0ZShcImMxXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiYzFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1N1wiIC8vUkMgMzExMDAwNTcgOiBEYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZ2xvYmFscy5SYWRfWm9icmF6TWREYWwgLyomJiAhJC5pc0VtcHR5T2JqZWN0KHRoaXMucG96YWRhdmVrKSovKSAvL1RPRE86IHBvcmVzaXQgaSBwb3phZGF2ZWs/Pz9cclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDU4XCIsIC8vUkMgMzExMDAwNTggOiBNRCAtIERhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcImMyXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmRlY2ltYWxJbnRlcnZhbENlbGxUZW1wbGF0ZShcImMyXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJjMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA1OFwiIC8vUkMgMzExMDAwNTggOiBNRCAtIERhbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA3MVwiLCAvL1JDIDMxMTAwMDcxIDogUG9waXMgxZnDoWRrdVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkLnBvcGlzKSByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAgJyR7ZC5wb3Bpc30nYDtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogXCJ7cG9waXN9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nU2luZ2xlKHsgbW9kZWw6IFwicG9waXNcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDcxXCIgfSkgLy9SQyAzMTEwMDA3MSA6IFBvcGlzIMWZw6Fka3VcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy5maWx0ZXJQYXJhbXMucm96T25seSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3dbXCJnaW5pc0RlYnVnTW9kZVwiXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVzdV90eHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA4MFwiLCAvL1JDIDMxMTAwMDgwIDogRVNVXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjUyXCIsIC8vUkMgMzExMDAyNTIgOiBFeHRlcm7DrSBzdWJqZWt0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTgwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuVWNyLldlYkNsaWVudC5GaWx0ZXJQcmVmYWJzLmVzdV90eHQoeyBtb2RlbDogXCJlc3VfdHh0XCIsIGl4c19lc3VQYXRoOiBcIl9lc3VfdHh0X2l4c1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwODBcIiB9KSAvL1JDIDMxMTAwMDgwIDogRVNVXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlc3VfaWNvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA4MFwiICsgXCIgXCIgKyBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLmljbywgIC8vUkMgMzExMDAwODAgOiBFU1VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1M1wiLCAvL1JDIDMxMTAwMjUzIDogScSMTyBFeHRlcm7DrWhvIHN1Ympla3R1IHByaW3DoXJuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuVWNyLldlYkNsaWVudC5GaWx0ZXJQcmVmYWJzLmVzdV9pY28oeyBtb2RlbDogXCJlc3VfaWNvXCIsIGl4c19lc3VQYXRoOiBcIl9lc3VfaWNvX2l4c1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwODBcIiArIFwiIFwiICsgR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy5pY28gfSkgLy9SQyAzMTEwMDA4MCA6IEVTVVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJlc3VfcmNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgxXCIsIC8vUkMgMzExMDAwODEgOiBFU1UgUsSMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNTRcIiwgLy9SQyAzMTEwMDI1NCA6IFJvZG7DqSDEjcOtc2xvIEV4dGVybsOtaG8gc3ViamVrdHUgcHJpbcOhcm7DrWhvIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkZpbHRlclByZWZhYnMuZXN1X3JjKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImVzdV9yY1wiLCBpeHNfZXN1UGF0aDogXCJfZXN1X3R4dF9yY1wiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwODFcIiwgLy9SQyAzMTEwMDA4MSA6IEVTVSBSxIxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJhZF9Fc3VfUmNWeWhsOiBvcHRpb25zLmdsb2JhbHMuUmFkX0VzdV9SY1Z5aGwhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfYWdcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzlcIiwgLy9SQyAzMTEwMDA3OSA6IEFnZW5kYVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAodikgPT4geyByZXR1cm4gR29yZGljLkVrby5GaWx0ZXJzLnNpbmdsZUNlbGxUZW1wbGF0ZShcInR5cF9hZ190eHRcIiwgdik7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiBcInt0eXBfYWdfdHh0fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLlVjci5XZWJDbGllbnQuRmlsdGVyUHJlZmFicy50eXBfYWcoeyBtb2RlbDogXCJ0eXBfYWdcIiwgemtyX2FnUGF0aDogXCJ0eXBfYWdfdHh0XCIsIGlzUm96cG9jZXQ6IG9wdGlvbnMuZmlsdGVyUGFyYW1zLnJvek9ubHksIGNhcHRpb246IFwianJlczozMTEwMDA3OVwiIH0pIC8vUkMgMzExMDAwNzkgOiBBZ2VuZGFcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmZpbHRlclBhcmFtcy5yb3pPbmx5KVxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9wcmltXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA3NlwiLCAgLy9SQyAzMTEwMDA3NiA6IFBJRCBwcmltw6FybsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogXCJ7aXhwX3ByaW19XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ1NpbmdsZSh7IG1vZGVsOiBcIml4cF9wcmltXCIsIGNhcHRpb246IFwianJlczozMTEwMDA3NlwiIH0pIC8vUkMgMzExMDAwNzYgOiBQSUQgcHJpbcOhcm7DrVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzVcIiwgLy9SQyAzMTEwMDA3NSA6IFBJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjUxXCIsIC8vUkMgMzExMDAyNTEgOiBQcnZvdG7DrSBpZGVudGlmaWvDoXRvciBwcmltw6FybsOtaG8gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwLCAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLkZpbHRlcnMuaXhwQ2VsbFRlbWxhdGUoXCJqcmVzOjMxMTAwMDc1XCIsIGQuaXhwKTsgfSwgLy9SQyAzMTEwMDA3NSA6IFBJRFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5peHAoeyBtb2RlbDogXCJpeHBcIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc1XCIgfSkgLy9SQyAzMTEwMDA3NSA6IFBJRFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmZpbHRlclBhcmFtcy5wcml6SWlzc3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpZF9oZHJfcmlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDA4MlwiLCAgLy9SQyAzMTEwMDA4MiA6IElEIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNTVcIiwgLy9SQyAzMTEwMDI1NSA6IElkZW50aWZpa8OhdG9yIHJlemVydmFjZSByb3pwb8SNdG92w71jaCBwcm9zdMWZZWRrxa8gSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcImlkX2hkcl9yaXNcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLnN0cmluZ0ludGVydmFsKHsgbW9kZWw6IFwiaWRfaGRyX3Jpc1wiLCBmaXJzdEZpZWxkOiB7IGFsbG93ZWRDaGFyczogXCIwMTIzNDU2Nzg5XCIgfSwgc2Vjb25kRmllbGQ6IHsgYWxsb3dlZENoYXJzOiBcIjAxMjM0NTY3ODlcIiB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicmFkZWtfaGRyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDEzMlwiLCAvL1JDIDMxMTAwMTMyIDogxZjDoWRlayBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjU2XCIsIC8vUkMgMzExMDAyNTYgOiDFmMOhZGVrIHJlemVydmFjZSByb3pwb8SNdG92w71jaCBwcm9zdMWZZWRrxa8gSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwicmFkZWtfaGRyXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5pbnRlZ2VySW50ZXJ2YWwoeyBtb2RlbDogXCJyYWRla19oZHJcIiwgZmlyc3RGaWVsZDogeyBtaW5WYWx1ZTogMCwgbWF4VmFsdWU6IDk5OSB9LCBzZWNvbmRGaWVsZDogeyBtaW5WYWx1ZTogMCwgbWF4VmFsdWU6IDk5OSB9IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjcxXCIsIC8vUkMgMzExMDAyNzEgOiBOw6F6ZXZcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkLm5hemV2KSByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCAnJHtkLm5hemV2fSdgO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogXCJ7bmF6ZXZ9XCIsXHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdTaW5nbGUoeyBtb2RlbDogXCJuYXpldlwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAyNzFcIiB9KSAvL1JDIDMxMTAwMjcxIDogTsOhemV2XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGNyZWF0ZU5ld0VsZW1lbnRGdW5jKHJwOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LCBla29QYXJhbXM6IEdFa29QYXJhbXNEdG8pOiBHb3JkaWMuRWtvLlByZWZhYnMuQ3JlYXRlRWxlbWVudFJlY29yZDxHb3JkaWMuRWtvLlByZWZhYnMuSUdDZnVEdG8+IHtcclxuICAgICAgICAgICAgcmV0dXJuICh2aWV3LCBncmlkRm9ybWF0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWNvOiBHSW50ZXJ2YWxEdG88c3RyaW5nPiB8IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGxldCB1Y3M6IEdJbnRlcnZhbER0bzxzdHJpbmc+IHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5rczogR0ludGVydmFsRHRvPHN0cmluZz4gfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJwID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LklDT1xyXG4gICAgICAgICAgICAgICAgICAgIHx8IHJwID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1LlVDU1xyXG4gICAgICAgICAgICAgICAgICAgIHx8IHJwID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1Lk5LUykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpY28gPSB7IHN0YXJ0OiBla29QYXJhbXMuSWNvISwgZW5kOiBla29QYXJhbXMuSWNvISB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocnAgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuVUNTIHx8IHJwID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1Lk5LUylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWNzID0geyBzdGFydDogZWtvUGFyYW1zLlVjcyEsIGVuZDogZWtvUGFyYW1zLlVjcyEgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJwID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1Lk5LUylcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmtzID0geyBzdGFydDogZWtvUGFyYW1zLk5rcyEsIGVuZDogZWtvUGFyYW1zLk5rcyEgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBpY286IGljbywgdWNzOiB1Y3MsIG5rczogbmtzLCBjZnU6IHt9IH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBjcmVhdGVDbGVhckVsZW1lbnRGdW5jKHJwOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1KTogR29yZGljLkVrby5QcmVmYWJzLkNsZWFyRWxlbWVudFJlY29yZDxHb3JkaWMuRWtvLlByZWZhYnMuSUdDZnVEdG8+IHtcclxuICAgICAgICAgICAgbGV0IHNraXBDb2x1bW5zID0gR0VsZW1lbnRVdGlscy5nZXRFbGVtZW50VmFsdWVTa2lwQ29sdW1ucyhycCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKGR0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgZHRvLmNmdSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBkdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZWxtLiBwcm9wIFwiLCBwLCBkdG9bcF0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2tsaWNlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAgPT09IFwiaXhzX21za1wiKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocCA9PT0gXCJyYWRla1wiKSBjb250aW51ZTsgLy9OT1RFOiBKZSB0byBqZWRlbiB6IGtsaWN1XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwID09PSBcImNmdVwiKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2tpcENvbHVtbnMuaW5kZXhPZihwKSA+IC0xKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZHRvW3BdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFpqaXN0aSwga3RlcmUgc2xvdXBjZSBncmlkRm9ybWF0dSBuZW1hamkgYnl0IHZpZGl0ZWxuZSBuYSB6YXN0dXBuZSBob2Rub3RlIGVsZW1lbnRvdmVobyBwb2xpY2thICovXHJcbiAgICAgICAgc3RhdGljIGdldEVsZW1lbnRWYWx1ZVNraXBDb2x1bW5zKHJwOiBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1KTogc3RyaW5nW10ge1xyXG4gICAgICAgICAgICBsZXQgc2tpcENvbHVtbnMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICBpZiAocnAgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuSUNPXHJcbiAgICAgICAgICAgICAgICB8fCBycCA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5VQ1NcclxuICAgICAgICAgICAgICAgIHx8IHJwID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1Lk5LUykge1xyXG5cclxuICAgICAgICAgICAgICAgIHNraXBDb2x1bW5zLnB1c2goXCJpY29cIilcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocnAgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdVY3JSZXppbVByb3ZvenUuVUNTIHx8IHJwID09PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HVWNyUmV6aW1Qcm92b3p1Lk5LUylcclxuICAgICAgICAgICAgICAgICAgICBza2lwQ29sdW1ucy5wdXNoKFwidWNzXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChycCA9PT0gR29yZGljLlVjdC5JbnRlcmZhY2UuR1VjclJlemltUHJvdm96dS5OS1MpXHJcbiAgICAgICAgICAgICAgICAgICAgc2tpcENvbHVtbnMucHVzaChcIm5rc1wiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2tpcENvbHVtbnMucHVzaChcIm5hemV2XCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2tpcENvbHVtbnM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19