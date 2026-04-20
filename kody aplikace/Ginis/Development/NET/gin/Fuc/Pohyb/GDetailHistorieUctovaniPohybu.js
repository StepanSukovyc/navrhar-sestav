"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Gordic;
(function (Gordic) {
    var Fuc;
    (function (Fuc) {
        var WebClient;
        (function (WebClient) {
            let gcontent = Decorators.gcontent;
            /**
             * Detail případu
             *
             * @author Martin Boček
             * @since 480.1.0.12
             */
            let GDetailHistorieUctovaniPohybu = class GDetailHistorieUctovaniPohybu extends Gordic.GDetailBuilderContent {
                constructor() {
                    super(...arguments);
                    /**
                     * Grid pohybů
                     * @type {JQuery | null}
                     */
                    this.$gridPohyby = null;
                    /**
                     * Grid soupisek
                     * @type {JQuery | null}
                     */
                    this.$gridSoupisky = null;
                    /**
                     * Grid dokladů o zaúčtování
                     * @type {JQuery | null}
                     */
                    this.$gridDoklady = null;
                    /**
                     * Grid zápisů dokladů o zaúčtování
                     * @type {JQuery | null}
                     */
                    this.$gridZapisyDokladu = null;
                }
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    // jen nastavení okna
                    this.aktualizaceDetailu();
                }
                /**
                 * Obsluha události builderInit
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder detailbuilder
                 */
                onDetailBuilderInit(builder) {
                    let that = this;
                    // badge
                    this.BadgeDoklady = WebClient.FucDetail.createBadge("pocetDokladuBadge");
                    this.BadgePohyby = WebClient.FucDetail.createBadge("pocetPohybuBadge");
                    this.BadgeSoupisky = WebClient.FucDetail.createBadge("pocetSoupisekBadge");
                    // definice akcí, tabů, kpi, menu apod.
                    builder.withComponent("detail", {
                        actions: {
                            actOpravitNedokoncene: {
                                caption: "Opravit nedokončenou historii",
                                icon: Gordic.Gin.Icons.ActionEnum.zmenit,
                                enabled: false,
                                run: function () { this.setPending(that.opravaNedokoncene()); }
                            },
                            actNastavitZauctovano: {
                                caption: "jres:24100420", //RC 24100420 : Nastavit zaúčtováno
                                enabled: false,
                                run: function () { this.setPending(that.nastavitZauctovano()); }
                            },
                            actStornoNedokoncene: Gordic.Eko.Action.actionStornovat({
                                caption: "jres:24100421", //RC 24100421 : Stornovat nedokončené
                                run: function () { this.setPending(that.storno()); }
                            }),
                            actDiagnostika: Gordic.Eko.Action.actionDiagnostika({
                                run: function () { this.setPending(that.diagnostika()); }
                            }),
                            actObcerstveniHist: Gordic.Eko.Action.actionObcerstvit({
                                run: function () { this.setPending(that.reloadData()); }
                            }),
                            // doklady
                            actTiskDokladu: Gordic.Eko.Action.actionTisk({
                                enabled: true,
                                name: "actTiskDokladu",
                                tema: "fuc_ptm_engzau",
                                caption: "Doklad",
                                serverParameterMethod: "Gordic.Fuc.WebClient.GDetailHistorieUctovaniPohybu:PrintParameters",
                                reportStarting: function (rep) { return that.reportStarting(rep); },
                                reportGenerated: function () { return that.reportGenerated(); }
                            }),
                            actTiskVsechDokladu: Gordic.Eko.Action.actionTisk({
                                enabled: true,
                                name: "actTiskVsechDokladu",
                                tema: "fuc_ptm_engzau",
                                caption: "Všechny doklady",
                                serverParameterMethod: "Gordic.Fuc.WebClient.GDetailHistorieUctovaniPohybu:PrintParameters",
                                reportStarting: function (rep) { return that.reportStarting(rep, true); },
                                reportGenerated: function () { return that.reportGenerated(true); }
                            }),
                            actDokladOZauctovani: WebClient.FucActions.actionDokladOZauctovani({
                                run: function () { this.setPending(that.dokladOZauctovani()); }
                            }),
                            // soupisky
                            actDetailSoupisky: Gordic.Eko.Action.actionDetail({
                                run: function () { this.setPending(that.detailSoupisky()); }
                            }),
                            // pohyby
                            actDetailPohybu: Gordic.Eko.Action.actionDetail({
                                run: function () { this.setPending(that.detailPohybu()); }
                            }),
                            actTiskZapisuPohybu: Gordic.Eko.Action.actionTisk({
                                enabled: true,
                                name: "actTiskZapisuPohybu",
                                tema: "fuc_ptm_dokagd",
                                caption: "Zápisy pohybu",
                                serverParameterMethod: "Gordic.Fuc.WebClient.GDetailHistorieUctovaniPohybu:PrintParameters",
                                reportStarting: function (rep) { return that.reportStarting(rep); },
                                reportGenerated: function () { return that.reportGenerated(); }
                            }),
                            // pro KPI
                            //actTabDoklady: { caption: "Doklady", enabled: true, run: function () { FucDetail.switchToGrpAndTab(that, "grpDoklady", "tabDoklady"); } },
                            //actTabPohyby: { caption: "Pohyby", enabled: true, run: function () { FucDetail.switchToGrpAndTab(that, "grpPohyby", "tabPohyby"); } },
                            //actTabSoupisky: { caption: "Soupisky pohybů", enabled: true, run: function () { FucDetail.switchToGrpAndTab(that, "grpSoupisky", "tabSoupisky"); } }
                        },
                        tabGroups: [
                            { id: "grpDoklady", caption: "Doklady", badge: this.BadgeDoklady },
                            { id: "grpSoupisky", caption: "Soupisky pohybů", badge: this.BadgeSoupisky, visible: that.DetailDto.pocet_soupisek != null && that.DetailDto.pocet_soupisek > 0 },
                            { id: "grpPohyby", caption: "jres:24100453", badge: this.BadgePohyby }, //RC 24100453 : Pohyby
                            { id: "grpPodrobnosti", caption: "Podrobnosti" }
                        ],
                        menuBar: this.PovolitAutOpravu
                            ? [
                                //["jres:24100044", //RC 24100044 : Agenda
                                "actOpravitNedokoncene",
                                "actObcerstveniHist",
                                "actDiagnostika",
                                WebClient.FucDetail.createMenuShare(that, that.IxsHuf, undefined, undefined, true)
                            ]
                            : [
                                //["jres:24100044", //RC 24100044 : Agenda
                                "actNastavitZauctovano",
                                "actStornoNedokoncene",
                                "actObcerstveniHist",
                                "actDiagnostika",
                                WebClient.FucDetail.createMenuShare(that, that.IxsHuf, undefined, undefined, true)
                            ],
                        statusBar: [
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarSUct" })
                        ],
                        //kpis: {
                        //    kpiPocetDokladu: {
                        //        name: "kpiPocetDokladu",
                        //        value: that.DetailDto.pocet_dokladu ?? 0,
                        //        unit: "",
                        //        primaryText: "Počet dokladů",
                        //        secondaryText: "dokladů",
                        //        meaning: "info",
                        //        formatter: "N",
                        //        actionOnTitle: true,
                        //        itemTemplate: Gordic.Prefabs.Panels.kpiValueTwoRowsTextTemplate().itemTemplate,
                        //        action: "actTabDoklady",
                        //        showTextIcon: false,
                        //        visible: that.DetailDto.JeZauctovano ?? false,
                        //        isCurrency: false,
                        //    },
                        //    kpiPocetSoupisek: {
                        //        name: "kpiPocetSoupisek",
                        //        value: that.DetailDto.pocet_soupisek ?? 0,
                        //        unit: "",
                        //        primaryText: "Počet soupisek pohybů",
                        //        secondaryText: "soupisek",
                        //        meaning: "info",
                        //        formatter: "N",
                        //        actionOnTitle: true,
                        //        itemTemplate: Gordic.Prefabs.Panels.kpiValueTwoRowsTextTemplate().itemTemplate,
                        //        action: "actTabSoupisky",
                        //        showTextIcon: false,
                        //        visible: that.DetailDto.pocet_soupisek != null && that.DetailDto.pocet_soupisek > 0,
                        //        isCurrency: false,
                        //    },
                        //    kpiPocetPohybu: {
                        //        name: "kpiPocetPohybu",
                        //        value: that.DetailDto.pocet_pohybu ?? 0,
                        //        unit: "",
                        //        primaryText: "Počet pohybů",
                        //        secondaryText: "pohybů",
                        //        meaning: "info",
                        //        formatter: "N",
                        //        actionOnTitle: true,
                        //        itemTemplate: Gordic.Prefabs.Panels.kpiValueTwoRowsTextTemplate().itemTemplate,
                        //        action: "actTabPohyby",
                        //        showTextIcon: false,
                        //        visible: true,
                        //        isCurrency: false,
                        //    }
                        //},
                        tabs: {
                            tabDoklady: {
                                // vytvořené doklady o zaúčtování
                                initLazy: true,
                                tabParams: {
                                    title: "jres:24100452", //RC 24100452 : Doklady o zaúčtování
                                    group: { id: "grpDoklady" },
                                    opened: (that.DetailDto.pocet_dokladu ?? 0) > 0,
                                    locked: false,
                                    menuBar: ["actTiskDokladu*", "actTiskVsechDokladu*", "actDokladOZauctovani*"],
                                    badge: { params: this.BadgeDoklady },
                                    customLoad: function () {
                                        // načtení pohybů
                                        that.loadDoklady();
                                    }
                                },
                                init: function (tab) {
                                    // přidání gridů pohybů do tabu
                                    // TODO: neřešit nějaký jednodušší pohled? co je třeba na detailu pohybu u pohybů účtovaných stejným dokladem?
                                    //$.newDiv().appendTo(tab).gform("createFrom", new Gordic.Forms.Form("L1M1S1").addSection("Doklady o zaúčtování"));
                                    that.$gridDoklady = $.newDiv()
                                        .css("height", "100%")
                                        .appendTo(tab)
                                        .ggrid({
                                        name: "gridDoklady",
                                        // TODO: grid dodělat
                                        columnMode: "full", // fit (defaultne by melo byt toto), full
                                        //defaultAction: that.actions.actDetailPohybu,
                                        //searchColumns: ["vs", "c", "typ_ag", "ac"],
                                        columns: WebClient.FucGrid.Zapis.createGridFormatDoklady(false),
                                        cellActivate: function (ev, obj) {
                                            // načtení zápisů aktuálního dokladu
                                            if (obj.cellInfo)
                                                that.loadZapisyDokladu();
                                        }
                                    })
                                        .gautofit({
                                        resizersOnTab: false
                                    });
                                    //$.newDiv().appendTo(tab).gtab({ title: "Zápisy dokladu", opened: true, locked: false })
                                    $.newDiv().appendTo(tab).gform("createFrom", new Gordic.Forms.Form("L1M1S1").addSection("Zápisy dokladu"));
                                    that.$gridZapisyDokladu = $.newDiv()
                                        .css("height", "100%")
                                        .appendTo(tab)
                                        .ggrid({
                                        name: "gridZapisyDokladu",
                                        // TODO: grid dodělat
                                        columnMode: "full", // fit (defaultne by melo byt toto), full
                                        //defaultAction: that.actions.actDetailPohybu,
                                        //searchColumns: ["vs", "c", "typ_ag", "ac"],
                                        columns: WebClient.FucGrid.Zapis.createGridFormat(that, false)
                                    })
                                        .gautofit({
                                        resizersOnTab: false
                                    });
                                }
                            },
                            tabPohyby: {
                                // účtované pohyby
                                initLazy: true,
                                tabParams: {
                                    title: "jres:24100185", //RC 24100185 : Účetní pohyby
                                    group: { id: "grpPohyby" },
                                    opened: (that.DetailDto.pocet_pohybu ?? 0) > 0,
                                    locked: false,
                                    menuBar: ["actDetailPohybu*", "actTiskZapisuPohybu*"],
                                    badge: { params: this.BadgePohyby },
                                    customLoad: function () {
                                        // načtení pohybů
                                        that.loadPohyby();
                                    }
                                },
                                init: function (tab) {
                                    // přidání gridů pohybů do tabu
                                    // TODO: neřešit nějaký jednodušší pohled? co je třeba na detailu pohybu u pohybů účtovaných stejným dokladem?
                                    that.$gridPohyby = $.newDiv()
                                        .css("height", "100%")
                                        .appendTo(tab)
                                        .ggrid({
                                        name: "gridPohyby",
                                        // TODO: grid dodělat
                                        columnMode: "full", // fit (defaultne by melo byt toto), full
                                        defaultAction: that.actions.actDetailPohybu,
                                        //searchColumns: ["vs", "c", "typ_ag", "ac"],
                                        columns: WebClient.FucGrid.Pohyb.createGridFormat(that, Gordic.Fuc.Globals.Enums.TypSezPoh.UcetniPohyby),
                                        defaultProfile: {
                                            columnList: "ixp_upr,radek_upo,typ_upo_txt,s_upo_txt,s_sto_txt,ktg_upo_txt,znam_txt,c_upo,popis_upo,subjekt.nazev,dat_upo,dat_zauc,obd_dan,subrada_duz,priz_dd_txt"
                                        }
                                    })
                                        .gautofit({
                                        resizersOnTab: false
                                    });
                                }
                            },
                            tabSoupisky: {
                                // účtované pohyby
                                initLazy: true,
                                tabParams: {
                                    title: "jres:24100114", //RC 24100114 : Soupisky pohybů
                                    group: { id: "grpSoupisky" },
                                    opened: (that.DetailDto.pocet_soupisek ?? 0) > 0,
                                    locked: false,
                                    visible: that.DetailDto.pocet_soupisek != null && that.DetailDto.pocet_soupisek > 0,
                                    menuBar: ["actDetailSoupisky*" /*, "actTiskZapisuPohybu*"*/],
                                    badge: { params: this.BadgeSoupisky },
                                    customLoad: function () {
                                        // načtení pohybů
                                        that.loadSoupisky();
                                    }
                                },
                                init: function (tab) {
                                    // přidání gridů pohybů do tabu
                                    // TODO: neřešit nějaký jednodušší pohled? co je třeba na detailu pohybu u pohybů účtovaných stejným dokladem?
                                    that.$gridSoupisky = $.newDiv()
                                        .css("height", "100%")
                                        .appendTo(tab)
                                        .ggrid({
                                        name: "gridSoupisky",
                                        // TODO: grid dodělat
                                        columnMode: "full", // fit (defaultne by melo byt toto), full
                                        defaultAction: that.actions.actDetailSoupisky,
                                        //searchColumns: ["vs", "c", "typ_ag", "ac"],
                                        columns: WebClient.FucGrid.Soupiska.createGridFormat(that),
                                        defaultProfile: {
                                            columnList: "ixp,ixp_den_txt,s_soup_txt,ac_ag,ac,dat_evid,ixs_typ_txt,zkr_ag,c_soup,popis"
                                        }
                                    })
                                        .gautofit({
                                        resizersOnTab: false
                                    });
                                }
                            },
                            tabPodrobnosti: {
                                // Podrobnosti
                                tabParams: {
                                    title: "Podrobnosti", group: { id: "grpPodrobnosti" }, opened: true, locked: false,
                                },
                                init: function (tab) {
                                    // TODO: doplnit
                                    $.newDiv().appendTo(tab).gform("createFrom", new Gordic.Forms.Form({ name: "formPodrobnosti", layoutDescriptor: "L2M2S1" })
                                        .addSection("Parametry")
                                        .addRow("Kumulace za PID případu").addField("gselectbox", Gordic.Prefabs.Select.gincpan(), { disabled: true, name: "kumul_za_ixp", model: "kumul_za_ixp=priz_an" })
                                        .addRow("Středisková vyrovnanost").addField("gselectbox", Gordic.Prefabs.Select.gincpan(), { disabled: true, name: "priz_vyr_nks", model: "priz_vyr_nks=priz_an" })
                                        .addRow("Bez kontroly na přečerpání").addField("gselectbox", Gordic.Prefabs.Select.gincpan(), { disabled: true, name: "priz_bez_kontr", model: "priz_bez_kontr=priz_an" })
                                        .addRow("Zachovat ručně pořízené zápisy").addField("gselectbox", Gordic.Prefabs.Select.gincpan(), { disabled: true, name: "zach_ruc_zapisy", model: "zach_ruc_zapisy=priz_an" })
                                        .addRow("E-účetnictví").addField("gselectbox", Gordic.Prefabs.Select.gincpan(), { disabled: true, name: "e_ucetnictvi", model: "e_ucetnictvi=priz_an" })
                                        .addRow("E-účetnictví - OOZU").addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), { disabled: true, name: "ixs_fun_oozu_uct", model: "ixs_fun_oozu_uct=ixs_fun" })
                                        .addRow("E-účetnictví - Kniha UCT").addField("gselectbox", Gordic.Prefabs.Select.uctsden(), { disabled: true, name: "ixp_den_uct", model: "ixp_den_uct=ixp_den", })
                                        .addRow("identifikátor").addField("gstringbox", { disabled: true, name: "ixs_huf" })
                                        .addSection("Průběh")
                                        .addRow("Kontrola pohybů").addField("gdatebox", "w-6", { disabled: true, valueType: "datetime", name: "dat_zac_kont_poh" })
                                        .addField("gdatebox", "w-6", { disabled: true, valueType: "datetime", name: "dat_kon_kont_poh" })
                                        .addField("gselectbox", Gordic.Prefabs.Select.fuccpod(), { disabled: true, name: "priz_odl_kont_poh", model: "priz_odl_kont_poh=priz_odl" })
                                        .addRow("Příprava zápisů").addField("gdatebox", "w-6", { disabled: true, valueType: "datetime", name: "dat_zac_prip_zap" })
                                        .addField("gdatebox", "w-6", { disabled: true, valueType: "datetime", name: "dat_kon_prip_zap" })
                                        .addField("gselectbox", Gordic.Prefabs.Select.fuccpod(), { disabled: true, name: "priz_odl_prip_zap", model: "priz_odl_prip_zap=priz_odl" })
                                        .addRow("Příprava dokladů").addField("gdatebox", "w-6", { disabled: true, valueType: "datetime", name: "dat_zac_prip_dok" })
                                        .addField("gdatebox", "w-6", { disabled: true, valueType: "datetime", name: "dat_kon_prip_dok" })
                                        .addField("gselectbox", Gordic.Prefabs.Select.fuccpod(), { disabled: true, name: "priz_odl_prip_dok", model: "priz_odl_prip_dok=priz_odl" })
                                        .addRow("Zaúčtování").addField("gdatebox", "w-6", { disabled: true, valueType: "datetime", name: "dat_zac_zauct" })
                                        .addField("gdatebox", "w-6", { disabled: true, valueType: "datetime", name: "dat_kon_zauct" })
                                        .addField("gselectbox", Gordic.Prefabs.Select.fuccpod(), { disabled: true, name: "priz_odl_zauct", model: "priz_odl_zauct=priz_odl" })
                                        .addSection("Další informace")
                                        // TODO: nastavovat vždy výšku 4 nebo použítat autoSize?
                                        .addRow("Text chyby").addField("gstringbox", Gordic.Eko.Detail.Field.getCounterOptions(1000 /* Fuc.Interface.GHistorieUctovaniDtoTypeLengths.text_chyby */, false, false, { disabled: true, name: "text_chyby", rows: /*4*/ 1, /*wrap: true*/ autoSize: true }))
                                        //.addRow("Text chyby").addField("gstringbox", { disabled: true, name: "text_chyby", rows: 4 })
                                        .addRow("Důvod servisní změny stavu").addField("gstringbox", { disabled: true, name: "duvod_servis" }));
                                }
                            }
                        }
                    }, true);
                    // nastavení kpipanelu
                    $.extend(builder.kpiPanelOptions, { sortable: true });
                }
                /**
                 * Obsluha události builderBuild
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder detailbuilder
                 */
                onDetailBuilderBuild(builder) {
                    let that = this;
                    // napojení standardní EKO hlavičky
                    // úprava více méně všech sekce
                    const formSetup = {};
                    const headerForm = new Gordic.Forms.Form({ name: "formHeader" })
                        .addSection()
                        .addRow("Účtované pohyby").addField("gselectbox", Gordic.Prefabs.Select.fucckup(), { disabled: true, name: "uct_poh", model: "uct_poh=uct_poh" })
                        .addRow("Typ účtování").addField("gselectbox", Gordic.Prefabs.Select.fucctuf(), { disabled: true, name: "typ_uct_fuc", model: "typ_uct_fuc=typ_uct_fuc" })
                        .addSection()
                        .addRow("Zahájeno").addField("gdatebox", { disabled: true, valueType: "datetime", name: "dat_start" })
                        .addRow("Ukončeno").addField("gdatebox", { disabled: true, valueType: "datetime", name: "dat_konec" })
                        .addSection()
                        .addRow("Stav").addField("gselectbox", Gordic.Prefabs.Select.fuccsuc(), { disabled: true, name: "stav_uctovani", model: "stav_uctovani=stav_uctovani" });
                    formSetup[Gordic.Eko.HeaderForm.Sections.Info] = {
                        rows: [
                            headerForm.form.sections[0].rows[0], // účtované pohyby
                            headerForm.form.sections[0].rows[1], // typ
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data1] = {
                        rows: [
                            headerForm.form.sections[1].rows[0], // datum zahájení
                            headerForm.form.sections[1].rows[1], // datum ukončení
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data2] = {
                        rows: [
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.Zpracovatel)[0]?.item, // zpracovatel
                            headerForm.form.sections[2].rows[0], // stav
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data3] = {
                        rows: [
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.Popis)[0]?.item, // popis (poznámka)
                        ]
                    };
                    // vlastní nastavení prvků (převážně model). pozor, nesmí se měnit name
                    formSetup[Gordic.Eko.HeaderForm.Fields.Id] = { options: { model: "ixs_huf" } };
                    formSetup[Gordic.Eko.HeaderForm.Fields.DatumEvidence] = { options: { model: "dat_konec" } };
                    formSetup[Gordic.Eko.HeaderForm.Fields.Popis] = { options: { model: "poznamka" } };
                    // jiný label pro popis
                    formSetup[Gordic.Eko.HeaderForm.Rows.Popis] = { label: "Poznámka" };
                    // aktualizace hlavičky
                    Gordic.Eko.HeaderForm.setup(builder, formSetup);
                    // úprava menu a položek
                    WebClient.FucDetail.changeBuilderDefinition(builder);
                    // šipky pro posun po seznamu
                    this.listControls_setup({
                        rowToDto: function (gridState) {
                            return {
                                IxsHuf: gridState.currentRow.data.ixs_huf,
                                NasledujiciDetail: true
                            };
                        },
                        nextItemTemplate: "Následující: {ixs_huf}",
                        prevItemTemplate: "Předchozí: {ixs_huf}",
                        beforeMove: that.closing
                    });
                }
                /**
                 * Obsluha aktivní operace
                 *
                 * @param {JQuery.Event} ev událost
                 * @param {any} ctx? původní událost a její argumenty
                 */
                onDetailBuilderActiveOp(ev, ctx) {
                    this.setActiveOperationAndReloadData(true);
                }
                /**
                 * Nahrání a zobrazení pohybů
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadPohyby() {
                    let that = this;
                    // načtení dat
                    that.beginOperation("jres:24100480"); //RC 24100480 : Probíhá načtení pohybů
                    return that.isl.FinPohyb.list(rq => { return { filters: { huf_ixs_huf: that.DetailDto.ixs_huf } }; })
                        .getData()
                        .then(function (data) {
                        // pohled
                        let view = new Gordic.Data.View(data, { key: "ixp_upr,radek_upo" });
                        // nastavení dat a překreslení gridu
                        that.$gridPohyby.ggrid("setData", view);
                        return;
                    })
                        .done(function () {
                        // aktualizace okna
                        that.enable();
                    })
                        .always(function () {
                        that.endOperation();
                    });
                }
                /**
                 * Zobrazí detail vybraného pohybu
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detailPohybu() {
                    let that = this;
                    // aktuální vybraná položka
                    let aktRadek = Gordic.Eko.Grid.currentRow(this.$gridPohyby);
                    if (aktRadek !== null) {
                        // příznak aktivní operace
                        let needRefresh = false;
                        // otevření detailu
                        let $detailWindow = this.navigate(["Gordic.Fuc.WebClient.GDetailPohybu", { gridRemoteControl: new Gordic.Components.GridRC(that.$gridPohyby) }], {
                            ID: 'DetailPohybu#',
                            IxpUpr: aktRadek.ixp_upr,
                            RadekUpo: aktRadek.radek_upo
                        });
                        // obsluha aktivní operace na detailu
                        $.content($detailWindow).on(WebClient.FucDetail.triggerChange, (retVal) => {
                            // záznam byl změněn, musí se načíst znovu
                            if (retVal?.data?.ixp_upr && retVal?.data?.radek_upo) {
                                // bude se občerstvovat
                                needRefresh = true;
                            }
                        });
                        // obsluha ukončení okna
                        $detailWindow.on("closed", (retVal) => {
                            // aktualizace detailu (byla-li aktivní operace v otevřeném detailu)
                            if (needRefresh) {
                                that.setActiveOperationAndReloadData();
                            }
                        });
                        return $detailWindow.createDialogPromise();
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Nahrání a zobrazení soupisek
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadSoupisky() {
                    let that = this;
                    // načtení dat
                    that.beginOperation("jres:24100478"); //RC 24100478 : Probíhá načtení soupisek pohybů
                    return that.isl.FinPohybSoupiska.list(rq => { return { filters: { huf_ixs_huf: that.DetailDto.ixs_huf } }; })
                        .getData()
                        .then(function (data) {
                        // pohled
                        let view = new Gordic.Data.View(data, { key: "ixp" });
                        // nastavení dat a překreslení gridu
                        that.$gridSoupisky.ggrid("setData", view);
                        return;
                    })
                        .done(function () {
                        // aktualizace okna
                        that.enable();
                    })
                        .always(function () {
                        that.endOperation();
                    });
                }
                /**
                 * Zobrazí detail vybrané sooupisky
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detailSoupisky() {
                    let that = this;
                    // aktuální vybraná položka
                    let aktRadek = Gordic.Eko.Grid.currentRow(this.$gridSoupisky);
                    if (aktRadek !== null) {
                        // příznak aktivní operace
                        let needRefresh = false;
                        // otevření detailu
                        let $detailWindow = this.navigate(["Gordic.Fuc.WebClient.GDetailSoupisky", { gpc: Gordic.Eko.Utils.createBookGpc(this.gpc, aktRadek.ixp_den), gridRemoteControl: new Gordic.Components.GridRC(that.$gridSoupisky) }], {
                            ID: 'DetailSoupisky#',
                            Ixp: aktRadek.ixp,
                            IxpDen: aktRadek.ixp_den,
                        });
                        // obsluha aktivní operace na detailu
                        $.content($detailWindow).on(WebClient.FucDetail.triggerChange, (retVal) => {
                            // záznam byl změněn, musí se načíst znovu
                            if (retVal?.data?.ixp) {
                                // bude se občerstvovat
                                needRefresh = true;
                            }
                        });
                        // obsluha ukončení okna
                        $detailWindow.on("closed", (retVal) => {
                            // aktualizace detailu (byla-li aktivní operace v otevřeném detailu)
                            if (needRefresh) {
                                that.setActiveOperationAndReloadData();
                            }
                        });
                        return $detailWindow.createDialogPromise();
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Nahrání a zobrazení dokladů o zaúčtování
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadDoklady() {
                    let that = this;
                    if (this.DetailDto.JeZauctovano) {
                        // načtení dat
                        that.beginOperation("jres:24100479"); //RC 24100479 : Probíhá načtení dokladů
                        return that.isl.Zapis.listDokladu(rq => { return { filters: { z_historie: 1, huf_ixs_huf: that.DetailDto.ixs_huf } }; })
                            .getData()
                            .then(function (data) {
                            // pohled
                            let view = new Gordic.Data.View(data /*, { key: "ixp_upr,radek_upo" }*/);
                            // nastavení dat a překreslení gridu
                            that.$gridDoklady.ggrid("setData", view);
                            return;
                        })
                            .done(function () {
                            // aktualizace okna
                            that.enable();
                        })
                            .always(function () {
                            that.endOperation();
                        });
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Naplnění seznamu zápisů k dokladu
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadZapisyDokladu() {
                    let that = this;
                    // načtení dat do gridu zápisů
                    // TODO: nejsou špatně DTO ve volání metod?
                    let aktHlavickaD = Gordic.Eko.Grid.currentRow(this.$gridDoklady);
                    if (aktHlavickaD && !(aktHlavickaD instanceof jQuery)) {
                        //if (aktHlavickaD !== null) {
                        return that.isl.Zapis.list(rq => {
                            return {
                                filters: {
                                    dok_rok: aktHlavickaD.rok,
                                    dok_lic: aktHlavickaD.lic,
                                    dok_ico: aktHlavickaD.ico,
                                    dok_ucs: aktHlavickaD.ucs,
                                    dok_mesic: aktHlavickaD.mesic,
                                    dok_ac: aktHlavickaD.ac
                                }
                            };
                        })
                            .getData()
                            .then(function (data) {
                            // TODO: doplnit správný klíč podle typu, ale jestli je v případě dokladu vůbec nějaký unikátní primární klíč
                            let view = new Gordic.Data.View(data /*, { key: "ixp_upr,radek_upo" }*/);
                            // nastavení dat a překreslení gridu
                            that.$gridZapisyDokladu.ggrid("setData", view);
                            return;
                        })
                            .done(function () {
                            // nastavení přístupnosti akce
                            // TODO: podobně udělat další akce na seznamech (např. zobrazení detailu a pod.)
                            that.enable();
                        });
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Oprava nedokončené historie
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                opravaNedokoncene() {
                    let that = this;
                    // TODO: zjištění typů pohybů v účtování
                    // TODO: případná úprava dotazu a pak dotazy podle zjištšných typů
                    // TODO: zjištěné parametry předat do metody stornujNedokoncene (přidat převod pohybů a zachování polo a ručních)
                    // úvodní dotaz
                    return WebClient.FucDetail.runIslActionWithPromise(this, that.dialogs.confirmDangerous("Oprava nedokončené historie účtování", "Opravdu chcete opravit nedokončenou historii účtování? V okamžiku opravy nesmí být toto účtování nikde spuštěné!\n\n")
                        .createDialogPromise(GDlg.mbbYes.id)
                        .then(function () {
                        // zjištění stavu pohybů
                        return that.isl.FinPohyb.list(rq => { return { filters: { huf_ixs_huf: that.IxsHuf, s_upo: 10 } }; })
                            .getData()
                            .then(function (data) {
                            if (data.length > 0) {
                                return {
                                    exist_pohyby: true,
                                    exist_poloautomaticke: data.findIndex(item => item.typ_upo === Gordic.Fuc.Globals.Enums.TypUpo.UcetniPoloautomaticky) >= 0,
                                    exist_rucni: data.findIndex(item => item.typ_upo === Gordic.Fuc.Globals.Enums.TypUpo.UcetniRucni) >= 0
                                };
                            }
                            else
                                return {
                                    exist_pohyby: false,
                                    exist_poloautomaticke: false,
                                    exist_rucni: false
                                };
                        });
                    })
                        .then(function (returnObj) {
                        // parametry storna
                        // vytvoření formuláře
                        // TODO: doladit parametry pro převod pohybů vs. možnost storna - pokud by byly oba, musí se zde řešit vzhled formuláře, jestli mají být volby pro převod nebo ne (resp. by se ani nemusel dělat seket pohybů v předchozím then)
                        let formDef = new Gordic.Forms.Form({ name: "wizParams" /*, layoutDescriptor: "L1M1S1, L-3-7-2, M-3-7-2, S-12-12-0"*/ }).addSection();
                        formDef.addRow("jres:24100294").addField("gstringbox", { name: "duvod", validators: [new Gordic.Validators.Length({ max: 254 }), new Gordic.Validators.Required()] }); //RC 24100294 : Důvod
                        if (returnObj.exist_pohyby) {
                            formDef.addSection("Účtované pohyby");
                            formDef.addRow("Účtované pohyby").addField("gcheck", {
                                name: "prevest_pohyby",
                                label: "převést ze stavu 'v účtování' do 'nezaúčtováno'",
                                change: function (ev, changeObj) {
                                    let newValue;
                                    newValue = (changeObj.value === true);
                                    $(ev.target).closest(".gform").findFields("smazat_poloautomaticke", "smazat_rucni").gfield("option", "disabled", !newValue);
                                }
                            });
                            if (returnObj.exist_poloautomaticke)
                                formDef.addRow("Pohyby typu 'poloautomatické'").addField("gcheck", { name: "smazat_poloautomaticke", label: "smazat ručně pořízené zápisy" });
                            if (returnObj.exist_rucni)
                                formDef.addRow("Pohyby typu 'ruční'").addField("gcheck", { name: "smazat_rucni", label: "smazat ručně pořízené zápisy" });
                        }
                        // zadání parametrů
                        return WebClient.FucDetail.simpleFormOkCancel(that, formDef, { prevest_pohyby: true, exist_poloautomaticke: false, exist_rucni: false }, "Storno nedokončené historie účtování", 700, 300)
                            .createDialogPromise((dialogReturnValue) => { return dialogReturnValue ? true : false; });
                    }), 
                    // TODO: nepoužít GHistorieUctovaniStornoNedokonceneOperationDto?
                    (data) => {
                        // volání opravy
                        //if (returnObj.duvod && returnObj.duvod.length > 0) {
                        return that.isl.FinPohybHistorieUctovani.opravNedokoncene({
                            opravit: true,
                            duvod: data.duvod,
                            prevest_pohyby: data.prevest_pohyby,
                            smazat_poloautomaticke: data.smazat_poloautomaticke,
                            smazat_rucni: data.smazat_rucni,
                            rows: [that.DetailDto]
                        });
                        //.get();
                        //}
                        //else return $.Deferred().reject();
                    }, () => { return that.setActiveOperationAndReloadData(); }, that.actions.actStornoNedokoncene);
                }
                /**
                 * Storno nedokončené historie
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                storno() {
                    let that = this;
                    // TODO: zjištění typů pohybů v účtování
                    // TODO: případná úprava dotazu a pak dotazy podle zjištšných typů
                    // TODO: zjištěné parametry předat do metody stornujNedokoncene (přidat převod pohybů a zachování polo a ručních)
                    // úvodní dotaz
                    return WebClient.FucDetail.runIslActionWithPromise(this, that.dialogs.confirmDangerous("jres:24100231", //RC 24100231 : Storno nedokončené historie účtování
                    "jres:24100230" //RC 24100230 : Opravdu chcete stornovat nedokončenou historii účtování? V okamžiku storna nesmí být toto účtování nikde spuštěné!;;
                    )
                        .createDialogPromise(GDlg.mbbYes.id)
                        .then(function () {
                        // zjištění stavu pohybů
                        return that.isl.FinPohyb.list(rq => { return { filters: { huf_ixs_huf: that.IxsHuf, s_upo: 10 } }; })
                            .getData()
                            .then(function (data) {
                            if (data.length > 0) {
                                return {
                                    exist_pohyby: true,
                                    exist_poloautomaticke: data.findIndex(item => item.typ_upo === Gordic.Fuc.Globals.Enums.TypUpo.UcetniPoloautomaticky) >= 0,
                                    exist_rucni: data.findIndex(item => item.typ_upo === Gordic.Fuc.Globals.Enums.TypUpo.UcetniRucni) >= 0
                                };
                            }
                            else
                                return {
                                    exist_pohyby: false,
                                    exist_poloautomaticke: false,
                                    exist_rucni: false
                                };
                        });
                    })
                        .then(function (returnObj) {
                        // parametry storna
                        // vytvoření formuláře
                        // TODO: doladit parametry pro převod pohybů vs. možnost storna - pokud by byly oba, musí se zde řešit vzhled formuláře, jestli mají být volby pro převod nebo ne (resp. by se ani nemusel dělat seket pohybů v předchozím then)
                        let formDef = new Gordic.Forms.Form({ name: "wizParams" /*, layoutDescriptor: "L1M1S1, L-3-7-2, M-3-7-2, S-12-12-0"*/ }).addSection();
                        formDef.addRow("jres:24100294").addField("gstringbox", { name: "duvod", validators: [new Gordic.Validators.Length({ max: 254 }), new Gordic.Validators.Required()] }); //RC 24100294 : Důvod
                        if (returnObj.exist_pohyby) {
                            formDef.addSection("Účtované pohyby");
                            formDef.addRow("Účtované pohyby").addField("gcheck", {
                                name: "prevest_pohyby",
                                label: "převést ze stavu 'v účtování' do 'nezaúčtováno'",
                                change: function (ev, changeObj) {
                                    let newValue;
                                    newValue = (changeObj.value === true);
                                    $(ev.target).closest(".gform").findFields("smazat_poloautomaticke", "smazat_rucni").gfield("option", "disabled", !newValue);
                                }
                            });
                            if (returnObj.exist_poloautomaticke)
                                formDef.addRow("Pohyby typu 'poloautomatické'").addField("gcheck", { name: "smazat_poloautomaticke", label: "smazat ručně pořízené zápisy" });
                            if (returnObj.exist_rucni)
                                formDef.addRow("Pohyby typu 'ruční'").addField("gcheck", { name: "smazat_rucni", label: "smazat ručně pořízené zápisy" });
                        }
                        // zadání parametrů
                        return WebClient.FucDetail.simpleFormOkCancel(that, formDef, { prevest_pohyby: true, exist_poloautomaticke: false, exist_rucni: false }, "Storno nedokončené historie účtování", 700, 300)
                            .createDialogPromise((dialogReturnValue) => { return dialogReturnValue ? true : false; });
                    }), 
                    // TODO: nepoužít GHistorieUctovaniStornoNedokonceneOperationDto?
                    (data) => {
                        // volání storna
                        //if (returnObj.duvod && returnObj.duvod.length > 0) {
                        return that.isl.FinPohybHistorieUctovani.stornujNedokoncene({
                            stornovat: true,
                            duvod: data.duvod,
                            prevest_pohyby: data.prevest_pohyby,
                            smazat_poloautomaticke: data.smazat_poloautomaticke,
                            smazat_rucni: data.smazat_rucni,
                            rows: [that.DetailDto]
                        });
                        //.get();
                        //}
                        //else return $.Deferred().reject();
                    }, () => { return that.setActiveOperationAndReloadData(); }, that.actions.actStornoNedokoncene);
                }
                /**
                 * nastavení stavu zaúčtováno
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                nastavitZauctovano() {
                    let that = this;
                    // TODO: nedat tento dialog i do servisní změny stavů pohybu?
                    return WebClient.FucDetail.runIslActionWithReasonAndConfirmDangerous(this, "jres:24100233", //RC 24100233 : Opravdu chcete nastavit stav zaúčtováno u nedokončené historii účtování? V okamžiku nastavení nesmí být toto účtování nikde spuštěné!;;
                    undefined, (data) => { return that.isl.FinPohybHistorieUctovani.nastavZauctovano({ zauctovano: true, duvod: data.duvod, rows: [that.DetailDto] }); }, () => { return that.setActiveOperationAndReloadData(); }, that.actions.actNastavitZauctovano);
                }
                /**
                 * Uložení / zobrazení dokladu o zaúčtování
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                dokladOZauctovani() {
                    if (this.DetailDto.JeZauctovano) {
                        let aktDoklad = Gordic.Eko.Grid.currentRow(this.$gridDoklady);
                        if (aktDoklad) {
                            // uložení/otevření souboru
                            return WebClient.FucDetail.dokladOZauctovani(this, null /*aktDoklad?.ixb_dzu*/, aktDoklad?.rok, aktDoklad?.lic, aktDoklad?.ico, aktDoklad?.ucs, aktDoklad?.mesic, aktDoklad?.ac);
                        }
                        else
                            return $.Deferred().reject().promise();
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Diagnostika (uložení dat)
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                diagnostika() {
                    // uložení zipu s daty aktuálního historie účtování
                    return WebClient.FucDetail.diagnostika(0 /* Wfl.Interface.GIdentifikatorCoJsemZac.Neurceno */, this.IxsHuf, this);
                }
                /**
                 * Nastavení prvků ve formuláři
                 */
                enable() {
                    // status bar
                    // zaúčtován OK, přerušen varování, jinak info
                    Gordic.Eko.Detail.StatusBar.updateItem(this.statuses["statusBarSUct"], this.DetailDto.stav_uctovani_txt?.toUpperCase() ?? "", (this.DetailDto.stav_uctovani >= Gordic.Fuc.Globals.Enums.StavUctovaniPohybu.Zauctovano && this.DetailDto.stav_uctovani <= Gordic.Fuc.Globals.Enums.StavUctovaniPohybu.ZauctovanoSPrecerpanim
                        ? Gordic.Eko.Utils.RecordFormatType.Realizovano
                        : (this.DetailDto.stav_uctovani >= Gordic.Fuc.Globals.Enums.StavUctovaniPohybu.Zahajeno && this.DetailDto.stav_uctovani <= Gordic.Fuc.Globals.Enums.StavUctovaniPohybu.UkoncenoZauctovani
                            ? Gordic.Eko.Utils.RecordFormatType.Stornovano
                            : (this.DetailDto.stav_uctovani >= Gordic.Fuc.Globals.Enums.StavUctovaniPohybu.PrerusenoUzivatelem && this.DetailDto.stav_uctovani <= Gordic.Fuc.Globals.Enums.StavUctovaniPohybu.PrerusenoKvuliChybe
                                ? Gordic.Eko.Utils.RecordFormatType.Vyrazeno
                                : null))));
                    // akce
                    const permEmptyGrid = WebClient.FucGrid.getEmptyGridPermission();
                    const acts = this.actions;
                    const perms = this.DetailDto.Permissions;
                    acts.actOpravitNedokoncene.updatePermission((perms ? perms.LzeOpravitNedokoncene : undefined));
                    acts.actStornoNedokoncene.updatePermission((perms ? perms.LzeStornovatNedokoncene : undefined));
                    acts.actNastavitZauctovano.updatePermission((perms ? perms.LzeNastavitZauctovano : undefined));
                    acts.actDiagnostika.updatePermission(perms ? perms.LzeDiagnostika : undefined);
                    acts.actObcerstveniHist.updatePermission({ value: true });
                    // tab doklady
                    let aktRadekDok = Gordic.Eko.Grid.currentRow(this.$gridDoklady);
                    acts.actTiskDokladu.updatePermission(aktRadekDok !== null ? (this.DetailDto.JeZauctovano === true ? { value: true } : { value: false, message: "Doklad není zaúčtován" }) : permEmptyGrid);
                    acts.actTiskVsechDokladu.updatePermission(aktRadekDok !== null ? (this.DetailDto.JeZauctovano === true ? { value: true } : { value: false, message: "Doklad není zaúčtován" }) : permEmptyGrid);
                    acts.actDokladOZauctovani.updatePermission(aktRadekDok !== null ? (this.DetailDto.JeZauctovano === true ? /*(aktRadekDok.ixb_dzu != null && aktRadekDok.ixb_dzu > " " ? (*/ { value: true } /*) : { value: false, message: "Vygenerovaný doklad o zaúčtování neexistuje" })*/ : { value: false, message: "Doklad není zaúčtován" }) : permEmptyGrid);
                    // tab soupisek
                    let aktRadekSou = Gordic.Eko.Grid.currentRow(this.$gridSoupisky);
                    acts.actDetailSoupisky.updatePermission(aktRadekSou !== null ? { value: true } : permEmptyGrid);
                    // tab pohybů
                    let aktRadekPoh = Gordic.Eko.Grid.currentRow(this.$gridPohyby);
                    acts.actDetailPohybu.updatePermission(aktRadekPoh !== null ? { value: true } : permEmptyGrid);
                    acts.actTiskZapisuPohybu.updatePermission(aktRadekPoh !== null ? (this.DetailDto.JeZauctovano === true ? { value: true } : { value: false, message: "Doklad není zaúčtován" }) : permEmptyGrid);
                }
                /**
                 * Nastavení příznaku aktivní operace a aktualizace detailu
                 *
                 * @param {boolean} withoutReload (default = false) true = neaktualizovat formulář
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                setActiveOperationAndReloadData(withoutReload = false) {
                    // vyvolání trigger o aktivní operaci
                    this.trigger(WebClient.FucDetail.triggerChange, [{ data: this.DetailDto }]);
                    // aktualizace detailu
                    if (!withoutReload) {
                        this.element.trigger("rememberinitialopen");
                        return this.load();
                    }
                    else
                        return $.Deferred().resolve().promise();
                }
                /**
                 * Znovu načte celý formulář
                 *
                 * @returns {JQuery.Promise<any>} promise
                 */
                reloadData() {
                    this.element.trigger("rememberinitialopen");
                    return this.load();
                }
                /**
                 * Aktualizace dat v detailu podle modelu a nastavení stavu prvků
                 */
                aktualizaceDetailu() {
                    // naplnění políček
                    // TODO: nechat DetailDto nebo to přejmenovat zpátky na model? nějak to dořešit, v kódu totiž používám oboje
                    this.findFields()
                        .gfield("model", "apply", this.DetailDto, { initialValues: true })
                        .gfield("model", "validators", this.validators);
                    // vybrání nějaké položky v gridu položek
                    //this.vybraniPolozky();
                    // naplnění gridu pohybů je až po rozkliknutí tabu
                    // badge
                    // TODO: nechat to zde nebo to přesunout do metody enable?
                    WebClient.FucDetail.updateBadge(this.BadgeDoklady, this.DetailDto?.pocet_dokladu);
                    WebClient.FucDetail.updateBadge(this.BadgePohyby, this.DetailDto?.pocet_pohybu);
                    WebClient.FucDetail.updateBadge(this.BadgeSoupisky, this.DetailDto?.pocet_soupisek);
                    // nastavení stavu políček a akcí
                    this.enable();
                }
                /**
                 * Zadání parametrů tisku
                 *
                 * @param {IGPrintActionReportStarting} rep parametry tisku
                 * @param {boolean} [vse] true = tisk všech dokladů najednou, jinak jen aktuální
                 */
                reportStarting(rep, vse) {
                    let that = this;
                    // nastavení parametrů podle tématu
                    if (rep.tema === "fuc_ptm_engzau") {
                        // doklad o zaúčtování
                        let aktDoklad = Gordic.Eko.Grid.currentRow(this.$gridDoklady);
                        if (aktDoklad !== null) {
                            rep.params.X0000 = aktDoklad.rok.toString(10);
                            rep.params.X0001 = aktDoklad.lic;
                            rep.params.X0002 = aktDoklad.ico;
                            rep.params.X0003 = aktDoklad.ucs;
                            rep.params.X0004 = aktDoklad.mesic.toString(10);
                            rep.params.X0005 = aktDoklad.ac;
                            if (this.DetailDto.typ_uct_fuc === 10 || this.DetailDto.typ_uct_fuc === 20)
                                rep.params.X0006 = "1";
                            else
                                rep.params.X0006 = "0";
                            // v případě tisku všech dokladů najednou je v X0007 log_por_cislo a v customDto IKC
                            rep.params.X0007 = "";
                            rep.customDto = {};
                            if (vse === true) {
                                // pro tisk vše naplnění pracovní tabulky
                                return this.call("VlozitDoPracSeznamu")
                                    .then((retVal) => {
                                    // využití dto pouze pro přenos IKC do CS, kde se použije na vytvoření devátého parametru
                                    rep.customDto = { duct_ikc: retVal };
                                    return;
                                });
                            }
                        }
                    }
                    else {
                        // elementární účetní zápisy
                        let aktPohyb = Gordic.Eko.Grid.currentRow(this.$gridPohyby);
                        if (aktPohyb !== null) {
                            rep.params.X0000 = aktPohyb.ixp_upr;
                            rep.params.X0001 = aktPohyb.radek_upo.toString(10);
                            rep.params.X0002 = "";
                            rep.customDto = {};
                        }
                    }
                }
                /**
                 * Ukončení generování sestavy
                 *
                 * @param {boolean} [vse] true = tisk všech dokladů najednou, jinak jen aktuální
                 */
                reportGenerated(vse) {
                    if (vse === true) {
                        // smazání pracovní tabulky
                        this.call("SmazatPracSeznam");
                    }
                }
                /**
                 * Test, jestli je možné okno zavřít
                 *
                 * @returns {JQueryPromise<Interface.GHistorieUctovaniDto> | Interface.GHistorieUctovaniDto} promise s daty (resolve = je možné zavřít, reject = není možné zavřít) nebo přímo data detailu
                 */
                closing() {
                    let that = this;
                    // kontrola na změněné položky
                    let formChanged = this.findForms().gform("hasChanged");
                    // TODO: dodat správnou podmínku - u zápočtových listů je if ((this.Editace || this.JePodan) && formChanged) {
                    if (true && formChanged) {
                        // dotaz na zavření bez uložení, protože se něco změnilo
                        // TODO: pokud by bylo potřeba (zatím se neukládá), tak dopracovat
                        return that.DetailDto;
                    }
                    else {
                        // pokud se needituje, je možné detail zavřít
                        return that.DetailDto;
                    }
                }
            };
            GDetailHistorieUctovaniPohybu = __decorate([
                gcontent
            ], GDetailHistorieUctovaniPohybu);
            WebClient.GDetailHistorieUctovaniPohybu = GDetailHistorieUctovaniPohybu;
        })(WebClient = Fuc.WebClient || (Fuc.WebClient = {}));
    })(Fuc = Gordic.Fuc || (Gordic.Fuc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbEhpc3RvcmllVWN0b3ZhbmlQb2h5YnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGV0YWlsSGlzdG9yaWVVY3RvdmFuaVBvaHlidS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBbW5DZjtBQW5uQ0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBbW5DbkI7SUFubkNnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FtbkM3QjtRQW5uQ29CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBS25DOzs7OztlQUtHO1lBRUgsSUFBYSw2QkFBNkIsR0FBMUMsTUFBYSw2QkFBOEIsU0FBUSxPQUFBLHFCQUF3QztnQkFBM0Y7O29CQUVJOzs7dUJBR0c7b0JBQ0ssZ0JBQVcsR0FBa0IsSUFBSSxDQUFDO29CQUMxQzs7O3VCQUdHO29CQUNLLGtCQUFhLEdBQWtCLElBQUksQ0FBQztvQkFDNUM7Ozt1QkFHRztvQkFDSyxpQkFBWSxHQUFrQixJQUFJLENBQUM7b0JBQzNDOzs7dUJBR0c7b0JBQ0ssdUJBQWtCLEdBQWtCLElBQUksQ0FBQztnQkFnbENyRCxDQUFDO2dCQXBpQ0c7O21CQUVHO2dCQUNJLGNBQWM7b0JBRWpCLHFCQUFxQjtvQkFDckIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQzlCLENBQUM7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0ksbUJBQW1CLENBQUMsT0FBZ0Q7b0JBRXZFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsUUFBUTtvQkFDUixJQUFJLENBQUMsWUFBWSxHQUFHLFVBQUEsU0FBUyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUMvRCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQUEsU0FBUyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO29CQUM3RCxJQUFJLENBQUMsYUFBYSxH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Q2YiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLkZ1Yy5XZWJDbGllbnQge1xyXG4gICAgbGV0IGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBleHBvcnQgdHlwZSBEdG9UeXBlSHVmID0gR29yZGljLkZ1Yy5JbnRlcmZhY2UuR0hpc3RvcmllVWN0b3ZhbmlEdG87XHJcbiAgICBleHBvcnQgdHlwZSBVc2VkQ29tcG9uZW50c0h1ZiA9IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlckNvbXBvbmVudHMuR0xpc3RDb250cm9sc0V4dGVuc2lvbnM8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR0hpc3RvcmllVWN0b3ZhbmlEdG8+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGV0YWlsIHDFmcOtcGFkdVxyXG4gICAgICpcclxuICAgICAqIEBhdXRob3IgTWFydGluIEJvxI1la1xyXG4gICAgICogQHNpbmNlIDQ4MC4xLjAuMTJcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RldGFpbEhpc3RvcmllVWN0b3ZhbmlQb2h5YnUgZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQ8VXNlZENvbXBvbmVudHNIdWY+IGltcGxlbWVudHMgSUdDb250ZW50IHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCBwb2h5YsWvXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeSB8IG51bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZFBvaHlieTogSlF1ZXJ5IHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCBzb3VwaXNla1xyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnkgfCBudWxsfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWRTb3VwaXNreTogSlF1ZXJ5IHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCBkb2tsYWTFryBvIHphw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeSB8IG51bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZERva2xhZHk6IEpRdWVyeSB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdyaWQgesOhcGlzxa8gZG9rbGFkxa8gbyB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnkgfCBudWxsfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWRaYXBpc3lEb2tsYWR1OiBKUXVlcnkgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gdmxhc3Rub3N0aSB6IEMjXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUElEIHDFmcOtcGFkdVxyXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBJeHNIdWY6IHN0cmluZztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBqZSBzdMOhdG7DrSBwb2tsYWRuYT9cclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IEplSWlzc3A6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogZXhpc3R1amUgbWV0b2RhIG5hIGF1dG9tYXRpY2tvdSBvcHJhdnUgaGlzdG9yaWUgw7rEjXRvdsOhbsOtP1xyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUG92b2xpdEF1dE9wcmF2dTogYm9vbGVhbjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEVE8gZGV0YWlsdSBoaXN0b3JpZSDDusSNdG92w6Fuw61cclxuICAgICAgICAgKiBAdHlwZSB7R29yZGljLkZ1Yy5JbnRlcmZhY2UuR0hpc3RvcmllVWN0b3ZhbmlEdG99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBEZXRhaWxEdG86IEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdIaXN0b3JpZVVjdG92YW5pRHRvO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJhZGdlIHBybyBwb8SNZXQgZG9rbGFkdVxyXG4gICAgICAgICAqIEB0eXBlIHtHT2JzZXJ2YWJsZU9iamVjdDxHQmFkZ2VPcHRpb25zPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEJhZGdlRG9rbGFkeTogR09ic2VydmFibGVPYmplY3Q8R0JhZGdlT3B0aW9ucz47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQmFkZ2UgcHJvIHBvxI1ldCBwb2h5YnVcclxuICAgICAgICAgKiBAdHlwZSB7R09ic2VydmFibGVPYmplY3Q8R0JhZGdlT3B0aW9ucz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBCYWRnZVBvaHlieTogR09ic2VydmFibGVPYmplY3Q8R0JhZGdlT3B0aW9ucz47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQmFkZ2UgcHJvIHBvxI1ldCBzb3VwaXNla1xyXG4gICAgICAgICAqIEB0eXBlIHtHT2JzZXJ2YWJsZU9iamVjdDxHQmFkZ2VPcHRpb25zPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEJhZGdlU291cGlza3k6IEdPYnNlcnZhYmxlT2JqZWN0PEdCYWRnZU9wdGlvbnM+O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZhbGlkw6F0b3J5XHJcbiAgICAgICAgICogQHR5cGUge29iamVjdFtdfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgdmFsaWRhdG9yczogb2JqZWN0W107XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphZGVmaW5vdsOhbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gamVuIG5hc3RhdmVuw60gb2tuYVxyXG4gICAgICAgICAgICB0aGlzLmFrdHVhbGl6YWNlRGV0YWlsdSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2JzbHVoYSB1ZMOhbG9zdGkgYnVpbGRlckluaXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlciBkZXRhaWxidWlsZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBiYWRnZVxyXG4gICAgICAgICAgICB0aGlzLkJhZGdlRG9rbGFkeSA9IEZ1Y0RldGFpbC5jcmVhdGVCYWRnZShcInBvY2V0RG9rbGFkdUJhZGdlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLkJhZGdlUG9oeWJ5ID0gRnVjRGV0YWlsLmNyZWF0ZUJhZGdlKFwicG9jZXRQb2h5YnVCYWRnZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5CYWRnZVNvdXBpc2t5ID0gRnVjRGV0YWlsLmNyZWF0ZUJhZGdlKFwicG9jZXRTb3VwaXNla0JhZGdlXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gZGVmaW5pY2UgYWtjw60sIHRhYsWvLCBrcGksIG1lbnUgYXBvZC5cclxuICAgICAgICAgICAgYnVpbGRlci53aXRoQ29tcG9uZW50PHRoaXM+KFwiZGV0YWlsXCIsIHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBhY3RPcHJhdml0TmVkb2tvbmNlbmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJPcHJhdml0IG5lZG9rb27EjWVub3UgaGlzdG9yaWlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogR2luLkljb25zLkFjdGlvbkVudW0uem1lbml0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0Lm9wcmF2YU5lZG9rb25jZW5lKCkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3ROYXN0YXZpdFphdWN0b3Zhbm86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0MTAwNDIwXCIsIC8vUkMgMjQxMDA0MjAgOiBOYXN0YXZpdCB6YcO6xI10b3bDoW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQubmFzdGF2aXRaYXVjdG92YW5vKCkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RTdG9ybm9OZWRva29uY2VuZTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uU3Rvcm5vdmF0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0MTAwNDIxXCIsIC8vUkMgMjQxMDA0MjEgOiBTdG9ybm92YXQgbmVkb2tvbsSNZW7DqVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQuc3Rvcm5vKCkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0RGlhZ25vc3Rpa2E6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRpYWdub3N0aWthKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0LmRpYWdub3N0aWthKCkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0T2JjZXJzdHZlbmlIaXN0OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25PYmNlcnN0dml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0LnJlbG9hZERhdGEoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBkb2tsYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0VGlza0Rva2xhZHU6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdFRpc2tEb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbWE6IFwiZnVjX3B0bV9lbmd6YXVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEb2tsYWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5GdWMuV2ViQ2xpZW50LkdEZXRhaWxIaXN0b3JpZVVjdG92YW5pUG9oeWJ1OlByaW50UGFyYW1ldGVyc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkgeyByZXR1cm4gdGhhdC5yZXBvcnRTdGFydGluZyhyZXApOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXBvcnRHZW5lcmF0ZWQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoYXQucmVwb3J0R2VuZXJhdGVkKCk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RUaXNrVnNlY2hEb2tsYWR1OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25UaXNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RUaXNrVnNlY2hEb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbWE6IFwiZnVjX3B0bV9lbmd6YXVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJWxaFlY2hueSBkb2tsYWR5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuRnVjLldlYkNsaWVudC5HRGV0YWlsSGlzdG9yaWVVY3RvdmFuaVBvaHlidTpQcmludFBhcmFtZXRlcnNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHsgcmV0dXJuIHRoYXQucmVwb3J0U3RhcnRpbmcocmVwLCB0cnVlKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0R2VuZXJhdGVkOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGF0LnJlcG9ydEdlbmVyYXRlZCh0cnVlKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdERva2xhZE9aYXVjdG92YW5pOiBGdWNBY3Rpb25zLmFjdGlvbkRva2xhZE9aYXVjdG92YW5pKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0LmRva2xhZE9aYXVjdG92YW5pKCkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc291cGlza3lcclxuICAgICAgICAgICAgICAgICAgICBhY3REZXRhaWxTb3VwaXNreTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRGV0YWlsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0LmRldGFpbFNvdXBpc2t5KCkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcG9oeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0RGV0YWlsUG9oeWJ1OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZGV0YWlsUG9oeWJ1KCkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0VGlza1phcGlzdVBvaHlidTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVGlzayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYWN0VGlza1phcGlzdVBvaHlidVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1hOiBcImZ1Y19wdG1fZG9rYWdkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiWsOhcGlzeSBwb2h5YnVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5GdWMuV2ViQ2xpZW50LkdEZXRhaWxIaXN0b3JpZVVjdG92YW5pUG9oeWJ1OlByaW50UGFyYW1ldGVyc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkgeyByZXR1cm4gdGhhdC5yZXBvcnRTdGFydGluZyhyZXApOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXBvcnRHZW5lcmF0ZWQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoYXQucmVwb3J0R2VuZXJhdGVkKCk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBwcm8gS1BJXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hY3RUYWJEb2tsYWR5OiB7IGNhcHRpb246IFwiRG9rbGFkeVwiLCBlbmFibGVkOiB0cnVlLCBydW46IGZ1bmN0aW9uICgpIHsgRnVjRGV0YWlsLnN3aXRjaFRvR3JwQW5kVGFiKHRoYXQsIFwiZ3JwRG9rbGFkeVwiLCBcInRhYkRva2xhZHlcIik7IH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAvL2FjdFRhYlBvaHlieTogeyBjYXB0aW9uOiBcIlBvaHlieVwiLCBlbmFibGVkOiB0cnVlLCBydW46IGZ1bmN0aW9uICgpIHsgRnVjRGV0YWlsLnN3aXRjaFRvR3JwQW5kVGFiKHRoYXQsIFwiZ3JwUG9oeWJ5XCIsIFwidGFiUG9oeWJ5XCIpOyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hY3RUYWJTb3VwaXNreTogeyBjYXB0aW9uOiBcIlNvdXBpc2t5IHBvaHlixa9cIiwgZW5hYmxlZDogdHJ1ZSwgcnVuOiBmdW5jdGlvbiAoKSB7IEZ1Y0RldGFpbC5zd2l0Y2hUb0dycEFuZFRhYih0aGF0LCBcImdycFNvdXBpc2t5XCIsIFwidGFiU291cGlza3lcIik7IH0gfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRhYkdyb3VwczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwiZ3JwRG9rbGFkeVwiLCBjYXB0aW9uOiBcIkRva2xhZHlcIiwgYmFkZ2U6IHRoaXMuQmFkZ2VEb2tsYWR5IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJncnBTb3VwaXNreVwiLCBjYXB0aW9uOiBcIlNvdXBpc2t5IHBvaHlixa9cIiwgYmFkZ2U6IHRoaXMuQmFkZ2VTb3VwaXNreSwgdmlzaWJsZTogdGhhdC5EZXRhaWxEdG8ucG9jZXRfc291cGlzZWsgIT0gbnVsbCAmJiB0aGF0LkRldGFpbER0by5wb2NldF9zb3VwaXNlayA+IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGlkOiBcImdycFBvaHlieVwiLCBjYXB0aW9uOiBcImpyZXM6MjQxMDA0NTNcIiwgYmFkZ2U6IHRoaXMuQmFkZ2VQb2h5YnkgfSwgLy9SQyAyNDEwMDQ1MyA6IFBvaHlieVxyXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwiZ3JwUG9kcm9ibm9zdGlcIiwgY2FwdGlvbjogXCJQb2Ryb2Jub3N0aVwiIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBtZW51QmFyOiB0aGlzLlBvdm9saXRBdXRPcHJhdnVcclxuICAgICAgICAgICAgICAgICAgICA/IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9bXCJqcmVzOjI0MTAwMDQ0XCIsIC8vUkMgMjQxMDAwNDQgOiBBZ2VuZGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RPcHJhdml0TmVkb2tvbmNlbmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RPYmNlcnN0dmVuaUhpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3REaWFnbm9zdGlrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBGdWNEZXRhaWwuY3JlYXRlTWVudVNoYXJlKHRoYXQsIHRoYXQuSXhzSHVmLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vW1wianJlczoyNDEwMDA0NFwiLCAvL1JDIDI0MTAwMDQ0IDogQWdlbmRhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0TmFzdGF2aXRaYXVjdG92YW5vXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0U3Rvcm5vTmVkb2tvbmNlbmVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3RPYmNlcnN0dmVuaUhpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3REaWFnbm9zdGlrYVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBGdWNEZXRhaWwuY3JlYXRlTWVudVNoYXJlKHRoYXQsIHRoYXQuSXhzSHVmLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzQmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5EZXRhaWwuU3RhdHVzQmFyLmNyZWF0ZUl0ZW0oeyBpZDogXCJzdGF0dXNCYXJTVWN0XCIgfSlcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAvL2twaXM6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIGtwaVBvY2V0RG9rbGFkdToge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwia3BpUG9jZXREb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdmFsdWU6IHRoYXQuRGV0YWlsRHRvLnBvY2V0X2Rva2xhZHUgPz8gMCxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB1bml0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHByaW1hcnlUZXh0OiBcIlBvxI1ldCBkb2tsYWTFr1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHNlY29uZGFyeVRleHQ6IFwiZG9rbGFkxa9cIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBmb3JtYXR0ZXI6IFwiTlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGFjdGlvbk9uVGl0bGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgaXRlbVRlbXBsYXRlOiBHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpVmFsdWVUd29Sb3dzVGV4dFRlbXBsYXRlKCkuaXRlbVRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGFjdGlvbjogXCJhY3RUYWJEb2tsYWR5XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgc2hvd1RleHRJY29uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB2aXNpYmxlOiB0aGF0LkRldGFpbER0by5KZVphdWN0b3Zhbm8gPz8gZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgaXNDdXJyZW5jeTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gICAga3BpUG9jZXRTb3VwaXNlazoge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIG5hbWU6IFwia3BpUG9jZXRTb3VwaXNla1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHZhbHVlOiB0aGF0LkRldGFpbER0by5wb2NldF9zb3VwaXNlayA/PyAwLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHVuaXQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgcHJpbWFyeVRleHQ6IFwiUG/EjWV0IHNvdXBpc2VrIHBvaHlixa9cIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBzZWNvbmRhcnlUZXh0OiBcInNvdXBpc2VrXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgbWVhbmluZzogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgZm9ybWF0dGVyOiBcIk5cIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBhY3Rpb25PblRpdGxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGl0ZW1UZW1wbGF0ZTogR29yZGljLlByZWZhYnMuUGFuZWxzLmtwaVZhbHVlVHdvUm93c1RleHRUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBhY3Rpb246IFwiYWN0VGFiU291cGlza3lcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBzaG93VGV4dEljb246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHZpc2libGU6IHRoYXQuRGV0YWlsRHRvLnBvY2V0X3NvdXBpc2VrICE9IG51bGwgJiYgdGhhdC5EZXRhaWxEdG8ucG9jZXRfc291cGlzZWsgPiAwLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGlzQ3VycmVuY3k6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgfSxcclxuICAgICAgICAgICAgICAgIC8vICAgIGtwaVBvY2V0UG9oeWJ1OiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgbmFtZTogXCJrcGlQb2NldFBvaHlidVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHZhbHVlOiB0aGF0LkRldGFpbER0by5wb2NldF9wb2h5YnUgPz8gMCxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB1bml0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHByaW1hcnlUZXh0OiBcIlBvxI1ldCBwb2h5YsWvXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgc2Vjb25kYXJ5VGV4dDogXCJwb2h5YsWvXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgbWVhbmluZzogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgZm9ybWF0dGVyOiBcIk5cIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBhY3Rpb25PblRpdGxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGl0ZW1UZW1wbGF0ZTogR29yZGljLlByZWZhYnMuUGFuZWxzLmtwaVZhbHVlVHdvUm93c1RleHRUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBhY3Rpb246IFwiYWN0VGFiUG9oeWJ5XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgc2hvd1RleHRJY29uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICB2aXNpYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGlzQ3VycmVuY3k6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgfVxyXG4gICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgdGFiczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYkRva2xhZHk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnl0dm/FmWVuw6kgZG9rbGFkeSBvIHphw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRMYXp5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MjQxMDA0NTJcIiwgLy9SQyAyNDEwMDQ1MiA6IERva2xhZHkgbyB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiZ3JwRG9rbGFkeVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6ICh0aGF0LkRldGFpbER0by5wb2NldF9kb2tsYWR1ID8/IDApID4gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbXCJhY3RUaXNrRG9rbGFkdSpcIiwgXCJhY3RUaXNrVnNlY2hEb2tsYWR1KlwiLCBcImFjdERva2xhZE9aYXVjdG92YW5pKlwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhZGdlOiB7IHBhcmFtczogdGhpcy5CYWRnZURva2xhZHkgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gcG9oeWLFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZERva2xhZHkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaWTDoW7DrSBncmlkxa8gcG9oeWLFryBkbyB0YWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBuZcWZZcWhaXQgbsSbamFrw70gamVkbm9kdcWhxaHDrSBwb2hsZWQ/IGNvIGplIHTFmWViYSBuYSBkZXRhaWx1IHBvaHlidSB1IHBvaHlixa8gw7rEjXRvdmFuw71jaCBzdGVqbsO9bSBkb2tsYWRlbT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vJC5uZXdEaXYoKS5hcHBlbmRUbyh0YWIpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBuZXcgR29yZGljLkZvcm1zLkZvcm0oXCJMMU0xUzFcIikuYWRkU2VjdGlvbihcIkRva2xhZHkgbyB6YcO6xI10b3bDoW7DrVwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkRG9rbGFkeSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdEb2tsYWREdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkRG9rbGFkeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBncmlkIGRvZMSbbGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLCAgICAgLy8gZml0IChkZWZhdWx0bmUgYnkgbWVsbyBieXQgdG90byksIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsUG9oeWJ1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcInZzXCIsIFwiY1wiLCBcInR5cF9hZ1wiLCBcImFjXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBGdWNHcmlkLlphcGlzLmNyZWF0ZUdyaWRGb3JtYXREb2tsYWR5KGZhbHNlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEFjdGl2YXRlOiBmdW5jdGlvbiAoZXYsIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIHrDoXBpc8WvIGFrdHXDoWxuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmNlbGxJbmZvKSB0aGF0LmxvYWRaYXBpc3lEb2tsYWR1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6ZXJzT25UYWI6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQubmV3RGl2KCkuYXBwZW5kVG8odGFiKS5ndGFiKHsgdGl0bGU6IFwiWsOhcGlzeSBkb2tsYWR1XCIsIG9wZW5lZDogdHJ1ZSwgbG9ja2VkOiBmYWxzZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0YWIpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBuZXcgR29yZGljLkZvcm1zLkZvcm0oXCJMMU0xUzFcIikuYWRkU2VjdGlvbihcIlrDoXBpc3kgZG9rbGFkdVwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkWmFwaXN5RG9rbGFkdSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdaYXBpc0R0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRaYXBpc3lEb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGdyaWQgZG9kxJtsYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsICAgICAvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3REZXRhaWxQb2h5YnUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1widnNcIiwgXCJjXCIsIFwidHlwX2FnXCIsIFwiYWNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IEZ1Y0dyaWQuWmFwaXMuY3JlYXRlR3JpZEZvcm1hdCh0aGF0LCBmYWxzZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6ZXJzT25UYWI6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYlBvaHlieToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDDusSNdG92YW7DqSBwb2h5YnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdExhenk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczoyNDEwMDE4NVwiLCAvL1JDIDI0MTAwMTg1IDogw5rEjWV0bsOtIHBvaHlieVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiZ3JwUG9oeWJ5XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lZDogKHRoYXQuRGV0YWlsRHRvLnBvY2V0X3BvaHlidSA/PyAwKSA+IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogW1wiYWN0RGV0YWlsUG9oeWJ1KlwiLCBcImFjdFRpc2taYXBpc3VQb2h5YnUqXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFkZ2U6IHsgcGFyYW1zOiB0aGlzLkJhZGdlUG9oeWJ5IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIHBvaHlixa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRQb2h5YnkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaWTDoW7DrSBncmlkxa8gcG9oeWLFryBkbyB0YWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBuZcWZZcWhaXQgbsSbamFrw70gamVkbm9kdcWhxaHDrSBwb2hsZWQ/IGNvIGplIHTFmWViYSBuYSBkZXRhaWx1IHBvaHlidSB1IHBvaHlixa8gw7rEjXRvdmFuw71jaCBzdGVqbsO9bSBkb2tsYWRlbT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRQb2h5YnkgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9oeWJEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUG9oeWJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGdyaWQgZG9kxJtsYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsICAgICAvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsUG9oeWJ1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcInZzXCIsIFwiY1wiLCBcInR5cF9hZ1wiLCBcImFjXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBGdWNHcmlkLlBvaHliLmNyZWF0ZUdyaWRGb3JtYXQodGhhdCwgR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFNlelBvaC5VY2V0bmlQb2h5YnkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJpeHBfdXByLHJhZGVrX3Vwbyx0eXBfdXBvX3R4dCxzX3Vwb190eHQsc19zdG9fdHh0LGt0Z191cG9fdHh0LHpuYW1fdHh0LGNfdXBvLHBvcGlzX3VwbyxzdWJqZWt0Lm5hemV2LGRhdF91cG8sZGF0X3phdWMsb2JkX2RhbixzdWJyYWRhX2R1eixwcml6X2RkX3R4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6ZXJzT25UYWI6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYlNvdXBpc2t5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIMO6xI10b3ZhbsOpIHBvaHlieVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0TGF6eTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjI0MTAwMTE0XCIsIC8vUkMgMjQxMDAxMTQgOiBTb3VwaXNreSBwb2h5YsWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogeyBpZDogXCJncnBTb3VwaXNreVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6ICh0aGF0LkRldGFpbER0by5wb2NldF9zb3VwaXNlayA/PyAwKSA+IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdGhhdC5EZXRhaWxEdG8ucG9jZXRfc291cGlzZWsgIT0gbnVsbCAmJiB0aGF0LkRldGFpbER0by5wb2NldF9zb3VwaXNlayA+IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbXCJhY3REZXRhaWxTb3VwaXNreSpcIi8qLCBcImFjdFRpc2taYXBpc3VQb2h5YnUqXCIqL10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWRnZTogeyBwYXJhbXM6IHRoaXMuQmFkZ2VTb3VwaXNreSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBwb2h5YsWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkU291cGlza3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZaWTDoW7DrSBncmlkxa8gcG9oeWLFryBkbyB0YWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBuZcWZZcWhaXQgbsSbamFrw70gamVkbm9kdcWhxaHDrSBwb2hsZWQ/IGNvIGplIHTFmWViYSBuYSBkZXRhaWx1IHBvaHlidSB1IHBvaHlixa8gw7rEjXRvdmFuw71jaCBzdGVqbsO9bSBkb2tsYWRlbT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRTb3VwaXNreSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdTb3VwaXNrYUR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRTb3VwaXNreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBncmlkIGRvZMSbbGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLCAgICAgLy8gZml0IChkZWZhdWx0bmUgYnkgbWVsbyBieXQgdG90byksIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbFNvdXBpc2t5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcInZzXCIsIFwiY1wiLCBcInR5cF9hZ1wiLCBcImFjXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBGdWNHcmlkLlNvdXBpc2thLmNyZWF0ZUdyaWRGb3JtYXQodGhhdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcIml4cCxpeHBfZGVuX3R4dCxzX3NvdXBfdHh0LGFjX2FnLGFjLGRhdF9ldmlkLGl4c190eXBfdHh0LHprcl9hZyxjX3NvdXAscG9waXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2F1dG9maXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNpemVyc09uVGFiOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0YWJQb2Ryb2Jub3N0aToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQb2Ryb2Jub3N0aVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlBvZHJvYm5vc3RpXCIsIGdyb3VwOiB7IGlkOiBcImdycFBvZHJvYm5vc3RpXCIgfSwgb3BlbmVkOiB0cnVlLCBsb2NrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb3Bsbml0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRhYikuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybVBvZHJvYm5vc3RpXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlBhcmFtZXRyeVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJLdW11bGFjZSB6YSBQSUQgcMWZw61wYWR1XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY3BhbigpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImt1bXVsX3phX2l4cFwiLCBtb2RlbDogXCJrdW11bF96YV9peHA9cHJpel9hblwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0xZllZGlza292w6Egdnlyb3ZuYW5vc3RcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5jcGFuKCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwicHJpel92eXJfbmtzXCIsIG1vZGVsOiBcInByaXpfdnlyX25rcz1wcml6X2FuXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiQmV6IGtvbnRyb2x5IG5hIHDFmWXEjWVycMOhbsOtXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY3BhbigpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcInByaXpfYmV6X2tvbnRyXCIsIG1vZGVsOiBcInByaXpfYmV6X2tvbnRyPXByaXpfYW5cIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJaYWNob3ZhdCBydcSNbsSbIHBvxZnDrXplbsOpIHrDoXBpc3lcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5jcGFuKCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiemFjaF9ydWNfemFwaXN5XCIsIG1vZGVsOiBcInphY2hfcnVjX3phcGlzeT1wcml6X2FuXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiRS3DusSNZXRuaWN0dsOtXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZ2luY3BhbigpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImVfdWNldG5pY3R2aVwiLCBtb2RlbDogXCJlX3VjZXRuaWN0dmk9cHJpel9hblwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkUtw7rEjWV0bmljdHbDrSAtIE9PWlVcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5zZnVuKCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiaXhzX2Z1bl9vb3p1X3VjdFwiLCBtb2RlbDogXCJpeHNfZnVuX29venVfdWN0PWl4c19mdW5cIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJFLcO6xI1ldG5pY3R2w60gLSBLbmloYSBVQ1RcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC51Y3RzZGVuKCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiaXhwX2Rlbl91Y3RcIiwgbW9kZWw6IFwiaXhwX2Rlbl91Y3Q9aXhwX2RlblwiLCB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJpZGVudGlmaWvDoXRvclwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJpeHNfaHVmXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlByxa9ixJtoXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIktvbnRyb2xhIHBvaHlixa9cIikuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7IGRpc2FibGVkOiB0cnVlLCB2YWx1ZVR5cGU6IFwiZGF0ZXRpbWVcIiwgbmFtZTogXCJkYXRfemFjX2tvbnRfcG9oXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCBcInctNlwiLCB7IGRpc2FibGVkOiB0cnVlLCB2YWx1ZVR5cGU6IFwiZGF0ZXRpbWVcIiwgbmFtZTogXCJkYXRfa29uX2tvbnRfcG9oXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5mdWNjcG9kKCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwicHJpel9vZGxfa29udF9wb2hcIiwgbW9kZWw6IFwicHJpel9vZGxfa29udF9wb2g9cHJpel9vZGxcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQxZnDrXByYXZhIHrDoXBpc8WvXCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgdmFsdWVUeXBlOiBcImRhdGV0aW1lXCIsIG5hbWU6IFwiZGF0X3phY19wcmlwX3phcFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgdmFsdWVUeXBlOiBcImRhdGV0aW1lXCIsIG5hbWU6IFwiZGF0X2tvbl9wcmlwX3phcFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZnVjY3BvZCgpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcInByaXpfb2RsX3ByaXBfemFwXCIsIG1vZGVsOiBcInByaXpfb2RsX3ByaXBfemFwPXByaXpfb2RsXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiUMWZw61wcmF2YSBkb2tsYWTFr1wiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHsgZGlzYWJsZWQ6IHRydWUsIHZhbHVlVHlwZTogXCJkYXRldGltZVwiLCBuYW1lOiBcImRhdF96YWNfcHJpcF9kb2tcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdkYXRlYm94XCIsIFwidy02XCIsIHsgZGlzYWJsZWQ6IHRydWUsIHZhbHVlVHlwZTogXCJkYXRldGltZVwiLCBuYW1lOiBcImRhdF9rb25fcHJpcF9kb2tcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmZ1Y2Nwb2QoKSwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJwcml6X29kbF9wcmlwX2Rva1wiLCBtb2RlbDogXCJwcml6X29kbF9wcmlwX2Rvaz1wcml6X29kbFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlphw7rEjXRvdsOhbsOtXCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgdmFsdWVUeXBlOiBcImRhdGV0aW1lXCIsIG5hbWU6IFwiZGF0X3phY196YXVjdFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgXCJ3LTZcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgdmFsdWVUeXBlOiBcImRhdGV0aW1lXCIsIG5hbWU6IFwiZGF0X2tvbl96YXVjdFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZnVjY3BvZCgpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcInByaXpfb2RsX3phdWN0XCIsIG1vZGVsOiBcInByaXpfb2RsX3phdWN0PXByaXpfb2RsXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIkRhbMWhw60gaW5mb3JtYWNlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbmFzdGF2b3ZhdCB2xb5keSB2w73FoWt1IDQgbmVibyBwb3XFvsOtdGF0IGF1dG9TaXplP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUZXh0IGNoeWJ5XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBFa28uRGV0YWlsLkZpZWxkLmdldENvdW50ZXJPcHRpb25zKEZ1Yy5JbnRlcmZhY2UuR0hpc3RvcmllVWN0b3ZhbmlEdG9UeXBlTGVuZ3Rocy50ZXh0X2NoeWJ5LCBmYWxzZSwgZmFsc2UsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwidGV4dF9jaHlieVwiLCByb3dzOiAvKjQqLzEsIC8qd3JhcDogdHJ1ZSovYXV0b1NpemU6IHRydWUgfSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uYWRkUm93KFwiVGV4dCBjaHlieVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJ0ZXh0X2NoeWJ5XCIsIHJvd3M6IDQgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiRMWvdm9kIHNlcnZpc27DrSB6bcSbbnkgc3RhdnVcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiZHV2b2Rfc2VydmlzXCIgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5hc3RhdmVuw60ga3BpcGFuZWx1XHJcbiAgICAgICAgICAgICQuZXh0ZW5kKGJ1aWxkZXIua3BpUGFuZWxPcHRpb25zLCB7IHNvcnRhYmxlOiB0cnVlIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2JzbHVoYSB1ZMOhbG9zdGkgYnVpbGRlckJ1aWxkXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGJ1aWxkZXIgZGV0YWlsYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkRldGFpbEJ1aWxkZXJCdWlsZChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG5hcG9qZW7DrSBzdGFuZGFyZG7DrSBFS08gaGxhdmnEjWt5XHJcbiAgICAgICAgICAgIC8vIMO6cHJhdmEgdsOtY2UgbcOpbsSbIHbFoWVjaCBzZWtjZVxyXG4gICAgICAgICAgICBjb25zdCBmb3JtU2V0dXAgPSB7fTtcclxuICAgICAgICAgICAgY29uc3QgaGVhZGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybUhlYWRlclwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiw5rEjXRvdmFuw6kgcG9oeWJ5XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZnVjY2t1cCgpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcInVjdF9wb2hcIiwgbW9kZWw6IFwidWN0X3BvaD11Y3RfcG9oXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgw7rEjXRvdsOhbsOtXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZnVjY3R1ZigpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcInR5cF91Y3RfZnVjXCIsIG1vZGVsOiBcInR5cF91Y3RfZnVjPXR5cF91Y3RfZnVjXCIgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJaYWjDoWplbm9cIikuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IGRpc2FibGVkOiB0cnVlLCB2YWx1ZVR5cGU6IFwiZGF0ZXRpbWVcIiwgbmFtZTogXCJkYXRfc3RhcnRcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIlVrb27EjWVub1wiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIHZhbHVlVHlwZTogXCJkYXRldGltZVwiLCBuYW1lOiBcImRhdF9rb25lY1wiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3RhdlwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmZ1Y2NzdWMoKSwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJzdGF2X3VjdG92YW5pXCIsIG1vZGVsOiBcInN0YXZfdWN0b3Zhbmk9c3Rhdl91Y3RvdmFuaVwiIH0pO1xyXG4gICAgICAgICAgICBmb3JtU2V0dXBbR29yZGljLkVrby5IZWFkZXJGb3JtLlNlY3Rpb25zLkluZm9dID0ge1xyXG4gICAgICAgICAgICAgICAgcm93czogW1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckZvcm0hLmZvcm0hLnNlY3Rpb25zIVswXS5yb3dzIVswXSwgLy8gw7rEjXRvdmFuw6kgcG9oeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyRm9ybSEuZm9ybSEuc2VjdGlvbnMhWzBdLnJvd3MhWzFdLCAvLyB0eXBcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSBhcyBGb3Jtcy5Gb3JtU2VjdGlvbjtcclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5TZWN0aW9ucy5EYXRhMV0gPSB7XHJcbiAgICAgICAgICAgICAgICByb3dzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyRm9ybSEuZm9ybSEuc2VjdGlvbnMhWzFdLnJvd3MhWzBdLCAvLyBkYXR1bSB6YWjDoWplbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyRm9ybSEuZm9ybSEuc2VjdGlvbnMhWzFdLnJvd3MhWzFdLCAvLyBkYXR1bSB1a29uxI1lbsOtXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybVNlY3Rpb247XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uU2VjdGlvbnMuRGF0YTJdID0ge1xyXG4gICAgICAgICAgICAgICAgcm93czogW1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkZXIuZ2V0RGVmaW5pdGlvbihHb3JkaWMuRWtvLkhlYWRlckZvcm0uUm93cy5acHJhY292YXRlbClbMF0/Lml0ZW0sIC8vIHpwcmFjb3ZhdGVsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyRm9ybSEuZm9ybSEuc2VjdGlvbnMhWzJdLnJvd3MhWzBdLCAvLyBzdGF2XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybVNlY3Rpb247XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uU2VjdGlvbnMuRGF0YTNdID0ge1xyXG4gICAgICAgICAgICAgICAgcm93czogW1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkZXIuZ2V0RGVmaW5pdGlvbihHb3JkaWMuRWtvLkhlYWRlckZvcm0uUm93cy5Qb3BpcylbMF0/Lml0ZW0sIC8vIHBvcGlzIChwb3puw6Fta2EpXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybVNlY3Rpb247XHJcbiAgICAgICAgICAgIC8vIHZsYXN0bsOtIG5hc3RhdmVuw60gcHJ2a8WvIChwxZlldsOhxb5uxJsgbW9kZWwpLiBwb3pvciwgbmVzbcOtIHNlIG3Em25pdCBuYW1lXHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLklkXSA9IHsgb3B0aW9uczogeyBtb2RlbDogXCJpeHNfaHVmXCIgfSB9IGFzIEZvcm1zLkZvcm1GaWVsZDtcclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5GaWVsZHMuRGF0dW1FdmlkZW5jZV0gPSB7IG9wdGlvbnM6IHsgbW9kZWw6IFwiZGF0X2tvbmVjXCIgfSB9IGFzIEZvcm1zLkZvcm1GaWVsZDtcclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5GaWVsZHMuUG9waXNdID0geyBvcHRpb25zOiB7IG1vZGVsOiBcInBvem5hbWthXCIgfSB9IGFzIEZvcm1zLkZvcm1GaWVsZDtcclxuICAgICAgICAgICAgLy8gamluw70gbGFiZWwgcHJvIHBvcGlzXHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uUm93cy5Qb3Bpc10gPSB7IGxhYmVsOiBcIlBvem7DoW1rYVwiIH0gYXMgRm9ybXMuRm9ybVJvdztcclxuICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgaGxhdmnEjWt5XHJcbiAgICAgICAgICAgIEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5zZXR1cChidWlsZGVyLCBmb3JtU2V0dXApO1xyXG5cclxuICAgICAgICAgICAgLy8gw7pwcmF2YSBtZW51IGEgcG9sb8W+ZWtcclxuICAgICAgICAgICAgRnVjRGV0YWlsLmNoYW5nZUJ1aWxkZXJEZWZpbml0aW9uKGJ1aWxkZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gxaFpcGt5IHBybyBwb3N1biBwbyBzZXpuYW11XHJcbiAgICAgICAgICAgIHRoaXMubGlzdENvbnRyb2xzX3NldHVwKHtcclxuICAgICAgICAgICAgICAgIHJvd1RvRHRvOiBmdW5jdGlvbiAoZ3JpZFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgSXhzSHVmOiBncmlkU3RhdGUuY3VycmVudFJvdy5kYXRhLml4c19odWYsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5hc2xlZHVqaWNpRGV0YWlsOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBuZXh0SXRlbVRlbXBsYXRlOiBcIk7DoXNsZWR1asOtY8OtOiB7aXhzX2h1Zn1cIixcclxuICAgICAgICAgICAgICAgIHByZXZJdGVtVGVtcGxhdGU6IFwiUMWZZWRjaG96w606IHtpeHNfaHVmfVwiLFxyXG4gICAgICAgICAgICAgICAgYmVmb3JlTW92ZTogdGhhdC5jbG9zaW5nXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2JzbHVoYSBha3Rpdm7DrSBvcGVyYWNlXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtKUXVlcnkuRXZlbnR9IGV2IHVkw6Fsb3N0XHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IGN0eD8gcMWvdm9kbsOtIHVkw6Fsb3N0IGEgamVqw60gYXJndW1lbnR5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uRGV0YWlsQnVpbGRlckFjdGl2ZU9wKGV2OiBKUXVlcnkuRXZlbnQsIGN0eD86IGFueSk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVPcGVyYXRpb25BbmRSZWxvYWREYXRhKHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFocsOhbsOtIGEgem9icmF6ZW7DrSBwb2h5YsWvXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbG9hZFBvaHlieSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBkYXRcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MjQxMDA0ODBcIik7IC8vUkMgMjQxMDA0ODAgOiBQcm9iw61ow6EgbmHEjXRlbsOtIHBvaHlixa9cclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliLmxpc3QocnEgPT4geyByZXR1cm4geyBmaWx0ZXJzOiB7IGh1Zl9peHNfaHVmOiB0aGF0LkRldGFpbER0by5peHNfaHVmIH0gfTsgfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcG9obGVkXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhLCB7IGtleTogXCJpeHBfdXByLHJhZGVrX3Vwb1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRQb2h5YnkhLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIG9rbmFcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhesOtIGRldGFpbCB2eWJyYW7DqWhvIHBvaHlidVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGRldGFpbFBvaHlidSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGFrdHXDoWxuw60gdnlicmFuw6EgcG9sb8W+a2FcclxuICAgICAgICAgICAgbGV0IGFrdFJhZGVrID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvPih0aGlzLiRncmlkUG9oeWJ5KTtcclxuICAgICAgICAgICAgaWYgKGFrdFJhZGVrICE9PSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gcMWZw616bmFrIGFrdGl2bsOtIG9wZXJhY2VcclxuICAgICAgICAgICAgICAgIGxldCBuZWVkUmVmcmVzaCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG90ZXbFmWVuw60gZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgbGV0ICRkZXRhaWxXaW5kb3cgPSB0aGlzLm5hdmlnYXRlKFxyXG4gICAgICAgICAgICAgICAgICAgIFtcIkdvcmRpYy5GdWMuV2ViQ2xpZW50LkdEZXRhaWxQb2h5YnVcIiwgeyBncmlkUmVtb3RlQ29udHJvbDogbmV3IEdvcmRpYy5Db21wb25lbnRzLkdyaWRSQyh0aGF0LiRncmlkUG9oeWJ5ISkgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRDogJ0RldGFpbFBvaHlidSMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBJeHBVcHI6IGFrdFJhZGVrLml4cF91cHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJhZGVrVXBvOiBha3RSYWRlay5yYWRla191cG9cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG9ic2x1aGEgYWt0aXZuw60gb3BlcmFjZSBuYSBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAkLmNvbnRlbnQoJGRldGFpbFdpbmRvdykub24oRnVjRGV0YWlsLnRyaWdnZXJDaGFuZ2UsIChyZXRWYWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHrDoXpuYW0gYnlsIHptxJtuxJtuLCBtdXPDrSBzZSBuYcSNw61zdCB6bm92dVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWw/LmRhdGE/Lml4cF91cHIgJiYgcmV0VmFsPy5kYXRhPy5yYWRla191cG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnVkZSBzZSBvYsSNZXJzdHZvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRSZWZyZXNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBvYnNsdWhhIHVrb27EjWVuw60gb2tuYVxyXG4gICAgICAgICAgICAgICAgJGRldGFpbFdpbmRvdy5vbihcImNsb3NlZFwiLCAocmV0VmFsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBkZXRhaWx1IChieWxhLWxpIGFrdGl2bsOtIG9wZXJhY2UgdiBvdGV2xZllbsOpbSBkZXRhaWx1KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZWVkUmVmcmVzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJGRldGFpbFdpbmRvdy5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5haHLDoW7DrSBhIHpvYnJhemVuw60gc291cGlzZWtcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkU291cGlza3koKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjI0MTAwNDc4XCIpOyAvL1JDIDI0MTAwNDc4IDogUHJvYsOtaMOhIG5hxI10ZW7DrSBzb3VwaXNlayBwb2h5YsWvXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5YlNvdXBpc2thLmxpc3QocnEgPT4geyByZXR1cm4geyBmaWx0ZXJzOiB7IGh1Zl9peHNfaHVmOiB0aGF0LkRldGFpbER0by5peHNfaHVmIH0gfTsgfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcG9obGVkXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhLCB7IGtleTogXCJpeHBcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGRhdCBhIHDFmWVrcmVzbGVuw60gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkU291cGlza3khLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIG9rbmFcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhesOtIGRldGFpbCB2eWJyYW7DqSBzb291cGlza3lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkZXRhaWxTb3VwaXNreSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGFrdHXDoWxuw60gdnlicmFuw6EgcG9sb8W+a2FcclxuICAgICAgICAgICAgbGV0IGFrdFJhZGVrID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1NvdXBpc2thRHRvPih0aGlzLiRncmlkU291cGlza3kpO1xyXG4gICAgICAgICAgICBpZiAoYWt0UmFkZWsgIT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBwxZnDrXpuYWsgYWt0aXZuw60gb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgbGV0IG5lZWRSZWZyZXNoID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gb3RldsWZZW7DrSBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICBsZXQgJGRldGFpbFdpbmRvdyA9IHRoaXMubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgW1wiR29yZGljLkZ1Yy5XZWJDbGllbnQuR0RldGFpbFNvdXBpc2t5XCIsIHsgZ3BjOiBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGModGhpcy5ncGMsIGFrdFJhZGVrLml4cF9kZW4hKSwgZ3JpZFJlbW90ZUNvbnRyb2w6IG5ldyBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkModGhhdC4kZ3JpZFNvdXBpc2t5ISkgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRDogJ0RldGFpbFNvdXBpc2t5IycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogYWt0UmFkZWsuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBJeHBEZW46IGFrdFJhZGVrLml4cF9kZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBvYnNsdWhhIGFrdGl2bsOtIG9wZXJhY2UgbmEgZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgJC5jb250ZW50KCRkZXRhaWxXaW5kb3cpLm9uKEZ1Y0RldGFpbC50cmlnZ2VyQ2hhbmdlLCAocmV0VmFsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB6w6F6bmFtIGJ5bCB6bcSbbsSbbiwgbXVzw60gc2UgbmHEjcOtc3Qgem5vdnVcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsPy5kYXRhPy5peHApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnVkZSBzZSBvYsSNZXJzdHZvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRSZWZyZXNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBvYnNsdWhhIHVrb27EjWVuw60gb2tuYVxyXG4gICAgICAgICAgICAgICAgJGRldGFpbFdpbmRvdy5vbihcImNsb3NlZFwiLCAocmV0VmFsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBkZXRhaWx1IChieWxhLWxpIGFrdGl2bsOtIG9wZXJhY2UgdiBvdGV2xZllbsOpbSBkZXRhaWx1KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZWVkUmVmcmVzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJGRldGFpbFdpbmRvdy5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5haHLDoW7DrSBhIHpvYnJhemVuw60gZG9rbGFkxa8gbyB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxvYWREb2tsYWR5KCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuRGV0YWlsRHRvLkplWmF1Y3RvdmFubykge1xyXG4gICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIGRhdFxyXG4gICAgICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MjQxMDA0NzlcIik7IC8vUkMgMjQxMDA0NzkgOiBQcm9iw61ow6EgbmHEjXRlbsOtIGRva2xhZMWvXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuWmFwaXMubGlzdERva2xhZHUocnEgPT4geyByZXR1cm4geyBmaWx0ZXJzOiB7IHpfaGlzdG9yaWU6IDEsIGh1Zl9peHNfaHVmOiB0aGF0LkRldGFpbER0by5peHNfaHVmIH0gfTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9obGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YS8qLCB7IGtleTogXCJpeHBfdXByLHJhZGVrX3Vwb1wiIH0qLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkRG9rbGFkeSEuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIG9rbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmFibGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXBsbsSbbsOtIHNlem5hbXUgesOhcGlzxa8gayBkb2tsYWR1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbG9hZFphcGlzeURva2xhZHUoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0IGRvIGdyaWR1IHrDoXBpc8WvXHJcbiAgICAgICAgICAgIC8vIFRPRE86IG5lanNvdSDFoXBhdG7EmyBEVE8gdmUgdm9sw6Fuw60gbWV0b2Q/XHJcbiAgICAgICAgICAgIGxldCBha3RIbGF2aWNrYUQgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuRnVjLkludGVyZmFjZS5HRG9rbGFkRHRvPih0aGlzLiRncmlkRG9rbGFkeSk7XHJcbiAgICAgICAgICAgIGlmIChha3RIbGF2aWNrYUQgJiYgIShha3RIbGF2aWNrYUQgaW5zdGFuY2VvZiBqUXVlcnkpKSB7XHJcbiAgICAgICAgICAgICAgICAvL2lmIChha3RIbGF2aWNrYUQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5aYXBpcy5saXN0KHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tfcm9rOiBha3RIbGF2aWNrYUQhLnJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19saWM6IGFrdEhsYXZpY2thRCEubGljLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX2ljbzogYWt0SGxhdmlja2FEIS5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tfdWNzOiBha3RIbGF2aWNrYUQhLnVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19tZXNpYzogYWt0SGxhdmlja2FEIS5tZXNpYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19hYzogYWt0SGxhdmlja2FEIS5hY1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvcGxuaXQgc3Byw6F2bsO9IGtsw63EjSBwb2RsZSB0eXB1LCBhbGUgamVzdGxpIGplIHYgcMWZw61wYWTEmyBkb2tsYWR1IHbFr2JlYyBuxJtqYWvDvSB1bmlrw6F0bsOtIHByaW3DoXJuw60ga2zDrcSNXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YS8qLCB7IGtleTogXCJpeHBfdXByLHJhZGVrX3Vwb1wiIH0qLyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkWmFwaXN5RG9rbGFkdSEuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gcMWZw61zdHVwbm9zdGkgYWtjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBwb2RvYm7EmyB1ZMSbbGF0IGRhbMWhw60gYWtjZSBuYSBzZXpuYW1lY2ggKG5hcMWZLiB6b2JyYXplbsOtIGRldGFpbHUgYSBwb2QuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPcHJhdmEgbmVkb2tvbsSNZW7DqSBoaXN0b3JpZVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG9wcmF2YU5lZG9rb25jZW5lKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogemppxaF0xJtuw60gdHlwxa8gcG9oeWLFryB2IMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBwxZnDrXBhZG7DoSDDunByYXZhIGRvdGF6dSBhIHBhayBkb3RhenkgcG9kbGUgemppxaF0xaFuw71jaCB0eXDFr1xyXG4gICAgICAgICAgICAvLyBUT0RPOiB6amnFoXTEm27DqSBwYXJhbWV0cnkgcMWZZWRhdCBkbyBtZXRvZHkgc3Rvcm51ak5lZG9rb25jZW5lIChwxZlpZGF0IHDFmWV2b2QgcG9oeWLFryBhIHphY2hvdsOhbsOtIHBvbG8gYSBydcSNbsOtY2gpXHJcblxyXG4gICAgICAgICAgICAvLyDDunZvZG7DrSBkb3RhelxyXG4gICAgICAgICAgICByZXR1cm4gRnVjRGV0YWlsLnJ1bklzbEFjdGlvbldpdGhQcm9taXNlKFxyXG4gICAgICAgICAgICAgICAgdGhpcyxcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlhbG9ncy5jb25maXJtRGFuZ2Vyb3VzKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiT3ByYXZhIG5lZG9rb27EjWVuw6kgaGlzdG9yaWUgw7rEjXRvdsOhbsOtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJPcHJhdmR1IGNoY2V0ZSBvcHJhdml0IG5lZG9rb27EjWVub3UgaGlzdG9yaWkgw7rEjXRvdsOhbsOtPyBWIG9rYW3FvmlrdSBvcHJhdnkgbmVzbcOtIGLDvXQgdG90byDDusSNdG92w6Fuw60gbmlrZGUgc3B1xaF0xJtuw6khXFxuXFxuXCJcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZShHRGxnLm1iYlllcy5pZClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpqacWhdMSbbsOtIHN0YXZ1IHBvaHlixa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliLmxpc3QocnEgPT4geyByZXR1cm4geyBmaWx0ZXJzOiB7IGh1Zl9peHNfaHVmOiB0aGF0Lkl4c0h1Ziwgc191cG86IDEwIH0gfTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RfcG9oeWJ5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RfcG9sb2F1dG9tYXRpY2tlOiBkYXRhLmZpbmRJbmRleChpdGVtID0+IGl0ZW0udHlwX3VwbyA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVwby5VY2V0bmlQb2xvYXV0b21hdGlja3kpID49IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdF9ydWNuaTogZGF0YS5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLnR5cF91cG8gPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVcG8uVWNldG5pUnVjbmkpID49IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdF9wb2h5Ynk6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdF9wb2xvYXV0b21hdGlja2U6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdF9ydWNuaTogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhcmFtZXRyeSBzdG9ybmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnl0dm/FmWVuw60gZm9ybXVsw6HFmWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG9sYWRpdCBwYXJhbWV0cnkgcHJvIHDFmWV2b2QgcG9oeWLFryB2cy4gbW/Fvm5vc3Qgc3Rvcm5hIC0gcG9rdWQgYnkgYnlseSBvYmEsIG11c8OtIHNlIHpkZSDFmWXFoWl0IHZ6aGxlZCBmb3JtdWzDocWZZSwgamVzdGxpIG1hasOtIGLDvXQgdm9sYnkgcHJvIHDFmWV2b2QgbmVibyBuZSAocmVzcC4gYnkgc2UgYW5pIG5lbXVzZWwgZMSbbGF0IHNla2V0IHBvaHlixa8gdiBwxZllZGNob3rDrW0gdGhlbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm1EZWYgPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcIndpelBhcmFtc1wiLyosIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxLCBMLTMtNy0yLCBNLTMtNy0yLCBTLTEyLTEyLTBcIiovIH0pLmFkZFNlY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURlZi5hZGRSb3coXCJqcmVzOjI0MTAwMjk0XCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IG5hbWU6IFwiZHV2b2RcIiwgdmFsaWRhdG9yczogW25ldyBHb3JkaWMuVmFsaWRhdG9ycy5MZW5ndGgoeyBtYXg6IDI1NCB9KSwgbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldIH0pOyAvL1JDIDI0MTAwMjk0IDogRMWvdm9kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5PYmouZXhpc3RfcG9oeWJ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtRGVmLmFkZFNlY3Rpb24oXCLDmsSNdG92YW7DqSBwb2h5YnlcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EZWYuYWRkUm93KFwiw5rEjXRvdmFuw6kgcG9oeWJ5XCIpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByZXZlc3RfcG9oeWJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFwicMWZZXbDqXN0IHplIHN0YXZ1ICd2IMO6xI10b3bDoW7DrScgZG8gJ25lemHDusSNdG92w6FubydcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdWYWx1ZTogYm9vbGVhbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWUgPSAoY2hhbmdlT2JqLnZhbHVlID09PSB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChldi50YXJnZXQpLmNsb3Nlc3QoXCIuZ2Zvcm1cIikuZmluZEZpZWxkcyhcInNtYXphdF9wb2xvYXV0b21hdGlja2VcIiwgXCJzbWF6YXRfcnVjbmlcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgIW5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5PYmouZXhpc3RfcG9sb2F1dG9tYXRpY2tlKSBmb3JtRGVmLmFkZFJvdyhcIlBvaHlieSB0eXB1ICdwb2xvYXV0b21hdGlja8OpJ1wiKS5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwic21hemF0X3BvbG9hdXRvbWF0aWNrZVwiLCBsYWJlbDogXCJzbWF6YXQgcnXEjW7EmyBwb8WZw616ZW7DqSB6w6FwaXN5XCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuT2JqLmV4aXN0X3J1Y25pKSBmb3JtRGVmLmFkZFJvdyhcIlBvaHlieSB0eXB1ICdydcSNbsOtJ1wiKS5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwic21hemF0X3J1Y25pXCIsIGxhYmVsOiBcInNtYXphdCBydcSNbsSbIHBvxZnDrXplbsOpIHrDoXBpc3lcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB6YWTDoW7DrSBwYXJhbWV0csWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBGdWNEZXRhaWwuc2ltcGxlRm9ybU9rQ2FuY2VsKHRoYXQsIGZvcm1EZWYsIHsgcHJldmVzdF9wb2h5Ynk6IHRydWUsIGV4aXN0X3BvbG9hdXRvbWF0aWNrZTogZmFsc2UsIGV4aXN0X3J1Y25pOiBmYWxzZSB9LCBcIlN0b3JubyBuZWRva29uxI1lbsOpIGhpc3RvcmllIMO6xI10b3bDoW7DrVwiLCA3MDAsIDMwMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKChkaWFsb2dSZXR1cm5WYWx1ZSkgPT4geyByZXR1cm4gZGlhbG9nUmV0dXJuVmFsdWUgPyB0cnVlIDogZmFsc2U7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogbmVwb3XFvsOtdCBHSGlzdG9yaWVVY3RvdmFuaVN0b3Jub05lZG9rb25jZW5lT3BlcmF0aW9uRHRvP1xyXG4gICAgICAgICAgICAgICAgKGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBkdXZvZDogc3RyaW5nIHwgbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBwcmV2ZXN0X3BvaHlieTogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICAgICBzbWF6YXRfcG9sb2F1dG9tYXRpY2tlOiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgIHNtYXphdF9ydWNuaTogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2b2zDoW7DrSBvcHJhdnlcclxuICAgICAgICAgICAgICAgICAgICAvL2lmIChyZXR1cm5PYmouZHV2b2QgJiYgcmV0dXJuT2JqLmR1dm9kLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuRmluUG9oeWJIaXN0b3JpZVVjdG92YW5pLm9wcmF2TmVkb2tvbmNlbmUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHJhdml0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXZvZDogZGF0YS5kdXZvZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmVzdF9wb2h5Ynk6IGRhdGEucHJldmVzdF9wb2h5YnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNtYXphdF9wb2xvYXV0b21hdGlja2U6IGRhdGEuc21hemF0X3BvbG9hdXRvbWF0aWNrZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc21hemF0X3J1Y25pOiBkYXRhLnNtYXphdF9ydWNuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93czogW3RoYXQuRGV0YWlsRHRvXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHsgcmV0dXJuIHRoYXQuc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YSgpIH0sXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vTmVkb2tvbmNlbmUhXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTdG9ybm8gbmVkb2tvbsSNZW7DqSBoaXN0b3JpZVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHN0b3JubygpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IHpqacWhdMSbbsOtIHR5cMWvIHBvaHlixa8gdiDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgLy8gVE9ETzogcMWZw61wYWRuw6Egw7pwcmF2YSBkb3RhenUgYSBwYWsgZG90YXp5IHBvZGxlIHpqacWhdMWhbsO9Y2ggdHlwxa9cclxuICAgICAgICAgICAgLy8gVE9ETzogemppxaF0xJtuw6kgcGFyYW1ldHJ5IHDFmWVkYXQgZG8gbWV0b2R5IHN0b3JudWpOZWRva29uY2VuZSAocMWZaWRhdCBwxZlldm9kIHBvaHlixa8gYSB6YWNob3bDoW7DrSBwb2xvIGEgcnXEjW7DrWNoKVxyXG5cclxuICAgICAgICAgICAgLy8gw7p2b2Ruw60gZG90YXpcclxuICAgICAgICAgICAgcmV0dXJuIEZ1Y0RldGFpbC5ydW5Jc2xBY3Rpb25XaXRoUHJvbWlzZShcclxuICAgICAgICAgICAgICAgIHRoaXMsXHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpYWxvZ3MuY29uZmlybURhbmdlcm91cyhcclxuICAgICAgICAgICAgICAgICAgICBcImpyZXM6MjQxMDAyMzFcIiwgLy9SQyAyNDEwMDIzMSA6IFN0b3JubyBuZWRva29uxI1lbsOpIGhpc3RvcmllIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIFwianJlczoyNDEwMDIzMFwiIC8vUkMgMjQxMDAyMzAgOiBPcHJhdmR1IGNoY2V0ZSBzdG9ybm92YXQgbmVkb2tvbsSNZW5vdSBoaXN0b3JpaSDDusSNdG92w6Fuw60/IFYgb2thbcW+aWt1IHN0b3JuYSBuZXNtw60gYsO9dCB0b3RvIMO6xI10b3bDoW7DrSBuaWtkZSBzcHXFoXTEm27DqSE7O1xyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKEdEbGcubWJiWWVzLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gemppxaF0xJtuw60gc3RhdnUgcG9oeWLFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuRmluUG9oeWIubGlzdChycSA9PiB7IHJldHVybiB7IGZpbHRlcnM6IHsgaHVmX2l4c19odWY6IHRoYXQuSXhzSHVmLCBzX3VwbzogMTAgfSB9OyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdF9wb2h5Ynk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdF9wb2xvYXV0b21hdGlja2U6IGRhdGEuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS50eXBfdXBvID09PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVXBvLlVjZXRuaVBvbG9hdXRvbWF0aWNreSkgPj0gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0X3J1Y25pOiBkYXRhLmZpbmRJbmRleChpdGVtID0+IGl0ZW0udHlwX3VwbyA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVwby5VY2V0bmlSdWNuaSkgPj0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0X3BvaHlieTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0X3BvbG9hdXRvbWF0aWNrZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0X3J1Y25pOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXR1cm5PYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGFyYW1ldHJ5IHN0b3JuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2eXR2b8WZZW7DrSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb2xhZGl0IHBhcmFtZXRyeSBwcm8gcMWZZXZvZCBwb2h5YsWvIHZzLiBtb8W+bm9zdCBzdG9ybmEgLSBwb2t1ZCBieSBieWx5IG9iYSwgbXVzw60gc2UgemRlIMWZZcWhaXQgdnpobGVkIGZvcm11bMOhxZllLCBqZXN0bGkgbWFqw60gYsO9dCB2b2xieSBwcm8gcMWZZXZvZCBuZWJvIG5lIChyZXNwLiBieSBzZSBhbmkgbmVtdXNlbCBkxJtsYXQgc2VrZXQgcG9oeWLFryB2IHDFmWVkY2hvesOtbSB0aGVuKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybURlZiA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwid2l6UGFyYW1zXCIvKiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMU0xUzEsIEwtMy03LTIsIE0tMy03LTIsIFMtMTItMTItMFwiKi8gfSkuYWRkU2VjdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtRGVmLmFkZFJvdyhcImpyZXM6MjQxMDAyOTRcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgbmFtZTogXCJkdXZvZFwiLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogMjU0IH0pLCBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSk7IC8vUkMgMjQxMDAyOTQgOiBExa92b2RcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVybk9iai5leGlzdF9wb2h5YnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EZWYuYWRkU2VjdGlvbihcIsOaxI10b3ZhbsOpIHBvaHlieVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURlZi5hZGRSb3coXCLDmsSNdG92YW7DqSBwb2h5YnlcIikuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHJldmVzdF9wb2h5YnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogXCJwxZlldsOpc3QgemUgc3RhdnUgJ3Ygw7rEjXRvdsOhbsOtJyBkbyAnbmV6YcO6xI10b3bDoW5vJ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1ZhbHVlOiBib29sZWFuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IChjaGFuZ2VPYmoudmFsdWUgPT09IHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGV2LnRhcmdldCkuY2xvc2VzdChcIi5nZm9ybVwiKS5maW5kRmllbGRzKFwic21hemF0X3BvbG9hdXRvbWF0aWNrZVwiLCBcInNtYXphdF9ydWNuaVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCAhbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVybk9iai5leGlzdF9wb2xvYXV0b21hdGlja2UpIGZvcm1EZWYuYWRkUm93KFwiUG9oeWJ5IHR5cHUgJ3BvbG9hdXRvbWF0aWNrw6knXCIpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJzbWF6YXRfcG9sb2F1dG9tYXRpY2tlXCIsIGxhYmVsOiBcInNtYXphdCBydcSNbsSbIHBvxZnDrXplbsOpIHrDoXBpc3lcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5PYmouZXhpc3RfcnVjbmkpIGZvcm1EZWYuYWRkUm93KFwiUG9oeWJ5IHR5cHUgJ3J1xI1uw60nXCIpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJzbWF6YXRfcnVjbmlcIiwgbGFiZWw6IFwic21hemF0IHJ1xI1uxJsgcG/FmcOtemVuw6kgesOhcGlzeVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHphZMOhbsOtIHBhcmFtZXRyxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEZ1Y0RldGFpbC5zaW1wbGVGb3JtT2tDYW5jZWwodGhhdCwgZm9ybURlZiwgeyBwcmV2ZXN0X3BvaHlieTogdHJ1ZSwgZXhpc3RfcG9sb2F1dG9tYXRpY2tlOiBmYWxzZSwgZXhpc3RfcnVjbmk6IGZhbHNlIH0sIFwiU3Rvcm5vIG5lZG9rb27EjWVuw6kgaGlzdG9yaWUgw7rEjXRvdsOhbsOtXCIsIDcwMCwgMzAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoKGRpYWxvZ1JldHVyblZhbHVlKSA9PiB7IHJldHVybiBkaWFsb2dSZXR1cm5WYWx1ZSA/IHRydWUgOiBmYWxzZTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBuZXBvdcW+w610IEdIaXN0b3JpZVVjdG92YW5pU3Rvcm5vTmVkb2tvbmNlbmVPcGVyYXRpb25EdG8/XHJcbiAgICAgICAgICAgICAgICAoZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGR1dm9kOiBzdHJpbmcgfCBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZlc3RfcG9oeWJ5OiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgIHNtYXphdF9wb2xvYXV0b21hdGlja2U6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgc21hemF0X3J1Y25pOiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHZvbMOhbsOtIHN0b3JuYVxyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKHJldHVybk9iai5kdXZvZCAmJiByZXR1cm5PYmouZHV2b2QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5Ykhpc3RvcmllVWN0b3Zhbmkuc3Rvcm51ak5lZG9rb25jZW5lKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Rvcm5vdmF0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXZvZDogZGF0YS5kdXZvZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmVzdF9wb2h5Ynk6IGRhdGEucHJldmVzdF9wb2h5YnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNtYXphdF9wb2xvYXV0b21hdGlja2U6IGRhdGEuc21hemF0X3BvbG9hdXRvbWF0aWNrZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc21hemF0X3J1Y25pOiBkYXRhLnNtYXphdF9ydWNuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93czogW3RoYXQuRGV0YWlsRHRvXVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHsgcmV0dXJuIHRoYXQuc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YSgpIH0sXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0U3Rvcm5vTmVkb2tvbmNlbmUhXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBuYXN0YXZlbsOtIHN0YXZ1IHphw7rEjXRvdsOhbm9cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBuYXN0YXZpdFphdWN0b3Zhbm8oKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBuZWRhdCB0ZW50byBkaWFsb2cgaSBkbyBzZXJ2aXNuw60gem3Em255IHN0YXbFryBwb2h5YnU/XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gRnVjRGV0YWlsLnJ1bklzbEFjdGlvbldpdGhSZWFzb25BbmRDb25maXJtRGFuZ2Vyb3VzKFxyXG4gICAgICAgICAgICAgICAgdGhpcyxcclxuICAgICAgICAgICAgICAgIFwianJlczoyNDEwMDIzM1wiLCAvL1JDIDI0MTAwMjMzIDogT3ByYXZkdSBjaGNldGUgbmFzdGF2aXQgc3RhdiB6YcO6xI10b3bDoW5vIHUgbmVkb2tvbsSNZW7DqSBoaXN0b3JpaSDDusSNdG92w6Fuw60/IFYgb2thbcW+aWt1IG5hc3RhdmVuw60gbmVzbcOtIGLDvXQgdG90byDDusSNdG92w6Fuw60gbmlrZGUgc3B1xaF0xJtuw6khOztcclxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIChkYXRhOiB7IGR1dm9kOiBzdHJpbmcgfSkgPT4geyByZXR1cm4gdGhhdC5pc2wuRmluUG9oeWJIaXN0b3JpZVVjdG92YW5pLm5hc3RhdlphdWN0b3Zhbm8oeyB6YXVjdG92YW5vOiB0cnVlLCBkdXZvZDogZGF0YS5kdXZvZCwgcm93czogW3RoYXQuRGV0YWlsRHRvXSB9KTsgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHsgcmV0dXJuIHRoYXQuc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YSgpIH0sXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0TmFzdGF2aXRaYXVjdG92YW5vIVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVWxvxb5lbsOtIC8gem9icmF6ZW7DrSBkb2tsYWR1IG8gemHDusSNdG92w6Fuw61cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkb2tsYWRPWmF1Y3RvdmFuaSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLkRldGFpbER0by5KZVphdWN0b3Zhbm8pIHtcclxuICAgICAgICAgICAgICAgIGxldCBha3REb2tsYWQgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuRnVjLkludGVyZmFjZS5HRG9rbGFkRHRvPih0aGlzLiRncmlkRG9rbGFkeSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWt0RG9rbGFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdWxvxb5lbsOtL290ZXbFmWVuw60gc291Ym9ydVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBGdWNEZXRhaWwuZG9rbGFkT1phdWN0b3ZhbmkodGhpcywgbnVsbC8qYWt0RG9rbGFkPy5peGJfZHp1Ki8sIGFrdERva2xhZD8ucm9rLCBha3REb2tsYWQ/LmxpYywgYWt0RG9rbGFkPy5pY28sIGFrdERva2xhZD8udWNzLCBha3REb2tsYWQ/Lm1lc2ljLCBha3REb2tsYWQ/LmFjKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERpYWdub3N0aWthICh1bG/FvmVuw60gZGF0KVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGRpYWdub3N0aWthKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gdWxvxb5lbsOtIHppcHUgcyBkYXR5IGFrdHXDoWxuw61obyBoaXN0b3JpZSDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgcmV0dXJuIEZ1Y0RldGFpbC5kaWFnbm9zdGlrYShXZmwuSW50ZXJmYWNlLkdJZGVudGlmaWthdG9yQ29Kc2VtWmFjLk5ldXJjZW5vLCB0aGlzLkl4c0h1ZiwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIHBydmvFryB2ZSBmb3JtdWzDocWZaVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gc3RhdHVzIGJhclxyXG4gICAgICAgICAgICAvLyB6YcO6xI10b3bDoW4gT0ssIHDFmWVydcWhZW4gdmFyb3bDoW7DrSwgamluYWsgaW5mb1xyXG4gICAgICAgICAgICBFa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXNlcyFbXCJzdGF0dXNCYXJTVWN0XCJdISxcclxuICAgICAgICAgICAgICAgIHRoaXMuRGV0YWlsRHRvLnN0YXZfdWN0b3ZhbmlfdHh0Py50b1VwcGVyQ2FzZSgpID8/IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAodGhpcy5EZXRhaWxEdG8uc3Rhdl91Y3RvdmFuaSEgPj0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlN0YXZVY3RvdmFuaVBvaHlidS5aYXVjdG92YW5vICYmIHRoaXMuRGV0YWlsRHRvLnN0YXZfdWN0b3ZhbmkhIDw9IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TdGF2VWN0b3ZhbmlQb2h5YnUuWmF1Y3RvdmFub1NQcmVjZXJwYW5pbVxyXG4gICAgICAgICAgICAgICAgICAgID8gRWtvLlV0aWxzLlJlY29yZEZvcm1hdFR5cGUuUmVhbGl6b3Zhbm9cclxuICAgICAgICAgICAgICAgICAgICA6ICh0aGlzLkRldGFpbER0by5zdGF2X3VjdG92YW5pISA+PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU3RhdlVjdG92YW5pUG9oeWJ1LlphaGFqZW5vICYmIHRoaXMuRGV0YWlsRHRvLnN0YXZfdWN0b3ZhbmkhIDw9IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TdGF2VWN0b3ZhbmlQb2h5YnUuVWtvbmNlbm9aYXVjdG92YW5pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gRWtvLlV0aWxzLlJlY29yZEZvcm1hdFR5cGUuU3Rvcm5vdmFub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICh0aGlzLkRldGFpbER0by5zdGF2X3VjdG92YW5pISA+PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU3RhdlVjdG92YW5pUG9oeWJ1LlByZXJ1c2Vub1V6aXZhdGVsZW0gJiYgdGhpcy5EZXRhaWxEdG8uc3Rhdl91Y3RvdmFuaSEgPD0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlN0YXZVY3RvdmFuaVBvaHlidS5QcmVydXNlbm9LdnVsaUNoeWJlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IEVrby5VdGlscy5SZWNvcmRGb3JtYXRUeXBlLlZ5cmF6ZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSkpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrY2VcclxuICAgICAgICAgICAgY29uc3QgcGVybUVtcHR5R3JpZCA9IEZ1Y0dyaWQuZ2V0RW1wdHlHcmlkUGVybWlzc2lvbigpO1xyXG4gICAgICAgICAgICBjb25zdCBhY3RzID0gdGhpcy5hY3Rpb25zO1xyXG4gICAgICAgICAgICBjb25zdCBwZXJtcyA9IHRoaXMuRGV0YWlsRHRvLlBlcm1pc3Npb25zO1xyXG4gICAgICAgICAgICBhY3RzLmFjdE9wcmF2aXROZWRva29uY2VuZSEudXBkYXRlUGVybWlzc2lvbigocGVybXMgPyBwZXJtcy5MemVPcHJhdml0TmVkb2tvbmNlbmUgOiB1bmRlZmluZWQpKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RTdG9ybm9OZWRva29uY2VuZSEudXBkYXRlUGVybWlzc2lvbigocGVybXMgPyBwZXJtcy5MemVTdG9ybm92YXROZWRva29uY2VuZSA6IHVuZGVmaW5lZCkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdE5hc3Rhdml0WmF1Y3RvdmFubyEudXBkYXRlUGVybWlzc2lvbigocGVybXMgPyBwZXJtcy5MemVOYXN0YXZpdFphdWN0b3Zhbm8gOiB1bmRlZmluZWQpKTtcclxuICAgICAgICAgICAgYWN0cy5hY3REaWFnbm9zdGlrYSEudXBkYXRlUGVybWlzc2lvbihwZXJtcyA/IHBlcm1zLkx6ZURpYWdub3N0aWthIDogdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RPYmNlcnN0dmVuaUhpc3QhLnVwZGF0ZVBlcm1pc3Npb24oeyB2YWx1ZTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgLy8gdGFiIGRva2xhZHlcclxuICAgICAgICAgICAgbGV0IGFrdFJhZGVrRG9rID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR0Rva2xhZER0bz4odGhpcy4kZ3JpZERva2xhZHkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFRpc2tEb2tsYWR1IS51cGRhdGVQZXJtaXNzaW9uKGFrdFJhZGVrRG9rICE9PSBudWxsID8gKHRoaXMuRGV0YWlsRHRvLkplWmF1Y3RvdmFubyA9PT0gdHJ1ZSA/IHsgdmFsdWU6IHRydWUgfSA6IHsgdmFsdWU6IGZhbHNlLCBtZXNzYWdlOiBcIkRva2xhZCBuZW7DrSB6YcO6xI10b3bDoW5cIiB9KSA6IHBlcm1FbXB0eUdyaWQpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFRpc2tWc2VjaERva2xhZHUhLnVwZGF0ZVBlcm1pc3Npb24oYWt0UmFkZWtEb2sgIT09IG51bGwgPyAodGhpcy5EZXRhaWxEdG8uSmVaYXVjdG92YW5vID09PSB0cnVlID8geyB2YWx1ZTogdHJ1ZSB9IDogeyB2YWx1ZTogZmFsc2UsIG1lc3NhZ2U6IFwiRG9rbGFkIG5lbsOtIHphw7rEjXRvdsOhblwiIH0pIDogcGVybUVtcHR5R3JpZCk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0RG9rbGFkT1phdWN0b3ZhbmkhLnVwZGF0ZVBlcm1pc3Npb24oYWt0UmFkZWtEb2sgIT09IG51bGwgPyAodGhpcy5EZXRhaWxEdG8uSmVaYXVjdG92YW5vID09PSB0cnVlID8gLyooYWt0UmFkZWtEb2suaXhiX2R6dSAhPSBudWxsICYmIGFrdFJhZGVrRG9rLml4Yl9kenUgPiBcIiBcIiA/ICgqL3sgdmFsdWU6IHRydWUgfS8qKSA6IHsgdmFsdWU6IGZhbHNlLCBtZXNzYWdlOiBcIlZ5Z2VuZXJvdmFuw70gZG9rbGFkIG8gemHDusSNdG92w6Fuw60gbmVleGlzdHVqZVwiIH0pKi8gOiB7IHZhbHVlOiBmYWxzZSwgbWVzc2FnZTogXCJEb2tsYWQgbmVuw60gemHDusSNdG92w6FuXCIgfSkgOiBwZXJtRW1wdHlHcmlkKTtcclxuICAgICAgICAgICAgLy8gdGFiIHNvdXBpc2VrXHJcbiAgICAgICAgICAgIGxldCBha3RSYWRla1NvdSA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdTb3VwaXNrYUR0bz4odGhpcy4kZ3JpZFNvdXBpc2t5KTtcclxuICAgICAgICAgICAgYWN0cy5hY3REZXRhaWxTb3VwaXNreSEudXBkYXRlUGVybWlzc2lvbihha3RSYWRla1NvdSAhPT0gbnVsbCA/IHsgdmFsdWU6IHRydWUgfSA6IHBlcm1FbXB0eUdyaWQpO1xyXG4gICAgICAgICAgICAvLyB0YWIgcG9oeWLFr1xyXG4gICAgICAgICAgICBsZXQgYWt0UmFkZWtQb2ggPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9oeWJEdG8+KHRoaXMuJGdyaWRQb2h5YnkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdERldGFpbFBvaHlidSEudXBkYXRlUGVybWlzc2lvbihha3RSYWRla1BvaCAhPT0gbnVsbCA/IHsgdmFsdWU6IHRydWUgfSA6IHBlcm1FbXB0eUdyaWQpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFRpc2taYXBpc3VQb2h5YnUhLnVwZGF0ZVBlcm1pc3Npb24oYWt0UmFkZWtQb2ggIT09IG51bGwgPyAodGhpcy5EZXRhaWxEdG8uSmVaYXVjdG92YW5vID09PSB0cnVlID8geyB2YWx1ZTogdHJ1ZSB9IDogeyB2YWx1ZTogZmFsc2UsIG1lc3NhZ2U6IFwiRG9rbGFkIG5lbsOtIHphw7rEjXRvdsOhblwiIH0pIDogcGVybUVtcHR5R3JpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIHDFmcOtem5ha3UgYWt0aXZuw60gb3BlcmFjZSBhIGFrdHVhbGl6YWNlIGRldGFpbHVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gd2l0aG91dFJlbG9hZCAoZGVmYXVsdCA9IGZhbHNlKSB0cnVlID0gbmVha3R1YWxpem92YXQgZm9ybXVsw6HFmVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEod2l0aG91dFJlbG9hZDogYm9vbGVhbiA9IGZhbHNlKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICAvLyB2eXZvbMOhbsOtIHRyaWdnZXIgbyBha3Rpdm7DrSBvcGVyYWNpXHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcihGdWNEZXRhaWwudHJpZ2dlckNoYW5nZSwgW3sgZGF0YTogdGhpcy5EZXRhaWxEdG8gfV0pO1xyXG5cclxuICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgZGV0YWlsdVxyXG4gICAgICAgICAgICBpZiAoIXdpdGhvdXRSZWxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKFwicmVtZW1iZXJpbml0aWFsb3BlblwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpub3Z1IG5hxI10ZSBjZWzDvSBmb3JtdWzDocWZXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVsb2FkRGF0YSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKFwicmVtZW1iZXJpbml0aWFsb3BlblwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dWFsaXphY2UgZGF0IHYgZGV0YWlsdSBwb2RsZSBtb2RlbHUgYSBuYXN0YXZlbsOtIHN0YXZ1IHBydmvFr1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgYWt0dWFsaXphY2VEZXRhaWx1KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gbmFwbG7Em27DrSBwb2zDrcSNZWtcclxuICAgICAgICAgICAgLy8gVE9ETzogbmVjaGF0IERldGFpbER0byBuZWJvIHRvIHDFmWVqbWVub3ZhdCB6cMOhdGt5IG5hIG1vZGVsPyBuxJtqYWsgdG8gZG/FmWXFoWl0LCB2IGvDs2R1IHRvdGnFviBwb3XFvsOtdsOhbSBvYm9qZVxyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKVxyXG4gICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5EZXRhaWxEdG8sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCB0aGlzLnZhbGlkYXRvcnMpO1xyXG5cclxuICAgICAgICAgICAgLy8gdnlicsOhbsOtIG7Em2pha8OpIHBvbG/Fvmt5IHYgZ3JpZHUgcG9sb8W+ZWtcclxuICAgICAgICAgICAgLy90aGlzLnZ5YnJhbmlQb2xvemt5KCk7XHJcbiAgICAgICAgICAgIC8vIG5hcGxuxJtuw60gZ3JpZHUgcG9oeWLFryBqZSBhxb4gcG8gcm96a2xpa251dMOtIHRhYnVcclxuXHJcbiAgICAgICAgICAgIC8vIGJhZGdlXHJcbiAgICAgICAgICAgIC8vIFRPRE86IG5lY2hhdCB0byB6ZGUgbmVibyB0byBwxZllc3Vub3V0IGRvIG1ldG9keSBlbmFibGU/XHJcbiAgICAgICAgICAgIEZ1Y0RldGFpbC51cGRhdGVCYWRnZSh0aGlzLkJhZGdlRG9rbGFkeSwgdGhpcy5EZXRhaWxEdG8/LnBvY2V0X2Rva2xhZHUpO1xyXG4gICAgICAgICAgICBGdWNEZXRhaWwudXBkYXRlQmFkZ2UodGhpcy5CYWRnZVBvaHlieSwgdGhpcy5EZXRhaWxEdG8/LnBvY2V0X3BvaHlidSk7XHJcbiAgICAgICAgICAgIEZ1Y0RldGFpbC51cGRhdGVCYWRnZSh0aGlzLkJhZGdlU291cGlza3ksIHRoaXMuRGV0YWlsRHRvPy5wb2NldF9zb3VwaXNlayk7XHJcblxyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbsOtIHN0YXZ1IHBvbMOtxI1layBhIGFrY8OtXHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBaYWTDoW7DrSBwYXJhbWV0csWvIHRpc2t1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtJR1ByaW50QWN0aW9uUmVwb3J0U3RhcnRpbmd9IHJlcCBwYXJhbWV0cnkgdGlza3VcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFt2c2VdIHRydWUgPSB0aXNrIHbFoWVjaCBkb2tsYWTFryBuYWplZG5vdSwgamluYWsgamVuIGFrdHXDoWxuw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgcmVwb3J0U3RhcnRpbmcocmVwOiBJR1ByaW50QWN0aW9uUmVwb3J0U3RhcnRpbmcsIHZzZT86IGJvb2xlYW4pOiBKUXVlcnlQcm9taXNlPGFueT4gfCB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gcGFyYW1ldHLFryBwb2RsZSB0w6ltYXR1XHJcbiAgICAgICAgICAgIGlmIChyZXAudGVtYSA9PT0gXCJmdWNfcHRtX2VuZ3phdVwiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkb2tsYWQgbyB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgbGV0IGFrdERva2xhZCA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdEb2tsYWREdG8+KHRoaXMuJGdyaWREb2tsYWR5KTtcclxuICAgICAgICAgICAgICAgIGlmIChha3REb2tsYWQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAwID0gYWt0RG9rbGFkLnJvayEudG9TdHJpbmcoMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDEgPSBha3REb2tsYWQubGljITtcclxuICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAyID0gYWt0RG9rbGFkLmljbyE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMyA9IGFrdERva2xhZC51Y3MhO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDQgPSBha3REb2tsYWQubWVzaWMhLnRvU3RyaW5nKDEwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDA1ID0gYWt0RG9rbGFkLmFjITtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5EZXRhaWxEdG8udHlwX3VjdF9mdWMgPT09IDEwIHx8IHRoaXMuRGV0YWlsRHRvLnR5cF91Y3RfZnVjID09PSAyMCkgcmVwLnBhcmFtcy5YMDAwNiA9IFwiMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmVwLnBhcmFtcy5YMDAwNiA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHYgcMWZw61wYWTEmyB0aXNrdSB2xaFlY2ggZG9rbGFkxa8gbmFqZWRub3UgamUgdiBYMDAwNyBsb2dfcG9yX2Npc2xvIGEgdiBjdXN0b21EdG8gSUtDXHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwNyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgfTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodnNlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBybyB0aXNrIHbFoWUgbmFwbG7Em27DrSBwcmFjb3Zuw60gdGFidWxreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxsPEdvcmRpYy5HZW5lcmFsLkdJa2M+KFwiVmxveml0RG9QcmFjU2V6bmFtdVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZ5dcW+aXTDrSBkdG8gcG91emUgcHJvIHDFmWVub3MgSUtDIGRvIENTLCBrZGUgc2UgcG91xb5pamUgbmEgdnl0dm/FmWVuw60gZGV2w6F0w6lobyBwYXJhbWV0cnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBkdWN0X2lrYzogcmV0VmFsIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gZWxlbWVudMOhcm7DrSDDusSNZXRuw60gesOhcGlzeVxyXG4gICAgICAgICAgICAgICAgbGV0IGFrdFBvaHliID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvPih0aGlzLiRncmlkUG9oeWJ5KTtcclxuICAgICAgICAgICAgICAgIGlmIChha3RQb2h5YiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDAgPSBha3RQb2h5Yi5peHBfdXByITtcclxuICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAxID0gYWt0UG9oeWIucmFkZWtfdXBvIS50b1N0cmluZygxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMiA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHt9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVa29uxI1lbsOtIGdlbmVyb3bDoW7DrSBzZXN0YXZ5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBbdnNlXSB0cnVlID0gdGlzayB2xaFlY2ggZG9rbGFkxa8gbmFqZWRub3UsIGppbmFrIGplbiBha3R1w6FsbsOtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHJlcG9ydEdlbmVyYXRlZCh2c2U/OiBib29sZWFuKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBpZiAodnNlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzbWF6w6Fuw60gcHJhY292bsOtIHRhYnVsa3lcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbDx2b2lkPihcIlNtYXphdFByYWNTZXpuYW1cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlc3QsIGplc3RsaSBqZSBtb8W+bsOpIG9rbm8gemF2xZnDrXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5UHJvbWlzZTxJbnRlcmZhY2UuR0hpc3RvcmllVWN0b3ZhbmlEdG8+IHwgSW50ZXJmYWNlLkdIaXN0b3JpZVVjdG92YW5pRHRvfSBwcm9taXNlIHMgZGF0eSAocmVzb2x2ZSA9IGplIG1vxb5uw6kgemF2xZnDrXQsIHJlamVjdCA9IG5lbsOtIG1vxb5uw6kgemF2xZnDrXQpIG5lYm8gcMWZw61tbyBkYXRhIGRldGFpbHVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPEludGVyZmFjZS5HSGlzdG9yaWVVY3RvdmFuaUR0bz4gfCBJbnRlcmZhY2UuR0hpc3RvcmllVWN0b3ZhbmlEdG8ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8ga29udHJvbGEgbmEgem3Em27Em27DqSBwb2xvxb5reVxyXG4gICAgICAgICAgICBsZXQgZm9ybUNoYW5nZWQgPSB0aGlzLmZpbmRGb3JtcygpLmdmb3JtKFwiaGFzQ2hhbmdlZFwiKTtcclxuICAgICAgICAgICAgLy8gVE9ETzogZG9kYXQgc3Byw6F2bm91IHBvZG3DrW5rdSAtIHUgesOhcG/EjXRvdsO9Y2ggbGlzdMWvIGplIGlmICgodGhpcy5FZGl0YWNlIHx8IHRoaXMuSmVQb2RhbikgJiYgZm9ybUNoYW5nZWQpIHtcclxuICAgICAgICAgICAgaWYgKHRydWUgJiYgZm9ybUNoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIGRvdGF6IG5hIHphdsWZZW7DrSBiZXogdWxvxb5lbsOtLCBwcm90b8W+ZSBzZSBuxJtjbyB6bcSbbmlsb1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogcG9rdWQgYnkgYnlsbyBwb3TFmWViYSAoemF0w61tIHNlIG5ldWtsw6Fkw6EpLCB0YWsgZG9wcmFjb3ZhdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuRGV0YWlsRHRvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gcG9rdWQgc2UgbmVlZGl0dWplLCBqZSBtb8W+bsOpIGRldGFpbCB6YXbFmcOtdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuRGV0YWlsRHRvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iXX0=