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
            let GDetailPripadu = class GDetailPripadu extends Gordic.GDetailBuilderContent {
                constructor() {
                    super(...arguments);
                    /**
                     * Grid stavu IISSP
                     * @type {JQuery | null}
                     */
                    this.$gridIISSPStavy = null;
                    /**
                     * Grid položek IISSP
                     * @type {JQuery | null}
                     */
                    this.$gridIISSPPolozky = null;
                    ///**
                    // * Grid pohybů
                    // * @type {JQuery}
                    // */
                    //private $gridPohyby: JQuery;
                    /**
                     * Grid účetních pohybů
                     * @type {JQuery | null}
                     */
                    this.$gridUctPohyby = null;
                    /**
                     * Grid rezervačních pohybů
                     * @type {JQuery | null}
                     */
                    this.$gridRezPohyby = null;
                    /**
                     * Grid plateb
                     * @type {JQuery | null}
                     */
                    this.$gridPlatby = null;
                    /**
                     * Grid účetních zápisů
                     * @type {JQuery | null}
                     */
                    this.$gridUctZapisy = null;
                    /**
                     * Grid rezervačních zápisů
                     * @type {JQuery | null}
                     */
                    this.$gridRezZapisy = null;
                    /**
                     * Grid dokladů o zaúčtování
                     * @type {JQuery | null}
                     */
                    this.$gridDokladyOZauc = null;
                    /**
                     * Grid zápisů dokladu o zaúčtování
                     * @type {JQuery | null}
                     */
                    this.$gridZapisyDokladuOZauc = null;
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
                    this.BadgePohyby = WebClient.FucDetail.createBadge("pocetPohybuBadge");
                    this.BadgeUctPohyby = WebClient.FucDetail.createBadge("pocetUctPohybuBadge");
                    this.BadgeRezPohyby = WebClient.FucDetail.createBadge("pocetRezPohybuBadge");
                    this.BadgePlatby = WebClient.FucDetail.createBadge("pocetPlatebBadge");
                    // definice akcí, tabů, kpi, menu apod.
                    builder.withComponent("detail", {
                        actions: {
                            // TODO: texty do resource
                            actStorno: Gordic.Eko.Action.actionStornovat({
                                run: function () { this.setPending(that.storno()); }
                            }),
                            actZrusitStorno: Gordic.Eko.Action.actionZrusitStorno({
                                run: function () { this.setPending(that.storno()); }
                            }),
                            actUzavreni: Gordic.Eko.Action.actionUzavrit({
                                run: function () { this.setPending(that.uzavreni()); }
                            }),
                            actZrusitUzavreni: Gordic.Eko.Action.actionZrusitUzavreni({
                                run: function () { this.setPending(that.uzavreni()); }
                            }),
                            actPredani: Gordic.Eko.Action.actionPredat({
                                run: function () { this.setPending(that.predani()); }
                            }),
                            actDetailVPrimarniAgende: Gordic.Eko.Action.actionPrimarniAgenda({
                                run: function () { this.setPending(that.detailVPrimarniAgende()); }
                            }),
                            actDiagnostika: Gordic.Eko.Action.actionDiagnostika({
                                run: function () { this.setPending(that.diagnostika()); }
                            }),
                            actObcerstveniPrip: Gordic.Eko.Action.actionObcerstvit({
                                run: function () { this.setPending(that.reloadData()); }
                            }),
                            // akce pro menubar předkontací
                            actPredkontaceUpravit: Gordic.Eko.Action.actionUpravit({
                                run: function () { that.zmenaPredkontaci(); }
                            }),
                            // záložkové akce
                            //actDetailPohybu: Gordic.Eko.Action.actionDetail({ run: function () { this.setPending(that.detailPohybu()); } }),
                            actDetailUctPohybu: Gordic.Eko.Action.actionDetail({
                                run: function () { this.setPending(that.detailPohybu(true)); }
                            }),
                            actDetailRezPohybu: Gordic.Eko.Action.actionDetail({
                                run: function () { this.setPending(that.detailPohybu(false)); }
                            }),
                            actDetailPlatby: Gordic.Eko.Action.actionDetail({
                                run: function () { this.setPending(that.detailPlatby()); }
                            }),
                            actHistorieIissp: Gordic.Eko.Action.actionHistorie({
                                run: function () { this.setPending(that.historieIissp()); }
                            }),
                            // účetní a rezervační zápisy
                            actUctovaniDokladOZauctovani: WebClient.FucActions.actionDokladOZauctovani({
                                run: function () { this.setPending(that.dokladOZauctovani()); }
                            }),
                            // pro KPI
                            //actTabPohyby: { caption: "Pohyby", enabled: true, run: function () { FucDetail.switchToGrpAndTab(that, "grpPohyby", "tabPohyby"); } },
                            //actTabUctPohyby: { caption: "Účetní pohyby", enabled: true, run: function () { FucDetail.switchToGrpAndTab(that, "grpPohyby", "tabUctPohyby"); } },
                            //actTabRezPohyby: { caption: "Rezervační pohyby", enabled: true, run: function () { FucDetail.switchToGrpAndTab(that, "grpPohyby", "tabRezPohyby"); } },
                            //actTabPlatby: { caption: "Platby", enabled: true, run: function () { FucDetail.switchToGrpAndTab(that, "grpPlatby", "tabPlatby"); } }
                        },
                        tabGroups: [
                            Gordic.Prefabs.TabGroups.Agenda(),
                            { id: "grpIissp", caption: "jres:24100325", visible: that.JeIissp }, //RC 24100325 : IISSP
                            { id: "grpPohyby", caption: "jres:24100453", badge: this.BadgePohyby }, //RC 24100453 : Pohyby
                            { id: "grpPlatby", caption: "jres:24100448", badge: this.BadgePlatby }, //RC 24100448 : Platby
                            { id: "grpUctRez", caption: "jres:24100350" }, //RC 24100350 : Účetní a rezervační zápisy
                        ],
                        menuBar: [
                            //["jres:24100044", //RC 24100044 : Agenda
                            "actDetailVPrimarniAgende",
                            "actStorno",
                            "actZrusitStorno",
                            "actUzavreni",
                            "actZrusitUzavreni",
                            "actObcerstveniPrip",
                            "actPredani",
                            "actDiagnostika",
                            WebClient.FucDetail.createMenuShare(that, that.IxpUpr, undefined, undefined, true)
                        ],
                        statusBar: [
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarSUpr" }),
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarSZau" }),
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarSSto" })
                        ],
                        //kpis: {
                        //    //kpiPocetPohybu: {
                        //    //    name: "kpiPocetPohybu",
                        //    //    value: that.DetailDto.pocet_pohybu ?? 0,
                        //    //    unit: "",
                        //    //    primaryText: "Počet pohybů",
                        //    //    secondaryText: "pohybů",
                        //    //    meaning: "info",
                        //    //    formatter: "N",
                        //    //    actionOnTitle: true,
                        //    //    itemTemplate: Gordic.Prefabs.Panels.kpiValueTwoRowsTextTemplate().itemTemplate,
                        //    //    action: "actTabPohyby",
                        //    //    showTextIcon: false,
                        //    //    visible: true,
                        //    //    isCurrency: false,
                        //    //},
                        //    //kpiPocetUctPohybu: {
                        //    //    name: "kpiPocetUctPohybu",
                        //    //    value: that.DetailDto.pocet_uct_pohybu ?? 0,
                        //    //    unit: "",
                        //    //    primaryText: "Počet účetních pohybů",
                        //    //    secondaryText: "pohybů",
                        //    //    meaning: "info",
                        //    //    formatter: "N",
                        //    //    actionOnTitle: true,
                        //    //    itemTemplate: Gordic.Prefabs.Panels.kpiValueTwoRowsTextTemplate().itemTemplate,
                        //    //    action: "actTabUctPohyby",
                        //    //    showTextIcon: false,
                        //    //    visible: (that.DetailDto.pocet_uct_pohybu ?? 0) > 0,
                        //    //    isCurrency: false,
                        //    //},
                        //    //kpiPocetRezPohybu: {
                        //    //    name: "kpiPocetRezPohybu",
                        //    //    value: that.DetailDto.pocet_rez_pohybu ?? 0,
                        //    //    unit: "",
                        //    //    primaryText: "Počet rezervačních pohybů",
                        //    //    secondaryText: "pohybů",
                        //    //    meaning: "info",
                        //    //    formatter: "N",
                        //    //    actionOnTitle: true,
                        //    //    itemTemplate: Gordic.Prefabs.Panels.kpiValueTwoRowsTextTemplate().itemTemplate,
                        //    //    action: "actTabRezPohyby",
                        //    //    showTextIcon: false,
                        //    //    visible: (that.DetailDto.pocet_rez_pohybu ?? 0) > 0,
                        //    //    isCurrency: false,
                        //    //},
                        //    //kpiPocetPlateb: {
                        //    //    name: "kpiPocetPlateb",
                        //    //    value: that.DetailDto.pocet_plateb ?? 0,
                        //    //    unit: "",
                        //    //    primaryText: "Počet plateb",
                        //    //    secondaryText: "plateb",
                        //    //    meaning: "info",
                        //    //    formatter: "N",
                        //    //    actionOnTitle: true,
                        //    //    itemTemplate: Gordic.Prefabs.Panels.kpiValueTwoRowsTextTemplate().itemTemplate,
                        //    //    action: "actTabPlatby",
                        //    //    showTextIcon: false,
                        //    //    visible: (that.DetailDto.pocet_plateb ?? 0) > 0,
                        //    //    isCurrency: false,
                        //    //}
                        //},
                        tabs: {
                            tabPripad: {
                                // základní údaje
                                tabParams: {
                                    title: "Případ",
                                    group: Gordic.Prefabs.TabGroups.Agenda(),
                                    opened: true,
                                    locked: false
                                },
                                init: function (tab) {
                                    // doplnění prvků do tabu
                                    $.newDiv().appendTo(tab).gform("createFrom", new Gordic.Forms.Form({ name: "formUcetniPripad", layoutDescriptor: "L2M2S1" })
                                        .addSection("Primární agenda")
                                        .addRow("Agenda").addField("gselectbox", Gordic.Prefabs.Select.ginctag(), { disabled: true, name: "typ_ag", model: "typ_ag=typ_ag;zkr_ag=typ_ag_zkr" })
                                        .addRow("Kniha").addField("gselectbox", Gordic.Prefabs.Select.ekoaden(), { disabled: true, name: "ixp_den", model: "ixp_den=ixp_den;ixp_den_txt=ixp_den_txt" })
                                        //.addRow("{0}, {1}".format(Gordic.Consts.DbShortcuts.nks ?? "NKS", Gordic.Consts.DbShortcuts.uus ?? "UUS")).addField("gstringbox", "w-6", { disabled: true, name: "nks" }).addField("gstringbox", "w-6", { disabled: true, name: "uus" })
                                        .addSection("jres:24100324") //RC 24100324 : Externí subjekt
                                        .addPrefab(WebClient.FucDetail.prefabEsuPam(that.DetailDto.ixs_esu))
                                        .addRow("Evidenční číslo subjektu").addField("gstringbox", { disabled: true, name: "ac_esu" })
                                        .addSection("Bankovní údaje")
                                        .addRow("Bankovní účet vlastní").addField("gstringbox", { disabled: true, name: "bu_vl_txt" })
                                        .addRow("Bankovní účet cizí").addField("gstringbox", { disabled: true, name: "bu_ci_txt" })
                                        .addPrefab(WebClient.FucDetail.prefabVsKsSs())
                                        .addRow("Způsob úhrady").addField("gselectbox", Gordic.Prefabs.Select.ekocizp(), { disabled: true, dropdown: true, name: "zp", model: "zp=zp;zp_zkr=zp_zkr;zp_txt=zp_txt" })
                                        .addSection("Částka")
                                        .addRow("Částka celkem v měně").addField("gnumberbox", "w-8", Gordic.Prefabs.Number.currency(), { disabled: true, name: "c_mena" }).addField("gselectbox", "w-4", Gordic.Prefabs.Select.ekocmen(), { disabled: true, name: "mena", model: "mena=mena;mena_zkr=mena_sis_aaa" })
                                        .addRow("Částka celkem v CZK").addField("gnumberbox", Gordic.Prefabs.Number.currency(), { disabled: true, name: "c_celk" })
                                        .addSection("Data")
                                        .addRow("Datum vystavení").addField("gdatebox", { disabled: true, name: "dat_vyst" })
                                        .addRow("Datum zdan. plnění").addField("gdatebox", { disabled: true, name: "dat_zdan" })
                                        .addRow("Datum splatnosti").addField("gdatebox", { disabled: true, name: "dat_splat" })
                                        .addSection("Popis")
                                        // TODO: nastavovat vždy výšku 4 (to asi odpovídá vedlejší sekci) nebo použítat autoSize?
                                        .addRow("Popis").addField("gstringbox", Gordic.Eko.Detail.Field.getCounterOptions(254 /* Fuc.Interface.GPripadDtoTypeLengths.popis */, false, false, { disabled: true, name: "popis", rows: /*4*/ 1, /*wrap: true*/ autoSize: true }))
                                        .addRow("Poznámka").addField("gstringbox", { disabled: true, name: "poznamka" }));
                                }
                            },
                            tabStavy: {
                                // stavy a jejich částky
                                tabParams: {
                                    title: "Stavy",
                                    group: Gordic.Prefabs.TabGroups.Agenda(),
                                    opened: true,
                                    locked: false
                                },
                                init: function (tab) {
                                    // doplnění prvků do tabu
                                    $.newDiv().appendTo(tab).gform("createFrom", new Gordic.Forms.Form({ name: "formStavy", layoutDescriptor: "L2M2S1" })
                                        .addSection("Stavy")
                                        .addRow("Stav případu").addField("gselectbox", Gordic.Prefabs.Select.fuccsup(), { disabled: true, name: "s_upr", model: "s_upr=s_upr;s_upr_txt=s_upr_txt" })
                                        .addRow("Stav přípravy k úhradě").addField("gselectbox", Gordic.Prefabs.Select.fuccspr(), { disabled: true, dropdown: true, name: "s_prip", model: "s_prip=s_prip;s_prip_txt=s_prip_txt" })
                                        .addRow("Stav odeslání k úhradě").addField("gselectbox", Gordic.Prefabs.Select.fuccsod(), { disabled: true, dropdown: true, name: "s_ode", model: "s_ode=s_ode;s_ode_txt=s_ode_txt" })
                                        .addRow("Stav párování").addField("gselectbox", Gordic.Prefabs.Select.fuccspa(), { disabled: true, dropdown: true, name: "s_par", model: "s_par=s_par;s_par_txt=s_par_txt" })
                                        .addRow("Stav zaúčtování").addField("gselectbox", Gordic.Prefabs.Select.fuccsza(), { disabled: true, name: "s_zau", model: "s_zau=s_zau;s_zau_txt=s_zau_txt" })
                                        .addRow("Stav storna").addField("gselectbox", Gordic.Prefabs.Select.ekocsto(), { disabled: true, name: "s_sto", model: "s_sto=s_sto;s_sto_txt=s_sto_txt" })
                                        .addSection("Částky")
                                        .addRow("Částka případu").addField("gnumberbox", Gordic.Prefabs.Number.currency(), { disabled: true, name: "c_upr" })
                                        .addRow("Částka přípravená k úhradě").addField("gnumberbox", Gordic.Prefabs.Number.currency(), { disabled: true, name: "c_prip" })
                                        .addRow("Částka odeslaná k úhradě").addField("gnumberbox", Gordic.Prefabs.Number.currency(), { disabled: true, name: "c_ode" })
                                        .addRow("Částka spárovaná").addField("gnumberbox", Gordic.Prefabs.Number.currency(), { disabled: true, name: "c_par" }));
                                }
                            },
                            tabPredkontace: {
                                // předkontace
                                tabParams: {
                                    title: "jres:24100376", //RC 24100376 : Předkontace
                                    group: Gordic.Prefabs.TabGroups.Agenda(),
                                    opened: false,
                                    locked: false,
                                    menuBar: ["actPredkontaceUpravit*"]
                                },
                                init: function (tab) {
                                    // přidání gridu předkontací do tabu
                                    that.$gridPredkontace = $.newDiv()
                                        .css("height", "100%")
                                        .appendTo(tab)
                                        // TODO: dodělat DTO ggridu (až po vyjasnění toho samého v GridFormatPredkontace)
                                        .ggrid({
                                        name: "gridPredkontace",
                                        // TODO: grid dodělat
                                        columnMode: "full", // fit (defaultne by melo byt toto), full
                                        // TODO: bude nějaká defaultní akce? jestli ano, tak buď oprava položky nebo nějaký nový detail položky
                                        // defaultAction: 
                                        //searchColumns: ["vs", "c", "typ_ag", "ac"],
                                        columns: WebClient.FucGrid.Zapis.createGridFormatPredkontace(that) //new Gordic.Data.GridFormat<Gordic.Fuc.Interface.GUeTeDto>().addSortedEkoCfuSet(that)
                                    });
                                }
                            },
                            tabIISSP: {
                                // IISSP
                                initLazy: true,
                                tabParams: {
                                    // záložka by měla být přístupná jen v režimu IISSP
                                    title: "jres:24100325", //RC 24100325 : IISSP
                                    group: { id: "grpIissp" },
                                    opened: false,
                                    locked: false,
                                    visible: that.JeIissp,
                                    //menuBar: ["actHistorieIissp"],
                                    //customLoad: function () {
                                    //    // načtení dat IISSP
                                    //    that.loadIissp();
                                    //}
                                },
                                contentParams: GContent.createInitializer(["Gordic.Iissp.WebControls.GStrukturaIISSP", { uid: "GStrukturaIISSP#" }], {
                                    serverParams: {
                                        ixs_hpr: this.DetailDto.ixp_upr
                                    }
                                })
                                //init: function (tab) {
                                //    // přidání gridů IISSP do tabu
                                //    $.newDiv().appendTo(tab).gform("createFrom", new Gordic.Forms.Form({ name: "formIissp", layoutDescriptor: "L1M1S1" }).addSection("Rezervační případ"));
                                //    that.$gridIISSPStavy = $.newDiv()
                                //        .css("height", "100%")
                                //        .appendTo(tab)
                                //        .ggrid<Gordic.Fuc.Interface.GIisspDto>({
                                //            name: "gridIISSPStavy",
                                //            // TODO: grid dodělat
                                //            columnMode: "full",     // fit (defaultne by melo byt toto), full
                                //            // TODO: bude nějaká defaultní akce? jestli ano, tak buď oprava položky nebo nějaký nový detail položky
                                //            // defaultAction: 
                                //            //searchColumns: ["vs", "c", "typ_ag", "ac"],
                                //            columns: FucGrid.Iissp.createGridFormat()
                                //        });
                                //    $.newDiv().appendTo(tab).gform("createFrom", new Gordic.Forms.Form("L1M1S1").addSection("Struktura v IISSP"));
                                //    that.$gridIISSPPolozky = $.newDiv()
                                //        .css("height", "100%")
                                //        .appendTo(tab)
                                //        .ggrid<Gordic.Fuc.Interface.GPolozkaIisspDto>({
                                //            name: "gridIISSPPolozky",
                                //            // TODO: grid dodělat
                                //            columnMode: "full",     // fit (defaultne by melo byt toto), full
                                //            // TODO: bude nějaká defaultní akce? jestli ano, tak buď oprava položky nebo nějaký nový detail položky
                                //            // defaultAction: 
                                //            //searchColumns: ["vs", "c", "typ_ag", "ac"],
                                //            columns: FucGrid.Iissp.createGridFormatPolozky()
                                //        });//.gautofit(); // TODO: tohle je tady zatím pokusně, protože se mi nedaří nastavit výšku seznamu položek podle aktuálního počtu řádků
                                //}
                            },
                            //tabPohyby: {
                            //    // Účetní a rezervační pohyby
                            //    initLazy: true,
                            //    // TODO: nerozdělit účetní a rezervační zvlášť? nebo to udělat jako u pohybů, tj přepínat to
                            //    tabParams: {
                            //        title: "Pohyby",
                            //        group: { id: "grpPohyby" },
                            //        opened: false,
                            //        locked: false,
                            //        menuBar: ["actDetailPohybu*"],
                            //        customLoad: function () {
                            //            // načtení pohybů
                            //            that.loadPohyby();
                            //        }
                            //    },
                            //    init: function (tab) {
                            //        // přidání gridů pohybů do tabu
                            //        that.$gridPohyby = $.newDiv()
                            //            .css("height", "100%")
                            //            .appendTo(tab)
                            //            .ggrid<Gordic.Fuc.Interface.GPohybDto>({
                            //                // TODO: grid dodělat
                            //                columnMode: "full",     // fit (defaultne by melo byt toto), full
                            //                defaultAction: that.actions.actDetailPohybu,
                            //                //searchColumns: ["vs", "c", "typ_ag", "ac"],
                            //                columns: FucGrid.Pohyb.createGridFormat(that, Gordic.Fuc.Globals.Enums.TypSezPoh.PohybyPripadu),
                            //                defaultProfile: {
                            //                    columnList: "ixp_upr,radek_upo,typ_upo_txt,s_upo_txt,s_sto_txt,ktg_upo_txt,znam_txt,c_upo,popis_upo,subjekt.nazev,dat_upo,dat_zauc,obd_dan,subrada_duz,priz_dd_txt"
                            //                }
                            //            });
                            //    }
                            //},
                            tabUctPohyby: {
                                // účetní pohyby
                                initLazy: true,
                                tabParams: {
                                    title: "jres:24100185", //RC 24100185 : Účetní pohyby
                                    group: { id: "grpPohyby" },
                                    opened: (that.DetailDto.pocet_uct_pohybu ?? 0) > 0,
                                    locked: false,
                                    menuBar: ["actDetailUctPohybu*"],
                                    badge: { params: this.BadgeUctPohyby },
                                    customLoad: function () {
                                        // načtení pohybů
                                        that.loadPohyby(true);
                                    }
                                },
                                init: function (tab) {
                                    // přidání gridů pohybů do tabu
                                    that.$gridUctPohyby = $.newDiv()
                                        .css("height", "100%")
                                        .appendTo(tab)
                                        .ggrid({
                                        name: "gridUctPohyby",
                                        // TODO: grid dodělat
                                        columnMode: "full", // fit (defaultne by melo byt toto), full
                                        defaultAction: that.actions.actDetailUctPohybu,
                                        //searchColumns: ["vs", "c", "typ_ag", "ac"],
                                        // TODO: nechat tento nebo použít TypSezPoh.UcetniPohyby - podívat se, čím se liší
                                        columns: WebClient.FucGrid.Pohyb.createGridFormat(that, Gordic.Fuc.Globals.Enums.TypSezPoh.PohybyPripadu),
                                        defaultProfile: {
                                            columnList: "ixp_upr,radek_upo,typ_upo_txt,s_upo_txt,s_sto_txt,ktg_upo_txt,znam_txt,c_upo,popis_upo,subjekt.nazev,dat_upo,dat_zauc,obd_dan,subrada_duz,priz_dd_txt"
                                        }
                                    })
                                        .gautofit({
                                        resizersOnTab: false
                                    });
                                }
                            },
                            tabRezPohyby: {
                                // rezervační pohyby
                                initLazy: true,
                                tabParams: {
                                    title: "jres:24100186", //RC 24100186 : Rezervační pohyby
                                    group: { id: "grpPohyby" },
                                    opened: (that.DetailDto.pocet_rez_pohybu ?? 0) > 0,
                                    locked: false,
                                    menuBar: ["actDetailRezPohybu*"],
                                    badge: { params: this.BadgeRezPohyby },
                                    customLoad: function () {
                                        // načtení pohybů
                                        that.loadPohyby(false);
                                    }
                                },
                                init: function (tab) {
                                    // přidání gridů pohybů do tabu
                                    that.$gridRezPohyby = $.newDiv()
                                        .css("height", "100%")
                                        .appendTo(tab)
                                        .ggrid({
                                        name: "gridRezPohyby",
                                        // TODO: grid dodělat
                                        columnMode: "full", // fit (defaultne by melo byt toto), full
                                        defaultAction: that.actions.actDetailRezPohybu,
                                        //searchColumns: ["vs", "c", "typ_ag", "ac"],
                                        // TODO: nechat tento nebo použít TypSezPoh.RezervacniPohyby - podívat se, čím se liší
                                        columns: WebClient.FucGrid.Pohyb.createGridFormat(that, Gordic.Fuc.Globals.Enums.TypSezPoh.PohybyPripadu),
                                        defaultProfile: {
                                            columnList: "ixp_upr,radek_upo,typ_upo_txt,s_upo_txt,s_sto_txt,ktg_upo_txt,znam_txt,c_upo,popis_upo,subjekt.nazev,dat_upo,dat_zauc,obd_dan,subrada_duz,priz_dd_txt"
                                        }
                                    })
                                        .gautofit({
                                        resizersOnTab: false
                                    });
                                }
                            },
                            tabPlatby: {
                                // platby
                                initLazy: true,
                                tabParams: {
                                    title: "jres:24100448", //RC 24100448 : Platby
                                    group: { id: "grpPlatby" },
                                    opened: (that.DetailDto.pocet_plateb ?? 0) > 0,
                                    locked: false,
                                    menuBar: ["actDetailPlatby*"],
                                    badge: { params: this.BadgePlatby },
                                    customLoad: function () {
                                        // načtení plateb
                                        that.loadPlatby();
                                    }
                                },
                                init: function (tab) {
                                    // přidání gridů plateb do tabu
                                    that.$gridPlatby = $.newDiv()
                                        .css("height", "100%")
                                        .appendTo(tab)
                                        .ggrid({
                                        name: "gridPlatby",
                                        // TODO: grid dodělat
                                        columnMode: "full", // fit (defaultne by melo byt toto), full
                                        defaultAction: that.actions.actDetailPlatby,
                                        //searchColumns: ["vs", "c", "typ_ag", "ac"],
                                        columns: WebClient.FucGrid.Platba.createGridFormat(that),
                                        defaultProfile: {
                                            columnList: "ixp,vs,subjekt.nazev,c,bu_vl_txt,bu_ci_txt,vs,dat_spl,dat_zap,s_uhrp_txt,priz_nepar_txt"
                                        }
                                    })
                                        .gautofit({
                                        resizersOnTab: false
                                    });
                                }
                            },
                            tabUctInfo: {
                                // informace
                                group: { id: "grpUctRez" },
                                init: function (tab) {
                                    // flash s informací o jiném roku
                                    WebClient.FucDetail.flashRokCfu(tab, that.Rok, "idRokUctMessage");
                                }
                            },
                            tabUctZapisy: {
                                // účtování
                                initLazy: true,
                                tabParams: {
                                    title: "jres:24100449", //RC 24100449 : Účetní zápisy pohybů
                                    group: { id: "grpUctRez" },
                                    opened: false,
                                    locked: false,
                                    //visible: that.DetailDto.JeZauctovany! || (that.DetailDto.JeNezauctovany! && (that.DetailDto.typ_upo === Gordic.Fuc.Globals.Enums.TypUpo.UcetniPoloautomaticky || that.DetailDto.typ_upo === Gordic.Fuc.Globals.Enums.TypUpo.UcetniRucni)),
                                    //menuBar: ["actUctovaniTiskPohybu*", "actUctovaniTiskDokladu*", "actUctovaniDokladOZauctovani*", "actUctovaniHistorieUctovani*"],
                                    customLoad: function () {
                                        // načtení účtování
                                        // TODO: dodělat zobrazení historie účtování? buď přes seznam (obecně může být pohyb ve více historií účtování) nebo dohledat ten nejnovější, kde je pohyb zaúčtován
                                        // TODO: neřešit uložený typ zobrazení?
                                        that.loadUctZapisy();
                                    }
                                },
                                init: function (tab) {
                                    // grid
                                    that.$gridUctZapisy = $.newDiv()
                                        .appendTo(tab)
                                        .ggrid({
                                        name: "gridUctZapisy",
                                        columnMode: "full",
                                        // TODO: upravit:
                                        //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                                        columns: WebClient.FucGrid.Zapis.createGridFormatN(that, { drd: true, datum: true, pohyb: true, dph: true })
                                    })
                                        .gautofit({
                                        resizersOnTab: false
                                    });
                                }
                            },
                            tabRezZapisy: {
                                // rezervace
                                initLazy: true,
                                tabParams: {
                                    title: "jres:24100451", //RC 24100451 : Rezervační zápisy pohybů
                                    group: { id: "grpUctRez" },
                                    opened: false,
                                    locked: false,
                                    //visible: (that.DetailDto.JeUcetni! || that.DetailDto.JeRezervacni!) && that.DetailDto.JeZauctovany!,
                                    customLoad: function () {
                                        // načtení rezervací
                                        that.loadRezZapisy();
                                    }
                                },
                                // TODO: udělat přepínač na zápisy z rezervačního pohybu a z účetního pohybu?
                                init: function (tab) {
                                    // grid
                                    that.$gridRezZapisy = $.newDiv()
                                        .appendTo(tab)
                                        .ggrid({
                                        name: "gridRezZapisy",
                                        columnMode: "full",
                                        // TODO: upravit:
                                        //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                                        columns: WebClient.FucGrid.Zapis.createGridFormatN(that, { drd: true, datum: true, pohyb: true })
                                    })
                                        .gautofit({
                                        resizersOnTab: false
                                    });
                                }
                            },
                            tabDokladyOZauc: {
                                // účtování
                                initLazy: true,
                                tabParams: {
                                    title: "jres:24100452", //RC 24100452 : Doklady o zaúčtování
                                    group: { id: "grpUctRez" },
                                    opened: false,
                                    locked: false,
                                    //visible: that.DetailDto.JeUcetni! && that.DetailDto.JeZauctovany!,
                                    menuBar: ["actUctovaniDokladOZauctovani*"],
                                    customLoad: function () {
                                        // načtení účtování
                                        // TODO: dodělat zobrazení historie účtování? buď přes seznam (obecně může být pohyb ve více historií účtování) nebo dohledat ten nejnovější, kde je pohyb zaúčtován
                                        // TODO: neřešit uložený typ zobrazení?
                                        that.loadDokladyOZauctovani();
                                    }
                                },
                                init: function (tab) {
                                    // tabulky
                                    $.newDiv()
                                        .appendTo(tab)
                                        .gform("createFrom", new Gordic.Forms.Form("L1M1S1").addSection( /*"Doklady"*/ /*"Doklad o zaúčtování"*/));
                                    that.$gridDokladyOZauc = $.newDiv()
                                        .appendTo(tab)
                                        .ggrid({
                                        name: "gridDokladyOZauc",
                                        columnMode: "full",
                                        // TODO: upravit:
                                        //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
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
                                    // zápisy dokladu
                                    $.newDiv()
                                        .appendTo(tab)
                                        .gform("createFrom", new Gordic.Forms.Form("L1M1S1").addSection("Zápisy dokladu"));
                                    that.$gridZapisyDokladuOZauc = $.newDiv()
                                        .appendTo(tab)
                                        .ggrid({
                                        name: "gridZapisyDokladuOZauc",
                                        columnMode: "full",
                                        // TODO: upravit:
                                        //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                                        columns: WebClient.FucGrid.Zapis.createGridFormat(that, false)
                                    })
                                        .gautofit({
                                        resizersOnTab: false
                                    });
                                    // další pohyby z dokladu
                                    // TODO: dát sem akci na detail pohybu?
                                    //$.newDiv()
                                    //    .appendTo(tab)
                                    //    .gform("createFrom", new Gordic.Forms.Form("L1M1S1").addSection("Další pohyby dokladu"));
                                    //that.$gridUctovaniDalsiPohyby = $.newDiv()
                                    //    .appendTo(tab)
                                    //    .ggrid<Gordic.Fuc.Interface.GPohybDto>({
                                    //        columnMode: "full",
                                    //        // TODO: upravit:
                                    //        //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                                    //        columns: FucGrid.Pohyb.createGridFormat(that, Gordic.Fuc.Globals.Enums.TypSezPoh.UcetniPohyby),
                                    //        //cellActivate: function (ev, obj) {
                                    //        //    // načtení zápisů aktuálního dokladu
                                    //        //    if (obj.cellInfo) that.nacteniSeznamuZapisu();
                                    //        //}
                                    //    });
                                }
                            },
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
                    // úprava druhé a třetí sekce (typ a kategorie knihy, kompetenta a realizátora)
                    const formSetup = {};
                    const headerForm = new Gordic.Forms.Form({ name: "formHeader" })
                        .addSection()
                        .addRow("Kategorie dokladu").addField("gselectbox", Gordic.Prefabs.Select.ginckat(), {
                        disabled: true,
                        name: "ktg_typ",
                        model: "ktg_typ=ktg_typ;ktg_typ_txt=ktg_typ_txt"
                    })
                        .addSection()
                        .addRow("Typ případu").addField("gselectbox", Gordic.Prefabs.Select.fucstup(), {
                        disabled: true,
                        name: "typ_upr",
                        model: "typ_upr=typ_upr;typ_upr_txt=nazev"
                    })
                        .addRow("Kategorie případu").addField("gselectbox", Gordic.Prefabs.Select.fuccupr(), {
                        disabled: true,
                        name: "ktg_upr",
                        model: "ktg_upr=ktg_upr;ktg_upr_txt=ktg_upr_txt"
                    });
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data1] = {
                        rows: [
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.TypDokladu)[0]?.item, // typ dokladu
                            headerForm.form.sections[0].rows[0], // kategorie dokladu
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.DatumEvidence)[0]?.item // datum evidence
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data2] = {
                        rows: [
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.Zpracovatel)[0]?.item, // zpracovatel
                            headerForm.form.sections[1].rows[1], // kategorie případu
                            headerForm.form.sections[1].rows[0] // typ případu
                        ]
                    };
                    // vlastní nastavení prvků (převážně model). pozor, nesmí se měnit name
                    formSetup[Gordic.Eko.HeaderForm.Fields.Id] = { options: { model: "ixp_upr" } };
                    formSetup[Gordic.Eko.HeaderForm.Fields.Zpracovatel] = { options: { model: "ixs_fun_akt=ixs_fun;ixs_fun_txt=nazev;ixs_fun_ref_txt=nazev_ref;ixs_fun_su_txt=nazev_su" } };
                    formSetup[Gordic.Eko.HeaderForm.Fields.Popis] = { options: { model: "popis_zkr" } };
                    // jiný label pro popis
                    formSetup[Gordic.Eko.HeaderForm.Rows.Popis] = { label: "Popis zkrácený" };
                    // aktualizace hlavičky
                    Gordic.Eko.HeaderForm.setup(builder, formSetup);
                    // úprava menu a položek
                    WebClient.FucDetail.changeBuilderDefinition(builder);
                    // přesun KPI příloh na první místo
                    builder.moveDefinitionBefore("kpiPrilohy", null, GDbd.DefinitionKind.Kpi);
                    // šipky pro posun po seznamu
                    this.listControls_setup({
                        rowToDto: function (gridState) {
                            return {
                                IxpUpr: gridState.currentRow.data.ixp_upr,
                                NasledujiciDetail: true
                            };
                        },
                        nextItemTemplate: "Následující: {ixp_upr}<br>{ac_ag:trim} - {ac:trim}<br>{popis:trim:encode}",
                        prevItemTemplate: "Předchozí: {ixp_upr}<br>{ac_ag:trim} - {ac:trim}<br>{popis:trim:encode}",
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
                 * Změna předkontací (uložených analytik) případu
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                zmenaPredkontaci() {
                    // TODO: dodělat
                    return this.dialogs.messageBox(this.actions.actPredkontaceUpravit.caption, "Změna předkontací případu ještě není obsloužena").createDialogPromise();
                    //return $.Deferred().reject().promise();
                }
                /**
                 * Nahrání a zobrazení dat z IISSP
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadIissp() {
                    let that = this;
                    // načtení dat IISSP z databáze (pokud je režim IISSP)
                    if (this.JeIissp) {
                        // načtení dat
                        that.beginOperation("jres:24100494"); //RC 24100494 : Probíhá načtení informací
                        return that.isl.Iissp.read({ ixs_hpr: that.DetailDto.ixp_upr, rok: that.Rok })
                            .getData()
                            .then(function (data) {
                            // úprava dat
                            return WebClient.FucGrid.Iissp.modifyDto([data]);
                        })
                            .then(function (data) {
                            // pohled
                            let view = new Gordic.Data.View(data, { /*key: ""*/});
                            // nastavení dat a překreslení gridu
                            that.$gridIISSPStavy.ggrid("setData", view);
                            if (data && data.length > 0) {
                                // pohled
                                let viewPol = new Gordic.Data.View(data[0].polozky, { /*key: ""*/});
                                // nastavení dat a překreslení gridu
                                that.$gridIISSPPolozky.ggrid("setData", viewPol);
                            }
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
                 * Zobrazení historie volání IISSP
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                historieIissp() {
                    return this.navigate([Gordic.Iissp.WebControls.GIisspRezWsCallHistory, { uid: "GIisspRezWsCallHistory#" }], {
                        ixs_hpr: this.DetailDto.ixp_upr
                    })
                        .createDialogPromise();
                }
                /**
                 * Nahrání a zobrazení pohybů
                 *
                 * @param {boolean} ucetni jde o účetní (true) nebo rezervační (false) pohyby?
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadPohyby(ucetni) {
                    let that = this;
                    // načtení dat
                    that.beginOperation("jres:24100480"); //RC 24100480 : Probíhá načtení pohybů
                    return that.isl.FinPohyb.list(rq => {
                        return {
                            filters: {
                                ixp_upr: that.DetailDto.ixp_upr,
                                upr_s_upr_def: 2,
                                typ_upo: ucetni
                                    ? [Gordic.Fuc.Globals.Enums.TypUpo.UcetniAutomaticky, Gordic.Fuc.Globals.Enums.TypUpo.UcetniStorno, Gordic.Fuc.Globals.Enums.TypUpo.UcetniPoloautomaticky, Gordic.Fuc.Globals.Enums.TypUpo.UcetniRucni, Gordic.Fuc.Globals.Enums.TypUpo.Neucetni]
                                    : [Gordic.Fuc.Globals.Enums.TypUpo.Rezervacni]
                            }
                        };
                    })
                        .getData()
                        .then(function (data) {
                        // pohled
                        let view = new Gordic.Data.View(data, { key: "ixp_upr,radek_upo" });
                        // nastavení dat a překreslení gridu
                        (ucetni ? that.$gridUctPohyby : that.$gridRezPohyby).ggrid("setData", view);
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
                 * Nahrání a zobrazení plateb
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadPlatby() {
                    let that = this;
                    // načtení dat
                    that.beginOperation("jres:24100493"); //RC 24100493 : Probíhá načtení plateb
                    return that.isl.Platba.list(rq => { return { filters: { ixp: that.DetailDto.ixp_upr } }; })
                        .getData()
                        .then(function (data) {
                        // pohled
                        let view = new Gordic.Data.View(data, { key: "ixp,radek_uhr" });
                        // nastavení dat a překreslení gridu
                        that.$gridPlatby.ggrid("setData", view);
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
                 * Nahrání a zobrazení účetních zápisů pohybů
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadUctZapisy() {
                    let that = this;
                    // načtení zápisů
                    that.beginOperation("jres:24100492"); //RC 24100492 : Probíhá načtení zápisů
                    return that.isl.Zapis.list(rq => {
                        return {
                            filters: {
                                z_pohybu: 1,
                                dok_ixp_upr: that.DetailDto.ixp_upr,
                            }
                        };
                    })
                        .getData()
                        .then(function (data) {
                        // zobrazení zápisů
                        let view = new Gordic.Data.View(data, { key: "ixp_upr,radek_upo,radek_zap" });
                        // nastavení dat a překreslení gridu
                        that.$gridUctZapisy.ggrid("setData", view);
                        return;
                    })
                        .done(function () {
                        // nastavení tabu
                        that.enableUcetniZapisy();
                    })
                        .always(function () {
                        that.endOperation();
                    });
                }
                /**
                 * Nahrání a zobrazení dokladů o zaúčtování
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadDokladyOZauctovani() {
                    let that = this;
                    // načtení dat hlavičky (pouze pro zobrazení dokladu)
                    that.beginOperation("jres:24100479"); //RC 24100479 : Probíhá načtení dokladů
                    return that.isl.Zapis.listDokladu(rq => { return { filters: { z_pohybu: 1, dok_ixp_upr: that.DetailDto.ixp_upr } }; })
                        .getData()
                        .then(function (data) {
                        let view = new Gordic.Data.View(data, { key: "rok,lic,ico,ucs,mesic,ac" });
                        // nastavení dat a překreslení gridu
                        that.$gridDokladyOZauc.ggrid("setData", view);
                        return;
                    })
                        .done(function () {
                        // nastavení tabu
                        that.enableDokladOZauctovani();
                    })
                        .always(function () {
                        that.endOperation();
                    });
                }
                /**
                 * Nahrání a zobrazení zápisů dokladu
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadZapisyDokladu() {
                    let that = this;
                    // načtení dat zápisů
                    let aktDoklad = Gordic.Eko.Grid.currentRow(that.$gridDokladyOZauc);
                    if (aktDoklad) {
                        // načtení zápisů
                        return that.isl.Zapis.list(rq => {
                            return {
                                filters: {
                                    dok_rok: aktDoklad.rok,
                                    dok_lic: aktDoklad.lic,
                                    dok_ico: aktDoklad.ico,
                                    dok_ucs: aktDoklad.ucs,
                                    dok_mesic: aktDoklad.mesic,
                                    dok_ac: aktDoklad.ac
                                }
                            };
                        })
                            .getData()
                            .done(function (data) {
                            // zobrazení zápisů
                            // TODO: opravit key (je to i v loadRezervace)
                            let view = new Gordic.Data.View(data, { key: "radek_zap" });
                            // nastavení dat a překreslení gridu
                            that.$gridZapisyDokladuOZauc.ggrid("setData", view);
                            return;
                        });
                    }
                    else {
                        return $.Deferred().resolve();
                    }
                }
                /**
                 * Nahrání a zobrazení rezervačních zápisů
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadRezZapisy() {
                    let that = this;
                    // načtení zápisů
                    that.beginOperation("jres:24100492"); //RC 24100492 : Probíhá načtení zápisů
                    return that.isl.Zapis.list(rq => {
                        return {
                            filters: {
                                rezervacni: 1,
                                dok_ixp_upr: that.DetailDto.ixp_upr
                            }
                        };
                    })
                        .getData()
                        .then(function (data) {
                        // pohled
                        // TODO: opravit key pro ROZ (je to i v loadUctovaniDoklady)
                        let view = new Gordic.Data.View(data, { key: "radek_zap" });
                        // nastavení dat a překreslení gridu
                        that.$gridRezZapisy.ggrid("setData", view);
                        return;
                    })
                        .done(function () {
                        // aktualizace okna
                        that.enableRezervacniZapisy();
                    })
                        .always(function () {
                        that.endOperation();
                    });
                }
                /**
                 * Otevření detailu v primární agendě
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detailVPrimarniAgende() {
                    // TODO: nemá tato akce být i na seznamu?
                    // otevření detailu PID v primární agendě
                    return WebClient.FucUtils.openDetailInOtherTab(this.DetailDto.typ_ag, this.DetailDto.ixp_upr, null, null, this.DetailDto?.je_ve_wfl !== 1);
                }
                /**
                 * Stornování
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                storno() {
                    let that = this;
                    return WebClient.FucDetail.runIslActionWithReason(this, that.DetailDto.JeStornovany
                        ? "jres:24100288" //RC 24100288 : Opravdu chcete zrušit storno případu?
                        : "jres:24100289", //RC 24100289 : Opravdu chcete stornovat případ?
                    (data) => { return that.isl.FinPripad.stornuj({ rows: [that.DetailDto], stornovat: !that.DetailDto.JeStornovany, duvod: data.duvod }); }, () => { return that.setActiveOperationAndReloadData(); }, that.DetailDto.JeStornovany ? that.actions.actZrusitStorno : that.actions.actStorno);
                }
                /**
                 * Uzavření
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                uzavreni() {
                    let that = this;
                    let formDef = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1 LMS-2-10-0" })
                        .addRow().addField("gstatic", {
                        caption: that.DetailDto.JeUzavreny
                            ? "jres:24100282" //RC 24100282 : Opravdu chcete zrušit uzavření případu?
                            : "jres:24100283" //RC 24100283 : Opravdu chcete uzavřít případ?
                    });
                    if (that.DetailDto.JeUzavreny)
                        formDef
                            .addRow("jres:24100284") //RC 24100284 : Případy agend FUC a INT
                            .addField("gcheck", { name: "otevrit_fuc_int", label: "jres:24100285" }); //RC 24100285 : otevřít do stavu 'otevřen' místo do stavu 'připraven k uzavření
                    return WebClient.FucDetail.runIslActionWithForm(this, {
                        form: formDef,
                        height: 200
                    }, (data) => { return that.isl.FinPripad.uzavri({ rows: [that.DetailDto], uzavrit: !that.DetailDto.JeUzavreny, otevrit_fuc_int: data.otevrit_fuc_int }); }, () => { return that.setActiveOperationAndReloadData(); }, that.DetailDto.JeUzavreny ? that.actions.actZrusitUzavreni : that.actions.actUzavreni);
                }
                /**
                 * Předání
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                predani() {
                    let that = this;
                    let formDef = new Gordic.Forms.Form({ layoutDescriptor: "L1M1S1 LMS-2-10-0" })
                        .addRow("Účtárna").addField("gselectbox", Gordic.Prefabs.Select.ekosuus(), {
                        name: "uus",
                        model: "uus=uus,ico=>ico,ucs=>ucs",
                        serverFilters: {
                            ico: this.Ico,
                            ucs: this.Ucs,
                            uus: this.dbparams.fuc_rez_pro === Gordic.Fuc.Globals.Enums.RezimProvozu.Referent || this.dbparams.fuc_rez_pro === Gordic.Fuc.Globals.Enums.RezimProvozu.Uctarna ? (this.Uus === "HU" ? "HU" : [this.Uus, "HU"]) : void 0,
                        },
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        dropdown: true
                    })
                        .addField("gcheck", {
                        name: "zmena_funkce",
                        label: "Změnit zpracovatele",
                        change: function (ev, changeObj) {
                            let newValue;
                            newValue = (changeObj.value === true);
                            $(ev.target).closest(".gform").findFields("ixs_fun").gfield("option", "disabled", !newValue);
                        }
                    })
                        .addRow("Zpracovatel").addField("gselectbox", Gordic.Prefabs.Select.ginsfun(), {
                        name: "ixs_fun",
                        model: "ixs_fun=ixs_fun",
                        serverFilters: {
                            DlePovolenychFazi: "GWAFUC05",
                            EkoIco: that.Ico,
                            EkoUcs: that.Ucs,
                            EkoUus: new Gordic.Forms.Dependency("uus", "uus", true)
                        },
                        flag: Gordic.Prefabs.Field.Flags.required,
                        validators: [new Gordic.Validators.Required()],
                        dropdown: true
                    })
                        .addRow("jres:24100294").addField("gstringbox", { name: "duvod", flag: Gordic.Prefabs.Field.Flags.required, validators: [new Gordic.Validators.Length({ max: 254 }), new Gordic.Validators.Required()] }); //RC 24100294 : Důvod
                    // TODO: co dotaz Případ nebude přidělen žádnému referentovi, chcete pokračovat? jako je v Guptě. nebo jen doplnit text, že pokud nebude zadána funkce, nebude případ přidělen žádnému referentovi?
                    // TODO: nebo doplnit text do formuláře (a podobný i do průvodce na seznam)
                    return WebClient.FucDetail.runIslActionWithForm(this, {
                        form: formDef,
                        data: { uus: that.Uus, ico: that.Ico, ucs: that.Ucs, zmena_funkce: true },
                    }, (data) => { return that.isl.FinPripad.predej({ rows: [that.DetailDto], predat: true, uus: data.uus, ixs_fun_akt: data.ixs_fun, duvod: data.duvod }); }, () => { return that.setActiveOperationAndReloadData(); }, that.actions.actPredani);
                }
                /**
                 * Diagnostika (uložení dat) případu
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                diagnostika() {
                    // uložení zipu s daty aktuálního případu
                    return WebClient.FucDetail.diagnostika(400 /* Wfl.Interface.GIdentifikatorCoJsemZac.FinancniPripad */, this.IxpUpr, this);
                }
                /**
                 * Uložení / zobrazení dokladu o zaúčtování
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                dokladOZauctovani() {
                    let aktDoklad = Gordic.Eko.Grid.currentRow(this.$gridDokladyOZauc);
                    if (aktDoklad) {
                        // uložení/otevření souboru
                        return WebClient.FucDetail.dokladOZauctovani(this, null /*aktDoklad?.ixb_dzu*/, aktDoklad?.rok, aktDoklad?.lic, aktDoklad?.ico, aktDoklad?.ucs, aktDoklad?.mesic, aktDoklad?.ac);
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Zobrazí detail vybraného pohybu
                 *
                 * @param {boolean} ucetni jde o účetní (true) nebo rezervační (false) pohyb?
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detailPohybu(ucetni) {
                    let that = this;
                    // aktuální vybraná položka
                    let aktRadek = Gordic.Eko.Grid.currentRow(ucetni ? this.$gridUctPohyby : this.$gridRezPohyby);
                    if (aktRadek) {
                        // příznak aktivní operace
                        let needRefresh = false;
                        // otevření detailu
                        let $detailWindow = this.navigate(["Gordic.Fuc.WebClient.GDetailPohybu", { gridRemoteControl: new Gordic.Components.GridRC(ucetni ? this.$gridUctPohyby : this.$gridRezPohyby) }], {
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
                 * Zobrazí detail vybrané platby
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detailPlatby() {
                    let that = this;
                    // aktuální vybraná položka
                    let aktRadek = Gordic.Eko.Grid.currentRow(this.$gridPlatby);
                    if (aktRadek) {
                        // příznak aktivní operace
                        let needRefresh = false;
                        // otevření detailu
                        let $detailWindow = this.navigate(["Gordic.Fuc.WebClient.GDetailPlatby", { gridRemoteControl: new Gordic.Components.GridRC(that.$gridPlatby) }], {
                            ID: 'DetailPlatby#',
                            Ixp: aktRadek.ixp,
                            RadekUhr: aktRadek.radek_uhr
                        });
                        // obsluha aktivní operace na detailu
                        $.content($detailWindow).on(WebClient.FucDetail.triggerChange, (retVal) => {
                            // záznam byl změněn, musí se načíst znovu
                            if (retVal?.data?.ixp && retVal?.data?.radek_uhr) {
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
                 * Nastavení prvků ve formuláři
                 */
                enable() {
                    // status bar
                    // zaúčtován/zarezervován nebo nestornován OK jinak varování
                    // TODO: doplnit konstanty pro SZau
                    // TODO: dořešit barvy s_upr
                    Gordic.Eko.Detail.StatusBar.updateItem(this.statuses["statusBarSUpr"], this.DetailDto.s_upr_txt?.toUpperCase() ?? "", 
                    //(this.DetailDto.s_upr === Gordic.Fuc.Globals.Enums.SUpo.Zauctovany
                    //    ? Eko.Utils.RecordFormatType.Realizovano
                    /*:*/ null
                    /*)*/ );
                    Gordic.Eko.Detail.StatusBar.updateItem(this.statuses["statusBarSZau"], this.DetailDto.s_zau_txt?.toUpperCase() ?? "", (this.DetailDto.s_zau === 20
                        ? Gordic.Eko.Utils.RecordFormatType.Realizovano
                        : null));
                    Gordic.Eko.Detail.StatusBar.updateItem(this.statuses["statusBarSSto"], (this.DetailDto.s_sto !== Gordic.Fuc.Globals.Enums.SSto.Nestornovano ? (this.DetailDto.s_sto_txt?.toUpperCase() ?? "") : ""), (this.DetailDto.s_sto === Gordic.Fuc.Globals.Enums.SSto.Storno
                        ? Gordic.Eko.Utils.RecordFormatType.Stornovano
                        : null));
                    // akce
                    const permEmptyGrid = WebClient.FucGrid.getEmptyGridPermission();
                    const acts = this.actions;
                    const perms = this.DetailDto.Permissions;
                    // TODO: doplnit správné podmínky
                    acts.actStorno.updatePermission(perms ? perms.LzeStornovat : undefined);
                    acts.actZrusitStorno.updatePermission(perms ? perms.LzeZrusitStorno : undefined);
                    acts.actUzavreni.updatePermission(perms ? perms.LzeUzavrit : undefined);
                    acts.actZrusitUzavreni.updatePermission(perms ? perms.LzeZrusitUzavreni : undefined);
                    acts.actPredani.updatePermission(perms ? perms.LzePredat : undefined);
                    acts.actDiagnostika.updatePermission(perms ? perms.LzeDiagnostika : undefined);
                    acts.actObcerstveniPrip.updatePermission({ value: true });
                    // TODO: doplnit správné podmínky podle toho, co je to za agendy (jestli WK existuje a asi jestli je nainstalovaný - zjistit, jak to je v ADA)
                    //if (this.DetailDto.typ_ag === Gordic.Fuc.Globals.Enums.TypAg.FUC || this.DetailDto.typ_ag === Gordic.Fuc.Globals.Enums.TypAg.INT) {
                    //    acts.actDetailVPrimarniAgende!.updatePermission(perms ? perms.LzeZobrazit : undefined);
                    //}
                    acts.actDetailVPrimarniAgende.updatePermission(this.DetailDto.typ_ag === Gordic.Fuc.Globals.Enums.TypAg.FUC || this.DetailDto.typ_ag === Gordic.Fuc.Globals.Enums.TypAg.INT
                        ? { value: false, message: "Detail je již v primární agendě zobrazen" }
                        : (perms ? perms.LzeZobrazit : undefined));
                    // tab předkontací
                    acts.actPredkontaceUpravit.updatePermission(perms ? perms.LzeUprPredkontaci : undefined);
                    // tab pohybů
                    //const aktRadekPoh = Gordic.Eko.Grid.currentRow<Gordic.Fuc.Interface.GPohybDto>(this.$gridPohyby);
                    //acts.actDetailPohybu!.updatePermission(aktRadekPoh !== null ? { value: true } : permEmptyGrid);
                    const aktRadekUctPoh = Gordic.Eko.Grid.currentRow(this.$gridUctPohyby);
                    acts.actDetailUctPohybu.updatePermission(aktRadekUctPoh !== null ? { value: true } : permEmptyGrid);
                    const aktRadekRezPoh = Gordic.Eko.Grid.currentRow(this.$gridRezPohyby);
                    acts.actDetailRezPohybu.updatePermission(aktRadekRezPoh !== null ? { value: true } : permEmptyGrid);
                    // tab plateb
                    const aktRadekPla = Gordic.Eko.Grid.currentRow(this.$gridPlatby);
                    acts.actDetailPlatby.updatePermission(aktRadekPla !== null ? { value: true } : permEmptyGrid);
                    // tab IISSP
                    const aktRadekIissp = Gordic.Eko.Grid.currentRow(this.$gridIISSPPolozky);
                    acts.actHistorieIissp.updatePermission(aktRadekIissp !== null ? { value: true } : permEmptyGrid);
                    // tab účtování a rezervace
                    this.enableUcetniZapisy();
                    this.enableRezervacniZapisy();
                    this.enableDokladOZauctovani();
                }
                /**
                 * Nastavení prvků v tabu účetní zápisy
                 */
                enableUcetniZapisy() {
                    // TODO: aktuálně na tabu nejsou žádná akce
                }
                /**
                 * Nastavení prvků v tabu doklad o zaúčtování
                 */
                enableDokladOZauctovani() {
                    // aktuální doklad
                    const aktRadekDok = Gordic.Eko.Grid.currentRow(this.$gridDokladyOZauc);
                    // akce dokladů
                    const permEmptyGrid = WebClient.FucGrid.getEmptyGridPermission();
                    const acts = this.actions;
                    acts.actUctovaniDokladOZauctovani.updatePermission(aktRadekDok !== null ? { value: true } : permEmptyGrid);
                }
                /**
                 * Nastavení prvků v tabu rezervační zápisy
                 */
                enableRezervacniZapisy() {
                    // TODO: aktuálně na tabu nejsou žádná akce
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
                    // naplnění gridu předkontací
                    if (this.DetailDto) {
                        let view = new Gordic.Data.View([this.DetailDto], { /*key: "ixp,radek_pol,subradek,radek_av"*/});
                        this.$gridPredkontace.ggrid("setData", view);
                        // vybrání nějaké položky v gridu položek
                        //this.vybraniPolozky();
                    }
                    // naplnění gridu pohybů je až po rozkliknutí tabu
                    // badge
                    // TODO: nechat to zde nebo to přesunout do metody enable?
                    WebClient.FucDetail.updateBadge(this.BadgePohyby, this.DetailDto?.pocet_pohybu);
                    WebClient.FucDetail.updateBadge(this.BadgeUctPohyby, this.DetailDto?.pocet_uct_pohybu);
                    WebClient.FucDetail.updateBadge(this.BadgeRezPohyby, this.DetailDto?.pocet_rez_pohybu);
                    WebClient.FucDetail.updateBadge(this.BadgePlatby, this.DetailDto?.pocet_plateb);
                    // nastavení stavu políček a akcí
                    this.enable();
                }
                /**
                 * Test, jestli je možné okno zavřít
                 *
                 * @returns {JQueryPromise<Interface.GPripadDto> | Interface.GPripadDto} promise s daty (resolve = je možné zavřít, reject = není možné zavřít) nebo přímo boolean; boolean určuje, jestli byla nějaká aktivní operace (true) nebo ne (false) nebo přímo data detailu
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
            GDetailPripadu = __decorate([
                gcontent
            ], GDetailPripadu);
            WebClient.GDetailPripadu = GDetailPripadu;
        })(WebClient = Fuc.WebClient || (Fuc.WebClient = {}));
    })(Fuc = Gordic.Fuc || (Gordic.Fuc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFByaXBhZHUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGV0YWlsUHJpcGFkdS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBcWdEZjtBQXJnREQsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBcWdEbkI7SUFyZ0RnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0FxZ0Q3QjtRQXJnRG9CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBS25DOzs7OztlQUtHO1lBRUgsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBZSxTQUFRLE9BQUEscUJBQXdDO2dCQUE1RTs7b0JBT0k7Ozt1QkFHRztvQkFDSyxvQkFBZSxHQUFrQixJQUFJLENBQUM7b0JBQzlDOzs7dUJBR0c7b0JBQ0ssc0JBQWlCLEdBQWtCLElBQUksQ0FBQztvQkFDaEQsS0FBSztvQkFDTCxnQkFBZ0I7b0JBQ2hCLG1CQUFtQjtvQkFDbkIsS0FBSztvQkFDTCw4QkFBOEI7b0JBQzlCOzs7dUJBR0c7b0JBQ0ssbUJBQWMsR0FBa0IsSUFBSSxDQUFDO29CQUM3Qzs7O3VCQUdHO29CQUNLLG1CQUFjLEdBQWtCLElBQUksQ0FBQztvQkFDN0M7Ozt1QkFHRztvQkFDSyxnQkFBVyxHQUFrQixJQUFJLENBQUM7b0JBQzFDOzs7dUJBR0c7b0JBQ0ssbUJBQWMsR0FBa0IsSUFBSSxDQUFDO29CQUM3Qzs7O3VCQUdHO29CQUNLLG1CQUFjLEdBQWtCLElBQUksQ0FBQztvQkFDN0M7Ozt1QkFHRztvQkFDSyxzQkFBaUIsR0FBa0IsSUFBSSxDQUFDO29CQUNoRDs7O3VCQUdHO29CQUNLLDRCQUF1QixHQUFrQixJQUFJLENBQUM7Z0JBKzdDMUQsQ0FBQztnQkFsM0NHOzttQkFFRztnQkFDSSxjQUFjO29CQUVqQixxQkFBcUI7b0JBQ3JCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUM5QixD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QUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO29CQUV0RSxpQ0FBaUM7b0JBQ2pDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbEIsQ0FBQztnQkFFRDs7OzttQkFJRztnQkFDSSxPQUFPO29CQUVWLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsOEJBQThCO29CQUM5QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN2RCw4R0FBOEc7b0JBQzlHLElBQUksSUFBSSxJQUFJLFdBQVcsRUFBRSxDQUFDO3dCQUN0Qix3REFBd0Q7d0JBQ3hELGtFQUFrRTt3QkFDbEUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUMxQixDQUFDO3lCQUNJLENBQUM7d0JBQ0YsNkNBQTZDO3dCQUM3QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQzFCLENBQUM7Z0JBQ0wsQ0FBQzthQUVKLENBQUE7WUF2L0NZLGNBQWM7Z0JBRDFCLFFBQVE7ZUFDSSxjQUFjLENBdS9DMUI7WUF2L0NZLHdCQUFjLGlCQXUvQzFCLENBQUE7UUFDTCxDQUFDLEVBcmdEb0IsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBcWdEN0I7SUFBRCxDQUFDLEVBcmdEZ0IsR0FBRyxHQUFILFVBQUcsS0FBSCxVQUFHLFFBcWdEbkI7QUFBRCxDQUFDLEVBcmdEUyxNQUFNLEtBQU4sTUFBTSxRQXFnRGYiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgR29yZGljLkZ1Yy5XZWJDbGllbnQge1xyXG4gICAgbGV0IGdjb250ZW50ID0gRGVjb3JhdG9ycy5nY29udGVudDtcclxuXHJcbiAgICBleHBvcnQgdHlwZSBEdG9UeXBlVXByID0gR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0bztcclxuICAgIGV4cG9ydCB0eXBlIFVzZWRDb21wb25lbnRzVXByID0gR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyQ29tcG9uZW50cy5HTGlzdENvbnRyb2xzRXh0ZW5zaW9uczxHb3JkaWMuRnVjLkludGVyZmFjZS5HUHJpcGFkRHRvPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFpbCBwxZnDrXBhZHVcclxuICAgICAqXHJcbiAgICAgKiBAYXV0aG9yIE1hcnRpbiBCb8SNZWtcclxuICAgICAqIEBzaW5jZSA0ODAuMS4wLjEyXHJcbiAgICAgKi9cclxuICAgIEBnY29udGVudFxyXG4gICAgZXhwb3J0IGNsYXNzIEdEZXRhaWxQcmlwYWR1IGV4dGVuZHMgR0RldGFpbEJ1aWxkZXJDb250ZW50PFVzZWRDb21wb25lbnRzVXByPiBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdyaWQgcMWZZWRrb250YWNlXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlICRncmlkUHJlZGtvbnRhY2U6IEpRdWVyeTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHcmlkIHN0YXZ1IElJU1NQXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeSB8IG51bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZElJU1NQU3Rhdnk6IEpRdWVyeSB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdyaWQgcG9sb8W+ZWsgSUlTU1BcclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5IHwgbnVsbH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlICRncmlkSUlTU1BQb2xvemt5OiBKUXVlcnkgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogR3JpZCBwb2h5YsWvXHJcbiAgICAgICAgLy8gKiBAdHlwZSB7SlF1ZXJ5fVxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wcml2YXRlICRncmlkUG9oeWJ5OiBKUXVlcnk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCDDusSNZXRuw61jaCBwb2h5YsWvXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeSB8IG51bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZFVjdFBvaHlieTogSlF1ZXJ5IHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCByZXplcnZhxI1uw61jaCBwb2h5YsWvXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeSB8IG51bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZFJlelBvaHlieTogSlF1ZXJ5IHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCBwbGF0ZWJcclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5IHwgbnVsbH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlICRncmlkUGxhdGJ5OiBKUXVlcnkgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHcmlkIMO6xI1ldG7DrWNoIHrDoXBpc8WvXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeSB8IG51bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZFVjdFphcGlzeTogSlF1ZXJ5IHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCByZXplcnZhxI1uw61jaCB6w6FwaXPFr1xyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnkgfCBudWxsfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWRSZXpaYXBpc3k6IEpRdWVyeSB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdyaWQgZG9rbGFkxa8gbyB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnkgfCBudWxsfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWREb2tsYWR5T1phdWM6IEpRdWVyeSB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdyaWQgesOhcGlzxa8gZG9rbGFkdSBvIHphw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeSB8IG51bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZFphcGlzeURva2xhZHVPWmF1YzogSlF1ZXJ5IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIHZsYXN0bm9zdGkgeiBDI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBJRCBwxZnDrXBhZHVcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgSXhwVXByOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRFRPIGRldGFpbHUgcMWZw61wYWR1XHJcbiAgICAgICAgICogQHR5cGUge0dvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWREdG99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBEZXRhaWxEdG86IEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQcmlwYWREdG87XHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIERUTyBJSVNTUFxyXG4gICAgICAgIC8vICogQHR5cGUge0dvcmRpYy5GdWMuSW50ZXJmYWNlLkdJaXNzcER0b31cclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBJaXNzcER0bzogR29yZGljLkZ1Yy5JbnRlcmZhY2UuR0lpc3NwRHRvO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGplIHN0w6F0bsOtIHBva2xhZG5hP1xyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSmVJaXNzcDogYm9vbGVhbjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1w6FsbsOtIEnEjE9cclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSWNvOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dcOhbG7DrSBVQ1NcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgVWNzOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dcOhbG7DrSBVVVNcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgVXVzOiBzdHJpbmc7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dcOhbG7DrSByb2tcclxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgUm9rOiBudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGF0YWLDoXpvdsOpIHBhcmFtZXRyeVxyXG4gICAgICAgICAqIEB0eXBlIHt7fX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGRicGFyYW1zOiB7XHJcbiAgICAgICAgICAgIC8vIEZVQyAtIFJlxb5pbSBwcm92b3p1XHJcbiAgICAgICAgICAgIGZ1Y19yZXpfcHJvOiBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuUmV6aW1Qcm92b3p1XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJhZGdlIHBybyBwb8SNZXQgcG9oeWLFr1xyXG4gICAgICAgICAqIEB0eXBlIHtHT2JzZXJ2YWJsZU9iamVjdDxHQmFkZ2VPcHRpb25zPn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEJhZGdlUG9oeWJ5OiBHT2JzZXJ2YWJsZU9iamVjdDxHQmFkZ2VPcHRpb25zPjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCYWRnZSBwcm8gcG/EjWV0IMO6xI1ldG7DrWNoIHBvaHlixa9cclxuICAgICAgICAgKiBAdHlwZSB7R09ic2VydmFibGVPYmplY3Q8R0JhZGdlT3B0aW9ucz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBCYWRnZVVjdFBvaHlieTogR09ic2VydmFibGVPYmplY3Q8R0JhZGdlT3B0aW9ucz47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQmFkZ2UgcHJvIHBvxI1ldCByZXplcnZhxI1uw61jaCBwb2h5YsWvXHJcbiAgICAgICAgICogQHR5cGUge0dPYnNlcnZhYmxlT2JqZWN0PEdCYWRnZU9wdGlvbnM+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgQmFkZ2VSZXpQb2h5Ynk6IEdPYnNlcnZhYmxlT2JqZWN0PEdCYWRnZU9wdGlvbnM+O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJhZGdlIHBybyBwb8SNZXQgcGxhdGViXHJcbiAgICAgICAgICogQHR5cGUge0dPYnNlcnZhYmxlT2JqZWN0PEdCYWRnZU9wdGlvbnM+fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgQmFkZ2VQbGF0Ynk6IEdPYnNlcnZhYmxlT2JqZWN0PEdCYWRnZU9wdGlvbnM+O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZhbGlkw6F0b3J5XHJcbiAgICAgICAgICogQHR5cGUge29iamVjdFtdfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgdmFsaWRhdG9yczogb2JqZWN0W107XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphZGVmaW5vdsOhbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gamVuIG5hc3RhdmVuw60gb2tuYVxyXG4gICAgICAgICAgICB0aGlzLmFrdHVhbGl6YWNlRGV0YWlsdSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2JzbHVoYSB1ZMOhbG9zdGkgYnVpbGRlckluaXRcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0dvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcn0gYnVpbGRlciBkZXRhaWxidWlsZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uRGV0YWlsQnVpbGRlckluaXQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBiYWRnZVxyXG4gICAgICAgICAgICB0aGlzLkJhZGdlUG9oeWJ5ID0gRnVjRGV0YWlsLmNyZWF0ZUJhZGdlKFwicG9jZXRQb2h5YnVCYWRnZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5CYWRnZVVjdFBvaHlieSA9IEZ1Y0RldGFpbC5jcmVhdGVCYWRnZShcInBvY2V0VWN0UG9oeWJ1QmFkZ2VcIik7XHJcbiAgICAgICAgICAgIHRoaXMuQmFkZ2VSZXpQb2h5YnkgPSBGdWNEZXRhaWwuY3JlYXRlQmFkZ2UoXCJwb2NldFJlelBvaHlidUJhZGdlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLkJhZGdlUGxhdGJ5ID0gRnVjRGV0YWlsLmNyZWF0ZUJhZGdlKFwicG9jZXRQbGF0ZWJCYWRnZVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNlIGFrY8OtLCB0YWLFrywga3BpLCBtZW51IGFwb2QuXHJcbiAgICAgICAgICAgIGJ1aWxkZXIud2l0aENvbXBvbmVudDx0aGlzPihcImRldGFpbFwiLCB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogdGV4dHkgZG8gcmVzb3VyY2VcclxuICAgICAgICAgICAgICAgICAgICBhY3RTdG9ybm86IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblN0b3Jub3ZhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5zdG9ybm8oKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RacnVzaXRTdG9ybm86IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblpydXNpdFN0b3Jubyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5zdG9ybm8oKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RVemF2cmVuaTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVXphdnJpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC51emF2cmVuaSgpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFpydXNpdFV6YXZyZW5pOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25acnVzaXRVemF2cmVuaSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC51emF2cmVuaSgpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFByZWRhbmk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblByZWRhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5wcmVkYW5pKCkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0RGV0YWlsVlByaW1hcm5pQWdlbmRlOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25QcmltYXJuaUFnZW5kYSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5kZXRhaWxWUHJpbWFybmlBZ2VuZGUoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3REaWFnbm9zdGlrYTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRGlhZ25vc3Rpa2Eoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZGlhZ25vc3Rpa2EoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RPYmNlcnN0dmVuaVByaXA6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9iY2Vyc3R2aXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQucmVsb2FkRGF0YSgpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFrY2UgcHJvIG1lbnViYXIgcMWZZWRrb250YWPDrVxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFByZWRrb250YWNlVXByYXZpdDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVXByYXZpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LnptZW5hUHJlZGtvbnRhY2koKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHrDoWxvxb5rb3bDqSBha2NlXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hY3REZXRhaWxQb2h5YnU6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7IHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5kZXRhaWxQb2h5YnUoKSk7IH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0RGV0YWlsVWN0UG9oeWJ1OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZGV0YWlsUG9oeWJ1KHRydWUpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdERldGFpbFJlelBvaHlidTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRGV0YWlsKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0LmRldGFpbFBvaHlidShmYWxzZSkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0RGV0YWlsUGxhdGJ5OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZGV0YWlsUGxhdGJ5KCkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0SGlzdG9yaWVJaXNzcDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uSGlzdG9yaWUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQuaGlzdG9yaWVJaXNzcCgpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIMO6xI1ldG7DrSBhIHJlemVydmHEjW7DrSB6w6FwaXN5XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0VWN0b3ZhbmlEb2tsYWRPWmF1Y3RvdmFuaTogRnVjQWN0aW9ucy5hY3Rpb25Eb2tsYWRPWmF1Y3RvdmFuaSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5kb2tsYWRPWmF1Y3RvdmFuaSgpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBybyBLUElcclxuICAgICAgICAgICAgICAgICAgICAvL2FjdFRhYlBvaHlieTogeyBjYXB0aW9uOiBcIlBvaHlieVwiLCBlbmFibGVkOiB0cnVlLCBydW46IGZ1bmN0aW9uICgpIHsgRnVjRGV0YWlsLnN3aXRjaFRvR3JwQW5kVGFiKHRoYXQsIFwiZ3JwUG9oeWJ5XCIsIFwidGFiUG9oeWJ5XCIpOyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hY3RUYWJVY3RQb2h5Ynk6IHsgY2FwdGlvbjogXCLDmsSNZXRuw60gcG9oeWJ5XCIsIGVuYWJsZWQ6IHRydWUsIHJ1bjogZnVuY3Rpb24gKCkgeyBGdWNEZXRhaWwuc3dpdGNoVG9HcnBBbmRUYWIodGhhdCwgXCJncnBQb2h5YnlcIiwgXCJ0YWJVY3RQb2h5YnlcIik7IH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAvL2FjdFRhYlJlelBvaHlieTogeyBjYXB0aW9uOiBcIlJlemVydmHEjW7DrSBwb2h5YnlcIiwgZW5hYmxlZDogdHJ1ZSwgcnVuOiBmdW5jdGlvbiAoKSB7IEZ1Y0RldGFpbC5zd2l0Y2hUb0dycEFuZFRhYih0aGF0LCBcImdycFBvaHlieVwiLCBcInRhYlJlelBvaHlieVwiKTsgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vYWN0VGFiUGxhdGJ5OiB7IGNhcHRpb246IFwiUGxhdGJ5XCIsIGVuYWJsZWQ6IHRydWUsIHJ1bjogZnVuY3Rpb24gKCkgeyBGdWNEZXRhaWwuc3dpdGNoVG9HcnBBbmRUYWIodGhhdCwgXCJncnBQbGF0YnlcIiwgXCJ0YWJQbGF0YnlcIik7IH0gfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRhYkdyb3VwczogW1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlRhYkdyb3Vwcy5BZ2VuZGEoKSxcclxuICAgICAgICAgICAgICAgICAgICB7IGlkOiBcImdycElpc3NwXCIsIGNhcHRpb246IFwianJlczoyNDEwMDMyNVwiLCB2aXNpYmxlOiB0aGF0LkplSWlzc3AgfSwgLy9SQyAyNDEwMDMyNSA6IElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJncnBQb2h5YnlcIiwgY2FwdGlvbjogXCJqcmVzOjI0MTAwNDUzXCIsIGJhZGdlOiB0aGlzLkJhZGdlUG9oeWJ5IH0sIC8vUkMgMjQxMDA0NTMgOiBQb2h5YnlcclxuICAgICAgICAgICAgICAgICAgICB7IGlkOiBcImdycFBsYXRieVwiLCBjYXB0aW9uOiBcImpyZXM6MjQxMDA0NDhcIiwgYmFkZ2U6IHRoaXMuQmFkZ2VQbGF0YnkgfSwgLy9SQyAyNDEwMDQ0OCA6IFBsYXRieVxyXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwiZ3JwVWN0UmV6XCIsIGNhcHRpb246IFwianJlczoyNDEwMDM1MFwiIH0sIC8vUkMgMjQxMDAzNTAgOiDDmsSNZXRuw60gYSByZXplcnZhxI1uw60gesOhcGlzeVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICAvL1tcImpyZXM6MjQxMDAwNDRcIiwgLy9SQyAyNDEwMDA0NCA6IEFnZW5kYVxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0RGV0YWlsVlByaW1hcm5pQWdlbmRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RTdG9ybm9cIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFpydXNpdFN0b3Jub1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0VXphdnJlbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFpydXNpdFV6YXZyZW5pXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RPYmNlcnN0dmVuaVByaXBcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFByZWRhbmlcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdERpYWdub3N0aWthXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgRnVjRGV0YWlsLmNyZWF0ZU1lbnVTaGFyZSh0aGF0LCB0aGF0Lkl4cFVwciwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRydWUpXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzQmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5EZXRhaWwuU3RhdHVzQmFyLmNyZWF0ZUl0ZW0oeyBpZDogXCJzdGF0dXNCYXJTVXByXCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5EZXRhaWwuU3RhdHVzQmFyLmNyZWF0ZUl0ZW0oeyBpZDogXCJzdGF0dXNCYXJTWmF1XCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5EZXRhaWwuU3RhdHVzQmFyLmNyZWF0ZUl0ZW0oeyBpZDogXCJzdGF0dXNCYXJTU3RvXCIgfSlcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAvL2twaXM6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIC8va3BpUG9jZXRQb2h5YnU6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIG5hbWU6IFwia3BpUG9jZXRQb2h5YnVcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIHZhbHVlOiB0aGF0LkRldGFpbER0by5wb2NldF9wb2h5YnUgPz8gMCxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIHVuaXQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICBwcmltYXJ5VGV4dDogXCJQb8SNZXQgcG9oeWLFr1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gICAgc2Vjb25kYXJ5VGV4dDogXCJwb2h5YsWvXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIGZvcm1hdHRlcjogXCJOXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICBhY3Rpb25PblRpdGxlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gICAgaXRlbVRlbXBsYXRlOiBHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpVmFsdWVUd29Sb3dzVGV4dFRlbXBsYXRlKCkuaXRlbVRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gICAgYWN0aW9uOiBcImFjdFRhYlBvaHlieVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gICAgc2hvd1RleHRJY29uOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICBpc0N1cnJlbmN5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8va3BpUG9jZXRVY3RQb2h5YnU6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIG5hbWU6IFwia3BpUG9jZXRVY3RQb2h5YnVcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIHZhbHVlOiB0aGF0LkRldGFpbER0by5wb2NldF91Y3RfcG9oeWJ1ID8/IDAsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICB1bml0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gICAgcHJpbWFyeVRleHQ6IFwiUG/EjWV0IMO6xI1ldG7DrWNoIHBvaHlixa9cIixcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIHNlY29uZGFyeVRleHQ6IFwicG9oeWLFr1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gICAgbWVhbmluZzogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICBmb3JtYXR0ZXI6IFwiTlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gICAgYWN0aW9uT25UaXRsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIGl0ZW1UZW1wbGF0ZTogR29yZGljLlByZWZhYnMuUGFuZWxzLmtwaVZhbHVlVHdvUm93c1RleHRUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIGFjdGlvbjogXCJhY3RUYWJVY3RQb2h5YnlcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIHNob3dUZXh0SWNvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICB2aXNpYmxlOiAodGhhdC5EZXRhaWxEdG8ucG9jZXRfdWN0X3BvaHlidSA/PyAwKSA+IDAsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICBpc0N1cnJlbmN5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8va3BpUG9jZXRSZXpQb2h5YnU6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIG5hbWU6IFwia3BpUG9jZXRSZXpQb2h5YnVcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIHZhbHVlOiB0aGF0LkRldGFpbER0by5wb2NldF9yZXpfcG9oeWJ1ID8/IDAsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICB1bml0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gICAgcHJpbWFyeVRleHQ6IFwiUG/EjWV0IHJlemVydmHEjW7DrWNoIHBvaHlixa9cIixcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIHNlY29uZGFyeVRleHQ6IFwicG9oeWLFr1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gICAgbWVhbmluZzogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICBmb3JtYXR0ZXI6IFwiTlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gICAgYWN0aW9uT25UaXRsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIGl0ZW1UZW1wbGF0ZTogR29yZGljLlByZWZhYnMuUGFuZWxzLmtwaVZhbHVlVHdvUm93c1RleHRUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIGFjdGlvbjogXCJhY3RUYWJSZXpQb2h5YnlcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIHNob3dUZXh0SWNvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICB2aXNpYmxlOiAodGhhdC5EZXRhaWxEdG8ucG9jZXRfcmV6X3BvaHlidSA/PyAwKSA+IDAsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICBpc0N1cnJlbmN5OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vfSxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8va3BpUG9jZXRQbGF0ZWI6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIG5hbWU6IFwia3BpUG9jZXRQbGF0ZWJcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIHZhbHVlOiB0aGF0LkRldGFpbER0by5wb2NldF9wbGF0ZWIgPz8gMCxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIHVuaXQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICBwcmltYXJ5VGV4dDogXCJQb8SNZXQgcGxhdGViXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICBzZWNvbmRhcnlUZXh0OiBcInBsYXRlYlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gICAgbWVhbmluZzogXCJpbmZvXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICBmb3JtYXR0ZXI6IFwiTlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy8gICAgYWN0aW9uT25UaXRsZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIGl0ZW1UZW1wbGF0ZTogR29yZGljLlByZWZhYnMuUGFuZWxzLmtwaVZhbHVlVHdvUm93c1RleHRUZW1wbGF0ZSgpLml0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIGFjdGlvbjogXCJhY3RUYWJQbGF0YnlcIixcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIHNob3dUZXh0SWNvbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyAgICB2aXNpYmxlOiAodGhhdC5EZXRhaWxEdG8ucG9jZXRfcGxhdGViID8/IDApID4gMCxcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vICAgIGlzQ3VycmVuY3k6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgLy99XHJcbiAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICB0YWJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiUHJpcGFkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHrDoWtsYWRuw60gw7pkYWplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUMWZw61wYWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuUHJlZmFicy5UYWJHcm91cHMuQWdlbmRhKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvcGxuxJtuw60gcHJ2a8WvIGRvIHRhYnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGFiKS5nZm9ybShcImNyZWF0ZUZyb21cIiwgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtVWNldG5pUHJpcGFkXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlByaW3DoXJuw60gYWdlbmRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkFnZW5kYVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmN0YWcoKSwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJ0eXBfYWdcIiwgbW9kZWw6IFwidHlwX2FnPXR5cF9hZzt6a3JfYWc9dHlwX2FnX3prclwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIktuaWhhXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvYWRlbigpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcIml4cF9kZW5cIiwgbW9kZWw6IFwiaXhwX2Rlbj1peHBfZGVuO2l4cF9kZW5fdHh0PWl4cF9kZW5fdHh0XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRSb3coXCJ7MH0sIHsxfVwiLmZvcm1hdChHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLm5rcyA/PyBcIk5LU1wiLCBHb3JkaWMuQ29uc3RzLkRiU2hvcnRjdXRzLnV1cyA/PyBcIlVVU1wiKSkuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy02XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwibmtzXCIgfSkuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIFwidy02XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwidXVzXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcImpyZXM6MjQxMDAzMjRcIikgLy9SQyAyNDEwMDMyNCA6IEV4dGVybsOtIHN1Ympla3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUHJlZmFiKEZ1Y0RldGFpbC5wcmVmYWJFc3VQYW0odGhhdC5EZXRhaWxEdG8uaXhzX2VzdSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkV2aWRlbsSNbsOtIMSNw61zbG8gc3ViamVrdHVcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiYWNfZXN1XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIkJhbmtvdm7DrSDDumRhamVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiQmFua292bsOtIMO6xI1ldCB2bGFzdG7DrVwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJidV92bF90eHRcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJCYW5rb3Zuw60gw7rEjWV0IGNpesOtXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImJ1X2NpX3R4dFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFByZWZhYihGdWNEZXRhaWwucHJlZmFiVnNLc1NzKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlpwxa9zb2Igw7pocmFkeVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb2NpenAoKSwgeyBkaXNhYmxlZDogdHJ1ZSwgZHJvcGRvd246IHRydWUsIG5hbWU6IFwienBcIiwgbW9kZWw6IFwienA9enA7enBfemtyPXpwX3prcjt6cF90eHQ9enBfdHh0XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIsSMw6FzdGthXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIsSMw6FzdGthIGNlbGtlbSB2IG3Em27Em1wiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LThcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiY19tZW5hXCIgfSkuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIFwidy00XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29jbWVuKCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwibWVuYVwiLCBtb2RlbDogXCJtZW5hPW1lbmE7bWVuYV96a3I9bWVuYV9zaXNfYWFhXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwixIzDoXN0a2EgY2Vsa2VtIHYgQ1pLXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJjX2NlbGtcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiRGF0YVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSB2eXN0YXZlbsOtXCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJkYXRfdnlzdFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIHpkYW4uIHBsbsSbbsOtXCIpLmFkZEZpZWxkKFwiZ2RhdGVib3hcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJkYXRfemRhblwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkRhdHVtIHNwbGF0bm9zdGlcIikuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImRhdF9zcGxhdFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oXCJQb3Bpc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG5hc3Rhdm92YXQgdsW+ZHkgdsO9xaFrdSA0ICh0byBhc2kgb2Rwb3bDrWTDoSB2ZWRsZWrFocOtIHNla2NpKSBuZWJvIHBvdcW+w610YXQgYXV0b1NpemU/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvcGlzXCIpLmFkZEZpZWxkKFwiZ3N0cmluZ2JveFwiLCBFa28uRGV0YWlsLkZpZWxkLmdldENvdW50ZXJPcHRpb25zKEZ1Yy5JbnRlcmZhY2UuR1ByaXBhZER0b1R5cGVMZW5ndGhzLnBvcGlzLCBmYWxzZSwgZmFsc2UsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwicG9waXNcIiwgcm93czogLyo0Ki8xLCAvKndyYXA6IHRydWUqL2F1dG9TaXplOiB0cnVlIH0pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJQb3puw6Fta2FcIikuYWRkRmllbGQoXCJnc3RyaW5nYm94XCIsIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwicG96bmFta2FcIiB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYlN0YXZ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0YXZ5IGEgamVqaWNoIMSNw6FzdGt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU3RhdnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiBHb3JkaWMuUHJlZmFicy5UYWJHcm91cHMuQWdlbmRhKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvcGxuxJtuw60gcHJ2a8WvIGRvIHRhYnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQubmV3RGl2KCkuYXBwZW5kVG8odGFiKS5nZm9ybShcImNyZWF0ZUZyb21cIiwgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtU3RhdnlcIiwgbGF5b3V0RGVzY3JpcHRvcjogXCJMMk0yUzFcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiU3RhdnlcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiU3RhdiBwxZnDrXBhZHVcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5mdWNjc3VwKCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwic191cHJcIiwgbW9kZWw6IFwic191cHI9c191cHI7c191cHJfdHh0PXNfdXByX3R4dFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgcMWZw61wcmF2eSBrIMO6aHJhZMSbXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZnVjY3NwcigpLCB7IGRpc2FibGVkOiB0cnVlLCBkcm9wZG93bjogdHJ1ZSwgbmFtZTogXCJzX3ByaXBcIiwgbW9kZWw6IFwic19wcmlwPXNfcHJpcDtzX3ByaXBfdHh0PXNfcHJpcF90eHRcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTdGF2IG9kZXNsw6Fuw60gayDDumhyYWTEm1wiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmZ1Y2Nzb2QoKSwgeyBkaXNhYmxlZDogdHJ1ZSwgZHJvcGRvd246IHRydWUsIG5hbWU6IFwic19vZGVcIiwgbW9kZWw6IFwic19vZGU9c19vZGU7c19vZGVfdHh0PXNfb2RlX3R4dFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlN0YXYgcMOhcm92w6Fuw61cIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5mdWNjc3BhKCksIHsgZGlzYWJsZWQ6IHRydWUsIGRyb3Bkb3duOiB0cnVlLCBuYW1lOiBcInNfcGFyXCIsIG1vZGVsOiBcInNfcGFyPXNfcGFyO3NfcGFyX3R4dD1zX3Bhcl90eHRcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTdGF2IHphw7rEjXRvdsOhbsOtXCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZnVjY3N6YSgpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcInNfemF1XCIsIG1vZGVsOiBcInNfemF1PXNfemF1O3NfemF1X3R4dD1zX3phdV90eHRcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJTdGF2IHN0b3JuYVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb2NzdG8oKSwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJzX3N0b1wiLCBtb2RlbDogXCJzX3N0bz1zX3N0bztzX3N0b190eHQ9c19zdG9fdHh0XCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIsSMw6FzdGt5XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIsSMw6FzdGthIHDFmcOtcGFkdVwiKS5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHsgZGlzYWJsZWQ6IHRydWUsIG5hbWU6IFwiY191cHJcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCLEjMOhc3RrYSBwxZnDrXByYXZlbsOhIGsgw7pocmFkxJtcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImNfcHJpcFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIsSMw6FzdGthIG9kZXNsYW7DoSBrIMO6aHJhZMSbXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJjX29kZVwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIsSMw6FzdGthIHNww6Fyb3ZhbsOhXCIpLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBHb3JkaWMuUHJlZmFicy5OdW1iZXIuY3VycmVuY3koKSwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJjX3BhclwiIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiUHJlZGtvbnRhY2U6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZZWRrb250YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczoyNDEwMDM3NlwiLCAvL1JDIDI0MTAwMzc2IDogUMWZZWRrb250YWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogR29yZGljLlByZWZhYnMuVGFiR3JvdXBzLkFnZW5kYSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbXCJhY3RQcmVka29udGFjZVVwcmF2aXQqXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gZ3JpZHUgcMWZZWRrb250YWPDrSBkbyB0YWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkUHJlZGtvbnRhY2UgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvZMSbbGF0IERUTyBnZ3JpZHUgKGHFviBwbyB2eWphc27Em27DrSB0b2hvIHNhbcOpaG8gdiBHcmlkRm9ybWF0UHJlZGtvbnRhY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdVZVRlTmtzVXVzRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFByZWRrb250YWNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGdyaWQgZG9kxJtsYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsICAgICAvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBidWRlIG7Em2pha8OhIGRlZmF1bHRuw60gYWtjZT8gamVzdGxpIGFubywgdGFrIGJ1xI8gb3ByYXZhIHBvbG/Fvmt5IG5lYm8gbsSbamFrw70gbm92w70gZGV0YWlsIHBvbG/Fvmt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlZmF1bHRBY3Rpb246IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcInZzXCIsIFwiY1wiLCBcInR5cF9hZ1wiLCBcImFjXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBGdWNHcmlkLlphcGlzLmNyZWF0ZUdyaWRGb3JtYXRQcmVka29udGFjZSh0aGF0KSAvL25ldyBHb3JkaWMuRGF0YS5HcmlkRm9ybWF0PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdVZVRlRHRvPigpLmFkZFNvcnRlZEVrb0NmdVNldCh0aGF0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0YWJJSVNTUDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0TGF6eTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6w6Fsb8W+a2EgYnkgbcSbbGEgYsO9dCBwxZnDrXN0dXBuw6EgamVuIHYgcmXFvmltdSBJSVNTUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczoyNDEwMDMyNVwiLCAvL1JDIDI0MTAwMzI1IDogSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7IGlkOiBcImdycElpc3NwXCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdGhhdC5KZUlpc3NwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9tZW51QmFyOiBbXCJhY3RIaXN0b3JpZUlpc3NwXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jdXN0b21Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyBuYcSNdGVuw60gZGF0IElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LmxvYWRJaXNzcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRQYXJhbXM6IEdDb250ZW50LmNyZWF0ZUluaXRpYWxpemVyKFtcIkdvcmRpYy5JaXNzcC5XZWJDb250cm9scy5HU3RydWt0dXJhSUlTU1BcIiwgeyB1aWQ6IFwiR1N0cnVrdHVyYUlJU1NQI1wiIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZlclBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpeHNfaHByOiB0aGlzLkRldGFpbER0by5peHBfdXByXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vIHDFmWlkw6Fuw60gZ3JpZMWvIElJU1NQIGRvIHRhYnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0YWIpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1JaXNzcFwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwxTTFTMVwiIH0pLmFkZFNlY3Rpb24oXCJSZXplcnZhxI1uw60gcMWZw61wYWRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LiRncmlkSUlTU1BTdGF2eSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAuYXBwZW5kVG8odGFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdJaXNzcER0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIG5hbWU6IFwiZ3JpZElJU1NQU3RhdnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyBUT0RPOiBncmlkIGRvZMSbbGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsICAgICAvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIFRPRE86IGJ1ZGUgbsSbamFrw6EgZGVmYXVsdG7DrSBha2NlPyBqZXN0bGkgYW5vLCB0YWsgYnXEjyBvcHJhdmEgcG9sb8W+a3kgbmVibyBuxJtqYWvDvSBub3bDvSBkZXRhaWwgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyBkZWZhdWx0QWN0aW9uOiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcInZzXCIsIFwiY1wiLCBcInR5cF9hZ1wiLCBcImFjXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbHVtbnM6IEZ1Y0dyaWQuSWlzc3AuY3JlYXRlR3JpZEZvcm1hdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgJC5uZXdEaXYoKS5hcHBlbmRUbyh0YWIpLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBuZXcgR29yZGljLkZvcm1zLkZvcm0oXCJMMU0xUzFcIikuYWRkU2VjdGlvbihcIlN0cnVrdHVyYSB2IElJU1NQXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgdGhhdC4kZ3JpZElJU1NQUG9sb3preSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAuYXBwZW5kVG8odGFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2xvemthSWlzc3BEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBuYW1lOiBcImdyaWRJSVNTUFBvbG96a3lcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyBUT0RPOiBncmlkIGRvZMSbbGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsICAgICAvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vIFRPRE86IGJ1ZGUgbsSbamFrw6EgZGVmYXVsdG7DrSBha2NlPyBqZXN0bGkgYW5vLCB0YWsgYnXEjyBvcHJhdmEgcG9sb8W+a3kgbmVibyBuxJtqYWvDvSBub3bDvSBkZXRhaWwgcG9sb8W+a3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyBkZWZhdWx0QWN0aW9uOiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcInZzXCIsIFwiY1wiLCBcInR5cF9hZ1wiLCBcImFjXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIGNvbHVtbnM6IEZ1Y0dyaWQuSWlzc3AuY3JlYXRlR3JpZEZvcm1hdFBvbG96a3koKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgfSk7Ly8uZ2F1dG9maXQoKTsgLy8gVE9ETzogdG9obGUgamUgdGFkeSB6YXTDrW0gcG9rdXNuxJssIHByb3Rvxb5lIHNlIG1pIG5lZGHFmcOtIG5hc3Rhdml0IHbDvcWha3Ugc2V6bmFtdSBwb2xvxb5layBwb2RsZSBha3R1w6FsbsOtaG8gcG/EjXR1IMWZw6Fka8WvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy90YWJQb2h5Ynk6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyDDmsSNZXRuw60gYSByZXplcnZhxI1uw60gcG9oeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgaW5pdExhenk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gVE9ETzogbmVyb3pkxJtsaXQgw7rEjWV0bsOtIGEgcmV6ZXJ2YcSNbsOtIHp2bMOhxaHFpT8gbmVibyB0byB1ZMSbbGF0IGpha28gdSBwb2h5YsWvLCB0aiBwxZllcMOtbmF0IHRvXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRpdGxlOiBcIlBvaHlieVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBncm91cDogeyBpZDogXCJncnBQb2h5YnlcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBvcGVuZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBsb2NrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBtZW51QmFyOiBbXCJhY3REZXRhaWxQb2h5YnUqXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBjdXN0b21Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyBuYcSNdGVuw60gcG9oeWLFr1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgdGhhdC5sb2FkUG9oeWJ5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gcMWZaWTDoW7DrSBncmlkxa8gcG9oeWLFryBkbyB0YWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHRoYXQuJGdyaWRQb2h5YnkgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLmFwcGVuZFRvKHRhYilcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9oeWJEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAvLyBUT0RPOiBncmlkIGRvZMSbbGF0XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsICAgICAvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3REZXRhaWxQb2h5YnUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgLy9zZWFyY2hDb2x1bW5zOiBbXCJ2c1wiLCBcImNcIiwgXCJ0eXBfYWdcIiwgXCJhY1wiXSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBjb2x1bW5zOiBGdWNHcmlkLlBvaHliLmNyZWF0ZUdyaWRGb3JtYXQodGhhdCwgR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFNlelBvaC5Qb2h5YnlQcmlwYWR1KSxcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcIml4cF91cHIscmFkZWtfdXBvLHR5cF91cG9fdHh0LHNfdXBvX3R4dCxzX3N0b190eHQsa3RnX3Vwb190eHQsem5hbV90eHQsY191cG8scG9waXNfdXBvLHN1Ympla3QubmF6ZXYsZGF0X3VwbyxkYXRfemF1YyxvYmRfZGFuLHN1YnJhZGFfZHV6LHByaXpfZGRfdHh0XCJcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYlVjdFBvaHlieToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDDusSNZXRuw60gcG9oeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRMYXp5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MjQxMDAxODVcIiwgLy9SQyAyNDEwMDE4NSA6IMOaxI1ldG7DrSBwb2h5YnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7IGlkOiBcImdycFBvaHlieVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6ICh0aGF0LkRldGFpbER0by5wb2NldF91Y3RfcG9oeWJ1ID8/IDApID4gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbXCJhY3REZXRhaWxVY3RQb2h5YnUqXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFkZ2U6IHsgcGFyYW1zOiB0aGlzLkJhZGdlVWN0UG9oeWJ5IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIHBvaHlixa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRQb2h5YnkodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gZ3JpZMWvIHBvaHlixa8gZG8gdGFidVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZFVjdFBvaHlieSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRVY3RQb2h5YnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZ3JpZCBkb2TEm2xhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIiwgICAgIC8vIGZpdCAoZGVmYXVsdG5lIGJ5IG1lbG8gYnl0IHRvdG8pLCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3REZXRhaWxVY3RQb2h5YnUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1widnNcIiwgXCJjXCIsIFwidHlwX2FnXCIsIFwiYWNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG5lY2hhdCB0ZW50byBuZWJvIHBvdcW+w610IFR5cFNlelBvaC5VY2V0bmlQb2h5YnkgLSBwb2TDrXZhdCBzZSwgxI3DrW0gc2UgbGnFocOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IEZ1Y0dyaWQuUG9oeWIuY3JlYXRlR3JpZEZvcm1hdCh0aGF0LCBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwU2V6UG9oLlBvaHlieVByaXBhZHUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0UHJvZmlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTGlzdDogXCJpeHBfdXByLHJhZGVrX3Vwbyx0eXBfdXBvX3R4dCxzX3Vwb190eHQsc19zdG9fdHh0LGt0Z191cG9fdHh0LHpuYW1fdHh0LGNfdXBvLHBvcGlzX3VwbyxzdWJqZWt0Lm5hemV2LGRhdF91cG8sZGF0X3phdWMsb2JkX2RhbixzdWJyYWRhX2R1eixwcml6X2RkX3R4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6ZXJzT25UYWI6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYlJlelBvaHlieToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZXplcnZhxI1uw60gcG9oeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRMYXp5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MjQxMDAxODZcIiwgLy9SQyAyNDEwMDE4NiA6IFJlemVydmHEjW7DrSBwb2h5YnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7IGlkOiBcImdycFBvaHlieVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6ICh0aGF0LkRldGFpbER0by5wb2NldF9yZXpfcG9oeWJ1ID8/IDApID4gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbXCJhY3REZXRhaWxSZXpQb2h5YnUqXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFkZ2U6IHsgcGFyYW1zOiB0aGlzLkJhZGdlUmV6UG9oeWJ5IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIHBvaHlixa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRQb2h5YnkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZlpZMOhbsOtIGdyaWTFryBwb2h5YsWvIGRvIHRhYnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRSZXpQb2h5YnkgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9oeWJEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUmV6UG9oeWJ5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGdyaWQgZG9kxJtsYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsICAgICAvLyBmaXQgKGRlZmF1bHRuZSBieSBtZWxvIGJ5dCB0b3RvKSwgZnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0QWN0aW9uOiB0aGF0LmFjdGlvbnMuYWN0RGV0YWlsUmV6UG9oeWJ1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcInZzXCIsIFwiY1wiLCBcInR5cF9hZ1wiLCBcImFjXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBuZWNoYXQgdGVudG8gbmVibyBwb3XFvsOtdCBUeXBTZXpQb2guUmV6ZXJ2YWNuaVBvaHlieSAtIHBvZMOtdmF0IHNlLCDEjcOtbSBzZSBsacWhw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogRnVjR3JpZC5Qb2h5Yi5jcmVhdGVHcmlkRm9ybWF0KHRoYXQsIEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBTZXpQb2guUG9oeWJ5UHJpcGFkdSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcIml4cF91cHIscmFkZWtfdXBvLHR5cF91cG9fdHh0LHNfdXBvX3R4dCxzX3N0b190eHQsa3RnX3Vwb190eHQsem5hbV90eHQsY191cG8scG9waXNfdXBvLHN1Ympla3QubmF6ZXYsZGF0X3VwbyxkYXRfemF1YyxvYmRfZGFuLHN1YnJhZGFfZHV6LHByaXpfZGRfdHh0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplcnNPblRhYjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiUGxhdGJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBsYXRieVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0TGF6eTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjI0MTAwNDQ4XCIsIC8vUkMgMjQxMDA0NDggOiBQbGF0YnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7IGlkOiBcImdycFBsYXRieVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6ICh0aGF0LkRldGFpbER0by5wb2NldF9wbGF0ZWIgPz8gMCkgPiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcImFjdERldGFpbFBsYXRieSpcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWRnZTogeyBwYXJhbXM6IHRoaXMuQmFkZ2VQbGF0YnkgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gcGxhdGViXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkUGxhdGJ5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gZ3JpZMWvIHBsYXRlYiBkbyB0YWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkUGxhdGJ5ID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoXCJoZWlnaHRcIiwgXCIxMDAlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BsYXRiYUR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRQbGF0YnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZ3JpZCBkb2TEm2xhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIiwgICAgIC8vIGZpdCAoZGVmYXVsdG5lIGJ5IG1lbG8gYnl0IHRvdG8pLCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3REZXRhaWxQbGF0YnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1widnNcIiwgXCJjXCIsIFwidHlwX2FnXCIsIFwiYWNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IEZ1Y0dyaWQuUGxhdGJhLmNyZWF0ZUdyaWRGb3JtYXQodGhhdCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcIml4cCx2cyxzdWJqZWt0Lm5hemV2LGMsYnVfdmxfdHh0LGJ1X2NpX3R4dCx2cyxkYXRfc3BsLGRhdF96YXAsc191aHJwX3R4dCxwcml6X25lcGFyX3R4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6ZXJzT25UYWI6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYlVjdEluZm86IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW5mb3JtYWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7IGlkOiBcImdycFVjdFJlelwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZsYXNoIHMgaW5mb3JtYWPDrSBvIGppbsOpbSByb2t1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBGdWNEZXRhaWwuZmxhc2hSb2tDZnUodGFiLCB0aGF0LlJvaywgXCJpZFJva1VjdE1lc3NhZ2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYlVjdFphcGlzeToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdExhenk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczoyNDEwMDQ0OVwiLCAvL1JDIDI0MTAwNDQ5IDogw5rEjWV0bsOtIHrDoXBpc3kgcG9oeWLFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiZ3JwVWN0UmV6XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92aXNpYmxlOiB0aGF0LkRldGFpbER0by5KZVphdWN0b3ZhbnkhIHx8ICh0aGF0LkRldGFpbER0by5KZU5lemF1Y3RvdmFueSEgJiYgKHRoYXQuRGV0YWlsRHRvLnR5cF91cG8gPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVcG8uVWNldG5pUG9sb2F1dG9tYXRpY2t5IHx8IHRoYXQuRGV0YWlsRHRvLnR5cF91cG8gPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVcG8uVWNldG5pUnVjbmkpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbWVudUJhcjogW1wiYWN0VWN0b3ZhbmlUaXNrUG9oeWJ1KlwiLCBcImFjdFVjdG92YW5pVGlza0Rva2xhZHUqXCIsIFwiYWN0VWN0b3ZhbmlEb2tsYWRPWmF1Y3RvdmFuaSpcIiwgXCJhY3RVY3RvdmFuaUhpc3RvcmllVWN0b3ZhbmkqXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb2TEm2xhdCB6b2JyYXplbsOtIGhpc3RvcmllIMO6xI10b3bDoW7DrT8gYnXEjyBwxZllcyBzZXpuYW0gKG9iZWNuxJsgbcWvxb5lIGLDvXQgcG9oeWIgdmUgdsOtY2UgaGlzdG9yacOtIMO6xI10b3bDoW7DrSkgbmVibyBkb2hsZWRhdCB0ZW4gbmVqbm92xJtqxaHDrSwga2RlIGplIHBvaHliIHphw7rEjXRvdsOhblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG5lxZllxaFpdCB1bG/FvmVuw70gdHlwIHpvYnJhemVuw60/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkVWN0WmFwaXN5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdyaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRVY3RaYXBpc3kgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1phcGlzRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFVjdFphcGlzeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogdXByYXZpdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWFyY2hDb2x1bW5zOiBbXCJhY19hZ1wiLCBcImFjXCIsIFwiaWNvX2VzdVwiLCBcInJjX2VzdVwiLCBcIm5hemV2X2VzdVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogRnVjR3JpZC5aYXBpcy5jcmVhdGVHcmlkRm9ybWF0Tih0aGF0LCB7IGRyZDogdHJ1ZSwgZGF0dW06IHRydWUsIHBvaHliOiB0cnVlLCBkcGg6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nYXV0b2ZpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6ZXJzT25UYWI6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYlJlelphcGlzeToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZXplcnZhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdExhenk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczoyNDEwMDQ1MVwiLCAvL1JDIDI0MTAwNDUxIDogUmV6ZXJ2YcSNbsOtIHrDoXBpc3kgcG9oeWLFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiZ3JwVWN0UmV6XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92aXNpYmxlOiAodGhhdC5EZXRhaWxEdG8uSmVVY2V0bmkhIHx8IHRoYXQuRGV0YWlsRHRvLkplUmV6ZXJ2YWNuaSEpICYmIHRoYXQuRGV0YWlsRHRvLkplWmF1Y3RvdmFueSEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIHJlemVydmFjw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRSZXpaYXBpc3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogdWTEm2xhdCBwxZllcMOtbmHEjSBuYSB6w6FwaXN5IHogcmV6ZXJ2YcSNbsOtaG8gcG9oeWJ1IGEgeiDDusSNZXRuw61obyBwb2h5YnU/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdyaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRSZXpaYXBpc3kgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1phcGlzRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFJlelphcGlzeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogdXByYXZpdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWFyY2hDb2x1bW5zOiBbXCJhY19hZ1wiLCBcImFjXCIsIFwiaWNvX2VzdVwiLCBcInJjX2VzdVwiLCBcIm5hemV2X2VzdVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogRnVjR3JpZC5aYXBpcy5jcmVhdGVHcmlkRm9ybWF0Tih0aGF0LCB7IGRyZDogdHJ1ZSwgZGF0dW06IHRydWUsIHBvaHliOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2F1dG9maXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNpemVyc09uVGFiOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0YWJEb2tsYWR5T1phdWM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRMYXp5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MjQxMDA0NTJcIiwgLy9SQyAyNDEwMDQ1MiA6IERva2xhZHkgbyB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiZ3JwVWN0UmV6XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy92aXNpYmxlOiB0aGF0LkRldGFpbER0by5KZVVjZXRuaSEgJiYgdGhhdC5EZXRhaWxEdG8uSmVaYXVjdG92YW55ISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcImFjdFVjdG92YW5pRG9rbGFkT1phdWN0b3ZhbmkqXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb2TEm2xhdCB6b2JyYXplbsOtIGhpc3RvcmllIMO6xI10b3bDoW7DrT8gYnXEjyBwxZllcyBzZXpuYW0gKG9iZWNuxJsgbcWvxb5lIGLDvXQgcG9oeWIgdmUgdsOtY2UgaGlzdG9yacOtIMO6xI10b3bDoW7DrSkgbmVibyBkb2hsZWRhdCB0ZW4gbmVqbm92xJtqxaHDrSwga2RlIGplIHBvaHliIHphw7rEjXRvdsOhblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG5lxZllxaFpdCB1bG/FvmVuw70gdHlwIHpvYnJhemVuw60/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkRG9rbGFkeU9aYXVjdG92YW5pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhYnVsa3lcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFwiTDFNMVMxXCIpLmFkZFNlY3Rpb24oLypcIkRva2xhZHlcIiovLypcIkRva2xhZCBvIHphw7rEjXRvdsOhbsOtXCIqLykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZERva2xhZHlPWmF1YyA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRnVjLkludGVyZmFjZS5HRG9rbGFkRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZERva2xhZHlPWmF1Y1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogdXByYXZpdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWFyY2hDb2x1bW5zOiBbXCJhY19hZ1wiLCBcImFjXCIsIFwiaWNvX2VzdVwiLCBcInJjX2VzdVwiLCBcIm5hemV2X2VzdVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogRnVjR3JpZC5aYXBpcy5jcmVhdGVHcmlkRm9ybWF0RG9rbGFkeShmYWxzZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSB6w6FwaXPFryBha3R1w6FsbsOtaG8gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5jZWxsSW5mbykgdGhhdC5sb2FkWmFwaXN5RG9rbGFkdSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2F1dG9maXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNpemVyc09uVGFiOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gesOhcGlzeSBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcIkwxTTFTMVwiKS5hZGRTZWN0aW9uKFwiWsOhcGlzeSBkb2tsYWR1XCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRaYXBpc3lEb2tsYWR1T1phdWMgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1phcGlzRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZFphcGlzeURva2xhZHVPWmF1Y1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogdXByYXZpdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9zZWFyY2hDb2x1bW5zOiBbXCJhY19hZ1wiLCBcImFjXCIsIFwiaWNvX2VzdVwiLCBcInJjX2VzdVwiLCBcIm5hemV2X2VzdVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogRnVjR3JpZC5aYXBpcy5jcmVhdGVHcmlkRm9ybWF0KHRoYXQsIGZhbHNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplcnNPblRhYjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRhbMWhw60gcG9oeWJ5IHogZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZMOhdCBzZW0gYWtjaSBuYSBkZXRhaWwgcG9oeWJ1P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8kLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAuYXBwZW5kVG8odGFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBuZXcgR29yZGljLkZvcm1zLkZvcm0oXCJMMU0xUzFcIikuYWRkU2VjdGlvbihcIkRhbMWhw60gcG9oeWJ5IGRva2xhZHVcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGF0LiRncmlkVWN0b3ZhbmlEYWxzaVBvaHlieSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvPih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gVE9ETzogdXByYXZpdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcImFjX2FnXCIsIFwiYWNcIiwgXCJpY29fZXN1XCIsIFwicmNfZXN1XCIsIFwibmF6ZXZfZXN1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIGNvbHVtbnM6IEZ1Y0dyaWQuUG9oeWIuY3JlYXRlR3JpZEZvcm1hdCh0aGF0LCBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwU2V6UG9oLlVjZXRuaVBvaHlieSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy9jZWxsQWN0aXZhdGU6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gICAgLy8gbmHEjXRlbsOtIHrDoXBpc8WvIGFrdHXDoWxuw61obyBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLy8gICAgaWYgKG9iai5jZWxsSW5mbykgdGhhdC5uYWN0ZW5pU2V6bmFtdVphcGlzdSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5hc3RhdmVuw60ga3BpcGFuZWx1XHJcbiAgICAgICAgICAgICQuZXh0ZW5kKGJ1aWxkZXIua3BpUGFuZWxPcHRpb25zLCB7IHNvcnRhYmxlOiB0cnVlIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2JzbHVoYSB1ZMOhbG9zdGkgYnVpbGRlckJ1aWxkXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGJ1aWxkZXIgZGV0YWlsYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkRldGFpbEJ1aWxkZXJCdWlsZChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG5hcG9qZW7DrSBzdGFuZGFyZG7DrSBFS08gaGxhdmnEjWt5XHJcbiAgICAgICAgICAgIC8vIMO6cHJhdmEgZHJ1aMOpIGEgdMWZZXTDrSBzZWtjZSAodHlwIGEga2F0ZWdvcmllIGtuaWh5LCBrb21wZXRlbnRhIGEgcmVhbGl6w6F0b3JhKVxyXG4gICAgICAgICAgICBjb25zdCBmb3JtU2V0dXAgPSB7fTtcclxuICAgICAgICAgICAgY29uc3QgaGVhZGVyRm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybUhlYWRlclwiIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbigpXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiS2F0ZWdvcmllIGRva2xhZHVcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5naW5ja2F0KCksIHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImt0Z190eXBcIixcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJrdGdfdHlwPWt0Z190eXA7a3RnX3R5cF90eHQ9a3RnX3R5cF90eHRcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKClcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJUeXAgcMWZw61wYWR1XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuZnVjc3R1cCgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0eXBfdXByXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IFwidHlwX3Vwcj10eXBfdXByO3R5cF91cHJfdHh0PW5hemV2XCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwiS2F0ZWdvcmllIHDFmcOtcGFkdVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmZ1Y2N1cHIoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwia3RnX3VwclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcImt0Z191cHI9a3RnX3VwcjtrdGdfdXByX3R4dD1rdGdfdXByX3R4dFwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5TZWN0aW9ucy5EYXRhMV0gPSB7XHJcbiAgICAgICAgICAgICAgICByb3dzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRlci5nZXREZWZpbml0aW9uKEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5Sb3dzLlR5cERva2xhZHUpWzBdPy5pdGVtLCAvLyB0eXAgZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlckZvcm0hLmZvcm0hLnNlY3Rpb25zIVswXS5yb3dzIVswXSwgLy8ga2F0ZWdvcmllIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICBidWlsZGVyLmdldERlZmluaXRpb24oR29yZGljLkVrby5IZWFkZXJGb3JtLlJvd3MuRGF0dW1FdmlkZW5jZSlbMF0/Lml0ZW0gLy8gZGF0dW0gZXZpZGVuY2VcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSBhcyBGb3Jtcy5Gb3JtU2VjdGlvbjtcclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5TZWN0aW9ucy5EYXRhMl0gPSB7XHJcbiAgICAgICAgICAgICAgICByb3dzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRlci5nZXREZWZpbml0aW9uKEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5Sb3dzLlpwcmFjb3ZhdGVsKVswXT8uaXRlbSwgLy8genByYWNvdmF0ZWxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJGb3JtIS5mb3JtIS5zZWN0aW9ucyFbMV0ucm93cyFbMV0sIC8vIGthdGVnb3JpZSBwxZnDrXBhZHVcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJGb3JtIS5mb3JtIS5zZWN0aW9ucyFbMV0ucm93cyFbMF0gLy8gdHlwIHDFmcOtcGFkdVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9IGFzIEZvcm1zLkZvcm1TZWN0aW9uO1xyXG4gICAgICAgICAgICAvLyB2bGFzdG7DrSBuYXN0YXZlbsOtIHBydmvFryAocMWZZXbDocW+bsSbIG1vZGVsKS4gcG96b3IsIG5lc23DrSBzZSBtxJtuaXQgbmFtZVxyXG4gICAgICAgICAgICBmb3JtU2V0dXBbR29yZGljLkVrby5IZWFkZXJGb3JtLkZpZWxkcy5JZF0gPSB7IG9wdGlvbnM6IHsgbW9kZWw6IFwiaXhwX3VwclwiIH0gfSBhcyBGb3Jtcy5Gb3JtRmllbGQ7XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLlpwcmFjb3ZhdGVsXSA9IHsgb3B0aW9uczogeyBtb2RlbDogXCJpeHNfZnVuX2FrdD1peHNfZnVuO2l4c19mdW5fdHh0PW5hemV2O2l4c19mdW5fcmVmX3R4dD1uYXpldl9yZWY7aXhzX2Z1bl9zdV90eHQ9bmF6ZXZfc3VcIiB9IH0gYXMgRm9ybXMuRm9ybUZpZWxkO1xyXG4gICAgICAgICAgICBmb3JtU2V0dXBbR29yZGljLkVrby5IZWFkZXJGb3JtLkZpZWxkcy5Qb3Bpc10gPSB7IG9wdGlvbnM6IHsgbW9kZWw6IFwicG9waXNfemtyXCIgfSB9IGFzIEZvcm1zLkZvcm1GaWVsZDtcclxuICAgICAgICAgICAgLy8gamluw70gbGFiZWwgcHJvIHBvcGlzXHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uUm93cy5Qb3Bpc10gPSB7IGxhYmVsOiBcIlBvcGlzIHprcsOhY2Vuw71cIiB9IGFzIEZvcm1zLkZvcm1Sb3c7XHJcbiAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIGhsYXZpxI1reVxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkhlYWRlckZvcm0uc2V0dXAoYnVpbGRlciwgZm9ybVNldHVwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIMO6cHJhdmEgbWVudSBhIHBvbG/FvmVrXHJcbiAgICAgICAgICAgIEZ1Y0RldGFpbC5jaGFuZ2VCdWlsZGVyRGVmaW5pdGlvbihidWlsZGVyKTtcclxuICAgICAgICAgICAgLy8gcMWZZXN1biBLUEkgcMWZw61sb2ggbmEgcHJ2bsOtIG3DrXN0b1xyXG4gICAgICAgICAgICBidWlsZGVyLm1vdmVEZWZpbml0aW9uQmVmb3JlKFwia3BpUHJpbG9oeVwiLCBudWxsLCBHRGJkLkRlZmluaXRpb25LaW5kLktwaSk7XHJcblxyXG4gICAgICAgICAgICAvLyDFoWlwa3kgcHJvIHBvc3VuIHBvIHNlem5hbXVcclxuICAgICAgICAgICAgdGhpcy5saXN0Q29udHJvbHNfc2V0dXAoe1xyXG4gICAgICAgICAgICAgICAgcm93VG9EdG86IGZ1bmN0aW9uIChncmlkU3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJeHBVcHI6IGdyaWRTdGF0ZS5jdXJyZW50Um93LmRhdGEuaXhwX3VwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgTmFzbGVkdWppY2lEZXRhaWw6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG5leHRJdGVtVGVtcGxhdGU6IFwiTsOhc2xlZHVqw61jw606IHtpeHBfdXByfTxicj57YWNfYWc6dHJpbX0gLSB7YWM6dHJpbX08YnI+e3BvcGlzOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgcHJldkl0ZW1UZW1wbGF0ZTogXCJQxZllZGNob3rDrToge2l4cF91cHJ9PGJyPnthY19hZzp0cmltfSAtIHthYzp0cmltfTxicj57cG9waXM6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICBiZWZvcmVNb3ZlOiB0aGF0LmNsb3NpbmdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPYnNsdWhhIGFrdGl2bsOtIG9wZXJhY2VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeS5FdmVudH0gZXYgdWTDoWxvc3RcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gY3R4PyBwxa92b2Ruw60gdWTDoWxvc3QgYSBqZWrDrSBhcmd1bWVudHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25EZXRhaWxCdWlsZGVyQWN0aXZlT3AoZXY6IEpRdWVyeS5FdmVudCwgY3R4PzogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBabcSbbmEgcMWZZWRrb250YWPDrSAodWxvxb5lbsO9Y2ggYW5hbHl0aWspIHDFmcOtcGFkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHptZW5hUHJlZGtvbnRhY2koKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBkb2TEm2xhdFxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaWFsb2dzLm1lc3NhZ2VCb3godGhpcy5hY3Rpb25zLmFjdFByZWRrb250YWNlVXByYXZpdCEuY2FwdGlvbiwgXCJabcSbbmEgcMWZZWRrb250YWPDrSBwxZnDrXBhZHUgamXFoXTEmyBuZW7DrSBvYnNsb3XFvmVuYVwiKS5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWhyw6Fuw60gYSB6b2JyYXplbsOtIGRhdCB6IElJU1NQXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbG9hZElpc3NwKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gbmHEjXRlbsOtIGRhdCBJSVNTUCB6IGRhdGFiw6F6ZSAocG9rdWQgamUgcmXFvmltIElJU1NQKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5KZUlpc3NwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0XHJcbiAgICAgICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczoyNDEwMDQ5NFwiKTsgLy9SQyAyNDEwMDQ5NCA6IFByb2LDrWjDoSBuYcSNdGVuw60gaW5mb3JtYWPDrVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLklpc3NwLnJlYWQoeyBpeHNfaHByOiB0aGF0LkRldGFpbER0by5peHBfdXByLCByb2s6IHRoYXQuUm9rIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIMO6cHJhdmEgZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBGdWNHcmlkLklpc3NwLm1vZGlmeUR0byhbZGF0YV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9obGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyAvKmtleTogXCJcIiovIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGRhdCBhIHDFmWVrcmVzbGVuw60gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZElJU1NQU3RhdnkhLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2hsZWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWV3UG9sID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YVswXS5wb2xvemt5ISwgeyAvKmtleTogXCJcIiovIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkSUlTU1BQb2xvemt5IS5nZ3JpZChcInNldERhdGFcIiwgdmlld1BvbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBva25hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6ZW7DrSBoaXN0b3JpZSB2b2zDoW7DrSBJSVNTUFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGhpc3RvcmllSWlzc3AoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZShbR29yZGljLklpc3NwLldlYkNvbnRyb2xzLkdJaXNzcFJleldzQ2FsbEhpc3RvcnksIHsgdWlkOiBcIkdJaXNzcFJleldzQ2FsbEhpc3RvcnkjXCIgfV0sIHtcclxuICAgICAgICAgICAgICAgIGl4c19ocHI6IHRoaXMuRGV0YWlsRHRvLml4cF91cHJcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWhyw6Fuw60gYSB6b2JyYXplbsOtIHBvaHlixa9cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHVjZXRuaSBqZGUgbyDDusSNZXRuw60gKHRydWUpIG5lYm8gcmV6ZXJ2YcSNbsOtIChmYWxzZSkgcG9oeWJ5P1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxvYWRQb2h5YnkodWNldG5pOiBib29sZWFuKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBuYcSNdGVuw60gZGF0XHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjI0MTAwNDgwXCIpOyAvL1JDIDI0MTAwNDgwIDogUHJvYsOtaMOhIG5hxI10ZW7DrSBwb2h5YsWvXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5Yi5saXN0KHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHBfdXByOiB0aGF0LkRldGFpbER0by5peHBfdXByLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cHJfc191cHJfZGVmOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBfdXBvOiB1Y2V0bmlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gW0dvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVcG8uVWNldG5pQXV0b21hdGlja3ksIEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVcG8uVWNldG5pU3Rvcm5vLCBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVXBvLlVjZXRuaVBvbG9hdXRvbWF0aWNreSwgR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVwby5VY2V0bmlSdWNuaSwgR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVwby5OZXVjZXRuaV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogW0dvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVcG8uUmV6ZXJ2YWNuaV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwb2hsZWRcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGEsIHsga2V5OiBcIml4cF91cHIscmFkZWtfdXBvXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgKHVjZXRuaSA/IHRoYXQuJGdyaWRVY3RQb2h5YnkhIDogdGhhdC4kZ3JpZFJlelBvaHlieSEpLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIG9rbmFcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5haHLDoW7DrSBhIHpvYnJhemVuw60gcGxhdGViXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbG9hZFBsYXRieSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBkYXRcclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MjQxMDA0OTNcIik7IC8vUkMgMjQxMDA0OTMgOiBQcm9iw61ow6EgbmHEjXRlbsOtIHBsYXRlYlxyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuUGxhdGJhLmxpc3QocnEgPT4geyByZXR1cm4geyBmaWx0ZXJzOiB7IGl4cDogdGhhdC5EZXRhaWxEdG8uaXhwX3VwciB9IH07IH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBvaGxlZFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaXhwLHJhZGVrX3VoclwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRQbGF0YnkhLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIG9rbmFcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5haHLDoW7DrSBhIHpvYnJhemVuw60gw7rEjWV0bsOtY2ggesOhcGlzxa8gcG9oeWLFr1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxvYWRVY3RaYXBpc3koKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBuYcSNdGVuw60gesOhcGlzxa9cclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MjQxMDA0OTJcIik7IC8vUkMgMjQxMDA0OTIgOiBQcm9iw61ow6EgbmHEjXRlbsOtIHrDoXBpc8WvXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5aYXBpcy5saXN0KHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB6X3BvaHlidTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9rX2l4cF91cHI6IHRoYXQuRGV0YWlsRHRvLml4cF91cHIsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW7DrSB6w6FwaXPFr1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaXhwX3VwcixyYWRla191cG8scmFkZWtfemFwXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZFVjdFphcGlzeSEuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSB0YWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmFibGVVY2V0bmlaYXBpc3koKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWhyw6Fuw60gYSB6b2JyYXplbsOtIGRva2xhZMWvIG8gemHDusSNdG92w6Fuw61cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkRG9rbGFkeU9aYXVjdG92YW5pKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gbmHEjXRlbsOtIGRhdCBobGF2acSNa3kgKHBvdXplIHBybyB6b2JyYXplbsOtIGRva2xhZHUpXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjI0MTAwNDc5XCIpOyAvL1JDIDI0MTAwNDc5IDogUHJvYsOtaMOhIG5hxI10ZW7DrSBkb2tsYWTFr1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuWmFwaXMubGlzdERva2xhZHUocnEgPT4geyByZXR1cm4geyBmaWx0ZXJzOiB7IHpfcG9oeWJ1OiAxLCBkb2tfaXhwX3VwcjogdGhhdC5EZXRhaWxEdG8uaXhwX3VwciB9IH07IH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwicm9rLGxpYyxpY28sdWNzLG1lc2ljLGFjXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZERva2xhZHlPWmF1YyEuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSB0YWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmFibGVEb2tsYWRPWmF1Y3RvdmFuaSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5kT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5haHLDoW7DrSBhIHpvYnJhemVuw60gesOhcGlzxa8gZG9rbGFkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxvYWRaYXBpc3lEb2tsYWR1KCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gbmHEjXRlbsOtIGRhdCB6w6FwaXPFr1xyXG4gICAgICAgICAgICBsZXQgYWt0RG9rbGFkID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR0Rva2xhZER0bz4odGhhdC4kZ3JpZERva2xhZHlPWmF1Yyk7XHJcbiAgICAgICAgICAgIGlmIChha3REb2tsYWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSB6w6FwaXPFr1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlphcGlzLmxpc3QocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19yb2s6IGFrdERva2xhZCEucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX2xpYzogYWt0RG9rbGFkIS5saWMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tfaWNvOiBha3REb2tsYWQhLmljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva191Y3M6IGFrdERva2xhZCEudWNzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX21lc2ljOiBha3REb2tsYWQhLm1lc2ljLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX2FjOiBha3REb2tsYWQhLmFjXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW7DrSB6w6FwaXPFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBvcHJhdml0IGtleSAoamUgdG8gaSB2IGxvYWRSZXplcnZhY2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwicmFkZWtfemFwXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkWmFwaXN5RG9rbGFkdU9aYXVjIS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWhyw6Fuw60gYSB6b2JyYXplbsOtIHJlemVydmHEjW7DrWNoIHrDoXBpc8WvXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgbG9hZFJlelphcGlzeSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG5hxI10ZW7DrSB6w6FwaXPFr1xyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczoyNDEwMDQ5MlwiKTsgLy9SQyAyNDEwMDQ5MiA6IFByb2LDrWjDoSBuYcSNdGVuw60gesOhcGlzxa9cclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLlphcGlzLmxpc3QocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlemVydmFjbmk6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRva19peHBfdXByOiB0aGF0LkRldGFpbER0by5peHBfdXByXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcG9obGVkXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogb3ByYXZpdCBrZXkgcHJvIFJPWiAoamUgdG8gaSB2IGxvYWRVY3RvdmFuaURva2xhZHkpXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZpZXcgPSBuZXcgR29yZGljLkRhdGEuVmlldyhkYXRhLCB7IGtleTogXCJyYWRla196YXBcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGRhdCBhIHDFmWVrcmVzbGVuw60gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkUmV6WmFwaXN5IS5nZ3JpZChcInNldERhdGFcIiwgdmlldyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBva25hXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmFibGVSZXplcnZhY25pWmFwaXN5KCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE90ZXbFmWVuw60gZGV0YWlsdSB2IHByaW3DoXJuw60gYWdlbmTEm1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGRldGFpbFZQcmltYXJuaUFnZW5kZSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IG5lbcOhIHRhdG8gYWtjZSBiw710IGkgbmEgc2V6bmFtdT9cclxuXHJcbiAgICAgICAgICAgIC8vIG90ZXbFmWVuw60gZGV0YWlsdSBQSUQgdiBwcmltw6FybsOtIGFnZW5kxJtcclxuICAgICAgICAgICAgcmV0dXJuIEZ1Y1V0aWxzLm9wZW5EZXRhaWxJbk90aGVyVGFiKHRoaXMuRGV0YWlsRHRvLnR5cF9hZywgdGhpcy5EZXRhaWxEdG8uaXhwX3VwciwgbnVsbCwgbnVsbCwgdGhpcy5EZXRhaWxEdG8/LmplX3ZlX3dmbCAhPT0gMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTdG9ybm92w6Fuw61cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzdG9ybm8oKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gRnVjRGV0YWlsLnJ1bklzbEFjdGlvbldpdGhSZWFzb24oXHJcbiAgICAgICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAgICAgdGhhdC5EZXRhaWxEdG8uSmVTdG9ybm92YW55XHJcbiAgICAgICAgICAgICAgICAgICAgPyBcImpyZXM6MjQxMDAyODhcIiAvL1JDIDI0MTAwMjg4IDogT3ByYXZkdSBjaGNldGUgenJ1xaFpdCBzdG9ybm8gcMWZw61wYWR1P1xyXG4gICAgICAgICAgICAgICAgICAgIDogXCJqcmVzOjI0MTAwMjg5XCIsIC8vUkMgMjQxMDAyODkgOiBPcHJhdmR1IGNoY2V0ZSBzdG9ybm92YXQgcMWZw61wYWQ/XHJcbiAgICAgICAgICAgICAgICAoZGF0YTogeyBkdXZvZDogc3RyaW5nIH0pID0+IHsgcmV0dXJuIHRoYXQuaXNsLkZpblByaXBhZC5zdG9ybnVqKHsgcm93czogW3RoYXQuRGV0YWlsRHRvXSwgc3Rvcm5vdmF0OiAhdGhhdC5EZXRhaWxEdG8uSmVTdG9ybm92YW55LCBkdXZvZDogZGF0YS5kdXZvZCB9KTsgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHsgcmV0dXJuIHRoYXQuc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YSgpIH0sXHJcbiAgICAgICAgICAgICAgICB0aGF0LkRldGFpbER0by5KZVN0b3Jub3ZhbnkgPyB0aGF0LmFjdGlvbnMuYWN0WnJ1c2l0U3Rvcm5vISA6IHRoYXQuYWN0aW9ucy5hY3RTdG9ybm8hXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVemF2xZllbsOtXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgdXphdnJlbmkoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgZm9ybURlZiA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0yLTEwLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdygpLmFkZEZpZWxkKFwiZ3N0YXRpY1wiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogdGhhdC5EZXRhaWxEdG8uSmVVemF2cmVueVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwianJlczoyNDEwMDI4MlwiIC8vUkMgMjQxMDAyODIgOiBPcHJhdmR1IGNoY2V0ZSB6cnXFoWl0IHV6YXbFmWVuw60gcMWZw61wYWR1P1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwianJlczoyNDEwMDI4M1wiIC8vUkMgMjQxMDAyODMgOiBPcHJhdmR1IGNoY2V0ZSB1emF2xZnDrXQgcMWZw61wYWQ/XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoYXQuRGV0YWlsRHRvLkplVXphdnJlbnkpIGZvcm1EZWZcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJqcmVzOjI0MTAwMjg0XCIpIC8vUkMgMjQxMDAyODQgOiBQxZnDrXBhZHkgYWdlbmQgRlVDIGEgSU5UXHJcbiAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnY2hlY2tcIiwgeyBuYW1lOiBcIm90ZXZyaXRfZnVjX2ludFwiLCBsYWJlbDogXCJqcmVzOjI0MTAwMjg1XCIgfSk7IC8vUkMgMjQxMDAyODUgOiBvdGV2xZnDrXQgZG8gc3RhdnUgJ290ZXbFmWVuJyBtw61zdG8gZG8gc3RhdnUgJ3DFmWlwcmF2ZW4gayB1emF2xZllbsOtXHJcbiAgICAgICAgICAgIHJldHVybiBGdWNEZXRhaWwucnVuSXNsQWN0aW9uV2l0aEZvcm0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm06IGZvcm1EZWYsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAyMDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoZGF0YTogeyBvdGV2cml0X2Z1Y19pbnQ6IGJvb2xlYW4gfSkgPT4geyByZXR1cm4gdGhhdC5pc2wuRmluUHJpcGFkLnV6YXZyaSh7IHJvd3M6IFt0aGF0LkRldGFpbER0b10sIHV6YXZyaXQ6ICF0aGF0LkRldGFpbER0by5KZVV6YXZyZW55LCBvdGV2cml0X2Z1Y19pbnQ6IGRhdGEub3RldnJpdF9mdWNfaW50IH0pOyB9LFxyXG4gICAgICAgICAgICAgICAgKCkgPT4geyByZXR1cm4gdGhhdC5zZXRBY3RpdmVPcGVyYXRpb25BbmRSZWxvYWREYXRhKCkgfSxcclxuICAgICAgICAgICAgICAgIHRoYXQuRGV0YWlsRHRvLkplVXphdnJlbnkgPyB0aGF0LmFjdGlvbnMuYWN0WnJ1c2l0VXphdnJlbmkhIDogdGhhdC5hY3Rpb25zLmFjdFV6YXZyZW5pIVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZZWTDoW7DrVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHByZWRhbmkoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgZm9ybURlZiA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxIExNUy0yLTEwLTBcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcIsOaxI10w6FybmFcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5la29zdXVzKCksIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInV1c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcInV1cz11dXMsaWNvPT5pY28sdWNzPT51Y3NcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljbzogdGhpcy5JY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVjczogdGhpcy5VY3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHV1czogdGhpcy5kYnBhcmFtcy5mdWNfcmV6X3BybyA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlJlemltUHJvdm96dS5SZWZlcmVudCB8fCB0aGlzLmRicGFyYW1zLmZ1Y19yZXpfcHJvID09PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuUmV6aW1Qcm92b3p1LlVjdGFybmEgPyAodGhpcy5VdXMgPT09IFwiSFVcIiA/IFwiSFVcIiA6IFt0aGlzLlV1cywgXCJIVVwiXSkgOiB2b2lkIDAsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmbGFnOiBHb3JkaWMuUHJlZmFicy5GaWVsZC5GbGFncy5yZXF1aXJlZCxcclxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLlJlcXVpcmVkKCldLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInptZW5hX2Z1bmtjZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBcIlptxJtuaXQgenByYWNvdmF0ZWxlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VmFsdWU6IGJvb2xlYW47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gKGNoYW5nZU9iai52YWx1ZSA9PT0gdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZXYudGFyZ2V0KS5jbG9zZXN0KFwiLmdmb3JtXCIpLmZpbmRGaWVsZHMoXCJpeHNfZnVuXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsICFuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRSb3coXCJacHJhY292YXRlbFwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbnNmdW4oKSwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaXhzX2Z1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c19mdW49aXhzX2Z1blwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgRGxlUG92b2xlbnljaEZhemk6IFwiR1dBRlVDMDVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgRWtvSWNvOiB0aGF0LkljbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRWtvVWNzOiB0aGF0LlVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgRWtvVXVzOiBuZXcgR29yZGljLkZvcm1zLkRlcGVuZGVuY3koXCJ1dXNcIiwgXCJ1dXNcIiwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnM6IFtuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0sXHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd246IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWRkUm93KFwianJlczoyNDEwMDI5NFwiKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgeyBuYW1lOiBcImR1dm9kXCIsIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLCB2YWxpZGF0b3JzOiBbbmV3IEdvcmRpYy5WYWxpZGF0b3JzLkxlbmd0aCh7IG1heDogMjU0IH0pLCBuZXcgR29yZGljLlZhbGlkYXRvcnMuUmVxdWlyZWQoKV0gfSk7IC8vUkMgMjQxMDAyOTQgOiBExa92b2RcclxuICAgICAgICAgICAgLy8gVE9ETzogY28gZG90YXogUMWZw61wYWQgbmVidWRlIHDFmWlkxJtsZW4gxb7DoWRuw6ltdSByZWZlcmVudG92aSwgY2hjZXRlIHBva3JhxI1vdmF0PyBqYWtvIGplIHYgR3VwdMSbLiBuZWJvIGplbiBkb3Bsbml0IHRleHQsIMW+ZSBwb2t1ZCBuZWJ1ZGUgemFkw6FuYSBmdW5rY2UsIG5lYnVkZSBwxZnDrXBhZCBwxZlpZMSbbGVuIMW+w6FkbsOpbXUgcmVmZXJlbnRvdmk/XHJcbiAgICAgICAgICAgIC8vIFRPRE86IG5lYm8gZG9wbG5pdCB0ZXh0IGRvIGZvcm11bMOhxZllIChhIHBvZG9ibsO9IGkgZG8gcHLFr3ZvZGNlIG5hIHNlem5hbSlcclxuICAgICAgICAgICAgcmV0dXJuIEZ1Y0RldGFpbC5ydW5Jc2xBY3Rpb25XaXRoRm9ybShcclxuICAgICAgICAgICAgICAgIHRoaXMsXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybTogZm9ybURlZixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IHV1czogdGhhdC5VdXMsIGljbzogdGhhdC5JY28sIHVjczogdGhhdC5VY3MsIHptZW5hX2Z1bmtjZTogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIChkYXRhOiB7IHV1czogc3RyaW5nLCBpeHNfZnVuOiBzdHJpbmcsIGR1dm9kOiBzdHJpbmcgfSkgPT4geyByZXR1cm4gdGhhdC5pc2wuRmluUHJpcGFkLnByZWRlaih7IHJvd3M6IFt0aGF0LkRldGFpbER0b10sIHByZWRhdDogdHJ1ZSwgdXVzOiBkYXRhLnV1cywgaXhzX2Z1bl9ha3Q6IGRhdGEuaXhzX2Z1biwgZHV2b2Q6IGRhdGEuZHV2b2QgfSk7IH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHJldHVybiB0aGF0LnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEoKSB9LFxyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByZWRhbmkhXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEaWFnbm9zdGlrYSAodWxvxb5lbsOtIGRhdCkgcMWZw61wYWR1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZGlhZ25vc3Rpa2EoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICAvLyB1bG/FvmVuw60gemlwdSBzIGRhdHkgYWt0dcOhbG7DrWhvIHDFmcOtcGFkdVxyXG4gICAgICAgICAgICByZXR1cm4gRnVjRGV0YWlsLmRpYWdub3N0aWthKFdmbC5JbnRlcmZhY2UuR0lkZW50aWZpa2F0b3JDb0pzZW1aYWMuRmluYW5jbmlQcmlwYWQsIHRoaXMuSXhwVXByLCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVsb8W+ZW7DrSAvIHpvYnJhemVuw60gZG9rbGFkdSBvIHphw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZG9rbGFkT1phdWN0b3ZhbmkoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgYWt0RG9rbGFkID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR0Rva2xhZER0bz4odGhpcy4kZ3JpZERva2xhZHlPWmF1Yyk7XHJcbiAgICAgICAgICAgIGlmIChha3REb2tsYWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHVsb8W+ZW7DrS9vdGV2xZllbsOtIHNvdWJvcnVcclxuICAgICAgICAgICAgICAgIHJldHVybiBGdWNEZXRhaWwuZG9rbGFkT1phdWN0b3ZhbmkodGhpcywgbnVsbC8qYWt0RG9rbGFkPy5peGJfZHp1Ki8sIGFrdERva2xhZD8ucm9rLCBha3REb2tsYWQ/LmxpYywgYWt0RG9rbGFkPy5pY28sIGFrdERva2xhZD8udWNzLCBha3REb2tsYWQ/Lm1lc2ljLCBha3REb2tsYWQ/LmFjKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6w60gZGV0YWlsIHZ5YnJhbsOpaG8gcG9oeWJ1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSB1Y2V0bmkgamRlIG8gw7rEjWV0bsOtICh0cnVlKSBuZWJvIHJlemVydmHEjW7DrSAoZmFsc2UpIHBvaHliP1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGRldGFpbFBvaHlidSh1Y2V0bmk6IGJvb2xlYW4pOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGFrdHXDoWxuw60gdnlicmFuw6EgcG9sb8W+a2FcclxuICAgICAgICAgICAgbGV0IGFrdFJhZGVrID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvPih1Y2V0bmkgPyB0aGlzLiRncmlkVWN0UG9oeWJ5IDogdGhpcy4kZ3JpZFJlelBvaHlieSk7XHJcbiAgICAgICAgICAgIGlmIChha3RSYWRlaykge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHDFmcOtem5hayBha3Rpdm7DrSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICBsZXQgbmVlZFJlZnJlc2ggPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBvdGV2xZllbsOtIGRldGFpbHVcclxuICAgICAgICAgICAgICAgIGxldCAkZGV0YWlsV2luZG93ID0gdGhpcy5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICBbXCJHb3JkaWMuRnVjLldlYkNsaWVudC5HRGV0YWlsUG9oeWJ1XCIsIHsgZ3JpZFJlbW90ZUNvbnRyb2w6IG5ldyBHb3JkaWMuQ29tcG9uZW50cy5HcmlkUkModWNldG5pID8gdGhpcy4kZ3JpZFVjdFBvaHlieSEgOiB0aGlzLiRncmlkUmV6UG9oeWJ5ISkgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRDogJ0RldGFpbFBvaHlidSMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBJeHBVcHI6IGFrdFJhZGVrLml4cF91cHIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJhZGVrVXBvOiBha3RSYWRlay5yYWRla191cG9cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG9ic2x1aGEgYWt0aXZuw60gb3BlcmFjZSBuYSBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICAkLmNvbnRlbnQoJGRldGFpbFdpbmRvdykub24oRnVjRGV0YWlsLnRyaWdnZXJDaGFuZ2UsIChyZXRWYWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHrDoXpuYW0gYnlsIHptxJtuxJtuLCBtdXPDrSBzZSBuYcSNw61zdCB6bm92dVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWw/LmRhdGE/Lml4cF91cHIgJiYgcmV0VmFsPy5kYXRhPy5yYWRla191cG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnVkZSBzZSBvYsSNZXJzdHZvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRSZWZyZXNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBvYnNsdWhhIHVrb27EjWVuw60gb2tuYVxyXG4gICAgICAgICAgICAgICAgJGRldGFpbFdpbmRvdy5vbihcImNsb3NlZFwiLCAocmV0VmFsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBkZXRhaWx1IChieWxhLWxpIGFrdGl2bsOtIG9wZXJhY2UgdiBvdGV2xZllbsOpbSBkZXRhaWx1KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZWVkUmVmcmVzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJGRldGFpbFdpbmRvdy5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhesOtIGRldGFpbCB2eWJyYW7DqSBwbGF0YnlcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkZXRhaWxQbGF0YnkoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBha3R1w6FsbsOtIHZ5YnJhbsOhIHBvbG/FvmthXHJcbiAgICAgICAgICAgIGxldCBha3RSYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQbGF0YmFEdG8+KHRoaXMuJGdyaWRQbGF0YnkpO1xyXG4gICAgICAgICAgICBpZiAoYWt0UmFkZWspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBwxZnDrXpuYWsgYWt0aXZuw60gb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgbGV0IG5lZWRSZWZyZXNoID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gb3RldsWZZW7DrSBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICBsZXQgJGRldGFpbFdpbmRvdyA9IHRoaXMubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgW1wiR29yZGljLkZ1Yy5XZWJDbGllbnQuR0RldGFpbFBsYXRieVwiLCB7IGdyaWRSZW1vdGVDb250cm9sOiBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHRoYXQuJGdyaWRQbGF0YnkhKSB9XSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEOiAnRGV0YWlsUGxhdGJ5IycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogYWt0UmFkZWsuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSYWRla1VocjogYWt0UmFkZWsucmFkZWtfdWhyXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBvYnNsdWhhIGFrdGl2bsOtIG9wZXJhY2UgbmEgZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgJC5jb250ZW50KCRkZXRhaWxXaW5kb3cpLm9uKEZ1Y0RldGFpbC50cmlnZ2VyQ2hhbmdlLCAocmV0VmFsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB6w6F6bmFtIGJ5bCB6bcSbbsSbbiwgbXVzw60gc2UgbmHEjcOtc3Qgem5vdnVcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmV0VmFsPy5kYXRhPy5peHAgJiYgcmV0VmFsPy5kYXRhPy5yYWRla191aHIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnVkZSBzZSBvYsSNZXJzdHZvdmF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRSZWZyZXNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBvYnNsdWhhIHVrb27EjWVuw60gb2tuYVxyXG4gICAgICAgICAgICAgICAgJGRldGFpbFdpbmRvdy5vbihcImNsb3NlZFwiLCAocmV0VmFsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBkZXRhaWx1IChieWxhLWxpIGFrdGl2bsOtIG9wZXJhY2UgdiBvdGV2xZllbsOpbSBkZXRhaWx1KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZWVkUmVmcmVzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJGRldGFpbFdpbmRvdy5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuw60gcHJ2a8WvIHZlIGZvcm11bMOhxZlpXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGUoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBzdGF0dXMgYmFyXHJcbiAgICAgICAgICAgIC8vIHphw7rEjXRvdsOhbi96YXJlemVydm92w6FuIG5lYm8gbmVzdG9ybm92w6FuIE9LIGppbmFrIHZhcm92w6Fuw61cclxuICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdCBrb25zdGFudHkgcHJvIFNaYXVcclxuICAgICAgICAgICAgLy8gVE9ETzogZG/FmWXFoWl0IGJhcnZ5IHNfdXByXHJcbiAgICAgICAgICAgIEVrby5EZXRhaWwuU3RhdHVzQmFyLnVwZGF0ZUl0ZW0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c2VzIVtcInN0YXR1c0JhclNVcHJcIl0hLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5EZXRhaWxEdG8uc191cHJfdHh0Py50b1VwcGVyQ2FzZSgpID8/IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAvLyh0aGlzLkRldGFpbER0by5zX3VwciA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNVcG8uWmF1Y3RvdmFueVxyXG4gICAgICAgICAgICAgICAgLy8gICAgPyBFa28uVXRpbHMuUmVjb3JkRm9ybWF0VHlwZS5SZWFsaXpvdmFub1xyXG4gICAgICAgICAgICAgICAgICAgIC8qOiovIG51bGxcclxuICAgICAgICAgICAgICAgIC8qKSovKTtcclxuICAgICAgICAgICAgRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbShcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzZXMhW1wic3RhdHVzQmFyU1phdVwiXSEsXHJcbiAgICAgICAgICAgICAgICB0aGlzLkRldGFpbER0by5zX3phdV90eHQ/LnRvVXBwZXJDYXNlKCkgPz8gXCJcIixcclxuICAgICAgICAgICAgICAgICh0aGlzLkRldGFpbER0by5zX3phdSA9PT0gMjBcclxuICAgICAgICAgICAgICAgICAgICA/IEVrby5VdGlscy5SZWNvcmRGb3JtYXRUeXBlLlJlYWxpem92YW5vXHJcbiAgICAgICAgICAgICAgICAgICAgOiBudWxsXHJcbiAgICAgICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbShcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzZXMhW1wic3RhdHVzQmFyU1N0b1wiXSEsXHJcbiAgICAgICAgICAgICAgICAodGhpcy5EZXRhaWxEdG8uc19zdG8hICE9PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1N0by5OZXN0b3Jub3Zhbm8gPyAodGhpcy5EZXRhaWxEdG8uc19zdG9fdHh0Py50b1VwcGVyQ2FzZSgpID8/IFwiXCIpIDogXCJcIiksXHJcbiAgICAgICAgICAgICAgICAodGhpcy5EZXRhaWxEdG8uc19zdG8gPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TU3RvLlN0b3Jub1xyXG4gICAgICAgICAgICAgICAgICAgID8gRWtvLlV0aWxzLlJlY29yZEZvcm1hdFR5cGUuU3Rvcm5vdmFub1xyXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbFxyXG4gICAgICAgICAgICAgICAgKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBha2NlXHJcbiAgICAgICAgICAgIGNvbnN0IHBlcm1FbXB0eUdyaWQgPSBGdWNHcmlkLmdldEVtcHR5R3JpZFBlcm1pc3Npb24oKTtcclxuICAgICAgICAgICAgY29uc3QgYWN0cyA9IHRoaXMuYWN0aW9ucztcclxuICAgICAgICAgICAgY29uc3QgcGVybXMgPSB0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucztcclxuICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdCBzcHLDoXZuw6kgcG9kbcOtbmt5XHJcbiAgICAgICAgICAgIGFjdHMuYWN0U3Rvcm5vIS51cGRhdGVQZXJtaXNzaW9uKHBlcm1zID8gcGVybXMuTHplU3Rvcm5vdmF0IDogdW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RacnVzaXRTdG9ybm8hLnVwZGF0ZVBlcm1pc3Npb24ocGVybXMgPyBwZXJtcy5MemVacnVzaXRTdG9ybm8gOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFV6YXZyZW5pIS51cGRhdGVQZXJtaXNzaW9uKHBlcm1zID8gcGVybXMuTHplVXphdnJpdCA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0WnJ1c2l0VXphdnJlbmkhLnVwZGF0ZVBlcm1pc3Npb24ocGVybXMgPyBwZXJtcy5MemVacnVzaXRVemF2cmVuaSA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0UHJlZGFuaSEudXBkYXRlUGVybWlzc2lvbihwZXJtcyA/IHBlcm1zLkx6ZVByZWRhdCA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0RGlhZ25vc3Rpa2EhLnVwZGF0ZVBlcm1pc3Npb24ocGVybXMgPyBwZXJtcy5MemVEaWFnbm9zdGlrYSA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0T2JjZXJzdHZlbmlQcmlwIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IGRvcGxuaXQgc3Byw6F2bsOpIHBvZG3DrW5reSBwb2RsZSB0b2hvLCBjbyBqZSB0byB6YSBhZ2VuZHkgKGplc3RsaSBXSyBleGlzdHVqZSBhIGFzaSBqZXN0bGkgamUgbmFpbnN0YWxvdmFuw70gLSB6amlzdGl0LCBqYWsgdG8gamUgdiBBREEpXHJcbiAgICAgICAgICAgIC8vaWYgKHRoaXMuRGV0YWlsRHRvLnR5cF9hZyA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cEFnLkZVQyB8fCB0aGlzLkRldGFpbER0by50eXBfYWcgPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBBZy5JTlQpIHtcclxuICAgICAgICAgICAgLy8gICAgYWN0cy5hY3REZXRhaWxWUHJpbWFybmlBZ2VuZGUhLnVwZGF0ZVBlcm1pc3Npb24ocGVybXMgPyBwZXJtcy5MemVab2JyYXppdCA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICBhY3RzLmFjdERldGFpbFZQcmltYXJuaUFnZW5kZSEudXBkYXRlUGVybWlzc2lvbihcclxuICAgICAgICAgICAgICAgIHRoaXMuRGV0YWlsRHRvLnR5cF9hZyA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cEFnLkZVQyB8fCB0aGlzLkRldGFpbER0by50eXBfYWcgPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBBZy5JTlRcclxuICAgICAgICAgICAgICAgICAgICA/IHsgdmFsdWU6IGZhbHNlLCBtZXNzYWdlOiBcIkRldGFpbCBqZSBqacW+IHYgcHJpbcOhcm7DrSBhZ2VuZMSbIHpvYnJhemVuXCIgfVxyXG4gICAgICAgICAgICAgICAgICAgIDogKHBlcm1zID8gcGVybXMuTHplWm9icmF6aXQgOiB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIC8vIHRhYiBwxZllZGtvbnRhY8OtXHJcbiAgICAgICAgICAgIGFjdHMuYWN0UHJlZGtvbnRhY2VVcHJhdml0IS51cGRhdGVQZXJtaXNzaW9uKHBlcm1zID8gcGVybXMuTHplVXByUHJlZGtvbnRhY2kgOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICAvLyB0YWIgcG9oeWLFr1xyXG4gICAgICAgICAgICAvL2NvbnN0IGFrdFJhZGVrUG9oID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvPih0aGlzLiRncmlkUG9oeWJ5KTtcclxuICAgICAgICAgICAgLy9hY3RzLmFjdERldGFpbFBvaHlidSEudXBkYXRlUGVybWlzc2lvbihha3RSYWRla1BvaCAhPT0gbnVsbCA/IHsgdmFsdWU6IHRydWUgfSA6IHBlcm1FbXB0eUdyaWQpO1xyXG4gICAgICAgICAgICBjb25zdCBha3RSYWRla1VjdFBvaCA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0bz4odGhpcy4kZ3JpZFVjdFBvaHlieSk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0RGV0YWlsVWN0UG9oeWJ1IS51cGRhdGVQZXJtaXNzaW9uKGFrdFJhZGVrVWN0UG9oICE9PSBudWxsID8geyB2YWx1ZTogdHJ1ZSB9IDogcGVybUVtcHR5R3JpZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFrdFJhZGVrUmV6UG9oID0gR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvPih0aGlzLiRncmlkUmV6UG9oeWJ5KTtcclxuICAgICAgICAgICAgYWN0cy5hY3REZXRhaWxSZXpQb2h5YnUhLnVwZGF0ZVBlcm1pc3Npb24oYWt0UmFkZWtSZXpQb2ggIT09IG51bGwgPyB7IHZhbHVlOiB0cnVlIH0gOiBwZXJtRW1wdHlHcmlkKTtcclxuICAgICAgICAgICAgLy8gdGFiIHBsYXRlYlxyXG4gICAgICAgICAgICBjb25zdCBha3RSYWRla1BsYSA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQbGF0YmFEdG8+KHRoaXMuJGdyaWRQbGF0YnkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdERldGFpbFBsYXRieSEudXBkYXRlUGVybWlzc2lvbihha3RSYWRla1BsYSAhPT0gbnVsbCA/IHsgdmFsdWU6IHRydWUgfSA6IHBlcm1FbXB0eUdyaWQpO1xyXG4gICAgICAgICAgICAvLyB0YWIgSUlTU1BcclxuICAgICAgICAgICAgY29uc3QgYWt0UmFkZWtJaXNzcCA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2xvemthSWlzc3BEdG8+KHRoaXMuJGdyaWRJSVNTUFBvbG96a3kpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdEhpc3RvcmllSWlzc3AhLnVwZGF0ZVBlcm1pc3Npb24oYWt0UmFkZWtJaXNzcCAhPT0gbnVsbCA/IHsgdmFsdWU6IHRydWUgfSA6IHBlcm1FbXB0eUdyaWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gdGFiIMO6xI10b3bDoW7DrSBhIHJlemVydmFjZVxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZVVjZXRuaVphcGlzeSgpO1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZVJlemVydmFjbmlaYXBpc3koKTtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVEb2tsYWRPWmF1Y3RvdmFuaSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW7DrSBwcnZrxa8gdiB0YWJ1IMO6xI1ldG7DrSB6w6FwaXN5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGVVY2V0bmlaYXBpc3koKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBha3R1w6FsbsSbIG5hIHRhYnUgbmVqc291IMW+w6FkbsOhIGFrY2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuw60gcHJ2a8WvIHYgdGFidSBkb2tsYWQgbyB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlRG9rbGFkT1phdWN0b3ZhbmkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBha3R1w6FsbsOtIGRva2xhZFxyXG4gICAgICAgICAgICBjb25zdCBha3RSYWRla0RvayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdEb2tsYWREdG8+KHRoaXMuJGdyaWREb2tsYWR5T1phdWMpO1xyXG5cclxuICAgICAgICAgICAgLy8gYWtjZSBkb2tsYWTFr1xyXG4gICAgICAgICAgICBjb25zdCBwZXJtRW1wdHlHcmlkID0gRnVjR3JpZC5nZXRFbXB0eUdyaWRQZXJtaXNzaW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjdHMgPSB0aGlzLmFjdGlvbnM7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0VWN0b3ZhbmlEb2tsYWRPWmF1Y3RvdmFuaSEudXBkYXRlUGVybWlzc2lvbihha3RSYWRla0RvayAhPT0gbnVsbCA/IHsgdmFsdWU6IHRydWUgfSA6IHBlcm1FbXB0eUdyaWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW7DrSBwcnZrxa8gdiB0YWJ1IHJlemVydmHEjW7DrSB6w6FwaXN5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGVSZXplcnZhY25pWmFwaXN5KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogYWt0dcOhbG7EmyBuYSB0YWJ1IG5lanNvdSDFvsOhZG7DoSBha2NlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIHDFmcOtem5ha3UgYWt0aXZuw60gb3BlcmFjZSBhIGFrdHVhbGl6YWNlIGRldGFpbHVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gd2l0aG91dFJlbG9hZCAoZGVmYXVsdCA9IGZhbHNlKSB0cnVlID0gbmVha3R1YWxpem92YXQgZm9ybXVsw6HFmVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEod2l0aG91dFJlbG9hZDogYm9vbGVhbiA9IGZhbHNlKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICAvLyB2eXZvbMOhbsOtIHRyaWdnZXIgbyBha3Rpdm7DrSBvcGVyYWNpXHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcihGdWNEZXRhaWwudHJpZ2dlckNoYW5nZSwgW3sgZGF0YTogdGhpcy5EZXRhaWxEdG8gfV0pO1xyXG5cclxuICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgZGV0YWlsdVxyXG4gICAgICAgICAgICBpZiAoIXdpdGhvdXRSZWxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKFwicmVtZW1iZXJpbml0aWFsb3BlblwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpub3Z1IG5hxI10ZSBjZWzDvSBmb3JtdWzDocWZXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVsb2FkRGF0YSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKFwicmVtZW1iZXJpbml0aWFsb3BlblwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWt0dWFsaXphY2UgZGF0IHYgZGV0YWlsdSBwb2RsZSBtb2RlbHUgYSBuYXN0YXZlbsOtIHN0YXZ1IHBydmvFr1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgYWt0dWFsaXphY2VEZXRhaWx1KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gbmFwbG7Em27DrSBwb2zDrcSNZWtcclxuICAgICAgICAgICAgLy8gVE9ETzogbmVjaGF0IERldGFpbER0byBuZWJvIHRvIHDFmWVqbWVub3ZhdCB6cMOhdGt5IG5hIG1vZGVsPyBuxJtqYWsgdG8gZG/FmWXFoWl0LCB2IGvDs2R1IHRvdGnFviBwb3XFvsOtdsOhbSBvYm9qZVxyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKVxyXG4gICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5EZXRhaWxEdG8sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCB0aGlzLnZhbGlkYXRvcnMpO1xyXG4gICAgICAgICAgICAvLyBuYXBsbsSbbsOtIGdyaWR1IHDFmWVka29udGFjw61cclxuICAgICAgICAgICAgaWYgKHRoaXMuRGV0YWlsRHRvKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KFt0aGlzLkRldGFpbER0b10sIHsgLyprZXk6IFwiaXhwLHJhZGVrX3BvbCxzdWJyYWRlayxyYWRla19hdlwiKi8gfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRncmlkUHJlZGtvbnRhY2UuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgLy8gdnlicsOhbsOtIG7Em2pha8OpIHBvbG/Fvmt5IHYgZ3JpZHUgcG9sb8W+ZWtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy52eWJyYW5pUG9sb3preSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIG5hcGxuxJtuw60gZ3JpZHUgcG9oeWLFryBqZSBhxb4gcG8gcm96a2xpa251dMOtIHRhYnVcclxuXHJcbiAgICAgICAgICAgIC8vIGJhZGdlXHJcbiAgICAgICAgICAgIC8vIFRPRE86IG5lY2hhdCB0byB6ZGUgbmVibyB0byBwxZllc3Vub3V0IGRvIG1ldG9keSBlbmFibGU/XHJcbiAgICAgICAgICAgIEZ1Y0RldGFpbC51cGRhdGVCYWRnZSh0aGlzLkJhZGdlUG9oeWJ5LCB0aGlzLkRldGFpbER0bz8ucG9jZXRfcG9oeWJ1KTtcclxuICAgICAgICAgICAgRnVjRGV0YWlsLnVwZGF0ZUJhZGdlKHRoaXMuQmFkZ2VVY3RQb2h5YnksIHRoaXMuRGV0YWlsRHRvPy5wb2NldF91Y3RfcG9oeWJ1KTtcclxuICAgICAgICAgICAgRnVjRGV0YWlsLnVwZGF0ZUJhZGdlKHRoaXMuQmFkZ2VSZXpQb2h5YnksIHRoaXMuRGV0YWlsRHRvPy5wb2NldF9yZXpfcG9oeWJ1KTtcclxuICAgICAgICAgICAgRnVjRGV0YWlsLnVwZGF0ZUJhZGdlKHRoaXMuQmFkZ2VQbGF0YnksIHRoaXMuRGV0YWlsRHRvPy5wb2NldF9wbGF0ZWIpO1xyXG5cclxuICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBzdGF2dSBwb2zDrcSNZWsgYSBha2PDrVxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdCwgamVzdGxpIGplIG1vxb5uw6kgb2tubyB6YXbFmcOtdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPEludGVyZmFjZS5HUHJpcGFkRHRvPiB8IEludGVyZmFjZS5HUHJpcGFkRHRvfSBwcm9taXNlIHMgZGF0eSAocmVzb2x2ZSA9IGplIG1vxb5uw6kgemF2xZnDrXQsIHJlamVjdCA9IG5lbsOtIG1vxb5uw6kgemF2xZnDrXQpIG5lYm8gcMWZw61tbyBib29sZWFuOyBib29sZWFuIHVyxI11amUsIGplc3RsaSBieWxhIG7Em2pha8OhIGFrdGl2bsOtIG9wZXJhY2UgKHRydWUpIG5lYm8gbmUgKGZhbHNlKSBuZWJvIHDFmcOtbW8gZGF0YSBkZXRhaWx1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoKTogSlF1ZXJ5UHJvbWlzZTxJbnRlcmZhY2UuR1ByaXBhZER0bz4gfCBJbnRlcmZhY2UuR1ByaXBhZER0byB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBrb250cm9sYSBuYSB6bcSbbsSbbsOpIHBvbG/Fvmt5XHJcbiAgICAgICAgICAgIGxldCBmb3JtQ2hhbmdlZCA9IHRoaXMuZmluZEZvcm1zKCkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBkb2RhdCBzcHLDoXZub3UgcG9kbcOtbmt1IC0gdSB6w6Fwb8SNdG92w71jaCBsaXN0xa8gamUgaWYgKCh0aGlzLkVkaXRhY2UgfHwgdGhpcy5KZVBvZGFuKSAmJiBmb3JtQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICBpZiAodHJ1ZSAmJiBmb3JtQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZG90YXogbmEgemF2xZllbsOtIGJleiB1bG/FvmVuw60sIHByb3Rvxb5lIHNlIG7Em2NvIHptxJtuaWxvXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBwb2t1ZCBieSBieWxvIHBvdMWZZWJhICh6YXTDrW0gc2UgbmV1a2zDoWTDoSksIHRhayBkb3ByYWNvdmF0XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5EZXRhaWxEdG87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwb2t1ZCBzZSBuZWVkaXR1amUsIGplIG1vxb5uw6kgZGV0YWlsIHphdsWZw610XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5EZXRhaWxEdG87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==