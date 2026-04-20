//(function ($) {
//    "use strict";
//    namespace("Gordic.Ssl.Prefabs", {

//        FilterDleStavu: function (options) {
//            var defaults = {
//                name: "filterStavDoc",
//                label: "jres:26257005", //RC 26257005 : Filtr
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota
//                nameSpZn: "spZnField",
//                labelSpZn: "Sp. zn.",
//                modelSpZn: "SpZnFilter",
//                //  value: "300",
//               // disabled: false,
//                //  akce: ((typeof options === "string") ? options : null),
//                FiltrCjVisible: true,
//                FiltrVcetneOdeslanychVisible: true,
//                FiltrElektronickeVisible: false,
//                FiltrZnackaVisible: true,
//                FiltrIDokumentyVeSpisech: false,
//                FiltrDokumentyMimoSpis: false,
//                FiltrDokumentyVeSpisu: false,
//                lastSelectedValue: [],
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            if(settings.FiltrCjVisible) {
//                data.push({ nazev: "jres:26256757", id: 1 }); //RC 26256757 : Pouze s ČJ
//                data.push({ nazev: "jres:26256758", id: 2 }); //RC 26256758 : I vyřizující
//                data.push({ nazev: "jres:26256759", id: 3 }); //RC 26256759 : Jenom vyřizující
//            }

//            if(settings.FiltrVcetneOdeslanychVisible) {
//                data.push({ nazev: "jres:26256760", id: 4/*, disabled: true*/ }); //RC 26256760 : Včetně odeslaných
//            }

//            if(settings.FiltrElektronickeVisible) {
//                data.push({ nazev: "jres:26256761", id: 5 }); //RC 26256761 : Jen elektronické
//            }

//            if(settings.FiltrIDokumentyVeSpisech) {
//                data.push({ nazev: "jres:26256956", id: 6 }); //RC 26256956 : I dokumenty ve spisech
//            }

//            if(settings.FiltrDokumentyMimoSpis) {
//                data.push({ nazev: "jres:26257088", id: 7 }); //RC 26257088 : Dokumenty mimo spis
//            }

//            if(settings.FiltrDokumentyVeSpisu) {
//                data.push({ nazev: "jres:26257087", id: 8 }); //RC 26257087 : Dokumenty ve spisu
//            }

//            var sectionZobrazitVisible = settings.FiltrCjVisible || settings.FiltrVcetneOdeslanychVisible || settings.FiltrElektronickeVisible || settings.FiltrIDokumentyVeSpisech || settings.FiltrDokumentyMimoSpis || settings.FiltrDokumentyVeSpisu;// pokud nebude videt ani jedna volba, schovam cele vyberove pole

//            var filterDleStavuPom = new Gordic.Forms.Form().addSection();

//            if(sectionZobrazitVisible) {
//                filterDleStavuPom.addRow(settings.label).addField("gselectbox", {
//                        name: settings.name,
//                        multi: true,
//                        initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
//                        list: true,
//                        //verticalButtons: true,
//                        itemTemplate: "{nazev}",
//                        itemWidth: "",
//                        //helperColumns: ["nazev"],
//                        itemClass: function (value) {
//                            if(value.disabled) {
//                                return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
//                            }
//                        },
//                        data: new Gordic.Data.View(data, { key: "id" }),
//                        model: settings.model,
//                        modelValueTransform: {
//                            "apply": function (modelValue) {

//                                function najdiVDatechPolicka(modelValue) {
//                                    function checkValue(arrayItem) {
//                                        function checkInnerValue(modelValueItem) {
//                                            return modelValueItem.id == arrayItem.id;
//                                        }

//                                        if(modelValue.find(checkInnerValue)) {
//                                            return true;
//                                        }

//                                        return false;
//                                    }

//                                    if(data.find(checkValue)) {
//                                        return true;
//                                    }

//                                    return false;
//                                }

//                                var nalezeno = false;

//                                if(modelValue && typeof modelValue === "object") {
//                                    nalezeno = najdiVDatechPolicka(modelValue);
//                                }

//                                if(nalezeno) {
//                                    return modelValue;
//                                } else {
//                                    return null;
//                                }

//                            },
//                        },
//                        change: function (ev, selected) {
//                            var selectedArray = selected.value;
//                            var selectedArrayOld = $(this).gfield("option", "lastSelectedValue");

//                            if (selectedArrayOld != null) {
//                                var field = $(this);

//                                var selectedInDataDleId = function (data, idNum) {
//                                    var rv = false;

//                                    if(data != null) {
//                                        data.forEach(function (entry) {
//                                            if(entry.id === idNum) {
//                                                rv = true;
//                                            }
//                                        });
//                                    }

//                                    return rv;
//                                }

//                                var unselectInDataDleId = function (data, idNumArray) {
//                                    var entriesForDelete = [];

//                                    data.forEach(function (entry) {
//                                        if(idNumArray.indexOf(entry.id) !== -1) {
//                                            entriesForDelete.push(entry);
//                                        }
//                                    });

//                                    if(entriesForDelete.length > 0) {
//                                        // odstranim/odfiltruji drive oznacene konfliktni volby
//                                        entriesForDelete.forEach(function (entry) {

//                                            data = data.filter(function (el) {
//                                                return el.id !== entry.id;
//                                            });
//                                        });

//                                       // field.gfield("setValue", data, false);
//                                        field.gfield("setValue", data, { triggerChange: false });
//                                    }

//                                    return data;
//                                }

//                                // pokud je vybran v aktualnich datech a neni vybran ve starych datech, provedu odznaceni konfliktni volby
//                                if(selectedInDataDleId(selectedArray, 2) && !selectedInDataDleId(selectedArrayOld, 2)) { // zaskrtnuta volba I vyřizující
//                                    selectedArray = unselectInDataDleId(selectedArray, [3]);
//                                }
//                                if(selectedInDataDleId(selectedArray, 3) && !selectedInDataDleId(selectedArrayOld, 3)) { // zaskrtnuta volba Jenom vyřizující
//                                    selectedArray = unselectInDataDleId(selectedArray, [1, 2]);
//                                }
//                            }

   

//                            $(this).gfield("option", { lastSelectedValue: selectedArray.slice() });
//                        },
//                });
//            }

//            if(settings.FiltrZnackaVisible) {
//                filterDleStavuPom.addRow(settings.labelSpZn).addField("gstringbox", "w-L-2 w-M-6 w-S-12", { name: settings.nameSpZn, model: settings.modelSpZn });
//            }

//            return filterDleStavuPom.getLastSection();
//        },

//        FilterDleNeaktivnichStavu: function (options) {
//            var defaults = {
//                name: "filterNeaktivniStavyDoc",
//                label: "jres:26257001", //RC 26257001 : Zobrazit
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota
//                multi: false,
//                initialValue: { id: 1 },
//                FiltrStornovaneVisible: true,
//                FiltrZtraceneVisible: true,
//                FiltrPreruseneVisible: false,
//                FiltrOdeslaneVisible: true,
//                FiltrPriorovaneVisible: false,
//                FiltrUlozeneVisible: false,
//                FiltrArchivovaneVisible: false,
//                FiltrSkartovaneVisible: false,
//                FiltrPreevidovaneVisible: false,
//                ginN23VeddPar: 0,
//                lastSelectedValue: [],
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            var seznamNeaktivnichEnum = Gordic.Ssl.Globals.Enums.SeznamNeaktivnich;

//            if (settings.FiltrStornovaneVisible) {
//                var znepristupneneText = "jres:26256139"; //RC 26256139 : Stornované

//                if(settings.ginN23VeddPar != 0) {
//                    znepristupneneText = "jres:26257368"; //RC 26257368 : Znepřístupněné (stornované)
//                }

//                data.push({ nazev: znepristupneneText, id: seznamNeaktivnichEnum.STORNOVANE }); //RC 26256139 : Stornované
//            }
//            if(settings.FiltrZtraceneVisible) {
//                data.push({ nazev: "jres:26256140", id: seznamNeaktivnichEnum.ZTRACENE /*, disabled: true*/ }); //RC 26256140 : Ztracené
//            }
//            if(settings.FiltrPreruseneVisible) {
//                data.push({ nazev: "jres:26256141", id: seznamNeaktivnichEnum.PRERUSENE }); //RC 26256141 : Přerušené
//            }
//            if(settings.FiltrOdeslaneVisible) {
//                data.push({ nazev: "jres:26256142", id: seznamNeaktivnichEnum.ODESLANE }); //RC 26256142 : Odeslané
//            }
//            if(settings.FiltrPriorovaneVisible) {
//                data.push({ nazev: "jres:26256946", id: seznamNeaktivnichEnum.PRIOROVANE }); //RC 26256946 : Přesunuté do spisu
//            }
//            if (settings.FiltrPreevidovaneVisible) {
//                data.push({ nazev: "jres:26257216", id: seznamNeaktivnichEnum.PREEVIDOVANE }); //RC 26257216 : Přeevidované
//            }
//            if (settings.FiltrUlozeneVisible) {
//                data.push({ nazev: "jres:26256867", id: seznamNeaktivnichEnum.ULOZENE }); //RC 26256867 : Uložené
//            }
//            if (settings.FiltrArchivovaneVisible) {
//                data.push({ nazev: "jres:26257042", id: seznamNeaktivnichEnum.ARCHIVOVANE }); //RC 26257042 : Archivované
//            }
//            if (settings.FiltrSkartovaneVisible) {
//                data.push({ nazev: "jres:26257043", id: seznamNeaktivnichEnum.SKARTOVANE }); //RC 26257043 : Skartované
//            }

//            var sectionZobrazitVisible = settings.FiltrStornovaneVisible || settings.FiltrZtraceneVisible || settings.FiltrPreruseneVisible || settings.FiltrOdeslaneVisible || settings.FiltrPriorovaneVisible || settings.FiltrUlozeneVisible || settings.FiltrArchivovaneVisible || settings.FiltrSkartovaneVisible;// pokud nebude videt ani jedna volba, schovam cele vyberove pole
//            var filterDleStavuPom = new Gordic.Forms.Form().addSection();
//            if(sectionZobrazitVisible) {
//                filterDleStavuPom.addRow(settings.label).addField("gselectbox", {
//                    name: settings.name,
//                    multi: settings.multi,
//                    list: true,
//                    //verticalButtons: true,
//                    itemTemplate: "{nazev}",
//                    itemWidth: "",
//                    //helperColumns: ["nazev"],
//                    itemClass: function (value) {
//                        if (value.disabled) {
//                            return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
//                        }
//                    },
//                    data: new Gordic.Data.View(data, { key: "id" }),
//                    initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
//                    model: settings.model,
//                    //change: function (ev, selected) {
//                    //    settings.onChange(ev, selected);
//                    //},
//                });
//            }

//            return filterDleStavuPom.getLastSection();
//        },

//        FilterStavuProPracovniStul: function (options) {
//            var defaults = {
//                name: "filterStavuProPracovniStul",
//                label: "jres:26255267", //RC 26255267 : Zobrazit
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota
//                multi: false,
//                initialValue: { id: 1 },
//                FiltrVRedistribuciVisible: true,
//                FiltrVeSpisuVisible: true,
//                lastSelectedValue: [],
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            var stavProPracovniStulEnum = Gordic.Ssl.Globals.Enums.StavProPracovniStul;

//            if(settings.FiltrVRedistribuciVisible) {
//                data.push({ nazev: "jres:26257044", id: stavProPracovniStulEnum.V_REDISTRIBUCI }); //RC 26257044 : V redistribuci
//            }
//            if(settings.FiltrVeSpisuVisible) {
//                data.push({ nazev: "jres:26257045", id: stavProPracovniStulEnum.VE_SPISU }); //RC 26257045 : Ve spisu
//            }

//            var sectionZobrazitVisible = settings.FiltrVRedistribuciVisible || settings.FiltrVeSpisuVisible;// pokud nebude videt ani jedna volba, schovam cele vyberove pole
//            var filterDleStavuPom = new Gordic.Forms.Form().addSection();
//            if (sectionZobrazitVisible) {
//                filterDleStavuPom.addRow(settings.label).addField("gselectbox", {
//                    name: settings.name,
//                    multi: settings.multi,
//                    list: true,
//                    //verticalButtons: true,
//                    itemTemplate: "{nazev}",
//                    itemWidth: "",
//                    //helperColumns: ["nazev"],
//                    itemClass: function (value) {
//                        if (value.disabled) {
//                            return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
//                        }
//                    },
//                    data: new Gordic.Data.View(data, { key: "id" }),
//                    initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
//                    model: settings.model,
//                    //change: function (ev, selected) {
//                    //    settings.onChange(ev, selected);
//                    //},
//                });
//            }

//            return filterDleStavuPom.getLastSection();
//        },

//        FilterStavuProVlastnostiDleUrovne: function (options) {
//            var defaults = {
//                name: "filterStavuProVlastnostiDleUrovne",
//                label: "jres:26255267", //RC 26255267 : Zobrazit
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota
//                multi: true,
//                initialValue: [],
//                FiltrVyrizeneUzavreneVisible: true,
//                FiltrStornovaneVisible: true,
//                FiltrJenSpisyVisible: true,
//                lastSelectedValue: [],
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            var stavProVlastnostiDleUrovneEnum = Gordic.Ssl.Globals.Enums.StavProVlastnostiDleUrovne;

//            if(settings.FiltrVyrizeneUzavreneVisible) {
//                data.push({ nazev: "jres:26257048", id: stavProVlastnostiDleUrovneEnum.VYRIZENE_UZAVRENE }); //RC 26257048 : I vyřízené/uzavřené
//            }
//            if(settings.FiltrStornovaneVisible) {
//                data.push({ nazev: "jres:26257049", id: stavProVlastnostiDleUrovneEnum.STORNOVANE }); //RC 26257049 : I stornované
//            }
//            if(settings.FiltrJenSpisyVisible) {
//                data.push({ nazev: "jres:26257047", id: stavProVlastnostiDleUrovneEnum.JEN_SPISY }); //RC 26257047 : Jen spisy
//            }

//            var sectionZobrazitVisible = settings.FiltrVyrizeneUzavreneVisible || settings.FiltrStornovaneVisible || settings.FiltrJenSpisyVisible;// pokud nebude videt ani jedna volba, schovam cele vyberove pole
//            var filterDleStavuPom = new Gordic.Forms.Form().addSection();
//            if (sectionZobrazitVisible) {
//                filterDleStavuPom.addRow(settings.label).addField("gselectbox", {
//                    name: settings.name,
//                    multi: settings.multi,
//                    list: true,
//                    //verticalButtons: true,
//                    itemTemplate: "{nazev}",
//                    itemWidth: "",
//                    //helperColumns: ["nazev"],
//                    itemClass: function (value) {
//                        if (value.disabled) {
//                            return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
//                        }
//                    },
//                    data: new Gordic.Data.View(data, { key: "id" }),
//                    initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
//                    model: settings.model,
//                    //change: function (ev, selected) {
//                    //    settings.onChange(ev, selected);
//                    //},
//                });
//            }

//            return filterDleStavuPom.getLastSection();
//        },

//        FilterTypRedistribucnihoSubjektu: function (options) {
//            var defaults = {
//                name: "filterRedistribucniSubjekt",
//                label: "jres:26255267", //RC 26255267 : Zobrazit
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota
//                FiltrUzelVisible: true,
//                FiltrFunkceVisible: true,
//               // initialValue: null,
//                lastSelectedValue: [],
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            var typRedistribucniSubjektEnum = Gordic.Ssl.Globals.Enums.TypRedistribucniSubjekt;

//            if(settings.FiltrUzelVisible) {
//                data.push({ nazev: "jres:26256704", id: typRedistribucniSubjektEnum.UZEL }); //RC 26256704 : Uzel
//            }
//            if(settings.FiltrFunkceVisible) {
//                data.push({ nazev: "jres:26255437", id: typRedistribucniSubjektEnum.FUNKCE /*, disabled: true*/ }); //RC 26255437 : Funkce
//            }

//            var sectionZobrazitVisible = settings.FiltrUzelVisible || settings.FiltrFunkceVisible;// pokud nebude videt ani jedna volba, schovam cele vyberove pole

//            var filterRediSubjektPom = new Gordic.Forms.Form().addSection();

//            if(sectionZobrazitVisible) {
//                filterRediSubjektPom.addRow(settings.label).addField("gselectbox", {
//                    name: settings.name,
//                    // multi: true,
//                    list: true,
//                    //verticalButtons: true,
//                    itemTemplate: "{nazev}",
//                    itemWidth: "",
//                    //helperColumns: ["nazev"],
//                    itemClass: function (value) {
//                        if (value.disabled) {
//                            return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
//                        }
//                    },
//                    data: new Gordic.Data.View(data, { key: "id" }),
//                    initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
//                    model: settings.model,
//                    /* change: function (ev, selected) {

//                     },*/
//                });
//            }

//            return filterRediSubjektPom.getLastSection();
//        },

//        FilterTypRedistribucniPrevzeti: function (options) {
//            var defaults = {
//                name: "filterRedistribucniPrevzeti",
//                label: "jres:26256873", //RC 26256873 : Převzato
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota
//                FiltrFyzickyVisible: true,
//                FiltrCileneVisible: true,
//                initialValue: { id: 1 },
//                lastSelectedValue: [],
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            var typRedistribucniPrevzetiEnum = Gordic.Ssl.Globals.Enums.TypRedistribucniPrevzeti;

//            if(settings.FiltrFyzickyVisible) {
//                data.push({ nazev: "jres:26256874", id: typRedistribucniPrevzetiEnum.FYZICKY }); //RC 26256874 : Fyzicky
//            }
//            if(settings.FiltrCileneVisible) {
//                data.push({ nazev: "jres:26256875", id: typRedistribucniPrevzetiEnum.CILENE /*, disabled: true*/ }); //RC 26256875 : Cíleně
//            }

//            var sectionZobrazitVisible = settings.FiltrFyzickyVisible || settings.FiltrCileneVisible;// pokud nebude videt ani jedna volba, schovam cele vyberove pole

//            var filterRediPrevzetiPom = new Gordic.Forms.Form().addSection();

//            if (sectionZobrazitVisible) {
//                filterRediPrevzetiPom.addRow(settings.label).addField("gselectbox", {
//                    name: settings.name,
//                    multi: false,
//                    list: true,
//                    //verticalButtons: true,
//                    itemTemplate: "{nazev}",
//                    itemWidth: "",
//                    //helperColumns: ["nazev"],
//                    itemClass: function (value) {
//                        if (value.disabled) {
//                            return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
//                        }
//                    },
//                    data: new Gordic.Data.View(data, { key: "id" }),
//                    initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
//                    model: settings.model,
//                    /* change: function (ev, selected) {

//                     },*/
//                });
//            }

//            return filterRediPrevzetiPom.getLastSection();
//        },

//        FilterRedistribuceVariant: function (options) {
//            var defaults = {
//                name: "filterRedistribuceVariant",
//                label: "jres:26255267", //RC 26255267 : Zobrazit
//                initialValue: [],
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota
//                FiltrNaCesteVisible: true,
//                lastSelectedValue: [],
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            var typRedistribuceVariantEnum = Gordic.Ssl.Globals.Enums.TypRedistribuceVariant;

//            if(settings.FiltrNaCesteVisible) {
//                data.push({ nazev: "jres:26255708", id: typRedistribuceVariantEnum.NA_CESTE }); //RC 26255708 : I dokumenty/spisy na cestě
//            }

//            var sectionZobrazitVisible = settings.FiltrNaCesteVisible;// pokud nebude videt ani jedna volba, schovam cele vyberove pole

//            var filterPom = new Gordic.Forms.Form().addSection();

//            if (sectionZobrazitVisible) {
//                filterPom.addRow(settings.label).addField("gselectbox", {
//                    name: settings.name,
//                    multi: true,
//                    list: true,
//                    initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
//                    //verticalButtons: true,
//                    itemTemplate: "{nazev}",
//                    itemWidth: "",
//                    //helperColumns: ["nazev"],
//                    itemClass: function (value) {
//                        if (value.disabled) {
//                            return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
//                        }
//                    },
//                    data: new Gordic.Data.View(data, { key: "id" }),
//                    model: settings.model,
//                    change: function (ev, selected) {

//                    },
//                });
//            }

//            return filterPom.getLastSection();
//        },

//        FilterSpisuDeniku: function (options) {
//            var defaults = {
//                name: "filterSpisuDeniku",
//                label: "jres:26255267", //RC 26255267 : Zobrazit
//                //initialValue: { id: 0 },
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota
//                FiltrDenikSuVisible: true,
//                lastSelectedValue: [],
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            var typFiltruSpisuDenikuEnum = Gordic.Ssl.Globals.Enums.TypFiltruSpisuDeniku;

//            // 15.05.2024 - TFeik
//            // Upravena hodnota filtru a přidán tooltip.
//            data.push(
//                {
//                    nazev: "jres:32170289", //RC 32170289 : Prošlé přes SU
//                    id: typFiltruSpisuDenikuEnum.VSECHNY,
//                    tooltip: 'jres:32170290' //RC 32170290 : Všechny spisy podané spisovým uzlem a prošlé přes spisový uzel.
//                },
//                {
//                    nazev: "jres:26255734", //RC 26255734 : Podané uzlem
//                    id: typFiltruSpisuDenikuEnum.PODANE_UZLEM,
//                    tooltip: 'jres:32170291' //RC 32170291 : Spisy podané spisovým uzlem.
//                }
//            );

//            if (settings.FiltrDenikSuVisible) {
//                data.push({ nazev: "jres:26255736", id: typFiltruSpisuDenikuEnum.DENIK_SU /*, disabled: true*/ }); //RC 26255736 : Deník SU
//            }

//            var filterSpisuDenikuPom = new Gordic.Forms.Form().addSection();

//            filterSpisuDenikuPom.addRow(settings.label).addField("gselectbox", {
//                name: settings.name,
//                // multi: true,
//                list: true,
//                //verticalButtons: true,
//                itemCreated: function (event, div, value, index, btnAdd) {
//                    $(div).gtooltip({
//                        tooltip: value.tooltip ?? value.nazev
//                    });
//                },
//                itemTemplate: "{nazev}",
//                itemWidth: "",
//                //helperColumns: ["nazev"],
//                itemClass: function (value) {
//                    if (value.disabled) {
//                        return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
//                    }
//                },
//                data: new Gordic.Data.View(data, { key: "id" }),
//                initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
//                model: settings.model,
//                /* change: function (ev, selected) {

//                    },*/
//            });

//            return filterSpisuDenikuPom.getLastSection().rows;
//           // return filterSpisuDenikuPom.getLastSection();
//        },

//        FilterTypEvidenceDokumentu: function (options) {
//            var defaults = {
//                name: "filterTypEvidenceDokumentu",
//                label: "jres:26255964", //RC 26255964 : Evidovat jako
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota
//                // initialValue: null,
//                lastSelectedValue: [],
//                FiltrCiziVisible: true,
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            var typEvidenceDokumentuEnum = Gordic.Ssl.Globals.Enums.TypEvidenceDokumentu;

//            data.push({ nazev: "jres:26255345", id: typEvidenceDokumentuEnum.VLASTNI }); //RC 26255345 : Vlastní

//            if(settings.FiltrCiziVisible) {
//                data.push({ nazev: "jres:26255889", id: typEvidenceDokumentuEnum.CIZI, /*disabled: true*/ }); //RC 26255889 : Cizí
//            }

//            var filterEvidencePom = new Gordic.Forms.Form().addSection();

//            filterEvidencePom.addRow(settings.label).addField("gselectbox", {
//                name: settings.name,
//                // multi: true,
//                list: true,
//                //verticalButtons: true,
//                itemTemplate: "{nazev}",
//                itemWidth: "",
//                //helperColumns: ["nazev"],
//                itemClass: function (value) {
//                    if (value.disabled) {
//                        return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
//                    }
//                },
//                data: new Gordic.Data.View(data, { key: "id" }),
//                initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
//                model: settings.model,
//                /* change: function (ev, selected) {

//                    },*/
//            });

//            return filterEvidencePom.getLastSection().rows;
//        },

//        FilterPuvodDokumentu: function (options) {
//            var defaults = {
//                name: "filterPuvodDokumentu",
//                label: "jres:26255267", //RC 26255267 : Zobrazit
//                initialValue: [],
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota
//                FiltrVlastniVisible: true,
//                FiltrDorucenyVisible: true,
//                FiltrAgendovyVisible: true,
//                lastSelectedValue: [],
//            }
//            var settings = $.extend({}, defaults, options);

//            var sslFiltrDokPar = $.content("main").wflDBParams.ssl_filtr_dok;
//            if(sslFiltrDokPar != 0) { // ma smysl pouze v pripade, ze se AL vraci vsechny dokumenty (AL filtruje podle nastaveni tohoto parametru)
//                settings.FiltrAgendovyVisible = false;
//            }

//            var data = [];

//            var typPuvodDokumentuEnum = Gordic.Ssl.Globals.Enums.PuvodDokumentu;

//            if(settings.FiltrVlastniVisible) {
//                data.push({ nazev: "jres:26255345", id: typPuvodDokumentuEnum.VLASTNI }); //RC 26255345 : Vlastní
//            }
//            if(settings.FiltrDorucenyVisible) {
//                data.push({ nazev: "jres:26256869", id: typPuvodDokumentuEnum.DORUCENY /*, disabled: true*/ }); //RC 26256869 : Doručené
//            }
//            if(settings.FiltrAgendovyVisible) {
//                data.push({ nazev: "jres:26256870", id: typPuvodDokumentuEnum.AGENDOVY /*, disabled: true*/ }); //RC 26256870 : Agendové
//            }

//            var sectionZobrazitVisible = settings.FiltrVlastniVisible || settings.FiltrDorucenyVisible || settings.FiltrAgendovyVisible;// pokud nebude videt ani jedna volba, schovam cele vyberove pole

//            var filterPom = new Gordic.Forms.Form().addSection();
//            if(sectionZobrazitVisible) {
//                filterPom.addRow(settings.label).addField("gselectbox", {
//                    name: settings.name,
//                    multi: true,
//                    list: true,
//                    initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
//                    //verticalButtons: true,
//                    itemTemplate: "{nazev}",
//                    itemWidth: "",
//                    //helperColumns: ["nazev"],
//                    itemClass: function (value) {
//                        if (value.disabled) {
//                            return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
//                        }
//                    },
//                    data: new Gordic.Data.View(data, { key: "id" }),
//                    model: settings.model,
//                    modelValueTransform: settings.modelValueTransform,
//                    /*   modelValueTransform: {
//                            apply: function (modelValue) {
//                                var value = [];
//                                if (modelValue != null) {
//                                    modelValue.forEach(function (entry) {
//                                        value.push({ id: entry });
//                                    });
//                                }

//                                return value;
//                            },
//                            collect: function (fieldValue) {
//                                return fieldValue;
//                                // return fieldValue === true ? 1 : 0;
//                            }
//                        },*/
//                    change: function (ev, selected) {

//                    },
//                });
//            }

//            return filterPom.getLastSection().rows;
//        },

//        FilterTypTvorbyIxp: function (options) {
//            var defaults = {
//                name: "filterTypTvorbyIxp",
//                label: "jres:26256839", //RC 26256839 : Identifikátory při evidenci
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota
//                // initialValue: null,
//                lastSelectedValue: [],
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            var typTvorbyIxpEnum = Gordic.Ssl.Globals.Enums.TypTvorbyIxp;

//            data.push({ nazev: "jres:26256841", id: typTvorbyIxpEnum.GENEROVAT }); //RC 26256841 : Vždy generovat
//            data.push({ nazev: "jres:26256840", id: typTvorbyIxpEnum.ZADAVAT_DIALOGEM /*, disabled: true*/ }); //RC 26256840 : Zadávat ve standardním okně

//            var filterEvidencePom = new Gordic.Forms.Form().addSection();

//            filterEvidencePom.addRow(settings.label).addField("gselectbox", {
//                name: settings.name,
//                // multi: true,
//                list: true,
//                //verticalButtons: true,
//                itemTemplate: "{nazev}",
//                itemWidth: "",
//                //helperColumns: ["nazev"],
//                itemClass: function (value) {
//                    if(value.disabled) {
//                        return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
//                    }
//                },
//                data: new Gordic.Data.View(data, { key: "id" }),
//                initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
//                model: settings.model,
//                /* change: function (ev, selected) {

//                    },*/
//            });

//            return filterEvidencePom.getLastSection().rows;
//        },

//        FilterPohledZa: function (options) {
//            var defaults = {
//                name: "filterPohledZa",
//                label: "jres:26255855", //RC 26255855 : Vlastnictví
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota
//                FiltrVlastniVisible: true,
//                FiltrSuVisible: true,
//                Required: false,
//                Validators: undefined,
//                initialValue: { id: 0 },
//                lastSelectedValue: [],
//                onChange: function () {
//                    $.noop();
//                },
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            var pohledZaEnum = Gordic.Wfl.Globals.Enums.TypeIxsInList;

//            if(settings.FiltrVlastniVisible) {
//                data.push({ nazev: "jres:26255437", id: pohledZaEnum.IxsFun }); //RC 26255437 : Funkce
//            }
//            if(settings.FiltrSuVisible) {
//                data.push({ nazev: "jres:26255436", id: pohledZaEnum.IxsSu /*, disabled: true*/ }); //RC 26255436 : Spisový uzel
//            }

//            var sectionZobrazitVisible = settings.FiltrVlastniVisible || settings.FiltrSuVisible;// pokud nebude videt ani jedna volba, schovam cele vyberove pole

//            var filterPohledZaPom = new Gordic.Forms.Form().addSection();

//            if (sectionZobrazitVisible) {
//                filterPohledZaPom.addRow({ label: settings.label, required: settings.Required }).addField("gselectbox", {
//                    name: settings.name,
//                    // multi: true,
//                    list: true,
//                    //verticalButtons: true,
//                    itemTemplate: "{nazev}",
//                    itemWidth: "",
//                    //helperColumns: ["nazev"],
//                    itemClass: function (value) {
//                        if (value.disabled) {
//                            return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
//                        }
//                    },
//                    data: new Gordic.Data.View(data, { key: "id" }),
//                    initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
//                    model: settings.model,
//                    change: function (ev, selected) {
//                        settings.onChange();
//                    },
//                    validators: settings.Validators
//                });
//            }

//            return filterPohledZaPom.getLastSection();
//        },

//        FilterTypovychSpisuSoucastiDilu: function (options) {
//            var defaults = {
//                name: "filterTypoveSpisySoucastiDily",
//                label: "jres:26255267", //RC 26255267 : Zobrazit
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota
//                multi: false,
//                initialValue: [],
//                FiltrTypoveSpisyVisible: true,
//                FiltrSoucastiVisible: true,
//                FiltrDilyVisible: true,
//                lastSelectedValue: [],
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            var typoveSpisySoucastiDilyEnum = Gordic.Ssl.Globals.Enums.TypoveSpisySoucastiDily;

//            if (settings.FiltrTypoveSpisyVisible) {
//                data.push({ nazev: "jres:26256962", id: typoveSpisySoucastiDilyEnum.TYPOVY_SPIS }); //RC 26256962 : Typové spisy
//            }
//            if (settings.FiltrSoucastiVisible) {
//                data.push({ nazev: "jres:26256963", id: typoveSpisySoucastiDilyEnum.SOUCAST /*, disabled: true*/ }); //RC 26256963 : Součásti
//            }
//            if (settings.FiltrDilyVisible) {
//                data.push({ nazev: "jres:26256964", id: typoveSpisySoucastiDilyEnum.DIL }); //RC 26256964 : Díly
//            }
//            var sectionZobrazitVisible = settings.FiltrTypoveSpisyVisible || settings.FiltrSoucastiVisible || settings.FiltrDilyVisible;// pokud nebude videt ani jedna volba, schovam cele vyberove pole
//            var filterDleStavuPom = new Gordic.Forms.Form().addSection();
//            if (sectionZobrazitVisible) {
//                filterDleStavuPom.addRow(settings.label).addField("gselectbox", {
//                    name: settings.name,
//                    multi: true,
//                    list: true,
//                    //verticalButtons: true,
//                    itemTemplate: "{nazev}",
//                    itemWidth: "",
//                    //helperColumns: ["nazev"],
//                    itemClass: function (value) {
//                        if (value.disabled) {
//                            return "g-state-text" + Gordic.Global.Enums.ColorStateClass.inactive;
//                        }
//                    },
//                    data: new Gordic.Data.View(data, { key: "id" }),
//                    initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
//                    model: settings.model,
//                    //change: function (ev, selected) {
//                    //    settings.onChange(ev, selected);
//                    //},
//                });
//            }

//            return filterDleStavuPom.getLastSection();
//        },

//    }, { pure: true });
//})(jQuery);