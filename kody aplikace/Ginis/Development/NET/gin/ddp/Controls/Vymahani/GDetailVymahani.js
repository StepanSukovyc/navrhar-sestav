"use strict";
//  <FileHeader xmlns="http://www.gordic.cz/shared/file-header/v_1.0.0.0">
//    <Name>        Gordic.Ddp.WebClient.GDetailVymahani.ts                     </Name>
//    <Description> Detail vymáhání                                             </Description>
//    <Author>      vcech                                                       </Author>
//    <Copyright>   © GORDIC spol. s r. o. 1993-2025                            </Copyright>
//    <Created>     2024-11-28                                                  </Created>
//  </FileHeader>
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Ddp;
    (function (Ddp) {
        var WebClient;
        (function (WebClient) {
            /**
             * Detail vymáhání
             *
             * @author Vojtěch Čech
             * @date 28.11.2024
             */
            let GDetailVymahani = class GDetailVymahani extends Gordic.GDetailBuilderContent {
                constructor() {
                    super(...arguments);
                    /** Parametr zda se ukládá před tiskem */
                    this.savePredTiskem = false;
                    /** Data o ESU na případu DDP */
                    this.esuPripaduDDP = false;
                    //#endregion
                }
                // Program začíná zde, definice políček
                onDetailBuilderInit(builder) {
                    var that = this;
                    that.createActions();
                    builder.withComponent("vymahani", {
                        actions: {
                            actPodani: {
                                name: "actPodani",
                                caption: "Podání",
                                run: () => {
                                    that.noveVymahani();
                                }
                            },
                            actHlavni: {
                                name: "actHlavni",
                                tooltip: "Otevře detail hlavního vymáhání",
                                caption: "Hlavní",
                                run: () => {
                                    var ixpNvyNad = that.model.ixp_nvy_nad;
                                    var ixpNvy = that.model.ixp_nvy;
                                    if (ixpNvyNad != ixpNvy)
                                        that.navigate("Gordic.Ddp.WebClient.GDetailVymahani", {
                                            ixpNvy: ixpNvyNad
                                        });
                                }
                            },
                            actPredani: {
                                name: "actPredani",
                                caption: "Předání",
                                run: () => {
                                    that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GRedistribuce", { ID: "DDPGRedistribuce#", ixp: that.ixpNvy, typPhl: that.typPhl }, "Předání", 800, 300)
                                        .on("close", function (ev, retVal) {
                                        if (retVal != undefined && retVal.ixsFun != undefined) {
                                            that.redistribuce(0, retVal.ixsFun);
                                        }
                                        ;
                                    });
                                }
                            },
                            actPrideleni: {
                                name: "actPrideleni",
                                caption: "Přidělení",
                                run: () => {
                                    that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GRedistribuce", { ID: "DDPGRedistribuce#", ixp: that.ixpNvy, typPhl: that.typPhl }, "Předání", 800, 300)
                                        .on("close", function (ev, retVal) {
                                        if (retVal != undefined && retVal.ixsFun != undefined) {
                                            that.redistribuce(10, retVal.ixsFun);
                                        }
                                        ;
                                    });
                                }
                            },
                            actPrevzeti: {
                                name: "actPrevzeti",
                                caption: "Převzetí",
                                run: () => {
                                    that.prevzit();
                                }
                            },
                            actPripadDDP: {
                                name: "actPripadDDP",
                                caption: "Detail případu",
                                tooltip: "Zobrazení detailu případu DDP",
                                disabled: that.params.ddp_rez_zjedno == 3,
                                run: () => {
                                    //? je tady nutný mít typ_phl na vstupu pro otevření detailu případu ?
                                    WebClient.Common.Pripady.openPripadDetail(that, that.model.ixp_ddp);
                                    //that.navigate(
                                    //    "Gordic.Ddp.WebClient.GPripadDetail",
                                    //    {
                                    //        ID: "DDPGPripadDetail#",
                                    //        Ixp: that.model.ixp_ddp,
                                    //        TypPhl: that.model.typ_phl
                                    //    }
                                    //);
                                }
                            },
                            actPridatDoSpisu: {
                                name: "actPridatDoSpisu",
                                caption: "Přidat",
                                tooltip: "Přidat do spisu",
                                run: () => {
                                    that.pridatDoSpisu();
                                }
                            },
                            actVyjmoutZeSpisu: {
                                name: "actVyjmoutZeSpisu",
                                caption: "Vyjmout",
                                tooltip: "Vyjmout ze spisu",
                                run: () => {
                                    that.vyjmoutZeSpisu();
                                }
                            },
                            actZalozitSpis: {
                                name: "actZalozitSpis",
                                caption: "Založit",
                                tooltip: "Založit spis",
                                run: () => {
                                    that.zalozitSpis();
                                }
                            },
                            actStorno: {
                                name: "actStorno",
                                caption: "Storno",
                                tooltip: "Stornování vymáhání",
                                run: () => {
                                    that.dialogs.confirm("Storno", "Opravdu chcete stornovat vymáhání?")
                                        .on("close", (_obj, retVal) => {
                                        if (retVal == "yes") {
                                            that.stornoVymahani(that.model);
                                        }
                                        else
                                            return false;
                                    });
                                }
                            },
                            actTiskVYM: {
                                name: "actTiskVYM",
                                caption: "Tisk",
                                run: () => {
                                    that.kontrolaPredTiskem();
                                }
                            },
                            actPripadOstatni: {
                                name: "actPripadOstatni",
                                caption: "Detail vymáhání",
                                tooltip: "Zobrazení detailu vymáhání",
                                run: () => {
                                    var row = that.gridOstatniVym.ggrid("activeRow");
                                    if (row != undefined) {
                                        that.navigate("Gordic.Ddp.WebClient.GDetailVymahani", {
                                            ixpNvy: row.ixp_nvy
                                        });
                                    }
                                }
                            },
                            actDetailZas: {
                                name: "actDetailZas",
                                caption: "Detail zásilky",
                                run: () => {
                                    that.zobrazDetailZasilky();
                                }
                            },
                            actZobrazitNap: {
                                name: "actZobrazitNap",
                                caption: "Zobrazit",
                                run: () => {
                                    var row = that.gridDilciVymahani.ggrid("activeRow");
                                    if (row != undefined) {
                                        that.navigate("Gordic.Ddp.WebClient.GDetailVymahani", {
                                            ixpNvy: row.ixp_nvy
                                        });
                                    }
                                }
                            },
                            actNavazatNap: {
                                name: "actNavazatNap",
                                caption: "Navázat",
                                run: () => {
                                    that.navazatNapojeneVymahani();
                                }
                            },
                            actZrusitVazbuNap: {
                                name: "actZrusitVazbuNap",
                                caption: "Zrušit vazbu",
                                run: () => {
                                    that.zrusitNavazaniNapVym();
                                }
                            },
                            actNavazat: {
                                name: "actNavazat",
                                caption: "Navázat",
                                run: () => {
                                    that.navazat();
                                }
                            },
                            actZrusitVazbu: {
                                name: "actZrusitVazbu",
                                caption: "Zrušit vazbu",
                                run: () => {
                                    that.zrusitNavazani();
                                }
                            },
                            actObnovitVazbu: {
                                name: "actObnovitVazbu",
                                caption: "Obnovit vazbu",
                                run: () => {
                                    that.obnoveniNavazani();
                                }
                            },
                            actPripadKroky: {
                                name: "actPripadKroky",
                                caption: "Detail vymáhání",
                                tooltip: "Zobrazení detailu vymáhání",
                                run: () => {
                                    var row = that.gridPredchoziKrokyVym.ggrid("activeRow");
                                    if (row != undefined) {
                                        that.navigate("Gordic.Ddp.WebClient.GDetailVymahani", {
                                            ixpNvy: row.ixp_nvy
                                        });
                                    }
                                }
                            },
                            actPripadNaslKroky: {
                                name: "actPripadNaslKroky",
                                caption: "Detail vymáhání",
                                tooltip: "Zobrazení detailu vymáhání",
                                run: () => {
                                    var row = that.gridNasledujiciKrokyVym.ggrid("activeRow");
                                    if (row != undefined) {
                                        that.navigate("Gordic.Ddp.WebClient.GDetailVymahani", {
                                            ixpNvy: row.ixp_nvy
                                        });
                                    }
                                }
                            },
                            actPridatSlo: {
                                name: "actPridatSlo",
                                caption: "Přidat",
                                tooltip: "Přidat složku vymáháné částky",
                                run: () => {
                                    that.pridatSlozkyVymCastky();
                                }
                            },
                            actUpravitSlo: {
                                name: "actUpravitSlo",
                                caption: "Upravit",
                                tooltip: "Upravit složky",
                                run: () => {
                                    that.upravitSlozkyVymCastky();
                                }
                            },
                            actZrusitSlo: {
                                name: "actZrusitSlo",
                                caption: "Zrušit",
                                tooltip: "Zrušit složky",
                                run: () => {
                                    that.zrusitSlozkyVymCastky();
                                }
                            },
                            actObnovitSlo: {
                                name: "actObnovitSlo",
                                caption: "Obnovit",
                                tooltip: "Obnovit složky",
                                run: () => {
                                    that.obnovitSlozkyVymCastky();
                                }
                            },
                            actPripadSlo: {
                                name: "actPripadSlo",
                                caption: "Případ",
                                tooltip: "Otevřít detail případu DDP",
                                run: () => {
                                    var row = that.gridSlozkyVymCastky.ggrid("activeRow");
                                    if (row != undefined) {
                                        //? je tady nutný mít typ_phl na vstupu pro otevření detailu případu ?
                                        WebClient.Common.Pripady.openPripadDetail(this, row.ixp_ddp);
                                        //that.navigate(
                                        //    "Gordic.Ddp.WebClient.GPripadDetail",
                                        //    {
                                        //        ID: "DDPGPripadDetail#",
                                        //        Ixp: row.ixp_ddp,
                                        //        TypPhl: row.typ_phl
                                        //    }
                                        //);
                                    }
                                }
                            }
                        },
                        tabGroups: [
                            { id: "zakladniInfoGroup", caption: "Základní informace" },
                            { id: "ostatniVymGroup", caption: "Ostatní vymáhání na případu DDP" },
                            { id: "zasilkyGroup", caption: "Zásilky" },
                            { id: "dilciVymahaniGroup", caption: "Dílčí vymáhání" },
                            { id: "predchoziKrokyVymGroup", caption: "Předchozí kroky vymáhání" },
                            { id: "nasledujiciKrokyVymGroup", caption: "Následující kroky vymáhání" },
                            { id: "slozkyVymCastkyGroup", caption: "Složky vymáhané částky" }
                        ],
                        tabs: [
                            {
                                init: (el) => { that.createFormVymahanaCastka(el); },
                                tabParams: {
                                    id: "vymahanaCastkaTab", title: "Vymáhaná částka",
                                    opened: true,
                                    group: {
                                        id: "zakladniInfoGroup"
                                    }
                                }
                            },
                            {
                                init: (el) => { that.createFormBasicInfo(el); },
                                tabParams: {
                                    id: "zakladniInfoTab", title: "",
                                    opened: true,
                                    group: {
                                        id: "zakladniInfoGroup"
                                    }
                                }
                            },
                            {
                                init: (el) => { that.createFormZasilka(el); },
                                tabParams: {
                                    id: "zasilkaTab", title: "Zásilka",
                                    opened: true,
                                    group: {
                                        id: "zakladniInfoGroup"
                                    }
                                }
                            },
                            {
                                init: (el) => { that.createFormOstatniVym(el); },
                                tabParams: {
                                    id: "ostatniVymahaniTab", title: "",
                                    opened: true,
                                    group: {
                                        id: "ostatniVymGroup"
                                    },
                                    menuBar: [
                                        "actPripadOstatni*"
                                    ],
                                    open: () => {
                                        that.beginOperation({ id: "loadOstatniVym", text: "Načítání dat (Ostatní vymáhání)" });
                                        var filter = {};
                                        filter.ixp = that.model.ixp_ddp;
                                        filter.ixp_nvy = that.ixpNvy;
                                        that.isl.VymahaniDDP.listOstatniVymahani(() => {
                                            return {
                                                filters: filter
                                            };
                                        }).get().done(function (dto) {
                                            var view = new Gordic.Data.View(dto.data);
                                            that.gridOstatniVym.ggrid("setData", view);
                                        }).always(() => {
                                            that.endOperation({ id: "loadOstatniVym" });
                                        });
                                    }
                                }
                            },
                            {
                                init: (el) => { that.createFormZasilky(el); },
                                tabParams: {
                                    id: "zasilkyTab", title: "",
                                    opened: true,
                                    group: {
                                        id: "zasilkyGroup"
                                    },
                                    menuBar: [
                                        "actDetailZas*"
                                    ],
                                    open: () => {
                                        that.beginOperation({ id: "loadZasilky", text: "Načítání dat (Zásilky)" });
                                        var filter = {};
                                        filter.ixp = that.model.ixp_ddp;
                                        filter.ixp_nvy = that.ixpNvy;
                                        that.isl.VymahaniDDP.listZasilky(() => {
                                            return {
                                                filters: filter
                                            };
                                        }).get().done(function (dto) {
                                            var view = new Gordic.Data.View(dto.data);
                                            that.gridZasilky.ggrid("setData", view);
                                        }).always(() => {
                                            that.endOperation({ id: "loadZasilky" });
                                        });
                                    }
                                }
                            },
                            {
                                init: (el) => { that.createFormDilciVymahani(el); },
                                tabParams: {
                                    id: "dilciVymahaniTab", title: "",
                                    opened: true,
                                    group: {
                                        id: "dilciVymahaniGroup"
                                    },
                                    menuBar: [
                                        "actZobrazitNap*",
                                        "actNavazatNap*",
                                        "actZrusitVazbuNap*"
                                    ],
                                    open: () => {
                                        that.loadDilciVymahani();
                                    }
                                }
                            },
                            {
                                init: (el) => { that.createFormPredchoziKrokyVym(el); },
                                tabParams: {
                                    id: "predchoziKrokyVymTab", title: "",
                                    opened: true,
                                    group: {
                                        id: "predchoziKrokyVymGroup"
                                    },
                                    menuBar: [
                                        "actNavazat*",
                                        "actZrusitVazbu*",
                                        "actObnovitVazbu*",
                                        "actPripadKroky*"
                                    ],
                                    open: () => {
                                        var filter = {};
                                        filter.ixp = that.model.ixp_ddp;
                                        filter.ixp_nvy = that.ixpNvy;
                                        filter.zobrazit_zrusene = that.findForms("zruseneFormPredVym").findFields("zobrazit_zrusene").gfield("getValue");
                                        that.loadPredchoziVymZrus(filter);
                                    }
                                }
                            },
                            {
                                init: (el) => { that.createFormNasledujiciKrokyVym(el); },
                                tabParams: {
                                    id: "nasledujiciKrokyVymTab", title: "",
                                    opened: true,
                                    group: {
                                        id: "nasledujiciKrokyVymGroup"
                                    },
                                    menuBar: [
                                        "actPripadNaslKroky*"
                                    ],
                                    open: () => {
                                        var filter = {};
                                        filter.ixp = that.model.ixp_ddp;
                                        filter.ixp_nvy = that.ixpNvy;
                                        filter.zobrazit_zrusene = that.findForms("zruseneFormNaslVym").findFields("zobrazit_zrusene").gfield("getValue");
                                        that.loadNasledujiciVymZrus(filter);
                                    }
                                }
                            },
                            {
                                init: (el) => {
                                    that.createFormSlozkyVymCastky(el);
                                    var filter = {};
                                    filter.zobrazit_zrusene = that.findForms("zruseneFormSlozkyVym").findFields("zobrazit_zrusene").gfield("getValue");
                                    filter.ixp_nvy = that.ixpNvy;
                                    //that.ixpFilter.zobrazit_zrusene = that.findFields("zobrazit_zrusene").gfield("getValue");
                                    that.loadSlozkyVymCastky(filter);
                                },
                                tabParams: {
                                    id: "slozkyVymCastkyTab", title: "",
                                    opened: true,
                                    group: {
                                        id: "slozkyVymCastkyGroup"
                                    },
                                    menuBar: [
                                        "actPridatSlo*",
                                        "actUpravitSlo*",
                                        "actZrusitSlo*",
                                        "actObnovitSlo*",
                                        "actPripadSlo*"
                                    ]
                                }
                            }
                        ],
                        kpis: {
                            kpiPosZmena: {
                                value: that.model.dat_zmena?.toString(),
                                name: "kpiPosZmena",
                                primaryText: "Poslední změna",
                                secondaryText: parseDate(that.model.wflProfil.dat_zmena).toDateString(),
                                meaning: "info",
                                itemTemplate: Gordic.Prefabs.Panels.kpiLastModifiedDocumentsTemplate().itemTemplate,
                            },
                        },
                        statusBar: [
                            {
                                type: "widget",
                                init: function () {
                                    return $("<div>");
                                }
                            },
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarAktivita" }),
                            {
                                id: "statusSeparator0",
                                "type": "separator"
                            },
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarTisk" }),
                            {
                                id: "statusSeparator1",
                                "type": "separator"
                            },
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarVypraveni" }),
                            {
                                id: "statusSeparator2",
                                "type": "separator"
                            },
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarDilciVypocet" }),
                            {
                                id: "statusSeparator3",
                                "type": "separator"
                            },
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarSumaInfo" }),
                        ],
                        menuBar: [
                            [{ id: "menuRedistribuce", caption: "Redistribuce", icon: "gi-redistribuce" },
                                { action: "actPredani", icon: "gi-predat" },
                                { action: "actPrideleni", icon: "gi-pridelit" },
                                { action: "actPrevzeti", icon: "gi-prevzit" },
                            ],
                            "actPodani*",
                            "actHlavni*",
                            "actPripadDDP",
                            "actPridatDoSpisu",
                            "actVyjmoutZeSpisu",
                            "actZalozitSpis",
                            "actStorno",
                            "actTiskVYM"
                        ],
                        sidePanels: [
                            {
                                id: "sidePanelESU",
                                icon: "gi-users",
                                side: "right",
                                leaf: "leafText",
                                caption: "Výběr možných adresátů"
                            }
                        ]
                    });
                }
                // Načte se jako drůhé a onContentReady následovně, seskládání formuláře z vytvořených políček v createHeaderForm
                onDetailBuilderBuild(builder) {
                    var that = this;
                    let formSetup = {};
                    let form = that.createHeaderForm();
                    formSetup[Gordic.Eko.HeaderForm.Sections.Info] = {
                        rows: [
                            form.form.sections[0].rows[0], // Identifikátor vymáhání
                            form.form.sections[0].rows[1], // Značka/ČJ
                            form.form.sections[0].rows[2], // Datum podání
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data1] = {
                        rows: [
                            form.form.sections[1].rows[0], // Identifikátor případu DDP
                            form.form.sections[1].rows[1], // Skupina vymáhání
                            form.form.sections[1].rows[2], // Datum evidence
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data2] = {
                        rows: [
                            form.form.sections[2].rows[0], // Pořadí
                            form.form.sections[2].rows[1], // Zpracovatel
                            form.form.sections[2].rows[2], // Datum generování
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data3] = {
                        rows: [
                            form.form.sections[3].rows[0], // Adresát                
                        ],
                        column: []
                    };
                    // úprava WFL/SSL komponent
                    Gordic.Eko.HeaderForm.setup(builder, formSetup);
                    Gordic.Eko.Detail.changeDetailBuilderWflForEkoDefinitions(builder, that.jePodany ?? false, "menuTiskZL");
                    if (!(that.jePodany)) {
                        // přidá šipky do statusbaru pro posun po seznamu
                        that.listControls_setup({
                            rowToDto: function (gridState) {
                                return [
                                    that.gpc,
                                    {
                                        ixpNvy: gridState.currentRow.data.ixp_nvy,
                                        NasledujiciDetail: true
                                    }
                                ];
                            },
                            nextItemTemplate: "Následující: {ixp_nvy}",
                            prevItemTemplate: "Předchozí: {ixp_nvy}",
                            beforeMove: undefined
                        });
                    }
                }
                // Formulář hlavičky 
                createHeaderForm() {
                    var that = this;
                    let hForm = new Gordic.Forms.Form()
                        //sections![0].rows![x]
                        .addSection()
                        //ROW 0
                        .addRow("Identifikátor")
                        .addField("gstringbox", "w-12", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp_nvy",
                        initialValue: that.ixpNvy,
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        disabled: true
                    })
                        //ROW 1
                        .addRow(that.params.ddp_txt_nvycjt ?? "Značka") // Podmínka if null by nikdy něměla nastat, jelikož to je obstaráno již jinde, ale TS křičí error
                        .addField("gstringbox", "w-12", {
                        name: "cj_vym", // Číslo jednací
                        disabled: true
                    })
                        //ROW 2
                        .addRow("Datum podání")
                        .addField("gdatebox", "w-12", {
                        name: "dat_podani",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        disabled: true
                    });
                    hForm
                        //sections![1].rows![x]
                        .addSection()
                        //ROW 0
                        .addRow("Identifikátor příp. DDP")
                        .addField("gstringbox", "w-12", Gordic.Prefabs.String.ixs(true), {
                        name: "ixp_ddp",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        disabled: true
                    })
                        //ROW 1
                        .addRow("Skupina vymáhání")
                        .addField("gselectbox", "w-12", Gordic.Prefabs.Select.skupinaVymahaniDetail(), {
                        name: "ixs_skv",
                        model: "model.ixs_skv = value.ixs_skv",
                        graphicInput: "hidden",
                        customClass: Gordic.Components.GFieldAssist.ignoreClass,
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        disabled: true,
                        serverFilters: {
                            typ_phl: that.model.typ_phl,
                            ixp_den: that.ixpDen,
                            aktivita: 100,
                            ixs_skv_helper: that.model.ixs_skv
                        },
                        itemTemplate: (data) => {
                            let bg = data?.barva != null ? `background-color: ${WebClient.Common.Base.GetHexColor(data?.barva)};` : "";
                            return `<div style="display: flex; align-items: center;"><div style="${bg} height: 18px; width: 18px; border: 1px solid gray; margin-right: 5px;"></div>${data?.nazev}</div>`;
                        },
                        change: (ev, ctx) => {
                            that.poZmeneSkupiny(ctx);
                        }
                    })
                        //ROW 2
                        .addRow("Datum evidence")
                        .addField("gdatebox", "w-12", {
                        name: "dat_evid",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        disabled: true
                    });
                    hForm
                        //sections![2].rows![x]
                        .addSection()
                        //ROW 0
                        .addRow("Pořadí")
                        .addField("gnumberbox", "w-12", {
                        name: "poradi",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        disabled: true
                    })
                        //ROW 1
                        .addRow("Zpracovatel")
                        .addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                        name: "ixs_fun_akt",
                        model: "model.ixs_fun_akt=value.ixs_fun",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        dropdown: true,
                        disabled: true
                    })
                        //ROW 2
                        .addRow("Datum generování")
                        .addField("gdatebox", {
                        name: "dat_vyst",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        disabled: true
                    });
                    hForm
                        //sections![3].rows![x]
                        .addSection()
                        //ROW 0
                        .addRow("Adresát")
                        .addField("gselectbox", "w-12", {
                        name: "ixs_esu",
                        disabled: true,
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        model: "ixs_esu=ixs_esu;esu_dic=dic;model.lic=value.lic;model.por_zast=value.por_zast"
                    }, Gordic.Esu.Prefabs.vyberEsu({
                        typ: Gordic.Esu.Globals.Enums.TypZobrazeniKaroteka.SelectEsu, // přidání prefabu                       
                        Logovani: {
                            Ixp: that.ixpNvy ?? "", // zadání logovacích údaju je nutnost hlavně IXP
                            DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniEsuVHledani, // vybrat z enumu
                            AktZnacka: that.ixpNvy,
                            DuvodHledaniTxt: "Detail vymáhání"
                        },
                    }));
                    return hForm;
                }
                onContentReady() {
                    const that = this;
                    that.title = `Detail vymáhání - ${that.ixpNvy}`;
                    that.taskId = "actGVymahani";
                    that.beginOperation({ id: "loadDocument", text: "Načítání dokumentu..." });
                    that.nastaveniFormularu();
                    that.nastaveniStatusBaru();
                    that.nabidkaESU();
                    that.endOperation({ id: "loadDocument" });
                    that.nastaveniEditace();
                    if (that.savePredTiskem) {
                        that.savePredTiskem = false;
                        that.ulozeniPredTiskemPromise.resolve();
                    }
                    // Sledování změn ve formulářích (dokument) pro povolení uložení, pokud se jedná o needitovatelný případ
                    that.findForms("formHeader").gform("waitForValues").done(function () {
                        var editace = that.jeDokladEditovatelny() && !that.rezimCteni;
                        if (!editace) {
                            that.element.on("fieldchange", function (ev, ctx) {
                                const formChanged = that.findForms().gform("hasChanged");
                                that.actions.actSave.updatePermission((formChanged || editace ? { value: true } : (that.model.Permissions ? that.model.Permissions.LzeEvidovat : undefined)));
                            });
                        }
                    });
                }
                /** Naplnění a nastavení formulářů modelem */
                nastaveniFormularu() {
                    var that = this;
                    const stavVymField = that.findFields("stav_vym");
                    stavVymField.gfield("option", "serverFilters", { ixs_skv: that.model.ixs_skv });
                    that.findForms("formHeader").findFields().gfield("model", "apply", that.model, { initialValues: true });
                    that.findForms("formBasicInfo").findFields().gfield("model", "apply", that.model, { initialValues: true });
                    that.findForms("formZasilka").findFields().gfield("model", "apply", that.model, { initialValues: true });
                    that.findForms("formVymahanaCastka").findFields().gfield("model", "apply", that.model, { initialValues: true });
                    that.findForms("formPoznamka").findFields().gfield("model", "apply", that.model, { initialValues: true });
                    that.findForms("formBasicInfo").findFields("dat_vym").gfield("setInitial", { start: that.model.dat_od, end: that.model.dat_do });
                    // Jelikož políčko barva je zakomentované - zakomentoval jsem také tyto řádky
                    //let fieldBarva = that.findForms("formHeader").findFields("barva");
                    //fieldBarva.gfield("getButton", "selector").gbutton("updateParams", { visible: false, enabled: false });
                }
                /** Vytvoření akcí pro položky ve command baru */
                createActions() {
                    var that = this;
                    that.actions.addRange({
                        actSave: {
                            name: "actSave",
                            caption: "Uložit",
                            icon: "fa-floppy-o",
                            run: () => {
                                // Načtení dat z formuláře
                                var vym = that.prectiFormular();
                                if (vym != false) {
                                    vym.generovat_cj = 0;
                                    that.kontrolaPoliPredUlozenim(vym);
                                }
                            }
                        },
                        actClose: {
                            name: "actClose",
                            caption: "Zavřít",
                            icon: "gi-window-close",
                            run: () => {
                                that.close();
                            }
                        },
                        actSaveGen: {
                            name: "actSaveGen",
                            caption: `Generovat a uložit (${this.params.ddp_txt_nvycjt})`, // možná není implementováno
                            run: () => {
                                // Načtení dat z formuláře
                                var vym = that.prectiFormular();
                                if (vym != false) {
                                    vym.generovat_cj = 1;
                                    that.kontrolaPoliPredUlozenim(vym);
                                }
                            }
                        }
                    });
                }
                //#region Statusbar
                /** Funkce která volá definice jednotlivých položek status baru */
                nastaveniStatusBaru() {
                    var that = this;
                    that.statusStavDokumentu();
                    that.statusDilciVypocet();
                }
                /** Nastavení stavu dokumentu do status baru (aktivita, příznak tisku, vypravení */
                statusStavDokumentu() {
                    var that = this;
                    var defaultType = Gordic.Eko.Utils.RecordFormatType.Neprecteno.toString();
                    var s_tis = that.model.s_tis;
                    switch (s_tis) {
                        case 5:
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarTisk"], "Připraveno k tisku", defaultType);
                            break;
                        case 10:
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarTisk"], "Vytištěno", defaultType);
                            break;
                        default:
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarTisk"], "Nevytištěno", defaultType);
                            break;
                    }
                    var dat_vyp = that.model.dat_vyp;
                    var textDatVyp;
                    if (dat_vyp == null)
                        textDatVyp = "Odesláno";
                    else
                        textDatVyp = "Neodesláno";
                    Gordic.Eko.Detail.StatusBar.updateItem(this.statuses["statusBarVypraveni"], textDatVyp, defaultType);
                    var aktivita = that.model.aktivita;
                    switch (aktivita) {
                        case 500:
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarAktivita"], "Neaktivní", "ggrid-condf-text-gray");
                            break;
                        case 900:
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarAktivita"], "Zrušen", "ggrid-condf-text-purple");
                            break;
                        default:
                            Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarAktivita"], "Aktivní", defaultType);
                            break;
                    }
                }
                /** Nastavení dílčího výpočtu do status baru */
                statusDilciVypocet() {
                    var that = this;
                    var dilciVypocet = that.model.dilci_vypocet;
                    var ixpNvyNad = that.model.ixp_nvy_nad; // nadřazené vymáhání
                    var ixpNvy = that.model.ixp_nvy;
                    var zprava;
                    if (dilciVypocet) {
                        zprava = ixpNvy !== ixpNvyNad
                            ? `Tento záznam o vymáhání je součást sloučeného vymahání (${ixpNvyNad})!`
                            : "Tento záznam o vymáhání je dílčím výpočtem pro vymahání přes více let!";
                        Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarDilciVypocet"], zprava, "ggrid-condf-text-green");
                    }
                    else {
                        // Pokud není dílčí výpočet, tak se odstraní status bar (aby to bylo čisté)
                        that.find('[data-param-id="statusSeparator3"]').remove();
                        that.find('[data-param-id="statusBarDilciVypocet"]').remove();
                    }
                    // Nastaví se zda je 'Hlavní' přístupná
                    const isEnabled = ixpNvy !== ixpNvyNad;
                    that.actions.actHlavni?.enabled(isEnabled);
                }
                /** Nastavení informace sumy do status baru */
                statusSumaInfo(sumaVym) {
                    var that = this;
                    var cVym = that.model.c_vym;
                    var zprava = "";
                    if (sumaVym != 0 && sumaVym != cVym) {
                        zprava = "Nesouhlasí celková částka a částka položek vymáhání!";
                    }
                    Gordic.Eko.Detail.StatusBar.updateItem(that.statuses["statusBarSumaInfo"], zprava, "ggrid-condf-text-red");
                }
                //#endregion
                //#region Externí subjekty
                addPanel(form, dto) {
                    var that = this;
                    form.addField("gbasepanel", {
                        itemTemplate: Gordic.Prefabs.Panels.kpiIconTwoRowsTextTemplate().itemTemplate,
                        data: new Gordic.Data.View([
                            {
                                detailsDirection: "vertical",
                                primaryText: dto.nazev_esu,
                                secondaryText: dto.ixs_esu
                            }
                        ]),
                        itemaction: (el) => {
                            var vybranyPanel = el.target;
                            var findClass = $(vybranyPanel).find(".important-value"); // zjištění zda selected má classu important-value (je teď vybraná)
                            if (findClass.length == 0) {
                                // Pokud kliknutá položka není již aktivována, tak pokračovat dále
                                var staryVybranyPanel = that.find(".important-value");
                                $(staryVybranyPanel).removeClass("important-value");
                                var primaryText = $(vybranyPanel).find(".g-kpi-multirow-body-primaryText");
                                primaryText.addClass("important-value");
                                that.findFields("ixs_esu").gfield("setInitial", { ixs_esu: dto.ixs_esu });
                            }
                        }
                    });
                    return form;
                }
                nabidkaESU() {
                    var that = this;
                    var modelESU = that.modelESU;
                    let form = new Gordic.Forms.Form({ name: "formESU", layoutDescriptor: "L1M1S1, L-0-12-0, M-0-12-0, S-0-12-0" });
                    var aktualniESU = [];
                    var dotSubVym = [];
                    var dotSubPripDDP = [];
                    var esuDDP = [];
                    var napPrip = [];
                    for (var i = 0; i < modelESU.length; i++) {
                        switch (modelESU[i].poradi) {
                            case 1: // Aktuální ESU
                                aktualniESU.push({
                                    poradi: modelESU[i].poradi,
                                    nazev_esu: modelESU[i].nazev_esu,
                                    ixs_esu: modelESU[i].ixs_esu
                                });
                                break;
                            case 2: // Dotčený subjekt vymáhání
                                dotSubVym.push({
                                    poradi: modelESU[i].poradi,
                                    nazev_esu: modelESU[i].nazev_esu,
                                    ixs_esu: modelESU[i].ixs_esu
                                });
                                break;
                            case 3: // Dotčený subjekt případu DDP
                                dotSubPripDDP.push({
                                    poradi: modelESU[i].poradi,
                                    nazev_esu: modelESU[i].nazev_esu,
                                    ixs_esu: modelESU[i].ixs_esu
                                });
                                break;
                            case 4: // ESU na případu DDP
                                that.esuPripaduDDP = modelESU[i];
                                esuDDP.push({
                                    poradi: modelESU[i].poradi,
                                    nazev_esu: modelESU[i].nazev_esu,
                                    ixs_esu: modelESU[i].ixs_esu
                                });
                                break;
                            case 5: // Napojený případ
                                napPrip.push({
                                    poradi: modelESU[i].poradi,
                                    nazev_esu: modelESU[i].nazev_esu,
                                    ixs_esu: modelESU[i].ixs_esu
                                });
                                break;
                            default:
                                break;
                        }
                    }
                    if (aktualniESU.length != 0) {
                        form.addSection("Aktuální ESU");
                        aktualniESU.forEach((pripad) => {
                            form = that.addPanel(form, pripad);
                        });
                    }
                    if (dotSubVym.length != 0) {
                        form.addSection("Dotčený subjekt vymáhání");
                        dotSubVym.forEach((pripad) => {
                            form = that.addPanel(form, pripad);
                        });
                    }
                    if (dotSubPripDDP.length != 0) {
                        form.addSection("Dotčený subjekt případu DDP");
                        dotSubPripDDP.forEach((pripad) => {
                            form = that.addPanel(form, pripad);
                        });
                    }
                    if (esuDDP.length != 0) {
                        form.addSection("ESU na případu DDP");
                        esuDDP.forEach((pripad) => {
                            form = that.addPanel(form, pripad);
                        });
                    }
                    if (napPrip.length != 0) {
                        form.addSection("Napojený případ");
                        napPrip.forEach((pripad) => {
                            form = that.addPanel(form, pripad);
                        });
                    }
                    var finalForm = $.newDiv()
                        .gform("createFrom", form);
                    that.element.gsidebar("getPanel", "sidePanelESU").empty();
                    that.element.gsidebar("getPanel", "sidePanelESU").append(finalForm);
                    // získání políček v sidePanelu
                    var fieldsESU = that.element.gsidebar("getPanel", "sidePanelESU").find('[name="basePanelItem_0"]');
                    // Nastavení CSS defaultního vybraného ESU
                    $(fieldsESU[0]).find(".g-kpi-multirow-body-primaryText").addClass("important-value");
                }
                //#endregion
                //#region Základní informace
                createFormBasicInfo(el) {
                    var that = this;
                    var neurcenyKrokVymValidator = new Gordic.Validators.Base();
                    neurcenyKrokVymValidator.getMessage = (value) => {
                        return "Není povoleno vybrat neurčený krok vymáhání!";
                    };
                    neurcenyKrokVymValidator.validate = (value) => {
                        var stavVym = value.stav_vym ?? 0;
                        if (stavVym == 0)
                            return false;
                        else
                            return true;
                    };
                    let form = new Gordic.Forms.Form({ name: "formBasicInfo", layoutDescriptor: "L3M2S1, L-12-12-0, M-4-8-0, S-12-12-0" })
                        .addSection()
                        .addRow("Krok vymáhání")
                        .addField("gselectbox", Gordic.Prefabs.Select.stavVymahaniDetail(), {
                        name: "stav_vym",
                        model: "model.stav_vym=value.stav_vym, model.stav_vym_txt=value.stav_vym_txt",
                        disabled: true,
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required(), neurcenyKrokVymValidator],
                        //serverFilters: {
                        //    ixs_skv: new Gordic.Forms.Dependency("ixs_skv", "ixs_skv", true),
                        //    stav_vym: that.model.stav_vym
                        //},
                        change: () => {
                            that.findForms().gform("isValid");
                        }
                    })
                        .addSection()
                        .addRow("Odkaz na vymáhání")
                        .addField("gselectbox", Gordic.Prefabs.Select.DdpcsvyDDP(), {
                        name: "stav_vym_old",
                        model: "model.stav_vym_old = value.stav_vym, model.stav_vym_old_txt=value.stav_vym_txt",
                        disabled: true,
                        serverFilters: {
                            aktivita: 100
                        }
                    })
                        .addSection()
                        .addRow("Interval vymáhání")
                        .addField("gintervalbox", {
                        name: "dat_vym",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        disabled: true
                    });
                    let poznamka = new Gordic.Forms.Form({ name: "formPoznamka", layoutDescriptor: "L-12-12-0, M-12-12-0, S-12-12-0" })
                        .addSection()
                        .addRow("Poznámka")
                        .addField("gstringbox", {
                        name: "poznamka",
                        disabled: true
                    });
                    $.newDiv().appendTo(el).gform("createFrom", form);
                    $.newDiv().appendTo(el).gform("createFrom", poznamka);
                }
                createFormZasilka(el) {
                    var that = this;
                    let form = new Gordic.Forms.Form({ name: "formZasilka", layoutDescriptor: Gordic.Eko.Detail.headerLayoutDescriptor3Cols })
                        .addSection()
                        .addRow("Datum posledního odeslání")
                        .addField("gdatebox", {
                        name: "dat_vyp",
                        disabled: true
                    })
                        .addRow("Datum nabytí právní moci")
                        .addField("gdatebox", {
                        name: "dat_pm",
                        disabled: true,
                        change: () => {
                            that.spoctiDatumy();
                        }
                    })
                        .addSection()
                        .addRow("Stav doručení")
                        .addField("gselectbox", Gordic.Prefabs.Select.ddpcsdo(), {
                        name: "stav_doruc",
                        model: "stav_doruc=stav_doruc",
                        disabled: true,
                        change: (_ev, obj) => {
                            if (obj.value != null && obj.value.stav_doruc == 10) {
                                that.findFields("dat_doruc").gfield("setValidators", [new Gordic.Validators.Required()]);
                                that.findForms().gform("isValid");
                            }
                            else {
                                that.findFields("dat_doruc").gfield("setValidators", []);
                            }
                        }
                    })
                        .addRow("Datum vykonatelnosti")
                        .addField("gdatebox", {
                        name: "dat_vykon",
                        disabled: true,
                        change: () => {
                            that.spoctiDatumy();
                        }
                    })
                        .addSection()
                        .addRow("Datum doručení")
                        .addField("gdatebox", {
                        name: "dat_doruc",
                        disabled: true,
                        change: () => {
                            that.spoctiDatumy();
                        }
                    })
                        .addRow("Datum promlčení")
                        .addField("gdatebox", {
                        name: "dat_prom",
                        disabled: true
                    });
                    $.newDiv().appendTo(el).gform("createFrom", form);
                }
                createFormVymahanaCastka(el) {
                    var that = this;
                    var nulovaCastkaValidator = new Gordic.Validators.Base();
                    nulovaCastkaValidator.getMessage = () => {
                        return "Na vybraném kroku vymáhání není dovoleno nulové vymáhání!";
                    };
                    nulovaCastkaValidator.validate = (value) => {
                        if (value == 0) {
                            var paramValue = that.params.ddp_vym_povnul ?? "96";
                            var paramList = paramValue.toString().split(',');
                            var stavVymField = that.findFields("stav_vym").gfield("getValue");
                            if (stavVymField == null)
                                return false;
                            var stavVym = stavVymField.stav_vym;
                            if (!paramList.includes(stavVym.toString()))
                                return false;
                        }
                        return true;
                    };
                    let form = new Gordic.Forms.Form({ name: "formVymahanaCastka", layoutDescriptor: Gordic.Eko.Detail.headerLayoutDescriptor3Cols })
                        .addSection()
                        .addRow("Celková částka vymáhání")
                        .addField("gnumberbox", {
                        name: "c_vym",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required(), nulovaCastkaValidator],
                        disabled: true,
                        change: () => {
                            that.findForms().gform("isValid");
                            that.spocitejCastkyVymahani();
                        }
                    })
                        .addRow("Částka/Procento penále")
                        .addField("gnumberbox", "w-6", {
                        name: "c_pen",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        disabled: true,
                        change: () => {
                            that.spocitejCastkyVymahani();
                        }
                    })
                        .addField("gnumberbox", "w-6", {
                        name: "proc_pen",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        disabled: true
                    })
                        .addSection()
                        .addRow("Vymáhaná částka")
                        .addField("gnumberbox", {
                        name: "c_vym_zak",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        disabled: true,
                        change: () => {
                            that.spocitejCelkovouCastkyVymahani();
                        }
                    })
                        .addRow("Částka pokuty")
                        .addField("gnumberbox", {
                        name: "c_pok",
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        disabled: true,
                        change: () => {
                            that.spocitejCastkyVymahani();
                        }
                    })
                        .addSection()
                        .addRow("Náklady řízení")
                        .addField("gnumberbox", {
                        name: "c_nak_riz",
                        disabled: true,
                        change: () => {
                            that.spocitejCastkyVymahani();
                        }
                    })
                        .addRow("Náklady exekuce")
                        .addField("gnumberbox", {
                        name: "c_exe",
                        disabled: true,
                        change: () => {
                            that.spocitejCastkyVymahani();
                        }
                    });
                    $.newDiv().appendTo(el).gform("createFrom", form);
                }
                //#endregion
                //#region Ostatní vymáhání na případu DDP
                createFormOstatniVym(el) {
                    var that = this;
                    that.gridOstatniVym = $.newDiv().appendTo(el).gautofit({ resizersOnTab: false })
                        .ggrid({
                        defaultProfile: {
                            rowNumbers: false,
                            name: "Výchozí pohled", _locked: true, _default: true,
                            condFormats: [
                                { description: "Neaktivní", formula: "IF(NOT(ISBLANK(@eko_akt)) and @eko_akt == 500, true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.gray },
                                { description: "Zrušen", formula: "IF(NOT(ISBLANK(@eko_akt)) and @eko_akt == 900, true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.purple }
                            ]
                        },
                        multi: false,
                        columnMode: "full",
                        name: "gridOstatniVym",
                        columns: WebClient.Common.GridFormats.OstatniVymahaniDDP()
                    }).ggridrowscalc();
                }
                //#endregion
                //#region Zásilky
                createFormZasilky(el) {
                    var that = this;
                    that.gridZasilky = $.newDiv().appendTo(el).gautofit({ resizersOnTab: false })
                        .ggrid({
                        defaultProfile: {
                            rowNumbers: false,
                            name: "Výchozí pohled", _locked: true, _default: true,
                            condFormats: [
                                { description: "Dorucene", formula: "IF(@s_dor > 0, true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.blue },
                                { description: "Storno", formula: "IF(@s_dor == 90, true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.red }
                            ]
                        },
                        multi: false,
                        columnMode: "full",
                        name: "gridZasilky",
                        columns: WebClient.Common.GridFormats.ZasilkyVymahani()
                    });
                }
                //#endregion
                //#region Dílčí vymáhání (napojené)
                createFormDilciVymahani(el) {
                    var that = this;
                    that.gridDilciVymahani = $.newDiv().appendTo(el).gautofit({ resizersOnTab: false })
                        .ggrid({
                        defaultProfile: {
                            rowNumbers: false,
                            name: "Výchozí pohled", _locked: true, _default: true,
                            condFormats: [
                                { description: "Neaktivní", formula: "IF(NOT(ISBLANK(@aktivita)) and @aktivita == 500, true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.gray },
                                { description: "Zrušen", formula: "IF(NOT(ISBLANK(@aktivita)) and @aktivita == 900, true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.purple }
                            ]
                        },
                        multi: false,
                        columnMode: "full",
                        name: "gridDilciVymahani",
                        columns: WebClient.Common.GridFormats.DilciVymahaniDDP()
                    }).ggridrowscalc();
                }
                //#endregion
                //#region Předchozí kroky vymáhání
                createFormPredchoziKrokyVym(el) {
                    var that = this;
                    let zrusene = new Gordic.Forms.Form({ name: "zruseneFormPredVym", layoutDescriptor: "L-0-2-0, M-0-12-0, S-0-12-0" })
                        .addRow()
                        .addField("gcheck", {
                        name: "zobrazit_zrusene",
                        label: "Zobrazit zrušené",
                        change: (_ev, val) => {
                            var filter = {};
                            filter.ixp = that.model.ixp_ddp;
                            filter.ixp_nvy = that.ixpNvy;
                            filter.zobrazit_zrusene = val.value;
                            that.loadPredchoziVymZrus(filter);
                        }
                    });
                    $.newDiv().appendTo(el).gform("createFrom", zrusene);
                    that.gridPredchoziKrokyVym = $.newDiv().appendTo(el).gautofit({ resizersOnTab: false })
                        .ggrid({
                        defaultProfile: {
                            rowNumbers: false,
                            name: "Výchozí pohled", _locked: true, _default: true,
                            condFormats: [
                                { description: "Neaktivní", formula: "IF(NOT(ISBLANK(@aktivita)) and @aktivita == 500, true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.gray },
                                { description: "Zrušen", formula: "IF(NOT(ISBLANK(@aktivita)) and @aktivita == 900, true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.purple },
                                { description: "Datum posledního odeslání", formula: "IF(NOT(ISBLANK(@dat_vyp)), true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.blue }
                            ]
                        },
                        multi: false,
                        columnMode: "full",
                        name: "gridPredchoziKrokyVym",
                        columns: WebClient.Common.GridFormats.PredchoziKrokyVymahani()
                    }).ggridrowscalc();
                }
                loadPredchoziVymZrus(ixpFilter) {
                    var that = this;
                    that.beginOperation({ id: "loadPrechoziVymZrus", text: "Načítání dat (Předchozí kroky vymáhání)" });
                    that.isl.VymahaniDDP.listPredKrokyVym(() => {
                        return {
                            filters: ixpFilter
                        };
                    }).get().done(function (dto) {
                        var view = new Gordic.Data.View(dto.data);
                        that.gridPredchoziKrokyVym.ggrid("setData", view);
                    }).always(() => {
                        that.endOperation({ id: "loadPrechoziVymZrus" });
                    });
                }
                //#endregion
                //#region Následující kroky vymáhání (napojené)
                createFormNasledujiciKrokyVym(el) {
                    var that = this;
                    let zrusene = new Gordic.Forms.Form({ name: "zruseneFormNaslVym", layoutDescriptor: "L-0-2-0, M-0-12-0, S-0-12-0" })
                        .addRow()
                        .addField("gcheck", {
                        name: "zobrazit_zrusene",
                        label: "Zobrazit zrušené",
                        change: (_ev, val) => {
                            var filter = {};
                            filter.ixp = that.model.ixp_ddp;
                            filter.ixp_nvy = that.ixpNvy;
                            filter.zobrazit_zrusene = val.value;
                            that.loadNasledujiciVymZrus(filter);
                        }
                    });
                    $.newDiv().appendTo(el).gform("createFrom", zrusene);
                    that.gridNasledujiciKrokyVym = $.newDiv().appendTo(el).gautofit({ resizersOnTab: false })
                        .ggrid({
                        defaultProfile: {
                            rowNumbers: false,
                            name: "Výchozí pohled", _locked: true, _default: true,
                            condFormats: [
                                { description: "Neaktivní", formula: "IF(NOT(ISBLANK(@aktivita)) and @aktivita == 500, true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.gray },
                                { description: "Zrušen", formula: "IF(NOT(ISBLANK(@aktivita)) and @aktivita == 900, true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.purple },
                                { description: "Datum posledního odeslání", formula: "IF(NOT(ISBLANK(@dat_vyp)), true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.blue }
                            ]
                        },
                        multi: false,
                        columnMode: "full",
                        name: "gridNasledujiciKrokyVym",
                        columns: WebClient.Common.GridFormats.PredchoziKrokyVymahani()
                    }).ggridrowscalc();
                }
                loadNasledujiciVymZrus(ixpFilter) {
                    var that = this;
                    that.beginOperation({ id: "loadNasledujiciVymZrus", text: "Načítání dat (Následující kroky vymáhání)" });
                    that.isl.VymahaniDDP.listNaslKrokyVym(() => {
                        return {
                            filters: ixpFilter
                        };
                    }).get().done(function (dto) {
                        var view = new Gordic.Data.View(dto.data);
                        that.gridNasledujiciKrokyVym.ggrid("setData", view);
                    }).always(() => {
                        that.endOperation({ id: "loadNasledujiciVymZrus" });
                    });
                }
                //#endregion
                //#region Složky vymáhané částky
                createFormSlozkyVymCastky(el) {
                    var that = this;
                    let zrusene = new Gordic.Forms.Form({ name: "zruseneFormSlozkyVym", layoutDescriptor: "L-0-2-0, M-0-12-0, S-0-12-0" })
                        .addRow()
                        .addField("gcheck", {
                        name: "zobrazit_zrusene",
                        label: "Zobrazit zrušené",
                        change: (_ev, val) => {
                            var filter = {};
                            filter.ixp = that.model.ixp_ddp;
                            filter.ixp_nvy = that.ixpNvy;
                            filter.zobrazit_zrusene = val.value;
                            that.loadSlozkyVymCastky(filter);
                        }
                    });
                    $.newDiv().appendTo(el).gform("createFrom", zrusene);
                    that.gridSlozkyVymCastky = $.newDiv().appendTo(el).gautofit({ resizersOnTab: false })
                        .ggrid({
                        defaultProfile: {
                            rowNumbers: false,
                            name: "Výchozí pohled", _locked: true, _default: true,
                            condFormats: [
                                { description: "Zrušen", formula: "IF(NOT(ISBLANK(@aktivita)) and @aktivita == 900, true, false, false)", text: Gordic.Components.Grid.CondFormats.CondFormatText.purple }
                            ]
                        },
                        multi: false,
                        columnMode: "full",
                        name: "gridSlozkyVymCastky",
                        columns: WebClient.Common.GridFormats.SlozkyVymCastky()
                    }).ggridrowscalc();
                }
                loadSlozkyVymCastky(ixpFilter) {
                    var that = this;
                    that.beginOperation({ id: "loadSlozkyVymCastky", text: "Načítání dat (Složky vymáhané částky)" });
                    that.isl.VymahaniDDP.listSlozkyVymCastky(() => {
                        return {
                            filters: ixpFilter
                        };
                    }).get().done(function (dto) {
                        var view = new Gordic.Data.View(dto.data);
                        that.gridSlozkyVymCastky.ggrid("setData", view);
                        that.slozkyVymCastky = dto.data;
                        var sumaVym;
                        if (dto.data.length != 0) {
                            sumaVym = dto.data[0].suma_vym ?? 0;
                        }
                        else {
                            sumaVym = 0;
                        }
                        that.statusSumaInfo(sumaVym);
                    }).always(() => {
                        that.endOperation({ id: "loadSlozkyVymCastky" });
                    });
                }
                //#endregion
                //#region Nastavení editace políček
                nastaveniEditace() {
                    var that = this;
                    var def = $.Deferred();
                    var vym = that.model;
                    var jeEditovatelny = false;
                    if (that.jeDokladEditovatelny() && !that.rezimCteni)
                        jeEditovatelny = true;
                    var jeUzamceny = that.jeUzamcenaEditace();
                    var jePodany = vym.c_vym == 0; // Dokud je částka vymáhání 0, tak je jakoby podaný a může se editovat
                    that.editaceCJ();
                    // Nastaveni předání a přidělení
                    if (vym.aktivita != 900) {
                        if (vym.ixs_fun_akt == that.ixsFun) {
                            that.actions.actPredani?.enabled(true);
                            that.actions.actPrideleni?.enabled(true);
                            that.actions.actPrevzeti?.enabled(false);
                        }
                        else {
                            that.actions.actPredani?.enabled(false);
                            that.actions.actPrideleni?.enabled(false);
                            that.actions.actPrevzeti?.enabled(true);
                        }
                        that.actions.actTiskVYM?.enabled(true);
                    }
                    else {
                        that.actions.actPredani?.enabled(false);
                        that.actions.actPrideleni?.enabled(false);
                        that.actions.actPrevzeti?.enabled(false);
                        that.actions.actTiskVYM?.enabled(false);
                    }
                    that.isl.VymahaniDDP.jePovolenaSkupinaProEditaciSimple({ ixsSkv: vym.ixs_skv, typPhl: vym.typ_phl })
                        .get()
                        .done((result) => {
                        that.nastaveniEditacePolicek(jePodany, jeEditovatelny, jeUzamceny, result);
                    });
                    //#region Nastavení editace akcí v headeru
                    if (that.params.ddp_rad_dokpov != 1)
                        that.actions.actPodani?.enabled(false);
                    // Nastavení aktivity tlačítek pro práci se spisem
                    that.actions.actPridatDoSpisu?.enabled(false);
                    that.actions.actVyjmoutZeSpisu?.enabled(false);
                    that.actions.actZalozitSpis?.enabled(false);
                    // Pokud můžu vymáhat přes SSL a není to dilčí výpočet - zpřístupním tlačítka SSL
                    var jeAktivniVymahaniPresSSL = (Number(that.params.ddp_gen_sslspi ?? 0) > 0 || Number(that.params.ddp_ssl_jedspi ?? 0) > 0) && Number(that.params.ddp_gen_sslzak ?? 0) > 0;
                    if (jeAktivniVymahaniPresSSL && !vym.dilci_vypocet) {
                        // Je ve spisu - zpřístupním jen info a pokud můžu editovat tak i vyjmutí ze spisu
                        if (vym.wflProfil.ixp_spis != vym.ixp_nvy) {
                            if (jeEditovatelny && !jePodany) {
                                that.actions.actVyjmoutZeSpisu?.enabled(true);
                            }
                        }
                        else {
                            if (jeEditovatelny) {
                                that.isl.VymahaniDDP.spisPripaduNVY({ ixsSkv: vym.ixs_skv, ixpDdp: vym.ixp_ddp, ixpNvy: that.ixpNvy, typPhl: vym.typ_phl })
                                    .get()
                                    .done((result) => {
                                    var ixpSpis = result;
                                    // Není ve spisu, ale skupina vymáhání má spis - umožním pouze přidání
                                    that.actions.actPridatDoSpisu?.enabled(true);
                                    if (!(vym.wflProfil.ixp_spis == vym.ixp_nvy && ixpSpis != vym.ixp_nvy)) {
                                        that.actions.actZalozitSpis?.enabled(true);
                                    }
                                });
                            }
                        }
                    }
                    // Tlačítko storno
                    var vymdel = that.params.ddp_rad_vymdel ?? 0;
                    if (vymdel == 0 || (vymdel == 1 && vym.ixs_fun_akt != that.ixsFun) || vym.aktivita == 900) {
                        that.actions.actStorno?.enabled(false);
                    }
                    else {
                        that.actions.actStorno?.enabled(true);
                    }
                    if (that.params.ddp_rad_vymprd != 1)
                        that.actions.actPrideleni?.enabled(false);
                    if (that.params.ddp_rad_vympre != 1)
                        that.actions.actPredani?.enabled(false);
                    if (that.params.ddp_rad_vympri != 1)
                        that.actions.actPrevzeti?.enabled(false);
                    if (that.zakazanaRedist) {
                        that.actions.actPrideleni?.enabled(false);
                        that.actions.actPredani?.enabled(false);
                        that.actions.actPrevzeti?.enabled(false);
                    }
                    //#endregion
                    // Sekce složky vymáhání
                    that.isl.VymahaniDDP.typAlgZeSkupinyVym({ ixsSkv: vym.ixs_skv })
                        .get()
                        .done((result) => {
                        if (result == 10 && jeEditovatelny && !jePodany) {
                            that.actions.actPridatSlo?.enabled(true);
                            that.actions.actUpravitSlo?.enabled(true);
                            that.actions.actZrusitSlo?.enabled(true);
                            that.actions.actObnovitSlo?.enabled(true);
                            that.actions.actPripadSlo?.enabled(true);
                        }
                        else {
                            that.actions.actPridatSlo?.enabled(false);
                            that.actions.actUpravitSlo?.enabled(false);
                            that.actions.actZrusitSlo?.enabled(false);
                            that.actions.actObnovitSlo?.enabled(false);
                            that.actions.actPripadSlo?.enabled(false);
                        }
                    });
                    that.zmenPriznakEditace();
                    return def;
                }
                /**
                 * Samotné nastavení přístupu k políčkám (je nutno pustit až po získání 'povolení skupiny')
                 * @param jePodany
                 * @param jeEditovatelny
                 * @param jeUzamceny
                 * @param jePovolenaSkupinaProEditaci
                 */
                nastaveniEditacePolicek(jePodany, jeEditovatelny, jeUzamceny, jePovolenaSkupinaProEditaci) {
                    // nákl ex, nákl říz, skupina vym
                    var that = this;
                    var vym = that.model;
                    var mainForm = that.findForms("formHeader");
                    var vymForm = that.findForms("formVymahanaCastka");
                    var basicForm = that.findForms("formBasicInfo");
                    var zasilkaForm = that.findForms("formZasilka");
                    var poznamkaForm = that.findForms("formPoznamka");
                    if (jeEditovatelny && !jeUzamceny && jePovolenaSkupinaProEditaci) {
                        if (that.params.ddp_rad_edidpr == 1)
                            zasilkaForm.findFields("dat_prom").gfield("enable");
                        zasilkaForm.findFields("dat_doruc").gfield("enable");
                        zasilkaForm.findFields("dat_pm").gfield("enable");
                        zasilkaForm.findFields("dat_vykon").gfield("enable");
                        zasilkaForm.findFields("stav_doruc").gfield("enable");
                        basicForm.findFields("dat_vym").gfield("enable");
                        basicForm.findFields("stav_vym").gfield("enable");
                        basicForm.findFields("stav_vym_old").gfield("enable");
                        poznamkaForm.findFields("poznamka").gfield("enable");
                        if (jePodany || that.params.ddp_rad_vymeds != 0)
                            mainForm.findFields("ixs_skv").gfield("enable");
                        else
                            mainForm.findFields("ixs_skv").gfield("disable");
                        if (jePodany || that.params.ddp_vym_edicst == 1) {
                            vymForm.findFields("c_vym").gfield("enable");
                            vymForm.findFields("c_pen").gfield("enable");
                            vymForm.findFields("c_pok").gfield("enable");
                            vymForm.findFields("c_exe").gfield("enable");
                            vymForm.findFields("c_nak_riz").gfield("enable");
                            vymForm.findFields("proc_pen").gfield("enable");
                            vymForm.findFields("c_vym_zak").gfield("enable");
                        }
                        else {
                            vymForm.findFields("c_vym").gfield("disable");
                            vymForm.findFields("c_pen").gfield("disable");
                            vymForm.findFields("c_pok").gfield("disable");
                            vymForm.findFields("c_exe").gfield("disable");
                            vymForm.findFields("c_nak_riz").gfield("disable");
                            vymForm.findFields("proc_pen").gfield("disable");
                            vymForm.findFields("c_vym_zak").gfield("disable");
                        }
                        if (jePodany || that.params.ddp_rad_vymdtp == 1)
                            mainForm.findFields("dat_vyst").gfield("enable");
                        else
                            mainForm.findFields("dat_vyst").gfield("disable");
                    }
                    else {
                        if (vym.aktivita != 900 && vym.ixs_fun_akt == that.ixsFun && jePovolenaSkupinaProEditaci) {
                            if (that.params.ddp_rad_edidpr == 1)
                                zasilkaForm.findFields("dat_prom").gfield("enable");
                            zasilkaForm.findFields("dat_doruc").gfield("enable");
                            zasilkaForm.findFields("dat_pm").gfield("enable");
                            zasilkaForm.findFields("dat_vykon").gfield("enable");
                            zasilkaForm.findFields("stav_doruc").gfield("enable");
                            poznamkaForm.findFields("poznamka").gfield("enable");
                        }
                        else {
                            that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                            zasilkaForm.findFields("dat_prom").gfield("disable");
                            zasilkaForm.findFields("dat_doruc").gfield("disable");
                            zasilkaForm.findFields("dat_pm").gfield("disable");
                            zasilkaForm.findFields("dat_vykon").gfield("disable");
                            zasilkaForm.findFields("stav_doruc").gfield("disable");
                            poznamkaForm.findFields("poznamka").gfield("disable");
                        }
                        mainForm.findFields("cj_vym").gfield("disable");
                        basicForm.findFields("dat_vym").gfield("disable");
                        vymForm.findFields("c_vym").gfield("disable");
                        mainForm.findFields("dat_vyst").gfield("disable");
                        vymForm.findFields("c_nak_riz").gfield("disable");
                        vymForm.findFields("proc_pen").gfield("disable");
                        vymForm.findFields("c_pen").gfield("disable");
                        vymForm.findFields("c_pok").gfield("disable");
                        basicForm.findFields("stav_vym").gfield("disable");
                        basicForm.findFields("stav_vym_old").gfield("disable");
                        mainForm.findFields("ixs_skv").gfield("disable");
                        vymForm.findFields("c_exe").gfield("disable");
                        vymForm.findFields("c_vym_zak").gfield("disable");
                    }
                }
                /**
                 * Kontrola zda je případ vůbec editovatelný
                 * @returns
                 */
                jeDokladEditovatelny() {
                    var that = this;
                    // Parametr určí zda uživatel může nebo nemůže měnit a evidovat vymáhání DDP
                    var paramDokevv = that.params.ddp_rad_dokevv;
                    // Pokud parametr není 1 nebo 2 tak nelze editovat
                    if (paramDokevv != 1 && paramDokevv != 2)
                        return false;
                    // Pokud je případ aktivní a vlastní (pouze pokud je nutno kontrolovat vlastnictví (param je 2)) lze editovat
                    return (that.model.aktivita != 900 &&
                        (that.model.ixs_fun_akt == that.ixsFun || paramDokevv == 2));
                }
                /**
                 * Kontrola zda je uzamčená editace
                 * @returns
                 */
                jeUzamcenaEditace() {
                    var that = this;
                    // Stav při kterém se stane vymáhací dokument needitovatelný
                    var paramStazam = that.params.ddp_vym_stazam;
                    if (paramStazam == 1 && that.model.s_tis > 5)
                        return true; // vytisknutý
                    if (paramStazam == 2 && that.model.dat_vyp != null)
                        return true; // není odeslán
                    return false;
                }
                /** Zjištění co se může dělat s ČJ */
                editaceCJ() {
                    var that = this;
                    // Určuje zda se má nebo nemá při tisku vymáhání generovat číslo jednací
                    var paramGenecj = that.params.ddp_vym_genecj;
                    // Pokud je generované ČJ pak to disabluju
                    that.findForms("formHeader").findFields("cj_vym").gfield("enable");
                    if (that.model.cj_vym != null && (paramGenecj == 2 || paramGenecj == 3 || paramGenecj == 4)) {
                        that.commandBar(that.actions.createBar(["actSave!", "actClose"]));
                        if (paramGenecj == 3 || paramGenecj == 4) {
                            that.findForms("formHeader").findFields("cj_vym").gfield("disable");
                        }
                    }
                    else {
                        that.commandBar(that.actions.createBar(["actSave!", "actSaveGen", "actClose"]));
                    }
                }
                /** Změní příznak editace pro actPodani a actSave a actSaveGen a nastavení formuláře, že byl zmeněnej.
                 *  Zavolá se kdykoliv se něco ve formuláři změní.
                 */
                zmenPriznakEditace() {
                    var that = this;
                    if (that.params.ddp_rad_dokevv == 0) {
                        that.actions.actSave?.enabled(false);
                        that.actions.actSaveGen?.enabled(false);
                        return true;
                    }
                    if (that.jeDokladEditovatelny() && that.model.ixp_nvy.length == 12) {
                        that.actions.actSave?.enabled(true);
                        that.actions.actSaveGen?.enabled(true);
                    }
                    else {
                        that.actions.actSave?.enabled(false);
                        that.actions.actSaveGen?.enabled(false);
                    }
                }
                //#endregion
                //#region Funkce pro jednotlivé akce v menubaru
                /** Vytvoří nové vymáhání */
                noveVymahani() {
                    var that = this;
                    if (that.params.ddp_vym_povskv != "" && that.params.ddp_vym_poeskv == "") {
                        that.showFlash("Není povolena žádná skupina vymáhání pro pořízení vymáhání!", "error");
                    }
                    else {
                        if (that.params.ddp_gen_ixpvym == 0) {
                            // Pokud je parametr nastaven na hodnotu 0, tak manuálně zadáváme identifikátor
                            // (pokud je 1, tak se generuje, ale to je až na serveru)
                            var form = new Gordic.Forms.Form({ name: "wizParams", layoutDescriptor: "L1M1S1 LMS-0-12-0" })
                                .addRow("Identifikátor")
                                .addField("gstringbox", Gordic.Prefabs.String.ixs(true), {
                                name: "ixp",
                                flag: Gordic.Prefabs.Field.Flags.required,
                                validators: [new Gordic.Validators.Required()],
                                initialValue: that.globalSettings?.get(`Global.Wfl.AppSettings.OthersSettings.PredplneniPID`) ?? ""
                            });
                            that.dialogs.simpleForm("Zadání identifikátoru", form)
                                .on("close", (_obj, retVal) => {
                                if (retVal) {
                                    that.model.ixp_nvy = retVal.ixp;
                                    that.podaniVymahani(that.model);
                                }
                            });
                        }
                        else {
                            that.podaniVymahani(that.model);
                        }
                    }
                }
                /**
                 * Podání nového vymáhání
                 * @param data
                 */
                podaniVymahani(data) {
                    var that = this;
                    that.beginOperation({ id: "podaniVymahani", text: "Podání vymáhání" });
                    that.isl.VymahaniDDP.podaniVymahaniDetailVym({ data: data })
                        .get()
                        .done((result) => {
                        that.endOperation({ id: "podaniVymahani" });
                        if (result.length == 12) {
                            that.navigate("Gordic.Ddp.WebClient.GDetailVymahani", {
                                ID: "DDPGDetailVymahani#",
                                ixpNvy: result
                            });
                        }
                        else {
                            that.showFlash("Nepovedlo se podat vymáhání!", "error");
                        }
                    }).fail(() => {
                        that.endOperation({ id: "podaniVymahani" });
                    });
                }
                /**
                 * Přečte data ze všech formulářů a zkontroluje zda jsou všechny povinná pole vyplněna
                 * @returns
                 */
                prectiFormular() {
                    var that = this;
                    let dto = {};
                    // Kontrola zda jsou všechny povinná pole vyplněna
                    const forms = ["formHeader", "formBasicInfo", "formZasilka", "formVymahanaCastka", "formPoznamka"];
                    for (const formName of forms) {
                        that.findForms(formName).findFields().gfield("model", "collect", dto);
                        if (!that.findForms(formName).gform("isValid")) {
                            return false;
                        }
                    }
                    dto.dilci_vypocet = that.model.dilci_vypocet;
                    dto.typ_phl = that.typPhl;
                    var datVym = that.findForms("formBasicInfo").findFields("dat_vym").gfield("getValue");
                    if (datVym.start == null || datVym.end == null) {
                        that.showFlash("Datum vymáhání není vyplněn!", "error");
                        that.findForms("formBasicInfo").findFields("dat_vym").gfield("validate");
                        that.findForms("formBasicInfo").findFields("dat_vym").gfield("focus");
                        return false;
                    }
                    var ixsEsu = that.findForms("formHeader").findFields("ixs_esu").gfield("getValue");
                    if (ixsEsu.ixs_esu == "0000SE00000M") {
                        that.showFlash("Je nutné vybrat platného adresáta!", "error");
                        that.findForms("formHeader").findFields("ixs_esu").gfield("focus");
                        return false;
                    }
                    dto.dat_od = datVym.start;
                    dto.dat_do = datVym.end;
                    return dto;
                }
                /**
                 * Kontrola hodnot v polích před uložením
                 * @param vym
                 */
                kontrolaPoliPredUlozenim(vym) {
                    var that = this;
                    that.beginOperation({ id: "kontrolaPoli", text: "Kontrola polí před uložením" });
                    var editace = that.jeDokladEditovatelny() && !that.rezimCteni;
                    if (editace) {
                        that.isl.VymahaniDDP.jePovolenaSkupinaProEditaciSimple({ ixsSkv: vym.ixs_skv ?? "", typPhl: that.typPhl })
                            .get()
                            .done((isEditable) => {
                            if (isEditable) {
                                that.isl.VymahaniDDP.jePovolenaSkupinaVymahaniProTypPohledavky({ ixsSkv: vym.ixs_skv ?? "", typPhl: that.typPhl })
                                    .get()
                                    .done((isAllowed) => {
                                    if (isAllowed) {
                                        if (vym.ixs_skv == "0000ANV00000") {
                                            that.dialogs.confirmDangerous("Skupina vymáhání", "Je vybrána skupina vymáhání NEURČENO, chcete opravdu pokračovat? \n", 350)
                                                .on("close", (_obj, retVal) => {
                                                if (retVal == "yes") {
                                                    that.ulozVymahani(vym);
                                                }
                                                else
                                                    return false;
                                            });
                                        }
                                        else
                                            that.ulozVymahani(vym);
                                    }
                                    else {
                                        that.showFlash("Skupina vymáhání není povolena pro tento typ pohledávky, záznam o vymáhání nelze uložit!", "error");
                                        return false;
                                    }
                                })
                                    .always(() => {
                                    that.endOperation({ id: "kontrolaPoli" });
                                });
                            }
                            else {
                                that.showFlash("Skupina vymáhání není povolena pro editaci, záznam o vymáhání nelze uložit!", "error");
                                that.endOperation({ id: "kontrolaPoli" });
                                return false;
                            }
                        })
                            .fail(() => {
                            that.showFlash("Chyba při kontrole skupiny vymáhání!", "error");
                            that.endOperation({ id: "kontrolaPoli" });
                            return false;
                        });
                    }
                    else
                        that.ulozVymahani(vym);
                }
                /**
                 * Uložení vymáhání
                 * @param data
                 */
                ulozVymahani(data) {
                    var that = this;
                    var isValid = that.findForms().gform("isValid");
                    if (isValid) {
                        let dokument = undefined;
                        if (!(that.jePodany)) {
                            // dokument
                            dokument = $.extend(true, {}, this.saveEkoProfil(), this.saveSslDetailDoruceniEko ? this.saveSslDetailDoruceniEko() : {});
                            dokument.ixs_typ = dokument.ixs_typ ?? that.model.dokument?.ixs_typ;
                            dokument.nazev = dokument.nazev ?? that.model.dokument?.nazev;
                            dokument.st_utaj_id = dokument.st_utaj_id ?? that.model.dokument?.st_utaj_id;
                            dokument.ixs_fun_akt = dokument.ixs_fun_akt ?? that.model.dokument?.ixs_fun_akt;
                        }
                        data.dokument = dokument;
                        that.beginOperation({ id: "ulozVymahani", text: "Probíhá ukládání vymáhání..." });
                        that.isl.VymahaniDDP.ulozeniVymahani({ data: data })
                            .get()
                            .done((result) => {
                            if (result) {
                                that.load();
                            }
                            else {
                                that.showFlash("Vymáhání se nepodařilo uložit!", "error");
                            }
                        }).always(() => {
                            that.endOperation({ id: "ulozVymahani" });
                        });
                    }
                }
                /**
                * Stornování vymáhání
                * @param data
                */
                stornoVymahani(data) {
                    var that = this;
                    that.beginOperation({ id: "kotrolaStorna", text: "Probíhá kontrola stornování..." });
                    var vymdel = that.params.ddp_rad_vymdel;
                    if (vymdel == 0) {
                        that.showFlash("Není povoleno rušit vymáhání!", "error");
                        that.endOperation({ id: "kotrolaStorna" });
                        return;
                    }
                    else if (vymdel == 1 && data.ixs_fun_akt != that.ixsFun) {
                        that.showFlash("Vymáhání nelze zrušit - není povoleno rušení cizích vymáhání!", "error");
                        that.endOperation({ id: "kotrolaStorna" });
                        return;
                    }
                    var defSkupina = $.Deferred();
                    that.isl.VymahaniDDP.jePovolenaSkupinaProEditaciSimple({ ixsSkv: data.ixs_skv, typPhl: data.typ_phl })
                        .get()
                        .done((result) => {
                        defSkupina.resolve(result);
                    }).fail(() => {
                        that.endOperation({ id: "kotrolaStorna" });
                    });
                    var defPosledniKrok = $.Deferred();
                    defSkupina.done((isEditable) => {
                        if (!isEditable) {
                            that.showFlash("V této skupině vymáhání nemá uživatel povolenu editaci (rušení) vymáhání!", "error");
                            that.endOperation({ id: "kotrolaStorna" });
                            return;
                        }
                        if (that.params.ddp_vym_rezrus == 1) {
                            that.isl.VymahaniDDP.jePosledniKrokVymahani({ ixpNvy: data.ixp_nvy })
                                .get()
                                .done((result) => {
                                defPosledniKrok.resolve(result);
                            }).fail(() => {
                                that.endOperation({ id: "kotrolaStorna" });
                            });
                        }
                        else {
                            defPosledniKrok.resolve(true);
                        }
                    });
                    defPosledniKrok.done((isLast) => {
                        if (!isLast) {
                            that.showFlash("Vymáhání nelze stornovat - rušit lze pouze poslední krok vymáhání ve skupině!", "error");
                            that.endOperation({ id: "kotrolaStorna" });
                            return;
                        }
                        that.endOperation({ id: "kotrolaStorna" });
                        that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GDuvod", { ID: "DDPGDuvod#", }, "Zadání důvodu", 450, 320)
                            .on("close", (_obj, retVal) => {
                            if (retVal != null) {
                                var duvod = retVal.duvod;
                                that.beginOperation({ id: "stornoVymahani", text: "Probíhá stornování vymáhání..." });
                                that.isl.VymahaniDDP.stornoVymahani({ rq: { data: data }, duvod: duvod })
                                    .get()
                                    .done((result) => {
                                    if (result) {
                                        that.load();
                                    }
                                    else {
                                        that.showFlash("Vymáhání se nepodařilo stornovat!", "error");
                                    }
                                }).always(() => {
                                    that.endOperation({ id: "stornoVymahani" });
                                });
                            }
                            else {
                                that.showFlash("Vymáhání se nepodařilo stornovat, nebyl zadán důvod!", "warning");
                            }
                        });
                    });
                }
                /** Kontrola před voláním tisku */
                kontrolaPredTiskem() {
                    var that = this;
                    var kontrolaPromise = $.Deferred();
                    that.kontrolaZmenyDokladu(kontrolaPromise);
                    kontrolaPromise.done((result) => {
                        switch (result) {
                            case true:
                                that.tisk();
                                break;
                            case false:
                                that.dialogs.confirm("Před tiskem je třeba vymáhání uložit, chcete pokračovat?")
                                    .on("close", (_obj, retVal) => {
                                    if (retVal == "yes") {
                                        that.savePredTiskem = true;
                                        that.ulozeniPredTiskemPromise = $.Deferred();
                                        var vym = that.prectiFormular();
                                        if (vym != false) {
                                            vym.generovat_cj = 0;
                                            that.kontrolaPoliPredUlozenim(vym);
                                        }
                                        that.ulozeniPredTiskemPromise.done(() => {
                                            that.tisk();
                                        });
                                    }
                                    else {
                                        that.showFlash("Nelze tisknout, doklad nebyl uložen!", "info");
                                    }
                                });
                                break;
                            default: // nic neděláme, jelikož nastal error
                                return;
                        }
                    });
                }
                /** Tisk vymáhání */
                tisk() {
                    var that = this;
                    that.beginOperation({ id: "initPredTiskem", text: "Probíhá inicializace před tiskem..." });
                    var promiseTisku = $.Deferred();
                    that.isl.VymahaniDDP.inicializacePredTiskem({ data: that.model })
                        .get().done((result) => {
                        if (result)
                            promiseTisku.resolve();
                    })
                        .always(() => {
                        that.endOperation({ id: "initPredTiskem" });
                    });
                    promiseTisku.done(() => {
                        const actTiskVymahani = GAction.createPrintAction({
                            name: "actTiskVymahani",
                            tema: "ddp_ptm_nvy",
                            customDto: {
                                ixp_den: that.ixpDen,
                                rok_den: that.rokDen,
                                typ_phl: that.typPhl,
                                ixp: that.ixpNvy,
                                stav_vym: that.model.stav_vym
                            },
                            serverRestrictionAlfMethod: "Gordic.Ddp.WebClient.GDdpWebTisk:GetRestrictionAlf", // filtr pro možné tisky
                            // ↓ Metoda, která je zavolána těsně před generováním sestavy a kde lze na straně serveru ovlivnit parametry sestavy ↓
                            serverParameterMethod: "Gordic.Ddp.WebClient.GDdpWebTisk:TiskVymahani", //zde se plní téma
                            reportFinished: function () {
                                that.isl.VymahaniDDP.kontrolaPoTisku().get().done((pocet) => {
                                    if (pocet > 0) {
                                        that.dialogs.confirm("Kontrolní dotaz nastavení příznaku tisku", "Pokud víte, že tisk vymáhání dopadl v pořádku, už ho nechcete tisknout znovu a chcete změnit stav tisku vymáhání, tak odpovězte ANO." +
                                            "\n\n Pokud chcete tisk opakovat, protože se zmačkal papír v tiskárně, chcete si udělat kopii, některá sestava je chybná atd., pak odpovězte NE.", 465)
                                            .on("close", (_ev, retVal) => {
                                            if (retVal === "yes") {
                                                that.isl.VymahaniDDP.nastavPriznakTiskuVymahani().get();
                                            }
                                        });
                                    }
                                });
                            },
                            dialogClosed: function () {
                            }
                        });
                        actTiskVymahani.run();
                    });
                }
                /** Přidání dokumentu do spisu */
                pridatDoSpisu() {
                    var that = this;
                    var vym = that.model;
                    ;
                    that.beginOperation({ id: "pridatDoSpisu", text: "Probíhá přidání do spisu..." });
                    var spisPromise = $.Deferred();
                    that.isl.VymahaniDDP.spisPripadu({ ixp: vym.ixp_ddp, ixsSkv: vym.ixs_skv, typPhl: vym.typ_phl, hledatPriorSpis: 1 })
                        .get()
                        .done((result) => {
                        if (result == vym.ixp_ddp) {
                            Gordic.Wfl.Dialogs.GHledatIdentDokSpisDlg(that)
                                .done(function (retVal) {
                                if (retVal == null)
                                    return;
                                var ixpSpis = retVal.ixp;
                                spisPromise.resolve(ixpSpis);
                            });
                        }
                        else {
                            spisPromise.resolve(result);
                        }
                    }).always(() => {
                        that.endOperation({ id: "pridatDoSpisu" });
                    });
                    spisPromise.done((ixpSpis) => {
                        that.beginOperation({ id: "pridatDoSpisu2", text: "Probíhá přidání do spisu..." });
                        that.isl.VymahaniDDP.vlozDoSpisu({ ixpNvy: vym.ixp_nvy, ixpSpis: ixpSpis, typPhl: vym.typ_phl })
                            .get()
                            .done(() => {
                            that.load();
                        }).always(() => {
                            that.endOperation({ id: "pridatDoSpisu2" });
                        });
                    });
                }
                /** Založení spisu */
                zalozitSpis() {
                    var that = this;
                    var vym = that.model;
                    var zalozeniPromise = $.Deferred();
                    if (that.params.ddp_vym_zpgesp == 2) {
                        Gordic.Wfl.Dialogs.GHledatIdentDokSpisDlg(that)
                            .done(function (retVal) {
                            if (retVal == null)
                                return;
                            zalozeniPromise.resolve(retVal.ixp);
                        });
                    }
                    else
                        zalozeniPromise.resolve("");
                    zalozeniPromise.done((ixpIni) => {
                        that.beginOperation({ id: "zalozitSpis", text: "Probíhá založení spisu..." });
                        that.isl.VymahaniDDP.zalozitSpis({ ixpNvy: vym.ixp_nvy, ixsSkv: vym.ixs_skv, ixpIni: ixpIni, ixpDdp: vym.ixp_ddp, typPhl: vym.typ_phl })
                            .get()
                            .done(() => {
                            that.load();
                        }).always(() => {
                            that.endOperation({ id: "zalozitSpis" });
                        });
                    });
                }
                /** Výjmutí dokumentu ze spisu */
                vyjmoutZeSpisu() {
                    var that = this;
                    that.beginOperation({ id: "vyjmiZeSpisu", text: "Probíhá vyjmutí ze spisu..." });
                    that.isl.VymahaniDDP.vyjmiZeSpisu({ ixpNvy: that.ixpNvy })
                        .get()
                        .done(() => {
                        that.load();
                    }).always(() => {
                        that.endOperation({ id: "vyjmiZeSpisu" });
                    });
                }
                //#endregion
                /** Zkontroluje zda byl změněn doklad */
                kontrolaZmenyDokladu(kontrolaPromise) {
                    var that = this;
                    var puvodniModel = that.model;
                    var novyModel = that.prectiFormular();
                    if (novyModel == false) {
                        that.showFlash("Některá pole nejsou validní, nelze tisknout!", "error");
                        return;
                    }
                    that.beginOperation({ id: "kontrolaZmeny", text: "Probíhá kontrola změny dokladu..." });
                    that.isl.VymahaniDDP.kontrolaZmenyDokladu({ oldDto: puvodniModel, newDto: novyModel })
                        .get().done((result) => {
                        kontrolaPromise.resolve(result);
                    }).fail(() => {
                        that.showFlash("Chyba při kontrole změny dokladu!", "error");
                    }).always(() => {
                        that.endOperation({ id: "kontrolaZmeny" });
                    });
                }
                /**
                 * Načte data pro detail vymáhání, a zavolá metodu onContentReady
                 * @param ixp
                 */
                ziskaniDatVymahani(ixp) {
                    var that = this;
                    that.beginOperation({ id: "loadVym", text: "Načítání dat (Detail vymáhání)" });
                    var task = that.isl.VymahaniDDP.read(rq => {
                        return {
                            data: { ixp_nvy: ixp }
                        };
                    }).get();
                    task.done((data) => {
                        that.model = data.data;
                        //that.onContentReady();
                    }).always(() => {
                        that.endOperation({ id: "loadVym" });
                    });
                }
                /** Zavolá serverové funkce k spočítání datumů, pokud je datum doručení změněn */
                spoctiDatumy() {
                    var that = this;
                    var zasilkaForm = that.findForms("formZasilka");
                    var datDoruc = zasilkaForm.findFields("dat_doruc").gfield("getValue");
                    var datPm = zasilkaForm.findFields("dat_pm").gfield("getValue");
                    var datVykon = zasilkaForm.findFields("dat_vykon").gfield("getValue");
                    // Datum vykonatelnosti a nabytí právní moci se bude počítat v DB
                    if ((datPm == null || datVykon == null) && datDoruc != null) {
                        that.beginOperation({ id: "spoctiDatumy", text: "Probíhá výpočet datumů..." });
                        var basicInfoForm = that.findForms("formBasicInfo");
                        var stavVym = basicInfoForm.findFields("stav_vym").gfield("getValue");
                        var stavVymOld = basicInfoForm.findFields("stav_vym_old").gfield("getValue");
                        var mainForm = that.findForms("formHeader");
                        var ixsSkv = mainForm.findFields("ixs_skv").gfield("getValue");
                        var filter = {
                            dat_doruc: datDoruc,
                            dat_pm: datPm,
                            dat_vykon: datVykon,
                            stav_vym: stavVym.stav_vym,
                            stav_vym_old: stavVymOld.stav_vym,
                            ixs_skv: ixsSkv.ixs_skv
                        };
                        that.isl.VymahaniDDP.vypocetDatumu({ data: filter })
                            .get()
                            .done((result) => {
                            zasilkaForm.findFields("dat_pm").gfield("setValue", result.dat_pm);
                            zasilkaForm.findFields("dat_vykon").gfield("setValue", result.dat_vykon);
                            that.endOperation({ id: "spoctiDatumy" });
                        });
                    }
                }
                /** Vypočet částky vymáhání po změně jednotlivých částek */
                spocitejCastkyVymahani() {
                    var that = this;
                    var castkyForm = that.findForms("formVymahanaCastka");
                    var castky = that.ziskejDataProVypocet(castkyForm);
                    var cVymZak = castky.cVym - castky.cNakRiz - castky.cExe - castky.cPok - castky.cPen;
                    castkyForm.findFields("c_vym_zak").gfield("setValue", cVymZak);
                    that.zavolejStatusSumaInfo();
                }
                /** Vypočet celkové částky vymáhání po změně vymáhané částky */
                spocitejCelkovouCastkyVymahani() {
                    var that = this;
                    var castkyForm = that.findForms("formVymahanaCastka");
                    var castky = that.ziskejDataProVypocet(castkyForm);
                    var cVym = castky.cVymZak + castky.cNakRiz + castky.cExe + castky.cPok + castky.cPen;
                    castkyForm.findFields("c_vym").gfield("setValue", cVym);
                    that.zavolejStatusSumaInfo();
                }
                /**
                 *  Získání dat pro výpočet částky vymáhání
                 * @param castkyForm
                 * @returns
                 */
                ziskejDataProVypocet(castkyForm) {
                    var castky = {};
                    castky.cVym = castkyForm.findFields("c_vym").gfield("getValue");
                    castky.cNakRiz = castkyForm.findFields("c_nak_riz").gfield("getValue");
                    castky.cPok = castkyForm.findFields("c_pok").gfield("getValue");
                    castky.cPen = castkyForm.findFields("c_pen").gfield("getValue");
                    castky.cExe = castkyForm.findFields("c_exe").gfield("getValue");
                    castky.cVymZak = castkyForm.findFields("c_vym_zak").gfield("getValue");
                    return castky;
                }
                /** Nastaví dat pro statusSumaInfo a zavolá jí */
                zavolejStatusSumaInfo() {
                    var that = this;
                    var sumaVym;
                    if (that.slozkyVymCastky.length != 0)
                        sumaVym = that.slozkyVymCastky[0].suma_vym;
                    else
                        sumaVym = 0;
                    that.statusSumaInfo(sumaVym);
                }
                /** Zobrazení detailu zásilek */
                zobrazDetailZasilky() {
                    var that = this;
                    var selection = that.gridZasilky.ggrid("getSelection");
                    if (selection.length != 0) {
                        var sel = selection[0];
                        var sxs = that.ixpNvy + sel.lic + sel.por_cislo;
                        var opt = { Sxs: sxs };
                        Gordic.Wfl.Dialogs.GDetailZasilkyDlg(that, opt, Gordic.Global.Enums.ModOtevreni.navigate);
                    }
                }
                /** Načtění dílčích vymáhání */
                loadDilciVymahani() {
                    var that = this;
                    var filter = {};
                    filter.ixp = that.model.ixp_ddp;
                    filter.ixp_nvy = that.ixpNvy;
                    that.beginOperation({ id: "loadDilciVymahani", text: "Načítání dat (Dílčí vymáhání)" });
                    that.isl.VymahaniDDP.listDilciVymahani(() => {
                        return {
                            filters: filter
                        };
                    }).get().done(function (dto) {
                        var view = new Gordic.Data.View(dto.data);
                        that.gridDilciVymahani.ggrid("setData", view);
                    }).always(() => {
                        that.endOperation({ id: "loadDilciVymahani" });
                    });
                }
                //#region Vazby
                /** Navázat napojené vymáhání */
                navazatNapojeneVymahani() {
                    var that = this;
                    that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GVyberVymahani", {
                        ID: "DDPGVyberVymahani#", ixpNvy: that.ixpNvy, ixpDdp: that.model.ixp_ddp, hlidat: 2
                    }, "Výběr vymáhání", 780, 480)
                        .on("close", (_obj, result) => {
                        if (result != null) {
                            that.beginOperation({ id: "navazaniNapVym", text: "Probíhá navázání napojeného vymáhání..." });
                            that.isl.VymahaniDDP.pridatVazbuNapVym({ ixpNvy: result.ixpNvy, ixpNvyNad: that.ixpNvy }).get()
                                .done(() => {
                                that.loadDilciVymahani();
                            }).always(() => {
                                that.endOperation({ id: "navazaniNapVym" });
                            });
                        }
                    });
                }
                /** Odebrání vazby napojeného vymáhání */
                zrusitNavazaniNapVym() {
                    var that = this;
                    var selection = that.gridDilciVymahani.ggrid("activeRow");
                    if (selection != null) {
                        var ixpNvy = selection.ixp_nvy ?? "";
                        var aktivita = selection.aktivita ?? 900;
                        if (aktivita != 100) {
                            that.showFlash("Vybraná vazba není aktivní!", "error");
                        }
                        else {
                            that.beginOperation({ id: "zruseniNavVym", text: "Probíhá odebrání navázaného vymáhání..." });
                            that.isl.VymahaniDDP.odebratVazbuNapVym({ ixpNvy: ixpNvy, aktivita: aktivita }).get()
                                .done(() => {
                                that.loadDilciVymahani();
                            }).always(() => {
                                that.endOperation({ id: "zruseniNavVym" });
                            });
                        }
                    }
                }
                /** Navázat předchozí kroky vymáhání */
                navazat() {
                    var that = this;
                    that.dialogs.showModalWindow("Gordic.Ddp.WebClient.GVyberVymahani", {
                        ID: "DDPGVyberVymahani#", ixpNvy: that.ixpNvy, ixpDdp: that.model.ixp_ddp, hlidat: 1
                    }, "Výběr vymáhání", 780, 480)
                        .on("close", (_obj, result) => {
                        if (result != null) {
                            that.beginOperation({ id: "navazaniPredKrokVym", text: "Probíhá navázání předchozího kroku vymáhání..." });
                            that.isl.VymahaniDDP.pridatVazbu({ ixpNvy: that.ixpNvy, ixpNvyPred: result.ixpNvy }).get()
                                .done(() => {
                                var filter = {};
                                filter.ixp = that.model.ixp_ddp;
                                filter.ixp_nvy = that.ixpNvy;
                                filter.zobrazit_zrusene = that.findForms("zruseneFormPredVym").findFields("zobrazit_zrusene").gfield("getValue");
                                that.loadPredchoziVymZrus(filter);
                            }).always(() => {
                                that.endOperation({ id: "navazaniPredKrokVym" });
                            });
                        }
                    });
                }
                /** Zrušit navázání předchozího kroku vymáhání */
                zrusitNavazani() {
                    var that = this;
                    var selection = that.gridPredchoziKrokyVym.ggrid("activeRow");
                    if (selection != null) {
                        var ixpNvyPred = selection.ixp_nvy ?? "";
                        var aktivita = selection.aktivita ?? 900;
                        if (aktivita != 100) {
                            that.showFlash("Vybraná vazba není aktivní!", "error");
                        }
                        that.beginOperation({ id: "zruseniNav", text: "Probíhá odebrání navázaného vymáhání..." });
                        that.isl.VymahaniDDP.odebratVazbu({ ixpNvy: that.ixpNvy, ixpNvyPred: ixpNvyPred, aktivita: aktivita }).get()
                            .done(() => {
                            var filter = {};
                            filter.ixp = that.model.ixp_ddp;
                            filter.ixp_nvy = that.ixpNvy;
                            filter.zobrazit_zrusene = that.findForms("zruseneFormPredVym").findFields("zobrazit_zrusene").gfield("getValue");
                            that.loadPredchoziVymZrus(filter);
                        }).always(() => {
                            that.endOperation({ id: "zruseniNav" });
                        });
                    }
                }
                /** Obnovení navázání předchozího kroku vymáhání */
                obnoveniNavazani() {
                    var that = this;
                    var selection = that.gridPredchoziKrokyVym.ggrid("activeRow");
                    if (selection != null) {
                        var ixpNvyPred = selection.ixp_nvy ?? "";
                        var aktivita = selection.aktivita ?? 100;
                        if (aktivita != 900) {
                            that.showFlash("Vybraná vazba není zrušená!", "error");
                        }
                        that.beginOperation({ id: "obnoveniNav", text: "Probíhá odebrání navázaného vymáhání..." });
                        that.isl.VymahaniDDP.obnovitVazbu({ ixpNvy: that.ixpNvy, ixpNvyPred: ixpNvyPred, aktivita: aktivita }).get()
                            .done(() => {
                            var filter = {};
                            filter.ixp = that.model.ixp_ddp;
                            filter.ixp_nvy = that.ixpNvy;
                            filter.zobrazit_zrusene = that.findForms("zruseneFormPredVym").findFields("zobrazit_zrusene").gfield("getValue");
                            that.loadPredchoziVymZrus(filter);
                        }).always(() => {
                            that.endOperation({ id: "obnoveniNav" });
                        });
                    }
                }
                //#endregion
                //#region Složky vymáhané částky
                /** Přidání složky vymáhané částky */
                pridatSlozkyVymCastky() {
                    var that = this;
                    that.navigate("Gordic.Ddp.WebClient.GSlozkaVymahani", {
                        ID: "DDPGSlozkaVymahani#",
                        model: that.model,
                        modelESU: that.esuPripaduDDP,
                        editace: false
                    }).on("close", (_obj, retVal) => {
                        var kontrolaSlozkyVymPromise = $.Deferred();
                        if (retVal != null) {
                            that.beginOperation({ id: "kontrolaPredpisu", text: "Zjišťuje se zda existuje předpis pro vymáhání..." });
                            that.isl.VymahaniDDP.predpisProVymahaniExistuje({ dto: retVal.data })
                                .get()
                                .done((result) => {
                                if (result) {
                                    kontrolaSlozkyVymPromise.resolve(result);
                                }
                                else {
                                    that.dialogs.confirm("Pro vybranou složku vymáhání neexistuje předpis, chcete složku vymáhání opravdu vytvořit?")
                                        .on("close", (_obj, retVal) => {
                                        if (retVal == "yes") {
                                            kontrolaSlozkyVymPromise.resolve(result);
                                        }
                                        else {
                                            kontrolaSlozkyVymPromise.reject();
                                        }
                                    });
                                }
                            })
                                .always(() => { that.endOperation({ id: "kontrolaPredpisu" }); });
                        }
                        else {
                            kontrolaSlozkyVymPromise.reject();
                        }
                        // Kontrola zda již složka vymáhání existuje
                        kontrolaSlozkyVymPromise.done(() => {
                            that.beginOperation({ id: "kontrolaSlozkyVymahani", text: "Zjišťuje se zda složka vymáhání již existuje..." });
                            that.isl.VymahaniDDP.slozkaVymahaniExistuje({ dto: retVal.data })
                                .get()
                                .done((result) => {
                                if (result) { // složka vymáhání již existuje
                                    that.showFlash("Zadaná složka vymáhání již existuje!", "error");
                                }
                                else {
                                    // Přidání složky vymáhání
                                    that.isl.VymahaniDDP.pridatSlozkuVymahani({ dto: retVal.data })
                                        .get()
                                        .done(() => {
                                        var filter = {};
                                        filter.ixp = that.model.ixp_ddp;
                                        filter.ixp_nvy = that.ixpNvy;
                                        filter.zobrazit_zrusene = that.findForms("zruseneFormSlozkyVym").findFields("zobrazit_zrusene").gfield("getValue");
                                        that.loadSlozkyVymCastky(filter);
                                    });
                                }
                            })
                                .always(() => {
                                that.endOperation({ id: "kontrolaSlozkyVymahani" });
                            });
                        });
                    });
                }
                /** Upravení složky vymáhané částky */
                upravitSlozkyVymCastky() {
                    var that = this;
                    var row = that.gridSlozkyVymCastky.ggrid("activeRow");
                    row.ixp_nvy = that.ixpNvy;
                    if (row != null) {
                        that.navigate("Gordic.Ddp.WebClient.GSlozkaVymahani", {
                            ID: "DDPGSlozkaVymahani#",
                            model: row,
                            modelESU: that.esuPripaduDDP,
                            editace: true // jedná se o editaci existujícího záznamu
                        }).on("close", (_obj, retVal) => {
                            if (retVal != null) {
                                that.beginOperation({ id: "editaceSlozkyVymahani", text: "Probíhá aktualizace složky vymáhání..." });
                                that.isl.VymahaniDDP.editaceSlozkyVymahani({ dto: retVal.data })
                                    .get()
                                    .done(() => {
                                    var filter = {};
                                    filter.ixp = that.model.ixp_ddp;
                                    filter.ixp_nvy = that.ixpNvy;
                                    filter.zobrazit_zrusene = that.findForms("zruseneFormSlozkyVym").findFields("zobrazit_zrusene").gfield("getValue");
                                    that.loadSlozkyVymCastky(filter);
                                })
                                    .always(() => {
                                    that.endOperation({ id: "editaceSlozkyVymahani" });
                                });
                            }
                        });
                    }
                }
                /** Zrušení složky vymáhané částky */
                zrusitSlozkyVymCastky() {
                    var that = this;
                    var row = that.gridSlozkyVymCastky.ggrid("activeRow");
                    row.ixp_nvy = that.ixpNvy;
                    if (row.aktivita == 100) {
                        that.beginOperation({ id: "zruseniSlozkyVymahani", text: "Probíhá zrušení složky vymáhání..." });
                        that.isl.VymahaniDDP.zruseniSlozkyVymahani({ dto: row })
                            .get()
                            .done(() => {
                            var filter = {};
                            filter.ixp = that.model.ixp_ddp;
                            filter.ixp_nvy = that.ixpNvy;
                            filter.zobrazit_zrusene = that.findForms("zruseneFormSlozkyVym").findFields("zobrazit_zrusene").gfield("getValue");
                            that.loadSlozkyVymCastky(filter);
                        })
                            .always(() => {
                            that.endOperation({ id: "zruseniSlozkyVymahani" });
                        });
                    }
                    else {
                        that.showFlash("Vybraná složka vymáhání není aktivní!", "error");
                    }
                }
                /** Obnovit složky vymáhané částky */
                obnovitSlozkyVymCastky() {
                    var that = this;
                    var row = that.gridSlozkyVymCastky.ggrid("activeRow");
                    row.ixp_nvy = that.ixpNvy;
                    if (row.aktivita == 900) {
                        that.beginOperation({ id: "obnoveniSlozkyVymahani", text: "Probíhá obnovení složky vymáhání..." });
                        that.isl.VymahaniDDP.obnoveniSlozkyVymahani({ dto: row })
                            .get()
                            .done(() => {
                            var filter = {};
                            filter.ixp = that.model.ixp_ddp;
                            filter.ixp_nvy = that.ixpNvy;
                            filter.zobrazit_zrusene = that.findForms("zruseneFormSlozkyVym").findFields("zobrazit_zrusene").gfield("getValue");
                            that.loadSlozkyVymCastky(filter);
                        })
                            .always(() => {
                            that.endOperation({ id: "obnoveniSlozkyVymahani" });
                        });
                    }
                    else {
                        that.showFlash("Vybraná složka vymáhání je aktivní!", "error");
                    }
                }
                //#endregion
                //#region Redistribuce
                redistribuce(typRedist, ixsFun) {
                    var that = this;
                    var pripady = [];
                    pripady.push({ ixp: that.ixpNvy });
                    var ixpSpis = that.model.wflProfil.ixp_spis;
                    var ixpNvy = that.ixpNvy;
                    const modelDto = {
                        ixs_fun: ixsFun,
                        typ_redistribuce: typRedist, // 0 - předání, 10 - přidělení
                        priz_sekce: 1 // jedná se vymáhání
                    };
                    var def = $.Deferred();
                    // Kontrola zda je vymáhání ve spisu
                    if (ixpSpis != ixpNvy) {
                        // Je ve spisu
                        that.dialogs.confirm("Předat spis?", "Vybrané vymáhání je vloženo do spisu. \n \n " +
                            "U tohoto vymáhání bude předán celý spis, chcete pokračovat?", 400, 200).on("close", (_ev, retVal) => {
                            if (retVal !== "yes") {
                                def.reject();
                                return;
                            }
                            def.resolve();
                        });
                    }
                    else
                        def.resolve();
                    def.promise().done(() => {
                        that.beginOperation({ id: "redistribuce", text: "Probíhá redistribuce vymáhání..." });
                        that.isl.Redistribuce.updatePredani({ predaniDtos: pripady, model: modelDto, prizDetail: true })
                            .get().done((result) => {
                            if (result != undefined && result.length > 0) {
                                var kind = result[0].wiz_kind;
                                if (kind == 200 /* Gordic.Isl.GOperationResultKind.Success */) {
                                    that.showFlash("Vymáhání bylo úspěšně redistribuováno.", "success");
                                    that.load();
                                }
                                else if (kind == 400 /* Gordic.Isl.GOperationResultKind.Error */) {
                                    that.showFlash("Vymáhání se nepodařilo redistribuovat: " + result[0].wiz_txt_err, "error");
                                }
                            }
                        }).always(() => {
                            that.endOperation({ id: "redistribuce" });
                        });
                    });
                }
                /**
                 * Převzetí vybraných případů vymáhání
                 * @returns
                 */
                prevzit() {
                    var that = this;
                    var pripady = [];
                    var pripad = {};
                    pripady.push({ ixp: that.ixpNvy });
                    pripad.ixp = that.ixpNvy;
                    var jeSpis = false;
                    var def = $.Deferred();
                    var def2 = $.Deferred();
                    that.beginOperation({ id: "existujePripadVeSpisu", text: "Probíhá kontrola případů ve spisu..." });
                    that.isl.Redistribuce.existujePripadVeSpisu({ spisDtos: pripady })
                        .get()
                        .done((result) => {
                        def.resolve(result);
                    }).always(() => {
                        that.endOperation({ id: "existujePripadVeSpisu" });
                    });
                    def.done((result) => {
                        result.forEach((item) => {
                            if (item.je_ve_spisu)
                                jeSpis = true;
                        });
                        if (jeSpis) {
                            that.dialogs.confirm("Převzít spis?", "Ve vybraných vymáháních jsou některé vymáhání vloženy do spisu. \n \n " +
                                "U těchto vymáhání bude převzat celý spis, chcete pokračovat?", 400, 200).on("close", (_ev, retVal) => {
                                if (retVal === "yes")
                                    def2.resolve();
                                else
                                    def2.reject(); // pokud uživatel nechce předat celý spis, tak končíme
                            });
                        }
                        else
                            def2.resolve(); // pokud nemáme případy ve spisu, tak pokračujeme
                    });
                    def2.promise().done(() => {
                        that.isl.Redistribuce.prevzeti({ pripad: pripad, prizSekce: 1 })
                            .get().done((result) => {
                            if (result != undefined) {
                                var kind = result.wiz_kind;
                                if (kind == 200 /* Gordic.Isl.GOperationResultKind.Success */) {
                                    that.showFlash("Vymáhání bylo úspěšně převzato.", "success");
                                    that.load();
                                }
                                else if (kind == 400 /* Gordic.Isl.GOperationResultKind.Error */) {
                                    that.showFlash("Vymáhání se nepodařilo převzít: " + result.wiz_txt_err, "error");
                                }
                            }
                        });
                    });
                }
                ;
                //#endregion
                //#region Funkce jednotlivých políček
                /**
                 * Změna skupiny vymáhání
                 * @method poZmeneSubjektu()
                 * @param {any} ctx Data z políčka po změně
                 */
                poZmeneSkupiny(ctx) {
                    const that = this;
                    const stavVymField = that.findFields("stav_vym");
                    // políčko cizého bankovního účtu
                    if (stavVymField.gfield("option", "disabled") == false) { // pokud je políčko editovatelné
                        if (ctx.value !== null) // nějaký subjekt je vybrán
                            stavVymField.gfield("option", "serverFilters", { ixs_skv: ctx.value.ixs_skv }); // náhrada za dependency                                              
                        else // subjekt je prázdný
                            stavVymField.gfield("option", "serverFilters", { ixs_svk: null }); // náhrada za dependency                                        
                    }
                    stavVymField.gfield("getServerFilters").then((sf) => {
                        return new Gordic.Data.Readers.StavVymahaniDetail().getData(sf); // vrácení hodnot políčka s aktuálními serverovými filtry
                    }).then((stav) => {
                        // po vrácení
                        if (stav.length > 0) // pokud existují hodnoty, tak hodíme první, jelikož to by mělo být 'neurčeno'
                            stavVymField.gfield("model", "apply", stav[0], { initialValues: true }); // doplním jí do políčka                
                        else // existuje více nebo žádná hodnota
                            stavVymField.gfield("clear"); // tak účet vymažu
                    });
                }
            };
            GDetailVymahani = __decorate([
                Decorators.gcontent
            ], GDetailVymahani);
            WebClient.GDetailVymahani = GDetailVymahani;
        })(WebClient = Ddp.WebClient || (Ddp.WebClient = {}));
    })(Ddp = Gordic.Ddp || (Gordic.Ddp = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFZ5bWFoYW5pLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbFZ5bWFoYW5pLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwRUFBMEU7QUFDMUUsdUZBQXVGO0FBQ3ZGLDhGQUE4RjtBQUM5Rix5RkFBeUY7QUFDekYsNEZBQTRGO0FBQzVGLDBGQUEwRjtBQUMxRixpQkFBaUI7Ozs7Ozs7QUFFakIsSUFBVSxNQUFNLENBMHhGZjtBQTF4RkQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBMHhGbkI7SUExeEZnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0EweEY3QjtRQTF4Rm9CLFdBQUEsU0FBUztZQUUxQjs7Ozs7ZUFLRztZQUVILElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsT0FBQSxxQkFBNkM7Z0JBQWxGOztvQkF1QkkseUNBQXlDO29CQUN6QyxtQkFBYyxHQUFZLEtBQUssQ0FBQztvQkFDaEMsZ0NBQWdDO29CQUNoQyxrQkFBYSxHQUFZLEtBQUssQ0FBQztvQkFxdkYvQixZQUFZO2dCQUNoQixDQUFDO2dCQWh1RkcsdUNBQXVDO2dCQUN2QyxtQkFBbUIsQ0FBQyxPQUFnRDtvQkFDaEUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3JCLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFO3dCQUM5QixPQUFPLEVBQUU7NEJBQ0wsU0FBUyxFQUFFO2dDQUNQLElBQUksRUFBRSxXQUFXO2dDQUNqQixPQUFPLEVBQUUsUUFBUTtnQ0FDakIsR0FBRyxFQUFFLEdBQUcsRUFBRTtvQ0FDTixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0NBQ3hCLENBQUM7NkJBQ0o7NEJBQ0QsU0FBUyxFQUFFO2dDQUNQLElBQUksRUFBRSxXQUFXO2dDQUNqQixPQUFPLEVBQUUsaUNBQWlDO2dDQUMxQyxPQUFPLEVBQUUsUUFBUTtnQ0FDakIsR0FB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VSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDckQsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQ3RELFlBQVksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN6RCxDQUFDOzZCQUFNLENBQUM7NEJBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2xFLFdBQVcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUNyRCxXQUFXLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFDdEQsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQ25ELFdBQVcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUN0RCxXQUFXLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs0QkFDdkQsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQzFELENBQUM7d0JBQ0QsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ2hELFNBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNsRCxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxT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QU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFrQyx5REFBeUQ7b0JBQzlKLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO3dCQUNiLGFBQWE7d0JBQ2IsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBMkUsOEVBQThFOzRCQUN4SyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBdUIsd0NBQXdDOzZCQUMzQyxtQ0FBbUM7NEJBQy9ILFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBa0Usa0JBQWtCO29CQUN6SCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2FBRUosQ0FBQTtZQWh4RlksZUFBZTtnQkFEM0IsVUFBVSxDQUFDLFFBQVE7ZUFDUCxlQUFlLENBZ3hGM0I7WUFoeEZZLHlCQUFlLGtCQWd4RjNCLENBQUE7UUFDTCxDQUFDLEVBMXhGb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBMHhGN0I7SUFBRCxDQUFDLEVBMXhGZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBMHhGbkI7QUFBRCxDQUFDLEVBMXhGUyxNQUFNLEtBQU4sTUFBTSxRQTB4RmYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAgPEZpbGVIZWFkZXIgeG1sbnM9XCJodHRwOi8vd3d3LmdvcmRpYy5jei9zaGFyZWQvZmlsZS1oZWFkZXIvdl8xLjAuMC4wXCI+XHJcbi8vICAgIDxOYW1lPiAgICAgICAgR29yZGljLkRkcC5XZWJDbGllbnQuR0RldGFpbFZ5bWFoYW5pLnRzICAgICAgICAgICAgICAgICAgICAgPC9OYW1lPlxyXG4vLyAgICA8RGVzY3JpcHRpb24+IERldGFpbCB2eW3DoWjDoW7DrSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRGVzY3JpcHRpb24+XHJcbi8vICAgIDxBdXRob3I+ICAgICAgdmNlY2ggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9BdXRob3I+XHJcbi8vICAgIDxDb3B5cmlnaHQ+ICAgwqkgR09SRElDIHNwb2wuIHMgci4gby4gMTk5My0yMDI1ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29weXJpZ2h0PlxyXG4vLyAgICA8Q3JlYXRlZD4gICAgIDIwMjQtMTEtMjggICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3JlYXRlZD5cclxuLy8gIDwvRmlsZUhlYWRlcj5cclxuXHJcbm5hbWVzcGFjZSBHb3JkaWMuRGRwLldlYkNsaWVudCB7XHJcbiAgICBleHBvcnQgdHlwZSBVc2VkQ29tcG9uZW50c1Z5bWFoYW5pID0gR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyQ29tcG9uZW50cy5HaW5EZXNjUHJvcHNFeHRlbnNpb25zICYgR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyQ29tcG9uZW50cy5HTGlzdENvbnRyb2xzRXh0ZW5zaW9uczxEZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEZXRhaWxEdG8+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhaWwgdnltw6Fow6Fuw61cclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciBWb2p0xJtjaCDEjGVjaFxyXG4gICAgICogQGRhdGUgMjguMTEuMjAyNFxyXG4gICAgICovXHJcbiAgICBARGVjb3JhdG9ycy5nY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxWeW1haGFuaSBleHRlbmRzIEdEZXRhaWxCdWlsZGVyQ29udGVudDxVc2VkQ29tcG9uZW50c1Z5bWFoYW5pPiBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcbiAgICAgICAgLyoqIMSMw61zbG8gdHlwdSBwb2hsZWTDoXZreSAqL1xyXG4gICAgICAgIHR5cFBobDogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBLbmloYSBERFAgICovXHJcbiAgICAgICAgaXhwRGVuOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqIFJvayAqL1xyXG4gICAgICAgIHJva0RlbjogbnVtYmVyO1xyXG4gICAgICAgIC8qKiBJZGVudGlmaWvDoXRvciBmdW5rY2UgKi9cclxuICAgICAgICBpeHNGdW46IHN0cmluZztcclxuICAgICAgICAvKiogSWRlbnRpZmlrw6F0b3Igdnltw6Fow6Fuw60gKi9cclxuICAgICAgICBpeHBOdnk6IHN0cmluZztcclxuICAgICAgICAvKiogU3VixZlhZGEgKi9cclxuICAgICAgICBzdWJyYWRhOiBudW1iZXI7XHJcbiAgICAgICAgLyoqIFJlxb5pbSDEjXRlbsOtICovXHJcbiAgICAgICAgcmV6aW1DdGVuaTogc3RyaW5nO1xyXG4gICAgICAgIC8qKiBtb2RlbCB2eW3DoWjDoW7DrSAtIEdWeW1haGFuaUR0byAqL1xyXG4gICAgICAgIG1vZGVsOiBhbnk7XHJcbiAgICAgICAgLyoqIG1vZGVsIGV4dGVybsOtY2ggc3ViamVrdMWvIC0gR1Z5bWFoYW5pRVNVRHRvICovXHJcbiAgICAgICAgbW9kZWxFU1U6IGFueTtcclxuICAgICAgICAvKiogSG9kbm90eSBzbG/Fvmt5IHZ5bcOhaGFuw6kgxI3DoXN0a3kgKi9cclxuICAgICAgICBzbG96a3lWeW1DYXN0a3k6IGFueTtcclxuICAgICAgICAvKiogcHJvbWlzZSBwcm8gdGlzaywgYWJ5IHNlIHphdm9sYWwgcG8gZG9rb27EjWVuw60gdWxvxb5lbsOtICovXHJcbiAgICAgICAgdWxvemVuaVByZWRUaXNrZW1Qcm9taXNlOiBhbnk7XHJcbiAgICAgICAgLyoqIFBhcmFtZXRyIHpkYSBzZSB1a2zDoWTDoSBwxZllZCB0aXNrZW0gKi9cclxuICAgICAgICBzYXZlUHJlZFRpc2tlbTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgIC8qKiBEYXRhIG8gRVNVIG5hIHDFmcOtcGFkdSBERFAgKi9cclxuICAgICAgICBlc3VQcmlwYWR1RERQOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgLyoqIFDFmcOtem5hayBzcHLDoXZjZSAqL1xyXG4gICAgICAgIHByaXpTcHI6IG51bWJlcjtcclxuICAgICAgICAvKiogSmUgesOha8OhesOhbmEgcmVkaXN0cmlidWNlICovXHJcbiAgICAgICAgemFrYXphbmFSZWRpc3Q6IG51bWJlcjtcclxuICAgICAgICAvKiogSmUgdnltw6Fow6Fuw60gcG9kw6FubywgRG9rdWQgamUgxI3DoXN0a2Egdnltw6Fow6Fuw60gMCwgdGFrIGplIGpha29ieSBwb2RhbsO9IGEgbcWvxb5lIHNlIGVkaXRvdmF0ICovXHJcbiAgICAgICAgamVQb2Rhbnk6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqIFDFmcOtc3R1cG92w6kgcGFyYW1ldHJ5ICovXHJcbiAgICAgICAgcHJpdmF0ZSBwYXJhbXM6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkdEZHBQYXJhbWV0cnlEdG87XHJcbiAgICAgICAgLyoqIFRhYnVsa2Egb3N0YXRuw61jaCB2eW3DoWjDoW7DrSBuYSBwxZnDrXBhZHUgRERQICovXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkT3N0YXRuaVZ5bTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICAvKiogVGFidWxrYSB6w6FzaWxlayAqL1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZFphc2lsa3k6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqIFRhYnVsa2EgZMOtbMSNw61obyB2eW3DoWjDoW7DrSAqL1xyXG4gICAgICAgIHByaXZhdGUgZ3JpZERpbGNpVnltYWhhbmk6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcbiAgICAgICAgLyoqIFRhYnVsa2EgcMWZZWRjaG96w61jaCBrcm9rxa8gdnltw6Fow6Fuw60gKi9cclxuICAgICAgICBwcml2YXRlIGdyaWRQcmVkY2hvemlLcm9reVZ5bTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICAvKiogVGFidWxrYSBuYXNsZWR1asOtY8OtY2gga3Jva8WvIHZ5bcOhaMOhbsOtICovXHJcbiAgICAgICAgcHJpdmF0ZSBncmlkTmFzbGVkdWppY2lLcm9reVZ5bTogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcclxuICAgICAgICAvKiogVGFidWxrYSBzbG/Fvmt5IHZ5bcOhaGFuw6kgxI3DoXN0a3kgKi9cclxuICAgICAgICBwcml2YXRlIGdyaWRTbG96a3lWeW1DYXN0a3k6IEpRdWVyeTxIVE1MRWxlbWVudD47XHJcblxyXG4gICAgICAgIC8vIFByb2dyYW0gemHEjcOtbsOhIHpkZSwgZGVmaW5pY2UgcG9sw63EjWVrXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVySW5pdChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5jcmVhdGVBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIGJ1aWxkZXIud2l0aENvbXBvbmVudChcInZ5bWFoYW5pXCIsIHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBhY3RQb2Rhbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RQb2RhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQb2TDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubm92ZVZ5bWFoYW5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdEhsYXZuaToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdEhsYXZuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk90ZXbFmWUgZGV0YWlsIGhsYXZuw61obyB2eW3DoWjDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkhsYXZuw61cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXhwTnZ5TmFkID0gdGhhdC5tb2RlbC5peHBfbnZ5X25hZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl4cE52eSA9IHRoYXQubW9kZWwuaXhwX252eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl4cE52eU5hZCAhPSBpeHBOdnkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RldGFpbFZ5bWFoYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHBOdnk6IGl4cE52eU5hZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFByZWRhbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RQcmVkYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZZWTDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HUmVkaXN0cmlidWNlXCIsIHsgSUQ6IFwiRERQR1JlZGlzdHJpYnVjZSNcIiwgaXhwOiB0aGF0Lml4cE52eSwgdHlwUGhsOiB0aGF0LnR5cFBobCB9LCBcIlDFmWVkw6Fuw61cIiwgODAwLCAzMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGV2LCByZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCAhPSB1bmRlZmluZWQgJiYgcmV0VmFsLml4c0Z1biAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVkaXN0cmlidWNlKDAsIHJldFZhbC5peHNGdW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFByaWRlbGVuaToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFByaWRlbGVuaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDFmWlkxJtsZW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HUmVkaXN0cmlidWNlXCIsIHsgSUQ6IFwiRERQR1JlZGlzdHJpYnVjZSNcIiwgaXhwOiB0aGF0Lml4cE52eSwgdHlwUGhsOiB0aGF0LnR5cFBobCB9LCBcIlDFmWVkw6Fuw61cIiwgODAwLCAzMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgZnVuY3Rpb24gKGV2LCByZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCAhPSB1bmRlZmluZWQgJiYgcmV0VmFsLml4c0Z1biAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucmVkaXN0cmlidWNlKDEwLCByZXRWYWwuaXhzRnVuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTsgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0UHJldnpldGk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RQcmV2emV0aVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDFmWV2emV0w61cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByZXZ6aXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0UHJpcGFkRERQOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UHJpcGFkRERQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsIHDFmcOtcGFkdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlpvYnJhemVuw60gZGV0YWlsdSBwxZnDrXBhZHUgRERQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGF0LnBhcmFtcy5kZHBfcmV6X3pqZWRubyA9PSAzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vPyBqZSB0YWR5IG51dG7DvSBtw610IHR5cF9waGwgbmEgdnN0dXB1IHBybyBvdGV2xZllbsOtIGRldGFpbHUgcMWZw61wYWR1ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbW1vbi5QcmlwYWR5Lm9wZW5QcmlwYWREZXRhaWwodGhhdCwgdGhhdC5tb2RlbC5peHBfZGRwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1ByaXBhZERldGFpbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIElEOiBcIkREUEdQcmlwYWREZXRhaWwjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgSXhwOiB0aGF0Lm1vZGVsLml4cF9kZHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgVHlwUGhsOiB0aGF0Lm1vZGVsLnR5cF9waGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0UHJpZGF0RG9TcGlzdToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFByaWRhdERvU3Bpc3VcIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiUMWZaWRhdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlDFmWlkYXQgZG8gc3Bpc3VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByaWRhdERvU3Bpc3UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0VnlqbW91dFplU3Bpc3U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RWeWptb3V0WmVTcGlzdVwiLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWeWptb3V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiVnlqbW91dCB6ZSBzcGlzdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudnlqbW91dFplU3Bpc3UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0WmFsb3ppdFNwaXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RaYWxveml0U3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphbG/Fvml0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiWmFsb8W+aXQgc3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuemFsb3ppdFNwaXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0U3Rvcm5vOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U3Rvcm5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiU3Rvcm5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiU3Rvcm5vdsOhbsOtIHZ5bcOhaMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLmNvbmZpcm0oXCJTdG9ybm9cIiwgXCJPcHJhdmR1IGNoY2V0ZSBzdG9ybm92YXQgdnltw6Fow6Fuw60/XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKF9vYmosIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3Rvcm5vVnltYWhhbmkodGhhdC5tb2RlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFRpc2tWWU06IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrVllNXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVGlza1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQua29udHJvbGFQcmVkVGlza2VtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFByaXBhZE9zdGF0bmk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RQcmlwYWRPc3RhdG5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsIHZ5bcOhaMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiWm9icmF6ZW7DrSBkZXRhaWx1IHZ5bcOhaMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHRoYXQuZ3JpZE9zdGF0bmlWeW0uZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RldGFpbFZ5bWFoYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cE52eTogcm93Lml4cF9udnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdERldGFpbFphczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdERldGFpbFphc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbCB6w6FzaWxreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuem9icmF6RGV0YWlsWmFzaWxreSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3Rab2JyYXppdE5hcDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFpvYnJheml0TmFwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWm9icmF6aXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gdGhhdC5ncmlkRGlsY2lWeW1haGFuaS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRGV0YWlsVnltYWhhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwTnZ5OiByb3cuaXhwX252eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0TmF2YXphdE5hcDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE5hdmF6YXROYXBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJOYXbDoXphdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2YXphdE5hcG9qZW5lVnltYWhhbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0WnJ1c2l0VmF6YnVOYXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RacnVzaXRWYXpidU5hcFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpydcWhaXQgdmF6YnVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnpydXNpdE5hdmF6YW5pTmFwVnltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdE5hdmF6YXQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3ROYXZhemF0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiTmF2w6F6YXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm5hdmF6YXQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0WnJ1c2l0VmF6YnU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RacnVzaXRWYXpidVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlpydcWhaXQgdmF6YnVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnpydXNpdE5hdmF6YW5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdE9ibm92aXRWYXpidToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdE9ibm92aXRWYXpidVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIk9ibm92aXQgdmF6YnVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm9ibm92ZW5pTmF2YXphbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0UHJpcGFkS3Jva3k6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RQcmlwYWRLcm9reVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIkRldGFpbCB2eW3DoWjDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlpvYnJhemVuw60gZGV0YWlsdSB2eW3DoWjDoW7DrVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSB0aGF0LmdyaWRQcmVkY2hvemlLcm9reVZ5bS5nZ3JpZChcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3cgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRGV0YWlsVnltYWhhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhwTnZ5OiByb3cuaXhwX252eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0UHJpcGFkTmFzbEtyb2t5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0UHJpcGFkTmFzbEtyb2t5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiRGV0YWlsIHZ5bcOhaMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXA6IFwiWm9icmF6ZW7DrSBkZXRhaWx1IHZ5bcOhaMOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHRoYXQuZ3JpZE5hc2xlZHVqaWNpS3Jva3lWeW0uZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RldGFpbFZ5bWFoYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cE52eTogcm93Lml4cF9udnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFByaWRhdFNsbzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFByaWRhdFNsb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlDFmWlkYXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJQxZlpZGF0IHNsb8W+a3Ugdnltw6Fow6Fuw6kgxI3DoXN0a3lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnByaWRhdFNsb3preVZ5bUNhc3RreSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RVcHJhdml0U2xvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VXByYXZpdFNsb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVwcmF2aXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogXCJVcHJhdml0IHNsb8W+a3lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVwcmF2aXRTbG96a3lWeW1DYXN0a3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0WnJ1c2l0U2xvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0WnJ1c2l0U2xvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWnJ1xaFpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIlpydcWhaXQgc2xvxb5reVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuenJ1c2l0U2xvemt5VnltQ2FzdGt5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdE9ibm92aXRTbG86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RPYm5vdml0U2xvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiT2Jub3ZpdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk9ibm92aXQgc2xvxb5reVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQub2Jub3ZpdFNsb3preVZ5bUNhc3RreSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RQcmlwYWRTbG86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RQcmlwYWRTbG9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJQxZnDrXBhZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwOiBcIk90ZXbFmcOtdCBkZXRhaWwgcMWZw61wYWR1IEREUFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSB0aGF0LmdyaWRTbG96a3lWeW1DYXN0a3kuZ2dyaWQoXCJhY3RpdmVSb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocm93ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vPyBqZSB0YWR5IG51dG7DvSBtw610IHR5cF9waGwgbmEgdnN0dXB1IHBybyBvdGV2xZllbsOtIGRldGFpbHUgcMWZw61wYWR1ID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb21tb24uUHJpcGFkeS5vcGVuUHJpcGFkRGV0YWlsKHRoaXMsIHJvdy5peHBfZGRwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HUHJpcGFkRGV0YWlsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBJRDogXCJERFBHUHJpcGFkRGV0YWlsI1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBJeHA6IHJvdy5peHBfZGRwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBUeXBQaGw6IHJvdy50eXBfcGhsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0YWJHcm91cHM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IGlkOiBcInpha2xhZG5pSW5mb0dyb3VwXCIsIGNhcHRpb246IFwiWsOha2xhZG7DrSBpbmZvcm1hY2VcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwib3N0YXRuaVZ5bUdyb3VwXCIsIGNhcHRpb246IFwiT3N0YXRuw60gdnltw6Fow6Fuw60gbmEgcMWZw61wYWR1IEREUFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJ6YXNpbGt5R3JvdXBcIiwgY2FwdGlvbjogXCJaw6FzaWxreVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJkaWxjaVZ5bWFoYW5pR3JvdXBcIiwgY2FwdGlvbjogXCJEw61sxI3DrSB2eW3DoWjDoW7DrVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJwcmVkY2hvemlLcm9reVZ5bUdyb3VwXCIsIGNhcHRpb246IFwiUMWZZWRjaG96w60ga3Jva3kgdnltw6Fow6Fuw61cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwibmFzbGVkdWppY2lLcm9reVZ5bUdyb3VwXCIsIGNhcHRpb246IFwiTsOhc2xlZHVqw61jw60ga3Jva3kgdnltw6Fow6Fuw61cIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwic2xvemt5VnltQ2FzdGt5R3JvdXBcIiwgY2FwdGlvbjogXCJTbG/Fvmt5IHZ5bcOhaGFuw6kgxI3DoXN0a3lcIiB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgdGFiczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogKGVsKSA9PiB7IHRoYXQuY3JlYXRlRm9ybVZ5bWFoYW5hQ2FzdGthKGVsKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ2eW1haGFuYUNhc3RrYVRhYlwiLCB0aXRsZTogXCJWeW3DoWhhbsOhIMSNw6FzdGthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInpha2xhZG5pSW5mb0dyb3VwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiAoZWwpID0+IHsgdGhhdC5jcmVhdGVGb3JtQmFzaWNJbmZvKGVsKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ6YWtsYWRuaUluZm9UYWJcIiwgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInpha2xhZG5pSW5mb0dyb3VwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiAoZWwpID0+IHsgdGhhdC5jcmVhdGVGb3JtWmFzaWxrYShlbCk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwiemFzaWxrYVRhYlwiLCB0aXRsZTogXCJaw6FzaWxrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ6YWtsYWRuaUluZm9Hcm91cFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogKGVsKSA9PiB7IHRoYXQuY3JlYXRlRm9ybU9zdGF0bmlWeW0oZWwpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcIm9zdGF0bmlWeW1haGFuaVRhYlwiLCB0aXRsZTogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwib3N0YXRuaVZ5bUdyb3VwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0UHJpcGFkT3N0YXRuaSpcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwibG9hZE9zdGF0bmlWeW1cIiwgdGV4dDogXCJOYcSNw610w6Fuw60gZGF0IChPc3RhdG7DrSB2eW3DoWjDoW7DrSlcIiB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuaXhwID0gdGhhdC5tb2RlbC5peHBfZGRwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5peHBfbnZ5ID0gdGhhdC5peHBOdnk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLmxpc3RPc3RhdG5pVnltYWhhbmkoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogZmlsdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLmdldCgpLmRvbmUoZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGR0by5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkT3N0YXRuaVZ5bS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJsb2FkT3N0YXRuaVZ5bVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IChlbCkgPT4geyB0aGF0LmNyZWF0ZUZvcm1aYXNpbGt5KGVsKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ6YXNpbGt5VGFiXCIsIHRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ6YXNpbGt5R3JvdXBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdERldGFpbFphcypcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwibG9hZFphc2lsa3lcIiwgdGV4dDogXCJOYcSNw610w6Fuw60gZGF0IChaw6FzaWxreSlcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXI6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5peHAgPSB0aGF0Lm1vZGVsLml4cF9kZHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLml4cF9udnkgPSB0aGF0Lml4cE52eTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAubGlzdFphc2lsa3koXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogZmlsdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLmdldCgpLmRvbmUoZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGR0by5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncmlkWmFzaWxreS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJsb2FkWmFzaWxreVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IChlbCkgPT4geyB0aGF0LmNyZWF0ZUZvcm1EaWxjaVZ5bWFoYW5pKGVsKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJkaWxjaVZ5bWFoYW5pVGFiXCIsIHRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJkaWxjaVZ5bWFoYW5pR3JvdXBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdFpvYnJheml0TmFwKlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0TmF2YXphdE5hcCpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdFpydXNpdFZhemJ1TmFwKlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZERpbGNpVnltYWhhbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiAoZWwpID0+IHsgdGhhdC5jcmVhdGVGb3JtUHJlZGNob3ppS3Jva3lWeW0oZWwpOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInByZWRjaG96aUtyb2t5VnltVGFiXCIsIHRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJwcmVkY2hvemlLcm9reVZ5bUdyb3VwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3ROYXZhemF0KlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0WnJ1c2l0VmF6YnUqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RPYm5vdml0VmF6YnUqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RQcmlwYWRLcm9reSpcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuaXhwID0gdGhhdC5tb2RlbC5peHBfZGRwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5peHBfbnZ5ID0gdGhhdC5peHBOdnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnpvYnJheml0X3pydXNlbmUgPSB0aGF0LmZpbmRGb3JtcyhcInpydXNlbmVGb3JtUHJlZFZ5bVwiKS5maW5kRmllbGRzKFwiem9icmF6aXRfenJ1c2VuZVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRQcmVkY2hvemlWeW1acnVzKGZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCAgICBcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IChlbCkgPT4geyB0aGF0LmNyZWF0ZUZvcm1OYXNsZWR1amljaUtyb2t5VnltKGVsKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJuYXNsZWR1amljaUtyb2t5VnltVGFiXCIsIHRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJuYXNsZWR1amljaUtyb2t5VnltR3JvdXBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdFByaXBhZE5hc2xLcm9reSpcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuaXhwID0gdGhhdC5tb2RlbC5peHBfZGRwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5peHBfbnZ5ID0gdGhhdC5peHBOdnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnpvYnJheml0X3pydXNlbmUgPSB0aGF0LmZpbmRGb3JtcyhcInpydXNlbmVGb3JtTmFzbFZ5bVwiKS5maW5kRmllbGRzKFwiem9icmF6aXRfenJ1c2VuZVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWROYXNsZWR1amljaVZ5bVpydXMoZmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiAoZWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuY3JlYXRlRm9ybVNsb3preVZ5bUNhc3RreShlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci56b2JyYXppdF96cnVzZW5lID0gdGhhdC5maW5kRm9ybXMoXCJ6cnVzZW5lRm9ybVNsb3preVZ5bVwiKS5maW5kRmllbGRzKFwiem9icmF6aXRfenJ1c2VuZVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5peHBfbnZ5ID0gdGhhdC5peHBOdnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RoYXQuaXhwRmlsdGVyLnpvYnJheml0X3pydXNlbmUgPSB0aGF0LmZpbmRGaWVsZHMoXCJ6b2JyYXppdF96cnVzZW5lXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkU2xvemt5VnltQ2FzdGt5KGZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwic2xvemt5VnltQ2FzdGt5VGFiXCIsIHRpdGxlOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzbG96a3lWeW1DYXN0a3lHcm91cFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0UHJpZGF0U2xvKlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0VXByYXZpdFNsbypcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdFpydXNpdFNsbypcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjdE9ibm92aXRTbG8qXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RQcmlwYWRTbG8qXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGtwaXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBrcGlQb3NabWVuYToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhhdC5tb2RlbC5kYXRfem1lbmE/LnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3BpUG9zWm1lbmFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbWFyeVRleHQ6IFwiUG9zbGVkbsOtIHptxJtuYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlUZXh0OiBwYXJzZURhdGUodGhhdC5tb2RlbC53ZmxQcm9maWwuZGF0X3ptZW5hISkudG9EYXRlU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lYW5pbmc6IFwiaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IEdvcmRpYy5QcmVmYWJzLlBhbmVscy5rcGlMYXN0TW9kaWZpZWREb2N1bWVudHNUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN0YXR1c0JhcjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ3aWRnZXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoXCI8ZGl2PlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5EZXRhaWwuU3RhdHVzQmFyLmNyZWF0ZUl0ZW0oeyBpZDogXCJzdGF0dXNCYXJBa3Rpdml0YVwiIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwic3RhdHVzU2VwYXJhdG9yMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZXBhcmF0b3JcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5EZXRhaWwuU3RhdHVzQmFyLmNyZWF0ZUl0ZW0oeyBpZDogXCJzdGF0dXNCYXJUaXNrXCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzdGF0dXNTZXBhcmF0b3IxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHlwZVwiOiBcInNlcGFyYXRvclwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIuY3JlYXRlSXRlbSh7IGlkOiBcInN0YXR1c0JhclZ5cHJhdmVuaVwiIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwic3RhdHVzU2VwYXJhdG9yMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInR5cGVcIjogXCJzZXBhcmF0b3JcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5EZXRhaWwuU3RhdHVzQmFyLmNyZWF0ZUl0ZW0oeyBpZDogXCJzdGF0dXNCYXJEaWxjaVZ5cG9jZXRcIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInN0YXR1c1NlcGFyYXRvcjNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwic2VwYXJhdG9yXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uRGV0YWlsLlN0YXR1c0Jhci5jcmVhdGVJdGVtKHsgaWQ6IFwic3RhdHVzQmFyU3VtYUluZm9cIiB9KSxcclxuXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgbWVudUJhcjogW1xyXG4gICAgICAgICAgICAgICAgICAgIFt7IGlkOiBcIm1lbnVSZWRpc3RyaWJ1Y2VcIiwgY2FwdGlvbjogXCJSZWRpc3RyaWJ1Y2VcIiwgaWNvbjogXCJnaS1yZWRpc3RyaWJ1Y2VcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogXCJhY3RQcmVkYW5pXCIsIGljb246IFwiZ2ktcHJlZGF0XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBhY3Rpb246IFwiYWN0UHJpZGVsZW5pXCIsIGljb246IFwiZ2ktcHJpZGVsaXRcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogXCJhY3RQcmV2emV0aVwiLCBpY29uOiBcImdpLXByZXZ6aXRcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RQb2RhbmkqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RIbGF2bmkqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RQcmlwYWRERFBcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFByaWRhdERvU3Bpc3VcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFZ5am1vdXRaZVNwaXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RaYWxveml0U3Bpc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0U3Rvcm5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RUaXNrVllNXCJcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBzaWRlUGFuZWxzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJzaWRlUGFuZWxFU1VcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJnaS11c2Vyc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlOiBcInJpZ2h0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlYWY6IFwibGVhZlRleHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWw71ixJtyIG1vxb5uw71jaCBhZHJlc8OhdMWvXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBOYcSNdGUgc2UgamFrbyBkcsWvaMOpIGEgb25Db250ZW50UmVhZHkgbsOhc2xlZG92bsSbLCBzZXNrbMOhZMOhbsOtIGZvcm11bMOhxZllIHogdnl0dm/FmWVuw71jaCBwb2zDrcSNZWsgdiBjcmVhdGVIZWFkZXJGb3JtXHJcbiAgICAgICAgb25EZXRhaWxCdWlsZGVyQnVpbGQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGZvcm1TZXR1cCA9IHt9O1xyXG4gICAgICAgICAgICBsZXQgZm9ybSA9IHRoYXQuY3JlYXRlSGVhZGVyRm9ybSgpO1xyXG5cclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5TZWN0aW9ucy5JbmZvXSA9IHsgLy8gUHJ2bsOtIHNsb3VwY2VcclxuICAgICAgICAgICAgICAgIHJvd3M6IFtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtIS5mb3JtIS5zZWN0aW9ucyFbMF0ucm93cyFbMF0sIC8vIElkZW50aWZpa8OhdG9yIHZ5bcOhaMOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybSEuZm9ybSEuc2VjdGlvbnMhWzBdLnJvd3MhWzFdLCAvLyBabmHEjWthL8SMSlxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0hLmZvcm0hLnNlY3Rpb25zIVswXS5yb3dzIVsyXSwgLy8gRGF0dW0gcG9kw6Fuw61cclxuXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybVNlY3Rpb247XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uU2VjdGlvbnMuRGF0YTFdID0geyAvLyBEcnVow70gc2xvdXBlY1xyXG4gICAgICAgICAgICAgICAgcm93czogW1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0hLmZvcm0hLnNlY3Rpb25zIVsxXS5yb3dzIVswXSwgLy8gSWRlbnRpZmlrw6F0b3IgcMWZw61wYWR1IEREUFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0hLmZvcm0hLnNlY3Rpb25zIVsxXS5yb3dzIVsxXSwgLy8gU2t1cGluYSB2eW3DoWjDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0hLmZvcm0hLnNlY3Rpb25zIVsxXS5yb3dzIVsyXSwgLy8gRGF0dW0gZXZpZGVuY2VcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSBhcyBGb3Jtcy5Gb3JtU2VjdGlvbjtcclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5TZWN0aW9ucy5EYXRhMl0gPSB7IC8vIFTFmWV0w60gc2xvdXBlY1xyXG4gICAgICAgICAgICAgICAgcm93czogW1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0hLmZvcm0hLnNlY3Rpb25zIVsyXS5yb3dzIVswXSwgLy8gUG/FmWFkw61cclxuICAgICAgICAgICAgICAgICAgICBmb3JtIS5mb3JtIS5zZWN0aW9ucyFbMl0ucm93cyFbMV0sIC8vIFpwcmFjb3ZhdGVsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybSEuZm9ybSEuc2VjdGlvbnMhWzJdLnJvd3MhWzJdLCAvLyBEYXR1bSBnZW5lcm92w6Fuw61cclxuXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybVNlY3Rpb247XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uU2VjdGlvbnMuRGF0YTNdID0geyAvLyBQb2xvxb5reSBwb2Qgc2xvdXBjZW1pLCBqc291IHZlbGvDqSB3LTEyXHJcbiAgICAgICAgICAgICAgICByb3dzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybSEuZm9ybSEuc2VjdGlvbnMhWzNdLnJvd3MhWzBdLCAgLy8gQWRyZXPDoXQgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uOiBbXVxyXG4gICAgICAgICAgICB9IGFzIEZvcm1zLkZvcm1TZWN0aW9uO1xyXG5cclxuICAgICAgICAgICAgLy8gw7pwcmF2YSBXRkwvU1NMIGtvbXBvbmVudFxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkhlYWRlckZvcm0uc2V0dXAoYnVpbGRlciwgZm9ybVNldHVwKTtcclxuXHJcbiAgICAgICAgICAgIEVrby5EZXRhaWwuY2hhbmdlRGV0YWlsQnVpbGRlcldmbEZvckVrb0RlZmluaXRpb25zKGJ1aWxkZXIsIHRoYXQuamVQb2RhbnkgPz8gZmFsc2UsIFwibWVudVRpc2taTFwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghKHRoYXQuamVQb2RhbnkpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwxZlpZMOhIMWhaXBreSBkbyBzdGF0dXNiYXJ1IHBybyBwb3N1biBwbyBzZXpuYW11XHJcbiAgICAgICAgICAgICAgICB0aGF0Lmxpc3RDb250cm9sc19zZXR1cCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93VG9EdG86IGZ1bmN0aW9uIChncmlkU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZ3BjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cE52eTogZ3JpZFN0YXRlLmN1cnJlbnRSb3cuZGF0YS5peHBfbnZ5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5hc2xlZHVqaWNpRGV0YWlsOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRJdGVtVGVtcGxhdGU6IFwiTsOhc2xlZHVqw61jw606IHtpeHBfbnZ5fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZJdGVtVGVtcGxhdGU6IFwiUMWZZWRjaG96w606IHtpeHBfbnZ5fVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZU1vdmU6IHVuZGVmaW5lZCAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGb3JtdWzDocWZIGhsYXZpxI1reSBcclxuICAgICAgICBwcml2YXRlIGNyZWF0ZUhlYWRlckZvcm0oKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGxldCBoRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSgpXHJcbiAgICAgICAgICAgICAgICAvL3NlY3Rpb25zIVswXS5yb3dzIVt4XVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLy9ST1cgMFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIklkZW50aWZpa8OhdG9yXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy0xMlwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcuaXhzKHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHBfbnZ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGF0Lml4cE52eSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy9ST1cgMVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyh0aGF0LnBhcmFtcy5kZHBfdHh0X252eWNqdCA/PyBcIlpuYcSNa2FcIikgLy8gUG9kbcOtbmthIGlmIG51bGwgYnkgbmlrZHkgbsSbbcSbbGEgbmFzdGF0LCBqZWxpa2/FviB0byBqZSBvYnN0YXLDoW5vIGppxb4gamluZGUsIGFsZSBUUyBrxZlpxI3DrSBlcnJvclxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBcInctMTJcIiwgeyBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNqX3Z5bVwiLCAvLyDEjMOtc2xvIGplZG5hY8OtXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUgXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIC8vUk9XIDJcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBwb2TDoW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9wb2RhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgaEZvcm1cclxuICAgICAgICAgICAgICAgIC8vc2VjdGlvbnMhWzFdLnJvd3MhW3hdXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAvL1JPVyAwXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiSWRlbnRpZmlrw6F0b3IgcMWZw61wLiBERFBcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTEyXCIsIEdvcmRpYy5QcmVmYWJzLlN0cmluZy5peHModHJ1ZSksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cF9kZHBcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy9ST1cgMVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlNrdXBpbmEgdnltw6Fow6Fuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgXCJ3LTEyXCIsIFByZWZhYnMuU2VsZWN0LnNrdXBpbmFWeW1haGFuaURldGFpbCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfc2t2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuaXhzX3NrdiA9IHZhbHVlLml4c19za3ZcIixcclxuICAgICAgICAgICAgICAgICAgICBncmFwaGljSW5wdXQ6IFwiaGlkZGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IEdvcmRpYy5Db21wb25lbnRzLkdGaWVsZEFzc2lzdC5pZ25vcmVDbGFzcyxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwX3BobDogdGhhdC5tb2RlbC50eXBfcGhsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiB0aGF0Lml4cERlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhzX3Nrdl9oZWxwZXI6IHRoYXQubW9kZWwuaXhzX3NrdlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmcgPSBkYXRhPy5iYXJ2YSAhPSBudWxsID8gYGJhY2tncm91bmQtY29sb3I6ICR7Q29tbW9uLkJhc2UuR2V0SGV4Q29sb3IoZGF0YT8uYmFydmEpfTtgIDogXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjtcIj48ZGl2IHN0eWxlPVwiJHtiZ30gaGVpZ2h0OiAxOHB4OyB3aWR0aDogMThweDsgYm9yZGVyOiAxcHggc29saWQgZ3JheTsgbWFyZ2luLXJpZ2h0OiA1cHg7XCI+PC9kaXY+JHtkYXRhPy5uYXpldn08L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoZXYsIGN0eCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBvWm1lbmVTa3VwaW55KGN0eCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vUk9XIDJcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBldmlkZW5jZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTEyXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9ldmlkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGhGb3JtXHJcbiAgICAgICAgICAgICAgICAvL3NlY3Rpb25zIVsyXS5yb3dzIVt4XVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLy9ST1cgMFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvxZlhZMOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwb3JhZGlcIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLy9ST1cgMVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlpwcmFjb3ZhdGVsXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmdpbnNmdW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1bl9ha3RcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJtb2RlbC5peHNfZnVuX2FrdD12YWx1ZS5peHNfZnVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8vUk9XIDJcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBnZW5lcm92w6Fuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92eXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGhGb3JtXHJcbiAgICAgICAgICAgICAgICAvL3NlY3Rpb25zIVszXS5yb3dzIVt4XVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLy9ST1cgMFxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkFkcmVzw6F0XCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy0xMlwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJpeHNfZXN1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHNfZXN1PWl4c19lc3U7ZXN1X2RpYz1kaWM7bW9kZWwubGljPXZhbHVlLmxpYzttb2RlbC5wb3JfemFzdD12YWx1ZS5wb3JfemFzdFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fc3UuUHJlZmFicy52eWJlckVzdSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cDogR29yZGljLkVzdS5HbG9iYWxzLkVudW1zLlR5cFpvYnJhemVuaUthcm90ZWthLlNlbGVjdEVzdSwgLy8gcMWZaWTDoW7DrSBwcmVmYWJ1ICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nb3Zhbmk6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogdGhhdC5peHBOdnkgPz8gXCJcIiwgLy8gemFkw6Fuw60gbG9nb3ZhY8OtY2ggw7pkYWp1IGplIG51dG5vc3QgaGxhdm7EmyBJWFBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIER1dm9kSGxlZGFuaTogR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkR1dm9kSGxlZGFuaUVzdS56YWRhbmlFc3VWSGxlZGFuaSwgLy8gdnlicmF0IHogZW51bXVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogdGhhdC5peHBOdnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBEdXZvZEhsZWRhbmlUeHQ6IFwiRGV0YWlsIHZ5bcOhaMOhbsOtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KSBhcyBHU2VsZWN0Qm94T3B0aW9uczxhbnk+KVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGhGb3JtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Db250ZW50UmVhZHkoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LnRpdGxlID0gYERldGFpbCB2eW3DoWjDoW7DrSAtICR7dGhhdC5peHBOdnl9YDtcclxuICAgICAgICAgICAgdGhhdC50YXNrSWQgPSBcImFjdEdWeW1haGFuaVwiO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJsb2FkRG9jdW1lbnRcIiwgdGV4dDogXCJOYcSNw610w6Fuw60gZG9rdW1lbnR1Li4uXCIgfSk7XHJcbiAgICAgICAgICAgIHRoYXQubmFzdGF2ZW5pRm9ybXVsYXJ1KCk7XHJcbiAgICAgICAgICAgIHRoYXQubmFzdGF2ZW5pU3RhdHVzQmFydSgpO1xyXG4gICAgICAgICAgICB0aGF0Lm5hYmlka2FFU1UoKTtcclxuICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJsb2FkRG9jdW1lbnRcIiB9KTtcclxuICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlFZGl0YWNlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5zYXZlUHJlZFRpc2tlbSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zYXZlUHJlZFRpc2tlbSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhhdC51bG96ZW5pUHJlZFRpc2tlbVByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTbGVkb3bDoW7DrSB6bcSbbiB2ZSBmb3JtdWzDocWZw61jaCAoZG9rdW1lbnQpIHBybyBwb3ZvbGVuw60gdWxvxb5lbsOtLCBwb2t1ZCBzZSBqZWRuw6EgbyBuZWVkaXRvdmF0ZWxuw70gcMWZw61wYWRcclxuICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJmb3JtSGVhZGVyXCIpLmdmb3JtKFwid2FpdEZvclZhbHVlc1wiKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlZGl0YWNlID0gdGhhdC5qZURva2xhZEVkaXRvdmF0ZWxueSgpICYmICF0aGF0LnJlemltQ3Rlbmk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVkaXRhY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVsZW1lbnQub24oXCJmaWVsZGNoYW5nZVwiLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3JtQ2hhbmdlZCA9IHRoYXQuZmluZEZvcm1zKCkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U2F2ZSEudXBkYXRlUGVybWlzc2lvbigoZm9ybUNoYW5nZWQgfHwgZWRpdGFjZSA/IHsgdmFsdWU6IHRydWUgfSA6ICh0aGF0Lm1vZGVsLlBlcm1pc3Npb25zID8gdGhhdC5tb2RlbC5QZXJtaXNzaW9ucy5MemVFdmlkb3ZhdCA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTsgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE5hcGxuxJtuw60gYSBuYXN0YXZlbsOtIGZvcm11bMOhxZnFryBtb2RlbGVtICovXHJcbiAgICAgICAgcHJpdmF0ZSBuYXN0YXZlbmlGb3JtdWxhcnUoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXZWeW1GaWVsZCA9IHRoYXQuZmluZEZpZWxkcyhcInN0YXZfdnltXCIpO1xyXG4gICAgICAgICAgICBzdGF2VnltRmllbGQuZ2ZpZWxkKFwib3B0aW9uXCIsIFwic2VydmVyRmlsdGVyc1wiLCB7IGl4c19za3Y6IHRoYXQubW9kZWwuaXhzX3NrdiB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKFwiZm9ybUhlYWRlclwiKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0Lm1vZGVsLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKFwiZm9ybUJhc2ljSW5mb1wiKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0Lm1vZGVsLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKFwiZm9ybVphc2lsa2FcIikuZmluZEZpZWxkcygpLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhhdC5tb2RlbCwgeyBpbml0aWFsVmFsdWVzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcImZvcm1WeW1haGFuYUNhc3RrYVwiKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCB0aGF0Lm1vZGVsLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKFwiZm9ybVBvem5hbWthXCIpLmZpbmRGaWVsZHMoKS5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoYXQubW9kZWwsIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJmb3JtQmFzaWNJbmZvXCIpLmZpbmRGaWVsZHMoXCJkYXRfdnltXCIpLmdmaWVsZChcInNldEluaXRpYWxcIiwgeyBzdGFydDogdGhhdC5tb2RlbC5kYXRfb2QsIGVuZDogdGhhdC5tb2RlbC5kYXRfZG8gfSlcclxuXHJcbiAgICAgICAgICAgIC8vIEplbGlrb8W+IHBvbMOtxI1rbyBiYXJ2YSBqZSB6YWtvbWVudG92YW7DqSAtIHpha29tZW50b3ZhbCBqc2VtIHRha8OpIHR5dG8gxZnDoWRreVxyXG4gICAgICAgICAgICAvL2xldCBmaWVsZEJhcnZhID0gdGhhdC5maW5kRm9ybXMoXCJmb3JtSGVhZGVyXCIpLmZpbmRGaWVsZHMoXCJiYXJ2YVwiKTtcclxuICAgICAgICAgICAgLy9maWVsZEJhcnZhLmdmaWVsZChcImdldEJ1dHRvblwiLCBcInNlbGVjdG9yXCIpLmdidXR0b24oXCJ1cGRhdGVQYXJhbXNcIiwgeyB2aXNpYmxlOiBmYWxzZSwgZW5hYmxlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnl0dm/FmWVuw60gYWtjw60gcHJvIHBvbG/Fvmt5IHZlIGNvbW1hbmQgYmFydSAqL1xyXG4gICAgICAgIHByaXZhdGUgY3JlYXRlQWN0aW9ucygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWRkUmFuZ2UoIFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdFNhdmU6IHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0U2F2ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlVsb8W+aXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJmYS1mbG9wcHktb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5hxI10ZW7DrSBkYXQgeiBmb3JtdWzDocWZZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZ5bSA9IHRoYXQucHJlY3RpRm9ybXVsYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2eW0gIT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2eW0uZ2VuZXJvdmF0X2NqID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmtvbnRyb2xhUG9saVByZWRVbG96ZW5pbSh2eW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0Q2xvc2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlphdsWZw610XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktd2luZG93LWNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RTYXZlR2VuOiB7IC8vIFVsb8W+ZW7DrSBhIHZ5Z2VuZXJvdsOhbsOtIMSMSi9abmHEjWt5IHBva3VkIGplIHpuYcSNa2EgcHLDoXpkbsOhLCBwb2t1ZCBuZW7DrSB0YWsgc2UgbmV6b2JyYXrDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFNhdmVHZW5cIiwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IGBHZW5lcm92YXQgYSB1bG/Fvml0ICgke3RoaXMucGFyYW1zLmRkcF90eHRfbnZ5Y2p0fSlgLCAvLyBtb8W+bsOhIG5lbsOtIGltcGxlbWVudG92w6Fub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5hxI10ZW7DrSBkYXQgeiBmb3JtdWzDocWZZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZ5bSA9IHRoYXQucHJlY3RpRm9ybXVsYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2eW0gIT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2eW0uZ2VuZXJvdmF0X2NqID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmtvbnRyb2xhUG9saVByZWRVbG96ZW5pbSh2eW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIFN0YXR1c2JhclxyXG4gICAgICAgIC8qKiBGdW5rY2Uga3RlcsOhIHZvbMOhIGRlZmluaWNlIGplZG5vdGxpdsO9Y2ggcG9sb8W+ZWsgc3RhdHVzIGJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIG5hc3RhdmVuaVN0YXR1c0JhcnUoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5zdGF0dXNTdGF2RG9rdW1lbnR1KCk7XHJcbiAgICAgICAgICAgIHRoYXQuc3RhdHVzRGlsY2lWeXBvY2V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogTmFzdGF2ZW7DrSBzdGF2dSBkb2t1bWVudHUgZG8gc3RhdHVzIGJhcnUgKGFrdGl2aXRhLCBwxZnDrXpuYWsgdGlza3UsIHZ5cHJhdmVuw60gKi9cclxuICAgICAgICBwcml2YXRlIHN0YXR1c1N0YXZEb2t1bWVudHUoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBkZWZhdWx0VHlwZSA9IEVrby5VdGlscy5SZWNvcmRGb3JtYXRUeXBlLk5lcHJlY3Rlbm8udG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB2YXIgc190aXMgPSB0aGF0Lm1vZGVsLnNfdGlzO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChzX3Rpcykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgICAgIEVrby5EZXRhaWwuU3RhdHVzQmFyLnVwZGF0ZUl0ZW0odGhhdC5zdGF0dXNlcyFbXCJzdGF0dXNCYXJUaXNrXCJdISwgXCJQxZlpcHJhdmVubyBrIHRpc2t1XCIsIGRlZmF1bHRUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICAgICAgRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbSh0aGF0LnN0YXR1c2VzIVtcInN0YXR1c0JhclRpc2tcIl0hLCBcIlZ5dGnFoXTEm25vXCIsIGRlZmF1bHRUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbSh0aGF0LnN0YXR1c2VzIVtcInN0YXR1c0JhclRpc2tcIl0hLCBcIk5ldnl0acWhdMSbbm9cIiwgZGVmYXVsdFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0X3Z5cCA9IHRoYXQubW9kZWwuZGF0X3Z5cDtcclxuICAgICAgICAgICAgdmFyIHRleHREYXRWeXA6IHN0cmluZztcclxuICAgICAgICAgICAgaWYgKGRhdF92eXAgPT0gbnVsbCkgdGV4dERhdFZ5cCA9IFwiT2Rlc2zDoW5vXCI7XHJcbiAgICAgICAgICAgIGVsc2UgdGV4dERhdFZ5cCA9IFwiTmVvZGVzbMOhbm9cIjtcclxuXHJcbiAgICAgICAgICAgIEVrby5EZXRhaWwuU3RhdHVzQmFyLnVwZGF0ZUl0ZW0odGhpcy5zdGF0dXNlcyFbXCJzdGF0dXNCYXJWeXByYXZlbmlcIl0hLCB0ZXh0RGF0VnlwLCBkZWZhdWx0VHlwZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWt0aXZpdGEgPSB0aGF0Lm1vZGVsLmFrdGl2aXRhO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGFrdGl2aXRhKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDUwMDpcclxuICAgICAgICAgICAgICAgICAgICBFa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKHRoYXQuc3RhdHVzZXMhW1wic3RhdHVzQmFyQWt0aXZpdGFcIl0hLCBcIk5lYWt0aXZuw61cIiwgXCJnZ3JpZC1jb25kZi10ZXh0LWdyYXlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDkwMDpcclxuICAgICAgICAgICAgICAgICAgICBFa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKHRoYXQuc3RhdHVzZXMhW1wic3RhdHVzQmFyQWt0aXZpdGFcIl0hLCBcIlpydcWhZW5cIiwgXCJnZ3JpZC1jb25kZi10ZXh0LXB1cnBsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbSh0aGF0LnN0YXR1c2VzIVtcInN0YXR1c0JhckFrdGl2aXRhXCJdISwgXCJBa3Rpdm7DrVwiLCBkZWZhdWx0VHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBOYXN0YXZlbsOtIGTDrWzEjcOtaG8gdsO9cG/EjXR1IGRvIHN0YXR1cyBiYXJ1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0dXNEaWxjaVZ5cG9jZXQoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRpbGNpVnlwb2NldCA9IHRoYXQubW9kZWwuZGlsY2lfdnlwb2NldDtcclxuICAgICAgICAgICAgdmFyIGl4cE52eU5hZCA9IHRoYXQubW9kZWwuaXhwX252eV9uYWQ7IC8vIG5hZMWZYXplbsOpIHZ5bcOhaMOhbsOtXHJcbiAgICAgICAgICAgIHZhciBpeHBOdnkgPSB0aGF0Lm1vZGVsLml4cF9udnk7XHJcblxyXG4gICAgICAgICAgICB2YXIgenByYXZhOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmIChkaWxjaVZ5cG9jZXQpIHtcclxuICAgICAgICAgICAgICAgIHpwcmF2YSA9IGl4cE52eSAhPT0gaXhwTnZ5TmFkXHJcbiAgICAgICAgICAgICAgICAgICAgPyBgVGVudG8gesOhem5hbSBvIHZ5bcOhaMOhbsOtIGplIHNvdcSNw6FzdCBzbG91xI1lbsOpaG8gdnltYWjDoW7DrSAoJHtpeHBOdnlOYWR9KSFgXHJcbiAgICAgICAgICAgICAgICAgICAgOiBcIlRlbnRvIHrDoXpuYW0gbyB2eW3DoWjDoW7DrSBqZSBkw61sxI3DrW0gdsO9cG/EjXRlbSBwcm8gdnltYWjDoW7DrSBwxZllcyB2w61jZSBsZXQhXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbSh0aGF0LnN0YXR1c2VzIVtcInN0YXR1c0JhckRpbGNpVnlwb2NldFwiXSEsIHpwcmF2YSwgXCJnZ3JpZC1jb25kZi10ZXh0LWdyZWVuXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUG9rdWQgbmVuw60gZMOtbMSNw60gdsO9cG/EjWV0LCB0YWsgc2Ugb2RzdHJhbsOtIHN0YXR1cyBiYXIgKGFieSB0byBieWxvIMSNaXN0w6kpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmQoJ1tkYXRhLXBhcmFtLWlkPVwic3RhdHVzU2VwYXJhdG9yM1wiXScpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5maW5kKCdbZGF0YS1wYXJhbS1pZD1cInN0YXR1c0JhckRpbGNpVnlwb2NldFwiXScpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBOYXN0YXbDrSBzZSB6ZGEgamUgJ0hsYXZuw60nIHDFmcOtc3R1cG7DoVxyXG4gICAgICAgICAgICBjb25zdCBpc0VuYWJsZWQgPSBpeHBOdnkgIT09IGl4cE52eU5hZDtcclxuICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdEhsYXZuaT8uZW5hYmxlZChpc0VuYWJsZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE5hc3RhdmVuw60gaW5mb3JtYWNlIHN1bXkgZG8gc3RhdHVzIGJhcnUgKi9cclxuICAgICAgICBwcml2YXRlIHN0YXR1c1N1bWFJbmZvKHN1bWFWeW06IGFueSkgeyBcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgY1Z5bSA9IHRoYXQubW9kZWwuY192eW07XHJcbiAgICAgICAgICAgIHZhciB6cHJhdmEgPSBcIlwiO1xyXG4gICAgICAgICAgICBpZiAoc3VtYVZ5bSAhPSAwICYmIHN1bWFWeW0gIT0gY1Z5bSkge1xyXG4gICAgICAgICAgICAgICAgenByYXZhID0gXCJOZXNvdWhsYXPDrSBjZWxrb3bDoSDEjcOhc3RrYSBhIMSNw6FzdGthIHBvbG/FvmVrIHZ5bcOhaMOhbsOtIVwiO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICBFa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKHRoYXQuc3RhdHVzZXMhW1wic3RhdHVzQmFyU3VtYUluZm9cIl0hLCB6cHJhdmEsIFwiZ2dyaWQtY29uZGYtdGV4dC1yZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gRXh0ZXJuw60gc3ViamVrdHlcclxuICAgICAgICBwcml2YXRlIGFkZFBhbmVsKGZvcm06IGFueSwgZHRvOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBmb3JtLmFkZEZpZWxkKFwiZ2Jhc2VwYW5lbFwiLCB7XHJcbiAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZTogR29yZGljLlByZWZhYnMuUGFuZWxzLmtwaUljb25Ud29Sb3dzVGV4dFRlbXBsYXRlKCkuaXRlbVRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5EYXRhLlZpZXcoW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsc0RpcmVjdGlvbjogXCJ2ZXJ0aWNhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5VGV4dDogZHRvLm5hemV2X2VzdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGV4dDogZHRvLml4c19lc3VcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdIGFzIGFueSksXHJcbiAgICAgICAgICAgICAgICBpdGVtYWN0aW9uOiAoZWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2eWJyYW55UGFuZWwgPSBlbC50YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmRDbGFzcyA9ICQodnlicmFueVBhbmVsKS5maW5kKFwiLmltcG9ydGFudC12YWx1ZVwiKTsgLy8gemppxaF0xJtuw60gemRhIHNlbGVjdGVkIG3DoSBjbGFzc3UgaW1wb3J0YW50LXZhbHVlIChqZSB0ZcSPIHZ5YnJhbsOhKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5kQ2xhc3MubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUG9rdWQga2xpa251dMOhIHBvbG/FvmthIG5lbsOtIGppxb4gYWt0aXZvdsOhbmEsIHRhayBwb2tyYcSNb3ZhdCBkw6FsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnlWeWJyYW55UGFuZWwgPSB0aGF0LmZpbmQoXCIuaW1wb3J0YW50LXZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHN0YXJ5VnlicmFueVBhbmVsKS5yZW1vdmVDbGFzcyhcImltcG9ydGFudC12YWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByaW1hcnlUZXh0ID0gJCh2eWJyYW55UGFuZWwpLmZpbmQoXCIuZy1rcGktbXVsdGlyb3ctYm9keS1wcmltYXJ5VGV4dFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmltYXJ5VGV4dC5hZGRDbGFzcyhcImltcG9ydGFudC12YWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiaXhzX2VzdVwiKS5nZmllbGQoXCJzZXRJbml0aWFsXCIsIHsgaXhzX2VzdTogZHRvLml4c19lc3UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZvcm07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG5hYmlka2FFU1UoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIG1vZGVsRVNVID0gdGhhdC5tb2RlbEVTVTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtRVNVXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTAtMTItMCwgTS0wLTEyLTAsIFMtMC0xMi0wXCIgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYWt0dWFsbmlFU1U6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlFU1VEdG9bXSA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgZG90U3ViVnltOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRVNVRHRvW10gPSBbXTtcclxuICAgICAgICAgICAgdmFyIGRvdFN1YlByaXBERFA6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlFU1VEdG9bXSA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgZXN1RERQOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRVNVRHRvW10gPSBbXTtcclxuICAgICAgICAgICAgdmFyIG5hcFByaXA6IEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlFU1VEdG9bXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb2RlbEVTVS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChtb2RlbEVTVVtpXS5wb3JhZGkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6IC8vIEFrdHXDoWxuw60gRVNVXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFrdHVhbG5pRVNVLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9yYWRpOiBtb2RlbEVTVVtpXS5wb3JhZGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXpldl9lc3U6IG1vZGVsRVNVW2ldLm5hemV2X2VzdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19lc3U6IG1vZGVsRVNVW2ldLml4c19lc3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjogLy8gRG90xI1lbsO9IHN1Ympla3Qgdnltw6Fow6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgZG90U3ViVnltLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9yYWRpOiBtb2RlbEVTVVtpXS5wb3JhZGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXpldl9lc3U6IG1vZGVsRVNVW2ldLm5hemV2X2VzdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19lc3U6IG1vZGVsRVNVW2ldLml4c19lc3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogLy8gRG90xI1lbsO9IHN1Ympla3QgcMWZw61wYWR1IEREUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RTdWJQcmlwRERQLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9yYWRpOiBtb2RlbEVTVVtpXS5wb3JhZGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXpldl9lc3U6IG1vZGVsRVNVW2ldLm5hemV2X2VzdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19lc3U6IG1vZGVsRVNVW2ldLml4c19lc3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDogLy8gRVNVIG5hIHDFmcOtcGFkdSBERFBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZXN1UHJpcGFkdUREUCA9IG1vZGVsRVNVW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZXN1RERQLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9yYWRpOiBtb2RlbEVTVVtpXS5wb3JhZGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXpldl9lc3U6IG1vZGVsRVNVW2ldLm5hemV2X2VzdSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4c19lc3U6IG1vZGVsRVNVW2ldLml4c19lc3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTogLy8gTmFwb2plbsO9IHDFmcOtcGFkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hcFByaXAucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3JhZGk6IG1vZGVsRVNVW2ldLnBvcmFkaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hemV2X2VzdTogbW9kZWxFU1VbaV0ubmF6ZXZfZXN1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXhzX2VzdTogbW9kZWxFU1VbaV0uaXhzX2VzdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChha3R1YWxuaUVTVS5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRTZWN0aW9uKFwiQWt0dcOhbG7DrSBFU1VcIilcclxuICAgICAgICAgICAgICAgIGFrdHVhbG5pRVNVLmZvckVhY2goKHByaXBhZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0gPSB0aGF0LmFkZFBhbmVsKGZvcm0sIHByaXBhZCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZG90U3ViVnltLmxlbmd0aCAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLmFkZFNlY3Rpb24oXCJEb3TEjWVuw70gc3ViamVrdCB2eW3DoWjDoW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgZG90U3ViVnltLmZvckVhY2goKHByaXBhZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm0gPSB0aGF0LmFkZFBhbmVsKGZvcm0sIHByaXBhZCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZG90U3ViUHJpcEREUC5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRTZWN0aW9uKFwiRG90xI1lbsO9IHN1Ympla3QgcMWZw61wYWR1IEREUFwiKVxyXG4gICAgICAgICAgICAgICAgZG90U3ViUHJpcEREUC5mb3JFYWNoKChwcmlwYWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtID0gdGhhdC5hZGRQYW5lbChmb3JtLCBwcmlwYWQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGVzdUREUC5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybS5hZGRTZWN0aW9uKFwiRVNVIG5hIHDFmcOtcGFkdSBERFBcIilcclxuICAgICAgICAgICAgICAgIGVzdUREUC5mb3JFYWNoKChwcmlwYWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtID0gdGhhdC5hZGRQYW5lbChmb3JtLCBwcmlwYWQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG5hcFByaXAubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uYWRkU2VjdGlvbihcIk5hcG9qZW7DvSBwxZnDrXBhZFwiKVxyXG4gICAgICAgICAgICAgICAgbmFwUHJpcC5mb3JFYWNoKChwcmlwYWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtID0gdGhhdC5hZGRQYW5lbChmb3JtLCBwcmlwYWQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGZpbmFsRm9ybSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgZm9ybSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmVsZW1lbnQuZ3NpZGViYXIoXCJnZXRQYW5lbFwiLCBcInNpZGVQYW5lbEVTVVwiKS5lbXB0eSgpO1xyXG4gICAgICAgICAgICB0aGF0LmVsZW1lbnQuZ3NpZGViYXIoXCJnZXRQYW5lbFwiLCBcInNpZGVQYW5lbEVTVVwiKS5hcHBlbmQoZmluYWxGb3JtKTtcclxuICAgICAgICAgICAgLy8gesOtc2vDoW7DrSBwb2zDrcSNZWsgdiBzaWRlUGFuZWx1XHJcbiAgICAgICAgICAgIHZhciBmaWVsZHNFU1U6IEpRdWVyeTxIVE1MRWxlbWVudD4gPSB0aGF0LmVsZW1lbnQuZ3NpZGViYXIoXCJnZXRQYW5lbFwiLCBcInNpZGVQYW5lbEVTVVwiKS5maW5kKCdbbmFtZT1cImJhc2VQYW5lbEl0ZW1fMFwiXScpO1xyXG4gICAgICAgICAgICAvLyBOYXN0YXZlbsOtIENTUyBkZWZhdWx0bsOtaG8gdnlicmFuw6lobyBFU1VcclxuICAgICAgICAgICAgJChmaWVsZHNFU1VbMF0pLmZpbmQoXCIuZy1rcGktbXVsdGlyb3ctYm9keS1wcmltYXJ5VGV4dFwiKS5hZGRDbGFzcyhcImltcG9ydGFudC12YWx1ZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBaw6FrbGFkbsOtIGluZm9ybWFjZVxyXG4gICAgICAgIGNyZWF0ZUZvcm1CYXNpY0luZm8oZWw6IEpRdWVyeTxIVE1MRWxlbWVudD4pIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbmV1cmNlbnlLcm9rVnltVmFsaWRhdG9yID0gbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2UoKTtcclxuXHJcbiAgICAgICAgICAgIG5ldXJjZW55S3Jva1Z5bVZhbGlkYXRvci5nZXRNZXNzYWdlID0gKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJOZW7DrSBwb3ZvbGVubyB2eWJyYXQgbmV1csSNZW7DvSBrcm9rIHZ5bcOhaMOhbsOtIVwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBuZXVyY2VueUtyb2tWeW1WYWxpZGF0b3IudmFsaWRhdGUgPSAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGF2VnltID0gdmFsdWUuc3Rhdl92eW0gPz8gMDtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF2VnltID09IDApIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtQmFzaWNJbmZvXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDNNMlMxLCBMLTEyLTEyLTAsIE0tNC04LTAsIFMtMTItMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiS3JvayB2eW3DoWjDoW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBQcmVmYWJzLlNlbGVjdC5zdGF2VnltYWhhbmlEZXRhaWwoKSwgeyAvLyBOYWNpc3RTdGF2eVZ5bWFoYW5pRGxlU2t1cGlueVZ5bWFoYW5pXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzdGF2X3Z5bVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIm1vZGVsLnN0YXZfdnltPXZhbHVlLnN0YXZfdnltLCBtb2RlbC5zdGF2X3Z5bV90eHQ9dmFsdWUuc3Rhdl92eW1fdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpLCBuZXVyY2VueUtyb2tWeW1WYWxpZGF0b3JdLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGl4c19za3Y6IG5ldyBHb3JkaWMuRm9ybXMuRGVwZW5kZW5jeShcIml4c19za3ZcIiwgXCJpeHNfc2t2XCIsIHRydWUpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIHN0YXZfdnltOiB0aGF0Lm1vZGVsLnN0YXZfdnltXHJcbiAgICAgICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIk9ka2F6IG5hIHZ5bcOhaMOhbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LkRkcGNzdnlERFAoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl92eW1fb2xkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwibW9kZWwuc3Rhdl92eW1fb2xkID0gdmFsdWUuc3Rhdl92eW0sIG1vZGVsLnN0YXZfdnltX29sZF90eHQ9dmFsdWUuc3Rhdl92eW1fdHh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBha3Rpdml0YTogMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJJbnRlcnZhbCB2eW3DoWjDoW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2ludGVydmFsYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92eW1cIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgbGV0IHBvem5hbWthID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtUG96bmFta2FcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMLTEyLTEyLTAsIE0tMTItMTItMCwgUy0xMi0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3puw6Fta2FcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicG96bmFta2FcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8oZWwpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyhlbCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHBvem5hbWthKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNyZWF0ZUZvcm1aYXNpbGthKGVsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1aYXNpbGthXCIsIGxheW91dERlc2NyaXB0b3I6IEdvcmRpYy5Fa28uRGV0YWlsLmhlYWRlckxheW91dERlc2NyaXB0b3IzQ29scyB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIHBvc2xlZG7DrWhvIG9kZXNsw6Fuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92eXBcIixcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBuYWJ5dMOtIHByw6F2bsOtIG1vY2lcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9wbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNwb2N0aURhdHVteSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3RhdiBkb3J1xI1lbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFByZWZhYnMuU2VsZWN0LmRkcGNzZG8oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic3Rhdl9kb3J1Y1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInN0YXZfZG9ydWM9c3Rhdl9kb3J1Y1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKF9ldiwgb2JqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudmFsdWUgIT0gbnVsbCAmJiBvYmoudmFsdWUuc3Rhdl9kb3J1YyA9PSAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwiZGF0X2RvcnVjXCIpLmdmaWVsZChcInNldFZhbGlkYXRvcnNcIiwgW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcygpLmdmb3JtKFwiaXNWYWxpZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZpZWxkcyhcImRhdF9kb3J1Y1wiKS5nZmllbGQoXCJzZXRWYWxpZGF0b3JzXCIsIFtdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gdnlrb25hdGVsbm9zdGlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF92eWtvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNwb2N0aURhdHVteSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gZG9ydcSNZW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9kb3J1Y1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNwb2N0aURhdHVteSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gcHJvbWzEjWVuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRhdF9wcm9tXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8oZWwpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTsgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVGb3JtVnltYWhhbmFDYXN0a2EoZWw6IEpRdWVyeTxIVE1MRWxlbWVudD4pIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgbnVsb3ZhQ2FzdGthVmFsaWRhdG9yID0gbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkJhc2UoKTtcclxuXHJcbiAgICAgICAgICAgIG51bG92YUNhc3RrYVZhbGlkYXRvci5nZXRNZXNzYWdlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiTmEgdnlicmFuw6ltIGtyb2t1IHZ5bcOhaMOhbsOtIG5lbsOtIGRvdm9sZW5vIG51bG92w6kgdnltw6Fow6Fuw60hXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG51bG92YUNhc3RrYVZhbGlkYXRvci52YWxpZGF0ZSA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1WYWx1ZSA9IHRoYXQucGFyYW1zLmRkcF92eW1fcG92bnVsID8/IFwiOTZcIjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyYW1MaXN0ID0gcGFyYW1WYWx1ZS50b1N0cmluZygpLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXZWeW1GaWVsZCA9IHRoYXQuZmluZEZpZWxkcyhcInN0YXZfdnltXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF2VnltRmllbGQgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGF2VnltID0gc3RhdlZ5bUZpZWxkLnN0YXZfdnltO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGFyYW1MaXN0LmluY2x1ZGVzKHN0YXZWeW0udG9TdHJpbmcoKSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtVnltYWhhbmFDYXN0a2FcIiwgbGF5b3V0RGVzY3JpcHRvcjogR29yZGljLkVrby5EZXRhaWwuaGVhZGVyTGF5b3V0RGVzY3JpcHRvcjNDb2xzIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiQ2Vsa292w6EgxI3DoXN0a2Egdnltw6Fow6Fuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY192eW1cIixcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCksIG51bG92YUNhc3RrYVZhbGlkYXRvcl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKCkuZ2Zvcm0oXCJpc1ZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNwb2NpdGVqQ2FzdGt5VnltYWhhbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIsSMw6FzdGthL1Byb2NlbnRvIHBlbsOhbGVcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTZcIiwgeyAvLyBvZGXEjXRlIHNlIG9kIHZ5bcOhaGHDqWhvIGRsdWh1XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX3BlblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3BvY2l0ZWpDYXN0a3lWeW1haGFuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy02XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByb2NfcGVuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJWeW3DoWhhbsOhIMSNw6FzdGthXCIpXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfdnltX3pha1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3BvY2l0ZWpDZWxrb3ZvdUNhc3RreVZ5bWFoYW5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCLEjMOhc3RrYSBwb2t1dHlcIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgeyBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImNfcG9rXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5SZXF1aXJlZCgpXSxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zcG9jaXRlakNhc3RreVZ5bWFoYW5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJOw6FrbGFkeSDFmcOtemVuw61cIilcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY19uYWtfcml6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc3BvY2l0ZWpDYXN0a3lWeW1haGFuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiTsOha2xhZHkgZXhla3VjZVwiKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjX2V4ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNwb2NpdGVqQ2FzdGt5VnltYWhhbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyhlbCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pOyAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIE9zdGF0bsOtIHZ5bcOhaMOhbsOtIG5hIHDFmcOtcGFkdSBERFBcclxuICAgICAgICBjcmVhdGVGb3JtT3N0YXRuaVZ5bShlbDogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmdyaWRPc3RhdG5pVnltID0gJC5uZXdEaXYoKS5hcHBlbmRUbyhlbCkuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KSAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVsO9Y2hvesOtIHBvaGxlZFwiLCBfbG9ja2VkOiB0cnVlLCBfZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czpcclxuICAgICAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJOZWFrdGl2bsOtXCIsIGZvcm11bGE6IFwiSUYoTk9UKElTQkxBTksoQGVrb19ha3QpKSBhbmQgQGVrb19ha3QgPT0gNTAwLCB0cnVlLCBmYWxzZSwgZmFsc2UpXCIsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuZ3JheSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJacnXFoWVuXCIsIGZvcm11bGE6IFwiSUYoTk9UKElTQkxBTksoQGVrb19ha3QpKSBhbmQgQGVrb19ha3QgPT0gOTAwLCB0cnVlLCBmYWxzZSwgZmFsc2UpXCIsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQucHVycGxlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG11bHRpOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJncmlkT3N0YXRuaVZ5bVwiLFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczogQ29tbW9uLkdyaWRGb3JtYXRzLk9zdGF0bmlWeW1haGFuaUREUCgpXHJcbiAgICAgICAgICAgIH0pLmdncmlkcm93c2NhbGMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBaw6FzaWxreVxyXG4gICAgICAgIGNyZWF0ZUZvcm1aYXNpbGt5KGVsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZFphc2lsa3kgPSAkLm5ld0RpdigpLmFwcGVuZFRvKGVsKS5nYXV0b2ZpdCh7IHJlc2l6ZXJzT25UYWI6IGZhbHNlIH0pICBcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVsO9Y2hvesOtIHBvaGxlZFwiLCBfbG9ja2VkOiB0cnVlLCBfZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJEb3J1Y2VuZVwiLCBmb3JtdWxhOiBcIklGKEBzX2RvciA+IDAsIHRydWUsIGZhbHNlLCBmYWxzZSlcIiwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ibHVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJTdG9ybm9cIiwgZm9ybXVsYTogXCJJRihAc19kb3IgPT0gOTAsIHRydWUsIGZhbHNlLCBmYWxzZSlcIiwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5yZWQgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFphc2lsa3lcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuWmFzaWxreVZ5bWFoYW5pKClcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gRMOtbMSNw60gdnltw6Fow6Fuw60gKG5hcG9qZW7DqSlcclxuICAgICAgICBjcmVhdGVGb3JtRGlsY2lWeW1haGFuaShlbDogSlF1ZXJ5PEhUTUxFbGVtZW50PikgeyAvLyBVUDc2WDAwMjUwRzZcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5ncmlkRGlsY2lWeW1haGFuaSA9ICQubmV3RGl2KCkuYXBwZW5kVG8oZWwpLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVsO9Y2hvesOtIHBvaGxlZFwiLCBfbG9ja2VkOiB0cnVlLCBfZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJOZWFrdGl2bsOtXCIsIGZvcm11bGE6IFwiSUYoTk9UKElTQkxBTksoQGFrdGl2aXRhKSkgYW5kIEBha3Rpdml0YSA9PSA1MDAsIHRydWUsIGZhbHNlLCBmYWxzZSlcIiwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ncmF5IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJacnXFoWVuXCIsIGZvcm11bGE6IFwiSUYoTk9UKElTQkxBTksoQGFrdGl2aXRhKSkgYW5kIEBha3Rpdml0YSA9PSA5MDAsIHRydWUsIGZhbHNlLCBmYWxzZSlcIiwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5wdXJwbGUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbXVsdGk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZERpbGNpVnltYWhhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuRGlsY2lWeW1haGFuaUREUCgpXHJcbiAgICAgICAgICAgICAgICB9KS5nZ3JpZHJvd3NjYWxjKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gUMWZZWRjaG96w60ga3Jva3kgdnltw6Fow6Fuw61cclxuICAgICAgICBjcmVhdGVGb3JtUHJlZGNob3ppS3Jva3lWeW0oZWw6IEpRdWVyeTxIVE1MRWxlbWVudD4pIHsgLy9VUDc2WDAwMjRaRDVcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IHpydXNlbmUgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInpydXNlbmVGb3JtUHJlZFZ5bVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwtMC0yLTAsIE0tMC0xMi0wLCBTLTAtMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6b2JyYXppdF96cnVzZW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiWm9icmF6aXQgenJ1xaFlbsOpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoX2V2LCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRlcjogYW55ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5peHAgPSB0aGF0Lm1vZGVsLml4cF9kZHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5peHBfbnZ5ID0gdGhhdC5peHBOdnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci56b2JyYXppdF96cnVzZW5lID0gdmFsLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRQcmVkY2hvemlWeW1acnVzKGZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8oZWwpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCB6cnVzZW5lKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZ3JpZFByZWRjaG96aUtyb2t5VnltID0gJC5uZXdEaXYoKS5hcHBlbmRUbyhlbCkuZ2F1dG9maXQoeyByZXNpemVyc09uVGFiOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgLmdncmlkKHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dOdW1iZXJzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJWw71jaG96w60gcG9obGVkXCIsIF9sb2NrZWQ6IHRydWUsIF9kZWZhdWx0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRlc2NyaXB0aW9uOiBcIk5lYWt0aXZuw61cIiwgZm9ybXVsYTogXCJJRihOT1QoSVNCTEFOSyhAYWt0aXZpdGEpKSBhbmQgQGFrdGl2aXRhID09IDUwMCwgdHJ1ZSwgZmFsc2UsIGZhbHNlKVwiLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LmdyYXkgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRlc2NyaXB0aW9uOiBcIlpydcWhZW5cIiwgZm9ybXVsYTogXCJJRihOT1QoSVNCTEFOSyhAYWt0aXZpdGEpKSBhbmQgQGFrdGl2aXRhID09IDkwMCwgdHJ1ZSwgZmFsc2UsIGZhbHNlKVwiLCB0ZXh0OiBHb3JkaWMuQ29tcG9uZW50cy5HcmlkLkNvbmRGb3JtYXRzLkNvbmRGb3JtYXRUZXh0LnB1cnBsZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZGVzY3JpcHRpb246IFwiRGF0dW0gcG9zbGVkbsOtaG8gb2Rlc2zDoW7DrVwiLCBmb3JtdWxhOiBcIklGKE5PVChJU0JMQU5LKEBkYXRfdnlwKSksIHRydWUsIGZhbHNlLCBmYWxzZSlcIiwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ibHVlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0gXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUHJlZGNob3ppS3Jva3lWeW1cIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuUHJlZGNob3ppS3Jva3lWeW1haGFuaSgpXHJcbiAgICAgICAgICAgICAgICB9KS5nZ3JpZHJvd3NjYWxjKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2FkUHJlZGNob3ppVnltWnJ1cyhpeHBGaWx0ZXI6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJsb2FkUHJlY2hvemlWeW1acnVzXCIsIHRleHQ6IFwiTmHEjcOtdMOhbsOtIGRhdCAoUMWZZWRjaG96w60ga3Jva3kgdnltw6Fow6Fuw60pXCIgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLmxpc3RQcmVkS3Jva3lWeW0oXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczogaXhwRmlsdGVyXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApLmdldCgpLmRvbmUoZnVuY3Rpb24gKGR0bykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkdG8uZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmdyaWRQcmVkY2hvemlLcm9reVZ5bS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImxvYWRQcmVjaG96aVZ5bVpydXNcIiB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gTsOhc2xlZHVqw61jw60ga3Jva3kgdnltw6Fow6Fuw60gKG5hcG9qZW7DqSlcclxuICAgICAgICBjcmVhdGVGb3JtTmFzbGVkdWppY2lLcm9reVZ5bShlbDogSlF1ZXJ5PEhUTUxFbGVtZW50PikgeyAvLyBVUDc2WDAwMjRaQkZcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IHpydXNlbmUgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInpydXNlbmVGb3JtTmFzbFZ5bVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwtMC0yLTAsIE0tMC0xMi0wLCBTLTAtMTItMFwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KClcclxuICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdjaGVja1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ6b2JyYXppdF96cnVzZW5lXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwiWm9icmF6aXQgenJ1xaFlbsOpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiAoX2V2LCB2YWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRlcjogYW55ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5peHAgPSB0aGF0Lm1vZGVsLml4cF9kZHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5peHBfbnZ5ID0gdGhhdC5peHBOdnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci56b2JyYXppdF96cnVzZW5lID0gdmFsLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWROYXNsZWR1amljaVZ5bVpydXMoZmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyhlbCkuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIHpydXNlbmUpO1xyXG5cclxuICAgICAgICAgICAgdGhhdC5ncmlkTmFzbGVkdWppY2lLcm9reVZ5bSA9ICQubmV3RGl2KCkuYXBwZW5kVG8oZWwpLmdhdXRvZml0KHsgcmVzaXplcnNPblRhYjogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgIC5nZ3JpZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93TnVtYmVyczogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiVsO9Y2hvesOtIHBvaGxlZFwiLCBfbG9ja2VkOiB0cnVlLCBfZGVmYXVsdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJOZWFrdGl2bsOtXCIsIGZvcm11bGE6IFwiSUYoTk9UKElTQkxBTksoQGFrdGl2aXRhKSkgYW5kIEBha3Rpdml0YSA9PSA1MDAsIHRydWUsIGZhbHNlLCBmYWxzZSlcIiwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5ncmF5IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBkZXNjcmlwdGlvbjogXCJacnXFoWVuXCIsIGZvcm11bGE6IFwiSUYoTk9UKElTQkxBTksoQGFrdGl2aXRhKSkgYW5kIEBha3Rpdml0YSA9PSA5MDAsIHRydWUsIGZhbHNlLCBmYWxzZSlcIiwgdGV4dDogR29yZGljLkNvbXBvbmVudHMuR3JpZC5Db25kRm9ybWF0cy5Db25kRm9ybWF0VGV4dC5wdXJwbGUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGRlc2NyaXB0aW9uOiBcIkRhdHVtIHBvc2xlZG7DrWhvIG9kZXNsw6Fuw61cIiwgZm9ybXVsYTogXCJJRihOT1QoSVNCTEFOSyhAZGF0X3Z5cCkpLCB0cnVlLCBmYWxzZSwgZmFsc2UpXCIsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQuYmx1ZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtdWx0aTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkTmFzbGVkdWppY2lLcm9reVZ5bVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IENvbW1vbi5HcmlkRm9ybWF0cy5QcmVkY2hvemlLcm9reVZ5bWFoYW5pKClcclxuICAgICAgICAgICAgICAgIH0pLmdncmlkcm93c2NhbGMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvYWROYXNsZWR1amljaVZ5bVpydXMoaXhwRmlsdGVyOiBhbnkpIHsgXHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImxvYWROYXNsZWR1amljaVZ5bVpydXNcIiwgdGV4dDogXCJOYcSNw610w6Fuw60gZGF0IChOw6FzbGVkdWrDrWPDrSBrcm9reSB2eW3DoWjDoW7DrSlcIiB9KTtcclxuICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAubGlzdE5hc2xLcm9reVZ5bShcclxuICAgICAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiBpeHBGaWx0ZXJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkuZ2V0KCkuZG9uZShmdW5jdGlvbiAoZHRvKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGR0by5kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuZ3JpZE5hc2xlZHVqaWNpS3Jva3lWeW0uZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJsb2FkTmFzbGVkdWppY2lWeW1acnVzXCIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIFNsb8W+a3kgdnltw6FoYW7DqSDEjcOhc3RreVxyXG4gICAgICAgIGNyZWF0ZUZvcm1TbG96a3lWeW1DYXN0a3koZWw6IEpRdWVyeTxIVE1MRWxlbWVudD4pIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgbGV0IHpydXNlbmUgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcInpydXNlbmVGb3JtU2xvemt5VnltXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTC0wLTItMCwgTS0wLTEyLTAsIFMtMC0xMi0wXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coKVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInpvYnJheml0X3pydXNlbmVcIixcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJab2JyYXppdCB6cnXFoWVuw6lcIixcclxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IChfZXYsIHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLml4cCA9IHRoYXQubW9kZWwuaXhwX2RkcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLml4cF9udnkgPSB0aGF0Lml4cE52eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnpvYnJheml0X3pydXNlbmUgPSB2YWwudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZFNsb3preVZ5bUNhc3RreShmaWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKGVsKS5nZm9ybShcImNyZWF0ZUZyb21cIiwgenJ1c2VuZSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmdyaWRTbG96a3lWeW1DYXN0a3kgPSAkLm5ld0RpdigpLmFwcGVuZFRvKGVsKS5nYXV0b2ZpdCh7IHJlc2l6ZXJzT25UYWI6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd051bWJlcnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlbDvWNob3rDrSBwb2hsZWRcIiwgX2xvY2tlZDogdHJ1ZSwgX2RlZmF1bHQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRGb3JtYXRzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZGVzY3JpcHRpb246IFwiWnJ1xaFlblwiLCBmb3JtdWxhOiBcIklGKE5PVChJU0JMQU5LKEBha3Rpdml0YSkpIGFuZCBAYWt0aXZpdGEgPT0gOTAwLCB0cnVlLCBmYWxzZSwgZmFsc2UpXCIsIHRleHQ6IEdvcmRpYy5Db21wb25lbnRzLkdyaWQuQ29uZEZvcm1hdHMuQ29uZEZvcm1hdFRleHQucHVycGxlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG11bHRpOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRTbG96a3lWeW1DYXN0a3lcIixcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBDb21tb24uR3JpZEZvcm1hdHMuU2xvemt5VnltQ2FzdGt5KClcclxuICAgICAgICAgICAgICAgIH0pLmdncmlkcm93c2NhbGMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvYWRTbG96a3lWeW1DYXN0a3koaXhwRmlsdGVyOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwibG9hZFNsb3preVZ5bUNhc3RreVwiLCB0ZXh0OiBcIk5hxI3DrXTDoW7DrSBkYXQgKFNsb8W+a3kgdnltw6FoYW7DqSDEjcOhc3RreSlcIiB9KVxyXG4gICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5saXN0U2xvemt5VnltQ2FzdGt5KFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGl4cEZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5nZXQoKS5kb25lKGZ1bmN0aW9uIChkdG8pIHtcclxuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5ncmlkU2xvemt5VnltQ2FzdGt5LmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2xvemt5VnltQ2FzdGt5ID0gZHRvLmRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHN1bWFWeW06IGFueTtcclxuICAgICAgICAgICAgICAgIGlmIChkdG8uZGF0YS5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bWFWeW0gPSBkdG8uZGF0YVswXS5zdW1hX3Z5bSA/PyAwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW1hVnltID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoYXQuc3RhdHVzU3VtYUluZm8oc3VtYVZ5bSk7XHJcblxyXG4gICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJsb2FkU2xvemt5VnltQ2FzdGt5XCIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIE5hc3RhdmVuw60gZWRpdGFjZSBwb2zDrcSNZWtcclxuICAgICAgICBwcml2YXRlIG5hc3RhdmVuaUVkaXRhY2UoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdmFyIHZ5bSA9IHRoYXQubW9kZWw7XHJcbiAgICAgICAgICAgIHZhciBqZUVkaXRvdmF0ZWxueSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5qZURva2xhZEVkaXRvdmF0ZWxueSgpICYmICF0aGF0LnJlemltQ3RlbmkpIGplRWRpdG92YXRlbG55ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdmFyIGplVXphbWNlbnkgPSB0aGF0LmplVXphbWNlbmFFZGl0YWNlKCk7XHJcbiAgICAgICAgICAgIHZhciBqZVBvZGFueSA9IHZ5bS5jX3Z5bSA9PSAwOyAvLyBEb2t1ZCBqZSDEjcOhc3RrYSB2eW3DoWjDoW7DrSAwLCB0YWsgamUgamFrb2J5IHBvZGFuw70gYSBtxa/FvmUgc2UgZWRpdG92YXRcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZWRpdGFjZUNKKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBOYXN0YXZlbmkgcMWZZWTDoW7DrSBhIHDFmWlkxJtsZW7DrVxyXG4gICAgICAgICAgICBpZiAodnltLmFrdGl2aXRhICE9IDkwMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZ5bS5peHNfZnVuX2FrdCA9PSB0aGF0Lml4c0Z1bikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcmVkYW5pPy5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcmlkZWxlbmk/LmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByZXZ6ZXRpPy5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByZWRhbmk/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcmlkZWxlbmk/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcmV2emV0aT8uZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RUaXNrVllNPy5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByZWRhbmk/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByaWRlbGVuaT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJldnpldGk/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFRpc2tWWU0/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5qZVBvdm9sZW5hU2t1cGluYVByb0VkaXRhY2lTaW1wbGUoeyBpeHNTa3Y6IHZ5bS5peHNfc2t2LCB0eXBQaGw6IHZ5bS50eXBfcGhsIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHsgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXN0YXZlbmlFZGl0YWNlUG9saWNlayhqZVBvZGFueSwgamVFZGl0b3ZhdGVsbnksIGplVXphbWNlbnksIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBOYXN0YXZlbsOtIGVkaXRhY2UgYWtjw60gdiBoZWFkZXJ1XHJcbiAgICAgICAgICAgIGlmICh0aGF0LnBhcmFtcy5kZHBfcmFkX2Rva3BvdiAhPSAxKSB0aGF0LmFjdGlvbnMuYWN0UG9kYW5pPy5lbmFibGVkKGZhbHNlKTsgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vIE5hc3RhdmVuw60gYWt0aXZpdHkgdGxhxI3DrXRlayBwcm8gcHLDoWNpIHNlIHNwaXNlbVxyXG4gICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJpZGF0RG9TcGlzdT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RWeWptb3V0WmVTcGlzdT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RaYWxveml0U3Bpcz8uZW5hYmxlZChmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBQb2t1ZCBtxa/FvnUgdnltw6FoYXQgcMWZZXMgU1NMIGEgbmVuw60gdG8gZGlsxI3DrSB2w71wb8SNZXQgLSB6cMWZw61zdHVwbsOtbSB0bGHEjcOtdGthIFNTTFxyXG4gICAgICAgICAgICB2YXIgamVBa3Rpdm5pVnltYWhhbmlQcmVzU1NMID0gKE51bWJlcih0aGF0LnBhcmFtcy5kZHBfZ2VuX3NzbHNwaSA/PyAwKSA+IDAgfHwgTnVtYmVyKHRoYXQucGFyYW1zLmRkcF9zc2xfamVkc3BpID8/IDApID4gMCkgJiYgTnVtYmVyKHRoYXQucGFyYW1zLmRkcF9nZW5fc3NsemFrID8/IDApID4gMDtcclxuICAgICAgICAgICAgaWYgKGplQWt0aXZuaVZ5bWFoYW5pUHJlc1NTTCAmJiAhdnltLmRpbGNpX3Z5cG9jZXQpIHtcclxuICAgICAgICAgICAgICAgIC8vIEplIHZlIHNwaXN1IC0genDFmcOtc3R1cG7DrW0gamVuIGluZm8gYSBwb2t1ZCBtxa/FvnUgZWRpdG92YXQgdGFrIGkgdnlqbXV0w60gemUgc3Bpc3VcclxuICAgICAgICAgICAgICAgIGlmICh2eW0ud2ZsUHJvZmlsLml4cF9zcGlzICE9IHZ5bS5peHBfbnZ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGplRWRpdG92YXRlbG55ICYmICFqZVBvZGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VnlqbW91dFplU3Bpc3U/LmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoamVFZGl0b3ZhdGVsbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAuc3Bpc1ByaXBhZHVOVlkoeyBpeHNTa3Y6IHZ5bS5peHNfc2t2LCBpeHBEZHA6IHZ5bS5peHBfZGRwLCBpeHBOdnk6IHRoYXQuaXhwTnZ5LCB0eXBQaGw6IHZ5bS50eXBfcGhsIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXhwU3BpcyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOZW7DrSB2ZSBzcGlzdSwgYWxlIHNrdXBpbmEgdnltw6Fow6Fuw60gbcOhIHNwaXMgLSB1bW/Fvm7DrW0gcG91emUgcMWZaWTDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcmlkYXREb1NwaXN1Py5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHZ5bS53ZmxQcm9maWwuaXhwX3NwaXMgPT0gdnltLml4cF9udnkgJiYgaXhwU3BpcyAhPSB2eW0uaXhwX252eSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFphbG96aXRTcGlzPy5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gVGxhxI3DrXRrbyBzdG9ybm9cclxuICAgICAgICAgICAgdmFyIHZ5bWRlbCA9IHRoYXQucGFyYW1zLmRkcF9yYWRfdnltZGVsID8/IDA7XHJcbiAgICAgICAgICAgIGlmICh2eW1kZWwgPT0gMCB8fCAodnltZGVsID09IDEgJiYgdnltLml4c19mdW5fYWt0ICE9IHRoYXQuaXhzRnVuKSB8fCB2eW0uYWt0aXZpdGEgPT0gOTAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vPy5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTdG9ybm8/LmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LnBhcmFtcy5kZHBfcmFkX3Z5bXByZCAhPSAxKSB0aGF0LmFjdGlvbnMuYWN0UHJpZGVsZW5pPy5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKHRoYXQucGFyYW1zLmRkcF9yYWRfdnltcHJlICE9IDEpIHRoYXQuYWN0aW9ucy5hY3RQcmVkYW5pPy5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKHRoYXQucGFyYW1zLmRkcF9yYWRfdnltcHJpICE9IDEpIHRoYXQuYWN0aW9ucy5hY3RQcmV2emV0aT8uZW5hYmxlZChmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC56YWthemFuYVJlZGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByaWRlbGVuaT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJlZGFuaT8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJldnpldGk/LmVuYWJsZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAgICAgLy8gU2VrY2Ugc2xvxb5reSB2eW3DoWjDoW7DrVxyXG4gICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC50eXBBbGdaZVNrdXBpbnlWeW0oeyBpeHNTa3Y6IHZ5bS5peHNfc2t2IH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09IDEwICYmIGplRWRpdG92YXRlbG55ICYmICFqZVBvZGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJpZGF0U2xvPy5lbmFibGVkKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VXByYXZpdFNsbz8uZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFpydXNpdFNsbz8uZW5hYmxlZCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdE9ibm92aXRTbG8/LmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcmlwYWRTbG8/LmVuYWJsZWQodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByaWRhdFNsbz8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RVcHJhdml0U2xvPy5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFpydXNpdFNsbz8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RPYm5vdml0U2xvPy5lbmFibGVkKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByaXBhZFNsbz8uZW5hYmxlZChmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0LnptZW5Qcml6bmFrRWRpdGFjZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2Ftb3Ruw6kgbmFzdGF2ZW7DrSBwxZnDrXN0dXB1IGsgcG9sw63EjWvDoW0gKGplIG51dG5vIHB1c3RpdCBhxb4gcG8gesOtc2vDoW7DrSAncG92b2xlbsOtIHNrdXBpbnknKVxyXG4gICAgICAgICAqIEBwYXJhbSBqZVBvZGFueVxyXG4gICAgICAgICAqIEBwYXJhbSBqZUVkaXRvdmF0ZWxueVxyXG4gICAgICAgICAqIEBwYXJhbSBqZVV6YW1jZW55XHJcbiAgICAgICAgICogQHBhcmFtIGplUG92b2xlbmFTa3VwaW5hUHJvRWRpdGFjaVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbmFzdGF2ZW5pRWRpdGFjZVBvbGljZWsoamVQb2Rhbnk6IGJvb2xlYW4sIGplRWRpdG92YXRlbG55OiBib29sZWFuLCBqZVV6YW1jZW55OiBib29sZWFuLCBqZVBvdm9sZW5hU2t1cGluYVByb0VkaXRhY2k6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgLy8gbsOha2wgZXgsIG7DoWtsIMWZw616LCBza3VwaW5hIHZ5bVxyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciB2eW0gPSB0aGF0Lm1vZGVsO1xyXG4gICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSB0aGF0LmZpbmRGb3JtcyhcImZvcm1IZWFkZXJcIik7XHJcbiAgICAgICAgICAgIHZhciB2eW1Gb3JtID0gdGhhdC5maW5kRm9ybXMoXCJmb3JtVnltYWhhbmFDYXN0a2FcIik7XHJcbiAgICAgICAgICAgIHZhciBiYXNpY0Zvcm0gPSB0aGF0LmZpbmRGb3JtcyhcImZvcm1CYXNpY0luZm9cIik7XHJcbiAgICAgICAgICAgIHZhciB6YXNpbGthRm9ybSA9IHRoYXQuZmluZEZvcm1zKFwiZm9ybVphc2lsa2FcIik7XHJcbiAgICAgICAgICAgIHZhciBwb3puYW1rYUZvcm0gPSB0aGF0LmZpbmRGb3JtcyhcImZvcm1Qb3puYW1rYVwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChqZUVkaXRvdmF0ZWxueSAmJiAhamVVemFtY2VueSAmJiBqZVBvdm9sZW5hU2t1cGluYVByb0VkaXRhY2kpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LnBhcmFtcy5kZHBfcmFkX2VkaWRwciA9PSAxKSB6YXNpbGthRm9ybS5maW5kRmllbGRzKFwiZGF0X3Byb21cIikuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgemFzaWxrYUZvcm0uZmluZEZpZWxkcyhcImRhdF9kb3J1Y1wiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICB6YXNpbGthRm9ybS5maW5kRmllbGRzKFwiZGF0X3BtXCIpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIHphc2lsa2FGb3JtLmZpbmRGaWVsZHMoXCJkYXRfdnlrb25cIikuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgemFzaWxrYUZvcm0uZmluZEZpZWxkcyhcInN0YXZfZG9ydWNcIikuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgYmFzaWNGb3JtLmZpbmRGaWVsZHMoXCJkYXRfdnltXCIpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIGJhc2ljRm9ybS5maW5kRmllbGRzKFwic3Rhdl92eW1cIikuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgYmFzaWNGb3JtLmZpbmRGaWVsZHMoXCJzdGF2X3Z5bV9vbGRcIikuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgcG96bmFta2FGb3JtLmZpbmRGaWVsZHMoXCJwb3puYW1rYVwiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGplUG9kYW55IHx8IHRoYXQucGFyYW1zLmRkcF9yYWRfdnltZWRzICE9IDApIG1haW5Gb3JtLmZpbmRGaWVsZHMoXCJpeHNfc2t2XCIpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgbWFpbkZvcm0uZmluZEZpZWxkcyhcIml4c19za3ZcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoamVQb2RhbnkgfHwgdGhhdC5wYXJhbXMuZGRwX3Z5bV9lZGljc3QgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZ5bUZvcm0uZmluZEZpZWxkcyhcImNfdnltXCIpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2eW1Gb3JtLmZpbmRGaWVsZHMoXCJjX3BlblwiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdnltRm9ybS5maW5kRmllbGRzKFwiY19wb2tcIikuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZ5bUZvcm0uZmluZEZpZWxkcyhcImNfZXhlXCIpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2eW1Gb3JtLmZpbmRGaWVsZHMoXCJjX25ha19yaXpcIikuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZ5bUZvcm0uZmluZEZpZWxkcyhcInByb2NfcGVuXCIpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2eW1Gb3JtLmZpbmRGaWVsZHMoXCJjX3Z5bV96YWtcIikuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2eW1Gb3JtLmZpbmRGaWVsZHMoXCJjX3Z5bVwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZ5bUZvcm0uZmluZEZpZWxkcyhcImNfcGVuXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdnltRm9ybS5maW5kRmllbGRzKFwiY19wb2tcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2eW1Gb3JtLmZpbmRGaWVsZHMoXCJjX2V4ZVwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZ5bUZvcm0uZmluZEZpZWxkcyhcImNfbmFrX3JpelwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZ5bUZvcm0uZmluZEZpZWxkcyhcInByb2NfcGVuXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdnltRm9ybS5maW5kRmllbGRzKFwiY192eW1femFrXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGplUG9kYW55IHx8IHRoYXQucGFyYW1zLmRkcF9yYWRfdnltZHRwID09IDEpIG1haW5Gb3JtLmZpbmRGaWVsZHMoXCJkYXRfdnlzdFwiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIG1haW5Gb3JtLmZpbmRGaWVsZHMoXCJkYXRfdnlzdFwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh2eW0uYWt0aXZpdGEgIT0gOTAwICYmIHZ5bS5peHNfZnVuX2FrdCA9PSB0aGF0Lml4c0Z1biAmJiBqZVBvdm9sZW5hU2t1cGluYVByb0VkaXRhY2kpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhhdC5wYXJhbXMuZGRwX3JhZF9lZGlkcHIgPT0gMSkgemFzaWxrYUZvcm0uZmluZEZpZWxkcyhcImRhdF9wcm9tXCIpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB6YXNpbGthRm9ybS5maW5kRmllbGRzKFwiZGF0X2RvcnVjXCIpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB6YXNpbGthRm9ybS5maW5kRmllbGRzKFwiZGF0X3BtXCIpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB6YXNpbGthRm9ybS5maW5kRmllbGRzKFwiZGF0X3Z5a29uXCIpLmdmaWVsZChcImVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB6YXNpbGthRm9ybS5maW5kRmllbGRzKFwic3Rhdl9kb3J1Y1wiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcG96bmFta2FGb3JtLmZpbmRGaWVsZHMoXCJwb3puYW1rYVwiKS5nZmllbGQoXCJlbmFibGVcIik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFNhdmUhXCIsIFwiYWN0Q2xvc2VcIl0pKTtcclxuICAgICAgICAgICAgICAgICAgICB6YXNpbGthRm9ybS5maW5kRmllbGRzKFwiZGF0X3Byb21cIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB6YXNpbGthRm9ybS5maW5kRmllbGRzKFwiZGF0X2RvcnVjXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgemFzaWxrYUZvcm0uZmluZEZpZWxkcyhcImRhdF9wbVwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHphc2lsa2FGb3JtLmZpbmRGaWVsZHMoXCJkYXRfdnlrb25cIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB6YXNpbGthRm9ybS5maW5kRmllbGRzKFwic3Rhdl9kb3J1Y1wiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvem5hbWthRm9ybS5maW5kRmllbGRzKFwicG96bmFta2FcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1haW5Gb3JtLmZpbmRGaWVsZHMoXCJjal92eW1cIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIGJhc2ljRm9ybS5maW5kRmllbGRzKFwiZGF0X3Z5bVwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgdnltRm9ybS5maW5kRmllbGRzKFwiY192eW1cIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIG1haW5Gb3JtLmZpbmRGaWVsZHMoXCJkYXRfdnlzdFwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgdnltRm9ybS5maW5kRmllbGRzKFwiY19uYWtfcml6XCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICB2eW1Gb3JtLmZpbmRGaWVsZHMoXCJwcm9jX3BlblwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgdnltRm9ybS5maW5kRmllbGRzKFwiY19wZW5cIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIHZ5bUZvcm0uZmluZEZpZWxkcyhcImNfcG9rXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICBiYXNpY0Zvcm0uZmluZEZpZWxkcyhcInN0YXZfdnltXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICBiYXNpY0Zvcm0uZmluZEZpZWxkcyhcInN0YXZfdnltX29sZFwiKS5nZmllbGQoXCJkaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgbWFpbkZvcm0uZmluZEZpZWxkcyhcIml4c19za3ZcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIHZ5bUZvcm0uZmluZEZpZWxkcyhcImNfZXhlXCIpLmdmaWVsZChcImRpc2FibGVcIik7XHJcbiAgICAgICAgICAgICAgICB2eW1Gb3JtLmZpbmRGaWVsZHMoXCJjX3Z5bV96YWtcIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEtvbnRyb2xhIHpkYSBqZSBwxZnDrXBhZCB2xa9iZWMgZWRpdG92YXRlbG7DvVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBqZURva2xhZEVkaXRvdmF0ZWxueSgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gUGFyYW1ldHIgdXLEjcOtIHpkYSB1xb5pdmF0ZWwgbcWvxb5lIG5lYm8gbmVtxa/FvmUgbcSbbml0IGEgZXZpZG92YXQgdnltw6Fow6Fuw60gRERQXHJcbiAgICAgICAgICAgIHZhciBwYXJhbURva2V2diA9IHRoYXQucGFyYW1zLmRkcF9yYWRfZG9rZXZ2XHJcblxyXG4gICAgICAgICAgICAvLyBQb2t1ZCBwYXJhbWV0ciBuZW7DrSAxIG5lYm8gMiB0YWsgbmVsemUgZWRpdG92YXRcclxuICAgICAgICAgICAgaWYgKHBhcmFtRG9rZXZ2ICE9IDEgJiYgcGFyYW1Eb2tldnYgIT0gMilcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG5cclxuICAgICAgICAgICAgLy8gUG9rdWQgamUgcMWZw61wYWQgYWt0aXZuw60gYSB2bGFzdG7DrSAocG91emUgcG9rdWQgamUgbnV0bm8ga29udHJvbG92YXQgdmxhc3RuaWN0dsOtIChwYXJhbSBqZSAyKSkgbHplIGVkaXRvdmF0XHJcbiAgICAgICAgICAgIHJldHVybiAodGhhdC5tb2RlbC5ha3Rpdml0YSAhPSA5MDAgJiZcclxuICAgICAgICAgICAgICAgICh0aGF0Lm1vZGVsLml4c19mdW5fYWt0ID09IHRoYXQuaXhzRnVuIHx8IHBhcmFtRG9rZXZ2ID09IDIpKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS29udHJvbGEgemRhIGplIHV6YW3EjWVuw6EgZWRpdGFjZVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBqZVV6YW1jZW5hRWRpdGFjZSgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBTdGF2IHDFmWkga3RlcsOpbSBzZSBzdGFuZSB2eW3DoWhhY8OtIGRva3VtZW50IG5lZWRpdG92YXRlbG7DvVxyXG4gICAgICAgICAgICB2YXIgcGFyYW1TdGF6YW0gPSB0aGF0LnBhcmFtcy5kZHBfdnltX3N0YXphbTtcclxuICAgICAgICAgICAgaWYgKHBhcmFtU3RhemFtID09IDEgJiYgdGhhdC5tb2RlbC5zX3RpcyA+IDUpIHJldHVybiB0cnVlOyAvLyB2eXRpc2tudXTDvVxyXG4gICAgICAgICAgICBpZiAocGFyYW1TdGF6YW0gPT0gMiAmJiB0aGF0Lm1vZGVsLmRhdF92eXAgIT0gbnVsbCkgcmV0dXJuIHRydWU7IC8vIG5lbsOtIG9kZXNsw6FuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBaamnFoXTEm27DrSBjbyBzZSBtxa/FvmUgZMSbbGF0IHMgxIxKICovXHJcbiAgICAgICAgcHJpdmF0ZSBlZGl0YWNlQ0ooKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgLy8gVXLEjXVqZSB6ZGEgc2UgbcOhIG5lYm8gbmVtw6EgcMWZaSB0aXNrdSB2eW3DoWjDoW7DrSBnZW5lcm92YXQgxI3DrXNsbyBqZWRuYWPDrVxyXG4gICAgICAgICAgICB2YXIgcGFyYW1HZW5lY2ogPSB0aGF0LnBhcmFtcy5kZHBfdnltX2dlbmVjajtcclxuICAgICAgICAgICAgLy8gUG9rdWQgamUgZ2VuZXJvdmFuw6kgxIxKIHBhayB0byBkaXNhYmx1anVcclxuICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJmb3JtSGVhZGVyXCIpLmZpbmRGaWVsZHMoXCJjal92eW1cIikuZ2ZpZWxkKFwiZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5tb2RlbC5jal92eW0gIT0gbnVsbCAmJiAocGFyYW1HZW5lY2ogPT0gMiB8fCBwYXJhbUdlbmVjaiA9PSAzIHx8IHBhcmFtR2VuZWNqID09IDQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNvbW1hbmRCYXIodGhhdC5hY3Rpb25zLmNyZWF0ZUJhcihbXCJhY3RTYXZlIVwiLCBcImFjdENsb3NlXCJdKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1HZW5lY2ogPT0gMyB8fCBwYXJhbUdlbmVjaiA9PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRm9ybXMoXCJmb3JtSGVhZGVyXCIpLmZpbmRGaWVsZHMoXCJjal92eW1cIikuZ2ZpZWxkKFwiZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuY29tbWFuZEJhcih0aGF0LmFjdGlvbnMuY3JlYXRlQmFyKFtcImFjdFNhdmUhXCIsIFwiYWN0U2F2ZUdlblwiLCBcImFjdENsb3NlXCJdKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBabcSbbsOtIHDFmcOtem5hayBlZGl0YWNlIHBybyBhY3RQb2RhbmkgYSBhY3RTYXZlIGEgYWN0U2F2ZUdlbiBhIG5hc3RhdmVuw60gZm9ybXVsw6HFmWUsIMW+ZSBieWwgem1lbsSbbmVqLlxyXG4gICAgICAgICAqICBaYXZvbMOhIHNlIGtkeWtvbGl2IHNlIG7Em2NvIHZlIGZvcm11bMOhxZlpIHptxJtuw60uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB6bWVuUHJpem5ha0VkaXRhY2UoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LnBhcmFtcy5kZHBfcmFkX2Rva2V2diA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U2F2ZT8uZW5hYmxlZChmYWxzZSk7IFxyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFNhdmVHZW4/LmVuYWJsZWQoZmFsc2UpOyBcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhhdC5qZURva2xhZEVkaXRvdmF0ZWxueSgpICYmIHRoYXQubW9kZWwuaXhwX252eS5sZW5ndGggPT0gMTIpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTYXZlPy5lbmFibGVkKHRydWUpOyBcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTYXZlR2VuPy5lbmFibGVkKHRydWUpOyBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RTYXZlPy5lbmFibGVkKGZhbHNlKTsgXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U2F2ZUdlbj8uZW5hYmxlZChmYWxzZSk7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gRnVua2NlIHBybyBqZWRub3RsaXbDqSBha2NlIHYgbWVudWJhcnVcclxuICAgICAgICAvKiogVnl0dm/FmcOtIG5vdsOpIHZ5bcOhaMOhbsOtICovXHJcbiAgICAgICAgcHJpdmF0ZSBub3ZlVnltYWhhbmkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0LnBhcmFtcy5kZHBfdnltX3BvdnNrdiAhPSBcIlwiICYmIHRoYXQucGFyYW1zLmRkcF92eW1fcG9lc2t2ID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiTmVuw60gcG92b2xlbmEgxb7DoWRuw6Egc2t1cGluYSB2eW3DoWjDoW7DrSBwcm8gcG/FmcOtemVuw60gdnltw6Fow6Fuw60hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5wYXJhbXMuZGRwX2dlbl9peHB2eW0gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFBva3VkIGplIHBhcmFtZXRyIG5hc3RhdmVuIG5hIGhvZG5vdHUgMCwgdGFrIG1hbnXDoWxuxJsgemFkw6F2w6FtZSBpZGVudGlmaWvDoXRvclxyXG4gICAgICAgICAgICAgICAgICAgIC8vIChwb2t1ZCBqZSAxLCB0YWsgc2UgZ2VuZXJ1amUsIGFsZSB0byBqZSBhxb4gbmEgc2VydmVydSlcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwid2l6UGFyYW1zXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0wLTEyLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiSWRlbnRpZmlrw6F0b3JcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBHb3JkaWMuUHJlZmFicy5TdHJpbmcuaXhzKHRydWUpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIml4cFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlOiB0aGF0Lmdsb2JhbFNldHRpbmdzPy5nZXQoYEdsb2JhbC5XZmwuQXBwU2V0dGluZ3MuT3RoZXJzU2V0dGluZ3MuUHJlZHBsbmVuaVBJRGApID8/IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5kaWFsb2dzLnNpbXBsZUZvcm0oXCJaYWTDoW7DrSBpZGVudGlmaWvDoXRvcnVcIiwgZm9ybSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKF9vYmosIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubW9kZWwuaXhwX252eSA9IHJldFZhbC5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wb2RhbmlWeW1haGFuaSh0aGF0Lm1vZGVsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucG9kYW5pVnltYWhhbmkodGhhdC5tb2RlbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBvZMOhbsOtIG5vdsOpaG8gdnltw6Fow6Fuw61cclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcG9kYW5pVnltYWhhbmkoZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcInBvZGFuaVZ5bWFoYW5pXCIsIHRleHQ6IFwiUG9kw6Fuw60gdnltw6Fow6Fuw61cIiB9KTtcclxuICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAucG9kYW5pVnltYWhhbmlEZXRhaWxWeW0oeyBkYXRhOiBkYXRhIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInBvZGFuaVZ5bWFoYW5pXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPT0gMTIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RldGFpbFZ5bWFoYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IFwiRERQR0RldGFpbFZ5bWFoYW5pI1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cE52eTogcmVzdWx0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJOZXBvdmVkbG8gc2UgcG9kYXQgdnltw6Fow6Fuw60hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJwb2RhbmlWeW1haGFuaVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZllxI10ZSBkYXRhIHplIHbFoWVjaCBmb3JtdWzDocWZxa8gYSB6a29udHJvbHVqZSB6ZGEganNvdSB2xaFlY2hueSBwb3Zpbm7DoSBwb2xlIHZ5cGxuxJtuYVxyXG4gICAgICAgICAqIEByZXR1cm5zXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwcmVjdGlGb3JtdWxhcigpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICBsZXQgZHRvOiBHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRGV0YWlsRHRvID0ge307XHJcblxyXG4gICAgICAgICAgICAvLyBLb250cm9sYSB6ZGEganNvdSB2xaFlY2hueSBwb3Zpbm7DoSBwb2xlIHZ5cGxuxJtuYVxyXG4gICAgICAgICAgICBjb25zdCBmb3JtcyA9IFtcImZvcm1IZWFkZXJcIiwgXCJmb3JtQmFzaWNJbmZvXCIsIFwiZm9ybVphc2lsa2FcIiwgXCJmb3JtVnltYWhhbmFDYXN0a2FcIiwgXCJmb3JtUG96bmFta2FcIl07XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZm9ybU5hbWUgb2YgZm9ybXMpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKGZvcm1OYW1lKS5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGR0byk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoYXQuZmluZEZvcm1zKGZvcm1OYW1lKS5nZm9ybShcImlzVmFsaWRcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGR0by5kaWxjaV92eXBvY2V0ID0gdGhhdC5tb2RlbC5kaWxjaV92eXBvY2V0O1xyXG4gICAgICAgICAgICBkdG8udHlwX3BobCA9IHRoYXQudHlwUGhsO1xyXG4gICAgICAgICAgICB2YXIgZGF0VnltID0gdGhhdC5maW5kRm9ybXMoXCJmb3JtQmFzaWNJbmZvXCIpLmZpbmRGaWVsZHMoXCJkYXRfdnltXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBpZiAoZGF0VnltLnN0YXJ0ID09IG51bGwgfHwgZGF0VnltLmVuZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIkRhdHVtIHZ5bcOhaMOhbsOtIG5lbsOtIHZ5cGxuxJtuIVwiLCBcImVycm9yXCIpXHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcImZvcm1CYXNpY0luZm9cIikuZmluZEZpZWxkcyhcImRhdF92eW1cIikuZ2ZpZWxkKFwidmFsaWRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmZpbmRGb3JtcyhcImZvcm1CYXNpY0luZm9cIikuZmluZEZpZWxkcyhcImRhdF92eW1cIikuZ2ZpZWxkKFwiZm9jdXNcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgaXhzRXN1ID0gdGhhdC5maW5kRm9ybXMoXCJmb3JtSGVhZGVyXCIpLmZpbmRGaWVsZHMoXCJpeHNfZXN1XCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBpZiAoaXhzRXN1Lml4c19lc3UgPT0gXCIwMDAwU0UwMDAwME1cIikge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJKZSBudXRuw6kgdnlicmF0IHBsYXRuw6lobyBhZHJlc8OhdGEhXCIsIFwiZXJyb3JcIilcclxuICAgICAgICAgICAgICAgIHRoYXQuZmluZEZvcm1zKFwiZm9ybUhlYWRlclwiKS5maW5kRmllbGRzKFwiaXhzX2VzdVwiKS5nZmllbGQoXCJmb2N1c1wiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZHRvLmRhdF9vZCA9IGRhdFZ5bS5zdGFydDtcclxuICAgICAgICAgICAgZHRvLmRhdF9kbyA9IGRhdFZ5bS5lbmQ7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZHRvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogS29udHJvbGEgaG9kbm90IHYgcG9sw61jaCBwxZllZCB1bG/FvmVuw61tXHJcbiAgICAgICAgICogQHBhcmFtIHZ5bVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUga29udHJvbGFQb2xpUHJlZFVsb3plbmltKHZ5bTogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImtvbnRyb2xhUG9saVwiLCB0ZXh0OiBcIktvbnRyb2xhIHBvbMOtIHDFmWVkIHVsb8W+ZW7DrW1cIiB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBlZGl0YWNlID0gdGhhdC5qZURva2xhZEVkaXRvdmF0ZWxueSgpICYmICF0aGF0LnJlemltQ3Rlbmk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZWRpdGFjZSkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAuamVQb3ZvbGVuYVNrdXBpbmFQcm9FZGl0YWNpU2ltcGxlKHsgaXhzU2t2OiB2eW0uaXhzX3NrdiA/PyBcIlwiLCB0eXBQaGw6IHRoYXQudHlwUGhsIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKGlzRWRpdGFibGU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRWRpdGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLmplUG92b2xlbmFTa3VwaW5hVnltYWhhbmlQcm9UeXBQb2hsZWRhdmt5KHsgaXhzU2t2OiB2eW0uaXhzX3NrdiA/PyBcIlwiLCB0eXBQaGw6IHRoYXQudHlwUGhsIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKGlzQWxsb3dlZDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNBbGxvd2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodnltLml4c19za3YgPT0gXCIwMDAwQU5WMDAwMDBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtRGFuZ2Vyb3VzKFwiU2t1cGluYSB2eW3DoWjDoW7DrVwiLCBcIkplIHZ5YnLDoW5hIHNrdXBpbmEgdnltw6Fow6Fuw60gTkVVUsSMRU5PLCBjaGNldGUgb3ByYXZkdSBwb2tyYcSNb3ZhdD8gXFxuXCIsIDM1MClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKF9vYmosIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51bG96VnltYWhhbmkodnltKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHRoYXQudWxvelZ5bWFoYW5pKHZ5bSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIlNrdXBpbmEgdnltw6Fow6Fuw60gbmVuw60gcG92b2xlbmEgcHJvIHRlbnRvIHR5cCBwb2hsZWTDoXZreSwgesOhem5hbSBvIHZ5bcOhaMOhbsOtIG5lbHplIHVsb8W+aXQhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImtvbnRyb2xhUG9saVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJTa3VwaW5hIHZ5bcOhaMOhbsOtIG5lbsOtIHBvdm9sZW5hIHBybyBlZGl0YWNpLCB6w6F6bmFtIG8gdnltw6Fow6Fuw60gbmVsemUgdWxvxb5pdCFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwia29udHJvbGFQb2xpXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJDaHliYSBwxZlpIGtvbnRyb2xlIHNrdXBpbnkgdnltw6Fow6Fuw60hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwia29udHJvbGFQb2xpXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHRoYXQudWxvelZ5bWFoYW5pKHZ5bSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbG/FvmVuw60gdnltw6Fow6Fuw61cclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgdWxvelZ5bWFoYW5pKGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBpc1ZhbGlkID0gdGhhdC5maW5kRm9ybXMoKS5nZm9ybShcImlzVmFsaWRcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNWYWxpZCkgeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBkb2t1bWVudDogYW55ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEodGhhdC5qZVBvZGFueSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBkb2t1bWVudFxyXG4gICAgICAgICAgICAgICAgICAgIGRva3VtZW50ID0gJC5leHRlbmQodHJ1ZSwge30sICh0aGlzIGFzIGFueSkuc2F2ZUVrb1Byb2ZpbCgpLCAodGhpcyBhcyBhbnkpLnNhdmVTc2xEZXRhaWxEb3J1Y2VuaUVrbyA/ICh0aGlzIGFzIGFueSkuc2F2ZVNzbERldGFpbERvcnVjZW5pRWtvKCkgOiB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9rdW1lbnQuaXhzX3R5cCA9IGRva3VtZW50Lml4c190eXAgPz8gdGhhdC5tb2RlbC5kb2t1bWVudD8uaXhzX3R5cDtcclxuICAgICAgICAgICAgICAgICAgICBkb2t1bWVudC5uYXpldiA9IGRva3VtZW50Lm5hemV2ID8/IHRoYXQubW9kZWwuZG9rdW1lbnQ/Lm5hemV2O1xyXG4gICAgICAgICAgICAgICAgICAgIGRva3VtZW50LnN0X3V0YWpfaWQgPSBkb2t1bWVudC5zdF91dGFqX2lkID8/IHRoYXQubW9kZWwuZG9rdW1lbnQ/LnN0X3V0YWpfaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9rdW1lbnQuaXhzX2Z1bl9ha3QgPSBkb2t1bWVudC5peHNfZnVuX2FrdCA/PyB0aGF0Lm1vZGVsLmRva3VtZW50Py5peHNfZnVuX2FrdDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBkYXRhLmRva3VtZW50ID0gZG9rdW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcInVsb3pWeW1haGFuaVwiLCB0ZXh0OiBcIlByb2LDrWjDoSB1a2zDoWTDoW7DrSB2eW3DoWjDoW7DrS4uLlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAudWxvemVuaVZ5bWFoYW5pKHsgZGF0YTogZGF0YSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIlZ5bcOhaMOhbsOtIHNlIG5lcG9kYcWZaWxvIHVsb8W+aXQhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInVsb3pWeW1haGFuaVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAqIFN0b3Jub3bDoW7DrSB2eW3DoWjDoW7DrVxyXG4gICAgICAgICogQHBhcmFtIGRhdGFcclxuICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgc3Rvcm5vVnltYWhhbmkoZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oe2lkOiBcImtvdHJvbGFTdG9ybmFcIiwgdGV4dDogXCJQcm9iw61ow6Ega29udHJvbGEgc3Rvcm5vdsOhbsOtLi4uXCJ9KVxyXG4gICAgICAgICAgICB2YXIgdnltZGVsID0gdGhhdC5wYXJhbXMuZGRwX3JhZF92eW1kZWw7XHJcblxyXG4gICAgICAgICAgICBpZiAodnltZGVsID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiTmVuw60gcG92b2xlbm8gcnXFoWl0IHZ5bcOhaMOhbsOtIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJrb3Ryb2xhU3Rvcm5hXCIgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHZ5bWRlbCA9PSAxICYmIGRhdGEuaXhzX2Z1bl9ha3QgIT0gdGhhdC5peHNGdW4pIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiVnltw6Fow6Fuw60gbmVsemUgenJ1xaFpdCAtIG5lbsOtIHBvdm9sZW5vIHJ1xaFlbsOtIGNpesOtY2ggdnltw6Fow6Fuw60hXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImtvdHJvbGFTdG9ybmFcIiB9KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZGVmU2t1cGluYSA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLmplUG92b2xlbmFTa3VwaW5hUHJvRWRpdGFjaVNpbXBsZSh7IGl4c1NrdjogZGF0YS5peHNfc2t2LCB0eXBQaGw6IGRhdGEudHlwX3BobCB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmU2t1cGluYS5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9KS5mYWlsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImtvdHJvbGFTdG9ybmFcIiB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGVmUG9zbGVkbmlLcm9rID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICBkZWZTa3VwaW5hLmRvbmUoKGlzRWRpdGFibGU6IGJvb2xlYW4pID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzRWRpdGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIlYgdMOpdG8gc2t1cGluxJsgdnltw6Fow6Fuw60gbmVtw6EgdcW+aXZhdGVsIHBvdm9sZW51IGVkaXRhY2kgKHJ1xaFlbsOtKSB2eW3DoWjDoW7DrSFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImtvdHJvbGFTdG9ybmFcIn0pXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5wYXJhbXMuZGRwX3Z5bV9yZXpydXMgPT0gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5qZVBvc2xlZG5pS3Jva1Z5bWFoYW5pKHsgaXhwTnZ5OiBkYXRhLml4cF9udnkgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZlBvc2xlZG5pS3Jvay5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmZhaWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJrb3Ryb2xhU3Rvcm5hXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZlBvc2xlZG5pS3Jvay5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgZGVmUG9zbGVkbmlLcm9rLmRvbmUoKGlzTGFzdDogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc0xhc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIlZ5bcOhaMOhbsOtIG5lbHplIHN0b3Jub3ZhdCAtIHJ1xaFpdCBsemUgcG91emUgcG9zbGVkbsOtIGtyb2sgdnltw6Fow6Fuw60gdmUgc2t1cGluxJshXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJrb3Ryb2xhU3Rvcm5hXCIgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJrb3Ryb2xhU3Rvcm5hXCJ9KVxyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRHV2b2RcIiwge0lEOlwiRERQR0R1dm9kI1wiLCB9LCBcIlphZMOhbsOtIGTFr3ZvZHVcIiwgNDUwLCAzMjApXHJcbiAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKF9vYmosIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdXZvZCA9IHJldFZhbC5kdXZvZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJzdG9ybm9WeW1haGFuaVwiLCB0ZXh0OiBcIlByb2LDrWjDoSBzdG9ybm92w6Fuw60gdnltw6Fow6Fuw60uLi5cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLnN0b3Jub1Z5bWFoYW5pKHsgcnE6IHsgZGF0YTogZGF0YSB9LCBkdXZvZDogZHV2b2QgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJWeW3DoWjDoW7DrSBzZSBuZXBvZGHFmWlsbyBzdG9ybm92YXQhXCIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInN0b3Jub1Z5bWFoYW5pXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIlZ5bcOhaMOhbsOtIHNlIG5lcG9kYcWZaWxvIHN0b3Jub3ZhdCwgbmVieWwgemFkw6FuIGTFr3ZvZCFcIiwgXCJ3YXJuaW5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBLb250cm9sYSBwxZllZCB2b2zDoW7DrW0gdGlza3UgKi9cclxuICAgICAgICBwcml2YXRlIGtvbnRyb2xhUHJlZFRpc2tlbSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIGtvbnRyb2xhUHJvbWlzZSA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQua29udHJvbGFabWVueURva2xhZHUoa29udHJvbGFQcm9taXNlKTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAga29udHJvbGFQcm9taXNlLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIHRydWU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGlzaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIGZhbHNlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcIlDFmWVkIHRpc2tlbSBqZSB0xZllYmEgdnltw6Fow6Fuw60gdWxvxb5pdCwgY2hjZXRlIHBva3JhxI1vdmF0P1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKF9vYmosIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNhdmVQcmVkVGlza2VtID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC51bG96ZW5pUHJlZFRpc2tlbVByb21pc2UgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2eW0gPSB0aGF0LnByZWN0aUZvcm11bGFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2eW0gIT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ5bS5nZW5lcm92YXRfY2ogPSAwOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5rb250cm9sYVBvbGlQcmVkVWxvemVuaW0odnltKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnVsb3plbmlQcmVkVGlza2VtUHJvbWlzZS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQudGlzaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiTmVsemUgdGlza25vdXQsIGRva2xhZCBuZWJ5bCB1bG/FvmVuIVwiLCBcImluZm9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogLy8gbmljIG5lZMSbbMOhbWUsIGplbGlrb8W+IG5hc3RhbCBlcnJvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVGlzayB2eW3DoWjDoW7DrSAqL1xyXG4gICAgICAgIHByaXZhdGUgdGlzaygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwiaW5pdFByZWRUaXNrZW1cIiwgdGV4dDogXCJQcm9iw61ow6EgaW5pY2lhbGl6YWNlIHDFmWVkIHRpc2tlbS4uLlwiIH0pO1xyXG4gICAgICAgICAgICB2YXIgcHJvbWlzZVRpc2t1ID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5pbmljaWFsaXphY2VQcmVkVGlza2VtKHsgZGF0YTogdGhhdC5tb2RlbCB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdCkgcHJvbWlzZVRpc2t1LnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImluaXRQcmVkVGlza2VtXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHByb21pc2VUaXNrdS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFjdFRpc2tWeW1haGFuaSA9IEdBY3Rpb24uY3JlYXRlUHJpbnRBY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1Z5bWFoYW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJkZHBfcHRtX252eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUR0bzoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfZGVuOiB0aGF0Lml4cERlbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9rX2RlbjogdGhhdC5yb2tEZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cF9waGw6IHRoYXQudHlwUGhsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHRoYXQuaXhwTnZ5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF2X3Z5bTogdGhhdC5tb2RlbC5zdGF2X3Z5bVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyUmVzdHJpY3Rpb25BbGZNZXRob2Q6IFwiR29yZGljLkRkcC5XZWJDbGllbnQuR0RkcFdlYlRpc2s6R2V0UmVzdHJpY3Rpb25BbGZcIiwgIC8vIGZpbHRyIHBybyBtb8W+bsOpIHRpc2t5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g4oaTIE1ldG9kYSwga3RlcsOhIGplIHphdm9sw6FuYSB0xJtzbsSbIHDFmWVkIGdlbmVyb3bDoW7DrW0gc2VzdGF2eSBhIGtkZSBsemUgbmEgc3RyYW7EmyBzZXJ2ZXJ1IG92bGl2bml0IHBhcmFtZXRyeSBzZXN0YXZ5IOKGk1xyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HRGRwV2ViVGlzazpUaXNrVnltYWhhbmlcIiwgIC8vemRlIHNlIHBsbsOtIHTDqW1hXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0RmluaXNoZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAua29udHJvbGFQb1Rpc2t1KCkuZ2V0KCkuZG9uZSgocG9jZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb2NldCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcIktvbnRyb2xuw60gZG90YXogbmFzdGF2ZW7DrSBwxZnDrXpuYWt1IHRpc2t1XCIsIFwiUG9rdWQgdsOtdGUsIMW+ZSB0aXNrIHZ5bcOhaMOhbsOtIGRvcGFkbCB2IHBvxZnDoWRrdSwgdcW+IGhvIG5lY2hjZXRlIHRpc2tub3V0IHpub3Z1IGEgY2hjZXRlIHptxJtuaXQgc3RhdiB0aXNrdSB2eW3DoWjDoW7DrSwgdGFrIG9kcG92xJt6dGUgQU5PLlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcXG5cXG4gUG9rdWQgY2hjZXRlIHRpc2sgb3Bha292YXQsIHByb3Rvxb5lIHNlIHptYcSNa2FsIHBhcMOtciB2IHRpc2vDoXJuxJssIGNoY2V0ZSBzaSB1ZMSbbGF0IGtvcGlpLCBuxJtrdGVyw6Egc2VzdGF2YSBqZSBjaHlibsOhIGF0ZC4sIHBhayBvZHBvdsSbenRlIE5FLlwiLCA0NjUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChfZXYsIHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLm5hc3RhdlByaXpuYWtUaXNrdVZ5bWFoYW5pKCkuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpYWxvZ0Nsb3NlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYWN0VGlza1Z5bWFoYW5pLnJ1bigpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFDFmWlkw6Fuw60gZG9rdW1lbnR1IGRvIHNwaXN1ICovXHJcbiAgICAgICAgcHJpdmF0ZSBwcmlkYXREb1NwaXN1KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciB2eW0gPSB0aGF0Lm1vZGVsO1xyXG47XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJwcmlkYXREb1NwaXN1XCIsIHRleHQ6IFwiUHJvYsOtaMOhIHDFmWlkw6Fuw60gZG8gc3Bpc3UuLi5cIiB9KTtcclxuICAgICAgICAgICAgdmFyIHNwaXNQcm9taXNlID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5zcGlzUHJpcGFkdSh7IGl4cDogdnltLml4cF9kZHAsIGl4c1NrdjogdnltLml4c19za3YsIHR5cFBobDogdnltLnR5cF9waGwsIGhsZWRhdFByaW9yU3BpczogMSB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PSB2eW0uaXhwX2RkcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuV2ZsLkRpYWxvZ3MuR0hsZWRhdElkZW50RG9rU3Bpc0RsZyh0aGF0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKHJldFZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpeHBTcGlzID0gcmV0VmFsLml4cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGlzUHJvbWlzZS5yZXNvbHZlKGl4cFNwaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGlzUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInByaWRhdERvU3Bpc3VcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc3Bpc1Byb21pc2UuZG9uZSgoaXhwU3BpcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcInByaWRhdERvU3Bpc3UyXCIsIHRleHQ6IFwiUHJvYsOtaMOhIHDFmWlkw6Fuw60gZG8gc3Bpc3UuLi5cIiB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLnZsb3pEb1NwaXN1KHsgaXhwTnZ5OiB2eW0uaXhwX252eSwgaXhwU3BpczogaXhwU3BpcywgdHlwUGhsOiB2eW0udHlwX3BobCB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJwcmlkYXREb1NwaXN1MlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFphbG/FvmVuw60gc3Bpc3UgKi9cclxuICAgICAgICBwcml2YXRlIHphbG96aXRTcGlzKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciB2eW0gPSB0aGF0Lm1vZGVsO1xyXG4gXHJcbiAgICAgICAgICAgIHZhciB6YWxvemVuaVByb21pc2UgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGF0LnBhcmFtcy5kZHBfdnltX3pwZ2VzcCA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuV2ZsLkRpYWxvZ3MuR0hsZWRhdElkZW50RG9rU3Bpc0RsZyh0aGF0KVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChyZXRWYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHphbG96ZW5pUHJvbWlzZS5yZXNvbHZlKHJldFZhbC5peHApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgemFsb3plbmlQcm9taXNlLnJlc29sdmUoXCJcIik7XHJcblxyXG4gICAgICAgICAgICB6YWxvemVuaVByb21pc2UuZG9uZSgoaXhwSW5pKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwiemFsb3ppdFNwaXNcIiwgdGV4dDogXCJQcm9iw61ow6EgemFsb8W+ZW7DrSBzcGlzdS4uLlwiIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLnphbG96aXRTcGlzKHsgaXhwTnZ5OiB2eW0uaXhwX252eSwgaXhzU2t2OiB2eW0uaXhzX3NrdiwgaXhwSW5pOiBpeHBJbmksIGl4cERkcDogdnltLml4cF9kZHAsIHR5cFBobDogdnltLnR5cF9waGwgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwiemFsb3ppdFNwaXNcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIFbDvWptdXTDrSBkb2t1bWVudHUgemUgc3Bpc3UgKi9cclxuICAgICAgICBwcml2YXRlIHZ5am1vdXRaZVNwaXN1KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwidnlqbWlaZVNwaXN1XCIsIHRleHQ6IFwiUHJvYsOtaMOhIHZ5am11dMOtIHplIHNwaXN1Li4uXCIgfSk7XHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLnZ5am1pWmVTcGlzdSh7IGl4cE52eTogdGhhdC5peHBOdnkgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcInZ5am1pWmVTcGlzdVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8qKiBaa29udHJvbHVqZSB6ZGEgYnlsIHptxJtuxJtuIGRva2xhZCAqL1xyXG4gICAgICAgIHByaXZhdGUga29udHJvbGFabWVueURva2xhZHUoa29udHJvbGFQcm9taXNlOiBhbnkpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcHV2b2RuaU1vZGVsID0gdGhhdC5tb2RlbDtcclxuICAgICAgICAgICAgdmFyIG5vdnlNb2RlbCA9IHRoYXQucHJlY3RpRm9ybXVsYXIoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChub3Z5TW9kZWwgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiTsSba3RlcsOhIHBvbGUgbmVqc291IHZhbGlkbsOtLCBuZWx6ZSB0aXNrbm91dCFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImtvbnRyb2xhWm1lbnlcIiwgdGV4dDogXCJQcm9iw61ow6Ega29udHJvbGEgem3Em255IGRva2xhZHUuLi5cIiB9KTtcclxuICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAua29udHJvbGFabWVueURva2xhZHUoeyBvbGREdG86IHB1dm9kbmlNb2RlbCwgbmV3RHRvOiBub3Z5TW9kZWwgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKS5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBrb250cm9sYVByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSkuZmFpbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJDaHliYSBwxZlpIGtvbnRyb2xlIHptxJtueSBkb2tsYWR1IVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImtvbnRyb2xhWm1lbnlcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmHEjXRlIGRhdGEgcHJvIGRldGFpbCB2eW3DoWjDoW7DrSwgYSB6YXZvbMOhIG1ldG9kdSBvbkNvbnRlbnRSZWFkeVxyXG4gICAgICAgICAqIEBwYXJhbSBpeHBcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHppc2thbmlEYXRWeW1haGFuaShpeHA6IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJsb2FkVnltXCIsIHRleHQ6IFwiTmHEjcOtdMOhbsOtIGRhdCAoRGV0YWlsIHZ5bcOhaMOhbsOtKVwiIH0pO1xyXG4gICAgICAgICAgICB2YXIgdGFzayA9IHRoYXQuaXNsLlZ5bWFoYW5pRERQLnJlYWQocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IGl4cF9udnk6IGl4cCB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLmdldCgpO1xyXG5cclxuICAgICAgICAgICAgdGFzay5kb25lKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1vZGVsID0gZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgLy90aGF0Lm9uQ29udGVudFJlYWR5KCk7XHJcbiAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImxvYWRWeW1cIiB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBaYXZvbMOhIHNlcnZlcm92w6kgZnVua2NlIGsgc3BvxI3DrXTDoW7DrSBkYXR1bcWvLCBwb2t1ZCBqZSBkYXR1bSBkb3J1xI1lbsOtIHptxJtuxJtuICovXHJcbiAgICAgICAgcHJpdmF0ZSBzcG9jdGlEYXR1bXkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHphc2lsa2FGb3JtID0gdGhhdC5maW5kRm9ybXMoXCJmb3JtWmFzaWxrYVwiKTtcclxuICAgICAgICAgICAgdmFyIGRhdERvcnVjID0gemFzaWxrYUZvcm0uZmluZEZpZWxkcyhcImRhdF9kb3J1Y1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIGRhdFBtID0gemFzaWxrYUZvcm0uZmluZEZpZWxkcyhcImRhdF9wbVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgdmFyIGRhdFZ5a29uID0gemFzaWxrYUZvcm0uZmluZEZpZWxkcyhcImRhdF92eWtvblwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIERhdHVtIHZ5a29uYXRlbG5vc3RpIGEgbmFieXTDrSBwcsOhdm7DrSBtb2NpIHNlIGJ1ZGUgcG/EjcOtdGF0IHYgREJcclxuICAgICAgICAgICAgaWYgKChkYXRQbSA9PSBudWxsIHx8IGRhdFZ5a29uID09IG51bGwpICYmIGRhdERvcnVjICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJzcG9jdGlEYXR1bXlcIiwgdGV4dDogXCJQcm9iw61ow6EgdsO9cG/EjWV0IGRhdHVtxa8uLi5cIiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYmFzaWNJbmZvRm9ybSA9IHRoYXQuZmluZEZvcm1zKFwiZm9ybUJhc2ljSW5mb1wiKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdGF2VnltID0gYmFzaWNJbmZvRm9ybS5maW5kRmllbGRzKFwic3Rhdl92eW1cIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhdlZ5bU9sZCA9IGJhc2ljSW5mb0Zvcm0uZmluZEZpZWxkcyhcInN0YXZfdnltX29sZFwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbWFpbkZvcm0gPSB0aGF0LmZpbmRGb3JtcyhcImZvcm1IZWFkZXJcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXhzU2t2ID0gbWFpbkZvcm0uZmluZEZpZWxkcyhcIml4c19za3ZcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGZpbHRlcjogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdF9kb3J1YzogZGF0RG9ydWMsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0X3BtOiBkYXRQbSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRfdnlrb246IGRhdFZ5a29uLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXZfdnltOiBzdGF2VnltLnN0YXZfdnltLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXZfdnltX29sZDogc3RhdlZ5bU9sZC5zdGF2X3Z5bSxcclxuICAgICAgICAgICAgICAgICAgICBpeHNfc2t2OiBpeHNTa3YuaXhzX3NrdlxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLnZ5cG9jZXREYXR1bXUoeyBkYXRhOiBmaWx0ZXIgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHphc2lsa2FGb3JtLmZpbmRGaWVsZHMoXCJkYXRfcG1cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcmVzdWx0LmRhdF9wbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHphc2lsa2FGb3JtLmZpbmRGaWVsZHMoXCJkYXRfdnlrb25cIikuZ2ZpZWxkKFwic2V0VmFsdWVcIiwgcmVzdWx0LmRhdF92eWtvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwic3BvY3RpRGF0dW15XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBWeXBvxI1ldCDEjcOhc3RreSB2eW3DoWjDoW7DrSBwbyB6bcSbbsSbIGplZG5vdGxpdsO9Y2ggxI3DoXN0ZWsgKi9cclxuICAgICAgICBwcml2YXRlIHNwb2NpdGVqQ2FzdGt5VnltYWhhbmkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGNhc3RreUZvcm0gPSB0aGF0LmZpbmRGb3JtcyhcImZvcm1WeW1haGFuYUNhc3RrYVwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYXN0a3kgPSB0aGF0Lnppc2tlakRhdGFQcm9WeXBvY2V0KGNhc3RreUZvcm0pO1xyXG4gICAgICAgICAgICB2YXIgY1Z5bVphayA9IGNhc3RreS5jVnltIC0gY2FzdGt5LmNOYWtSaXogLSBjYXN0a3kuY0V4ZSAtIGNhc3RreS5jUG9rIC0gY2FzdGt5LmNQZW47XHJcbiAgICAgICAgICAgIGNhc3RreUZvcm0uZmluZEZpZWxkcyhcImNfdnltX3pha1wiKS5nZmllbGQoXCJzZXRWYWx1ZVwiLCBjVnltWmFrKTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuemF2b2xlalN0YXR1c1N1bWFJbmZvKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVnlwb8SNZXQgY2Vsa292w6kgxI3DoXN0a3kgdnltw6Fow6Fuw60gcG8gem3Em27EmyB2eW3DoWhhbsOpIMSNw6FzdGt5ICovXHJcbiAgICAgICAgcHJpdmF0ZSBzcG9jaXRlakNlbGtvdm91Q2FzdGt5VnltYWhhbmkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGNhc3RreUZvcm0gPSB0aGF0LmZpbmRGb3JtcyhcImZvcm1WeW1haGFuYUNhc3RrYVwiKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYXN0a3kgPSB0aGF0Lnppc2tlakRhdGFQcm9WeXBvY2V0KGNhc3RreUZvcm0pO1xyXG4gICAgICAgICAgICB2YXIgY1Z5bSA9IGNhc3RreS5jVnltWmFrICsgY2FzdGt5LmNOYWtSaXogKyBjYXN0a3kuY0V4ZSArIGNhc3RreS5jUG9rICsgY2FzdGt5LmNQZW47XHJcbiAgICAgICAgICAgIGNhc3RreUZvcm0uZmluZEZpZWxkcyhcImNfdnltXCIpLmdmaWVsZChcInNldFZhbHVlXCIsIGNWeW0pO1xyXG5cclxuICAgICAgICAgICAgdGhhdC56YXZvbGVqU3RhdHVzU3VtYUluZm8oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqICBaw61za8OhbsOtIGRhdCBwcm8gdsO9cG/EjWV0IMSNw6FzdGt5IHZ5bcOhaMOhbsOtXHJcbiAgICAgICAgICogQHBhcmFtIGNhc3RreUZvcm1cclxuICAgICAgICAgKiBAcmV0dXJuc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgemlza2VqRGF0YVByb1Z5cG9jZXQoY2FzdGt5Rm9ybTogYW55KSB7XHJcbiAgICAgICAgICAgIHZhciBjYXN0a3k6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICBjYXN0a3kuY1Z5bSA9IGNhc3RreUZvcm0uZmluZEZpZWxkcyhcImNfdnltXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICBjYXN0a3kuY05ha1JpeiA9IGNhc3RreUZvcm0uZmluZEZpZWxkcyhcImNfbmFrX3JpelwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgY2FzdGt5LmNQb2sgPSBjYXN0a3lGb3JtLmZpbmRGaWVsZHMoXCJjX3Bva1wiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgY2FzdGt5LmNQZW4gPSBjYXN0a3lGb3JtLmZpbmRGaWVsZHMoXCJjX3BlblwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgY2FzdGt5LmNFeGUgPSBjYXN0a3lGb3JtLmZpbmRGaWVsZHMoXCJjX2V4ZVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgY2FzdGt5LmNWeW1aYWsgPSBjYXN0a3lGb3JtLmZpbmRGaWVsZHMoXCJjX3Z5bV96YWtcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBjYXN0a3k7XHJcbiAgICAgICAgfSAgXHJcblxyXG4gICAgICAgIC8qKiBOYXN0YXbDrSBkYXQgcHJvIHN0YXR1c1N1bWFJbmZvIGEgemF2b2zDoSBqw60gKi9cclxuICAgICAgICBwcml2YXRlIHphdm9sZWpTdGF0dXNTdW1hSW5mbygpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgc3VtYVZ5bTogbnVtYmVyO1xyXG4gICAgICAgICAgICBpZiAodGhhdC5zbG96a3lWeW1DYXN0a3kubGVuZ3RoICE9IDApIHN1bWFWeW0gPSB0aGF0LnNsb3preVZ5bUNhc3RreVswXS5zdW1hX3Z5bTtcclxuICAgICAgICAgICAgZWxzZSBzdW1hVnltID0gMDtcclxuICAgICAgICAgICAgdGhhdC5zdGF0dXNTdW1hSW5mbyhzdW1hVnltKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBab2JyYXplbsOtIGRldGFpbHUgesOhc2lsZWsgKi9cclxuICAgICAgICBwcml2YXRlIHpvYnJhekRldGFpbFphc2lsa3koKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IHRoYXQuZ3JpZFphc2lsa3kuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdEZHBaYXNpbGthRHRvPihcImdldFNlbGVjdGlvblwiKTtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbi5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbCA9IHNlbGVjdGlvblswXTtcclxuICAgICAgICAgICAgICAgIHZhciBzeHMgPSB0aGF0Lml4cE52eSArIHNlbC5saWMgKyBzZWwucG9yX2Npc2xvO1xyXG4gICAgICAgICAgICAgICAgdmFyIG9wdDogR29yZGljLldmbC5XZWJDbGllbnQuR0RldGFpbFphc2lsa3lEbGdJbnB1dFBhcmFtcyA9IHsgU3hzOiBzeHMgfTtcclxuICAgICAgICAgICAgICAgIEdvcmRpYy5XZmwuRGlhbG9ncy5HRGV0YWlsWmFzaWxreURsZyh0aGF0LCBvcHQsIEdvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmkubmF2aWdhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogTmHEjXTEm27DrSBkw61sxI3DrWNoIHZ5bcOhaMOhbsOtICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkRGlsY2lWeW1haGFuaSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZmlsdGVyOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgZmlsdGVyLml4cCA9IHRoYXQubW9kZWwuaXhwX2RkcDtcclxuICAgICAgICAgICAgZmlsdGVyLml4cF9udnkgPSB0aGF0Lml4cE52eTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJsb2FkRGlsY2lWeW1haGFuaVwiLCB0ZXh0OiBcIk5hxI3DrXTDoW7DrSBkYXQgKETDrWzEjcOtIHZ5bcOhaMOhbsOtKVwiIH0pXHJcbiAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLmxpc3REaWxjaVZ5bWFoYW5pKFxyXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IGZpbHRlclxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKS5nZXQoKS5kb25lKGZ1bmN0aW9uIChkdG8pIHtcclxuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZHRvLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5ncmlkRGlsY2lWeW1haGFuaS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImxvYWREaWxjaVZ5bWFoYW5pXCIgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIFZhemJ5XHJcbiAgICAgICAgLyoqIE5hdsOhemF0IG5hcG9qZW7DqSB2eW3DoWjDoW7DrSAqL1xyXG4gICAgICAgIHByaXZhdGUgbmF2YXphdE5hcG9qZW5lVnltYWhhbmkoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5zaG93TW9kYWxXaW5kb3coXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HVnliZXJWeW1haGFuaVwiLCB7XHJcbiAgICAgICAgICAgICAgICBJRDogXCJERFBHVnliZXJWeW1haGFuaSNcIiwgaXhwTnZ5OiB0aGF0Lml4cE52eSwgaXhwRGRwOiB0aGF0Lm1vZGVsLml4cF9kZHAsIGhsaWRhdDogMlxyXG4gICAgICAgICAgICB9LCBcIlbDvWLEm3Igdnltw6Fow6Fuw61cIiwgNzgwLCA0ODApXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoX29iaiwgcmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oe2lkOiBcIm5hdmF6YW5pTmFwVnltXCIsIHRleHQ6IFwiUHJvYsOtaMOhIG5hdsOhesOhbsOtIG5hcG9qZW7DqWhvIHZ5bcOhaMOhbsOtLi4uXCJ9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5wcmlkYXRWYXpidU5hcFZ5bSh7IGl4cE52eTogcmVzdWx0Lml4cE52eSwgaXhwTnZ5TmFkOiB0aGF0Lml4cE52eSB9KS5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZERpbGNpVnltYWhhbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJuYXZhemFuaU5hcFZ5bVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE9kZWJyw6Fuw60gdmF6YnkgbmFwb2plbsOpaG8gdnltw6Fow6Fuw60gKi9cclxuICAgICAgICBwcml2YXRlIHpydXNpdE5hdmF6YW5pTmFwVnltKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWREaWxjaVZ5bWFoYW5pLmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HVnltYWhhbmlEZXRhaWxEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpeHBOdnkgPSBzZWxlY3Rpb24uaXhwX252eSA/PyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFrdGl2aXRhID0gc2VsZWN0aW9uLmFrdGl2aXRhID8/IDkwMDtcclxuICAgICAgICAgICAgICAgIGlmIChha3Rpdml0YSAhPSAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIlZ5YnJhbsOhIHZhemJhIG5lbsOtIGFrdGl2bsOtIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwienJ1c2VuaU5hdlZ5bVwiLCB0ZXh0OiBcIlByb2LDrWjDoSBvZGVicsOhbsOtIG5hdsOhemFuw6lobyB2eW3DoWjDoW7DrS4uLlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLm9kZWJyYXRWYXpidU5hcFZ5bSh7IGl4cE52eTogaXhwTnZ5LCBha3Rpdml0YTogYWt0aXZpdGEgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkRGlsY2lWeW1haGFuaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJ6cnVzZW5pTmF2VnltXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBOYXbDoXphdCBwxZllZGNob3rDrSBrcm9reSB2eW3DoWjDoW7DrSAqL1xyXG4gICAgICAgIHByaXZhdGUgbmF2YXphdCgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGF0LmRpYWxvZ3Muc2hvd01vZGFsV2luZG93KFwiR29yZGljLkRkcC5XZWJDbGllbnQuR1Z5YmVyVnltYWhhbmlcIiwge1xyXG4gICAgICAgICAgICAgICAgSUQ6IFwiRERQR1Z5YmVyVnltYWhhbmkjXCIsIGl4cE52eTogdGhhdC5peHBOdnksIGl4cERkcDogdGhhdC5tb2RlbC5peHBfZGRwLCBobGlkYXQ6IDFcclxuICAgICAgICAgICAgfSwgXCJWw71ixJtyIHZ5bcOhaMOhbsOtXCIsIDc4MCwgNDgwKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKF9vYmosIHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwibmF2YXphbmlQcmVkS3Jva1Z5bVwiLCB0ZXh0OiBcIlByb2LDrWjDoSBuYXbDoXrDoW7DrSBwxZllZGNob3rDrWhvIGtyb2t1IHZ5bcOhaMOhbsOtLi4uXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAucHJpZGF0VmF6YnUoeyBpeHBOdnk6IHRoYXQuaXhwTnZ5LCBpeHBOdnlQcmVkOiByZXN1bHQuaXhwTnZ5IH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbHRlcjogYW55ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLml4cCA9IHRoYXQubW9kZWwuaXhwX2RkcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuaXhwX252eSA9IHRoYXQuaXhwTnZ5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci56b2JyYXppdF96cnVzZW5lID0gdGhhdC5maW5kRm9ybXMoXCJ6cnVzZW5lRm9ybVByZWRWeW1cIikuZmluZEZpZWxkcyhcInpvYnJheml0X3pydXNlbmVcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkUHJlZGNob3ppVnltWnJ1cyhmaWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIm5hdmF6YW5pUHJlZEtyb2tWeW1cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKiBacnXFoWl0IG5hdsOhesOhbsOtIHDFmWVkY2hvesOtaG8ga3Jva3Ugdnltw6Fow6Fuw60gKi9cclxuICAgICAgICBwcml2YXRlIHpydXNpdE5hdmF6YW5pKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWRQcmVkY2hvemlLcm9reVZ5bS5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRGV0YWlsRHRvPihcImFjdGl2ZVJvd1wiKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb24gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl4cE52eVByZWQgPSBzZWxlY3Rpb24uaXhwX252eSA/PyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFrdGl2aXRhID0gc2VsZWN0aW9uLmFrdGl2aXRhID8/IDkwMDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYWt0aXZpdGEgIT0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJWeWJyYW7DoSB2YXpiYSBuZW7DrSBha3Rpdm7DrSFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJ6cnVzZW5pTmF2XCIsIHRleHQ6IFwiUHJvYsOtaMOhIG9kZWJyw6Fuw60gbmF2w6F6YW7DqWhvIHZ5bcOhaMOhbsOtLi4uXCIgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5vZGVicmF0VmF6YnUoeyBpeHBOdnk6IHRoYXQuaXhwTnZ5LCBpeHBOdnlQcmVkOiBpeHBOdnlQcmVkLCBha3Rpdml0YTogYWt0aXZpdGEgfSkuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXI6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuaXhwID0gdGhhdC5tb2RlbC5peHBfZGRwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuaXhwX252eSA9IHRoYXQuaXhwTnZ5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuem9icmF6aXRfenJ1c2VuZSA9IHRoYXQuZmluZEZvcm1zKFwienJ1c2VuZUZvcm1QcmVkVnltXCIpLmZpbmRGaWVsZHMoXCJ6b2JyYXppdF96cnVzZW5lXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRQcmVkY2hvemlWeW1acnVzKGZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJ6cnVzZW5pTmF2XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIE9ibm92ZW7DrSBuYXbDoXrDoW7DrSBwxZllZGNob3rDrWhvIGtyb2t1IHZ5bcOhaMOhbsOtICovXHJcbiAgICAgICAgcHJpdmF0ZSBvYm5vdmVuaU5hdmF6YW5pKCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB0aGF0LmdyaWRQcmVkY2hvemlLcm9reVZ5bS5nZ3JpZDxHb3JkaWMuRGRwLkludGVyZmFjZS5MSy5Jc2wuR1Z5bWFoYW5pRGV0YWlsRHRvPihcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXhwTnZ5UHJlZCA9IHNlbGVjdGlvbi5peHBfbnZ5ID8/IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWt0aXZpdGEgPSBzZWxlY3Rpb24uYWt0aXZpdGEgPz8gMTAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChha3Rpdml0YSAhPSA5MDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIlZ5YnJhbsOhIHZhemJhIG5lbsOtIHpydcWhZW7DoSFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJvYm5vdmVuaU5hdlwiLCB0ZXh0OiBcIlByb2LDrWjDoSBvZGVicsOhbsOtIG5hdsOhemFuw6lobyB2eW3DoWjDoW7DrS4uLlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAub2Jub3ZpdFZhemJ1KHsgaXhwTnZ5OiB0aGF0Lml4cE52eSwgaXhwTnZ5UHJlZDogaXhwTnZ5UHJlZCwgYWt0aXZpdGE6IGFrdGl2aXRhIH0pLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLml4cCA9IHRoYXQubW9kZWwuaXhwX2RkcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLml4cF9udnkgPSB0aGF0Lml4cE52eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnpvYnJheml0X3pydXNlbmUgPSB0aGF0LmZpbmRGb3JtcyhcInpydXNlbmVGb3JtUHJlZFZ5bVwiKS5maW5kRmllbGRzKFwiem9icmF6aXRfenJ1c2VuZVwiKS5nZmllbGQoXCJnZXRWYWx1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkUHJlZGNob3ppVnltWnJ1cyhmaWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwib2Jub3ZlbmlOYXZcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgICAgICAvLyNyZWdpb24gU2xvxb5reSB2eW3DoWhhbsOpIMSNw6FzdGt5XHJcblxyXG4gICAgICAgIC8qKiBQxZlpZMOhbsOtIHNsb8W+a3kgdnltw6FoYW7DqSDEjcOhc3RreSAqL1xyXG4gICAgICAgIHByaXZhdGUgcHJpZGF0U2xvemt5VnltQ2FzdGt5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICBcIkdvcmRpYy5EZHAuV2ViQ2xpZW50LkdTbG96a2FWeW1haGFuaVwiLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIElEOiBcIkREUEdTbG96a2FWeW1haGFuaSNcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogdGhhdC5tb2RlbCxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbEVTVTogdGhhdC5lc3VQcmlwYWR1RERQLFxyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRhY2U6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICkub24oXCJjbG9zZVwiLCAoX29iaiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIga29udHJvbGFTbG96a3lWeW1Qcm9taXNlID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldFZhbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImtvbnRyb2xhUHJlZHBpc3VcIiwgdGV4dDogXCJaamnFocWldWplIHNlIHpkYSBleGlzdHVqZSBwxZllZHBpcyBwcm8gdnltw6Fow6Fuw60uLi5cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5wcmVkcGlzUHJvVnltYWhhbmlFeGlzdHVqZSh7IGR0bzogcmV0VmFsLmRhdGEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrb250cm9sYVNsb3preVZ5bVByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybShcIlBybyB2eWJyYW5vdSBzbG/Fvmt1IHZ5bcOhaMOhbsOtIG5lZXhpc3R1amUgcMWZZWRwaXMsIGNoY2V0ZSBzbG/Fvmt1IHZ5bcOhaMOhbsOtIG9wcmF2ZHUgdnl0dm/FmWl0P1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoX29iaiwgcmV0VmFsKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsID09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrb250cm9sYVNsb3preVZ5bVByb21pc2UucmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrb250cm9sYVNsb3preVZ5bVByb21pc2UucmVqZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4geyB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcImtvbnRyb2xhUHJlZHBpc3VcIiB9KSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGtvbnRyb2xhU2xvemt5VnltUHJvbWlzZS5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBLb250cm9sYSB6ZGEgamnFviBzbG/FvmthIHZ5bcOhaMOhbsOtIGV4aXN0dWplXHJcbiAgICAgICAgICAgICAgICBrb250cm9sYVNsb3preVZ5bVByb21pc2UuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImtvbnRyb2xhU2xvemt5VnltYWhhbmlcIiwgdGV4dDogXCJaamnFocWldWplIHNlIHpkYSBzbG/FvmthIHZ5bcOhaMOhbsOtIGppxb4gZXhpc3R1amUuLi5cIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5zbG96a2FWeW1haGFuaUV4aXN0dWplKHsgZHRvOiByZXRWYWwuZGF0YSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkgeyAvLyBzbG/FvmthIHZ5bcOhaMOhbsOtIGppxb4gZXhpc3R1amVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIlphZGFuw6Egc2xvxb5rYSB2eW3DoWjDoW7DrSBqacW+IGV4aXN0dWplIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQxZlpZMOhbsOtIHNsb8W+a3kgdnltw6Fow6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmlzbC5WeW1haGFuaUREUC5wcmlkYXRTbG96a3VWeW1haGFuaSh7IGR0bzogcmV0VmFsLmRhdGEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXI6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLml4cCA9IHRoYXQubW9kZWwuaXhwX2RkcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5peHBfbnZ5ID0gdGhhdC5peHBOdnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuem9icmF6aXRfenJ1c2VuZSA9IHRoYXQuZmluZEZvcm1zKFwienJ1c2VuZUZvcm1TbG96a3lWeW1cIikuZmluZEZpZWxkcyhcInpvYnJheml0X3pydXNlbmVcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRTbG96a3lWeW1DYXN0a3koZmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJrb250cm9sYVNsb3preVZ5bWFoYW5pXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KSAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogVXByYXZlbsOtIHNsb8W+a3kgdnltw6FoYW7DqSDEjcOhc3RreSAqL1xyXG4gICAgICAgIHByaXZhdGUgdXByYXZpdFNsb3preVZ5bUNhc3RreSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcm93ID0gdGhhdC5ncmlkU2xvemt5VnltQ2FzdGt5LmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HU2xvemt5VnltQ2FzdGt5RHRvPihcImFjdGl2ZVJvd1wiKTtcclxuICAgICAgICAgICAgcm93Lml4cF9udnkgPSB0aGF0Lml4cE52eTsgIFxyXG4gICAgICAgICAgICBpZiAocm93ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJHb3JkaWMuRGRwLldlYkNsaWVudC5HU2xvemthVnltYWhhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEOiBcIkREUEdTbG96a2FWeW1haGFuaSNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHJvdyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxFU1U6IHRoYXQuZXN1UHJpcGFkdUREUCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGFjZTogdHJ1ZSAvLyBqZWRuw6Egc2UgbyBlZGl0YWNpIGV4aXN0dWrDrWPDrWhvIHrDoXpuYW11XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKS5vbihcImNsb3NlXCIsIChfb2JqLCByZXRWYWwpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcImVkaXRhY2VTbG96a3lWeW1haGFuaVwiLCB0ZXh0OiBcIlByb2LDrWjDoSBha3R1YWxpemFjZSBzbG/Fvmt5IHZ5bcOhaMOhbsOtLi4uXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaXNsLlZ5bWFoYW5pRERQLmVkaXRhY2VTbG96a3lWeW1haGFuaSh7IGR0bzogcmV0VmFsLmRhdGEgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXI6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5peHAgPSB0aGF0Lm1vZGVsLml4cF9kZHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLml4cF9udnkgPSB0aGF0Lml4cE52eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuem9icmF6aXRfenJ1c2VuZSA9IHRoYXQuZmluZEZvcm1zKFwienJ1c2VuZUZvcm1TbG96a3lWeW1cIikuZmluZEZpZWxkcyhcInpvYnJheml0X3pydXNlbmVcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkU2xvemt5VnltQ2FzdGt5KGZpbHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJlZGl0YWNlU2xvemt5VnltYWhhbmlcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IFxyXG5cclxuICAgICAgICAvKiogWnJ1xaFlbsOtIHNsb8W+a3kgdnltw6FoYW7DqSDEjcOhc3RreSAqL1xyXG4gICAgICAgIHByaXZhdGUgenJ1c2l0U2xvemt5VnltQ2FzdGt5KCkge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSB0aGF0LmdyaWRTbG96a3lWeW1DYXN0a3kuZ2dyaWQ8R29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdTbG96a3lWeW1DYXN0a3lEdG8+KFwiYWN0aXZlUm93XCIpO1xyXG5cclxuICAgICAgICAgICAgcm93Lml4cF9udnkgPSB0aGF0Lml4cE52eTsgIFxyXG4gICAgICAgICAgICBpZiAocm93LmFrdGl2aXRhID09IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbih7IGlkOiBcInpydXNlbmlTbG96a3lWeW1haGFuaVwiLCB0ZXh0OiBcIlByb2LDrWjDoSB6cnXFoWVuw60gc2xvxb5reSB2eW3DoWjDoW7DrS4uLlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAuenJ1c2VuaVNsb3preVZ5bWFoYW5pKHsgZHRvOiByb3cgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXI6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuaXhwID0gdGhhdC5tb2RlbC5peHBfZGRwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuaXhwX252eSA9IHRoYXQuaXhwTnZ5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIuem9icmF6aXRfenJ1c2VuZSA9IHRoYXQuZmluZEZvcm1zKFwienJ1c2VuZUZvcm1TbG96a3lWeW1cIikuZmluZEZpZWxkcyhcInpvYnJheml0X3pydXNlbmVcIikuZ2ZpZWxkKFwiZ2V0VmFsdWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZFNsb3preVZ5bUNhc3RreShmaWx0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKHsgaWQ6IFwienJ1c2VuaVNsb3preVZ5bWFoYW5pXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiVnlicmFuw6Egc2xvxb5rYSB2eW3DoWjDoW7DrSBuZW7DrSBha3Rpdm7DrSFcIiwgXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIC8qKiBPYm5vdml0IHNsb8W+a3kgdnltw6FoYW7DqSDEjcOhc3RreSAqL1xyXG4gICAgICAgIHByaXZhdGUgb2Jub3ZpdFNsb3preVZ5bUNhc3RreSgpIHtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgcm93ID0gdGhhdC5ncmlkU2xvemt5VnltQ2FzdGt5LmdncmlkPEdvcmRpYy5EZHAuSW50ZXJmYWNlLkxLLklzbC5HU2xvemt5VnltQ2FzdGt5RHRvPihcImFjdGl2ZVJvd1wiKTtcclxuXHJcbiAgICAgICAgICAgIHJvdy5peHBfbnZ5ID0gdGhhdC5peHBOdnk7XHJcbiAgICAgICAgICAgIGlmIChyb3cuYWt0aXZpdGEgPT0gOTAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwib2Jub3ZlbmlTbG96a3lWeW1haGFuaVwiLCB0ZXh0OiBcIlByb2LDrWjDoSBvYm5vdmVuw60gc2xvxb5reSB2eW3DoWjDoW7DrS4uLlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuVnltYWhhbmlERFAub2Jub3ZlbmlTbG96a3lWeW1haGFuaSh7IGR0bzogcm93IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLml4cCA9IHRoYXQubW9kZWwuaXhwX2RkcDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLml4cF9udnkgPSB0aGF0Lml4cE52eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnpvYnJheml0X3pydXNlbmUgPSB0aGF0LmZpbmRGb3JtcyhcInpydXNlbmVGb3JtU2xvemt5VnltXCIpLmZpbmRGaWVsZHMoXCJ6b2JyYXppdF96cnVzZW5lXCIpLmdmaWVsZChcImdldFZhbHVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRTbG96a3lWeW1DYXN0a3koZmlsdGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbih7IGlkOiBcIm9ibm92ZW5pU2xvemt5VnltYWhhbmlcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJWeWJyYW7DoSBzbG/FvmthIHZ5bcOhaMOhbsOtIGplIGFrdGl2bsOtIVwiLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgLy8jcmVnaW9uIFJlZGlzdHJpYnVjZVxyXG4gICAgICAgXHJcbiAgICAgICAgcmVkaXN0cmlidWNlKHR5cFJlZGlzdDogbnVtYmVyLCBpeHNGdW46IHN0cmluZykge1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBwcmlwYWR5OiBJbnRlcmZhY2UuTEsuSXNsLkdQcmVkYW5pRHRvW10gPSBbXTtcclxuICAgICAgICAgICAgcHJpcGFkeS5wdXNoKHsgaXhwOiB0aGF0Lml4cE52eSB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgaXhwU3BpcyA9IHRoYXQubW9kZWwud2ZsUHJvZmlsLml4cF9zcGlzO1xyXG4gICAgICAgICAgICB2YXIgaXhwTnZ5ID0gdGhhdC5peHBOdnk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtb2RlbER0bzogR29yZGljLkRkcC5JbnRlcmZhY2UuTEsuSXNsLkdNb2RlbFJlZGlzdHJpYnVjZUR0byA9IHtcclxuICAgICAgICAgICAgICAgIGl4c19mdW46IGl4c0Z1bixcclxuICAgICAgICAgICAgICAgIHR5cF9yZWRpc3RyaWJ1Y2U6IHR5cFJlZGlzdCwgLy8gMCAtIHDFmWVkw6Fuw60sIDEwIC0gcMWZaWTEm2xlbsOtXHJcbiAgICAgICAgICAgICAgICBwcml6X3Nla2NlOiAxIC8vIGplZG7DoSBzZSB2eW3DoWjDoW7DrVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgLy8gS29udHJvbGEgemRhIGplIHZ5bcOhaMOhbsOtIHZlIHNwaXN1XHJcbiAgICAgICAgICAgIGlmIChpeHBTcGlzICE9IGl4cE52eSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSmUgdmUgc3Bpc3VcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiUMWZZWRhdCBzcGlzP1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiVnlicmFuw6kgdnltw6Fow6Fuw60gamUgdmxvxb5lbm8gZG8gc3Bpc3UuIFxcbiBcXG4gXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiVSB0b2hvdG8gdnltw6Fow6Fuw60gYnVkZSBwxZllZMOhbiBjZWzDvSBzcGlzLCBjaGNldGUgcG9rcmHEjW92YXQ/XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgNDAwLCAyMDBcclxuICAgICAgICAgICAgICAgICkub24oXCJjbG9zZVwiLCAoX2V2LCByZXRWYWwpID0+IHsgLy8gbcOhbWUgaSBwxZnDrXBhZHkgdmUgc3Bpc3VcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsICE9PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZi5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgZGVmLnJlc29sdmUoKTtcclxuXHJcbiAgICAgICAgICAgIGRlZi5wcm9taXNlKCkuZG9uZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKHsgaWQ6IFwicmVkaXN0cmlidWNlXCIsIHRleHQ6IFwiUHJvYsOtaMOhIHJlZGlzdHJpYnVjZSB2eW3DoWjDoW7DrS4uLlwiIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuUmVkaXN0cmlidWNlLnVwZGF0ZVByZWRhbmkoeyBwcmVkYW5pRHRvczogcHJpcGFkeSwgbW9kZWw6IG1vZGVsRHRvLCBwcml6RGV0YWlsOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldCgpLmRvbmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9IHVuZGVmaW5lZCAmJiByZXN1bHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtpbmQgPSByZXN1bHRbMF0ud2l6X2tpbmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChraW5kID09IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuU3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiVnltw6Fow6Fuw60gYnlsbyDDunNwxJvFoW7EmyByZWRpc3RyaWJ1b3bDoW5vLlwiLCBcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGtpbmQgPT0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2hvd0ZsYXNoKFwiVnltw6Fow6Fuw60gc2UgbmVwb2RhxZlpbG8gcmVkaXN0cmlidW92YXQ6IFwiICsgcmVzdWx0WzBdLndpel90eHRfZXJyLCBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYWx3YXlzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJyZWRpc3RyaWJ1Y2VcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmWV2emV0w60gdnlicmFuw71jaCBwxZnDrXBhZMWvIHZ5bcOhaMOhbsOtXHJcbiAgICAgICAgICogQHJldHVybnNcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHByZXZ6aXQoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBwcmlwYWR5OiBJbnRlcmZhY2UuTEsuSXNsLkdQcmV2emV0aUR0b1tdID0gW107XHJcbiAgICAgICAgICAgIHZhciBwcmlwYWQ6IEludGVyZmFjZS5MSy5Jc2wuR1ByZXZ6ZXRpRHRvID0ge307XHJcbiAgICAgICAgICAgIHByaXBhZHkucHVzaCh7IGl4cDogdGhhdC5peHBOdnkgfSk7XHJcbiAgICAgICAgICAgIHByaXBhZC5peHAgPSB0aGF0Lml4cE52eTtcclxuICAgICAgICAgICAgdmFyIGplU3BpcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlZiA9ICQuRGVmZXJyZWQoKTtcclxuICAgICAgICAgICAgdmFyIGRlZjIgPSAkLkRlZmVycmVkKCk7XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oeyBpZDogXCJleGlzdHVqZVByaXBhZFZlU3Bpc3VcIiwgdGV4dDogXCJQcm9iw61ow6Ega29udHJvbGEgcMWZw61wYWTFryB2ZSBzcGlzdS4uLlwiIH0pO1xyXG4gICAgICAgICAgICB0aGF0LmlzbC5SZWRpc3RyaWJ1Y2UuZXhpc3R1amVQcmlwYWRWZVNwaXN1KHsgc3Bpc0R0b3M6IHByaXBhZHkgfSlcclxuICAgICAgICAgICAgICAgIC5nZXQoKVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmLnJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0pLmFsd2F5cygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oeyBpZDogXCJleGlzdHVqZVByaXBhZFZlU3Bpc3VcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBkZWYuZG9uZSgocmVzdWx0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5qZV92ZV9zcGlzdSkgamVTcGlzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGplU3Bpcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlDFmWV2esOtdCBzcGlzP1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlZlIHZ5YnJhbsO9Y2ggdnltw6Fow6Fuw61jaCBqc291IG7Em2t0ZXLDqSB2eW3DoWjDoW7DrSB2bG/FvmVueSBkbyBzcGlzdS4gXFxuIFxcbiBcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiVSB0xJtjaHRvIHZ5bcOhaMOhbsOtIGJ1ZGUgcMWZZXZ6YXQgY2Vsw70gc3BpcywgY2hjZXRlIHBva3JhxI1vdmF0P1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA0MDAsIDIwMFxyXG4gICAgICAgICAgICAgICAgICAgICkub24oXCJjbG9zZVwiLCAoX2V2LCByZXRWYWwpID0+IHsgLy8gbcOhbWUgaSBwxZnDrXBhZHkgdmUgc3Bpc3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbCA9PT0gXCJ5ZXNcIikgZGVmMi5yZXNvbHZlKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGRlZjIucmVqZWN0KCk7IC8vIHBva3VkIHXFvml2YXRlbCBuZWNoY2UgcMWZZWRhdCBjZWzDvSBzcGlzLCB0YWsga29uxI3DrW1lXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgZGVmMi5yZXNvbHZlKCk7IC8vIHBva3VkIG5lbcOhbWUgcMWZw61wYWR5IHZlIHNwaXN1LCB0YWsgcG9rcmHEjXVqZW1lXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBkZWYyLnByb21pc2UoKS5kb25lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuaXNsLlJlZGlzdHJpYnVjZS5wcmV2emV0aSh7IHByaXBhZDogcHJpcGFkLCBwcml6U2VrY2U6IDEgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0KCkuZG9uZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIga2luZCA9IHJlc3VsdC53aXpfa2luZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtpbmQgPT0gR29yZGljLklzbC5HT3BlcmF0aW9uUmVzdWx0S2luZC5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zaG93Rmxhc2goXCJWeW3DoWjDoW7DrSBieWxvIMO6c3DEm8WhbsSbIHDFmWV2emF0by5cIiwgXCJzdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChraW5kID09IEdvcmRpYy5Jc2wuR09wZXJhdGlvblJlc3VsdEtpbmQuRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNob3dGbGFzaChcIlZ5bcOhaMOhbsOtIHNlIG5lcG9kYcWZaWxvIHDFmWV2esOtdDogXCIgKyByZXN1bHQud2l6X3R4dF9lcnIsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgICAgIC8vI3JlZ2lvbiBGdW5rY2UgamVkbm90bGl2w71jaCBwb2zDrcSNZWtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBabcSbbmEgc2t1cGlueSB2eW3DoWjDoW7DrSBcclxuICAgICAgICAgKiBAbWV0aG9kIHBvWm1lbmVTdWJqZWt0dSgpXHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IGN0eCBEYXRhIHogcG9sw63EjWthIHBvIHptxJtuxJtcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHBvWm1lbmVTa3VwaW55KGN0eDogYW55KTogdm9pZCB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdiBUSyB0byBieWxvIE5hY3RpRXN1SW5mbyAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3Qgc3RhdlZ5bUZpZWxkID0gdGhhdC5maW5kRmllbGRzKFwic3Rhdl92eW1cIik7ICAgICBcclxuICAgICAgICAgICAgLy8gcG9sw63EjWtvIGNpesOpaG8gYmFua292bsOtaG8gw7rEjXR1XHJcbiAgICAgICAgICAgIGlmIChzdGF2VnltRmllbGQuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIikgPT0gZmFsc2UpIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgamUgcG9sw63EjWtvIGVkaXRvdmF0ZWxuw6lcclxuICAgICAgICAgICAgICAgIGlmIChjdHgudmFsdWUgIT09IG51bGwpICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG7Em2pha8O9IHN1Ympla3QgamUgdnlicsOhblxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXZWeW1GaWVsZC5nZmllbGQoXCJvcHRpb25cIiwgXCJzZXJ2ZXJGaWx0ZXJzXCIsIHsgaXhzX3NrdjogY3R4LnZhbHVlLml4c19za3YgfSk7ICAgICAgICAgICAgICAgIC8vIG7DoWhyYWRhIHphIGRlcGVuZGVuY3kgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBlbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdWJqZWt0IGplIHByw6F6ZG7DvVxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXZWeW1GaWVsZC5nZmllbGQoXCJvcHRpb25cIiwgXCJzZXJ2ZXJGaWx0ZXJzXCIsIHsgaXhzX3N2azogbnVsbCB9KTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG7DoWhyYWRhIHphIGRlcGVuZGVuY3kgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0YXZWeW1GaWVsZC5nZmllbGQoXCJnZXRTZXJ2ZXJGaWx0ZXJzXCIpLnRoZW4oKHNmKSA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpqacWhdMSbbsOtIGFrdHXDoWxuw61jaCBzZXJ2ZXJvdsO9Y2ggZmlsdHLFryAocHJvbWlzZSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgR29yZGljLkRhdGEuUmVhZGVycy5TdGF2VnltYWhhbmlEZXRhaWwoKS5nZXREYXRhKHNmKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2csOhY2Vuw60gaG9kbm90IHBvbMOtxI1rYSBzIGFrdHXDoWxuw61taSBzZXJ2ZXJvdsO9bWkgZmlsdHJ5XHJcbiAgICAgICAgICAgIH0pLnRoZW4oKHN0YXYpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHBvIHZyw6FjZW7DrVxyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXYubGVuZ3RoID4gMCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIGV4aXN0dWrDrSBob2Rub3R5LCB0YWsgaG9kw61tZSBwcnZuw60sIGplbGlrb8W+IHRvIGJ5IG3Em2xvIGLDvXQgJ25ldXLEjWVubydcclxuICAgICAgICAgICAgICAgICAgICBzdGF2VnltRmllbGQuZ2ZpZWxkKFwibW9kZWxcIiwgXCJhcHBseVwiLCBzdGF2WzBdLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSk7ICAgICAgICAgICAgICAgICAgICAgICAvLyBkb3BsbsOtbSBqw60gZG8gcG9sw63EjWthICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZWxzZSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXhpc3R1amUgdsOtY2UgbmVibyDFvsOhZG7DoSBob2Rub3RhXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdlZ5bUZpZWxkLmdmaWVsZChcImNsZWFyXCIpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhayDDusSNZXQgdnltYcW+dVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgICAgICAvLyNlbmRyZWdpb25cclxuICAgIH1cclxufSJdfQ==