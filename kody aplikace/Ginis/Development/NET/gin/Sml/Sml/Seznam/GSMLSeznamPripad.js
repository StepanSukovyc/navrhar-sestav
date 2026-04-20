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
            let GSMLSeznamPripad = class GSMLSeznamPripad extends Gordic.GContentBase {
                onContentReady() {
                    const that = this;
                    this._createMenu();
                    this._createSideBar();
                    this._createGrid();
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
                    //let akce: ObjectLiteral<GActionParamsDefObj | GAction> = {
                    //    //********************************************
                    //    //  T L A Č Í T K O   -   P o d á n í
                    //    //********************************************
                    //    actPodani:
                    //        Gordic.Eko.Action.actionPodat({                                                                         // společná akce Podání
                    //            run: () => {
                    //                let selectedRow = this.$grid.ggrid<Interface.GSmlouvyDto>("getSelection");
                    //                Dialogs.GSmlDetailOpenDlg({
                    //                    parentContent: this,
                    //                    opt: { ixp: selectedRow[0].ixp }
                    //                }).done((o) => {
                    //                });
                    //            },
                    //        }),
                    //
                    // Horní menu.
                    const menuBarPole = [];
                    menuBarPole.push({
                        action: that.actions.add(new GAction($.extend(Gordic.Prefabs.Icons.IconToActionParams(Gordic.Gin.Globals.Icons.ZobrazitDetail()), {
                            caption: "Detail",
                            tooltip: "Detail dokladu",
                            name: "Detail dokladu",
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
                            },
                            favorite: true
                        })))
                    });
                    return menuBarPole;
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
                    //Vytvoření gridu
                    //Data získána z ISL listu Smlouvy
                    Gordic.Isl.Doklady.listNew({
                        fragments: ["smlspac.*", "wflspid.*", "*"],
                        filters: { smlspac_ixp_den: this.ixpKniha, smlspid_ktg_den: this.ktg_den }
                    }).getData().done((data) => {
                        this.$grid = $("<div>")
                            .appendTo(this.element)
                            .ggrid({
                            columnMode: "full",
                            data: this.ZpracujSmlouvyDto(data),
                            multi: true,
                            defaultProfile: {
                                columnList: this.definiceSloupcuGrid(),
                                grouping: ["ixp_sml_pri" /* Interface.GDokladyDtoNames.ixp_sml_pri */].toString(),
                            },
                            scrollHelperTemplate: "<h1>{ac_sml:letter}</h1>",
                            contextMenu: this.vytvorContextoveMenu(),
                            columns: this.createGridFormat(),
                            defaultAction: new GAction({
                                name: "gridRowSelectedAct",
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
                        });
                    });
                }
                // Definování názvů sloupců určené do gridu pro vlastnost columnList
                definiceSloupcuGrid() {
                    return [
                        "ixs_fun_akt_txt" /* Interface.GDokladyDtoNames.ixs_fun_akt_txt */,
                        "TechnickeVlastnosti",
                        "PoziceSpis",
                        "StavZpracovani",
                        "TerminIcoColumn",
                        "TerminDilciIcoColumn",
                        "DoplnujiciInformace",
                        "poc_epri" /* Interface.GDokladyDtoNames.poc_epri */,
                        "poradi" /* Interface.GDokladyDtoNames.poradi */,
                        "sml_stav_txt" /* Interface.GDokladyDtoNames.sml_stav_txt */,
                        "preevidence" /* Interface.GDokladyDtoNames.preevidence */,
                        "ixp" /* Interface.GDokladyDtoNames.ixp */,
                        "ac_sml" /* Interface.GDokladyDtoNames.ac_sml */,
                        "ac" /* Interface.GDokladyDtoNames.ac */,
                        "popis" /* Interface.GDokladyDtoNames.popis */,
                        "mena_txt" /* Interface.GDokladyDtoNames.mena_txt */,
                        "c_mena_doc" /* Interface.GDokladyDtoNames.c_mena_doc */,
                        "c_mena" /* Interface.GDokladyDtoNames.c_mena */,
                        "c" /* Interface.GDokladyDtoNames.c */,
                        "ixp_sml_pri" /* Interface.GDokladyDtoNames.ixp_sml_pri */,
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
                        "bu_protiucet" /* Interface.GDokladyDtoNames.bu_protiucet */,
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
                        "dat_uko" /* Interface.GDokladyDtoNames.dat_uko */,
                        "dat_sgn" /* Interface.GDokladyDtoNames.dat_sgn */,
                        "priz_opce" /* Interface.GDokladyDtoNames.priz_opce */
                    ].toString();
                }
                //Definování property sloupců
                createGridFormat() {
                    var gf = new Gordic.Data.GridFormat();
                    Gordic.Wfl.GWflCommonDlg.AddDokumentyColumnsDlg(gf);
                    gf.addTextColumn({
                        name: "ixs_fun_akt_txt" /* Interface.GDokladyDtoNames.ixs_fun_akt_txt */,
                        caption: "Vlastník",
                        description: "Vlastník dokladu",
                        width: 70,
                        cellTemplate: (data) => {
                            if (data.wflspid?.ixs_fun_akt == this.ixsFun)
                                return "Ano";
                            else
                                return "Ne";
                        }
                    });
                    gf.addTextColumn({
                        name: "sml_stav_txt" /* Interface.GDokladyDtoNames.sml_stav_txt */,
                        caption: "Stav dokladu",
                        description: "Stav dokladu",
                        width: 70,
                    });
                    gf.addTextColumn({
                        name: "preevidence" /* Interface.GDokladyDtoNames.preevidence */,
                        caption: "Stav přeevidence",
                        description: "Stav přeevidence",
                        width: 70,
                    });
                    Gordic.Eko.Grid.Column.addPid(gf, { name: "ixp" /* Interface.GDokladyDtoNames.ixp */ });
                    Gordic.Eko.Grid.Column.addAgendoveCislo(gf, { name: "ac_sml" /* Interface.GDokladyDtoNames.ac_sml */ });
                    Gordic.Eko.Grid.Column.addEvidencniCislo(gf, { name: "ac" /* Interface.GDokladyDtoNames.ac */ });
                    Gordic.Eko.Grid.Column.addVs(gf, { name: "vs" /* Interface.GDokladyDtoNames.vs */ });
                    Gordic.Eko.Grid.Column.addCastka(gf);
                    Gordic.Eko.Grid.Column.addTypDokladu(gf);
                    Gordic.Eko.Grid.Column.addZpracovatel(gf);
                    Gordic.Eko.Grid.Column.addKompetent(gf);
                    Gordic.Eko.Grid.Column.addRealizator(gf);
                    Gordic.Eko.Grid.Column.addMena(gf, { name: "mena_txt" /* Interface.GDokladyDtoNames.mena_txt */ });
                    //Gordic.Eko.Grid.Column.addCastkaCZK (gf);
                    Gordic.Eko.Grid.Column.addIcoSubjektu(gf);
                    Gordic.Eko.Grid.Column.addRcSubjektu(gf);
                    gf.addTextColumn({
                        name: "c" /* Interface.GDokladyDtoNames.c */,
                        caption: "Rozpis CZK",
                        description: "Rozpis CZK",
                        width: 50,
                    });
                    gf.addTextColumn({
                        name: "ixp_sml_pri" /* Interface.GDokladyDtoNames.ixp_sml_pri */,
                        caption: "Identifikátor případu",
                        description: "Identifikátor případu",
                        width: 50,
                    });
                    gf.addTextColumn({
                        name: "poc_epri" /* Interface.GDokladyDtoNames.poc_epri */,
                        caption: "# ePri",
                        description: "Počet elektronických příloh",
                        width: 50,
                    });
                    gf.addNumberColumn({
                        name: "poradi" /* Interface.GDokladyDtoNames.poradi */,
                        caption: "#",
                        description: "Pořadí dokumentu",
                        width: 70,
                    });
                    gf.addTextColumn({
                        name: "popis" /* Interface.GDokladyDtoNames.popis */,
                        caption: "Popis",
                        description: "Popis dokladu",
                        width: 70,
                    })
                        .addTextColumn({
                        name: "mena_txt" /* Interface.GDokladyDtoNames.mena_txt */,
                        caption: "Měna",
                        description: "Měna dokladu",
                        width: 70,
                    })
                        .addTextColumn({
                        name: "c_mena_doc" /* Interface.GDokladyDtoNames.c_mena_doc */,
                        caption: "Cena smlouvy",
                        description: "Cena smlouvy dokladu",
                        width: 110,
                    })
                        .addTextColumn({
                        name: "c_mena_doc_bez_dph" /* Interface.GDokladyDtoNames.c_mena_doc_bez_dph */,
                        caption: "Cena bez DPH",
                        description: "Cena bez DPH",
                        width: 120,
                    })
                        .addTextColumn({
                        name: "c_mena_doc_dph" /* Interface.GDokladyDtoNames.c_mena_doc_dph */,
                        caption: "DPH",
                        description: "DPH",
                        width: 50,
                    })
                        .addTextColumn({
                        name: "c_mena_doc_s_dph" /* Interface.GDokladyDtoNames.c_mena_doc_s_dph */,
                        caption: "Cena s DPH",
                        description: "Cena s DPH",
                        width: 50,
                    })
                        .addTextColumn({
                        name: "typ_ceny" /* Interface.GDokladyDtoNames.typ_ceny */,
                        caption: "Typ ceny",
                        description: "Typ ceny dokladu",
                        width: 80,
                        cellTemplate: (value) => {
                            if (value.typ_ceny == 10)
                                return "Pevná";
                            else if (value.typ_ceny == 20)
                                return "Volná";
                            else
                                return "";
                        }
                    })
                        .addDateColumn({
                        name: "dat_prij_pod" /* Interface.GDokladyDtoNames.dat_prij_pod */,
                        caption: "Evidováno",
                        description: "Evidováno",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "typ_platnost_txt" /* Interface.GDokladyDtoNames.typ_platnost_txt */,
                        caption: "Typ platnosti",
                        description: "Typ platnosti",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_uzavreni" /* Interface.GDokladyDtoNames.dat_uzavreni */,
                        caption: "Uzavření",
                        description: "Uzavření",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_platnost" /* Interface.GDokladyDtoNames.dat_platnost */,
                        caption: "Ukončení platnosti",
                        description: "Ukončení platnosti",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_ucinnost" /* Interface.GDokladyDtoNames.dat_ucinnost */,
                        caption: "Účinnost",
                        description: "Účinnost",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_sgn" /* Interface.GDokladyDtoNames.dat_sgn */,
                        caption: "Datum podpisu",
                        description: "Datum podpisu",
                        width: 80,
                    })
                        .addNumberColumn({
                        name: "fin_od" /* Interface.GDokladyDtoNames.fin_od */,
                        caption: "Financování od",
                        description: "Financování od",
                        width: 80,
                    })
                        .addNumberColumn({
                        name: "fin_do" /* Interface.GDokladyDtoNames.fin_do */,
                        caption: "Financování do",
                        description: "Financování do",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "poznamka" /* Interface.GDokladyDtoNames.poznamka */,
                        caption: "Poznámka",
                        description: "Poznámka",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_esu_txt" /* Interface.GDokladyDtoNames.ixs_esu_txt */,
                        caption: "Protistrana",
                        description: "Protistrana",
                        width: 80,
                    })
                        .addNumberColumn({
                        name: "c_pol" /* Interface.GDokladyDtoNames.c_pol */,
                        caption: "Položky FP",
                        description: "Položky FP",
                        width: 80,
                    })
                        .addNumberColumn({
                        name: "c_dod" /* Interface.GDokladyDtoNames.c_dod */,
                        caption: "Dodatky",
                        description: "Dodatky",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_esu_txt" /* Interface.GDokladyDtoNames.ixs_esu_txt */,
                        caption: "Protistrana",
                        description: "Protistrana",
                        width: 80,
                    })
                        //.addTextColumn({
                        //    name: Interface.GDokladyDtoNames.esu_ir,
                        //    caption: "Insolvence",
                        //    description: "Insolvence",
                        //    width: 80,
                        //})
                        .addTextColumn({
                        name: "bu_protiucet" /* Interface.GDokladyDtoNames.bu_protiucet */ /*_txt*/,
                        caption: "BÚ protistrany",
                        description: "BÚ protistrany",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_sgn_ext" /* Interface.GDokladyDtoNames.dat_sgn_ext */,
                        caption: "Datum podpisu protistrany",
                        description: "Datum podpisu protistrany",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_fun_ref_txt" /* Interface.GDokladyDtoNames.ixs_fun_ref_txt */,
                        caption: "Referent",
                        description: "Referent",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "nazev" /* Interface.GDokladyDtoNames.nazev */ /*_sml*/,
                        caption: "Úplný název",
                        description: "Úplný název",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "soutez" /* Interface.GDokladyDtoNames.soutez */,
                        caption: "Soutež",
                        description: "Soutež",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ac_ver_zak" /* Interface.GDokladyDtoNames.ac_ver_zak */,
                        caption: "Číslo VZ, DT, PO",
                        description: "Číslo VZ, DT, PO",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ucinnost" /* Interface.GDokladyDtoNames.ucinnost */,
                        caption: "Účinnost - komentář",
                        description: "Účinnost - komentář",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ac_dok_1" /* Interface.GDokladyDtoNames.ac_dok_1 */,
                        caption: "Související dokument 1",
                        description: "Související dokument 1",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_orj_txt" /* Interface.GDokladyDtoNames.ixs_orj_txt */,
                        caption: "Organizační jednotka",
                        description: "Organizační jednotka",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ac_dok_2" /* Interface.GDokladyDtoNames.ac_dok_2 */,
                        caption: "Související dokument 2",
                        description: "Související dokument 2",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_dok_1" /* Interface.GDokladyDtoNames.dat_dok_1 */,
                        caption: "Datum SD1",
                        description: "Datum SD1",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "nks" /* Interface.GDokladyDtoNames.nks */,
                        caption: "NKS",
                        description: "NKS",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_dok_2" /* Interface.GDokladyDtoNames.dat_dok_2 */,
                        caption: "Datum SD2",
                        description: "Datum SD2",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "c_fak" /* Interface.GDokladyDtoNames.c_fak */,
                        caption: "Očekávané čerpání kreditu",
                        description: "Očekávané čerpání kreditu",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "c_fak_rok" /* Interface.GDokladyDtoNames.c_fak_rok */,
                        caption: "Očekávané čerpání případem v akt. obd. CZK",
                        description: "Očekávané čerpání případem v akt. obd. CZK",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "c_obj_sml" /* Interface.GDokladyDtoNames.c_obj_sml */,
                        caption: "Objednáno SML případu",
                        description: "Objednáno SML případu",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "c_rok_rok" /* Interface.GDokladyDtoNames.c_rok_rok */,
                        caption: "Rozpis případu v akt. obd. CZK",
                        description: "Rozpis případu v akt. obd. CZK",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "c_pol_rok" /* Interface.GDokladyDtoNames.c_pol_rok */,
                        caption: "Položky FP případu v akt. obd. CZK",
                        description: "Položky FP případu v akt. obd. CZK",
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
                        caption: "Datum zveřejnění",
                        description: "Datum zveřejnění",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_pri" /* Interface.GDokladyDtoNames.ixs_pri */,
                        caption: "Veřejná zakázka",
                        description: "Veřejná zakázka",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "typ_phl" /* Interface.GDokladyDtoNames.typ_phl */,
                        caption: "Typ pohledávky",
                        description: "Typ pohledávky",
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
                        caption: "Zástupce vlastní strany",
                        description: "Zástupce vlastní strany",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_esu_zast_txt" /* Interface.GDokladyDtoNames.ixs_esu_zast_txt */,
                        caption: "Zástupce Protistrany",
                        description: "Zástupce Protistrany",
                        width: 80,
                    })
                        .addTextColumn({
                        name: "ixs_zuk_txt" /* Interface.GDokladyDtoNames.ixs_zuk_txt */,
                        caption: "Způsob ukončení",
                        description: "Způsob ukončení",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_uko" /* Interface.GDokladyDtoNames.dat_uko */,
                        caption: "Datum ukončení",
                        description: "Datum ukončení",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "priz_opce" /* Interface.GDokladyDtoNames.priz_opce */,
                        cellTemplate: (value) => {
                            switch (value.priz_opce) {
                                case 0:
                                    return "Ne";
                                    break;
                                case 1:
                                    return "Ano";
                                    break;
                                default:
                                    return "";
                            }
                        },
                        caption: "Možnost opce",
                        description: "Možnost opce",
                        width: 80,
                    })
                        .addDateColumn({
                        name: "dat_sgn" /* Interface.GDokladyDtoNames.dat_sgn */,
                        caption: "Datum podpisu",
                        description: "Datum podpisu",
                        width: 80,
                    });
                    return gf;
                    [];
                }
                //Definuje pořadí dokladů a přidá pořadí do dto
                //Definuje stav preevidence
                ZpracujSmlouvyDto(data) {
                    debugger;
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
            GSMLSeznamPripad = __decorate([
                Decorators.gcontent
            ], GSMLSeznamPripad);
            WebClient.GSMLSeznamPripad = GSMLSeznamPripad;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NNTFNlem5hbVByaXBhZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdTTUxTZXpuYW1QcmlwYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQVUsTUFBTSxDQTRxQmY7QUE1cUJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQTRxQm5CO0lBNXFCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBNHFCN0I7UUE1cUJvQixXQUFBLFNBQVM7WUFlMUIsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBaUIsU0FBUSxPQUFBLFlBQWlEO2dCQVVuRixjQUFjO29CQUNWLE1BQU0sSUFBSSxHQUFxQixJQUFJLENBQUM7b0JBQ3BDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDbkIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN0QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3ZCLENBQUM7Z0JBRU8sV0FBVztvQkFDZixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7Z0JBQzFDLENBQUM7Z0JBRU8sb0JBQW9CO29CQUN4QixNQUFNLElBQUksR0FBcUIsSUFBSSxDQUFDO29CQUdwQyxNQUFNLFdBQVcsR0FBaUIsRUFBRSxDQUFDO29CQUVyQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO29CQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQy9DLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDN0MsQ0FBQztvQkFFRCxPQUFPLFdBQVcsQ0FBQztnQkFFdkIsQ0FBQztnQkFFTyxn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QU0sR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO3dCQUM1QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxPQUFPOzRCQUN4QyxRQUFRLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQzs2QkFDMUIsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsT0FBTzs0QkFDN0UsUUFBUSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7b0JBQ25DLENBQUMsQ0FBQyxDQUFBO29CQUVGLE9BQU8sSUFBSSxDQUFDO2dCQUVoQixDQUFDO2FBRUosQ0FBQTtZQTNwQlksZ0JBQWdCO2dCQUQ1QixVQUFVLENBQUMsUUFBUTtlQUNQLGdCQUFnQixDQTJwQjVCO1lBM3BCWSwwQkFBZ0IsbUJBMnBCNUIsQ0FBQTtRQUVMLENBQUMsRUE1cUJvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUE0cUI3QjtJQUFELENBQUMsRUE1cUJnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUE0cUJuQjtBQUFELENBQUMsRUE1cUJTLE1BQU0sS0FBTixNQUFNLFFBNHFCZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuU21sLldlYkNsaWVudCB7XHJcblxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1NNTFNlem5hbVByaXBhZElucHV0UGFyYW1zIHtcclxuXHJcbiAgICAgICAgaXhwS25paGE6IHN0cmluZyxcclxuICAgICAgICBrYXRLbmloYTogbnVtYmVyLFxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgR1NNTFNlem5hbVByaXBhZFJldHVyblZhbHVlIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1NNTFNlem5hbVByaXBhZCBleHRlbmRzIEdDb250ZW50QmFzZTxHb3JkaWMuRWtvLlV0aWxzLklHRWtvQm9va0V4dGVuc2lvbj4gaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuICAgICAgICAvL0hsYXZuw60gZ3JpZCBwcm8gdsO9cGlzIGRva2xhZMWvXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZDogSlF1ZXJ5O1xyXG4gICAgICAgIHB1YmxpYyBpeHBLbmloYTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBpeHNGdW46IHN0cmluZztcclxuICAgICAgICBwdWJsaWMga3RnX2RlbjogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgcHJldmlld0NvbnRyb2xsZXI6IEdvcmRpYy5QcmV2aWV3cy5HUHJldmlld0NvbnRyb2xsZXI7XHJcblxyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgY29uc3QgdGhhdDogR1NNTFNlem5hbVByaXBhZCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuX2NyZWF0ZU1lbnUoKTtcclxuICAgICAgICAgICAgdGhpcy5fY3JlYXRlU2lkZUJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9jcmVhdGVHcmlkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9jcmVhdGVNZW51KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy52eXR2b3JNZW51UGFyYW1zKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2eXR2b3JDb250ZXh0b3ZlTWVudSgpOiBNZW51UGFyYW1zW10ge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0OiBHU01MU2V6bmFtUHJpcGFkID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgICAgICBjb25zdCBtZW51QmFyUG9sZTogTWVudVBhcmFtc1tdID0gW107XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhY3Rpb25zID0gdGhpcy5hY3Rpb25zLmdldEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGlpID0gYWN0aW9ucy5sZW5ndGg7IGkgPCBpaTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBtZW51QmFyUG9sZS5wdXNoKHsgYWN0aW9uOiBhY3Rpb25zW2ldIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWVudUJhclBvbGU7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2eXR2b3JNZW51UGFyYW1zKCk6IE1lbnVQYXJhbXNbXSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQ6IEdTTUxTZXpuYW1QcmlwYWQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy9sZXQgYWtjZTogT2JqZWN0TGl0ZXJhbDxHQWN0aW9uUGFyYW1zRGVmT2JqIHwgR0FjdGlvbj4gPSB7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgICAgICAgIC8vICAgIC8vICBUIEwgQSDEjCDDjSBUIEsgTyAgIC0gICBQIG8gZCDDoSBuIMOtXHJcbiAgICAgICAgICAgIC8vICAgIC8vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICAgICAgICAgLy8gICAgYWN0UG9kYW5pOlxyXG4gICAgICAgICAgICAvLyAgICAgICAgR29yZGljLkVrby5BY3Rpb24uYWN0aW9uUG9kYXQoeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzcG9sZcSNbsOhIGFrY2UgUG9kw6Fuw61cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkUm93ID0gdGhpcy4kZ3JpZC5nZ3JpZDxJbnRlcmZhY2UuR1NtbG91dnlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBEaWFsb2dzLkdTbWxEZXRhaWxPcGVuRGxnKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIHBhcmVudENvbnRlbnQ6IHRoaXMsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBvcHQ6IHsgaXhwOiBzZWxlY3RlZFJvd1swXS5peHAgfVxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KS5kb25lKChvKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAvL1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIEhvcm7DrSBtZW51LlxyXG4gICAgICAgICAgICBjb25zdCBtZW51QmFyUG9sZTogTWVudVBhcmFtc1tdID0gW107XHJcblxyXG5cclxuICAgICAgICAgICAgbWVudUJhclBvbGUucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb246IHRoYXQuYWN0aW9ucy5hZGQobmV3IEdBY3Rpb24oJC5leHRlbmQoXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLlByZWZhYnMuSWNvbnMuSWNvblRvQWN0aW9uUGFyYW1zKEdpbi5HbG9iYWxzLkljb25zLlpvYnJheml0RGV0YWlsKCkpLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEZXRhaWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJEZXRhaWwgZG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkRldGFpbCBkb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkUm93ID0gdGhpcy4kZ3JpZC5nZ3JpZDxJbnRlcmZhY2UuR0Rva2xhZHlEdG8+KFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkUm93WzBdLml4cCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIERpYWxvZ3MuR1NtbERldGFpbE9wZW5EbGcoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kZW46IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kb2tsYWR1OiBzZWxlY3RlZFJvd1swXS5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5kb25lKChvKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmF2b3JpdGU6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KSkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbWVudUJhclBvbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9jcmVhdGVTaWRlQmFyKCkge1xyXG5cclxuICAgICAgICAgICAgLy9aYcSNw6F0ZWsgaW5pY2lhbGl6YWNlIHNpZGViYXJ1XHJcbiAgICAgICAgICAgIHZhciBwcmV2aWV3UGFuZWxzRGVmaW5pdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIHRhYnM6IFtcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJldmlld3MuZ2V0RGVmYXVsdFByZXZpZXdUYWIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3SWQ6IFwic21sOkRva2xhZHlQcmV2aWV3XCJcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wcmV2aWV3Q29udHJvbGxlciA9IG5ldyBHb3JkaWMuUHJldmlld3MuR1ByZXZpZXdDb250cm9sbGVyKHRoaXMuZWxlbWVudCwgcHJldmlld1BhbmVsc0RlZmluaXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyLnJlZ2lzdGVyUGFuZWwoKTtcclxuICAgICAgICAgICAgLy9Lb25lYyBpbmljaWFsaXphY2Ugc2lkZWJhcnVcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9jcmVhdGVHcmlkKCkge1xyXG4gICAgICAgICAgICAvL1Z5dHZvxZllbsOtIGdyaWR1XHJcbiAgICAgICAgICAgIC8vRGF0YSB6w61za8OhbmEgeiBJU0wgbGlzdHUgU21sb3V2eVxyXG4gICAgICAgICAgICBHb3JkaWMuSXNsLkRva2xhZHkubGlzdE5ldyh7XHJcbiAgICAgICAgICAgICAgICBmcmFnbWVudHM6IFtcInNtbHNwYWMuKlwiLCBcIndmbHNwaWQuKlwiLCBcIipcIl0sXHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7IHNtbHNwYWNfaXhwX2RlbjogdGhpcy5peHBLbmloYSwgc21sc3BpZF9rdGdfZGVuOiB0aGlzLmt0Z19kZW4gfVxyXG4gICAgICAgICAgICB9KS5nZXREYXRhKCkuZG9uZSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZ3JpZCA9ICQoXCI8ZGl2PlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgLmdncmlkPEludGVyZmFjZS5HRG9rbGFkeUR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5acHJhY3VqU21sb3V2eUR0byhkYXRhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiB0aGlzLmRlZmluaWNlU2xvdXBjdUdyaWQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwaW5nOiBbSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhwX3NtbF9wcmldLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbEhlbHBlclRlbXBsYXRlOiBcIjxoMT57YWNfc21sOmxldHRlcn08L2gxPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0TWVudTogdGhpcy52eXR2b3JDb250ZXh0b3ZlTWVudSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogbmV3IEdBY3Rpb24oeyAgICAgLy9vYnNsdXpuYSBha2NlLCBrdGVyYSBzZSBzcG91c3RpIGRibCBjbGlja2VtIG5hZCByYWRrZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJvd1NlbGVjdGVkQWN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRSb3cgPSB0aGlzLiRncmlkLmdncmlkPEludGVyZmFjZS5HRG9rbGFkeUR0bz4oXCJnZXRTZWxlY3Rpb25cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZFJvd1swXS5peHAgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRGlhbG9ncy5HU21sRGV0YWlsT3BlbkRsZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRDb250ZW50OiB0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9kb2tsYWR1OiBzZWxlY3RlZFJvd1swXS5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmRvbmUoKG8pID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZTogKGV2LCBjdHgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4ICE9IG51bGwgJiYgY3R4LmNlbGxJbmZvICE9IG51bGwgJiYgY3R4LmNlbGxJbmZvLmRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXIuZW5hYmxlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlld0NvbnRyb2xsZXIuc2hvdyhjdHguY2VsbEluZm8uZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpZXdDb250cm9sbGVyLmVuYWJsZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEZWZpbm92w6Fuw60gbsOhenbFryBzbG91cGPFryB1csSNZW7DqSBkbyBncmlkdSBwcm8gdmxhc3Rub3N0IGNvbHVtbkxpc3RcclxuICAgICAgICBwcml2YXRlIGRlZmluaWNlU2xvdXBjdUdyaWQoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c19mdW5fYWt0X3R4dCxcclxuICAgICAgICAgICAgICAgIFwiVGVjaG5pY2tlVmxhc3Rub3N0aVwiLFxyXG4gICAgICAgICAgICAgICAgXCJQb3ppY2VTcGlzXCIsXHJcbiAgICAgICAgICAgICAgICBcIlN0YXZacHJhY292YW5pXCIsXHJcbiAgICAgICAgICAgICAgICBcIlRlcm1pbkljb0NvbHVtblwiLFxyXG4gICAgICAgICAgICAgICAgXCJUZXJtaW5EaWxjaUljb0NvbHVtblwiLFxyXG4gICAgICAgICAgICAgICAgXCJEb3BsbnVqaWNpSW5mb3JtYWNlXCIsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5wb2NfZXByaSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnBvcmFkaSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnNtbF9zdGF2X3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnByZWV2aWRlbmNlLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhwLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYWNfc21sLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYWMsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5wb3BpcyxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLm1lbmFfdHh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19tZW5hX2RvYyxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfbWVuYSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmMsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHBfc21sX3ByaSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfbWVuYV9kb2NfYmV6X2RwaCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfbWVuYV9kb2NfZHBoLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19tZW5hX2RvY19zX2RwaCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnR5cF9jZW55LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3ByaWpfcG9kLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMudHlwX3BsYXRub3N0X3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF91emF2cmVuaSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF9wbGF0bm9zdCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF91Y2lubm9zdCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF9zZ24sXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5maW5fb2QsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5maW5fZG8sXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5wb3puYW1rYSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c190eXBfdHh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX2VzdV90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX3BvbCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfZG9kLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaWNvX2VzdSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnJjX2VzdSxcclxuICAgICAgICAgICAgICAgIC8vSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZXN1X2lyLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYnVfcHJvdGl1Y2V0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX2Z1bl92eXJpel90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfc2duX2V4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c19mdW5fcmVmX3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLm5hemV2LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX2Z1bl9ha3RfdHh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY2lzX3JlYWxfdHh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuc291dGV6LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYWNfdmVyX3phayxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnVjaW5ub3N0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYWNfZG9rXzEsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfb3JqX3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmFjX2Rva18yLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X2Rva18xLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMubmtzLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X2Rva18yLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19mYWssXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX29ial9zbWwsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX3Jva19yb2ssXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX3BvbF9yb2ssXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX2Zha19yb2ssXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfenZlLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX3ByaSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c19yZWZfemFzdF90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZXN1X3phc3RfdHh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX3p1a190eHQsXHJcbiAgICAgICAgICAgICAgICAvL0ludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnR5cF9waGwsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy52cyxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF91a28sXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfc2duLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMucHJpel9vcGNlXHJcblxyXG4gICAgICAgICAgICBdLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0RlZmlub3bDoW7DrSBwcm9wZXJ0eSBzbG91cGPFr1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZEZvcm1hdCgpOiBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEludGVyZmFjZS5HRG9rbGFkeUR0bz4ge1xyXG5cclxuICAgICAgICAgICAgdmFyIGdmID0gbmV3IEdvcmRpYy5EYXRhLkdyaWRGb3JtYXQ8SW50ZXJmYWNlLkdEb2tsYWR5RHRvPigpO1xyXG4gICAgICAgICAgICAoR29yZGljIGFzIGFueSkuV2ZsLkdXZmxDb21tb25EbGcuQWRkRG9rdW1lbnR5Q29sdW1uc0RsZyhnZik7XHJcblxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c19mdW5fYWt0X3R4dCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVmxhc3Ruw61rXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWbGFzdG7DrWsgZG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDcwLFxyXG4gICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLndmbHNwaWQ/Lml4c19mdW5fYWt0ID09IHRoaXMuaXhzRnVuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJBbm9cIjtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIk5lXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5zbWxfc3Rhdl90eHQsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlN0YXYgZG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3RhdiBkb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnByZWV2aWRlbmNlLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJTdGF2IHDFmWVldmlkZW5jZVwiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU3RhdiBwxZllZXZpZGVuY2VcIixcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA3MCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRQaWQoZ2YsIHsgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhwIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEFnZW5kb3ZlQ2lzbG8oZ2YsIHsgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYWNfc21sIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEV2aWRlbmNuaUNpc2xvKGdmLCB7IG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmFjIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZFZzKGdmLCB7IG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnZzIH0pO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZENhc3RrYShnZik7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkVHlwRG9rbGFkdShnZik7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkWnByYWNvdmF0ZWwoZ2YpO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEtvbXBldGVudChnZik7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkUmVhbGl6YXRvcihnZik7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkTWVuYShnZiwgeyBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5tZW5hX3R4dCB9KTtcclxuICAgICAgICAgICAgLy9Hb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZENhc3RrYUNaSyAoZ2YpO1xyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkdyaWQuQ29sdW1uLmFkZEljb1N1Ympla3R1KGdmKTtcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRSY1N1Ympla3R1KGdmKTtcclxuXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuYyxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUm96cGlzIENaS1wiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUm96cGlzIENaS1wiLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDUwLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4cF9zbWxfcHJpLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJJZGVudGlmaWvDoXRvciBwxZnDrXBhZHVcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIklkZW50aWZpa8OhdG9yIHDFmcOtcGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDUwLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnBvY19lcHJpLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCIjIGVQcmlcIixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBvxI1ldCBlbGVrdHJvbmlja8O9Y2ggcMWZw61sb2hcIixcclxuICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgZ2YuYWRkTnVtYmVyQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnBvcmFkaSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwiI1wiLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUG/FmWFkw60gZG9rdW1lbnR1XCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGdmLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMucG9waXMsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlBvcGlzXCIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJQb3BpcyBkb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMubWVuYV90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJNxJtuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk3Em25hIGRva2xhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNzAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfbWVuYV9kb2MsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJDZW5hIHNtbG91dnlcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDZW5hIHNtbG91dnkgZG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMTAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX21lbmFfZG9jX2Jlel9kcGgsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJDZW5hIGJleiBEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDZW5hIGJleiBEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTIwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX21lbmFfZG9jX2RwaCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRQSFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRQSFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19tZW5hX2RvY19zX2RwaCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkNlbmEgcyBEUEhcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDZW5hIHMgRFBIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDUwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy50eXBfY2VueSxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlR5cCBjZW55XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVHlwIGNlbnkgZG9rbGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsVGVtcGxhdGU6ICh2YWx1ZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLnR5cF9jZW55ID09IDEwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiUGV2bsOhXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlLnR5cF9jZW55ID09IDIwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiVm9sbsOhXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3ByaWpfcG9kLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRXZpZG92w6Fub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkV2aWRvdsOhbm9cIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnR5cF9wbGF0bm9zdF90eHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUeXAgcGxhdG5vc3RpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVHlwIHBsYXRub3N0aVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3V6YXZyZW5pLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVXphdsWZZW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlV6YXbFmWVuw61cIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF9wbGF0bm9zdCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVrb27EjWVuw60gcGxhdG5vc3RpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVWtvbsSNZW7DrSBwbGF0bm9zdGlcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF91Y2lubm9zdCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIsOaxI1pbm5vc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCLDmsSNaW5ub3N0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfc2duLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGF0dW0gcG9kcGlzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRhdHVtIHBvZHBpc3VcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZmluX29kLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRmluYW5jb3bDoW7DrSBvZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkZpbmFuY292w6Fuw60gb2RcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZmluX2RvLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRmluYW5jb3bDoW7DrSBkb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkZpbmFuY292w6Fuw60gZG9cIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnBvem5hbWthLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUG96bsOhbWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUG96bsOhbWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZXN1X3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlByb3Rpc3RyYW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUHJvdGlzdHJhbmFcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19wb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb2xvxb5reSBGUFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlBvbG/Fvmt5IEZQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmNfZG9kLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRG9kYXRreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRvZGF0a3lcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZXN1X3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlByb3Rpc3RyYW5hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUHJvdGlzdHJhbmFcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5lc3VfaXIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIkluc29sdmVuY2VcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGRlc2NyaXB0aW9uOiBcIkluc29sdmVuY2VcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5idV9wcm90aXVjZXQvKl90eHQqLyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkLDmiBwcm90aXN0cmFueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkLDmiBwcm90aXN0cmFueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3Nnbl9leHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEYXR1bSBwb2RwaXN1IHByb3Rpc3RyYW55XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRGF0dW0gcG9kcGlzdSBwcm90aXN0cmFueVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX2Z1bl9yZWZfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUmVmZXJlbnRcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJSZWZlcmVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMubmF6ZXYvKl9zbWwqLyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIsOacGxuw70gbsOhemV2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiw5pwbG7DvSBuw6F6ZXZcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnNvdXRleixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNvdXRlxb5cIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJTb3V0ZcW+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5hY192ZXJfemFrLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwixIzDrXNsbyBWWiwgRFQsIFBPXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwixIzDrXNsbyBWWiwgRFQsIFBPXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy51Y2lubm9zdCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIsOaxI1pbm5vc3QgLSBrb21lbnTDocWZXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiw5rEjWlubm9zdCAtIGtvbWVudMOhxZlcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmFjX2Rva18xLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU291dmlzZWrDrWPDrSBkb2t1bWVudCAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiU291dmlzZWrDrWPDrSBkb2t1bWVudCAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfb3JqX3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9yZ2FuaXphxI1uw60gamVkbm90a2FcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJPcmdhbml6YcSNbsOtIGplZG5vdGthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5hY19kb2tfMixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlNvdXZpc2Vqw61jw60gZG9rdW1lbnQgMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlNvdXZpc2Vqw61jw60gZG9rdW1lbnQgMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X2Rva18xLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGF0dW0gU0QxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiRGF0dW0gU0QxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5ua3MsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOS1NcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOS1NcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLmRhdF9kb2tfMixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhdHVtIFNEMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRhdHVtIFNEMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19mYWssXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPxI1la8OhdmFuw6kgxI1lcnDDoW7DrSBrcmVkaXR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiT8SNZWvDoXZhbsOpIMSNZXJww6Fuw60ga3JlZGl0dVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19mYWtfcm9rLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT8SNZWvDoXZhbsOpIMSNZXJww6Fuw60gcMWZw61wYWRlbSB2IGFrdC4gb2JkLiBDWktcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJPxI1la8OhdmFuw6kgxI1lcnDDoW7DrSBwxZnDrXBhZGVtIHYgYWt0LiBvYmQuIENaS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuY19vYmpfc21sLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2JqZWRuw6FubyBTTUwgcMWZw61wYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiT2JqZWRuw6FubyBTTUwgcMWZw61wYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX3Jva19yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJSb3pwaXMgcMWZw61wYWR1IHYgYWt0LiBvYmQuIENaS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlJvenBpcyBwxZnDrXBhZHUgdiBha3QuIG9iZC4gQ1pLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5jX3BvbF9yb2ssXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb2xvxb5reSBGUCBwxZnDrXBhZHUgdiBha3QuIG9iZC4gQ1pLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUG9sb8W+a3kgRlAgcMWZw61wYWR1IHYgYWt0LiBvYmQuIENaS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvLy5hZGROdW1iZXJDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJPxI1la8OhdmFuw6kgxI1lcnDDoW7DrSBwxZnDrXBhZGVtIHYgYWt0LiBvYmQuIENaS1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgZGVzY3JpcHRpb246IFwiT8SNZWvDoXZhbsOpIMSNZXJww6Fuw60gcMWZw61wYWRlbSB2IGFrdC4gb2JkLiBDWktcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIC8vfSkgICBcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5kYXRfenZlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGF0dW0genZlxZllam7Em27DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkRhdHVtIHp2ZcWZZWpuxJtuw61cIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLml4c19wcmksXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWZcWZZWpuw6EgemFrw6F6a2FcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJWZcWZZWpuw6EgemFrw6F6a2FcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HRG9rbGFkeUR0b05hbWVzLnR5cF9waGwsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJUeXAgcG9obGVkw6F2a3lcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJUeXAgcG9obGVkw6F2a3lcIixcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy4sXHJcbiAgICAgICAgICAgICAgICAvLyAgICBjYXB0aW9uOiBcIlrDoXN0dXBjZSB2bGFzdG7DrSBzdHJhbnlcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGRlc2NyaXB0aW9uOiBcIlrDoXN0dXBjZSB2bGFzdG7DrSBzdHJhbnlcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC8vLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgLy8gICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgY2FwdGlvbjogXCJaw6FzdHVwY2UgUHJvdGlzdHJhbnlcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGRlc2NyaXB0aW9uOiBcIlrDoXN0dXBjZSBQcm90aXN0cmFueVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgLy99KVxyXG4gICAgICAgICAgICAgICAgLy8uYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy52cyxcclxuICAgICAgICAgICAgICAgIC8vICAgIGNhcHRpb246IFwiVlNcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIGRlc2NyaXB0aW9uOiBcIlZTXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB3aWR0aDogODAsXHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuaXhzX3JlZl96YXN0X3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlrDoXN0dXBjZSB2bGFzdG7DrSBzdHJhbnlcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJaw6FzdHVwY2Ugdmxhc3Ruw60gc3RyYW55XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfZXN1X3phc3RfdHh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWsOhc3R1cGNlIFByb3Rpc3RyYW55XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiWsOhc3R1cGNlIFByb3Rpc3RyYW55XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5peHNfenVrX3R4dCxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpwxa9zb2IgdWtvbsSNZW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlpwxa9zb2IgdWtvbsSNZW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3VrbyxcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhdHVtIHVrb27EjWVuw61cIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEYXR1bSB1a29uxI1lbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR0Rva2xhZHlEdG9OYW1lcy5wcml6X29wY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbFRlbXBsYXRlOiAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZS5wcml6X29wY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJOZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIkFub1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJNb8W+bm9zdCBvcGNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTW/Fvm5vc3Qgb3BjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA4MCxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRGF0ZUNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvTmFtZXMuZGF0X3NnbixcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRhdHVtIHBvZHBpc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJEYXR1bSBwb2RwaXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDgwLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIGdmO1xyXG4gICAgICAgICAgICBbXVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vRGVmaW51amUgcG/FmWFkw60gZG9rbGFkxa8gYSBwxZlpZMOhIHBvxZlhZMOtIGRvIGR0b1xyXG4gICAgICAgIC8vRGVmaW51amUgc3RhdiBwcmVldmlkZW5jZVxyXG4gICAgICAgIFpwcmFjdWpTbWxvdXZ5RHRvKGRhdGE6IEludGVyZmFjZS5HRG9rbGFkeUR0b1tdKTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvW10ge1xyXG5cclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGRhdGEubWFwKChkYXRhSXRlbTogSW50ZXJmYWNlLkdEb2tsYWR5RHRvLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhSXRlbS5wb3JhZGkgPSBpbmRleCArIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5la29Cb29rLml4cF9kZW4gIT0gZGF0YUl0ZW0uaXhwX2RlbilcclxuICAgICAgICAgICAgICAgICAgICBkYXRhSXRlbS5wcmVldmlkZW5jZSA9IFwiLVwiO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoTnVtYmVyKGRhdGFJdGVtLnByZWV2aWQpID4gMCAmJiB0aGlzLmVrb0Jvb2suaXhwX2RlbiA9PSBkYXRhSXRlbS5peHBfZGVuKVxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFJdGVtLnByZWV2aWRlbmNlID0gXCIrXCI7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiJdfQ==