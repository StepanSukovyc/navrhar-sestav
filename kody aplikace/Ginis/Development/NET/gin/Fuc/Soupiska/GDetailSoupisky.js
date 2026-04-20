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
             * Detail Soupisky
             *
             * @author Martin Boček
             * @since 480.1.0.56
             */
            let GDetailSoupisky = class GDetailSoupisky extends Gordic.GDetailBuilderContent {
                constructor() {
                    super(...arguments);
                    /**
                     * Grid pohybů
                     * @type {JQuery | null}
                     */
                    this.$gridPohyby = null;
                    /**
                     * Grid účetních zápisů
                     * @type {JQuery | null}
                     */
                    this.$gridUctZapisy = null;
                    /**
                     * Grid dokladu o zaúčtování
                     * @type {JQuery | null}
                     */
                    this.$gridDokladyOZauc = null;
                    /**
                     * Grid zápisů dokladu o zaúčtování
                     * @type {JQuery | null}
                     */
                    this.$gridZapisyDokladuOZauc = null;
                    /**
                     * Grid rezervačních zápisů
                     * @type {JQuery | null}
                     */
                    this.$gridRezZapisy = null;
                }
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    // TODO: zkontrolovat podání soupisky - na den388 to vypadalo ok, ale nebyla v seznamu vidět - asi bude problém v zobrazení, protože v databázi je
                    let that = this;
                    if (this.ixpZadan() && (!this.DetailDto?.JePodana || this.DetailDto?.JeVJineAgende)) {
                        this.descProps_setup({
                            readOnly: false /*true*/,
                            //selectIxx: function (gridState) { /*zde vrátit promise s vybraným ixx - tj. nějaké zobrazení selectoru.*/ }
                        });
                    }
                    // zpřístupnění tlačítka pro uložení při změnách
                    this.element.off("fieldchange.detailSou");
                    this.element.on("fieldchange.detailSou", function (ev, ctx) {
                        const evidenceEnabled = that.Editace === true ? true : that.findForms().gform("hasChanged");
                        // TODO: dořešit permissions (agendové, dokumentové, vlastnosti?) - nebo to neřešit zde, ale až na serveru?
                        that.actions.actEvidenceSou.updatePermission((evidenceEnabled ? { value: true } : /*{ value: false }*/ (that.DetailDto.Permissions ? that.DetailDto.Permissions.LzeEvidovat : undefined)));
                    });
                    if (!this.ixpZadan())
                        // podání nové soupisky
                        this.podani();
                    else {
                        // jen nastavení okna
                        this.aktualizaceDetailu(true);
                    }
                    // flash se stavem knihy
                    Gordic.Eko.Utils.ShowEkoBookStateFlash(this, this.AktSubrady);
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
                    // definice akcí, tabů, kpi, menu apod.
                    builder.withComponent("detail", {
                        actions: {
                            // TODO: texty do resource
                            // TODO: přeformátovat na více řádků? sjednotit to všude, protože někde je to na jeden a někde na více řádků
                            // akce pro menubar
                            actPodaniSou: Gordic.Eko.Action.actionPodat({
                                run: function () { this.setPending(that.podani()); }
                            }),
                            actEvidenceSou: Gordic.Eko.Action.actionEvidovat({
                                run: function () { this.setPending(that.evidence()); }
                            }),
                            actOpravaSou: Gordic.Eko.Action.actionOpravit({
                                run: function () { that.oprava(); }
                            }),
                            actZrusitZmenySou: Gordic.Eko.Action.actionZrusitZmeny({
                                run: function () { that.oprava(); }
                            }),
                            actStornoSou: Gordic.Eko.Action.actionStornovat({
                                run: function () { this.setPending(that.storno()); }
                            }),
                            actZrusitStornoSou: Gordic.Eko.Action.actionZrusitStorno({
                                run: function () { this.setPending(that.storno()); }
                            }),
                            actSchvaleniSou: Gordic.Eko.Action.actionSchvalit({
                                run: function () { this.setPending(that.schvaleni()); }
                            }),
                            actZrusitSchvaleniSou: Gordic.Eko.Action.actionZrusitSchvaleni({
                                run: function () { this.setPending(that.schvaleni()); }
                            }),
                            actUzavreniSou: Gordic.Eko.Action.actionUzavrit({
                                run: function () { this.setPending(that.uzavreni()); }
                            }),
                            actZrusitUzavreniSou: Gordic.Eko.Action.actionZrusitUzavreni({
                                run: function () { this.setPending(that.uzavreni()); }
                            }),
                            actPredaniSou: Gordic.Eko.Action.actionPredat({
                                run: function () { this.setPending(that.predani()); }
                            }),
                            actPrevzetiSou: Gordic.Eko.Action.actionPrevzit({
                                run: function () { this.setPending(that.prevzeti()); }
                            }),
                            actPrideleniSou: Gordic.Eko.Action.actionPridelit({
                                run: function () { this.setPending(that.prideleni()); }
                            }),
                            actPreevidenceSou: Gordic.Eko.Action.actionPreevidovat({
                                run: function () { this.setPending(that.preevidence()); }
                            }),
                            actObcerstveniSou: Gordic.Eko.Action.actionObcerstvit({
                                run: function () { this.setPending(that.reloadData()); }
                            }),
                            // TODO: je vůbec nějaká sestava detailu soupisky? asi ne, když téma je pro knihu
                            //actTiskS: Gordic.Eko.Action.actionTisk({ name: "actTiskS", tema: "fuc_ptm_ksou", serverParameterMethod: "Gordic.Fuc.WebClient.GDetailSoupisky:PrintParameters", reportStarting: function (rep) { return that.reportStarting(rep); } }),
                            //actUzavreniSou: Gordic.Eko.Action.actionUzavrit({ run: function () { that.uzavreni(); } }),
                            actVraceniSouDoWfl: Gordic.Eko.Action.actionVratitDoWfl({
                                run: function () { this.setPending(that.vraceniDoWfl()); }
                            }),
                            actUctovaniSou: WebClient.FucActions.actionZauctovat({
                                run: function () { that.uctovani(); }
                            }),
                            actDiagnostikaSou: Gordic.Eko.Action.actionDiagnostika({
                                run: function () { this.setPending(that.diagnostika()); }
                            }),
                            // pohyby
                            actPohybySouDetail: Gordic.Eko.Action.actionDetail({
                                run: function () { this.setPending(that.detailPohybu()); }
                            }),
                            actPohybySouVlozeni: Gordic.Eko.Action.actionNovy({
                                caption: "Vložit",
                                run: function () { this.setPending(that.vlozeniPohybu()); }
                            }),
                            actPohybySouVyjmuti: Gordic.Eko.Action.actionOdstranit({
                                caption: "Vyjmout",
                                run: function () { this.setPending(that.vyjmutiPohybu()); }
                            }),
                            // doklady
                            actUctovaniSouTiskDokladu: Gordic.Eko.Action.actionTisk({
                                enabled: true,
                                name: "actUctovaniSouTiskDokladu",
                                tema: "fuc_ptm_engzau",
                                caption: "Doklad",
                                serverParameterMethod: "Gordic.Fuc.WebClient.GDetailSoupisky:PrintParameters",
                                reportStarting: function (rep) { return that.reportStarting(rep); },
                                reportGenerated: function () { return that.reportGenerated(); }
                            }),
                            actUctovaniSouTiskVsechDokladu: Gordic.Eko.Action.actionTisk({
                                enabled: true,
                                name: "actUctovaniSouTiskVsechDokladu",
                                tema: "fuc_ptm_engzau",
                                caption: "Všechny doklady",
                                serverParameterMethod: "Gordic.Fuc.WebClient.GDetailSoupisky:PrintParameters",
                                reportStarting: function (rep) { return that.reportStarting(rep, true); },
                                reportGenerated: function (rep) { return that.reportGenerated(true); }
                            }),
                            actUctovaniSouDokladOZauctovani: WebClient.FucActions.actionDokladOZauctovani({
                                run: function () { this.setPending(that.dokladOZauctovani()); }
                            }),
                            actUctovaniSouInfoOUctovani: {
                                caption: "jres:24100366",
                                icon: "gi-info",
                                enabled: false,
                                run: function () { this.setPending(that.historieUctovani()); }
                            }, //RC 24100366 : Informace o účtování
                            // pro KPI
                            //actTabPohyby: { caption: "Pohyby", enabled: true, run: function () { FucDetail.switchToGrpAndTab(that, "grpPohyby", "tabPohyby"); } }
                        },
                        tabGroups: [
                            Gordic.Prefabs.TabGroups.Agenda(),
                            { id: "grpPohyby", caption: "jres:24100453", badge: this.BadgePohyby }, //RC 24100453 : Pohyby
                            { id: "grpUctRez", caption: "jres:24100350", visible: that.DetailDto.JeZauctovana } //RC 24100350 : Účetní a rezervační zápisy
                        ],
                        menuBar: [
                            //["jres:24100044", // RC 24100044 : Agenda
                            "actPodaniSou*",
                            "actOpravaSou*",
                            "actZrusitZmenySou*",
                            "actEvidenceSou*",
                            "actSchvaleniSou*",
                            "actZrusitSchvaleniSou",
                            "actUctovaniSou*",
                            "actStornoSou",
                            "actZrusitStornoSou",
                            "actUzavreniSou",
                            "actZrusitUzavreniSou",
                            "actObcerstveniSou",
                            "actPredaniSou",
                            "actPrevzetiSou",
                            "actPrideleniSou",
                            "actPreevidenceSou",
                            "actVraceniSouDoWfl",
                            //"actTiskS*",
                            "actDiagnostikaSou",
                            //FucDetail.createMenuShare(that.Ixp)
                        ],
                        commandBar: [
                            // TODO: ! zatím není v menu v detailbuilderu podporován - až bude, tak to bude možné předělat (zde a na dalších místech)
                            //"actEvidenceSou!"
                            { action: "actEvidenceSou", primary: true }
                        ],
                        statusBar: [
                            Gordic.Eko.Detail.StatusBar.createUzo({ ixp: that.DetailDto.ixp, uzo: that.DetailDto.dokument?.uzo, readonly: that.DetailDto.ixs_fun_akt !== $.content("main").IxsFunAkt, globalSettings: this?.globalSettings }, () => that.setActiveOperationAndReloadData(true), { id: "statusBarUzo" }),
                            Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarStav" })
                        ],
                        //kpis: {
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
                            tabSoupiska: {
                                // základní údaje
                                tabParams: { title: "Soupiska", group: Gordic.Prefabs.TabGroups.Agenda(), opened: true, locked: false },
                                init: function (tab) {
                                    // doplnění prvků do tabu
                                    let form = new Gordic.Forms.Form({ name: "formSoupiska", layoutDescriptor: "L2M2S1" })
                                        .addSection("Primární agenda")
                                        .addRow("Agenda").addField("gselectbox", Gordic.Prefabs.Select.ginctag(), {
                                        disabled: true, name: "typ_ag", model: "typ_ag=typ_ag;zkr_ag=typ_ag_zkr", serverFilters: { typ_ag: Gordic.Fuc.Globals.Enums.TypAgFuc.TypAgPovoleneFuc },
                                        change: function (ev, changeObj) {
                                            that.findFields("priz_ne_akt_op_fuc").gfield("option", "disabled", (changeObj?.value?.typ_ag === Fuc.Globals.Enums.TypAg.FUC || changeObj?.value?.typ_ag === Fuc.Globals.Enums.TypAg.INT));
                                        }
                                    })
                                        .addRow("{0}, {1}".format(Gordic.Consts.DbShortcuts.nks ?? "NKS", Gordic.Consts.DbShortcuts.uus ?? "UUS")).addField("gstringbox", "w-6", { disabled: true, name: "nks" }).addField("gstringbox", "w-6", { disabled: true, name: "uus" })
                                        .addSection("Doplňující informace")
                                        .addRow("Částka").addField("gnumberbox", Gordic.Prefabs.Number.currency(), { disabled: true, name: "c_soup", emptyValue: null });
                                    tab.gform("createFrom", form);
                                }
                            },
                            tabVlastnosti: {
                                // vlastnosti
                                tabParams: { title: "Vlastnosti", group: Gordic.Prefabs.TabGroups.Agenda(), opened: false, locked: false },
                                init: function (tab) {
                                    // doplnění prvků do tabu
                                    let form = new Gordic.Forms.Form({ name: "formSoupiska", layoutDescriptor: "L2M2S1" /*"L1M1S1"*/ })
                                        // TODO: doplnit defaulty vlastností do DTO? asi ano, ať je to na jednom místě
                                        // TODO: změnit příznaky na typ (g)boolean? jinak se jich zaškrátávka nechytnou
                                        .addSection("Účtování")
                                        .addRow().addField("gcheck", { name: "priz_pov_uct_jedn", label: "Povoleno účtování jednotlivě" })
                                        .addRow().addField("gcheck", { name: "priz_pov_uct_hrom", label: "Povoleno účtování hromadně" })
                                        .addRow().addField("gcheck", { name: "priz_pov_uct_kum", label: "Povoleno účtování kumulovaně" })
                                        //.addPrefab(FucDetail.prefabPrizAnoNeDefault("priz_pov_uct_jedn", "Povoleno účtování jednotlivě", that.DetailDto.priz_pov_uct_jedn_def))
                                        //.addPrefab(FucDetail.prefabPrizAnoNeDefault("priz_pov_uct_hrom", "Povoleno účtování hromadně", that.DetailDto.priz_pov_uct_hrom_def))
                                        //.addPrefab(FucDetail.prefabPrizAnoNeDefault("priz_pov_uct_kum", "Povoleno účtování kumulovaně", that.DetailDto.priz_pov_uct_kum_def))
                                        //.addPrefab(FucDetail.prefabPrizAnoNeDefault("priz_uct_najednou", "Celou soupisku účtovat najednou"))
                                        //.addPrefab(FucDetail.prefabPrizAnoNeDefault("priz_kum_za_soup", "Kumulovat za soupisku"))
                                        //.addPrefab(FucDetail.prefabPrizAnoNeDefault("priz_kum_za_ixpupr", "Kumulovat za PID případu"))
                                        .addSection("Ostatní")
                                        .addRow().addField("gcheck", {
                                        name: "priz_aut_poc_c", label: "Automaticky aktualizovat částku soupisky",
                                        change: function (ev, changeObj) {
                                            that.findFields("c_soup").gfield("option", "disabled", (changeObj?.value === true));
                                        }
                                    })
                                        .addRow().addField("gcheck", { name: "priz_ne_akt_op_fuc", label: "Zakázat aktivní operace se soupiskou ve FUC", tooltip: "Aktivní operace se soupiskami agend FUC a INT jsou vždy povoleny a není je možné zakázat" });
                                    //.addPrefab(FucDetail.prefabPrizAnoNeDefault("priz_aut_poc_c", "Automaticky aktualizovat částku soupisky", that.DetailDto.priz_aut_poc_c_def))
                                    //.addPrefab(FucDetail.prefabPrizAnoNeDefault("priz_ne_akt_op_fuc", "Zakázány aktivní operace se soupiskou ve FUC", that.DetailDto.priz_ne_akt_op_fuc_def))
                                    //.addSection("Ostatní")
                                    //.addPrefab(FucDetail.prefabPrizAnoNeDefault("priz_stav_fin_kont", "Používat stavy finanční kontroly"))
                                    //.addPrefab(FucDetail.prefabPrizAnoNeDefault("priz_sch_pres_epk", "Schvalovat soupisku přes EPK"));
                                    tab.gform("createFrom", form);
                                }
                            },
                            tabPohyby: {
                                // pohyby
                                initLazy: true,
                                tabParams: {
                                    title: "jres:24100185", //RC 24100185 : Účetní pohyby
                                    group: { id: "grpPohyby" },
                                    opened: true,
                                    locked: false,
                                    disabled: that.DetailDto.JePodana,
                                    menuBar: ["actPohybySouDetail*", "actPohybySouVlozeni*", "actPohybySouVyjmuti*"],
                                    badge: { params: this.BadgePohyby },
                                    customLoad: function () {
                                        // načtení pohybů
                                        that.loadPohyby();
                                    }
                                },
                                init: function (tab) {
                                    // přidání gridů pohybů do tabu
                                    that.$gridPohyby = $.newDiv()
                                        .css("height", "100%")
                                        .appendTo(tab)
                                        .ggrid({
                                        name: "gridPohyby",
                                        // TODO: grid dodělat
                                        columnMode: "full", // fit (defaultne by melo byt toto), full
                                        defaultAction: that.actions.actDetailPohybu,
                                        //searchColumns: ["vs", "c", "typ_ag", "ac"],
                                        columns: WebClient.FucGrid.Pohyb.createGridFormat(that, Gordic.Fuc.Globals.Enums.TypSezPoh.PohybySoupisky),
                                        defaultProfile: {
                                            columnList: "ixp_upr,radek_upo,typ_upo_txt,s_upo_txt,s_sto_txt,ktg_upo_txt,znam_txt,c_upo,popis_upo,subjekt.nazev,dat_upo,dat_zauc,obd_dan,subrada_duz,priz_dd_txt"
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
                                    // případný flash s informací o jiném roku
                                    if (that.Rok != that.DetailDto.rok)
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
                                    visible: that.DetailDto.JeZauctovana,
                                    //menuBar: ["actUctovaniSouTiskPohybu*"],
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
                                        columns: WebClient.FucGrid.Zapis.createGridFormatN(that, { drd: true, datum: true, pripad: true, pohyb: true, dph: true })
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
                                    visible: that.DetailDto.JeZauctovana,
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
                                        columns: WebClient.FucGrid.Zapis.createGridFormatN(that, { drd: true, datum: true, pripad: true, pohyb: true })
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
                                    visible: that.DetailDto.JeZauctovana,
                                    menuBar: ["actUctovaniSouTiskDokladu*", "actUctovaniSouTiskVsechDokladu*", "actUctovaniSouDokladOZauctovani*", "actUctovaniSouInfoOUctovani*"],
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
                                        .gform("createFrom", new Gordic.Forms.Form("L1M1S1").addSection( /*"Doklad"*/ /*"Doklad o zaúčtování"*/));
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
                                    // zápisy pohybu/dokladu
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
                                    //    // další pohyby z dokladu
                                    //    // TODO: dát sem akci na detail pohybu?
                                    //    $.newDiv()
                                    //        .appendTo(tab)
                                    //        .gform("createFrom", new Gordic.Forms.Form("L1M1S1").addSection("Další pohyby dokladu"));
                                    //    that.$gridOstPohybyDokladuOZauc = $.newDiv()
                                    //        .appendTo(tab)
                                    //        .ggrid<Gordic.Fuc.Interface.GPohybDto>({
                                    //            columnMode: "full",
                                    //            // TODO: upravit:
                                    //            //searchColumns: ["ac_ag", "ac", "ico_esu", "rc_esu", "nazev_esu"],
                                    //            columns: FucGrid.Pohyb.createGridFormat(that, Gordic.Fuc.Globals.Enums.TypSezPoh.UcetniPohyby),
                                    //            //cellActivate: function (ev, obj) {
                                    //            //    // načtení zápisů aktuálního dokladu
                                    //            //    if (obj.cellInfo) that.nacteniSeznamuZapisu();
                                    //            //}
                                    //        });
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
                    // úprava třetí sekce (položky a stav místo kompetenta a realizátora)
                    const formSetup = {};
                    const headerForm = new Gordic.Forms.Form({ name: "formHeader" })
                        .addSection()
                        .addRow("jres:24100312").addField("gselectbox", Gordic.Prefabs.Select.fuccsso(), {
                        disabled: true,
                        model: "s_soup=s_soup;s_soup_txt=s_soup_txt"
                    });
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data2] = {
                        rows: [
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.Zpracovatel)[0]?.item, // zpracovatel
                            headerForm.form.sections[0].rows[0] // stav
                        ]
                    };
                    // vlastní nastavení prvků (převážně model). pozor, nesmí se měnit name
                    // jiný prefab pro knihu
                    formSetup[Gordic.Eko.HeaderForm.Fields.Kniha] = { options: $.extend(Gordic.Prefabs.Select.ekosden(Gordic.Fuc.Globals.Enums.TypAg.FUC), { model: "ixp_den=ixp_den", serverFilters: { ktg_den: [Gordic.Fuc.Globals.Enums.KtgDen.Soupisky], typ_ag: Gordic.Fuc.Globals.Enums.TypAg.FUC, rok: that.Rok }, }) };
                    formSetup[Gordic.Eko.HeaderForm.Fields.TypDokladu] = {
                        options: {
                            //flag: Gordic.Prefabs.Field.Flags.required,
                            //dropdown: true,
                            //model: "ixs_typ=ixs_typ;ixs_typ_txt=nazev;ktg_typ=ktg_typ",
                            //serverFilters: { ktg_typ: [Gordic.Fuc.Globals.Enums.KtgTypZL.Jednostranny, Gordic.Fuc.Globals.Enums.KtgTypZL.Oboustranny] },
                            //change: function (ev, changeObj) {
                            //    that.zmenaKtgTyp(changeObj.value!.ktg_typ);
                            //}
                            //disabled: true,
                            dropdown: true,
                            model: "ixs_typ=ixs_typ;ixs_typ_txt=nazev;ktg_typ=ktg_typ",
                            serverFilters: { ktg_typ: [Gordic.Fuc.Globals.Enums.KtgTyp.SoupiskaPohybu] },
                        }
                    };
                    formSetup[Gordic.Eko.HeaderForm.Fields.DatumEvidence] = { options: { valueType: "date" } };
                    formSetup[Gordic.Eko.HeaderForm.Fields.Zpracovatel] = { options: { model: "ixs_fun_akt=ixs_fun;ixs_fun_txt=nazev;ixs_fun_ref_txt=nazev_ref;ixs_fun_su_txt=nazev_su" } };
                    //formSetup[Gordic.Eko.HeaderForm.Fields.Popis] = { options: { model: "popis" } } as Forms.FormField;
                    formSetup[Gordic.Eko.HeaderForm.Fields.Popis] = { options: Gordic.Eko.Detail.Field.getCounterOptions(254 /* Fuc.Interface.GSoupiskaDtoTypeLengths.popis */) };
                    // jiný label pro datum
                    //formSetup[Gordic.Eko.HeaderForm.Rows.DatumEvidence] = { label: "jres:24100030" } as Forms.FormRow; //RC 24100030 : Datum UÚP
                    // aktualizace hlavičky
                    Gordic.Eko.HeaderForm.setup(builder, formSetup);
                    // úprava WFL/SSL komponent
                    Gordic.Ssl.DetailBuilderComponents.SslProfilDokumentEko.setTabsInitLazy(builder);
                    Gordic.Eko.Detail.changeDetailBuilderWflForEkoDefinitions(builder, (this.DetailDto?.JePodana && !this.DetailDto?.JeVJineAgende) ?? false /*, "menuTiskS"*/);
                    // šipky pro posun po seznamu
                    if ((!this.DetailDto?.JePodana || this.DetailDto?.JeVJineAgende))
                        this.listControls_setup({
                            rowToDto: function (gridState) {
                                return [
                                    (gridState.currentRow != null ? Gordic.Eko.Utils.createBookGpc(that.gpc, gridState.currentRow.data.ixp_den) : that.gpc),
                                    {
                                        Ixp: gridState.currentRow.data.ixp,
                                        //IxpDen: that.IxpDen,
                                        NasledujiciDetail: true
                                    }
                                ];
                            },
                            nextItemTemplate: "jres:24100031", //RC 24100031 : Následující: {ixp} <br> {ac_ag:trim} - {ac:trim} <br> {popis:trim:encode}
                            prevItemTemplate: "jres:24100032", //RC 24100032 : Předchozí: {ixp} <br> {ac_ag:trim} - {ac:trim} <br> {popis:trim:encode}
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
                 * Podání soupisky
                 */
                podani() {
                    let that = this;
                    // kontrola na knihu
                    if (!that.knihaZadana())
                        return $.Deferred().reject().promise();
                    // TODO: bude nutné řešit výběr knihy v režimu přes více knih (musí to být první část ještě před kontrolou na první doklad) - nebo v tomto režimu podání nepůjde
                    // kontrola prvního dokladu v knize
                    return that.isl.FinPohybSoupiska.zkontrolujNaPrvniDokladVKnize({ ixpDen: that.gpc.ixp_den /*IxpDen*/ /*, subrada: that.SubradaDen*/ })
                        .get()
                        .then(function (textDotazu) {
                        // pokud kontrola vrátí dotaz, tak se zeptat, jestli má první doklad správné číslo, jinak je to ok
                        if (textDotazu)
                            return that.dialogs.confirm("jres:24100321", textDotazu).createDialogPromise(GDlg.mbbYes.id); //RC 24100321 : Nová soupiska
                        else
                            return $.Deferred().resolve();
                    })
                        .then(function () {
                        // případné sejmutí PIDu
                        // TODO: dořešit, jak používat gin_gen_ixp - buď to dát jako proměnnou (bez globals) nebo to nechat v globals, ale pak musí být ten objekt asi jinak
                        if ((Gordic.Eko.Utils.GetEkoUserSettingsPidSejmuti(that, (that.gin_gen_ixp === Gordic.Fuc.Globals.Enums.RezimGenIxp.Generovani ? "ano" : "ne")) === "1")) {
                            // sejmutí PIDu
                            //if (that/*Gordic.Fuc.Globals.GFucGlobals*/.gin_gen_ixp === Gordic.Fuc.Globals.Enums.RezimGenIxp.Sejmuti/*.toString()*/ && returnObj.podat) {
                            // režim sejmutí PIDu (ve volaném okně ale je možné PID i vygenerovat)
                            // TODO: generování PIDu v této metodě nejsem schopen zakázat a podací procedura si s tím neporadí
                            // TODO: jde potlačit hláška, že PID již existuje? asi ano a bylo by to žádoucí - asi vlastnost HlaseniPriExistenciVAgende (muselo by se asi přidat , true, false)
                            return Gordic.Wfl.Dialogs.GenerovaniIxp(that, {
                                TypDok: Gordic.Wfl.Globals.Enums.TypDok.Vlastni,
                                TypId: Gordic.Wfl.Globals.Enums.TypId.IXP,
                                DotazPriExistenciVJineAgende: true,
                                HlaseniPriExistenciVAgende: false,
                                ZpusobGenerovani: Gordic.Wfl.Globals.Enums.ZpusobGenerovaniIxp.Stitkem
                            }, Gordic.Global.Enums.ModOtevreni.showModalWindow)
                                .then(function (retVal) {
                                // pokud se vrátil PID, použiji ho, jinak konec
                                if (retVal?.Ixp)
                                    return retVal.Ixp;
                                else
                                    return $.Deferred().reject();
                            });
                        }
                        // PID se bude generovat (až v podání v dalším kroku)
                        else
                            return $.Deferred().resolve();
                    })
                        .then(function (ixp) {
                        // vlastní podání
                        return that.isl.FinPohybSoupiska.create({
                            ixp: (ixp ?? ""),
                            ixp_den: that.gpc.ixp_den /*IxpDen*/
                        })
                            .getData()
                            .then(function (data) {
                            return data.ixp;
                        });
                    })
                        .done(function (ixp) {
                        // vyvolání trigger o aktivní operaci
                        that.trigger(WebClient.FucDetail.triggerChange, [{ data: { ixp: ixp } }]);
                        // aktualizace dat - vždy znovunačtení detailu, protože se mění PID
                        that.load({
                            Ixp: ixp,
                            NasledujiciDetail: true
                        });
                    })
                        .fail(function () {
                        // obnovení původního stavu
                        if (that.ixpZadan()) {
                            // zobrazení detailu původního PIDu
                            that.load();
                        }
                        else {
                            // zavření okna (vrací se aktuální data)
                            that.close(that.DetailDto);
                        }
                    });
                }
                /**
                 * Evidence (uložení změn) soupisky
                 *
                 * @param {boolean} fromClosing (default = false) způsob volání (false = standardní uložení tlačítkem, true = ze zavření detailu s neuloženými daty)
                 * @returns {JQueryPromise<any>} promise
                 */
                evidence(fromClosing = false) {
                    let that = this;
                    // validace formuláře
                    // TODO: bude potřeba doplnit ještě další validace podle WinClienta
                    // TODO: ta kontrola podle validátorů z DTO možná nějak nefunguje - ještě vyzkoušet, protože v okně pro částky validátory normálně fungují
                    if (!this.element.findForms().gform("isValid"))
                        return $.Deferred().reject().promise();
                    // sebrání hodnot z formuláře
                    let aktData = {};
                    this.findFields().gfield("model", "collect", aktData);
                    // dokument a vlastnosti
                    let dokument = undefined;
                    let vlastnosti = undefined;
                    if (!(this.DetailDto?.JePodana)) {
                        // dokument
                        if (Gordic.Eko.Utils.DokumentHasChanged(this)) {
                            dokument /*: GDokumentDto*/ = $.extend(true, {}, this.saveEkoProfil(), this.saveSslDetailDoruceniEko ? this.saveSslDetailDoruceniEko() : {});
                            dokument.ixs_typ = dokument.ixs_typ ?? that.DetailDto.dokument?.ixs_typ;
                            dokument.nazev = dokument.nazev ?? that.DetailDto.dokument?.nazev;
                            dokument.st_utaj_id = dokument.st_utaj_id ?? that.DetailDto.dokument?.st_utaj_id;
                            dokument.ixs_fun_akt = dokument.ixs_fun_akt ?? that.DetailDto.dokument?.ixs_fun_akt;
                        }
                        // vlastnosti
                        if (Gordic.Eko.Utils.VlastnostiHasChanged(this)) {
                            vlastnosti = Gordic.PopisneVlastnosti.collectValues(this);
                        }
                    }
                    // volání evidence
                    //that.beginOperation();
                    const prom = that.isl.FinPohybSoupiska.update({
                        ixp: that.Ixp,
                        ac: aktData.ac,
                        ac_ag: aktData.ac_ag,
                        ixs_typ: aktData.ixs_typ,
                        ktg_typ: aktData.ktg_typ,
                        ixp_den: that.gpc.ixp_den /*IxpDen*/,
                        //subrada: 0/*that.SubradaDen*/,
                        dat_evid: aktData.dat_evid,
                        popis: aktData.popis,
                        c_soup: aktData.c_soup,
                        s_soup: aktData.s_soup,
                        typ_ag: aktData.typ_ag,
                        priz_pov_uct_jedn: aktData.priz_pov_uct_jedn,
                        priz_pov_uct_hrom: aktData.priz_pov_uct_hrom,
                        priz_pov_uct_kum: aktData.priz_pov_uct_kum,
                        //priz_uct_najednou: aktData.priz_uct_najednou,
                        //priz_kum_za_soup: aktData.priz_kum_za_soup,
                        //priz_kum_za_ixpupr: aktData.priz_kum_za_ixpupr,
                        priz_aut_poc_c: aktData.priz_aut_poc_c,
                        priz_ne_akt_op_fuc: aktData.priz_ne_akt_op_fuc,
                        //priz_stav_fin_kont: aktData.priz_stav_fin_kont,
                        //priz_sch_pres_epk: aktData.priz_sch_pres_epk,
                        ixs_fun_akt: aktData.ixs_fun_akt,
                        dat_zmena: that.DetailDto.dat_zmena,
                        dokument: dokument,
                        vlastnosti: vlastnosti
                    })
                        .get();
                    //.done(function () {
                    //    // TODO: zpracovávat výsledek?
                    //    // úspěšně dokončeno
                    //    if (!fromClosing) that.actions.actEvidenceSou!.setPending(100);
                    //})
                    //.fail( function () {
                    //    // skončilo chybou
                    //    if (!fromClosing) that.actions.actEvidenceSou!.setPending(-1);
                    //})
                    //.always(() => {
                    //    that.endOperation();
                    //});
                    // aktualizace dat
                    return prom.then(() => { return that.setActiveOperationAndReloadData(fromClosing); });
                }
                /**
                 * Oprava soupisky (včetně zrušení opravy)
                 */
                oprava() {
                    // TODO: předělat, aby metoda vracela promise?
                    if (!this.Editace) {
                        // zapnutí režimu editace
                        this.Editace = true;
                        // nastavení okna
                        this.enable();
                        // nastavení fokusu
                        GDbd.getElementToFocus(this.element, ".gfield:not(.ui-state-disabled)")?.first().trigger("focus");
                    }
                    else {
                        // zapnutí režimu editace
                        this.Editace = false;
                        // načtení původních dat (pokud bylo něco změněno)
                        if (this.findForms().gform("hasChanged")) {
                            // aktualizace detailu
                            this.aktualizaceDetailu();
                        }
                        else {
                            // jen nastavení okna
                            this.enable();
                        }
                    }
                }
                /**
                 * Storno / zrušení storna soupisky
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                storno() {
                    let that = this;
                    return WebClient.FucDetail.runIslActionWithReason(this, that.DetailDto.JeStornovana
                        ? "jres:24100266" //RC 24100266 : Opravdu chcete zrušit storno soupisky?
                        : "jres:24100267", //RC 24100267 : Opravdu chcete stornovat soupisku?
                    (data) => { return that.isl.FinPohybSoupiska.stornuj({ stornovat: !that.DetailDto.JeStornovana, duvod: data.duvod, rows: [that.DetailDto] }); }, () => { return that.setActiveOperationAndReloadData(); }, that.DetailDto.JeStornovana ? this.actions.actZrusitStornoSou : this.actions.actStornoSou);
                }
                /**
                 * Schválení / zrušení schválení soupisky
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                schvaleni() {
                    let that = this;
                    return WebClient.FucDetail.runIslActionWithConfirm(this, that.DetailDto.JeSchvalena
                        ? "jres:24100268" //RC 24100268 : Opravdu chcete zrušit schválení soupisky?
                        : "jres:24100269", //RC 24100269 : Opravdu chcete schválit soupisku?
                    () => { return that.isl.FinPohybSoupiska.schval({ rows: [that.DetailDto], schvalit: !that.DetailDto.JeSchvalena }); }, () => { return that.setActiveOperationAndReloadData(); }, that.DetailDto.JeSchvalena ? this.actions.actZrusitSchvaleniSou : this.actions.actSchvaleniSou);
                }
                /**
                 * Uzavření / zrušení uzavření soupisky
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                uzavreni() {
                    let that = this;
                    return WebClient.FucDetail.runIslActionWithConfirm(this, that.DetailDto.JeUzavrena
                        ? "jres:24100270" //RC 24100270 : Opravdu chcete zrušit uzavření soupisky?
                        : "jres:24100271", //RC 24100271 : Opravdu chcete uzavřít soupisku?
                    () => { return that.isl.FinPohybSoupiska.uzavri({ rows: [that.DetailDto], uzavrit: !that.DetailDto.JeUzavrena }); }, () => { return that.setActiveOperationAndReloadData(); }, that.DetailDto.JeUzavrena ? this.actions.actZrusitUzavreniSou : this.actions.actUzavreniSou);
                }
                /**
                 * Předání soupisky
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                predani() {
                    let that = this;
                    return WebClient.FucDetail.runIslActionWithForm(this, { form: WebClient.FucDoklad.getFormPredani(Fuc.Globals.Enums.KtgDen.Soupisky, $.content("main").IxsFunAkt, that.IxsSu, that.gpc.ixp_den /*IxpDen*/) }, (data) => { return that.isl.FinPohybSoupiska.predej(WebClient.FucDoklad.ToPredaniOperationDto([that.DetailDto], data)); }, () => { return that.setActiveOperationAndReloadData(); }, that.actions.actPredaniSou);
                }
                /**
                 * Převzetí soupisky
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                prevzeti() {
                    let that = this;
                    return WebClient.FucDetail.runIslActionWithForm(this, { form: WebClient.FucDoklad.getFormPrevzeti($.content("main").IxsFunAkt) }, (data) => { return that.isl.FinPohybSoupiska.prevezmi(WebClient.FucDoklad.ToPrevzetiOperationDto([that.DetailDto], data)); }, () => { return that.setActiveOperationAndReloadData(); }, that.actions.actPrevzetiSou);
                }
                /**
                 * Přidělení soupisky
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                prideleni() {
                    let that = this;
                    return WebClient.FucDetail.runIslActionWithForm(this, { form: WebClient.FucDoklad.getFormPrideleni(Fuc.Globals.Enums.KtgDen.Soupisky, $.content("main").IxsFunAkt, that.IxsSu, that.gpc.ixp_den /*IxpDen*/) }, (data) => { return that.isl.FinPohybSoupiska.pridel(WebClient.FucDoklad.ToPrideleniOperationDto([that.DetailDto], data)); }, () => { return that.setActiveOperationAndReloadData(); }, that.actions.actPrideleniSou);
                }
                /**
                 * Přeevidence soupisky
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                preevidence() {
                    let that = this;
                    return WebClient.FucDetail.runIslActionWithForm(this, { form: WebClient.FucDoklad.getFormPreevidence(Fuc.Globals.Enums.KtgDen.Soupisky, that.gpc.ico, that.gpc.ucs, that.IxsSu, that.Rok, that.gpc.ixp_den /*IxpDen*/) }, (data) => { return that.isl.FinPohybSoupiska.preeviduj(WebClient.FucDoklad.ToPreevidenceOperationDto([that.DetailDto], data)); }, () => { return that.setActiveOperationAndReloadData(); }, that.actions.actPreevidenceSou);
                }
                /**
                 * Vrácení soupisky do WFL vrstvy
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                vraceniDoWfl() {
                    let that = this;
                    return WebClient.FucDetail.runIslActionWithReason(this, "jres:24100323", //RC 24100323 : Opravdu chcete soupisku vrátit do WFL?
                    (data) => { return that.isl.FinPohybSoupiska.vratDoWfl({ rows: [that.DetailDto], vratit: true, duvod: data.duvod }); }, () => { return that.setActiveOperationAndReloadData(); }, that.actions.actVraceniSouDoWfl);
                }
                /**
                 * Účtování pohybů soupisky
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                uctovani() {
                    let that = this;
                    // TODO: dodělat správné plnění parTypUctovani a parKumulaceZaIxp
                    //let parTypUctovani: Gordic.Fuc.Globals.Enums.TypUct | undefined = Gordic.Fuc.Globals.Enums.TypUct.Jednotlive;
                    //let parKumulovatZaIxp: boolean = false;
                    // průvodce pro účtování
                    const prom = this.call("VlozitDoPracSeznamu")
                        .then(function (ikc) {
                        // okno účtování
                        return that.navigate("Gordic.Fuc.WebClient.GUctovaniPohybu", {
                            ID: 'UctovaniPohybu#',
                            Ikc: ikc,
                            // TODO: dořešit parametry
                            //TypUctovani: parTypUctovani,
                            //KumulovatZaIxp: parKumulovatZaIxp,
                            //PevTypUctovani: undefined,
                            PevTypUctAno: false,
                            UctPoh: Fuc.Globals.Enums.UctPoh.Soupisky
                        }, { title: "jres:24100210" } //RC 24100210 : Účtování
                        )
                            .createDialogPromise();
                    })
                        .then(function (data) {
                        // smazání pracovní tabulky (pouze, pokud nebylo spuštěno odložené účtování)
                        if (data?.uctovanoOdlozene === true) {
                            // vrací se vždy true, protoože v complete je v tomto případě false
                            return $.Deferred().resolve(true);
                        }
                        else {
                            return that.call("SmazatPracSeznam").
                                then(function () {
                                return data?.complete === true;
                            });
                        }
                    })
                        .then(function (complete) {
                        // vyhodnocení výsledku
                        // TODO: (zatím) nechodí informace o aktivní operaci, tak se to přeselektovává vždy
                        /*if (complete === true) */ return complete;
                        //else return $.Deferred().reject();
                    })
                        .done(function (complete) {
                        // úspěšně dokončeno
                        that.actions.actUctovaniSou.setPending(complete === true ? 100 : -1);
                    })
                        .fail(function () {
                        // skončilo chybou
                        that.actions.actUctovaniSou.setPending(-1);
                    });
                    // aktualizace dat
                    return prom.then(() => { return that.setActiveOperationAndReloadData(); });
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
                    return that.isl.FinPohyb.list(rq => { return { filters: { ixp: that.DetailDto.ixp } }; })
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
                 * Nahrání a zobrazení účetních zápisů soupisky
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadUctZapisy() {
                    let that = this;
                    // TODO: dořešit aktuální rok x rok pohybu - pro jiný natáhnout jinou konfiguraci nebo zobrazení úplně zakázat?
                    // načtení zápisů
                    that.beginOperation("jres:24100492"); //RC 24100492 : Probíhá načtení zápisů
                    return that.isl.Zapis.list(rq => {
                        return {
                            filters: {
                                z_pohybu: 1,
                                //ze_soupisky: 1,
                                upo_ixp: that.DetailDto.ixp
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
                    return that.isl.Zapis.listDokladu(rq => { return { filters: { ze_soupisky: 1, upo_ixp: that.DetailDto.ixp } }; })
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
                                //ze_soupisky: 1,
                                upo_ixp: that.DetailDto.ixp
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
                 * Zobrazí detail vybraného pohybu
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detailPohybu() {
                    let that = this;
                    // aktuální vybraná položka
                    let aktRadek = Gordic.Eko.Grid.currentRow(this.$gridPohyby);
                    if (aktRadek) {
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
                 * Vložení pohybů na soupisku
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                vlozeniPohybu() {
                    let that = this;
                    return WebClient.FucDetail.runIslActionWithPromise /*<Gordic.Fuc.Interface.GPohybDto[], Isl.GServiceGroupRequest<Fuc.Interface.GPohybVlozeniDoSoupiskyOperationDto>, Isl.GServiceGroupResponse<Fuc.Interface.GPohybPkDto>>*/(this, that.isl.FinPohyb.list(rq => {
                        return {
                            filters: {
                                s_upo: Gordic.Fuc.Globals.Enums.SUpo.Nezauctovany,
                                s_sto: Gordic.Fuc.Globals.Enums.SSto.Nestornovano,
                                typ_upo: [Gordic.Fuc.Globals.Enums.TypUpo.UcetniAutomaticky, Gordic.Fuc.Globals.Enums.TypUpo.UcetniStorno, Gordic.Fuc.Globals.Enums.TypUpo.UcetniPoloautomaticky, Gordic.Fuc.Globals.Enums.TypUpo.UcetniRucni, Gordic.Fuc.Globals.Enums.TypUpo.Neucetni],
                                rok: that.DetailDto.rok,
                                bez_soupisky: true /*""*/ /*null*/,
                                huf_neuctovane: true
                            }
                        };
                    })
                        .getData()
                        .then(function (list /*: Gordic.Fuc.Interface.GPohybDto[] | null*/) {
                        // výběr položky z načteného seznamu s kontrolou a případnou upravou částky
                        const gridFormat = WebClient.FucGrid.Pohyb.createGridFormat(that, Fuc.Globals.Enums.TypSezPoh.Uctovani, true, false);
                        return new Gordic.Data.Selectors.DefaultSelector({
                            data: list ?? [],
                            gridFormat: gridFormat,
                            title: "jres:24100369", //RC 24100369 : Výběr pohybů pro vložení do soupisky
                            multi: /*false*/ true,
                            canSelectEmpty: false,
                            related: that.element,
                            gridOpts: {
                                columnMode: "full",
                                // TODO: až bude dořešeno, v jakých sloupcích se hledá, tak upravit i tento seznam (třeba na to udělat společnou metodu)
                                //searchColumns: gridFormat.columns.map(e => "*" + e.name)
                                defaultProfile: {
                                    // podle výchozího pohledu z FucGrid.Pohyb.getGridOptions
                                    columnList: "ixp_upr,radek_upo,typ_upo_txt,s_upo_txt,s_sto_txt,ktg_upo_txt,znam_txt,c_upo,popis_upo,subjekt.esu_txt,dat_upo,dat_zauc,obd_dan,subrada_duz,priz_dd_txt".replace(/\./gi, Gordic.Gin.WebClient.GSharedIsl.NameSeparator)
                                }
                            },
                            userSettings: "defaultSelectors.VyberPohybu",
                            isolatedUserSettings: true,
                        })
                            .show({ width: 1000, height: 600 })
                            .then(function (returnValue) {
                            if (returnValue != null /* && !(returnValue instanceof Array)*/) {
                                // pohyb byl vybrán
                                return !(returnValue instanceof Array) ? [returnValue] : returnValue;
                            }
                            else
                                return $.Deferred().reject();
                        });
                    }), (data) => {
                        // vložení položky na zápočtový list
                        // TODO: přidat více pohybů nejde, protože nemám IKC - pokud by to bylo potřeba, tak to dodělat
                        return that.isl.FinPohyb.hromadneVlozDoSoupisky /*vlozDoSoupisky*/({
                            ixp: that.Ixp,
                            vlozit: true,
                            rows: data
                        });
                    }, () => { return that.setActiveOperationAndReloadData(); }, that.actions.actPohybySouVlozeni);
                    //    const prom = that.isl.FinPohyb.list(rq => {
                    //        return {
                    //            filters: {
                    //                s_upo: Gordic.Fuc.Globals.Enums.SUpo.Nezauctovany,
                    //                // TODO: je potřeba dořešit storno pohybů v soupisce a pak podle toho případně upravit tyto podmínky a také podmínky na účtování pohybů soupisek a kontrolu celých soupisek před účtováním a také upravit storno pohybů
                    //                //s_sto: Gordic.Fuc.Globals.Enums.SSto.Nestornovano,
                    //                typ_upo: [Gordic.Fuc.Globals.Enums.TypUpo.UcetniAutomaticky, Gordic.Fuc.Globals.Enums.TypUpo.UcetniStorno, Gordic.Fuc.Globals.Enums.TypUpo.UcetniPoloautomaticky, Gordic.Fuc.Globals.Enums.TypUpo.UcetniRucni, Gordic.Fuc.Globals.Enums.TypUpo.Neucetni],
                    //                rok: that.DetailDto.rok,
                    //                bez_soupisky: true/*""*//*null*/,
                    //                huf_neuctovane: true
                    //            }
                    //        };
                    //    })
                    //        .getData()
                    //        .then(function (data) {
                    //            return data;
                    //        })
                    //        .then(function (data: Gordic.Fuc.Interface.GPohybDto[] | null) {
                    //            // výběr položky z načteného seznamu s kontrolou a případnou upravou částky
                    //            const gridFormat = FucGrid.Pohyb.createGridFormat(that, Globals.Enums.TypSezPoh.UcetniPohyby, true, false);
                    //            return new Gordic.Data.Selectors.DefaultSelector<Gordic.Fuc.Interface.GPohybDto>({
                    //                data: data ?? [],
                    //                gridFormat: gridFormat,
                    //                title: "jres:24100369", //RC 24100369 : Výběr pohybů pro vložení do soupisky
                    //                multi: /*false*/true,
                    //                canSelectEmpty: false,
                    //                related: that.element,
                    //                gridOpts: {
                    //                    columnMode: "full",
                    //                    // TODO: až bude dořešeno, v jakých sloupcích se hledá, tak upravit i tento seznam (třeba na to udělat společnou metodu)
                    //                    //searchColumns: gridFormat.columns.map(e => "*" + e.name)
                    //                } as GGridOptions<any>,
                    //                userSettings: "defaultSelectors.VyberPohybu",
                    //                isolatedUserSettings: true,
                    //            })
                    //                .show({ width: 1000, height: 600 })
                    //                .then(function (returnValue) {
                    //                    if (returnValue != null/* && !(returnValue instanceof Array)*/) {
                    //                        // pohyb byl vybrána
                    //                        return !(returnValue instanceof Array) ? [returnValue] : returnValue;
                    //                    }
                    //                    else return $.Deferred().reject();
                    //                });
                    //        })
                    //        .then(function (pohyby: Gordic.Fuc.Interface.GPohybDto[] | undefined | null) {
                    //            // vložení položky na zápočtový list
                    //            if (pohyby) {
                    //                // TODO: přidat více pohybů nejde, protože nemám IKC - pokud by to bylo potřeba, tak to dodělat
                    //                return that.isl.FinPohyb.hromadneVlozDoSoupisky/*vlozDoSoupisky*/({
                    //                    ixp: that.Ixp,
                    //                    vlozit: true,
                    //                    rows: pohyby
                    //                })
                    //                    .get()
                    //                    .then(function (ret) {
                    //                        return;
                    //                    });
                    //            }
                    //            else return $.Deferred().reject();
                    //        });
                    //    //.done(function () {
                    //    //    // TODO: zpracovávat výsledek?
                    //    //    // úspěšně dokončeno
                    //    //    that.actions.actPohybySouVlozeni!.setPending(100);
                    //    //})
                    //    //.fail(function () {
                    //    //    // skončilo chybou
                    //    //    that.actions.actPohybySouVlozeni!.setPending(-1);
                    //    //});
                    //    // aktualizace dat
                    //    return prom.then(() => { return that.setActiveOperationAndReloadData(); });
                }
                /**
                 * Vyjmutí vybraného pohybu ze soupisky
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                vyjmutiPohybu() {
                    let that = this;
                    // aktuální vybraný pohyb
                    let aktPoh = Gordic.Eko.Grid.currentRow(this.$gridPohyby);
                    if (aktPoh) {
                        return WebClient.FucDetail.runIslActionWithConfirm(this, "jres:24100313", //RC 24100313 : Opravdu chcete vyjmout vybraný pohyb ze soupisky?
                        () => { return that.isl.FinPohyb.vlozDoSoupisky({ ixp: that.Ixp, vlozit: false, rows: [aktPoh] }); }, () => { return that.setActiveOperationAndReloadData(); }, that.actions.actPohybySouVyjmuti);
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Diagnostika (uložení dat) soupisky
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                diagnostika() {
                    // uložení zipu s daty aktuální soupisky
                    // TODO: dodělat diagnostiku soupisky
                    return WebClient.FucDetail.diagnostika(401 /* Wfl.Interface.GIdentifikatorCoJsemZac.SoupiskaPohybu */, this.Ixp, this);
                }
                /**
                 * Uložení / zobrazení dokladu o zaúčtování
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                dokladOZauctovani() {
                    if (this.DetailDto.JeZauctovana) {
                        let aktDoklad = Gordic.Eko.Grid.currentRow(this.$gridDokladyOZauc);
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
                 * Zobrazení historie účtování
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                historieUctovani() {
                    if (this.DetailDto.ixs_huf != null && this.DetailDto.ixs_huf > " ") {
                        // zobrazení historie účtování
                        // TODO: neudělat to podobně jako se řeší otevření ostatních detailů
                        return this.navigate(["Gordic.Fuc.WebClient.GDetailHistorieUctovaniPohybu"], {
                            ID: 'DetailHistorieUctovani#',
                            IxsHuf: this.DetailDto.ixs_huf
                        })
                            .createDialogPromise();
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Nastavení prvků ve formuláři
                 */
                enable() {
                    // prvky
                    const perms = this.DetailDto.Permissions;
                    // TODO: mají být ixp_den, ac a ac_ag editovatelné?
                    const l_bDisableHeaderItems = !WebClient.FucDetail.ConvertPermissionToBool(perms ? perms.LzeEvidovat : undefined);
                    const l_bDisableOtherItems = !WebClient.FucDetail.ConvertPermissionToBool(this.Editace ? { value: true } : (perms ? perms.LzeEvidovat : undefined));
                    const headerFields = Gordic.Eko.HeaderForm.Fields;
                    //this.element.findFields(headerFields.Kniha).gfield("option", "disabled", l_bDisableHeaderItems);
                    //this.element.findFields(headerFields.EvidencniCislo).gfield("option", "disabled", l_bDisableHeaderItems);
                    //this.element.findFields(headerFields.AgendoveCislo).gfield("option", "disabled", l_bDisableHeaderItems);
                    this.element.findFields(headerFields.TypDokladu).gfield("option", "disabled", l_bDisableHeaderItems);
                    // TODO: má být datum evidence vůbec editovatelný?
                    //this.element.findFields(headerFields.DatumEvidence).gfield("option", "disabled", l_bDisableOtherItems);
                    this.element.findFields(headerFields.Popis).gfield("option", "disabled", l_bDisableOtherItems);
                    this.element.findFields("typ_ag").gfield("option", "disabled", l_bDisableOtherItems);
                    this.element.findFields("c_soup").gfield("option", "disabled", l_bDisableOtherItems || this.DetailDto.priz_aut_poc_c === true);
                    this.element.findFields("priz_pov_uct_jedn").gfield("option", "disabled", l_bDisableOtherItems);
                    this.element.findFields("priz_pov_uct_hrom").gfield("option", "disabled", l_bDisableOtherItems);
                    this.element.findFields("priz_pov_uct_kum").gfield("option", "disabled", l_bDisableOtherItems);
                    //this.element.findFields("priz_uct_najednou").gfield("option", "disabled", l_bDisableOtherItems);
                    //this.element.findFields("priz_kum_za_soup").gfield("option", "disabled", l_bDisableOtherItems);
                    //this.element.findFields("priz_kum_za_ixpupr").gfield("option", "disabled", l_bDisableOtherItems);
                    this.element.findFields("priz_aut_poc_c").gfield("option", "disabled", l_bDisableOtherItems);
                    this.element.findFields("priz_ne_akt_op_fuc").gfield("option", "disabled", l_bDisableOtherItems || this.DetailDto.typ_ag === Fuc.Globals.Enums.TypAg.FUC || this.DetailDto.typ_ag === Fuc.Globals.Enums.TypAg.INT);
                    //this.element.findFields("priz_stav_fin_kont").gfield("option", "disabled", l_bDisableOtherItems);
                    //this.element.findFields("priz_sch_pres_epk").gfield("option", "disabled", l_bDisableOtherItems);
                    // akce
                    const permEditace = WebClient.FucDetail.getEditPermission();
                    //const permEmptyGrid = FucGrid.getEmptyGridPermission();
                    const acts = this.actions;
                    acts.actPodaniSou.updatePermission((this.Editace ? permEditace : (perms ? perms.LzePodat : undefined)));
                    // TODO: vrací, že je něco změněno, i když by nic změněno být nemělo - proč? asi jde o údaje z dokumentu, ale na zápočtovém listu s tím problémy nejsou
                    //const formChanged = this.findForms().gform("hasChanged");
                    //let yyy = this.findForms().gform("hasChanged");
                    //if (yyy) {
                    //    console.log("změněno");
                    //    //let zzz2 = this.findFields().filter((idx, f) => { return $(f).gfield("hasChanged") });
                    //    console.log(this.findFields().filter((idx, f) => { return $(f).gfield("hasChanged") }));
                    //}
                    //else {
                    //    console.log("nezměněno");
                    //}
                    acts.actEvidenceSou.updatePermission(( /*formChanged || */this.Editace ? { value: true } : (perms ? perms.LzeEvidovat : undefined)));
                    acts.actOpravaSou.visible(!this.Editace);
                    acts.actOpravaSou.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeOpravit : undefined)));
                    acts.actZrusitZmenySou.visible(this.Editace);
                    acts.actZrusitZmenySou.updatePermission((!this.Editace ? WebClient.FucDetail.getEditPermission(false) : { value: true }));
                    acts.actStornoSou.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeStornovat : undefined)));
                    acts.actZrusitStornoSou.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeZrusitStorno : undefined)));
                    acts.actSchvaleniSou.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeSchvalit : undefined)));
                    acts.actZrusitSchvaleniSou.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeZrusitSchvaleni : undefined)));
                    acts.actUzavreniSou.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeUzavrit : undefined)));
                    acts.actZrusitUzavreniSou.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeZrusitUzavreni : undefined)));
                    acts.actPredaniSou.updatePermission((this.Editace ? permEditace : (perms ? perms.LzePredat : undefined)));
                    acts.actPrevzetiSou.updatePermission((this.Editace ? permEditace : (perms ? perms.LzePrevzit : undefined)));
                    acts.actPrideleniSou.updatePermission((this.Editace ? permEditace : (perms ? perms.LzePridelit : undefined)));
                    acts.actPreevidenceSou.updatePermission((this.Editace ? permEditace : (perms ? perms.LzePreevidovat : undefined)));
                    acts.actVraceniSouDoWfl.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeVratitDoWfl : undefined)));
                    acts.actUctovaniSou.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeUctovat : undefined)));
                    acts.actDiagnostikaSou.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeDiagnostika : undefined)));
                    acts.actObcerstveniSou.updatePermission((this.Editace ? permEditace : { value: true }));
                    //acts.actTiskS!.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeTisknout : undefined)));
                    // TODO: ještě vrácení do WFL
                    // status bar
                    // zlikvidována OK jinak varování
                    // TODO: doplnit správné stavy
                    //Gordic.Eko.Detail.StatusBar.updateItem(this.statuses!["statusBarStav"]!, this.DetailDto.s_soup_txt!, (this.DetailDto.s_soup! < Gordic.Fuc.Globals.Enums.SSoup.Schvalena ? Gordic.Gin.Globals.Enums.ColorStateClass.info : (this.DetailDto.s_soup === Gordic.Fuc.Globals.Enums.SSoup.Stornovana ? Gordic.Gin.Globals.Enums.ColorStateClass.warning : Gordic.Gin.Globals.Enums.ColorStateClass.success)));
                    Gordic.Eko.Detail.StatusBar.updateItem(this.statuses["statusBarStav"], this.DetailDto.s_soup_txt?.toUpperCase() ?? "", (this.DetailDto.s_soup === Gordic.Fuc.Globals.Enums.SSoup.Schvalena
                        ? Gordic.Eko.Utils.RecordFormatType.Schvaleno
                        : (this.DetailDto.s_soup === Gordic.Fuc.Globals.Enums.SSoup.Zauctovana
                            ? Gordic.Eko.Utils.RecordFormatType.Realizovano
                            : (this.DetailDto.s_soup === Gordic.Fuc.Globals.Enums.SSoup.Stornovana
                                ? Gordic.Eko.Utils.RecordFormatType.Stornovano
                                : null))));
                    // akce pro pohyby
                    this.enableGridPoh();
                    // tab účtování a rezervace
                    this.enableUcetniZapisy();
                    this.enableRezervacniZapisy();
                    this.enableDokladOZauctovani();
                }
                /**
                 * Nastavení stavu akcí pro grid položek
                 */
                enableGridPoh() {
                    // aktuální položka
                    const aktPoh = Gordic.Eko.Grid.currentRow(this.$gridPohyby);
                    // akce položek
                    const permEditace = WebClient.FucDetail.getEditPermission();
                    const acts = this.actions;
                    const perms = this.DetailDto.Permissions;
                    acts.actPohybySouDetail.updatePermission({ value: aktPoh !== null ? true : false });
                    acts.actPohybySouVlozeni.updatePermission((this.Editace ? permEditace : (perms ? perms.LzeVlozitPohyb : undefined)));
                    acts.actPohybySouVyjmuti.updatePermission((aktPoh === null || this.Editace ? permEditace : (perms ? perms.LzeVyjmoutPohyb : undefined)));
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
                    //const perms = this.DetailDto.Permissions;
                    acts.actUctovaniSouTiskDokladu.updatePermission(aktRadekDok !== null ? (this.DetailDto.JeZauctovana === true ? { value: true } : { value: false, message: "Doklad není zaúčtován" }) : permEmptyGrid);
                    acts.actUctovaniSouTiskVsechDokladu.updatePermission(aktRadekDok !== null ? (this.DetailDto.JeZauctovana === true ? { value: true } : { value: false, message: "Doklad není zaúčtován" }) : permEmptyGrid);
                    acts.actUctovaniSouDokladOZauctovani.updatePermission(aktRadekDok !== null ? (this.DetailDto.JeZauctovana === true ? /*(aktRadekDok.ixb_dzu != null && aktRadekDok.ixb_dzu > " " ? (*/ { value: true } /*) : { value: false, message: "Vygenerovaný doklad o zaúčtování neexistuje" })*/ : { value: false, message: "Doklad není zaúčtován" }) : permEmptyGrid);
                    acts.actUctovaniSouInfoOUctovani.updatePermission({ value: (this.DetailDto.ixs_huf !== null && this.DetailDto.ixs_huf > " " ? true : false) });
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
                 * @returns {JQuery.Promise<any>} promise
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
                 *
                 * @param {boolean} setFocus (default = false) nastavovat fokus do prvního editovatelného pole?
                 */
                aktualizaceDetailu(setFocus = false) {
                    // nastavení vlastností
                    this.Editace = false;
                    // naplnění políček
                    // TODO: nechat DetailDto nebo to přejmenovat zpátky na model? nějak to dořešit, v kódu totiž používám oboje
                    this.findFields()
                        .gfield("model", "apply", this.DetailDto, { initialValues: true })
                        .gfield("model", "validators", this.validators);
                    if ((!this.DetailDto?.JePodana || this.DetailDto?.JeVJineAgende)) {
                        // naplnění popisných vlastností
                        // TODO: nebo to dělat přes pole?
                        Gordic.PopisneVlastnosti.applyValues(this, this.DetailDto.vlastnosti);
                        // naplnění gridu pohybů je až po rozkliknutí tabu
                    }
                    // badge
                    // TODO: nechat to zde nebo to přesunout do metody enable?
                    WebClient.FucDetail.updateBadge(this.BadgePohyby, this.DetailDto?.pocet_pohybu);
                    // nastavení stavu políček a akcí
                    this.enable();
                    // nastavení fokusu
                    if (setFocus) {
                        if (WebClient.FucDetail.ConvertPermissionToBool(this.DetailDto.Permissions ? this.DetailDto.Permissions.LzeEvidovat : undefined)) {
                            GDbd.getElementToFocus(this.element, ".gfield:not(.ui-state-disabled)")?.first().trigger("focus");
                        }
                    }
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
                        let aktDoklad = Gordic.Eko.Grid.currentRow(this.$gridDokladyOZauc);
                        if (aktDoklad !== null) {
                            rep.params.X0000 = aktDoklad.rok.toString(10);
                            rep.params.X0001 = aktDoklad.lic;
                            rep.params.X0002 = aktDoklad.ico;
                            rep.params.X0003 = aktDoklad.ucs;
                            rep.params.X0004 = aktDoklad.mesic.toString(10);
                            rep.params.X0005 = aktDoklad.ac;
                            // TODO: dořešit kumulované/hromadné účtování
                            /*if (this.DetailDto.typ_uct_fuc === 10 || this.DetailDto.typ_uct_fuc === 20) */ rep.params.X0006 = "1";
                            /*else rep.params.X0006 = "0";*/
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
                        // soupiska
                        // TODO: zatím neexistuje žádná vhodná sestava
                        //// pouze PID, nic jiného se nepředává
                        //rep.params.X0005 = this.Ixp;
                        // pouze PID soupisky
                        rep.customDto = { ixp: this.Ixp };
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
                 * Test, je-li PID soupisky zadán
                 *
                 * @returns {boolean} true = PID zadán, false = PID nezadán
                 */
                ixpZadan() {
                    // TODO: na tohle mám vlastnost z cs, ale nefungovalo to. buď to opravit nebo nechat tohle a v cs to změnit na private a bez JsonProperty. v seznamu je obdoba pro knihu
                    return (this.Ixp != null && this.Ixp !== "");
                }
                /**
                 * Test, je-li zadána kniha
                 *
                 * @returns {boolean} true = kniha zadána, false = kniha nezadána
                 */
                knihaZadana() {
                    // TODO: upravit
                    return (this.gpc.ixp_den /*IxpDen*/ != null && this.gpc.ixp_den /*IxpDen*/ !== "");
                }
                /**
                 * Test, jestli je možné okno zavřít
                 *
                 * @returns {JQueryPromise<Interface.GSoupiskaDto> | Interface.GSoupiskaDto} promise s daty (resolve = je možné zavřít, reject = není možné zavřít) nebo přímo data detailu
                 */
                closing() {
                    let that = this;
                    // kontrola na změněné položky
                    let formChanged = this.findForms().gform("hasChanged");
                    // TODO: tuhle podmínku pak upravit, tj. nechat jen formChanged? asi ne
                    if ((this.Editace || this.DetailDto.JePodana) && formChanged) {
                        // dotaz na zavření bez uložení, protože se něco změnilo
                        // TODO: zatím jen v editačním režimu (tj. i po podání)?
                        return Gordic.Eko.Detail.messageBoxUnsavedData(that)
                            .createDialogPromise([GDlg.mbbYes.id, GDlg.mbbNo.id])
                            .then(function (retVal) {
                            if (retVal === GDlg.mbbYes.id) {
                                // uložení dat
                                that.actions?.actCloseButtonClick?.setPending(0);
                                return that.evidence(true)
                                    .then(function () {
                                    // úspěšně dokončeno
                                    that.actions?.actCloseButtonClick?.setPending(100);
                                    // vrácení příznaku aktivní operace
                                    return that.DetailDto;
                                })
                                    .fail(function (xhr, type, vobj) {
                                    // skončilo chybou
                                    that.actions?.actCloseButtonClick?.setPending(-1);
                                });
                            }
                            else {
                                return that.DetailDto;
                            }
                        });
                    }
                    else {
                        // pokud se needituje, je možné detail zavřít
                        return that.DetailDto;
                    }
                }
            };
            GDetailSoupisky = __decorate([
                gcontent
            ], GDetailSoupisky);
            WebClient.GDetailSoupisky = GDetailSoupisky;
        })(WebClient = Fuc.WebClient || (Fuc.WebClient = {}));
    })(Fuc = Gordic.Fuc || (Gordic.Fuc = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFNvdXBpc2t5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR0RldGFpbFNvdXBpc2t5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFVLE1BQU0sQ0FreURmO0FBbHlERCxXQUFVLE1BQU07SUFBQyxJQUFBLEdBQUcsQ0FreURuQjtJQWx5RGdCLFdBQUEsR0FBRztRQUFDLElBQUEsU0FBUyxDQWt5RDdCO1FBbHlEb0IsV0FBQSxTQUFTO1lBQzFCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFLbkM7Ozs7O2VBS0c7WUFFSCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLE9BQUEscUJBQXlDO2dCQUE5RTs7b0JBRUk7Ozt1QkFHRztvQkFDSyxnQkFBVyxHQUFrQixJQUFJLENBQUM7b0JBQzFDOzs7dUJBR0c7b0JBQ0ssbUJBQWMsR0FBa0IsSUFBSSxDQUFDO29CQUM3Qzs7O3VCQUdHO29CQUNLLHNCQUFpQixHQUFrQixJQUFJLENBQUM7b0JBQ2hEOzs7dUJBR0c7b0JBQ0ssNEJBQXVCLEdBQWtCLElBQUksQ0FBQztvQkFDdEQ7Ozt1QkFHRztvQkFDSyxtQkFBYyxHQUFrQixJQUFJLENBQUM7Z0JBMHZEakQsQ0FBQztnQkExckRHOzttQkFFRztnQkFDSSxjQUFjO29CQUVqQixrSkFBa0o7b0JBRWxKLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLEVBQUUsQ0FBQzt3QkFDbEYsSUFBSSxDQUFDLGVBQWUsQ0FBQzs0QkFDakIsUUFBUSxFQUFFLEtBQUssQ0FBQSxRQUFROzRCQUN2Qiw2R0FBNkc7eUJBQ2hILENBQUMsQ0FBQztvQkFDUCxDQUFDO29CQUVELGdEQUFnRDtvQkFDaEQsSUFBSSxD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QWx5RFMsTUFBTSxLQUFOLE1BQU0sUUFreURmIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIEdvcmRpYy5GdWMuV2ViQ2xpZW50IHtcclxuICAgIGxldCBnY29udGVudCA9IERlY29yYXRvcnMuZ2NvbnRlbnQ7XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgRHRvVHlwZVNvdXAgPSBHb3JkaWMuRnVjLkludGVyZmFjZS5HU291cGlza2FEdG87XHJcbiAgICBleHBvcnQgdHlwZSBVc2VkQ29tcG9uZW50c1NvdXAgPSBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXJDb21wb25lbnRzLkdpbkRlc2NQcm9wc0V4dGVuc2lvbnMgJiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXJDb21wb25lbnRzLkdMaXN0Q29udHJvbHNFeHRlbnNpb25zPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdTb3VwaXNrYUR0bz47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXRhaWwgU291cGlza3lcclxuICAgICAqIFxyXG4gICAgICogQGF1dGhvciBNYXJ0aW4gQm/EjWVrXHJcbiAgICAgKiBAc2luY2UgNDgwLjEuMC41NlxyXG4gICAgICovXHJcbiAgICBAZ2NvbnRlbnRcclxuICAgIGV4cG9ydCBjbGFzcyBHRGV0YWlsU291cGlza3kgZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQ8VXNlZENvbXBvbmVudHNTb3VwPiBpbXBsZW1lbnRzIElHQ29udGVudCB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdyaWQgcG9oeWLFr1xyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnkgfCBudWxsfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWRQb2h5Ynk6IEpRdWVyeSB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdyaWQgw7rEjWV0bsOtY2ggesOhcGlzxa9cclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5IHwgbnVsbH1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlICRncmlkVWN0WmFwaXN5OiBKUXVlcnkgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHcmlkIGRva2xhZHUgbyB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnkgfCBudWxsfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWREb2tsYWR5T1phdWM6IEpRdWVyeSB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdyaWQgesOhcGlzxa8gZG9rbGFkdSBvIHphw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeSB8IG51bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZFphcGlzeURva2xhZHVPWmF1YzogSlF1ZXJ5IHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCByZXplcnZhxI1uw61jaCB6w6FwaXPFr1xyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnkgfCBudWxsfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWRSZXpaYXBpc3k6IEpRdWVyeSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyB2bGFzdG5vc3RpIHogQyNcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQSUQgc291cGlza3lcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgSXhwOiBzdHJpbmc7XHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIEtuaWhhIHNvdXBpc2VrXHJcbiAgICAgICAgLy8gKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wcml2YXRlIEl4cERlbjogc3RyaW5nO1xyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBTdWLFmWFkYSBrbmloeSBzb3VwaXNla1xyXG4gICAgICAgIC8vICogQHR5cGUge251bWJlcn1cclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSBTdWJyYWRhRGVuOiBudW1iZXI7XHJcbiAgICAgICAgLy8vKipcclxuICAgICAgICAvLyAqIEFrdGl2aXRhIHN1YsWZYWR5IGtuaWh5IHNvdXBpc2VrXHJcbiAgICAgICAgLy8gKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICAgIC8vICovXHJcbiAgICAgICAgLy9wcml2YXRlIEFrdFN1YnJhZHlEZW46IG51bWJlcjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1w6FsbsOtIHNwaXNvdsO9IHV6ZWxcclxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSXhzU3U6IHN0cmluZztcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3Rpdml0YSBzdWLFmWFkeSBrbmloeVxyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBBa3RTdWJyYWR5OiBudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZw616bmFrIGVkaXRvdsOhbsOtIGRldGFpbHVcclxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEVkaXRhY2U6IGJvb2xlYW47XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRFRPIGRldGFpbHUgc291cGlza3lcclxuICAgICAgICAgKiBAdHlwZSB7R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1NvdXBpc2thRHRvfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgRGV0YWlsRHRvOiBHb3JkaWMuRnVjLkludGVyZmFjZS5HU291cGlza2FEdG87XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmFsaWTDoXRvcnlcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0W119XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB2YWxpZGF0b3JzOiBvYmplY3RbXTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1w6FsbsOtIHJva1xyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBSb2s6IG51bWJlcjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZcW+aW0gZ2VuZXJvdsOhbsOtIFBJRHVcclxuICAgICAgICAgKiBAdHlwZSB7R29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlJlemltR2VuSXhwfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZ2luX2dlbl9peHA6IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5SZXppbUdlbkl4cDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBCYWRnZSBwcm8gcG/EjWV0IHBvaHlixa9cclxuICAgICAgICAgKiBAdHlwZSB7R09ic2VydmFibGVPYmplY3Q8R0JhZGdlT3B0aW9ucz59XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBCYWRnZVBvaHlieTogR09ic2VydmFibGVPYmplY3Q8R0JhZGdlT3B0aW9ucz47XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFphZGVmaW5vdsOhbsOtIGZvcm11bMOhxZllXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uQ29udGVudFJlYWR5KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogemtvbnRyb2xvdmF0IHBvZMOhbsOtIHNvdXBpc2t5IC0gbmEgZGVuMzg4IHRvIHZ5cGFkYWxvIG9rLCBhbGUgbmVieWxhIHYgc2V6bmFtdSB2aWTEm3QgLSBhc2kgYnVkZSBwcm9ibMOpbSB2IHpvYnJhemVuw60sIHByb3Rvxb5lIHYgZGF0YWLDoXppIGplXHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5peHBaYWRhbigpICYmICghdGhpcy5EZXRhaWxEdG8/LkplUG9kYW5hIHx8IHRoaXMuRGV0YWlsRHRvPy5KZVZKaW5lQWdlbmRlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXNjUHJvcHNfc2V0dXAoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiBmYWxzZS8qdHJ1ZSovLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0SXh4OiBmdW5jdGlvbiAoZ3JpZFN0YXRlKSB7IC8qemRlIHZyw6F0aXQgcHJvbWlzZSBzIHZ5YnJhbsO9bSBpeHggLSB0ai4gbsSbamFrw6kgem9icmF6ZW7DrSBzZWxlY3RvcnUuKi8gfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHpwxZnDrXN0dXBuxJtuw60gdGxhxI3DrXRrYSBwcm8gdWxvxb5lbsOtIHDFmWkgem3Em27DoWNoXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vZmYoXCJmaWVsZGNoYW5nZS5kZXRhaWxTb3VcIik7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5vbihcImZpZWxkY2hhbmdlLmRldGFpbFNvdVwiLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXZpZGVuY2VFbmFibGVkID0gdGhhdC5FZGl0YWNlID09PSB0cnVlID8gdHJ1ZSA6IHRoYXQuZmluZEZvcm1zKCkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogZG/FmWXFoWl0IHBlcm1pc3Npb25zIChhZ2VuZG92w6ksIGRva3VtZW50b3bDqSwgdmxhc3Rub3N0aT8pIC0gbmVibyB0byBuZcWZZcWhaXQgemRlLCBhbGUgYcW+IG5hIHNlcnZlcnU/XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0RXZpZGVuY2VTb3UhLnVwZGF0ZVBlcm1pc3Npb24oKGV2aWRlbmNlRW5hYmxlZCA/IHsgdmFsdWU6IHRydWUgfSA6IC8qeyB2YWx1ZTogZmFsc2UgfSovKHRoYXQuRGV0YWlsRHRvLlBlcm1pc3Npb25zID8gdGhhdC5EZXRhaWxEdG8uUGVybWlzc2lvbnMuTHplRXZpZG92YXQgOiB1bmRlZmluZWQpKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLml4cFphZGFuKCkpXHJcbiAgICAgICAgICAgICAgICAvLyBwb2TDoW7DrSBub3bDqSBzb3VwaXNreVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2RhbmkoKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBqZW4gbmFzdGF2ZW7DrSBva25hXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFrdHVhbGl6YWNlRGV0YWlsdSh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gZmxhc2ggc2Ugc3RhdmVtIGtuaWh5XHJcbiAgICAgICAgICAgIEVrby5VdGlscy5TaG93RWtvQm9va1N0YXRlRmxhc2godGhpcywgdGhpcy5Ba3RTdWJyYWR5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9ic2x1aGEgdWTDoWxvc3RpIGJ1aWxkZXJJbml0XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGJ1aWxkZXIgZGV0YWlsYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkRldGFpbEJ1aWxkZXJJbml0KGJ1aWxkZXI6IEdvcmRpYy5HaW4uRGV0YWlsQnVpbGRlci5HRGV0YWlsQnVpbGRlcik6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gYmFkZ2VcclxuICAgICAgICAgICAgdGhpcy5CYWRnZVBvaHlieSA9IEZ1Y0RldGFpbC5jcmVhdGVCYWRnZShcInBvY2V0UG9oeWJ1QmFkZ2VcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZpbmljZSBha2PDrSwgdGFixa8sIGtwaSwgbWVudSBhcG9kLlxyXG4gICAgICAgICAgICBidWlsZGVyLndpdGhDb21wb25lbnQ8dGhpcz4oXCJkZXRhaWxcIiwge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHRleHR5IGRvIHJlc291cmNlXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcMWZZWZvcm3DoXRvdmF0IG5hIHbDrWNlIMWZw6Fka8WvPyBzamVkbm90aXQgdG8gdsWhdWRlLCBwcm90b8W+ZSBuxJtrZGUgamUgdG8gbmEgamVkZW4gYSBuxJtrZGUgbmEgdsOtY2UgxZnDoWRrxa9cclxuICAgICAgICAgICAgICAgICAgICAvLyBha2NlIHBybyBtZW51YmFyXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0UG9kYW5pU291OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25Qb2RhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5wb2RhbmkoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RFdmlkZW5jZVNvdTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uRXZpZG92YXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZXZpZGVuY2UoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RPcHJhdmFTb3U6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9wcmF2aXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC5vcHJhdmEoKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFpydXNpdFptZW55U291OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25acnVzaXRabWVueSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0Lm9wcmF2YSgpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0U3Rvcm5vU291OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25TdG9ybm92YXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQuc3Rvcm5vKCkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0WnJ1c2l0U3Rvcm5vU291OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25acnVzaXRTdG9ybm8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQuc3Rvcm5vKCkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0U2NodmFsZW5pU291OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25TY2h2YWxpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5zY2h2YWxlbmkoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RacnVzaXRTY2h2YWxlbmlTb3U6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblpydXNpdFNjaHZhbGVuaSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5zY2h2YWxlbmkoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RVemF2cmVuaVNvdTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVXphdnJpdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC51emF2cmVuaSgpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFpydXNpdFV6YXZyZW5pU291OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25acnVzaXRVemF2cmVuaSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC51emF2cmVuaSgpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFByZWRhbmlTb3U6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblByZWRhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5wcmVkYW5pKCkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0UHJldnpldGlTb3U6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblByZXZ6aXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQucHJldnpldGkoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RQcmlkZWxlbmlTb3U6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblByaWRlbGl0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0LnByaWRlbGVuaSgpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFByZWV2aWRlbmNlU291OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25QcmVldmlkb3ZhdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5wcmVldmlkZW5jZSgpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdE9iY2Vyc3R2ZW5pU291OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25PYmNlcnN0dml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0LnJlbG9hZERhdGEoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBqZSB2xa9iZWMgbsSbamFrw6Egc2VzdGF2YSBkZXRhaWx1IHNvdXBpc2t5PyBhc2kgbmUsIGtkecW+IHTDqW1hIGplIHBybyBrbmlodVxyXG4gICAgICAgICAgICAgICAgICAgIC8vYWN0VGlza1M6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvblRpc2soeyBuYW1lOiBcImFjdFRpc2tTXCIsIHRlbWE6IFwiZnVjX3B0bV9rc291XCIsIHNlcnZlclBhcmFtZXRlck1ldGhvZDogXCJHb3JkaWMuRnVjLldlYkNsaWVudC5HRGV0YWlsU291cGlza3k6UHJpbnRQYXJhbWV0ZXJzXCIsIHJlcG9ydFN0YXJ0aW5nOiBmdW5jdGlvbiAocmVwKSB7IHJldHVybiB0aGF0LnJlcG9ydFN0YXJ0aW5nKHJlcCk7IH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy9hY3RVemF2cmVuaVNvdTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVXphdnJpdCh7IHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LnV6YXZyZW5pKCk7IH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0VnJhY2VuaVNvdURvV2ZsOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25WcmF0aXREb1dmbCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC52cmFjZW5pRG9XZmwoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RVY3RvdmFuaVNvdTogRnVjQWN0aW9ucy5hY3Rpb25aYXVjdG92YXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhhdC51Y3RvdmFuaSgpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0RGlhZ25vc3Rpa2FTb3U6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRpYWdub3N0aWthKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0LmRpYWdub3N0aWthKCkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcG9oeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0UG9oeWJ5U291RGV0YWlsOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EZXRhaWwoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZGV0YWlsUG9oeWJ1KCkpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0UG9oeWJ5U291VmxvemVuaTogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uTm92eSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVmxvxb5pdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQudmxvemVuaVBvaHlidSgpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFBvaHlieVNvdVZ5am11dGk6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9kc3RyYW5pdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcHRpb246IFwiVnlqbW91dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQudnlqbXV0aVBvaHlidSgpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRva2xhZHlcclxuICAgICAgICAgICAgICAgICAgICBhY3RVY3RvdmFuaVNvdVRpc2tEb2tsYWR1OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25UaXNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RVY3RvdmFuaVNvdVRpc2tEb2tsYWR1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbWE6IFwiZnVjX3B0bV9lbmd6YXVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJEb2tsYWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5GdWMuV2ViQ2xpZW50LkdEZXRhaWxTb3VwaXNreTpQcmludFBhcmFtZXRlcnNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHsgcmV0dXJuIHRoYXQucmVwb3J0U3RhcnRpbmcocmVwKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0R2VuZXJhdGVkOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGF0LnJlcG9ydEdlbmVyYXRlZCgpOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0VWN0b3ZhbmlTb3VUaXNrVnNlY2hEb2tsYWR1OiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25UaXNrKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhY3RVY3RvdmFuaVNvdVRpc2tWc2VjaERva2xhZHVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtYTogXCJmdWNfcHRtX2VuZ3phdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiBcIlbFoWVjaG55IGRva2xhZHlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVyUGFyYW1ldGVyTWV0aG9kOiBcIkdvcmRpYy5GdWMuV2ViQ2xpZW50LkdEZXRhaWxTb3VwaXNreTpQcmludFBhcmFtZXRlcnNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0U3RhcnRpbmc6IGZ1bmN0aW9uIChyZXApIHsgcmV0dXJuIHRoYXQucmVwb3J0U3RhcnRpbmcocmVwLCB0cnVlKTsgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0R2VuZXJhdGVkOiBmdW5jdGlvbiAocmVwKSB7IHJldHVybiB0aGF0LnJlcG9ydEdlbmVyYXRlZCh0cnVlKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFVjdG92YW5pU291RG9rbGFkT1phdWN0b3Zhbmk6IEZ1Y0FjdGlvbnMuYWN0aW9uRG9rbGFkT1phdWN0b3Zhbmkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQuZG9rbGFkT1phdWN0b3ZhbmkoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RVY3RvdmFuaVNvdUluZm9PVWN0b3Zhbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogXCJqcmVzOjI0MTAwMzY2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246IFwiZ2ktaW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuOiBmdW5jdGlvbiAoKSB7IHRoaXMuc2V0UGVuZGluZyh0aGF0Lmhpc3RvcmllVWN0b3ZhbmkoKSk7IH1cclxuICAgICAgICAgICAgICAgICAgICB9LCAvL1JDIDI0MTAwMzY2IDogSW5mb3JtYWNlIG8gw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJvIEtQSVxyXG4gICAgICAgICAgICAgICAgICAgIC8vYWN0VGFiUG9oeWJ5OiB7IGNhcHRpb246IFwiUG9oeWJ5XCIsIGVuYWJsZWQ6IHRydWUsIHJ1bjogZnVuY3Rpb24gKCkgeyBGdWNEZXRhaWwuc3dpdGNoVG9HcnBBbmRUYWIodGhhdCwgXCJncnBQb2h5YnlcIiwgXCJ0YWJQb2h5YnlcIik7IH0gfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRhYkdyb3VwczogW1xyXG4gICAgICAgICAgICAgICAgICAgIEdvcmRpYy5QcmVmYWJzLlRhYkdyb3Vwcy5BZ2VuZGEoKSxcclxuICAgICAgICAgICAgICAgICAgICB7IGlkOiBcImdycFBvaHlieVwiLCBjYXB0aW9uOiBcImpyZXM6MjQxMDA0NTNcIiwgYmFkZ2U6IHRoaXMuQmFkZ2VQb2h5YnkgfSwgLy9SQyAyNDEwMDQ1MyA6IFBvaHlieVxyXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwiZ3JwVWN0UmV6XCIsIGNhcHRpb246IFwianJlczoyNDEwMDM1MFwiLCB2aXNpYmxlOiB0aGF0LkRldGFpbER0by5KZVphdWN0b3ZhbmEhIH0gLy9SQyAyNDEwMDM1MCA6IMOaxI1ldG7DrSBhIHJlemVydmHEjW7DrSB6w6FwaXN5XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgbWVudUJhcjogW1xyXG4gICAgICAgICAgICAgICAgICAgIC8vW1wianJlczoyNDEwMDA0NFwiLCAvLyBSQyAyNDEwMDA0NCA6IEFnZW5kYVxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0UG9kYW5pU291KlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0T3ByYXZhU291KlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0WnJ1c2l0Wm1lbnlTb3UqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RFdmlkZW5jZVNvdSpcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFNjaHZhbGVuaVNvdSpcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFpydXNpdFNjaHZhbGVuaVNvdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0VWN0b3ZhbmlTb3UqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RTdG9ybm9Tb3VcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFpydXNpdFN0b3Jub1NvdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0VXphdnJlbmlTb3VcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFpydXNpdFV6YXZyZW5pU291XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RPYmNlcnN0dmVuaVNvdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0UHJlZGFuaVNvdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0UHJldnpldGlTb3VcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFByaWRlbGVuaVNvdVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0UHJlZXZpZGVuY2VTb3VcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdFZyYWNlbmlTb3VEb1dmbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vXCJhY3RUaXNrUypcIixcclxuICAgICAgICAgICAgICAgICAgICBcImFjdERpYWdub3N0aWthU291XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9GdWNEZXRhaWwuY3JlYXRlTWVudVNoYXJlKHRoYXQuSXhwKVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIGNvbW1hbmRCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiAhIHphdMOtbSBuZW7DrSB2IG1lbnUgdiBkZXRhaWxidWlsZGVydSBwb2Rwb3JvdsOhbiAtIGHFviBidWRlLCB0YWsgdG8gYnVkZSBtb8W+bsOpIHDFmWVkxJtsYXQgKHpkZSBhIG5hIGRhbMWhw61jaCBtw61zdGVjaClcclxuICAgICAgICAgICAgICAgICAgICAvL1wiYWN0RXZpZGVuY2VTb3UhXCJcclxuICAgICAgICAgICAgICAgICAgICB7IGFjdGlvbjogXCJhY3RFdmlkZW5jZVNvdVwiLCBwcmltYXJ5OiB0cnVlIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBzdGF0dXNCYXI6IFtcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIuY3JlYXRlVXpvKHsgaXhwOiB0aGF0LkRldGFpbER0by5peHAsIHV6bzogdGhhdC5EZXRhaWxEdG8uZG9rdW1lbnQ/LnV6bywgcmVhZG9ubHk6IHRoYXQuRGV0YWlsRHRvLml4c19mdW5fYWt0ICE9PSAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdCwgZ2xvYmFsU2V0dGluZ3M6IHRoaXM/Lmdsb2JhbFNldHRpbmdzIH0sICgpID0+IHRoYXQuc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YSh0cnVlKSwgeyBpZDogXCJzdGF0dXNCYXJVem9cIiB9KSxcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIuY3JlYXRlSXRlbSh7IGlkOiBcInN0YXR1c0JhclN0YXZcIiB9KVxyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIC8va3Bpczoge1xyXG4gICAgICAgICAgICAgICAgLy8gICAga3BpUG9jZXRQb2h5YnU6IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBuYW1lOiBcImtwaVBvY2V0UG9oeWJ1XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdmFsdWU6IHRoYXQuRGV0YWlsRHRvLnBvY2V0X3BvaHlidSA/PyAwLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHVuaXQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgcHJpbWFyeVRleHQ6IFwiUG/EjWV0IHBvaHlixa9cIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBzZWNvbmRhcnlUZXh0OiBcInBvaHlixa9cIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBtZWFuaW5nOiBcImluZm9cIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBmb3JtYXR0ZXI6IFwiTlwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGFjdGlvbk9uVGl0bGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgaXRlbVRlbXBsYXRlOiBHb3JkaWMuUHJlZmFicy5QYW5lbHMua3BpVmFsdWVUd29Sb3dzVGV4dFRlbXBsYXRlKCkuaXRlbVRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGFjdGlvbjogXCJhY3RUYWJQb2h5YnlcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICBzaG93VGV4dEljb246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHZpc2libGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgaXNDdXJyZW5jeTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgICAgICB0YWJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiU291cGlza2E6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gesOha2xhZG7DrSDDumRhamVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7IHRpdGxlOiBcIlNvdXBpc2thXCIsIGdyb3VwOiBHb3JkaWMuUHJlZmFicy5UYWJHcm91cHMuQWdlbmRhKCksIG9wZW5lZDogdHJ1ZSwgbG9ja2VkOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkb3BsbsSbbsOtIHBydmvFryBkbyB0YWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybSA9IG5ldyBHb3JkaWMuRm9ybXMuRm9ybSh7IG5hbWU6IFwiZm9ybVNvdXBpc2thXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDJNMlMxXCIgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIlByaW3DoXJuw60gYWdlbmRhXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkFnZW5kYVwiKS5hZGRGaWVsZChcImdzZWxlY3Rib3hcIiwgR29yZGljLlByZWZhYnMuU2VsZWN0LmdpbmN0YWcoKSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJ0eXBfYWdcIiwgbW9kZWw6IFwidHlwX2FnPXR5cF9hZzt6a3JfYWc9dHlwX2FnX3prclwiLCBzZXJ2ZXJGaWx0ZXJzOiB7IHR5cF9hZzogR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cEFnRnVjLlR5cEFnUG92b2xlbmVGdWMgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXYsIGNoYW5nZU9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5maW5kRmllbGRzKFwicHJpel9uZV9ha3Rfb3BfZnVjXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIChjaGFuZ2VPYmo/LnZhbHVlPy50eXBfYWcgPT09IEdsb2JhbHMuRW51bXMuVHlwQWcuRlVDIHx8IGNoYW5nZU9iaj8udmFsdWU/LnR5cF9hZyA9PT0gR2xvYmFscy5FbnVtcy5UeXBBZy5JTlQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcInswfSwgezF9XCIuZm9ybWF0KEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMubmtzID8/IFwiTktTXCIsIEdvcmRpYy5Db25zdHMuRGJTaG9ydGN1dHMudXVzID8/IFwiVVVTXCIpKS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJua3NcIiB9KS5hZGRGaWVsZChcImdzdHJpbmdib3hcIiwgXCJ3LTZcIiwgeyBkaXNhYmxlZDogdHJ1ZSwgbmFtZTogXCJ1dXNcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiRG9wbMWIdWrDrWPDrSBpbmZvcm1hY2VcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwixIzDoXN0a2FcIikuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7IGRpc2FibGVkOiB0cnVlLCBuYW1lOiBcImNfc291cFwiLCBlbXB0eVZhbHVlOiBudWxsIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiVmxhc3Rub3N0aToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2bGFzdG5vc3RpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczogeyB0aXRsZTogXCJWbGFzdG5vc3RpXCIsIGdyb3VwOiBHb3JkaWMuUHJlZmFicy5UYWJHcm91cHMuQWdlbmRhKCksIG9wZW5lZDogZmFsc2UsIGxvY2tlZDogZmFsc2UgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG9wbG7Em27DrSBwcnZrxa8gZG8gdGFidVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1Tb3VwaXNrYVwiLCBsYXlvdXREZXNjcmlwdG9yOiBcIkwyTTJTMVwiLypcIkwxTTFTMVwiKi8gfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb3Bsbml0IGRlZmF1bHR5IHZsYXN0bm9zdMOtIGRvIERUTz8gYXNpIGFubywgYcWlIGplIHRvIG5hIGplZG5vbSBtw61zdMSbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogem3Em25pdCBwxZnDrXpuYWt5IG5hIHR5cCAoZylib29sZWFuPyBqaW5hayBzZSBqaWNoIHphxaFrcsOhdMOhdmthIG5lY2h5dG5vdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiw5rEjXRvdsOhbsOtXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJwcml6X3Bvdl91Y3RfamVkblwiLCBsYWJlbDogXCJQb3ZvbGVubyDDusSNdG92w6Fuw60gamVkbm90bGl2xJtcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coKS5hZGRGaWVsZChcImdjaGVja1wiLCB7IG5hbWU6IFwicHJpel9wb3ZfdWN0X2hyb21cIiwgbGFiZWw6IFwiUG92b2xlbm8gw7rEjXRvdsOhbsOtIGhyb21hZG7Em1wiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJwcml6X3Bvdl91Y3Rfa3VtXCIsIGxhYmVsOiBcIlBvdm9sZW5vIMO6xI10b3bDoW7DrSBrdW11bG92YW7Em1wiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uYWRkUHJlZmFiKEZ1Y0RldGFpbC5wcmVmYWJQcml6QW5vTmVEZWZhdWx0KFwicHJpel9wb3ZfdWN0X2plZG5cIiwgXCJQb3ZvbGVubyDDusSNdG92w6Fuw60gamVkbm90bGl2xJtcIiwgdGhhdC5EZXRhaWxEdG8ucHJpel9wb3ZfdWN0X2plZG5fZGVmKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRQcmVmYWIoRnVjRGV0YWlsLnByZWZhYlByaXpBbm9OZURlZmF1bHQoXCJwcml6X3Bvdl91Y3RfaHJvbVwiLCBcIlBvdm9sZW5vIMO6xI10b3bDoW7DrSBocm9tYWRuxJtcIiwgdGhhdC5EZXRhaWxEdG8ucHJpel9wb3ZfdWN0X2hyb21fZGVmKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRQcmVmYWIoRnVjRGV0YWlsLnByZWZhYlByaXpBbm9OZURlZmF1bHQoXCJwcml6X3Bvdl91Y3Rfa3VtXCIsIFwiUG92b2xlbm8gw7rEjXRvdsOhbsOtIGt1bXVsb3ZhbsSbXCIsIHRoYXQuRGV0YWlsRHRvLnByaXpfcG92X3VjdF9rdW1fZGVmKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRQcmVmYWIoRnVjRGV0YWlsLnByZWZhYlByaXpBbm9OZURlZmF1bHQoXCJwcml6X3VjdF9uYWplZG5vdVwiLCBcIkNlbG91IHNvdXBpc2t1IMO6xI10b3ZhdCBuYWplZG5vdVwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRQcmVmYWIoRnVjRGV0YWlsLnByZWZhYlByaXpBbm9OZURlZmF1bHQoXCJwcml6X2t1bV96YV9zb3VwXCIsIFwiS3VtdWxvdmF0IHphIHNvdXBpc2t1XCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLmFkZFByZWZhYihGdWNEZXRhaWwucHJlZmFiUHJpekFub05lRGVmYXVsdChcInByaXpfa3VtX3phX2l4cHVwclwiLCBcIkt1bXVsb3ZhdCB6YSBQSUQgcMWZw61wYWR1XCIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiT3N0YXRuw61cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KCkuYWRkRmllbGQoXCJnY2hlY2tcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInByaXpfYXV0X3BvY19jXCIsIGxhYmVsOiBcIkF1dG9tYXRpY2t5IGFrdHVhbGl6b3ZhdCDEjcOhc3RrdSBzb3VwaXNreVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChldiwgY2hhbmdlT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbmRGaWVsZHMoXCJjX3NvdXBcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgKGNoYW5nZU9iaj8udmFsdWUgPT09IHRydWUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdygpLmFkZEZpZWxkKFwiZ2NoZWNrXCIsIHsgbmFtZTogXCJwcml6X25lX2FrdF9vcF9mdWNcIiwgbGFiZWw6IFwiWmFrw6F6YXQgYWt0aXZuw60gb3BlcmFjZSBzZSBzb3VwaXNrb3UgdmUgRlVDXCIsIHRvb2x0aXA6IFwiQWt0aXZuw60gb3BlcmFjZSBzZSBzb3VwaXNrYW1pIGFnZW5kIEZVQyBhIElOVCBqc291IHbFvmR5IHBvdm9sZW55IGEgbmVuw60gamUgbW/Fvm7DqSB6YWvDoXphdFwiIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRQcmVmYWIoRnVjRGV0YWlsLnByZWZhYlByaXpBbm9OZURlZmF1bHQoXCJwcml6X2F1dF9wb2NfY1wiLCBcIkF1dG9tYXRpY2t5IGFrdHVhbGl6b3ZhdCDEjcOhc3RrdSBzb3VwaXNreVwiLCB0aGF0LkRldGFpbER0by5wcml6X2F1dF9wb2NfY19kZWYpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8uYWRkUHJlZmFiKEZ1Y0RldGFpbC5wcmVmYWJQcml6QW5vTmVEZWZhdWx0KFwicHJpel9uZV9ha3Rfb3BfZnVjXCIsIFwiWmFrw6F6w6FueSBha3Rpdm7DrSBvcGVyYWNlIHNlIHNvdXBpc2tvdSB2ZSBGVUNcIiwgdGhhdC5EZXRhaWxEdG8ucHJpel9uZV9ha3Rfb3BfZnVjX2RlZikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRTZWN0aW9uKFwiT3N0YXRuw61cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLmFkZFByZWZhYihGdWNEZXRhaWwucHJlZmFiUHJpekFub05lRGVmYXVsdChcInByaXpfc3Rhdl9maW5fa29udFwiLCBcIlBvdcW+w612YXQgc3RhdnkgZmluYW7EjW7DrSBrb250cm9seVwiKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vLmFkZFByZWZhYihGdWNEZXRhaWwucHJlZmFiUHJpekFub05lRGVmYXVsdChcInByaXpfc2NoX3ByZXNfZXBrXCIsIFwiU2NodmFsb3ZhdCBzb3VwaXNrdSBwxZllcyBFUEtcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBmb3JtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiUG9oeWJ5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvaHlieVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0TGF6eTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjI0MTAwMTg1XCIsIC8vUkMgMjQxMDAxODUgOiDDmsSNZXRuw60gcG9oeWJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogeyBpZDogXCJncnBQb2h5YnlcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0aGF0LkRldGFpbER0by5KZVBvZGFuYSEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbXCJhY3RQb2h5YnlTb3VEZXRhaWwqXCIsIFwiYWN0UG9oeWJ5U291VmxvemVuaSpcIiwgXCJhY3RQb2h5YnlTb3VWeWptdXRpKlwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhZGdlOiB7IHBhcmFtczogdGhpcy5CYWRnZVBvaHlieSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBwb2h5YsWvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5sb2FkUG9oeWJ5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gZ3JpZMWvIHBvaHlixa8gZG8gdGFidVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZFBvaHlieSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRQb2h5YnlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZ3JpZCBkb2TEm2xhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIiwgICAgIC8vIGZpdCAoZGVmYXVsdG5lIGJ5IG1lbG8gYnl0IHRvdG8pLCBmdWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRBY3Rpb246IHRoYXQuYWN0aW9ucy5hY3REZXRhaWxQb2h5YnUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1widnNcIiwgXCJjXCIsIFwidHlwX2FnXCIsIFwiYWNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IEZ1Y0dyaWQuUG9oeWIuY3JlYXRlR3JpZEZvcm1hdCh0aGF0LCBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwU2V6UG9oLlBvaHlieVNvdXBpc2t5KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwiaXhwX3VwcixyYWRla191cG8sdHlwX3Vwb190eHQsc191cG9fdHh0LHNfc3RvX3R4dCxrdGdfdXBvX3R4dCx6bmFtX3R4dCxjX3Vwbyxwb3Bpc191cG8sc3ViamVrdC5uYXpldixkYXRfdXBvLGRhdF96YXVjLG9iZF9kYW4sc3VicmFkYV9kdXoscHJpel9kZF90eHRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2F1dG9maXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNpemVyc09uVGFiOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0YWJVY3RJbmZvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluZm9ybWFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cDogeyBpZDogXCJncnBVY3RSZXpcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwxZnDrXBhZG7DvSBmbGFzaCBzIGluZm9ybWFjw60gbyBqaW7DqW0gcm9rdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuUm9rICE9IHRoYXQuRGV0YWlsRHRvLnJvaykgRnVjRGV0YWlsLmZsYXNoUm9rQ2Z1KHRhYiwgdGhhdC5Sb2ssIFwiaWRSb2tVY3RNZXNzYWdlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0YWJVY3RaYXBpc3k6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRMYXp5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MjQxMDA0NDlcIiwgLy9SQyAyNDEwMDQ0OSA6IMOaxI1ldG7DrSB6w6FwaXN5IHBvaHlixa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7IGlkOiBcImdycFVjdFJlelwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRoYXQuRGV0YWlsRHRvLkplWmF1Y3RvdmFuYSEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL21lbnVCYXI6IFtcImFjdFVjdG92YW5pU291VGlza1BvaHlidSpcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvZMSbbGF0IHpvYnJhemVuw60gaGlzdG9yaWUgw7rEjXRvdsOhbsOtPyBidcSPIHDFmWVzIHNlem5hbSAob2JlY27EmyBtxa/FvmUgYsO9dCBwb2h5YiB2ZSB2w61jZSBoaXN0b3Jpw60gw7rEjXRvdsOhbsOtKSBuZWJvIGRvaGxlZGF0IHRlbiBuZWpub3bEm2rFocOtLCBrZGUgamUgcG9oeWIgemHDusSNdG92w6FuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbmXFmWXFoWl0IHVsb8W+ZW7DvSB0eXAgem9icmF6ZW7DrT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWRVY3RaYXBpc3koKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ3JpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZFVjdFphcGlzeSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRnVjLkludGVyZmFjZS5HWmFwaXNEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkVWN0WmFwaXN5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB1cHJhdml0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcImFjX2FnXCIsIFwiYWNcIiwgXCJpY29fZXN1XCIsIFwicmNfZXN1XCIsIFwibmF6ZXZfZXN1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBGdWNHcmlkLlphcGlzLmNyZWF0ZUdyaWRGb3JtYXROKHRoYXQsIHsgZHJkOiB0cnVlLCBkYXR1bTogdHJ1ZSwgcHJpcGFkOiB0cnVlLCBwb2h5YjogdHJ1ZSwgZHBoOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2F1dG9maXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNpemVyc09uVGFiOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYlJlelphcGlzeToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZXplcnZhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdExhenk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwianJlczoyNDEwMDQ1MVwiLCAvL1JDIDI0MTAwNDUxIDogUmV6ZXJ2YcSNbsOtIHrDoXBpc3kgcG9oeWLFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXA6IHsgaWQ6IFwiZ3JwVWN0UmV6XCIgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5lZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdGhhdC5EZXRhaWxEdG8uSmVaYXVjdG92YW5hISxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gcmV6ZXJ2YWPDrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZFJlelphcGlzeSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB1ZMSbbGF0IHDFmWVww61uYcSNIG5hIHrDoXBpc3kgeiByZXplcnZhxI1uw61obyBwb2h5YnUgYSB6IMO6xI1ldG7DrWhvIHBvaHlidT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ3JpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZFJlelphcGlzeSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRnVjLkludGVyZmFjZS5HWmFwaXNEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkUmV6WmFwaXN5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB1cHJhdml0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcImFjX2FnXCIsIFwiYWNcIiwgXCJpY29fZXN1XCIsIFwicmNfZXN1XCIsIFwibmF6ZXZfZXN1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBGdWNHcmlkLlphcGlzLmNyZWF0ZUdyaWRGb3JtYXROKHRoYXQsIHsgZHJkOiB0cnVlLCBkYXR1bTogdHJ1ZSwgcHJpcGFkOiB0cnVlLCBwb2h5YjogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplcnNPblRhYjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiRG9rbGFkeU9aYXVjOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0TGF6eTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFiUGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjI0MTAwNDUyXCIsIC8vUkMgMjQxMDA0NTIgOiBEb2tsYWR5IG8gemHDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7IGlkOiBcImdycFVjdFJlelwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRoYXQuRGV0YWlsRHRvLkplWmF1Y3RvdmFuYSEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZW51QmFyOiBbXCJhY3RVY3RvdmFuaVNvdVRpc2tEb2tsYWR1KlwiLCBcImFjdFVjdG92YW5pU291VGlza1ZzZWNoRG9rbGFkdSpcIiwgXCJhY3RVY3RvdmFuaVNvdURva2xhZE9aYXVjdG92YW5pKlwiLCBcImFjdFVjdG92YW5pU291SW5mb09VY3RvdmFuaSpcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvZMSbbGF0IHpvYnJhemVuw60gaGlzdG9yaWUgw7rEjXRvdsOhbsOtPyBidcSPIHDFmWVzIHNlem5hbSAob2JlY27EmyBtxa/FvmUgYsO9dCBwb2h5YiB2ZSB2w61jZSBoaXN0b3Jpw60gw7rEjXRvdsOhbsOtKSBuZWJvIGRvaGxlZGF0IHRlbiBuZWpub3bEm2rFocOtLCBrZGUgamUgcG9oeWIgemHDusSNdG92w6FuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbmXFmWXFoWl0IHVsb8W+ZW7DvSB0eXAgem9icmF6ZW7DrT9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWREb2tsYWR5T1phdWN0b3ZhbmkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFidWxreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdmb3JtKFwiY3JlYXRlRnJvbVwiLCBuZXcgR29yZGljLkZvcm1zLkZvcm0oXCJMMU0xUzFcIikuYWRkU2VjdGlvbigvKlwiRG9rbGFkXCIqLy8qXCJEb2tsYWQgbyB6YcO6xI10b3bDoW7DrVwiKi8pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWREb2tsYWR5T1phdWMgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR0Rva2xhZER0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWREb2tsYWR5T1phdWNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHVwcmF2aXQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1wiYWNfYWdcIiwgXCJhY1wiLCBcImljb19lc3VcIiwgXCJyY19lc3VcIiwgXCJuYXpldl9lc3VcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IEZ1Y0dyaWQuWmFwaXMuY3JlYXRlR3JpZEZvcm1hdERva2xhZHkoZmFsc2UpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsQWN0aXZhdGU6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gesOhcGlzxa8gYWt0dcOhbG7DrWhvIGRva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmouY2VsbEluZm8pIHRoYXQubG9hZFphcGlzeURva2xhZHUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplcnNPblRhYjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHrDoXBpc3kgcG9oeWJ1L2Rva2xhZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZm9ybShcImNyZWF0ZUZyb21cIiwgbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKFwiTDFNMVMxXCIpLmFkZFNlY3Rpb24oXCJaw6FwaXN5IGRva2xhZHVcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZFphcGlzeURva2xhZHVPWmF1YyA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGFiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZ3JpZDxHb3JkaWMuRnVjLkludGVyZmFjZS5HWmFwaXNEdG8+KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJncmlkWmFwaXN5RG9rbGFkdU9aYXVjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB1cHJhdml0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcImFjX2FnXCIsIFwiYWNcIiwgXCJpY29fZXN1XCIsIFwicmNfZXN1XCIsIFwibmF6ZXZfZXN1XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBGdWNHcmlkLlphcGlzLmNyZWF0ZUdyaWRGb3JtYXQodGhhdCwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2F1dG9maXQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNpemVyc09uVGFiOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgLy8gZGFsxaHDrSBwb2h5YnkgeiBkb2tsYWR1XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAvLyBUT0RPOiBkw6F0IHNlbSBha2NpIG5hIGRldGFpbCBwb2h5YnU/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLmFwcGVuZFRvKHRhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIG5ldyBHb3JkaWMuRm9ybXMuRm9ybShcIkwxTTFTMVwiKS5hZGRTZWN0aW9uKFwiRGFsxaHDrSBwb2h5YnkgZG9rbGFkdVwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LiRncmlkT3N0UG9oeWJ5RG9rbGFkdU9aYXVjID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIC5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgLmdncmlkPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy8gVE9ETzogdXByYXZpdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy9zZWFyY2hDb2x1bW5zOiBbXCJhY19hZ1wiLCBcImFjXCIsIFwiaWNvX2VzdVwiLCBcInJjX2VzdVwiLCBcIm5hemV2X2VzdVwiXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgY29sdW1uczogRnVjR3JpZC5Qb2h5Yi5jcmVhdGVHcmlkRm9ybWF0KHRoYXQsIEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBTZXpQb2guVWNldG5pUG9oeWJ5KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgLy9jZWxsQWN0aXZhdGU6IGZ1bmN0aW9uIChldiwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vICAgIC8vIG5hxI10ZW7DrSB6w6FwaXPFryBha3R1w6FsbsOtaG8gZG9rbGFkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAvLyAgICBpZiAob2JqLmNlbGxJbmZvKSB0aGF0Lm5hY3RlbmlTZXpuYW11WmFwaXN1KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5hc3RhdmVuw60ga3BpcGFuZWx1XHJcbiAgICAgICAgICAgICQuZXh0ZW5kKGJ1aWxkZXIua3BpUGFuZWxPcHRpb25zLCB7IHNvcnRhYmxlOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9ic2x1aGEgdWTDoWxvc3RpIGJ1aWxkZXJCdWlsZFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyIGRldGFpbGJ1aWxkZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25EZXRhaWxCdWlsZGVyQnVpbGQoYnVpbGRlcjogR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBuYXBvamVuw60gc3RhbmRhcmRuw60gRUtPIGhsYXZpxI1reVxyXG4gICAgICAgICAgICAvLyDDunByYXZhIHTFmWV0w60gc2VrY2UgKHBvbG/Fvmt5IGEgc3RhdiBtw61zdG8ga29tcGV0ZW50YSBhIHJlYWxpesOhdG9yYSlcclxuICAgICAgICAgICAgY29uc3QgZm9ybVNldHVwID0ge307XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlckZvcm0gPSBuZXcgR29yZGljLkZvcm1zLkZvcm0oeyBuYW1lOiBcImZvcm1IZWFkZXJcIiB9KVxyXG4gICAgICAgICAgICAgICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAgICAgLmFkZFJvdyhcImpyZXM6MjQxMDAzMTJcIikuYWRkRmllbGQoXCJnc2VsZWN0Ym94XCIsIEdvcmRpYy5QcmVmYWJzLlNlbGVjdC5mdWNjc3NvKCksIHsgLy9SQyAyNDEwMDMxMiA6IFN0YXZcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJzX3NvdXA9c19zb3VwO3Nfc291cF90eHQ9c19zb3VwX3R4dFwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5TZWN0aW9ucy5EYXRhMl0gPSB7XHJcbiAgICAgICAgICAgICAgICByb3dzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRlci5nZXREZWZpbml0aW9uKEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5Sb3dzLlpwcmFjb3ZhdGVsKVswXT8uaXRlbSwgLy8genByYWNvdmF0ZWxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJGb3JtIS5mb3JtIS5zZWN0aW9ucyFbMF0ucm93cyFbMF0gLy8gc3RhdlxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9IGFzIEZvcm1zLkZvcm1TZWN0aW9uO1xyXG4gICAgICAgICAgICAvLyB2bGFzdG7DrSBuYXN0YXZlbsOtIHBydmvFryAocMWZZXbDocW+bsSbIG1vZGVsKS4gcG96b3IsIG5lc23DrSBzZSBtxJtuaXQgbmFtZVxyXG4gICAgICAgICAgICAvLyBqaW7DvSBwcmVmYWIgcHJvIGtuaWh1XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLktuaWhhXSA9IHsgb3B0aW9uczogJC5leHRlbmQoR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3NkZW4oR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cEFnLkZVQyksIHsgbW9kZWw6IFwiaXhwX2Rlbj1peHBfZGVuXCIsIHNlcnZlckZpbHRlcnM6IHsga3RnX2RlbjogW0dvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5LdGdEZW4uU291cGlza3ldLCB0eXBfYWc6IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBBZy5GVUMsIHJvazogdGhhdC5Sb2sgfSwgfSkgfSBhcyBGb3Jtcy5Gb3JtRmllbGQ7XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLlR5cERva2xhZHVdID0ge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZmxhZzogR29yZGljLlByZWZhYnMuRmllbGQuRmxhZ3MucmVxdWlyZWQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9kcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAvL21vZGVsOiBcIml4c190eXA9aXhzX3R5cDtpeHNfdHlwX3R4dD1uYXpldjtrdGdfdHlwPWt0Z190eXBcIixcclxuICAgICAgICAgICAgICAgICAgICAvL3NlcnZlckZpbHRlcnM6IHsga3RnX3R5cDogW0dvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5LdGdUeXBaTC5KZWRub3N0cmFubnksIEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5LdGdUeXBaTC5PYm91c3RyYW5ueV0gfSxcclxuICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZTogZnVuY3Rpb24gKGV2LCBjaGFuZ2VPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICB0aGF0LnptZW5hS3RnVHlwKGNoYW5nZU9iai52YWx1ZSEua3RnX3R5cCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgLy9kaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbDogXCJpeHNfdHlwPWl4c190eXA7aXhzX3R5cF90eHQ9bmF6ZXY7a3RnX3R5cD1rdGdfdHlwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VydmVyRmlsdGVyczogeyBrdGdfdHlwOiBbR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLkt0Z1R5cC5Tb3VwaXNrYVBvaHlidV0gfSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBhcyBGb3Jtcy5Gb3JtRmllbGQ7XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLkRhdHVtRXZpZGVuY2VdID0geyBvcHRpb25zOiB7IHZhbHVlVHlwZTogXCJkYXRlXCIgfSB9IGFzIEZvcm1zLkZvcm1GaWVsZDtcclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5GaWVsZHMuWnByYWNvdmF0ZWxdID0geyBvcHRpb25zOiB7IG1vZGVsOiBcIml4c19mdW5fYWt0PWl4c19mdW47aXhzX2Z1bl90eHQ9bmF6ZXY7aXhzX2Z1bl9yZWZfdHh0PW5hemV2X3JlZjtpeHNfZnVuX3N1X3R4dD1uYXpldl9zdVwiIH0gfSBhcyBGb3Jtcy5Gb3JtRmllbGQ7XHJcbiAgICAgICAgICAgIC8vZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5GaWVsZHMuUG9waXNdID0geyBvcHRpb25zOiB7IG1vZGVsOiBcInBvcGlzXCIgfSB9IGFzIEZvcm1zLkZvcm1GaWVsZDtcclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5GaWVsZHMuUG9waXNdID0geyBvcHRpb25zOiBFa28uRGV0YWlsLkZpZWxkLmdldENvdW50ZXJPcHRpb25zKEZ1Yy5JbnRlcmZhY2UuR1NvdXBpc2thRHRvVHlwZUxlbmd0aHMucG9waXMpIH0gYXMgRm9ybXMuRm9ybUZpZWxkO1xyXG4gICAgICAgICAgICAvLyBqaW7DvSBsYWJlbCBwcm8gZGF0dW1cclxuICAgICAgICAgICAgLy9mb3JtU2V0dXBbR29yZGljLkVrby5IZWFkZXJGb3JtLlJvd3MuRGF0dW1FdmlkZW5jZV0gPSB7IGxhYmVsOiBcImpyZXM6MjQxMDAwMzBcIiB9IGFzIEZvcm1zLkZvcm1Sb3c7IC8vUkMgMjQxMDAwMzAgOiBEYXR1bSBVw5pQXHJcbiAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIGhsYXZpxI1reVxyXG4gICAgICAgICAgICBHb3JkaWMuRWtvLkhlYWRlckZvcm0uc2V0dXAoYnVpbGRlciwgZm9ybVNldHVwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIMO6cHJhdmEgV0ZML1NTTCBrb21wb25lbnRcclxuICAgICAgICAgICAgR29yZGljLlNzbC5EZXRhaWxCdWlsZGVyQ29tcG9uZW50cy5Tc2xQcm9maWxEb2t1bWVudEVrby5zZXRUYWJzSW5pdExhenkoYnVpbGRlcik7XHJcbiAgICAgICAgICAgIEVrby5EZXRhaWwuY2hhbmdlRGV0YWlsQnVpbGRlcldmbEZvckVrb0RlZmluaXRpb25zKGJ1aWxkZXIsICh0aGlzLkRldGFpbER0bz8uSmVQb2RhbmEgJiYgIXRoaXMuRGV0YWlsRHRvPy5KZVZKaW5lQWdlbmRlKSA/PyBmYWxzZS8qLCBcIm1lbnVUaXNrU1wiKi8pO1xyXG5cclxuICAgICAgICAgICAgLy8gxaFpcGt5IHBybyBwb3N1biBwbyBzZXpuYW11XHJcbiAgICAgICAgICAgIGlmICgoIXRoaXMuRGV0YWlsRHRvPy5KZVBvZGFuYSB8fCB0aGlzLkRldGFpbER0bz8uSmVWSmluZUFnZW5kZSkpIHRoaXMubGlzdENvbnRyb2xzX3NldHVwKHtcclxuICAgICAgICAgICAgICAgIHJvd1RvRHRvOiBmdW5jdGlvbiAoZ3JpZFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKGdyaWRTdGF0ZS5jdXJyZW50Um93ICE9IG51bGwgPyBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGModGhhdC5ncGMsIGdyaWRTdGF0ZS5jdXJyZW50Um93LmRhdGEuaXhwX2RlbiEpIDogdGhhdC5ncGMpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJeHA6IGdyaWRTdGF0ZS5jdXJyZW50Um93LmRhdGEuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JeHBEZW46IHRoYXQuSXhwRGVuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTmFzbGVkdWppY2lEZXRhaWw6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfV07XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbmV4dEl0ZW1UZW1wbGF0ZTogXCJqcmVzOjI0MTAwMDMxXCIsIC8vUkMgMjQxMDAwMzEgOiBOw6FzbGVkdWrDrWPDrToge2l4cH0gPGJyPiB7YWNfYWc6dHJpbX0gLSB7YWM6dHJpbX0gPGJyPiB7cG9waXM6dHJpbTplbmNvZGV9XHJcbiAgICAgICAgICAgICAgICBwcmV2SXRlbVRlbXBsYXRlOiBcImpyZXM6MjQxMDAwMzJcIiwgLy9SQyAyNDEwMDAzMiA6IFDFmWVkY2hvesOtOiB7aXhwfSA8YnI+IHthY19hZzp0cmltfSAtIHthYzp0cmltfSA8YnI+IHtwb3Bpczp0cmltOmVuY29kZX1cclxuICAgICAgICAgICAgICAgIGJlZm9yZU1vdmU6IHRoYXQuY2xvc2luZ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9ic2x1aGEgYWt0aXZuw60gb3BlcmFjZVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7SlF1ZXJ5LkV2ZW50fSBldiB1ZMOhbG9zdFxyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBjdHg/IHDFr3ZvZG7DrSB1ZMOhbG9zdCBhIGplasOtIGFyZ3VtZW50eVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkRldGFpbEJ1aWxkZXJBY3RpdmVPcChldjogSlF1ZXJ5LkV2ZW50LCBjdHg/OiBhbnkpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YSh0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBvZMOhbsOtIHNvdXBpc2t5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwb2RhbmkoKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGtvbnRyb2xhIG5hIGtuaWh1XHJcbiAgICAgICAgICAgIGlmICghdGhhdC5rbmloYVphZGFuYSgpKSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IGJ1ZGUgbnV0bsOpIMWZZcWhaXQgdsO9YsSbciBrbmloeSB2IHJlxb5pbXUgcMWZZXMgdsOtY2Uga25paCAobXVzw60gdG8gYsO9dCBwcnZuw60gxI3DoXN0IGplxaF0xJsgcMWZZWQga29udHJvbG91IG5hIHBydm7DrSBkb2tsYWQpIC0gbmVibyB2IHRvbXRvIHJlxb5pbXUgcG9kw6Fuw60gbmVwxa9qZGVcclxuICAgICAgICAgICAgLy8ga29udHJvbGEgcHJ2bsOtaG8gZG9rbGFkdSB2IGtuaXplXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5YlNvdXBpc2thLnprb250cm9sdWpOYVBydm5pRG9rbGFkVktuaXplKHsgaXhwRGVuOiB0aGF0LmdwYy5peHBfZGVuLypJeHBEZW4qLy8qLCBzdWJyYWRhOiB0aGF0LlN1YnJhZGFEZW4qLyB9KVxyXG4gICAgICAgICAgICAgICAgLmdldCgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAodGV4dERvdGF6dSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBva3VkIGtvbnRyb2xhIHZyw6F0w60gZG90YXosIHRhayBzZSB6ZXB0YXQsIGplc3RsaSBtw6EgcHJ2bsOtIGRva2xhZCBzcHLDoXZuw6kgxI3DrXNsbywgamluYWsgamUgdG8gb2tcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGV4dERvdGF6dSkgcmV0dXJuIHRoYXQuZGlhbG9ncy5jb25maXJtKFwianJlczoyNDEwMDMyMVwiLCB0ZXh0RG90YXp1KS5jcmVhdGVEaWFsb2dQcm9taXNlKEdEbGcubWJiWWVzLmlkKTsgLy9SQyAyNDEwMDMyMSA6IE5vdsOhIHNvdXBpc2thXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcMWZw61wYWRuw6kgc2VqbXV0w60gUElEdVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvxZllxaFpdCwgamFrIHBvdcW+w612YXQgZ2luX2dlbl9peHAgLSBidcSPIHRvIGTDoXQgamFrbyBwcm9txJtubm91IChiZXogZ2xvYmFscykgbmVibyB0byBuZWNoYXQgdiBnbG9iYWxzLCBhbGUgcGFrIG11c8OtIGLDvXQgdGVuIG9iamVrdCBhc2kgamluYWtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKEVrby5VdGlscy5HZXRFa29Vc2VyU2V0dGluZ3NQaWRTZWptdXRpKHRoYXQsICh0aGF0Lmdpbl9nZW5faXhwID09PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuUmV6aW1HZW5JeHAuR2VuZXJvdmFuaSA/IFwiYW5vXCIgOiBcIm5lXCIpKSA9PT0gXCIxXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlam11dMOtIFBJRHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZiAodGhhdC8qR29yZGljLkZ1Yy5HbG9iYWxzLkdGdWNHbG9iYWxzKi8uZ2luX2dlbl9peHAgPT09IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5SZXppbUdlbkl4cC5TZWptdXRpLyoudG9TdHJpbmcoKSovICYmIHJldHVybk9iai5wb2RhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZcW+aW0gc2VqbXV0w60gUElEdSAodmUgdm9sYW7DqW0gb2tuxJsgYWxlIGplIG1vxb5uw6kgUElEIGkgdnlnZW5lcm92YXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGdlbmVyb3bDoW7DrSBQSUR1IHYgdMOpdG8gbWV0b2TEmyBuZWpzZW0gc2Nob3BlbiB6YWvDoXphdCBhIHBvZGFjw60gcHJvY2VkdXJhIHNpIHMgdMOtbSBuZXBvcmFkw61cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogamRlIHBvdGxhxI1pdCBobMOhxaFrYSwgxb5lIFBJRCBqacW+IGV4aXN0dWplPyBhc2kgYW5vIGEgYnlsbyBieSB0byDFvsOhZG91Y8OtIC0gYXNpIHZsYXN0bm9zdCBIbGFzZW5pUHJpRXhpc3RlbmNpVkFnZW5kZSAobXVzZWxvIGJ5IHNlIGFzaSBwxZlpZGF0ICwgdHJ1ZSwgZmFsc2UpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBHb3JkaWMuV2ZsLkRpYWxvZ3MuR2VuZXJvdmFuaUl4cCh0aGF0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXBEb2s6IEdvcmRpYy5XZmwuR2xvYmFscy5FbnVtcy5UeXBEb2suVmxhc3RuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cElkOiBHb3JkaWMuV2ZsLkdsb2JhbHMuRW51bXMuVHlwSWQuSVhQLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgRG90YXpQcmlFeGlzdGVuY2lWSmluZUFnZW5kZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhsYXNlbmlQcmlFeGlzdGVuY2lWQWdlbmRlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFpwdXNvYkdlbmVyb3Zhbmk6IEdvcmRpYy5XZmwuR2xvYmFscy5FbnVtcy5acHVzb2JHZW5lcm92YW5pSXhwLlN0aXRrZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgR29yZGljLkdsb2JhbC5FbnVtcy5Nb2RPdGV2cmVuaS5zaG93TW9kYWxXaW5kb3cpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9rdWQgc2UgdnLDoXRpbCBQSUQsIHBvdcW+aWppIGhvLCBqaW5hayBrb25lY1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWw/Lkl4cCkgcmV0dXJuIHJldFZhbC5JeHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFBJRCBzZSBidWRlIGdlbmVyb3ZhdCAoYcW+IHYgcG9kw6Fuw60gdiBkYWzFocOtbSBrcm9rdSlcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChpeHA6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2bGFzdG7DrSBwb2TDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5YlNvdXBpc2thLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cDogKGl4cCA/PyBcIlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXhwX2RlbjogdGhhdC5ncGMuaXhwX2Rlbi8qSXhwRGVuKi9cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5peHA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChpeHA6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2eXZvbMOhbsOtIHRyaWdnZXIgbyBha3Rpdm7DrSBvcGVyYWNpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEZ1Y0RldGFpbC50cmlnZ2VyQ2hhbmdlLCBbeyBkYXRhOiB7IGl4cDogaXhwIH0gfV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIGRhdCAtIHbFvmR5IHpub3Z1bmHEjXRlbsOtIGRldGFpbHUsIHByb3Rvxb5lIHNlIG3Em27DrSBQSURcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJeHA6IGl4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgTmFzbGVkdWppY2lEZXRhaWw6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gb2Jub3ZlbsOtIHDFr3ZvZG7DrWhvIHN0YXZ1XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuaXhwWmFkYW4oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB6b2JyYXplbsOtIGRldGFpbHUgcMWvdm9kbsOtaG8gUElEdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHphdsWZZW7DrSBva25hICh2cmFjw60gc2UgYWt0dcOhbG7DrSBkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmNsb3NlKHRoYXQuRGV0YWlsRHRvKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEV2aWRlbmNlICh1bG/FvmVuw60gem3Em24pIHNvdXBpc2t5XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZyb21DbG9zaW5nIChkZWZhdWx0ID0gZmFsc2UpIHpwxa9zb2Igdm9sw6Fuw60gKGZhbHNlID0gc3RhbmRhcmRuw60gdWxvxb5lbsOtIHRsYcSNw610a2VtLCB0cnVlID0gemUgemF2xZllbsOtIGRldGFpbHUgcyBuZXVsb8W+ZW7DvW1pIGRhdHkpXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeVByb21pc2U8YW55Pn0gcHJvbWlzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZXZpZGVuY2UoZnJvbUNsb3Npbmc6IGJvb2xlYW4gPSBmYWxzZSk6IEpRdWVyeVByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyB2YWxpZGFjZSBmb3JtdWzDocWZZVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBidWRlIHBvdMWZZWJhIGRvcGxuaXQgamXFoXTEmyBkYWzFocOtIHZhbGlkYWNlIHBvZGxlIFdpbkNsaWVudGFcclxuICAgICAgICAgICAgLy8gVE9ETzogdGEga29udHJvbGEgcG9kbGUgdmFsaWTDoXRvcsWvIHogRFRPIG1vxb5uw6EgbsSbamFrIG5lZnVuZ3VqZSAtIGplxaF0xJsgdnl6a291xaFldCwgcHJvdG/FvmUgdiBva27EmyBwcm8gxI3DoXN0a3kgdmFsaWTDoXRvcnkgbm9ybcOhbG7EmyBmdW5ndWrDrVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZWxlbWVudC5maW5kRm9ybXMoKS5nZm9ybShcImlzVmFsaWRcIikpIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2VicsOhbsOtIGhvZG5vdCB6IGZvcm11bMOhxZllXHJcbiAgICAgICAgICAgIGxldCBha3REYXRhOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKCkuZ2ZpZWxkKFwibW9kZWxcIiwgXCJjb2xsZWN0XCIsIGFrdERhdGEpO1xyXG5cclxuICAgICAgICAgICAgLy8gZG9rdW1lbnQgYSB2bGFzdG5vc3RpXHJcbiAgICAgICAgICAgIGxldCBkb2t1bWVudDogYW55ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBsZXQgdmxhc3Rub3N0aTogYW55ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBpZiAoISh0aGlzLkRldGFpbER0bz8uSmVQb2RhbmEpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBkb2t1bWVudFxyXG4gICAgICAgICAgICAgICAgaWYgKEVrby5VdGlscy5Eb2t1bWVudEhhc0NoYW5nZWQodGhpcykpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2t1bWVudC8qOiBHRG9rdW1lbnREdG8qLyA9ICQuZXh0ZW5kKHRydWUsIHt9LCAodGhpcyBhcyBhbnkpLnNhdmVFa29Qcm9maWwoKSwgKHRoaXMgYXMgYW55KS5zYXZlU3NsRGV0YWlsRG9ydWNlbmlFa28gPyAodGhpcyBhcyBhbnkpLnNhdmVTc2xEZXRhaWxEb3J1Y2VuaUVrbygpIDoge30pO1xyXG4gICAgICAgICAgICAgICAgICAgIGRva3VtZW50Lml4c190eXAgPSBkb2t1bWVudC5peHNfdHlwID8/IHRoYXQuRGV0YWlsRHRvLmRva3VtZW50Py5peHNfdHlwO1xyXG4gICAgICAgICAgICAgICAgICAgIGRva3VtZW50Lm5hemV2ID0gZG9rdW1lbnQubmF6ZXYgPz8gdGhhdC5EZXRhaWxEdG8uZG9rdW1lbnQ/Lm5hemV2O1xyXG4gICAgICAgICAgICAgICAgICAgIGRva3VtZW50LnN0X3V0YWpfaWQgPSBkb2t1bWVudC5zdF91dGFqX2lkID8/IHRoYXQuRGV0YWlsRHRvLmRva3VtZW50Py5zdF91dGFqX2lkO1xyXG4gICAgICAgICAgICAgICAgICAgIGRva3VtZW50Lml4c19mdW5fYWt0ID0gZG9rdW1lbnQuaXhzX2Z1bl9ha3QgPz8gdGhhdC5EZXRhaWxEdG8uZG9rdW1lbnQ/Lml4c19mdW5fYWt0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gdmxhc3Rub3N0aVxyXG4gICAgICAgICAgICAgICAgaWYgKEVrby5VdGlscy5WbGFzdG5vc3RpSGFzQ2hhbmdlZCh0aGlzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZsYXN0bm9zdGkgPSBHb3JkaWMuUG9waXNuZVZsYXN0bm9zdGkuY29sbGVjdFZhbHVlcyh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gdm9sw6Fuw60gZXZpZGVuY2VcclxuICAgICAgICAgICAgLy90aGF0LmJlZ2luT3BlcmF0aW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb20gPSB0aGF0LmlzbC5GaW5Qb2h5YlNvdXBpc2thLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBpeHA6IHRoYXQuSXhwLFxyXG4gICAgICAgICAgICAgICAgYWM6IGFrdERhdGEuYWMsXHJcbiAgICAgICAgICAgICAgICBhY19hZzogYWt0RGF0YS5hY19hZyxcclxuICAgICAgICAgICAgICAgIGl4c190eXA6IGFrdERhdGEuaXhzX3R5cCxcclxuICAgICAgICAgICAgICAgIGt0Z190eXA6IGFrdERhdGEua3RnX3R5cCxcclxuICAgICAgICAgICAgICAgIGl4cF9kZW46IHRoYXQuZ3BjLml4cF9kZW4vKkl4cERlbiovLFxyXG4gICAgICAgICAgICAgICAgLy9zdWJyYWRhOiAwLyp0aGF0LlN1YnJhZGFEZW4qLyxcclxuICAgICAgICAgICAgICAgIGRhdF9ldmlkOiBha3REYXRhLmRhdF9ldmlkLFxyXG4gICAgICAgICAgICAgICAgcG9waXM6IGFrdERhdGEucG9waXMsXHJcbiAgICAgICAgICAgICAgICBjX3NvdXA6IGFrdERhdGEuY19zb3VwLFxyXG4gICAgICAgICAgICAgICAgc19zb3VwOiBha3REYXRhLnNfc291cCxcclxuICAgICAgICAgICAgICAgIHR5cF9hZzogYWt0RGF0YS50eXBfYWcsXHJcbiAgICAgICAgICAgICAgICBwcml6X3Bvdl91Y3RfamVkbjogYWt0RGF0YS5wcml6X3Bvdl91Y3RfamVkbixcclxuICAgICAgICAgICAgICAgIHByaXpfcG92X3VjdF9ocm9tOiBha3REYXRhLnByaXpfcG92X3VjdF9ocm9tLFxyXG4gICAgICAgICAgICAgICAgcHJpel9wb3ZfdWN0X2t1bTogYWt0RGF0YS5wcml6X3Bvdl91Y3Rfa3VtLFxyXG4gICAgICAgICAgICAgICAgLy9wcml6X3VjdF9uYWplZG5vdTogYWt0RGF0YS5wcml6X3VjdF9uYWplZG5vdSxcclxuICAgICAgICAgICAgICAgIC8vcHJpel9rdW1femFfc291cDogYWt0RGF0YS5wcml6X2t1bV96YV9zb3VwLFxyXG4gICAgICAgICAgICAgICAgLy9wcml6X2t1bV96YV9peHB1cHI6IGFrdERhdGEucHJpel9rdW1femFfaXhwdXByLFxyXG4gICAgICAgICAgICAgICAgcHJpel9hdXRfcG9jX2M6IGFrdERhdGEucHJpel9hdXRfcG9jX2MsXHJcbiAgICAgICAgICAgICAgICBwcml6X25lX2FrdF9vcF9mdWM6IGFrdERhdGEucHJpel9uZV9ha3Rfb3BfZnVjLFxyXG4gICAgICAgICAgICAgICAgLy9wcml6X3N0YXZfZmluX2tvbnQ6IGFrdERhdGEucHJpel9zdGF2X2Zpbl9rb250LFxyXG4gICAgICAgICAgICAgICAgLy9wcml6X3NjaF9wcmVzX2VwazogYWt0RGF0YS5wcml6X3NjaF9wcmVzX2VwayxcclxuICAgICAgICAgICAgICAgIGl4c19mdW5fYWt0OiBha3REYXRhLml4c19mdW5fYWt0LFxyXG4gICAgICAgICAgICAgICAgZGF0X3ptZW5hOiB0aGF0LkRldGFpbER0by5kYXRfem1lbmEsXHJcbiAgICAgICAgICAgICAgICBkb2t1bWVudDogZG9rdW1lbnQsXHJcbiAgICAgICAgICAgICAgICB2bGFzdG5vc3RpOiB2bGFzdG5vc3RpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICAvLy5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vIFRPRE86IHpwcmFjb3bDoXZhdCB2w71zbGVkZWs/XHJcbiAgICAgICAgICAgICAgICAvLyAgICAvLyDDunNwxJvFoW7EmyBkb2tvbsSNZW5vXHJcbiAgICAgICAgICAgICAgICAvLyAgICBpZiAoIWZyb21DbG9zaW5nKSB0aGF0LmFjdGlvbnMuYWN0RXZpZGVuY2VTb3UhLnNldFBlbmRpbmcoMTAwKTtcclxuICAgICAgICAgICAgICAgIC8vfSlcclxuICAgICAgICAgICAgICAgIC8vLmZhaWwoIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIC8vIHNrb27EjWlsbyBjaHlib3VcclxuICAgICAgICAgICAgICAgIC8vICAgIGlmICghZnJvbUNsb3NpbmcpIHRoYXQuYWN0aW9ucy5hY3RFdmlkZW5jZVNvdSEuc2V0UGVuZGluZygtMSk7XHJcbiAgICAgICAgICAgICAgICAvL30pXHJcbiAgICAgICAgICAgICAgICAvLy5hbHdheXMoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBha3R1YWxpemFjZSBkYXRcclxuICAgICAgICAgICAgcmV0dXJuIHByb20udGhlbigoKSA9PiB7IHJldHVybiB0aGF0LnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEoZnJvbUNsb3NpbmcpOyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE9wcmF2YSBzb3VwaXNreSAodsSNZXRuxJsgenJ1xaFlbsOtIG9wcmF2eSlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIG9wcmF2YSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IHDFmWVkxJtsYXQsIGFieSBtZXRvZGEgdnJhY2VsYSBwcm9taXNlP1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLkVkaXRhY2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIHphcG51dMOtIHJlxb5pbXUgZWRpdGFjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5FZGl0YWNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gb2tuYVxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGUoKTtcclxuICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZm9rdXN1XHJcbiAgICAgICAgICAgICAgICBHRGJkLmdldEVsZW1lbnRUb0ZvY3VzKHRoaXMuZWxlbWVudCwgXCIuZ2ZpZWxkOm5vdCgudWktc3RhdGUtZGlzYWJsZWQpXCIpPy5maXJzdCgpLnRyaWdnZXIoXCJmb2N1c1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIHphcG51dMOtIHJlxb5pbXUgZWRpdGFjZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5FZGl0YWNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gcMWvdm9kbsOtY2ggZGF0IChwb2t1ZCBieWxvIG7Em2NvIHptxJtuxJtubylcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbmRGb3JtcygpLmdmb3JtKFwiaGFzQ2hhbmdlZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFrdHVhbGl6YWNlRGV0YWlsdSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gamVuIG5hc3RhdmVuw60gb2tuYVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFN0b3JubyAvIHpydcWhZW7DrSBzdG9ybmEgc291cGlza3lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzdG9ybm8oKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gRnVjRGV0YWlsLnJ1bklzbEFjdGlvbldpdGhSZWFzb24oXHJcbiAgICAgICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAgICAgdGhhdC5EZXRhaWxEdG8uSmVTdG9ybm92YW5hXHJcbiAgICAgICAgICAgICAgICAgICAgPyBcImpyZXM6MjQxMDAyNjZcIiAvL1JDIDI0MTAwMjY2IDogT3ByYXZkdSBjaGNldGUgenJ1xaFpdCBzdG9ybm8gc291cGlza3k/XHJcbiAgICAgICAgICAgICAgICAgICAgOiBcImpyZXM6MjQxMDAyNjdcIiwgLy9SQyAyNDEwMDI2NyA6IE9wcmF2ZHUgY2hjZXRlIHN0b3Jub3ZhdCBzb3VwaXNrdT9cclxuICAgICAgICAgICAgICAgIChkYXRhOiB7IGR1dm9kOiBzdHJpbmcgfSkgPT4geyByZXR1cm4gdGhhdC5pc2wuRmluUG9oeWJTb3VwaXNrYS5zdG9ybnVqKHsgc3Rvcm5vdmF0OiAhdGhhdC5EZXRhaWxEdG8uSmVTdG9ybm92YW5hLCBkdXZvZDogZGF0YS5kdXZvZCwgcm93czogW3RoYXQuRGV0YWlsRHRvXSB9KTsgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHsgcmV0dXJuIHRoYXQuc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YSgpIH0sXHJcbiAgICAgICAgICAgICAgICB0aGF0LkRldGFpbER0by5KZVN0b3Jub3ZhbmEgPyB0aGlzLmFjdGlvbnMuYWN0WnJ1c2l0U3Rvcm5vU291ISA6IHRoaXMuYWN0aW9ucy5hY3RTdG9ybm9Tb3UhXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTY2h2w6FsZW7DrSAvIHpydcWhZW7DrSBzY2h2w6FsZW7DrSBzb3VwaXNreVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNjaHZhbGVuaSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBGdWNEZXRhaWwucnVuSXNsQWN0aW9uV2l0aENvbmZpcm0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAgICAgdGhhdC5EZXRhaWxEdG8uSmVTY2h2YWxlbmFcclxuICAgICAgICAgICAgICAgICAgICA/IFwianJlczoyNDEwMDI2OFwiIC8vUkMgMjQxMDAyNjggOiBPcHJhdmR1IGNoY2V0ZSB6cnXFoWl0IHNjaHbDoWxlbsOtIHNvdXBpc2t5P1xyXG4gICAgICAgICAgICAgICAgICAgIDogXCJqcmVzOjI0MTAwMjY5XCIsLy9SQyAyNDEwMDI2OSA6IE9wcmF2ZHUgY2hjZXRlIHNjaHbDoWxpdCBzb3VwaXNrdT9cclxuICAgICAgICAgICAgICAgICgpID0+IHsgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliU291cGlza2Euc2NodmFsKHsgcm93czogW3RoYXQuRGV0YWlsRHRvXSwgc2NodmFsaXQ6ICF0aGF0LkRldGFpbER0by5KZVNjaHZhbGVuYSB9KTsgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHsgcmV0dXJuIHRoYXQuc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YSgpIH0sXHJcbiAgICAgICAgICAgICAgICB0aGF0LkRldGFpbER0by5KZVNjaHZhbGVuYSA/IHRoaXMuYWN0aW9ucy5hY3RacnVzaXRTY2h2YWxlbmlTb3UhIDogdGhpcy5hY3Rpb25zLmFjdFNjaHZhbGVuaVNvdSFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFV6YXbFmWVuw60gLyB6cnXFoWVuw60gdXphdsWZZW7DrSBzb3VwaXNreVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHV6YXZyZW5pKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEZ1Y0RldGFpbC5ydW5Jc2xBY3Rpb25XaXRoQ29uZmlybShcclxuICAgICAgICAgICAgICAgIHRoaXMsXHJcbiAgICAgICAgICAgICAgICB0aGF0LkRldGFpbER0by5KZVV6YXZyZW5hXHJcbiAgICAgICAgICAgICAgICAgICAgPyBcImpyZXM6MjQxMDAyNzBcIiAvL1JDIDI0MTAwMjcwIDogT3ByYXZkdSBjaGNldGUgenJ1xaFpdCB1emF2xZllbsOtIHNvdXBpc2t5P1xyXG4gICAgICAgICAgICAgICAgICAgIDogXCJqcmVzOjI0MTAwMjcxXCIsIC8vUkMgMjQxMDAyNzEgOiBPcHJhdmR1IGNoY2V0ZSB1emF2xZnDrXQgc291cGlza3U/XHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5YlNvdXBpc2thLnV6YXZyaSh7IHJvd3M6IFt0aGF0LkRldGFpbER0b10sIHV6YXZyaXQ6ICF0aGF0LkRldGFpbER0by5KZVV6YXZyZW5hIH0pOyB9LFxyXG4gICAgICAgICAgICAgICAgKCkgPT4geyByZXR1cm4gdGhhdC5zZXRBY3RpdmVPcGVyYXRpb25BbmRSZWxvYWREYXRhKCkgfSxcclxuICAgICAgICAgICAgICAgIHRoYXQuRGV0YWlsRHRvLkplVXphdnJlbmEgPyB0aGlzLmFjdGlvbnMuYWN0WnJ1c2l0VXphdnJlbmlTb3UhIDogdGhpcy5hY3Rpb25zLmFjdFV6YXZyZW5pU291IVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMWZZWTDoW7DrSBzb3VwaXNreVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHByZWRhbmkoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gRnVjRGV0YWlsLnJ1bklzbEFjdGlvbldpdGhGb3JtKFxyXG4gICAgICAgICAgICAgICAgdGhpcyxcclxuICAgICAgICAgICAgICAgIHsgZm9ybTogRnVjRG9rbGFkLmdldEZvcm1QcmVkYW5pKEdsb2JhbHMuRW51bXMuS3RnRGVuLlNvdXBpc2t5LCAoJC5jb250ZW50KFwibWFpblwiKSBhcyBhbnkpLkl4c0Z1bkFrdCwgdGhhdC5JeHNTdSwgdGhhdC5ncGMuaXhwX2Rlbi8qSXhwRGVuKi8pIH0sXHJcbiAgICAgICAgICAgICAgICAoZGF0YTogRnVjRG9rbGFkLklHUHJlZGFuaU1vZGVsKSA9PiB7IHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5YlNvdXBpc2thLnByZWRlaihGdWNEb2tsYWQuVG9QcmVkYW5pT3BlcmF0aW9uRHRvPEZ1Yy5JbnRlcmZhY2UuR1NvdXBpc2thRHRvLCBGdWMuSW50ZXJmYWNlLkdTb3VwaXNrYVByZWRhbmlPcGVyYXRpb25EdG8+KFt0aGF0LkRldGFpbER0b10sIGRhdGEpKTsgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHsgcmV0dXJuIHRoYXQuc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YSgpIH0sXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJlZGFuaVNvdSFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFDFmWV2emV0w60gc291cGlza3lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwcmV2emV0aSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBGdWNEZXRhaWwucnVuSXNsQWN0aW9uV2l0aEZvcm0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAgICAgeyBmb3JtOiBGdWNEb2tsYWQuZ2V0Rm9ybVByZXZ6ZXRpKCgkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueSkuSXhzRnVuQWt0KSB9LFxyXG4gICAgICAgICAgICAgICAgKGRhdGE6IEZ1Y0Rva2xhZC5JR1ByZXZ6ZXRpTW9kZWwpID0+IHsgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliU291cGlza2EucHJldmV6bWkoRnVjRG9rbGFkLlRvUHJldnpldGlPcGVyYXRpb25EdG88RnVjLkludGVyZmFjZS5HU291cGlza2FEdG8sIEZ1Yy5JbnRlcmZhY2UuR1NvdXBpc2thUHJldnpldGlPcGVyYXRpb25EdG8+KFt0aGF0LkRldGFpbER0b10sIGRhdGEpKTsgfSxcclxuICAgICAgICAgICAgICAgICgpID0+IHsgcmV0dXJuIHRoYXQuc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YSgpIH0sXHJcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UHJldnpldGlTb3UhXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZlpZMSbbGVuw60gc291cGlza3lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwcmlkZWxlbmkoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gRnVjRGV0YWlsLnJ1bklzbEFjdGlvbldpdGhGb3JtKFxyXG4gICAgICAgICAgICAgICAgdGhpcyxcclxuICAgICAgICAgICAgICAgIHsgZm9ybTogRnVjRG9rbGFkLmdldEZvcm1QcmlkZWxlbmkoR2xvYmFscy5FbnVtcy5LdGdEZW4uU291cGlza3ksICgkLmNvbnRlbnQoXCJtYWluXCIpIGFzIGFueSkuSXhzRnVuQWt0LCB0aGF0Lkl4c1N1LCB0aGF0LmdwYy5peHBfZGVuLypJeHBEZW4qLykgfSxcclxuICAgICAgICAgICAgICAgIChkYXRhOiBGdWNEb2tsYWQuSUdQcmlkZWxlbmlNb2RlbCkgPT4geyByZXR1cm4gdGhhdC5pc2wuRmluUG9oeWJTb3VwaXNrYS5wcmlkZWwoRnVjRG9rbGFkLlRvUHJpZGVsZW5pT3BlcmF0aW9uRHRvPEZ1Yy5JbnRlcmZhY2UuR1NvdXBpc2thRHRvLCBGdWMuSW50ZXJmYWNlLkdTb3VwaXNrYVByaWRlbGVuaU9wZXJhdGlvbkR0bz4oW3RoYXQuRGV0YWlsRHRvXSwgZGF0YSkpOyB9LFxyXG4gICAgICAgICAgICAgICAgKCkgPT4geyByZXR1cm4gdGhhdC5zZXRBY3RpdmVPcGVyYXRpb25BbmRSZWxvYWREYXRhKCkgfSxcclxuICAgICAgICAgICAgICAgIHRoYXQuYWN0aW9ucy5hY3RQcmlkZWxlbmlTb3UhXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZllZXZpZGVuY2Ugc291cGlza3lcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBwcmVldmlkZW5jZSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBGdWNEZXRhaWwucnVuSXNsQWN0aW9uV2l0aEZvcm0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAgICAgeyBmb3JtOiBGdWNEb2tsYWQuZ2V0Rm9ybVByZWV2aWRlbmNlKEdsb2JhbHMuRW51bXMuS3RnRGVuLlNvdXBpc2t5LCB0aGF0LmdwYy5pY28sIHRoYXQuZ3BjLnVjcywgdGhhdC5JeHNTdSwgdGhhdC5Sb2ssIHRoYXQuZ3BjLml4cF9kZW4vKkl4cERlbiovKSB9LFxyXG4gICAgICAgICAgICAgICAgKGRhdGE6IEZ1Y0Rva2xhZC5JR1ByZWV2aWRlbmNlTW9kZWwpID0+IHsgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliU291cGlza2EucHJlZXZpZHVqKEZ1Y0Rva2xhZC5Ub1ByZWV2aWRlbmNlT3BlcmF0aW9uRHRvPEZ1Yy5JbnRlcmZhY2UuR1NvdXBpc2thRHRvLCBGdWMuSW50ZXJmYWNlLkdTb3VwaXNrYVByZWV2aWRlbmNlT3BlcmF0aW9uRHRvPihbdGhhdC5EZXRhaWxEdG9dLCBkYXRhKSk7IH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHJldHVybiB0aGF0LnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEoKSB9LFxyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFByZWV2aWRlbmNlU291IVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVnLDoWNlbsOtIHNvdXBpc2t5IGRvIFdGTCB2cnN0dnlcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHZyYWNlbmlEb1dmbCgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBGdWNEZXRhaWwucnVuSXNsQWN0aW9uV2l0aFJlYXNvbihcclxuICAgICAgICAgICAgICAgIHRoaXMsXHJcbiAgICAgICAgICAgICAgICBcImpyZXM6MjQxMDAzMjNcIiwgLy9SQyAyNDEwMDMyMyA6IE9wcmF2ZHUgY2hjZXRlIHNvdXBpc2t1IHZyw6F0aXQgZG8gV0ZMP1xyXG4gICAgICAgICAgICAgICAgKGRhdGE6IHsgZHV2b2Q6IHN0cmluZyB9KSA9PiB7IHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5YlNvdXBpc2thLnZyYXREb1dmbCh7IHJvd3M6IFt0aGF0LkRldGFpbER0b10sIHZyYXRpdDogdHJ1ZSwgZHV2b2Q6IGRhdGEuZHV2b2QgfSk7IH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHJldHVybiB0aGF0LnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEoKSB9LFxyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFZyYWNlbmlTb3VEb1dmbCFcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIMOaxI10b3bDoW7DrSBwb2h5YsWvIHNvdXBpc2t5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgdWN0b3ZhbmkoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBkb2TEm2xhdCBzcHLDoXZuw6kgcGxuxJtuw60gcGFyVHlwVWN0b3ZhbmkgYSBwYXJLdW11bGFjZVphSXhwXHJcbiAgICAgICAgICAgIC8vbGV0IHBhclR5cFVjdG92YW5pOiBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVWN0IHwgdW5kZWZpbmVkID0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVjdC5KZWRub3RsaXZlO1xyXG4gICAgICAgICAgICAvL2xldCBwYXJLdW11bG92YXRaYUl4cDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyBwcsWvdm9kY2UgcHJvIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICBjb25zdCBwcm9tID0gdGhpcy5jYWxsPHZvaWQ+KFwiVmxveml0RG9QcmFjU2V6bmFtdVwiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGlrYykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9rbm8gw7rEjXRvdsOhbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiR29yZGljLkZ1Yy5XZWJDbGllbnQuR1VjdG92YW5pUG9oeWJ1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElEOiAnVWN0b3ZhbmlQb2h5YnUjJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIElrYzogaWtjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG/FmWXFoWl0IHBhcmFtZXRyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UeXBVY3RvdmFuaTogcGFyVHlwVWN0b3ZhbmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0t1bXVsb3ZhdFphSXhwOiBwYXJLdW11bG92YXRaYUl4cCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vUGV2VHlwVWN0b3Zhbmk6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBldlR5cFVjdEFubzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVY3RQb2g6IEdsb2JhbHMuRW51bXMuVWN0UG9oLlNvdXBpc2t5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGl0bGU6IFwianJlczoyNDEwMDIxMFwiIH0gLy9SQyAyNDEwMDIxMCA6IMOaxI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YTogeyBjb21wbGV0ZTogYm9vbGVhbiwgdWN0b3Zhbm9PZGxvemVuZTogYm9vbGVhbiB9KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc21hesOhbsOtIHByYWNvdm7DrSB0YWJ1bGt5IChwb3V6ZSwgcG9rdWQgbmVieWxvIHNwdcWhdMSbbm8gb2Rsb8W+ZW7DqSDDusSNdG92w6Fuw60pXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGE/LnVjdG92YW5vT2Rsb3plbmUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnJhY8OtIHNlIHbFvmR5IHRydWUsIHByb3Rvb8W+ZSB2IGNvbXBsZXRlIGplIHYgdG9tdG8gcMWZw61wYWTEmyBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5jYWxsPHZvaWQ+KFwiU21hemF0UHJhY1Nlem5hbVwiKS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhPy5jb21wbGV0ZSA9PT0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoY29tcGxldGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2eWhvZG5vY2Vuw60gdsO9c2xlZGt1XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogKHphdMOtbSkgbmVjaG9kw60gaW5mb3JtYWNlIG8gYWt0aXZuw60gb3BlcmFjaSwgdGFrIHNlIHRvIHDFmWVzZWxla3RvdsOhdsOhIHbFvmR5XHJcbiAgICAgICAgICAgICAgICAgICAgLyppZiAoY29tcGxldGUgPT09IHRydWUpICovcmV0dXJuIGNvbXBsZXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChjb21wbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIMO6c3DEm8WhbsSbIGRva29uxI1lbm9cclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VWN0b3ZhbmlTb3UhLnNldFBlbmRpbmcoY29tcGxldGUgPT09IHRydWUgPyAxMDAgOiAtMSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNrb27EjWlsbyBjaHlib3VcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0VWN0b3ZhbmlTb3UhLnNldFBlbmRpbmcoLTEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBha3R1YWxpemFjZSBkYXRcclxuICAgICAgICAgICAgcmV0dXJuIHByb20udGhlbigoKSA9PiB7IHJldHVybiB0aGF0LnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEoKTsgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWhyw6Fuw60gYSB6b2JyYXplbsOtIHBvaHlixa9cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkUG9oeWJ5KCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gbmHEjXRlbsOtIGRhdFxyXG4gICAgICAgICAgICB0aGF0LmJlZ2luT3BlcmF0aW9uKFwianJlczoyNDEwMDQ4MFwiKTsgLy9SQyAyNDEwMDQ4MCA6IFByb2LDrWjDoSBuYcSNdGVuw60gcG9oeWLFr1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuRmluUG9oeWIubGlzdChycSA9PiB7IHJldHVybiB7IGZpbHRlcnM6IHsgaXhwOiB0aGF0LkRldGFpbER0by5peHAgfSB9OyB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwb2hsZWRcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGEsIHsga2V5OiBcIml4cF91cHIscmFkZWtfdXBvXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZFBvaHlieSEuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2Ugb2tuYVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmRPcGVyYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFocsOhbsOtIGEgem9icmF6ZW7DrSDDusSNZXRuw61jaCB6w6FwaXPFryBzb3VwaXNreVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxvYWRVY3RaYXBpc3koKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBkb8WZZcWhaXQgYWt0dcOhbG7DrSByb2sgeCByb2sgcG9oeWJ1IC0gcHJvIGppbsO9IG5hdMOhaG5vdXQgamlub3Uga29uZmlndXJhY2kgbmVibyB6b2JyYXplbsOtIMO6cGxuxJsgemFrw6F6YXQ/XHJcblxyXG4gICAgICAgICAgICAvLyBuYcSNdGVuw60gesOhcGlzxa9cclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MjQxMDA0OTJcIik7IC8vUkMgMjQxMDA0OTIgOiBQcm9iw61ow6EgbmHEjXRlbsOtIHrDoXBpc8WvXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5aYXBpcy5saXN0KHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB6X3BvaHlidTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy96ZV9zb3VwaXNreTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBvX2l4cDogdGhhdC5EZXRhaWxEdG8uaXhwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gem9icmF6ZW7DrSB6w6FwaXPFr1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2aWV3ID0gbmV3IEdvcmRpYy5EYXRhLlZpZXcoZGF0YSwgeyBrZXk6IFwiaXhwX3VwcixyYWRla191cG8scmFkZWtfemFwXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBkYXQgYSBwxZlla3Jlc2xlbsOtIGdyaWR1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZFVjdFphcGlzeSEuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSB0YWJ1XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5lbmFibGVVY2V0bmlaYXBpc3koKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWhyw6Fuw60gYSB6b2JyYXplbsOtIGRva2xhZMWvIG8gemHDusSNdG92w6Fuw61cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkRG9rbGFkeU9aYXVjdG92YW5pKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gbmHEjXRlbsOtIGRhdCBobGF2acSNa3kgKHBvdXplIHBybyB6b2JyYXplbsOtIGRva2xhZHUpXHJcbiAgICAgICAgICAgIHRoYXQuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjI0MTAwNDc5XCIpOyAvL1JDIDI0MTAwNDc5IDogUHJvYsOtaMOhIG5hxI10ZW7DrSBkb2tsYWTFr1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuWmFwaXMubGlzdERva2xhZHUocnEgPT4geyByZXR1cm4geyBmaWx0ZXJzOiB7IHplX3NvdXBpc2t5OiAxLCB1cG9faXhwOiB0aGF0LkRldGFpbER0by5peHAgfSB9OyB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGEsIHsga2V5OiBcInJvayxsaWMsaWNvLHVjcyxtZXNpYyxhY1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWREb2tsYWR5T1phdWMhLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gdGFidVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlRG9rbGFkT1phdWN0b3ZhbmkoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYWhyw6Fuw60gYSB6b2JyYXplbsOtIHrDoXBpc8WvIGRva2xhZHVcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkWmFwaXN5RG9rbGFkdSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBkYXQgesOhcGlzxa9cclxuICAgICAgICAgICAgbGV0IGFrdERva2xhZCA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdEb2tsYWREdG8+KHRoYXQuJGdyaWREb2tsYWR5T1phdWMpO1xyXG4gICAgICAgICAgICBpZiAoYWt0RG9rbGFkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBuYcSNdGVuw60gesOhcGlzxa9cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5aYXBpcy5saXN0KHJxID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tfcm9rOiBha3REb2tsYWQhLnJvayxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19saWM6IGFrdERva2xhZCEubGljLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9rX2ljbzogYWt0RG9rbGFkIS5pY28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2tfdWNzOiBha3REb2tsYWQhLnVjcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19tZXNpYzogYWt0RG9rbGFkIS5tZXNpYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRva19hYzogYWt0RG9rbGFkIS5hY1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHpvYnJhemVuw60gesOhcGlzxa9cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogb3ByYXZpdCBrZXkgKGplIHRvIGkgdiBsb2FkUmV6ZXJ2YWNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGEsIHsga2V5OiBcInJhZGVrX3phcFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGRhdCBhIHDFmWVrcmVzbGVuw60gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kZ3JpZFphcGlzeURva2xhZHVPWmF1YyEuZ2dyaWQoXCJzZXREYXRhXCIsIHZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFocsOhbsOtIGEgem9icmF6ZW7DrSByZXplcnZhxI1uw61jaCB6w6FwaXPFr1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxvYWRSZXpaYXBpc3koKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBuYcSNdGVuw60gesOhcGlzxa9cclxuICAgICAgICAgICAgdGhhdC5iZWdpbk9wZXJhdGlvbihcImpyZXM6MjQxMDA0OTJcIik7IC8vUkMgMjQxMDA0OTIgOiBQcm9iw61ow6EgbmHEjXRlbsOtIHrDoXBpc8WvXHJcbiAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5aYXBpcy5saXN0KHJxID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXplcnZhY25pOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3plX3NvdXBpc2t5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cG9faXhwOiB0aGF0LkRldGFpbER0by5peHBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwb2hsZWRcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBvcHJhdml0IGtleSBwcm8gUk9aIChqZSB0byBpIHYgbG9hZFVjdG92YW5pRG9rbGFkeSlcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGEsIHsga2V5OiBcInJhZGVrX3phcFwiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRSZXpaYXBpc3khLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIG9rbmFcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZVJlemVydmFjbmlaYXBpc3koKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWm9icmF6w60gZGV0YWlsIHZ5YnJhbsOpaG8gcG9oeWJ1XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZGV0YWlsUG9oeWJ1KCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gYWt0dcOhbG7DrSB2eWJyYW7DoSBwb2xvxb5rYVxyXG4gICAgICAgICAgICBsZXQgYWt0UmFkZWsgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9oeWJEdG8+KHRoaXMuJGdyaWRQb2h5YnkpO1xyXG4gICAgICAgICAgICBpZiAoYWt0UmFkZWspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBwxZnDrXpuYWsgYWt0aXZuw60gb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgbGV0IG5lZWRSZWZyZXNoID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gb3RldsWZZW7DrSBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICBsZXQgJGRldGFpbFdpbmRvdyA9IHRoaXMubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgW1wiR29yZGljLkZ1Yy5XZWJDbGllbnQuR0RldGFpbFBvaHlidVwiLCB7IGdyaWRSZW1vdGVDb250cm9sOiBuZXcgR29yZGljLkNvbXBvbmVudHMuR3JpZFJDKHRoYXQuJGdyaWRQb2h5YnkhKSB9XSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEOiAnRGV0YWlsUG9oeWJ1IycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEl4cFVwcjogYWt0UmFkZWsuaXhwX3VwcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmFkZWtVcG86IGFrdFJhZGVrLnJhZGVrX3Vwb1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gb2JzbHVoYSBha3Rpdm7DrSBvcGVyYWNlIG5hIGRldGFpbHVcclxuICAgICAgICAgICAgICAgICQuY29udGVudCgkZGV0YWlsV2luZG93KS5vbihGdWNEZXRhaWwudHJpZ2dlckNoYW5nZSwgKHJldFZhbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gesOhem5hbSBieWwgem3Em27Em24sIG11c8OtIHNlIG5hxI3DrXN0IHpub3Z1XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldFZhbD8uZGF0YT8uaXhwX3VwciAmJiByZXRWYWw/LmRhdGE/LnJhZGVrX3Vwbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBidWRlIHNlIG9ixI1lcnN0dm92YXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVlZFJlZnJlc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG9ic2x1aGEgdWtvbsSNZW7DrSBva25hXHJcbiAgICAgICAgICAgICAgICAkZGV0YWlsV2luZG93Lm9uKFwiY2xvc2VkXCIsIChyZXRWYWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIGRldGFpbHUgKGJ5bGEtbGkgYWt0aXZuw60gb3BlcmFjZSB2IG90ZXbFmWVuw6ltIGRldGFpbHUpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5lZWRSZWZyZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkZGV0YWlsV2luZG93LmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmxvxb5lbsOtIHBvaHlixa8gbmEgc291cGlza3VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB2bG96ZW5pUG9oeWJ1KCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEZ1Y0RldGFpbC5ydW5Jc2xBY3Rpb25XaXRoUHJvbWlzZS8qPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0b1tdLCBJc2wuR1NlcnZpY2VHcm91cFJlcXVlc3Q8RnVjLkludGVyZmFjZS5HUG9oeWJWbG96ZW5pRG9Tb3VwaXNreU9wZXJhdGlvbkR0bz4sIElzbC5HU2VydmljZUdyb3VwUmVzcG9uc2U8RnVjLkludGVyZmFjZS5HUG9oeWJQa0R0bz4+Ki8oXHJcbiAgICAgICAgICAgICAgICB0aGlzLFxyXG4gICAgICAgICAgICAgICAgdGhhdC5pc2wuRmluUG9oeWIubGlzdChycSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc191cG86IEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5TVXBvLk5lemF1Y3RvdmFueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNfc3RvOiBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1N0by5OZXN0b3Jub3Zhbm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBfdXBvOiBbR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVwby5VY2V0bmlBdXRvbWF0aWNreSwgR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVwby5VY2V0bmlTdG9ybm8sIEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVcG8uVWNldG5pUG9sb2F1dG9tYXRpY2t5LCBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVXBvLlVjZXRuaVJ1Y25pLCBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVXBvLk5ldWNldG5pXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvazogdGhhdC5EZXRhaWxEdG8ucm9rLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmV6X3NvdXBpc2t5OiB0cnVlLypcIlwiKi8vKm51bGwqLyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh1Zl9uZXVjdG92YW5lOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2V0RGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGxpc3QvKjogR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvW10gfCBudWxsKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdsO9YsSbciBwb2xvxb5reSB6IG5hxI10ZW7DqWhvIHNlem5hbXUgcyBrb250cm9sb3UgYSBwxZnDrXBhZG5vdSB1cHJhdm91IMSNw6FzdGt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGdyaWRGb3JtYXQgPSBGdWNHcmlkLlBvaHliLmNyZWF0ZUdyaWRGb3JtYXQodGhhdCwgR2xvYmFscy5FbnVtcy5UeXBTZXpQb2guVWN0b3ZhbmksIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHb3JkaWMuRGF0YS5TZWxlY3RvcnMuRGVmYXVsdFNlbGVjdG9yPEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbGlzdCA/PyBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyaWRGb3JtYXQ6IGdyaWRGb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJqcmVzOjI0MTAwMzY5XCIsIC8vUkMgMjQxMDAzNjkgOiBWw71ixJtyIHBvaHlixa8gcHJvIHZsb8W+ZW7DrSBkbyBzb3VwaXNreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGk6IC8qZmFsc2UqL3RydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5TZWxlY3RFbXB0eTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWxhdGVkOiB0aGF0LmVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmlkT3B0czoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGHFviBidWRlIGRvxZllxaFlbm8sIHYgamFrw71jaCBzbG91cGPDrWNoIHNlIGhsZWTDoSwgdGFrIHVwcmF2aXQgaSB0ZW50byBzZXpuYW0gKHTFmWViYSBuYSB0byB1ZMSbbGF0IHNwb2xlxI1ub3UgbWV0b2R1KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogZ3JpZEZvcm1hdC5jb2x1bW5zLm1hcChlID0+IFwiKlwiICsgZS5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvZGxlIHbDvWNob3rDrWhvIHBvaGxlZHUgeiBGdWNHcmlkLlBvaHliLmdldEdyaWRPcHRpb25zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwiaXhwX3VwcixyYWRla191cG8sdHlwX3Vwb190eHQsc191cG9fdHh0LHNfc3RvX3R4dCxrdGdfdXBvX3R4dCx6bmFtX3R4dCxjX3Vwbyxwb3Bpc191cG8sc3ViamVrdC5lc3VfdHh0LGRhdF91cG8sZGF0X3phdWMsb2JkX2RhbixzdWJyYWRhX2R1eixwcml6X2RkX3R4dFwiLnJlcGxhY2UoL1xcLi9naSwgR2luLldlYkNsaWVudC5HU2hhcmVkSXNsLk5hbWVTZXBhcmF0b3IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBhcyBHR3JpZE9wdGlvbnM8YW55PixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJTZXR0aW5nczogXCJkZWZhdWx0U2VsZWN0b3JzLlZ5YmVyUG9oeWJ1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc29sYXRlZFVzZXJTZXR0aW5nczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaG93KHsgd2lkdGg6IDEwMDAsIGhlaWdodDogNjAwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuVmFsdWUgIT0gbnVsbC8qICYmICEocmV0dXJuVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb2h5YiBieWwgdnlicsOhblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShyZXR1cm5WYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSA/IFtyZXR1cm5WYWx1ZV0gOiByZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAoZGF0YTogR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvW10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB2bG/FvmVuw60gcG9sb8W+a3kgbmEgesOhcG/EjXRvdsO9IGxpc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcMWZaWRhdCB2w61jZSBwb2h5YsWvIG5lamRlLCBwcm90b8W+ZSBuZW3DoW0gSUtDIC0gcG9rdWQgYnkgdG8gYnlsbyBwb3TFmWViYSwgdGFrIHRvIGRvZMSbbGF0XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkZpblBvaHliLmhyb21hZG5lVmxvekRvU291cGlza3kvKnZsb3pEb1NvdXBpc2t5Ki8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpeHA6IHRoYXQuSXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bG96aXQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAoKSA9PiB7IHJldHVybiB0aGF0LnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEoKSB9LFxyXG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zLmFjdFBvaHlieVNvdVZsb3plbmkhXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vICAgIGNvbnN0IHByb20gPSB0aGF0LmlzbC5GaW5Qb2h5Yi5saXN0KHJxID0+IHtcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBzX3VwbzogR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNVcG8uTmV6YXVjdG92YW55LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIFRPRE86IGplIHBvdMWZZWJhIGRvxZllxaFpdCBzdG9ybm8gcG9oeWLFryB2IHNvdXBpc2NlIGEgcGFrIHBvZGxlIHRvaG8gcMWZw61wYWRuxJsgdXByYXZpdCB0eXRvIHBvZG3DrW5reSBhIHRha8OpIHBvZG3DrW5reSBuYSDDusSNdG92w6Fuw60gcG9oeWLFryBzb3VwaXNlayBhIGtvbnRyb2x1IGNlbMO9Y2ggc291cGlzZWsgcMWZZWQgw7rEjXRvdsOhbsOtbSBhIHRha8OpIHVwcmF2aXQgc3Rvcm5vIHBvaHlixa9cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAvL3Nfc3RvOiBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1N0by5OZXN0b3Jub3Zhbm8sXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdHlwX3VwbzogW0dvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVcG8uVWNldG5pQXV0b21hdGlja3ksIEdvcmRpYy5GdWMuR2xvYmFscy5FbnVtcy5UeXBVcG8uVWNldG5pU3Rvcm5vLCBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuVHlwVXBvLlVjZXRuaVBvbG9hdXRvbWF0aWNreSwgR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVwby5VY2V0bmlSdWNuaSwgR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlR5cFVwby5OZXVjZXRuaV0sXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgcm9rOiB0aGF0LkRldGFpbER0by5yb2ssXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgYmV6X3NvdXBpc2t5OiB0cnVlLypcIlwiKi8vKm51bGwqLyxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBodWZfbmV1Y3RvdmFuZTogdHJ1ZVxyXG4gICAgICAgIC8vICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICB9O1xyXG4gICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgIC5nZXREYXRhKClcclxuICAgICAgICAvLyAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YTogR29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvW10gfCBudWxsKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAvLyB2w71ixJtyIHBvbG/Fvmt5IHogbmHEjXRlbsOpaG8gc2V6bmFtdSBzIGtvbnRyb2xvdSBhIHDFmcOtcGFkbm91IHVwcmF2b3UgxI3DoXN0a3lcclxuICAgICAgICAvLyAgICAgICAgICAgIGNvbnN0IGdyaWRGb3JtYXQgPSBGdWNHcmlkLlBvaHliLmNyZWF0ZUdyaWRGb3JtYXQodGhhdCwgR2xvYmFscy5FbnVtcy5UeXBTZXpQb2guVWNldG5pUG9oeWJ5LCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gbmV3IEdvcmRpYy5EYXRhLlNlbGVjdG9ycy5EZWZhdWx0U2VsZWN0b3I8R29yZGljLkZ1Yy5JbnRlcmZhY2UuR1BvaHliRHRvPih7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZGF0YTogZGF0YSA/PyBbXSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBncmlkRm9ybWF0OiBncmlkRm9ybWF0LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHRpdGxlOiBcImpyZXM6MjQxMDAzNjlcIiwgLy9SQyAyNDEwMDM2OSA6IFbDvWLEm3IgcG9oeWLFryBwcm8gdmxvxb5lbsOtIGRvIHNvdXBpc2t5XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgbXVsdGk6IC8qZmFsc2UqL3RydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgY2FuU2VsZWN0RW1wdHk6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHJlbGF0ZWQ6IHRoYXQuZWxlbWVudCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBncmlkT3B0czoge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICBjb2x1bW5Nb2RlOiBcImZ1bGxcIixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogYcW+IGJ1ZGUgZG/FmWXFoWVubywgdiBqYWvDvWNoIHNsb3VwY8OtY2ggc2UgaGxlZMOhLCB0YWsgdXByYXZpdCBpIHRlbnRvIHNlem5hbSAodMWZZWJhIG5hIHRvIHVkxJtsYXQgc3BvbGXEjW5vdSBtZXRvZHUpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogZ3JpZEZvcm1hdC5jb2x1bW5zLm1hcChlID0+IFwiKlwiICsgZS5uYW1lKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH0gYXMgR0dyaWRPcHRpb25zPGFueT4sXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgdXNlclNldHRpbmdzOiBcImRlZmF1bHRTZWxlY3RvcnMuVnliZXJQb2h5YnVcIixcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBpc29sYXRlZFVzZXJTZXR0aW5nczogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgLnNob3coeyB3aWR0aDogMTAwMCwgaGVpZ2h0OiA2MDAgfSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0dXJuVmFsdWUpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVyblZhbHVlICE9IG51bGwvKiAmJiAhKHJldHVyblZhbHVlIGluc3RhbmNlb2YgQXJyYXkpKi8pIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvaHliIGJ5bCB2eWJyw6FuYVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEocmV0dXJuVmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgPyBbcmV0dXJuVmFsdWVdIDogcmV0dXJuVmFsdWU7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAudGhlbihmdW5jdGlvbiAocG9oeWJ5OiBHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9oeWJEdG9bXSB8IHVuZGVmaW5lZCB8IG51bGwpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIC8vIHZsb8W+ZW7DrSBwb2xvxb5reSBuYSB6w6Fwb8SNdG92w70gbGlzdFxyXG4gICAgICAgIC8vICAgICAgICAgICAgaWYgKHBvaHlieSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIC8vIFRPRE86IHDFmWlkYXQgdsOtY2UgcG9oeWLFryBuZWpkZSwgcHJvdG/FvmUgbmVtw6FtIElLQyAtIHBva3VkIGJ5IHRvIGJ5bG8gcG90xZllYmEsIHRhayB0byBkb2TEm2xhdFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5GaW5Qb2h5Yi5ocm9tYWRuZVZsb3pEb1NvdXBpc2t5Lyp2bG96RG9Tb3VwaXNreSovKHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgaXhwOiB0aGF0Lkl4cCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgdmxveml0OiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICByb3dzOiBwb2h5YnlcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAuZ2V0KClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAvLyAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKTtcclxuICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgLy8uZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gICAgLy8gICAgLy8gVE9ETzogenByYWNvdsOhdmF0IHbDvXNsZWRlaz9cclxuICAgICAgICAvLyAgICAvLyAgICAvLyDDunNwxJvFoW7EmyBkb2tvbsSNZW5vXHJcbiAgICAgICAgLy8gICAgLy8gICAgdGhhdC5hY3Rpb25zLmFjdFBvaHlieVNvdVZsb3plbmkhLnNldFBlbmRpbmcoMTAwKTtcclxuICAgICAgICAvLyAgICAvL30pXHJcbiAgICAgICAgLy8gICAgLy8uZmFpbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gICAgLy8gICAgLy8gc2tvbsSNaWxvIGNoeWJvdVxyXG4gICAgICAgIC8vICAgIC8vICAgIHRoYXQuYWN0aW9ucy5hY3RQb2h5YnlTb3VWbG96ZW5pIS5zZXRQZW5kaW5nKC0xKTtcclxuICAgICAgICAvLyAgICAvL30pO1xyXG5cclxuICAgICAgICAvLyAgICAvLyBha3R1YWxpemFjZSBkYXRcclxuICAgICAgICAvLyAgICByZXR1cm4gcHJvbS50aGVuKCgpID0+IHsgcmV0dXJuIHRoYXQuc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YSgpOyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZ5am11dMOtIHZ5YnJhbsOpaG8gcG9oeWJ1IHplIHNvdXBpc2t5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2UgcyBvcGVyYWPDrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgdnlqbXV0aVBvaHlidSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGFrdHXDoWxuw60gdnlicmFuw70gcG9oeWJcclxuICAgICAgICAgICAgbGV0IGFrdFBvaCA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdQb2h5YkR0bz4odGhpcy4kZ3JpZFBvaHlieSk7XHJcbiAgICAgICAgICAgIGlmIChha3RQb2gpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBGdWNEZXRhaWwucnVuSXNsQWN0aW9uV2l0aENvbmZpcm0oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICBcImpyZXM6MjQxMDAzMTNcIiwgLy9SQyAyNDEwMDMxMyA6IE9wcmF2ZHUgY2hjZXRlIHZ5am1vdXQgdnlicmFuw70gcG9oeWIgemUgc291cGlza3k/XHJcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyByZXR1cm4gdGhhdC5pc2wuRmluUG9oeWIudmxvekRvU291cGlza3koeyBpeHA6IHRoYXQuSXhwLCB2bG96aXQ6IGZhbHNlLCByb3dzOiBbYWt0UG9oIV0gfSk7IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4geyByZXR1cm4gdGhhdC5zZXRBY3RpdmVPcGVyYXRpb25BbmRSZWxvYWREYXRhKCkgfSxcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnMuYWN0UG9oeWJ5U291VnlqbXV0aSFcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERpYWdub3N0aWthICh1bG/FvmVuw60gZGF0KSBzb3VwaXNreVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGRpYWdub3N0aWthKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gdWxvxb5lbsOtIHppcHUgcyBkYXR5IGFrdHXDoWxuw60gc291cGlza3lcclxuICAgICAgICAgICAgLy8gVE9ETzogZG9kxJtsYXQgZGlhZ25vc3Rpa3Ugc291cGlza3lcclxuICAgICAgICAgICAgcmV0dXJuIEZ1Y0RldGFpbC5kaWFnbm9zdGlrYShXZmwuSW50ZXJmYWNlLkdJZGVudGlmaWthdG9yQ29Kc2VtWmFjLlNvdXBpc2thUG9oeWJ1LCB0aGlzLkl4cCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVbG/FvmVuw60gLyB6b2JyYXplbsOtIGRva2xhZHUgbyB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGRva2xhZE9aYXVjdG92YW5pKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuRGV0YWlsRHRvLkplWmF1Y3RvdmFuYSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGFrdERva2xhZCA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdEb2tsYWREdG8+KHRoaXMuJGdyaWREb2tsYWR5T1phdWMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFrdERva2xhZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVsb8W+ZW7DrS9vdGV2xZllbsOtIHNvdWJvcnVcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gRnVjRGV0YWlsLmRva2xhZE9aYXVjdG92YW5pKHRoaXMsIG51bGwvKmFrdERva2xhZD8uaXhiX2R6dSovLCBha3REb2tsYWQ/LnJvaywgYWt0RG9rbGFkPy5saWMsIGFrdERva2xhZD8uaWNvLCBha3REb2tsYWQ/LnVjcywgYWt0RG9rbGFkPy5tZXNpYywgYWt0RG9rbGFkPy5hYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXplbsOtIGhpc3RvcmllIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGhpc3RvcmllVWN0b3ZhbmkoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5EZXRhaWxEdG8uaXhzX2h1ZiAhPSBudWxsICYmIHRoaXMuRGV0YWlsRHRvLml4c19odWYgPiBcIiBcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gem9icmF6ZW7DrSBoaXN0b3JpZSDDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IG5ldWTEm2xhdCB0byBwb2RvYm7EmyBqYWtvIHNlIMWZZcWhw60gb3RldsWZZW7DrSBvc3RhdG7DrWNoIGRldGFpbMWvXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZShcclxuICAgICAgICAgICAgICAgICAgICBbXCJHb3JkaWMuRnVjLldlYkNsaWVudC5HRGV0YWlsSGlzdG9yaWVVY3RvdmFuaVBvaHlidVwiXSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEOiAnRGV0YWlsSGlzdG9yaWVVY3RvdmFuaSMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBJeHNIdWY6IHRoaXMuRGV0YWlsRHRvLml4c19odWZcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVqZWN0KCkucHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW7DrSBwcnZrxa8gdmUgZm9ybXVsw6HFmWlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGVuYWJsZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIC8vIHBydmt5XHJcbiAgICAgICAgICAgIGNvbnN0IHBlcm1zID0gdGhpcy5EZXRhaWxEdG8uUGVybWlzc2lvbnM7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IG1hasOtIGLDvXQgaXhwX2RlbiwgYWMgYSBhY19hZyBlZGl0b3ZhdGVsbsOpP1xyXG4gICAgICAgICAgICBjb25zdCBsX2JEaXNhYmxlSGVhZGVySXRlbXMgPSAhRnVjRGV0YWlsLkNvbnZlcnRQZXJtaXNzaW9uVG9Cb29sKHBlcm1zID8gcGVybXMuTHplRXZpZG92YXQgOiB1bmRlZmluZWQpO1xyXG4gICAgICAgICAgICBjb25zdCBsX2JEaXNhYmxlT3RoZXJJdGVtcyA9ICFGdWNEZXRhaWwuQ29udmVydFBlcm1pc3Npb25Ub0Jvb2wodGhpcy5FZGl0YWNlID8geyB2YWx1ZTogdHJ1ZSB9IDogKHBlcm1zID8gcGVybXMuTHplRXZpZG92YXQgOiB1bmRlZmluZWQpKTtcclxuICAgICAgICAgICAgY29uc3QgaGVhZGVyRmllbGRzID0gR29yZGljLkVrby5IZWFkZXJGb3JtLkZpZWxkcztcclxuICAgICAgICAgICAgLy90aGlzLmVsZW1lbnQuZmluZEZpZWxkcyhoZWFkZXJGaWVsZHMuS25paGEpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGxfYkRpc2FibGVIZWFkZXJJdGVtcyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5lbGVtZW50LmZpbmRGaWVsZHMoaGVhZGVyRmllbGRzLkV2aWRlbmNuaUNpc2xvKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBsX2JEaXNhYmxlSGVhZGVySXRlbXMpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZWxlbWVudC5maW5kRmllbGRzKGhlYWRlckZpZWxkcy5BZ2VuZG92ZUNpc2xvKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBsX2JEaXNhYmxlSGVhZGVySXRlbXMpO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZEZpZWxkcyhoZWFkZXJGaWVsZHMuVHlwRG9rbGFkdSkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgbF9iRGlzYWJsZUhlYWRlckl0ZW1zKTtcclxuICAgICAgICAgICAgLy8gVE9ETzogbcOhIGLDvXQgZGF0dW0gZXZpZGVuY2UgdsWvYmVjIGVkaXRvdmF0ZWxuw70/XHJcbiAgICAgICAgICAgIC8vdGhpcy5lbGVtZW50LmZpbmRGaWVsZHMoaGVhZGVyRmllbGRzLkRhdHVtRXZpZGVuY2UpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGxfYkRpc2FibGVPdGhlckl0ZW1zKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmRGaWVsZHMoaGVhZGVyRmllbGRzLlBvcGlzKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBsX2JEaXNhYmxlT3RoZXJJdGVtcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kRmllbGRzKFwidHlwX2FnXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGxfYkRpc2FibGVPdGhlckl0ZW1zKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmRGaWVsZHMoXCJjX3NvdXBcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgbF9iRGlzYWJsZU90aGVySXRlbXMgfHwgdGhpcy5EZXRhaWxEdG8ucHJpel9hdXRfcG9jX2MgPT09IHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZEZpZWxkcyhcInByaXpfcG92X3VjdF9qZWRuXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGxfYkRpc2FibGVPdGhlckl0ZW1zKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmRGaWVsZHMoXCJwcml6X3Bvdl91Y3RfaHJvbVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBsX2JEaXNhYmxlT3RoZXJJdGVtcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kRmllbGRzKFwicHJpel9wb3ZfdWN0X2t1bVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBsX2JEaXNhYmxlT3RoZXJJdGVtcyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5lbGVtZW50LmZpbmRGaWVsZHMoXCJwcml6X3VjdF9uYWplZG5vdVwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBsX2JEaXNhYmxlT3RoZXJJdGVtcyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5lbGVtZW50LmZpbmRGaWVsZHMoXCJwcml6X2t1bV96YV9zb3VwXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGxfYkRpc2FibGVPdGhlckl0ZW1zKTtcclxuICAgICAgICAgICAgLy90aGlzLmVsZW1lbnQuZmluZEZpZWxkcyhcInByaXpfa3VtX3phX2l4cHVwclwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBsX2JEaXNhYmxlT3RoZXJJdGVtcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kRmllbGRzKFwicHJpel9hdXRfcG9jX2NcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgbF9iRGlzYWJsZU90aGVySXRlbXMpO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZEZpZWxkcyhcInByaXpfbmVfYWt0X29wX2Z1Y1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBsX2JEaXNhYmxlT3RoZXJJdGVtcyB8fCB0aGlzLkRldGFpbER0by50eXBfYWcgPT09IEdsb2JhbHMuRW51bXMuVHlwQWcuRlVDIHx8IHRoaXMuRGV0YWlsRHRvLnR5cF9hZyA9PT0gR2xvYmFscy5FbnVtcy5UeXBBZy5JTlQpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZWxlbWVudC5maW5kRmllbGRzKFwicHJpel9zdGF2X2Zpbl9rb250XCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGxfYkRpc2FibGVPdGhlckl0ZW1zKTtcclxuICAgICAgICAgICAgLy90aGlzLmVsZW1lbnQuZmluZEZpZWxkcyhcInByaXpfc2NoX3ByZXNfZXBrXCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGxfYkRpc2FibGVPdGhlckl0ZW1zKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrY2VcclxuICAgICAgICAgICAgY29uc3QgcGVybUVkaXRhY2UgPSBGdWNEZXRhaWwuZ2V0RWRpdFBlcm1pc3Npb24oKTtcclxuICAgICAgICAgICAgLy9jb25zdCBwZXJtRW1wdHlHcmlkID0gRnVjR3JpZC5nZXRFbXB0eUdyaWRQZXJtaXNzaW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjdHMgPSB0aGlzLmFjdGlvbnM7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0UG9kYW5pU291IS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6IChwZXJtcyA/IHBlcm1zLkx6ZVBvZGF0IDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiB2cmFjw60sIMW+ZSBqZSBuxJtjbyB6bcSbbsSbbm8sIGkga2R5xb4gYnkgbmljIHptxJtuxJtubyBiw710IG5lbcSbbG8gLSBwcm/EjT8gYXNpIGpkZSBvIMO6ZGFqZSB6IGRva3VtZW50dSwgYWxlIG5hIHrDoXBvxI10b3bDqW0gbGlzdHUgcyB0w61tIHByb2Jsw6lteSBuZWpzb3VcclxuICAgICAgICAgICAgLy9jb25zdCBmb3JtQ2hhbmdlZCA9IHRoaXMuZmluZEZvcm1zKCkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpO1xyXG4gICAgICAgICAgICAvL2xldCB5eXkgPSB0aGlzLmZpbmRGb3JtcygpLmdmb3JtKFwiaGFzQ2hhbmdlZFwiKTtcclxuICAgICAgICAgICAgLy9pZiAoeXl5KSB7XHJcbiAgICAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiem3Em27Em25vXCIpO1xyXG4gICAgICAgICAgICAvLyAgICAvL2xldCB6enoyID0gdGhpcy5maW5kRmllbGRzKCkuZmlsdGVyKChpZHgsIGYpID0+IHsgcmV0dXJuICQoZikuZ2ZpZWxkKFwiaGFzQ2hhbmdlZFwiKSB9KTtcclxuICAgICAgICAgICAgLy8gICAgY29uc29sZS5sb2codGhpcy5maW5kRmllbGRzKCkuZmlsdGVyKChpZHgsIGYpID0+IHsgcmV0dXJuICQoZikuZ2ZpZWxkKFwiaGFzQ2hhbmdlZFwiKSB9KSk7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAvL2Vsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhcIm5lem3Em27Em25vXCIpO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgYWN0cy5hY3RFdmlkZW5jZVNvdSEudXBkYXRlUGVybWlzc2lvbigoLypmb3JtQ2hhbmdlZCB8fCAqL3RoaXMuRWRpdGFjZSA/IHsgdmFsdWU6IHRydWUgfSA6IChwZXJtcyA/IHBlcm1zLkx6ZUV2aWRvdmF0IDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdE9wcmF2YVNvdSEudmlzaWJsZSghdGhpcy5FZGl0YWNlKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RPcHJhdmFTb3UhLnVwZGF0ZVBlcm1pc3Npb24oKHRoaXMuRWRpdGFjZSA/IHBlcm1FZGl0YWNlIDogKHBlcm1zID8gcGVybXMuTHplT3ByYXZpdCA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RacnVzaXRabWVueVNvdSEudmlzaWJsZSh0aGlzLkVkaXRhY2UpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFpydXNpdFptZW55U291IS51cGRhdGVQZXJtaXNzaW9uKCghdGhpcy5FZGl0YWNlID8gRnVjRGV0YWlsLmdldEVkaXRQZXJtaXNzaW9uKGZhbHNlKSA6IHsgdmFsdWU6IHRydWUgfSkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFN0b3Jub1NvdSEudXBkYXRlUGVybWlzc2lvbigodGhpcy5FZGl0YWNlID8gcGVybUVkaXRhY2UgOiAocGVybXMgPyBwZXJtcy5MemVTdG9ybm92YXQgOiB1bmRlZmluZWQpKSk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0WnJ1c2l0U3Rvcm5vU291IS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6IChwZXJtcyA/IHBlcm1zLkx6ZVpydXNpdFN0b3JubyA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RTY2h2YWxlbmlTb3UhLnVwZGF0ZVBlcm1pc3Npb24oKHRoaXMuRWRpdGFjZSA/IHBlcm1FZGl0YWNlIDogKHBlcm1zID8gcGVybXMuTHplU2NodmFsaXQgOiB1bmRlZmluZWQpKSk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0WnJ1c2l0U2NodmFsZW5pU291IS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6IChwZXJtcyA/IHBlcm1zLkx6ZVpydXNpdFNjaHZhbGVuaSA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RVemF2cmVuaVNvdSEudXBkYXRlUGVybWlzc2lvbigodGhpcy5FZGl0YWNlID8gcGVybUVkaXRhY2UgOiAocGVybXMgPyBwZXJtcy5MemVVemF2cml0IDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFpydXNpdFV6YXZyZW5pU291IS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6IChwZXJtcyA/IHBlcm1zLkx6ZVpydXNpdFV6YXZyZW5pIDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFByZWRhbmlTb3UhLnVwZGF0ZVBlcm1pc3Npb24oKHRoaXMuRWRpdGFjZSA/IHBlcm1FZGl0YWNlIDogKHBlcm1zID8gcGVybXMuTHplUHJlZGF0IDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFByZXZ6ZXRpU291IS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6IChwZXJtcyA/IHBlcm1zLkx6ZVByZXZ6aXQgOiB1bmRlZmluZWQpKSk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0UHJpZGVsZW5pU291IS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6IChwZXJtcyA/IHBlcm1zLkx6ZVByaWRlbGl0IDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFByZWV2aWRlbmNlU291IS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6IChwZXJtcyA/IHBlcm1zLkx6ZVByZWV2aWRvdmF0IDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFZyYWNlbmlTb3VEb1dmbCEudXBkYXRlUGVybWlzc2lvbigodGhpcy5FZGl0YWNlID8gcGVybUVkaXRhY2UgOiAocGVybXMgPyBwZXJtcy5MemVWcmF0aXREb1dmbCA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RVY3RvdmFuaVNvdSEudXBkYXRlUGVybWlzc2lvbigodGhpcy5FZGl0YWNlID8gcGVybUVkaXRhY2UgOiAocGVybXMgPyBwZXJtcy5MemVVY3RvdmF0IDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdERpYWdub3N0aWthU291IS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6IChwZXJtcyA/IHBlcm1zLkx6ZURpYWdub3N0aWthIDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdE9iY2Vyc3R2ZW5pU291IS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6IHsgdmFsdWU6IHRydWUgfSkpO1xyXG4gICAgICAgICAgICAvL2FjdHMuYWN0VGlza1MhLnVwZGF0ZVBlcm1pc3Npb24oKHRoaXMuRWRpdGFjZSA/IHBlcm1FZGl0YWNlIDogKHBlcm1zID8gcGVybXMuTHplVGlza25vdXQgOiB1bmRlZmluZWQpKSk7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IGplxaF0xJsgdnLDoWNlbsOtIGRvIFdGTFxyXG5cclxuICAgICAgICAgICAgLy8gc3RhdHVzIGJhclxyXG4gICAgICAgICAgICAvLyB6bGlrdmlkb3bDoW5hIE9LIGppbmFrIHZhcm92w6Fuw61cclxuICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdCBzcHLDoXZuw6kgc3RhdnlcclxuICAgICAgICAgICAgLy9Hb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbSh0aGlzLnN0YXR1c2VzIVtcInN0YXR1c0JhclN0YXZcIl0hLCB0aGlzLkRldGFpbER0by5zX3NvdXBfdHh0ISwgKHRoaXMuRGV0YWlsRHRvLnNfc291cCEgPCBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1NvdXAuU2NodmFsZW5hID8gR29yZGljLkdpbi5HbG9iYWxzLkVudW1zLkNvbG9yU3RhdGVDbGFzcy5pbmZvIDogKHRoaXMuRGV0YWlsRHRvLnNfc291cCA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNTb3VwLlN0b3Jub3ZhbmEgPyBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuQ29sb3JTdGF0ZUNsYXNzLndhcm5pbmcgOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuQ29sb3JTdGF0ZUNsYXNzLnN1Y2Nlc3MpKSk7XHJcbiAgICAgICAgICAgIEVrby5EZXRhaWwuU3RhdHVzQmFyLnVwZGF0ZUl0ZW0oXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c2VzIVtcInN0YXR1c0JhclN0YXZcIl0hLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5EZXRhaWxEdG8uc19zb3VwX3R4dD8udG9VcHBlckNhc2UoKSA/PyBcIlwiLFxyXG4gICAgICAgICAgICAgICAgKHRoaXMuRGV0YWlsRHRvLnNfc291cCA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNTb3VwLlNjaHZhbGVuYVxyXG4gICAgICAgICAgICAgICAgICAgID8gRWtvLlV0aWxzLlJlY29yZEZvcm1hdFR5cGUuU2NodmFsZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgOiAodGhpcy5EZXRhaWxEdG8uc19zb3VwID09PSBHb3JkaWMuRnVjLkdsb2JhbHMuRW51bXMuU1NvdXAuWmF1Y3RvdmFuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IEVrby5VdGlscy5SZWNvcmRGb3JtYXRUeXBlLlJlYWxpem92YW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKHRoaXMuRGV0YWlsRHRvLnNfc291cCA9PT0gR29yZGljLkZ1Yy5HbG9iYWxzLkVudW1zLlNTb3VwLlN0b3Jub3ZhbmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gRWtvLlV0aWxzLlJlY29yZEZvcm1hdFR5cGUuU3Rvcm5vdmFub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkpKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBha2NlIHBybyBwb2h5YnlcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVHcmlkUG9oKCk7XHJcblxyXG4gICAgICAgICAgICAvLyB0YWIgw7rEjXRvdsOhbsOtIGEgcmV6ZXJ2YWNlXHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlVWNldG5pWmFwaXN5KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlUmV6ZXJ2YWNuaVphcGlzeSgpO1xyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZURva2xhZE9aYXVjdG92YW5pKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIHN0YXZ1IGFrY8OtIHBybyBncmlkIHBvbG/FvmVrXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGVHcmlkUG9oKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gYWt0dcOhbG7DrSBwb2xvxb5rYVxyXG4gICAgICAgICAgICBjb25zdCBha3RQb2ggPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9oeWJEdG8+KHRoaXMuJGdyaWRQb2h5YnkpO1xyXG5cclxuICAgICAgICAgICAgLy8gYWtjZSBwb2xvxb5la1xyXG4gICAgICAgICAgICBjb25zdCBwZXJtRWRpdGFjZSA9IEZ1Y0RldGFpbC5nZXRFZGl0UGVybWlzc2lvbigpO1xyXG4gICAgICAgICAgICBjb25zdCBhY3RzID0gdGhpcy5hY3Rpb25zO1xyXG4gICAgICAgICAgICBjb25zdCBwZXJtcyA9IHRoaXMuRGV0YWlsRHRvLlBlcm1pc3Npb25zO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFBvaHlieVNvdURldGFpbCEudXBkYXRlUGVybWlzc2lvbih7IHZhbHVlOiBha3RQb2ggIT09IG51bGwgPyB0cnVlIDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0UG9oeWJ5U291VmxvemVuaSEudXBkYXRlUGVybWlzc2lvbigodGhpcy5FZGl0YWNlID8gcGVybUVkaXRhY2UgOiAocGVybXMgPyBwZXJtcy5MemVWbG96aXRQb2h5YiA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RQb2h5YnlTb3VWeWptdXRpIS51cGRhdGVQZXJtaXNzaW9uKChha3RQb2ggPT09IG51bGwgfHwgdGhpcy5FZGl0YWNlID8gcGVybUVkaXRhY2UgOiAocGVybXMgPyBwZXJtcy5MemVWeWptb3V0UG9oeWIgOiB1bmRlZmluZWQpKSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW7DrSBwcnZrxa8gdiB0YWJ1IMO6xI1ldG7DrSB6w6FwaXN5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGVVY2V0bmlaYXBpc3koKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBha3R1w6FsbsSbIG5hIHRhYnUgbmVqc291IMW+w6FkbsOhIGFrY2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5hc3RhdmVuw60gcHJ2a8WvIHYgdGFidSBkb2tsYWQgbyB6YcO6xI10b3bDoW7DrVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlRG9rbGFkT1phdWN0b3ZhbmkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBha3R1w6FsbsOtIGRva2xhZFxyXG4gICAgICAgICAgICBjb25zdCBha3RSYWRla0RvayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5GdWMuSW50ZXJmYWNlLkdEb2tsYWREdG8+KHRoaXMuJGdyaWREb2tsYWR5T1phdWMpO1xyXG5cclxuICAgICAgICAgICAgLy8gYWtjZSBkb2tsYWTFr1xyXG4gICAgICAgICAgICBjb25zdCBwZXJtRW1wdHlHcmlkID0gRnVjR3JpZC5nZXRFbXB0eUdyaWRQZXJtaXNzaW9uKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjdHMgPSB0aGlzLmFjdGlvbnM7XHJcbiAgICAgICAgICAgIC8vY29uc3QgcGVybXMgPSB0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucztcclxuICAgICAgICAgICAgYWN0cy5hY3RVY3RvdmFuaVNvdVRpc2tEb2tsYWR1IS51cGRhdGVQZXJtaXNzaW9uKGFrdFJhZGVrRG9rICE9PSBudWxsID8gKHRoaXMuRGV0YWlsRHRvLkplWmF1Y3RvdmFuYSA9PT0gdHJ1ZSA/IHsgdmFsdWU6IHRydWUgfSA6IHsgdmFsdWU6IGZhbHNlLCBtZXNzYWdlOiBcIkRva2xhZCBuZW7DrSB6YcO6xI10b3bDoW5cIiB9KSA6IHBlcm1FbXB0eUdyaWQpO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFVjdG92YW5pU291VGlza1ZzZWNoRG9rbGFkdSEudXBkYXRlUGVybWlzc2lvbihha3RSYWRla0RvayAhPT0gbnVsbCA/ICh0aGlzLkRldGFpbER0by5KZVphdWN0b3ZhbmEgPT09IHRydWUgPyB7IHZhbHVlOiB0cnVlIH0gOiB7IHZhbHVlOiBmYWxzZSwgbWVzc2FnZTogXCJEb2tsYWQgbmVuw60gemHDusSNdG92w6FuXCIgfSkgOiBwZXJtRW1wdHlHcmlkKTtcclxuICAgICAgICAgICAgYWN0cy5hY3RVY3RvdmFuaVNvdURva2xhZE9aYXVjdG92YW5pIS51cGRhdGVQZXJtaXNzaW9uKGFrdFJhZGVrRG9rICE9PSBudWxsID8gKHRoaXMuRGV0YWlsRHRvLkplWmF1Y3RvdmFuYSA9PT0gdHJ1ZSA/IC8qKGFrdFJhZGVrRG9rLml4Yl9kenUgIT0gbnVsbCAmJiBha3RSYWRla0Rvay5peGJfZHp1ID4gXCIgXCIgPyAoKi97IHZhbHVlOiB0cnVlIH0vKikgOiB7IHZhbHVlOiBmYWxzZSwgbWVzc2FnZTogXCJWeWdlbmVyb3ZhbsO9IGRva2xhZCBvIHphw7rEjXRvdsOhbsOtIG5lZXhpc3R1amVcIiB9KSovIDogeyB2YWx1ZTogZmFsc2UsIG1lc3NhZ2U6IFwiRG9rbGFkIG5lbsOtIHphw7rEjXRvdsOhblwiIH0pIDogcGVybUVtcHR5R3JpZCk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0VWN0b3ZhbmlTb3VJbmZvT1VjdG92YW5pIS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6ICh0aGlzLkRldGFpbER0by5peHNfaHVmICE9PSBudWxsICYmIHRoaXMuRGV0YWlsRHRvLml4c19odWYhID4gXCIgXCIgPyB0cnVlIDogZmFsc2UpIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW7DrSBwcnZrxa8gdiB0YWJ1IHJlemVydmHEjW7DrSB6w6FwaXN5XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBlbmFibGVSZXplcnZhY25pWmFwaXN5KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogYWt0dcOhbG7EmyBuYSB0YWJ1IG5lanNvdSDFvsOhZG7DoSBha2NlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIHDFmcOtem5ha3UgYWt0aXZuw60gb3BlcmFjZSBhIGFrdHVhbGl6YWNlIGRldGFpbHVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gd2l0aG91dFJlbG9hZCAoZGVmYXVsdCA9IGZhbHNlKSB0cnVlID0gbmVha3R1YWxpem92YXQgZm9ybXVsw6HFmVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRBY3RpdmVPcGVyYXRpb25BbmRSZWxvYWREYXRhKHdpdGhvdXRSZWxvYWQ6IGJvb2xlYW4gPSBmYWxzZSk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gdnl2b2zDoW7DrSB0cmlnZ2VyIG8gYWt0aXZuw60gb3BlcmFjaVxyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoRnVjRGV0YWlsLnRyaWdnZXJDaGFuZ2UsIFt7IGRhdGE6IHRoaXMuRGV0YWlsRHRvIH1dKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIGRldGFpbHVcclxuICAgICAgICAgICAgaWYgKCF3aXRob3V0UmVsb2FkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcihcInJlbWVtYmVyaW5pdGlhbG9wZW5cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlc29sdmUoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBabm92dSBuYcSNdGUgY2Vsw70gZm9ybXVsw6HFmVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHJlbG9hZERhdGEoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQudHJpZ2dlcihcInJlbWVtYmVyaW5pdGlhbG9wZW5cIik7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrdHVhbGl6YWNlIGRhdCB2IGRldGFpbHUgcG9kbGUgbW9kZWx1IGEgbmFzdGF2ZW7DrSBzdGF2dSBwcnZrxa9cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2V0Rm9jdXMgKGRlZmF1bHQgPSBmYWxzZSkgbmFzdGF2b3ZhdCBmb2t1cyBkbyBwcnZuw61obyBlZGl0b3ZhdGVsbsOpaG8gcG9sZT9cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGFrdHVhbGl6YWNlRGV0YWlsdShzZXRGb2N1czogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbsOtIHZsYXN0bm9zdMOtXHJcbiAgICAgICAgICAgIHRoaXMuRWRpdGFjZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gbmFwbG7Em27DrSBwb2zDrcSNZWtcclxuICAgICAgICAgICAgLy8gVE9ETzogbmVjaGF0IERldGFpbER0byBuZWJvIHRvIHDFmWVqbWVub3ZhdCB6cMOhdGt5IG5hIG1vZGVsPyBuxJtqYWsgdG8gZG/FmWXFoWl0LCB2IGvDs2R1IHRvdGnFviBwb3XFvsOtdsOhbSBvYm9qZVxyXG4gICAgICAgICAgICB0aGlzLmZpbmRGaWVsZHMoKVxyXG4gICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwiYXBwbHlcIiwgdGhpcy5EZXRhaWxEdG8sIHsgaW5pdGlhbFZhbHVlczogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgLmdmaWVsZChcIm1vZGVsXCIsIFwidmFsaWRhdG9yc1wiLCB0aGlzLnZhbGlkYXRvcnMpO1xyXG4gICAgICAgICAgICBpZiAoKCF0aGlzLkRldGFpbER0bz8uSmVQb2RhbmEgfHwgdGhpcy5EZXRhaWxEdG8/LkplVkppbmVBZ2VuZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBuYXBsbsSbbsOtIHBvcGlzbsO9Y2ggdmxhc3Rub3N0w61cclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IG5lYm8gdG8gZMSbbGF0IHDFmWVzIHBvbGU/XHJcbiAgICAgICAgICAgICAgICBHb3JkaWMuUG9waXNuZVZsYXN0bm9zdGkuYXBwbHlWYWx1ZXModGhpcywgdGhpcy5EZXRhaWxEdG8udmxhc3Rub3N0aSEpO1xyXG4gICAgICAgICAgICAgICAgLy8gbmFwbG7Em27DrSBncmlkdSBwb2h5YsWvIGplIGHFviBwbyByb3prbGlrbnV0w60gdGFidVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBiYWRnZVxyXG4gICAgICAgICAgICAvLyBUT0RPOiBuZWNoYXQgdG8gemRlIG5lYm8gdG8gcMWZZXN1bm91dCBkbyBtZXRvZHkgZW5hYmxlP1xyXG4gICAgICAgICAgICBGdWNEZXRhaWwudXBkYXRlQmFkZ2UodGhpcy5CYWRnZVBvaHlieSwgdGhpcy5EZXRhaWxEdG8/LnBvY2V0X3BvaHlidSk7XHJcblxyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbsOtIHN0YXZ1IHBvbMOtxI1layBhIGFrY8OtXHJcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGZva3VzdVxyXG4gICAgICAgICAgICBpZiAoc2V0Rm9jdXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChGdWNEZXRhaWwuQ29udmVydFBlcm1pc3Npb25Ub0Jvb2wodGhpcy5EZXRhaWxEdG8uUGVybWlzc2lvbnMgPyB0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucy5MemVFdmlkb3ZhdCA6IHVuZGVmaW5lZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBHRGJkLmdldEVsZW1lbnRUb0ZvY3VzKHRoaXMuZWxlbWVudCwgXCIuZ2ZpZWxkOm5vdCgudWktc3RhdGUtZGlzYWJsZWQpXCIpPy5maXJzdCgpLnRyaWdnZXIoXCJmb2N1c1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmFkw6Fuw60gcGFyYW1ldHLFryB0aXNrdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7SUdQcmludEFjdGlvblJlcG9ydFN0YXJ0aW5nfSByZXAgcGFyYW1ldHJ5IHRpc2t1XHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBbdnNlXSB0cnVlID0gdGlzayB2xaFlY2ggZG9rbGFkxa8gbmFqZWRub3UsIGppbmFrIGplbiBha3R1w6FsbsOtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHJlcG9ydFN0YXJ0aW5nKHJlcDogSUdQcmludEFjdGlvblJlcG9ydFN0YXJ0aW5nLCB2c2U/OiBib29sZWFuKTogSlF1ZXJ5UHJvbWlzZTxhbnk+IHwgdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbsOtIHBhcmFtZXRyxa8gcG9kbGUgdMOpbWF0dVxyXG4gICAgICAgICAgICBpZiAocmVwLnRlbWEgPT09IFwiZnVjX3B0bV9lbmd6YXVcIikge1xyXG4gICAgICAgICAgICAgICAgLy8gZG9rbGFkIG8gemHDusSNdG92w6Fuw61cclxuICAgICAgICAgICAgICAgIGxldCBha3REb2tsYWQgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuRnVjLkludGVyZmFjZS5HRG9rbGFkRHRvPih0aGlzLiRncmlkRG9rbGFkeU9aYXVjKTtcclxuICAgICAgICAgICAgICAgIGlmIChha3REb2tsYWQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAwID0gYWt0RG9rbGFkLnJvayEudG9TdHJpbmcoMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDEgPSBha3REb2tsYWQubGljITtcclxuICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDAyID0gYWt0RG9rbGFkLmljbyE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLnBhcmFtcy5YMDAwMyA9IGFrdERva2xhZC51Y3MhO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDQgPSBha3REb2tsYWQubWVzaWMhLnRvU3RyaW5nKDEwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXAucGFyYW1zLlgwMDA1ID0gYWt0RG9rbGFkLmFjITtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb8WZZcWhaXQga3VtdWxvdmFuw6kvaHJvbWFkbsOpIMO6xI10b3bDoW7DrVxyXG4gICAgICAgICAgICAgICAgICAgIC8qaWYgKHRoaXMuRGV0YWlsRHRvLnR5cF91Y3RfZnVjID09PSAxMCB8fCB0aGlzLkRldGFpbER0by50eXBfdWN0X2Z1YyA9PT0gMjApICovcmVwLnBhcmFtcy5YMDAwNiA9IFwiMVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIC8qZWxzZSByZXAucGFyYW1zLlgwMDA2ID0gXCIwXCI7Ki9cclxuICAgICAgICAgICAgICAgICAgICAvLyB2IHDFmcOtcGFkxJsgdGlza3UgdsWhZWNoIGRva2xhZMWvIG5hamVkbm91IGplIHYgWDAwMDcgbG9nX3Bvcl9jaXNsbyBhIHYgY3VzdG9tRHRvIElLQ1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5wYXJhbXMuWDAwMDcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcC5jdXN0b21EdG8gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodnNlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBybyB0aXNrIHbFoWUgbmFwbG7Em27DrSBwcmFjb3Zuw60gdGFidWxreVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxsPEdvcmRpYy5HZW5lcmFsLkdJa2M+KFwiVmxveml0RG9QcmFjU2V6bmFtdVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJldFZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZ5dcW+aXTDrSBkdG8gcG91emUgcHJvIHDFmWVub3MgSUtDIGRvIENTLCBrZGUgc2UgcG91xb5pamUgbmEgdnl0dm/FmWVuw60gZGV2w6F0w6lobyBwYXJhbWV0cnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXAuY3VzdG9tRHRvID0geyBkdWN0X2lrYzogcmV0VmFsIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gc291cGlza2FcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IHphdMOtbSBuZWV4aXN0dWplIMW+w6FkbsOhIHZob2Ruw6Egc2VzdGF2YVxyXG5cclxuICAgICAgICAgICAgICAgIC8vLy8gcG91emUgUElELCBuaWMgamluw6lobyBzZSBuZXDFmWVkw6F2w6FcclxuICAgICAgICAgICAgICAgIC8vcmVwLnBhcmFtcy5YMDAwNSA9IHRoaXMuSXhwO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHBvdXplIFBJRCBzb3VwaXNreVxyXG4gICAgICAgICAgICAgICAgcmVwLmN1c3RvbUR0byA9IHsgaXhwOiB0aGlzLkl4cCB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVa29uxI1lbsOtIGdlbmVyb3bDoW7DrSBzZXN0YXZ5XHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBbdnNlXSB0cnVlID0gdGlzayB2xaFlY2ggZG9rbGFkxa8gbmFqZWRub3UsIGppbmFrIGplbiBha3R1w6FsbsOtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHJlcG9ydEdlbmVyYXRlZCh2c2U/OiBib29sZWFuKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBpZiAodnNlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzbWF6w6Fuw60gcHJhY292bsOtIHRhYnVsa3lcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbDx2b2lkPihcIlNtYXphdFByYWNTZXpuYW1cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlc3QsIGplLWxpIFBJRCBzb3VwaXNreSB6YWTDoW5cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSA9IFBJRCB6YWTDoW4sIGZhbHNlID0gUElEIG5lemFkw6FuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBpeHBaYWRhbigpOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IG5hIHRvaGxlIG3DoW0gdmxhc3Rub3N0IHogY3MsIGFsZSBuZWZ1bmdvdmFsbyB0by4gYnXEjyB0byBvcHJhdml0IG5lYm8gbmVjaGF0IHRvaGxlIGEgdiBjcyB0byB6bcSbbml0IG5hIHByaXZhdGUgYSBiZXogSnNvblByb3BlcnR5LiB2IHNlem5hbXUgamUgb2Jkb2JhIHBybyBrbmlodVxyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuSXhwICE9IG51bGwgJiYgdGhpcy5JeHAgIT09IFwiXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdCwgamUtbGkgemFkw6FuYSBrbmloYVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlID0ga25paGEgemFkw6FuYSwgZmFsc2UgPSBrbmloYSBuZXphZMOhbmFcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGtuaWhhWmFkYW5hKCk6IGJvb2xlYW4ge1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogdXByYXZpdFxyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuZ3BjLml4cF9kZW4vKkl4cERlbiovICE9IG51bGwgJiYgdGhpcy5ncGMuaXhwX2Rlbi8qSXhwRGVuKi8gIT09IFwiXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdCwgamVzdGxpIGplIG1vxb5uw6kgb2tubyB6YXbFmcOtdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPEludGVyZmFjZS5HU291cGlza2FEdG8+IHwgSW50ZXJmYWNlLkdTb3VwaXNrYUR0b30gcHJvbWlzZSBzIGRhdHkgKHJlc29sdmUgPSBqZSBtb8W+bsOpIHphdsWZw610LCByZWplY3QgPSBuZW7DrSBtb8W+bsOpIHphdsWZw610KSBuZWJvIHDFmcOtbW8gZGF0YSBkZXRhaWx1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGNsb3NpbmcoKTogSlF1ZXJ5UHJvbWlzZTxJbnRlcmZhY2UuR1NvdXBpc2thRHRvPiB8IEludGVyZmFjZS5HU291cGlza2FEdG8ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8ga29udHJvbGEgbmEgem3Em27Em27DqSBwb2xvxb5reVxyXG4gICAgICAgICAgICBsZXQgZm9ybUNoYW5nZWQgPSB0aGlzLmZpbmRGb3JtcygpLmdmb3JtKFwiaGFzQ2hhbmdlZFwiKTtcclxuICAgICAgICAgICAgLy8gVE9ETzogdHVobGUgcG9kbcOtbmt1IHBhayB1cHJhdml0LCB0ai4gbmVjaGF0IGplbiBmb3JtQ2hhbmdlZD8gYXNpIG5lXHJcbiAgICAgICAgICAgIGlmICgodGhpcy5FZGl0YWNlIHx8IHRoaXMuRGV0YWlsRHRvLkplUG9kYW5hKSAmJiBmb3JtQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZG90YXogbmEgemF2xZllbsOtIGJleiB1bG/FvmVuw60sIHByb3Rvxb5lIHNlIG7Em2NvIHptxJtuaWxvXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiB6YXTDrW0gamVuIHYgZWRpdGHEjW7DrW0gcmXFvmltdSAodGouIGkgcG8gcG9kw6Fuw60pP1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVrby5EZXRhaWwubWVzc2FnZUJveFVuc2F2ZWREYXRhKHRoYXQpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoW0dEbGcubWJiWWVzLmlkLCBHRGxnLm1iYk5vLmlkXSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmV0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWwgPT09IEdEbGcubWJiWWVzLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1bG/FvmVuw60gZGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnM/LmFjdENsb3NlQnV0dG9uQ2xpY2s/LnNldFBlbmRpbmcoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5ldmlkZW5jZSh0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gw7pzcMSbxaFuxJsgZG9rb27EjWVub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGlvbnM/LmFjdENsb3NlQnV0dG9uQ2xpY2s/LnNldFBlbmRpbmcoMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnLDoWNlbsOtIHDFmcOtem5ha3UgYWt0aXZuw60gb3BlcmFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5EZXRhaWxEdG87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbiAoeGhyLCB0eXBlLCB2b2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNrb27EjWlsbyBjaHlib3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpb25zPy5hY3RDbG9zZUJ1dHRvbkNsaWNrPy5zZXRQZW5kaW5nKC0xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LkRldGFpbER0bztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gcG9rdWQgc2UgbmVlZGl0dWplLCBqZSBtb8W+bsOpIGRldGFpbCB6YXbFmcOtdFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuRGV0YWlsRHRvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==