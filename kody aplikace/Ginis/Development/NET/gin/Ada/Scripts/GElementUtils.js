"use strict";
var Gordic;
(function (Gordic) {
    var Ada;
    (function (Ada) {
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
                    icoEnabled = false;
                    ucsEnabled = true;
                    uusEnabled = true;
                    nksEnabled = true;
                    gf.addTextColumn({
                        name: "ico",
                        caption: Gordic.Consts.DbShortcuts.ico,
                        description: Gordic.Ada.Globals.GAdaGlobals.Titulek_Ico,
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
                        description: Gordic.Ada.Globals.GAdaGlobals.Titulek_Ucs,
                        width: 80,
                        //group: topoGroup,                
                        customClass: ucsEnabled ? undefined : "ui-disabled",
                        cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("ucs", d); },
                        editor: !ucsEnabled ? undefined : Gordic.Eko.Filters.ucsInterval(options.filterOptions.ucs)
                    });
                    ////filterParams.typUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis
                    ////NOTE: Toto je v TK pro dalsi typy uloh
                    //if (options.filterParams.typUlohy !== Gordic.Uct.Interface.GProhlizeniUctTaskType.ViceleteFinancovaniZapis
                    //    && options.filterParams.typUlohy !== Gordic.Uct.Interface.GProhlizeniUctTaskType.FinancovaniZapis)
                    //    gf.addTextColumn({
                    //        name: "uus",
                    //        caption: Gordic.Consts.DbShortcuts.uus,
                    //        description: Gordic.Ada.Globals.GAdaGlobals.Titulek_Uus!,
                    //        width: 80,
                    //        //group: topoGroup,
                    //        customClass: uusEnabled ? undefined : "ui-disabled",
                    //        cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("uus", d); },
                    //        editor: !uusEnabled ? undefined : Gordic.Eko.Filters.uusInterval(options.filterOptions.uus)
                    //    });
                    gf.addTextColumn({
                        name: "nks",
                        caption: Gordic.Consts.DbShortcuts.nks,
                        description: Gordic.Ada.Globals.GAdaGlobals.Titulek_Nks,
                        width: 80,
                        //group: topoGroup
                        customClass: nksEnabled ? undefined : "ui-disabled",
                        cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("nks", d); },
                        editor: !nksEnabled ? undefined : Gordic.Eko.Filters.nksInterval(options.filterOptions.nks)
                    });
                    if (options.typSestavy !== 100 /* GAdaTypSestavy.Financovani */)
                        gf.addNumberColumn({
                            name: "drd",
                            caption: "H ",
                            description: "Druh dokladu",
                            width: 30,
                            tooltipTemplate: (d) => { return d.drd_msk || ""; },
                            cellTemplate: (d) => { return d.drd_msk || ""; },
                            editor: Gordic.Eko.Filters.drd(options.filterOptions.drd)
                        });
                    if (options.typSestavy === 10 /* GAdaTypSestavy.Zapisova */) {
                        //den, mesic, rok
                        gf.addNumberColumn({
                            name: "den",
                            caption: "D ",
                            description: "Den",
                            width: 40,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("den", d); },
                            editor: Gordic.Eko.Filters.integerInterval({
                                model: "den",
                                caption: "D ",
                                firstField: { minValue: 1, maxValue: 31 }, secondField: { minValue: 1, maxValue: 31 }
                            })
                        });
                        gf.addNumberColumn({
                            name: "mesic",
                            caption: "M ",
                            description: "Měsíc",
                            width: 40,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("mesic", d); },
                            editor: Gordic.Eko.Filters.integerInterval({
                                model: "mesic",
                                caption: "M ",
                                firstField: { minValue: 1, maxValue: 13 }, secondField: { minValue: 1, maxValue: 13 }
                            })
                        });
                        gf.addNumberColumn({
                            name: "rok",
                            caption: "Rok",
                            width: 55,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("rok", d); },
                            editor: Gordic.Eko.Filters.integerInterval({
                                model: "rok",
                                caption: "Rok",
                                firstField: { minValue: 0, maxValue: 9999 }, secondField: { minValue: 0, maxValue: 9999 }
                            })
                        });
                        //doklad
                        gf.addTextColumn({
                            name: "ac",
                            caption: "Doklad",
                            width: 170,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("ac", d); },
                            editor: Gordic.Eko.Filters.acInterval(options.filterOptions.ac)
                        });
                    }
                    if (options.typSestavy === 100 /* GAdaTypSestavy.Financovani */) {
                        gf.addNumberColumn({
                            name: "rok",
                            caption: "Rok",
                            width: 55,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("rok", d); },
                            editor: Gordic.Eko.Filters.integerInterval({
                                model: "rok",
                                caption: "Rok",
                                firstField: { minValue: 0, maxValue: 9999 }, secondField: { minValue: 0, maxValue: 9999 }
                            })
                        });
                    }
                    if (options.cfuSet) {
                        options.cfuSet.columns.forEach((c) => {
                            c.editor = c.serverFilter;
                            c.cellTemplate = (d) => {
                                if (!d || !d.cfu)
                                    return "";
                                return Gordic.Eko.Filters.Utils.formatIntervalValue(d.cfu[c.name]);
                            };
                        });
                        gf.addSortedEkoCfuSet(options.cfuSet);
                    }
                    if (options.typSestavy !== 100 /* GAdaTypSestavy.Financovani */)
                        gf.addDateTimeColumn({
                            name: "dat_zmena",
                            caption: "Datum změny",
                            width: 130,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("dat_zmena", d); },
                            editor: Gordic.Eko.Filters.dateInterval({
                                model: "dat_zmena",
                                firstField: { valueType: "datetime" },
                                secondField: { valueType: "datetime" },
                                caption: "Datum změny"
                            })
                        });
                    if (options.typSestavy === 20 /* GAdaTypSestavy.Stavova */) {
                        //Za obdobi
                        gf.addCurrencyColumn({
                            name: "sc0",
                            caption: "MO MD",
                            description: "Měsíční obrat Má Dáti",
                            width: 140,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc0", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc0",
                                caption: "MO MD9"
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "sc1",
                            caption: "MO Dal",
                            description: "Měsíční obrat Dal",
                            width: 140,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc1", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc1",
                                caption: "MO Dal",
                            })
                        });
                        //if (options.globals.Rad_ZobrazMdDal)
                        gf.addDecimalColumn({
                            name: "sc2",
                            caption: " MO MD - Dal",
                            description: " Rozdíl částek Měsíční obrat Má Dáti mínus Měsíční obrat Dal",
                            width: 140,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc2", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc2",
                                caption: " MO MD - Dal",
                            })
                        });
                        //Do data
                        gf.addDecimalColumn({
                            name: "kc0",
                            caption: "AS MD",
                            description: " Aktuální stav Má Dáti",
                            width: 140,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("kc0", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "kc0",
                                caption: "AS MD",
                            })
                        });
                        gf.addDecimalColumn({
                            name: "kc1",
                            caption: "AS Dal",
                            description: " Aktuální stav Dal",
                            width: 140,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("kc1", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "kc1",
                                caption: "AS Dal",
                            })
                        });
                        // if (options.globals.Rad_ZobrazMdDal)
                        gf.addDecimalColumn({
                            name: "kc2",
                            caption: "AS MD - Dal",
                            width: 140,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("kc2", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "kc2",
                                caption: "AS MD - Dal",
                            })
                        });
                    }
                    else if (options.typSestavy === 100 /* GAdaTypSestavy.Financovani */) {
                        //if (options.globals.RezimZobrazeniUlohyFinancovani === Gordic.Ucr.WebClient.Dto.GUcrRezimZobrazeniFinancovani.FinancovaniSeStrednedobymVyhledem)
                        //    gf.addCurrencyColumn({
                        //        name: "sc0",
                        //        caption: "jres:31100183", //RC 31100183 : Návrh rozpočtu
                        //        width: 140,
                        //        cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc0", d); },
                        //        editor: Gordic.Eko.Filters.decimalInterval({
                        //            model: "sc0",
                        //            caption: "jres:31100183" //RC 31100183 : Návrh rozpočtu
                        //        })
                        //    });
                        gf.addCurrencyColumn({
                            name: "sc1",
                            caption: "Rozpočet schválený",
                            width: 140,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc1", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc1",
                                caption: "Rozpočet schválený"
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "sc2",
                            caption: "jres:31100185", //RC 31100185 : Rozpočet upravený
                            width: 140,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc2", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc2",
                                caption: "jres:31100185" //RC 31100185 : Rozpočet upravený
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "kc0",
                            caption: "jres:31100186", //RC 31100186 : Rozpočet vázaný
                            width: 140,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("kc0", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "kc0",
                                caption: "jres:31100186" //RC 31100186 : Rozpočet vázaný
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "kc1",
                            caption: "jres:31100187", //RC 31100187 : Mimorozp. zdroje
                            width: 140,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("kc1", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "kc1",
                                caption: "jres:31100187" //RC 31100187 : Mimorozp. zdroje
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "kc2",
                            caption: "jres:31100188", //RC 31100188 : Aktuální zdroje
                            width: 140,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("kc2", d); },
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
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("c0", d); },
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
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("c1", d); },
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
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("c2", d); },
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
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc3", d); },
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
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc4", d); },
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
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc5", d); },
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
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc6", d); },
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
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc7", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc7",
                                caption: "jres:31100196" //RC 31100196 : Rezervováno SML
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "sc8",
                            caption: "jres:31100197", //RC 31100197 : Disponibilní zdroje
                            width: 140,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc8", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc8",
                                caption: "jres:31100197" //RC 31100197 : Disponibilní zdroje
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "sc9",
                            caption: "jres:31100198", //RC 31100198 : Čerpáno
                            width: 140,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("sc9", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "sc9",
                                caption: "jres:31100198" //RC 31100198 : Čerpáno
                            })
                        });
                    }
                    else if (options.typSestavy === 10 /* GAdaTypSestavy.Zapisova */) {
                        //if (options.filterParams.typUlohy === Gordic.Uct.Interface.GProhlizeniUctTaskType.BalancovaniZapis) {
                        //    gf.addCurrencyColumn({
                        //        name: "c0",
                        //        caption: "jres:31100199", //RC 31100199 : MD nový
                        //        width: 140,
                        //        cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("c0", d); },
                        //        editor: Gordic.Eko.Filters.decimalInterval({
                        //            model: "c0",
                        //            caption: "jres:31100199" //RC 31100199 : MD nový
                        //        })
                        //    });
                        //    gf.addCurrencyColumn({
                        //        name: "c1",
                        //        caption: "jres:31100200", //RC 31100200 : Dal nový
                        //        width: 140,
                        //        cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("c1", d); },
                        //        editor: Gordic.Eko.Filters.decimalInterval({
                        //            model: "c1",
                        //            caption: "jres:31100200" //RC 31100200 : Dal nový
                        //        })
                        //    });
                        //}
                        //else {
                        gf.addCurrencyColumn({
                            name: "c0",
                            caption: "MD",
                            description: "Má Dáti",
                            width: 140,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("c0", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "c0",
                                caption: "MD"
                            })
                        });
                        gf.addCurrencyColumn({
                            name: "c1",
                            caption: "Dal",
                            width: 140,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("c1", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "c1",
                                caption: "Dal"
                            })
                        });
                        //if (options.globals.Rad_ZobrazMdDal /*&& !$.isEmptyObject(this.pozadavek)*/) //TODO: poresit i pozadavek???
                        gf.addCurrencyColumn({
                            name: "c2",
                            caption: "MD - Dal",
                            width: 140,
                            cellTemplate: (d) => { return Gordic.Eko.Prefabs.cellTemplate("c2", d); },
                            editor: Gordic.Eko.Filters.decimalInterval({
                                model: "c2",
                                caption: "MD - Dal"
                            })
                        });
                        // }
                        gf.addTextColumn({
                            name: "popis",
                            caption: "Popis řádku",
                            width: 200,
                            cellTemplate: (d) => {
                                if (!d.popis)
                                    return "";
                                return ` '${d.popis}'`;
                            },
                            tooltipTemplate: "{popis}",
                            editor: Gordic.Eko.Filters.stringSingle({ model: "popis", caption: "Popis řádku" })
                        });
                        //gf.addTextColumn({
                        //    name: "typ_ag",
                        //    caption: "jres:31100079", //RC 31100079 : Agenda
                        //    width: 120,
                        //    cellTemplate: (v) => { return Gordic.Eko.Filters.singleCellTemplate("typ_ag_txt", v); },
                        //    tooltipTemplate: "{typ_ag_txt}",
                        //    editor: Gordic.Ucr.WebClient.FilterPrefabs.typ_ag({ model: "typ_ag", zkr_agPath: "typ_ag_txt", isRozpocet: options.filterParams.rozOnly, caption: "jres:31100079" }) //RC 31100079 : Agenda
                        //});
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
                                caption: "PID",
                                description: "Prvotní identifikátor primárního dokladu",
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
                        caption: "Název",
                        width: 200,
                        cellTemplate: (d) => {
                            if (!d.nazev)
                                return "";
                            return ` '${d.nazev}'`;
                        },
                        tooltipTemplate: "{nazev}",
                        editor: Gordic.Eko.Filters.stringSingle({ model: "nazev", caption: "Název" })
                    });
                    return gf;
                }
                static createNewElementFunc(ekoParams) {
                    return (view, gridFormat) => {
                        let ico;
                        let ucs;
                        let nks;
                        ico = { start: ekoParams.Ico, end: ekoParams.Ico };
                        return { ico: ico, ucs: ucs, nks: nks, cfu: {} };
                    };
                }
                static createClearElementFunc() {
                    let skipColumns = GElementUtils.getElementValueSkipColumns();
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
                static getElementValueSkipColumns() {
                    let skipColumns = new Array();
                    skipColumns.push("ico");
                    skipColumns.push("nazev");
                    return skipColumns;
                }
            }
            WebClient.GElementUtils = GElementUtils;
        })(WebClient = Ada.WebClient || (Ada.WebClient = {}));
    })(Ada = Gordic.Ada || (Gordic.Ada = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0VsZW1lbnRVdGlscy5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsiU2NyaXB0cy9HRWxlbWVudFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFVLE1BQU0sQ0FrbkJmO0FBbG5CRCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FrbkJuQjtJQWxuQmdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWtuQjdCO1FBbG5Cb0IsV0FBQSxTQUFTO1lBVzFCLE1BQWEsYUFBYTtnQkFDdEIsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE9BQXlCO29CQUNyRCxJQUFJLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUE2QixDQUFDO29CQUNqRSx3Q0FBd0M7b0JBQ3hDLGdDQUFnQztvQkFDaEMsMkJBQTJCO29CQUUzQixzQ0FBc0M7b0JBRXRDLHdDQUF3QztvQkFFeEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUN0QixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBQ3RCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQztvQkFDdEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUN0QixJQUFJLEdBQUcsR0FBdUIsU0FBUyxDQUFDO29CQUV4QyxVQUFVLEdBQUcsS0FBSyxDQUFDO29CQUNuQixVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUNsQixVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUNsQixVQUFVLEdBQUcsSUFBSSxDQUFDO29CQUVsQixFQUFFLENBQUMsYUFBYSxDQUFDO3dCQUNiLElBQUksRUFBRSxLQUFLO3dCQUNYLE9BQU8sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHO3dCQUN0QyxXQUFXLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVk7d0JBQ3hELEtBQUssRUFBRSxFQUFFO3dCQUNULGtCQUFrQjt3QkFDbEIsV0FB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cGFjZSBHb3JkaWMuQWRhLldlYkNsaWVudCB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHRWxlbWVudHNPcHRpb25zIHtcclxuICAgICAgICB0eXBTZXN0YXZ5OiBHQWRhVHlwU2VzdGF2eTtcclxuICAgICAgICBmaWx0ZXJPcHRpb25zOiBHb3JkaWMuQWRhLldlYkNsaWVudC5EdG8uR0ZpbHRlck9wdGlvbnNEdG87XHJcbiAgICAgICAgZ2xvYmFsczogR29yZGljLkFkYS5XZWJDbGllbnQuRFRPLkdBZGFHbG9iYWxzRHRvO1xyXG4gICAgICAgIGZpbHRlclBhcmFtczogR29yZGljLkFkYS5XZWJDbGllbnQuR0ZpbHRlclBhcmFtc0R0bztcclxuICAgICAgICBjZnVTZXQ6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ7XHJcbiAgICAgICAgZWtvUGFyYW1zOiBHb3JkaWMuQWRhLldlYkNsaWVudC5HRWtvUGFyYW1zRHRvO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHRWxlbWVudFV0aWxzIHtcclxuICAgICAgICBzdGF0aWMgY3JlYXRlRWxlbWVudHNHcmlkRm9ybWF0KG9wdGlvbnM6IEdFbGVtZW50c09wdGlvbnMpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HQWRhRmlsdGVyRHRvPiB7XHJcbiAgICAgICAgICAgIHZhciBnZiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0IDxJbnRlcmZhY2UuR0FkYUZpbHRlckR0bz4gKCk7XHJcbiAgICAgICAgICAgIC8vYWRkVG9wRmlsdGVyczogaWNvLCB1Y3MsIHV1cywgdXV1LCBua3NcclxuICAgICAgICAgICAgLy90eXBVbG9oeSB6amlzdGltIHBvZGxlIHNlc3RhdnlcclxuICAgICAgICAgICAgLy9vcHRpb25zLmZpbHRlck9wdGlvbnMubmtzXHJcblxyXG4gICAgICAgICAgICAvL2NvbnN0IHJlcG9ydEluZm8gPSB0aGlzLnJlcG9ydEluZm8hO1xyXG5cclxuICAgICAgICAgICAgLy9USyBHVWNyQXBwbGljYXRpb24uVXBkYXRlVG9wb0ZpbHRlcnMoKVxyXG5cclxuICAgICAgICAgICAgbGV0IGljb0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgdWNzRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGxldCBua3NFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHV1c0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBsZXQgdWNzOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgICAgICBpY29FbmFibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHVjc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB1dXNFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgbmtzRW5hYmxlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiaWNvXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLmljbyxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBHb3JkaWMuQWRhLkdsb2JhbHMuR0FkYUdsb2JhbHMuVGl0dWxla19JY28hLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgLy9ncm91cDogdG9wb0dyb3VwXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogaWNvRW5hYmxlZCA/IHVuZGVmaW5lZCA6IFwidWktZGlzYWJsZWRcIixcclxuICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJpY29cIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6ICFpY29FbmFibGVkID8gdW5kZWZpbmVkIDogR29yZGljLkVrby5GaWx0ZXJzLmljb0ludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpY29cIiwgb25seUFjdGl2ZTogZmFsc2UsIGNhcHRpb246IEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMuaWNvISxcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IGRpc2FibGVkOiAhaWNvRW5hYmxlZCB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZEZpZWxkOiB7IGRpc2FibGVkOiAhaWNvRW5hYmxlZCB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvL3Vjc1xyXG5cclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcInVjc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy51Y3MsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogR29yZGljLkFkYS5HbG9iYWxzLkdBZGFHbG9iYWxzLlRpdHVsZWtfVWNzISxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cCwgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczogdWNzRW5hYmxlZCA/IHVuZGVmaW5lZCA6IFwidWktZGlzYWJsZWRcIixcclxuICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJ1Y3NcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6ICF1Y3NFbmFibGVkID8gdW5kZWZpbmVkIDogR29yZGljLkVrby5GaWx0ZXJzLnVjc0ludGVydmFsKG9wdGlvbnMuZmlsdGVyT3B0aW9ucy51Y3MhKVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vLy9maWx0ZXJQYXJhbXMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQmFsYW5jb3ZhbmlaYXBpc1xyXG4gICAgICAgICAgICAvLy8vTk9URTogVG90byBqZSB2IFRLIHBybyBkYWxzaSB0eXB5IHVsb2hcclxuICAgICAgICAgICAgLy9pZiAob3B0aW9ucy5maWx0ZXJQYXJhbXMudHlwVWxvaHkgIT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuVmljZWxldGVGaW5hbmNvdmFuaVphcGlzXHJcbiAgICAgICAgICAgIC8vICAgICYmIG9wdGlvbnMuZmlsdGVyUGFyYW1zLnR5cFVsb2h5ICE9PSBHb3JkaWMuVWN0LkludGVyZmFjZS5HUHJvaGxpemVuaVVjdFRhc2tUeXBlLkZpbmFuY292YW5pWmFwaXMpXHJcbiAgICAgICAgICAgIC8vICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJ1dXNcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGNhcHRpb246IEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMudXVzLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgZGVzY3JpcHRpb246IEdvcmRpYy5BZGEuR2xvYmFscy5HQWRhR2xvYmFscy5UaXR1bGVrX1V1cyEsXHJcbiAgICAgICAgICAgIC8vICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvL2dyb3VwOiB0b3BvR3JvdXAsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBjdXN0b21DbGFzczogdXVzRW5hYmxlZCA/IHVuZGVmaW5lZCA6IFwidWktZGlzYWJsZWRcIixcclxuICAgICAgICAgICAgLy8gICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJ1dXNcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICBlZGl0b3I6ICF1dXNFbmFibGVkID8gdW5kZWZpbmVkIDogR29yZGljLkVrby5GaWx0ZXJzLnV1c0ludGVydmFsKG9wdGlvbnMuZmlsdGVyT3B0aW9ucy51dXMpXHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm5rc1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogR29yZGljLkNvbnN0cy5EYlNob3J0Y3V0cy5ua3MsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogR29yZGljLkFkYS5HbG9iYWxzLkdBZGFHbG9iYWxzLlRpdHVsZWtfTmtzISxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIC8vZ3JvdXA6IHRvcG9Hcm91cFxyXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IG5rc0VuYWJsZWQgPyB1bmRlZmluZWQgOiBcInVpLWRpc2FibGVkXCIsXHJcbiAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwibmtzXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgZWRpdG9yOiAhbmtzRW5hYmxlZCA/IHVuZGVmaW5lZCA6IEdvcmRpYy5Fa28uRmlsdGVycy5ua3NJbnRlcnZhbChvcHRpb25zLmZpbHRlck9wdGlvbnMubmtzISlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnR5cFNlc3RhdnkgIT09IEdBZGFUeXBTZXN0YXZ5LkZpbmFuY292YW5pKVxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHsgLy9UT0RPOiBkcmQgbmVmdW5ndWplIC0gbmV6b2JyYXp1amUgc2UgbmEgZWxlbWVudG92ZW0gcG9saWNrdVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZHJkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJIIFwiLCBcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEcnVoIGRva2xhZHVcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIGQuZHJkX21zayB8fCBcIlwiOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIGQuZHJkX21zayB8fCBcIlwiOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRyZChvcHRpb25zLmZpbHRlck9wdGlvbnMuZHJkISlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMudHlwU2VzdGF2eSA9PT0gR0FkYVR5cFNlc3RhdnkuWmFwaXNvdmEpIHtcclxuICAgICAgICAgICAgICAgIC8vZGVuLCBtZXNpYywgcm9rXHJcbiAgICAgICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEIFwiLCBcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEZW5cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJkZW5cIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRCBcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RmllbGQ6IHsgbWluVmFsdWU6IDEsIG1heFZhbHVlOiAzMSB9LCBzZWNvbmRGaWVsZDogeyBtaW5WYWx1ZTogMSwgbWF4VmFsdWU6IDMxIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1lc2ljXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJNIFwiLCBcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNxJtzw61jXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA0MCxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwibWVzaWNcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibWVzaWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJNIFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RGaWVsZDogeyBtaW5WYWx1ZTogMSwgbWF4VmFsdWU6IDEzIH0sIHNlY29uZEZpZWxkOiB7IG1pblZhbHVlOiAxLCBtYXhWYWx1ZTogMTMgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSb2tcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDU1LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJyb2tcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUm9rXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IG1pblZhbHVlOiAwLCBtYXhWYWx1ZTogOTk5OSB9LCBzZWNvbmRGaWVsZDogeyBtaW5WYWx1ZTogMCwgbWF4VmFsdWU6IDk5OTkgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vZG9rbGFkXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEb2tsYWRcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE3MCxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwiYWNcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuYWNJbnRlcnZhbChvcHRpb25zLmZpbHRlck9wdGlvbnMuYWMhKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnR5cFNlc3RhdnkgPT09IEdBZGFUeXBTZXN0YXZ5LkZpbmFuY292YW5pKSB7XHJcbiAgICAgICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSb2tcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDU1LFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJyb2tcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuaW50ZWdlckludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwicm9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUm9rXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEZpZWxkOiB7IG1pblZhbHVlOiAwLCBtYXhWYWx1ZTogOTk5OSB9LCBzZWNvbmRGaWVsZDogeyBtaW5WYWx1ZTogMCwgbWF4VmFsdWU6IDk5OTkgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY2Z1U2V0KSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmNmdVNldC5jb2x1bW5zLmZvckVhY2goKGMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjLmVkaXRvciA9IGMuc2VydmVyRmlsdGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGMuY2VsbFRlbXBsYXRlID0gKGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkIHx8ICFkLmNmdSkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuRWtvLkZpbHRlcnMuVXRpbHMuZm9ybWF0SW50ZXJ2YWxWYWx1ZShkLmNmdVtjLm5hbWUhXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGdmLmFkZFNvcnRlZEVrb0NmdVNldChvcHRpb25zLmNmdVNldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy50eXBTZXN0YXZ5ICE9PSBHQWRhVHlwU2VzdGF2eS5GaW5hbmNvdmFuaSlcclxuICAgICAgICAgICAgICAgIGdmLmFkZERhdGVUaW1lQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF96bWVuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGF0dW0gem3Em255XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcImRhdF96bWVuYVwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5kYXRlSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJkYXRfem1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RGaWVsZDogeyB2YWx1ZVR5cGU6IFwiZGF0ZXRpbWVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRGaWVsZDogeyB2YWx1ZVR5cGU6IFwiZGF0ZXRpbWVcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhdHVtIHptxJtueVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnR5cFNlc3RhdnkgPT09IEdBZGFUeXBTZXN0YXZ5LlN0YXZvdmEpIHtcclxuICAgICAgICAgICAgICAgIC8vWmEgb2Jkb2JpXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzYzBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk1PIE1EXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk3Em3PDrcSNbsOtIG9icmF0IE3DoSBEw6F0aVwiLCBcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJzYzBcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic2MwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTU8gTUQ5XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTU8gRGFsXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk3Em3PDrcSNbsOtIG9icmF0IERhbFwiLCBcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJzYzFcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic2MxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTU8gRGFsXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2lmIChvcHRpb25zLmdsb2JhbHMuUmFkX1pvYnJhek1kRGFsKVxyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZERlY2ltYWxDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNjMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIiBNTyBNRCAtIERhbFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiIFJvemTDrWwgxI3DoXN0ZWsgTcSbc8OtxI1uw60gb2JyYXQgTcOhIETDoXRpIG3DrW51cyBNxJtzw63EjW7DrSBvYnJhdCBEYWxcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJzYzJcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJzYzJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiIE1PIE1EIC0gRGFsXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vRG8gZGF0YVxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkRGVjaW1hbENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrYzBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkFTIE1EXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIiBBa3R1w6FsbsOtIHN0YXYgTcOhIETDoXRpXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcImtjMFwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJrYzBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJBUyBNRFwiLCBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkRGVjaW1hbENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrYzFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkFTIERhbFwiLCBcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCIgQWt0dcOhbG7DrSBzdGF2IERhbFwiLCBcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJrYzFcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwia2MxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiQVMgRGFsXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBpZiAob3B0aW9ucy5nbG9iYWxzLlJhZF9ab2JyYXpNZERhbClcclxuICAgICAgICAgICAgICAgICAgICBnZi5hZGREZWNpbWFsQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrYzJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJBUyBNRCAtIERhbFwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcImtjMlwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImtjMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJBUyBNRCAtIERhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMudHlwU2VzdGF2eSA9PT0gR0FkYVR5cFNlc3RhdnkuRmluYW5jb3ZhbmkpIHtcclxuICAgICAgICAgICAgICAgIC8vaWYgKG9wdGlvbnMuZ2xvYmFscy5SZXppbVpvYnJhemVuaVVsb2h5RmluYW5jb3ZhbmkgPT09IEdvcmRpYy5VY3IuV2ViQ2xpZW50LkR0by5HVWNyUmV6aW1ab2JyYXplbmlGaW5hbmNvdmFuaS5GaW5hbmNvdmFuaVNlU3RyZWRuZWRvYnltVnlobGVkZW0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJzYzBcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxODNcIiwgLy9SQyAzMTEwMDE4MyA6IE7DoXZyaCByb3pwb8SNdHVcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJzYzBcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgbW9kZWw6IFwic2MwXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE4M1wiIC8vUkMgMzExMDAxODMgOiBOw6F2cmggcm96cG/EjXR1XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUm96cG/EjWV0IHNjaHbDoWxlbsO9XCIsIFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcInNjMVwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJzYzFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSb3pwb8SNZXQgc2NodsOhbGVuw71cIiBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2MyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTg1XCIsIC8vUkMgMzExMDAxODUgOiBSb3pwb8SNZXQgdXByYXZlbsO9XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwic2MyXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInNjMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxODVcIiAvL1JDIDMxMTAwMTg1IDogUm96cG/EjWV0IHVwcmF2ZW7DvVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrYzBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxODZcIiwgLy9SQyAzMTEwMDE4NiA6IFJvenBvxI1ldCB2w6F6YW7DvVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcImtjMFwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJrYzBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTg2XCIgLy9SQyAzMTEwMDE4NiA6IFJvenBvxI1ldCB2w6F6YW7DvVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrYzFcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxODdcIiwgLy9SQyAzMTEwMDE4NyA6IE1pbW9yb3pwLiB6ZHJvamVcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJrYzFcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwia2MxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE4N1wiIC8vUkMgMzExMDAxODcgOiBNaW1vcm96cC4gemRyb2plXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImtjMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE4OFwiLCAvL1JDIDMxMTAwMTg4IDogQWt0dcOhbG7DrSB6ZHJvamVcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJrYzJcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwia2MyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE4OFwiIC8vUkMgMzExMDAxODggOiBBa3R1w6FsbsOtIHpkcm9qZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE4OVwiLCAvL1JDIDMxMTAwMTg5IDogQmxva292w6FubyBST1pcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjU5XCIsIC8vUkMgMzExMDAyNTkgOiBTb3XEjWV0IHrDoXBpc8WvIERSRCAxMlxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcImMwXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImMwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE4OVwiIC8vUkMgMzExMDAxODkgOiBCbG9rb3bDoW5vIFJPWlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE5MFwiLCAvL1JDIDMxMTAwMTkwIDogTmFzbWxvdXbDoW5vIFJPWlxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNjBcIiwgLy9SQyAzMTEwMDI2MCA6IFNvdcSNZXQgesOhcGlzxa8gRFJEIDEwXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwiYzFcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiYzFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTkwXCIgLy9SQyAzMTEwMDE5MCA6IE5hc21sb3V2w6FubyBST1pcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYzJcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxOTFcIiwgLy9SQyAzMTEwMDE5MSA6IE5hc21sb3V2w6FubyBCTEtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjYxXCIsIC8vUkMgMzExMDAyNjEgOiBTb3XEjWV0IHrDoXBpc8WvIERSRCAxMVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcImMyXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImMyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE5MVwiIC8vUkMgMzExMDAxOTEgOiBOYXNtbG91dsOhbm8gQkxLXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNjM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE5MlwiLCAvL1JDIDMxMTAwMTkyIDogT2JqZWRuw6FubyBST1pcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjYyXCIsIC8vUkMgMzExMDAyNjIgOiBTb3XEjWV0IHrDoXBpc8WvIERSRCAxNVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcInNjM1wiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJzYzNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTkyXCIgLy9SQyAzMTEwMDE5MiA6IE9iamVkbsOhbm8gUk9aXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNjNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE5M1wiLCAvL1JDIDMxMTAwMTkzIDogT2JqZWRuw6FubyBTTUxcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMxMTAwMjYzXCIsIC8vUkMgMzExMDAyNjMgOiBTb3XEjWV0IHrDoXBpc8WvIERSRCAxNlxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcInNjNFwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJzYzRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTkzXCIgIC8vUkMgMzExMDAxOTMgOiBPYmplZG7DoW5vIFNNTFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzYzVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxOTRcIiwgLy9SQyAzMTEwMDE5NCA6IE9iamVkbsOhbm8gQkxLXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI2MVwiLCAvL1JDIDMxMTAwMjYxIDogU291xI1ldCB6w6FwaXPFryBEUkQgMTFcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJzYzVcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic2M1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE5NFwiICAvL1JDIDMxMTAwMTk0IDogT2JqZWRuw6FubyBCTEtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2M2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTk1XCIsIC8vUkMgMzExMDAxOTUgOiBSZXplcnZvdsOhbm8gUk9aXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI2NFwiLCAvL1JDIDMxMTAwMjY0IDogU291xI1ldCB6w6FwaXPFryBEUkQgNlxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcInNjNlwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJzYzZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTk1XCIgIC8vUkMgMzExMDAxOTUgOiBSZXplcnZvdsOhbm8gUk9aXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNjN1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE5NlwiLCAvL1JDIDMxMTAwMTk2IDogUmV6ZXJ2b3bDoW5vIFNNTFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNjVcIiwgLy9SQyAzMTEwMDI2NSA6IFNvdcSNZXQgesOhcGlzxa8gRFJEIDE4XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwic2M3XCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInNjN1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxOTZcIiAvL1JDIDMxMTAwMTk2IDogUmV6ZXJ2b3bDoW5vIFNNTFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzYzhcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxOTdcIiwgLy9SQyAzMTEwMDE5NyA6IERpc3BvbmliaWxuw60gemRyb2plXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwic2M4XCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInNjOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxOTdcIiAvL1JDIDMxMTAwMTk3IDogRGlzcG9uaWJpbG7DrSB6ZHJvamVcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2M5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTk4XCIsIC8vUkMgMzExMDAxOTggOiDEjGVycMOhbm9cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJzYzlcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwic2M5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTEwMDE5OFwiIC8vUkMgMzExMDAxOTggOiDEjGVycMOhbm9cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9ucy50eXBTZXN0YXZ5ID09PSBHQWRhVHlwU2VzdGF2eS5aYXBpc292YSkge1xyXG4gICAgICAgICAgICAgICAgLy9pZiAob3B0aW9ucy5maWx0ZXJQYXJhbXMudHlwVWxvaHkgPT09IEdvcmRpYy5VY3QuSW50ZXJmYWNlLkdQcm9obGl6ZW5pVWN0VGFza1R5cGUuQmFsYW5jb3ZhbmlaYXBpcykge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwiYzBcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAxOTlcIiwgLy9SQyAzMTEwMDE5OSA6IE1EIG5vdsO9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwiYzBcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuZGVjaW1hbEludGVydmFsKHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgbW9kZWw6IFwiYzBcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTk5XCIgLy9SQyAzMTEwMDE5OSA6IE1EIG5vdsO9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcImMxXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMjAwXCIsIC8vUkMgMzExMDAyMDAgOiBEYWwgbm92w71cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJjMVwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBtb2RlbDogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzExMDAyMDBcIiAvL1JDIDMxMTAwMjAwIDogRGFsIG5vdsO9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAvL2Vsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk1EXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJNw6EgRMOhdGlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZCkgPT4geyByZXR1cm4gR29yZGljLkVrby5QcmVmYWJzLmNlbGxUZW1wbGF0ZShcImMwXCIsIGQpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5kZWNpbWFsSW50ZXJ2YWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiYzBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTURcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkQ3VycmVuY3lDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGFsXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTQwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwiYzFcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJjMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEYWxcIiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAob3B0aW9ucy5nbG9iYWxzLlJhZF9ab2JyYXpNZERhbCAvKiYmICEkLmlzRW1wdHlPYmplY3QodGhpcy5wb3phZGF2ZWspKi8pIC8vVE9ETzogcG9yZXNpdCBpIHBvemFkYXZlaz8/P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZi5hZGRDdXJyZW5jeUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImMyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk1EIC0gRGFsXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJjMlwiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmRlY2ltYWxJbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwiYzJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk1EIC0gRGFsXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb3BpcyDFmcOhZGt1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWQucG9waXMpIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCAnJHtkLnBvcGlzfSdgO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdG9vbHRpcFRlbXBsYXRlOiBcIntwb3Bpc31cIixcclxuICAgICAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdTaW5nbGUoeyBtb2RlbDogXCJwb3Bpc1wiLCBjYXB0aW9uOiBcIlBvcGlzIMWZw6Fka3VcIiB9KSBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcInR5cF9hZ1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc5XCIsIC8vUkMgMzExMDAwNzkgOiBBZ2VuZGFcclxuICAgICAgICAgICAgICAgIC8vICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjZWxsVGVtcGxhdGU6ICh2KSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLkZpbHRlcnMuc2luZ2xlQ2VsbFRlbXBsYXRlKFwidHlwX2FnX3R4dFwiLCB2KTsgfSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHRvb2x0aXBUZW1wbGF0ZTogXCJ7dHlwX2FnX3R4dH1cIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGVkaXRvcjogR29yZGljLlVjci5XZWJDbGllbnQuRmlsdGVyUHJlZmFicy50eXBfYWcoeyBtb2RlbDogXCJ0eXBfYWdcIiwgemtyX2FnUGF0aDogXCJ0eXBfYWdfdHh0XCIsIGlzUm96cG9jZXQ6IG9wdGlvbnMuZmlsdGVyUGFyYW1zLnJvek9ubHksIGNhcHRpb246IFwianJlczozMTEwMDA3OVwiIH0pIC8vUkMgMzExMDAwNzkgOiBBZ2VuZGFcclxuICAgICAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZmlsdGVyUGFyYW1zLnJvek9ubHkpXHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwX3ByaW1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc2XCIsICAvL1JDIDMxMTAwMDc2IDogUElEIHByaW3DoXJuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiBcIntpeHBfcHJpbX1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nU2luZ2xlKHsgbW9kZWw6IFwiaXhwX3ByaW1cIiwgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDc2XCIgfSkgLy9SQyAzMTEwMDA3NiA6IFBJRCBwcmltw6FybsOtXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUElEXCIsIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQcnZvdG7DrSBpZGVudGlmaWvDoXRvciBwcmltw6FybsOtaG8gZG9rbGFkdVwiLCAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uRmlsdGVycy5peHBDZWxsVGVtbGF0ZShcImpyZXM6MzExMDAwNzVcIiwgZC5peHApOyB9LCAvL1JDIDMxMTAwMDc1IDogUElEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLml4cCh7IG1vZGVsOiBcIml4cFwiLCBjYXB0aW9uOiBcImpyZXM6MzExMDAwNzVcIiB9KSAvL1JDIDMxMTAwMDc1IDogUElEXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZmlsdGVyUGFyYW1zLnByaXpJaXNzcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImlkX2hkcl9yaXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMDgyXCIsICAvL1JDIDMxMTAwMDgyIDogSUQgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMTEwMDI1NVwiLCAvL1JDIDMxMTAwMjU1IDogSWRlbnRpZmlrw6F0b3IgcmV6ZXJ2YWNlIHJvenBvxI10b3bDvWNoIHByb3N0xZllZGvFryBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7IHJldHVybiBHb3JkaWMuRWtvLlByZWZhYnMuY2VsbFRlbXBsYXRlKFwiaWRfaGRyX3Jpc1wiLCBkKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yOiBHb3JkaWMuRWtvLkZpbHRlcnMuc3RyaW5nSW50ZXJ2YWwoeyBtb2RlbDogXCJpZF9oZHJfcmlzXCIsIGZpcnN0RmllbGQ6IHsgYWxsb3dlZENoYXJzOiBcIjAxMjM0NTY3ODlcIiB9LCBzZWNvbmRGaWVsZDogeyBhbGxvd2VkQ2hhcnM6IFwiMDEyMzQ1Njc4OVwiIH0gfSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyYWRla19oZHJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMTAwMTMyXCIsIC8vUkMgMzExMDAxMzIgOiDFmMOhZGVrIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzExMDAyNTZcIiwgLy9SQyAzMTEwMDI1NiA6IMWYw6FkZWsgcmV6ZXJ2YWNlIHJvenBvxI10b3bDvWNoIHByb3N0xZllZGvFryBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKGQpID0+IHsgcmV0dXJuIEdvcmRpYy5Fa28uUHJlZmFicy5jZWxsVGVtcGxhdGUoXCJyYWRla19oZHJcIiwgZCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvcjogR29yZGljLkVrby5GaWx0ZXJzLmludGVnZXJJbnRlcnZhbCh7IG1vZGVsOiBcInJhZGVrX2hkclwiLCBmaXJzdEZpZWxkOiB7IG1pblZhbHVlOiAwLCBtYXhWYWx1ZTogOTk5IH0sIHNlY29uZEZpZWxkOiB7IG1pblZhbHVlOiAwLCBtYXhWYWx1ZTogOTk5IH0gfSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk7DoXpldlwiLCBcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkLm5hemV2KSByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCAnJHtkLm5hemV2fSdgO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRvb2x0aXBUZW1wbGF0ZTogXCJ7bmF6ZXZ9XCIsXHJcbiAgICAgICAgICAgICAgICBlZGl0b3I6IEdvcmRpYy5Fa28uRmlsdGVycy5zdHJpbmdTaW5nbGUoeyBtb2RlbDogXCJuYXpldlwiLCBjYXB0aW9uOiBcIk7DoXpldlwiIH0pIFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBnZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBjcmVhdGVOZXdFbGVtZW50RnVuYyggZWtvUGFyYW1zOiBHRWtvUGFyYW1zRHRvKTogR29yZGljLkVrby5QcmVmYWJzLkNyZWF0ZUVsZW1lbnRSZWNvcmQ8R29yZGljLkVrby5QcmVmYWJzLklHQ2Z1RHRvPiB7XHJcbiAgICAgICAgICAgIHJldHVybiAodmlldywgZ3JpZEZvcm1hdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGljbzogR0ludGVydmFsRHRvPHN0cmluZz4gfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgdWNzOiBHSW50ZXJ2YWxEdG88c3RyaW5nPiB8IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGxldCBua3M6IEdJbnRlcnZhbER0bzxzdHJpbmc+IHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgICAgIGljbyA9IHsgc3RhcnQ6IGVrb1BhcmFtcy5JY28hLCBlbmQ6IGVrb1BhcmFtcy5JY28hIH07XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgaWNvOiBpY28sIHVjczogdWNzLCBua3M6IG5rcywgY2Z1OiB7fSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgY3JlYXRlQ2xlYXJFbGVtZW50RnVuYygpOiBHb3JkaWMuRWtvLlByZWZhYnMuQ2xlYXJFbGVtZW50UmVjb3JkPEdvcmRpYy5Fa28uUHJlZmFicy5JR0NmdUR0bz4ge1xyXG4gICAgICAgICAgICBsZXQgc2tpcENvbHVtbnMgPSBHRWxlbWVudFV0aWxzLmdldEVsZW1lbnRWYWx1ZVNraXBDb2x1bW5zKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKGR0bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgZHRvLmNmdSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcCBpbiBkdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZWxtLiBwcm9wIFwiLCBwLCBkdG9bcF0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL2tsaWNlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHAgPT09IFwiaXhzX21za1wiKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocCA9PT0gXCJyYWRla1wiKSBjb250aW51ZTsgLy9OT1RFOiBKZSB0byBqZWRlbiB6IGtsaWN1XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwID09PSBcImNmdVwiKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2tpcENvbHVtbnMuaW5kZXhPZihwKSA+IC0xKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZHRvW3BdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFpqaXN0aSwga3RlcmUgc2xvdXBjZSBncmlkRm9ybWF0dSBuZW1hamkgYnl0IHZpZGl0ZWxuZSBuYSB6YXN0dXBuZSBob2Rub3RlIGVsZW1lbnRvdmVobyBwb2xpY2thICovXHJcbiAgICAgICAgc3RhdGljIGdldEVsZW1lbnRWYWx1ZVNraXBDb2x1bW5zKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICAgICAgbGV0IHNraXBDb2x1bW5zID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICAgICAgICAgIHNraXBDb2x1bW5zLnB1c2goXCJpY29cIilcclxuXHJcbiAgICAgICAgICAgIHNraXBDb2x1bW5zLnB1c2goXCJuYXpldlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNraXBDb2x1bW5zO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==