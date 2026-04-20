"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Sml.WebClient.GSMLZadostiOZalozeni.ts                </Name>
//    <Description> Žádosti o založení dokladu do agendy z jiných agend         </Description>
//    <Author>      psmejkal                                                    </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2023                            </Copyright>
//    <Created>     2023-02-02                                                  </Created>
//  </FileHeader>
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
            /** Žádosti o založení dokladu do agendy z jiných agend */
            let GSMLZadostiOZalozeni = class GSMLZadostiOZalozeni extends Gordic.GContentBase {
                onContentReady() {
                    this.createActions();
                    this.createMenuBar();
                    this.createFilterPanel();
                    this.createGrid();
                }
                /** Vytvoření akcí pro tlačítka */
                createActions() {
                    const that = this;
                    that.actions.addRange({
                        //actDetail: Gordic.Eko.Action.actionDetail({
                        //    //enabled: true,
                        //    run: (ev, ctx) => {
                        //        //TODO: needitovatelný Detail --- zapojit až bude připraven od M.Bočka
                        //    }
                        //}),
                        actUpravit: Gordic.Eko.Action.actionUpravit({
                            enabled: true,
                            run: function (ev, ctx) {
                                that.modify();
                            }
                        }),
                        actOdstranit: Gordic.Eko.Action.actionOdstranit({
                            enabled: true,
                            run: (ev, ctx) => {
                                that.delete();
                            }
                        }),
                        actPrevzit: Gordic.Eko.Action.actionPrevzit({
                            enabled: true,
                            run: (ev, ctx) => {
                                that.getRequest();
                            }
                        })
                    });
                }
                /** Vytvoření menubaru */
                createMenuBar() {
                    this.menuBar(this.actions.createBar([/*"actDetail*",*/ "actUpravit*", "actOdstranit*", "actPrevzit*"]));
                }
                //#region FiltrPanel + Grid
                /** Vytvoření filter panelu */
                createFilterPanel() {
                    this.$filterPanel = $.newDiv().appendTo(this.element).gfilterpanel({
                        forms: [this.createFilterPanelForm()],
                        filterViewMode: FilterViewMode.Simple,
                        hardFilter: { ixs_fun_akt: "1" },
                    });
                }
                /** Vytvoření filterpanel formuláře */
                createFilterPanelForm() {
                    return new Gordic.Forms.Form({ name: "filterZadosti" })
                        .addRow()
                        .addField("gradio", {
                        name: "ixs_fun_akt",
                        initialValue: "1",
                        radios: [
                            { value: "1", label: "jres:33600098" }, //RC 33600098 : Vlastní
                            { value: "0", label: "jres:33600099" }, //RC 33600099 : Bez vlastníka
                            { value: "2", label: "jres:33600100" }, //RC 33600100 : Cizí
                        ],
                    });
                }
                /** Vytvoření seznamu s žádostmi */
                //private createGrid() {
                //    //Přidání různých rozšíření z WFL do gridu na seznamu dokladů
                //    Gordic.Ssl.WebClient.GDokumentIsl.AddGridColumns(
                //        // Vytvoření gridFormatu. Nemusím jej ukládat do proměnné, ale stačí poslat přímo do metody, protože bude v návratové hodnotě.
                //        this.createGridFormat(),
                //        // Názvy sloupců dokumentu, který chci použít na svém seznamu.
                //        [
                //            "typ_entity_ico"
                //        ],
                //        // Nastavení zanoření dokumentu.
                //        {
                //            scopeLevels: [{
                //                scope: "dokument",
                //                //scopeTitle: "jres:33500643" //RC 33500643 : Dokument label
                //            }]
                //        }
                //    )
                //        .done((gridFormat) => {
                //            this.$grid = $.newDiv()
                //                .appendTo(this.element)
                //                .ggrid<Interface.GSmlsiabDto>({
                //                    columnMode: "full",
                //                    data: new Gordic.Isl.View<Gordic.Sml.Interface.GSmlsiabDto>(this.isl.Smlsiab.list({ filters: {} }),
                //                        {
                //                            onResponse: (data) => {
                //                                //nastavení permissions
                //                                //this.servicePermissions = data.servicePermissions as Interface.GSmlspzpPermissions;
                //                                //this.actions.actNew?.updatePermission(this.servicePermissions, "LzeNovy");
                //                                return data;
                //                            },
                //                            filterPanel: this.$filterPanel,
                //                        }),
                //                    multi: true,
                //                    defaultProfile: {
                //                        columnList: this.getGridColumns(),
                //                    },
                //                    columns: gridFormat,
                //                });
                //        });
                //}
                /** Vytvoření seznamu s žádostmi */
                createGrid() {
                    this.$grid = $.newDiv()
                        .appendTo(this.element)
                        .ggrid({
                        columnMode: "full",
                        data: new Gordic.Isl.View(this.isl.Smlsiab.list({ filters: {} }), {
                            //onResponse: (data) => {
                            //    //TODO: možná nějaký servicePermissions?
                            //    return data;
                            //},
                            filterPanel: this.$filterPanel,
                            key: ["ixp_ext"],
                            startEmpty: true
                        }),
                        multi: true,
                        defaultProfile: {
                            columnList: this.getGridColumns(),
                        },
                        columns: this.createGridFormat(),
                    }).gautofit();
                }
                /** Získání výčtu sloupců pro základní grid */
                getGridColumns() {
                    return [
                        "typ_entity_ico",
                        "stav_dok_txt" /* Interface.GSmlsiabDtoNames.stav_dok_txt */,
                        "ixp_ext" /* Interface.GSmlsiabDtoNames.ixp_ext */,
                        "typ_ag_ext_txt" /* Interface.GSmlsiabDtoNames.typ_ag_ext_txt */,
                        "ixp" /* Interface.GSmlsiabDtoNames.ixp */,
                        "ac_ver_zak" /* Interface.GSmlsiabDtoNames.ac_ver_zak */,
                        "ixp_den_txt" /* Interface.GSmlsiabDtoNames.ixp_den_txt */,
                        "ixs_typ_txt" /* Interface.GSmlsiabDtoNames.ixs_typ_txt */,
                        "popis" /* Interface.GSmlsiabDtoNames.popis */,
                        "ico_esu" /* Interface.GSmlsiabDtoNames.ico_esu */,
                        "ixs_esu_txt" /* Interface.GSmlsiabDtoNames.ixs_esu_txt */,
                        "bu_ci_txt" /* Interface.GSmlsiabDtoNames.bu_ci_txt */,
                        "cis_real" /* Interface.GSmlsiabDtoNames.cis_real */,
                        "ixs_fun_vyriz_txt" /* Interface.GSmlsiabDtoNames.ixs_fun_vyriz_txt */,
                        "ixs_fun_ref_txt" /* Interface.GSmlsiabDtoNames.ixs_fun_ref_txt */,
                        "ixs_fun_akt_txt" /* Interface.GSmlsiabDtoNames.ixs_fun_akt_txt */,
                        "mena_txt" /* Interface.GSmlsiabDtoNames.mena_txt */,
                        "kurz" /* Interface.GSmlsiabDtoNames.kurz */,
                        "typ_ceny_txt" /* Interface.GSmlsiabDtoNames.typ_ceny_txt */,
                        "c_mena" /* Interface.GSmlsiabDtoNames.c_mena */,
                        "c_rok" /* Interface.GSmlsiabDtoNames.c_rok */,
                        "typ_platnost_txt" /* Interface.GSmlsiabDtoNames.typ_platnost_txt */,
                        "dat_uzavreni" /* Interface.GSmlsiabDtoNames.dat_uzavreni */,
                        "dat_platnost" /* Interface.GSmlsiabDtoNames.dat_platnost */,
                        "dat_ucinnost" /* Interface.GSmlsiabDtoNames.dat_ucinnost */,
                        "fin_od" /* Interface.GSmlsiabDtoNames.fin_od */,
                        "fin_do" /* Interface.GSmlsiabDtoNames.fin_do */,
                        "poznamka" /* Interface.GSmlsiabDtoNames.poznamka */,
                        "nazev" /* Interface.GSmlsiabDtoNames.nazev */,
                        "soutez" /* Interface.GSmlsiabDtoNames.soutez */,
                        "ucinnost" /* Interface.GSmlsiabDtoNames.ucinnost */,
                        "ixs_orj_txt" /* Interface.GSmlsiabDtoNames.ixs_orj_txt */,
                        "ac_dok_1" /* Interface.GSmlsiabDtoNames.ac_dok_1 */,
                        "ac_dok_2" /* Interface.GSmlsiabDtoNames.ac_dok_2 */,
                        "ac_sml" /* Interface.GSmlsiabDtoNames.ac_sml */,
                        "ac" /* Interface.GSmlsiabDtoNames.ac */,
                    ].toString();
                }
                /** Vytvoření gridformátu pro seznam žádostí */
                createGridFormat() {
                    var gf = new Gordic.Data.GridFormat();
                    //značka el.doc
                    //! 366.3 27.10.10 - prezentace přítomnosti el. doc.
                    gf.addIconColumn(Gordic.Wfl.Globals.ListSupport.TypEntityColumnDlg());
                    gf.addTextColumn({
                        name: "stav_dok_txt" /* Interface.GSmlsiabDtoNames.stav_dok_txt */,
                        caption: "jres:33600101", //RC 33600101 : S
                        description: "jres:33600102", //RC 33600102 : Typ
                        width: 60,
                    }).addTextColumn({
                        name: "ixp_ext" /* Interface.GSmlsiabDtoNames.ixp_ext */,
                        caption: "jres:33600103", //RC 33600103 : Identifikátor žádosti
                        width: 100,
                    }).addTextColumn({
                        name: "typ_ag_ext_txt" /* Interface.GSmlsiabDtoNames.typ_ag_ext_txt */,
                        caption: "jres:33600104", //RC 33600104 : Agenda
                        width: 50,
                    }).addTextColumn({
                        name: "ixp" /* Interface.GSmlsiabDtoNames.ixp */,
                        caption: "jres:33600105", //RC 33600105 : Identifikátor dokladu SML
                        width: 110,
                    }).addTextColumn({
                        name: "ac_ver_zak" /* Interface.GSmlsiabDtoNames.ac_ver_zak */,
                        caption: "jres:33600106", //RC 33600106 : Číslo VZ, DT, PO
                        width: 100,
                    });
                    Gordic.Eko.Grid.Column.addKniha(gf);
                    gf.addTextColumn({
                        name: "ixs_typ_txt" /* Interface.GSmlsiabDtoNames.ixs_typ_txt */,
                        caption: "jres:33600107", //RC 33600107 : Typ dokladu
                        width: 100,
                    });
                    Gordic.Eko.Grid.Column.addPopis(gf);
                    Gordic.Eko.Grid.Column.addIcoSubjektu(gf, { caption: "jres:33600582" }); //RC 33600582 : IČO D/O
                    gf.addTextColumn({
                        name: "ixs_esu_txt" /* Interface.GSmlsiabDtoNames.ixs_esu_txt */,
                        caption: "jres:33600108", //RC 33600108 : Dodavatel/Odběratel
                        width: 100,
                    }).addTextColumn({
                        name: "bu_ci_txt" /* Interface.GSmlsiabDtoNames.bu_ci_txt */,
                        caption: "jres:33600109", //RC 33600109 : BÚ dodavatel/odběratel
                        width: 100,
                    }).addTextColumn({
                        name: "cis_real" /* Interface.GSmlsiabDtoNames.cis_real */,
                        caption: "jres:33600110", //RC 33600110 : Realizátor
                        width: 100,
                    }).addTextColumn({
                        name: "ixs_fun_vyriz_txt" /* Interface.GSmlsiabDtoNames.ixs_fun_vyriz_txt */,
                        caption: "jres:33600111", //RC 33600111 : Kompetent
                        width: 100,
                    }).addTextColumn({
                        name: "ixs_fun_ref_txt" /* Interface.GSmlsiabDtoNames.ixs_fun_ref_txt */,
                        caption: "jres:33600112", //RC 33600112 : Referent
                        width: 100,
                    }).addTextColumn({
                        name: "ixs_fun_akt_txt" /* Interface.GSmlsiabDtoNames.ixs_fun_akt_txt */,
                        caption: "jres:33600113", //RC 33600113 : Vlastník
                        width: 100,
                    });
                    Gordic.Eko.Grid.Column.addMena(gf, { name: "mena_txt" /* Interface.GSmlsiabDtoNames.mena_txt */, field: "mena_txt" /* Interface.GSmlsiabDtoNames.mena_txt */ });
                    gf.addDecimalColumn({
                        name: "kurz" /* Interface.GSmlsiabDtoNames.kurz */,
                        caption: "jres:33600114", //RC 33600114 : Kurz
                        width: 60,
                        formatPreset: "C3",
                        formats: {
                            "C3": {
                                _presetCaption: Gordic.Templates.Formatters.number(1234, "C3"),
                                format: "number(C3)"
                            }
                        },
                    }).addTextColumn({
                        name: "typ_ceny_txt" /* Interface.GSmlsiabDtoNames.typ_ceny_txt */,
                        caption: "jres:33600115", //RC 33600115 : Typ ceny
                        width: 100,
                    }).addCurrencyColumn({
                        name: "c_mena" /* Interface.GSmlsiabDtoNames.c_mena */,
                        caption: "jres:33600116", //RC 33600116 : Celková částka
                        width: 100,
                    }).addCurrencyColumn({
                        name: "c_rok" /* Interface.GSmlsiabDtoNames.c_rok */, //v TK c
                        caption: "jres:33600117", //RC 33600117 : Rozpis částky v aktuálním období
                        width: 100,
                    }).addTextColumn({
                        name: "typ_platnost_txt" /* Interface.GSmlsiabDtoNames.typ_platnost_txt */,
                        caption: "jres:33600118", //RC 33600118 : Typ platnosti
                        width: 100,
                    }).addDateColumn({
                        name: "dat_uzavreni" /* Interface.GSmlsiabDtoNames.dat_uzavreni */,
                        caption: "jres:33600119", //RC 33600119 : Datum uzavření
                        width: 100,
                    }).addDateColumn({
                        name: "dat_platnost" /* Interface.GSmlsiabDtoNames.dat_platnost */,
                        caption: "jres:33600120", //RC 33600120 : Datum platnosti
                        width: 100,
                    }).addDateColumn({
                        name: "dat_ucinnost" /* Interface.GSmlsiabDtoNames.dat_ucinnost */,
                        caption: "jres:33600121", //RC 33600121 : Datum účinnosti
                        width: 100,
                    }).addNumberColumn({
                        name: "fin_od" /* Interface.GSmlsiabDtoNames.fin_od */,
                        caption: "jres:33600122", //RC 33600122 : Financování od
                        width: 100,
                    }).addNumberColumn({
                        name: "fin_do" /* Interface.GSmlsiabDtoNames.fin_do */,
                        caption: "jres:33600123", //RC 33600123 : Financování do
                        width: 100,
                    }).addTextColumn({
                        name: "poznamka" /* Interface.GSmlsiabDtoNames.poznamka */,
                        caption: "jres:33600124", //RC 33600124 : Poznámka
                        width: 100,
                    }).addTextColumn({
                        name: "nazev" /* Interface.GSmlsiabDtoNames.nazev */, //v TK nazev_sml
                        caption: "jres:33600125", //RC 33600125 : Úplný název
                        width: 100,
                    }).addTextColumn({
                        name: "soutez" /* Interface.GSmlsiabDtoNames.soutez */,
                        caption: "jres:33600126", //RC 33600126 : Soutěž
                        width: 100,
                    }).addTextColumn({
                        name: "ucinnost" /* Interface.GSmlsiabDtoNames.ucinnost */,
                        caption: "jres:33600127", //RC 33600127 : Účinnost - komentář
                        width: 100,
                    }).addTextColumn({
                        name: "ixs_orj_txt" /* Interface.GSmlsiabDtoNames.ixs_orj_txt */,
                        caption: "jres:33600128", //RC 33600128 : Organizační jednotka
                        width: 100,
                    }).addTextColumn({
                        name: "ac_dok_1" /* Interface.GSmlsiabDtoNames.ac_dok_1 */,
                        caption: "jres:33600129", //RC 33600129 : Související dokument 1
                        width: 100,
                    }).addTextColumn({
                        name: "ac_dok_2" /* Interface.GSmlsiabDtoNames.ac_dok_2 */,
                        caption: "jres:33600130", //RC 33600130 : Související dokument 2
                        width: 100,
                    }).addTextColumn({
                        name: "ac_sml" /* Interface.GSmlsiabDtoNames.ac_sml */,
                        caption: "jres:33600131", //RC 33600131 : Agendové číslo
                        width: 100,
                    }).addTextColumn({
                        name: "ac" /* Interface.GSmlsiabDtoNames.ac */,
                        caption: "jres:33600132", //RC 33600132 : Evidenční číslo
                        width: 100,
                    });
                    return gf;
                }
                //#endregion
                //#region Akce Upravit
                /** Hromadná akce Upravit nad vybranými žádostmi */
                modify() {
                    var selection = this.$grid.ggrid("getSelection");
                    if (selection.length < 1) {
                        return;
                    }
                    var wizardChanged = false;
                    // předávání parametrů mezi kroky
                    let modelData;
                    // dto s daty z formuláře upravené pro uložení
                    let saveDto;
                    var wizardForm = this.createWizardModifyForm();
                    this.beginOperation();
                    return this.isl.DokladSml.init().get().done((smlrec) => {
                        this.smlrec = smlrec;
                        this.$wizardCnt = this.navigate(Gordic.Eko.Components.ThreeStepsContent, {
                            ID: "ZadostiOZalozeniWizardModify#",
                            title: "jres:33600133", //RC 33600133 : Hromadná změna údajů žádostí
                            gridFormat: this.createGridFormat(),
                            keys: this.$grid.ggrid("getView").keys,
                            data: selection,
                            indicatorType: "KPI",
                            firstStep: {
                                gridTabTitle: "jres:33600134", //RC 33600134 : Výběr žádostí
                                title: "jres:33600135", //RC 33600135 : Zadání
                                description: "jres:33600136", //RC 33600136 : Akce upraví vybrané (zaškrtnuté) žádosti podle vyplněného formuláře
                                showIndicator: false,
                                form: wizardForm,
                                formTabTitle: "jres:33600137", //RC 33600137 : Parametry změny
                                enableFormFields: true,
                                nextAction: (model, data) => {
                                    // TODO: dočasná oprava posílání prázdného model pokud je kontrola vyvolána z druhého kroku -- z FUC kopie
                                    if (Object.keys(model).length == 0)
                                        model = modelData;
                                    if ( /*model === {} || */model == null)
                                        model = modelData;
                                    saveDto = this.modifyDataForSave(model);
                                    modelData = model;
                                    return this.isl.Smlsiab.checkMassPermissionsBeforeModify({ ixp_exts: data.map(x => x.ixp_ext), saveDto: /*this.smlrec*/ saveDto, zpusobGenerovani: parseInt(Gordic.Eko.Utils.GetEkoUserSettingsPidSejmuti(this, this.gin_gen_ixp)) }).get().then((result) => {
                                        return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                    });
                                },
                            },
                            secondStep: {
                                gridTabTitle: "jres:33600134", //RC 33600134 : Výběr žádostí
                                title: "jres:33600138", //RC 33600138 : Potvrzení
                                description: "jres:33600139", //RC 33600139 : U vybraných žádostí budou změněny hodnoty podle vyplněného formuláře
                                showIndicator: true,
                                form: wizardForm,
                                formTabTitle: "jres:33600137", //RC 33600137 : Parametry změny
                                modelData: (ev, ctx) => { return modelData; },
                                enableFormFields: false,
                                nextAction: (model, data) => {
                                    return this.isl.Smlsiab.massModify({ ixp_exts: data.map(x => x.ixp_ext), saveDto: /*this.smlrec*/ saveDto, zpusobGenerovani: parseInt(Gordic.Eko.Utils.GetEkoUserSettingsPidSejmuti(this, this.gin_gen_ixp)) }).get().then((result) => {
                                        wizardChanged = true;
                                        return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                    });
                                },
                                checkAction: (model, data) => {
                                    // TODO: dočasná oprava posílání prázdného model pokud je kontrola vyvolána z druhého kroku -- z FUC kopie
                                    if (Object.keys(model).length == 0)
                                        model = modelData;
                                    if ( /*model === {} || */model == null)
                                        model = modelData;
                                    return this.isl.Smlsiab.checkMassPermissionsBeforeModify({ ixp_exts: data.map(x => x.ixp_ext), saveDto: saveDto /*this.smlrec*/, zpusobGenerovani: parseInt(Gordic.Eko.Utils.GetEkoUserSettingsPidSejmuti(this, this.gin_gen_ixp)) }).get().then((result) => {
                                        return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                    });
                                }
                            },
                            lastStep: {
                                gridTabTitle: "jres:33600087", //RC 33600087 : Výsledek
                                title: "jres:33600088", //RC 33600088 : Výsledek hromadné operace
                                form: wizardForm,
                                formTabTitle: "jres:33600137", //RC 33600137 : Parametry změny
                                modelData: (ev, ctx) => { return modelData; },
                                enableFormFields: false,
                                showIndicator: true,
                            },
                            completeDelegate: () => {
                                wizardChanged = true;
                                this.$grid.ggrid("getView").requestData();
                            },
                            cancelDelegate: () => {
                                if (wizardChanged) {
                                    this.$grid.ggrid("getView").requestData();
                                }
                            }
                        });
                    }).always(() => { this.endOperation(); });
                }
                /** Úprava dat z formuláře před kontrolou/uložením */
                modifyDataForSave(model) {
                    const saveDto = {
                        typ_platnost: model.typ_platnost,
                        dat_uzavreni: model.dat_uzavreni,
                        dat_platnost: model.dat_platnost,
                        dat_ucinnost: model.dat_ucinnost,
                        popis: model.popis?.trim(),
                        poznamka: model.poznamka?.trim(),
                        nazev: model.nazev?.trim(),
                        ucinnost: model.ucinnost?.trim(),
                        ixs_orj: model.ixs_orj,
                        ac_dok_1: model.ac_dok_1?.trim(),
                        ac_dok_2: model.ac_dok_2?.trim()
                    };
                    if (model.ixs_fun_vyriz?.trim()?.length > 0) {
                        saveDto.ixs_fun_vyriz = model.ixs_fun_vyriz?.trim();
                        //saveDto.cis_real = model.cis_real; --- zjistím si na serveru
                    }
                    if (model.ixs_fun_ref?.trim()?.length > 0) {
                        saveDto.ixs_fun_ref = model.ixs_fun_ref?.trim();
                    }
                    if (model.ixs_fun_akt?.trim()?.length > 0) {
                        saveDto.ixs_fun_akt = model.ixs_fun_akt?.trim();
                    }
                    if (model.ixp_den?.length > 0) {
                        saveDto.ixp_den = model.ixp_den;
                        //saveDto.subrada = model.subrada; --- zjistím si na serveru
                    }
                    if (model.ixs_typ?.trim()?.length > 0) {
                        saveDto.ixs_typ = model.ixs_typ;
                        saveDto.ktg_typ = model.ktg_typ;
                    }
                    return saveDto;
                }
                /** Vytvoření formuláře pro úpravu dat žádostí */
                createWizardModifyForm() {
                    let ixpDenFilterPanelOpts = {
                        forms: [new Gordic.Forms.Form().addRow("jres:33600600").addField("gnumberbox", Gordic.Prefabs.Number.withOperators({ defaultOperator: ">=", operators: ["=", "!=", ">", ">=", "<", "<="] }), { name: "rok", initialValue: this.rok, defaultValue: null })], //RC 33600600 : Rok
                        filterViewMode: FilterViewMode.Simple,
                        hardDefaultFilter: {
                            rok: this.rok
                        }
                    };
                    var form = new Gordic.Forms.Form({
                        name: "formModifyRequests",
                        layoutDescriptor: "L2M2S1"
                    })
                        .addSection()
                        .addRow("jres:33600111") //RC 33600111 : Kompetent
                        .addField("gselectbox", Gordic.Prefabs.Select.smlKomp(), {
                        name: "ixs_fun_vyriz",
                        model: "model.ixs_fun_vyriz=value.ixs_fun",
                        serverFilters: {
                            cis_real: this.globals.cis_real,
                            ixs_fun_komp: this.globals.ixs_fun_komp ?? ""
                        },
                        change: (ev, ctx) => {
                            if (ctx?.flags?.valid) {
                                this.$wizardCnt.findFields("ixs_fun_ref").gfield("option", "serverFilters", { ixs_orj: ctx.value?.ixs_orj });
                                this.$wizardCnt.findFields("cis_real").gfield("model", "apply", { cis_real: ctx.value?.cis_real?.trim(), ico: ctx.value?.ico });
                            }
                        }
                    })
                        .addRow("jres:33600140") //RC 33600140 : Vyřizující referent
                        .addField("gselectbox", Gordic.Prefabs.Select.smlFunVyriz(), {
                        name: "ixs_fun_ref",
                        model: "model.ixs_fun_ref=value.ixs_fun",
                        serverFilters: {
                        //ixs_orj: new Gordic.Forms.Dependency("ixs_fun_vyriz", "ixs_orj", false, false)
                        }
                    })
                        .addRow("jres:33600141") //RC 33600141 : Kniha
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosden(void 0, { filterPanelOpts: ixpDenFilterPanelOpts }), {
                        name: "ixp_den",
                        model: 'model.ixp_den=value.ixp_den;model.subrada<=value.subrada',
                        serverFilters: {
                            //ico: this.ico,
                            //ucs: this.ucs,
                            aktivita: 100
                        },
                        change: (ev, ctx) => {
                            if (ctx?.flags?.valid) {
                                var ixs_typ = this.$wizardCnt.findFields("ixs_typ");
                                ixs_typ.gfield("enable");
                                var vlastnik = this.$wizardCnt.findFields("ixs_fun_akt");
                                var vlastnik_value = vlastnik.gfield("getValue");
                                if (vlastnik_value && ctx.value?.ixp_den != vlastnik_value.ixp_den) {
                                    vlastnik.gfield("reset");
                                }
                                if (ctx.value?.ixp_den) {
                                    this.beginOperation();
                                    this.isl.Smlsiab.getKtgDen({ ixp_den: ctx.value.ixp_den }).get().done((ktg_den) => {
                                        if (typeof ktg_den == "number") {
                                            ixs_typ.gfield("option", "serverFilters", { ktg_den: ktg_den, ixp_den: ctx.value?.ixp_den });
                                            vlastnik.gfield("option", "serverFilters", { ...vlastnik.gfield("option", "serverFilters"), ...{ ixp_den: ctx.value?.ixp_den } });
                                        }
                                    }).always(() => { this.endOperation(); });
                                }
                                else {
                                    vlastnik.gfield("option", "serverFilters", { ...vlastnik.gfield("option", "serverFilters"), ...{ ixp_den: this.smlrec.ixp_den } });
                                    ixs_typ.gfield("reset");
                                    $(ev.target).gfield("reset");
                                }
                            }
                        }
                    })
                        .addRow("jres:33600118") //RC 33600118 : Typ platnosti
                        .addField("gselectbox", Gordic.Prefabs.Select.smlctpl(), {
                        name: "typ_platnost",
                        model: 'model.typ_platnost=value.typ_platnost',
                        dropdown: true,
                        initialValue: { typ_platnost: 0 /* Interface.TypPlatnostSmlouvy.ng_typplatnostNone */ },
                        change: (ev, ctx) => {
                            if (ctx?.flags?.valid) {
                                //řízení na základě typ platnosti
                                if (ctx.value?.typ_platnost == 10 /* Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita */) {
                                    this.$wizardCnt.findFields("dat_platnost").gfield("enable");
                                }
                                else {
                                    this.$wizardCnt.findFields("dat_platnost").gfield("reset");
                                    this.$wizardCnt.findFields("dat_platnost").gfield("disable");
                                }
                                //this.$wizardCnt.findFields("dat_platnost").gfield((ctx.value?.typ_platnost == Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita) ? "enable" : "disable");
                            }
                        }
                    })
                        .addRow("jres:33600119") //RC 33600119 : Datum uzavření
                        .addField("gdatebox", {
                        name: "dat_uzavreni",
                        change: (ev, ctx) => {
                            //343.1 02.05.02 - přednastavím datum účinnosti
                            this.$wizardCnt.findFields("dat_ucinnost").gfield("setValue", ctx.value);
                        }
                    })
                        .addRow("jres:33600142") //RC 33600142 : Datum ukončení platnosti
                        .addField("gdatebox", {
                        name: "dat_platnost",
                        disabled: true,
                        validators: [new Gordic.Validators.Base({
                                errorType: "error",
                                message: "jres:33600143", //RC 33600143 : Datum platnosti smlouvy je menší než datum uzavření
                                validate: (value, src) => {
                                    if (this.$wizardCnt.findFields("typ_platnost").gfield("getValue").typ_platnost == 10 /* Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita */) {
                                        var dat_uzavreni = Gordic.Utils.DateTime.parse(this.$wizardCnt.findFields("dat_uzavreni").gfield("getValue")).getFullYear();
                                        var dat_platnost = Gordic.Utils.DateTime.parse(this.$wizardCnt.findFields("dat_platnost").gfield("getValue")).getFullYear();
                                        if (dat_uzavreni && dat_platnost && dat_uzavreni > dat_platnost) {
                                            this.$wizardCnt.findFields("dat_uzavreni").gfield("reset");
                                            return false;
                                        }
                                    }
                                    return true;
                                }
                            }),
                            new Gordic.Validators.Base({
                                errorType: "warning",
                                stopping: false,
                                message: "jres:33600144", //RC 33600144 : Rok platnosti smlouvy nesouhlasí s rokem uzavření
                                validate: (value, src) => {
                                    if (this.$wizardCnt.findFields("typ_platnost").gfield("getValue").typ_platnost == 10 /* Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita */) {
                                        var dat_uzavreni = Gordic.Utils.DateTime.parse(this.$wizardCnt.findFields("dat_uzavreni").gfield("getValue")).getFullYear();
                                        var dat_platnost = Gordic.Utils.DateTime.parse(this.$wizardCnt.findFields("dat_platnost").gfield("getValue")).getFullYear();
                                        if (dat_uzavreni && dat_platnost && dat_platnost != dat_uzavreni) {
                                            return false;
                                        }
                                    }
                                    return true;
                                }
                            })
                        ],
                        change: (ev, ctx) => {
                            //$(ev.target).gfield("validate", true);
                            //this.$wizardCnt.findFields("dat_ucinnost").gfield("validate");
                        }
                    })
                        .addRow("jres:33600121") //RC 33600121 : Datum účinnosti
                        .addField("gdatebox", {
                        name: "dat_ucinnost",
                        validators: [new Gordic.Validators.Base({
                                errorType: "error",
                                message: "jres:33600145", //RC 33600145 : Nepřípustná hodnota. Datum účinnosti nesmí být nižší než datum uzavření smlouvy
                                validate: (value, src) => {
                                    var dat_uzavreni = this.$wizardCnt.findFields("dat_uzavreni").gfield("getValue");
                                    //nikdy nesmí být nižší než datum uzavření
                                    if (value < dat_uzavreni) {
                                        //this.$wizardCnt.findFields("dat_ucinnost").gfield("setValue", dat_uzavreni, {triggerChange: false});
                                        return false;
                                    }
                                    return true;
                                }
                            }),
                            new Gordic.Validators.Base({
                                errorType: "error",
                                message: "jres:33600146", //RC 33600146 : Nepřípustná hodnota. Datum účinnosti nesmí být vyšší než datum platnosti smlouvy
                                validate: (value, src) => {
                                    var dat_platnost = value;
                                    if (this.$wizardCnt.findFields("typ_platnost").gfield("getValue").typ_platnost == 10 /* Interface.TypPlatnostSmlouvy.ng_typplatnostUrcita */) {
                                        dat_platnost = this.$wizardCnt.findFields("dat_platnost").gfield("getValue");
                                    }
                                    if (value > dat_platnost) {
                                        //this.$wizardCnt.findFields("dat_ucinnost").gfield("setValue", dat_platnost, { triggerChange: false });
                                        return false;
                                    }
                                    return true;
                                }
                            })
                        ],
                        change: (ev, ctx) => {
                            //$(ev.target).gfield("validate", true);
                            //this.$wizardCnt.findFields("dat_platnost").gfield("validate");
                        }
                    })
                        .addSection()
                        .addRow("jres:33600110") //RC 33600110 : Realizátor
                        .addField("gselectbox", Gordic.Prefabs.Select.ekosrea(), {
                        name: "cis_real",
                        model: 'model.ico=value.ico;model.cis_real=value.cis_real',
                        disabled: true
                    })
                        .addRow("jres:33600113") //RC 33600113 : Vlastník
                        .addField("gselectbox", Gordic.Prefabs.Select.smlVlastnik(), {
                        name: "ixs_fun_akt",
                        model: 'model.ixs_fun_akt=value.ixs_fun',
                        serverFilters: {
                            rezimKniha: 0 /* Interface.RezimKnihy.ng_vdrezimknihaOne */,
                            rezimHist: 1 /* Interface.RezimHist.ng_vdrezimhistNo */
                        }
                    })
                        .addRow("jres:33600107") //RC 33600107 : Typ dokladu
                        .addField("gselectbox", Gordic.Prefabs.Select.smlTypDokladu(), {
                        name: "ixs_typ",
                        model: 'model.ixs_typ=value.ixs_typ;model.ktg_typ<=value.ktg_typ',
                        disabled: true,
                        validators: [
                            //390.1 29.09.22 vyhozen text dodatek smlouvy
                            new Gordic.Validators.Base({
                                errorType: "error",
                                message: "jres:33600147", //RC 33600147 : Nepřípustný typ dokladu - nelze volit dodatek
                                validate: (value, src) => {
                                    return value?.ktg_typ != 1692 /* Interface.KategorieTypuSmluv.ng_ktgtypSmlAcc */;
                                }
                            })
                        ]
                    })
                        .addRow("jres:33600128") //RC 33600128 : Organizační jednotka
                        .addField("gselectbox", Gordic.Prefabs.Select.smlOrj(), {
                        name: "ixs_orj",
                        model: 'model.ixs_orj=value.ixs_orj',
                        change: (ev, ctx) => {
                            if (this.sml_zav_nreforj == 3) {
                                this.$wizardCnt.findFields("ixs_fun_ref").gfield("option", "serverFilters", { ixs_orj: ctx.value?.ixs_orj });
                            }
                        }
                    })
                        .addRow("jres:33600148") //RC 33600148 : Účinnost
                        .addField("gstringbox", {
                        name: "ucinnost"
                    })
                        .addRow("jres:33600129") //RC 33600129 : Související dokument 1
                        .addField("gstringbox", {
                        name: "ac_dok_1"
                    })
                        .addRow("jres:33600130") //RC 33600130 : Související dokument 2
                        .addField("gstringbox", {
                        name: "ac_dok_2"
                    })
                        .addSection()
                        .addRow({ label: "jres:33600149", layoutDescriptor: "L-2-10-0" }) //RC 33600149 : Popis
                        .addField("gstringbox", {
                        name: "popis"
                    })
                        .addRow({ label: "jres:33600125", layoutDescriptor: "L-2-10-0" }) //RC 33600125 : Úplný název
                        .addField("gstringbox", {
                        name: "nazev",
                        rows: 2,
                        validators: [
                            new Gordic.Validators.Length({ max: 500 }) //352.4 23.09.04 - nastavení délky řetězce
                        ]
                    })
                        .addRow({ label: "jres:33600124", layoutDescriptor: "L-2-10-0" }) //RC 33600124 : Poznámka
                        .addField("gstringbox", {
                        name: "poznamka",
                        rows: 2,
                        validators: [
                            new Gordic.Validators.Length({ max: 500 }) //352.4 23.09.04 - nastavení délky řetězce
                        ]
                    });
                    return form;
                }
                //#endregion
                //#region Akce Odstranit
                /** Hromadná akce odstranit žádosti */
                delete() {
                    var selection = this.$grid.ggrid("getSelection");
                    if (selection.length < 1) {
                        return;
                    }
                    var wizardChanged = false;
                    this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        ID: "ZadostiOZalozeniWizardModify#",
                        title: "jres:33600150", //RC 33600150 : Hromadná odstranění žádostí
                        gridFormat: this.createGridFormat(),
                        keys: this.$grid.ggrid("getView").keys,
                        data: selection,
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            return this.isl.Smlsiab.checkMassPermissionsBeforeDelete({ ixp_exts: data.map(x => x.ixp_ext) }).get().then((result) => {
                                return Gordic.Eko.Components.Wizard.Utils.getData(result);
                            });
                        },
                        firstStep: {
                            gridTabTitle: "jres:33600134", //RC 33600134 : Výběr žádostí
                            title: "jres:33600134", //RC 33600134 : Výběr žádostí
                            description: "jres:33600151", //RC 33600151 : Akce odstraní vybrané (zaškrtnuté) žádosti o založení z jiných agend. Po jejím provedení budou tyto žádosti odstraněny
                            showIndicator: true,
                            nextAction: (model, data) => {
                                return this.isl.Smlsiab.massDelete({ ixp_exts: data.map(x => x.ixp_ext) }).get().then((result) => {
                                    wizardChanged = true;
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            checkAction: (model, data) => {
                                return this.isl.Smlsiab.checkMassPermissionsBeforeDelete({ ixp_exts: data.map(x => x.ixp_ext) }).get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            }
                        },
                        lastStep: {
                            gridTabTitle: "jres:33600087", //RC 33600087 : Výsledek
                            title: "jres:33600088" //RC 33600088 : Výsledek hromadné operace
                        },
                        completeDelegate: () => {
                            wizardChanged = true;
                            this.$grid.ggrid("getView").requestData();
                        },
                        cancelDelegate: () => {
                            if (wizardChanged) {
                                this.$grid.ggrid("getView").requestData();
                            }
                        }
                    });
                }
                //#endregion
                //#region Převzít
                /** Převzetí žádostí a založení dokladů*/
                getRequest() {
                    var selection = this.$grid.ggrid("getSelection");
                    if (selection.length < 1) {
                        return;
                    }
                    var wizardChanged = false;
                    var wiz = this.navigate(Gordic.Eko.Components.TwoStepsContent, {
                        ID: "ZadostiOZalozeniWizardGetRequests#",
                        title: "jres:33600152", //RC 33600152 : Hromadná převzetí žádostí
                        gridFormat: this.createGridFormat(),
                        keys: this.$grid.ggrid("getView").keys,
                        data: selection,
                        indicatorType: "KPI",
                        preCheckAction: (data) => {
                            return this.isl.Smlsiab.checkMassPermissionsBeforeGetRequests({ ixp_exts: data.map(x => x.ixp_ext), zpusobGenerovani: parseInt(Gordic.Eko.Utils.GetEkoUserSettingsPidSejmuti(this, this.gin_gen_ixp)) }).get().then((result) => {
                                return Gordic.Eko.Components.Wizard.Utils.getData(result);
                            });
                        },
                        firstStep: {
                            gridTabTitle: "jres:33600134", //RC 33600134 : Výběr žádostí
                            title: "jres:33600134", //RC 33600134 : Výběr žádostí
                            description: "jres:33600153", //RC 33600153 : Akce převezme vybrané (zaškrtnuté) žádosti o založení z jiných agend a založí doklady. Po jejím provedení budou tyto založeny příslušné doklady.
                            showIndicator: true,
                            menuGridBar: [{
                                    action: new GAction({
                                        name: "actManualAgIxp",
                                        caption: "jres:33600154", //RC 33600154 : Zadat Ag. číslo a Id
                                        tooltip: "jres:33600155", //RC 33600155 : Manuálně zadat Agendové číslo a Identifikátor dokladu
                                        enabled: true,
                                        run: (ev, ctx) => {
                                            var dto = ctx.grid.ggrid("activeRow");
                                            this.dialogs.showModalWindow("Gordic.Sml.WebClient.GSMLZadostiAgIxpDlg", { dto: dto }, { width: 500, height: 250 }).on("closed", (ev, retVal) => {
                                                if (retVal) {
                                                    var wizCnt = $.content(wiz);
                                                    wizCnt.beginOperation();
                                                    wizardChanged = true;
                                                    var grid = ctx.grid;
                                                    var view = grid.ggrid("getView");
                                                    view.updateData(retVal, "update");
                                                    this.isl.Smlsiab.checkMassPermissionsBeforeGetRequests({ ixp_exts: view.getDataRows().map(x => x.ixp_ext), zpusobGenerovani: parseInt(Gordic.Eko.Utils.GetEkoUserSettingsPidSejmuti(this, this.gin_gen_ixp)) }).get().then((res) => {
                                                        view.updateData(Gordic.Eko.Components.Wizard.Utils.getData(res), "update");
                                                        ctx.getWizContent().refreshIndicator(view);
                                                    }).always(() => { wizCnt.endOperation(); });
                                                }
                                            });
                                        }
                                    }),
                                    favorite: true
                                }],
                            nextAction: (model, data) => {
                                return this.isl.Smlsiab.massGetRequests({ ixp_exts: data.map(x => x.ixp_ext), zpusobGenerovani: parseInt(Gordic.Eko.Utils.GetEkoUserSettingsPidSejmuti(this, this.gin_gen_ixp)) }).get().then((result) => {
                                    wizardChanged = true;
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            },
                            checkAction: (model, data) => {
                                return this.isl.Smlsiab.checkMassPermissionsBeforeGetRequests({ ixp_exts: data.map(x => x.ixp_ext), zpusobGenerovani: parseInt(Gordic.Eko.Utils.GetEkoUserSettingsPidSejmuti(this, this.gin_gen_ixp)) }).get().then((result) => {
                                    return Gordic.Eko.Components.Wizard.Utils.getData(result);
                                });
                            }
                        },
                        lastStep: {
                            gridTabTitle: "jres:33600087", //RC 33600087 : Výsledek
                            title: "jres:33600088" //RC 33600088 : Výsledek hromadné operace
                        },
                        completeDelegate: () => {
                            wizardChanged = true;
                            this.$grid.ggrid("getView").requestData();
                        },
                        cancelDelegate: () => {
                            if (wizardChanged) {
                                this.$grid.ggrid("getView").requestData();
                            }
                        }
                    });
                }
            };
            GSMLZadostiOZalozeni = __decorate([
                Decorators.gcontent
            ], GSMLZadostiOZalozeni);
            WebClient.GSMLZadostiOZalozeni = GSMLZadostiOZalozeni;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR1NNTFphZG9zdGlPWmFsb3plbmkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHU01MWmFkb3N0aU9aYWxvemVuaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEVBQTBFO0FBQzFFLHVGQUF1RjtBQUN2Riw4RkFBOEY7QUFDOUYseUZBQXlGO0FBQ3pGLDRGQUE0RjtBQUM1RiwwRkFBMEY7QUFDMUYsaUJBQWlCOzs7Ozs7O0FBR2pCLElBQVUsTUFBTSxDQW8yQmY7QUFwMkJELFdBQVUsTUFBTTtJQUFDLElBQUEsR0FBRyxDQW8yQm5CO0lBcDJCZ0IsV0FBQSxHQUFHO1FBQUMsSUFBQSxTQUFTLENBbzJCN0I7UUFwMkJvQixXQUFBLFNBQVM7WUFDMUIsMERBQTBEO1lBRTFELElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEsT0FBQSxZQUFZO2dCQW9CbEQsY0FBYztvQkFDVixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQztnQkFFRCxrQ0FBa0M7Z0JBQzFCLGFBQWE7b0JBQ2pCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7d0JBQ2xCLDZDQUE2Qzt3QkFDN0Msc0JBQXNCO3dCQUN0Qix5QkFBeUI7d0JBQ3pCLGdGQUFnRjt3QkFDaEYsT0FBTzt3QkFDUCxLQUFLO3dCQUNMLFVBQVUsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7NEJBQ3hDLE9BQU8sRUFBRSxJQUFJOzRCQUNiLEdBQUcsRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHO2dDQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7NEJBQ2xCLENBQUM7eUJBQ0osQ0FB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RSxDQUFDOzRCQUM5QyxDQUFDO3dCQUNMLENBQUM7cUJBQ0osQ0FBQyxDQUFBO2dCQUNOLENBQUM7YUFHSixDQUFBO1lBaDJCWSxvQkFBb0I7Z0JBRGhDLFVBQVUsQ0FBQyxRQUFRO2VBQ1Asb0JBQW9CLENBZzJCaEM7WUFoMkJZLDhCQUFvQix1QkFnMkJoQyxDQUFBO1FBQ0wsQ0FBQyxFQXAyQm9CLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQW8yQjdCO0lBQUQsQ0FBQyxFQXAyQmdCLEdBQUcsR0FBSCxVQUFHLEtBQUgsVUFBRyxRQW8yQm5CO0FBQUQsQ0FBQyxFQXAyQlMsTUFBTSxLQUFOLE1BQU0sUUFvMkJmIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIDxGaWxlSGVhZGVyIHhtbG5zPVwiaHR0cDovL3d3dy5nb3JkaWMuY3ovc2hhcmVkL2ZpbGUtaGVhZGVyL3ZfMS4wLjAuMFwiPlxuLy8gICAgPE5hbWU+ICAgICAgICBHb3JkaWMuU21sLldlYkNsaWVudC5HU01MWmFkb3N0aU9aYWxvemVuaS50cyAgICAgICAgICAgICAgICA8L05hbWU+XG4vLyAgICA8RGVzY3JpcHRpb24+IMW9w6Fkb3N0aSBvIHphbG/FvmVuw60gZG9rbGFkdSBkbyBhZ2VuZHkgeiBqaW7DvWNoIGFnZW5kICAgICAgICAgPC9EZXNjcmlwdGlvbj5cbi8vICAgIDxBdXRob3I+ICAgICAgcHNtZWprYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XG4vLyAgICA8Q29weXJpZ2h0PiAgIMKpIEdPUkRJQyBzcG9sLiBzIHIuIG8uIDE5OTMtMjAyMyAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0NvcHlyaWdodD5cbi8vICAgIDxDcmVhdGVkPiAgICAgMjAyMy0wMi0wMiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9DcmVhdGVkPlxuLy8gIDwvRmlsZUhlYWRlcj5cblxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuU21sLldlYkNsaWVudCB7XHJcbiAgICAvKiogxb3DoWRvc3RpIG8gemFsb8W+ZW7DrSBkb2tsYWR1IGRvIGFnZW5keSB6IGppbsO9Y2ggYWdlbmQgKi9cclxuICAgIEBEZWNvcmF0b3JzLmdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR1NNTFphZG9zdGlPWmFsb3plbmkgZXh0ZW5kcyBHQ29udGVudEJhc2Uge1xyXG5cclxuICAgICAgICAvL0NvbnRlblZhbHVlc1xyXG4gICAgICAgIHByaXZhdGUgZ2xvYmFsczogR29yZGljLlNtbC5JbnRlcmZhY2UuR1NtbEdsb2JhbHNEdG87XHJcbiAgICAgICAgLyoqIERCIHBhcmFtZXRyIC0gbmV6w6F2aXNsc3QgcmVmIG5hIG9yaiBrb21wICovXHJcbiAgICAgICAgcHJpdmF0ZSBzbWxfemF2X25yZWZvcmo6IG51bWJlcjtcclxuICAgICAgICAvKiogQXV0b21hdGlja8OpIGdlbmVyb3bDoW7DrSBpZGVudGlmaWvDoXRvcsWvICovXHJcbiAgICAgICAgcHJpdmF0ZSBnaW5fZ2VuX2l4cDogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBBa3R1w6FsbsOtIHJvayovXHJcbiAgICAgICAgcHJpdmF0ZSByb2s6IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzbWxyZWM6IEludGVyZmFjZS5HRG9rbGFkU21sRHRvO1xyXG4gICAgICAgIC8qKiBrdGdfZGVuIG5hxI10ZW7DvSB6IGRiIHDFmWkgem3Em27EmyBrbmloeSovXHJcbiAgICAgICAgcHJpdmF0ZSBrdGdfZGVuX2ZybT86IG51bWJlcjtcclxuXHJcbiAgICAgICAgLy9IbGF2bsOtIGdyaWQgcHJvIHbDvXBpcyBkb2tsYWTFr1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSAkZmlsdGVyUGFuZWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgcHJpdmF0ZSAkd2l6YXJkQ250OiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xyXG5cclxuICAgICAgICBvbkNvbnRlbnRSZWFkeSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTWVudUJhcigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUZpbHRlclBhbmVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGFrY8OtIHBybyB0bGHEjcOtdGthICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hZGRSYW5nZSh7XHJcbiAgICAgICAgICAgICAgICAvL2FjdERldGFpbDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRGV0YWlsKHtcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIHJ1bjogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAvL1RPRE86IG5lZWRpdG92YXRlbG7DvSBEZXRhaWwgLS0tIHphcG9qaXQgYcW+IGJ1ZGUgcMWZaXByYXZlbiBvZCBNLkJvxI1rYVxyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99KSxcclxuICAgICAgICAgICAgICAgIGFjdFVwcmF2aXQ6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblVwcmF2aXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm1vZGlmeSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0T2RzdHJhbml0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25PZHN0cmFuaXQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRlbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgYWN0UHJldnppdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uUHJldnppdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ2V0UmVxdWVzdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIG1lbnViYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVNZW51QmFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lbnVCYXIodGhpcy5hY3Rpb25zLmNyZWF0ZUJhcihbLypcImFjdERldGFpbCpcIiwqLyBcImFjdFVwcmF2aXQqXCIsIFwiYWN0T2RzdHJhbml0KlwiLCBcImFjdFByZXZ6aXQqXCJdKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNyZWdpb24gRmlsdHJQYW5lbCArIEdyaWRcclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGZpbHRlciBwYW5lbHUgKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUZpbHRlclBhbmVsKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRmaWx0ZXJQYW5lbCA9ICQubmV3RGl2KCkuYXBwZW5kVG8odGhpcy5lbGVtZW50KS5nZmlsdGVycGFuZWwoe1xyXG4gICAgICAgICAgICAgICAgZm9ybXM6IFt0aGlzLmNyZWF0ZUZpbHRlclBhbmVsRm9ybSgpXSxcclxuICAgICAgICAgICAgICAgIGZpbHRlclZpZXdNb2RlOiBGaWx0ZXJWaWV3TW9kZS5TaW1wbGUsXHJcbiAgICAgICAgICAgICAgICBoYXJkRmlsdGVyOiB7IGl4c19mdW5fYWt0OiBcIjFcIiB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGZpbHRlcnBhbmVsIGZvcm11bMOhxZllICovXHJcbiAgICAgICAgcHJpdmF0ZSBjcmVhdGVGaWx0ZXJQYW5lbEZvcm0oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZpbHRlclphZG9zdGlcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJncmFkaW9cIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1bl9ha3RcIixcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IFwiMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBcIjFcIiwgbGFiZWw6IFwianJlczozMzYwMDA5OFwiIH0sIC8vUkMgMzM2MDAwOTggOiBWbGFzdG7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBcIjBcIiwgbGFiZWw6IFwianJlczozMzYwMDA5OVwiIH0sIC8vUkMgMzM2MDAwOTkgOiBCZXogdmxhc3Ruw61rYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBcIjJcIiwgbGFiZWw6IFwianJlczozMzYwMDEwMFwiIH0sIC8vUkMgMzM2MDAxMDAgOiBDaXrDrVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBzZXpuYW11IHMgxb7DoWRvc3RtaSAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBjcmVhdGVHcmlkKCkge1xyXG4gICAgICAgIC8vICAgIC8vUMWZaWTDoW7DrSByxa96bsO9Y2ggcm96xaHDrcWZZW7DrSB6IFdGTCBkbyBncmlkdSBuYSBzZXpuYW11IGRva2xhZMWvXHJcbiAgICAgICAgLy8gICAgR29yZGljLlNzbC5XZWJDbGllbnQuR0Rva3VtZW50SXNsLkFkZEdyaWRDb2x1bW5zKFxyXG4gICAgICAgIC8vICAgICAgICAvLyBWeXR2b8WZZW7DrSBncmlkRm9ybWF0dS4gTmVtdXPDrW0gamVqIHVrbMOhZGF0IGRvIHByb23Em25uw6ksIGFsZSBzdGHEjcOtIHBvc2xhdCBwxZnDrW1vIGRvIG1ldG9keSwgcHJvdG/FvmUgYnVkZSB2IG7DoXZyYXRvdsOpIGhvZG5vdMSbLlxyXG4gICAgICAgIC8vICAgICAgICB0aGlzLmNyZWF0ZUdyaWRGb3JtYXQoKSxcclxuICAgICAgICAvLyAgICAgICAgLy8gTsOhenZ5IHNsb3VwY8WvIGRva3VtZW50dSwga3RlcsO9IGNoY2kgcG91xb7DrXQgbmEgc3bDqW0gc2V6bmFtdS5cclxuICAgICAgICAvLyAgICAgICAgW1xyXG4gICAgICAgIC8vICAgICAgICAgICAgXCJ0eXBfZW50aXR5X2ljb1wiXHJcbiAgICAgICAgLy8gICAgICAgIF0sXHJcbiAgICAgICAgLy8gICAgICAgIC8vIE5hc3RhdmVuw60gemFub8WZZW7DrSBkb2t1bWVudHUuXHJcbiAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIHNjb3BlTGV2ZWxzOiBbe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHNjb3BlOiBcImRva3VtZW50XCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLy9zY29wZVRpdGxlOiBcImpyZXM6MzM1MDA2NDNcIiAvL1JDIDMzNTAwNjQzIDogRG9rdW1lbnQgbGFiZWxcclxuICAgICAgICAvLyAgICAgICAgICAgIH1dXHJcbiAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAvLyAgICApXHJcbiAgICAgICAgLy8gICAgICAgIC5kb25lKChncmlkRm9ybWF0KSA9PiB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgdGhpcy4kZ3JpZCA9ICQubmV3RGl2KClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhpcy5lbGVtZW50KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC5nZ3JpZDxJbnRlcmZhY2UuR1NtbHNpYWJEdG8+KHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBHb3JkaWMuSXNsLlZpZXc8R29yZGljLlNtbC5JbnRlcmZhY2UuR1NtbHNpYWJEdG8+KHRoaXMuaXNsLlNtbHNpYWIubGlzdCh7IGZpbHRlcnM6IHt9IH0pLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uUmVzcG9uc2U6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbmFzdGF2ZW7DrSBwZXJtaXNzaW9uc1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuc2VydmljZVBlcm1pc3Npb25zID0gZGF0YS5zZXJ2aWNlUGVybWlzc2lvbnMgYXMgSW50ZXJmYWNlLkdTbWxzcHpwUGVybWlzc2lvbnM7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zLmFjdE5ldz8udXBkYXRlUGVybWlzc2lvbih0aGlzLnNlcnZpY2VQZXJtaXNzaW9ucywgXCJMemVOb3Z5XCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclBhbmVsOiB0aGlzLiRmaWx0ZXJQYW5lbCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBtdWx0aTogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IHRoaXMuZ2V0R3JpZENvbHVtbnMoKSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgY29sdW1uczogZ3JpZEZvcm1hdCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8qKiBWeXR2b8WZZW7DrSBzZXpuYW11IHMgxb7DoWRvc3RtaSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlR3JpZCgpIHtcclxuICAgICAgICAgICAgdGhpcy4kZ3JpZCA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQ8SW50ZXJmYWNlLkdTbWxzaWFiRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5Jc2wuVmlldzxHb3JkaWMuU21sLkludGVyZmFjZS5HU21sc2lhYkR0bz4odGhpcy5pc2wuU21sc2lhYi5saXN0KHsgZmlsdGVyczoge30gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vb25SZXNwb25zZTogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vVE9ETzogbW/Fvm7DoSBuxJtqYWvDvSBzZXJ2aWNlUGVybWlzc2lvbnM/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclBhbmVsOiB0aGlzLiRmaWx0ZXJQYW5lbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogW1wiaXhwX2V4dFwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RW1wdHk6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogdGhpcy5nZXRHcmlkQ29sdW1ucygpLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICB9KS5nYXV0b2ZpdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFrDrXNrw6Fuw60gdsO9xI10dSBzbG91cGPFryBwcm8gesOha2xhZG7DrSBncmlkICovXHJcbiAgICAgICAgcHJpdmF0ZSBnZXRHcmlkQ29sdW1ucygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgXCJ0eXBfZW50aXR5X2ljb1wiLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdTbWxzaWFiRHRvTmFtZXMuc3Rhdl9kb2tfdHh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdTbWxzaWFiRHRvTmFtZXMuaXhwX2V4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLnR5cF9hZ19leHRfdHh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdTbWxzaWFiRHRvTmFtZXMuaXhwLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdTbWxzaWFiRHRvTmFtZXMuYWNfdmVyX3phayxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLml4cF9kZW5fdHh0LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdTbWxzaWFiRHRvTmFtZXMuaXhzX3R5cF90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5wb3BpcyxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLmljb19lc3UsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5peHNfZXN1X3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLmJ1X2NpX3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLmNpc19yZWFsLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdTbWxzaWFiRHRvTmFtZXMuaXhzX2Z1bl92eXJpel90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5peHNfZnVuX3JlZl90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5peHNfZnVuX2FrdF90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5tZW5hX3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLmt1cnosXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy50eXBfY2VueV90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5jX21lbmEsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5jX3JvayxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLnR5cF9wbGF0bm9zdF90eHQsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5kYXRfdXphdnJlbmksXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5kYXRfcGxhdG5vc3QsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5kYXRfdWNpbm5vc3QsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5maW5fb2QsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5maW5fZG8sXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5wb3puYW1rYSxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLm5hemV2LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdTbWxzaWFiRHRvTmFtZXMuc291dGV6LFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdTbWxzaWFiRHRvTmFtZXMudWNpbm5vc3QsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5peHNfb3JqX3R4dCxcclxuICAgICAgICAgICAgICAgIEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLmFjX2Rva18xLFxyXG4gICAgICAgICAgICAgICAgSW50ZXJmYWNlLkdTbWxzaWFiRHRvTmFtZXMuYWNfZG9rXzIsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5hY19zbWwsXHJcbiAgICAgICAgICAgICAgICBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5hYyxcclxuICAgICAgICAgICAgXS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFZ5dHZvxZllbsOtIGdyaWRmb3Jtw6F0dSBwcm8gc2V6bmFtIMW+w6Fkb3N0w60gKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUdyaWRGb3JtYXQoKTogR29yZGljLkRhdGEuR3JpZEZvcm1hdCB7XHJcbiAgICAgICAgICAgIHZhciBnZiA9IG5ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0KCk7XHJcbiAgICAgICAgICAgIC8vem5hxI1rYSBlbC5kb2NcclxuICAgICAgICAgICAgLy8hIDM2Ni4zIDI3LjEwLjEwIC0gcHJlemVudGFjZSBwxZnDrXRvbW5vc3RpIGVsLiBkb2MuXHJcbiAgICAgICAgICAgIGdmLmFkZEljb25Db2x1bW4oR29yZGljLldmbC5HbG9iYWxzLkxpc3RTdXBwb3J0LlR5cEVudGl0eUNvbHVtbkRsZygpKTtcclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5zdGF2X2Rva190eHQsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxMDFcIiwgLy9SQyAzMzYwMDEwMSA6IFNcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDAxMDJcIiwgLy9SQyAzMzYwMDEwMiA6IFR5cFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLml4cF9leHQsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxMDNcIiwgLy9SQyAzMzYwMDEwMyA6IElkZW50aWZpa8OhdG9yIMW+w6Fkb3N0aVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy50eXBfYWdfZXh0X3R4dCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDEwNFwiLCAvL1JDIDMzNjAwMTA0IDogQWdlbmRhXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogNTAsXHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxzaWFiRHRvTmFtZXMuaXhwLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTA1XCIsIC8vUkMgMzM2MDAxMDUgOiBJZGVudGlmaWvDoXRvciBkb2tsYWR1IFNNTFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDExMCxcclxuICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5hY192ZXJfemFrLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTA2XCIsIC8vUkMgMzM2MDAxMDYgOiDEjMOtc2xvIFZaLCBEVCwgUE9cclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkS25paGEoZ2YpO1xyXG4gICAgICAgICAgICBnZi5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLml4c190eXBfdHh0LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTA3XCIsIC8vUkMgMzM2MDAxMDcgOiBUeXAgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRQb3BpcyhnZik7XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uR3JpZC5Db2x1bW4uYWRkSWNvU3ViamVrdHUoZ2YsIHsgY2FwdGlvbjogXCJqcmVzOjMzNjAwNTgyXCJ9KSAvL1JDIDMzNjAwNTgyIDogScSMTyBEL09cclxuICAgICAgICAgICAgZ2YuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5peHNfZXN1X3R4dCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDEwOFwiLCAvL1JDIDMzNjAwMTA4IDogRG9kYXZhdGVsL09kYsSbcmF0ZWxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxzaWFiRHRvTmFtZXMuYnVfY2lfdHh0LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTA5XCIsIC8vUkMgMzM2MDAxMDkgOiBCw5ogZG9kYXZhdGVsL29kYsSbcmF0ZWxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxzaWFiRHRvTmFtZXMuY2lzX3JlYWwsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxMTBcIiwgLy9SQyAzMzYwMDExMCA6IFJlYWxpesOhdG9yXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLml4c19mdW5fdnlyaXpfdHh0LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTExXCIsIC8vUkMgMzM2MDAxMTEgOiBLb21wZXRlbnRcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxzaWFiRHRvTmFtZXMuaXhzX2Z1bl9yZWZfdHh0LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTEyXCIsIC8vUkMgMzM2MDAxMTIgOiBSZWZlcmVudFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5peHNfZnVuX2FrdF90eHQsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxMTNcIiwgLy9SQyAzMzYwMDExMyA6IFZsYXN0bsOta1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgR29yZGljLkVrby5HcmlkLkNvbHVtbi5hZGRNZW5hKGdmLCB7IG5hbWU6IEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLm1lbmFfdHh0LCBmaWVsZDogSW50ZXJmYWNlLkdTbWxzaWFiRHRvTmFtZXMubWVuYV90eHQgfSk7XHJcbiAgICAgICAgICAgIGdmLmFkZERlY2ltYWxDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxzaWFiRHRvTmFtZXMua3VyeixcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDExNFwiLCAvL1JDIDMzNjAwMTE0IDogS3VyelxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0UHJlc2V0OiBcIkMzXCIsXHJcbiAgICAgICAgICAgICAgICBmb3JtYXRzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJDM1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9wcmVzZXRDYXB0aW9uOiBHb3JkaWMuVGVtcGxhdGVzLkZvcm1hdHRlcnMubnVtYmVyKDEyMzQsIFwiQzNcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogXCJudW1iZXIoQzMpXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLnR5cF9jZW55X3R4dCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDExNVwiLCAvL1JDIDMzNjAwMTE1IDogVHlwIGNlbnlcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgIH0pLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLmNfbWVuYSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDExNlwiLCAvL1JDIDMzNjAwMTE2IDogQ2Vsa292w6EgxI3DoXN0a2FcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgIH0pLmFkZEN1cnJlbmN5Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLmNfcm9rLCAvL3YgVEsgY1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTE3XCIsIC8vUkMgMzM2MDAxMTcgOiBSb3pwaXMgxI3DoXN0a3kgdiBha3R1w6FsbsOtbSBvYmRvYsOtXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLnR5cF9wbGF0bm9zdF90eHQsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxMThcIiwgLy9SQyAzMzYwMDExOCA6IFR5cCBwbGF0bm9zdGlcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgIH0pLmFkZERhdGVDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxzaWFiRHRvTmFtZXMuZGF0X3V6YXZyZW5pLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTE5XCIsIC8vUkMgMzM2MDAxMTkgOiBEYXR1bSB1emF2xZllbsOtXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICB9KS5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLmRhdF9wbGF0bm9zdCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDEyMFwiLCAvL1JDIDMzNjAwMTIwIDogRGF0dW0gcGxhdG5vc3RpXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICB9KS5hZGREYXRlQ29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLmRhdF91Y2lubm9zdCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDEyMVwiLCAvL1JDIDMzNjAwMTIxIDogRGF0dW0gw7rEjWlubm9zdGlcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgIH0pLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5maW5fb2QsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxMjJcIiwgLy9SQyAzMzYwMDEyMiA6IEZpbmFuY292w6Fuw60gb2RcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgIH0pLmFkZE51bWJlckNvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5maW5fZG8sXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxMjNcIiwgLy9SQyAzMzYwMDEyMyA6IEZpbmFuY292w6Fuw60gZG9cclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxzaWFiRHRvTmFtZXMucG96bmFta2EsXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxMjRcIiwgLy9SQyAzMzYwMDEyNCA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5uYXpldiwgLy92IFRLIG5hemV2X3NtbFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTI1XCIsIC8vUkMgMzM2MDAxMjUgOiDDmnBsbsO9IG7DoXpldlxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5zb3V0ZXosXHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxMjZcIiwgLy9SQyAzMzYwMDEyNiA6IFNvdXTEm8W+XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLnVjaW5ub3N0LFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTI3XCIsIC8vUkMgMzM2MDAxMjcgOiDDmsSNaW5ub3N0IC0ga29tZW50w6HFmVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5peHNfb3JqX3R4dCxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDEyOFwiLCAvL1JDIDMzNjAwMTI4IDogT3JnYW5pemHEjW7DrSBqZWRub3RrYVxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5hY19kb2tfMSxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDEyOVwiLCAvL1JDIDMzNjAwMTI5IDogU291dmlzZWrDrWPDrSBkb2t1bWVudCAxXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICB9KS5hZGRUZXh0Q29sdW1uKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IEludGVyZmFjZS5HU21sc2lhYkR0b05hbWVzLmFjX2Rva18yLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTMwXCIsIC8vUkMgMzM2MDAxMzAgOiBTb3V2aXNlasOtY8OtIGRva3VtZW50IDJcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgICAgICAgIH0pLmFkZFRleHRDb2x1bW4oe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogSW50ZXJmYWNlLkdTbWxzaWFiRHRvTmFtZXMuYWNfc21sLFxyXG4gICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjMzNjAwMTMxXCIsIC8vUkMgMzM2MDAxMzEgOiBBZ2VuZG92w6kgxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgfSkuYWRkVGV4dENvbHVtbih7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBJbnRlcmZhY2UuR1NtbHNpYWJEdG9OYW1lcy5hYyxcclxuICAgICAgICAgICAgICAgIGNhcHRpb246IFwianJlczozMzYwMDEzMlwiLCAvL1JDIDMzNjAwMTMyIDogRXZpZGVuxI1uw60gxI3DrXNsb1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBnZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gQWtjZSBVcHJhdml0XHJcbiAgICAgICAgLyoqIEhyb21hZG7DoSBha2NlIFVwcmF2aXQgbmFkIHZ5YnJhbsO9bWkgxb7DoWRvc3RtaSAqL1xyXG4gICAgICAgIHByaXZhdGUgbW9kaWZ5KCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gdGhpcy4kZ3JpZC5nZ3JpZChcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggPCAxKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICB2YXIgd2l6YXJkQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBwxZllZMOhdsOhbsOtIHBhcmFtZXRyxa8gbWV6aSBrcm9reVxyXG4gICAgICAgICAgICBsZXQgbW9kZWxEYXRhO1xyXG4gICAgICAgICAgICAvLyBkdG8gcyBkYXR5IHogZm9ybXVsw6HFmWUgdXByYXZlbsOpIHBybyB1bG/FvmVuw61cclxuICAgICAgICAgICAgbGV0IHNhdmVEdG87XHJcbiAgICAgICAgICAgIHZhciB3aXphcmRGb3JtID0gdGhpcy5jcmVhdGVXaXphcmRNb2RpZnlGb3JtKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5Eb2tsYWRTbWwuaW5pdCgpLmdldCgpLmRvbmUoKHNtbHJlYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbWxyZWMgPSBzbWxyZWM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy4kd2l6YXJkQ250ID0gdGhpcy5uYXZpZ2F0ZTxHb3JkaWMuRWtvLkNvbXBvbmVudHMuVGhyZWVTdGVwc09wdGlvbnM8YW55Pj4oR29yZGljLkVrby5Db21wb25lbnRzLlRocmVlU3RlcHNDb250ZW50LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgSUQ6IFwiWmFkb3N0aU9aYWxvemVuaVdpemFyZE1vZGlmeSNcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwMTMzXCIsIC8vUkMgMzM2MDAxMzMgOiBIcm9tYWRuw6Egem3Em25hIMO6ZGFqxa8gxb7DoWRvc3TDrVxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleXM6IHRoaXMuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLmtleXMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogc2VsZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZGljYXRvclR5cGU6IFwiS1BJXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJqcmVzOjMzNjAwMTM0XCIsIC8vUkMgMzM2MDAxMzQgOiBWw71ixJtyIMW+w6Fkb3N0w61cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDEzNVwiLCAvL1JDIDMzNjAwMTM1IDogWmFkw6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDEzNlwiLCAvL1JDIDMzNjAwMTM2IDogQWtjZSB1cHJhdsOtIHZ5YnJhbsOpICh6YcWha3J0bnV0w6kpIMW+w6Fkb3N0aSBwb2RsZSB2eXBsbsSbbsOpaG8gZm9ybXVsw6HFmWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0luZGljYXRvcjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm06IHdpemFyZEZvcm0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1UYWJUaXRsZTogXCJqcmVzOjMzNjAwMTM3XCIsIC8vUkMgMzM2MDAxMzcgOiBQYXJhbWV0cnkgem3Em255XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZUZvcm1GaWVsZHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRBY3Rpb246IChtb2RlbCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG/EjWFzbsOhIG9wcmF2YSBwb3PDrWzDoW7DrSBwcsOhemRuw6lobyBtb2RlbCBwb2t1ZCBqZSBrb250cm9sYSB2eXZvbMOhbmEgeiBkcnVow6lobyBrcm9rdSAtLSB6IEZVQyBrb3BpZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKG1vZGVsKS5sZW5ndGggPT0gMCkgbW9kZWwgPSBtb2RlbERhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoLyptb2RlbCA9PT0ge30gfHwgKi9tb2RlbCA9PSBudWxsKSBtb2RlbCA9IG1vZGVsRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVEdG8gPSB0aGlzLm1vZGlmeURhdGFGb3JTYXZlKG1vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsRGF0YSA9IG1vZGVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLlNtbHNpYWIuY2hlY2tNYXNzUGVybWlzc2lvbnNCZWZvcmVNb2RpZnkoeyBpeHBfZXh0czogZGF0YS5tYXAoeCA9PiB4Lml4cF9leHQpLCBzYXZlRHRvOiAvKnRoaXMuc21scmVjKi9zYXZlRHRvLCB6cHVzb2JHZW5lcm92YW5pOiBwYXJzZUludChFa28uVXRpbHMuR2V0RWtvVXNlclNldHRpbmdzUGlkU2VqbXV0aSh0aGlzLCB0aGlzLmdpbl9nZW5faXhwKSkgfSkuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHNlY29uZFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzM2MDAxMzRcIiwgLy9SQyAzMzYwMDEzNCA6IFbDvWLEm3Igxb7DoWRvc3TDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwMTM4XCIsIC8vUkMgMzM2MDAxMzggOiBQb3R2cnplbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDAxMzlcIiwgLy9SQyAzMzYwMDEzOSA6IFUgdnlicmFuw71jaCDFvsOhZG9zdMOtIGJ1ZG91IHptxJtuxJtueSBob2Rub3R5IHBvZGxlIHZ5cGxuxJtuw6lobyBmb3JtdWzDocWZZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtOiB3aXphcmRGb3JtLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtVGFiVGl0bGU6IFwianJlczozMzYwMDEzN1wiLCAvL1JDIDMzNjAwMTM3IDogUGFyYW1ldHJ5IHptxJtueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbERhdGE6IChldiwgY3R4KSA9PiB7IHJldHVybiBtb2RlbERhdGE7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZUZvcm1GaWVsZHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0QWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5TbWxzaWFiLm1hc3NNb2RpZnkoeyBpeHBfZXh0czogZGF0YS5tYXAoeCA9PiB4Lml4cF9leHQpLCBzYXZlRHRvOiAvKnRoaXMuc21scmVjKi9zYXZlRHRvLCB6cHVzb2JHZW5lcm92YW5pOiBwYXJzZUludChFa28uVXRpbHMuR2V0RWtvVXNlclNldHRpbmdzUGlkU2VqbXV0aSh0aGlzLCB0aGlzLmdpbl9nZW5faXhwKSkgfSkuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l6YXJkQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja0FjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb8SNYXNuw6Egb3ByYXZhIHBvc8OtbMOhbsOtIHByw6F6ZG7DqWhvIG1vZGVsIHBva3VkIGplIGtvbnRyb2xhIHZ5dm9sw6FuYSB6IGRydWjDqWhvIGtyb2t1IC0tIHogRlVDIGtvcGllXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMobW9kZWwpLmxlbmd0aCA9PSAwKSBtb2RlbCA9IG1vZGVsRGF0YTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvKm1vZGVsID09PSB7fSB8fCAqL21vZGVsID09IG51bGwpIG1vZGVsID0gbW9kZWxEYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLlNtbHNpYWIuY2hlY2tNYXNzUGVybWlzc2lvbnNCZWZvcmVNb2RpZnkoeyBpeHBfZXh0czogZGF0YS5tYXAoeCA9PiB4Lml4cF9leHQpLCBzYXZlRHRvOiBzYXZlRHRvLyp0aGlzLnNtbHJlYyovLCB6cHVzb2JHZW5lcm92YW5pOiBwYXJzZUludChFa28uVXRpbHMuR2V0RWtvVXNlclNldHRpbmdzUGlkU2VqbXV0aSh0aGlzLCB0aGlzLmdpbl9nZW5faXhwKSkgfSkuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzM2MDAwODdcIiwgLy9SQyAzMzYwMDA4NyA6IFbDvXNsZWRla1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwMDg4XCIsIC8vUkMgMzM2MDAwODggOiBWw71zbGVkZWsgaHJvbWFkbsOpIG9wZXJhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybTogd2l6YXJkRm9ybSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybVRhYlRpdGxlOiBcImpyZXM6MzM2MDAxMzdcIiwgLy9SQyAzMzYwMDEzNyA6IFBhcmFtZXRyeSB6bcSbbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxEYXRhOiAoZXYsIGN0eCkgPT4geyByZXR1cm4gbW9kZWxEYXRhOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVGb3JtRmllbGRzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0luZGljYXRvcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2l6YXJkQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxEZWxlZ2F0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2l6YXJkQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7IHRoaXMuZW5kT3BlcmF0aW9uKCk7IH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogw5pwcmF2YSBkYXQgeiBmb3JtdWzDocWZZSBwxZllZCBrb250cm9sb3UvdWxvxb5lbsOtbSAqL1xyXG4gICAgICAgIHByaXZhdGUgbW9kaWZ5RGF0YUZvclNhdmUobW9kZWw6IGFueSk6IEludGVyZmFjZS5HU21sc2lhYk1vZGlmeUR0byB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNhdmVEdG86IEludGVyZmFjZS5HU21sc2lhYk1vZGlmeUR0byA9IHtcclxuICAgICAgICAgICAgICAgIHR5cF9wbGF0bm9zdDogbW9kZWwudHlwX3BsYXRub3N0LFxyXG4gICAgICAgICAgICAgICAgZGF0X3V6YXZyZW5pOiBtb2RlbC5kYXRfdXphdnJlbmksXHJcbiAgICAgICAgICAgICAgICBkYXRfcGxhdG5vc3Q6IG1vZGVsLmRhdF9wbGF0bm9zdCxcclxuICAgICAgICAgICAgICAgIGRhdF91Y2lubm9zdDogbW9kZWwuZGF0X3VjaW5ub3N0LFxyXG4gICAgICAgICAgICAgICAgcG9waXM6IG1vZGVsLnBvcGlzPy50cmltKCksXHJcbiAgICAgICAgICAgICAgICBwb3puYW1rYTogbW9kZWwucG96bmFta2E/LnRyaW0oKSxcclxuICAgICAgICAgICAgICAgIG5hemV2OiBtb2RlbC5uYXpldj8udHJpbSgpLFxyXG4gICAgICAgICAgICAgICAgdWNpbm5vc3Q6IG1vZGVsLnVjaW5ub3N0Py50cmltKCksXHJcbiAgICAgICAgICAgICAgICBpeHNfb3JqOiBtb2RlbC5peHNfb3JqLFxyXG4gICAgICAgICAgICAgICAgYWNfZG9rXzE6IG1vZGVsLmFjX2Rva18xPy50cmltKCksXHJcbiAgICAgICAgICAgICAgICBhY19kb2tfMjogbW9kZWwuYWNfZG9rXzI/LnRyaW0oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtb2RlbC5peHNfZnVuX3Z5cml6Py50cmltKCk/Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHNhdmVEdG8uaXhzX2Z1bl92eXJpeiA9IG1vZGVsLml4c19mdW5fdnlyaXo/LnRyaW0oKTtcclxuICAgICAgICAgICAgICAgIC8vc2F2ZUR0by5jaXNfcmVhbCA9IG1vZGVsLmNpc19yZWFsOyAtLS0gemppc3TDrW0gc2kgbmEgc2VydmVydVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtb2RlbC5peHNfZnVuX3JlZj8udHJpbSgpPy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzYXZlRHRvLml4c19mdW5fcmVmID0gbW9kZWwuaXhzX2Z1bl9yZWY/LnRyaW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobW9kZWwuaXhzX2Z1bl9ha3Q/LnRyaW0oKT8ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc2F2ZUR0by5peHNfZnVuX2FrdCA9IG1vZGVsLml4c19mdW5fYWt0Py50cmltKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1vZGVsLml4cF9kZW4/Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHNhdmVEdG8uaXhwX2RlbiA9IG1vZGVsLml4cF9kZW47XHJcbiAgICAgICAgICAgICAgICAvL3NhdmVEdG8uc3VicmFkYSA9IG1vZGVsLnN1YnJhZGE7IC0tLSB6amlzdMOtbSBzaSBuYSBzZXJ2ZXJ1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1vZGVsLml4c190eXA/LnRyaW0oKT8ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc2F2ZUR0by5peHNfdHlwID0gbW9kZWwuaXhzX3R5cDtcclxuICAgICAgICAgICAgICAgIHNhdmVEdG8ua3RnX3R5cCA9IG1vZGVsLmt0Z190eXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNhdmVEdG87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gZm9ybXVsw6HFmWUgcHJvIMO6cHJhdnUgZGF0IMW+w6Fkb3N0w60gKi9cclxuICAgICAgICBwcml2YXRlIGNyZWF0ZVdpemFyZE1vZGlmeUZvcm0oKTogR29yZGljLkZvcm1zLkZvcm0ge1xyXG4gICAgICAgICAgICBsZXQgaXhwRGVuRmlsdGVyUGFuZWxPcHRzOiBJR0ZpbHRlclBhbmVsT3B0aW9uczxhbnk+ID0ge1xyXG4gICAgICAgICAgICAgICAgZm9ybXM6IFtuZXcgR29yZGljLkZvcm1zLkZvcm0oKS5hZGRSb3coXCJqcmVzOjMzNjAwNjAwXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIud2l0aE9wZXJhdG9ycyh7ZGVmYXVsdE9wZXJhdG9yOiBcIj49XCIsIG9wZXJhdG9yczogW1wiPVwiLCBcIiE9XCIsIFwiPlwiLCBcIj49XCIsIFwiPFwiLCBcIjw9XCJdfSksIHsgbmFtZTogXCJyb2tcIiwgaW5pdGlhbFZhbHVlOiB0aGlzLnJvaywgZGVmYXVsdFZhbHVlOiBudWxsIH0pXSwgLy9SQyAzMzYwMDYwMCA6IFJva1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyVmlld01vZGU6IEZpbHRlclZpZXdNb2RlLlNpbXBsZSxcclxuICAgICAgICAgICAgICAgIGhhcmREZWZhdWx0RmlsdGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm9rOiB0aGlzLnJva1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZm9ybU1vZGlmeVJlcXVlc3RzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzFcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwMTExXCIpIC8vUkMgMzM2MDAxMTEgOiBLb21wZXRlbnRcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNtbEtvbXAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1bl92eXJpelwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLml4c19mdW5fdnlyaXo9dmFsdWUuaXhzX2Z1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2lzX3JlYWw6IHRoaXMuZ2xvYmFscy5jaXNfcmVhbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2Z1bl9rb21wOiB0aGlzLmdsb2JhbHMuaXhzX2Z1bl9rb21wID8/IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eD8uZmxhZ3M/LnZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiR3aXphcmRDbnQuZmluZEZpZWxkcyhcIml4c19mdW5fcmVmXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcInNlcnZlckZpbHRlcnNcIiwgeyBpeHNfb3JqOiBjdHgudmFsdWU/Lml4c19vcmogfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiR3aXphcmRDbnQuZmluZEZpZWxkcyhcImNpc19yZWFsXCIpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgeyBjaXNfcmVhbDogY3R4LnZhbHVlPy5jaXNfcmVhbD8udHJpbSgpLCBpY286IGN0eC52YWx1ZT8uaWNvIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAxNDBcIikgLy9SQyAzMzYwMDE0MCA6IFZ5xZlpenVqw61jw60gcmVmZXJlbnRcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNtbEZ1blZ5cml6KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19mdW5fcmVmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX2Z1bl9yZWY9dmFsdWUuaXhzX2Z1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9peHNfb3JqOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJpeHNfZnVuX3Z5cml6XCIsIFwiaXhzX29yalwiLCBmYWxzZSwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwMTQxXCIpIC8vUkMgMzM2MDAxNDEgOiBLbmloYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc2Rlbih2b2lkIDAsIHsgZmlsdGVyUGFuZWxPcHRzOiBpeHBEZW5GaWx0ZXJQYW5lbE9wdHMgfSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9kZW5cIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogJ21vZGVsLml4cF9kZW49dmFsdWUuaXhwX2Rlbjttb2RlbC5zdWJyYWRhPD12YWx1ZS5zdWJyYWRhJyxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaWNvOiB0aGlzLmljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy91Y3M6IHRoaXMudWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdHg/LmZsYWdzPy52YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4c190eXAgPSB0aGlzLiR3aXphcmRDbnQuZmluZEZpZWxkcyhcIml4c190eXBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfdHlwLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2bGFzdG5payA9IHRoaXMuJHdpemFyZENudC5maW5kRmllbGRzKFwiaXhzX2Z1bl9ha3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmxhc3RuaWtfdmFsdWUgPSB2bGFzdG5pay5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2bGFzdG5pa192YWx1ZSAmJiBjdHgudmFsdWU/Lml4cF9kZW4gIT0gdmxhc3RuaWtfdmFsdWUuaXhwX2Rlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZsYXN0bmlrLmdmaWVsZChcInJlc2V0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC52YWx1ZT8uaXhwX2Rlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzbC5TbWxzaWFiLmdldEt0Z0Rlbih7IGl4cF9kZW46IGN0eC52YWx1ZS5peHBfZGVuIH0pLmdldCgpLmRvbmUoKGt0Z19kZW4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrdGdfZGVuID09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c190eXAuZ2ZpZWxkKFwib3B0aW9uXCIsIFwic2VydmVyRmlsdGVyc1wiLCB7IGt0Z19kZW46IGt0Z19kZW4sIGl4cF9kZW46IGN0eC52YWx1ZT8uaXhwX2RlbiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmxhc3RuaWsuZ2ZpZWxkKFwib3B0aW9uXCIsIFwic2VydmVyRmlsdGVyc1wiLCB7IC4uLnZsYXN0bmlrLmdmaWVsZChcIm9wdGlvblwiLCBcInNlcnZlckZpbHRlcnNcIiksIC4uLnsgaXhwX2RlbjogY3R4LnZhbHVlPy5peHBfZGVuIH0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4geyB0aGlzLmVuZE9wZXJhdGlvbigpIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bGFzdG5pay5nZmllbGQoXCJvcHRpb25cIiwgXCJzZXJ2ZXJGaWx0ZXJzXCIsIHsgLi4udmxhc3RuaWsuZ2ZpZWxkKFwib3B0aW9uXCIsIFwic2VydmVyRmlsdGVyc1wiKSwgLi4ueyBpeHBfZGVuOiB0aGlzLnNtbHJlYy5peHBfZGVuIH0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3R5cC5nZmllbGQoXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2LnRhcmdldCkuZ2ZpZWxkKFwicmVzZXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAxMThcIikgLy9SQyAzMzYwMDExOCA6IFR5cCBwbGF0bm9zdGlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNtbGN0cGwoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwidHlwX3BsYXRub3N0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6ICdtb2RlbC50eXBfcGxhdG5vc3Q9dmFsdWUudHlwX3BsYXRub3N0JyxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWU6IHsgdHlwX3BsYXRub3N0OiBJbnRlcmZhY2UuVHlwUGxhdG5vc3RTbWxvdXZ5Lm5nX3R5cHBsYXRub3N0Tm9uZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eD8uZmxhZ3M/LnZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL8WZw616ZW7DrSBuYSB6w6FrbGFkxJsgdHlwIHBsYXRub3N0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN0eC52YWx1ZT8udHlwX3BsYXRub3N0ID09IEludGVyZmFjZS5UeXBQbGF0bm9zdFNtbG91dnkubmdfdHlwcGxhdG5vc3RVcmNpdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiR3aXphcmRDbnQuZmluZEZpZWxkcyhcImRhdF9wbGF0bm9zdFwiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHdpemFyZENudC5maW5kRmllbGRzKFwiZGF0X3BsYXRub3N0XCIpLmdmaWVsZChcInJlc2V0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHdpemFyZENudC5maW5kRmllbGRzKFwiZGF0X3BsYXRub3N0XCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuJHdpemFyZENudC5maW5kRmllbGRzKFwiZGF0X3BsYXRub3N0XCIpLmdmaWVsZCgoY3R4LnZhbHVlPy50eXBfcGxhdG5vc3QgPT0gSW50ZXJmYWNlLlR5cFBsYXRub3N0U21sb3V2eS5uZ190eXBwbGF0bm9zdFVyY2l0YSkgPyBcImVuYWJsZVwiIDogXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwMTE5XCIpIC8vUkMgMzM2MDAxMTkgOiBEYXR1bSB1emF2xZllbsOtXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJkYXRfdXphdnJlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vMzQzLjEgMDIuMDUuMDIgLSBwxZllZG5hc3RhdsOtbSBkYXR1bSDDusSNaW5ub3N0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiR3aXphcmRDbnQuZmluZEZpZWxkcyhcImRhdF91Y2lubm9zdFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjdHgudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDE0MlwiKSAvL1JDIDMzNjAwMTQyIDogRGF0dW0gdWtvbsSNZW7DrSBwbGF0bm9zdGlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9wbGF0bm9zdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZTogXCJlcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDAxNDNcIiwgLy9SQyAzMzYwMDE0MyA6IERhdHVtIHBsYXRub3N0aSBzbWxvdXZ5IGplIG1lbsWhw60gbmXFviBkYXR1bSB1emF2xZllbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsdWUsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuJHdpemFyZENudC5maW5kRmllbGRzKFwidHlwX3BsYXRub3N0XCIpLmdmaWVsZChcImdldFZhbHVlXCIpLnR5cF9wbGF0bm9zdCA9PSBJbnRlcmZhY2UuVHlwUGxhdG5vc3RTbWxvdXZ5Lm5nX3R5cHBsYXRub3N0VXJjaXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdF91emF2cmVuaSA9IEdvcmRpYy5VdGlscy5EYXRlVGltZS5wYXJzZSh0aGlzLiR3aXphcmRDbnQuZmluZEZpZWxkcyhcImRhdF91emF2cmVuaVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSkuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0X3BsYXRub3N0ID0gR29yZGljLlV0aWxzLkRhdGVUaW1lLnBhcnNlKHRoaXMuJHdpemFyZENudC5maW5kRmllbGRzKFwiZGF0X3BsYXRub3N0XCIpLmdmaWVsZChcImdldFZhbHVlXCIpKS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRfdXphdnJlbmkgJiYgZGF0X3BsYXRub3N0ICYmIGRhdF91emF2cmVuaSA+IGRhdF9wbGF0bm9zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiR3aXphcmRDbnQuZmluZEZpZWxkcyhcImRhdF91emF2cmVuaVwiKS5nZmllbGQoXCJyZXNldFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2Uoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGU6IFwid2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wcGluZzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMzYwMDE0NFwiLCAvL1JDIDMzNjAwMTQ0IDogUm9rIHBsYXRub3N0aSBzbWxvdXZ5IG5lc291aGxhc8OtIHMgcm9rZW0gdXphdsWZZW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbHVlLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLiR3aXphcmRDbnQuZmluZEZpZWxkcyhcInR5cF9wbGF0bm9zdFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKS50eXBfcGxhdG5vc3QgPT0gSW50ZXJmYWNlLlR5cFBsYXRub3N0U21sb3V2eS5uZ190eXBwbGF0bm9zdFVyY2l0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRfdXphdnJlbmkgPSBHb3JkaWMuVXRpbHMuRGF0ZVRpbWUucGFyc2UodGhpcy4kd2l6YXJkQ250LmZpbmRGaWVsZHMoXCJkYXRfdXphdnJlbmlcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIikpLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdF9wbGF0bm9zdCA9IEdvcmRpYy5VdGlscy5EYXRlVGltZS5wYXJzZSh0aGlzLiR3aXphcmRDbnQuZmluZEZpZWxkcyhcImRhdF9wbGF0bm9zdFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKSkuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0X3V6YXZyZW5pICYmIGRhdF9wbGF0bm9zdCAmJiBkYXRfcGxhdG5vc3QgIT0gZGF0X3V6YXZyZW5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vJChldi50YXJnZXQpLmdmaWVsZChcInZhbGlkYXRlXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMuJHdpemFyZENudC5maW5kRmllbGRzKFwiZGF0X3VjaW5ub3N0XCIpLmdmaWVsZChcInZhbGlkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDEyMVwiKSAvL1JDIDMzNjAwMTIxIDogRGF0dW0gw7rEjWlubm9zdGlcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF91Y2lubm9zdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yVHlwZTogXCJlcnJvclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcImpyZXM6MzM2MDAxNDVcIiwgLy9SQyAzMzYwMDE0NSA6IE5lcMWZw61wdXN0bsOhIGhvZG5vdGEuIERhdHVtIMO6xI1pbm5vc3RpIG5lc23DrSBiw710IG5pxb7FocOtIG5lxb4gZGF0dW0gdXphdsWZZW7DrSBzbWxvdXZ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAodmFsdWUsIHNyYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdF91emF2cmVuaSA9IHRoaXMuJHdpemFyZENudC5maW5kRmllbGRzKFwiZGF0X3V6YXZyZW5pXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9uaWtkeSBuZXNtw60gYsO9dCBuacW+xaHDrSBuZcW+IGRhdHVtIHV6YXbFmWVuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IGRhdF91emF2cmVuaSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy4kd2l6YXJkQ250LmZpbmRGaWVsZHMoXCJkYXRfdWNpbm5vc3RcIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgZGF0X3V6YXZyZW5pLCB7dHJpZ2dlckNoYW5nZTogZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBHb3JkaWMuVmFsaWRhdG9ycy5CYXNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JUeXBlOiBcImVycm9yXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMzYwMDE0NlwiLCAvL1JDIDMzNjAwMTQ2IDogTmVwxZnDrXB1c3Ruw6EgaG9kbm90YS4gRGF0dW0gw7rEjWlubm9zdGkgbmVzbcOtIGLDvXQgdnnFocWhw60gbmXFviBkYXR1bSBwbGF0bm9zdGkgc21sb3V2eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbHVlLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRfcGxhdG5vc3QgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLiR3aXphcmRDbnQuZmluZEZpZWxkcyhcInR5cF9wbGF0bm9zdFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKS50eXBfcGxhdG5vc3QgPT0gSW50ZXJmYWNlLlR5cFBsYXRub3N0U21sb3V2eS5uZ190eXBwbGF0bm9zdFVyY2l0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdF9wbGF0bm9zdCA9IHRoaXMuJHdpemFyZENudC5maW5kRmllbGRzKFwiZGF0X3BsYXRub3N0XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID4gZGF0X3BsYXRub3N0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLiR3aXphcmRDbnQuZmluZEZpZWxkcyhcImRhdF91Y2lubm9zdFwiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBkYXRfcGxhdG5vc3QsIHsgdHJpZ2dlckNoYW5nZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyQoZXYudGFyZ2V0KS5nZmllbGQoXCJ2YWxpZGF0ZVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLiR3aXphcmRDbnQuZmluZEZpZWxkcyhcImRhdF9wbGF0bm9zdFwiKS5nZmllbGQoXCJ2YWxpZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAxMTBcIikgLy9SQyAzMzYwMDExMCA6IFJlYWxpesOhdG9yXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zcmVhKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNpc19yZWFsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6ICdtb2RlbC5pY289dmFsdWUuaWNvO21vZGVsLmNpc19yZWFsPXZhbHVlLmNpc19yZWFsJyxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjMzNjAwMTEzXCIpIC8vUkMgMzM2MDAxMTMgOiBWbGFzdG7DrWtcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNtbFZsYXN0bmlrKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c19mdW5fYWt0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6ICdtb2RlbC5peHNfZnVuX2FrdD12YWx1ZS5peHNfZnVuJyxcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlemltS25paGE6IEludGVyZmFjZS5SZXppbUtuaWh5Lm5nX3ZkcmV6aW1rbmloYU9uZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV6aW1IaXN0OiBJbnRlcmZhY2UuUmV6aW1IaXN0Lm5nX3ZkcmV6aW1oaXN0Tm9cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAxMDdcIikgLy9SQyAzMzYwMDEwNyA6IFR5cCBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5zbWxUeXBEb2tsYWR1KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4c190eXBcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogJ21vZGVsLml4c190eXA9dmFsdWUuaXhzX3R5cDttb2RlbC5rdGdfdHlwPD12YWx1ZS5rdGdfdHlwJyxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vMzkwLjEgMjkuMDkuMjIgdnlob3plbiB0ZXh0IGRvZGF0ZWsgc21sb3V2eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuQmFzZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvclR5cGU6IFwiZXJyb3JcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwianJlczozMzYwMDE0N1wiLCAvL1JDIDMzNjAwMTQ3IDogTmVwxZnDrXB1c3Ruw70gdHlwIGRva2xhZHUgLSBuZWx6ZSB2b2xpdCBkb2RhdGVrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKHZhbHVlLCBzcmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU/Lmt0Z190eXAgIT0gSW50ZXJmYWNlLkthdGVnb3JpZVR5cHVTbWx1di5uZ19rdGd0eXBTbWxBY2NcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAxMjhcIikgLy9SQyAzMzYwMDEyOCA6IE9yZ2FuaXphxI1uw60gamVkbm90a2FcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LnNtbE9yaigpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfb3JqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6ICdtb2RlbC5peHNfb3JqPXZhbHVlLml4c19vcmonLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKGV2LCBjdHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc21sX3phdl9ucmVmb3JqID09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHdpemFyZENudC5maW5kRmllbGRzKFwiaXhzX2Z1bl9yZWZcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwic2VydmVyRmlsdGVyc1wiLCB7IGl4c19vcmo6IGN0eC52YWx1ZT8uaXhzX29yaiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczozMzYwMDE0OFwiKSAvL1JDIDMzNjAwMTQ4IDogw5rEjWlubm9zdFxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ1Y2lubm9zdFwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAxMjlcIikgLy9SQyAzMzYwMDEyOSA6IFNvdXZpc2Vqw61jw60gZG9rdW1lbnQgMVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY19kb2tfMVwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MzM2MDAxMzBcIikgLy9SQyAzMzYwMDEzMCA6IFNvdXZpc2Vqw61jw60gZG9rdW1lbnQgMlxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY19kb2tfMlwiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcImpyZXM6MzM2MDAxNDlcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMLTItMTAtMFwiIH0pIC8vUkMgMzM2MDAxNDkgOiBQb3Bpc1xyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3Bpc1wiXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh7IGxhYmVsOiBcImpyZXM6MzM2MDAxMjVcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMLTItMTAtMFwiIH0pIC8vUkMgMzM2MDAxMjUgOiDDmnBsbsO9IG7DoXpldlxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJuYXpldlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd3M6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiA1MDAgfSkgLy8zNTIuNCAyMy4wOS4wNCAtIG5hc3RhdmVuw60gZMOpbGt5IMWZZXTEm3pjZVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KHsgbGFiZWw6IFwianJlczozMzYwMDEyNFwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwtMi0xMC0wXCIgfSkgLy9SQyAzMzYwMDEyNCA6IFBvem7DoW1rYVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3puYW1rYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvd3M6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgR29yZGljLlZhbGlkYXRvcnMuTGVuZ3RoKHsgbWF4OiA1MDAgfSkgLy8zNTIuNCAyMy4wOS4wNCAtIG5hc3RhdmVuw60gZMOpbGt5IMWZZXTEm3pjZVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBBa2NlIE9kc3RyYW5pdFxyXG4gICAgICAgIC8qKiBIcm9tYWRuw6EgYWtjZSBvZHN0cmFuaXQgxb7DoWRvc3RpICovXHJcbiAgICAgICAgcHJpdmF0ZSBkZWxldGUoKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGlzLiRncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA8IDEpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIHZhciB3aXphcmRDaGFuZ2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlPEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc09wdGlvbnM8YW55Pj4oR29yZGljLkVrby5Db21wb25lbnRzLlR3b1N0ZXBzQ29udGVudCwge1xyXG4gICAgICAgICAgICAgICAgSUQ6IFwiWmFkb3N0aU9aYWxvemVuaVdpemFyZE1vZGlmeSNcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDAxNTBcIiwgLy9SQyAzMzYwMDE1MCA6IEhyb21hZG7DoSBvZHN0cmFuxJtuw60gxb7DoWRvc3TDrVxyXG4gICAgICAgICAgICAgICAgZ3JpZEZvcm1hdDogdGhpcy5jcmVhdGVHcmlkRm9ybWF0KCksXHJcbiAgICAgICAgICAgICAgICBrZXlzOiB0aGlzLiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5rZXlzLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogc2VsZWN0aW9uLFxyXG4gICAgICAgICAgICAgICAgaW5kaWNhdG9yVHlwZTogXCJLUElcIixcclxuICAgICAgICAgICAgICAgIHByZUNoZWNrQWN0aW9uOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5TbWxzaWFiLmNoZWNrTWFzc1Blcm1pc3Npb25zQmVmb3JlRGVsZXRlKHsgaXhwX2V4dHM6IGRhdGEubWFwKHggPT4geC5peHBfZXh0KSB9KS5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmlyc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzM2MDAxMzRcIiwgLy9SQyAzMzYwMDEzNCA6IFbDvWLEm3Igxb7DoWRvc3TDrVxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDAxMzRcIiwgLy9SQyAzMzYwMDEzNCA6IFbDvWLEm3Igxb7DoWRvc3TDrVxyXG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImpyZXM6MzM2MDAxNTFcIiwgLy9SQyAzMzYwMDE1MSA6IEFrY2Ugb2RzdHJhbsOtIHZ5YnJhbsOpICh6YcWha3J0bnV0w6kpIMW+w6Fkb3N0aSBvIHphbG/FvmVuw60geiBqaW7DvWNoIGFnZW5kLiBQbyBqZWrDrW0gcHJvdmVkZW7DrSBidWRvdSB0eXRvIMW+w6Fkb3N0aSBvZHN0cmFuxJtueVxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dJbmRpY2F0b3I6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5TbWxzaWFiLm1hc3NEZWxldGUoeyBpeHBfZXh0czogZGF0YS5tYXAoeCA9PiB4Lml4cF9leHQpIH0pLmdldCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l6YXJkQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQWN0aW9uOiAobW9kZWwsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNsLlNtbHNpYWIuY2hlY2tNYXNzUGVybWlzc2lvbnNCZWZvcmVEZWxldGUoeyBpeHBfZXh0czogZGF0YS5tYXAoeCA9PiB4Lml4cF9leHQpIH0pLmdldCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBsYXN0U3RlcDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUYWJUaXRsZTogXCJqcmVzOjMzNjAwMDg3XCIsIC8vUkMgMzM2MDAwODcgOiBWw71zbGVkZWtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjMzNjAwMDg4XCIgLy9SQyAzMzYwMDA4OCA6IFbDvXNsZWRlayBocm9tYWRuw6kgb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB3aXphcmRDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNhbmNlbERlbGVnYXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpemFyZENoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikucmVxdWVzdERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIFDFmWV2esOtdFxyXG4gICAgICAgIC8qKiBQxZlldnpldMOtIMW+w6Fkb3N0w60gYSB6YWxvxb5lbsOtIGRva2xhZMWvKi9cclxuICAgICAgICBwcml2YXRlIGdldFJlcXVlc3QoKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGlzLiRncmlkLmdncmlkKFwiZ2V0U2VsZWN0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA8IDEpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgIHZhciB3aXphcmRDaGFuZ2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB2YXIgd2l6ID0gdGhpcy5uYXZpZ2F0ZTxHb3JkaWMuRWtvLkNvbXBvbmVudHMuVHdvU3RlcHNPcHRpb25zPGFueT4+KEdvcmRpYy5Fa28uQ29tcG9uZW50cy5Ud29TdGVwc0NvbnRlbnQsIHtcclxuICAgICAgICAgICAgICAgIElEOiBcIlphZG9zdGlPWmFsb3plbmlXaXphcmRHZXRSZXF1ZXN0cyNcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDAxNTJcIiwgLy9SQyAzMzYwMDE1MiA6IEhyb21hZG7DoSBwxZlldnpldMOtIMW+w6Fkb3N0w61cclxuICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IHRoaXMuY3JlYXRlR3JpZEZvcm1hdCgpLFxyXG4gICAgICAgICAgICAgICAga2V5czogdGhpcy4kZ3JpZC5nZ3JpZChcImdldFZpZXdcIikua2V5cyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHNlbGVjdGlvbixcclxuICAgICAgICAgICAgICAgIGluZGljYXRvclR5cGU6IFwiS1BJXCIsXHJcbiAgICAgICAgICAgICAgICBwcmVDaGVja0FjdGlvbjogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc2wuU21sc2lhYi5jaGVja01hc3NQZXJtaXNzaW9uc0JlZm9yZUdldFJlcXVlc3RzKHsgaXhwX2V4dHM6IGRhdGEubWFwKHggPT4geC5peHBfZXh0KSwgenB1c29iR2VuZXJvdmFuaTogcGFyc2VJbnQoRWtvLlV0aWxzLkdldEVrb1VzZXJTZXR0aW5nc1BpZFNlam11dGkodGhpcywgdGhpcy5naW5fZ2VuX2l4cCkpIH0pLmdldCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmaXJzdFN0ZXA6IHtcclxuICAgICAgICAgICAgICAgICAgICBncmlkVGFiVGl0bGU6IFwianJlczozMzYwMDEzNFwiLCAvL1JDIDMzNjAwMTM0IDogVsO9YsSbciDFvsOhZG9zdMOtXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczozMzYwMDEzNFwiLCAvL1JDIDMzNjAwMTM0IDogVsO9YsSbciDFvsOhZG9zdMOtXHJcbiAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwianJlczozMzYwMDE1M1wiLCAvL1JDIDMzNjAwMTUzIDogQWtjZSBwxZlldmV6bWUgdnlicmFuw6kgKHphxaFrcnRudXTDqSkgxb7DoWRvc3RpIG8gemFsb8W+ZW7DrSB6IGppbsO9Y2ggYWdlbmQgYSB6YWxvxb7DrSBkb2tsYWR5LiBQbyBqZWrDrW0gcHJvdmVkZW7DrSBidWRvdSB0eXRvIHphbG/FvmVueSBwxZnDrXNsdcWhbsOpIGRva2xhZHkuXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd0luZGljYXRvcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtZW51R3JpZEJhcjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBuZXcgR0FjdGlvbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE1hbnVhbEFnSXhwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcImpyZXM6MzM2MDAxNTRcIiwgLy9SQyAzMzYwMDE1NCA6IFphZGF0IEFnLiDEjcOtc2xvIGEgSWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwianJlczozMzYwMDE1NVwiLCAvL1JDIDMzNjAwMTU1IDogTWFudcOhbG7EmyB6YWRhdCBBZ2VuZG92w6kgxI3DrXNsbyBhIElkZW50aWZpa8OhdG9yIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW46IChldiwgY3R4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGR0byA9IGN0eC5ncmlkLmdncmlkKFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuU21sLldlYkNsaWVudC5HU01MWmFkb3N0aUFnSXhwRGxnXCIsIHsgZHRvOiBkdG8gfSwgeyB3aWR0aDogNTAwLCBoZWlnaHQ6IDI1MCB9KS5vbihcImNsb3NlZFwiLCAoZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgd2l6Q250ID0gJC5jb250ZW50KHdpeik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXpDbnQuYmVnaW5PcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpemFyZENoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdyaWQgPSAoY3R4LmdyaWQgYXMgSlF1ZXJ5PEhUTUxFbGVtZW50Pik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3LnVwZGF0ZURhdGEocmV0VmFsLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNsLlNtbHNpYWIuY2hlY2tNYXNzUGVybWlzc2lvbnNCZWZvcmVHZXRSZXF1ZXN0cyh7IGl4cF9leHRzOiB2aWV3LmdldERhdGFSb3dzKCkubWFwKHggPT4geC5peHBfZXh0KSwgenB1c29iR2VuZXJvdmFuaTogcGFyc2VJbnQoRWtvLlV0aWxzLkdldEVrb1VzZXJTZXR0aW5nc1BpZFNlam11dGkodGhpcywgdGhpcy5naW5fZ2VuX2l4cCkpIH0pLmdldCgpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcudXBkYXRlRGF0YShHb3JkaWMuRWtvLkNvbXBvbmVudHMuV2l6YXJkLlV0aWxzLmdldERhdGE8YW55PihyZXMpLCBcInVwZGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHguZ2V0V2l6Q29udGVudCgpLnJlZnJlc2hJbmRpY2F0b3Iodmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4geyB3aXpDbnQuZW5kT3BlcmF0aW9uKCk7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhdm9yaXRlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEFjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5TbWxzaWFiLm1hc3NHZXRSZXF1ZXN0cyh7IGl4cF9leHRzOiBkYXRhLm1hcCh4ID0+IHguaXhwX2V4dCksIHpwdXNvYkdlbmVyb3Zhbmk6IHBhcnNlSW50KEVrby5VdGlscy5HZXRFa29Vc2VyU2V0dGluZ3NQaWRTZWptdXRpKHRoaXMsIHRoaXMuZ2luX2dlbl9peHApKSB9KS5nZXQoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpemFyZENoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fa28uQ29tcG9uZW50cy5XaXphcmQuVXRpbHMuZ2V0RGF0YTxhbnk+KHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGVja0FjdGlvbjogKG1vZGVsLCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzbC5TbWxzaWFiLmNoZWNrTWFzc1Blcm1pc3Npb25zQmVmb3JlR2V0UmVxdWVzdHMoeyBpeHBfZXh0czogZGF0YS5tYXAoeCA9PiB4Lml4cF9leHQpLCB6cHVzb2JHZW5lcm92YW5pOiBwYXJzZUludChFa28uVXRpbHMuR2V0RWtvVXNlclNldHRpbmdzUGlkU2VqbXV0aSh0aGlzLCB0aGlzLmdpbl9nZW5faXhwKSkgfSkuZ2V0KCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gR29yZGljLkVrby5Db21wb25lbnRzLldpemFyZC5VdGlscy5nZXREYXRhPGFueT4ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGxhc3RTdGVwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZFRhYlRpdGxlOiBcImpyZXM6MzM2MDAwODdcIiwgLy9SQyAzMzYwMDA4NyA6IFbDvXNsZWRla1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MzM2MDAwODhcIiAvL1JDIDMzNjAwMDg4IDogVsO9c2xlZGVrIGhyb21hZG7DqSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGVEZWxlZ2F0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpemFyZENoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGdyaWQuZ2dyaWQoXCJnZXRWaWV3XCIpLnJlcXVlc3REYXRhKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsRGVsZWdhdGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAod2l6YXJkQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRncmlkLmdncmlkKFwiZ2V0Vmlld1wiKS5yZXF1ZXN0RGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG4gICAgfVxyXG59XHJcbiJdfQ==