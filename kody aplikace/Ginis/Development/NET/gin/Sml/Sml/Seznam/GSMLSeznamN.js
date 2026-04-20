"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Sml;
    (function (Sml) {
        var WebClient;
        (function (WebClient) {
            let GSMLSeznamN = class GSMLSeznamN extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    this._createMenu();
                    this._createSideBar();
                    this._createGrid();
                    this._createCondFormat();
                }
                _createCondFormat() {
                    this.my_CondFormats = [];
                    this.my_CondFormats.push({ description: "Stornovaná", formula: "@sml_stav == 50", text: Gordic.Components.Grid.CondFormats.CondFormatText.red });
                    this.my_CondFormats.push({ description: "Stornovaná", formula: "@sml_stav < 50 or (@c_fak > 0 or @c_obj_sml > 0)", text: Gordic.Components.Grid.CondFormats.CondFormatText.blue });
                    this.my_CondFormats.push({ description: "Stornovaná", formula: "@sml_stav < 50 and (@c_fak > 0 or @c_obj_sml > 0) and  @c_pol == (@c_fak + @c_obj_sml)", bold: true });
                    this.my_CondFormats.push({ description: "Stornovaná", formula: "@sml_stav < 50 and  (@c_fak <= 0 and @c_obj_sml <= 0)", text: Gordic.Components.Grid.CondFormats.CondFormatText.black });
                    this.my_CondFormats.push({ description: "Stornovaná", formula: "@sml_stav < 50 and @sgn_stav == 10", text: Gordic.Components.Grid.CondFormats.CondFormatText.green, applyTo: "sml_stav" });
                    //this.my_CondFormats.push({ description: "Stornovaná", formula: "@dat_platnost < TODAY()", text: Gordic.Components.Grid.CondFormats.CondFormatText.green });
                    this.my_CondFormats.push({ description: "Stornovaná", formula: "@sml_stav > 0", text: Gordic.Components.Grid.CondFormats.CondFormatText.black, applyTo: "ixp" });
                    this.my_CondFormats.push({ description: "Stornovaná", formula: "@sml_stav > 0", text: Gordic.Components.Grid.CondFormats.CondFormatText.black, applyTo: "ac" });
                    this.my_CondFormats.push({ description: "Stornovaná", formula: "@sml_stav > 0", text: Gordic.Components.Grid.CondFormats.CondFormatText.black, applyTo: "ac_sml" });
                }
                _createMenu() {
                    this.menuBar(this.vytvorMenuParams());
                }
                vytvorContextoveMenu() {
                    const that = this;
                    const menuBarPole = [];
                    const actions = this.actions.getActions();
                    for (let i = 0, ii = actions.length; i < ii; i++) {
                        menuBarPole.push({ action: actions[i] });
                    }
                    return menuBarPole;
                }
                vytvorMenuParams() {
                    const that = this;
                    this.actions.addRange({
                        actNovy: Gordic.Eko.Action.actionNovy({
                            enabled: true,
                            run: () => {
                                Gordic.Sml.WebClient.Options.Podani({ cnt: this, seznamDokladu: true });
                            }
                        }),
                        actDetail: Gordic.Eko.Action.actionDetail({
                            enabled: true,
                            run: () => {
                                let selectedRow = this.$grid.ggrid("getSelection");
                                if (selectedRow[0].ixp != null)
                                    Sml.Dialogs.GSmlDetailOpenDlg({
                                        parentContent: this,
                                        opt: {
                                            ixp_den: undefined,
                                            ixp_dokladu: selectedRow[0].ixp,
                                        }
                                    }).done((o) => {
                                    });
                            }
                        }),
                        //actPolozkyVP: {
                        //    caption: "jres:33600084", //RC 33600084 : Položky VP
                        //    icon: "gi-list",
                        //    enabled: true,
                        //    run: () => {
                        //        Dialogs.GSmlPolozkyVPDlg({
                        //            parentContent: this,
                        //            opt: {
                        //                ixp: this.$grid.ggrid("activeRow").ixp,
                        //                rezimPol: Gordic.Sml.Interface.RezimPracePolozky.ng_modeSml
                        //            },
                        //            ModOtevreni: Global.Enums.ModOtevreni.navigate
                        //        });
                        //    }
                        //}
                        actPolozkyVP: {
                            caption: "jres:33600084", //RC 33600084 : Položky VP
                            icon: "gi-list",
                            enabled: true,
                            run: () => {
                                let row = this.$grid.ggrid("activeRow");
                                var visitor = new Gordic.Sml.WebClient.GSmlVecnyProfilVisitor({ dao: new Gordic.Sml.WebClient.GVecnyProfilSmlDAO({ ixp: row.ixp }), ixp: row.ixp });
                                var cnt = this.navigate([Gordic.Eko.WebClient.GVecnyProfilSeznam, {}]);
                                const vpContent = $.content(cnt);
                                vpContent.readyAwait.then(() => {
                                    vpContent.accept(visitor);
                                    vpContent.init();
                                });
                                cnt.on("closed", (ev, changed) => {
                                    if (changed) {
                                        this.$grid.ggrid("refresh");
                                    }
                                });
                            }
                        },
                    });
                    // menubar
                    return this.actions.createBar([
                        { action: this.actions.actNovy, primary: true, favorite: true },
                        { action: this.actions.actDetail, primary: false, favorite: true },
                        { action: this.actions.actPolozkyVP, primary: false, favorite: false },
                    ]);
                }
                _createSideBar() {
                    //Začátek inicializace sidebaru
                    var previewPanelsDefinition = {
                        tabs: [
                            Gordic.Previews.getDefaultPreviewTab({
                                viewId: "sml:DokladyPreview"
                            }),
                        ]
                    };
                    this.previewController = new Gordic.Previews.GPreviewController(this.element, previewPanelsDefinition);
                    this.previewController.registerPanel();
                    //Konec inicializace sidebaru
                }
                _createGrid() {
                    //Gordic.Ssl.WebClient.GDokumentIsl.Init().done(() => {
                    //    Gordic.Ssl.WebClient.GDokumentIsl.AddDokumentGridColumns(
                    //        // Vytvoření gridFormatu. Nemusím jej ukládat do proměnné, ale stačí poslat přímo do metody, protože bude v návratové hodnotě.
                    //        new Gordic.Data.GridFormat<Interface.GDokladyDto>()
                    //            .addTextColumn({
                    //                caption: 'Ixp',
                    //                name: 'ixp'
                    //            }),
                    //        // Názvy sloupců dokumentu, který chci použít na svém seznamu.
                    //        [
                    //            'uzo', // barevné označení
                    //            'akt_znacka',
                    //            'nazev',
                    //            'typ_entity_ico'
                    //        ],
                    //        // Nastavení zanoření dokumentu.
                    //        {
                    //            scope: 'Dokument',
                    //            scopeTitle: 'Dokument label'
                    //        }
                    //    )
                    //        .done((gridFormat) => {
                    //            // Vytvoření gridu a přidání na content.
                    //            $('<div>')
                    //                .appendTo(this.element)
                    //                .ggrid<Interface.GDokladyDto>({
                    //                    columns: gridFormat
                    //                    //data: Gordic.Isl.
                    //                });
                    //        });
                    //});
                    //var filterForm = new Gordic.Forms
                    //    .Form({ tabLabel: "Filtr seznamu dokladů", name: "Doklady", layoutDescriptor: "L3M3S1, L-1-10-1, M-1-10-1, S-1-10-1" })
                    let filterFormDef = Gordic.Sml.WebClient.Options.filterFormDef(this.ktg_den, this.StavDokladuFilter, this.StavPodpisuFilter, this.ListFilter);
                    let filterFinancniUdaje = Gordic.Sml.WebClient.Options.filterFinancniUdaje(this.priz_iissp);
                    let filterVecnyProfil = Gordic.Sml.WebClient.Options.filterVecnyProfil();
                    let filterOstatniUdaje = Gordic.Sml.WebClient.Options.filterOstatniUdaje();
                    this.filterPanelElement = $("<div>").appendTo(this.element)
                        .on("gfilterpanelapply", (event, obj) => {
                        /* var pouzeNavazane: boolean = obj.filter.pouzeNavazane;
                         var rok: boolean = obj.filter.rok;
                         var ucsNks: boolean = obj.filter.ucsNks;
                         this.loadData(pouzeNavazane, rok, ucsNks);*/
                    })
                        .gfilterpanel({
                        forms: [filterFormDef, filterFinancniUdaje, filterVecnyProfil, filterOstatniUdaje], //predani definic formularu
                        favorites: ["ixp"],
                        //simpleModeAutoLoadAfterCreatePanel: true,                             // po vytvoření panelu se rovnou načte podle initialValue ve formuláři
                        filterViewMode: FilterViewMode.Detail,
                    });
                    this.filterPanelElement.gfilterpanel('applyFilter', this.filterPanelElement.gfilterpanel('getCurrentData').filter);
                    this.filterPanelElement.gfilterpanel('applyFilter', this.ListFilter);
                    this.view_ISL = new Gordic.Isl.View(this.isl.Doklady.listNew({
                        //fragments: ["smlspac.*", "wflspid.*", "*"],
                        filters: { ktg_den: this.ktg_den }
                    }), { filterPanel: this.filterPanelElement, startEmpty: true });
                    //Přidání různých rozšíření z WFL do gridu na seznamu dokladů
                    // TODO: zakomentováno kvůli problémové synchronizaci - pak případně odkomentovat, ale stejně to už asi není potřeba ...
                    var gridFormat = this.createGridFormat();
                    //Gordic.Ssl.WebClient.GDokumentIsl.AddGridColumns(
                    //    // Vytvoření gridFormatu. Nemusím jej ukládat do proměnné, ale stačí poslat přímo do metody, protože bude v návratové hodnotě.
                    //    this.createGridFormat(),
                    //    this.isl,
                    //    // Názvy sloupců dokumentu, který chci použít na svém seznamu.
                    //    [
                    //        "uzo", // barevné označení
                    //        "akt_znacka",
                    //        "nazev",
                    //        "typ_entity_ico"
                    //    ],
                    //    // Nastavení zanoření dokumentu.
                    //    {
                    //        scopeLevels: [{
                    //            scope: "dokument",
                    //            scopeTitle: "jres:33500643" //RC 33500643 : Dokument label
                    //        }]
                    //    }
                    //)
                    //    .done((gridFormat) => {
                    // Vytvoření gridu a přidání na content.
                    this.$grid = $('<div>')
                        .appendTo(this.element)
                        .ggrid({
                        columns: gridFormat,
                        columnMode: "full",
                        contextMenu: this.vytvorContextoveMenu(),
                        defaultProfile: {
                            columnList: Gordic.Eko.Grid.getListWflColumns(true) + ", ixp, " + this.DefinitionColummnsListGrid2(),
                            condFormats: this.my_CondFormats,
                        },
                        data: this.view_ISL,
                        defaultAction: new GAction({
                            name: "gridRowSelectedAct",
                            run: () => {
                                let row = this.$grid.ggrid("getSelection");
                                if (row[0].ixp != null)
                                    Sml.Dialogs.GSmlDetailOpenDlg({
                                        parentContent: this,
                                        opt: {
                                            ixp_den: undefined,
                                            ixp_dokladu: row[0].ixp,
                                            Grid: this.$grid,
                                        },
                                    }).done((o) => {
                                    });
                            },
                        }),
                        cellActivate: (ev, ctx) => {
                            if (ctx != null && ctx.cellInfo != null && ctx.cellInfo.data != null) {
                                this.previewController.enable(true);
                                this.previewController.show(ctx.cellInfo.data);
                            }
                            else {
                                this.previewController.enable(false);
                            }
                        },
                    }).gautofit({ resizersOnTab: false });
                    ;
                    //});
                }
                // Definování názvů sloupců určené do gridu pro vlastnost columnList
                DefinitionColummnsListGrid2() {
                    return [
                        "ixs_fun_akt_txt" /* Interface.GDokladyDtoNames.ixs_fun_akt_txt */,
                        "poc_epri" /* Interface.GDokladyDtoNames.poc_epri */,
                        "poradi" /* Interface.GDokladyDtoNames.poradi */,
                        "sml_stav" /* Interface.GDokladyDtoNames.sml_stav */,
                        "ixp" /* Interface.GDokladyDtoNames.ixp */,
                        "ac_sml" /* Interface.GDokladyDtoNames.ac_sml */,
                        "ac" /* Interface.GDokladyDtoNames.ac */,
                        "popis" /* Interface.GDokladyDtoNames.popis */,
                        "mena_txt" /* Interface.GDokladyDtoNames.mena_txt */,
                        "c_mena_doc" /* Interface.GDokladyDtoNames.c_mena_doc */,
                        "c_mena" /* Interface.GDokladyDtoNames.c_mena */,
                        "c" /* Interface.GDokladyDtoNames.c */,
                        "c_mena_doc_bez_dph" /* Interface.GDokladyDtoNames.c_mena_doc_bez_dph */,
                        "c_mena_doc_dph" /* Interface.GDokladyDtoNames.c_mena_doc_dph */,
                        "c_mena_doc_s_dph" /* Interface.GDokladyDtoNames.c_mena_doc_s_dph */,
                        "typ_ceny" /* Interface.GDokladyDtoNames.typ_ceny */,
                        "dat_prij_pod" /* Interface.GDokladyDtoNames.dat_prij_pod */,
                        "typ_platnost_txt" /* Interface.GDokladyDtoNames.typ_platnost_txt */,
                        "dat_uzavreni" /* Interface.GDokladyDtoNames.dat_uzavreni */,
                        "dat_platnost" /* Interface.GDokladyDtoNames.dat_platnost */,
                        "dat_ucinnost" /* Interface.GDokladyDtoNames.dat_ucinnost */,
                        "dat_sgn" /* Interface.GDokladyDtoNames.dat_sgn */,
                        "fin_od" /* Interface.GDokladyDtoNames.fin_od */,
                        "fin_do" /* Interface.GDokladyDtoNames.fin_do */,
                        "poznamka" /* Interface.GDokladyDtoNames.poznamka */,
                        "ixs_typ_txt" /* Interface.GDokladyDtoNames.ixs_typ_txt */,
                        "ixs_esu_txt" /* Interface.GDokladyDtoNames.ixs_esu_txt */,
                        "c_pol" /* Interface.GDokladyDtoNames.c_pol */,
                        "c_dod" /* Interface.GDokladyDtoNames.c_dod */,
                        "ico_esu" /* Interface.GDokladyDtoNames.ico_esu */,
                        "rc_esu" /* Interface.GDokladyDtoNames.rc_esu */,
                        "bu_ci" /* Interface.GDokladyDtoNames.bu_ci */,
                        "ixs_fun_vyriz_txt" /* Interface.GDokladyDtoNames.ixs_fun_vyriz_txt */,
                        "dat_sgn_ext" /* Interface.GDokladyDtoNames.dat_sgn_ext */,
                        "ixs_fun_ref_txt" /* Interface.GDokladyDtoNames.ixs_fun_ref_txt */,
                        "nazev" /* Interface.GDokladyDtoNames.nazev */,
                        "ixs_fun_akt_txt" /* Interface.GDokladyDtoNames.ixs_fun_akt_txt */,
                        "cis_real_txt" /* Interface.GDokladyDtoNames.cis_real_txt */,
                        "soutez" /* Interface.GDokladyDtoNames.soutez */,
                        "ac_ver_zak" /* Interface.GDokladyDtoNames.ac_ver_zak */,
                        "ucinnost" /* Interface.GDokladyDtoNames.ucinnost */,
                        "ac_dok_1" /* Interface.GDokladyDtoNames.ac_dok_1 */,
                        "ixs_orj_txt" /* Interface.GDokladyDtoNames.ixs_orj_txt */,
                        "ac_dok_2" /* Interface.GDokladyDtoNames.ac_dok_2 */,
                        "dat_dok_1" /* Interface.GDokladyDtoNames.dat_dok_1 */,
                        "nks" /* Interface.GDokladyDtoNames.nks */,
                        "dat_dok_2" /* Interface.GDokladyDtoNames.dat_dok_2 */,
                        "c_fak" /* Interface.GDokladyDtoNames.c_fak */,
                        "c_obj_sml" /* Interface.GDokladyDtoNames.c_obj_sml */,
                        "c_rok_rok" /* Interface.GDokladyDtoNames.c_rok_rok */,
                        "c_pol_rok" /* Interface.GDokladyDtoNames.c_pol_rok */,
                        "c_fak_rok" /* Interface.GDokladyDtoNames.c_fak_rok */,
                        "dat_zve" /* Interface.GDokladyDtoNames.dat_zve */,
                        "ixs_pri" /* Interface.GDokladyDtoNames.ixs_pri */,
                        "ixs_ref_zast_txt" /* Interface.GDokladyDtoNames.ixs_ref_zast_txt */,
                        "ixs_esu_zast_txt" /* Interface.GDokladyDtoNames.ixs_esu_zast_txt */,
                        "ixs_zuk_txt" /* Interface.GDokladyDtoNames.ixs_zuk_txt */,
                        "vs" /* Interface.GDokladyDtoNames.vs */,
                        "sgn_stav" /* Interface.GDokladyDtoNames.sgn_stav */,
                        "dat_uko" /* Interface.GDokladyDtoNames.dat_uko */,
                        "dat_sgn" /* Interface.GDokladyDtoNames.dat_sgn */,
                        "priz_opce" /* Interface.GDokladyDtoNames.priz_opce */
                    ].toString();
                }
                //Definování property sloupců
                createGridFormat() {
                    var gf = new Gordic.Data.GridFormat();
                    gf.addTextColumn({
                        name: "ixs_fun_akt_txt" /* Interface.GDokladyDtoNames.ixs_fun_akt_txt */,
                        caption: "jres:33500560", //RC 33500560 : Vlastník
                        description: "jres:33500561", //RC 33500561 : Vlastník dokladu
                        width: 70,
                        cellTemplate: (data) => {
                            if (data.dokument?.ixs_fun_akt == this.ixsFun)
                                return "jres:33500641"; //RC 33500641 : Ano
                            else
                                return "jres:33500642"; //RC 33500642 : Ne
                        }
                    });
                    gf.addNumberColumn({
                        name: "sml_stav" /* Interface.GDokladyDtoNames.sml_stav */,
                        caption: "jres:33500562", //RC 33500562 : Stav dokladu
                        description: "jres:33500563", //RC 33500563 : Stav dokladu
                        cellTemplate: (value) => {
                            return this.StavDokladuFilter.find(x => x.sml_stav == value.sml_stav)?.sml_stav_txt ?? "";
                        },
                        width: 80,
                    });
                    gf.addTextColumn({
                        name: "preevidence" /* Interface.GDokladyDtoNames.preevidence */,
                        caption: "jres:33500564", //RC 33500564 : Stav přeevidence
                        description: "jres:33500564",
                        width: 70,
                    });
                    Gordic.Eko.Grid.Column.addPid(gf, { name: "ixp" /* Interface.GDokladyDtoNames.ixp */, width: 150 });
                    Gordic.Eko.Grid.Column.addAgendoveCislo(gf, { name: "ac_sml" /* Interface.GDokladyDtoNames.ac_sml */ });
                    Gordic.Eko.Grid.Column.addEvidencniCislo(gf, { name: "ac" /* Interface.GDokladyDtoNames.ac */ });
                    Gordic.Eko.Grid.Column.addVs(gf, { name: "vs" /* Interface.GDokladyDtoNames.vs */ });
                    Gordic.Eko.Grid.Column.addCastka(gf);
                    Gordic.Eko.Grid.Column.addTypDokladu(gf);
                    Gordic.Eko.Grid.Column.addZpracovatel(gf);
                    Gordic.Eko.Grid.Column.addKompetent(gf);
                    Gordic.Eko.Grid.Column.addRealizator(gf, { name: "cis_real_txt" /* Interface.GDokladyDtoNames.cis_real_txt */ });
                    Gordic.Eko.Grid.Column.addMena(gf, { name: "mena_txt" /* Interface.GDokladyDtoNames.mena_txt */ });
                    //Gordic.Eko.Grid.Column.addCastkaCZK (gf);
                    Gordic.Eko.Grid.Column.addIcoSubjektu(gf, { name: "ico_esu" /* Interface.GDokladyDtoNames.ico_esu */ });
                    Gordic.Eko.Grid.Column.addRcSubjektu(gf, { name: "rc_esu" /* Interface.GDokladyDtoNames.rc_esu */ });
                    gf.addTextColumn({
                        name: "c" /* Interface.GDokladyDtoNames.c */,
                        caption: "jres:33500565", //RC 33500565 : Rozpis CZK
                        description: "jres:33500565",
                        width: 50,
                    });
                    gf.addTextColumn({
                        name: "poc_epri" /* Interface.GDokladyDtoNames.poc_epri */,
                        caption: "jres:33500566", //RC 33500566 : # ePri
                        description: "jres:33500567", //RC 33500567 : Počet elektronických příloh
                        width: 50,
                    });
                    gf.addNumberColumn({
                        name: "poradi" /* Interface.GDokladyDtoNames.poradi */,
                        caption: "jres:33500569", //RC 33500569 : #
                        description: "jres:33500568", //RC 33500568 : Pořadí dokumentu
                        width: 70,
                    });
                    gf.addTextColumn({
                        name: "popis" /* Interface.GDokladyDtoNames.popis */,
                        caption: "jres:33500570", //RC 33500570 : Popis
                        description: "jres:33500571", //RC 33500571 : Popis dokladu
                        width: 70,
                    })
                        .addTextColumn({
                        name: "mena_txt" /* Interface.GDokladyDtoNames.mena_txt */,
                        caption: "jres:33500572", //RC 33500572 : Měna
                        description: "jres:33500573", //RC 33500573 : Měna dokladu
                        width: 70,
                    })
                        .addTextColumn({
                        name: "c_mena_doc" /* Interface.GDokladyDtoNames.c_mena_doc */,
                        caption: "jres:33500574", //RC 33500574 : Cena smlouvy
                        description: "jres:33500575", //RC 33500575 : Cena smlouvy dokladu
                        width: 110,
                    })
                        .addTextColumn({
                        name: "c_mena_doc_bez_dph" /* Interface.GDokladyDtoNames.c_mena_doc_bez_dph */,
                        caption: "jres:33500576", //RC 33500576 : Cena bez DPH
                        description: "jres:33500577", //RC 33500577 : Cena bez DPH
                        width: 120,
                    })
                        .addTextColumn({
                        name: "c_mena_doc_dph" /* Interface.GDokladyDtoNames.c_mena_doc_dph */,
                        caption: "jres:33500578", //RC 33500578 : DPH
                        description: "jres:33500578",
                        width: 50,
                    })
                        .addTextColumn({
                        name: "c_mena_doc_s_dph" /* Interface.GDokladyDtoNames.c_mena_doc_s_dph */,
                        caption: "jres:33500579", //RC 33500579 : Cena s DPH
                        description: "jres:33500579",
                        width: 50,
                    })
                        .addTextColumn({
                        name: "typ_ceny" /* Interface.GDokladyDtoNames.typ_ceny */,
                        caption: "jres:33500580", //RC 33500580 : Typ ceny
                        description: "jres:33500581", //RC 33500581 : Typ ceny dokladu
                        width: 80,
                        cellTemplate: (value) => {
                            if (value.typ_ceny == 10)
                                return "jres:33500582"; //RC 33500582 : Pevná
                            else if (value.typ_ceny == 20)
                                return "jres:33500583"; //RC 33500583 : Volná
                            else
                                return "";
                        }
                    })
                        .addDateColumn({
                        name: "dat_prij_pod" /* Interface.GDokladyDtoNames.dat_prij_pod */,
                        caption: "jres:33500584", //RC 33500584 : Evidováno
                        description: "jres:33500584",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "typ_platnost_txt" /* Interface.GDokladyDtoNames.typ_platnost_txt */,
                        caption: "jres:33500585", //RC 33500585 : Typ platnosti
                        description: "jres:33500585",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_uzavreni" /* Interface.GDokladyDtoNames.dat_uzavreni */,
                        caption: "jres:33500586", //RC 33500586 : Uzavření
                        description: "jres:33500586",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_platnost" /* Interface.GDokladyDtoNames.dat_platnost */,
                        caption: "jres:33500587", //RC 33500587 : Ukončení platnosti
                        description: "jres:33500587",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_ucinnost" /* Interface.GDokladyDtoNames.dat_ucinnost */,
                        caption: "jres:33500588", //RC 33500588 : Účinnost
                        description: "jres:33500588",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_sgn" /* Interface.GDokladyDtoNames.dat_sgn */,
                        caption: "jres:33500589", //RC 33500589 : Datum podpisu
                        description: "jres:33500589",
                        width: 80,
                    })
                        .addNumberColumn({
                        name: "fin_od" /* Interface.GDokladyDtoNames.fin_od */,
                        caption: "jres:33500590", //RC 33500590 : Financování od
                        description: "jres:33500591", //RC 33500591 : Financování od
                        width: 80,
                    })
                        .addNumberColumn({
                        name: "fin_do" /* Interface.GDokladyDtoNames.fin_do */,
                        caption: "jres:33500592", //RC 33500592 : Financování do
                        description: "jres:33500593", //RC 33500593 : Financování do
                        width: 80,
                    })
                        .addTextColumn({
                        name: "poznamka" /* Interface.GDokladyDtoNames.poznamka */,
                        caption: "jres:33500594", //RC 33500594 : Poznámka
                        description: "jres:33500595", //RC 33500595 : Poznámka
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_esu_txt" /* Interface.GDokladyDtoNames.ixs_esu_txt */,
                        caption: "jres:33500596", //RC 33500596 : Protistrana
                        description: "jres:33500597", //RC 33500597 : Protistrana
                        width: 80,
                    })
                        .addNumberColumn({
                        name: "c_pol" /* Interface.GDokladyDtoNames.c_pol */,
                        caption: "jres:33500598", //RC 33500598 : Položky FP
                        description: "jres:33500598",
                        width: 80,
                    })
                        .addNumberColumn({
                        name: "c_dod" /* Interface.GDokladyDtoNames.c_dod */,
                        caption: "jres:33500599", //RC 33500599 : Dodatky
                        description: "jres:33500599",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_esu_txt" /* Interface.GDokladyDtoNames.ixs_esu_txt */,
                        caption: "jres:33500600", //RC 33500600 : Protistrana
                        description: "jres:33500600",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "bu_ci" /* Interface.GDokladyDtoNames.bu_ci */ /*_txt*/,
                        caption: "jres:33500601", //RC 33500601 : BÚ protistrany
                        description: "jres:33500601",
                        cellTemplate: (value) => {
                            if (value.bu_ci?.trim() != "" && value.sk_ci?.trim() != "")
                                return value.bu_ci + "\\" + value.sk_ci;
                            else
                                return "jres:33500640"; //RC 33500640 : Nezadáno
                        },
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_sgn_ext" /* Interface.GDokladyDtoNames.dat_sgn_ext */,
                        caption: "jres:33500602", //RC 33500602 : Datum podpisu protistrany
                        description: "jres:33500602",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_fun_ref_txt" /* Interface.GDokladyDtoNames.ixs_fun_ref_txt */,
                        caption: "jres:33500603", //RC 33500603 : Referent
                        description: "jres:33500604", //RC 33500604 : Referent
                        width: 80,
                    })
                        .addTextColumn({
                        name: "nazev" /* Interface.GDokladyDtoNames.nazev */ /*_sml*/,
                        caption: "jres:33500605", //RC 33500605 : Úplný název
                        description: "jres:33500605",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "soutez" /* Interface.GDokladyDtoNames.soutez */,
                        caption: "jres:33500606", //RC 33500606 : Soutež
                        description: "jres:33500606",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ac_ver_zak" /* Interface.GDokladyDtoNames.ac_ver_zak */,
                        caption: "jres:33500607", //RC 33500607 : Číslo VZ, DT, PO
                        description: "jres:33500607",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ucinnost" /* Interface.GDokladyDtoNames.ucinnost */,
                        caption: "jres:33500608", //RC 33500608 : Účinnost - komentář
                        description: "jres:33500608",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ac_dok_1" /* Interface.GDokladyDtoNames.ac_dok_1 */,
                        caption: "jres:33500609", //RC 33500609 : Související dokument 1
                        description: "jres:33500609",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_orj_txt" /* Interface.GDokladyDtoNames.ixs_orj_txt */,
                        caption: "jres:33500610", //RC 33500610 : Organizační jednotka
                        description: "jres:33500611", //RC 33500611 : Organizační jednotka
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ac_dok_2" /* Interface.GDokladyDtoNames.ac_dok_2 */,
                        caption: "jres:33500612", //RC 33500612 : Související dokument 2
                        description: "jres:33500613", //RC 33500613 : Související dokument 2
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_dok_1" /* Interface.GDokladyDtoNames.dat_dok_1 */,
                        caption: "jres:33500614", //RC 33500614 : Datum SD1
                        description: "jres:33500615", //RC 33500615 : Datum SD1
                        width: 80,
                    })
                        .addTextColumn({
                        name: "nks" /* Interface.GDokladyDtoNames.nks */,
                        caption: "jres:33500616", //RC 33500616 : NKS
                        description: "jres:33500616",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_dok_2" /* Interface.GDokladyDtoNames.dat_dok_2 */,
                        caption: "jres:33500617", //RC 33500617 : Datum SD2
                        description: "jres:33500617",
                        width: 80,
                    })
                        .addCurrencyColumn({
                        name: "c_fak" /* Interface.GDokladyDtoNames.c_fak */,
                        caption: "jres:33500618", //RC 33500618 : Očekávané čerpání kreditu
                        description: "jres:33500618",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "c_fak_rok" /* Interface.GDokladyDtoNames.c_fak_rok */,
                        caption: "jres:33500619", //RC 33500619 : Očekávané čerpání případem v akt. obd. CZK
                        description: "jres:33500619",
                        width: 80,
                    })
                        .addCurrencyColumn({
                        name: "c_obj_sml" /* Interface.GDokladyDtoNames.c_obj_sml */,
                        caption: "jres:33500620", //RC 33500620 : Objednáno SML případu
                        description: "jres:33500620",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "c_rok_rok" /* Interface.GDokladyDtoNames.c_rok_rok */,
                        caption: "jres:33500621", //RC 33500621 : Rozpis případu v akt. obd. CZK
                        description: "jres:33500621",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "c_pol_rok" /* Interface.GDokladyDtoNames.c_pol_rok */,
                        caption: "jres:33500622", //RC 33500622 : Položky FP případu v akt. obd. CZK
                        description: "jres:33500622",
                        width: 80,
                    })
                        //.addNumberColumn({
                        //    name: Interface.GDokladyDtoNames.,
                        //    caption: "Očekávané čerpání případem v akt. obd. CZK",
                        //    description: "Očekávané čerpání případem v akt. obd. CZK",
                        //    width: 80,
                        //})   
                        .addDateColumn({
                        name: "dat_zve" /* Interface.GDokladyDtoNames.dat_zve */,
                        caption: "jres:33500623", //RC 33500623 : Datum zveřejnění
                        description: "jres:33500623",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_pri" /* Interface.GDokladyDtoNames.ixs_pri */,
                        caption: "jres:33500624", //RC 33500624 : Veřejná zakázka
                        description: "jres:33500624",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "typ_phl" /* Interface.GDokladyDtoNames.typ_phl */,
                        caption: "jres:33500625", //RC 33500625 : Typ pohledávky
                        description: "jres:33500625",
                        width: 80,
                    })
                        //.addTextColumn({
                        //    name: Interface.GDokladyDtoNames.,
                        //    caption: "Zástupce vlastní strany",
                        //    description: "Zástupce vlastní strany",
                        //    width: 80,
                        //})
                        //.addTextColumn({
                        //    name: Interface.GDokladyDtoNames.,
                        //    caption: "Zástupce Protistrany",
                        //    description: "Zástupce Protistrany",
                        //    width: 80,
                        //})
                        //.addTextColumn({
                        //    name: Interface.GDokladyDtoNames.vs,
                        //    caption: "VS",
                        //    description: "VS",
                        //    width: 80,
                        //})
                        .addTextColumn({
                        name: "ixs_ref_zast_txt" /* Interface.GDokladyDtoNames.ixs_ref_zast_txt */,
                        caption: "jres:33500626", //RC 33500626 : Zástupce vlastní strany
                        description: "jres:33500626",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_esu_zast_txt" /* Interface.GDokladyDtoNames.ixs_esu_zast_txt */,
                        caption: "jres:33500627", //RC 33500627 : Zástupce Protistrany
                        description: "jres:33500628", //RC 33500628 : Zástupce Protistrany
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_zuk_txt" /* Interface.GDokladyDtoNames.ixs_zuk_txt */,
                        caption: "jres:33500629", //RC 33500629 : Způsob ukončení
                        description: "jres:33500630", //RC 33500630 : Způsob ukončení
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_uko" /* Interface.GDokladyDtoNames.dat_uko */,
                        caption: "jres:33500631", //RC 33500631 : Datum ukončení
                        description: "jres:33500631",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "sgn_stav" /* Interface.GDokladyDtoNames.sgn_stav */,
                        caption: "jres:33500632", //RC 33500632 : Stav podpisu
                        description: "jres:33500632",
                        width: 80,
                        cellTemplate: (value) => {
                            if (value.sgn_stav == 10)
                                return "jres:33500633"; //RC 33500633 : Podepsáno
                            else
                                return "jres:33500634"; //RC 33500634 : Nepodepsáno
                        }
                    })
                        .addDateColumn({
                        name: "priz_opce" /* Interface.GDokladyDtoNames.priz_opce */,
                        cellTemplate: (value) => {
                            switch (value.priz_opce) {
                                case 0:
                                    return "jres:33500635"; //RC 33500635 : Ne
                                    break;
                                case 1:
                                    return "jres:33500636"; //RC 33500636 : Ano
                                    break;
                                default:
                                    return "";
                            }
                        },
                        caption: "jres:33500637", //RC 33500637 : Možnost opce
                        description: "jres:33500637",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_sgn" /* Interface.GDokladyDtoNames.dat_sgn */,
                        caption: "jres:33500638", //RC 33500638 : Datum podpisu
                        description: "jres:33500638",
                        width: 80,
                    });
                    //sloupce Finanční, Účetní a Průběžná 
                    gf.addIconColumn(Gordic.Wfl.Globals.ListSupport.StavFKColumn());
                    gf.addIconColumn(Gordic.Wfl.Globals.ListSupport.StavUKColumn());
                    gf.addIconColumn(Gordic.Wfl.Globals.ListSupport.StavPKColumn());
                    Gordic.Eko.Grid.Column.addStavEkoSchvalColumn(gf);
                    return gf;
                }
                //Definuje pořadí dokladů a přidá pořadí do dto
                //Definuje stav preevidence
                ZpracujSmlouvyDto(data) {
                    data.map((dataItem, index) => {
                        dataItem.poradi = index + 1;
                        if (this.ekoBook.ixp_den != dataItem.ixp_den)
                            dataItem.preevidence = "-";
                        else if (Number(dataItem.preevid) > 0 && this.ekoBook.ixp_den == dataItem.ixp_den)
                            dataItem.preevidence = "+";
                    });
                    return data;
                }
            };
            GSMLSeznamN = __decorate([
                Decorators.gcontent
            ], GSMLSeznamN);
            WebClient.GSMLSeznamN = GSMLSeznamN;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NNTFNlem5hbU4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU01MU2V6bmFtTi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBNnlCZjtBQTd5QkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBNnlCbkI7SUE3eUJnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0E2eUI3QjtRQTd5Qm9CLFdBQUEsU0FBUztZQWUxQixJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFZLFNBQVEsT0FBQSxZQUFpRDtnQkFrQjlFLGNBQWM7b0JBQ1YsTUFBTSxJQUFJLEdBQWdCLElBQUksQ0FBQztvQkFDL0IsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNuQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDbkIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQzdCLENBQUM7Z0JBQ08saUJBQWlCO29CQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztvQkFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUNqSixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLGtEQUFrRCxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ25MLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxFQUFFLFlB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LEdBQUcsQ0FBQztvQkFDbkMsQ0FBQyxDQUFDLENBQUE7b0JBRUYsT0FBTyxJQUFJLENBQUM7Z0JBRWhCLENBQUM7YUFJSixDQUFBO1lBN3hCWSxXQUFXO2dCQUR2QixVQUFVLENBQUMsUUFBUTtlQUNQLFdBQVcsQ0E2eEJ2QjtZQTd4QlkscUJBQVcsY0E2eEJ2QixDQUFBO1FBQ0wsQ0FBQyxFQTd5Qm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQTZ5QjdCO0lBQUQsQ0FBQyxFQTd5QmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQTZ5Qm5CO0FBQUQsQ0FBQyxFQTd5QlMsTUFBTSxLQUFOLE1BQU0sUUE2eUJmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5TbWwuV2ViQ2xpZW50IHtcclxuXHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHU01MU2V6bmFtSW5wdXRQYXJhbXMge1xyXG5cclxuICAgICAgICBpeHBLbmloYTogc3RyaW5nLFxyXG4gICAgICAgIGthdEtuaWhhOiBudW1iZXIsXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBHU01MU2V6bmFtUmV0dXJuVmFsdWUge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgQERlY29yYXRvcnMuZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHU01MU2V6bmFtTiBleHRlbmRzIEdDb250ZW50QmFzZTxHb3JkaWMuRWtvLlV0aWxzLklHRWtvQm9va0V4dGVuc2lvbj4gaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuICAgICAgICAvL0hsYXZuw60gZ3JpZCBwcm8gdsO9cGlzIGRva2xhZMWvXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIHB1YmxpYyBpeHBLbmloYTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBpeHNGdW46IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgaXhzVHlwOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGt0Z19kZW46IG51bWJlcjtcclxuICAgICAgICBwdWJsaWMgc3VicmFkYTogbnVtYmVyO1xyXG4gICAgICAgIHB1YmxpYyBwcml6X2lpc3NwOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2aWV3Q29udHJvbGxlcjogR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcjtcclxuICAgICAgICBwcml2YXRlIGZpbHRlclBhbmVsRWxlbWVudDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgdmlld19JU0w6IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuU21sLkludGVyZmFjZS5HRG9rbGFkeUR0bz47XHJcbiAgICAgICAgcHJpdmF0ZSBTdGF2RG9rbGFkdUZpbHRlcjogSW50ZXJmYWNlLkdTbWxjc3RhRHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSBTdGF2UG9kcGlzdUZpbHRlcjogSW50ZXJmYWNlLkdTbWxjc3RzRHRvW107XHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0RmlsdGVyOiBJbnRlcmZhY2UuR0Rva2xhZHlMaXN0RmlsdGVyRHRvO1xyXG4gICAgICAgIHByaXZhdGUgbXlfQ29uZEZvcm1hdHM6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFtdO1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdDogR1NNTFNlem5hbU4gPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVNZW51KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZVNpZGVCYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVDb25kRm9ybWF0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX2NyZWF0ZUNvbmRGb3JtYXQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXlfQ29uZEZvcm1hdHMgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5teV9Db25kRm9ybWF0cy5wdXNoKHsgZGVzY3JpcHRpb246IFwiU3Rvcm5vdmFuw6FcIiwgZm9ybXVsYTogXCJAc21sX3N0YXYgPT0gNTBcIiwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5yZWQgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubXlfQ29uZEZvcm1hdHMucHVzaCh7IGRlc2NyaXB0aW9uOiBcIlN0b3Jub3ZhbsOhXCIsIGZvcm11bGE6IFwiQHNtbF9zdGF2IDwgNTAgb3IgKEBjX2ZhayA+IDAgb3IgQGNfb2JqX3NtbCA+IDApXCIsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmx1ZSB9KTtcclxuICAgICAgICAgICAgdGhpcy5teV9Db25kRm9ybWF0cy5wdXNoKHsgZGVzY3JpcHRpb246IFwiU3Rvcm5vdmFuw6FcIiwgZm9ybXVsYTogXCJAc21sX3N0YXYgPCA1MCBhbmQgKEBjX2ZhayA+IDAgb3IgQGNfb2JqX3NtbCA+IDApIGFuZCAgQGNfcG9sID09IChAY19mYWsgKyBAY19vYmpfc21sKVwiLCBib2xkOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm15X0NvbmRGb3JtYXRzLnB1c2goeyBkZXNjcmlwdGlvbjogXCJTdG9ybm92YW7DoVwiLCBmb3JtdWxhOiBcIkBzbWxfc3RhdiA8IDUwIGFuZCAgKEBjX2ZhayA8PSAwIGFuZCBAY19vYmpfc21sIDw9IDApXCIsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmxhY2sgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubXlfQ29uZEZvcm1hdHMucHVzaCh7IGRlc2NyaXB0aW9uOiBcIlN0b3Jub3ZhbsOhXCIsIGZvcm11bGE6IFwiQHNtbF9zdGF2IDwgNTAgYW5kIEBzZ25fc3RhdiA9PSAxMFwiLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmdyZWVuLCBhcHBseVRvOiBcInNtbF9zdGF2XCIgfSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5teV9Db25kRm9ybWF0cy5wdXNoKHsgZGVzY3JpcHRpb246IFwiU3Rvcm5vdmFuw6FcIiwgZm9ybXVsYTogXCJAZGF0X3BsYXRub3N0IDwgVE9EQVkoKVwiLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmdyZWVuIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm15X0NvbmRGb3JtYXRzLnB1c2goeyBkZXNjcmlwdGlvbjogXCJTdG9ybm92YW7DoVwiLCBmb3JtdWxhOiBcIkBzbWxfc3RhdiA+IDBcIiwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ibGFjaywgYXBwbHlUbzogXCJpeHBcIiB9KTtcclxuICAgICAgICAgICAgdGhpcy5teV9Db25kRm9ybWF0cy5wdXNoKHsgZGVzY3JpcHRpb246IFwiU3Rvcm5vdmFuw6FcIiwgZm9ybXVsYTogXCJAc21sX3N0YXYgPiAwXCIsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmxhY2ssIGFwcGx5VG86IFwiYWNcIiB9KTtcclxuICAgICAgICAgICAgdGhpcy5teV9Db25kRm9ybWF0cy5wdXNoKHsgZGVzY3JpcHRpb246IFwiU3Rvcm5vdmFuw6FcIiwgZm9ybXVsYTogXCJAc21sX3N0YXYgPiAwXCIsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmxhY2ssIGFwcGx5VG86IFwiYWNfc21sXCIgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfY3JlYXRlTWVudSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5tZW51QmFyKHRoaXMudnl0dm9yTWVudVBhcmFtcygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdnl0dm9yQ29udGV4dG92ZU1lbnUoKTogTWVudVBhcmFtc1tdIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdDogR1NNTFNlem5hbU4gPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1lbnVCYXJQb2xlOiBNZW51UGFyYW1zW10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbnMgPSB0aGlzLmFjdGlvbnMuZ2V0QWN0aW9ucygpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgaWkgPSBhY3Rpb25zLmxlbmd0aDsgaSA8IGlpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG1lbnVCYXJQb2xlLnB1c2goeyBhY3Rpb246IGFjdGlvbnNbaV0gfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtZW51QmFyUG9sZTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZ5dHZvck1lbnVQYXJhbXMoKTogTWVudVBhcmFtc1tdIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdDogR1NNTFNlem5hbU4gPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hY3Rpb25zLmFkZFJhbmdlKHtcclxuICAgICAgICAgICAgICAgIGFjdE5vdnk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk5vdnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5TbWwuV2ViQ2xpZW50Lk9wdGlvbnMuUG9kYW5pKHsgY250OiB0aGlzLCBzZXpuYW1Eb2tsYWR1OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0RGV0YWlsOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZFJvdyA9IHRoaXMuJGdyaWQuZ2dyaWQ8SW50ZXJmYWNlLkdEb2tsYWR5RHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkUm93WzBdLml4cCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRGlhbG9ncy5HU21sRGV0YWlsT3BlbkRsZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBfZG9rbGFkdTogc2VsZWN0ZWRSb3dbMF0uaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmRvbmUoKG8pID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIC8vYWN0UG9sb3preVZQOiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAwODRcIiwgLy9SQyAzMzYwMDA4NCA6IFBvbG/Fvmt5IFZQXHJcbiAgICAgICAgICAgICAgICAvLyAgICBpY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBEaWFsb2dzLkdTbWxQb2xvemt5VlBEbGcoe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBvcHQ6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGl4cDogdGhpcy4kZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKS5peHAsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICByZXppbVBvbDogR29yZGljLlNtbC5JbnRlcmZhY2UuUmV6aW1QcmFjZVBvbG96a3kubmdfbW9kZVNtbFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBNb2RPdGV2cmVuaTogR2xvYmFsLkVudW1zLk1vZE90ZXZyZW5pLm5hdmlnYXRlXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgIGFjdFBvbG96a3lWUDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDA4NFwiLCAvL1JDIDMzNjAwMDg0IDogUG9sb8W+a3kgVlBcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcImdpLWxpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhpcy4kZ3JpZC5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZpc2l0b3IgPSBuZXcgR29yZGljLlNtbC5XZWJDbGllbnQuR1NtbFZlY255UHJvZmlsVmlzaXRvcih7IGRhbzogbmV3IEdvcmRpYy5TbWwuV2ViQ2xpZW50LkdWZWNueVByb2ZpbFNtbERBTyh7IGl4cDogcm93Lml4cCB9KSwgaXhwOiByb3cuaXhwIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY250ID0gdGhpcy5uYXZpZ2F0ZShbR29yZGljLkVrby5XZWJDbGllbnQuR1ZlY255UHJvZmlsU2V6bmFtLCB7fV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB2cENvbnRlbnQgPSAkLmNvbnRlbnQ8R29yZGljLkVrby5XZWJDbGllbnQuR1ZlY255UHJvZmlsU2V6bmFtPihjbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2cENvbnRlbnQucmVhZHlBd2FpdC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZwQ29udGVudC5hY2NlcHQodmlzaXRvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2cENvbnRlbnQuaW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY250Lm9uKFwiY2xvc2VkXCIsIChldiwgY2hhbmdlZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYW5nZWQpIHsgdGhpcy4kZ3JpZC5nZ3JpZChcInJlZnJlc2hcIik7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBtZW51YmFyXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdGlvbnMuY3JlYXRlQmFyKFtcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0Tm92eSwgcHJpbWFyeTogdHJ1ZSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0RGV0YWlsLCBwcmltYXJ5OiBmYWxzZSwgZmF2b3JpdGU6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgIHsgYWN0aW9uOiB0aGlzLmFjdGlvbnMuYWN0UG9sb3preVZQLCBwcmltYXJ5OiBmYWxzZSwgZmF2b3JpdGU6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfY3JlYXRlU2lkZUJhcigpIHtcclxuXHJcbiAgICAgICAgICAgIC8vWmHEjcOhdGVrIGluaWNpYWxpemFjZSBzaWRlYmFydVxyXG4gICAgICAgICAgICB2YXIgcHJldmlld1BhbmVsc0RlZmluaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICB0YWJzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZXZpZXdzLmdldERlZmF1bHRQcmV2aWV3VGFiKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlld0lkOiBcInNtbDpEb2tsYWR5UHJldmlld1wiXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXIgPSBuZXcgR29yZGljLlByZXZpZXdzLkdQcmV2aWV3Q29udHJvbGxlcih0aGlzLmVsZW1lbnQsIHByZXZpZXdQYW5lbHNEZWZpbml0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5wcmV2aWV3Q29udHJvbGxlci5yZWdpc3RlclBhbmVsKCk7XHJcbiAgICAgICAgICAgIC8vS29uZWMgaW5pY2lhbGl6YWNlIHNpZGViYXJ1XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfY3JlYXRlR3JpZCgpIHtcclxuXHJcbiAgICAgICAgICAgIC8vR29yZGljLlNzbC5XZWJDbGllbnQuR0Rva3VtZW50SXNsLkluaXQoKS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgR29yZGljLlNzbC5XZWJDbGllbnQuR0Rva3VtZW50SXNsLkFkZERva3VtZW50R3JpZENvbHVtbnMoXHJcbiAgICAgICAgICAgIC8vICAgICAgICAvLyBWeXR2b8WZZW7DrSBncmlkRm9ybWF0dS4gTmVtdXPDrW0gamVqIHVrbMOhZGF0IGRvIHByb23Em25uw6ksIGFsZSBzdGHEjcOtIHBvc2xhdCBwxZnDrW1vIGRvIG1ldG9keSwgcHJvdG/FvmUgYnVkZSB2IG7DoXZyYXRvdsOpIGhvZG5vdMSbLlxyXG4gICAgICAgICAgICAvLyAgICAgICAgbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdEb2tsYWR5RHRvPigpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjYXB0aW9uOiAnSXhwJyxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgbmFtZTogJ2l4cCdcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgLy8gICAgICAgIC8vIE7DoXp2eSBzbG91cGPFryBkb2t1bWVudHUsIGt0ZXLDvSBjaGNpIHBvdcW+w610IG5hIHN2w6ltIHNlem5hbXUuXHJcbiAgICAgICAgICAgIC8vICAgICAgICBbXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgJ3V6bycsIC8vIGJhcmV2bsOpIG96bmHEjWVuw61cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAnYWt0X3puYWNrYScsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgJ25hemV2JyxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAndHlwX2VudGl0eV9pY28nXHJcbiAgICAgICAgICAgIC8vICAgICAgICBdLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgLy8gTmFzdGF2ZW7DrSB6YW5vxZllbsOtIGRva3VtZW50dS5cclxuICAgICAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBzY29wZTogJ0Rva3VtZW50JyxcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBzY29wZVRpdGxlOiAnRG9rdW1lbnQgbGFiZWwnXHJcbiAgICAgICAgICAgIC8vICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgIClcclxuICAgICAgICAgICAgLy8gICAgICAgIC5kb25lKChncmlkRm9ybWF0KSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gVnl0dm/FmWVuw60gZ3JpZHUgYSBwxZlpZMOhbsOtIG5hIGNvbnRlbnQuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgJCgnPGRpdj4nKVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAuZ2dyaWQ8SW50ZXJmYWNlLkdEb2tsYWR5RHRvPih7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBncmlkRm9ybWF0XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAvL2RhdGE6IEdvcmRpYy5Jc2wuXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy92YXIgZmlsdGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXNcclxuICAgICAgICAgICAgLy8gICAgLkZvcm0oeyB0YWJMYWJlbDogXCJGaWx0ciBzZXpuYW11IGRva2xhZMWvXCIsIG5hbWU6IFwiRG9rbGFkeVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwzTTNTMSwgTC0xLTEwLTEsIE0tMS0xMC0xLCBTLTEtMTAtMVwiIH0pXHJcblxyXG4gICAgICAgICAgICBsZXQgZmlsdGVyRm9ybURlZiA9IEdvcmRpYy5TbWwuV2ViQ2xpZW50Lk9wdGlvbnMuZmlsdGVyRm9ybURlZih0aGlzLmt0Z19kZW4sIHRoaXMuU3RhdkRva2xhZHVGaWx0ZXIsIHRoaXMuU3RhdlBvZHBpc3VGaWx0ZXIsIHRoaXMuTGlzdEZpbHRlcik7XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJGaW5hbmNuaVVkYWplID0gR29yZGljLlNtbC5XZWJDbGllbnQuT3B0aW9ucy5maWx0ZXJGaW5hbmNuaVVkYWplKHRoaXMucHJpel9paXNzcCk7XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJWZWNueVByb2ZpbCA9IEdvcmRpYy5TbWwuV2ViQ2xpZW50Lk9wdGlvbnMuZmlsdGVyVmVjbnlQcm9maWwoKTtcclxuICAgICAgICAgICAgbGV0IGZpbHRlck9zdGF0bmlVZGFqZSA9IEdvcmRpYy5TbWwuV2ViQ2xpZW50Lk9wdGlvbnMuZmlsdGVyT3N0YXRuaVVkYWplKCk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJQYW5lbEVsZW1lbnQgPSAkKFwiPGRpdj5cIikuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiZ2ZpbHRlcnBhbmVsYXBwbHlcIiwgKGV2ZW50LCBvYmopID0+IHsgICAgICAgICAgICAvLyBldmVudGEsIGt0ZXLDoSBqZSB2eXZvbMOhbmEgcMWZaSB2eWhsZWTDoXbDoW7DrS4gb2JqLmZpbHRlciAtPiBobGVkYW7DvSBzZXpuYW0gcG9kbcOtbmVrXHJcbiAgICAgICAgICAgICAgICAgICAgLyogdmFyIHBvdXplTmF2YXphbmU6IGJvb2xlYW4gPSBvYmouZmlsdGVyLnBvdXplTmF2YXphbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgIHZhciByb2s6IGJvb2xlYW4gPSBvYmouZmlsdGVyLnJvaztcclxuICAgICAgICAgICAgICAgICAgICAgdmFyIHVjc05rczogYm9vbGVhbiA9IG9iai5maWx0ZXIudWNzTmtzO1xyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWREYXRhKHBvdXplTmF2YXphbmUsIHJvaywgdWNzTmtzKTsqL1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1zOiBbZmlsdGVyRm9ybURlZiwgZmlsdGVyRmluYW5jbmlVZGFqZSwgZmlsdGVyVmVjbnlQcm9maWwsIGZpbHRlck9zdGF0bmlVZGFqZV0sICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3ByZWRhbmkgZGVmaW5pYyBmb3JtdWxhcnVcclxuICAgICAgICAgICAgICAgICAgICBmYXZvcml0ZXM6IFtcIml4cFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAvL3NpbXBsZU1vZGVBdXRvTG9hZEFmdGVyQ3JlYXRlUGFuZWw6IHRydWUsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwbyB2eXR2b8WZZW7DrSBwYW5lbHUgc2Ugcm92bm91IG5hxI10ZSBwb2RsZSBpbml0aWFsVmFsdWUgdmUgZm9ybXVsw6HFmWlcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJWaWV3TW9kZTogRmlsdGVyVmlld01vZGUuRGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5maWx0ZXJQYW5lbEVsZW1lbnQuZ2ZpbHRlcnBhbmVsKCdhcHBseUZpbHRlcicsIHRoaXMuZmlsdGVyUGFuZWxFbGVtZW50LmdmaWx0ZXJwYW5lbCgnZ2V0Q3VycmVudERhdGEnKS5maWx0ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbHRlclBhbmVsRWxlbWVudC5nZmlsdGVycGFuZWwoJ2FwcGx5RmlsdGVyJywgdGhpcy5MaXN0RmlsdGVyKTtcclxuICAgICAgICAgICAgdGhpcy52aWV3X0lTTCA9IG5ldyBHb3JkaWMuSXNsLlZpZXcodGhpcy5pc2wuRG9rbGFkeS5saXN0TmV3KHtcclxuICAgICAgICAgICAgICAgIC8vZnJhZ21lbnRzOiBbXCJzbWxzcGFjLipcIiwgXCJ3ZmxzcGlkLipcIiwgXCIqXCJdLFxyXG4gICAgICAgICAgICAgICAgZmlsdGVyczogeyBrdGdfZGVuOiB0aGlzLmt0Z19kZW4gfVxyXG4gICAgICAgICAgICB9KSwgeyBmaWx0ZXJQYW5lbDogdGhpcy5maWx0ZXJQYW5lbEVsZW1lbnQsIHN0YXJ0RW1wdHk6IHRydWUgfSk7XHJcblxyXG5cclxuICAgICAgICAgICAgLy9QxZlpZMOhbsOtIHLFr3puw71jaCByb3rFocOtxZllbsOtIHogV0ZMIGRvIGdyaWR1IG5hIHNlem5hbXUgZG9rbGFkxa9cclxuICAgICAgICAgICAgLy8gVE9ETzogemFrb21lbnRvdsOhbm8ga3bFr2xpIHByb2Jsw6ltb3bDqSBzeW5jaHJvbml6YWNpIC0gcGFrIHDFmcOtcGFkbsSbIG9ka29tZW50b3ZhdCwgYWxlIHN0ZWpuxJsgdG8gdcW+IGFzaSBuZW7DrSBwb3TFmWViYSAuLi5cclxuICAgICAgICAgICAgdmFyIGdyaWRGb3JtYXQgPSB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKTtcclxuICAgICAgICAgICAgLy9Hb3JkaWMuU3NsLldlYkNsaWVudC5HRG9rdW1lbnRJc2wuQWRkR3JpZENvbHVtbnMoXHJcbiAgICAgICAgICAgIC8vICAgIC8vIFZ5dHZvxZllbsOtIGdyaWRGb3JtYXR1LiBOZW11c8OtbSBqZWogdWtsw6FkYXQgZG8gcHJvbcSbbm7DqSwgYWxlIHN0YcSNw60gcG9zbGF0IHDFmcOtbW8gZG8gbWV0b2R5LCBwcm90b8W+ZSBidWRlIHYgbsOhdnJhdG92w6kgaG9kbm90xJsuXHJcbiAgICAgICAgICAgIC8vICAgIHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAvLyAgICB0aGlzLmlzbCxcclxuICAgICAgICAgICAgLy8gICAgLy8gTsOhenZ5IHNsb3VwY8WvIGRva3VtZW50dSwga3RlcsO9IGNoY2kgcG91xb7DrXQgbmEgc3bDqW0gc2V6bmFtdS5cclxuICAgICAgICAgICAgLy8gICAgW1xyXG4gICAgICAgICAgICAvLyAgICAgICAgXCJ1em9cIiwgLy8gYmFyZXZuw6kgb3puYcSNZW7DrVxyXG4gICAgICAgICAgICAvLyAgICAgICAgXCJha3Rfem5hY2thXCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBcIm5hemV2XCIsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBcInR5cF9lbnRpdHlfaWNvXCJcclxuICAgICAgICAgICAgLy8gICAgXSxcclxuICAgICAgICAgICAgLy8gICAgLy8gTmFzdGF2ZW7DrSB6YW5vxZllbsOtIGRva3VtZW50dS5cclxuICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgc2NvcGVMZXZlbHM6IFt7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgc2NvcGU6IFwiZG9rdW1lbnRcIixcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBzY29wZVRpdGxlOiBcImpyZXM6MzM1MDA2NDNcIiAvL1JDIDMzNTAwNjQzIDogRG9rdW1lbnQgbGFiZWxcclxuICAgICAgICAgICAgLy8gICAgICAgIH1dXHJcbiAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgLy8pXHJcbiAgICAgICAgICAgIC8vICAgIC5kb25lKChncmlkRm9ybWF0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZ5dHZvxZllbsOtIGdyaWR1IGEgcMWZaWTDoW7DrSBuYSBjb250ZW50LlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGdyaWQgPSAkKCc8ZGl2PicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5nZ3JpZDxJbnRlcmZhY2UuR0Rva2xhZHlEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGdyaWRGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHRNZW51OiB0aGlzLnZ5dHZvckNvbnRleHRvdmVNZW51KCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IEVrby5HcmlkLmdldExpc3RXZmxDb2x1bW5zKHRydWUpICsgXCIsIGl4cCwgXCIgKyB0aGlzLkRlZmluaXRpb25Db2x1bW1uc0xpc3RHcmlkMigpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOiB0aGlzLm15X0NvbmRGb3JtYXRzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMudmlld19JU0wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiBuZXcgR0FjdGlvbih7ICAgICAvL29ic2x1em5hIGFrY2UsIGt0ZXJhIHNlIHNwb3VzdGkgZGJsIGNsaWNrZW0gbmFkIHJhZGtlbVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gdGhpcy4kZ3JpZC5nZ3JpZDxJbnRlcmZhY2UuR0Rva2xhZHlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93WzBdLml4cCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGlhbG9ncy5HU21sRGV0YWlsT3BlbkRsZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29udGVudDogdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBfZG9rbGFkdTogcm93WzBdLml4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR3JpZDogdGhpcy4kZ3JpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmRvbmUoKG8pID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGU6IChldiwgY3R4KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHggIT0gbnVsbCAmJiBjdHguY2VsbEluZm8gIT0gbnVsbCAmJiBjdHguY2VsbEluZm8uZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyLnNob3coY3R4LmNlbGxJbmZvLmRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyLmVuYWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5nYXV0b2ZpdCh7IHJlc2l6ZXJzT25UYWI6IGZhbHNlIH0pOztcclxuICAgICAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRGVmaW5vdsOhbsOtIG7DoXp2xa8gc2xvdXBjxa8gdXLEjWVuw6kgZG8gZ3JpZHUgcHJvIHZsYXN0bm9zdCBjb2x1bW5MaXN0XHJcbiAgICAgICAgcHJpdmF0ZSBEZWZpbml0aW9uQ29sdW1tbnNMaXN0R3JpZDIoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c19mdW5fYWt0X3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnBvY19lcHJpLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMucG9yYWRpLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuc21sX3N0YXYsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHAsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5hY19zbWwsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5hYyxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnBvcGlzLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMubWVuYV90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX21lbmFfZG9jLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19tZW5hLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYyxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfbWVuYV9kb2NfYmV6X2RwaCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfbWVuYV9kb2NfZHBoLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19tZW5hX2RvY19zX2RwaCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnR5cF9jZW55LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3ByaWpfcG9kLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMudHlwX3BsYXRub3N0X3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF91emF2cmVuaSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF9wbGF0bm9zdCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF91Y2lubm9zdCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF9zZ24sXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5maW5fb2QsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5maW5fZG8sXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5wb3puYW1rYSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c190eXBfdHh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX2VzdV90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX3BvbCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfZG9kLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaWNvX2VzdSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnJjX2VzdSxcclxuICAgICAgICAgICAgICAgIC8vSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZXN1X2lyLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYnVfY2ksXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZnVuX3Z5cml6X3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF9zZ25fZXh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX2Z1bl9yZWZfdHh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMubmF6ZXYsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZnVuX2FrdF90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jaXNfcmVhbF90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5zb3V0ZXosXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5hY192ZXJfemFrLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMudWNpbm5vc3QsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5hY19kb2tfMSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c19vcmpfdHh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYWNfZG9rXzIsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfZG9rXzEsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5ua3MsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfZG9rXzIsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX2ZhayxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfb2JqX3NtbCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfcm9rX3JvayxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfcG9sX3JvayxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfZmFrX3JvayxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF96dmUsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfcHJpLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX3JlZl96YXN0X3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c19lc3VfemFzdF90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfenVrX3R4dCxcclxuICAgICAgICAgICAgICAgIC8vSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMudHlwX3BobCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnZzLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuc2duX3N0YXYsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfdWtvLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3NnbixcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnByaXpfb3BjZVxyXG5cclxuICAgICAgICAgICAgXS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9EZWZpbm92w6Fuw60gcHJvcGVydHkgc2xvdXBjxa9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdDxJbnRlcmZhY2UuR0Rva2xhZHlEdG8+IHtcclxuXHJcbiAgICAgICAgICAgIHZhciBnZiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HRG9rbGFkeUR0bz4oKTtcclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX2Z1bl9ha3RfdHh0LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNTYwXCIsIC8vUkMgMzM1MDA1NjAgOiBWbGFzdG7DrWtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA1NjFcIiwgLy9SQyAzMzUwMDU2MSA6IFZsYXN0bsOtayBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZG9rdW1lbnQ/Lml4c19mdW5fYWt0ID09IHRoaXMuaXhzRnVuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMzNTAwNjQxXCI7IC8vUkMgMzM1MDA2NDEgOiBBbm9cclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzM1MDA2NDJcIjsgLy9SQyAzMzUwMDY0MiA6IE5lXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBnZi5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuc21sX3N0YXYsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA1NjJcIiwgLy9SQyAzMzUwMDU2MiA6IFN0YXYgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDU2M1wiLCAvL1JDIDMzNTAwNTYzIDogU3RhdiBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLlN0YXZEb2tsYWR1RmlsdGVyLmZpbmQoeCA9PiB4LnNtbF9zdGF2ID09IHZhbHVlLnNtbF9zdGF2KT8uc21sX3N0YXZfdHh0ID8/IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5wcmVldmlkZW5jZSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDU2NFwiLCAvL1JDIDMzNTAwNTY0IDogU3RhdiBwxZllZXZpZGVuY2VcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA1NjRcIixcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA3MCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRQaWQoZ2YsIHsgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhwLCB3aWR0aDogMTUwIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEFnZW5kb3ZlQ2lzbG8oZ2YsIHsgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYWNfc21sIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEV2aWRlbmNuaUNpc2xvKGdmLCB7IG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmFjIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFZzKGdmLCB7IG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnZzIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZENhc3RrYShnZik7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkVHlwRG9rbGFkdShnZik7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkWnByYWNvdmF0ZWwoZ2YpO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEtvbXBldGVudChnZik7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkUmVhbGl6YXRvcihnZiwgeyBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jaXNfcmVhbF90eHQgfSk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkTWVuYShnZiwgeyBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5tZW5hX3R4dCB9KTtcclxuICAgICAgICAgICAgLy9Hb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZENhc3RrYUNaSyAoZ2YpO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEljb1N1Ympla3R1KGdmLCB7IG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmljb19lc3UgfSk7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkUmNTdWJqZWt0dShnZiwgeyBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5yY19lc3UgfSk7XHJcblxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmMsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA1NjVcIiwgLy9SQyAzMzUwMDU2NSA6IFJvenBpcyBDWktcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA1NjVcIixcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5wb2NfZXByaSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDU2NlwiLCAvL1JDIDMzNTAwNTY2IDogIyBlUHJpXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNTY3XCIsIC8vUkMgMzM1MDA1NjcgOiBQb8SNZXQgZWxla3Ryb25pY2vDvWNoIHDFmcOtbG9oXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNTAsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGdmLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5wb3JhZGksXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA1NjlcIiwgLy9SQyAzMzUwMDU2OSA6ICNcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA1NjhcIiwgLy9SQyAzMzUwMDU2OCA6IFBvxZlhZMOtIGRva3VtZW50dVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDcwLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnBvcGlzLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNTcwXCIsIC8vUkMgMzM1MDA1NzAgOiBQb3Bpc1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDU3MVwiLCAvL1JDIDMzNTAwNTcxIDogUG9waXMgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDcwLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLm1lbmFfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDU3MlwiLCAvL1JDIDMzNTAwNTcyIDogTcSbbmFcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNTczXCIsIC8vUkMgMzM1MDA1NzMgOiBNxJtuYSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDcwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX21lbmFfZG9jLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDU3NFwiLCAvL1JDIDMzNTAwNTc0IDogQ2VuYSBzbWxvdXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDU3NVwiLCAvL1JDIDMzNTAwNTc1IDogQ2VuYSBzbWxvdXZ5IGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTEwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19tZW5hX2RvY19iZXpfZHBoLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDU3NlwiLCAvL1JDIDMzNTAwNTc2IDogQ2VuYSBiZXogRFBIXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDU3N1wiLCAvL1JDIDMzNTAwNTc3IDogQ2VuYSBiZXogRFBIXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyMCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19tZW5hX2RvY19kcGgsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNTc4XCIsIC8vUkMgMzM1MDA1NzggOiBEUEhcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNTc4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX21lbmFfZG9jX3NfZHBoLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDU3OVwiLCAvL1JDIDMzNTAwNTc5IDogQ2VuYSBzIERQSFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA1NzlcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnR5cF9jZW55LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDU4MFwiLCAvL1JDIDMzNTAwNTgwIDogVHlwIGNlbnlcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNTgxXCIsIC8vUkMgMzM1MDA1ODEgOiBUeXAgY2VueSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKHZhbHVlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUudHlwX2NlbnkgPT0gMTApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMzNTAwNTgyXCI7IC8vUkMgMzM1MDA1ODIgOiBQZXZuw6FcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUudHlwX2NlbnkgPT0gMjApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMzNTAwNTgzXCI7IC8vUkMgMzM1MDA1ODMgOiBWb2xuw6FcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfcHJpal9wb2QsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNTg0XCIsIC8vUkMgMzM1MDA1ODQgOiBFdmlkb3bDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDU4NFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMudHlwX3BsYXRub3N0X3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA1ODVcIiwgLy9SQyAzMzUwMDU4NSA6IFR5cCBwbGF0bm9zdGlcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNTg1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfdXphdnJlbmksXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNTg2XCIsIC8vUkMgMzM1MDA1ODYgOiBVemF2xZllbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDU4NlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3BsYXRub3N0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDU4N1wiLCAvL1JDIDMzNTAwNTg3IDogVWtvbsSNZW7DrSBwbGF0bm9zdGlcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNTg3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfdWNpbm5vc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNTg4XCIsIC8vUkMgMzM1MDA1ODggOiDDmsSNaW5ub3N0XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDU4OFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3NnbixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA1ODlcIiwgLy9SQyAzMzUwMDU4OSA6IERhdHVtIHBvZHBpc3VcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNTg5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmZpbl9vZCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA1OTBcIiwgLy9SQyAzMzUwMDU5MCA6IEZpbmFuY292w6Fuw60gb2RcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNTkxXCIsIC8vUkMgMzM1MDA1OTEgOiBGaW5hbmNvdsOhbsOtIG9kXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmZpbl9kbyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA1OTJcIiwgLy9SQyAzMzUwMDU5MiA6IEZpbmFuY292w6Fuw60gZG9cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNTkzXCIsIC8vUkMgMzM1MDA1OTMgOiBGaW5hbmNvdsOhbsOtIGRvXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5wb3puYW1rYSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA1OTRcIiwgLy9SQyAzMzUwMDU5NCA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA1OTVcIiwgLy9SQyAzMzUwMDU5NSA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX2VzdV90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNTk2XCIsIC8vUkMgMzM1MDA1OTYgOiBQcm90aXN0cmFuYVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA1OTdcIiwgLy9SQyAzMzUwMDU5NyA6IFByb3Rpc3RyYW5hXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfcG9sLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDU5OFwiLCAvL1JDIDMzNTAwNTk4IDogUG9sb8W+a3kgRlBcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNTk4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfZG9kLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDU5OVwiLCAvL1JDIDMzNTAwNTk5IDogRG9kYXRreVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA1OTlcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZXN1X3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA2MDBcIiwgLy9SQyAzMzUwMDYwMCA6IFByb3Rpc3RyYW5hXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDYwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYnVfY2kvKl90eHQqLyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA2MDFcIiwgLy9SQyAzMzUwMDYwMSA6IELDmiBwcm90aXN0cmFueVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA2MDFcIixcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUuYnVfY2k/LnRyaW0oKSAhPSBcIlwiICYmIHZhbHVlLnNrX2NpPy50cmltKCkgIT0gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5idV9jaSArIFwiXFxcXFwiICsgdmFsdWUuc2tfY2k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzM1MDA2NDBcIjsgLy9SQyAzMzUwMDY0MCA6IE5lemFkw6Fub1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfc2duX2V4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA2MDJcIiwgLy9SQyAzMzUwMDYwMiA6IERhdHVtIHBvZHBpc3UgcHJvdGlzdHJhbnlcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNjAyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZnVuX3JlZl90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNjAzXCIsIC8vUkMgMzM1MDA2MDMgOiBSZWZlcmVudFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA2MDRcIiwgLy9SQyAzMzUwMDYwNCA6IFJlZmVyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5uYXpldi8qX3NtbCovLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDYwNVwiLCAvL1JDIDMzNTAwNjA1IDogw5pwbG7DvSBuw6F6ZXZcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNjA1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5zb3V0ZXosXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNjA2XCIsIC8vUkMgMzM1MDA2MDYgOiBTb3V0ZcW+XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDYwNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYWNfdmVyX3phayxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA2MDdcIiwgLy9SQyAzMzUwMDYwNyA6IMSMw61zbG8gVlosIERULCBQT1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA2MDdcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnVjaW5ub3N0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDYwOFwiLCAvL1JDIDMzNTAwNjA4IDogw5rEjWlubm9zdCAtIGtvbWVudMOhxZlcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNjA4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5hY19kb2tfMSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA2MDlcIiwgLy9SQyAzMzUwMDYwOSA6IFNvdXZpc2Vqw61jw60gZG9rdW1lbnQgMVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA2MDlcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c19vcmpfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDYxMFwiLCAvL1JDIDMzNTAwNjEwIDogT3JnYW5pemHEjW7DrSBqZWRub3RrYVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA2MTFcIiwgLy9SQyAzMzUwMDYxMSA6IE9yZ2FuaXphxI1uw60gamVkbm90a2FcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmFjX2Rva18yLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzUwMDYxMlwiLCAvL1JDIDMzNTAwNjEyIDogU291dmlzZWrDrWPDrSBkb2t1bWVudCAyXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDYxM1wiLCAvL1JDIDMzNTAwNjEzIDogU291dmlzZWrDrWPDrSBkb2t1bWVudCAyXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfZG9rXzEsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNjE0XCIsIC8vUkMgMzM1MDA2MTQgOiBEYXR1bSBTRDFcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNjE1XCIsIC8vUkMgMzM1MDA2MTUgOiBEYXR1bSBTRDFcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLm5rcyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA2MTZcIiwgLy9SQyAzMzUwMDYxNiA6IE5LU1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA2MTZcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF9kb2tfMixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA2MTdcIiwgLy9SQyAzMzUwMDYxNyA6IERhdHVtIFNEMlxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA2MTdcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX2ZhayxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA2MThcIiwgLy9SQyAzMzUwMDYxOCA6IE/EjWVrw6F2YW7DqSDEjWVycMOhbsOtIGtyZWRpdHVcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNjE4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX2Zha19yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNjE5XCIsIC8vUkMgMzM1MDA2MTkgOiBPxI1la8OhdmFuw6kgxI1lcnDDoW7DrSBwxZnDrXBhZGVtIHYgYWt0LiBvYmQuIENaS1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA2MTlcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX29ial9zbWwsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNjIwXCIsIC8vUkMgMzM1MDA2MjAgOiBPYmplZG7DoW5vIFNNTCBwxZnDrXBhZHVcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNjIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX3Jva19yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNjIxXCIsIC8vUkMgMzM1MDA2MjEgOiBSb3pwaXMgcMWZw61wYWR1IHYgYWt0LiBvYmQuIENaS1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA2MjFcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfcG9sX3JvayxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA2MjJcIiwgLy9SQyAzMzUwMDYyMiA6IFBvbG/Fvmt5IEZQIHDFmcOtcGFkdSB2IGFrdC4gb2JkLiBDWktcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNjIyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy4sXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIk/EjWVrw6F2YW7DqSDEjWVycMOhbsOtIHDFmcOtcGFkZW0gdiBha3QuIG9iZC4gQ1pLXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBkZXNjcmlwdGlvbjogXCJPxI1la8OhdmFuw6kgxI1lcnDDoW7DrSBwxZnDrXBhZGVtIHYgYWt0LiBvYmQuIENaS1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgLy99KSAgIFxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF96dmUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNjIzXCIsIC8vUkMgMzM1MDA2MjMgOiBEYXR1bSB6dmXFmWVqbsSbbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDYyM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX3ByaSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA2MjRcIiwgLy9SQyAzMzUwMDYyNCA6IFZlxZllam7DoSB6YWvDoXprYVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA2MjRcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnR5cF9waGwsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNjI1XCIsIC8vUkMgMzM1MDA2MjUgOiBUeXAgcG9obGVkw6F2a3lcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNjI1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJaw6FzdHVwY2Ugdmxhc3Ruw60gc3RyYW55XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBkZXNjcmlwdGlvbjogXCJaw6FzdHVwY2Ugdmxhc3Ruw60gc3RyYW55XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIC8vICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLixcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwiWsOhc3R1cGNlIFByb3Rpc3RyYW55XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBkZXNjcmlwdGlvbjogXCJaw6FzdHVwY2UgUHJvdGlzdHJhbnlcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMudnMsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIlZTXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBkZXNjcmlwdGlvbjogXCJWU1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c19yZWZfemFzdF90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNjI2XCIsIC8vUkMgMzM1MDA2MjYgOiBaw6FzdHVwY2Ugdmxhc3Ruw60gc3RyYW55XHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDYyNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX2VzdV96YXN0X3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA2MjdcIiwgLy9SQyAzMzUwMDYyNyA6IFrDoXN0dXBjZSBQcm90aXN0cmFueVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM1MDA2MjhcIiwgLy9SQyAzMzUwMDYyOCA6IFrDoXN0dXBjZSBQcm90aXN0cmFueVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX3p1a190eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNjI5XCIsIC8vUkMgMzM1MDA2MjkgOiBacMWvc29iIHVrb27EjWVuw61cclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNjMwXCIsIC8vUkMgMzM1MDA2MzAgOiBacMWvc29iIHVrb27EjWVuw61cclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF91a28sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNjMxXCIsIC8vUkMgMzM1MDA2MzEgOiBEYXR1bSB1a29uxI1lbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDYzMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuc2duX3N0YXYsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNjMyXCIsIC8vUkMgMzM1MDA2MzIgOiBTdGF2IHBvZHBpc3VcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNjMyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxUZW1wbGF0ZTogKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5zZ25fc3RhdiA9PSAxMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzM1MDA2MzNcIjsgLy9SQyAzMzUwMDYzMyA6IFBvZGVwc8Ohbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwianJlczozMzUwMDYzNFwiOyAvL1JDIDMzNTAwNjM0IDogTmVwb2RlcHPDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5wcml6X29wY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZS5wcml6X29wY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJqcmVzOjMzNTAwNjM1XCI7IC8vUkMgMzM1MDA2MzUgOiBOZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImpyZXM6MzM1MDA2MzZcIjsgLy9SQyAzMzUwMDYzNiA6IEFub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNTAwNjM3XCIsIC8vUkMgMzM1MDA2MzcgOiBNb8W+bm9zdCBvcGNlXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzUwMDYzN1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3NnbixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM1MDA2MzhcIiwgLy9SQyAzMzUwMDYzOCA6IERhdHVtIHBvZHBpc3VcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJqcmVzOjMzNTAwNjM4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vc2xvdXBjZSBGaW5hbsSNbsOtLCDDmsSNZXRuw60gYSBQcsWvYsSbxb5uw6EgXHJcbiAgICAgICAgICAgIGdmLmFkZEljb25Db2x1bW4oR29yZGljLldmbC5HbG9iYWxzLkxpc3RTdXBwb3J0LlN0YXZGS0NvbHVtbigpKTtcclxuICAgICAgICAgICAgZ2YuYWRkSWNvbkNvbHVtbihHb3JkaWMuV2ZsLkdsb2JhbHMuTGlzdFN1cHBvcnQuU3RhdlVLQ29sdW1uKCkpO1xyXG4gICAgICAgICAgICBnZi5hZGRJY29uQ29sdW1uKEdvcmRpYy5XZmwuR2xvYmFscy5MaXN0U3VwcG9ydC5TdGF2UEtDb2x1bW4oKSk7XHJcblxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFN0YXZFa29TY2h2YWxDb2x1bW4oZ2YpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2Y7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0RlZmludWplIHBvxZlhZMOtIGRva2xhZMWvIGEgcMWZaWTDoSBwb8WZYWTDrSBkbyBkdG9cclxuICAgICAgICAvL0RlZmludWplIHN0YXYgcHJlZXZpZGVuY2VcclxuICAgICAgICBacHJhY3VqU21sb3V2eUR0byhkYXRhOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9bXSk6IEludGVyZmFjZS5HRG9rbGFkeUR0b1tdIHtcclxuXHJcbiAgICAgICAgICAgIGRhdGEubWFwKChkYXRhSXRlbTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhSXRlbS5wb3JhZGkgPSBpbmRleCArIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5la29Cb29rLml4cF9kZW4gIT0gZGF0YUl0ZW0uaXhwX2RlbilcclxuICAgICAgICAgICAgICAgICAgICBkYXRhSXRlbS5wcmVldmlkZW5jZSA9IFwiLVwiO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoTnVtYmVyKGRhdGFJdGVtLnByZWV2aWQpID4gMCAmJiB0aGlzLmVrb0Jvb2suaXhwX2RlbiA9PSBkYXRhSXRlbS5peHBfZGVuKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJdGVtLnByZWV2aWRlbmNlID0gXCIrXCI7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgfVxyXG59Il19