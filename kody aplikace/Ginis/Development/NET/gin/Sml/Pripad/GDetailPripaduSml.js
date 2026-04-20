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
            let gcontent = Decorators.gcontent;
            /**
             * Detail případu SML
             *
             * @author Martin Boček
             * @since 490.1.0.25
             */
            let GDetailPripaduSml = class GDetailPripaduSml extends Gordic.GDetailBuilderContent {
                constructor() {
                    super(...arguments);
                    /**
                     * Grid externích subjektů
                     * @type {JQuery | null}
                     */
                    this.$gridSubjekty = null;
                    ///**
                    // * Grid položek
                    // * @type {JQuery}
                    // */
                    //private $gridPol: JQuery;
                    ///**
                    // * Strom dokladů
                    // * @type {JQuery}
                    // */
                    //private $treeDokladyK: JQuery;
                    /**
                     * Grid vazeb dokladů (zobrazení jako seznam)
                     * @type {JQuery}
                     */
                    this.$gridDokladyS = null;
                    /**
                     * Pás karet vazeb dokladů (zobrazení jako karty)
                     * @type {JQuery}
                     */
                    this.$pickDokladyK = null;
                    /**
                     * Data vazeb dokladů
                     * @type {Sml.Interface.GDokladSmlDto[] | null}
                     * @default null
                     */
                    this.dataNavDoklady = null;
                }
                /**
                 * Zadefinování formuláře
                 */
                onContentReady() {
                    let that = this;
                    // zpřístupnění tlačítka pro uložení při změnách
                    this.element.off("fieldchange.detailPrip");
                    this.element.on("fieldchange.detailPrip", function (ev, ctx) {
                        //that.enable();
                        const evidenceEnabled = that.Editace === true ? true : that.findForms().gform("hasChanged");
                        // TODO: dořešit permissions (agendové, dokumentové, vlastnosti?) - nebo to neřešit zde, ale až na serveru?
                        // TODO: dořešit editační režim
                        //that.actions.actEvidence!.updatePermission((evidenceEnabled ? { value: true } : /*{ value: false }*/(that.DetailDto.Permissions ? that.DetailDto.Permissions.LzeEvidovat : undefined)));
                    });
                    // jen nastavení okna
                    this.aktualizaceDetailu(true);
                }
                /**
                 * Obsluha události builderInit
                 *
                 * @param {Gordic.Gin.DetailBuilder.GDetailBuilder} builder detailbuilder
                 */
                onDetailBuilderInit(builder) {
                    let that = this;
                    // fokus na první editovatelné políčko
                    // TODO: tohle nefunguje, protože přístiupnost polí nastavuji až později, tak je to řešeno až v metodě pro podání nebo přechodu do editačního režimu
                    //builder.autofocusSelector = ".gfield:not(.ui-state-disabled)";
                    // definice akcí, tabů, kpi, menu apod.
                    builder.withComponent("detail", {
                        actions: {
                            // akce pro menubar
                            actTiskPS: Gordic.Eko.Action.actionTisk({ name: "actTiskPS", tema: "sml_ptm_zlnav", reportStarting: function (rep) { return that.reportStarting(rep); } }),
                            actObcerstveniPS: Gordic.Eko.Action.actionObcerstvit({ run: function () { this.setPending(that.reloadData()); } }),
                            //actDiagnostika: Gordic.Eko.Action.actionDiagnostika({ run: function () { that.diagnostika(); } })
                            // záložkové akce
                            actDetailDokladu: Gordic.Eko.Action.actionDetail({ run: function () { that.detailDokladuS(); } }),
                            actDetailSubjektu: Gordic.Eko.Action.actionDetail({ run: function () { this.setPending(that.detailSubjektu()); } }),
                            actAktivniSubjekty: { caption: "Jen aktivní", checked: true, enabled: false, run: function () { that.aktualizaceSeznamuSubjektu(); } },
                            actHistorieIissp: Gordic.Eko.Action.actionHistorie({ run: function () { this.setPending(that.historieIissp()); } }),
                            actTestIissp: Gordic.Eko.Action.actionHistorie({ caption: "Test1", run: function () { this.setPending(that.testIissp()); } }),
                            actTestIissp2: Gordic.Eko.Action.actionHistorie({ caption: "Test2", run: function () { this.setPending(that.testIissp2()); } }),
                            // pro subtasky
                            actSubDokladySeznam: { caption: "Seznam", enabled: true, run: function () { that.loadDoklady(false); } },
                            actSubDokladyKarty: { caption: "Karty", enabled: true, run: function () { that.loadDoklady(true); } },
                        },
                        tabGroups: [
                            Gordic.Prefabs.TabGroups.Agenda(),
                            { id: "grpDoklady", caption: "Doklady" },
                            { id: "grpSubjekty", caption: /*that.getLabel("grpSubjekty") */ "Subjekty" /*, badge: this.BadgeSubjekty*/ },
                            { id: "grpDph", caption: "DPH", visible: /*that.dbparams.sml_rad_dph > "0"*/ true },
                            { id: "grpIissp", caption: "IISSP", visible: that.JeIissp },
                        ],
                        menuBar: [
                            "actTiskPS*" /*{ action: "actTiskZL", favorite: true, align: "opposite" }*/,
                            "actObcerstveniPS"
                            //"actDiagnostika",
                            //SmlDetail.createMenuShare(that.Ixp)
                        ],
                        commandBar: [],
                        statusBar: that.JeIissp
                            ? [
                                Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarStav" }),
                                Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarStavRezIissp" }),
                            ]
                            : [
                                Gordic.Eko.Detail.StatusBar.createItem({ id: "statusBarStav" })
                            ],
                        kpis: {},
                        tabs: {
                            tabPripadSml: {
                                // základní údaje
                                tabParams: { title: "Případ SML", group: Gordic.Prefabs.TabGroups.Agenda(), opened: true, locked: false },
                                init: function (tab) {
                                    // doplnění prvků do tabu
                                    let form = new Gordic.Forms.Form({ name: "formPripadSml", layoutDescriptor: "L1M1S1" /*"L2M2S1"*/ })
                                        .addSection("Platnost")
                                        .addRow("Datum uzavření").addField("gdatebox", {
                                        disabled: true,
                                        name: "dat_uzavreni" /* Sml.Interface.GPripadSmlDtoNames.dat_uzavreni */,
                                    })
                                        .addRow("Datum platnosti").addField("gdatebox", {
                                        disabled: true,
                                        name: "dat_platnost" /* Sml.Interface.GPripadSmlDtoNames.dat_platnost */,
                                    })
                                        .addRow("Datum účinnosti").addField("gdatebox", {
                                        disabled: true,
                                        name: "dat_ucinnost" /* Sml.Interface.GPripadSmlDtoNames.dat_ucinnost */,
                                    })
                                        .addSection("Částky")
                                        .addRow("Cena")
                                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                                        disabled: true,
                                        name: "c_mena_doc" /* Sml.Interface.GPripadSmlDtoNames.c_mena_doc */,
                                        decimals: 2,
                                        emptyValue: new Decimal(0),
                                    })
                                        .addRow("Rozpis na roky")
                                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                                        disabled: true,
                                        name: "c" /* Sml.Interface.GPripadSmlDtoNames.c */,
                                        decimals: 2,
                                        emptyValue: new Decimal(0),
                                    })
                                        .addRow("Položky FP")
                                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                                        disabled: true,
                                        name: "c_pol" /* Sml.Interface.GPripadSmlDtoNames.c_pol */,
                                        decimals: 2,
                                        emptyValue: new Decimal(0),
                                    })
                                        .addRow("Počet položek FP")
                                        .addField("gnumberbox", {
                                        disabled: true,
                                        name: "num_pol" /* Sml.Interface.GPripadSmlDtoNames.num_pol */,
                                    })
                                        .addSection("Financování")
                                        .addRow("Od, do, počet roků")
                                        .addField("gnumberbox", "w-4", {
                                        disabled: true,
                                        name: "fin_od" /* Sml.Interface.GPripadSmlDtoNames.fin_od */,
                                    })
                                        .addField("gnumberbox", "w-4", {
                                        disabled: true,
                                        name: "fin_do" /* Sml.Interface.GPripadSmlDtoNames.fin_do */,
                                    })
                                        .addField("gnumberbox", "w-4", {
                                        // TODO: doplnit obsluhu do change fin_od a fin_do
                                        disabled: true,
                                        name: "num_rok" /* Sml.Interface.GPripadSmlDtoNames.num_rok */
                                    })
                                        .addRow("Celková částka")
                                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                                        disabled: true,
                                        name: "c_mena" /* Sml.Interface.GPripadSmlDtoNames.c_mena */,
                                        decimals: 2,
                                        emptyValue: new Decimal(0),
                                    })
                                        .addRow("Zbývá čerpat")
                                        .addField("gnumberbox", Gordic.Prefabs.Number.currency(), {
                                        disabled: true,
                                        name: "c_disp" /* Sml.Interface.GPripadSmlDtoNames.c_disp */,
                                    });
                                    ;
                                    tab.gform("createFrom", form);
                                }
                            },
                            tabDoklady: {
                                initLazy: true,
                                tabParams: {
                                    title: "Doklady",
                                    group: { id: "grpDoklady" },
                                    opened: true,
                                    locked: false,
                                    menuBar: ["actDetailDokladu*"],
                                    customLoad: function () {
                                        // načtení vazeb dokladů
                                        that.loadDoklady(false);
                                    }
                                },
                                init: function (tab) {
                                    // subtasky na doklady
                                    that.$subDoklady =
                                        $.newDiv().appendTo(tab)
                                            .gsubtasks({
                                            params: [
                                                { caption: that.actions.actSubDokladySeznam.caption, action: that.actions.actSubDokladySeznam },
                                                { caption: that.actions.actSubDokladyKarty.caption, action: that.actions.actSubDokladyKarty }
                                            ],
                                            activeItem: 0
                                        });
                                }
                            },
                            tabSubjekty: {
                                // subjekty
                                initLazy: true,
                                tabParams: {
                                    title: /*that.getLabel("grpSubjekty")*/ "Subjekty",
                                    group: { id: "grpSubjekty" },
                                    opened: true,
                                    locked: false,
                                    menuBar: [
                                        "actDetailSubjektu*",
                                        "<actAktivniSubjekty"
                                    ],
                                    customLoad: function () {
                                        // načtení subjektů
                                        that.loadSubjekty();
                                    }
                                },
                                init: function (tab) {
                                    // přidání gridu navázaných dokladů do tabu
                                    that.$gridSubjekty = $.newDiv()
                                        .css("height", "100%")
                                        .appendTo(tab)
                                        .ggrid({
                                        name: "gridSubjekty",
                                        // TODO: grid dodělat
                                        columnMode: "full", // fit (defaultne by melo byt toto), full
                                        // TODO: dodělat
                                        defaultAction: that.actions.actDetailSubjektu,
                                        //searchColumns: ["vs", "c", "typ_ag", "ac"],
                                        // TODO: dodělat
                                        columns: WebClient.SmlGrid.Doklad.createGridFormatSubjekty(that /*.Ixp*/),
                                        defaultProfile: {
                                            columnList: "typ_vazby_txt,ico_esu,rc_esu,ixs_esu_txt,ixs_esu_zast_txt,bu_ci,ac_esu,ac_sml".replace(/\./gi, Gordic.Gin.WebClient.GSharedIsl.NameSeparator),
                                            //columnList: "typ_vazby_txt,subjekt.ico,subjekt.rc,ixs_esu_txt,ixs_esu_zast_txt,bu_ci_txt,ac_esu,ixp".replace(/\./gi, Gin.WebClient.GSharedIsl.NameSeparator)
                                            condFormats: Gordic.Eko.Grid.getCondFormats({ type: Gordic.Eko.Utils.RecordFormatType.Stornovano, options: { description: "Neaktivní subjekty", formula: "@aktivita != {0}".format(100 /* Interface.Aktivita.ng_aktAkt */) } })
                                        },
                                        cellActivate: function (ev, obj) {
                                            // aktualizace stavu akcí tabu podle aktuálně vybraného řádku
                                            if (obj.cellInfo)
                                                that.enableSubjekty();
                                        }
                                    })
                                        .gautofit({
                                        resizersOnTab: false
                                    });
                                }
                            },
                            tabDph: {
                                // DPH
                                tabParams: {
                                    title: "DPH", group: { id: "grpDph" }, visible: /*that.dbparams.sml_rad_dph > "0"*/ true,
                                },
                                //group: { id: "grpDph" },
                                initLazy: true,
                                init: function (tab) {
                                    let obdobiDphVid;
                                    let taxPeriod = parseDate(that.DetailDto.dat_dph_od ?? that.DetailDto.dat_uzavreni ?? new Date());
                                    obdobiDphVid = { year: taxPeriod.getFullYear(), month: taxPeriod.getMonth() + 1 };
                                    //}
                                    let recapDphOptions = {
                                        checkVisible: false,
                                        periodDPHVisible: false,
                                        //calculate: false,
                                        readOnly: true,
                                        totalAmount: parseDecimal(that.DetailDto.c_mena_doc ?? 0),
                                        taxPeriod: taxPeriod,
                                        visType: "grid",
                                        model: {
                                            periodDPH: obdobiDphVid,
                                            prices: Gordic.Gin.WebClient.Utils.dphModelApply(that.DetailDto, [
                                                // osvobozeno
                                                { from: "c_mena_z_osv", to: { taxType: "-1" /* Gordic.Gin.WebClient.ETaxType.Osvobozeno */, priceType: "baseValue" } },
                                                // zaokrouhlení
                                                { from: "c_c_mena_okr", to: { taxType: "-2" /* Gordic.Gin.WebClient.ETaxType.Zaokrouhleno */, priceType: "sum" } },
                                                // bez daně
                                                { from: "c_mena_z_bd", to: { taxType: "0" /* Gordic.Gin.WebClient.ETaxType.BezDane */, priceType: "baseValue" } },
                                                // základní sazba
                                                { from: "c_mena_z_ns", to: { taxType: "10" /* Gordic.Gin.WebClient.ETaxType.Zakladni */, priceType: "baseValue" } },
                                                { from: "c_mena_dph_ns", to: { taxType: "10" /* Gordic.Gin.WebClient.ETaxType.Zakladni */, priceType: "tax" } },
                                                { from: "c_c_mena_ns", to: { taxType: "10" /* Gordic.Gin.WebClient.ETaxType.Zakladni */, priceType: "sum" } },
                                                // první snížená
                                                { from: "c_mena_z_ss", to: { taxType: "20" /* Gordic.Gin.WebClient.ETaxType.PrvniSnizena */, priceType: "baseValue" } },
                                                { from: "c_mena_dph_ss", to: { taxType: "20" /* Gordic.Gin.WebClient.ETaxType.PrvniSnizena */, priceType: "tax" } },
                                                { from: "c_c_mena_ss", to: { taxType: "20" /* Gordic.Gin.WebClient.ETaxType.PrvniSnizena */, priceType: "sum" } },
                                                // druhá snížená
                                                { from: "c_mena_z_3s", to: { taxType: "30" /* Gordic.Gin.WebClient.ETaxType.DruhaSnizena */, priceType: "baseValue" } },
                                                { from: "c_mena_dph_3s", to: { taxType: "30" /* Gordic.Gin.WebClient.ETaxType.DruhaSnizena */, priceType: "tax" } },
                                                { from: "c_c_mena_3s", to: { taxType: "30" /* Gordic.Gin.WebClient.ETaxType.DruhaSnizena */, priceType: "sum" } },
                                                // třetí snížená
                                                // TODO: zatím není podpora
                                                //{ from: "c_mena_z_4s", to: { taxType: Gordic.Gin.WebClient.ETaxType.TretiSnizena, priceType: "baseValue" } },
                                                //{ from: "c_mena_dph_4s", to: { taxType: Gordic.Gin.WebClient.ETaxType.TretiSnizena, priceType: "tax" } },
                                                //{ from: "c_c_mena_4s", to: { taxType: Gordic.Gin.WebClient.ETaxType.TretiSnizena, priceType: "sum" } },
                                                //Celkem
                                                { from: "c_mena_doc_s_dph", to: { taxType: "-3" /* Gordic.Gin.WebClient.ETaxType.DokladCelkem */, priceType: "sum" } }
                                            ])
                                        }
                                    };
                                    let recapDPH = $.newDiv().appendTo(tab).gcontent(GContent.createInitializer([Gordic.Gin.WebClient.recapDPH, recapDphOptions]));
                                    //historie
                                    let histTab = $.newDiv().appendTo(tab).gtab({
                                        title: "Historie",
                                        opened: true
                                    });
                                    let grid = $.newDiv().appendTo(histTab).ggrid({
                                        name: "gridDPHHistorie",
                                        data: new Gordic.Isl.View(that.isl.Smlhdph.list({
                                            filters: {
                                                ixp_sml_pri: that.DetailDto.ixp_sml_pri
                                            }
                                        }), { key: ["ixp_sml_pri", "dat_dph_od", "ixp"] }),
                                        columnMode: "full",
                                        columns: WebClient.SmlGrid.createHistorieDPHGridFormat()
                                    });
                                }
                            },
                            tabIISSP: {
                                // IISSP
                                initLazy: true,
                                tabParams: {
                                    title: "IISSP",
                                    group: { id: "grpIissp" },
                                    opened: true,
                                    locked: false,
                                    visible: that.JeIissp,
                                    menuBar: ["actHistorieIissp*", "actTestIissp*", "actTestIissp2*"],
                                    //customLoad: function () {
                                    //    // načtení dat IISSP
                                    //    that.loadIissp();
                                    //}
                                },
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
                    // úprava třetí sekce (položky a stav místo kompetenta a realizátora)
                    const formSetup = {};
                    //const headerForm = new Gordic.Forms.Form({ name: "formHeader" })
                    //    .addSection()
                    //    // TODO: text do resource
                    //    .addRow("Stav").addField("gselectbox", Gordic.Prefabs.Select.buccbvyZL(), { disabled: true, dropdown: true, name: "s_bvy", model: "s_bvy=s_bvy" });
                    //formSetup[Gordic.Eko.HeaderForm.Sections.Data2] = {
                    //    rows: [
                    //        builder.getDefinition(Gordic.Eko.HeaderForm.Rows.Zpracovatel)[0]?.item, // zpracovatel
                    //        headerForm!.form!.sections![0].rows![0], // položky
                    //        headerForm!.form!.sections![0].rows![1] // stav
                    //    ]
                    //} as Forms.FormSection;
                    formSetup[Gordic.Eko.HeaderForm.Sections.Info] = {
                        rows: [
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.Id)[0]?.item,
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.AgendoveCislo)[0]?.item
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data1] = {
                        rows: [
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.TypDokladu)[0]?.item
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Sections.Data2] = {
                        rows: [
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.Kompetent)[0]?.item,
                            builder.getDefinition(Gordic.Eko.HeaderForm.Rows.Realizator)[0]?.item
                        ]
                    };
                    formSetup[Gordic.Eko.HeaderForm.Fields.Id] = { options: { model: "ixp_sml_pri" } };
                    formSetup[Gordic.Eko.HeaderForm.Fields.AgendoveCislo] = { options: { model: "ac_sml" } };
                    // jiný prefab pro knihu
                    // TODO: po dořešení knihy nechat jen správnou variantu (buď nejdříve prefab nebo nejdříve parametry)
                    //formSetup[Gordic.Eko.HeaderForm.Fields.Kniha] = { options: $.extend({ model: "ixp_den=ixp_den", serverFilters: { ktg_den: [Gordic.Sml.Globals.Enums.KtgDen.ZapoctoveListy], typ_ag: Gordic.Sml.Globals.Enums.TypAg.BUC, rok: that.Rok }, }, Gordic.Prefabs.Select.ekosden()) } as Forms.FormField;
                    //formSetup[Gordic.Eko.HeaderForm.Fields.Kniha] = { options: $.extend(Gordic.Prefabs.Select.ekosden(Gordic.Sml.Globals.Enums.TypAg.SML), { model: "ixp_den=ixp_den", serverFilters: { ktg_den: [that.KtgDen], typ_ag: Gordic.Sml.Globals.Enums.TypAg.FUC, rok: that.Rok }, }) } as Forms.FormField;
                    formSetup[Gordic.Eko.HeaderForm.Fields.TypDokladu] = {
                        options: {
                            flag: Gordic.Prefabs.Field.Flags.required,
                            dropdown: true,
                            model: "ixs_typ=ixs_typ;ixs_typ_txt=nazev;ktg_typ=ktg_typ",
                            serverFilters: { ktg_typ: that.KtgTyp },
                        }
                    };
                    formSetup[Gordic.Eko.HeaderForm.Fields.DatumEvidence] = { options: { model: "dat_prij_pod", valueType: "date" } };
                    //formSetup[Gordic.Eko.HeaderForm.Fields.Zpracovatel] = { options: { model: "ixs_fun_akt=ixs_fun;ixs_fun_txt=nazev;ixs_fun_ref_txt=nazev_ref;ixs_fun_su_txt=nazev_su" } } as Forms.FormField;
                    formSetup[Gordic.Eko.HeaderForm.Fields.Popis] = { options: Gordic.Eko.Detail.Field.getCounterOptions(254 /* Sml.Interface.GPripadSmlDtoTypeLengths.popis */) };
                    // jiný label pro datum
                    //formSetup[Gordic.Eko.HeaderForm.Rows.DatumEvidence] = { label: "Datum UÚP" } as Forms.FormRow;
                    // aktualizace hlavičky
                    Gordic.Eko.HeaderForm.setup(builder, formSetup);
                    // úprava WFL/SSL komponent
                    Gordic.Eko.Detail.changeDetailBuilderWflForEkoDefinitions(builder, this.DetailDto?.JePodan ?? false /*, "menuTiskZL"*/);
                    // šipky pro posun po seznamu
                    if (!this.DetailDto?.JePodan)
                        this.listControls_setup({
                            rowToDto: function (gridState) {
                                return [
                                    that.gpc,
                                    {
                                        IxpSmlPri: gridState.currentRow.data.ixp_sml_pri,
                                        NasledujiciDetail: true
                                    }
                                ];
                            },
                            nextItemTemplate: "Následující: {ixp_sml_pri} <br> {ac_sml:trim} <br> {popis:trim:encode}",
                            prevItemTemplate: "Předchozí: {ixp_sml_pri} <br> {ac_sml:trim} <br> {popis:trim:encode}",
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
                 * Zobrazí detail dokladu
                 *
                 * @param {string} ixp PID dokladu
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detailDokladuK(ixp) {
                    let that = this;
                    if (ixp) {
                        return that.isl.DokladSml.read({ ixp: ixp })
                            .getData()
                            .then(function (data) {
                            return that.detailDokladu(data);
                        });
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Zobrazí detail dokladu
                 *
                 * @param {string} ixp PID dokladu
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detailDokladuS() {
                    let aktRadek = Gordic.Eko.Grid.currentRow(this.$gridDokladyS);
                    return this.detailDokladu(aktRadek);
                }
                /**
                 * Zobrazí detail zadaného dokladu
                 *
                 * @param {string} data data dokladu
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detailDokladu(data) {
                    let that = this;
                    if (data?.ixp && data?.ixp_den) {
                        // příznak aktivní operace
                        let needRefresh = false;
                        // otevření detailu
                        let detailID = WebClient.SmlGrid.getDetailId(data, { ktg_typ: data.ktg_typ_nad_pr ?? data.ktg_typ_nad });
                        let $detailWindow = that.navigate(["Gordic.Sml.WebClient.G" + detailID, { gpc: Gordic.Eko.Utils.createBookGpc(that.gpc, data.ixp_den) }], {
                            ID: detailID + '#',
                            Ixp: data.ixp,
                            // TODO: je potřeba IxpDen, když je to v gpc?
                            IxpDen: data.ixp_den
                        });
                        // obsluha aktivní operace na detailu
                        $.content($detailWindow).on(WebClient.SmlDetail.triggerChange, (retVal) => {
                            // záznam byl změně, musí se načíst znovu
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
                 * Test
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                testIissp() {
                    return this.navigate([Gordic.Iissp.WebControls.GIisspRezHistory, { uid: "GIisspRezHistory#" }], {
                        ixs_hpr: this.DetailDto.ixp_sml_pri
                    })
                        .createDialogPromise();
                }
                /**
                 * Test
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                testIissp2() {
                    return this.navigate([Gordic.Iissp.WebControls.GIisspRezDetailExt, { uid: "GIisspRezDetailExt#" }], {
                        ixs_hpr: this.DetailDto.ixp_sml_pri
                    })
                        .createDialogPromise();
                }
                /**
                 * Zobrazení historie volání IISSP
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                historieIissp() {
                    return this.navigate([Gordic.Iissp.WebControls.GIisspRezWsCallHistory, { uid: "GIisspRezWsCallHistory#" }], {
                        ixs_hpr: this.DetailDto.ixp_sml_pri
                    })
                        .createDialogPromise();
                }
                /**
                 * Vrátí strukturu vazeb dokladů
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                getDoklady() {
                    let that = this;
                    this.beginOperation("jres:24100076"); //RC 24100076 : Probíhá načtení vazeb dokladů případu
                    return $.Deferred().resolve().promise()
                        .then(function () {
                        if (that.dataNavDoklady != null) {
                            return that.dataNavDoklady;
                        }
                        else {
                            return that.isl.DokladSml.listDokladyPripadu(rq => { return { filters: { ixp_sml_pri: that.DetailDto.ixp_sml_pri } }; })
                                .getData();
                        }
                    })
                        .then(function (data) {
                        if (data != null) {
                            // uložení dat
                            that.dataNavDoklady = data;
                            return data;
                        }
                        else
                            $.Deferred().reject();
                    })
                        .always(function () {
                        that.endOperation();
                    });
                }
                /**
                 * Načtení struktury vazeb dokladů a zobrazení v požadované podobě
                 *
                 * @param {boolean} karty typ zobrazení (true = karty, false = seznam)
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadDoklady(karty) {
                    let that = this;
                    // odstranění původních obsahů záložky
                    if (that.$gridDokladyS != null) {
                        that.$gridDokladyS.ggrid("destroy");
                        that.$gridDokladyS = null;
                    }
                    if (that.$pickDokladyK != null) {
                        that.$pickDokladyK.empty(); //.gcontentpicker("destroy");
                        that.$pickDokladyK = null;
                    }
                    if (karty) {
                        // karty
                        // pomocné metody
                        let getMenuParamsData = function (data) {
                            return {
                                id: data.ixp,
                                type: "action",
                                caption: (data.ktg_typ_txt ?? data.ixs_typ_txt ?? "Doklad") + "<br>" + (data.ac_sml ?? data.ixp),
                                tooltip: [
                                    // TODO: tohle udělat stejné jako v KPI na detailu dokladu - pokud by to zůstalo, tak na to udělat společnou metodu (ale na detailu dokladu bohužel nebudu mít moc dat)
                                    "{0}: {1} ".format("Identifikátor", data.ixp),
                                    "{0}: {1} ".format("Agendové číslo", data.ac_sml ?? ""),
                                    "{0}: {1} ".format("Evidenční číslo", data.ac ?? ""),
                                    "",
                                    "{0}: {1} ".format("Typ dokladu", data.ixs_typ_txt ?? ""),
                                    //"{0}: {1} ".format("Kategorie typu dokladu", data.ktg_typ_txt ?? ""),
                                    //"{0}: {1} ".format("KtgSml", data.ktg_sml?.toString()),
                                    "",
                                    "{0}: {1} ".format("Popis", data.popis ?? "")
                                ].join("<br>"),
                                icon: data.ktg_typ === Sml.Globals.Enums.KtgTyp.DodatekSmlouvy
                                    // ikona pro dodatky
                                    ? "gi-paper|gi-paper gi-stack-pos--rb"
                                    // ikona pro ostatní doklady
                                    : "gi-paper",
                                action: new GAction({
                                    name: "actDetailDokladu" + data.ixp,
                                    run: function () { this.setPending(that.detailDokladuK(data.ixp)); }
                                })
                            };
                        };
                        let appendToChildren = function (params, data) {
                            params.forEach(item => {
                                if (item.id === data.ixp_nad) {
                                    if (item.children == null)
                                        item.children = [];
                                    item.children.push(getMenuParamsData(data));
                                }
                                else if (item.children)
                                    appendToChildren(item.children, data);
                            });
                        };
                        // vytvoření a naplnění karet
                        return this.getDoklady()
                            .then(function (data) {
                            // převod seznamu do struktury pro gcontentpicker
                            let treeParams = new Array();
                            if (data) {
                                data.forEach(data1 => {
                                    if (data1.ixp) {
                                        if (data1.ixp_nad) {
                                            // vnořený doklad
                                            appendToChildren(treeParams, data1);
                                        }
                                        else {
                                            // hlavní doklad
                                            treeParams.push(getMenuParamsData(data1));
                                        }
                                    }
                                });
                            }
                            return treeParams;
                        })
                            .then(function (treeParams) {
                            // vytvoření contentpickeru
                            that.$pickDokladyK = $.newDiv()
                                .appendTo(that.$subDoklady)
                                .gcontentpicker({
                                params: treeParams
                            });
                            return;
                        })
                            .done(function () {
                            // aktualizace okna
                            that.enable();
                        });
                    }
                    else {
                        // seznam
                        // definice gridu
                        that.$gridDokladyS = $.newDiv()
                            .css("height", "100%")
                            .appendTo(that.$subDoklady)
                            .ggrid({
                            name: "gridDokladyS",
                            // TODO: grid dodělat
                            columnMode: "full", // fit (defaultne by melo byt toto), full
                            defaultAction: that.actions.actDetailDokladu,
                            //searchColumns: ["vs", "c", "typ_ag", "ac"],
                            columns: WebClient.SmlGrid.Doklad.createGridFormat(that, true, true),
                            defaultProfile: {
                                columnList: "ixp,ixp_nad,ixp_den_txt,sml_stav_zkr,ac_sml,ac,dat_evid,subjekt.ico,subjekt.nazev,mena_zkr,c_mena_doc,c_mena,ixs_typ_txt,popis,ixp_sml_pri",
                                condFormats: Gordic.Eko.Grid.getCondFormats({ type: Gordic.Eko.Utils.RecordFormatType.Vyrazeno, options: { description: "Doklady jiného případu případu", formula: "NOT(EQUALS(@ixp_sml_pri,'{0}'))".format(that.IxpSmlPri) } })
                            },
                        })
                            .gautofit({
                            resizersOnTab: false
                        });
                        // naplnění seznamu
                        return this.getDoklady()
                            .then(function (data) {
                            // pohled
                            let view = new Gordic.Data.View(data, {
                                key: "ixp",
                                processors: {
                                    tree: new Gordic.Data.Tree(Gordic.Data.Tree.parentIdOrganizer("ixp_nad"), {
                                        //filterKeepStructure: true,
                                        defaultState: "open",
                                    })
                                }
                            });
                            // nastavení dat a překreslení gridu
                            that.$gridDokladyS?.ggrid("setData", view);
                            return;
                        })
                            .done(function () {
                            // aktualizace okna
                            that.enable();
                        });
                    }
                }
                /**
                 * Zobrazení detailu subjektu
                 *
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                detailSubjektu() {
                    let that = this;
                    if (this.$gridSubjekty) {
                        // zobrazení detailu
                        let aktSubjekt = Gordic.Eko.Grid.currentRow(this.$gridSubjekty);
                        if (aktSubjekt) {
                            return Gordic.Esu.Dialogs.DetailEsuDlg(that, {
                                IxsEsu: aktSubjekt.ixs_esu ?? "",
                                Ucel: Gordic.Esu.Globals.Enums.TypZobrazeni.Detail,
                                Logovani: {
                                    // TODO: dořešit logovací údaje
                                    Ixp: that.IxpSmlPri,
                                    DuvodHledani: Gordic.Gin.Globals.Enums.DuvodHledaniEsu.zadaniOdesilatele,
                                    AktZnacka: ""
                                }
                            }).createDialogPromise();
                        }
                    }
                    return $.Deferred().reject().promise();
                }
                /**
                 * aktualizace seznamu subjektů s obsluhou akce
                 *
                 * @param {boolean} zaDoklad (default = false) zvolená akce - true = akce za doklad, false = akce jen aktivní
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                aktualizaceSeznamuSubjektu() {
                    let that = this;
                    if (this.$gridSubjekty) {
                        // filtr na aktivní / všechny záznamy
                        // TODO: dořešit vzhled tlačítka (texty, ikony, stav checked, ...)
                        // akce Jen aktivní
                        this.actions.actAktivniSubjekty.update({ checked: !this.actions.actAktivniSubjekty.checked() });
                        return that.loadSubjekty();
                    }
                    else
                        return $.Deferred().reject().promise();
                }
                /**
                 * Nahrání a zobrazení subjektů
                 *
                 * @param {boolean | undefined | null} cond podmínka, mají-li být data načtena
                 * @param {any} filters filtry pro metodu list
                 * @param {JQuery<HTMLElement>} $grid grid, ve kterém mají být data zobrazena
                 * @returns {JQuery.Promise<any>} promise s operací
                 */
                loadSubjekty() {
                    let that = this;
                    // načtení subjektů
                    return that.isl.DokladSml.listSubjektu(rq => {
                        return {
                            filters: {
                                ixp_sml_pri: this.DetailDto.ixp_sml_pri,
                                aktivita: this.actions.actAktivniSubjekty.checked() === true ? 100 /* Interface.Aktivita.ng_aktAkt */ : undefined
                            }
                        };
                    })
                        .getData()
                        .then(function (data) {
                        // pohled
                        let view = new Gordic.Data.View(data, { key: "ixp_sml_pri,ixs_esu" });
                        // nastavení dat a překreslení gridu
                        that.$gridSubjekty.ggrid("setData", view);
                        return;
                    })
                        .done(function () {
                        // aktualizace okna
                        that.enable();
                    });
                }
                /**
                 * Nastavení prvků ve formuláři
                 */
                enable() {
                    // prvky
                    const perms = this.DetailDto.Permissions;
                    //// TODO: je potřeba rozlišovat dvě přístupnosti? nově je totiž např. popis také v hlavičce
                    //// TODO: dořešit editační režim
                    //const l_bDisableHeaderItems = !SmlDetail.ConvertPermissionToBool(this.DetailDto.Permissions ? { value: true }/*this.DetailDto.Permissions.LzeEvidovat*/ : undefined);
                    //const l_bDisableOtherItems = !SmlDetail.ConvertPermissionToBool(this.Editace ? { value: true } : (this.DetailDto.Permissions ? { value: true }/*this.DetailDto.Permissions.LzeEvidovat*/ : undefined));
                    //const headerFields = Gordic.Eko.HeaderForm.Fields;
                    ////this.element.findFields(headerFields.Kniha).gfield("option", "disabled", l_bDisableHeaderItems);
                    ////this.element.findFields(headerFields.EvidencniCislo).gfield("option", "disabled", l_bDisableHeaderItems);
                    ////this.element.findFields(headerFields.AgendoveCislo).gfield("option", "disabled", l_bDisableHeaderItems);
                    //this.element.findFields(headerFields.TypDokladu).gfield("option", "disabled", l_bDisableHeaderItems);
                    ////this.element.findFields([headerFields.TypDokladu, headerFields.DatumEvidence, headerFields.Popis].join(',')).gfield("option", "disabled", false);
                    ////this.element.findFields("ixs_typ").gfield("option", "disabled", l_bDisableHeaderItems);
                    ////this.element.findFields(headerFields.TypDokladu).gfield("option", "disabled", l_bDisableHeaderItems);
                    ////this.element.findFields("dat_nov_zus").gfield("option", "disabled", l_bDisableOtherItems);
                    //this.element.findFields("dat_nov_zus").gfield("option", "disabled", l_bDisableOtherItems);
                    //this.element.findFields(headerFields.Popis).gfield("option", "disabled", l_bDisableOtherItems);
                    //this.element.findFields("ixs_esu").gfield("option", "disabled", l_bDisableOtherItems);
                    ////this.element.findFields("popis").gfield("option", "disabled", l_bDisableOtherItems);
                    //this.element.findFields("c_limit").gfield("option", "disabled", l_bDisableOtherItems);
                    ////this.element.findFields("ixp_den").gfield("option", "disabled", false);
                    ////this.element.findFields([headerFields.TypDokladu, headerFields.DatumEvidence, headerFields.Popis].join(',')).gfield("option", "disabled", false);
                    // akce
                    const acts = this.actions;
                    ////let www = this.actions.getActions().find((act) => { return act.name == "actOpravit"; });
                    ////let qqq = this.actions.getActions((act) => { return act.name == "actOpravit"; });
                    //const permEditace = SmlDetail.getEditPermission();
                    //this.actions.actPodani!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? this.DetailDto.Permissions.LzePodat : undefined)));
                    //const formChanged = this.findForms().gform("hasChanged");
                    //// TODO: dořešit editační režim
                    //this.actions.actEvidence!.updatePermission((formChanged || this.Editace ? { value: true } : (this.DetailDto.Permissions ? { value: true }/*this.DetailDto.Permissions.LzeEvidovat*/ : undefined)));
                    //this.actions.actOprava!.visible(!this.Editace);
                    //// TODO: dořešit editační režim
                    //this.actions.actOprava!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? { value: true }/*this.DetailDto.Permissions.LzeOpravit*/ : undefined)));
                    //this.actions.actZrusitZmeny!.visible(this.Editace);
                    //this.actions.actZrusitZmeny!.updatePermission((!this.Editace ? SmlDetail.getEditPermission(false) : { value: true }));
                    ////this.actions.actStorno!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? this.DetailDto.Permissions.LzeStornovat : undefined)));
                    ////this.actions.actZrusitStorno!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? this.DetailDto.Permissions.LzeZrusitStorno : undefined)));
                    ////this.actions.actSchvaleni!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? this.DetailDto.Permissions.LzeSchvalit : undefined)));
                    ////this.actions.actZrusitSchvaleni!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? this.DetailDto.Permissions.LzeZrusitSchvaleni : undefined)));
                    ////this.actions.actUzavreni!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? this.DetailDto.Permissions.LzeUzavrit : undefined)));
                    ////this.actions.actZrusitUzavreni!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? this.DetailDto.Permissions.LzeZrusitUzavreni : undefined)));
                    ////this.actions.actPredani!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? this.DetailDto.Permissions.LzePredat : undefined)));
                    ////this.actions.actPrevzeti!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? this.DetailDto.Permissions.LzePrevzit : undefined)));
                    ////this.actions.actPrideleni!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? this.DetailDto.Permissions.LzePridelit : undefined)));
                    ////this.actions.actPreevidence!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? this.DetailDto.Permissions.LzePreevidovat : undefined)));
                    ////this.actions.actVraceniDoWfl!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? this.DetailDto.Permissions.LzeVratitDoWfl : undefined)));
                    ////this.actions.actDiagnostika!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? this.DetailDto.Permissions.LzeDiagnostika : undefined)));
                    //this.actions.actTiskDS!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? this.DetailDto.Permissions.LzeTisknout : undefined)));
                    //this.actions.actInfo!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? { value: true }/*this.DetailDto.Permissions.LzeTisknout*/ : undefined)));
                    //this.actions.actZapisy!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? { value: true }/*this.DetailDto.Permissions.LzeTisknout*/ : undefined)));
                    //this.actions.actPolozkyUP!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? { value: true }/*this.DetailDto.Permissions.LzeTisknout*/ : undefined)));
                    //this.actions.actPolozkyVP!.updatePermission((this.Editace ? permEditace : (this.DetailDto.Permissions ? { value: true }/*this.DetailDto.Permissions.LzeTisknout*/ : undefined)));
                    //// TODO: ještě vrácení do WFL
                    //// TODO: a pak ještě dořešit spoustu dalších akcí, která přidají komponenty v detailbuilderu
                    acts.actObcerstveniPS.updatePermission(/*(this.Editace ? permEditace : */ { value: true } /*)*/);
                    // tab Doklady
                    let exDoklady = this.$gridDokladyS != null ? (Gordic.Eko.Grid.currentRow(this.$gridDokladyS) != null) : false;
                    acts.actDetailDokladu.updatePermission({ value: exDoklady });
                    // tab Subjekty
                    this.enableSubjekty();
                    // tab IISSP
                    // TODO: dodělat (podmínky, permission, ...)
                    //const aktRadekIissp = Gordic.Eko.Grid.currentRow<Gordic.Fuc.Interface.GPolozkaIisspDto>(this.$gridIISSPPolozky);
                    acts.actHistorieIissp.updatePermission(this.JeIissp ? { value: true } : { value: false });
                    acts.actTestIissp.updatePermission(this.JeIissp ? { value: true } : { value: false });
                    acts.actTestIissp2.updatePermission(this.JeIissp ? { value: true } : { value: false });
                    // status bar
                    // zlikvidována OK jinak varování
                    Gordic.Eko.Detail.StatusBar.updateItem(this.statuses["statusBarStav"], this.DetailDto.sml_stav_txt?.toUpperCase() ?? "", (this.DetailDto.sml_stav === Gordic.Sml.Globals.Enums.StavSml.Schvaleno
                        ? Gordic.Eko.Utils.RecordFormatType.Schvaleno
                        : (this.DetailDto.sml_stav === Gordic.Sml.Globals.Enums.StavSml.Ukonceno
                            ? Gordic.Eko.Utils.RecordFormatType.Realizovano
                            : (this.DetailDto.sml_stav === Gordic.Sml.Globals.Enums.StavSml.Storno
                                ? Gordic.Eko.Utils.RecordFormatType.Stornovano
                                : null))));
                    if (this.JeIissp) {
                        // TODO: dořešit text a barvy
                        Gordic.Eko.Detail.StatusBar.updateItem(this.statuses["statusBarStavRezIissp"], "IISSP: " + (this.DetailDto.stav_rez_iissp_txt?.toUpperCase() ?? ""), (this.DetailDto.sml_stav === Gordic.Sml.Globals.Enums.StavSml.Schvaleno
                            ? Gordic.Eko.Utils.RecordFormatType.Schvaleno
                            : (this.DetailDto.sml_stav === Gordic.Sml.Globals.Enums.StavSml.Ukonceno
                                ? Gordic.Eko.Utils.RecordFormatType.Realizovano
                                : (this.DetailDto.sml_stav === Gordic.Sml.Globals.Enums.StavSml.Storno
                                    ? Gordic.Eko.Utils.RecordFormatType.Stornovano
                                    : null))));
                    }
                    // KPI
                    //this.nastavKpiKompenzovanoProcent(this.kpis!.kpiZavazky);
                    //this.nastavKpiKompenzovanoProcent(this.kpis!.kpiPohledavky);
                    //// nastavení tisku
                    //if (this.DetailDto.JeSchvaleny || this.DetailDto.JeSparovany) {
                    //    // tisk oznámení
                    //    this.actions.actTiskZL!.update({ caption: "Tisk oznámení" });
                    //    this.actions.actTiskZL!.tema = "sml_ptm_zldok";
                    //}
                    //else if (this.DetailDto.JeEvidovany) {
                    //    // tisk návrhu
                    //    this.actions.actTiskZL!.update({ caption: "Návrh kompenzace"/*"Tisk návrhu"*/ });
                    //    this.actions.actTiskZL!.tema = "sml_ptm_zlnav";
                    //}
                    //else {
                    //    // tisk není povolen
                    //    this.actions.actTiskZL!.update({ caption: "Tisk" });
                    //    this.actions.actTiskZL!.tema = "";
                    //}
                }
                /**
                 * Zadání parametrů tisku
                 *
                 * @param {IGPrintActionReportStarting} rep parametry tisku
                 */
                reportStarting(rep) {
                    // pouze PID, nic jiného se nepředává
                    rep.params.X0005 = this.IxpSmlPri;
                }
                // TODO: nezačně se znovu používat tato metoda? zkonzultovat s Vlastou, jak dělat reload - Vlasta doporučuje udělat load celého okna, ale šlo by nastavit nějaký příznak, že data jsou už načtená a v C# je pak nenačítat. Poslán dotaz Alíkovi, jestli mají nebo nemají aktivní ISLové operace vracet aktuální data a pak to rozhodnout
                /**
                 * Nastaví příznak aktivní operace a znovu načte celý formulář
                 *
                 * @param {boolean} withoutReload (default = false) true = neaktualizovat formulář
                 * @returns {JQuery.Promise<any>} promise
                 */
                setActiveOperationAndReloadData(withoutReload = false) {
                    // vyvolání trigger o aktivní operaci
                    this.trigger(WebClient.SmlDetail.triggerChange, [{ data: this.DetailDto }]);
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
                    // TODO: touhle cestou se nevrátí retData
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
                    // nastavení stavu políček a akcí
                    this.enable();
                    // nastavení fokusu
                    if (setFocus) {
                        // TODO: dořešit editační režim
                        if (WebClient.SmlDetail.ConvertPermissionToBool(this.DetailDto.Permissions ? { value: true } /*this.DetailDto.Permissions.LzeEvidovat*/ : undefined)) {
                            GDbd.getElementToFocus(this.element, ".gfield:not(.ui-state-disabled)")?.first().trigger("focus");
                        }
                    }
                }
                /**
                 * Nastavení prvků na tabu subjektů
                 */
                enableSubjekty() {
                    // TODO: dočesat
                    let aktRadek = null;
                    if (this.$gridSubjekty)
                        aktRadek = Gordic.Eko.Grid.currentRow(this.$gridSubjekty);
                    const acts = this.actions;
                    const perms = this.DetailDto.Permissions;
                    acts.actDetailSubjektu.updatePermission(WebClient.SmlGrid.getCombinedGridPermission(aktRadek, false, perms?.LzeZobrazit));
                    acts.actAktivniSubjekty.updatePermission({ value: true });
                }
                /**
                 * Test, je-li PID případu SML zadán
                 *
                 * @returns {boolean} true = PID zadán, false = PID nezadán
                 */
                ixpZadan() {
                    // TODO: na tohle mám vlastnost z cs, ale nefungovalo to. buď to opravit nebo nechat tohle a v cs to změnit na private a bez JsonProperty. v seznamu je obdoba pro knihu
                    return (this.IxpSmlPri != null && this.IxpSmlPri !== "");
                }
                /**
                 * Test, jestli je možné okno zavřít
                 *
                 * @returns {JQueryPromise<Interface.GPripadSmlDto> | Interface.GPripadSmlDto} promise s daty (resolve = je možné zavřít, reject = není možné zavřít) nebo přímo data detailu
                 */
                closing() {
                    let that = this;
                    // kontrola na změněné položky
                    // TODO: dodělat, pokud bude editační režim
                    //let formChanged = this.findForms().gform("hasChanged");
                    return that.DetailDto;
                }
            };
            GDetailPripaduSml = __decorate([
                gcontent
            ], GDetailPripaduSml);
            WebClient.GDetailPripaduSml = GDetailPripaduSml;
        })(WebClient = Sml.WebClient || (Sml.WebClient = {}));
    })(Sml = Gordic.Sml || (Gordic.Sml = {}));
})(Gordic || (Gordic = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0RldGFpbFByaXBhZHVTbWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHRGV0YWlsUHJpcGFkdVNtbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBVSxNQUFNLENBcW9DZjtBQXJvQ0QsV0FBVSxNQUFNO0lBQUMsSUFBQSxHQUFHLENBcW9DbkI7SUFyb0NnQixXQUFBLEdBQUc7UUFBQyxJQUFBLFNBQVMsQ0Fxb0M3QjtRQXJvQ29CLFdBQUEsU0FBUztZQUMxQixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBS25DOzs7OztlQUtHO1lBRUgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxPQUFBLHFCQUF1QztnQkFBOUU7O29CQUVJOzs7dUJBR0c7b0JBQ0ssa0JBQWEsR0FBa0IsSUFBSSxDQUFDO29CQUM1QyxLQUFLO29CQUNMLGlCQUFpQjtvQkFDakIsbUJBQW1CO29CQUNuQixLQUFLO29CQUNMLDJCQUEyQjtvQkFDM0IsS0FBSztvQkFDTCxrQkFBa0I7b0JBQ2xCLG1CQUFtQjtvQkFDbkIsS0FBSztvQkFDTCxnQ0FBZ0M7b0JBQ2hDOzs7dUJBR0c7b0JBQ0ssa0JBQWEsR0FBa0IsSUFBSSxDQUFDO29CQUM1Qzs7O3VCQUdHO29CQUNLLGtCQUFhLEdBQWtCLElBQUksQ0FBQztvQkFNNUM7Ozs7dUJBSUc7b0JBQ0ssbUJBQWMsR0FBeUMsSUFBSSxDQUFDO2dCQWtsQ3hFLENBQUM7Z0JBNWhDRzs7bUJBRUc7Z0JBQ0ksY0FBYztvQkFFakIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixnREFBZ0Q7b0JBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7b0JBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLHdCQUF3QixFQUFFLFVBQVUsRUFBRSxFQUFFLEdBQUc7d0JBQ3ZELGdCQUFnQjt3QkFDaEIsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDNUYsMkdBQTJHO3dCQUMzRywrQkFBK0I7d0JBQy9CLDBMQUEwTDtvQkFDOUwsQ0FBQyxDQUFDLENBQUM7b0JBRUgscUJBQXFCO29CQUNyQixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xDLENBQUM7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0ksbUJBQW1CLENBQUMsT0FBZ0Q7b0JBRXZFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsc0NBQXNDO29CQUN0QyxvSkFBb0o7b0JBQ3BKLGdFQUFnRTtvQkFFaEUsdUNBQXVDO29CQUN2QyxPQUFPLENBQUMsYUFBYSxDQUFPLFFBQVEsRUFBRTt3QkFDbEMsT0FBTyxFQUFFOzRCQUNMLG1CQUFtQjs0QkFDbkIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsVUFBVSxHQUFHLElBQUksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7NEJBQzFKLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOzRCQUNsSCxtR0FBbUc7NEJBQ25HLGlCQUFpQjs0QkFDakIsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7NEJBQ2pHLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs0QkFDbkgsa0JBQWtCLEVBQUUsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTs0QkFDdEksZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUUsR0FBRyxFQUFFLGNBQWMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOzRCQUNuSCxZQUFZLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7NEJBQzdILGFBQWEsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs0QkFDL0gsZUFBZTs0QkFDZixtQkFBbUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOzRCQUN4RyxrQkFBa0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsY0FBYyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO3lCQUN4Rzt3QkFDRCxTQUFTLEVBQUU7NEJBQ1AsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFOzRCQUNqQyxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRTs0QkFDeEMsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxpQ0FBaUMsQ0FBQSxVQUFVLENBQUEsK0JBQStCLEVBQUU7NEJBQzFHLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxtQ0FBbUMsQ0FBQSxJQUFJLEVBQUU7NEJBQ2xGLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFO3lCQUM5RDt3QkFDRCxPQUFPLEVBQUU7NEJBQ0wsWUFBWSxDQUFBLDhEQUE4RDs0QkFDMUUsa0JBQWtCOzRCQUNsQixtQkFBbUI7NEJBQ25CLHFDQUFxQzt5QkFDeEM7d0JBQ0QsVUFBVSxFQUFFLEVBQ1g7d0JBQ0QsU0FBUyxFQUNMLElBQUksQ0FBQyxPQUFPOzRCQUNaLENBQUMsQ0FBQztnQ0FDRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxDQUFDO2dDQUMvRCxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLHVCQUF1QixFQUFFLENBQUM7NkJBQzFFOzRCQUNELENBQUMsQ0FBQztnQ0FDRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLGVBQWUsRUFBRSxDQUFDOzZCQUNsRTt3QkFFTCxJQUFJLEVBQUUsRUFDTDt3QkFDRCxJQUFJLEVBQUU7NEJBQ0YsWUFBWSxFQUFFO2dDQUNWLGlCQUFpQjtnQ0FDakIsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dDQUN6RyxJQUFJLEVBQUUsVUFBVSxHQUFHO29DQUNmLHlCQUF5QjtvQ0FDekIsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxDQUFBLFlBQVksRUFBRSxDQUFDO3lDQUM5RixVQUFVLENBQUMsVUFBVSxDQUFDO3lDQUN0QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFO3dDQUMzQyxRQUFRLEVBQUUsSUFBSTt3Q0FDZCxJQUFJLG9FQUErQztxQ0FDdEQsQ0FBQzt5Q0FDRCxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFO3dDQUM1QyxRQUFRLEVBQUUsSUFBSTt3Q0FDZCxJQUFJLG9FQUErQztxQ0FDdEQsQ0FBQzt5Q0FDRCxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFO3dDQUM1QyxRQUFRLEVBQUUsSUFBSTt3Q0FDZCxJQUFJLG9FQUErQztxQ0FDdEQsQ0FBQzt5Q0FDRCxVQUFVLENBQUMsUUFBUSxDQUFDO3lDQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDO3lDQUNkLFFBQVEsQ0FBVSxZQUFZLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7d0NBQy9ELFFBQVEsRUFBRSxJQUFJO3dDQUNkLElBQUksZ0VBQTZDO3dDQUNqRCxRQUFRLEVBQUUsQ0FBQzt3Q0FDWCxVQUFVLEVBQUUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO3FDQUM3QixDQUFDO3lDQUNELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQzt5Q0FDeEIsUUFBUSxDQUFVLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTt3Q0FDL0QsUUFBUSxFQUFFLElBQUk7d0NBQ2QsSUFBSSw4Q0FBb0M7d0NBQ3hDLFFBQVEsRUFBRSxDQUFDO3dDQUNYLFVBQVUsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7cUNBQzdCLENBQUM7eUNBQ0QsTUFBTSxDQUFDLFlBQVksQ0FBQzt5Q0FDcEIsUUFBUSxDQUFVLFlBQVksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTt3Q0FDL0QsUUFBUSxFQUFFLElBQUk7d0NBQ2QsSUFBSSxzREFBd0M7d0NBQzVDLFFBQVEsRUFBRSxDQUFDO3dDQUNYLFVBQVUsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7cUNBQzdCLENBQUM7eUNBQ0QsTUFBTSxDQUFDLGtCQUFrQixDQUFDO3lDQUMxQixRQUFRLENBQUMsWUFBWSxFQUFFO3dDQUNwQixRQUFRLEVBQUUsSUFBSTt3Q0FDZCxJQUFJLDBEQUEwQztxQ0FDakQsQ0FBQzt5Q0FDRCxVQUFVLENBQUMsYUFBYSxDQUFDO3lDQUN6QixNQUFNLENBQUMsb0JBQW9CLENBQUM7eUNBQzVCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFO3dDQUMzQixRQUFRLEVBQUUsSUFBSTt3Q0FDZCxJQUFJLHdEQUF5QztxQ0FDaEQsQ0FBQzt5Q0FDRCxRQUFRLENBQUMsWUFBWSxFQUFFLEtBQUssRUFBRTt3Q0FDM0IsUUFBUSxFQUFFLElBQUk7d0NBQ2QsSUFBSSx3REFBeUM7cUNBQ2hELENBQUM7eUNBQ0QsUUFBUSxDQUFDLFlBQVksRUFBRSxLQUFLLEVBQUU7d0NBQzNCLGtEQUFrRDt3Q0FDbEQsUUFBUSxFQUFFLElBQUk7d0NBQ2QsSUFBSSwwREFBMEM7cUNBQ2pELENBQUM7eUNBQ0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDO3lDQUN4QixRQUFRLENBQVUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFO3dDQUMvRCxRQUFRLEVBQUUsSUFBSTt3Q0FDZCxJQUFJLHdEQUF5Qzt3Q0FDN0MsUUFBUSxFQUFFLENBQUM7d0NBQ1gsVUFBVSxFQUFFLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztxQ0FDN0IsQ0FBQzt5Q0FDRCxNQUFNLENBQUMsY0FBYyxDQUFDO3lDQUN0QixRQUFRLENBQVUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFO3dDQUMvRCxRQUFRLEVBQUUsSUFBSTt3Q0FDZCxJQUFJLHdEQUF5QztxQ0FDaEQsQ0FBQyxDQUFDO29DQUNILENBQUM7b0NBQ0wsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0NBQ2xDLENBQUM7NkJBQ0o7NEJBQ0QsVUFBVSxFQUFFO2dDQUNSLFFBQVEsRUFBRSxJQUFJO2dDQUNkLFNBQVMsRUFBRTtvQ0FDUCxLQUFLLEVBQUUsU0FBUztvQ0FDaEIsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRTtvQ0FDM0IsTUFBTSxFQUFFLElBQUk7b0NBQ1osTUFBTSxFQUFFLEtBQUs7b0NBQ2IsT0FBTyxFQUFFLENBQUMsbUJBQW1CLENBQUM7b0NBQzlCLFVBQVUsRUFBRTt3Q0FDUix3QkFBd0I7d0NBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7b0NBQzVCLENBQUM7aUNBQ0o7Z0NBQ0QsSUFBSSxFQUFFLFVBQVUsR0FBRztvQ0FDZixzQkFBc0I7b0NBQ3RCLElBQUksQ0FBQyxXQUFXO3dDQUNoQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQzs2Q0FDbkIsU0FBUyxDQUFDOzRDQUNQLE1BQU0sRUFBRTtnREFDSixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFvQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRTtnREFDaEcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBbUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUU7NkNBQ2pHOzRDQUNELFVBQVUsRUFBRSxDQUFDO3lDQUNoQixDQUFDLENBQUM7Z0NBQ1gsQ0FBQzs2QkFDSjs0QkFDRCxXQUFXLEVBQUU7Z0NBQ1QsV0FBVztnQ0FDWCxRQUFRLEVBQUUsSUFBSTtnQ0FDZCxTQUFTLEVBQUU7b0NBQ1AsS0FBSyxFQUFFLGdDQUFnQyxDQUFBLFVBQVU7b0NBQ2pELEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUU7b0NBQzVCLE1BQU0sRUFBRSxJQUFJO29DQUNaLE1BQU0sRUFBRSxLQUFLO29DQUNiLE9BQU8sRUFBRTt3Q0FDTCxvQkFBb0I7d0NBQ3BCLHFCQUFxQjtxQ0FDeEI7b0NBQ0QsVUFBVSxFQUFFO3dDQUNSLG1CQUFtQjt3Q0FDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29DQUN4QixDQUFDO2lDQUNKO2dDQUNELElBQUksRUFBRSxVQUFVLEdBQUc7b0NBQ2YsMkNBQTJDO29DQUMzQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUU7eUNBQzFCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO3lDQUNyQixRQUFRLENBQUMsR0FBRyxDQUFDO3lDQUNiLEtBQUssQ0FBMEM7d0NBQzVDLElBQUksRUFBRSxjQUFjO3dDQUNwQixxQkFBcUI7d0NBQ3JCLFVBQVUsRUFBRSxNQUFNLEVBQU0seUNBQXlDO3dDQUNqRSxnQkFBZ0I7d0NBQ2hCLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQjt3Q0FDN0MsNkNBQTZDO3dDQUM3QyxnQkFBZ0I7d0NBQ2hCLE9BQU8sRUFBRSxVQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFBLFFBQVEsQ0FBQzt3Q0FDOUQsY0FBYyxFQUFFOzRDQUNaLFVBQVUsRUFBRSwrRUFBK0UsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQUEsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDOzRDQUNuSiw4SkFBOEo7NENBQzlKLFdBQVcsRUFDUCxPQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUNuQixFQUFFLElBQUksRUFBRSxPQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLENBQUMsTUFBTSx3Q0FBOEIsRUFBRSxFQUFFLENBQ3BLO3lDQUNSO3dDQUNELFlBQVksRUFBRSxVQUFVLEVBQUUsRUFBRSxHQUFHOzRDQUMzQiw2REFBNkQ7NENBQzdELElBQUksR0FBRyxDQUFDLFFBQVE7Z0RBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO3dDQUM1QyxDQUFDO3FDQUNKLENBQUM7eUNBQ0QsUUFBUSxDQUFDO3dDQUNOLGFBQWEsRUFBRSxLQUFLO3FDQUN2QixDQUFDLENBQUM7Z0NBQ1gsQ0FBQzs2QkFDSjs0QkFDRCxNQUFNLEVBQUU7Z0NBQ0osTUFBTTtnQ0FDTixTQUFTLEVBQUU7b0NBQ1AsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLG1DQUFtQyxDQUFBLElBQUk7aUNBQzFGO2dDQUNELDBCQUEwQjtnQ0FDMUIsUUFBUSxFQUFFLElBQUk7Z0NBQ2QsSUFBSSxFQUFFLFVBQVUsR0FBRztvQ0FDZixJQUFJLFlBQTBELENBQUM7b0NBQy9ELElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7b0NBQ2xHLFlBQVksR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQ0FDbEYsR0FBRztvQ0FDSCxJQUFJLGVBQWUsR0FBMEM7d0NBQ3pELFlBQVksRUFBRSxLQUFLO3dDQUNuQixnQkFBZ0IsRUFBRSxLQUFLO3dDQUN2QixtQkFBbUI7d0NBQ25CLFFBQVEsRUFBRSxJQUFJO3dDQUNkLFdBQVcsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDO3dDQUN6RCxTQUFTLEVBQUUsU0FBUzt3Q0FDcEIsT0FBTyxFQUFFLE1BQU07d0NBQ2YsS0FBSyxFQUFFOzRDQUNILFNBQVMsRUFBRSxZQUFZOzRDQUN2QixNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dEQUM3RCxhQUFhO2dEQUNiLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLHFEQUEwQyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsRUFBRTtnREFDM0csZUFBZTtnREFDZixFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyx1REFBNEMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0RBQ3ZHLFdBQVc7Z0RBQ1gsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8saURBQXVDLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxFQUFFO2dEQUN2RyxpQkFBaUI7Z0RBQ2pCLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLG1EQUF3QyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsRUFBRTtnREFDeEcsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sbURBQXdDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxFQUFFO2dEQUNwRyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyxtREFBd0MsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0RBQ2xHLGdCQUFnQjtnREFDaEIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sdURBQTRDLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxFQUFFO2dEQUM1RyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyx1REFBNEMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0RBQ3hHLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLHVEQUE0QyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsRUFBRTtnREFDdEcsZ0JBQWdCO2dEQUNoQixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLEVBQUUsT0FBTyx1REFBNEMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEVBQUU7Z0RBQzVHLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLHVEQUE0QyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsRUFBRTtnREFDeEcsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxFQUFFLE9BQU8sdURBQTRDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxFQUFFO2dEQUN0RyxnQkFBZ0I7Z0RBQ2hCLDJCQUEyQjtnREFDM0IsK0dBQStHO2dEQUMvRywyR0FBMkc7Z0RBQzNHLHlHQUF5RztnREFDekcsUUFBUTtnREFDUixFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLHVEQUE0QyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsRUFBRTs2Q0FDOUcsQ0FBQzt5Q0FDTDtxQ0FDSixDQUFDO29DQUNGLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBRS9ILFVBQVU7b0NBQ1YsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7d0NBQ3hDLEtBQUssRUFBRSxVQUFVO3dDQUNqQixNQUFNLEVBQUUsSUFBSTtxQ0FDZixDQUFDLENBQUE7b0NBQ0YsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7d0NBQzFDLElBQUksRUFBRSxpQkFBaUI7d0NBQ3ZCLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUF3QixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7NENBQ25FLE9BQU8sRUFBRTtnREFDTCxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXOzZDQUMxQzt5Q0FDSixDQUFDLEVBQ0UsRUFBRSxHQUFHLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQ2hEO3dDQUNELFVBQVUsRUFBRSxNQUFNO3dDQUNsQixPQUFPLEVBQUUsVUFBQSxPQUFPLENBQUMsMkJBQTJCLEVBQUU7cUNBQ2pELENBQUMsQ0FBQztnQ0FDUCxDQUFDOzZCQUNKOzRCQUNELFFBQVEsRUFBRTtnQ0FDTixRQUFRO2dDQUNSLFFBQVEsRUFBRSxJQUFJO2dDQUNkLFNBQVMsRUFBRTtvQ0FDUCxLQUFLLEVBQUUsT0FBTztvQ0FDZCxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFO29DQUN6QixNQUFNLEVBQUUsSUFBSTtvQ0FDWixNQUFNLEVBQUUsS0FBSztvQ0FDYixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87b0NBQ3JCLE9BQU8sRUFBRSxDQUFDLG1CQUFtQixFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQztvQ0FDakUsMkJBQTJCO29DQUMzQiwwQkFBMEI7b0NBQzFCLHVCQUF1QjtvQ0FDdkIsR0FBRztpQ0FDTjs2QkFDSjt5QkFDSjtxQkFDSixFQUFFLElBQUksQ0FBQyxDQUFDO29CQUVULHNCQUFzQjtvQkFDdEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzFELENBQUM7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0ksb0JBQW9CLENBQUMsT0FBZ0Q7b0JBRXhFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsbUNBQW1DO29CQUNuQyxxRUFBcUU7b0JBQ3JFLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztvQkFDckIsa0VBQWtFO29CQUNsRSxtQkFBbUI7b0JBQ25CLCtCQUErQjtvQkFDL0IseUpBQXlKO29CQUN6SixxREFBcUQ7b0JBQ3JELGFBQWE7b0JBQ2IsZ0dBQWdHO29CQUNoRyw2REFBNkQ7b0JBQzdELHlEQUF5RDtvQkFDekQsT0FBTztvQkFDUCx5QkFBeUI7b0JBQ3pCLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUc7d0JBQzdDLElBQUksRUFBRTs0QkFDRixPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJOzRCQUM3RCxPQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJO3lCQUMzRTtxQkFDaUIsQ0FBQztvQkFDdkIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRzt3QkFDOUMsSUFBSSxFQUFFOzRCQUNGLE9BQU8sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUk7eUJBQ3hFO3FCQUNpQixDQUFDO29CQUN2QixTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHO3dCQUM5QyxJQUFJLEVBQUU7NEJBQ0YsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSTs0QkFDcEUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSTt5QkFDeEU7cUJBQ2lCLENBQUM7b0JBQ3ZCLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEVBQXFCLENBQUM7b0JBQ3RHLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQXFCLENBQUM7b0JBQzVHLHdCQUF3QjtvQkFDeEIscUdBQXFHO29CQUNyRyxvU0FBb1M7b0JBQ3BTLG1TQUFtUztvQkFDblMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRzt3QkFDakQsT0FBTyxFQUFFOzRCQUNMLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTs0QkFDekMsUUFBUSxFQUFFLElBQUk7NEJBQ2QsS0FBSyxFQUFFLG1EQUFtRDs0QkFDMUQsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7eUJBQzFDO3FCQUNlLENBQUM7b0JBQ3JCLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBcUIsQ0FBQztvQkFDckksNkxBQTZMO29CQUM3TCxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLHdEQUE4QyxFQUFxQixDQUFDO29CQUNqSyx1QkFBdUI7b0JBQ3ZCLGdHQUFnRztvQkFFaEcsdUJBQXVCO29CQUN2QixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUVoRCwyQkFBMkI7b0JBQzNCLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyx1Q0FBdUMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLElBQUksS0FBSyxDQUFBLGtCQUFrQixDQUFDLENBQUM7b0JBRWhILDZCQUE2QjtvQkFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTzt3QkFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUM7NEJBQ2xELFFBQVEsRUFBRSxVQUFVLFNBQVM7Z0NBQ3pCLE9BQU87b0NBQ0gsSUFBSSxDQUFDLEdBQUc7b0NBQ1I7d0NBQ0ksU0FBUyxFQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVc7d0NBQ2hELGlCQUFpQixFQUFFLElBQUk7cUNBQzFCO2lDQUFDLENBQUM7NEJBQ1gsQ0FBQzs0QkFDRCxnQkFBZ0IsRUFBRSx3RUFBd0U7NEJBQzFGLGdCQUFnQixFQUFFLHNFQUFzRTs0QkFDeEYsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPO3lCQUMzQixDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFRDs7Ozs7bUJBS0c7Z0JBQ0ksdUJBQXVCLENBQUMsRUFBZ0IsRUFBRSxHQUFTO29CQUV0RCxJQUFJLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9DLENBQUM7Z0JBRUQ7Ozs7O21CQUtHO2dCQUNLLGNBQWMsQ0FBQyxHQUFXO29CQUU5QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksR0FBRyxFQUFFLENBQUM7d0JBRU4sT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7NkJBQ3ZDLE9BQU8sRUFBRTs2QkFDVCxJQUFJLENBQUMsVUFBVSxJQUFJOzRCQUNoQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3BDLENBQUMsQ0FBQyxDQUFDO29CQUVYLENBQUM7O3dCQUNJLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNoRCxDQUFDO2dCQUVEOzs7OzttQkFLRztnQkFDSyxjQUFjO29CQUVsQixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQXFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFFbEcsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDO2dCQUVEOzs7OzttQkFLRztnQkFDSyxhQUFhLENBQUMsSUFBK0M7b0JBRWpFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztvQkFFaEIsSUFBSSxJQUFJLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQzt3QkFFN0IsMEJBQTBCO3dCQUMxQixJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7d0JBRXhCLG1CQUFtQjt3QkFDbkIsSUFBSSxRQUFRLEdBQUcsVUFBQSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO3dCQUMvRixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUM3QixDQUFDLHdCQUF3QixHQUFHLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUN0Rzs0QkFDSSxFQUFFLEVBQUUsUUFBUSxHQUFHLEdBQUc7NEJBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRzs0QkFDYiw2Q0FBNkM7NEJBQzdDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTzt5QkFDdkIsQ0FDSixDQUFDO3dCQUVGLHFDQUFxQzt3QkFDckMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBQSxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUMsTUFBVyxFQUFFLEVBQUU7NEJBQ2pFLHlDQUF5Qzs0QkFDekMsSUFBSSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDO2dDQUNwQix1QkFBdUI7Z0NBQ3ZCLFdBQVcsR0FBRyxJQUFJLENBQUM7NEJBQ3ZCLENBQUM7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7d0JBRUgsd0JBQXdCO3dCQUN4QixhQUFhLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQVcsRUFBRSxFQUFFOzRCQUN2QyxvRUFBb0U7NEJBQ3BFLElBQUksV0FBVyxFQUFFLENBQUM7Z0NBQ2QsSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUM7NEJBQzNDLENBQUM7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7d0JBRUgsT0FBTyxhQUFhLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztvQkFFL0MsQ0FBQzs7d0JBQ0ksT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2hELENBQUM7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0ssU0FBUztvQkFFYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLEdBQUcsRUFBRSxtQkFBbUIsRUFBRSxDQUFDLEVBQUU7d0JBQzVGLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVc7cUJBQ3RDLENBQUM7eUJBQ0csbUJBQW1CLEVBQUUsQ0FBQztnQkFDL0IsQ0FBQztnQkFFRDs7OzttQkFJRztnQkFDSyxVQUFVO29CQUVkLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixFQUFFLENBQUMsRUFBRTt3QkFDaEcsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVztxQkFDdEMsQ0FBQzt5QkFDRyxtQkFBbUIsRUFBRSxDQUFDO2dCQUMvQixDQUFDO2dCQUVEOzs7O21CQUlHO2dCQUNLLGFBQWE7b0JBRWIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxHQUFHLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxFQUFFO3dCQUN4RyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXO3FCQUN0QyxDQUFDO3lCQUNHLG1CQUFtQixFQUFFLENBQUM7Z0JBQ25DLENBQUM7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0ssVUFBVTtvQkFFZCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxxREFBcUQ7b0JBRTNGLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRTt5QkFDbEMsSUFBSSxDQUFDO3dCQUNGLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLEVBQUUsQ0FBQzs0QkFDOUIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO3dCQUMvQixDQUFDOzZCQUNJLENBQUM7NEJBQ0YsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lDQUNuSCxPQUFPLEVBQUUsQ0FBQzt3QkFDbkIsQ0FBQztvQkFDTCxDQUFDLENBQUM7eUJBQ0QsSUFBSSxDQUFDLFVBQVUsSUFBMEM7d0JBQ3RELElBQUksSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDOzRCQUNmLGNBQWM7NEJBQ2QsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7NEJBQzNCLE9BQU8sSUFBSSxDQUFDO3dCQUNoQixDQUFDOzs0QkFDSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQy9CLENBQUMsQ0FBQzt5QkFDRCxNQUFNLENBQUM7d0JBQ0osSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO29CQUN4QixDQUFDLENBQUMsQ0FBQztnQkFDWCxDQUFDO2dCQUVEOzs7OzttQkFLRztnQkFDSyxXQUFXLENBQUMsS0FBYztvQkFFOUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixzQ0FBc0M7b0JBQ3RDLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO29CQUM5QixDQUFDO29CQUNELElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUUsQ0FBQzt3QkFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBLDZCQUE2Qjt3QkFDeEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7b0JBQzlCLENBQUM7b0JBRUQsSUFBSSxLQUFLLEVBQUUsQ0FBQzt3QkFFUixRQUFRO3dCQUVSLGlCQUFpQjt3QkFDakIsSUFBSSxpQkFBaUIsR0FBRyxVQUFVLElBQXdDOzRCQUN0RSxPQUFPO2dDQUNILEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBSTtnQ0FDYixJQUFJLEVBQUUsUUFBUTtnQ0FDZCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBSSxDQUFDO2dDQUNqRyxPQUFPLEVBQUU7b0NBQ0wsdUtBQXVLO29DQUN2SyxXQUFXLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsR0FBSSxDQUFDO29DQUM5QyxXQUFXLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO29DQUN2RCxXQUFXLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDO29DQUNwRCxFQUFFO29DQUNGLFdBQVcsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDO29DQUN6RCx1RUFBdUU7b0NBQ3ZFLHlEQUF5RDtvQ0FDekQsRUFBRTtvQ0FDRixXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztpQ0FDaEQsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dDQUNkLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxjQUFjO29DQUMxRCxvQkFBb0I7b0NBQ3BCLENBQUMsQ0FBQyxvQ0FBb0M7b0NBQ3RDLDRCQUE0QjtvQ0FDNUIsQ0FBQyxDQUFDLFVBQVU7Z0NBQ2hCLE1BQU0sRUFDRixJQUFJLE9BQU8sQ0FBQztvQ0FDUixJQUFJLEVBQUUsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEdBQUc7b0NBQ25DLEdBQUcsRUFBRSxjQUFjLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUNBQ3hFLENBQUM7NkJBQ1QsQ0FBQzt3QkFDTixDQUFDLENBQUE7d0JBQ0QsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLE1BQW9CLEVBQUUsSUFBd0M7NEJBQzNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0NBQ2xCLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7b0NBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJO3dDQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO29DQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dDQUNoRCxDQUFDO3FDQUNJLElBQUksSUFBSSxDQUFDLFFBQVE7b0NBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzs0QkFDbEUsQ0FBQyxDQUFDLENBQUM7d0JBQ1AsQ0FBQyxDQUFBO3dCQUVELDZCQUE2Qjt3QkFDN0IsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFOzZCQUNuQixJQUFJLENBQUMsVUFBVSxJQUFJOzRCQUNoQixpREFBaUQ7NEJBQ2pELElBQUksVUFBVSxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7NEJBQ3pDLElBQUksSUFBSSxFQUFFLENBQUM7Z0NBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtvQ0FDakIsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7d0NBQ1osSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7NENBQ2hCLGlCQUFpQjs0Q0FDakIsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO3dDQUN4QyxDQUFDOzZDQUNJLENBQUM7NENBQ0YsZ0JBQWdCOzRDQUNoQixVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0NBQzlDLENBQUM7b0NBQ0wsQ0FBQztnQ0FDTCxDQUFDLENBQUMsQ0FBQzs0QkFDUCxDQUFDOzRCQUNELE9BQU8sVUFBVSxDQUFDO3dCQUN0QixDQUFDLENBQUM7NkJBQ0QsSUFBSSxDQUFDLFVBQVUsVUFBd0I7NEJBQ3BDLDJCQUEyQjs0QkFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFO2lDQUMxQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztpQ0FDMUIsY0FBYyxDQUFDO2dDQUNaLE1BQU0sRUFBRSxVQUFVOzZCQUNyQixDQUFDLENBQUM7NEJBQ1AsT0FBTzt3QkFDWCxDQUFDLENBQUM7NkJBQ0QsSUFBSSxDQUFDOzRCQUNGLG1CQUFtQjs0QkFDbkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUNsQixDQUFDLENBQUMsQ0FBQztvQkFDWCxDQUFDO3lCQUNJLENBQUM7d0JBRUYsU0FBUzt3QkFFVCxpQkFBaUI7d0JBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRTs2QkFDMUIsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7NkJBQ3JCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDOzZCQUMxQixLQUFLLENBQXFDOzRCQUN2QyxJQUFJLEVBQUUsY0FBYzs0QkFDcEIscUJBQXFCOzRCQUNyQixVQUFVLEVBQUUsTUFBTSxFQUFNLHlDQUF5Qzs0QkFDakUsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCOzRCQUM1Qyw2Q0FBNkM7NEJBQzdDLE9BQU8sRUFBRSxVQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7NEJBQzFELGNBQWMsRUFBRTtnQ0FDWixVQUFVLEVBQUUsNElBQTRJO2dDQUN4SixXQUFXLEVBQ1AsT0FBQSxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FDbkIsRUFBRSxJQUFJLEVBQUUsT0FBQSxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsZ0NBQWdDLEVBQUUsT0FBTyxFQUFFLGlDQUFpQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUMvSzs2QkFDUjt5QkFDSixDQUFDOzZCQUNELFFBQVEsQ0FBQzs0QkFDTixhQUFhLEVBQUUsS0FBSzt5QkFDdkIsQ0FBQyxDQUFDO3dCQUVQLG1CQUFtQjt3QkFDbkIsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFOzZCQUNuQixJQUFJLENBQUMsVUFBVSxJQUFJOzRCQUNoQixTQUFTOzRCQUNULElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2dDQUNsQyxHQUFHLEVBQUUsS0FBSztnQ0FDVixVQUFVLEVBQUU7b0NBQ1IsSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEVBQ3BFO3dDQUNJLDRCQUE0Qjt3Q0FDNUIsWUFBWSxFQUFFLE1BQU07cUNBQ3ZCLENBQUM7aUNBQ1Q7NkJBQ0osQ0FBQyxDQUFDOzRCQUNILG9DQUFvQzs0QkFDcEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDOzRCQUMzQyxPQUFPO3dCQUNYLENBQUMsQ0FBQzs2QkFDRCxJQUFJLENBQUM7NEJBQ0YsbUJBQW1COzRCQUNuQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQ2xCLENBQUMsQ0FBQyxDQUFDO29CQUNYLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRDs7OzttQkFJRztnQkFDSyxjQUFjO29CQUVsQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUNyQixvQkFBb0I7d0JBQ3BCLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBNkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUM1RyxJQUFJLFVBQVUsRUFBRSxDQUFDOzRCQUNiLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUNsQyxJQUFJLEVBQ0o7Z0NBQ0ksTUFBTSxFQUFFLFVBQVUsQ0FBQyxPQUFPLElBQUksRUFBRTtnQ0FDaEMsSUFBSSxFQUFFLE9BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU07Z0NBQzNDLFFBQVEsRUFBRTtvQ0FDTiwrQkFBK0I7b0NBQy9CLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUztvQ0FDbkIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsaUJBQWlCO29DQUN4RSxTQUFTLEVBQUUsRUFBRTtpQ0FDaEI7NkJBQ0osQ0FFSCxDQUFDLG1CQUFtQixFQUFFLENBQUM7d0JBQzdCLENBQUM7b0JBQ0wsQ0FBQztvQkFFRCxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDM0MsQ0FBQztnQkFFRDs7Ozs7bUJBS0c7Z0JBQ0ssMEJBQTBCO29CQUU5QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUNyQixxQ0FBcUM7d0JBQ3JDLGtFQUFrRTt3QkFDbEUsbUJBQW1CO3dCQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFtQixDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQW1CLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUNsRyxPQUFPLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDL0IsQ0FBQzs7d0JBQ0ksT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2hELENBQUM7Z0JBRUQ7Ozs7Ozs7bUJBT0c7Z0JBQ0ssWUFBWTtvQkFFaEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVoQixtQkFBbUI7b0JBQ25CLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFO3dCQUN4QyxPQUFPOzRCQUNILE9BQU8sRUFBRTtnQ0FDTCxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXO2dDQUN2QyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBbUIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQyx3Q0FBOEIsQ0FBQyxDQUFDLFNBQVM7NkJBQzNHO3lCQUNKLENBQUM7b0JBQ04sQ0FBQyxDQUFDO3lCQUNHLE9BQU8sRUFBRTt5QkFDVCxJQUFJLENBQUMsVUFBVSxJQUFJO3dCQUNoQixTQUFTO3dCQUNULElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixFQUFFLENBQUMsQ0FBQzt3QkFDdEUsb0NBQW9DO3dCQUNwQyxJQUFJLENBQUMsYUFBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQzNDLE9BQU87b0JBQ1gsQ0FBQyxDQUFDO3lCQUNELElBQUksQ0FBQzt3QkFDRixtQkFBbUI7d0JBQ25CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDbEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsQ0FBQztnQkFFRDs7bUJBRUc7Z0JBQ0ssTUFBTTtvQkFFVixRQUFRO29CQUNSLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO29CQUN6Qyw0RkFBNEY7b0JBQzVGLGlDQUFpQztvQkFDakMsdUtBQXVLO29CQUN2Syx5TUFBeU07b0JBQ3pNLG9EQUFvRDtvQkFDcEQsb0dBQW9HO29CQUNwRyw2R0FBNkc7b0JBQzdHLDRHQUE0RztvQkFDNUcsdUdBQXVHO29CQUN2RyxxSkFBcUo7b0JBQ3JKLDJGQUEyRjtvQkFDM0YseUdBQXlHO29CQUN6Ryw4RkFBOEY7b0JBQzlGLDRGQUE0RjtvQkFDNUYsaUdBQWlHO29CQUNqRyx3RkFBd0Y7b0JBQ3hGLHdGQUF3RjtvQkFDeEYsd0ZBQXdGO29CQUN4RiwyRUFBMkU7b0JBQzNFLHFKQUFxSjtvQkFFckosT0FBTztvQkFDUCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUMxQiw0RkFBNEY7b0JBQzVGLHFGQUFxRjtvQkFDckYsb0RBQW9EO29CQUNwRCwwSkFBMEo7b0JBQzFKLDJEQUEyRDtvQkFDM0QsaUNBQWlDO29CQUNqQyxxTUFBcU07b0JBQ3JNLGlEQUFpRDtvQkFDakQsaUNBQWlDO29CQUNqQywrS0FBK0s7b0JBQy9LLHFEQUFxRDtvQkFDckQsd0hBQXdIO29CQUN4SCxnS0FBZ0s7b0JBQ2hLLHlLQUF5SztvQkFDekssa0tBQWtLO29CQUNsSywrS0FBK0s7b0JBQy9LLGdLQUFnSztvQkFDaEssNktBQTZLO29CQUM3Syw4SkFBOEo7b0JBQzlKLGdLQUFnSztvQkFDaEssa0tBQWtLO29CQUNsSyx1S0FBdUs7b0JBQ3ZLLHdLQUF3SztvQkFDeEssdUtBQXVLO29CQUN2Syw2SkFBNko7b0JBQzdKLDhLQUE4SztvQkFDOUssZ0xBQWdMO29CQUNoTCxtTEFBbUw7b0JBQ25MLG1MQUFtTDtvQkFDbkwsK0JBQStCO29CQUMvQiw4RkFBOEY7b0JBQzlGLElBQUksQ0FBQyxnQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxrQ0FBa0MsQ0FBQSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQSxLQUFLLENBQUMsQ0FBQztvQkFFaEcsY0FBYztvQkFDZCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQXFDLElBQUksQ0FBQyxhQUFjLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO29CQUNuSixJQUFJLENBQUMsZ0JBQWlCLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztvQkFFOUQsZUFBZTtvQkFDZixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBRXRCLFlBQVk7b0JBQ1osNENBQTRDO29CQUM1QyxrSEFBa0g7b0JBQ2xILElBQUksQ0FBQyxnQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDM0YsSUFBSSxDQUFDLFlBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFDdkYsSUFBSSxDQUFDLGFBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFFeEYsYUFBYTtvQkFDYixpQ0FBaUM7b0JBQ2pDLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUMzQixJQUFJLENBQUMsUUFBUyxDQUFDLGVBQWUsQ0FBRSxFQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQ2hELENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTO3dCQUNuRSxDQUFDLENBQUMsT0FBQSxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFNBQVM7d0JBQ3RDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUTs0QkFDcEUsQ0FBQyxDQUFDLE9BQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXOzRCQUN4QyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU07Z0NBQ2xFLENBQUMsQ0FBQyxPQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBVTtnQ0FDdkMsQ0FBQyxDQUFDLElBQUksQ0FDVCxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDZiw2QkFBNkI7d0JBQzdCLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUMzQixJQUFJLENBQUMsUUFBUyxDQUFDLHVCQUF1QixDQUFFLEVBQ3hDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQ3BFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTOzRCQUNuRSxDQUFDLENBQUMsT0FBQSxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFNBQVM7NEJBQ3RDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUTtnQ0FDcEUsQ0FBQyxDQUFDLE9BQUEsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXO2dDQUN4QyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU07b0NBQ2xFLENBQUMsQ0FBQyxPQUFBLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBVTtvQ0FDdkMsQ0FBQyxDQUFDLElBQUksQ0FDVCxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQixDQUFDO29CQUVELE1BQU07b0JBQ04sMkRBQTJEO29CQUMzRCw4REFBOEQ7b0JBRTlELG9CQUFvQjtvQkFDcEIsaUVBQWlFO29CQUNqRSxzQkFBc0I7b0JBQ3RCLG1FQUFtRTtvQkFDbkUscURBQXFEO29CQUNyRCxHQUFHO29CQUNILHdDQUF3QztvQkFDeEMsb0JBQW9CO29CQUNwQix1RkFBdUY7b0JBQ3ZGLHFEQUFxRDtvQkFDckQsR0FBRztvQkFDSCxRQUFRO29CQUNSLDBCQUEwQjtvQkFDMUIsMERBQTBEO29CQUMxRCx3Q0FBd0M7b0JBQ3hDLEdBQUc7Z0JBQ1AsQ0FBQztnQkFFRDs7OzttQkFJRztnQkFDSSxjQUFjLENBQUMsR0FBZ0M7b0JBRWxELHFDQUFxQztvQkFDckMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDdEMsQ0FBQztnQkFFRCx3VUFBd1U7Z0JBQ3hVOzs7OzttQkFLRztnQkFDSywrQkFBK0IsQ0FBQyxnQkFBeUIsS0FBSztvQkFFbEUscUNBQXFDO29CQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBRWxFLHNCQUFzQjtvQkFDdEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO3dCQUM1QyxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDdkIsQ0FBQzs7d0JBQ0ksT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2pELENBQUM7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0ssVUFBVTtvQkFFZCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUM1Qyx5Q0FBeUM7b0JBQ3pDLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN2QixDQUFDO2dCQUVEOzs7O21CQUlHO2dCQUNLLGtCQUFrQixDQUFDLFdBQW9CLEtBQUs7b0JBRWhELHVCQUF1QjtvQkFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7b0JBRXJCLG1CQUFtQjtvQkFDbkIsNEdBQTRHO29CQUM1RyxJQUFJLENBQUMsVUFBVSxFQUFFO3lCQUNaLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUM7eUJBQ2pFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDcEQsaUNBQWlDO29CQUNqQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2QsbUJBQW1CO29CQUNuQixJQUFJLFFBQVEsRUFBRSxDQUFDO3dCQUNYLCtCQUErQjt3QkFDL0IsSUFBSSxVQUFBLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUEsMENBQTBDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7NEJBQ3hJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGlDQUFpQyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN0RyxDQUFDO29CQUNMLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRDs7bUJBRUc7Z0JBQ0ssY0FBYztvQkFFbEIsZ0JBQWdCO29CQUNoQixJQUFJLFFBQVEsR0FBc0QsSUFBSSxDQUFDO29CQUN2RSxJQUFJLElBQUksQ0FBQyxhQUFhO3dCQUFFLFFBQVEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQTZDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDOUgsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDMUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxpQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFBLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUNqSCxJQUFJLENBQUMsa0JBQW1CLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDL0QsQ0FBQztnQkFFRDs7OzttQkFJRztnQkFDSyxRQUFRO29CQUVaLHdLQUF3SztvQkFDeEssT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQzdELENBQUM7Z0JBRUQ7Ozs7bUJBSUc7Z0JBQ0ksT0FBTztvQkFFVixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7b0JBRWhCLDhCQUE4QjtvQkFDOUIsMkNBQTJDO29CQUMzQyx5REFBeUQ7b0JBQ3pELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDMUIsQ0FBQzthQUNKLENBQUE7WUF2bkNZLGlCQUFpQjtnQkFEN0IsUUFBUTtlQUNJLGlCQUFpQixDQXVuQzdCO1lBdm5DWSwyQkFBaUIsb0JBdW5DN0IsQ0FBQTtRQUNMLENBQUMsRUFyb0NvQixTQUFTLEdBQVQsYUFBUyxLQUFULGFBQVMsUUFxb0M3QjtJQUFELENBQUMsRUFyb0NnQixHQUFHLEdBQUgsVUFBRyxLQUFILFVBQUcsUUFxb0NuQjtBQUFELENBQUMsRUFyb0NTLE1BQU0sS0FBTixNQUFNLFFBcW9DZiIsInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBHb3JkaWMuU21sLldlYkNsaWVudCB7XHJcbiAgICBsZXQgZ2NvbnRlbnQgPSBEZWNvcmF0b3JzLmdjb250ZW50O1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIER0b1R5cGVQUyA9IEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdQcmlwYWRTbWxEdG87XHJcbiAgICBleHBvcnQgdHlwZSBVc2VkQ29tcG9uZW50c1BTID0gR29yZGljLkdpbi5EZXRhaWxCdWlsZGVyQ29tcG9uZW50cy5HTGlzdENvbnRyb2xzRXh0ZW5zaW9uczxHb3JkaWMuU21sLkludGVyZmFjZS5HUHJpcGFkU21sRHRvPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERldGFpbCBwxZnDrXBhZHUgU01MXHJcbiAgICAgKiBcclxuICAgICAqIEBhdXRob3IgTWFydGluIEJvxI1la1xyXG4gICAgICogQHNpbmNlIDQ5MC4xLjAuMjVcclxuICAgICAqL1xyXG4gICAgQGdjb250ZW50XHJcbiAgICBleHBvcnQgY2xhc3MgR0RldGFpbFByaXBhZHVTbWwgZXh0ZW5kcyBHRGV0YWlsQnVpbGRlckNvbnRlbnQ8VXNlZENvbXBvbmVudHNQUz4gaW1wbGVtZW50cyBJR0NvbnRlbnQge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHcmlkIGV4dGVybsOtY2ggc3ViamVrdMWvXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeSB8IG51bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkZ3JpZFN1Ympla3R5OiBKUXVlcnkgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAvLy8qKlxyXG4gICAgICAgIC8vICogR3JpZCBwb2xvxb5la1xyXG4gICAgICAgIC8vICogQHR5cGUge0pRdWVyeX1cclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSAkZ3JpZFBvbDogSlF1ZXJ5O1xyXG4gICAgICAgIC8vLyoqXHJcbiAgICAgICAgLy8gKiBTdHJvbSBkb2tsYWTFr1xyXG4gICAgICAgIC8vICogQHR5cGUge0pRdWVyeX1cclxuICAgICAgICAvLyAqL1xyXG4gICAgICAgIC8vcHJpdmF0ZSAkdHJlZURva2xhZHlLOiBKUXVlcnk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR3JpZCB2YXplYiBkb2tsYWTFryAoem9icmF6ZW7DrSBqYWtvIHNlem5hbSlcclxuICAgICAgICAgKiBAdHlwZSB7SlF1ZXJ5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgJGdyaWREb2tsYWR5UzogSlF1ZXJ5IHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUMOhcyBrYXJldCB2YXplYiBkb2tsYWTFryAoem9icmF6ZW7DrSBqYWtvIGthcnR5KVxyXG4gICAgICAgICAqIEB0eXBlIHtKUXVlcnl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSAkcGlja0Rva2xhZHlLOiBKUXVlcnkgfCBudWxsID0gbnVsbDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTdWJ0YXNrIHZhemViIGRva2xhZMWvXHJcbiAgICAgICAgICogQHR5cGUge0pRdWVyeX1cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlICRzdWJEb2tsYWR5OiBKUXVlcnk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGF0YSB2YXplYiBkb2tsYWTFr1xyXG4gICAgICAgICAqIEB0eXBlIHtTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG9bXSB8IG51bGx9XHJcbiAgICAgICAgICogQGRlZmF1bHQgbnVsbFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZGF0YU5hdkRva2xhZHk6IFNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0b1tdIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIHZsYXN0bm9zdGkgeiBDI1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBJRCBwxZnDrXBhZHUgU01MXHJcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIEl4cFNtbFByaTogc3RyaW5nO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFR5cCBwxZnDrXBhZHUgU01MXHJcbiAgICAgICAgICogQHR5cGUge1NtbC5HbG9iYWxzLkVudW1zLlR5cFNlem5hbXVQcmlwYWR1fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgVHlwU2V6bmFtdVByaXBhZHU6IFNtbC5HbG9iYWxzLkVudW1zLlR5cFNlem5hbXVQcmlwYWR1XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V6bmFtIHBvdm9sZW7DvWNoIGthdGVnb3Jpw60gdHlwdSBkb2tsYWR1XHJcbiAgICAgICAgICogQHR5cGUge1NtbC5HbG9iYWxzLkVudW1zLkt0Z1R5cFtdfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgS3RnVHlwOiBTbWwuR2xvYmFscy5FbnVtcy5LdGdUeXBbXVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFrdHXDoWxuw60gc3Bpc292w70gdXplbFxyXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBJeHNTdTogc3RyaW5nO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGplIHN0w6F0bsOtIHBva2xhZG5hP1xyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgSmVJaXNzcDogYm9vbGVhbjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQxZnDrXpuYWsgZWRpdG92w6Fuw60gZGV0YWlsdVxyXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgRWRpdGFjZTogYm9vbGVhbjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEVE8gZGV0YWlsdSBwxZnDrXBhZHUgU01MXHJcbiAgICAgICAgICogQHR5cGUge0dvcmRpYy5TbWwuSW50ZXJmYWNlLkdQcmlwYWRTbWxEdG99XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBEZXRhaWxEdG86IEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdQcmlwYWRTbWxEdG87XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVmFsaWTDoXRvcnlcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0W119XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSB2YWxpZGF0b3JzOiBvYmplY3RbXTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1w6FsbsOtIHJva1xyXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBSb2s6IG51bWJlcjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZcW+aW0gZ2VuZXJvdsOhbsOtIFBJRHVcclxuICAgICAgICAgKiBAdHlwZSB7R29yZGljLlNtbC5HbG9iYWxzLkVudW1zLlJlemltR2VuSXhwfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZ2luX2dlbl9peHA6IEdvcmRpYy5TbWwuR2xvYmFscy5FbnVtcy5SZXppbUdlbkl4cDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmFkZWZpbm92w6Fuw60gZm9ybXVsw6HFmWVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25Db250ZW50UmVhZHkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyB6cMWZw61zdHVwbsSbbsOtIHRsYcSNw610a2EgcHJvIHVsb8W+ZW7DrSBwxZlpIHptxJtuw6FjaFxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQub2ZmKFwiZmllbGRjaGFuZ2UuZGV0YWlsUHJpcFwiKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm9uKFwiZmllbGRjaGFuZ2UuZGV0YWlsUHJpcFwiLCBmdW5jdGlvbiAoZXYsIGN0eCkge1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXZpZGVuY2VFbmFibGVkID0gdGhhdC5FZGl0YWNlID09PSB0cnVlID8gdHJ1ZSA6IHRoYXQuZmluZEZvcm1zKCkuZ2Zvcm0oXCJoYXNDaGFuZ2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogZG/FmWXFoWl0IHBlcm1pc3Npb25zIChhZ2VuZG92w6ksIGRva3VtZW50b3bDqSwgdmxhc3Rub3N0aT8pIC0gbmVibyB0byBuZcWZZcWhaXQgemRlLCBhbGUgYcW+IG5hIHNlcnZlcnU/XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb8WZZcWhaXQgZWRpdGHEjW7DrSByZcW+aW1cclxuICAgICAgICAgICAgICAgIC8vdGhhdC5hY3Rpb25zLmFjdEV2aWRlbmNlIS51cGRhdGVQZXJtaXNzaW9uKChldmlkZW5jZUVuYWJsZWQgPyB7IHZhbHVlOiB0cnVlIH0gOiAvKnsgdmFsdWU6IGZhbHNlIH0qLyh0aGF0LkRldGFpbER0by5QZXJtaXNzaW9ucyA/IHRoYXQuRGV0YWlsRHRvLlBlcm1pc3Npb25zLkx6ZUV2aWRvdmF0IDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGplbiBuYXN0YXZlbsOtIG9rbmFcclxuICAgICAgICAgICAgdGhpcy5ha3R1YWxpemFjZURldGFpbHUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPYnNsdWhhIHVkw6Fsb3N0aSBidWlsZGVySW5pdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7R29yZGljLkdpbi5EZXRhaWxCdWlsZGVyLkdEZXRhaWxCdWlsZGVyfSBidWlsZGVyIGRldGFpbGJ1aWxkZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25EZXRhaWxCdWlsZGVySW5pdChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGZva3VzIG5hIHBydm7DrSBlZGl0b3ZhdGVsbsOpIHBvbMOtxI1rb1xyXG4gICAgICAgICAgICAvLyBUT0RPOiB0b2hsZSBuZWZ1bmd1amUsIHByb3Rvxb5lIHDFmcOtc3RpdXBub3N0IHBvbMOtIG5hc3RhdnVqaSBhxb4gcG96ZMSbamksIHRhayBqZSB0byDFmWXFoWVubyBhxb4gdiBtZXRvZMSbIHBybyBwb2TDoW7DrSBuZWJvIHDFmWVjaG9kdSBkbyBlZGl0YcSNbsOtaG8gcmXFvmltdVxyXG4gICAgICAgICAgICAvL2J1aWxkZXIuYXV0b2ZvY3VzU2VsZWN0b3IgPSBcIi5nZmllbGQ6bm90KC51aS1zdGF0ZS1kaXNhYmxlZClcIjtcclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluaWNlIGFrY8OtLCB0YWLFrywga3BpLCBtZW51IGFwb2QuXHJcbiAgICAgICAgICAgIGJ1aWxkZXIud2l0aENvbXBvbmVudDx0aGlzPihcImRldGFpbFwiLCB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYWtjZSBwcm8gbWVudWJhclxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFRpc2tQUzogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uVGlzayh7IG5hbWU6IFwiYWN0VGlza1BTXCIsIHRlbWE6IFwic21sX3B0bV96bG5hdlwiLCByZXBvcnRTdGFydGluZzogZnVuY3Rpb24gKHJlcCkgeyByZXR1cm4gdGhhdC5yZXBvcnRTdGFydGluZyhyZXApOyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdE9iY2Vyc3R2ZW5pUFM6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbk9iY2Vyc3R2aXQoeyBydW46IGZ1bmN0aW9uICgpIHsgdGhpcy5zZXRQZW5kaW5nKHRoYXQucmVsb2FkRGF0YSgpKTsgfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAvL2FjdERpYWdub3N0aWthOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25EaWFnbm9zdGlrYSh7IHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmRpYWdub3N0aWthKCk7IH0gfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyB6w6Fsb8W+a292w6kgYWtjZVxyXG4gICAgICAgICAgICAgICAgICAgIGFjdERldGFpbERva2xhZHU6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7IHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmRldGFpbERva2xhZHVTKCk7IH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0RGV0YWlsU3ViamVrdHU6IEdvcmRpYy5Fa28uQWN0aW9uLmFjdGlvbkRldGFpbCh7IHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5kZXRhaWxTdWJqZWt0dSgpKTsgfSB9KSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RBa3Rpdm5pU3ViamVrdHk6IHsgY2FwdGlvbjogXCJKZW4gYWt0aXZuw61cIiwgY2hlY2tlZDogdHJ1ZSwgZW5hYmxlZDogZmFsc2UsIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGF0LmFrdHVhbGl6YWNlU2V6bmFtdVN1Ympla3R1KCk7IH0gfSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RIaXN0b3JpZUlpc3NwOiBHb3JkaWMuRWtvLkFjdGlvbi5hY3Rpb25IaXN0b3JpZSh7IHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5oaXN0b3JpZUlpc3NwKCkpOyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFRlc3RJaXNzcDogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uSGlzdG9yaWUoeyBjYXB0aW9uOiBcIlRlc3QxXCIsIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC50ZXN0SWlzc3AoKSk7IH0gfSksXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0VGVzdElpc3NwMjogR29yZGljLkVrby5BY3Rpb24uYWN0aW9uSGlzdG9yaWUoeyBjYXB0aW9uOiBcIlRlc3QyXCIsIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC50ZXN0SWlzc3AyKCkpOyB9IH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBybyBzdWJ0YXNreVxyXG4gICAgICAgICAgICAgICAgICAgIGFjdFN1YkRva2xhZHlTZXpuYW06IHsgY2FwdGlvbjogXCJTZXpuYW1cIiwgZW5hYmxlZDogdHJ1ZSwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQubG9hZERva2xhZHkoZmFsc2UpOyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYWN0U3ViRG9rbGFkeUthcnR5OiB7IGNhcHRpb246IFwiS2FydHlcIiwgZW5hYmxlZDogdHJ1ZSwgcnVuOiBmdW5jdGlvbiAoKSB7IHRoYXQubG9hZERva2xhZHkodHJ1ZSk7IH0gfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0YWJHcm91cHM6IFtcclxuICAgICAgICAgICAgICAgICAgICBHb3JkaWMuUHJlZmFicy5UYWJHcm91cHMuQWdlbmRhKCksXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJncnBEb2tsYWR5XCIsIGNhcHRpb246IFwiRG9rbGFkeVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogXCJncnBTdWJqZWt0eVwiLCBjYXB0aW9uOiAvKnRoYXQuZ2V0TGFiZWwoXCJncnBTdWJqZWt0eVwiKSAqL1wiU3ViamVrdHlcIi8qLCBiYWRnZTogdGhpcy5CYWRnZVN1Ympla3R5Ki8gfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGlkOiBcImdycERwaFwiLCBjYXB0aW9uOiBcIkRQSFwiLCB2aXNpYmxlOiAvKnRoYXQuZGJwYXJhbXMuc21sX3JhZF9kcGggPiBcIjBcIiovdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6IFwiZ3JwSWlzc3BcIiwgY2FwdGlvbjogXCJJSVNTUFwiLCB2aXNpYmxlOiB0aGF0LkplSWlzc3AgfSxcclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBtZW51QmFyOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RUaXNrUFMqXCIvKnsgYWN0aW9uOiBcImFjdFRpc2taTFwiLCBmYXZvcml0ZTogdHJ1ZSwgYWxpZ246IFwib3Bwb3NpdGVcIiB9Ki8sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3RPYmNlcnN0dmVuaVBTXCJcclxuICAgICAgICAgICAgICAgICAgICAvL1wiYWN0RGlhZ25vc3Rpa2FcIixcclxuICAgICAgICAgICAgICAgICAgICAvL1NtbERldGFpbC5jcmVhdGVNZW51U2hhcmUodGhhdC5JeHApXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgY29tbWFuZEJhcjogW1xyXG4gICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgIHN0YXR1c0JhcjpcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LkplSWlzc3BcclxuICAgICAgICAgICAgICAgICAgICA/IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR29yZGljLkVrby5EZXRhaWwuU3RhdHVzQmFyLmNyZWF0ZUl0ZW0oeyBpZDogXCJzdGF0dXNCYXJTdGF2XCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdvcmRpYy5Fa28uRGV0YWlsLlN0YXR1c0Jhci5jcmVhdGVJdGVtKHsgaWQ6IFwic3RhdHVzQmFyU3RhdlJleklpc3NwXCIgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHb3JkaWMuRWtvLkRldGFpbC5TdGF0dXNCYXIuY3JlYXRlSXRlbSh7IGlkOiBcInN0YXR1c0JhclN0YXZcIiB9KVxyXG4gICAgICAgICAgICAgICAgICAgIF0gICBcclxuICAgICAgICAgICAgICAgICxcclxuICAgICAgICAgICAgICAgIGtwaXM6IHtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0YWJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFiUHJpcGFkU21sOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHrDoWtsYWRuw60gw7pkYWplXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczogeyB0aXRsZTogXCJQxZnDrXBhZCBTTUxcIiwgZ3JvdXA6IEdvcmRpYy5QcmVmYWJzLlRhYkdyb3Vwcy5BZ2VuZGEoKSwgb3BlbmVkOiB0cnVlLCBsb2NrZWQ6IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRvcGxuxJtuw60gcHJ2a8WvIGRvIHRhYnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtUHJpcGFkU21sXCIsIGxheW91dERlc2NyaXB0b3I6IFwiTDFNMVMxXCIvKlwiTDJNMlMxXCIqLyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiUGxhdG5vc3RcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gdXphdsWZZW7DrVwiKS5hZGRGaWVsZChcImdkYXRlYm94XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFNtbC5JbnRlcmZhY2UuR1ByaXBhZFNtbER0b05hbWVzLmRhdF91emF2cmVuaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJEYXR1bSBwbGF0bm9zdGlcIikuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBTbWwuSW50ZXJmYWNlLkdQcmlwYWRTbWxEdG9OYW1lcy5kYXRfcGxhdG5vc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiRGF0dW0gw7rEjWlubm9zdGlcIikuYWRkRmllbGQoXCJnZGF0ZWJveFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBTbWwuSW50ZXJmYWNlLkdQcmlwYWRTbWxEdG9OYW1lcy5kYXRfdWNpbm5vc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkU2VjdGlvbihcIsSMw6FzdGt5XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIkNlbmFcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQ8RGVjaW1hbD4oXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBTbWwuSW50ZXJmYWNlLkdQcmlwYWRTbWxEdG9OYW1lcy5jX21lbmFfZG9jLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNpbWFsczogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbmV3IERlY2ltYWwoMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiUm96cGlzIG5hIHJva3lcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQ8RGVjaW1hbD4oXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBTbWwuSW50ZXJmYWNlLkdQcmlwYWRTbWxEdG9OYW1lcy5jLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNpbWFsczogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1wdHlWYWx1ZTogbmV3IERlY2ltYWwoMCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkUm93KFwiUG9sb8W+a3kgRlBcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQ8RGVjaW1hbD4oXCJnbnVtYmVyYm94XCIsIEdvcmRpYy5QcmVmYWJzLk51bWJlci5jdXJyZW5jeSgpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBTbWwuSW50ZXJmYWNlLkdQcmlwYWRTbWxEdG9OYW1lcy5jX3BvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjaW1hbHM6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IG5ldyBEZWNpbWFsKDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlBvxI1ldCBwb2xvxb5layBGUFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogU21sLkludGVyZmFjZS5HUHJpcGFkU21sRHRvTmFtZXMubnVtX3BvbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRTZWN0aW9uKFwiRmluYW5jb3bDoW7DrVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJPZCwgZG8sIHBvxI1ldCByb2vFr1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZChcImdudW1iZXJib3hcIiwgXCJ3LTRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogU21sLkludGVyZmFjZS5HUHJpcGFkU21sRHRvTmFtZXMuZmluX29kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZEZpZWxkKFwiZ251bWJlcmJveFwiLCBcInctNFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBTbWwuSW50ZXJmYWNlLkdQcmlwYWRTbWxEdG9OYW1lcy5maW5fZG8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYWRkRmllbGQoXCJnbnVtYmVyYm94XCIsIFwidy00XCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG9wbG5pdCBvYnNsdWh1IGRvIGNoYW5nZSBmaW5fb2QgYSBmaW5fZG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFNtbC5JbnRlcmZhY2UuR1ByaXBhZFNtbER0b05hbWVzLm51bV9yb2tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRSb3coXCJDZWxrb3bDoSDEjcOhc3RrYVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZDxEZWNpbWFsPihcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFNtbC5JbnRlcmZhY2UuR1ByaXBhZFNtbER0b05hbWVzLmNfbWVuYSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjaW1hbHM6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtcHR5VmFsdWU6IG5ldyBEZWNpbWFsKDApLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZFJvdyhcIlpiw712w6EgxI1lcnBhdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRGaWVsZDxEZWNpbWFsPihcImdudW1iZXJib3hcIiwgR29yZGljLlByZWZhYnMuTnVtYmVyLmN1cnJlbmN5KCksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFNtbC5JbnRlcmZhY2UuR1ByaXBhZFNtbER0b05hbWVzLmNfZGlzcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWIuZ2Zvcm0oXCJjcmVhdGVGcm9tXCIsIGZvcm0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB0YWJEb2tsYWR5OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRMYXp5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRva2xhZHlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwOiB7IGlkOiBcImdycERva2xhZHlcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9ja2VkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVCYXI6IFtcImFjdERldGFpbERva2xhZHUqXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hxI10ZW7DrSB2YXplYiBkb2tsYWTFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZERva2xhZHkoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdWJ0YXNreSBuYSBkb2tsYWR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRzdWJEb2tsYWR5ID0gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLm5ld0RpdigpLmFwcGVuZFRvKHRhYilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ3N1YnRhc2tzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNhcHRpb246IHRoYXQuYWN0aW9ucy5hY3RTdWJEb2tsYWR5U2V6bmFtIS5jYXB0aW9uLCBhY3Rpb246IHRoYXQuYWN0aW9ucy5hY3RTdWJEb2tsYWR5U2V6bmFtIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGNhcHRpb246IHRoYXQuYWN0aW9ucy5hY3RTdWJEb2tsYWR5S2FydHkhLmNhcHRpb24sIGFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdFN1YkRva2xhZHlLYXJ0eSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUl0ZW06IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiU3ViamVrdHk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3ViamVrdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdExhenk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYlBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IC8qdGhhdC5nZXRMYWJlbChcImdycFN1Ympla3R5XCIpKi9cIlN1Ympla3R5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogeyBpZDogXCJncnBTdWJqZWt0eVwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWN0RGV0YWlsU3ViamVrdHUqXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8YWN0QWt0aXZuaVN1Ympla3R5XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmHEjXRlbsOtIHN1Ympla3TFr1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubG9hZFN1Ympla3R5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHDFmWlkw6Fuw60gZ3JpZHUgbmF2w6F6YW7DvWNoIGRva2xhZMWvIGRvIHRhYnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGdyaWRTdWJqZWt0eSA9ICQubmV3RGl2KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwJVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh0YWIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdncmlkPEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdFeHRlcm5pU3ViamVrdER0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWRTdWJqZWt0eVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBncmlkIGRvZMSbbGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLCAgICAgLy8gZml0IChkZWZhdWx0bmUgYnkgbWVsbyBieXQgdG90byksIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogZG9kxJtsYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbFN1Ympla3R1LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3NlYXJjaENvbHVtbnM6IFtcInZzXCIsIFwiY1wiLCBcInR5cF9hZ1wiLCBcImFjXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb2TEm2xhdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBTbWxHcmlkLkRva2xhZC5jcmVhdGVHcmlkRm9ybWF0U3ViamVrdHkodGhhdC8qLkl4cCovKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFByb2ZpbGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkxpc3Q6IFwidHlwX3ZhemJ5X3R4dCxpY29fZXN1LHJjX2VzdSxpeHNfZXN1X3R4dCxpeHNfZXN1X3phc3RfdHh0LGJ1X2NpLGFjX2VzdSxhY19zbWxcIi5yZXBsYWNlKC9cXC4vZ2ksIEdpbi5XZWJDbGllbnQuR1NoYXJlZElzbC5OYW1lU2VwYXJhdG9yKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29sdW1uTGlzdDogXCJ0eXBfdmF6YnlfdHh0LHN1Ympla3QuaWNvLHN1Ympla3QucmMsaXhzX2VzdV90eHQsaXhzX2VzdV96YXN0X3R4dCxidV9jaV90eHQsYWNfZXN1LGl4cFwiLnJlcGxhY2UoL1xcLi9naSwgR2luLldlYkNsaWVudC5HU2hhcmVkSXNsLk5hbWVTZXBhcmF0b3IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25kRm9ybWF0czpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFa28uR3JpZC5nZXRDb25kRm9ybWF0cyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiBFa28uVXRpbHMuUmVjb3JkRm9ybWF0VHlwZS5TdG9ybm92YW5vLCBvcHRpb25zOiB7IGRlc2NyaXB0aW9uOiBcIk5lYWt0aXZuw60gc3ViamVrdHlcIiwgZm9ybXVsYTogXCJAYWt0aXZpdGEgIT0gezB9XCIuZm9ybWF0KEludGVyZmFjZS5Ba3Rpdml0YS5uZ19ha3RBa3QpIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxBY3RpdmF0ZTogZnVuY3Rpb24gKGV2LCBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIHN0YXZ1IGFrY8OtIHRhYnUgcG9kbGUgYWt0dcOhbG7EmyB2eWJyYW7DqWhvIMWZw6Fka3VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmouY2VsbEluZm8pIHRoYXQuZW5hYmxlU3ViamVrdHkoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplcnNPblRhYjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdGFiRHBoOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERQSFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRQSFwiLCBncm91cDogeyBpZDogXCJncnBEcGhcIiB9LCB2aXNpYmxlOiAvKnRoYXQuZGJwYXJhbXMuc21sX3JhZF9kcGggPiBcIjBcIiovdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9ncm91cDogeyBpZDogXCJncnBEcGhcIiB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0TGF6eTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9iZG9iaURwaFZpZDogR29yZGljLkdpbi5XZWJDbGllbnQuSVJlY2FwUGVyaW9kRFBISW50ZXJ2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGF4UGVyaW9kID0gcGFyc2VEYXRlKHRoYXQuRGV0YWlsRHRvLmRhdF9kcGhfb2QgPz8gdGhhdC5EZXRhaWxEdG8uZGF0X3V6YXZyZW5pID8/IG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Jkb2JpRHBoVmlkID0geyB5ZWFyOiB0YXhQZXJpb2QuZ2V0RnVsbFllYXIoKSwgbW9udGg6IHRheFBlcmlvZC5nZXRNb250aCgpICsgMSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjYXBEcGhPcHRpb25zOiBHb3JkaWMuR2luLldlYkNsaWVudC5JR1JlY2FwQ29uZmlnRHRvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrVmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyaW9kRFBIVmlzaWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jYWxjdWxhdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsQW1vdW50OiBwYXJzZURlY2ltYWwodGhhdC5EZXRhaWxEdG8uY19tZW5hX2RvYyA/PyAwKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXhQZXJpb2Q6IHRheFBlcmlvZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNUeXBlOiBcImdyaWRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZXJpb2REUEg6IG9iZG9iaURwaFZpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpY2VzOiBHb3JkaWMuR2luLldlYkNsaWVudC5VdGlscy5kcGhNb2RlbEFwcGx5KHRoYXQuRGV0YWlsRHRvLCBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvc3ZvYm96ZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY19tZW5hX3pfb3N2XCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLk9zdm9ib3plbm8sIHByaWNlVHlwZTogXCJiYXNlVmFsdWVcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6YW9rcm91aGxlbsOtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY19jX21lbmFfb2tyXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLlphb2tyb3VobGVubywgcHJpY2VUeXBlOiBcInN1bVwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJleiBkYW7Em1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfbWVuYV96X2JkXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLkJlekRhbmUsIHByaWNlVHlwZTogXCJiYXNlVmFsdWVcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB6w6FrbGFkbsOtIHNhemJhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY19tZW5hX3pfbnNcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuWmFrbGFkbmksIHByaWNlVHlwZTogXCJiYXNlVmFsdWVcIiB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY19tZW5hX2RwaF9uc1wiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5aYWtsYWRuaSwgcHJpY2VUeXBlOiBcInRheFwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjX2NfbWVuYV9uc1wiLCB0bzogeyB0YXhUeXBlOiBHb3JkaWMuR2luLldlYkNsaWVudC5FVGF4VHlwZS5aYWtsYWRuaSwgcHJpY2VUeXBlOiBcInN1bVwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBydm7DrSBzbsOtxb5lbsOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY19tZW5hX3pfc3NcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuUHJ2bmlTbml6ZW5hLCBwcmljZVR5cGU6IFwiYmFzZVZhbHVlXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfbWVuYV9kcGhfc3NcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuUHJ2bmlTbml6ZW5hLCBwcmljZVR5cGU6IFwidGF4XCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfY19tZW5hX3NzXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLlBydm5pU25pemVuYSwgcHJpY2VUeXBlOiBcInN1bVwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRydWjDoSBzbsOtxb5lbsOhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGZyb206IFwiY19tZW5hX3pfM3NcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuRHJ1aGFTbml6ZW5hLCBwcmljZVR5cGU6IFwiYmFzZVZhbHVlXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfbWVuYV9kcGhfM3NcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuRHJ1aGFTbml6ZW5hLCBwcmljZVR5cGU6IFwidGF4XCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBmcm9tOiBcImNfY19tZW5hXzNzXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLkRydWhhU25pemVuYSwgcHJpY2VUeXBlOiBcInN1bVwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHTFmWV0w60gc27DrcW+ZW7DoVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogemF0w61tIG5lbsOtIHBvZHBvcmFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8veyBmcm9tOiBcImNfbWVuYV96XzRzXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLlRyZXRpU25pemVuYSwgcHJpY2VUeXBlOiBcImJhc2VWYWx1ZVwiIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8veyBmcm9tOiBcImNfbWVuYV9kcGhfNHNcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuVHJldGlTbml6ZW5hLCBwcmljZVR5cGU6IFwidGF4XCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy97IGZyb206IFwiY19jX21lbmFfNHNcIiwgdG86IHsgdGF4VHlwZTogR29yZGljLkdpbi5XZWJDbGllbnQuRVRheFR5cGUuVHJldGlTbml6ZW5hLCBwcmljZVR5cGU6IFwic3VtXCIgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9DZWxrZW1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgZnJvbTogXCJjX21lbmFfZG9jX3NfZHBoXCIsIHRvOiB7IHRheFR5cGU6IEdvcmRpYy5HaW4uV2ViQ2xpZW50LkVUYXhUeXBlLkRva2xhZENlbGtlbSwgcHJpY2VUeXBlOiBcInN1bVwiIH0gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVjYXBEUEggPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRhYikuZ2NvbnRlbnQoR0NvbnRlbnQuY3JlYXRlSW5pdGlhbGl6ZXIoW0dvcmRpYy5HaW4uV2ViQ2xpZW50LnJlY2FwRFBILCByZWNhcERwaE9wdGlvbnNdKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9oaXN0b3JpZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhpc3RUYWIgPSAkLm5ld0RpdigpLmFwcGVuZFRvKHRhYikuZ3RhYih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSGlzdG9yaWVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ3JpZCA9ICQubmV3RGl2KCkuYXBwZW5kVG8oaGlzdFRhYikuZ2dyaWQoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ3JpZERQSEhpc3RvcmllXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogbmV3IEdvcmRpYy5Jc2wuVmlldzxJbnRlcmZhY2UuR1NtbGhkcGhEdG8+KHRoYXQuaXNsLlNtbGhkcGgubGlzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9zbWxfcHJpOiB0aGF0LkRldGFpbER0by5peHBfc21sX3ByaVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsga2V5OiBbXCJpeHBfc21sX3ByaVwiLCBcImRhdF9kcGhfb2RcIiwgXCJpeHBcIl0gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uTW9kZTogXCJmdWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogU21sR3JpZC5jcmVhdGVIaXN0b3JpZURQSEdyaWRGb3JtYXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHRhYklJU1NQOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElJU1NQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRMYXp5OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIklJU1NQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cDogeyBpZDogXCJncnBJaXNzcFwiIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NrZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdGhhdC5KZUlpc3NwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUJhcjogW1wiYWN0SGlzdG9yaWVJaXNzcCpcIiwgXCJhY3RUZXN0SWlzc3AqXCIsIFwiYWN0VGVzdElpc3NwMipcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2N1c3RvbUxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIC8vIG5hxI10ZW7DrSBkYXQgSUlTU1BcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIHRoYXQubG9hZElpc3NwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5hc3RhdmVuw60ga3BpcGFuZWx1XHJcbiAgICAgICAgICAgICQuZXh0ZW5kKGJ1aWxkZXIua3BpUGFuZWxPcHRpb25zLCB7IHNvcnRhYmxlOiB0cnVlIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2JzbHVoYSB1ZMOhbG9zdGkgYnVpbGRlckJ1aWxkXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXJ9IGJ1aWxkZXIgZGV0YWlsYnVpbGRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkRldGFpbEJ1aWxkZXJCdWlsZChidWlsZGVyOiBHb3JkaWMuR2luLkRldGFpbEJ1aWxkZXIuR0RldGFpbEJ1aWxkZXIpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG5hcG9qZW7DrSBzdGFuZGFyZG7DrSBFS08gaGxhdmnEjWt5XHJcbiAgICAgICAgICAgIC8vIMO6cHJhdmEgdMWZZXTDrSBzZWtjZSAocG9sb8W+a3kgYSBzdGF2IG3DrXN0byBrb21wZXRlbnRhIGEgcmVhbGl6w6F0b3JhKVxyXG4gICAgICAgICAgICBjb25zdCBmb3JtU2V0dXAgPSB7fTtcclxuICAgICAgICAgICAgLy9jb25zdCBoZWFkZXJGb3JtID0gbmV3IEdvcmRpYy5Gb3Jtcy5Gb3JtKHsgbmFtZTogXCJmb3JtSGVhZGVyXCIgfSlcclxuICAgICAgICAgICAgLy8gICAgLmFkZFNlY3Rpb24oKVxyXG4gICAgICAgICAgICAvLyAgICAvLyBUT0RPOiB0ZXh0IGRvIHJlc291cmNlXHJcbiAgICAgICAgICAgIC8vICAgIC5hZGRSb3coXCJTdGF2XCIpLmFkZEZpZWxkKFwiZ3NlbGVjdGJveFwiLCBHb3JkaWMuUHJlZmFicy5TZWxlY3QuYnVjY2J2eVpMKCksIHsgZGlzYWJsZWQ6IHRydWUsIGRyb3Bkb3duOiB0cnVlLCBuYW1lOiBcInNfYnZ5XCIsIG1vZGVsOiBcInNfYnZ5PXNfYnZ5XCIgfSk7XHJcbiAgICAgICAgICAgIC8vZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5TZWN0aW9ucy5EYXRhMl0gPSB7XHJcbiAgICAgICAgICAgIC8vICAgIHJvd3M6IFtcclxuICAgICAgICAgICAgLy8gICAgICAgIGJ1aWxkZXIuZ2V0RGVmaW5pdGlvbihHb3JkaWMuRWtvLkhlYWRlckZvcm0uUm93cy5acHJhY292YXRlbClbMF0/Lml0ZW0sIC8vIHpwcmFjb3ZhdGVsXHJcbiAgICAgICAgICAgIC8vICAgICAgICBoZWFkZXJGb3JtIS5mb3JtIS5zZWN0aW9ucyFbMF0ucm93cyFbMF0sIC8vIHBvbG/Fvmt5XHJcbiAgICAgICAgICAgIC8vICAgICAgICBoZWFkZXJGb3JtIS5mb3JtIS5zZWN0aW9ucyFbMF0ucm93cyFbMV0gLy8gc3RhdlxyXG4gICAgICAgICAgICAvLyAgICBdXHJcbiAgICAgICAgICAgIC8vfSBhcyBGb3Jtcy5Gb3JtU2VjdGlvbjtcclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5TZWN0aW9ucy5JbmZvXSA9IHtcclxuICAgICAgICAgICAgICAgIHJvd3M6IFtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZGVyLmdldERlZmluaXRpb24oR29yZGljLkVrby5IZWFkZXJGb3JtLlJvd3MuSWQpWzBdPy5pdGVtLFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkZXIuZ2V0RGVmaW5pdGlvbihHb3JkaWMuRWtvLkhlYWRlckZvcm0uUm93cy5BZ2VuZG92ZUNpc2xvKVswXT8uaXRlbVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9IGFzIEZvcm1zLkZvcm1TZWN0aW9uO1xyXG4gICAgICAgICAgICBmb3JtU2V0dXBbR29yZGljLkVrby5IZWFkZXJGb3JtLlNlY3Rpb25zLkRhdGExXSA9IHtcclxuICAgICAgICAgICAgICAgIHJvd3M6IFtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZGVyLmdldERlZmluaXRpb24oR29yZGljLkVrby5IZWFkZXJGb3JtLlJvd3MuVHlwRG9rbGFkdSlbMF0/Lml0ZW1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSBhcyBGb3Jtcy5Gb3JtU2VjdGlvbjtcclxuICAgICAgICAgICAgZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5TZWN0aW9ucy5EYXRhMl0gPSB7XHJcbiAgICAgICAgICAgICAgICByb3dzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRlci5nZXREZWZpbml0aW9uKEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5Sb3dzLktvbXBldGVudClbMF0/Lml0ZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRlci5nZXREZWZpbml0aW9uKEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5Sb3dzLlJlYWxpemF0b3IpWzBdPy5pdGVtXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybVNlY3Rpb247XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLklkXSA9IHsgb3B0aW9uczogeyBtb2RlbDogXCJpeHBfc21sX3ByaVwiIH0gfSBhcyBGb3Jtcy5Gb3JtRmllbGQ7XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLkFnZW5kb3ZlQ2lzbG9dID0geyBvcHRpb25zOiB7IG1vZGVsOiBcImFjX3NtbFwiIH0gfSBhcyBGb3Jtcy5Gb3JtRmllbGQ7XHJcbiAgICAgICAgICAgIC8vIGppbsO9IHByZWZhYiBwcm8ga25paHVcclxuICAgICAgICAgICAgLy8gVE9ETzogcG8gZG/FmWXFoWVuw60ga25paHkgbmVjaGF0IGplbiBzcHLDoXZub3UgdmFyaWFudHUgKGJ1xI8gbmVqZMWZw612ZSBwcmVmYWIgbmVibyBuZWpkxZnDrXZlIHBhcmFtZXRyeSlcclxuICAgICAgICAgICAgLy9mb3JtU2V0dXBbR29yZGljLkVrby5IZWFkZXJGb3JtLkZpZWxkcy5LbmloYV0gPSB7IG9wdGlvbnM6ICQuZXh0ZW5kKHsgbW9kZWw6IFwiaXhwX2Rlbj1peHBfZGVuXCIsIHNlcnZlckZpbHRlcnM6IHsga3RnX2RlbjogW0dvcmRpYy5TbWwuR2xvYmFscy5FbnVtcy5LdGdEZW4uWmFwb2N0b3ZlTGlzdHldLCB0eXBfYWc6IEdvcmRpYy5TbWwuR2xvYmFscy5FbnVtcy5UeXBBZy5CVUMsIHJvazogdGhhdC5Sb2sgfSwgfSwgR29yZGljLlByZWZhYnMuU2VsZWN0LmVrb3NkZW4oKSkgfSBhcyBGb3Jtcy5Gb3JtRmllbGQ7XHJcbiAgICAgICAgICAgIC8vZm9ybVNldHVwW0dvcmRpYy5Fa28uSGVhZGVyRm9ybS5GaWVsZHMuS25paGFdID0geyBvcHRpb25zOiAkLmV4dGVuZChHb3JkaWMuUHJlZmFicy5TZWxlY3QuZWtvc2RlbihHb3JkaWMuU21sLkdsb2JhbHMuRW51bXMuVHlwQWcuU01MKSwgeyBtb2RlbDogXCJpeHBfZGVuPWl4cF9kZW5cIiwgc2VydmVyRmlsdGVyczogeyBrdGdfZGVuOiBbdGhhdC5LdGdEZW5dLCB0eXBfYWc6IEdvcmRpYy5TbWwuR2xvYmFscy5FbnVtcy5UeXBBZy5GVUMsIHJvazogdGhhdC5Sb2sgfSwgfSkgfSBhcyBGb3Jtcy5Gb3JtRmllbGQ7XHJcbiAgICAgICAgICAgIGZvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLlR5cERva2xhZHVdID0ge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGZsYWc6IEdvcmRpYy5QcmVmYWJzLkZpZWxkLkZsYWdzLnJlcXVpcmVkLFxyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsOiBcIml4c190eXA9aXhzX3R5cDtpeHNfdHlwX3R4dD1uYXpldjtrdGdfdHlwPWt0Z190eXBcIixcclxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJGaWx0ZXJzOiB7IGt0Z190eXA6IHRoYXQuS3RnVHlwIH0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gYXMgRm9ybXMuRm9ybUZpZWxkO1xyXG4gICAgICAgICAgICBmb3JtU2V0dXBbR29yZGljLkVrby5IZWFkZXJGb3JtLkZpZWxkcy5EYXR1bUV2aWRlbmNlXSA9IHsgb3B0aW9uczogeyBtb2RlbDogXCJkYXRfcHJpal9wb2RcIiwgdmFsdWVUeXBlOiBcImRhdGVcIiB9IH0gYXMgRm9ybXMuRm9ybUZpZWxkO1xyXG4gICAgICAgICAgICAvL2Zvcm1TZXR1cFtHb3JkaWMuRWtvLkhlYWRlckZvcm0uRmllbGRzLlpwcmFjb3ZhdGVsXSA9IHsgb3B0aW9uczogeyBtb2RlbDogXCJpeHNfZnVuX2FrdD1peHNfZnVuO2l4c19mdW5fdHh0PW5hemV2O2l4c19mdW5fcmVmX3R4dD1uYXpldl9yZWY7aXhzX2Z1bl9zdV90eHQ9bmF6ZXZfc3VcIiB9IH0gYXMgRm9ybXMuRm9ybUZpZWxkO1xyXG4gICAgICAgICAgICBmb3JtU2V0dXBbR29yZGljLkVrby5IZWFkZXJGb3JtLkZpZWxkcy5Qb3Bpc10gPSB7IG9wdGlvbnM6IEVrby5EZXRhaWwuRmllbGQuZ2V0Q291bnRlck9wdGlvbnMoU21sLkludGVyZmFjZS5HUHJpcGFkU21sRHRvVHlwZUxlbmd0aHMucG9waXMpIH0gYXMgRm9ybXMuRm9ybUZpZWxkO1xyXG4gICAgICAgICAgICAvLyBqaW7DvSBsYWJlbCBwcm8gZGF0dW1cclxuICAgICAgICAgICAgLy9mb3JtU2V0dXBbR29yZGljLkVrby5IZWFkZXJGb3JtLlJvd3MuRGF0dW1FdmlkZW5jZV0gPSB7IGxhYmVsOiBcIkRhdHVtIFXDmlBcIiB9IGFzIEZvcm1zLkZvcm1Sb3c7XHJcblxyXG4gICAgICAgICAgICAvLyBha3R1YWxpemFjZSBobGF2acSNa3lcclxuICAgICAgICAgICAgR29yZGljLkVrby5IZWFkZXJGb3JtLnNldHVwKGJ1aWxkZXIsIGZvcm1TZXR1cCk7XHJcblxyXG4gICAgICAgICAgICAvLyDDunByYXZhIFdGTC9TU0wga29tcG9uZW50XHJcbiAgICAgICAgICAgIEVrby5EZXRhaWwuY2hhbmdlRGV0YWlsQnVpbGRlcldmbEZvckVrb0RlZmluaXRpb25zKGJ1aWxkZXIsIHRoaXMuRGV0YWlsRHRvPy5KZVBvZGFuID8/IGZhbHNlLyosIFwibWVudVRpc2taTFwiKi8pO1xyXG5cclxuICAgICAgICAgICAgLy8gxaFpcGt5IHBybyBwb3N1biBwbyBzZXpuYW11XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5EZXRhaWxEdG8/LkplUG9kYW4pIHRoaXMubGlzdENvbnRyb2xzX3NldHVwKHtcclxuICAgICAgICAgICAgICAgIHJvd1RvRHRvOiBmdW5jdGlvbiAoZ3JpZFN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5ncGMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cFNtbFByaTogZ3JpZFN0YXRlLmN1cnJlbnRSb3cuZGF0YS5peHBfc21sX3ByaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5hc2xlZHVqaWNpRGV0YWlsOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG5leHRJdGVtVGVtcGxhdGU6IFwiTsOhc2xlZHVqw61jw606IHtpeHBfc21sX3ByaX0gPGJyPiB7YWNfc21sOnRyaW19IDxicj4ge3BvcGlzOnRyaW06ZW5jb2RlfVwiLFxyXG4gICAgICAgICAgICAgICAgcHJldkl0ZW1UZW1wbGF0ZTogXCJQxZllZGNob3rDrToge2l4cF9zbWxfcHJpfSA8YnI+IHthY19zbWw6dHJpbX0gPGJyPiB7cG9waXM6dHJpbTplbmNvZGV9XCIsXHJcbiAgICAgICAgICAgICAgICBiZWZvcmVNb3ZlOiB0aGF0LmNsb3NpbmdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPYnNsdWhhIGFrdGl2bsOtIG9wZXJhY2VcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeS5FdmVudH0gZXYgdWTDoWxvc3RcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gY3R4PyBwxa92b2Ruw60gdWTDoWxvc3QgYSBqZWrDrSBhcmd1bWVudHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgb25EZXRhaWxCdWlsZGVyQWN0aXZlT3AoZXY6IEpRdWVyeS5FdmVudCwgY3R4PzogYW55KTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXrDrSBkZXRhaWwgZG9rbGFkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpeHAgUElEIGRva2xhZHVcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkZXRhaWxEb2tsYWR1SyhpeHA6IHN0cmluZyk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKGl4cCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmlzbC5Eb2tsYWRTbWwucmVhZCh7IGl4cDogaXhwIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRldGFpbERva2xhZHUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuICQuRGVmZXJyZWQoKS5yZWplY3QoKS5wcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBab2JyYXrDrSBkZXRhaWwgZG9rbGFkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpeHAgUElEIGRva2xhZHVcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBkZXRhaWxEb2tsYWR1UygpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCBha3RSYWRlayA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG8+KHRoaXMuJGdyaWREb2tsYWR5Uyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXRhaWxEb2tsYWR1KGFrdFJhZGVrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhesOtIGRldGFpbCB6YWRhbsOpaG8gZG9rbGFkdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhIGRhdGEgZG9rbGFkdVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGRldGFpbERva2xhZHUoZGF0YTogR29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0byB8IG51bGwpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhPy5peHAgJiYgZGF0YT8uaXhwX2Rlbikge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHDFmcOtem5hayBha3Rpdm7DrSBvcGVyYWNlXHJcbiAgICAgICAgICAgICAgICBsZXQgbmVlZFJlZnJlc2ggPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBvdGV2xZllbsOtIGRldGFpbHVcclxuICAgICAgICAgICAgICAgIGxldCBkZXRhaWxJRCA9IFNtbEdyaWQuZ2V0RGV0YWlsSWQoZGF0YSwgeyBrdGdfdHlwOiBkYXRhLmt0Z190eXBfbmFkX3ByID8/IGRhdGEua3RnX3R5cF9uYWQgfSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgJGRldGFpbFdpbmRvdyA9IHRoYXQubmF2aWdhdGUoXHJcbiAgICAgICAgICAgICAgICAgICAgW1wiR29yZGljLlNtbC5XZWJDbGllbnQuR1wiICsgZGV0YWlsSUQsIHsgZ3BjOiBHb3JkaWMuRWtvLlV0aWxzLmNyZWF0ZUJvb2tHcGModGhhdC5ncGMsIGRhdGEuaXhwX2RlbikgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRDogZGV0YWlsSUQgKyAnIycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogZGF0YS5peHAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IGplIHBvdMWZZWJhIEl4cERlbiwga2R5xb4gamUgdG8gdiBncGM/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEl4cERlbjogZGF0YS5peHBfZGVuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBvYnNsdWhhIGFrdGl2bsOtIG9wZXJhY2UgbmEgZGV0YWlsdVxyXG4gICAgICAgICAgICAgICAgJC5jb250ZW50KCRkZXRhaWxXaW5kb3cpLm9uKFNtbERldGFpbC50cmlnZ2VyQ2hhbmdlLCAocmV0VmFsOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB6w6F6bmFtIGJ5bCB6bcSbbsSbLCBtdXPDrSBzZSBuYcSNw61zdCB6bm92dVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXRWYWw/LmRhdGE/Lml4cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBidWRlIHNlIG9ixI1lcnN0dm92YXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVlZFJlZnJlc2ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG9ic2x1aGEgdWtvbsSNZW7DrSBva25hXHJcbiAgICAgICAgICAgICAgICAkZGV0YWlsV2luZG93Lm9uKFwiY2xvc2VkXCIsIChyZXRWYWw6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIGRldGFpbHUgKGJ5bGEtbGkgYWt0aXZuw60gb3BlcmFjZSB2IG90ZXbFmWVuw6ltIGRldGFpbHUpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5lZWRSZWZyZXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0QWN0aXZlT3BlcmF0aW9uQW5kUmVsb2FkRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkZGV0YWlsV2luZG93LmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRlc3RcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSB0ZXN0SWlzc3AoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZShbR29yZGljLklpc3NwLldlYkNvbnRyb2xzLkdJaXNzcFJlekhpc3RvcnksIHsgdWlkOiBcIkdJaXNzcFJlekhpc3RvcnkjXCIgfV0sIHtcclxuICAgICAgICAgICAgICAgIGl4c19ocHI6IHRoaXMuRGV0YWlsRHRvLml4cF9zbWxfcHJpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY3JlYXRlRGlhbG9nUHJvbWlzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHRlc3RJaXNzcDIoKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYXZpZ2F0ZShbR29yZGljLklpc3NwLldlYkNvbnRyb2xzLkdJaXNzcFJlekRldGFpbEV4dCwgeyB1aWQ6IFwiR0lpc3NwUmV6RGV0YWlsRXh0I1wiIH1dLCB7XHJcbiAgICAgICAgICAgICAgICBpeHNfaHByOiB0aGlzLkRldGFpbER0by5peHBfc21sX3ByaVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNyZWF0ZURpYWxvZ1Byb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuw60gaGlzdG9yaWUgdm9sw6Fuw60gSUlTU1BcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBoaXN0b3JpZUlpc3NwKCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdmlnYXRlKFtHb3JkaWMuSWlzc3AuV2ViQ29udHJvbHMuR0lpc3NwUmV6V3NDYWxsSGlzdG9yeSwgeyB1aWQ6IFwiR0lpc3NwUmV6V3NDYWxsSGlzdG9yeSNcIiB9XSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGl4c19ocHI6IHRoaXMuRGV0YWlsRHRvLml4cF9zbWxfcHJpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jcmVhdGVEaWFsb2dQcm9taXNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWcsOhdMOtIHN0cnVrdHVydSB2YXplYiBkb2tsYWTFr1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGdldERva2xhZHkoKTogSlF1ZXJ5LlByb21pc2U8U21sLkludGVyZmFjZS5HRG9rbGFkU21sRHRvW10gfCB1bmRlZmluZWQ+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmVnaW5PcGVyYXRpb24oXCJqcmVzOjI0MTAwMDc2XCIpOyAvL1JDIDI0MTAwMDc2IDogUHJvYsOtaMOhIG5hxI10ZW7DrSB2YXplYiBkb2tsYWTFryBwxZnDrXBhZHVcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGF0LmRhdGFOYXZEb2tsYWR5ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQuZGF0YU5hdkRva2xhZHk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhhdC5pc2wuRG9rbGFkU21sLmxpc3REb2tsYWR5UHJpcGFkdShycSA9PiB7IHJldHVybiB7IGZpbHRlcnM6IHsgaXhwX3NtbF9wcmk6IHRoYXQuRGV0YWlsRHRvLml4cF9zbWxfcHJpIH0gfTsgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXREYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhOiBTbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG9bXSB8IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVsb8W+ZW7DrSBkYXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5kYXRhTmF2RG9rbGFkeSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlICQuRGVmZXJyZWQoKS5yZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuYWx3YXlzKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuZE9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYcSNdGVuw60gc3RydWt0dXJ5IHZhemViIGRva2xhZMWvIGEgem9icmF6ZW7DrSB2IHBvxb5hZG92YW7DqSBwb2RvYsSbXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSBrYXJ0eSB0eXAgem9icmF6ZW7DrSAodHJ1ZSA9IGthcnR5LCBmYWxzZSA9IHNlem5hbSlcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBsb2FkRG9rbGFkeShrYXJ0eTogYm9vbGVhbik6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgLy8gb2RzdHJhbsSbbsOtIHDFr3ZvZG7DrWNoIG9ic2Foxa8gesOhbG/Fvmt5XHJcbiAgICAgICAgICAgIGlmICh0aGF0LiRncmlkRG9rbGFkeVMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhhdC4kZ3JpZERva2xhZHlTLmdncmlkKFwiZGVzdHJveVwiKTtcclxuICAgICAgICAgICAgICAgIHRoYXQuJGdyaWREb2tsYWR5UyA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoYXQuJHBpY2tEb2tsYWR5SyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRwaWNrRG9rbGFkeUsuZW1wdHkoKTsvLy5nY29udGVudHBpY2tlcihcImRlc3Ryb3lcIik7XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRwaWNrRG9rbGFkeUsgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoa2FydHkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBrYXJ0eVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIHBvbW9jbsOpIG1ldG9keVxyXG4gICAgICAgICAgICAgICAgbGV0IGdldE1lbnVQYXJhbXNEYXRhID0gZnVuY3Rpb24gKGRhdGE6IEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG8pOiBNZW51UGFyYW1zIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogZGF0YS5peHAhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImFjdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0aW9uOiAoZGF0YS5rdGdfdHlwX3R4dCA/PyBkYXRhLml4c190eXBfdHh0ID8/IFwiRG9rbGFkXCIpICsgXCI8YnI+XCIgKyAoZGF0YS5hY19zbWwgPz8gZGF0YS5peHAhKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcDogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogdG9obGUgdWTEm2xhdCBzdGVqbsOpIGpha28gdiBLUEkgbmEgZGV0YWlsdSBkb2tsYWR1IC0gcG9rdWQgYnkgdG8gesWvc3RhbG8sIHRhayBuYSB0byB1ZMSbbGF0IHNwb2xlxI1ub3UgbWV0b2R1IChhbGUgbmEgZGV0YWlsdSBkb2tsYWR1IGJvaHXFvmVsIG5lYnVkdSBtw610IG1vYyBkYXQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInswfTogezF9IFwiLmZvcm1hdChcIklkZW50aWZpa8OhdG9yXCIsIGRhdGEuaXhwISksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInswfTogezF9IFwiLmZvcm1hdChcIkFnZW5kb3bDqSDEjcOtc2xvXCIsIGRhdGEuYWNfc21sID8/IFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ7MH06IHsxfSBcIi5mb3JtYXQoXCJFdmlkZW7EjW7DrSDEjcOtc2xvXCIsIGRhdGEuYWMgPz8gXCJcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ7MH06IHsxfSBcIi5mb3JtYXQoXCJUeXAgZG9rbGFkdVwiLCBkYXRhLml4c190eXBfdHh0ID8/IFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9cInswfTogezF9IFwiLmZvcm1hdChcIkthdGVnb3JpZSB0eXB1IGRva2xhZHVcIiwgZGF0YS5rdGdfdHlwX3R4dCA/PyBcIlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vXCJ7MH06IHsxfSBcIi5mb3JtYXQoXCJLdGdTbWxcIiwgZGF0YS5rdGdfc21sPy50b1N0cmluZygpKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInswfTogezF9IFwiLmZvcm1hdChcIlBvcGlzXCIsIGRhdGEucG9waXMgPz8gXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgXS5qb2luKFwiPGJyPlwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogZGF0YS5rdGdfdHlwID09PSBTbWwuR2xvYmFscy5FbnVtcy5LdGdUeXAuRG9kYXRla1NtbG91dnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlrb25hIHBybyBkb2RhdGt5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiZ2ktcGFwZXJ8Z2ktcGFwZXIgZ2ktc3RhY2stcG9zLS1yYlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpa29uYSBwcm8gb3N0YXRuw60gZG9rbGFkeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcImdpLXBhcGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHQWN0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFjdERldGFpbERva2xhZHVcIiArIGRhdGEuaXhwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bjogZnVuY3Rpb24gKCkgeyB0aGlzLnNldFBlbmRpbmcodGhhdC5kZXRhaWxEb2tsYWR1SyhkYXRhLml4cCEpKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IGFwcGVuZFRvQ2hpbGRyZW4gPSBmdW5jdGlvbiAocGFyYW1zOiBNZW51UGFyYW1zW10sIGRhdGE6IEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdEb2tsYWRTbWxEdG8pOiB2b2lkIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IGRhdGEuaXhwX25hZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2hpbGRyZW4gPT0gbnVsbCkgaXRlbS5jaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jaGlsZHJlbi5wdXNoKGdldE1lbnVQYXJhbXNEYXRhKGRhdGEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpdGVtLmNoaWxkcmVuKSBhcHBlbmRUb0NoaWxkcmVuKGl0ZW0uY2hpbGRyZW4sIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIHZ5dHZvxZllbsOtIGEgbmFwbG7Em27DrSBrYXJldFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RG9rbGFkeSgpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcMWZZXZvZCBzZXpuYW11IGRvIHN0cnVrdHVyeSBwcm8gZ2NvbnRlbnRwaWNrZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRyZWVQYXJhbXMgPSBuZXcgQXJyYXk8TWVudVBhcmFtcz4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaChkYXRhMSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGExLml4cCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YTEuaXhwX25hZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdm5vxZllbsO9IGRva2xhZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kVG9DaGlsZHJlbih0cmVlUGFyYW1zLCBkYXRhMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBobGF2bsOtIGRva2xhZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJlZVBhcmFtcy5wdXNoKGdldE1lbnVQYXJhbXNEYXRhKGRhdGExKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJlZVBhcmFtcztcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICh0cmVlUGFyYW1zOiBNZW51UGFyYW1zW10pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdnl0dm/FmWVuw60gY29udGVudHBpY2tlcnVcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kcGlja0Rva2xhZHlLID0gJC5uZXdEaXYoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKHRoYXQuJHN1YkRva2xhZHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2NvbnRlbnRwaWNrZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogdHJlZVBhcmFtc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWt0dWFsaXphY2Ugb2tuYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHNlem5hbVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGRlZmluaWNlIGdyaWR1XHJcbiAgICAgICAgICAgICAgICB0aGF0LiRncmlkRG9rbGFkeVMgPSAkLm5ld0RpdigpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNzcyhcImhlaWdodFwiLCBcIjEwMCVcIilcclxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8odGhhdC4kc3ViRG9rbGFkeSlcclxuICAgICAgICAgICAgICAgICAgICAuZ2dyaWQ8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0bz4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdyaWREb2tsYWR5U1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBncmlkIGRvZMSbbGF0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbk1vZGU6IFwiZnVsbFwiLCAgICAgLy8gZml0IChkZWZhdWx0bmUgYnkgbWVsbyBieXQgdG90byksIGZ1bGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEFjdGlvbjogdGhhdC5hY3Rpb25zLmFjdERldGFpbERva2xhZHUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VhcmNoQ29sdW1uczogW1widnNcIiwgXCJjXCIsIFwidHlwX2FnXCIsIFwiYWNcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFNtbEdyaWQuRG9rbGFkLmNyZWF0ZUdyaWRGb3JtYXQodGhhdCwgdHJ1ZSwgdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRQcm9maWxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5MaXN0OiBcIml4cCxpeHBfbmFkLGl4cF9kZW5fdHh0LHNtbF9zdGF2X3prcixhY19zbWwsYWMsZGF0X2V2aWQsc3ViamVrdC5pY28sc3ViamVrdC5uYXpldixtZW5hX3prcixjX21lbmFfZG9jLGNfbWVuYSxpeHNfdHlwX3R4dCxwb3BpcyxpeHBfc21sX3ByaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZEZvcm1hdHM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRWtvLkdyaWQuZ2V0Q29uZEZvcm1hdHMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdHlwZTogRWtvLlV0aWxzLlJlY29yZEZvcm1hdFR5cGUuVnlyYXplbm8sIG9wdGlvbnM6IHsgZGVzY3JpcHRpb246IFwiRG9rbGFkeSBqaW7DqWhvIHDFmcOtcGFkdSBwxZnDrXBhZHVcIiwgZm9ybXVsYTogXCJOT1QoRVFVQUxTKEBpeHBfc21sX3ByaSwnezB9JykpXCIuZm9ybWF0KHRoYXQuSXhwU21sUHJpKSB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmdhdXRvZml0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzaXplcnNPblRhYjogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBuYXBsbsSbbsOtIHNlem5hbXVcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldERva2xhZHkoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvaGxlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGEsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJpeHBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3NvcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlOiBuZXcgR29yZGljLkRhdGEuVHJlZShHb3JkaWMuRGF0YS5UcmVlLnBhcmVudElkT3JnYW5pemVyKFwiaXhwX25hZFwiKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9maWx0ZXJLZWVwU3RydWN0dXJlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFN0YXRlOiBcIm9wZW5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hc3RhdmVuw60gZGF0IGEgcMWZZWtyZXNsZW7DrSBncmlkdVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkRG9rbGFkeVM/LmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBha3R1YWxpemFjZSBva25hXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpvYnJhemVuw60gZGV0YWlsdSBzdWJqZWt0dVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGRldGFpbFN1Ympla3R1KCk6IEpRdWVyeS5Qcm9taXNlPGFueT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuJGdyaWRTdWJqZWt0eSkge1xyXG4gICAgICAgICAgICAgICAgLy8gem9icmF6ZW7DrSBkZXRhaWx1XHJcbiAgICAgICAgICAgICAgICBsZXQgYWt0U3ViamVrdCA9IEdvcmRpYy5Fa28uR3JpZC5jdXJyZW50Um93PEdvcmRpYy5TbWwuSW50ZXJmYWNlLkdTdWJqZWt0RG9rbGFkdVNtbER0bz4odGhpcy4kZ3JpZFN1Ympla3R5KTtcclxuICAgICAgICAgICAgICAgIGlmIChha3RTdWJqZWt0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEdvcmRpYy5Fc3UuRGlhbG9ncy5EZXRhaWxFc3VEbGcoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4c0VzdTogYWt0U3ViamVrdC5peHNfZXN1ID8/IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBVY2VsOiBFc3UuR2xvYmFscy5FbnVtcy5UeXBab2JyYXplbmkuRGV0YWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTG9nb3Zhbmk6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb8WZZcWhaXQgbG9nb3ZhY8OtIMO6ZGFqZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEl4cDogdGhhdC5JeHBTbWxQcmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRHV2b2RIbGVkYW5pOiBHb3JkaWMuR2luLkdsb2JhbHMuRW51bXMuRHV2b2RIbGVkYW5pRXN1LnphZGFuaU9kZXNpbGF0ZWxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFrdFpuYWNrYTogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0dvcmRpYy5HbG9iYWwuRW51bXMuTW9kT3RldnJlbmkuc2hvd01vZGFsV2luZG93XHJcbiAgICAgICAgICAgICAgICAgICAgKSEuY3JlYXRlRGlhbG9nUHJvbWlzZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGFrdHVhbGl6YWNlIHNlem5hbXUgc3ViamVrdMWvIHMgb2JzbHVob3UgYWtjZSBcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHphRG9rbGFkIChkZWZhdWx0ID0gZmFsc2UpIHp2b2xlbsOhIGFrY2UgLSB0cnVlID0gYWtjZSB6YSBkb2tsYWQsIGZhbHNlID0gYWtjZSBqZW4gYWt0aXZuw61cclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZSBzIG9wZXJhY8OtXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBha3R1YWxpemFjZVNlem5hbXVTdWJqZWt0dSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRncmlkU3ViamVrdHkpIHtcclxuICAgICAgICAgICAgICAgIC8vIGZpbHRyIG5hIGFrdGl2bsOtIC8gdsWhZWNobnkgesOhem5hbXlcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvxZllxaFpdCB2emhsZWQgdGxhxI3DrXRrYSAodGV4dHksIGlrb255LCBzdGF2IGNoZWNrZWQsIC4uLilcclxuICAgICAgICAgICAgICAgIC8vIGFrY2UgSmVuIGFrdGl2bsOtXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGlvbnMuYWN0QWt0aXZuaVN1Ympla3R5IS51cGRhdGUoeyBjaGVja2VkOiAhdGhpcy5hY3Rpb25zLmFjdEFrdGl2bmlTdWJqZWt0eSEuY2hlY2tlZCgpIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoYXQubG9hZFN1Ympla3R5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gJC5EZWZlcnJlZCgpLnJlamVjdCgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE5haHLDoW7DrSBhIHpvYnJhemVuw60gc3ViamVrdMWvXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFuIHwgdW5kZWZpbmVkIHwgbnVsbH0gY29uZCBwb2Rtw61ua2EsIG1hasOtLWxpIGLDvXQgZGF0YSBuYcSNdGVuYVxyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBmaWx0ZXJzIGZpbHRyeSBwcm8gbWV0b2R1IGxpc3RcclxuICAgICAgICAgKiBAcGFyYW0ge0pRdWVyeTxIVE1MRWxlbWVudD59ICRncmlkIGdyaWQsIHZlIGt0ZXLDqW0gbWFqw60gYsO9dCBkYXRhIHpvYnJhemVuYVxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnkuUHJvbWlzZTxhbnk+fSBwcm9taXNlIHMgb3BlcmFjw61cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGxvYWRTdWJqZWt0eSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIG5hxI10ZW7DrSBzdWJqZWt0xa9cclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuaXNsLkRva2xhZFNtbC5saXN0U3ViamVrdHUocnEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl4cF9zbWxfcHJpOiB0aGlzLkRldGFpbER0by5peHBfc21sX3ByaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWt0aXZpdGE6IHRoaXMuYWN0aW9ucy5hY3RBa3Rpdm5pU3ViamVrdHkhLmNoZWNrZWQoKSA9PT0gdHJ1ZSA/IEludGVyZmFjZS5Ba3Rpdml0YS5uZ19ha3RBa3QgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmdldERhdGEoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwb2hsZWRcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdmlldyA9IG5ldyBHb3JkaWMuRGF0YS5WaWV3KGRhdGEsIHsga2V5OiBcIml4cF9zbWxfcHJpLGl4c19lc3VcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGRhdCBhIHDFmWVrcmVzbGVuw60gZ3JpZHVcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRncmlkU3ViamVrdHkhLmdncmlkKFwic2V0RGF0YVwiLCB2aWV3KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGFrdHVhbGl6YWNlIG9rbmFcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBOYXN0YXZlbsOtIHBydmvFryB2ZSBmb3JtdWzDocWZaVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgZW5hYmxlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gcHJ2a3lcclxuICAgICAgICAgICAgY29uc3QgcGVybXMgPSB0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucztcclxuICAgICAgICAgICAgLy8vLyBUT0RPOiBqZSBwb3TFmWViYSByb3psacWhb3ZhdCBkdsSbIHDFmcOtc3R1cG5vc3RpPyBub3bEmyBqZSB0b3Rpxb4gbmFwxZkuIHBvcGlzIHRha8OpIHYgaGxhdmnEjWNlXHJcbiAgICAgICAgICAgIC8vLy8gVE9ETzogZG/FmWXFoWl0IGVkaXRhxI1uw60gcmXFvmltXHJcbiAgICAgICAgICAgIC8vY29uc3QgbF9iRGlzYWJsZUhlYWRlckl0ZW1zID0gIVNtbERldGFpbC5Db252ZXJ0UGVybWlzc2lvblRvQm9vbCh0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucyA/IHsgdmFsdWU6IHRydWUgfS8qdGhpcy5EZXRhaWxEdG8uUGVybWlzc2lvbnMuTHplRXZpZG92YXQqLyA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIC8vY29uc3QgbF9iRGlzYWJsZU90aGVySXRlbXMgPSAhU21sRGV0YWlsLkNvbnZlcnRQZXJtaXNzaW9uVG9Cb29sKHRoaXMuRWRpdGFjZSA/IHsgdmFsdWU6IHRydWUgfSA6ICh0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucyA/IHsgdmFsdWU6IHRydWUgfS8qdGhpcy5EZXRhaWxEdG8uUGVybWlzc2lvbnMuTHplRXZpZG92YXQqLyA6IHVuZGVmaW5lZCkpO1xyXG4gICAgICAgICAgICAvL2NvbnN0IGhlYWRlckZpZWxkcyA9IEdvcmRpYy5Fa28uSGVhZGVyRm9ybS5GaWVsZHM7XHJcbiAgICAgICAgICAgIC8vLy90aGlzLmVsZW1lbnQuZmluZEZpZWxkcyhoZWFkZXJGaWVsZHMuS25paGEpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGxfYkRpc2FibGVIZWFkZXJJdGVtcyk7XHJcbiAgICAgICAgICAgIC8vLy90aGlzLmVsZW1lbnQuZmluZEZpZWxkcyhoZWFkZXJGaWVsZHMuRXZpZGVuY25pQ2lzbG8pLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGxfYkRpc2FibGVIZWFkZXJJdGVtcyk7XHJcbiAgICAgICAgICAgIC8vLy90aGlzLmVsZW1lbnQuZmluZEZpZWxkcyhoZWFkZXJGaWVsZHMuQWdlbmRvdmVDaXNsbykuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgbF9iRGlzYWJsZUhlYWRlckl0ZW1zKTtcclxuICAgICAgICAgICAgLy90aGlzLmVsZW1lbnQuZmluZEZpZWxkcyhoZWFkZXJGaWVsZHMuVHlwRG9rbGFkdSkuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgbF9iRGlzYWJsZUhlYWRlckl0ZW1zKTtcclxuICAgICAgICAgICAgLy8vL3RoaXMuZWxlbWVudC5maW5kRmllbGRzKFtoZWFkZXJGaWVsZHMuVHlwRG9rbGFkdSwgaGVhZGVyRmllbGRzLkRhdHVtRXZpZGVuY2UsIGhlYWRlckZpZWxkcy5Qb3Bpc10uam9pbignLCcpKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIC8vLy90aGlzLmVsZW1lbnQuZmluZEZpZWxkcyhcIml4c190eXBcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgbF9iRGlzYWJsZUhlYWRlckl0ZW1zKTtcclxuICAgICAgICAgICAgLy8vL3RoaXMuZWxlbWVudC5maW5kRmllbGRzKGhlYWRlckZpZWxkcy5UeXBEb2tsYWR1KS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBsX2JEaXNhYmxlSGVhZGVySXRlbXMpO1xyXG4gICAgICAgICAgICAvLy8vdGhpcy5lbGVtZW50LmZpbmRGaWVsZHMoXCJkYXRfbm92X3p1c1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBsX2JEaXNhYmxlT3RoZXJJdGVtcyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5lbGVtZW50LmZpbmRGaWVsZHMoXCJkYXRfbm92X3p1c1wiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBsX2JEaXNhYmxlT3RoZXJJdGVtcyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5lbGVtZW50LmZpbmRGaWVsZHMoaGVhZGVyRmllbGRzLlBvcGlzKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBsX2JEaXNhYmxlT3RoZXJJdGVtcyk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5lbGVtZW50LmZpbmRGaWVsZHMoXCJpeHNfZXN1XCIpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGxfYkRpc2FibGVPdGhlckl0ZW1zKTtcclxuICAgICAgICAgICAgLy8vL3RoaXMuZWxlbWVudC5maW5kRmllbGRzKFwicG9waXNcIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgbF9iRGlzYWJsZU90aGVySXRlbXMpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZWxlbWVudC5maW5kRmllbGRzKFwiY19saW1pdFwiKS5nZmllbGQoXCJvcHRpb25cIiwgXCJkaXNhYmxlZFwiLCBsX2JEaXNhYmxlT3RoZXJJdGVtcyk7XHJcbiAgICAgICAgICAgIC8vLy90aGlzLmVsZW1lbnQuZmluZEZpZWxkcyhcIml4cF9kZW5cIikuZ2ZpZWxkKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAvLy8vdGhpcy5lbGVtZW50LmZpbmRGaWVsZHMoW2hlYWRlckZpZWxkcy5UeXBEb2tsYWR1LCBoZWFkZXJGaWVsZHMuRGF0dW1FdmlkZW5jZSwgaGVhZGVyRmllbGRzLlBvcGlzXS5qb2luKCcsJykpLmdmaWVsZChcIm9wdGlvblwiLCBcImRpc2FibGVkXCIsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFrY2VcclxuICAgICAgICAgICAgY29uc3QgYWN0cyA9IHRoaXMuYWN0aW9ucztcclxuICAgICAgICAgICAgLy8vL2xldCB3d3cgPSB0aGlzLmFjdGlvbnMuZ2V0QWN0aW9ucygpLmZpbmQoKGFjdCkgPT4geyByZXR1cm4gYWN0Lm5hbWUgPT0gXCJhY3RPcHJhdml0XCI7IH0pO1xyXG4gICAgICAgICAgICAvLy8vbGV0IHFxcSA9IHRoaXMuYWN0aW9ucy5nZXRBY3Rpb25zKChhY3QpID0+IHsgcmV0dXJuIGFjdC5uYW1lID09IFwiYWN0T3ByYXZpdFwiOyB9KTtcclxuICAgICAgICAgICAgLy9jb25zdCBwZXJtRWRpdGFjZSA9IFNtbERldGFpbC5nZXRFZGl0UGVybWlzc2lvbigpO1xyXG4gICAgICAgICAgICAvL3RoaXMuYWN0aW9ucy5hY3RQb2RhbmkhLnVwZGF0ZVBlcm1pc3Npb24oKHRoaXMuRWRpdGFjZSA/IHBlcm1FZGl0YWNlIDogKHRoaXMuRGV0YWlsRHRvLlBlcm1pc3Npb25zID8gdGhpcy5EZXRhaWxEdG8uUGVybWlzc2lvbnMuTHplUG9kYXQgOiB1bmRlZmluZWQpKSk7XHJcbiAgICAgICAgICAgIC8vY29uc3QgZm9ybUNoYW5nZWQgPSB0aGlzLmZpbmRGb3JtcygpLmdmb3JtKFwiaGFzQ2hhbmdlZFwiKTtcclxuICAgICAgICAgICAgLy8vLyBUT0RPOiBkb8WZZcWhaXQgZWRpdGHEjW7DrSByZcW+aW1cclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0RXZpZGVuY2UhLnVwZGF0ZVBlcm1pc3Npb24oKGZvcm1DaGFuZ2VkIHx8IHRoaXMuRWRpdGFjZSA/IHsgdmFsdWU6IHRydWUgfSA6ICh0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucyA/IHsgdmFsdWU6IHRydWUgfS8qdGhpcy5EZXRhaWxEdG8uUGVybWlzc2lvbnMuTHplRXZpZG92YXQqLyA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0T3ByYXZhIS52aXNpYmxlKCF0aGlzLkVkaXRhY2UpO1xyXG4gICAgICAgICAgICAvLy8vIFRPRE86IGRvxZllxaFpdCBlZGl0YcSNbsOtIHJlxb5pbVxyXG4gICAgICAgICAgICAvL3RoaXMuYWN0aW9ucy5hY3RPcHJhdmEhLnVwZGF0ZVBlcm1pc3Npb24oKHRoaXMuRWRpdGFjZSA/IHBlcm1FZGl0YWNlIDogKHRoaXMuRGV0YWlsRHRvLlBlcm1pc3Npb25zID8geyB2YWx1ZTogdHJ1ZSB9Lyp0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucy5MemVPcHJhdml0Ki8gOiB1bmRlZmluZWQpKSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zLmFjdFpydXNpdFptZW55IS52aXNpYmxlKHRoaXMuRWRpdGFjZSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5hY3Rpb25zLmFjdFpydXNpdFptZW55IS51cGRhdGVQZXJtaXNzaW9uKCghdGhpcy5FZGl0YWNlID8gU21sRGV0YWlsLmdldEVkaXRQZXJtaXNzaW9uKGZhbHNlKSA6IHsgdmFsdWU6IHRydWUgfSkpO1xyXG4gICAgICAgICAgICAvLy8vdGhpcy5hY3Rpb25zLmFjdFN0b3JubyEudXBkYXRlUGVybWlzc2lvbigodGhpcy5FZGl0YWNlID8gcGVybUVkaXRhY2UgOiAodGhpcy5EZXRhaWxEdG8uUGVybWlzc2lvbnMgPyB0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucy5MemVTdG9ybm92YXQgOiB1bmRlZmluZWQpKSk7XHJcbiAgICAgICAgICAgIC8vLy90aGlzLmFjdGlvbnMuYWN0WnJ1c2l0U3Rvcm5vIS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6ICh0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucyA/IHRoaXMuRGV0YWlsRHRvLlBlcm1pc3Npb25zLkx6ZVpydXNpdFN0b3JubyA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgLy8vL3RoaXMuYWN0aW9ucy5hY3RTY2h2YWxlbmkhLnVwZGF0ZVBlcm1pc3Npb24oKHRoaXMuRWRpdGFjZSA/IHBlcm1FZGl0YWNlIDogKHRoaXMuRGV0YWlsRHRvLlBlcm1pc3Npb25zID8gdGhpcy5EZXRhaWxEdG8uUGVybWlzc2lvbnMuTHplU2NodmFsaXQgOiB1bmRlZmluZWQpKSk7XHJcbiAgICAgICAgICAgIC8vLy90aGlzLmFjdGlvbnMuYWN0WnJ1c2l0U2NodmFsZW5pIS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6ICh0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucyA/IHRoaXMuRGV0YWlsRHRvLlBlcm1pc3Npb25zLkx6ZVpydXNpdFNjaHZhbGVuaSA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgLy8vL3RoaXMuYWN0aW9ucy5hY3RVemF2cmVuaSEudXBkYXRlUGVybWlzc2lvbigodGhpcy5FZGl0YWNlID8gcGVybUVkaXRhY2UgOiAodGhpcy5EZXRhaWxEdG8uUGVybWlzc2lvbnMgPyB0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucy5MemVVemF2cml0IDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICAvLy8vdGhpcy5hY3Rpb25zLmFjdFpydXNpdFV6YXZyZW5pIS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6ICh0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucyA/IHRoaXMuRGV0YWlsRHRvLlBlcm1pc3Npb25zLkx6ZVpydXNpdFV6YXZyZW5pIDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICAvLy8vdGhpcy5hY3Rpb25zLmFjdFByZWRhbmkhLnVwZGF0ZVBlcm1pc3Npb24oKHRoaXMuRWRpdGFjZSA/IHBlcm1FZGl0YWNlIDogKHRoaXMuRGV0YWlsRHRvLlBlcm1pc3Npb25zID8gdGhpcy5EZXRhaWxEdG8uUGVybWlzc2lvbnMuTHplUHJlZGF0IDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICAvLy8vdGhpcy5hY3Rpb25zLmFjdFByZXZ6ZXRpIS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6ICh0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucyA/IHRoaXMuRGV0YWlsRHRvLlBlcm1pc3Npb25zLkx6ZVByZXZ6aXQgOiB1bmRlZmluZWQpKSk7XHJcbiAgICAgICAgICAgIC8vLy90aGlzLmFjdGlvbnMuYWN0UHJpZGVsZW5pIS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6ICh0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucyA/IHRoaXMuRGV0YWlsRHRvLlBlcm1pc3Npb25zLkx6ZVByaWRlbGl0IDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICAvLy8vdGhpcy5hY3Rpb25zLmFjdFByZWV2aWRlbmNlIS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6ICh0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucyA/IHRoaXMuRGV0YWlsRHRvLlBlcm1pc3Npb25zLkx6ZVByZWV2aWRvdmF0IDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICAvLy8vdGhpcy5hY3Rpb25zLmFjdFZyYWNlbmlEb1dmbCEudXBkYXRlUGVybWlzc2lvbigodGhpcy5FZGl0YWNlID8gcGVybUVkaXRhY2UgOiAodGhpcy5EZXRhaWxEdG8uUGVybWlzc2lvbnMgPyB0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucy5MemVWcmF0aXREb1dmbCA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgLy8vL3RoaXMuYWN0aW9ucy5hY3REaWFnbm9zdGlrYSEudXBkYXRlUGVybWlzc2lvbigodGhpcy5FZGl0YWNlID8gcGVybUVkaXRhY2UgOiAodGhpcy5EZXRhaWxEdG8uUGVybWlzc2lvbnMgPyB0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucy5MemVEaWFnbm9zdGlrYSA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0VGlza0RTIS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6ICh0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucyA/IHRoaXMuRGV0YWlsRHRvLlBlcm1pc3Npb25zLkx6ZVRpc2tub3V0IDogdW5kZWZpbmVkKSkpO1xyXG4gICAgICAgICAgICAvL3RoaXMuYWN0aW9ucy5hY3RJbmZvIS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6ICh0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucyA/IHsgdmFsdWU6IHRydWUgfS8qdGhpcy5EZXRhaWxEdG8uUGVybWlzc2lvbnMuTHplVGlza25vdXQqLyA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0WmFwaXN5IS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6ICh0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucyA/IHsgdmFsdWU6IHRydWUgfS8qdGhpcy5EZXRhaWxEdG8uUGVybWlzc2lvbnMuTHplVGlza25vdXQqLyA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0UG9sb3preVVQIS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6ICh0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucyA/IHsgdmFsdWU6IHRydWUgfS8qdGhpcy5EZXRhaWxEdG8uUGVybWlzc2lvbnMuTHplVGlza25vdXQqLyA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgLy90aGlzLmFjdGlvbnMuYWN0UG9sb3preVZQIS51cGRhdGVQZXJtaXNzaW9uKCh0aGlzLkVkaXRhY2UgPyBwZXJtRWRpdGFjZSA6ICh0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucyA/IHsgdmFsdWU6IHRydWUgfS8qdGhpcy5EZXRhaWxEdG8uUGVybWlzc2lvbnMuTHplVGlza25vdXQqLyA6IHVuZGVmaW5lZCkpKTtcclxuICAgICAgICAgICAgLy8vLyBUT0RPOiBqZcWhdMSbIHZyw6FjZW7DrSBkbyBXRkxcclxuICAgICAgICAgICAgLy8vLyBUT0RPOiBhIHBhayBqZcWhdMSbIGRvxZllxaFpdCBzcG91c3R1IGRhbMWhw61jaCBha2PDrSwga3RlcsOhIHDFmWlkYWrDrSBrb21wb25lbnR5IHYgZGV0YWlsYnVpbGRlcnVcclxuICAgICAgICAgICAgYWN0cy5hY3RPYmNlcnN0dmVuaVBTIS51cGRhdGVQZXJtaXNzaW9uKC8qKHRoaXMuRWRpdGFjZSA/IHBlcm1FZGl0YWNlIDogKi97IHZhbHVlOiB0cnVlIH0vKikqLyk7XHJcblxyXG4gICAgICAgICAgICAvLyB0YWIgRG9rbGFkeVxyXG4gICAgICAgICAgICBsZXQgZXhEb2tsYWR5ID0gdGhpcy4kZ3JpZERva2xhZHlTICE9IG51bGwgPyAoR29yZGljLkVrby5HcmlkLmN1cnJlbnRSb3c8R29yZGljLlNtbC5JbnRlcmZhY2UuR0Rva2xhZFNtbER0bz4odGhpcy4kZ3JpZERva2xhZHlTISkgIT0gbnVsbCkgOiBmYWxzZTtcclxuICAgICAgICAgICAgYWN0cy5hY3REZXRhaWxEb2tsYWR1IS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IGV4RG9rbGFkeSB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRhYiBTdWJqZWt0eVxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZVN1Ympla3R5KCk7XHJcblxyXG4gICAgICAgICAgICAvLyB0YWIgSUlTU1BcclxuICAgICAgICAgICAgLy8gVE9ETzogZG9kxJtsYXQgKHBvZG3DrW5reSwgcGVybWlzc2lvbiwgLi4uKVxyXG4gICAgICAgICAgICAvL2NvbnN0IGFrdFJhZGVrSWlzc3AgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuRnVjLkludGVyZmFjZS5HUG9sb3prYUlpc3NwRHRvPih0aGlzLiRncmlkSUlTU1BQb2xvemt5KTtcclxuICAgICAgICAgICAgYWN0cy5hY3RIaXN0b3JpZUlpc3NwIS51cGRhdGVQZXJtaXNzaW9uKHRoaXMuSmVJaXNzcCA/IHsgdmFsdWU6IHRydWUgfSA6IHsgdmFsdWU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICBhY3RzLmFjdFRlc3RJaXNzcCEudXBkYXRlUGVybWlzc2lvbih0aGlzLkplSWlzc3AgPyB7IHZhbHVlOiB0cnVlIH0gOiB7IHZhbHVlOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgYWN0cy5hY3RUZXN0SWlzc3AyIS51cGRhdGVQZXJtaXNzaW9uKHRoaXMuSmVJaXNzcCA/IHsgdmFsdWU6IHRydWUgfSA6IHsgdmFsdWU6IGZhbHNlIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gc3RhdHVzIGJhclxyXG4gICAgICAgICAgICAvLyB6bGlrdmlkb3bDoW5hIE9LIGppbmFrIHZhcm92w6Fuw61cclxuICAgICAgICAgICAgRWtvLkRldGFpbC5TdGF0dXNCYXIudXBkYXRlSXRlbShcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzZXMhW1wic3RhdHVzQmFyU3RhdlwiXSEsXHJcbiAgICAgICAgICAgICAgICB0aGlzLkRldGFpbER0by5zbWxfc3Rhdl90eHQ/LnRvVXBwZXJDYXNlKCkgPz8gXCJcIixcclxuICAgICAgICAgICAgICAgICh0aGlzLkRldGFpbER0by5zbWxfc3RhdiA9PT0gR29yZGljLlNtbC5HbG9iYWxzLkVudW1zLlN0YXZTbWwuU2NodmFsZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgPyBFa28uVXRpbHMuUmVjb3JkRm9ybWF0VHlwZS5TY2h2YWxlbm9cclxuICAgICAgICAgICAgICAgICAgICA6ICh0aGlzLkRldGFpbER0by5zbWxfc3RhdiA9PT0gR29yZGljLlNtbC5HbG9iYWxzLkVudW1zLlN0YXZTbWwuVWtvbmNlbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBFa28uVXRpbHMuUmVjb3JkRm9ybWF0VHlwZS5SZWFsaXpvdmFub1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICh0aGlzLkRldGFpbER0by5zbWxfc3RhdiA9PT0gR29yZGljLlNtbC5HbG9iYWxzLkVudW1zLlN0YXZTbWwuU3Rvcm5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IEVrby5VdGlscy5SZWNvcmRGb3JtYXRUeXBlLlN0b3Jub3Zhbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICApKSkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5KZUlpc3NwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBkb8WZZcWhaXQgdGV4dCBhIGJhcnZ5XHJcbiAgICAgICAgICAgICAgICBFa28uRGV0YWlsLlN0YXR1c0Jhci51cGRhdGVJdGVtKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzZXMhW1wic3RhdHVzQmFyU3RhdlJleklpc3NwXCJdISxcclxuICAgICAgICAgICAgICAgICAgICBcIklJU1NQOiBcIiArICh0aGlzLkRldGFpbER0by5zdGF2X3Jlel9paXNzcF90eHQ/LnRvVXBwZXJDYXNlKCkgPz8gXCJcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuRGV0YWlsRHRvLnNtbF9zdGF2ID09PSBHb3JkaWMuU21sLkdsb2JhbHMuRW51bXMuU3RhdlNtbC5TY2h2YWxlbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBFa28uVXRpbHMuUmVjb3JkRm9ybWF0VHlwZS5TY2h2YWxlbm9cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAodGhpcy5EZXRhaWxEdG8uc21sX3N0YXYgPT09IEdvcmRpYy5TbWwuR2xvYmFscy5FbnVtcy5TdGF2U21sLlVrb25jZW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IEVrby5VdGlscy5SZWNvcmRGb3JtYXRUeXBlLlJlYWxpem92YW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICh0aGlzLkRldGFpbER0by5zbWxfc3RhdiA9PT0gR29yZGljLlNtbC5HbG9iYWxzLkVudW1zLlN0YXZTbWwuU3Rvcm5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBFa28uVXRpbHMuUmVjb3JkRm9ybWF0VHlwZS5TdG9ybm92YW5vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApKSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBLUElcclxuICAgICAgICAgICAgLy90aGlzLm5hc3RhdktwaUtvbXBlbnpvdmFub1Byb2NlbnQodGhpcy5rcGlzIS5rcGlaYXZhemt5KTtcclxuICAgICAgICAgICAgLy90aGlzLm5hc3RhdktwaUtvbXBlbnpvdmFub1Byb2NlbnQodGhpcy5rcGlzIS5rcGlQb2hsZWRhdmt5KTtcclxuXHJcbiAgICAgICAgICAgIC8vLy8gbmFzdGF2ZW7DrSB0aXNrdVxyXG4gICAgICAgICAgICAvL2lmICh0aGlzLkRldGFpbER0by5KZVNjaHZhbGVueSB8fCB0aGlzLkRldGFpbER0by5KZVNwYXJvdmFueSkge1xyXG4gICAgICAgICAgICAvLyAgICAvLyB0aXNrIG96bsOhbWVuw61cclxuICAgICAgICAgICAgLy8gICAgdGhpcy5hY3Rpb25zLmFjdFRpc2taTCEudXBkYXRlKHsgY2FwdGlvbjogXCJUaXNrIG96bsOhbWVuw61cIiB9KTtcclxuICAgICAgICAgICAgLy8gICAgdGhpcy5hY3Rpb25zLmFjdFRpc2taTCEudGVtYSA9IFwic21sX3B0bV96bGRva1wiO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy9lbHNlIGlmICh0aGlzLkRldGFpbER0by5KZUV2aWRvdmFueSkge1xyXG4gICAgICAgICAgICAvLyAgICAvLyB0aXNrIG7DoXZyaHVcclxuICAgICAgICAgICAgLy8gICAgdGhpcy5hY3Rpb25zLmFjdFRpc2taTCEudXBkYXRlKHsgY2FwdGlvbjogXCJOw6F2cmgga29tcGVuemFjZVwiLypcIlRpc2sgbsOhdnJodVwiKi8gfSk7XHJcbiAgICAgICAgICAgIC8vICAgIHRoaXMuYWN0aW9ucy5hY3RUaXNrWkwhLnRlbWEgPSBcInNtbF9wdG1femxuYXZcIjtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIC8vZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgIC8vIHRpc2sgbmVuw60gcG92b2xlblxyXG4gICAgICAgICAgICAvLyAgICB0aGlzLmFjdGlvbnMuYWN0VGlza1pMIS51cGRhdGUoeyBjYXB0aW9uOiBcIlRpc2tcIiB9KTtcclxuICAgICAgICAgICAgLy8gICAgdGhpcy5hY3Rpb25zLmFjdFRpc2taTCEudGVtYSA9IFwiXCI7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWmFkw6Fuw60gcGFyYW1ldHLFryB0aXNrdVxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB7SUdQcmludEFjdGlvblJlcG9ydFN0YXJ0aW5nfSByZXAgcGFyYW1ldHJ5IHRpc2t1XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIHJlcG9ydFN0YXJ0aW5nKHJlcDogSUdQcmludEFjdGlvblJlcG9ydFN0YXJ0aW5nKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICAvLyBwb3V6ZSBQSUQsIG5pYyBqaW7DqWhvIHNlIG5lcMWZZWTDoXbDoVxyXG4gICAgICAgICAgICByZXAucGFyYW1zLlgwMDA1ID0gdGhpcy5JeHBTbWxQcmk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUT0RPOiBuZXphxI1uxJsgc2Ugem5vdnUgcG91xb7DrXZhdCB0YXRvIG1ldG9kYT8gemtvbnp1bHRvdmF0IHMgVmxhc3RvdSwgamFrIGTEm2xhdCByZWxvYWQgLSBWbGFzdGEgZG9wb3J1xI11amUgdWTEm2xhdCBsb2FkIGNlbMOpaG8gb2tuYSwgYWxlIMWhbG8gYnkgbmFzdGF2aXQgbsSbamFrw70gcMWZw616bmFrLCDFvmUgZGF0YSBqc291IHXFviBuYcSNdGVuw6EgYSB2IEMjIGplIHBhayBuZW5hxI3DrXRhdC4gUG9zbMOhbiBkb3RheiBBbMOta292aSwgamVzdGxpIG1hasOtIG5lYm8gbmVtYWrDrSBha3Rpdm7DrSBJU0xvdsOpIG9wZXJhY2UgdnJhY2V0IGFrdHXDoWxuw60gZGF0YSBhIHBhayB0byByb3pob2Rub3V0XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2w60gcMWZw616bmFrIGFrdGl2bsOtIG9wZXJhY2UgYSB6bm92dSBuYcSNdGUgY2Vsw70gZm9ybXVsw6HFmVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSB3aXRob3V0UmVsb2FkIChkZWZhdWx0ID0gZmFsc2UpIHRydWUgPSBuZWFrdHVhbGl6b3ZhdCBmb3JtdWzDocWZXHJcbiAgICAgICAgICogQHJldHVybnMge0pRdWVyeS5Qcm9taXNlPGFueT59IHByb21pc2VcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIHNldEFjdGl2ZU9wZXJhdGlvbkFuZFJlbG9hZERhdGEod2l0aG91dFJlbG9hZDogYm9vbGVhbiA9IGZhbHNlKTogSlF1ZXJ5LlByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgICAgICAvLyB2eXZvbMOhbsOtIHRyaWdnZXIgbyBha3Rpdm7DrSBvcGVyYWNpXHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcihTbWxEZXRhaWwudHJpZ2dlckNoYW5nZSwgW3sgZGF0YTogdGhpcy5EZXRhaWxEdG8gfV0pO1xyXG5cclxuICAgICAgICAgICAgLy8gYWt0dWFsaXphY2UgZGV0YWlsdVxyXG4gICAgICAgICAgICBpZiAoIXdpdGhvdXRSZWxvYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKFwicmVtZW1iZXJpbml0aWFsb3BlblwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxvYWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHJldHVybiAkLkRlZmVycmVkKCkucmVzb2x2ZSgpLnByb21pc2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFpub3Z1IG5hxI10ZSBjZWzDvSBmb3JtdWzDocWZXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7SlF1ZXJ5LlByb21pc2U8YW55Pn0gcHJvbWlzZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgcmVsb2FkRGF0YSgpOiBKUXVlcnkuUHJvbWlzZTxhbnk+IHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC50cmlnZ2VyKFwicmVtZW1iZXJpbml0aWFsb3BlblwiKTtcclxuICAgICAgICAgICAgLy8gVE9ETzogdG91aGxlIGNlc3RvdSBzZSBuZXZyw6F0w60gcmV0RGF0YVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBa3R1YWxpemFjZSBkYXQgdiBkZXRhaWx1IHBvZGxlIG1vZGVsdSBhIG5hc3RhdmVuw60gc3RhdnUgcHJ2a8WvXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNldEZvY3VzIChkZWZhdWx0ID0gZmFsc2UpIG5hc3Rhdm92YXQgZm9rdXMgZG8gcHJ2bsOtaG8gZWRpdG92YXRlbG7DqWhvIHBvbGU/XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBha3R1YWxpemFjZURldGFpbHUoc2V0Rm9jdXM6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSB2bGFzdG5vc3TDrVxyXG4gICAgICAgICAgICB0aGlzLkVkaXRhY2UgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5hcGxuxJtuw60gcG9sw63EjWVrXHJcbiAgICAgICAgICAgIC8vIFRPRE86IG5lY2hhdCBEZXRhaWxEdG8gbmVibyB0byBwxZllam1lbm92YXQgenDDoXRreSBuYSBtb2RlbD8gbsSbamFrIHRvIGRvxZllxaFpdCwgdiBrw7NkdSB0b3Rpxb4gcG91xb7DrXbDoW0gb2JvamVcclxuICAgICAgICAgICAgdGhpcy5maW5kRmllbGRzKClcclxuICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcImFwcGx5XCIsIHRoaXMuRGV0YWlsRHRvLCB7IGluaXRpYWxWYWx1ZXM6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgIC5nZmllbGQoXCJtb2RlbFwiLCBcInZhbGlkYXRvcnNcIiwgdGhpcy52YWxpZGF0b3JzKTtcclxuICAgICAgICAgICAgLy8gbmFzdGF2ZW7DrSBzdGF2dSBwb2zDrcSNZWsgYSBha2PDrVxyXG4gICAgICAgICAgICB0aGlzLmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAvLyBuYXN0YXZlbsOtIGZva3VzdVxyXG4gICAgICAgICAgICBpZiAoc2V0Rm9jdXMpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IGRvxZllxaFpdCBlZGl0YcSNbsOtIHJlxb5pbVxyXG4gICAgICAgICAgICAgICAgaWYgKFNtbERldGFpbC5Db252ZXJ0UGVybWlzc2lvblRvQm9vbCh0aGlzLkRldGFpbER0by5QZXJtaXNzaW9ucyA/IHsgdmFsdWU6IHRydWUgfS8qdGhpcy5EZXRhaWxEdG8uUGVybWlzc2lvbnMuTHplRXZpZG92YXQqLyA6IHVuZGVmaW5lZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBHRGJkLmdldEVsZW1lbnRUb0ZvY3VzKHRoaXMuZWxlbWVudCwgXCIuZ2ZpZWxkOm5vdCgudWktc3RhdGUtZGlzYWJsZWQpXCIpPy5maXJzdCgpLnRyaWdnZXIoXCJmb2N1c1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTmFzdGF2ZW7DrSBwcnZrxa8gbmEgdGFidSBzdWJqZWt0xa9cclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGVuYWJsZVN1Ympla3R5KCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogZG/EjWVzYXRcclxuICAgICAgICAgICAgbGV0IGFrdFJhZGVrOiBHb3JkaWMuU21sLkludGVyZmFjZS5HU3ViamVrdERva2xhZHVTbWxEdG8gfCBudWxsID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuJGdyaWRTdWJqZWt0eSkgYWt0UmFkZWsgPSBHb3JkaWMuRWtvLkdyaWQuY3VycmVudFJvdzxHb3JkaWMuU21sLkludGVyZmFjZS5HU3ViamVrdERva2xhZHVTbWxEdG8+KHRoaXMuJGdyaWRTdWJqZWt0eSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjdHMgPSB0aGlzLmFjdGlvbnM7XHJcbiAgICAgICAgICAgIGNvbnN0IHBlcm1zID0gdGhpcy5EZXRhaWxEdG8uUGVybWlzc2lvbnM7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0RGV0YWlsU3ViamVrdHUhLnVwZGF0ZVBlcm1pc3Npb24oU21sR3JpZC5nZXRDb21iaW5lZEdyaWRQZXJtaXNzaW9uKGFrdFJhZGVrLCBmYWxzZSwgcGVybXM/Lkx6ZVpvYnJheml0KSk7XHJcbiAgICAgICAgICAgIGFjdHMuYWN0QWt0aXZuaVN1Ympla3R5IS51cGRhdGVQZXJtaXNzaW9uKHsgdmFsdWU6IHRydWUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUZXN0LCBqZS1saSBQSUQgcMWZw61wYWR1IFNNTCB6YWTDoW5cclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSA9IFBJRCB6YWTDoW4sIGZhbHNlID0gUElEIG5lemFkw6FuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBpeHBaYWRhbigpOiBib29sZWFuIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IG5hIHRvaGxlIG3DoW0gdmxhc3Rub3N0IHogY3MsIGFsZSBuZWZ1bmdvdmFsbyB0by4gYnXEjyB0byBvcHJhdml0IG5lYm8gbmVjaGF0IHRvaGxlIGEgdiBjcyB0byB6bcSbbml0IG5hIHByaXZhdGUgYSBiZXogSnNvblByb3BlcnR5LiB2IHNlem5hbXUgamUgb2Jkb2JhIHBybyBrbmlodVxyXG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuSXhwU21sUHJpICE9IG51bGwgJiYgdGhpcy5JeHBTbWxQcmkgIT09IFwiXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGVzdCwgamVzdGxpIGplIG1vxb5uw6kgb2tubyB6YXbFmcOtdFxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtKUXVlcnlQcm9taXNlPEludGVyZmFjZS5HUHJpcGFkU21sRHRvPiB8IEludGVyZmFjZS5HUHJpcGFkU21sRHRvfSBwcm9taXNlIHMgZGF0eSAocmVzb2x2ZSA9IGplIG1vxb5uw6kgemF2xZnDrXQsIHJlamVjdCA9IG5lbsOtIG1vxb5uw6kgemF2xZnDrXQpIG5lYm8gcMWZw61tbyBkYXRhIGRldGFpbHVcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgY2xvc2luZygpOiBKUXVlcnlQcm9taXNlPEludGVyZmFjZS5HUHJpcGFkU21sRHRvPiB8IEludGVyZmFjZS5HUHJpcGFkU21sRHRvIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIC8vIGtvbnRyb2xhIG5hIHptxJtuxJtuw6kgcG9sb8W+a3lcclxuICAgICAgICAgICAgLy8gVE9ETzogZG9kxJtsYXQsIHBva3VkIGJ1ZGUgZWRpdGHEjW7DrSByZcW+aW1cclxuICAgICAgICAgICAgLy9sZXQgZm9ybUNoYW5nZWQgPSB0aGlzLmZpbmRGb3JtcygpLmdmb3JtKFwiaGFzQ2hhbmdlZFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQuRGV0YWlsRHRvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=