"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// eslint-disable-next-line @typescript-eslint/no-namespace
var Gordic;
(function (Gordic) {
    var Pok;
    (function (Pok) {
        var WebClient;
        (function (WebClient) {
            let GPokSeznamDokladuTab = class GPokSeznamDokladuTab extends Gordic.GContentBase {
                onContentReady() {
                    var that = this;
                    // flash se stavem knihy
                    Gordic.Eko.Utils.ShowEkoBookStateFlash(this, this.AktSubrady);
                    //filterpanel
                    this.filter = $("<div>").appendTo(this.element).
                        gfilterpanel(Gordic.Eko.Filters.getFilterParams([
                        this.createFilterFormVlastnosti(),
                        this.createFilterFormExterniSubjekt(),
                        this.createFilterFormRozsirenyProfil(),
                        this.createFilterFormPolozkyDokladu(),
                        this.createFilterFormPoznamky(),
                        //this.createFilterFormFulltext(),
                        // this.createFilterFormEet()],
                    ], ["ixp", "up_stav"], "pok_ptm_doklad", "ixs_fun", undefined, null, true, that));
                    if (this.HlaskaKurz)
                        this.notification("showToast", { id: "idKurz", title: "Upozornění", content: this.HlaskaKurz });
                    if (this.HlaskaDph)
                        this.notification("showToast", { id: "idDph", title: "Upozornění", content: this.HlaskaDph });
                    if (this.HlaskaBuc)
                        this.notification("showToast", { id: "idBuc", title: "Upozornění", content: this.HlaskaBuc });
                    if (this.HlaskaKontace)
                        this.notification("showToast", { id: "idKontace", title: "Upozornění", content: this.HlaskaKontace });
                    var gridMultiMenuList = new GActionList({
                        actPokGridMultiEvidovane: {
                            caption: "Vybrat evidované",
                            run: function (ev, ctx) {
                                $(ctx.grid).ggrid("getView").getDataRows(true).forEach(function (meta) { if (meta.data.up_stav == 20)
                                    meta.checked = true; });
                                $(ctx.grid).ggrid("refreshRows");
                            }
                        },
                        actPokGridMultiSchvalene: {
                            caption: "Vybrat schválené",
                            run: function (ev, ctx) {
                                $(ctx.grid).ggrid("getView").getDataRows(true).forEach(function (meta) { if (meta.data.up_stav == 30)
                                    meta.checked = true; });
                                $(ctx.grid).ggrid("refreshRows");
                            }
                        },
                        actPokGridMultiZauctovane: {
                            caption: "Vybrat zaúčtované",
                            run: function (ev, ctx) {
                                $(ctx.grid).ggrid("getView").getDataRows(true).forEach(function (meta) { if (meta.data.fuc_s_zau == 20)
                                    meta.checked = true; });
                                $(ctx.grid).ggrid("refreshRows");
                            }
                        },
                        actPokGridMultiNezauctovane: {
                            caption: "Vybrat nezaúčtované",
                            run: function (ev, ctx) {
                                $(ctx.grid).ggrid("getView").getDataRows(true).forEach(function (meta) { if (meta.data.fuc_s_zau == 0)
                                    meta.checked = true; });
                                $(ctx.grid).ggrid("refreshRows");
                            }
                        },
                        actPokGridMultiStornovane: {
                            caption: "Vybrat stornované",
                            run: function (ev, ctx) {
                                $(ctx.grid).ggrid("getView").getDataRows(true).forEach(function (meta) { if (meta.data.s_sto == 0)
                                    meta.checked = true; });
                                $(ctx.grid).ggrid("refreshRows");
                            }
                        }, actPokGridMultiStornovaci: {
                            caption: "Vybrat stornovací",
                            run: function (ev, ctx) {
                                $(ctx.grid).ggrid("getView").getDataRows(true).forEach(function (meta) { if (meta.data.s_sto == 20)
                                    meta.checked = true; });
                                $(ctx.grid).ggrid("refreshRows");
                            }
                        }
                    });
                    that.gridFormat = this.createGridFormat();
                    //view
                    // view
                    this.view = new Gordic.Isl.View(that.isl.PokDoklad.list(rq => rq
                    //    return {
                    //        fragments: ["POKSPID", "WFLSPID", "GINSESU", "Permissions"],
                    //    };
                    //}
                    ), {
                        filterPanel: that.filter,
                        key: ["ixp"],
                        startEmpty: true,
                    });
                    this.dataKontace = new Gordic.Isl.View(that.isl.PokKontace.list(rq => {
                        return {
                            filters: {
                                ixs_vpk: that.ixsVpk,
                            }
                        };
                    }));
                    //grid
                    this.grid =
                        $("<div>").appendTo(this.element)
                            .gautofit()
                            .ggrid({
                            data: that.view,
                            renderMode: "auto", // auto, all-at-once, paged-sync, paged-async
                            columnMode: "full", // fit, full
                            navigationMode: "row", // row, cell
                            scrollHelperTemplate: "{ac}",
                            searchColumns: ["*"],
                            rowNumbers: true,
                            multi: true,
                            multiMenu: gridMultiMenuList.createBar([
                                "actPokGridMultiEvidovane",
                                "actPokGridMultiSchvalene",
                                "actPokGridMultiZauctovane",
                                "actPokGridMultiNezauctovane",
                                "actPokGridMultiStornovane",
                                "actPokGridMultiStornovaci"
                            ]),
                            columns: that.gridFormat,
                            defaultAction: new GAction({
                                name: "actDetailGrid", run: function (ev, ctx) {
                                    var row;
                                    if (ctx.cellInfo != null) { // doubleclick z gridu
                                        row = ctx.cellInfo.data;
                                    }
                                    else if (ctx.comparatorItem != null) { // pokud bylo spuštěno z porovnávače, bude předán comparatorItem
                                        row = ctx.comparatorItem;
                                    }
                                    else { //jinak je potřeba načíst vysvícený řádek v gridu
                                        row = that.grid.ggrid("activeRow");
                                    }
                                    that.openDetail(row, false);
                                }
                            }),
                            cellActivate: function (ev, ctx) {
                                if (ctx != null && ctx.cellInfo != null && ctx.cellInfo.data != null) {
                                    that.previewController.enable(true);
                                    that.previewController.show(ctx.cellInfo.data);
                                }
                                else {
                                    that.previewController.enable(false);
                                }
                            },
                            profiles: [{
                                    name: "Výchozí pohled", _locked: true, _default: true,
                                    ///doplnit ještě 3 společné sloupce
                                    columnList: "typ_entity_ico,vlastnictvi,el_prilohy_pocet,el_obraz_typ,uzo,priz_spis,int_dok,s_sto,ixp,ktg_typ,up_stav_txt,fuc_s_zau_txt,zpus_platby_txt,dat_vyst,dat_evid_time,ac,popis,c_celkem,c_celkem_m,kurz_doklad,esu_txt,ixs_fun_nazev_rf,typ_pok_txt,ktg_dok_txt,druh_dok_txt,ixp_den_txt,s_tis_txt,ixs_fun_vyriz_txt,ps_sml_ac,slozitel,id_ext,kontace,sloupecvs",
                                    condFormats: 
                                    //    [
                                    //    //{ description: "Neaktivní", formula: "IF(NOT(ISBLANK(@up_stav)) and ((@up_stav == 10) or (@up_stav == 38)), true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.purple },
                                    //    //{ description: "Neaktivní", formula: "IF(NOT(ISBLANK(@aktivita)) and (@aktivita != 100), true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.purple },
                                    //    //{ description: "Stornovaný", formula: "IF(NOT(ISBLANK(@s_sto)) and (@s_sto == 0), true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.red },
                                    //    //{ description: "Stornovací", formula: "IF(NOT(ISBLANK(@s_sto)) and (@s_sto == 20), true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.orange }
                                    //]                              
                                    Gordic.Eko.Grid.getCondFormats({ type: Gordic.Eko.Utils.RecordFormatType.Schvaleno, options: { description: "Schválený", formula: "IF(NOT(ISBLANK(@up_stav))  and NOT(ISBLANK(@fuc_s_zau)) and ((@up_stav == 30) or (@fuc_s_zau == 0)), true, false, false)" } }, { type: Gordic.Eko.Utils.RecordFormatType.Realizovano, options: { description: "Zaúčtovaný", formula: "IF(NOT(ISBLANK(@up_stav))  and NOT(ISBLANK(@fuc_s_zau)) and ((@up_stav == 30) or (@fuc_s_zau == 20)), true, false, false)" } }, { type: Gordic.Eko.Utils.RecordFormatType.Stornovano, options: { description: "Stornovaný", formula: "IF(NOT(ISBLANK(@s_sto)) and (@s_sto == 0), true, false, false)" } }, { type: Gordic.Eko.Utils.RecordFormatType.Stornovano, options: { description: "Stornovací", formula: "IF(NOT(ISBLANK(@s_sto)) and (@s_sto == 20), true, false, false)" } }, { type: Gordic.Eko.Utils.RecordFormatType.Vyrazeno, options: { description: "Neaktivní", formula: "IF(NOT(ISBLANK(@up_stav)) and ((@up_stav == 10) or (@up_stav == 38)), true, false, false)" } }, { type: Gordic.Eko.Utils.RecordFormatType.Vyrazeno, options: { description: "Neaktivní", formula: "IF(NOT(ISBLANK(@aktivita)) and (@aktivita != 100), true, false, false)" } })
                                }]
                        })
                            .ggrideko({
                            // součtový řádek
                            summaryRowAllowed: true,
                            // dlouhý seznam
                            longListAllowed: true,
                            //longListModel: "Global.Pok.AppSettings",
                            longListCountMethod: (rq) => that.isl.PokDoklad.countList(rq).get()
                        })
                            .ggridrowscalc();
                    var focusFunc = function () {
                        that.grid.ggrid("focus");
                        that.view.off("change.focus", focusFunc);
                    };
                    this.view.on("change.focus", focusFunc);
                    that.actions.addRange({
                        //**********************************************************************
                        //  T L A Č Í T K O   -   P o d á n í
                        actPodani: Gordic.Eko.Action.actionPodat({
                            run: function (ev, ctx) {
                                // that.podaniDokladu()
                                Gordic.Pok.WebClient.GPokWebDoklad.promisePodaniDokladu(that, true, that.GinGenIxp, 10 /* Hpl.Interface.DruhDokladu.nedanovy */, 1500 /* Hpl.Interface.KategorieTypu.prijmovy */, false)
                                    .done(function (ixp) {
                                    that.openDetail(ixp, true);
                                })
                                    .fail(function (zprava) {
                                    Gordic.Pok.WebClient.GPokFlash.showFlashError(that, zprava);
                                });
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePodat : undefined,
                        }),
                        actPodaniPrijem: Gordic.Eko.Action.actionPodat({
                            caption: "Nový příjem",
                            run: function (ev, ctx) {
                                // that.podaniDokladu()
                                Gordic.Pok.WebClient.GPokWebDoklad.promisePodaniDokladu(that, true, that.GinGenIxp, 10 /* Hpl.Interface.DruhDokladu.nedanovy */, 1500 /* Hpl.Interface.KategorieTypu.prijmovy */, true)
                                    .done(function (ixp) {
                                    that.openDetail(ixp, true);
                                })
                                    .fail(function (zprava) {
                                    Gordic.Pok.WebClient.GPokFlash.showFlashError(that, zprava);
                                });
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePodat : undefined,
                        }),
                        actPodaniVydej: Gordic.Eko.Action.actionPodat({
                            caption: "Nový výdej",
                            run: function (ev, ctx) {
                                // that.podaniDokladu()
                                Gordic.Pok.WebClient.GPokWebDoklad.promisePodaniDokladu(that, true, that.GinGenIxp, 10 /* Hpl.Interface.DruhDokladu.nedanovy */, 1510 /* Hpl.Interface.KategorieTypu.vydajovy */, true)
                                    .done(function (ixp) {
                                    that.openDetail(ixp, true);
                                })
                                    .fail(function (zprava) {
                                    Gordic.Pok.WebClient.GPokFlash.showFlashError(that, zprava);
                                });
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePodat : undefined,
                        }),
                        actPodaniPrijemDanovy: Gordic.Eko.Action.actionPodat({
                            caption: "Nový daňový příjem",
                            run: function (ev, ctx) {
                                // that.podaniDokladu()
                                Gordic.Pok.WebClient.GPokWebDoklad.promisePodaniDokladu(that, true, that.GinGenIxp, 0 /* Hpl.Interface.DruhDokladu.danovy */, 1500 /* Hpl.Interface.KategorieTypu.prijmovy */, true)
                                    .done(function (ixp) {
                                    that.openDetail(ixp, true);
                                })
                                    .fail(function (zprava) {
                                    Gordic.Pok.WebClient.GPokFlash.showFlashError(that, zprava);
                                });
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePodatDanovy : undefined,
                        }),
                        actPodaniVydejDanovy: Gordic.Eko.Action.actionPodat({
                            caption: "Nový daňový výdej",
                            run: function (ev, ctx) {
                                // that.podaniDokladu()
                                Gordic.Pok.WebClient.GPokWebDoklad.promisePodaniDokladu(that, true, that.GinGenIxp, 0 /* Hpl.Interface.DruhDokladu.danovy */, 1510 /* Hpl.Interface.KategorieTypu.vydajovy */, true)
                                    .done(function (ixp) {
                                    that.openDetail(ixp, true);
                                })
                                    .fail(function (zprava) {
                                    Gordic.Pok.WebClient.GPokFlash.showFlashError(that, zprava);
                                });
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePodatDanovy : undefined,
                        }),
                        actPodaniSablony: Gordic.Eko.Action.actionPodatDleVzoru({
                            run: function (ev, ctx) {
                                that.dialogs.showModalWindow("Gordic.Pok.WebClient.GPokSablonyZkratkyTab", { editMode: false, newTask: true }, "Zkratky pokladních šablon");
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePodaniSablona : undefined,
                            caption: "jres:31302042",
                        }),
                        actDetailZalozka: Gordic.Eko.Action.actionDetailDoZalozky({
                            run: function (ev, ctx) {
                                let row = that.grid.ggrid("activeRow");
                                if (row != null) {
                                    Gordic.WebApp.Utility.openApp({
                                        // identifikace
                                        ixx1: row.ixp,
                                        ixx2: "",
                                        ixx3: "",
                                        // požadovaná agenda (a případně fáze)
                                        typAg: 90,
                                        faze: null,
                                        // povoleno použít aktuální fázi
                                        banCurrentApp: false,
                                        // výjimka při nenalezení žádné cílové fáze
                                        noAppFail: false
                                    }, 
                                    // požadovaná metoda
                                    "OpenDetail");
                                }
                            },
                            enabled: true
                        }),
                        actDetail: Gordic.Eko.Action.actionDetail({
                            run: function (ev, ctx) {
                                let row = that.grid.ggrid("activeRow");
                                if (row != null)
                                    that.openDetail(row, false);
                            },
                            enabled: true
                            // permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePracovat : undefined, 
                        }),
                        actHromadneStorno: Gordic.Eko.Action.actionStornovat({
                            icon: "fa-ban",
                            run: function (ev, ctx) {
                                that.hromadneStorno();
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePracovat : undefined,
                        }),
                        actPredani: Gordic.Eko.Action.actionPredat({
                            run: function (ev, ctx) {
                                let sel = that.grid.ggrid("getSelection", false, false);
                                if (sel.length == 0) {
                                    Gordic.Pok.WebClient.GPokFlash.showFlashWarning(this, "Není vybrán žádný doklad");
                                    return;
                                }
                                //nastavení na stav 0, jinak už byly v okně hromadných operací nastaveny jako succes a byly tam zelené fajfky
                                sel.forEach(function (x) {
                                    x.wiz_kind = 0;
                                });
                                let detailWindow = that.navigate("Gordic.Pok.WebClient.GPokHromadnePredaniTab", {
                                    pokDoklady: sel, ixpDen: that.pokKniha.ixp_den, subrada: that.subrada
                                });
                                var windowContent = $.content(detailWindow);
                                windowContent.close(function (returnData) {
                                    if (returnData) {
                                        that.beginOperation("Aktualizuji data");
                                        that.filter.gfilterpanel("applyFilter");
                                        that.endOperation();
                                    }
                                });
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePredani : undefined,
                        }),
                        actPrideleni: Gordic.Eko.Action.actionPridelit({
                            run: function (ev, ctx) {
                                let sel = that.grid.ggrid("getSelection", false, false);
                                if (sel.length == 0) {
                                    Gordic.Pok.WebClient.GPokFlash.showFlashWarning(this, "Není vybrán žádný doklad");
                                    return;
                                }
                                //nastavení na stav 0, jinak už byly v okně hromadných operací nastaveny jako succes a byly tam zelené fajfky
                                sel.forEach(function (x) {
                                    x.wiz_kind = 0;
                                });
                                let detailWindow = that.navigate("Gordic.Pok.WebClient.GPokHromadnePrideleniTab", {
                                    pokDoklady: sel, ixpDen: that.pokKniha.ixp_den, subrada: that.subrada
                                });
                                var windowContent = $.content(detailWindow);
                                windowContent.close(function (returnData) {
                                    if (returnData) {
                                        that.beginOperation("Aktualizuji data");
                                        that.filter.gfilterpanel("applyFilter");
                                        that.endOperation();
                                    }
                                });
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePrideleni : undefined,
                        }),
                        actPredaniDoPpd: {
                            caption: "Předat do PPD",
                            icon: "gi-convert",
                            run: function (ev, ctx) {
                                that.predaniDoPpd();
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePredaniPpd : undefined
                            //visible pouze v POK , obdobná akce v PPD na předání do POK
                        },
                        actPredaniDoPok: {
                            caption: "Předat do POK",
                            icon: "gi-convert",
                            run: function (ev, ctx) {
                                that.predaniDoPok();
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePredaniPok : undefined
                            //visible pouze v POK , obdobná akce v PPD na předání do POK
                        },
                        actPrevzetiPpd: {
                            caption: "Převzít do PPD",
                            icon: "gi-convert",
                            run: function (ev, ctx) {
                                that.prevzetiDoPpd();
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePrevzitPpd : undefined
                        },
                        actPredaniDoJineKnihy: Gordic.Eko.Action.actionPreevidovat({
                            //caption: "Předání do jiné knihy",
                            //icon: "gi-redistribuce",
                            run: function (ev, ctx) {
                                //that.dialogs.messageBox("Předání do jiné knihy", "Komponenta Gordic.Hpl.WinClient.GPredatDokumentyDoJineKnihy");
                                that.predaniDoJineKnihy();
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePredaniJinaKniha : undefined
                        }),
                        actPrevzeti: Gordic.Eko.Action.actionPrevzit({
                            run: function (ev, ctx) {
                                that.hromadnePrevzeti();
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePracovat : undefined,
                        }),
                        actKlicovaSlova: {
                            caption: "Klíčová slova",
                            icon: "gi-key",
                            run: function (ev, ctx) {
                                that.dialogs.messageBox("Klíčová slova", "Společná komponenta Gordic.Wfl.WinClient.GKlicovaSlovaTab");
                                //  Gordic.Wfl.Dialogs.VyberKlicSlovDlg(that, null, undefined);
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePracovat : undefined,
                        },
                        actSoucetDokladu: {
                            caption: "Součet dokladů",
                            icon: "gi-suma",
                            run: function (ev, ctx) {
                                that.soucetDokladu();
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePracovat : undefined,
                        },
                        actKontrolaMetadat: Gordic.Eko.Action.actionKontrolaMetadat({
                            run: function (ev, ctx) {
                                that.kontrolaMetadat();
                            }
                        }),
                        actVycetka: {
                            caption: "Výčetka",
                            icon: "gi-calc",
                            run: function (ev, ctx) {
                                let soucetVybranychDokladu = new Decimal(0);
                                var dataRows = that.grid.ggrid("getSelection");
                                if (dataRows.length < 1) {
                                }
                                else {
                                    dataRows.forEach(function (row) {
                                        soucetVybranychDokladu = Decimal.add(soucetVybranychDokladu, parseDecimal(row.c_celkem_m));
                                    });
                                }
                                var ParamsJSON = { castkaArray: [parseDecimal(soucetVybranychDokladu)] };
                                that.navigate("Gordic.Pok.WebClient.GPokVycetkaTab", ParamsJSON);
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePracovat : undefined,
                        },
                        actHromadneUctovani: Gordic.Eko.Action.actionZauctovat({
                            run: function (ev, ctx) {
                                that.hromadneUctovani();
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzeUctovani : undefined,
                        }),
                        actHromadneKonChod: {
                            caption: "Kontrolní chod",
                            icon: "gi-generate",
                            run: function (ev, ctx) {
                                that.hromadnyKonChod();
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzePracovat : undefined,
                        },
                        actTiskUcetniDoklady: {
                            caption: "jres:31302420", //RC 31302420 : Tisk účetních dokladů      
                            icon: "gi-print",
                            run: function (ev, ctx) {
                                that.tiskUcetni();
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzeTisk : undefined,
                        },
                        actTiskSeznamDokladu: {
                            caption: "jres:31302421", //RC 31302421 : Tisk seznamu dokladů
                            icon: "gi-print",
                            run: function (ev, ctx) {
                                that.tiskSeznam();
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzeTisk : undefined,
                        },
                        actTiskKnihy: {
                            caption: "jres:31302422", //RC 31302422 :  Tisk knihy
                            icon: "gi-print",
                            run: function (ev, ctx) {
                                that.tiskKniha();
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzeTisk : undefined,
                        },
                        actTiskPokladnichDokladu: {
                            caption: "jres:31302330", //RC 31302330 : Tisk pokladních dokladů
                            icon: "gi-print",
                            run: function (ev, ctx) {
                                that.tiskPokladni();
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzeTisk : undefined,
                        },
                        actTiskNahledu: {
                            caption: "Tisk náhledu",
                            icon: "gi-print",
                            run: function (ev, ctx) {
                                that.tiskNahled();
                            },
                            permission: this.pokKniha.Permissions ? this.pokKniha.Permissions.LzeTisk : undefined,
                        }
                    });
                    this.menuBar(this.actions.createBar([
                        "actPodani*",
                        "actPodaniPrijem*",
                        "actPodaniVydej*",
                        "actPodaniPrijemDanovy",
                        "actPodaniVydejDanovy",
                        "actPodaniSablony",
                        "actDetail*",
                        "actDetailZalozka*",
                        "actPredani*",
                        "actPrevzeti*",
                        "actPrideleni",
                        "actPredaniDoPpd",
                        "actPredaniDoPok",
                        "actPrevzetiPpd",
                        "actPredaniDoJineKnihy",
                        "actKontrolaMetadat",
                        "actKlicovaSlova",
                        "actHromadneStorno*",
                        "actHromadneUctovani*",
                        "actHromadneKonChod*",
                        "actSoucetDokladu*",
                        "actVycetka*",
                        ["Tisky*",
                            "actTiskUcetniDoklady",
                            "actTiskSeznamDokladu*",
                            "actTiskPokladnichDokladu",
                            "actTiskKnihy*",
                            "actTiskNahledu",
                        ]
                    ]));
                    //this.menuBar([
                    //    { action: this.actions.actPodani, favorite: true },
                    //    { action: this.actions.actPodaniSablony, favorite: true },
                    //    { action: this.actions.actDetail, favorite: true },
                    //    { action: this.actions.actHromadneStorno, favorite: true },
                    //    { action: this.actions.actPredani, favorite: true },
                    //    { action: this.actions.actPrideleni, favorite: true },
                    //    { action: this.actions.actPredaniDoPpd, favorite: true },
                    //    { action: this.actions.actPredaniDoJineKnihy, favorite: true },
                    //    { action: this.actions.actPrevzeti, favorite: true },
                    //    { action: this.actions.actKlicovaSlova, favorite: true },
                    //    { action: this.actions.actHromadneUctovani, favorite: true },
                    //    { action: this.actions.actHromadneKonChod, favorite: true },
                    //    { action: this.actions.actSoucetDokladu, favorite: true },
                    //    { action: this.actions.actVycetka, favorite: true },
                    //    { action: this.actions.actTiskUcetniDoklady, favorite: true },
                    //    { action: this.actions.actTiskSeznamDokladu, favorite: true },
                    //    { action: this.actions.actTiskPokladnichDokladu, favorite: true },
                    //    { action: this.actions.actTiskKnihy, favorite: true },
                    //    { action: this.actions.actTiskNahledu, favorite: true }
                    //]);
                    var previewPanelsDefinition = {
                        tabs: [
                            Gordic.Previews.getDefaultPreviewTab({
                                viewId: "hpl:DokladPreview" // id preview, které má být zobrazeno, případně funkce která podle loadParams vrátí viewId
                            }),
                            Gordic.Previews.getFilePreviewTab({
                                ixpProvider: function (loadParams) { return loadParams.ixp; } // funkce, která má za úkol poskytnout ixp pro načtení el. obrazu
                                //caption: "Náhled" // titulek záložky
                            })
                        ]
                    };
                    this.previewController = new Gordic.Previews.GPreviewController(this.element, previewPanelsDefinition);
                }
                predaniDoPpd() {
                    var that = this;
                    var sel = that.grid.ggrid("getSelection", false, false);
                    if (sel.length == 0) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(this, "Není vybrán žádný doklad");
                        return;
                    }
                    //nastavení na stav 0, jinak už byly v okně hromadných operací nastaveny jako succes a byly tam zelené fajfky
                    sel.forEach(function (x) {
                        x.wiz_kind = 0;
                    });
                    let detailWindow = that.navigate("Gordic.Pok.WebClient.GPokHromadnePredaniPpdTab", {
                        pokDoklady: sel
                    });
                    var windowContent = $.content(detailWindow);
                    windowContent.close(function (returnData) {
                        if (returnData) {
                            that.beginOperation("Aktualizuji data");
                            that.filter.gfilterpanel("applyFilter");
                            that.endOperation();
                        }
                    });
                }
                predaniDoPok() {
                    var that = this;
                    var sel = that.grid.ggrid("getSelection", false, false);
                    if (sel.length == 0) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(this, "Není vybrán žádný doklad");
                        return;
                    }
                    //nastavení na stav 0, jinak už byly v okně hromadných operací nastaveny jako succes a byly tam zelené fajfky
                    sel.forEach(function (x) {
                        x.wiz_kind = 0;
                    });
                    let detailWindow = that.navigate("Gordic.Pok.WebClient.GPokHromadnePredaniPokTab", {
                        pokDoklady: sel
                    });
                    var windowContent = $.content(detailWindow);
                    windowContent.close(function (returnData) {
                        if (returnData) {
                            that.beginOperation("Aktualizuji data");
                            that.filter.gfilterpanel("applyFilter");
                            that.endOperation();
                        }
                    });
                }
                prevzetiDoPpd() {
                    var that = this;
                    var sel = that.grid.ggrid("getSelection", false, false);
                    if (sel.length == 0) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(this, "Není vybrán žádný doklad");
                        return;
                    }
                    //nastavení na stav 0, jinak už byly v okně hromadných operací nastaveny jako succes a byly tam zelené fajfky
                    sel.forEach(function (x) {
                        x.wiz_kind = 0;
                    });
                    let detailWindow = that.navigate("Gordic.Pok.WebClient.GPokHromadnePrevzetiPpdTab", {
                        pokDoklady: sel
                    });
                    var windowContent = $.content(detailWindow);
                    windowContent.close(function (returnData) {
                        if (returnData) {
                            that.beginOperation("Aktualizuji data");
                            that.filter.gfilterpanel("applyFilter");
                            that.endOperation();
                        }
                    });
                }
                predaniDoJineKnihy() {
                    var that = this;
                    var sel = that.grid.ggrid("getSelection", false, false);
                    if (sel.length == 0) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(this, "Není vybrán žádný doklad");
                        return;
                    }
                    //nastavení na stav 0, jinak už byly v okně hromadných operací nastaveny jako succes a byly tam zelené fajfky
                    sel.forEach(function (x) {
                        x.wiz_kind = 0;
                    });
                    let detailWindow = that.navigate("Gordic.Pok.WebClient.GPokHromadnePredaniKnihaTab", {
                        pokDoklady: sel
                    });
                    var windowContent = $.content(detailWindow);
                    windowContent.close(function (returnData) {
                        if (returnData) {
                            that.beginOperation("Aktualizuji data");
                            that.filter.gfilterpanel("applyFilter");
                            that.endOperation();
                        }
                    });
                }
                hromadnePrevzeti() {
                    var that = this;
                    var sel = that.grid.ggrid("getSelection", false, false);
                    if (sel.length == 0) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(this, "Není vybrán žádný doklad");
                        return;
                    }
                    //nastavení na stav 0, jinak už byly v okně hromadných operací nastaveny jako succes a byly tam zelené fajfky
                    sel.forEach(function (x) {
                        x.wiz_kind = 0;
                    });
                    let detailWindow = that.navigate("Gordic.Pok.WebClient.GPokHromadnePrevzetiTab", {
                        pokDoklady: sel
                    });
                    var windowContent = $.content(detailWindow);
                    windowContent.close(function (returnData) {
                        if (returnData) {
                            that.beginOperation("Aktualizuji data");
                            that.filter.gfilterpanel("applyFilter");
                            that.endOperation();
                        }
                    });
                }
                hromadneStorno() {
                    var that = this;
                    var sel = that.grid.ggrid("getSelection", false, false);
                    if (sel.length == 0) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(this, "Není vybrán žádný doklad");
                        return;
                    }
                    //nastavení na stav 0, jinak už byly v okně hromadných operací nastaveny jako succes a byly tam zelené fajfky
                    sel.forEach(function (x) {
                        x.wiz_kind = 0;
                    });
                    let detailWindow = that.navigate("Gordic.Pok.WebClient.GPokHromadneStornoTab", {
                        pokDoklady: sel
                    });
                    var windowContent = $.content(detailWindow);
                    windowContent.close(function (returnData) {
                        if (returnData) {
                            that.beginOperation("Aktualizuji data");
                            that.filter.gfilterpanel("applyFilter");
                            that.endOperation();
                        }
                    });
                }
                hromadneUctovani() {
                    var that = this;
                    var sel = that.grid.ggrid("getSelection", false, false);
                    if (sel.length == 0) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(this, "Není vybrán žádný doklad");
                        return;
                    }
                    //nastavení na stav 0, jinak už byly v okně hromadných operací nastaveny jako succes a byly tam zelené fajfky
                    sel.forEach(function (x) {
                        x.wiz_kind = 0;
                    });
                    let detailWindow = that.navigate("Gordic.Pok.WebClient.GPokHromadneUctovaniTab", {
                        pokDoklady: sel
                    });
                    var windowContent = $.content(detailWindow);
                    windowContent.close(function (returnData) {
                        if (returnData) {
                            that.beginOperation("Aktualizuji data");
                            that.filter.gfilterpanel("applyFilter");
                            that.endOperation();
                        }
                    });
                }
                hromadnyKonChod() {
                    var that = this;
                    var sel = that.grid.ggrid("getSelection", false, false);
                    if (sel.length == 0) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(this, "Není vybrán žádný doklad");
                        return;
                    }
                    //nastavení na stav 0, jinak už byly v okně hromadných operací nastaveny jako succes a byly tam zelené fajfky
                    sel.forEach(function (x) {
                        x.wiz_kind = 0;
                    });
                    let detailWindow = that.navigate("Gordic.Pok.WebClient.GPokHromadneKonChodTab", {
                        pokDoklady: sel
                    });
                }
                beforeLoadData(filter) {
                    var def = $.Deferred();
                    var that = this;
                    if (that.LongListWarning) {
                        that.isl.PokDoklad.countList(rq => {
                            return {
                                fragments: ["POKSPID", "WFLSPID", "GINSESU", "Permissions"],
                                filters: filter
                            };
                        }).get().done(function (count) {
                            if (count > that.LongListMaxCount) {
                                // záznamů je více než je nastavený limit -> dotaz na uživatele
                                return Gordic.Eko.Grid.confirmListLimit(that, count, that.LongListMaxCount)
                                    .createDialogPromise()
                                    .then(function (data) {
                                    if (data === "yes")
                                        return def.resolve(true);
                                    else
                                        return def.resolve(false);
                                });
                            }
                            else {
                                return def.resolve(true);
                            }
                        });
                    }
                    else {
                        return def.resolve(true);
                    }
                    return def.promise();
                }
                /**
                 * loadData
                 *
                 *
                 */
                loadData(filter) {
                    var that = this;
                    this.beforeLoadData(filter).then(function (data) {
                        if (data) {
                            that.beginOperation("Načítání seznamu pokladních dokladů...");
                            that.isl.PokDoklad.list(rq => {
                                return {
                                    fragments: ["POKSPID", "WFLSPID", "GINSESU", "Permissions"],
                                    filters: filter
                                };
                            }).get().done(function (data) {
                                let view = new Gordic.Data.View(data.data, { key: "ixp" });
                                that.grid.ggrid({
                                    data: view
                                });
                                that.endOperation();
                            });
                        }
                    });
                }
                /**
                * openDetail
                *
                * @param {string} ixp
                */
                openDetail(ixp, podani) {
                    var that = this;
                    var gridRC = new Gordic.Components.GridRC(this.grid);
                    var detailWindow;
                    if (typeof ixp === 'string') {
                        //  var windowOption = { width: screen.availWidth - 100, height: screen.availHeight - 100 };
                        //  var ParamsJSON = { Ixp: ixp, KontrolovatRok: false };
                        detailWindow = that.navigate(["Gordic.Pok.WebClient.GPokDetailDokladuTab", { gridRemoteControl: gridRC }], {
                            ixp: ixp,
                            newPodani: podani,
                            Id: "GPokDetailDokladu#"
                        });
                    }
                    else { //test s GPC
                        //var newGpc = Gordic.Eko.Utils.createBookGpc(this.gpc, row.ixp_den)
                        //this.navigate(["Gordic.Age.WebClient.MujDetail", { gpc: newGpc }], { ixp: row.ixp });
                        var newGpc = Gordic.Eko.Utils.createBookGpc(this.gpc, ixp.ixp_den);
                        detailWindow = that.navigate(["Gordic.Pok.WebClient.GPokDetailDokladuTab", { gpc: newGpc }, { gridRemoteControl: gridRC }], {
                            ixp: ixp.ixp,
                            newPodani: podani,
                            Id: "GPokDetailDokladu#"
                        });
                    }
                    var windowContent = $.content(detailWindow);
                    let changedRows = [];
                    // obsluha aktivní operace na detailu
                    windowContent.on(Gordic.Pok.WebClient.GPokWebBase.triggerChange, (retVal) => {
                        if (retVal?.data?.ixp) {
                            // přidání do seznamu záznamů k občerstvení
                            if (changedRows.indexOf(retVal.data.ixp) < 0)
                                changedRows.push(retVal.data.ixp);
                        }
                    });
                    windowContent.close(function (returnData) {
                        //Pokud vrátím true aktualizuji podle filtru
                        //Pokud je tam řádek dat tak aktualizuji jeden řádek
                        //Null a false nedělá nic
                        var data = returnData;
                        //7.6.2023 - nevím proč se začal volat close když otevřu detail dokladu
                        if (data == undefined)
                            return;
                        if (data === null) //vracím null nemám co aktualizovat
                            return;
                        if (data === true) { //vracím true, to znamená aktualizuj celý seznam podle nastavených filtrů
                            that.beginOperation("Aktualizuji data");
                            that.filter.gfilterpanel("applyFilter");
                            that.endOperation();
                            return;
                        }
                        else if (data == false || data === null) {
                            return;
                        }
                        that.grid.ggrid("getView").updateData(data, "update");
                        that.grid.ggrid("activeRow", { ixp: data.ixp });
                        //ještě pořešit co se záznamy v changeRows
                    });
                }
                //private podaniDokladu(): JQueryPromise<string> {
                //        //stejné podaní aji na detailu
                //        var def = $.Deferred();
                //        var that = this
                //        this.beginOperation("jres:31302224"); //RC 31302224 : Podávám nový doklad
                //        var remotePodani = new GContent("Gordic.Pok.WebClient.GPokWebDetailDokladu");
                //        remotePodani.call("PodaniDokladu", { kontrolaRok: true })
                //            .done(function (r) {
                //                if (r.stav === 1) { // kontorlní otázka
                //                    that.dialogs.messageBox("dotaz", r.text, GDlg.mbbYesNo, GDlg.mbiQuestion)
                //                        .on("yes", function () {
                //                            remotePodani.call("PodaniDokladu", { kontrolaRok: false })
                //                                .done(function (r) {
                //                                    if (r.stav === 0) {
                //                                        def.resolve(r.pid);
                //                                    }
                //                                    else {
                //                                        def.reject();
                //                                    }
                //                                })
                //                                .fail(function (xhr, type, vobj) {
                //                                    def.reject();
                //                                });
                //                        })
                //                        .on("close", function () {
                //                            def.reject();
                //                        });
                //                }
                //                else {
                //                    def.resolve(r.pid);
                //                }
                //            })
                //            .fail(function (xhr, type, vobj) {
                //                def.reject();
                //            })
                //            .always(function () {
                //                that.endOperation()
                //            });
                //       return def.promise();
                //    }
                createFilterFormPolozkyDokladu() {
                    const that = this;
                    return new Gordic.Forms.Form({ tabLabel: "Položky dokladu", layoutDescriptor: "L4M4S2, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" })
                        .addRow("Párovací symbol")
                        .addField("gstringbox", { name: "pokdpep_vs" })
                        .addRow()
                        .addField("gcheck", { name: "pokdpep_vs_prazdny", label: "Prázdný pár. symbol" })
                        .addRow()
                        .addField("gcheck", { name: "pokdpep_vs_neprazdny", label: "Neprázdný pár. symbol" })
                        .addRow("Předkontace")
                        .addField("gselectbox", {
                        name: "pokdpep_kod_kon",
                        model: "pokdpep_kod_kon=kod_kon",
                        //data: that.dataKontace,                       
                        //dropdown: false,
                        itemTemplate: "{kod_kon}",
                        multi: true,
                        selector: function (options) {
                            return new Gordic.Data.Selectors.DefaultSelector({
                                uid: "PokSelectorFilterKontace#",
                                related: that.element,
                                multi: true,
                                gridOpts: {
                                // searchColumns: ["ean, mat_cislo, nazev"]
                                },
                                data: that.dataKontace,
                                gridFormat: new Gordic.Data.GridFormat({ width: 120 })
                                    .addTextColumn({
                                    name: "ktg_typ",
                                    caption: "jres:31302006",
                                    width: 30,
                                    sortable: false,
                                    cellTemplate: function (metarow) {
                                        switch (metarow.ktg_typ) {
                                            case 1500: return "P";
                                            case 1510: return "V";
                                            default: return "";
                                        }
                                    },
                                })
                                    .addTextColumn({
                                    name: "typ_kon",
                                    caption: "Typ kontace",
                                    width: 90
                                })
                                    .addTextColumn({
                                    name: "kod",
                                    caption: "Kód kontace",
                                    width: 90
                                })
                                    .addTextColumn({
                                    name: "nazev",
                                    caption: "Název",
                                    width: 400
                                })
                            }).show();
                        }
                    })
                        .addRow("Popis položky")
                        .addField("gstringbox", { name: "pokdpep_nazev" })
                        .addRow("Poznámka položky")
                        .addField("gstringbox", { name: "pokdpep_poznamka" })
                        .addRow("Externí ID")
                        .addField("gstringbox", { name: "pokdpep_ext_id" })
                        .addRow("Stav zaúčtování 2. kroku")
                        .addField("gselectbox", Gordic.Prefabs.Select.fuccsuoU(), {
                        name: "s_upo_2_krok", model: "s_upo_2_krok=s_upo"
                    })
                        .addSection("Stav párovacích zápisů")
                        .addRow("")
                        .addField("gselectbox", {
                        name: "pokdpep_stav_par_zapisu",
                        multi: true,
                        list: true,
                        itemTemplate: "{nazev}",
                        model: "model.pokdpep_stav_par_zapisu=value.id",
                        data: new Gordic.Data.View([
                            { nazev: "Spárováno manuálně", id: 25 },
                            { nazev: "Spárováno automaticky", id: 20 },
                            { nazev: "Pořízeno", id: 10 },
                            { nazev: "Nespárováno", id: 40 }
                        ], { key: "id" }),
                    })
                        .addSection("Položka SML")
                        .addField("gselectbox", {
                        name: "pokdpep_ixp_sml",
                        multi: false,
                        list: true,
                        itemTemplate: "{nazev}",
                        model: "model.pokdpep_ixp_sml=value.id",
                        data: new Gordic.Data.View([
                            { nazev: "Nerozhoduje", id: 0 },
                            { nazev: "Se smlouvou", id: 1 },
                            { nazev: "Bez smlouvy", id: 2 }
                        ], { key: "id" }),
                    })
                        .addSection("Napojení SML")
                        .addField("gselectbox", {
                        name: "pokdpep_rezerv_sml",
                        multi: false,
                        list: true,
                        itemTemplate: "{nazev}",
                        model: "model.pokdpep_rezerv_sml=value.id",
                        data: new Gordic.Data.View([
                            { nazev: "Nerozhoduje", id: 2 },
                            { nazev: "Napojeno", id: 1 },
                            { nazev: "Nenapojeno", id: 0 }
                        ], { key: "id" }),
                    })
                        .addSection("Prodejní sklady")
                        .addRow()
                        .addField("gcheck", { name: "pokdpep_napojeni_maj", label: "Napojeno na MAJ" })
                        .addSection("Položky účetní skladby")
                        .addRow("Položky účetní skladby")
                        .addField("gselectbox", Gordic.Eko.Prefabs.cfuElements({
                        gridFormat: new Gordic.Data.GridFormat()
                            .add(Gordic.Eko.CfuUtils.getCfuSetEditors(this))
                    }), {
                        name: "cfuDto"
                    });
                }
                createFilterFormFulltext() {
                    return new Gordic.Forms.Form({ tabLabel: "Fulltext", layoutDescriptor: "L4M4S2, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" })
                        .addText("Fulltext control");
                }
                createFilterFormPoznamky() {
                    return new Gordic.Forms.Form({ tabLabel: "Poznámky", layoutDescriptor: "L4M4S2, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" })
                        .addRow("Poznámky")
                        .addField("gstringbox", { name: "wfldpoz_poznamka" })
                        .addRow("Klíčová slova")
                        .addField("gselectbox", Gordic.Prefabs.Select.wflKlicSlova(), {
                        name: "wfliixp_kl_slovo",
                        model: "wfliixp_kl_slovo=kl_slovo",
                        multi: true,
                        dropdown: true,
                        showSelectButton: true,
                        verticalButtons: false
                    });
                }
                createFilterFormRozsirenyProfil() {
                    return new Gordic.Forms.Form({ tabLabel: "Rozšířený profil", layoutDescriptor: "L4M4S2, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" })
                        .addRow()
                        .addText("Políčko rozšířený profil");
                }
                createFilterFormExterniSubjekt() {
                    return new Gordic.Forms.Form({ tabLabel: "Externí subjekt", layoutDescriptor: "L4M4S2, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" })
                        .addSection("Identifikace")
                        .addRow("jres:31302119")
                        .addField("gselectbox", {
                        name: "ixs_esu",
                        model: "model.esu_ixs_esu=value.ixs_esu"
                    }, Gordic.Esu.Prefabs.vyberEsu({
                        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu, // přidání prefabu   
                        Logovani: {
                            Ixp: "0000X0000003", // zadání logovacích údaju je nutnost hlavně IXP
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani, // vybrat z enumu
                            AktZnacka: "",
                            DuvodHledaniTxt: "Maska pokladního dokladu"
                        },
                    }))
                        .addRow()
                        .addField("gcheck", { name: "esu_ekon_subjekt", label: "Ekonomický subjekt" })
                        .addRow("Jméno")
                        .addField("gstringbox", { name: "esu_jmeno" })
                        .addRow("Příjmení")
                        .addField("gstringbox", { name: "esu_prijmeni" })
                        .addRow("RČ")
                        .addField("gstringbox", { name: "esu_rc" })
                        .addRow("OČ")
                        .addField("gstringbox", { name: "esu_oc" })
                        .addRow("Název subjektu")
                        .addField("gstringbox", { name: "esu_cs_nazev" })
                        .addRow("Obchodní jméno")
                        .addField("gstringbox", { name: "esu_ob_jmeno" })
                        .addRow("IČO")
                        .addField("gstringbox", { name: "esu_ico" })
                        .addRow("DIČ")
                        .addField("gstringbox", { name: "esu_dic" })
                        .addRow("Stav insolvence")
                        .addField("gselectbox", Gordic.Prefabs.Select.gincisr(), {
                        name: "esu_insolvence_druh_stav_rizeni",
                        model: "model.esu_insolvence_druh_stav_rizeni=value.druh_stav_rizeni"
                    })
                        .addSection("Adresa")
                        .addRow("Ulice")
                        .addField("gstringbox", { name: "esu_cs_ulice" })
                        .addRow("Číslo popisné")
                        .addField("gstringbox", { name: "esu_cpop" })
                        .addRow("Číslo orientační")
                        .addField("gstringbox", { name: "esu_cor" })
                        .addRow("Část obce")
                        .addField("gstringbox", { name: "esu_cast_obce" })
                        .addRow("Obec")
                        .addField("gstringbox", { name: "esu_cs_obec" })
                        .addRow("PSČ")
                        .addField("gstringbox", { name: "esu_psc" })
                        .addRow("Stát")
                        .addField("gselectbox", Gordic.Prefabs.Select.gincsta(), {
                        name: "esu_stat",
                        model: "model.esu_stat=value.stat"
                    });
                }
                /**
                 * createFilterForm
                 *
                 * @returns {Gordic.Forms.Form}
                 */
                createFilterFormVlastnosti() {
                    var that = this;
                    return new Gordic.Forms.Form({ tabLabel: "Vlastnosti dokladu", layoutDescriptor: "L4M4S2, L-3-8-1, M-12-11-1, S-12-11-1, breaks-700-1000" })
                        .addSection("") //RC 31302058 : Pokladní doklad
                        .addRow("jres:31302226").addField("gstringbox", { name: "ixp" }) //RC 31302226 : Identifikátor
                        .addRow("jres:31302423").addField("gselectbox", Gordic.Prefabs.Select.ekosnks(), //RC 31302423 : NS
                    {
                        name: "ns",
                        model: "model.nks=value.nks"
                    })
                        .addRow("jres:31302424").addField("gselectbox", Gordic.Prefabs.Select.sslstyp(), //RC 31302424 : Typ dokumentu
                    {
                        name: "ixs_typ",
                        model: "model.ixs_typ=value.ixs_typ",
                        serverFilters: { ktg_typ: [1500, 1510] },
                        dropdown: true
                    })
                        .addRow("").addField("gcheck", { name: "priz_int_doklad", label: "jres:31302002" }) //RC 31302002 : Interní doklad
                        .addRow("jres:31302238").addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), //RC 31302238 : Vlastník
                    {
                        name: "ixs_fun",
                        model: "model.ixs_fun=value.ixs_fun"
                    })
                        .addRow("").addField("gcheck", { name: "vlastnik_hist", label: "jres:31302425" }) //RC 31302425 : Hist. vlastník
                        .addRow("jres:31302426").addField("gselectbox", Gordic.Prefabs.Select.pokcktg(), //RC 31302426 : Kategorie doklad
                    {
                        name: "ktg_dok",
                        model: "model.ktg_dok=value.ktg_dok",
                        dropdown: true
                    })
                        .addRow("jres:31302029").addField("gselectbox", Gordic.Prefabs.Select.pokcdru(), //RC 31302029 : Druh dokladu
                    {
                        name: "druh_dok",
                        model: "model.druh_dok=value.druh_dok",
                        dropdown: true
                    })
                        .addSection()
                        .addRow("jres:31302427").addField("gselectbox", Gordic.Prefabs.Select.pokczpp(), //RC 31302427 : Způsob úhrady
                    {
                        name: "zpus_platby",
                        model: "model.zpus_platby=value.zpus_platby",
                        dropdown: true
                    })
                        .addRow("jres:31302031").addField("gselectbox", Gordic.Prefabs.Select.ekoctis(), //RC 31302031 : Stav tisku
                    {
                        name: "s_tis",
                        model: "model.s_tis=value.s_tis",
                        dropdown: true
                    })
                        .addRow("jres:31302428").addField("gselectbox", Gordic.Prefabs.Select.wflcstv(), //RC 31302428 : Stav FK
                    {
                        name: "stav_vyriz",
                        model: "model.stav_fk=value.stav_vyriz",
                        dropdown: true
                    })
                        .addRow("Stav UK").addField("gselectbox", Gordic.Prefabs.Select.wflcstv(), {
                        name: "stav_vyriz_uk",
                        model: "model.stav_uk=value.stav_vyriz",
                        dropdown: true
                    })
                        .addRow("").addField("gcheck", { name: "pouze_vlastni", label: "jres:31302429" }) //RC 31302429 : Pouze vlastní
                        //.addRow("").addField("gcheck", { name: "povolene_knihy", label: "jres:31302430" }) //RC 31302430 : Zobrazit všechny pov. knihy nahrazeno vyberem knihy pred seznamem a vyberem vsechny knihy
                        .addRow("jres:31302431").addField("gselectbox", //RC 31302431 : Přečtení
                    {
                        name: "priz_view",
                        data: [{ hodnota: 1, nazev: "Přečteno" }, { hodnota: 10, nazev: "Nepřečteno" }],
                        model: "model.priz_view=value.hodnota",
                        itemTemplate: "{nazev}",
                        dropdown: true
                    })
                        .addRow("jres:31302013").addField("gstringbox", { name: "popis" }) //RC 31302013 : Popis
                        .addSection("jres:31302432") //RC 31302432 : Stavy dokladu
                        .addRow("jres:31302248").addField("gselectbox", {
                        name: "up_stav",
                        multi: true,
                        list: true,
                        itemTemplate: "{nazev}",
                        itemWidth: "",
                        model: "model.up_stav=value.id",
                        initialValue: [{ id: 15 }, { id: 25 }, { id: 20 }, { id: 30 }, { id: 38 }, { id: 40 }],
                        //helperColumns: ["nazev"],
                        data: new Gordic.Data.View([
                            { nazev: "jres:31302433", id: 10 }, //RC 31302433 : Návrh
                            { nazev: "jres:31302434", id: 15 }, //RC 31302434 : Připraveno
                            { nazev: "jres:31302435", id: 25 }, //RC 31302435 : Předáno
                            { nazev: "jres:31302436", id: 20 }, //RC 31302436 : Evidováno
                            { nazev: "jres:31302437", id: 30 }, //RC 31302437 : Schváleno
                            { nazev: "jres:31302438", id: 38 }, //RC 31302438 : Uzavřeno
                            { nazev: "jres:31302439", id: 40 }, //RC 31302439 : Zaúčtováno
                        ], { key: "id" }),
                    })
                        .addRow("jres:31302440") //RC 31302440 : Účetní případy
                        .addField("gselectbox", {
                        name: "fuc_s_zau",
                        multi: true,
                        list: true,
                        model: "model.fuc_s_zau=value.id",
                        itemTemplate: "{nazev}",
                        itemWidth: "",
                        //helperColumns: ["nazev"],
                        data: new Gordic.Data.View([
                            { nazev: "jres:31302441", id: 20 }, //RC 31302441 : Zaúčtované
                            { nazev: "jres:31302442", id: 0 }, //RC 31302442 : Nezaúčtované                      
                        ], { key: "id" }),
                    })
                        //.addRow({ customClass: "noPinnable", layoutDescriptor: "L-4-5-1, M-0-11-1, S-0-11-1" })
                        //.addField("gbutton", "", {
                        //    params: {
                        //        action: new GAction({
                        //            caption: "jres:31302444", //RC 31302444 : Neschválené
                        //            customClass: ""
                        //            ,
                        //            name: 'actTest2', run: (ev, ctx) => {
                        //                var stavDokladu = that.filter.findFields("up_stav");
                        //                var ucetniPripady = that.filter.findFields("fuc_s_zau");
                        //                stavDokladu.gfield("setValue", [{ id: 15 }, { id: 25 }, { id: 20 }]);
                        //                ucetniPripady.gfield("setValue", [{ id: 0 }, { id: 30 }]);
                        //            }
                        //        })
                        //    }
                        //})
                        //.addField("gbutton", "", {
                        //    params: {
                        //        action: new GAction({
                        //            caption: "jres:31302442", //RC 31302442 : Nezaúčtované
                        //            customClass: "",
                        //            name: 'actTest2', run: function (ev, ctx) {
                        //                //var stavDokladu = $(ev.currentTarget).gformsection().findFields("up_stav");
                        //                //var ucetniPripady = $(ev.currentTarget).gformsection().findFields("fuc_s_zau");
                        //                //stavDokladu.gfield("setValue", [{ id: 4 }, { id: 5 }, { id: 6 }]);
                        //                //ucetniPripady.gfield("setValue", [{ id: 3 }]);
                        //            }
                        //        })
                        //    }
                        //})
                        //.addField("gbutton", "", {
                        //    params: {
                        //        action: new GAction({
                        //            caption: "jres:31302445", //RC 31302445 : Nepřip. k uz.
                        //            customClass: "",
                        //            name: 'actTest2', run: function (ev, ctx) {
                        //                //var stavDokladu = $(ev.currentTarget).gformsection().findFields("stavDokladu");
                        //                //var ucetniPripady = $(ev.currentTarget).gformsection().findFields("ucetniPripady");
                        //                //stavDokladu.gfield("setValue", [{ id: 2 }, { id: 6 }]);
                        //                //ucetniPripady.gfield("setValue", [{ id: 20 }]);
                        //            }
                        //        })
                        //    }
                        //})
                        //.addField("gbutton", "", {
                        //    params: {
                        //        action: new GAction({
                        //            caption: "+",
                        //            customClass: "",
                        //            name: 'actTest2', run: function (ev, ctx) {
                        //                //var stavDokladu = $(ev.currentTarget).gformsection().findFields("stavDokladu");
                        //                //var ucetniPripady = $(ev.currentTarget).gformsection().findFields("ucetniPripady");
                        //                //stavDokladu.gfield("setValue", [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }]);
                        //                //ucetniPripady.gfield("setValue", [{ id: 1 }, { id: 2 }, { id: 3 }]);
                        //            }
                        //        })
                        //    }
                        //})
                        //.addField("gbutton", "", {
                        //    params: {
                        //        action: new GAction({
                        //            caption: "-",
                        //            customClass: "",
                        //            name: 'actTest2', run: function (ev, ctx) {
                        //                //var stavDokladu = $(ev.currentTarget).gformsection().findFields("stavDokladu");
                        //                //var ucetniPripady = $(ev.currentTarget).gformsection().findFields("ucetniPripady");
                        //                //stavDokladu.gfield("setValue", []);
                        //                //ucetniPripady.gfield("setValue", []);
                        //            }
                        //        })
                        //    }
                        //})
                        .addSection("jres:31302052") //RC 31302052 : Storno
                        .addRow("jres:31302446")
                        .addField("gselectbox", {
                        name: "s_sto",
                        multi: true,
                        list: true,
                        itemTemplate: "{nazev}",
                        itemWidth: "",
                        model: "model.s_sto=value.id",
                        data: new Gordic.Data.View([
                            { nazev: "jres:31302447", id: 0 }, //RC 31302447 : Stornované
                            { nazev: "jres:31302448", id: 20 }, //RC 31302448 : Stornovací
                            { nazev: "jres:31302449", id: 10 }, //RC 31302449 : Ostatní
                        ], { key: "id" })
                    })
                        .addText("")
                        .addRow("jres:31302117")
                        .addField("gselectbox", Gordic.Prefabs.Select.ekoVyberSmlouvy({
                        inputDto: {},
                        esuLogovani: {
                            Ixp: "0000X0000003",
                            AktZnacka: "",
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani,
                            DuvodHledaniTxt: "Výběr Smlouvy\Objednávky v masce pokladního dokladu"
                        },
                        parentContent: that
                    }), {
                        name: "ps_sml",
                        model: "model.ps_sml=value.ixp_sml_pri"
                    })
                        //.addRow("Obecné seskupení")
                        .addRow("Stav id. PK")
                        .addField("gselectbox", {
                        name: "s_par",
                        model: "model.s_par=value.id",
                        itemTemplate: "{nazev}",
                        dropdown: true,
                        data: new Gordic.Data.View([
                            { nazev: "Nespárováno", id: 0 },
                            { nazev: "Spárováno částečně", id: 10 },
                            { nazev: "Spárováno", id: 20 },
                        ], { key: "id" })
                    })
                        .addSection("jres:31302167") //RC 31302167 : Datum podání
                        .addRow("Od - Do")
                        .addField("gintervalbox", { name: "dat_vyst" })
                        .addSection("jres:31302450") //RC 31302450 : Datum vystavení
                        .addRow("Od - Do")
                        .addField("gintervalbox", { name: "dat_evid" })
                        .addSection("jres:31302387") //RC 31302387 : Datum splatnosti
                        .addRow("Od - Do")
                        .addField("gintervalbox", { name: "dat_spl" })
                        .addSection("jres:31302451") //RC 31302451 : Datum zdan. plnění
                        .addRow("Od - Do")
                        .addField("gintervalbox", { name: "dat_zdan" })
                        .addSection("jres:31302364") //RC 31302364 : Částka             
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        label: "Od - Do",
                        name: "c_celkem_m",
                        type: "number"
                    }))
                        .addSection("jres:31302012") //RC 31302012 : Agendové číslo   
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        label: "Od - Do",
                        name: "ac",
                        type: "string"
                    }))
                        .addSection("jres:31302452") //RC 31302452 : Číslo účetního dokladu
                        .addPrefab(Gordic.Gin.Prefabs.interval({
                        label: "Od - Do",
                        name: "ac_uctdokl",
                        type: "string"
                    }))
                        .addSection("jres:31302453") //RC 31302453 : Posledních
                        .addRow("jres:31302454").addField("gnumberbox", { name: "zaPosledniXDnu", emptyValue: null, defaultValue: null }) //RC 31302454 : X dnů
                        .addRow("jres:31302455").addField("gnumberbox", { name: "poslednichX", emptyValue: null, defaultValue: null }) //RC 31302455 : X dokladů
                        .addSection("jres:31302456") //RC 31302456 : Hlavička dokladu
                        .addRow("jres:31302457") //RC 31302457 : Stav hlavičky
                        .addField("gselectbox", {
                        name: "s_schval",
                        multi: false,
                        list: true,
                        itemTemplate: "{nazev}",
                        itemWidth: "",
                        model: "model.s_schval=value.id",
                        //helperColumns: ["nazev"],
                        data: new Gordic.Data.View([
                            { nazev: "jres:31302437", id: 1 }, //RC 31302437 : Schváleno
                            { nazev: "jres:31302458", id: 0 }, //RC 31302458 : Neschváleno
                        ], { key: "id" }),
                    });
                    //chybí 
                    //obecne seskupeni 
                    //zakomentováno
                    // posl X dnu - dokladu
                }
                /**
                 * createGridFormat
                 *
                 * @returns {Gordic.Data.GridFormat<Gordic.Hpl.Interface.GPokDokladDto>}
                 */
                createGridFormat() {
                    var gridFormat = new Gordic.Data.GridFormat();
                    var that = this;
                    gridFormat.addIconColumn(Gordic.Wfl.Globals.ListSupport.TypEntityColumnDlg({ withOutDocumentIcon: true }));
                    Gordic.Eko.Grid.Column.addVlastnictvi(gridFormat);
                    // Gordic.Eko.Grid.Column.addVlastnictviARedistribuce(gridFormat);
                    Gordic.Eko.Grid.Column.addPocetElPriloh(gridFormat);
                    Gordic.Eko.Grid.Column.addElObraz(gridFormat);
                    gridFormat.addIconColumn(Gordic.Wfl.Globals.ListSupport.UzoColumn(undefined, function (row) {
                        return row.ixs_fun_akt != that.ixsFun;
                    }, this.globalSettings));
                    gridFormat
                        .addIconColumn(Gordic.Wfl.Globals.ListSupport.StavFKColumn())
                        .addIconColumn(Gordic.Wfl.Globals.ListSupport.StavUKColumn())
                        .addIconColumn({
                        name: "int_dok",
                        fragment: "POKSPID",
                        caption: "jres:31302002",
                        width: 30,
                        sortable: false,
                        description: "Interní doklad",
                        iconTemplate: function (metarow) {
                            switch (metarow.int_dok) {
                                case 0: return { icon: "gin/nic", tooltip: "" };
                                case 1: return { icon: "gi-paper", text: "INTERNÍ", tooltip: "jres:31302002" };
                            }
                        },
                    })
                        .addIconColumn({
                        name: "s_sto",
                        fragment: "POKSPID",
                        caption: "jres:31302052", //RC 31302052 : Storno                    
                        width: 30,
                        sortable: false,
                        description: "Stav storna",
                        iconTemplate: function (metarow) {
                            switch (metarow.s_sto) {
                                case 0: return { icon: "fa-times-circle", text: "STORNO", tooltip: "Storno" };
                                case 10: return { icon: "gin/nic", text: "NESTORNOVÁNO", tooltip: "Nestornováno" };
                                case 20: return { icon: "fa-times-circle-o", text: "STORNOVACÍ", tooltip: "Stornovací" };
                            }
                        },
                    });
                    //.addNumberColumn({ name: "poc_epri", caption: "jres:31302004", description: "Počet elektronických příloh", sortable: false, width: 30 }) //RC 31302004 : PE
                    //.addHtmlColumn(Gordic.Wfl.Globals.ListSupport.ElPrilohyWflColumnDlg()); // Pozor HtmlColumn
                    Gordic.Eko.Grid.Column.addPid(gridFormat, { name: "ixp", field: "ixp" });
                    //Gordic.Eko.Grid.Column.addZkratkaKategorieDokladu(gridFormat, { name: "ktg_typ_zkr", field: "ktg_typ_zkr" });
                    gridFormat.addTextColumn({ name: "ixp", caption: "jres:31302005", width: 110 }) //RC 31302005 : PID
                        .addTextColumn({
                        name: "ktg_typ",
                        caption: "jres:31302006",
                        width: 30,
                        sortable: false,
                        cellTemplate: function (metarow) {
                            switch (metarow.ktg_typ) {
                                case 1500: return "P";
                                case 1510: return "V";
                                default: return "";
                            }
                        },
                    }); //ginckat.ktg_typ_txt //RC 31302006 : Typ dokladu
                    gridFormat.addTextColumn({ name: "up_stav_txt", fragment: "POKSPID", caption: "jres:31302007" }) //pokcups.zp_stav_txt //RC 31302007 : POK - stav dokladu
                        .addNumberColumn({ name: "up_stav", fragment: "POKSPID", caption: "Stav dokladu", visible: false, hidden: true })
                        .addNumberColumn({ name: "aktivita", fragment: "POKSPID", caption: "Aktivita dokladu", visible: false, hidden: true })
                        .addTextColumn({ name: "fuc_s_zau_txt", fragment: "POKSPID", caption: "jres:31302008" }) //fuccsza.s_zau_txt //RC 31302008 : Stav zaúčtování
                        .addNumberColumn({ name: "fuc_s_zau", fragment: "POKSPID", caption: "Stav účtování", visible: false, hidden: true })
                        .addTextColumn({ name: "zpus_platby_txt", fragment: "POKSPID", caption: "jres:31302009" }) //pokczpp.zpus_platby_txt //RC 31302009 : Zp. platby
                        .addDateColumn({ name: "dat_vyst", fragment: "POKSPID", caption: "jres:31302010" }) //RC 31302010 : Dat. podání
                        .addDateTimeColumn({ name: "dat_evid_time", caption: "jres:31302011" }); //RC 31302011 :  Dat. vystavení
                    //Gordic.Eko.Grid.Column.addDatumEvidence(gridFormat, { name: "dat_evid_time", field: "dat_evid_time", fragment: "POKSPID", });
                    Gordic.Eko.Grid.Column.addAgendoveCislo(gridFormat, { name: "ac", field: "ac", fragment: "POKSPID", });
                    Gordic.Eko.Grid.Column.addPopis(gridFormat, { name: "popis", field: "popis", fragment: "POKSPID", });
                    Gordic.Eko.Grid.Column.addCastkaCZK(gridFormat, { name: "c_celkem", field: "c_celkem", fragment: "POKSPID", });
                    Gordic.Eko.Grid.Column.addCastkaCZK(gridFormat, { name: "c_celkem_znamenko", field: "c_celkem_znamenko", caption: "Částka znam. v CZK", fragment: "ZNAMENKO", });
                    Gordic.Eko.Grid.Column.addCastka(gridFormat, { name: "c_celkem_m", field: "c_celkem_m", fragment: "POKSPID", });
                    Gordic.Eko.Grid.Column.addCastka(gridFormat, { name: "c_celkem_m_znamenko", field: "c_celkem_m_znamenko", caption: "Částka znam. v měně", fragment: "ZNAMENKO", });
                    gridFormat.addCurrencyColumn({ name: "kurz_doklad", caption: "Kurz", fragment: "POKSPID", }) //RC 31302017 : Částka v měně            
                        .addTextColumn({ name: "esu_txt", fragment: "GINSESU", caption: "jres:31302020", width: 200 }) //RC 31302020 : Subjekt              
                        .addTextColumn({ name: "typ_pok_txt", fragment: "POKSPID", caption: "jres:31302027" }) //RC 31302027 : Zdroj "typ_pok", "pokctyp","typ_pok","druh_dok_txt
                        .addTextColumn({ name: "ktg_dok_txt", fragment: "POKSPID", caption: "jres:31302028" }) //RC 31302028 : Kategorie dokladu "ktg_dok", "pokcktg","ktg_dok","ktg_dok_txt"
                        .addTextColumn({ name: "druh_dok_txt", fragment: "POKSPID", caption: "jres:31302029" }); //RC 31302029 : Druh dokladu "pokcdru","druh_dok","druh_dok_txt"
                    gridFormat.addTextColumn({ name: "ixs_fun_nazev_rf", fragment: "POKSPID", caption: "Zpracovatel" });
                    gridFormat.addTextColumn({ name: "ixs_fun_vyriz_txt", fragment: "POKSPID", caption: "Kompetent" });
                    gridFormat.addTextColumn({ name: "ps_sml_ac", fragment: "POKSPID", caption: "Smlouva/Objednávka" });
                    gridFormat.addTextColumn({ name: "slozitel", fragment: "POKSPID", caption: "Přijato/Vydáno" });
                    gridFormat.addTextColumn({ name: "id_ext", fragment: "POKSPID", caption: "Externí ID" });
                    gridFormat.addTextColumn({ name: "kontace", fragment: "KONTACE", caption: "Kontace" });
                    gridFormat.addTextColumn({ name: "sloupecvs", fragment: "SLOUPECVS", caption: "Pár. sym." });
                    Gordic.Eko.Grid.Column.addKniha(gridFormat, { name: "ixp_den_txt", field: "ixp_den_txt", fragment: "POKSPID", });
                    gridFormat.addTextColumn({ name: "s_tis_txt", fragment: "POKSPID", caption: "jres:31302031" }); //RC 31302031 : Stav tisku "ekoctis","s_tis","s_tis_txt"
                    return gridFormat;
                }
                tiskSeznam() {
                    var that = this;
                    if (that.grid.ggrid("getSelection").length < 1) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(that, "jres:31302460");
                        return;
                    }
                    var pidy;
                    var ixp_den;
                    that.dialogs.messageBox("jres:31302468", "jres:31302467", GDlg.mbbYesNo, GDlg.mbiQuestion) //RC 31302468 : Tisk seznamu dokladů..
                        .on("yes", function () {
                        pidy = that.grid.ggrid("getSelection").map(function (x) { return "'" + x.ixp + "'"; });
                        ixp_den = that.grid.ggrid("getSelection")[0].ixp_den;
                        actVnitrniTiskSeznam.run();
                    })
                        .on("no", function () {
                        pidy = that.grid.ggrid("getView").getDataRows(false).map(function (x) { return "'" + x.ixp + "'"; });
                        ixp_den = that.grid.ggrid("getSelection")[0].ixp_den;
                        actVnitrniTiskSeznam.run();
                    })
                        .on("close", function () {
                    });
                    var actVnitrniTiskSeznam = GAction.createPrintAction({
                        name: "actPokSeznamDokladuTisk",
                        caption: "jres:31302421", //RC 31302421 : Seznam dokladů
                        tema: "pok_ptm_seznam",
                        serverParameterMethod: "Gordic.Pok.WebClient.GPokWebTisk:SeznamDokladu",
                        reportStarting: function (rep) {
                            rep.customDto = { list_ixp: pidy.join(), ixp_den: ixp_den };
                        }
                    });
                }
                kontrolaMetadat() {
                    let that = this;
                    if (that.grid.ggrid("getSelection").length < 1) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(that, "jres:31302460");
                        return;
                    }
                    const zaznamy = that.grid.ggrid("getSelection").map((row) => row.ixp);
                    if (zaznamy !== null && zaznamy.length > 0) {
                        // volání komponenty
                        Gordic.Eko.Utils.KontrolaMetadat({
                            content: that,
                            listIxp: zaznamy,
                            detailAkce: (cnt, ixp) => that.openDetail(ixp, false)
                        })
                            .done(() => { });
                    }
                }
                tiskKniha() {
                    //  var def = $.Deferred();
                    var form = new Gordic.Forms.Form("L1M1S1")
                        .addRow("OD - DO").addField("gintervalbox", { name: "datum", validators: [new Gordic.Validators.Required()] });
                    var that = this; //this = tato akce
                    var dlg = that.dialogs.simpleForm("jres:31302465", form) //RC 31302465 : Výběr datumu
                        .on({
                        ok: function () {
                            //nacteni dat z formulare po klepnuti na OK
                            var datum = dlg.findFields("datum").gfield("getValue");
                            actVnitrniTiskKniha.customDto = { datum: datum, ixp_den: that.pokKniha.ixp_den };
                            actVnitrniTiskKniha.run();
                            // rep.customDto = { datum: datum };
                            // console.log("datum rep", rep.customDto);
                            // def.resolve();  //zavolanim resolve se zacne generovat
                        },
                        //close: def.reject   //bude-li dialog zavren pred udalosti 'ok', dojde ke zruseni generovani
                    });
                    // return def.promise();
                    var actVnitrniTiskKniha = GAction.createPrintAction({
                        name: "actPokTiskKniha",
                        caption: "jres:31302422", //RC 31302422 :  Tisk knihy
                        tema: "pok_ptm_denik",
                        serverParameterMethod: "Gordic.Pok.WebClient.GPokWebTisk:TiskKnihy",
                        reportStarting: function (rep) {
                        }
                    });
                }
                tiskUcetni() {
                    var that = this;
                    if (that.grid.ggrid("getSelection").length < 1) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(that, "jres:31302460");
                        return;
                    }
                    var actVnitrniTiskUcetni = GAction.createPrintAction({
                        name: "actPokUcetniDoklady",
                        caption: "jres:31302461", //RC 31302461 : četní doklady
                        tema: "eko_ptm_dokzau",
                        serverParameterMethod: "Gordic.Pok.WebClient.GPokWebTisk:UcetniDoklady",
                        reportStarting: function (rep) {
                            var pidy = that.grid.ggrid("getSelection").map(function (x) { return "'" + x.ixp + "'"; });
                            rep.customDto = { list_ixp: pidy.join() };
                        }
                    });
                    actVnitrniTiskUcetni.run();
                }
                tiskNahled() {
                    var that = this;
                    var dataRows = that.grid.ggrid("getSelection");
                    if (dataRows.length < 1) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(that, "jres:31302460");
                        return;
                    }
                    var arrayIxp = dataRows.map(function (x) { return x.ixp; });
                    var l_sPrintNahled = "Gordic.Pok.WebClient.GPokWebTisk:PokladniDokladNahled";
                    var actPrintNahled = GAction.createPrintAction({
                        name: "actTiskNahledu",
                        caption: "jres:31302110", //GResources.GetResourceText(31302110)
                        tema: "pok_ptm_nahled",
                        serverParameterMethod: l_sPrintNahled,
                        reportStarting: function (rep) {
                            rep.customDto = { list_ixp: arrayIxp, ixp_den: that.pokKniha.ixp_den };
                        }
                    });
                    actPrintNahled.run();
                }
                soucetDokladu() {
                    var that = this;
                    var dataRows = that.grid.ggrid("getSelection");
                    if (dataRows.length < 1) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(that, "jres:31302460");
                        return;
                    }
                    let soucetVybranychDokladu;
                    let soucetVybranychVlastnich;
                    let pocetVybranych = 0;
                    let pocetVybranychVlastnich = 0;
                    soucetVybranychDokladu = new Decimal(0);
                    soucetVybranychVlastnich = new Decimal(0);
                    dataRows.forEach(function (row) {
                        soucetVybranychDokladu = Decimal.add(soucetVybranychDokladu, parseDecimal(row.c_celkem_m));
                        pocetVybranych++;
                        if (row.ixs_fun != null && row.ixs_fun === that.ixsFun) {
                            soucetVybranychVlastnich = Decimal.add(soucetVybranychVlastnich, parseDecimal(row.c_celkem_m));
                            pocetVybranychVlastnich++;
                        }
                    });
                    let msg = "Počet vybraných dokladů: \t" + pocetVybranych.toString() + "\n" +
                        "Součet vybraných dokladů: \t" + soucetVybranychDokladu + " " + that.pokKniha.mena_zkr + "\n" +
                        "\n" +
                        "Počet vlastních vybraných dokladů: \t" + pocetVybranychVlastnich.toString() + "\n" +
                        "Součet vlastních vybraných dokladů: \t" + soucetVybranychVlastnich + " " + that.pokKniha.mena_zkr + "\n";
                    that.dialogs.alert("Součet vybraných dokladů", msg, 200, 200);
                }
                tiskPokladni() {
                    var that = this;
                    var dataRows = that.grid.ggrid("getSelection");
                    if (dataRows.length < 1) {
                        Gordic.Pok.WebClient.GPokFlash.showFlashWarning(that, "jres:31302460");
                        return;
                    }
                    var arrayIxp = dataRows.map(function (x) { return x.ixp; });
                    var vyskytOpisu = false;
                    var vyskytOriginalu = false;
                    var listDanove;
                    var listNedanove;
                    var listZjednodusene;
                    var listVynechane;
                    var returnPidy;
                    var result = that.call("SestavSeznamyVybranychProTisk", { listIxp: arrayIxp })
                        .done(function (data) {
                        returnPidy = data;
                        if (data.seznamDanove.length > 0) {
                            actVnitrniTiskDanove.customDto = { list_ixp: data.seznamDanove.join(), vyskytOpisu: data.vyskytOpisu };
                            actVnitrniTiskDanove.run();
                        }
                        if (data.seznamNedanove.length > 0) {
                            actVnitrniTiskNedanove.customDto = { list_ixp: data.seznamNedanove.join(), vyskytOpisu: data.vyskytOpisu };
                            actVnitrniTiskNedanove.run();
                        }
                        if (data.seznamZjednodusene.length > 0) {
                            actVnitrniTiskZjedDanove.customDto = { list_ixp: data.seznamZjednodusene.join(), vyskytOpisu: data.vyskytOpisu };
                            actVnitrniTiskZjedDanove.run();
                        }
                        if (data.seznamVynechane.length > 0) {
                            that.dialogs.alert("jres:31302464" + data.seznamVynechane.length + "/" + arrayIxp.length); //RC 31302464 : Počet vynechaných netisknutelných dokladů : 
                        }
                    });
                    // #warning vyresit protoze se nactení volá 3krát kdyz tam jsou cvechny 3 typy dokladu
                    var actVnitrniTiskDanove = GAction.createPrintAction({
                        name: "actTiskDanove",
                        caption: "jres:31302180", //RC 31302180 : Tisk daňových dokladů
                        tema: "pok_ptm_dokdan",
                        serverParameterMethod: "Gordic.Pok.WebClient.GPokWebTisk:DokladyDanove",
                        reportStarting: function (rep) {
                            // rep.customDto = { list_ixp: data.seznamDanove.join(), vyskytOpisu: data.vyskytOpisu }
                        },
                        reportFinished: function (event, retVal) {
                            console.log("ReportFinish - danove");
                            that.call("ZaznamenejTisk", { ixp: returnPidy.seznamDanove });
                            that.filter.gfilterpanel("applyFilter");
                        }
                    });
                    var actVnitrniTiskNedanove = GAction.createPrintAction({
                        name: "actTiskNedanove",
                        caption: "jres:31302462", //RC 31302462 : Tisk nedaňových dokladů
                        tema: "pok_ptm_doklad",
                        serverParameterMethod: "Gordic.Pok.WebClient.GPokWebTisk:DokladyNedanove",
                        reportStarting: function (rep) {
                            // rep.customDto = { list_ixp: data.seznamNedanove.join(), vyskytOpisu: data.vyskytOpisu }
                        },
                        reportFinished: function (event, retVal) {
                            console.log("ReportFinish - nedanove");
                            that.call("ZaznamenejTisk", { ixp: returnPidy.seznamNedanove });
                            that.filter.gfilterpanel("applyFilter");
                        }
                    });
                    var actVnitrniTiskZjedDanove = GAction.createPrintAction({
                        name: "actTiskZjedDanovych",
                        caption: "jres:31302463", //RC 31302463 : Tisk zjed. daňových dokladů
                        tema: "pok_ptm_dokzje",
                        serverParameterMethod: "Gordic.Pok.WebClient.GPokWebTisk:DokladyZjedDanove",
                        reportStarting: function (rep) {
                            //rep.customDto = { list_ixp: data.seznamZjednodusene.join(), vyskytOpisu: data.vyskytOpisu }
                        },
                        reportFinished: function (event, retVal) {
                            console.log("ReportFinish - zjed");
                            that.call("ZaznamenejTisk", { ixp: returnPidy.seznamZjednodusene });
                            that.filter.gfilterpanel("applyFilter");
                        }
                    });
                }
            };
            GPokSeznamDokladuTab = __decorate([
                Decorators.gcontent
            ], GPokSeznamDokladuTab);
            WebClient.GPokSeznamDokladuTab = GPokSeznamDokladuTab;
        })(WebClient = Pok.WebClient || (Pok.WebClient = {}));
    })(Pok = Gordic.Pok || (Gordic.Pok = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1Bva1Nlem5hbURva2xhZHVUYWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHUG9rU2V6bmFtRG9rbGFkdVRhYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0EsMkRBQTJEO0FBQzNELElBQVUsTUFBTSxDQTRyRWY7QUE1ckVELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTRyRW5CO0lBNXJFZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNHJFN0I7UUE1ckVvQixXQUFBLFNBQVM7WUFLMUIsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxPQUFBLFlBQW9GO2dCQTRCMUgsY0FBYztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLHdCQUF3QjtvQkFDeEIsT0FBQSxHQUFHLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBR3ZELGFBQWE7b0JBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7d0JBQzNDLFlBQVksQ0FDUixNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQ2pDO3dCQUNPLElBQUksQ0FBQywwQkFBMEIsRUFBRTt3QkFDakMsSUFBSSxDQUFDLDhCQUE4QixFQUFFO3dCQUNyQyxJQUFJLENBQUMsK0JBQStCLEVBQUU7d0JBQ3RDLElBQUksQ0FBQyw4QkFBOEIsRUFBRTt3QkFDckMsSUFBSSxDQUFDLHdCQUF3QixFQUFFO3dCQUMvQixrQ0FBa0M7d0JBQ2xDLCtCQUErQjtxQkFDbEMsRUFDRCxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsRUFDbEIsZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLENBRVAsQ0FDSixDQUFBO29CQUdMLElB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Q0FBQzt3QkFDNUMsQ0FBQztxQkFDSixDQUFDLENBQUM7Z0JBSVgsQ0FBQzthQUVBLENBQUE7WUFyckVZLG9CQUFvQjtnQkFEaEMsVUFBVSxDQUFDLFFBQVE7ZUFDUCxvQkFBb0IsQ0FxckVoQztZQXJyRVksOEJBQW9CLHVCQXFyRWhDLENBQUE7UUFFTCxDQUFDLEVBNXJFb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBNHJFN0I7SUFBRCxDQUFDLEVBNXJFZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBNHJFbkI7QUFBRCxDQUFDLEVBNXJFUyxNQUFNLEtBQU4sTUFBTSxRQTRyRWYiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcclxubmFtZXNwYWNlIEdvcmRpYy5Qb2suV2ViQ2xpZW50IHtcclxuXHJcbiAgIFxyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1Bva1Nlem5hbURva2xhZHVUYWIgZXh0ZW5kcyBHQ29udGVudEJhc2U8R29yZGljLkVrby5VdGlscy5JR0Vrb0Jvb2tFeHRlbnNpb24gJiBHb3JkaWMuRWtvLlV0aWxzLklHTG9uZ0xpc3RMaW1pdD57XHJcblxyXG4gICAgICAgIC8vdGl0bGU6IFwiU2V6bmFtIHBva2xhZG7DrWNoIGRva2xhZMWvXCI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZmlsdGVyOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICBwcml2YXRlIHBva0tuaWhhOiBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rS25paGFEdG87XHJcbiAgICAgICAgcHJpdmF0ZSBpeHNGdW46IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIHByZXZpZXdDb250cm9sbGVyOiBHb3JkaWMuUHJldmlld3MuR1ByZXZpZXdDb250cm9sbGVyO1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZEZvcm1hdDogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvPjtcclxuICAgICAgICBwcml2YXRlIGRhdGFLb250YWNlOiBJc2wuVmlldzxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rc2tvbkR0bz47XHJcbiAgICAgICAgcHJpdmF0ZSBpeHNWcGs6IHN0cmluZztcclxuXHJcbiAgICAgICAgcmVhZG9ubHkgTG9uZ0xpc3RXYXJuaW5nOiBib29sZWFuXHJcblxyXG4gICAgICAgIHJlYWRvbmx5IExvbmdMaXN0TWF4Q291bnQ6IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3OiBJc2wuVmlldzxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvPjtcclxuXHJcbiAgICAgICAgQWt0U3VicmFkeTogbnVtYmVyO1xyXG4gICAgICAgIEdpbkdlbkl4cDogc3RyaW5nO1xyXG4gICAgICAgIEhsYXNrYUt1cno6IHN0cmluZztcclxuICAgICAgICBIbGFza2FEcGg6IHN0cmluZztcclxuICAgICAgICBIbGFza2FCdWM6IHN0cmluZztcclxuICAgICAgICBIbGFza2FLb250YWNlOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3VicmFkYTogc3RyaW5nO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGZsYXNoIHNlIHN0YXZlbSBrbmloeVxyXG4gICAgICAgICAgICBFa28uVXRpbHMuU2hvd0Vrb0Jvb2tTdGF0ZUZsYXNoKHRoaXMsIHRoaXMuQWt0U3VicmFkeSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9maWx0ZXJwYW5lbFxyXG4gICAgICAgICAgICB0aGlzLmZpbHRlciA9ICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpLlxyXG4gICAgICAgICAgICAgICAgZ2ZpbHRlcnBhbmVsKFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uRmlsdGVycy5nZXRGaWx0ZXJQYXJhbXM8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0Rva2xhZEZpbHRlckR0bz4oXHJcbiAgICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRmlsdGVyRm9ybVZsYXN0bm9zdGkoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRmlsdGVyRm9ybUV4dGVybmlTdWJqZWt0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUZpbHRlckZvcm1Sb3pzaXJlbnlQcm9maWwoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRmlsdGVyRm9ybVBvbG96a3lEb2tsYWR1KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUZpbHRlckZvcm1Qb3puYW1reSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLmNyZWF0ZUZpbHRlckZvcm1GdWxsdGV4dCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5jcmVhdGVGaWx0ZXJGb3JtRWV0KCldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbXCJpeHBcIiwgXCJ1cF9zdGF2XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBva19wdG1fZG9rbGFkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaXhzX2Z1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICkgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgKVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLkhsYXNrYUt1cnopXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbihcInNob3dUb2FzdFwiLCB7IGlkOiBcImlkS3VyelwiLCB0aXRsZTogXCJVcG96b3JuxJtuw61cIiwgY29udGVudDogdGhpcy5IbGFza2FLdXJ6IH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuSGxhc2thRHBoKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RpZmljYXRpb24oXCJzaG93VG9hc3RcIiwgeyBpZDogXCJpZERwaFwiLCB0aXRsZTogXCJVcG96b3JuxJtuw61cIiwgY29udGVudDogdGhpcy5IbGFza2FEcGggfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5IbGFza2FCdWMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbihcInNob3dUb2FzdFwiLCB7IGlkOiBcImlkQnVjXCIsIHRpdGxlOiBcIlVwb3pvcm7Em27DrVwiLCBjb250ZW50OiB0aGlzLkhsYXNrYUJ1YyB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLkhsYXNrYUtvbnRhY2UpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbihcInNob3dUb2FzdFwiLCB7IGlkOiBcImlkS29udGFjZVwiLCB0aXRsZTogXCJVcG96b3JuxJtuw61cIiwgY29udGVudDogdGhpcy5IbGFza2FLb250YWNlIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGdyaWRNdWx0aU1lbnVMaXN0ID0gbmV3IEdBY3Rpb25MaXN0KHtcclxuICAgICAgICAgICAgICAgIGFjdFBva0dyaWRNdWx0aUV2aWRvdmFuZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVnlicmF0IGV2aWRvdmFuw6lcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY3R4LmdyaWQpLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8+KFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cyh0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhKSB7IGlmIChtZXRhLmRhdGEudXBfc3RhdiA9PSAyMCkgbWV0YS5jaGVja2VkID0gdHJ1ZTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY3R4LmdyaWQpLmdncmlkKFwicmVmcmVzaFJvd3NcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UG9rR3JpZE11bHRpU2NodmFsZW5lOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWeWJyYXQgc2NodsOhbGVuw6lcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY3R4LmdyaWQpLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8+KFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cyh0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhKSB7IGlmIChtZXRhLmRhdGEudXBfc3RhdiA9PSAzMCkgbWV0YS5jaGVja2VkID0gdHJ1ZTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY3R4LmdyaWQpLmdncmlkKFwicmVmcmVzaFJvd3NcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UG9rR3JpZE11bHRpWmF1Y3RvdmFuZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVnlicmF0IHphw7rEjXRvdmFuw6lcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY3R4LmdyaWQpLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8+KFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cyh0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhKSB7IGlmIChtZXRhLmRhdGEuZnVjX3NfemF1ID09IDIwKSBtZXRhLmNoZWNrZWQgPSB0cnVlOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChjdHguZ3JpZCkuZ2dyaWQoXCJyZWZyZXNoUm93c1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RQb2tHcmlkTXVsdGlOZXphdWN0b3ZhbmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZ5YnJhdCBuZXphw7rEjXRvdmFuw6lcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY3R4LmdyaWQpLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8+KFwiZ2V0Vmlld1wiKS5nZXREYXRhUm93cyh0cnVlKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRhKSB7IGlmIChtZXRhLmRhdGEuZnVjX3NfemF1ID09IDApIG1ldGEuY2hlY2tlZCA9IHRydWU7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGN0eC5ncmlkKS5nZ3JpZChcInJlZnJlc2hSb3dzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFBva0dyaWRNdWx0aVN0b3Jub3ZhbmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZ5YnJhdCBzdG9ybm92YW7DqVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChjdHguZ3JpZCkuZ2dyaWQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0Rva2xhZER0bz4oXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKHRydWUpLmZvckVhY2goZnVuY3Rpb24gKG1ldGEpIHsgaWYgKG1ldGEuZGF0YS5zX3N0byA9PSAwKSBtZXRhLmNoZWNrZWQgPSB0cnVlOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChjdHguZ3JpZCkuZ2dyaWQoXCJyZWZyZXNoUm93c1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIGFjdFBva0dyaWRNdWx0aVN0b3Jub3ZhY2k6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlZ5YnJhdCBzdG9ybm92YWPDrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChjdHguZ3JpZCkuZ2dyaWQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0Rva2xhZER0bz4oXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKHRydWUpLmZvckVhY2goZnVuY3Rpb24gKG1ldGEpIHsgaWYgKG1ldGEuZGF0YS5zX3N0byA9PSAyMCkgbWV0YS5jaGVja2VkID0gdHJ1ZTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoY3R4LmdyaWQpLmdncmlkKFwicmVmcmVzaFJvd3NcIilcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhhdC5ncmlkRm9ybWF0ID0gdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCk7XHJcblxyXG4gICAgICAgICAgICAvL3ZpZXdcclxuICAgICAgICAgICAgLy8gdmlld1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSBuZXcgR29yZGljLklzbC5WaWV3PEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8+KFxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9rRG9rbGFkLmxpc3QoXHJcbiAgICAgICAgICAgICAgICAgICAgcnEgPT4gcnFcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBmcmFnbWVudHM6IFtcIlBPS1NQSURcIiwgXCJXRkxTUElEXCIsIFwiR0lOU0VTVVwiLCBcIlBlcm1pc3Npb25zXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJQYW5lbDogdGhhdC5maWx0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBbXCJpeHBcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRFbXB0eTogdHJ1ZSwgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kYXRhS29udGFjZSA9IG5ldyBHb3JkaWMuSXNsLlZpZXc8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva3Nrb25EdG8+KFxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuUG9rS29udGFjZS5saXN0KFxyXG4gICAgICAgICAgICAgICAgICAgIHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfdnBrOiB0aGF0Lml4c1ZwayxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvL2dyaWRcclxuICAgICAgICAgICAgdGhpcy5ncmlkID1cclxuICAgICAgICAgICAgICAgICQoXCI8ZGl2PlwiKS5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KClcclxuICAgICAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGF0LnZpZXcsICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJNb2RlOiBcImF1dG9cIiwgICAgIC8vIGF1dG8sIGFsbC1hdC1vbmNlLCBwYWdlZC1zeW5jLCBwYWdlZC1hc3luY1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIiwgICAgICAvLyBmaXQsIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbk1vZGU6IFwicm93XCIsICAvLyByb3csIGNlbGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsSGVscGVyVGVtcGxhdGU6IFwie2FjfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hDb2x1bW5zOiBbXCIqXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpTWVudTogZ3JpZE11bHRpTWVudUxpc3QuY3JlYXRlQmFyKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0UG9rR3JpZE11bHRpRXZpZG92YW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdFBva0dyaWRNdWx0aVNjaHZhbGVuZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RQb2tHcmlkTXVsdGlaYXVjdG92YW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdFBva0dyaWRNdWx0aU5lemF1Y3RvdmFuZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RQb2tHcmlkTXVsdGlTdG9ybm92YW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdFBva0dyaWRNdWx0aVN0b3Jub3ZhY2lcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhhdC5ncmlkRm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdERldGFpbEdyaWRcIiwgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC5jZWxsSW5mbyAhPSBudWxsKSB7IC8vIGRvdWJsZWNsaWNrIHogZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gY3R4LmNlbGxJbmZvLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdHguY29tcGFyYXRvckl0ZW0gIT0gbnVsbCkgeyAvLyBwb2t1ZCBieWxvIHNwdcWhdMSbbm8geiBwb3Jvdm7DoXZhxI1lLCBidWRlIHDFmWVkw6FuIGNvbXBhcmF0b3JJdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdyA9IGN0eC5jb21wYXJhdG9ySXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Ugey8vamluYWsgamUgcG90xZllYmEgbmHEjcOtc3QgdnlzdsOtY2Vuw70gxZnDoWRlayB2IGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdyA9IHRoYXQuZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub3BlbkRldGFpbChyb3csIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZTogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHggIT0gbnVsbCAmJiBjdHguY2VsbEluZm8gIT0gbnVsbCAmJiBjdHguY2VsbEluZm8uZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5lbmFibGUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2aWV3Q29udHJvbGxlci5zaG93KGN0eC5jZWxsSW5mby5kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZmlsZXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlbDvWNob3rDrSBwb2hsZWRcIiwgX2xvY2tlZDogdHJ1ZSwgX2RlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy9kb3Bsbml0IGplxaF0xJsgMyBzcG9sZcSNbsOpIHNsb3VwY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwidHlwX2VudGl0eV9pY28sdmxhc3RuaWN0dmksZWxfcHJpbG9oeV9wb2NldCxlbF9vYnJhel90eXAsdXpvLHByaXpfc3BpcyxpbnRfZG9rLHNfc3RvLGl4cCxrdGdfdHlwLHVwX3N0YXZfdHh0LGZ1Y19zX3phdV90eHQsenB1c19wbGF0YnlfdHh0LGRhdF92eXN0LGRhdF9ldmlkX3RpbWUsYWMscG9waXMsY19jZWxrZW0sY19jZWxrZW1fbSxrdXJ6X2Rva2xhZCxlc3VfdHh0LGl4c19mdW5fbmF6ZXZfcmYsdHlwX3Bva190eHQsa3RnX2Rva190eHQsZHJ1aF9kb2tfdHh0LGl4cF9kZW5fdHh0LHNfdGlzX3R4dCxpeHNfZnVuX3Z5cml6X3R4dCxwc19zbWxfYWMsc2xveml0ZWwsaWRfZXh0LGtvbnRhY2Usc2xvdXBlY3ZzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy97IGRlc2NyaXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgZm9ybXVsYTogXCJJRihOT1QoSVNCTEFOSyhAdXBfc3RhdikpIGFuZCAoKEB1cF9zdGF2ID09IDEwKSBvciAoQHVwX3N0YXYgPT0gMzgpKSwgdHJ1ZSwgZmFsc2UsIGZhbHNlKVwiLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LnB1cnBsZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8veyBkZXNjcmlwdGlvbjogXCJOZWFrdGl2bsOtXCIsIGZvcm11bGE6IFwiSUYoTk9UKElTQkxBTksoQGFrdGl2aXRhKSkgYW5kIChAYWt0aXZpdGEgIT0gMTAwKSwgdHJ1ZSwgZmFsc2UsIGZhbHNlKVwiLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LnB1cnBsZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8veyBkZXNjcmlwdGlvbjogXCJTdG9ybm92YW7DvVwiLCBmb3JtdWxhOiBcIklGKE5PVChJU0JMQU5LKEBzX3N0bykpIGFuZCAoQHNfc3RvID09IDApLCB0cnVlLCBmYWxzZSwgZmFsc2UpXCIsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQucmVkIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy97IGRlc2NyaXB0aW9uOiBcIlN0b3Jub3ZhY8OtXCIsIGZvcm11bGE6IFwiSUYoTk9UKElTQkxBTksoQHNfc3RvKSkgYW5kIChAc19zdG8gPT0gMjApLCB0cnVlLCBmYWxzZSwgZmFsc2UpXCIsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQub3JhbmdlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFa28uR3JpZC5nZXRDb25kRm9ybWF0cyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiBFa28uVXRpbHMuUmVjb3JkRm9ybWF0VHlwZS5TY2h2YWxlbm8sIG9wdGlvbnM6IHsgZGVzY3JpcHRpb246IFwiU2NodsOhbGVuw71cIiwgZm9ybXVsYTogXCJJRihOT1QoSVNCTEFOSyhAdXBfc3RhdikpICBhbmQgTk9UKElTQkxBTksoQGZ1Y19zX3phdSkpIGFuZCAoKEB1cF9zdGF2ID09IDMwKSBvciAoQGZ1Y19zX3phdSA9PSAwKSksIHRydWUsIGZhbHNlLCBmYWxzZSlcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdHlwZTogRWtvLlV0aWxzLlJlY29yZEZvcm1hdFR5cGUuUmVhbGl6b3Zhbm8sIG9wdGlvbnM6IHsgZGVzY3JpcHRpb246IFwiWmHDusSNdG92YW7DvVwiLCBmb3JtdWxhOiBcIklGKE5PVChJU0JMQU5LKEB1cF9zdGF2KSkgIGFuZCBOT1QoSVNCTEFOSyhAZnVjX3NfemF1KSkgYW5kICgoQHVwX3N0YXYgPT0gMzApIG9yIChAZnVjX3NfemF1ID09IDIwKSksIHRydWUsIGZhbHNlLCBmYWxzZSlcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdHlwZTogRWtvLlV0aWxzLlJlY29yZEZvcm1hdFR5cGUuU3Rvcm5vdmFubywgb3B0aW9uczogeyBkZXNjcmlwdGlvbjogXCJTdG9ybm92YW7DvVwiLCBmb3JtdWxhOiBcIklGKE5PVChJU0JMQU5LKEBzX3N0bykpIGFuZCAoQHNfc3RvID09IDApLCB0cnVlLCBmYWxzZSwgZmFsc2UpXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6IEVrby5VdGlscy5SZWNvcmRGb3JtYXRUeXBlLlN0b3Jub3Zhbm8sIG9wdGlvbnM6IHsgZGVzY3JpcHRpb246IFwiU3Rvcm5vdmFjw61cIiwgZm9ybXVsYTogXCJJRihOT1QoSVNCTEFOSyhAc19zdG8pKSBhbmQgKEBzX3N0byA9PSAyMCksIHRydWUsIGZhbHNlLCBmYWxzZSlcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdHlwZTogRWtvLlV0aWxzLlJlY29yZEZvcm1hdFR5cGUuVnlyYXplbm8sIG9wdGlvbnM6IHsgZGVzY3JpcHRpb246IFwiTmVha3Rpdm7DrVwiLCBmb3JtdWxhOiBcIklGKE5PVChJU0JMQU5LKEB1cF9zdGF2KSkgYW5kICgoQHVwX3N0YXYgPT0gMTApIG9yIChAdXBfc3RhdiA9PSAzOCkpLCB0cnVlLCBmYWxzZSwgZmFsc2UpXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHR5cGU6IEVrby5VdGlscy5SZWNvcmRGb3JtYXRUeXBlLlZ5cmF6ZW5vLCBvcHRpb25zOiB7IGRlc2NyaXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgZm9ybXVsYTogXCJJRihOT1QoSVNCTEFOSyhAYWt0aXZpdGEpKSBhbmQgKEBha3Rpdml0YSAhPSAxMDApLCB0cnVlLCBmYWxzZSwgZmFsc2UpXCIgfSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZ3JpZGVrbyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvdcSNdG92w70gxZnDoWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5Um93QWxsb3dlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGxvdWjDvSBzZXpuYW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9uZ0xpc3RBbGxvd2VkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2xvbmdMaXN0TW9kZWw6IFwiR2xvYmFsLlBvay5BcHBTZXR0aW5nc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb25nTGlzdENvdW50TWV0aG9kOiAocnEpID0+IHRoYXQuaXNsLlBva0Rva2xhZC5jb3VudExpc3QocnEpLmdldCgpXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZ3JpZHJvd3NjYWxjKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZm9jdXNGdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwiZm9jdXNcIik7XHJcbiAgICAgICAgICAgICAgICAodGhhdC52aWV3IGFzIGFueSkub2ZmKFwiY2hhbmdlLmZvY3VzXCIsIGZvY3VzRnVuYyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMudmlldy5vbihcImNoYW5nZS5mb2N1c1wiLCBmb2N1c0Z1bmMpO1xyXG5cclxuICAgICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAgICAgICAgIC8vICBUIEwgQSDEjCDDjSBUIEsgTyAgIC0gICBQIG8gZCDDoSBuIMOtXHJcbiAgICAgICAgICAgICAgICBhY3RQb2Rhbmk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblBvZGF0ICh7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGF0LnBvZGFuaURva2xhZHUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rV2ViRG9rbGFkLnByb21pc2VQb2RhbmlEb2tsYWR1KHRoYXQsIHRydWUsIHRoYXQuR2luR2VuSXhwLCBIcGwuSW50ZXJmYWNlLkRydWhEb2tsYWR1Lm5lZGFub3Z5LEhwbC5JbnRlcmZhY2UuS2F0ZWdvcmllVHlwdS5wcmlqbW92eSxmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChpeHA6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub3BlbkRldGFpbChpeHAsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoenByYXZhOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaEVycm9yKHRoYXQsIHpwcmF2YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5wb2tLbmloYS5QZXJtaXNzaW9ucyA/IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMuTHplUG9kYXQgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFBvZGFuaVByaWplbTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uUG9kYXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTm92w70gcMWZw61qZW1cIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoYXQucG9kYW5pRG9rbGFkdSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tXZWJEb2tsYWQucHJvbWlzZVBvZGFuaURva2xhZHUodGhhdCwgdHJ1ZSwgdGhhdC5HaW5HZW5JeHAsIEhwbC5JbnRlcmZhY2UuRHJ1aERva2xhZHUubmVkYW5vdnksIEhwbC5JbnRlcmZhY2UuS2F0ZWdvcmllVHlwdS5wcmlqbW92eSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChpeHA6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub3BlbkRldGFpbChpeHAsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoenByYXZhOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaEVycm9yKHRoYXQsIHpwcmF2YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5wb2tLbmloYS5QZXJtaXNzaW9ucyA/IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMuTHplUG9kYXQgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFBvZGFuaVZ5ZGVqOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25Qb2RhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOb3bDvSB2w71kZWpcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoYXQucG9kYW5pRG9rbGFkdSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tXZWJEb2tsYWQucHJvbWlzZVBvZGFuaURva2xhZHUodGhhdCwgdHJ1ZSwgdGhhdC5HaW5HZW5JeHAsIEhwbC5JbnRlcmZhY2UuRHJ1aERva2xhZHUubmVkYW5vdnksIEhwbC5JbnRlcmZhY2UuS2F0ZWdvcmllVHlwdS52eWRham92eSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChpeHA6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub3BlbkRldGFpbChpeHAsIHRydWUgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKHpwcmF2YTogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hFcnJvcih0aGF0LCB6cHJhdmEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMgPyB0aGlzLnBva0tuaWhhLlBlcm1pc3Npb25zLkx6ZVBvZGF0IDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RQb2RhbmlQcmlqZW1EYW5vdnk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblBvZGF0KHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk5vdsO9IGRhxYhvdsO9IHDFmcOtamVtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGF0LnBvZGFuaURva2xhZHUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rV2ViRG9rbGFkLnByb21pc2VQb2RhbmlEb2tsYWR1KHRoYXQsIHRydWUsIHRoYXQuR2luR2VuSXhwLCBIcGwuSW50ZXJmYWNlLkRydWhEb2tsYWR1LmRhbm92eSwgSHBsLkludGVyZmFjZS5LYXRlZ29yaWVUeXB1LnByaWptb3Z5LCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGl4cDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5vcGVuRGV0YWlsKGl4cCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICh6cHJhdmE6IHN0cmluZykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rRmxhc2guc2hvd0ZsYXNoRXJyb3IodGhhdCwgenByYXZhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiB0aGlzLnBva0tuaWhhLlBlcm1pc3Npb25zID8gdGhpcy5wb2tLbmloYS5QZXJtaXNzaW9ucy5MemVQb2RhdERhbm92eSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0UG9kYW5pVnlkZWpEYW5vdnk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblBvZGF0KHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk5vdsO9IGRhxYhvdsO9IHbDvWRlalwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhhdC5wb2RhbmlEb2tsYWR1KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva1dlYkRva2xhZC5wcm9taXNlUG9kYW5pRG9rbGFkdSh0aGF0LCB0cnVlLCB0aGF0Lkdpbkdlbkl4cCwgSHBsLkludGVyZmFjZS5EcnVoRG9rbGFkdS5kYW5vdnksIEhwbC5JbnRlcmZhY2UuS2F0ZWdvcmllVHlwdS52eWRham92eSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChpeHA6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub3BlbkRldGFpbChpeHAsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoenByYXZhOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaEVycm9yKHRoYXQsIHpwcmF2YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5wb2tLbmloYS5QZXJtaXNzaW9ucyA/IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMuTHplUG9kYXREYW5vdnkgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFBvZGFuaVNhYmxvbnk6ICBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25Qb2RhdERsZVZ6b3J1KHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpa29uYVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rU2FibG9ueVprcmF0a3lUYWJcIiwgeyBlZGl0TW9kZTogZmFsc2UsIG5ld1Rhc2s6IHRydWUgfSwgXCJaa3JhdGt5IHBva2xhZG7DrWNoIMWhYWJsb25cIilcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMgPyB0aGlzLnBva0tuaWhhLlBlcm1pc3Npb25zLkx6ZVBvZGFuaVNhYmxvbmEgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMDQyXCIsXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdERldGFpbFphbG96a2E6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbERvWmFsb3preSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkgeyAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhhdC5ncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5XZWJBcHAuVXRpbGl0eS5vcGVuQXBwKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWRlbnRpZmlrYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4eDE6IHJvdy5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4eDI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4eDM6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvxb5hZG92YW7DoSBhZ2VuZGEgKGEgcMWZw61wYWRuxJsgZsOhemUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cEFnOiA5MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmF6ZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG92b2xlbm8gcG91xb7DrXQgYWt0dcOhbG7DrSBmw6F6aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYW5DdXJyZW50QXBwOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdsO9amlta2EgcMWZaSBuZW5hbGV6ZW7DrSDFvsOhZG7DqSBjw61sb3bDqSBmw6F6ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub0FwcEZhaWw6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb8W+YWRvdmFuw6EgbWV0b2RhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJPcGVuRGV0YWlsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3REZXRhaWw6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpa29uYVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSB0aGF0LmdyaWQuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub3BlbkRldGFpbChyb3csIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQgOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGVybWlzc2lvbjogdGhpcy5wb2tLbmloYS5QZXJtaXNzaW9ucyA/IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMuTHplUHJhY292YXQgOiB1bmRlZmluZWQsIFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RIcm9tYWRuZVN0b3JubzogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uU3Rvcm5vdmF0KHtcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImZhLWJhblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ocm9tYWRuZVN0b3JubygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5wb2tLbmloYS5QZXJtaXNzaW9ucyA/IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMuTHplUHJhY292YXQgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGFjdFByZWRhbmk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblByZWRhdCh7ICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8+KFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaFdhcm5pbmcodGhpcywgXCJOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IGRva2xhZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBuYSBzdGF2IDAsIGppbmFrIHXFviBieWx5IHYgb2tuxJsgaHJvbWFkbsO9Y2ggb3BlcmFjw60gbmFzdGF2ZW55IGpha28gc3VjY2VzIGEgYnlseSB0YW0gemVsZW7DqSBmYWpma3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsLmZvckVhY2goZnVuY3Rpb24gKHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4Lndpel9raW5kID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRldGFpbFdpbmRvdyA9IHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rSHJvbWFkbmVQcmVkYW5pVGFiXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBva0Rva2xhZHk6IHNlbCwgaXhwRGVuOiB0aGF0LnBva0tuaWhhLml4cF9kZW4sIHN1YnJhZGE6IHRoYXQuc3VicmFkYSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2luZG93Q29udGVudCA9ICQuY29udGVudChkZXRhaWxXaW5kb3cpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93Q29udGVudC5jbG9zZShmdW5jdGlvbiAocmV0dXJuRGF0YTogYm9vbGVhbikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIkFrdHVhbGl6dWppIGRhdGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maWx0ZXIuZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7ICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiB0aGlzLnBva0tuaWhhLlBlcm1pc3Npb25zID8gdGhpcy5wb2tLbmloYS5QZXJtaXNzaW9ucy5MemVQcmVkYW5pIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RQcmlkZWxlbmk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblByaWRlbGl0KHtcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8+KFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaFdhcm5pbmcodGhpcywgXCJOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IGRva2xhZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBuYSBzdGF2IDAsIGppbmFrIHXFviBieWx5IHYgb2tuxJsgaHJvbWFkbsO9Y2ggb3BlcmFjw60gbmFzdGF2ZW55IGpha28gc3VjY2VzIGEgYnlseSB0YW0gemVsZW7DqSBmYWpma3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsLmZvckVhY2goZnVuY3Rpb24gKHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4Lndpel9raW5kID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRldGFpbFdpbmRvdyA9IHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rSHJvbWFkbmVQcmlkZWxlbmlUYWJcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9rRG9rbGFkeTogc2VsLCBpeHBEZW46IHRoYXQucG9rS25paGEuaXhwX2Rlbiwgc3VicmFkYTogdGhhdC5zdWJyYWRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdpbmRvd0NvbnRlbnQgPSAkLmNvbnRlbnQoZGV0YWlsV2luZG93KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd0NvbnRlbnQuY2xvc2UoZnVuY3Rpb24gKHJldHVybkRhdGE6IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJBa3R1YWxpenVqaSBkYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVyLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiB0aGlzLnBva0tuaWhhLlBlcm1pc3Npb25zID8gdGhpcy5wb2tLbmloYS5QZXJtaXNzaW9ucy5MemVQcmlkZWxlbmkgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0UHJlZGFuaURvUHBkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZllZGF0IGRvIFBQRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktY29udmVydFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucHJlZGFuaURvUHBkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5wb2tLbmloYS5QZXJtaXNzaW9ucyA/IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMuTHplUHJlZGFuaVBwZCA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgIC8vdmlzaWJsZSBwb3V6ZSB2IFBPSyAsIG9iZG9ibsOhIGFrY2UgdiBQUEQgbmEgcMWZZWTDoW7DrSBkbyBQT0tcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RQcmVkYW5pRG9Qb2s6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDFmWVkYXQgZG8gUE9LXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1jb252ZXJ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmVkYW5pRG9Qb2soKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiB0aGlzLnBva0tuaWhhLlBlcm1pc3Npb25zID8gdGhpcy5wb2tLbmloYS5QZXJtaXNzaW9ucy5MemVQcmVkYW5pUG9rIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICAgICAgLy92aXNpYmxlIHBvdXplIHYgUE9LICwgb2Jkb2Juw6EgYWtjZSB2IFBQRCBuYSBwxZllZMOhbsOtIGRvIFBPS1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFByZXZ6ZXRpUHBkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZlldnrDrXQgZG8gUFBEXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS1jb252ZXJ0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wcmV2emV0aURvUHBkKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5wb2tLbmloYS5QZXJtaXNzaW9ucyA/IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMuTHplUHJldnppdFBwZCA6IHVuZGVmaW5lZCAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0UHJlZGFuaURvSmluZUtuaWh5OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25QcmVldmlkb3ZhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jYXB0aW9uOiBcIlDFmWVkw6Fuw60gZG8gamluw6kga25paHlcIixcclxuICAgICAgICAgICAgICAgICAgICAvL2ljb246IFwiZ2ktcmVkaXN0cmlidWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiUMWZZWTDoW7DrSBkbyBqaW7DqSBrbmloeVwiLCBcIktvbXBvbmVudGEgR29yZGljLkhwbC5XaW5DbGllbnQuR1ByZWRhdERva3VtZW50eURvSmluZUtuaWh5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZWRhbmlEb0ppbmVLbmloeSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5wb2tLbmloYS5QZXJtaXNzaW9ucyA/IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMuTHplUHJlZGFuaUppbmFLbmloYSA6IHVuZGVmaW5lZFxyXG5cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0UHJldnpldGk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblByZXZ6aXQoeyAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lmhyb21hZG5lUHJldnpldGkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMgPyB0aGlzLnBva0tuaWhhLlBlcm1pc3Npb25zLkx6ZVByYWNvdmF0IDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RLbGljb3ZhU2xvdmE6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIktsw63EjW92w6Egc2xvdmFcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWtleVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLm1lc3NhZ2VCb3goXCJLbMOtxI1vdsOhIHNsb3ZhXCIsIFwiU3BvbGXEjW7DoSBrb21wb25lbnRhIEdvcmRpYy5XZmwuV2luQ2xpZW50LkdLbGljb3ZhU2xvdmFUYWJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gIEdvcmRpYy5XZmwuRGlhbG9ncy5WeWJlcktsaWNTbG92RGxnKHRoYXQsIG51bGwsIHVuZGVmaW5lZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5wb2tLbmloYS5QZXJtaXNzaW9ucyA/IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMuTHplUHJhY292YXQgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYWN0U291Y2V0RG9rbGFkdToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU291xI1ldCBkb2tsYWTFr1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktc3VtYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc291Y2V0RG9rbGFkdSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMgPyB0aGlzLnBva0tuaWhhLlBlcm1pc3Npb25zLkx6ZVByYWNvdmF0IDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdEtvbnRyb2xhTWV0YWRhdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uS29udHJvbGFNZXRhZGF0KHtcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQua29udHJvbGFNZXRhZGF0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBhY3RWeWNldGthOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWw73EjWV0a2FcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWNhbGNcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNvdWNldFZ5YnJhbnljaERva2xhZHU6IERlY2ltYWwgPSBuZXcgRGVjaW1hbCgwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhUm93cyA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFSb3dzLmxlbmd0aCA8IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVJvd3MuZm9yRWFjaChmdW5jdGlvbiAocm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291Y2V0VnlicmFueWNoRG9rbGFkdSA9IERlY2ltYWwuYWRkKHNvdWNldFZ5YnJhbnljaERva2xhZHUsIHBhcnNlRGVjaW1hbChyb3cuY19jZWxrZW1fbSEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgUGFyYW1zSlNPTiA9IHsgY2FzdGthQXJyYXk6IFtwYXJzZURlY2ltYWwoc291Y2V0VnlicmFueWNoRG9rbGFkdSldIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rVnljZXRrYVRhYlwiLCBQYXJhbXNKU09OKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMgPyB0aGlzLnBva0tuaWhhLlBlcm1pc3Npb25zLkx6ZVByYWNvdmF0IDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdEhyb21hZG5lVWN0b3Zhbmk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblphdWN0b3ZhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lmhyb21hZG5lVWN0b3ZhbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMgPyB0aGlzLnBva0tuaWhhLlBlcm1pc3Npb25zLkx6ZVVjdG92YW5pIDogdW5kZWZpbmVkLFxyXG5cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0SHJvbWFkbmVLb25DaG9kOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLb250cm9sbsOtIGNob2RcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWdlbmVyYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lmhyb21hZG55S29uQ2hvZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5wb2tLbmloYS5QZXJtaXNzaW9ucyA/IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMuTHplUHJhY292YXQgOiB1bmRlZmluZWQsXHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgYWN0VGlza1VjZXRuaURva2xhZHk6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzEzMDI0MjBcIiwgLy9SQyAzMTMwMjQyMCA6IFRpc2sgw7rEjWV0bsOtY2ggZG9rbGFkxa8gICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXByaW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRpc2tVY2V0bmkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMgPyB0aGlzLnBva0tuaWhhLlBlcm1pc3Npb25zLkx6ZVRpc2sgOiB1bmRlZmluZWQsXHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFRpc2tTZXpuYW1Eb2tsYWR1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyNDIxXCIsIC8vUkMgMzEzMDI0MjEgOiBUaXNrIHNlem5hbXUgZG9rbGFkxa9cclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXByaW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnRpc2tTZXpuYW0oKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMgPyB0aGlzLnBva0tuaWhhLlBlcm1pc3Npb25zLkx6ZVRpc2sgOiB1bmRlZmluZWQsXHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFRpc2tLbmloeToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjQyMlwiLCAvL1JDIDMxMzAyNDIyIDogIFRpc2sga25paHlcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLXByaW50XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC50aXNrS25paGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb246IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMgPyB0aGlzLnBva0tuaWhhLlBlcm1pc3Npb25zLkx6ZVRpc2sgOiB1bmRlZmluZWQsXHJcblxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGFjdFRpc2tQb2tsYWRuaWNoRG9rbGFkdToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjMzMFwiLCAvL1JDIDMxMzAyMzMwIDogVGlzayBwb2tsYWRuw61jaCBkb2tsYWTFr1xyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcHJpbnRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGlza1Bva2xhZG5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uOiB0aGlzLnBva0tuaWhhLlBlcm1pc3Npb25zID8gdGhpcy5wb2tLbmloYS5QZXJtaXNzaW9ucy5MemVUaXNrIDogdW5kZWZpbmVkLFxyXG5cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhY3RUaXNrTmFobGVkdToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVGlzayBuw6FobGVkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktcHJpbnRcIixcclxuICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGlza05haGxlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbjogdGhpcy5wb2tLbmloYS5QZXJtaXNzaW9ucyA/IHRoaXMucG9rS25paGEuUGVybWlzc2lvbnMuTHplVGlzayA6IHVuZGVmaW5lZCxcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWVudUJhcih0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcclxuICAgICAgICAgICAgICAgIFwiYWN0UG9kYW5pKlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3RQb2RhbmlQcmlqZW0qXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjdFBvZGFuaVZ5ZGVqKlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3RQb2RhbmlQcmlqZW1EYW5vdnlcIixcclxuICAgICAgICAgICAgICAgIFwiYWN0UG9kYW5pVnlkZWpEYW5vdnlcIixcclxuICAgICAgICAgICAgICAgIFwiYWN0UG9kYW5pU2FibG9ueVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3REZXRhaWwqXCIsIFxyXG4gICAgICAgICAgICAgICAgXCJhY3REZXRhaWxaYWxvemthKlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3RQcmVkYW5pKlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3RQcmV2emV0aSpcIiwgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFwiYWN0UHJpZGVsZW5pXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjdFByZWRhbmlEb1BwZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3RQcmVkYW5pRG9Qb2tcIixcclxuICAgICAgICAgICAgICAgIFwiYWN0UHJldnpldGlQcGRcIiAsXHJcbiAgICAgICAgICAgICAgICBcImFjdFByZWRhbmlEb0ppbmVLbmloeVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3RLb250cm9sYU1ldGFkYXRcIixcclxuICAgICAgICAgICAgICAgIFwiYWN0S2xpY292YVNsb3ZhXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjdEhyb21hZG5lU3Rvcm5vKlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3RIcm9tYWRuZVVjdG92YW5pKlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3RIcm9tYWRuZUtvbkNob2QqXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjdFNvdWNldERva2xhZHUqXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjdFZ5Y2V0a2EqXCIsXHJcbiAgICAgICAgICAgICAgICBbXCJUaXNreSpcIixcclxuICAgICAgICAgICBcImFjdFRpc2tVY2V0bmlEb2tsYWR5XCIsICAgIFxyXG4gICAgICAgICAgIFwiYWN0VGlza1Nlem5hbURva2xhZHUqXCIsXHJcbiAgICAgICAgICAgXCJhY3RUaXNrUG9rbGFkbmljaERva2xhZHVcIiwgXHJcbiAgICAgICAgICAgXCJhY3RUaXNrS25paHkqXCIsXHJcbiAgICAgICAgICAgXCJhY3RUaXNrTmFobGVkdVwiLFxyXG4gICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgICAgIF0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5tZW51QmFyKFtcclxuICAgICAgICAgICAgLy8gICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RQb2RhbmksIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIC8vICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0UG9kYW5pU2FibG9ueSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgLy8gICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3REZXRhaWwsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIC8vICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0SHJvbWFkbmVTdG9ybm8sIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIC8vICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0UHJlZGFuaSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgLy8gICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RQcmlkZWxlbmksIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIC8vICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0UHJlZGFuaURvUHBkLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAvLyAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFByZWRhbmlEb0ppbmVLbmloeSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgLy8gICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RQcmV2emV0aSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgLy8gICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RLbGljb3ZhU2xvdmEsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIC8vICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0SHJvbWFkbmVVY3RvdmFuaSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgLy8gICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RIcm9tYWRuZUtvbkNob2QsIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIC8vICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0U291Y2V0RG9rbGFkdSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgLy8gICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RWeWNldGthLCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAvLyAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFRpc2tVY2V0bmlEb2tsYWR5LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAvLyAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFRpc2tTZXpuYW1Eb2tsYWR1LCBmYXZvcml0ZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAvLyAgICB7IGFjdGlvbjogdGhpcy5hY3Rpb25zLmFjdFRpc2tQb2tsYWRuaWNoRG9rbGFkdSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgLy8gICAgeyBhY3Rpb246IHRoaXMuYWN0aW9ucy5hY3RUaXNrS25paHksIGZhdm9yaXRlOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIC8vICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0VGlza05haGxlZHUsIGZhdm9yaXRlOiB0cnVlIH1cclxuXHJcbiAgICAgICAgICAgIC8vXSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJldmlld1BhbmVsc0RlZmluaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICB0YWJzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZXZpZXdzLmdldERlZmF1bHRQcmV2aWV3VGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlld0lkOiBcImhwbDpEb2tsYWRQcmV2aWV3XCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlkIHByZXZpZXcsIGt0ZXLDqSBtw6EgYsO9dCB6b2JyYXplbm8sIHDFmcOtcGFkbsSbIGZ1bmtjZSBrdGVyw6EgcG9kbGUgbG9hZFBhcmFtcyB2csOhdMOtIHZpZXdJZFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJldmlld3MuZ2V0RmlsZVByZXZpZXdUYWIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBQcm92aWRlcjogZnVuY3Rpb24gKGxvYWRQYXJhbXMpIHsgcmV0dXJuIGxvYWRQYXJhbXMuaXhwOyB9ICAgICAgICAgICAgICAgLy8gZnVua2NlLCBrdGVyw6EgbcOhIHphIMO6a29sIHBvc2t5dG5vdXQgaXhwIHBybyBuYcSNdGVuw60gZWwuIG9icmF6dVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NhcHRpb246IFwiTsOhaGxlZFwiIC8vIHRpdHVsZWsgesOhbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXIgPSBuZXcgR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcih0aGlzLmVsZW1lbnQsIHByZXZpZXdQYW5lbHNEZWZpbml0aW9uKTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwcmVkYW5pRG9QcGQoKTogdm9pZCB7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHNlbCA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvPihcImdldFNlbGVjdGlvblwiLCBmYWxzZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hXYXJuaW5nKHRoaXMsIFwiTmVuw60gdnlicsOhbiDFvsOhZG7DvSBkb2tsYWRcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gbmEgc3RhdiAwLCBqaW5hayB1xb4gYnlseSB2IG9rbsSbIGhyb21hZG7DvWNoIG9wZXJhY8OtIG5hc3RhdmVueSBqYWtvIHN1Y2NlcyBhIGJ5bHkgdGFtIHplbGVuw6kgZmFqZmt5XHJcbiAgICAgICAgICAgIHNlbC5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgeC53aXpfa2luZCA9IDA7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBkZXRhaWxXaW5kb3cgPSB0aGF0Lm5hdmlnYXRlKFwiR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0hyb21hZG5lUHJlZGFuaVBwZFRhYlwiLCB7XHJcbiAgICAgICAgICAgICAgICBwb2tEb2tsYWR5OiBzZWxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgd2luZG93Q29udGVudCA9ICQuY29udGVudChkZXRhaWxXaW5kb3cpO1xyXG5cclxuICAgICAgICAgICAgd2luZG93Q29udGVudC5jbG9zZShmdW5jdGlvbiAocmV0dXJuRGF0YTogYm9vbGVhbikge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXR1cm5EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIkFrdHVhbGl6dWppIGRhdGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maWx0ZXIuZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIHByZWRhbmlEb1BvaygpOiB2b2lkIHtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc2VsID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8+KFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaFdhcm5pbmcodGhpcywgXCJOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IGRva2xhZFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBuYSBzdGF2IDAsIGppbmFrIHXFviBieWx5IHYgb2tuxJsgaHJvbWFkbsO9Y2ggb3BlcmFjw60gbmFzdGF2ZW55IGpha28gc3VjY2VzIGEgYnlseSB0YW0gemVsZW7DqSBmYWpma3lcclxuICAgICAgICAgICAgc2VsLmZvckVhY2goZnVuY3Rpb24gKHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB4Lndpel9raW5kID0gMDtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRldGFpbFdpbmRvdyA9IHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rSHJvbWFkbmVQcmVkYW5pUG9rVGFiXCIsIHtcclxuICAgICAgICAgICAgICAgIHBva0Rva2xhZHk6IHNlbFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciB3aW5kb3dDb250ZW50ID0gJC5jb250ZW50KGRldGFpbFdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3dDb250ZW50LmNsb3NlKGZ1bmN0aW9uIChyZXR1cm5EYXRhOiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJldHVybkRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiQWt0dWFsaXp1amkgZGF0YVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbHRlci5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2emV0aURvUHBkKCk6IHZvaWQge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzZWwgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0Rva2xhZER0bz4oXCJnZXRTZWxlY3Rpb25cIiwgZmFsc2UsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWwubGVuZ3RoID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rRmxhc2guc2hvd0ZsYXNoV2FybmluZyh0aGlzLCBcIk5lbsOtIHZ5YnLDoW4gxb7DoWRuw70gZG9rbGFkXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy9uYXN0YXZlbsOtIG5hIHN0YXYgMCwgamluYWsgdcW+IGJ5bHkgdiBva27EmyBocm9tYWRuw71jaCBvcGVyYWPDrSBuYXN0YXZlbnkgamFrbyBzdWNjZXMgYSBieWx5IHRhbSB6ZWxlbsOpIGZhamZreVxyXG4gICAgICAgICAgICBzZWwuZm9yRWFjaChmdW5jdGlvbiAoeCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHgud2l6X2tpbmQgPSAwO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGV0YWlsV2luZG93ID0gdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tIcm9tYWRuZVByZXZ6ZXRpUHBkVGFiXCIsIHtcclxuICAgICAgICAgICAgICAgIHBva0Rva2xhZHk6IHNlbFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciB3aW5kb3dDb250ZW50ID0gJC5jb250ZW50KGRldGFpbFdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3dDb250ZW50LmNsb3NlKGZ1bmN0aW9uIChyZXR1cm5EYXRhOiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJldHVybkRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiQWt0dWFsaXp1amkgZGF0YVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbHRlci5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgcHJlZGFuaURvSmluZUtuaWh5KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc2VsID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8+KFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaFdhcm5pbmcodGhpcywgXCJOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IGRva2xhZFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBuYSBzdGF2IDAsIGppbmFrIHXFviBieWx5IHYgb2tuxJsgaHJvbWFkbsO9Y2ggb3BlcmFjw60gbmFzdGF2ZW55IGpha28gc3VjY2VzIGEgYnlseSB0YW0gemVsZW7DqSBmYWpma3lcclxuICAgICAgICAgICAgc2VsLmZvckVhY2goZnVuY3Rpb24gKHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB4Lndpel9raW5kID0gMDtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRldGFpbFdpbmRvdyA9IHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rSHJvbWFkbmVQcmVkYW5pS25paGFUYWJcIiwge1xyXG4gICAgICAgICAgICAgICAgcG9rRG9rbGFkeTogc2VsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHdpbmRvd0NvbnRlbnQgPSAkLmNvbnRlbnQoZGV0YWlsV2luZG93KTtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvd0NvbnRlbnQuY2xvc2UoZnVuY3Rpb24gKHJldHVybkRhdGE6IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmV0dXJuRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJBa3R1YWxpenVqaSBkYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVyLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBocm9tYWRuZVByZXZ6ZXRpKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc2VsID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8+KFwiZ2V0U2VsZWN0aW9uXCIsIGZhbHNlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaFdhcm5pbmcodGhpcywgXCJOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IGRva2xhZFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBuYSBzdGF2IDAsIGppbmFrIHXFviBieWx5IHYgb2tuxJsgaHJvbWFkbsO9Y2ggb3BlcmFjw60gbmFzdGF2ZW55IGpha28gc3VjY2VzIGEgYnlseSB0YW0gemVsZW7DqSBmYWpma3lcclxuICAgICAgICAgICAgc2VsLmZvckVhY2goZnVuY3Rpb24gKHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB4Lndpel9raW5kID0gMDtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRldGFpbFdpbmRvdyA9IHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rSHJvbWFkbmVQcmV2emV0aVRhYlwiLCB7XHJcbiAgICAgICAgICAgICAgICBwb2tEb2tsYWR5OiBzZWxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgd2luZG93Q29udGVudCA9ICQuY29udGVudChkZXRhaWxXaW5kb3cpO1xyXG5cclxuICAgICAgICAgICAgd2luZG93Q29udGVudC5jbG9zZShmdW5jdGlvbiAocmV0dXJuRGF0YTogYm9vbGVhbikge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXR1cm5EYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIkFrdHVhbGl6dWppIGRhdGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maWx0ZXIuZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgaHJvbWFkbmVTdG9ybm8oKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzZWwgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0Rva2xhZER0bz4oXCJnZXRTZWxlY3Rpb25cIiwgZmFsc2UsIGZhbHNlKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsLmxlbmd0aCA9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaFdhcm5pbmcodGhpcywgXCJOZW7DrSB2eWJyw6FuIMW+w6FkbsO9IGRva2xhZFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBuYSBzdGF2IDAsIGppbmFrIHXFviBieWx5IHYgb2tuxJsgaHJvbWFkbsO9Y2ggb3BlcmFjw60gbmFzdGF2ZW55IGpha28gc3VjY2VzIGEgYnlseSB0YW0gemVsZW7DqSBmYWpma3lcclxuICAgICAgICAgICAgc2VsLmZvckVhY2goZnVuY3Rpb24gKHgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB4Lndpel9raW5kID0gMDtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRldGFpbFdpbmRvdyA9IHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rSHJvbWFkbmVTdG9ybm9UYWJcIiwge1xyXG4gICAgICAgICAgICAgICAgcG9rRG9rbGFkeTogc2VsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHdpbmRvd0NvbnRlbnQgPSAkLmNvbnRlbnQoZGV0YWlsV2luZG93KTtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvd0NvbnRlbnQuY2xvc2UoZnVuY3Rpb24gKHJldHVybkRhdGE6IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmV0dXJuRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJBa3R1YWxpenVqaSBkYXRhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVyLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBocm9tYWRuZVVjdG92YW5pKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlbCA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvPihcImdldFNlbGVjdGlvblwiLCBmYWxzZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hXYXJuaW5nKHRoaXMsIFwiTmVuw60gdnlicsOhbiDFvsOhZG7DvSBkb2tsYWRcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gbmEgc3RhdiAwLCBqaW5hayB1xb4gYnlseSB2IG9rbsSbIGhyb21hZG7DvWNoIG9wZXJhY8OtIG5hc3RhdmVueSBqYWtvIHN1Y2NlcyBhIGJ5bHkgdGFtIHplbGVuw6kgZmFqZmt5XHJcbiAgICAgICAgICAgIHNlbC5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgeC53aXpfa2luZCA9IDA7XHJcblxyXG4gICAgICAgICAgICB9KTsgICAgICAgXHJcblxyXG4gICAgICAgICAgICBsZXQgZGV0YWlsV2luZG93ID0gdGhhdC5uYXZpZ2F0ZShcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tIcm9tYWRuZVVjdG92YW5pVGFiXCIsIHtcclxuICAgICAgICAgICAgICAgIHBva0Rva2xhZHk6IHNlbFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciB3aW5kb3dDb250ZW50ID0gJC5jb250ZW50KGRldGFpbFdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3dDb250ZW50LmNsb3NlKGZ1bmN0aW9uIChyZXR1cm5EYXRhOiBib29sZWFuKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJldHVybkRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwiQWt0dWFsaXp1amkgZGF0YVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbHRlci5nZmlsdGVycGFuZWwoXCJhcHBseUZpbHRlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaHJvbWFkbnlLb25DaG9kKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNlbCA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvPihcImdldFNlbGVjdGlvblwiLCBmYWxzZSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbC5sZW5ndGggPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hXYXJuaW5nKHRoaXMsIFwiTmVuw60gdnlicsOhbiDFvsOhZG7DvSBkb2tsYWRcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvL25hc3RhdmVuw60gbmEgc3RhdiAwLCBqaW5hayB1xb4gYnlseSB2IG9rbsSbIGhyb21hZG7DvWNoIG9wZXJhY8OtIG5hc3RhdmVueSBqYWtvIHN1Y2NlcyBhIGJ5bHkgdGFtIHplbGVuw6kgZmFqZmt5XHJcbiAgICAgICAgICAgIHNlbC5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgeC53aXpfa2luZCA9IDA7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRldGFpbFdpbmRvdyA9IHRoYXQubmF2aWdhdGUoXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rSHJvbWFkbmVLb25DaG9kVGFiXCIsIHtcclxuICAgICAgICAgICAgICAgIHBva0Rva2xhZHk6IHNlbFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIGJlZm9yZUxvYWREYXRhKGZpbHRlcjogYW55KTogSlF1ZXJ5UHJvbWlzZTxib29sZWFuPiB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGVmID0gJC5EZWZlcnJlZCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGF0LkxvbmdMaXN0V2FybmluZykge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlBva0Rva2xhZC5jb3VudExpc3QoXHJcbiAgICAgICAgICAgICAgICAgICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnRzOiBbXCJQT0tTUElEXCIsIFwiV0ZMU1BJRFwiLCBcIkdJTlNFU1VcIiwgXCJQZXJtaXNzaW9uc1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5nZXQoKS5kb25lKGZ1bmN0aW9uIChjb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPiB0aGF0LkxvbmdMaXN0TWF4Q291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHrDoXpuYW3FryBqZSB2w61jZSBuZcW+IGplIG5hc3RhdmVuw70gbGltaXQgLT4gZG90YXogbmEgdcW+aXZhdGVsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEVrby5HcmlkLmNvbmZpcm1MaXN0TGltaXQodGhhdCwgY291bnQsIHRoYXQuTG9uZ0xpc3RNYXhDb3VudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhID09PSBcInllc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZi5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWYucmVzb2x2ZSh0cnVlKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVmLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogbG9hZERhdGFcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxvYWREYXRhKGZpbHRlcjogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJlZm9yZUxvYWREYXRhKGZpbHRlcikudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJOYcSNw610w6Fuw60gc2V6bmFtdSBwb2tsYWRuw61jaCBkb2tsYWTFry4uLlwiKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5Qb2tEb2tsYWQubGlzdChcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFnbWVudHM6IFtcIlBPS1NQSURcIiwgXCJXRkxTUElEXCIsIFwiR0lOU0VTVVwiLCBcIlBlcm1pc3Npb25zXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICkuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhLmRhdGEsIHsga2V5OiBcIml4cFwiIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3JpZC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB2aWV3XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ICAgICBcclxuICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICogb3BlbkRldGFpbFxyXG4gICAgICAgICogXHJcbiAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXhwXHJcbiAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG9wZW5EZXRhaWwoaXhwOiBzdHJpbmcgfCBHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvLCBwb2Rhbmk6IGJvb2xlYW4pOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBncmlkUkMgPSBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHRoaXMuZ3JpZCk7XHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZGV0YWlsV2luZG93O1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaXhwID09PSAnc3RyaW5nJykge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICB2YXIgd2luZG93T3B0aW9uID0geyB3aWR0aDogc2NyZWVuLmF2YWlsV2lkdGggLSAxMDAsIGhlaWdodDogc2NyZWVuLmF2YWlsSGVpZ2h0IC0gMTAwIH07XHJcbiAgICAgICAgICAgICAgICAvLyAgdmFyIFBhcmFtc0pTT04gPSB7IEl4cDogaXhwLCBLb250cm9sb3ZhdFJvazogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGRldGFpbFdpbmRvdyA9IHRoYXQubmF2aWdhdGUoW1wiR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0RldGFpbERva2xhZHVUYWJcIiwgeyBncmlkUmVtb3RlQ29udHJvbDogZ3JpZFJDIH1dLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwOiBpeHAsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UG9kYW5pOiBwb2RhbmksICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIElkOiBcIkdQb2tEZXRhaWxEb2tsYWR1I1wiXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgeyAvL3Rlc3QgcyBHUENcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIC8vdmFyIG5ld0dwYyA9IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyh0aGlzLmdwYywgcm93Lml4cF9kZW4pXHJcbiAgICAgICAgICAgIC8vdGhpcy5uYXZpZ2F0ZShbXCJHb3JkaWMuQWdlLldlYkNsaWVudC5NdWpEZXRhaWxcIiwgeyBncGM6IG5ld0dwYyB9XSwgeyBpeHA6IHJvdy5peHAgfSk7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0dwYyA9IEdvcmRpYy5Fa28uVXRpbHMuY3JlYXRlQm9va0dwYyh0aGlzLmdwYywgaXhwLml4cF9kZW4hKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkZXRhaWxXaW5kb3cgPSB0aGF0Lm5hdmlnYXRlKFtcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tEZXRhaWxEb2tsYWR1VGFiXCIsIHsgZ3BjOiBuZXdHcGMgfSwgeyBncmlkUmVtb3RlQ29udHJvbDogZ3JpZFJDIH1dLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwOiBpeHAuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1BvZGFuaTogcG9kYW5pLCAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgSWQ6IFwiR1Bva0RldGFpbERva2xhZHUjXCIgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciB3aW5kb3dDb250ZW50ID0gJC5jb250ZW50KGRldGFpbFdpbmRvdyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2hhbmdlZFJvd3M6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgICAgICAgICAvLyBvYnNsdWhhIGFrdGl2bsOtIG9wZXJhY2UgbmEgZGV0YWlsdVxyXG4gICAgICAgICAgICB3aW5kb3dDb250ZW50Lm9uKEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tXZWJCYXNlLnRyaWdnZXJDaGFuZ2UsIChyZXRWYWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldFZhbD8uZGF0YT8uaXhwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcMWZaWTDoW7DrSBkbyBzZXpuYW11IHrDoXpuYW3FryBrIG9ixI1lcnN0dmVuw61cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZFJvd3MuaW5kZXhPZihyZXRWYWwuZGF0YS5peHApIDwgMCkgY2hhbmdlZFJvd3MucHVzaChyZXRWYWwuZGF0YS5peHApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvd0NvbnRlbnQuY2xvc2UoZnVuY3Rpb24gKHJldHVybkRhdGE6IEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8gfCBib29sZWFuKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9Qb2t1ZCB2csOhdMOtbSB0cnVlIGFrdHVhbGl6dWppIHBvZGxlIGZpbHRydVxyXG4gICAgICAgICAgICAgICAgLy9Qb2t1ZCBqZSB0YW0gxZnDoWRlayBkYXQgdGFrIGFrdHVhbGl6dWppIGplZGVuIMWZw6FkZWtcclxuICAgICAgICAgICAgICAgIC8vTnVsbCBhIGZhbHNlIG5lZMSbbMOhIG5pY1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcmV0dXJuRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLzcuNi4yMDIzIC0gbmV2w61tIHByb8SNIHNlIHphxI1hbCB2b2xhdCBjbG9zZSBrZHnFviBvdGV2xZl1IGRldGFpbCBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhID09PSBudWxsKSAvL3ZyYWPDrW0gbnVsbCBuZW3DoW0gY28gYWt0dWFsaXpvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PT0gdHJ1ZSkgeyAvL3ZyYWPDrW0gdHJ1ZSwgdG8gem5hbWVuw6EgYWt0dWFsaXp1aiBjZWzDvSBzZXpuYW0gcG9kbGUgbmFzdGF2ZW7DvWNoIGZpbHRyxa9cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcIkFrdHVhbGl6dWppIGRhdGFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maWx0ZXIuZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChkYXRhID09IGZhbHNlIHx8IGRhdGEgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS51cGRhdGVEYXRhKGRhdGEsIFwidXBkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5ncmlkLmdncmlkKFwiYWN0aXZlUm93XCIsIHsgaXhwOiBkYXRhLml4cCB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy9qZcWhdMSbIHBvxZllxaFpdCBjbyBzZSB6w6F6bmFteSB2IGNoYW5nZVJvd3NcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBwb2RhbmlEb2tsYWR1KCk6IEpRdWVyeVByb21pc2U8c3RyaW5nPiB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAvL3N0ZWpuw6kgcG9kYW7DrSBhamkgbmEgZGV0YWlsdVxyXG5cclxuICAgICAgICAvLyAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgIHZhciB0aGF0ID0gdGhpc1xyXG4gICAgICAgIC8vICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKFwianJlczozMTMwMjIyNFwiKTsgLy9SQyAzMTMwMjIyNCA6IFBvZMOhdsOhbSBub3bDvSBkb2tsYWRcclxuXHJcbiAgICAgICAgLy8gICAgICAgIHZhciByZW1vdGVQb2RhbmkgPSBuZXcgR0NvbnRlbnQoXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rV2ViRGV0YWlsRG9rbGFkdVwiKTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgIHJlbW90ZVBvZGFuaS5jYWxsKFwiUG9kYW5pRG9rbGFkdVwiLCB7IGtvbnRyb2xhUm9rOiB0cnVlIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocikge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIGlmIChyLnN0YXYgPT09IDEpIHsgLy8ga29udG9ybG7DrSBvdMOhemthXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5tZXNzYWdlQm94KFwiZG90YXpcIiwgci50ZXh0LCBHRGxnLm1iYlllc05vLCBHRGxnLm1iaVF1ZXN0aW9uKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdGVQb2RhbmkuY2FsbChcIlBvZGFuaURva2xhZHVcIiwgeyBrb250cm9sYVJvazogZmFsc2UgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHIpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyLnN0YXYgPT09IDApIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShyLnBpZCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWYucmVqZWN0KCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uICh4aHIsIHR5cGUsIHZvYmopIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoci5waWQpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoeGhyLCB0eXBlLCB2b2JqKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZGVmLnJlamVjdCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKClcclxuICAgICAgICAvLyAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAgICAgICByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuICAgICAgICAvLyAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyRm9ybVBvbG96a3lEb2tsYWR1KCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHsgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwiUG9sb8W+a3kgZG9rbGFkdVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkw0TTRTMiwgTC0zLTgtMSwgTS0xMi0xMS0xLCBTLTEyLTExLTEsIGJyZWFrcy03MDAtMTAwMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUMOhcm92YWPDrSBzeW1ib2xcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInBva2RwZXBfdnNcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcInBva2RwZXBfdnNfcHJhemRueVwiLCBsYWJlbDogXCJQcsOhemRuw70gcMOhci4gc3ltYm9sXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJwb2tkcGVwX3ZzX25lcHJhemRueVwiLCBsYWJlbDogXCJOZXByw6F6ZG7DvSBww6FyLiBzeW1ib2xcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlDFmWVka29udGFjZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9rZHBlcF9rb2Rfa29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInBva2RwZXBfa29kX2tvbj1rb2Rfa29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vZGF0YTogdGhhdC5kYXRhS29udGFjZSwgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2Ryb3Bkb3duOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntrb2Rfa29ufVwiLCAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5EYXRhLlNlbGVjdG9ycy5EZWZhdWx0U2VsZWN0b3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWQ6IFwiUG9rU2VsZWN0b3JGaWx0ZXJLb250YWNlI1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxhdGVkOiB0aGF0LmVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkT3B0czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VhcmNoQ29sdW1uczogW1wiZWFuLCBtYXRfY2lzbG8sIG5hemV2XCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoYXQuZGF0YUtvbnRhY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KHsgd2lkdGg6IDEyMCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjAwNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAzMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3J0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiBmdW5jdGlvbiAobWV0YXJvdyk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAobWV0YXJvdy5rdGdfdHlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE1MDA6IHJldHVybiBcIlBcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTUxMDogcmV0dXJuIFwiVlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInR5cF9rb25cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlR5cCBrb250YWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDkwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia29kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJLw7NkIGtvbnRhY2VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogOTBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTsOhemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDQwMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG9waXMgcG9sb8W+a3lcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInBva2RwZXBfbmF6ZXZcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvem7DoW1rYSBwb2xvxb5reVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwicG9rZHBlcF9wb3puYW1rYVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRXh0ZXJuw60gSURcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInBva2RwZXBfZXh0X2lkXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTdGF2IHphw7rEjXRvdsOhbsOtIDIuIGtyb2t1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5mdWNjc3VvVSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzX3Vwb18yX2tyb2tcIiwgbW9kZWw6IFwic191cG9fMl9rcm9rPXNfdXBvXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlN0YXYgcMOhcm92YWPDrWNoIHrDoXBpc8WvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBva2RwZXBfc3Rhdl9wYXJfemFwaXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IFwie25hemV2fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnBva2RwZXBfc3Rhdl9wYXJfemFwaXN1PXZhbHVlLmlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5EYXRhLlZpZXcoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJTcMOhcm92w6FubyBtYW51w6FsbsSbXCIsIGlkOiAyNSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwiU3DDoXJvdsOhbm8gYXV0b21hdGlja3lcIiwgaWQ6IDIwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJQb8WZw616ZW5vXCIsIGlkOiAxMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwiTmVzcMOhcm92w6Fub1wiLCBpZDogNDAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCB7IGtleTogXCJpZFwiIH0pLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiUG9sb8W+a2EgU01MXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInBva2RwZXBfaXhwX3NtbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7bmF6ZXZ9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwucG9rZHBlcF9peHBfc21sPXZhbHVlLmlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5EYXRhLlZpZXcoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJOZXJvemhvZHVqZVwiLCBpZDogMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwiU2Ugc21sb3V2b3VcIiwgaWQ6IDEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcIkJleiBzbWxvdXZ5XCIsIGlkOiAyIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgeyBrZXk6IFwiaWRcIiB9KSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIk5hcG9qZW7DrSBTTUxcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG9rZHBlcF9yZXplcnZfc21sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntuYXpldn1cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5wb2tkcGVwX3JlemVydl9zbWw9dmFsdWUuaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLkRhdGEuVmlldyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcIk5lcm96aG9kdWplXCIsIGlkOiAyIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJOYXBvamVub1wiLCBpZDogMSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwiTmVuYXBvamVub1wiLCBpZDogMCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHsga2V5OiBcImlkXCIgfSksXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJQcm9kZWpuw60gc2tsYWR5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwicG9rZHBlcF9uYXBvamVuaV9tYWpcIiwgbGFiZWw6IFwiTmFwb2plbm8gbmEgTUFKXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiUG9sb8W+a3kgw7rEjWV0bsOtIHNrbGFkYnlcIikgICBcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb2xvxb5reSDDusSNZXRuw60gc2tsYWRieVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuRWtvLlByZWZhYnMuY2Z1RWxlbWVudHMoe1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCkgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkKEdvcmRpYy5Fa28uQ2Z1VXRpbHMuZ2V0Q2Z1U2V0RWRpdG9ycyh0aGlzKSlcclxuICAgICAgICAgICAgICAgIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjZnVEdG9cIlxyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyRm9ybUZ1bGx0ZXh0KCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcIkZ1bGx0ZXh0XCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDRNNFMyLCBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMSwgYnJlYWtzLTcwMC0xMDAwXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiRnVsbHRleHQgY29udHJvbFwiKVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlRmlsdGVyRm9ybVBvem5hbWt5KCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcIlBvem7DoW1reVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkw0TTRTMiwgTC0zLTgtMSwgTS0xMi0xMS0xLCBTLTEyLTExLTEsIGJyZWFrcy03MDAtMTAwMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG96bsOhbWt5XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJ3ZmxkcG96X3Bvem5hbWthXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLbMOtxI1vdsOhIHNsb3ZhXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC53ZmxLbGljU2xvdmEoKSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwid2ZsaWl4cF9rbF9zbG92b1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJ3ZmxpaXhwX2tsX3Nsb3ZvPWtsX3Nsb3ZvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1NlbGVjdEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxCdXR0b25zOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJGb3JtUm96c2lyZW55UHJvZmlsKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IHRhYkxhYmVsOiBcIlJvesWhw63FmWVuw70gcHJvZmlsXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDRNNFMyLCBMLTMtOC0xLCBNLTEyLTExLTEsIFMtMTItMTEtMSwgYnJlYWtzLTcwMC0xMDAwXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHQoXCJQb2zDrcSNa28gcm96xaHDrcWZZW7DvSBwcm9maWxcIik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJGb3JtRXh0ZXJuaVN1Ympla3QoKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgdGFiTGFiZWw6IFwiRXh0ZXJuw60gc3ViamVrdFwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkw0TTRTMiwgTC0zLTgtMSwgTS0xMi0xMS0xLCBTLTEyLTExLTEsIGJyZWFrcy03MDAtMTAwMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIklkZW50aWZpa2FjZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzEzMDIxMTlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2VzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmVzdV9peHNfZXN1PXZhbHVlLml4c19lc3VcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRXN1LlByZWZhYnMudnliZXJFc3Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXA6IEdvcmRpYy5Fc3UuR2xvYmFscy5FbnVtcy5UeXBab2JyYXplbmlLYXJvdGVrYS5TZWxlY3RFc3UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIHByZWZhYnUgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nb3Zhbmk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiBcIjAwMDBYMDAwMDAwM1wiLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6YWTDoW7DrSBsb2dvdmFjw61jaCDDumRhanUgamUgbnV0bm9zdCBobGF2bsSbIElYUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlFc3VWSGxlZGFuaSwgICAgICAgICAvLyB2eWJyYXQgeiBlbnVtdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmlUeHQ6IFwiTWFza2EgcG9rbGFkbsOtaG8gZG9rbGFkdVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSkgYXMgR1NlbGVjdEJveE9wdGlvbnM8YW55PilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJlc3VfZWtvbl9zdWJqZWt0XCIsIGxhYmVsOiBcIkVrb25vbWlja8O9IHN1Ympla3RcIn0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiSm3DqW5vXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJlc3Vfam1lbm9cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlDFmcOtam1lbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJlc3VfcHJpam1lbmlcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlLEjFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiZXN1X3JjXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJPxIxcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImVzdV9vY1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiTsOhemV2IHN1Ympla3R1XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJlc3VfY3NfbmF6ZXZcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk9iY2hvZG7DrSBqbcOpbm9cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImVzdV9vYl9qbWVub1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiScSMT1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiZXN1X2ljb1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiREnEjFwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiZXN1X2RpY1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3RhdiBpbnNvbHZlbmNlXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5jaXNyKCksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVzdV9pbnNvbHZlbmNlX2RydWhfc3Rhdl9yaXplbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuZXN1X2luc29sdmVuY2VfZHJ1aF9zdGF2X3JpemVuaT12YWx1ZS5kcnVoX3N0YXZfcml6ZW5pXCJcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiQWRyZXNhXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiVWxpY2VcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImVzdV9jc191bGljZVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwixIzDrXNsbyBwb3Bpc27DqVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiZXN1X2Nwb3BcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIsSMw61zbG8gb3JpZW50YcSNbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJlc3VfY29yXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCLEjMOhc3Qgb2JjZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiZXN1X2Nhc3Rfb2JjZVwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiT2JlY1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiZXN1X2NzX29iZWNcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBTxIxcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImVzdV9wc2NcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0w6F0XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5jc3RhKCksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImVzdV9zdGF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmVzdV9zdGF0PXZhbHVlLnN0YXRcIlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogY3JlYXRlRmlsdGVyRm9ybVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtHb3JkaWMuRm9ybXMuRm9ybX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlckZvcm1WbGFzdG5vc3RpKCk6IEdvcmRpYy5Gb3Jtcy5Gb3JtIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyB0YWJMYWJlbDogXCJWbGFzdG5vc3RpIGRva2xhZHVcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMNE00UzIsIEwtMy04LTEsIE0tMTItMTEtMSwgUy0xMi0xMS0xLCBicmVha3MtNzAwLTEwMDBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJcIikgLy9SQyAzMTMwMjA1OCA6IFBva2xhZG7DrSBkb2tsYWRcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMjI2XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiaXhwXCIgfSkvL1JDIDMxMzAyMjI2IDogSWRlbnRpZmlrw6F0b3JcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyNDIzXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc25rcygpLCAvL1JDIDMxMzAyNDIzIDogTlNcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibnNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwubmtzPXZhbHVlLm5rc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTMwMjQyNFwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNzbHN0eXAoKSwgLy9SQyAzMTMwMjQyNCA6IFR5cCBkb2t1bWVudHVcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX3R5cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfdHlwPXZhbHVlLml4c190eXBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyBrdGdfdHlwOiBbMTUwMCwgMTUxMF0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiXCIpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJwcml6X2ludF9kb2tsYWRcIiwgbGFiZWw6IFwianJlczozMTMwMjAwMlwiIH0pIC8vUkMgMzEzMDIwMDIgOiBJbnRlcm7DrSBkb2tsYWRcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMjM4XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luc2Z1bigpLCAvL1JDIDMxMzAyMjM4IDogVmxhc3Ruw61rXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19mdW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX2Z1bj12YWx1ZS5peHNfZnVuXCJcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJcIikuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcInZsYXN0bmlrX2hpc3RcIiwgbGFiZWw6IFwianJlczozMTMwMjQyNVwiIH0pIC8vUkMgMzEzMDI0MjUgOiBIaXN0LiB2bGFzdG7DrWtcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyNDI2XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QucG9rY2t0ZygpLCAvL1JDIDMxMzAyNDI2IDogS2F0ZWdvcmllIGRva2xhZFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJrdGdfZG9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmt0Z19kb2s9dmFsdWUua3RnX2Rva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzEzMDIwMjlcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5wb2tjZHJ1KCksIC8vUkMgMzEzMDIwMjkgOiBEcnVoIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZHJ1aF9kb2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuZHJ1aF9kb2s9dmFsdWUuZHJ1aF9kb2tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyNDI3XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QucG9rY3pwcCgpLCAvL1JDIDMxMzAyNDI3IDogWnDFr3NvYiDDumhyYWR5XHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInpwdXNfcGxhdGJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnpwdXNfcGxhdGJ5PXZhbHVlLnpwdXNfcGxhdGJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTMwMjAzMVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb2N0aXMoKSwgLy9SQyAzMTMwMjAzMSA6IFN0YXYgdGlza3VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic190aXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc190aXM9dmFsdWUuc190aXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyNDI4XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3Qud2ZsY3N0digpLCAvL1JDIDMxMzAyNDI4IDogU3RhdiBGS1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3Z5cml6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnN0YXZfZms9dmFsdWUuc3Rhdl92eXJpelwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgVUtcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC53Zmxjc3R2KCksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInN0YXZfdnlyaXpfdWtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc3Rhdl91az12YWx1ZS5zdGF2X3Z5cml6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiXCIpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJwb3V6ZV92bGFzdG5pXCIsIGxhYmVsOiBcImpyZXM6MzEzMDI0MjlcIiB9KSAvL1JDIDMxMzAyNDI5IDogUG91emUgdmxhc3Ruw61cclxuICAgICAgICAgICAgICAgIC8vLmFkZFJvdyhcIlwiKS5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwicG92b2xlbmVfa25paHlcIiwgbGFiZWw6IFwianJlczozMTMwMjQzMFwiIH0pIC8vUkMgMzEzMDI0MzAgOiBab2JyYXppdCB2xaFlY2hueSBwb3YuIGtuaWh5IG5haHJhemVubyB2eWJlcmVtIGtuaWh5IHByZWQgc2V6bmFtZW0gYSB2eWJlcmVtIHZzZWNobnkga25paHlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyNDMxXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCAvL1JDIDMxMzAyNDMxIDogUMWZZcSNdGVuw61cclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJpel92aWV3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IFt7IGhvZG5vdGE6IDEsIG5hemV2OiBcIlDFmWXEjXRlbm9cIiB9LCB7IGhvZG5vdGE6IDEwLCBuYXpldjogXCJOZXDFmWXEjXRlbm9cIiB9XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwucHJpel92aWV3PXZhbHVlLmhvZG5vdGFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiBcIntuYXpldn1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWVcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTMwMjAxM1wiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcInBvcGlzXCIgfSkgLy9SQyAzMTMwMjAxMyA6IFBvcGlzXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzEzMDI0MzJcIikgLy9SQyAzMTMwMjQzMiA6IFN0YXZ5IGRva2xhZHVcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyMjQ4XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7IC8vUkMgMzEzMDIyNDggOiBTdGF2IGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVwX3N0YXZcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7bmF6ZXZ9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnVwX3N0YXY9dmFsdWUuaWRcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IFt7IGlkOiAxNSB9LCB7IGlkOiAyNSB9LCB7IGlkOiAyMCB9LCB7IGlkOiAzMCB9LCB7IGlkOiAzOCB9LCB7IGlkOiA0MCB9XSxcclxuICAgICAgICAgICAgICAgICAgICAvL2hlbHBlckNvbHVtbnM6IFtcIm5hemV2XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuRGF0YS5WaWV3KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwianJlczozMTMwMjQzM1wiLCBpZDogMTAgfSwgLy9SQyAzMTMwMjQzMyA6IE7DoXZyaFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwianJlczozMTMwMjQzNFwiLCBpZDogMTUgfSwgLy9SQyAzMTMwMjQzNCA6IFDFmWlwcmF2ZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJqcmVzOjMxMzAyNDM1XCIsIGlkOiAyNSB9LCAvL1JDIDMxMzAyNDM1IDogUMWZZWTDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJqcmVzOjMxMzAyNDM2XCIsIGlkOiAyMCB9LCAvL1JDIDMxMzAyNDM2IDogRXZpZG92w6Fub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwianJlczozMTMwMjQzN1wiLCBpZDogMzAgfSwgLy9SQyAzMTMwMjQzNyA6IFNjaHbDoWxlbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcImpyZXM6MzEzMDI0MzhcIiwgaWQ6IDM4IH0sIC8vUkMgMzEzMDI0MzggOiBVemF2xZllbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcImpyZXM6MzEzMDI0MzlcIiwgaWQ6IDQwIH0sIC8vUkMgMzEzMDI0MzkgOiBaYcO6xI10b3bDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsIHsga2V5OiBcImlkXCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTMwMjQ0MFwiKSAvL1JDIDMxMzAyNDQwIDogw5rEjWV0bsOtIHDFmcOtcGFkeVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJmdWNfc196YXVcIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLmZ1Y19zX3phdT12YWx1ZS5pZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7bmF6ZXZ9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaGVscGVyQ29sdW1uczogW1wibmF6ZXZcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcImpyZXM6MzEzMDI0NDFcIiwgaWQ6IDIwIH0sIC8vUkMgMzEzMDI0NDEgOiBaYcO6xI10b3ZhbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwianJlczozMTMwMjQ0MlwiLCBpZDogMCB9LCAvL1JDIDMxMzAyNDQyIDogTmV6YcO6xI10b3ZhbsOpICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIF0sIHsga2V5OiBcImlkXCIgfSksXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkUm93KHsgY3VzdG9tQ2xhc3M6IFwibm9QaW5uYWJsZVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwtNC01LTEsIE0tMC0xMS0xLCBTLTAtMTEtMVwiIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdidXR0b25cIiwgXCJcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjQ0NFwiLCAvL1JDIDMxMzAyNDQ0IDogTmVzY2h2w6FsZW7DqVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjdXN0b21DbGFzczogXCJcIlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6ICdhY3RUZXN0MicsIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHZhciBzdGF2RG9rbGFkdSA9IHRoYXQuZmlsdGVyLmZpbmRGaWVsZHMoXCJ1cF9zdGF2XCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgdmFyIHVjZXRuaVByaXBhZHkgPSB0aGF0LmZpbHRlci5maW5kRmllbGRzKFwiZnVjX3NfemF1XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIHN0YXZEb2tsYWR1LmdmaWVsZChcInNldFZhbHVlXCIsIFt7IGlkOiAxNSB9LCB7IGlkOiAyNSB9LCB7IGlkOiAyMCB9XSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB1Y2V0bmlQcmlwYWR5LmdmaWVsZChcInNldFZhbHVlXCIsIFt7IGlkOiAwIH0sIHsgaWQ6IDMwIH1dKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdidXR0b25cIiwgXCJcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjQ0MlwiLCAvL1JDIDMxMzAyNDQyIDogTmV6YcO6xI10b3ZhbsOpXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGN1c3RvbUNsYXNzOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiAnYWN0VGVzdDInLCBydW46IGZ1bmN0aW9uIChldiwgY3R4KSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvL3ZhciBzdGF2RG9rbGFkdSA9ICQoZXYuY3VycmVudFRhcmdldCkuZ2Zvcm1zZWN0aW9uKCkuZmluZEZpZWxkcyhcInVwX3N0YXZcIik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvL3ZhciB1Y2V0bmlQcmlwYWR5ID0gJChldi5jdXJyZW50VGFyZ2V0KS5nZm9ybXNlY3Rpb24oKS5maW5kRmllbGRzKFwiZnVjX3NfemF1XCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLy9zdGF2RG9rbGFkdS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBbeyBpZDogNCB9LCB7IGlkOiA1IH0sIHsgaWQ6IDYgfV0pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLy91Y2V0bmlQcmlwYWR5LmdmaWVsZChcInNldFZhbHVlXCIsIFt7IGlkOiAzIH1dKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdidXR0b25cIiwgXCJcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjQ0NVwiLCAvL1JDIDMxMzAyNDQ1IDogTmVwxZlpcC4gayB1ei5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6ICdhY3RUZXN0MicsIHJ1bjogZnVuY3Rpb24gKGV2LCBjdHgpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC8vdmFyIHN0YXZEb2tsYWR1ID0gJChldi5jdXJyZW50VGFyZ2V0KS5nZm9ybXNlY3Rpb24oKS5maW5kRmllbGRzKFwic3RhdkRva2xhZHVcIik7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvL3ZhciB1Y2V0bmlQcmlwYWR5ID0gJChldi5jdXJyZW50VGFyZ2V0KS5nZm9ybXNlY3Rpb24oKS5maW5kRmllbGRzKFwidWNldG5pUHJpcGFkeVwiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC8vc3RhdkRva2xhZHUuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgW3sgaWQ6IDIgfSwgeyBpZDogNiB9XSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvL3VjZXRuaVByaXBhZHkuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgW3sgaWQ6IDIwIH1dKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdidXR0b25cIiwgXCJcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNhcHRpb246IFwiK1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjdXN0b21DbGFzczogXCJcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgbmFtZTogJ2FjdFRlc3QyJywgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLy92YXIgc3RhdkRva2xhZHUgPSAkKGV2LmN1cnJlbnRUYXJnZXQpLmdmb3Jtc2VjdGlvbigpLmZpbmRGaWVsZHMoXCJzdGF2RG9rbGFkdVwiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC8vdmFyIHVjZXRuaVByaXBhZHkgPSAkKGV2LmN1cnJlbnRUYXJnZXQpLmdmb3Jtc2VjdGlvbigpLmZpbmRGaWVsZHMoXCJ1Y2V0bmlQcmlwYWR5XCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLy9zdGF2RG9rbGFkdS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBbeyBpZDogMSB9LCB7IGlkOiAyIH0sIHsgaWQ6IDMgfSwgeyBpZDogNCB9LCB7IGlkOiA1IH0sIHsgaWQ6IDYgfSwgeyBpZDogNyB9XSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvL3VjZXRuaVByaXBhZHkuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgW3sgaWQ6IDEgfSwgeyBpZDogMiB9LCB7IGlkOiAzIH1dKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRGaWVsZChcImdidXR0b25cIiwgXCJcIiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNhcHRpb246IFwiLVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjdXN0b21DbGFzczogXCJcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgbmFtZTogJ2FjdFRlc3QyJywgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLy92YXIgc3RhdkRva2xhZHUgPSAkKGV2LmN1cnJlbnRUYXJnZXQpLmdmb3Jtc2VjdGlvbigpLmZpbmRGaWVsZHMoXCJzdGF2RG9rbGFkdVwiKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIC8vdmFyIHVjZXRuaVByaXBhZHkgPSAkKGV2LmN1cnJlbnRUYXJnZXQpLmdmb3Jtc2VjdGlvbigpLmZpbmRGaWVsZHMoXCJ1Y2V0bmlQcmlwYWR5XCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLy9zdGF2RG9rbGFkdS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBbXSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvL3VjZXRuaVByaXBhZHkuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgW10pO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMTMwMjA1MlwiKSAvL1JDIDMxMzAyMDUyIDogU3Rvcm5vXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTMwMjQ0NlwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7IC8vUkMgMzEzMDI0NDYgOiBTdGF2IHN0b3JuYVxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic19zdG9cIixcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7bmF6ZXZ9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnNfc3RvPXZhbHVlLmlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcImpyZXM6MzEzMDI0NDdcIiwgaWQ6IDAgfSwgLy9SQyAzMTMwMjQ0NyA6IFN0b3Jub3ZhbsOpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwianJlczozMTMwMjQ0OFwiLCBpZDogMjAgfSwgLy9SQyAzMTMwMjQ0OCA6IFN0b3Jub3ZhY8OtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwianJlczozMTMwMjQ0OVwiLCBpZDogMTAgfSwgLy9SQyAzMTMwMjQ0OSA6IE9zdGF0bsOtXHJcbiAgICAgICAgICAgICAgICAgICAgXSwgeyBrZXk6IFwiaWRcIiB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0KFwiXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMTMwMjExN1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvVnliZXJTbWxvdXZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dER0bzoge30sXHJcbiAgICAgICAgICAgICAgICAgICAgZXN1TG9nb3Zhbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSXhwOiBcIjAwMDBYMDAwMDAwM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBBa3RabmFja2E6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlFc3VWSGxlZGFuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pVHh0OiBcIlbDvWLEm3IgU21sb3V2eVxcT2JqZWRuw6F2a3kgdiBtYXNjZSBwb2tsYWRuw61obyBkb2tsYWR1XCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoYXRcclxuICAgICAgICAgICAgICAgIH0pLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwc19zbWxcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5wc19zbWw9dmFsdWUuaXhwX3NtbF9wcmlcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkUm93KFwiT2JlY27DqSBzZXNrdXBlbsOtXCIpXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3RhdiBpZC4gUEtcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic19wYXJcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5zX3Bhcj12YWx1ZS5pZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7bmF6ZXZ9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcIk5lc3DDoXJvdsOhbm9cIiwgaWQ6IDAgfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwiU3DDoXJvdsOhbm8gxI3DoXN0ZcSNbsSbXCIsIGlkOiAxMCB9LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBuYXpldjogXCJTcMOhcm92w6Fub1wiLCBpZDogMjAgfSwgXHJcbiAgICAgICAgICAgICAgICAgICAgXSwgeyBrZXk6IFwiaWRcIiB9KVxyXG5cclxuICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMxMzAyMTY3XCIpIC8vUkMgMzEzMDIxNjcgOiBEYXR1bSBwb2TDoW7DrVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk9kIC0gRG9cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdpbnRlcnZhbGJveFwiLCB7IG5hbWU6IFwiZGF0X3Z5c3RcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMxMzAyNDUwXCIpIC8vUkMgMzEzMDI0NTAgOiBEYXR1bSB2eXN0YXZlbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiT2QgLSBEb1wiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2ludGVydmFsYm94XCIsIHsgbmFtZTogXCJkYXRfZXZpZFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzEzMDIzODdcIikgLy9SQyAzMTMwMjM4NyA6IERhdHVtIHNwbGF0bm9zdGlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJPZCAtIERvXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnaW50ZXJ2YWxib3hcIiwgeyBuYW1lOiBcImRhdF9zcGxcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMxMzAyNDUxXCIpIC8vUkMgMzEzMDI0NTEgOiBEYXR1bSB6ZGFuLiBwbG7Em27DrVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk9kIC0gRG9cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdpbnRlcnZhbGJveFwiLCB7IG5hbWU6IFwiZGF0X3pkYW5cIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMxMzAyMzY0XCIpIC8vUkMgMzEzMDIzNjQgOiDEjMOhc3RrYSAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5hZGRQcmVmYWIoR29yZGljLkdpbi5QcmVmYWJzLmludGVydmFsKHtcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJPZCAtIERvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2NlbGtlbV9tXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIlxyXG4gICAgICAgICAgICAgICAgfSkpXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MzEzMDIwMTJcIikgLy9SQyAzMTMwMjAxMiA6IEFnZW5kb3bDqSDEjcOtc2xvICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiT2QgLSBEb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNcIixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiXHJcbiAgICAgICAgICAgICAgICB9KSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMTMwMjQ1MlwiKSAvL1JDIDMxMzAyNDUyIDogxIzDrXNsbyDDusSNZXRuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEdvcmRpYy5HaW4uUHJlZmFicy5pbnRlcnZhbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiT2QgLSBEb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWNfdWN0ZG9rbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCJcclxuICAgICAgICAgICAgICAgIH0pKVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJqcmVzOjMxMzAyNDUzXCIpIC8vUkMgMzEzMDI0NTMgOiBQb3NsZWRuw61jaFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzEzMDI0NTRcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHsgbmFtZTogXCJ6YVBvc2xlZG5pWERudVwiLCBlbXB0eVZhbHVlOiBudWxsLCBkZWZhdWx0VmFsdWU6IG51bGwgfSkgLy9SQyAzMTMwMjQ1NCA6IFggZG7Fr1xyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzEzMDI0NTVcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHsgbmFtZTogXCJwb3NsZWRuaWNoWFwiLCBlbXB0eVZhbHVlOiBudWxsLCBkZWZhdWx0VmFsdWU6IG51bGwgfSkgLy9SQyAzMTMwMjQ1NSA6IFggZG9rbGFkxa9cclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwianJlczozMTMwMjQ1NlwiKSAvL1JDIDMxMzAyNDU2IDogSGxhdmnEjWthIGRva2xhZHVcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMxMzAyNDU3XCIpIC8vUkMgMzEzMDI0NTcgOiBTdGF2IGhsYXZpxI1reVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzX3NjaHZhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBsaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogXCJ7bmF6ZXZ9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVdpZHRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnNfc2NodmFsPXZhbHVlLmlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9oZWxwZXJDb2x1bW5zOiBbXCJuYXpldlwiXSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgR29yZGljLkRhdGEuVmlldyhbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgbmF6ZXY6IFwianJlczozMTMwMjQzN1wiLCBpZDogMSB9LCAvL1JDIDMxMzAyNDM3IDogU2NodsOhbGVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG5hemV2OiBcImpyZXM6MzEzMDI0NThcIiwgaWQ6IDAgfSwgLy9SQyAzMTMwMjQ1OCA6IE5lc2NodsOhbGVub1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBdLCB7IGtleTogXCJpZFwiIH0pLFxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgLy9jaHliw60gXHJcbiAgICAgICAgICAgIC8vb2JlY25lIHNlc2t1cGVuaSBcclxuICAgICAgICAvL3pha29tZW50b3bDoW5vXHJcbiAgICAgICAgLy8gcG9zbCBYIGRudSAtIGRva2xhZHVcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBjcmVhdGVHcmlkRm9ybWF0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0dvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0Rva2xhZER0bz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVHcmlkRm9ybWF0KCk6IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0Rva2xhZER0bz4ge1xyXG4gICAgICAgICAgICB2YXIgZ3JpZEZvcm1hdCA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8+KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZEljb25Db2x1bW4oR29yZGljLldmbC5HbG9iYWxzLkxpc3RTdXBwb3J0LlR5cEVudGl0eUNvbHVtbkRsZyh7IHdpdGhPdXREb2N1bWVudEljb246IHRydWUgfSkpO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFZsYXN0bmljdHZpKGdyaWRGb3JtYXQpO1xyXG4gICAgICAgICAgIC8vIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkVmxhc3RuaWN0dmlBUmVkaXN0cmlidWNlKGdyaWRGb3JtYXQpO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFBvY2V0RWxQcmlsb2goZ3JpZEZvcm1hdCk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkRWxPYnJheihncmlkRm9ybWF0KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRJY29uQ29sdW1uKEdvcmRpYy5XZmwuR2xvYmFscy5MaXN0U3VwcG9ydC5Vem9Db2x1bW4oXHJcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAocm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvdy5peHNfZnVuX2FrdCAhPSB0aGF0Lml4c0Z1bjsgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbFNldHRpbmdzXHJcbiAgICAgICAgICAgICkpO1xyXG5cclxuICAgICAgICAgICAgZ3JpZEZvcm1hdFxyXG4gICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oR29yZGljLldmbC5HbG9iYWxzLkxpc3RTdXBwb3J0LlN0YXZGS0NvbHVtbigpKVxyXG4gICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oR29yZGljLldmbC5HbG9iYWxzLkxpc3RTdXBwb3J0LlN0YXZVS0NvbHVtbigpKVxyXG4gICAgICAgICAgICAgICAgLmFkZEljb25Db2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaW50X2Rva1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50IDogXCJQT0tTUElEXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMDAyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDMwLFxyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcm7DrSBkb2tsYWRcIixcclxuICAgICAgICAgICAgICAgICAgICBpY29uVGVtcGxhdGU6IGZ1bmN0aW9uIChtZXRhcm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAobWV0YXJvdy5pbnRfZG9rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiB7IGljb246IFwiZ2luL25pY1wiLCB0b29sdGlwOiBcIlwiIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IHJldHVybiB7IGljb246IFwiZ2ktcGFwZXJcIiwgdGV4dDogXCJJTlRFUk7DjVwiLCB0b29sdGlwOiBcImpyZXM6MzEzMDIwMDJcIiB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KSAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5hZGRJY29uQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNfc3RvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJhZ21lbnQ6IFwiUE9LU1BJRFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjA1MlwiLCAvL1JDIDMxMzAyMDUyIDogU3Rvcm5vICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlN0YXYgc3Rvcm5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvblRlbXBsYXRlOiBmdW5jdGlvbiAobWV0YXJvdykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG1ldGFyb3cuc19zdG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIHsgaWNvbjogXCJmYS10aW1lcy1jaXJjbGVcIiwgdGV4dDogXCJTVE9STk9cIiwgdG9vbHRpcDogXCJTdG9ybm9cIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDogcmV0dXJuIHsgaWNvbjogXCJnaW4vbmljXCIsIHRleHQ6IFwiTkVTVE9STk9Ww4FOT1wiLCB0b29sdGlwOiBcIk5lc3Rvcm5vdsOhbm9cIiB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyMDogcmV0dXJuIHsgaWNvbjogXCJmYS10aW1lcy1jaXJjbGUtb1wiLCB0ZXh0OiBcIlNUT1JOT1ZBQ8ONXCIsIHRvb2x0aXA6IFwiU3Rvcm5vdmFjw61cIiB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vLmFkZE51bWJlckNvbHVtbih7IG5hbWU6IFwicG9jX2VwcmlcIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyMDA0XCIsIGRlc2NyaXB0aW9uOiBcIlBvxI1ldCBlbGVrdHJvbmlja8O9Y2ggcMWZw61sb2hcIiwgc29ydGFibGU6IGZhbHNlLCB3aWR0aDogMzAgfSkgLy9SQyAzMTMwMjAwNCA6IFBFXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRIdG1sQ29sdW1uKEdvcmRpYy5XZmwuR2xvYmFscy5MaXN0U3VwcG9ydC5FbFByaWxvaHlXZmxDb2x1bW5EbGcoKSk7IC8vIFBvem9yIEh0bWxDb2x1bW5cclxuXHJcblxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFBpZChncmlkRm9ybWF0LCB7IG5hbWU6IFwiaXhwXCIgLCBmaWVsZDogXCJpeHBcIn0pO1xyXG4gICAgICAgICAgICAvL0dvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkWmtyYXRrYUthdGVnb3JpZURva2xhZHUoZ3JpZEZvcm1hdCwgeyBuYW1lOiBcImt0Z190eXBfemtyXCIsIGZpZWxkOiBcImt0Z190eXBfemtyXCIgfSk7XHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhwXCIsIGNhcHRpb246IFwianJlczozMTMwMjAwNVwiLCB3aWR0aDogMTEwIH0pIC8vUkMgMzEzMDIwMDUgOiBQSURcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt0Z190eXBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzEzMDIwMDZcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMzAsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogZnVuY3Rpb24gKG1ldGFyb3cpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG1ldGFyb3cua3RnX3R5cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxNTAwOiByZXR1cm4gXCJQXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE1MTA6IHJldHVybiBcIlZcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pIC8vZ2luY2thdC5rdGdfdHlwX3R4dCAvL1JDIDMxMzAyMDA2IDogVHlwIGRva2xhZHVcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ1cF9zdGF2X3R4dFwiLCBmcmFnbWVudDogXCJQT0tTUElEXCIsY2FwdGlvbjogXCJqcmVzOjMxMzAyMDA3XCIgfSkgLy9wb2tjdXBzLnpwX3N0YXZfdHh0IC8vUkMgMzEzMDIwMDcgOiBQT0sgLSBzdGF2IGRva2xhZHVcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcInVwX3N0YXZcIiwgZnJhZ21lbnQ6IFwiUE9LU1BJRFwiLCBjYXB0aW9uOiBcIlN0YXYgZG9rbGFkdVwiLCB2aXNpYmxlOiBmYWxzZSwgaGlkZGVuOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkTnVtYmVyQ29sdW1uKHsgbmFtZTogXCJha3Rpdml0YVwiLCBmcmFnbWVudDogXCJQT0tTUElEXCIsIGNhcHRpb246IFwiQWt0aXZpdGEgZG9rbGFkdVwiLCB2aXNpYmxlOiBmYWxzZSwgaGlkZGVuOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiZnVjX3NfemF1X3R4dFwiLCBmcmFnbWVudDogXCJQT0tTUElEXCIsIGNhcHRpb246IFwianJlczozMTMwMjAwOFwiIH0pIC8vZnVjY3N6YS5zX3phdV90eHQgLy9SQyAzMTMwMjAwOCA6IFN0YXYgemHDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oeyBuYW1lOiBcImZ1Y19zX3phdVwiLCBmcmFnbWVudDogXCJQT0tTUElEXCIsIGNhcHRpb246IFwiU3RhdiDDusSNdG92w6Fuw61cIiwgdmlzaWJsZTogZmFsc2UsIGhpZGRlbjogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInpwdXNfcGxhdGJ5X3R4dFwiLCBmcmFnbWVudDogXCJQT0tTUElEXCIsIGNhcHRpb246IFwianJlczozMTMwMjAwOVwiIH0pIC8vcG9rY3pwcC56cHVzX3BsYXRieV90eHQgLy9SQyAzMTMwMjAwOSA6IFpwLiBwbGF0YnlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHsgbmFtZTogXCJkYXRfdnlzdFwiLCBmcmFnbWVudDogXCJQT0tTUElEXCIsIGNhcHRpb246IFwianJlczozMTMwMjAxMFwiIH0pIC8vUkMgMzEzMDIwMTAgOiBEYXQuIHBvZMOhbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZVRpbWVDb2x1bW4oeyBuYW1lOiBcImRhdF9ldmlkX3RpbWVcIiwgY2FwdGlvbjogXCJqcmVzOjMxMzAyMDExXCIgfSk7IC8vUkMgMzEzMDIwMTEgOiAgRGF0LiB2eXN0YXZlbsOtXHJcbiAgICAgICAgICAgIC8vR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGREYXR1bUV2aWRlbmNlKGdyaWRGb3JtYXQsIHsgbmFtZTogXCJkYXRfZXZpZF90aW1lXCIsIGZpZWxkOiBcImRhdF9ldmlkX3RpbWVcIiwgZnJhZ21lbnQ6IFwiUE9LU1BJRFwiLCB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRBZ2VuZG92ZUNpc2xvKGdyaWRGb3JtYXQsIHsgbmFtZTogXCJhY1wiLCBmaWVsZDogXCJhY1wiLCBmcmFnbWVudDogXCJQT0tTUElEXCIsIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFBvcGlzKGdyaWRGb3JtYXQsIHsgbmFtZTogXCJwb3Bpc1wiLCBmaWVsZDogXCJwb3Bpc1wiLCBmcmFnbWVudDogXCJQT0tTUElEXCIsIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZENhc3RrYUNaSyhncmlkRm9ybWF0LCB7IG5hbWU6IFwiY19jZWxrZW1cIiwgZmllbGQ6IFwiY19jZWxrZW1cIiwgZnJhZ21lbnQ6IFwiUE9LU1BJRFwiLCB9KTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRDYXN0a2FDWksoZ3JpZEZvcm1hdCwgeyBuYW1lOiBcImNfY2Vsa2VtX3puYW1lbmtvXCIsIGZpZWxkOiBcImNfY2Vsa2VtX3puYW1lbmtvXCIsIGNhcHRpb246IFwixIzDoXN0a2Egem5hbS4gdiBDWktcIiwgZnJhZ21lbnQ6IFwiWk5BTUVOS09cIiwgfSk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZENhc3RrYShncmlkRm9ybWF0LCB7IG5hbWU6IFwiY19jZWxrZW1fbVwiLCBmaWVsZDogXCJjX2NlbGtlbV9tXCIsIGZyYWdtZW50OiBcIlBPS1NQSURcIiwgfSk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkQ2FzdGthKGdyaWRGb3JtYXQsIHsgbmFtZTogXCJjX2NlbGtlbV9tX3puYW1lbmtvXCIsIGZpZWxkOiBcImNfY2Vsa2VtX21fem5hbWVua29cIiwgY2FwdGlvbjogXCLEjMOhc3RrYSB6bmFtLiB2IG3Em27Em1wiLCBmcmFnbWVudDogXCJaTkFNRU5LT1wiLCB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRDdXJyZW5jeUNvbHVtbih7IG5hbWU6IFwia3Vyel9kb2tsYWRcIiwgY2FwdGlvbjogXCJLdXJ6XCIsIGZyYWdtZW50OiBcIlBPS1NQSURcIiwgfSkgLy9SQyAzMTMwMjAxNyA6IMSMw6FzdGthIHYgbcSbbsSbICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiZXN1X3R4dFwiLCBmcmFnbWVudDogXCJHSU5TRVNVXCIsIGNhcHRpb246IFwianJlczozMTMwMjAyMFwiLCB3aWR0aDogMjAwIH0pIC8vUkMgMzEzMDIwMjAgOiBTdWJqZWt0ICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJ0eXBfcG9rX3R4dFwiLCBmcmFnbWVudDogXCJQT0tTUElEXCIsY2FwdGlvbjogXCJqcmVzOjMxMzAyMDI3XCIgfSkgLy9SQyAzMTMwMjAyNyA6IFpkcm9qIFwidHlwX3Bva1wiLCBcInBva2N0eXBcIixcInR5cF9wb2tcIixcImRydWhfZG9rX3R4dFxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImt0Z19kb2tfdHh0XCIsIGZyYWdtZW50OiBcIlBPS1NQSURcIixjYXB0aW9uOiBcImpyZXM6MzEzMDIwMjhcIiB9KSAvL1JDIDMxMzAyMDI4IDogS2F0ZWdvcmllIGRva2xhZHUgXCJrdGdfZG9rXCIsIFwicG9rY2t0Z1wiLFwia3RnX2Rva1wiLFwia3RnX2Rva190eHRcIlxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImRydWhfZG9rX3R4dFwiLCBmcmFnbWVudDogXCJQT0tTUElEXCIsIGNhcHRpb246IFwianJlczozMTMwMjAyOVwiIH0pOyAvL1JDIDMxMzAyMDI5IDogRHJ1aCBkb2tsYWR1IFwicG9rY2RydVwiLFwiZHJ1aF9kb2tcIixcImRydWhfZG9rX3R4dFwiXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwiaXhzX2Z1bl9uYXpldl9yZlwiLCBmcmFnbWVudDogXCJQT0tTUElEXCIsIGNhcHRpb246IFwiWnByYWNvdmF0ZWxcIiB9KTtcclxuICAgICAgICAgICAgZ3JpZEZvcm1hdC5hZGRUZXh0Q29sdW1uKHsgbmFtZTogXCJpeHNfZnVuX3Z5cml6X3R4dFwiLCBmcmFnbWVudDogXCJQT0tTUElEXCIsIGNhcHRpb246IFwiS29tcGV0ZW50XCIgfSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwicHNfc21sX2FjXCIsIGZyYWdtZW50OiBcIlBPS1NQSURcIiwgY2FwdGlvbjogXCJTbWxvdXZhL09iamVkbsOhdmthXCIgfSk7XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcInNsb3ppdGVsXCIsIGZyYWdtZW50OiBcIlBPS1NQSURcIiwgY2FwdGlvbjogXCJQxZlpamF0by9WeWTDoW5vXCIgfSk7XHJcblxyXG4gICAgICAgICAgICBncmlkRm9ybWF0LmFkZFRleHRDb2x1bW4oeyBuYW1lOiBcImlkX2V4dFwiLCBmcmFnbWVudDogXCJQT0tTUElEXCIsIGNhcHRpb246IFwiRXh0ZXJuw60gSURcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwia29udGFjZVwiLCBmcmFnbWVudDogXCJLT05UQUNFXCIsIGNhcHRpb246IFwiS29udGFjZVwiIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwic2xvdXBlY3ZzXCIsIGZyYWdtZW50OiBcIlNMT1VQRUNWU1wiLCBjYXB0aW9uOiBcIlDDoXIuIHN5bS5cIiB9KTtcclxuXHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkS25paGEoZ3JpZEZvcm1hdCwgeyBuYW1lOiBcIml4cF9kZW5fdHh0XCIsIGZpZWxkOiBcIml4cF9kZW5fdHh0XCIsIGZyYWdtZW50OiBcIlBPS1NQSURcIiwgfSk7XHJcblxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGdyaWRGb3JtYXQuYWRkVGV4dENvbHVtbih7IG5hbWU6IFwic190aXNfdHh0XCIsIGZyYWdtZW50OiBcIlBPS1NQSURcIixjYXB0aW9uOiBcImpyZXM6MzEzMDIwMzFcIiB9KTsvL1JDIDMxMzAyMDMxIDogU3RhdiB0aXNrdSBcImVrb2N0aXNcIixcInNfdGlzXCIsXCJzX3Rpc190eHRcIlxyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBncmlkRm9ybWF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0aXNrU2V6bmFtKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKS5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hXYXJuaW5nKHRoYXQsIFwianJlczozMTMwMjQ2MFwiKTtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBwaWR5O1xyXG4gICAgICAgICAgICB2YXIgaXhwX2RlbjtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3MubWVzc2FnZUJveChcImpyZXM6MzEzMDI0NjhcIiwgXCJqcmVzOjMxMzAyNDY3XCIsIEdEbGcubWJiWWVzTm8sIEdEbGcubWJpUXVlc3Rpb24pIC8vUkMgMzEzMDI0NjggOiBUaXNrIHNlem5hbXUgZG9rbGFkxa8uLlxyXG4gICAgICAgICAgICAgICAgLm9uKFwieWVzXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBwaWR5ID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8+KFwiZ2V0U2VsZWN0aW9uXCIpLm1hcChmdW5jdGlvbiAoeCkgeyByZXR1cm4gXCInXCIgKyB4Lml4cCArIFwiJ1wiOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpeHBfZGVuID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8+KFwiZ2V0U2VsZWN0aW9uXCIpWzBdLml4cF9kZW47XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0Vm5pdHJuaVRpc2tTZXpuYW0ucnVuKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwibm9cIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBpZHkgPSB0aGF0LmdyaWQuZ2dyaWQ8R29yZGljLkhwbC5JbnRlcmZhY2UuR1Bva0Rva2xhZER0bz4oXCJnZXRWaWV3XCIpLmdldERhdGFSb3dzKGZhbHNlKS5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIFwiJ1wiICsgeC5peHAgKyBcIidcIjsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXhwX2RlbiA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvPihcImdldFNlbGVjdGlvblwiKVswXS5peHBfZGVuO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdFZuaXRybmlUaXNrU2V6bmFtLnJ1bigpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3RWbml0cm5pVGlza1Nlem5hbSA9IEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RQb2tTZXpuYW1Eb2tsYWR1VGlza1wiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyNDIxXCIsIC8vUkMgMzEzMDI0MjEgOiBTZXpuYW0gZG9rbGFkxa9cclxuICAgICAgICAgICAgICAgIHRlbWE6IFwicG9rX3B0bV9zZXpuYW1cIixcclxuICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rV2ViVGlzazpTZXpuYW1Eb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7IGxpc3RfaXhwOiBwaWR5LmpvaW4oKSwgaXhwX2RlbjogaXhwX2RlbiB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBrb250cm9sYU1ldGFkYXQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5ncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpLmxlbmd0aCA8IDEpIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaFdhcm5pbmcodGhhdCwgXCJqcmVzOjMxMzAyNDYwXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgemF6bmFteSA9IHRoYXQuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKS5tYXAoKHJvdykgPT4gcm93Lml4cCEpO1xyXG4gICAgICAgICAgICBpZiAoemF6bmFteSAhPT0gbnVsbCAmJiB6YXpuYW15Lmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB2b2zDoW7DrSBrb21wb25lbnR5XHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLlV0aWxzLktvbnRyb2xhTWV0YWRhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogdGhhdCxcclxuICAgICAgICAgICAgICAgICAgICBsaXN0SXhwOiB6YXpuYW15LFxyXG4gICAgICAgICAgICAgICAgICAgIGRldGFpbEFrY2U6IChjbnQsIGl4cCkgPT4gdGhhdC5vcGVuRGV0YWlsKGl4cCwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICB9KSAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7ICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgdGlza0tuaWhhKCk6IHZvaWQge1xyXG5cclxuXHJcbiAgICAgICAgICAvLyAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oXCJMMU0xUzFcIilcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJPRCAtIERPXCIpLmFkZEZpZWxkKFwiZ2ludGVydmFsYm94XCIsIHsgbmFtZTogXCJkYXR1bVwiLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpczsgLy90aGlzID0gdGF0byBha2NlXHJcbiAgICAgICAgICAgIHZhciBkbGcgPSB0aGF0LmRpYWxvZ3Muc2ltcGxlRm9ybShcImpyZXM6MzEzMDI0NjVcIiwgZm9ybSkgLy9SQyAzMTMwMjQ2NSA6IFbDvWLEm3IgZGF0dW11XHJcbiAgICAgICAgICAgICAgICAub24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG9rOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbmFjdGVuaSBkYXQgeiBmb3JtdWxhcmUgcG8ga2xlcG51dGkgbmEgT0tcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXR1bSA9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkbGcuZmluZEZpZWxkcyhcImRhdHVtXCIpLmdmaWVsZChcImdldFZhbHVlXCIpOyAgICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdFZuaXRybmlUaXNrS25paGEuY3VzdG9tRHRvID0geyBkYXR1bTogZGF0dW0gLCBpeHBfZGVuOiB0aGF0LnBva0tuaWhhLml4cF9kZW4gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0Vm5pdHJuaVRpc2tLbmloYS5ydW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAvLyByZXAuY3VzdG9tRHRvID0geyBkYXR1bTogZGF0dW0gfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImRhdHVtIHJlcFwiLCByZXAuY3VzdG9tRHRvKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVmLnJlc29sdmUoKTsgIC8vemF2b2xhbmltIHJlc29sdmUgc2UgemFjbmUgZ2VuZXJvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAvL2Nsb3NlOiBkZWYucmVqZWN0ICAgLy9idWRlLWxpIGRpYWxvZyB6YXZyZW4gcHJlZCB1ZGFsb3N0aSAnb2snLCBkb2pkZSBrZSB6cnVzZW5pIGdlbmVyb3ZhbmlcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAgICAvLyByZXR1cm4gZGVmLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3RWbml0cm5pVGlza0tuaWhhID0gR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFBva1Rpc2tLbmloYVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyNDIyXCIsLy9SQyAzMTMwMjQyMiA6ICBUaXNrIGtuaWh5XHJcbiAgICAgICAgICAgICAgICB0ZW1hOiBcInBva19wdG1fZGVuaWtcIixcclxuICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rV2ViVGlzazpUaXNrS25paHlcIixcclxuICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdGlza1VjZXRuaSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoYXQuZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKS5sZW5ndGggPCAxKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hXYXJuaW5nKHRoYXQsIFwianJlczozMTMwMjQ2MFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGFjdFZuaXRybmlUaXNrVWNldG5pID0gR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFBva1VjZXRuaURva2xhZHlcIixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjQ2MVwiLCAvL1JDIDMxMzAyNDYxIDogxI1ldG7DrSBkb2tsYWR5XHJcbiAgICAgICAgICAgICAgICB0ZW1hOiBcImVrb19wdG1fZG9remF1XCIsXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IFwiR29yZGljLlBvay5XZWJDbGllbnQuR1Bva1dlYlRpc2s6VWNldG5pRG9rbGFkeVwiLFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGlkeSA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvPihcImdldFNlbGVjdGlvblwiKS5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIFwiJ1wiICsgeC5peHAgKyBcIidcIjsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgbGlzdF9peHA6IHBpZHkuam9pbigpIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYWN0Vm5pdHJuaVRpc2tVY2V0bmkucnVuKCk7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdGlza05haGxlZCgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhUm93cyA9IHRoYXQuZ3JpZC5nZ3JpZDxHb3JkaWMuSHBsLkludGVyZmFjZS5HUG9rRG9rbGFkRHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgaWYgKGRhdGFSb3dzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tGbGFzaC5zaG93Rmxhc2hXYXJuaW5nKHRoYXQsIFwianJlczozMTMwMjQ2MFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciBhcnJheUl4cCA9IGRhdGFSb3dzLm1hcChmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5peHAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbF9zUHJpbnROYWhsZWQgPSBcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tXZWJUaXNrOlBva2xhZG5pRG9rbGFkTmFobGVkXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGFjdFByaW50TmFobGVkID0gR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrTmFobGVkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMTMwMjExMFwiLCAvL0dSZXNvdXJjZXMuR2V0UmVzb3VyY2VUZXh0KDMxMzAyMTEwKVxyXG4gICAgICAgICAgICAgICAgICAgIHRlbWE6IFwicG9rX3B0bV9uYWhsZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJQYXJhbWV0ZXJNZXRob2Q6IGxfc1ByaW50TmFobGVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7IGxpc3RfaXhwOiBhcnJheUl4cCwgaXhwX2RlbjogdGhhdC5wb2tLbmloYS5peHBfZGVuIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBhY3RQcmludE5haGxlZC5ydW4oKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIHByaXZhdGUgc291Y2V0RG9rbGFkdSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGFSb3dzID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YVJvd3MubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaFdhcm5pbmcodGhhdCwgXCJqcmVzOjMxMzAyNDYwXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgc291Y2V0VnlicmFueWNoRG9rbGFkdTogRGVjaW1hbDtcclxuICAgICAgICAgICAgbGV0IHNvdWNldFZ5YnJhbnljaFZsYXN0bmljaDogRGVjaW1hbDtcclxuICAgICAgICAgICAgbGV0IHBvY2V0VnlicmFueWNoID0gMDtcclxuICAgICAgICAgICAgbGV0IHBvY2V0VnlicmFueWNoVmxhc3RuaWNoID0gMDtcclxuXHJcbiAgICAgICAgICAgIHNvdWNldFZ5YnJhbnljaERva2xhZHUgPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICAgICAgc291Y2V0VnlicmFueWNoVmxhc3RuaWNoID0gbmV3IERlY2ltYWwoMCk7XHJcblxyXG4gICAgICAgICAgICBkYXRhUm93cy5mb3JFYWNoKGZ1bmN0aW9uIChyb3cpIHtcclxuICAgICAgICAgICAgICAgIHNvdWNldFZ5YnJhbnljaERva2xhZHUgPSBEZWNpbWFsLmFkZChzb3VjZXRWeWJyYW55Y2hEb2tsYWR1LCBwYXJzZURlY2ltYWwocm93LmNfY2Vsa2VtX20hKSk7XHJcbiAgICAgICAgICAgICAgICBwb2NldFZ5YnJhbnljaCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyb3cuaXhzX2Z1biAhPSBudWxsICYmIHJvdy5peHNfZnVuID09PSB0aGF0Lml4c0Z1bikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzb3VjZXRWeWJyYW55Y2hWbGFzdG5pY2ggPSBEZWNpbWFsLmFkZChzb3VjZXRWeWJyYW55Y2hWbGFzdG5pY2gsIHBhcnNlRGVjaW1hbChyb3cuY19jZWxrZW1fbSEpKTtcclxuICAgICAgICAgICAgICAgICAgICBwb2NldFZ5YnJhbnljaFZsYXN0bmljaCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgbXNnID1cclxuICAgICAgICAgICAgICAgIFwiUG/EjWV0IHZ5YnJhbsO9Y2ggZG9rbGFkxa86IFxcdFwiICsgcG9jZXRWeWJyYW55Y2gudG9TdHJpbmcoKSArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJTb3XEjWV0IHZ5YnJhbsO9Y2ggZG9rbGFkxa86IFxcdFwiICsgc291Y2V0VnlicmFueWNoRG9rbGFkdSArIFwiIFwiICsgdGhhdC5wb2tLbmloYS5tZW5hX3prciArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICBcIlBvxI1ldCB2bGFzdG7DrWNoIHZ5YnJhbsO9Y2ggZG9rbGFkxa86IFxcdFwiICsgcG9jZXRWeWJyYW55Y2hWbGFzdG5pY2gudG9TdHJpbmcoKSArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgXCJTb3XEjWV0IHZsYXN0bsOtY2ggdnlicmFuw71jaCBkb2tsYWTFrzogXFx0XCIgKyBzb3VjZXRWeWJyYW55Y2hWbGFzdG5pY2ggKyBcIiBcIiArIHRoYXQucG9rS25paGEubWVuYV96a3IgKyBcIlxcblwiO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmFsZXJ0KFwiU291xI1ldCB2eWJyYW7DvWNoIGRva2xhZMWvXCIsIG1zZywgMjAwLCAyMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0aXNrUG9rbGFkbmkoKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGFSb3dzID0gdGhhdC5ncmlkLmdncmlkPEdvcmRpYy5IcGwuSW50ZXJmYWNlLkdQb2tEb2tsYWREdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YVJvd3MubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgR29yZGljLlBvay5XZWJDbGllbnQuR1Bva0ZsYXNoLnNob3dGbGFzaFdhcm5pbmcodGhhdCwgXCJqcmVzOjMxMzAyNDYwXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIGFycmF5SXhwID0gZGF0YVJvd3MubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Lml4cCB9KVxyXG5cclxuICAgICAgICB2YXIgdnlza3l0T3Bpc3UgPSBmYWxzZTtcclxuICAgICAgICB2YXIgdnlza3l0T3JpZ2luYWx1ID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGxpc3REYW5vdmU7XHJcbiAgICAgICAgdmFyIGxpc3ROZWRhbm92ZTtcclxuICAgICAgICB2YXIgbGlzdFpqZWRub2R1c2VuZTtcclxuICAgICAgICAgICAgdmFyIGxpc3RWeW5lY2hhbmU7XHJcbiAgICAgICAgICAgIHZhciByZXR1cm5QaWR5O1xyXG5cclxuXHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoYXQuY2FsbChcIlNlc3RhdlNlem5hbXlWeWJyYW55Y2hQcm9UaXNrXCIsIHsgbGlzdEl4cDogYXJyYXlJeHAgfSlcclxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm5QaWR5ID0gZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zZXpuYW1EYW5vdmUubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhY3RWbml0cm5pVGlza0Rhbm92ZS5jdXN0b21EdG8gPSB7IGxpc3RfaXhwOiBkYXRhLnNlem5hbURhbm92ZS5qb2luKCksIHZ5c2t5dE9waXN1OiBkYXRhLnZ5c2t5dE9waXN1IH07XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0Vm5pdHJuaVRpc2tEYW5vdmUucnVuKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc2V6bmFtTmVkYW5vdmUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFZuaXRybmlUaXNrTmVkYW5vdmUuY3VzdG9tRHRvID0geyBsaXN0X2l4cDogZGF0YS5zZXpuYW1OZWRhbm92ZS5qb2luKCksIHZ5c2t5dE9waXN1OiBkYXRhLnZ5c2t5dE9waXN1IH07XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0Vm5pdHJuaVRpc2tOZWRhbm92ZS5ydW4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc2V6bmFtWmplZG5vZHVzZW5lLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0Vm5pdHJuaVRpc2taamVkRGFub3ZlLmN1c3RvbUR0byA9IHsgbGlzdF9peHA6IGRhdGEuc2V6bmFtWmplZG5vZHVzZW5lLmpvaW4oKSwgdnlza3l0T3Bpc3U6IGRhdGEudnlza3l0T3Bpc3UgfTsgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBhY3RWbml0cm5pVGlza1pqZWREYW5vdmUucnVuKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc2V6bmFtVnluZWNoYW5lLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmFsZXJ0KFwianJlczozMTMwMjQ2NFwiICsgZGF0YS5zZXpuYW1WeW5lY2hhbmUubGVuZ3RoICsgXCIvXCIgKyBhcnJheUl4cC5sZW5ndGgpOyAvL1JDIDMxMzAyNDY0IDogUG/EjWV0IHZ5bmVjaGFuw71jaCBuZXRpc2tudXRlbG7DvWNoIGRva2xhZMWvIDogXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vICN3YXJuaW5nIHZ5cmVzaXQgcHJvdG96ZSBzZSBuYWN0ZW7DrSB2b2zDoSAza3LDoXQga2R5eiB0YW0ganNvdSBjdmVjaG55IDMgdHlweSBkb2tsYWR1XHJcblxyXG4gICAgICAgICAgICB2YXIgYWN0Vm5pdHJuaVRpc2tEYW5vdmUgPSBHQWN0aW9uLmNyZWF0ZVByaW50QWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza0Rhbm92ZVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyMTgwXCIsIC8vUkMgMzEzMDIxODAgOiBUaXNrIGRhxYhvdsO9Y2ggZG9rbGFkxa9cclxuICAgICAgICAgICAgICAgIHRlbWE6IFwicG9rX3B0bV9kb2tkYW5cIixcclxuICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuUG9rLldlYkNsaWVudC5HUG9rV2ViVGlzazpEb2tsYWR5RGFub3ZlXCIsXHJcbiAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlcC5jdXN0b21EdG8gPSB7IGxpc3RfaXhwOiBkYXRhLnNlem5hbURhbm92ZS5qb2luKCksIHZ5c2t5dE9waXN1OiBkYXRhLnZ5c2t5dE9waXN1IH1cclxuICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0RmluaXNoZWQ6IGZ1bmN0aW9uIChldmVudCwgcmV0VmFsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVwb3J0RmluaXNoIC0gZGFub3ZlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jYWxsKFwiWmF6bmFtZW5lalRpc2tcIiwgeyBpeHA6IHJldHVyblBpZHkuc2V6bmFtRGFub3ZlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsdGVyLmdmaWx0ZXJwYW5lbChcImFwcGx5RmlsdGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhY3RWbml0cm5pVGlza05lZGFub3ZlID0gR0FjdGlvbi5jcmVhdGVQcmludEFjdGlvbih7ICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tOZWRhbm92ZVwiLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMxMzAyNDYyXCIsIC8vUkMgMzEzMDI0NjIgOiBUaXNrIG5lZGHFiG92w71jaCBkb2tsYWTFr1xyXG4gICAgICAgICAgICAgICAgdGVtYTogXCJwb2tfcHRtX2Rva2xhZFwiLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tXZWJUaXNrOkRva2xhZHlOZWRhbm92ZVwiLFxyXG4gICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHtcclxuICAgICAgICAgICAgICAgICAgIC8vIHJlcC5jdXN0b21EdG8gPSB7IGxpc3RfaXhwOiBkYXRhLnNlem5hbU5lZGFub3ZlLmpvaW4oKSwgdnlza3l0T3Bpc3U6IGRhdGEudnlza3l0T3Bpc3UgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHJlcG9ydEZpbmlzaGVkOiBmdW5jdGlvbiAoZXZlbnQsIHJldFZhbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlcG9ydEZpbmlzaCAtIG5lZGFub3ZlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jYWxsKFwiWmF6bmFtZW5lalRpc2tcIiwgeyBpeHA6IHJldHVyblBpZHkuc2V6bmFtTmVkYW5vdmUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maWx0ZXIuZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFjdFZuaXRybmlUaXNrWmplZERhbm92ZSA9IEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrWmplZERhbm92eWNoXCIsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzEzMDI0NjNcIiwgLy9SQyAzMTMwMjQ2MyA6IFRpc2sgemplZC4gZGHFiG92w71jaCBkb2tsYWTFr1xyXG4gICAgICAgICAgICAgICAgdGVtYTogXCJwb2tfcHRtX2Rva3pqZVwiLFxyXG4gICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5Qb2suV2ViQ2xpZW50LkdQb2tXZWJUaXNrOkRva2xhZHlaamVkRGFub3ZlXCIsXHJcbiAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcmVwLmN1c3RvbUR0byA9IHsgbGlzdF9peHA6IGRhdGEuc2V6bmFtWmplZG5vZHVzZW5lLmpvaW4oKSwgdnlza3l0T3Bpc3U6IGRhdGEudnlza3l0T3Bpc3UgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHJlcG9ydEZpbmlzaGVkOiBmdW5jdGlvbiAoZXZlbnQsIHJldFZhbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlcG9ydEZpbmlzaCAtIHpqZWRcIilcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmNhbGwoXCJaYXpuYW1lbmVqVGlza1wiLCB7IGl4cDogcmV0dXJuUGlkeS5zZXpuYW1aamVkbm9kdXNlbmUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maWx0ZXIuZ2ZpbHRlcnBhbmVsKFwiYXBwbHlGaWx0ZXJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB9XHJcblxyXG59Il19