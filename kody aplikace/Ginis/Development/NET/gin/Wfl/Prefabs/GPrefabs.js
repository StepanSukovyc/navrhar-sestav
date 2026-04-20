//(function ($) {
//    "use strict";
//    namespace("Gordic.Wfl.Prefabs", {

//        FilterSubjekt: function (options, parentContent) {
//            var that = this;
//            var wflDBParams = Gordic.Wfl.WebClient.GetGWflDBParams();
//            var wflStructOrgAkt = Gordic.Wfl.WebClient.GetGWflStrukturaAktInfo()
//            var wflStructOrg = Gordic.Wfl.WebClient.GetGWflStrukturaOrgAsync();
//          //  var podrizeneUzly = wflStructOrg.podrizeneUzly;
//          //  var osobyUzlu = wflStructOrg.osobyUzlu;
//          ////  var skupinyOsob = wflStructOrg.skupinyOsob;

//            var podrizeneUzly = wflStructOrg.then((structOrg) => structOrg.podrizeneUzly);
//            var osobyUzlu = wflStructOrg.then((structOrg) => structOrg.osobyUzlu);
//            var skupinyOsob = wflStructOrg.then((structOrg) => structOrg.skupinyOsob2); // ref T26661

//            var funkce = wflStructOrgAkt.aktFunkce;
//            var spisUzel = wflStructOrgAkt.aktSpisUzel;

//            var arrayFunkce = [];
//            arrayFunkce.push(funkce);
//            var arraySpisUzel = [];
//            arraySpisUzel.push(spisUzel);
//            var defaultData = null;

//            var validateSpisUzel = false;
//            var validatePodrizeneUzly = false;
//            var validateOsobyUzlu = false;
//            var validateskupinyOsob = false;

//            //if(parentContent != null) {
//            //    var vlastnictviInicialValue = parentContent.userSettings.get("VlastnictviInicialValue");

//            //    if(vlastnictviInicialValue != null) {
//            //        options.initialValue = vlastnictviInicialValue;
//            //    }
//            //}

//            var defaults = {
//                name: "filterSubjekt",
//                label: "jres:26227801", //RC 26227801 : Subjekt
//                model: null,
//                typSubjektuFilter: Gordic.Ssl.Globals.Enums.TypSubjektuFilter.VSE,
//                globalSettings: null,
//                initialValue: { Ixs: wflStructOrgAkt.aktFunkce.Ixs, Name: wflStructOrgAkt.aktFunkce.Name, TypeIxs: 0, SubjectStructOrg: Gordic.Ssl.Globals.Enums.SubjectStructOrg.AKTUALNI_FUNKCE },
//                ignoreUsuShowSu: false,
//                onChange: function () {
//                    $.noop();
//                }
//            };
//            var settings = $.extend({}, defaults, options);

//            //if (settings.initialValue.TypeIxs == null) {
//            //    settings.initialValue.TypeIxs = 0;
//            //}
//            //if(settings.initialValue.SubjectStructOrg == null) {
//            //    settings.initialValue.SubjectStructOrg = Gordic.Ssl.Globals.Enums.SubjectStructOrg.AKTUALNI_FUNKCE;
//            //}

//            var activeSubtaskItemIndex = 0;
//            var subjectStructOrgEnum = Gordic.Ssl.Globals.Enums.SubjectStructOrg;
//            var subjectStructOrg = subjectStructOrgEnum.AKTUALNI_FUNKCE;
//            extendObjects(arrayFunkce, false, subjectStructOrgEnum.AKTUALNI_FUNKCE);

//            //  console.log(arrayFunkce);

//            if (settings.initialValue != null && settings.initialValue.SubjectStructOrg != null) {
//                subjectStructOrg = settings.initialValue.SubjectStructOrg;

//                switch (subjectStructOrg) {
//                    case subjectStructOrgEnum.AKTUALNI_FUNKCE: {
//                        extendObjects(arrayFunkce, false, subjectStructOrgEnum.AKTUALNI_FUNKCE);
//                        defaultData = $.when(arrayFunkce);
//                        break;
//                    }
//                    case subjectStructOrgEnum.AKTUALNI_SPIS_UZEL: {
//                        extendObjects(arraySpisUzel, true, subjectStructOrgEnum.AKTUALNI_SPIS_UZEL);
//                        defaultData = $.when(arraySpisUzel);
//                        break;
//                    }
//                    case subjectStructOrgEnum.PODRIZENE_UZLY: {
//                        //extendObjects(podrizeneUzly, true, subjectStructOrgEnum.PODRIZENE_UZLY);
//                        defaultData = podrizeneUzly = podrizeneUzly.then((arr) => extendObjects(arr, true, subjectStructOrgEnum.PODRIZENE_UZLY));
//                        break;
//                    }
//                    case subjectStructOrgEnum.OSOBY_UZLU: {
//                        //extendObjects(osobyUzlu, false, subjectStructOrgEnum.OSOBY_UZLU);
//                        defaultData = osobyUzlu = osobyUzlu.then((arr) => extendObjects(arr, false, subjectStructOrgEnum.OSOBY_UZLU));
//                        break;
//                    }
//                    case subjectStructOrgEnum.SKUPINY_FUNKCI: {
//                        //extendObjects(skupinyOsob, false, subjectStructOrgEnum.SKUPINY_FUNKCI);
//                        defaultData = skupinyOsob = skupinyOsob.then((arr) => extendObjects(arr, false, subjectStructOrgEnum.SKUPINY_FUNKCI));
//;
//                        break;
//                    }
//                    default: break;
//                }
//            }

//            var fieldStates = [{ id: 'filterSubjektState', icon: 'gi-user', align: "opposite", customClass: "g-state-info", tooltip: "jres:26227802" }]; //RC 26227802 : Funkční místo

//            // osetreni pro pripad ze initialValue je SU
//            if (settings.initialValue != null && settings.initialValue.TypeIxs == 1 /*&& settings.typSubjektuFilter === Gordic.Ssl.Globals.Enums.TypSubjektuFilter.VSE*/) {
//                fieldStates = [{ id: 'filterSubjektState', icon: 'gi-uzel', align: "opposite", customClass: "g-state-info", tooltip: "jres:26227803" }]; //RC 26227803 : Spisový uzel
//            }

//            // ref T26661
//            var defaultProfile = {
//                name: "jres:26227999", //RC 26227999 : Výchozí profil
//                _locked: true,
//                columnList: "Name",
//            };

//            var skupinyFunkciProfile = {
//                name: "jres:26228002", //RC 26228002 : Výchozí profil pro skupiny funkcí
//                _locked: true,
//                columnList: "Name,NameSfu",
//                grouping: "NameSfu",
//            };

//            function createSubtasks(typSubjektuFilter, subjectStructOrg, pushSubtasks, ignoreUsuShowSu) {
//                var activeSubtaskItemIndex = 0;
//                var continueCompute = true;
//                var praceZaSuEnabled = wflDBParams.usu_show_su == 1 || wflDBParams.usu_show_su == 2;
                
//                if (subjectStructOrg == null) {
//                    subjectStructOrg = subjectStructOrgEnum.AKTUALNI_FUNKCE;
//                }

//                if (typSubjektuFilter !== typSubjektuFilterEnum.JEN_SU) {
//                    if (pushSubtasks) {
//                        subTaskParams.push({
//                            id: "function",
//                            favorite: true,
//                            action: new GAction({ name: "functionAct", caption: "jres:26227804", run: function (ev, ctx) {  reloadGrid(false, subjectStructOrgEnum.AKTUALNI_FUNKCE, ctx.cnt); } }) //RC 26227804 : Aktuální funkce
//                        });
//                    }
//                    if (continueCompute) {
//                        if (subjectStructOrg == subjectStructOrgEnum.AKTUALNI_FUNKCE) {
//                            continueCompute = false;
//                        } else {
//                            activeSubtaskItemIndex++;
//                        }
//                    }
//                }
//                if ((praceZaSuEnabled || ignoreUsuShowSu) && typSubjektuFilter !== typSubjektuFilterEnum.JEN_FUN) {
//                    if(pushSubtasks) {
//                        validateSpisUzel = true;

//                        subTaskParams.push({
//                            id: "spisUzel",
//                            favorite: true,
//                            action: new GAction({ name: "spisUzelAct", caption: "jres:26227805", run: function (ev, ctx) { reloadGrid(true, subjectStructOrgEnum.AKTUALNI_SPIS_UZEL, ctx.cnt); } }) //RC 26227805 : Aktuální spisový uzel
//                        });
//                    }

//                    if (continueCompute) {
//                        if (subjectStructOrg == subjectStructOrgEnum.AKTUALNI_SPIS_UZEL) {
//                            continueCompute = false;
//                        } else {
//                            activeSubtaskItemIndex++;
//                        }
//                    }

//                    if (typSubjektuFilter !== typSubjektuFilterEnum.AKTFUN_AKTSU && typSubjektuFilter !== typSubjektuFilterEnum.JEN_FUN_AKTSU) {
//                        var showPodrUzlyUS = window.gstor.get("Global.Wfl.AppSettings.ListsSettings.PodrUzly"); // dříve "Global.Wfl.AppSettings.OthersSettings.PodrUzly" ref T24584

//                        if(showPodrUzlyUS && praceZaSuEnabled) {
//                            if (pushSubtasks) {
//                                validatePodrizeneUzly = true;

//                                subTaskParams.push({
//                                    id: "subNode",
//                                    favorite: true,
//                                    action: new GAction({ name: "subNodeAct", caption: "jres:26227806", run: function (ev, ctx) { reloadGrid(true, subjectStructOrgEnum.PODRIZENE_UZLY, ctx.cnt); } }) //RC 26227806 : Podřízené uzly
//                                });
//                            }
//                            if (continueCompute) {
//                                if (subjectStructOrg == subjectStructOrgEnum.PODRIZENE_UZLY) {
//                                    continueCompute = false;
//                                } else {
//                                    activeSubtaskItemIndex++;
//                                }
//                            }
//                        }
//                    }
//                }

//                if(typSubjektuFilter !== typSubjektuFilterEnum.JEN_SU && typSubjektuFilter !== typSubjektuFilterEnum.AKTFUN_AKTSU) {
//                    if(praceZaSuEnabled) {
//                        if(pushSubtasks) {
//                            validateOsobyUzlu = true;

//                            subTaskParams.push({
//                                id: "peopleInNode",
//                                favorite: true,
//                                action: new GAction({ name: "peopleInNodeAct", caption: "jres:26227807", run: function (ev, ctx) {reloadGrid(false, subjectStructOrgEnum.OSOBY_UZLU, ctx.cnt); } }) //RC 26227807 : Osoby uzlu
//                            });
//                        }
//                        if(continueCompute) {
//                            if(subjectStructOrg == subjectStructOrgEnum.OSOBY_UZLU) {
//                                continueCompute = false;
//                            } else {
//                                activeSubtaskItemIndex++;
//                            }
//                        }
//                    }
//                    if (wflDBParams.usu_rad_sfuview == 1) {
//                        if(pushSubtasks) {
//                            validateskupinyOsob = true;

//                            subTaskParams.push({
//                                id: "peopleGroup",
//                                favorite: true,
//                                action: new GAction({ name: "peopleGroupAct", caption: "jres:26227808", run: function (ev, ctx) {reloadGrid(false, subjectStructOrgEnum.SKUPINY_FUNKCI, ctx.cnt); } }) //RC 26227808 : Skupiny osob
//                            });
//                        }
//                        if (continueCompute) {
//                            if (subjectStructOrg == subjectStructOrgEnum.SKUPINY_FUNKCI) {
//                                continueCompute = false;
//                            } else {
//                                activeSubtaskItemIndex++;
//                            }
//                        }
//                    }
//                }

//                return activeSubtaskItemIndex;
//            }

//            function extendObjects(array, isIxsSu, subjectStructOrg, pIxs) {
//                array.forEach(function (entry) {
//                    if (isIxsSu) {
//                        entry.TypeIxs = Gordic.Wfl.Globals.Enums.TypeIxsInList.IxsSu;
//                        entry.pIxs = pIxs; // parent ixs pro stromogrid
//                    } else {
//                        entry.TypeIxs = Gordic.Wfl.Globals.Enums.TypeIxsInList.IxsFun;
//                    }
//                    entry.SubjectStructOrg = subjectStructOrg;
//                });
//                return array
//            }

//            function reloadGrid(isIxsSu, subjectStructOrg, content) {
//                var array = getSelectorDataDleValue(subjectStructOrg);
                
//                array = array.then((arr)=>extendObjects(arr, isIxsSu, subjectStructOrg));
//                defaultData = array;

//                var view = array.then(arr=>new Gordic.Data.View(arr));
//                var stromogrid = subjectStructOrg == subjectStructOrgEnum.PODRIZENE_UZLY;
//                var skupinyFunkci = subjectStructOrg == subjectStructOrgEnum.SKUPINY_FUNKCI;

//                if(stromogrid) {
//                    view = $.when(new Gordic.Data.View(null, { // array?
//                        key: "Ixs",
//                        processOnStart: false,
//                        processors: {
//                            provider: new Gordic.Data.Provider(function (req) {
//                                if (!req.data) return array; // root
//                                var pIxs = req.data.Ixs;
//                                var opt = {
//                                    IxsSu: pIxs
//                                };
//                                var deff = $.Deferred();
//                                var srv = null;
//                                if (content != null) {
//                                    srv = content.createServiceContent({ className: "Gordic.Ssl.WebClient.GSslUtils", params: {} });
//                                } else {
//                                    srv = new GContent({ className: "Gordic.Ssl.WebClient.GSslUtils", params: {} });
//                                }
//                                srv.call("NactiDataPodrizenyUzel", opt)
//                                    .done(function (podrizeneIxs) {

//                                        extendObjects(podrizeneIxs, isIxsSu, subjectStructOrg, pIxs);
//                                        deff.resolve(podrizeneIxs);
//                                    })
//                                    .fail(function () {
//                                        deff.reject();
//                                    });

//                                return deff;
//                            }),
//                            tree: new Gordic.Data.Tree(Gordic.Data.Tree.parentIdOrganizer("pIxs"), { defaultState: "unknown" }) // defaultni stav radku je „nenacteno“, tzn [+] ale bez children
//                        }
//                    }));
//                }

              

//               // view.updateData(rows, 'refresh');//
//                view.then((v) => {
//                    var gridSelect = $("#selectorSubjekt .ggrid").ggrid({});
//                    gridSelect.ggrid("setData", v);

//                    // ref T26661
//                    if(skupinyFunkci) {
//                        gridSelect.ggrid("useProfile", skupinyFunkciProfile);
//                    } else {
//                        gridSelect.ggrid("useProfile", defaultProfile);
//                    }

            
//                    var rows = v.getDataRows(true, "data");
//                    var filteredRows = [];

//                    if (settings.initialValue != null) {
//                        filteredRows = rows.filter(function (meta) {
//                            var data = meta.data;
//                            if (data.Ixs && data.Ixs == settings.initialValue.Ixs) {
//                                return true;
//                            }
//                            return false;
//                        });
//                    }

//                    if (filteredRows.length > 0) {
//                        gridSelect.ggrid("activeRow", filteredRows[0]);
//                    } else if (rows.length > 0) { // pokud v datech není vybraný řádek, pak musím jako aktivní nastavit první řádek aktuálních dat. Jinak dojde k označení aktivního řádku gridu dle indexu předchozího seznamu před nasetováním nových dat
//                        gridSelect.ggrid("activeRow", rows[0]);
//                    }
//                });
//            }

//            function getSelectorDataDleValue(subjectStructOrg) {
//                var data = [];

//                switch (subjectStructOrg) {
//                    case subjectStructOrgEnum.AKTUALNI_FUNKCE: {
//                        data = $.when(arrayFunkce);
//                        break;
//                    }
//                    case subjectStructOrgEnum.AKTUALNI_SPIS_UZEL: {
//                        data = $.when(arraySpisUzel);
//                        break;
//                    }
//                    case subjectStructOrgEnum.PODRIZENE_UZLY: {
//                        data = podrizeneUzly;
//                        break;
//                    }
//                    case subjectStructOrgEnum.OSOBY_UZLU: {
//                        data = osobyUzlu;
//                        break;
//                    }
//                    case subjectStructOrgEnum.SKUPINY_FUNKCI: {
//                        data = skupinyOsob;
//                        break;
//                    }
//                    default: break;
//                }

//                return data;
//            }

//            var typSubjektuFilterEnum = Gordic.Ssl.Globals.Enums.TypSubjektuFilter;
//            var subTaskParams = [];

//            activeSubtaskItemIndex = createSubtasks(settings.typSubjektuFilter, subjectStructOrg, true, settings.ignoreUsuShowSu);

//            var filterSubjekt = new Gordic.Forms.Form().addSection().addRow(settings.label);

//            filterSubjekt.addField("gselectbox", Gordic.Prefabs.Select.gincaku({
//                isolatedUserSettings: false
//                //userSettings: Gordic.Data.Storage.resolve("selector", this.element),
//                //  itemTemplate: "{Name}",
//                //  model: "Name=",
//            }),
//                {
//                    name: settings.name,
//                    initialValue: settings.initialValue,
//                    emptyValue: { Ixs: null, Name: null, TypeIxs: 0, SubjectStructOrg: 0 },
//                    defaultValue: { Ixs: null, Name: null, TypeIxs: 0, SubjectStructOrg: 0 },
//                    data: defaultData.then((arr)=>new Gordic.Data.View(arr, {
//                        key: 'Ixs'
//                    })),
//                    selector: function (ctx) {
//                        var fieldValue = $(this).gfield("getValue");
//                        settings.initialValue = fieldValue;
//                        defaultData = getSelectorDataDleValue(settings.initialValue.SubjectStructOrg);
//                        activeSubtaskItemIndex = createSubtasks(settings.typSubjektuFilter, (fieldValue || {}).SubjectStructOrg, false, settings.ignoreUsuShowSu);
 
//                        //var isIxsSu = settings.initialValue.TypeIxs == Gordic.Wfl.Globals.Enums.TypeIxsInList.IxsSu;
//                        //reloadGrid(isIxsSu, settings.initialValue.SubjectStructOrg, $.content(this));

//                        var selector = new Gordic.Data.Selectors.DefaultSelector({
//                            parentElement: that.element,
//                            related: ctx.related,
//                            uid: "selectorSubjekt",
//                            data: defaultData,
//                            checkSettings: true,
//                            // ref T26661
//                            gridOpts: {
//                                defaultProfile: defaultProfile,
//                                profiles: [defaultProfile, skupinyFunkciProfile]
//                            },
//                            gridFormat: new Gordic.Data.GridFormat()
//                                // ref T26661
//                                .addTextColumn({
//                                    name: "NameSfu",
//                                    caption: "jres:26228000", //RC 26228000 : Skupina
//                                    groupings: {
//                                        default: {
//                                            _presetCaption: "jres:26228000", //RC 26228000 : Skupina
//                                            grouping: {
//                                                //hash: function (meta, rows) {
//                                                //    var d = meta.data;
//                                                //    return d.spis_znak;
//                                                //  //  return d.nazev && d.nazev.length > 0 ? d.nazev.charAt(0).toUpperCase() : null;
//                                                //},
//                                                sort: "NameSfu,Name",
//                                                hideColumn: false
//                                            }
//                                        }
//                                    },
//                                })
//                                .addStructureColumn({
//                                    caption: "jres:26227809", //RC 26227809 : Název
//                                    columnType: "text",
//                                    name: "Name"
//                                }),
//                            subTaskOpts: {
//                                activeItem: activeSubtaskItemIndex,
//                                params: subTaskParams
//                            }
//                        }).show({ width: 870 });
//                        if(settings.initialValue != null) {
//                            var isIxsSu = settings.initialValue.TypeIxs == Gordic.Wfl.Globals.Enums.TypeIxsInList.IxsSu;

//                            if(isIxsSu) {
//                                reloadGrid(isIxsSu, settings.initialValue.SubjectStructOrg, $.content(this));

//                                subTaskParams.forEach(function (entry) {
//                                    if(entry && entry.action) {
//                                        if (entry.action.name == "spisUzelAct") {
//                                            entry.action.run();
//                                        }
//                                    }
//                                });
//                            }
//                        }

//                        return selector;
//                    },
//                    model: settings.model,
//                    verify: function (modelValue) {
//                        function najdiVDatechPolicka(modelValue) {
//                            function checkValue(arrayItem) {
//                                return arrayItem.Ixs == modelValue.Ixs;
//                            }

//                            if (arrayFunkce.find(checkValue)) {
//                                return $.when(true);
//                            }
//                            else if (validateSpisUzel && arraySpisUzel.find(checkValue)) {
//                                return $.when(true);
//                            }
//                            //else if (validatePodrizeneUzly /*&& podrizeneUzly.find(checkValue)*/) {
//                            //    if (modelValue.pIxs == null) {
//                            //        return podrizeneUzly.find(checkValue);
//                            //    } else {
//                            //        return true; // TODO
//                            //    }
//                            //}
//                            else {
//                                return $.when(osobyUzlu, skupinyOsob, podrizeneUzly).then((osUzlu, skOsob, podUzly) => {
//                                    if (validateOsobyUzlu && osUzlu.find(checkValue)) {
//                                        return true;
//                                    }
//                                    else if (validateskupinyOsob && skOsob.find(checkValue)) {
//                                        return true;
//                                    }
//                                    // 30.04.2024 - TFeik
//                                    // Přesunuto na konec protože po zmírnění podmínky už se nedostane na testování osob uzlu a skupin osob čímž vrací falešný null.
//                                    else if (validatePodrizeneUzly /*&& podrizeneUzly.find(checkValue)*/) {
//                                        if (modelValue.pIxs == null) {
//                                            return podUzly.find(checkValue);
//                                        } else {
//                                            return true; // TODO
//                                        }
//                                    }
//                                    return false;
//                                })
//                            }
//                        }

//                        var nalezeno = null;

//                        if (modelValue && typeof modelValue === "object") {
//                            nalezeno = najdiVDatechPolicka(modelValue);
//                        }

//                        return nalezeno?.then((nalezenoValue) => {
//                            if (nalezenoValue) {
//                                return modelValue;
//                            } else {
//                                return null;
//                            }
//                        });
//                    },
//                    itemTemplate: "{Name}",
//                    states: fieldStates,
//                    change: function (ev, selected) {
//                        var cnt = $.content($(ev.target));
//                        var field;

//                        if(cnt != null) {
//                            field = cnt.findFields(settings.name);
//                        } else {
//                            field = $(this);
//                        }

//                        var subjektState = field.gfield("getState", "filterSubjektState");
//                        if(subjektState && subjektState.length > 0) {
//                            subjektState.remove();
//                        }

//                        if(selected.value) {
//                            var icon = 'gi-user';
//                            var tooltip = "jres:26227810"; //RC 26227810 : Funkční místo
//                            if (selected.value.TypeIxs == 1) {
//                                icon = 'gi-uzel';
//                                tooltip = "jres:26227811"; //RC 26227811 : Spisový uzel
//                            }

//                            field.gfield("addState", { id: 'filterSubjektState', icon: icon, align: "opposite", customClass: "g-state-info", tooltip: tooltip });
//                        }

//                        // 11.09.2020 - TFeik
//                        // Ignorování changů z filterpanelu.
//                        if(selected && selected.flags && (selected.flags.isKontrolniDiv || selected.flags.noChange)) {
//                            return;
//                        }
                       
//                        // 23.02.2022 - TFeik
//                        // Ošetření situace kdy field nelze použít.
//                        if(!Gordic.Utils.WidgetExists('gfield', field)) {
//                            return;
//                        }

//                        if(selected.value) {
//                            activeSubtaskItemIndex = createSubtasks(settings.typSubjektuFilter, selected.value.SubjectStructOrg, false, settings.ignoreUsuShowSu);
//                            settings.initialValue = selected.value;
//                        }

//                        //if(parentContent != null && selected.value != null) {
//                        //    parentContent.userSettings.set("VlastnictviInicialValue", selected.value);
//                        //}

//                        if(settings.onChange) {
//                            settings.onChange(ev, selected);
//                        }
//                    },
//                    validators: settings.validators
//                });

//            return filterSubjekt.getLastSection();
//        },

//        FilterUpresneniHledani: function (options) {
//            var defaults = {
//                name: "filterUpresneniHledani",
//                label: "jres:26226314", //RC 26226314 : Upřesnění
//                initialValue: [],
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota
//                //  value: "300",
//                // disabled: false,
//                //  akce: ((typeof options === "string") ? options : null),    
//                VecVisible: false,
//                VecPodrobneVisible: false,
//                PoznamkaVisible: false,
//                OdesilatelVisible: false,
//                ZnackaVisible: false,
//                UzivatelskaPoznamkaVisible: false,
//                HledatVeVlastnostechVisible: false,
//                DiaktitikaVisible: false,
//                VlastnikHistorickyVisible: false,
//                NevyplnenoUmisteniVisible: false,
//                VcetneStornovanychVisible: false,
//                HledatIDleOdesilateleVisible: false,
//                VyskytVsechSlovVisible: false,
//                DleZacatkuSlovVisible: false,
//                lastSelectedValue: [],
//                favoriteRowLayoutDescriptor: undefined,
//                change: $.noop(),
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            if(settings.VecVisible) {
//                data.push({ nazev: "jres:26227341", id: 1 }); //RC 26227341 : Hledat ve věci
//            }
//            if(settings.VecPodrobneVisible) {
//                data.push({ nazev: "jres:26225903", id: 2 }); //RC 26225903 : Hledat ve věci podrobně
//            }
//            if(settings.PoznamkaVisible) {
//                data.push({ nazev: "jres:26227342", id: 3 }); //RC 26227342 : Hledat v poznámce
//            }
//            if(settings.OdesilatelVisible) {
//                data.push({ nazev: "jres:26227343", id: 4 }); //RC 26227343 : Hledat v odesílateli
//            }
//            if(settings.ZnackaVisible) {
//                data.push({ nazev: "jres:26227344", id: 5 }); //RC 26227344 : Hledat ve značce
//            }
//            if(settings.UzivatelskaPoznamkaVisible) {
//                data.push({ nazev: "jres:26227345", id: 6 }); //RC 26227345 : Hledat v uživatelské poznámce
//            }
//            if(settings.HledatVeVlastnostechVisible) {
//                data.push({ nazev: "jres:26227698", id: 7 }); //RC 26227698 : Hledat ve vlastnostech
//            }

//            if(settings.DiaktitikaVisible) {
//                data.push({ nazev: "jres:26227175", id: 12/*, disabled: true*/ }); //RC 26227175 : Rozlišovat velikost písmen
//            }
//            if(settings.VlastnikHistorickyVisible) {
//                data.push({ nazev: "jres:26225905", id: 13 }); //RC 26225905 : Vlastník i historicky
//            }
//            if(settings.NevyplnenoUmisteniVisible) {
//                data.push({ nazev: "jres:26225914", id: 14 }); //RC 26225914 : Umístění není vyplněno
//            }
//            if(settings.VcetneStornovanychVisible) {
//                data.push({ nazev: "jres:26226400", id: 15 }); //RC 26226400 : Včetně stornovaných
//            }
//            if(settings.HledatIDleOdesilateleVisible) {
//                data.push({ nazev: "jres:26225923", id: 16 }); //RC 26225923 : Hledat i dle odesílatele
//            }
//            if(settings.VyskytVsechSlovVisible) {
//                data.push({ nazev: "jres:26226430", id: 17 }); //RC 26226430 : Nalezené dokumenty/spisy musí obsahovat všechna klíčová slova
//            }
//            if(settings.DleZacatkuSlovVisible) {
//                data.push({ nazev: "jres:26227346", id: 18 }); //RC 26227346 : Hledat dle zadaných začátků slov
//            }

//            var sectionZobrazitVisible = settings.VecPodrobneVisible || settings.DiaktitikaVisible || settings.VlastnikHistorickyVisible || settings.NevyplnenoUmisteniVisible || settings.VcetneStornovanychVisible || settings.HledatIDleOdesilateleVisible || settings.VyskytVsechSlovVisible;// pokud nebude videt ani jedna volba, schovam cele vyberove pole

//            var filterPom = new Gordic.Forms.Form().addSection();

//            if (sectionZobrazitVisible) {
//                filterPom.addRow({ label: settings.label, favoriteRowLayoutDescriptor: settings.favoriteRowLayoutDescriptor }).addField("gselectbox", {
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
//                 /*   modelValueTransform: {
//                        apply: function (modelValue) {
//                            var value = [];
//                            if (modelValue != null) {
//                                modelValue.forEach(function (entry) {
//                                    value.push({ id: entry });
//                                });
//                            }

//                            return value;
//                        },
//                        collect: function (fieldValue) {
//                            return fieldValue;
//                           // return fieldValue === true ? 1 : 0;
//                        }
//                    },*/
//                    change: function (ev, selected) {
//                        if(settings.change) {
//                            settings.change(ev, selected);
//                        }
//                    },
//                });
//            }

//            return filterPom.getLastSection().rows;
//           // return filterDleStavuPom.getLastSection();
//        },
//        FilterHledaniTypDb: function (options) {
//            var gin_archivni_db = 0;
//            var k203Params = Gordic.Gin.WebClient.GK203Handler.GetK203ParamsImmediate();
//            if(k203Params) {
//                gin_archivni_db = k203Params.gin_archivni_db;
//            }

//            if(gin_archivni_db == 0) {
//                return null;
//            }

//            var defaults = {
//                name: "filterHledaniTypDb",
//                label: "jres:26225782", //RC 26225782 : Hledat v
//                initialValue: 0,
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota         
//                lastSelectedValue: [],
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            var typDbEnum = Gordic.Wfl.Globals.Enums.TypDbHledani;

//            data.push({ nazev: "jres:26227180", id: typDbEnum.Zakladni }); //RC 26227180 : Základní
//            data.push({ nazev: "jres:26227181", id: typDbEnum.Archivni }); //RC 26227181 : Archivní
//            data.push({ nazev: "jres:26227182", id: typDbEnum.Vsude /*, disabled: true*/ }); //RC 26227182 : Všude

//            var filterTypDbPom = new Gordic.Forms.Form().addSection();

//            filterTypDbPom.addRow(settings.label).addField("gselectbox", {
//                name: settings.name,
//                // multi: true,
//                list: true,
//                initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
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
//                model: settings.model,
//                /* change: function (ev, selected) {
 
//                    },*/
//            });

//            return filterTypDbPom.getLastSection().rows;
//            // return filterTypDbPom.getLastSection();
//        },
//        FilterHledaniSkupina: function (options) {
//            var defaults = {
//                name: "filterHledaniSkupina",
//                label: "jres:26225925", //RC 26225925 : Skupina
//                initialValue: [],
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota         
//                lastSelectedValue: [],
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            var typDbEnum = Gordic.Wfl.Globals.Enums.SkupinaHledani;

//            data.push({ nazev: "jres:26225926", id: typDbEnum.Vse }); //RC 26225926 : Vše
//            data.push({ nazev: "jres:26225397", id: typDbEnum.Dokument }); //RC 26225397 : Dokument
//            data.push({ nazev: "jres:26226058", id: typDbEnum.SamostatnyDokument /*, disabled: true*/ }); //RC 26226058 : Samostatný dokument
//            data.push({ nazev: "jres:26226059", id: typDbEnum.DokumentVlozenyDoSpisu }); //RC 26226059 : Dokument vložený do spisu
//            data.push({ nazev: "jres:26225402", id: typDbEnum.Spis }); //RC 26225402 : Spis

//            var filterTypDbPom = new Gordic.Forms.Form().addSection();

//            filterTypDbPom.addRow(settings.label).addField("gselectbox", {
//                name: settings.name,
//                // multi: true,
//                list: true,
//                initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
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
//                model: settings.model,
//                /* change: function (ev, selected) {
 
//                    },*/
//            });

//            return filterTypDbPom.getLastSection().rows;
//            // return filterTypDbPom.getLastSection();
//        },
//        FilterHledaniDleVyrizeni: function (options) {
//            var defaults = {
//                name: "filterHledaniDleVyrizeni",
//                label: "jres:26225918", //RC 26225918 : Vyřízeno
//                initialValue: [],
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota         
//                lastSelectedValue: [],
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            var typDbEnum = Gordic.Wfl.Globals.Enums.DleVyrizeniHledani;

//            data.push({ nazev: "jres:26225919", id: typDbEnum.NefiltrovatDleVyrizeni }); //RC 26225919 : Nefiltrovat podle vyřízení
//            data.push({ nazev: "jres:26225918", id: typDbEnum.Vyrizeno }); //RC 26225918 : Vyřízeno
//            data.push({ nazev: "jres:26225920", id: typDbEnum.Nevyrizeno /*, disabled: true*/ }); //RC 26225920 : Nevyřízeno

//            var filterTypDbPom = new Gordic.Forms.Form().addSection();

//            filterTypDbPom.addRow(settings.label).addField("gselectbox", {
//                name: settings.name,
//                // multi: true,
//                list: true,
//                initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
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
//                model: settings.model,
//                /* change: function (ev, selected) {
 
//                    },*/
//            });

//            return filterTypDbPom.getLastSection().rows;
//            // return filterTypDbPom.getLastSection();
//        },

//        FilterAlgHledaniEle: function (options) {
//            var defaults = {
//                name: "filterAlgHledaniEl",
//                label: "jres:26227351", //RC 26227351 : Algoritmus
//                initialValue: 0,
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota         
//                lastSelectedValue: [],
//                prizFtx: 0,
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            var algHledaniEleEnum = Gordic.Wfl.Globals.Enums.AlgHledaniEle;

//            if(settings.prizFtx == 1) {
//                data.push({ nazev: "jres:26227358", id: algHledaniEleEnum.SeVsemiSlovy }); //RC 26227358 : Obsahující slovo
//            } else {
//                data.push({ nazev: "jres:26227348", id: algHledaniEleEnum.SeVsemiSlovy }); //RC 26227348 : Se všemi slovy
//                data.push({ nazev: "jres:26227349", id: algHledaniEleEnum.SJednimSlovem }); //RC 26227349 : Alespoň s jedním slovem
//                data.push({ nazev: "jres:26227350", id: algHledaniEleEnum.NejlepsiSpojeniSlov /*, disabled: true*/ }); //RC 26227350 : Nejlepší spojení slov
//            }

//            var filterAlgHledaniElePom = new Gordic.Forms.Form().addSection();

//            filterAlgHledaniElePom.addRow(settings.label).addField("gselectbox", {
//                name: settings.name,
//                // multi: true,
//                list: true,
//                initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
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
//                model: settings.model,
//                /* change: function (ev, selected) {
 
//                    },*/
//            });

//            return filterAlgHledaniElePom.getLastSection().rows;
//            // return filterAlgHledaniElePom.getLastSection();
//        },

//        FilterOblastHledaniEle: function (options) {
//            var defaults = {
//                name: "filterOblastHledaniEle",
//                label: "jres:32001103", //RC 32001103 : Oblast
//                initialValue: 0,
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota         
//                lastSelectedValue: [],
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            var oblastHledaniEleEnum = Gordic.Wfl.Globals.Enums.OblastHledaniEle;

//            var ginFtxhlevyrPar = $.content("main").wflDBParams.gin_ftxhlevyr;

//            data.push({ nazev: "jres:26225953", id: oblastHledaniEleEnum.TitulekDokumentu }); //RC 26225953 : Titulek
//            data.push({ nazev: "jres:26225604", id: oblastHledaniEleEnum.PopisDokumentu }); //RC 26225604 : Popis
//            data.push({ nazev: "jres:26225268", id: oblastHledaniEleEnum.ObsahDokumentu }); //RC 26225268 : Obsah
//            data.push({ nazev: "jres:26227356", id: oblastHledaniEleEnum.VlozilPracovnik /*, disabled: true*/ }); //RC 26227356 : Vložil (pracovník)

//            if(ginFtxhlevyrPar == 1) {
//                data.push({ nazev: "jres:26227357", id: oblastHledaniEleEnum.ObsahDokumentuVyraz }); //RC 26227357 : Obsah - pomocí výrazu
//            }
            

//            var filterOblastHledaniElePom = new Gordic.Forms.Form().addSection();

//            filterOblastHledaniElePom.addRow(settings.label).addField("gselectbox", {
//                name: settings.name,
//                // multi: true,
//                list: true,
//                initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
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
//                model: settings.model,
//                /* change: function (ev, selected) {
 
//                    },*/
//            });

//            return filterOblastHledaniElePom.getLastSection().rows;
//            // return filterOblastHledaniElePom.getLastSection();
//        },

//        FilterZpusobZobrazeniHledaniEle: function (options) {
//            var defaults = {
//                name: "filterZpusobZobrazeniHledaniEle",
//                label: "jres:32001102", //RC 32001102 : Kumulovat za
//                initialValue: 0,
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota         
//                lastSelectedValue: [],
//            }
//            var settings = $.extend({}, defaults, options);

//            var data = [];

//            var zpusobZobrazeniHledaniEleEnum = Gordic.Wfl.Globals.Enums.ZpusobZobrazeniHledaniEle;

//            data.push({ nazev: "jres:26227359", id: zpusobZobrazeniHledaniEleEnum.Soubory }); //RC 26227359 : Soubory
//            data.push({ nazev: "jres:26227360", id: zpusobZobrazeniHledaniEleEnum.Dokumenty }); //RC 26227360 : Dokumenty

//            var filterZpusobZobrazeniHledaniElePom = new Gordic.Forms.Form().addSection();

//            filterZpusobZobrazeniHledaniElePom.addRow(settings.label).addField("gselectbox", {
//                name: settings.name,
//                // multi: true,
//                list: true,
//                initialValue: Gordic.Wfl.Prefabs.ProvizorniK203SuperFunkceObcuravaciInitialValue(settings.initialValue),
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
//                model: settings.model,
//                /* change: function (ev, selected) {
 
//                    },*/
//            });

//            return filterZpusobZobrazeniHledaniElePom.getLastSection().rows;
//            // return filterZpusobZobrazeniHledaniElePom.getLastSection();
//        },

//        PocetListu: function (options) {//dsebesta
//            var defaults = {
//                wflDBParams: options.wflDBParams
//            }
//            var settings = $.extend({}, defaults, options);
           
//           //#region definice na zaklade parametru
//            //obsluha
//            var l_sSslTextPListuPar = settings.wflDBParams.ssl_textplistu;
//            var l_sSslListuPrilohPar = settings.wflDBParams.ssl_listupriloh;
//            var l_sSslPockopSkPar = settings.wflDBParams.ssl_pockop_sk;
//            var l_sLabelPoctyText = "jres:31926110" //RC 31926110 : listů / stran příloh/kopií
//            var l_sKopiiText ="jres:26225726" //RC 26225726 : kopií
//            var l_sListuUpperText = "jres:26226121" //RC 26226121 : Listů

//            var m_oPocListuLabelText = l_sListuUpperText;
//            var m_oPocListuStringLabelText = l_sListuUpperText;
//            var m_oPocStranLabelText = "jres:26226122" //RC 26226122 : Stran
//            var m_oPocPrilohLabelText = "jres:26226123"; //RC 26226123 : Příloh
//            var m_oPocListuPrilohLabelText = "jres:26226124"; //RC 26226124 : Listů příloh
//            var m_oPocKopiiLabelText = "jres:26226125"; //RC 26226125 : Kopií

//            // zobrazeni ciselneho/textoveho policka Pocet listu
//            var m_oPocListuVisible = false;
//            var m_oPocListuStringVisible = false;

//            if (l_sSslTextPListuPar !== "1") {
//                m_oPocListuVisible = true;
//                m_oPocListuStringVisible = false;
//            } else {
//                m_oPocListuVisible = false;
//                m_oPocListuStringVisible = true;
//            }

//            // zobrazeni policka Pocet listu priloh
//            var m_oPocListuPrilohTableCellVisible = false;
//            var m_oPocListuPrilohTableCellRequire = false;

//            if (l_sSslListuPrilohPar !== "0") {
//                m_oPocListuPrilohTableCellVisible = true;
//                var l_sListuKopiiText = "jres:26225727" //RC 26225727 : listů-kopií
//                l_sLabelPoctyText = l_sLabelPoctyText.replace(l_sKopiiText, l_sListuKopiiText);
//                if (l_sSslListuPrilohPar === "2") {
//                    m_oPocListuPrilohTableCellRequire = true;
//                }
//            } 

//        // pokud je parametricky nastaveno, skryju policko Pocet stran, Pocet kopii a zmenim popisky
//            var m_oPocStranTableCellVisible = false;
//            var m_oPocKopiiTableCellVisible = false;
             
//            if (l_sSslPockopSkPar === "0") {
//                var m_oPocStranTableCellVisible = true;
//                var m_oPocKopiiTableCellVisible = true;

//            } else {
//                var l_sPrilohText = "jres:26225728"; //RC 26225728 : příloh
//                var l_sSvazkuPrilohText = "jres:26225729" //RC 26225729 : svazků příloh
//                var l_sStranText = "jres:26225730" //RC 26225730 : stran

//                l_sLabelPoctyText = l_sLabelPoctyText.replace(l_sPrilohText, l_sSvazkuPrilohText);
//                l_sLabelPoctyText = l_sLabelPoctyText.replace(l_sStranText, "");
//                l_sLabelPoctyText = l_sLabelPoctyText.replace("-" + l_sKopiiText, "");
//                l_sLabelPoctyText = l_sLabelPoctyText.replace(l_sKopiiText, "");
//                l_sLabelPoctyText = l_sLabelPoctyText + " " + l_sPrilohText;
//                m_oPocPrilohLabelText = "jres:26226120" //RC 26226120 : Svazků příloh
//            }

//            var m_oLabelPoctyText = l_sLabelPoctyText;
//    //#endregion
         
//        //#region requireNaParametry
//            var l_sParPovinPoctu = settings.wflDBParams.ssl_povin_poctu;
//            var m_oPocListuRequired = false;
//            var m_oPocPrilohRequired = false;
//            var m_oPocListuRequiredErrorMessage = "";
//            var m_oPocPrilohRequiredErrorMessage = "";
//            if (l_sParPovinPoctu === 1) {
//                m_oPocListuRequired = true;
//                m_oPocListuRequiredErrorMessage = "jres:26225731" //RC 26225731 : Vyplňte Počet listů
//                m_oPocPrilohRequired = true;
//                m_oPocPrilohRequiredErrorMessage = "jres:26225732"; //RC 26225732 : Vyplňte Počet příloh
//            }
//        //#endregion

//        //#region definice políček

//            var PocetListuForm = new Gordic.Forms.Form().addSection();
//            PocetListuForm
//                .addRow({label:m_oLabelPoctyText, hint:m_oLabelPoctyText});
//            // počet listu number
//            if (m_oPocListuVisible) { 
//                PocetListuForm
//                    .addField("gnumberbox", "w-2", {
//                        name: "PocListu",
//                        emptyValue: null,
//                        validators: m_oPocListuRequired ? [new Gordic.Validators.Required({ message: m_oPocListuRequiredErrorMessage })] : undefined
//                        //initialValue: 0,
                        
//                    });
//            }
//            // počet listu string
//            if (m_oPocListuStringVisible){ 
//                PocetListuForm
//                    .addField("gstringbox", "w-2", {
//                        name: "PocListu",
//                        emptyValue: null,
//                        //initialValue: "0",
//                        validators: m_oPocListuRequired ? [new Gordic.Validators.Required({ message: m_oPocListuRequiredErrorMessage })] : undefined
//                    });
//            }
//            // počet stran
//            if (m_oPocStranTableCellVisible) {
//                PocetListuForm
//                    .addField("gnumberbox", "w-2", {
//                        name: "PocStran",
//                        emptyValue: null,
//                       // initialValue: 0,
//                    });
//            } 
//            //pocet priloh
//            PocetListuForm
//                .addField("gnumberbox", "w-2", {
//                    name: "PocPriloh",
//                    emptyValue: null,
//                    //initialValue: 0,
//                    validators: m_oPocPrilohRequired ? [new Gordic.Validators.Required({ message: m_oPocPrilohRequiredErrorMessage } )] : undefined
//                });
//            //pocet listu priloh
//            if (m_oPocListuPrilohTableCellVisible){
//                PocetListuForm
//                    .addField("gstringbox", "w-4", {
//                        name: "PocListuPriloh",
//                        validators: m_oPocListuPrilohTableCellRequire ? [new Gordic.Validators.Required({ message: m_oPocListuRequiredErrorMessage })] : undefined,
//                        //initialValue: "0",
                       
//                    });
//            }
//            if (m_oPocKopiiTableCellVisible) {
//                PocetListuForm
//                    .addField("gnumberbox", "w-2", {
//                        name: "PocKopii",
//                        emptyValue: null,
//                        //initialValue: 0,
//                    })
//                    ;
//            }
//            //#endregion
//            return PocetListuForm.getLastSection().rows;
//        },




//        OutlookFoldersSelector: function (cnt, options) {
//            var defaults = {
//                name: "outlookFoldersSelector",
//                label: "jres:26227485", //RC 26227485 : Složka
//                initialValue: "",
//                model: null, // taky by určitě šla použít nějaká defaultní hodnota         
//            }
//            var settings = $.extend({}, defaults, options);

//            var filterFormPom = new Gordic.Forms.Form().addSection();

//            filterFormPom.addRow(settings.label).addField("gstringbox", { //RC 26227486 : Složka
//                name: settings.name,
//                disabled: true,
//                model: settings.model,
//                change: function (ev, changeObj) {
//                    // that.folderName = changeObj.value;
//                },
//                initialValue: settings.initialValue,
//                buttons: [
//                    {
//                        icon: 'fa-ellipsis-h',
//                        requireEdit: false,
//                        action: new GAction({
//                            name: 'actSelectFolders',
//                            run: function (ev, ctx) {
//                                Gordic.Wfl.Prefabs.MailFoldersSelector(ev, cnt).then(function (rv) {
//                                    var folderName = rv.folderName;
//                                    cnt.findFields(settings.name).gfield("setValue", folderName);

//                                    if(settings.onChange) {
//                                        settings.onChange(ev, folderName);
//                                    }
//                                });
//                            }
//                        })
//                    }
//                ]
//            });

//            return filterFormPom.getLastSection().rows;
//            // return filterTypDbPom.getLastSection();
//        },


//        // pomocne funkce

//        MailFoldersSelector: function (ev, cnt) {
//            var dfd = $.Deferred();
//            cnt.beginOperation();

//            GBrowserExtras.getOutlookAdressDir().then(function (data) {

//                //var foldersSerialized = data.result;
//                cnt.mailFolders = data;

//                var dialogOpts = {
//                    autoClose: false,
//                    related: $(ev.currentTarget), // this.element NOTE: Musi byt table, jinak zlobi padding a pozice.
//                    uid: "gwfloutlookdir#",  
//                    // commandBar: [],
//                    // closeButton: null,
//                    //close: (ev, ctx) => {

//                    //}
//                }
//                var isImmediateClose = true;
//                if(isImmediateClose) {
//                    dialogOpts.createClosed = true; //NOTE: Musi byt vytvoreno skryte a az po vytvoreni otevrit, aby se vyvolala udalost 'open' v momente, kdy jsou jiz registrovane ev. handlery
//                }

//                cnt.foldersDlg = Gordic.InlineDialogs.simpleForm({
//                    formDescriptor: Gordic.Wfl.Prefabs.CreateMailFoldersForm(cnt),
//                    data: { test: "test" },
//                    options: dialogOpts
//                });

//                cnt.foldersDlg.ginlinedialog("open");

//                cnt.foldersDlg.on("close", function (ev, data, meta) {
//                    if(meta.type != "cancel") {
//                       // return dfd.resolve({ folderName: meta.folderName }).promise();
//                        return dfd.resolve({ folderName: cnt.folderNamePom }).promise();
//                    }
//                });

//                cnt.endOperation();

//            }, function (reason) {
//                Gordic.Gui.WebApp.Utils.showReasonFlash(cnt, reason);
//                cnt.endOperation();
//                if(reason && reason.handled === false) {
//                    cnt.showFlash("jres:26227487" + " " + reason.reason, "g-state-error"); //RC 26227487 : Nepodařilo se získat seznam emailových složek.
//                }

//                return dfd.resolve(reason).promise();
//            });

//            return dfd;
//        },
        
//        CreateMailFoldersForm: function (cnt) {
//            var form = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1 LMS-0-12-0" });

//            var treeProcessor = new Gordic.Data.Tree(Gordic.Data.Tree.parentIdOrganizer("parentId"), { defaultState: "closed" });

//            var view = new Gordic.Data.View(cnt.mailFolders, { key: "folderName", processors: { tree: treeProcessor } });

//            var gridOptions = {
//                name: "GridOutlookFolders",
//                userSettings: cnt.userSettings,
//                defaultAction: new GAction({ //obsluzna akce, ktera se spousti dbl clickem nad radkem
//                    name: "gridMailFolderSelectAct",
//                    run: function (ev, ctx) {
//                        var rowData = ctx.cellInfo.data; //data, ze kterych byl vytvoren radek

//                        cnt.folderNamePom = rowData.folderName; // ulozim vybrany radek na content - do budoucna resit asi jinak, alem musim si to nkam ulozit, kvuli tl. OK

//                        cnt.foldersDlg.ginlinedialog("close" /*, { folderName: rowData.folderName }*/);
//                    }
//                }),
//                //selection: 
//                cellActivate: function (ev, row) {
//                    if(row != null && row.cellInfo != null && row.cellInfo.data != null) {
//                        var rowData = row.cellInfo.data; //data, ze kterych byl vytvoren radek
//                        cnt.folderNamePom = rowData.folderName; // ulozim vybrany radek na content - do budoucna resit asi jinak, alem musim si to nkam ulozit, kvuli tl. OK
//                    }
//                },
//                data: view,
//                columnMode: "fit",
//                columns: new Gordic.Data.GridFormat()
//                    .addIconColumn({
//                        name: "icon",
//                        caption: "jres:26227489", //RC 26227489 : Složka
//                        width: 30,
//                        customClass: "center",
//                        fixedWidth: true,
//                        iconTemplate: function (row) {
//                            return { icon: "gi-folder", tooltip: "jres:26227491" }; //RC 26227491 : Email
//                        }
//                    })
//                    .addTextColumn({
//                        name: "folderName",
//                        caption: "jres:26227490", //RC 26227490 : Složka
//                        width: 150,
//                        fixedWidth: true,
//                    })
//            };
//            form.addField("ggrid", gridOptions);

//            return form;
//        },

//        ProvizorniK203SuperFunkceObcuravaciInitialValue: function (initialValue) {
//            var retInitValue = undefined;
//            if (initialValue != null) {
//                // pokud není pole a nemá id
//                if (!$.isArray(initialValue) && initialValue.id == null) {
//                    retInitValue = { id: initialValue };
//                }
//                // pokud je pole ale nemá id
//                else if ($.isArray(initialValue) && initialValue.length > 0 && initialValue[0].id == null) {
//                    retInitValue = [];
//                    initialValue.forEach(function (entry) {
//                        retInitValue.push({ id: entry });
//                    });

//                }
//                // prazdne pole
//                else if ($.isArray(initialValue) && initialValue.length === 0) {
//                    retInitValue = undefined;
//                }
//                // cokoli jineho
//                else {
//                    retInitValue = initialValue;
//                }
//            }
//            return retInitValue;
//        }
//    }, { pure: true });
//})(jQuery);